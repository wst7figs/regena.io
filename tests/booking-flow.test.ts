import { describe, expect, it } from "vitest";

import {
  type BookingDraft,
  recommendSolution,
  validateBookingStep,
} from "@/lib/booking-flow";

const base: BookingDraft = {
  name: "Luan West",
  email: "luan@example.com",
  phone: "7805550100",
  clinicName: "Example Clinic",
  role: "Owner",
  clinicType: "Longevity",
  locations: "1",
  inquiryVolume: "50-99",
  paidMarketing: "yes",
  bottleneck: "conversion",
  software: "",
  date: "2026-08-25",
  time: "10:30 AM",
};

describe("booking flow", () => {
  it("rejects malformed required contact and clinic fields", () => {
    expect(validateBookingStep(1, { ...base, email: "bad" })).toHaveProperty("email");
    expect(validateBookingStep(2, { ...base, inquiryVolume: "" })).toHaveProperty(
      "inquiryVolume",
    );
  });

  it("requires a date and time at their respective steps", () => {
    expect(validateBookingStep(3, { ...base, date: "" })).toHaveProperty("date");
    expect(validateBookingStep(4, { ...base, time: "" })).toHaveProperty("time");
  });

  it("routes the clinic by its stated bottleneck", () => {
    expect(recommendSolution(base)).toBe("patient-conversion-system");
    expect(recommendSolution({ ...base, bottleneck: "demand-and-conversion" })).toBe(
      "growth-partnership",
    );
    expect(recommendSolution({ ...base, bottleneck: "unknown" })).toBe("diagnostic");
  });
});
