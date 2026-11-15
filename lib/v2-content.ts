// Single source for the v2 (Nov 2026) homepage and apply funnel copy.
// Rules: no Regena prices, no client results, no invented proof. Sell the model.
// Keep the ICP broad (med spas and aesthetic clinics). Laser is fine as an example, never a requirement.
// Every claim must also hold for existing partner clinics on older terms (e.g. a monthly base + per-show fee),
// so say "our fee is tied to patients who show up", never "you only pay when they show up".

export const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://go.regena.io/widget/booking/DPLeuNxOGB7PkoF1eg6u";

export const legalName = "Regena Technologies Inc.";

export const heroFacts = [
  "Never billed for a no-show",
  "Month to month",
  "No setup fee",
  "Live in about two weeks",
  "One clinic per area",
] as const;

export const sampleReport = [
  { patient: "New patient", detail: "Laser · full legs", status: "showed", note: "Counts" },
  { patient: "Past patient", detail: "Last seen 14 months ago", status: "showed", note: "Counts" },
  { patient: "New patient", detail: "Body contouring consult", status: "no-show", note: "Not billed · rebooking" },
  { patient: "New patient", detail: "Skin · facial", status: "rebooked", note: "Counts when they show" },
  { patient: "Walk-in", detail: "Not from Regena", status: "excluded", note: "Never counts" },
] as const;

export const comparison = [
  { topic: "What you pay for", agency: "Leads and clicks, whether or not anyone shows up", regena: "Patients who actually show up" },
  { topic: "Who calls new leads", agency: "Your front desk, when they get to it", regena: "Our team, within minutes during your hours" },
  { topic: "No-shows", agency: "Your problem, and still billed", regena: "We chase and rebook them. You never pay for one" },
  { topic: "Past patients", agency: "Not included", regena: "We invite back patients you haven't seen in a while" },
  { topic: "After the first visit", agency: "Nothing", regena: "Follow-up so first visits turn into treatment plans" },
  { topic: "Commitment", agency: "3 to 6 month contracts", regena: "Month to month" },
] as const;

export const services = [
  { title: "Meta ads around one offer", body: "We build the offer, creative and form around a treatment your clinic wants more of, and run them in your ad account." },
  { title: "Speed-to-lead", body: "New leads get a text and a call within minutes during opening hours. Most clinics take hours." },
  { title: "Booking and confirmations", body: "Our team qualifies, books, confirms and reminds, using scripts you approve." },
  { title: "No-show recovery", body: "Missed appointments get a same-day follow-up and a new time, not a shrug." },
  { title: "Past-patient reactivation", body: "We reach patients you haven't seen in a while and invite them back." },
  { title: "Treatment plan follow-up", body: "After a first visit, we follow up so the patient books the rest of their plan." },
] as const;

export const steps = [
  { when: "Day 0", title: "Fit call and access", body: "We agree on the offer, your capacity and your area, then get access to your ad account, Facebook page and calendar." },
  { when: "Week 1", title: "We build it", body: "Ads, form, speed-to-lead, booking, confirmations, no-show recovery and show tracking." },
  { when: "Week 2", title: "You're live", body: "Campaigns on and our team working your leads." },
  { when: "Every week", title: "A plain report", body: "Every appointment we booked, whether they showed, and where they came from." },
  { when: "Day 60", title: "Review together", body: "Cost per patient and what's converting. Then we keep going, rework the offer, or part ways." },
] as const;

export const countingRules = [
  { counts: true, text: "A new patient who came from our ads and completed their appointment" },
  { counts: true, text: "A past patient who came back through our outreach" },
  { counts: false, text: "No-shows and cancellations" },
  { counts: false, text: "Recent patients, walk-ins and referrals" },
] as const;

export const countingProcess = [
  "Your team marks each appointment as showed or no-show.",
  "You get a report with every appointment, by name and source.",
  "You can question any appointment before it's billed.",
  "You can set a monthly cap. When it's reached, we pause ads or you raise it.",
] as const;

export const goodFit = [
  "You're a med spa or aesthetic clinic with a treatment people already ask for, like laser hair removal, body contouring or skin treatments",
  "You have room in the schedule for more patients",
  "You can fund a Meta ad budget, paid directly to Meta",
  "Your team can mark appointments as showed or no-show",
] as const;

export const notFit = [
  "Your schedule is already full",
  "You can't fund an ad budget yet",
  "We already work with a clinic in your area",
  "You're in Florida, where we aren't working yet",
] as const;

export const faqs = [
  {
    q: "How much does it cost?",
    a: "Our fee is tied to completed appointments, and you're never billed for a no-show. Pricing depends on your treatments and market, so we go through exact numbers on the call. Month to month, no setup fee. Your ad spend goes directly to Meta.",
  },
  {
    q: "What if it doesn't work?",
    a: "You never pay for a no-show, and you can leave any month. At day 60 we review cost per patient with you and decide together whether to keep going, change the offer, or stop.",
  },
  {
    q: "Who talks to my leads?",
    a: "Our team, by phone and text, during your opening hours, using scripts you approve. We never give medical advice. Clinical questions go to your providers.",
  },
  {
    q: "Which treatments do you work with?",
    a: "Most med spa and aesthetic treatments, for example laser hair removal, body contouring and skin treatments. We pick the offer with you on the call, based on what you want more of and what your schedule can take.",
  },
  {
    q: "Does it work with my booking software?",
    a: "Yes. Appointments land in a calendar we manage and get into your booking software, through an integration where one exists and by hand where it doesn't.",
  },
  {
    q: "What does my team need to do?",
    a: "Treat patients, mark each appointment as showed or no-show, and tell us when capacity changes. We handle the rest.",
  },
  {
    q: "Who owns the ad account?",
    a: "You do. Ads run in your own Meta ad account and you pay Meta directly.",
  },
  {
    q: "Where do you work?",
    a: "Canada and the United States, except Florida for now. We take one clinic per area so we never compete against ourselves.",
  },
] as const;

export type Choice = { value: string; label: string };

export const applyQuestions = {
  treatment: {
    label: "What do you most want more patients for?",
    choices: [
      { value: "laser", label: "Laser hair removal" },
      { value: "body", label: "Body contouring or fat dissolving" },
      { value: "injectables", label: "Injectables" },
      { value: "skin", label: "Skin treatments" },
      { value: "other", label: "Something else" },
    ],
  },
  revenue: {
    label: "Roughly how much does the clinic bring in each month?",
    choices: [
      { value: "under-25k", label: "Under $25k" },
      { value: "25-50k", label: "$25k to $50k" },
      { value: "50-100k", label: "$50k to $100k" },
      { value: "100k-plus", label: "$100k or more" },
    ],
  },
  pastPatients: {
    label: "How many past patients are in your system?",
    choices: [
      { value: "under-500", label: "Under 500" },
      { value: "500-1000", label: "500 to 1,000" },
      { value: "1000-plus", label: "1,000 or more" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  adBudget: {
    label: "Can you fund a Meta ad budget? It's paid directly to Meta, not to us.",
    choices: [
      { value: "yes", label: "Yes" },
      { value: "unsure", label: "Not sure yet" },
      { value: "no", label: "Not right now" },
    ],
  },
} as const satisfies Record<string, { label: string; choices: readonly Choice[] }>;

export type ApplyAnswers = {
  [K in keyof typeof applyQuestions]: (typeof applyQuestions)[K]["choices"][number]["value"];
};
