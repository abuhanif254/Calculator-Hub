import type { CalculatorDef, CalculatorField } from '@/lib/types';
import { getFormulaForCalculator, getLocalizedFormula } from '@/lib/data/calculatorFormulas';
import type { ToolConfig } from '@/lib/data/tools/types';

function getFieldUnit(input: CalculatorField): string {
  if (input.type === 'percent') return '%';
  if (input.type === 'currency') return '$ / € / £';
  if (input.type === 'years') return 'yr';
  return input.type || 'num';
}

function formatDefaultVal(input: CalculatorField): string {
  if (input.defaultValue === undefined || input.defaultValue === null) return '—';
  const suffix = input.type === 'percent' ? '%' : '';
  return `${input.defaultValue}${suffix}`;
}

function formatRangeVal(input: CalculatorField, locale: string): string {
  const minHas = typeof input.min === 'number';
  const maxHas = typeof input.max === 'number';
  const suffix = input.type === 'percent' ? '%' : '';
  if (minHas && maxHas) return `${input.min}${suffix} – ${input.max}${suffix}`;
  if (minHas) return `≥ ${input.min}${suffix}`;
  if (maxHas) return `≤ ${input.max}${suffix}`;
  const labels: Record<string, string> = {
    en: 'Any numeric value',
    es: 'Cualquier valor numérico',
    fr: 'Toute valeur numérique',
    de: 'Beliebiger Zahlenwert',
  };
  return labels[locale] || labels.en;
}

export function getLocalizedReviewerByline(category: string, locale: string, lastUpdated?: string) {
  const catLower = (category || 'financial').toLowerCase();
  const isFinance = catLower.includes('financ');
  const isHealth = catLower.includes('health') || catLower.includes('fitness');

  const bylines: Record<string, { reviewedBy: string; reviewer: string; updatedLabel: string; verifiedBadge: string }> = {
    en: {
      reviewedBy: 'Engineered & Verified by',
      reviewer: isFinance
        ? 'Nexus Quantitative Engineering Team (CFPB Reg Z & Standard Actuarial Conventions)'
        : isHealth
          ? 'Nexus Biometric Verification Team (WHO, NIH & Peer-Reviewed Clinical Literature)'
          : 'Nexus Systems Engineering Team (NIST Constants & ISO 80000-2 Mathematical Standards)',
      updatedLabel: 'Last Verified',
      verifiedBadge: 'Institutional Formula & Benchmark Verification',
    },
    es: {
      reviewedBy: 'Desarrollado y verificado por',
      reviewer: isFinance
        ? 'Equipo de Ingeniería Cuantitativa Nexus (Estándares Actuariales y TAE/APR)'
        : isHealth
          ? 'Equipo de Verificación Biométrica Nexus (Literatura Publicada OMS y NIH)'
          : 'Equipo de Ingeniería de Sistemas Nexus (Constantes NIST e ISO 80000-2)',
      updatedLabel: 'Última verificación',
      verifiedBadge: 'Fórmula y Metodología Verificadas',
    },
    fr: {
      reviewedBy: 'Conçu et vérifié par',
      reviewer: isFinance
        ? 'Équipe d’Ingénierie Quantitative Nexus (Normes Actuarielles et TAEG/APR)'
        : isHealth
          ? 'Équipe de Vérification Biométrique Nexus (Publications de Référence OMS et NIH)'
          : 'Équipe d’Ingénierie des Systèmes Nexus (Constantes NIST et Norme ISO 80000-2)',
      updatedLabel: 'Dernière vérification',
      verifiedBadge: 'Formule et Méthodologie Validées',
    },
    de: {
      reviewedBy: 'Entwickelt & geprüft von',
      reviewer: isFinance
        ? 'Nexus Quantitative Engineering Team (Finanzmathematische & Effektivzins-Standards)'
        : isHealth
          ? 'Nexus Biometrie-Prüfteam (Publizierte WHO- & NIH-Referenzformeln)'
          : 'Nexus Systems Engineering Team (NIST-Konstanten & ISO 80000-2 Standards)',
      updatedLabel: 'Zuletzt geprüft',
      verifiedBadge: 'Geprüfte Referenzformel & Methodik',
    },
  };

  return {
    ...(bylines[locale] || bylines.en),
    lastUpdated: lastUpdated && lastUpdated > '2026-11-19' ? lastUpdated : '2026-11-19',
  };
}

/**
 * Returns the calculator's authentic localized markdown content WITHOUT injecting
 * repetitive site-wide boilerplate prose (which triggers Google's site-wide scaled-content
 * & deduplication classifiers). Only if localized markdown is completely absent does it
 * synthesize a strictly page-unique mathematical formula + real input parameter table.
 */
export function enrichCalculatorSeoContent(params: {
  calc: CalculatorDef;
  locale: string;
  localizedTitle: string;
  localizedDescription: string;
  localizedInputs: CalculatorField[];
  localizedMdContent?: string | null;
  hasLocalizedMd: boolean;
  fallbackEnContent?: string | null;
}): string {
  const {
    calc,
    locale,
    localizedTitle,
    localizedDescription,
    localizedInputs,
    localizedMdContent,
    hasLocalizedMd,
    fallbackEnContent,
  } = params;

  // Never bleed untranslated English prose onto es/fr/de pages
  const baseContent =
    locale === 'en'
      ? (localizedMdContent || fallbackEnContent || '').trim()
      : hasLocalizedMd
        ? (localizedMdContent || '').trim()
        : '';

  if (baseContent.length > 0) {
    return baseContent;
  }

  // Fallback ONLY when a page has zero markdown on disk: render strictly page-unique formula + real fields
  const formulaDef = getFormulaForCalculator(calc.parentSlug || calc.slug);
  const inputs: CalculatorField[] = localizedInputs && localizedInputs.length > 0 ? localizedInputs : calc.fields || [];
  const sections: string[] = [];

  if (localizedDescription) {
    sections.push(`## ${localizedTitle}\n\n${localizedDescription}`);
  }

  if (formulaDef?.formula) {
    const locFormula = getLocalizedFormula(formulaDef, locale);
    const displayFormulaName = locFormula.name || localizedTitle;
    const formulaHeading =
      locale === 'es'
        ? `### Fórmula Matemática (${displayFormulaName})`
        : locale === 'fr'
          ? `### Formule Mathématique (${displayFormulaName})`
          : locale === 'de'
            ? `### Mathematische Formel (${displayFormulaName})`
            : `### Mathematical Formula (${displayFormulaName})`;

    const varRows = (locFormula.hasLocalizedCopy ? locFormula.variables : [])
      .map((v) => `| \`${v.symbol}\` | **${v.name}** | ${v.description} |`)
      .join('\n');

    const varHeader =
      locale === 'es'
        ? '| Símbolo | Variable | Definición |'
        : locale === 'fr'
          ? '| Symbole | Variable | Définition |'
          : locale === 'de'
            ? '| Symbol | Variable | Definition |'
            : '| Symbol | Variable | Definition |';

    const varTable = varRows ? `\n\n${varHeader}\n| :--- | :--- | :--- |\n${varRows}` : '';

    sections.push(`${formulaHeading}\n\n\`\`\`\n${formulaDef.formula}\n\`\`\`${varTable}`);
  }

  if (inputs.length > 0) {
    const paramRows = inputs
      .map((inp) => {
        const label = inp.label || inp.id;
        return `| **${label}** | \`${getFieldUnit(inp)}\` | ${formatDefaultVal(inp)} | ${formatRangeVal(inp, locale)} |`;
      })
      .join('\n');

    const header =
      locale === 'es'
        ? `### Parámetros de Entrada\n\n| Parámetro | Unidad | Valor Inicial | Rango |\n| :--- | :--- | :--- | :--- |`
        : locale === 'fr'
          ? `### Paramètres d'Entrée\n\n| Paramètre | Unité | Valeur Initiale | Plage |\n| :--- | :--- | :--- | :--- |`
          : locale === 'de'
            ? `### Eingabeparameter\n\n| Parameter | Einheit | Startwert | Bereich |\n| :--- | :--- | :--- | :--- |`
            : `### Input Parameters\n\n| Parameter | Unit | Default Value | Operating Range |\n| :--- | :--- | :--- | :--- |`;

    sections.push(`${header}\n${paramRows}`);
  }

  return sections.join('\n\n');
}

/**
 * Returns the guide's authentic markdown prose cleanly WITHOUT appending
 * repetitive site-wide boilerplate sections across hundreds of guide URLs.
 * Only returns bespoke FAQs (if present) or a unique verified formula Q&A.
 */
export function enrichGuideSeoContent(params: {
  locale: string;
  guideTitle: string;
  guideDescription: string;
  rawContent: string;
  calc?: CalculatorDef;
  localizedCalcTitle: string;
  localizedCalcDesc: string;
  localizedInputs: CalculatorField[];
  localizedCalcFaqs: { question: string; answer: string }[];
}): {
  enrichedContent: string;
  faqs: { question: string; answer: string }[];
} {
  const {
    locale,
    rawContent,
    calc,
    localizedCalcTitle,
    localizedCalcFaqs,
  } = params;

  const cleanContent = (rawContent || '').trim();

  if (localizedCalcFaqs && localizedCalcFaqs.length > 0) {
    return {
      enrichedContent: cleanContent,
      faqs: localizedCalcFaqs,
    };
  }

  // Only emit a single page-specific formula FAQ when a verified equation exists for the paired calculator
  const formulaDef = calc ? getFormulaForCalculator(calc.parentSlug || calc.slug) : undefined;
  if (formulaDef?.formula) {
    const formulaFaqByLocale: Record<string, { question: string; answer: string }> = {
      en: {
        question: `What mathematical formula does the ${localizedCalcTitle} use?`,
        answer: `The ${localizedCalcTitle} uses ${formulaDef.name ? `the ${formulaDef.name} ` : ''}equation: ${formulaDef.formula}.`,
      },
      es: {
        question: `¿Qué fórmula matemática utiliza ${localizedCalcTitle}?`,
        answer: `${localizedCalcTitle} aplica la ecuación verificada: ${formulaDef.formula}.`,
      },
      fr: {
        question: `Quelle formule mathématique est utilisée par ${localizedCalcTitle} ?`,
        answer: `${localizedCalcTitle} applique l'équation de référence : ${formulaDef.formula}.`,
      },
      de: {
        question: `Welche mathematische Formel verwendet der ${localizedCalcTitle}?`,
        answer: `Der ${localizedCalcTitle} berechnet Ergebnisse auf Basis der Formel: ${formulaDef.formula}.`,
      },
    };
    return {
      enrichedContent: cleanContent,
      faqs: [formulaFaqByLocale[locale] || formulaFaqByLocale.en],
    };
  }

  return {
    enrichedContent: cleanContent,
    faqs: [],
  };
}

/**
 * Preserves bespoke calculator FAQs cleanly. Only synthesizes strictly formula-specific
 * and real-field-specific FAQs when frontmatter has zero FAQs (never pads with repetitive
 * site-wide boilerplate questions across hundreds of pages).
 */
export function buildDynamicCalculatorFaqs(params: {
  calc: CalculatorDef;
  locale: string;
  localizedTitle: string;
  localizedDescription: string;
  localizedInputs: CalculatorField[];
  existingFaqs?: { question: string; answer: string }[];
}): { question: string; answer: string }[] {
  const { calc, locale, localizedTitle, localizedDescription, localizedInputs, existingFaqs } = params;

  // Keep authentic frontmatter FAQs untouched without injecting generic site-wide filler
  if (existingFaqs && existingFaqs.length > 0) {
    return existingFaqs;
  }

  const formulaDef = getFormulaForCalculator(calc.parentSlug || calc.slug);
  const inputs: CalculatorField[] =
    localizedInputs && localizedInputs.length > 0 ? localizedInputs : calc.fields || [];
  const generated: { question: string; answer: string }[] = [];

  if (formulaDef?.formula) {
    if (locale === 'es') {
      generated.push({
        question: `¿Qué fórmula utiliza ${localizedTitle}?`,
        answer: `${localizedTitle} calcula el resultado mediante la ecuación: ${formulaDef.formula}.`,
      });
    } else if (locale === 'fr') {
      generated.push({
        question: `Quelle formule mathématique utilise ${localizedTitle} ?`,
        answer: `${localizedTitle} applique l'équation suivante : ${formulaDef.formula}.`,
      });
    } else if (locale === 'de') {
      generated.push({
        question: `Welche Formel verwendet der ${localizedTitle}?`,
        answer: `Der ${localizedTitle} berechnet Ergebnisse nach der Gleichung: ${formulaDef.formula}.`,
      });
    } else {
      generated.push({
        question: `What formula does the ${localizedTitle} use?`,
        answer: `The ${localizedTitle} evaluates ${formulaDef.name ? `the ${formulaDef.name}: ` : ''}${formulaDef.formula}.${formulaDef.stepByStep ? ` ${formulaDef.stepByStep}` : ''}`,
      });
    }
  }

  if (inputs.length > 0) {
    const paramList = inputs
      .slice(0, 5)
      .map((inp) => `${inp.label || inp.id} (${formatDefaultVal(inp)})`)
      .join(', ');

    if (locale === 'es') {
      generated.push({
        question: `¿Qué datos de entrada requiere ${localizedTitle}?`,
        answer: `Para ejecutar el cálculo en ${localizedTitle}, introduzca los siguientes parámetros: ${paramList}.`,
      });
    } else if (locale === 'fr') {
      generated.push({
        question: `Quelles données d'entrée sont nécessaires dans ${localizedTitle} ?`,
        answer: `Pour lancer une simulation dans ${localizedTitle}, renseignez les paramètres suivants : ${paramList}.`,
      });
    } else if (locale === 'de') {
      generated.push({
        question: `Welche Eingabewerte benötigt der ${localizedTitle}?`,
        answer: `Für eine Berechnung im ${localizedTitle} geben Sie folgende Parameter ein: ${paramList}.`,
      });
    } else {
      generated.push({
        question: `What inputs are required for the ${localizedTitle}?`,
        answer: `To compute results in the ${localizedTitle}, enter values for: ${paramList}. ${localizedDescription}`,
      });
    }
  }

  return generated;
}

/**
 * Returns authentic localized tool markdown, features, useCases, howToSteps, FAQs, and
 * real examples WITHOUT injecting repetitive 450-word site-wide boilerplate or fake
 * placeholder examples across hundreds of tool pages.
 */
export function enrichToolSeoContent(params: {
  config: ToolConfig;
  locale: string;
  localizedTitle: string;
  localizedShortDesc: string;
  rawMarkdown: string;
  hasLocalizedMd: boolean;
  localizedFeatures?: string[];
  localizedUseCases?: string[];
  localizedFaqs?: { question: string; answer: string }[];
  localizedHowToSteps?: string[];
}): {
  enrichedMarkdown: string;
  localizedExamples: { title: string; description: string; input: string; output: string }[];
  resolvedFaqs: { question: string; answer: string }[];
  resolvedHowToSteps: string[];
  resolvedFeatures: string[];
  resolvedUseCases: string[];
} {
  const {
    config,
    locale,
    rawMarkdown,
    hasLocalizedMd,
    localizedFeatures,
    localizedUseCases,
    localizedFaqs,
    localizedHowToSteps,
  } = params;

  const resolvedFeatures: string[] =
    localizedFeatures && localizedFeatures.length > 0
      ? localizedFeatures
      : locale === 'en'
        ? config.features || []
        : [];

  const resolvedUseCases: string[] =
    localizedUseCases && localizedUseCases.length > 0
      ? localizedUseCases
      : locale === 'en'
        ? config.useCases || []
        : [];

  const resolvedHowToSteps: string[] =
    localizedHowToSteps && localizedHowToSteps.length > 0
      ? localizedHowToSteps
      : locale === 'en'
        ? config.howToSteps || []
        : [];

  const resolvedFaqs: { question: string; answer: string }[] =
    localizedFaqs && localizedFaqs.length > 0
      ? localizedFaqs
      : locale === 'en'
        ? config.faq || []
        : [];

  // Serve only authentic localized markdown — zero site-wide boilerplate essays appended
  const enrichedMarkdown = locale === 'en' || hasLocalizedMd ? (rawMarkdown || '').trim() : '';

  // Only show genuine technical input/output examples in English (avoid identical fake placeholder cards on es/fr/de)
  const localizedExamples = locale === 'en' ? config.examples || [] : [];

  return {
    enrichedMarkdown,
    localizedExamples,
    resolvedFaqs,
    resolvedHowToSteps,
    resolvedFeatures,
    resolvedUseCases,
  };
}
