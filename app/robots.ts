import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/studio/"] },
    ],
    sitemap: "https://regena.io/sitemap.xml",
    host: "https://regena.io",
  };
}
