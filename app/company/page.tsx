import type { Metadata } from "next";
import { Check } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorHero, InteriorPageShell, PageCta, SectionIntro } from "@/components/site-primitives";
import { TeamGrid } from "@/components/team-grid";

export const metadata: Metadata = { title: "Company", description: "Meet the team accountable for building and operating Regena patient-growth infrastructure." };

export default function CompanyPage() {
  return (
    <InteriorPageShell className="company-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}>
      <InteriorHero eyebrow="Company" title="One operating team around the complete patient journey." description="Clinic growth breaks when demand, response, booking, and measurement belong to different people. Regena was built to replace those disconnected handoffs with one accountable operating system." cta={{ label: "Book a strategy call", href: "/book" }} variant="editorial"><div className="company-hero-manifesto"><span>The conviction</span><blockquote>Growth should not disappear between specialists.</blockquote><p>Strategy matters only when daily execution can carry it.</p><i /></div></InteriorHero>
      <section className="interior-section interior-section-dark company-team-section"><div className="shell"><SectionIntro eyebrow="Meet Regena" title="The people accountable for direction, operations, engineering, and growth." description="A founder-led team building the commercial and technical infrastructure clinics are usually forced to assemble alone." /><TeamGrid /></div></section>
      <section className="interior-section"><div className="shell"><SectionIntro eyebrow="Operating principles" title="How we intend to make the work hold up." /><div className="principles-grid">{["Diagnose before prescribing", "Build around clinic reality", "Keep accountability human", "Measure the full journey", "Improve the system continuously", "Say what is verified—and what is not"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong><Check size={15} />{item}</strong></div>)}</div><PageCta eyebrow="Careers at Regena" title="Want to help build the operating standard?" description="We are hiring commercial and technical operators who care about what happens after launch." href="/careers" /></div></section>
    </main><SiteFooter /></InteriorPageShell>
  );
}
