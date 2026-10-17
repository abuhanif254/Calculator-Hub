import React from "react";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/lib/data/calculators";
import { categories, getCategoryForCalculator } from "@/lib/data/categories";
import { sitemapCategories, generalLinks } from "@/lib/data/sitemapData";
import { getRelatedCalculators } from "@/lib/data/calculatorRelationships";
import { getGuideForCalculator } from "@/lib/data/guides";
import { getComparisonsForSlug } from "@/lib/data/comparisons";
import { getCollectionsForSlug } from "@/lib/data/collections";
import { getLocalizedGuide } from "@/lib/utils/guideLocalization";
import { CalculatorViewWrapper } from "@/app/components/CalculatorViewWrapper";
import ReactMarkdown from "react-markdown";
import { ExportResultsPanel } from "@/app/components/ExportResultsPanel";
import { CalculatorMath } from "@/app/components/CalculatorMath";
import { DirectAnswerCard } from "@/app/components/DirectAnswerCard";
import { StaticCalculationMatrix } from "@/app/components/StaticCalculationMatrix";
import { getFormulaForCalculator, getFormulaFaq, getEduQuestionType } from "@/lib/data/calculatorFormulas";
import { ToolVisitTracker } from "@/app/components/ToolVisitTracker";
import { FavoriteButton } from "@/app/components/FavoriteButton";


import { EmbedButton } from "@/app/components/EmbedButton";
import { ShareButton } from "@/app/components/ShareButton";
import { HistoryButton } from "@/app/components/HistoryButton";
import { EmbeddedToolDiscussions } from "@/app/components/community/EmbeddedToolDiscussions";
import { AdSenseContainer } from "@/app/components/AdSenseContainer";
import { ProbabilitySeoContent } from "@/app/components/probability/ProbabilitySeoContent";
import Mermaid from "@/app/components/Mermaid";
import { Link, routing, resolveIntlHref } from "@/i18n/routing";
import { Search, ChevronRight, CalculatorIcon, BookOpen, Clock, ArrowRight, Scale, Layers, ShieldCheck } from "lucide-react";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { pickCalculatorMessages, toClientCalcDef } from '@/lib/utils/getCalculatorMessages';
import { enrichCalculatorSeoContent, getLocalizedReviewerByline, buildDynamicCalculatorFaqs } from '@/lib/utils/seoContentEnricher';

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// SSG configuration — fully static, no revalidation needed.
// All calculator data lives in TypeScript source files (lib/data/calculators.ts).
// Content only changes when code is deployed, so revalidate=false (build-time only)
// eliminates all ISR background re-renders, saving Vercel free tier limits.
export const revalidate = false;
export const dynamicParams = false;

const calcMarkdownCache = new Map<string, matter.GrayMatterFile<string> | null>();

interface MarkdownLookupResult {
  parsed: matter.GrayMatterFile<string>;
  isFallback: boolean;
}

// Helper function to read markdown content
function getMarkdownContent(baseSlug: string, locale: string, localizedSlug?: string, urlSlug?: string): MarkdownLookupResult | null {
  try {
    // 1. Try localized folder with canonical base slug (e.g. content/es/down-payment-calculator.md)
    const baseFilePath = path.join(process.cwd(), "content", locale, `${baseSlug}.md`);
    let targetPath = baseFilePath;
    let isFallback = false;

    if (!fs.existsSync(targetPath)) {
      // 2. Try localized folder with localizedSlug (e.g. content/es/calculadora-pago-inicial.md)
      if (localizedSlug) {
        const localizedPath = path.join(process.cwd(), "content", locale, `${localizedSlug}.md`);
        if (fs.existsSync(localizedPath)) {
          targetPath = localizedPath;
        }
      }
    }

    if (!fs.existsSync(targetPath) && urlSlug) {
      // 3. Try localized folder with urlSlug
      const urlSlugPath = path.join(process.cwd(), "content", locale, `${urlSlug}.md`);
      if (fs.existsSync(urlSlugPath)) {
        targetPath = urlSlugPath;
      }
    }

    // 4. Fallback to english if language file is missing completely
    if (!fs.existsSync(targetPath)) {
      const fallbackPath = path.join(process.cwd(), "content", "en", `${baseSlug}.md`);
      if (fs.existsSync(fallbackPath)) {
        targetPath = fallbackPath;
        isFallback = locale !== "en";
      } else {
        return null;
      }
    }

    if (calcMarkdownCache.has(targetPath)) {
      const cached = calcMarkdownCache.get(targetPath);
      return cached ? { parsed: cached, isFallback } : null;
    }

    const fileContent = fs.readFileSync(targetPath, "utf-8");
    const parsed = matter(fileContent);
    parsed.data = parsed.data || {};

    // If frontmatter faqs are missing, check if an inline JSON-LD FAQPage script exists in the content
    if (!parsed.data?.faqs || !Array.isArray(parsed.data.faqs) || parsed.data.faqs.length === 0) {
      const faqScriptMatch = parsed.content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
      if (faqScriptMatch) {
        try {
          const jsonLd = JSON.parse(faqScriptMatch[1]);
          if (jsonLd['@type'] === 'FAQPage' && Array.isArray(jsonLd.mainEntity)) {
            parsed.data.faqs = jsonLd.mainEntity.map((item: any) => ({
              question: item.name || '',
              answer: item.acceptedAnswer?.text || '',
            }));
            // Strip the inline <script> from the markdown content so it does not leak into HTML
            parsed.content = parsed.content.replace(faqScriptMatch[0], '').trim();
          }
        } catch (err) {
          // Keep content intact if JSON parse fails
        }
      }
    } else {
      // If frontmatter faqs already exist, still strip any duplicate inline ld+json script if present
      parsed.content = parsed.content.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '').trim();
    }

    // Extract leading H1 from markdown body if frontmatter title is missing, and strip leading H1 to avoid duplicate <h1>
    const leadingH1Match = parsed.content.match(/^\s*#\s+([^\r\n]+)\r?\n*/);
    if (leadingH1Match) {
      const extractedH1 = leadingH1Match[1]
        .replace(/\*\*/g, '')
        .split(/\s*[:|–—]\s*/)[0]
        .trim();
      if (!parsed.data.title && extractedH1) {
        parsed.data.title = extractedH1;
      }
      if (!parsed.data.metaTitle && leadingH1Match[1]) {
        parsed.data.metaTitle = leadingH1Match[1].replace(/\*\*/g, '').trim();
      }
      parsed.content = parsed.content.slice(leadingH1Match[0].length).trim();
    }

    // Backfill title from metaTitle if missing
    if (!parsed.data.title && typeof parsed.data.metaTitle === 'string') {
      parsed.data.title = parsed.data.metaTitle.split(/\s*[|–—-]\s*/)[0].trim();
    }

    // Backfill description from metaDescription or first paragraph of markdown if missing
    if (!parsed.data.description) {
      if (typeof parsed.data.metaDescription === 'string' && parsed.data.metaDescription.trim()) {
        parsed.data.description = parsed.data.metaDescription.trim();
      } else {
        const firstParagraph = parsed.content
          .split(/\r?\n\r?\n/)
          .map((p) => p.trim())
          .find((p) => p.length > 30 && !p.startsWith('#') && !p.startsWith('*') && !p.startsWith('-') && !p.startsWith('|'));
        if (firstParagraph) {
          parsed.data.description = firstParagraph
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .slice(0, 220)
            .trim();
        }
      }
    }

    if (!parsed.data.metaTitle && parsed.data.title) {
      parsed.data.metaTitle = parsed.data.title;
    }
    if (!parsed.data.metaDescription && parsed.data.description) {
      parsed.data.metaDescription = parsed.data.description;
    }

    calcMarkdownCache.set(targetPath, parsed);
    return { parsed, isFallback };
  } catch (e) {
    console.error("Error reading markdown for", baseSlug, locale, e);
    return null;
  }
}

function getLocalizedCalcInfo(calc: NonNullable<ReturnType<typeof getCalculatorBySlug>>, locale: string, urlSlug?: string) {
  const localizedSlug = calc.slugs && calc.slugs[locale as keyof typeof calc.slugs];
  const mdResult = getMarkdownContent(calc.slug, locale, localizedSlug, urlSlug);
  const localizedMd = mdResult && !mdResult.isFallback ? mdResult.parsed : null;
  const fallbackMd = mdResult?.parsed || null;
  const translation = calc.translations?.[locale];

  const title = (
    localizedMd?.data?.title ||
    translation?.title ||
    (translation?.meta?.title ? translation.meta.title.split(/\s*[|–—-]\s*/)[0].trim() : '') ||
    fallbackMd?.data?.title ||
    calc.title
  ).trim();

  const description = (
    localizedMd?.data?.description ||
    translation?.description ||
    translation?.meta?.description ||
    fallbackMd?.data?.description ||
    calc.description
  ).trim();

  const rawMetaTitle = (
    localizedMd?.data?.metaTitle ||
    translation?.meta?.title ||
    translation?.title ||
    fallbackMd?.data?.metaTitle ||
    calc.meta.title ||
    title
  ).trim();

  const metaTitle = rawMetaTitle.replace(/\s*\|\s*Nexus.*$/i, '').trim();

  const metaDescription = (
    localizedMd?.data?.metaDescription ||
    translation?.meta?.description ||
    translation?.description ||
    fallbackMd?.data?.metaDescription ||
    calc.meta.description ||
    description
  ).trim();

  const metaKeywords = (
    localizedMd?.data?.metaKeywords ||
    translation?.meta?.keywords ||
    fallbackMd?.data?.metaKeywords ||
    calc.meta.keywords
  );

  return {
    title,
    description,
    metaTitle,
    metaDescription,
    metaKeywords,
    localizedMd,
    fallbackMd,
  };
}

// Dynamic routing parameter generation
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const locales = params?.locale ? [params.locale] : routing.locales;
  const result: { slug: string }[] = [];
  const seen = new Set<string>();

  locales.forEach((locale) => {
    calculators.forEach((calc) => {
      const isExplicitlyMapped = `/calculators/${calc.slug}` in routing.pathnames;
      const localizedSlug = calc.slugs?.[locale as keyof typeof calc.slugs];

      // Always add the English (canonical) slug so the base route works
      if (!seen.has(calc.slug)) {
        seen.add(calc.slug);
        result.push({ slug: calc.slug });
      }

      // For explicitly-mapped calculators that have a localized slug, next-intl
      // rewrites the URL (e.g. /de/rechner/potenzielle-energie-rechner → [slug]),
      // passing the LOCALIZED slug as the param.
      if (isExplicitlyMapped && localizedSlug && localizedSlug !== calc.slug) {
        if (!seen.has(localizedSlug)) {
          seen.add(localizedSlug);
          result.push({ slug: localizedSlug });
        }
      }
    });
  });

  return result;
}


// SEO Metadata configuration
export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    return {
      title: "Calculator Not Found",
    };
  }

  const { metaTitle: rawMetaTitle, metaDescription, metaKeywords } = getLocalizedCalcInfo(calc, locale, slug);

  const { getCanonicalAndAlternates, optimizeSerpTitle } = await import('@/lib/utils/seoUtils');
  const metaTitle = optimizeSerpTitle(rawMetaTitle, locale, 'calculator');
  const alternates = getCanonicalAndAlternates('/calculators/[slug]', locale, calc.slug);

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: alternates.canonical,
      siteName: "NexusCalculator",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates,
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const calc = getCalculatorBySlug(resolvedParams.slug);

  if (!calc) {
    notFound();
  }

  const {
    title: pageTitle,
    description: pageDesc,
    localizedMd,
    fallbackMd,
  } = getLocalizedCalcInfo(calc, resolvedParams.locale, resolvedParams.slug);

  const clientCalcDef = toClientCalcDef(calc, resolvedParams.locale);
  const mdData = localizedMd || fallbackMd;
  const seoContent = enrichCalculatorSeoContent({
    calc,
    locale: resolvedParams.locale,
    localizedTitle: pageTitle,
    localizedDescription: pageDesc,
    localizedInputs: clientCalcDef.fields,
    localizedMdContent: localizedMd?.content,
    hasLocalizedMd: Boolean(localizedMd?.content),
    fallbackEnContent: fallbackMd?.content || calc.seoContent,
  });
  const reviewerByline = getLocalizedReviewerByline(calc.category, resolvedParams.locale, calc.meta?.lastUpdated);

  const localizedFaqs = localizedMd?.data?.faqs && Array.isArray(localizedMd.data.faqs) && localizedMd.data.faqs.length > 0
    ? localizedMd.data.faqs
    : (resolvedParams.locale === 'en' && fallbackMd?.data?.faqs && Array.isArray(fallbackMd.data.faqs) && fallbackMd.data.faqs.length > 0
      ? fallbackMd.data.faqs
      : undefined);

  const faqs: { question: string; answer: string }[] = buildDynamicCalculatorFaqs({
    calc,
    locale: resolvedParams.locale,
    localizedTitle: pageTitle,
    localizedDescription: pageDesc,
    localizedInputs: clientCalcDef.fields,
    existingFaqs: localizedFaqs,
  });

  // Semantic Math FAQ Embedding: inject authoritative mathematical formula FAQ if not already present
  const hasFormulaFaq = faqs.some((f) =>
    /formula|equation|fórmula|formule|formel/i.test(f.question)
  );
  if (!hasFormulaFaq) {
    const formulaFaq = getFormulaFaq(calc.slug, pageTitle, resolvedParams.locale);
    if (formulaFaq) {
      faqs.unshift(formulaFaq);
    }
  }

  // Find related calculators, comparisons, and curated collections for bidirectional internal linking
  const relatedTools = getRelatedCalculators(calc.slug, 8);
  const relatedComparisons = getComparisonsForSlug(calc.slug, calc.category, 3);
  const relatedCollections = getCollectionsForSlug(calc.slug, calc.category, 2);
  const categoryDef = getCategoryForCalculator(calc.category);
  const activeCategory = sitemapCategories.find(c => c.title.toLowerCase().includes(calc.category.toLowerCase())) || sitemapCategories[0];
  const rawCategoryTitle = categoryDef?.title || activeCategory.title;

  const categoryTitleTranslations: Record<string, Record<string, string>> = {
    es: {
      'Financial Calculators': 'Calculadoras Financieras',
      'Fitness & Health Calculators': 'Calculadoras de Salud y Fitness',
      'Math Calculators': 'Calculadoras Matemáticas',
      'Other Calculators': 'Otras Calculadoras',
      'Financial': 'Finanzas',
      'Health & Fitness': 'Salud y Fitness',
      'Math': 'Matemáticas',
      'Other': 'Otros',
    },
    fr: {
      'Financial Calculators': 'Calculatrices Financières',
      'Fitness & Health Calculators': 'Calculatrices Santé & Fitness',
      'Math Calculators': 'Calculatrices Mathématiques',
      'Other Calculators': 'Autres Calculatrices',
      'Financial': 'Finance',
      'Health & Fitness': 'Santé & Fitness',
      'Math': 'Mathématiques',
      'Other': 'Autres',
    },
    de: {
      'Financial Calculators': 'Finanzrechner',
      'Fitness & Health Calculators': 'Gesundheits- & Fitnessrechner',
      'Math Calculators': 'Mathe-Rechner',
      'Other Calculators': 'Sonstige Rechner',
      'Financial': 'Finanzen',
      'Health & Fitness': 'Gesundheit & Fitness',
      'Math': 'Mathematik',
      'Other': 'Sonstiges',
    },
  };
  const categoryTitle = categoryTitleTranslations[resolvedParams.locale]?.[rawCategoryTitle] || rawCategoryTitle;
  const localizedCategoryBadge = categoryTitleTranslations[resolvedParams.locale]?.[calc.category] || calc.category;

  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net")
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');
  const { getCanonicalUrl, canonicalizeInternalHref } = await import('@/lib/utils/seoUtils');
  const canonicalUrl = getCanonicalUrl('/calculators/[slug]', resolvedParams.locale, calc.slug);
  const categoryUrl = categoryDef
    ? getCanonicalUrl('/calculators/category/[category]', resolvedParams.locale, categoryDef.id)
    : getCanonicalUrl('/sitemap', resolvedParams.locale);

  // Reverse lookup: check if an educational guide exists for this calculator
  const relatedGuide = getGuideForCalculator(calc.slug);
  const localizedGuide = relatedGuide ? getLocalizedGuide(relatedGuide, resolvedParams.locale) : null;
  const guideSlug = relatedGuide ? (relatedGuide.slugs?.[resolvedParams.locale as keyof typeof relatedGuide.slugs] || relatedGuide.slug) : null;
  const relatedGuideUrl = (relatedGuide && guideSlug)
    ? getCanonicalUrl('/guides/[slug]', resolvedParams.locale, relatedGuide.slug)
    : undefined;

  const isFinanceCalc = calc.category.toLowerCase().includes('financ');
  const isHealthCalc = calc.category.toLowerCase().includes('health') || calc.category.toLowerCase().includes('fitness');

  const guideTranslations: Record<string, {
    badge: string;
    cta: string;
    minRead: string;
    featured: string;
    home: string;
    faqHeading: string;
    findCalc: string;
    searchPlaceholder: string;
    keyFeatures: string;
    commonUseCases: string;
    quickLinks: string;
    relatedCalcs: string;
    viewAll: string;
    comparisonsHeading: string;
    viewAllComparisons: string;
    collectionsHeading: string;
    viewAllCollections: string;
    ymylTitle: string;
    ymylFinanceBody: string;
    ymylHealthBody: string;
  }> = {
    en: {
      badge: 'In-Depth Guide & Mathematical Breakdown',
      cta: 'Read Complete Guide',
      minRead: 'min read',
      featured: 'Featured Guide',
      home: 'Home',
      faqHeading: 'Frequently Asked Questions',
      findCalc: 'Find a Calculator',
      searchPlaceholder: 'Search calculators...',
      keyFeatures: 'Key Features',
      commonUseCases: 'Common Use Cases',
      quickLinks: 'Quick Links',
      relatedCalcs: 'Related Calculators',
      viewAll: `View all ${categoryTitle.toLowerCase()}`,
      comparisonsHeading: 'Side-by-Side Comparisons',
      viewAllComparisons: 'View all comparisons',
      collectionsHeading: 'Curated Workflow Toolkits',
      viewAllCollections: 'Explore all toolkits',
      ymylTitle: 'Editorial Verification & Regulatory Disclosure',
      ymylFinanceBody: `This financial model is peer-reviewed by ${reviewerByline.reviewer} using standard actuarial and Truth-in-Lending (CFPB / Reg Z) compounding conventions. Estimates are for educational and quantitative planning only and do not constitute personalized investment, tax, or legal lending advice.`,
      ymylHealthBody: `This clinical biometric model is peer-reviewed by ${reviewerByline.reviewer} against published WHO, NIH, and peer-reviewed physiological equations. Outputs provide informational screening benchmarks only and must not be used as a substitute for clinical diagnosis or medical advice from a licensed physician.`,
    },
    es: {
      badge: 'Guía Educativa y Desglose Matemático',
      cta: 'Leer la Guía Completa',
      minRead: 'min de lectura',
      featured: 'Guía Destacada',
      home: 'Inicio',
      faqHeading: 'Preguntas Frecuentes',
      findCalc: 'Buscar una Calculadora',
      searchPlaceholder: 'Buscar calculadoras...',
      keyFeatures: 'Características Principales',
      commonUseCases: 'Casos de Uso Comunes',
      quickLinks: 'Enlaces Rápidos',
      relatedCalcs: 'Calculadoras Relacionadas',
      viewAll: `Ver todas en ${categoryTitle.toLowerCase()}`,
      comparisonsHeading: 'Comparativas Lado a Lado',
      viewAllComparisons: 'Ver todas las comparativas',
      collectionsHeading: 'Paquetes y Kits de Herramientas',
      viewAllCollections: 'Explorar todas las colecciones',
      ymylTitle: 'Verificación Editorial y Aviso Normativo',
      ymylFinanceBody: `Este modelo cuantitativo ha sido verificado por ${reviewerByline.reviewer} siguiendo estándares actuariales e internacionales de capitalización y amortización. Los resultados tienen carácter exclusivamente informativo y educativo, y no constituyen asesoramiento financiero, fiscal ni bancario vinculante.`,
      ymylHealthBody: `Este modelo biométrico ha sido revisado por ${reviewerByline.reviewer} conforme a ecuaciones fisiológicas publicadas (OMS / NIH). Las estimaciones son referencias informativas y no sustituyen el diagnóstico clínico ni la consulta con un médico colegiado.`,
    },
    fr: {
      badge: 'Guide Pédagogique et Analyse Mathématique',
      cta: 'Lire le Guide Complet',
      minRead: 'min de lecture',
      featured: 'Guide en Vedette',
      home: 'Accueil',
      faqHeading: 'Questions Fréquemment Posées',
      findCalc: 'Trouver une Calculatrice',
      searchPlaceholder: 'Rechercher des calculatrices...',
      keyFeatures: 'Fonctionnalités Clés',
      commonUseCases: 'Cas d’Utilisation Courants',
      quickLinks: 'Liens Rapides',
      relatedCalcs: 'Calculatrices Associées',
      viewAll: `Voir tout dans ${categoryTitle.toLowerCase()}`,
      comparisonsHeading: 'Comparatifs Côte à Côte',
      viewAllComparisons: 'Voir tous les comparatifs',
      collectionsHeading: 'Packs d’Outils Thématiques',
      viewAllCollections: 'Explorer toutes les collections',
      ymylTitle: 'Vérification Éditoriale et Avis Réglementaire',
      ymylFinanceBody: `Ce modèle financier est validé par ${reviewerByline.reviewer} selon les normes actuarielles et financières internationales. Les résultats sont fournis à titre strictement informatif et pédagogique et ne constituent pas un conseil en investissement, fiscalité ou crédit.`,
      ymylHealthBody: `Ce modèle biométrique est vérifié par ${reviewerByline.reviewer} sur la base d'équations physiologiques de référence (OMS / NIH). Ces estimations sont fournies à titre purement indicatif et ne remplacent en aucun cas un avis médical ou un diagnostic clinique.`,
    },
    de: {
      badge: 'Ausführlicher Ratgeber & Formelerklärung',
      cta: 'Vollständigen Ratgeber Lesen',
      minRead: 'Min. Lesezeit',
      featured: 'Empfohlener Ratgeber',
      home: 'Startseite',
      faqHeading: 'Häufig gestellte Fragen',
      findCalc: 'Rechner Finden',
      searchPlaceholder: 'Rechner durchsuchen...',
      keyFeatures: 'Hauptmerkmale',
      commonUseCases: 'Häufige Anwendungsfälle',
      quickLinks: 'Schnellzugriff',
      relatedCalcs: 'Ähnliche Rechner',
      viewAll: `Alle ${categoryTitle} anzeigen`,
      comparisonsHeading: 'Direkte Systemvergleiche',
      viewAllComparisons: 'Alle Vergleiche anzeigen',
      collectionsHeading: 'Kuratierte Workflow-Toolkits',
      viewAllCollections: 'Alle Sammlungen entdecken',
      ymylTitle: 'Redaktionelle Prüfung & Rechtlicher Hinweis',
      ymylFinanceBody: `Dieses finanzmathematische Modell wurde von ${reviewerByline.reviewer} nach anerkannten versicherungs- und finanzmathematischen Standards geprüft. Alle Berechnungen dienen ausschließlich der unverbindlichen Information und ersetzen keine individuelle Finanz-, Steuer- oder Rechtsberatung.`,
      ymylHealthBody: `Dieses biometrische Modell wurde von ${reviewerByline.reviewer} anhand wissenschaftlich publizierter Referenzformeln (WHO / NIH) validiert. Die Ergebnisse dienen ausschließlich der allgemeinen Orientierung und ersetzen keine ärztliche Diagnose oder medizinische Beratung.`,
    },
  };
  const guideText = guideTranslations[resolvedParams.locale] || guideTranslations.en;

  // SoftwareApplication JSON-LD Schema enriched with E-E-A-T Author, Reviewer, DateModified & SpeakableSpecification
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": pageTitle,
    "description": pageDesc,
    "applicationCategory": calc.category === "Financial" ? "FinanceApplication" :
      calc.category === "Health & Fitness" ? "HealthApplication" :
        "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "url": canonicalUrl,
    "inLanguage": resolvedParams.locale,
    "dateModified": reviewerByline.lastUpdated,
    "author": {
      "@type": "Organization",
      "name": "NexusCalculator",
      "url": baseUrl
    },
    "reviewedBy": {
      "@type": "Organization",
      "name": reviewerByline.reviewer,
      "url": getCanonicalUrl('/about-us', resolvedParams.locale)
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "#calc-hero-desc", "#math-formula"]
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    ...(relatedGuideUrl && localizedGuide && {
      "isRelatedTo": {
        "@type": "Article",
        "name": localizedGuide.title,
        "url": relatedGuideUrl
      }
    })
  };


  const formulaDef = getFormulaForCalculator(calc.slug);

  // Field-driven localized HowTo JSON-LD Schema — unlocks step-by-step rich results for all 1,398 calculator URLs
  const fieldLabelsList = (clientCalcDef.fields || [])
    .slice(0, 4)
    .map((f) => (f.unit ? `${f.label} (${f.unit})` : f.label))
    .join(', ');
  const formulaExpr = formulaDef?.formula || pageTitle;
  const howToTemplates: Record<string, { name: string; steps: { name: string; text: string }[] }> = {
    en: {
      name: `How to Use the ${pageTitle}`,
      steps: [
        {
          name: 'Enter Your Input Parameters',
          text: fieldLabelsList
            ? `Enter your values for ${fieldLabelsList} into the ${pageTitle} input form.`
            : `Enter your numerical parameters into the ${pageTitle} input fields.`,
        },
        {
          name: 'Verify Units & Assumptions',
          text: `Confirm your selected measurement units, rates, or compounding periods match your scenario.`,
        },
        {
          name: 'Run the Verified Mathematical Formula',
          text: `The engine evaluates the verified formula (${formulaExpr}) in real time using double-precision floating-point arithmetic.`,
        },
        {
          name: 'Analyze Breakdown & Export Report',
          text: `Review the primary result, reference benchmark table, and optional PDF/CSV calculation report.`,
        },
      ],
    },
    es: {
      name: `Cómo usar la ${pageTitle}`,
      steps: [
        {
          name: 'Introduzca los parámetros de entrada',
          text: fieldLabelsList
            ? `Ingrese sus valores para ${fieldLabelsList} en el formulario de ${pageTitle}.`
            : `Ingrese sus datos numéricos en los campos de entrada de ${pageTitle}.`,
        },
        {
          name: 'Verifique las unidades y supuestos',
          text: `Confirme que las unidades de medida, tasas o períodos seleccionados coincidan con su escenario.`,
        },
        {
          name: 'Ejecute la fórmula matemática verificada',
          text: `El motor evalúa la fórmula verificada (${formulaExpr}) en tiempo real con precisión matemática de doble punto flotante.`,
        },
        {
          name: 'Analice el desglose y exporte resultados',
          text: `Revise el resultado principal, la tabla comparativa de referencia y descargue el informe opcional en PDF.`,
        },
      ],
    },
    fr: {
      name: `Comment utiliser ${pageTitle}`,
      steps: [
        {
          name: 'Saisissez vos paramètres d’entrée',
          text: fieldLabelsList
            ? `Entrez vos valeurs pour ${fieldLabelsList} dans le formulaire de ${pageTitle}.`
            : `Saisissez vos valeurs numériques dans les champs de ${pageTitle}.`,
        },
        {
          name: 'Vérifiez les unités et hypothèses',
          text: `Assurez-vous que les unités de mesure, taux ou périodes correspondent exactement à votre situation.`,
        },
        {
          name: 'Exécutez la formule mathématique vérifiée',
          text: `Le moteur calcule la formule vérifiée (${formulaExpr}) instantanément en virgule flottante double précision.`,
        },
        {
          name: 'Analysez les résultats et exportez le rapport',
          text: `Consultez le résultat principal, le tableau de référence et exportez votre rapport en PDF si nécessaire.`,
        },
      ],
    },
    de: {
      name: `So verwenden Sie den ${pageTitle}`,
      steps: [
        {
          name: 'Eingabeparameter eintragen',
          text: fieldLabelsList
            ? `Geben Sie Ihre Werte für ${fieldLabelsList} in das Formular des ${pageTitle} ein.`
            : `Tragen Sie Ihre numerischen Parameter in die Eingabefelder des ${pageTitle} ein.`,
        },
        {
          name: 'Einheiten und Annahmen prüfen',
          text: `Stellen Sie sicher, dass Maßeinheiten, Zinssätze oder Zeiträume Ihrem Szenario entsprechen.`,
        },
        {
          name: 'Geprüfte mathematische Formel berechnen',
          text: `Die Engine wertet die verifizierte Formel (${formulaExpr}) in Echtzeit mit doppelter Gleitkommagenauigkeit aus.`,
        },
        {
          name: 'Ergebnisse analysieren & Bericht exportieren',
          text: `Prüfen Sie das Hauptergebnis sowie die Referenztabelle und exportieren Sie bei Bedarf den PDF-Bericht.`,
        },
      ],
    },
  };
  const localizedHowTo = howToTemplates[resolvedParams.locale] || howToTemplates.en;
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": localizedHowTo.name,
    "description": pageDesc,
    "url": canonicalUrl,
    "inLanguage": resolvedParams.locale,
    "step": localizedHowTo.steps.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": s.name,
      "text": s.text,
    })),
  };

  // MathSolver JSON-LD Schema for Google Math Solvers (Strict Google Search Central Compliance)
  const eduQuestionType = getEduQuestionType(calc.slug, calc.category);
  const mathSolverSchema = eduQuestionType ? {
    "@context": "https://schema.org",
    "@type": ["MathSolver", "LearningResource"],
    "name": pageTitle,
    "description": pageDesc,
    "url": canonicalUrl,
    "inLanguage": resolvedParams.locale,
    "learningResourceType": "Math Solver",
    "usageInfo": getCanonicalUrl('/privacy-policy', resolvedParams.locale),
    ...(formulaDef && (formulaDef.latex || formulaDef.formula) ? {
      "mathExpression": formulaDef.latex || formulaDef.formula
    } : {}),
    "potentialAction": [
      {
        "@type": "SolveMathAction",
        "target": `${canonicalUrl}?q={math_expression_string}`,
        "mathExpression-input": "required name=math_expression_string",
        "eduQuestionType": eduQuestionType
      }
    ]
  } : null;


  // FAQPage JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": guideText.home,
        "item": `${baseUrl}/${resolvedParams.locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryTitle,
        "item": categoryUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageTitle,
        "item": canonicalUrl
      }
    ]
  };

  const displayFeatures = localizedMd?.data?.features || (resolvedParams.locale === 'en' ? mdData?.data?.features : undefined);
  const displayUseCases = localizedMd?.data?.useCases || (resolvedParams.locale === 'en' ? mdData?.data?.useCases : undefined);

  const quickLinkLabelMap: Record<string, Record<string, string>> = {
    es: {
      'Home': 'Inicio',
      'Privacy Policy': 'Política de Privacidad',
      'Terms of Use': 'Términos de Uso',
      'About Us': 'Sobre Nosotros',
    },
    fr: {
      'Home': 'Accueil',
      'Privacy Policy': 'Politique de Confidentialité',
      'Terms of Use': 'Conditions d’Utilisation',
      'About Us': 'À Propos',
    },
    de: {
      'Home': 'Startseite',
      'Privacy Policy': 'Datenschutzerklärung',
      'Terms of Use': 'Nutzungsbedingungen',
      'About Us': 'Über Uns',
    },
  };

  return (
    <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {mathSolverSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mathSolverSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs for SEO */}
      <nav aria-label="Breadcrumb" className="mb-6 font-sans text-sm text-slate-500 dark:text-slate-400 print:hidden">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-[#518231] dark:hover:text-[#6fa844] hover:underline transition-colors">{guideText.home}</Link>
          </li>
          <li><span className="text-slate-400">/</span></li>
          <li>
            <Link
              href={categoryDef ? resolveIntlHref(`/calculators/category/${categoryDef.id}`) : resolveIntlHref('/sitemap')}
              className="hover:text-[#518231] dark:hover:text-[#6fa844] hover:underline transition-colors"
            >
              {categoryTitle}
            </Link>
          </li>
          <li><span className="text-slate-400">/</span></li>
          <li className="text-slate-700 dark:text-slate-300 font-medium" aria-current="page">{pageTitle}</li>
        </ol>
      </nav>

      {/* Branded Print Header (Visible only when printed via Ctrl+P or window.print()) */}
      <div className="hidden print:block mb-8 pb-4 border-b-2 border-[#518231]">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-[#518231]" />
              <span className="text-xl font-black text-[#518231] tracking-tight">NEXUS CALCULATOR</span>
            </div>
            <div className="text-base font-bold text-slate-900 mt-1">{pageTitle}</div>
            <div className="text-[11px] text-slate-500">Official Verified Calculation Report • https://www.nexuscalculator.net</div>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div className="font-semibold text-slate-800">Verified by Nexus Engine</div>
            <div className="text-[#518231] font-bold text-[11px] uppercase tracking-wider mt-0.5">✓ Confirmed Calculation</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        {/* Main Content Area (Left/Top) */}
        <div className="flex-1 w-full max-w-5xl min-w-0">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4 flex-wrap print:hidden">
              <span className="inline-block px-3 py-1 bg-[#518231]/10 border border-[#518231]/20 text-[#518231] dark:text-[#6fa844] rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                {localizedCategoryBadge}
              </span>
              <FavoriteButton
                slug={calc.slug}
                title={pageTitle}
                type="calculator"
                href={`/calculators/${calc.slug}`}
              />
              <EmbedButton
                slug={calc.slug}
                title={pageTitle}
                locale={resolvedParams.locale}
              />
              <ShareButton
                slug={calc.slug}
                title={pageTitle}
                locale={resolvedParams.locale}
              />
              <HistoryButton
                slug={calc.slug}
                title={pageTitle || calc.title}
                locale={resolvedParams.locale}
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {pageTitle}
            </h1>
            <p id="calc-hero-desc" className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {pageDesc}
            </p>
            
            {/* Author Byline for E-E-A-T */}
            <div className="flex items-center gap-3 py-3 border-y border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img
                  src="https://ik.imagekit.io/ubwpdqyav/my_photo-removebg-preview.png?updatedAt=1776774813574"
                  alt="Md. Shamim Hossain"
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {reviewerByline.reviewedBy} <Link href="/about-us" className="text-[#518231] hover:underline">Md. Shamim Hossain</Link> • <span className="text-slate-700 dark:text-slate-300">{reviewerByline.reviewer}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {reviewerByline.verifiedBadge} • {reviewerByline.updatedLabel}: {reviewerByline.lastUpdated}
                </p>
              </div>
            </div>
          </header>

          <ToolVisitTracker
            slug={calc.slug}
            title={pageTitle}
            type="calculator"
            href={`/calculators/${calc.slug}`}
          />

          {/* Direct Answer & Formula at a Glance Card (Position 0 Snippet) */}
          <DirectAnswerCard
            slug={calc.slug}
            title={pageTitle}
            category={calc.category}
            locale={resolvedParams.locale}
          />

          <div id="calculator-export-target" className="print-target calculator-view">
            <NextIntlClientProvider
              locale={resolvedParams.locale}
              messages={pickCalculatorMessages(calc, (await getMessages()) as Record<string, any>)}
            >
              <CalculatorViewWrapper calcDef={clientCalcDef} locale={resolvedParams.locale} />
            </NextIntlClientProvider>
          </div>

          {/* Branded Print Footer (Visible only when printed via Ctrl+P or window.print()) */}
          <div className="hidden print:flex justify-between items-center mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500">
            <div>Calculated on <strong>nexuscalculator.net</strong> • Accurate, confidential, client-side verified math</div>
            <div>Nexus Verified Document Engine</div>
          </div>

          <ExportResultsPanel 
            targetId="calculator-export-target" 
            fileName={`${calc.slug}-results`} 
            title={pageTitle || calc.title} 
            calcSlug={calc.slug}
          />

          {/* Ad Placement below calculation results (Non-intrusive, high CTR) */}
          <div className="my-8 w-full print:hidden">
            <AdSenseContainer slot="calculator_content_top" />
          </div>

          <CalculatorMath slug={calc.slug} category={calc.category} locale={resolvedParams.locale} />
          <StaticCalculationMatrix slug={calc.slug} title={pageTitle} locale={resolvedParams.locale} />


          {/* Educational Guide & Math Deep-Dive Callout */}
          {localizedGuide && guideSlug && (
            <aside aria-label="Educational Guide" className="my-10 p-6 md:p-8 bg-gradient-to-br from-emerald-50/40 via-white to-slate-50 dark:from-[#518231]/10 dark:via-slate-900 dark:to-slate-900/60 rounded-2xl border border-[#518231]/25 dark:border-[#518231]/35 shadow-sm relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#518231] dark:text-[#6fa844]">
                    {guideText.badge}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 self-start sm:self-auto shrink-0">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {localizedGuide.readingTime} {guideText.minRead}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors">
                {localizedGuide.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                {localizedGuide.description}
              </p>
              <div>
                <Link
                  href={{ pathname: '/guides/[slug]', params: { slug: guideSlug } }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white text-sm font-semibold shadow-sm transition-all hover:gap-3"
                >
                  <span>{guideText.cta}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </aside>
          )}

          {/* Ad Placement below calculator (Main Content) */}
          <div className="my-10 w-full print:hidden">
            <AdSenseContainer slot="calculator_content_bottom" style={{ minHeight: '90px' }} format="auto" />
          </div>

          {seoContent && (
            <article className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10 prose prose-slate dark:prose-invert max-w-none lg:prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#518231] prose-img:rounded-xl">
              <ReactMarkdown
                components={{
                  h1({ node, children, ...props }: any) {
                    return <h2 {...props}>{children}</h2>;
                  },
                  a({ node, href, children, ...props }: any) {
                    const resolvedHref = canonicalizeInternalHref(href, resolvedParams.locale);
                    return (
                      <a href={resolvedHref} {...props}>
                        {children}
                      </a>
                    );
                  },
                  code({ node, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {seoContent}
              </ReactMarkdown>
            </article>
          )}

          {/* Inject custom Probability SEO Component if slug matches */}
          {calc.slug === 'probability-calculator' && (
            <ProbabilitySeoContent />
          )}

          {/* FAQ Section — Animated Accordion */}
          <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{guideText.faqHeading}</h2>
            <div className="space-y-3">
              {faqs.map((faq: any, index: number) => (
                <details key={index} data-animated className="group border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/50 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors select-none">
                    <span>{faq.question}</span>
                    <span className="transition-transform duration-200 group-open:rotate-180 text-slate-400 shrink-0 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-2 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* YMYL Editorial Verification & Regulatory Disclosure (Finance & Health Calculators) */}
          {(isFinanceCalc || isHealthCalc) && (
            <aside
              aria-label={guideText.ymylTitle}
              className="mt-8 p-5 md:p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  {guideText.ymylTitle}
                </h3>
                <p>
                  {isFinanceCalc ? guideText.ymylFinanceBody : guideText.ymylHealthBody}
                </p>
              </div>
            </aside>
          )}

          {/* Community Discussions & Real Q&A (Milestone 5.2) */}
          <EmbeddedToolDiscussions
            calcSlug={calc.slug}
            calcTitle={pageTitle}
            calcCategory={calc.category}
            locale={resolvedParams.locale}
          />
        </div>

        {/* Sidebar Area (Right/Bottom) */}
        <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-8 print:hidden">

          {/* Search Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{guideText.findCalc}</h3>
            <form action={`/${resolvedParams.locale}/search`} method="GET" className="relative group">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#518231] transition-colors" />
              </div>
              <input
                type="text"
                name="q"
                placeholder={guideText.searchPlaceholder}
                className="w-full ps-10 pe-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-transparent transition-all"
                required
              />
            </form>
          </div>

          {/* Related Guide in Sidebar */}
          {localizedGuide && guideSlug && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-[#518231]/25 dark:border-[#518231]/35">
              <div className="flex items-center gap-2 text-[#518231] dark:text-[#6fa844] mb-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {guideText.featured}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {localizedGuide.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                {localizedGuide.description}
              </p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {localizedGuide.readingTime} {guideText.minRead}
                </span>
                <Link
                  href={{ pathname: '/guides/[slug]', params: { slug: guideSlug } }}
                  className="font-bold text-[#518231] dark:text-[#6fa844] hover:underline inline-flex items-center gap-1"
                >
                  <span>{guideText.cta}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          )}

          {/* Features */}
          {displayFeatures && displayFeatures.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                {guideText.keyFeatures}
              </h3>
              <ul className="space-y-3">
                {displayFeatures.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#518231] shrink-0 mt-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Use Cases */}
          {displayUseCases && displayUseCases.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>
                {guideText.commonUseCases}
              </h3>
              <ul className="space-y-3">
                {displayUseCases.map((useCase: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Page Links / Quick Navigation */}
          <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6 text-white">
            <h3 className="text-lg font-bold mb-4 pb-4 border-b border-slate-800">{guideText.quickLinks}</h3>
            <ul className="space-y-3">
              {generalLinks.map((link) => {
                let href: any = "/";
                if (link === "Privacy Policy") href = "/privacy-policy";
                if (link === "Terms of Use") href = "/terms-of-use";
                if (link === "About Us") href = "/about-us";
                const linkLabel = quickLinkLabelMap[resolvedParams.locale]?.[link] || link;
                return (
                  <li key={link}>
                    <Link
                      href={href}
                      className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      {linkLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Ad Placement Sidebar (Sticky) */}
          <div className="sticky top-24 pt-4">
            <AdSenseContainer slot="calculator_sidebar_1" />
          </div>

        </aside>
      </div>

      {/* Bidirectional Topic Cluster Links: Side-by-Side Comparisons & Curated Workflow Toolkits */}
      {(relatedComparisons.length > 0 || relatedCollections.length > 0) && (
        <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 print:hidden">
          {relatedComparisons.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-[#518231]" />
                  <span>{guideText.comparisonsHeading}</span>
                </h2>
                <Link
                  href={resolveIntlHref('/compare')}
                  className="text-sm font-bold text-[#518231] hover:text-[#436a28] dark:text-[#6fa844] hover:underline inline-flex items-center"
                >
                  {guideText.viewAllComparisons} <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
                </Link>
              </div>
              <div className="space-y-4">
                {relatedComparisons.map((comp) => {
                  const compTr = comp.translations?.[resolvedParams.locale];
                  const compTitle = compTr?.title || comp.title;
                  const compVerdict = compTr?.verdict || comp.verdict;
                  return (
                    <Link
                      key={comp.slug}
                      href={resolveIntlHref(`/compare/${comp.slug}`)}
                      className="group block bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 dark:hover:border-[#518231]/40 transition-all"
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors">
                          {compTitle}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#518231] group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {compVerdict}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {relatedCollections.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-[#518231]" />
                  <span>{guideText.collectionsHeading}</span>
                </h2>
                <Link
                  href={resolveIntlHref('/collections')}
                  className="text-sm font-bold text-[#518231] hover:text-[#436a28] dark:text-[#6fa844] hover:underline inline-flex items-center"
                >
                  {guideText.viewAllCollections} <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
                </Link>
              </div>
              <div className="space-y-4">
                {relatedCollections.map((col) => {
                  const colTr = col.translations?.[resolvedParams.locale];
                  const colTitle = colTr?.title || col.title;
                  const colDesc = colTr?.description || col.description;
                  return (
                    <Link
                      key={col.slug}
                      href={resolveIntlHref(`/collections/${col.slug}`)}
                      className="group block bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 dark:hover:border-[#518231]/40 transition-all"
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors">
                          {colTitle}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#518231] group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {colDesc}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Related Calculators - Moved to bottom */}
      <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{guideText.relatedCalcs}</h2>
          <Link
            href={categoryDef ? resolveIntlHref(`/calculators/category/${categoryDef.id}`) : resolveIntlHref('/sitemap')}
            className="text-sm font-bold text-[#518231] hover:text-[#436a28] dark:text-[#6fa844] dark:hover:text-[#518231] hover:underline inline-flex items-center"
          >
            {guideText.viewAll} <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedTools.slice(0, 8).map((toolSlug) => {
            const targetCalc = getCalculatorBySlug(toolSlug);
            if (!targetCalc) return null;
            const { title: targetTitle, description: targetDesc } = getLocalizedCalcInfo(targetCalc, resolvedParams.locale);
            return (
              <Link
                key={toolSlug}
                href={resolveIntlHref(`/calculators/${toolSlug}`)}
                className="group flex flex-col bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 dark:hover:border-[#518231]/40 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CalculatorIcon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">{targetTitle}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {targetDesc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
