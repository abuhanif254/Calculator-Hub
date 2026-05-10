import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { searchTools, allTools } from '@/lib/registry';
import { Link } from '@/i18n/routing';
import { Search } from 'lucide-react';

// ═══════════════════════════════════════════════════════
// SEARCH PAGE — now powered by the unified tool registry
// instead of a hardcoded list. Adding a new calculator or
// dev tool automatically makes it searchable here.
// ═══════════════════════════════════════════════════════

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
  
  // Use the unified registry for searching
  const results = query ? searchTools(query, 50) : [];

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-950 min-h-[60vh]">
      <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Search Tools & Calculators
        </h1>
        <form action={`/${resolvedParams.locale}/search`} method="GET" className="relative max-w-xl group">
          <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search calculators and developer tools..."
            className="w-full ps-12 pe-4 py-4 text-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-slate-900 dark:text-white"
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
              <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                Found {results.length} result{results.length === 1 ? '' : 's'} for &quot;{query}&quot;
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href as any}
                    className="block border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors hover:shadow-sm bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {tool.title}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        tool.type === 'developer-tool'
                          ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                          : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      }`}>
                        {tool.type === 'developer-tool' ? 'Tool' : 'Calc'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Search className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-slate-800 dark:text-white mb-2">No results found</h2>
              <p className="text-slate-500 dark:text-slate-400">We couldn&apos;t find any tools matching &quot;{query}&quot;.</p>
            </div>
          )
        ) : (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400">
            Enter a search term above to find calculators and developer tools.
          </div>
        )}
      </div>
    </main>
  );
}
