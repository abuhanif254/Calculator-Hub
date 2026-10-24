import React from "react";
import { Metadata } from "next";
import { AnimatedContent } from "./page.client";

const META_BY_LOCALE: Record<string, { title: string; description: string }> = {
  en: {
    title: "Free Database Privacy Platform — PII Scanner, Data Masking & GDPR Compliance",
    description:
      "Scan databases for PII, apply masking rules, and achieve GDPR, HIPAA & PCI-DSS compliance. Free enterprise platform with 30+ detectors. No data leaves your browser.",
  },
  es: {
    title: "Plataforma de Privacidad de Bases de Datos — Escáner PII, Enmascaramiento y Cumplimiento GDPR",
    description:
      "Escanee bases de datos en busca de PII, aplique reglas de enmascaramiento de datos y cumpla con GDPR, HIPAA y PCI-DSS. Plataforma gratuita con más de 30 detectores locales.",
  },
  fr: {
    title: "Plateforme de Confidentialité des Bases de Données — Scanner PII, Masquage & Conformité RGPD",
    description:
      "Analysez vos bases de données pour détecter les données personnelles (PII), appliquez le masquage et assurez la conformité RGPD, HIPAA et PCI-DSS localement.",
  },
  de: {
    title: "Datenbank-Datenschutz-Plattform — PII-Scanner, Datenmaskierung & DSGVO-Compliance",
    description:
      "Scannen Sie Datenbanken auf personenbezogene Daten (PII), wenden Sie Maskierungsregeln an und erfüllen Sie DSGVO-, HIPAA- und PCI-DSS-Anforderungen lokal im Browser.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.nexuscalculator.net";
  const ogImage = `${baseUrl}/icons/icon-512x512.png`;
  const localizedMeta = META_BY_LOCALE[locale] || META_BY_LOCALE.en;

  const supportedLocales = ["en", "es", "fr", "de"];
  const hreflangLanguages: Record<string, string> = {
    "x-default": `${baseUrl}/en/database-privacy`,
  };
  supportedLocales.forEach((l) => {
    hreflangLanguages[l] = `${baseUrl}/${l}/database-privacy`;
  });

  return {
    title: localizedMeta.title,
    description: localizedMeta.description,
    keywords: [
      "PII scanning",
      "data masking",
      "database privacy",
      "GDPR compliance",
      "HIPAA compliance",
      "PCI DSS",
      "data anonymization",
      "database security",
      "data pseudonymization",
      "sensitive data discovery",
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy`,
      languages: hreflangLanguages,
    },
    openGraph: {
      title: `${localizedMeta.title} | Nexus`,
      description: localizedMeta.description,
      url: `${baseUrl}/${locale}/database-privacy`,
      type: "website",
      siteName: "Nexus Calculator",
      locale: locale,
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: "Nexus Data Privacy Platform — Free PII Scanner & Data Masking",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localizedMeta.title,
      description: localizedMeta.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nexus Data Privacy Platform",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free enterprise platform to detect PII, apply masking rules, and track compliance with GDPR, HIPAA and PCI-DSS. All processing in-browser — no data leaves your device.",
  featureList: [
    "PII Detection & Database Scanning (30+ detectors)",
    "Data Masking & Anonymization",
    "GDPR Compliance Tracking",
    "HIPAA Compliance Tracking",
    "PCI-DSS Compliance Tracking",
    "SOC 2 Compliance Tracking",
    "Audit Logs & Reports",
    "API Keys Management",
    "Team Management & RBAC",
    "Secrets Vault (AES-256)",
    "Webhook Integrations",
    "Job Scheduler",
  ],
  creator: {
    "@type": "Organization",
    name: "Nexus Calculator Hub",
    url: "https://www.nexuscalculator.net/en",
  },
  screenshot: "https://www.nexuscalculator.net/icons/icon-512x512.png",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is PII scanning and why do I need it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PII (Personally Identifiable Information) scanning automatically detects sensitive data — names, emails, SSNs, credit card numbers, dates of birth — stored in your databases. Under GDPR, HIPAA, and PCI-DSS you are legally required to know where personal data resides. The Nexus platform scans your databases with 30+ detectors and produces a compliance-ready report in minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data safe? Does any data leave my browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In browser-side scan mode, your database credentials and all scanned data are processed entirely within your browser using WebAssembly. Nothing is sent to Nexus servers. For database scan mode connecting to remote servers, only anonymised metadata (column names, data types, sample statistics) is processed — never raw row values.",
      },
    },
    {
      "@type": "Question",
      name: "Which databases are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nexus Data Privacy Platform supports PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake, and Redshift. New database connectors are added regularly.",
      },
    },
    {
      "@type": "Question",
      name: "Which compliance frameworks are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The platform provides built-in compliance dashboards and reports for GDPR (EU General Data Protection Regulation), HIPAA (US Health Insurance Portability and Accountability Act), PCI-DSS (Payment Card Industry Data Security Standard), and SOC 2. Each framework has a dedicated checklist, scoring system, and downloadable compliance report.",
      },
    },
    {
      "@type": "Question",
      name: "Is it really free? What is the catch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. The platform is open source and hosted at no cost. There are no usage limits, no credit card required, and no paywalled features. Enterprise features including unlimited databases, job scheduling, team management, API access, AES-256 secrets vault, and all compliance frameworks are included for free.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Nexus Calculator",
      item: "https://www.nexuscalculator.net/en",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Data Privacy Platform",
      item: "https://www.nexuscalculator.net/en/database-privacy",
    },
  ],
};

export default function DatabasePrivacyLanding() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Animated interactive sections */}
      <AnimatedContent />
    </div>
  );
}
