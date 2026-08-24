# Regena Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive Regena homepage whose primary action is booking a strategy meeting.

**Architecture:** Use the Next.js App Router with server-rendered marketing sections and small client components for the mobile menu, viewport reveals, and patient-journey activation. Keep all visual decisions in shared CSS tokens and all replaceable proof content in a typed content module.

**Tech Stack:** Next.js 16.3.1, React 19.2.8, TypeScript, CSS, Lucide React 1.32.0, Vitest 4.1.11, Testing Library, Playwright 1.62.1.

**Spec:** `docs/superpowers/specs/2026-08-18-regena-homepage-design.md`

## Global Constraints

- Implement the palette, typography, spacing, motion, and responsive rules from `DESIGN.md`.
- Every booking CTA must resolve to `#book`.
- No theme switcher, client logo wall, external stock imagery, or unverified production claims.
- The signature patient journey must remain usable without motion and without pointer input.
- `sources/` is read-only and must not be modified.

## File map

- `app/layout.tsx`: metadata, fonts, and global shell.
- `app/page.tsx`: homepage section composition only.
- `app/globals.css`: tokens, reset, component styling, responsive rules, and reduced-motion rules.
- `components/site-header.tsx`: responsive navigation.
- `components/hero-system.tsx`: four-stage hero product demonstration.
- `components/patient-journey.tsx`: accessible five-stage interactive journey.
- `components/home-sections.tsx`: proof, problem, infrastructure, operating model, booking, and footer sections.
- `components/reveal.tsx`: one-shot viewport reveal primitive.
- `lib/home-content.ts`: typed placeholder content and navigation data.
- `tests/*.test.tsx`: component and behavior tests.
- `e2e/home.spec.ts`: viewport and anchor smoke tests.

---

### Task 1: Project foundation and content contract

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `lib/home-content.ts`
- Test: `tests/home-content.test.ts`

**Interfaces:**
- Produces: `navItems`, `journeyStages`, `proofMetrics`, and `fitCriteria` typed readonly collections.

- [ ] **Step 1: Create the test runner configuration and failing content-contract test**

```ts
import { describe, expect, it } from "vitest";
import { journeyStages, navItems } from "@/lib/home-content";

describe("homepage content contract", () => {
  it("defines the five ordered journey stages", () => {
    expect(journeyStages.map((stage) => stage.label)).toEqual([
      "Acquire",
      "Respond",
      "Qualify",
      "Book",
      "Enroll",
    ]);
  });

  it("keeps every primary navigation item on the homepage", () => {
    expect(navItems.every((item) => item.href.startsWith("#"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/home-content.test.ts`

Expected: FAIL because `@/lib/home-content` does not exist.

- [ ] **Step 3: Add the typed data module and minimum configuration**

```ts
export type JourneyStage = {
  id: string;
  label: string;
  title: string;
  description: string;
};

export const journeyStages = [
  { id: "acquire", label: "Acquire", title: "Capture demand", description: "Bring every source into one visible journey." },
  { id: "respond", label: "Respond", title: "Answer immediately", description: "Keep intent warm with a fast, useful response." },
  { id: "qualify", label: "Qualify", title: "Route intelligently", description: "Match the right patient to the right next step." },
  { id: "book", label: "Book", title: "Remove scheduling friction", description: "Turn qualified interest into a confirmed consultation." },
  { id: "enroll", label: "Enroll", title: "Connect care to revenue", description: "Carry context through consultation and follow-through." },
] as const satisfies readonly JourneyStage[];
```

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm test -- tests/home-content.test.ts`

Expected: PASS.

### Task 2: Semantic page shell and responsive navigation

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `components/site-header.tsx`
- Create: `app/globals.css`
- Test: `tests/site-header.test.tsx`

**Interfaces:**
- Consumes: `navItems` from `lib/home-content.ts`.
- Produces: `SiteHeader` and page landmarks with `main` and `#book` targets.

- [ ] **Step 1: Write a failing navigation behavior test**

```tsx
it("opens, closes, and exposes the booking destination", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  const menu = screen.getByRole("button", { name: /open navigation/i });
  await user.click(menu);
  expect(screen.getByRole("navigation", { name: /mobile/i })).toBeVisible();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("navigation", { name: /mobile/i })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /book a strategy call/i })).toHaveAttribute("href", "#book");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/site-header.test.tsx`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 3: Implement the semantic shell and menu behavior**

Use a native button with `aria-expanded`, render the mobile panel conditionally, close on Escape, and retain a skip link before the header.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm test -- tests/site-header.test.tsx`

Expected: PASS.

### Task 3: Hero system and patient journey

**Files:**
- Create: `components/hero-system.tsx`
- Create: `components/patient-journey.tsx`
- Create: `components/reveal.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/patient-journey.test.tsx`

**Interfaces:**
- Consumes: `journeyStages` from `lib/home-content.ts`.
- Produces: keyboard-operable stage tabs using the `tablist` pattern and active stage panels.

- [ ] **Step 1: Write the failing journey interaction test**

```tsx
it("moves between journey stages with arrow keys", async () => {
  const user = userEvent.setup();
  render(<PatientJourney />);
  const acquire = screen.getByRole("tab", { name: /acquire/i });
  acquire.focus();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: /respond/i })).toHaveAttribute("aria-selected", "true");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/patient-journey.test.tsx`

Expected: FAIL because `PatientJourney` does not exist.

- [ ] **Step 3: Implement the four-stage hero and five-stage journey**

Use a server-rendered hero interface. Use a small client component for stage state, roving tab focus, and Intersection Observer activation. The SVG signal line must be decorative while each stage remains textually complete.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm test -- tests/patient-journey.test.tsx`

Expected: PASS.

### Task 4: Editorial sections, proof architecture, and booking destination

**Files:**
- Create: `components/home-sections.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/homepage.test.tsx`

**Interfaces:**
- Consumes: `proofMetrics` and `fitCriteria` from `lib/home-content.ts`.
- Produces: the remaining homepage sections and the unique `id="book"` destination.

- [ ] **Step 1: Write a failing homepage architecture test**

```tsx
it("renders the complete homepage architecture with one booking target", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/patient demand/i);
  expect(document.querySelectorAll("#book")).toHaveLength(1);
  expect(screen.getByRole("heading", { name: /built like infrastructure/i })).toBeVisible();
  expect(screen.getByRole("contentinfo")).toBeVisible();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/homepage.test.tsx`

Expected: FAIL because the sections are incomplete.

- [ ] **Step 3: Implement the remaining sections**

Add the credibility transition, revenue-leakage editorial section, infrastructure layers, VisionMax placeholder story and dashboard, operating model, qualification block, booking section, and footer. Use the exact structural order from `DESIGN.md`.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm test -- tests/homepage.test.tsx`

Expected: PASS.

### Task 5: Responsive and motion verification

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/home.spec.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the complete homepage.
- Produces: browser-level proof that the page has no horizontal overflow and that booking navigation works.

- [ ] **Step 1: Write the failing responsive smoke test**

```ts
for (const width of [375, 768, 1024, 1440]) {
  test(`homepage fits ${width}px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
}
```

- [ ] **Step 2: Run the smoke test and verify RED where layout is incomplete**

Run: `npm run test:e2e`

Expected: at least one viewport fails before the responsive pass.

- [ ] **Step 3: Complete responsive, focus, and reduced-motion CSS**

Ensure mobile compositions are vertical rather than scaled desktop layouts. Add `prefers-reduced-motion: reduce`, focus-visible rings, 44px controls, and overflow guards.

- [ ] **Step 4: Run full verification**

Run: `npm test && npm run lint && npm run build && npm run test:e2e`

Expected: all commands pass without warnings or errors.

### Task 6: Visual polish and final review

**Files:**
- Modify: only files implicated by screenshot review.

**Interfaces:**
- Consumes: screenshots at 375px and 1440px.
- Produces: a visually polished, shareable homepage preview.

- [ ] **Step 1: Capture desktop and mobile screenshots**

Run the development server and capture the full page at 1440x1000 and 375x812.

- [ ] **Step 2: Audit against `DESIGN.md` and Open Design polish rules**

Check hierarchy, whitespace, accent budget, typography, repeated card patterns, motion purpose, clipping, and focus visibility.

- [ ] **Step 3: Apply only high-impact polish corrections**

Restrict changes to spacing, typography, contrast, overflow, and motion defects found in the screenshot audit.

- [ ] **Step 4: Re-run the complete verification suite**

Run: `npm test && npm run lint && npm run build && npm run test:e2e`

Expected: all commands pass and the final screenshots match the approved direction.

