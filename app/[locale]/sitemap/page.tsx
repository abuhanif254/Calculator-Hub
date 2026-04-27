import { Metadata } from 'next';
import { Link, routing } from '@/i18n/routing';
import { sitemapCategories, generalLinks } from '@/lib/data/sitemapData';
import { Search } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const languages: Record<string, string> = {
    'x-default': '/en/sitemap',
  };
  
  routing.locales.forEach((l) => {
    languages[l] = `/${l}/sitemap`;
  });

  return {
    title: 'Sitemap | CalcDash',
    description: 'Complete list of all calculators available on CalcDash including financial, fitness, math, and more.',
    alternates: {
      canonical: `/${locale}/sitemap`,
      languages,
    },
  };
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content Area */}
        <div className="flex-1 lg:max-w-[70%]">
          {/* Breadcrumbs */}
          <div className="text-sm text-slate-500 mb-4 font-sans">
            <Link href="/" className="hover:text-blue-600 hover:underline">home</Link>
            <span className="mx-1">/</span>
            <span className="text-slate-700">sitemap</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
            Sitemap
          </h1>

          <div className="space-y-12">
            {sitemapCategories.map((category) => (
              <section key={category.id}>
                <h2 className="text-[1.3rem] font-bold text-[#0066cc] mb-4 hover:underline cursor-pointer border-b border-slate-100 pb-2">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                  {category.links.map((link) => {
                    const slug = link.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    const href = link === "Mortgage Calculator" ? "/calculators/mortgage-calculator" : `/calculators/${slug}`;
                    return (
                      <Link 
                        key={link} 
                        href={href as any} 
                        className="text-[15px] text-[#0066cc] hover:text-[#ff9900] hover:underline block truncate py-0.5"
                        title={link}
                      >
                        {link}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}

            <section>
              <div className="pt-8 border-t border-slate-200 flex flex-col gap-1">
                {generalLinks.map((link) => {
                  let href: any = "/";
                  if (link === "Privacy Policy") href = "/privacy-policy";
                  if (link === "Terms of Use") href = "/terms-of-use";
                  if (link === "About Us") href = "/about-us";
                  return (
                    <Link 
                      key={link} 
                      href={href as any} 
                      className="text-[15px] text-[#0066cc] hover:text-[#ff9900] hover:underline"
                    >
                      {link}
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        {/* Right Sidebar for Ads & Search */}
        <aside className="w-full lg:w-[300px] flex-shrink-0 pt-12">
          <div className="sticky top-24 space-y-8">
            {/* Ad Placeholder container */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded p-4 flex flex-col items-center justify-center min-h-[250px] md:min-h-[600px] text-center shadow-sm">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2">Advertisement</span>
              <p className="text-slate-500 text-sm">Your ad content goes here.</p>
              <div className="mt-4 w-full h-full min-h-[200px] md:min-h-[500px] bg-slate-200 border border-dashed border-slate-300 flex items-center justify-center">
                 <span className="text-slate-400 text-xs text-balance">Space preserved for Google AdSense (e.g. 300x600 responsive ad)</span>
              </div>
            </div>

            {/* Custom Search Box */}
            <div className="bg-slate-50 p-4 border border-slate-200 rounded shadow-sm">
               <h3 className="text-slate-700 font-semibold mb-3 text-sm">Search CalcDash</h3>
               <form className="flex" action={`/${resolvedParams.locale}/search`} method="GET">
                 <input 
                    name="q"
                    type="text" 
                    placeholder="Search calculators..." 
                    className="flex-1 w-full border border-slate-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                 />
                 <button type="submit" className="bg-[#3b5998] hover:bg-[#2d4373] text-white px-3 py-2 rounded-r flex items-center justify-center transition-colors shadow-sm">
                    <Search size={18} />
                 </button>
               </form>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
