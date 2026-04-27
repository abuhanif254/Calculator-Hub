import { Metadata } from 'next';
import { Link as CustomLink, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Scale, ShieldAlert, FileText, GlobeLock, RefreshCcw, Mail } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const languages: Record<string, string> = {
    'x-default': '/en/terms-of-use',
  };
  
  routing.locales.forEach((l) => {
    languages[l] = `/${l}/terms-of-use`;
  });

  return {
    title: 'Terms of Use & Legal Disclaimer | CalculatorCentral',
    description: 'Review the comprehensive international Terms of Use, legal disclaimers, and service guidelines for CalculatorCentral. Clear, transparent policies for our global user base.',
    keywords: ['terms of use', 'legal disclaimer', 'terms of service', 'calculatorcentral policy', 'international terms'],
    alternates: {
      canonical: `/${locale}/terms-of-use`,
      languages,
    },
    openGraph: {
      type: 'website',
      title: 'Terms of Use | CalculatorCentral',
      description: 'Understanding our commitments and your responsibilities while using CalculatorCentral across the globe.',
      siteName: 'CalculatorCentral',
    },
    twitter: {
      card: 'summary',
      title: 'Terms of Use | CalculatorCentral',
      description: 'Review the terms governing the use of CalculatorCentral\'s tools internationally.',
    }
  };
}

export default async function TermsOfUsePage({ params }: { params: Promise<{ locale: string }> }) {
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
            "name": "Terms of Use - CalculatorCentral",
            "description": "Read the Terms of Use and legal disclaimers for CalculatorCentral, outlining user rights and platform rules.",
            "url": "https://www.calculatorcentral.com/terms-of-use",
            "publisher": {
              "@type": "Organization",
              "name": "CalculatorCentral",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.calculatorcentral.com/logo.png"
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
          <li aria-current="page" className="text-slate-700 font-medium">Terms of Use</li>
        </ol>
      </nav>

      <header className="mb-14 border-b border-slate-200 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-slate-100 p-3 rounded-xl text-slate-700">
            <Scale size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Terms of Use</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
          Please review these Terms carefully. By accessing or utilizing CalculatorCentral&apos;s suite of computational tools, you agree to be bound by these internationally applicable terms and conditions.
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
              <li><a href="#acceptance" className="hover:text-blue-600 transition-colors block">1. Acceptance of Terms</a></li>
              <li><a href="#disclaimer" className="hover:text-blue-600 transition-colors block">2. Crucial Disclaimer (No Professional Advice)</a></li>
              <li><a href="#license" className="hover:text-blue-600 transition-colors block">3. Limited License & Interface Use</a></li>
              <li><a href="#accuracy" className="hover:text-blue-600 transition-colors block">4. Accuracy, Metrics, and Standards</a></li>
              <li><a href="#liability" className="hover:text-blue-600 transition-colors block">5. Limitation of Liability</a></li>
              <li><a href="#international" className="hover:text-blue-600 transition-colors block">6. International Compliance</a></li>
              <li><a href="#modifications" className="hover:text-blue-600 transition-colors block">7. Modifications to the Service</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <article className="lg:col-span-8 prose prose-slate prose-lg max-w-none">
          
          <section id="acceptance" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing the website at <strong>CalculatorCentral.com</strong> (&quot;the Website&quot;, &quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to abide by these Terms of Service, all applicable laws and regulations, and agree that you are solely responsible for compliance with any applicable local laws in your jurisdiction.
            </p>
            <p>
              If you do not agree with any of these terms, you are explicitly prohibited from using or accessing this site. The computational tools and materials contained on this website are protected by applicable copyright and trademark laws globally.
            </p>
          </section>

          <section id="disclaimer" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              Crucial Disclaimer (No Professional Advice)
            </h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl my-6 not-prose">
              <div className="flex gap-3">
                <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">Informational Purposes Only</h3>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    All calculators, charts, and associated outputs provided on CalculatorCentral are strictly for broad, educational, and informational purposes. They do <strong>not</strong> constitute, and should not be construed as, professional advice.
                  </p>
                </div>
              </div>
            </div>
            
            <p>We make extensive engineering efforts to ensure the accuracy of our mathematical models; however, you must acknowledge the following truths:</p>
            
            <ul>
              <li><strong>Finance & Legal:</strong> Our loan, mortgage, and tax calculators provide estimations based on standard mathematical formulas. They do not account for hidden local fees, complex tax code nuances, fluctuating market conditions, or personal credit variances. Always consult a Certified Financial Planner (CFP) or Tax Attorney.</li>
              <li><strong>Health & Medical:</strong> BMI, BMR, Pregnancy, and Caloric calculators use established biometric baselines (e.g., Mifflin-St Jeor equation). These are population-based averages. They do not diagnose conditions, account for bone density, or factor in specific diseases. Never substitute these preliminary calculations for the diagnosis of a licensed Medical Doctor (MD).</li>
              <li><strong>No Fiduciary Duty:</strong> CalculatorCentral does not establish any client-fiduciary, patient-doctor, or professional relationship with its users.</li>
            </ul>
          </section>

          <section id="license" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
              Limited License & Interface Use
            </h2>
            <p>
              CalculatorCentral grants you a personal, non-exclusive, non-transferable, and revocable license to use our web-based calculators for non-commercial transitory viewing and computational operations. Under this limited license constraint, you may <strong>not</strong>:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 not-prose">
              <ul className="space-y-3 relative z-10">
                {[
                  "Systematically scrape, mine, or extract calculation endpoints via automated bots or scripts.",
                  "Reverse engineer, decompile, or obfuscate the proprietary React/Next.js client-side architectures.",
                  "Frame or \"mirror\" our proprietary calculators on external domains without explicit written consent.",
                  "Utilize our tools for establishing commercial services that compete directly with CalculatorCentral."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✖</span>
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="accuracy" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
              Accuracy, Metrics, and Standards
            </h2>
            <p>
              While we pride ourselves on utilizing high-performance algorithms, the materials appearing on CalculatorCentral&apos;s website may include technical, typographical, or scientific deviations. CalculatorCentral does not warrant that any of the materials on its website are perpetually accurate, complete, or reflective of the absolute latest scientific literature.
            </p>
            <p>
              We occasionally update algorithms to reflect changes in international consensus (e.g., WHO guidelines for BMI, global banking standards for amortization). However, we are under no explicit obligation to update the materials uniformly or instantaneously.
            </p>
          </section>

          <section id="liability" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
              Limitation of Liability
            </h2>
            <p>
              In no event, under no legal theory (whether in tort, contract, strict liability, or otherwise) shall CalculatorCentral, its engineers, partners, or its suppliers be liable for any damages arising from the use or inability to use the materials on this platform.
            </p>
            <p>
              This includes, without limitation, damages for loss of data, loss of anticipated profits, business interruption, or adverse health events resulting from reliance on our outputs. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you in their entirety.
            </p>
          </section>

          <section id="international" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">6</span>
              International Compliance
            </h2>
            <div className="bg-slate-800 text-white p-6 rounded-2xl not-prose mb-6">
              <div className="flex items-start gap-4">
                <GlobeLock className="text-blue-400 shrink-0" size={28} />
                <p className="text-slate-300 text-sm leading-relaxed">
                  CalculatorCentral operates infrastructure globally. However, if you are accessing these tools from regions with specific localized regulations regarding financial projections, health data (e.g., GDPR, HIPAA, UK DPA), or algorithmic transparency, it is your responsibility to ensure your usage complies with your local sovereign laws.
                </p>
              </div>
            </div>
            <p>
              All computations are managed on distributed edge networks and execute primarily within your local browser client to ensure maximum data privacy. We do not transmit your computational inputs to centralized tracking databases.
            </p>
          </section>

          <section id="modifications" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">7</span>
              Modifications to the Service and Terms
            </h2>
            <p>
              CalculatorCentral reserves the absolute right to revise these terms of service, append new restrictions, or alter the computational logic of any calculator without prior notice. By continuing to use this website subsequent to any changes, you implicitly agree to be bound by the then-current revised version of these Terms of Use.
            </p>
          </section>

          <section id="contact" className="mt-16 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions About Our Terms?</h2>
            <p className="mb-6">
              If you require clarification on any of the stipulations above or have a formal legal inquiry, our compliance team is available.
            </p>
            <a href="mohammadbitullah@gmail.com" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl transition-colors no-underline">
              <Mail size={18} />
              mohammadbitullah@gmail.com
            </a>
          </section>

        </article>
      </div>
    </main>
  );
}
