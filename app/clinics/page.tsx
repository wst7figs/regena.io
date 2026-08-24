import type { Metadata } from "next";
import { Check, CircleX, Stethoscope } from "lucide-react";

import { ClinicDiagnostic } from "@/components/clinic-diagnostic";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorHero, InteriorPageShell, PageCta, SectionIntro } from "@/components/site-primitives";
import { clinicCriteria } from "@/lib/site-content";

export const metadata: Metadata = { title: "For Clinics", description: "See whether Regena fits your clinic's current demand, capacity, economics, and operating readiness." };

export default function ClinicsPage() {
  return (
    <InteriorPageShell className="clinics-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}>
      <InteriorHero eyebrow="For clinics" title="Regena is built for the clinic ready to operate growth seriously." description="Not every clinic needs this level of infrastructure. The right fit has meaningful patient economics, real capacity, and a journey worth improving." cta={{ label: "Book a strategy call", href: "/book" }} variant="editorial"><div className="clinic-fit-hero"><span>Fit signal</span>{clinicCriteria.slice(0, 4).map((item, index) => <div key={item.label}><i data-state={index < 3} /><strong>{item.label}</strong></div>)}</div></InteriorHero>
      <section className="interior-section"><div className="shell"><SectionIntro eyebrow="Operating readiness" title="Five conditions make a managed growth system worth building." /><div className="criteria-grid">{clinicCriteria.map((criterion, index) => <article key={criterion.label}><span>0{index + 1}</span><h3>{criterion.label}</h3><p>{criterion.description}</p></article>)}</div></div></section>
      <section className="interior-section interior-section-dark"><div className="shell"><SectionIntro eyebrow="Self-routing diagnostic" title="Which constraint describes the clinic today?" description="This is fit guidance, not a public score or rejection system." /><ClinicDiagnostic /></div></section>
      <section className="interior-section"><div className="shell fit-two-column"><div><span className="eyebrow">Designed around</span><h2>High-consideration patient journeys.</h2><p>Regenerative medicine, longevity, peptide, hormone, and adjacent medical or aesthetic clinics often share one problem: valuable patient intent crosses too many disconnected handoffs.</p><div className="specialty-list">{["Regenerative medicine", "Longevity care", "Peptide and hormone programs", "Adjacent high-consideration clinics"].map((item) => <span key={item}><Stethoscope size={15} />{item}</span>)}</div></div><div className="poor-fit"><span>Usually a poor fit</span>{["No reliable inquiry volume", "No provider or scheduling capacity", "Low-value services that cannot support managed infrastructure", "No access to the systems or data needed to improve", "Leadership wants a tool without process change"].map((item) => <p key={item}><CircleX size={15} />{item}</p>)}</div></div></section>
      <section className="interior-section"><div className="shell"><div className="clinic-signal-strip">{["Demand", "Capacity", "Economics", "Access", "Readiness"].map((item) => <span key={item}><Check size={14} />{item}</span>)}</div><PageCta title="Find out whether the operating model fits now." /></div></section>
    </main><SiteFooter /></InteriorPageShell>
  );
}
