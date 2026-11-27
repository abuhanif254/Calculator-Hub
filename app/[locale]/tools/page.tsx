import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { allToolsConfig } from "@/lib/data/tools";
import { getCanonicalAndAlternates, getCanonicalUrl, optimizeSerpTitle } from "@/lib/utils/seoUtils";
import { getLocalizedToolMeta } from "@/lib/utils/toolLocalization";
import { Link } from "@/i18n/routing";
import { ArrowRight, Terminal } from "lucide-react";
import { LocaleSiblingLinks } from "@/app/components/LocaleSiblingLinks";

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
    metaTitle: "Developer Tools Hub – Free Online Code, AI, PDF & Web Utilities",
    metaDesc: "Free online developer tools: LLM token cost calculator, JSON formatter, regex tester, cron generator, PDF editor, image optimizer, and code formatters. 100% private, client-side processing.",
    home: "Home",
    breadcrumb: "Developer Tools",
    badge: "147+ Free Online Web Utilities",
    h1: "Developer Tools & Web Utilities",
    subtitle: "Fast, privacy-focused developer utilities that execute entirely within your browser. Convert, format, analyze, and optimize without sending sensitive data to external servers.",
    toolsCount: (n) => `${n} tools`,
    categories: {
      "AI Tools": "AI & Prompt Utilities",
      "Color Tools": "Color & Design Tools",
      "Data & Analytics": "Data & Privacy Utilities",
      "Design & Media": "CSS & UI Design Generators",
      "Developer Tools": "Developer & SEO Utilities",
      "Encoding & Security": "Security, Hashing & Encoding",
      "Financial Calculators": "Financial Utilities",
      "Generators": "Data, UUID & ID Generators",
      "Image Tools": "Image & Photo Tools",
      "PDF Manipulation Tools": "PDF Manipulation Tools",
      "PDF Security Tools": "PDF Security & Protection",
      "PDF Tools": "PDF Document Tools",
      "Security / Generators": "Security & Password Generators",
      "Text & Formatting": "Code Formatters & Text Utilities",
      "Web Dev Utilities": "Web Dev & API Utilities",
    },
  },
  es: {
    metaTitle: "Centro de Herramientas para Desarrolladores – Utilidades Web, IA, Código y PDF",
    metaDesc: "Herramientas gratuitas en línea para desarrolladores: calculadora de tokens LLM, formateador JSON, probador regex, herramientas PDF y utilidades web 100% privadas en su navegador.",
    home: "Inicio",
    breadcrumb: "Herramientas para Desarrolladores",
    badge: "+147 Utilidades Web Gratuitas en Línea",
    h1: "Herramientas para Desarrolladores y Utilidades Web",
    subtitle: "Utilidades rápidas y enfocadas en la privacidad que se ejecutan directamente en su navegador. Convierta, formatee, analice y optimice sin enviar datos confidenciales a servidores externos.",
    toolsCount: (n) => `${n} herramientas`,
    categories: {
      "AI Tools": "Herramientas de IA y Prompts",
      "Color Tools": "Herramientas de Color y Diseño",
      "Data & Analytics": "Datos, Analítica y Privacidad",
      "Design & Media": "Generadores CSS y Diseño UI",
      "Developer Tools": "Herramientas para Desarrolladores y SEO",
      "Encoding & Security": "Seguridad, Hashes y Codificación",
      "Financial Calculators": "Utilidades Financieras",
      "Generators": "Generadores de Datos e Identificadores",
      "Image Tools": "Herramientas de Imagen y Fotografía",
      "PDF Manipulation Tools": "Edición y Manipulación de PDF",
      "PDF Security Tools": "Seguridad y Protección de PDF",
      "PDF Tools": "Herramientas de Documentos PDF",
      "Security / Generators": "Seguridad y Generadores de Contraseñas",
      "Text & Formatting": "Formateadores de Código y Texto",
      "Web Dev Utilities": "Utilidades de Desarrollo Web y APIs",
    },
  },
  fr: {
    metaTitle: "Centre d'Outils pour Développeurs – Utilitaires Code, IA, PDF et Web Gratuits",
    metaDesc: "Outils en ligne gratuits pour développeurs : calculateur de tokens LLM, formateur JSON, testeur regex, outils PDF, convertisseur d'images et utilitaires 100 % privés dans votre navigateur.",
    home: "Accueil",
    breadcrumb: "Outils Développeur",
    badge: "Plus de 147 Utilitaires Web Gratuits",
    h1: "Outils pour Développeurs et Utilitaires Web",
    subtitle: "Des utilitaires rapides et respectueux de la confidentialité qui s'exécutent directement dans votre navigateur. Convertissez, formatez, analysez et optimisez vos fichiers sans transfert serveur.",
    toolsCount: (n) => `${n} outils`,
    categories: {
      "AI Tools": "Outils IA et Prompts",
      "Color Tools": "Outils Couleur et Design",
      "Data & Analytics": "Données, Analytique et Confidentialité",
      "Design & Media": "Générateurs CSS et Design UI",
      "Developer Tools": "Outils Développeur et SEO",
      "Encoding & Security": "Sécurité, Hachage et Encodage",
      "Financial Calculators": "Utilitaires Financiers",
      "Generators": "Générateurs de Données et d'Identifiants",
      "Image Tools": "Outils d'Image et Photo",
      "PDF Manipulation Tools": "Édition et Manipulation PDF",
      "PDF Security Tools": "Sécurité et Protection PDF",
      "PDF Tools": "Outils de Documents PDF",
      "Security / Generators": "Sécurité et Générateurs de Mots de Passe",
      "Text & Formatting": "Formateurs de Code et Texte",
      "Web Dev Utilities": "Utilitaires Web, DevOps et API",
    },
  },
  de: {
    metaTitle: "Entwickler-Tools Hub – Kostenlose Online-Code-, KI-, PDF- & Web-Werkzeuge",
    metaDesc: "Kostenlose Online-Entwicklertools: LLM-Token-Kostenrechner, JSON-Formatierer, Regex-Tester, PDF-Werkzeuge, Bildoptimierer und Hash-Generator. 100 % lokal und privat im Browser.",
    home: "Startseite",
    breadcrumb: "Entwickler-Tools",
    badge: "Über 147 Kostenlose Online-Web-Tools",
    h1: "Entwickler-Tools & Web-Werkzeuge",
    subtitle: "Schnelle, datenschutzfreundliche Entwickler-Werkzeuge, die direkt in Ihrem Browser ausgeführt werden. Konvertieren, formatieren, analysieren und optimieren Sie Daten ohne Server-Upload.",
    toolsCount: (n) => `${n} Tools`,
    categories: {
      "AI Tools": "KI- & Prompt-Werkzeuge",
      "Color Tools": "Farb- & Design-Werkzeuge",
      "Data & Analytics": "Daten-, Analyse- & Datenschutz-Tools",
      "Design & Media": "CSS- & UI-Design-Generatoren",
      "Developer Tools": "Entwickler- & SEO-Werkzeuge",
      "Encoding & Security": "Sicherheit, Hashing & Kodierung",
      "Financial Calculators": "Finanz-Werkzeuge",
      "Generators": "Daten-, UUID- & ID-Generatoren",
      "Image Tools": "Bild- & Foto-Tools",
      "PDF Manipulation Tools": "PDF-Bearbeitung & Werkzeuge",
      "PDF Security Tools": "PDF-Sicherheit & Schutz",
      "PDF Tools": "PDF-Dokumenten-Tools",
      "Security / Generators": "Sicherheit & Passwort-Generatoren",
      "Text & Formatting": "Code-Formatierer & Text-Werkzeuge",
      "Web Dev Utilities": "Web-Dev-, DevOps- & API-Werkzeuge",
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
    title: optimizeSerpTitle(t.metaTitle, locale, 'page'),
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
      "url": `${baseUrl}/en`,
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
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
          <LocaleSiblingLinks languages={getCanonicalAndAlternates('/tools', locale).languages} currentLocale={locale} />
        </div>
      </section>
    </main>
  );
}
