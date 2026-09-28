"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type KeyboardEvent, useId, useRef, useState } from "react";

import { JourneyScene } from "@/components/journey-scenes";
import { PatientSignal } from "@/components/patient-signal";
import { journeyStages } from "@/lib/home-content";
import { getJourneyStageIndex } from "@/lib/journey-motion";
import { useHydrated } from "@/lib/use-hydrated";

const journeyPath = "M 34 518 C 154 518 154 134 296 134 S 418 510 526 510 S 648 144 752 144 S 838 322 926 322";

export function PatientJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const storyRef = useRef<HTMLElement>(null);
  const baseId = useId();
  const prefersReducedMotion = useReducedMotion();
  const hasMounted = useHydrated();
  const reducedMotion = hasMounted && Boolean(prefersReducedMotion);
  const activeStage = journeyStages[activeIndex];
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });
  const outcomeProgress = useTransform(smoothProgress, [0.68, 1], [0, 1]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (reducedMotion) return;
    const nextIndex = getJourneyStageIndex(value, journeyStages.length);
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const selectStage = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
    markerRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % journeyStages.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + journeyStages.length) % journeyStages.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = journeyStages.length - 1;

    if (nextIndex !== index) {
      event.preventDefault();
      selectStage(nextIndex);
    }
  };

  return (
    <section
      ref={storyRef}
      className="journey-scroll-story"
      data-active-stage={activeStage.id}
      data-reduced-motion={Boolean(reducedMotion)}
    >
      <div className="journey-sticky">
        <div className="journey-story-shell">
          <div className="journey-story-copy" role="tablist" aria-label="Patient journey stages">
            <div className="journey-copy-rail" aria-hidden="true"><i /></div>
            {journeyStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={stage.id}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  id={`${baseId}-tab-${stage.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  data-stage-copy={stage.id}
                  className={isActive ? "journey-story-tab is-active" : "journey-story-tab"}
                  onClick={() => selectStage(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span className="journey-story-node"><Icon size={16} aria-hidden="true" /></span>
                  <span className="journey-story-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="journey-story-label"><strong>{stage.label}</strong><small>{stage.description}</small></span>
                </button>
              );
            })}
          </div>

          <div className="journey-story-visual">
            <div className="journey-visual-header">
              <span>Live patient journey</span>
              <span><i /> Kaitlyn Smith</span>
            </div>
            {journeyStages.map((stage, index) => (
              <JourneyScene key={stage.id} stageId={stage.id} active={index === activeIndex} />
            ))}
            <PatientSignal
              id="journey-signal"
              path={journeyPath}
              progress={smoothProgress}
              outcomeProgress={outcomeProgress}
              viewBox="0 0 960 640"
            />
            <div className="journey-stage-status" aria-hidden="true">
              <span>0{activeIndex + 1}</span><strong>{activeStage.title}</strong>
            </div>
          </div>
        </div>

        <div
          id={`${baseId}-panel`}
          className="journey-active-panel"
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeStage.id}`}
        >
          <span>{activeStage.title}</span>
          <p>{activeStage.detail}</p>
        </div>
      </div>

      <div className="journey-scroll-markers" aria-hidden="true">
        {journeyStages.map((stage, index) => (
          <div
            ref={(node) => { markerRefs.current[index] = node; }}
            data-scroll-marker={stage.id}
            key={stage.id}
          />
        ))}
      </div>

      <div className="journey-mobile-story">
        {journeyStages.map((stage, index) => (
          <article className="journey-mobile-card" data-mobile-stage={stage.id} key={stage.id}>
            <header><span>{String(index + 1).padStart(2, "0")}</span><small>{stage.label}</small></header>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
            <JourneyScene stageId={stage.id} active />
          </article>
        ))}
      </div>
    </section>
  );
}
