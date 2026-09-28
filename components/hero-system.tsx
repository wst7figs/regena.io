"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Check,
  MessageSquareText,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

import { PatientSignal } from "@/components/patient-signal";
import { useHydrated } from "@/lib/use-hydrated";

const waveform = [24, 39, 18, 54, 34, 68, 43, 78, 30, 58, 36, 72, 46, 26, 52, 33, 18];
const voiceDurations = [980, 1240, 870, 1350, 1050, 1490, 930, 1280, 1110, 1420, 910, 1330, 1020, 1470, 960, 1210, 1390];
const voiceDelays = [-620, -1140, -230, -910, -1420, -480, -1260, -760, -1540, -320, -1040, -690, -1370, -530, -1180, -870, -1500];
const voicePeaks = [0.82, 0.94, 0.72, 1.06, 0.88, 1.02, 0.78, 1.08, 0.84, 1, 0.76, 1.04, 0.9, 0.8, 0.98, 0.86, 0.74];
const heroPath = "M70 220 C180 110 245 340 360 228 C455 140 485 155 555 190 C640 235 650 82 760 116 C840 142 835 298 938 286";

export function HeroSystem() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const hasMounted = useHydrated();
  const reducedMotion = hasMounted && Boolean(prefersReducedMotion);
  const introProgress = useMotionValue(reducedMotion ? 1 : 0);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reducedMotion ? 1 : 0.96],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : -36],
  );
  const outcomeProgress = useTransform(introProgress, [0.72, 1], [0, 1]);

  useEffect(() => {
    if (reducedMotion) {
      introProgress.set(1);
      return;
    }

    const controls = animate(introProgress, 1, {
      delay: 0.18,
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [introProgress, reducedMotion]);

  return (
    <motion.div
      ref={frameRef}
      data-testid="hero-system"
      className="hero-system hero-system-layered"
      aria-label="An inquiry moving through the Regena patient-growth system"
      style={{ y, scale }}
    >
      <div className="hero-system-head hero-system-toolbar">
        <span>Live patient journey</span>
        <span className="live-indicator"><i /> System active</span>
      </div>

      <div className="hero-system-canvas">
        <div className="hero-canvas-grid" aria-hidden="true" />
        <PatientSignal
          id="hero-signal"
          className="hero-patient-signal"
          path={heroPath}
          progress={introProgress}
          outcomeProgress={outcomeProgress}
          viewBox="0 0 1000 420"
        />

        <section
          className="hero-scene hero-scene-call"
          data-system-stage="acquire"
        >
          <div className="hero-scene-label"><span>01</span> Incoming call</div>
          <div className="hero-call-topline">
            <span className="hero-live-dot" />
            <span>Live · 00:18</span>
            <Phone size={14} aria-hidden="true" />
          </div>
          <div className="hero-waveform" aria-hidden="true">
            {waveform.map((height, index) => (
              <i
                key={`${height}-${index}`}
                style={{
                  "--wave-height": `${height}%`,
                  "--voice-duration": `${voiceDurations[index]}ms`,
                  "--voice-delay": `${voiceDelays[index]}ms`,
                  "--voice-peak": voicePeaks[index],
                  "--voice-mid": Math.max(0.48, voicePeaks[index] - 0.26),
                } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="hero-caller">
            <span>KS</span>
            <div><strong>Kaitlyn Smith</strong><small>New patient inquiry</small></div>
          </div>
          <div className="hero-answer-row">
            <span>Answered in 0:02</span>
            <div><Phone size={13} /> Connected</div>
          </div>
        </section>

        <section
          className="hero-scene hero-scene-conversation"
          data-system-stage="respond"
        >
          <div className="hero-scene-label"><span>02</span> Live response</div>
          <div className="hero-conversation-heading">
            <MessageSquareText size={15} aria-hidden="true" />
            <strong>Conversation</strong>
            <span>Listening</span>
          </div>
          <div className="hero-message hero-message-agent">
            I can help with that. Are you looking for a consultation?
          </div>
          <div className="hero-message hero-message-patient">
            Yes, mornings work best.
          </div>
        </section>

        <section
          className="hero-scene hero-scene-qualification"
          data-system-stage="qualify"
        >
          <div className="hero-scene-label"><span>03</span> Qualification</div>
          <strong className="hero-qualified-title"><ShieldCheck size={17} /> High intent</strong>
          <ul>
            <li><Check size={13} /> Service match</li>
            <li><Check size={13} /> Location confirmed</li>
            <li><Check size={13} /> Ready to book</li>
          </ul>
        </section>

        <section
          className="hero-scene hero-scene-booking"
          data-system-stage="book"
        >
          <div className="hero-scene-label"><span>04</span> Booking</div>
          <div className="hero-booking-date"><CalendarDays size={15} /> Tue, May 27</div>
          <div className="hero-time-options">
            <span>9:00</span><strong>10:30</strong><span>1:00</span>
          </div>
          <small>Real-time availability</small>
        </section>

        <section
          className="hero-scene hero-scene-outcome"
          data-system-stage="enroll"
        >
          <div className="hero-outcome-mark"><Check size={18} /></div>
          <div><small>Consultation confirmed</small><strong>You&apos;re all set</strong></div>
          <ArrowUpRight size={17} aria-hidden="true" />
        </section>
      </div>
    </motion.div>
  );
}
