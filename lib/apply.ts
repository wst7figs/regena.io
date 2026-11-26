import { applyQuestions, type ApplyAnswers } from "@/lib/v2-content";

export type ApplyContact = {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  country: "CA" | "US";
  website?: string;
};

export type Verdict = { fit: true } | { fit: false; reason: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const floridaPattern = /^\s*(fl|florida)\s*$/i;
const quebecPattern = /^\s*(qc|pq|qu[eé]bec)\s*$/i;

function clean(value: unknown, max = 160) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

export function parseContact(input: unknown): { ok: true; value: ApplyContact } | { ok: false; errors: string[] } {
  const body = record(input);
  const contact: ApplyContact = {
    name: clean(body.name, 100),
    clinic: clean(body.clinic, 140),
    email: clean(body.email, 180).toLowerCase(),
    phone: clean(body.phone, 40),
    city: clean(body.city, 80),
    region: clean(body.region, 80),
    country: body.country === "US" ? "US" : "CA",
    website: clean(body.website, 200) || undefined,
  };
  const errors: string[] = [];
  if (contact.name.length < 2) errors.push("Enter your full name.");
  if (contact.clinic.length < 2) errors.push("Enter your clinic's name.");
  if (!emailPattern.test(contact.email)) errors.push("Enter a valid email.");
  if (contact.phone.replace(/\D/g, "").length < 10) errors.push("Enter a mobile number with area code.");
  if (contact.city.length < 2) errors.push("Enter your city.");
  if (contact.region.length < 2) errors.push(contact.country === "US" ? "Enter your state." : "Enter your province.");
  if (body.consent !== true) errors.push("Please agree to be contacted about your application.");
  return errors.length ? { ok: false, errors } : { ok: true, value: contact };
}

export function parseAnswers(input: unknown): { ok: true; value: ApplyAnswers } | { ok: false; errors: string[] } {
  const body = record(input);
  const answers: Partial<Record<keyof ApplyAnswers, string>> = {};
  const errors: string[] = [];
  for (const key of Object.keys(applyQuestions) as (keyof ApplyAnswers)[]) {
    const value = body[key];
    const allowed = applyQuestions[key].choices.map((choice) => choice.value as string);
    if (typeof value === "string" && allowed.includes(value)) answers[key] = value;
    else errors.push(`Answer: ${applyQuestions[key].label}`);
  }
  return errors.length ? { ok: false, errors } : { ok: true, value: answers as ApplyAnswers };
}

// Offer v4 gates, matched to the funnel quiz (funnels.regena.io). Hard stops only where 100 patients in
// 90 days can't work: where we don't operate, a main package under $1,000, revenue under $25k, or no ad budget.
// Borderline answers still book a call; they're sent to GHL as flags so Luan sees them first.
export function qualify(contact: Pick<ApplyContact, "country" | "region">, answers?: ApplyAnswers): Verdict {
  if (contact.country === "US" && floridaPattern.test(contact.region)) {
    return { fit: false, reason: "We aren't taking clinics in Florida right now." };
  }
  if (contact.country === "CA" && quebecPattern.test(contact.region)) {
    return { fit: false, reason: "We aren't taking clinics in Quebec right now." };
  }
  if (answers?.packagePrice === "under-1000") {
    return { fit: false, reason: "Right now we work with clinics whose main package is $1,000 or more." };
  }
  if (answers?.revenue === "under-25k") {
    return { fit: false, reason: "Right now we work with clinics a little further along." };
  }
  if (answers?.adBudget === "no") {
    return { fit: false, reason: "Our system needs at least $100 a day in Meta ads for 90 days to work well." };
  }
  return { fit: true };
}

/** Borderline answers, sent to GHL so the call starts with context. */
export function flagsFor(answers: ApplyAnswers): string[] {
  const flags: string[] = [];
  if (answers.capacity === "under-30") flags.push("capacity");
  if (answers.packagePrice === "1000-1500") flags.push("package");
  if (answers.revenue === "25-50k") flags.push("revenue");
  if (answers.pastPatients !== "1000-plus") flags.push("pastPatients");
  if (answers.adBudget === "unsure") flags.push("adBudget");
  return flags;
}
