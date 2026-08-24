# Regena Homepage V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Regena homepage as a premium, scroll-driven patient-growth story with one connected product environment, a signature patient signal, distinct section compositions, and a purpose-built mobile narrative.

**Architecture:** Keep the Next.js App Router and existing content contracts. Add Motion for React as the only runtime dependency, isolate scroll math in pure tested helpers, and build the cinematic journey from a sticky CSS layout plus section-scoped Motion values. Keep all meaningful content in document order and use Motion only for visual state, so reduced-motion and keyboard users receive the complete experience.

**Tech Stack:** Next.js 16.3.1, React 19.2.8, TypeScript 5.9.3, Motion 13.1.0, CSS, Lucide React 1.32.0, Vitest 4.1.11, Testing Library 16.3.2, Playwright 1.62.1.

**Spec:** `docs/superpowers/specs/2026-08-18-regena-homepage-v2-design.md`

## Global Constraints

- Preserve Instrument Sans, IBM Plex Mono, warm ivory, graphite, mineral green, outcome violet, the REGENA wordmark, and the existing narrow patient-journey positioning.
- Add `motion@13.1.0` as the only new runtime dependency.
- Do not add Tailwind, GSAP, WebGL, global smooth scrolling, scroll-jacking, a cursor replacement, or a component-library theme.
- Borrow mechanics from 21st.dev and Aceternity, but implement Regena-specific markup, visuals, and CSS.
- Violet appears only at booked, enrolled, or attributed outcome states.
- Every booking CTA resolves to the single `#book` destination.
- Scroll must never be the only way to understand or activate a journey stage.
- Reduced-motion mode renders complete content without narrative travel.
- `sources/` remains read-only.
- The workspace is not a Git repository; commit steps are omitted because they cannot run here. Each task ends with a test and file-diff checkpoint instead.

## File map

- `package.json` / `package-lock.json`: add Motion 13.1.0.
- `lib/journey-motion.ts`: pure progress-clamping, stage-index, and stage-range helpers.
- `components/patient-signal.tsx`: reusable scroll-progress SVG signal.
- `components/hero-system.tsx`: layered hero operating environment and restrained hero-exit motion.
- `components/site-header.tsx`: existing menu plus frosted scrolled state.
- `components/patient-journey.tsx`: sticky desktop story, mobile story cards, stage controls, and scroll-stage synchronization.
- `components/journey-scenes.tsx`: focused visual scenes for Acquire, Respond, Qualify, Book, and Enroll.
- `components/leak-flow.tsx`: one connected demand-leak visualization.
- `components/architecture-map.tsx`: exploded system map with traced connections.
- `components/proof-story.tsx`: full-width VisionMax proof environment and metric reveal.
- `components/home-sections.tsx`: editorial wrappers, operating timeline, final booking, and footer.
- `components/reveal.tsx`: secondary one-shot reveals only.
- `app/page.tsx`: final section composition.
- `app/globals.css`: tokens, layout, component styling, sticky story, responsive rules, and reduced motion.
- `tests/journey-motion.test.ts`: progress helper tests.
- `tests/patient-signal.test.tsx`: SVG signal contract tests.
- `tests/hero-system.test.tsx`: hero operating-environment structure.
- `tests/patient-journey.test.tsx`: keyboard, pointer, content-order, and active-scene behavior.
- `tests/homepage.test.tsx`: final architecture and CTA contracts.
- `e2e/home.spec.ts`: responsive, scrolling, reduced-motion, anchor, and overflow verification.

---

### Task 1: Motion foundation and deterministic journey math

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `lib/journey-motion.ts`
- Create: `tests/journey-motion.test.ts`

**Interfaces:**
- Produces: `clampProgress(progress: number): number`.
- Produces: `getJourneyStageIndex(progress: number, stageCount: number): number`.
- Produces: `getStageRange(index: number, stageCount: number): readonly [number, number]`.
- Produces: `getStageLocalProgress(progress: number, index: number, stageCount: number): number`.

- [ ] **Step 1: Write the failing progress-helper tests**

```ts
import { describe, expect, it } from "vitest";

import {
  clampProgress,
  getJourneyStageIndex,
  getStageLocalProgress,
  getStageRange,
} from "@/lib/journey-motion";

describe("journey motion helpers", () => {
  it("clamps scroll progress to the supported range", () => {
    expect(clampProgress(-0.2)).toBe(0);
    expect(clampProgress(0.45)).toBe(0.45);
    expect(clampProgress(1.4)).toBe(1);
  });

  it("maps progress into five stable stage indices", () => {
    expect([0, 0.19, 0.2, 0.4, 0.79, 0.8, 1].map((value) => getJourneyStageIndex(value, 5))).toEqual([
      0, 0, 1, 2, 3, 4, 4,
    ]);
  });

  it("returns stage ranges and local progress", () => {
    expect(getStageRange(2, 5)).toEqual([0.4, 0.6]);
    expect(getStageLocalProgress(0.5, 2, 5)).toBeCloseTo(0.5);
    expect(getStageLocalProgress(0.2, 2, 5)).toBe(0);
  });
});
```

- [ ] **Step 2: Run the new test and verify RED**

Run: `npm test -- tests/journey-motion.test.ts`

Expected: FAIL because `@/lib/journey-motion` does not exist.

- [ ] **Step 3: Install Motion 13.1.0**

Run: `npm install motion@13.1.0`

Expected: `package.json` contains `"motion": "^13.1.0"` and the lockfile records the package.

- [ ] **Step 4: Implement the pure motion helpers**

```ts
export function clampProgress(progress: number) {
  return Math.min(1, Math.max(0, progress));
}

export function getJourneyStageIndex(progress: number, stageCount: number) {
  if (stageCount < 1) return 0;
  return Math.min(stageCount - 1, Math.floor(clampProgress(progress) * stageCount));
}

export function getStageRange(index: number, stageCount: number) {
  if (stageCount < 1) return [0, 1] as const;
  const safeIndex = Math.min(stageCount - 1, Math.max(0, index));
  return [safeIndex / stageCount, (safeIndex + 1) / stageCount] as const;
}

export function getStageLocalProgress(progress: number, index: number, stageCount: number) {
  const [start, end] = getStageRange(index, stageCount);
  return clampProgress((clampProgress(progress) - start) / Math.max(end - start, Number.EPSILON));
}
```

- [ ] **Step 5: Run the helper test and full unit suite**

Run: `npm test -- tests/journey-motion.test.ts && npm test`

Expected: all tests PASS.

- [ ] **Step 6: Review the dependency diff**

Run: `node -e 'const pkg = require("./package.json"); console.log(pkg.dependencies)' && npm ls motion`

Expected: Motion resolves to 13.1.0 and no unrelated runtime package was added.

---

### Task 2: Reusable Patient Signal component

**Files:**
- Create: `components/patient-signal.tsx`
- Create: `tests/patient-signal.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `progress: MotionValue<number>` and `outcomeProgress: MotionValue<number>`.
- Produces: `PatientSignal({ id, path, progress, outcomeProgress, className, viewBox })`.
- Produces: three SVG paths with `data-signal-path="base|mineral|outcome"`.

- [ ] **Step 1: Write the failing SVG contract test**

```tsx
import { render } from "@testing-library/react";
import { motionValue } from "motion/react";
import { describe, expect, it } from "vitest";

import { PatientSignal } from "@/components/patient-signal";

describe("PatientSignal", () => {
  it("renders a decorative base, mineral progress, and outcome progress path", () => {
    const { container } = render(
      <PatientSignal
        id="journey-test"
        path="M0 50 C100 0 200 100 300 50"
        progress={motionValue(0.6)}
        outcomeProgress={motionValue(0.2)}
        viewBox="0 0 300 100"
      />,
    );

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector('[data-signal-path="base"]')).toHaveAttribute("d", "M0 50 C100 0 200 100 300 50");
    expect(container.querySelector('[data-signal-path="mineral"]')).toBeInTheDocument();
    expect(container.querySelector('[data-signal-path="outcome"]')).toBeInTheDocument();
    expect(container.querySelector("#journey-test-mineral-gradient")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the signal test and verify RED**

Run: `npm test -- tests/patient-signal.test.tsx`

Expected: FAIL because `PatientSignal` does not exist.

- [ ] **Step 3: Implement the signal component**

```tsx
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

export function PatientSignal({ id, path, progress, outcomeProgress, className = "", viewBox }: PatientSignalProps) {
  return (
    <svg className={`patient-signal ${className}`.trim()} viewBox={viewBox} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-mineral-gradient`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#74c9af" />
          <stop offset="1" stopColor="#9be7cb" />
        </linearGradient>
        <linearGradient id={`${id}-outcome-gradient`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#74c9af" />
          <stop offset="1" stopColor="#9a7de2" />
        </linearGradient>
      </defs>
      <path data-signal-path="base" d={path} className="patient-signal-base" />
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
```

- [ ] **Step 4: Add stable signal styling**

```css
.patient-signal { display: block; width: 100%; overflow: visible; }
.patient-signal path { vector-effect: non-scaling-stroke; }
.patient-signal-base { stroke: rgba(255, 255, 255, 0.12); stroke-width: 1; }
.patient-signal-mineral { stroke-linecap: round; stroke-width: 2; }
.patient-signal-outcome { stroke-linecap: round; stroke-width: 2.5; }
```

Use component-specific classes for final gradient references because SVG fragment identifiers are generated from the `id` prop.

- [ ] **Step 5: Run the signal and full unit suites**

Run: `npm test -- tests/patient-signal.test.tsx && npm test`

Expected: all tests PASS.

---

### Task 3: Layered hero system and scrolled navigation state

**Files:**
- Modify: `components/hero-system.tsx`
- Modify: `components/site-header.tsx`
- Create: `tests/hero-system.test.tsx`
- Modify: `tests/site-header.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `HeroSystem` with `data-testid="hero-system"` and five `data-system-stage` scenes.
- Produces: `.site-header[data-scrolled="true|false"]`.
- Consumes: Motion `useScroll`, `useTransform`, `useMotionValueEvent`, and `useReducedMotion`.

- [ ] **Step 1: Write the failing hero structure test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSystem } from "@/components/hero-system";

describe("HeroSystem", () => {
  it("renders one connected environment with five ordered system stages", () => {
    const { container } = render(<HeroSystem />);
    expect(screen.getByTestId("hero-system")).toHaveAttribute(
      "aria-label",
      "An inquiry moving through the Regena patient-growth system",
    );
    expect(Array.from(container.querySelectorAll("[data-system-stage]")).map((node) => node.getAttribute("data-system-stage"))).toEqual([
      "acquire", "respond", "qualify", "book", "enroll",
    ]);
    expect(container.querySelectorAll('[data-signal-path="mineral"]')).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Extend the header test with its initial visual state**

```tsx
expect(document.querySelector(".site-header")).toHaveAttribute("data-scrolled", "false");
```

- [ ] **Step 3: Run the targeted tests and verify RED**

Run: `npm test -- tests/hero-system.test.tsx tests/site-header.test.tsx`

Expected: hero test FAILS because the layered contract does not exist; header test FAILS because `data-scrolled` is missing.

- [ ] **Step 4: Rebuild `HeroSystem` as one layered client scene**

Implement this hierarchy:

```tsx
<motion.div ref={frameRef} data-testid="hero-system" className="hero-system hero-system-layered" style={{ y, scale }}>
  <div className="hero-system-toolbar">
    <span>Live patient journey</span>
    <span className="live-indicator"><i /> System active</span>
  </div>
  <div className="hero-system-canvas">
    <section data-system-stage="acquire" className="hero-scene hero-scene-call"><span>Incoming call</span><strong>Kaitlyn Smith</strong></section>
    <section data-system-stage="respond" className="hero-scene hero-scene-conversation"><span>Live response</span><p>How can I help today?</p></section>
    <section data-system-stage="qualify" className="hero-scene hero-scene-qualification"><span>Qualified</span><strong>High intent</strong></section>
    <section data-system-stage="book" className="hero-scene hero-scene-booking"><span>Find a time</span><strong>10:30 AM</strong></section>
    <section data-system-stage="enroll" className="hero-scene hero-scene-outcome"><span>Consultation confirmed</span><strong>You're all set</strong></section>
    <PatientSignal id="hero-signal" path={heroPath} progress={introProgress} outcomeProgress={outcomeProgress} viewBox="0 0 1000 420" />
  </div>
</motion.div>
```

Use a dominant incoming-call panel, medium conversation and qualification panels, and smaller downstream booking/outcome panels. Remove the four-equal-column grid.

- [ ] **Step 5: Add restrained hero-exit transforms**

```ts
const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start start", "end start"] });
const scale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 0.96]);
const y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -36]);
```

Use a separate spring-smoothed intro MotionValue for signal assembly. Do not animate blur or shadow values.

- [ ] **Step 6: Add header scrolled state**

```ts
const { scrollY } = useScroll();
const [isScrolled, setIsScrolled] = useState(false);
useMotionValueEvent(scrollY, "change", (value) => setIsScrolled(value > 24));
```

Render `<header className="site-header" data-scrolled={isScrolled}>` and style the true state with fixed positioning, ivory translucency, a hairline border, and restrained backdrop blur.

- [ ] **Step 7: Replace the old hero-grid CSS**

Create an asymmetric canvas with absolute scene placement, readable 12px minimum interface text, shallow depth, and only one contained green-to-violet outcome glow. At `max-width: 1024px`, switch to a stable layered arrangement; at `max-width: 760px`, render the scenes in a deliberate vertical sequence.

- [ ] **Step 8: Run targeted and full tests**

Run: `npm test -- tests/hero-system.test.tsx tests/site-header.test.tsx && npm test`

Expected: all tests PASS.

---

### Task 4: Scroll-driven patient journey and mobile narrative

**Files:**
- Create: `components/journey-scenes.tsx`
- Modify: `components/patient-journey.tsx`
- Modify: `tests/patient-journey.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `JourneyScene({ stageId, active })` for each `JourneyStage["id"]`.
- Produces: `PatientJourney` with `data-active-stage`, five stage controls, five desktop scroll markers, and five mobile story cards.
- Consumes: `journeyStages`, `getJourneyStageIndex`, `PatientSignal`.

- [ ] **Step 1: Expand the journey tests before implementation**

```tsx
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

it("keeps all five stage descriptions in document order", () => {
  const { container } = render(<PatientJourney />);
  expect(Array.from(container.querySelectorAll("[data-stage-copy]")).map((node) => node.getAttribute("data-stage-copy"))).toEqual([
    "acquire", "respond", "qualify", "book", "enroll",
  ]);
});

it("activates a stage with pointer input and requests its scroll marker", async () => {
  const user = userEvent.setup();
  render(<PatientJourney />);
  await user.click(screen.getByRole("tab", { name: /book/i }));
  expect(screen.getByRole("tab", { name: /book/i })).toHaveAttribute("aria-selected", "true");
  expect(document.querySelector("[data-active-stage]")).toHaveAttribute("data-active-stage", "book");
  expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
});
```

Retain the existing arrow-key test.

- [ ] **Step 2: Run the journey test and verify RED**

Run: `npm test -- tests/patient-journey.test.tsx`

Expected: new tests FAIL because stage-copy markers, scroll markers, and `data-active-stage` are missing.

- [ ] **Step 3: Build focused journey scenes**

Implement five scene components in `journey-scenes.tsx`:

```tsx
export type JourneyStageId = (typeof journeyStages)[number]["id"];

export function JourneyScene({ stageId, active }: { stageId: JourneyStageId; active: boolean }) {
  return (
    <article className="journey-scene" data-journey-scene={stageId} data-active={active} aria-hidden={!active}>
      {stageId === "acquire" ? <AcquireScene /> : null}
      {stageId === "respond" ? <RespondScene /> : null}
      {stageId === "qualify" ? <QualifyScene /> : null}
      {stageId === "book" ? <BookScene /> : null}
      {stageId === "enroll" ? <EnrollScene /> : null}
    </article>
  );
}
```

Each scene contains one primary operational moment: source intake, live response, qualification route, real-time booking, or outcome attribution.

- [ ] **Step 4: Replace the tab panel with the scroll-story structure**

```tsx
<section ref={storyRef} className="journey-scroll-story" data-active-stage={activeStage.id}>
  <div className="journey-sticky">
    <div className="journey-story-copy" role="tablist" aria-label="Patient journey stages">
      {journeyStages.map((stage, index) => (
        <button key={stage.id} role="tab" aria-selected={index === activeIndex} data-stage-copy={stage.id} onClick={() => selectStage(index)}>
          <span>{String(index + 1).padStart(2, "0")}</span><strong>{stage.label}</strong><small>{stage.description}</small>
        </button>
      ))}
    </div>
    <div className="journey-story-visual">
      {journeyStages.map((stage, index) => <JourneyScene key={stage.id} stageId={stage.id} active={index === activeIndex} />)}
      <PatientSignal id="journey-signal" path={journeyPath} progress={smoothProgress} outcomeProgress={outcomeProgress} viewBox="0 0 960 640" />
    </div>
  </div>
  <div className="journey-scroll-markers" aria-hidden="true">
    {journeyStages.map((stage, index) => <div ref={(node) => { markerRefs.current[index] = node; }} data-scroll-marker={stage.id} key={stage.id} />)}
  </div>
  <div className="journey-mobile-story">
    {journeyStages.map((stage, index) => (
      <article className="journey-mobile-card" data-mobile-stage={stage.id} key={stage.id}>
        <span>{String(index + 1).padStart(2, "0")}</span><h3>{stage.title}</h3><p>{stage.description}</p><JourneyScene stageId={stage.id} active />
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 5: Connect section progress to active stage**

```ts
const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start start", "end end"] });
const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });
useMotionValueEvent(smoothProgress, "change", (value) => {
  const nextIndex = getJourneyStageIndex(value, journeyStages.length);
  setActiveIndex((current) => current === nextIndex ? current : nextIndex);
});
```

Derive mineral path progress from `smoothProgress`. Derive outcome progress with `useTransform(smoothProgress, [0.68, 1], [0, 1])`.

- [ ] **Step 6: Preserve direct activation and keyboard behavior**

When a user selects a tab, update `activeIndex`, focus the selected control, and call the corresponding marker's `scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" })`. Preserve Arrow keys, Home, and End.

- [ ] **Step 7: Implement desktop and mobile CSS modes**

Desktop (`min-width: 1025px`): `.journey-scroll-story { min-height: 500vh; }`, `.journey-sticky { position: sticky; top: 0; min-height: 100svh; }`, and one changing visual scene.

Mobile and tablet (`max-width: 1024px`): disable the 500vh height, hide desktop markers and sticky scene, show five vertical `.journey-mobile-card` elements connected by a mineral-to-violet rail.

When `useReducedMotion()` is true, set `data-reduced-motion="true"` on the story, disable the 500vh height at every breakpoint, hide the sticky scene, and show the complete vertical story.

- [ ] **Step 8: Run the journey and full suites**

Run: `npm test -- tests/patient-journey.test.tsx && npm test`

Expected: all tests PASS.

---

### Task 5: Revenue-leak flow and exploded architecture map

**Files:**
- Create: `components/leak-flow.tsx`
- Create: `components/architecture-map.tsx`
- Modify: `components/home-sections.tsx`
- Modify: `tests/homepage.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `LeakFlow` with `data-testid="leak-flow"` and three labeled break points.
- Produces: `ArchitectureMap` with `data-testid="architecture-map"` and three layers connected by `PatientSignal`.
- Consumes: `frictionPoints`, `infrastructureLayers`, `PatientSignal`.

- [ ] **Step 1: Add failing homepage contracts**

```tsx
expect(screen.getByTestId("leak-flow")).toBeVisible();
expect(screen.getByTestId("architecture-map")).toBeVisible();
expect(document.querySelectorAll("[data-leak-point]")).toHaveLength(3);
expect(document.querySelectorAll("[data-architecture-layer]")).toHaveLength(3);
```

- [ ] **Step 2: Run the homepage test and verify RED**

Run: `npm test -- tests/homepage.test.tsx`

Expected: FAIL because the two visualization components are missing.

- [ ] **Step 3: Implement `LeakFlow`**

Render one wide flow with source, response, booking, and revenue nodes. Position three break points using `frictionPoints`; each break has a visible gap, delay marker, and concise label. Use `useInView` to animate the signal once from 0 to 1 when the section enters view. Include an accessible summary paragraph outside the decorative SVG.

- [ ] **Step 4: Implement `ArchitectureMap`**

Render three unequal layers—Demand, Conversion, Continuity—around a central orchestration core. Use one traced connection path and no repeating feature-card grid. Keep layer labels and descriptions as semantic text adjacent to the diagram.

- [ ] **Step 5: Replace `FrictionSection` and `InfrastructureSection` internals**

Preserve their section IDs and headings, but replace `.friction-list` and `.layers-diagram` with `LeakFlow` and `ArchitectureMap`. Keep the layouts compositionally distinct: leakage is horizontal and editorial; architecture is asymmetric and diagrammatic.

- [ ] **Step 6: Add responsive and reduced-motion CSS**

At `max-width: 760px`, stack leak stages vertically and simplify architecture connections. Under `prefers-reduced-motion`, render all paths complete and remove delayed node reveals.

- [ ] **Step 7: Run homepage and full unit tests**

Run: `npm test -- tests/homepage.test.tsx && npm test`

Expected: all tests PASS.

---

### Task 6: VisionMax proof climax, operating timeline, and final booking scene

**Files:**
- Create: `components/proof-story.tsx`
- Modify: `components/home-sections.tsx`
- Modify: `tests/homepage.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `ProofStory` with `data-testid="proof-story"`, one media area, one timeline, and four centralized placeholder metrics.
- Produces: `.operating-timeline` with three ordered steps.
- Produces: `.booking-resolution` where the signal ends in a confirmed consultation state.
- Consumes: `proofMetrics`, `fitCriteria`, `PatientSignal`.

- [ ] **Step 1: Add failing proof and operating-model assertions**

```tsx
expect(screen.getByTestId("proof-story")).toBeVisible();
expect(document.querySelectorAll("[data-proof-metric]")).toHaveLength(4);
expect(Array.from(document.querySelectorAll("[data-operating-step]")).map((node) => node.getAttribute("data-operating-step"))).toEqual([
  "build", "operate", "improve",
]);
expect(screen.getByTestId("booking-resolution")).toBeVisible();
```

- [ ] **Step 2: Run the homepage test and verify RED**

Run: `npm test -- tests/homepage.test.tsx`

Expected: FAIL because V2 proof, timeline, and resolution elements are missing.

- [ ] **Step 3: Implement `ProofStory`**

Use one full-width contained environment:

```tsx
<div className="proof-story" data-testid="proof-story">
  <div className="proof-media">Founder story placeholder and play control</div>
  <div className="proof-operating-view">
    <ol className="proof-timeline">Before / connected system / operating outcome</ol>
    <div className="proof-metrics">
      {proofMetrics.map((metric) => <article data-proof-metric={metric.label} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.trend}</small></article>)}
    </div>
  </div>
</div>
```

Use `useInView` for one-time bar/line reveals. Values remain sourced exclusively from `proofMetrics`.

- [ ] **Step 4: Replace the operating card row with an editorial timeline**

Render ordered `build`, `operate`, and `improve` steps separated by one continuous signal. Use typography and rules for hierarchy; keep Lucide icons secondary or remove them entirely.

- [ ] **Step 5: Recompose the booking section**

Keep the existing heading and single `#book` target. Add a compact fit diagnostic and a `booking-resolution` interface showing a mineral signal resolving into a violet confirmed-consultation state.

- [ ] **Step 6: Add responsive and reduced-motion CSS**

Proof becomes media-first vertical on mobile. The operating timeline remains ordered and readable. Booking resolution stays beside the CTA on desktop and below it on mobile. Outcome violet never appears upstream of booking.

- [ ] **Step 7: Run homepage and full unit tests**

Run: `npm test -- tests/homepage.test.tsx && npm test`

Expected: all tests PASS.

---

### Task 7: Final page rhythm, visual cleanup, and responsive composition

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/home-sections.tsx`
- Modify: `components/reveal.tsx`
- Modify: `app/globals.css`
- Modify: `tests/homepage.test.tsx`

**Interfaces:**
- Produces: seven ordered chapters marked with `data-chapter`.
- Preserves: `#top`, `#system`, `#outcomes`, `#approach`, `#story`, and the unique `#book` destination.

- [ ] **Step 1: Add the failing chapter-order test**

```tsx
expect(Array.from(document.querySelectorAll("[data-chapter]")).map((node) => node.getAttribute("data-chapter"))).toEqual([
  "hero",
  "journey",
  "leakage",
  "architecture",
  "proof",
  "operating-model",
  "booking",
]);
expect(document.querySelectorAll("#book")).toHaveLength(1);
```

- [ ] **Step 2: Run the homepage test and verify RED**

Run: `npm test -- tests/homepage.test.tsx`

Expected: FAIL because V2 chapter markers are missing.

- [ ] **Step 3: Apply the final page composition**

Mark the seven major chapters, attach the compact credibility rail to the hero, and ensure each chapter has a distinct composition. Keep `Reveal` only on secondary copy and non-signature elements; do not wrap sticky or scroll-linked scenes in one-shot transforms.

- [ ] **Step 4: Consolidate CSS and remove superseded selectors**

Delete obsolete four-column hero, old journey panel, friction row, layer-card, proof-grid, and operating-card rules after their replacements are live. Keep tokens centralized in `:root`. Confirm every remaining selector is used by the V2 markup.

- [ ] **Step 5: Verify typography and focal hierarchy**

Check these explicit rules in CSS:

```css
.hero-copy h1 { max-width: 9.5ch; }
.section-intro h2 { max-width: 14ch; }
.journey-story-visual { min-height: min(720px, 78svh); }
.proof-story { min-height: 720px; }
@media (max-width: 760px) {
  .hero-copy h1, .section-intro h2 { max-width: none; }
  .journey-scroll-story { min-height: auto; }
}
```

Use these values as the initial acceptance baseline. Change a value only when a screenshot exposes clipping, illegibility, or competing focal points, and re-run the viewport checks after the correction.

- [ ] **Step 6: Run unit tests and lint**

Run: `npm test && npm run lint`

Expected: all tests PASS and ESLint reports no errors.

---

### Task 8: Scroll, accessibility, responsive, and production verification

**Files:**
- Modify: `e2e/home.spec.ts`
- Modify: `playwright.config.ts` only if the existing server configuration cannot run the new checks.
- Create: `artifacts/screenshots/regena-home-v2-desktop.png`
- Create: `artifacts/screenshots/regena-home-v2-mobile.png`

**Interfaces:**
- Verifies: stage activation, CTA routing, no overflow, mobile composition, reduced motion, console cleanliness, and production build.

- [ ] **Step 1: Add a desktop scroll-story test**

```ts
test("desktop scroll advances the patient journey", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const story = page.locator("[data-active-stage]");
  await story.scrollIntoViewIfNeeded();
  await page.locator('[data-scroll-marker="book"]').scrollIntoViewIfNeeded();
  await expect(story).toHaveAttribute("data-active-stage", "book");
  await expect(page.getByRole("tab", { name: "Book" })).toHaveAttribute("aria-selected", "true");
});
```

- [ ] **Step 2: Add a mobile composition test**

```ts
test("mobile uses the vertical journey instead of the sticky desktop scene", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(".journey-mobile-story")).toBeVisible();
  await expect(page.locator(".journey-sticky")).toBeHidden();
  await expect(page.locator("[data-mobile-stage]")).toHaveCount(5);
});
```

- [ ] **Step 3: Strengthen the reduced-motion test**

```ts
test("reduced motion exposes the complete journey without a scroll trap", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("[data-stage-copy]")).toHaveCount(5);
  const storyHeight = await page.locator(".journey-scroll-story").evaluate((element) => element.getBoundingClientRect().height);
  expect(storyHeight).toBeLessThan(2700);
});
```

- [ ] **Step 4: Add console-error collection**

```ts
test("homepage produces no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.locator("footer").scrollIntoViewIfNeeded();
  expect(errors).toEqual([]);
});
```

- [ ] **Step 5: Run all automated checks**

Run: `npm test && npm run lint && npm run build && npm run test:e2e`

Expected: unit tests, lint, production build, and all Playwright tests PASS.

- [ ] **Step 6: Capture desktop and mobile screenshots**

Run:

```bash
npx playwright screenshot --viewport-size="1440,1000" --full-page http://127.0.0.1:3000 artifacts/screenshots/regena-home-v2-desktop.png
npx playwright screenshot --viewport-size="375,812" --full-page http://127.0.0.1:3000 artifacts/screenshots/regena-home-v2-mobile.png
```

Expected: both PNG files exist and show the complete page without clipping.

- [ ] **Step 7: Perform the visual-quality review**

Inspect both screenshots and verify:

- The hero has one dominant operating environment.
- No major viewport contains two competing card grids.
- The patient journey is a sticky scene on desktop and a vertical story on mobile.
- Mineral-to-violet progression occurs only at booking/outcome.
- VisionMax reads as the proof climax.
- All product text remains legible.
- Mobile has no miniature desktop panels or horizontal overflow.

- [ ] **Step 8: Re-run checks after visual corrections**

Run: `npm test && npm run lint && npm run build && npm run test:e2e`

Expected: all checks still PASS after final visual tuning.
