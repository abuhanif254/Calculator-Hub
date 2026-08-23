// ═══════════════════════════════════════════════════════════════════════
// lib/data/guides.ts
// Nexus Calculator — Guides Registry
// Documentation-style guide hub (Tailwind CSS Docs / Vite Docs pattern)
// ═══════════════════════════════════════════════════════════════════════

export type GuideCategory = 'Finance' | 'Health' | 'Math & Science' | 'Privacy & Security' | 'Design & Media' | 'Productivity & Utilities';

export interface Guide {
  /** URL-safe slug (used in /guides/[slug]) */
  slug: string;
  slugs?: {
    en: string;
    es: string;
    fr: string;
    de: string;
  };
  /** Full display title */
  title: string;
  /** SEO meta description (150–160 chars) */
  description: string;
  /** Top-level category for sidebar grouping */
  category: GuideCategory;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** ISO date string — used in Article schema + sitemap lastModified */
  lastUpdated: string;
  /** Slug of the related calculator (optional) */
  relatedCalculator?: string;
  /** Whether the related route is a tool or calculator (defaults to calculator) */
  relatedType?: 'calculator' | 'tool';
  /** If true, appears in the "Featured Guides" hero row on the index page */
  featured?: boolean;
}

// ─── FINANCE GUIDES ───────────────────────────────────────────────────
const financeGuides: Guide[] = [
  {
    slug: 'how-to-use-compound-interest-calculator',
    slugs: {
      en: 'how-to-use-compound-interest-calculator',
      es: 'como-usar-calculadora-interes-compuesto',
      fr: 'comment-utiliser-calculatrice-interets-composes',
      de: 'zinseszinsrechner-anleitung'
    },
    title: 'How to Use the Compound Interest Calculator',
    description:
      'A step-by-step walkthrough of compound interest: how the formula works, what inputs to provide, and how to interpret growth projections for savings and investments.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'compound-interest-calculator',
    featured: true,
  },
  {
    slug: 'understanding-loan-amortization',
    slugs: {
      en: 'understanding-loan-amortization',
      es: 'entender-amortizacion-prestamos',
      fr: 'comprendre-amortissement-pret',
      de: 'kredittilgung-verstehen'
    },
    title: 'Understanding Loan Amortization: A Step-by-Step Guide',
    description:
      'Learn how loan amortization schedules work, how principal vs. interest payments shift over time, and how to use the amortization calculator to plan your repayment.',
    category: 'Finance',
    readingTime: 7,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'amortization-calculator',
    featured: true,
  },
  {
    slug: 'how-to-calculate-mortgage-payments',
    slugs: {
      en: 'how-to-calculate-mortgage-payments',
      es: 'como-calcular-pagos-hipoteca',
      fr: 'comment-calculer-paiements-hypothecaires',
      de: 'hypothekenzahlungen-berechnen'
    },
    title: 'How to Calculate Mortgage Payments Accurately',
    description:
      'Understand every component of a mortgage payment — principal, interest, PMI, taxes, and insurance — and learn to use our mortgage calculator for precise estimates.',
    category: 'Finance',
    readingTime: 8,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'mortgage-calculator',
    featured: true,
  },
  {
    slug: 'apr-vs-interest-rate-guide',
    slugs: {
      en: 'apr-vs-interest-rate-guide',
      es: 'guia-apr-vs-tasa-interes',
      fr: 'guide-taeg-vs-taux-interet',
      de: 'effektivzins-vs-nominalzins-ratgeber'
    },
    title: 'APR vs. Interest Rate: What Every Borrower Should Know',
    description:
      'Understand the crucial difference between APR and nominal interest rate, why lenders advertise both, and how to use our APR calculator to compare loan offers fairly.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'apr-calculator',
  },
  {
    slug: 'investment-calculator-for-retirement',
    slugs: {
      en: 'investment-calculator-for-retirement',
      es: 'calculadora-inversiones-para-jubilacion',
      fr: 'calculatrice-investissement-pour-retraite',
      de: 'investmentrechner-fuer-altersvorsorge'
    },
    title: 'Using the Investment Calculator for Retirement Planning',
    description:
      'A complete guide to projecting long-term portfolio growth using the investment calculator — covering contribution amounts, expected returns, compounding frequency, and inflation adjustment.',
    category: 'Finance',
    readingTime: 9,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'investment-calculator',
  },
  {
    slug: 'debt-to-income-ratio-guide',
    slugs: {
      en: 'debt-to-income-ratio-guide',
      es: 'guia-relacion-deuda-ingreso',
      fr: 'guide-ratio-endettement',
      de: 'schulden-einkommens-verhaeltnis-ratgeber'
    },
    title: 'Debt-to-Income Ratio: What It Is and How to Improve It',
    description:
      'Learn what debt-to-income ratio (DTI) means for mortgage approval and personal finance health, how lenders evaluate it, and actionable ways to reduce yours using our DTI calculator.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'debt-to-income-ratio-calculator',
  },
  {
    slug: 'how-to-calculate-auto-loan-payments',
    slugs: {
      en: 'how-to-calculate-auto-loan-payments',
      es: 'como-calcular-pagos-prestamo-auto',
      fr: 'comment-calculer-paiements-pret-auto',
      de: 'autokredit-raten-berechnen'
    },
    title: 'How to Calculate Auto Loan Payments & Total Interest',
    description:
      'A detailed walkthrough of how car loans are structured, the impact of down payments, trade-in values, loan terms (e.g., 48 vs. 72 months), and how to read the amortization schedule.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-06-25',
    relatedCalculator: 'auto-loan-calculator',
  },
  {
    slug: 'salary-and-hourly-wage-guide',
    slugs: {
      en: 'salary-and-hourly-wage-guide',
      es: 'guia-salario-y-salario-por-hora',
      fr: 'guide-salaire-et-taux-horaire',
      de: 'gehalt-und-stundenlohn-ratgeber'
    },
    title: 'Mastering Salary Calculations: Hourly to Annual Conversions',
    description:
      'Explaining the math behind converting hourly wages to annual salaries, factoring in paid time off, working hours, and standard tax implications.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-06-25',
    relatedCalculator: 'salary-calculator',
  },
  {
    slug: 'irr-calculator-guide',
    slugs: {
      en: 'irr-calculator-guide',
      es: 'guia-calculadora-tir',
      fr: 'guide-calculatrice-tri',
      de: 'irr-rechner-ratgeber'
    },
    title: 'Understanding Internal Rate of Return (IRR): A Complete Guide',
    description:
      'Learn what the Internal Rate of Return (IRR) is, how it differs from ROI, and how to calculate it for real estate and corporate finance investments.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'irr-calculator',
  },
  {
    slug: 'fha-loan-calculator-guide',
    slugs: {
      en: 'fha-loan-calculator-guide',
      es: 'guia-calculadora-prestamo-fha',
      fr: 'guide-calculatrice-pret-fha',
      de: 'fha-darlehensrechner-ratgeber'
    },
    title: 'The Ultimate Guide to FHA Loans: Requirements and Calculations',
    description:
      'Learn how FHA loans work, who qualifies for the 3.5% down payment, and how to accurately calculate your monthly mortgage payments including MIP.',
    category: 'Finance',
    readingTime: 7,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'fha-loan-calculator',
  },
  {
    slug: 'roth-ira-calculator-guide',
    slugs: {
      en: 'roth-ira-calculator-guide',
      es: 'guia-calculadora-roth-ira',
      fr: 'guide-calculatrice-roth-ira',
      de: 'roth-ira-rechner-ratgeber'
    },
    title: 'The Ultimate Guide to Roth IRAs: How to Maximize Tax-Free Growth',
    description:
      'Learn what a Roth IRA is, the benefits of tax-free retirement income, contribution limits, and how to use our Roth IRA Calculator to plan your future.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'roth-ira-calculator',
  },
  {
    slug: 'retirement-calculator-guide',
    slugs: {
      en: 'retirement-calculator-guide',
      es: 'guia-calculadora-jubilacion',
      fr: 'guide-calculatrice-retraite',
      de: 'ruhestandsrechner-ratgeber'
    },
    title: 'Retirement Planning 101: How Much Do You Really Need?',
    description:
      'Discover how to calculate your retirement nest egg, understand the 4% rule, and use our Retirement Calculator to see if you are on track.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'retirement-calculator',
  },
  {
    slug: 'income-tax-calculator-guide',
    slugs: {
      en: 'income-tax-calculator-guide',
      es: 'guia-calculadora-impuesto-renta',
      fr: 'guide-calculatrice-impot-revenu',
      de: 'einkommensteuer-rechner-ratgeber'
    },
    title: 'Understanding Income Tax Brackets: Marginal vs. Effective Rates',
    description:
      'Demystify how income taxes work, learn the difference between marginal and effective tax rates, and use our Income Tax Calculator to estimate your take-home pay.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'income-tax-calculator',
  },
  {
    slug: 'margin-calculator-guide',
    slugs: {
      en: 'margin-calculator-guide',
      es: 'guia-calculadora-margen',
      fr: 'guide-calculatrice-marge',
      de: 'margenrechner-ratgeber'
    },
    title: 'Margin vs. Markup: The Ultimate Guide for Retail Pricing',
    description:
      'Learn the crucial difference between profit margin and markup, how to calculate your gross margin, and how to use our Margin Calculator.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'margin-calculator',
  },
  {
    slug: 'lease-calculator-guide',
    slugs: {
      en: 'lease-calculator-guide',
      es: 'guia-calculadora-arrendamiento',
      fr: 'guide-calculatrice-location',
      de: 'leasingrechner-ratgeber'
    },
    title: 'Car Leasing Explained: How to Calculate Your True Monthly Payment',
    description:
      'Demystify car leasing formulas, understand money factors, residual values, and capital reduction, and use our Lease Calculator to get the best deal.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'lease-calculator',
  },
  {
    slug: 'real-estate-calculator-guide',
    slugs: {
      en: 'real-estate-calculator-guide',
      es: 'guia-calculadora-bienes-raices',
      fr: 'guide-calculatrice-immobilier',
      de: 'immobilienrechner-ratgeber'
    },
    title: 'Real Estate ROI: How to Analyze an Investment Property',
    description:
      'Learn how to calculate Cash on Cash Return, Cap Rate, and Net Operating Income (NOI), and use our Real Estate Calculator to evaluate deals.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'real-estate-calculator',
  },
  {
    slug: 'sales-tax-calculator-guide',
    slugs: {
      en: 'sales-tax-calculator-guide',
      es: 'guia-calculadora-impuesto-ventas',
      fr: 'guide-calculatrice-taxe-vente',
      de: 'umsatzsteuerrechner-ratgeber'
    },
    title: 'The Ultimate Guide to Calculating Sales Tax',
    description:
      'Learn how sales tax works, the difference between origin-based and destination-based sourcing, and how to use our Sales Tax Calculator.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'sales-tax-calculator',
  },
  {
    slug: 'inflation-calculator-guide',
    slugs: {
      en: 'inflation-calculator-guide',
      es: 'guia-calculadora-inflacion',
      fr: 'guide-calculatrice-inflation',
      de: 'inflationsrechner-ratgeber'
    },
    title: 'Understanding Inflation: How It Steals Your Purchasing Power',
    description:
      'Learn how the Consumer Price Index (CPI) measures inflation, how it affects your savings, and how to use our Inflation Calculator to adjust historical prices.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'inflation-calculator',
  },
  {
    slug: 'finance-calculator-guide',
    slugs: {
      en: 'finance-calculator-guide',
      es: 'guia-calculadora-financiera',
      fr: 'guide-calculatrice-financiere',
      de: 'finanzrechner-ratgeber'
    },
    title: 'The Ultimate Finance Calculator Guide: Master Time Value of Money',
    description:
      'Learn how the Time Value of Money (TVM) works. Discover how to calculate future value, present value, interest rates, and use our all-in-one Finance Calculator.',
    category: 'Finance',
    readingTime: 7,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'finance-calculator',
  },
  {
    slug: 'interest-rate-calculator-guide',
    slugs: {
      en: 'interest-rate-calculator-guide',
      es: 'guia-calculadora-tasas-interes',
      fr: 'guide-calculatrice-taux-interet',
      de: 'zinssatzrechner-ratgeber'
    },
    title: 'Interest Rates Explained: Nominal vs. Effective APR',
    description:
      'Discover how interest rates really work, the hidden cost of compounding frequency, and how to use our Interest Rate Calculator to find your true rate.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'interest-rate-calculator',
  },
  {
    slug: 'interest-calculator-guide',
    slugs: {
      en: 'interest-calculator-guide',
      es: 'guia-calculadora-intereses',
      fr: 'guide-calculatrice-interets',
      de: 'zinsrechner-ratgeber'
    },
    title: 'Simple vs. Compound Interest: A Complete Guide to Growth',
    description:
      'Learn the crucial difference between simple and compound interest, how they affect your loans and savings, and how to use our Interest Calculator.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'interest-calculator',
  },
  {
    slug: 'estate-tax-calculator-guide',
    slugs: {
      en: 'estate-tax-calculator-guide',
      es: 'guia-calculadora-impuesto-patrimonio',
      fr: 'guide-calculatrice-impot-succession',
      de: 'nachlasssteuerrechner-ratgeber'
    },
    title: 'Estate Tax vs. Inheritance Tax: What You Need to Know',
    description:
      'Understand the difference between federal estate tax and state inheritance tax, learn about the lifetime exemption, and use our Estate Tax Calculator.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'estate-tax-calculator',
  },
  {
    slug: 'cash-back-vs-low-interest-calculator-guide',
    slugs: {
      en: 'cash-back-vs-low-interest-calculator-guide',
      es: 'guia-calculadora-reembolso-vs-bajo-interes',
      fr: 'guide-calculatrice-remise-vs-faible-taux',
      de: 'cashback-vs-niedriger-zins-rechner-ratgeber'
    },
    title: 'Cash Back vs. Low Interest: Which Car Deal is Better?',
    description:
      'When buying a car, should you take the cash rebate or the 0% financing? Learn the math behind dealer incentives and use our comparison calculator.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'cash-back-vs-low-interest-calculator',
  },
  {
    slug: 'loan-calculator-guide',
    slugs: {
      en: 'loan-calculator-guide',
      es: 'guia-calculadora-prestamos',
      fr: 'guide-calculatrice-pret',
      de: 'kreditrechner-ratgeber'
    },
    title: 'The Complete Guide to Understanding and Calculating Loans',
    description:
      'Master the mechanics of borrowing money. Learn about principal, interest, amortization, and how to use our free Loan Calculator to find your true monthly payment.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'loan-calculator',
  },
  {
    slug: 'student-loan-calculator-guide',
    slugs: {
      en: 'student-loan-calculator-guide',
      es: 'guia-calculadora-prestamos-estudiantiles',
      fr: 'guide-calculatrice-pret-etudiant',
      de: 'studienkredit-rechner-ratgeber'
    },
    title: 'How to Pay Off Student Loans Faster: A Mathematical Approach',
    description:
      'Learn how student loan interest accrues daily, understand the difference between subsidized and unsubsidized loans, and use our Student Loan Calculator.',
    category: 'Finance',
    readingTime: 7,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'student-loan-calculator',
  },
  {
    slug: 'personal-loan-calculator-guide',
    slugs: {
      en: 'personal-loan-calculator-guide',
      es: 'guia-calculadora-prestamos-personales',
      fr: 'guide-calculatrice-pret-personnel',
      de: 'ratenkredit-rechner-ratgeber'
    },
    title: 'The Ultimate Personal Loan Guide: Unsecured Debt Explained',
    description:
      'Learn the difference between secured and unsecured loans, how credit scores affect your APR, and use our Personal Loan Calculator to plan your consolidation.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'personal-loan-calculator',
  },
  {
    slug: 'business-loan-calculator-guide',
    slugs: {
      en: 'business-loan-calculator-guide',
      es: 'guia-calculadora-prestamos-comerciales',
      fr: 'guide-calculatrice-pret-commercial',
      de: 'firmenkredit-rechner-ratgeber'
    },
    title: 'Business Loan Guide: Financing Your Company\'s Growth',
    description:
      'Understand the true cost of commercial debt, the difference between term loans and lines of credit, and use our Business Loan Calculator to forecast cash flow.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'business-loan-calculator',
  },
  {
    slug: 'payment-calculator-guide',
    slugs: {
      en: 'payment-calculator-guide',
      es: 'guia-calculadora-pagos',
      fr: 'guide-calculatrice-paiement',
      de: 'ratenrechner-ratgeber'
    },
    title: 'The Universal Payment Guide: Calculate Any Monthly Installment',
    description:
      'Learn the universal mathematical formula for calculating monthly payments on amortized loans, and use our Payment Calculator to test any debt scenario.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'payment-calculator',
  },
  {
    slug: 'rent-calculator-guide',
    slugs: {
      en: 'rent-calculator-guide',
      es: 'guia-calculadora-alquiler',
      fr: 'guide-calculatrice-loyer',
      de: 'mietrechner-ratgeber'
    },
    title: 'How Much Rent Can I Afford? The 30% Rule Explained',
    description:
      'Learn how to calculate an affordable rent budget using the 30% rule, the 50/30/20 budget, and use our free Rent Calculator to find your maximum monthly payment.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'rent-calculator',
  },
  {
    slug: 'canadian-mortgage-calculator-guide',
    slugs: {
      en: 'canadian-mortgage-calculator-guide',
      es: 'guia-calculadora-hipotecas-canadiense',
      fr: 'guide-calculatrice-hypotheque-canadienne',
      de: 'kanadischer-hypothekenrechner-ratgeber'
    },
    title: 'Canadian Mortgages vs. US Mortgages: The Crucial Differences',
    description:
      'Understand the unique rules of Canadian mortgages, including semi-annual compounding and the 5-year renewal cycle, and use our Canadian Mortgage Calculator.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'canadian-mortgage-calculator',
  },
  {
    slug: 'credit-cards-payoff-guide',
    slugs: {
      en: 'credit-cards-payoff-guide',
      es: 'guia-calculadora-pago-tarjetas-credito',
      fr: 'guide-calculatrice-remboursement-carte-credit',
      de: 'kreditkarten-tilgungsrechner-ratgeber'
    },
    title: 'The Snowball vs. Avalanche Method: How to Pay Off Credit Cards',
    description:
      'Learn the two most effective strategies for eliminating high-interest credit card debt and use our Credit Card Payoff Calculator to build your escape plan.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'credit-cards-payoff',
  },
  {
    slug: 'budget-calculator-guide',
    slugs: {
      en: 'budget-calculator-guide',
      es: 'guia-calculadora-presupuesto',
      fr: 'guide-calculatrice-budget',
      de: 'budgetrechner-ratgeber'
    },
    title: 'The Ultimate Guide to Personal Budgeting: 50/30/20 Explained',
    description:
      'Take control of your finances by understanding the 50/30/20 budget rule, zero-based budgeting, and use our free Budget Calculator to track your expenses.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'budget-calculator',
  },
  {
    slug: 'social-security-calculator-guide',
    slugs: {
      en: 'social-security-calculator-guide',
      es: 'guia-calculadora-seguro-social',
      fr: 'guide-calculatrice-securite-sociale',
      de: 'sozialversicherungs-rechner-ratgeber'
    },
    title: 'When Should I Take Social Security? Maximizing Your Benefits',
    description:
      'Learn how your Full Retirement Age (FRA) affects your Social Security payout, the penalties of retiring early, and use our Social Security Calculator.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'social-security-calculator',
  },
];

// ─── HEALTH GUIDES ────────────────────────────────────────────────────
const healthGuides: Guide[] = [
  {
    slug: 'how-to-calculate-bmi',
    slugs: {
      en: 'how-to-calculate-bmi',
      es: 'como-calcular-imc',
      fr: 'comment-calculer-imc',
      de: 'bmi-berechnen'
    },
    title: 'How to Calculate Your BMI and What It Means',
    description:
      'A complete guide to Body Mass Index: the standard formula (metric and imperial), what each BMI range means clinically, and the limitations of BMI as a sole health indicator.',
    category: 'Health',
    readingTime: 5,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'bmi-calculator',
    featured: true,
  },
  {
    slug: 'understanding-bmr-calorie-needs',
    slugs: {
      en: 'understanding-bmr-calorie-needs',
      es: 'entender-necesidades-caloricas-tmb',
      fr: 'comprendre-besoins-caloriques-mb',
      de: 'grundumsatz-kalorienbedarf-verstehen'
    },
    title: 'Understanding Calorie Needs: Using the BMR Calculator',
    description:
      'Basal Metabolic Rate explained: what it is, the Mifflin-St Jeor and Harris-Benedict formulas, how activity multipliers work, and how to calculate your Total Daily Energy Expenditure (TDEE).',
    category: 'Health',
    readingTime: 6,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'bmr-calculator',
  },
  {
    slug: 'body-fat-percentage-tracking-guide',
    slugs: {
      en: 'body-fat-percentage-tracking-guide',
      es: 'guia-seguimiento-porcentaje-grasa-corporal',
      fr: 'guide-suivi-pourcentage-graisse-corporelle',
      de: 'koerperfettanteil-verfolgen-ratgeber'
    },
    title: 'How to Track Body Fat Percentage Over Time',
    description:
      'Understand body fat percentage measurement methods (Navy Method, skinfold calipers, DEXA), healthy ranges by age and sex, and how to interpret results from our body fat calculator.',
    category: 'Health',
    readingTime: 7,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'body-fat-calculator',
  },
  {
    slug: 'pregnancy-due-date-calculator-guide',
    slugs: {
      en: 'pregnancy-due-date-calculator-guide',
      es: 'guia-calculadora-fecha-parto-embarazo',
      fr: 'guide-calculatrice-date-accouchement-grossesse',
      de: 'schwangerschafts-entbindungstermin-ratgeber'
    },
    title: 'Using the Pregnancy Calculator: Due Date & Milestones',
    description:
      'How due date calculation works using Naegele\'s Rule and LMP (Last Menstrual Period), what each trimester involves, and how to use our pregnancy calculator to track key milestones.',
    category: 'Health',
    readingTime: 5,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'pregnancy-calculator',
  },
  {
    slug: 'macro-calculator-guide',
    slugs: {
      en: 'macro-calculator-guide',
      es: 'guia-calculadora-macros',
      fr: 'guide-calculatrice-macros',
      de: 'makro-rechner-ratgeber'
    },
    title: 'Macro Calculator Guide: Protein, Carbs & Fat Explained',
    description:
      'A comprehensive guide to calculating and balancing macronutrients for your fitness goal — whether fat loss, muscle gain, or maintenance — using our macro calculator.',
    category: 'Health',
    readingTime: 8,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'macro-calculator',
  },
  {
    slug: 'ideal-weight-ranges-guide',
    slugs: {
      en: 'ideal-weight-ranges-guide',
      es: 'guia-rangos-peso-ideal',
      fr: 'guide-plages-poids-ideal',
      de: 'idealgewicht-bereiche-ratgeber'
    },
    title: 'Ideal Weight Ranges by Height and Frame Size',
    description:
      'Explore the major ideal body weight formulas (Hamwi, Devine, Robinson, Miller), how frame size factors in, and how to use our ideal weight calculator for a realistic, personalized estimate.',
    category: 'Health',
    readingTime: 6,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'ideal-weight-calculator',
  },
  {
    slug: 'daily-caloric-needs-guide',
    slugs: {
      en: 'daily-caloric-needs-guide',
      es: 'guia-necesidades-caloricas-diarias',
      fr: 'guide-besoins-caloriques-quotidiens',
      de: 'taeglicher-kalorienbedarf-ratgeber'
    },
    title: 'Understanding Your Daily Caloric Needs for Weight Management',
    description:
      'How to determine caloric requirements based on TDEE (Total Daily Energy Expenditure), and adjusting intake for weight loss, maintenance, or muscle gain.',
    category: 'Health',
    readingTime: 7,
    lastUpdated: '2026-06-25',
    relatedCalculator: 'calorie-calculator',
  },
  {
    slug: 'pregnancy-conception-calculator-guide',
    slugs: {
      en: 'pregnancy-conception-calculator-guide',
      es: 'guia-calculadora-concepcion-embarazo',
      fr: 'guide-calculatrice-conception-grossesse',
      de: 'schwangerschafts-empfaengnis-rechner-ratgeber'
    },
    title: 'How to Calculate Conception Date and Track Your Pregnancy',
    description:
      'Learn how doctors estimate your conception date, the biology of the ovulation window, and how to use our Pregnancy Conception Calculator.',
    category: 'Health',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'pregnancy-conception-calculator',
  },
  {
    slug: 'due-date-calculator-guide',
    slugs: {
      en: 'due-date-calculator-guide',
      es: 'guia-calculadora-fecha-parto',
      fr: 'guide-calculatrice-date-accouchement',
      de: 'geburtsterminrechner-ratgeber'
    },
    title: 'Due Date Math: How to Calculate When Your Baby Will Arrive',
    description:
      'Learn how the standard Naegele\'s Rule calculates your due date, how IVF and ultrasounds change the math, and how to use our Due Date Calculator.',
    category: 'Health',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'due-date-calculator',
  },
  {
    slug: 'ovulation-calculator-guide',
    slugs: {
      en: 'ovulation-calculator-guide',
      es: 'guia-calculadora-ovulacion',
      fr: 'guide-calculatrice-ovulation',
      de: 'eisprungrechner-ratgeber'
    },
    title: 'The Ultimate Guide to Tracking Your Ovulation Cycle',
    description:
      'Learn how to calculate your fertile window, understand the signs of ovulation, and use our free Ovulation Calculator to maximize your chances of conception.',
    category: 'Health',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ovulation-calculator',
  },
  {
    slug: 'pace-calculator-guide',
    slugs: {
      en: 'pace-calculator-guide',
      es: 'guia-calculadora-ritmo',
      fr: 'guide-calculatrice-allure',
      de: 'pace-rechner-ratgeber'
    },
    title: 'How to Calculate Running Pace: The Math Behind Your Marathon',
    description:
      'Learn the formula for calculating running pace, how to convert between miles and kilometers, and how to use our Pace Calculator to crush your next race.',
    category: 'Health',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'pace-calculator',
  },
];

// ─── MATH & SCIENCE GUIDES ────────────────────────────────────────────
const mathGuides: Guide[] = [
  {
    slug: 'percentage-calculator-guide',
    slugs: {
      en: 'percentage-calculator-guide',
      es: 'guia-calculadora-porcentajes',
      fr: 'guide-calculatrice-pourcentages',
      de: 'prozentrechner-ratgeber'
    },
    title: 'How to Use the Percentage Calculator for Everyday Problems',
    description:
      'Master all three percentage problem types — finding a percentage, finding what percentage one number is of another, and finding a number given a percentage — with real-world examples.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'percentage-calculator',
    featured: true,
  },
  {
    slug: 'standard-deviation-guide',
    slugs: {
      en: 'standard-deviation-guide',
      es: 'guia-desviacion-estandar',
      fr: 'guide-ecart-type',
      de: 'standardabweichung-ratgeber'
    },
    title: 'Understanding Standard Deviation with Examples',
    description:
      'A clear explanation of standard deviation and variance: the difference between population and sample formulas, what σ tells you about data spread, and how to read output from our statistics calculator.',
    category: 'Math & Science',
    readingTime: 7,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'standard-deviation-calculator',
  },
  {
    slug: 'unit-conversion-guide',
    slugs: {
      en: 'unit-conversion-guide',
      es: 'guia-conversion-unidades',
      fr: 'guide-conversion-unites',
      de: 'einheitenumrechnung-ratgeber'
    },
    title: 'How to Convert Units: A Complete Conversion Guide',
    description:
      'A comprehensive reference for converting length, weight, volume, temperature, speed, and area units between metric and imperial systems using our conversion calculator.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'conversion-calculator',
  },
  {
    slug: 'scientific-notation-guide',
    slugs: {
      en: 'scientific-notation-guide',
      es: 'guia-notacion-cientifica',
      fr: 'guide-notation-scientifique',
      de: 'wissenschaftliche-schreibweise-ratgeber'
    },
    title: 'Scientific Notation Made Simple: Format & Calculate',
    description:
      'Learn how to read and write numbers in scientific notation, perform arithmetic operations (×, ÷, +, −), convert between standard and scientific form, and avoid common mistakes.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'scientific-notation-calculator',
  },
  {
    slug: 'how-to-use-triangle-calculator',
    slugs: {
      en: 'how-to-use-triangle-calculator',
      es: 'como-usar-calculadora-triangulos',
      fr: 'comment-utiliser-calculatrice-triangles',
      de: 'dreiecksrechner-anleitung'
    },
    title: 'How to Use the Triangle Calculator for Geometry & Trigonometry',
    description:
      'A guide on calculating sides, angles, and area of triangles using the Pythagorean theorem, the Law of Sines, and the Law of Cosines.',
    category: 'Math & Science',
    readingTime: 6,
    lastUpdated: '2026-06-25',
    relatedCalculator: 'triangle-calculator',
  },
  {
    slug: 'half-life-calculator-explained',
    slugs: {
      en: 'half-life-calculator-explained',
      es: 'calculadora-vida-media-explicada',
      fr: 'calculatrice-demi-vie-expliquee',
      de: 'halbwertszeit-rechner-erklaert'
    },
    title: 'How the Half-Life Calculator Works (Radioactive Decay)',
    description:
      'A complete guide to radioactive half-life: the exponential decay formula, how to find remaining quantity or elapsed time, real-world examples in nuclear medicine and archaeology.',
    category: 'Math & Science',
    readingTime: 6,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'half-life-calculator',
  },
  {
    slug: 'triangle-calculator-guide',
    slugs: {
      en: 'triangle-calculator-guide',
      es: 'guia-calculadora-triangulos',
      fr: 'guide-calculatrice-triangles',
      de: 'dreiecksrechner-ratgeber'
    },
    title: 'Triangle Calculator Guide: Sides, Angles & Area',
    description:
      'A thorough reference for solving any triangle — right, acute, or obtuse — using trigonometric laws (Law of Sines, Law of Cosines), the Pythagorean theorem, and Heron\'s formula for area.',
    category: 'Math & Science',
    readingTime: 7,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'triangle-calculator',
  },
  {
    slug: 'z-score-calculator-guide',
    slugs: {
      en: 'z-score-calculator-guide',
      es: 'guia-calculadora-z-score',
      fr: 'guide-calculatrice-score-z',
      de: 'z-wert-rechner-ratgeber'
    },
    title: 'How to Calculate and Interpret Z-Scores in Statistics',
    description:
      'Learn what a Z-score tells you about a data point, how to calculate it using the standard deviation, and how to use our Z-Score Calculator.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'z-score-calculator',
  },
  {
    slug: 't-test-calculator-guide',
    slugs: {
      en: 't-test-calculator-guide',
      es: 'guia-calculadora-prueba-t',
      fr: 'guide-calculatrice-test-t',
      de: 't-test-rechner-ratgeber'
    },
    title: 'Understanding the T-Test: Independent vs. Paired Samples',
    description:
      'Learn how to use a Student\'s T-Test to determine if there is a statistically significant difference between the means of two groups.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 't-test-calculator',
  },
  {
    slug: 'probability-calculator-guide',
    slugs: {
      en: 'probability-calculator-guide',
      es: 'guia-calculadora-probabilidad',
      fr: 'guide-calculatrice-probabilite',
      de: 'wahrscheinlichkeitsrechner-ratgeber'
    },
    title: 'The Ultimate Guide to Probability: Formulas, Events, and Rules',
    description:
      'Learn how to calculate the probability of single and multiple events, understand the rules of probability, and use our Probability Calculator.',
    category: 'Math & Science',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'probability-calculator',
  },
  {
    slug: 'variance-calculator-guide',
    slugs: {
      en: 'variance-calculator-guide',
      es: 'guia-calculadora-varianza',
      fr: 'guide-calculatrice-variance',
      de: 'varianz-rechner-ratgeber'
    },
    title: 'Understanding Variance: Population vs. Sample Formulas Explained',
    description:
      'Learn what variance tells you about a dataset, how to calculate population and sample variance, and how to use our Variance Calculator.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'variance-calculator',
  },
  {
    slug: 'mean-calculator-guide',
    slugs: {
      en: 'mean-calculator-guide',
      es: 'guia-calculadora-media',
      fr: 'guide-calculatrice-moyenne',
      de: 'mittelwert-rechner-ratgeber'
    },
    title: 'How to Find the Mean: Arithmetic, Geometric, and Harmonic',
    description:
      'Discover the different types of means (averages) used in statistics, when to use them, and how to use our Mean Calculator.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'mean-calculator',
  },
  {
    slug: 'gpa-calculator-guide',
    slugs: {
      en: 'gpa-calculator-guide',
      es: 'guia-calculadora-gpa',
      fr: 'guide-calculatrice-gpa',
      de: 'gpa-rechner-ratgeber'
    },
    title: 'The Ultimate Guide to Calculating Your GPA',
    description:
      'Learn how the GPA system works, the difference between weighted and unweighted GPAs, and how to use our GPA Calculator to plan your academic success.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'gpa-calculator',
  },
  {
    slug: 'scientific-calculator-guide',
    slugs: {
      en: 'scientific-calculator-guide',
      es: 'guia-calculadora-cientifica',
      fr: 'guide-calculatrice-scientifique',
      de: 'wissenschaftlicher-rechner-ratgeber'
    },
    title: 'How to Master the Scientific Calculator: Functions & Shortcuts',
    description:
      'A comprehensive manual on using a scientific calculator, including trigonometry, logarithms, exponential functions, and keyboard shortcuts.',
    category: 'Math & Science',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'scientific-calculator',
  },
  {
    slug: 'median-calculator-guide',
    slugs: {
      en: 'median-calculator-guide',
      es: 'guia-calculadora-mediana',
      fr: 'guide-calculatrice-mediane',
      de: 'median-rechner-ratgeber'
    },
    title: 'How to Find the Median: A Comprehensive Guide to Averages',
    description:
      'Learn what the median is in statistics, how to find it for odd and even datasets, why it\'s better than the mean for skewed data, and use our Calculator.',
    category: 'Math & Science',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'median-calculator',
  },
  {
    slug: 'mode-calculator-guide',
    slugs: {
      en: 'mode-calculator-guide',
      es: 'guia-calculadora-moda',
      fr: 'guide-calculatrice-mode',
      de: 'modus-rechner-ratgeber'
    },
    title: 'Understanding the Mode in Statistics: Definition and Examples',
    description:
      'Discover how to find the mode in a dataset, understand bimodal and multimodal distributions, and see why the mode is essential for categorical data.',
    category: 'Math & Science',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'mode-calculator',
  },
  {
    slug: 'statistics-calculator-guide',
    slugs: {
      en: 'statistics-calculator-guide',
      es: 'guia-calculadora-estadistica',
      fr: 'guide-calculatrice-statistique',
      de: 'statistikrechner-ratgeber'
    },
    title: 'Descriptive Statistics Explained: How to Analyze Any Dataset',
    description:
      'A complete guide to descriptive statistics. Learn how to calculate mean, median, mode, variance, and standard deviation using our comprehensive Statistics Calculator.',
    category: 'Math & Science',
    readingTime: 7,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'statistics-calculator',
  },
  {
    slug: 'fraction-calculator-guide',
    slugs: {
      en: 'fraction-calculator-guide',
      es: 'guia-calculadora-fracciones',
      fr: 'guide-calculatrice-fractions',
      de: 'bruchrechner-ratgeber'
    },
    title: 'The Complete Guide to Fractions: Adding, Subtracting, Multiplying & Dividing',
    description:
      'Master the rules of fractions. Learn how to find common denominators, simplify fractions, and use our Fraction Calculator to solve complex math problems.',
    category: 'Math & Science',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'fraction-calculator',
  },
  {
    slug: 'percent-error-calculator-guide',
    slugs: {
      en: 'percent-error-calculator-guide',
      es: 'guia-calculadora-error-porcentual',
      fr: 'guide-calculatrice-pourcentage-erreur',
      de: 'prozentfehler-rechner-ratgeber'
    },
    title: 'How to Calculate Percent Error: Formula, Steps, and Examples',
    description:
      'Learn what percent error means in science and statistics, how to calculate it using the absolute value formula, and how to use our Percent Error Calculator.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'percent-error-calculator',
  },
];

// ─── PRIVACY & SECURITY GUIDES ────────────────────────────────────────
const privacyGuides: Guide[] = [
  {
    slug: 'what-is-pii-scanning',
    slugs: {
      en: 'what-is-pii-scanning',
      es: 'que-es-el-escaneo-pii',
      fr: 'quest-ce-que-le-scan-pii',
      de: 'was-ist-pii-scanning',
    },
    title: 'What Is PII Scanning? A Complete Guide to Detecting Sensitive Data',
    description:
      'Learn how PII scanning works, what types of personally identifiable information databases contain, and how automated detection tools protect you from data breaches and compliance failures.',
    category: 'Privacy & Security',
    readingTime: 7,
    lastUpdated: '2026-08-08',
    relatedCalculator: 'database-privacy',
    featured: true,
  },
  {
    slug: 'gdpr-database-compliance',
    slugs: {
      en: 'gdpr-database-compliance',
      es: 'cumplimiento-gdpr-base-datos',
      fr: 'conformite-rgpd-base-de-donnees',
      de: 'dsgvo-datenbankkonformitaet',
    },
    title: 'GDPR Database Compliance: A Technical Guide for Developers',
    description:
      'A practical technical guide to GDPR Articles 25 and 32 — covering data minimisation, encryption, pseudonymisation, and audit logging requirements for databases.',
    category: 'Privacy & Security',
    readingTime: 9,
    lastUpdated: '2026-08-08',
    relatedCalculator: 'database-privacy',
  },
  {
    slug: 'data-masking-techniques',
    slugs: {
      en: 'data-masking-techniques',
      es: 'tecnicas-enmascaramiento-datos',
      fr: 'techniques-masquage-donnees',
      de: 'datenmaskierungstechniken',
    },
    title: 'Data Masking Techniques: Hashing, Tokenization, Redaction & More',
    description:
      'Compare the most effective data masking techniques — including hashing, tokenization, redaction, pseudonymisation, and format-preserving encryption — with real-world use cases.',
    category: 'Privacy & Security',
    readingTime: 8,
    lastUpdated: '2026-08-08',
    relatedCalculator: 'database-privacy',
  },
  {
    slug: 'hipaa-data-de-identification',
    slugs: {
      en: 'hipaa-data-de-identification',
      es: 'desidentificacion-datos-hipaa',
      fr: 'de-identification-donnees-hipaa',
      de: 'hipaa-datenanonymisierung',
    },
    title: 'HIPAA Data De-Identification: Safe Harbor vs Expert Determination',
    description:
      'Understand HIPAA de-identification requirements under 45 CFR §164.514 — comparing the Safe Harbor and Expert Determination methods with guidance on which 18 identifiers must be removed.',
    category: 'Privacy & Security',
    readingTime: 8,
    lastUpdated: '2026-08-08',
    relatedCalculator: 'database-privacy',
  },
  {
    slug: 'pci-dss-pan-masking',
    slugs: {
      en: 'pci-dss-pan-masking',
      es: 'enmascaramiento-pan-pci-dss',
      fr: 'masquage-pan-pci-dss',
      de: 'pci-dss-pan-maskierung',
    },
    title: 'PCI DSS PAN Masking: Protecting Cardholder Data in Databases',
    description:
      'A technical guide to PCI DSS Requirement 3 — how to mask, truncate, and tokenize Primary Account Numbers (PAN) to protect cardholder data and avoid costly non-compliance penalties.',
    category: 'Privacy & Security',
    readingTime: 7,
    lastUpdated: '2026-08-08',
    relatedCalculator: 'database-privacy',
  },
  {
    slug: 'database-anonymizer-guide',
    slugs: {
      en: 'database-anonymizer-guide',
      es: 'guia-anonimizador-base-datos',
      fr: 'guide-anonymiseur-base-donnees',
      de: 'datenbank-anonymisierer-ratgeber',
    },
    title: 'How to Anonymize Database Dumps for Testing: A Developer\'s Guide',
    description:
      'Learn why data anonymization is critical for development environments, common masking techniques, and how to use our Database Anonymizer tool securely.',
    category: 'Privacy & Security',
    readingTime: 7,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'database-anonymizer',
    relatedType: 'tool',
  },
];

// ─── DESIGN & MEDIA GUIDES ─────────────────────────────────────────────
const designMediaGuides: Guide[] = [
  {
    slug: 'ai-image-upscaler-guide',
    slugs: {
      en: 'ai-image-upscaler-guide',
      es: 'guia-escalador-imagenes-ia',
      fr: 'guide-agrandisseur-image-ia',
      de: 'ki-bild-upscaler-ratgeber',
    },
    title: 'How to Upscale Images Without Losing Quality',
    description:
      'Learn how AI image upscaling works, the difference between traditional resizing and AI, and how to get the best results for print and web.',
    category: 'Design & Media',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ai-image-upscaler',
    relatedType: 'tool',
    featured: true,
  },
  {
    slug: 'qr-code-studio-guide',
    slugs: {
      en: 'qr-code-studio-guide',
      es: 'guia-estudio-codigo-qr',
      fr: 'guide-studio-code-qr',
      de: 'qr-code-studio-ratgeber',
    },
    title: 'QR Code Best Practices: Scannability, Formats, and Error Correction',
    description:
      'Learn how to generate perfect QR codes for print and web, including error correction levels, color contrast, and choosing between SVG and PNG.',
    category: 'Design & Media',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'qr-code-studio',
    relatedType: 'tool',
  },
  {
    slug: 'heic-to-jpg-guide',
    slugs: {
      en: 'heic-to-jpg-guide',
      es: 'guia-heic-a-jpg',
      fr: 'guide-heic-vers-jpg',
      de: 'heic-zu-jpg-ratgeber',
    },
    title: 'HEIC vs JPG: Why iPhones Use HEIC and How to Convert Them',
    description:
      'Understand the difference between HEIC and JPG formats, why Apple switched to HEIC, and how to convert your photos for maximum compatibility.',
    category: 'Design & Media',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'heic-to-jpg',
    relatedType: 'tool',
  },
];

// ─── PRODUCTIVITY & UTILITIES GUIDES ───────────────────────────────────
const productivityUtilitiesGuides: Guide[] = [
  {
    slug: 'sql-formatter-guide',
    slugs: {
      en: 'sql-formatter-guide',
      es: 'guia-formateador-sql',
      fr: 'guide-formateur-sql',
      de: 'sql-formatierer-ratgeber',
    },
    title: 'SQL Formatting Best Practices: Writing Clean & Readable Queries',
    description:
      'Learn why SQL formatting matters, standard indentation rules, and how to use our SQL Formatter to keep your team\'s queries consistent.',
    category: 'Productivity & Utilities',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'sql-formatter',
    relatedType: 'tool',
  },
  {
    slug: 'date-calculator-guide',
    slugs: {
      en: 'date-calculator-guide',
      es: 'guia-calculadora-fechas',
      fr: 'guide-calculatrice-dates',
      de: 'datumsrechner-ratgeber'
    },
    title: 'The Ultimate Date Calculator Guide: Add, Subtract, and Measure Time',
    description:
      'Learn how to calculate exact durations between two dates, add or subtract business days, and use our free Date Calculator to plan your schedule perfectly.',
    category: 'Productivity & Utilities',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'date-calculator',
  },
  {
    slug: 'time-calculator-guide',
    slugs: {
      en: 'time-calculator-guide',
      es: 'guia-calculadora-tiempo',
      fr: 'guide-calculatrice-temps',
      de: 'zeitrechner-ratgeber'
    },
    title: 'How to Add and Subtract Time: The Ultimate Guide',
    description:
      'Master base-60 mathematics. Learn how to accurately add hours and minutes, calculate payroll timesheets, and use our free Time Calculator.',
    category: 'Productivity & Utilities',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'time-calculator',
  },
  {
    slug: 'age-calculator-guide',
    slugs: {
      en: 'age-calculator-guide',
      es: 'guia-calculadora-edad',
      fr: 'guide-calculatrice-age',
      de: 'alter-rechner-ratgeber'
    },
    title: 'The Mathematical Formula for Age: How to Calculate Exact Age',
    description:
      'Discover how age is calculated differently across cultures, the leap year age dilemma, and how to use our Age Calculator to find your age in days or seconds.',
    category: 'Productivity & Utilities',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'age-calculator',
  },
  {
    slug: 'pdf-to-excel-guide',
    slugs: {
      en: 'pdf-to-excel-guide',
      es: 'guia-pdf-a-excel',
      fr: 'guide-pdf-vers-excel',
      de: 'pdf-zu-excel-ratgeber',
    },
    title: 'How to Convert PDF to Excel Without Losing Formatting',
    description:
      'Learn how to accurately extract tables from PDF documents into Excel spreadsheets, maintaining rows, columns, and data privacy.',
    category: 'Productivity & Utilities',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'pdf-to-excel',
    relatedType: 'tool',
    featured: true,
  },
  {
    slug: 'jwt-decoder-guide',
    slugs: {
      en: 'jwt-decoder-guide',
      es: 'guia-decodificador-jwt',
      fr: 'guide-decodeur-jwt',
      de: 'jwt-decoder-ratgeber',
    },
    title: 'Understanding JWT (JSON Web Tokens): A Complete Guide',
    description:
      'Learn how JWTs are structured, how to decode them safely, and why you should never store sensitive data in the payload.',
    category: 'Productivity & Utilities',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'jwt-decoder',
    relatedType: 'tool',
  },
  {
    slug: 'pdf-ocr-guide',
    slugs: {
      en: 'pdf-ocr-guide',
      es: 'guia-ocr-pdf',
      fr: 'guide-ocr-pdf',
      de: 'pdf-ocr-ratgeber',
    },
    title: 'How to Use PDF OCR: Extract Text from Scanned Documents',
    description:
      'Learn how Optical Character Recognition (OCR) works, how to extract text from scanned PDFs, and why browser-based OCR is better for privacy.',
    category: 'Productivity & Utilities',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'pdf-ocr',
    relatedType: 'tool',
    featured: true,
  },
];

// ─── EXPORTED REGISTRY ────────────────────────────────────────────────

/** All guides in display order */
export const allGuides: Guide[] = [
  ...financeGuides,
  ...healthGuides,
  ...mathGuides,
  ...privacyGuides,
  ...designMediaGuides,
  ...productivityUtilitiesGuides,
];

/** Guides grouped by category for sidebar rendering */
export const guidesByCategory: Record<GuideCategory, Guide[]> = {
  Finance: financeGuides,
  Health: healthGuides,
  'Math & Science': mathGuides,
  'Privacy & Security': privacyGuides,
  'Design & Media': designMediaGuides,
  'Productivity & Utilities': productivityUtilitiesGuides,
};

/** Featured guides for the hero/landing section */
export const featuredGuides: Guide[] = allGuides.filter((g) => g.featured);

/** Get a single guide by slug (checks both main slug and localized slugs). Returns undefined if not found. */
export function getGuideBySlug(slug: string): Guide | undefined {
  return allGuides.find((g) => {
    if (g.slug === slug) return true;
    if (g.slugs) {
      return Object.values(g.slugs).includes(slug);
    }
    return false;
  });
}

/** Get the previous and next guides relative to a given slug (for article navigation) */
export function getAdjacentGuides(slug: string): {
  prev: Guide | null;
  next: Guide | null;
} {
  const index = allGuides.findIndex((g) => {
    if (g.slug === slug) return true;
    if (g.slugs) return Object.values(g.slugs).includes(slug);
    return false;
  });
  return {
    prev: index > 0 ? allGuides[index - 1] : null,
    next: index !== -1 && index < allGuides.length - 1 ? allGuides[index + 1] : null,
  };
}

/** All guide slugs (english only) — usually unused in localized static params generation, but preserved for compatibility */
export const allGuideSlugs: string[] = allGuides.map((g) => g.slug);
