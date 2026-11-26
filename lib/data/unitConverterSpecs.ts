// ═══════════════════════════════════════════════════════════════════════
// lib/data/unitConverterSpecs.ts
// Lightweight client-safe conversion engine definitions for 20 high-volume
// single-intent unit converter pairs (NIST / ISO 80000-2 exact constants).
// ═══════════════════════════════════════════════════════════════════════

export type ConverterKind = 'linear' | 'c-to-f' | 'f-to-c' | 'px-to-rem' | 'watts-to-amps' | 'kwh-to-watts';

export interface UnitPairSpec {
  slug: string;
  kind: ConverterKind;
  fromSymbol: string;
  toSymbol: string;
  /** Exact multiplier for linear conversions: to = from * factor */
  factor?: number;
  defaultInput: number;
  quickValues: number[];
  /** Optional reverse converter slug if we also publish the inverse page */
  reverseSlug?: string;
  /** Default secondary parameter (base px for rem, voltage V for amps, hours h for kWh) */
  paramDefault?: number;
  paramOptions?: number[];
  labels: Record<
    'en' | 'es' | 'fr' | 'de',
    {
      fromName: string;
      toName: string;
      formulaSummary: string;
      paramLabel?: string;
    }
  >;
}

export const UNIT_CONVERTER_SPECS: Record<string, UnitPairSpec> = {
  'cm-to-inches': {
    slug: 'cm-to-inches',
    kind: 'linear',
    fromSymbol: 'cm',
    toSymbol: 'in',
    factor: 1 / 2.54,
    defaultInput: 100,
    quickValues: [1, 10, 30, 50, 100, 170, 180, 200],
    reverseSlug: 'inches-to-cm',
    labels: {
      en: { fromName: 'Centimeters (cm)', toName: 'Inches (in)', formulaSummary: 'in = cm ÷ 2.54' },
      es: { fromName: 'Centímetros (cm)', toName: 'Pulgadas (in)', formulaSummary: 'in = cm ÷ 2,54' },
      fr: { fromName: 'Centimètres (cm)', toName: 'Pouces (in)', formulaSummary: 'in = cm ÷ 2,54' },
      de: { fromName: 'Zentimeter (cm)', toName: 'Zoll / Inches (in)', formulaSummary: 'Zoll = cm ÷ 2,54' },
    },
  },
  'inches-to-cm': {
    slug: 'inches-to-cm',
    kind: 'linear',
    fromSymbol: 'in',
    toSymbol: 'cm',
    factor: 2.54,
    defaultInput: 12,
    quickValues: [1, 6, 12, 24, 32, 40, 55, 65],
    reverseSlug: 'cm-to-inches',
    labels: {
      en: { fromName: 'Inches (in)', toName: 'Centimeters (cm)', formulaSummary: 'cm = in × 2.54' },
      es: { fromName: 'Pulgadas (in)', toName: 'Centímetros (cm)', formulaSummary: 'cm = in × 2,54' },
      fr: { fromName: 'Pouces (in)', toName: 'Centimètres (cm)', formulaSummary: 'cm = in × 2,54' },
      de: { fromName: 'Zoll / Inches (in)', toName: 'Zentimeter (cm)', formulaSummary: 'cm = Zoll × 2,54' },
    },
  },
  'kg-to-lbs': {
    slug: 'kg-to-lbs',
    kind: 'linear',
    fromSymbol: 'kg',
    toSymbol: 'lb',
    factor: 1 / 0.45359237,
    defaultInput: 70,
    quickValues: [1, 5, 10, 25, 50, 70, 80, 100],
    reverseSlug: 'lbs-to-kg',
    labels: {
      en: { fromName: 'Kilograms (kg)', toName: 'Pounds (lbs)', formulaSummary: 'lbs = kg × 2.20462262' },
      es: { fromName: 'Kilogramos (kg)', toName: 'Libras (lbs)', formulaSummary: 'lbs = kg × 2,20462262' },
      fr: { fromName: 'Kilogrammes (kg)', toName: 'Livres (lbs)', formulaSummary: 'lbs = kg × 2,20462262' },
      de: { fromName: 'Kilogramm (kg)', toName: 'Pfund (lbs)', formulaSummary: 'lbs = kg × 2,20462262' },
    },
  },
  'lbs-to-kg': {
    slug: 'lbs-to-kg',
    kind: 'linear',
    fromSymbol: 'lb',
    toSymbol: 'kg',
    factor: 0.45359237,
    defaultInput: 150,
    quickValues: [1, 10, 50, 100, 135, 150, 180, 200],
    reverseSlug: 'kg-to-lbs',
    labels: {
      en: { fromName: 'Pounds (lbs)', toName: 'Kilograms (kg)', formulaSummary: 'kg = lbs × 0.45359237' },
      es: { fromName: 'Libras (lbs)', toName: 'Kilogramos (kg)', formulaSummary: 'kg = lbs × 0,45359237' },
      fr: { fromName: 'Livres (lbs)', toName: 'Kilogrammes (kg)', formulaSummary: 'kg = lbs × 0,45359237' },
      de: { fromName: 'Pfund (lbs)', toName: 'Kilogramm (kg)', formulaSummary: 'kg = lbs × 0,45359237' },
    },
  },
  'celsius-to-fahrenheit': {
    slug: 'celsius-to-fahrenheit',
    kind: 'c-to-f',
    fromSymbol: '°C',
    toSymbol: '°F',
    defaultInput: 25,
    quickValues: [-40, 0, 10, 20, 25, 37, 100, 180],
    reverseSlug: 'fahrenheit-to-celsius',
    labels: {
      en: { fromName: 'Celsius (°C)', toName: 'Fahrenheit (°F)', formulaSummary: '°F = (°C × 9/5) + 32' },
      es: { fromName: 'Celsius (°C)', toName: 'Fahrenheit (°F)', formulaSummary: '°F = (°C × 9/5) + 32' },
      fr: { fromName: 'Celsius (°C)', toName: 'Fahrenheit (°F)', formulaSummary: '°F = (°C × 9/5) + 32' },
      de: { fromName: 'Celsius (°C)', toName: 'Fahrenheit (°F)', formulaSummary: '°F = (°C × 9/5) + 32' },
    },
  },
  'fahrenheit-to-celsius': {
    slug: 'fahrenheit-to-celsius',
    kind: 'f-to-c',
    fromSymbol: '°F',
    toSymbol: '°C',
    defaultInput: 72,
    quickValues: [-40, 32, 50, 68, 72, 98.6, 212, 350],
    reverseSlug: 'celsius-to-fahrenheit',
    labels: {
      en: { fromName: 'Fahrenheit (°F)', toName: 'Celsius (°C)', formulaSummary: '°C = (°F − 32) × 5/9' },
      es: { fromName: 'Fahrenheit (°F)', toName: 'Celsius (°C)', formulaSummary: '°C = (°F − 32) × 5/9' },
      fr: { fromName: 'Fahrenheit (°F)', toName: 'Celsius (°C)', formulaSummary: '°C = (°F − 32) × 5/9' },
      de: { fromName: 'Fahrenheit (°F)', toName: 'Celsius (°C)', formulaSummary: '°C = (°F − 32) × 5/9' },
    },
  },
  'km-to-miles': {
    slug: 'km-to-miles',
    kind: 'linear',
    fromSymbol: 'km',
    toSymbol: 'mi',
    factor: 1 / 1.609344,
    defaultInput: 10,
    quickValues: [1, 5, 10, 21.1, 42.2, 50, 100, 500],
    reverseSlug: 'miles-to-km',
    labels: {
      en: { fromName: 'Kilometers (km)', toName: 'Miles (mi)', formulaSummary: 'mi = km ÷ 1.609344' },
      es: { fromName: 'Kilómetros (km)', toName: 'Millas (mi)', formulaSummary: 'mi = km ÷ 1,609344' },
      fr: { fromName: 'Kilomètres (km)', toName: 'Miles (mi)', formulaSummary: 'mi = km ÷ 1,609344' },
      de: { fromName: 'Kilometer (km)', toName: 'Meilen (mi)', formulaSummary: 'mi = km ÷ 1,609344' },
    },
  },
  'miles-to-km': {
    slug: 'miles-to-km',
    kind: 'linear',
    fromSymbol: 'mi',
    toSymbol: 'km',
    factor: 1.609344,
    defaultInput: 10,
    quickValues: [1, 3.1, 5, 10, 13.1, 26.2, 60, 100],
    reverseSlug: 'km-to-miles',
    labels: {
      en: { fromName: 'Miles (mi)', toName: 'Kilometers (km)', formulaSummary: 'km = mi × 1.609344' },
      es: { fromName: 'Millas (mi)', toName: 'Kilómetros (km)', formulaSummary: 'km = mi × 1,609344' },
      fr: { fromName: 'Miles (mi)', toName: 'Kilomètres (km)', formulaSummary: 'km = mi × 1,609344' },
      de: { fromName: 'Meilen (mi)', toName: 'Kilometer (km)', formulaSummary: 'km = mi × 1,609344' },
    },
  },
  'feet-to-meters': {
    slug: 'feet-to-meters',
    kind: 'linear',
    fromSymbol: 'ft',
    toSymbol: 'm',
    factor: 0.3048,
    defaultInput: 10,
    quickValues: [1, 5, 6, 10, 20, 50, 100, 1000],
    reverseSlug: 'meters-to-feet',
    labels: {
      en: { fromName: 'Feet (ft)', toName: 'Meters (m)', formulaSummary: 'm = ft × 0.3048' },
      es: { fromName: 'Pies (ft)', toName: 'Metros (m)', formulaSummary: 'm = ft × 0,3048' },
      fr: { fromName: 'Pieds (ft)', toName: 'Mètres (m)', formulaSummary: 'm = ft × 0,3048' },
      de: { fromName: 'Fuß (ft)', toName: 'Meter (m)', formulaSummary: 'm = ft × 0,3048' },
    },
  },
  'meters-to-feet': {
    slug: 'meters-to-feet',
    kind: 'linear',
    fromSymbol: 'm',
    toSymbol: 'ft',
    factor: 1 / 0.3048,
    defaultInput: 10,
    quickValues: [1, 1.75, 2, 5, 10, 25, 50, 100],
    reverseSlug: 'feet-to-meters',
    labels: {
      en: { fromName: 'Meters (m)', toName: 'Feet (ft)', formulaSummary: 'ft = m ÷ 0.3048' },
      es: { fromName: 'Metros (m)', toName: 'Pies (ft)', formulaSummary: 'ft = m ÷ 0,3048' },
      fr: { fromName: 'Mètres (m)', toName: 'Pieds (ft)', formulaSummary: 'ft = m ÷ 0,3048' },
      de: { fromName: 'Meter (m)', toName: 'Fuß (ft)', formulaSummary: 'ft = m ÷ 0,3048' },
    },
  },
  'liters-to-gallons': {
    slug: 'liters-to-gallons',
    kind: 'linear',
    fromSymbol: 'L',
    toSymbol: 'gal',
    factor: 1 / 3.785411784,
    defaultInput: 20,
    quickValues: [1, 2, 4, 5, 10, 20, 50, 100],
    labels: {
      en: { fromName: 'Liters (L)', toName: 'US Gallons (gal)', formulaSummary: 'gal (US) = L ÷ 3.785411784' },
      es: { fromName: 'Litros (L)', toName: 'Galones EE. UU. (gal)', formulaSummary: 'gal = L ÷ 3,785411784' },
      fr: { fromName: 'Litres (L)', toName: 'Gallons US (gal)', formulaSummary: 'gal US = L ÷ 3,785411784' },
      de: { fromName: 'Liter (L)', toName: 'US-Gallonen (gal)', formulaSummary: 'US-gal = L ÷ 3,785411784' },
    },
  },
  'oz-to-grams': {
    slug: 'oz-to-grams',
    kind: 'linear',
    fromSymbol: 'oz',
    toSymbol: 'g',
    factor: 28.349523125,
    defaultInput: 8,
    quickValues: [0.5, 1, 2, 4, 8, 12, 16, 32],
    labels: {
      en: { fromName: 'Ounces (oz)', toName: 'Grams (g)', formulaSummary: 'g = oz × 28.349523125' },
      es: { fromName: 'Onzas (oz)', toName: 'Gramos (g)', formulaSummary: 'g = oz × 28,349523125' },
      fr: { fromName: 'Onces (oz)', toName: 'Grammes (g)', formulaSummary: 'g = oz × 28,349523125' },
      de: { fromName: 'Unzen (oz)', toName: 'Gramm (g)', formulaSummary: 'g = oz × 28,349523125' },
    },
  },
  'mb-to-gb': {
    slug: 'mb-to-gb',
    kind: 'linear',
    fromSymbol: 'MB',
    toSymbol: 'GB',
    factor: 1 / 1000,
    defaultInput: 1024,
    quickValues: [100, 256, 500, 1000, 1024, 2048, 4096, 10000],
    labels: {
      en: { fromName: 'Megabytes (MB)', toName: 'Gigabytes (GB, decimal SI)', formulaSummary: 'GB = MB ÷ 1,000 (GiB = MiB ÷ 1,024)' },
      es: { fromName: 'Megabytes (MB)', toName: 'Gigabytes (GB, SI decimal)', formulaSummary: 'GB = MB ÷ 1.000 (GiB = MiB ÷ 1.024)' },
      fr: { fromName: 'Mégaoctets (Mo / MB)', toName: 'Gigaoctets (Go / GB, SI)', formulaSummary: 'Go = Mo ÷ 1 000 (Gio = Mio ÷ 1 024)' },
      de: { fromName: 'Megabyte (MB)', toName: 'Gigabyte (GB, dezimal SI)', formulaSummary: 'GB = MB ÷ 1.000 (GiB = MiB ÷ 1.024)' },
    },
  },
  'px-to-rem': {
    slug: 'px-to-rem',
    kind: 'px-to-rem',
    fromSymbol: 'px',
    toSymbol: 'rem',
    defaultInput: 24,
    quickValues: [12, 14, 16, 18, 20, 24, 32, 48],
    paramDefault: 16,
    paramOptions: [10, 14, 16, 18, 20],
    labels: {
      en: { fromName: 'Pixels (px)', toName: 'Root EM (rem)', formulaSummary: 'rem = px ÷ Root Font Size', paramLabel: 'Root Font Size (px)' },
      es: { fromName: 'Píxeles (px)', toName: 'Root EM (rem)', formulaSummary: 'rem = px ÷ Tamaño Fuente Base', paramLabel: 'Fuente Raíz (px)' },
      fr: { fromName: 'Pixels (px)', toName: 'Root EM (rem)', formulaSummary: 'rem = px ÷ Taille Police Racine', paramLabel: 'Police Racine (px)' },
      de: { fromName: 'Pixel (px)', toName: 'Root EM (rem)', formulaSummary: 'rem = px ÷ Basis-Schriftgröße', paramLabel: 'Basis-Schriftgröße (px)' },
    },
  },
  'watts-to-amps': {
    slug: 'watts-to-amps',
    kind: 'watts-to-amps',
    fromSymbol: 'W',
    toSymbol: 'A',
    defaultInput: 1500,
    quickValues: [100, 500, 1000, 1500, 2000, 2400, 3000, 5000],
    paramDefault: 120,
    paramOptions: [12, 24, 48, 120, 230, 240],
    labels: {
      en: { fromName: 'Power (Watts)', toName: 'Current (Amps)', formulaSummary: 'I (A) = P (W) ÷ V (Volts)', paramLabel: 'Circuit Voltage (V)' },
      es: { fromName: 'Potencia (Watts)', toName: 'Corriente (Amperios)', formulaSummary: 'I (A) = P (W) ÷ V (Voltios)', paramLabel: 'Voltaje del Circuito (V)' },
      fr: { fromName: 'Puissance (Watts)', toName: 'Courant (Ampères)', formulaSummary: 'I (A) = P (W) ÷ U (Volts)', paramLabel: 'Tension du Circuit (V)' },
      de: { fromName: 'Leistung (Watt)', toName: 'Stromstärke (Ampere)', formulaSummary: 'I (A) = P (W) ÷ U (Volt)', paramLabel: 'Spannung (V)' },
    },
  },
  'kwh-to-watts': {
    slug: 'kwh-to-watts',
    kind: 'kwh-to-watts',
    fromSymbol: 'kWh',
    toSymbol: 'W',
    defaultInput: 1.5,
    quickValues: [0.5, 1, 1.5, 2, 5, 10, 24, 30],
    paramDefault: 1,
    paramOptions: [1, 2, 4, 8, 12, 24],
    labels: {
      en: { fromName: 'Energy (kWh)', toName: 'Average Power (Watts)', formulaSummary: 'P (W) = [E (kWh) × 1,000] ÷ Hours', paramLabel: 'Operating Duration (Hours)' },
      es: { fromName: 'Energía (kWh)', toName: 'Potencia Media (Watts)', formulaSummary: 'P (W) = [E (kWh) × 1.000] ÷ Horas', paramLabel: 'Tiempo de Uso (Horas)' },
      fr: { fromName: 'Énergie (kWh)', toName: 'Puissance Moyenne (Watts)', formulaSummary: 'P (W) = [E (kWh) × 1 000] ÷ Heures', paramLabel: 'Durée de Fonctionnement (h)' },
      de: { fromName: 'Energie (kWh)', toName: 'Durchschnittsleistung (Watt)', formulaSummary: 'P (W) = [E (kWh) × 1.000] ÷ Stunden', paramLabel: 'Betriebsdauer (Stunden)' },
    },
  },
  'mph-to-kmh': {
    slug: 'mph-to-kmh',
    kind: 'linear',
    fromSymbol: 'mph',
    toSymbol: 'km/h',
    factor: 1.609344,
    defaultInput: 60,
    quickValues: [20, 30, 45, 55, 60, 65, 70, 100],
    labels: {
      en: { fromName: 'Miles per Hour (mph)', toName: 'Kilometers per Hour (km/h)', formulaSummary: 'km/h = mph × 1.609344' },
      es: { fromName: 'Millas por Hora (mph)', toName: 'Kilómetros por Hora (km/h)', formulaSummary: 'km/h = mph × 1,609344' },
      fr: { fromName: 'Miles par Heure (mph)', toName: 'Kilomètres par Heure (km/h)', formulaSummary: 'km/h = mph × 1,609344' },
      de: { fromName: 'Meilen pro Stunde (mph)', toName: 'Kilometer pro Stunde (km/h)', formulaSummary: 'km/h = mph × 1,609344' },
    },
  },
  'acres-to-square-feet': {
    slug: 'acres-to-square-feet',
    kind: 'linear',
    fromSymbol: 'ac',
    toSymbol: 'ft²',
    factor: 43560,
    defaultInput: 1,
    quickValues: [0.25, 0.5, 1, 2, 5, 10, 40, 100],
    labels: {
      en: { fromName: 'Acres (ac)', toName: 'Square Feet (sq ft)', formulaSummary: 'sq ft = acres × 43,560' },
      es: { fromName: 'Acres (ac)', toName: 'Pies Cuadrados (ft²)', formulaSummary: 'ft² = acres × 43.560' },
      fr: { fromName: 'Acres (ac)', toName: 'Pieds Carrés (pi²)', formulaSummary: 'pi² = acres × 43 560' },
      de: { fromName: 'Acres (ac)', toName: 'Quadratfuß (sq ft)', formulaSummary: 'sq ft = Acres × 43.560' },
    },
  },
  'cups-to-ml': {
    slug: 'cups-to-ml',
    kind: 'linear',
    fromSymbol: 'cups',
    toSymbol: 'mL',
    factor: 236.5882365,
    defaultInput: 2,
    quickValues: [0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 4],
    labels: {
      en: { fromName: 'US Cups', toName: 'Milliliters (mL)', formulaSummary: 'mL = US cups × 236.588' },
      es: { fromName: 'Tazas EE. UU. (cups)', toName: 'Mililitros (mL)', formulaSummary: 'mL = tazas × 236,588' },
      fr: { fromName: 'Tasses US (cups)', toName: 'Millilitres (mL)', formulaSummary: 'mL = tasses × 236,588' },
      de: { fromName: 'US-Cups', toName: 'Milliliter (mL)', formulaSummary: 'mL = Cups × 236,588' },
    },
  },
  'psi-to-bar': {
    slug: 'psi-to-bar',
    kind: 'linear',
    fromSymbol: 'psi',
    toSymbol: 'bar',
    factor: 0.06894757293168,
    defaultInput: 35,
    quickValues: [14.7, 28, 32, 35, 40, 60, 100, 150],
    labels: {
      en: { fromName: 'Pounds per Sq. Inch (PSI)', toName: 'Bar', formulaSummary: 'bar = PSI × 0.0689476' },
      es: { fromName: 'Libras/pulg² (PSI)', toName: 'Bares (bar)', formulaSummary: 'bar = PSI × 0,0689476' },
      fr: { fromName: 'Livres/pouce² (PSI)', toName: 'Bars (bar)', formulaSummary: 'bar = PSI × 0,0689476' },
      de: { fromName: 'PSI (lb/in²)', toName: 'Bar', formulaSummary: 'bar = PSI × 0,0689476' },
    },
  },
};

export function convertForward(spec: UnitPairSpec, input: number, param?: number): number {
  switch (spec.kind) {
    case 'c-to-f':
      return (input * 9) / 5 + 32;
    case 'f-to-c':
      return ((input - 32) * 5) / 9;
    case 'px-to-rem': {
      const base = param && param > 0 ? param : spec.paramDefault || 16;
      return input / base;
    }
    case 'watts-to-amps': {
      const volts = param && param > 0 ? param : spec.paramDefault || 120;
      return input / volts;
    }
    case 'kwh-to-watts': {
      const hours = param && param > 0 ? param : spec.paramDefault || 1;
      return (input * 1000) / hours;
    }
    case 'linear':
    default:
      return input * (spec.factor ?? 1);
  }
}

export function convertReverse(spec: UnitPairSpec, output: number, param?: number): number {
  switch (spec.kind) {
    case 'c-to-f':
      return ((output - 32) * 5) / 9;
    case 'f-to-c':
      return (output * 9) / 5 + 32;
    case 'px-to-rem': {
      const base = param && param > 0 ? param : spec.paramDefault || 16;
      return output * base;
    }
    case 'watts-to-amps': {
      const volts = param && param > 0 ? param : spec.paramDefault || 120;
      return output * volts;
    }
    case 'kwh-to-watts': {
      const hours = param && param > 0 ? param : spec.paramDefault || 1;
      return (output * hours) / 1000;
    }
    case 'linear':
    default:
      return output / (spec.factor ?? 1);
  }
}
