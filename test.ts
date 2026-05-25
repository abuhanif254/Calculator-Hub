import { getCalculatorBySlug } from './lib/data/calculators';

const slugs = [
  "401k-calculator", "annuity-calculator", "annuity-payout-calculator", "apr-calculator", "bond-calculator", "budget-calculator", "business-loan-calculator", "cash-back-vs-low-interest-calculator", "college-cost-calculator", "compound-interest-calculator", "concrete-calculator", "credit-cards-payoff", "currency-calculator", "date-calculator", "debt-consolidation-calculator", "debt-payoff-calculator", "debt-to-income-ratio-calculator", "depreciation-calculator", "down-payment-calculator", "due-date-calculator", "fha-loan-calculator", "gpa-calculator", "grade-calculator", "heloc-calculator", "hours-calculator", "house-affordability-calculator", "ideal-weight-calculator", "income-tax-calculator", "interest-calculator", "interest-rate-calculator", "investment-calculator", "irr-calculator", "lease-calculator", "margin-calculator", "marriage-tax-calculator", "mortgage-amortization-calculator", "mutual-fund-calculator", "ovulation-calculator", "p-value-calculator", "pace-calculator", "payment-calculator", "percent-off-calculator", "pregnancy-calculator", "pregnancy-conception-calculator", "random-number-generator", "real-estate-calculator", "rent-calculator", "rental-property-calculator", "retirement-calculator", "rmd-calculator", "roth-ira-calculator", "sales-tax-calculator", "scientific-notation-calculator", "simple-interest-calculator", "social-security-calculator", "standard-deviation-calculator", "statistics-calculator", "student-loan-calculator", "time-calculator", "triangle-calculator", "vat-calculator"
];

for (const slug of slugs) {
  if (!getCalculatorBySlug(slug)) {
    console.log(`${slug}: MISSING`);
  }
}
console.log("Check complete.");
