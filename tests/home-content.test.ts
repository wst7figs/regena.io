import { describe, expect, it } from "vitest";

import { journeyStages, navItems } from "@/lib/home-content";

describe("homepage content contract", () => {
  it("defines the five ordered journey stages", () => {
    expect(journeyStages.map((stage) => stage.label)).toEqual([
      "Acquire",
      "Respond",
      "Qualify",
      "Book",
      "Enroll",
    ]);
  });

  it("keeps every primary navigation item on the homepage", () => {
    expect(navItems.every((item) => item.href.startsWith("#"))).toBe(true);
  });
});
