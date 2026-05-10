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
      'pace-calculator'
    ]
  }
];

export function getCollectionBySlug(slug: string): CollectionDef | undefined {
  return collections.find(c => c.slug === slug);
}
