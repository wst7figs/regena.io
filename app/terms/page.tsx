import type { Metadata } from "next";

import { LegalLayout, type LegalSection } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Terms", description: "Draft website terms structure for Regena." };

const sections: LegalSection[] = [
  { id: "scope", title: "Website scope", content: <p>These draft terms are a structural preview for legal review. They do not replace signed client agreements or counsel-approved website terms.</p> },
  { id: "acceptable-use", title: "Acceptable use", content: <p>Visitors may use the website for lawful business evaluation and may not interfere with, misuse, or attempt to compromise the service.</p> },
  { id: "information", title: "Information and claims", content: <p>Website information is general business information. It is not medical, legal, or financial advice, and observed client outcomes are not guarantees.</p> },
  { id: "intellectual-property", title: "Intellectual property", content: <p>The final terms will define ownership and permitted use of Regena branding, content, interface designs, and other protected materials.</p> },
  { id: "services", title: "Third-party services", content: <p>Links and connected services may be governed by their own terms. Final language must reflect the actual production integrations.</p> },
  { id: "limitations", title: "Limitations", content: <p>Final warranty, availability, liability, jurisdiction, and dispute provisions require counsel review before publication.</p> },
  { id: "contact", title: "Contact", content: <p>Final legal contact details will be added before publication.</p> },
];

export default function TermsPage() { return <LegalLayout eyebrow="Legal" title="Terms" description="The intended rules for using the Regena website." sections={sections} />; }
