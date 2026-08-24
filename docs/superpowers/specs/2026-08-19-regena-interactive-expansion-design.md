# Regena Interactive Expansion Design

**Date:** 2026-08-19  
**Status:** Approved direction; written specification awaiting final review  
**Project:** Regena authority website  
**Existing stack:** Next.js 16, React 19, TypeScript, Motion, Vercel

## 1. Objective

Evolve the approved Regena authority site from a visually strong static system into a more legible, interactive operating story. Visitors should understand what each Regena engagement does, see how the patient-growth system behaves, self-identify the right starting point, and reach a strategy call without needing to decode technical language.

The revision adds:

- Scroll-led solution explanations.
- A scroll-controlled operating-method section.
- More animated, evidence-led outcomes storytelling.
- A company page that introduces the operating conviction before bringing the team forward.
- A personalized clinic diagnostic with an explainable financial scenario.
- A real Sanity-powered Blog.
- A Careers page with role listings and secure applications.
- Resend, Vercel Blob, Google Workspace, and later GoHighLevel integration boundaries.

## 2. Success Criteria

The revision succeeds when:

1. A clinic owner can explain the difference between the Patient Conversion System and Growth Partnership after scanning either solution page.
2. The solution system is understandable without reading every paragraph.
3. Motion directs attention and explains state changes instead of merely decorating the page.
4. The quiz returns a useful, transparent result without presenting an unsupported guarantee.
5. Quiz results remain visible on-page after the email gate.
6. The visitor and Regena team both receive the quiz summary by email.
7. Careers applications accept a résumé and relevant professional links without exposing uploaded documents publicly.
8. The Blog can be edited and published outside the codebase.
9. Every enhanced interaction has keyboard, mobile, and reduced-motion behavior.
10. The production site does not claim that GoHighLevel sync, real scheduling, verified VisionMax proof, or legal approval is active before those dependencies are completed.

## 3. Non-Goals

- Advertising funnels remain external at `funnels.regena.io`.
- The quiz is an organic-site diagnostic, not the advertising funnel.
- No public pricing is added.
- No patient, revenue, ranking, medical-outcome, or marketing-performance guarantee is added.
- No fabricated team photography, case studies, customer logos, job compensation, or clinic benchmarks are added.
- No generic WebGL spectacle or heavy 3D scene becomes the primary interface.
- The Careers page does not launch an internship role in this phase.
- GoHighLevel is not represented as connected until the user supplies the MCP/API configuration and the integration passes live verification.

## 4. Information Architecture

### Routes

Existing routes remain:

- `/`
- `/solutions`
- `/solutions/patient-conversion-system`
- `/solutions/growth-partnership`
- `/approach`
- `/clinics`
- `/outcomes`
- `/company`
- `/book`
- `/privacy`
- `/terms`

New routes:

- `/quiz`
- `/careers`
- `/blog`
- `/blog/[slug]`

### Desktop navigation

Recommended order:

`Solutions ▾ · Our Approach · For Clinics · Outcomes · Blog · Company ▾ · Book a strategy call`

Solutions dropdown contains:

1. Patient Conversion System.
2. Regena Growth Partnership.
3. Compare solutions.
4. “Not sure what you need? Take the clinic diagnostic.”

Company dropdown contains:

1. About Regena.
2. Careers.

### Dropdown behavior

- The desktop Solutions and Company dropdowns open by click and keyboard activation.
- A dropdown closes after the pointer exits the complete trigger-and-panel boundary.
- A short 120–180 ms close delay prevents accidental closure while the pointer crosses a small visual gap.
- Re-entering before the delay expires cancels closure.
- Escape closes the open menu and returns focus to its trigger.
- Moving focus outside the dropdown closes it.
- Selecting a link closes it.
- Only one dropdown can be open at a time.
- Mobile uses explicit accordion controls rather than hover behavior.

## 5. Visual and Motion System

### Direction

Use a hybrid motion language:

- **Product-led cinematic:** Solutions, Approach, Outcomes, and Quiz.
- **Editorial depth:** Company, Careers, and Blog.

The existing Precision Noir palette, typography, spacing, rays, patient signal, and architectural grid remain the foundation.

### Shared signature

A patient signal becomes the cross-page visual motif. It can move through cards, connections, charts, and operating layers, but it always represents a real handoff or state change.

### Motion rules

- Prefer pinned storytelling only where scrolling changes meaningful system state.
- Avoid multiple simultaneous ambient effects competing for attention.
- Use opacity, translation, scale, blur, line drawing, and restrained perspective depth.
- Avoid uncontrolled mouse-following, constant card floating, decorative particle fields, or full-page WebGL.
- Reduced motion renders every state in a readable linear layout.
- Mobile converts pinned horizontal stories into compact vertical sequences.

## 6. Solution Pages

### 6.1 Patient Conversion System

The core visual is a scroll-controlled operating journey:

`Inquiry → Response → Qualification → Booking → Attendance → Visibility`

The scene remains pinned on desktop while scrolling changes its active stage. Each stage contains four consistent ideas:

1. **Patient event:** what the patient just did.
2. **Regena action:** what the managed system operates.
3. **Clinic state:** what staff can see or control.
4. **Protected outcome:** what the handoff is designed to preserve.

Example states:

- Incoming call or form appears.
- Voice/chat response activates.
- Qualification rules assemble.
- Calendar availability and booking confirmation appear.
- Reminder and exception paths protect attendance.
- Source, stage, and commercial value become visible in the operating view.

The stage controls remain clickable and keyboard-operable. Scroll and direct selection update the same state model.

### 6.2 Regena Growth Partnership

The core visual is a dual-stream growth engine:

`Paid demand + Organic/local demand → Patient Conversion System → Attended consultations → Revenue visibility`

The page must make three relationships obvious:

1. Acquisition and conversion are separate operating disciplines.
2. Growth Partnership includes the Patient Conversion System.
3. Clinic capacity and patient experience constrain responsible growth.

The scroll story progressively connects:

- Acquisition sources.
- Landing paths and campaign intent.
- Response, qualification, booking, and follow-up.
- Attendance and clinic capacity.
- Attribution and improvement decisions.

The visual does not imply guaranteed attribution or revenue. It shows the operating architecture and measured states.

## 7. Our Approach

Convert the existing six-stage interactive panel into a scroll-controlled blueprint:

1. Audit.
2. Architect.
3. Build.
4. Launch.
5. Operate.
6. Improve.

Desktop behavior:

- The operating view stays pinned.
- Each scroll segment activates one stage.
- Blueprint layers, connector lines, system labels, and summary copy update with the stage.
- A progress rail communicates where the visitor is in the method.
- Clicking a stage moves to that state without breaking subsequent scrolling.

Mobile and reduced motion:

- Present the six stages as a linear sequence with all explanations visible.
- No sticky trap or long blank scrolling region.

## 8. Outcomes

Preserve the approved structure and improve liveliness through evidence-led motion:

- Count the observed VisionMax figure into view only after the result card is visible.
- Draw the operating timeline from before to connected system to observed outcome.
- Move the patient signal through the timeline once per reveal.
- Draw metric chart lines as their cards enter.
- Assemble the VisionMax operating view in layers.
- Apply subtle background signal movement in the dark evidence section.
- Use a small perspective shift on the operating-view surface, not a free-floating 3D model.

The existing proof disclaimer remains visible. The 40% statement remains labelled draft until its baseline, period, and calculation are confirmed.

## 9. Company

### Content order

1. Company conviction and founding context.
2. Team entering the first viewport.
3. Full team and accountability map.
4. Operating principles.
5. Careers invitation.

### Story direction

Use the structural strength of Walaw’s problem-first company page without copying its language or naming Regena clients.

The narrative begins with repeated clinic reality:

- Patient demand crosses too many disconnected handoffs.
- Clinics are asked to manage tools and vendors instead of one accountable operating system.
- Regena exists to place one operating team around the patient journey.

### Team motion

- The bottom of the first team row is visible in the initial viewport.
- On scroll, a stacked or compressed card arrangement pulls forward and settles into the full grid.
- Depth, overlap, and connector lines create the pull-in effect.
- Motion stops once the cards settle; profiles do not float continuously.

### Team cards

Use art-directed placeholders until real photography is supplied. Each entire card is an external LinkedIn link with an accessible name, visible focus state, and new-tab behavior.

- Luan West: `https://www.linkedin.com/in/luanwest/`
- Jean-Pierre: `https://www.linkedin.com/in/jean-pierre-van-eeden-0a667726b/`
- Julian Hollen: `https://www.linkedin.com/in/julianholien/`
- Shoham Zahir: `https://www.linkedin.com/in/shoham-zahir-77151a325/`

## 10. Clinic Diagnostic Quiz

### Purpose

Help organic visitors identify their primary growth constraint, understand the commercial scale of the problem, and choose the right Regena conversation.

### Question design

Use approximately eight plain-language questions. Prefer selectable ranges with an optional exact-value input where appropriate.

Core inputs:

1. Annual clinic revenue range; optional exact value.
2. Average patient or treatment-plan value range; optional exact value.
3. Approximate monthly new-patient inquiry range; optional exact value.
4. Whether paid marketing is active.
5. The most visible constraint: demand, response, qualification/booking, attendance, visibility, or unsure.
6. A simple “out of ten inquiries, roughly how many become consultations?” range.
7. Whether providers and staff have capacity for additional qualified patients.
8. Whether the clinic can access basic workflow and outcome information.

The language avoids requiring formal funnel analytics knowledge.

### Recommendation logic

- Existing demand plus response/booking leakage routes primarily to Patient Conversion System.
- Need for demand plus conversion routes primarily to Growth Partnership.
- Unclear constraint, insufficient information, or conflicting answers routes to a clinic-growth diagnostic.
- Capacity and system-access answers influence fit guidance but do not publicly reject a visitor.

### Financial scenario

The result uses the visitor’s own answers and displays the arithmetic.

The primary model is scenario-based:

1. Resolve monthly inquiries and average patient value from exact inputs or the selected range.
2. Resolve the visitor’s approximate current inquiry-to-consultation rate from the “out of ten” answer.
3. Calculate current implied consultation value.
4. Show the incremental monthly value represented by **10%, 20%, and 30% relative improvement scenarios** in inquiry-to-consultation performance.
5. Constrain the wording when the visitor reports limited capacity or incomplete data.

The calculation does not state that Regena will create the projected improvement. It states:

> “Based on the numbers you provided, this is the additional monthly consultation value represented by the illustrated improvement scenarios.”

The result labels:

- User-provided inputs.
- Range midpoint or low/high values used.
- Scenario assumption.
- Gross consultation value before delivery costs, refunds, downstream conversion, or capacity constraints.
- “Illustrative estimate, not a guarantee.”

This avoids importing a generic benchmark as fact while still returning real numbers tied to the clinic’s inputs.

### Email gate and result

After completing the diagnostic questions, the visitor provides:

- Name.
- Work email.
- Phone.
- Clinic name.
- Role.
- Consent to receive the report and follow-up.

After successful submission:

- Results remain visible on the page.
- The visitor receives the same result summary by email.
- Regena receives the contact, answers, recommendation, scenario, and source.
- Failure to send email produces a clear retry state and does not erase answers.

### GoHighLevel boundary

When access is supplied, successful completion will:

- Create or update the contact.
- Create a `Website Diagnostic` opportunity.
- Attach recommendation, result range, answer summary, source, and follow-up status.
- Apply agreed tags and custom fields.

Until this is connected and verified, the site must label the GHL sync as unavailable internally and must not claim the contact entered a pipeline.

## 11. Careers

### Page structure

1. Regena operating culture.
2. Expectations for early-stage team members.
3. Open roles.
4. General application.
5. Application form.

### Initial roles

- Growth Advisor / Closer.
- AI Systems Developer.
- General application.

The internship is excluded from this phase.

All roles are remote with meaningful overlap with North American business hours. Compensation is not shown until approved.

### Application fields

- Full name.
- Email.
- Phone, optional.
- Location and time zone.
- Role.
- LinkedIn.
- X.
- Instagram.
- Personal website.
- Portfolio.
- Relevant experience.
- Written response explaining fit and evidence of execution.
- Résumé upload.
- Consent to process the application.

### Upload and delivery

- Accept PDF, DOC, and DOCX.
- Maximum file size: 10 MB.
- Store documents in private Vercel Blob.
- Use server-side file validation; do not trust browser MIME alone.
- Email the application summary to `careers@regena.io` through Resend.
- Do not expose a permanent public résumé URL.
- Provide clear upload progress, validation, success, and retry states.

## 12. Blog

### CMS

Provision Sanity through the Vercel Marketplace before building the Blog interface. Sanity is the source of truth for published articles.

### Routes and content model

- `/blog`: editorial index.
- `/blog/[slug]`: article page.

Article fields:

- Title.
- Slug.
- Excerpt.
- Hero image.
- Category.
- Author.
- Published date.
- Updated date, optional.
- Portable rich content.
- SEO title and description.
- Featured flag.
- Related articles.

### Editorial design

- Lead with one featured article.
- Use a disciplined grid for the remaining articles.
- Add category filters only when more than one category contains published content.
- Article pages include reading progress, table of contents when useful, related articles, and a contextual strategy-call CTA.
- Motion remains editorial: image reveal, line movement, progress, and card transitions.

### Initial original drafts

1. **Why Patient Demand Disappears Between Inquiry and Consultation**
2. **Why an AI Receptionist Is Not a Patient-Conversion System**
3. **The Five Numbers Clinic Owners Should Track Across the Patient Journey**

Use Walaw’s useful content mix—operational analysis, market education, company thinking, and customer stories—as structural inspiration. Do not reproduce its copy or make unsupported claims.

## 13. Integrations and Data Flow

### Sanity

- Real CMS integration provisioned before UI implementation.
- Published content is fetched server-side.
- Draft preview is optional and not required for the first release.

### Resend

- Provision through the Vercel Marketplace before implementing email delivery.
- Send quiz results from `results@regena.io` after domain verification.
- Send internal quiz notices to `growth@regena.io`.
- Send careers notices to `careers@regena.io`.
- Reply-to addresses route into Google Workspace aliases or groups.

### Google Workspace

Recommended aliases:

- `careers@regena.io`.
- `results@regena.io`.
- `growth@regena.io`.

Aliases may route into one existing user mailbox. Use a Google Group instead where multiple team members require shared delivery.

### Vercel Blob

- Private storage for résumés only.
- Do not use Blob as an applicant database.

### GoHighLevel

- Deferred until the user provides MCP/API access, pipeline details, tags, and custom-field decisions.
- The implementation plan must include an explicit reminder and connection checkpoint.

### Persistence

- Sanity persists Blog content.
- Private Blob persists uploaded résumés.
- Quiz and application metadata are delivered by email in the first live integration.
- GoHighLevel becomes the quiz lead system of record after connection.
- No general-purpose database is introduced unless an implementation dependency proves it necessary.

## 14. Validation, Privacy, and Abuse Protection

- Validate all quiz and application inputs server-side.
- Reject unapproved file types and oversized documents.
- Do not include private résumé URLs in public client state.
- Sanitize rich content rendering.
- Rate-limit public submission endpoints.
- Add bot protection before production launch.
- Keep form values after recoverable submission errors.
- Provide explicit consent language for result email and recruitment processing.
- Update the Privacy page to describe the final connected services before public launch.
- Do not collect patient health information through the quiz or Careers form.

## 15. Accessibility and Responsive Behavior

- Every route retains a working skip link and focusable main landmark.
- Dropdowns support pointer, keyboard, Escape, focus departure, and mobile accordion behavior.
- Scroll stories expose direct stage controls.
- Scroll position is not the only way to access content.
- Reduced motion removes pinned transitions and renders complete linear content.
- Mobile layouts avoid sticky scroll traps, tiny controls, clipped cards, and horizontal overflow.
- External LinkedIn links communicate that they open a new tab.
- Form errors use `aria-invalid`, `aria-describedby`, and focus management.
- Upload progress and submission results use appropriate live regions.

## 16. Performance

- Keep static page content server-rendered.
- Isolate client components to interactive scenes and forms.
- Avoid shipping 3D/WebGL libraries.
- Load Sanity article images through an optimized image pipeline.
- Defer noncritical motion until its section approaches the viewport.
- Use transform and opacity for high-frequency animation.
- Ensure hidden motion states do not delay readable content.

## 17. Testing and Verification

### Unit and component coverage

- Dropdown close delay, cancellation, Escape, focus departure, and single-open-menu state.
- Quiz recommendation logic.
- Quiz scenario calculations with exact values, ranges, capacity constraints, invalid data, and zero values.
- Quiz email-gate validation and result persistence.
- Careers form validation and upload rules.
- Sanity article mapping and empty-state behavior.

### Browser coverage

- All routes at mobile and desktop widths.
- No horizontal overflow, failed requests, console errors, or duplicate IDs.
- Solution scroll stages and direct controls remain synchronized.
- Approach scroll stages and direct controls remain synchronized.
- Reduced-motion alternatives expose complete content.
- Company team cards enter, settle, and link to the correct LinkedIn profiles.
- Quiz completes, shows results on-page, and preserves them after the email action.
- Careers application handles invalid and valid uploads.
- Blog index and article routes render CMS content and metadata.
- All internal links resolve.

### Integration verification

- Verify Resend delivery to the visitor and internal aliases.
- Verify private Blob upload and authorized retrieval behavior.
- Verify Sanity publish-to-site flow.
- Verify GoHighLevel contact/opportunity creation only after access is provided.

## 18. Launch Dependencies

The following must be completed before representing the expansion as production-live:

1. Vercel project linkage confirmed.
2. Sanity integration provisioned and accessible.
3. Resend integration provisioned and `regena.io` sender domain verified.
4. Google Workspace aliases or groups created.
5. Private Vercel Blob store provisioned.
6. Privacy and Terms updated for final integrations and reviewed by counsel.
7. VisionMax proof baseline and testimonial status confirmed.
8. GoHighLevel connection completed or explicitly deferred without live-sync claims.

## 19. Approved Decisions Summary

- Hybrid product-led cinematic and editorial motion direction.
- Dedicated organic-site `/quiz` route.
- Personalized diagnostic result with estimated financial scenarios and three next actions.
- Simple range-based questions with optional exact values.
- Results shown on-page and emailed to the visitor; Regena also receives the lead summary.
- Future automatic GoHighLevel contact and opportunity creation.
- Company story above team; team visible immediately.
- Premium team placeholders with confirmed LinkedIn links.
- Sanity-backed Blog with three original draft articles.
- Careers page with Closer, Developer, and general application only.
- Remote roles with North American-hours overlap.
- Résumé uploads and broad professional/social link fields.
- Google Workspace aliases where appropriate.

