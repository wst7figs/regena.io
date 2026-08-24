import { ArrowUpRight, Clock3 } from "lucide-react";
import Link from "next/link";

import type { Article } from "@/lib/blog";

function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="article-meta">
      <span>{article.category}</span>
      <span><Clock3 aria-hidden="true" size={13} /> {article.readingMinutes} min read</span>
      <time dateTime={article.publishedAt}>{new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}</time>
    </div>
  );
}

export function BlogIndex({ articles }: { articles: Article[] }) {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const remaining = articles.filter((article) => article.slug !== featured?.slug);

  if (!featured) {
    return <section className="blog-empty"><h2>Field notes are being prepared.</h2><p>Return soon for practical writing on patient conversion and clinic-growth operations.</p></section>;
  }

  return (
    <div className="blog-index">
      <Link className="blog-featured" href={`/blog/${featured.slug}`} aria-label={`Read ${featured.title}`}>
        <div className="blog-featured-copy">
          <ArticleMeta article={featured} />
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <span className="blog-read">Read the field note <ArrowUpRight aria-hidden="true" size={17} /></span>
        </div>
        <div className="blog-signal" aria-hidden="true">
          <span>Patient intent</span>
          <div className="blog-signal-line"><i /><i /><i /><i /><i /></div>
          <ol><li>Inquiry</li><li>Response</li><li>Booking</li><li>Attendance</li><li>Outcome</li></ol>
          <strong>Find the handoff where momentum disappears.</strong>
        </div>
      </Link>

      <div className="blog-card-grid">
        {remaining.map((article, index) => (
          <Link className="blog-card" href={`/blog/${article.slug}`} key={article.slug} aria-label={`Read ${article.title}`}>
            <span className="blog-card-index">0{index + 2}</span>
            <ArticleMeta article={article} />
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <span className="blog-read">Read article <ArrowUpRight aria-hidden="true" size={16} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
