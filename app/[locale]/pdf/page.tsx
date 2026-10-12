import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link, resolveIntlHref } from "@/i18n/routing";
import { pdfToolsMenu } from "@/lib/data/sitemapData";
import { resolveHref } from "@/lib/utils/linkResolver";
import { getCanonicalAndAlternates, getCanonicalUrl } from "@/lib/utils/seoUtils";
import { getLocalizedToolMeta } from "@/lib/utils/toolLocalization";
import {
  FileText,
  File,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export const revalidate = false;

const pdfCopy: Record<string, {
  title: string;
  description: string;
  home: string;
  breadcrumb: string;
  badge: (n: number) => string;
  h1: string;
  subtitle: string;
  jumpTo: string;
  toolsCount: (n: number) => string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    title: "Free Online PDF Tools – Merge, Split, Compress & Edit PDFs",
    description: "Master suite of free online PDF tools. Merge, split, compress, edit, convert, and protect your PDF documents directly in your browser. 100% private, no signup required.",
    home: "Home",
    breadcrumb: "PDF Tools",
    badge: (n) => `${n}+ Free Online PDF Utilities`,
    h1: "All-in-One Online PDF Tools Hub",
    subtitle: "Merge, split, compress, convert, edit, and secure your PDF documents in seconds. Built for high performance, zero data tracking, and seamless document workflows.",
    jumpTo: "Jump To:",
    toolsCount: (n) => `${n} tools`,
    faqTitle: "Frequently Asked Questions About Nexus PDF Tools",
    faqs: [
      {
        q: "Are Nexus PDF tools completely free to use?",
        a: "Yes, 100% of our PDF utilities are completely free to use with no subscription fees, credit card requirements, or daily usage caps.",
      },
      {
        q: "Are my confidential PDF documents safe?",
        a: "Absolutely. Most of our tools operate entirely client-side inside your browser via WebAssembly and HTML5 Canvas. Your documents are never uploaded to remote servers or stored in any database.",
      },
      {
        q: "Do I need to install software or register an account?",
        a: "No installation is required. Every tool runs directly in any modern desktop or mobile browser including Chrome, Firefox, Safari, and Edge.",
      },
      {
        q: "Can I convert PDFs to editable Word, Excel, or PowerPoint files?",
        a: "Yes, our suite includes high-fidelity conversion tools to convert PDF files into DOCX, XLSX, PPTX, HTML, TXT, EPUB, and image formats.",
      },
    ],
  },
  es: {
    title: "Herramientas PDF Gratuitas Online – Unir, Dividir, Comprimir y Editar",
    description: "Herramientas PDF online gratuitas. Une, divide, comprime, edita, convierte y protege documentos PDF directamente en tu navegador. 100% privado y sin registro.",
    home: "Inicio",
    breadcrumb: "Herramientas PDF",
    badge: (n) => `+${n} Utilidades PDF Gratuitas en Línea`,
    h1: "Centro Todo en Uno de Herramientas PDF Online",
    subtitle: "Una, divida, comprima, convierta, edite y proteja sus documentos PDF en segundos. Diseñado para alto rendimiento, privacidad total en el navegador y flujos de trabajo sin interrupciones.",
    jumpTo: "Ir a:",
    toolsCount: (n) => `${n} herramientas`,
    faqTitle: "Preguntas Frecuentes sobre las Herramientas PDF",
    faqs: [
      {
        q: "¿Son totalmente gratuitas las herramientas PDF de Nexus?",
        a: "Sí, el 100 % de nuestras utilidades PDF son gratuitas, sin suscripciones, marcas de agua ni límites diarios.",
      },
      {
        q: "¿Están seguros mis documentos PDF confidenciales?",
        a: "Por supuesto. Las herramientas procesan sus archivos localmente dentro de su navegador mediante WebAssembly y HTML5 sin almacenarlos en servidores externos.",
      },
      {
        q: "¿Necesito instalar software o crear una cuenta?",
        a: "No requiere instalación ni registro. Todas las herramientas funcionan directamente desde cualquier navegador moderno en ordenador o móvil.",
      },
      {
        q: "¿Puedo convertir archivos PDF a Word, Excel o PowerPoint?",
        a: "Sí, contamos con conversores de alta precisión entre PDF y DOCX, XLSX, PPTX, HTML, TXT, EPUB e imágenes.",
      },
    ],
  },
  fr: {
    title: "Outils PDF Gratuits en Ligne – Fusionner, Diviser, Compresser et Éditer",
    description: "Suite complète d'outils PDF en ligne gratuits. Fusionnez, divisez, compressez, éditez, convertissez et protégez vos documents PDF directement dans votre navigateur. 100% privé.",
    home: "Accueil",
    breadcrumb: "Outils PDF",
    badge: (n) => `Plus de ${n} Utilitaires PDF Gratuits`,
    h1: "Centre Tout-en-Un d'Outils PDF en Ligne",
    subtitle: "Fusionnez, divisez, compressez, convertissez, éditez et sécurisez vos documents PDF en quelques secondes directement dans votre navigateur, sans suivi ni inscription.",
    jumpTo: "Aller à :",
    toolsCount: (n) => `${n} outils`,
    faqTitle: "Questions Fréquentes sur les Outils PDF Nexus",
    faqs: [
      {
        q: "Les outils PDF Nexus sont-ils entièrement gratuits ?",
        a: "Oui, 100 % de nos utilitaires PDF sont gratuits, sans abonnement, sans carte bancaire et sans filigrane.",
      },
      {
        q: "Mes documents PDF confidentiels sont-ils en sécurité ?",
        a: "Absolument. Le traitement s'effectue localement dans votre navigateur via WebAssembly et HTML5 Canvas sans stockage sur des serveurs distants.",
      },
      {
        q: "Dois-je installer un logiciel ou créer un compte ?",
        a: "Aucune installation ni inscription n'est requise. Chaque outil fonctionne directement dans Chrome, Firefox, Safari ou Edge sur ordinateur et mobile.",
      },
      {
        q: "Puis-je convertir des PDF en fichiers Word, Excel ou PowerPoint ?",
        a: "Oui, notre suite inclut des outils de conversion haute fidélité vers DOCX, XLSX, PPTX, HTML, TXT, EPUB et formats d'image.",
      },
    ],
  },
  de: {
    title: "Kostenlose Online-PDF-Tools – Zusammenfügen, Teilen, Komprimieren & Bearbeiten",
    description: "Kostenlose Online-PDF-Tools: PDF zusammenfügen, teilen, komprimieren, bearbeiten, konvertieren und schützen direkt im Browser. 100 % privat und sicher.",
    home: "Startseite",
    breadcrumb: "PDF-Tools",
    badge: (n) => `Über ${n} Kostenlose Online-PDF-Tools`,
    h1: "All-in-One Online-PDF-Tools Hub",
    subtitle: "PDF-Dokumente in Sekundenschnelle zusammenfügen, teilen, komprimieren, konvertieren, bearbeiten und schützen. 100 % lokal im Browser ohne Daten-Tracking.",
    jumpTo: "Springen zu:",
    toolsCount: (n) => `${n} Tools`,
    faqTitle: "Häufig gestellte Fragen zu den Nexus PDF-Tools",
    faqs: [
      {
        q: "Sind die PDF-Tools von Nexus komplett kostenlos?",
        a: "Ja, alle PDF-Werkzeuge sind zu 100 % kostenlos nutzbar – ohne Abonnement, ohne Wasserzeichen und ohne Tageslimits.",
      },
      {
        q: "Sind meine vertraulichen PDF-Dokumente sicher?",
        a: "Absolut. Die Verarbeitung erfolgt lokal in Ihrem Browser über WebAssembly und HTML5 Canvas, sodass Ihre Dateien Ihr Gerät nicht verlassen.",
      },
      {
        q: "Muss ich Software installieren oder ein Konto erstellen?",
        a: "Nein, es ist weder eine Installation noch eine Registrierung erforderlich. Alle Tools laufen direkt im Browser auf Desktop und Smartphone.",
      },
      {
        q: "Kann ich PDFs in Word-, Excel- oder PowerPoint-Dateien umwandeln?",
        a: "Ja, unsere Suite bietet präzise Konverter für PDF in DOCX, XLSX, PPTX, HTML, TXT, EPUB sowie Bildformate.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = getCanonicalAndAlternates("/pdf", locale);
  const t = pdfCopy[locale] || pdfCopy.en;

  return {
    title: t.title,
    description: t.description,
    keywords:
      "pdf tools, free online pdf tools, merge pdf, split pdf, compress pdf, convert pdf to word, pdf to excel, protect pdf, edit pdf online, client-side pdf editor",
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
    },
    alternates,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PdfToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pdfCopy[locale] || pdfCopy.en;

  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net").replace(/\/$/, "");
  const canonicalUrl = getCanonicalUrl("/pdf", locale);

  const totalToolsCount = pdfToolsMenu.reduce((acc, cat) => acc + cat.items.length, 0);

  // Structured Data Schemas
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

  const allPdfItems = pdfToolsMenu.flatMap((cat) => cat.items);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t.h1,
    "itemListElement": allPdfItems.slice(0, 30).map((item, idx) => {
      const rawHref = "slug" in item && item.slug ? `/tools/${item.slug}` : resolveHref(item.name);
      const toolSlug = rawHref.startsWith('/tools/') ? rawHref.replace('/tools/', '') : undefined;
      const locMeta = toolSlug ? getLocalizedToolMeta(toolSlug, locale, item.name, item.desc) : { title: item.name, description: item.desc };
      const itemUrl = toolSlug
        ? getCanonicalUrl('/tools/[slug]', locale, toolSlug)
        : rawHref.startsWith('/calculators/')
          ? getCanonicalUrl('/calculators/[slug]', locale, rawHref.replace('/calculators/', ''))
          : getCanonicalUrl(rawHref, locale);
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "name": locMeta.title,
        "url": itemUrl,
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
                <Link href="/" className="hover:text-[#518231] hover:underline">
                  {t.home}
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-800 dark:text-slate-200 font-semibold" aria-current="page">
                {t.breadcrumb}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] text-xs font-bold uppercase tracking-wider mb-4 border border-[#518231]/20">
              <File className="w-3.5 h-3.5" />
              {t.badge(totalToolsCount)}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.h1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Jump Bar */}
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 self-center mr-2">
              {t.jumpTo}
            </span>
            {pdfToolsMenu.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-[#518231] hover:text-[#518231] dark:hover:border-[#518231] transition-all shadow-sm"
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-[#518231]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">100% Private</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Client-side execution</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Lightning Fast</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Zero queue delays</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">No Watermarks</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Clean original quality</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">No Sign-Up</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Instant access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {pdfToolsMenu.map((category) => {
          const CategoryIcon = category.icon || FileText;

          return (
            <div
              key={category.id}
              id={category.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 scroll-mt-24 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] rounded-2xl shrink-0">
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <span>{category.title}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                        {t.toolsCount(category.items.length)}
                      </span>
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                {category.items.map((item: any) => {
                  const rawHref =
                    "slug" in item && item.slug
                      ? `/tools/${item.slug}`
                      : resolveHref(item.name);
                  const toolSlug = rawHref.startsWith('/tools/') ? rawHref.replace('/tools/', '') : undefined;
                  const locMeta = toolSlug ? getLocalizedToolMeta(toolSlug, locale, item.name, item.desc) : { title: item.name, description: item.desc };
                  const resolvedHref =
                    "href" in item && item.href
                      ? (item.href as any)
                      : resolveIntlHref(rawHref);

                  return (
                    <Link
                      key={item.name}
                      href={resolvedHref}
                      className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 hover:border-[#518231]/50 dark:hover:border-[#518231]/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-[15px] group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors">
                            {locMeta.title}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#518231] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {locMeta.description}
                        </p>
                      </div>
                      {item.isNew && (
                        <div className="mt-3">
                          <span className="text-[10px] font-bold text-white bg-violet-600 rounded-full px-2 py-0.5 leading-none">
                            NEW
                          </span>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Informational FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-[#518231]" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t.faqTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {t.faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                  {faq.q}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
