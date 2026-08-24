"use client";

import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import { useRef, useState } from "react";

import {
  type BookingDraft,
  type BookingErrors,
  type BookingStep,
  emptyBookingDraft,
  recommendSolution,
  validateBookingStep,
} from "@/lib/booking-flow";

const previewDates = ["2026-08-25", "2026-08-26", "2026-08-27", "2026-08-28"];
const previewTimes = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM"];

const recommendationNames = {
  "patient-conversion-system": "Patient Conversion System",
  "growth-partnership": "Regena Growth Partnership",
  diagnostic: "Clinic-growth diagnostic",
};

export function BookingFlow() {
  const [step, setStep] = useState<BookingStep>(1);
  const [draft, setDraft] = useState<BookingDraft>(emptyBookingDraft);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [complete, setComplete] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const setField = <K extends keyof BookingDraft>(field: K, value: BookingDraft[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const continueFlow = () => {
    const nextErrors = validateBookingStep(step, draft);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus());
      return;
    }
    if (step === 4) setComplete(true);
    else setStep((current) => (current + 1) as BookingStep);
  };

  if (complete) {
    return (
      <div className="booking-complete" aria-live="polite">
        <div><Check size={30} /></div><span>Booking experience preview</span><h2>Your strategy-call path is ready.</h2>
        <p>Live scheduling will be connected before launch. This preview has not created an appointment or transmitted your information.</p>
        <dl><div><dt>Conversation</dt><dd>{recommendationNames[recommendSolution(draft)]}</dd></div><div><dt>Preview time</dt><dd>{draft.date} · {draft.time}</dd></div></dl>
        <button className="button button-secondary" type="button" onClick={() => { setComplete(false); setStep(1); setDraft(emptyBookingDraft); }}>Restart preview</button>
      </div>
    );
  }

  return (
    <div className="booking-flow" ref={formRef}>
      <div className="booking-progress" aria-label={`Step ${step} of 4`}>
        {[1, 2, 3, 4].map((item) => <i key={item} data-active={item <= step} />)}
      </div>
      <header><span aria-live="polite">Step {step} of 4</span><h2>{step === 1 ? "About you" : step === 2 ? "About the clinic" : step === 3 ? "Choose a date" : "Choose a time"}</h2></header>

      {step === 1 ? <div className="booking-fields">
        <Field label="Full name" name="name" value={draft.name} error={errors.name} onChange={(value) => setField("name", value)} />
        <Field label="Work email" name="email" type="email" value={draft.email} error={errors.email} onChange={(value) => setField("email", value)} />
        <Field label="Phone" name="phone" type="tel" value={draft.phone} error={errors.phone} onChange={(value) => setField("phone", value)} />
        <Field label="Clinic name" name="clinicName" value={draft.clinicName} error={errors.clinicName} onChange={(value) => setField("clinicName", value)} />
        <Field label="Role" name="role" value={draft.role} error={errors.role} onChange={(value) => setField("role", value)} />
      </div> : null}

      {step === 2 ? <div className="booking-fields">
        <SelectField label="Clinic type" name="clinicType" value={draft.clinicType} error={errors.clinicType} options={["Regenerative medicine", "Longevity", "Peptide or hormone", "Adjacent medical or aesthetic"]} onChange={(value) => setField("clinicType", value)} />
        <SelectField label="Number of locations" name="locations" value={draft.locations} error={errors.locations} options={["1", "2-3", "4+"]} onChange={(value) => setField("locations", value)} />
        <SelectField label="Approximate monthly patient inquiries" name="inquiryVolume" value={draft.inquiryVolume} error={errors.inquiryVolume} options={["Under 30", "30-49", "50-99", "100+"]} onChange={(value) => setField("inquiryVolume", value)} />
        <ChoiceField label="Currently running paid marketing?" name="paidMarketing" value={draft.paidMarketing} error={errors.paidMarketing} options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} onChange={(value) => setField("paidMarketing", value as BookingDraft["paidMarketing"])} />
        <ChoiceField label="Primary bottleneck" name="bottleneck" value={draft.bottleneck} error={errors.bottleneck} options={[{ label: "Conversion", value: "conversion" }, { label: "Demand and conversion", value: "demand-and-conversion" }, { label: "Not sure", value: "unknown" }]} onChange={(value) => setField("bottleneck", value as BookingDraft["bottleneck"])} />
        <Field label="Current CRM or clinic software (optional)" name="software" value={draft.software} onChange={(value) => setField("software", value)} />
      </div> : null}

      {step === 3 ? <div className="booking-calendar"><span>August 2026 · Preview availability</span><div>{previewDates.map((date) => <button name="date" type="button" aria-pressed={draft.date === date} key={date} onClick={() => setField("date", date)}><small>{new Date(`${date}T12:00:00`).toLocaleDateString("en-CA", { weekday: "short" })}</small><strong>{date.slice(-2)}</strong></button>)}</div>{errors.date ? <p className="field-error">{errors.date}</p> : null}</div> : null}
      {step === 4 ? <div className="booking-times"><span><Clock3 size={16} /> Preview times for {draft.date}</span><div>{previewTimes.map((time) => <button name="time" type="button" aria-pressed={draft.time === time} key={time} onClick={() => setField("time", time)}>{time}</button>)}</div>{errors.time ? <p className="field-error">{errors.time}</p> : null}<aside><span>Recommended conversation</span><strong>{recommendationNames[recommendSolution(draft)]}</strong></aside></div> : null}

      <div className="booking-controls">
        {step > 1 ? <button className="button button-secondary" type="button" onClick={() => { setStep((current) => (current - 1) as BookingStep); setErrors({}); }}><ArrowLeft size={16} /> Back</button> : <span />}
        <button className="button button-primary" type="button" onClick={continueFlow}>{step === 4 ? "Finish preview" : "Continue"}<ArrowRight size={16} /></button>
      </div>
    </div>
  );
}

function Field({ label, name, value, type = "text", error, onChange }: { label: string; name: string; value: string; type?: string; error?: string; onChange: (value: string) => void }) {
  return <label className="booking-field"><span>{label}</span><input aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} name={name} type={type} value={value} onChange={(event) => onChange(event.target.value)} />{error ? <small className="field-error" id={`${name}-error`}>{error}</small> : null}</label>;
}

function SelectField({ label, name, value, error, options, onChange }: { label: string; name: string; value: string; error?: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="booking-field"><span>{label}</span><select aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} name={name} value={value} onChange={(event) => onChange(event.target.value)}><option value="">Select one</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>{error ? <small className="field-error" id={`${name}-error`}>{error}</small> : null}</label>;
}

function ChoiceField({ label, name, value, error, options, onChange }: { label: string; name: string; value: string; error?: string; options: { label: string; value: string }[]; onChange: (value: string) => void }) {
  return <fieldset className="booking-choice" aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined}><legend>{label}</legend><div>{options.map((option) => <label key={option.value}><input name={name} type="radio" value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} /><span>{option.label}</span></label>)}</div>{error ? <small className="field-error" id={`${name}-error`}>{error}</small> : null}</fieldset>;
}
