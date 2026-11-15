import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

import { ApplyFunnel } from "@/components/apply-funnel";

export const metadata: Metadata = {
  title: "Check if your area is open",
  description: "Regena works with one med spa or aesthetic clinic per area. Answer a few quick questions to see if yours is open.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <div className="apply-page">
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="shell apply-header"><Link className="wordmark" href="/">REGENA</Link><Link href="/"><ArrowLeft size={15} aria-hidden="true" /> Back to site</Link></header>
      <main className="shell apply-layout" id="content" tabIndex={-1}>
        <section className="apply-context">
          <span className="eyebrow">One clinic per area</span>
          <h1>Check if your area is open.</h1>
          <p>We only work with one clinic per area, so we never compete against ourselves. Tell us about your clinic and you&apos;ll know in about 2 minutes.</p>
          <ul>
            <li><Check size={17} aria-hidden="true" /> Never billed for a no-show</li>
            <li><Check size={17} aria-hidden="true" /> Month to month, no setup fee</li>
            <li><Check size={17} aria-hidden="true" /> Live in about two weeks</li>
          </ul>
        </section>
        <section aria-label="Application"><ApplyFunnel /></section>
      </main>
    </div>
  );
}
