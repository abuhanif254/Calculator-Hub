import { Metadata } from 'next';
import { Link as CustomLink, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Scale, ShieldAlert, FileText, GlobeLock, RefreshCcw, Mail, Code, FileCode, ImageIcon, Calculator, AlertOctagon, Copyright } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  return {
    title: 'Terms of Use & Legal Disclaimer | Nexus Tools Platform',
    description: 'Review the comprehensive international Terms of Use, legal disclaimers, and service guidelines for the Nexus Tools Platform. Clear policies for our developer tools, PDF utilities, image editors, and calculators.',
    keywords: ['terms of use', 'legal disclaimer', 'terms of service', 'nexus tools policy', 'developer tools terms', 'pdf utility terms', 'image processing terms', 'international terms'],
    alternates: getCanonicalAndAlternates('/terms-of-use', locale),
    openGraph: {
      type: 'website',
      title: 'Terms of Use | Nexus Tools Platform',
      description: 'Understanding our commitments and your responsibilities while using Nexus Tools across the globe.',
      siteName: 'Nexus Calculator & Tools',
    },
    twitter: {
      card: 'summary',
      title: 'Terms of Use | Nexus Tools',
      description: 'Review the terms governing the use of Nexus Tools internationally.',
    }
  };
}

export default async function TermsOfUsePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 font-sans">
      {/* JSON-LD Structured Data for WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Use - Nexus Tools Platform",
            "description": "Read the Terms of Use and legal disclaimers for Nexus Tools, outlining user rights and platform rules for our expansive utility suite.",
            "url": "https://nexuscalculator.net/terms-of-use",
            "publisher": {
              "@type": "Organization",
              "name": "Nexus",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nexuscalculator.net/icons/icon-512x512.png"
              }
            }
          })
        }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <ol className="flex items-center space-x-2">
          <li>
            <CustomLink href="/" className="hover:text-[#518231] dark:hover:text-[#6fa844] hover:underline transition-colors">Home</CustomLink>
          </li>
          <li><span className="mx-1 text-slate-400 dark:text-slate-600">/</span></li>
          <li aria-current="page" className="text-slate-700 dark:text-slate-300 font-medium">Terms of Use</li>
        </ol>
      </nav>

      <header className="mb-14 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-700 dark:text-slate-300">
            <Scale size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Terms of Use & Legal Guidelines</h1>
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          Please review these Terms carefully. By accessing or utilizing the Nexus platform—including our comprehensive suite of developer utilities, PDF processors, image editors, and high-precision calculators—you agree to be bound by these internationally applicable terms and conditions.
        </p>
        <div className="mt-6 inline-flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
          <RefreshCcw size={16} className="text-slate-500 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Effective Date: January 1, 2024</span>
          <span className="text-slate-300 dark:text-slate-700 mx-1">|</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">Last Modified: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Table of Contents - Sticky Sidebar */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText size={16} className="text-slate-500" />
              Contents
            </h3>
            <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><a href="#acceptance" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">1. Acceptance of Terms</a></li>
              <li><a href="#service-description" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">2. Comprehensive Service Description</a></li>
              <li><a href="#disclaimer" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">3. Crucial Disclaimer (No Professional Advice)</a></li>
              <li><a href="#license" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">4. Intellectual Property & Limited License</a></li>
              <li><a href="#user-conduct" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">5. User Conduct and Responsibilities</a></li>
              <li><a href="#tool-specific-terms" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">6. Tool-Specific Terms and Limitations</a></li>
              <li><a href="#accuracy" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">7. Accuracy, Metrics, and Standards</a></li>
              <li><a href="#third-party" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">8. Third-Party Services and Advertising</a></li>
              <li><a href="#liability" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">9. Limitation of Liability and Warranties</a></li>
              <li><a href="#indemnification" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">10. Indemnification</a></li>
              <li><a href="#international" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">11. International Compliance</a></li>
              <li><a href="#modifications" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">12. Modifications & Termination</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <article className="lg:col-span-8 prose prose-slate dark:prose-invert prose-lg max-w-none">
          
          <section id="acceptance" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing the website at <strong>NexusCalculator.net</strong> (referred to herein as &quot;the Website&quot;, &quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to abide by these Terms of Service, all applicable global laws and regulations, and agree that you are solely responsible for compliance with any applicable local laws in your jurisdiction.
            </p>
            <p>
              If you do not agree with any of these terms, you are explicitly prohibited from using or accessing this site. The computational tools, software, graphics, and materials contained on this website are protected by applicable copyright, trademark, and intellectual property laws globally. Your continued use of the Platform signifies your irrevocable acceptance of these terms.
            </p>
          </section>

          <section id="service-description" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              Comprehensive Service Description
            </h2>
            <p>
              Nexus operates as an all-encompassing digital utility ecosystem. While originally conceived as a mathematical calculation platform, our services have exponentially expanded to serve a global audience of software engineers, designers, financial analysts, and everyday users. Our free online utility platform consists of four primary domains:
            </p>
            <ul>
              <li><strong>Developer Utilities:</strong> Including, but not limited to, JSON formatters, CSS minifiers, Base64 encoders/decoders, SQL formatters, cryptographic hash generators, and string manipulators.</li>
              <li><strong>Professional PDF Tools:</strong> Utilities designed to compress PDFs, merge multiple PDF documents, split PDF files, extract pages, and convert PDF to Word or Image formats utilizing client-side WebAssembly algorithms.</li>
              <li><strong>Image & Media Processing:</strong> Capabilities for converting image formats (JPG, PNG, WebP, SVG, ICO), compressing large visual assets, generating CSS shadows, and executing AI-powered background removal.</li>
              <li><strong>High-Precision Calculators:</strong> Sophisticated algorithms for computing financial scenarios (mortgage, auto loan, amortization), health metrics (BMI, BMR, caloric needs), and complex scientific formulas.</li>
            </ul>
            <p>
              We reserve the absolute right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice or liability.
            </p>
          </section>

          <section id="disclaimer" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
              Crucial Disclaimer (No Professional Advice)
            </h2>
            <div className="bg-[#518231]/5 border-l-4 border-[#518231] p-5 rounded-r-xl my-6 not-prose">
              <div className="flex gap-3">
                <ShieldAlert className="text-[#518231] shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Informational and Utility Purposes Only</h3>
                  <p className="text-slate-800 dark:text-slate-300 text-sm leading-relaxed">
                    All tools, calculators, code formatters, and associated outputs provided on the Nexus Platform are strictly for broad, educational, informational, and general utility purposes. They do <strong>not</strong> constitute, and should never be construed as, professional legal, financial, medical, or software engineering advice.
                  </p>
                </div>
              </div>
            </div>
            
            <p>We make extensive engineering efforts to ensure the accuracy of our software architecture; however, you must acknowledge the following truths:</p>
            
            <ul>
              <li><strong>Finance & Legal Limitations:</strong> Our loan, mortgage, and tax calculators provide estimations based on standard mathematical formulas. They do not account for hidden local fees, complex tax code nuances, fluctuating market conditions, or personal credit variances. Always consult a Certified Financial Planner (CFP) or Tax Attorney before making financial commitments.</li>
              <li><strong>Health & Medical Limitations:</strong> Health calculators use established biometric baselines (e.g., Mifflin-St Jeor equation). These are population-based averages. They do not diagnose conditions, account for bone density, or factor in specific diseases. Never substitute these preliminary calculations for the diagnosis of a licensed Medical Doctor (MD).</li>
              <li><strong>Software & Code Limitations:</strong> While our developer utilities (like JSON formatters or Base64 encoders) are built to global standards, you are solely responsible for testing any generated or formatted code before deploying it to production environments. We are not liable for software bugs, security vulnerabilities, or server downtime resulting from the use of our code utilities.</li>
              <li><strong>No Fiduciary Duty:</strong> The Nexus Platform does not establish any client-fiduciary, patient-doctor, or professional relationship with its users.</li>
            </ul>
          </section>

          <section id="license" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
              Intellectual Property & Limited License
            </h2>
            <p>
              The Nexus Platform, including its underlying React/Next.js architecture, proprietary WebAssembly modules, original graphics, UI/UX designs, and algorithmic implementations, are the exclusive property of Nexus and its licensors. 
            </p>
            <p>
              We grant you a personal, non-exclusive, non-transferable, and revocable license to use our web-based tools for non-commercial and commercial transitory viewing and computational operations, provided you interact with the tools directly through our web interface. Under this limited license constraint, you are explicitly prohibited from performing any of the following:
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 not-prose mb-6">
              <ul className="space-y-3 relative z-10">
                {[
                  "Systematically scrape, mine, or extract calculation endpoints or tool logic via automated bots, spiders, or scripts.",
                  "Reverse engineer, decompile, or obfuscate the proprietary client-side architectures, including our Wasm binaries for PDF/Image processing.",
                  "Frame or \"mirror\" our proprietary tools on external domains without explicit written consent.",
                  "Utilize our tools to establish commercial services that compete directly with Nexus Calculator.",
                  "Attempt to bypass our rate-limiting or security protocols through proxy rotations or automated API abuse."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-rose-500 dark:text-rose-400 font-bold shrink-0 mt-0.5">✖</span>
                    <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p>
              Any violation of these terms automatically terminates your license to use the platform, and we reserve the right to ban your IP address and pursue legal action for intellectual property infringement.
            </p>
          </section>

          <section id="user-conduct" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
              User Conduct and Responsibilities
            </h2>
            <p>
              When using tools that require you to input data, upload files, or process media (such as PDF mergers or Image Converters), you agree to assume full responsibility for the content you process. You agree not to:
            </p>
            <ul>
              <li>Process or upload files containing malware, trojans, ransomware, or malicious code designed to disrupt our infrastructure.</li>
              <li>Process materials that infringe upon the copyright, trademark, or intellectual property rights of third parties.</li>
              <li>Upload or manipulate illicit, defamatory, obscene, or legally prohibited documents or imagery.</li>
            </ul>
            <p>
              Although we employ client-side ephemeral processing (meaning your files often do not reach our servers), you remain legally liable for the nature of the data you choose to manipulate using our software suite.
            </p>
          </section>

          <section id="tool-specific-terms" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">6</span>
              Tool-Specific Terms and Limitations
            </h2>
            <p>
              Due to the diverse nature of our digital utility platform, specific categories of tools carry unique operational terms:
            </p>

            <h3 className="flex items-center gap-2 mt-8 text-xl font-bold text-slate-800 dark:text-slate-200"><Code className="text-blue-500" size={20}/> Developer Tools & Code Formatting</h3>
            <p>
              Tools such as the JSON formatter, CSS Minifier, and Base64 encoder operate strictly within your local browser. While we strive for zero-bug logic, edge cases in complex code structures may result in formatting errors or data truncation. You must verify formatted outputs before integrating them into live codebases. We bear no liability for application crashes or data corruption stemming from the use of our developer utilities.
            </p>

            <h3 className="flex items-center gap-2 mt-8 text-xl font-bold text-slate-800 dark:text-slate-200"><FileCode className="text-red-500" size={20}/> PDF Utilities & Document Integrity</h3>
            <p>
              When utilizing our PDF compression, merging, and conversion tools, you acknowledge that manipulating complex PDF architectures (including encrypted PDFs, specific font subsets, and complex vector graphics) may occasionally alter document formatting. Nexus is not responsible for any loss of document fidelity, metadata stripping, or formatting degradation that occurs during the conversion process.
            </p>

            <h3 className="flex items-center gap-2 mt-8 text-xl font-bold text-slate-800 dark:text-slate-200"><ImageIcon className="text-purple-500" size={20}/> Image Processing & Copyright</h3>
            <p>
              Our image converters, compressors, and AI background removers do not grant you ownership over resulting images if you did not possess the copyright to the original input. The output of our AI and algorithmic image tools is provided &quot;as is.&quot; We do not guarantee pixel-perfect accuracy, particularly in complex AI background removal scenarios.
            </p>
          </section>

          <section id="accuracy" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">7</span>
              Accuracy, Metrics, and Standards
            </h2>
            <p>
              While we pride ourselves on utilizing high-performance algorithms, the materials appearing on the Nexus Platform may include technical, typographical, or scientific deviations. Nexus does not warrant that any of the materials on its website are perpetually accurate, complete, or reflective of the absolute latest scientific or technological literature.
            </p>
            <p>
              We occasionally update algorithms to reflect changes in international consensus (e.g., global banking standards for amortization, updated web standards for CSS minification, new image codec support). However, we are under no explicit obligation to update the materials uniformly or instantaneously.
            </p>
          </section>

          <section id="third-party" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">8</span>
              Third-Party Services and Advertising
            </h2>
            <p>
              To maintain our enterprise-tier infrastructure completely free of charge, Nexus utilizes managed ad networks (such as Google AdSense) and links to third-party web sites. We have not reviewed all of the sites linked to our platform and are not responsible for the contents of any such linked site. 
            </p>
            <p>
              The inclusion of any link or advertisement does not imply endorsement by Nexus. Use of any such linked website is entirely at the user&apos;s own risk. Furthermore, your interactions with advertisers found on or through our service are solely between you and such advertiser. We shall not be responsible or liable for any loss or damage incurred as the result of any such dealings.
            </p>
          </section>

          <section id="liability" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">9</span>
              Limitation of Liability and Warranties (As-Is Basis)
            </h2>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 not-prose mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-sm tracking-widest text-rose-500">Service Provision Warranty</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed uppercase">
                The materials and tools on Nexus are provided on an &apos;as is&apos; and &apos;as available&apos; basis. Nexus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>
            <p>
              In no event, under no legal theory (whether in tort, contract, strict liability, or otherwise) shall Nexus, its engineers, partners, or its suppliers be liable for any damages arising from the use or inability to use the materials on this platform.
            </p>
            <p>
              This includes, without limitation, damages for loss of data, loss of anticipated profits, business interruption, hardware failure, compromised codebases, corrupted PDF documents, or adverse health events resulting from reliance on our outputs. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you in their entirety.
            </p>
          </section>

          <section id="indemnification" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">10</span>
              Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Nexus, its parent companies, affiliates, engineers, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms of Use or your use of the Platform, including, but not limited to, any use of the Platform&apos;s content, services, and products other than as expressly authorized in these Terms.
            </p>
          </section>

          <section id="international" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">11</span>
              International Compliance & Jurisdiction
            </h2>
            <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-800 text-white p-6 rounded-2xl not-prose mb-6">
              <div className="flex items-start gap-4">
                <GlobeLock className="text-[#6fa844] shrink-0" size={28} />
                <p className="text-slate-300 text-sm leading-relaxed">
                  Nexus operates infrastructure globally. However, if you are accessing these tools from regions with specific localized regulations regarding financial projections, health data (e.g., GDPR, HIPAA, UK DPA), or algorithmic transparency, it is your responsibility to ensure your usage complies with your local sovereign laws.
                </p>
              </div>
            </div>
            <p>
              Any claim relating to the Nexus Platform shall be governed by international law and standard arbitration procedures without regard to its conflict of law provisions. 
            </p>
          </section>

          <section id="modifications" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">12</span>
              Modifications & Termination
            </h2>
            <p>
              Nexus reserves the absolute right to revise these terms of service, append new restrictions, or alter the computational logic of any tool without prior notice. By continuing to use this website subsequent to any changes, you implicitly agree to be bound by the then-current revised version of these Terms of Use.
            </p>
            <p>
              We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section id="contact" className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Questions About Our Legal Terms?</h2>
            <p className="mb-6">
              If you require clarification on any of the stipulations above or have a formal legal inquiry, our compliance and legal team is available.
            </p>
            <a href="mailto:support@nexuscalculator.net" className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors no-underline">
              <Mail className="w-5 h-5 text-[#518231]" />
              support[at]nexuscalculator.net
            </a>
          </section>

        </article>
      </div>
    </main>
  );
}
