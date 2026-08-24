import type { Metadata } from "next";
import { Activity, CalendarCheck2, MessageSquareText, Route, UserCheck } from "lucide-react";

import { ProofStory } from "@/components/proof-story";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorHero, InteriorPageShell, PageCta, ResultNote, SectionIntro } from "@/components/site-primitives";

export const metadata: Metadata = { title: "Outcomes", description: "See how Regena measures patient response, qualification, booking, attendance, and revenue visibility." };

export default function OutcomesPage() {
  const measures = [[Activity, "Response", "How quickly and consistently patient intent receives a useful answer."], [Route, "Qualification", "Whether the clinic reaches the right patients with the right next step."], [CalendarCheck2, "Booking", "How qualified interest becomes confirmed consultation time."], [UserCheck, "Attendance", "How follow-up protects the next step in the patient journey."], [MessageSquareText, "Revenue visibility", "What clinic leadership can trace from source to commercial outcome."]] as const;
  return (
    <InteriorPageShell className="outcomes-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}>
      <InteriorHero eyebrow="Outcomes" title="Proof belongs inside the operating system—not outside the story." description="Regena measures what happens between patient intent and clinic revenue, then uses that visibility to improve the journey." cta={{ label: "Book a strategy call", href: "/book" }} variant="conversion"><div className="outcome-hero-number"><span>Observed operating result</span><strong>40%</strong><p>better pickup and appointment-booking rates</p><small>VisionMax Eye Centre · initial operating period</small></div></InteriorHero>
      <section className="interior-section proof-interior"><div className="shell"><SectionIntro eyebrow="VisionMax Eye Centre" title="When inbound demand outpaced the front desk, the system took over the handoffs." /><div data-client-story><ProofStory /></div><ResultNote>The 40% VisionMax statement is draft proof content pending final baseline and calculation confirmation. Observed client results are not guarantees.</ResultNote></div></section>
      <section className="interior-section interior-section-dark outcome-story-section"><div className="outcome-signal-orbit" aria-hidden="true" /><div className="shell"><SectionIntro eyebrow="Before → system → after" title="The outcome is a stronger operating journey." /><div className="outcome-timeline"><Reveal><article><span>01 · Before</span><h3>Demand exceeded follow-up capacity.</h3><p>Inbound calls and patient interest moved faster than the front desk could reliably respond and book.</p></article></Reveal><i /><Reveal><article><span>02 · System</span><h3>Voice, qualification, and booking connected.</h3><p>The response layer carried intent into the right consultation path without adding another manual queue.</p></article></Reveal><i /><Reveal><article><span>03 · Observed after</span><h3>More patients reached the booking step.</h3><p>Pickup and appointment-booking rates improved during the initial operating period.</p></article></Reveal></div></div></section>
      <section className="interior-section"><div className="shell"><SectionIntro eyebrow="What Regena measures" title="The complete journey—not a single vanity metric." /><div className="measure-grid">{measures.map(([Icon, title, copy], index) => <Reveal key={title} style={{ animationDelay: `${index * 80}ms` }}><article><Icon size={21} /><h3>{title}</h3><p>{copy}</p><i className="measure-trace" aria-hidden="true" /></article></Reveal>)}</div><PageCta title="Build the evidence layer into your patient journey." /></div></section>
    </main><SiteFooter /></InteriorPageShell>
  );
}
