import type {Metadata, Viewport} from 'next';
import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
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
  const baseUrl = process.env.APP_URL || 'https://calculatorcentral.com';
  
  return {
    metadataBase: new URL(baseUrl),
    applicationName: 'CalculatorCentral',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'CalculatorCentral',
    },
    title: {
      default: 'CalculatorCentral | Fast & Accurate Online Calculators',
      template: '%s | CalculatorCentral'
    },
    description: 'Hundreds of highly accurate, high-performance calculators for financial, health, math, and everyday needs designed for global standards.',
    keywords: 'calculator, online calculator, financial calculator, health calculator, math calculator, free calculator',
    openGraph: {
      title: 'CalculatorCentral | Fast & Accurate Online Calculators',
      description: 'Hundreds of highly accurate calculators for everyday needs.',
      url: `${baseUrl}/${locale}`,
      siteName: 'CalculatorCentral',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'CalculatorCentral | Fast & Accurate Online Calculators',
      description: 'Hundreds of highly accurate calculators for everyday needs.',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
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

  return (
    <html lang={locale} dir={['ar', 'he', 'fa', 'ur'].includes(locale) ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col dark:bg-slate-950 dark:text-slate-100`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SettingsProvider>
              <GlobalSettingsBar />
              <Navbar />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </SettingsProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
