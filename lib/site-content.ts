export type SiteRoute =
  | "/"
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
  linkedin: string;
};

export type ApproachStep = {
  id: "audit" | "architect" | "build" | "launch" | "operate" | "improve";
  label: string;
  summary: string;
  detail: string;
};

export const siteRoutes: SiteRoute[] = [
  "/",
  "/solutions",
  "/solutions/patient-conversion-system",
  "/solutions/growth-partnership",
  "/approach",
  "/clinics",
  "/outcomes",
  "/company",
  "/careers",
  "/blog",
  "/quiz",
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
  { label: "Solutions", href: "/solutions", children: solutions },
  { label: "Our Approach", href: "/approach" },
  { label: "For Clinics", href: "/clinics" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Blog", href: "/blog" },
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

export const teamMembers: TeamMember[] = [
  { name: "Luan West", role: "CEO & Co-Founder", initials: "LW", ownership: "Company direction, market, positioning, and commercial accountability.", linkedin: "https://www.linkedin.com/in/luanwest/" },
  { name: "Jean-Pierre", role: "COO & Co-Founder", initials: "JP", ownership: "Operations, delivery systems, implementation quality, and client success.", linkedin: "https://www.linkedin.com/in/jean-pierre-van-eeden-0a667726b/" },
  { name: "Julian Hollen", role: "AI Engineer & Software Developer", initials: "JH", ownership: "AI systems, software development, integrations, and technical reliability.", linkedin: "https://www.linkedin.com/in/julianholien/" },
  { name: "Shoham Zahir", role: "CSO", initials: "SZ", ownership: "Growth strategy, commercial systems, and strategic execution.", linkedin: "https://www.linkedin.com/in/shoham-zahir-77151a325/" },
];

export const footerGroups = [
  {
    label: "Solutions",
    links: [
      { label: "Patient Conversion System", href: "/solutions/patient-conversion-system" },
      { label: "Growth Partnership", href: "/solutions/growth-partnership" },
      { label: "Compare Solutions", href: "/solutions" },
    ],
  },
  {
    label: "Explore",
    links: [
      { label: "Our Approach", href: "/approach" },
      { label: "For Clinics", href: "/clinics" },
      { label: "Outcomes", href: "/outcomes" },
      { label: "Company", href: "/company" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Clinic Diagnostic", href: "/quiz" },
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
