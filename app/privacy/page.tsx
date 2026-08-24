import type { Metadata } from "next";

import { LegalLayout, type LegalSection } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Privacy", description: "How Regena handles information submitted through this website." };

const sections: LegalSection[] = [
  { id: "scope", title: "Scope", content: <p>This notice describes information submitted through the Regena website. It covers business enquiries, clinic diagnostics, strategy-call requests, and Careers applications. It does not invite patients to submit health information.</p> },
  { id: "information", title: "Information we receive", content: <><p>Visitors may provide their name, business contact details, clinic information, operational answers, professional profiles, application responses, and a résumé.</p><p>Diagnostic calculations use the business figures a visitor provides to create illustrative scenarios. They are not medical assessments or promised commercial results.</p></> },
  { id: "use", title: "How information is used", content: <p>Regena uses submitted information to respond to enquiries, prepare diagnostic results, evaluate applications, operate the website, protect its systems, and improve the visitor experience.</p> },
  { id: "services", title: "Service providers", content: <><p>The website is hosted by Vercel. Email delivery uses Resend. Blog content is managed through Sanity. Careers résumés are stored in a private Vercel Blob store and are not exposed through a public browser response.</p><p>GoHighLevel scheduling and CRM synchronization are not active until separately connected and verified.</p></> },
  { id: "retention", title: "Retention and security", content: <p>Business enquiries and applications are retained only as long as reasonably needed for the purpose submitted, legal obligations, dispute resolution, or legitimate business records. Access is limited to people and providers who need it for those purposes.</p> },
  { id: "rights", title: "Choices and requests", content: <p>You may ask Regena to access, correct, or delete information you submitted, subject to applicable legal and operational requirements. You may also decline follow-up communications.</p> },
  { id: "contact", title: "Contact", content: <p>Privacy requests can be sent through the contact details provided by Regena during your business relationship. A dedicated privacy address will be published after the Google Workspace alias is finalized.</p> },
];

export default function PrivacyPage() { return <LegalLayout eyebrow="Legal" title="Privacy" description="How Regena intends to handle website and business-contact information." sections={sections} />; }
