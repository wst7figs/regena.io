import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

import { ApplyFunnel } from "@/components/apply-funnel";

export const metadata: Metadata = {
  title: "Check if your city is open",
  description: "Regena works with one med spa or aesthetic clinic per city. 100 new patients in 90 days, $60 a patient prepaid, plus ad spend. See if yours is open.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <div className="apply-page">
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="shell apply-header"><Link className="wordmark" href="/">REGENA</Link><Link href="/"><ArrowLeft size={15} aria-hidden="true" /> Back to site</Link></header>
      <main className="shell apply-layout" id="content" tabIndex={-1}>
        <section className="apply-context">
          <span className="eyebrow">One clinic per city</span>
          <h1>Check if your city is open.</h1>
          <p>We only work with one clinic per city, so we never compete against ourselves. Tell us about your clinic and you&apos;ll know in about 2 minutes.</p>
          <ul>
            <li><Check size={17} aria-hidden="true" /> 100 new patients in 90 days</li>
            <li><Check size={17} aria-hidden="true" /> $60 a patient prepaid ($6,000), or $2,500 a month, plus ad spend</li>
            <li><Check size={17} aria-hidden="true" /> Every patient we miss, refunded</li>
            <li><Check size={17} aria-hidden="true" /> No setup fee. Live in 10 business days</li>
          </ul>
        </section>
        <section aria-label="Application"><ApplyFunnel /></section>
      </main>
    </div>
  );
}
