import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArticleBody } from "@/components/article-body";
import { BlogIndex } from "@/components/blog-index";
import { findArticle, launchArticles } from "@/lib/blog";

describe("Blog experience", () => {
  it("makes the featured article and every launch article reachable", () => {
    render(<BlogIndex articles={launchArticles} />);

    expect(screen.getByRole("heading", { name: launchArticles[0].title })).toBeInTheDocument();
    launchArticles.forEach((article) => {
      expect(screen.getByRole("link", { name: new RegExp(article.title, "i") })).toHaveAttribute(
        "href",
        `/blog/${article.slug}`,
      );
    });
  });

  it("renders a useful article outline and the complete article", () => {
    const article = launchArticles.find((item) => item.kind !== "press-release")!;
    render(<ArticleBody article={article} />);

    expect(screen.getByRole("navigation", { name: /in this article/i })).toBeInTheDocument();
    article.sections.forEach((section) => {
      expect(screen.getByRole("link", { name: section.heading })).toHaveAttribute("href", `#${section.id}`);
      expect(screen.getByRole("heading", { name: section.heading })).toBeInTheDocument();
    });
  });

  it("renders the approved partner release without the removed tracked sentence", () => {
    const article = launchArticles.find((item) => item.kind === "press-release")!;
    render(<ArticleBody article={article} />);
    expect(screen.getByText(/put GPT-6 Astra to work/i)).toBeVisible();
    expect(screen.queryByText(/GPT-5\.6/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /openai\.com\/business\/partners/i })).toHaveAttribute("href", "https://openai.com/business/partners/");
  });

  it("returns null for unknown article slugs", () => {
    expect(findArticle("missing-article")).toBeNull();
  });
});
