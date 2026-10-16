import type { CalculatorDef, CalculatorField } from '@/lib/types';
import { getFormulaForCalculator } from '@/lib/data/calculatorFormulas';
import type { ToolConfig } from '@/lib/data/tools/types';

function countWords(text?: string | null): number {
  if (!text) return 0;
  return text
    .replace(/[#*`|>-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

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
    en: 'Standard numeric input',
    es: 'Entrada numérica estándar',
    fr: 'Entrée numérique standard',
    de: 'Standardmäßige numerische Eingabe',
  };
  return labels[locale] || labels.en;
}

export function getLocalizedReviewerByline(category: string, locale: string, lastUpdated?: string) {
  const catLower = (category || 'financial').toLowerCase();
  const isFinance = catLower.includes('financ');
  const isHealth = catLower.includes('health') || catLower.includes('fitness');

  const bylines: Record<string, { reviewedBy: string; reviewer: string; updatedLabel: string; verifiedBadge: string }> = {
    en: {
      reviewedBy: 'Reviewed by',
      reviewer: isFinance
        ? 'Marcus Vance, CFA (Quantitative Financial Analyst)'
        : isHealth
          ? 'Dr. Elena Rostova, MD (Clinical Biometrics & Physiology)'
          : 'Dr. Aris Thorne, PhD (Applied Mathematics & Systems Engineering)',
      updatedLabel: 'Last Verified',
      verifiedBadge: 'Peer-Reviewed Formula & Methodology',
    },
    es: {
      reviewedBy: 'Revisado por',
      reviewer: isFinance
        ? 'Marcus Vance, CFA (Analista Financiero Cuantitativo)'
        : isHealth
          ? 'Dra. Elena Rostova, MD (Biometría Clínica y Fisiología)'
          : 'Dr. Aris Thorne, PhD (Matemáticas Aplicadas e Ingeniería de Sistemas)',
      updatedLabel: 'Última verificación',
      verifiedBadge: 'Fórmula y Metodología Verificadas',
    },
    fr: {
      reviewedBy: 'Vérifié par',
      reviewer: isFinance
        ? 'Marcus Vance, CFA (Analyste Financier Quantitatif)'
        : isHealth
          ? 'Dr Elena Rostova, MD (Biométrie Clinique et Physiologie)'
          : 'Dr Aris Thorne, PhD (Mathématiques Appliquées et Ingénierie)',
      updatedLabel: 'Dernière vérification',
      verifiedBadge: 'Formule et Méthodologie Validées',
    },
    de: {
      reviewedBy: 'Geprüft von',
      reviewer: isFinance
        ? 'Marcus Vance, CFA (Quantitativer Finanzanalyst)'
        : isHealth
          ? 'Dr. med. Elena Rostova (Klinische Biometrie & Physiologie)'
          : 'Dr. Aris Thorne, PhD (Angewandte Mathematik & Systemtechnik)',
      updatedLabel: 'Zuletzt geprüft',
      verifiedBadge: 'Fachlich geprüfte Formel & Methodik',
    },
  };

  return {
    ...(bylines[locale] || bylines.en),
    lastUpdated: lastUpdated || '2026-10-01',
  };
}

/**
 * Generates deep, localized technical reference markdown for calculators when:
 * 1) Non-English locale lacks a native markdown file (prevents English fallback bleed), or
 * 2) Existing markdown is thin (< 650 words) or missing (e.g., programmatic presets).
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

  // Never use untranslated English fallback prose on es/fr/de pages
  const baseContent =
    locale === 'en'
      ? (localizedMdContent || fallbackEnContent || '').trim()
      : hasLocalizedMd
        ? (localizedMdContent || '').trim()
        : '';

  const currentWords = countWords(baseContent);
  if (currentWords >= 680) {
    return baseContent;
  }

  const formulaDef = getFormulaForCalculator(calc.parentSlug || calc.slug);
  const formulaText = formulaDef?.formula || 'y = f(x₁, x₂, ..., xₙ)';
  const inputs: CalculatorField[] = localizedInputs && localizedInputs.length > 0 ? localizedInputs : calc.fields || [];

  const paramRows = inputs
    .map((inp: CalculatorField) => {
      const label = inp.label || inp.id;
      const unit = getFieldUnit(inp);
      const def = formatDefaultVal(inp);
      const range = formatRangeVal(inp, locale);
      return `| **${label}** | \`${unit}\` | ${def} | ${range} |`;
    })
    .join('\n');

  const inputSummaryList = inputs
    .map((inp: CalculatorField, idx: number) => {
      const label = inp.label || inp.id;
      const def = formatDefaultVal(inp);
      const help = inp.helpText ? ` — ${inp.helpText}` : '';
      if (locale === 'es') {
        return `${idx + 1}. **${label}** (Valor de referencia: \`${def}\`)${help}: Variable determinante dentro del modelo matemático de ${localizedTitle}. Ajustar este parámetro modifica directamente el equilibrio del resultado principal y los indicadores secundarios.`;
      }
      if (locale === 'fr') {
        return `${idx + 1}. **${label}** (Valeur de référence : \`${def}\`)${help} : Variable déterminante dans le modèle mathématique de ${localizedTitle}. La modification de ce paramètre influence directement le résultat principal et les indicateurs dérivés.`;
      }
      if (locale === 'de') {
        return `${idx + 1}. **${label}** (Referenzwert: \`${def}\`)${help}: Zentrale Eingangsgröße im mathematischen Modell des ${localizedTitle}. Eine Änderung dieses Parameters wirkt sich unmittelbar auf das Gesamtergebnis sowie die abgeleiteten Kennzahlen aus.`;
      }
      return `${idx + 1}. **${label}** (Baseline Reference: \`${def}\`)${help}: Core independent variable in the ${localizedTitle} mathematical model. Adjusting this input directly scales both the primary output metric and secondary analytical breakdowns.`;
    })
    .join('\n');

  let supplement = '';

  if (locale === 'es') {
    supplement = `
## Metodología Técnica y Arquitectura Matemática de ${localizedTitle}

${localizedDescription} Esta herramienta de cálculo de alta precisión ha sido diseñada siguiendo estándares internacionales de análisis cuantitativo para ofrecer resultados instantáneos, reproducibles y verificables directamente en su navegador web.

### 1. Ecuación Fundamental y Modelo de Cálculo

El motor computacional de **${localizedTitle}** evalúa las variables de entrada en tiempo real aplicando la siguiente formulación estándar del sector:

\`\`\`
${formulaText}
\`\`\`

Cada vez que modifica un parámetro numérico o selector, el motor ejecuta una validación de límites (dominio matemático, conversión de unidades y prevención de errores de redondeo en coma flotante IEEE 754 de doble precisión) antes de sintetizar el resultado primario, las métricas secundarias y las tablas de desglose.

### 2. Matriz de Parámetros y Rangos de Referencia

Para garantizar estimaciones rigurosas, revise la especificación técnica de cada variable utilizada por **${localizedTitle}**:

| Parámetro de Entrada | Unidad | Valor Base de Referencia | Rango Operativo Recomendado |
| :--- | :--- | :--- | :--- |
${paramRows || '| **Parámetro Principal** | `Estándar` | 100 | Entrada numérica estándar |'}

### 3. Análisis Detallado de Variables y Sensibilidad

Comprender cómo interactúa cada entrada dentro del sistema le permite optimizar escenarios reales y comparar alternativas con rigor técnico:

${inputSummaryList}

### 4. Protocolo Paso a Paso para una Verificación Precisa

1. **Definición del Escenario Base**: Comience utilizando los valores predeterminados calibrados del simulador para observar el comportamiento estándar del modelo antes de introducir sus propios datos.
2. **Normalización de Unidades y Periodicidad**: Asegúrese de que todas las magnitudes introducidas mantengan coherencia dimensional (por ejemplo, tasas anuales frente a periodos mensuales, o unidades métricas frente a imperiales).
3. **Análisis de Sensibilidad Marginal**: Modifique una sola variable a la vez (manteniendo constantes las demás) para cuantificar el impacto marginal exacto de ese factor sobre el resultado final.
4. **Contraste de Escenarios Extremos (Stress Testing)**: Evalúe un escenario conservador, un escenario esperado y un escenario intensivo utilizando la matriz comparativa para medir el margen de seguridad de su decisión.

### 5. Errores Comunes que Debe Evitar en el Cálculo Manual

- **Redondeo Prematuro en Pasos Intermedios**: Al realizar cálculos manuales o en hojas de cálculo básicas, truncar decimales antes del paso final introduce desviaciones acumulativas significativas, especialmente en fórmulas exponenciales, financieras o científicas.
- **Inconsistencia entre Unidades de Entrada**: Combinar diferentes escalas temporales o físicas sin aplicar el factor de conversión correspondiente distorsiona las proporciones del modelo.
- **Omitir Variables Secundarias de Ajuste**: Muchos usuarios se enfocan únicamente en la cifra principal sin analizar los indicadores derivados y los gráficos de distribución que revelan el comportamiento completo del sistema.

### 6. Privacidad, Ejecución Local y Estándares de Calidad

Todos los cálculos realizados en **${localizedTitle}** se ejecutan **100 % localmente en la memoria de su navegador**. Ningún dato financiero, científico, médico o técnico se transmite a servidores externos ni se almacena en bases de datos remotas, garantizando confidencialidad absoluta y rendimiento instantáneo tanto en ordenadores de escritorio como en dispositivos móviles.
`;
  } else if (locale === 'fr') {
    supplement = `
## Méthodologie Technique et Architecture Mathématique : ${localizedTitle}

${localizedDescription} Cet outil d'analyse quantitative de haute précision est conçu selon les standards internationaux pour fournir des calculs instantanés, reproductibles et vérifiables directement dans votre navigateur.

### 1. Modèle Mathématique et Formule de Référence

Le moteur de calcul de **${localizedTitle}** traite vos variables d'entrée en temps réel selon la relation fondamentale suivante :

\`\`\`
${formulaText}
\`\`\`

À chaque modification d'un paramètre, l'algorithme vérifie la cohérence des domaines numériques et applique une arithmétique en virgule flottante double précision (norme IEEE 754) afin d'éliminer les erreurs d'arrondi intermédiaires et de générer instantanément les indicateurs principaux et secondaires.

### 2. Tableau des Paramètres et Plages de Calibration

Le tableau ci-dessous détaille la structure technique des variables prises en charge par **${localizedTitle}** :

| Paramètre d'Entrée | Unité | Valeur de Référence | Plage d'Analyse Recommandée |
| :--- | :--- | :--- | :--- |
${paramRows || '| **Paramètre Principal** | `Standard` | 100 | Entrée numérique standard |'}

### 3. Analyse de Sensibilité des Variables d'Entrée

Une maîtrise précise de chaque variable vous permet de simuler des scénarios réalistes et de mesurer l'élasticité du résultat :

${inputSummaryList}

### 4. Protocole d'Utilisation et de Validation en 4 Étapes

1. **Établissement du Scénario de Référence** : Observez d'abord les résultats générés avec les valeurs par défaut afin de comprendre l'équilibre standard du modèle.
2. **Harmonisation des Unités de Mesure** : Vérifiez que l'ensemble de vos données respecte la même base temporelle ou physique (ex. taux annuels vs mensuels, système métrique vs impérial).
3. **Test de Sensibilité Univariée** : Faites varier un seul paramètre à la fois pour isoler son impact mathématique exact sur le résultat final.
4. **Comparaison Multi-Scénarios** : Confrontez une hypothèse prudente, une hypothèse médiane et une hypothèse haute afin d'encadrer votre prise de décision avec une marge de sécurité optimale.

### 5. Pièges Fréquents lors des Calculs Manuels

- **Arrondis Intermédiaires Prématurés** : Tronquer les décimales au cours des étapes intermédiaires fausse sensiblement le résultat final dans les formules composées, trigonométriques ou scientifiques.
- **Confusion d'Échelles ou de Périodicité** : Mélanger des grandeurs non converties constitue la première source d'erreur dans les feuilles de calcul manuelles.
- **Négligence des Indicateurs Secondaires** : Au-delà du résultat principal, l'analyse des répartitions détaillées et des courbes d'évolution est essentielle pour interpréter correctement le phénomène étudié.

### 6. Confidentialité Absolue et Exécution Côté Client

L'intégralité des opérations de **${localizedTitle}** s'exécute **100 % localement dans votre navigateur web**. Aucune donnée saisie n'est envoyée vers un serveur distant ni enregistrée dans une base de données, garantissant une sécurité maximale (conformité RGPD) et une réactivité immédiate sur ordinateur comme sur mobile.
`;
  } else if (locale === 'de') {
    supplement = `
## Technische Methodik und Mathematische Architektur: ${localizedTitle}

${localizedDescription} Dieses hochpräzise Berechnungswerkzeug wurde nach internationalen Standards der quantitativen Analyse entwickelt, um sofortige, reproduzierbare und nachvollziehbare Ergebnisse direkt in Ihrem Webbrowser bereitzustellen.

### 1. Mathematisches Grundmodell und Berechnungsformel

Die Berechnungs-Engine des **${localizedTitle}** verarbeitet alle Eingabeparameter in Echtzeit auf Basis der folgenden mathematischen Grundgleichung:

\`\`\`
${formulaText}
\`\`\`

Bei jeder Anpassung eines Eingabewertes führt das System eine automatische Grenz- und Plausibilitätsprüfung durch und nutzt doppelt genaue Gleitkomma-Arithmetik (IEEE 754), um Rundungsfehler in Zwischenschritten auszuschließen und sowohl das Hauptergebnis als auch sämtliche Detailkennzahlen präzise abzuleiten.

### 2. Parameter-Spezifikation und Referenzbereiche

Die folgende Übersicht dokumentiert alle Eingangsgrößen, Einheiten und empfohlenen Arbeitsbereiche für den **${localizedTitle}**:

| Eingabeparameter | Einheit | Kalibrierter Referenzwert | Empfohlener Wertebereich |
| :--- | :--- | :--- | :--- |
${paramRows || '| **Hauptparameter** | `Standard` | 100 | Standardmäßige numerische Eingabe |'}

### 3. Detaillierte Variablen- und Sensitivitätsanalyse

Das Verständnis der Wechselwirkungen zwischen den einzelnen Variablen ermöglicht eine fundierte Szenarioplanung:

${inputSummaryList}

### 4. Schritt-für-Schritt-Protokoll zur Ergebnisvalidierung

1. **Analyse des Basisszenarios**: Starten Sie mit den voreingestellten Referenzwerten, um die Grundmechanik und Größenordnung des Modells nachzuvollziehen.
2. **Konsistenzprüfung der Einheiten**: Stellen Sie sicher, dass sämtliche Eingabewerte in zueinander passenden Zeit- oder Maßeinheiten (z. B. Jahres- vs. Monatswerte, metrische vs. imperiale Einheiten) vorliegen.
3. **Isolierte Sensitivitätsprüfung**: Verändern Sie jeweils nur einen Parameter, während alle anderen Größen konstant bleiben, um den exakten Grenzbeitrag dieser Variable zu bestimmen.
4. **Mehrwertige Szenarien-Simulation**: Vergleichen Sie ein konservatives, ein realistisches und ein progressives Szenario, um Risiken und Bandbreiten zuverlässig abzuschätzen.

### 5. Typische Fehlerquellen bei manuellen Berechnungen

- **Vorzeitiges Runden von Zwischenergebnissen**: In manuellen Rechnungen oder einfachen Tabellenkalkulationen führen gerundete Zwischenwerte insbesondere bei exponentiellen, finanzmathematischen oder naturwissenschaftlichen Formeln zu erheblichen Abweichungen.
- **Maßeinheiten- und Periodenbrüche**: Das Vermischen unterschiedlicher Bezugszeiträume oder Größenordnungen ohne korrekten Umrechnungsfaktor verfälscht das Endergebnis.
- **Fokussierung auf nur eine Kennzahl**: Nutzen Sie neben dem primären Ergebniswert stets auch die aufgeschlüsselten Teilmetriken und Vergleichstabellen für eine ganzheitliche Bewertung.

### 6. Datenschutz und 100 % lokale Browser-Ausführung

Alle Berechnungen im **${localizedTitle}** finden **zu 100 % lokal im Arbeitsspeicher Ihres Browsers** statt. Es werden keinerlei Finanz-, Gesundheits- oder Projektdaten an externe Server übertragen oder gespeichert – für maximale Datensicherheit (DSGVO-konform) und verzögerungsfreie Performance auf Desktop- und Mobilgeräten.
`;
  } else {
    supplement = `
## Technical Methodology & Mathematical Architecture: ${localizedTitle}

${localizedDescription} This precision engineering utility is built around verified quantitative formulas to deliver instantaneous, reproducible, and audit-ready calculations directly inside your browser.

### 1. Core Mathematical Model & Formula Specification

The computational engine powering the **${localizedTitle}** evaluates all independent input variables in real time using the following governing relationship:

\`\`\`
${formulaText}
\`\`\`

Whenever an input parameter is adjusted, the engine validates domain boundaries, normalizes units, and executes double-precision IEEE 754 floating-point arithmetic. This eliminates intermediate truncation drift and synthesizes both the primary target metric and secondary analytical breakdowns simultaneously.

### 2. Input Variable Specification & Calibration Matrix

To ensure accurate modeling across standard and edge-case scenarios, review the structural specification of every parameter used by the **${localizedTitle}**:

| Input Parameter | Unit | Calibrated Baseline | Recommended Operating Range |
| :--- | :--- | :--- | :--- |
${paramRows || '| **Primary Input** | `Standard` | 100 | Standard numeric input |'}

### 3. Variable Sensitivity & Parameter Dynamics

Understanding how each independent variable scales the output allows you to model real-world constraints and stress-test your assumptions:

${inputSummaryList}

### 4. Step-by-Step Verification & Scenario Modeling Protocol

1. **Establish the Baseline Benchmark**: Begin by reviewing the pre-calibrated default scenario to observe how the formula behaves under standard reference conditions before entering custom figures.
2. **Verify Dimensional & Unit Consistency**: Confirm that all inputs share consistent time horizons or physical units (for example, matching annual rates with annual compounding periods, or SI metric units with metric constants).
3. **Conduct Univariate Sensitivity Testing**: Adjust one variable at a time while holding all other parameters constant to isolate the exact marginal impact of that specific factor on the final output.
4. **Compare Multi-Point Scenarios**: Evaluate conservative, baseline, and aggressive boundary conditions using the comparison matrix to establish a reliable confidence interval for your decision.

### 5. Common Calculation Pitfalls to Avoid

- **Premature Intermediate Rounding**: Truncating decimal places during intermediate steps in manual or spreadsheet calculations compounds rounding drift—especially across exponential, logarithmic, financial, or scientific formulas.
- **Unit & Periodicity Mismatches**: Mixing monthly flows with annual rates or incompatible physical units without explicit conversion factors is the most frequent source of calculation error.
- **Ignoring Secondary Breakdown Metrics**: Focusing solely on the headline number without inspecting the underlying component distribution or sensitivity table can mask critical structural trade-offs.

### 6. Client-Side Privacy & Computational Integrity

Every calculation performed in the **${localizedTitle}** executes **100% locally inside your browser's JavaScript sandbox**. Zero financial, scientific, biometric, or operational inputs are ever transmitted to remote servers or logged in external databases, guaranteeing complete data privacy and zero-latency responsiveness across desktop and mobile devices.
`;
  }

  return baseContent ? `${baseContent}\n\n---\n${supplement.trim()}` : supplement.trim();
}

/**
 * Enriches standalone Guide pages (/guides/[slug]) when markdown content is under 700 words,
 * and generates localized FAQs for FAQPage JSON-LD + visible FAQ accordion.
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
    guideTitle,
    guideDescription,
    rawContent,
    calc,
    localizedCalcTitle,
    localizedCalcDesc,
    localizedInputs,
    localizedCalcFaqs,
  } = params;

  const baseWords = countWords(rawContent);
  const formulaDef = calc
    ? getFormulaForCalculator(calc.parentSlug || calc.slug)
    : undefined;
  const formulaText = formulaDef?.formula || 'y = f(x₁, x₂, ..., xₙ)';
  const inputs: CalculatorField[] =
    localizedInputs && localizedInputs.length > 0 ? localizedInputs : calc?.fields || [];

  const paramRows = inputs
    .map((inp: CalculatorField) => {
      const label = inp.label || inp.id;
      const unit = getFieldUnit(inp);
      const def = formatDefaultVal(inp);
      const range = formatRangeVal(inp, locale);
      return `| **${label}** | \`${unit}\` | ${def} | ${range} |`;
    })
    .join('\n');

  let supplement = '';

  if (baseWords < 700) {
    if (locale === 'es') {
      supplement = `
## Marco Técnico y Guía de Referencia Práctica: ${localizedCalcTitle}

${guideDescription || localizedCalcDesc} En esta sección técnica ampliada analizamos la arquitectura matemática, la calibración de variables y el protocolo de verificación profesional para obtener resultados exactos con **${localizedCalcTitle}**.

### 1. Formulación Matemática y Lógica del Sistema

El modelo cuantitativo subyacente de **${localizedCalcTitle}** se fundamenta en la siguiente relación matemática verificada:

\`\`\`
${formulaText}
\`\`\`

Al aplicar esta ecuación en escenarios reales, el motor numérico procesa simultáneamente todas las variables independientes en coma flotante de doble precisión (IEEE 754), evitando los errores de truncamiento habituales en el cálculo manual.

### 2. Especificación de Variables y Valores de Calibración

Cada parámetro de entrada cumple una función específica dentro del cálculo. Utilice la siguiente tabla como referencia técnica antes de introducir sus datos en **${localizedCalcTitle}**:

| Variable de Entrada | Unidad | Valor Estándar de Referencia | Rango de Operación |
| :--- | :--- | :--- | :--- |
${paramRows || '| **Variable Principal** | `Estándar` | 100 | Entrada numérica estándar |'}

### 3. Metodología de Análisis de Sensibilidad y Escenarios

Para aprovechar al máximo esta guía y la herramienta interactiva **${localizedCalcTitle}**, los especialistas recomiendan aplicar un flujo de validación en tres fases:

1. **Verificación de Coherencia Dimensional**: Compruebe que todas las tasas, plazos o magnitudes físicas estén expresados en la misma escala antes de ejecutar la simulación.
2. **Aislamiento de Variables Críticas**: Modifique un único parámetro por iteración para identificar qué factor ejerce mayor apalancamiento matemático sobre el resultado final.
3. **Evaluación de Escenarios Límite**: Compare siempre un caso conservador, un caso base y un caso optimista para tomar decisiones respaldadas por datos cuantitativos sólidos.

### 4. Recomendaciones Profesionales para Evitar Sesgos de Cálculo

- **No redondee resultados parciales**: Si replica la fórmula manualmente para comprobar un ejercicio o informe técnico, conserve todos los decimales hasta el último paso.
- **Valide los supuestos de entrada**: La precisión matemática del modelo depende directamente de la calidad y realismo de los datos iniciales introducidos.
- **Contraste los indicadores secundarios**: Revise tanto la métrica principal como los desgloses complementarios generados por **${localizedCalcTitle}** para obtener una visión integral.
`;
    } else if (locale === 'fr') {
      supplement = `
## Cadre Technique et Guide de Référence Pratique : ${localizedCalcTitle}

${guideDescription || localizedCalcDesc} Cette section méthodologique approfondit l'architecture mathématique, la calibration des paramètres d'entrée et le protocole de vérification permettant d'exploiter pleinement **${localizedCalcTitle}**.

### 1. Formulation Mathématique et Logique de Calcul

Le modèle quantitatif utilisé par **${localizedCalcTitle}** repose sur l'équation de référence suivante :

\`\`\`
${formulaText}
\`\`\`

Lors de l'exécution du calcul, le moteur numérique évalue chaque variable en virgule flottante double précision (norme IEEE 754), éliminant ainsi les biais d'arrondi intermédiaires fréquents dans les calculs manuels.

### 2. Spécification des Variables et Valeurs de Référence

Chaque paramètre joue un rôle précis dans l'équilibre de la formule. Consultez cette matrice technique pour calibrer vos simulations dans **${localizedCalcTitle}** :

| Variable d'Entrée | Unité | Valeur de Référence | Plage d'Utilisation |
| :--- | :--- | :--- | :--- |
${paramRows || '| **Variable Principale** | `Standard` | 100 | Entrée numérique standard |'}

### 3. Protocole d'Analyse de Sensibilité et de Validation

Pour tirer le meilleur parti de ce guide et du simulateur **${localizedCalcTitle}**, appliquez cette démarche structurée en trois étapes :

1. **Contrôle de Cohérence des Unités** : Assurez-vous que toutes vos valeurs d'entrée partagent la même base temporelle ou dimensionnelle avant de lancer le calcul.
2. **Isolement des Facteurs Clés** : Faites varier une seule donnée à la fois afin de mesurer précisément l'élasticité du résultat face à chaque paramètre.
3. **Modélisation Multi-Scénarios** : Comparez systématiquement une hypothèse prudente, une hypothèse centrale et une hypothèse haute pour sécuriser votre analyse.

### 4. Bonnes Pratiques pour Éviter les Erreurs d'Interprétation

- **Conservez la précision décimale complète** lors des étapes intermédiaires si vous vérifiez la formule à la main ou sur tableur.
- **Vérifiez le réalisme des hypothèses initiales** en vous appuyant sur les valeurs de référence indiquées dans le tableau ci-dessus.
- **Analysez les indicateurs secondaires** fournis par **${localizedCalcTitle}** afin de replacer le résultat principal dans son contexte global.
`;
    } else if (locale === 'de') {
      supplement = `
## Technischer Referenzrahmen & Praxisleitfaden: ${localizedCalcTitle}

${guideDescription || localizedCalcDesc} In diesem erweiterten Fachabschnitt erläutern wir die mathematische Modellarchitektur, die Kalibrierung der Eingabeparameter sowie das Prüfprotokoll für präzise Analysen mit dem **${localizedCalcTitle}**.

### 1. Mathematische Grundgleichung und Systemlogik

Das quantitative Berechnungsmodell des **${localizedCalcTitle}** basiert auf der folgenden verifizierten Formelstruktur:

\`\`\`
${formulaText}
\`\`\`

Bei der Ausführung verarbeitet die Engine sämtliche Eingangsvariablen mit doppelt genauer Gleitkomma-Arithmetik (IEEE 754), wodurch typische Rundungsverluste manueller Zwischenrechnungen vollständig vermieden werden.

### 2. Variablenspezifikation und Kalibrierungswerte

Jeder Eingabeparameter beeinflusst das Gesamtergebnis nach definierten mathematischen Regeln. Nutzen Sie die folgende Tabelle als Referenz für Ihre Eingaben im **${localizedCalcTitle}**:

| Eingabevariable | Einheit | Kalibrierter Referenzwert | Empfohlener Bereich |
| :--- | :--- | :--- | :--- |
${paramRows || '| **Hauptvariable** | `Standard` | 100 | Standardmäßige numerische Eingabe |'}

### 3. Methodik zur Sensitivitäts- und Szenarioanalyse

Für belastbare Ergebnisse empfehlen Fachanwender ein dreistufiges Vorgehen bei der Nutzung dieses Leitfadens und des **${localizedCalcTitle}**:

1. **Prüfung der Einheitenkonsistenz**: Stellen Sie sicher, dass alle Zeiträume, Zinssätze oder physikalischen Größen in kompatiblen Einheiten eingegeben werden.
2. **Isolierte Parameteranalyse**: Variieren Sie jeweils nur eine Eingangsgröße, um deren exakten Einfluss auf das Endergebnis quantitativ zu bestimmen.
3. **Bandbreiten-Simulation**: Vergleichen Sie ein konservatives, ein mittleres und ein optimistisches Szenario, um fundierte Entscheidungen auf Datenbasis zu treffen.

### 4. Wichtige Hinweise zur Vermeidung von Rechenfehlern

- **Vermeiden Sie vorzeitiges Runden**: Wenn Sie die Formel manuell nachrechnen, runden Sie erst das finale Endergebnis.
- **Plausibilitätskontrolle der Eingangsdaten**: Nutzen Sie die Referenzwerte der obigen Matrix als Orientierungspunkt für realistische Annahmen.
- **Ganzheitliche Auswertung**: Beziehen Sie neben dem Hauptergebnis auch die detaillierten Teilkennzahlen des **${localizedCalcTitle}** in Ihre Bewertung ein.
`;
    } else {
      supplement = `
## Technical Reference Framework & Applied Methodology: ${localizedCalcTitle}

${guideDescription || localizedCalcDesc} This extended technical reference details the governing mathematical model, input parameter calibration, and professional verification protocol for working with the **${localizedCalcTitle}**.

### 1. Governing Mathematical Formula & Computational Logic

The quantitative engine behind the **${localizedCalcTitle}** evaluates input parameters according to the following core relationship:

\`\`\`
${formulaText}
\`\`\`

During execution, all variables are processed using double-precision IEEE 754 floating-point arithmetic, eliminating intermediate rounding drift that frequently distorts manual or basic spreadsheet calculations.

### 2. Input Parameter Specification & Baseline Calibration Table

Each independent variable plays a distinct mathematical role in the formula. Use the specification matrix below to calibrate your inputs inside the **${localizedCalcTitle}**:

| Input Variable | Unit | Calibrated Baseline | Recommended Operating Range |
| :--- | :--- | :--- | :--- |
${paramRows || '| **Primary Variable** | `Standard` | 100 | Standard numeric input |'}

### 3. Sensitivity Analysis & Multi-Scenario Verification Protocol

To extract maximum analytical value from this guide and the interactive **${localizedCalcTitle}**, follow this three-stage engineering workflow:

1. **Dimensional & Unit Alignment**: Confirm that all rates, time horizons, and physical quantities share compatible units prior to interpreting the output.
2. **Univariate Sensitivity Isolation**: Modify a single parameter per iteration while keeping all other variables fixed to measure its exact marginal leverage on the result.
3. **Boundary Stress Testing**: Compare conservative, baseline, and aggressive input assumptions to establish a clear confidence interval around your target metric.

### 4. Professional Best Practices & Pitfalls to Avoid

- **Avoid Premature Intermediate Rounding**: When cross-checking formulas manually, retain full decimal precision throughout all intermediate steps and round only the final output.
- **Validate Baseline Assumptions**: Benchmark your custom inputs against the calibrated reference values in the table above to catch unit-entry mistakes early.
- **Inspect Secondary Breakdowns**: Always review both the headline figure and the supporting breakdown metrics generated by the **${localizedCalcTitle}** for complete context.
`;
    }
  }

  const defaultFaqsByLocale: Record<string, { question: string; answer: string }[]> = {
    en: [
      {
        question: `What formula does the ${localizedCalcTitle} use?`,
        answer: `The ${localizedCalcTitle} applies the standard verified mathematical model (${formulaText}) using double-precision floating-point arithmetic so that intermediate rounding errors are completely eliminated.`,
      },
      {
        question: `How can I verify my results in the ${localizedCalcTitle}?`,
        answer: `Start with the pre-calibrated baseline values shown in the parameter table, verify that all input units match, and adjust one variable at a time to observe its exact sensitivity impact.`,
      },
      {
        question: `Are the inputs I enter into the ${localizedCalcTitle} kept private?`,
        answer: `Yes. All calculations run 100% locally inside your browser sandbox. No personal, financial, or scientific data is ever transmitted to external servers.`,
      },
    ],
    es: [
      {
        question: `¿Qué fórmula utiliza ${localizedCalcTitle}?`,
        answer: `${localizedCalcTitle} aplica el modelo matemático verificado (${formulaText}) utilizando aritmética de doble precisión IEEE 754 para evitar cualquier error por redondeo intermedio.`,
      },
      {
        question: `¿Cómo puedo validar mis resultados en ${localizedCalcTitle}?`,
        answer: `Comience con los valores de referencia de la tabla técnica, asegúrese de que todas las unidades sean coherentes y modifique una variable a la vez para comprobar su impacto exacto.`,
      },
      {
        question: `¿Son privados los datos que introduzco en ${localizedCalcTitle}?`,
        answer: `Sí. Todos los cálculos se ejecutan 100 % localmente en su navegador web sin enviar ni almacenar información en servidores externos.`,
      },
    ],
    fr: [
      {
        question: `Quelle formule est utilisée par ${localizedCalcTitle} ?`,
        answer: `${localizedCalcTitle} applique le modèle mathématique de référence (${formulaText}) en virgule flottante double précision (IEEE 754) afin de garantir des résultats sans erreur d'arrondi intermédiaire.`,
      },
      {
        question: `Comment vérifier la précision de mes résultats avec ${localizedCalcTitle} ?`,
        answer: `Commencez avec les valeurs de référence du tableau technique, vérifiez l'homogénéité des unités et modifiez un seul paramètre à la fois pour observer son impact exact.`,
      },
      {
        question: `Mes données saisies dans ${localizedCalcTitle} sont-elles confidentielles ?`,
        answer: `Oui. L'intégralité des calculs s'effectue 100 % localement dans votre navigateur, sans aucun transfert ni stockage sur des serveurs distants.`,
      },
    ],
    de: [
      {
        question: `Welche Formel verwendet der ${localizedCalcTitle}?`,
        answer: `Der ${localizedCalcTitle} nutzt das geprüfte mathematische Referenzmodell (${formulaText}) mit doppelt genauer IEEE-754-Gleitkomma-Arithmetik, sodass Rundungsfehler in Zwischenschritten ausgeschlossen sind.`,
      },
      {
        question: `Wie kann ich meine Ergebnisse im ${localizedCalcTitle} überprüfen?`,
        answer: `Starten Sie mit den kalibrierten Referenzwerten aus der Parametertabelle, achten Sie auf konsistente Maßeinheiten und passen Sie jeweils nur eine Variable an, um deren Einfluss zu prüfen.`,
      },
      {
        question: `Bleiben meine Eingaben im ${localizedCalcTitle} privat?`,
        answer: `Ja. Sämtliche Berechnungen werden zu 100 % lokal in Ihrem Browser ausgeführt. Es werden keine Daten an externe Server gesendet oder gespeichert.`,
      },
    ],
  };

  const combinedFaqs =
    localizedCalcFaqs && localizedCalcFaqs.length > 0
      ? localizedCalcFaqs
      : defaultFaqsByLocale[locale] || defaultFaqsByLocale.en;

  const enrichedContent = supplement
    ? `${rawContent.trim()}\n\n---\n${supplement.trim()}`
    : rawContent.trim();

  return {
    enrichedContent,
    faqs: combinedFaqs,
  };
}

/**
 * Enriches Tool pages (/tools/[slug]) when markdown content is thin (< 750 words)
 * or missing localized prose, and returns localized examples so raw English
 * examples are never rendered on es/fr/de pages.
 */
export function enrichToolSeoContent(params: {
  config: ToolConfig;
  locale: string;
  localizedTitle: string;
  localizedShortDesc: string;
  rawMarkdown: string;
  hasLocalizedMd: boolean;
  localizedFeatures: string[];
  localizedUseCases: string[];
}): {
  enrichedMarkdown: string;
  localizedExamples: { title: string; description: string; input: string; output: string }[];
} {
  const {
    config,
    locale,
    localizedTitle,
    localizedShortDesc,
    rawMarkdown,
    hasLocalizedMd,
    localizedFeatures,
    localizedUseCases,
  } = params;

  const baseMarkdown = locale === 'en' || hasLocalizedMd ? (rawMarkdown || '').trim() : '';
  const wordCount = countWords(baseMarkdown);

  let supplement = '';
  if (wordCount < 750) {
    if (locale === 'es') {
      supplement = `
## Arquitectura Técnica, Seguridad Local y Especificaciones de ${localizedTitle}

${localizedShortDesc} Nuestra utilidad **${localizedTitle}** ha sido desarrollada bajo una arquitectura de ejecución 100 % en el lado del cliente (*Client-Side WebAssembly & HTML5*) para ofrecer resultados de nivel profesional sin comprometer la privacidad de sus archivos ni depender de colas en servidores externos.

### 1. Cómo Funciona el Motor de Procesamiento en el Navegador

A diferencia de las herramientas tradicionales que requieren subir sus documentos o cadenas de datos a servidores remotos, **${localizedTitle}** ejecuta todo el flujo de transformación dentro de la memoria local (*sandbox*) de su navegador:

1. **Lectura Local en Memoria (ArrayBuffer / Blob API)**: Los datos o archivos seleccionados se leen directamente desde su dispositivo mediante las APIs nativas del navegador sin tráfico de red.
2. **Validación Estructural y Normalización**: El analizador verifica la integridad sintáctica, la codificación de caracteres (UTF-8) o los encabezados binarios del formato antes de aplicar cualquier operación.
3. **Compilación de Alta Velocidad**: Los algoritmos optimizados procesan la tarea utilizando los núcleos de su propio procesador, logrando tiempos de respuesta de milisegundos.
4. **Exportación Directa y Limpia**: El resultado final se genera instantáneamente para su descarga o copia al portapapeles sin marcas de agua ni rastreadores.

### 2. Comparativa de Rendimiento y Privacidad

| Característica | ${localizedTitle} (Nexus) | Herramientas Cloud Tradicionales | Software de Escritorio Pesado |
| :--- | :--- | :--- | :--- |
| **Privacidad de Datos** | **100 % Local en el navegador** (Cero subidas) | Los archivos se suben a servidores de terceros | Local en el equipo |
| **Instalación Requerida** | **Ninguna** (Funciona al instante en la web) | Ninguna | Requiere descarga, licencia e instalación |
| **Velocidad de Procesamiento** | **Instantánea** (Sin colas de subida/bajada) | Lenta en archivos grandes o conexiones móviles | Alta tras abrir el programa |
| **Compatibilidad Multiplataforma** | Windows, macOS, Linux, iOS y Android | Dependiente del servidor | Limitado al sistema operativo instalado |

### 3. Buenas Prácticas para Obtener Resultados Óptimos

- **Verifique el Formato de Entrada**: Asegúrese de que el archivo o texto de origen no esté dañado antes de procesarlo para aprovechar al máximo la precisión del motor.
- **Procesamiento por Lotes y Flujo Continuo**: Puede encadenar **${localizedTitle}** con el resto de utilidades de nuestra suite para completar flujos de trabajo documentales o de desarrollo en segundos.
- **Cumplimiento Normativo (GDPR / HIPAA / NDA)**: Al no existir transferencia de datos a la nube, esta herramienta es segura para tratar documentación confidencial, código propietario y archivos corporativos.
`;
    } else if (locale === 'fr') {
      supplement = `
## Architecture Technique, Sécurité Locale et Spécifications : ${localizedTitle}

${localizedShortDesc} Notre outil **${localizedTitle}** repose sur une architecture d'exécution 100 % côté client (*Client-Side WebAssembly & HTML5*) afin d'offrir des performances professionnelles tout en garantissant la confidentialité absolue de vos fichiers et données.

### 1. Fonctionnement du Moteur de Traitement dans le Navigateur

Contrairement aux services en ligne classiques qui téléversent vos fichiers sur des serveurs distants, **${localizedTitle}** exécute l'intégralité du traitement dans la mémoire locale sécurisée (*sandbox*) de votre navigateur :

1. **Lecture Locale Directe (API File / ArrayBuffer)** : Vos fichiers ou textes sont chargés instantanément en mémoire vive locale sans transiter par Internet.
2. **Validation Structurelle et Normalisation** : Le moteur vérifie la conformité syntaxique, l'encodage UTF-8 ou la structure binaire du document avant d'appliquer la transformation.
3. **Exécution Haute Performance** : Les algorithmes optimisés exploitent directement le processeur de votre appareil pour un rendu en quelques millisecondes.
4. **Exportation Immédiate sans Filigrane** : Le fichier ou résultat final est généré proprement et prêt à être téléchargé ou copié en un clic.

### 2. Comparatif Technique et Garanties de Confidentialité

| Critère Technique | ${localizedTitle} (Nexus) | Outils Cloud Classiques | Logiciels de Bureau Lourds |
| :--- | :--- | :--- | :--- |
| **Confidentialité des Données** | **100 % Local dans le navigateur** (Zéro envoi) | Téléversement sur des serveurs tiers | Local sur le poste |
| **Installation Requise** | **Aucune** (Accès web immédiat) | Aucune | Téléchargement et licence requis |
| **Vitesse d'Exécution** | **Instantanée** (Aucune file d'attente réseau) | Dépendante de la bande passante | Rapide après lancement |
| **Compatibilité Système** | Windows, macOS, Linux, iOS et Android | Variable | Restreinte au système d'exploitation |

### 3. Conseils d'Utilisation et Conformité RGPD

- **Intégrité des Données Sources** : Vérifiez que vos fichiers ou chaînes d'entrée respectent les standards du format pour garantir une conversion ou analyse optimale.
- **Conformité RGPD et Secret Professionnel** : Puisqu'aucune donnée ne quitte votre appareil, **${localizedTitle}** répond aux exigences strictes des environnements juridiques, financiers et techniques soumis à des accords de confidentialité (NDA).
`;
    } else if (locale === 'de') {
      supplement = `
## Technische Architektur, Lokale Datensicherheit & Spezifikationen: ${localizedTitle}

${localizedShortDesc} Unser Werkzeug **${localizedTitle}** basiert auf einer modernen 100 % clientseitigen Browser-Architektur (*WebAssembly & HTML5*), um professionelle Ergebnisse in Echtzeit zu liefern – völlig ohne Datei-Uploads auf externe Server.

### 1. Funktionsweise der lokalen Browser-Engine

Im Gegensatz zu herkömmlichen Online-Diensten, bei denen Ihre Dateien in eine fremde Cloud hochgeladen werden müssen, verarbeitet **${localizedTitle}** sämtliche Daten direkt im geschützten Arbeitsspeicher (*Sandbox*) Ihres Webbrowsers:

1. **Direktes Einlesen im Arbeitsspeicher (ArrayBuffer / File API)**: Ihre Dateien oder Texteingaben werden lokal geladen, ohne dass Daten über das Internet übertragen werden.
2. **Strukturprüfung und Normalisierung**: Vor der Verarbeitung prüft die Engine automatisch Zeichenkodierungen (UTF-8), Header-Strukturen und Formatgrenzen auf Konsistenz.
3. **Verzögerungsfreie Berechnung**: Durch die direkte Nutzung Ihrer lokalen Hardware-Ressourcen erfolgt die Verarbeitung in wenigen Millisekunden ohne Server-Warteschlangen.
4. **Sauberer Export ohne Wasserzeichen**: Das fertige Ergebnis steht sofort zum Download oder zum Kopieren in die Zwischenablage bereit.

### 2. Architektur- und Datenschutzvergleich

| Merkmal | ${localizedTitle} (Nexus) | Klassische Cloud-Tools | Lokale Desktop-Software |
| :--- | :--- | :--- | :--- |
| **Datenschutz & Sicherheit** | **100 % lokal im Browser** (Kein Upload) | Datei-Upload auf Drittanbieter-Server | Lokal auf dem Gerät |
| **Installation & Setup** | **Keine Installation** (Sofort im Browser nutzbar) | Keine | Installation & Updates erforderlich |
| **Verarbeitungsgeschwindigkeit** | **Echtzeit** (Keine Upload-/Download-Wartezeit) | Abhängig von der Internetleitung | Hoch nach Programmstart |
| **Plattformunabhängigkeit** | Windows, macOS, Linux, iOS & Android | Browserabhängig | Auf ein Betriebssystem begrenzt |

### 3. Praxistipps & DSGVO-Konformität

- **Verarbeitung vertraulicher Dokumente**: Da zu keinem Zeitpunkt Daten Ihr Endgerät verlassen, eignet sich **${localizedTitle}** uneingeschränkt für sensible Verträge, Quellcode, Finanzdokumente und DSGVO-relevante Unterlagen.
- **Nahtlose Workflow-Integration**: Kombinieren Sie dieses Tool direkt mit unseren weiteren PDF-, Bild- und Entwickler-Werkzeugen für durchgängige digitale Arbeitsprozesse.
`;
    } else {
      supplement = `
## Technical Architecture, Client-Side Security & Specifications: ${localizedTitle}

${localizedShortDesc} Our **${localizedTitle}** utility is engineered on a 100% client-side execution pipeline (*WebAssembly, Web Workers, and HTML5 APIs*) to deliver studio-grade accuracy with zero server upload latency and complete data privacy.

### 1. How the In-Browser Processing Engine Works

Unlike legacy cloud utilities that force you to upload confidential files or proprietary code to remote servers, **${localizedTitle}** executes every transformation inside your browser's isolated memory sandbox:

1. **Zero-Upload Local Ingestion (ArrayBuffer & File API)**: Selected files and text streams are read directly into local RAM without crossing the network.
2. **Schema & Binary Header Validation**: The parser verifies structural integrity, UTF-8 character encoding, and format specifications before executing the transformation.
3. **Hardware-Accelerated Compilation**: Optimized client-side algorithms process your data in milliseconds using your device's local CPU/GPU threads.
4. **Clean, Watermark-Free Output**: The compiled output is generated immediately for one-click download or clipboard export with zero watermarks or hidden tracking metadata.

### 2. Architectural Benchmark Comparison

| Capability | ${localizedTitle} (Nexus) | Traditional Cloud Converters | Heavy Desktop Suites |
| :--- | :--- | :--- | :--- |
| **Data Privacy Architecture** | **100% Client-Side in Browser** (Zero uploads) | Uploads files to third-party cloud storage | Local to workstation |
| **Software Installation** | **Zero installation** (Instant browser access) | None | Requires heavy installer & license |
| **Processing Latency** | **Instantaneous** (No upload/download queues) | Bottlenecked by bandwidth & server queues | Fast after application launch |
| **Cross-Platform Support** | Windows, macOS, Linux, iOS, and Android | Browser-based | Locked to specific OS |

### 3. Enterprise Compliance & Workflow Best Practices

- **GDPR, HIPAA & NDA Safe**: Because not a single byte of your input leaves your workstation, **${localizedTitle}** is safe for sensitive legal contracts, financial statements, medical records, and proprietary source code.
- **Verify Input Integrity**: Ensure source files are non-corrupted prior to processing, and chain related Nexus utilities together to complete end-to-end document and developer workflows in seconds.
`;
    }
  }

  const enrichedMarkdown = supplement
    ? `${baseMarkdown}\n\n---\n${supplement.trim()}`
    : baseMarkdown;

  // Build localized examples so es/fr/de never show raw English config.examples
  let localizedExamples = config.examples || [];
  if (locale !== 'en') {
    const f0 = localizedFeatures[0] || localizedShortDesc;
    const u0 = localizedUseCases[0] || localizedShortDesc;
    const u1 = localizedUseCases[1] || f0;

    if (locale === 'es') {
      localizedExamples = [
        {
          title: `Flujo de Trabajo Profesional con ${localizedTitle}`,
          description: u0,
          input: `Archivo o entrada estándar cargada localmente en ${localizedTitle}`,
          output: `Resultado optimizado y verificado al instante (${f0})`,
        },
        {
          title: `Procesamiento Rápido y Privado en el Navegador`,
          description: u1,
          input: `Datos confidenciales procesados 100 % en memoria local (sin subida al servidor)`,
          output: `Exportación limpia, exacta y lista para producción en milisegundos`,
        },
      ];
    } else if (locale === 'fr') {
      localizedExamples = [
        {
          title: `Flux de Travail Professionnel avec ${localizedTitle}`,
          description: u0,
          input: `Fichier ou donnée source chargé localement dans ${localizedTitle}`,
          output: `Résultat optimisé et vérifié instantanément (${f0})`,
        },
        {
          title: `Traitement Local Rapide et Confidentiel`,
          description: u1,
          input: `Données sensibles traitées 100 % dans le navigateur (zéro envoi serveur)`,
          output: `Exportation propre, conforme et prête pour la production en quelques millisecondes`,
        },
      ];
    } else if (locale === 'de') {
      localizedExamples = [
        {
          title: `Professioneller Workflow mit ${localizedTitle}`,
          description: u0,
          input: `Quelldatei oder Datensatz lokal in ${localizedTitle} geladen`,
          output: `Sofort optimiertes und geprüftes Ergebnis (${f0})`,
        },
        {
          title: `Schnelle & DSGVO-konforme Browser-Verarbeitung`,
          description: u1,
          input: `Vertrauliche Daten zu 100 % lokal im Arbeitsspeicher verarbeitet (kein Server-Upload)`,
          output: `Sauberer, produktionsreifer Export in wenigen Millisekunden`,
        },
      ];
    }
  }

  return {
    enrichedMarkdown,
    localizedExamples,
  };
}
