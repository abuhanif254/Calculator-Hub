// ═══════════════════════════════════════════════════════════════════════
// lib/data/formulas/types.ts
// Shared interfaces for multilingual mathematical formula cards & FAQs.
// ═══════════════════════════════════════════════════════════════════════

export interface FormulaVariable {
  symbol: string;
  name: string;
  description: string;
}

export interface FormulaLocaleTranslation {
  name: string;
  variables: FormulaVariable[];
  stepByStep: string;
  faq?: {
    question: string;
    answer: string;
  };
}

export interface CalculatorFormulaDef {
  /** Calculator slugs that utilize this exact mathematical model */
  slugs: string[];
  /** Common name of the formula (English) */
  name: string;
  /** Primary formula expression in standard math notation */
  formula: string;
  /** Optional LaTeX expression for rendering engines */
  latex?: string;
  /** Ordered list of variables used in the equation (English) */
  variables: FormulaVariable[];
  /** Concise step-by-step calculation methodology (English) */
  stepByStep: string;
  /** SEO-optimized FAQ question and answer pair (English) */
  faq: {
    question: string;
    answer: string;
  };
  /** Native localized formula names, variable legends, step-by-step derivations, and FAQs for es/fr/de */
  translations?: Record<string, FormulaLocaleTranslation>;
}
