import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

import "./globals.css";
import "./site-pages.css";

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
    default: "Regena | Patient-growth infrastructure",
    template: "%s | Regena",
  },
  description:
    "A managed growth system for regenerative and longevity clinics.",
  metadataBase: new URL("https://regena.io"),
  openGraph: {
    type: "website",
    siteName: "Regena",
    url: "https://regena.io",
    title: "Regena | Patient-growth infrastructure",
    description: "A managed growth system for regenerative and longevity clinics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regena | Patient-growth infrastructure",
    description: "A managed growth system for regenerative and longevity clinics.",
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
    legalName: "Regenix Technologies Incorporated",
    url: "https://regena.io",
    email: "contact@regena.io",
    address: { "@type": "PostalAddress", addressRegion: "Alberta", addressCountry: "CA" },
  };
  return (
    <html lang="en" className={`${instrumentSans.variable} ${ibmPlexMono.variable}`} data-scroll-behavior="smooth">
      <body suppressHydrationWarning><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />{children}</body>
    </html>
  );
}
