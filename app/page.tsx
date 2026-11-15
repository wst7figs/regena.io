import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Check, Minus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { teamMembers } from "@/lib/site-content";
import {
  comparison,
  countingProcess,
  countingRules,
  faqs,
  goodFit,
  heroFacts,
  notFit,
  sampleReport,
  services,
  steps,
} from "@/lib/v2-content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const statusLabel = { showed: "Showed", "no-show": "No-show", rebooked: "Rebooked", excluded: "Excluded" } as const;

function ApplyButton({ label = "Check if your area is open" }: { label?: string }) {
  return <Link className="button button-dark v2-cta" href="/apply">{label} <ArrowUpRight aria-hidden="true" size={17} /></Link>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />

      <main id="content" tabIndex={-1} className="v2">
        <section className="v2-hero" aria-labelledby="hero-title">
          <div className="shell v2-hero-grid">
            <div className="v2-hero-copy">
              <span className="eyebrow">For med spas and aesthetic clinics</span>
              <h1 id="hero-title">Patients in your chair, not just leads in your inbox.</h1>
              <p className="v2-lede">
                We run your Meta ads, call every lead within minutes, book and confirm them, chase no-shows and bring back
                past patients. Our fee is tied to patients who actually show up, not leads or clicks.
              </p>
              <div className="v2-hero-actions">
                <ApplyButton />
                <a className="button button-secondary" href="#how">See how it works <ArrowDown aria-hidden="true" size={16} /></a>
              </div>
              <small className="v2-hero-note">Takes about 2 minutes. One clinic per area.</small>
            </div>

            <figure className="v2-report" aria-label="Sample weekly report">
              <div className="v2-report-head">
                <span>Weekly report</span>
                <small>Sample layout</small>
              </div>
              <ul>
                {sampleReport.map((row, index) => (
                  <li key={index} data-status={row.status}>
                    <div><strong>{row.patient}</strong><small>{row.detail}</small></div>
                    <span className="v2-status">{statusLabel[row.status]}</span>
                    <em>{row.note}</em>
                  </li>
                ))}
              </ul>
              <figcaption>Every completed appointment by source. The report is also your invoice.</figcaption>
            </figure>
          </div>

          <div className="shell">
            <ul className="v2-facts" aria-label="Program terms">
              {heroFacts.map((fact) => <li key={fact}><Check aria-hidden="true" size={15} />{fact}</li>)}
            </ul>
          </div>
        </section>

        <section className="v2-section v2-paper" aria-labelledby="gap-title">
          <div className="shell">
            <Reveal className="v2-heading">
              <span className="eyebrow">The gap</span>
              <h2 id="gap-title">Most agencies stop at the booking.</h2>
              <p>They hand you a calendar and leave the follow-up to your front desk. Leads go cold in hours, no-shows don&apos;t get chased, and past patients never hear from you. That&apos;s where the money leaks. We own all of it.</p>
            </Reveal>
            <Reveal>
              <div className="v2-compare" role="table" aria-label="Typical agency compared with Regena">
                <div className="v2-compare-row v2-compare-head" role="row">
                  <span role="columnheader"><span className="sr-only">Topic</span></span>
                  <span role="columnheader">Typical agency</span>
                  <span role="columnheader">Regena</span>
                </div>
                {comparison.map((row) => (
                  <div className="v2-compare-row" role="row" key={row.topic}>
                    <span role="rowheader">{row.topic}</span>
                    <span role="cell" className="v2-agency"><Minus aria-hidden="true" size={15} />{row.agency}</span>
                    <span role="cell" className="v2-regena"><Check aria-hidden="true" size={15} />{row.regena}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="v2-section v2-dark" aria-labelledby="services-title">
          <div className="shell">
            <Reveal className="v2-heading">
              <span className="eyebrow eyebrow-dark">What we run</span>
              <h2 id="services-title">Everything after the click.</h2>
              <p>You treat patients. We handle the ads and the people they bring in, from the first text to the package after the first visit.</p>
            </Reveal>
            <ol className="v2-services">
              {services.map((service, index) => (
                <li key={service.title}>
                  <span className="v2-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="v2-section" id="how" aria-labelledby="how-title">
          <div className="shell">
            <Reveal className="v2-heading">
              <span className="eyebrow">How it works</span>
              <h2 id="how-title">Live in about two weeks.</h2>
            </Reveal>
            <ol className="v2-steps">
              {steps.map((step) => (
                <li key={step.title}>
                  <span className="v2-when">{step.when}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="v2-section v2-paper" id="counts" aria-labelledby="counts-title">
          <div className="shell v2-counts">
            <Reveal className="v2-heading">
              <span className="eyebrow">What counts</span>
              <h2 id="counts-title">Our fee follows one thing: a patient who completes an appointment.</h2>
              <p>Most agencies count leads or bookings and keep the definition vague. Here is what counts for us.</p>
            </Reveal>
            <div className="v2-counts-grid">
              <Reveal className="v2-card">
                <h3>Counts and doesn&apos;t</h3>
                <ul className="v2-rules">
                  {countingRules.map((rule) => (
                    <li key={rule.text} data-counts={rule.counts}>
                      {rule.counts ? <Check aria-hidden="true" size={17} /> : <X aria-hidden="true" size={17} />}
                      <span><span className="sr-only">{rule.counts ? "Counts: " : "Never counts: "}</span>{rule.text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="v2-card">
                <h3>How it&apos;s tracked</h3>
                <ol className="v2-process">
                  {countingProcess.map((item) => <li key={item}>{item}</li>)}
                </ol>
              </Reveal>
            </div>
            <p className="v2-promise"><strong>You never pay for a no-show.</strong> If a patient doesn&apos;t walk in, it costs you nothing, and we work to get them back on the calendar.</p>
          </div>
        </section>

        <section className="v2-section" id="fit" aria-labelledby="fit-title">
          <div className="shell">
            <Reveal className="v2-heading">
              <span className="eyebrow">Who it&apos;s for</span>
              <h2 id="fit-title">Built for clinics with room to grow.</h2>
              <p>We work with med spas and aesthetic clinics across Canada and the US. It works best when a few things are true.</p>
            </Reveal>
            <div className="v2-fit-grid">
              <Reveal className="v2-card v2-fit-yes">
                <h3>Works best when</h3>
                <ul>{goodFit.map((item) => <li key={item}><Check aria-hidden="true" size={17} />{item}</li>)}</ul>
              </Reveal>
              <Reveal className="v2-card v2-fit-no">
                <h3>Probably not the right time if</h3>
                <ul>{notFit.map((item) => <li key={item}><X aria-hidden="true" size={17} />{item}</li>)}</ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="v2-section v2-dark" aria-labelledby="team-title">
          <div className="shell v2-team">
            <Reveal className="v2-heading">
              <span className="eyebrow eyebrow-dark">Who you work with</span>
              <h2 id="team-title">Founder-led, and small on purpose.</h2>
              <p>We&apos;re taking a small number of partner clinics, one per area, and you work directly with the founders. Based in Edmonton, working with clinics across Canada and the US.</p>
            </Reveal>
            <ul className="v2-team-grid">
              {teamMembers.map((member) => (
                <li key={member.name}>
                  <a href={member.linkedin} target="_blank" rel="noreferrer">
                    <Image src={member.photo} alt="" width={320} height={380} />
                    <strong>{member.name}</strong>
                    <small>{member.role}</small>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="v2-section" id="faq" aria-labelledby="faq-title">
          <div className="shell v2-faq">
            <Reveal className="v2-heading">
              <span className="eyebrow">FAQ</span>
              <h2 id="faq-title">Questions clinic owners ask.</h2>
            </Reveal>
            <div className="v2-faq-list">
              {faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-final" aria-labelledby="final-title">
          <div className="shell v2-final-inner">
            <h2 id="final-title">One clinic per area. Check if yours is open.</h2>
            <p>Answer a few quick questions. If it&apos;s a fit, you&apos;ll pick a time with Luan right away.</p>
            <ApplyButton label="Check your area" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
