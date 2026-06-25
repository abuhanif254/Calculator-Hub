// ═══════════════════════════════════════════════════════════════════════
// lib/data/guides.ts
// Nexus Calculator — Guides Registry
// Documentation-style guide hub (Tailwind CSS Docs / Vite Docs pattern)
// ═══════════════════════════════════════════════════════════════════════

export type GuideCategory = 'Finance' | 'Health' | 'Math & Science';

export interface Guide {
  /** URL-safe slug (used in /guides/[slug]) */
  slug: string;
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
  /** If true, appears in the "Featured Guides" hero row on the index page */
  featured?: boolean;
}

// ─── FINANCE GUIDES ───────────────────────────────────────────────────
const financeGuides: Guide[] = [
  {
    slug: 'how-to-use-compound-interest-calculator',
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
    title: 'Mastering Salary Calculations: Hourly to Annual Conversions',
    description:
      'Explaining the math behind converting hourly wages to annual salaries, factoring in paid time off, working hours, and standard tax implications.',
    category: 'Finance',
    readingTime: 5,
    lastUpdated: '2026-06-25',
    relatedCalculator: 'salary-calculator',
  },
];

// ─── HEALTH GUIDES ────────────────────────────────────────────────────
const healthGuides: Guide[] = [
  {
    slug: 'how-to-calculate-bmi',
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
    title: 'Understanding Your Daily Caloric Needs for Weight Management',
    description:
      'How to determine caloric requirements based on TDEE (Total Daily Energy Expenditure), and adjusting intake for weight loss, maintenance, or muscle gain.',
    category: 'Health',
    readingTime: 7,
    lastUpdated: '2026-06-25',
    relatedCalculator: 'calorie-calculator',
  },
];

// ─── MATH & SCIENCE GUIDES ────────────────────────────────────────────
const mathGuides: Guide[] = [
  {
    slug: 'percentage-calculator-guide',
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
    title: 'Triangle Calculator Guide: Sides, Angles & Area',
    description:
      'A thorough reference for solving any triangle — right, acute, or obtuse — using trigonometric laws (Law of Sines, Law of Cosines), the Pythagorean theorem, and Heron\'s formula for area.',
    category: 'Math & Science',
    readingTime: 7,
    lastUpdated: '2026-06-11',
    relatedCalculator: 'triangle-calculator',
  },
];

// ─── EXPORTED REGISTRY ────────────────────────────────────────────────

/** All guides in display order (Finance → Health → Math & Science) */
export const allGuides: Guide[] = [
  ...financeGuides,
  ...healthGuides,
  ...mathGuides,
];

/** Guides grouped by category for sidebar rendering */
export const guidesByCategory: Record<GuideCategory, Guide[]> = {
  Finance: financeGuides,
  Health: healthGuides,
  'Math & Science': mathGuides,
};

/** Featured guides for the hero/landing section */
export const featuredGuides: Guide[] = allGuides.filter((g) => g.featured);

/** Get a single guide by slug. Returns undefined if not found. */
export function getGuideBySlug(slug: string): Guide | undefined {
  return allGuides.find((g) => g.slug === slug);
}

/** Get the previous and next guides relative to a given slug (for article navigation) */
export function getAdjacentGuides(slug: string): {
  prev: Guide | null;
  next: Guide | null;
} {
  const index = allGuides.findIndex((g) => g.slug === slug);
  return {
    prev: index > 0 ? allGuides[index - 1] : null,
    next: index < allGuides.length - 1 ? allGuides[index + 1] : null,
  };
}

/** All guide slugs — used for generateStaticParams */
export const allGuideSlugs: string[] = allGuides.map((g) => g.slug);
