import { describe, expect, it } from "vitest";

import { launchArticles } from "@/lib/blog";

describe("launch Blog content", () => {
  it("ships three original operational articles with unique routes", () => {
    expect(launchArticles.map((article) => article.slug)).toEqual([
      "why-patient-demand-disappears-between-inquiry-and-consultation",
      "why-an-ai-receptionist-is-not-a-patient-conversion-system",
      "five-numbers-clinic-owners-should-track",
    ]);
    expect(new Set(launchArticles.map((article) => article.slug)).size).toBe(3);
    launchArticles.forEach((article) => {
      expect(article.excerpt.length).toBeGreaterThan(80);
      expect(article.sections.length).toBeGreaterThanOrEqual(4);
      expect(article.sections.flatMap((section) => section.paragraphs).join(" ")).not.toMatch(/guarantee|guaranteed/i);
    });
  });
});
