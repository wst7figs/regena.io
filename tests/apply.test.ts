import { describe, expect, it } from "vitest";

import { bookingSrc } from "@/components/booking-widget";
import { parseAnswers, parseContact, qualify } from "@/lib/apply";
import type { ApplyAnswers } from "@/lib/v2-content";

const good: ApplyAnswers = { treatment: "laser", revenue: "50-100k", pastPatients: "1000-plus", adBudget: "yes" };
const contact = { name: "Ana Diaz", clinic: "Glow Laser", email: "ana@glow.ca", phone: "780 555 0101", city: "Edmonton", region: "Alberta", country: "CA", consent: true };

describe("booking calendar prefill", () => {
  it("passes applicant details to the HighLevel form and skips blanks", () => {
    const url = new URL(bookingSrc({ name: "Ana Diaz", email: "ana@glow.ca", phone: "780 555 0101", website: " " }));
    expect(url.searchParams.get("full_name")).toBe("Ana Diaz");
    expect(url.searchParams.get("email")).toBe("ana@glow.ca");
    expect(url.searchParams.get("phone")).toBe("780 555 0101");
    expect(url.searchParams.has("website")).toBe(false);
    expect(bookingSrc()).not.toContain("?");
  });
});

describe("apply funnel rules", () => {
  it("accepts a complete contact and rejects missing consent", () => {
    expect(parseContact(contact).ok).toBe(true);
    expect(parseContact({ ...contact, consent: false }).ok).toBe(false);
    expect(parseContact({ ...contact, phone: "555" }).ok).toBe(false);
  });

  it("only accepts listed answers", () => {
    expect(parseAnswers(good).ok).toBe(true);
    expect(parseAnswers({ ...good, revenue: "a lot" }).ok).toBe(false);
  });

  it("qualifies a laser clinic with budget", () => {
    expect(qualify({ country: "CA", region: "Alberta" }, good)).toEqual({ fit: true });
  });

  it("only turns away Florida; every other answer goes to a call", () => {
    expect(qualify({ country: "US", region: "FL" }, good).fit).toBe(false);
    expect(qualify({ country: "US", region: "Florida" }, good).fit).toBe(false);
    expect(qualify({ country: "US", region: "Texas" }, good).fit).toBe(true);
    expect(qualify({ country: "CA", region: "FL" }, good).fit).toBe(true);
    const small: ApplyAnswers = { treatment: "injectables", revenue: "under-25k", pastPatients: "under-500", adBudget: "no" };
    expect(qualify({ country: "CA", region: "Ontario" }, small).fit).toBe(true);
    expect(qualify({ country: "CA", region: "Ontario" }, { ...good, treatment: "body", adBudget: "unsure" }).fit).toBe(true);
  });
});
