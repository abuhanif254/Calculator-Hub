"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, resolveIntlHref } from "../../i18n/routing";
import { Menu, X, Calculator, Search, ChevronDown, FileText, Shield, Zap, Palette, Wrench, Users, TrendingUp, Code, DollarSign, Heart, Hash, Grid3X3, File, Image as ImageIcon } from "lucide-react";
import { sitemapCategories, pdfToolsMenu, imageToolsMenu } from "../../lib/data/sitemapData";
import { resolveHref } from "../../lib/utils/linkResolver";
import { AuthButton } from "./AuthButton";
import { NotificationsPanel } from "./NotificationsPanel";

const developerToolsMenu = [
  {
    title: "Text & Formatting",
    icon: FileText,
    items: [
      { name: "Word Counter & Character Counter", desc: "Count words, characters, and sentences in real time" },
      { name: "Case Converter", desc: "Convert text letter cases instantly" },
      { name: "JSON Formatter", desc: "Format and indent JSON data" },
      { name: "JSON Validator", desc: "Validate your JSON strings" },
      { name: "HTML Formatter", desc: "Format HTML code" },
      { name: "CSS Beautifier", desc: "Beautify CSS styles" },
      { name: "JS Beautifier", desc: "Format JS code" },
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
      { name: "AI Prompt Helper & Optimizer", desc: "Optimize prompts for ChatGPT, Claude, and Gemini" },
      { name: "Instagram & TikTok Hashtag Generator", desc: "Generate trending, niche, and viral hashtags for social media posts" },
      { name: "Bio Link Page Generator", desc: "Create a beautiful, mobile-first personal landing page hub" },
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
      { name: "HTML / CSS / JavaScript Playground", desc: "Live code editor for frontend development" },
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
      { name: "Favicon Generator", desc: "Generate website icons and PWA manifests", slug: "favicon-generator" },
      { name: "SVG Optimizer", desc: "Optimize and minify SVG vector images", slug: "svg-optimizer" },
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
      { name: "Editor's Picks", desc: "Curated tools" },
    ]
  }
];

// Calculator category icons mapping
const calcCategoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "financial": DollarSign,
  "fitness": Heart,
  "math": Hash,
  "other": Grid3X3,
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false);
  const [mobileDevOpen, setMobileDevOpen] = useState(false);
  const [mobilePdfOpen, setMobilePdfOpen] = useState(false);
  const [mobileImageOpen, setMobileImageOpen] = useState(false);
  const [mobileCalcCategory, setMobileCalcCategory] = useState<string | null>(null);
  const [mobileDevCategory, setMobileDevCategory] = useState<string | null>(null);
  const [mobilePdfCategory, setMobilePdfCategory] = useState<string | null>(null);
  const [mobileImageCategory, setMobileImageCategory] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
  };

  // Exclude 'Calculators for Your Site' from main top-nav for a cleaner look
  const navCategories = sitemapCategories.filter(cat => cat.id !== "site-calculators");

  return (
    <header className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 relative z-40">
      <nav ref={navRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-[#518231] p-1.5 rounded-lg text-white group-hover:bg-[#436a28] transition-colors shadow-sm">
                <Calculator size={20} strokeWidth={2.5} className="animate-[spin_15s_linear_infinite]" />
              </div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                Nexus<span className="text-[#518231]">Calculator</span>
              </span>
            </Link>
          </div>

          {/* Center/Right: Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">

            {/* ── Developer Tools Mega Menu ── */}
            <div className="px-3 py-2">
              <button 
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'devTools' ? null : 'devTools')}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${activeMegaMenu === 'devTools' ? 'text-[#518231]' : 'text-slate-800 hover:text-[#518231] dark:text-slate-200 dark:hover:text-[#518231]'}`}
              >
                <Code size={16} className="text-[#518231]" />
                Developer Tools
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${activeMegaMenu === 'devTools' ? 'text-[#518231] rotate-180' : 'hover:text-[#518231]'}`} />
              </button>

              {/* Dev Tools: Full-width dropdown — 5-column compact layout */}
              <div className={`absolute top-full left-0 w-full pt-0 transition-all duration-300 ease-out z-50 ${activeMegaMenu === 'devTools' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="bg-white border-t border-b border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
                  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="grid grid-cols-5 gap-x-5 gap-y-0">

                      {/* Col 1: Text & Formatting */}
                      <DevMenuColumn category={developerToolsMenu[0]} handleLinkClick={handleLinkClick} />
                      {/* Col 2: Encoding & Security */}
                      <DevMenuColumn category={developerToolsMenu[1]} handleLinkClick={handleLinkClick} />
                      {/* Col 3: Web Dev Utilities — tall column, scrollable */}
                      <DevMenuColumn category={developerToolsMenu[4]} handleLinkClick={handleLinkClick} />
                      {/* Col 4: Generators + Color Tools stacked */}
                      <div className="flex flex-col gap-5">
                        <DevMenuColumn category={developerToolsMenu[2]} handleLinkClick={handleLinkClick} compact />
                        <DevMenuColumn category={developerToolsMenu[3]} handleLinkClick={handleLinkClick} compact />
                      </div>
                      {/* Col 5: Community + Trending stacked */}
                      <div className="flex flex-col gap-5">
                        <DevMenuColumn category={developerToolsMenu[5]} handleLinkClick={handleLinkClick} compact />
                        <DevMenuColumn category={developerToolsMenu[6]} handleLinkClick={handleLinkClick} compact />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PDF Tools Mega Menu ── */}
            <div className="px-3 py-2">
              <button 
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'pdfTools' ? null : 'pdfTools')}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${activeMegaMenu === 'pdfTools' ? 'text-[#518231]' : 'text-slate-800 hover:text-[#518231] dark:text-slate-200 dark:hover:text-[#518231]'}`}
              >
                <File size={16} className="text-[#518231]" />
                PDF Tools
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${activeMegaMenu === 'pdfTools' ? 'text-[#518231] rotate-180' : 'hover:text-[#518231]'}`} />
              </button>

              <div className={`absolute top-full left-0 w-full pt-0 transition-all duration-300 ease-out z-50 ${activeMegaMenu === 'pdfTools' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="bg-white border-t border-b border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
                  <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="grid grid-cols-4 gap-x-5 gap-y-0">
                      <DevMenuColumn category={pdfToolsMenu[0]} handleLinkClick={handleLinkClick} />
                      <DevMenuColumn category={pdfToolsMenu[1]} handleLinkClick={handleLinkClick} />
                      <DevMenuColumn category={pdfToolsMenu[2]} handleLinkClick={handleLinkClick} />
                      <DevMenuColumn category={pdfToolsMenu[3]} handleLinkClick={handleLinkClick} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Image Tools Mega Menu ── */}
            <div className="px-3 py-2">
              <button 
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'imageTools' ? null : 'imageTools')}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${activeMegaMenu === 'imageTools' ? 'text-[#518231]' : 'text-slate-800 hover:text-[#518231] dark:text-slate-200 dark:hover:text-[#518231]'}`}
              >
                <ImageIcon size={16} className="text-[#518231]" />
                Image Tools
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${activeMegaMenu === 'imageTools' ? 'text-[#518231] rotate-180' : 'hover:text-[#518231]'}`} />
              </button>

              <div className={`absolute top-full left-0 w-full pt-0 transition-all duration-300 ease-out z-50 ${activeMegaMenu === 'imageTools' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="bg-white border-t border-b border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
                  <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="grid grid-cols-3 gap-x-5 gap-y-0">
                      <DevMenuColumn category={imageToolsMenu[0]} handleLinkClick={handleLinkClick} />
                      <DevMenuColumn category={imageToolsMenu[1]} handleLinkClick={handleLinkClick} />
                      <DevMenuColumn category={imageToolsMenu[2]} handleLinkClick={handleLinkClick} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Calculators Unified Mega Menu ── */}
            <div className="px-3 py-2">
              <button 
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'calculators' ? null : 'calculators')}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${activeMegaMenu === 'calculators' ? 'text-[#518231]' : 'text-slate-800 hover:text-[#518231] dark:text-slate-200 dark:hover:text-[#518231]'}`}
              >
                <Calculator size={16} className="text-[#518231]" />
                Calculators
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${activeMegaMenu === 'calculators' ? 'text-[#518231] rotate-180' : 'hover:text-[#518231]'}`} />
              </button>

              {/* Calculators: Full-width 4-column mega menu */}
              <div className={`absolute top-full left-0 w-full pt-0 transition-all duration-300 ease-out z-50 ${activeMegaMenu === 'calculators' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="bg-white border-t border-b border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
                  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="grid grid-cols-4 gap-x-6">
                      {navCategories.map((category) => {
                        const IconComp = calcCategoryIcons[category.id] || Calculator;
                        return (
                          <div key={category.id}>
                            {/* Category header */}
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                              <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-md">
                                <IconComp size={14} className="text-[#518231]" />
                              </div>
                              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                                {category.title.replace(" Calculators", "")}
                              </h3>
                            </div>
                            {/* Links */}
                            <ul className="space-y-0.5 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
                              {category.links.slice(0, 12).map((link) => (
                                <li key={link}>
                                  <Link
                                    href={resolveIntlHref(resolveHref(link))}
                                    onClick={handleLinkClick}
                                    className="block px-2 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-all"
                                  >
                                    {link}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href="/sitemap"
                                  onClick={handleLinkClick}
                                  className="block px-2 py-1.5 text-sm font-semibold text-[#518231] hover:bg-green-50 dark:hover:bg-slate-800 rounded-lg transition-colors mt-1"
                                >
                                  View all {category.title.replace(" Calculators", "")} →
                                </Link>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ms-4 ps-4 border-s border-slate-200 dark:border-slate-700 flex items-center space-x-3">
              <Link href="/community" className="text-sm font-semibold text-slate-800 hover:text-[#518231] transition-colors dark:text-slate-200 dark:hover:text-[#518231]">
                Community
              </Link>
              <Link href="/community/leaderboard" className="text-sm font-semibold text-slate-800 hover:text-[#518231] transition-colors dark:text-slate-200 dark:hover:text-[#518231]">
                Leaderboard
              </Link>
              <Link href="/community/messages" className="text-sm font-semibold text-slate-800 hover:text-[#518231] transition-colors dark:text-slate-200 dark:hover:text-[#518231]">
                Inbox
              </Link>
              
              <button onClick={() => window.dispatchEvent(new Event('open-command-palette'))} className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400">
                <Search size={14} />
                <span className="text-sm font-medium">Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded dark:bg-slate-900 dark:border-slate-700">Ctrl K</kbd>
              </button>

              <NotificationsPanel />
              
              <AuthButton />
            </div>
          </div>

          {/* Right: Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button onClick={() => window.dispatchEvent(new Event('open-command-palette'))} className="p-2 me-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 inline-flex items-center justify-center min-h-[48px] min-w-[48px]">
               <span className="sr-only">Search</span>
               <Search size={20} />
            </button>
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

      {/* Mobile Menu Overlay
           - Uses 100dvh (dynamic viewport height) which excludes mobile browser chrome
           - Subtracts: 64px (navbar) + 44px (GlobalSettingsBar) = 108px total header
           - Falls back to 100vh - 108px for older browsers that don't support dvh
      */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen
          ? "max-h-[calc(100dvh-108px)] border-b border-slate-200 dark:border-slate-800 overflow-y-auto"
          : "max-h-0 overflow-hidden"
      } bg-white dark:bg-slate-900 custom-scrollbar overscroll-contain`}>
        <div className="px-4 pt-2 pb-6 space-y-1">

          {/* Developer Tools Mobile Accordion */}
          <div className="py-1">
            <button
              onClick={() => setMobileDevOpen(!mobileDevOpen)}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md"
            >
              <span className="flex items-center gap-2">
                <Code size={16} className="text-[#518231]" />
                Developer Tools
              </span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${mobileDevOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileDevOpen && (
              <div className="mt-1 space-y-1 pl-1">
                {developerToolsMenu.map(category => (
                  <div key={category.title}>
                    <button
                      onClick={() => setMobileDevCategory(mobileDevCategory === category.title ? null : category.title)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md"
                    >
                      <category.icon size={16} className="text-[#518231] shrink-0" />
                      <span className="flex-1 text-left">{category.title}</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${mobileDevCategory === category.title ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileDevCategory === category.title && (
                      <div className="pl-9 pr-3 py-1.5 space-y-0.5 bg-slate-50/70 dark:bg-slate-800/20 rounded-b-md mb-1">
                        {category.items.map(item => (
                          <Link
                            key={item.name}
                            href={resolveIntlHref(resolveHref(item.name))}
                            className="block py-2 group/moblink"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover/moblink:text-[#518231] transition-colors">{item.name}</div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PDF Tools Mobile Accordion */}
          <div className="py-1">
            <button
              onClick={() => setMobilePdfOpen(!mobilePdfOpen)}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md"
            >
              <span className="flex items-center gap-2">
                <File size={16} className="text-[#518231]" />
                PDF Tools
              </span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${mobilePdfOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobilePdfOpen && (
              <div className="mt-1 space-y-1 pl-1">
                {pdfToolsMenu.map(category => (
                  <div key={category.title}>
                    <button
                      onClick={() => setMobilePdfCategory(mobilePdfCategory === category.title ? null : category.title)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md"
                    >
                      <category.icon size={16} className="text-[#518231] shrink-0" />
                      <span className="flex-1 text-left">{category.title}</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${mobilePdfCategory === category.title ? 'rotate-180' : ''}`} />
                    </button>
                    {mobilePdfCategory === category.title && (
                      <div className="pl-9 pr-3 py-1.5 space-y-0.5 bg-slate-50/70 dark:bg-slate-800/20 rounded-b-md mb-1">
                        {category.items.map(item => (
                          <Link
                            key={item.name}
                            href={resolveIntlHref(resolveHref(item.name))}
                            className="block py-2 group/moblink"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover/moblink:text-[#518231] transition-colors">{item.name}</div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Tools Mobile Accordion */}
          <div className="py-1">
            <button
              onClick={() => setMobileImageOpen(!mobileImageOpen)}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md"
            >
              <span className="flex items-center gap-2">
                <ImageIcon size={16} className="text-[#518231]" />
                Image Tools
              </span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${mobileImageOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileImageOpen && (
              <div className="mt-1 space-y-1 pl-1">
                {imageToolsMenu.map(category => (
                  <div key={category.title}>
                    <button
                      onClick={() => setMobileImageCategory(mobileImageCategory === category.title ? null : category.title)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md"
                    >
                      <category.icon size={16} className="text-[#518231] shrink-0" />
                      <span className="flex-1 text-left">{category.title}</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${mobileImageCategory === category.title ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileImageCategory === category.title && (
                      <div className="pl-9 pr-3 py-1.5 space-y-0.5 bg-slate-50/70 dark:bg-slate-800/20 rounded-b-md mb-1">
                        {category.items.map(item => (
                          <Link
                            key={item.name}
                            href={resolveIntlHref(resolveHref(item.name))}
                            className="block py-2 group/moblink"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover/moblink:text-[#518231] transition-colors">{item.name}</div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calculators Mobile Accordion */}
          <div className="py-1">
            <button
              onClick={() => setMobileCalcOpen(!mobileCalcOpen)}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md"
            >
              <span className="flex items-center gap-2">
                <Calculator size={16} className="text-[#518231]" />
                Calculators
              </span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${mobileCalcOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileCalcOpen && (
              <div className="mt-1 space-y-1 pl-1">
                {navCategories.map((category) => {
                  const IconComp = calcCategoryIcons[category.id] || Calculator;
                  return (
                    <div key={category.id}>
                      <button
                        onClick={() => setMobileCalcCategory(mobileCalcCategory === category.id ? null : category.id)}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md"
                      >
                        <IconComp size={16} className="text-[#518231] shrink-0" />
                        <span className="flex-1 text-left">{category.title}</span>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${mobileCalcCategory === category.id ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileCalcCategory === category.id && (
                        <div className="pl-9 pr-3 py-1.5 space-y-0.5 bg-slate-50/70 dark:bg-slate-800/20 rounded-b-md mb-1">
                          {category.links.slice(0, 10).map(link => (
                            <Link
                              key={link}
                              href={resolveIntlHref(resolveHref(link))}
                              className="block py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#518231] transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link}
                            </Link>
                          ))}
                          <Link
                            href="/sitemap"
                            className="block py-2 text-sm font-semibold text-[#518231]"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            View All {category.title} →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Mobile Menu Footer — Auth + Notifications */}
        <div className="border-t border-slate-100 dark:border-slate-800 px-4 py-4 flex items-center justify-between gap-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Quick Actions</span>
          <div className="flex items-center gap-2">
            <NotificationsPanel />
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Reusable Dev Menu Column Sub-component ──
interface DevMenuCategoryItem {
  name: string;
  desc: string;
  slug?: string;
}
interface DevMenuCat {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: DevMenuCategoryItem[];
}

function DevMenuColumn({
  category,
  handleLinkClick,
  compact = false
}: {
  category: DevMenuCat;
  handleLinkClick: () => void;
  compact?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-800">
        <div className="p-1 bg-slate-50 dark:bg-slate-800 rounded-md shrink-0">
          <category.icon size={13} className="text-[#518231]" />
        </div>
        <h3 className="text-[11px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide leading-tight">
          {category.title}
        </h3>
      </div>
      <ul className={`space-y-0 ${compact ? 'max-h-[200px]' : 'max-h-[360px]'} overflow-y-auto custom-scrollbar`}>
        {category.items.map(item => (
          <li key={item.name}>
            <Link
              href={resolveIntlHref(item.slug ? `/tools/${item.slug}` : resolveHref(item.name))}
              onClick={handleLinkClick}
              className="block px-2 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md transition-all leading-tight"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
