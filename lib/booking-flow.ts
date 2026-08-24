export type BookingStep = 1 | 2 | 3 | 4;

export type BookingDraft = {
  name: string;
  email: string;
  phone: string;
  clinicName: string;
  role: string;
  clinicType: string;
  locations: string;
  inquiryVolume: string;
  paidMarketing: "yes" | "no" | "";
  bottleneck: "conversion" | "demand-and-conversion" | "unknown" | "";
  software: string;
  date: string;
  time: string;
};

export type BookingErrors = Partial<Record<keyof BookingDraft, string>>;

export const emptyBookingDraft: BookingDraft = {
  name: "",
  email: "",
  phone: "",
  clinicName: "",
  role: "",
  clinicType: "",
  locations: "",
  inquiryVolume: "",
  paidMarketing: "",
  bottleneck: "",
  software: "",
  date: "",
  time: "",
};

const required = (value: string, label: string) =>
  value.trim() ? undefined : `${label} is required.`;

export function validateBookingStep(step: BookingStep, draft: BookingDraft): BookingErrors {
  const errors: BookingErrors = {};

  if (step === 1) {
    errors.name = required(draft.name, "Full name");
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())
      ? undefined
      : "Enter a valid work email.";
    errors.phone = draft.phone.replace(/\D/g, "").length >= 7
      ? undefined
      : "Enter a valid phone number.";
    errors.clinicName = required(draft.clinicName, "Clinic name");
    errors.role = required(draft.role, "Role");
  }

  if (step === 2) {
    errors.clinicType = required(draft.clinicType, "Clinic type");
    errors.locations = required(draft.locations, "Number of locations");
    errors.inquiryVolume = required(draft.inquiryVolume, "Monthly patient inquiries");
    errors.paidMarketing = required(draft.paidMarketing, "Paid marketing status");
    errors.bottleneck = required(draft.bottleneck, "Primary bottleneck");
  }

  if (step === 3) errors.date = required(draft.date, "Date");
  if (step === 4) errors.time = required(draft.time, "Time");

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message)),
  ) as BookingErrors;
}

export function recommendSolution(draft: BookingDraft) {
  if (draft.bottleneck === "conversion") return "patient-conversion-system" as const;
  if (draft.bottleneck === "demand-and-conversion") return "growth-partnership" as const;
  return "diagnostic" as const;
}
