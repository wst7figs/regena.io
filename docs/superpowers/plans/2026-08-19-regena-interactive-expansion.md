# Regena Interactive Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved Regena multi-page authority site into a functional, scroll-led product story with a clinic diagnostic, Company/Careers experiences, and a real CMS-backed Blog.

**Architecture:** Keep page content server-rendered in the Next.js App Router and isolate motion, menus, and forms in focused client components. Put recommendation math and validation in pure libraries, use route handlers for email/upload boundaries, and make external integrations fail clearly without erasing visitor state.

**Tech Stack:** Next.js 16.3, React 19, TypeScript, Motion 13, Vitest, Testing Library, Playwright, Sanity, Resend, private Vercel Blob.

**Spec:** `docs/superpowers/specs/2026-08-19-regena-interactive-expansion-design.md`

## Global Constraints

- Preserve Precision Noir: graphite, warm ivory, mineral green, cool silver, restrained violet, editorial typography, architectural whitespace.
- Patient-signal motion must explain a handoff or state change; no decorative WebGL or particle field.
- No public pricing, medical/revenue guarantees, fabricated proof, compensation, or client claims.
- Scroll-led sections require click, keyboard, mobile-linear, and reduced-motion alternatives.
- Advertising funnels remain external at `funnels.regena.io`.
- No patient health information is collected.
- The workspace is not a Git repository, so commit steps are replaced by test checkpoints.

---

### Task 1: Navigation and route architecture

**Files:**
- Modify: `lib/site-content.ts`
- Modify: `components/site-header.tsx`
- Modify: `components/site-footer.tsx`
- Test: `tests/site-header.test.tsx`
- Test: `tests/site-content.test.ts`

**Interfaces:**
- Produces `SiteRoute` entries for `/quiz`, `/careers`, `/blog`, and `/blog/[slug]` consumers.
- Produces desktop Solutions and Company menus with one-open-at-a-time behavior.

- [ ] Write tests proving pointer leave closes a menu after a grace period, pointer re-entry cancels closure, Escape returns focus, only one desktop menu opens, and mobile menus are accordions.
- [ ] Run `npm test -- tests/site-header.test.tsx tests/site-content.test.ts` and confirm the new behavior fails because it is absent.
- [ ] Add the routes, Blog navigation, Company dropdown, diagnostic CTA, timers, focus-departure behavior, and footer links.
- [ ] Re-run the focused tests and confirm they pass.

### Task 2: Shared scroll-story engine and solution visuals

**Files:**
- Create: `components/scroll-story.tsx`
- Create: `components/conversion-system-story.tsx`
- Create: `components/growth-engine-story.tsx`
- Modify: `components/approach-blueprint.tsx`
- Modify: `app/solutions/patient-conversion-system/page.tsx`
- Modify: `app/solutions/growth-partnership/page.tsx`
- Modify: `app/approach/page.tsx`
- Test: `tests/scroll-stories.test.tsx`

**Interfaces:**
- `ScrollStory<T>` consumes labelled stages, active index, selection callback, and render function.
- Solution stories expose stage buttons and a live visual for the same state model.

- [ ] Write tests proving stage selection changes the visible patient event, scroll activation calls the same state transition, and every stage remains readable under reduced motion.
- [ ] Run `npm test -- tests/scroll-stories.test.tsx` and confirm failure for missing components.
- [ ] Build a reusable IntersectionObserver-driven stage engine with desktop sticky view and mobile/reduced-motion linear output.
- [ ] Build the six-stage conversion journey and five-stage dual-stream growth journey.
- [ ] Convert Approach to the same synchronized stage model.
- [ ] Re-run the focused test and existing solution/approach tests.

### Task 3: Outcomes and Company motion

**Files:**
- Create: `components/outcomes-story.tsx`
- Modify: `components/team-grid.tsx`
- Modify: `app/outcomes/page.tsx`
- Modify: `app/company/page.tsx`
- Modify: `lib/site-content.ts`
- Test: `tests/outcomes-and-company.test.tsx`

**Interfaces:**
- `OutcomesStory` renders the observed-number disclosure, three-stage operating timeline, and measurement traces.
- `TeamGrid` consumes `TeamMember.linkedin` and makes the full card an accessible external link.

- [ ] Extend tests to require the visible proof disclaimer, a non-autoplay reduced-motion state, story-before-team order, exact team roles, and correct LinkedIn destinations.
- [ ] Run the test and confirm failures for missing links and motion scene.
- [ ] Add evidence-led reveals/counting without changing the draft status of the 40% proof.
- [ ] Recompose Company so its conviction leads and the team enters the first viewport; animate cards from a compressed stack to the stable grid.
- [ ] Re-run the focused test.

### Task 4: Clinic diagnostic and transparent scenario engine

**Files:**
- Create: `lib/diagnostic.ts`
- Create: `components/diagnostic-quiz.tsx`
- Create: `app/quiz/page.tsx`
- Create: `app/api/diagnostic/route.ts`
- Test: `tests/diagnostic.test.ts`
- Test: `tests/diagnostic-quiz.test.tsx`

**Interfaces:**
- `calculateDiagnostic(input: DiagnosticInput): DiagnosticResult` returns recommendation, input basis, and 10/20/30% relative-improvement scenarios.
- `POST /api/diagnostic` accepts contact plus result, sends visitor/internal summaries when Resend is configured, and returns `{ ok, delivery }` without hiding the computed result.

- [ ] Write literal, hand-calculated tests for exact inputs, range midpoints, all recommendation branches, capacity constraints, zero/invalid values, and scenario arithmetic.
- [ ] Run focused tests and confirm the module is missing.
- [ ] Implement pure range resolution, recommendation, and scenario math with no external benchmark.
- [ ] Build the eight-question progressive UI, email gate, persistent on-page results, consent, retry state, and strategy-call actions.
- [ ] Implement server validation and dependency-injected email delivery; keep answers/results after delivery failure.
- [ ] Re-run focused tests.

### Task 5: Careers application and private résumé intake

**Files:**
- Create: `lib/careers.ts`
- Create: `components/careers-application.tsx`
- Create: `app/careers/page.tsx`
- Create: `app/api/careers/route.ts`
- Test: `tests/careers.test.ts`
- Test: `tests/careers-application.test.tsx`

**Interfaces:**
- `validateCareerApplication(formData)` returns typed fields or field-specific errors.
- Careers route accepts PDF/DOC/DOCX up to 10 MB, stores privately when Blob is configured, and emails `careers@regena.io` when Resend is configured.

- [ ] Write tests for accepted roles, professional links, missing consent, invalid extensions, MIME mismatch, files over 10 MB, and a valid application.
- [ ] Run focused tests and confirm failure because the validator/route is absent.
- [ ] Implement the editorial Careers page for Closer, AI Systems Developer, and general applications.
- [ ] Implement accessible application progress, validation, upload state, server validation, private Blob storage, and email notification.
- [ ] Re-run focused tests.

### Task 6: Sanity Blog and original launch content

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity/schemaTypes/article.ts`
- Create: `sanity/schemaTypes/index.ts`
- Create: `lib/blog.ts`
- Create: `components/blog-index.tsx`
- Create: `components/article-body.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `content/blog/*.md`
- Test: `tests/blog.test.ts`
- Test: `tests/blog-routes.test.tsx`

**Interfaces:**
- `getArticles()` and `getArticle(slug)` use Sanity when configured and original launch drafts as a development-safe content source.
- Article route uses async Next.js 16 `params` and `generateMetadata`.

- [ ] Write tests for article ordering, slug lookup, featured article, metadata, empty CMS response, and no unsupported claims in the three launch drafts.
- [ ] Run focused tests and confirm failures for missing Blog code.
- [ ] Provision/link Sanity, add schemas and server-side queries, and implement deterministic local content only as a development fallback until the real CMS project is configured.
- [ ] Build the editorial index, dynamic articles, reading progress, useful table of contents, related articles, and contextual CTA.
- [ ] Re-run focused tests.

### Task 7: Integration provisioning and production boundaries

**Files:**
- Modify: `package.json`
- Modify: `.env.example`
- Modify: `app/privacy/page.tsx`
- Create: `lib/email.ts`
- Test: `tests/integration-boundaries.test.ts`

**Interfaces:**
- `sendEmail(message)` returns explicit configured/unconfigured delivery state.
- Resume storage exposes no public URL to browser state.

- [ ] Verify the Vercel project link and provision Sanity, Resend, and private Blob through Vercel-supported integrations.
- [ ] Pull development environment variables without printing secret values.
- [ ] Add provider packages only after provisioning establishes the environment contract.
- [ ] Write boundary tests for unconfigured services and sanitised external payloads; run them red.
- [ ] Implement provider adapters and update privacy disclosure without claiming GoHighLevel is connected.
- [ ] Re-run focused tests.

### Task 8: Visual system, responsive behavior, and complete verification

**Files:**
- Modify: `app/site-pages.css`
- Modify: `app/globals.css`
- Modify: `e2e/site.spec.ts`
- Create: `e2e/interactive-expansion.spec.ts`

**Interfaces:**
- Shared CSS classes implement the approved sticky desktop scenes, quiet editorial pages, focus states, and mobile/reduced-motion fallbacks.

- [ ] Write Playwright journeys for dropdown dismissal, both solution stories, Approach scrolling, Company LinkedIn cards, the complete diagnostic, Careers validation, Blog index/article navigation, mobile navigation, and reduced motion.
- [ ] Run the new E2E suite and confirm failures before the interfaces exist.
- [ ] Add the shared responsive styling and patient-signal motion; remove any decoration that does not communicate state.
- [ ] Run `npm test`, `npm run lint`, `npm run build`, and `npm run test:e2e`.
- [ ] Capture desktop/mobile screenshots of all materially revised routes and visually inspect hierarchy, overflow, motion, and interaction states.
- [ ] Fix every reproducible issue with a failing regression test first, then repeat the complete verification run.
