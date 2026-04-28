import { Link } from "../../i18n/routing";
import Image from "next/image";
import { PlayCircle, Calculator, ShieldCheck, LineChart, Activity } from "lucide-react";
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
      "Salary Calculator", "Interest Rate Calculator", "Sales Tax Calculator"
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
                if (link === "Credit Cards Payoff") href = "/calculators/credit-cards-payoff";
                if (link === "Calorie Calculator") href = "/calculators/calorie-calculator";
                if (link === "Body Fat Calculator") href = "/calculators/body-fat-calculator";
                if (link === "BMR Calculator") href = "/calculators/bmr-calculator";
                if (link === "Ideal Weight Calculator") href = "/calculators/ideal-weight-calculator";
                if (link === "Pace Calculator") href = "/calculators/pace-calculator";
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
    </main>
  );
}
