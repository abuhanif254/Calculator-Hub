import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || "https://www.nexuscalculator.net";
  return {
    title: "Database Connections Manager | Nexus DataPrivacy",
    description:
      "Manage and monitor your database connections for data privacy scanning and anonymization. Supports PostgreSQL, MySQL, MongoDB, and more.",
    alternates: {
      canonical: `${baseUrl}/${locale}/database-privacy/connections`,
      languages: { "x-default": `${baseUrl}/en/database-privacy/connections` },
    },
    openGraph: {
      title: "Database Connections Manager | Nexus DataPrivacy",
      description:
        "Manage and monitor your database connections for data privacy scanning and anonymization. Supports PostgreSQL, MySQL, MongoDB, and more.",
      url: `${baseUrl}/${locale}/database-privacy/connections`,
      type: "website",
    },
  };
}
