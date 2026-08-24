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
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return <InteriorPageShell className="article-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}><ArticleBody article={article} /></main><SiteFooter /></InteriorPageShell>;
}
