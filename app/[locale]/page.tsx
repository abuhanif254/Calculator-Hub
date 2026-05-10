import { Link } from "../../i18n/routing";
import Image from "next/image";
import { PlayCircle, Calculator, ShieldCheck, LineChart, Activity, Search, MousePointerClick, Zap, Star, ChevronDown, Mail, ArrowRight, Code, Clock, TrendingUp, Layers, CheckCircle2, MessageSquare, Flame, Smartphone, Lock, UserX, Users, Rocket, FolderOpen, History, ThumbsUp } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from 'next';
import { routing } from '../../i18n/routing';
import { FavoriteCalculatorLink } from "../components/FavoriteCalculatorLink";
import { FavoritesSection } from "../components/FavoritesSection";
import { HomeSearchBar } from "../components/HomeSearchBar";
import { ContinueWhereYouLeftOff } from "../components/ContinueWhereYouLeftOff";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const languages: Record<string, string> = {
    'x-default': '/',
  };
  
  routing.locales.forEach((l) => {
    languages[l] = `/${l}`;
  });

  return {
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages,
    },
  };
}

const categoryData = [
  {
    title: "Financial Calculators",
    icon: LineChart,
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-500",
    count: "45+ Tools",
    desc: "Mortgage, loans, investments, taxes",
    links: [
      { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
      { name: "Loan Calculator", href: "/calculators/loan-calculator" },
      { name: "Auto Loan Calculator", href: "/calculators/auto-loan-calculator" },
      { name: "Interest Calculator", href: "/calculators/interest-calculator" },
      { name: "Payment Calculator", href: "/calculators/payment-calculator" },
      { name: "Retirement Calculator", href: "/calculators/retirement-calculator" }
    ]
  },
  {
    title: "Fitness & Health",
    icon: Activity,
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-500",
    count: "15+ Tools",
    desc: "BMI, calories, pregnancy, pace",
    links: [
      { name: "BMI Calculator", href: "/calculators/bmi-calculator" },
      { name: "Calorie Calculator", href: "/calculators/calorie-calculator" },
      { name: "Body Fat Calculator", href: "/calculators/body-fat-calculator" },
      { name: "BMR Calculator", href: "/calculators/bmr-calculator" },
      { name: "Ideal Weight Calculator", href: "/calculators/ideal-weight-calculator" },
      { name: "Pace Calculator", href: "/calculators/pace-calculator" }
    ]
  },
  {
    title: "Math & Science",
    icon: Calculator,
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-500",
    count: "20+ Tools",
    desc: "Scientific, fractions, geometry",
    links: [
      { name: "Scientific Calculator", href: "/calculators/scientific-calculator" },
      { name: "Fraction Calculator", href: "/calculators/fraction-calculator" },
      { name: "Percentage Calculator", href: "/calculators/percentage-calculator" },
      { name: "Random Number Generator", href: "/calculators/random-number-generator" },
      { name: "Triangle Calculator", href: "/calculators/triangle-calculator" },
      { name: "Standard Deviation Calculator", href: "/calculators/standard-deviation-calculator" }
    ]
  },
  {
    title: "Developer Tools",
    icon: Code,
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-500",
    count: "60+ Utilities",
    desc: "Formatters, encoders, generators",
    links: [
      { name: "JSON Formatter", href: "/tools/json-formatter" },
      { name: "HTML Formatter", href: "/tools/html-formatter" },
      { name: "Diff Checker", href: "/tools/diff-checker" },
      { name: "Subnet Calculator", href: "/calculators/subnet-calculator" },
      { name: "Password Generator", href: "/calculators/password-generator" },
      { name: "Conversion Calculator", href: "/calculators/conversion-calculator" }
    ]
  }
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations("Index");
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

  // WebSite schema — enables Google Sitelinks Search Box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nexus Calculator",
    "url": baseUrl,
    "description": "The ultimate ecosystem for calculators and developer tools.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/en/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Organization schema — establishes brand entity
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexus Calculator",
    "url": baseUrl,
    "logo": `${baseUrl}/icons/icon-512x512.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "nexuscalculator@gmail.com",
      "contactType": "customer service"
    },
    "sameAs": []
  };

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/10 via-transparent to-[#518231]/5 -z-10" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-semibold mb-6">
                <Flame size={16} /> <span>Now more than just calculators!</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                Calculate, Build, Format & Solve — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#518231] to-emerald-600">All in One Platform</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-8 max-w-2xl mx-auto lg:mx-0">
                The ultimate ecosystem for professionals. Access hundreds of precise calculators and powerful developer utilities instantly in your browser.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/sitemap" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-8 py-4 rounded-xl text-lg transition-colors font-semibold shadow-lg shadow-green-900/20">
                  Explore Tools
                  <ArrowRight size={20} />
                </Link>
                <Link href="/community" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl text-lg transition-colors font-semibold shadow-sm">
                  Join Community
                  <Users size={20} />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative w-full max-w-lg lg:max-w-none mx-auto">
              {/* Animated Dashboard Illustration Concept */}
              <div className="relative rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-slate-700 p-6 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#518231] to-emerald-400"></div>
                 <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 animate-[pulse_3s_ease-in-out_infinite]">
                       <Code className="text-blue-500 mb-2" size={24} />
                       <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                       <div className="h-4 w-24 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                       <Calculator className="text-[#518231] mb-2" size={24} />
                       <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                       <div className="h-4 w-20 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 col-span-2 flex items-center justify-between">
                       <div>
                         <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                         <div className="h-6 w-32 bg-slate-300 dark:bg-slate-600 rounded"></div>
                       </div>
                       <LineChart className="text-purple-500 opacity-50" size={40} />
                    </div>
                 </div>
                 
                 {/* Floating Cards */}
                 <div className="absolute -right-6 -bottom-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-[bounce_4s_ease-in-out_infinite]">
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                      <Zap size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-white">JSON Formatter</div>
                      <div className="text-xs text-slate-500">2ms execution</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retention Widget: Continue Where You Left Off */}
      <ContinueWhereYouLeftOff />

      {/* Global Search Section */}
      <section className="relative z-20 -mt-10 max-w-[900px] mx-auto px-4 sm:px-6 w-full">
        <HomeSearchBar />
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Recently Used / Favorites */}
        <FavoritesSection />

        {/* SEO Freshness / Trending */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <TrendingUp className="text-blue-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Trending Today</h2>
             </div>
             <ul className="space-y-4">
                {[
                  { name: "JSON Formatter", href: "/tools/json-formatter" },
                  { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
                  { name: "BMI Calculator", href: "/calculators/bmi-calculator" },
                  { name: "HTML Formatter", href: "/tools/html-formatter" },
                  { name: "Diff Checker", href: "/tools/diff-checker" }
                ].map((tool, i) => (
                  <li key={i}>
                    <Link href={tool.href as any} className="flex items-center justify-between group">
                       <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#518231] transition-colors">{tool.name}</span>
                       <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded">Popular</span>
                    </Link>
                  </li>
                ))}
             </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <Clock className="text-emerald-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recently Updated</h2>
             </div>
             <ul className="space-y-4">
                {[
                  { name: "Income Tax Calculator 2024", href: "/calculators/income-tax-calculator" },
                  { name: "Compound Interest", href: "/calculators/compound-interest-calculator" },
                  { name: "HTML Formatter", href: "/tools/html-formatter" },
                  { name: "Credit Card Payoff", href: "/calculators/credit-cards-payoff" },
                  { name: "Diff Checker", href: "/tools/diff-checker" }
                ].map((tool, i) => (
                  <li key={i}>
                    <Link href={tool.href as any} className="flex items-center justify-between group">
                       <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#518231] transition-colors">{tool.name}</span>
                       <span className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">Updated</span>
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:col-span-2 lg:col-span-1">
             <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <History className="text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Popular Searches</h2>
             </div>
             <div className="flex flex-wrap gap-2">
               {[
                 { name: "BMI", href: "/calculators/bmi-calculator" },
                 { name: "Mortgage", href: "/calculators/mortgage-calculator" },
                 { name: "JSON", href: "/tools/json-formatter" },
                 { name: "Loan", href: "/calculators/loan-calculator" },
                 { name: "Retirement", href: "/calculators/retirement-calculator" },
                 { name: "Age calc", href: "/calculators/age-calculator" },
                 { name: "GPA", href: "/calculators/gpa-calculator" },
                 { name: "Diff Checker", href: "/tools/diff-checker" },
                 { name: "HTML Format", href: "/tools/html-formatter" },
                 { name: "Calorie", href: "/calculators/calorie-calculator" }
               ].map((tag, i) => (
                 <Link key={i} href={tag.href as any} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
                   {tag.name}
                 </Link>
               ))}
             </div>
          </div>
        </section>

        {/* Featured Developer Tools (NEW) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Developer Essentials</h2>
              <p className="text-slate-600 dark:text-slate-400">High-performance utilities built for modern web developers.</p>
            </div>
            <Link href="/sitemap" className="hidden sm:flex items-center gap-1 text-[#518231] font-semibold hover:text-[#436a28]">
              View all dev tools <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { name: "JSON Formatter", icon: Code, desc: "Format, validate, and minify JSON data instantly.", href: "/tools/json-formatter" },
               { name: "HTML Formatter", icon: ShieldCheck, desc: "Beautify and format raw HTML code with proper indentation.", href: "/tools/html-formatter" },
               { name: "Diff Checker", icon: Layers, desc: "Compare two blocks of text or code to find differences.", href: "/tools/diff-checker" },
               { name: "Scientific Calculator", icon: Code, desc: "Advanced math with trigonometry, logarithms, and more.", href: "/calculators/scientific-calculator" }
             ].map((tool, i) => (
               <Link key={i} href={tool.href as any} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-[#518231]/30 transition-all group">
                 <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#518231]/10 transition-colors">
                   <tool.icon className="text-slate-600 dark:text-slate-400 group-hover:text-[#518231] transition-colors" size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h3>
                 <p className="text-sm text-slate-600 dark:text-slate-400">{tool.desc}</p>
               </Link>
             ))}
          </div>
        </section>

        {/* Popular Categories */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Comprehensive Tool Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryData.map((category) => (
              <div key={category.title} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 ${category.bgColor}`}>
                      <category.icon className={category.iconColor} size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">{category.title}</h3>
                      <span className="text-xs font-semibold text-[#518231] bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">{category.count}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10">{category.desc}</p>
                  <ul className="space-y-2 mb-4">
                    {category.links.slice(0, 4).map((link) => (
                      <li key={link.name}>
                         <Link href={link.href as any} className="text-sm text-slate-600 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#518231] font-medium transition-colors flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                           {link.name}
                         </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/sitemap" className="text-sm font-semibold text-[#518231] hover:text-[#436a28] flex items-center gap-1 mt-4">
                    View all tools <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why NexusCalculator */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center border border-slate-800">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
           <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#518231] blur-[100px] rounded-full opacity-20"></div>
           
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Professionals Choose Us</h2>
             <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">We built this platform to respect your time, data, and device constraints.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Lightning Fast</h3>
                  <p className="text-slate-400 text-sm">Calculations run locally in your browser. Zero server latency.</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Privacy First</h3>
                  <p className="text-slate-400 text-sm">No data logging. Your financial and health data never leaves your device.</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
                  <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Mobile Optimized</h3>
                  <p className="text-slate-400 text-sm">Flawless responsive design. Perfect UI on desktops, tablets, and phones.</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserX size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">No Signup Required</h3>
                  <p className="text-slate-400 text-sm">100% free access immediately. No paywalls, no forced registrations.</p>
                </div>
             </div>
           </div>
        </section>

        {/* Real Use Cases / Workflow */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Designed for Real World Scenarios</h2>
             <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
               Whether you are planning a 30-year mortgage, debugging a critical API response, or tracking your fitness goals, we have a specialized tool waiting for you.
             </p>
             <div className="space-y-6">
                {[
                  { title: "Financial Planning", desc: "Calculate mortgage payments, amortization schedules, and ROI.", icon: LineChart },
                  { title: "Software Development", desc: "Validate API JSON, encode tokens, and format raw data.", icon: Code },
                  { title: "Health & Fitness", desc: "Track calories, BMI, body fat, and setup diet plans.", icon: Activity }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                    <div className="w-12 h-12 bg-[#518231]/10 text-[#518231] rounded-xl flex items-center justify-center shrink-0 mt-1">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/20 to-transparent blur-3xl -z-10 rounded-full" />
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl">
               <div className="flex flex-col gap-6 relative">
                 <div className="absolute left-[27px] top-[40px] bottom-[40px] w-0.5 bg-slate-200 dark:bg-slate-700" />
                 
                 <div className="flex gap-6 relative z-10">
                   <div className="w-14 h-14 bg-white dark:bg-slate-800 border-2 border-[#518231] rounded-full flex items-center justify-center shrink-0 shadow-md">
                     <Search className="text-[#518231]" size={24} />
                   </div>
                   <div className="pt-3">
                     <h4 className="font-bold text-slate-900 dark:text-white text-lg">1. Find Your Tool</h4>
                     <p className="text-slate-500 dark:text-slate-400 mt-1">Search or browse our massive directory.</p>
                   </div>
                 </div>
                 
                 <div className="flex gap-6 relative z-10">
                   <div className="w-14 h-14 bg-white dark:bg-slate-800 border-2 border-[#518231] rounded-full flex items-center justify-center shrink-0 shadow-md">
                     <MousePointerClick className="text-[#518231]" size={24} />
                   </div>
                   <div className="pt-3">
                     <h4 className="font-bold text-slate-900 dark:text-white text-lg">2. Input Data</h4>
                     <p className="text-slate-500 dark:text-slate-400 mt-1">Fill in the variables in our intuitive UI.</p>
                   </div>
                 </div>
                 
                 <div className="flex gap-6 relative z-10">
                   <div className="w-14 h-14 bg-[#518231] text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#518231]/30 border-4 border-green-100 dark:border-green-900/30">
                     <CheckCircle2 size={24} />
                   </div>
                   <div className="pt-3">
                     <h4 className="font-bold text-slate-900 dark:text-white text-lg">3. Instant Results</h4>
                     <p className="text-slate-500 dark:text-slate-400 mt-1">Get accurate answers with visual charts instantly.</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* Community & Discussions */}
        <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 lg:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Community & Discussions</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Join developers and professionals worldwide.</p>
            </div>
            <Link href="/community" className="shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              View Community
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { topic: "Best JSON Formatter settings?", replies: 12, category: "Developer Tools" },
               { topic: "How accurate is the BMI formula?", replies: 34, category: "Health" },
               { topic: "Mortgage planning tips for 2024", replies: 8, category: "Finance" }
             ].map((discussion, i) => (
               <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:shadow-md transition-shadow">
                 <div className="text-xs font-semibold text-[#518231] mb-3 uppercase tracking-wider">{discussion.category}</div>
                 <h4 className="text-slate-900 dark:text-white font-bold mb-4 line-clamp-2">{discussion.topic}</h4>
                 <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4">
                   <span className="flex items-center gap-1.5"><MessageSquare size={16} /> {discussion.replies} replies</span>
                   <Link href="/community" className="text-[#518231] hover:underline font-medium">Read &rarr;</Link>
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* Featured Collections (Future Goldmine) */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Curated Tool Collections</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Hand-picked sets of tools for specific professions.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { name: "Frontend Developer Kit", icon: Code, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
               { name: "Financial Planner Pack", icon: LineChart, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
               { name: "Student Toolkit", icon: FolderOpen, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
               { name: "Fitness Essentials", icon: Activity, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" }
             ].map((collection, i) => (
               <Link key={i} href="/sitemap" className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900 transition-all text-center">
                 <div className={`w-16 h-16 mx-auto rounded-2xl ${collection.bg} ${collection.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                   <collection.icon size={32} />
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white mb-1">{collection.name}</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400">View Collection &rarr;</p>
               </Link>
             ))}
          </div>
        </section>

        {/* Trust & Statistics */}
        <section className="border-y border-slate-200 dark:border-slate-800 py-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200 dark:divide-slate-800">
             <div>
               <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">250+</div>
               <div className="text-slate-500 dark:text-slate-400 font-medium">Tools & Calculators</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">100+</div>
               <div className="text-slate-500 dark:text-slate-400 font-medium">Dev Utilities</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">50k+</div>
               <div className="text-slate-500 dark:text-slate-400 font-medium">Monthly Calculations</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">99%</div>
               <div className="text-slate-500 dark:text-slate-400 font-medium">Uptime & Reliability</div>
             </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Trusted by Professionals Worldwide</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Join thousands of developers and finance experts using Nexus Calculator.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Financial Advisor", text: "The most reliable mortgage and amortization tools I've found online. Clean interface and always accurate." },
              { name: "Michael T.", role: "Senior Developer", text: "Having the JSON formatter and Base64 tools right next to my financial calculators is a game changer. Saves me so much time." },
              { name: "Elena R.", role: "Student", text: "The scientific calculator saved me during finals week. I appreciate the clean layout without distracting ads." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex gap-1 mb-4 text-amber-400">
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-6">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need to know about our calculators and tools.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Are my financial inputs saved?", a: "No, all calculations are performed entirely in your browser. We do not store, save, or transmit any of the numbers you input on our site, ensuring your absolute privacy." },
              { q: "How often are the developer tools updated?", a: "Our team regularly updates parsing libraries, encoders, and formatting tools to support the latest web standards and programming languages." },
              { q: "Can I request a new tool?", a: "Absolutely! We love building tools our users need. Use our community forum to suggest a new specific calculator or utility." },
              { q: "Are these tools free to use?", a: "Yes, all calculators and developer tools on Nexus Calculator are 100% free with no limits on usage. We aim to provide high-quality utility for everyone." }
            ].map((faq, i) => (
              <details key={i} className="group border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-900 dark:text-white hover:text-[#518231] dark:hover:text-[#518231] transition-colors">
                  {faq.q}
                  <span className="transition group-open:rotate-180 text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden px-4 md:px-6 py-16 md:py-24 text-center border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/20 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated</h2>
            <p className="text-slate-300 text-lg mb-10">Join our newsletter to be the first to know when new developer tools, APIs, and advanced calculators are deployed.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="#">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-transparent transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-[#518231] hover:bg-[#436a28] text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-slate-400 text-sm mt-4">We care about your data in our privacy policy.</p>
          </div>
        </div>

      </div>
    </main>
  );
}
