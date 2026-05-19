// ═══════════════════════════════════════════════════════
// CSV Viewer Utilities — Client-side CSV Parsing, Analysis & Conversion
// ═══════════════════════════════════════════════════════

// ─── Types ──────────────────────────────────────────
export interface ParsedCSV {
  headers: string[];
  rows: string[][];
  errors: ValidationError[];
}

export interface ValidationError {
  row: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface ColumnInfo {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'mixed' | 'empty';
  visible: boolean;
  width: number;
  order: number;
  emptyCells: number;
}

export interface CSVAnalytics {
  rowCount: number;
  columnCount: number;
  emptyCells: number;
  duplicateRows: number;
  fileSizeEstimate: string;
  columnTypes: Record<string, string>;
  largestColumn: string;
}

export interface SearchResult {
  row: number;
  col: number;
}

export interface SortConfig {
  column: number;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  column: number;
  value: string;
  type: 'contains' | 'exact' | 'empty' | 'notEmpty';
}

// ─── CSV Parsing ────────────────────────────────────

/**
 * RFC-4180 compliant CSV parser.
 * Handles quoted fields, escaped quotes, multiline values, and various delimiters.
 */
export function parseCSV(text: string, delimiter?: string): ParsedCSV {
  if (!text || !text.trim()) {
    return { headers: [], rows: [], errors: [] };
  }

  // Strip BOM if present
  let input = text;
  if (input.charCodeAt(0) === 0xFEFF) {
    input = input.slice(1);
  }

  // Auto-detect delimiter if not specified
  const detectedDelimiter = delimiter || detectDelimiter(input);
  const errors: ValidationError[] = [];

  const records: string[][] = [];
  let currentField = '';
  let currentRow: string[] = [];
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    const nextChar = i + 1 < input.length ? input[i + 1] : '';

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote
          currentField += '"';
          i += 2;
        } else {
          // End of quoted field
          inQuotes = false;
          i++;
        }
      } else {
        currentField += char;
        i++;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        i++;
      } else if (char === detectedDelimiter) {
        currentRow.push(currentField);
        currentField = '';
        i++;
      } else if (char === '\r' && nextChar === '\n') {
        currentRow.push(currentField);
        currentField = '';
        records.push(currentRow);
        currentRow = [];
        i += 2;
      } else if (char === '\n' || char === '\r') {
        currentRow.push(currentField);
        currentField = '';
        records.push(currentRow);
        currentRow = [];
        i++;
      } else {
        currentField += char;
        i++;
      }
    }
  }

  // Last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    records.push(currentRow);
  }

  // Filter out empty trailing rows
  while (records.length > 0 && records[records.length - 1].every(f => f === '')) {
    records.pop();
  }

  if (records.length === 0) {
    return { headers: [], rows: [], errors: [] };
  }

  const headers = records[0];
  const rows = records.slice(1);
  const expectedCols = headers.length;

  // Validate rows
  rows.forEach((row, idx) => {
    if (row.length !== expectedCols) {
      errors.push({
        row: idx + 2, // 1-indexed, plus header row
        message: `Row ${idx + 2} has ${row.length} columns (expected ${expectedCols})`,
        severity: row.length < expectedCols ? 'warning' : 'error',
      });
    }
  });

  // Normalize row lengths
  const normalizedRows = rows.map(row => {
    if (row.length < expectedCols) {
      return [...row, ...Array(expectedCols - row.length).fill('')];
    }
    if (row.length > expectedCols) {
      return row.slice(0, expectedCols);
    }
    return row;
  });

  return { headers, rows: normalizedRows, errors };
}

// ─── Delimiter Detection ────────────────────────────

function detectDelimiter(text: string): string {
  const firstLines = text.split(/\r?\n/).slice(0, 5).join('\n');
  const candidates = [',', ';', '\t', '|'];
  let best = ',';
  let bestScore = 0;

  for (const delim of candidates) {
    const lines = firstLines.split(/\r?\n/).filter(l => l.trim());
    if (lines.length === 0) continue;
    const counts = lines.map(l => {
      let count = 0;
      let inQ = false;
      for (const ch of l) {
        if (ch === '"') inQ = !inQ;
        else if (ch === delim && !inQ) count++;
      }
      return count;
    });
    const allSame = counts.every(c => c === counts[0]) && counts[0] > 0;
    const score = allSame ? counts[0] * lines.length * 10 : counts.reduce((a, b) => a + b, 0);
    if (score > bestScore) {
      bestScore = score;
      best = delim;
    }
  }

  return best;
}

// ─── Column Type Detection ──────────────────────────

const DATE_PATTERNS = [
  /^\d{4}-\d{2}-\d{2}$/,                    // YYYY-MM-DD
  /^\d{2}\/\d{2}\/\d{4}$/,                  // MM/DD/YYYY or DD/MM/YYYY
  /^\d{2}-\d{2}-\d{4}$/,                    // MM-DD-YYYY
  /^\d{4}\/\d{2}\/\d{2}$/,                  // YYYY/MM/DD
  /^\d{1,2}\s\w+\s\d{4}$/,                  // 1 Jan 2024
];

export function detectColumnType(values: string[]): 'text' | 'number' | 'date' | 'boolean' | 'mixed' | 'empty' {
  const nonEmpty = values.filter(v => v.trim() !== '');
  if (nonEmpty.length === 0) return 'empty';

  let numberCount = 0;
  let dateCount = 0;
  let booleanCount = 0;

  for (const val of nonEmpty) {
    const trimmed = val.trim().toLowerCase();
    if (trimmed === 'true' || trimmed === 'false' || trimmed === 'yes' || trimmed === 'no') {
      booleanCount++;
    } else if (!isNaN(Number(trimmed)) && trimmed !== '') {
      numberCount++;
    } else if (DATE_PATTERNS.some(p => p.test(trimmed))) {
      dateCount++;
    }
  }

  const threshold = nonEmpty.length * 0.8;
  if (booleanCount >= threshold) return 'boolean';
  if (numberCount >= threshold) return 'number';
  if (dateCount >= threshold) return 'date';
  if (numberCount + dateCount + booleanCount > threshold) return 'mixed';
  return 'text';
}

export function buildColumnInfo(headers: string[], rows: string[][]): ColumnInfo[] {
  return headers.map((name, idx) => {
    const values = rows.map(r => r[idx] || '');
    const type = detectColumnType(values);
    const emptyCells = values.filter(v => v.trim() === '').length;
    const maxLen = Math.max(name.length, ...values.map(v => v.length));
    return {
      name,
      type,
      visible: true,
      width: Math.min(Math.max(maxLen * 9 + 24, 100), 400),
      order: idx,
      emptyCells,
    };
  });
}

// ─── Sorting ────────────────────────────────────────

export function sortRows(rows: string[][], sorts: SortConfig[]): string[][] {
  if (sorts.length === 0) return rows;
  return [...rows].sort((a, b) => {
    for (const sort of sorts) {
      const va = a[sort.column] || '';
      const vb = b[sort.column] || '';
      const numA = Number(va);
      const numB = Number(vb);
      let cmp: number;
      if (!isNaN(numA) && !isNaN(numB) && va !== '' && vb !== '') {
        cmp = numA - numB;
      } else {
        cmp = va.localeCompare(vb, undefined, { numeric: true, sensitivity: 'base' });
      }
      if (cmp !== 0) return sort.direction === 'asc' ? cmp : -cmp;
    }
    return 0;
  });
}

// ─── Filtering ──────────────────────────────────────

export function filterRows(rows: string[][], filters: FilterConfig[]): string[][] {
  if (filters.length === 0) return rows;
  return rows.filter(row => {
    return filters.every(f => {
      const val = row[f.column] || '';
      switch (f.type) {
        case 'contains':
          return val.toLowerCase().includes(f.value.toLowerCase());
        case 'exact':
          return val.toLowerCase() === f.value.toLowerCase();
        case 'empty':
          return val.trim() === '';
        case 'notEmpty':
          return val.trim() !== '';
        default:
          return true;
      }
    });
  });
}

// ─── Search ─────────────────────────────────────────

export function searchCSV(
  rows: string[][],
  query: string,
  caseSensitive: boolean
): SearchResult[] {
  if (!query) return [];
  const results: SearchResult[] = [];
  const q = caseSensitive ? query : query.toLowerCase();
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      const val = caseSensitive ? rows[r][c] : rows[r][c].toLowerCase();
      if (val.includes(q)) {
        results.push({ row: r, col: c });
      }
    }
  }
  return results;
}

// ─── Analytics ──────────────────────────────────────

export function analyzeCSV(headers: string[], rows: string[][]): CSVAnalytics {
  let emptyCells = 0;
  const rowStrings = new Set<string>();
  let duplicateRows = 0;

  for (const row of rows) {
    const key = row.join('\x00');
    if (rowStrings.has(key)) {
      duplicateRows++;
    } else {
      rowStrings.add(key);
    }
    for (const cell of row) {
      if (cell.trim() === '') emptyCells++;
    }
  }

  const columnTypes: Record<string, string> = {};
  let largestColIdx = 0;
  let largestColSize = 0;

  headers.forEach((h, idx) => {
    const values = rows.map(r => r[idx] || '');
    columnTypes[h] = detectColumnType(values);
    const totalLen = values.reduce((a, b) => a + b.length, 0);
    if (totalLen > largestColSize) {
      largestColSize = totalLen;
      largestColIdx = idx;
    }
  });

  const totalChars = headers.join(',').length + rows.map(r => r.join(',')).join('\n').length;
  const fileSizeEstimate = totalChars < 1024
    ? `${totalChars} B`
    : totalChars < 1024 * 1024
      ? `${(totalChars / 1024).toFixed(1)} KB`
      : `${(totalChars / (1024 * 1024)).toFixed(2)} MB`;

  return {
    rowCount: rows.length,
    columnCount: headers.length,
    emptyCells,
    duplicateRows,
    fileSizeEstimate,
    columnTypes,
    largestColumn: headers[largestColIdx] || '',
  };
}

// ─── Validation ─────────────────────────────────────

export function validateCSV(headers: string[], rows: string[][], errors: ValidationError[]): ValidationError[] {
  const allErrors = [...errors];

  // Check for empty headers
  headers.forEach((h, idx) => {
    if (h.trim() === '') {
      allErrors.push({
        row: 1,
        message: `Column ${idx + 1} has an empty header`,
        severity: 'warning',
      });
    }
  });

  // Check for duplicate headers
  const headerSet = new Set<string>();
  headers.forEach((h, idx) => {
    const lower = h.trim().toLowerCase();
    if (lower && headerSet.has(lower)) {
      allErrors.push({
        row: 1,
        message: `Duplicate header "${h}" at column ${idx + 1}`,
        severity: 'warning',
      });
    }
    headerSet.add(lower);
  });

  // Check for rows with all empty values
  rows.forEach((row, idx) => {
    if (row.every(cell => cell.trim() === '')) {
      allErrors.push({
        row: idx + 2,
        message: `Row ${idx + 2} is entirely empty`,
        severity: 'warning',
      });
    }
  });

  return allErrors;
}

// ─── CSV ↔ JSON Conversion ──────────────────────────

export function csvToJson(headers: string[], rows: string[][]): string {
  const objects = rows.map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] || '';
    });
    return obj;
  });
  return JSON.stringify(objects, null, 2);
}

export function jsonToCsv(jsonStr: string): ParsedCSV {
  try {
    const data = JSON.parse(jsonStr);
    if (!Array.isArray(data) || data.length === 0) {
      return { headers: [], rows: [], errors: [{ row: 0, message: 'JSON must be a non-empty array of objects', severity: 'error' }] };
    }
    if (typeof data[0] !== 'object' || data[0] === null) {
      return { headers: [], rows: [], errors: [{ row: 0, message: 'Each array element must be an object', severity: 'error' }] };
    }

    // Collect all unique keys across all objects
    const keySet = new Set<string>();
    data.forEach((item: Record<string, unknown>) => {
      Object.keys(item).forEach(k => keySet.add(k));
    });
    const headers = Array.from(keySet);

    const rows = data.map((item: Record<string, unknown>) =>
      headers.map(h => {
        const val = item[h];
        if (val === null || val === undefined) return '';
        if (typeof val === 'object') return JSON.stringify(val);
        return String(val);
      })
    );

    return { headers, rows, errors: [] };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return { headers: [], rows: [], errors: [{ row: 0, message: `Invalid JSON: ${msg}`, severity: 'error' }] };
  }
}

// ─── Export Functions ───────────────────────────────

function escapeCSVField(field: string, delimiter: string): string {
  // Sanitize potential formula injection
  let sanitized = field;
  if (/^[=+\-@\t\r]/.test(sanitized)) {
    sanitized = "'" + sanitized;
  }
  if (sanitized.includes(delimiter) || sanitized.includes('"') || sanitized.includes('\n') || sanitized.includes('\r')) {
    return '"' + sanitized.replace(/"/g, '""') + '"';
  }
  return sanitized;
}

export function exportCSV(headers: string[], rows: string[][]): string {
  const headerLine = headers.map(h => escapeCSVField(h, ',')).join(',');
  const dataLines = rows.map(row => row.map(cell => escapeCSVField(cell, ',')).join(','));
  return [headerLine, ...dataLines].join('\n');
}

export function exportTSV(headers: string[], rows: string[][]): string {
  const headerLine = headers.map(h => escapeCSVField(h, '\t')).join('\t');
  const dataLines = rows.map(row => row.map(cell => escapeCSVField(cell, '\t')).join('\t'));
  return [headerLine, ...dataLines].join('\n');
}

export function exportTXT(headers: string[], rows: string[][]): string {
  // Pipe-delimited TXT
  const headerLine = headers.join(' | ');
  const separator = headers.map(h => '-'.repeat(Math.max(h.length, 4))).join('-+-');
  const dataLines = rows.map(row =>
    row.map((cell, idx) => cell.padEnd(Math.max(headers[idx]?.length || 4, 4))).join(' | ')
  );
  return [headerLine, separator, ...dataLines].join('\n');
}

// ─── Clipboard Helper ───────────────────────────────

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

// ─── Download Helper ────────────────────────────────

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Sample Datasets ────────────────────────────────

export interface SampleDataset {
  name: string;
  description: string;
  csv: string;
}

export const SAMPLE_DATASETS: SampleDataset[] = [
  {
    name: "Employee Records",
    description: "HR employee dataset with departments and salaries",
    csv: `ID,Name,Department,Position,Salary,Start Date,Active
1,Alice Johnson,Engineering,Senior Developer,125000,2019-03-15,true
2,Bob Smith,Marketing,Marketing Manager,95000,2020-07-01,true
3,Carol Williams,Engineering,Tech Lead,140000,2018-01-10,true
4,David Brown,Sales,Account Executive,85000,2021-04-22,true
5,Eva Martinez,Engineering,Junior Developer,75000,2022-09-05,true
6,Frank Lee,HR,HR Specialist,70000,2020-11-18,true
7,Grace Kim,Marketing,Content Strategist,82000,2021-02-14,true
8,Henry Davis,Engineering,DevOps Engineer,115000,2019-08-20,true
9,Isabel Garcia,Sales,Sales Director,130000,2017-06-30,true
10,James Wilson,Finance,Financial Analyst,90000,2020-03-25,false
11,Karen Taylor,Engineering,QA Engineer,88000,2021-07-12,true
12,Leo Anderson,Marketing,SEO Specialist,78000,2022-01-08,true
13,Maria Thomas,HR,Recruiter,72000,2022-05-19,true
14,Nathan Jackson,Engineering,Backend Developer,110000,2020-10-01,true
15,Olivia White,Sales,Business Development,92000,2021-09-14,true`
  },
  {
    name: "Product Catalog",
    description: "E-commerce product inventory with categories and pricing",
    csv: `SKU,Product Name,Category,Price,Stock,Weight (kg),Rating,Reviews
PRD-001,MacBook Pro 16",Laptops,2499.99,45,2.14,4.8,1250
PRD-002,Dell XPS 15,Laptops,1899.99,62,1.86,4.6,890
PRD-003,Mechanical Keyboard,Accessories,129.99,200,0.95,4.7,456
PRD-004,27" 4K Monitor,Monitors,549.99,78,6.5,4.5,723
PRD-005,Wireless Mouse,Accessories,49.99,350,0.08,4.3,1890
PRD-006,USB-C Hub,Accessories,79.99,180,0.12,4.4,567
PRD-007,Standing Desk,Furniture,699.99,25,35.0,4.6,234
PRD-008,Ergonomic Chair,Furniture,449.99,40,18.5,4.7,412
PRD-009,Webcam HD,Accessories,89.99,150,0.15,4.2,678
PRD-010,Noise Cancelling Headphones,Audio,299.99,95,0.25,4.8,1567
PRD-011,Portable SSD 1TB,Storage,109.99,120,0.05,4.7,934
PRD-012,34" Ultrawide Monitor,Monitors,899.99,30,8.2,4.6,345`
  },
  {
    name: "Financial Data",
    description: "Quarterly revenue data across regions",
    csv: `Quarter,Region,Revenue,Expenses,Profit,Growth %,Employees
Q1 2024,North America,1250000,890000,360000,12.5,145
Q1 2024,Europe,980000,720000,260000,8.3,98
Q1 2024,Asia Pacific,750000,520000,230000,15.2,76
Q1 2024,Latin America,420000,310000,110000,6.7,42
Q2 2024,North America,1380000,950000,430000,10.4,152
Q2 2024,Europe,1050000,760000,290000,7.1,102
Q2 2024,Asia Pacific,890000,600000,290000,18.7,85
Q2 2024,Latin America,460000,330000,130000,9.5,45
Q3 2024,North America,1420000,980000,440000,2.9,155
Q3 2024,Europe,1120000,800000,320000,6.7,108
Q3 2024,Asia Pacific,960000,640000,320000,7.9,90
Q3 2024,Latin America,510000,360000,150000,10.9,48`
  },
  {
    name: "Analytics Dataset",
    description: "Website analytics data with traffic sources",
    csv: `Date,Page,Views,Unique Visitors,Bounce Rate,Avg Time (s),Source,Country
2024-01-15,/home,12500,8900,35.2,145,Organic,US
2024-01-15,/products,8200,5600,42.1,98,Organic,US
2024-01-15,/blog/seo-guide,6800,5200,28.5,320,Organic,UK
2024-01-15,/pricing,4500,3800,38.7,67,Direct,US
2024-01-15,/about,2100,1800,52.3,45,Referral,Canada
2024-01-16,/home,13200,9400,33.8,152,Organic,US
2024-01-16,/products,8900,6100,40.5,102,Paid,US
2024-01-16,/blog/css-tips,7200,5800,26.1,285,Social,Germany
2024-01-16,/pricing,4800,4100,37.2,72,Organic,UK
2024-01-16,/contact,1900,1600,48.9,38,Direct,Australia
2024-01-17,/home,14100,10200,32.1,160,Organic,US
2024-01-17,/products,9500,6600,39.8,110,Organic,France`
  },
  {
    name: "Student Records",
    description: "Academic records with grades and enrollment data",
    csv: `Student ID,First Name,Last Name,Email,Major,GPA,Credits,Year,Scholarship,Status
STU-001,Emma,Thompson,emma.t@university.edu,Computer Science,3.85,96,Senior,Merit,Active
STU-002,Liam,Anderson,liam.a@university.edu,Mathematics,3.72,84,Junior,None,Active
STU-003,Sophia,Garcia,sophia.g@university.edu,Biology,3.91,108,Senior,Research,Active
STU-004,Noah,Williams,noah.w@university.edu,English Literature,3.45,72,Junior,Need-Based,Active
STU-005,Ava,Martinez,ava.m@university.edu,Computer Science,3.68,60,Sophomore,None,Active
STU-006,Mason,Johnson,mason.j@university.edu,Physics,3.92,96,Senior,Merit,Active
STU-007,Isabella,Brown,isabella.b@university.edu,Chemistry,3.55,48,Sophomore,None,Active
STU-008,Ethan,Davis,ethan.d@university.edu,Economics,3.78,84,Junior,Merit,Active
STU-009,Mia,Wilson,mia.w@university.edu,Psychology,3.62,36,Freshman,None,Active
STU-010,Alexander,Taylor,alex.t@university.edu,Computer Science,3.95,108,Senior,Full Ride,Active`
  }
];
