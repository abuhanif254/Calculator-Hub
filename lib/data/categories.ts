// ═══════════════════════════════════════════════════════
// CATEGORY DEFINITIONS
// ═══════════════════════════════════════════════════════
// Central registry of calculator categories with metadata
// for SEO pillar pages, navigation, and sitemap generation.
// ═══════════════════════════════════════════════════════

export interface CategoryDef {
  id: string;           // URL slug (used in /calculators/[category])
  title: string;        // Display name
  dbCategory: string[]; // Matches the `category` field in CalculatorDef
  description: string;  // Short description for nav/cards
  icon: string;         // Lucide icon name
  seoTitle: string;     // Page <title>
  seoDescription: string; // Meta description
  pillarContent: string;  // Long-form SEO content (markdown)
}

export const categories: CategoryDef[] = [
  {
    id: 'financial',
    title: 'Financial Calculators',
    dbCategory: ['Financial'],
    description: 'Mortgage, loan, investment, retirement, tax, and budgeting tools.',
    icon: 'DollarSign',
    seoTitle: 'Financial Calculators | Free Mortgage, Loan & Investment Tools',
    seoDescription: 'Explore 50+ free financial calculators for mortgages, loans, investments, retirement planning, taxes, and budgeting. Make smarter financial decisions with NexusCalculator.',
    pillarContent: `## Financial Calculators

Managing your finances effectively starts with the right tools. Our collection of **50+ financial calculators** covers every aspect of personal and business finance — from computing monthly mortgage payments to projecting retirement savings.

### Mortgage & Housing
Whether you're a first-time homebuyer or refinancing, our mortgage calculators help you understand your monthly payments, amortization schedules, and how much house you can afford. Use the **House Affordability Calculator** to determine your budget based on income and DTI ratios.

### Loans & Debt
Evaluate auto loans, student loans, personal loans, and business loans with precise payment schedules. Our **Debt Payoff Calculator** and **Debt Consolidation Calculator** help you build a strategy to become debt-free faster.

### Investments & Retirement
Plan for the future with compound interest projections, IRR analysis, 401(k) modeling, and Roth IRA comparisons. The **Retirement Calculator** provides a comprehensive projection of your financial readiness.

### Taxes & Income
Calculate federal income tax, sales tax, VAT, marriage tax implications, and estate taxes. Our **Salary Calculator** helps you understand your take-home pay after all deductions.

All calculations run **entirely in your browser** — your financial data is never stored or transmitted to any server.`
  },
  {
    id: 'health',
    title: 'Health & Fitness Calculators',
    dbCategory: ['Health', 'Health & Fitness', 'Sports'],
    description: 'BMI, calorie, body fat, pregnancy, and fitness tracking tools.',
    icon: 'Heart',
    seoTitle: 'Health & Fitness Calculators | BMI, Calorie & Body Fat Tools',
    seoDescription: 'Free health and fitness calculators including BMI, calorie counter, body fat percentage, BMR, pregnancy due date, and ovulation calculators.',
    pillarContent: `## Health & Fitness Calculators

Take control of your health journey with our suite of **medical-grade calculators** designed for accuracy and privacy. From body composition analysis to pregnancy planning, every tool runs locally in your browser.

### Body Composition
Use the **BMI Calculator** for a quick assessment, then dive deeper with **Body Fat Calculator** and **Ideal Weight Calculator** for a comprehensive body composition analysis. Our **BMR Calculator** reveals your basal metabolic rate — the foundation for any nutrition plan.

### Nutrition & Fitness
The **Calorie Calculator** helps you determine daily intake targets based on your goals. Whether you're cutting, bulking, or maintaining, pair it with the **Pace Calculator** for exercise planning.

### Pregnancy & Fertility
Plan your pregnancy journey with our **Ovulation Calculator**, **Pregnancy Calculator**, and **Due Date Calculator**. The **Pregnancy Conception Calculator** helps pinpoint key dates for family planning.

All health calculations use clinically validated formulas. However, always consult a healthcare professional for medical decisions.`
  },
  {
    id: 'math',
    title: 'Math & Science Calculators',
    dbCategory: ['Math'],
    description: 'Scientific, graphing, statistics, fractions, and geometry tools.',
    icon: 'Sigma',
    seoTitle: 'Math Calculators | Scientific, Graphing & Statistics Tools',
    seoDescription: 'Free online math calculators including scientific calculator, graphing calculator, statistics tools, fraction calculator, and geometry calculators.',
    pillarContent: `## Math & Science Calculators

From basic arithmetic to advanced statistical analysis, our math calculators provide **precise, interactive tools** for students, engineers, and researchers.

### Advanced Computation
The **Scientific Calculator** offers trigonometric, logarithmic, and exponential functions. For visual learners, the **Graphing Calculator** plots equations in real-time with interactive zoom and pan.

### Statistics & Probability
Analyze datasets with the **Statistics Calculator**, compute **Standard Deviation**, run **P-Value** hypothesis tests, and generate random numbers for simulations.

### Algebra & Geometry
Solve fractions, compute percentages, analyze triangles, and work with scientific notation. Every calculator shows step-by-step breakdowns where applicable.

All tools support **keyboard shortcuts** for rapid input and are optimized for both desktop and mobile use.`
  },
  {
    id: 'other',
    title: 'Utility Calculators',
    dbCategory: ['Other'],
    description: 'Date, time, age, GPA, networking, conversion, and more.',
    icon: 'Wrench',
    seoTitle: 'Utility Calculators | Date, Time, GPA & Conversion Tools',
    seoDescription: 'Free utility calculators including age calculator, date calculator, GPA calculator, subnet calculator, unit converter, and password generator.',
    pillarContent: `## Utility Calculators

Everyday calculations made simple. Our utility tools cover **date and time**, **education**, **networking**, and **unit conversions**.

### Date & Time
Calculate your exact age with the **Age Calculator**, find the difference between dates, convert time zones, and track work hours with precision.

### Education
The **GPA Calculator** supports weighted and unweighted scales for high school and college. The **Grade Calculator** helps you determine what you need on your final exam.

### Networking & Security
The **Subnet Calculator** handles IPv4 CIDR notation for network engineers. The **Password Generator** creates cryptographically strong passwords with customizable rules.

### Conversions
Convert between units of measurement, currencies, and number systems. Our **Conversion Calculator** supports hundreds of unit pairs across length, weight, volume, and temperature.`
  }
];

export function getCategoryById(id: string): CategoryDef | undefined {
  return categories.find(c => c.id === id);
}

export function getCategoryForCalculator(calcCategory: string): CategoryDef | undefined {
  return categories.find(c => c.dbCategory.includes(calcCategory));
}
