// ═══════════════════════════════════════════════════════
// TOOL COMPARISONS
// ═══════════════════════════════════════════════════════
// Comparison pages (e.g. "Roth IRA vs 401(k)") are massive
// drivers of SEO traffic because users often search for
// the difference between two financial or technical concepts
// before using a calculator.
// ═══════════════════════════════════════════════════════

export interface ComparisonDef {
  slug: string; // e.g. "roth-ira-vs-401k"
  title: string;
  seoTitle: string;
  seoDescription: string;
  toolA: string; // slug of first tool
  toolB: string; // slug of second tool
  verdict: string;
  differences: { label: string; a: string; b: string }[];
}

export const comparisons: ComparisonDef[] = [
  {
    slug: 'roth-ira-vs-401k',
    title: 'Roth IRA vs. 401(k): Which is Better?',
    seoTitle: 'Roth IRA vs 401(k) Calculator & Comparison | Nexus Calculator',
    seoDescription: 'Compare Roth IRA and 401(k) retirement plans. Calculate your potential returns and understand the tax implications of each.',
    toolA: 'roth-ira-calculator',
    toolB: '401k-calculator',
    verdict: 'A 401(k) is best for high earners seeking immediate tax deductions and employer matches. A Roth IRA is better for tax-free growth and withdrawals in retirement.',
    differences: [
      { label: 'Tax Advantage', a: 'Tax-free withdrawals in retirement', b: 'Tax-deductible contributions now' },
      { label: 'Employer Match', a: 'Rarely applicable', b: 'Commonly offered' },
      { label: 'Contribution Limits (2024)', a: '$7,000 ($8,000 if 50+)', b: '$23,000 ($30,500 if 50+)' },
      { label: 'Required Minimum Distributions (RMDs)', a: 'None', b: 'Required at age 73' }
    ]
  },
  {
    slug: 'fha-vs-conventional-loan',
    title: 'FHA vs. Conventional Loan',
    seoTitle: 'FHA vs Conventional Loan Calculator | Compare Mortgages',
    seoDescription: 'Compare FHA and Conventional loans. See which mortgage type offers better rates, down payment requirements, and PMI costs for your situation.',
    toolA: 'fha-loan-calculator',
    toolB: 'mortgage-calculator',
    verdict: 'FHA loans are ideal for first-time buyers with lower credit scores and smaller down payments. Conventional loans are better for buyers with good credit who want to avoid lifetime mortgage insurance.',
    differences: [
      { label: 'Minimum Down Payment', a: '3.5%', b: '3%' },
      { label: 'Minimum Credit Score', a: '580 (typically)', b: '620' },
      { label: 'Mortgage Insurance (PMI)', a: 'Required for life of loan (usually)', b: 'Can be cancelled at 20% equity' },
      { label: 'Property Requirements', a: 'Strict appraisal standards', b: 'Standard appraisal' }
    ]
  }
];

export function getComparisonBySlug(slug: string): ComparisonDef | undefined {
  return comparisons.find(c => c.slug === slug);
}
