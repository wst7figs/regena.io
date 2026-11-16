import type { Metadata } from "next";
import { Check } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorHero, InteriorPageShell, PageCta, SectionIntro } from "@/components/site-primitives";
import { TeamGrid } from "@/components/team-grid";
import { showTeam } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Company",
  description: "Regena is a founder-led team in Edmonton putting patients in the chair for med spas and aesthetic clinics across Canada and the US.",
};

const principles = [
  "Get paid when patients show up, not for activity",
  "Call every lead while they still care",
  "Never give medical advice. Providers own clinical questions",
  "Show every appointment by name and source",
  "Say what is proven, and what is not yet",
  "One clinic per area, so we never compete against ourselves",
];

export default function CompanyPage() {
  return (
    <InteriorPageShell className="company-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}>
      <InteriorHero eyebrow="Company" title="We own everything after the click." description="Most clinics already get leads. They lose them in the gaps: a slow callback, a booking nobody confirms, a no-show nobody chases, a past patient nobody calls. Regena runs that whole stretch for med spas and aesthetic clinics, and ties our fee to patients who actually show up." cta={{ label: "Check if your area is open", href: "/apply" }} variant="editorial"><div className="company-hero-manifesto"><span>Why we exist</span><blockquote>A lead is not a patient until they walk in.</blockquote><p>So that is what we measure, and what our fee follows.</p><i /></div></InteriorHero>
      {showTeam && <section className="interior-section interior-section-dark company-team-section"><div className="shell"><SectionIntro eyebrow="Meet Regena" title="Founder-led, and small on purpose." description="We're based in Edmonton and work with clinics across Canada and the US. We take a small number of partner clinics, one per area, and you work directly with the founders." /><TeamGrid /></div></section>}
      <section className="interior-section"><div className="shell"><SectionIntro eyebrow="How we work" title="The rules we hold ourselves to." /><div className="principles-grid">{principles.map((item, index) => <div key={item}><span>0{index + 1}</span><strong><Check size={15} />{item}</strong></div>)}</div><PageCta eyebrow="Careers at Regena" title="Want to help put patients in the chair?" description="We're hiring people who care about what happens after the click." href="/careers" label="View careers" /></div></section>
    </main><SiteFooter /></InteriorPageShell>
  );
}
