import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export type LegalSection = { id: string; title: string; content: ReactNode };

export function LegalLayout({ eyebrow, title, description, sections }: { eyebrow: string; title: string; description: string; sections: LegalSection[] }) {
  return (
    <div className="interior-page legal-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}><section className="legal-hero"><div className="shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><strong>Draft for legal review</strong></div></section><div className="shell legal-grid"><nav aria-label={`${title} sections`}>{sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span>0{index + 1}</span>{section.title}</a>)}</nav><article>{sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2>{section.content}</section>)}</article></div></main><SiteFooter /></div>
  );
}
