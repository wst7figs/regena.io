"use client";

import { useInView } from "motion/react";
import { CirclePlay, Gauge, MoveRight } from "lucide-react";
import { useRef } from "react";

import { proofMetrics } from "@/lib/home-content";

export function ProofStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.28 });

  return (
    <div className="proof-story" data-testid="proof-story" data-revealed={inView} ref={ref}>
      <div className="proof-media">
        <div className="proof-media-grid" aria-hidden="true" />
        <div className="proof-media-orbit proof-media-orbit-one" aria-hidden="true" />
        <div className="proof-media-orbit proof-media-orbit-two" aria-hidden="true" />
        <div className="proof-portrait" aria-hidden="true"><span /><i /></div>
        <div className="proof-media-copy">
          <span>Client story · VisionMax</span>
          <div className="proof-result-chip">
            <strong>40%</strong>
            <small>better pickup and appointment-booking rates</small>
          </div>
          <h3>VisionMax Eye Centre</h3>
          <p>
            When inbound demand and follow-up outpaced the front desk, Regena connected voice response,
            qualification, and consultation booking.
          </p>
          <span className="proof-play-preview" aria-hidden="true">
            <CirclePlay size={25} aria-hidden="true" /> Founder testimonial · In production
          </span>
        </div>
      </div>

      <div className="proof-operating-view">
        <header className="proof-view-header">
          <div><span>System performance</span><h3>One journey. One operating view.</h3></div>
          <small><i /> System active</small>
        </header>

        <ol className="proof-timeline">
          <li><span>01</span><div><small>Before</small><strong>Inbound demand outpaced follow-up</strong></div></li>
          <li><span>02</span><div><small>Connected system</small><strong>AI voice, chat, and booking worked as one</strong></div></li>
          <li><span>03</span><div><small>Observed outcome</small><strong>40% better pickup and appointment-booking rates</strong></div></li>
        </ol>

        <div className="proof-metrics">
          {proofMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <article data-proof-metric={metric.label} key={metric.label}>
                <header><span>{metric.label}</span><Icon size={15} aria-hidden="true" /></header>
                <strong>{metric.value}</strong>
                <div className="proof-metric-line" aria-hidden="true">
                  {[24, 38, 31, 54, 47, 68, 58, 78].map((height, barIndex) => (
                    <i key={`${height}-${barIndex}`} style={{ "--metric-height": `${height + index * 2}%`, "--metric-delay": `${barIndex * 55}ms` } as React.CSSProperties} />
                  ))}
                </div>
                <small>{metric.trend}</small>
              </article>
            );
          })}
        </div>

        <div className="proof-view-footer">
          <span><Gauge size={15} aria-hidden="true" /> Reviewed and refined with human oversight</span>
          <a href="/book">Discuss your system <MoveRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  );
}
