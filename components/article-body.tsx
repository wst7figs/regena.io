import { ArrowUpRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ReadingProgress } from "@/components/reading-progress";
import type { Article } from "@/lib/blog";

export function ArticleBody({ article }: { article: Article }) {
  const isPressRelease = article.kind === "press-release";
  return (
    <article className={`article-layout${isPressRelease ? " press-release-layout" : ""}`}>
      <ReadingProgress />
      <header className="article-hero">
        <div className="shell">
          <Link className="article-back" href="/blog">Back to insights</Link>
          <span className="eyebrow eyebrow-dark">{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div className="article-byline"><span>{isPressRelease ? "Regena news desk" : "Regena operating team"}</span><span><Clock3 aria-hidden="true" size={14} /> {article.readingMinutes} min read</span><time dateTime={article.publishedAt}>{new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</time></div>
        </div>
      </header>

      {article.heroImage ? <div className="shell press-release-image"><Image src={article.heroImage} alt="Regena named an OpenAI Select Partner" width={1200} height={627} priority /></div> : null}

      {isPressRelease ? (
        <div className="shell press-release-main">
          <div className="press-release-label"><span>Press release</span><time dateTime={article.publishedAt}>September 8, 2026</time></div>
          <div className="press-release-copy">
            {article.pressReleaseBody?.map((paragraph, index) => <p className={index === 0 ? "press-release-dateline" : undefined} key={paragraph}>{paragraph}</p>)}
            {article.partnerUrl ? <p className="press-release-partner-link"><span>Learn more about the OpenAI Partner Network</span><a href={article.partnerUrl} target="_blank" rel="noreferrer">openai.com/business/partners <ArrowUpRight aria-hidden="true" size={16} /></a></p> : null}
          </div>
        </div>
      ) : <div className="shell article-main">
        <nav className="article-toc" aria-label="In this article">
          <span>In this article</span>
          {article.sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><small aria-hidden="true">0{index + 1}</small>{section.heading}</a>)}
        </nav>
        <div className="article-copy">
          {article.sections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <span>0{index + 1}</span>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <aside className="article-cta">
            <span>Put the journey on the table</span>
            <h2>Find the operating constraint before prescribing another tool.</h2>
            <Link className="button button-light" href="/quiz">Take the clinic diagnostic <ArrowUpRight aria-hidden="true" size={16} /></Link>
          </aside>
        </div>
      </div>}
    </article>
  );
}
