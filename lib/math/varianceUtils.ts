/**
 * varianceUtils.ts
 * Core mathematical engine for the Variance Calculator
 */

export interface DispersionMetrics {
  count: number;
  min: number;
  max: number;
  range: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  q1: number;
  q3: number;
  iqr: number;
  populationVariance: number;
  sampleVariance: number | null; // null if count < 2
  populationStandardDeviation: number;
  sampleStandardDeviation: number | null;
  meanAbsoluteDeviation: number;
  coefficientOfVariationPopulation: number;
  coefficientOfVariationSample: number | null;
  outliers: number[];
  sumOfSquares: number; // Sum of squared deviations
}

/**
 * Parse a raw text input into an array of numbers.
 * Handles commas, spaces, and newlines.
 */
export function parseRawDataset(input: string): number[] {
  if (!input) return [];
  // Replace commas and newlines with spaces, then split by whitespace
  const rawTokens = input.replace(/,/g, ' ').replace(/\n/g, ' ').split(/\s+/);
  const data: number[] = [];
  for (const token of rawTokens) {
    const trimmed = token.trim();
    if (trimmed) {
      const num = Number(trimmed);
      if (!isNaN(num)) {
        data.push(num);
      }
    }
  }
  return data;
}

/**
 * Calculates the mean of a dataset
 */
export function calculateMean(data: number[]): number {
  if (data.length === 0) return 0;
  const sum = data.reduce((a, b) => a + b, 0);
  return sum / data.length;
}

/**
 * Calculates the median of a dataset
 */
export function calculateMedian(data: number[]): number {
  if (data.length === 0) return 0;
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Calculates the modes of a dataset
 */
export function calculateModes(data: number[]): number[] {
  if (data.length === 0) return [];
  const counts: Record<number, number> = {};
  let maxCount = 0;
  
  for (const val of data) {
    counts[val] = (counts[val] || 0) + 1;
    if (counts[val] > maxCount) {
      maxCount = counts[val];
    }
  }
  
  const modes: number[] = [];
  for (const key in counts) {
    if (counts[key] === maxCount) {
      modes.push(Number(key));
    }
  }
  
  // If all elements appear the same number of times (and it's 1), there is technically no mode,
  // but returning all or none depends on convention. Let's return empty if all are unique.
  if (maxCount === 1 && modes.length === data.length) {
    return [];
  }
  
  return modes.sort((a, b) => a - b);
}

/**
 * Calculates Q1, Q2 (median), Q3 and IQR.
 * Using the standard "Tukey's hinges" / Method 1
 */
export function calculateQuartiles(data: number[]) {
  if (data.length === 0) return { q1: 0, median: 0, q3: 0, iqr: 0 };
  const sorted = [...data].sort((a, b) => a - b);
  
  const median = calculateMedian(sorted);
  
  let lowerHalf: number[];
  let upperHalf: number[];
  
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    lowerHalf = sorted.slice(0, mid);
    upperHalf = sorted.slice(mid);
  } else {
    // Exclude the median from halves
    lowerHalf = sorted.slice(0, mid);
    upperHalf = sorted.slice(mid + 1);
  }
  
  const q1 = lowerHalf.length > 0 ? calculateMedian(lowerHalf) : sorted[0];
  const q3 = upperHalf.length > 0 ? calculateMedian(upperHalf) : sorted[sorted.length - 1];
  const iqr = q3 - q1;
  
  return { q1, median, q3, iqr };
}

/**
 * Analyzes the dataset and returns all statistical metrics
 */
export function analyzeDataset(data: number[]): DispersionMetrics {
  const count = data.length;
  if (count === 0) {
    return {
      count: 0, min: 0, max: 0, range: 0, sum: 0, mean: 0, median: 0, modes: [],
      q1: 0, q3: 0, iqr: 0, populationVariance: 0, sampleVariance: null,
      populationStandardDeviation: 0, sampleStandardDeviation: null,
      meanAbsoluteDeviation: 0, coefficientOfVariationPopulation: 0,
      coefficientOfVariationSample: null, outliers: [], sumOfSquares: 0
    };
  }

  let sum = 0;
  let min = data[0];
  let max = data[0];

  for (const val of data) {
    sum += val;
    if (val < min) min = val;
    if (val > max) max = val;
  }

  const mean = sum / count;
  const range = max - min;
  const median = calculateMedian(data);
  const modes = calculateModes(data);
  
  const { q1, q3, iqr } = calculateQuartiles(data);

  let sumOfSquares = 0;
  let sumAbsoluteDeviations = 0;

  for (const val of data) {
    const deviation = val - mean;
    sumOfSquares += deviation * deviation;
    sumAbsoluteDeviations += Math.abs(deviation);
  }

  const populationVariance = sumOfSquares / count;
  const populationStandardDeviation = Math.sqrt(populationVariance);
  const meanAbsoluteDeviation = sumAbsoluteDeviations / count;
  
  let sampleVariance = null;
  let sampleStandardDeviation = null;
  
  if (count > 1) {
    sampleVariance = sumOfSquares / (count - 1);
    sampleStandardDeviation = Math.sqrt(sampleVariance);
  }

  const coefficientOfVariationPopulation = mean !== 0 ? (populationStandardDeviation / Math.abs(mean)) * 100 : 0;
  const coefficientOfVariationSample = mean !== 0 && sampleStandardDeviation !== null ? (sampleStandardDeviation / Math.abs(mean)) * 100 : null;

  // Outlier detection (Tukey's fences)
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  const outliers = data.filter(val => val < lowerBound || val > upperBound);

  return {
    count, min, max, range, sum, mean, median, modes,
    q1, q3, iqr, populationVariance, sampleVariance,
    populationStandardDeviation, sampleStandardDeviation,
    meanAbsoluteDeviation, coefficientOfVariationPopulation,
    coefficientOfVariationSample, outliers, sumOfSquares
  };
}

/**
 * Returns a human-readable interpretation of the variability
 */
export function interpretVariability(cv: number): 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High' {
  const absCv = Math.abs(cv);
  if (absCv < 5) return 'Very Low';
  if (absCv < 15) return 'Low';
  if (absCv < 30) return 'Moderate';
  if (absCv < 50) return 'High';
  return 'Very High';
}
