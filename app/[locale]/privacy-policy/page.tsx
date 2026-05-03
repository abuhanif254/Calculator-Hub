import { Metadata } from 'next';
import { Link as CustomLink, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { ShieldCheck, Eye, GlobeLock, Cookie, Database, Mail, RefreshCcw, FileText } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const languages: Record<string, string> = {
    'x-default': '/en/privacy-policy',
  };
  
  routing.locales.forEach((l) => {
    languages[l] = `/${l}/privacy-policy`;
  });

  return {
    title: 'Privacy Policy & Data Security | Nexus Calculator',
    description: 'Detailed Privacy Policy for Nexus Calculator. Learn how we prioritize data minimalization, utilize ephemeral processing, and comply with GDPR, CCPA, and global privacy standards.',
    keywords: ['privacy policy', 'data security', 'gdpr compliance', 'ccpa compliance', 'nexus calculator privacy', 'international privacy guidelines'],
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages,
    },
    openGraph: {
      type: 'website',
      title: 'Privacy Policy | Nexus Calculator',
      description: 'Understanding how we protect your data footprint across our international computational platform.',
      siteName: 'Nexus Calculator',
    },
    twitter: {
      card: 'summary',
      title: 'Privacy Policy | Nexus Calculator',
      description: 'Review our commitment to your privacy and international data protection standards.',
    }
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return (
    <main className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 font-sans">
      {/* JSON-LD Structured Data for WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy - Nexus Calculator",
            "description": "Read the Nexus Calculator Privacy Policy. Learn about our strict data handling procedures and global compliance standards.",
            "url": "https://nexuscalculator.net/privacy-policy",
            "publisher": {
              "@type": "Organization",
              "name": "Nexus Calculator",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nexuscalculator.net/logo.png"
              }
            }
          })
        }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-8">
        <ol className="flex items-center space-x-2">
          <li>
            <CustomLink href="/" className="hover:text-blue-600 hover:underline transition-colors">Home</CustomLink>
          </li>
          <li><span className="mx-1 text-slate-400">/</span></li>
          <li aria-current="page" className="text-slate-700 font-medium">Privacy Policy</li>
        </ol>
      </nav>

      <header className="mb-14 border-b border-slate-200 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-slate-100 p-3 rounded-xl text-slate-700">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
          We believe privacy is a fundamental right. This document outlines our transparent approach to data processing, tracking technologies, and international regulatory compliance.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
          <RefreshCcw size={16} className="text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Effective Date: January 1, 2024</span>
          <span className="text-slate-300 mx-1">|</span>
          <span className="text-sm text-slate-500">Last Modified: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Table of Contents - Sticky Sidebar */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText size={16} className="text-slate-500" />
              Contents
            </h3>
            <ul className="space-y-3 text-sm font-medium text-slate-600">
              <li><a href="#data-minimization" className="hover:text-blue-600 transition-colors block">1. The Principle of Data Minimization</a></li>
              <li><a href="#information-collection" className="hover:text-blue-600 transition-colors block">2. Information Collection & Usage</a></li>
              <li><a href="#cookies-tracking" className="hover:text-blue-600 transition-colors block">3. Cookies & Tracking Technologies</a></li>
              <li><a href="#advertising" className="hover:text-blue-600 transition-colors block">4. Third-Party Advertisers (Google AdSense)</a></li>
              <li><a href="#international-compliance" className="hover:text-blue-600 transition-colors block">5. International Privacy Laws (GDPR/CCPA)</a></li>
              <li><a href="#data-security" className="hover:text-blue-600 transition-colors block">6. Infrastructure Security</a></li>
              <li><a href="#childrens-privacy" className="hover:text-blue-600 transition-colors block">7. Children&apos;s Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <article className="lg:col-span-8 prose prose-slate prose-lg max-w-none">
          
          <section id="data-minimization" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              The Principle of Data Minimization
            </h2>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl my-6 not-prose">
              <div className="flex gap-3">
                <Database className="text-emerald-600 shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="font-bold text-emerald-900 mb-1">Ephemeral Processing</h3>
                  <p className="text-emerald-800 text-sm leading-relaxed">
                    Nexus Calculator is fundamentally designed to function without requiring user accounts or storing personal identities. We process your inputs locally in your browser or ephemerally on edge servers. No calculation data is persistently mapped to your identity.
                  </p>
                </div>
              </div>
            </div>
            <p>
              Welcome to Nexus Calculator (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring you have a secure experience on our international platform. This Policy applies to all our computational tools and governs our global data practices.
            </p>
          </section>

          <section id="information-collection" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              Information Collection & Usage
            </h2>
            <p>We believe in strict data minimization. We only collect telemetry data strictly necessary to route traffic efficiently across our edge networks and ensure platform stability.</p>
            <ul>
              <li><strong>Technical Metadata:</strong> As with standard web architecture, our servers log generalized diagnostic data, such as your browser type, operating system, referring URL, and truncated IP ranges. This is utilized solely for DDOS mitigation and network performance routing.</li>
              <li><strong>Computational Inputs:</strong> Information entered into our specific calculators (e.g., mortgage balances, health metrics, geometric coordinates) is processed strictly to yield your immediate result. We do <strong>not</strong> save, aggregate, or train machine learning models on your personal calculator entries.</li>
            </ul>
          </section>

          <section id="cookies-tracking" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
              Cookies & Tracking Technologies
            </h2>
            <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 not-prose mb-6">
              <Cookie className="text-orange-500 shrink-0" size={28} />
              <p className="text-slate-700 text-sm leading-relaxed m-0">
                Our web application leverages cookies and precise local storage APIs to preserve your session state (such as dark mode preferences and active locale configurations) and deliver network advertisements.
              </p>
            </div>
            <ul>
              <li><strong>Session Mechanics (Essential):</strong> Required for the fundamental routing mechanisms of Next.js and internationalization.</li>
              <li><strong>Performance Analytics:</strong> We utilize privacy-conscious analytical tools (such as Google Analytics) utilizing anonymized tracking tags to comprehend global traffic flows. These metrics identify failing UI elements and popular toolsets.</li>
              <li><strong>Consent Management:</strong> Depending on your jurisdiction, you have complete sovereignty over non-essential cookie injection through our automated consent banner or standard browser Do-Not-Track (DNT) headers.</li>
            </ul>
          </section>

          <section id="advertising" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
              Third-Party Advertisers
            </h2>
            <p>
              To maintain our tier-1 infrastructure completely free of charge, Nexus Calculator utilizes managed ad networks, primarily Google AdSense.
            </p>
            <p>
              Google uses advertising cookies to serve ads to users based on their prior visits to this and other websites. Google&apos;s deployment of the DART cookie enables it and its affiliates to establish interest profiles. 
            </p>
            <p className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm mt-4">
              <strong>Opt-Out Protocol:</strong> Users possess the universal right to opt-out of personalized advertisement mapping by navigating to the <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">Google Ads Settings</a> interface. Comprehensive details exist within the <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">Google Partner Policy documentation</a>.
            </p>
          </section>

          <section id="international-compliance" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
              International Privacy Laws
            </h2>
            
            <div className="bg-slate-800 text-white p-6 rounded-2xl not-prose mb-6">
              <div className="flex items-start gap-4">
                <GlobeLock className="text-blue-400 shrink-0" size={28} />
                <p className="text-slate-300 text-sm leading-relaxed">
                  As an internationally scaled utility, Nexus Calculator acknowledges localized sovereign data rights. We adhere to frameworks mitigating unauthorized extraction of Personally Identifiable Information (PII).
                </p>
              </div>
            </div>

            <ul>
              <li><strong>GDPR (EEA & UK):</strong> Users within the European Economic Area retain absolute rights regarding data erasure, algorithmic transparency (&quot;Right to Know&quot;), and rectification. Because we do not mandate authentication accounts, erasing your local browser cache effectively purges your local telemetry configuration.</li>
              <li><strong>CCPA/CPRA (California):</strong> Californian residents are granted explicit notifications regarding the potential &quot;sharing&quot; of metadata with our advertising syndicates. You retain the right to formally opt out of such exchanges.</li>
            </ul>
          </section>

          <section id="data-security" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">6</span>
              Infrastructure Security
            </h2>
            <p>
              We implement sophisticated edge-level routing and forced TLS cryptographic tunnels (HTTPS) for all connections. While we endeavor to establish Fort Knox-level defenses against external infiltration, the inherent architecture of the global web means no transmission vector exhibits absolute zero-trust perfection.
            </p>
          </section>

          <section id="childrens-privacy" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">7</span>
              Children&apos;s Privacy
            </h2>
            <p>
              Nexus Calculator implements mathematical tools utilized across all age groups, including students. However, our advertising frameworks and technical telemetry are not designed to knowingly harvest PII from individuals under the age of 13. Should a guardian discover anomalous data collection from a minor, they are instructed to engage our DPO immediately.
            </p>
          </section>

          <section id="contact" className="mt-16 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Our Privacy Office</h2>
            <p className="mb-6">
              For elevated inquiries demanding the attention of our Data Protection Officer (DPO), or to initiate a formal &quot;Right to Forget&quot; protocol, please utilize the encrypted channel below.
            </p>
            <div className="flex gap-4">
              <a href="mailto:nexuscalculator@gmail.com" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl transition-colors no-underline">
                <Mail size={18} />
                E-Mail
              </a>
              <CustomLink href="/about-us" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors no-underline">
                <Eye size={18} />
                About Our Platform
              </CustomLink>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}
