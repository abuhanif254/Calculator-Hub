import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || "https://nexuscalculator.net";

  return {
    title: "DataPrivacy — Nexus",
    description:
      "DataPrivacy platform by Nexus for GDPR compliance, data anonymization, and secure masking.",
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy/masking`,
      languages: { "x-default": `${baseUrl}/en/database-privacy/masking` },
    },
    openGraph: {
      title: "DataPrivacy — Nexus",
      description:
        "DataPrivacy platform by Nexus for GDPR compliance, data anonymization, and secure masking.",
      url: `${baseUrl}/${locale}/database-privacy/masking`,
      type: "website",
    },
  };
}
