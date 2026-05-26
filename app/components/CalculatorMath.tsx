import React from "react";

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
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-center text-lg mb-4 shadow-inner border border-slate-200">
              M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
            </div>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
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
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs md:text-sm mb-4 shadow-inner border border-slate-200 overflow-x-auto space-y-2">
              <div><strong>Basic Payout:</strong> Commission = Revenue × Rate% + Performance Bonus</div>
              <div><strong>Reverse Target:</strong> Required Sales = (Target Payout - Performance Bonus) / Rate%</div>
              <div><strong>Tiered Payout:</strong> Payout = Sum of (Revenue in Tier $n$ × Tier $n$ Rate%)</div>
              <div><strong>Real Estate split:</strong> Agent Share = Property Price × Total Comm% × Agent Split% × Brokerage Split%</div>
            </div>
            <p className="text-slate-600 text-xs">For partnerships and profit-sharing models, the total profit pool is distributed using linear percentage allocations (Profit_i = Profit_total × Split_i%) adjusted for custom business overhead fees.</p>
          </>
        );
      case 'mortgage-payoff-calculator':
        return (
          <>
            <p className="mb-4">Mortgage payments and accelerated payoff schedules are modeled using standard compound amortization formulas:</p>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs md:text-sm mb-4 shadow-inner border border-slate-200 overflow-x-auto space-y-2">
              <div><strong>Standard Monthly Payment (P&amp;I):</strong> M = P × [r(1+r)^n] / [(1+r)^n - 1]</div>
              <div><strong>Biweekly Accelerated Payout:</strong> Annual payments equivalent to 13 monthly payments (26 half-payments).</div>
              <div><strong>Extra Payments Impact:</strong> Remaining_Balance(t) = Balance(t-1) + Interest(t) - [Regular_Payment + Extra_Payment]</div>
              <div><strong>Total Interest Saved:</strong> Interest_Saved = Standard_Total_Interest - Accelerated_Total_Interest</div>
            </div>
            <p className="text-slate-600 text-xs">Where <strong>M</strong> is the monthly principal &amp; interest payment, <strong>P</strong> is the remaining principal, <strong>r</strong> is the monthly interest rate (annual rate / 12), and <strong>n</strong> is the remaining payment months.</p>
          </>
        );
      case 'rent-vs-buy-calculator':
        return (
          <>
            <p className="mb-4">The calculator performs a year-by-year financial simulation comparing Buyer Net Worth against Renter Net Worth:</p>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs md:text-sm mb-4 shadow-inner border border-slate-200 overflow-x-auto space-y-1">
              <div><strong>Buyer Net Worth (Year t):</strong> Home Value(t) - Mortgage Balance(t) - Selling Costs(t) + Invested Payment Savings(t)</div>
              <div><strong>Renter Net Worth (Year t):</strong> Compounded Investment Portfolio of Opportunity Costs (Down Payment + Closing Costs + Annual Cost Differences)</div>
            </div>
            <p className="text-slate-600">The break-even point is the year where the buyer net worth exceeds the renter net worth, signifying that homeownership has offset its upfront transaction costs, interest, maintenance, and the renter's stock portfolio compounding returns.</p>
          </>
        );
      case 'debt-to-income-ratio-calculator':
        return (
          <>
            <p className="mb-4">The Debt-to-Income (DTI) ratio formula is a straightforward percentage calculation:</p>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-center text-lg mb-4 shadow-inner border border-slate-200">
              DTI Ratio = (Total Monthly Debt) / (Gross Monthly Income) × 100
            </div>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Total Monthly Debt:</strong> Sum of recurring minimum debt payments.</li>
              <li><strong>Gross Monthly Income:</strong> Total income earned before taxes and other payroll deductions.</li>
            </ul>
          </>
        );
      case 'compound-interest-calculator':
      case 'investment-calculator':
      case 'average-return-calculator':
      case 'savings-calculator':
        return (
          <>
            <p className="mb-4">The core of investment projection relies on the compound interest formula:</p>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-center text-lg mb-4 shadow-inner border border-slate-200">
              A = P (1 + r/n)^(nt)
            </div>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
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
            <p className="mb-4">Body Mass Index (BMI) is calculated using a simple relationship between weight and height:</p>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-center text-lg mb-4 shadow-inner border border-slate-200">
              BMI = weight(kg) / height(m)^2
            </div>
            <p className="text-slate-600 italic">For imperial units, this converts to: BMI = 703 × weight(lbs) / height(in)^2</p>
          </>
        );
      case 'healthy-weight-calculator':
        return (
          <>
            <p className="mb-4">Healthy Weight recommendations are computed using standard clinical formulas and the WHO body mass index range:</p>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-center text-xs md:text-sm mb-4 shadow-inner border border-slate-200 overflow-x-auto space-y-1">
              <div><strong>WHO Healthy Range (BMI 18.5 – 24.9):</strong> Weight (kg) = BMI × Height(m)²</div>
              <div><strong>Devine (Male):</strong> 50.0 + 2.3 × (Height(in) - 60)</div>
              <div><strong>Devine (Female):</strong> 45.5 + 2.3 × (Height(in) - 60)</div>
              <div><strong>Robinson (Male):</strong> 52.0 + 1.9 × (Height(in) - 60)</div>
              <div><strong>Robinson (Female):</strong> 49.0 + 1.7 × (Height(in) - 60)</div>
              <div><strong>Miller (Male):</strong> 56.2 + 1.41 × (Height(in) - 60)</div>
              <div><strong>Miller (Female):</strong> 53.1 + 1.36 × (Height(in) - 60)</div>
              <div><strong>Hamwi (Male):</strong> 48.0 + 2.7 × (Height(in) - 60)</div>
              <div><strong>Hamwi (Female):</strong> 45.5 + 2.2 × (Height(in) - 60)</div>
            </div>
            <p className="text-slate-600">Calculated ideal weights are adjusted by ±10% for Small / Large frame sizes based on height-to-wrist ratio $r$.</p>
          </>
        );
      case 'bmr-calculator':
      case 'calorie-calculator':
        return (
          <>
            <p className="mb-4">We utilize the highly accurate <strong>Mifflin-St Jeor Equation</strong> to determine your Basal Metabolic Rate (BMR):</p>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-center mb-4 shadow-inner border border-slate-200 text-sm overflow-x-auto">
              Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5<br/>
              Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
            </div>
            <p className="text-slate-600">TDEE (Total Daily Energy Expenditure) is then found by multiplying your BMR by a standard activity multiplier ranging from 1.2 (sedentary) to 1.9 (extremely active).</p>
          </>
        );
      default:
        return ( // Fallback
          <>
            <p className="mb-4 text-slate-600">All results are generated using industry-standard, tested mathematical models tailored for <strong>{category.toLowerCase()}</strong> computations. Values are internally processed with high-precision floating point limits to ensure output reliability and minimal rounding drift.</p>
          </>
        );
    }
  }

  return (
    <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-4 inline-flex items-center gap-2">
        <svg className="w-5 h-5 text-[#518231]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        The Math Behind It
      </h3>
      <div className="prose prose-slate max-w-none text-slate-700">
        {getMathContent()}
      </div>
    </div>
  );
}
