import React from "react";
import { getFormulaForCalculator } from "@/lib/data/calculatorFormulas";
import { StaticMathFormula } from "./StaticMathFormula";

export function CalculatorMath({ slug, category }: { slug: string, category: string }) {
  const getMathContent = () => {
    switch(slug) {
      case 'amortization-calculator':
      case 'mortgage-calculator':
      case 'loan-calculator':
      case 'boat-loan-calculator':
      case 'rental-property-calculator':
      case 'fha-loan-calculator':
      case 'va-mortgage-calculator':
        return (
          <>
            <p className="mb-4">These financial calculations are based on the standard monthly payment formula for amortizing loans:</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <StaticMathFormula latex="M = P \frac{i(1 + i)^n}{(1 + i)^n - 1}" />
            </div>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>M</strong> = the expected monthly payment</li>
              <li><strong>P</strong> = the principal amount (initial loan)</li>
              <li><strong>i</strong> = your monthly interest rate (annual rate divided by 12)</li>
              <li><strong>n</strong> = number of payments (months)</li>
            </ul>
          </>
        );
      case 'commission-calculator':
        return (
          <>
            <p className="mb-4">Commission earnings are calculated based on the selected sales model structure:</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 space-y-2">
              <StaticMathFormula latex="\text{Basic Commission} = \text{Revenue} \times \text{Rate} + \text{Bonus}" />
              <StaticMathFormula latex="\text{Required Sales} = \frac{\text{Target Payout} - \text{Bonus}}{\text{Rate}}" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs">For partnerships and profit-sharing models, the total profit pool is distributed using linear percentage allocations adjusted for custom business overhead fees.</p>
          </>
        );
      case 'mortgage-payoff-calculator':
        return (
          <>
            <p className="mb-4">Mortgage payments and accelerated payoff schedules are modeled using standard compound amortization formulas:</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 space-y-2">
              <StaticMathFormula latex="M = P \times \frac{r(1+r)^n}{(1+r)^n - 1}" />
              <StaticMathFormula latex="\text{Interest Saved} = \text{Total Interest}_{\text{standard}} - \text{Total Interest}_{\text{accelerated}}" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs">Where <strong>M</strong> is the monthly principal &amp; interest payment, <strong>P</strong> is the remaining principal, <strong>r</strong> is the monthly interest rate (annual rate / 12), and <strong>n</strong> is the remaining payment months.</p>
          </>
        );
      case 'rent-vs-buy-calculator':
        return (
          <>
            <p className="mb-4">The calculator performs a year-by-year financial simulation comparing Buyer Net Worth against Renter Net Worth:</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
              <StaticMathFormula latex="\text{Buyer Net Worth}_t = \text{Home Value}_t - \text{Mortgage Balance}_t - \text{Selling Costs}_t + \text{Savings}_t" />
            </div>
            <p className="text-slate-600 dark:text-slate-400">The break-even point is the year where the buyer net worth exceeds the renter net worth, signifying that homeownership has offset its upfront transaction costs, interest, maintenance, and the renter&apos;s stock portfolio compounding returns.</p>
          </>
        );
      case 'debt-to-income-ratio-calculator':
        return (
          <>
            <p className="mb-4">The Debt-to-Income (DTI) ratio formula is a straightforward percentage calculation:</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <StaticMathFormula latex="\text{DTI} = \left(\frac{\text{Total Monthly Debt}}{\text{Gross Monthly Income}}\right) \times 100\%" />
            </div>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>Total Monthly Debt:</strong> Sum of recurring minimum debt payments.</li>
              <li><strong>Gross Monthly Income:</strong> Total income earned before taxes and other payroll deductions.</li>
            </ul>
          </>
        );
      case 'compound-interest-calculator':
      case 'investment-calculator':
      case 'average-return-calculator':
      case 'savings-calculator':
      case 'future-value-calculator':
        return (
          <>
            <p className="mb-4">The core of investment projection relies on the compound interest formula:</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <StaticMathFormula latex="A = P \left(1 + \frac{r}{n}\right)^{nt}" />
            </div>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>A</strong> = the future value of the investment/loan, including interest</li>
              <li><strong>P</strong> = the principal investment amount</li>
              <li><strong>r</strong> = the annual interest rate (decimal)</li>
              <li><strong>n</strong> = the number of times that interest is compounded per year</li>
              <li><strong>t</strong> = the number of years the money is invested</li>
            </ul>
          </>
        );
      case 'bmi-calculator':
        return (
          <>
            <p className="mb-4">Body Mass Index (BMI) is calculated using the standard clinical relationship between weight and height:</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <StaticMathFormula latex="\text{BMI} = \frac{\text{weight (kg)}}{\text{height (m)}^2} = 703 \times \frac{\text{weight (lb)}}{\text{height (in)}^2}" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 italic text-xs">According to WHO standards: Underweight &lt; 18.5, Normal = 18.5–24.9, Overweight = 25–29.9, Obese &ge; 30.</p>
          </>
        );
      case 'bmr-calculator':
      case 'calorie-calculator':
        return (
          <>
            <p className="mb-4">We utilize the highly accurate <strong>Mifflin-St Jeor Equation</strong> to determine your Basal Metabolic Rate (BMR):</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 space-y-2">
              <StaticMathFormula latex="\text{BMR}_{\text{men}} = 10 \times \text{weight (kg)} + 6.25 \times \text{height (cm)} - 5 \times \text{age} + 5" />
              <StaticMathFormula latex="\text{BMR}_{\text{women}} = 10 \times \text{weight (kg)} + 6.25 \times \text{height (cm)} - 5 \times \text{age} - 161" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs">TDEE (Total Daily Energy Expenditure) is then found by multiplying your BMR by an activity multiplier ranging from 1.2 (sedentary) to 1.9 (extremely active).</p>
          </>
        );
      default: {
        const formulaDef = getFormulaForCalculator(slug);
        if (formulaDef) {
          return (
            <>
              <p className="mb-4 text-slate-700 dark:text-slate-300">
                Calculations for this tool are based on the standard <strong>{formulaDef.name}</strong>:
              </p>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-4 shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <StaticMathFormula latex={formulaDef.latex || formulaDef.formula} fallback={formulaDef.formula} />
              </div>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                {formulaDef.variables.map((v) => (
                  <li key={v.symbol}>
                    <strong>{v.symbol}</strong> = {v.name} ({v.description})
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 italic">
                {formulaDef.stepByStep}
              </p>
            </>
          );
        }
        return (
          <>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              All results are generated using industry-standard, tested mathematical models tailored for <strong>{category.toLowerCase()}</strong> computations. Values are internally processed with high-precision floating point limits to ensure output reliability and minimal rounding drift.
            </p>
          </>
        );
      }
    }
  };

  return (
    <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 inline-flex items-center gap-2">
        <svg className="w-5 h-5 text-[#518231]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        The Math Behind It
      </h3>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
        {getMathContent()}
      </div>
    </div>
  );
}
