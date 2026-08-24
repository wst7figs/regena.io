"use client";

import { ArrowUpRight, Route } from "lucide-react";
import { useState } from "react";

const routes = {
  demand: { name: "Patient Conversion System", href: "/solutions/patient-conversion-system", copy: "Start by converting more of the demand the clinic already has." },
  growth: { name: "Regena Growth Partnership", href: "/solutions/growth-partnership", copy: "Connect demand generation to the full patient conversion system." },
  unsure: { name: "Clinic-growth diagnostic", href: "/book", copy: "Map the bottleneck before selecting an engagement." },
} as const;

export function ClinicDiagnostic() {
  const [selected, setSelected] = useState<keyof typeof routes>("demand");
  const route = routes[selected];

  return (
    <div className="clinic-diagnostic">
      <span className="diagnostic-label">Fit guidance · not a universal benchmark</span>
      <div className="diagnostic-options">
        <button type="button" aria-pressed={selected === "demand"} onClick={() => setSelected("demand")}><strong>We have existing demand</strong><small>Inquiries arrive, but too many fail to book or attend.</small></button>
        <button type="button" aria-pressed={selected === "growth"} onClick={() => setSelected("growth")}><strong>We need demand and conversion</strong><small>Capacity exists, but the growth engine is fragmented.</small></button>
        <button type="button" aria-pressed={selected === "unsure"} onClick={() => setSelected("unsure")}><strong>We are not sure where it breaks</strong><small>The journey needs a focused diagnostic first.</small></button>
      </div>
      <div className="diagnostic-route" data-testid="clinic-route" aria-live="polite">
        <Route size={21} /><div><span>Recommended next step</span><strong>{route.name}</strong><p>{route.copy}</p></div><a href={route.href}>View next step <ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}
