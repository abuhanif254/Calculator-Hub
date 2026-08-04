export type ProbabilityInput = {
  favorable?: number;
  total?: number;
  probA?: number;
  probB?: number;
  probBgivenA?: number;
  probAgivenB?: number;
  prior?: number;
  likelihood?: number;
  evidence?: number;
};

export type BasicProbResult = {
  probability: number;
  complement: number;
  oddsFor: string;
  oddsAgainst: string;
  fraction: string;
  percentage: number;
};

// Greatest Common Divisor to simplify fractions
export const gcd = (a: number, b: number): number => {
  if (!b) return a;
  return gcd(b, a % b);
};

export const simplifyFraction = (numerator: number, denominator: number): string => {
  const divisor = gcd(numerator, denominator);
  return `${numerator / divisor}/${denominator / divisor}`;
};

export const calculateBasicProbability = (favorable: number, total: number): BasicProbResult | { error: string } => {
  if (total <= 0) return { error: "Total outcomes must be greater than 0." };
  if (favorable < 0) return { error: "Favorable outcomes cannot be negative." };
  if (favorable > total) return { error: "Favorable outcomes cannot exceed total outcomes." };

  const probability = favorable / total;
  const complement = 1 - probability;
  const percentage = probability * 100;
  const fraction = simplifyFraction(favorable, total);
  
  const unfavorable = total - favorable;
  const oddsFor = unfavorable === 0 ? "Infinity:1" : `${simplifyFraction(favorable, unfavorable).replace('/', ':')}`;
  const oddsAgainst = favorable === 0 ? "Infinity:1" : `${simplifyFraction(unfavorable, favorable).replace('/', ':')}`;

  return { probability, complement, oddsFor, oddsAgainst, fraction, percentage };
};

export const calculateUnion = (pA: number, pB: number, pIntersection: number): number => {
  return pA + pB - pIntersection;
};

export const calculateIntersectionIndependent = (pA: number, pB: number): number => {
  return pA * pB;
};

export const calculateConditional = (pIntersection: number, pB: number): number => {
  if (pB === 0) return 0;
  return pIntersection / pB;
};

export const calculateBayes = (prior: number, likelihood: number, evidence: number): number => {
  // P(A|B) = [P(B|A) * P(A)] / P(B)
  if (evidence === 0) return 0;
  return (likelihood * prior) / evidence;
};

export const calculateExpectedValue = (outcomes: number[], probabilities: number[]): number | { error: string } => {
  if (outcomes.length !== probabilities.length) {
    return { error: "Outcomes and probabilities must have the same number of elements." };
  }
  let sumProb = 0;
  let expectedValue = 0;
  for (let i = 0; i < probabilities.length; i++) {
    if (probabilities[i] < 0 || probabilities[i] > 1) {
      return { error: "Probabilities must be between 0 and 1." };
    }
    sumProb += probabilities[i];
    expectedValue += outcomes[i] * probabilities[i];
  }
  // Allow a tiny margin of float error for sum checking
  if (Math.abs(sumProb - 1) > 0.0001) {
    return { error: `Sum of probabilities must equal 1 (Current sum: ${sumProb.toFixed(4)}).` };
  }
  return expectedValue;
};

export const probToOdds = (p: number): { oddsFor: string; oddsAgainst: string } => {
  if (p < 0 || p > 1) return { oddsFor: "Invalid", oddsAgainst: "Invalid" };
  const percentFor = p * 100;
  const percentAgainst = (1 - p) * 100;
  
  // To get a rough ratio, we can multiply by 100 and use gcd
  const f = Math.round(percentFor);
  const a = Math.round(percentAgainst);
  
  if (a === 0) return { oddsFor: "Infinity:1", oddsAgainst: "0:1" };
  if (f === 0) return { oddsFor: "0:1", oddsAgainst: "Infinity:1" };
  
  const divisor = gcd(f, a);
  return {
    oddsFor: `${f / divisor}:${a / divisor}`,
    oddsAgainst: `${a / divisor}:${f / divisor}`
  };
};
