import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog-index";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorPageShell } from "@/components/site-primitives";
import { getArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Practical writing on patient conversion, clinic-growth operations, and the systems connecting demand to attended consultations.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const articles = await getArticles();
  return <InteriorPageShell className="blog-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}>
    <section className="blog-hero"><div className="shell"><span className="eyebrow">Regena field notes</span><h1>Operating ideas for the space between patient demand and clinic revenue.</h1><p>Clear thinking on response, qualification, booking, attendance, measurement, and the systems holding those states together.</p></div></section>
    <section className="interior-section"><div className="shell"><BlogIndex articles={articles} /></div></section>
  </main><SiteFooter /></InteriorPageShell>;
}
