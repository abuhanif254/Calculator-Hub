import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { categories, getLocalizedCategory } from "@/lib/data/categories";
import { calculators } from "@/lib/data/calculators";
import { getCanonicalAndAlternates, getCanonicalUrl } from "@/lib/utils/seoUtils";
import { getLocalizedCalcMeta } from "@/lib/utils/toolLocalization";
import { Link, resolveIntlHref } from "@/i18n/routing";
import { ArrowRight, Sparkles } from "lucide-react";

export const revalidate = false;
export const dynamicParams = false;

const copyByLocale: Record<
  string,
  {
    title: string;
    description: string;
    home: string;
    calculators: string;
    badge: string;
    h1: string;
    subtitle: string;
    toolsBadge: (count: number) => string;
    viewCategory: string;
  }
> = {
  en: {
    title: "All Calculators Directory — Free Online Calculation Tools",
    description:
      "Explore hundreds of free, highly accurate calculators across Finance, Health, Math, Science, and Engineering. Instant results with zero registration required.",
    home: "Home",
    calculators: "Calculators",
    badge: "Complete Calculator Directory",
    h1: "All Free Online Calculators",
    subtitle:
      "Explore our complete collection of over 175+ accurate, mathematically verified calculation tools. From mortgages and loans to physics, chemistry, and fitness — 100% free and private.",
    toolsBadge: (count) => `${count} tools`,
    viewCategory: "View Category Pillar",
  },
  es: {
    title: "Directorio de Calculadoras — Herramientas Gratuitas en Línea",
    description:
      "Explora cientos de calculadoras gratuitas y de alta precisión en Finanzas, Salud, Matemáticas, Física, Química e Ingeniería. Resultados instantáneos.",
    home: "Inicio",
    calculators: "Calculadoras",
    badge: "Directorio Completo de Calculadoras",
    h1: "Todas las Calculadoras Gratuitas en Línea",
    subtitle:
      "Explora nuestra colección completa de más de 175 herramientas de cálculo verificadas matemáticamente. Desde hipotecas y préstamos hasta física, química y salud — 100 % gratis y privadas.",
    toolsBadge: (count) => `${count} herramientas`,
    viewCategory: "Ver Categoría Completa",
  },
  fr: {
    title: "Répertoire des Calculatrices — Outils Gratuits en Ligne",
    description:
      "Découvrez des centaines de calculatrices gratuites et précises en finance, santé, mathématiques, physique et chimie. Résultats instantanés.",
    home: "Accueil",
    calculators: "Calculatrices",
    badge: "Répertoire Complet des Calculatrices",
    h1: "Toutes les Calculatrices Gratuites en Ligne",
    subtitle:
      "Parcourez notre collection complète de plus de 175 outils de calcul vérifiés mathématiquement. Des prêts immobiliers à la physique, la chimie et la santé — 100 % gratuit et confidentiel.",
    toolsBadge: (count) => `${count} outils`,
    viewCategory: "Voir la Catégorie",
  },
  de: {
    title: "Verzeichnis aller Rechner — Kostenlose Online-Berechnungstools",
    description:
      "Entdecken Sie Hunderte kostenloser, hochpräziser Online-Rechner für Finanzen, Gesundheit, Mathematik, Physik und Chemie.",
    home: "Startseite",
    calculators: "Rechner",
    badge: "Komplettes Rechner-Verzeichnis",
    h1: "Alle Kostenlosen Online-Rechner",
    subtitle:
      "Entdecken Sie unsere vollständige Sammlung von über 175 mathematisch geprüften Berechnungstools. Von Baufinanzierung und Krediten bis zu Physik, Chemie und Fitness — 100 % kostenlos im Browser.",
    toolsBadge: (count) => `${count} Tools`,
    viewCategory: "Kategorie ansehen",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = getCanonicalAndAlternates("/calculators", locale);
  const c = copyByLocale[locale] || copyByLocale.en;

  return {
    title: c.title,
    description: c.description,
    keywords: "online calculators, free calculator tools, financial calculators, math calculator, health calculator, chemistry calculator",
    openGraph: {
      title: c.title,
      description: c.description,
      type: "website",
    },
    alternates,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AllCalculatorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = copyByLocale[locale] || copyByLocale.en;
  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net").replace(/\/$/, "");
  const canonicalUrl = getCanonicalUrl("/calculators", locale);

  // Schemas
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": c.title,
    "description": c.description,
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
        "name": c.home,
        "item": `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": c.calculators,
        "item": canonicalUrl,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": c.h1,
    "itemListElement": categories.map((catRaw, idx) => {
      const cat = getLocalizedCategory(catRaw.id, locale) || catRaw;
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "name": cat.title,
        "url": getCanonicalUrl('/calculators/category/[category]', locale, cat.id),
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
                <Link href="/" className="hover:text-[#518231] hover:underline">{c.home}</Link>
              </li>
              <li>/</li>
              <li className="text-slate-800 dark:text-slate-200 font-semibold" aria-current="page">
                {c.calculators}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-[#518231] dark:text-[#6fa844] text-xs font-bold uppercase tracking-wider mb-4 border border-[#518231]/20">
              <Sparkles className="w-3.5 h-3.5" />
              {c.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {c.h1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {c.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-16">
          {categories.map((catRaw) => {
            const cat = getLocalizedCategory(catRaw.id, locale) || catRaw;
            const catCalculators = calculators.filter((calcItem) =>
              catRaw.dbCategory.some((catName) => calcItem.category?.toLowerCase() === catName.toLowerCase())
            );

            if (catCalculators.length === 0) return null;

            return (
              <div
                key={cat.id}
                id={cat.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <span>{cat.title}</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                        {c.toolsBadge(catCalculators.length)}
                      </span>
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                      {cat.description}
                    </p>
                  </div>
                  <Link
                    href={resolveIntlHref(`/calculators/category/${cat.id}`)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#518231] hover:text-[#436a28] dark:text-[#6fa844] hover:underline shrink-0"
                  >
                    <span>{c.viewCategory}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-6">
                  {catCalculators.map((calc) => {
                    const meta = getLocalizedCalcMeta(calc.slug, locale, calc.title, calc.description);
                    return (
                      <Link
                        key={calc.slug}
                        href={resolveIntlHref(`/calculators/${calc.slug}`)}
                        className="group flex flex-col justify-between p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 hover:border-[#518231]/40 dark:hover:border-[#518231]/40 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-sm"
                      >
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors flex items-center justify-between gap-2">
                            <span>{meta.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#518231] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </h3>
                          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {meta.description}
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

