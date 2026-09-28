"use client";

import { ArrowRight, FileText } from "lucide-react";
import { FormEvent, useState } from "react";

export function CareersApplication() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "unavailable">("idle");
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const file = new FormData(form).get("resume");
    if (file instanceof File && file.size > 10 * 1024 * 1024) { form.querySelector<HTMLInputElement>("[name=resume]")?.setCustomValidity("Résumé must be 10 MB or smaller."); form.reportValidity(); return; }
    setStatus("sending");
    setMessage("");
    void fetch("/api/careers", { method: "POST", body: new FormData(form) }).then(async (response) => {
      const payload = await response.json().catch(() => null) as { errors?: string[] } | null;
      if (response.ok) { setStatus("sent"); form.reset(); return; }
      setStatus("unavailable");
      setMessage(payload?.errors?.[0] ?? "The application could not be sent. Check the form and try again.");
    }).catch(() => { setStatus("unavailable"); setMessage("The application could not be sent. Your form remains here—try again shortly."); });
  };
  return <form className="career-form" onSubmit={submit}><div className="career-form-grid">
    <label className="career-trap" aria-hidden="true">Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
    <label>Full name<input name="name" required autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Phone <span>Optional</span><input name="phone" type="tel" autoComplete="tel" /></label><label>Location and time zone<input name="location" required /></label>
    <label>Role<select name="role" required><option>Growth Advisor / Closer</option><option>AI Systems Developer</option><option>General application</option></select></label><label>LinkedIn<input name="linkedin" type="url" placeholder="https://linkedin.com/in/..." /></label><label>X profile <span>Optional</span><input name="x" type="url" placeholder="https://x.com/..." /></label><label>Instagram <span>Optional</span><input name="instagram" type="url" placeholder="https://instagram.com/..." /></label><label>Personal website <span>Optional</span><input name="website" type="url" /></label><label>Portfolio <span>Optional</span><input name="portfolio" type="url" /></label>
    <label className="career-wide">Relevant experience<textarea name="experience" required rows={5} placeholder="Show us what you have built, sold, operated, or improved." /></label><label className="career-wide">Why Regena—and what evidence shows you execute?<textarea name="fit" required rows={5} /></label>
    <label className="career-upload career-wide"><FileText size={22} /><span><strong>Résumé</strong><small>PDF, DOC, or DOCX · maximum 10 MB</small></span><input aria-label="Résumé" name="resume" type="file" required accept=".pdf,.doc,.docx" onChange={(event) => event.currentTarget.setCustomValidity("")} /></label>
    <label className="career-consent career-wide"><input name="consent" type="checkbox" required /> I consent to Regena processing this application and contacting me about this or reasonably related future opportunities.</label>
  </div><button className="button button-light" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending application…" : "Send application"}<ArrowRight size={16} /></button><p className="career-status" role="status">{status === "sent" ? "Application received. The Regena team will review it directly." : status === "unavailable" ? message : ""}</p></form>;
}
