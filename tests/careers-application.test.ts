import { describe, expect, it } from "vitest";

import { validateCareerApplication } from "@/lib/careers";

function application(overrides: Record<string, string | File> = {}) {
  const form = new FormData();
  const fields: Record<string, string | File> = {
    name: "Avery Smith",
    email: "avery@example.com",
    phone: "+1 555 555 0198",
    location: "Toronto · ET",
    role: "AI Systems Developer",
    linkedin: "https://www.linkedin.com/in/avery-smith",
    x: "",
    instagram: "",
    website: "https://avery.dev",
    portfolio: "https://avery.dev/work",
    experience: "Built production voice and workflow systems for service businesses.",
    fit: "I communicate clearly, ship quickly, and own reliability after launch.",
    consent: "on",
    resume: new File(["%PDF-1.7 resume"], "avery-resume.pdf", { type: "application/pdf" }),
    ...overrides,
  };
  Object.entries(fields).forEach(([key, value]) => form.set(key, value));
  return form;
}

describe("career application validation", () => {
  it("accepts a complete application and normalizes professional links", () => {
    const result = validateCareerApplication(application());
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.role).toBe("AI Systems Developer");
    expect(result.value.resume.name).toBe("avery-resume.pdf");
    expect(result.value.links).toEqual({
      linkedin: "https://www.linkedin.com/in/avery-smith",
      website: "https://avery.dev/",
      portfolio: "https://avery.dev/work",
    });
  });

  it("rejects unsupported roles, missing consent, and a mismatched file type", () => {
    const result = validateCareerApplication(application({
      role: "Executive Assistant",
      consent: "",
      resume: new File(["not a document"], "resume.pdf", { type: "text/plain" }),
    }));
    expect(result).toEqual({
      ok: false,
      errors: expect.arrayContaining([
        "Select a valid role.",
        "Consent is required.",
        "Résumé file type does not match PDF, DOC, or DOCX.",
      ]),
    });
  });

  it("rejects résumés larger than 10 MB", () => {
    const largeFile = new File([new Uint8Array(10 * 1024 * 1024 + 1)], "large.pdf", { type: "application/pdf" });
    const result = validateCareerApplication(application({ resume: largeFile }));
    expect(result).toEqual({ ok: false, errors: expect.arrayContaining(["Résumé must be 10 MB or smaller."]) });
  });

  it("rejects automated submissions that fill the hidden company website field", () => {
    const result = validateCareerApplication(application({ companyWebsite: "https://spam.example" }));
    expect(result).toEqual({ ok: false, errors: expect.arrayContaining(["Application could not be accepted."]) });
  });
});
