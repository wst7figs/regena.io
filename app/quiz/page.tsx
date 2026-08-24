import type { Metadata } from "next";
import { Check } from "lucide-react";

import { DiagnosticQuiz } from "@/components/diagnostic-quiz";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorPageShell } from "@/components/site-primitives";

export const metadata: Metadata = { title: "Clinic Growth Diagnostic", description: "Identify the clearest constraint in your clinic's patient-growth journey and calculate transparent improvement scenarios." };

export default function QuizPage() {
  return <InteriorPageShell className="quiz-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}><section className="quiz-hero"><div className="shell quiz-hero-grid"><div><span className="eyebrow eyebrow-dark">Clinic growth diagnostic</span><h1>Find the constraint before adding more complexity.</h1><p>Answer eight plain-language questions. You will get a recommended starting point and a transparent view of the commercial opportunity represented by better conversion.</p><ul><li><Check size={15} />About four minutes</li><li><Check size={15} />No technical funnel data required</li><li><Check size={15} />Results stay on this page</li></ul></div><DiagnosticQuiz /></div></section></main><SiteFooter /></InteriorPageShell>;
}
