export type Constraint = "demand" | "response" | "booking" | "attendance" | "visibility" | "unsure";
export type Capacity = "yes" | "limited" | "no";
export type Visibility = "yes" | "partial" | "no";

export type DiagnosticInput = {
  annualRevenue: number;
  patientValue: number;
  monthlyInquiries: number;
  consultationsPerTen: number;
  marketingActive: boolean;
  constraint: Constraint;
  capacity: Capacity;
  visibility: Visibility;
};

export type DiagnosticRecommendation = "conversion" | "growth" | "diagnostic";

export type DiagnosticResult = {
  recommendation: DiagnosticRecommendation;
  currentMonthlyConsultationValue: number;
  scenarios: Array<{ improvement: 10 | 20 | 30; additionalConsultations: number; additionalMonthlyValue: number }>;
  capacityNote?: string;
};

export function resolveRange(range: readonly [number, number], exact?: number) {
  if (Number.isFinite(exact) && Number(exact) >= 0) return Number(exact);
  return (range[0] + range[1]) / 2;
}

export function calculateDiagnostic(input: DiagnosticInput): DiagnosticResult {
  const inquiries = Math.max(0, input.monthlyInquiries);
  const value = Math.max(0, input.patientValue);
  const rate = Math.min(10, Math.max(0, input.consultationsPerTen)) / 10;
  const currentConsultations = inquiries * rate;
  const currentMonthlyConsultationValue = Math.round(currentConsultations * value);
  const recommendation: DiagnosticRecommendation =
    input.constraint === "demand" || (!input.marketingActive && inquiries < 50)
      ? "growth"
      : input.constraint === "unsure" || input.visibility === "no"
        ? "diagnostic"
        : "conversion";
  const scenarios = ([10, 20, 30] as const).map((improvement) => {
    const additionalConsultations = Number((currentConsultations * (improvement / 100)).toFixed(1));
    return {
      improvement,
      additionalConsultations,
      additionalMonthlyValue: Math.round(additionalConsultations * value),
    };
  });
  return {
    recommendation,
    currentMonthlyConsultationValue,
    scenarios,
    capacityNote: input.capacity === "yes" ? undefined : "Your reported capacity may limit how much additional demand the clinic can responsibly absorb.",
  };
}
