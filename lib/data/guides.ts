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
  {
    slug: 'mortgage-amortization-calculator-guide',
    slugs: {
      en: 'mortgage-amortization-calculator-guide',
      es: 'guia-calculadora-amortizacion-hipoteca',
      fr: 'guide-calculatrice-amortissement-hypothecaire',
      de: 'hypotheken-tilgungsrechner-ratgeber'
    },
    title: 'The Magic of Mortgage Amortization: How to Save $100,000 on Your Home',
    description:
      'Understand how your mortgage payment is split between principal and interest, and learn how to use an amortization schedule to pay off your house years early.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'mortgage-amortization-calculator',
  },
  {
    slug: 'house-affordability-calculator-guide',
    slugs: {
      en: 'house-affordability-calculator-guide',
      es: 'guia-calculadora-asequibilidad-vivienda',
      fr: 'guide-calculatrice-abordabilite-maison',
      de: 'haus-erschwinglichkeitsrechner-ratgeber'
    },
    title: 'How Much House Can I Afford? The 28/36 Rule Explained',
    description:
      'Learn how mortgage lenders evaluate your income, understand the 28/36 DTI rule, and use our House Affordability Calculator to set a safe budget.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'house-affordability-calculator',
  },
  {
    slug: 'rent-vs-buy-calculator-guide',
    slugs: {
      en: 'rent-vs-buy-calculator-guide',
      es: 'guia-calculadora-alquilar-vs-comprar',
      fr: 'guide-calculatrice-louer-vs-acheter',
      de: 'mieten-vs-kaufen-rechner-ratgeber'
    },
    title: 'Rent vs. Buy: The 5% Rule and Unrecoverable Costs',
    description:
      'Stop throwing money away on rent? Not quite. Learn the 5% rule of real estate, understand unrecoverable costs, and use our Rent vs Buy Calculator.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'rent-vs-buy-calculator',
  },
  {
    slug: 'down-payment-calculator-guide',
    slugs: {
      en: 'down-payment-calculator-guide',
      es: 'guia-calculadora-pago-inicial',
      fr: 'guide-calculatrice-mise-de-fonds',
      de: 'anzahlungsrechner-ratgeber'
    },
    title: 'The 20% Myth: How Much Down Payment Do You Really Need?',
    description:
      'Discover the truth about Private Mortgage Insurance (PMI), FHA loans, and use our Down Payment Calculator to find your ideal home buying strategy.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'down-payment-calculator',
  },
  {
    slug: 'va-mortgage-calculator-guide',
    slugs: {
      en: 'va-mortgage-calculator-guide',
      es: 'guia-calculadora-hipoteca-va',
      fr: 'guide-calculatrice-hypotheque-va',
      de: 'va-hypothekenrechner-ratgeber'
    },
    title: 'The Ultimate Guide to VA Loans: Zero Down, Zero PMI',
    description:
      'Learn how the VA Funding Fee works, the benefits of VA entitlements, and use our VA Mortgage Calculator to estimate your monthly payments.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'va-mortgage-calculator',
  },
  {
    slug: '401k-calculator-guide',
    slugs: {
      en: '401k-calculator-guide',
      es: 'guia-calculadora-401k',
      fr: 'guide-calculatrice-401k',
      de: '401k-rechner-ratgeber'
    },
    title: 'The Ultimate 401(k) Guide: How to Retire a Millionaire',
    description:
      'Learn how employer matches work, the massive power of compound interest over decades, and use our 401(k) Calculator to project your retirement wealth.',
    category: 'Finance',
    readingTime: 6,
    lastUpdated: '2026-08-23',
    relatedCalculator: '401k-calculator',
  },
  {
    slug: 'future-value-calculator-guide',
    slugs: {
      en: 'future-value-calculator-guide',
      es: 'guia-calculadora-valor-futuro',
      fr: 'guide-calculatrice-valeur-future',
      de: 'zukunftswert-rechner-ratgeber'
    },
    title: 'Future Value Explained: Predicting the Worth of Your Investments',
    description:
      'Master the time value of money. Learn the math behind compound growth and use our Future Value Calculator to project your financial assets.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'future-value-calculator',
  },
  {
    slug: 'present-value-calculator-guide',
    slugs: {
      en: 'present-value-calculator-guide',
      es: 'guia-calculadora-valor-presente',
      fr: 'guide-calculatrice-valeur-actuelle',
      de: 'barwert-rechner-ratgeber'
    },
    title: 'The Math of Present Value: Are You Making a Good Investment?',
    description:
      'Learn how to discount future cash flows, understand inflation\'s impact on wealth, and use our Present Value Calculator to analyze investments.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'present-value-calculator',
  },
  {
    slug: 'rmd-calculator-guide',
    slugs: {
      en: 'rmd-calculator-guide',
      es: 'guia-calculadora-rmd',
      fr: 'guide-calculatrice-rmd',
      de: 'rmd-rechner-ratgeber'
    },
    title: 'Understanding RMDs: Don\'t Lose 25% of Your Retirement to the IRS',
    description:
      'Learn what Required Minimum Distributions (RMDs) are, the new SECURE Act 2.0 age rules, and use our RMD Calculator to avoid massive IRS penalties.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'rmd-calculator',
  },
  {
    slug: 'annuity-calculator-guide',
    slugs: {
      en: 'annuity-calculator-guide',
      es: 'guia-calculadora-anualidad',
      fr: 'guide-calculatrice-rente',
      de: 'rentenrechner-ratgeber'
    },
    title: 'How Annuities Work: Buying a Guaranteed Monthly Paycheck',
    description:
      'Understand the difference between fixed, variable, and indexed annuities, and use our Annuity Calculator to estimate your guaranteed retirement income.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'annuity-calculator',
  },
  {
    slug: 'debt-consolidation-calculator-guide',
    slugs: {
      en: 'debt-consolidation-calculator-guide',
      es: 'guia-calculadora-consolidacion-deudas',
      fr: 'guide-calculatrice-consolidation-dettes',
      de: 'schuldenkonsolidierungs-rechner-ratgeber'
    },
    title: 'The Truth About Debt Consolidation: How to Lower Your Interest Rates',
    description:
      'Learn how debt consolidation loans work, the dangers of balance transfer cards, and use our Debt Consolidation Calculator to see how much you could save.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'debt-consolidation-calculator',
  },
  {
    slug: 'debt-payoff-calculator-guide',
    slugs: {
      en: 'debt-payoff-calculator-guide',
      es: 'guia-calculadora-pago-deudas',
      fr: 'guide-calculatrice-remboursement-dettes',
      de: 'schuldenabbau-rechner-ratgeber'
    },
    title: 'Debt Snowball vs. Avalanche: The Ultimate Payoff Strategy',
    description:
      'Compare the psychological benefits of the Debt Snowball against the mathematical savings of the Debt Avalanche, and use our Debt Payoff Calculator.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'debt-payoff-calculator',
  },
  {
    slug: 'heloc-calculator-guide',
    slugs: {
      en: 'heloc-calculator-guide',
      es: 'guia-calculadora-heloc',
      fr: 'guide-calculatrice-heloc',
      de: 'heloc-rechner-ratgeber'
    },
    title: 'HELOC Explained: Should You Use Your House as an ATM?',
    description:
      'Understand the risks and rewards of a Home Equity Line of Credit (HELOC), how draw periods work, and use our HELOC Calculator to plan your payments.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'heloc-calculator',
  },
  {
    slug: 'boat-loan-calculator-guide',
    slugs: {
      en: 'boat-loan-calculator-guide',
      es: 'guia-calculadora-prestamo-bote',
      fr: 'guide-calculatrice-pret-bateau',
      de: 'bootskredit-rechner-ratgeber'
    },
    title: 'The Reality of Boat Loans: Depreciation and Hidden Costs',
    description:
      'Before you buy your dream boat, understand marine loan terms, rapid depreciation, and use our Boat Loan Calculator to find your true monthly cost.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'boat-loan-calculator',
  },
  {
    slug: 'simple-interest-calculator-guide',
    slugs: {
      en: 'simple-interest-calculator-guide',
      es: 'guia-calculadora-interes-simple',
      fr: 'guide-calculatrice-interet-simple',
      de: 'einfacher-zinsrechner-ratgeber'
    },
    title: 'Simple vs. Compound Interest: What is the Difference?',
    description:
      'Learn how simple interest differs from compound interest, how auto loans and personal loans are calculated, and use our Simple Interest Calculator.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'simple-interest-calculator',
  },
  {
    slug: 'savings-calculator-guide',
    slugs: {
      en: 'savings-calculator-guide',
      es: 'guia-calculadora-ahorros',
      fr: 'guide-calculatrice-epargne',
      de: 'sparrechner-ratgeber'
    },
    title: 'The Power of Paying Yourself First: A Guide to Savings Goals',
    description:
      'Learn how to build an emergency fund, understand APY, and use our Savings Calculator to project exactly when you will reach your financial goals.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'savings-calculator',
  },
  {
    slug: 'cd-calculator-guide',
    slugs: {
      en: 'cd-calculator-guide',
      es: 'guia-calculadora-cd',
      fr: 'guide-calculatrice-cd',
      de: 'festgeld-rechner-ratgeber'
    },
    title: 'Understanding CDs: How to Lock in High Interest Rates',
    description:
      'Learn what a Certificate of Deposit is, how CD laddering works, and use our CD Calculator to find exactly how much interest you will earn.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'cd-calculator',
  },
  {
    slug: 'rental-property-calculator-guide',
    slugs: {
      en: 'rental-property-calculator-guide',
      es: 'guia-calculadora-propiedad-alquiler',
      fr: 'guide-calculatrice-propriete-locative',
      de: 'mietobjekt-rechner-ratgeber'
    },
    title: 'The Math of Real Estate: How to Analyze a Rental Property',
    description:
      'Learn how to calculate Cash on Cash Return, the 1% Rule, Net Operating Income, and use our Rental Property Calculator to evaluate investments.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'rental-property-calculator',
  },
  {
    slug: 'mortgage-payoff-calculator-guide',
    slugs: {
      en: 'mortgage-payoff-calculator-guide',
      es: 'guia-calculadora-pago-hipoteca',
      fr: 'guide-calculatrice-remboursement-hypothecaire',
      de: 'hypotheken-tilgungsrechner-ratgeber'
    },
    title: 'How to Pay Off Your Mortgage Years Early and Save Thousands',
    description:
      'Discover the secret of extra principal payments, bi-weekly schedules, and use our Mortgage Payoff Calculator to build your debt-free timeline.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'mortgage-payoff-calculator',
  },
  {
    slug: 'depreciation-calculator-guide',
    slugs: {
      en: 'depreciation-calculator-guide',
      es: 'guia-calculadora-depreciacion',
      fr: 'guide-calculatrice-amortissement',
      de: 'abschreibungsrechner-ratgeber'
    },
    title: 'Understanding Depreciation: How Assets Lose Value Over Time',
    description:
      'Learn the difference between straight-line and declining balance depreciation, and use our Depreciation Calculator for your business assets.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'depreciation-calculator',
  },
  {
    slug: 'mutual-fund-calculator-guide',
    slugs: {
      en: 'mutual-fund-calculator-guide',
      es: 'guia-calculadora-fondo-mutuo',
      fr: 'guide-calculatrice-fonds-commun',
      de: 'investmentfonds-rechner-ratgeber'
    },
    title: 'Mutual Funds Explained: How to Build a Diversified Portfolio',
    description:
      'Learn what mutual funds are, how expense ratios eat your profits, and use our Mutual Fund Calculator to project your long-term wealth.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'mutual-fund-calculator',
  },
  {
    slug: 'bond-calculator-guide',
    slugs: {
      en: 'bond-calculator-guide',
      es: 'guia-calculadora-bonos',
      fr: 'guide-calculatrice-obligations',
      de: 'anleihen-rechner-ratgeber'
    },
    title: 'Understanding Bonds: The Foundation of a Safe Portfolio',
    description:
      'Learn the difference between coupon rates and yield to maturity, how bond prices react to interest rates, and use our Bond Calculator.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'bond-calculator',
  },
  {
    slug: 'college-cost-calculator-guide',
    slugs: {
      en: 'college-cost-calculator-guide',
      es: 'guia-calculadora-costo-universidad',
      fr: 'guide-calculatrice-cout-universite',
      de: 'studienkosten-rechner-ratgeber'
    },
    title: 'The True Cost of College: Budgeting for Higher Education',
    description:
      'Understand the hidden costs of college, how inflation affects tuition, and use our College Cost Calculator to plan your savings strategy.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'college-cost-calculator',
  },
  {
    slug: 'average-return-calculator-guide',
    slugs: {
      en: 'average-return-calculator-guide',
      es: 'guia-calculadora-retorno-promedio',
      fr: 'guide-calculatrice-rendement-moyen',
      de: 'durchschnittsrendite-rechner-ratgeber'
    },
    title: 'Average Return Explained: How to Measure Investment Performance',
    description:
      'Learn the difference between arithmetic and geometric average returns, and use our Average Return Calculator to analyze your portfolio.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'average-return-calculator',
  },
  {
    slug: 'vat-calculator-guide',
    slugs: {
      en: 'vat-calculator-guide',
      es: 'guia-calculadora-iva',
      fr: 'guide-calculatrice-tva',
      de: 'mwst-rechner-ratgeber'
    },
    title: 'Understanding VAT: The Global Standard for Sales Tax',
    description:
      'Learn how Value Added Tax (VAT) works, the difference between inclusive and exclusive pricing, and use our VAT Calculator for your business.',
    category: 'Finance',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'vat-calculator',
  },
  {
    slug: 'zakat-calculator-guide',
    slugs: {
      en: 'zakat-calculator-guide',
      es: 'guia-calculadora-zakat',
      fr: 'guide-calculatrice-zakat',
      de: 'zakat-rechner-ratgeber'
    },
    title: 'Zakat Calculator: Understanding Nisab and Wealth',
    description:
      'Learn the fundamentals of Zakat, how to calculate Nisab using the gold and silver standards, and use our free Zakat Calculator for accurate payments.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'zakat-calculator',
  },
  {
    slug: 'currency-calculator-guide',
    slugs: {
      en: 'currency-calculator-guide',
      es: 'guia-calculadora-divisas',
      fr: 'guide-calculatrice-devises',
      de: 'waehrungsrechner-ratgeber'
    },
    title: 'Currency Calculator: Exchange Rates Explained',
    description:
      'Understand how global forex exchange rates are set, what a currency spread is, and how to use our free Currency Calculator for travel or trading.',
    category: 'Finance',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'currency-calculator',
  },
  {
    slug: 'percent-off-calculator-guide',
    slugs: {
      en: 'percent-off-calculator-guide',
      es: 'guia-calculadora-descuentos',
      fr: 'guide-calculatrice-reductions',
      de: 'rabattrechner-ratgeber'
    },
    title: 'Percent Off Calculator: Retail Math Explained',
    description:
      'Learn how to quickly calculate sale discounts in your head, understand double discounts, and use our Percent Off Calculator to save money.',
    category: 'Finance',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'percent-off-calculator',
  },
  {
    slug: 'marriage-tax-calculator-guide',
    slugs: {
      en: 'marriage-tax-calculator-guide',
      es: 'guia-calculadora-impuestos-matrimonio',
      fr: 'guide-calculatrice-impots-mariage',
      de: 'heirats-steuerrechner-ratgeber'
    },
    title: 'Marriage Tax Calculator: Bonus or Penalty?',
    description:
      'Understand the financial impact of getting married. Learn about the Marriage Penalty, the Marriage Bonus, and use our free Marriage Tax Calculator.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'marriage-tax-calculator',
  },
  {
    slug: 'annuity-payout-calculator-guide',
    slugs: {
      en: 'annuity-payout-calculator-guide',
      es: 'guia-calculadora-pago-anualidad',
      fr: 'guide-calculatrice-paiement-rente',
      de: 'renten-auszahlungs-rechner-ratgeber'
    },
    title: 'Annuity Payout Calculator: Securing Your Retirement',
    description:
      'Learn how annuities work, the difference between fixed and variable payouts, and use our free Annuity Payout Calculator for retirement planning.',
    category: 'Finance',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'annuity-payout-calculator',
  },
  {
    slug: 'commission-calculator-guide',
    slugs: {
      en: 'commission-calculator-guide',
      es: 'guia-calculadora-comisiones',
      fr: 'guide-calculatrice-commission',
      de: 'provisionsrechner-ratgeber'
    },
    title: 'Commission Calculator: Track Your Sales Earnings',
    description:
      'Learn how sales commissions are structured, the difference between tiered and flat rates, and use our free Commission Calculator.',
    category: 'Finance',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'commission-calculator',
  },
  {
    slug: 'tip-calculator-guide',
    slugs: {
      en: 'tip-calculator-guide',
      es: 'guia-calculadora-propinas',
      fr: 'guide-calculatrice-pourboire',
      de: 'trinkgeld-rechner-ratgeber'
    },
    title: 'Tip Calculator: How Much Should You Tip?',
    description:
      'Learn the social etiquette of tipping, what percentages are standard for different services, and use our free Tip Calculator to split the bill.',
    category: 'Finance',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'tip-calculator',
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
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'pregnancy-calculator',
  },
  {
    slug: 'height-calculator-guide',
    slugs: {
      en: 'height-calculator-guide',
      es: 'guia-calculadora-de-altura',
      fr: 'guide-calculatrice-taille',
      de: 'groessenrechner-ratgeber'
    },
    title: 'How Tall Will My Child Be? The Science of Height Prediction',
    description:
      'Explore the genetics of human growth, learn the Khamis-Roche method, and use our Height Calculator to predict your child\'s adult height.',
    category: 'Health',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'height-calculator',
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
  {
    slug: 'carbohydrate-calculator-guide',
    slugs: {
      en: 'carbohydrate-calculator-guide',
      es: 'guia-calculadora-carbohidratos',
      fr: 'guide-calculatrice-glucides',
      de: 'kohlenhydrat-rechner-ratgeber'
    },
    title: 'Carbohydrate Calculator: Managing Your Macros',
    description:
      'Learn how to calculate your daily carbohydrate limit for keto, cutting, or bulking. Understand net carbs and use our Carbohydrate Calculator.',
    category: 'Health',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'carbohydrate-calculator',
  },
  {
    slug: 'healthy-weight-calculator-guide',
    slugs: {
      en: 'healthy-weight-calculator-guide',
      es: 'guia-calculadora-peso-saludable',
      fr: 'guide-calculatrice-poids-sante',
      de: 'idealgewicht-rechner-ratgeber'
    },
    title: 'Healthy Weight Calculator: Finding Your Ideal Range',
    description:
      'Understand BMI, body composition, and how to determine a healthy weight range using our free Healthy Weight Calculator.',
    category: 'Health',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'healthy-weight-calculator',
  },
  {
    slug: 'advanced-sleep-cycle-calculator-guide',
    slugs: {
      en: 'advanced-sleep-cycle-calculator-guide',
      es: 'guia-calculadora-ciclos-sueno-avanzado',
      fr: 'guide-calculatrice-cycles-sommeil-avancee',
      de: 'erweiterter-schlafzyklus-rechner-ratgeber'
    },
    title: 'Advanced Sleep Cycle Calculator: Wake Up Refreshed',
    description:
      'Learn how sleep cycles work, why you wake up groggy, and use our Advanced Sleep Cycle Calculator to find the perfect bedtime or wake time.',
    category: 'Health',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'advanced-sleep-cycle-calculator',
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
  {
    slug: 'grade-calculator-guide',
    slugs: {
      en: 'grade-calculator-guide',
      es: 'guia-calculadora-calificaciones',
      fr: 'guide-calculatrice-notes',
      de: 'notenrechner-ratgeber'
    },
    title: 'How to Calculate Your Final Grade: Weighted Averages Explained',
    description:
      'Learn how weighted grading systems work, the math behind GPA calculation, and use our free Grade Calculator to see what you need on your final exam.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'grade-calculator',
  },
  {
    slug: 'volume-calculator-guide',
    slugs: {
      en: 'volume-calculator-guide',
      es: 'guia-calculadora-volumen',
      fr: 'guide-calculatrice-volume',
      de: 'volumenrechner-ratgeber'
    },
    title: 'The Ultimate Guide to Calculating Volume: Formulas for Every Shape',
    description:
      'Master the math of 3D space. Learn the formulas for calculating the volume of cubes, cylinders, cones, and spheres, and use our free Volume Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'volume-calculator',
  },
  {
    slug: 'velocity-calculator-guide',
    slugs: {
      en: 'velocity-calculator-guide',
      es: 'guia-calculadora-velocidad',
      fr: 'guide-calculatrice-velocite',
      de: 'geschwindigkeitsrechner-ratgeber'
    },
    title: 'Understanding Velocity: Speed With a Direction',
    description:
      'Learn the crucial difference between speed and velocity in physics, how to use vector quantities, and calculate displacement with our Velocity Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'velocity-calculator',
  },
  {
    slug: 'acceleration-calculator-guide',
    slugs: {
      en: 'acceleration-calculator-guide',
      es: 'guia-calculadora-aceleracion',
      fr: 'guide-calculatrice-acceleration',
      de: 'beschleunigungsrechner-ratgeber'
    },
    title: 'The Physics of Acceleration: More Than Just Going Fast',
    description:
      'Learn how acceleration actually works, the difference between positive and negative acceleration, and use our free Acceleration Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'acceleration-calculator',
  },
  {
    slug: 'force-calculator-guide',
    slugs: {
      en: 'force-calculator-guide',
      es: 'guia-calculadora-fuerza',
      fr: 'guide-calculatrice-force',
      de: 'kraft-rechner-ratgeber'
    },
    title: 'Newton\'s Second Law: Understanding Force and Mass',
    description:
      'Master Newton\'s Second Law of Motion (F=ma). Learn how mass affects acceleration and use our Force Calculator to solve physics equations.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'force-calculator',
  },
  {
    slug: 'kinetic-energy-calculator-guide',
    slugs: {
      en: 'kinetic-energy-calculator-guide',
      es: 'guia-calculadora-energia-cinetica',
      fr: 'guide-calculatrice-energie-cinetique',
      de: 'kinetische-energie-rechner-ratgeber'
    },
    title: 'The Energy of Motion: Understanding Kinetic Energy',
    description:
      'Learn the physics of kinetic energy, why speed matters more than mass in a car crash, and use our Kinetic Energy Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'kinetic-energy-calculator',
  },
  {
    slug: 'projectile-motion-calculator-guide',
    slugs: {
      en: 'projectile-motion-calculator-guide',
      es: 'guia-calculadora-movimiento-proyectiles',
      fr: 'guide-calculatrice-mouvement-projectile',
      de: 'wurfbewegungs-rechner-ratgeber'
    },
    title: 'Projectile Motion: The Physics of Trajectories',
    description:
      'Master the physics of projectile motion. Learn about launch angles, gravity, and use our Projectile Motion Calculator to plot parabolic trajectories.',
    category: 'Math & Science',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'projectile-motion-calculator',
  },
  {
    slug: 'momentum-calculator-guide',
    slugs: {
      en: 'momentum-calculator-guide',
      es: 'guia-calculadora-momento',
      fr: 'guide-calculatrice-quantite-mouvement',
      de: 'impuls-rechner-ratgeber'
    },
    title: 'Understanding Momentum: The Physics of Collisions',
    description:
      'Master the law of conservation of momentum. Learn the difference between elastic and inelastic collisions, and use our Momentum Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'momentum-calculator',
  },
  {
    slug: 'potential-energy-calculator-guide',
    slugs: {
      en: 'potential-energy-calculator-guide',
      es: 'guia-calculadora-energia-potencial',
      fr: 'guide-calculatrice-energie-potentielle',
      de: 'potentielle-energie-rechner-ratgeber'
    },
    title: 'Potential Energy: Stored Energy Waiting to be Released',
    description:
      'Learn how gravitational potential energy works, how it converts to kinetic energy, and use our Potential Energy Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'potential-energy-calculator',
  },
  {
    slug: 'free-fall-calculator-guide',
    slugs: {
      en: 'free-fall-calculator-guide',
      es: 'guia-calculadora-caida-libre',
      fr: 'guide-calculatrice-chute-libre',
      de: 'freier-fall-rechner-ratgeber'
    },
    title: 'The Physics of Free Fall: Gravity in a Vacuum',
    description:
      'Master the kinematics of falling objects. Learn about the constant 9.8 m/s² gravity, air resistance, and use our Free Fall Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'free-fall-calculator',
  },
  {
    slug: 'work-calculator-guide',
    slugs: {
      en: 'work-calculator-guide',
      es: 'guia-calculadora-trabajo',
      fr: 'guide-calculatrice-travail',
      de: 'arbeit-rechner-ratgeber'
    },
    title: 'The Physics of Work: Force and Displacement',
    description:
      'Understand the scientific definition of Work (W = F × d). Learn why pushing a wall isn\'t \'work\', and use our Work Calculator for your homework.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'work-calculator',
  },
  {
    slug: 'power-calculator-guide',
    slugs: {
      en: 'power-calculator-guide',
      es: 'guia-calculadora-potencia',
      fr: 'guide-calculatrice-puissance',
      de: 'leistungs-rechner-ratgeber'
    },
    title: 'Physics of Power: The Rate of Doing Work',
    description:
      'Master the relationship between Work, Time, and Power. Learn what a Watt is and use our free Power Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'power-calculator',
  },
  {
    slug: 'ohms-law-calculator-guide',
    slugs: {
      en: 'ohms-law-calculator-guide',
      es: 'guia-calculadora-ley-ohm',
      fr: 'guide-calculatrice-loi-ohm',
      de: 'ohmsches-gesetz-rechner-ratgeber'
    },
    title: 'Ohm\'s Law Explained: The Foundation of Electronics',
    description:
      'Master Ohm\'s Law (V = IR). Understand the relationship between voltage, current, and resistance, and use our free Ohm\'s Law Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ohms-law-calculator',
  },
  {
    slug: 'voltage-calculator-guide',
    slugs: {
      en: 'voltage-calculator-guide',
      es: 'guia-calculadora-voltaje',
      fr: 'guide-calculatrice-tension',
      de: 'spannungs-rechner-ratgeber'
    },
    title: 'Understanding Voltage: The Pressure of Electricity',
    description:
      'Learn what voltage really is, how electric potential difference powers your devices, and use our free Voltage Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'voltage-calculator',
  },
  {
    slug: 'current-calculator-guide',
    slugs: {
      en: 'current-calculator-guide',
      es: 'guia-calculadora-corriente',
      fr: 'guide-calculatrice-courant',
      de: 'strom-rechner-ratgeber'
    },
    title: 'Electrical Current: The Flow of Electrons',
    description:
      'Learn what electrical current is, how amperage is measured, the dangers of high current, and use our free Current Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'current-calculator',
  },
  {
    slug: 'resistance-calculator-guide',
    slugs: {
      en: 'resistance-calculator-guide',
      es: 'guia-calculadora-resistencia',
      fr: 'guide-calculatrice-resistance',
      de: 'widerstands-rechner-ratgeber'
    },
    title: 'Electrical Resistance: Controlling the Flow',
    description:
      'Understand electrical resistance, material conductivity, how resistors protect circuits, and use our free Resistance Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'resistance-calculator',
  },
  {
    slug: 'electrical-power-calculator-guide',
    slugs: {
      en: 'electrical-power-calculator-guide',
      es: 'guia-calculadora-potencia-electrica',
      fr: 'guide-calculatrice-puissance-electrique',
      de: 'elektrische-leistung-rechner-ratgeber'
    },
    title: 'Electrical Power: Calculating Watts (P=VI)',
    description:
      'Master Watt\'s Law. Learn how to calculate electrical power consumption using Voltage and Current with our free Electrical Power Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'electrical-power-calculator',
  },
  {
    slug: 'electrical-energy-calculator-guide',
    slugs: {
      en: 'electrical-energy-calculator-guide',
      es: 'guia-calculadora-energia-electrica',
      fr: 'guide-calculatrice-energie-electrique',
      de: 'elektrische-energie-rechner-ratgeber'
    },
    title: 'Electrical Energy: Understanding Your Power Bill',
    description:
      'Learn the difference between Watts and Watt-hours. Understand how electrical energy is consumed over time, and use our free Electrical Energy Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'electrical-energy-calculator',
  },
  {
    slug: 'voltage-drop-calculator-guide',
    slugs: {
      en: 'voltage-drop-calculator-guide',
      es: 'guia-calculadora-caida-voltaje',
      fr: 'guide-calculatrice-chute-tension',
      de: 'spannungsabfall-rechner-ratgeber'
    },
    title: 'Voltage Drop: Why Long Wires Lose Power',
    description:
      'Understand why electricity loses pressure over long distances. Learn how wire gauge and material affect voltage drop, and use our free calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'voltage-drop-calculator',
  },
  {
    slug: 'density-calculator-guide',
    slugs: {
      en: 'density-calculator-guide',
      es: 'guia-calculadora-densidad',
      fr: 'guide-calculatrice-densite',
      de: 'dichte-rechner-ratgeber'
    },
    title: 'Understanding Density: Why Ice Floats',
    description:
      'Master the concept of density. Learn the difference between mass and volume, why ice floats on water, and use our free Density Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'density-calculator',
  },
  {
    slug: 'weight-calculator-guide',
    slugs: {
      en: 'weight-calculator-guide',
      es: 'guia-calculadora-peso',
      fr: 'guide-calculatrice-poids',
      de: 'gewicht-rechner-ratgeber'
    },
    title: 'Mass vs. Weight: What\'s the Difference?',
    description:
      'Discover why your weight changes on the Moon but your mass stays the same. Learn how to calculate weight from mass using our free Weight Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'weight-calculator',
  },
  {
    slug: 'binary-calculator-guide',
    slugs: {
      en: 'binary-calculator-guide',
      es: 'guia-calculadora-binaria',
      fr: 'guide-calculatrice-binaire',
      de: 'binaer-rechner-ratgeber'
    },
    title: 'Understanding Binary: How Computers Think',
    description:
      'Learn how to read binary code, why computers only use 1s and 0s, and how to convert numbers using our free Binary Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'binary-calculator',
  },
  {
    slug: 'wire-resistance-calculator-guide',
    slugs: {
      en: 'wire-resistance-calculator-guide',
      es: 'guia-calculadora-resistencia-cables',
      fr: 'guide-calculatrice-resistance-cable',
      de: 'kabelwiderstands-rechner-ratgeber'
    },
    title: 'Wire Resistance: Why Cables Heat Up',
    description:
      'Learn how the length, thickness, and material of a wire affect its electrical resistance, and use our free Wire Resistance Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'wire-resistance-calculator',
  },
  {
    slug: 'electricity-cost-calculator-guide',
    slugs: {
      en: 'electricity-cost-calculator-guide',
      es: 'guia-calculadora-costo-electricidad',
      fr: 'guide-calculatrice-cout-electricite',
      de: 'stromkosten-rechner-ratgeber'
    },
    title: 'Electricity Cost: How Much Do Appliances Cost to Run?',
    description:
      'Learn how to read your utility bill, calculate kilowatt-hours (kWh), and predict the exact cost of running any appliance with our free calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'electricity-cost-calculator',
  },
  {
    slug: 'led-resistor-calculator-guide',
    slugs: {
      en: 'led-resistor-calculator-guide',
      es: 'guia-calculadora-resistencia-led',
      fr: 'guide-calculatrice-resistance-led',
      de: 'led-widerstands-rechner-ratgeber'
    },
    title: 'LED Resistors: Protecting Your Components',
    description:
      'Learn why LEDs need resistors, how to prevent your Arduino projects from blowing up, and use our free LED Resistor Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'led-resistor-calculator',
  },
  {
    slug: 'power-supply-calculator-guide',
    slugs: {
      en: 'power-supply-calculator-guide',
      es: 'guia-calculadora-fuente-alimentacion',
      fr: 'guide-calculatrice-alimentation-pc',
      de: 'netzteil-rechner-ratgeber'
    },
    title: 'Power Supply: How Much Wattage Do You Need?',
    description:
      'Learn how to choose the right Power Supply Unit (PSU) for your PC, calculate your system\'s total wattage, and use our free Power Supply Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'power-supply-calculator',
  },
  {
    slug: 'power-factor-calculator-guide',
    slugs: {
      en: 'power-factor-calculator-guide',
      es: 'guia-calculadora-factor-potencia',
      fr: 'guide-calculatrice-facteur-puissance',
      de: 'leistungsfaktor-rechner-ratgeber'
    },
    title: 'Power Factor: The Beer Mug Analogy',
    description:
      'Understand Power Factor in AC circuits. Learn the difference between Real Power, Apparent Power, and Reactive Power using our free Power Factor Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'power-factor-calculator',
  },
  {
    slug: 'battery-runtime-calculator-guide',
    slugs: {
      en: 'battery-runtime-calculator-guide',
      es: 'guia-calculadora-duracion-bateria',
      fr: 'guide-calculatrice-autonomie-batterie',
      de: 'batterielaufzeit-rechner-ratgeber'
    },
    title: 'Battery Runtime: How Long Will It Last?',
    description:
      'Learn how to read battery capacity ratings (mAh and Ah), calculate exact discharge times, and use our free Battery Runtime Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'battery-runtime-calculator',
  },
  {
    slug: 'inverter-calculator-guide',
    slugs: {
      en: 'inverter-calculator-guide',
      es: 'guia-calculadora-inversor',
      fr: 'guide-calculatrice-onduleur',
      de: 'wechselrichter-rechner-ratgeber'
    },
    title: 'Inverters: Converting Battery Power to AC Power',
    description:
      'Learn how an inverter works, the difference between pure sine wave and modified sine wave, and use our free Inverter Calculator to size your system.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'inverter-calculator',
  },
  {
    slug: 'solar-panel-calculator-guide',
    slugs: {
      en: 'solar-panel-calculator-guide',
      es: 'guia-calculadora-paneles-solares',
      fr: 'guide-calculatrice-panneaux-solaires',
      de: 'solarpaneele-rechner-ratgeber'
    },
    title: 'Solar Panels: Sizing Your Off-Grid System',
    description:
      'Learn how solar panels generate electricity, how to account for Peak Sun Hours, and use our free Solar Panel Calculator to size your system.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'solar-panel-calculator',
  },
  {
    slug: 'graphing-calculator-guide',
    slugs: {
      en: 'graphing-calculator-guide',
      es: 'guia-calculadora-grafica',
      fr: 'guide-calculatrice-graphique',
      de: 'grafikrechner-ratgeber'
    },
    title: 'Graphing Functions: Parabolas and Slopes',
    description:
      'Learn how to graph linear equations and parabolas. Understand slopes and y-intercepts, and use our free Graphing Calculator to visualize your math.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'graphing-calculator',
  },
  {
    slug: 'p-value-calculator-guide',
    slugs: {
      en: 'p-value-calculator-guide',
      es: 'guia-calculadora-valor-p',
      fr: 'guide-calculatrice-valeur-p',
      de: 'p-wert-rechner-ratgeber'
    },
    title: 'P-Values: Is Your Data Statistically Significant?',
    description:
      'Understand the Null Hypothesis, what it means when p < 0.05, and how to use our free P-Value Calculator to analyze your experimental data.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'p-value-calculator',
  },
  {
    slug: 'molarity-calculator-guide',
    slugs: {
      en: 'molarity-calculator-guide',
      es: 'guia-calculadora-molaridad',
      fr: 'guide-calculatrice-molarite',
      de: 'molaritaets-rechner-ratgeber'
    },
    title: 'Molarity Calculator: Measuring Chemical Concentration',
    description:
      'Learn what Molarity is, how to calculate moles per liter, and use our free Molarity Calculator for your chemistry lab.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'molarity-calculator',
  },
  {
    slug: 'molality-calculator-guide',
    slugs: {
      en: 'molality-calculator-guide',
      es: 'guia-calculadora-molalidad',
      fr: 'guide-calculatrice-molalite',
      de: 'molalitaets-rechner-ratgeber'
    },
    title: 'Molality: The Temperature-Proof Concentration',
    description:
      'Learn the difference between Molarity and Molality, why chemists use mass instead of volume, and use our free Molality Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'molality-calculator',
  },
  {
    slug: 'mole-calculator-guide',
    slugs: {
      en: 'mole-calculator-guide',
      es: 'guia-calculadora-moles',
      fr: 'guide-calculatrice-moles',
      de: 'mol-rechner-ratgeber'
    },
    title: 'The Mole: Chemistry\'s Dozen',
    description:
      'Understand Avogadro\'s Number, what a mole actually is, how to convert between grams and moles, and use our free Mole Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'mole-calculator',
  },
  {
    slug: 'molar-mass-calculator-guide',
    slugs: {
      en: 'molar-mass-calculator-guide',
      es: 'guia-calculadora-masa-molar',
      fr: 'guide-calculatrice-masse-molaire',
      de: 'molare-masse-rechner-ratgeber'
    },
    title: 'Molar Mass: Reading the Periodic Table',
    description:
      'Learn how to read atomic weights on the periodic table, calculate the molar mass of complex compounds, and use our free Molar Mass Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'molar-mass-calculator',
  },
  {
    slug: 'percent-composition-calculator-guide',
    slugs: {
      en: 'percent-composition-calculator-guide',
      es: 'guia-calculadora-composicion-porcentual',
      fr: 'guide-calculatrice-composition-centesimale',
      de: 'massenanteil-rechner-ratgeber'
    },
    title: 'Percent Composition: Analyzing Chemical Makeup',
    description:
      'Learn how to find the mass percentage of individual elements inside a compound. Includes step-by-step math and our free Percent Composition Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'percent-composition-calculator',
  },
  {
    slug: 'molarity-dilution-calculator-guide',
    slugs: {
      en: 'molarity-dilution-calculator-guide',
      es: 'guia-calculadora-dilucion-molaridad',
      fr: 'guide-calculatrice-dilution-molarite',
      de: 'molaritaets-verduennungs-rechner-ratgeber'
    },
    title: 'Molarity Dilution: The M1V1 = M2V2 Formula',
    description:
      'Learn how to prepare lab solutions from concentrated stock. Understand the M1V1 = M2V2 formula and use our free Molarity Dilution Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'molarity-dilution-calculator',
  },
  {
    slug: 'dilution-calculator-guide',
    slugs: {
      en: 'dilution-calculator-guide',
      es: 'guia-calculadora-dilucion',
      fr: 'guide-calculatrice-dilution',
      de: 'verduennungs-rechner-ratgeber'
    },
    title: 'Serial Dilution: Creating Precise Concentrations',
    description:
      'Learn the general dilution factor formula, how to perform serial dilutions in a lab, and use our free Dilution Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'dilution-calculator',
  },
  {
    slug: 'stoichiometry-calculator-guide',
    slugs: {
      en: 'stoichiometry-calculator-guide',
      es: 'guia-calculadora-estequiometria',
      fr: 'guide-calculatrice-stoechiometrie',
      de: 'stoechiometrie-rechner-ratgeber'
    },
    title: 'Stoichiometry: The Math of Chemical Reactions',
    description:
      'Master the most important concept in chemistry. Learn how to balance equations, find the limiting reactant, and use our free Stoichiometry Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'stoichiometry-calculator',
  },
  {
    slug: 'empirical-formula-calculator-guide',
    slugs: {
      en: 'empirical-formula-calculator-guide',
      es: 'guia-calculadora-formula-empirica',
      fr: 'guide-calculatrice-formule-empirique',
      de: 'empirische-formel-rechner-ratgeber'
    },
    title: 'Empirical Formula: The Simplest Ratio',
    description:
      'Learn how to find the simplest whole-number ratio of atoms in a chemical compound using mass percentages, and use our free Empirical Formula Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'empirical-formula-calculator',
  },
  {
    slug: 'molecular-formula-calculator-guide',
    slugs: {
      en: 'molecular-formula-calculator-guide',
      es: 'guia-calculadora-formula-molecular',
      fr: 'guide-calculatrice-formule-moleculaire',
      de: 'molekuelformel-rechner-ratgeber'
    },
    title: 'Molecular Formula: Finding the True Compound',
    description:
      'Learn the difference between Empirical and Molecular formulas, how to calculate the true number of atoms, and use our Molecular Formula Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'molecular-formula-calculator',
  },
  {
    slug: 'ph-calculator-guide',
    slugs: {
      en: 'ph-calculator-guide',
      es: 'guia-calculadora-ph',
      fr: 'guide-calculatrice-ph',
      de: 'ph-rechner-ratgeber'
    },
    title: 'pH Calculator: Measuring Acidity and Alkalinity',
    description:
      'Understand the pH scale, learn how to calculate hydrogen ion concentration using logarithms, and use our free pH Calculator.',
    category: 'Math & Science',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ph-calculator',
  },
  {
    slug: 'poh-calculator-guide',
    slugs: {
      en: 'poh-calculator-guide',
      es: 'guia-calculadora-poh',
      fr: 'guide-calculatrice-poh',
      de: 'poh-rechner-ratgeber'
    },
    title: 'pOH Calculator: The Inverse of pH',
    description:
      'Learn how the pOH scale measures alkalinity, the relationship between pH and pOH (pH + pOH = 14), and use our free pOH Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'poh-calculator',
  },
  {
    slug: 'pka-calculator-guide',
    slugs: {
      en: 'pka-calculator-guide',
      es: 'guia-calculadora-pka',
      fr: 'guide-calculatrice-pka',
      de: 'pka-rechner-ratgeber'
    },
    title: 'pKa Calculator: Measuring Acid Strength',
    description:
      'Understand acid dissociation constants (Ka), how to calculate pKa, and use our free pKa Calculator to determine acid strength.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'pka-calculator',
  },
  {
    slug: 'acid-base-calculator-guide',
    slugs: {
      en: 'acid-base-calculator-guide',
      es: 'guia-calculadora-acido-base',
      fr: 'guide-calculatrice-acide-base',
      de: 'saeure-base-rechner-ratgeber'
    },
    title: 'Acid-Base Calculator: Mastering Neutralization',
    description:
      'Learn how acids and bases react to form water and salt, understand titration formulas, and use our free Acid-Base Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'acid-base-calculator',
  },
  {
    slug: 'henderson-hasselbalch-equation-calculator-guide',
    slugs: {
      en: 'henderson-hasselbalch-equation-calculator-guide',
      es: 'guia-calculadora-ecuacion-henderson-hasselbalch',
      fr: 'guide-calculatrice-equation-henderson-hasselbalch',
      de: 'henderson-hasselbalch-gleichungs-rechner-ratgeber'
    },
    title: 'Henderson-Hasselbalch Equation: Buffer Solutions',
    description:
      'Learn how the Henderson-Hasselbalch equation works, how buffer solutions resist pH changes, and use our free calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'henderson-hasselbalch-equation-calculator',
  },
  {
    slug: 'buffer-calculator-guide',
    slugs: {
      en: 'buffer-calculator-guide',
      es: 'guia-calculadora-amortiguador',
      fr: 'guide-calculatrice-tampon',
      de: 'puffer-rechner-ratgeber'
    },
    title: 'Buffer Calculator: Maintaining pH Stability',
    description:
      'Understand how chemical buffers work, how to calculate the ratio of acid to conjugate base, and use our free Buffer Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'buffer-calculator',
  },
  {
    slug: 'ka-calculator-guide',
    slugs: {
      en: 'ka-calculator-guide',
      es: 'guia-calculadora-ka',
      fr: 'guide-calculatrice-ka',
      de: 'ka-rechner-ratgeber'
    },
    title: 'Ka Calculator: The Acid Dissociation Constant',
    description:
      'Learn how the Ka constant measures acid strength, how to calculate it using ICE tables, and use our free Ka Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ka-calculator',
  },
  {
    slug: 'kb-calculator-guide',
    slugs: {
      en: 'kb-calculator-guide',
      es: 'guia-calculadora-kb',
      fr: 'guide-calculatrice-kb',
      de: 'kb-rechner-ratgeber'
    },
    title: 'Kb Calculator: The Base Dissociation Constant',
    description:
      'Understand the Kb constant for weak bases, the relationship between Ka, Kb, and Kw, and use our free Kb Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'kb-calculator',
  },
  {
    slug: 'equilibrium-constant-calculator-guide',
    slugs: {
      en: 'equilibrium-constant-calculator-guide',
      es: 'guia-calculadora-constante-equilibrio',
      fr: 'guide-calculatrice-constante-equilibre',
      de: 'gleichgewichtskonstanten-rechner-ratgeber'
    },
    title: 'Equilibrium Constant Calculator: Measuring Chemical Balance',
    description:
      'Learn how the Keq constant measures the balance between products and reactants in reversible reactions, and use our free calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'equilibrium-constant-calculator',
  },
  {
    slug: 'ksp-calculator-guide',
    slugs: {
      en: 'ksp-calculator-guide',
      es: 'guia-calculadora-ksp',
      fr: 'guide-calculatrice-ksp',
      de: 'ksp-rechner-ratgeber'
    },
    title: 'Ksp Calculator: The Solubility Product Constant',
    description:
      'Learn why some salts dissolve in water while others do not, how to calculate the Ksp, and use our free Ksp Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ksp-calculator',
  },
  {
    slug: 'solubility-calculator-guide',
    slugs: {
      en: 'solubility-calculator-guide',
      es: 'guia-calculadora-solubilidad',
      fr: 'guide-calculatrice-solubilite',
      de: 'loeslichkeitsrechner-ratgeber'
    },
    title: 'Solubility Calculator: Dissolving Chemistry',
    description:
      'Learn how temperature affects solubility, how to calculate molar solubility, and use our free Solubility Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'solubility-calculator',
  },
  {
    slug: 'nernst-equation-calculator-guide',
    slugs: {
      en: 'nernst-equation-calculator-guide',
      es: 'guia-calculadora-ecuacion-nernst',
      fr: 'guide-calculatrice-equation-nernst',
      de: 'nernst-gleichung-rechner-ratgeber'
    },
    title: 'Nernst Equation Calculator: Electrochemistry',
    description:
      'Understand how the Nernst Equation predicts cell potential at non-standard conditions, and use our free Nernst Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'nernst-equation-calculator',
  },
  {
    slug: 'electrochemical-cell-calculator-guide',
    slugs: {
      en: 'electrochemical-cell-calculator-guide',
      es: 'guia-calculadora-celda-electroquimica',
      fr: 'guide-calculatrice-cellule-electrochimique',
      de: 'elektrochemische-zellen-rechner-ratgeber'
    },
    title: 'Electrochemical Cell Calculator: Batteries Explained',
    description:
      'Learn how galvanic cells generate electricity, how to calculate standard cell potential, and use our Electrochemical Cell Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'electrochemical-cell-calculator',
  },
  {
    slug: 'gibbs-free-energy-calculator-guide',
    slugs: {
      en: 'gibbs-free-energy-calculator-guide',
      es: 'guia-calculadora-energia-libre-gibbs',
      fr: 'guide-calculatrice-energie-libre-gibbs',
      de: 'gibbs-energie-rechner-ratgeber'
    },
    title: 'Gibbs Free Energy Calculator: Spontaneous Reactions',
    description:
      'Learn how Gibbs Free Energy determines if a chemical reaction is spontaneous, how enthalpy and entropy factor in, and use our free calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'gibbs-free-energy-calculator',
  },
  {
    slug: 'enthalpy-calculator-guide',
    slugs: {
      en: 'enthalpy-calculator-guide',
      es: 'guia-calculadora-entalpia',
      fr: 'guide-calculatrice-enthalpie',
      de: 'enthalpie-rechner-ratgeber'
    },
    title: 'Enthalpy Calculator: Heat in Chemical Reactions',
    description:
      'Understand enthalpy, the difference between exothermic and endothermic reactions, and use our free Enthalpy Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'enthalpy-calculator',
  },
  {
    slug: 'heat-of-reaction-calculator-guide',
    slugs: {
      en: 'heat-of-reaction-calculator-guide',
      es: 'guia-calculadora-calor-reaccion',
      fr: 'guide-calculatrice-chaleur-reaction',
      de: 'reaktionswaerme-rechner-ratgeber'
    },
    title: 'Heat of Reaction Calculator: Thermodynamics',
    description:
      'Learn how to calculate the standard heat of reaction from standard enthalpies of formation, and use our free calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'heat-of-reaction-calculator',
  },
  {
    slug: 'hess-law-calculator-guide',
    slugs: {
      en: 'hess-law-calculator-guide',
      es: 'guia-calculadora-ley-hess',
      fr: 'guide-calculatrice-loi-hess',
      de: 'hess-scher-waermesatz-rechner-ratgeber'
    },
    title: "Hess's Law Calculator: Adding Up Enthalpy",
    description:
      "Understand Hess's Law, how enthalpy is a state function, how to add intermediate reactions, and use our free Hess's Law Calculator.",
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'hess-law-calculator',
  },
  {
    slug: 'calorimetry-calculator-guide',
    slugs: {
      en: 'calorimetry-calculator-guide',
      es: 'guia-calculadora-calorimetria',
      fr: 'guide-calculatrice-calorimetrie',
      de: 'kalorimetrie-rechner-ratgeber'
    },
    title: 'Calorimetry Calculator: Measuring Heat Transfer',
    description:
      'Learn how a calorimeter works, the math behind measuring heat transfer, and use our free Calorimetry Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'calorimetry-calculator',
  },
  {
    slug: 'specific-heat-calculator-guide',
    slugs: {
      en: 'specific-heat-calculator-guide',
      es: 'guia-calculadora-calor-especifico',
      fr: 'guide-calculatrice-chaleur-specifique',
      de: 'spezifische-waermekapazitaet-rechner-ratgeber'
    },
    title: 'Specific Heat Calculator: Understanding Thermal Capacity',
    description:
      'Learn what specific heat capacity is, why water takes so long to boil, and use our free Specific Heat Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'specific-heat-calculator',
  },
  {
    slug: 'ideal-gas-law-calculator-guide',
    slugs: {
      en: 'ideal-gas-law-calculator-guide',
      es: 'guia-calculadora-ley-gases-ideales',
      fr: 'guide-calculatrice-loi-gaz-parfaits',
      de: 'ideales-gasgesetz-rechner-ratgeber'
    },
    title: 'Ideal Gas Law Calculator: PV = nRT',
    description:
      'Understand the Ideal Gas Law, how pressure, volume, temperature, and moles interact, and use our free calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ideal-gas-law-calculator',
  },
  {
    slug: 'combined-gas-law-calculator-guide',
    slugs: {
      en: 'combined-gas-law-calculator-guide',
      es: 'guia-calculadora-ley-combinada-gases',
      fr: 'guide-calculatrice-loi-combinee-gaz',
      de: 'kombiniertes-gasgesetz-rechner-ratgeber'
    },
    title: 'Combined Gas Law Calculator: Changing Conditions',
    description:
      "Learn how the Combined Gas Law merges Boyle's, Charles's, and Gay-Lussac's laws to handle changing conditions, and use our calculator.",
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'combined-gas-law-calculator',
  },
  {
    slug: 'boyles-law-calculator-guide',
    slugs: {
      en: 'boyles-law-calculator-guide',
      es: 'guia-calculadora-ley-boyle',
      fr: 'guide-calculatrice-loi-boyle',
      de: 'boyle-mariotte-gesetz-rechner-ratgeber'
    },
    title: "Boyle's Law Calculator: Pressure vs. Volume",
    description:
      "Understand the inverse relationship between gas pressure and volume, explore real-world examples, and use our free Boyle's Law Calculator.",
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'boyles-law-calculator',
  },
  {
    slug: 'charles-law-calculator-guide',
    slugs: {
      en: 'charles-law-calculator-guide',
      es: 'guia-calculadora-ley-charles',
      fr: 'guide-calculatrice-loi-charles',
      de: 'charles-sches-gesetz-rechner-ratgeber'
    },
    title: "Charles's Law Calculator: Volume vs. Temperature",
    description:
      "Learn how heating a gas causes it to expand, explore the direct relationship of Charles's Law, and use our free calculator.",
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'charles-law-calculator',
  },
  {
    slug: 'balancing-chemical-equations-calculator-guide',
    slugs: {
      en: 'balancing-chemical-equations-calculator-guide',
      es: 'guia-calculadora-balanceo-ecuaciones-quimicas',
      fr: 'guide-calculatrice-equilibrage-equations-chimiques',
      de: 'chemische-gleichungen-rechner-ratgeber'
    },
    title: 'Balancing Chemical Equations: The Law of Conservation',
    description:
      'Learn why chemical equations must be balanced, how to balance them using coefficients, and use our free balancing calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'balancing-chemical-equations-calculator',
  },
  {
    slug: 'cell-potential-calculator-guide',
    slugs: {
      en: 'cell-potential-calculator-guide',
      es: 'guia-calculadora-potencial-celda',
      fr: 'guide-calculatrice-potentiel-cellule',
      de: 'zellpotential-rechner-ratgeber'
    },
    title: 'Cell Potential Calculator: Predicting Spontaneous Reactions',
    description:
      'Learn how to calculate the standard cell potential of an electrochemical cell and predict whether a redox reaction will occur spontaneously.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'cell-potential-calculator',
  },
  {
    slug: 'faradays-law-calculator-guide',
    slugs: {
      en: 'faradays-law-calculator-guide',
      es: 'guia-calculadora-ley-faraday',
      fr: 'guide-calculatrice-loi-faraday',
      de: 'faradaysches-gesetz-rechner-ratgeber'
    },
    title: "Faraday's Law of Electrolysis Calculator",
    description:
      "Learn how Faraday's Laws connect electrical charge to the amount of substance deposited or dissolved during electrolysis.",
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'faradays-law-calculator',
  },
  {
    slug: 'electrolysis-calculator-guide',
    slugs: {
      en: 'electrolysis-calculator-guide',
      es: 'guia-calculadora-electrolisis',
      fr: 'guide-calculatrice-electrolyse',
      de: 'elektrolyse-rechner-ratgeber'
    },
    title: 'Electrolysis Calculator: Using Electricity to Drive Chemistry',
    description:
      'Learn how electrolysis uses electrical energy to force non-spontaneous chemical reactions and use our free Electrolysis Calculator.',
    category: 'Math & Science',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'electrolysis-calculator',
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
    relatedCalculator: 'database-anonymizer',
    relatedType: 'tool',
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
    relatedCalculator: 'database-anonymizer',
    relatedType: 'tool',
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
    relatedCalculator: 'database-anonymizer',
    relatedType: 'tool',
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
    relatedCalculator: 'database-anonymizer',
    relatedType: 'tool',
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
    relatedCalculator: 'database-anonymizer',
    relatedType: 'tool',
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
    slug: 'ups-calculator-guide',
    slugs: {
      en: 'ups-calculator-guide',
      es: 'guia-calculadora-ups',
      fr: 'guide-calculatrice-ups',
      de: 'ups-rechner-ratgeber'
    },
    title: 'UPS Calculator: Sizing Your Backup Battery',
    description:
      'Learn what an Uninterruptible Power Supply (UPS) is, how to calculate your VA and Wattage needs, and use our free UPS Calculator.',
    category: 'Productivity & Utilities',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ups-calculator',
  },
  {
    slug: 'subnet-calculator-guide',
    slugs: {
      en: 'subnet-calculator-guide',
      es: 'guia-calculadora-subred',
      fr: 'guide-calculatrice-sous-reseau',
      de: 'subnetz-rechner-ratgeber'
    },
    title: 'Subnetting: Dividing the Network',
    description:
      'Learn what subnetting is, how CIDR notation works, why IT administrators divide networks, and use our free Subnet Calculator.',
    category: 'Productivity & Utilities',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'subnet-calculator',
  },
  {
    slug: 'ip-subnet-calculator-guide',
    slugs: {
      en: 'ip-subnet-calculator-guide',
      es: 'guia-calculadora-subred-ip',
      fr: 'guide-calculatrice-sous-reseau-ip',
      de: 'ip-subnetz-rechner-ratgeber'
    },
    title: 'IP Subnetting: Host Ranges and Broadcasts',
    description:
      'Take a deeper dive into IPv4 subnetting. Learn how to calculate network IDs, broadcast addresses, and host ranges using our free IP Subnet Calculator.',
    category: 'Productivity & Utilities',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'ip-subnet-calculator',
  },
  {
    slug: 'snow-day-calculator-guide',
    slugs: {
      en: 'snow-day-calculator-guide',
      es: 'guia-calculadora-dia-nieve',
      fr: 'guide-calculatrice-jour-neige',
      de: 'schneefrei-rechner-ratgeber'
    },
    title: 'Snow Day Calculator: Will School Be Canceled?',
    description:
      'Discover the hidden factors school districts use to call a snow day. Learn how algorithms predict delays and closures, and try our Snow Day Calculator.',
    category: 'Productivity & Utilities',
    readingTime: 3,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'snow-day-calculator',
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
    slug: 'hours-calculator-guide',
    slugs: {
      en: 'hours-calculator-guide',
      es: 'guia-calculadora-horas',
      fr: 'guide-calculatrice-heures',
      de: 'stundenrechner-ratgeber'
    },
    title: 'The Payroll Masterclass: Calculating Timesheets and Work Hours',
    description:
      'Learn how to convert minutes to decimals for payroll, how to calculate gross pay, and use our free Hours Calculator to track your weekly timesheets.',
    category: 'Productivity & Utilities',
    readingTime: 5,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'hours-calculator',
  },
  {
    slug: 'concrete-calculator-guide',
    slugs: {
      en: 'concrete-calculator-guide',
      es: 'guia-calculadora-de-concreto',
      fr: 'guide-calculatrice-beton',
      de: 'betonrechner-ratgeber'
    },
    title: 'How to Estimate Concrete for Your Next DIY Project',
    description:
      'Learn how to calculate concrete volume in cubic yards, account for spillage, and use our free Concrete Calculator for slabs, footings, and columns.',
    category: 'Productivity & Utilities',
    readingTime: 4,
    lastUpdated: '2026-08-23',
    relatedCalculator: 'concrete-calculator',
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

/** Get the related educational guide for a calculator slug. Returns undefined if not found. */
export function getGuideForCalculator(calcSlug: string): Guide | undefined {
  return allGuides.find((g) => g.relatedCalculator === calcSlug);
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
