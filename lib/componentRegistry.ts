import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { CalculatorDef } from '@/lib/types';

// ═══════════════════════════════════════════════════════
// CALCULATOR COMPONENT REGISTRY
// ═══════════════════════════════════════════════════════
// Single source of truth mapping calculator slugs to their
// view components. Uses next/dynamic for code-splitting —
// only the component for the current calculator slug is
// loaded, reducing bundle size significantly.
//
// To add a new calculator:
//   1. Create the component in app/components/
//   2. Add one line to this registry
//   3. Done — no ternary chains, no repeated imports
// ═══════════════════════════════════════════════════════

type CalcComponentProps = { calcDef?: CalculatorDef; locale?: string };

const registry: Record<string, ComponentType<CalcComponentProps>> = {
  // ─── Financial ─────────────────────────────────
  'loan-calculator': dynamic(() => import('@/app/components/LoanCalculatorView').then(m => ({ default: m.LoanCalculatorView as ComponentType<CalcComponentProps> }))),
  'auto-loan-calculator': dynamic(() => import('@/app/components/AutoLoanCalculatorView').then(m => ({ default: m.AutoLoanCalculatorView as ComponentType<CalcComponentProps> }))),
  'interest-calculator': dynamic(() => import('@/app/components/InterestCalculatorView').then(m => ({ default: m.InterestCalculatorView as ComponentType<CalcComponentProps> }))),
  'payment-calculator': dynamic(() => import('@/app/components/PaymentCalculatorView').then(m => ({ default: m.PaymentCalculatorView as ComponentType<CalcComponentProps> }))),
  'retirement-calculator': dynamic(() => import('@/app/components/RetirementCalculatorView').then(m => ({ default: m.RetirementCalculatorView as ComponentType<CalcComponentProps> }))),
  'roth-ira-calculator': dynamic(() => import('@/app/components/RothIraCalculatorView').then(m => ({ default: m.RothIraCalculatorView as ComponentType<CalcComponentProps> }))),
  'cash-back-vs-low-interest-calculator': dynamic(() => import('@/app/components/CashBackLowInterestCalculatorView').then(m => ({ default: m.CashBackLowInterestCalculatorView as ComponentType<CalcComponentProps> }))),
  'margin-calculator': dynamic(() => import('@/app/components/MarginCalculatorView').then(m => ({ default: m.MarginCalculatorView as ComponentType<CalcComponentProps> }))),
  'real-estate-calculator': dynamic(() => import('@/app/components/RealEstateCalculatorView').then(m => ({ default: m.RealEstateCalculatorView as ComponentType<CalcComponentProps> }))),
  'lease-calculator': dynamic(() => import('@/app/components/LeaseCalculatorView').then(m => ({ default: m.LeaseCalculatorView as ComponentType<CalcComponentProps> }))),
  'irr-calculator': dynamic(() => import('@/app/components/IrrCalculatorView').then(m => ({ default: m.IrrCalculatorView as ComponentType<CalcComponentProps> }))),
  'amortization-calculator': dynamic(() => import('@/app/components/AmortizationCalculatorView').then(m => ({ default: m.AmortizationCalculatorView as ComponentType<CalcComponentProps> }))),
  'investment-calculator': dynamic(() => import('@/app/components/InvestmentCalculatorView').then(m => ({ default: m.InvestmentCalculatorView as ComponentType<CalcComponentProps> }))),
  'inflation-calculator': dynamic(() => import('@/app/components/InflationCalculatorView').then(m => ({ default: m.InflationCalculatorView as ComponentType<CalcComponentProps> }))),
  'finance-calculator': dynamic(() => import('@/app/components/FinanceCalculatorView').then(m => ({ default: m.FinanceCalculatorView as ComponentType<CalcComponentProps> }))),
  'income-tax-calculator': dynamic(() => import('@/app/components/IncomeTaxCalculatorView').then(m => ({ default: m.IncomeTaxCalculatorView as ComponentType<CalcComponentProps> }))),
  'compound-interest-calculator': dynamic(() => import('@/app/components/CompoundInterestCalculatorView').then(m => ({ default: m.CompoundInterestCalculatorView as ComponentType<CalcComponentProps> }))),
  'salary-calculator': dynamic(() => import('@/app/components/SalaryCalculatorView').then(m => ({ default: m.SalaryCalculatorView as ComponentType<CalcComponentProps> }))),
  'interest-rate-calculator': dynamic(() => import('@/app/components/InterestRateCalculatorView').then(m => ({ default: m.InterestRateCalculatorView as ComponentType<CalcComponentProps> }))),
  'sales-tax-calculator': dynamic(() => import('@/app/components/SalesTaxCalculatorView').then(m => ({ default: m.SalesTaxCalculatorView as ComponentType<CalcComponentProps> }))),
  'student-loan-calculator': dynamic(() => import('@/app/components/StudentLoanCalculatorView').then(m => ({ default: m.StudentLoanCalculatorView as ComponentType<CalcComponentProps> }))),
  'business-loan-calculator': dynamic(() => import('@/app/components/BusinessLoanCalculatorView').then(m => ({ default: m.BusinessLoanCalculatorView as ComponentType<CalcComponentProps> }))),
  'personal-loan-calculator': dynamic(() => import('@/app/components/PersonalLoanCalculatorView').then(m => ({ default: m.PersonalLoanCalculatorView as ComponentType<CalcComponentProps> }))),
  'budget-calculator': dynamic(() => import('@/app/components/BudgetCalculatorView').then(m => ({ default: m.BudgetCalculatorView as ComponentType<CalcComponentProps> }))),
  'apr-calculator': dynamic(() => import('@/app/components/APRCalculatorView').then(m => ({ default: m.APRCalculatorView as ComponentType<CalcComponentProps> }))),
  'heloc-calculator': dynamic(() => import('@/app/components/HELOCCalculatorView').then(m => ({ default: m.HELOCCalculatorView as ComponentType<CalcComponentProps> }))),
  'present-value-calculator': dynamic(() => import('@/app/components/PresentValueCalculatorView').then(m => ({ default: m.PresentValueCalculatorView as ComponentType<CalcComponentProps> }))),
  'percent-off-calculator': dynamic(() => import('@/app/components/PercentOffCalculatorView').then(m => ({ default: m.PercentOffCalculatorView as ComponentType<CalcComponentProps> }))),
  '401k-calculator': dynamic(() => import('@/app/components/Plan401kCalculatorView').then(m => ({ default: m.Plan401kCalculatorView as ComponentType<CalcComponentProps> }))),
  'marriage-tax-calculator': dynamic(() => import('@/app/components/MarriageTaxCalculatorView').then(m => ({ default: m.MarriageTaxCalculatorView as ComponentType<CalcComponentProps> }))),
  'annuity-calculator': dynamic(() => import('@/app/components/AnnuityCalculatorView').then(m => ({ default: m.AnnuityCalculatorView as ComponentType<CalcComponentProps> }))),
  'annuity-payout-calculator': dynamic(() => import('@/app/components/AnnuityPayoutCalculatorView').then(m => ({ default: m.AnnuityPayoutCalculatorView as ComponentType<CalcComponentProps> }))),
  'debt-consolidation-calculator': dynamic(() => import('@/app/components/DebtConsolidationCalculatorView').then(m => ({ default: m.DebtConsolidationCalculatorView as ComponentType<CalcComponentProps> }))),
  'simple-interest-calculator': dynamic(() => import('@/app/components/SimpleInterestCalculatorView').then(m => ({ default: m.SimpleInterestCalculatorView as ComponentType<CalcComponentProps> }))),
  'debt-payoff-calculator': dynamic(() => import('@/app/components/DebtPayoffCalculatorView').then(m => ({ default: m.DebtPayoffCalculatorView as ComponentType<CalcComponentProps> }))),
  'college-cost-calculator': dynamic(() => import('@/app/components/CollegeCostCalculatorView').then(m => ({ default: m.CollegeCostCalculatorView as ComponentType<CalcComponentProps> }))),
  'mutual-fund-calculator': dynamic(() => import('@/app/components/MutualFundCalculatorView').then(m => ({ default: m.MutualFundCalculatorView as ComponentType<CalcComponentProps> }))),
  'vat-calculator': dynamic(() => import('@/app/components/VatCalculatorView').then(m => ({ default: m.VatCalculatorView as ComponentType<CalcComponentProps> }))),
  'bond-calculator': dynamic(() => import('@/app/components/BondCalculatorView').then(m => ({ default: m.BondCalculatorView as ComponentType<CalcComponentProps> }))),
  'rmd-calculator': dynamic(() => import('@/app/components/RMDCalculatorView').then(m => ({ default: m.RMDCalculatorView as ComponentType<CalcComponentProps> }))),
  'depreciation-calculator': dynamic(() => import('@/app/components/DepreciationCalculatorView').then(m => ({ default: m.DepreciationCalculatorView as ComponentType<CalcComponentProps> }))),
  'average-return-calculator': dynamic(() => import('@/app/components/AverageReturnCalculatorView').then(m => ({ default: m.AverageReturnCalculatorView as ComponentType<CalcComponentProps> }))),
  'debt-to-income-ratio-calculator': dynamic(() => import('@/app/components/DebtToIncomeRatioCalculatorView').then(m => ({ default: m.DebtToIncomeRatioCalculatorView as ComponentType<CalcComponentProps> }))),
  'boat-loan-calculator': dynamic(() => import('@/app/components/BoatLoanCalculatorView').then(m => ({ default: m.BoatLoanCalculatorView as ComponentType<CalcComponentProps> }))),
  'rental-property-calculator': dynamic(() => import('@/app/components/RentalPropertyCalculatorView').then(m => ({ default: m.RentalPropertyCalculatorView as ComponentType<CalcComponentProps> }))),
  'fha-loan-calculator': dynamic(() => import('@/app/components/FHALoanCalculatorView').then(m => ({ default: m.FHALoanCalculatorView as ComponentType<CalcComponentProps> }))),
  'va-mortgage-calculator': dynamic(() => import('@/app/components/VAMortgageCalculatorView').then(m => ({ default: m.VAMortgageCalculatorView as ComponentType<CalcComponentProps> }))),
  'down-payment-calculator': dynamic(() => import('@/app/components/DownPaymentCalculatorView').then(m => ({ default: m.DownPaymentCalculatorView as ComponentType<CalcComponentProps> }))),
  'future-value-calculator': dynamic(() => import('@/app/components/FutureValueCalculatorView').then(m => ({ default: m.FutureValueCalculatorView as ComponentType<CalcComponentProps> }))),
  'mortgage-amortization-calculator': dynamic(() => import('@/app/components/MortgageAmortizationCalculatorView').then(m => ({ default: m.MortgageAmortizationCalculatorView as ComponentType<CalcComponentProps> }))),
  'house-affordability-calculator': dynamic(() => import('@/app/components/HouseAffordabilityCalculatorView').then(m => ({ default: m.HouseAffordabilityCalculatorView as ComponentType<CalcComponentProps> }))),
  'estate-tax-calculator': dynamic(() => import('@/app/components/EstateTaxCalculatorView').then(m => ({ default: m.EstateTaxCalculatorView as ComponentType<CalcComponentProps> }))),
  'credit-cards-payoff': dynamic(() => import('@/app/components/CreditCardsPayoffView').then(m => ({ default: m.CreditCardsPayoffView as ComponentType<CalcComponentProps> }))),
  'rent-calculator': dynamic(() => import('@/app/components/RentCalculatorView').then(m => ({ default: m.RentCalculatorView as ComponentType<CalcComponentProps> }))),
  'rent-vs-buy-calculator': dynamic(() => import('@/app/components/RentVsBuyCalculatorView').then(m => ({ default: m.RentVsBuyCalculatorView as ComponentType<CalcComponentProps> }))),
  'commission-calculator': dynamic(() => import('@/app/components/CommissionCalculatorView').then(m => ({ default: m.CommissionCalculatorView as ComponentType<CalcComponentProps> }))),
  'mortgage-payoff-calculator': dynamic(() => import('@/app/components/MortgagePayoffCalculatorView').then(m => ({ default: m.MortgagePayoffCalculatorView as ComponentType<CalcComponentProps> }))),
  'social-security-calculator': dynamic(() => import('@/app/components/SocialSecurityCalculatorView').then(m => ({ default: m.SocialSecurityCalculatorView as ComponentType<CalcComponentProps> }))),
  'currency-calculator': dynamic(() => import('@/app/components/CurrencyCalculatorView').then(m => ({ default: m.CurrencyCalculatorView as ComponentType<CalcComponentProps> }))),
  'savings-calculator': dynamic(() => import('@/app/components/SavingsCalculatorView').then(m => ({ default: m.SavingsCalculatorView as ComponentType<CalcComponentProps> }))),
  'cd-calculator': dynamic(() => import('@/app/components/CDCalculatorView').then(m => ({ default: m.CDCalculatorView as ComponentType<CalcComponentProps> }))),
  'tip-calculator': dynamic(() => import('@/app/components/TipCalculatorView').then(m => ({ default: m.TipCalculatorView as ComponentType<CalcComponentProps> }))),
  'zakat-calculator': dynamic(() => import('@/app/components/ZakatCalculatorView').then(m => ({ default: m.ZakatCalculatorView as ComponentType<CalcComponentProps> }))),
  'projectile-motion-calculator': dynamic(() => import('@/app/components/ProjectileMotionCalculatorView').then(m => ({ default: m.ProjectileMotionCalculatorView as ComponentType<CalcComponentProps> }))),
  'velocity-calculator': dynamic(() => import('@/app/components/VelocityCalculatorView').then(m => ({ default: m.VelocityCalculatorView as ComponentType<CalcComponentProps> }))),
  'acceleration-calculator': dynamic(() => import('@/app/components/AccelerationCalculatorView').then(m => ({ default: m.AccelerationCalculatorView as ComponentType<CalcComponentProps> }))),
  'force-calculator': dynamic(() => import('@/app/components/ForceCalculatorView').then(m => ({ default: m.ForceCalculatorView as ComponentType<CalcComponentProps> }))),
  'momentum-calculator': dynamic(() => import('@/app/components/MomentumCalculatorView').then(m => ({ default: m.MomentumCalculatorView as ComponentType<CalcComponentProps> }))),
  'kinetic-energy-calculator': dynamic(() => import('@/app/components/KineticEnergyCalculatorView').then(m => ({ default: m.KineticEnergyCalculatorView as ComponentType<CalcComponentProps> }))),
  'potential-energy-calculator': dynamic(() => import('@/app/components/PotentialEnergyCalculatorView').then(m => ({ default: m.PotentialEnergyCalculatorView as ComponentType<CalcComponentProps> }))),
  'free-fall-calculator': dynamic(() => import('@/app/components/FreeFallCalculatorView').then(m => ({ default: m.FreeFallCalculatorView as ComponentType<CalcComponentProps> }))),
  'work-calculator': dynamic(() => import('@/app/components/WorkCalculatorView').then(m => ({ default: m.WorkCalculatorView as ComponentType<CalcComponentProps> }))),
  'power-calculator': dynamic(() => import('@/app/components/PowerCalculatorView').then(m => ({ default: m.PowerCalculatorView as ComponentType<CalcComponentProps> }))),
  'density-calculator': dynamic(() => import('@/app/components/DensityCalculatorView').then(m => ({ default: m.DensityCalculatorView as ComponentType<CalcComponentProps> }))),
  'weight-calculator': dynamic(() => import('@/app/components/WeightCalculatorView').then(m => ({ default: m.WeightCalculatorView as ComponentType<CalcComponentProps> }))),
  'ohms-law-calculator': dynamic(() => import('@/app/components/OhmsLawCalculatorView').then(m => ({ default: m.OhmsLawCalculatorView as ComponentType<CalcComponentProps> }))),
  'voltage-calculator': dynamic(() => import('@/app/components/VoltageCalculatorView').then(m => ({ default: m.VoltageCalculatorView as ComponentType<CalcComponentProps> }))),
  'current-calculator': dynamic(() => import('@/app/components/CurrentCalculatorView').then(m => ({ default: m.CurrentCalculatorView as ComponentType<CalcComponentProps> }))),
  'resistance-calculator': dynamic(() => import('@/app/components/ResistanceCalculatorView').then(m => ({ default: m.ResistanceCalculatorView as ComponentType<CalcComponentProps> }))),
  'electrical-power-calculator': dynamic(() => import('@/app/components/ElectricalPowerCalculatorView').then(m => ({ default: m.ElectricalPowerCalculatorView as ComponentType<CalcComponentProps> }))),
  'electrical-energy-calculator': dynamic(() => import('@/app/components/ElectricalEnergyCalculatorView').then(m => ({ default: m.ElectricalEnergyCalculatorView as ComponentType<CalcComponentProps> }))),
  'voltage-drop-calculator': dynamic(() => import('@/app/components/VoltageDropCalculatorView').then(m => ({ default: m.VoltageDropCalculatorView as ComponentType<CalcComponentProps> }))),
  'wire-resistance-calculator': dynamic(() => import('@/app/components/WireResistanceCalculatorView').then(m => ({ default: m.WireResistanceCalculatorView as ComponentType<CalcComponentProps> }))),
  'electricity-cost-calculator': dynamic(() => import('@/app/components/ElectricityCostCalculatorView').then(m => ({ default: m.ElectricityCostCalculatorView as ComponentType<CalcComponentProps> }))),
  'led-resistor-calculator': dynamic(() => import('@/app/components/LedResistorCalculatorView').then(m => ({ default: m.LedResistorCalculatorView as ComponentType<CalcComponentProps> }))),
  'power-supply-calculator': dynamic(() => import('@/app/components/PowerSupplyCalculatorView').then(m => ({ default: m.PowerSupplyCalculatorView as ComponentType<CalcComponentProps> }))),
  'power-factor-calculator': dynamic(() => import('@/app/components/PowerFactorCalculatorView').then(m => ({ default: m.PowerFactorCalculatorView as ComponentType<CalcComponentProps> }))),
  'battery-runtime-calculator': dynamic(() => import('@/app/components/BatteryRuntimeCalculatorView').then(m => ({ default: m.BatteryRuntimeCalculatorView as ComponentType<CalcComponentProps> }))),
  'ups-calculator': dynamic(() => import('@/app/components/UpsCalculatorView').then(m => ({ default: m.UpsCalculatorView as ComponentType<CalcComponentProps> }))),
  'inverter-calculator': dynamic(() => import('@/app/components/InverterCalculatorView').then(m => ({ default: m.InverterCalculatorView as ComponentType<CalcComponentProps> }))),
  'solar-panel-calculator': dynamic(() => import('@/app/components/SolarPanelCalculatorView').then(m => ({ default: m.SolarPanelCalculatorView as ComponentType<CalcComponentProps> }))),
  'molarity-calculator': dynamic(() => import('@/app/components/MolarityCalculatorView').then(m => ({ default: m.MolarityCalculatorView as ComponentType<CalcComponentProps> }))),
  'molality-calculator': dynamic(() => import('@/app/components/MolalityCalculatorView').then(m => ({ default: m.MolalityCalculatorView as ComponentType<CalcComponentProps> }))),
  'mole-calculator': dynamic(() => import('@/app/components/MoleCalculatorView').then(m => ({ default: m.MoleCalculatorView as ComponentType<CalcComponentProps> }))),
  'molar-mass-calculator': dynamic(() => import('@/app/components/MolarMassCalculatorView').then(m => ({ default: m.MolarMassCalculatorView as ComponentType<CalcComponentProps> }))),
  'percent-composition-calculator': dynamic(() => import('@/app/components/PercentCompositionCalculatorView').then(m => ({ default: m.PercentCompositionCalculatorView as ComponentType<CalcComponentProps> }))),
  'molarity-dilution-calculator': dynamic(() => import('@/app/components/MolarityDilutionCalculatorView').then(m => ({ default: m.MolarityDilutionCalculatorView as ComponentType<CalcComponentProps> }))),
  'dilution-calculator': dynamic(() => import('@/app/components/DilutionCalculatorView').then(m => ({ default: m.DilutionCalculatorView as ComponentType<CalcComponentProps> }))),
  'stoichiometry-calculator': dynamic(() => import('@/app/components/StoichiometryCalculatorView').then(m => ({ default: m.StoichiometryCalculatorView as ComponentType<CalcComponentProps> }))),
  'empirical-formula-calculator': dynamic(() => import('@/app/components/EmpiricalFormulaCalculatorView').then(m => ({ default: m.EmpiricalFormulaCalculatorView as ComponentType<CalcComponentProps> }))),
  'molecular-formula-calculator': dynamic(() => import('@/app/components/MolecularFormulaCalculatorView').then(m => ({ default: m.MolecularFormulaCalculatorView as ComponentType<CalcComponentProps> }))),
  'balancing-chemical-equations-calculator': dynamic(() => import('@/app/components/BalancingChemicalEquationsCalculatorView').then(m => ({ default: m.BalancingChemicalEquationsCalculatorView as ComponentType<CalcComponentProps> }))),
  'ph-calculator': dynamic(() => import('@/app/components/PHCalculatorView').then(m => ({ default: m.PHCalculatorView as ComponentType<CalcComponentProps> }))),
  'poh-calculator': dynamic(() => import('@/app/components/POHCalculatorView').then(m => ({ default: m.POHCalculatorView as ComponentType<CalcComponentProps> }))),
  'pka-calculator': dynamic(() => import('@/app/components/PKaCalculatorView').then(m => ({ default: m.PKaCalculatorView as ComponentType<CalcComponentProps> }))),
  'henderson-hasselbalch-equation-calculator': dynamic(() => import('@/app/components/HendersonHasselbalchCalculatorView').then(m => ({ default: m.HendersonHasselbalchCalculatorView as ComponentType<CalcComponentProps> }))),
  'buffer-calculator': dynamic(() => import('@/app/components/BufferCalculatorView').then(m => ({ default: m.BufferCalculatorView as ComponentType<CalcComponentProps> }))),
  'acid-base-calculator': dynamic(() => import('@/app/components/AcidBaseCalculatorView').then(m => ({ default: m.AcidBaseCalculatorView as ComponentType<CalcComponentProps> }))),
  'ka-calculator': dynamic(() => import('@/app/components/KaCalculatorView').then(m => ({ default: m.KaCalculatorView as ComponentType<CalcComponentProps> }))),
  'kb-calculator': dynamic(() => import('@/app/components/KbCalculatorView').then(m => ({ default: m.KbCalculatorView as ComponentType<CalcComponentProps> }))),
  'equilibrium-constant-calculator': dynamic(() => import('@/app/components/EquilibriumConstantCalculatorView').then(m => ({ default: m.EquilibriumConstantCalculatorView as ComponentType<CalcComponentProps> }))),
  'ksp-calculator': dynamic(() => import('@/app/components/KspCalculatorView').then(m => ({ default: m.KspCalculatorView as ComponentType<CalcComponentProps> }))),
  'solubility-calculator': dynamic(() => import('@/app/components/SolubilityCalculatorView').then(m => ({ default: m.SolubilityCalculatorView as ComponentType<CalcComponentProps> }))),
  'nernst-equation-calculator': dynamic(() => import('@/app/components/NernstEquationCalculatorView').then(m => ({ default: m.NernstEquationCalculatorView as ComponentType<CalcComponentProps> }))),
  'electrochemical-cell-calculator': dynamic(() => import('@/app/components/ElectrochemicalCellCalculatorView').then(m => ({ default: m.ElectrochemicalCellCalculatorView as ComponentType<CalcComponentProps> }))),
  'cell-potential-calculator': dynamic(() => import('@/app/components/CellPotentialCalculatorView').then(m => ({ default: m.CellPotentialCalculatorView as ComponentType<CalcComponentProps> }))),
  'faradays-law-calculator': dynamic(() => import('@/app/components/FaradaysLawCalculatorView').then(m => ({ default: m.FaradaysLawCalculatorView as ComponentType<CalcComponentProps> }))),
  'electrolysis-calculator': dynamic(() => import('@/app/components/ElectrolysisCalculatorView').then(m => ({ default: m.ElectrolysisCalculatorView as ComponentType<CalcComponentProps> }))),
  'gibbs-free-energy-calculator': dynamic(() => import('@/app/components/GibbsFreeEnergyCalculatorView').then(m => ({ default: m.GibbsFreeEnergyCalculatorView as ComponentType<CalcComponentProps> }))),
  'enthalpy-calculator': dynamic(() => import('@/app/components/EnthalpyCalculatorView').then(m => ({ default: m.EnthalpyCalculatorView as ComponentType<CalcComponentProps> }))),
  'heat-of-reaction-calculator': dynamic(() => import('@/app/components/HeatOfReactionCalculatorView').then(m => ({ default: m.HeatOfReactionCalculatorView as ComponentType<CalcComponentProps> }))),
  'hess-law-calculator': dynamic(() => import('@/app/components/HessLawCalculatorView').then(m => ({ default: m.HessLawCalculatorView as ComponentType<CalcComponentProps> }))),
  'calorimetry-calculator': dynamic(() => import('@/app/components/CalorimetryCalculatorView').then(m => ({ default: m.CalorimetryCalculatorView as ComponentType<CalcComponentProps> }))),
  'specific-heat-calculator': dynamic(() => import('@/app/components/SpecificHeatCalculatorView').then(m => ({ default: m.SpecificHeatCalculatorView as ComponentType<CalcComponentProps> }))),
  'ideal-gas-law-calculator': dynamic(() => import('@/app/components/IdealGasLawCalculatorView').then(m => ({ default: m.IdealGasLawCalculatorView as ComponentType<CalcComponentProps> }))),
  'combined-gas-law-calculator': dynamic(() => import('@/app/components/CombinedGasLawCalculatorView').then(m => ({ default: m.CombinedGasLawCalculatorView as ComponentType<CalcComponentProps> }))),
  'boyles-law-calculator': dynamic(() => import('@/app/components/BoylesLawCalculatorView').then(m => ({ default: m.BoylesLawCalculatorView as ComponentType<CalcComponentProps> }))),
  'charles-law-calculator': dynamic(() => import('@/app/components/CharlesLawCalculatorView').then(m => ({ default: m.CharlesLawCalculatorView as ComponentType<CalcComponentProps> }))),

  // ─── Math & Science ────────────────────────────
  'binary-calculator': dynamic(() => import('@/app/components/BinaryCalculatorView').then(m => ({ default: m.BinaryCalculatorView as ComponentType<CalcComponentProps> }))),
  'scientific-calculator': dynamic(() => import('@/app/components/ScientificCalculatorView').then(m => ({ default: m.ScientificCalculatorView as ComponentType<CalcComponentProps> }))),
  'scientific-notation-calculator': dynamic(() => import('@/app/components/ScientificNotationCalculatorView').then(m => ({ default: m.ScientificNotationCalculatorView as ComponentType<CalcComponentProps> }))),
  'graphing-calculator': dynamic(() => import('@/app/components/GraphingCalculatorView').then(m => ({ default: m.default as ComponentType<CalcComponentProps> }))),
  'fraction-calculator': dynamic(() => import('@/app/components/FractionCalculatorView').then(m => ({ default: m.FractionCalculatorView as ComponentType<CalcComponentProps> }))),
  'percentage-calculator': dynamic(() => import('@/app/components/PercentageCalculatorView').then(m => ({ default: m.PercentageCalculatorView as ComponentType<CalcComponentProps> }))),
  'random-number-generator': dynamic(() => import('@/app/components/RandomNumberGeneratorView').then(m => ({ default: m.RandomNumberGeneratorView as ComponentType<CalcComponentProps> }))),
  'triangle-calculator': dynamic(() => import('@/app/components/TriangleCalculatorView').then(m => ({ default: m.TriangleCalculatorView as ComponentType<CalcComponentProps> }))),
  'standard-deviation-calculator': dynamic(() => import('@/app/components/StandardDeviationCalculatorView').then(m => ({ default: m.StandardDeviationCalculatorView as ComponentType<CalcComponentProps> }))),
  'statistics-calculator': dynamic(() => import('@/app/components/StatisticsCalculatorView').then(m => ({ default: m.StatisticsCalculatorView as ComponentType<CalcComponentProps> }))),
  'p-value-calculator': dynamic(() => import('@/app/components/PValueCalculatorView').then(m => ({ default: m.PValueCalculatorView as ComponentType<CalcComponentProps> }))),
  'date-calculator': dynamic(() => import('@/app/components/DateCalculatorView').then(m => ({ default: m.DateCalculatorView as ComponentType<CalcComponentProps> }))),
  'time-calculator': dynamic(() => import('@/app/components/TimeCalculatorView').then(m => ({ default: m.TimeCalculatorView as ComponentType<CalcComponentProps> }))),
  'hours-calculator': dynamic(() => import('@/app/components/HoursCalculatorView').then(m => ({ default: m.HoursCalculatorView as ComponentType<CalcComponentProps> }))),
  'gpa-calculator': dynamic(() => import('@/app/components/GpaCalculatorView').then(m => ({ default: m.GpaCalculatorView as ComponentType<CalcComponentProps> }))),
  'grade-calculator': dynamic(() => import('@/app/components/GradeCalculatorView').then(m => ({ default: m.GradeCalculatorView as ComponentType<CalcComponentProps> }))),
  'concrete-calculator': dynamic(() => import('@/app/components/ConcreteCalculatorView').then(m => ({ default: m.ConcreteCalculatorView as ComponentType<CalcComponentProps> }))),
  'conversion-calculator': dynamic(() => import('@/app/components/ConversionCalculatorView').then(m => ({ default: m.ConversionCalculatorView as ComponentType<CalcComponentProps> }))),
  'half-life-calculator': dynamic(() => import('@/app/components/HalfLifeCalculatorView').then(m => ({ default: m.HalfLifeCalculatorView as ComponentType<CalcComponentProps> }))),
  'volume-calculator': dynamic(() => import('@/app/components/VolumeCalculatorView').then(m => ({ default: m.VolumeCalculatorView as ComponentType<CalcComponentProps> }))),
  'percent-error-calculator': dynamic(() => import('@/app/components/PercentErrorCalculatorView').then(m => ({ default: m.PercentErrorCalculatorView as ComponentType<CalcComponentProps> }))),

  // ─── Health & Fitness ──────────────────────────
  'bmi-calculator': dynamic(() => import('@/app/components/BmiCalculatorView').then(m => ({ default: m.BmiCalculatorView as ComponentType<CalcComponentProps> }))),
  'height-calculator': dynamic(() => import('@/app/components/HeightCalculatorView').then(m => ({ default: m.HeightCalculatorView as ComponentType<CalcComponentProps> }))),
  'calorie-calculator': dynamic(() => import('@/app/components/CalorieCalculatorView').then(m => ({ default: m.CalorieCalculatorView as ComponentType<CalcComponentProps> }))),
  'macro-calculator': dynamic(() => import('@/app/components/MacroCalculatorView').then(m => ({ default: m.MacroCalculatorView as ComponentType<CalcComponentProps> }))),
  'carbohydrate-calculator': dynamic(() => import('@/app/components/CarbohydrateCalculatorView').then(m => ({ default: m.CarbohydrateCalculatorView as ComponentType<CalcComponentProps> }))),
  'body-fat-calculator': dynamic(() => import('@/app/components/BodyFatCalculatorView').then(m => ({ default: m.BodyFatCalculatorView as ComponentType<CalcComponentProps> }))),
  'bmr-calculator': dynamic(() => import('@/app/components/BMRCalculatorView').then(m => ({ default: m.BMRCalculatorView as ComponentType<CalcComponentProps> }))),
  'ideal-weight-calculator': dynamic(() => import('@/app/components/IdealWeightCalculatorView').then(m => ({ default: m.IdealWeightCalculatorView as ComponentType<CalcComponentProps> }))),
  'healthy-weight-calculator': dynamic(() => import('@/app/components/HealthyWeightCalculatorView').then(m => ({ default: m.HealthyWeightCalculatorView as ComponentType<CalcComponentProps> }))),
  'pace-calculator': dynamic(() => import('@/app/components/PaceCalculatorView').then(m => ({ default: m.PaceCalculatorView as ComponentType<CalcComponentProps> }))),
  'ovulation-calculator': dynamic(() => import('@/app/components/OvulationCalculatorView').then(m => ({ default: m.OvulationCalculatorView as ComponentType<CalcComponentProps> }))),
  'pregnancy-calculator': dynamic(() => import('@/app/components/PregnancyCalculatorView').then(m => ({ default: m.PregnancyCalculatorView as ComponentType<CalcComponentProps> }))),
  'pregnancy-conception-calculator': dynamic(() => import('@/app/components/PregnancyConceptionCalculatorView').then(m => ({ default: m.PregnancyConceptionCalculatorView as ComponentType<CalcComponentProps> }))),
  'due-date-calculator': dynamic(() => import('@/app/components/DueDateCalculatorView').then(m => ({ default: m.DueDateCalculatorView as ComponentType<CalcComponentProps> }))),
  'advanced-sleep-cycle-calculator': dynamic(() => import('@/app/components/AdvancedSleepCycleCalculatorView').then(m => ({ default: m.AdvancedSleepCycleCalculatorView as ComponentType<CalcComponentProps> }))),

  // ─── Weather ───────────────────────────────────
  'snow-day-calculator': dynamic(() => import('@/app/components/SnowDayCalculatorView').then(m => ({ default: m.SnowDayCalculatorView as ComponentType<CalcComponentProps> }))),

  // ─── Other ─────────────────────────────────────
  'age-calculator': dynamic(() => import('@/app/components/AgeCalculatorView').then(m => ({ default: m.AgeCalculatorView as ComponentType<CalcComponentProps> }))),
  'subnet-calculator': dynamic(() => import('@/app/components/SubnetCalculatorView').then(m => ({ default: m.SubnetCalculatorView as ComponentType<CalcComponentProps> }))),
  'ip-subnet-calculator': dynamic(() => import('@/app/components/IpSubnetCalculatorView').then(m => ({ default: m.IpSubnetCalculatorView as ComponentType<CalcComponentProps> }))),
  'password-generator': dynamic(() => import('@/app/components/PasswordGeneratorView').then(m => ({ default: m.PasswordGeneratorView as ComponentType<CalcComponentProps> }))),
};

console.log("[DEBUG REGISTRY] Registered keys:", Object.keys(registry));

// Fallback generic calculator component
const FallbackCalculator = dynamic(() => import('@/app/components/Calculator').then(m => ({ default: m.Calculator as ComponentType<CalcComponentProps> })));

/**
 * Returns the appropriate calculator component for a given slug.
 * Falls back to the generic Calculator component if no custom view exists.
 */
export function getCalculatorComponent(slug: string): ComponentType<CalcComponentProps> {
  console.log("[DEBUG REGISTRY] slug requested:", slug, "found in registry:", !!registry[slug]);
  return registry[slug] ?? FallbackCalculator;
}
