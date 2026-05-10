import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { calculators } from '@/lib/data/calculators';
import { FavoriteCalculatorLink } from '@/app/components/FavoriteCalculatorLink';
import { Search } from 'lucide-react';

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { q } = await searchParams;
  
  return {
    title: q ? `Search results for "${q}" | Nexus Calculator` : 'Search | Nexus Calculator',
    description: 'Find the right calculator or developer tool for your needs.',
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const { q = '' } = await searchParams;

  const query = q.trim().toLowerCase();
  
  const developerTools = [
    { title: "JSON Formatter", description: "Format and indent JSON data", slug: "tools/json-formatter", meta: { keywords: "json formatter validator beautifier" } },
    { title: "JSON Validator", description: "Validate your JSON strings", slug: "tools/json-validator", meta: { keywords: "json validator check format" } },
    { title: "HTML Formatter", description: "Format HTML code", slug: "tools/html-formatter", meta: { keywords: "html formatter beautifier" } },
    { title: "CSS Beautifier", description: "Beautify CSS styles", slug: "tools/css-beautifier", meta: { keywords: "css beautifier formatter" } },
    { title: "JavaScript Beautifier", description: "Format JS code", slug: "tools/javascript-beautifier", meta: { keywords: "javascript beautifier js formatter" } },
    { title: "XML Formatter", description: "Format XML documents", slug: "tools/xml-formatter", meta: { keywords: "xml formatter beautifier" } },
    { title: "Markdown Previewer", description: "Preview Markdown instantly", slug: "tools/markdown-previewer", meta: { keywords: "markdown previewer md editor" } },
    { title: "SQL Formatter", description: "Format SQL queries", slug: "tools/sql-formatter", meta: { keywords: "sql formatter beautifier query" } },
    { title: "YAML Formatter", description: "Format YAML files", slug: "tools/yaml-formatter", meta: { keywords: "yaml formatter beautifier" } },
    { title: "CSV Viewer", description: "View CSV data as table", slug: "tools/csv-viewer", meta: { keywords: "csv viewer table excel" } },
    { title: "Diff Checker", description: "Compare text differences", slug: "tools/diff-checker", meta: { keywords: "diff checker compare text code" } },
    { title: "Base64 Encode", description: "Encode text to Base64", slug: "tools/base64-encode", meta: { keywords: "base64 encode encoder" } },
    { title: "Base64 Decode", description: "Decode Base64 to text", slug: "tools/base64-decode", meta: { keywords: "base64 decode decoder" } },
    { title: "URL Encoder", description: "Encode URL characters", slug: "tools/url-encoder", meta: { keywords: "url encoder encode percent" } },
    { title: "URL Decoder", description: "Decode URL characters", slug: "tools/url-decoder", meta: { keywords: "url decoder decode" } },
    { title: "JWT Decoder", description: "Decode JWT tokens", slug: "tools/jwt-decoder", meta: { keywords: "jwt decoder token verify" } },
    { title: "Hash Generator", description: "Generate text hashes", slug: "tools/hash-generator", meta: { keywords: "hash generator md5 sha1 sha256" } },
    { title: "MD5 Generator", description: "Generate MD5 hashes", slug: "tools/md5-generator", meta: { keywords: "md5 generator hash" } },
    { title: "SHA256 Generator", description: "Generate SHA256 hashes", slug: "tools/sha256-generator", meta: { keywords: "sha256 generator hash" } },
    { title: "Password Generator", description: "Generate secure passwords", slug: "tools/password-generator", meta: { keywords: "password generator secure random" } },
    { title: "HMAC Generator", description: "Generate HMAC codes", slug: "tools/hmac-generator", meta: { keywords: "hmac generator hash" } },
    { title: "QR Code Generator", description: "Create QR codes", slug: "tools/qr-code-generator", meta: { keywords: "qr code generator create" } },
    { title: "UUID Generator", description: "Generate UUIDs v4", slug: "tools/uuid-generator", meta: { keywords: "uuid generator guid" } },
    { title: "Slug Generator", description: "Create URL-friendly slugs", slug: "tools/slug-generator", meta: { keywords: "slug generator url string" } },
    { title: "Lorem Ipsum Generator", description: "Generate placeholder text", slug: "tools/lorem-ipsum-generator", meta: { keywords: "lorem ipsum generator text placeholder" } },
    { title: "Random Number Generator", description: "Generate random numbers", slug: "tools/random-number-generator", meta: { keywords: "random number generator rng" } },
    { title: "HEX to RGB", description: "Convert HEX to RGB", slug: "tools/hex-to-rgb", meta: { keywords: "hex to rgb convert color" } },
    { title: "RGB to HEX", description: "Convert RGB to HEX", slug: "tools/rgb-to-hex", meta: { keywords: "rgb to hex convert color" } },
    { title: "Color Picker", description: "Pick colors from palette", slug: "tools/color-picker", meta: { keywords: "color picker palette css" } },
    { title: "Gradient Generator", description: "Create CSS gradients", slug: "tools/gradient-generator", meta: { keywords: "gradient generator css linear radial" } },
    { title: "Meta Tag Generator", description: "Generate HTML meta tags", slug: "tools/meta-tag-generator", meta: { keywords: "meta tag generator seo html" } },
    { title: "Open Graph Generator", description: "Generate OG tags", slug: "tools/open-graph-generator", meta: { keywords: "open graph generator og tags facebook" } },
    { title: "CSS Minifier", description: "Minify CSS code", slug: "tools/css-minifier", meta: { keywords: "css minifier compress" } },
    { title: "JS Minifier", description: "Minify JavaScript code", slug: "tools/js-minifier", meta: { keywords: "js minifier javascript compress" } },
    { title: "HTML Minifier", description: "Minify HTML code", slug: "tools/html-minifier", meta: { keywords: "html minifier compress" } }
  ];

  const allTools = [...calculators, ...developerTools as any];

  let results: typeof allTools = [];
  if (query) {
    results = allTools.filter(calc => 
      calc.title.toLowerCase().includes(query) || 
      calc.description.toLowerCase().includes(query) ||
      (calc.meta?.keywords || '').toLowerCase().includes(query)
    );
  }

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-[60vh]">
      <div className="mb-8 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Search Calculators
        </h1>
        <form action={`/${resolvedParams.locale}/search`} method="GET" className="relative max-w-xl group">
          <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search calculators..."
            className="w-full ps-12 pe-4 py-4 text-lg bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            required
            autoFocus
          />
          <button type="submit" className="absolute inset-y-2 end-2 bg-[#0066cc] hover:bg-blue-700 text-white px-6 font-medium rounded-lg transition-colors">
            Search
          </button>
        </form>
      </div>

      <div>
        {query ? (
          results.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-slate-700">Found {results.length} result{results.length === 1 ? '' : 's'} for &quot;{query}&quot;</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(calc => {
                  const href = calc.slug.startsWith('tools/') ? `/${calc.slug}` : `/calculators/${calc.slug}`;
                  return (
                  <div key={calc.slug} className="border border-slate-200 rounded-2xl p-4 hover:border-blue-200 transition-colors hover:shadow-sm">
                    <FavoriteCalculatorLink 
                      title={calc.title} 
                      href={href as any} 
                    />
                    <p className="text-sm text-slate-600 mt-2 px-2 line-clamp-2">
                      {calc.description}
                    </p>
                  </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-slate-800 mb-2">No results found</h2>
              <p className="text-slate-500">We couldn&apos;t find any calculators matching &quot;{query}&quot;.</p>
            </div>
          )
        ) : (
          <div className="text-center py-16 text-slate-500">
            Enter a search term above to find calculators.
          </div>
        )}
      </div>
    </main>
  );
}
