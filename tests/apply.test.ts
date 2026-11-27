import { describe, expect, it } from "vitest";

import { bookingSrc } from "@/components/booking-widget";
import { flagsFor, parseAnswers, parseContact, qualify } from "@/lib/apply";
import { pickAttribution } from "@/lib/attribution";
import type { ApplyAnswers } from "@/lib/v2-content";

const good: ApplyAnswers = { treatment: "laser", capacity: "50-100", packagePrice: "1500-2500", revenue: "50-100k", pastPatients: "1000-plus", adBudget: "yes" };
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

  it("passes ad campaign tags to the calendar and ignores anything else", () => {
    const attribution = pickAttribution(new URLSearchParams("utm_source=facebook&utm_campaign=fall&fbclid=abc&token=secret"));
    expect(attribution).toEqual({ utm_source: "facebook", utm_campaign: "fall", fbclid: "abc" });
    const url = new URL(bookingSrc(undefined, attribution));
    expect(url.searchParams.get("utm_campaign")).toBe("fall");
    expect(url.searchParams.get("fbclid")).toBe("abc");
    expect(url.searchParams.has("token")).toBe(false);
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

  it("turns away Florida and Quebec", () => {
    expect(qualify({ country: "US", region: "FL" }, good).fit).toBe(false);
    expect(qualify({ country: "US", region: "Florida" }, good).fit).toBe(false);
    expect(qualify({ country: "CA", region: "QC" }, good).fit).toBe(false);
    expect(qualify({ country: "CA", region: "Québec" }, good).fit).toBe(false);
    expect(qualify({ country: "US", region: "Texas" }, good).fit).toBe(true);
    expect(qualify({ country: "CA", region: "FL" }, good).fit).toBe(true);
  });

  it("applies the v4 gates and lets borderline clinics book with flags", () => {
    expect(qualify({ country: "CA", region: "Ontario" }, { ...good, packagePrice: "under-1000" }).fit).toBe(false);
    expect(qualify({ country: "CA", region: "Ontario" }, { ...good, revenue: "under-25k" }).fit).toBe(false);
    expect(qualify({ country: "CA", region: "Ontario" }, { ...good, adBudget: "no" }).fit).toBe(false);
    const borderline: ApplyAnswers = { ...good, treatment: "injectables", capacity: "under-30", packagePrice: "1000-1500", revenue: "25-50k", adBudget: "unsure" };
    expect(qualify({ country: "CA", region: "Ontario" }, borderline).fit).toBe(true);
    expect(flagsFor(borderline)).toEqual(["capacity", "package", "revenue", "adBudget"]);
    expect(flagsFor(good)).toEqual([]);
  });
});
