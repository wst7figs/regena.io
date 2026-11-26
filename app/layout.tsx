import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

import { AttributionCapture } from "@/components/attribution-capture";
import { MetaPixel } from "@/components/meta-pixel";

import "./globals.css";
import "./site-pages.css";
import "./v2.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Regena | Patients in your chair, not just leads",
    template: "%s | Regena",
  },
  description:
    "Regena books 100 new patients in 90 days for med spas and aesthetic clinics: ads, speed-to-lead, booking, no-show recovery and reactivation. $60 a patient prepaid, plus ad spend.",
  metadataBase: new URL("https://regena.io"),
  openGraph: {
    type: "website",
    siteName: "Regena",
    url: "https://regena.io",
    title: "Regena | Patients in your chair, not just leads",
    description: "Regena books 100 new patients in 90 days for med spas and aesthetic clinics: ads, speed-to-lead, booking, no-show recovery and reactivation. $60 a patient prepaid, plus ad spend.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regena | Patients in your chair, not just leads",
    description: "Regena books 100 new patients in 90 days for med spas and aesthetic clinics: ads, speed-to-lead, booking, no-show recovery and reactivation. $60 a patient prepaid, plus ad spend.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f1eb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Regena",
    legalName: "Regena Technologies Inc.",
    url: "https://regena.io",
    email: "contact@regena.io",
    address: { "@type": "PostalAddress", addressRegion: "Alberta", addressCountry: "CA" },
  };
  return (
    <html lang="en" className={`${instrumentSans.variable} ${ibmPlexMono.variable}`} data-scroll-behavior="smooth">
      <body suppressHydrationWarning><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />{children}<AttributionCapture /><MetaPixel /></body>
    </html>
  );
}
