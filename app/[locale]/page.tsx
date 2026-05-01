import { Link } from "../../i18n/routing";
import Image from "next/image";
import { PlayCircle, Calculator, ShieldCheck, LineChart, Activity, Search, MousePointerClick, Zap, Star, ChevronDown, Mail, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from 'next';
import { routing } from '../../i18n/routing';
import { FavoriteCalculatorLink } from "../components/FavoriteCalculatorLink";
import { FavoritesSection } from "../components/FavoritesSection";

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
    image: "https://picsum.photos/seed/financial/150/150",
    links: [
      "Mortgage Calculator", "Loan Calculator", "Auto Loan Calculator", "Interest Calculator",
      "Payment Calculator", "Retirement Calculator", "Amortization Calculator", "Investment Calculator",
      "Inflation Calculator", "Finance Calculator", "Income Tax Calculator", "Compound Interest Calculator",
      "Salary Calculator", "Interest Rate Calculator", "Sales Tax Calculator", "Average Return Calculator", 
      "Debt-to-Income Ratio Calculator"
    ]
  },
  {
    title: "Fitness & Health Calculators",
    image: "https://picsum.photos/seed/fitness/150/150",
    links: [
      "BMI Calculator", "Calorie Calculator", "Body Fat Calculator", "BMR Calculator",
      "Ideal Weight Calculator", "Pace Calculator", "Pregnancy Calculator", "Pregnancy Conception Calculator",
      "Due Date Calculator"
    ]
  },
  {
    title: "Math Calculators",
    image: "https://picsum.photos/seed/math/150/150",
    links: [
      "Scientific Calculator", "Fraction Calculator", "Percentage Calculator", "Random Number Generator",
      "Triangle Calculator", "Standard Deviation Calculator"
    ]
  },
  {
    title: "Other Calculators",
    image: "https://picsum.photos/seed/other/150/150",
    links: [
      "Age Calculator", "Date Calculator", "Time Calculator", "Hours Calculator",
      "GPA Calculator", "Grade Calculator", "Concrete Calculator", "Subnet Calculator",
      "Password Generator", "Conversion Calculator"
    ]
  }
];

const informationalContent = [
  {
    title: "Precision in Financial Planning",
    description: "Whether you're estimating mortgage payments or projecting compound interest, accuracy is paramount. Our financial tools employ standard banking formulas to ensure your long-term planning is built on solid, reliable figures.",
    icon: LineChart,
    color: "text-blue-600",
    bgColor: "bg-blue-50/50",
    borderColor: "border-blue-100",
  },
  {
    title: "Data-Driven Health Insights",
    description: "Understanding your body starts with accurate metrics. From BMI calculations to customized calorie goals based on the Harris-Benedict equation, we provide scientifically-backed insights to support your wellness journey.",
    icon: Activity,
    color: "text-rose-600",
    bgColor: "bg-rose-50/50",
    borderColor: "border-rose-100",
  },
  {
    title: "Secure & Reliable Computations",
    description: "We prioritize your privacy and data security. All calculations are performed instantly in your browser—no sensitive financial or personal health variables are ever stored or transmitted to external servers.",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50/50",
    borderColor: "border-emerald-100",
  }
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations("Index");

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative mb-16 rounded-[2.5rem] bg-slate-50/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden p-8 md:p-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/10 via-transparent to-[#518231]/5 -z-10" />
        
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-[#518231]/20 blur-[60px] rounded-full" />
            <Calculator className="w-40 h-40 md:w-56 md:h-56 text-[#518231] animate-[spin_20s_linear_infinite] relative drop-shadow-xl" strokeWidth={1} style={{ transformOrigin: "center center" }} />
          </div>
          <div className="text-center md:text-left max-w-2xl z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
              Your ultimate everyday toolkit. Solve math problems, track your fitness, manage your finances, and navigate complex calculations instantly. Experience seamless math, beautifully designed.
            </p>
          </div>
        </div>
      </div>

      <FavoritesSection />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {categoryData.map((category) => (
          <div key={category.title} className="flex flex-col items-center lg:items-start text-center lg:text-start">
            <div className="mb-6 relative w-[130px] h-[130px] rounded-full overflow-hidden shadow-sm">
              <Image 
                src={category.image} 
                alt={category.title}
                fill
                className="object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-[22px] font-normal text-green-700 mb-4 tracking-tight w-full">
              {category.title}
            </h2>
            <ul className="space-y-2.5 w-full">
              {category.links.map((link) => {
                // If it's a calculator we've actively built, link to it natively
                let href = "/sitemap";
                if (link === "Mortgage Calculator") href = "/calculators/mortgage-calculator";
                if (link === "Canadian Mortgage Calculator") href = "/calculators/canadian-mortgage-calculator";
                if (link === "Loan Calculator") href = "/calculators/loan-calculator";
                if (link === "Amortization Calculator") href = "/calculators/amortization-calculator";
                if (link === "Compound Interest Calculator") href = "/calculators/compound-interest-calculator";
                if (link === "Finance Calculator") href = "/calculators/finance-calculator";
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
                if (link === "Standard Deviation Calculator") href = "/calculators/standard-deviation-calculator";
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
                if (link === "Credit Cards Payoff Calculator") href = "/calculators/credit-cards-payoff";
                if (link === "Student Loan Calculator") href = "/calculators/student-loan-calculator";
                if (link === "Business Loan Calculator") href = "/calculators/business-loan-calculator";
                if (link === "Personal Loan Calculator") href = "/calculators/personal-loan-calculator";
                if (link === "Budget Calculator") href = "/calculators/budget-calculator";
                if (link === "APR Calculator") href = "/calculators/apr-calculator";
                if (link === "HELOC Calculator") href = "/calculators/heloc-calculator";
                if (link === "Present Value Calculator") href = "/calculators/present-value-calculator";
                if (link === "Percent Off Calculator") href = "/calculators/percent-off-calculator";
                if (link === "401(k) Calculator") href = "/calculators/401k-calculator";
                if (link === "Marriage Tax Calculator") href = "/calculators/marriage-tax-calculator";
                if (link === "Annuity Calculator") href = "/calculators/annuity-calculator";
                if (link === "Debt Payoff Calculator") href = "/calculators/debt-payoff-calculator";
                if (link === "College Cost Calculator") href = "/calculators/college-cost-calculator";
                if (link === "Mutual Fund Calculator") href = "/calculators/mutual-fund-calculator";
                if (link === "VAT Calculator") href = "/calculators/vat-calculator";
                if (link === "Bond Calculator") href = "/calculators/bond-calculator";
                if (link === "RMD Calculator") href = "/calculators/rmd-calculator";
                if (link === "Depreciation Calculator") href = "/calculators/depreciation-calculator";
                if (link === "Calorie Calculator") href = "/calculators/calorie-calculator";
                if (link === "Body Fat Calculator") href = "/calculators/body-fat-calculator";
                if (link === "BMR Calculator") href = "/calculators/bmr-calculator";
                if (link === "Ideal Weight Calculator") href = "/calculators/ideal-weight-calculator";
                if (link === "Pace Calculator") href = "/calculators/pace-calculator";
                if (link === "Average Return Calculator") href = "/calculators/average-return-calculator";
                if (link === "Debt-to-Income Ratio Calculator") href = "/calculators/debt-to-income-ratio-calculator";
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
                    <FavoriteCalculatorLink title={link} href={href} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link 
          href="/sitemap"
          className="inline-flex items-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-6 py-3 rounded text-lg transition-colors font-medium"
        >
          All Calculators
          <PlayCircle className="fill-white/80 text-[#518231]" size={24} />
        </Link>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {informationalContent.map((info, idx) => {
          const Icon = info.icon;
          return (
            <div key={idx} className={`rounded-2xl border ${info.borderColor} ${info.bgColor} p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm mb-6 ${info.color}`}>
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{info.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {info.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* How It Works Section */}
      <div className="mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Workflow</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Getting the answers you need is a seamless, friction-free experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 relative">
              <Search className="text-slate-700 w-8 h-8" />
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center border-4 border-white">1</div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Select a Tool</h3>
            <p className="text-slate-600">Browse our extensive library of specialized calculators to find exactly what you need.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 relative">
              <MousePointerClick className="text-slate-700 w-8 h-8" />
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center border-4 border-white">2</div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Input Variables</h3>
            <p className="text-slate-600">Enter your specific numbers into our intuitive, easy-to-use interfaces.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 relative">
              <Zap className="text-slate-700 w-8 h-8" />
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center border-4 border-white">3</div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Get Instant Results</h3>
            <p className="text-slate-600">Receive accurate, easy-to-understand calculations immediately on-screen.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-32 bg-slate-50 rounded-[2.5rem] p-8 md:p-16 border border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted By Thousands</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Professionals and individuals rely on Calculator Central daily.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah J.", role: "Financial Advisor", text: "The most reliable mortgage and amortization tools I've found online. Clean interface and always accurate." },
            { name: "Michael T.", role: "Fitness Coach", text: "I point all my clients to the calorie and BMI calculators here. It's incredibly straightforward and helpful." },
            { name: "Elena R.", role: "Student", text: "The scientific calculator saved me during finals week. I appreciate the clean layout without distracting ads." }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex gap-1 mb-4 text-amber-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
              <p className="text-slate-700 italic mb-6">&quot;{testimonial.text}&quot;</p>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mt-32 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600">Everything you need to know about our calculators and tools.</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "Are my financial inputs saved?", a: "No, all calculations are performed entirely in your browser. We do not store, save, or transmit any of the numbers you input on our site, ensuring your absolute privacy." },
            { q: "How often are the tools updated?", a: "Our team regularly updates formulas, tax boundaries, and logic to reflect the latest standards. Any critical changes to financial or health formulas are deployed immediately." },
            { q: "Can I request a new calculator?", a: "Absolutely! We love building tools our users need. Use our contact form to suggest a new specific calculator, and our engineers will evaluate building it." },
            { q: "Are these tools free to use?", a: "Yes, all calculators on Calculator Central are 100% free with no limits on usage. We aim to provide high-quality utility for everyone." }
          ].map((faq, i) => (
            <details key={i} className="group border border-slate-200 rounded-xl bg-white overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-900 hover:text-[#518231] transition-colors">
                {faq.q}
                <span className="transition group-open:rotate-180 text-slate-400">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-32 mb-16 relative rounded-[2.5rem] bg-slate-900 overflow-hidden px-4 md:px-6 py-16 md:py-24 text-center border border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/20 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-slate-300 text-lg mb-10">Join our newsletter to be the first to know when new specialized calculators and advanced tools are deployed to the platform.</p>
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
    </main>
  );
}
