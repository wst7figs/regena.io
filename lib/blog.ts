import { createClient } from "next-sanity";

export type ArticleSection = {
  heading: string;
  id: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  featured?: boolean;
  sections: ArticleSection[];
  kind?: "field-note" | "press-release";
  heroImage?: string;
  pressReleaseBody?: string[];
  partnerUrl?: string;
};

export const launchArticles: Article[] = [
  {
    slug: "regena-named-an-openai-select-partner",
    title: "Regena Named an OpenAI Select Partner",
    excerpt: "Regena has been named an OpenAI Select Partner within the OpenAI Partner Network, strengthening its work helping healthcare organizations deploy practical AI systems.",
    category: "Company news",
    publishedAt: "2026-09-08",
    readingMinutes: 4,
    featured: true,
    kind: "press-release",
    heroImage: "/press/regena-openai-select-partner.png",
    partnerUrl: "https://openai.com/business/partners/",
    sections: [],
    pressReleaseBody: [
      "Edmonton, Alberta, September 8, 2026 – Regena, an AI implementation and patient growth infrastructure company focused on healthcare organizations, today announced that it has been named an OpenAI Select Partner within the OpenAI Partner Network.",
      "The OpenAI Partner Network is a global program for partners to build, sell, and deliver AI solutions with OpenAI. It brings together partners with deep industry expertise, delivery capabilities, and customer relationships while equipping them with resources, enablement, and support to help enterprises adopt OpenAI frontier models and products and turn them into measurable impact.",
      "As an OpenAI Select Partner, Regena will continue working with OpenAI to help organizations build, deploy, and scale AI solutions responsibly and effectively. This work will help organizations put GPT-6 Astra to work across more of their business, using deeper reasoning and computer use to complete complex workflows and deliver finished work.",
      "Regena focuses on helping healthcare organizations deploy AI across patient acquisition, communication, follow-up, booking, and operational workflows. Its systems include AI reception, speed-to-lead automation, missed-call recovery, automated patient follow-up, database reactivation, appointment booking, and workflow automation.",
      "\u201cBeing named an OpenAI Select Partner is an important milestone for Regena because it strengthens the foundation behind what we are already building for healthcare organizations,\u201d said Luan West, Founder and CEO of Regena. \u201cOur goal is to make AI practical, measurable, and directly tied to growth. We want clinics to be able to deploy AI in ways that improve the patient experience, create more operational leverage, and ultimately produce better business outcomes.\u201d",
      "Regena supports healthcare organizations including medical spas, aesthetic clinics, surgical practices, regenerative medicine clinics, and other patient-focused businesses with AI-powered systems designed to improve conversion, reduce revenue leakage, and give teams more time back.",
      "Recent client work has included helping a surgical practice increase consultation bookings by approximately 40% after improving speed-to-lead and implementing 24/7 AI voice support. Regena has also supported a medical aesthetics business with a database of more than 5,000 past clients, where reactivation efforts contributed to an approximately 50% increase in revenue during the month of the campaign.",
      "Looking ahead, Regena plans to expand its OpenAI-related offerings, invest further in technical delivery and AI enablement, strengthen its enterprise capabilities, and scale customer deployments across the healthcare sector.",
    ],
  },
  {
    slug: "why-patient-demand-disappears-between-inquiry-and-consultation",
    title: "Why patient demand disappears between inquiry and consultation",
    excerpt: "Most clinics do not lose patient demand in one dramatic moment. It disappears across small delays, unclear ownership, and disconnected handoffs that nobody sees as one operating journey.",
    category: "Patient journey",
    publishedAt: "2026-08-19",
    readingMinutes: 7,
    kind: "field-note",
    sections: [
      {
        id: "demand-is-a-moving-state",
        heading: "Demand is a moving state, not a lead record",
        paragraphs: [
          "A new inquiry is often treated as a name entering a database. In practice, it is a short window of patient intent. The person may be comparing clinics, asking a family member, waiting for a callback, or deciding whether the treatment feels credible and financially realistic.",
          "That intent changes while the clinic is responding. A fast answer does not automatically create a consultation, but every avoidable delay gives uncertainty more room to take over. The first operating question is therefore not how many leads arrived. It is what happened to each patient while intent was still active.",
        ],
      },
      {
        id: "handoffs-create-invisible-loss",
        heading: "Handoffs create invisible loss",
        paragraphs: [
          "The patient journey usually crosses advertising, a website or phone line, front-desk response, qualification, scheduling, reminders, and provider availability. Each part may work on its own while the overall journey still breaks between them.",
          "One team measures form submissions. Another sees missed calls. The calendar records appointments. The clinic later sees treatment revenue. Without a shared operating view, no one can tell whether the constraint was weak demand, slow response, unsuitable inquiries, scheduling friction, or poor attendance.",
        ],
      },
      {
        id: "response-and-booking-are-different",
        heading: "Response and booking are different jobs",
        paragraphs: [
          "Answering an inquiry is only the first protected handoff. The conversation must still identify what the patient wants, whether the clinic is an appropriate fit, what information is needed, and which next step makes sense.",
          "A clinic can improve pickup while leaving the booking path unchanged. It can also add automated follow-up while sending patients into a calendar with no useful context. Strong conversion connects response, qualification, booking, and confirmation as one designed sequence.",
        ],
      },
      {
        id: "build-the-operating-view",
        heading: "Build the operating view before adding more demand",
        paragraphs: [
          "The useful baseline is simple: inquiry source, response state, qualification state, booked consultation, attendance, and the commercial outcome the clinic is comfortable measuring. These states expose where momentum is disappearing without requiring a perfect analytics department.",
          "Once the journey is visible, the clinic can decide whether it needs more demand or needs to protect the demand it already has. That distinction prevents advertising from becoming an expensive way to feed a broken handoff.",
        ],
      },
    ],
  },
  {
    slug: "why-an-ai-receptionist-is-not-a-patient-conversion-system",
    title: "Why an AI receptionist is not a patient-conversion system",
    excerpt: "A voice agent can answer calls, but answering is only one operating layer. Clinics create stronger outcomes when conversations, qualification, booking, follow-up, visibility, and human ownership work together.",
    category: "Operating systems",
    publishedAt: "2026-08-12",
    readingMinutes: 6,
    sections: [
      {
        id: "the-interface-is-not-the-system",
        heading: "The interface is not the system",
        paragraphs: [
          "An AI receptionist is easy to understand because it resembles a familiar role. It answers, speaks, gathers information, and may schedule. That makes it a useful interface, but the interface alone does not define how a clinic converts patient intent.",
          "The operating system sits behind the conversation. It determines which inquiries enter, what the agent is allowed to say, how urgency and fit are handled, when a person takes over, where the booking is recorded, and what happens when the patient does not complete the next step.",
        ],
      },
      {
        id: "qualification-needs-clinic-context",
        heading: "Qualification needs clinic context",
        paragraphs: [
          "Different services require different preparation, geography, financial expectations, provider availability, and escalation rules. A generic script can collect answers without creating a reliable next step.",
          "Useful qualification is designed with the clinic. It routes clear-fit inquiries efficiently, protects edge cases, and avoids turning operational automation into medical guidance. Human review remains part of the system wherever judgment matters.",
        ],
      },
      {
        id: "booking-is-an-operating-handoff",
        heading: "Booking is an operating handoff",
        paragraphs: [
          "A calendar event is not the end of conversion. The appointment needs the right duration, provider, location, context, confirmation, reminder path, and rescheduling logic. Staff need to know what the patient was told and what should happen next.",
          "When these details live in separate tools or depend on memory, the receptionist can appear successful while the clinic inherits another queue to manage. The system should reduce those queues rather than move them around.",
        ],
      },
      {
        id: "measure-the-journey",
        heading: "Measure the journey the clinic can improve",
        paragraphs: [
          "A conversion system should show more than call volume. It should reveal response time, connected conversations, qualification outcomes, booked consultations, attendance, exceptions, and the source context attached to each stage.",
          "That operating view creates a practical improvement loop: inspect the constraint, change one part of the journey, watch the downstream state, and keep human accountability clear. AI supports the loop; it does not replace it.",
        ],
      },
    ],
  },
  {
    slug: "five-numbers-clinic-owners-should-track",
    title: "The five numbers clinic owners should track across the patient journey",
    excerpt: "Clinic owners do not need a complicated attribution model to find conversion loss. Five connected numbers can reveal whether the immediate constraint is demand, response, booking, attendance, or visibility.",
    category: "Measurement",
    publishedAt: "2026-08-05",
    readingMinutes: 8,
    sections: [
      {
        id: "start-with-connected-states",
        heading: "Start with connected states",
        paragraphs: [
          "A dashboard becomes useful when each number describes a real change in the patient journey. Total leads, calls, and appointments are less informative when they cannot be connected to one another.",
          "The goal is not to create perfect reporting. It is to establish enough shared visibility that leadership can locate the next operating constraint and verify whether a change improved the journey downstream.",
        ],
      },
      {
        id: "one-inquiries-received",
        heading: "1. New-patient inquiries received",
        paragraphs: [
          "Count new-patient inquiries by source and channel. Separate calls, forms, messages, referrals, and campaigns where practical. This establishes the demand entering the system without assuming every inquiry has equal intent.",
          "Look for consistency before drawing conclusions. A short campaign spike, seasonality, duplicate records, and existing-patient requests can distort the apparent volume.",
        ],
      },
      {
        id: "two-through-four-conversion",
        heading: "2–4. Connected conversations, bookings, and attendance",
        paragraphs: [
          "Connected conversations show whether the clinic reached the patient while intent was active. Booked consultations show whether the conversation produced a concrete next step. Attended consultations show whether that next step survived the time between booking and the visit.",
          "Read the three together. Strong contact with weak booking points toward qualification or scheduling friction. Strong booking with weak attendance points toward confirmation, expectation setting, reminders, rescheduling, or patient fit.",
        ],
      },
      {
        id: "five-commercial-outcome",
        heading: "5. The commercial outcome the clinic can verify",
        paragraphs: [
          "The final number should match what the clinic can reliably observe: completed consultations, accepted treatment plans, collected revenue, or another clearly defined commercial state. Choose one definition and keep it stable long enough to compare periods.",
          "This is not about forcing every patient interaction into a revenue claim. It is about connecting operations to a result leadership can inspect, while respecting clinical judgment, patient privacy, capacity, refunds, and the time between consultation and treatment.",
        ],
      },
      {
        id: "use-numbers-as-a-loop",
        heading: "Use the numbers as an operating loop",
        paragraphs: [
          "Review the five states as a sequence rather than a scorecard. Find the largest meaningful drop, inspect the workflow around it, and change the smallest controllable part of the system first.",
          "Measurement becomes valuable when it changes what the team does next. A smaller set of trusted states will usually outperform a large dashboard that nobody owns.",
        ],
      },
    ],
  },
];

const sanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_API_PROJECT_ID,
);

const sanityClient = sanityConfigured
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_API_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_API_DATASET ?? "production",
      apiVersion: "2026-08-19",
      useCdn: true,
    })
  : null;

const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  excerpt,
  category,
  publishedAt,
  readingMinutes,
  featured,
  sections[]{ heading, id, paragraphs }
}`;

function validArticle(value: unknown): value is Article {
  if (!value || typeof value !== "object") return false;
  const article = value as Partial<Article>;
  return Boolean(article.slug && article.title && article.excerpt && Array.isArray(article.sections));
}

export function findArticle(slug: string, articles: Article[] = launchArticles) {
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getArticles(): Promise<Article[]> {
  if (!sanityClient) return launchArticles;
  try {
    const articles = await sanityClient.fetch<unknown[]>(articlesQuery, {}, { next: { revalidate: 300 } });
    const validArticles = articles.filter(validArticle);
    if (!validArticles.length) return launchArticles;
    const managedSlugs = new Set(validArticles.map((article) => article.slug));
    return [...validArticles, ...launchArticles.filter((article) => !managedSlugs.has(article.slug))]
      .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
  } catch {
    return launchArticles;
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return findArticle(slug, articles);
}
