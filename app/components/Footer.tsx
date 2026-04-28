import React from 'react';
import { Link } from '../../i18n/routing';
import { Calculator } from 'lucide-react';
import { sitemapCategories } from '../../lib/data/sitemapData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Create simplified URLs mapping for the footer links to point correctly where possible
  // Many links might fallback to /sitemap until individual pages are created
  const getHref = (link: string) => {
    let defaultSlug = link.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Slug overrides
    if (defaultSlug === "credit-cards-payoff-calculator") {
      defaultSlug = "credit-cards-payoff";
    }
    
    const knownSupportedSlugs = [
      "mortgage-calculator", "canadian-mortgage-calculator", "loan-calculator", "amortization-calculator", 
      "compound-interest-calculator", "finance-calculator", "graphing-calculator", "income-tax-calculator", 
      "interest-rate-calculator", "inflation-calculator", "investment-calculator", "salary-calculator", 
      "sales-tax-calculator", "scientific-calculator", "fraction-calculator", "percentage-calculator", 
      "random-number-generator", "triangle-calculator", "scientific-notation-calculator", "p-value-calculator", 
      "standard-deviation-calculator", "statistics-calculator", "date-calculator", "time-calculator", 
      "hours-calculator", "gpa-calculator", "grade-calculator", "concrete-calculator", "subnet-calculator", 
      "password-generator", "conversion-calculator", "currency-calculator", "rent-calculator", 
      "social-security-calculator", "credit-cards-payoff", "calorie-calculator", "body-fat-calculator", 
      "bmr-calculator", "ideal-weight-calculator", "pace-calculator", "ovulation-calculator", 
      "pregnancy-calculator", "pregnancy-conception-calculator", "due-date-calculator", 
      "retirement-calculator", "auto-loan-calculator", "interest-calculator", "payment-calculator", 
      "bmi-calculator", "age-calculator"
    ];

    if (knownSupportedSlugs.includes(defaultSlug)) {
        return `/calculators/${defaultSlug}`;
    }
    return "/sitemap";
  }

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 lg:py-20 border-t border-slate-800 dark:bg-slate-950 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="bg-[#518231] p-1.5 rounded-lg text-white shadow-sm">
                <Calculator size={24} strokeWidth={2.5} className="animate-[spin_20s_linear_infinite]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white inline-flex items-center">
                Calculator<span className="text-[#518231]">Central</span>
              </span>
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              Hundreds of highly accurate, high-performance calculators for financial, health, math, and everyday needs. Built for global standards and reliability.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mohammadbitullah@gmail.com" className="hover:text-white transition-colors duration-200">
                mohammadbitullah@gmail.com 
              </a>
              <p className="text-slate-500">
                2300 Kishoreganj Sadar, Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {sitemapCategories.slice(0, 3).map((category, index) => (
             <div key={category.id}>
               <h3 className="text-white font-bold mb-6 text-lg tracking-tight">{category.title}</h3>
               <ul className="space-y-4">
                 {category.links.slice(0, 7).map((link) => (
                   <li key={link}>
                     <Link href={getHref(link) as any} className="hover:text-[#518231] hover:translate-x-1 inline-block transition-all duration-200">
                       {link}
                     </Link>
                   </li>
                 ))}
                 <li>
                   <Link href="/sitemap" className="text-[#518231] hover:text-[#7bb052] font-semibold flex items-center gap-1 mt-2">
                     See all <span className="text-lg leading-none">&rarr;</span>
                   </Link>
                 </li>
               </ul>
             </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-sm font-medium">
            <Link href="/about-us" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
          <div className="text-sm text-slate-500 text-center md:text-right">
            &copy; {currentYear} CalculatorCentral. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
