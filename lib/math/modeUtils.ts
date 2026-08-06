/**
 * Advanced Mode & Frequency Distribution Utilities
 */

export interface GroupedDataClass {
  min: number;
  max: number;
  frequency: number;
}

export interface FrequencyTableRow {
  value: number;
  frequency: number;
  relativeFrequency: number; // 0 to 1
  cumulativeFrequency: number;
}

export type ModalityType = 'no-mode' | 'uni-modal' | 'bi-modal' | 'multi-modal';

export interface ModeAnalysisMetrics {
  count: number;
  min: number;
  max: number;
  range: number;
  
  mean: number;
  median: number;
  
  varianceSample: number;
  standardDeviationSample: number;
  
  modes: number[];
  highestFrequency: number;
  modalityType: ModalityType;
  
  frequencyTable: FrequencyTableRow[];
}

/**
 * Parses a raw string input into an array of numbers.
 * Supports comma, space, newline, or tab delimiters.
 */
export function parseRawDataset(input: string): number[] {
  if (!input || input.trim() === '') return [];
  const normalized = input.replace(/[\n\t,]/g, ' ');
  const tokens = normalized.split(/\s+/).filter(t => t.trim() !== '');
  return tokens.map(t => parseFloat(t)).filter(n => !isNaN(n));
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
    const mainParts = cleanLine.split(/[, \t]+/).filter(p => p.trim() !== '');
    if (mainParts.length >= 2) {
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
 * Estimates mode for grouped data using the standard modal class formula.
 */
export function estimateModeGrouped(groups: GroupedDataClass[]): number | null {
  if (groups.length === 0) return null;
  
  // Find modal class (highest frequency)
  let maxFreq = -1;
  let modalIndex = -1;
  
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].frequency > maxFreq) {
      maxFreq = groups[i].frequency;
      modalIndex = i;
    }
  }
  
  // Check if multiple classes have the same max frequency (simplification: return first)
  // For true multimodal grouped data, we'd return multiple, but standard formula usually applies to unimodal.
  
  const modalClass = groups[modalIndex];
  const L = modalClass.min; // Lower limit of modal class
  const fm = modalClass.frequency; // Frequency of modal class
  const fm1 = modalIndex > 0 ? groups[modalIndex - 1].frequency : 0; // Frequency of class before
  const fm2 = modalIndex < groups.length - 1 ? groups[modalIndex + 1].frequency : 0; // Frequency of class after
  const w = modalClass.max - modalClass.min; // Class width
  
  const d1 = fm - fm1;
  const d2 = fm - fm2;
  
  if (d1 + d2 === 0) return L + (w / 2); // Fallback to midpoint if flat
  
  return L + (d1 / (d1 + d2)) * w;
}

/**
 * Calculates a percentile using linear interpolation.
 */
function calculatePercentile(sortedData: number[], p: number): number {
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
 * Perform a comprehensive analysis of a dataset specifically geared towards Modes and Frequencies.
 */
export function analyzeModeDataset(data: number[]): ModeAnalysisMetrics {
  const n = data.length;
  if (n === 0) {
    return {
      count: 0, min: 0, max: 0, range: 0, mean: 0, median: 0,
      varianceSample: 0, standardDeviationSample: 0,
      modes: [], highestFrequency: 0, modalityType: 'no-mode',
      frequencyTable: []
    };
  }

  // Basic Stats
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;
  
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const median = calculatePercentile(sorted, 50);
  
  const squaredDiffs = data.map(v => Math.pow(v - mean, 2));
  const varianceSample = n > 1 ? squaredDiffs.reduce((a, b) => a + b, 0) / (n - 1) : 0;
  const standardDeviationSample = Math.sqrt(varianceSample);
  
  // Frequency Analysis
  const freqMap = new Map<number, number>();
  let highestFreq = 0;
  for (const val of sorted) { // Process sorted so map iterates in order
    const count = (freqMap.get(val) || 0) + 1;
    freqMap.set(val, count);
    if (count > highestFreq) highestFreq = count;
  }
  
  // Modes Determination
  const uniqueVals = Array.from(freqMap.keys());
  let modes: number[] = [];
  let modalityType: ModalityType = 'no-mode';
  
  // If all values occur exactly the same number of times (e.g. all 1 time, or all 2 times)
  // then technically there is no single peak. Thus "No Mode".
  const allSameFreq = Array.from(freqMap.values()).every(f => f === highestFreq);
  
  if (allSameFreq || highestFreq === 1) {
    modes = []; // No mode
    modalityType = 'no-mode';
  } else {
    for (const [val, freq] of Array.from(freqMap.entries())) {
      if (freq === highestFreq) modes.push(val);
    }
    
    if (modes.length === 1) modalityType = 'uni-modal';
    else if (modes.length === 2) modalityType = 'bi-modal';
    else modalityType = 'multi-modal';
  }
  
  // Build Frequency Table
  const frequencyTable: FrequencyTableRow[] = [];
  let cumFreq = 0;
  for (const [val, freq] of Array.from(freqMap.entries())) {
    cumFreq += freq;
    frequencyTable.push({
      value: val,
      frequency: freq,
      relativeFrequency: freq / n,
      cumulativeFrequency: cumFreq
    });
  }

  return {
    count: n, min, max, range,
    mean, median,
    varianceSample, standardDeviationSample,
    modes, highestFrequency: highestFreq, modalityType,
    frequencyTable
  };
}
