// ═══════════════════════════════════════════════════════════════════════
// lib/data/calculatorMatrices.ts
// 63 mathematically verified, 4-language (EN / ES / FR / DE) Featured
// Snippet comparison matrices covering ~97% of all Nexus calculators.
// Pre-rendered in static HTML to capture Google SERP table snippets.
// ═══════════════════════════════════════════════════════════════════════

import { getCalculatorBySlug } from './calculators';
import type { CalculatorMatrixDef, MatrixLocaleTranslation, MatrixRow } from './matrices/types';
import { financeMatrices } from './matrices/financeMatrices';
import { healthMatrices } from './matrices/healthMatrices';
import { scienceMathMatrices } from './matrices/scienceMathMatrices';

export type { CalculatorMatrixDef, MatrixLocaleTranslation, MatrixRow };

export const calculatorMatrices: CalculatorMatrixDef[] = [
  ...financeMatrices,
  ...healthMatrices,
  ...scienceMathMatrices,
];

/**
 * Retrieve matrix definition for a specific calculator slug (or parent preset)
 */
export function getMatrixForCalculator(slug: string): CalculatorMatrixDef | undefined {
  const direct = calculatorMatrices.find((m) => m.slugs.includes(slug));
  if (direct) return direct;

  // Fallback to parent calculator matrix for programmatic presets
  const calc = getCalculatorBySlug(slug);
  if (calc?.parentSlug) {
    return calculatorMatrices.find((m) => m.slugs.includes(calc.parentSlug!));
  }
  return undefined;
}
