import type { MetadataRoute } from "next";

import { launchArticles } from "@/lib/blog";
import { siteRoutes } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://regena.io";
  const updated = new Date("2026-09-27T12:00:00-06:00");
  const pages = siteRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: updated,
    changeFrequency: route === "/" || route === "/blog" ? "weekly" as const : "monthly" as const,
    priority: route === "/" ? 1 : route === "/book" || route === "/solutions" ? .9 : .7,
  }));
  const articles = launchArticles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(`${article.publishedAt}T12:00:00-06:00`),
    changeFrequency: "yearly" as const,
    priority: article.kind === "press-release" ? .8 : .6,
  }));
  return [...pages, ...articles];
}
