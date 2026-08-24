# Regena Homepage V2 Design Specification

## Objective

Evolve the existing Regena homepage into a category-leading, scroll-driven enterprise experience without replacing its approved visual identity. The page must feel like a managed patient-growth operating system rather than a collection of polished interface cards.

The primary action remains booking a strategy meeting. Final compliance language, verified statistics, production case-study media, CRM integrations, and secondary pages remain outside this design milestone.

## Approved direction

This is an architectural evolution of the current build, not a visual restart.

Preserve:

- Instrument Sans and IBM Plex Mono.
- Warm ivory, graphite, mineral green, and outcome violet.
- The REGENA wordmark and editorial enterprise tone.
- Alternating light and dark chapters.
- The patient-signal concept.
- The existing homepage's narrow focus on the connected patient journey.

Rebuild:

- The hero product composition.
- The patient-journey interaction.
- Section-to-section rhythm.
- Revenue-leak and infrastructure visuals.
- VisionMax proof presentation.
- Mobile narrative composition.
- The motion and interaction system.

## Reference component strategy

Use existing component mechanics as implementation references, not as visual templates.

### 1. Interactive Scrolling Story Component — 21st.dev

Reference: https://21st.dev/@minhxthanh/components/interactive-scrolling-story-component

Borrow:

- A tall scroll container with a sticky viewport.
- A persistent story column paired with a changing visual stage.
- Crossfading and translating between narrative states.

Adapt:

- Replace generic images with Regena's patient-conversion interfaces.
- Keep all five stage descriptions present in document order.
- Use the existing Regena grid, typography, and colors.

### 2. Tracing Beam — Aceternity UI

Reference: https://ui.aceternity.com/components/tracing-beam

Borrow:

- A scroll-progress-driven SVG path.
- A visual signal that follows the reader through a sequence.

Adapt:

- The beam becomes Regena's mineral patient signal.
- It turns violet only when a consultation or attributed outcome is reached.
- It connects UI states rather than decorating article content.

### 3. SVG Follow Scroll — 21st.dev / Reuno UI

Reference: https://21st.dev/community/components/reuno-ui/svg-follow-scroll

Borrow:

- Section-scoped path progress rather than page-global scroll effects.
- Motion values controlling SVG stroke progress.

### 4. Motion for React

Reference: https://motion.dev/docs/react-use-scroll

Use:

- `useScroll` for section progress.
- `useTransform` for stage opacity, translation, scale, and path length.
- `useSpring` only for restrained progress smoothing.
- `useMotionValueEvent` for accessible active-stage state.
- `useReducedMotion` to render a stable non-animated version.
- `LazyMotion` where practical to limit client-side animation weight.

Do not introduce GSAP, global smooth scrolling, WebGL, scroll-jacking, or a component-library theme.

## Signature interaction: the Patient Signal

The patient signal is the one major expressive device on the page.

1. It first appears in the hero as an incoming voice waveform.
2. It exits the hero product environment as a mineral line.
3. In the patient-journey chapter, scroll progress carries it through Acquire, Respond, Qualify, Book, and Enroll.
4. Each stage changes one primary interface scene rather than displaying several equal cards.
5. At Book, mineral begins blending toward violet.
6. At Enroll or attributed outcome, the signal resolves fully into outcome violet.
7. The line reappears selectively in the architecture, proof, and final CTA sections so the visual language feels continuous.

The signal must encode progress. It must never become an ambient neon decoration.

## Page architecture

### 1. Navigation

- Preserve the compact three-part desktop structure and mobile menu.
- Make the header transition from transparent to a lightly frosted ivory surface after the hero begins leaving the viewport.
- Keep one primary booking action.

### 2. Hero — one operating environment

- Preserve the left-aligned headline and primary/secondary actions.
- Replace four equal product columns with a layered patient-conversion canvas.
- The incoming-call surface is the visual anchor.
- Conversation, qualification, booking, and outcome surfaces overlap downstream with clear depth and hierarchy.
- A single live signal connects the layers.
- On initial load, the signal enters first, then reveals the interface in sequence.
- As the hero leaves the viewport, the product canvas moves upward slightly and scales down no more than four percent.

### 3. Credibility transition

- Replace the existing equal three-column strip with a compact proof rail attached to the hero.
- Use three operational principles or verified proof placeholders.
- Keep the transition visually quiet so it does not compete with the journey.

### 4. Scroll-driven patient journey

Desktop and large tablet:

- Use a section approximately 450–550vh tall with one sticky viewport.
- Left side: all five stage labels and concise descriptions in document order.
- Right side: one large operating interface that changes state as the section progresses.
- The patient signal travels through an SVG route and activates each stage node.
- Crossfades overlap briefly; there is no blank state between stages.
- Stage labels remain clickable and keyboard operable. Selecting one scrolls to its section marker.

Mobile:

- Do not use a five-screen sticky trap.
- Render five vertically composed story cards connected by the same progress rail.
- Each visual is designed for the mobile width instead of shrinking the desktop interface.
- Stage activation is driven by each card entering the active viewport region.

### 5. Revenue leakage

- Replace the three editorial rows with one visual flow showing demand moving between disconnected stages.
- Use visible breaks, delays, and dropped signals to represent leakage.
- Animate only when the section enters view; do not loop continuously.

### 6. Regena architecture

- Replace three stacked layer cards with an exploded systems map.
- Show sources flowing into orchestration, then into conversion and visibility.
- Use one subtle tracing path to reveal connections.
- Keep supporting copy outside the diagram so the interface remains readable.

### 7. VisionMax proof climax

- Turn the existing two-card grid into one full-width case-story environment.
- The founder-video placeholder becomes the dominant media area.
- A before/after operational timeline and performance dashboard sit inside the same composition.
- Metric visuals animate once from baseline to outcome when the section enters view.
- Keep all numbers as clearly centralized placeholders until verified data is supplied.

### 8. Managed operating model

- Replace the generic three-card row with an editorial build–operate–improve timeline.
- Use typography, dividers, and one continuous signal instead of repeated icons.
- Make the human-operated layer visually apparent without introducing stock photography.

### 9. Fit and final booking

- Keep the dark closing chapter.
- Reduce the fit criteria to a compact diagnostic panel.
- Let the patient signal resolve into a confirmed consultation state beside the CTA.
- End with one visually dominant booking action.

## Motion system

### Orchestrated moments

1. Hero entrance and product-system assembly.
2. Scroll-driven patient journey.
3. VisionMax metric reveal.

All other motion remains secondary.

### Performance rules

- Animate transforms, opacity, clip paths, and SVG path progress.
- Do not animate large blur filters, box shadows, layout dimensions, or background position continuously.
- Use sticky positioning rather than JavaScript pinning.
- Update React state only when a stage threshold changes, not on every scroll frame.
- Avoid global scroll listeners when Motion values can remain off the React render path.

### Reduced motion

- Render the complete signal path statically.
- Display the first hero state without an assembly sequence.
- Replace crossfades and translations with immediate state changes.
- Preserve keyboard and pointer stage navigation.

## Visual-system refinements

- Reduce the number of bordered cards visible in any single viewport.
- Use low-radius interface panels but allow the large scene containers to feel nearly architectural.
- Replace repeated Lucide illustrations with custom SVG stage marks and product symbols where brand ownership matters.
- Keep violet restricted to booked, enrolled, or attributed outcomes.
- Increase composition contrast: alternate full-bleed scenes, editorial copy, diagrams, and proof rather than repeating split layouts.
- Preserve readable product text; do not create miniature dashboard detail solely for visual density.

## Technical component architecture

- `components/hero-system.tsx`: rebuild as the layered hero operating environment.
- `components/patient-journey.tsx`: replace manual tab-only interaction with the scroll-linked story and accessible stage controls.
- `components/patient-signal.tsx`: new reusable SVG path-progress primitive.
- `components/scroll-stage.tsx`: new small wrapper for mapping a scroll range to stage motion values.
- `components/home-sections.tsx`: recompose leakage, architecture, proof, operating model, and final booking sections.
- `components/site-header.tsx`: add restrained scrolled state.
- `components/reveal.tsx`: retain only for non-signature secondary reveals.
- `lib/home-content.ts`: preserve centralized replaceable content.
- `app/globals.css`: update tokens and compositions without introducing Tailwind.

Add `motion` as the only new runtime dependency.

## Accessibility requirements

- Maintain semantic heading order and landmark structure.
- Preserve visible focus states and minimum 44px controls.
- Keep stage descriptions in logical DOM order.
- Active stage controls expose their state semantically.
- Scroll is never the only way to change or understand a stage.
- No horizontal scrolling at any supported viewport.
- Reduced-motion behavior is tested, not assumed.

## Acceptance criteria

1. The hero reads as one connected operating environment rather than four equal cards.
2. Desktop scroll progress visibly advances the patient signal through five stages.
3. Each stage changes the primary operating interface and narrative state.
4. Keyboard and pointer users can activate every stage.
5. Mobile uses a vertical narrative rather than a shrunken sticky desktop scene.
6. The signal changes from mineral to violet only at meaningful outcome states.
7. Revenue leakage, system architecture, VisionMax proof, operating model, and final CTA each use a distinct composition.
8. Reduced-motion mode exposes all content without narrative travel.
9. The page passes automated component tests, lint, production build, and Playwright checks at 375px, 768px, 1024px, and 1440px.
10. Screenshots show one clear focal point in each major viewport chapter and no repeated generic card-grid rhythm.

## Explicit non-goals

- No final compliance or legal claims.
- No unverified production metrics.
- No theme switcher.
- No site-wide smooth-scroll library.
- No cursor replacement.
- No WebGL shader or particle field.
- No wholesale copy of a 21st.dev, Aceternity, or reference-site visual design.
