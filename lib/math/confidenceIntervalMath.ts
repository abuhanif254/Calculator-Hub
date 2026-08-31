import { jStat } from 'jstat';

export interface CIResult {
  lower: number;
  upper: number;
  pointEstimate: number;
  se: number;
  criticalValue: number;
  marginOfError: number;
  distribution: 'Z' | 'T' | 'Chi2';
  df?: number;
  method: string;
  warnings: string[];
}

export interface DescriptiveStats {
  n: number;
  mean: number;
  median: number;
  sd: number;
  se: number;
  variance: number;
  min: number;
  max: number;
  sum: number;
}

export function normalInv(p: number): number {
  return jStat.normal.inv(p, 0, 1);
}

export function tInv(p: number, df: number): number {
  return jStat.studentt.inv(p, df);
}

export function chi2Inv(p: number, df: number): number {
  return jStat.chisquare.inv(p, df);
}

export function validateConfidence(level: number): void {
  if (level <= 0 || level >= 100) {
    throw new Error('Confidence level must be between 0 and 100 exclusive.');
  }
}

export function validateN(n: number): void {
  if (n <= 0 || !Number.isInteger(n)) {
    throw new Error('Sample size (n) must be a positive integer.');
  }
}

export function validateSD(sd: number): void {
  if (sd < 0) {
    throw new Error('Standard deviation cannot be negative.');
  }
}

export function parseDatasetInput(input: string): number[] {
  return input
    .split(/[\s,]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));
}

export function getDescriptiveStats(data: number[]): DescriptiveStats {
  const n = data.length;
  validateN(n);
  const mean = jStat.mean(data);
  const median = jStat.median(data);
  const variance = jStat.variance(data, true); // sample variance
  const sd = Math.sqrt(variance);
  const se = sd / Math.sqrt(n);
  const min = jStat.min(data);
  const max = jStat.max(data);
  const sum = jStat.sum(data);

  return { n, mean, median, sd, se, variance, min, max, sum };
}

export function calculateZInterval(mean: number, sigma: number, n: number, confidenceLevel: number): CIResult {
  validateConfidence(confidenceLevel);
  validateN(n);
  validateSD(sigma);

  const alpha = 1 - confidenceLevel / 100;
  const criticalValue = normalInv(1 - alpha / 2);
  const se = sigma / Math.sqrt(n);
  const marginOfError = criticalValue * se;
  
  const warnings: string[] = [];
  if (n < 30) {
    warnings.push('Sample size n < 30. Ensure population standard deviation is truly known, otherwise T-interval is recommended.');
  }

  return {
    lower: mean - marginOfError,
    upper: mean + marginOfError,
    pointEstimate: mean,
    se,
    criticalValue,
    marginOfError,
    distribution: 'Z',
    method: 'Z-Interval for a Mean',
    warnings,
  };
}

export function calculateTInterval(mean: number, sd: number, n: number, confidenceLevel: number): CIResult {
  validateConfidence(confidenceLevel);
  validateN(n);
  validateSD(sd);
  if (n <= 1) throw new Error('Sample size must be greater than 1 for T-interval.');

  const alpha = 1 - confidenceLevel / 100;
  const df = n - 1;
  const criticalValue = tInv(1 - alpha / 2, df);
  const se = sd / Math.sqrt(n);
  const marginOfError = criticalValue * se;

  const warnings: string[] = [];
  if (n < 10) {
    warnings.push('Sample size is small (n < 10). T-interval assumes the population is approximately normally distributed.');
  }

  return {
    lower: mean - marginOfError,
    upper: mean + marginOfError,
    pointEstimate: mean,
    se,
    criticalValue,
    marginOfError,
    distribution: 'T',
    df,
    method: 'T-Interval for a Mean',
    warnings,
  };
}

export function calculateProportionCI(x: number, n: number, confidenceLevel: number): CIResult {
  validateConfidence(confidenceLevel);
  validateN(n);
  if (x < 0 || x > n || !Number.isInteger(x)) throw new Error('Successes (x) must be an integer between 0 and n.');

  const pHat = x / n;
  const alpha = 1 - confidenceLevel / 100;
  const criticalValue = normalInv(1 - alpha / 2);
  const se = Math.sqrt((pHat * (1 - pHat)) / n);
  const marginOfError = criticalValue * se;

  const warnings: string[] = [];
  if (n * pHat < 5 || n * (1 - pHat) < 5) {
    warnings.push('Insufficient success/failure counts (np < 5 or n(1-p) < 5). Normal approximation may be invalid. Consider Wilson score interval.');
  }

  return {
    lower: pHat - marginOfError,
    upper: pHat + marginOfError,
    pointEstimate: pHat,
    se,
    criticalValue,
    marginOfError,
    distribution: 'Z',
    method: 'Wald Interval for a Proportion',
    warnings,
  };
}

export function calculateTwoMeansDiffCI(m1: number, sd1: number, n1: number, m2: number, sd2: number, n2: number, confidenceLevel: number, method: 'welch' | 'pooled' = 'welch'): CIResult {
  validateConfidence(confidenceLevel);
  validateN(n1); validateN(n2);
  validateSD(sd1); validateSD(sd2);
  if (n1 <= 1 || n2 <= 1) throw new Error('Sample sizes must be greater than 1.');

  const alpha = 1 - confidenceLevel / 100;
  const pointEstimate = m1 - m2;
  
  let se: number, df: number;
  const v1 = sd1 * sd1, v2 = sd2 * sd2;

  const warnings: string[] = [];
  
  if (method === 'welch') {
    se = Math.sqrt(v1 / n1 + v2 / n2);
    const num = Math.pow(v1 / n1 + v2 / n2, 2);
    const den = Math.pow(v1 / n1, 2) / (n1 - 1) + Math.pow(v2 / n2, 2) / (n2 - 1);
    df = num / den;
  } else {
    df = n1 + n2 - 2;
    const sp2 = ((n1 - 1) * v1 + (n2 - 1) * v2) / df;
    se = Math.sqrt(sp2 * (1 / n1 + 1 / n2));
    
    const maxV = Math.max(v1, v2);
    const minV = Math.min(v1, v2) || 1e-9;
    if (maxV / minV > 4) {
      warnings.push('Variance ratio is > 4. Pooled variance assumption may be violated. Welch method is recommended.');
    }
  }

  const criticalValue = tInv(1 - alpha / 2, df);
  const marginOfError = criticalValue * se;

  return {
    lower: pointEstimate - marginOfError,
    upper: pointEstimate + marginOfError,
    pointEstimate,
    se,
    criticalValue,
    marginOfError,
    distribution: 'T',
    df,
    method: method === 'welch' ? 'Welch Two-Sample T-Interval' : 'Pooled Two-Sample T-Interval',
    warnings,
  };
}

export function calculateTwoPropsDiffCI(x1: number, n1: number, x2: number, n2: number, confidenceLevel: number): CIResult {
  validateConfidence(confidenceLevel);
  validateN(n1); validateN(n2);
  if (x1 < 0 || x1 > n1 || x2 < 0 || x2 > n2) throw new Error('Successes must be between 0 and n.');

  const p1 = x1 / n1;
  const p2 = x2 / n2;
  const pointEstimate = p1 - p2;
  
  const alpha = 1 - confidenceLevel / 100;
  const criticalValue = normalInv(1 - alpha / 2);
  
  const se = Math.sqrt((p1 * (1 - p1)) / n1 + (p2 * (1 - p2)) / n2);
  const marginOfError = criticalValue * se;

  const warnings: string[] = [];
  if (x1 < 5 || n1 - x1 < 5 || x2 < 5 || n2 - x2 < 5) {
    warnings.push('Low expected counts in one or both samples. Normal approximation may be poor.');
  }

  return {
    lower: pointEstimate - marginOfError,
    upper: pointEstimate + marginOfError,
    pointEstimate,
    se,
    criticalValue,
    marginOfError,
    distribution: 'Z',
    method: 'Two-Proportion Z-Interval',
    warnings,
  };
}

export function calculatePairedCI(meanDiff: number, sdDiff: number, n: number, confidenceLevel: number): CIResult {
  const result = calculateTInterval(meanDiff, sdDiff, n, confidenceLevel);
  result.method = 'Paired T-Interval';
  return result;
}

export function calculateVarianceCI(sd: number, n: number, confidenceLevel: number): CIResult {
  validateConfidence(confidenceLevel);
  validateN(n);
  validateSD(sd);
  if (n <= 1) throw new Error('Sample size must be greater than 1.');

  const df = n - 1;
  const alpha = 1 - confidenceLevel / 100;
  const variance = sd * sd;
  
  const chi2Lower = chi2Inv(alpha / 2, df);
  const chi2Upper = chi2Inv(1 - alpha / 2, df);
  
  const lower = (df * variance) / chi2Upper;
  const upper = (df * variance) / chi2Lower;

  return {
    lower,
    upper,
    pointEstimate: variance,
    se: 0,
    criticalValue: 0,
    marginOfError: 0,
    distribution: 'Chi2',
    df,
    method: 'Chi-Square Interval for Variance',
    warnings: ['Interval is asymmetric. The displayed limits are for variance (σ²).'],
  };
}

export function analyzeRawDataset(data: number[], confidenceLevel: number): { stats: DescriptiveStats, ci: CIResult } {
  const stats = getDescriptiveStats(data);
  const ci = calculateTInterval(stats.mean, stats.sd, stats.n, confidenceLevel);
  return { stats, ci };
}
