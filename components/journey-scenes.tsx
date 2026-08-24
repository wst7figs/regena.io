import {
  CalendarCheck2,
  Check,
  CircleCheck,
  Clock3,
  MessageSquareText,
  PhoneIncoming,
  Sparkles,
} from "lucide-react";

import { journeyStages } from "@/lib/home-content";

export type JourneyStageId = (typeof journeyStages)[number]["id"];

function SignalBars() {
  return (
    <div className="scene-signal-bars" aria-hidden="true">
      {[18, 34, 22, 48, 62, 38, 72, 52, 28, 44, 24].map((height, index) => (
        <i key={`${height}-${index}`} style={{ height }} />
      ))}
    </div>
  );
}

function AcquireScene() {
  return (
    <div className="scene-acquire scene-surface">
      <div className="scene-kicker"><PhoneIncoming size={14} /> Incoming demand</div>
      <div className="scene-contact-row">
        <span className="scene-avatar">KS</span>
        <div><strong>Kaitlyn Smith</strong><small>New patient inquiry</small></div>
        <span className="scene-live-pill"><i /> Live</span>
      </div>
      <SignalBars />
      <div className="scene-source-row">
        <span>Source</span><strong>Google Ads · Spring campaign</strong>
      </div>
    </div>
  );
}

function RespondScene() {
  return (
    <div className="scene-respond scene-surface">
      <div className="scene-kicker"><MessageSquareText size={14} /> Live conversation</div>
      <div className="scene-chat scene-chat-agent">Hi Kaitlyn — I can help with that. What are you looking for?</div>
      <div className="scene-chat scene-chat-patient">I’m interested in recovery and longevity options.</div>
      <div className="scene-response-meta"><span><i /> Responded in 0:02</span><span>Listening…</span></div>
    </div>
  );
}

function QualifyScene() {
  const checks = ["Service match", "Location", "Intent", "Availability"];

  return (
    <div className="scene-qualify scene-surface">
      <div className="scene-kicker"><Sparkles size={14} /> Smart qualification</div>
      <div className="scene-check-list">
        {checks.map((check) => <span key={check}><i><Check size={12} /></i>{check}<b>Matched</b></span>)}
      </div>
      <div className="scene-score-row"><span>Patient fit</span><strong>High intent</strong><em>92</em></div>
    </div>
  );
}

function BookScene() {
  const times = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM"];

  return (
    <div className="scene-book scene-surface">
      <div className="scene-kicker"><CalendarCheck2 size={14} /> Real-time booking</div>
      <div className="scene-date-row"><strong>Tuesday, May 27</strong><small>Pacific time</small></div>
      <div className="scene-times">
        {times.map((time) => <span className={time === "10:30 AM" ? "is-selected" : ""} key={time}>{time}</span>)}
      </div>
      <div className="scene-confirm-line"><CircleCheck size={15} /> Availability confirmed</div>
    </div>
  );
}

function EnrollScene() {
  return (
    <div className="scene-enroll scene-surface">
      <div className="scene-outcome-icon"><Check size={24} /></div>
      <small>Consultation confirmed</small>
      <strong>Tuesday at 10:30 AM</strong>
      <div className="scene-outcome-route">
        <span><Clock3 size={13} /> Follow-up scheduled</span>
        <span><CircleCheck size={13} /> CRM updated</span>
      </div>
      <div className="scene-attribution"><span>Attributed to</span><b>Spring Growth · Voice inbound</b></div>
    </div>
  );
}

export function JourneyScene({ stageId, active }: { stageId: JourneyStageId; active: boolean }) {
  return (
    <article
      className="journey-scene"
      data-journey-scene={stageId}
      data-active={active}
      aria-hidden={!active}
    >
      {stageId === "acquire" ? <AcquireScene /> : null}
      {stageId === "respond" ? <RespondScene /> : null}
      {stageId === "qualify" ? <QualifyScene /> : null}
      {stageId === "book" ? <BookScene /> : null}
      {stageId === "enroll" ? <EnrollScene /> : null}
    </article>
  );
}
