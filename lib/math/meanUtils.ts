export interface MeanAnalysisMetrics {
  count: number;
  arithmeticMean: number;
  geometricMean: number | null;
  harmonicMean: number | null;
  median: number;
  modes: number[];
  min: number;
  max: number;
  range: number;
  variancePopulation: number;
  varianceSample: number | null;
  standardDeviationPopulation: number;
  standardDeviationSample: number | null;
  q1: number;
  q3: number;
  iqr: number;
  cv: number | null; // Coefficient of Variation (Sample)
  mad: number; // Mean Absolute Deviation
  skewness: number | null;
  kurtosis: number | null;
  outliers: number[];
}

// ============================================================================
// PARSERS
// ============================================================================

export function parseRawDataset(input: string): number[] {
  if (!input || input.trim() === '') return [];
  const normalized = input.replace(/[\n\t,]/g, ' ');
  const parts = normalized.split(/\s+/);
  const nums: number[] = [];
  
  for (const p of parts) {
    if (p.trim() === '') continue;
    const n = parseFloat(p);
    if (!isNaN(n)) nums.push(n);
  }
  
  return nums;
}

export function parseFrequencyTable(input: string): { value: number; freq: number }[] {
  if (!input || input.trim() === '') return [];
  const lines = input.split('\n');
  const result: { value: number; freq: number }[] = [];
  
  for (const line of lines) {
    const parts = line.trim().split(/[\t,; ]+/);
    if (parts.length >= 2) {
      const v = parseFloat(parts[0]);
      const f = parseFloat(parts[1]);
      if (!isNaN(v) && !isNaN(f) && f > 0) {
        result.push({ value: v, freq: f });
      }
    }
  }
  
  return result;
}

export function expandFrequencyTable(table: { value: number; freq: number }[]): number[] {
  const result: number[] = [];
  for (const item of table) {
    for (let i = 0; i < Math.round(item.freq); i++) {
      result.push(item.value);
    }
  }
  return result;
}

// Grouped data is handled by expanding to midpoints multiplied by frequencies
export function parseGroupedData(input: string): { mid: number; freq: number, lower: number, upper: number }[] {
  if (!input || input.trim() === '') return [];
  const lines = input.split('\n');
  const result: { mid: number; freq: number, lower: number, upper: number }[] = [];
  
  for (const line of lines) {
    const parts = line.trim().split(/[\t,; ]+/);
    if (parts.length >= 2) {
      const range = parts[0].split('-');
      if (range.length === 2) {
        const lower = parseFloat(range[0]);
        const upper = parseFloat(range[1]);
        const freq = parseFloat(parts[1]);
        
        if (!isNaN(lower) && !isNaN(upper) && !isNaN(freq) && freq > 0) {
          result.push({ mid: (lower + upper) / 2, freq, lower, upper });
        }
      }
    }
  }
  
  return result;
}

// ============================================================================
// CORE MEAN FUNCTIONS
// ============================================================================

export function calculateArithmeticMean(data: number[]): number {
  if (data.length === 0) return 0;
  return data.reduce((a, b) => a + b, 0) / data.length;
}

export function calculateWeightedMean(values: number[], weights: number[]): number | null {
  if (values.length === 0 || values.length !== weights.length) return null;
  let sumWeights = 0;
  let sumProd = 0;
  for (let i = 0; i < values.length; i++) {
    sumProd += values[i] * weights[i];
    sumWeights += weights[i];
  }
  return sumWeights === 0 ? null : sumProd / sumWeights;
}

export function calculateGeometricMean(data: number[]): number | null {
  if (data.length === 0) return null;
  let logSum = 0;
  for (const val of data) {
    if (val <= 0) return null; // Geometric mean is only defined for strictly positive numbers
    logSum += Math.log(val);
  }
  return Math.exp(logSum / data.length);
}

export function calculateHarmonicMean(data: number[]): number | null {
  if (data.length === 0) return null;
  let sumReciprocals = 0;
  for (const val of data) {
    if (val <= 0) return null; // Harmonic mean traditionally used for positive numbers
    sumReciprocals += 1 / val;
  }
  return sumReciprocals === 0 ? null : data.length / sumReciprocals;
}

export function calculateTrimmedMean(data: number[], trimPercent: number = 10): number {
  if (data.length === 0) return 0;
  const sorted = [...data].sort((a, b) => a - b);
  const trimCount = Math.floor(data.length * (trimPercent / 100));
  if (trimCount * 2 >= data.length) return calculateArithmeticMean(sorted); // fallback if trimmed too much
  const trimmedData = sorted.slice(trimCount, data.length - trimCount);
  return calculateArithmeticMean(trimmedData);
}

export function calculateRunningMean(data: number[]): number[] {
  const result: number[] = [];
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
    result.push(sum / (i + 1));
  }
  return result;
}

// ============================================================================
// DESCRIPTIVE STATISTICS
// ============================================================================

export function analyzeDatasetFull(data: number[]): MeanAnalysisMetrics {
  const count = data.length;
  if (count === 0) {
    return {
      count: 0,
      arithmeticMean: 0,
      geometricMean: null,
      harmonicMean: null,
      median: 0,
      modes: [],
      min: 0,
      max: 0,
      range: 0,
      variancePopulation: 0,
      varianceSample: null,
      standardDeviationPopulation: 0,
      standardDeviationSample: null,
      q1: 0,
      q3: 0,
      iqr: 0,
      cv: null,
      mad: 0,
      skewness: null,
      kurtosis: null,
      outliers: []
    };
  }

  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;
  
  const arithmeticMean = calculateArithmeticMean(data);
  const geometricMean = calculateGeometricMean(data);
  const harmonicMean = calculateHarmonicMean(data);

  // Median
  const mid = Math.floor(count / 2);
  const median = count % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  // Modes
  const freqMap = new Map<number, number>();
  let maxFreq = 0;
  for (const val of data) {
    const freq = (freqMap.get(val) || 0) + 1;
    freqMap.set(val, freq);
    if (freq > maxFreq) maxFreq = freq;
  }
  const modes: number[] = [];
  if (maxFreq > 1) { // Only count as mode if it appears more than once
    for (const [val, freq] of Array.from(freqMap.entries())) {
      if (freq === maxFreq) modes.push(val);
    }
  }

  // Dispersion
  let sumSqDiff = 0;
  let sumAbsDiff = 0;
  let sumCubeDiff = 0;
  let sumQuadDiff = 0;

  for (const val of data) {
    const diff = val - arithmeticMean;
    sumAbsDiff += Math.abs(diff);
    sumSqDiff += diff * diff;
    sumCubeDiff += Math.pow(diff, 3);
    sumQuadDiff += Math.pow(diff, 4);
  }

  const mad = sumAbsDiff / count;
  const variancePopulation = sumSqDiff / count;
  const varianceSample = count > 1 ? sumSqDiff / (count - 1) : null;
  const stdDevPop = Math.sqrt(variancePopulation);
  const stdDevSamp = varianceSample !== null ? Math.sqrt(varianceSample) : null;
  
  const cv = stdDevSamp !== null && arithmeticMean !== 0 ? (stdDevSamp / Math.abs(arithmeticMean)) * 100 : null;

  // Skewness (Sample)
  let skewness: number | null = null;
  if (count > 2 && stdDevSamp !== null && stdDevSamp > 0) {
    const n = count;
    skewness = (n / ((n - 1) * (n - 2))) * (sumCubeDiff / Math.pow(stdDevSamp, 3));
  }

  // Kurtosis (Sample Excess Kurtosis)
  let kurtosis: number | null = null;
  if (count > 3 && stdDevSamp !== null && stdDevSamp > 0) {
    const n = count;
    const factor1 = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
    const factor2 = sumQuadDiff / Math.pow(stdDevSamp, 4);
    const factor3 = (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
    kurtosis = factor1 * factor2 - factor3;
  }

  // Quartiles (Method 1: exclusive)
  const getMedian = (arr: number[]) => {
    if (arr.length === 0) return 0;
    const m = Math.floor(arr.length / 2);
    return arr.length % 2 === 0 ? (arr[m - 1] + arr[m]) / 2 : arr[m];
  };
  
  const lowerHalf = sorted.slice(0, Math.floor(count / 2));
  const upperHalf = count % 2 === 0 ? sorted.slice(Math.floor(count / 2)) : sorted.slice(Math.floor(count / 2) + 1);
  
  const q1 = getMedian(lowerHalf);
  const q3 = getMedian(upperHalf);
  const iqr = q3 - q1;

  // Outliers (Tukey's Fences)
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = sorted.filter(v => v < lowerFence || v > upperFence);

  return {
    count,
    arithmeticMean,
    geometricMean,
    harmonicMean,
    median,
    modes: modes.sort((a,b) => a-b),
    min,
    max,
    range,
    variancePopulation,
    varianceSample,
    standardDeviationPopulation: stdDevPop,
    standardDeviationSample: stdDevSamp,
    q1,
    q3,
    iqr,
    cv,
    mad,
    skewness,
    kurtosis,
    outliers
  };
}

// ============================================================================
// INTERPRETATION
// ============================================================================

export function interpretSkewness(skew: number | null): string {
  if (skew === null) return 'insufficient_data';
  if (Math.abs(skew) < 0.5) return 'approx_symmetric';
  if (skew <= -1) return 'highly_skewed_left';
  if (skew < -0.5) return 'moderately_skewed_left';
  if (skew >= 1) return 'highly_skewed_right';
  return 'moderately_skewed_right';
}

export function interpretKurtosis(kurt: number | null): string {
  if (kurt === null) return 'insufficient_data';
  if (Math.abs(kurt) < 0.5) return 'mesokurtic';
  if (kurt > 0.5) return 'leptokurtic';
  return 'platykurtic';
}
