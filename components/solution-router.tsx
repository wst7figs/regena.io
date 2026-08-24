"use client";

import { ArrowUpRight, CircleCheck, RadioTower } from "lucide-react";
import { useState } from "react";

import { solutions } from "@/lib/site-content";

export function SolutionRouter() {
  const [route, setRoute] = useState<"conversion" | "growth">("conversion");
  const selected = route === "conversion" ? solutions[0] : solutions[1];

  return (
    <div className="solution-router">
      <div className="router-origin"><RadioTower size={18} /><span>Patient demand</span><i /></div>
      <div className="router-branches" aria-hidden="true"><i /><i /></div>
      <div className="router-options">
        <button type="button" aria-pressed={route === "conversion"} onClick={() => setRoute("conversion")}>
          <span>01</span><strong>Already generating demand</strong><small>Calls, forms, referrals, or campaigns already create inquiries.</small>
        </button>
        <button type="button" aria-pressed={route === "growth"} onClick={() => setRoute("growth")}>
          <span>02</span><strong>Need more demand and conversion</strong><small>The clinic needs a complete acquisition and conversion engine.</small>
        </button>
      </div>
      <div className="router-recommendation" data-testid="solution-recommendation" aria-live="polite">
        <CircleCheck size={19} />
        <div><span>Recommended starting point</span><strong>{selected.name}</strong><p>{selected.shortDescription}</p></div>
        <a href={selected.href}>Explore solution <ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}
