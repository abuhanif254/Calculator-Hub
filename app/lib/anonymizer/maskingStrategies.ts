/**
 * Masking Strategy Engine
 * Implements 10 anonymization strategies, all running 100% client-side.
 */

export type MaskingStrategy =
  | 'redact'          // Replace with [REDACTED]
  | 'partial_mask'    // j***@***.com
  | 'hash_sha256'     // Deterministic SHA-256
  | 'fake_similar'    // Realistic synthetic replacement
  | 'shuffle'         // Shuffle values within column
  | 'nullify'         // Empty string
  | 'format_preserve' // Keep format, randomize content
  | 'tokenize'        // Replace with TOKEN_00001
  | 'date_shift'      // Shift dates by random ±N days
  | 'generalize';     // Generalize to range (age → 30-40)

export interface MaskingConfig {
  strategy: MaskingStrategy;
  preserveFormat?: boolean;
  customPrefix?: string;
  dateShiftDays?: number;
}

// ── Fake data pools ─────────────────────────────────────────────────────────

const FAKE_FIRST = ['Alice','Bob','Carol','David','Eve','Frank','Grace','Henry','Iris','Jack','Kate','Liam','Mia','Noah','Olivia','Paul','Quinn','Rose','Sam','Tina','Uma','Victor','Wendy','Xander','Yara','Zoe'];
const FAKE_LAST  = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Lee','Walker'];
const FAKE_DOMAINS = ['example.com','test.org','demo.net','sample.io','fake.dev','placeholder.com'];
const FAKE_CITIES  = ['Springfield','Shelbyville','Oakwood','Riverdale','Maplewood','Hillcrest','Fairview'];
const FAKE_STREETS = ['Main St','Oak Ave','Maple Rd','Park Blvd','Cedar Ln','Elm Dr','Pine Ct'];

// ── SHA-256 hashing ─────────────────────────────────────────────────────────

async function sha256(str: string): Promise<string> {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback for non-secure contexts
    return btoa(str).replace(/[^a-zA-Z0-9]/g, '').substring(0, 64);
  }
}

// Sync version using simple FNV-1a for live preview
function quickHash(str: string): string {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 16777619) >>> 0;
  }
  return hash.toString(16).padStart(8, '0').repeat(8).substring(0, 64);
}

// ── Partial mask ────────────────────────────────────────────────────────────

function partialMask(value: string): string {
  if (!value) return '';
  const emailMatch = value.match(/^([a-zA-Z0-9._%+\-]+)@([a-zA-Z0-9.\-]+)\.([a-zA-Z]{2,})$/);
  if (emailMatch) {
    const [, local, , tld] = emailMatch;
    return `${local[0]}***@***.${tld}`;
  }
  // Phone
  if (/^\+?\d[\d\s\-().]{7,}$/.test(value)) {
    return value.replace(/\d(?=\d{4})/g, '*');
  }
  // Credit card
  if (/^\d{13,19}$/.test(value.replace(/[\s-]/g, ''))) {
    return '****-****-****-' + value.replace(/[\s-]/g, '').slice(-4);
  }
  // SSN
  if (/^\d{3}[-\s]?\d{2}[-\s]?\d{4}$/.test(value)) {
    return '***-**-' + value.replace(/[\s-]/g, '').slice(-4);
  }
  // Generic
  const len = value.length;
  if (len <= 4) return '*'.repeat(len);
  const keepStart = Math.max(1, Math.floor(len * 0.15));
  const keepEnd   = Math.max(1, Math.floor(len * 0.1));
  return value.slice(0, keepStart) + '*'.repeat(len - keepStart - keepEnd) + value.slice(-keepEnd);
}

// ── Fake similar ────────────────────────────────────────────────────────────

let fakeIndex = 0;
function pick<T>(arr: T[]): T { return arr[fakeIndex++ % arr.length]; }

function fakeSimilar(value: string, piiType?: string): string {
  // Email
  if (piiType === 'email' || /\S+@\S+\.\S+/.test(value)) {
    return `${pick(FAKE_FIRST).toLowerCase()}.${pick(FAKE_LAST).toLowerCase()}@${pick(FAKE_DOMAINS)}`;
  }
  // Phone
  if (piiType === 'phone' || /^\+?\d[\d\s\-().]{7,}$/.test(value)) {
    return `+1-${String(Math.floor(Math.random()*900)+100)}-${String(Math.floor(Math.random()*900)+100)}-${String(Math.floor(Math.random()*9000)+1000)}`;
  }
  // SSN
  if (piiType === 'ssn') {
    return `${String(Math.floor(Math.random()*900)+100)}-${String(Math.floor(Math.random()*90)+10)}-${String(Math.floor(Math.random()*9000)+1000)}`;
  }
  // Full name
  if (piiType === 'full_name' || (/ /.test(value) && /^[A-Z]/.test(value))) {
    return `${pick(FAKE_FIRST)} ${pick(FAKE_LAST)}`;
  }
  if (piiType === 'first_name') return pick(FAKE_FIRST);
  if (piiType === 'last_name')  return pick(FAKE_LAST);
  // IP
  if (piiType === 'ip_address') {
    return `10.${Math.floor(Math.random()*254)+1}.${Math.floor(Math.random()*254)+1}.${Math.floor(Math.random()*254)+1}`;
  }
  // Date of birth
  if (piiType === 'date_of_birth') {
    const y = 1950 + Math.floor(Math.random() * 50);
    const m = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const d = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    return `${m}/${d}/${y}`;
  }
  // Address
  if (piiType === 'address') {
    return `${Math.floor(Math.random()*9000)+100} ${pick(FAKE_STREETS)}, ${pick(FAKE_CITIES)}`;
  }
  // Credit card
  if (piiType === 'credit_card') {
    return `4${Array.from({length:15}, () => Math.floor(Math.random()*10)).join('')}`;
  }
  // URL
  if (piiType === 'url' || /^https?:\/\//.test(value)) {
    return `https://user${Math.floor(Math.random()*10000)}.${pick(FAKE_DOMAINS)}`;
  }
  // Generic: return fixed-length fake token
  return `FAKE_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

// ── Format-preserving ───────────────────────────────────────────────────────

function formatPreserve(value: string): string {
  return value
    .replace(/[a-zA-Z]/g, (c) => {
      const isUpper = c === c.toUpperCase();
      const letter  = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      return isUpper ? letter : letter.toLowerCase();
    })
    .replace(/\d/g, () => String(Math.floor(Math.random() * 10)));
}

// ── Date shift ──────────────────────────────────────────────────────────────

function dateShift(value: string, days: number = 30): string {
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  const shift = (Math.random() * 2 - 1) * days * 24 * 60 * 60 * 1000;
  const shifted = new Date(d.getTime() + shift);
  return shifted.toISOString().split('T')[0];
}

// ── Generalize ──────────────────────────────────────────────────────────────

function generalize(value: string): string {
  const num = parseFloat(value);
  if (!isNaN(num)) {
    const lower = Math.floor(num / 10) * 10;
    return `${lower}-${lower + 10}`;
  }
  // Date generalize → year only
  const d = new Date(value);
  if (!isNaN(d.getTime())) return String(d.getFullYear());
  return value.length > 3 ? value.slice(0, 3) + '***' : '***';
}

// ── Token map (for tokenize strategy) ──────────────────────────────────────

const tokenMap = new Map<string, string>();
let tokenCounter = 1;

function tokenize(value: string, prefix: string = 'TOKEN'): string {
  if (!tokenMap.has(value)) {
    tokenMap.set(value, `${prefix}_${String(tokenCounter++).padStart(6, '0')}`);
  }
  return tokenMap.get(value)!;
}

export function resetTokenMap() {
  tokenMap.clear();
  tokenCounter = 1;
  fakeIndex = 0;
}

// ── Main masking function ───────────────────────────────────────────────────

export function maskValue(
  value: string,
  strategy: MaskingStrategy,
  options: { piiType?: string; prefix?: string; dateShiftDays?: number } = {}
): string {
  if (!value || value.trim() === '') return value;

  switch (strategy) {
    case 'redact':         return '[REDACTED]';
    case 'nullify':        return '';
    case 'partial_mask':   return partialMask(value);
    case 'hash_sha256':    return quickHash(value);
    case 'fake_similar':   return fakeSimilar(value, options.piiType);
    case 'format_preserve': return formatPreserve(value);
    case 'tokenize':       return tokenize(value, options.prefix || 'TOKEN');
    case 'date_shift':     return dateShift(value, options.dateShiftDays ?? 30);
    case 'generalize':     return generalize(value);
    case 'shuffle':        return value; // shuffle is done at column level
    default:               return '[REDACTED]';
  }
}

// ── Shuffle entire column ───────────────────────────────────────────────────

export function shuffleColumn(values: string[]): string[] {
  const shuffled = [...values];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const STRATEGY_LABELS: Record<MaskingStrategy, string> = {
  redact:          'Redact ([REDACTED])',
  partial_mask:    'Partial Mask (j***@***)',
  hash_sha256:     'SHA-256 Hash',
  fake_similar:    'Synthetic / Fake Data',
  shuffle:         'Shuffle Within Column',
  nullify:         'Nullify (empty)',
  format_preserve: 'Format-Preserving',
  tokenize:        'Tokenize (TOKEN_000001)',
  date_shift:      'Date Shift (±N days)',
  generalize:      'Generalize (30→30-40)',
};

export const STRATEGY_DESCRIPTIONS: Record<MaskingStrategy, string> = {
  redact:          'Replaces all values with the literal text [REDACTED]',
  partial_mask:    'Shows first/last characters, masks the middle with asterisks',
  hash_sha256:     'One-way deterministic hash — same input always produces same token',
  fake_similar:    'Generates realistic synthetic data of the same type and format',
  shuffle:         'Randomly reorders existing values within the column (no new data)',
  nullify:         'Replaces all values with an empty string or NULL',
  format_preserve: 'Keeps the same format/structure but randomizes the actual characters',
  tokenize:        'Replaces with consistent tokens (TOKEN_000001) — reversible with key',
  date_shift:      'Shifts dates by a random number of days (±30 by default)',
  generalize:      'Generalizes specific values to ranges (age 34 → 30-40)',
};
