import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || "https://nexuscalculator.net";
  return {
    title: "Anonymization Jobs Manager | Nexus DataPrivacy",
    description:
      "Schedule, track, and manage data privacy jobs including PII scanning, masking, and data anonymization tasks across your databases.",
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy/jobs`,
      languages: { "x-default": `${baseUrl}/en/database-privacy/jobs` },
    },
    openGraph: {
      title: "Anonymization Jobs Manager | Nexus DataPrivacy",
      description:
        "Schedule, track, and manage data privacy jobs including PII scanning, masking, and data anonymization tasks across your databases.",
      url: `${baseUrl}/${locale}/database-privacy/jobs`,
      type: "website",
    },
  };
}
