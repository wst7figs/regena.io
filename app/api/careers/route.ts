import { put } from "@vercel/blob";

import { safeResumeName, validateCareerApplication } from "@/lib/careers";
import { escapeHtml, sendEmail } from "@/lib/email";

function linkLines(links: Record<string, string | undefined>) {
  return Object.entries(links).filter((entry): entry is [string, string] => Boolean(entry[1])).map(([name, url]) => `${name}: ${url}`);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, errors: ["Submit a valid application."] }, { status: 400 });
  }
  const parsed = validateCareerApplication(form);
  if (!parsed.ok) return Response.json({ ok: false, errors: parsed.errors }, { status: 400 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ ok: false, errors: ["Secure résumé storage is temporarily unavailable."] }, { status: 503 });

  const application = parsed.value;
  let storedResume: Awaited<ReturnType<typeof put>>;
  try {
    storedResume = await put(
      `careers/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeResumeName(application.resume.name)}`,
      application.resume,
      { access: "private", addRandomSuffix: true, token: process.env.BLOB_READ_WRITE_TOKEN },
    );
  } catch {
    return Response.json({ ok: false, errors: ["The résumé could not be stored securely. Try again."] }, { status: 503 });
  }

  const teamAddress = process.env.REGENA_NOTIFICATION_EMAIL ?? "careers@regena.io";
  const links = linkLines(application.links);
  const teamText = [
    `New Regena application: ${application.role}`,
    `Name: ${application.name}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone ?? "Not provided"}`,
    `Location: ${application.location}`,
    ...links,
    "",
    "Relevant experience:",
    application.experience,
    "",
    "Why Regena:",
    application.fit,
    "",
    `Private résumé storage path: ${storedResume.pathname}`,
    "Open the regena-resumes store in the personal Vercel project to review the file.",
  ].join("\n");
  const teamHtml = `<h1>New Regena application</h1><p><strong>${escapeHtml(application.role)}</strong></p><p>${escapeHtml(application.name)} · <a href="mailto:${escapeHtml(application.email)}">${escapeHtml(application.email)}</a> · ${escapeHtml(application.location)}</p>${links.length ? `<ul>${links.map((link) => `<li>${escapeHtml(link)}</li>`).join("")}</ul>` : ""}<h2>Relevant experience</h2><p>${escapeHtml(application.experience).replace(/\n/g, "<br>")}</p><h2>Why Regena</h2><p>${escapeHtml(application.fit).replace(/\n/g, "<br>")}</p><p><strong>Private résumé:</strong> ${escapeHtml(storedResume.pathname)}</p><p><small>Review it inside the regena-resumes store in the personal Vercel project. The file was not exposed publicly.</small></p>`;

  const [teamDelivery, applicantDelivery] = await Promise.all([
    sendEmail({ to: teamAddress, subject: `Career application · ${application.role} · ${application.name}`, text: teamText, html: teamHtml, replyTo: application.email }),
    sendEmail({ to: application.email, subject: "Regena received your application", text: `Hi ${application.name},\n\nWe received your application for ${application.role}. If the fit is clear, the Regena team will contact you directly.\n\nRegena`, replyTo: teamAddress }),
  ]);

  return Response.json({ ok: true, stored: "private", delivery: teamDelivery.status, confirmation: applicantDelivery.status });
}
