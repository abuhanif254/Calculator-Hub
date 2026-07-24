import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || "https://nexuscalculator.net";
  return {
    title:
      "Free PII Scanner — Detect Sensitive Data in SQL, CSV & JSON | Nexus DataPrivacy",
    description:
      "Scan SQL schemas, CSV files, and JSON data for PII instantly. Detects emails, SSNs, credit cards, phone numbers, IPs and 11 more sensitive data types. Free, browser-side, GDPR-ready.",
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy/scanner`,
      languages: { "x-default": `${baseUrl}/en/database-privacy/scanner` },
    },
    openGraph: {
      title: "Free PII Scanner Tool — DataPrivacy Platform",
      description:
        "Detect sensitive data across SQL, CSV, JSON instantly in your browser. 11+ PII detectors, masking preview, export results.",
      type: "website",
      url: `${baseUrl}/${locale}/database-privacy/scanner`,
    },
  };
}
