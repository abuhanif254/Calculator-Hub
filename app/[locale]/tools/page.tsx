import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { allToolsConfig } from "@/lib/data/tools";
import { getCanonicalAndAlternates, getCanonicalUrl } from "@/lib/utils/seoUtils";
import { getLocalizedToolMeta } from "@/lib/utils/toolLocalization";
import { Link } from "@/i18n/routing";
import { ArrowRight, Terminal } from "lucide-react";

export const revalidate = false;

const hubCopy: Record<string, {
  metaTitle: string;
  metaDesc: string;
  home: string;
  breadcrumb: string;
  badge: string;
  h1: string;
  subtitle: string;
  toolsCount: (n: number) => string;
  categories: Record<string, string>;
}> = {
  en: {
    metaTitle: "Developer Tools Hub – Free Online Code, PDF & Web Utilities",
    metaDesc: "Free online developer tools: JSON formatter, PDF editor, image optimizer, SQL beautifier, hash generator, QR code studio, and code formatters. 100% private, client-side processing.",
    home: "Home",
    breadcrumb: "Developer Tools",
    badge: "135+ Free Online Web Utilities",
    h1: "Developer Tools & Web Utilities",
    subtitle: "Fast, privacy-focused developer utilities that execute entirely within your browser. Convert, format, analyze, and optimize without sending sensitive data to external servers.",
    toolsCount: (n) => `${n} tools`,
    categories: {
      "pdf": "PDF Document Tools",
      "image": "Image & Photo Tools",
      "seo": "SEO & Webmaster Tools",
      "generators": "Data & ID Generators",
      "security": "Security, Hashing & Encoding",
      "formatters": "Code Formatters & Validators",
      "css-ui": "CSS & UI Design Generators",
      "ai": "AI & Content Utilities",
      "finance": "Financial Utilities",
      "data": "Database & Privacy Utilities",
    },
  },
  es: {
    metaTitle: "Centro de Herramientas para Desarrolladores – Utilidades Web, Código y PDF",
    metaDesc: "Herramientas gratuitas en línea para desarrolladores: formateador JSON, herramientas PDF, optimizador de imágenes, generador de hashes y utilidades web 100% privadas en su navegador.",
    home: "Inicio",
    breadcrumb: "Herramientas para Desarrolladores",
    badge: "+135 Utilidades Web Gratuitas en Línea",
    h1: "Herramientas para Desarrolladores y Utilidades Web",
    subtitle: "Utilidades rápidas y enfocadas en la privacidad que se ejecutan directamente en su navegador. Convierta, formatee, analice y optimice sin enviar datos confidenciales a servidores externos.",
    toolsCount: (n) => `${n} herramientas`,
    categories: {
      "pdf": "Herramientas de Documentos PDF",
      "image": "Herramientas de Imagen y Fotografía",
      "seo": "Herramientas SEO y Webmaster",
      "generators": "Generadores de Datos e Identificadores",
      "security": "Seguridad, Hashes y Codificación",
      "formatters": "Formateadores y Validadores de Código",
      "css-ui": "Generadores CSS y Diseño UI",
      "ai": "Utilidades de IA y Contenido",
      "finance": "Utilidades Financieras",
      "data": "Utilidades de Bases de Datos y Privacidad",
    },
  },
  fr: {
    metaTitle: "Centre d'Outils pour Développeurs – Utilitaires Code, PDF et Web Gratuits",
    metaDesc: "Outils en ligne gratuits pour développeurs : formateur JSON, outils PDF, convertisseur d'images, générateur de hachage et utilitaires de code 100 % privés dans votre navigateur.",
    home: "Accueil",
    breadcrumb: "Outils Développeur",
    badge: "Plus de 135 Utilitaires Web Gratuits",
    h1: "Outils pour Développeurs et Utilitaires Web",
    subtitle: "Des utilitaires rapides et respectueux de la confidentialité qui s'exécutent directement dans votre navigateur. Convertissez, formatez, analysez et optimisez vos fichiers sans transfert serveur.",
    toolsCount: (n) => `${n} outils`,
    categories: {
      "pdf": "Outils de Documents PDF",
      "image": "Outils d'Image et Photo",
      "seo": "Outils SEO et Webmaster",
      "generators": "Générateurs de Données et d'Identifiants",
      "security": "Sécurité, Hachage et Encodage",
      "formatters": "Formateurs et Validateurs de Code",
      "css-ui": "Générateurs CSS et Design UI",
      "ai": "Utilitaires IA et Contenu",
      "finance": "Utilitaires Financiers",
      "data": "Bases de Données et Confidentialité",
    },
  },
  de: {
    metaTitle: "Entwickler-Tools Hub – Kostenlose Online-Code-, PDF- & Web-Werkzeuge",
    metaDesc: "Kostenlose Online-Entwicklertools: JSON-Formatierer, PDF-Werkzeuge, Bildoptimierer, SQL-Formatierer und Hash-Generator. 100 % lokal und privat im Browser.",
    home: "Startseite",
    breadcrumb: "Entwickler-Tools",
    badge: "Über 135 Kostenlose Online-Web-Tools",
    h1: "Entwickler-Tools & Web-Werkzeuge",
    subtitle: "Schnelle, datenschutzfreundliche Entwickler-Werkzeuge, die direkt in Ihrem Browser ausgeführt werden. Konvertieren, formatieren, analysieren und optimieren Sie Daten ohne Server-Upload.",
    toolsCount: (n) => `${n} Tools`,
    categories: {
      "pdf": "PDF-Dokumenten-Tools",
      "image": "Bild- & Foto-Tools",
      "seo": "SEO- & Webmaster-Tools",
      "generators": "Daten- & ID-Generatoren",
      "security": "Sicherheit, Hashing & Kodierung",
      "formatters": "Code-Formatierer & Validatoren",
      "css-ui": "CSS- & UI-Design-Generatoren",
      "ai": "KI- & Text-Werkzeuge",
      "finance": "Finanz-Werkzeuge",
      "data": "Datenbank- & Datenschutz-Tools",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = getCanonicalAndAlternates("/tools", locale);
  const t = hubCopy[locale] || hubCopy.en;

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    keywords: "developer tools, json formatter, pdf tools, code beautifier, image converter, online web tools, free developer utilities",
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
    },
    alternates,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AllToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = hubCopy[locale] || hubCopy.en;

  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net").replace(/\/$/, "");
  const canonicalUrl = getCanonicalUrl("/tools", locale);

  // Group all tools by category
  const toolsList = Object.values(allToolsConfig);
  const categoriesMap: Record<string, typeof toolsList> = {};

  toolsList.forEach((tool) => {
    const cat = tool.category || "General Utilities";
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(tool);
  });

  const categoryNames = Object.keys(categoriesMap).sort();

  // Schemas
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t.h1,
    "description": t.subtitle,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Nexus Calculator Hub",
      "url": baseUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t.home,
        "item": `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t.breadcrumb,
        "item": canonicalUrl,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t.h1,
    "itemListElement": toolsList.slice(0, 30).map((tool, idx) => {
      const locMeta = getLocalizedToolMeta(tool.slug, locale, tool.title, tool.shortDescription);
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "name": locMeta.title,
        "url": getCanonicalUrl('/tools/[slug]', locale, tool.slug),
      };
    }),
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-14 md:pt-16 md:pb-20 border-b border-slate-200/60 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#518231] hover:underline">{t.home}</Link>
              </li>
              <li>/</li>
              <li className="text-slate-800 dark:text-slate-200 font-semibold" aria-current="page">
                {t.breadcrumb}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
              <Terminal className="w-3.5 h-3.5" />
              {t.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.h1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Category Groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-16">
          {categoryNames.map((catName) => {
            const catTools = categoriesMap[catName];
            const localizedCatName = t.categories[catName] || catName;
            return (
              <div
                key={catName}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8"
              >
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <span>{localizedCatName}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                      {t.toolsCount(catTools.length)}
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-6">
                  {catTools.map((tool) => {
                    const locMeta = getLocalizedToolMeta(tool.slug, locale, tool.title, tool.shortDescription);
                    return (
                      <Link
                        key={tool.slug}
                        href={{ pathname: "/tools/[slug]", params: { slug: tool.slug } }}
                        className="group flex flex-col justify-between p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-sm"
                      >
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between gap-2">
                            <span>{locMeta.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </h3>
                          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {locMeta.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
