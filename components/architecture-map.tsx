"use client";

import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { Orbit } from "lucide-react";
import { useEffect, useRef } from "react";

import { PatientSignal } from "@/components/patient-signal";
import { infrastructureLayers } from "@/lib/home-content";
import { useHydrated } from "@/lib/use-hydrated";

const architecturePath = "M 92 164 C 204 164 190 70 326 70 C 440 70 438 164 548 164 C 652 164 648 260 792 260";

export function ArchitectureMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = useHydrated() && Boolean(prefersReducedMotion);
  const progress = useMotionValue(reducedMotion ? 1 : 0);
  const outcomeProgress = useMotionValue(0);

  useEffect(() => {
    if (!inView && !reducedMotion) return;
    const controls = animate(progress, 1, {
      duration: reducedMotion ? 0 : 1.5,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, progress, reducedMotion]);

  return (
    <div className="architecture-map" data-testid="architecture-map" ref={ref}>
      <div className="architecture-canvas" aria-label="Three connected layers coordinated by Regena">
        <div className="architecture-grid" aria-hidden="true" />
        <PatientSignal
          id="architecture-signal"
          path={architecturePath}
          progress={progress}
          outcomeProgress={outcomeProgress}
          viewBox="0 0 880 330"
        />
        <div className="architecture-core">
          <span><Orbit size={19} aria-hidden="true" /></span>
          <small>Regena orchestration</small>
          <strong>One patient context</strong>
          <em><i /> Live system</em>
        </div>
        {infrastructureLayers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <article
              className={`architecture-layer architecture-layer-${index + 1}`}
              data-architecture-layer={layer.label}
              key={layer.label}
            >
              <header><span>0{index + 1}</span><Icon size={19} aria-hidden="true" /></header>
              <small>{layer.label}</small>
              <h3>{layer.title}</h3>
              <p>{layer.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
