import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("search discovery", () => {
  it("publishes a sitemap with the press release and core site routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://regena.io/");
    expect(urls).toContain("https://regena.io/blog/regena-named-an-openai-select-partner");
    expect(urls).toContain("https://regena.io/careers");
  });

  it("allows public pages while protecting internal endpoints", () => {
    const policy = robots();
    expect(policy.sitemap).toBe("https://regena.io/sitemap.xml");
    expect(policy.rules).toEqual(expect.arrayContaining([expect.objectContaining({ allow: "/", disallow: ["/api/", "/studio/"] })]));
  });
});
