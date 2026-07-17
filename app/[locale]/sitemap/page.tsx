import { Metadata } from 'next';
import { Link, routing, resolveIntlHref } from '@/i18n/routing';
import { sitemapCategories, developerToolsMenu, pdfToolsMenu, imageToolsMenu, generalLinks } from '@/lib/data/sitemapData';
import { resolveHref } from '@/lib/utils/linkResolver';
import { Search, Compass, ExternalLink, ChevronDown, Shield } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';
  
  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/sitemap`,
  };
  
  routing.locales.forEach((l) => {
    languages[l] = `${baseUrl}/${l}/sitemap`;
  });

  return {
    title: 'All Tools & Calculators Directory | Nexus',
    description: 'The master directory of all free calculators and developer tools available on Nexus. Browse over 150+ tools for finance, math, fitness, web development, and more.',
    alternates: {
      canonical: `${baseUrl}/${locale}/sitemap`,
      languages,
    },
  };
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  setRequestLocale(locale);

  // Generate Schemas for SEO
  const allItems = [
    ...sitemapCategories.flatMap(cat => cat.links.map(link => ({ name: link, category: cat.title }))),
    ...developerToolsMenu.flatMap(cat => cat.items.map(item => ({ name: item.name, category: cat.title }))),
    ...pdfToolsMenu.flatMap(cat => cat.items.map(item => ({ name: item.name, category: cat.title }))),
    ...imageToolsMenu.flatMap(cat => cat.items.map(item => ({ name: item.name, category: cat.title })))
  ];

  const itemListSchema = {
    "@type": "ItemList",
    "name": "Nexus Tools and Calculators Directory",
    "description": "A comprehensive collection of calculators and developer utilities.",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "description": `Free ${item.name} in the ${item.category} category.`
    }))
  };

  const baseUrl = 'https://nexuscalculator.net';
  
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "All Tools Directory",
        "item": `${baseUrl}/${locale}/sitemap`
      }
    ]
  };

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are these calculators and developer tools really free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all of our tools and calculators are 100% free to use with no paywalls, hidden fees, or usage limits."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data or code saved when I use these tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Everything runs locally inside your browser. We do not track, save, or store your inputs on our servers, ensuring ultimate privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Can I request a new calculator or tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can join our Developer Community to request new features, report bugs, or discuss tools with other professionals."
        }
      }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [itemListSchema, breadcrumbSchema, faqSchema]
  };

  return (
    <main className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      <Script id="sitemap-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Search Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-16 pb-12 px-4">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-[#518231] dark:text-[#78b34f] text-sm font-semibold mb-6">
            <Compass size={16} />
            <span>Master Directory</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            All Tools & Calculators
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Browse our complete collection of {allItems.length}+ free, high-performance calculators and developer utilities.
          </p>

          <form action={`/${locale}/search`} method="GET" className="max-w-[600px] mx-auto relative shadow-xl shadow-slate-200/50 dark:shadow-none rounded-xl mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input 
              name="q"
              type="text" 
              placeholder="Search for any tool..." 
              className="block w-full pl-12 pr-4 py-4 md:py-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] transition-colors text-lg"
            />
            <button type="submit" className="absolute inset-y-2 right-2 bg-[#518231] hover:bg-[#436a28] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Search
            </button>
          </form>

          {/* SILO Context SEO Text */}
          <div className="max-w-3xl mx-auto text-left bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Ultimate Professional Developer Ecosystem</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Welcome to the Nexus master directory. We believe in providing a seamless, highly optimized experience for professionals. Whether you are formatting JSON, calculating an amortization schedule, or testing API mock data, all of our tools utilize <strong>client-side processing</strong> to deliver <strong>instant results</strong>. Because everything runs securely inside your own browser, our platform is deeply <strong>privacy-focused</strong>—your code, financial data, and personal inputs are never saved or sent to external servers.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Quick Jump Nav */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-4 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex gap-2 overflow-x-auto custom-scrollbar pb-1">
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center mr-2">Jump to:</span>
          {sitemapCategories.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">
              {cat.title}
            </a>
          ))}
          {developerToolsMenu.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">
              {cat.title}
            </a>
          ))}
          {pdfToolsMenu.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">
              {cat.title}
            </a>
          ))}
          {imageToolsMenu.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">
              {cat.title}
            </a>
          ))}
          <a href="#data-privacy" className="shrink-0 px-3 py-1.5 rounded-full bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/30 dark:hover:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-sm font-bold transition-colors">
            🔒 Data Privacy
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          
          {/* Calculators Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Calculators</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sitemapCategories.map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      {category.icon && <category.icon size={22} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {category.links.map((link) => {
                      return (
                        <li key={link}>
                          <Link 
                            href={resolveIntlHref(resolveHref(link))}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                          >
                            <span className="truncate">{link}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* Developer Tools Section */}
          <div className="space-y-12 pt-8">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Developer Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {developerToolsMenu.map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      {category.icon && <category.icon size={22} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {category.items.map((item) => {
                      return (
                        <li key={item.name}>
                          <Link 
                            href={resolveIntlHref(resolveHref(item.name))}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                            title={item.desc}
                          >
                            <span className="truncate">{item.name}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* PDF Tools Section */}
          <div className="space-y-12 pt-8">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">PDF Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pdfToolsMenu.map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      {category.icon && <category.icon size={22} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {category.items.map((item) => {
                      return (
                        <li key={item.name}>
                          <Link 
                            href={resolveIntlHref(resolveHref(item.name))}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                            title={item.desc}
                          >
                            <span className="truncate">{item.name}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* Image Tools Section */}
          <div className="space-y-12 pt-8">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Image Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {imageToolsMenu.map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      {category.icon && <category.icon size={22} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {category.items.map((item) => {
                      return (
                        <li key={item.name}>
                          <Link 
                            href={resolveIntlHref(resolveHref(item.name))}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                            title={item.desc}
                          >
                            <span className="truncate">{item.name}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* Data Privacy Platform Section */}
          <div className="space-y-8 pt-8" id="data-privacy">
            <div className="flex items-center gap-4 border-b-2 border-violet-200 dark:border-violet-900 pb-4">
              <div className="p-2.5 bg-violet-600 rounded-xl">
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Data Privacy Platform</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Enterprise-grade database anonymization · GDPR · HIPAA · PCI-DSS · Free forever</p>
              </div>
              <Link href={`/${locale}/database-privacy` as any} className="ml-auto shrink-0 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                <ExternalLink size={14} /> Open Platform
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { id: 'dp-scanner', title: 'PII Scanner', desc: 'Auto-detect 30+ PII types across all databases', items: [
                  { name: 'Sensitive Data Scanner', href: `/${locale}/database-privacy/scanner` },
                  { name: 'Scanner Findings', href: `/${locale}/database-privacy/scanner/findings` },
                ]},
                { id: 'dp-masking', title: 'Data Masking', desc: 'Apply masking rules and anonymize sensitive columns', items: [
                  { name: 'Masking Rules Builder', href: `/${locale}/database-privacy/masking/rules` },
                  { name: 'Template Library', href: `/${locale}/database-privacy/masking/templates` },
                  { name: 'Rule Marketplace', href: `/${locale}/database-privacy/masking/marketplace` },
                  { name: 'Preview Before Execute', href: `/${locale}/database-privacy/masking/preview` },
                ]},
                { id: 'dp-connections', title: 'Connections & Explorer', desc: 'Manage database connections and browse schemas', items: [
                  { name: 'Database Connections', href: `/${locale}/database-privacy/connections` },
                  { name: 'Database Explorer', href: `/${locale}/database-privacy/explorer` },
                  { name: 'Projects', href: `/${locale}/database-privacy/projects` },
                  { name: 'Organizations', href: `/${locale}/database-privacy/organizations` },
                ]},
                { id: 'dp-jobs', title: 'Jobs & Scheduling', desc: 'Automate anonymization with scheduled jobs', items: [
                  { name: 'Job Management', href: `/${locale}/database-privacy/jobs` },
                  { name: 'Job History', href: `/${locale}/database-privacy/jobs/history` },
                  { name: 'Job Scheduler', href: `/${locale}/database-privacy/jobs/scheduler` },
                ]},
                { id: 'dp-compliance', title: 'Compliance & Audit', desc: 'GDPR, HIPAA, PCI-DSS readiness and audit trails', items: [
                  { name: 'Compliance Center', href: `/${locale}/database-privacy/compliance` },
                  { name: 'Reports & Analytics', href: `/${locale}/database-privacy/reports` },
                  { name: 'Audit Logs', href: `/${locale}/database-privacy/audit` },
                ]},
                { id: 'dp-io', title: 'Import & Export', desc: 'Upload datasets and export anonymized data', items: [
                  { name: 'Import Dataset', href: `/${locale}/database-privacy/import` },
                  { name: 'Export Data', href: `/${locale}/database-privacy/export` },
                ]},
                { id: 'dp-security', title: 'Security & Access', desc: 'API keys, secrets, webhooks, and team access', items: [
                  { name: 'API Keys', href: `/${locale}/database-privacy/api-keys` },
                  { name: 'Secrets Manager', href: `/${locale}/database-privacy/secrets` },
                  { name: 'Webhooks', href: `/${locale}/database-privacy/webhooks` },
                  { name: 'User Management', href: `/${locale}/database-privacy/users` },
                  { name: 'Roles & Permissions', href: `/${locale}/database-privacy/users/roles` },
                ]},
                { id: 'dp-monitoring', title: 'Monitoring', desc: 'Real-time performance and worker node monitoring', items: [
                  { name: 'Performance Monitor', href: `/${locale}/database-privacy/monitoring` },
                  { name: 'Worker Nodes', href: `/${locale}/database-privacy/monitoring/workers` },
                  { name: 'Queue Manager', href: `/${locale}/database-privacy/monitoring/queue` },
                  { name: 'Settings', href: `/${locale}/database-privacy/settings` },
                ]},
              ].map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-violet-100 dark:border-violet-900/30 shadow-sm hover:shadow-md hover:border-violet-400/40 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                      <Shield size={18} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{category.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{category.desc}</p>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href as any} className="group flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 py-0.5 transition-colors">
                          <span>{item.name}</span>
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* Native FAQ Section */}
          <section className="pt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, index) => (
                <details key={index} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span>{faq.name}</span>
                    <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-6 pb-4 pt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.acceptedAnswer.text}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Footer General Links */}
          <section className="pt-16 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">General Resources</h3>
            <div className="flex flex-wrap gap-4">
              {generalLinks.map((link) => {
                let href: any = "/";
                if (link === "Privacy Policy") href = "/privacy-policy";
                if (link === "Terms of Use") href = "/terms-of-use";
                if (link === "About Us") href = "/about-us";
                return (
                  <Link 
                    key={link} 
                    href={href} 
                    className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-[#6fa844] hover:border-[#518231] dark:hover:border-[#518231] transition-all"
                  >
                    {link}
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
