import type { CalculatorDef } from '../types';

/**
 * 20 High-Volume Single-Intent Dedicated Unit Converters (80 localized pages across en/es/fr/de).
 * Powered by UnitPairConverterView.tsx using NIST / ISO 80000-2 exact constants.
 */
export const unitConverterCalculators: CalculatorDef[] = [
  {
    slug: 'cm-to-inches',
    slugs: { en: 'cm-to-inches', es: 'cm-a-pulgadas', fr: 'cm-en-pouces', de: 'cm-in-zoll' },
    title: 'CM to Inches Converter',
    category: 'Other',
    description: 'Convert centimeters to inches accurately using the exact international definition (1 inch = 2.54 cm) with instant reverse swap and reference chart.',
    meta: {
      title: 'CM to Inches Converter – Accurate Centimeters to Inches Calculator',
      description: 'Free CM to Inches converter using exact 2.54 cm/in NIST standard. Convert height, clothing, screen sizes, and dimensions with lookup table.',
      keywords: 'cm to inches, centimeters to inches, cm to in converter, convert cm to inches, height cm to inches',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de CM a Pulgadas',
        description: 'Convierte centímetros a pulgadas con precisión exacta (1 pulgada = 2,54 cm), cambio instantáneo y tabla de conversión rápida.',
        meta: {
          title: 'Conversor de CM a Pulgadas – Calculadora Exacta de Centímetros a Pulgadas',
          description: 'Convierte cm a pulgadas al instante con el estándar exacto de 2,54 cm. Incluye tabla de estatura, medidas y fórmula paso a paso.',
          keywords: 'cm a pulgadas, centimetros a pulgadas, convertir cm a pulgadas, calculadora cm pulgadas',
        },
      },
      fr: {
        title: 'Convertisseur CM en Pouces',
        description: 'Convertissez des centimètres en pouces avec la norme exacte (1 pouce = 2,54 cm), inversion en un clic et tableau de référence.',
        meta: {
          title: 'Convertisseur CM en Pouces – Calcul Exact Centimètres en Pouces',
          description: 'Convertissez instantanément vos cm en pouces (÷ 2,54) pour tailles, écrans et bricolage avec tableau de correspondance complet.',
          keywords: 'cm en pouces, convertir cm en pouces, centimetres en pouces, calculateur cm pouces',
        },
      },
      de: {
        title: 'CM in Zoll Umrechner',
        description: 'Rechnen Sie Zentimeter exakt in Zoll (Inches) um (1 Zoll = 2,54 cm) — mit Sofort-Tausch, Nachkommastellen und Umrechnungstabelle.',
        meta: {
          title: 'CM in Zoll Umrechner – Zentimeter exakt in Inches umrechnen',
          description: 'Kostenloser CM-in-Zoll-Rechner nach exakter 2,54-cm-Norm für Bildschirme, Körpergröße, Rohre und Werkstücke inkl. Tabelle.',
          keywords: 'cm in zoll, zentimeter in zoll umrechnen, cm zu inch, zoll rechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'inches-to-cm',
    slugs: { en: 'inches-to-cm', es: 'pulgadas-a-cm', fr: 'pouces-en-cm', de: 'zoll-in-cm' },
    title: 'Inches to CM Converter',
    category: 'Other',
    description: 'Convert inches to centimeters instantly (cm = inches × 2.54) for TV displays, furniture, clothing measurements, and engineering specs.',
    meta: {
      title: 'Inches to CM Converter – Fast Inches to Centimeters Calculator',
      description: 'Convert inches to centimeters accurately (1 in = 2.54 cm). Ideal for TV diagonals, carpentry, shipping dimensions, and metric conversions.',
      keywords: 'inches to cm, in to cm converter, convert inches to centimeters, inch to cm chart',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Pulgadas a CM',
        description: 'Convierte pulgadas a centímetros al instante (cm = pulgadas × 2,54) para pantallas, muebles, costura y especificaciones técnicas.',
        meta: {
          title: 'Conversor de Pulgadas a CM – Calculadora Exacta de Pulgadas a Centímetros',
          description: 'Convierte pulgadas a centímetros con el factor exacto 2,54. Ideal para televisores, bicicletas, medidas y planos.',
          keywords: 'pulgadas a cm, convertir pulgadas a centimetros, calculadora pulgadas a cm',
        },
      },
      fr: {
        title: 'Convertisseur Pouces en CM',
        description: 'Convertissez les pouces en centimètres instantanément (cm = pouces × 2,54) pour écrans TV, vélos, menuiserie et couture.',
        meta: {
          title: 'Convertisseur Pouces en CM – Calcul Exact Pouces en Centimètres',
          description: 'Transformez vos pouces (inches) en centimètres avec la formule exacte × 2,54 et un tableau de conversion pour écrans et dimensions.',
          keywords: 'pouces en cm, convertir pouces en cm, inch en cm, taille ecran pouces cm',
        },
      },
      de: {
        title: 'Zoll in CM Umrechner',
        description: 'Rechnen Sie Zoll (Inches) sofort in Zentimeter um (cm = Zoll × 2,54) — ideal für Monitore, TVs, Fahrradreifen und Handwerk.',
        meta: {
          title: 'Zoll in CM Umrechner – Inches exakt in Zentimeter umrechnen',
          description: 'Präziser Zoll-in-CM-Rechner (× 2,54) für Fernseher, Monitore, Felgen und Werkzeuge inkl. Schnellwert-Tabelle.',
          keywords: 'zoll in cm, inch in cm umrechnen, bildschirmgroesse zoll cm, zoll umrechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'kg-to-lbs',
    slugs: { en: 'kg-to-lbs', es: 'kg-a-libras', fr: 'kg-en-livres', de: 'kg-in-pfund' },
    title: 'KG to LBS Converter',
    category: 'Other',
    description: 'Convert kilograms to pounds accurately (1 kg = 2.20462262 lbs) for body weight, gym plates, luggage limits, and freight shipping.',
    meta: {
      title: 'KG to LBS Converter – Accurate Kilograms to Pounds Calculator',
      description: 'Convert kilograms (kg) to pounds (lbs) using the exact international avoirdupois pound standard (0.45359237 kg) with reference chart.',
      keywords: 'kg to lbs, kilograms to pounds, convert kg to lbs, weight converter kg lbs',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de KG a Libras',
        description: 'Convierte kilogramos a libras con precisión exacta (1 kg = 2,20462 lbs) para peso corporal, gimnasio, equipaje aéreo y envíos.',
        meta: {
          title: 'Conversor de KG a Libras – Calculadora Exacta de Kilos a Libras',
          description: 'Convierte kilos (kg) a libras (lbs) al instante con la norma internacional exacta y tabla de pesos comunes.',
          keywords: 'kg a libras, kilos a libras, convertir kg a lbs, conversor de peso',
        },
      },
      fr: {
        title: 'Convertisseur KG en Livres (LBS)',
        description: 'Convertissez les kilogrammes en livres américaines (1 kg = 2,20462 lbs) pour poids corporel, musculation, bagages et fret.',
        meta: {
          title: 'Convertisseur KG en Livres (LBS) – Kilogrammes en Pounds Exact',
          description: 'Convertissez vos kilogrammes en livres (lbs) grâce au facteur international exact 2,20462262 avec tableau de référence.',
          keywords: 'kg en livres, kg en lbs, convertir kilos en livres, poids kg lbs',
        },
      },
      de: {
        title: 'KG in Pfund (LBS) Umrechner',
        description: 'Rechnen Sie Kilogramm exakt in US-Pfund (lbs) um (1 kg = 2,20462 lbs) — für Körpergewicht, Krafttraining, Fluggepäck und Versand.',
        meta: {
          title: 'KG in Pfund (LBS) Umrechner – Kilogramm exakt in Pounds umrechnen',
          description: 'Rechnen Sie Kilogramm sofort in amerikanische Pfund (lbs) nach internationaler Norm (0,45359237 kg) um inkl. Gewichtstabelle.',
          keywords: 'kg in pfund, kg in lbs, kilogramm in pounds umrechnen, gewicht umrechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'lbs-to-kg',
    slugs: { en: 'lbs-to-kg', es: 'libras-a-kg', fr: 'livres-en-kg', de: 'pfund-in-kg' },
    title: 'LBS to KG Converter',
    category: 'Other',
    description: 'Convert pounds to kilograms accurately (kg = lbs × 0.45359237) for fitness tracking, clinical weight, parcel shipping, and cooking.',
    meta: {
      title: 'LBS to KG Converter – Fast Pounds to Kilograms Calculator',
      description: 'Convert pounds (lbs) to kilograms (kg) with exact international conversion factor 0.45359237 plus quick body-weight and gym plate chart.',
      keywords: 'lbs to kg, pounds to kilograms, convert lbs to kg, pounds to kg chart',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Libras a KG',
        description: 'Convierte libras a kilogramos con exactitud (kg = lbs × 0,45359237) para entrenamiento, salud, cocina y paquetería.',
        meta: {
          title: 'Conversor de Libras a KG – Calculadora Exacta de Libras a Kilos',
          description: 'Transforma libras (lbs) a kilogramos (kg) con precisión científica y tabla de equivalencias para peso corporal y pesas.',
          keywords: 'libras a kg, lbs a kg, convertir libras a kilos, conversor libras kilogramos',
        },
      },
      fr: {
        title: 'Convertisseur Livres (LBS) en KG',
        description: 'Convertissez des livres (lbs) en kilogrammes avec précision (kg = lbs × 0,45359237) pour sport, santé, cuisine et colis.',
        meta: {
          title: 'Convertisseur Livres (LBS) en KG – Calcul Exact Pounds en Kilos',
          description: 'Convertissez instantanément vos livres américaines (lbs) en kilogrammes (kg) avec tableau complet de correspondance.',
          keywords: 'livres en kg, lbs en kg, convertir pounds en kilos, poids lbs kg',
        },
      },
      de: {
        title: 'Pfund (LBS) in KG Umrechner',
        description: 'Rechnen Sie US-Pfund (lbs) exakt in Kilogramm um (kg = lbs × 0,45359237) — für Fitness, Körpergewicht, Pakete und Rezepte.',
        meta: {
          title: 'Pfund (LBS) in KG Umrechner – Pounds exakt in Kilogramm umrechnen',
          description: 'Kostenloser LBS-in-KG-Rechner nach exaktem Faktor 0,45359237 inkl. Körpergewichts- und Hantel-Tabelle.',
          keywords: 'lbs in kg, pfund in kg, pounds in kilogramm umrechnen, gewicht rechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'celsius-to-fahrenheit',
    slugs: { en: 'celsius-to-fahrenheit', es: 'celsius-a-fahrenheit', fr: 'celsius-en-fahrenheit', de: 'celsius-in-fahrenheit' },
    title: 'Celsius to Fahrenheit Converter',
    category: 'Other',
    description: 'Convert degrees Celsius (°C) to Fahrenheit (°F) using °F = (°C × 9/5) + 32 for weather forecasts, oven baking temperatures, and medical fevers.',
    meta: {
      title: 'Celsius to Fahrenheit Converter (°C to °F) – Formula & Chart',
      description: 'Convert Celsius to Fahrenheit instantly using °F = (°C × 1.8) + 32. Includes weather, body fever, and oven temperature conversion table.',
      keywords: 'celsius to fahrenheit, c to f converter, convert celsius to fahrenheit, temperature converter',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Celsius a Fahrenheit (°C a °F)',
        description: 'Convierte grados Celsius (°C) a Fahrenheit (°F) con °F = (°C × 9/5) + 32 para clima, horno de cocina y fiebre corporal.',
        meta: {
          title: 'Conversor de Celsius a Fahrenheit (°C a °F) – Fórmula y Tabla',
          description: 'Convierte grados centígrados a Fahrenheit al instante con tabla de clima, temperatura corporal y horneado.',
          keywords: 'celsius a fahrenheit, centigrados a fahrenheit, convertir c a f, temperatura',
        },
      },
      fr: {
        title: 'Convertisseur Celsius en Fahrenheit (°C en °F)',
        description: 'Convertissez les degrés Celsius (°C) en Fahrenheit (°F) avec °F = (°C × 9/5) + 32 pour météo, cuisson au four et fièvre.',
        meta: {
          title: 'Convertisseur Celsius en Fahrenheit (°C en °F) – Formule & Tableau',
          description: 'Convertissez instantanément °C en °F avec tableau météo, température corporelle et thermostat de four.',
          keywords: 'celsius en fahrenheit, convertir celsius en fahrenheit, degres c en f, temperature',
        },
      },
      de: {
        title: 'Celsius in Fahrenheit Umrechner (°C in °F)',
        description: 'Rechnen Sie Grad Celsius (°C) exakt in Grad Fahrenheit (°F) um — für Wetter, Backofen-Temperaturen, Fieber und Wissenschaft.',
        meta: {
          title: 'Celsius in Fahrenheit Umrechner (°C in °F) – Formel & Tabelle',
          description: 'Schneller °C-in-°F-Rechner nach °F = (°C × 1,8) + 32 inkl. Wetter-, Fieber- und Backofen-Temperaturtabelle.',
          keywords: 'celsius in fahrenheit, grad celsius in fahrenheit umrechnen, temperatur umrechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'fahrenheit-to-celsius',
    slugs: { en: 'fahrenheit-to-celsius', es: 'fahrenheit-a-celsius', fr: 'fahrenheit-en-celsius', de: 'fahrenheit-in-celsius' },
    title: 'Fahrenheit to Celsius Converter',
    category: 'Other',
    description: 'Convert degrees Fahrenheit (°F) to Celsius (°C) using °C = (°F − 32) × 5/9 for US recipes, weather reports, fever thermometers, and labs.',
    meta: {
      title: 'Fahrenheit to Celsius Converter (°F to °C) – Formula & Chart',
      description: 'Convert Fahrenheit to Celsius accurately using °C = (°F − 32) × 5/9. Includes oven baking (350°F, 400°F), fever, and weather chart.',
      keywords: 'fahrenheit to celsius, f to c converter, convert fahrenheit to celsius, 350 f to c',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Fahrenheit a Celsius (°F a °C)',
        description: 'Convierte grados Fahrenheit (°F) a Celsius (°C) con °C = (°F − 32) × 5/9 para recetas americanas, clima y termómetros.',
        meta: {
          title: 'Conversor de Fahrenheit a Celsius (°F a °C) – Fórmula y Tabla',
          description: 'Convierte °F a °C al instante (ej. 350 °F a °C, 98,6 °F a °C) con tabla práctica de cocina y meteorología.',
          keywords: 'fahrenheit a celsius, convertir fahrenheit a centigrados, f a c, 350 f a c',
        },
      },
      fr: {
        title: 'Convertisseur Fahrenheit en Celsius (°F en °C)',
        description: 'Convertissez les degrés Fahrenheit (°F) en Celsius (°C) avec °C = (°F − 32) × 5/9 pour recettes US, météo et thermomètres.',
        meta: {
          title: 'Convertisseur Fahrenheit en Celsius (°F en °C) – Formule & Tableau',
          description: 'Convertissez instantanément °F en °C (350 °F, 400 °F, 98,6 °F) avec tableau complet four, météo et fièvre.',
          keywords: 'fahrenheit en celsius, convertir fahrenheit en celsius, f en c, 350 f en c',
        },
      },
      de: {
        title: 'Fahrenheit in Celsius Umrechner (°F in °C)',
        description: 'Rechnen Sie Grad Fahrenheit (°F) exakt in Grad Celsius (°C) um — ideal für US-Backrezepte (350 °F, 400 °F), Wetter und Fieberwerte.',
        meta: {
          title: 'Fahrenheit in Celsius Umrechner (°F in °C) – Formel & Tabelle',
          description: 'Exakter °F-in-°C-Umrechner nach °C = (°F − 32) × 5/9 inkl. Backofen-, Fieber- und Wetter-Vergleichstabelle.',
          keywords: 'fahrenheit in celsius, grad fahrenheit in celsius umrechnen, 350 f in c',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'km-to-miles',
    slugs: { en: 'km-to-miles', es: 'km-a-millas', fr: 'km-en-miles', de: 'km-in-meilen' },
    title: 'KM to Miles Converter',
    category: 'Other',
    description: 'Convert kilometers to statute miles accurately (mi = km ÷ 1.609344) for road distances, 5K/10K/marathon races, and travel planning.',
    meta: {
      title: 'KM to Miles Converter – Accurate Kilometers to Miles Calculator',
      description: 'Convert kilometers (km) to miles (mi) using the exact 1.609344 km/mi international mile standard with running race & travel chart.',
      keywords: 'km to miles, kilometers to miles, convert km to miles, 5k in miles, 10k in miles',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de KM a Millas',
        description: 'Convierte kilómetros a millas terrestres exactas (mi = km ÷ 1,609344) para viajes por carretera, carreras 5K/10K y maratones.',
        meta: {
          title: 'Conversor de KM a Millas – Calculadora Exacta de Kilómetros a Millas',
          description: 'Convierte km a millas al instante con el factor exacto 1,609344 y tabla de distancias para running y carreteras.',
          keywords: 'km a millas, kilometros a millas, convertir km a millas, 10 km en millas',
        },
      },
      fr: {
        title: 'Convertisseur KM en Miles',
        description: 'Convertissez des kilomètres en miles terrestres (mi = km ÷ 1,609344) pour itinéraires routiers, courses 5 km / 10 km et marathons.',
        meta: {
          title: 'Convertisseur KM en Miles – Kilomètres en Miles Exact',
          description: 'Transformez rapidement vos kilomètres en miles (÷ 1,609344) avec tableau dédié aux courses à pied et trajets routiers.',
          keywords: 'km en miles, convertir km en miles, kilometres en miles, 10 km en miles',
        },
      },
      de: {
        title: 'KM in Meilen Umrechner',
        description: 'Rechnen Sie Kilometer exakt in Landmeilen (Statute Miles) um (mi = km ÷ 1,609344) — für Straßenverkehr, Laufdistanzen und Reisen.',
        meta: {
          title: 'KM in Meilen Umrechner – Kilometer exakt in Miles umrechnen',
          description: 'Präziser KM-in-Meilen-Rechner (1 Meile = 1,609344 km) mit Lauf- und Reise-Referenztabelle (5K, 10K, Marathon).',
          keywords: 'km in meilen, kilometer in meilen umrechnen, km zu miles, meilen rechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'miles-to-km',
    slugs: { en: 'miles-to-km', es: 'millas-a-km', fr: 'miles-en-km', de: 'meilen-in-km' },
    title: 'Miles to KM Converter',
    category: 'Other',
    description: 'Convert miles to kilometers instantly (km = miles × 1.609344) for US/UK driving distances, odometer readings, and marathon training.',
    meta: {
      title: 'Miles to KM Converter – Fast Miles to Kilometers Calculator',
      description: 'Convert statute miles to kilometers using exact 1.609344 factor. Includes common driving, running, and marathon conversion chart.',
      keywords: 'miles to km, convert miles to kilometers, mi to km, mile to km chart',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Millas a KM',
        description: 'Convierte millas a kilómetros al instante (km = millas × 1,609344) para conducción en EE. UU./Reino Unido, odómetros y carreras.',
        meta: {
          title: 'Conversor de Millas a KM – Calculadora Exacta de Millas a Kilómetros',
          description: 'Convierte millas terrestres a kilómetros con el factor exacto 1,609344 y tabla de referencia de carreteras y maratón.',
          keywords: 'millas a km, convertir millas a kilometros, cuanto es una milla en km',
        },
      },
      fr: {
        title: 'Convertisseur Miles en KM',
        description: 'Convertissez des miles en kilomètres instantanément (km = miles × 1,609344) pour trajets aux États-Unis/Royaume-Uni et running.',
        meta: {
          title: 'Convertisseur Miles en KM – Calcul Exact Miles en Kilomètres',
          description: 'Convertissez vos miles terrestres en kilomètres (× 1,609344) avec tableau pratique pour voyages et courses.',
          keywords: 'miles en km, convertir miles en km, mile en kilometre, distance miles km',
        },
      },
      de: {
        title: 'Meilen in KM Umrechner',
        description: 'Rechnen Sie US-/UK-Landmeilen sofort in Kilometer um (km = Meilen × 1,609344) — für Tacho, Roadtrips und Lauftraining.',
        meta: {
          title: 'Meilen in KM Umrechner – Miles exakt in Kilometer umrechnen',
          description: 'Rechnen Sie Meilen exakt in Kilometer um (× 1,609344) inklusive Tabelle für Straßenverkehr und Marathon-Distanzen.',
          keywords: 'meilen in km, miles in kilometer umrechnen, 1 meile in km, meilen umrechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'feet-to-meters',
    slugs: { en: 'feet-to-meters', es: 'pies-a-metros', fr: 'pieds-en-metres', de: 'fuss-in-meter' },
    title: 'Feet to Meters Converter',
    category: 'Other',
    description: 'Convert feet (ft) to meters (m) using the exact international foot definition (1 ft = 0.3048 m) for architecture, aviation altitude, and height.',
    meta: {
      title: 'Feet to Meters Converter (ft to m) – Exact Length Calculator',
      description: 'Convert feet to meters instantly (m = ft × 0.3048). Essential for construction plans, aviation altitude, real estate, and human height.',
      keywords: 'feet to meters, ft to m converter, convert feet to meters, height feet to meters',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Pies a Metros (ft a m)',
        description: 'Convierte pies (ft) a metros (m) con el factor internacional exacto (1 pie = 0,3048 m) para construcción, aviación y estatura.',
        meta: {
          title: 'Conversor de Pies a Metros (ft a m) – Calculadora de Longitud Exacta',
          description: 'Convierte pies a metros al instante (× 0,3048) con tabla de referencia para arquitectura, altitud y altura corporal.',
          keywords: 'pies a metros, ft a m, convertir pies a metros, calculadora pies metros',
        },
      },
      fr: {
        title: 'Convertisseur Pieds en Mètres (ft en m)',
        description: 'Convertissez des pieds (ft) en mètres (m) selon la norme internationale exacte (1 pied = 0,3048 m) pour bâtiment, aviation et taille.',
        meta: {
          title: 'Convertisseur Pieds en Mètres (ft en m) – Calcul Exact de Longueur',
          description: 'Convertissez instantanément vos pieds en mètres (× 0,3048) pour plans immobiliers, altitude aérienne et tailles.',
          keywords: 'pieds en metres, ft en m, convertir pieds en metres, longueur pieds metres',
        },
      },
      de: {
        title: 'Fuß in Meter Umrechner (ft in m)',
        description: 'Rechnen Sie Fuß (Feet) exakt in Meter um (1 ft = 0,3048 m) — für Luftfahrt-Flughöhen, Baupläne, Segeln und Körpergröße.',
        meta: {
          title: 'Fuß in Meter Umrechner (ft in m) – Exakter Längenrechner',
          description: 'Rechnen Sie Fuß (ft) sofort in Meter um (× 0,3048) inklusive Tabelle für Flughöhen, Architektur und Körpergröße.',
          keywords: 'fuss in meter, feet in meter umrechnen, ft in m, laengenumrechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'meters-to-feet',
    slugs: { en: 'meters-to-feet', es: 'metros-a-pies', fr: 'metres-en-pieds', de: 'meter-in-fuss' },
    title: 'Meters to Feet Converter',
    category: 'Other',
    description: 'Convert meters (m) to feet (ft) using exact ft = m ÷ 0.3048 (3.28084 ft/m) for construction, sports fields, height, and engineering.',
    meta: {
      title: 'Meters to Feet Converter (m to ft) – Exact Length Calculator',
      description: 'Convert meters to feet accurately (1 m = 3.2808399 ft). Includes quick lookup table for height, room sizes, and architectural dimensions.',
      keywords: 'meters to feet, m to ft converter, convert meters to feet, 1 meter in feet',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Metros a Pies (m a ft)',
        description: 'Convierte metros (m) a pies (ft) con precisión exacta (ft = m ÷ 0,3048) para estatura, planos arquitectónicos, deportes e ingeniería.',
        meta: {
          title: 'Conversor de Metros a Pies (m a ft) – Calculadora Exacta',
          description: 'Convierte metros a pies al instante (1 m = 3,28084 pies) con tabla rápida para alturas y construcción.',
          keywords: 'metros a pies, m a ft, convertir metros a pies, 1 metro en pies',
        },
      },
      fr: {
        title: 'Convertisseur Mètres en Pieds (m en ft)',
        description: 'Convertissez des mètres (m) en pieds (ft) avec précision (1 m = 3,28084 ft) pour architecture, sport, aviation et taille.',
        meta: {
          title: 'Convertisseur Mètres en Pieds (m en ft) – Calcul Exact',
          description: 'Transformez vos mètres en pieds immédiatement (÷ 0,3048) avec tableau de référence complet.',
          keywords: 'metres en pieds, m en ft, convertir metres en pieds, 1 metre en pieds',
        },
      },
      de: {
        title: 'Meter in Fuß Umrechner (m in ft)',
        description: 'Rechnen Sie Meter exakt in Fuß (Feet) um (1 m = 3,28084 ft) — für Körpergröße, Raummaße, Luftfahrt und Sportanlagen.',
        meta: {
          title: 'Meter in Fuß Umrechner (m in ft) – Exakter Längenrechner',
          description: 'Rechnen Sie Meter (m) präzise in Fuß (ft) um (÷ 0,3048) mit übersichtlicher Referenz- und Höhentabelle.',
          keywords: 'meter in fuss, m in ft umrechnen, 1 meter in fuss, feet umrechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'liters-to-gallons',
    slugs: { en: 'liters-to-gallons', es: 'litros-a-galones', fr: 'litres-en-gallons', de: 'liter-in-gallonen' },
    title: 'Liters to Gallons Converter',
    category: 'Other',
    description: 'Convert liters (L) to US liquid gallons and UK imperial gallons simultaneously for fuel tanks, aquariums, water storage, and chemistry.',
    meta: {
      title: 'Liters to Gallons Converter (L to US & UK Gal) – Volume Calculator',
      description: 'Convert liters to US gallons (÷ 3.78541) and UK imperial gallons (÷ 4.54609) instantly with fuel & aquarium lookup chart.',
      keywords: 'liters to gallons, l to gal converter, convert liters to gallons, us gallon vs uk gallon',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Litros a Galones',
        description: 'Convierte litros (L) a galones estadounidenses (US) y galones imperiales británicos (UK) al instante para combustible, acuarios y agua.',
        meta: {
          title: 'Conversor de Litros a Galones (US y UK) – Calculadora de Volumen',
          description: 'Convierte litros a galones EE. UU. (÷ 3,78541) e imperiales (÷ 4,54609) con tabla rápida para tanques y líquidos.',
          keywords: 'litros a galones, convertir litros a galones, cuantos litros tiene un galon',
        },
      },
      fr: {
        title: 'Convertisseur Litres en Gallons',
        description: 'Convertissez des litres (L) en gallons américains (US) et impériaux britanniques (UK) pour carburant, aquariums et réservoirs.',
        meta: {
          title: 'Convertisseur Litres en Gallons (US & UK) – Calcul de Volume',
          description: 'Convertissez instantanément vos litres en gallons US (÷ 3,78541) et impériaux (÷ 4,54609) avec tableau de correspondance.',
          keywords: 'litres en gallons, convertir litres en gallons, gallon us en litres',
        },
      },
      de: {
        title: 'Liter in Gallonen Umrechner',
        description: 'Rechnen Sie Liter sofort in US-Gallonen (3,78541 L) und britische Imperial-Gallonen (4,54609 L) um — für Tankvolumen und Aquarien.',
        meta: {
          title: 'Liter in Gallonen Umrechner (US & UK) – Volumenrechner',
          description: 'Exakter Liter-in-Gallonen-Rechner mit gleichzeitiger Anzeige von US-Gallonen und UK-Imperial-Gallonen inkl. Tabelle.',
          keywords: 'liter in gallonen, liter in us gallon umrechnen, wieviel liter ist eine gallone',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'oz-to-grams',
    slugs: { en: 'oz-to-grams', es: 'onzas-a-gramos', fr: 'onces-en-grammes', de: 'unzen-in-gramm' },
    title: 'Ounces to Grams Converter (oz to g)',
    category: 'Other',
    description: 'Convert avoirdupois ounces (oz) to grams (g) accurately (g = oz × 28.349523) for kitchen recipes, baking, postal weights, and nutrition.',
    meta: {
      title: 'Ounces to Grams Converter (oz to g) – Cooking & Mass Calculator',
      description: 'Convert ounces (oz) to grams (g) using exact 28.349523 g/oz standard. Ideal for baking recipes, food macros, and postage.',
      keywords: 'oz to grams, ounces to grams, convert oz to g, cooking oz to grams chart',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Onzas a Gramos (oz a g)',
        description: 'Convierte onzas (oz) a gramos (g) con precisión exacta (g = oz × 28,3495) para recetas de cocina, nutrición y envíos postales.',
        meta: {
          title: 'Conversor de Onzas a Gramos (oz a g) – Cocina y Peso Exacto',
          description: 'Convierte onzas a gramos al instante (× 28,3495 g) con tabla práctica para cocina, repostería y macros.',
          keywords: 'onzas a gramos, oz a g, convertir onzas a gramos, cuanto pesa una onza',
        },
      },
      fr: {
        title: 'Convertisseur Onces en Grammes (oz en g)',
        description: 'Convertissez des onces (oz) en grammes (g) avec précision (g = oz × 28,3495) pour pâtisserie, recettes américaines et nutrition.',
        meta: {
          title: 'Convertisseur Onces en Grammes (oz en g) – Cuisine & Masse',
          description: 'Transformez vos onces en grammes instantanément (× 28,3495 g) avec tableau de cuisine et explication once troy vs avoirdupois.',
          keywords: 'onces en grammes, oz en g, convertir onces en grammes, cuisine oz grammes',
        },
      },
      de: {
        title: 'Unzen in Gramm Umrechner (oz in g)',
        description: 'Rechnen Sie Unzen (oz) exakt in Gramm (g) um (g = oz × 28,3495) — für US-Kochrezepte, Nährwerte und Versandgewichte.',
        meta: {
          title: 'Unzen in Gramm Umrechner (oz in g) – Kochen & Gewicht',
          description: 'Präziser Unzen-in-Gramm-Rechner (× 28,3495 g) für Rezepte, Backen und Paketgewichte inkl. Hinweis zur Feinunze (31,1035 g).',
          keywords: 'unzen in gramm, oz in g umrechnen, wieviel gramm ist eine unze',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'mb-to-gb',
    slugs: { en: 'mb-to-gb', es: 'mb-a-gb', fr: 'mo-en-go', de: 'mb-in-gb' },
    title: 'MB to GB Converter',
    category: 'Other',
    description: 'Convert Megabytes (MB) to Gigabytes (GB) showing both Decimal SI (÷ 1,000) and Binary IEC GiB (÷ 1,024) values for storage drives, RAM, and data plans.',
    meta: {
      title: 'MB to GB Converter – Decimal SI (1,000) & Binary GiB (1,024)',
      description: 'Convert MB to GB accurately with both SI decimal (1,000 MB = 1 GB) and binary IEC (1,024 MiB = 1 GiB) results for SSDs, RAM, and cloud storage.',
      keywords: 'mb to gb, megabytes to gigabytes, 1024 mb to gb, convert mb to gb, data storage converter',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de MB a GB',
        description: 'Convierte Megabytes (MB) a Gigabytes (GB) mostrando simultáneamente el estándar decimal SI (÷ 1.000) y el binario IEC (÷ 1.024).',
        meta: {
          title: 'Conversor de MB a GB – Estándar Decimal (1.000) y Binario (1.024)',
          description: 'Convierte MB a GB con exactitud para discos SSD, memoria RAM, hosting y planes de datos móviles.',
          keywords: 'mb a gb, megabytes a gigabytes, convertir mb a gb, cuantos mb tiene un gb',
        },
      },
      fr: {
        title: 'Convertisseur Mo en Go (MB en GB)',
        description: 'Convertissez des Mégaoctets (Mo / MB) en Gigaoctets (Go / GB) en affichant à la fois la norme SI décimale (÷ 1 000) et binaire CEI (÷ 1 024).',
        meta: {
          title: 'Convertisseur Mo en Go (MB en GB) – Décimal SI & Binaire Gio',
          description: 'Convertissez Mo en Go instantanément pour disques SSD, mémoire RAM, forfaits mobiles et stockage cloud.',
          keywords: 'mo en go, mb en gb, convertir mo en go, combien de mo dans un go',
        },
      },
      de: {
        title: 'MB in GB Umrechner',
        description: 'Rechnen Sie Megabyte (MB) sofort in Gigabyte (GB, ÷ 1.000) und binäre Gibibyte (GiB, ÷ 1.024) um — für SSDs, RAM und Datenvolumen.',
        meta: {
          title: 'MB in GB Umrechner – Dezimal (1.000) & Binär GiB (1.024)',
          description: 'Präziser MB-in-GB-Rechner mit paralleler Anzeige von SI-Gigabyte und binären GiB für Speicher, RAM und Mobilfunk-Datenvolumen.',
          keywords: 'mb in gb, megabyte in gigabyte umrechnen, wieviel mb sind 1 gb, speicher umrechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'px-to-rem',
    slugs: { en: 'px-to-rem', es: 'px-a-rem', fr: 'px-en-rem', de: 'px-in-rem' },
    title: 'PX to REM Converter (CSS)',
    category: 'Other',
    description: 'Convert CSS pixels (px) to responsive Root EM (rem) units with customizable root font-size (16px default) for accessible Tailwind & web typography.',
    meta: {
      title: 'PX to REM Converter – Responsive CSS Unit Calculator (16px Base)',
      description: 'Convert CSS px to rem units instantly with configurable root font size (10px, 14px, 16px, 18px) and Tailwind CSS spacing reference table.',
      keywords: 'px to rem, pixels to rem converter, css px to rem, rem calculator, responsive typography',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de PX a REM (CSS)',
        description: 'Convierte píxeles CSS (px) a unidades responsivas REM con tamaño de fuente raíz personalizable (16px por defecto) para diseño web accesible.',
        meta: {
          title: 'Conversor de PX a REM CSS – Calculadora Responsiva (Base 16px)',
          description: 'Calcula unidades REM a partir de píxeles CSS al instante con selector de fuente base y tabla de tipografía Tailwind.',
          keywords: 'px a rem, convertir px a rem, calculadora rem css, pixeles a rem',
        },
      },
      fr: {
        title: 'Convertisseur PX en REM (CSS)',
        description: 'Convertissez vos pixels CSS (px) en unités REM adaptatives avec taille de police racine configurable (16px par défaut) pour le web accessible.',
        meta: {
          title: 'Convertisseur PX en REM CSS – Calculateur Responsive (Base 16px)',
          description: 'Transformez les pixels CSS en REM en un clic avec police racine réglable et tableau de correspondance Tailwind CSS.',
          keywords: 'px en rem, convertir px en rem, calculateur rem css, pixels en rem',
        },
      },
      de: {
        title: 'PX in REM Umrechner (CSS)',
        description: 'Rechnen Sie CSS-Pixel (px) exakt in barrierefreie Root-EM-Einheiten (rem) bei wählbarer Basis-Schriftgröße (Standard 16px) um.',
        meta: {
          title: 'PX in REM Umrechner – CSS-Einheiten Rechner (16px Basis)',
          description: 'Kostenloser PX-in-REM-Konverter für modernes CSS & Tailwind mit einstellbarer Root-Font-Size und Typografie-Tabelle.',
          keywords: 'px in rem, pixel in rem umrechnen, css rem rechner, tailwind px rem',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'watts-to-amps',
    slugs: { en: 'watts-to-amps', es: 'watts-a-amperios', fr: 'watts-en-amperes', de: 'watt-in-ampere' },
    title: 'Watts to Amps Converter',
    category: 'Physics',
    description: 'Convert electrical power in Watts (W) to current in Amps (A) for 12V, 24V, 48V DC solar/battery banks and 120V/230V/240V AC household circuits.',
    meta: {
      title: 'Watts to Amps Converter (W to A) – 12V, 120V, 230V & 240V Calculator',
      description: 'Convert Watts to Amps instantly (I = P ÷ V) for 12V batteries, 120V US outlets, and 230V EU circuits with breaker & wire sizing reference.',
      keywords: 'watts to amps, w to a converter, convert watts to amps, 1500 watts to amps, 12v watts to amps',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Watts a Amperios',
        description: 'Convierte potencia eléctrica en Watts (W) a corriente en Amperios (A) para sistemas DC 12V/24V/48V y circuitos AC de 120V/230V.',
        meta: {
          title: 'Conversor de Watts a Amperios (W a A) – 12V, 120V y 230V',
          description: 'Calcula amperios a partir de watts (I = P ÷ V) para baterías solares, electrodomésticos y selección de disyuntores.',
          keywords: 'watts a amperios, vatios a amperios, convertir watts a amps, formula watts amperios',
        },
      },
      fr: {
        title: 'Convertisseur Watts en Ampères',
        description: 'Convertissez une puissance électrique en Watts (W) en intensité en Ampères (A) pour circuits 12V/24V/48V CC et 230V/120V CA.',
        meta: {
          title: 'Convertisseur Watts en Ampères (W en A) – 12V, 230V & 120V',
          description: 'Calculez instantanément les ampères depuis les watts (I = P ÷ U) pour disjoncteurs 230V, solaire 12V et câblage électrique.',
          keywords: 'watts en amperes, convertir watts en amperes, formule watt ampere 230v',
        },
      },
      de: {
        title: 'Watt in Ampere Umrechner',
        description: 'Rechnen Sie elektrische Leistung in Watt (W) exakt in Stromstärke in Ampere (A) um — für 230V Haushaltsstrom, 12V/24V/48V Solar & Akkus.',
        meta: {
          title: 'Watt in Ampere Umrechner (W in A) – 230V, 12V, 24V & 48V',
          description: 'Berechnen Sie Ampere aus Watt (I = P ÷ U) für 230V-Steckdosen, 16A-Sicherungen, Photovoltaik und 12V-Batterien inkl. Tabelle.',
          keywords: 'watt in ampere, w in a umrechnen, 230v watt in ampere, stromstaerke berechnen',
        },
      },
    },
    fields: [],
    logicModule: 'physics',
  },
  {
    slug: 'kwh-to-watts',
    slugs: { en: 'kwh-to-watts', es: 'kwh-a-watts', fr: 'kwh-en-watts', de: 'kwh-in-watt' },
    title: 'kWh to Watts Converter',
    category: 'Physics',
    description: 'Convert electrical energy in Kilowatt-Hours (kWh) to average power in Watts (W) over any operating duration (1h, 8h, 24h) for solar and energy audits.',
    meta: {
      title: 'kWh to Watts Converter – Convert Energy (kWh) to Power (W)',
      description: 'Convert kilowatt-hours (kWh) to average power in Watts (P = kWh × 1,000 ÷ hours) for solar panels, home batteries, and utility bill audits.',
      keywords: 'kwh to watts, convert kwh to watts, kilowatt hours to watts, energy to power calculator',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de kWh a Watts',
        description: 'Convierte energía eléctrica en kilovatios-hora (kWh) a potencia promedio en Watts (W) según las horas de funcionamiento.',
        meta: {
          title: 'Conversor de kWh a Watts – Energía (kWh) a Potencia Media (W)',
          description: 'Calcula watts a partir de kWh y horas de uso (P = kWh × 1.000 ÷ horas) para auditorías energéticas, baterías y paneles solares.',
          keywords: 'kwh a watts, convertir kwh a vatios, kilovatios hora a watts',
        },
      },
      fr: {
        title: 'Convertisseur kWh en Watts',
        description: 'Convertissez une énergie électrique en kilowattheures (kWh) en puissance moyenne en Watts (W) selon la durée de fonctionnement en heures.',
        meta: {
          title: 'Convertisseur kWh en Watts – Énergie (kWh) vers Puissance (W)',
          description: 'Calculez la puissance en Watts depuis des kWh (P = kWh × 1 000 ÷ heures) pour panneaux solaires, batteries et factures d’électricité.',
          keywords: 'kwh en watts, convertir kwh en watts, relation kwh watt heures',
        },
      },
      de: {
        title: 'kWh in Watt Umrechner',
        description: 'Rechnen Sie elektrische Energie in Kilowattstunden (kWh) über die Betriebsdauer in durchschnittliche Leistung in Watt (W) um.',
        meta: {
          title: 'kWh in Watt Umrechner – Energie (kWh) in Leistung (W) berechnen',
          description: 'Rechnen Sie kWh über die Nutzungsdauer exakt in Watt um (P = kWh × 1.000 ÷ Stunden) für Stromverbrauch, Balkonkraftwerk & Speicher.',
          keywords: 'kwh in watt, kilowattstunden in watt umrechnen, kwh zu watt rechner',
        },
      },
    },
    fields: [],
    logicModule: 'physics',
  },
  {
    slug: 'mph-to-kmh',
    slugs: { en: 'mph-to-kmh', es: 'mph-a-kmh', fr: 'mph-en-kmh', de: 'mph-in-kmh' },
    title: 'MPH to KM/H Converter',
    category: 'Other',
    description: 'Convert speed from miles per hour (mph) to kilometers per hour (km/h) using exact km/h = mph × 1.609344 for driving limits, weather wind speeds, and sports.',
    meta: {
      title: 'MPH to KM/H Converter – Exact Speed Conversion Calculator',
      description: 'Convert mph to km/h instantly (× 1.609344). Includes highway speed limit table (30, 55, 65, 70 mph) and hurricane wind speed conversions.',
      keywords: 'mph to kmh, miles per hour to kmh, convert mph to km/h, 60 mph to kmh, speed converter',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de MPH a KM/H',
        description: 'Convierte velocidad de millas por hora (mph) a kilómetros por hora (km/h) con el factor exacto 1,609344 para carreteras, vientos y deportes.',
        meta: {
          title: 'Conversor de MPH a KM/H – Calculadora Exacta de Velocidad',
          description: 'Convierte mph a km/h al instante con tabla de límites de autopista, huracanes y velocidad vehicular.',
          keywords: 'mph a kmh, millas por hora a kilometros por hora, 60 mph a kmh',
        },
      },
      fr: {
        title: 'Convertisseur MPH en KM/H',
        description: 'Convertissez une vitesse de miles par heure (mph) en kilomètres par heure (km/h) avec le facteur exact × 1,609344 pour conduite et météo.',
        meta: {
          title: 'Convertisseur MPH en KM/H – Calcul Exact de Vitesse',
          description: 'Convertissez instantanément mph en km/h (30, 55, 65, 70 mph) avec tableau des limitations routières et rafales de vent.',
          keywords: 'mph en kmh, convertir mph en km/h, miles par heure en km/h, vitesse',
        },
      },
      de: {
        title: 'MPH in KM/H Umrechner',
        description: 'Rechnen Sie Meilen pro Stunde (mph) exakt in Kilometer pro Stunde (km/h) um (× 1,609344) — für US/UK-Tempolimits, Windgeschwindigkeiten und Sport.',
        meta: {
          title: 'MPH in KM/H Umrechner – Geschwindigkeit exakt umrechnen',
          description: 'Schneller MPH-in-KM/H-Rechner (× 1,609344) mit Tempolimit-Tabelle für USA/UK und Windgeschwindigkeiten.',
          keywords: 'mph in kmh, meilen pro stunde in kmh umrechnen, 60 mph in kmh, geschwindigkeit rechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'acres-to-square-feet',
    slugs: { en: 'acres-to-square-feet', es: 'acres-a-pies-cuadrados', fr: 'acres-en-pieds-carres', de: 'acres-in-quadratfuss' },
    title: 'Acres to Square Feet Converter',
    category: 'Other',
    description: 'Convert land area from acres to square feet (sq ft = acres × 43,560) for real estate lots, property surveys, landscaping, and farming.',
    meta: {
      title: 'Acres to Square Feet Converter (1 Acre = 43,560 sq ft)',
      description: 'Convert acres to square feet instantly (× 43,560) with common quarter-acre, half-acre, and multi-acre lot size comparison table.',
      keywords: 'acres to square feet, acres to sq ft, how many square feet in an acre, land area converter',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Acres a Pies Cuadrados',
        description: 'Convierte superficie de terrenos de acres a pies cuadrados (1 acre = 43.560 ft²) para bienes raíces, topografía, jardinería y agricultura.',
        meta: {
          title: 'Conversor de Acres a Pies Cuadrados (1 Acre = 43.560 ft²)',
          description: 'Convierte acres a pies cuadrados al instante con tabla de lotes inmobiliarios y equivalencia en metros cuadrados (4.046,86 m²).',
          keywords: 'acres a pies cuadrados, cuantos pies cuadrados tiene un acre, conversor de area',
        },
      },
      fr: {
        title: 'Convertisseur Acres en Pieds Carrés',
        description: 'Convertissez une surface foncière d’acres en pieds carrés (1 acre = 43 560 pi²) pour terrains immobiliers, arpentage et agriculture.',
        meta: {
          title: 'Convertisseur Acres en Pieds Carrés (1 Acre = 43 560 pi²)',
          description: 'Convertissez instantanément vos acres en pieds carrés (× 43 560) avec tableau de surfaces foncières et équivalence en m².',
          keywords: 'acres en pieds carres, convertir acre en pieds carres, surface terrain',
        },
      },
      de: {
        title: 'Acres in Quadratfuß Umrechner',
        description: 'Rechnen Sie Grundstücksflächen von Acres exakt in Quadratfuß (sq ft = Acres × 43.560) um — für US-Immobilien, Landwirtschaft und Flächenvergleiche.',
        meta: {
          title: 'Acres in Quadratfuß Umrechner (1 Acre = 43.560 sq ft)',
          description: 'Präziser Acres-in-Quadratfuß-Rechner (× 43.560) inkl. Grundstückstabelle und Umrechnungshinweis zu Quadratmetern (4.046,86 m²).',
          keywords: 'acres in quadratfuss, acre in sq ft umrechnen, grundstuecksflaeche umrechnen',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'cups-to-ml',
    slugs: { en: 'cups-to-ml', es: 'tazas-a-ml', fr: 'tasses-en-ml', de: 'cups-in-ml' },
    title: 'Cups to mL Converter (US Cups to Milliliters)',
    category: 'Other',
    description: 'Convert US customary cooking cups to milliliters (1 US cup = 236.588 mL) for international baking recipes, beverages, and kitchen prep.',
    meta: {
      title: 'Cups to mL Converter – US Cups to Milliliters Cooking Calculator',
      description: 'Convert US cups to milliliters (× 236.588 mL) accurately for baking and cooking. Includes fractional cup table (1/4, 1/3, 1/2, 3/4, 1, 2 cups).',
      keywords: 'cups to ml, convert cups to ml, 1 cup in ml, cooking volume converter, baking ml chart',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de Tazas a Mililitros (Cups a mL)',
        description: 'Convierte tazas de cocina estadounidenses (US cups) a mililitros (1 taza = 236,59 mL) para repostería, bebidas y recetas internacionales.',
        meta: {
          title: 'Conversor de Tazas a mL – Calculadora de Cocina (US Cups a Mililitros)',
          description: 'Convierte tazas a mililitros al instante con tabla de fracciones culinarias (1/4, 1/3, 1/2, 3/4, 1 y 2 tazas).',
          keywords: 'tazas a ml, cups a ml, cuantos ml tiene una taza, conversor de cocina',
        },
      },
      fr: {
        title: 'Convertisseur Tasses (Cups) en mL',
        description: 'Convertissez les tasses américaines (US cups) en millilitres (1 cup = 236,59 mL) pour réussir toutes vos recettes anglo-saxonnes.',
        meta: {
          title: 'Convertisseur Tasses (Cups) en mL – Calculateur de Cuisine',
          description: 'Convertissez instantanément les US cups en millilitres (× 236,588) avec tableau des fractions courantes (1/4, 1/3, 1/2, 1 cup).',
          keywords: 'cups en ml, tasses en ml, 1 cup en ml, conversion cuisine recettes us',
        },
      },
      de: {
        title: 'Cups in mL Umrechner (US-Cups in Milliliter)',
        description: 'Rechnen Sie amerikanische Cups exakt in Milliliter um (1 US-Cup = 236,59 mL) — ideal für Backrezepte, Smoothies und Kochmaße.',
        meta: {
          title: 'Cups in mL Umrechner – US-Cups exakt in Milliliter für Rezepte',
          description: 'Rechnen Sie US-Cups sofort in Milliliter um inkl. praktischer Backtabelle für 1/4, 1/3, 1/2, 3/4, 1 und 2 Cups.',
          keywords: 'cups in ml, us cup in milliliter umrechnen, 1 cup in ml, backrezept umrechner',
        },
      },
    },
    fields: [],
    logicModule: 'other',
  },
  {
    slug: 'psi-to-bar',
    slugs: { en: 'psi-to-bar', es: 'psi-a-bar', fr: 'psi-en-bar', de: 'psi-in-bar' },
    title: 'PSI to Bar Pressure Converter',
    category: 'Physics',
    description: 'Convert pressure from Pounds per Square Inch (PSI) to Bar accurately (1 PSI = 0.0689476 bar) for car/bike tires, scuba tanks, espresso machines, and hydraulics.',
    meta: {
      title: 'PSI to Bar Converter – Accurate Tire & Hydraulic Pressure Calculator',
      description: 'Convert PSI to Bar instantly (bar = PSI × 0.0689476). Includes car & bicycle tire pressure lookup chart (28–120 PSI to Bar).',
      keywords: 'psi to bar, convert psi to bar, tire pressure psi to bar, 35 psi to bar, pressure converter',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Conversor de PSI a Bar (Presión)',
        description: 'Convierte presión de libras por pulgada cuadrada (PSI) a bares (bar) con precisión (1 PSI = 0,0689476 bar) para neumáticos, compresores e hidráulica.',
        meta: {
          title: 'Conversor de PSI a Bar – Presión de Neumáticos e Hidráulica',
          description: 'Convierte PSI a Bar al instante con tabla de presión de neumáticos de auto y bicicleta (28 a 120 PSI).',
          keywords: 'psi a bar, convertir psi a bar, presion neumaticos psi bar, 32 psi a bar',
        },
      },
      fr: {
        title: 'Convertisseur PSI en Bar (Pression)',
        description: 'Convertissez une pression de PSI en Bars avec précision (1 PSI = 0,0689476 bar) pour pneus auto/vélo, compresseurs et systèmes hydrauliques.',
        meta: {
          title: 'Convertisseur PSI en Bar – Pression Pneus Auto, Vélo & Hydraulique',
          description: 'Transformez vos PSI en Bars immédiatement avec tableau complet des pressions de pneus courants (28 à 120 PSI).',
          keywords: 'psi en bar, convertir psi en bar, pression pneu psi bar, 35 psi en bar',
        },
      },
      de: {
        title: 'PSI in Bar Umrechner (Reifendruck & Druck)',
        description: 'Rechnen Sie Druck von PSI exakt in Bar um (1 PSI = 0,0689476 bar) — ideal für Auto- & Fahrradreifen, Kompressoren und Hydraulik.',
        meta: {
          title: 'PSI in Bar Umrechner – Reifendruck & Hydraulik exakt berechnen',
          description: 'Rechnen Sie PSI sofort in Bar um (× 0,0689476) mit praktischer Auto- und Fahrrad-Reifendrucktabelle (28 bis 120 PSI).',
          keywords: 'psi in bar, reifendruck psi in bar umrechnen, 35 psi in bar, druck umrechner',
        },
      },
    },
    fields: [],
    logicModule: 'physics',
  },
];
