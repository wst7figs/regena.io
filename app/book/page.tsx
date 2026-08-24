import type { Metadata } from "next";
import { ArrowLeft, Check, Clock3 } from "lucide-react";
import Link from "next/link";

import { BookingFlow } from "@/components/booking-flow";

export const metadata: Metadata = { title: "Book a Strategy Call", description: "Map the constraint in your clinic's patient journey and identify the right Regena starting point." };

export default function BookPage() {
  return (
    <div className="book-page">
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="book-header"><Link className="wordmark" href="/">REGENA</Link><Link href="/"><ArrowLeft size={15} /> Back to site</Link></header>
      <main className="book-layout" id="content" tabIndex={-1}>
        <section className="book-context"><span className="eyebrow eyebrow-dark">A focused first conversation</span><h1>Find where your patient journey is losing momentum.</h1><p>We&apos;ll map what happens between first inquiry and attended consultation, then identify the operating layer worth rebuilding first.</p><ul><li><Check size={16} /> Clarify the current growth constraint</li><li><Check size={16} /> See which Regena solution fits</li><li><Check size={16} /> Leave with a focused next step</li></ul><div className="book-proof"><strong>40%</strong><span>better pickup and appointment-booking rates observed with VisionMax during the initial operating period</span></div><small><Clock3 size={14} /> Focused clinic-growth diagnostic · No preparation required</small></section>
        <section className="book-form-shell" aria-label="Strategy call qualification preview"><BookingFlow /></section>
      </main>
    </div>
  );
}
