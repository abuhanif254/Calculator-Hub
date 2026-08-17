import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || "https://www.nexuscalculator.net";
  return {
    title: "GDPR · HIPAA · PCI-DSS Compliance Center | Nexus DataPrivacy",
    description:
      "Track and manage your database compliance across GDPR, HIPAA, PCI-DSS, and SOC 2 frameworks with automated checks and reporting.",
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy/compliance`,
      languages: { "x-default": `${baseUrl}/en/database-privacy/compliance` },
    },
    openGraph: {
      title: "GDPR · HIPAA · PCI-DSS Compliance Center | Nexus DataPrivacy",
      description:
        "Track and manage your database compliance across GDPR, HIPAA, PCI-DSS, and SOC 2 frameworks with automated checks and reporting.",
      url: `${baseUrl}/${locale}/database-privacy/compliance`,
      type: "website",
    },
  };
}
