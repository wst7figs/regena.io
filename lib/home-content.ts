import {
  Activity,
  Bot,
  CalendarCheck2,
  ChartNoAxesCombined,
  CircleDollarSign,
  MessageSquareText,
  Network,
  PhoneCall,
  Radar,
  RefreshCcw,
  Route,
  UserRoundCheck,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type JourneyStage = {
  id: string;
  label: string;
  title: string;
  description: string;
  detail: string;
  icon: typeof PhoneCall;
};

export const navItems = [
  { label: "System", href: "#system" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Approach", href: "#approach" },
  { label: "Client story", href: "#story" },
] as const satisfies readonly NavItem[];

export const journeyStages = [
  {
    id: "acquire",
    label: "Acquire",
    title: "Capture demand",
    description: "Bring every source into one visible journey.",
    detail: "Calls, web, ads and referrals arrive with their source attached.",
    icon: Radar,
  },
  {
    id: "respond",
    label: "Respond",
    title: "Answer immediately",
    description: "Keep intent warm with a fast, useful response.",
    detail: "Voice, chat and human operators work from the same patient context.",
    icon: MessageSquareText,
  },
  {
    id: "qualify",
    label: "Qualify",
    title: "Route intelligently",
    description: "Match the right patient to the right next step.",
    detail: "Intent, service fit and location guide a focused conversation.",
    icon: Route,
  },
  {
    id: "book",
    label: "Book",
    title: "Remove scheduling friction",
    description: "Turn qualified interest into a confirmed consultation.",
    detail: "Real-time availability, confirmations and follow-up stay connected.",
    icon: CalendarCheck2,
  },
  {
    id: "enroll",
    label: "Enroll",
    title: "Connect care to revenue",
    description: "Carry context through consultation and follow-through.",
    detail: "The clinic sees what happened, what worked and what needs attention.",
    icon: UserRoundCheck,
  },
] as const satisfies readonly JourneyStage[];

export const frictionPoints = [
  {
    number: "01",
    title: "Demand arrives fragmented",
    description: "Calls, forms, ads and referrals reach different systems with no shared view of intent.",
  },
  {
    number: "02",
    title: "Speed disappears between handoffs",
    description: "Every delay between inquiry, response and booking gives a high-intent patient time to leave.",
  },
  {
    number: "03",
    title: "Revenue becomes difficult to trace",
    description: "Teams see activity, but not the complete path from demand to consultation and enrollment.",
  },
] as const;

export const infrastructureLayers = [
  {
    label: "Demand layer",
    title: "See every source",
    description: "Campaigns, local visibility, referrals and direct inquiries enter one operating view.",
    icon: Network,
  },
  {
    label: "Conversion layer",
    title: "Move while intent is high",
    description: "Voice, chat, qualification, scheduling and follow-up behave like one coordinated team.",
    icon: Bot,
  },
  {
    label: "Continuity layer",
    title: "Improve the whole journey",
    description: "Reporting, human oversight and recurring optimization turn activity into an operating system.",
    icon: RefreshCcw,
  },
] as const;

export const proofMetrics = [
  { label: "Calls answered", value: "82%", trend: "Illustrative: 60% → 82%", icon: Activity },
  { label: "Consultations booked", value: "31%", trend: "Illustrative: 24% → 31%", icon: CalendarCheck2 },
  { label: "Attended consults", value: "68", trend: "Illustrative: 52 → 68 / month", icon: CircleDollarSign },
  { label: "Response time", value: "< 1 min", trend: "Illustrative: live after-hours coverage", icon: ChartNoAxesCombined },
] as const;

export const fitCriteria = [
  "A high-value patient journey with room to improve conversion",
  "Enough demand to justify a real operating system",
  "A team willing to improve process, not just add another tool",
] as const;
