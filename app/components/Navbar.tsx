"use client";

import React, { useState } from "react";
import { Link } from "../../i18n/routing";
import { Menu, X, Calculator, Search, ChevronDown } from "lucide-react";
import { sitemapCategories } from "../../lib/data/sitemapData";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Exclude 'Calculators for Your Site' from main top-nav for a cleaner look
  const navCategories = sitemapCategories.filter(cat => cat.id !== "site-calculators");

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 dark:bg-slate-900 dark:border-slate-800">
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-[#518231] p-1.5 rounded-lg text-white group-hover:bg-[#436a28] transition-colors shadow-sm">
                <Calculator size={20} strokeWidth={2.5} className="animate-[spin_15s_linear_infinite]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Calculator<span className="text-[#518231]">Central</span>
              </span>
            </Link>
          </div>

          {/* Center/Right: Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navCategories.map((category) => (
              <div key={category.id} className="relative group px-3 py-2">
                <button className="flex items-center gap-1 text-sm font-semibold text-slate-800 hover:text-[#518231] transition-colors dark:text-slate-200 dark:hover:text-[#518231]">
                  {category.title.replace(" Calculators", "")}
                  <ChevronDown size={14} className="text-slate-400 group-hover:text-[#518231] transition-transform group-hover:rotate-180" />
                </button>
                
                {/* Desktop Dropdown */}
                <div className="absolute top-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50 w-64">
                  <div className="bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden py-2 dark:bg-slate-900 dark:border-slate-700">
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 mb-2 dark:bg-slate-800/50 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">{category.title}</span>
                    </div>
                    <ul className="max-h-[300px] overflow-y-auto custom-scrollbar">
                      {category.links.slice(0, 10).map((link) => {
                         // Build dynamic links for the top ones we made, fallback to sitemap
                         let href = "/sitemap";
                         if (link === "Mortgage Calculator") href = "/calculators/mortgage-calculator";
                         if (link === "Canadian Mortgage Calculator") href = "/calculators/canadian-mortgage-calculator";
                         if (link === "Loan Calculator") href = "/calculators/loan-calculator";
                         if (link === "Amortization Calculator") href = "/calculators/amortization-calculator";
                         if (link === "Compound Interest Calculator") href = "/calculators/compound-interest-calculator";
                         if (link === "Finance Calculator") href = "/calculators/finance-calculator";
                         if (link === "Graphing Calculator") href = "/calculators/graphing-calculator";
                         if (link === "Income Tax Calculator") href = "/calculators/income-tax-calculator";
                         if (link === "Interest Rate Calculator") href = "/calculators/interest-rate-calculator";
                         if (link === "Inflation Calculator") href = "/calculators/inflation-calculator";
                         if (link === "Investment Calculator") href = "/calculators/investment-calculator";
                         if (link === "Salary Calculator") href = "/calculators/salary-calculator";
                         if (link === "Sales Tax Calculator") href = "/calculators/sales-tax-calculator";
                         if (link === "Scientific Calculator") href = "/calculators/scientific-calculator";
                         if (link === "Fraction Calculator") href = "/calculators/fraction-calculator";
                         if (link === "Percentage Calculator") href = "/calculators/percentage-calculator";
                         if (link === "Random Number Generator") href = "/calculators/random-number-generator";
                         if (link === "Triangle Calculator") href = "/calculators/triangle-calculator";
                         if (link === "Scientific Notation Calculator") href = "/calculators/scientific-notation-calculator";
                         if (link === "P-Value Calculator") href = "/calculators/p-value-calculator";
                         if (link === "Standard Deviation Calculator") href = "/calculators/standard-deviation-calculator";
                         if (link === "Statistics Calculator") href = "/calculators/statistics-calculator";
                         if (link === "Date Calculator") href = "/calculators/date-calculator";
                         if (link === "Time Calculator") href = "/calculators/time-calculator";
                         if (link === "Hours Calculator") href = "/calculators/hours-calculator";
                         if (link === "GPA Calculator") href = "/calculators/gpa-calculator";
                         if (link === "Grade Calculator") href = "/calculators/grade-calculator";
                         if (link === "Concrete Calculator") href = "/calculators/concrete-calculator";
                         if (link === "Subnet Calculator") href = "/calculators/subnet-calculator";
                         if (link === "Password Generator") href = "/calculators/password-generator";
                         if (link === "Conversion Calculator") href = "/calculators/conversion-calculator";
                         if (link === "Currency Calculator") href = "/calculators/currency-calculator";
                         if (link === "Rent Calculator") href = "/calculators/rent-calculator";
                         if (link === "Social Security Calculator") href = "/calculators/social-security-calculator";
                         if (link === "Credit Cards Payoff") href = "/calculators/credit-cards-payoff";
                         if (link === "Calorie Calculator") href = "/calculators/calorie-calculator";
                         if (link === "Body Fat Calculator") href = "/calculators/body-fat-calculator";
                         if (link === "BMR Calculator") href = "/calculators/bmr-calculator";
                         if (link === "Ideal Weight Calculator") href = "/calculators/ideal-weight-calculator";
                         if (link === "Pace Calculator") href = "/calculators/pace-calculator";
                         if (link === "Ovulation Calculator") href = "/calculators/ovulation-calculator";
                         if (link === "Pregnancy Calculator") href = "/calculators/pregnancy-calculator";
                         if (link === "Pregnancy Conception Calculator") href = "/calculators/pregnancy-conception-calculator";
                         if (link === "Due Date Calculator") href = "/calculators/due-date-calculator";
                         if (link === "Retirement Calculator") href = "/calculators/retirement-calculator";
                         if (link === "Auto Loan Calculator") href = "/calculators/auto-loan-calculator";
                         if (link === "Interest Calculator") href = "/calculators/interest-calculator";
                         if (link === "Payment Calculator") href = "/calculators/payment-calculator";
                         if (link === "BMI Calculator") href = "/calculators/bmi-calculator";
                         if (link === "Age Calculator") href = "/calculators/age-calculator";
                         
                         return (
                           <li key={link}>
                             <Link 
                               href={href as any} 
                               className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#0066cc] transition-colors dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-[#4299e1]"
                             >
                               {link}
                             </Link>
                           </li>
                         );
                      })}
                      <li>
                        <Link href="/sitemap" className="block px-4 py-2 text-sm font-semibold text-[#518231] hover:bg-green-50 transition-colors mt-1 dark:hover:bg-slate-800">
                          View all in {category.title.replace(" Calculators", "")} <span className="inline-block rtl:rotate-180">&rarr;</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className="ms-4 ps-4 border-s border-slate-200 dark:border-slate-700">
              <Link href="/search" className="text-slate-400 hover:text-[#518231] transition-colors dark:text-slate-500 dark:hover:text-[#518231]">
                <span className="sr-only">Search calculators</span>
                <Search size={20} />
              </Link>
            </div>
          </div>

          {/* Right: Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <Link href="/search" className="p-2 me-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
               <Search size={20} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#518231] dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen border-b border-slate-200 dark:border-slate-800" : "max-h-0"} overflow-hidden bg-white dark:bg-slate-900`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navCategories.map((category) => (
             <div key={category.id} className="py-2">
               <div className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 px-3 dark:text-slate-200">
                 {category.title}
               </div>
               <div className="grid grid-cols-1 gap-1">
                  {category.links.slice(0, 5).map(link => {
                     let href = "/sitemap";
                     if (link === "Mortgage Calculator") href = "/calculators/mortgage-calculator";
                     if (link === "Canadian Mortgage Calculator") href = "/calculators/canadian-mortgage-calculator";
                     if (link === "Loan Calculator") href = "/calculators/loan-calculator";
                     if (link === "Amortization Calculator") href = "/calculators/amortization-calculator";
                     if (link === "Compound Interest Calculator") href = "/calculators/compound-interest-calculator";
                     if (link === "Finance Calculator") href = "/calculators/finance-calculator";
                     if (link === "Graphing Calculator") href = "/calculators/graphing-calculator";
                     if (link === "Income Tax Calculator") href = "/calculators/income-tax-calculator";
                     if (link === "Interest Rate Calculator") href = "/calculators/interest-rate-calculator";
                     if (link === "Inflation Calculator") href = "/calculators/inflation-calculator";
                     if (link === "Investment Calculator") href = "/calculators/investment-calculator";
                     if (link === "Salary Calculator") href = "/calculators/salary-calculator";
                     if (link === "Sales Tax Calculator") href = "/calculators/sales-tax-calculator";
                     if (link === "Scientific Calculator") href = "/calculators/scientific-calculator";
                     if (link === "Fraction Calculator") href = "/calculators/fraction-calculator";
                     if (link === "Percentage Calculator") href = "/calculators/percentage-calculator";
                     if (link === "Random Number Generator") href = "/calculators/random-number-generator";
                     if (link === "Triangle Calculator") href = "/calculators/triangle-calculator";
                     if (link === "Scientific Notation Calculator") href = "/calculators/scientific-notation-calculator";
                     if (link === "P-Value Calculator") href = "/calculators/p-value-calculator";
                     if (link === "Standard Deviation Calculator") href = "/calculators/standard-deviation-calculator";
                     if (link === "Statistics Calculator") href = "/calculators/statistics-calculator";
                     if (link === "Date Calculator") href = "/calculators/date-calculator";
                     if (link === "Time Calculator") href = "/calculators/time-calculator";
                     if (link === "Hours Calculator") href = "/calculators/hours-calculator";
                     if (link === "GPA Calculator") href = "/calculators/gpa-calculator";
                     if (link === "Grade Calculator") href = "/calculators/grade-calculator";
                     if (link === "Concrete Calculator") href = "/calculators/concrete-calculator";
                     if (link === "Subnet Calculator") href = "/calculators/subnet-calculator";
                     if (link === "Password Generator") href = "/calculators/password-generator";
                     if (link === "Conversion Calculator") href = "/calculators/conversion-calculator";
                     if (link === "Currency Calculator") href = "/calculators/currency-calculator";
                     if (link === "Rent Calculator") href = "/calculators/rent-calculator";
                     if (link === "Social Security Calculator") href = "/calculators/social-security-calculator";
                     if (link === "Credit Cards Payoff") href = "/calculators/credit-cards-payoff";
                     if (link === "Calorie Calculator") href = "/calculators/calorie-calculator";
                     if (link === "Body Fat Calculator") href = "/calculators/body-fat-calculator";
                     if (link === "BMR Calculator") href = "/calculators/bmr-calculator";
                     if (link === "Ideal Weight Calculator") href = "/calculators/ideal-weight-calculator";
                     if (link === "Pace Calculator") href = "/calculators/pace-calculator";
                     if (link === "Ovulation Calculator") href = "/calculators/ovulation-calculator";
                     if (link === "Pregnancy Calculator") href = "/calculators/pregnancy-calculator";
                     if (link === "Pregnancy Conception Calculator") href = "/calculators/pregnancy-conception-calculator";
                     if (link === "Due Date Calculator") href = "/calculators/due-date-calculator";
                     if (link === "Retirement Calculator") href = "/calculators/retirement-calculator";
                     if (link === "Auto Loan Calculator") href = "/calculators/auto-loan-calculator";
                     if (link === "Interest Calculator") href = "/calculators/interest-calculator";
                     if (link === "Payment Calculator") href = "/calculators/payment-calculator";
                     if (link === "BMI Calculator") href = "/calculators/bmi-calculator";
                     if (link === "Age Calculator") href = "/calculators/age-calculator";
                     
                     return (
                        <Link 
                          key={link} 
                          href={href as any}
                          className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0066cc] rounded-md dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-[#4299e1]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link}
                        </Link>
                     );
                  })}
                  <Link 
                    href="/sitemap"
                    className="block px-3 py-2 text-sm font-bold text-[#518231] hover:bg-green-50 rounded-md dark:hover:bg-slate-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View All {category.title}
                  </Link>
               </div>
             </div>
          ))}
        </div>
      </div>
    </header>
  );
}
