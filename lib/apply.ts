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

// We take most clinics right now, so the only hard gate is where we can't legally run outreach yet.
// The answers still go to the team so the call starts with context. Everything else is a conversation.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- answers kept in the signature so new gates stay one line away
export function qualify(contact: Pick<ApplyContact, "country" | "region">, _answers?: ApplyAnswers): Verdict {
  if (contact.country === "US" && floridaPattern.test(contact.region)) {
    return { fit: false, reason: "We aren't taking clinics in Florida right now." };
  }
  return { fit: true };
}
