import React from 'react';
import { notFound } from 'next/navigation';
import { getToolConfig, allToolsConfig } from '../../../../lib/data/tools';
import dynamic from 'next/dynamic';

const JsonFormatterTool = dynamic(() => import('../../../components/tools/JsonFormatterTool').then(m => m.JsonFormatterTool));
const DiffCheckerTool = dynamic(() => import('../../../components/tools/DiffCheckerTool').then(m => m.DiffCheckerTool));
const HtmlFormatterTool = dynamic(() => import('../../../components/tools/HtmlFormatterTool').then(m => m.HtmlFormatterTool));
const CssBeautifierTool = dynamic(() => import('../../../components/tools/CssBeautifierTool').then(m => m.CssBeautifierTool));
const JsBeautifierTool = dynamic(() => import('../../../components/tools/JsBeautifierTool').then(m => m.JsBeautifierTool));
const XmlFormatterTool = dynamic(() => import('../../../components/tools/XmlFormatterTool').then(m => m.XmlFormatterTool));
const MarkdownPreviewerTool = dynamic(() => import('../../../components/tools/MarkdownPreviewerTool').then(m => m.MarkdownPreviewerTool));
const SqlFormatterTool = dynamic(() => import('../../../components/tools/SqlFormatterTool').then(m => m.SqlFormatterTool));
const YamlFormatterTool = dynamic(() => import('../../../components/tools/YamlFormatterTool').then(m => m.YamlFormatterTool));
const CsvViewerTool = dynamic(() => import('../../../components/tools/CsvViewerTool').then(m => m.CsvViewerTool));
const Base64EncodeTool = dynamic(() => import('../../../components/tools/Base64EncodeTool').then(m => m.Base64EncodeTool));
const Base64DecodeTool = dynamic(() => import('../../../components/tools/Base64DecodeTool').then(m => m.Base64DecodeTool));
const UrlEncoderTool = dynamic(() => import('../../../components/tools/UrlEncoderTool').then(m => m.UrlEncoderTool));
const UrlDecoderTool = dynamic(() => import('../../../components/tools/UrlDecoderTool').then(m => m.UrlDecoderTool));
const JwtDecoderTool = dynamic(() => import('../../../components/tools/JwtDecoderTool').then(m => m.JwtDecoderTool));
const HashGeneratorTool = dynamic(() => import('../../../components/tools/HashGeneratorTool').then(m => m.HashGeneratorTool));
const Md5GeneratorTool = dynamic(() => import('../../../components/tools/Md5GeneratorTool').then(m => m.Md5GeneratorTool));
const Sha256GeneratorTool = dynamic(() => import('../../../components/tools/Sha256GeneratorTool').then(m => m.Sha256GeneratorTool));
const PasswordGeneratorTool = dynamic(() => import('../../../components/tools/PasswordGeneratorTool').then(m => m.PasswordGeneratorTool));
const HmacGeneratorTool = dynamic(() => import('../../../components/tools/HmacGeneratorTool').then(m => m.HmacGeneratorTool));
const QrCodeGeneratorTool = dynamic(() => import('../../../components/tools/QrCodeGeneratorTool').then(m => m.QrCodeGeneratorTool));
const MetaTagGeneratorTool = dynamic(() => import('../../../components/tools/meta-tag-generator').then(m => m.MetaTagGeneratorTool));
const OpenGraphGeneratorTool = dynamic(() => import('../../../components/tools/open-graph-generator').then(m => m.OpenGraphGeneratorTool));
const TwitterCardGeneratorTool = dynamic(() => import('../../../components/tools/twitter-card-generator').then(m => m.TwitterCardGeneratorTool));
const RobotsTxtGeneratorTool = dynamic(() => import('../../../components/tools/robots-txt-generator').then(m => m.RobotsTxtGeneratorTool));
const SitemapXmlGeneratorTool = dynamic(() => import('../../../components/tools/sitemap-xml-generator').then(m => m.SitemapXmlGeneratorTool));
const HtaccessGeneratorTool = dynamic(() => import('../../../components/tools/htaccess-generator').then(m => m.HtaccessGeneratorTool));
const ResponsiveScreenTesterTool = dynamic(() => import('../../../components/tools/responsive-screen-tester').then(m => m.ResponsiveScreenTesterTool));
const HttpHeaderCheckerTool = dynamic(() => import('../../../components/tools/http-header-checker').then(m => m.HttpHeaderCheckerTool));
const RedirectCheckerTool = dynamic(() => import('../../../components/tools/redirect-checker').then(m => m.RedirectCheckerTool));
const WebsiteScreenshotTool = dynamic(() => import('../../../components/tools/website-screenshot-tool').then(m => m.WebsiteScreenshotTool));
const DnsLookupTool = dynamic(() => import('../../../components/tools/dns-lookup').then(m => m.DnsLookupTool));
const IpLookupTool = dynamic(() => import('../../../components/tools/ip-lookup').then(m => m.IpLookupTool));
const UserAgentParserTool = dynamic(() => import('../../../components/tools/user-agent-parser').then(m => m.UserAgentParserTool));
const MimeTypeCheckerTool = dynamic(() => import('../../../components/tools/mime-type-checker').then(m => m.MimeTypeCheckerTool));
const ColorPickerTool = dynamic(() => import('../../../components/tools/color-picker').then(m => m.ColorPickerTool));
const HexToRgbTool = dynamic(() => import('../../../components/tools/hex-to-rgb').then(m => m.HexToRgbTool));
const UuidGeneratorTool = dynamic(() => import('../../../components/tools/UuidGeneratorTool').then(m => m.UuidGeneratorTool));
const SlugGeneratorTool = dynamic(() => import('../../../components/tools/SlugGeneratorTool').then(m => m.SlugGeneratorTool));
const LoremIpsumGeneratorTool = dynamic(() => import('../../../components/tools/LoremIpsumGeneratorTool').then(m => m.LoremIpsumGeneratorTool));
const FakeUserDataGeneratorTool = dynamic(() => import('../../../components/tools/FakeUserDataGeneratorTool').then(m => m.FakeUserDataGeneratorTool));
const RandomNumberGeneratorTool = dynamic(() => import('../../../components/tools/RandomNumberGeneratorTool').then(m => m.RandomNumberGeneratorTool));
const ApiMockDataGeneratorTool = dynamic(() => import('../../../components/tools/ApiMockDataGeneratorTool').then(m => m.ApiMockDataGeneratorTool));
import { Link, routing } from '../../../../i18n/routing';
import ReactMarkdown from 'react-markdown';
import { ToolVisitTracker } from '../../../components/ToolVisitTracker';
import { FavoriteButton } from '../../../components/FavoriteButton';
import { AdSenseContainer } from '../../../components/AdSenseContainer';
import { ChevronRight, ArrowRight, Lightbulb, Zap, HelpCircle, Code, Layers } from 'lucide-react';

const toolComponents: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatterTool,
  "diff-checker": DiffCheckerTool,
  "html-formatter": HtmlFormatterTool,
  "css-beautifier": CssBeautifierTool,
  "js-beautifier": JsBeautifierTool,
  "xml-formatter": XmlFormatterTool,
  "markdown-previewer": MarkdownPreviewerTool,
  "sql-formatter": SqlFormatterTool,
  "yaml-formatter": YamlFormatterTool,
  "csv-viewer": CsvViewerTool,
  "base64-encode": Base64EncodeTool,
  "base64-decode": Base64DecodeTool,
  "url-encoder": UrlEncoderTool,
  "url-decoder": UrlDecoderTool,
  "jwt-decoder": JwtDecoderTool,
  "hash-generator": HashGeneratorTool,
  "md5-generator": Md5GeneratorTool,
  "sha256-generator": Sha256GeneratorTool,
  "password-generator": PasswordGeneratorTool,
  "hmac-generator": HmacGeneratorTool,
  "qr-code-generator": QrCodeGeneratorTool,
  "meta-tag-generator": MetaTagGeneratorTool,
  "open-graph-generator": OpenGraphGeneratorTool,
  "twitter-card-generator": TwitterCardGeneratorTool,
  "robots-txt-generator": RobotsTxtGeneratorTool,
  "sitemap-xml-generator": SitemapXmlGeneratorTool,
  "htaccess-generator": HtaccessGeneratorTool,
  "responsive-screen-tester": ResponsiveScreenTesterTool,
  "http-header-checker": HttpHeaderCheckerTool,
  "redirect-checker": RedirectCheckerTool,
  "website-screenshot-tool": WebsiteScreenshotTool,
  "dns-lookup": DnsLookupTool,
  "ip-lookup": IpLookupTool,
  "user-agent-parser": UserAgentParserTool,
  "mime-type-checker": MimeTypeCheckerTool,
  "color-picker": ColorPickerTool,
  "hex-to-rgb": HexToRgbTool,
  "uuid-generator": UuidGeneratorTool,
  "slug-generator": SlugGeneratorTool,
  "lorem-ipsum-generator": LoremIpsumGeneratorTool,
  "fake-user-data-generator": FakeUserDataGeneratorTool,
  "random-number-generator": RandomNumberGeneratorTool,
  "api-mock-data-generator": ApiMockDataGeneratorTool
};


// Locale-specific path segments for /tools/[slug] as defined in i18n/routing.ts
const toolPathSegments: Record<string, string> = {
  en: 'tools',
  es: 'herramientas',
  fr: 'outils',
  de: 'werkzeuge',
};

// ISR: revalidate tool pages once per day (matches calculator page behaviour)
export const revalidate = 86400;

// SSG: pre-render every locale × tool slug combination at build time
// This produces static HTML served from CDN edge — much better LCP than SSR
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(allToolsConfig).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const config = getToolConfig(slug);
  if (!config) return {};

  const baseUrl = (process.env.APP_URL || 'https://nexuscalculator.net').replace(/\/$/, '');

  // Build absolute hreflang map for all supported locales
  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/tools/${slug}`,
  };
  routing.locales.forEach((l) => {
    const segment = toolPathSegments[l] || 'tools';
    languages[l] = `${baseUrl}/${l}/${segment}/${slug}`;
  });

  const localeSegment = toolPathSegments[locale] || 'tools';

  return {
    title: `${config.title} | Developer Tools | Nexus Calculator`,
    description: config.shortDescription,
    keywords: config.keywords.join(", "),
    openGraph: {
      title: config.title,
      description: config.shortDescription,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/${localeSegment}/${slug}`,
      languages,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const resolvedParams = await params;
  const config = getToolConfig(resolvedParams.slug);

  if (!config) {
    notFound();
  }

  const ToolComponent = toolComponents[config.slug];

  if (!ToolComponent) {
    return <div className="p-8 text-center">Tool component not found for this slug.</div>;
  }

  // Generate Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nexuscalculator.net" },
      { "@type": "ListItem", "position": 2, "name": "Developer Tools", "item": "https://nexuscalculator.net/sitemap" },
      { "@type": "ListItem", "position": 3, "name": config.title, "item": `https://nexuscalculator.net/tools/${config.slug}` }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faq.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": config.title,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": config.shortDescription,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // HowTo schema — unlocks step-by-step rich results in Google Search
  // Source: config.howToSteps already rendered as a numbered list on the page
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${config.title}`,
    "description": config.shortDescription,
    "url": `https://nexuscalculator.net/en/tools/${config.slug}`,
    "step": config.howToSteps.map((stepText, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `Step ${index + 1}`,
      "text": stepText
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#518231] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/sitemap" className="hover:text-[#518231] transition-colors">Developer Tools</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-200 font-medium">{config.title}</span>
        </nav>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* SEO Hero Section */}
        <section className="text-center py-8 max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {config.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
            {config.shortDescription}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <FavoriteButton
              slug={config.slug}
              title={config.title}
              type="developer-tool"
              href={`/tools/${config.slug}`}
            />
          </div>
        </section>

        <ToolVisitTracker
          slug={config.slug}
          title={config.title}
          type="developer-tool"
          href={`/tools/${config.slug}`}
        />

        {/* Main Tool Interface */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 sm:p-6 lg:p-8">
          <ToolComponent />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Explanation / SEO Article */}
            <section className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-[#518231] prose-a:text-[#518231]">
              <ReactMarkdown>{config.longDescription}</ReactMarkdown>
            </section>

            {/* How To Use */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lightbulb className="text-[#518231]" /> How to Use {config.title}
              </h2>
              <div className="grid gap-4">
                {config.howToSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Real Examples */}
            {config.examples.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code className="text-[#518231]" /> Real Examples
                </h2>
                <div className="space-y-8">
                  {config.examples.map((ex, idx) => (
                    <div key={idx} className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
                      <div className="px-6 py-4 bg-slate-800 border-b border-slate-700">
                        <h3 className="text-lg font-bold text-white">{ex.title}</h3>
                        <p className="text-sm text-slate-400">{ex.description}</p>
                      </div>
                      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <div className="p-4">
                          <div className="text-xs font-semibold text-slate-500 mb-2 uppercase">Input</div>
                          <pre className="text-sm text-slate-300 overflow-x-auto p-2 bg-slate-950 rounded-lg custom-scrollbar"><code>{ex.input}</code></pre>
                        </div>
                        <div className="p-4">
                          <div className="text-xs font-semibold text-[#518231] mb-2 uppercase">Output</div>
                          <pre className="text-sm text-green-400 overflow-x-auto p-2 bg-slate-950 rounded-lg custom-scrollbar"><code>{ex.output}</code></pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="text-[#518231]" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {config.faq.map((faq, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 dark:text-white list-none [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <ChevronRight className="transform group-open:rotate-90 transition-transform text-slate-400" />
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Features */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="text-amber-500" /> Key Features
              </h3>
              <ul className="space-y-3">
                {config.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#518231] shrink-0 mt-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers className="text-blue-500" /> Common Use Cases
              </h3>
              <ul className="space-y-3">
                {config.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Tools */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Related Tools</h3>
              <div className="space-y-2">
                {config.relatedTools.map((tool, idx) => (
                  <Link key={idx} href={`/tools/${tool.slug}` as any} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 group">
                    <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#518231] transition-colors">{tool.name}</span>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-[#518231] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad Placement Sidebar */}
            <div className="sticky top-24 pt-4">
              <AdSenseContainer slot="tools_sidebar" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
