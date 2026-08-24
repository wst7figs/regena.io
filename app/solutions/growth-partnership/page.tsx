import type { Metadata } from "next";
import { BarChart3, Check, CircleDollarSign, Compass, RefreshCcw } from "lucide-react";

import { GrowthSignal } from "@/components/growth-signal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorHero, InteriorPageShell, PageCta, SectionIntro, SignalDivider } from "@/components/site-primitives";

export const metadata: Metadata = {
  title: "Growth Partnership",
  description: "Build and operate a connected patient-growth engine across demand, conversion, and revenue visibility.",
};

export default function GrowthPage() {
  return (
    <InteriorPageShell className="growth-page">
      <a className="skip-link" href="#content">Skip to content</a><SiteHeader />
      <main id="content" tabIndex={-1}>
        <InteriorHero eyebrow="Regena Growth Partnership" title="Build demand. Convert it. See what creates revenue." description="A managed growth partnership for established clinics ready to connect acquisition, patient conversion, and operating visibility." cta={{ label: "Book a strategy call", href: "/book" }} variant="editorial">
          <div className="growth-hero-ledger"><span>Executive operating view</span>{["Demand", "Conversion", "Attendance", "Revenue visibility"].map((item, index) => <div key={item}><strong>{item}</strong><i style={{ width: `${48 + index * 13}%` }} /></div>)}</div>
        </InteriorHero>
        <section className="interior-section interior-section-dark"><div className="shell"><SectionIntro eyebrow="Connected growth engine" title="Acquisition cannot operate separately from conversion." description="Demand enters one managed patient journey instead of disappearing between vendors and tools." /><GrowthSignal /></div></section>
        <section className="interior-section"><div className="shell"><SectionIntro eyebrow="Ninety-day operating roadmap" title="One roadmap. Clear ownership. Continuous decisions." /><div className="roadmap-grid">{[["01", "Foundation", "Baseline the clinic, select priority services, and define the demand architecture."], ["02", "Build + launch", "Release acquisition and conversion systems under supervised operating conditions."], ["03", "Improve", "Refine targeting, creative, conversations, handoffs, and revenue visibility."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
        <section className="interior-section ownership-section"><div className="shell"><SignalDivider label="Operating partnership" /><div className="ownership-split"><article><Compass size={23} /><span>Regena owns</span><h3>The growth operating system</h3><ul>{["Demand strategy and active acquisition", "Conversion infrastructure", "Landing paths and campaign iteration", "Reporting, attribution, and optimization"].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article><article><RefreshCcw size={23} /><span>The clinic owns</span><h3>Clinical capacity and patient experience</h3><ul>{["Service quality and clinical decisions", "Provider availability and capacity", "Accurate approvals and operational access", "Timely feedback from consultations and enrollment"].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article></div></div></section>
        <section className="interior-section reporting-section"><div className="shell reporting-grid"><div><span className="eyebrow">Control layer</span><h2>Operate from one view of what is working.</h2><p>Response, booking, attendance, source performance, and revenue visibility become one continuous improvement loop.</p></div><div className="reporting-cards"><article><BarChart3 /><span>Attribution</span><strong>Source to patient journey</strong></article><article><CircleDollarSign /><span>Spend clarity</span><strong>Direct media spend stays separate</strong></article><article><RefreshCcw /><span>Optimization</span><strong>Creative and systems improve together</strong></article></div></div></section>
        <section className="interior-section fit-section"><div className="shell fit-two-column"><div><span className="eyebrow">Best fit</span><h2>An established clinic with capacity and a real growth mandate.</h2><p>Regena&apos;s fit guidance considers demand, patient economics, capacity, system access, and leadership readiness together.</p></div><ul>{["Proven services with room to grow", "Capacity for additional qualified patients", "Leadership access and decision speed", "Willingness to measure the complete journey"].map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></div><PageCta title="Build the growth engine around the clinic you are becoming." /></section>
      </main><SiteFooter />
    </InteriorPageShell>
  );
}
