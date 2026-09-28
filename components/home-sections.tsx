import {
  ArrowUpRight,
  Check,
  Gauge,
  Headphones,
  Layers3,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { ArchitectureMap } from "@/components/architecture-map";
import { BookingResolution } from "@/components/booking-resolution";
import { LeakFlow } from "@/components/leak-flow";
import { ProofStory } from "@/components/proof-story";
import {
  fitCriteria,
} from "@/lib/home-content";
import { placeholderCaseStudy } from "@/lib/placeholder-case-study";
import { solutions } from "@/lib/site-content";
import { Reveal } from "@/components/reveal";

const capabilities = [
  "Voice",
  "Chat",
  "Qualification",
  "Scheduling",
  "Follow-up",
  "Revenue attribution",
] as const;

export function CapabilityRail() {
  return (
    <div className="capability-rail" role="region" aria-label="Regena capabilities">
      <div className="shell capability-grid">
        {capabilities.map((capability, index) => (
          <div key={capability}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{capability}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientProofRibbon() {
  return (
    <aside className="client-proof-ribbon" role="region" aria-label="Illustrative patient conversion example">
      <div className="client-proof-glow" aria-hidden="true" />
      <div className="shell client-proof-ribbon-grid">
        <div className="client-proof-client">
          <span>{placeholderCaseStudy.disclosure}</span>
          <strong>{placeholderCaseStudy.client}</strong>
        </div>
        <div className="client-proof-result">
          <strong>{placeholderCaseStudy.result}</strong>
          <span>{placeholderCaseStudy.resultLabel}</span>
        </div>
        <div className="client-proof-context">
          <span>{placeholderCaseStudy.period}</span>
          <a href="#story">View client story <ArrowUpRight aria-hidden="true" size={16} /></a>
        </div>
      </div>
    </aside>
  );
}

export function FrictionSection() {
  return (
    <section className="friction-section" id="outcomes" data-chapter="leakage" aria-labelledby="friction-title">
      <div className="shell">
        <Reveal className="section-intro section-intro-split">
          <span className="eyebrow">Where growth leaks</span>
          <div>
            <h2 id="friction-title">The lead is rarely the problem. The space between steps is.</h2>
            <p>
              Patient demand loses value when the systems around it move independently. Regena is designed
              around the handoffs that determine whether interest becomes revenue.
            </p>
          </div>
        </Reveal>

        <LeakFlow />
      </div>
    </section>
  );
}

export function InfrastructureSection() {
  return (
    <section className="infrastructure-section" id="approach" data-chapter="architecture" aria-labelledby="infrastructure-title">
      <div className="shell infrastructure-grid">
        <Reveal className="infrastructure-copy">
          <span className="eyebrow">The Regena architecture</span>
          <h2 id="infrastructure-title">One operating system across the patient journey.</h2>
          <p>
            Each layer has a clear job. Together, they create the visibility and continuity a clinic needs
            to grow without adding more disconnected tools.
          </p>
          <a className="text-link" href="#story">See the operating view <MoveRight size={17} /></a>
        </Reveal>

        <ArchitectureMap />
      </div>
    </section>
  );
}

export function ProofSection() {
  return (
    <section className="proof-section" id="story" data-chapter="proof" aria-labelledby="proof-title">
      <div className="shell">
        <Reveal className="proof-heading">
          <div>
            <span className="eyebrow">Proof and control</span>
            <h2 id="proof-title">Built like infrastructure.<br />Operated like a growth partner.</h2>
          </div>
          <a className="button button-primary" href="/book">
            Book a strategy call <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <ProofStory />
      </div>
    </section>
  );
}

export function OperatingModelSection() {
  const operatingSteps = [
    { id: "build", icon: Layers3, label: "Build", title: "Designed around the clinic", copy: "The system fits the services, team, tools, and patient journey already in place." },
    { id: "operate", icon: Headphones, label: "Operate", title: "Managed in the real world", copy: "Automation and human oversight work together so the system holds up under live demand." },
    { id: "improve", icon: Gauge, label: "Improve", title: "Refined against outcomes", copy: "The operating view reveals where the next conversion improvement should happen." },
  ] as const;

  return (
    <section className="operating-section" data-chapter="operating-model" aria-labelledby="operating-title">
      <div className="shell">
        <Reveal className="operating-heading">
          <span className="eyebrow eyebrow-dark">How Regena works</span>
          <h2 id="operating-title">Not another tool to manage.<br />A system that gets managed.</h2>
        </Reveal>

        <div className="operating-timeline">
          <div className="operating-signal" aria-hidden="true" />
          {operatingSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal className="operating-step" data-operating-step={step.id} key={step.label}>
                <div className="operating-step-top">
                  <span>0{index + 1}</span>
                  <Icon size={21} aria-hidden="true" />
                </div>
                <small>{step.label}</small>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function SolutionHandoffSection() {
  return (
    <section className="solution-handoff-section section-light" data-chapter="solutions" aria-labelledby="solution-handoff-title">
      <div className="shell">
        <Reveal className="home-solution-handoff">
          <div className="home-solution-intro">
            <span className="eyebrow">Two starting points</span>
            <h2 id="solution-handoff-title">Start with the constraint. Expand when the clinic is ready.</h2>
          </div>
          <div className="home-solution-links">
            {solutions.map((solution, index) => (
              <a href={solution.href} key={solution.slug}>
                <span>0{index + 1} · {solution.eyebrow}</span>
                <strong>{solution.name}</strong>
                <small>{solution.shortDescription}</small>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function BookingSection() {
  return (
    <section className="booking-section" data-chapter="booking" aria-labelledby="booking-title">
      <div className="booking-light booking-light-one" aria-hidden="true" />
      <div className="booking-light booking-light-two" aria-hidden="true" />
      <div className="shell booking-grid">
        <Reveal className="booking-copy">
          <span className="eyebrow eyebrow-dark">A focused first conversation</span>
          <h2 id="booking-title">See where your patient journey is losing momentum.</h2>
          <p>
            We&apos;ll map what happens between first inquiry and enrolled patient, then identify the handoffs
            worth rebuilding first.
          </p>
          <a className="button button-light" href="/book">
            Book a strategy call <ArrowUpRight size={17} />
          </a>
          <small className="booking-placeholder">Focused clinic-growth diagnostic · No preparation required.</small>
        </Reveal>

        <div className="booking-resolution-column">
          <BookingResolution />
          <Reveal className="fit-card fit-card-compact">
            <div className="fit-card-head">
              <div className="fit-icon"><Sparkles size={20} aria-hidden="true" /></div>
              <div><span>Built for the right fit</span><strong>Regena works best when...</strong></div>
            </div>
            <ul>
              {fitCriteria.map((criterion) => (
                <li key={criterion}><Check size={15} aria-hidden="true" />{criterion}</li>
              ))}
            </ul>
            <div className="fit-footer"><ShieldCheck size={16} aria-hidden="true" /> Selective by design</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function QuizCtaSection() {
  return (
    <section className="quiz-cta-section" data-chapter="diagnostic" aria-labelledby="quiz-cta-title">
      <div className="shell">
        <Reveal className="quiz-cta-card">
          <div className="quiz-cta-copy">
            <span className="eyebrow">Not ready to choose?</span>
            <h2 id="quiz-cta-title">Not sure which program fits your clinic?</h2>
            <p>Answer a few practical questions about your demand, services, and current bottleneck. We&apos;ll show you the most useful starting point and the example upside behind it.</p>
          </div>
          <div className="quiz-cta-action">
            <div className="quiz-route-preview" aria-hidden="true">
              <span>Existing demand</span><i /><span>Demand + conversion</span>
            </div>
            <small>About five minutes · Results shown immediately</small>
            <a className="button button-dark" href="/quiz">Take the clinic diagnostic <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
