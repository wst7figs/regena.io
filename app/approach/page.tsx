import type { Metadata } from "next";
import { Check, Eye, Network, ShieldCheck } from "lucide-react";

import { ApproachBlueprint } from "@/components/approach-blueprint";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorHero, InteriorPageShell, PageCta, SectionIntro } from "@/components/site-primitives";

export const metadata: Metadata = { title: "Our Approach", description: "How Regena audits, architects, builds, launches, operates, and improves clinic growth systems." };

export default function ApproachPage() {
  return (
    <InteriorPageShell className="approach-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}>
      <InteriorHero eyebrow="Our approach" title="Built like infrastructure. Operated like a growth partner." description="Regena does not hand over another tool. We take responsibility for the operating system around patient growth." cta={{ label: "Book a strategy call", href: "/book" }} variant="editorial"><div className="approach-hero-drawing"><span>Clinic reality</span><i /><strong>System architecture</strong><i /><strong>Live operation</strong><small>Audit before prescription.</small></div></InteriorHero>
      <section className="interior-section interior-section-dark"><div className="shell"><SectionIntro eyebrow="The operating method" title="Six stages from real clinic context to continuous improvement." description="Select each layer to inspect how the system assembles." /><ApproachBlueprint /></div></section>
      <section className="interior-section"><div className="shell"><SectionIntro eyebrow="Integration and visibility" title="The technical layer serves the operating model—not the other way around." /><div className="system-depth-grid"><article><Network /><span>Connected systems</span><h3>One journey across the clinic stack.</h3><p>Patient context, schedules, workflows, and reporting connect around clear handoffs.</p></article><article><Eye /><span>Operating visibility</span><h3>See the state of the journey.</h3><p>Leaders can understand response, qualification, booking, attendance, and where work is blocked.</p></article><article><ShieldCheck /><span>Human oversight</span><h3>Accountability remains visible.</h3><p>Automation handles repeatable work while experienced operators review quality and exceptions.</p></article></div></div></section>
      <section className="interior-section accountability-band"><div className="shell"><div><span className="eyebrow eyebrow-dark">Accountability model</span><h2>Technology executes. People remain responsible.</h2><p>Every workflow has an owner, every exception has a path, and every operating decision connects to a clinic outcome.</p></div><ul>{["Clear owners for every operating layer", "Supervised launch and quality review", "Escalation paths for exceptions", "Continuous decisions grounded in real performance"].map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><PageCta title="See how this operating model fits your clinic." /></div></section>
    </main><SiteFooter /></InteriorPageShell>
  );
}
