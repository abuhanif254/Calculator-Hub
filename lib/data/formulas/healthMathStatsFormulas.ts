// ═══════════════════════════════════════════════════════════════════════
// lib/data/formulas/healthMathStatsFormulas.ts
// 24 verified, 4-language (EN / ES / FR / DE) Health, Sports, Statistics,
// Math, Concrete, Subnet & GPA mathematical models.
// ═══════════════════════════════════════════════════════════════════════

import type { CalculatorFormulaDef } from './types';

export const healthMathStatsFormulas: CalculatorFormulaDef[] = [
  // 1. BMI
  {
    slugs: ['bmi-calculator', 'bmi-calculator-for-men', 'bmi-calculator-for-women'],
    name: 'Body Mass Index (BMI) Formula',
    formula: 'BMI = weight(kg) / [height(m)]²  |  BMI = 703 × weight(lbs) / [height(in)]²',
    latex: '\\text{BMI} = \\frac{m_{\\text{kg}}}{h_{\\text{m}}^2} = 703 \\times \\frac{m_{\\text{lbs}}}{h_{\\text{in}}^2}',
    variables: [
      { symbol: 'BMI', name: 'Body Mass Index', description: 'WHO clinical ratio of body mass to squared height (kg/m²)' },
      { symbol: 'm', name: 'Body Weight', description: 'Measured mass in kilograms (kg) or pounds (lbs)' },
      { symbol: 'h', name: 'Stature / Height', description: 'Standing height in meters (m) or inches (in)' },
    ],
    stepByStep: '1. Metric: square your height in meters and divide weight in kg by h². 2. Imperial: divide weight in lbs by squared height in inches, then multiply by 703.',
    faq: {
      question: 'What is the formula to calculate Body Mass Index (BMI)?',
      answer: 'In metric units, BMI = weight (kg) / [height (m)]². In imperial units, BMI = 703 × weight (lbs) / [height (in)]². WHO cutoffs: <18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, ≥30 obese.',
    },
    translations: {
      es: {
        name: 'Fórmula del Índice de Masa Corporal (IMC / BMI)',
        variables: [
          { symbol: 'BMI', name: 'Índice de Masa Corporal (IMC)', description: 'Relación clínica OMS entre peso y estatura al cuadrado (kg/m²)' },
          { symbol: 'm', name: 'Peso Corporal', description: 'Peso medido en kilogramos (kg) o libras (lbs)' },
          { symbol: 'h', name: 'Estatura', description: 'Altura en metros (m) o pulgadas (in)' },
        ],
        stepByStep: '1. Sistema métrico: eleve la estatura en metros al cuadrado y divida el peso en kg por ese resultado. 2. Sistema imperial: divida libras entre pulgadas al cuadrado y multiplique por 703.',
      },
      fr: {
        name: 'Formule de l’Indice de Masse Corporelle (IMC)',
        variables: [
          { symbol: 'BMI', name: 'Indice de Masse Corporelle (IMC)', description: 'Rapport clinique OMS du poids sur la taille au carré (kg/m²)' },
          { symbol: 'm', name: 'Masse Corporelle', description: 'Poids mesuré en kilogrammes (kg)' },
          { symbol: 'h', name: 'Taille', description: 'Taille debout exprimée en mètres (m)' },
        ],
        stepByStep: '1. Convertissez votre taille en mètres et élevez-la au carré (h²). 2. Divisez votre poids en kilogrammes par h² pour obtenir votre IMC en kg/m².',
      },
      de: {
        name: 'Body-Mass-Index-Formel (BMI nach WHO)',
        variables: [
          { symbol: 'BMI', name: 'Body-Mass-Index (BMI)', description: 'WHO-Kennzahl aus Körpergewicht und Körpergröße zum Quadrat (kg/m²)' },
          { symbol: 'm', name: 'Körpergewicht', description: 'Gewicht in Kilogramm (kg)' },
          { symbol: 'h', name: 'Körpergröße', description: 'Körpergröße in Metern (m)' },
        ],
        stepByStep: '1. Körpergröße in Metern mit sich selbst multiplizieren (h²). 2. Körpergewicht in Kilogramm durch h² teilen. Normalgewicht nach WHO: 18,5 bis 24,9 kg/m².',
      },
    },
  },

  // 2. BMR & TDEE
  {
    slugs: ['bmr-calculator', 'calorie-calculator'],
    name: 'Mifflin-St Jeor BMR & TDEE Equation',
    formula: 'Men: BMR = 10W + 6.25H - 5A + 5  |  Women: BMR = 10W + 6.25H - 5A - 161',
    latex: '\\text{BMR}_{\\text{M}} = 10W + 6.25H - 5A + 5, \\quad \\text{BMR}_{\\text{F}} = 10W + 6.25H - 5A - 161',
    variables: [
      { symbol: 'BMR', name: 'Basal Metabolic Rate', description: 'Resting daily energy expenditure (kcal/day)' },
      { symbol: 'W', name: 'Weight (kg)', description: 'Body mass in kilograms' },
      { symbol: 'H', name: 'Height (cm)', description: 'Standing stature in centimeters' },
      { symbol: 'A', name: 'Age (years)', description: 'Chronological age in years' },
    ],
    stepByStep: '1. Compute 10W + 6.25H - 5A. 2. Add +5 for men or subtract 161 for women to obtain BMR. 3. Multiply BMR by an activity factor (1.2 sedentary to 1.9 athletic) for TDEE.',
    faq: {
      question: 'What equation calculates BMR and daily maintenance calories?',
      answer: 'The Mifflin-St Jeor equation calculates BMR as 10W + 6.25H - 5A + 5 (men) or -161 (women). Multiplying BMR by an activity factor (1.2–1.9) gives Total Daily Energy Expenditure (TDEE).',
    },
    translations: {
      es: {
        name: 'Ecuación de Mifflin-St Jeor (TMB y Calorías Diarias)',
        variables: [
          { symbol: 'BMR', name: 'Tasa Metabólica Basal (TMB)', description: 'Calorías quemadas diariamente en reposo absoluto (kcal/día)' },
          { symbol: 'W', name: 'Peso (kg)', description: 'Masa corporal en kilogramos' },
          { symbol: 'H', name: 'Estatura (cm)', description: 'Altura en centímetros' },
          { symbol: 'A', name: 'Edad (años)', description: 'Edad cronológica en años' },
        ],
        stepByStep: '1. Calcule 10W + 6,25H - 5A. 2. Sume +5 para hombres o reste 161 para mujeres. 3. Multiplique la TMB por el factor de actividad (1,2 a 1,9) para obtener el gasto calórico total (TDEE).',
      },
      fr: {
        name: 'Équation de Mifflin-St Jeor (Métabolisme de Base & TDEE)',
        variables: [
          { symbol: 'BMR', name: 'Métabolisme de Base (MB)', description: 'Dépense énergétique quotidienne au repos (kcal/jour)' },
          { symbol: 'W', name: 'Poids (kg)', description: 'Masse corporelle en kilogrammes' },
          { symbol: 'H', name: 'Taille (cm)', description: 'Taille en centimètres' },
          { symbol: 'A', name: 'Âge (ans)', description: 'Âge chronologique en années' },
        ],
        stepByStep: '1. Calculez 10W + 6,25H - 5A. 2. Ajoutez +5 (hommes) ou retranchez 161 (femmes). 3. Multipliez le MB par le niveau d’activité (1,2 à 1,9) pour les besoins caloriques journaliers.',
      },
      de: {
        name: 'Mifflin-St-Jeor-Gleichung (Grundumsatz & Gesamtumsatz)',
        variables: [
          { symbol: 'BMR', name: 'Grundumsatz (BMR)', description: 'Täglicher Kalorienverbrauch in völliger Ruhe (kcal/Tag)' },
          { symbol: 'W', name: 'Gewicht (kg)', description: 'Körpergewicht in Kilogramm' },
          { symbol: 'H', name: 'Größe (cm)', description: 'Körpergröße in Zentimetern' },
          { symbol: 'A', name: 'Alter (Jahre)', description: 'Lebensalter in Jahren' },
        ],
        stepByStep: '1. 10W + 6,25H - 5A berechnen. 2. Bei Männern +5 addieren, bei Frauen 161 abziehen. 3. Mit dem Aktivitätsfaktor PAL (1,2 bis 1,9) multiplizieren für den Gesamtumsatz.',
      },
    },
  },

  // 3. Body Fat %
  {
    slugs: ['body-fat-calculator'],
    name: 'U.S. Navy Circumference Body Fat Formula',
    formula: 'Men: BF% = 495 / (1.0324 - 0.19077 log₁₀(W - N) + 0.15456 log₁₀(H)) - 450',
    latex: '\\text{BF}\\%_{\\text{M}} = \\frac{495}{1.0324 - 0.19077\\log_{10}(W - N) + 0.15456\\log_{10}(H)} - 450',
    variables: [
      { symbol: 'W', name: 'Waist Circumference', description: 'Horizontal waist measurement in cm (at navel for men, narrowest for women)' },
      { symbol: 'N', name: 'Neck Circumference', description: 'Neck girth below the larynx in cm' },
      { symbol: 'H', name: 'Height', description: 'Standing stature in cm (women’s equation also includes hip circumference)' },
    ],
    stepByStep: '1. Measure neck, waist (and hip for women) and height in cm. 2. Compute body density via the U.S. Navy logarithmic equation. 3. Convert density to BF% via the Siri equation (495/D - 450).',
    faq: {
      question: 'What formula estimates body fat percentage from tape measurements?',
      answer: 'The U.S. Navy method uses base-10 logarithms of waist, neck (plus hip for women), and height to estimate body density, then converts density to body fat % using Siri’s formula.',
    },
    translations: {
      es: {
        name: 'Fórmula de Grasa Corporal de la Marina de EE. UU.',
        variables: [
          { symbol: 'W', name: 'Perímetro de Cintura', description: 'Medida de cintura en cm' },
          { symbol: 'N', name: 'Perímetro de Cuello', description: 'Contorno del cuello en cm' },
          { symbol: 'H', name: 'Estatura', description: 'Altura en cm (en mujeres incluye también cadera)' },
        ],
        stepByStep: '1. Mida cuello, cintura (y cadera en mujeres) y estatura en cm. 2. Calcule la densidad corporal logarítmica. 3. Convierta a porcentaje graso mediante la fórmula de Siri (495/D - 450).',
      },
      fr: {
        name: 'Formule de Masse Grasse de l’US Navy',
        variables: [
          { symbol: 'W', name: 'Tour de Taille', description: 'Circonférence de la taille en cm' },
          { symbol: 'N', name: 'Tour de Cou', description: 'Circonférence du cou en cm' },
          { symbol: 'H', name: 'Taille', description: 'Stature en cm (la formule féminine inclut les hanches)' },
        ],
        stepByStep: '1. Mesurez cou, taille (et hanches pour les femmes) et stature en cm. 2. Calculez la densité corporelle logarithmique. 3. Appliquez la conversion de Siri (495/D - 450).',
      },
      de: {
        name: 'US-Navy-Körperfettanteil-Formel',
        variables: [
          { symbol: 'W', name: 'Taillenumfang', description: 'Umfangsmessung der Taille in cm' },
          { symbol: 'N', name: 'Halsumfang', description: 'Umfang des Halses in cm' },
          { symbol: 'H', name: 'Körpergröße', description: 'Körpergröße in cm (bei Frauen zzgl. Hüftumfang)' },
        ],
        stepByStep: '1. Hals-, Taillen- (bei Frauen auch Hüft-) Umfang und Größe in cm messen. 2. Körperdichte per Logarithmusformel bestimmen. 3. Mit der Siri-Formel (495/D - 450) in KFA % umrechnen.',
      },
    },
  },

  // 4. Ideal & Healthy Weight
  {
    slugs: ['ideal-weight-calculator', 'healthy-weight-calculator', 'height-calculator'],
    name: 'Devine Ideal Body Weight & WHO Healthy Range Formula',
    formula: 'Men: IBW = 50 + 2.3 × (H_in - 60) kg  |  Women: IBW = 45.5 + 2.3 × (H_in - 60) kg',
    latex: '\\text{IBW}_{\\text{M}} = 50 + 2.3(H_{\\text{in}} - 60), \\quad \\text{IBW}_{\\text{F}} = 45.5 + 2.3(H_{\\text{in}} - 60)',
    variables: [
      { symbol: 'IBW', name: 'Ideal Body Weight', description: 'Clinical reference body weight in kilograms' },
      { symbol: 'H_in', name: 'Height in Inches', description: 'Standing height converted to inches (cm / 2.54)' },
    ],
    stepByStep: '1. Subtract 60 inches (5 feet) from height in inches. 2. Multiply excess inches by 2.3 kg. 3. Add 50 kg (men) or 45.5 kg (women), and cross-check against WHO BMI 18.5–24.9 bounds.',
    faq: {
      question: 'How is Ideal Body Weight (IBW) calculated?',
      answer: 'The Devine formula sets baseline IBW at 50 kg (men) or 45.5 kg (women) for 5 feet (152.4 cm), adding 2.3 kg for every additional inch of height.',
    },
    translations: {
      es: {
        name: 'Fórmula de Peso Ideal de Devine y Rango Saludable OMS',
        variables: [
          { symbol: 'IBW', name: 'Peso Corporal Ideal', description: 'Peso clínico de referencia en kilogramos' },
          { symbol: 'H_in', name: 'Estatura en Pulgadas', description: 'Altura dividida entre 2,54 cm' },
        ],
        stepByStep: '1. Reste 60 pulgadas (152,4 cm) a su estatura en pulgadas. 2. Multiplique por 2,3 kg. 3. Sume 50 kg (hombres) o 45,5 kg (mujeres) y contraste con el rango IMC 18,5–24,9.',
      },
      fr: {
        name: 'Formule du Poids Idéal de Devine et Plage Santé OMS',
        variables: [
          { symbol: 'IBW', name: 'Poids Corporel Idéal', description: 'Poids de référence clinique en kilogrammes' },
          { symbol: 'H_in', name: 'Taille en Pouces', description: 'Taille en cm divisée par 2,54' },
        ],
        stepByStep: '1. Soustrayez 60 pouces (152,4 cm) de votre taille en pouces. 2. Multipliez par 2,3 kg. 3. Ajoutez 50 kg (hommes) ou 45,5 kg (femmes) et vérifiez la plage IMC 18,5–24,9.',
      },
      de: {
        name: 'Devine-Idealgewichtsformel & WHO-Normalgewichtsbereich',
        variables: [
          { symbol: 'IBW', name: 'Ideales Körpergewicht', description: 'Klinisches Referenzgewicht in Kilogramm' },
          { symbol: 'H_in', name: 'Körpergröße in Zoll', description: 'Größe in cm geteilt durch 2,54' },
        ],
        stepByStep: '1. 60 Zoll (152,4 cm) von der Größe abziehen. 2. Mit 2,3 kg multiplizieren. 3. 50 kg (Männer) bzw. 45,5 kg (Frauen) addieren und mit WHO-BMI 18,5–24,9 abgleichen.',
      },
    },
  },

  // 5. Macros & Carbs
  {
    slugs: ['macro-calculator', 'carbohydrate-calculator'],
    name: 'Atwater Macronutrient Energy Conversion Formula',
    formula: 'Protein (g) = (Calories × p%) / 4  |  Carbs (g) = (Calories × c%) / 4  |  Fat (g) = (Calories × f%) / 9',
    latex: 'P_g = \\frac{E \\cdot p}{4}, \\quad C_g = \\frac{E \\cdot c}{4}, \\quad F_g = \\frac{E \\cdot f}{9}',
    variables: [
      { symbol: 'E', name: 'Daily Calorie Target', description: 'Target daily intake in kilocalories (TDEE ± goal delta)' },
      { symbol: 'p, c, f', name: 'Macro Share Fractions', description: 'Proportion of calories from protein, carbs, and fats (sum = 1.0)' },
    ],
    stepByStep: '1. Multiply daily calorie goal E by each macro percentage. 2. Divide protein and carbohydrate calories by 4 kcal/g. 3. Divide fat calories by 9 kcal/g.',
    faq: {
      question: 'How are daily macro grams calculated from total calories?',
      answer: 'Using standard Atwater factors, protein and carbohydrates yield 4 kcal per gram while dietary fat yields 9 kcal per gram. Multiply total calories by each macro share and divide by 4 or 9.',
    },
    translations: {
      es: {
        name: 'Fórmula de Macronutrientes y Carbohidratos (Factores Atwater)',
        variables: [
          { symbol: 'E', name: 'Calorías Diarias Objetivo', description: 'Ingesta diaria meta en kilocalorías (kcal)' },
          { symbol: 'p, c, f', name: 'Porcentajes de Macros', description: 'Distribución de proteínas, carbohidratos y grasas (suma = 1)' },
        ],
        stepByStep: '1. Multiplique las calorías objetivo E por el porcentaje de cada macro. 2. Divida proteínas y carbohidratos entre 4 kcal/g. 3. Divida las grasas entre 9 kcal/g.',
      },
      fr: {
        name: 'Formule des Macronutriments (Coefficients d’Atwater)',
        variables: [
          { symbol: 'E', name: 'Objectif Calorique Journalier', description: 'Apport quotidien visé en kilocalories (kcal)' },
          { symbol: 'p, c, f', name: 'Répartition des Macros', description: 'Parts de protéines, glucides et lipides (somme = 1)' },
        ],
        stepByStep: '1. Multipliez l’objectif calorique E par chaque pourcentage. 2. Divisez protéines et glucides par 4 kcal/g. 3. Divisez les lipides par 9 kcal/g.',
      },
      de: {
        name: 'Makronährstoff- & Kalorien-Umrechnungsformel (Atwater)',
        variables: [
          { symbol: 'E', name: 'Tageskalorienziel', description: 'Angestrebte Energiezufuhr in Kilokalorien (kcal)' },
          { symbol: 'p, c, f', name: 'Makro-Anteile', description: 'Anteile von Protein, Kohlenhydraten und Fett (Summe = 1)' },
        ],
        stepByStep: '1. Tageskalorien E mit dem jeweiligen Anteil multiplizieren. 2. Protein- und Kohlenhydratkalorien durch 4 kcal/g teilen. 3. Fettkalorien durch 9 kcal/g teilen.',
      },
    },
  },

  // 6. Running Pace
  {
    slugs: ['pace-calculator'],
    name: 'Running Pace, Speed & Finish Time Formula',
    formula: 'Pace = Time / Distance  |  Finish Time = Pace × Distance  |  Speed = 60 / Pace',
    latex: '\\text{Pace} = \\frac{T}{D}, \\quad v = \\frac{60}{\\text{Pace (min/unit)}}',
    variables: [
      { symbol: 'T', name: 'Elapsed Time', description: 'Total race or training time in minutes' },
      { symbol: 'D', name: 'Distance', description: 'Total distance in kilometers (km) or miles (mi)' },
      { symbol: 'v', name: 'Average Speed', description: 'Running velocity in km/h or mph' },
    ],
    stepByStep: '1. Convert elapsed time to total seconds. 2. Divide by distance D (km or mi) to get seconds per split, then format as MM:SS. 3. Divide 60 by pace in decimal minutes for speed.',
    faq: {
      question: 'How do you calculate running pace per kilometer or mile?',
      answer: 'Divide total running time in minutes by total distance: Pace = Time / Distance. Multiply decimal fraction minutes by 60 to read seconds (e.g. 5.5 min/km = 5:30 /km).',
    },
    translations: {
      es: {
        name: 'Fórmula de Ritmo de Carrera y Velocidad Media',
        variables: [
          { symbol: 'T', name: 'Tiempo Total', description: 'Duración total de la carrera en minutos' },
          { symbol: 'D', name: 'Distancia', description: 'Distancia recorrida en kilómetros (km) o millas' },
          { symbol: 'v', name: 'Velocidad Media', description: 'Velocidad en km/h o mph' },
        ],
        stepByStep: '1. Convierta el tiempo total a segundos. 2. Divida por la distancia en km para obtener min/km en formato MM:SS. 3. Divida 60 entre el ritmo en minutos decimales para km/h.',
      },
      fr: {
        name: 'Formule d’Allure de Course (min/km) et Vitesse',
        variables: [
          { symbol: 'T', name: 'Temps Total', description: 'Durée totale de l’épreuve en minutes' },
          { symbol: 'D', name: 'Distance', description: 'Distance parcourue en kilomètres (km)' },
          { symbol: 'v', name: 'Vitesse Moyenne', description: 'Vitesse de course en km/h' },
        ],
        stepByStep: '1. Convertissez le temps en secondes. 2. Divisez par la distance en km pour obtenir l’allure MM:SS/km. 3. Divisez 60 par l’allure décimale pour la vitesse en km/h.',
      },
      de: {
        name: 'Laufpace- (min/km) & Geschwindigkeitsformel',
        variables: [
          { symbol: 'T', name: 'Gesamtzeit', description: 'Laufzeit in Minuten' },
          { symbol: 'D', name: 'Distanz', description: 'Gelaufene Strecke in Kilometern (km)' },
          { symbol: 'v', name: 'Durchschnittsgeschwindigkeit', description: 'Tempo in km/h' },
        ],
        stepByStep: '1. Laufzeit in Sekunden umrechnen. 2. Durch die Distanz in km teilen ergibt die Pace im Format MM:SS/km. 3. 60 durch die Dezimal-Pace teilen ergibt km/h.',
      },
    },
  },

  // 7. Pregnancy & Ovulation
  {
    slugs: ['pregnancy-calculator', 'due-date-calculator', 'pregnancy-conception-calculator', 'ovulation-calculator'],
    name: 'Naegele’s Rule & Cycle-Adjusted Due Date Formula',
    formula: 'EDD = LMP + 280 days + (Cycle Length - 28 days)  |  Ovulation ≈ Next Period - 14 days',
    latex: '\\text{EDD} = \\text{LMP} + 280 + (L_{\\text{cycle}} - 28)',
    variables: [
      { symbol: 'EDD', name: 'Estimated Due Date', description: 'Projected 40-week full-term delivery date' },
      { symbol: 'LMP', name: 'Last Menstrual Period', description: 'First day of the last normal menstrual period' },
      { symbol: 'L_cycle', name: 'Cycle Length', description: 'Average menstrual cycle length in days (default 28)' },
    ],
    stepByStep: '1. Add 280 days (40 weeks) to the first day of your Last Menstrual Period. 2. Adjust by (cycle length - 28) days. 3. Ovulation typically occurs ~14 days prior to the next expected period.',
    faq: {
      question: 'How is an estimated pregnancy due date calculated?',
      answer: 'Naegele’s rule adds 280 days (40 weeks) to the first day of the last menstrual period (LMP), adjusted by the difference between actual cycle length and 28 days.',
    },
    translations: {
      es: {
        name: 'Regla de Naegele (Fecha Probable de Parto y Ovulación)',
        variables: [
          { symbol: 'EDD', name: 'Fecha Probable de Parto', description: 'Fecha estimada al cumplir 40 semanas de gestación' },
          { symbol: 'LMP', name: 'Última Menstruación (FUM)', description: 'Primer día del último periodo menstrual' },
          { symbol: 'L_cycle', name: 'Duración del Ciclo', description: 'Duración media del ciclo en días (estándar 28)' },
        ],
        stepByStep: '1. Sume 280 días (40 semanas) al primer día de su última menstruación. 2. Ajuste según (duración del ciclo - 28). 3. La ovulación suele ocurrir 14 días antes del siguiente ciclo.',
      },
      fr: {
        name: 'Règle de Naegele (Date Prévue d’Accouchement & Ovulation)',
        variables: [
          { symbol: 'EDD', name: 'Date Prévue d’Accouchement', description: 'Terme estimé à 40 semaines d’aménorrhée (41 SA en France)' },
          { symbol: 'LMP', name: 'Dernières Règles (DDR)', description: 'Premier jour des dernières règles' },
          { symbol: 'L_cycle', name: 'Durée du Cycle', description: 'Durée habituelle du cycle en jours (28 par défaut)' },
        ],
        stepByStep: '1. Ajoutez 280 jours (40 semaines) au premier jour des dernières règles. 2. Ajustez de (durée du cycle - 28) jours. 3. L’ovulation survient environ 14 jours avant le cycle suivant.',
      },
      de: {
        name: 'Naegele-Regel (Errechneter Geburtstermin & Eisprung)',
        variables: [
          { symbol: 'EDD', name: 'Errechneter Geburtstermin (ET)', description: 'Voraussichtlicher Termin nach 40 Schwangerschaftswochen' },
          { symbol: 'LMP', name: 'Letzte Regelblutung', description: 'Erster Tag der letzten normalen Periode' },
          { symbol: 'L_cycle', name: 'Zykluslänge', description: 'Durchschnittliche Zyklusdauer in Tagen (Standard 28)' },
        ],
        stepByStep: '1. 280 Tage (40 Wochen) zum ersten Tag der letzten Regel addieren. 2. Um (Zykluslänge - 28) Tage korrigieren. 3. Der Eisprung liegt meist ca. 14 Tage vor der nächsten Blutung.',
      },
    },
  },

  // 8. Sleep Cycle
  {
    slugs: ['advanced-sleep-cycle-calculator'],
    name: 'Ultradian 90-Minute Sleep Cycle Formula',
    formula: 'Optimal Wake Time = Bedtime + Latency (15 min) + k × 90 min  (k = 4, 5, 6)',
    latex: 'T_{\\text{wake}} = T_{\\text{bed}} + L_{\\text{onset}} + 90k \\quad (k \\in \\{4, 5, 6\\})',
    variables: [
      { symbol: 'T_bed', name: 'Bedtime', description: 'Time you get into bed to fall asleep' },
      { symbol: 'L_onset', name: 'Sleep Latency', description: 'Average time needed to fall asleep (~14–15 minutes)' },
      { symbol: 'k', name: 'Complete REM Cycles', description: 'Number of complete 90-minute NREM+REM cycles (5 cycles = 7.5 h)' },
    ],
    stepByStep: '1. Add ~15 minutes of sleep onset latency to bedtime. 2. Add integer multiples of 90 minutes (5 cycles = 7h 30m, 6 cycles = 9h 00m) to wake cleanly between REM phases.',
    faq: {
      question: 'How does the 90-minute sleep cycle formula reduce grogginess?',
      answer: 'Human sleep alternates through ~90-minute NREM/REM cycles. Setting an alarm for 4, 5, or 6 full cycles plus ~15 minutes sleep latency minimizes deep-sleep inertia.',
    },
    translations: {
      es: {
        name: 'Fórmula de Ciclos Ultradianos de Sueño (90 Minutos)',
        variables: [
          { symbol: 'T_bed', name: 'Hora de Acostarse', description: 'Momento en que se acuesta para dormir' },
          { symbol: 'L_onset', name: 'Latencia del Sueño', description: 'Tiempo medio en conciliar el sueño (~15 min)' },
          { symbol: 'k', name: 'Ciclos Completos', description: 'Número de ciclos completos de 90 min (5 ciclos = 7,5 h)' },
        ],
        stepByStep: '1. Sume unos 15 minutos de latencia a la hora de acostarse. 2. Añada múltiplos exactos de 90 minutos (5 ciclos = 7 h 30 min) para despertar al final del sueño ligero.',
      },
      fr: {
        name: 'Formule des Cycles de Sommeil de 90 Minutes',
        variables: [
          { symbol: 'T_bed', name: 'Heure du Coucher', description: 'Heure à laquelle vous vous mettez au lit' },
          { symbol: 'L_onset', name: 'Temps d’Endormissement', description: 'Latence moyenne d’endormissement (~15 min)' },
          { symbol: 'k', name: 'Nombre de Cycles', description: 'Cycles complets de 90 min (5 cycles = 7 h 30)' },
        ],
        stepByStep: '1. Ajoutez ~15 minutes de latence d’endormissement. 2. Ajoutez des multiples entiers de 90 minutes (5 ou 6 cycles) afin de vous réveiller en fin de cycle.',
      },
      de: {
        name: '90-Minuten-Schlafzyklus-Formel',
        variables: [
          { symbol: 'T_bed', name: 'Schlafenszeit', description: 'Uhrzeit beim Zubettgehen' },
          { symbol: 'L_onset', name: 'Einschlafzeit', description: 'Durchschnittliche Einschlafdauer (~15 Min.)' },
          { symbol: 'k', name: 'Vollständige Schlafzyklen', description: 'Anzahl der 90-Minuten-Zyklen (5 Zyklen = 7,5 Std.)' },
        ],
        stepByStep: '1. Ca. 15 Minuten Einschlafzeit zur Schlafenszeit addieren. 2. Ganze Vielfache von 90 Minuten (5 Zyklen = 7,5 Std., 6 = 9 Std.) addieren, um außerhalb der Tiefschlafphase zu erwachen.',
      },
    },
  },

  // 9. Percentage & Percentage Change
  {
    slugs: [
      'percentage-calculator', 'percentage-increase-calculator',
      'percentage-decrease-calculator', 'percentage-difference-calculator',
    ],
    name: 'Percentage, Change & Difference Formulas',
    formula: 'P% = (Part / Whole) × 100  |  Change% = [(V₂ - V₁) / |V₁|] × 100  |  Diff% = |V₁ - V₂| / [(V₁ + V₂)/2] × 100',
    latex: '\\text{Change}\\% = \\frac{V_2 - V_1}{|V_1|} \\times 100\\%, \\quad \\text{Diff}\\% = \\frac{|V_1 - V_2|}{(V_1 + V_2)/2} \\times 100\\%',
    variables: [
      { symbol: 'V₁', name: 'Initial / First Value', description: 'Baseline starting value' },
      { symbol: 'V₂', name: 'New / Second Value', description: 'Updated or comparison value' },
    ],
    stepByStep: '1. For percent increase/decrease: subtract V₁ from V₂, divide by |V₁|, and multiply by 100. 2. For symmetric percent difference: divide |V₁ - V₂| by the average (V₁ + V₂)/2 × 100.',
    faq: {
      question: 'What is the difference between percentage change and percentage difference?',
      answer: 'Percentage change measures directional growth/decline relative to the starting value [(V₂ - V₁)/|V₁| × 100], whereas percentage difference compares two symmetric values against their midpoint average.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Porcentaje, Variación y Diferencia Porcentual',
        variables: [
          { symbol: 'V₁', name: 'Valor Inicial', description: 'Valor base de referencia' },
          { symbol: 'V₂', name: 'Valor Final / Nuevo', description: 'Valor actualizado o de comparación' },
        ],
        stepByStep: '1. Para aumento/disminución: reste V₁ de V₂, divida por |V₁| y multiplique por 100. 2. Para diferencia simétrica: divida |V₁ - V₂| por el promedio (V₁ + V₂)/2 × 100.',
      },
      fr: {
        name: 'Formules de Pourcentage, Variation et Écart Relatif',
        variables: [
          { symbol: 'V₁', name: 'Valeur Initiale', description: 'Valeur de référence de départ' },
          { symbol: 'V₂', name: 'Valeur Finale', description: 'Nouvelle valeur ou valeur comparée' },
        ],
        stepByStep: '1. Pour une évolution : (V₂ - V₁) / |V₁| × 100. 2. Pour une différence symétrique : divisez |V₁ - V₂| par la moyenne (V₁ + V₂)/2 puis multipliez par 100.',
      },
      de: {
        name: 'Prozent-, Prozentuale Änderung- & Differenzformel',
        variables: [
          { symbol: 'V₁', name: 'Ausgangswert', description: 'Ursprünglicher Grundwert' },
          { symbol: 'V₂', name: 'Neuer / Zweiter Wert', description: 'Geänderter oder verglichener Wert' },
        ],
        stepByStep: '1. Für prozentuale Veränderung: (V₂ - V₁) durch |V₁| teilen und mit 100 multiplizieren. 2. Für prozentuale Differenz: |V₁ - V₂| durch den Mittelwert (V₁ + V₂)/2 × 100 teilen.',
      },
    },
  },

  // 10. Percent Error
  {
    slugs: ['percent-error-calculator'],
    name: 'Percent Error Formula',
    formula: 'Percent Error = (|Experimental - Theoretical| / |Theoretical|) × 100',
    latex: '\\text{Percent Error} = \\frac{|V_{\\text{exp}} - V_{\\text{theor}}|}{|V_{\\text{theor}}|} \\times 100\\%',
    variables: [
      { symbol: 'V_exp', name: 'Experimental Value', description: 'Measured observation from lab or trial' },
      { symbol: 'V_theor', name: 'Theoretical Value', description: 'Accepted true or reference value' },
    ],
    stepByStep: '1. Subtract theoretical value from experimental measurement. 2. Take the absolute value. 3. Divide by |Theoretical| and multiply by 100.',
    faq: {
      question: 'How do you calculate percent error?',
      answer: 'Percent Error = (|Experimental Value - Theoretical Value| / |Theoretical Value|) × 100, quantifying laboratory measurement accuracy.',
    },
    translations: {
      es: {
        name: 'Fórmula del Error Porcentual (Error Relativo)',
        variables: [
          { symbol: 'V_exp', name: 'Valor Experimental', description: 'Medición observada en laboratorio' },
          { symbol: 'V_theor', name: 'Valor Teórico', description: 'Valor real aceptado de referencia' },
        ],
        stepByStep: '1. Reste el valor teórico del valor experimental. 2. Tome el valor absoluto. 3. Divida entre |Valor Teórico| y multiplique por 100.',
      },
      fr: {
        name: 'Formule de l’Erreur Relative (Pourcentage d’Erreur)',
        variables: [
          { symbol: 'V_exp', name: 'Valeur Expérimentale', description: 'Mesure obtenue lors de l’expérience' },
          { symbol: 'V_theor', name: 'Valeur Théorique', description: 'Valeur de référence acceptée' },
        ],
        stepByStep: '1. Soustrayez la valeur théorique de la valeur mesurée. 2. Prenez la valeur absolue. 3. Divisez par |Valeur Théorique| et multipliez par 100.',
      },
      de: {
        name: 'Formel für den Prozentualen Fehler (Relativer Fehler)',
        variables: [
          { symbol: 'V_exp', name: 'Messwert (Experimentell)', description: 'Im Versuch gemessener Wert' },
          { symbol: 'V_theor', name: 'Theoretischer Referenzwert', description: 'Anerkannter Soll- oder Literaturwert' },
        ],
        stepByStep: '1. Referenzwert vom Messwert abziehen. 2. Betrag bilden. 3. Durch |Referenzwert| teilen und mit 100 multiplizieren.',
      },
    },
  },

  // 11. Standard Deviation & Variance
  {
    slugs: ['standard-deviation-calculator', 'variance-calculator', 'statistics-calculator'],
    name: 'Sample & Population Standard Deviation Formula',
    formula: 's = √[ Σ(xᵢ - x̄)² / (n - 1) ]  |  σ = √[ Σ(xᵢ - μ)² / N ]',
    latex: 's = \\sqrt{\\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n - 1}}, \\quad \\sigma = \\sqrt{\\frac{\\sum_{i=1}^{N}(x_i - \\mu)^2}{N}}',
    variables: [
      { symbol: 's, σ', name: 'Standard Deviation', description: 'Dispersion around the mean (sample s uses Bessel’s n-1)' },
      { symbol: 'xᵢ', name: 'Data Points', description: 'Individual numeric observations in the dataset' },
      { symbol: 'x̄, μ', name: 'Mean', description: 'Arithmetic average of all observations' },
      { symbol: 'n, N', name: 'Count', description: 'Number of observations in sample or population' },
    ],
    stepByStep: '1. Compute the mean x̄. 2. Subtract x̄ from each observation and square each deviation. 3. Divide the sum of squares by (n - 1) for sample variance s² (or N for population σ²), then take the square root.',
    faq: {
      question: 'Why does sample standard deviation divide by (n - 1) instead of n?',
      answer: 'Dividing by (n - 1) applies Bessel’s correction, eliminating downward bias when estimating population variance σ² from a finite sample.',
    },
    translations: {
      es: {
        name: 'Fórmula de Desviación Estándar y Varianza (Muestral y Poblacional)',
        variables: [
          { symbol: 's, σ', name: 'Desviación Estándar', description: 'Dispersión respecto a la media (muestra s usa n - 1)' },
          { symbol: 'xᵢ', name: 'Datos Individuales', description: 'Cada observación del conjunto de datos' },
          { symbol: 'x̄, μ', name: 'Media Aritmética', description: 'Promedio de todas las observaciones' },
          { symbol: 'n, N', name: 'Tamaño', description: 'Cantidad total de datos' },
        ],
        stepByStep: '1. Calcule la media x̄. 2. Eleve al cuadrado las diferencias (xᵢ - x̄)². 3. Divida la suma por (n - 1) para varianza muestral y extraiga la raíz cuadrada.',
      },
      fr: {
        name: 'Formule de l’Écart-Type et de la Variance',
        variables: [
          { symbol: 's, σ', name: 'Écart-Type', description: 'Mesure de dispersion autour de la moyenne (n - 1 pour un échantillon)' },
          { symbol: 'xᵢ', name: 'Observations', description: 'Valeurs individuelles de la série statistique' },
          { symbol: 'x̄, μ', name: 'Moyenne', description: 'Moyenne arithmétique de l’ensemble' },
          { symbol: 'n, N', name: 'Effectif', description: 'Nombre total d’observations' },
        ],
        stepByStep: '1. Calculez la moyenne x̄. 2. Sommez les écarts au carré (xᵢ - x̄)². 3. Divisez par (n - 1) pour la variance d’échantillon puis prenez la racine carrée.',
      },
      de: {
        name: 'Formel für Standardabweichung & Varianz (Stichprobe / Grundgesamtheit)',
        variables: [
          { symbol: 's, σ', name: 'Standardabweichung', description: 'Streuungsmaß um den Mittelwert (Stichprobe s mit n - 1)' },
          { symbol: 'xᵢ', name: 'Messwerte', description: 'Einzelne Beobachtungen im Datensatz' },
          { symbol: 'x̄, μ', name: 'Mittelwert', description: 'Arithmetisches Mittel aller Werte' },
          { symbol: 'n, N', name: 'Stichprobenumfang', description: 'Anzahl der Datenpunkte' },
        ],
        stepByStep: '1. Mittelwert x̄ bestimmen. 2. Abweichungen (xᵢ - x̄) quadrieren und summieren. 3. Durch (n - 1) teilen für die Stichprobenvarianz s² und Wurzel ziehen.',
      },
    },
  },

  // 12. Z-Score
  {
    slugs: ['z-score-calculator'],
    name: 'Standard Normal Z-Score Formula',
    formula: 'z = (x - μ) / σ',
    latex: 'z = \\frac{x - \\mu}{\\sigma}',
    variables: [
      { symbol: 'z', name: 'Z-Score', description: 'Signed number of standard deviations above or below the mean' },
      { symbol: 'x', name: 'Observed Score', description: 'Raw data value being standardized' },
      { symbol: 'μ', name: 'Population Mean', description: 'Distribution center average' },
      { symbol: 'σ', name: 'Standard Deviation', description: 'Population spread parameter' },
    ],
    stepByStep: '1. Subtract the mean μ from the raw observation x. 2. Divide by standard deviation σ. 3. Look up Φ(z) on the cumulative normal distribution for percentile rank.',
    faq: {
      question: 'What is the Z-score formula and what does it represent?',
      answer: 'Z = (x - μ) / σ expresses how many standard deviations a value x lies from the mean μ. Roughly 95% of normally distributed values fall between z = -1.96 and +1.96.',
    },
    translations: {
      es: {
        name: 'Fórmula de Puntuación Típica (Z-Score)',
        variables: [
          { symbol: 'z', name: 'Puntuación Z', description: 'Número de desviaciones estándar respecto a la media' },
          { symbol: 'x', name: 'Valor Observado', description: 'Dato bruto a estandarizar' },
          { symbol: 'μ', name: 'Media', description: 'Promedio de la distribución' },
          { symbol: 'σ', name: 'Desviación Estándar', description: 'Dispersión de la distribución' },
        ],
        stepByStep: '1. Reste la media μ al dato x. 2. Divida por la desviación estándar σ. 3. Consulte la curva normal acumulada Φ(z) para obtener el percentil.',
      },
      fr: {
        name: 'Formule de la Cote Z (Variable Centrée Réduite)',
        variables: [
          { symbol: 'z', name: 'Score Z', description: 'Nombre d’écarts-types séparant la valeur de la moyenne' },
          { symbol: 'x', name: 'Valeur Observée', description: 'Donnée brute à standardiser' },
          { symbol: 'μ', name: 'Moyenne', description: 'Espérance de la distribution' },
          { symbol: 'σ', name: 'Écart-Type', description: 'Dispersion de la population' },
        ],
        stepByStep: '1. Soustrayez la moyenne μ de la valeur x. 2. Divisez par l’écart-type σ. 3. Utilisez la fonction de répartition normale Φ(z) pour le centile.',
      },
      de: {
        name: 'Z-Wert-Formel (Standardnormalverteilung)',
        variables: [
          { symbol: 'z', name: 'Z-Wert (Standardwert)', description: 'Abstand zum Mittelwert in Standardabweichungen' },
          { symbol: 'x', name: 'Beobachtungswert', description: 'Zu standardisierender Rohwert' },
          { symbol: 'μ', name: 'Mittelwert', description: 'Erwartungswert der Verteilung' },
          { symbol: 'σ', name: 'Standardabweichung', description: 'Streuung der Grundgesamtheit' },
        ],
        stepByStep: '1. Mittelwert μ vom Rohwert x subtrahieren. 2. Durch Standardabweichung σ teilen. 3. Per Verteilungsfunktion Φ(z) das Perzentil ablesen.',
      },
    },
  },

  // 13. Confidence Interval
  {
    slugs: ['confidence-interval-calculator'],
    name: 'Confidence Interval for Population Mean Formula',
    formula: 'CI = x̄ ± z_(α/2) × (σ / √n)',
    latex: '\\text{CI} = \\bar{x} \\pm z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}}',
    variables: [
      { symbol: 'x̄', name: 'Sample Mean', description: 'Point estimate from sample observations' },
      { symbol: 'z_(α/2)', name: 'Critical Value', description: '1.645 (90%), 1.960 (95%), or 2.576 (99% confidence)' },
      { symbol: 'σ / √n', name: 'Standard Error (SE)', description: 'Standard deviation divided by square root of sample size n' },
    ],
    stepByStep: '1. Divide standard deviation by √n to find Standard Error. 2. Multiply SE by the critical z (or t) score to get Margin of Error. 3. Add and subtract Margin of Error from x̄.',
    faq: {
      question: 'What is the formula for a 95% confidence interval?',
      answer: 'For a 95% confidence interval with large n, CI = x̄ ± 1.96 × (s / √n), where 1.96 × (s / √n) is the margin of error.',
    },
    translations: {
      es: {
        name: 'Fórmula del Intervalo de Confianza para la Media',
        variables: [
          { symbol: 'x̄', name: 'Media Muestral', description: 'Estimación puntual de la muestra' },
          { symbol: 'z_(α/2)', name: 'Valor Crítico', description: '1,645 (90%), 1,960 (95%) o 2,576 (99%)' },
          { symbol: 'σ / √n', name: 'Error Estándar', description: 'Desviación estándar dividida entre √n' },
        ],
        stepByStep: '1. Divida la desviación por √n para obtener el error estándar. 2. Multiplique por el valor crítico z para el margen de error. 3. Sume y reste ese margen a x̄.',
      },
      fr: {
        name: 'Formule de l’Intervalle de Confiance de la Moyenne',
        variables: [
          { symbol: 'x̄', name: 'Moyenne d’Échantillon', description: 'Estimation ponctuelle mesurée' },
          { symbol: 'z_(α/2)', name: 'Valeur Critique', description: '1,645 (90 %), 1,960 (95 %) ou 2,576 (99 %)' },
          { symbol: 'σ / √n', name: 'Erreur Standard', description: 'Écart-type divisé par la racine de n' },
        ],
        stepByStep: '1. Divisez l’écart-type par √n pour l’erreur standard. 2. Multipliez par le coefficient critique z pour la marge d’erreur. 3. Encadrez x̄ par ± cette marge.',
      },
      de: {
        name: 'Konfidenzintervall-Formel für den Mittelwert',
        variables: [
          { symbol: 'x̄', name: 'Stichprobenmittelwert', description: 'Punktschätzer aus der Stichprobe' },
          { symbol: 'z_(α/2)', name: 'Kritischer Wert', description: '1,645 (90 %), 1,960 (95 %) oder 2,576 (99 %)' },
          { symbol: 'σ / √n', name: 'Standardfehler (SE)', description: 'Standardabweichung geteilt durch √n' },
        ],
        stepByStep: '1. Standardabweichung durch √n teilen (Standardfehler). 2. Mit kritischem z-Wert multiplizieren (Fehlermarge). 3. Fehlermarge zu x̄ addieren und subtrahieren.',
      },
    },
  },

  // 14. Student's t-Test
  {
    slugs: ['t-test-calculator'],
    name: 'Student’s t-Test Statistic Formula',
    formula: 't = (x̄ - μ₀) / (s / √n)  |  Two-Sample: t = (x̄₁ - x̄₂) / √(s₁²/n₁ + s₂²/n₂)',
    latex: 't = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}',
    variables: [
      { symbol: 't', name: 't-Statistic', description: 'Ratio of mean difference to standard error of the difference' },
      { symbol: 'x̄₁, x̄₂', name: 'Group Means', description: 'Sample means of the two compared groups' },
      { symbol: 's₁, s₂', name: 'Sample Std. Devs', description: 'Within-group sample standard deviations' },
      { symbol: 'n₁, n₂', name: 'Sample Sizes', description: 'Number of observations per group' },
    ],
    stepByStep: '1. Compute the difference between group means. 2. Compute pooled or Welch’s standard error √(s₁²/n₁ + s₂²/n₂). 3. Divide mean difference by SE and evaluate against Student’s t-distribution.',
    faq: {
      question: 'What is the formula for a two-sample t-test?',
      answer: 'Welch’s two-sample t-statistic is t = (x̄₁ - x̄₂) / √(s₁²/n₁ + s₂²/n₂), testing whether two independent sample means differ significantly.',
    },
    translations: {
      es: {
        name: 'Fórmula de la Prueba t de Student',
        variables: [
          { symbol: 't', name: 'Estadístico t', description: 'Cociente entre la diferencia de medias y su error estándar' },
          { symbol: 'x̄₁, x̄₂', name: 'Medias Muestrales', description: 'Promedios de los grupos comparados' },
          { symbol: 's₁, s₂', name: 'Desviaciones Muestrales', description: 'Dispersión interna de cada muestra' },
          { symbol: 'n₁, n₂', name: 'Tamaños Muestrales', description: 'Observaciones en cada grupo' },
        ],
        stepByStep: '1. Reste las medias de ambos grupos. 2. Calcule el error estándar √(s₁²/n₁ + s₂²/n₂). 3. Divida la diferencia entre el error estándar y compare con la distribución t.',
      },
      fr: {
        name: 'Formule du Test t de Student',
        variables: [
          { symbol: 't', name: 'Statistique t', description: 'Rapport entre l’écart des moyennes et l’erreur standard' },
          { symbol: 'x̄₁, x̄₂', name: 'Moyennes des Groupes', description: 'Moyennes observées dans chaque échantillon' },
          { symbol: 's₁, s₂', name: 'Écarts-Types', description: 'Dispersion au sein de chaque groupe' },
          { symbol: 'n₁, n₂', name: 'Effectifs', description: 'Nombre d’observations par groupe' },
        ],
        stepByStep: '1. Calculez l’écart entre moyennes. 2. Calculez l’erreur standard √(s₁²/n₁ + s₂²/n₂). 3. Divisez l’écart par l’erreur standard et évaluez la valeur p.',
      },
      de: {
        name: 'Student-t-Test-Formel (Zweistichproben-Test)',
        variables: [
          { symbol: 't', name: 't-Prüfgröße', description: 'Verhältnis der Mittelwertdifferenz zum Standardfehler' },
          { symbol: 'x̄₁, x̄₂', name: 'Gruppenmittelwerte', description: 'Stichprobenmittel der verglichenen Gruppen' },
          { symbol: 's₁, s₂', name: 'Standardabweichungen', description: 'Streuung innerhalb der Stichproben' },
          { symbol: 'n₁, n₂', name: 'Stichprobengrößen', description: 'Beobachtungsanzahl je Gruppe' },
        ],
        stepByStep: '1. Mittelwertdifferenz berechnen. 2. Standardfehler √(s₁²/n₁ + s₂²/n₂) ermitteln. 3. Differenz durch Standardfehler teilen und anhand der t-Verteilung prüfen.',
      },
    },
  },

  // 15. P-Value
  {
    slugs: ['p-value-calculator'],
    name: 'Two-Tailed & One-Tailed P-Value Formula',
    formula: 'Two-Tailed p = 2 × [1 - Φ(|Z|)]  |  Reject H₀ if p < α (e.g. 0.05)',
    latex: 'p_{\\text{two-tailed}} = 2\\left(1 - \\Phi(|Z|)\\right)',
    variables: [
      { symbol: 'p', name: 'P-Value', description: 'Probability of observing a test statistic at least as extreme under H₀' },
      { symbol: 'Φ(|Z|)', name: 'Standard Normal CDF', description: 'Cumulative area under the standard normal curve up to |Z|' },
      { symbol: 'α', name: 'Significance Level', description: 'Pre-specified Type I error threshold (typically 0.05 or 0.01)' },
    ],
    stepByStep: '1. Compute your test statistic (Z, t, or χ²). 2. Find upper-tail area 1 - CDF(|stat|). 3. Double it for a two-tailed test and compare with α.',
    faq: {
      question: 'How is a two-tailed p-value calculated from a Z-score?',
      answer: 'A two-tailed p-value equals 2 × (1 - Φ(|Z|)). For example, |Z| = 1.96 yields p = 0.05, and |Z| = 2.576 yields p = 0.01.',
    },
    translations: {
      es: {
        name: 'Fórmula del Valor p (Prueba Bilateral y Unilateral)',
        variables: [
          { symbol: 'p', name: 'Valor p', description: 'Probabilidad de observar un resultado tan extremo bajo H₀' },
          { symbol: 'Φ(|Z|)', name: 'Función Acumulada Normal', description: 'Área acumulada bajo la curva normal hasta |Z|' },
          { symbol: 'α', name: 'Nivel de Significancia', description: 'Umbral de error tipo I (usualmente 0,05 o 0,01)' },
        ],
        stepByStep: '1. Calcule el estadístico de prueba (Z o t). 2. Determine el área de cola 1 - Φ(|Z|). 3. Duplique para contraste bilateral y compare con α.',
      },
      fr: {
        name: 'Formule de la Valeur p (p-value Bilatérale)',
        variables: [
          { symbol: 'p', name: 'Valeur p (p-value)', description: 'Probabilité d’observer un résultat au moins aussi extrême sous H₀' },
          { symbol: 'Φ(|Z|)', name: 'Fonction de Répartition Normale', description: 'Aire cumulée sous la courbe normale jusqu’à |Z|' },
          { symbol: 'α', name: 'Seuil de Significativité', description: 'Risque d’erreur de type I choisi (0,05 ou 0,01)' },
        ],
        stepByStep: '1. Calculez la statistique de test (Z ou t). 2. Calculez l’aire de queue 1 - Φ(|Z|). 3. Multipliez par 2 en bilatéral et comparez au seuil α.',
      },
      de: {
        name: 'p-Wert-Formel (Zweiseitiger Signifikanztest)',
        variables: [
          { symbol: 'p', name: 'p-Wert', description: 'Wahrscheinlichkeit für ein mindestens so extremes Ergebnis unter H₀' },
          { symbol: 'Φ(|Z|)', name: 'Standardnormal-Verteilungsfunktion', description: 'Kumulierte Fläche unter der Gaußkurve bis |Z|' },
          { symbol: 'α', name: 'Signifikanzniveau', description: 'Gewählte Irrtumswahrscheinlichkeit (z. B. 0,05 oder 0,01)' },
        ],
        stepByStep: '1. Prüfgröße (Z oder t) berechnen. 2. Obere Randfläche 1 - Φ(|Z|) bestimmen. 3. Für zweiseitigen Test verdoppeln und mit α vergleichen.',
      },
    },
  },

  // 16. Mean, Median, Mode
  {
    slugs: ['mean-calculator', 'median-calculator', 'mode-calculator'],
    name: 'Measures of Central Tendency (Mean, Median & Mode)',
    formula: 'Mean x̄ = (Σ xᵢ) / n  |  Median = middle sorted value  |  Mode = most frequent value',
    latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i',
    variables: [
      { symbol: 'x̄', name: 'Arithmetic Mean', description: 'Sum of all observations divided by count n' },
      { symbol: 'n', name: 'Sample Size', description: 'Total count of numeric values in the set' },
    ],
    stepByStep: '1. Sum all numbers and divide by n for the mean. 2. Sort values ascending and pick the center (or average of middle two) for median. 3. Identify the highest-frequency value for mode.',
    faq: {
      question: 'When should you use median instead of mean?',
      answer: 'Use the mean for symmetric datasets without extreme outliers, and use the median for skewed distributions (such as incomes or home prices) because outliers distort the mean.',
    },
    translations: {
      es: {
        name: 'Medidas de Tendencia Central (Media, Mediana y Moda)',
        variables: [
          { symbol: 'x̄', name: 'Media Aritmética', description: 'Suma de todos los valores dividida entre n' },
          { symbol: 'n', name: 'Cantidad de Datos', description: 'Número total de observaciones' },
        ],
        stepByStep: '1. Sume todos los datos y divida entre n (media). 2. Ordene los datos y seleccione el valor central (mediana). 3. Identifique el valor que más se repite (moda).',
      },
      fr: {
        name: 'Mesures de Tendance Centrale (Moyenne, Médiane et Mode)',
        variables: [
          { symbol: 'x̄', name: 'Moyenne Arithmétique', description: 'Somme de toutes les valeurs divisée par n' },
          { symbol: 'n', name: 'Effectif Total', description: 'Nombre de valeurs dans la série' },
        ],
        stepByStep: '1. Additionnez les valeurs et divisez par n (moyenne). 2. Triez la série et prenez la valeur centrale (médiane). 3. Repérez la valeur la plus fréquente (mode).',
      },
      de: {
        name: 'Lagemaße (Arithmetisches Mittel, Median & Modus)',
        variables: [
          { symbol: 'x̄', name: 'Arithmetischer Mittelwert', description: 'Summe aller Werte geteilt durch die Anzahl n' },
          { symbol: 'n', name: 'Anzahl der Werte', description: 'Gesamtanzahl der Datenpunkte' },
        ],
        stepByStep: '1. Alle Werte addieren und durch n teilen (Mittelwert). 2. Werte sortieren und den mittleren Wert bestimmen (Median). 3. Den häufigsten Wert ermitteln (Modus).',
      },
    },
  },

  // 17. Probability
  {
    slugs: ['probability-calculator'],
    name: 'Classical, Union & Independent Event Probability Formulas',
    formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)  |  Independent: P(A ∩ B) = P(A) × P(B)',
    latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\quad P(A \\cap B) = P(A) \\cdot P(B)',
    variables: [
      { symbol: 'P(A)', name: 'Probability of Event A', description: 'Likelihood of A occurring (0 to 1)' },
      { symbol: 'P(B)', name: 'Probability of Event B', description: 'Likelihood of B occurring (0 to 1)' },
      { symbol: 'P(A∩B)', name: 'Joint Probability', description: 'Likelihood that both A and B occur together' },
    ],
    stepByStep: '1. For independent events happening together (AND), multiply P(A) × P(B). 2. For at least one occurring (OR), add P(A) + P(B) and subtract their overlap P(A ∩ B).',
    faq: {
      question: 'How do you calculate the probability of two independent events?',
      answer: 'For independent events, the probability of both occurring is P(A and B) = P(A) × P(B), and the probability of at least one occurring is P(A or B) = P(A) + P(B) - P(A)×P(B).',
    },
    translations: {
      es: {
        name: 'Fórmulas de Probabilidad Conjunta, Unión e Independencia',
        variables: [
          { symbol: 'P(A)', name: 'Probabilidad de A', description: 'Probabilidad del suceso A (entre 0 y 1)' },
          { symbol: 'P(B)', name: 'Probabilidad de B', description: 'Probabilidad del suceso B (entre 0 y 1)' },
          { symbol: 'P(A∩B)', name: 'Probabilidad Conjunta', description: 'Probabilidad de que ocurran A y B simultáneamente' },
        ],
        stepByStep: '1. Para sucesos independientes simultáneos (Y): multiplique P(A) × P(B). 2. Para al menos uno (O): sume P(A) + P(B) y reste P(A ∩ B).',
      },
      fr: {
        name: 'Formules de Probabilité (Intersection, Union et Indépendance)',
        variables: [
          { symbol: 'P(A)', name: 'Probabilité de A', description: 'Probabilité de réalisation de A (0 à 1)' },
          { symbol: 'P(B)', name: 'Probabilité de B', description: 'Probabilité de réalisation de B (0 à 1)' },
          { symbol: 'P(A∩B)', name: 'Probabilité Conjointe', description: 'Probabilité que A et B se produisent ensemble' },
        ],
        stepByStep: '1. Pour deux événements indépendants (ET) : multipliez P(A) × P(B). 2. Pour la réunion (OU) : additionnez P(A) + P(B) puis retranchez P(A ∩ B).',
      },
      de: {
        name: 'Wahrscheinlichkeitsformeln (Und-, Oder- & Unabhängige Ereignisse)',
        variables: [
          { symbol: 'P(A)', name: 'Wahrscheinlichkeit von A', description: 'Eintrittswahrscheinlichkeit von A (0 bis 1)' },
          { symbol: 'P(B)', name: 'Wahrscheinlichkeit von B', description: 'Eintrittswahrscheinlichkeit von B (0 bis 1)' },
          { symbol: 'P(A∩B)', name: 'Gemeinsame Wahrscheinlichkeit', description: 'Wahrscheinlichkeit, dass A und B zugleich eintreten' },
        ],
        stepByStep: '1. Für unabhängige Ereignisse (UND): P(A) × P(B) multiplizieren. 2. Für mindestens ein Ereignis (ODER): P(A) + P(B) - P(A ∩ B) berechnen.',
      },
    },
  },

  // 18. Triangle Geometry
  {
    slugs: ['triangle-calculator'],
    name: 'Heron’s Area Formula & Law of Cosines',
    formula: 'Area = √[ s(s-a)(s-b)(s-c) ]  |  c² = a² + b² - 2ab cos(C)',
    latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad c^2 = a^2 + b^2 - 2ab\\cos(C)',
    variables: [
      { symbol: 'a, b, c', name: 'Triangle Side Lengths', description: 'Lengths of the three triangle edges' },
      { symbol: 's', name: 'Semi-Perimeter', description: 'Half the triangle perimeter: s = (a + b + c) / 2' },
      { symbol: 'C', name: 'Included Angle', description: 'Interior angle opposite side c' },
    ],
    stepByStep: '1. Compute semi-perimeter s = (a + b + c) / 2. 2. Substitute into Heron’s formula √[s(s-a)(s-b)(s-c)] for area. 3. Use Law of Cosines to solve unknown sides or interior angles.',
    faq: {
      question: 'How do you find the area of any triangle from its three sides?',
      answer: 'Use Heron’s formula: first calculate semi-perimeter s = (a + b + c)/2, then compute Area = √[s(s - a)(s - b)(s - c)].',
    },
    translations: {
      es: {
        name: 'Fórmula de Herón y Teorema del Coseno para Triángulos',
        variables: [
          { symbol: 'a, b, c', name: 'Lados del Triángulo', description: 'Longitudes de los tres lados' },
          { symbol: 's', name: 'Semiperímetro', description: 'Mitad del perímetro: s = (a + b + c) / 2' },
          { symbol: 'C', name: 'Ángulo Opuesto', description: 'Ángulo interior opuesto al lado c' },
        ],
        stepByStep: '1. Calcule el semiperímetro s = (a + b + c)/2. 2. Aplique Herón √[s(s-a)(s-b)(s-c)] para el área. 3. Use el teorema del coseno para ángulos o lados faltantes.',
      },
      fr: {
        name: 'Formule de Héron et Théorème d’Al-Kashi (Loi des Cosinus)',
        variables: [
          { symbol: 'a, b, c', name: 'Côtés du Triangle', description: 'Longueurs des trois côtés' },
          { symbol: 's', name: 'Demi-Périmètre', description: 'Moitié du périmètre : s = (a + b + c) / 2' },
          { symbol: 'C', name: 'Angle Opposé', description: 'Angle intérieur opposé au côté c' },
        ],
        stepByStep: '1. Calculez le demi-périmètre s = (a + b + c)/2. 2. Calculez l’aire via Héron √[s(s-a)(s-b)(s-c)]. 3. Utilisez Al-Kashi pour les angles ou côtés inconnus.',
      },
      de: {
        name: 'Heronsche Flächenformel & Kosinussatz im Dreieck',
        variables: [
          { symbol: 'a, b, c', name: 'Dreiecksseiten', description: 'Längen der drei Seiten des Dreiecks' },
          { symbol: 's', name: 'Halber Umfang', description: 's = (a + b + c) / 2' },
          { symbol: 'C', name: 'Gegenwinkel', description: 'Innenwinkel gegenüber der Seite c' },
        ],
        stepByStep: '1. Halben Umfang s = (a + b + c)/2 berechnen. 2. Mit Heron √[s(s-a)(s-b)(s-c)] die Fläche ermitteln. 3. Kosinussatz für fehlende Seiten oder Winkel nutzen.',
      },
    },
  },

  // 19. 3D Volume
  {
    slugs: ['volume-calculator'],
    name: '3D Geometric Volume Formulas',
    formula: 'Sphere = (4/3)πr³  |  Cylinder = πr²h  |  Cone = (1/3)πr²h  |  Box = l × w × h',
    latex: 'V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3, \\quad V_{\\text{cyl}} = \\pi r^2 h, \\quad V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h',
    variables: [
      { symbol: 'r', name: 'Radius', description: 'Distance from center to outer edge of circular base/sphere' },
      { symbol: 'h', name: 'Height', description: 'Perpendicular elevation of cylinder, cone, or prism' },
      { symbol: 'π', name: 'Pi Constant', description: 'Ratio of circumference to diameter (≈ 3.14159265)' },
    ],
    stepByStep: '1. Convert all dimensions to the same length unit. 2. Compute base area (πr² for circular solids) and multiply by height (or 4/3 πr³ for spheres).',
    faq: {
      question: 'What are the core 3D volume formulas for spheres, cylinders, and cones?',
      answer: 'Sphere: (4/3)πr³; Cylinder: πr²h; Cone: (1/3)πr²h; Rectangular Prism: l × w × h.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Volumen Geométrico 3D',
        variables: [
          { symbol: 'r', name: 'Radio', description: 'Distancia del centro al borde circular' },
          { symbol: 'h', name: 'Altura', description: 'Altura perpendicular del sólido' },
          { symbol: 'π', name: 'Constante Pi', description: 'Valor aproximado 3,14159265' },
        ],
        stepByStep: '1. Exprese todas las medidas en la misma unidad. 2. Calcule el área de la base y multiplique por la altura (o 4/3 πr³ para esferas).',
      },
      fr: {
        name: 'Formules de Volume Géométrique 3D',
        variables: [
          { symbol: 'r', name: 'Rayon', description: 'Rayon de la sphère ou de la base circulaire' },
          { symbol: 'h', name: 'Hauteur', description: 'Hauteur perpendiculaire du solide' },
          { symbol: 'π', name: 'Constante Pi', description: 'Valeur approchée 3,14159265' },
        ],
        stepByStep: '1. Convertissez toutes les dimensions dans la même unité. 2. Appliquez la formule du solide (cylindre πr²h, sphère 4/3 πr³, cône 1/3 πr²h).',
      },
      de: {
        name: 'Geometrische 3D-Volumenformeln',
        variables: [
          { symbol: 'r', name: 'Radius', description: 'Abstand vom Mittelpunkt zum Rand' },
          { symbol: 'h', name: 'Höhe', description: 'Senkrechte Höhe von Zylinder, Kegel oder Quader' },
          { symbol: 'π', name: 'Kreiszahl Pi', description: 'Konstante ≈ 3,14159265' },
        ],
        stepByStep: '1. Alle Maße in dieselbe Längeneinheit umrechnen. 2. Grundfläche mit Höhe multiplizieren (bzw. 4/3 πr³ für Kugeln).',
      },
    },
  },

  // 20. Half-Life Decay
  {
    slugs: ['half-life-calculator'],
    name: 'Exponential Half-Life Decay Formula',
    formula: 'N(t) = N₀ × (1/2)^(t / t_½) = N₀ × e^(-λt)',
    latex: 'N(t) = N_0 \\left(\\frac{1}{2}\\right)^{t / t_{1/2}} = N_0 e^{-\\lambda t}, \\quad \\lambda = \\frac{\\ln 2}{t_{1/2}}',
    variables: [
      { symbol: 'N(t)', name: 'Remaining Quantity', description: 'Undecayed isotope mass, activity, or drug concentration at time t' },
      { symbol: 'N₀', name: 'Initial Quantity', description: 'Starting quantity at t = 0' },
      { symbol: 't_½', name: 'Half-Life', description: 'Time required for exactly 50% of the substance to decay' },
      { symbol: 'λ', name: 'Decay Constant', description: 'Rate constant λ = ln(2) / t_½ ≈ 0.6931 / t_½' },
    ],
    stepByStep: '1. Divide elapsed time t by half-life t_½ to find the number of half-lives. 2. Raise 0.5 to that power. 3. Multiply by starting amount N₀.',
    faq: {
      question: 'What is the exponential half-life formula?',
      answer: 'Remaining quantity after time t is N(t) = N₀ × (0.5)^(t / t_½), equivalently N₀ × e^(-λt) where decay constant λ = ln(2) / t_½.',
    },
    translations: {
      es: {
        name: 'Fórmula de Desintegración Exponencial (Vida Media)',
        variables: [
          { symbol: 'N(t)', name: 'Cantidad Restante', description: 'Masa o concentración remanente en el tiempo t' },
          { symbol: 'N₀', name: 'Cantidad Inicial', description: 'Cantidad original en t = 0' },
          { symbol: 't_½', name: 'Periodo de Semidesintegración', description: 'Tiempo en reducirse exactamente al 50%' },
          { symbol: 'λ', name: 'Constante de Decaimiento', description: 'λ = ln(2) / t_½ ≈ 0,6931 / t_½' },
        ],
        stepByStep: '1. Divida el tiempo t entre la vida media t_½. 2. Eleve 0,5 a ese exponente. 3. Multiplique por la cantidad inicial N₀.',
      },
      fr: {
        name: 'Formule de Décroissance Exponentielle (Demi-Vie)',
        variables: [
          { symbol: 'N(t)', name: 'Quantité Restante', description: 'Masse, activité ou concentration à l’instant t' },
          { symbol: 'N₀', name: 'Quantité Initiale', description: 'Quantité de départ à t = 0' },
          { symbol: 't_½', name: 'Demi-Vie', description: 'Durée nécessaire pour réduire la quantité de moitié' },
          { symbol: 'λ', name: 'Constante de Décroissance', description: 'λ = ln(2) / t_½ ≈ 0,6931 / t_½' },
        ],
        stepByStep: '1. Divisez le temps écoulé t par la demi-vie t_½. 2. Élevez 0,5 à cette puissance. 3. Multipliez par N₀.',
      },
      de: {
        name: 'Exponentielle Halbwertszeit- & Zerfallsformel',
        variables: [
          { symbol: 'N(t)', name: 'Restmenge', description: 'Verbleibende Stoffmenge oder Aktivität zum Zeitpunkt t' },
          { symbol: 'N₀', name: 'Anfangsmenge', description: 'Ausgangsmenge bei t = 0' },
          { symbol: 't_½', name: 'Halbwertszeit', description: 'Zeitspanne bis genau 50 % zerfallen sind' },
          { symbol: 'λ', name: 'Zerfallskonstante', description: 'λ = ln(2) / t_½ ≈ 0,6931 / t_½' },
        ],
        stepByStep: '1. Verstrichene Zeit t durch Halbwertszeit t_½ teilen. 2. 0,5 mit diesem Verhältnis potenzieren. 3. Mit der Ausgangsmenge N₀ multiplizieren.',
      },
    },
  },

  // 21. Fractions, Scientific Notation & Binary
  {
    slugs: [
      'fraction-calculator', 'scientific-notation-calculator',
      'binary-calculator', 'scientific-calculator', 'graphing-calculator',
    ],
    name: 'Fraction Arithmetic, Scientific Notation & Base-2 Binary Formulas',
    formula: 'a/b + c/d = (ad + bc)/(bd)  |  x = m × 10^n  |  N₁₀ = Σ bᵢ × 2^i',
    latex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}, \\quad x = m \\times 10^n \\; (1 \\le |m| < 10)',
    variables: [
      { symbol: 'a/b, c/d', name: 'Rational Fractions', description: 'Numerator/denominator pairs reduced by GCD' },
      { symbol: 'm × 10^n', name: 'Scientific Notation', description: 'Significand m (1 ≤ |m| < 10) times power of 10' },
      { symbol: 'bᵢ · 2^i', name: 'Binary Positional Sum', description: 'Each bit bᵢ ∈ {0, 1} weighted by powers of 2' },
    ],
    stepByStep: '1. For fractions: cross-multiply over common denominator bd and divide by GCD. 2. For scientific notation: normalize mantissa between 1 and 10. 3. For binary: sum bit × 2^position.',
    faq: {
      question: 'How do you add fractions and simplify the result?',
      answer: 'Use (a/b) + (c/d) = (ad + bc) / (bd), then divide both numerator and denominator by their Greatest Common Divisor (GCD) to express the fraction in lowest terms.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Fracciones, Notación Científica y Sistema Binario',
        variables: [
          { symbol: 'a/b, c/d', name: 'Fracciones Racionales', description: 'Numerador y denominador simplificados con el MCD' },
          { symbol: 'm × 10^n', name: 'Notación Científica', description: 'Mantisa 1 ≤ |m| < 10 multiplicada por potencia de 10' },
          { symbol: 'bᵢ · 2^i', name: 'Suma Posicional Binaria', description: 'Cada bit (0 o 1) ponderado por potencias de 2' },
        ],
        stepByStep: '1. En fracciones: aplique (ad + bc)/(bd) y reduzca dividiendo por el MCD. 2. En notación científica: ajuste la mantisa entre 1 y 10. 3. En binario: sume cada bit × 2^i.',
      },
      fr: {
        name: 'Formules de Fractions, Notation Scientifique et Binaire',
        variables: [
          { symbol: 'a/b, c/d', name: 'Fractions Rationnelles', description: 'Fractions réduites à l’aide du PGCD' },
          { symbol: 'm × 10^n', name: 'Notation Scientifique', description: 'Mantisse 1 ≤ |m| < 10 multipliée par une puissance de 10' },
          { symbol: 'bᵢ · 2^i', name: 'Développement Binaire', description: 'Chaque bit (0 ou 1) pondéré par les puissances de 2' },
        ],
        stepByStep: '1. Pour les fractions : (ad + bc)/(bd) puis simplifiez par le PGCD. 2. En notation scientifique : normalisez m entre 1 et 10. 3. En binaire : sommez chaque bit × 2^i.',
      },
      de: {
        name: 'Bruchrechnung, Wissenschaftliche Notation & Binärsystem',
        variables: [
          { symbol: 'a/b, c/d', name: 'Brüche', description: 'Zähler/Nenner-Paare, gekürzt durch den ggT' },
          { symbol: 'm × 10^n', name: 'Wissenschaftliche Schreibweise', description: 'Mantisse 1 ≤ |m| < 10 mal Zehnerpotenz' },
          { symbol: 'bᵢ · 2^i', name: 'Binäre Stellenwertsumme', description: 'Jedes Bit (0 oder 1) gewichtet mit Zweierpotenzen' },
        ],
        stepByStep: '1. Brüche per (ad + bc)/(bd) addieren und durch ggT kürzen. 2. Bei Zehnerpotenzen Mantisse zwischen 1 und 10 normieren. 3. Binärzahl als Summe der Bits × 2^i auswerten.',
      },
    },
  },

  // 22. Concrete Volume
  {
    slugs: ['concrete-calculator'],
    name: 'Concrete Slab Volume & Premix Bag Yield Formula',
    formula: 'Volume (yd³) = (L × W × T) / 27  |  Volume (m³) = L_m × W_m × T_m  |  Bags = V × 1.10 / Yield',
    latex: 'V_{\\text{yd}^3} = \\frac{L \\cdot W \\cdot T}{27}, \\quad V_{\\text{m}^3} = L_m \\cdot W_m \\cdot T_m',
    variables: [
      { symbol: 'L, W, T', name: 'Length, Width, Thickness', description: 'Slab dimensions converted into feet (or meters)' },
      { symbol: '27', name: 'Cubic Feet per Cubic Yard', description: 'Exact conversion factor (3³ = 27 ft³/yd³)' },
      { symbol: '1.10', name: '10% Waste Factor', description: 'Standard engineering overage for spillage and uneven subgrade' },
    ],
    stepByStep: '1. Convert thickness to feet (inches / 12) or meters (cm / 100). 2. Multiply L × W × T (divide by 27 for cubic yards). 3. Add 10% waste and divide by bag yield (0.60 ft³ per 80 lb bag or ~0.013 m³ per 25 kg bag).',
    faq: {
      question: 'How many 80-lb bags of concrete are in one cubic yard?',
      answer: 'One cubic yard equals 27 cubic feet. Since an 80-lb premix concrete bag yields 0.60 cubic feet, 1 cubic yard requires exactly 45 bags (or ~50 bags with 10% waste).',
    },
    translations: {
      es: {
        name: 'Fórmula de Volumen de Hormigón y Sacos Necesarios',
        variables: [
          { symbol: 'L, W, T', name: 'Largo, Ancho y Espesor', description: 'Dimensiones de la losa convertidas a metros' },
          { symbol: 'V_m³', name: 'Volumen en m³', description: 'Metros cúbicos netos de hormigón' },
          { symbol: '1,10', name: 'Margen de Desperdicio (10%)', description: 'Factor estándar por irregularidades y mermas' },
        ],
        stepByStep: '1. Convierta el espesor a metros (cm / 100). 2. Multiplique Largo × Ancho × Espesor para obtener m³. 3. Multiplique por 1,10 y divida por el rendimiento de cada saco (≈0,013 m³ por saco de 25 kg).',
      },
      fr: {
        name: 'Formule de Volume de Béton et Nombre de Sacs',
        variables: [
          { symbol: 'L, W, T', name: 'Longueur, Largeur, Épaisseur', description: 'Dimensions de la dalle converties en mètres' },
          { symbol: 'V_m³', name: 'Volume en m³', description: 'Mètres cubes nets de béton requis' },
          { symbol: '1,10', name: 'Marge de Sécurité (10 %)', description: 'Majoration standard pour pertes et fond de forme' },
        ],
        stepByStep: '1. Convertissez l’épaisseur en mètres (cm / 100). 2. Multipliez L × l × e pour obtenir les m³. 3. Ajoutez 10 % de marge et divisez par le rendement par sac (≈0,013 m³ pour 25 kg).',
      },
      de: {
        name: 'Betonvolumen- & Sackbedarf-Formel (m³)',
        variables: [
          { symbol: 'L, W, T', name: 'Länge, Breite, Stärke', description: 'Abmessungen der Bodenplatte in Metern' },
          { symbol: 'V_m³', name: 'Betonvolumen (m³)', description: 'Netto-Kubikmeter Fertigbeton' },
          { symbol: '1,10', name: '10 % Sicherheitszuschlag', description: 'Üblicher Verschnitt- und Unebenheitszuschlag' },
        ],
        stepByStep: '1. Stärke in Meter umrechnen (cm / 100). 2. Länge × Breite × Stärke multiplizieren (m³). 3. Mit 1,10 multiplizieren und durch Ergiebigkeit pro Sack teilen (ca. 0,013 m³ je 25-kg-Sack).',
      },
    },
  },

  // 23. IPv4 CIDR Subnet
  {
    slugs: ['subnet-calculator', 'ip-subnet-calculator'],
    name: 'IPv4 CIDR Subnet & Usable Host Formula',
    formula: 'Total Addresses = 2^(32 - prefix)  |  Usable Hosts = 2^(32 - prefix) - 2',
    latex: 'N_{\\text{total}} = 2^{32 - p}, \\quad N_{\\text{hosts}} = 2^{32 - p} - 2 \\; (p \\le 30)',
    variables: [
      { symbol: 'p', name: 'CIDR Prefix Length', description: 'Number of leading network bits (e.g. /24 = 255.255.255.0)' },
      { symbol: '32 - p', name: 'Host Bits', description: 'Remaining bits available for host addressing inside the subnet' },
      { symbol: '-2', name: 'Reserved Addresses', description: 'Excludes the Network ID address and Broadcast address' },
    ],
    stepByStep: '1. Subtract CIDR prefix p from 32 to get host bits. 2. Compute 2^(32-p) for total IPs. 3. Subtract 2 (network & broadcast) for usable host capacity (point-to-point /31 uses RFC 3021).',
    faq: {
      question: 'How many usable IP addresses are in a /24 subnet?',
      answer: 'A /24 subnet has 32 - 24 = 8 host bits, giving 2⁸ = 256 total IPv4 addresses and 256 - 2 = 254 usable host addresses.',
    },
    translations: {
      es: {
        name: 'Fórmula de Subredes IPv4 CIDR y Hosts Utilizables',
        variables: [
          { symbol: 'p', name: 'Prefijo CIDR', description: 'Número de bits de red (ej. /24 = 255.255.255.0)' },
          { symbol: '32 - p', name: 'Bits de Host', description: 'Bits restantes para asignar dispositivos' },
          { symbol: '-2', name: 'Direcciones Reservadas', description: 'Descuenta la dirección de red y la de broadcast' },
        ],
        stepByStep: '1. Reste el prefijo p de 32. 2. Calcule 2^(32-p) para direcciones totales. 3. Reste 2 (red y broadcast) para obtener los hosts utilizables.',
      },
      fr: {
        name: 'Formule de Sous-Réseau IPv4 CIDR et Hôtes Utilisables',
        variables: [
          { symbol: 'p', name: 'Préfixe CIDR', description: 'Nombre de bits réseau (ex. /24 = 255.255.255.0)' },
          { symbol: '32 - p', name: 'Bits Hôtes', description: 'Bits disponibles pour adresser les machines' },
          { symbol: '-2', name: 'Adresses Réservées', description: 'Exclut l’adresse réseau et l’adresse de diffusion' },
        ],
        stepByStep: '1. Soustrayez le préfixe p de 32. 2. Calculez 2^(32-p) pour le total d’adresses. 3. Retranchez 2 (réseau et broadcast) pour les hôtes utilisables.',
      },
      de: {
        name: 'IPv4-CIDR-Subnetz- & Nutzbare-Hosts-Formel',
        variables: [
          { symbol: 'p', name: 'CIDR-Präfixlänge', description: 'Anzahl der Netz-Bits (z. B. /24 = 255.255.255.0)' },
          { symbol: '32 - p', name: 'Host-Bits', description: 'Verbleibende Bits für Endgeräte im Subnetz' },
          { symbol: '-2', name: 'Reservierte Adressen', description: 'Abzug für Netz-ID und Broadcast-Adresse' },
        ],
        stepByStep: '1. Präfix p von 32 abziehen (Host-Bits). 2. 2^(32-p) ergibt alle IP-Adressen. 3. 2 abziehen (Netz- und Broadcast-Adresse) für nutzbare Hosts.',
      },
    },
  },

  // 24. Weighted GPA & Grade
  {
    slugs: ['gpa-calculator', 'grade-calculator'],
    name: 'Credit-Weighted GPA & Course Grade Formula',
    formula: 'GPA = Σ (Grade Pointsᵢ × Creditsᵢ) / Σ Creditsᵢ',
    latex: '\\text{GPA} = \\frac{\\sum_{i=1}^{k} (g_i \\cdot c_i)}{\\sum_{i=1}^{k} c_i}',
    variables: [
      { symbol: 'gᵢ', name: 'Course Grade Point', description: 'Numeric equivalent on 4.0 scale (A = 4.0, B = 3.0, C = 2.0)' },
      { symbol: 'cᵢ', name: 'Course Credit Hours', description: 'Credit weight or ECTS units assigned to course i' },
    ],
    stepByStep: '1. Multiply each course’s grade point by its credit hours to get quality points. 2. Sum all quality points. 3. Divide by total attempted credit hours.',
    faq: {
      question: 'How is cumulative GPA calculated across different credit hours?',
      answer: 'Multiply every course’s grade point value by its credit hours, sum those quality points, and divide by total credit hours: GPA = Σ(gᵢ × cᵢ) / Σcᵢ.',
    },
    translations: {
      es: {
        name: 'Fórmula de Promedio Ponderado (GPA y Calificación Final)',
        variables: [
          { symbol: 'gᵢ', name: 'Calificación / Puntos', description: 'Nota numérica del curso (escala 4.0 o 0–10)' },
          { symbol: 'cᵢ', name: 'Créditos o Peso', description: 'Créditos académicos o ponderación de la asignatura' },
        ],
        stepByStep: '1. Multiplique cada nota por sus créditos. 2. Sume todos los puntos ponderados. 3. Divida entre la suma total de créditos.',
      },
      fr: {
        name: 'Formule de Moyenne Pondérée (GPA / Crédits ECTS)',
        variables: [
          { symbol: 'gᵢ', name: 'Note du Cours', description: 'Note obtenue (échelle GPA 4,0 ou sur 20)' },
          { symbol: 'cᵢ', name: 'Coefficient / ECTS', description: 'Nombre de crédits ou coefficient de la matière' },
        ],
        stepByStep: '1. Multipliez chaque note par son coefficient ou ses crédits ECTS. 2. Additionnez les produits. 3. Divisez par la somme totale des coefficients.',
      },
      de: {
        name: 'Gewichtete Notendurchschnitts- & GPA-Formel (ECTS)',
        variables: [
          { symbol: 'gᵢ', name: 'Modulnote / Grade Points', description: 'Erzielte Note bzw. Punkte auf der 4,0-GPA-Skala' },
          { symbol: 'cᵢ', name: 'Credit Points (ECTS)', description: 'Leistungspunkte bzw. Gewichtung des Moduls' },
        ],
        stepByStep: '1. Jede Note mit ihren Credit Points multiplizieren. 2. Alle gewichteten Produkte summieren. 3. Durch die Gesamtzahl der Credit Points teilen.',
      },
    },
  },
];
