"use client";
import React, { useState } from 'react';
import { Search, Compass, Calculator, Frown } from 'lucide-react';
import Link from 'next/link';

const popularCalculators = [
  { title: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
  { title: "Loan Calculator", href: "/calculators/loan-calculator" },
  { title: "Student Loan Calculator", href: "/calculators/student-loan-calculator" },
  { title: "Business Loan Calculator", href: "/calculators/business-loan-calculator" },
  { title: "Personal Loan Calculator", href: "/calculators/personal-loan-calculator" },
  { title: "Budget Calculator", href: "/calculators/budget-calculator" },
  { title: "APR Calculator", href: "/calculators/apr-calculator" },
  { title: "HELOC Calculator", href: "/calculators/heloc-calculator" },
  { title: "Present Value Calculator", href: "/calculators/present-value-calculator" },
  { title: "Percent Off Calculator", href: "/calculators/percent-off-calculator" },
  { title: "401(k) Calculator", href: "/calculators/401k-calculator" },
  { title: "Marriage Tax Calculator", href: "/calculators/marriage-tax-calculator" },
  { title: "Annuity Calculator", href: "/calculators/annuity-calculator" },
  { title: "Debt Payoff Calculator", href: "/calculators/debt-payoff-calculator" },
  { title: "College Cost Calculator", href: "/calculators/college-cost-calculator" },
  { title: "Mutual Fund Calculator", href: "/calculators/mutual-fund-calculator" },
  { title: "VAT Calculator", href: "/calculators/vat-calculator" },
  { title: "Bond Calculator", href: "/calculators/bond-calculator" },
  { title: "RMD Calculator", href: "/calculators/rmd-calculator" },
  { title: "Depreciation Calculator", href: "/calculators/depreciation-calculator" },
  { title: "Finance Calculator", href: "/calculators/finance-calculator" },
  { title: "BMI Calculator", href: "/calculators/bmi-calculator" },
  { title: "Calorie Calculator", href: "/calculators/calorie-calculator" },
  { title: "Age Calculator", href: "/calculators/age-calculator" },
  { title: "Scientific Calculator", href: "/calculators/scientific-calculator" },
  { title: "Percentage Calculator", href: "/calculators/percentage-calculator" },
];

export function NotFoundView() {
  const [query, setQuery] = useState("");

  const filteredCalculators = query
    ? popularCalculators.filter(calc => calc.title.toLowerCase().includes(query.toLowerCase()))
    : popularCalculators;

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6 text-slate-500 dark:text-slate-400">
         <Compass size={64} strokeWidth={1.5} />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        Page Not Found
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-10">
        It looks like the calculator or page you were trying to reach doesn&apos;t exist. 
        Perhaps you can find what you&apos;re looking for by searching below.
      </p>

      {/* Search Bar */}
      <div className="w-full max-w-xl mb-12">
        <form 
          action="/search" 
          method="GET" 
          onSubmit={(e) => {
            if(!query.trim()) e.preventDefault();
          }}
          className="relative flex items-center w-full"
        >
          <Search className="absolute left-4 text-slate-400" size={20} />
          <input 
            type="text" 
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a calculator (e.g. Mortgage, BMI)..." 
            className="w-full pl-12 pr-32 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] shadow-sm transition-all"
          />
          <button 
            type="submit" 
            className="absolute right-2 px-6 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Popular Calculators */}
      <div className="w-full max-w-4xl text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Calculator className="text-[#518231]" size={24} />
          {query ? "Search Results" : "Our Most Popular Calculators"}
        </h2>
        
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCalculators.map((calc, i) => (
              <Link 
                key={i} 
                href={calc.href as any}
                className="group flex flex-col p-4 border border-slate-100 dark:border-slate-800 hover:border-[#518231] hover:bg-green-50 dark:hover:bg-[#518231]/10 rounded-xl transition-all"
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#518231]">
                  {calc.title}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 flex flex-col items-center">
            <Frown size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
            <p>No immediate suggestions found for &quot;{query}&quot;.</p>
            <p className="text-sm mt-2">Try pressing Search to look through our complete directory.</p>
          </div>
        )}
      </div>

      <div className="mt-12">
        <Link href="/" className="text-[#518231] font-semibold hover:underline flex items-center gap-2">
          &larr; Return to Homepage
        </Link>
      </div>
    </div>
  );
}
