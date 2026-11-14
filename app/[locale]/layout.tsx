import type { Metadata, Viewport } from 'next';
import '../../app/globals.css'; // Global styles
import { Navbar } from '../../app/components/Navbar';
import { Footer } from '../../app/components/Footer';
import { GlobalSettingsBar } from '../../app/components/GlobalSettingsBar';
import { AuthProvider } from '../../app/components/AuthProvider';
import { SettingsProvider } from '../../app/context/SettingsContext';
// ThemeProvider: must be a STATIC import — it writes the `class` attr on <html>
// before first paint. If lazy-loaded, dark-mode users see a white flash (FOUC).
import { ThemeProvider } from '../../app/components/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { Inter } from 'next/font/google';
// ClientShell: holds all `dynamic({ ssr:false })` imports.
// next/dynamic with ssr:false is ONLY allowed inside Client Components —
// this wrapper file carries the 'use client' boundary so this Server
// Component doesn't violate that rule.
import { ClientShell } from '../../app/components/ClientShell';
import { AdSenseScriptLoader } from '../../app/components/AdSenseScriptLoader';

// Inter — the industry-standard professional typeface for tool/SaaS platforms
// Weights: 400 (body), 500 (medium), 600 (semibold), 700 (bold).
// 800/900 removed — saves ~50KB. Tailwind extrabold/black renders as 700 gracefully.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // viewport-fit=cover is required for env(safe-area-inset-*) to work
  // on iPhones with notch / Dynamic Island / home bar
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');

  const metaByLocale: Record<string, { title: string; description: string; keywords: string }> = {
    en: {
      title: 'Nexus | Ultimate Calculators & Developer Tools Platform',
      description: 'The ultimate web platform with hundreds of highly accurate online calculators and professional developer tools, formatters, and utilities.',
      keywords: 'online calculators, financial calculators, health calculators, developer tools, free web tools, json formatter, html beautifier, code formatter, developer utilities',
    },
    es: {
      title: 'Nexus | Calculadoras Online y Herramientas de Desarrollo',
      description: 'Plataforma web con cientos de calculadoras financieras, médicas y científicas de alta precisión y herramientas gratuitas para desarrolladores.',
      keywords: 'calculadoras online, calculadoras financieras, calculadoras de salud, herramientas de desarrollo, herramientas web gratis, formateador json',
    },
    fr: {
      title: 'Nexus | Calculatrices en Ligne et Outils Développeur',
      description: 'Plateforme web complète réunissant des centaines de calculatrices financières, médicales et scientifiques de haute précision et des outils développeur gratuits.',
      keywords: 'calculatrices en ligne, calculatrices financieres, calculatrices sante, outils developpeur, outils web gratuits, formateur json',
    },
    de: {
      title: 'Nexus | Plattform für Online-Rechner & Entwickler-Tools',
      description: 'Die umfassende Web-Plattform mit hunderten präzisen Finanz-, Gesundheits- und Wissenschaftsrechnern sowie professionellen Entwickler-Werkzeugen.',
      keywords: 'online rechner, finanzrechner, gesundheitsrechner, entwickler tools, kostenlose web tools, json formatierer',
    },
  };
  const m = metaByLocale[locale] || metaByLocale.en;
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-9824094207004107';

  return {
    metadataBase: new URL(baseUrl),
    applicationName: 'Nexus Calculator',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Nexus Calculator',
    },
    title: {
      default: m.title,
      template: '%s | Nexus'
    },
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Nexus',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/icons/icon-512x512.png`,
          width: 512,
          height: 512,
          alt: m.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [`${baseUrl}/icons/icon-512x512.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Retrieve AdSense Client ID (defaults to publisher ID in public/ads.txt so SSR HTML always includes verification tags)
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-9824094207004107';
  const skipLabel =
    locale === 'es'
      ? 'Saltar al contenido principal'
      : locale === 'fr'
      ? 'Aller au contenu principal'
      : locale === 'de'
      ? 'Zum Hauptinhalt springen'
      : 'Skip to main content';

  return (
    <html lang={locale} dir={['ar', 'he', 'fa', 'ur'].includes(locale) ? 'rtl' : 'ltr'} suppressHydrationWarning className={inter.variable}>
      <head>
        {/* ── Critical resource hints ─────────────────────────────────────
             NOTE: fonts.googleapis.com preconnect is intentionally OMITTED.
             next/font/google self-hosts font files at build time — they are
             served from YOUR domain, not googleapis.com. Adding a preconnect
             to googleapis.com is wasteful (Lighthouse flags it as unused).

             dns-prefetch for Firebase + AdSense: these ARE requested at
             runtime (Firebase auth/Firestore, AdSense ad units). */}
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="alternate" type="application/rss+xml" title="NexusCalculator — Guides, Comparisons & Engineering Updates" href="/feed.xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nexus" />
        <meta name="google-adsense-account" content={adClientId} />
        {/* Google Consent Mode v2 Default Initialization (EEA / UK / CH GDPR Compliance) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              (function() {
                var saved = null;
                try { saved = localStorage.getItem('nexus_cookie_consent'); } catch (e) {}
                var adGranted = saved === 'accepted';
                var analyticsGranted = saved === 'accepted';
                var explicitChoice = saved === 'accepted' || saved === 'declined';
                if (saved && saved.charAt(0) === '{') {
                  try {
                    var parsed = JSON.parse(saved);
                    adGranted = !!parsed.advertising;
                    analyticsGranted = !!parsed.analytics;
                    explicitChoice = true;
                  } catch (e) {}
                }
                gtag('consent', 'default', {
                  'ad_storage': adGranted ? 'granted' : 'denied',
                  'ad_user_data': adGranted ? 'granted' : 'denied',
                  'ad_personalization': adGranted ? 'granted' : 'denied',
                  'analytics_storage': analyticsGranted ? 'granted' : 'denied',
                  'region': ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'],
                  'wait_for_update': 500
                });
                gtag('consent', 'default', {
                  'ad_storage': explicitChoice ? (adGranted ? 'granted' : 'denied') : 'granted',
                  'ad_user_data': explicitChoice ? (adGranted ? 'granted' : 'denied') : 'granted',
                  'ad_personalization': explicitChoice ? (adGranted ? 'granted' : 'denied') : 'granted',
                  'analytics_storage': explicitChoice ? (analyticsGranted ? 'granted' : 'denied') : 'granted'
                });
                if (explicitChoice && !adGranted) {
                  window.adsbygoogle = window.adsbygoogle || [];
                  window.adsbygoogle.requestNonPersonalizedAds = 1;
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col dark:bg-[#090E17] dark:text-slate-100 relative overflow-x-hidden max-w-full">
        {/* Ambient Glassmorphism Background Layers
            will-change + contain:strict isolates them to their own GPU compositor
            layer, preventing full-page repaints on every animation frame. */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#518231]/10 dark:bg-[#518231]/15 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-ambient-glow-10" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-ambient-glow-15-rev" />
        </div>

        {/* Skip to Content — WCAG 2.4.1 Level A */}
        <a href="#global-content" className="skip-to-content">{skipLabel}</a>
        <NextIntlClientProvider locale={locale} messages={{}}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <SettingsProvider initialLocale={locale}>
                <div id="global-header" className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
                  <GlobalSettingsBar />
                  <Navbar />
                </div>
                <div id="global-content" className="flex-1">
                  {children}
                </div>
                <div id="global-footer">
                  <Footer />
                </div>
                {/* Lazy-loaded overlays — deferred via ClientShell's dynamic() calls.
                    CommandPalette, InstallPrompt, BackToTop, CookieBanner all load
                    AFTER the critical UI is interactive, saving TBT and FCP. */}
                <ClientShell />
                {adClientId && <AdSenseScriptLoader adClientId={adClientId} />}
              </SettingsProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
