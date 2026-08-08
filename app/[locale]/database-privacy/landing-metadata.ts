import type { Metadata } from "next";

const baseUrl = process.env.APP_URL || "https://nexuscalculator.net";

export const metadata: Metadata = {
  title: "Database Privacy Platform — PII Scanner, Masking & GDPR Compliance | Nexus",
  description:
    "Detect PII in databases, apply masking rules, and track GDPR, HIPAA & PCI-DSS compliance. Browser-side anonymization. Zero data leaves your device. Free to start.",
  keywords: [
    "database privacy",
    "PII scanner",
    "data masking",
    "GDPR compliance",
    "HIPAA compliance",
    "PCI-DSS",
    "data anonymization",
    "database security",
    "data protection platform"
  ],
  openGraph: {
    title: "Database Privacy Platform — PII Scanner, Masking & GDPR Compliance | Nexus",
    description:
      "Detect PII in databases, apply masking rules, and track GDPR, HIPAA & PCI-DSS compliance. Browser-side anonymization. Zero data leaves your device. Free to start.",
    url: `${baseUrl}/en/database-privacy`,
    siteName: "Nexus Calculator Hub",
    type: "website",
    images: [
      {
        url: `${baseUrl}/icons/icon-512x512.png`,
        width: 512,
        height: 512,
        alt: "Enterprise Database Anonymizer Platform by Nexus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Database Privacy Platform — PII Scanner, Masking & GDPR Compliance | Nexus",
    description:
      "Detect PII in databases, apply masking rules, and track GDPR, HIPAA & PCI-DSS compliance. Browser-side anonymization. Zero data leaves your device. Free to start.",
    images: [`${baseUrl}/icons/icon-512x512.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: `${baseUrl}/en/database-privacy`,
  },
};
