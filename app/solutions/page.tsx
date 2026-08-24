import type { Metadata } from "next";
import { ArrowUpRight, Check, Layers3 } from "lucide-react";

import { SolutionRouter } from "@/components/solution-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorHero, InteriorPageShell, PageCta, SectionIntro, SignalDivider } from "@/components/site-primitives";
import { clinicCriteria, solutions } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Choose the Regena patient-growth system that fits your clinic's current bottleneck.",
};

const comparison = [
  ["Clinic situation", "Demand exists; conversion leaks", "Capacity exists; demand and conversion need work"],
  ["Core outcome", "More inquiries reach attended consultation", "One operated engine from acquisition to revenue visibility"],
  ["Starting point", "Response, qualification, booking, follow-up", "Demand architecture plus the complete conversion system"],
  ["Operating model", "Built, managed, and improved by Regena", "Joint growth roadmap operated with clinic leadership"],
  ["Best next step", "Repair the current patient journey", "Create demand and repair the full journey"],
] as const;

export default function SolutionsPage() {
  return (
    <InteriorPageShell className="solutions-page">
      <a className="skip-link" href="#content">Skip to content</a><SiteHeader />
      <main id="content" tabIndex={-1}>
        <InteriorHero eyebrow="Regena solutions" title="Choose the system your clinic needs next." description="Two starting points. One connected operating model built around the constraint holding patient growth back." cta={{ label: "Book a strategy call", href: "/book" }}>
          <div className="hero-routing-card"><span>Find the constraint</span><strong>Existing demand</strong><i /><strong>Demand + conversion</strong><small>Both paths resolve into one managed patient journey.</small></div>
        </InteriorHero>
        <section className="interior-section interior-section-dark"><div className="shell"><SectionIntro eyebrow="Route by constraint" title="Start where growth is actually breaking." description="The entry point changes. The standard of operation does not." /><SolutionRouter /></div></section>
        <section className="interior-section"><div className="shell"><SectionIntro eyebrow="Two engagements" title="Focused enough to buy. Connected enough to grow with you." /><div className="solution-card-grid">{solutions.map((solution, index) => <article className="solution-card" key={solution.slug}><span>0{index + 1} · {solution.eyebrow}</span><h3>{solution.name}</h3><p>{solution.shortDescription}</p><small>{solution.routingCue}</small><a href={solution.href}>Explore the solution <ArrowUpRight size={16} /></a></article>)}</div></div></section>
        <section className="interior-section comparison-section"><div className="shell"><SectionIntro eyebrow="Compare solutions" title="Different starting points. The same operating discipline." /><div className="comparison-grid" role="table" aria-label="Solution comparison"><div className="comparison-head" role="row"><strong role="columnheader">Decision</strong><strong role="columnheader">Patient Conversion System</strong><strong role="columnheader">Growth Partnership</strong></div>{comparison.map(([label, conversion, growth]) => <div className="comparison-row" role="row" key={label}><strong role="rowheader">{label}</strong><span role="cell">{conversion}</span><span role="cell">{growth}</span></div>)}</div></div></section>
        <section className="interior-section shared-system"><div className="shell"><SignalDivider label="Shared operating layer" /><div className="shared-system-grid"><div><Layers3 size={27} /><h2>Both solutions are managed infrastructure.</h2><p>Voice, chat, scheduling, follow-up, measurement, and human accountability work as one operating system.</p></div><ul>{clinicCriteria.slice(0, 4).map((criterion) => <li key={criterion.label}><Check size={15} /><span><strong>{criterion.label}</strong>{criterion.description}</span></li>)}</ul></div><PageCta title="Not sure which system fits? Start with the constraint." /></div></section>
      </main><SiteFooter />
    </InteriorPageShell>
  );
}
