// ═══════════════════════════════════════════════════════════════════════
// lib/data/calculatorFormulas.ts
// Central registry of 78 verified, 4-language (EN / ES / FR / DE)
// mathematical formulas, variable legends, step-by-step methodologies,
// and localized semantic formula FAQs for Nexus Calculator Hub.
// ═══════════════════════════════════════════════════════════════════════

import { getCalculatorBySlug } from './calculators';
import type { CalculatorFormulaDef, FormulaLocaleTranslation, FormulaVariable } from './formulas/types';
import { financeFormulas } from './formulas/financeFormulas';
import { healthMathStatsFormulas } from './formulas/healthMathStatsFormulas';
import { physicsChemFormulas } from './formulas/physicsChemFormulas';

export type { CalculatorFormulaDef, FormulaLocaleTranslation, FormulaVariable };

export const calculatorFormulas: CalculatorFormulaDef[] = [
  ...financeFormulas,
  ...healthMathStatsFormulas,
  ...physicsChemFormulas,
];

/**
 * Retrieve formula definition for a specific calculator slug (or parent preset)
 */
export function getFormulaForCalculator(slug: string): CalculatorFormulaDef | undefined {
  const direct = calculatorFormulas.find((f) => f.slugs.includes(slug));
  if (direct) return direct;

  // Fallback to parent calculator formula for programmatic presets
  const calc = getCalculatorBySlug(slug);
  if (calc?.parentSlug) {
    return calculatorFormulas.find((f) => f.slugs.includes(calc.parentSlug!));
  }
  return undefined;
}

/**
 * Resolve localized formula metadata (name, variables, step-by-step derivation)
 * with strict zero-English-bleed handling for es / fr / de.
 */
export function getLocalizedFormula(
  formula: CalculatorFormulaDef,
  locale = 'en'
): {
  name: string;
  variables: FormulaVariable[];
  stepByStep: string;
  hasLocalizedCopy: boolean;
} {
  if (locale === 'en') {
    return {
      name: formula.name,
      variables: formula.variables,
      stepByStep: formula.stepByStep,
      hasLocalizedCopy: true,
    };
  }
  const tr = formula.translations?.[locale];
  if (tr) {
    return {
      name: tr.name,
      variables: tr.variables,
      stepByStep: tr.stepByStep,
      hasLocalizedCopy: true,
    };
  }
  return {
    name: '',
    variables: [],
    stepByStep: '',
    hasLocalizedCopy: false,
  };
}

/**
 * Get an SEO-optimized, 100% native-language FAQ pair with semantic math embedding
 */
export function getFormulaFaq(
  slug: string,
  calculatorTitle: string,
  locale = 'en'
): { question: string; answer: string } | null {
  const formula = getFormulaForCalculator(slug);
  if (!formula) return null;

  const loc = getLocalizedFormula(formula, locale);

  const localizedQuestions: Record<string, string> = {
    en: `What is the mathematical formula used by the ${calculatorTitle}?`,
    es: `¿Cuál es la fórmula matemática utilizada por ${calculatorTitle}?`,
    fr: `Quelle est la formule mathématique utilisée par ${calculatorTitle} ?`,
    de: `Welche mathematische Formel verwendet der ${calculatorTitle}?`,
  };

  if (!loc.hasLocalizedCopy) {
    const safeFallbacks: Record<string, string> = {
      es: `La ecuación matemática verificada utilizada por ${calculatorTitle} es: ${formula.formula}.`,
      fr: `L'équation mathématique vérifiée utilisée par ${calculatorTitle} est : ${formula.formula}.`,
      de: `Die geprüfte mathematische Gleichung für den ${calculatorTitle} lautet: ${formula.formula}.`,
    };
    return {
      question: localizedQuestions[locale] || localizedQuestions.en,
      answer: safeFallbacks[locale] || `The primary formula used by the ${calculatorTitle} is: ${formula.formula}.`,
    };
  }

  const varSummary = loc.variables
    .map((v) => `${v.symbol} = ${v.name} (${v.description})`)
    .join('; ');

  const localizedAnswers: Record<string, string> = {
    en: `The ${calculatorTitle} uses the ${loc.name}: ${formula.formula}. Where: ${varSummary}. ${loc.stepByStep}`,
    es: `${calculatorTitle} aplica la ${loc.name}: ${formula.formula}. Donde: ${varSummary}. ${loc.stepByStep}`,
    fr: `${calculatorTitle} repose sur la ${loc.name} : ${formula.formula}. Où : ${varSummary}. ${loc.stepByStep}`,
    de: `Der ${calculatorTitle} verwendet die ${loc.name}: ${formula.formula}. Dabei gilt: ${varSummary}. ${loc.stepByStep}`,
  };

  return {
    question: localizedQuestions[locale] || localizedQuestions.en,
    answer: localizedAnswers[locale] || localizedAnswers.en,
  };
}

/**
 * Maps a calculator slug and category to a Google Search Central recognized
 * eduQuestionType for MathSolver structured data (e.g. Arithmetic, Algebra, Geometry, Statistics).
 * Returns null if the calculator is not an educational math/science problem solver.
 */
export function getEduQuestionType(slug: string, category?: string): string | null {
  const s = slug.toLowerCase();
  const c = (category || '').toLowerCase();

  // Exclude non-educational general utility tools
  if (
    s === 'age-calculator' ||
    s.startsWith('age-') ||
    s.endsWith('-age-calculator') ||
    s.includes('dog-age') ||
    s.includes('cat-age') ||
    s.includes('date') ||
    s.includes('time-') ||
    s.includes('hours-') ||
    s.includes('gpa') ||
    s.includes('grade') ||
    s.includes('password') ||
    s.includes('subnet') ||
    s.includes('concrete')
  ) {
    return null;
  }

  // Exclude non-math categories (finance, health, fitness, weather, lifestyle)
  if (
    c.includes('financial') ||
    c.includes('health') ||
    c.includes('fitness') ||
    c.includes('lifestyle') ||
    c.includes('other') ||
    c.includes('weather')
  ) {
    if (
      s.includes('loan') ||
      s.includes('mortgage') ||
      s.includes('bmi') ||
      s.includes('calorie') ||
      s.includes('tax') ||
      s.includes('invest') ||
      s.includes('retirement') ||
      s.includes('salary') ||
      s.includes('payoff') ||
      s.includes('budget') ||
      s.includes('insurance') ||
      s.includes('pregnancy') ||
      s.includes('ovulation') ||
      s.includes('body-fat') ||
      s.includes('rent') ||
      s.includes('debt') ||
      s.includes('savings') ||
      s.includes('interest')
    ) {
      return null;
    }
  }

  // 1. Statistics & Probability
  if (
    c.includes('stat') ||
    c.includes('probab') ||
    s.includes('confidence-interval') ||
    s.includes('t-test') ||
    s.includes('z-score') ||
    s.includes('variance') ||
    s.includes('standard-deviation') ||
    s.includes('mean') ||
    s.includes('median') ||
    s.includes('mode') ||
    s.includes('p-value') ||
    s.includes('probability')
  ) {
    return 'Statistics';
  }

  // 2. Geometry
  if (
    s.includes('triangle') ||
    s.includes('circle') ||
    s.includes('geometry') ||
    s.includes('pythagor') ||
    s.includes('volume') ||
    s.includes('area') ||
    s.includes('perimeter') ||
    s.includes('slope') ||
    s.includes('distance')
  ) {
    return 'Geometry';
  }

  // 3. Trigonometry
  if (s.includes('trig') || s.includes('sine') || s.includes('cosine') || s.includes('tangent')) {
    return 'Trigonometry';
  }

  // 4. Calculus
  if (s.includes('calculus') || s.includes('derivative') || s.includes('integral') || s.includes('limit')) {
    return 'Calculus';
  }

  // 5. Linear Algebra
  if (s.includes('matrix') || s.includes('vector') || s.includes('eigen')) {
    return 'Linear Algebra';
  }

  // 6. Algebra
  if (
    s.includes('algebra') ||
    s.includes('equation') ||
    s.includes('quadratic') ||
    s.includes('polynomial') ||
    s.includes('log') ||
    s.includes('exponent') ||
    s.includes('scientific-notation') ||
    s.includes('graphing')
  ) {
    return 'Algebra';
  }

  // 7. Arithmetic / Basic Math
  if (
    s.includes('percentage') ||
    s.includes('percent') ||
    s.includes('fraction') ||
    s.includes('arithmetic') ||
    s.includes('scientific-calculator') ||
    s.includes('binary') ||
    s.includes('ratio')
  ) {
    return 'Arithmetic';
  }

  // 8. Physics & Chemistry equations (mathematical solver nature)
  if (c.includes('physic')) {
    return 'Algebra';
  }
  if (c.includes('chem')) {
    return 'Arithmetic';
  }

  if (c === 'math' || c.includes('mathematics')) {
    return 'Arithmetic';
  }

  return null;
}
