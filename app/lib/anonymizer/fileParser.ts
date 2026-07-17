/**
 * File Parser
 * Parses CSV, JSON, TSV, and plain-text files into a columnar dataset.
 */

export interface ParsedDataset {
  headers: string[];
  rows: string[][];
  rowCount: number;
  format: 'csv' | 'tsv' | 'json' | 'text' | 'unknown';
  rawPreview: string;
}

// ── CSV / TSV parser ────────────────────────────────────────────────────────

function parseDelimited(text: string, delimiter: string): { headers: string[]; rows: string[][] } {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return { headers: [], rows: [] };

  // Parse a CSV line respecting quoted fields
  function parseLine(line: string): string[] {
    const fields: string[] = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === delimiter && !inQuotes) {
        fields.push(field.trim());
        field = '';
      } else {
        field += ch;
      }
    }
    fields.push(field.trim());
    return fields;
  }

  const headers = parseLine(lines[0]).map(h => h.replace(/^["']|["']$/g, ''));
  const rows = lines.slice(1).map(line => {
    const parsed = parseLine(line);
    // Pad to header length
    while (parsed.length < headers.length) parsed.push('');
    return parsed.slice(0, headers.length);
  });

  return { headers, rows };
}

// ── JSON parser ─────────────────────────────────────────────────────────────

function parseJson(text: string): { headers: string[]; rows: string[][] } {
  try {
    const data = JSON.parse(text);

    // Array of objects
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      const headers = Array.from(new Set(data.flatMap(obj => Object.keys(obj || {}))));
      const rows = data.map(obj =>
        headers.map(h => {
          const v = (obj as Record<string, unknown>)[h];
          return v === null || v === undefined ? '' : String(v);
        })
      );
      return { headers, rows };
    }

    // Single object → one row
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
      const headers = Object.keys(data);
      const rows = [headers.map(h => String((data as Record<string, unknown>)[h] ?? ''))];
      return { headers, rows };
    }

    return { headers: ['value'], rows: [[text]] };
  } catch {
    return { headers: [], rows: [] };
  }
}

// ── Auto-detect format ───────────────────────────────────────────────────────

function detectFormat(text: string, filename: string): 'csv' | 'tsv' | 'json' | 'text' {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (ext === 'json') return 'json';
  if (ext === 'tsv') return 'tsv';
  if (ext === 'csv') return 'csv';

  const firstChar = text.trimStart()[0];
  if (firstChar === '[' || firstChar === '{') return 'json';

  const firstLine = text.split('\n')[0];
  const tabCount  = (firstLine.match(/\t/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  if (tabCount > 1) return 'tsv';
  if (commaCount > 0) return 'csv';
  return 'text';
}

// ── Main parser ─────────────────────────────────────────────────────────────

export function parseFile(text: string, filename: string, maxRows: number = 10000): ParsedDataset {
  const format = detectFormat(text, filename);
  let headers: string[] = [];
  let rows: string[][] = [];

  if (format === 'json') {
    ({ headers, rows } = parseJson(text));
  } else if (format === 'tsv') {
    ({ headers, rows } = parseDelimited(text, '\t'));
  } else if (format === 'csv') {
    ({ headers, rows } = parseDelimited(text, ','));
  } else {
    // Plain text: one column, each line a row
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    headers = ['text'];
    rows = lines.map(l => [l]);
  }

  const truncated = rows.slice(0, maxRows);

  return {
    headers,
    rows: truncated,
    rowCount: rows.length,
    format,
    rawPreview: text.slice(0, 500),
  };
}

// ── Export to string ────────────────────────────────────────────────────────

export function exportToCsv(headers: string[], rows: string[][]): string {
  const escape = (v: string) =>
    v.includes(',') || v.includes('"') || v.includes('\n')
      ? `"${v.replace(/"/g, '""')}"`
      : v;

  const headerLine = headers.map(escape).join(',');
  const dataLines  = rows.map(row => row.map(escape).join(','));
  return [headerLine, ...dataLines].join('\n');
}

export function exportToJson(headers: string[], rows: string[][]): string {
  const objects = rows.map(row =>
    Object.fromEntries(headers.map((h, i) => [h, row[i] ?? '']))
  );
  return JSON.stringify(objects, null, 2);
}

export function exportToTsv(headers: string[], rows: string[][]): string {
  return [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
}
