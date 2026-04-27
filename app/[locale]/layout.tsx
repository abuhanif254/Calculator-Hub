import type {Metadata, Viewport} from 'next';
import { Inter } from "next/font/google";
import '../../app/globals.css'; // Global styles
import { Link } from '../../i18n/routing';
import { Navbar } from '../../app/components/Navbar';
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
              <footer className="bg-slate-100 border-t border-slate-200 py-8 mt-auto dark:bg-slate-900 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center md:justify-between text-sm text-slate-500 gap-4 md:gap-3">
                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
                  <Link href="/about-us" className="hover:text-blue-600 hover:underline transition-all">about us</Link>
                  <span className="text-slate-300">|</span>
                  <Link href="/sitemap" className="hover:text-blue-600 hover:underline transition-all">sitemap</Link>
                  <span className="text-slate-300">|</span>
                  <Link href="/terms-of-use" className="hover:text-blue-600 hover:underline transition-all">terms of use</Link>
                  <span className="text-slate-300">|</span>
                  <Link href="/privacy-policy" className="hover:text-blue-600 hover:underline transition-all">privacy policy</Link>
                </div>
                <div className="flex items-center gap-1.5 ms-0 md:ms-4">
                  <span>&copy; {new Date().getFullYear()}</span>
                  <Link href="/" className="font-semibold text-slate-700 hover:text-blue-600 hover:underline transition-colors shrink-0">CalculatorCentral</Link>
                </div>
              </div>
            </footer>
            </SettingsProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
