import React from "react";
import { Metadata } from "next";
import { AnimatedContent } from "./page.client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || "https://nexuscalculator.net";

  return {
    title:
      "Free Enterprise Database Anonymizer — GDPR · HIPAA · PCI-DSS | Nexus",
    description:
      "Scan, mask, and anonymize sensitive data across your databases. Free PII scanner with 30+ detectors, masking rules, compliance reporting. GDPR, HIPAA, PCI-DSS ready.",
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy`,
      languages: { "x-default": `${baseUrl}/en/database-privacy` },
    },
    openGraph: {
      title:
        "Free Enterprise Database Anonymizer — GDPR · HIPAA · PCI-DSS | Nexus",
      description:
        "Scan, mask, and anonymize sensitive data across your databases. Free PII scanner with 30+ detectors, masking rules, compliance reporting. GDPR, HIPAA, PCI-DSS ready.",
      url: `${baseUrl}/${locale}/database-privacy`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Free Enterprise Database Anonymizer — GDPR · HIPAA · PCI-DSS | Nexus",
      description:
        "Scan, mask, and anonymize sensitive data across your databases. Free PII scanner with 30+ detectors, masking rules, compliance reporting. GDPR, HIPAA, PCI-DSS ready.",
    },
  };
}

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DataPrivacy Enterprise — Database Anonymizer",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Free enterprise-grade database anonymization platform. Scan for PII, apply masking rules, enforce GDPR/HIPAA/PCI-DSS compliance.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "PII Auto-Scanner",
    "Data Masking Engine",
    "GDPR Compliance",
    "HIPAA Compliance",
    "Job Scheduler",
    "Audit Logs",
    "API Keys",
    "Webhooks",
  ],
  keywords:
    "database anonymizer, data masking, PII scanner, GDPR compliance, HIPAA compliance",
};

export default function DatabasePrivacyLanding() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Animated interactive sections */}
      <AnimatedContent />
    </div>
  );
}
