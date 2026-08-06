export interface DispersionStats {
  sampleSize: number;
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
  populationVariance: number;
  sampleVariance: number;
  populationSD: number;
  sampleSD: number;
  standardError: number;
  meanAbsoluteDeviation: number;
  coefficientOfVariationPop: number; // as percentage
  coefficientOfVariationSample: number; // as percentage
  relativeStandardDeviation: number; // as percentage (usually matches sample CV)
  q1: number;
  q2: number; // median
  q3: number;
  iqr: number;
  lowerFence: number;
  upperFence: number;
  outliers: number[];
  skewness: number;
  kurtosis: number;
  sum: number;
  sumOfSquares: number;
}

export function calculateStandardDeviationStats(data: number[]): DispersionStats | null {
  if (!data || data.length === 0) return null;
  
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;
  
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  
  let sumOfSquares = 0;
  let sumOfAbsoluteDeviations = 0;
  let sumCubed = 0;
  let sumFourth = 0;
  
  for (const val of sorted) {
    const diff = val - mean;
    sumOfAbsoluteDeviations += Math.abs(diff);
    sumOfSquares += diff * diff;
    sumCubed += diff * diff * diff;
    sumFourth += diff * diff * diff * diff;
  }
  
  const populationVariance = sumOfSquares / n;
  const sampleVariance = n > 1 ? sumOfSquares / (n - 1) : 0;
  
  const populationSD = Math.sqrt(populationVariance);
  const sampleSD = Math.sqrt(sampleVariance);
  
  const standardError = sampleSD / Math.sqrt(n);
  const meanAbsoluteDeviation = sumOfAbsoluteDeviations / n;
  
  const coefficientOfVariationPop = mean !== 0 ? (populationSD / mean) * 100 : 0;
  const coefficientOfVariationSample = mean !== 0 ? (sampleSD / mean) * 100 : 0;
  const relativeStandardDeviation = coefficientOfVariationSample;
  
  // Median
  let median = 0;
  if (n % 2 === 0) {
    median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  } else {
    median = sorted[Math.floor(n / 2)];
  }
  
  // Quartiles (Tukey's hinges or standard method)
  const getMedian = (arr: number[]) => {
    const len = arr.length;
    if (len === 0) return 0;
    if (len % 2 === 0) return (arr[len / 2 - 1] + arr[len / 2]) / 2;
    return arr[Math.floor(len / 2)];
  };
  
  let q1 = 0;
  let q3 = 0;
  
  if (n === 1) {
    q1 = sorted[0];
    q3 = sorted[0];
  } else {
    const lowerHalf = sorted.slice(0, Math.floor(n / 2));
    const upperHalf = sorted.slice(Math.ceil(n / 2));
    q1 = getMedian(lowerHalf);
    q3 = getMedian(upperHalf);
  }
  
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  
  const outliers = sorted.filter(x => x < lowerFence || x > upperFence);
  
  // Mode
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  for (const val of sorted) {
    frequency[val] = (frequency[val] || 0) + 1;
    if (frequency[val] > maxFreq) maxFreq = frequency[val];
  }
  
  const mode = [];
  if (maxFreq > 1) { // If all values appear once, there is no mode. (Some definitions say all are mode, we'll return empty)
    for (const val in frequency) {
      if (frequency[val] === maxFreq) mode.push(Number(val));
    }
  }

  // Skewness (Sample Skewness)
  let skewness = 0;
  if (n > 2 && sampleSD > 0) {
    skewness = (n * sumCubed) / ((n - 1) * (n - 2) * Math.pow(sampleSD, 3));
  }
  
  // Kurtosis (Sample Excess Kurtosis)
  let kurtosis = 0;
  if (n > 3 && sampleSD > 0) {
    const factor1 = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
    const factor2 = sumFourth / Math.pow(sampleSD, 4);
    const factor3 = (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
    kurtosis = factor1 * factor2 - factor3;
  }

  return {
    sampleSize: n,
    mean,
    median,
    mode,
    min,
    max,
    range,
    populationVariance,
    sampleVariance,
    populationSD,
    sampleSD,
    standardError,
    meanAbsoluteDeviation,
    coefficientOfVariationPop,
    coefficientOfVariationSample,
    relativeStandardDeviation,
    q1,
    q2: median,
    q3,
    iqr,
    lowerFence,
    upperFence,
    outliers,
    skewness,
    kurtosis,
    sum,
    sumOfSquares
  };
}

export function parseDataset(input: string): number[] {
  if (!input || input.trim() === '') return [];
  const rawValues = input.split(/[\s,;\t\n]+/).map(v => v.trim()).filter(v => v !== '');
  const parsed = rawValues.map(v => parseFloat(v));
  return parsed.filter(v => !isNaN(v));
}

// Expand grouped data to flat array
export function groupedDataToFlat(data: { classMidpoint: number; frequency: number }[]): number[] {
  const result: number[] = [];
  for (const group of data) {
    for (let i = 0; i < group.frequency; i++) {
      result.push(group.classMidpoint);
    }
  }
  return result;
}

// Frequency table to flat array
export function frequencyTableToFlat(data: { value: number; frequency: number }[]): number[] {
  const result: number[] = [];
  for (const item of data) {
    for (let i = 0; i < item.frequency; i++) {
      result.push(item.value);
    }
  }
  return result;
}
