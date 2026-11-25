// ═══════════════════════════════════════════════════════════════════════
// lib/data/matrices/types.ts
// Shared interfaces for multilingual Featured Snippet comparison matrices.
// ═══════════════════════════════════════════════════════════════════════

export interface MatrixRow {
  label: string;
  values: string[];
  params: Record<string, string>;
}

export interface MatrixLocaleTranslation {
  title: string;
  description: string;
  headers: string[];
}

export interface CalculatorMatrixDef {
  slugs: string[];
  title: string;
  description: string;
  headers: string[];
  rows: MatrixRow[];
  /** Optional locale-specific rows using native regional currency (€), metric units (kg/cm/m³), and local decimals */
  rowsByLocale?: Record<string, MatrixRow[]>;
  translations?: Record<string, MatrixLocaleTranslation>;
}
