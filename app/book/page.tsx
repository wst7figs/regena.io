import type { Metadata } from "next";
import { ArrowLeft, Check, Clock3 } from "lucide-react";
import Link from "next/link";

import { BookingWidget } from "@/components/booking-widget";

export const metadata: Metadata = { title: "Book a call", description: "Talk with Regena about putting more patients in your chair. 100 new patients in 90 days, $60 a patient prepaid, plus ad spend." };

export default function BookPage() {
  return (
    <div className="book-page">
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="book-header"><Link className="wordmark" href="/">REGENA</Link><Link href="/"><ArrowLeft size={15} /> Back to site</Link></header>
      <main className="book-layout" id="content" tabIndex={-1}>
        <section className="book-context"><span className="eyebrow eyebrow-dark">Talk with Luan</span><h1>Let&apos;s see if your city is open.</h1><p>We&apos;ll look at your offer, your city and your capacity, and do the math on your first 100 patients.</p><ul><li><Check size={16} /> Is your city open?</li><li><Check size={16} /> Which offer we&apos;d run for you</li><li><Check size={16} /> What 100 patients are worth to your clinic</li></ul><small><Clock3 size={14} /> No preparation needed</small></section>
        <section className="book-form-shell" aria-label="Book a strategy call"><BookingWidget /></section>
      </main>
    </div>
  );
}
