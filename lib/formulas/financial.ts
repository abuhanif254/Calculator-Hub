// Financial formulas

export interface MortgageResult {
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
  amortizationSchedule: AmortizationRow[];
}

export interface AmortizationRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export const calculateCanadianMortgage = (data: Record<string, number | string>): MortgageResult => {
  const homePrice = Number(data.homePrice) || 0;
  const downPayment = Number(data.downPayment) || 0;
  const loanTermYears = Number(data.loanTerm) || 25; // Canadian amortizations commonly max at 25 or 30
  const interestRateAnnual = Number(data.interestRate) || 0;
  const annualPropertyTax = Number(data.propertyTax) || 0;
  const annualHomeInsurance = Number(data.homeInsurance) || 0;
  const monthlyHOA = Number(data.hoaFees) || 0;

  const principal = Math.max(0, homePrice - downPayment);
  const numberOfPayments = loanTermYears * 12;
  
  // The crucial Canadian regional difference: Semi-annual compounding
  // An annual rate of 5% (0.05) is compounded semi-annually
  // Effective Monthly Rate = (1 + (Annual Rate / 2))^(2/12) - 1
  // Equivalently: (1 + r/2)^(1/6) - 1
  let effectiveMonthlyRate = 0;
  if (interestRateAnnual > 0) {
    const r = interestRateAnnual / 100;
    effectiveMonthlyRate = Math.pow(1 + r / 2, 1 / 6) - 1;
  }

  let monthlyPrincipalAndInterest = 0;

  if (effectiveMonthlyRate > 0) {
    monthlyPrincipalAndInterest =
      (principal * effectiveMonthlyRate * Math.pow(1 + effectiveMonthlyRate, numberOfPayments)) /
      (Math.pow(1 + effectiveMonthlyRate, numberOfPayments) - 1);
  } else if (numberOfPayments > 0) {
    monthlyPrincipalAndInterest = principal / numberOfPayments;
  }

  const monthlyPropertyTax = annualPropertyTax / 12;
  const monthlyHomeInsurance = annualHomeInsurance / 12;

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHOA;

  // Calculate Amortization
  let balance = principal;
  let totalInterestPaid = 0;
  const amortizationSchedule: AmortizationRow[] = [];

  for (let year = 1; year <= loanTermYears; year++) {
    let yearPrincipalPaid = 0;
    let yearInterestPaid = 0;

    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;
      const interestForMonth = balance * effectiveMonthlyRate;
      let principalForMonth = monthlyPrincipalAndInterest - interestForMonth;

      if (balance - principalForMonth < 0) {
        principalForMonth = balance;
      }

      yearInterestPaid += interestForMonth;
      yearPrincipalPaid += principalForMonth;
      balance -= principalForMonth;
      totalInterestPaid += interestForMonth;
    }

    amortizationSchedule.push({
      year,
      principalPaid: Math.max(0, yearPrincipalPaid),
      interestPaid: Math.max(0, yearInterestPaid),
      remainingBalance: Math.max(0, balance),
    });
  }

  return {
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHOA,
    totalMonthlyPayment,
    totalInterestPaid,
    totalCostOfLoan: principal + totalInterestPaid,
    amortizationSchedule,
  };
};
export const calculateMortgage = (data: Record<string, number | string>): MortgageResult => {
  const homePrice = Number(data.homePrice) || 0;
  const downPayment = Number(data.downPayment) || 0;
  const loanTermYears = Number(data.loanTerm) || 30;
  const interestRateAnnual = Number(data.interestRate) || 0;
  const annualPropertyTax = Number(data.propertyTax) || 0;
  const annualHomeInsurance = Number(data.homeInsurance) || 0;
  const monthlyHOA = Number(data.hoaFees) || 0;

  const principal = Math.max(0, homePrice - downPayment);
  const numberOfPayments = loanTermYears * 12;
  const monthlyInterestRate = interestRateAnnual / 100 / 12;

  let monthlyPrincipalAndInterest = 0;

  if (monthlyInterestRate > 0) {
    monthlyPrincipalAndInterest =
      (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  } else if (numberOfPayments > 0) {
    monthlyPrincipalAndInterest = principal / numberOfPayments;
  }

  const monthlyPropertyTax = annualPropertyTax / 12;
  const monthlyHomeInsurance = annualHomeInsurance / 12;

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHOA;

  // Calculate Amortization
  let balance = principal;
  let totalInterestPaid = 0;
  const amortizationSchedule: AmortizationRow[] = [];

  for (let year = 1; year <= loanTermYears; year++) {
    let yearPrincipalPaid = 0;
    let yearInterestPaid = 0;

    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;
      const interestForMonth = balance * monthlyInterestRate;
      let principalForMonth = monthlyPrincipalAndInterest - interestForMonth;

      if (balance - principalForMonth < 0) {
        principalForMonth = balance;
      }

      yearInterestPaid += interestForMonth;
      yearPrincipalPaid += principalForMonth;
      balance -= principalForMonth;
      totalInterestPaid += interestForMonth;
    }

    amortizationSchedule.push({
      year,
      principalPaid: Math.max(0, yearPrincipalPaid),
      interestPaid: Math.max(0, yearInterestPaid),
      remainingBalance: Math.max(0, balance),
    });
  }

  return {
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHOA,
    totalMonthlyPayment,
    totalInterestPaid,
    totalCostOfLoan: principal + totalInterestPaid,
    amortizationSchedule,
  };
};
