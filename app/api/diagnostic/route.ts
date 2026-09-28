import { parseDiagnosticSubmission } from "@/lib/diagnostic-submission";
import { escapeHtml, sendEmail } from "@/lib/email";

const recommendationNames = {
  conversion: "Patient Conversion System",
  growth: "Regena Growth Partnership",
  diagnostic: "Clinic-growth diagnostic",
} as const;

const money = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

function reportText(name: string, clinic: string, recommendation: string, scenarios: Array<{ improvement: number; additionalMonthlyValue: number }>) {
  return [
    `Clinic-growth diagnostic for ${name} at ${clinic}`,
    `Recommended starting point: ${recommendation}`,
    "",
    ...scenarios.map((scenario) => `${scenario.improvement}% relative-improvement scenario: ${money.format(scenario.additionalMonthlyValue)} additional monthly gross consultation value.`),
    "",
    "These are illustrative scenarios based only on the information submitted. They are not promised results and do not account for delivery costs, refunds, enrollment, or capacity constraints.",
  ].join("\n");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, errors: ["Submit a valid diagnostic result."] }, { status: 400 });
  }
  const parsed = parseDiagnosticSubmission(payload);
  if (!parsed.ok) return Response.json({ ok: false, errors: parsed.errors }, { status: 400 });

  const { contact, result } = parsed.value;
  const recommendation = recommendationNames[result.recommendation];
  const text = reportText(contact.name, contact.clinic, recommendation, result.scenarios);
  const html = `<h1>Your Regena clinic-growth diagnostic</h1><p><strong>Recommended starting point:</strong> ${escapeHtml(recommendation)}</p><p>${escapeHtml(contact.clinic)} submitted enough context to model three transparent operating scenarios.</p><ul>${result.scenarios.map((scenario) => `<li><strong>${scenario.improvement}% relative improvement:</strong> ${escapeHtml(money.format(scenario.additionalMonthlyValue))} additional monthly gross consultation value.</li>`).join("")}</ul><p><small>Illustrative scenarios based only on submitted information. Not promised results. Delivery costs, refunds, enrollment, and capacity may change the commercial outcome.</small></p>`;
  const teamAddress = process.env.REGENA_NOTIFICATION_EMAIL ?? "contact@regena.io";
  const [visitorDelivery, teamDelivery] = await Promise.all([
    sendEmail({ to: contact.email, subject: `Your Regena clinic-growth diagnostic: ${recommendation}`, text, html, replyTo: teamAddress }),
    sendEmail({ to: teamAddress, subject: `New clinic diagnostic · ${contact.clinic}`, text: `${text}\n\nContact: ${contact.email}${contact.phone ? ` · ${contact.phone}` : ""}`, replyTo: contact.email }),
  ]);

  return Response.json({
    ok: true,
    delivery: visitorDelivery.status,
    internalDelivery: teamDelivery.status,
    recommendation: result.recommendation,
  });
}
