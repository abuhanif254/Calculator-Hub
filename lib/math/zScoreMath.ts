/**
 * zScoreMath.ts
 * Core mathematical engine for the Z-Score & Normal Distribution Platform.
 */

// --- 1. Error Function and Normal CDF ---

/**
 * Abramowitz and Stegun approximation for the error function
 */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  
  const p = 0.3275911;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return sign * y;
}

/**
 * Standard Normal Cumulative Distribution Function (CDF)
 * Returns the probability (area under the curve) to the left of Z.
 */
export function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

/**
 * Standard Normal Probability Density Function (PDF)
 * Used for drawing the bell curve.
 */
export function normalPDF(z: number): number {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
}

// --- 2. Inverse Normal CDF ---

/**
 * Rational approximation for Inverse Normal CDF (percentile to z-score).
 * Based on Peter J. Acklam's approximation.
 * @param p Probability (0 < p < 1)
 */
export function inverseNormalCDF(p: number): number {
  if (p <= 0 || p >= 1) {
    throw new Error("Probability must be strictly between 0 and 1.");
  }
  
  const a = [-3.969683028665376e+01,  2.209460984245205e+02,
             -2.759285104469687e+02,  1.383577518672690e+02,
             -3.066479806614716e+01,  2.506628277459239e+00];
  const b = [-5.447609879822406e+01,  1.615858368580409e+02,
             -1.556989798598866e+02,  6.680131188771972e+01,
             -1.328068155288572e+01 ];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01,
             -2.400758277161838e+00, -2.549732539343734e+00,
              4.374664141464968e+00,  2.938163982698783e+00];
  const d = [ 7.784695709041462e-03,  3.224671290700398e-01,
              2.445134137142996e+00,  3.754408661907416e+00];
              
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  
  let q, r, z;
  
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    z = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    z = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    z = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
         ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  
  // One iteration of Halley's rational method for high precision
  const e = normalCDF(z) - p;
  const u = e * Math.sqrt(2 * Math.PI) * Math.exp(z * z / 2);
  z = z - u / (1 + z * u / 2);
  
  return z;
}

// --- 3. Core Formulas ---

export function solveForZ(x: number, mean: number, sd: number): number {
  return (x - mean) / sd;
}

export function solveForX(z: number, mean: number, sd: number): number {
  return (z * sd) + mean;
}

export function solveForMean(x: number, z: number, sd: number): number {
  return x - (z * sd);
}

export function solveForSD(x: number, mean: number, z: number): number {
  if (z === 0) return 0;
  return (x - mean) / z;
}

// --- 4. Dataset Processing ---

export interface DatasetStats {
  n: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
  sampleVariance: number;
  popVariance: number;
  sampleSD: number;
  popSD: number;
  skewness: number;
  kurtosis: number;
}

export function analyzeDataset(data: number[]): DatasetStats | null {
  if (!data || data.length === 0) return null;
  
  const n = data.length;
  // Create a copy for sorting
  const sorted = [...data].sort((a, b) => a - b);
  
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;
  
  // Mean
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  
  // Median
  const mid = Math.floor(n / 2);
  const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  
  // Variance & SD
  let sumSqDiff = 0;
  let sumCubeDiff = 0;
  let sumQuadDiff = 0;
  
  for (let i = 0; i < n; i++) {
    const diff = sorted[i] - mean;
    sumSqDiff += diff * diff;
    sumCubeDiff += diff * diff * diff;
    sumQuadDiff += diff * diff * diff * diff;
  }
  
  const popVariance = sumSqDiff / n;
  const popSD = Math.sqrt(popVariance);
  
  const sampleVariance = n > 1 ? sumSqDiff / (n - 1) : 0;
  const sampleSD = Math.sqrt(sampleVariance);
  
  // Skewness (Sample)
  let skewness = 0;
  if (n > 2 && sampleSD > 0) {
    skewness = (n / ((n - 1) * (n - 2))) * (sumCubeDiff / Math.pow(sampleSD, 3));
  }
  
  // Kurtosis (Sample Excess Kurtosis)
  let kurtosis = 0;
  if (n > 3 && sampleSD > 0) {
    const term1 = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
    const term2 = sumQuadDiff / Math.pow(sampleSD, 4);
    const term3 = (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
    kurtosis = term1 * term2 - term3;
  }
  
  return {
    n, mean, median, min, max, range,
    sampleVariance, popVariance, sampleSD, popSD,
    skewness, kurtosis
  };
}

export function detectOutlier(z: number): "Normal" | "Moderately Unusual" | "Potential Outlier" | "Extreme Outlier" {
  const absZ = Math.abs(z);
  if (absZ < 2) return "Normal";
  if (absZ < 3) return "Moderately Unusual";
  if (absZ < 4) return "Potential Outlier";
  return "Extreme Outlier";
}
