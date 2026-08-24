"use client";

import { BarChart3, CalendarCheck, Check, MessageSquareText, PhoneCall, UserCheck } from "lucide-react";

import { useScrollStages } from "@/components/scroll-story";

const stages = [
  { id: "capture", label: "Inquiry", title: "Every inquiry enters one operating view.", patient: "A patient calls, chats, or submits a form.", action: "Capture source, service intent, and contact context.", state: "New inquiry visible", icon: PhoneCall },
  { id: "respond", label: "Response", title: "Intent receives an immediate useful response.", patient: "The patient needs an answer while intent is active.", action: "Voice, chat, and people work from the same context.", state: "Live conversation started", icon: MessageSquareText },
  { id: "qualify", label: "Qualification", title: "The right patient reaches the right next step.", patient: "The patient explains what they need.", action: "Match service, location, readiness, and clinic rules.", state: "Qualified patient", icon: UserCheck },
  { id: "book", label: "Booking", title: "Interest becomes confirmed consultation time.", patient: "The patient chooses a time that works.", action: "Expose availability, confirm, and record the booking.", state: "Confirmed consultation", icon: CalendarCheck },
  { id: "attend", label: "Attendance", title: "Follow-up protects the appointment.", patient: "Life happens between booking and the visit.", action: "Run reminders, rescheduling, and exception paths.", state: "Consultation protected", icon: Check },
  { id: "visibility", label: "Visibility", title: "Commercial value becomes visible to the clinic.", patient: "The consultation reaches a measurable next step.", action: "Connect source, stage, attendance, and operating value.", state: "Journey measurable", icon: BarChart3 },
] as const;

export function ConversionPipeline() {
  const { active, setActive, register } = useScrollStages(stages.length);
  const stage = stages[active];
  const Icon = stage.icon;
  return <div className="scroll-story conversion-scroll-story">
    <div className="scroll-story-sticky">
      <div className="pipeline-tabs" aria-label="Patient conversion stages">{stages.map((item, index) => <button key={item.id} type="button" aria-label={`Stage ${index + 1}: ${item.label}`} aria-pressed={index === active} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label}</button>)}</div>
      <div className="pipeline-operating-view" role="region" aria-label="Active conversion stage">
        <div className="pipeline-signal" aria-hidden="true"><i style={{ width: `${((active + 1) / stages.length) * 100}%` }} /></div>
        <div className="pipeline-icon"><Icon size={24} /></div>
        <div><span>Patient event</span><p>{stage.patient}</p><span>Regena action</span><h3>{stage.title}</h3><p>{stage.action}</p></div>
        <strong><Check size={15} /> {stage.state}</strong>
      </div>
    </div>
    <div className="scroll-story-markers" aria-hidden="true">{stages.map((item, index) => <div key={item.id} ref={register(index)} data-stage-index={index}><span>0{index + 1}</span><strong>{item.label}</strong></div>)}</div>
    <p className="diagram-equivalent">Voice, chat, qualification, scheduling, attendance, and visibility operate as one connected conversion system.</p>
  </div>;
}
