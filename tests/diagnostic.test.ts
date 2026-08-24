import { describe, expect, it } from "vitest";

import { calculateDiagnostic, resolveRange } from "@/lib/diagnostic";

describe("clinic diagnostic", () => {
  it("uses an exact value instead of a selected range midpoint", () => {
    expect(resolveRange([50, 100], 72)).toBe(72);
    expect(resolveRange([50, 100])).toBe(75);
  });

  it("calculates literal relative-improvement scenarios from clinic inputs", () => {
    const result = calculateDiagnostic({
      annualRevenue: 2_000_000,
      patientValue: 5_000,
      monthlyInquiries: 100,
      consultationsPerTen: 4,
      marketingActive: true,
      constraint: "response",
      capacity: "yes",
      visibility: "partial",
    });
    expect(result.recommendation).toBe("conversion");
    expect(result.currentMonthlyConsultationValue).toBe(200_000);
    expect(result.scenarios).toEqual([
      { improvement: 10, additionalConsultations: 4, additionalMonthlyValue: 20_000 },
      { improvement: 20, additionalConsultations: 8, additionalMonthlyValue: 40_000 },
      { improvement: 30, additionalConsultations: 12, additionalMonthlyValue: 60_000 },
    ]);
  });

  it("routes demand constraints to Growth Partnership and flags limited capacity", () => {
    const result = calculateDiagnostic({
      annualRevenue: 1_000_000,
      patientValue: 2_500,
      monthlyInquiries: 40,
      consultationsPerTen: 5,
      marketingActive: false,
      constraint: "demand",
      capacity: "limited",
      visibility: "no",
    });
    expect(result.recommendation).toBe("growth");
    expect(result.capacityNote).toMatch(/capacity/i);
  });
});
