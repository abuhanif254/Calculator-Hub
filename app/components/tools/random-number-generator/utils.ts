export type RandomMode = 'standard' | 'dice' | 'picker' | 'password';

export interface StandardOptions {
  min: number;
  max: number;
  amount: number;
  decimals: number;
  unique: boolean;
  oddOnly: boolean;
  evenOnly: boolean;
  exclude: string; // comma-separated
}

export interface DiceOptions {
  amount: number;
  type: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';
}

export interface PasswordOptions {
  amount: number;
  length: number;
}

export interface PickerOptions {
  amount: number;
  pool: string; // comma-separated list of items or numbers
  unique: boolean;
}

export interface Statistics {
  min: number | null;
  max: number | null;
  sum: number;
  avg: number | null;
  median: number | null;
  range: number | null;
}

// Cryptographically secure random number between 0 (inclusive) and 1 (exclusive)
export function getSecureRandom(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / (0xffffffff + 1);
  }
  return Math.random();
}

// Generate random number between min and max (inclusive)
function getRandomInt(min: number, max: number): number {
  const minC = Math.ceil(min);
  const maxC = Math.floor(max);
  return Math.floor(getSecureRandom() * (maxC - minC + 1)) + minC;
}

function getRandomFloat(min: number, max: number, decimals: number): number {
  const val = getSecureRandom() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

export function generateStandard(options: StandardOptions): number[] {
  let { min, max, amount, decimals, unique, oddOnly, evenOnly, exclude } = options;
  
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  const excludeSet = new Set(exclude.split(',').map(s => s.trim()).filter(s => s !== '').map(Number).filter(n => !isNaN(n)));
  
  const results: number[] = [];
  const generatedSet = new Set<number>();

  let maxAttempts = amount * 1000;
  let attempts = 0;

  while (results.length < amount && attempts < maxAttempts) {
    attempts++;
    
    let num = decimals > 0 ? getRandomFloat(min, max, decimals) : getRandomInt(min, max);

    if (unique && generatedSet.has(num)) continue;
    if (excludeSet.has(num)) continue;
    
    if (decimals === 0) {
      if (oddOnly && num % 2 === 0) continue;
      if (evenOnly && num % 2 !== 0) continue;
    }

    results.push(num);
    if (unique) generatedSet.add(num);
  }

  return results;
}

export function generateDice(options: DiceOptions): number[] {
  const max = parseInt(options.type.substring(1));
  const results: number[] = [];
  for (let i = 0; i < options.amount; i++) {
    results.push(getRandomInt(1, max));
  }
  return results;
}

export function generatePasswordTokens(options: PasswordOptions): string[] {
  const results: string[] = [];
  for (let i = 0; i < options.amount; i++) {
    let token = '';
    for (let j = 0; j < options.length; j++) {
      token += getRandomInt(0, 9).toString();
    }
    results.push(token);
  }
  return results;
}

export function calculateStatistics(numbers: number[]): Statistics {
  if (numbers.length === 0) {
    return { min: null, max: null, sum: 0, avg: null, median: null, range: null };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;
  
  let median = 0;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }

  const range = max - min;

  return { min, max, sum, avg, median, range };
}

export function downloadFile(content: string, filename: string, type: string) {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
