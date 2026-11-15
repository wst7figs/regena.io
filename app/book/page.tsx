import type { Metadata } from "next";
import { ArrowLeft, Check, Clock3 } from "lucide-react";
import Link from "next/link";

import { BookingWidget } from "@/components/booking-widget";

export const metadata: Metadata = { title: "Book a call", description: "Talk with Regena about putting more patients in your chair. Never billed for a no-show." };

export default function BookPage() {
  return (
    <div className="book-page">
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="book-header"><Link className="wordmark" href="/">REGENA</Link><Link href="/"><ArrowLeft size={15} /> Back to site</Link></header>
      <main className="book-layout" id="content" tabIndex={-1}>
        <section className="book-context"><span className="eyebrow eyebrow-dark">Talk with Luan</span><h1>Let&apos;s see if your area is open.</h1><p>We&apos;ll look at your offer, your area and your capacity, and you&apos;ll get exact numbers for your clinic.</p><ul><li><Check size={16} /> Is your area open?</li><li><Check size={16} /> Which offer we&apos;d run for you</li><li><Check size={16} /> What it costs, per completed appointment</li></ul><small><Clock3 size={14} /> No preparation needed</small></section>
        <section className="book-form-shell" aria-label="Book a strategy call"><BookingWidget /></section>
      </main>
    </div>
  );
}
