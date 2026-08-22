const fs = require('fs');
const c = fs.readFileSync('lib/data/calculators.ts', 'utf8');

// Extract all slugs
const slugMatches = c.matchAll(/slug:\s*["']([^"']+)["']/g);
const slugs = new Set([...slugMatches].map(m => m[1]));

// Check specific ones
const toCheck = [
  'zakat-calculator', 'potential-energy-calculator', 'electricity-cost-calculator',
  'force-calculator', 'molarity-calculator', 'ups-calculator', 'torque-calculator',
  'spannungsabfall-rechner', 'voltage-drop-calculator', 'enthalpy-calculator',
  'loan-calculator', 'rent-calculator', 'mole-calculator', 'investor-calculator'
];
toCheck.forEach(s => console.log(s, '->', slugs.has(s) ? 'EXISTS' : 'MISSING'));
