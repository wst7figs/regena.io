# Regena Homepage Design Specification

## Objective

Build the complete design and information architecture for Regena's homepage. The page's primary conversion is a booked strategy meeting. It is designed mainly for organic-search visitors and should communicate premium quality, operational sophistication, and trust.

## Scope

This milestone includes one responsive homepage with finished visual design, component architecture, moderate motion, generated placeholder proof, and a functioning in-page booking route. It excludes final verified copy, compliance language, production client media, real analytics data, CRM integration, CMS, and secondary pages.

## Technical architecture

- Next.js App Router with TypeScript.
- React server components by default; client components only for navigation state, viewport reveals, and patient-journey interaction.
- CSS Modules or a single token-driven global stylesheet; no component library visual defaults.
- Inline SVG and Lucide icons for interface graphics.
- No animation framework in the first milestone. CSS transforms, Intersection Observer, and SVG stroke animation are sufficient for moderate motion.
- Vitest and Testing Library for component behavior; Playwright for responsive and navigation smoke tests.

## Page architecture

The homepage follows the nine-part sequence in `DESIGN.md`. The hero and connected journey are the two most technically complex sections. All proof content is sourced from a centralized placeholder-data module so it can be replaced without rewriting layouts.

## Interaction model

- Every booking CTA links to `#book`.
- The mobile navigation opens with a semantic button, traps no focus, closes after a destination is selected, and can be dismissed with Escape.
- Journey stages activate as their cards enter the active viewport region. Pointer and keyboard users can also activate a stage directly.
- Section reveals run once and become static after completion.
- Reduced-motion users receive the same content without animated travel or translation.

## Responsive requirements

- 1440px: full 12-column editorial composition.
- 1024px: stacked hero with simplified product surface.
- 768px: two-column proof and metric layouts where space allows.
- 375px: single-column layout, no clipping, no horizontal page scroll, and minimum 44px controls.

## Accessibility and quality floor

- Semantic heading order and landmark structure.
- Skip link, visible focus states, labelled controls, and sufficient color contrast.
- Reduced-motion stylesheet.
- Product UI text remains at least 12px desktop and 13px mobile.
- Decorative SVGs are hidden from assistive technology; meaningful graphics receive accessible summaries.
- Production build produces no warnings or TypeScript errors.

## Acceptance criteria

1. The homepage contains all nine architectural sections.
2. The visual system follows `DESIGN.md` rather than the generated design-system defaults that conflict with it.
3. All meeting CTAs resolve to the booking section.
4. Mobile navigation is keyboard-operable and dismissible.
5. The patient journey supports scroll, pointer, and keyboard activation.
6. Reduced-motion mode removes narrative movement without hiding content.
7. Automated tests pass and the page is visually checked at 375px, 768px, 1024px, and 1440px.

