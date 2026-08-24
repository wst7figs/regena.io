"use client";

import { ArrowLeft, ArrowRight, Check, Gauge, Sparkles } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { calculateDiagnostic, type Capacity, type Constraint, type Visibility } from "@/lib/diagnostic";

const recommendationCopy = {
  conversion: { name: "Patient Conversion System", copy: "Start by protecting and converting the patient demand your clinic already has.", href: "/solutions/patient-conversion-system" },
  growth: { name: "Regena Growth Partnership", copy: "Build demand and conversion as one accountable operating system.", href: "/solutions/growth-partnership" },
  diagnostic: { name: "Clinic-growth diagnostic", copy: "Map the constraint with us before selecting an engagement.", href: "/book" },
} as const;

const money = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

export function DiagnosticQuiz() {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [delivery, setDelivery] = useState<"idle" | "sending" | "sent" | "unavailable">("idle");
  const [answers, setAnswers] = useState({ annualRevenue: 2_000_000, patientValue: 5_000, monthlyInquiries: 100, consultationsPerTen: 4, marketingActive: true, constraint: "response" as Constraint, capacity: "yes" as Capacity, visibility: "partial" as Visibility });
  const result = useMemo(() => calculateDiagnostic(answers), [answers]);
  const recommendation = recommendationCopy[result.recommendation];

  const update = <K extends keyof typeof answers>(key: K, value: (typeof answers)[K]) => setAnswers((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setRevealed(true);
    setDelivery("sending");
    void fetch("/api/diagnostic", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ contact: Object.fromEntries(form), answers, result }) })
      .then(async (response) => {
        const payload = await response.json().catch(() => null) as { delivery?: string } | null;
        setDelivery(response.ok && payload?.delivery === "sent" ? "sent" : "unavailable");
      })
      .catch(() => setDelivery("unavailable"));
  };

  if (revealed) return <section className="diagnostic-result" aria-live="polite">
    <div className="diagnostic-result-head"><span><Sparkles size={15} /> Recommended starting point</span><h2>{recommendation.name}</h2><p>{recommendation.copy}</p><a className="button button-dark" href={recommendation.href}>Explore the recommendation <ArrowRight size={16} /></a></div>
    <div className="diagnostic-result-basis"><span>Your input basis</span><dl><div><dt>Monthly inquiries</dt><dd>{answers.monthlyInquiries}</dd></div><div><dt>Approx. consultation rate</dt><dd>{answers.consultationsPerTen} out of 10</dd></div><div><dt>Average patient value</dt><dd>{money.format(answers.patientValue)}</dd></div><div><dt>Implied monthly consultation value</dt><dd>{money.format(result.currentMonthlyConsultationValue)}</dd></div></dl></div>
    <div className="diagnostic-scenarios">{result.scenarios.map((scenario) => <article key={scenario.improvement}><span>{scenario.improvement}% relative improvement</span><strong>{money.format(scenario.additionalMonthlyValue)}</strong><p>additional monthly gross consultation value represented by approximately {scenario.additionalConsultations} more consultations.</p></article>)}</div>
    {result.capacityNote ? <p className="diagnostic-capacity"><Gauge size={17} /> {result.capacityNote}</p> : null}
    <div className="diagnostic-disclosure"><strong>Illustrative estimate, not a guarantee.</strong><p>Based only on the numbers you provided. This is gross consultation value before delivery costs, refunds, downstream enrollment, or capacity constraints. The scenarios do not promise that Regena will create these improvements.</p></div>
    <p className="diagnostic-delivery">{delivery === "sending" ? "Preparing your email report…" : delivery === "sent" ? "Your report was sent." : delivery === "unavailable" ? "Your result is saved on this page. Email delivery is not connected yet—book a call to keep it." : ""}</p>
  </section>;

  return <form className="diagnostic-quiz" onSubmit={submit}>
    <div className="diagnostic-progress" aria-label={`Step ${step + 1} of 4`}>{[0,1,2,3].map((item) => <i key={item} data-active={item <= step} />)}</div>
    {step === 0 ? <fieldset><legend>Start with the clinic you run today.</legend><p>Ranges are enough. You do not need formal funnel reporting.</p><label>Annual clinic revenue<select value={answers.annualRevenue} onChange={(event) => update("annualRevenue", Number(event.target.value))}><option value={750000}>Under $1M</option><option value={1500000}>$1M–$2M</option><option value={3000000}>$2M–$4M</option><option value={6000000}>$4M+</option></select></label><label>Average patient or treatment-plan value<select value={answers.patientValue} onChange={(event) => update("patientValue", Number(event.target.value))}><option value={1000}>Under $2,000</option><option value={3500}>$2,000–$5,000</option><option value={7500}>$5,000–$10,000</option><option value={15000}>$10,000+</option></select></label><label>Approximate monthly new-patient inquiries<select value={answers.monthlyInquiries} onChange={(event) => update("monthlyInquiries", Number(event.target.value))}><option value={25}>Under 50</option><option value={75}>50–100</option><option value={150}>100–200</option><option value={300}>200+</option></select></label></fieldset> : null}
    {step === 1 ? <fieldset><legend>Where does momentum disappear?</legend><label>Out of 10 inquiries, roughly how many become consultations?<input type="range" min="1" max="9" value={answers.consultationsPerTen} onChange={(event) => update("consultationsPerTen", Number(event.target.value))} /><output>{answers.consultationsPerTen} out of 10</output></label><label>Are you actively marketing today?<select value={answers.marketingActive ? "yes" : "no"} onChange={(event) => update("marketingActive", event.target.value === "yes")}><option value="yes">Yes</option><option value="no">No</option></select></label><label>What feels like the clearest constraint?<select value={answers.constraint} onChange={(event) => update("constraint", event.target.value as Constraint)}><option value="demand">Not enough demand</option><option value="response">Slow or missed response</option><option value="booking">Qualification or booking</option><option value="attendance">Attendance and follow-up</option><option value="visibility">We cannot see what is working</option><option value="unsure">Not sure</option></select></label></fieldset> : null}
    {step === 2 ? <fieldset><legend>Can the clinic absorb responsible growth?</legend><label>Do providers and staff have capacity for more qualified patients?<select value={answers.capacity} onChange={(event) => update("capacity", event.target.value as Capacity)}><option value="yes">Yes</option><option value="limited">Some, but limited</option><option value="no">Not currently</option></select></label><label>Can leadership see the basic patient journey and commercial outcomes?<select value={answers.visibility} onChange={(event) => update("visibility", event.target.value as Visibility)}><option value="yes">Yes, clearly</option><option value="partial">Only in pieces</option><option value="no">No</option></select></label></fieldset> : null}
    {step === 3 ? <fieldset><legend>Where should we send the full result?</legend><p>Your recommendation will also stay visible on this page.</p><div className="diagnostic-contact-grid"><label>Full name<input name="name" required autoComplete="name" /></label><label>Work email<input name="email" type="email" required autoComplete="email" /></label><label>Clinic name<input name="clinic" required autoComplete="organization" /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label></div><label className="diagnostic-consent"><input name="consent" type="checkbox" required /> Send my report and allow Regena to follow up about this result.</label></fieldset> : null}
    <div className="diagnostic-controls">{step > 0 ? <button type="button" className="button button-ghost" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={16} /> Back</button> : <span />}{step < 3 ? <button type="button" className="button button-light" onClick={() => setStep((current) => current + 1)}>{step === 0 ? "Continue to journey" : step === 1 ? "Continue to fit" : "See my result"} <ArrowRight size={16} /></button> : <button type="submit" className="button button-light">Reveal my clinic result <Check size={16} /></button>}</div>
  </form>;
}
