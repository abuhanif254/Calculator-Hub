import { calculators } from './lib/data/calculators';

const targetSlugs = [
  'income-tax-calculator',
  'salary-calculator',
  'investment-calculator',
  'retirement-calculator',
  'inflation-calculator',
  'vat-calculator'
];

calculators.forEach(calc => {
  if (targetSlugs.includes(calc.slug)) {
    console.log(`\nSlug: ${calc.slug}`);
    console.log(`Slugs mapping:`, JSON.stringify(calc.slugs, null, 2));
  }
});
