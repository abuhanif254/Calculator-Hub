import React from "react";

export function CalculatorMath({ slug, category }: { slug: string, category: string }) {
  const getMathContent = () => {
    switch(slug) {
      case 'amortization-calculator':
      case 'mortgage-calculator':
      case 'loan-calculator':
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
