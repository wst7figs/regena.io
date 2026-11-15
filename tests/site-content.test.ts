import { describe, expect, it } from "vitest";

import { siteNav, siteRoutes, solutions, teamMembers } from "@/lib/site-content";

describe("site content", () => {
  it("keeps the v2 routes", () => {
    expect(siteRoutes).toEqual([
      "/",
      "/apply",
      "/company",
      "/careers",
      "/blog",
      "/book",
      "/privacy",
      "/terms",
    ]);
    expect(solutions.map(({ slug }) => slug)).toEqual([
      "patient-conversion-system",
      "growth-partnership",
    ]);
    expect(siteNav.map(({ label }) => String(label))).not.toContain("Products");
  });

  it("contains only the confirmed launch team", () => {
    expect(teamMembers.map(({ name, role }) => [name, role])).toEqual([
      ["Luan West", "CEO & Co-Founder"],
      ["Jean-Pierre van Eeden", "COO & Co-Founder"],
      ["Julian Hollen", "CTO"],
      ["Shoham Zahir", "CSO"],
    ]);
  });
});
