import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link, routing, resolveIntlHref } from "@/i18n/routing";
import { imageToolsMenu } from "@/lib/data/sitemapData";
import { resolveHref } from "@/lib/utils/linkResolver";
import { getCanonicalAndAlternates, getCanonicalUrl } from "@/lib/utils/seoUtils";
import {
  Image as ImageIcon,
  Palette,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = getCanonicalAndAlternates("/image", locale);

  const titles: Record<string, string> = {
    en: "Free Online Image Tools | Compress, Resize, Convert & Edit Photos",
    es: "Herramientas de Imagen Online | Comprimir, Redimensionar y Convertir Fotos",
    fr: "Outils d'Image Gratuits en Ligne | Compresser, Redimensionner et Convertir",
    de: "Kostenlose Online-Bild-Tools | Komprimieren, Skalieren & Konvertieren",
  };

  const descriptions: Record<string, string> = {
    en: "Comprehensive suite of free client-side image tools. Compress, resize, crop, convert formats (WebP, PNG, JPG, SVG), and edit photos instantly. 100% private in-browser processing.",
    es: "Herramientas gratuitas para imágenes online. Comprime, cambia tamaño, recorta, convierte formatos (WebP, PNG, JPG, SVG) y edita fotos en tu navegador de forma 100% privada.",
    fr: "Suite complète d'outils d'image en ligne gratuits. Compressez, redimensionnez, rognez, convertissez et éditez des photos directement dans votre navigateur. 100% privé.",
    de: "Kostenlose Bildbearbeitungs-Tools im Browser: Bilder komprimieren, skalieren, zuschneiden, konvertieren (WebP, PNG, JPG, SVG) und bearbeiten. 100 % privat und sicher.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    keywords:
      "image tools, free online image editor, compress image, resize image, convert image to webp, png to jpg, heic to jpg, image upscaler, remove image background, client-side photo tools",
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ImageToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net").replace(/\/$/, "");
  const canonicalUrl = getCanonicalUrl("/image", locale);

  const totalToolsCount = imageToolsMenu.reduce((acc, cat) => acc + cat.items.length, 0);

  // Structured Data Schemas
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nexus Image Tools Directory",
    "description": "Comprehensive suite of free client-side image editing, conversion, and optimization tools.",
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
        "name": "Home",
        "item": `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Image Tools",
        "item": canonicalUrl,
      },
    ],
  };

  const allImageItems = imageToolsMenu.flatMap((cat) => cat.items);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Image Tools List",
    "itemListElement": allImageItems.slice(0, 30).map((item, idx) => {
      const rawHref = "slug" in item && item.slug ? `/tools/${item.slug}` : resolveHref(item.name);
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        "url": `${baseUrl}/${locale}${rawHref.startsWith('/') ? rawHref : `/${rawHref}`}`,
      };
    }),
  };

  const faqs = [
    {
      q: "Are Nexus Image tools free to use?",
      a: "Yes, all image editing, conversion, and compression tools are 100% free with no hidden charges, watermarks, or subscription paywalls.",
    },
    {
      q: "Are my images uploaded to external cloud servers?",
      a: "No! Your privacy is protected. Processing happens directly inside your web browser using HTML5 Canvas, WebGL, and WebAssembly APIs. Your photos never leave your device.",
    },
    {
      q: "What file formats are supported?",
      a: "Our suite supports PNG, JPG/JPEG, WebP, SVG, GIF, ICO, AVIF, and Apple HEIC image formats for compression, conversion, and editing.",
    },
    {
      q: "Can I use these image tools on mobile devices?",
      a: "Yes! All tools are fully responsive and optimized to run seamlessly on iOS Safari, Android Chrome, tablets, and desktop workstations.",
    },
  ];

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
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-800 dark:text-slate-200 font-semibold" aria-current="page">
                Image Tools
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] text-xs font-bold uppercase tracking-wider mb-4 border border-[#518231]/20">
              <ImageIcon className="w-3.5 h-3.5" />
              {totalToolsCount}+ Free Online Image Utilities
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Free Online Image &amp; Photo Tools Hub
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Compress, resize, crop, convert, upscale, and edit photos directly in your browser. Experience instant client-side speeds without compromising your privacy or visual fidelity.
            </p>
          </div>

          {/* Quick Jump Bar */}
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 self-center mr-2">
              Jump To:
            </span>
            {imageToolsMenu.map((category) => (
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
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">100% In-Browser</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Never leaves device</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Instant Processing</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Hardware accelerated</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Lossless Quality</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Pixel-perfect exports</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Zero Watermarks</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Free forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {imageToolsMenu.map((category) => {
          const CategoryIcon = category.icon || Palette;

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
                        {category.items.length} tools
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
                  const resolvedHref =
                    "href" in item && item.href
                      ? (item.href as any)
                      : resolveIntlHref(
                          "slug" in item && item.slug
                            ? `/tools/${item.slug}`
                            : resolveHref(item.name)
                        );

                  return (
                    <Link
                      key={item.name}
                      href={resolvedHref}
                      className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 hover:border-[#518231]/50 dark:hover:border-[#518231]/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-[15px] group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors">
                            {item.name}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#518231] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {item.desc}
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
              Frequently Asked Questions About Nexus Image Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {faqs.map((faq, i) => (
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
