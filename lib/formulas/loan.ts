export interface LoanResult {
  paymentEveryMonth?: number;
  totalPayments?: number;
  totalInterest: number;
  amountDueAtMaturity?: number;
  amountReceivedAtStart?: number;
  principal: number;
}

export const calculateAmortizedLoan = (
  loanAmount: number,
  termYears: number,
  termMonths: number,
  interestRate: number,
  compoundPeriod: string,
  payBackPeriod: string
): LoanResult => {
  const totalMonths = (termYears * 12) + termMonths;
  let r = interestRate / 100;
  
  // Convert based on compound period
  let nPerYear = 12;
  if (compoundPeriod.includes('Annually')) nPerYear = 1;
  else if (compoundPeriod.includes('Semi-Annually')) nPerYear = 2;
  else if (compoundPeriod.includes('Quarterly')) nPerYear = 4;
  else if (compoundPeriod.includes('Daily')) nPerYear = 365;

  // Effective rate per payment period (assuming monthly payback for now as standard)
  let effectiveRate = Math.pow(1 + r / nPerYear, nPerYear / 12) - 1;
  if (effectiveRate === 0) {
     return {
         paymentEveryMonth: loanAmount / totalMonths,
         totalPayments: loanAmount,
         totalInterest: 0,
         principal: loanAmount
     };
  }

  const paymentEveryMonth = (loanAmount * effectiveRate * Math.pow(1 + effectiveRate, totalMonths)) / (Math.pow(1 + effectiveRate, totalMonths) - 1);
  const totalPayments = paymentEveryMonth * totalMonths;
  const totalInterest = totalPayments - loanAmount;

  return {
    paymentEveryMonth,
    totalPayments,
    totalInterest,
    principal: loanAmount,
  };
};

export const calculateDeferredLoan = (
  loanAmount: number,
  termYears: number,
  termMonths: number,
  interestRate: number,
  compoundPeriod: string,
): LoanResult => {
  const totalYears = termYears + (termMonths / 12);
  let r = interestRate / 100;
  
  let nPerYear = 1;
  if (compoundPeriod.includes('Monthly')) nPerYear = 12;
  else if (compoundPeriod.includes('Semi-Annually')) nPerYear = 2;
  else if (compoundPeriod.includes('Quarterly')) nPerYear = 4;
  else if (compoundPeriod.includes('Daily')) nPerYear = 365;

  const amountDueAtMaturity = loanAmount * Math.pow(1 + r / nPerYear, nPerYear * totalYears);
  const totalInterest = amountDueAtMaturity - loanAmount;

  return {
    amountDueAtMaturity,
    totalInterest,
    principal: loanAmount,
  };
};

export const calculateBond = (
  predeterminedAmount: number,
  termYears: number,
  termMonths: number,
  interestRate: number,
  compoundPeriod: string,
): LoanResult => {
  const totalYears = termYears + (termMonths / 12);
  let r = interestRate / 100;
  
  let nPerYear = 1;
  if (compoundPeriod.includes('Monthly')) nPerYear = 12;
  else if (compoundPeriod.includes('Semi-Annually')) nPerYear = 2;
  else if (compoundPeriod.includes('Quarterly')) nPerYear = 4;
  else if (compoundPeriod.includes('Daily')) nPerYear = 365;

  const amountReceivedAtStart = predeterminedAmount / Math.pow(1 + r / nPerYear, nPerYear * totalYears);
  const totalInterest = predeterminedAmount - amountReceivedAtStart;

  return {
    amountReceivedAtStart,
    totalInterest,
    principal: amountReceivedAtStart,
  };
};
