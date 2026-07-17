/**
 * Anonymizer Engine — Orchestrates detection + masking
 */

import { detectPii, PiiDetectionResult } from './piiDetector';
import { maskValue, shuffleColumn, resetTokenMap, MaskingStrategy } from './maskingStrategies';

export interface ColumnProfile {
  index: number;
  name: string;
  values: string[];
  pii: PiiDetectionResult | null;
  strategy: MaskingStrategy | 'skip';
  enabled: boolean;
}

export interface AnonymizationResult {
  headers: string[];
  rows: string[][];
  columnProfiles: ColumnProfile[];
  stats: {
    totalRows: number;
    columnsScanned: number;
    piiColumnsFound: number;
    cellsMasked: number;
    processingMs: number;
  };
}

// ── Profile all columns ─────────────────────────────────────────────────────

export function profileColumns(headers: string[], rows: string[][]): ColumnProfile[] {
  return headers.map((name, index) => {
    const values = rows.map(r => r[index] ?? '').filter(Boolean);
    const pii = detectPii(values, name);

    // Default strategy by risk
    let strategy: MaskingStrategy | 'skip' = 'skip';
    if (pii) {
      if (pii.risk === 'High')   strategy = 'partial_mask';
      if (pii.risk === 'Medium') strategy = 'partial_mask';
      if (pii.risk === 'Low')    strategy = 'redact';
      if (pii.type === 'email')  strategy = 'fake_similar';
      if (pii.type === 'full_name' || pii.type === 'first_name' || pii.type === 'last_name')
        strategy = 'fake_similar';
      if (pii.type === 'ip_address' || pii.type === 'ipv6') strategy = 'format_preserve';
      if (pii.type === 'uuid' || pii.type === 'device_id') strategy = 'tokenize';
      if (pii.type === 'date_of_birth') strategy = 'date_shift';
    }

    return {
      index,
      name,
      values,
      pii,
      strategy,
      enabled: pii !== null,
    };
  });
}

// ── Apply anonymization ─────────────────────────────────────────────────────

export function anonymize(
  headers: string[],
  rows: string[][],
  profiles: ColumnProfile[],
  onProgress?: (pct: number) => void
): AnonymizationResult {
  const start = Date.now();
  resetTokenMap();

  const result: string[][] = rows.map(r => [...r]);
  let cellsMasked = 0;

  const enabledProfiles = profiles.filter(p => p.enabled && p.strategy !== 'skip');

  // Pre-compute shuffled values for shuffle strategy
  const shuffleMap = new Map<number, string[]>();
  for (const prof of enabledProfiles) {
    if (prof.strategy === 'shuffle') {
      const colValues = rows.map(r => r[prof.index] ?? '');
      shuffleMap.set(prof.index, shuffleColumn(colValues));
    }
  }

  for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
    for (const prof of enabledProfiles) {
      const orig = rows[rowIdx][prof.index] ?? '';
      if (!orig) continue;

      let masked: string;
      if (prof.strategy === 'shuffle') {
        masked = shuffleMap.get(prof.index)?.[rowIdx] ?? orig;
      } else {
        masked = maskValue(orig, prof.strategy as MaskingStrategy, {
          piiType: prof.pii?.type,
          prefix: 'TOK',
          dateShiftDays: 30,
        });
      }

      result[rowIdx][prof.index] = masked;
      if (masked !== orig) cellsMasked++;
    }

    if (onProgress && rowIdx % 100 === 0) {
      onProgress(Math.round((rowIdx / rows.length) * 100));
    }
  }

  onProgress?.(100);

  return {
    headers,
    rows: result,
    columnProfiles: profiles,
    stats: {
      totalRows: rows.length,
      columnsScanned: headers.length,
      piiColumnsFound: profiles.filter(p => p.pii !== null).length,
      cellsMasked,
      processingMs: Date.now() - start,
    },
  };
}
