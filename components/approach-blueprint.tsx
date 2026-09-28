"use client";

import { Check, Compass, Layers3 } from "lucide-react";
import { useScrollStages } from "@/components/scroll-story";

import { approachSteps } from "@/lib/site-content";

export function ApproachBlueprint() {
  const { active, setActive, register } = useScrollStages(approachSteps.length);
  const step = approachSteps[active];

  return (
    <div className="approach-blueprint scroll-story" data-testid="approach-scroll-story">
      <div className="approach-blueprint-sticky">
      <div className="blueprint-rail" aria-label="Regena operating stages">
        {approachSteps.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
            <span>0{index + 1}</span><strong>{item.label}</strong><small>{item.summary}</small>
          </button>
        ))}
      </div>
      <div className="blueprint-view" aria-live="polite">
        <div className="blueprint-grid" aria-hidden="true" />
        <span><Compass size={17} /> Active operating layer</span>
        <h3>{step.label}</h3><p>{step.detail}</p>
        <div className="blueprint-assembly"><Layers3 size={22} /><i style={{ transform: `scaleX(${(active + 1) / approachSteps.length})` }} /></div>
        <strong><Check size={15} /> {step.summary}</strong>
      </div>
      </div>
      <div className="scroll-story-markers" aria-hidden="true">{approachSteps.map((item, index) => <div key={item.id} ref={register(index)} data-stage-index={index}><span>0{index + 1}</span><strong>{item.label}</strong></div>)}</div>
    </div>
  );
}
