# Regena Homepage Design System

## 1. Visual theme and atmosphere

Regena should feel premium, operationally sophisticated, and trustworthy. The page combines a warm editorial canvas with precise clinical-technology interfaces. It is neither a generic agency website nor a software dashboard: quiet editorial sections establish authority while a single animated patient-signal journey demonstrates technical depth.

The visual risk is the patient signal itself: a thin mineral-green line travels through the experience and turns violet only when a meaningful outcome is reached. Everything around it stays restrained.

## 2. Color palette and roles

| Token | Value | Role |
| --- | --- | --- |
| Warm ivory | `#F4F1EB` | Primary page canvas |
| Paper white | `#FCFBF8` | Elevated light surfaces |
| Ink | `#0A1113` | Primary text and deepest surfaces |
| Graphite | `#111B1D` | Dark storytelling sections |
| Mineral | `#74C9AF` | Primary signal, focus, and active state |
| Deep mineral | `#145F57` | Primary CTA and strong controls |
| Outcome violet | `#9A7DE2` | Conversion and completed-outcome accent only |
| Hairline | `#D9D6CF` | Light borders and separators |
| Muted ink | `#66706F` | Secondary copy |

Use mineral green for the journey and primary action. Violet is not a second brand color; it appears only where the journey produces an outcome. Never create free-floating purple-blue glow decoration.

## 3. Typography rules

- Display and body: Instrument Sans, variable weight.
- Utility and data: IBM Plex Mono.
- Display headlines use compact tracking, weights 500-560, and balanced line breaks.
- Body copy uses 16-20px sizes and 1.5-1.65 line height.
- Eyebrows, stage labels, and metrics use IBM Plex Mono in uppercase at 11-13px.
- Maximum desktop text measure is 68 characters; mobile is 50 characters.

## 4. Component styling

### Navigation

The navigation is quiet and compact. The logo anchors the left edge, section links occupy the center, and one dark primary booking button sits on the right. On mobile, the links collapse into a full-width menu panel controlled by an accessible button.

### Buttons

- Primary: deep mineral background, ivory text, 10-12px radius, one arrow icon.
- Secondary: transparent surface, hairline border, ink text.
- Minimum interactive area: 44px.
- Hover changes surface and arrow position by no more than 3px.
- Focus uses a visible 3px mineral ring.

### Product surfaces

Use thin borders, low-radius panels, and controlled elevation. Interior product surfaces may use subtle translucency, but page sections should remain opaque. Interface cards use larger readable fragments rather than dense fake microcopy.

### Patient signal

The signature signal is a continuous SVG line with restrained glow. Stage nodes enlarge and brighten as they become active. The signal never flickers, scroll-jacks, or blocks input. Reduced-motion mode renders the complete path statically.

### Proof media

Until real assets arrive, proof imagery is an abstract, clearly editorial portrait treatment generated from CSS shapes and gradients. No invented clinic logo wall is used.

## 5. Layout principles

- Desktop content width: 1440px maximum with 32-48px outer gutters.
- Tablet breakpoint: 1024px. Mobile breakpoint: 760px.
- Section padding: 112-152px desktop, 72-96px tablet, 64-80px mobile.
- Alternate warm ivory and graphite chapters to create narrative pacing.
- Use asymmetry in the hero and case-study sections; use centered composition only for the patient journey.
- Cards align to a 12-column grid on desktop and a single column on mobile.
- Do not shrink the desktop product interface on mobile. Recompose it as a vertical four-step sequence.

## 6. Depth and elevation

- Light card border: `1px solid rgba(10, 17, 19, 0.12)`.
- Dark card border: `1px solid rgba(255, 255, 255, 0.13)`.
- Light shadow: `0 24px 70px rgba(16, 32, 30, 0.08)`.
- Product shadow: `0 28px 100px rgba(3, 13, 14, 0.18)`.
- Avoid stacking multiple shadows or using blur as ambient decoration.

## 7. Motion rules

- Use one orchestrated page-load sequence in the hero.
- Reveal major sections through opacity and a maximum 24px vertical translation.
- Animate only transform, opacity, and SVG stroke properties.
- Micro-interactions last 160-280ms. Narrative transitions last 500-800ms.
- Respect `prefers-reduced-motion` and remove all non-essential transforms.
- Do not pin the entire page, hijack scrolling, or apply parallax to body copy.

## 8. Homepage architecture

1. Navigation and hero: value proposition plus four-stage live system demonstration.
2. Credibility transition: short proof statement and operating principles.
3. Connected journey: five-stage Acquire, Respond, Qualify, Book, Enroll signal story.
4. Revenue leakage: three editorial observations about where clinics lose demand.
5. Infrastructure layers: acquisition, conversion, and continuity working as one system.
6. VisionMax proof: large client-story media card paired with a restrained impact dashboard.
7. Operating model: built, operated, and improved as an ongoing partnership.
8. Qualification and booking: ideal-fit criteria plus the primary meeting CTA.
9. Footer: compact navigation and contact details.

## 9. Do and do not

### Do

- Keep text and interactive controls legible at every breakpoint.
- Use the green-to-violet transition to encode progress.
- Let typography and spacing carry most of the premium feeling.
- Use semantic HTML, keyboard focus, and explicit labels.
- Keep placeholder proof centralized so real evidence can replace it later.

### Do not

- Do not use generic three-card SaaS grids without narrative purpose.
- Do not cover the page in glassmorphism, gradient borders, or neon glows.
- Do not present voice AI as the entire Regena offer.
- Do not use invented client logo walls.
- Do not add a theme switcher; section contrast is intentional.
- Do not use emojis as icons.

## 10. Responsive behavior

- At 1024px, the hero becomes a stacked composition with the product surface below the copy.
- At 760px, navigation collapses, multi-column systems become vertical stages, and dashboard metrics use a two-column grid.
- Mobile stage cards preserve the order and meaning of the desktop patient journey.
- Touch targets are at least 44px and no horizontal page scroll is permitted.
- The final booking CTA remains visible within the normal document flow; no persistent mobile bar is required.

