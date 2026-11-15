"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { BookingWidget } from "@/components/booking-widget";
import { trackMeta } from "@/components/meta-pixel";
import { type ApplyContact, type Verdict } from "@/lib/apply";
import { applyQuestions, type ApplyAnswers } from "@/lib/v2-content";

type Step = "contact" | "questions" | "result";
type Draft = { contact: Partial<ApplyContact> & { consent?: boolean }; answers: Partial<ApplyAnswers> };

const storageKey = "regena-apply-v1";
const questionKeys = Object.keys(applyQuestions) as (keyof ApplyAnswers)[];

function loadDraft(): Draft {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) return JSON.parse(raw) as Draft;
  } catch {
    // Storage can be blocked; the form still works without it.
  }
  return { contact: { country: "CA" }, answers: {} };
}

function saveDraft(draft: Draft) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
  } catch {
    // ignore
  }
}

async function submit(body: Record<string, unknown>) {
  const response = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return (await response.json()) as { ok: boolean; errors?: string[]; verdict?: Verdict };
}

export function ApplyFunnel() {
  const [step, setStep] = useState<Step>("contact");
  const [draft, setDraft] = useState<Draft>({ contact: { country: "CA" }, answers: {} });
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  // Spam trap: a field hidden from people. Whatever a bot types here is sent along and the server drops the request.
  const [hp, setHp] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    // Restore saved progress after hydration so server and client markup match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(loadDraft());
  }, []);

  useEffect(() => {
    // On a new step, bring the top of the card back into view (matters on phones).
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const card = cardRef.current;
    if (card && card.getBoundingClientRect().top < 0) card.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const update = (part: "contact" | "answers", key: string, value: unknown) => {
    setDraft((current) => {
      const next = { ...current, [part]: { ...current[part], [key]: value } } as Draft;
      saveDraft(next);
      return next;
    });
  };

  const onContact = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setErrors([]);
    const result = await submit({ step: "contact", contact: draft.contact, hp }).catch(() => ({ ok: false, errors: ["Something went wrong. Please try again."] }));
    setBusy(false);
    if (!result.ok) return setErrors(result.errors ?? []);
    trackMeta("Lead");
    setStep("questions");
  };

  const onAnswers = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setErrors([]);
    const result = await submit({ step: "answers", contact: draft.contact, answers: draft.answers, hp }).catch(() => ({ ok: false, errors: ["Something went wrong. Please try again."], verdict: undefined }));
    setBusy(false);
    if (!result.ok || !result.verdict) return setErrors(result.errors ?? []);
    setVerdict(result.verdict);
    trackMeta(result.verdict.fit ? "CompleteRegistration" : "ApplicationNotFit", undefined, !result.verdict.fit);
    setStep("result");
  };

  const contact = draft.contact;
  const isUS = contact.country === "US";

  return (
    <div className="apply-card" ref={cardRef}>
      <div className="apply-progress" aria-hidden="true">
        <span data-active="true" />
        <span data-active={step !== "contact"} />
        <span data-active={step === "result"} />
      </div>

      {step === "contact" ? (
        <form onSubmit={onContact} noValidate>
          <span className="apply-step-label">Step 1 of 2</span>
          <h2>Where should we reach you?</h2>
          <div className="apply-fields">
            <div className="apply-field"><label htmlFor="name">Full name</label><input id="name" autoComplete="name" value={contact.name ?? ""} onChange={(e) => update("contact", "name", e.target.value)} required /></div>
            <div className="apply-field"><label htmlFor="clinic">Clinic name</label><input id="clinic" autoComplete="organization" value={contact.clinic ?? ""} onChange={(e) => update("contact", "clinic", e.target.value)} required /></div>
            <div className="apply-field"><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" value={contact.email ?? ""} onChange={(e) => update("contact", "email", e.target.value)} required /></div>
            <div className="apply-field"><label htmlFor="phone">Mobile</label><input id="phone" type="tel" autoComplete="tel" value={contact.phone ?? ""} onChange={(e) => update("contact", "phone", e.target.value)} required /></div>
            <div className="apply-field"><label htmlFor="country">Country</label><select id="country" value={contact.country ?? "CA"} onChange={(e) => update("contact", "country", e.target.value)}><option value="CA">Canada</option><option value="US">United States</option></select></div>
            <div className="apply-field"><label htmlFor="region">{isUS ? "State" : "Province"}</label><input id="region" autoComplete="address-level1" value={contact.region ?? ""} onChange={(e) => update("contact", "region", e.target.value)} required /></div>
            <div className="apply-field"><label htmlFor="city">City</label><input id="city" autoComplete="address-level2" value={contact.city ?? ""} onChange={(e) => update("contact", "city", e.target.value)} required /></div>
            <div className="apply-field"><label htmlFor="website">Website or Instagram <small>(optional)</small></label><input id="website" value={contact.website ?? ""} onChange={(e) => update("contact", "website", e.target.value)} /></div>
          </div>
          <div className="apply-hp" aria-hidden="true"><label htmlFor="company_url">Leave this empty</label><input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></div>
          <label className="apply-consent">
            <input type="checkbox" checked={contact.consent === true} onChange={(e) => update("contact", "consent", e.target.checked)} />
            <span>I agree that Regena can contact me by phone, text and email about this application. Message and data rates may apply. Reply STOP to opt out of texts. See our <a href="/privacy">privacy notice</a>.</span>
          </label>
          {errors.length ? <div className="apply-errors" role="alert"><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div> : null}
          <div className="apply-actions">
            <span />
            <button className="button button-dark" type="submit" disabled={busy}>{busy ? "Saving…" : "Continue"} <ArrowRight aria-hidden="true" size={16} /></button>
          </div>
        </form>
      ) : null}

      {step === "questions" ? (
        <form onSubmit={onAnswers} noValidate>
          <span className="apply-step-label">Step 2 of 2</span>
          <h2>Four quick questions about the clinic.</h2>
          {questionKeys.map((key) => (
            <fieldset className="apply-question" key={key}>
              <legend>{applyQuestions[key].label}</legend>
              <div className="apply-choices">
                {applyQuestions[key].choices.map((choice) => (
                  <label className="apply-choice" key={choice.value}>
                    <input type="radio" name={key} value={choice.value} checked={draft.answers[key] === choice.value} onChange={() => update("answers", key, choice.value)} />
                    {choice.label}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          {errors.length ? <div className="apply-errors" role="alert"><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div> : null}
          <div className="apply-actions">
            <button className="apply-back" type="button" onClick={() => setStep("contact")}><ArrowLeft aria-hidden="true" size={14} /> Back</button>
            <button className="button button-dark" type="submit" disabled={busy}>{busy ? "Checking…" : "See if we're a fit"} <ArrowRight aria-hidden="true" size={16} /></button>
          </div>
        </form>
      ) : null}

      {step === "result" && verdict ? (
        <div className="apply-result" aria-live="polite">
          {verdict.fit ? (
            <>
              <span className="apply-step-label">You look like a fit</span>
              <h2>Pick a time with Luan.</h2>
              <p>On the call we&apos;ll look at your offer, your area and your capacity, and you&apos;ll get exact numbers for your clinic.</p>
              <BookingWidget prefill={{ name: contact.name, email: contact.email, phone: contact.phone, website: contact.website }} />
            </>
          ) : (
            <>
              <span className="apply-step-label">Thanks, {contact.name?.split(" ")[0] ?? "there"}</span>
              <h2>We&apos;re probably not the right fit yet.</h2>
              <p>{verdict.reason}</p>
              <p>We&apos;ve saved your details. If things change, write to us at <a href="mailto:contact@regena.io">contact@regena.io</a>.</p>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
