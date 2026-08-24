"use client";

import { motion, type MotionValue } from "motion/react";

type PatientSignalProps = {
  id: string;
  path: string;
  progress: MotionValue<number>;
  outcomeProgress: MotionValue<number>;
  className?: string;
  viewBox: string;
};

export function PatientSignal({
  id,
  path,
  progress,
  outcomeProgress,
  className = "",
  viewBox,
}: PatientSignalProps) {
  return (
    <svg
      className={`patient-signal ${className}`.trim()}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-mineral-gradient`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop stopColor="#74c9af" />
          <stop offset="1" stopColor="#9be7cb" />
        </linearGradient>
        <linearGradient
          id={`${id}-outcome-gradient`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop stopColor="#74c9af" />
          <stop offset="1" stopColor="#9a7de2" />
        </linearGradient>
      </defs>

      <path
        data-signal-path="base"
        d={path}
        className="patient-signal-base"
      />
      <motion.path
        data-signal-path="mineral"
        d={path}
        className="patient-signal-mineral"
        stroke={`url(#${id}-mineral-gradient)`}
        style={{ pathLength: progress }}
      />
      <motion.path
        data-signal-path="outcome"
        d={path}
        className="patient-signal-outcome"
        stroke={`url(#${id}-outcome-gradient)`}
        style={{ pathLength: outcomeProgress }}
      />
    </svg>
  );
}
