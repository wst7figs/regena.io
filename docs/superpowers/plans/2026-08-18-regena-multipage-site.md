# Regena Multi-Page Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the approved Regena homepage into a design-complete, responsive authority site with two solution pages, buyer-routing content, company proof, and a local four-step booking prototype.

**Architecture:** Keep the existing Next.js App Router homepage intact while introducing typed site content, a shared route-aware header/footer, reusable interior-page primitives, and focused interactive components for each route. Pages remain Server Components unless interaction requires a small Client Component; all motion has reduced-motion and mobile fallbacks.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Motion 13, Lucide React, global CSS, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-18-regena-multipage-site-design.md`

## Global Constraints

- Do not edit any file under `sources/`.
- The workspace is not a Git repository; do not run commit, branch, reset, checkout, or worktree commands.
- Preserve the approved Precision Noir palette, typography, homepage hero, rays, and interactive journey.
- Use `Solutions`, never `Products`, for the offer navigation group.
- Do not publish pricing, starting prices, package totals, fake logos, fake testimonials, fake team credentials, or unsupported outcome claims.
- Present the Patient Conversion System first while giving the Growth Partnership equal-sized navigation and comparison treatment.
- Lead with buyer outcomes; place technical architecture and integrations deeper on each page.
- Team data is limited to the confirmed names and roles in the spec.
- The booking prototype must not transmit or persist personal data.
- Use the existing dependencies; do not add a UI kit, CSS framework, animation package, form service, or calendar SDK.
- Maintain keyboard navigation, screen-reader semantics, reduced-motion alternatives, and no horizontal overflow at 375, 768, 1024, and 1440 pixels.
- Run a focused test after each task and the full verification suite at the end.

---

## File Map

### Shared data and helpers

- Create `lib/site-content.ts` — route paths, navigation, solutions, team, clinic-fit, approach, proof, and footer content.
- Create `lib/booking-flow.ts` — booking state types, validation, and solution recommendation logic.

### Shared components

- Modify `components/site-header.tsx` — route-aware navigation, accessible Solutions dropdown, mobile accordion.
- Create `components/site-footer.tsx` — multi-column site footer.
- Create `components/site-primitives.tsx` — interior hero, section intro, page CTA, signal divider, result note.
- Create `components/solution-router.tsx` — two-path solution routing interaction.
- Create `components/conversion-pipeline.tsx` — Patient Conversion System signature interaction.
- Create `components/growth-signal.tsx` — Growth Partnership signature interaction.
- Create `components/approach-blueprint.tsx` — Our Approach signature interaction.
- Create `components/clinic-diagnostic.tsx` — clinic self-routing interaction.
- Create `components/team-grid.tsx` — team profiles and ownership map.
- Create `components/booking-flow.tsx` — local four-step booking prototype.
- Create `components/legal-layout.tsx` — legal page shell.

### Pages

- Modify `app/page.tsx` — route-based links and both-solution introduction.
- Create `app/solutions/page.tsx`.
- Create `app/solutions/patient-conversion-system/page.tsx`.
- Create `app/solutions/growth-partnership/page.tsx`.
- Create `app/approach/page.tsx`.
- Create `app/clinics/page.tsx`.
- Create `app/outcomes/page.tsx`.
- Create `app/company/page.tsx`.
- Create `app/book/page.tsx`.
- Create `app/privacy/page.tsx`.
- Create `app/terms/page.tsx`.
- Modify `app/layout.tsx` — import the interior-page stylesheet and add metadata template.
- Create `app/site-pages.css` — shared interior-page, dropdown, form, and responsive styles.

### Tests

- Create `tests/site-content.test.ts`.
- Modify `tests/site-header.test.tsx`.
- Create `tests/booking-flow.test.ts`.
- Create `tests/booking-flow-component.test.tsx`.
- Create `tests/site-routes.test.tsx`.
- Modify `tests/homepage.test.tsx`.
- Modify `e2e/home.spec.ts`.
- Create `e2e/site.spec.ts`.

---

### Task 1: Typed Site Content and Route Contract

**Files:**
- Create: `lib/site-content.ts`
- Create: `tests/site-content.test.ts`

**Interfaces:**
- Produces: `siteNav`, `solutions`, `approachSteps`, `clinicCriteria`, `teamMembers`, `footerGroups`, `siteRoutes`.
- Produces types: `SiteRoute`, `Solution`, `TeamMember`, `ApproachStep`.
- Consumes: no new runtime dependencies.

- [ ] **Step 1: Write the failing content contract test**

```ts
import { describe, expect, it } from "vitest";
import { siteNav, siteRoutes, solutions, teamMembers } from "@/lib/site-content";

describe("site content", () => {
  it("defines every approved route and solution in the required order", () => {
    expect(siteRoutes).toEqual([
      "/", "/solutions", "/solutions/patient-conversion-system",
      "/solutions/growth-partnership", "/approach", "/clinics",
      "/outcomes", "/company", "/book", "/privacy", "/terms",
    ]);
    expect(solutions.map(({ slug }) => slug)).toEqual([
      "patient-conversion-system", "growth-partnership",
    ]);
    expect(siteNav.some(({ label }) => label === "Products")).toBe(false);
  });

  it("contains only the confirmed launch team", () => {
    expect(teamMembers.map(({ name, role }) => [name, role])).toEqual([
      ["Luan West", "CEO & Co-Founder"],
      ["Jean-Pierre", "COO & Co-Founder"],
      ["Julian Hollen", "AI Engineer & Software Developer"],
      ["Shoham Zahir", "CSO"],
    ]);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/site-content.test.ts`  
Expected: FAIL because `@/lib/site-content` does not exist.

- [ ] **Step 3: Implement the typed content source**

```ts
export type SiteRoute =
  | "/" | "/solutions" | "/solutions/patient-conversion-system"
  | "/solutions/growth-partnership" | "/approach" | "/clinics"
  | "/outcomes" | "/company" | "/book" | "/privacy" | "/terms";

export type Solution = {
  slug: "patient-conversion-system" | "growth-partnership";
  name: string;
  eyebrow: string;
  shortDescription: string;
  routingCue: string;
  href: SiteRoute;
};

export const solutions = [
  {
    slug: "patient-conversion-system",
    name: "Patient Conversion System",
    eyebrow: "Existing demand",
    shortDescription: "Convert existing inquiries into attended consultations.",
    routingCue: "For clinics already generating patient demand.",
    href: "/solutions/patient-conversion-system",
  },
  {
    slug: "growth-partnership",
    name: "Regena Growth Partnership",
    eyebrow: "Demand and conversion",
    shortDescription: "Build and operate the complete patient-growth engine.",
    routingCue: "For established clinics that need more demand and better conversion.",
    href: "/solutions/growth-partnership",
  },
] as const satisfies readonly Solution[];
```

Add the exact route, navigation, approach, clinic, team, and footer values from the spec. Do not include prices or unconfirmed biographies.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/site-content.test.ts`  
Expected: 2 tests PASS.

- [ ] **Step 5: Review checkpoint**

Confirm `rg -n "Products|\$|starting at" lib/site-content.ts` returns no offer-label or pricing matches.

---

### Task 2: Booking Logic Contract

**Files:**
- Create: `lib/booking-flow.ts`
- Create: `tests/booking-flow.test.ts`

**Interfaces:**
- Produces: `BookingDraft`, `BookingStep`, `validateBookingStep(step, draft)`, and `recommendSolution(draft)`.
- `recommendSolution` returns `"patient-conversion-system" | "growth-partnership" | "diagnostic"`.
- Consumes: no browser APIs, storage, network, or React.

- [ ] **Step 1: Write failing validation and routing tests**

```ts
import { describe, expect, it } from "vitest";
import {
  type BookingDraft,
  recommendSolution,
  validateBookingStep,
} from "@/lib/booking-flow";

const base: BookingDraft = {
  name: "Luan West", email: "luan@example.com", phone: "7805550100",
  clinicName: "Example Clinic", role: "Owner", clinicType: "Longevity",
  locations: "1", inquiryVolume: "50-99", paidMarketing: "yes",
  bottleneck: "conversion", software: "", date: "2026-08-25", time: "10:30",
};

describe("booking flow", () => {
  it("validates persistent labels required for the first two steps", () => {
    expect(validateBookingStep(1, { ...base, email: "bad" })).toContain("email");
    expect(validateBookingStep(2, { ...base, inquiryVolume: "" })).toContain("inquiryVolume");
  });

  it("routes by the clinic's stated bottleneck", () => {
    expect(recommendSolution(base)).toBe("patient-conversion-system");
    expect(recommendSolution({ ...base, bottleneck: "demand-and-conversion" }))
      .toBe("growth-partnership");
    expect(recommendSolution({ ...base, bottleneck: "unknown" })).toBe("diagnostic");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/booking-flow.test.ts`  
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement pure validation and routing**

```ts
export type BookingStep = 1 | 2 | 3 | 4;
export type BookingDraft = {
  name: string; email: string; phone: string; clinicName: string; role: string;
  clinicType: string; locations: string; inquiryVolume: string;
  paidMarketing: "yes" | "no" | "";
  bottleneck: "conversion" | "demand-and-conversion" | "unknown" | "";
  software: string; date: string; time: string;
};

export function recommendSolution(draft: BookingDraft) {
  if (draft.bottleneck === "conversion") return "patient-conversion-system" as const;
  if (draft.bottleneck === "demand-and-conversion") return "growth-partnership" as const;
  return "diagnostic" as const;
}
```

Implement field-level validation for steps 1–4. Email must contain a valid local part and domain; phone requires at least seven digits; no validation reads or writes storage.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/booking-flow.test.ts`  
Expected: all tests PASS.

---

### Task 3: Route-Aware Header and Enterprise Footer

**Files:**
- Modify: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Modify: `tests/site-header.test.tsx`
- Modify: `components/home-sections.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `siteNav`, `solutions`, and `footerGroups` from `lib/site-content.ts`.
- Produces: `<SiteHeader />` and `<SiteFooter />` shared by every route.

- [ ] **Step 1: Replace the header test with route and dropdown behavior**

```tsx
it("opens the Solutions menu and exposes both solutions", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  const trigger = screen.getByRole("button", { name: /solutions/i });
  await user.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: /patient conversion system/i }))
    .toHaveAttribute("href", "/solutions/patient-conversion-system");
  expect(screen.getByRole("link", { name: /regena growth partnership/i }))
    .toHaveAttribute("href", "/solutions/growth-partnership");
  await user.keyboard("{Escape}");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});
```

Keep the existing mobile-menu test but change its booking expectation from `#book` to `/book`. Mock `next/navigation` so `usePathname()` returns `/`.

- [ ] **Step 2: Run the header test and verify RED**

Run: `npm test -- tests/site-header.test.tsx`  
Expected: FAIL because the current header has no Solutions button and still links to `#book`.

- [ ] **Step 3: Implement the accessible desktop dropdown and mobile accordion**

Use separate state for the mobile navigation and Solutions disclosure. Required behavior:

```tsx
<button
  type="button"
  aria-expanded={solutionsOpen}
  aria-controls="solutions-navigation"
  onClick={() => setSolutionsOpen((open) => !open)}
>
  Solutions <ChevronDown aria-hidden="true" size={14} />
</button>
```

Render both solution links and Compare Solutions. Close on Escape, click outside, route selection, and mobile-menu close. Apply `aria-current="page"` when `usePathname()` equals a route. Ensure the booking CTA always points to `/book`.

- [ ] **Step 4: Extract the footer**

Move footer markup out of `components/home-sections.tsx` into `components/site-footer.tsx`. Use grouped links from `footerGroups`; retain the Regena descriptor and Edmonton/North America line. Update `app/page.tsx` to import the new footer.

- [ ] **Step 5: Run focused and homepage tests**

Run: `npm test -- tests/site-header.test.tsx tests/homepage.test.tsx`  
Expected: PASS after updating homepage booking-link expectations to `/book`.

---

### Task 4: Interior Page Primitives and Styling Foundation

**Files:**
- Create: `components/site-primitives.tsx`
- Create: `app/site-pages.css`
- Modify: `app/layout.tsx`
- Create: `tests/site-primitives.test.tsx`

**Interfaces:**
- Produces: `InteriorHero`, `SectionIntro`, `PageCta`, `SignalDivider`, `ResultNote`, and `InteriorPageShell`.
- Consumes: existing CSS variables, `.shell`, `.eyebrow`, `.button`, `Reveal`, and Lucide icons.

- [ ] **Step 1: Write the primitive semantics test**

```tsx
it("renders a single labelled page hero and routed CTA", () => {
  render(
    <InteriorHero
      eyebrow="Solutions"
      title="Choose the system your clinic needs next."
      description="Two starting points. One connected operating model."
      cta={{ label: "Book a strategy call", href: "/book" }}
    />,
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/choose the system/i);
  expect(screen.getByRole("link", { name: /book a strategy call/i }))
    .toHaveAttribute("href", "/book");
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/site-primitives.test.tsx`  
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the primitives**

Keep primitives presentational. `InteriorHero` accepts `variant: "interface" | "editorial" | "conversion"`, optional visual children, and one primary CTA. `PageCta` always defaults to `/book` but accepts an explicit href for legal pages.

- [ ] **Step 4: Create the interior stylesheet**

Import `./site-pages.css` after `./globals.css` in `app/layout.tsx`. Define:

- `.interior-page`, `.interior-hero`, and three hero variants.
- `.interior-section`, `.interior-section-dark`, `.section-intro-grid`.
- `.signal-divider`, `.page-cta`, `.result-note`.
- shared card, comparison, team, legal, and booking tokens.
- media queries at 1180, 900, 720, and 480 pixels.
- a `prefers-reduced-motion: reduce` block removing non-essential animation.

Use only existing CSS custom properties or new semantic variables declared at the top of `site-pages.css`.

- [ ] **Step 5: Run focused tests and lint**

Run: `npm test -- tests/site-primitives.test.tsx && npm run lint`  
Expected: PASS and zero lint errors.

---

### Task 5: Solutions Hub and Routing Interaction

**Files:**
- Create: `components/solution-router.tsx`
- Create: `app/solutions/page.tsx`
- Create: `tests/solution-router.test.tsx`
- Modify: `app/site-pages.css`

**Interfaces:**
- Consumes: `solutions` from `lib/site-content.ts` and shared primitives.
- Produces: `/solutions` and `<SolutionRouter />`.

- [ ] **Step 1: Write the solution-routing test**

```tsx
it("routes existing demand to conversion and broader demand to partnership", async () => {
  const user = userEvent.setup();
  render(<SolutionRouter />);
  await user.click(screen.getByRole("button", { name: /already generating demand/i }));
  expect(screen.getByTestId("solution-recommendation")).toHaveTextContent(/patient conversion/i);
  await user.click(screen.getByRole("button", { name: /need more demand/i }));
  expect(screen.getByTestId("solution-recommendation")).toHaveTextContent(/growth partnership/i);
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/solution-router.test.tsx`  
Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the two-path interaction**

Use button-controlled local state with `aria-pressed`. Render a branching patient signal, two equal-size solution panels, recommendation copy, and links to each solution. Default to Patient Conversion System while leaving both links visible without interaction.

- [ ] **Step 4: Build `/solutions`**

Include the exact sections from spec §5.2: hero, routing split, two solution panels, side-by-side comparison, shared infrastructure, fit guidance, and CTA. The comparison uses semantic headings and definition lists, not a visually dense table on mobile.

Export page metadata:

```ts
export const metadata: Metadata = {
  title: "Solutions",
  description: "Choose the Regena patient-growth system that fits your clinic's current bottleneck.",
};
```

- [ ] **Step 5: Run focused tests**

Run: `npm test -- tests/solution-router.test.tsx tests/site-content.test.ts`  
Expected: PASS.

---

### Task 6: Patient Conversion System Page

**Files:**
- Create: `components/conversion-pipeline.tsx`
- Create: `app/solutions/patient-conversion-system/page.tsx`
- Create: `tests/conversion-pipeline.test.tsx`
- Modify: `app/site-pages.css`

**Interfaces:**
- Produces: `<ConversionPipeline />` and `/solutions/patient-conversion-system`.
- Consumes: `journeyStages`, `ProofStory`, shared primitives, and `/book` route.

- [ ] **Step 1: Write the pipeline behavior test**

```tsx
it("repairs all conversion handoffs and preserves a text equivalent", async () => {
  const user = userEvent.setup();
  render(<ConversionPipeline />);
  expect(screen.getAllByRole("button")).toHaveLength(5);
  await user.click(screen.getByRole("button", { name: /scheduling/i }));
  expect(screen.getByRole("region", { name: /active conversion stage/i }))
    .toHaveTextContent(/confirmed consultation/i);
  expect(screen.getByText(/voice, chat, qualification, scheduling, and follow-up/i))
    .toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/conversion-pipeline.test.tsx`  
Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the signature interaction**

Build five keyboard-operable stage buttons: Capture, Respond, Qualify, Book, Attend. Each updates one shared operating-view panel. Use CSS signal progress and existing interface vocabulary. Respect reduced motion by showing all five stage summaries in a vertical sequence.

- [ ] **Step 4: Build the solution page**

Implement all sections from spec §5.3. Use the current `ProofStory` component for VisionMax, but add a nearby `ResultNote` explaining that observed client results are not guarantees. Add a direct expansion link to `/solutions/growth-partnership`.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- tests/conversion-pipeline.test.tsx tests/homepage.test.tsx`  
Expected: PASS and no homepage proof regression.

---

### Task 7: Growth Partnership Page

**Files:**
- Create: `components/growth-signal.tsx`
- Create: `app/solutions/growth-partnership/page.tsx`
- Create: `tests/growth-signal.test.tsx`
- Modify: `app/site-pages.css`

**Interfaces:**
- Produces: `<GrowthSignal />` and `/solutions/growth-partnership`.
- Consumes: shared primitives, solution data, and `/book` route.

- [ ] **Step 1: Write the growth signal test**

```tsx
it("connects acquisition to conversion without presenting channel guarantees", () => {
  render(<GrowthSignal />);
  expect(screen.getByText(/acquisition channels/i)).toBeVisible();
  expect(screen.getByText(/patient conversion system/i)).toBeVisible();
  expect(screen.getByText(/revenue visibility/i)).toBeVisible();
  expect(screen.queryByText(/guaranteed/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/growth-signal.test.tsx`  
Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the growth signal**

Render two acquisition inputs flowing into the conversion system and then into booked-consultation and attribution outputs. Keep the channels generic in draft copy: paid acquisition and organic/local demand. Do not invent platform outcomes.

- [ ] **Step 4: Build the Growth Partnership page**

Implement spec §5.4: executive hero, demand architecture, conversion layer, ninety-day roadmap, ownership split, reporting/optimization, fit indicators, ad-spend separation, and CTA. Use buyer-first headings and reserve implementation terminology for deeper sections.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- tests/growth-signal.test.tsx tests/site-content.test.ts`  
Expected: PASS.

---

### Task 8: Our Approach and For Clinics Pages

**Files:**
- Create: `components/approach-blueprint.tsx`
- Create: `components/clinic-diagnostic.tsx`
- Create: `app/approach/page.tsx`
- Create: `app/clinics/page.tsx`
- Create: `tests/approach-and-clinics.test.tsx`
- Modify: `app/site-pages.css`

**Interfaces:**
- Produces: `<ApproachBlueprint />`, `<ClinicDiagnostic />`, `/approach`, and `/clinics`.
- Consumes: `approachSteps`, `clinicCriteria`, `solutions`, and shared primitives.

- [ ] **Step 1: Write the page interaction tests**

```tsx
it("presents all six operating stages", () => {
  render(<ApproachBlueprint />);
  expect(screen.getAllByRole("button")).toHaveLength(6);
  expect(screen.getByRole("button", { name: /audit/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /improve/i })).toBeVisible();
});

it("routes clinic conditions without claiming universal qualification", async () => {
  const user = userEvent.setup();
  render(<ClinicDiagnostic />);
  await user.click(screen.getByRole("button", { name: /existing demand/i }));
  expect(screen.getByTestId("clinic-route")).toHaveTextContent(/patient conversion/i);
  expect(screen.getByText(/fit guidance/i)).toBeVisible();
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/approach-and-clinics.test.tsx`  
Expected: FAIL because both components are missing.

- [ ] **Step 3: Implement both interactions**

`ApproachBlueprint` uses six buttons and one shared detail panel; reduced motion renders all stages. `ClinicDiagnostic` uses three plain-language clinic situations and routes to conversion, partnership, or diagnostic call without public scoring or rejection.

- [ ] **Step 4: Build both pages**

Implement spec §§5.5–5.6 exactly. Ensure clinic qualification ranges are described as Regena's fit guidance, not industry benchmarks. Include poor-fit conditions and one CTA to `/book` on each page.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- tests/approach-and-clinics.test.tsx tests/site-content.test.ts`  
Expected: PASS.

---

### Task 9: Outcomes and Company Pages

**Files:**
- Create: `components/team-grid.tsx`
- Create: `app/outcomes/page.tsx`
- Create: `app/company/page.tsx`
- Create: `tests/outcomes-and-company.test.tsx`
- Modify: `components/proof-story.tsx`
- Modify: `app/site-pages.css`

**Interfaces:**
- Produces: `<TeamGrid />`, `/outcomes`, and `/company`.
- Consumes: `teamMembers`, `ProofStory`, shared primitives, and `/book`.

- [ ] **Step 1: Write proof and team integrity tests**

```tsx
it("shows only verified draft proof and an explicit methodology note", () => {
  render(<OutcomesPage />);
  expect(screen.getByText(/40%/i)).toBeVisible();
  expect(screen.getByText(/observed results are not guarantees/i)).toBeVisible();
  expect(document.querySelectorAll("[data-client-story]")).toHaveLength(1);
});

it("renders the confirmed team without generated portrait images", () => {
  render(<TeamGrid />);
  expect(screen.getAllByTestId("team-member")).toHaveLength(4);
  expect(screen.getByText("Julian Hollen")).toBeVisible();
  expect(screen.getByText("AI Engineer & Software Developer")).toBeVisible();
  expect(document.querySelectorAll("img[data-generated-face]")).toHaveLength(0);
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/outcomes-and-company.test.tsx`  
Expected: FAIL because the page and TeamGrid do not exist.

- [ ] **Step 3: Implement `TeamGrid`**

Render four equal profile cards with initials-based art-directed placeholders and confirmed roles. Add an ownership map for commercial, operations, engineering, and strategy. Do not write achievement biographies; use concise responsibility copy derived only from the role labels.

- [ ] **Step 4: Build Outcomes and Company**

Implement spec §§5.7–5.8. Outcomes uses exactly one client-story module. Change the VisionMax media label to "Founder testimonial · In production" and add the methodology note. Company uses the editorial hero, founder story, full team, ownership map, principles, and CTA.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- tests/outcomes-and-company.test.tsx tests/homepage.test.tsx`  
Expected: PASS.

---

### Task 10: Four-Step Booking Prototype

**Files:**
- Create: `components/booking-flow.tsx`
- Create: `app/book/page.tsx`
- Create: `tests/booking-flow-component.test.tsx`
- Modify: `app/site-pages.css`

**Interfaces:**
- Consumes: `BookingDraft`, `validateBookingStep`, and `recommendSolution` from `lib/booking-flow.ts`.
- Produces: `<BookingFlow />` and `/book`.
- Does not produce network requests or persisted records.

- [ ] **Step 1: Write the component flow test**

```tsx
it("completes four local steps and recommends a solution without submitting data", async () => {
  const user = userEvent.setup();
  const fetchSpy = vi.spyOn(globalThis, "fetch");
  render(<BookingFlow />);
  await user.type(screen.getByLabelText(/full name/i), "Luan West");
  await user.type(screen.getByLabelText(/work email/i), "luan@example.com");
  await user.type(screen.getByLabelText(/phone/i), "7805550100");
  await user.type(screen.getByLabelText(/clinic name/i), "Example Clinic");
  await user.type(screen.getByLabelText(/role/i), "Owner");
  await user.click(screen.getByRole("button", { name: /continue/i }));
  expect(screen.getByText(/step 2 of 4/i)).toBeVisible();
  expect(fetchSpy).not.toHaveBeenCalled();
});
```

Add tests for inline errors, Back navigation, date selection, time selection, recommendation copy, and a final prototype confirmation with no `fetch`, `localStorage`, or `sessionStorage` access.

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/booking-flow-component.test.tsx`  
Expected: FAIL because `BookingFlow` does not exist.

- [ ] **Step 3: Implement the local state machine**

Use `useState<BookingStep>(1)` and `useState<BookingDraft>(emptyDraft)`. Persist nothing. Each Continue action validates the current step and focuses the first invalid field. Use a labelled progress indicator with four segments and `aria-live="polite"` for step and recommendation changes.

- [ ] **Step 4: Implement date and time prototype data**

Use a fixed design-preview availability set exported inside the component:

```ts
const previewDates = ["2026-08-25", "2026-08-26", "2026-08-27", "2026-08-28"];
const previewTimes = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM"];
```

Label the final state "Booking experience preview" and state that live scheduling will be connected before launch. Do not imply an appointment was created.

- [ ] **Step 5: Build `/book`**

Use the focused two-column conversion layout from spec §5.9. Keep only the Regena wordmark and a "Back to site" link in the page header. Add call expectations and proof on the left; render `BookingFlow` on the right.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- tests/booking-flow.test.ts tests/booking-flow-component.test.tsx`  
Expected: PASS with no network calls.

---

### Task 11: Legal Pages, Metadata, and Route Rendering

**Files:**
- Create: `components/legal-layout.tsx`
- Create: `app/privacy/page.tsx`
- Create: `app/terms/page.tsx`
- Modify: `app/layout.tsx`
- Create: `tests/site-routes.test.tsx`

**Interfaces:**
- Produces: `<LegalLayout />`, `/privacy`, `/terms`, and metadata template.
- Consumes: shared header/footer and primitives.

- [ ] **Step 1: Write route-render tests**

```tsx
import SolutionsPage from "@/app/solutions/page";
import ConversionPage from "@/app/solutions/patient-conversion-system/page";
import GrowthPage from "@/app/solutions/growth-partnership/page";
import ApproachPage from "@/app/approach/page";
import ClinicsPage from "@/app/clinics/page";
import OutcomesPage from "@/app/outcomes/page";
import CompanyPage from "@/app/company/page";
import BookPage from "@/app/book/page";
import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";

const routes = [
  ["Solutions", SolutionsPage], ["Patient Conversion System", ConversionPage],
  ["Regena Growth Partnership", GrowthPage], ["Our Approach", ApproachPage],
  ["For Clinics", ClinicsPage], ["Outcomes", OutcomesPage],
  ["Company", CompanyPage], ["Book", BookPage],
  ["Privacy", PrivacyPage], ["Terms", TermsPage],
] as const;

it.each(routes)("renders %s with one h1", (_, Page) => {
  const { container } = render(<Page />);
  expect(container.querySelectorAll("h1")).toHaveLength(1);
});
```

Also assert that all commercial pages contain a `/book` link, legal pages contain a visible draft/legal-review notice, and no page contains public pricing strings.

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/site-routes.test.tsx`  
Expected: FAIL until all route modules and LegalLayout exist.

- [ ] **Step 3: Implement legal shells**

Create readable sections for scope, information handling, cookies/analytics, third-party services, acceptable use, intellectual property, limitations, and contact. Prefix each page with "Draft for legal review" and do not describe unconnected services as active.

- [ ] **Step 4: Add metadata template**

In `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: { default: "Regena | Patient-growth infrastructure", template: "%s | Regena" },
  description: "A managed growth system for regenerative and longevity clinics.",
  metadataBase: new URL("https://regena.io"),
};
```

Give every route a unique title and description. Do not add review schema or unverified organization data.
Use title fragments such as `"Solutions"` and `"Company"`; the root template appends `| Regena`.

- [ ] **Step 5: Run route tests and build**

Run: `npm test -- tests/site-routes.test.tsx && npm run build`  
Expected: PASS and all routes listed as static or client-rendered pages without TypeScript errors.

---

### Task 12: Homepage Route Integration

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/home-sections.tsx`
- Modify: `tests/homepage.test.tsx`
- Modify: `e2e/home.spec.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: shared header/footer and solution data.
- Produces: homepage links that enter the new route architecture.

- [ ] **Step 1: Write failing homepage integration assertions**

```tsx
expect(screen.getAllByRole("link", { name: /book a strategy call/i })
  .every((link) => link.getAttribute("href") === "/book")).toBe(true);
expect(screen.getByRole("link", { name: /patient conversion system/i }))
  .toHaveAttribute("href", "/solutions/patient-conversion-system");
expect(screen.getByRole("link", { name: /growth partnership/i }))
  .toHaveAttribute("href", "/solutions/growth-partnership");
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/homepage.test.tsx`  
Expected: FAIL because existing CTAs use `#book` and the homepage lacks routed solution links.

- [ ] **Step 3: Integrate routes without redesigning the homepage**

Change booking CTAs to `/book`. Keep "See how the system works" pointing to `#system`. Add a restrained two-solution handoff near the operating-model section using the shared solution data. Remove the old homepage-only booking section if it duplicates `/book`; preserve a final dark CTA that links to `/book`.

- [ ] **Step 4: Update browser expectations**

Change the homepage E2E booking test to expect `/book` and the Book page h1. Keep all journey, rays, readability, proof-order, and overflow tests unchanged.

- [ ] **Step 5: Run homepage regression suite**

Run: `npm test -- tests/homepage.test.tsx tests/site-header.test.tsx && npx playwright test e2e/home.spec.ts`  
Expected: PASS with the existing hero and journey behavior preserved.

---

### Task 13: Whole-Site Browser Coverage

**Files:**
- Create: `e2e/site.spec.ts`

**Interfaces:**
- Consumes: all approved routes and user-visible navigation.
- Produces: route, responsiveness, keyboard, reduced-motion, and console-error coverage.

- [ ] **Step 1: Add route and overflow tests**

```ts
const routes = [
  "/", "/solutions", "/solutions/patient-conversion-system",
  "/solutions/growth-partnership", "/approach", "/clinics",
  "/outcomes", "/company", "/book", "/privacy", "/terms",
];

for (const route of routes) {
  test(`${route} renders without overflow or browser errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 375, height: 844 });
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    expect(errors).toEqual([]);
  });
}
```

- [ ] **Step 2: Add navigation and keyboard tests**

Test desktop Solutions open/close, Escape behavior, focus return, mobile accordion, current-page state, and each offer link. Test booking Back/Continue, validation focus, local completion, and zero network requests.

- [ ] **Step 3: Add reduced-motion tests**

For `/solutions`, both solution pages, `/approach`, `/clinics`, and `/outcomes`, emulate reduced motion and assert the complete static text alternative is visible with no oversized scroll container.

- [ ] **Step 4: Run the new browser suite**

Run: `npx playwright test e2e/site.spec.ts`  
Expected: all new site tests PASS.

---

### Task 14: Visual QA and Final Verification

**Files:**
- Modify only files with observed visual or functional defects.
- Generate review images under `.qa/site/`; these are verification artifacts, not product assets.

**Interfaces:**
- Consumes: completed site.
- Produces: verified desktop, tablet, and mobile site with no known blocking defects.

- [ ] **Step 1: Run the full automated verification suite**

Run: `npm test && npm run lint && npm run build && npm run test:e2e`  
Expected: zero failed unit tests, zero lint errors, successful production build, and zero failed Playwright tests.

- [ ] **Step 2: Capture full-page screenshots**

Capture every commercial page at 1440×1000, 768×1024, and 390×844. Capture Privacy and Terms at 1440 and 390. Store under `.qa/site/<route>-<viewport>.png`.

- [ ] **Step 3: Review each screenshot against the spec**

Verify:

- Precision Noir identity is consistent.
- No page repeats the homepage composition.
- Every page has one clear signature interaction.
- Patient Conversion appears first without visually diminishing Growth Partnership.
- Team placeholders are intentional and consistent.
- Booking fields, calendar, and time controls remain usable on mobile.
- Legal draft notices are visible.
- No fabricated logos, results, or credentials appear.

- [ ] **Step 4: Perform the whole-site integration pass**

Navigate every header, footer, inline, comparison, proof, and CTA link. Verify `/book` from every commercial route, back navigation from Book, current-page states, mobile menu closure, and homepage anchor behavior.

- [ ] **Step 5: Re-run verification after visual fixes**

Run: `npm test && npm run lint && npm run build && npm run test:e2e`  
Expected: the final tree remains fully green after all visual adjustments.

- [ ] **Step 6: Report launch dependencies honestly**

The handoff must state that real form transport, calendar, CRM, analytics, headshots, verified VisionMax media/calculation, and counsel-approved legal copy remain outside this design-complete build. Do not describe the local booking prototype as a live booking system.
