import type { CalculatorMatrixDef, MatrixRow } from './types';
import { UNIT_CONVERTER_SPECS, convertForward, type UnitPairSpec } from '../unitConverterSpecs';

function fmtLocale(val: number, locale: string, decimals = 3): string {
  const rounded = Number(val.toFixed(decimals));
  const str = rounded.toLocaleString(locale === 'en' ? 'en-US' : locale === 'de' ? 'de-DE' : locale === 'fr' ? 'fr-FR' : 'es-ES', {
    maximumFractionDigits: decimals,
  });
  return str;
}

function buildRows(spec: UnitPairSpec, locale: string): MatrixRow[] {
  const param = spec.slug === 'watts-to-amps' && locale !== 'en' ? 230 : spec.paramDefault;
  return spec.quickValues.map((v) => {
    const out = convertForward(spec, v, param);
    const inStr = `${fmtLocale(v, locale, 2)} ${spec.fromSymbol}`;
    const outStr = `${fmtLocale(out, locale, 3)} ${spec.toSymbol}`;

    const extraValues: string[] = [outStr];
    if (spec.slug === 'mb-to-gb') {
      extraValues.push(`${fmtLocale(v / 1024, locale, 4)} GiB`);
    } else if (spec.slug === 'liters-to-gallons') {
      extraValues.push(`${fmtLocale(v / 4.54609, locale, 3)} UK gal`);
    } else if (spec.slug === 'watts-to-amps') {
      const altV = locale === 'en' ? 240 : 120;
      extraValues.push(`${fmtLocale(v / altV, locale, 2)} A (${altV}V)`);
    } else if (spec.slug === 'px-to-rem') {
      extraValues.push(`${fmtLocale(v / 14, locale, 3)} rem (14px)`);
    } else if (spec.slug === 'kwh-to-watts') {
      extraValues.push(`${fmtLocale((v * 1000) / 24, locale, 1)} W (24h)`);
    } else if (spec.slug === 'acres-to-square-feet') {
      extraValues.push(`${fmtLocale(v * 4046.8564224, locale, 1)} m²`);
    }

    return {
      label: inStr,
      values: extraValues,
      params: { input: String(v) },
    };
  });
}

function getExtraHeader(slug: string, locale: 'en' | 'es' | 'fr' | 'de'): string | null {
  if (slug === 'mb-to-gb') {
    return { en: 'Binary GiB (÷1024)', es: 'Binario GiB (÷1024)', fr: 'Binaire Gio (÷1024)', de: 'Binär GiB (÷1024)' }[locale];
  }
  if (slug === 'liters-to-gallons') {
    return { en: 'UK Imperial Gal', es: 'Galones UK', fr: 'Gallons UK', de: 'UK-Gallonen' }[locale];
  }
  if (slug === 'watts-to-amps') {
    return { en: 'Amps at 240V', es: 'Amperios a 120V', fr: 'Ampères à 120V', de: 'Ampere bei 120V' }[locale];
  }
  if (slug === 'px-to-rem') {
    return { en: 'REM (14px base)', es: 'REM (base 14px)', fr: 'REM (base 14px)', de: 'REM (14px Basis)' }[locale];
  }
  if (slug === 'kwh-to-watts') {
    return { en: '24h Avg Power (W)', es: 'Potencia 24h (W)', fr: 'Puissance 24h (W)', de: '24h-Leistung (W)' }[locale];
  }
  if (slug === 'acres-to-square-feet') {
    return { en: 'Square Meters (m²)', es: 'Metros Cuadrados (m²)', fr: 'Mètres Carrés (m²)', de: 'Quadratmeter (m²)' }[locale];
  }
  return null;
}

function buildHeaders(spec: UnitPairSpec, locale: 'en' | 'es' | 'fr' | 'de'): string[] {
  const lbl = spec.labels[locale];
  const base = [lbl.fromName, lbl.toName];
  const extra = getExtraHeader(spec.slug, locale);
  if (extra) base.push(extra);
  return base;
}

export const unitConverterMatrices: CalculatorMatrixDef[] = Object.values(UNIT_CONVERTER_SPECS).map((spec) => {
  const enLbl = spec.labels.en;
  const esLbl = spec.labels.es;
  const frLbl = spec.labels.fr;
  const deLbl = spec.labels.de;

  return {
    slugs: [spec.slug],
    title: `${enLbl.fromName} to ${enLbl.toName} Conversion Chart`,
    description: `Instant reference lookup table converting common ${enLbl.fromName} values into ${enLbl.toName} (${enLbl.formulaSummary}).`,
    headers: buildHeaders(spec, 'en'),
    rows: buildRows(spec, 'en'),
    rowsByLocale: {
      en: buildRows(spec, 'en'),
      es: buildRows(spec, 'es'),
      fr: buildRows(spec, 'fr'),
      de: buildRows(spec, 'de'),
    },
    translations: {
      es: {
        title: `Tabla de Conversión: ${esLbl.fromName} a ${esLbl.toName}`,
        description: `Tabla de referencia rápida con valores exactos de ${esLbl.fromName} a ${esLbl.toName} (${esLbl.formulaSummary}).`,
        headers: buildHeaders(spec, 'es'),
      },
      fr: {
        title: `Tableau de Conversion : ${frLbl.fromName} en ${frLbl.toName}`,
        description: `Tableau de correspondance exact de ${frLbl.fromName} vers ${frLbl.toName} (${frLbl.formulaSummary}).`,
        headers: buildHeaders(spec, 'fr'),
      },
      de: {
        title: `Umrechnungstabelle: ${deLbl.fromName} in ${deLbl.toName}`,
        description: `Sofort-Nachschlagetabelle für häufige Werte von ${deLbl.fromName} in ${deLbl.toName} (${deLbl.formulaSummary}).`,
        headers: buildHeaders(spec, 'de'),
      },
    },
  };
});
