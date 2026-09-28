import { describe, expect, it } from "vitest";

import { launchArticles } from "@/lib/blog";

describe("launch Blog content", () => {
  it("ships the approved partner release and three original operational articles with unique routes", () => {
    expect(launchArticles.map((article) => article.slug)).toEqual([
      "regena-named-an-openai-select-partner",
      "why-patient-demand-disappears-between-inquiry-and-consultation",
      "why-an-ai-receptionist-is-not-a-patient-conversion-system",
      "five-numbers-clinic-owners-should-track",
    ]);
    expect(new Set(launchArticles.map((article) => article.slug)).size).toBe(4);
    launchArticles.filter((article) => article.kind !== "press-release").forEach((article) => {
      expect(article.excerpt.length).toBeGreaterThan(80);
      expect(article.sections.length).toBeGreaterThanOrEqual(4);
      expect(article.sections.flatMap((section) => section.paragraphs).join(" ")).not.toMatch(/guarantee|guaranteed/i);
    });
    const release = launchArticles[0];
    expect(release.pressReleaseBody?.join(" ")).toContain("put GPT-6 Astra to work");
    expect(release.pressReleaseBody?.join(" ")).not.toContain("GPT-5.6");
  });
});
