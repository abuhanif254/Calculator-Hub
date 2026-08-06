/**
 * Advanced Median & Robust Statistics Utilities
 */

export interface GroupedDataClass {
  min: number;
  max: number;
  frequency: number;
}

export interface MedianAnalysisMetrics {
  count: number;
  min: number;
  max: number;
  range: number;
  
  mean: number;
  median: number; // Q2
  modes: number[];
  
  varianceSample: number;
  standardDeviationSample: number;
  variancePopulation: number;
  standardDeviationPopulation: number;
  
  q1: number;
  q3: number;
  iqr: number;
  
  outliers: number[];
  skewness: number | null;
  kurtosis: number | null;
  coefficientOfVariation: number | null;
}

/**
 * Parses a raw string input into an array of numbers.
 * Supports comma, space, newline, or tab delimiters.
 */
export function parseRawDataset(input: string): number[] {
  if (!input || input.trim() === '') return [];
  
  // Replace all commas, newlines, and tabs with spaces, then split by space
  const normalized = input.replace(/[\n\t,]/g, ' ');
  const tokens = normalized.split(/\s+/).filter(t => t.trim() !== '');
  
  const parsed = tokens.map(t => parseFloat(t)).filter(n => !isNaN(n));
  return parsed;
}

/**
 * Parses a frequency table input.
 * Expected format per line: value, frequency
 */
export function parseFrequencyTable(input: string): { value: number; frequency: number }[] {
  if (!input || input.trim() === '') return [];
  
  const lines = input.split('\n');
  const table: { value: number; frequency: number }[] = [];
  
  for (const line of lines) {
    const parts = line.split(/[, \t]+/).filter(p => p.trim() !== '');
    if (parts.length >= 2) {
      const value = parseFloat(parts[0]);
      const frequency = parseInt(parts[1], 10);
      if (!isNaN(value) && !isNaN(frequency) && frequency > 0) {
        table.push({ value, frequency });
      }
    }
  }
  
  return table;
}

/**
 * Expands a frequency table into a flat dataset.
 */
export function expandFrequencyTable(table: { value: number; frequency: number }[]): number[] {
  const result: number[] = [];
  for (const row of table) {
    for (let i = 0; i < row.frequency; i++) {
      result.push(row.value);
    }
  }
  return result;
}

/**
 * Parses Grouped Data.
 * Expected format per line: min-max, frequency
 */
export function parseGroupedData(input: string): GroupedDataClass[] {
  if (!input || input.trim() === '') return [];
  
  const lines = input.split('\n');
  const groups: GroupedDataClass[] = [];
  
  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;
    
    // Split by comma or space to separate the interval from frequency
    const mainParts = cleanLine.split(/[, \t]+/).filter(p => p.trim() !== '');
    if (mainParts.length >= 2) {
      // The first part should be "min-max"
      const intervalPart = mainParts[0];
      const freqPart = mainParts[mainParts.length - 1];
      
      const intervalTokens = intervalPart.split('-');
      if (intervalTokens.length === 2) {
        const min = parseFloat(intervalTokens[0]);
        const max = parseFloat(intervalTokens[1]);
        const frequency = parseInt(freqPart, 10);
        
        if (!isNaN(min) && !isNaN(max) && !isNaN(frequency) && frequency > 0) {
          groups.push({ min, max, frequency });
        }
      }
    }
  }
  
  return groups;
}

/**
 * Estimates median for grouped data using interpolation.
 */
export function estimateMedianGrouped(groups: GroupedDataClass[]): number | null {
  if (groups.length === 0) return null;
  
  let N = 0;
  for (const g of groups) N += g.frequency;
  
  const medianPosition = N / 2;
  
  let cumulativeFreq = 0;
  for (const g of groups) {
    if (cumulativeFreq + g.frequency >= medianPosition) {
      // Median is in this class
      const L = g.min; // Lower boundary
      const F = cumulativeFreq; // Cumulative freq before this class
      const f = g.frequency; // Freq of this class
      const w = g.max - g.min; // Class width
      
      return L + ((medianPosition - F) / f) * w;
    }
    cumulativeFreq += g.frequency;
  }
  
  return null;
}

/**
 * Calculates the p-th percentile of a sorted dataset (p between 0 and 100).
 * Uses linear interpolation (method equivalent to Excel's PERCENTILE.INC / R type 7).
 */
export function calculatePercentile(sortedData: number[], p: number): number {
  if (sortedData.length === 0) return 0;
  if (p <= 0) return sortedData[0];
  if (p >= 100) return sortedData[sortedData.length - 1];
  
  const pos = ((sortedData.length - 1) * p) / 100;
  const base = Math.floor(pos);
  const rest = pos - base;
  
  if (base + 1 < sortedData.length) {
    return sortedData[base] + rest * (sortedData[base + 1] - sortedData[base]);
  }
  return sortedData[base];
}

/**
 * Perform a comprehensive analysis of a dataset.
 */
export function analyzeDatasetFull(data: number[]): MedianAnalysisMetrics {
  const n = data.length;
  if (n === 0) {
    return {
      count: 0, min: 0, max: 0, range: 0, mean: 0, median: 0, modes: [],
      varianceSample: 0, standardDeviationSample: 0, variancePopulation: 0, standardDeviationPopulation: 0,
      q1: 0, q3: 0, iqr: 0, outliers: [], skewness: null, kurtosis: null, coefficientOfVariation: null
    };
  }

  // Basic Stats
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;
  
  // Mean
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  
  // Median / Quartiles using interpolation
  const q1 = calculatePercentile(sorted, 25);
  const median = calculatePercentile(sorted, 50); // Q2
  const q3 = calculatePercentile(sorted, 75);
  const iqr = q3 - q1;
  
  // Outliers (Tukey's fences)
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = sorted.filter(v => v < lowerFence || v > upperFence);
  
  // Variance & StdDev
  const squaredDiffs = data.map(v => Math.pow(v - mean, 2));
  const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
  
  const variancePopulation = sumSquaredDiffs / n;
  const standardDeviationPopulation = Math.sqrt(variancePopulation);
  
  const varianceSample = n > 1 ? sumSquaredDiffs / (n - 1) : 0;
  const standardDeviationSample = Math.sqrt(varianceSample);
  
  const cv = mean !== 0 ? (standardDeviationSample / mean) * 100 : null;

  // Skewness and Kurtosis (Sample adjusted)
  let skewness = null;
  let kurtosis = null;
  
  if (n > 2 && standardDeviationSample > 0) {
    const cubedDiffs = data.map(v => Math.pow(v - mean, 3));
    const sumCubed = cubedDiffs.reduce((a,b) => a+b, 0);
    skewness = (n * sumCubed) / ((n - 1) * (n - 2) * Math.pow(standardDeviationSample, 3));
  }
  
  if (n > 3 && standardDeviationSample > 0) {
    const quadDiffs = data.map(v => Math.pow(v - mean, 4));
    const sumQuad = quadDiffs.reduce((a,b) => a+b, 0);
    const m4 = sumQuad / n;
    const m2 = variancePopulation;
    kurtosis = (m4 / Math.pow(m2, 2)) - 3; // Excess kurtosis
  }

  // Modes
  const frequencyMap = new Map<number, number>();
  let maxFreq = 0;
  for (const val of data) {
    const freq = (frequencyMap.get(val) || 0) + 1;
    frequencyMap.set(val, freq);
    if (freq > maxFreq) maxFreq = freq;
  }
  
  const modes: number[] = [];
  if (maxFreq > 1) { // If maxFreq is 1, all values are unique, usually we say "no mode"
    for (const [val, freq] of Array.from(frequencyMap.entries())) {
      if (freq === maxFreq) modes.push(val);
    }
  }

  return {
    count: n, min, max, range,
    mean, median, modes: modes.sort((a,b)=>a-b),
    varianceSample, standardDeviationSample,
    variancePopulation, standardDeviationPopulation,
    q1, q3, iqr, outliers,
    skewness, kurtosis, coefficientOfVariation: cv
  };
}

export function interpretSkewness(skewness: number): string {
  if (skewness < -1) return "highly_skewed_left";
  if (skewness < -0.5) return "moderately_skewed_left";
  if (skewness > 1) return "highly_skewed_right";
  if (skewness > 0.5) return "moderately_skewed_right";
  return "approx_symmetric";
}
