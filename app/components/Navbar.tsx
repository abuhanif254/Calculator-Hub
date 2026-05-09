"use client";

import React, { useState } from "react";
import { Link } from "../../i18n/routing";
import { Menu, X, Calculator, Search, ChevronDown, FileText, Shield, Zap, Palette, Wrench, Users, TrendingUp, Code } from "lucide-react";
import { sitemapCategories } from "../../lib/data/sitemapData";
import { AuthButton } from "./AuthButton";

const developerToolsMenu = [
  {
    title: "Text & Formatting",
    icon: FileText,
    items: [
      { name: "JSON Formatter", desc: "Format and indent JSON data" },
      { name: "JSON Validator", desc: "Validate your JSON strings" },
      { name: "HTML Formatter", desc: "Format HTML code" },
      { name: "CSS Beautifier", desc: "Beautify CSS styles" },
      { name: "JavaScript Beautifier", desc: "Format JS code" },
      { name: "XML Formatter", desc: "Format XML documents" },
      { name: "Markdown Previewer", desc: "Preview Markdown instantly" },
      { name: "SQL Formatter", desc: "Format SQL queries" },
      { name: "YAML Formatter", desc: "Format YAML files" },
      { name: "CSV Viewer", desc: "View CSV data as table" },
      { name: "Diff Checker", desc: "Compare text differences" },
    ]
  },
  {
    title: "Encoding & Security",
    icon: Shield,
    items: [
      { name: "Base64 Encode", desc: "Encode text to Base64" },
      { name: "Base64 Decode", desc: "Decode Base64 to text" },
      { name: "URL Encoder", desc: "Encode URL characters" },
      { name: "URL Decoder", desc: "Decode URL characters" },
      { name: "JWT Decoder", desc: "Decode JWT tokens" },
      { name: "Hash Generator", desc: "Generate text hashes" },
      { name: "MD5 Generator", desc: "Generate MD5 hashes" },
      { name: "SHA256 Generator", desc: "Generate SHA256 hashes" },
      { name: "Password Generator", desc: "Generate secure passwords" },
      { name: "HMAC Generator", desc: "Generate HMAC codes" },
      { name: "QR Code Generator", desc: "Create QR codes" },
    ]
  },
  {
    title: "Generators",
    icon: Zap,
    items: [
      { name: "UUID Generator", desc: "Generate UUIDs v4" },
      { name: "Slug Generator", desc: "Create URL-friendly slugs" },
      { name: "Lorem Ipsum Generator", desc: "Generate placeholder text" },
      { name: "Fake User Data Generator", desc: "Generate mock user data" },
      { name: "Random Number Generator", desc: "Generate random numbers" },
      { name: "Random String Generator", desc: "Generate random strings" },
      { name: "Username Generator", desc: "Generate random usernames" },
      { name: "API Mock Data Generator", desc: "Create mock API responses" },
      { name: "Strong Password Generator", desc: "Create strong passwords" },
      { name: "HTML Table Generator", desc: "Generate HTML tables" },
    ]
  },
  {
    title: "Color Tools",
    icon: Palette,
    items: [
      { name: "HEX to RGB", desc: "Convert HEX to RGB" },
      { name: "RGB to HEX", desc: "Convert RGB to HEX" },
      { name: "Color Picker", desc: "Pick colors from palette" },
      { name: "Gradient Generator", desc: "Create CSS gradients" },
      { name: "Tailwind Color Palette", desc: "Explore Tailwind colors" },
      { name: "CSS Shadow Generator", desc: "Generate box shadows" },
      { name: "Glassmorphism Generator", desc: "Create glass UI effects" },
      { name: "Neumorphism Generator", desc: "Create neomorphic styles" },
      { name: "Contrast Checker", desc: "Check color contrast ratio" },
      { name: "Color Palette Generator", desc: "Generate color schemes" },
    ]
  },
  {
    title: "Web Dev Utilities",
    icon: Wrench,
    items: [
      { name: "Meta Tag Generator", desc: "Generate HTML meta tags" },
      { name: "Open Graph Generator", desc: "Generate OG tags" },
      { name: "Twitter Card Generator", desc: "Generate Twitter cards" },
      { name: "robots.txt Generator", desc: "Create robots.txt files" },
      { name: "sitemap.xml Generator", desc: "Generate XML sitemaps" },
      { name: ".htaccess Generator", desc: "Generate Apache .htaccess" },
      { name: "CSS Minifier", desc: "Minify CSS code" },
      { name: "JS Minifier", desc: "Minify JavaScript code" },
      { name: "HTML Minifier", desc: "Minify HTML code" },
      { name: "Responsive Screen Tester", desc: "Test responsive designs" },
      { name: "HTTP Header Checker", desc: "Check HTTP response headers" },
      { name: "Redirect Checker", desc: "Check URL redirects" },
      { name: "Website Screenshot Tool", desc: "Capture website screenshots" },
      { name: "DNS Lookup", desc: "Perform DNS lookups" },
      { name: "IP Lookup", desc: "Find IP address details" },
      { name: "User Agent Parser", desc: "Parse User Agent strings" },
      { name: "MIME Type Checker", desc: "Check MIME types" },
    ]
  },
  {
    title: "Developer Community",
    icon: Users,
    items: [
      { name: "Latest Discussions", desc: "View latest topics" },
      { name: "Ask a Question", desc: "Get help from others" },
      { name: "Share Code Snippets", desc: "Share your code" },
      { name: "Tool Requests", desc: "Request new tools" },
      { name: "Bug Reports", desc: "Report issues" },
      { name: "React Discussions", desc: "Talk about React" },
      { name: "Next.js Discussions", desc: "Talk about Next.js" },
      { name: "Firebase Discussions", desc: "Talk about Firebase" },
      { name: "SEO Discussions", desc: "Talk about SEO" },
      { name: "API Discussions", desc: "Talk about APIs" },
    ]
  },
  {
    title: "Trending Tools",
    icon: TrendingUp,
    items: [
      { name: "Most Used Today", desc: "Popular tools today" },
      { name: "Recently Added", desc: "Newest tools" },
      { name: "Popular Among Developers", desc: "Developer favorites" },
      { name: "Editor’s Picks", desc: "Curated tools" },
    ]
  }
];

const devToolsColumns = [
  [developerToolsMenu[0], developerToolsMenu[6]], // Text & Formatting, Trending Tools
  [developerToolsMenu[1], developerToolsMenu[3]], // Encoding & Security, Color Tools
  [developerToolsMenu[4]], // Web Dev Utilities
  [developerToolsMenu[2], developerToolsMenu[5]]  // Generators, Developer Community
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);

  const handleLinkClick = () => {
    setMenuClicked(true);
  };

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
                Nexus<span className="text-[#518231]">Calculator</span>
              </span>
            </Link>
          </div>

          {/* Center/Right: Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Developer Tools Mega Menu */}
            <div className="group px-3 py-2" onMouseLeave={() => setMenuClicked(false)}>
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-800 hover:text-[#518231] transition-colors dark:text-slate-200 dark:hover:text-[#518231]">
                <Code size={16} className="text-[#518231]" />
                Developer Tools
                <ChevronDown size={14} className="text-slate-400 group-hover:text-[#518231] transition-transform group-hover:rotate-180" />
              </button>
              
              {/* Full Width Dropdown */}
              <div className={`absolute top-full left-0 w-full pt-0 opacity-0 invisible transition-all duration-300 ease-out z-50 ${menuClicked ? '' : 'group-hover:opacity-100 group-hover:visible'}`}>
                <div className="bg-white border-t border-b border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
                  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-4 gap-8">
                      {devToolsColumns.map((col, idx) => (
                        <div key={idx} className="flex flex-col gap-8">
                          {col.map(category => (
                            <div key={category.title}>
                               <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                                 <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-md">
                                    <category.icon size={16} className="text-[#518231]" />
                                 </div>
                                 <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{category.title}</h3>
                               </div>
                               <ul className="space-y-1">
                                 {category.items.map(item => (
                                   <li key={item.name}>
                                     <Link href={`/tools/${item.name.toLowerCase().replace(/ /g, '-')}` as any} onClick={handleLinkClick} className="block px-3 py-2 text-sm rounded-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 group/link relative border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50">
                                       <div className="text-slate-600 dark:text-slate-300 group-hover/link:text-[#518231] font-medium transition-colors">{item.name}</div>
                                       <div className="text-[12px] leading-tight text-slate-400 dark:text-slate-500 max-h-0 overflow-hidden opacity-0 group-hover/link:max-h-10 group-hover/link:opacity-100 group-hover/link:mt-1 transition-all duration-300 ease-in-out">
                                         {item.desc}
                                       </div>
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {navCategories.map((category) => (
              <div key={category.id} className="relative group px-3 py-2" onMouseLeave={() => setMenuClicked(false)}>
                <button className="flex items-center gap-1 text-sm font-semibold text-slate-800 hover:text-[#518231] transition-colors dark:text-slate-200 dark:hover:text-[#518231]">
                  {category.title.replace(" Calculators", "")}
                  <ChevronDown size={14} className="text-slate-400 group-hover:text-[#518231] transition-transform group-hover:rotate-180" />
                </button>
                
                {/* Desktop Dropdown */}
                <div className={`absolute top-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 pt-2 opacity-0 invisible transition-all duration-200 ease-out z-50 w-64 ${menuClicked ? '' : 'group-hover:opacity-100 group-hover:visible'}`}>
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
                         if (link === "Margin Calculator") href = "/calculators/margin-calculator";
                         if (link === "Real Estate Calculator") href = "/calculators/real-estate-calculator";
                         if (link === "Lease Calculator") href = "/calculators/lease-calculator";
                         if (link === "IRR Calculator") href = "/calculators/irr-calculator";
                         if (link === "Amortization Calculator") href = "/calculators/amortization-calculator";
                         if (link === "Compound Interest Calculator") href = "/calculators/compound-interest-calculator";
                         if (link === "Finance Calculator") href = "/calculators/finance-calculator";
                         if (link === "Graphing Calculator") href = "/calculators/graphing-calculator";
                         if (link === "Cash Back or Low Interest Calculator") href = "/calculators/cash-back-vs-low-interest-calculator";
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
                               onClick={handleLinkClick}
                               className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#0066cc] transition-colors dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-[#4299e1]"
                             >
                               {link}
                             </Link>
                           </li>
                         );
                      })}
                      <li>
                        <Link href="/sitemap" onClick={handleLinkClick} className="block px-4 py-2 text-sm font-semibold text-[#518231] hover:bg-green-50 transition-colors mt-1 dark:hover:bg-slate-800">
                          View all in {category.title.replace(" Calculators", "")} <span className="inline-block rtl:rotate-180">&rarr;</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className="ms-4 ps-4 border-s border-slate-200 dark:border-slate-700 flex items-center space-x-4">
              <Link href="/community" className="text-sm font-semibold text-slate-800 hover:text-[#518231] transition-colors dark:text-slate-200 dark:hover:text-[#518231]">
                Community
              </Link>
              <AuthButton />
              <Link href="/search" className="p-2 text-slate-400 hover:text-[#518231] transition-colors dark:text-slate-500 dark:hover:text-[#518231] inline-flex items-center justify-center min-h-[48px] min-w-[48px]">
                <span className="sr-only">Search calculators</span>
                <Search size={20} />
              </Link>
            </div>
          </div>

          {/* Right: Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <Link href="/search" className="p-2 me-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 inline-flex items-center justify-center min-h-[48px] min-w-[48px]">
               <span className="sr-only">Search</span>
               <Search size={20} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#518231] dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 min-h-[48px] min-w-[48px]"
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
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[calc(100vh-64px)] border-b border-slate-200 dark:border-slate-800 overflow-y-auto" : "max-h-0 overflow-hidden"} bg-white dark:bg-slate-900 custom-scrollbar`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {/* Developer Tools Mobile Accordion */}
          <div className="py-2">
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 px-3 dark:text-slate-200">
              Developer Tools
            </div>
            <div className="grid grid-cols-1 gap-1">
              {developerToolsMenu.map(category => (
                 <details key={category.title} className="group/details">
                   <summary className="flex items-center gap-2 px-3 py-3 text-base font-medium text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md list-none [&::-webkit-details-marker]:hidden">
                     <category.icon size={18} className="text-[#518231]" />
                     {category.title}
                     <ChevronDown size={16} className="ml-auto text-slate-400 group-open/details:rotate-180 transition-transform" />
                   </summary>
                   <div className="pl-9 pr-3 py-2 space-y-1 bg-slate-50/50 dark:bg-slate-800/20 rounded-b-md -mt-1 mb-1">
                     {category.items.map(item => (
                       <Link key={item.name} href={`/tools/${item.name.toLowerCase().replace(/ /g, '-')}` as any} className="block py-2 group/moblink" onClick={() => setIsMobileMenuOpen(false)}>
                         <div className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover/moblink:text-[#518231] transition-colors">{item.name}</div>
                         <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</div>
                       </Link>
                     ))}
                   </div>
                 </details>
              ))}
            </div>
          </div>

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
                         if (link === "Margin Calculator") href = "/calculators/margin-calculator";
                         if (link === "Real Estate Calculator") href = "/calculators/real-estate-calculator";
                         if (link === "Lease Calculator") href = "/calculators/lease-calculator";
                         if (link === "IRR Calculator") href = "/calculators/irr-calculator";
                     if (link === "Amortization Calculator") href = "/calculators/amortization-calculator";
                     if (link === "Compound Interest Calculator") href = "/calculators/compound-interest-calculator";
                     if (link === "Finance Calculator") href = "/calculators/finance-calculator";
                     if (link === "Graphing Calculator") href = "/calculators/graphing-calculator";
                         if (link === "Cash Back or Low Interest Calculator") href = "/calculators/cash-back-vs-low-interest-calculator";
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
                          className="block px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0066cc] rounded-md dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-[#4299e1]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link}
                        </Link>
                     );
                  })}
                  <Link 
                    href="/sitemap"
                    className="block px-3 py-3 text-sm font-bold text-[#518231] hover:bg-green-50 rounded-md dark:hover:bg-slate-800"
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
