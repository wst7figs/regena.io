// Single source for the homepage and apply funnel copy. Offer v4 (locked Nov 23 2026, copy Nov 26).
// Rules:
// - Show the price: lead with the per-patient number ($60 prepaid, $75 monthly) and ALWAYS put the total
//   ($6,000, or $2,500 a month) and "plus ad spend" next to it. The promise is 100 new patients in 90 days
//   who pay a deposit and show up; every one we miss is refunded at the clinic's rate.
// - No client results, testimonials or invented proof until we have real ones with written permission.
// - Broad ICP: med spas and aesthetic clinics in the US and Canada, except Florida and Quebec.
//   Laser is an example, never a requirement. One clinic per city.
// - Write for the majority of clinics. Edge cases (physician-owned clinics, older partner terms) are
//   handled on the sales call and in the agreement, not here.
// - No "only one", "cheapest" or "best", and no revenue promises beyond the 100.

export const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://go.regena.io/widget/booking/DPLeuNxOGB7PkoF1eg6u";

export const legalName = "Regena Technologies Inc.";

export const heroFacts = [
  "$60 a patient, prepaid",
  "Misses refunded",
  "No setup fee",
  "Live in 10 business days",
  "One clinic per city",
] as const;

export const sampleReport = [
  { patient: "New patient", detail: "Laser · full legs", status: "showed", note: "Counts" },
  { patient: "Past patient", detail: "Last seen 14 months ago", status: "showed", note: "Counts" },
  { patient: "New patient", detail: "Body contouring consult", status: "no-show", note: "Doesn't count · rebooking" },
  { patient: "New patient", detail: "Skin · facial", status: "rebooked", note: "Counts when they show" },
  { patient: "Walk-in", detail: "Not from Regena", status: "excluded", note: "Never counts" },
] as const;

export const comparison = [
  { topic: "What you pay for", agency: "Leads and clicks, whether or not anyone shows up", regena: "$60 to $75 per patient who shows, prepaid. Every one we miss is refunded" },
  { topic: "Promise", agency: "None", regena: "100 new patients in 90 days" },
  { topic: "Who calls new leads", agency: "Your front desk, when they get to it", regena: "Our team, within minutes during your hours" },
  { topic: "No-shows", agency: "Your problem, and still billed", regena: "We chase and rebook them. They never count toward your 100" },
  { topic: "Past patients", agency: "Not included", regena: "We invite back patients you haven't seen in a while" },
  { topic: "After the first visit", agency: "Nothing", regena: "Follow-up so first visits turn into treatment plans" },
  { topic: "Commitment", agency: "3 to 6 month contracts", regena: "Month to month, with a 90-day guarantee" },
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
  { when: "Day 0", title: "Fit call and access", body: "We agree on the offer, your capacity and your city, then get access to your ad account, Facebook page and calendar." },
  { when: "Week 1", title: "We build it", body: "Ads, form, speed-to-lead, booking, confirmations, no-show recovery and show tracking." },
  { when: "Day 10", title: "You're live", body: "Campaigns on and our team working your leads, within 10 business days of getting access." },
  { when: "Every week", title: "A plain report", body: "Every appointment we booked, whether they showed, where they came from, and how close you are to 100." },
  { when: "Day 30", title: "33+ patients", body: "First checkpoint. If we're behind, we fix the offer, the ads or the follow-up, not later." },
  { when: "Day 60", title: "66+ patients", body: "Second checkpoint, same check." },
  { when: "Day 90", title: "100+ patients", body: "If we're short, you pick: a refund for every patient we missed, or we keep working free until 100." },
] as const;

export const countingRules = [
  { counts: true, text: "Anyone we booked through our ads, setter or texts who paid a deposit and showed up" },
  { counts: true, text: "New patients and past patients alike" },
  { counts: false, text: "No-shows and cancellations" },
  { counts: false, text: "Anyone already booked before we contacted them" },
] as const;

export const countingProcess = [
  "Your team marks each appointment as showed or no-show within 48 hours. Unmarked counts as showed.",
  "You get a weekly report with every appointment, by name and source.",
  "Checkpoints at day 30 (33+) and day 60 (66+), so you always know where you stand.",
  "At day 90, any patient we're short is refunded at your rate, or we keep working free until 100.",
] as const;

export const goodFit = [
  "You're a med spa or aesthetic clinic with a treatment people already ask for, like laser hair removal, body contouring or skin treatments",
  "You have room for about 35 more patients a month",
  "You can fund at least $100 a day in Meta ads for 90 days, paid directly to Meta",
  "Your team can mark appointments as showed or no-show",
] as const;

export const notFit = [
  "You can't take about 35 more patients a month",
  "You can't fund $100 a day in ads yet",
  "We already work with a clinic in your city",
  "You're in Florida or Quebec, where we aren't working yet",
] as const;

export const faqs = [
  {
    q: "How much does it cost?",
    a: "$60 a patient, prepaid: $6,000 for 100 patients over 90 days. Or $75 a patient on the monthly plan: $2,500 a month. No setup fee. Ads are on top, paid straight to Meta at $100 a day or more, about $9,000 over 90 days, so all-in it's roughly $150 to $165 a patient. US clinics pay in USD, Canadian clinics in CAD, same numbers.",
  },
  {
    q: "What if it doesn't work?",
    a: "We promise at least 100 new patients who pay a deposit and show up within 90 days. If we're short, you pick: we refund $60 ($75 on monthly) for every patient we missed, or ads pause and we keep working your leads free until you have 100. We check in at day 30 and day 60 so there are no surprises.",
  },
  {
    q: "Is there a contract?",
    a: "A simple agreement. The monthly plan is cancel any month. The guarantee holds when ads run at $100 a day or more for the full 90 days and monthly clinics stay all 90 days.",
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
    a: "Canada and the United States, except Florida and Quebec for now. We take one clinic per city so we never compete against ourselves.",
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
  capacity: {
    label: "How many more patients could you treat each month?",
    choices: [
      { value: "under-30", label: "Under 30" },
      { value: "30-50", label: "30 to 50" },
      { value: "50-100", label: "50 to 100" },
      { value: "100-plus", label: "100 or more" },
    ],
  },
  packagePrice: {
    label: "What does your main package cost?",
    choices: [
      { value: "under-1000", label: "Under $1,000" },
      { value: "1000-1500", label: "$1,000 to $1,500" },
      { value: "1500-2500", label: "$1,500 to $2,500" },
      { value: "2500-plus", label: "Over $2,500" },
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
    label: "Can you fund at least $100 a day in Meta ads for 90 days? It's paid directly to Meta, not to us.",
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
