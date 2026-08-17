import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || "https://www.nexuscalculator.net";
  return {
    title: "Platform Monitoring & Performance | Nexus DataPrivacy",
    description:
      "Monitor real-time performance, system health, and worker node status for your Data Privacy operations and jobs.",
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy/monitoring`,
      languages: { "x-default": `${baseUrl}/en/database-privacy/monitoring` },
    },
    openGraph: {
      title: "Platform Monitoring & Performance | Nexus DataPrivacy",
      description:
        "Monitor real-time performance, system health, and worker node status for your Data Privacy operations and jobs.",
      url: `${baseUrl}/${locale}/database-privacy/monitoring`,
      type: "website",
    },
  };
}
