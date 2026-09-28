import type { Metadata } from "next";
import { ArrowUpRight, Check, CircleX, Gauge, Headphones, Layers3 } from "lucide-react";

import { ConversionPipeline } from "@/components/conversion-pipeline";
import { ProofStory } from "@/components/proof-story";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorHero, InteriorPageShell, PageCta, ResultNote, SectionIntro, SignalDivider } from "@/components/site-primitives";
import { placeholderCaseStudy } from "@/lib/placeholder-case-study";

export const metadata: Metadata = {
  title: "Patient Conversion System",
  description: "Convert more existing patient inquiries into attended consultations with a managed conversion system.",
};

const systemLayers = [
  ["Build", "Design the journey", "Connect voice, chat, qualification, scheduling, reminders, and the operating view around the clinic."],
  ["Operate", "Manage live demand", "Monitor conversations, exceptions, and handoffs with human accountability."],
  ["Improve", "Remove the next leak", "Refine scripts, workflows, and response paths against observed operating outcomes."],
] as const;

export default function ConversionPage() {
  return (
    <InteriorPageShell className="conversion-page">
      <a className="skip-link" href="#content">Skip to content</a><SiteHeader />
      <main id="content" tabIndex={-1}>
        <InteriorHero eyebrow="Patient Conversion System" title="Stop losing high-intent patients between inquiry and consultation." description="Regena builds and operates the response, qualification, booking, and follow-up system around the demand your clinic already has." cta={{ label: "Book a strategy call", href: "/book" }}>
          <div className="leakage-hero-visual"><span>Incoming demand</span><i /><strong>Missed call</strong><i /><strong>Slow follow-up</strong><i /><strong>Booking friction</strong><div><Check size={18} /> Connected by Regena</div></div>
        </InteriorHero>
        <section className="interior-section interior-section-dark"><div className="shell"><SectionIntro eyebrow="System in motion" title="Repair every handoff, not just the first response." description="Select a stage to see how the operating state changes." /><ConversionPipeline /></div></section>
        <section className="interior-section"><div className="shell"><SectionIntro eyebrow="Managed conversion infrastructure" title="Built around the patient journey. Operated around the clinic." /><div className="managed-layer-grid">{systemLayers.map(([label, title, copy], index) => { const Icon = [Layers3, Headphones, Gauge][index]; return <article key={label}><Icon size={22} /><span>0{index + 1} · {label}</span><h3>{title}</h3><p>{copy}</p></article>; })}</div></div></section>
        <section className="interior-section implementation-section"><div className="shell"><SignalDivider label="Implementation sequence" /><div className="implementation-track">{["Audit the current journey", "Architect the connected system", "Build and integrate", "Launch under supervision", "Operate and improve"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}</div></div></section>
        <section className="interior-section proof-interior"><div className="shell"><SectionIntro eyebrow={placeholderCaseStudy.disclosure} title="A fictional example of the Patient Conversion System in motion." /><div data-client-story><ProofStory /></div><ResultNote>This is fictional placeholder data, created to show the type of operating view Regena builds. It is not a client result or guarantee.</ResultNote></div></section>
        <section className="interior-section fit-section"><div className="shell fit-two-column"><div><span className="eyebrow">Best fit</span><h2>Demand exists. The journey does not reliably convert it.</h2><ul>{["Meaningful inbound patient inquiries", "Capacity for additional qualified consultations", "High-consideration services", "Access to workflow and performance data"].map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></div><div className="poor-fit"><span>Not designed for</span>{["Clinics with no meaningful inquiry volume", "Teams without capacity to serve more patients", "Buyers looking for a low-cost standalone receptionist", "Organizations unwilling to improve process"].map((item) => <p key={item}><CircleX size={15} />{item}</p>)}</div></div></section>
        <section className="interior-section expansion-band"><div className="shell"><span>Need more demand too?</span><h2>Expand the same conversion infrastructure into the full Growth Partnership.</h2><a href="/solutions/growth-partnership">Explore Growth Partnership <ArrowUpRight size={17} /></a><PageCta title="Find where your patient journey is losing momentum." /></div></section>
      </main><SiteFooter />
    </InteriorPageShell>
  );
}
