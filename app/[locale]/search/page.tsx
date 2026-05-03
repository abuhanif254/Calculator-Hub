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
    description: 'Find the right calculator for your needs.',
  };
}

export default async function SearchPage({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const { q = '' } = await searchParams;

  const query = q.trim().toLowerCase();
  
  let results: typeof calculators = [];
  if (query) {
    results = calculators.filter(calc => 
      calc.title.toLowerCase().includes(query) || 
      calc.description.toLowerCase().includes(query) ||
      (calc.meta.keywords || '').toLowerCase().includes(query)
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
                {results.map(calc => (
                  <div key={calc.slug} className="border border-slate-200 rounded-2xl p-4 hover:border-blue-200 transition-colors hover:shadow-sm">
                    <FavoriteCalculatorLink 
                      title={calc.title} 
                      href={`/calculators/${calc.slug}`} 
                    />
                    <p className="text-sm text-slate-600 mt-2 px-2 line-clamp-2">
                      {calc.description}
                    </p>
                  </div>
                ))}
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
