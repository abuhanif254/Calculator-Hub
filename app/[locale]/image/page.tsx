import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link, resolveIntlHref } from "@/i18n/routing";
import { imageToolsMenu } from "@/lib/data/sitemapData";
import { resolveHref } from "@/lib/utils/linkResolver";
import { getCanonicalAndAlternates, getCanonicalUrl } from "@/lib/utils/seoUtils";
import { getLocalizedToolMeta } from "@/lib/utils/toolLocalization";
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

export const revalidate = false;

const imageCopy: Record<string, {
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
    title: "Free Online Image Tools – Compress, Resize, Convert & Edit Photos",
    description: "Comprehensive suite of free client-side image tools. Compress, resize, crop, convert formats (WebP, PNG, JPG, SVG), and edit photos instantly. 100% private in-browser processing.",
    home: "Home",
    breadcrumb: "Image Tools",
    badge: (n) => `${n}+ Free Online Image Utilities`,
    h1: "Free Online Image & Photo Tools Hub",
    subtitle: "Compress, resize, crop, convert, upscale, and edit photos directly in your browser. Experience instant client-side speeds without compromising your privacy or visual fidelity.",
    jumpTo: "Jump To:",
    toolsCount: (n) => `${n} tools`,
    faqTitle: "Frequently Asked Questions About Nexus Image Tools",
    faqs: [
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
    ],
  },
  es: {
    title: "Herramientas de Imagen Online – Comprimir, Redimensionar y Convertir Fotos",
    description: "Herramientas gratuitas para imágenes online. Comprime, cambia tamaño, recorta, convierte formatos (WebP, PNG, JPG, SVG) y edita fotos en tu navegador de forma 100% privada.",
    home: "Inicio",
    breadcrumb: "Herramientas de Imagen",
    badge: (n) => `+${n} Utilidades de Imagen Gratuitas en Línea`,
    h1: "Centro de Herramientas de Imagen y Fotografía Online",
    subtitle: "Comprima, redimensione, recorte, convierta, mejore y edite fotos directamente en su navegador con velocidad instantánea y privacidad total del lado del cliente.",
    jumpTo: "Ir a:",
    toolsCount: (n) => `${n} herramientas`,
    faqTitle: "Preguntas Frecuentes sobre las Herramientas de Imagen",
    faqs: [
      {
        q: "¿Son gratuitas las herramientas de imagen de Nexus?",
        a: "Sí, todas las herramientas de edición, conversión y compresión de imágenes son 100 % gratuitas, sin cargos ocultos ni marcas de agua.",
      },
      {
        q: "¿Mis imágenes se suben a servidores externos?",
        a: "No. El procesamiento ocurre directamente dentro de su navegador web utilizando HTML5 Canvas, WebGL y WebAssembly. Sus fotos nunca salen de su dispositivo.",
      },
      {
        q: "¿Qué formatos de archivo son compatibles?",
        a: "Admitimos PNG, JPG/JPEG, WebP, SVG, GIF, ICO, AVIF y HEIC para compresión, conversión y edición.",
      },
      {
        q: "¿Puedo usar estas herramientas en dispositivos móviles?",
        a: "Sí, todas las herramientas están optimizadas para funcionar de manera fluida en iOS Safari, Android Chrome, tabletas y ordenadores.",
      },
    ],
  },
  fr: {
    title: "Outils d'Image Gratuits en Ligne – Compresser, Redimensionner et Convertir",
    description: "Suite complète d'outils d'image en ligne gratuits. Compressez, redimensionnez, rognez, convertissez et éditez des photos directement dans votre navigateur. 100% privé.",
    home: "Accueil",
    breadcrumb: "Outils d'Image",
    badge: (n) => `Plus de ${n} Utilitaires Photo et Image Gratuits`,
    h1: "Centre d'Outils d'Image et de Photo en Ligne",
    subtitle: "Compressez, redimensionnez, recadrez, convertissez et éditez vos photos directement dans votre navigateur avec une confidentialité totale et une qualité optimale.",
    jumpTo: "Aller à :",
    toolsCount: (n) => `${n} outils`,
    faqTitle: "Questions Fréquentes sur les Outils d'Image Nexus",
    faqs: [
      {
        q: "Les outils d'image Nexus sont-ils gratuits ?",
        a: "Oui, tous nos outils d'édition, de conversion et de compression d'images sont 100 % gratuits, sans filigrane ni abonnement.",
      },
      {
        q: "Mes photos sont-elles envoyées sur des serveurs externes ?",
        a: "Non ! Le traitement s'effectue directement dans votre navigateur via HTML5 Canvas, WebGL et WebAssembly. Vos images ne quittent jamais votre appareil.",
      },
      {
        q: "Quels formats d'image sont pris en charge ?",
        a: "Notre suite prend en charge les formats PNG, JPG/JPEG, WebP, SVG, GIF, ICO, AVIF et HEIC.",
      },
      {
        q: "Puis-je utiliser ces outils sur smartphone et tablette ?",
        a: "Oui, tous nos outils sont entièrement responsives et fonctionnent sur iOS Safari, Android Chrome, tablettes et ordinateurs.",
      },
    ],
  },
  de: {
    title: "Kostenlose Online-Bild-Tools – Komprimieren, Skalieren & Konvertieren",
    description: "Kostenlose Bildbearbeitungs-Tools im Browser: Bilder komprimieren, skalieren, zuschneiden, konvertieren (WebP, PNG, JPG, SVG) und bearbeiten. 100 % privat und sicher.",
    home: "Startseite",
    breadcrumb: "Bild-Tools",
    badge: (n) => `Über ${n} Kostenlose Online-Bild-Tools`,
    h1: "Kostenloser Online-Bild- & Foto-Tools Hub",
    subtitle: "Bilder direkt im Browser komprimieren, skalieren, zuschneiden, konvertieren und bearbeiten. Sofortige Verarbeitung auf Ihrem Gerät bei vollem Datenschutz.",
    jumpTo: "Springen zu:",
    toolsCount: (n) => `${n} Tools`,
    faqTitle: "Häufig gestellte Fragen zu den Nexus Bild-Tools",
    faqs: [
      {
        q: "Sind die Bild-Tools von Nexus kostenlos?",
        a: "Ja, alle Werkzeuge zur Bildbearbeitung, Konvertierung und Komprimierung sind zu 100 % kostenlos – ohne Wasserzeichen oder versteckte Gebühren.",
      },
      {
        q: "Werden meine Bilder auf externe Server hochgeladen?",
        a: "Nein! Die gesamte Verarbeitung erfolgt direkt in Ihrem Browser über HTML5 Canvas, WebGL und WebAssembly. Ihre Fotos verlassen Ihr Gerät nicht.",
      },
      {
        q: "Welche Dateiformate werden unterstützt?",
        a: "Unterstützt werden PNG, JPG/JPEG, WebP, SVG, GIF, ICO, AVIF sowie Apple HEIC.",
      },
      {
        q: "Funktionieren die Bild-Tools auch auf dem Smartphone?",
        a: "Ja, alle Tools sind vollständig responsiv und laufen problemlos auf iOS, Android, Tablets und Desktop-PCs.",
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
  const alternates = getCanonicalAndAlternates("/image", locale);
  const t = imageCopy[locale] || imageCopy.en;

  return {
    title: t.title,
    description: t.description,
    keywords:
      "image tools, free online image editor, compress image, resize image, convert image to webp, png to jpg, heic to jpg, image upscaler, remove image background, client-side photo tools",
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

export default async function ImageToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = imageCopy[locale] || imageCopy.en;

  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net").replace(/\/$/, "");
  const canonicalUrl = getCanonicalUrl("/image", locale);

  const totalToolsCount = imageToolsMenu.reduce((acc, cat) => acc + cat.items.length, 0);

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

  const allImageItems = imageToolsMenu.flatMap((cat) => cat.items);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t.h1,
    "itemListElement": allImageItems.slice(0, 30).map((item, idx) => {
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  const catTranslations: Record<string, Record<string, { title: string; desc: string }>> = {
    es: {
      "image-editing": { title: "Edición y Optimización de Imágenes", desc: "Comprima, redimensione, recorte, mejore con IA y edite sus fotos rápidamente." },
      "image-conversion": { title: "Conversión de Formatos de Imagen", desc: "Convierta fácilmente entre JPG, PNG, WebP, SVG, HEIC, GIF e ICO." },
      "advanced-image-tools": { title: "Herramientas Avanzadas de Imagen", desc: "Utilidades avanzadas para diseñadores y desarrolladores: eliminar fondo, Base64 e IA." },
    },
    fr: {
      "image-editing": { title: "Édition et Optimisation d'Images", desc: "Compressez, redimensionnez, recadrez, améliorez par IA et retouchez vos images rapidement." },
      "image-conversion": { title: "Conversion de Formats d'Image", desc: "Convertissez facilement vos images entre JPG, PNG, WebP, SVG, HEIC, GIF et ICO." },
      "advanced-image-tools": { title: "Outils d'Image Avancés", desc: "Utilitaires avancés pour développeurs et designers : suppression d'arrière-plan, Base64 et IA." },
    },
    de: {
      "image-editing": { title: "Bildbearbeitung & Optimierung", desc: "Bilder schnell komprimieren, zuschneiden, skalieren, per KI vergrößern und bearbeiten." },
      "image-conversion": { title: "Bildformat-Konvertierung", desc: "Konvertieren Sie Bilder mühelos zwischen JPG, PNG, WebP, SVG, HEIC, GIF und ICO." },
      "advanced-image-tools": { title: "Erweiterte Bild-Werkzeuge", desc: "Spezial-Tools für Entwickler und Designer: Hintergrund entfernen, Base64 & KI-Generator." },
    },
  };

  const badgeLabels: Record<string, { b1t: string; b1d: string; b2t: string; b2d: string; b3t: string; b3d: string; b4t: string; b4d: string; newLabel: string }> = {
    en: { b1t: "100% In-Browser", b1d: "Never leaves device", b2t: "Instant Processing", b2d: "Hardware accelerated", b3t: "Lossless Quality", b3d: "Pixel-perfect exports", b4t: "Zero Watermarks", b4d: "Free forever", newLabel: "NEW" },
    es: { b1t: "100% en el Navegador", b1d: "Tus fotos no salen del equipo", b2t: "Procesamiento Instantáneo", b2d: "Acelerado por hardware", b3t: "Calidad sin Pérdidas", b3d: "Exportación píxel a píxel", b4t: "Sin Marcas de Agua", b4d: "100% gratis siempre", newLabel: "NUEVO" },
    fr: { b1t: "100% dans le Navigateur", b1d: "Ne quitte jamais l'appareil", b2t: "Traitement Instantané", b2d: "Accélération matérielle", b3t: "Qualité Sans Perte", b3d: "Exportation au pixel près", b4t: "Zéro Filigrane", b4d: "Gratuit pour toujours", newLabel: "NOUVEAU" },
    de: { b1t: "100 % im Browser", b1d: "Verlässt nie Ihr Gerät", b2t: "Sofort-Verarbeitung", b2d: "Hardwarebeschleunigt", b3t: "Verlustfreie Qualität", b3d: "Pixelgenaue Exporte", b4t: "Keine Wasserzeichen", b4d: "Dauerhaft kostenlos", newLabel: "NEU" },
  };
  const bl = badgeLabels[locale] || badgeLabels.en;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <ImageIcon className="w-3.5 h-3.5" />
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
            {imageToolsMenu.map((category) => {
              const locCat = catTranslations[locale]?.[category.id];
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-[#518231] hover:text-[#518231] dark:hover:border-[#518231] transition-all shadow-sm"
                >
                  {locCat?.title || category.title}
                </a>
              );
            })}
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
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{bl.b1t}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">{bl.b1d}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{bl.b2t}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">{bl.b2d}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{bl.b3t}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">{bl.b3d}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{bl.b4t}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">{bl.b4d}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {imageToolsMenu.map((category) => {
          const CategoryIcon = category.icon || Palette;
          const locCat = catTranslations[locale]?.[category.id];

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
                      <span>{locCat?.title || category.title}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                        {t.toolsCount(category.items.length)}
                      </span>
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {locCat?.desc || category.description}
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
                            {bl.newLabel}
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
