import type { CalculatorFormulaDef } from './types';
import { UNIT_CONVERTER_SPECS } from '../unitConverterSpecs';

export const unitConverterFormulas: CalculatorFormulaDef[] = Object.values(UNIT_CONVERTER_SPECS).map((spec) => {
  const en = spec.labels.en;
  const es = spec.labels.es;
  const fr = spec.labels.fr;
  const de = spec.labels.de;

  const isTemp = spec.kind === 'c-to-f' || spec.kind === 'f-to-c';
  const hasParam = Boolean(spec.paramOptions);

  const enVars = [
    { symbol: spec.fromSymbol, name: en.fromName, description: `Input measurement expressed in ${en.fromName}.` },
    { symbol: spec.toSymbol, name: en.toName, description: `Exact converted result expressed in ${en.toName}.` },
    ...(hasParam && en.paramLabel
      ? [{ symbol: spec.kind === 'px-to-rem' ? 'B' : spec.kind === 'watts-to-amps' ? 'V' : 't', name: en.paramLabel, description: `Reference parameter (${en.paramLabel}) required for the physical/CSS conversion.` }]
      : []),
  ];

  const esVars = [
    { symbol: spec.fromSymbol, name: es.fromName, description: `Valor de entrada medido en ${es.fromName}.` },
    { symbol: spec.toSymbol, name: es.toName, description: `Resultado exacto convertido a ${es.toName}.` },
    ...(hasParam && es.paramLabel
      ? [{ symbol: spec.kind === 'px-to-rem' ? 'B' : spec.kind === 'watts-to-amps' ? 'V' : 't', name: es.paramLabel, description: `Parámetro de referencia (${es.paramLabel}) requerido para el cálculo.` }]
      : []),
  ];

  const frVars = [
    { symbol: spec.fromSymbol, name: fr.fromName, description: `Valeur d’entrée exprimée en ${fr.fromName}.` },
    { symbol: spec.toSymbol, name: fr.toName, description: `Résultat exact converti en ${fr.toName}.` },
    ...(hasParam && fr.paramLabel
      ? [{ symbol: spec.kind === 'px-to-rem' ? 'B' : spec.kind === 'watts-to-amps' ? 'U' : 't', name: fr.paramLabel, description: `Paramètre de référence (${fr.paramLabel}) nécessaire à la conversion.` }]
      : []),
  ];

  const deVars = [
    { symbol: spec.fromSymbol, name: de.fromName, description: `Eingangswert in der Einheit ${de.fromName}.` },
    { symbol: spec.toSymbol, name: de.toName, description: `Exaktes Umrechnungsergebnis in ${de.toName}.` },
    ...(hasParam && de.paramLabel
      ? [{ symbol: spec.kind === 'px-to-rem' ? 'B' : spec.kind === 'watts-to-amps' ? 'U' : 't', name: de.paramLabel, description: `Referenzparameter (${de.paramLabel}) für die Umrechnung.` }]
      : []),
  ];

  const stepEn = isTemp
    ? `Apply the exact affine temperature relationship ${en.formulaSummary}, preserving negative signs and rounding only on the final displayed digit.`
    : `Apply the exact NIST / ISO 80000-2 conversion identity ${en.formulaSummary} using full IEEE 754 floating-point precision before rounding to your selected decimal places.`;

  const stepEs = isTemp
    ? `Aplique la relación lineal exacta de temperatura ${es.formulaSummary}, respetando los signos negativos y redondeando únicamente al final.`
    : `Aplique el factor oficial NIST / ISO 80000-2 (${es.formulaSummary}) manteniendo toda la precisión decimal durante el cálculo antes de redondear.`;

  const stepFr = isTemp
    ? `Appliquez la relation affine exacte ${fr.formulaSummary} en conservant le signe des températures négatives et en arrondissant uniquement le résultat final.`
    : `Appliquez la formule exacte NIST / ISO 80000-2 (${fr.formulaSummary}) en pleine précision flottante avant d’arrondir au nombre de décimales souhaité.`;

  const stepDe = isTemp
    ? `Wenden Sie die exakte lineare Temperaturgleichung ${de.formulaSummary} an, beachten Sie negative Vorzeichen und runden Sie erst im letzten Schritt.`
    : `Verwenden Sie die exakte NIST- / ISO-80000-2-Umrechnungsformel ${de.formulaSummary} mit voller Gleitkommapräzision und runden Sie erst die Endanzeige.`;

  return {
    slugs: [spec.slug],
    name: `${en.fromName} to ${en.toName} Conversion Formula`,
    formula: en.formulaSummary,
    variables: enVars,
    stepByStep: stepEn,
    faq: {
      question: `How do you convert ${en.fromName} to ${en.toName}?`,
      answer: `Use the exact equation ${en.formulaSummary}. ${stepEn}`,
    },
    translations: {
      es: {
        name: `Fórmula de Conversión de ${es.fromName} a ${es.toName}`,
        variables: esVars,
        stepByStep: stepEs,
        faq: {
          question: `¿Cómo se convierten ${es.fromName} a ${es.toName}?`,
          answer: `Aplique la ecuación exacta ${es.formulaSummary}. ${stepEs}`,
        },
      },
      fr: {
        name: `Formule de Conversion ${fr.fromName} en ${fr.toName}`,
        variables: frVars,
        stepByStep: stepFr,
        faq: {
          question: `Comment convertir ${fr.fromName} en ${fr.toName} ?`,
          answer: `Appliquez la formule exacte ${fr.formulaSummary}. ${stepFr}`,
        },
      },
      de: {
        name: `Umrechnungsformel ${de.fromName} in ${de.toName}`,
        variables: deVars,
        stepByStep: stepDe,
        faq: {
          question: `Wie rechnet man ${de.fromName} in ${de.toName} um?`,
          answer: `Verwenden Sie die exakte Formel ${de.formulaSummary}. ${stepDe}`,
        },
      },
    },
  };
});
