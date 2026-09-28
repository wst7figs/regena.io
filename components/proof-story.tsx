"use client";

import { useInView } from "motion/react";
import Image from "next/image";
import { Check, Gauge, MoveRight } from "lucide-react";
import { useRef } from "react";

import { placeholderCaseStudy } from "@/lib/placeholder-case-study";

export function ProofStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.28 });

  return (
    <div className="proof-story" data-testid="proof-story" data-revealed={inView} ref={ref}>
      <div className="proof-media">
        <div className="proof-media-grid" aria-hidden="true" />
        <div className="proof-media-orbit proof-media-orbit-one" aria-hidden="true" />
        <div className="proof-media-orbit proof-media-orbit-two" aria-hidden="true" />
        <div className="proof-logo" aria-hidden="true"><Image src={placeholderCaseStudy.logo} alt="" fill unoptimized sizes="(max-width: 720px) 220px, 260px" /></div>
        <div className="proof-media-copy">
          <span>{placeholderCaseStudy.disclosure}</span>
          <div className="proof-result-chip">
            <strong>{placeholderCaseStudy.result}</strong>
            <small>{placeholderCaseStudy.resultLabel}</small>
          </div>
          <h3>{placeholderCaseStudy.client}</h3>
          <p>{placeholderCaseStudy.summary}</p>
          <blockquote className="proof-placeholder-quote">{placeholderCaseStudy.quote}<small>{placeholderCaseStudy.owner} · {placeholderCaseStudy.ownerTitle}</small></blockquote>
        </div>
      </div>

      <div className="proof-operating-view">
        <header className="proof-view-header">
          <div><span>System performance</span><h3>One journey. One operating view.</h3></div>
          <small><i /> System active</small>
        </header>

        <ol className="proof-timeline">
          <li><span>01</span><div><small>Example constraint</small><strong>Patient inquiries lacked a consistent next step</strong></div></li>
          <li><span>02</span><div><small>Patient Conversion System</small><strong>Response, qualification, booking, and follow-up connected</strong></div></li>
          <li><span>03</span><div><small>Example outcome</small><strong>{placeholderCaseStudy.result} in answered inbound calls</strong></div></li>
        </ol>

        <section className="proof-built-list" aria-label="What Regena built in this illustrative example"><span>What Regena built</span><ul>{placeholderCaseStudy.system.map((item) => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul></section>

        <div className="proof-metrics">
          {placeholderCaseStudy.metrics.map((metric, index) => {
            return (
              <article data-proof-metric={metric.label} key={metric.label}>
                <header><span>{metric.label}</span></header>
                <strong>{metric.value}</strong>
                <div className="proof-metric-line" aria-hidden="true">
                  {[24, 38, 31, 54, 47, 68, 58, 78].map((height, barIndex) => (
                    <i key={`${height}-${barIndex}`} style={{ "--metric-scale": (height + index * 2) / 100, "--metric-delay": `${barIndex * 55}ms` } as React.CSSProperties} />
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
