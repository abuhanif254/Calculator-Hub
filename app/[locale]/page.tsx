import { Link } from "../../i18n/routing";
import Image from "next/image";
import { Calculator, LineChart, Activity, Search, MousePointerClick, Zap, ChevronDown, ArrowRight, Code, Layers, CheckCircle2, Smartphone, Lock, UserX, Users, Rocket, FolderOpen, FileCode } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from 'next';
import { routing, resolveIntlHref } from '../../i18n/routing';
import { FavoriteCalculatorLink } from "../components/FavoriteCalculatorLink";
import { FavoritesSection } from "../components/FavoritesSection";
import { HomeSearchBar } from "../components/HomeSearchBar";
import { ContinueWhereYouLeftOff } from "../components/ContinueWhereYouLeftOff";
import { NewsletterForm } from "../components/NewsletterForm";
import { RecentDiscussions } from "../components/RecentDiscussions";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { ScrollReveal } from "../components/ScrollReveal";
import { DynamicTrending } from "../components/DynamicTrending";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates, getCanonicalUrl } = await import('@/lib/utils/seoUtils');
  const canonicalUrl = getCanonicalUrl('/', locale);
  return {
    title: 'Nexus | Ultimate Calculators & Developer Tools Platform',
    description: 'Free ecosystem for professionals. Access hundreds of precise calculators and developer tools instantly: mortgage calculator, JSON formatter, and more.',
    openGraph: {
      title: 'Nexus | Ultimate Calculators & Developer Tools Platform',
      description: 'Free ecosystem for professionals. Access hundreds of precise calculators and developer tools instantly: mortgage calculator, JSON formatter, and more.',
      url: canonicalUrl,
      siteName: 'Nexus Calculator',
      type: 'website',
      locale: locale,
      images: [
        {
          url: `https://nexuscalculator.net/icons/icon-512x512.png`,
          width: 512,
          height: 512,
          alt: 'Nexus Calculator — Calculators & Developer Tools Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Nexus | Ultimate Calculators & Developer Tools Platform',
      description: 'Free ecosystem for professionals. Access hundreds of precise calculators and developer tools instantly: mortgage calculator, JSON formatter, and more.',
      images: [`https://nexuscalculator.net/icons/icon-512x512.png`],
    },
    alternates: getCanonicalAndAlternates('/', locale),
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
      { name: "Savings Calculator", href: "/calculators/savings-calculator" },
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
      { name: "Random Number Generator", href: "/tools/random-number-generator" },
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
      { name: "Password Generator", href: "/tools/password-generator" },
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
      "email": "support@nexuscalculator.net",
      "contactType": "customer service"
    },
    "sameAs": []
  };

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-transparent pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/10 via-transparent to-[#518231]/5 -z-10" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-semibold mb-6">
                <Zap size={16} /> <span>250+ Tools — Calculators, Dev Utilities &amp; More</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#518231] to-emerald-600">Calculators & Developer Tools</span> Platform
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-8 max-w-2xl mx-auto lg:mx-0">
                The ultimate ecosystem for professionals. Access hundreds of precise calculators and powerful developer utilities instantly in your browser.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href={"/sitemap" as any} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-8 py-4 rounded-xl text-lg transition-colors font-semibold shadow-lg shadow-green-900/20">
                  Explore Tools
                  <ArrowRight size={20} />
                </Link>
                <Link href={"/community" as any} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl text-lg transition-colors font-semibold shadow-sm">
                  Join Community
                  <Users size={20} />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative w-full max-w-lg lg:max-w-none mx-auto animate-slide-in-right">

              {/* Real Tool Preview Showcase — browser-chrome window */}
              <div className="relative rounded-2xl glass-panel-heavy overflow-hidden">

                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#518231] to-emerald-400" />

                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#518231]" />
                    <span className="text-[10px] text-slate-400 font-mono tracking-wide">nexuscalculator.net</span>
                  </div>
                </div>

                {/* Panel content */}
                <div className="p-5 space-y-4">

                  {/* JSON Formatter preview */}
                  <div className="rounded-xl bg-slate-900 p-4 animate-fade-in-up-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Code className="text-purple-400" size={13} />
                        <span className="text-xs font-semibold text-slate-300">JSON Formatter</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono">✓ Valid JSON</span>
                    </div>
                    <div className="space-y-0.5 text-[11px] font-mono leading-relaxed">
                      <div><span className="text-slate-500">{"{"}</span></div>
                      <div>
                        <span className="text-slate-600 select-none">{"  "}</span>
                        <span className="text-blue-400">{`"user"`}</span>
                        <span className="text-slate-500">{": "}</span>
                        <span className="text-amber-300">{`"John Doe"`}</span>
                        <span className="text-slate-500">,</span>
                      </div>
                      <div>
                        <span className="text-slate-600 select-none">{"  "}</span>
                        <span className="text-blue-400">{`"balance"`}</span>
                        <span className="text-slate-500">{": "}</span>
                        <span className="text-emerald-400">9823.50</span>
                        <span className="text-slate-500">,</span>
                      </div>
                      <div>
                        <span className="text-slate-600 select-none">{"  "}</span>
                        <span className="text-blue-400">{`"verified"`}</span>
                        <span className="text-slate-500">{": "}</span>
                        <span className="text-pink-400">true</span>
                      </div>
                      <div><span className="text-slate-500">{"}"}</span></div>
                    </div>
                  </div>

                  {/* Mortgage + BMI side by side */}
                  <div className="grid grid-cols-2 gap-3">

                    {/* Mortgage result card */}
                    <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-3 animate-fade-in-up-2">
                      <div className="flex items-center gap-1.5 mb-2">
                        <LineChart size={11} className="text-blue-500" />
                        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">Mortgage</span>
                      </div>
                      <div className="text-xl font-extrabold text-slate-900 dark:text-white leading-none">$1,842</div>
                      <div className="text-[10px] text-slate-500 mb-2">per month · 30yr fixed</div>
                      <div className="h-1.5 bg-blue-100 dark:bg-blue-800 rounded-full overflow-hidden">
                        <div className="h-full w-[68%] bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1">68% principal paid</div>
                    </div>

                    {/* BMI score card */}
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 p-3 animate-fade-in-up-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Activity size={11} className="text-emerald-500" />
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">BMI Score</span>
                      </div>
                      <div className="text-xl font-extrabold text-slate-900 dark:text-white leading-none">22.4</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mb-2">Normal ✓</div>
                      {/* BMI range gauge */}
                      <div className="flex gap-0.5 rounded-full overflow-hidden">
                        <div className="h-1.5 flex-1 bg-blue-400" />
                        <div className="h-1.5 flex-1 bg-emerald-400 ring-1 ring-emerald-500" />
                        <div className="h-1.5 flex-1 bg-amber-400" />
                        <div className="h-1.5 flex-1 bg-red-400" />
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1">Healthy range</div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Floating chip — execution speed */}
              <div className="absolute -left-5 -bottom-5 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2.5 animate-[bounce_4s_ease-in-out_infinite] z-10">
                <div className="bg-amber-100 text-amber-600 p-1.5 rounded-lg">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white">JSON Formatter</div>
                  <div className="text-[10px] text-slate-500">2ms execution</div>
                </div>
              </div>

              {/* Floating chip — tool count */}
              <div className="absolute -top-4 -right-4 bg-[#518231] text-white px-3 py-2 rounded-xl shadow-lg shadow-green-900/25 flex items-center gap-1.5 z-10 animate-fade-in-down">
                <Zap size={13} className="fill-white" />
                <span className="text-xs font-bold">250+ Tools</span>
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

        {/* SEO Freshness / Trending (Dynamic) */}
        <DynamicTrending />

        {/* Featured Developer Tools (NEW) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Developer Essentials</h2>
              <p className="text-slate-600 dark:text-slate-400">High-performance utilities built for modern web developers.</p>
            </div>
            <Link href={"/tools" as any} className="hidden sm:flex items-center gap-1 text-[#518231] font-semibold hover:text-[#436a28]">
              View all dev tools <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { name: "JSON Formatter", icon: Code, desc: "Format, validate, and minify JSON data instantly.", href: "/tools/json-formatter" },
               { name: "HTML Formatter", icon: FileCode, desc: "Beautify and format raw HTML code with proper indentation.", href: "/tools/html-formatter" },
               { name: "Diff Checker", icon: Layers, desc: "Compare two blocks of text or code to find differences.", href: "/tools/diff-checker" },
               { name: "Scientific Calculator", icon: Code, desc: "Advanced math with trigonometry, logarithms, and more.", href: "/calculators/scientific-calculator" }
             ].map((tool, i) => (
               <Link key={i} href={resolveIntlHref(tool.href)} className="glass-panel rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-1 hover:border-[#518231]/50 dark:hover:border-[#518231]/50 transition-all duration-300 group">
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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Comprehensive Calculators & Developer Tools Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryData.map((category) => (
              <div key={category.title} className="glass-panel rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
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
                         <Link href={resolveIntlHref(link.href)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#518231] font-medium transition-colors flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                           {link.name}
                         </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={"/calculators" as any} className="text-sm font-semibold text-[#518231] hover:text-[#436a28] flex items-center gap-1 mt-4">
                    View all tools <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why NexusCalculator */}
        <section className="bg-[#090E17] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center border border-white/10 shadow-2xl shadow-green-900/10">
           <div className="absolute inset-0 opacity-10 bg-radial-pattern" />
           <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#518231] blur-[100px] rounded-full opacity-20" />
           
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Professionals Choose Us</h2>
             <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">We built this platform to respect your time, data, and device constraints.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="glass-panel !bg-white/5 dark:!bg-white/5 !border-white/10 hover:-translate-y-1 p-6 rounded-2xl transition-transform duration-300">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Lightning Fast</h3>
                  <p className="text-slate-400 text-sm">Calculations run locally in your browser. Zero server latency.</p>
                </div>
                <div className="glass-panel !bg-white/5 dark:!bg-white/5 !border-white/10 hover:-translate-y-1 p-6 rounded-2xl transition-transform duration-300">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Privacy First</h3>
                  <p className="text-slate-400 text-sm">No data logging. Your financial and health data never leaves your device.</p>
                </div>
                <div className="glass-panel !bg-white/5 dark:!bg-white/5 !border-white/10 hover:-translate-y-1 p-6 rounded-2xl transition-transform duration-300">
                  <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Mobile Optimized</h3>
                  <p className="text-slate-400 text-sm">Flawless responsive design. Perfect UI on desktops, tablets, and phones.</p>
                </div>
                <div className="glass-panel !bg-white/5 dark:!bg-white/5 !border-white/10 hover:-translate-y-1 p-6 rounded-2xl transition-transform duration-300">
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
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Calculators Designed for Real World Scenarios</h2>
             <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
               Whether you are planning a 30-year mortgage, debugging a critical API response, or tracking your fitness goals, we have a specialized tool waiting for you.
             </p>
             <div className="space-y-6">
                {[
                  { title: "Mortgage & Financial Calculators", desc: "Calculate mortgage payments, amortization schedules, and ROI.", icon: LineChart },
                  { title: "Software & Developer Tools", desc: "Validate API JSON, encode tokens, and format raw data.", icon: Code },
                  { title: "Health & Fitness Calculators", desc: "Track calories, BMI, body fat, and setup diet plans.", icon: Activity }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                    <div className="w-12 h-12 bg-[#518231]/10 text-[#518231] rounded-xl flex items-center justify-center shrink-0 mt-1">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/20 to-transparent blur-3xl -z-10 rounded-full" />
             <div className="glass-panel-heavy rounded-3xl p-8">
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
        <ScrollReveal>
          <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Community & Discussions</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Join developers and professionals worldwide.</p>
              </div>
              <Link href={"/community" as any} className="shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                View Community
              </Link>
            </div>

            {/* Dynamic: fetches latest 3 posts from Firestore, falls back to static if empty */}
            <RecentDiscussions />
          </section>
        </ScrollReveal>

        {/* Featured Collections (Future Goldmine) */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Curated Tool Collections</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Hand-picked sets of tools for specific professions.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { name: "Frontend Developer Kit",  icon: Code,      color: "text-blue-500",    bg: "bg-blue-50 dark:bg-blue-500/10",    slug: "developer-starter-pack" },
               { name: "Financial Planner Pack",   icon: LineChart,  color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", slug: "real-estate-investor-kit" },
               { name: "Student Toolkit",          icon: FolderOpen, color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-500/10",   slug: "debt-freedom-plan" },
               { name: "Fitness Essentials",       icon: Activity,   color: "text-rose-500",    bg: "bg-rose-50 dark:bg-rose-500/10",    slug: "fitness-transformation" }
             ].map((collection, i) => (
               <Link key={i} href={`/collections/${collection.slug}` as any} className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#518231]/30 dark:hover:border-[#518231]/30 bg-white dark:bg-slate-900 transition-all text-center">
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
        <ScrollReveal>
          <section className="border-y border-slate-200 dark:border-slate-800 py-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200 dark:divide-slate-800">
               <div>
                 <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                   <AnimatedCounter end={250} suffix="+" />
                 </div>
                 <div className="text-slate-500 dark:text-slate-400 font-medium">Tools & Calculators</div>
               </div>
               <div>
                 <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                   <AnimatedCounter end={100} suffix="+" />
                 </div>
                 <div className="text-slate-500 dark:text-slate-400 font-medium">Dev Utilities</div>
               </div>
               <div>
                 <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                   <AnimatedCounter end={50} suffix="k+" />
                 </div>
                 <div className="text-slate-500 dark:text-slate-400 font-medium">Monthly Calculations</div>
               </div>
               <div>
                 <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                   <AnimatedCounter end={99} suffix="%" />
                 </div>
                 <div className="text-slate-500 dark:text-slate-400 font-medium">Uptime & Reliability</div>
               </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Real Use Cases — replaces fabricated testimonials */}
        <ScrollReveal>
          <section className="glass-panel-heavy rounded-[2.5rem] p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#518231]/10 text-[#518231] text-xs font-bold uppercase tracking-widest mb-4">
                <Users size={12} /> Real-World Scenarios
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Built for How Professionals Actually Work</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                From financial advisors to developers and students — see how Nexus fits into real workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  persona: "Financial Advisor",
                  role: "Mortgage & Loan Planning",
                  icon: LineChart,
                  iconBg: "bg-blue-500/10",
                  iconColor: "text-blue-500",
                  scenario: "A client wants to refinance a $450,000 home at a lower rate. Using the Mortgage Calculator and Amortization tool together, the advisor shows side-by-side monthly savings and total interest paid — exported to PDF in one click.",
                  tools: ["Mortgage Calculator", "Amortization Calculator"],
                  toolHrefs: ["/calculators/mortgage-calculator", "/calculators/amortization-calculator"],
                },
                {
                  persona: "Backend Developer",
                  role: "API Debugging & Data Validation",
                  icon: Code,
                  iconBg: "bg-purple-500/10",
                  iconColor: "text-purple-500",
                  scenario: "During an API integration, a malformed JSON payload is causing 400 errors. The developer pastes the response into the JSON Formatter, spots the missing comma, validates it, and uses the Base64 Decoder to inspect the embedded token — all in one tab.",
                  tools: ["JSON Formatter", "Base64 Decoder"],
                  toolHrefs: ["/tools/json-formatter", "/tools/base64-decode"],
                },
                {
                  persona: "University Student",
                  role: "Study & Exam Preparation",
                  icon: Activity,
                  iconBg: "bg-emerald-500/10",
                  iconColor: "text-emerald-500",
                  scenario: "Preparing for a statistics exam, a student uses the Standard Deviation Calculator with step-by-step breakdown, then the Scientific Calculator for regression problems. No app installs, no sign-up — just open and solve.",
                  tools: ["Standard Deviation Calculator", "Scientific Calculator"],
                  toolHrefs: ["/calculators/standard-deviation-calculator", "/calculators/scientific-calculator"],
                },
              ].map((item, i) => (
                <div key={i} className="glass-panel !bg-white/40 dark:!bg-[#090E17]/60 p-8 rounded-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                      <item.icon size={22} className={item.iconColor} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{item.persona}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                    </div>
                  </div>

                  {/* Scenario */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1 italic">
                    &ldquo;{item.scenario}&rdquo;
                  </p>

                  {/* Tools used */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tools used in this workflow</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tools.map((tool, ti) => (
                        <a
                          key={ti}
                          href={item.toolHrefs[ti]}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[#518231] hover:border-[#518231]/50 transition-colors"
                        >
                          {tool}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>


        {/* FAQ Accordion */}
        <ScrollReveal>
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
                <details key={i} data-animated className="group border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-900 dark:text-white hover:text-[#518231] dark:hover:text-[#518231] transition-colors select-none">
                    {faq.q}
                    <span className="transition-transform duration-200 group-open:rotate-180 text-slate-400 shrink-0 ml-4">
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
        </ScrollReveal>

        {/* Newsletter CTA */}
        <div className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden px-4 md:px-6 py-16 md:py-24 text-center border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/20 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated</h2>
            <p className="text-slate-300 text-lg mb-10">Join our newsletter to be the first to know when new developer tools, APIs, and advanced calculators are deployed.</p>
            <NewsletterForm />
          </div>
        </div>

      </div>
    </main>
  );
}
