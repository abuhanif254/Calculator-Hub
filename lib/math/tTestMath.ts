import { jStat } from "jstat";

/**
 * Returns the probability P(T <= t) for a Student's t-distribution
 * with the given degrees of freedom (df).
 */
export function tCDF(t: number, df: number): number {
  return jStat.studentt.cdf(t, df);
}

/**
 * Returns the critical t-value for a given cumulative probability p
 * and degrees of freedom (df).
 */
export function invTCDF(p: number, df: number): number {
  return jStat.studentt.inv(p, df);
}

/**
 * Compute descriptive statistics for an array of numbers.
 */
export function getDescriptives(data: number[]) {
  const n = data.length;
  if (n === 0) return { n: 0, mean: 0, variance: 0, sd: 0, se: 0, sum: 0 };
  
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  
  if (n === 1) return { n: 1, mean, variance: 0, sd: 0, se: 0, sum };
  
  const sumSqDiff = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const variance = sumSqDiff / (n - 1); // Sample variance
  const sd = Math.sqrt(variance);
  const se = sd / Math.sqrt(n);
  
  return { n, mean, variance, sd, se, sum };
}

/**
 * One-Sample T-Test
 * Tests if the sample mean significantly differs from a hypothesized population mean.
 */
export function oneSampleTTest(
  sampleMean: number,
  popMean: number,
  sampleSD: number,
  n: number
) {
  if (n <= 1) throw new Error("Sample size must be greater than 1.");
  if (sampleSD <= 0) throw new Error("Standard deviation must be greater than 0.");
  
  const se = sampleSD / Math.sqrt(n);
  const tStat = (sampleMean - popMean) / se;
  const df = n - 1;
  
  // Cohen's d: (x̄ - μ) / s
  const cohensD = (sampleMean - popMean) / sampleSD;
  
  return { tStat, df, se, cohensD };
}

/**
 * Independent Two-Sample T-Test (Student's)
 * Assumes equal variances.
 */
export function independentTTest(
  mean1: number, sd1: number, n1: number,
  mean2: number, sd2: number, n2: number
) {
  if (n1 <= 1 || n2 <= 1) throw new Error("Sample sizes must be > 1.");
  
  const df = n1 + n2 - 2;
  
  // Pooled variance
  const sp2 = ((n1 - 1) * Math.pow(sd1, 2) + (n2 - 1) * Math.pow(sd2, 2)) / df;
  const sp = Math.sqrt(sp2);
  
  const se = sp * Math.sqrt((1 / n1) + (1 / n2));
  const tStat = (mean1 - mean2) / se;
  
  // Cohen's d: (x̄1 - x̄2) / sp
  const cohensD = (mean1 - mean2) / sp;
  
  return { tStat, df, se, cohensD, sp };
}

/**
 * Welch's T-Test (Independent Two-Sample, Unequal Variances)
 */
export function welchsTTest(
  mean1: number, sd1: number, n1: number,
  mean2: number, sd2: number, n2: number
) {
  if (n1 <= 1 || n2 <= 1) throw new Error("Sample sizes must be > 1.");
  
  const var1 = Math.pow(sd1, 2);
  const var2 = Math.pow(sd2, 2);
  
  const se1 = var1 / n1;
  const se2 = var2 / n2;
  const se = Math.sqrt(se1 + se2);
  
  const tStat = (mean1 - mean2) / se;
  
  // Welch-Satterthwaite equation for degrees of freedom
  const dfNum = Math.pow(se1 + se2, 2);
  const dfDen = (Math.pow(se1, 2) / (n1 - 1)) + (Math.pow(se2, 2) / (n2 - 1));
  const df = dfNum / dfDen;
  
  // Cohen's d for Welch's: often uses pooled SD or glass's delta, but standard pooled is common
  const sp = Math.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2));
  const cohensD = (mean1 - mean2) / sp;
  
  return { tStat, df, se, cohensD };
}

/**
 * Paired T-Test
 * We compute this by passing the mean and SD of the differences (d).
 * This is mathematically equivalent to a one-sample t-test on the differences against mu=0.
 */
export function pairedTTest(
  meanDiff: number,
  sdDiff: number,
  n: number
) {
  return oneSampleTTest(meanDiff, 0, sdDiff, n);
}

/**
 * Calculate p-value based on t-statistic, df, and tails (1 or 2)
 */
export function calculatePValue(tStat: number, df: number, tails: 1 | 2): number {
  const cdf = tCDF(tStat, df);
  
  if (tails === 1) {
    // If t is positive, p-value is the right tail (1 - cdf)
    // If t is negative, p-value is the left tail (cdf)
    return tStat > 0 ? 1 - cdf : cdf;
  } else {
    // Two-tailed
    return 2 * (1 - tCDF(Math.abs(tStat), df));
  }
}

/**
 * Calculate Confidence Interval for a given mean difference (or mean), SE, df, and alpha level
 */
export function calculateConfidenceInterval(
  meanOrDiff: number,
  se: number,
  df: number,
  alpha: number = 0.05
) {
  // Critical t value for two-tailed (1 - alpha/2)
  const tCrit = invTCDF(1 - alpha / 2, df);
  const marginOfError = tCrit * se;
  
  return {
    lower: meanOrDiff - marginOfError,
    upper: meanOrDiff + marginOfError,
    marginOfError,
    tCrit
  };
}

/**
 * Helper to parse a raw string dataset into an array of numbers
 */
export function parseDataset(input: string): number[] {
  return input
    .split(/[\n\t, ]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map(Number)
    .filter((n) => !isNaN(n));
}
