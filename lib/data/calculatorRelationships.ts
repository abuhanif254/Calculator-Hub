// ═══════════════════════════════════════════════════════
// CALCULATOR SEMANTIC RELATIONSHIP GRAPH
// ═══════════════════════════════════════════════════════
// Maps each calculator slug to its semantically related calculators.
// Used by:
//   - Category landing pages for "Related Tools" sidebar
//   - Individual calculator pages for "You may also like"
//   - Internal linking for SEO PageRank distribution
//   - Future recommendation engine
//
// Rules for adding relationships:
//   1. Each calculator should have 3-8 related entries
//   2. Relationships should be SEMANTIC, not just same-category
//   3. Bidirectional: if A relates to B, B should relate to A
// ═══════════════════════════════════════════════════════

export const calculatorRelationships: Record<string, string[]> = {
  // ─── Financial: Mortgage & Housing ───────────────
  'mortgage-calculator': [
    'amortization-calculator', 'house-affordability-calculator', 'down-payment-calculator',
    'fha-loan-calculator', 'va-mortgage-calculator', 'mortgage-amortization-calculator', 'loan-calculator',
    'interest-rate-calculator', 'rent-calculator', 'rent-vs-buy-calculator', 'commission-calculator',
    'mortgage-payoff-calculator'
  ],
  'canadian-mortgage-calculator': [
    'mortgage-calculator', 'amortization-calculator', 'house-affordability-calculator',
    'down-payment-calculator', 'interest-rate-calculator'
  ],
  'amortization-calculator': [
    'mortgage-calculator', 'mortgage-amortization-calculator', 'loan-calculator',
    'payment-calculator', 'interest-calculator', 'compound-interest-calculator', 'rent-vs-buy-calculator',
    'mortgage-payoff-calculator'
  ],
  'mortgage-amortization-calculator': [
    'amortization-calculator', 'mortgage-calculator', 'loan-calculator',
    'payment-calculator', 'house-affordability-calculator', 'mortgage-payoff-calculator'
  ],
  'house-affordability-calculator': [
    'mortgage-calculator', 'rent-calculator', 'down-payment-calculator',
    'debt-to-income-ratio-calculator', 'fha-loan-calculator', 'va-mortgage-calculator', 'income-tax-calculator',
    'rent-vs-buy-calculator', 'mortgage-payoff-calculator'
  ],
  'down-payment-calculator': [
    'mortgage-calculator', 'house-affordability-calculator', 'fha-loan-calculator',
    'va-mortgage-calculator', 'loan-calculator', 'savings-calculator'
  ],
  'fha-loan-calculator': [
    'mortgage-calculator', 'down-payment-calculator', 'house-affordability-calculator',
    'va-mortgage-calculator', 'loan-calculator', 'apr-calculator'
  ],
  'va-mortgage-calculator': [
    'mortgage-calculator', 'house-affordability-calculator', 'fha-loan-calculator',
    'loan-calculator', 'down-payment-calculator', 'mortgage-amortization-calculator', 'rent-vs-buy-calculator',
    'mortgage-payoff-calculator'
  ],
  'rent-calculator': [
    'mortgage-calculator', 'house-affordability-calculator', 'budget-calculator',
    'income-tax-calculator', 'salary-calculator', 'rent-vs-buy-calculator'
  ],
  'rental-property-calculator': [
    'real-estate-calculator', 'mortgage-calculator', 'irr-calculator',
    'investment-calculator', 'depreciation-calculator'
  ],
  'real-estate-calculator': [
    'rental-property-calculator', 'mortgage-calculator', 'irr-calculator',
    'investment-calculator', 'estate-tax-calculator', 'commission-calculator'
  ],
  'heloc-calculator': [
    'mortgage-calculator', 'loan-calculator', 'interest-rate-calculator',
    'apr-calculator', 'house-affordability-calculator'
  ],
  'rent-vs-buy-calculator': [
    'mortgage-calculator', 'house-affordability-calculator', 'investment-calculator',
    'amortization-calculator', 'va-mortgage-calculator', 'rent-calculator', 'mortgage-payoff-calculator'
  ],
  'mortgage-payoff-calculator': [
    'mortgage-calculator', 'mortgage-amortization-calculator', 'amortization-calculator',
    'house-affordability-calculator', 'rent-vs-buy-calculator', 'va-mortgage-calculator'
  ],

  // ─── Financial: Loans ────────────────────────────
  'loan-calculator': [
    'mortgage-calculator', 'auto-loan-calculator', 'personal-loan-calculator',
    'student-loan-calculator', 'payment-calculator', 'interest-calculator', 'commission-calculator',
    'cd-calculator', 'tip-calculator', 'zakat-calculator'
  ],
  'auto-loan-calculator': [
    'loan-calculator', 'payment-calculator', 'interest-calculator',
    'lease-calculator', 'depreciation-calculator'
  ],
  'personal-loan-calculator': [
    'loan-calculator', 'debt-consolidation-calculator', 'interest-rate-calculator',
    'apr-calculator', 'payment-calculator'
  ],
  'student-loan-calculator': [
    'loan-calculator', 'college-cost-calculator', 'debt-payoff-calculator',
    'payment-calculator', 'simple-interest-calculator'
  ],
  'business-loan-calculator': [
    'loan-calculator', 'irr-calculator', 'margin-calculator',
    'apr-calculator', 'payment-calculator'
  ],
  'boat-loan-calculator': [
    'auto-loan-calculator', 'loan-calculator', 'payment-calculator',
    'interest-calculator', 'apr-calculator'
  ],
  'lease-calculator': [
    'auto-loan-calculator', 'loan-calculator', 'payment-calculator',
    'depreciation-calculator', 'finance-calculator'
  ],

  // ─── Financial: Interest & Savings ───────────────
  'interest-calculator': [
    'compound-interest-calculator', 'simple-interest-calculator',
    'interest-rate-calculator', 'loan-calculator', 'savings-calculator', 'cd-calculator'
  ],
  'compound-interest-calculator': [
    'simple-interest-calculator', 'interest-calculator', 'investment-calculator',
    'savings-calculator', 'future-value-calculator', 'cd-calculator', 'zakat-calculator'
  ],
  'simple-interest-calculator': [
    'compound-interest-calculator', 'interest-calculator', 'loan-calculator',
    'interest-rate-calculator', 'present-value-calculator'
  ],
  'interest-rate-calculator': [
    'interest-calculator', 'apr-calculator', 'compound-interest-calculator',
    'loan-calculator', 'mortgage-calculator', 'cd-calculator'
  ],
  'savings-calculator': [
    'compound-interest-calculator', 'investment-calculator', 'retirement-calculator',
    'future-value-calculator', 'budget-calculator', 'interest-calculator',
    'interest-rate-calculator', 'college-cost-calculator', 'cd-calculator'
  ],
  'apr-calculator': [
    'interest-rate-calculator', 'loan-calculator', 'mortgage-calculator',
    'credit-cards-payoff', 'personal-loan-calculator'
  ],

  // ─── Financial: Investment & Retirement ──────────
  'investment-calculator': [
    'compound-interest-calculator', 'irr-calculator', 'retirement-calculator',
    'mutual-fund-calculator', 'average-return-calculator', 'future-value-calculator', 'rent-vs-buy-calculator',
    'commission-calculator', 'cd-calculator', 'zakat-calculator'
  ],
  'irr-calculator': [
    'investment-calculator', 'real-estate-calculator', 'finance-calculator',
    'present-value-calculator', 'average-return-calculator'
  ],
  'retirement-calculator': [
    '401k-calculator', 'roth-ira-calculator', 'investment-calculator',
    'annuity-calculator', 'social-security-calculator', 'pension-calculator', 'cd-calculator'
  ],
  '401k-calculator': [
    'retirement-calculator', 'roth-ira-calculator', 'investment-calculator',
    'compound-interest-calculator', 'rmd-calculator'
  ],
  'roth-ira-calculator': [
    '401k-calculator', 'retirement-calculator', 'investment-calculator',
    'income-tax-calculator', 'rmd-calculator'
  ],
  'rmd-calculator': [
    '401k-calculator', 'roth-ira-calculator', 'retirement-calculator',
    'annuity-calculator', 'investment-calculator'
  ],
  'annuity-calculator': [
    'annuity-payout-calculator', 'retirement-calculator', 'present-value-calculator',
    'future-value-calculator', 'investment-calculator'
  ],
  'annuity-payout-calculator': [
    'annuity-calculator', 'retirement-calculator', 'present-value-calculator',
    'social-security-calculator', 'pension-calculator'
  ],
  'mutual-fund-calculator': [
    'investment-calculator', 'compound-interest-calculator', 'average-return-calculator',
    'irr-calculator', 'future-value-calculator'
  ],
  'bond-calculator': [
    'investment-calculator', 'interest-rate-calculator', 'present-value-calculator',
    'future-value-calculator', 'compound-interest-calculator', 'cd-calculator'
  ],
  'average-return-calculator': [
    'investment-calculator', 'irr-calculator', 'mutual-fund-calculator',
    'compound-interest-calculator', 'future-value-calculator'
  ],
  'future-value-calculator': [
    'present-value-calculator', 'compound-interest-calculator', 'investment-calculator',
    'annuity-calculator', 'savings-calculator'
  ],
  'present-value-calculator': [
    'future-value-calculator', 'irr-calculator', 'bond-calculator',
    'annuity-calculator', 'compound-interest-calculator'
  ],
  'finance-calculator': [
    'loan-calculator', 'investment-calculator', 'compound-interest-calculator',
    'present-value-calculator', 'irr-calculator'
  ],

  // ─── Financial: Tax & Income ─────────────────────
  'income-tax-calculator': [
    'salary-calculator', 'sales-tax-calculator', 'marriage-tax-calculator',
    'estate-tax-calculator', 'vat-calculator', 'roth-ira-calculator', 'commission-calculator'
  ],
  'salary-calculator': [
    'income-tax-calculator', 'budget-calculator', 'social-security-calculator',
    'retirement-calculator', 'debt-to-income-ratio-calculator', 'commission-calculator'
  ],
  'sales-tax-calculator': [
    'income-tax-calculator', 'vat-calculator', 'percent-off-calculator',
    'margin-calculator', 'inflation-calculator', 'commission-calculator', 'tip-calculator'
  ],
  'vat-calculator': [
    'sales-tax-calculator', 'income-tax-calculator', 'margin-calculator',
    'percent-off-calculator', 'inflation-calculator', 'tip-calculator'
  ],
  'marriage-tax-calculator': [
    'income-tax-calculator', 'salary-calculator', 'estate-tax-calculator',
    'budget-calculator', 'social-security-calculator'
  ],
  'estate-tax-calculator': [
    'income-tax-calculator', 'marriage-tax-calculator', 'real-estate-calculator',
    'investment-calculator', 'depreciation-calculator'
  ],
  'social-security-calculator': [
    'retirement-calculator', 'salary-calculator', 'annuity-payout-calculator',
    'income-tax-calculator', 'budget-calculator'
  ],
  'commission-calculator': [
    'margin-calculator', 'sales-tax-calculator', 'income-tax-calculator',
    'salary-calculator', 'investment-calculator', 'loan-calculator',
    'real-estate-calculator'
  ],

  // ─── Financial: Debt ─────────────────────────────
  'debt-payoff-calculator': [
    'debt-consolidation-calculator', 'credit-cards-payoff', 'loan-calculator',
    'payment-calculator', 'student-loan-calculator'
  ],
  'debt-consolidation-calculator': [
    'debt-payoff-calculator', 'personal-loan-calculator', 'credit-cards-payoff',
    'interest-rate-calculator', 'payment-calculator'
  ],
  'credit-cards-payoff': [
    'debt-payoff-calculator', 'debt-consolidation-calculator', 'apr-calculator',
    'interest-calculator', 'budget-calculator'
  ],
  'debt-to-income-ratio-calculator': [
    'house-affordability-calculator', 'salary-calculator', 'budget-calculator',
    'mortgage-calculator', 'loan-calculator'
  ],

  // ─── Financial: Budget & Other ───────────────────
  'budget-calculator': [
    'salary-calculator', 'income-tax-calculator', 'debt-to-income-ratio-calculator',
    'rent-calculator', 'retirement-calculator', 'cd-calculator'
  ],
  'payment-calculator': [
    'loan-calculator', 'mortgage-calculator', 'amortization-calculator',
    'auto-loan-calculator', 'interest-calculator'
  ],
  'inflation-calculator': [
    'compound-interest-calculator', 'investment-calculator', 'salary-calculator',
    'present-value-calculator', 'future-value-calculator'
  ],
  'margin-calculator': [
    'sales-tax-calculator', 'percent-off-calculator', 'finance-calculator',
    'business-loan-calculator', 'vat-calculator', 'commission-calculator'
  ],
  'percent-off-calculator': [
    'margin-calculator', 'sales-tax-calculator', 'percentage-calculator',
    'vat-calculator', 'inflation-calculator', 'tip-calculator'
  ],
  'depreciation-calculator': [
    'lease-calculator', 'auto-loan-calculator', 'real-estate-calculator',
    'investment-calculator', 'rental-property-calculator'
  ],
  'cash-back-vs-low-interest-calculator': [
    'apr-calculator', 'credit-cards-payoff', 'interest-rate-calculator',
    'auto-loan-calculator', 'loan-calculator'
  ],
  'college-cost-calculator': [
    'student-loan-calculator', 'savings-calculator', 'budget-calculator',
    'compound-interest-calculator', 'investment-calculator'
  ],
  'tip-calculator': [
    'sales-tax-calculator', 'vat-calculator', 'percent-off-calculator',
    'percentage-calculator', 'currency-calculator', 'loan-calculator'
  ],
  'zakat-calculator': [
    'percentage-calculator', 'investment-calculator', 'compound-interest-calculator',
    'currency-calculator', 'loan-calculator'
  ],
  'projectile-motion-calculator': [
    'velocity-calculator', 'acceleration-calculator', 'force-calculator',
    'momentum-calculator', 'kinetic-energy-calculator', 'potential-energy-calculator',
    'free-fall-calculator', 'work-calculator', 'power-calculator'
  ],
  'velocity-calculator': [
    'acceleration-calculator', 'distance-calculator', 'time-calculator',
    'projectile-motion-calculator', 'force-calculator', 'momentum-calculator',
    'kinetic-energy-calculator', 'free-fall-calculator'
  ],
  'acceleration-calculator': [
    'velocity-calculator', 'projectile-motion-calculator', 'force-calculator',
    'momentum-calculator', 'kinetic-energy-calculator', 'potential-energy-calculator',
    'free-fall-calculator', 'work-calculator', 'power-calculator'
  ],
  'force-calculator': [
    'acceleration-calculator', 'velocity-calculator', 'momentum-calculator',
    'kinetic-energy-calculator', 'potential-energy-calculator', 'work-calculator',
    'power-calculator', 'pressure-calculator', 'projectile-motion-calculator'
  ],
  'momentum-calculator': [
    'velocity-calculator', 'acceleration-calculator', 'force-calculator',
    'projectile-motion-calculator', 'kinetic-energy-calculator', 'potential-energy-calculator',
    'work-calculator', 'power-calculator', 'free-fall-calculator'
  ],
  'kinetic-energy-calculator': [
    'velocity-calculator', 'acceleration-calculator', 'force-calculator',
    'momentum-calculator', 'potential-energy-calculator', 'work-calculator',
    'power-calculator', 'projectile-motion-calculator', 'free-fall-calculator'
  ],
  'potential-energy-calculator': [
    'kinetic-energy-calculator', 'velocity-calculator', 'acceleration-calculator',
    'force-calculator', 'momentum-calculator', 'work-calculator',
    'power-calculator', 'projectile-motion-calculator', 'free-fall-calculator'
  ],
  'free-fall-calculator': [
    'projectile-motion-calculator', 'velocity-calculator', 'acceleration-calculator',
    'force-calculator', 'momentum-calculator', 'kinetic-energy-calculator',
    'potential-energy-calculator', 'work-calculator', 'power-calculator'
  ],
  'work-calculator': [
    'force-calculator', 'power-calculator', 'kinetic-energy-calculator',
    'potential-energy-calculator', 'momentum-calculator', 'velocity-calculator',
    'acceleration-calculator', 'free-fall-calculator', 'projectile-motion-calculator'
  ],
  'power-calculator': [
    'work-calculator', 'force-calculator', 'velocity-calculator',
    'acceleration-calculator', 'momentum-calculator', 'kinetic-energy-calculator',
    'potential-energy-calculator', 'free-fall-calculator', 'projectile-motion-calculator'
  ],
  'density-calculator': [
    'force-calculator', 'potential-energy-calculator', 'kinetic-energy-calculator',
    'work-calculator', 'power-calculator', 'momentum-calculator',
    'velocity-calculator', 'acceleration-calculator', 'free-fall-calculator'
  ],
  'weight-calculator': [
    'force-calculator', 'density-calculator', 'potential-energy-calculator',
    'kinetic-energy-calculator', 'work-calculator', 'power-calculator',
    'momentum-calculator', 'velocity-calculator', 'acceleration-calculator', 'free-fall-calculator'
  ],
  'ohms-law-calculator': [
    'power-calculator', 'force-calculator', 'density-calculator',
    'weight-calculator', 'work-calculator', 'potential-energy-calculator',
    'kinetic-energy-calculator', 'momentum-calculator', 'velocity-calculator'
  ],
  'voltage-calculator': [
    'ohms-law-calculator', 'power-calculator', 'force-calculator',
    'density-calculator', 'weight-calculator', 'work-calculator',
    'potential-energy-calculator', 'kinetic-energy-calculator', 'momentum-calculator'
  ],
  'current-calculator': [
    'voltage-calculator', 'ohms-law-calculator', 'power-calculator',
    'force-calculator', 'density-calculator', 'weight-calculator',
    'work-calculator', 'potential-energy-calculator', 'kinetic-energy-calculator'
  ],
  'resistance-calculator': [
    'current-calculator', 'voltage-calculator', 'ohms-law-calculator',
    'power-calculator', 'force-calculator', 'density-calculator',
    'weight-calculator', 'work-calculator', 'potential-energy-calculator'
  ],
  'electrical-power-calculator': [
    'resistance-calculator', 'current-calculator', 'voltage-calculator',
    'ohms-law-calculator', 'power-calculator', 'force-calculator',
    'density-calculator', 'weight-calculator', 'work-calculator'
  ],
  'electrical-energy-calculator': [
    'electrical-power-calculator', 'resistance-calculator', 'current-calculator',
    'voltage-calculator', 'ohms-law-calculator', 'power-calculator',
    'force-calculator', 'density-calculator', 'weight-calculator'
  ],
  'voltage-drop-calculator': [
    'electrical-energy-calculator', 'electrical-power-calculator', 'resistance-calculator',
    'current-calculator', 'voltage-calculator', 'ohms-law-calculator',
    'power-calculator', 'force-calculator', 'density-calculator'
  ],
  'wire-resistance-calculator': [
    'voltage-drop-calculator', 'electrical-energy-calculator', 'electrical-power-calculator',
    'resistance-calculator', 'current-calculator', 'voltage-calculator',
    'ohms-law-calculator', 'power-calculator', 'force-calculator'
  ],
  'electricity-cost-calculator': [
    'electrical-energy-calculator', 'electrical-power-calculator', 'voltage-drop-calculator',
    'wire-resistance-calculator', 'resistance-calculator', 'current-calculator',
    'voltage-calculator', 'ohms-law-calculator', 'power-calculator'
  ],
  'led-resistor-calculator': [
    'ohms-law-calculator', 'voltage-calculator', 'current-calculator',
    'resistance-calculator', 'electrical-power-calculator', 'electricity-cost-calculator',
    'wire-resistance-calculator', 'voltage-drop-calculator', 'electrical-energy-calculator'
  ],
  'power-supply-calculator': [
    'electrical-power-calculator', 'electrical-energy-calculator', 'ohms-law-calculator',
    'voltage-calculator', 'current-calculator', 'resistance-calculator',
    'led-resistor-calculator', 'voltage-drop-calculator', 'electricity-cost-calculator'
  ],
  'power-factor-calculator': [
    'electrical-power-calculator', 'power-supply-calculator', 'electrical-energy-calculator',
    'ohms-law-calculator', 'voltage-calculator', 'current-calculator',
    'resistance-calculator', 'voltage-drop-calculator', 'wire-resistance-calculator', 'electricity-cost-calculator'
  ],
  'battery-runtime-calculator': [
    'power-supply-calculator', 'power-factor-calculator', 'electrical-power-calculator',
    'electrical-energy-calculator', 'ohms-law-calculator', 'voltage-calculator',
    'current-calculator', 'resistance-calculator', 'voltage-drop-calculator', 'wire-resistance-calculator', 'electricity-cost-calculator'
  ],
  'ups-calculator': [
    'battery-runtime-calculator', 'power-supply-calculator', 'power-factor-calculator',
    'electrical-power-calculator', 'electrical-energy-calculator', 'ohms-law-calculator',
    'voltage-calculator', 'current-calculator', 'resistance-calculator', 'voltage-drop-calculator', 'wire-resistance-calculator', 'electricity-cost-calculator'
  ],
  'inverter-calculator': [
    'ups-calculator', 'battery-runtime-calculator', 'power-supply-calculator',
    'power-factor-calculator', 'electrical-power-calculator', 'electrical-energy-calculator',
    'ohms-law-calculator', 'voltage-calculator', 'current-calculator',
    'resistance-calculator', 'voltage-drop-calculator', 'wire-resistance-calculator', 'electricity-cost-calculator'
  ],
  'solar-panel-calculator': [
    'inverter-calculator', 'ups-calculator', 'battery-runtime-calculator',
    'electricity-cost-calculator', 'power-supply-calculator', 'power-factor-calculator',
    'electrical-power-calculator', 'electrical-energy-calculator', 'ohms-law-calculator',
    'voltage-calculator', 'current-calculator', 'resistance-calculator',
    'voltage-drop-calculator', 'wire-resistance-calculator'
  ],
  'molarity-calculator': [
    'mole-calculator', 'molality-calculator', 'solar-panel-calculator',
    'inverter-calculator', 'battery-runtime-calculator', 'electricity-cost-calculator'
  ],
  'molality-calculator': [
    'mole-calculator', 'molarity-calculator', 'solar-panel-calculator',
    'inverter-calculator', 'battery-runtime-calculator', 'electricity-cost-calculator'
  ],
  'mole-calculator': [
    'molar-mass-calculator', 'molarity-calculator', 'molality-calculator',
    'solar-panel-calculator', 'inverter-calculator', 'battery-runtime-calculator'
  ],
  'molar-mass-calculator': [
    'percent-composition-calculator', 'mole-calculator', 'molarity-calculator',
    'molality-calculator', 'solar-panel-calculator', 'inverter-calculator'
  ],
  'percent-composition-calculator': [
    'molarity-dilution-calculator', 'molar-mass-calculator', 'mole-calculator',
    'molarity-calculator', 'molality-calculator', 'solar-panel-calculator'
  ],
  'molarity-dilution-calculator': [
    'dilution-calculator', 'molarity-calculator', 'molality-calculator',
    'mole-calculator', 'molar-mass-calculator', 'percent-composition-calculator'
  ],
  'dilution-calculator': [
    'stoichiometry-calculator', 'molarity-dilution-calculator', 'molarity-calculator',
    'molality-calculator', 'mole-calculator', 'molar-mass-calculator'
  ],
  'stoichiometry-calculator': [
    'empirical-formula-calculator', 'mole-calculator', 'molar-mass-calculator',
    'molarity-calculator', 'molality-calculator', 'percent-composition-calculator'
  ],
  'empirical-formula-calculator': [
    'molecular-formula-calculator', 'percent-composition-calculator', 'molar-mass-calculator',
    'mole-calculator', 'stoichiometry-calculator', 'molarity-calculator'
  ],
  'molecular-formula-calculator': [
    'balancing-chemical-equations-calculator', 'empirical-formula-calculator', 'molar-mass-calculator',
    'percent-composition-calculator', 'mole-calculator', 'stoichiometry-calculator'
  ],
  'balancing-chemical-equations-calculator': [
    'ph-calculator', 'stoichiometry-calculator', 'molecular-formula-calculator',
    'empirical-formula-calculator', 'molar-mass-calculator', 'molarity-calculator'
  ],
  'ph-calculator': [
    'poh-calculator', 'molarity-calculator', 'dilution-calculator',
    'molarity-dilution-calculator', 'stoichiometry-calculator', 'balancing-chemical-equations-calculator'
  ],
  'poh-calculator': [
    'pka-calculator', 'ph-calculator', 'molarity-calculator',
    'dilution-calculator', 'molarity-dilution-calculator', 'stoichiometry-calculator'
  ],
  'pka-calculator': [
    'henderson-hasselbalch-equation-calculator', 'ph-calculator', 'poh-calculator',
    'molarity-calculator', 'dilution-calculator', 'stoichiometry-calculator'
  ],
  'henderson-hasselbalch-equation-calculator': [
    'buffer-calculator', 'pka-calculator', 'ph-calculator',
    'poh-calculator', 'molarity-calculator', 'dilution-calculator'
  ],
  'buffer-calculator': [
    'acid-base-calculator', 'henderson-hasselbalch-equation-calculator', 'pka-calculator',
    'ph-calculator', 'poh-calculator', 'molarity-calculator'
  ],
  'acid-base-calculator': [
    'ka-calculator', 'buffer-calculator', 'henderson-hasselbalch-equation-calculator',
    'pka-calculator', 'ph-calculator', 'poh-calculator'
  ],
  'ka-calculator': [
    'kb-calculator', 'pka-calculator', 'acid-base-calculator', 'buffer-calculator',
    'henderson-hasselbalch-equation-calculator', 'ph-calculator', 'poh-calculator'
  ],
  'kb-calculator': [
    'equilibrium-constant-calculator', 'ka-calculator', 'pka-calculator', 'acid-base-calculator',
    'buffer-calculator', 'henderson-hasselbalch-equation-calculator'
  ],
  'equilibrium-constant-calculator': [
    'ksp-calculator', 'ka-calculator', 'kb-calculator', 'acid-base-calculator',
    'buffer-calculator', 'henderson-hasselbalch-equation-calculator'
  ],
  'ksp-calculator': [
    'solubility-calculator', 'equilibrium-constant-calculator', 'ka-calculator', 'kb-calculator',
    'acid-base-calculator', 'buffer-calculator'
  ],
  'solubility-calculator': [
    'nernst-equation-calculator', 'ksp-calculator', 'equilibrium-constant-calculator', 'ka-calculator',
    'kb-calculator', 'acid-base-calculator'
  ],
  'nernst-equation-calculator': [
    'electrochemical-cell-calculator', 'equilibrium-constant-calculator', 'ksp-calculator', 'solubility-calculator',
    'ka-calculator', 'kb-calculator'
  ],
  'electrochemical-cell-calculator': [
    'cell-potential-calculator', 'nernst-equation-calculator', 'equilibrium-constant-calculator', 'ksp-calculator',
    'solubility-calculator', 'ka-calculator'
  ],
  'cell-potential-calculator': [
    'faradays-law-calculator', 'electrochemical-cell-calculator', 'nernst-equation-calculator', 'equilibrium-constant-calculator',
    'ksp-calculator', 'solubility-calculator'
  ],
  'faradays-law-calculator': [
    'electrolysis-calculator', 'cell-potential-calculator', 'electrochemical-cell-calculator', 'nernst-equation-calculator',
    'ksp-calculator', 'stoichiometry-calculator'
  ],
  'electrolysis-calculator': [
    'gibbs-free-energy-calculator', 'faradays-law-calculator', 'cell-potential-calculator', 'electrochemical-cell-calculator',
    'nernst-equation-calculator', 'ksp-calculator'
  ],
  'gibbs-free-energy-calculator': [
    'enthalpy-calculator', 'equilibrium-constant-calculator', 'cell-potential-calculator', 'nernst-equation-calculator',
    'electrochemical-cell-calculator', 'electrolysis-calculator'
  ],
  'enthalpy-calculator': [
    'heat-of-reaction-calculator', 'gibbs-free-energy-calculator', 'equilibrium-constant-calculator', 'stoichiometry-calculator',
    'cell-potential-calculator', 'electrochemical-cell-calculator'
  ],
  'heat-of-reaction-calculator': [
    'hess-law-calculator', 'enthalpy-calculator', 'gibbs-free-energy-calculator', 'equilibrium-constant-calculator',
    'stoichiometry-calculator', 'mole-calculator'
  ],
  'hess-law-calculator': [
    'calorimetry-calculator', 'heat-of-reaction-calculator', 'enthalpy-calculator', 'gibbs-free-energy-calculator',
    'equilibrium-constant-calculator', 'stoichiometry-calculator'
  ],
  'calorimetry-calculator': [
    'specific-heat-calculator', 'hess-law-calculator', 'heat-of-reaction-calculator', 'enthalpy-calculator',
    'gibbs-free-energy-calculator', 'stoichiometry-calculator'
  ],
  'specific-heat-calculator': [
    'ideal-gas-law-calculator', 'calorimetry-calculator', 'hess-law-calculator', 'heat-of-reaction-calculator',
    'enthalpy-calculator', 'gibbs-free-energy-calculator'
  ],
  'ideal-gas-law-calculator': [
    'combined-gas-law-calculator', 'specific-heat-calculator', 'calorimetry-calculator', 'hess-law-calculator',
    'stoichiometry-calculator', 'mole-calculator'
  ],
  'combined-gas-law-calculator': [
    'boyles-law-calculator', 'ideal-gas-law-calculator', 'specific-heat-calculator', 'calorimetry-calculator',
    'hess-law-calculator', 'stoichiometry-calculator'
  ],
  'boyles-law-calculator': [
    'charles-law-calculator', 'combined-gas-law-calculator', 'ideal-gas-law-calculator', 'specific-heat-calculator',
    'calorimetry-calculator', 'stoichiometry-calculator'
  ],
  'charles-law-calculator': [
    'boyles-law-calculator', 'combined-gas-law-calculator', 'ideal-gas-law-calculator', 'specific-heat-calculator',
    'calorimetry-calculator', 'mole-calculator'
  ],

  // ─── Health & Fitness ────────────────────────────
  'bmi-calculator': [
    'body-fat-calculator', 'calorie-calculator', 'ideal-weight-calculator',
    'healthy-weight-calculator', 'bmr-calculator', 'pace-calculator', 'height-calculator',
    'macro-calculator', 'carbohydrate-calculator'
  ],
  'calorie-calculator': [
    'bmr-calculator', 'body-fat-calculator', 'bmi-calculator',
    'healthy-weight-calculator', 'ideal-weight-calculator', 'pace-calculator',
    'height-calculator', 'macro-calculator', 'carbohydrate-calculator'
  ],
  'body-fat-calculator': [
    'bmi-calculator', 'bmr-calculator', 'ideal-weight-calculator',
    'healthy-weight-calculator', 'calorie-calculator', 'pace-calculator',
    'height-calculator', 'macro-calculator'
  ],
  'bmr-calculator': [
    'calorie-calculator', 'body-fat-calculator', 'bmi-calculator',
    'ideal-weight-calculator', 'pace-calculator', 'macro-calculator', 'carbohydrate-calculator'
  ],
  'ideal-weight-calculator': [
    'bmi-calculator', 'body-fat-calculator', 'calorie-calculator',
    'healthy-weight-calculator', 'bmr-calculator', 'pace-calculator', 'height-calculator',
    'macro-calculator'
  ],
  'healthy-weight-calculator': [
    'bmi-calculator', 'calorie-calculator', 'ideal-weight-calculator',
    'body-fat-calculator', 'bmr-calculator', 'macro-calculator'
  ],
  'pace-calculator': [
    'calorie-calculator', 'bmi-calculator', 'bmr-calculator',
    'body-fat-calculator', 'ideal-weight-calculator', 'macro-calculator'
  ],
  'height-calculator': [
    'bmi-calculator', 'ideal-weight-calculator', 'body-fat-calculator',
    'conversion-calculator', 'age-calculator', 'calorie-calculator', 'macro-calculator',
    'carbohydrate-calculator'
  ],
  'macro-calculator': [
    'calorie-calculator', 'bmi-calculator', 'body-fat-calculator',
    'ideal-weight-calculator', 'bmr-calculator', 'pace-calculator', 'carbohydrate-calculator'
  ],
  'carbohydrate-calculator': [
    'macro-calculator', 'calorie-calculator', 'bmi-calculator',
    'bmr-calculator', 'height-calculator'
  ],
  'ovulation-calculator': [
    'pregnancy-calculator', 'pregnancy-conception-calculator', 'due-date-calculator',
    'bmi-calculator', 'calorie-calculator'
  ],
  'pregnancy-calculator': [
    'due-date-calculator', 'ovulation-calculator', 'pregnancy-conception-calculator',
    'bmi-calculator', 'calorie-calculator'
  ],
  'pregnancy-conception-calculator': [
    'pregnancy-calculator', 'due-date-calculator', 'ovulation-calculator',
    'bmi-calculator', 'calorie-calculator'
  ],
  'due-date-calculator': [
    'pregnancy-calculator', 'pregnancy-conception-calculator', 'ovulation-calculator',
    'age-calculator', 'date-calculator'
  ],

  // ─── Math & Science ──────────────────────────────
  'scientific-calculator': [
    'graphing-calculator', 'fraction-calculator', 'percentage-calculator',
    'scientific-notation-calculator', 'statistics-calculator', 'binary-calculator',
    'half-life-calculator', 'percent-error-calculator'
  ],
  'graphing-calculator': [
    'scientific-calculator', 'statistics-calculator', 'standard-deviation-calculator',
    'fraction-calculator', 'p-value-calculator'
  ],
  'fraction-calculator': [
    'percentage-calculator', 'scientific-calculator', 'conversion-calculator',
    'graphing-calculator', 'scientific-notation-calculator'
  ],
  'percentage-calculator': [
    'fraction-calculator', 'percent-off-calculator', 'scientific-calculator',
    'margin-calculator', 'sales-tax-calculator', 'binary-calculator', 'percent-error-calculator',
    'tip-calculator', 'zakat-calculator'
  ],
  'statistics-calculator': [
    'standard-deviation-calculator', 'p-value-calculator', 'graphing-calculator',
    'scientific-calculator', 'random-number-generator', 'half-life-calculator',
    'percent-error-calculator'
  ],
  'standard-deviation-calculator': [
    'statistics-calculator', 'p-value-calculator', 'scientific-calculator',
    'graphing-calculator', 'random-number-generator', 'percent-error-calculator'
  ],
  'p-value-calculator': [
    'statistics-calculator', 'standard-deviation-calculator', 'scientific-calculator',
    'graphing-calculator', 'random-number-generator'
  ],
  'random-number-generator': [
    'statistics-calculator', 'p-value-calculator', 'standard-deviation-calculator',
    'scientific-calculator', 'password-generator'
  ],
  'triangle-calculator': [
    'scientific-calculator', 'conversion-calculator', 'fraction-calculator',
    'percentage-calculator', 'graphing-calculator', 'volume-calculator'
  ],
  'scientific-notation-calculator': [
    'scientific-calculator', 'fraction-calculator', 'percentage-calculator',
    'graphing-calculator', 'conversion-calculator', 'half-life-calculator',
    'percent-error-calculator'
  ],
  'half-life-calculator': [
    'scientific-calculator', 'scientific-notation-calculator', 'statistics-calculator',
    'triangle-calculator', 'date-calculator', 'percent-error-calculator'
  ],
  'volume-calculator': [
    'area-calculator', 'surface-area-calculator', 'cube-calculator',
    'cylinder-calculator', 'geometry-calculator', 'conversion-calculator',
    'triangle-calculator', 'concrete-calculator'
  ],
  'percent-error-calculator': [
    'scientific-calculator', 'percentage-calculator', 'standard-deviation-calculator',
    'statistics-calculator', 'half-life-calculator', 'scientific-notation-calculator'
  ],
  'binary-calculator': [
    'hexadecimal-calculator', 'scientific-calculator', 'percentage-calculator',
    'subnet-calculator', 'ip-subnet-calculator', 'conversion-calculator', 'data-storage-converter'
  ],

  // ─── Other / Utility ─────────────────────────────
  'age-calculator': [
    'date-calculator', 'time-calculator', 'due-date-calculator',
    'hours-calculator', 'bmi-calculator', 'height-calculator'
  ],
  'date-calculator': [
    'age-calculator', 'time-calculator', 'hours-calculator',
    'due-date-calculator', 'pregnancy-calculator'
  ],
  'time-calculator': [
    'hours-calculator', 'date-calculator', 'age-calculator',
    'pace-calculator', 'conversion-calculator'
  ],
  'hours-calculator': [
    'time-calculator', 'date-calculator', 'salary-calculator',
    'age-calculator', 'pace-calculator'
  ],
  'gpa-calculator': [
    'grade-calculator', 'percentage-calculator', 'college-cost-calculator',
    'statistics-calculator', 'student-loan-calculator'
  ],
  'grade-calculator': [
    'gpa-calculator', 'percentage-calculator', 'statistics-calculator',
    'college-cost-calculator', 'fraction-calculator'
  ],
  'concrete-calculator': [
    'conversion-calculator', 'percentage-calculator', 'triangle-calculator',
    'scientific-calculator', 'fraction-calculator', 'volume-calculator'
  ],
  'conversion-calculator': [
    'scientific-calculator', 'fraction-calculator', 'percentage-calculator',
    'currency-calculator', 'concrete-calculator', 'binary-calculator', 'volume-calculator',
    'height-calculator', 'ip-subnet-calculator'
  ],
  'currency-calculator': [
    'conversion-calculator', 'inflation-calculator', 'sales-tax-calculator',
    'vat-calculator', 'percentage-calculator', 'tip-calculator', 'zakat-calculator'
  ],
  'subnet-calculator': [
    'conversion-calculator', 'scientific-calculator', 'password-generator',
    'random-number-generator', 'percentage-calculator', 'binary-calculator', 'ip-subnet-calculator'
  ],
  'password-generator': [
    'random-number-generator', 'subnet-calculator', 'scientific-calculator',
    'conversion-calculator', 'age-calculator'
  ],
  'ip-subnet-calculator': [
    'binary-calculator', 'subnet-calculator', 'conversion-calculator'
  ],
  'cd-calculator': [
    'savings-calculator', 'compound-interest-calculator', 'investment-calculator',
    'retirement-calculator', 'loan-calculator', 'budget-calculator', 'bond-calculator',
    'interest-calculator', 'interest-rate-calculator'
  ],
  'snow-day-calculator': [
    'wind-chill-calculator', 'heat-index-calculator', 'weather-calculator',
    'rainfall-calculator', 'temperature-converter', 'snowfall-unit-converter'
  ]
};

/**
 * Returns related calculator slugs for a given slug.
 * Falls back to same-category calculators if no explicit relationships exist.
 */
export function getRelatedCalculators(slug: string, limit = 6): string[] {
  const explicit = calculatorRelationships[slug];
  if (explicit) return explicit.slice(0, limit);
  return [];
}
