"use client";

import { BarChart3, CalendarCheck, Gauge, Megaphone, Workflow } from "lucide-react";

import { useScrollStages } from "@/components/scroll-story";

const stages = [
  { label: "Demand", title: "Paid and organic demand enter with intent attached.", detail: "Campaigns, local search, and referrals are treated as inputs—not isolated reports.", icon: Megaphone },
  { label: "Conversion", title: "The Patient Conversion System is included.", detail: "Response, qualification, booking, and follow-up operate before more demand is added.", icon: Workflow },
  { label: "Consultations", title: "Demand becomes booked and attended consultations.", detail: "The system protects the handoffs where high-intent patients disappear.", icon: CalendarCheck },
  { label: "Capacity", title: "Clinic capacity governs responsible growth.", detail: "Provider availability and patient experience remain visible before volume is increased.", icon: Gauge },
  { label: "Visibility", title: "Leadership sees the complete growth loop.", detail: "Source, conversion state, attendance, and revenue signals inform the next decision.", icon: BarChart3 },
] as const;

export function GrowthSignal() {
  const { active, setActive, register } = useScrollStages(stages.length);
  const stage = stages[active];
  const Icon = stage.icon;
  return <div className="scroll-story growth-scroll-story" aria-label="Growth partnership operating model">
    <div className="scroll-story-sticky">
      <div className="growth-stage-tabs">{stages.map((item, index) => <button key={item.label} type="button" aria-label={`Growth stage ${index + 1}: ${item.label}`} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label}</button>)}</div>
      <div className="growth-engine-view"><div className="growth-engine-line" aria-hidden="true"><i style={{ width: `${((active + 1) / stages.length) * 100}%` }} /></div><div className="growth-engine-node"><Icon size={28} /></div><div><span>Active operating layer · {stage.label}</span><h3>{stage.title}</h3><p>{stage.detail}</p></div><div className="growth-engine-chain" aria-label="Growth engine sequence"><span>Acquisition channels · Paid + organic</span><i>→</i><strong>Patient Conversion System</strong><i>→</i><span>Attended consultations</span><i>→</i><span>Clinic capacity</span><i>→</i><span>Revenue visibility</span></div></div>
    </div>
    <div className="scroll-story-markers" aria-hidden="true">{stages.map((item, index) => <div key={item.label} ref={register(index)} data-stage-index={index}><span>0{index + 1}</span><strong>{item.label}</strong></div>)}</div>
  </div>;
}
