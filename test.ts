import { getCalculatorBySlug } from './lib/data/calculators';

const slugs = [
  "annuity-payout-calculator",
  "401k-calculator",
  "annuity-calculator"
];

for (const slug of slugs) {
  console.log(`${slug}: ${getCalculatorBySlug(slug) ? "EXISTS" : "MISSING"}`);
}
