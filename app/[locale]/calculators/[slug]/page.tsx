import React from "react";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/lib/data/calculators";
import { sitemapCategories, generalLinks } from "@/lib/data/sitemapData";
import { Calculator } from "@/app/components/Calculator";
import { LoanCalculatorView } from "@/app/components/LoanCalculatorView";
import { BmiCalculatorView } from "@/app/components/BmiCalculatorView";
import { AgeCalculatorView } from "@/app/components/AgeCalculatorView";
import { AutoLoanCalculatorView } from "@/app/components/AutoLoanCalculatorView";
import { InterestCalculatorView } from "@/app/components/InterestCalculatorView";
import { PaymentCalculatorView } from "@/app/components/PaymentCalculatorView";
import { RetirementCalculatorView } from "@/app/components/RetirementCalculatorView";
import { RothIraCalculatorView } from "@/app/components/RothIraCalculatorView";
import { CashBackLowInterestCalculatorView } from "@/app/components/CashBackLowInterestCalculatorView";
import { MarginCalculatorView } from "@/app/components/MarginCalculatorView";
import { RealEstateCalculatorView } from "@/app/components/RealEstateCalculatorView";
import { LeaseCalculatorView } from "@/app/components/LeaseCalculatorView";
import { AmortizationCalculatorView } from "@/app/components/AmortizationCalculatorView";
import { InvestmentCalculatorView } from "@/app/components/InvestmentCalculatorView";
import { InflationCalculatorView } from "@/app/components/InflationCalculatorView";
import { FinanceCalculatorView } from "@/app/components/FinanceCalculatorView";
import { IncomeTaxCalculatorView } from "@/app/components/IncomeTaxCalculatorView";
import { CompoundInterestCalculatorView } from "@/app/components/CompoundInterestCalculatorView";
import { SalaryCalculatorView } from "@/app/components/SalaryCalculatorView";
import { InterestRateCalculatorView } from "@/app/components/InterestRateCalculatorView";
import { SalesTaxCalculatorView } from "@/app/components/SalesTaxCalculatorView";
import { ScientificCalculatorView } from "@/app/components/ScientificCalculatorView";
import { ScientificNotationCalculatorView } from "@/app/components/ScientificNotationCalculatorView";
import { PValueCalculatorView } from "@/app/components/PValueCalculatorView";
import { FractionCalculatorView } from "@/app/components/FractionCalculatorView";
import { StatisticsCalculatorView } from "@/app/components/StatisticsCalculatorView";
import { PercentageCalculatorView } from "@/app/components/PercentageCalculatorView";
import { RandomNumberGeneratorView } from "@/app/components/RandomNumberGeneratorView";
import { TriangleCalculatorView } from "@/app/components/TriangleCalculatorView";
import { StandardDeviationCalculatorView } from "@/app/components/StandardDeviationCalculatorView";
import GraphingCalculatorView from "@/app/components/GraphingCalculatorView";
import { CalorieCalculatorView } from "@/app/components/CalorieCalculatorView";
import { BodyFatCalculatorView } from "@/app/components/BodyFatCalculatorView";
import { BMRCalculatorView } from "@/app/components/BMRCalculatorView";
import { OvulationCalculatorView } from "@/app/components/OvulationCalculatorView";
import { IdealWeightCalculatorView } from "@/app/components/IdealWeightCalculatorView";
import { PaceCalculatorView } from "@/app/components/PaceCalculatorView";
import { PregnancyCalculatorView } from "@/app/components/PregnancyCalculatorView";
import { PregnancyConceptionCalculatorView } from "@/app/components/PregnancyConceptionCalculatorView";
import { DueDateCalculatorView } from "@/app/components/DueDateCalculatorView";
import { DateCalculatorView } from "@/app/components/DateCalculatorView";
import { TimeCalculatorView } from "@/app/components/TimeCalculatorView";
import { HoursCalculatorView } from "@/app/components/HoursCalculatorView";
import { GpaCalculatorView } from "@/app/components/GpaCalculatorView";
import { GradeCalculatorView } from "@/app/components/GradeCalculatorView";
import { ConcreteCalculatorView } from "@/app/components/ConcreteCalculatorView";
import { SubnetCalculatorView } from "@/app/components/SubnetCalculatorView";
import { PasswordGeneratorView } from "@/app/components/PasswordGeneratorView";
import { ConversionCalculatorView } from "@/app/components/ConversionCalculatorView";
import { CurrencyCalculatorView } from "@/app/components/CurrencyCalculatorView";
import { RentCalculatorView } from "@/app/components/RentCalculatorView";
import { SocialSecurityCalculatorView } from "@/app/components/SocialSecurityCalculatorView";
import { CreditCardsPayoffView } from "@/app/components/CreditCardsPayoffView";
import { StudentLoanCalculatorView } from "@/app/components/StudentLoanCalculatorView";
import { BusinessLoanCalculatorView } from "@/app/components/BusinessLoanCalculatorView";
import { PersonalLoanCalculatorView } from "@/app/components/PersonalLoanCalculatorView";
import { BudgetCalculatorView } from "@/app/components/BudgetCalculatorView";
import { APRCalculatorView } from "@/app/components/APRCalculatorView";
import { HELOCCalculatorView } from "@/app/components/HELOCCalculatorView";
import { PresentValueCalculatorView } from "@/app/components/PresentValueCalculatorView";
import { PercentOffCalculatorView } from "@/app/components/PercentOffCalculatorView";
import { Plan401kCalculatorView } from "@/app/components/Plan401kCalculatorView";
import { MarriageTaxCalculatorView } from "@/app/components/MarriageTaxCalculatorView";
import { AnnuityCalculatorView } from "@/app/components/AnnuityCalculatorView";
import { DebtPayoffCalculatorView } from "@/app/components/DebtPayoffCalculatorView";
import { CollegeCostCalculatorView } from "@/app/components/CollegeCostCalculatorView";
import { AnnuityPayoutCalculatorView } from "@/app/components/AnnuityPayoutCalculatorView";
import { DebtConsolidationCalculatorView } from "@/app/components/DebtConsolidationCalculatorView";
import { SimpleInterestCalculatorView } from "@/app/components/SimpleInterestCalculatorView";
import { MutualFundCalculatorView } from "@/app/components/MutualFundCalculatorView";
import { VatCalculatorView } from "@/app/components/VatCalculatorView";
import { BondCalculatorView } from "@/app/components/BondCalculatorView";
import { RMDCalculatorView } from "@/app/components/RMDCalculatorView";
import { DepreciationCalculatorView } from "@/app/components/DepreciationCalculatorView";
import { AverageReturnCalculatorView } from "@/app/components/AverageReturnCalculatorView";
import { DebtToIncomeRatioCalculatorView } from "@/app/components/DebtToIncomeRatioCalculatorView";
import { BoatLoanCalculatorView } from "@/app/components/BoatLoanCalculatorView";
import { RentalPropertyCalculatorView } from "@/app/components/RentalPropertyCalculatorView";
import { FHALoanCalculatorView } from "@/app/components/FHALoanCalculatorView";
import { DownPaymentCalculatorView } from "@/app/components/DownPaymentCalculatorView";
import { FutureValueCalculatorView } from "@/app/components/FutureValueCalculatorView";
import { MortgageAmortizationCalculatorView } from "@/app/components/MortgageAmortizationCalculatorView";
import { HouseAffordabilityCalculatorView } from "@/app/components/HouseAffordabilityCalculatorView";
import { EstateTaxCalculatorView } from "@/app/components/EstateTaxCalculatorView";
import ReactMarkdown from "react-markdown";
import { ExportResultsPanel } from "@/app/components/ExportResultsPanel";
import { CalculatorMath } from "@/app/components/CalculatorMath";
import { Link, routing } from "@/i18n/routing";
import { Search, ChevronRight, CalculatorIcon } from "lucide-react";

import { setRequestLocale } from 'next-intl/server';

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// SSG / ISR configuration
// We revalidate occasionally to catch data updates if we were using a headless CMS.
export const revalidate = 86400; // once a day

// Helper function to read markdown content
function getMarkdownContent(slug: string, locale: string) {
  try {
    const filePath = path.join(process.cwd(), "content", locale, `${slug}.md`);
    
    // Fallback to english if language file is missing
    if (!fs.existsSync(filePath)) {
      const fallbackPath = path.join(process.cwd(), "content", "en", `${slug}.md`);
      if (fs.existsSync(fallbackPath)) {
        const fileContent = fs.readFileSync(fallbackPath, "utf-8");
        return matter(fileContent);
      }
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return matter(fileContent);
  } catch (e) {
    console.error("Error reading markdown for", slug, locale, e);
    return null;
  }
}

// Dynamic routing parameter generation
export async function generateStaticParams() {
  const params: { slug: string; locale: string }[] = [];
  
  routing.locales.forEach((locale) => {
    calculators.forEach((calc) => {
      let slugToUse = calc.slug;
      if (calc.slugs && calc.slugs[locale as keyof typeof calc.slugs]) {
        slugToUse = calc.slugs[locale as keyof typeof calc.slugs];
      }
      params.push({ slug: slugToUse, locale });
    });
  });

  return params;
}

// SEO Metadata configuration
export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    return {
      title: "Calculator Not Found",
    };
  }

  const mdData = getMarkdownContent(slug, locale);
  
  // Use markdown matter if available, fallback to hardcoded
  const metaTitle = mdData?.data?.metaTitle || calc.meta.title;
  const metaDescription = mdData?.data?.metaDescription || calc.meta.description;
  const metaKeywords = mdData?.data?.metaKeywords || calc.meta.keywords;

  const languages: Record<string, string> = {
    'x-default': `/en/calculators/${slug}`,
  };
  
  routing.locales.forEach((l) => {
    languages[l] = `/${l}/calculators/${slug}`;
  });

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/calculators/${slug}`,
      languages,
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const calc = getCalculatorBySlug(resolvedParams.slug);

  if (!calc) {
    notFound();
  }

  const mdData = getMarkdownContent(resolvedParams.slug, resolvedParams.locale);
  
  // Replace defaults with markdown data
  const pageTitle = mdData?.data?.title || calc.title;
  const pageDesc = mdData?.data?.description || calc.description;
  const seoContent = mdData?.content || calc.seoContent;

  const faqs = mdData?.data?.faqs || [
    {
      question: `What is a ${pageTitle}?`,
      answer: `A ${pageTitle} is a specialized mathematical tool that allows you to calculate and estimate relevant values based on your inputs. It's completely free to use online.`
    },
    {
      question: `How do I use this ${pageTitle}?`,
      answer: `Simply enter your required information into the fields above and the results will automatically calculate and update on your screen.`
    },
    {
      question: `Is my data safe when using this ${pageTitle}?`,
      answer: `Yes, protecting your privacy is our priority. All calculations performed by this ${pageTitle} happen locally in your browser. We never store or transmit your personal input data to any servers.`
    }
  ];

  // Find related calculators or category for the sidebar
  const activeCategory = sitemapCategories.find(c => c.title.toLowerCase().includes(calc.category.toLowerCase())) || sitemapCategories[0];
  const relatedLinks = activeCategory.links.slice(0, 8); // Top 8 related links

  const baseUrl = "https://nexuscalculator.net"; // Change to production domain when live
  const canonicalUrl = `${baseUrl}/${resolvedParams.locale}/calculators/${resolvedParams.slug}`;
  
  // SoftwareApplication JSON-LD Schema
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": pageTitle,
    "description": pageDesc,
    "applicationCategory": calc.category === "Financial" ? "FinanceApplication" : 
                           calc.category === "Health & Fitness" ? "HealthApplication" : 
                           "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // FAQPage JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Calculators",
        "item": `${baseUrl}/${resolvedParams.locale}/sitemap`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageTitle,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      {/* Breadcrumbs for SEO */}
      <nav aria-label="Breadcrumb" className="mb-6 font-sans text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
          </li>
          <li><span className="text-slate-400">/</span></li>
          <li>
            <Link href="/sitemap" className="hover:text-blue-600 hover:underline">Calculators</Link>
          </li>
          <li><span className="text-slate-400">/</span></li>
          <li className="text-slate-700 font-medium" aria-current="page">{pageTitle}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Main Content Area (Left/Top) */}
        <div className="flex-1 w-full max-w-4xl min-w-0">
          <header className="mb-10">
            <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 text-blue-800 rounded-full text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
              {calc.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {pageDesc}
            </p>
          </header>

          {calc.slug === 'cash-back-vs-low-interest-calculator' ? (
            <CashBackLowInterestCalculatorView calcDef={calc} />
          ) : calc.slug === 'roth-ira-calculator' ? (
            <RothIraCalculatorView calcDef={calc} />
          ) : calc.slug === 'payment-calculator' ? (
            <PaymentCalculatorView calcDef={calc} />
          ) : calc.slug === 'amortization-calculator' ? (
            <AmortizationCalculatorView calcDef={calc} />
          ) : calc.slug === 'percentage-calculator' ? (
            <PercentageCalculatorView calcDef={calc} />
          ) : calc.slug === 'random-number-generator' ? (
            <RandomNumberGeneratorView calcDef={calc} />
          ) : calc.slug === 'triangle-calculator' ? (
            <TriangleCalculatorView calcDef={calc} />
          ) : calc.slug === 'standard-deviation-calculator' ? (
            <StandardDeviationCalculatorView calcDef={calc} />
          ) : calc.slug === 'calorie-calculator' ? (
            <CalorieCalculatorView calcDef={calc} />
          ) : calc.slug === 'body-fat-calculator' ? (
            <BodyFatCalculatorView calcDef={calc} />
          ) : calc.slug === 'bmr-calculator' ? (
            <BMRCalculatorView calcDef={calc} />
          ) : calc.slug === 'ideal-weight-calculator' ? (
            <IdealWeightCalculatorView calcDef={calc} />
          ) : calc.slug === 'pace-calculator' ? (
            <PaceCalculatorView calcDef={calc} />
          ) : calc.slug === 'ovulation-calculator' ? (
            <OvulationCalculatorView calcDef={calc} locale={resolvedParams.locale} />
          ) : calc.slug === 'pregnancy-calculator' ? (
            <PregnancyCalculatorView calcDef={calc} />
          ) : calc.slug === 'pregnancy-conception-calculator' ? (
            <PregnancyConceptionCalculatorView calcDef={calc} />
          ) : calc.slug === 'due-date-calculator' ? (
            <DueDateCalculatorView calcDef={calc} />
          ) : calc.slug === 'date-calculator' ? (
            <DateCalculatorView calcDef={calc} />
          ) : calc.slug === 'time-calculator' ? (
            <TimeCalculatorView calcDef={calc} />
          ) : calc.slug === 'hours-calculator' ? (
            <HoursCalculatorView calcDef={calc} />
          ) : calc.slug === 'gpa-calculator' ? (
            <GpaCalculatorView calcDef={calc} />
          ) : calc.slug === 'grade-calculator' ? (
            <GradeCalculatorView calcDef={calc} />
          ) : calc.slug === 'concrete-calculator' ? (
            <ConcreteCalculatorView calcDef={calc} />
          ) : calc.slug === 'subnet-calculator' ? (
            <SubnetCalculatorView calcDef={calc} />
          ) : calc.slug === 'password-generator' ? (
            <PasswordGeneratorView calcDef={calc} />
          ) : calc.slug === 'conversion-calculator' ? (
            <ConversionCalculatorView calcDef={calc} />
          ) : calc.slug === 'currency-calculator' ? (
            <CurrencyCalculatorView calcDef={calc} />
          ) : calc.slug === 'rent-calculator' ? (
            <RentCalculatorView calcDef={calc} />
          ) : calc.slug === 'social-security-calculator' ? (
            <SocialSecurityCalculatorView calcDef={calc} />
          ) : calc.slug === 'credit-cards-payoff' ? (
            <CreditCardsPayoffView calcDef={calc} />
          ) : calc.slug === 'student-loan-calculator' ? (
            <StudentLoanCalculatorView calcDef={calc} />
          ) : calc.slug === 'business-loan-calculator' ? (
            <BusinessLoanCalculatorView calcDef={calc} />
          ) : calc.slug === 'personal-loan-calculator' ? (
            <PersonalLoanCalculatorView calcDef={calc} />
          ) : calc.slug === 'budget-calculator' ? (
            <BudgetCalculatorView calcDef={calc} />
          ) : calc.slug === 'apr-calculator' ? (
            <APRCalculatorView calcDef={calc} />
          ) : calc.slug === 'heloc-calculator' ? (
            <HELOCCalculatorView calcDef={calc} />
          ) : calc.slug === 'present-value-calculator' ? (
            <PresentValueCalculatorView calcDef={calc} />
          ) : calc.slug === 'percent-off-calculator' ? (
            <PercentOffCalculatorView calcDef={calc} />
          ) : calc.slug === '401k-calculator' ? (
            <Plan401kCalculatorView calcDef={calc} />
          ) : calc.slug === 'marriage-tax-calculator' ? (
            <MarriageTaxCalculatorView calcDef={calc} />
          ) : calc.slug === 'annuity-calculator' ? (
            <AnnuityCalculatorView calcDef={calc} />
          ) : calc.slug === 'annuity-payout-calculator' ? (
            <AnnuityPayoutCalculatorView />
          ) : calc.slug === 'debt-consolidation-calculator' ? (
            <DebtConsolidationCalculatorView />
          ) : calc.slug === 'simple-interest-calculator' ? (
            <SimpleInterestCalculatorView />
          ) : calc.slug === 'debt-payoff-calculator' ? (
            <DebtPayoffCalculatorView calcDef={calc} />
          ) : calc.slug === 'college-cost-calculator' ? (
            <CollegeCostCalculatorView calcDef={calc} />
          ) : calc.slug === 'mutual-fund-calculator' ? (
            <MutualFundCalculatorView calcDef={calc} />
          ) : calc.slug === 'vat-calculator' ? (
            <VatCalculatorView calcDef={calc} />
          ) : calc.slug === 'bond-calculator' ? (
            <BondCalculatorView calcDef={calc} />
          ) : calc.slug === 'rmd-calculator' ? (
            <RMDCalculatorView calcDef={calc} />
          ) : calc.slug === 'depreciation-calculator' ? (
            <DepreciationCalculatorView calcDef={calc} />
          ) : calc.slug === 'scientific-notation-calculator' ? (
            <ScientificNotationCalculatorView calcDef={calc} />
          ) : calc.slug === 'margin-calculator' ? (
            <MarginCalculatorView calcDef={calc} />
          ) : calc.slug === 'real-estate-calculator' ? (
            <RealEstateCalculatorView calcDef={calc} />
          ) : calc.slug === 'lease-calculator' ? (
            <LeaseCalculatorView calcDef={calc} />
          ) : calc.slug === 'average-return-calculator' ? (
            <AverageReturnCalculatorView calcDef={calc} />
          ) : calc.slug === 'debt-to-income-ratio-calculator' ? (
            <DebtToIncomeRatioCalculatorView calcDef={calc} />
          ) : calc.slug === 'boat-loan-calculator' ? (
            <BoatLoanCalculatorView calcDef={calc} />
          ) : calc.slug === 'rental-property-calculator' ? (
            <RentalPropertyCalculatorView calcDef={calc} />
          ) : calc.slug === 'fha-loan-calculator' ? (
            <FHALoanCalculatorView calcDef={calc} />
          ) : calc.slug === 'down-payment-calculator' ? (
            <DownPaymentCalculatorView calcDef={calc} />
          ) : calc.slug === 'future-value-calculator' ? (
            <FutureValueCalculatorView calcDef={calc} />
          ) : calc.slug === 'mortgage-amortization-calculator' ? (
            <MortgageAmortizationCalculatorView calcDef={calc} />
          ) : calc.slug === 'house-affordability-calculator' ? (
            <HouseAffordabilityCalculatorView calcDef={calc} />
          ) : calc.slug === 'estate-tax-calculator' ? (
            <EstateTaxCalculatorView />
          ) : calc.slug === 'p-value-calculator' ? (
            <PValueCalculatorView calcDef={calc} />
          ) : calc.slug === 'fraction-calculator' ? (
            <FractionCalculatorView calcDef={calc} />
          ) : calc.slug === 'statistics-calculator' ? (
            <StatisticsCalculatorView calcDef={calc} />
          ) : calc.slug === 'graphing-calculator' ? (
            <GraphingCalculatorView calcDef={calc} />
          ) : calc.slug === 'scientific-calculator' ? (
            <ScientificCalculatorView calcDef={calc} />
          ) : calc.slug === 'sales-tax-calculator' ? (
            <SalesTaxCalculatorView calcDef={calc} />
          ) : calc.slug === 'interest-rate-calculator' ? (
            <InterestRateCalculatorView calcDef={calc} />
          ) : calc.slug === 'salary-calculator' ? (
            <SalaryCalculatorView calcDef={calc} />
          ) : calc.slug === 'compound-interest-calculator' ? (
            <CompoundInterestCalculatorView calcDef={calc} />
          ) : calc.slug === 'income-tax-calculator' ? (
            <IncomeTaxCalculatorView calcDef={calc} />
          ) : calc.slug === 'finance-calculator' ? (
            <FinanceCalculatorView calcDef={calc} />
          ) : calc.slug === 'inflation-calculator' ? (
            <InflationCalculatorView calcDef={calc} />
          ) : calc.slug === 'investment-calculator' ? (
            <InvestmentCalculatorView calcDef={calc} />
          ) : calc.slug === 'retirement-calculator' ? (
            <RetirementCalculatorView calcDef={calc} />
          ) : calc.slug === 'interest-calculator' ? (
            <InterestCalculatorView calcDef={calc} />
          ) : calc.slug === 'auto-loan-calculator' ? (
            <AutoLoanCalculatorView calcDef={calc} />
          ) : calc.slug === 'loan-calculator' ? (
            <LoanCalculatorView calcDef={calc} />
          ) : calc.slug === 'bmi-calculator' ? (
            <BmiCalculatorView calcDef={calc} />
          ) : calc.slug === 'age-calculator' ? (
            <AgeCalculatorView calcDef={calc} />
          ) : (
            <Calculator calcDef={calc} />
          )}

          <ExportResultsPanel />
          <CalculatorMath slug={calc.slug} category={calc.category} />

          {/* Ad Placeholder below calculator (Main Content) */}
          <div className="my-10 w-full h-[90px] md:h-[250px]">
          </div>

          {seoContent && (
            <article className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none lg:prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-img:rounded-xl">
              <ReactMarkdown>{seoContent}</ReactMarkdown>
            </article>
          )}

          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq: any, index: number) => (
                <div key={index} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area (Right/Bottom) */}
        <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-8">
          
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Find a Calculator</h3>
            <form action={`/${resolvedParams.locale}/search`} method="GET" className="relative group">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search calculators..."
                className="w-full ps-10 pe-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </form>
          </div>

          {/* Ad Space - Top Sidebar */}
          <div className="w-full h-[250px]">
          </div>

          {/* Page Links / Quick Navigation */}
          <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6 text-white">
            <h3 className="text-lg font-bold mb-4 pb-4 border-b border-slate-800">Quick Links</h3>
            <ul className="space-y-3">
              {generalLinks.map((link) => {
                let href: any = "/";
                if (link === "Privacy Policy") href = "/privacy-policy";
                if (link === "Terms of Use") href = "/terms-of-use";
                if (link === "About Us") href = "/about-us";
                return (
                  <li key={link}>
                    <Link 
                      href={href} 
                      className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Ad Space - Bottom Sidebar (Sticky option) */}
          <div className="sticky top-8 w-full h-[600px]">
          </div>

        </aside>
      </div>

      {/* Related Calculators - Moved to bottom */}
      <div className="mt-16 border-t border-slate-200 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Related Calculators</h2>
          <Link href="/sitemap" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center">
            View all {activeCategory.title.toLowerCase()} <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedLinks.slice(0, 4).map((linkTitle) => {
            const targetCalc = calculators.find(c => c.title === linkTitle);
            const linkHref = targetCalc ? `/calculators/${targetCalc.slug}` : "/sitemap";
            return (
              <Link 
                key={linkTitle}
                href={linkHref as any} 
                className="group flex flex-col bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CalculatorIcon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{linkTitle}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {targetCalc ? targetCalc.description : "Free online utility tool."}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
