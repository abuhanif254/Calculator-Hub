import type { Metadata, Viewport } from 'next';
import '../../app/globals.css'; // Global styles
import { Link } from '../../i18n/routing';
import { Navbar } from '../../app/components/Navbar';
import { Footer } from '../../app/components/Footer';
import { GlobalSettingsBar } from '../../app/components/GlobalSettingsBar';
import { SettingsProvider } from '../../app/context/SettingsContext';
import { ThemeProvider } from '../../app/components/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';

// Offline-safe font configuration falling back to system-ui sans-serif fonts
const inter = {
  variable: '--font-sans',
  className: 'font-sans',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
    description: 'The ultimate web platform featuring hundreds of highly accurate online calculators alongside professional-grade developer tools, code formatters, and utilities for modern workflows.',
    keywords: 'online calculators, financial calculators, health calculators, developer tools, free web tools, json formatter, html beautifier, code formatter, developer utilities',
    openGraph: {
      title: 'Nexus | Ultimate Calculators & Developer Tools Platform',
      description: 'The ultimate web platform featuring hundreds of highly accurate online calculators alongside professional-grade developer tools, code formatters, and utilities.',
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
      description: 'The ultimate web platform featuring hundreds of highly accurate online calculators alongside professional-grade developer tools, code formatters, and utilities.',
      images: [`${baseUrl}/icons/icon-512x512.png`],
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

import { AuthProvider } from '../../app/components/AuthProvider';
import { CommandPalette } from '../../app/components/CommandPalette';
import { InstallPrompt } from '../../app/components/InstallPrompt';
import Script from 'next/script';

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
    <html lang={locale} dir={['ar', 'he', 'fa', 'ur'].includes(locale) ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nexus" />
        {adClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${inter.variable} font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col dark:bg-slate-950 dark:text-slate-100`}>
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
                <CommandPalette />
                <InstallPrompt />
              </SettingsProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
