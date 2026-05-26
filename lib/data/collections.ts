// ═══════════════════════════════════════════════════════
// TOOL COLLECTIONS / BUNDLES
// ═══════════════════════════════════════════════════════
// Curated groups of tools built around specific workflows
// or user personas. Helps users discover related tools that
// they didn't know they needed.
// ═══════════════════════════════════════════════════════

export interface CollectionDef {
  slug: string;
  title: string;
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  toolSlugs: string[]; // Slugs of calculators or developer tools
}

export const collections: CollectionDef[] = [
  {
    slug: 'real-estate-investor-kit',
    title: 'Real Estate Investor Kit',
    description: 'Everything you need to analyze properties, estimate mortgages, and calculate ROI.',
    icon: 'Home',
    seoTitle: 'Real Estate Investor Calculators & Tools | Nexus Calculator',
    seoDescription: 'A curated bundle of calculators for real estate investors: mortgages, ROI, cap rates, rental yield, and depreciation.',
    toolSlugs: [
      'mortgage-calculator',
      'rental-property-calculator',
      'real-estate-calculator',
      'irr-calculator',
      'depreciation-calculator',
      'house-affordability-calculator'
    ]
  },
  {
    slug: 'developer-starter-pack',
    title: 'Developer Starter Pack',
    description: 'Essential utilities for software engineers, from formatting JSON to subnetting IPs.',
    icon: 'Terminal',
    seoTitle: 'Developer Tools Starter Pack | Nexus Calculator',
    seoDescription: 'Essential utilities for software engineers: JSON formatters, diff checkers, subnet calculators, and secure password generators.',
    toolSlugs: [
      'json-formatter',
      'html-formatter',
      'diff-checker',
      'subnet-calculator',
      'password-generator',
      'conversion-calculator'
    ]
  },
  {
    slug: 'debt-freedom-plan',
    title: 'Debt Freedom Planner',
    description: 'Tools to help you consolidate debt, calculate payoffs, and plan your journey to zero balance.',
    icon: 'TrendingDown',
    seoTitle: 'Debt Payoff & Consolidation Calculators | Nexus Calculator',
    seoDescription: 'Plan your journey to debt freedom with our suite of payoff calculators for credit cards, auto loans, and personal debt.',
    toolSlugs: [
      'debt-payoff-calculator',
      'debt-consolidation-calculator',
      'credit-cards-payoff',
      'student-loan-calculator',
      'personal-loan-calculator',
      'budget-calculator'
    ]
  },
  {
    slug: 'fitness-transformation',
    title: 'Fitness Transformation Kit',
    description: 'Track your macros, analyze body composition, and plan your physical transformation.',
    icon: 'Activity',
    seoTitle: 'Fitness & Health Calculator Bundle | Nexus Calculator',
    seoDescription: 'A comprehensive bundle of health calculators to track your BMI, BMR, body fat percentage, and daily caloric needs.',
    toolSlugs: [
      'bmi-calculator',
      'bmr-calculator',
      'calorie-calculator',
      'body-fat-calculator',
      'ideal-weight-calculator',
      'healthy-weight-calculator',
      'pace-calculator'
    ]
  },
  {
    slug: 'home-buyer-toolkit',
    title: 'Home Buyer\'s Toolkit',
    description: 'Calculate affordability, compare loan types, and estimate down payments to buy your dream home confidently.',
    icon: 'Key',
    seoTitle: 'Home Buying Calculators & Toolkit | Nexus Calculator',
    seoDescription: 'A complete toolkit for homebuyers. Calculate mortgage payments, home affordability, down payments, FHA loans, and HELOC options.',
    toolSlugs: [
      'mortgage-calculator',
      'house-affordability-calculator',
      'down-payment-calculator',
      'fha-loan-calculator',
      'va-mortgage-calculator',
      'heloc-calculator',
      'mortgage-amortization-calculator',
      'rent-vs-buy-calculator'
    ]
  },
  {
    slug: 'retirement-planning-suite',
    title: 'Retirement Planning Suite',
    description: 'Project your nest egg, calculate RMDs, and estimate Social Security benefits for a secure future.',
    icon: 'Umbrella',
    seoTitle: 'Retirement Planning Calculators | 401(k), IRA & RMDs | Nexus Calculator',
    seoDescription: 'Plan your retirement with our suite of tools covering 401(k) growth, Roth IRA contributions, RMD calculations, and Social Security benefits.',
    toolSlugs: [
      'retirement-calculator',
      'roth-ira-calculator',
      '401k-calculator',
      'rmd-calculator',
      'social-security-calculator',
      'annuity-payout-calculator'
    ]
  },
  {
    slug: 'student-finance-pack',
    title: 'Student Finance Pack',
    description: 'Manage student loans, calculate GPAs, and build a student budget effectively.',
    icon: 'GraduationCap',
    seoTitle: 'Student Calculators: GPA, Loans & College Costs | Nexus Calculator',
    seoDescription: 'Financial and academic tools for students. Calculate GPA, estimate college costs, plan student loan payoffs, and manage your budget.',
    toolSlugs: [
      'student-loan-calculator',
      'gpa-calculator',
      'grade-calculator',
      'budget-calculator',
      'college-cost-calculator',
      'salary-calculator'
    ]
  },
  {
    slug: 'crypto-investor-tools',
    title: 'Tax & Investment Tools',
    description: 'Analyze capital gains, calculate compound interest, and factor in inflation for your investments.',
    icon: 'LineChart',
    seoTitle: 'Investment & Capital Gains Calculators | Nexus Calculator',
    seoDescription: 'Track and forecast investment returns. Calculate capital gains, compound interest, average returns, and adjust for inflation over time.',
    toolSlugs: [
      'investment-calculator',
      'compound-interest-calculator',
      'average-return-calculator',
      'inflation-calculator',
      'capital-gains-calculator'
    ]
  },
  {
    slug: 'developer-security-pack',
    title: 'Developer Security Pack',
    description: 'Generate hashes, decode JWTs, and create strong passwords securely in your browser.',
    icon: 'Shield',
    seoTitle: 'Security Tools for Developers: Hash & Password Generators | Nexus Calculator',
    seoDescription: 'A suite of security tools for developers. Generate MD5/SHA256 hashes, create HMACs, decode JWT tokens, and generate strong passwords locally.',
    toolSlugs: [
      'hash-generator',
      'hmac-generator',
      'sha256-generator',
      'md5-generator',
      'password-generator',
      'strong-password-generator',
      'jwt-decoder'
    ]
  }
];

export function getCollectionBySlug(slug: string): CollectionDef | undefined {
  return collections.find(c => c.slug === slug);
}
