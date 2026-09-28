import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/article-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorPageShell } from "@/components/site-primitives";
import { getArticle, launchArticles } from "@/lib/blog";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return launchArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };
  const url = `/blog/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.excerpt,
      publishedTime: `${article.publishedAt}T12:00:00-06:00`,
      authors: ["Regena"],
      images: article.heroImage ? [{ url: article.heroImage, width: 1200, height: 627, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.heroImage ? [article.heroImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": article.kind === "press-release" ? "NewsArticle" : "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: `https://regena.io/blog/${article.slug}`,
    image: article.heroImage ? [`https://regena.io${article.heroImage}`] : undefined,
    author: { "@type": "Organization", name: "Regena", url: "https://regena.io" },
    publisher: { "@type": "Organization", name: "Regena", url: "https://regena.io" },
  };
  return <InteriorPageShell className="article-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} /><ArticleBody article={article} /></main><SiteFooter /></InteriorPageShell>;
}
