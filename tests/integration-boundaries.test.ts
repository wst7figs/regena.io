import { describe, expect, it } from "vitest";

import { parseDiagnosticSubmission } from "@/lib/diagnostic-submission";
import { sendEmail } from "@/lib/email";

const answers = {
  annualRevenue: 2_000_000,
  patientValue: 5_000,
  monthlyInquiries: 100,
  consultationsPerTen: 4,
  marketingActive: true,
  constraint: "response",
  capacity: "yes",
  visibility: "partial",
} as const;

describe("production integration boundaries", () => {
  it("reports unconfigured email without pretending delivery succeeded", async () => {
    const result = await sendEmail(
      { to: "owner@example.com", subject: "Clinic result", text: "Result" },
      { apiKey: "" },
    );
    expect(result).toEqual({ status: "unconfigured" });
  });

  it("recomputes diagnostic scenarios on the server instead of trusting browser results", () => {
    const submission = parseDiagnosticSubmission({
      contact: { name: "Clinic Owner", email: "owner@example.com", clinic: "North Clinic", consent: "on" },
      answers,
      result: { currentMonthlyConsultationValue: 99_999_999 },
    });

    expect(submission.ok).toBe(true);
    if (!submission.ok) return;
    expect(submission.value.result.currentMonthlyConsultationValue).toBe(200_000);
    expect(submission.value.result.scenarios[0].additionalMonthlyValue).toBe(20_000);
  });

  it("rejects malformed diagnostic contact information", () => {
    const submission = parseDiagnosticSubmission({
      contact: { name: "", email: "not-an-email", clinic: "", consent: "" },
      answers,
    });
    expect(submission).toEqual({
      ok: false,
      errors: expect.arrayContaining(["Full name is required.", "Enter a valid work email.", "Clinic name is required.", "Consent is required."]),
    });
  });
});
