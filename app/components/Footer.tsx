import React from 'react';
import { Link, resolveIntlHref } from '../../i18n/routing';
import { Calculator } from 'lucide-react';
import { sitemapCategories } from '../../lib/data/sitemapData';
import { resolveHref } from '../../lib/utils/linkResolver';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 dark:bg-[#090E17] dark:text-slate-300 py-16 lg:py-20 border-t border-slate-200 dark:border-white/5 mt-auto relative overflow-hidden">
      
      {/* Ambient Glowing Floor - Massive faint radial gradient centered at the bottom */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#518231]/10 dark:bg-[#518231]/15 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="bg-[#518231] p-1.5 rounded-lg text-white shadow-sm group-hover:shadow-[#518231]/30 transition-shadow">
                <Calculator size={24} strokeWidth={2.5} className="animate-[spin_20s_linear_infinite]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white inline-flex items-center">
                Nexus<span className="text-[#518231]">Calculator</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm leading-relaxed">
              Hundreds of highly accurate, high-performance calculators for financial, health, math, and everyday needs. Built for global standards and reliability.
            </p>
            
            {/* Social Links — Glassmorphic */}
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://github.com/abuhanif254"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-[#518231] dark:hover:text-[#6fa844] hover:border-[#518231]/40 dark:hover:border-[#518231]/50 dark:hover:bg-[#518231]/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://twitter.com/nexuscalculator"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-[#518231] dark:hover:text-[#6fa844] hover:border-[#518231]/40 dark:hover:border-[#518231]/50 dark:hover:bg-[#518231]/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/nexus-calculator"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-[#518231] dark:hover:text-[#6fa844] hover:border-[#518231]/40 dark:hover:border-[#518231]/50 dark:hover:bg-[#518231]/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/@nexuscalculator"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-[#518231] dark:hover:text-[#6fa844] hover:border-[#518231]/40 dark:hover:border-[#518231]/50 dark:hover:bg-[#518231]/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
            
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:nexuscalculator@gmail.com" className="hover:text-[#518231] dark:hover:text-white transition-colors duration-200 inline-block py-1 font-medium">
                nexuscalculator@gmail.com 
              </a>
              <p className="text-slate-500">
                2300 Kishoreganj Sadar, Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {sitemapCategories.slice(0, 2).map((category, index) => (
             <div key={category.id}>
               <h3 className="text-slate-900 dark:text-white font-bold mb-6 text-lg tracking-tight">{category.title}</h3>
               <ul className="space-y-4">
                 {category.links.slice(0, 7).map((link) => (
                   <li key={link}>
                     <Link href={resolveIntlHref(resolveHref(link))} className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white hover:translate-x-1 inline-block py-1.5 transition-all duration-300 text-sm">
                       {link}
                     </Link>
                   </li>
                 ))}
                 <li>
                   <Link href="/sitemap" className="text-[#518231] hover:text-[#436a28] dark:hover:text-[#6fa844] font-semibold flex items-center gap-1 mt-2 py-2 text-sm transition-colors">
                     See all <span className="text-lg leading-none">&rarr;</span>
                   </Link>
                 </li>
               </ul>
             </div>
          ))}

          {/* Ecosystem Column */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-6 text-lg tracking-tight">Ecosystem</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/search" className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white hover:translate-x-1 inline-block py-1.5 transition-all duration-300">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white hover:translate-x-1 inline-block py-1.5 transition-all duration-300">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white hover:translate-x-1 inline-block py-1.5 transition-all duration-300">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white hover:translate-x-1 inline-block py-1.5 transition-all duration-300">
                  Guides
                </Link>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-600 inline-block py-1.5 cursor-not-allowed" title="Coming soon">
                  API (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm font-medium">
            <Link href="/about-us" className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white transition-colors p-2">About Us</Link>
            <Link href="/terms-of-use" className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white transition-colors p-2">Terms of Use</Link>
            <Link href="/privacy-policy" className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white transition-colors p-2">Privacy Policy</Link>
            <Link href="/sitemap" className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white transition-colors p-2">Sitemap</Link>
          </div>
          <div className="text-sm text-slate-500 text-center md:text-right">
            &copy; {currentYear} Nexus Calculator. All Rights Reserved. · Bangladesh
          </div>
        </div>
      </div>
    </footer>
  );
}
