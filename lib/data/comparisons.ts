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
  },
  {
    slug: 'simple-vs-compound-interest',
    title: 'Simple vs. Compound Interest',
    seoTitle: 'Simple vs Compound Interest Calculator & Comparison',
    seoDescription: 'Compare simple and compound interest to see how your money grows over time. Understand the power of compounding for investments and loans.',
    toolA: 'simple-interest-calculator',
    toolB: 'compound-interest-calculator',
    verdict: 'Compound interest is vastly superior for investments as your interest earns interest over time. Simple interest is generally preferable when you are the one borrowing money (though most loans use compound interest).',
    differences: [
      { label: 'Calculation Basis', a: 'Principal only', b: 'Principal + accumulated interest' },
      { label: 'Growth Rate', a: 'Linear (constant amount each period)', b: 'Exponential (accelerates over time)' },
      { label: 'Best For', a: 'Short-term personal loans', b: 'Long-term investments & savings' },
      { label: 'Common Uses', a: 'Car loans, some personal loans', b: 'Savings accounts, mortgages, credit cards' }
    ]
  },
  {
    slug: 'apr-vs-interest-rate',
    title: 'APR vs. Interest Rate',
    seoTitle: 'APR vs Interest Rate Calculator & Comparison | True Cost of Borrowing',
    seoDescription: 'Understand the difference between APR (Annual Percentage Rate) and Interest Rate. Calculate the true cost of loans and mortgages.',
    toolA: 'apr-calculator',
    toolB: 'interest-rate-calculator',
    verdict: 'Interest rate only tells you the cost of borrowing the principal. APR is the more important metric because it represents the true total cost of the loan, including fees and closing costs.',
    differences: [
      { label: 'What it Measures', a: 'Total cost of borrowing (rate + fees)', b: 'Just the cost of the principal borrowed' },
      { label: 'Includes Fees?', a: 'Yes (origination fees, closing costs, etc.)', b: 'No' },
      { label: 'Value', a: 'Always higher than (or equal to) the interest rate', b: 'Always lower than the APR' },
      { label: 'Best Use', a: 'Comparing multiple loan offers side-by-side', b: 'Calculating monthly principal & interest payments' }
    ]
  },
  {
    slug: 'mortgage-vs-rent',
    title: 'Buy vs. Rent a Home',
    seoTitle: 'Buy vs Rent Calculator | Compare Mortgage vs Renting Costs',
    seoDescription: 'Should you buy or rent? Compare the long-term financial impact of taking out a mortgage versus continuing to pay rent.',
    toolA: 'mortgage-calculator',
    toolB: 'rent-calculator',
    verdict: 'Buying builds long-term equity and stabilizes housing costs, making it better for those staying 5+ years. Renting offers flexibility, predictable monthly costs, and no maintenance liabilities.',
    differences: [
      { label: 'Wealth Building', a: 'Builds equity over time', b: 'No equity generated (sunk cost)' },
      { label: 'Upfront Costs', a: 'High (Down payment, closing costs)', b: 'Low (Security deposit)' },
      { label: 'Maintenance', a: 'Homeowner is responsible for all repairs', b: 'Landlord handles maintenance' },
      { label: 'Flexibility', a: 'Low (Harder to move quickly)', b: 'High (Can move at end of lease)' }
    ]
  },
  {
    slug: 'debt-snowball-vs-avalanche',
    title: 'Debt Snowball vs. Avalanche',
    seoTitle: 'Debt Snowball vs Avalanche Calculator | Best Payoff Strategy',
    seoDescription: 'Compare the debt snowball (smallest balance first) and debt avalanche (highest interest first) payoff strategies to see which saves you more money.',
    toolA: 'debt-payoff-calculator',
    toolB: 'debt-consolidation-calculator',
    verdict: 'The Avalanche method is mathematically superior and saves the most money on interest. However, the Snowball method offers quick psychological wins, which helps many people stay motivated to become debt-free.',
    differences: [
      { label: 'Primary Focus', a: 'Smallest balances first', b: 'Highest interest rates first' },
      { label: 'Interest Paid', a: 'Usually higher total interest paid', b: 'Mathematically minimizes interest paid' },
      { label: 'Psychological Benefit', a: 'High (quick wins by eliminating small debts)', b: 'Lower (can take a long time to clear the first debt)' },
      { label: 'Time to Debt-Free', a: 'Usually takes slightly longer', b: 'The fastest path to zero debt' }
    ]
  },
  {
    slug: 'bmi-vs-body-fat',
    title: 'BMI vs. Body Fat %',
    seoTitle: 'BMI vs Body Fat Percentage Calculator | Health Metrics Compared',
    seoDescription: 'Compare Body Mass Index (BMI) and Body Fat Percentage. Understand which metric provides a better picture of your overall health and fitness.',
    toolA: 'bmi-calculator',
    toolB: 'body-fat-calculator',
    verdict: 'Body Fat Percentage is a much more accurate indicator of metabolic health and fitness. BMI is a useful, quick screening tool for populations but fails to distinguish between muscle mass and fat on an individual basis.',
    differences: [
      { label: 'What it Measures', a: 'Weight relative to height', b: 'Proportion of fat mass to total body weight' },
      { label: 'Accuracy', a: 'Low for muscular individuals', b: 'High (if measured correctly)' },
      { label: 'Data Required', a: 'Just height and weight', b: 'Measurements (neck, waist, etc.) or clinical tools' },
      { label: 'Primary Use', a: 'Broad population screening', b: 'Individual fitness tracking and health assessment' }
    ]
  },
  {
    slug: 'personal-vs-business-loan',
    title: 'Personal vs. Business Loan',
    seoTitle: 'Personal vs Business Loan Calculator | Compare Financing Options',
    seoDescription: 'Compare personal loans and business loans. Decide which financing option is right for your startup, expansion, or personal needs.',
    toolA: 'personal-loan-calculator',
    toolB: 'business-loan-calculator',
    verdict: 'Business loans are better for established companies needing larger capital and wanting to protect personal credit. Personal loans are often the only option for brand new startups but put your personal assets on the line.',
    differences: [
      { label: 'Credit Check', a: 'Based purely on personal credit score', b: 'Based on business credit and revenue (plus personal guarantee)' },
      { label: 'Loan Amounts', a: 'Usually capped around $50,000 - $100,000', b: 'Can go up to $5M+ (SBA loans)' },
      { label: 'Approval Speed', a: 'Fast (Often within 24-48 hours)', b: 'Slower (Requires extensive documentation)' },
      { label: 'Liability', a: 'Personal liability', b: 'Business liability (though personal guarantee often required)' }
    ]
  }
];

export function getComparisonBySlug(slug: string): ComparisonDef | undefined {
  return comparisons.find(c => c.slug === slug);
}
