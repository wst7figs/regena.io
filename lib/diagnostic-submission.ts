import { calculateDiagnostic, type Capacity, type Constraint, type DiagnosticInput, type Visibility } from "@/lib/diagnostic";

type DiagnosticContact = { name: string; email: string; clinic: string; phone?: string };
type ValidDiagnosticSubmission = { contact: DiagnosticContact; answers: DiagnosticInput; result: ReturnType<typeof calculateDiagnostic> };
type ParseResult = { ok: true; value: ValidDiagnosticSubmission } | { ok: false; errors: string[] };

const constraints = new Set<Constraint>(["demand", "response", "booking", "attendance", "visibility", "unsure"]);
const capacities = new Set<Capacity>(["yes", "limited", "no"]);
const visibilities = new Set<Visibility>(["yes", "partial", "no"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function cleanString(value: unknown, maximum = 160) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function finiteNumber(value: unknown) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : Number.NaN;
}

export function parseDiagnosticSubmission(payload: unknown): ParseResult {
  const body = record(payload);
  const contactInput = record(body.contact);
  const answersInput = record(body.answers);
  const name = cleanString(contactInput.name, 100);
  const email = cleanString(contactInput.email, 180).toLowerCase();
  const clinic = cleanString(contactInput.clinic, 140);
  const phone = cleanString(contactInput.phone, 40);
  const consent = contactInput.consent === "on" || contactInput.consent === "true" || contactInput.consent === true;
  const errors: string[] = [];

  if (name.length < 2) errors.push("Full name is required.");
  if (!emailPattern.test(email)) errors.push("Enter a valid work email.");
  if (clinic.length < 2) errors.push("Clinic name is required.");
  if (!consent) errors.push("Consent is required.");

  const annualRevenue = finiteNumber(answersInput.annualRevenue);
  const patientValue = finiteNumber(answersInput.patientValue);
  const monthlyInquiries = finiteNumber(answersInput.monthlyInquiries);
  const consultationsPerTen = finiteNumber(answersInput.consultationsPerTen);
  const constraint = answersInput.constraint as Constraint;
  const capacity = answersInput.capacity as Capacity;
  const visibility = answersInput.visibility as Visibility;

  if (![annualRevenue, patientValue, monthlyInquiries, consultationsPerTen].every((value) => Number.isFinite(value) && value >= 0)) errors.push("Clinic inputs are incomplete.");
  if (consultationsPerTen > 10) errors.push("Consultation rate is outside the accepted range.");
  if (typeof answersInput.marketingActive !== "boolean" || !constraints.has(constraint) || !capacities.has(capacity) || !visibilities.has(visibility)) errors.push("Clinic answers are incomplete.");
  if (errors.length) return { ok: false, errors };

  const answers: DiagnosticInput = {
    annualRevenue,
    patientValue,
    monthlyInquiries,
    consultationsPerTen,
    marketingActive: answersInput.marketingActive as boolean,
    constraint,
    capacity,
    visibility,
  };
  return { ok: true, value: { contact: { name, email, clinic, phone: phone || undefined }, answers, result: calculateDiagnostic(answers) } };
}
