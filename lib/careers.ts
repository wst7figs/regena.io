export const careerRoles = ["Growth Advisor / Closer", "AI Systems Developer", "General application"] as const;
export type CareerRole = (typeof careerRoles)[number];

export type CareerApplication = {
  name: string;
  email: string;
  phone?: string;
  location: string;
  role: CareerRole;
  experience: string;
  fit: string;
  links: Partial<Record<"linkedin" | "x" | "instagram" | "website" | "portfolio", string>>;
  resume: File;
};

type ValidationResult = { ok: true; value: CareerApplication } | { ok: false; errors: string[] };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fileTypes: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function text(form: FormData, name: string, maximum = 2_000) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function normalizedUrl(value: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

export function validateCareerApplication(form: FormData): ValidationResult {
  const name = text(form, "name", 100);
  const email = text(form, "email", 180).toLowerCase();
  const phone = text(form, "phone", 40);
  const location = text(form, "location", 120);
  const role = text(form, "role", 80) as CareerRole;
  const experience = text(form, "experience", 4_000);
  const fit = text(form, "fit", 4_000);
  const consent = ["on", "true", "1"].includes(text(form, "consent", 10));
  const companyWebsite = text(form, "companyWebsite", 500);
  const resume = form.get("resume");
  const errors: string[] = [];

  if (name.length < 2) errors.push("Full name is required.");
  if (!emailPattern.test(email)) errors.push("Enter a valid email address.");
  if (location.length < 2) errors.push("Location and time zone are required.");
  if (!careerRoles.includes(role)) errors.push("Select a valid role.");
  if (experience.length < 20) errors.push("Tell us about your relevant experience.");
  if (fit.length < 20) errors.push("Tell us why Regena fits your work.");
  if (!consent) errors.push("Consent is required.");
  if (companyWebsite) errors.push("Application could not be accepted.");

  const links: CareerApplication["links"] = {};
  for (const key of ["linkedin", "x", "instagram", "website", "portfolio"] as const) {
    const value = text(form, key, 500);
    const normalized = normalizedUrl(value);
    if (value && !normalized) errors.push(`${key === "x" ? "X" : key[0].toUpperCase() + key.slice(1)} must be a valid web address.`);
    if (normalized) links[key] = normalized;
  }

  if (!(resume instanceof File) || !resume.name) {
    errors.push("Attach a résumé.");
  } else {
    const extension = resume.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(extension in fileTypes)) errors.push("Résumé must be a PDF, DOC, or DOCX file.");
    else if (resume.type !== fileTypes[extension]) errors.push("Résumé file type does not match PDF, DOC, or DOCX.");
    if (resume.size > 10 * 1024 * 1024) errors.push("Résumé must be 10 MB or smaller.");
    if (resume.size === 0) errors.push("Résumé file is empty.");
  }

  if (errors.length || !(resume instanceof File)) return { ok: false, errors };
  return { ok: true, value: { name, email, phone: phone || undefined, location, role, experience, fit, links, resume } };
}

export function safeResumeName(name: string) {
  const cleaned = name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "resume.pdf";
}
