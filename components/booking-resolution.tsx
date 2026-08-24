"use client";

import { useMotionValue } from "motion/react";
import { CalendarCheck2, Check, CircleCheck } from "lucide-react";

import { PatientSignal } from "@/components/patient-signal";

const bookingPath = "M 16 166 C 94 166 104 82 182 82 S 276 166 350 166 S 446 82 532 82";

export function BookingResolution() {
  const progress = useMotionValue(1);
  const outcomeProgress = useMotionValue(1);

  return (
    <div className="booking-resolution" data-testid="booking-resolution">
      <div className="booking-resolution-head">
        <span>Patient journey diagnostic</span>
        <small><i /> Ready to map</small>
      </div>
      <PatientSignal
        id="booking-resolution-signal"
        path={bookingPath}
        progress={progress}
        outcomeProgress={outcomeProgress}
        viewBox="0 0 548 244"
      />
      <div className="booking-resolution-source">
        <span><CalendarCheck2 size={17} /></span>
        <div><small>Inquiry received</small><strong>Clinic demand</strong></div>
      </div>
      <div className="booking-resolution-outcome">
        <span><Check size={19} /></span>
        <div><small>Consultation confirmed</small><strong>Next Tuesday · 10:30 AM</strong></div>
        <CircleCheck size={17} />
      </div>
      <div className="booking-resolution-footer"><span>Demand</span><span>System mapped</span><strong>Outcome</strong></div>
    </div>
  );
}
