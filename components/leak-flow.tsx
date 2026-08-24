"use client";

import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarCheck2, CircleDollarSign, MousePointerClick, PhoneCall } from "lucide-react";
import { useEffect, useRef } from "react";

import { PatientSignal } from "@/components/patient-signal";
import { frictionPoints } from "@/lib/home-content";

const leakPath = "M 42 172 C 132 172 148 172 220 172 S 306 172 378 172 S 464 172 536 172 S 620 172 706 172";
const stages = [
  { label: "Demand", detail: "Inquiry captured", icon: MousePointerClick },
  { label: "Response", detail: "Conversation started", icon: PhoneCall },
  { label: "Booking", detail: "Consultation scheduled", icon: CalendarCheck2 },
  { label: "Revenue", detail: "Outcome visible", icon: CircleDollarSign },
] as const;

export function LeakFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const progress = useMotionValue(reducedMotion ? 1 : 0);
  const outcomeProgress = useMotionValue(0);

  useEffect(() => {
    if (!inView && !reducedMotion) return;
    const controls = animate(progress, 1, {
      duration: reducedMotion ? 0 : 1.35,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, progress, reducedMotion]);

  return (
    <div className="leak-flow" data-testid="leak-flow" ref={ref}>
      <p className="leak-flow-summary">
        Demand passes through response, booking, and revenue—with value at risk at every disconnected handoff.
      </p>
      <div className="leak-flow-canvas">
        <PatientSignal
          id="leak-signal"
          path={leakPath}
          progress={progress}
          outcomeProgress={outcomeProgress}
          viewBox="0 0 748 344"
        />
        <div className="leak-stage-row">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <article className="leak-stage" key={stage.label}>
                <span className="leak-stage-index">0{index + 1}</span>
                <i><Icon size={18} aria-hidden="true" /></i>
                <strong>{stage.label}</strong>
                <small>{stage.detail}</small>
              </article>
            );
          })}
        </div>
        <div className="leak-break-row">
          {frictionPoints.map((point) => (
            <article data-leak-point={point.number} className="leak-break" key={point.number}>
              <span><i /><i /></span>
              <small>Break point {point.number}</small>
              <strong>{point.title}</strong>
              <p>{point.description}</p>
              <ArrowRight size={14} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
