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
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { Inter } from 'next/font/google';
import Script from 'next/script';
// ClientShell: holds all `dynamic({ ssr:false })` imports.
// next/dynamic with ssr:false is ONLY allowed inside Client Components —
// this wrapper file carries the 'use client' boundary so this Server
// Component doesn't violate that rule.
import { ClientShell } from '../../app/components/ClientShell';

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
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

  return {
    metadataBase: new URL(baseUrl),
    applicationName: 'Nexus Calculator',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Nexus Calculator',
    },
    title: {
      default: 'Nexus | Ultimate Calculators & Developer Tools Platform',
      template: '%s | Nexus'
    },
    description: 'The ultimate web platform with hundreds of highly accurate online calculators and professional developer tools, formatters, and utilities.',
    keywords: 'online calculators, financial calculators, health calculators, developer tools, free web tools, json formatter, html beautifier, code formatter, developer utilities',
    openGraph: {
      title: 'Nexus | Ultimate Calculators & Developer Tools Platform',
      description: 'The ultimate web platform with hundreds of highly accurate online calculators and professional developer tools, formatters, and utilities.',
      url: `${baseUrl}/${locale}`,
      siteName: 'Nexus',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/icons/icon-512x512.png`,
          width: 512,
          height: 512,
          alt: 'Nexus Calculator — Calculators & Developer Tools Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Nexus | Ultimate Calculators & Developer Tools Platform',
      description: 'The ultimate web platform with hundreds of highly accurate online calculators and professional developer tools, formatters, and utilities.',
      images: [`${baseUrl}/icons/icon-512x512.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
        'x-default': `${baseUrl}/en`
      },
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
  const messages = await getMessages();

  // Retrieve AdSense Client ID
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang={locale} dir={['ar', 'he', 'fa', 'ur'].includes(locale) ? 'rtl' : 'ltr'} suppressHydrationWarning className={inter.variable}>
      <head>
        {/* ── Critical resource hints ─────────────────────────────────────
             preconnect: opens TCP/TLS handshake before the resource is needed.
             dns-prefetch: fallback for browsers that don't support preconnect. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nexus" />
        {/* AdSense: lazyOnload defers until ALL page resources have loaded.
            Compared to afterInteractive this saves 200-400ms of TBT. */}
        {adClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
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
        <a href="#global-content" className="skip-to-content">Skip to main content</a>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <SettingsProvider>
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
              </SettingsProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
