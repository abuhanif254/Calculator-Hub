import React from "react";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AnimatedContent } from "./page.client";

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const META_BY_LOCALE: Record<
  string,
  {
    title: string;
    description: string;
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    faqs: { q: string; a: string }[];
  }
> = {
  en: {
    title: "Free Database Privacy Platform — PII Scanner, Data Masking & GDPR Compliance",
    description:
      "Scan databases for PII, apply masking rules, and achieve GDPR, HIPAA & PCI-DSS compliance. Free enterprise platform with 30+ detectors. No data leaves your browser.",
    breadcrumbHome: "Nexus Calculator",
    breadcrumbCurrent: "Data Privacy Platform",
    faqs: [
      {
        q: "What is PII scanning and why do I need it?",
        a: "PII (Personally Identifiable Information) scanning automatically detects sensitive data — names, emails, SSNs, credit card numbers, dates of birth — stored in your databases. Under GDPR, HIPAA, and PCI-DSS you are legally required to know where personal data resides. The Nexus platform scans your databases with 30+ detectors and produces a compliance-ready report in minutes.",
      },
      {
        q: "Is my data safe? Does any data leave my browser?",
        a: "In browser-side scan mode, your database credentials and all scanned data are processed entirely within your browser using WebAssembly. Nothing is sent to Nexus servers. For database scan mode connecting to remote servers, only anonymised metadata (column names, data types, sample statistics) is processed — never raw row values.",
      },
      {
        q: "Which databases are supported?",
        a: "Nexus Data Privacy Platform supports PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake, and Redshift. New database connectors are added regularly.",
      },
      {
        q: "Which compliance frameworks are supported?",
        a: "The platform provides built-in compliance dashboards and reports for GDPR (EU General Data Protection Regulation), HIPAA (US Health Insurance Portability and Accountability Act), PCI-DSS (Payment Card Industry Data Security Standard), and SOC 2.",
      },
      {
        q: "Is it really free? What is the catch?",
        a: "Yes, completely free. The platform is open source and hosted at no cost. There are no usage limits, no credit card required, and no paywalled features.",
      },
    ],
  },
  es: {
    title: "Plataforma de Privacidad de Bases de Datos — Escáner PII, Enmascaramiento y Cumplimiento RGPD",
    description:
      "Escanee bases de datos en busca de datos personales (PII), aplique reglas de enmascaramiento y cumpla con RGPD, HIPAA y PCI-DSS. Plataforma gratuita con más de 30 detectores locales.",
    breadcrumbHome: "Nexus Calculator",
    breadcrumbCurrent: "Plataforma de Privacidad de Datos",
    faqs: [
      {
        q: "¿Qué es el escaneo de PII y por qué lo necesito?",
        a: "El escaneo de PII (Información de Identificación Personal) detecta automáticamente datos sensibles —nombres, correos electrónicos, documentos de identidad, tarjetas de crédito y fechas de nacimiento— almacenados en sus bases de datos. Bajo RGPD, HIPAA y PCI-DSS es obligatorio identificar dónde residen los datos personales.",
      },
      {
        q: "¿Están seguros mis datos? ¿Sale algún dato de mi navegador?",
        a: "En el modo de escaneo local en navegador, todos los datos se procesan íntegramente dentro de su navegador mediante WebAssembly; nada se envía a servidores externos.",
      },
      {
        q: "¿Qué motores de bases de datos son compatibles?",
        a: "La plataforma admite PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake y Redshift.",
      },
      {
        q: "¿Qué normativas de cumplimiento están soportadas?",
        a: "Incluye paneles de auditoría e informes descargables para RGPD (GDPR), HIPAA, PCI-DSS y SOC 2 con listas de verificación y puntuación de preparación.",
      },
      {
        q: "¿Es realmente gratuito?",
        a: "Sí, 100 % gratuito y de código abierto, sin límites de uso ni tarjeta de crédito requerida.",
      },
    ],
  },
  fr: {
    title: "Plateforme de Confidentialité des Bases de Données — Scanner PII, Masquage & Conformité RGPD",
    description:
      "Analysez vos bases de données pour détecter les données personnelles (PII), appliquez le masquage cryptographique et assurez la conformité RGPD, HIPAA et PCI-DSS localement.",
    breadcrumbHome: "Nexus Calculator",
    breadcrumbCurrent: "Plateforme de Confidentialité des Données",
    faqs: [
      {
        q: "Qu’est-ce que l’analyse PII et pourquoi est-elle indispensable ?",
        a: "L’analyse PII (données à caractère personnel) détecte automatiquement les informations sensibles — noms, adresses e-mail, numéros de sécurité sociale, cartes bancaires (PAN), dates de naissance — stockées dans vos bases de données afin de répondre aux exigences du RGPD, de la loi HIPAA et de la norme PCI-DSS.",
      },
      {
        q: "Mes données sont-elles sécurisées ? Quittent-elles mon navigateur ?",
        a: "En mode d’analyse locale, vos données sont traitées intégralement dans votre navigateur via WebAssembly. Aucune donnée brute ne quitte votre appareil.",
      },
      {
        q: "Quelles bases de données sont prises en charge ?",
        a: "La plateforme prend en charge PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake et Redshift.",
      },
      {
        q: "Quels référentiels de conformité sont inclus ?",
        a: "La plateforme intègre des tableaux de bord et rapports d’audit pour le RGPD (articles 25, 30 et 32), HIPAA Safe Harbor, PCI-DSS et SOC 2.",
      },
      {
        q: "Est-ce vraiment gratuit ?",
        a: "Oui, totalement gratuit et open source, sans carte bancaire ni limite artificielle de fonctionnalités.",
      },
    ],
  },
  de: {
    title: "Datenbank-Datenschutz-Plattform — PII-Scanner, Datenmaskierung & DSGVO-Compliance",
    description:
      "Scannen Sie Datenbanken auf personenbezogene Daten (PII), wenden Sie Maskierungsregeln an und erfüllen Sie DSGVO-, HIPAA- und PCI-DSS-Anforderungen lokal im Browser.",
    breadcrumbHome: "Nexus Calculator",
    breadcrumbCurrent: "Datenbank-Datenschutz-Plattform",
    faqs: [
      {
        q: "Was ist PII-Scanning und warum benötige ich es?",
        a: "Beim PII-Scanning (Erkennung personenbezogener Daten) werden sensible Datenbankfelder wie Namen, E-Mail-Adressen, Sozialversicherungsnummern, Kreditkartennummern (PAN) und Geburtsdaten automatisch erkannt, um DSGVO-, HIPAA- und PCI-DSS-Vorgaben zu erfüllen.",
      },
      {
        q: "Sind meine Daten sicher? Verlassen Daten meinen Browser?",
        a: "Im lokalen Browser-Scan-Modus werden sämtliche Daten vollständig innerhalb Ihres Browsers über WebAssembly verarbeitet — es werden keinerlei Rohdaten an externe Server übertragen.",
      },
      {
        q: "Welche Datenbanksysteme werden unterstützt?",
        a: "Unterstützt werden PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake und Redshift.",
      },
      {
        q: "Welche Compliance-Standards werden abgedeckt?",
        a: "Integrierte Compliance-Dashboards und Audit-Berichte stehen für DSGVO (Art. 25, 30 und 32), HIPAA, PCI-DSS und SOC 2 bereit.",
      },
      {
        q: "Ist die Plattform wirklich kostenlos?",
        a: "Ja, vollständig kostenlos und Open Source — ohne Kreditkarte, ohne Zeilenlimits und ohne Bezahlschranken.",
      },
    ],
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
  const { optimizeSerpTitle } = await import("@/lib/utils/seoUtils");
  const localizedMeta = META_BY_LOCALE[locale] || META_BY_LOCALE.en;

  return {
    title: optimizeSerpTitle(localizedMeta.title, locale, "page"),
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
          alt: localizedMeta.title,
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
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };
}

export default async function DatabasePrivacyLanding({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const baseUrl = "https://www.nexuscalculator.net";
  const localizedMeta = META_BY_LOCALE[locale] || META_BY_LOCALE.en;

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: localizedMeta.breadcrumbCurrent,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    url: `${baseUrl}/${locale}/database-privacy`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: localizedMeta.description,
    creator: {
      "@type": "Organization",
      name: "Nexus Calculator Hub",
      url: `${baseUrl}/${locale}`,
    },
    screenshot: `${baseUrl}/icons/icon-512x512.png`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localizedMeta.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: localizedMeta.breadcrumbHome,
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: localizedMeta.breadcrumbCurrent,
        item: `${baseUrl}/${locale}/database-privacy`,
      },
    ],
  };

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
      <AnimatedContent initialLocale={locale} />
    </div>
  );
}
