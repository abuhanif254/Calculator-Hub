import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || "https://nexuscalculator.net";
  return {
    title: "Dashboard | DataPrivacy — Nexus",
    description:
      "Monitor your database privacy metrics, scan jobs, and sensitive data exposure risks in real-time.",
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy/dashboard`,
      languages: { "x-default": `${baseUrl}/en/database-privacy/dashboard` },
    },
    openGraph: {
      title: "Dashboard | DataPrivacy — Nexus",
      description:
        "Monitor your database privacy metrics, scan jobs, and sensitive data exposure risks in real-time.",
      type: "website",
      url: `${baseUrl}/${locale}/database-privacy/dashboard`,
    },
  };
}
