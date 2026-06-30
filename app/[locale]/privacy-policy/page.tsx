import { Metadata } from 'next';
import { Link as CustomLink, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { ShieldCheck, Eye, GlobeLock, Cookie, Database, Mail, RefreshCcw, FileText, Code, FileCode, ImageIcon, Calculator } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  return {
    title: 'Privacy Policy & Data Security | Nexus Tools Platform',
    description: 'Comprehensive Privacy Policy for Nexus Tools. Learn how we prioritize data minimalization, utilize client-side WebAssembly for PDF and image tools, and comply with GDPR, CCPA, and global privacy standards.',
    keywords: ['privacy policy', 'data security', 'gdpr compliance', 'ccpa compliance', 'nexus tools privacy', 'secure pdf tools', 'secure developer utilities', 'client-side image processing privacy'],
    alternates: getCanonicalAndAlternates('/privacy-policy', locale),
    openGraph: {
      type: 'website',
      title: 'Privacy Policy | Nexus Tools Platform',
      description: 'Understanding how we protect your data footprint across our international computational and developer tools platform.',
      siteName: 'Nexus Calculator & Tools',
    },
    twitter: {
      card: 'summary',
      title: 'Privacy Policy | Nexus Tools',
      description: 'Review our commitment to your privacy and international data protection standards.',
    }
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
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
            "name": "Privacy Policy - Nexus Tools Platform",
            "description": "Read the Nexus Tools Privacy Policy. Learn about our strict data handling procedures and global compliance standards.",
            "url": "https://nexuscalculator.net/privacy-policy",
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
          <li aria-current="page" className="text-slate-700 dark:text-slate-300 font-medium">Privacy Policy</li>
        </ol>
      </nav>

      <header className="mb-14 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-700 dark:text-slate-300">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Privacy Policy & Data Security</h1>
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          We believe privacy is a fundamental human right. As a comprehensive ecosystem of developer utilities, PDF processors, image editors, and high-precision calculators, we employ strict data minimization protocols. This document outlines our transparent approach to data processing, tracking technologies, client-side operations, and international regulatory compliance.
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
              <li><a href="#introduction" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">1. Introduction & Scope</a></li>
              <li><a href="#data-minimization" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">2. The Principle of Data Minimization</a></li>
              <li><a href="#tool-specific-processing" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">3. Tool-Specific Data Handling</a></li>
              <li><a href="#information-collection" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">4. Information Collection & Log Data</a></li>
              <li><a href="#cookies-tracking" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">5. Cookies & Tracking Technologies</a></li>
              <li><a href="#advertising" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">6. Third-Party Advertisers & Analytics</a></li>
              <li><a href="#international-compliance" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">7. International Privacy Laws (GDPR/CCPA)</a></li>
              <li><a href="#data-security" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">8. Infrastructure & Transmission Security</a></li>
              <li><a href="#childrens-privacy" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">9. Children&apos;s Privacy</a></li>
              <li><a href="#policy-updates" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">10. Changes to This Privacy Policy</a></li>
              <li><a href="#contact" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors block">11. Contact Our Privacy Office</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <article className="lg:col-span-8 prose prose-slate dark:prose-invert prose-lg max-w-none">
          
          <section id="introduction" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              Introduction & Scope
            </h2>
            <p>
              Welcome to the Nexus ecosystem (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate a diverse suite of digital tools, encompassing robust developer utilities, advanced image editors, comprehensive PDF modifiers, and highly accurate calculators. We are fiercely committed to protecting your privacy and ensuring a secure, frictionless experience on our platform.
            </p>
            <p>
              This Privacy Policy applies to our website, all subdomains, and any associated services, applications, or APIs operated by Nexus. By accessing or using our developer tools, PDF tools, image manipulation utilities, or calculators, you acknowledge that you have read and understood this Privacy Policy. Our commitment to privacy is not just a legal obligation; it is a core engineering principle that dictates how we build our software architecture.
            </p>
          </section>

          <section id="data-minimization" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              The Principle of Data Minimization
            </h2>
            <div className="bg-[#518231]/5 border-l-4 border-[#518231] p-5 rounded-r-xl my-6 not-prose">
              <div className="flex gap-3">
                <Database className="text-[#518231] shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Ephemeral Processing & Edge Computing</h3>
                  <p className="text-slate-800 dark:text-slate-300 text-sm leading-relaxed">
                    Our platform is fundamentally designed to function without requiring user authentication, forced account creation, or persistent storage of personal identities. We adhere strictly to the principle of <strong>data minimization</strong>. We process your inputs locally within your browser context or ephemerally via secure edge servers. Once a task is completed, your input data is wiped. No calculation data, source code, PDF files, or proprietary images are persistently mapped to your identity or stored in our databases.
                  </p>
                </div>
              </div>
            </div>
            <p>
              Unlike traditional SaaS platforms that aggregate massive datasets to train AI models or profile users, Nexus is built as a stateless utility suite. When you format a JSON string, merge a PDF, compress a PNG, or calculate an amortization schedule, the logic executes, returns the output to your screen, and immediately discards the variables from memory.
            </p>
          </section>

          <section id="tool-specific-processing" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
              Tool-Specific Data Handling
            </h2>
            <p>
              Due to the varied nature of our platform, our privacy approach is tailored to the specific category of tools you interact with. Here is a granular breakdown of how we secure your data across our different ecosystems:
            </p>
            
            <h3 className="flex items-center gap-2 mt-8 text-xl font-bold text-slate-800 dark:text-slate-200"><Code className="text-blue-500" size={20}/> Developer Utilities</h3>
            <p>
              When utilizing our suite of developer tools—which includes JSON formatters, CSS minifiers, Base64 encoders/decoders, SQL formatters, and cryptographic hash generators—your code is <strong>never</strong> transmitted to our servers. We leverage client-side JavaScript execution, meaning the parsing, formatting, and minification processes occur entirely within the DOM (Document Object Model) of your browser. You can safely paste proprietary code, API keys, or sensitive configuration files into our formatting tools knowing that the data never traverses the internet.
            </p>

            <h3 className="flex items-center gap-2 mt-8 text-xl font-bold text-slate-800 dark:text-slate-200"><FileCode className="text-red-500" size={20}/> Professional PDF Tools</h3>
            <p>
              Our PDF modification utilities—such as PDF compression, merging, splitting, extraction, and format conversions (PDF to Word, PDF to Image)—are heavily optimized for privacy. To the maximum extent possible, we utilize WebAssembly (Wasm) libraries to manipulate PDF byte streams natively in your browser. In rare edge cases where a PDF is too complex or requires proprietary backend conversion (such as heavy OCR tasks), the file is transmitted securely over HTTPS, processed in isolated, stateless server containers, and deleted immediately upon successful conversion. We do not retain copies, backups, or logs of your personal, legal, or corporate PDF documents.
            </p>

            <h3 className="flex items-center gap-2 mt-8 text-xl font-bold text-slate-800 dark:text-slate-200"><ImageIcon className="text-purple-500" size={20}/> Image & Media Processing</h3>
            <p>
              Whether you are converting a JPG to a WebP, removing a background using AI, compressing bulk images, or generating CSS shadows, your visual assets remain yours. Client-side Canvas APIs and local browser memory handle the majority of image manipulation. For advanced AI-driven tasks (like intelligent background removal), images are securely processed ephemerally. We do not claim ownership of any media you process, nor do we use your uploaded images to train our or third-party AI generation models.
            </p>

            <h3 className="flex items-center gap-2 mt-8 text-xl font-bold text-slate-800 dark:text-slate-200"><Calculator className="text-green-500" size={20}/> High-Precision Calculators</h3>
            <p>
              Information entered into our financial, health, fitness, or scientific calculators (e.g., salary details, loan balances, height/weight metrics, or investment portfolios) is processed strictly to yield your immediate mathematical result. We do not aggregate this data to build financial profiles, nor do we sell your inputs to credit bureaus, insurance agencies, or data brokers.
            </p>
          </section>

          <section id="information-collection" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
              Information Collection & Log Data
            </h2>
            <p>While we do not collect personal identities or user inputs, maintaining a high-performance, globally distributed platform necessitates the collection of specific operational telemetry.</p>
            <ul>
              <li><strong>Technical Metadata & Log Files:</strong> As with standard web architecture, our edge servers and Content Delivery Networks (CDNs) automatically log generalized diagnostic data. This includes your browser type (User-Agent strings), operating system architecture, referring URLs, timestamps, and truncated/anonymized IP addresses.</li>
              <li><strong>Purpose of Collection:</strong> This operational telemetry is utilized exclusively for critical infrastructure monitoring, debugging layout shifts, preventing Distributed Denial of Service (DDoS) attacks, identifying malicious scraping bots, and optimizing network routing algorithms. These logs are routinely purged and never cross-referenced with individual user identities.</li>
            </ul>
          </section>

          <section id="cookies-tracking" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
              Cookies & Tracking Technologies
            </h2>
            <div className="flex items-start gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 not-prose mb-6">
              <Cookie className="text-orange-500 shrink-0" size={28} />
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed m-0">
                Our web application leverages cookies, Web Storage (localStorage/sessionStorage), and similar tracking technologies to preserve your application state and deliver relevant advertisements.
              </p>
            </div>
            <ul>
              <li><strong>Essential Session Mechanics:</strong> These are strictly necessary cookies required for the fundamental operation of the website. They manage stateful features such as Next.js internationalized routing (remembering your language preference), UI theme toggles (dark mode vs. light mode), and layout preferences. Disabling these may cause unexpected interface behaviors.</li>
              <li><strong>Preference & Functionality:</strong> Used to remember your customized inputs on certain calculators or tools across sessions if you explicitly choose to utilize &quot;save state&quot; features.</li>
              <li><strong>Consent Management:</strong> Depending on your jurisdiction (e.g., EU or California), you are presented with a consent management banner upon entry, granting you complete sovereignty over non-essential cookie injection. We honor standard browser Do-Not-Track (DNT) and Global Privacy Control (GPC) headers.</li>
            </ul>
          </section>

          <section id="advertising" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">6</span>
              Third-Party Advertisers & Analytics
            </h2>
            <p>
              To maintain our enterprise-tier infrastructure completely free of charge for users worldwide, Nexus utilizes managed advertising networks, primarily <strong>Google AdSense</strong>. We also deploy privacy-conscious analytical software to comprehend global traffic flows and improve user experience.
            </p>
            <p>
              Third-party vendors, including Google, use advertising cookies to serve ads based on a user&apos;s prior visits to this website or other websites across the internet. Google&apos;s use of advertising cookies (such as the DoubleClick DART cookie) enables it and its partners to serve ads to our users based on their browsing history. We do not manually share any of your calculation inputs or uploaded files with these advertising partners.
            </p>
            <p className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl text-sm mt-4">
              <strong>Advertising Opt-Out Protocol:</strong> Users possess the universal right to opt out of personalized advertisement mapping. You can achieve this by navigating to the <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#518231] dark:text-[#6fa844] font-semibold hover:underline">Google Ads Settings</a> interface. Comprehensive details regarding Google&apos;s data handling exist within the <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[#518231] dark:text-[#6fa844] font-semibold hover:underline">Google Partner Policy documentation</a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#518231] dark:text-[#6fa844] font-semibold hover:underline">www.aboutads.info</a>.
            </p>
          </section>

          <section id="international-compliance" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">7</span>
              International Privacy Laws (GDPR, CCPA, CPRA)
            </h2>
            
            <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-800 text-white p-6 rounded-2xl not-prose mb-6">
              <div className="flex items-start gap-4">
                <GlobeLock className="text-[#6fa844] shrink-0" size={28} />
                <p className="text-slate-300 text-sm leading-relaxed">
                  As a globally accessible suite of developer and mathematical utilities, Nexus strictly adheres to leading international data protection regulations. We prioritize your sovereign data rights regardless of your geographic location.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6">European Users (GDPR & UK GDPR)</h3>
            <p>
              If you are a resident of the European Economic Area (EEA) or the United Kingdom, you are protected by the General Data Protection Regulation (GDPR). Under GDPR, you have the right to:
            </p>
            <ul>
              <li><strong>Right of Access & Portability:</strong> Request copies of your personal data.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate information.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of any personal data.</li>
              <li><strong>Right to Restrict Processing:</strong> Request limits on how we process your data.</li>
            </ul>
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
              Note: Because Nexus does not mandate user accounts, simply clearing your browser&apos;s local storage and cache effectively purges all local telemetry, achieving immediate erasure. We have no centralized database of user profiles to delete.
            </p>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6">California Residents (CCPA & CPRA)</h3>
            <p>
              The California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA) grant California residents specific rights regarding their personal information. These include the right to know what personal data is being collected, the right to request deletion, and the right to opt-out of the &quot;sale&quot; or &quot;sharing&quot; of personal data.
            </p>
            <p>
              Nexus does not sell personal data for monetary compensation. However, under the broad definitions of the CCPA/CPRA, our deployment of third-party advertising cookies may constitute &quot;sharing&quot; data. California residents can exercise their &quot;Do Not Sell or Share My Personal Information&quot; rights by adjusting their cookie preferences via our consent manager or using standard Global Privacy Control (GPC) signals in their browser.
            </p>
          </section>

          <section id="data-security" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">8</span>
              Infrastructure & Transmission Security
            </h2>
            <p>
              Securing your inputs is our highest engineering priority. We implement sophisticated edge-level routing and forced TLS 1.3 cryptographic tunnels (HTTPS) for all network connections. This ensures that any data traversing the internet between your browser and our edge nodes is comprehensively encrypted against packet sniffing and man-in-the-middle attacks.
            </p>
            <p>
              While we deploy enterprise-grade Web Application Firewalls (WAF) and employ continuous security auditing, it is an axiom of computer science that no transmission vector over the public internet exhibits absolute zero-trust perfection. By utilizing client-side WebAssembly and DOM-level processing for sensitive tools (like JSON formatters or PDF editors), we drastically reduce the attack surface and practically eliminate the risk of server-side data breaches.
            </p>
          </section>

          <section id="childrens-privacy" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">9</span>
              Children&apos;s Privacy
            </h2>
            <p>
              Our mathematical, graphical, and coding tools are frequently utilized in academic environments by students of all ages. However, our advertising frameworks and technical telemetry are absolutely not designed to knowingly harvest Personally Identifiable Information (PII) from individuals under the age of 13 (or the applicable age of digital consent in your jurisdiction).
            </p>
            <p>
              We do not intentionally target or collect data from children. Should a parent or guardian discover anomalous data collection originating from a minor, they are instructed to engage our Data Protection Officer (DPO) immediately, and we will swiftly purge any offending telemetry logs.
            </p>
          </section>

          <section id="policy-updates" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="bg-[#518231]/10 text-[#518231] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">10</span>
              Changes to This Privacy Policy
            </h2>
            <p>
              As the Nexus platform scales and introduces new developer tools, image editors, and AI-assisted utilities, our data practices may evolve. We reserve the right to update or modify this Privacy Policy at any time. Significant architectural changes affecting how data is processed will be reflected in an updated &quot;Last Modified&quot; date at the top of this document. We encourage users to periodically review this page to ensure continued alignment with our privacy standards.
            </p>
          </section>

          <section id="contact" className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">11. Contact Our Privacy Office</h2>
            <p className="mb-6">
              For elevated inquiries demanding the attention of our Data Protection Officer (DPO), questions regarding our client-side processing architecture, or to initiate a formal GDPR/CCPA rights request, please utilize the encrypted communication channel below.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="mailto:support@nexuscalculator.net" className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors no-underline">
                <Mail size={18} />
                E-Mail Legal Team
              </a>
              <CustomLink href="/about-us" className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#518231] hover:text-[#518231] dark:hover:border-[#6fa844] dark:hover:text-[#6fa844] text-slate-700 dark:text-slate-300 font-semibold py-3 px-6 rounded-xl transition-colors no-underline">
                <Eye size={18} />
                About Our Architecture
              </CustomLink>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}

