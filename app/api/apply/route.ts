import { parseAnswers, parseContact, qualify } from "@/lib/apply";
import { pickAttribution } from "@/lib/attribution";
import { escapeHtml, sendEmail } from "@/lib/email";
import { applyQuestions, type ApplyAnswers } from "@/lib/v2-content";

export const consentText =
  "I agree that Regena can contact me by phone, text and email about this application. Message and data rates may apply. Reply STOP to opt out of texts.";

function answerLabel(key: keyof ApplyAnswers, value: string) {
  return applyQuestions[key].choices.find((choice) => choice.value === value)?.label ?? value;
}

// Step "contact" fires as soon as step 1 is done, so a drop-off is still a lead.
// Step "answers" carries the qualification result.
// If REGENA_APPLY_WEBHOOK_URL is set (e.g. a GHL inbound webhook), every submission is forwarded there too.

// HighLevel wants first and last name apart, so texts can say "Hi Ana".
function splitName(full: string) {
  const [firstName = "", ...rest] = full.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
}

async function forward(payload: Record<string, unknown>) {
  const url = process.env.REGENA_APPLY_WEBHOOK_URL;
  if (!url) return "unconfigured";
  try {
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return response.ok ? "sent" : `failed:${response.status}`;
  } catch {
    return "failed";
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, errors: ["Send a valid application."] }, { status: 400 });
  }

  // Hidden field real people never fill. Bots get a normal-looking reply and nothing is forwarded.
  if (typeof body.hp === "string" && body.hp.trim()) return Response.json({ ok: true, verdict: { fit: true } });

  const contact = parseContact(body.contact);
  if (!contact.ok) return Response.json({ ok: false, errors: contact.errors }, { status: 400 });

  const attribution = pickAttribution(body.attribution);
  const sourceLine = Object.keys(attribution).length
    ? `\n\nSource: ${Object.entries(attribution).map(([key, value]) => `${key}=${value}`).join(" · ")}`
    : "";

  const teamAddress = process.env.REGENA_NOTIFICATION_EMAIL ?? "contact@regena.io";
  const who = `${contact.value.name} · ${contact.value.clinic} · ${contact.value.city}, ${contact.value.region} ${contact.value.country}`;
  const contactLines = `Email: ${contact.value.email}\nPhone: ${contact.value.phone}${contact.value.website ? `\nWebsite: ${contact.value.website}` : ""}`;

  if (body.step === "contact") {
    const webhook = await forward({ step: "contact", ...contact.value, ...splitName(contact.value.name), ...attribution, consent: true, consentText, submittedAt: new Date().toISOString() });
    return Response.json({ ok: true, webhook });
  }

  const answers = parseAnswers(body.answers);
  if (!answers.ok) return Response.json({ ok: false, errors: answers.errors }, { status: 400 });

  const verdict = qualify(contact.value, answers.value);
  const label = verdict.fit ? "FIT" : `NOT A FIT (${verdict.reason})`;
  const answerLines = (Object.keys(answers.value) as (keyof ApplyAnswers)[])
    .map((key) => `${applyQuestions[key].label}\n  ${answerLabel(key, answers.value[key])}`)
    .join("\n");
  const text = `New Regena application: ${label}\n\n${who}\n${contactLines}\n\n${answerLines}${sourceLine}`;

  const [email, webhook] = await Promise.all([
    sendEmail({
      to: teamAddress,
      subject: `Application ${verdict.fit ? "· fit" : "· not a fit"} · ${contact.value.clinic}`,
      text,
      html: `<pre>${escapeHtml(text)}</pre>`,
      replyTo: contact.value.email,
    }),
    forward({
      step: "answers",
      ...contact.value,
      ...splitName(contact.value.name),
      ...answers.value,
      ...attribution,
      treatmentLabel: answerLabel("treatment", answers.value.treatment),
      revenueLabel: answerLabel("revenue", answers.value.revenue),
      pastPatientsLabel: answerLabel("pastPatients", answers.value.pastPatients),
      adBudgetLabel: answerLabel("adBudget", answers.value.adBudget),
      fit: verdict.fit,
      reason: verdict.fit ? "" : verdict.reason,
      consent: true,
      consentText,
      submittedAt: new Date().toISOString(),
    }),
  ]);

  return Response.json({ ok: true, verdict, email: email.status, webhook });
}
