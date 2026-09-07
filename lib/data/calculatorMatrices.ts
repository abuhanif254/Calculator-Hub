// ═══════════════════════════════════════════════════════════════════════
// lib/data/calculatorMatrices.ts
// Structured comparison matrix tables for high-volume calculator queries.
// Pre-rendered in static HTML to capture Google SERP table snippets.
// ═══════════════════════════════════════════════════════════════════════

import { getCalculatorBySlug } from './calculators';

export interface MatrixRow {
  label: string;
  values: string[];
  params: Record<string, string>;
}

export interface CalculatorMatrixDef {
  slugs: string[];
  title: string;
  description: string;
  headers: string[];
  rows: MatrixRow[];
}

export const calculatorMatrices: CalculatorMatrixDef[] = [
  // ─── 1. MORTGAGE & AMORTIZATION MATRIX ──────────────────────────────────
  {
    slugs: [
      'mortgage-calculator',
      'amortization-calculator',
      'mortgage-amortization-calculator',
      'canadian-mortgage-calculator',
      'payment-calculator',
    ],
    title: 'Monthly Mortgage Payment Comparison Table (6.5% Fixed Rate)',
    description: 'Quick reference table comparing monthly principal & interest payments and total interest costs for common mortgage balances at 6.5% APR.',
    headers: ['Loan Amount', '15-Year Monthly', '15-Year Total Interest', '30-Year Monthly', '30-Year Total Interest'],
    rows: [
      {
        label: '$100,000',
        values: ['$871 / mo', '$56,799', '$632 / mo', '$127,544'],
        params: { home_value: '125000', down_payment: '25000', loan_amount: '100000', interest_rate: '6.5', loan_term: '30' },
      },
      {
        label: '$200,000',
        values: ['$1,742 / mo', '$113,598', '$1,264 / mo', '$255,089'],
        params: { home_value: '250000', down_payment: '50000', loan_amount: '200000', interest_rate: '6.5', loan_term: '30' },
      },
      {
        label: '$300,000',
        values: ['$2,613 / mo', '$170,397', '$1,896 / mo', '$382,634'],
        params: { home_value: '375000', down_payment: '75000', loan_amount: '300000', interest_rate: '6.5', loan_term: '30' },
      },
      {
        label: '$400,000',
        values: ['$3,484 / mo', '$227,197', '$2,528 / mo', '$510,178'],
        params: { home_value: '500000', down_payment: '100000', loan_amount: '400000', interest_rate: '6.5', loan_term: '30' },
      },
      {
        label: '$500,000',
        values: ['$4,356 / mo', '$283,996', '$3,160 / mo', '$637,723'],
        params: { home_value: '625000', down_payment: '125000', loan_amount: '500000', interest_rate: '6.5', loan_term: '30' },
      },
      {
        label: '$750,000',
        values: ['$6,533 / mo', '$425,994', '$4,741 / mo', '$956,584'],
        params: { home_value: '937500', down_payment: '187500', loan_amount: '750000', interest_rate: '6.5', loan_term: '30' },
      },
      {
        label: '$1,000,000',
        values: ['$8,711 / mo', '$567,992', '$6,321 / mo', '$1,275,445'],
        params: { home_value: '1250000', down_payment: '250000', loan_amount: '1000000', interest_rate: '6.5', loan_term: '30' },
      },
    ],
  },

  // ─── 2. AUTO LOAN MATRIX ────────────────────────────────────────────────
  {
    slugs: ['auto-loan-calculator', 'car-loan-calculator', 'boat-loan-calculator'],
    title: 'Auto Loan Monthly Payment Schedule (6.0% APR)',
    description: 'Estimated monthly car payments for standard vehicle financing amounts across 36, 48, 60, and 72-month terms at 6.0% interest.',
    headers: ['Vehicle Loan Amount', '36 Months (3 Yr)', '48 Months (4 Yr)', '60 Months (5 Yr)', '72 Months (6 Yr)'],
    rows: [
      {
        label: '$15,000',
        values: ['$456 / mo', '$352 / mo', '$290 / mo', '$249 / mo'],
        params: { vehicle_price: '18000', down_payment: '3000', loan_amount: '15000', interest_rate: '6.0', loan_term_months: '60' },
      },
      {
        label: '$25,000',
        values: ['$761 / mo', '$587 / mo', '$483 / mo', '$414 / mo'],
        params: { vehicle_price: '30000', down_payment: '5000', loan_amount: '25000', interest_rate: '6.0', loan_term_months: '60' },
      },
      {
        label: '$35,000',
        values: ['$1,065 / mo', '$822 / mo', '$677 / mo', '$580 / mo'],
        params: { vehicle_price: '42000', down_payment: '7000', loan_amount: '35000', interest_rate: '6.0', loan_term_months: '60' },
      },
      {
        label: '$50,000',
        values: ['$1,521 / mo', '$1,174 / mo', '$967 / mo', '$829 / mo'],
        params: { vehicle_price: '60000', down_payment: '10000', loan_amount: '50000', interest_rate: '6.0', loan_term_months: '60' },
      },
      {
        label: '$65,000',
        values: ['$1,977 / mo', '$1,527 / mo', '$1,257 / mo', '$1,077 / mo'],
        params: { vehicle_price: '78000', down_payment: '13000', loan_amount: '65000', interest_rate: '6.0', loan_term_months: '60' },
      },
    ],
  },

  // ─── 3. COMPOUND INTEREST & INVESTMENT MATRIX ───────────────────────────
  {
    slugs: [
      'compound-interest-calculator',
      'investment-calculator',
      'savings-calculator',
      'future-value-calculator',
      'average-return-calculator',
    ],
    title: 'Compound Interest Growth Table (8.0% Average Annual Return)',
    description: 'Projected investment value over 5, 10, 20, and 30 years with an 8.0% historical annualized market return compounded annually.',
    headers: ['Starting Deposit', 'After 5 Years', 'After 10 Years', 'After 20 Years', 'After 30 Years'],
    rows: [
      {
        label: '$5,000',
        values: ['$7,347', '$10,795', '$23,305', '$50,313'],
        params: { initial_deposit: '5000', annual_addition: '0', interest_rate: '8.0', years: '20' },
      },
      {
        label: '$10,000',
        values: ['$14,693', '$21,589', '$46,610', '$100,627'],
        params: { initial_deposit: '10000', annual_addition: '0', interest_rate: '8.0', years: '20' },
      },
      {
        label: '$25,000',
        values: ['$36,733', '$53,973', '$116,524', '$251,566'],
        params: { initial_deposit: '25000', annual_addition: '0', interest_rate: '8.0', years: '20' },
      },
      {
        label: '$50,000',
        values: ['$73,466', '$107,946', '$233,048', '$503,133'],
        params: { initial_deposit: '50000', annual_addition: '0', interest_rate: '8.0', years: '20' },
      },
      {
        label: '$100,000',
        values: ['$146,933', '$215,892', '$466,096', '$1,006,266'],
        params: { initial_deposit: '100000', annual_addition: '0', interest_rate: '8.0', years: '20' },
      },
    ],
  },

  // ─── 4. BODY MASS INDEX (BMI) MATRIX ────────────────────────────────────
  {
    slugs: ['bmi-calculator', 'healthy-weight-calculator', 'body-fat-calculator'],
    title: 'Adult BMI & Healthy Weight Matrix (WHO Standards)',
    description: 'Body Mass Index classification table across standard heights and weights according to World Health Organization criteria.',
    headers: ['Height', 'Underweight (<18.5)', 'Normal Weight (18.5–24.9)', 'Overweight (25–29.9)', 'Obese (≥30.0)'],
    rows: [
      {
        label: '5\'4" (163 cm)',
        values: ['Under 108 lbs', '108 – 145 lbs', '146 – 174 lbs', '175+ lbs'],
        params: { height_feet: '5', height_inches: '4', weight_lbs: '130' },
      },
      {
        label: '5\'7" (170 cm)',
        values: ['Under 118 lbs', '118 – 159 lbs', '160 – 191 lbs', '192+ lbs'],
        params: { height_feet: '5', height_inches: '7', weight_lbs: '145' },
      },
      {
        label: '5\'10" (178 cm)',
        values: ['Under 129 lbs', '129 – 174 lbs', '175 – 209 lbs', '210+ lbs'],
        params: { height_feet: '5', height_inches: '10', weight_lbs: '160' },
      },
      {
        label: '6\'1" (185 cm)',
        values: ['Under 140 lbs', '140 – 189 lbs', '190 – 227 lbs', '228+ lbs'],
        params: { height_feet: '6', height_inches: '1', weight_lbs: '175' },
      },
    ],
  },

  // ─── 5. DEBT-TO-INCOME (DTI) MATRIX ─────────────────────────────────────
  {
    slugs: ['debt-to-income-ratio-calculator', 'dti-calculator'],
    title: 'Debt-to-Income (DTI) Benchmark Table',
    description: 'Benchmark ratio matrix evaluating mortgage qualification feasibility based on monthly income and recurring minimum debt payments.',
    headers: ['Gross Monthly Income', 'Excellent (<20%)', 'Manageable (20–35%)', 'Maximum Lending (36–43%)', 'High Risk (>43%)'],
    rows: [
      {
        label: '$4,000 / mo',
        values: ['<$800 / mo', '$800 – $1,400', '$1,440 – $1,720', '>$1,720 / mo'],
        params: { monthly_income: '4000', monthly_debt: '1200' },
      },
      {
        label: '$6,000 / mo',
        values: ['<$1,200 / mo', '$1,200 – $2,100', '$2,160 – $2,580', '>$2,580 / mo'],
        params: { monthly_income: '6000', monthly_debt: '1800' },
      },
      {
        label: '$8,000 / mo',
        values: ['<$1,600 / mo', '$1,600 – $2,800', '$2,880 – $3,440', '>$3,440 / mo'],
        params: { monthly_income: '8000', monthly_debt: '2400' },
      },
      {
        label: '$10,000 / mo',
        values: ['<$2,000 / mo', '$2,000 – $3,500', '$3,600 – $4,300', '>$4,300 / mo'],
        params: { monthly_income: '10000', monthly_debt: '3000' },
      },
    ],
  },
];

/**
 * Retrieve matrix definition for a specific calculator slug
 */
export function getMatrixForCalculator(slug: string): CalculatorMatrixDef | undefined {
  const direct = calculatorMatrices.find((m) => m.slugs.includes(slug));
  if (direct) return direct;

  // Fallback to parent calculator matrix for programmatic presets
  const calc = getCalculatorBySlug(slug);
  if (calc?.parentSlug) {
    return calculatorMatrices.find((m) => m.slugs.includes(calc.parentSlug!));
  }
  return undefined;
}
