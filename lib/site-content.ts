export type SiteRoute =
  | "/"
  | "/apply"
  | "/solutions"
  | "/solutions/patient-conversion-system"
  | "/solutions/growth-partnership"
  | "/approach"
  | "/clinics"
  | "/outcomes"
  | "/company"
  | "/careers"
  | "/blog"
  | "/quiz"
  | "/book"
  | "/privacy"
  | "/terms";

export type Solution = {
  slug: "patient-conversion-system" | "growth-partnership";
  name: string;
  eyebrow: string;
  shortDescription: string;
  routingCue: string;
  href: SiteRoute;
};

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  ownership: string;
  // One plain line on what this person does for a partner clinic (homepage "Meet the team").
  forClinics: string;
  linkedin: string;
  photo: string;
};

export type ApproachStep = {
  id: "audit" | "architect" | "build" | "launch" | "operate" | "improve";
  label: string;
  summary: string;
  detail: string;
};

// Retired v1 pages (/solutions*, /approach, /clinics, /outcomes, /quiz) redirect to "/" in next.config.ts.
export const siteRoutes: SiteRoute[] = [
  "/",
  "/apply",
  "/company",
  "/careers",
  "/blog",
  "/book",
  "/privacy",
  "/terms",
];

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

export const siteNav = [
  { label: "How it works", href: "/#how" },
  { label: "What counts", href: "/#counts" },
  { label: "Who it's for", href: "/#fit" },
  { label: "FAQ", href: "/#faq" },
  { label: "Company", href: "/company" },
] as const;

export const approachSteps: ApproachStep[] = [
  { id: "audit", label: "Audit", summary: "Find the real constraint.", detail: "Map demand sources, response time, booking handoffs, attendance, and measurement before prescribing a system." },
  { id: "architect", label: "Architect", summary: "Design the operating model.", detail: "Define the patient journey, scripts, integrations, ownership, exceptions, and the metrics that matter." },
  { id: "build", label: "Build", summary: "Connect the system.", detail: "Configure the workflows and operating view around the clinic rather than forcing the clinic around a tool." },
  { id: "launch", label: "Launch", summary: "Release under supervision.", detail: "Test live scenarios, review conversations, train the team, and resolve edge cases before scale." },
  { id: "operate", label: "Operate", summary: "Manage what happens daily.", detail: "Monitor conversations, bookings, exceptions, and handoffs with clear human accountability." },
  { id: "improve", label: "Improve", summary: "Refine against outcomes.", detail: "Use the operating data to remove the next bottleneck and strengthen the full patient journey." },
];

export const clinicCriteria = [
  { label: "Patient demand", description: "Enough legitimate inquiry volume to reveal where conversion is leaking." },
  { label: "Capacity", description: "Providers and teams have room to serve additional qualified patients." },
  { label: "Patient value", description: "The economics justify a managed system rather than another isolated tool." },
  { label: "System access", description: "The clinic can provide access to the workflows and data needed to improve performance." },
  { label: "Operational will", description: "Leadership is prepared to change process when the evidence supports it." },
] as const;

// Team sections are hidden until new team photos are ready (Luan, Nov 2026).
// Set to true to bring back the homepage "Meet the team" section, the /company team grid and the links to them.
export const showTeam = false;

export const teamMembers: TeamMember[] = [
  { name: "Luan West", role: "CEO & Co-Founder", initials: "LW", ownership: "Company direction, market, positioning, and commercial accountability.", forClinics: "Runs your first call and sets the plan for your clinic and your area.", linkedin: "https://www.linkedin.com/in/luanwest/", photo: "/team/luan-west.webp" },
  { name: "Jean-Pierre van Eeden", role: "COO & Co-Founder", initials: "JP", ownership: "Operations, delivery systems, implementation quality, and client success.", forClinics: "Runs onboarding and the day-to-day work: follow-up, booking, confirmations and reminders.", linkedin: "https://www.linkedin.com/in/jean-pierre-van-eeden-0a667726b/", photo: "/team/jean-pierre-van-eeden.webp" },
  { name: "Julian Hollen", role: "CTO", initials: "JH", ownership: "AI systems, software development, integrations, and technical reliability.", forClinics: "Builds the systems and tracking that show which ads turn into patients in your chair.", linkedin: "https://www.linkedin.com/in/julianholien/", photo: "/team/julian-hollen.webp" },
  { name: "Shoham Zahir", role: "CSO", initials: "SZ", ownership: "Growth strategy, commercial systems, and strategic execution.", forClinics: "Shapes the campaigns and offers we run for your clinic.", linkedin: "https://www.linkedin.com/in/shoham-zahir-77151a325/", photo: "/team/shoham-zahir.webp" },
];

export const footerGroups = [
  {
    label: "Program",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "What counts", href: "/#counts" },
      { label: "Who it's for", href: "/#fit" },
      { label: "FAQ", href: "/#faq" },
      { label: "Check your area", href: "/apply" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About Regena", href: "/company" },
      ...(showTeam ? [{ label: "Meet the team", href: "/#team" }] : []),
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;
