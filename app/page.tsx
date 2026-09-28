import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { HeroSystem } from "@/components/hero-system";
import { HeroRays } from "@/components/hero-rays";
import {
  BookingSection,
  CapabilityRail,
  ClientProofRibbon,
  FrictionSection,
  InfrastructureSection,
  OperatingModelSection,
  ProofSection,
  QuizCtaSection,
  SolutionHandoffSection,
} from "@/components/home-sections";
import { PatientJourney } from "@/components/patient-journey";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />

      <main id="content" tabIndex={-1}>
        <section className="hero-section" id="top" data-chapter="hero" aria-labelledby="hero-title">
          <HeroRays />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Patient-growth infrastructure</span>
              <h1 id="hero-title">Turn more patient demand into recurring revenue.</h1>
              <p>
                A managed growth system for regenerative and longevity clinics—built to connect demand,
                response, booking, and enrollment.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="/book">
                  Book a strategy call <ArrowUpRight aria-hidden="true" size={16} />
                </a>
                <a className="button button-secondary" href="#system">
                  See how the system works <ArrowDown aria-hidden="true" size={16} />
                </a>
              </div>
              <div className="hero-status" aria-label="Illustrative patient journey status">
                <span><i /> Answered</span>
                <span><i /> Qualified</span>
                <span><i /> Consultation booked</span>
              </div>
            </div>

            <div className="hero-visual">
              <HeroSystem />
            </div>
          </div>
          <CapabilityRail />
        </section>

        <ClientProofRibbon />

        <section className="journey-section" id="system" data-chapter="journey" aria-labelledby="journey-title">
          <div className="journey-ambient" aria-hidden="true" />
          <div className="shell">
            <Reveal className="journey-heading">
              <span className="eyebrow eyebrow-dark">System in motion</span>
              <h2 id="journey-title">One patient journey. Every handoff connected.</h2>
              <p>Five operating stages. One shared view of what the patient needs next.</p>
            </Reveal>
            <PatientJourney />
          </div>
        </section>

        <FrictionSection />
        <InfrastructureSection />
        <ProofSection />
        <OperatingModelSection />
        <SolutionHandoffSection />
        <BookingSection />
        <QuizCtaSection />
      </main>

      <SiteFooter />
    </>
  );
}
