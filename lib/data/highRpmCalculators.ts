import type { CalculatorDef } from '../types';

/**
 * 12 High-RPM Finance, EU Payroll (Brutto-Netto / Salaire Brut Net / Salario Neto)
 * & Fitness Calculators (48 localized pages across en/es/fr/de).
 */
export const highRpmCalculators: CalculatorDef[] = [
  {
    slug: 'roi-calculator',
    slugs: { en: 'roi-calculator', es: 'calculadora-de-roi', fr: 'calculateur-de-roi', de: 'roi-rechner' },
    title: 'ROI Calculator (Return on Investment)',
    category: 'Financial',
    description: 'Calculate total Return on Investment (ROI %), net profit, and annualized return (CAGR) for business investments, marketing, stocks, and real estate.',
    meta: {
      title: 'ROI Calculator – Return on Investment & Annualized ROI (2026)',
      description: 'Free ROI calculator to compute net gain, total Return on Investment percentage, and annualized CAGR across any holding period.',
      keywords: 'roi calculator, return on investment calculator, annualized roi, investment profit calculator',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de ROI (Retorno de Inversión)',
        description: 'Calcula el Retorno de Inversión (ROI %), la ganancia neta y el rendimiento anualizado para negocios, marketing, acciones e inmuebles.',
        meta: { title: 'Calculadora de ROI – Retorno de Inversión y Rentabilidad Anual', description: 'Calcula el ROI porcentual, beneficio neto y retorno anualizado en segundos con fórmula paso a paso.', keywords: 'calculadora roi, retorno de inversion, rentabilidad inversion' },
      },
      fr: {
        title: 'Calculateur de ROI (Retour sur Investissement)',
        description: 'Calculez le retour sur investissement (ROI %), le gain net et le rendement annualisé pour projets d’entreprise, bourse et immobilier.',
        meta: { title: 'Calculateur de ROI – Retour sur Investissement & Taux Annualisé', description: 'Évaluez gratuitement votre ROI, profit net et rendement annuel moyen sur n’importe quelle durée.', keywords: 'calculateur roi, retour sur investissement, rentabilite projet' },
      },
      de: {
        title: 'ROI-Rechner (Return on Investment)',
        description: 'Berechnen Sie Return on Investment (ROI %), Nettogewinn und jährliche Rendite (p. a.) für Unternehmensprojekte, Marketing, Aktien und Immobilien.',
        meta: { title: 'ROI-Rechner 2026 – Return on Investment & Jahresrendite berechnen', description: 'Kostenloser ROI-Rechner für Gesamtrendite, Nettogewinn und annualisierte Kapitalrendite inkl. Formel & Beispielen.', keywords: 'roi rechner, return on investment berechnen, kapitalrendite rechner' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'cagr-calculator',
    slugs: { en: 'cagr-calculator', es: 'calculadora-de-cagr', fr: 'calculateur-de-cagr', de: 'cagr-rechner' },
    title: 'CAGR Calculator (Compound Annual Growth Rate)',
    category: 'Financial',
    description: 'Calculate the Compound Annual Growth Rate (CAGR) of investments, company revenue, or stock portfolios over multi-year periods.',
    meta: {
      title: 'CAGR Calculator – Compound Annual Growth Rate Formula & Tool',
      description: 'Compute exact Compound Annual Growth Rate (CAGR), total percentage growth, and absolute dollar gain across any multi-year horizon.',
      keywords: 'cagr calculator, compound annual growth rate, annualized return calculator, revenue growth rate',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de CAGR (Tasa de Crecimiento Anual Compuesto)',
        description: 'Calcula la Tasa de Crecimiento Anual Compuesto (CAGR) de inversiones, ingresos empresariales o carteras bursátiles a varios años.',
        meta: { title: 'Calculadora de CAGR – Tasa de Crecimiento Anual Compuesto', description: 'Obtén la tasa CAGR exacta, crecimiento acumulado y ganancia neta de tus inversiones o ventas.', keywords: 'calculadora cagr, tasa crecimiento anual compuesto, rendimiento compuesto' },
      },
      fr: {
        title: 'Calculateur de TCAC / CAGR (Taux de Croissance Annuel Composé)',
        description: 'Calculez le Taux de Croissance Annuel Composé (TCAC / CAGR) de vos placements, chiffre d’affaires ou portefeuilles sur plusieurs années.',
        meta: { title: 'Calculateur de TCAC / CAGR – Taux de Croissance Annuel Composé', description: 'Calculez instantanément le TCAC (CAGR), la croissance totale et la plus-value sur plusieurs années.', keywords: 'calculateur cagr, calculateur tcac, taux de croissance annuel compose' },
      },
      de: {
        title: 'CAGR-Rechner (Durchschnittliche jährliche Wachstumsrate)',
        description: 'Berechnen Sie die durchschnittliche jährliche Wachstumsrate (CAGR) für Aktienportfolios, Unternehmensumsätze und mehrjährige Kapitalanlagen.',
        meta: { title: 'CAGR-Rechner – Jährliche Wachstumsrate exakt berechnen', description: 'Berechnen Sie die Compound Annual Growth Rate (CAGR), Gesamtwachstum und absoluten Gewinn für beliebige Laufzeiten.', keywords: 'cagr rechner, jaehrliche wachstumsrate berechnen, durchschnittliche rendite' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'net-worth-calculator',
    slugs: { en: 'net-worth-calculator', es: 'calculadora-de-patrimonio-neto', fr: 'calculateur-de-patrimoine-net', de: 'nettovermoegen-rechner' },
    title: 'Net Worth Calculator',
    category: 'Financial',
    description: 'Calculate your total personal net worth by subtracting mortgages, loans, and credit card debt from cash, investments, retirement, and property assets.',
    meta: {
      title: 'Net Worth Calculator – Track Assets, Liabilities & Debt-to-Asset Ratio',
      description: 'Free private Net Worth Calculator running 100% locally in your browser. Tally cash, investments, real estate, and debt with zero data upload.',
      keywords: 'net worth calculator, personal net worth, assets minus liabilities, wealth tracker',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de Patrimonio Neto',
        description: 'Calcula tu patrimonio neto personal restando hipotecas, préstamos y deudas de tus ahorros, inversiones, jubilación e inmuebles.',
        meta: { title: 'Calculadora de Patrimonio Neto – Activos, Pasivos y Ratio de Deuda', description: 'Calcula tu patrimonio neto de forma 100 % privada en tu navegador sin enviar datos a servidores.', keywords: 'calculadora patrimonio neto, activos y pasivos, riqueza neta' },
      },
      fr: {
        title: 'Calculateur de Patrimoine Net',
        description: 'Évaluez votre patrimoine net personnel en déduisant crédits immobiliers et dettes de vos liquidités, placements et biens immobiliers.',
        meta: { title: 'Calculateur de Patrimoine Net – Actifs, Dettes & Taux d’Endettement', description: 'Calculez votre patrimoine net en toute confidentialité localement dans votre navigateur.', keywords: 'calculateur patrimoine net, calcul actif passif, bilan patrimonial' },
      },
      de: {
        title: 'Nettovermögen-Rechner',
        description: 'Berechnen Sie Ihr persönliches Nettovermögen anonym im Browser: Guthaben, Depot & Immobilien abzüglich Baufinanzierung und Krediten.',
        meta: { title: 'Nettovermögen-Rechner – Vermögensbilanz & Verschuldungsgrad', description: 'Ermitteln Sie Ihr Nettovermögen 100 % lokal und privat im Browser inkl. Vermögens-Schulden-Quote.', keywords: 'nettovermoegen rechner, vermoegensbilanz berechnen, eigenkapital privat' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'break-even-calculator',
    slugs: { en: 'break-even-calculator', es: 'calculadora-de-punto-de-equilibrio', fr: 'calculateur-de-seuil-de-rentabilite', de: 'break-even-rechner' },
    title: 'Break-Even Point Calculator',
    category: 'Financial',
    description: 'Calculate break-even sales volume in units and revenue, contribution margin per unit, and unit sales needed to hit a target profit.',
    meta: {
      title: 'Break-Even Calculator – Break-Even Units, Revenue & Contribution Margin',
      description: 'Free business Break-Even Point Calculator. Enter fixed costs, selling price, and variable cost per unit to find exact break-even sales.',
      keywords: 'break even calculator, break even point formula, contribution margin calculator, business profitability',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de Punto de Equilibrio (Break-Even)',
        description: 'Calcula las unidades y ventas necesarias para cubrir costos fijos y variables, margen de contribución y meta de utilidad.',
        meta: { title: 'Calculadora de Punto de Equilibrio – Unidades, Ventas y Margen', description: 'Calcula tu punto de equilibrio empresarial con costos fijos, precio unitario y costo variable.', keywords: 'calculadora punto de equilibrio, break even, margen contribucion' },
      },
      fr: {
        title: 'Calculateur de Seuil de Rentabilité (Point Mort)',
        description: 'Calculez le seuil de rentabilité en unités et en chiffre d’affaires, la marge sur coût variable et le volume requis pour votre objectif de bénéfice.',
        meta: { title: 'Calculateur de Seuil de Rentabilité – Point Mort & Marge Unitaire', description: 'Déterminez votre seuil de rentabilité exact à partir des charges fixes, prix de vente et coût variable unitaire.', keywords: 'seuil de rentabilite calcul, point mort entreprise, marge cout variable' },
      },
      de: {
        title: 'Break-Even-Point-Rechner (Gewinnschwelle)',
        description: 'Berechnen Sie Gewinnschwelle (Break-Even-Menge & Umsatz), Stückdeckungsbeitrag und Absatzmenge für Ihren Zielgewinn.',
        meta: { title: 'Break-Even-Rechner – Gewinnschwelle & Deckungsbeitrag berechnen', description: 'Berechnen Sie Break-Even-Menge, Break-Even-Umsatz und Deckungsbeitrag für Produkte, Shops & Startups.', keywords: 'break even rechner, gewinnschwelle berechnen, deckungsbeitrag rechner' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'mortgage-refinance-calculator',
    slugs: { en: 'mortgage-refinance-calculator', es: 'calculadora-de-refinanciamiento-hipotecario', fr: 'calculateur-de-rachat-de-credit-immobilier', de: 'hypothek-umschulden-rechner' },
    title: 'Mortgage Refinance Calculator',
    category: 'Financial',
    description: 'Compare your existing mortgage against a refinance offer to calculate monthly payment savings, closing-cost break-even month, and net lifetime interest saved.',
    meta: {
      title: 'Mortgage Refinance Calculator – Monthly Savings & Break-Even Month',
      description: 'Should you refinance your home loan? Compare old vs new APR, closing costs, break-even timeline, and lifetime interest savings.',
      keywords: 'mortgage refinance calculator, refinance break even calculator, home loan refinance savings',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de Refinanciamiento Hipotecario',
        description: 'Compara tu hipoteca actual con una nueva oferta para calcular ahorro mensual, mes de punto de equilibrio y ahorro neto en intereses.',
        meta: { title: 'Calculadora de Refinanciamiento Hipotecario – Ahorro y Punto de Equilibrio', description: 'Evalúa si conviene refinanciar tu hipoteca comparando cuotas, gastos de cierre y ahorro total.', keywords: 'calculadora refinanciamiento hipoteca, refinanciar hipoteca ahorro' },
      },
      fr: {
        title: 'Calculateur de Rachat de Crédit Immobilier',
        description: 'Comparez votre prêt immobilier actuel avec une renégociation : économie mensuelle, amortissement des frais (IRA) et gain net total.',
        meta: { title: 'Calculateur de Rachat de Crédit Immobilier – Gain Net & Seuil', description: 'Simulez votre rachat ou renégociation de prêt immobilier avec frais de dossier et indemnités.', keywords: 'rachat credit immobilier simulateur, renegociation pret immobilier' },
      },
      de: {
        title: 'Baufinanzierung Umschuldungsrechner',
        description: 'Vergleichen Sie Ihre laufende Immobilienfinanzierung mit einer Umschuldung / Anschlussfinanzierung: Monatsersparnis, Notarkosten-Amortisation und Zinsvorteil.',
        meta: { title: 'Umschuldungsrechner Baufinanzierung – Zinsersparnis & Break-Even', description: 'Berechnen Sie, ob sich eine Umschuldung oder Anschlussfinanzierung nach Kosten wirklich lohnt.', keywords: 'umschuldungsrechner baufinanzierung, anschlussfinanzierung rechner, hypothek umschulden' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'cap-rate-calculator',
    slugs: { en: 'cap-rate-calculator', es: 'calculadora-de-cap-rate', fr: 'calculateur-de-taux-de-capitalisation', de: 'mietrendite-rechner' },
    title: 'Cap Rate Calculator (Real Estate)',
    category: 'Financial',
    description: 'Calculate real estate Capitalization Rate (Cap Rate %), Net Operating Income (NOI), effective gross rent, and Gross Rent Multiplier (GRM).',
    meta: {
      title: 'Cap Rate Calculator – Real Estate NOI & Rental Yield Analyzer',
      description: 'Analyze investment properties with our free Cap Rate Calculator. Compute NOI, vacancy-adjusted rent, Cap Rate %, and Gross Rent Multiplier.',
      keywords: 'cap rate calculator, real estate capitalization rate, noi calculator, rental yield calculator',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de Cap Rate (Tasa de Capitalización Inmobiliaria)',
        description: 'Calcula la Tasa de Capitalización (Cap Rate %), el Ingreso Operativo Neto (NOI) y el multiplicador de renta de propiedades de inversión.',
        meta: { title: 'Calculadora de Cap Rate – Rentabilidad Inmobiliaria y NOI', description: 'Evalúa propiedades de alquiler calculando NOI, vacancia, Cap Rate % y retorno bruto.', keywords: 'calculadora cap rate, tasa capitalizacion inmobiliaria, rentabilidad alquiler' },
      },
      fr: {
        title: 'Calculateur de Rendement Locatif / Cap Rate',
        description: 'Calculez le taux de capitalisation (Cap Rate %), le revenu net d’exploitation (NOI) et le ratio prix/loyers de votre investissement locatif.',
        meta: { title: 'Calculateur de Taux de Capitalisation (Cap Rate) & Rendement Locatif', description: 'Évaluez la rentabilité nette d’un bien immobilier locatif en intégrant vacance et charges.', keywords: 'calculateur cap rate, rendement locatif net, taux capitalisation immobilier' },
      },
      de: {
        title: 'Mietrendite-Rechner (Cap Rate & Kaufpreisfaktor)',
        description: 'Berechnen Sie Netto-Mietrendite (Cap Rate %), jährlichen Reinertrag (NOI), Mietausfallwagnis und Kaufpreisfaktor für Anlageimmobilien.',
        meta: { title: 'Mietrendite-Rechner 2026 – Netto-Mietrendite (Cap Rate) & Faktor', description: 'Prüfen Sie Immobilien-Investments exakt mit Netto-Mietrendite, Reinertrag und Kaufpreisfaktor.', keywords: 'mietrendite rechner, netto mietrendite berechnen, cap rate immobilien, kaufpreisfaktor' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'take-home-pay-calculator',
    slugs: { en: 'take-home-pay-calculator', es: 'calculadora-de-salario-neto', fr: 'calculateur-salaire-brut-net', de: 'brutto-netto-rechner' },
    title: 'Take-Home Pay Calculator (Gross to Net Salary)',
    category: 'Financial',
    description: 'Estimate monthly and annual net take-home pay from gross salary across US Federal, German Steuerklasse (Brutto-Netto), French Cadre/Non-Cadre, and Spanish IRPF models.',
    meta: {
      title: 'Take-Home Pay Calculator 2026 – Gross to Net Salary (US, DE, FR, ES)',
      description: 'Calculate net monthly take-home pay, income taxes, social security deductions, and retirement contributions with US & EU payroll models.',
      keywords: 'take home pay calculator, gross to net salary, paycheck calculator 2026, brutto netto rechner, salaire brut net',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de Salario Neto (Bruto a Neto 2026)',
        description: 'Estima tu salario neto mensual y anual a partir del bruto incluyendo retenciones de IRPF, Seguridad Social y modelos fiscales de España, EE. UU., Alemania y Francia.',
        meta: { title: 'Calculadora de Salario Neto 2026 – Sueldo Bruto a Neto (IRPF)', description: 'Calcula cuánto cobrarás neto al mes tras IRPF y Seguridad Social con desglose completo.', keywords: 'calculadora salario neto, sueldo bruto a neto, irpf 2026, nomina neta' },
      },
      fr: {
        title: 'Calculateur Salaire Brut en Net (2026)',
        description: 'Convertissez votre salaire brut annuel en net mensuel après cotisations sociales (Cadre / Non-Cadre) et impôt sur le revenu.',
        meta: { title: 'Calculateur Salaire Brut en Net 2026 – Cadre, Non-Cadre & Impôt', description: 'Estimez immédiatement votre salaire net mensuel et annuel en France (Cadre/Non-Cadre) et à l’international.', keywords: 'calculateur salaire brut net, salaire brut en net 2026, calcul salaire cadre' },
      },
      de: {
        title: 'Brutto-Netto-Rechner 2026 (Gehaltsrechner)',
        description: 'Berechnen Sie Ihr voraussichtliches monatliches und jährliches Nettogehalt aus dem Brutto inkl. Steuerklasse (I/IV, III), Lohnsteuer, Sozialabgaben und bAV.',
        meta: { title: 'Brutto-Netto-Rechner 2026 – Nettogehalt & Abzüge berechnen', description: 'Schneller Brutto-Netto-Gehaltsrechner für Lohnsteuer, Sozialversicherung und monatliches Netto.', keywords: 'brutto netto rechner, gehaltsrechner 2026, nettogehalt berechnen, lohnsteuer rechner' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'overtime-pay-calculator',
    slugs: { en: 'overtime-pay-calculator', es: 'calculadora-de-horas-extras', fr: 'calculateur-heures-supplementaires', de: 'ueberstunden-rechner' },
    title: 'Overtime Pay Calculator',
    category: 'Financial',
    description: 'Calculate weekly gross wages combining regular hours and overtime pay (1.25×, 1.5× time-and-a-half, or 2× double-time) plus blended hourly rate.',
    meta: {
      title: 'Overtime Pay Calculator – Time-and-a-Half (1.5×) & Double Time',
      description: 'Calculate overtime pay, regular pay, total weekly paycheck, and effective blended hourly wage with customizable overtime multipliers.',
      keywords: 'overtime pay calculator, time and a half calculator, double time pay, hourly overtime wages',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de Horas Extras',
        description: 'Calcula tu pago semanal sumando horas regulares y horas extras con recargo personalizable (1,25×, 1,5× o 2×) más tarifa efectiva.',
        meta: { title: 'Calculadora de Horas Extras – Pago Semanal y Recargos (1,5× / 2×)', description: 'Calcula exactamente cuánto debes cobrar por horas extraordinarias y tu salario bruto semanal.', keywords: 'calculadora horas extras, pago horas extraordinarias, recargo 1.5x' },
      },
      fr: {
        title: 'Calculateur d’Heures Supplémentaires',
        description: 'Calculez votre rémunération hebdomadaire brute incluant heures normales, heures supplémentaires majorées (+25 %, +50 %, +100 %) et taux horaire moyen.',
        meta: { title: 'Calculateur d’Heures Supplémentaires – Majorations 25 % & 50 %', description: 'Estimez le montant brut de vos heures supplémentaires majorées et votre salaire hebdomadaire.', keywords: 'calculateur heures supplementaires, majoration heures sup 25 50' },
      },
      de: {
        title: 'Überstunden-Rechner (Zuschlag & Auszahlung)',
        description: 'Berechnen Sie Ihre wöchentliche Bruttovergütung aus regulärer Arbeitszeit und vergüteten Überstunden inkl. Zuschlag (1,25×, 1,5×, 2×).',
        meta: { title: 'Überstunden-Rechner – Überstundenvergütung & Zuschlag berechnen', description: 'Berechnen Sie Auszahlung, Zuschlagssatz und effektiven Stundenlohn für geleistete Überstunden.', keywords: 'ueberstunden rechner, ueberstunden auszahlen berechnen, ueberstundenzuschlag' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'rule-of-72-calculator',
    slugs: { en: 'rule-of-72-calculator', es: 'calculadora-regla-del-72', fr: 'calculateur-regle-des-72', de: '72er-regel-rechner' },
    title: 'Rule of 72 Calculator (Doubling Time)',
    category: 'Financial',
    description: 'Estimate how many years it takes to double your investment using the Rule of 72 alongside exact logarithmic compounding and 20-year wealth projection.',
    meta: {
      title: 'Rule of 72 Calculator – Investment Doubling Time & Exact Compound Math',
      description: 'Compare the Rule of 72 shortcut (72 ÷ r) against exact logarithmic doubling time ln(2)/ln(1+r) for investments, savings, and inflation.',
      keywords: 'rule of 72 calculator, doubling time calculator, how long to double money, compound interest rule 72',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de la Regla del 72',
        description: 'Calcula cuántos años tarda en duplicarse tu capital usando la Regla del 72 comparada con la fórmula logarítmica exacta y proyección a 20 años.',
        meta: { title: 'Calculadora Regla del 72 – Tiempo para Duplicar tu Dinero', description: 'Descubre en cuántos años se duplica tu inversión según la tasa anual con fórmula exacta.', keywords: 'regla del 72 calculadora, duplicar dinero interes compuesto' },
      },
      fr: {
        title: 'Calculateur de la Règle des 72',
        description: 'Calculez en combien d’années votre investissement double grâce à la règle des 72, comparée au calcul logarithmique exact et projection à 20 ans.',
        meta: { title: 'Calculateur Règle des 72 – Temps de Doublement du Capital', description: 'Comparez la règle des 72 et la formule logarithmique exacte pour estimer le doublement de votre épargne.', keywords: 'regle des 72 calculateur, temps doublement capital interets composes' },
      },
      de: {
        title: '72er-Regel-Rechner (Verdopplungszeit)',
        description: 'Berechnen Sie mit der 72er-Regel und der exakten Logarithmusformel, in wie vielen Jahren sich Ihr Kapital bei gegebener Rendite verdoppelt.',
        meta: { title: '72er-Regel-Rechner – Kapital-Verdopplungszeit exakt berechnen', description: 'Vergleichen Sie die 72er-Faustformel mit der exakten Zinseszins-Verdopplungszeit inkl. 20-Jahres-Prognose.', keywords: '72er regel rechner, verdopplungszeit berechnen, zinseszins faustformel' },
      },
    },
    fields: [],
    logicModule: 'financial',
  },
  {
    slug: 'tdee-calculator',
    slugs: { en: 'tdee-calculator', es: 'calculadora-tdee', fr: 'calculateur-tdee', de: 'tdee-kalorienverbrauch-rechner' },
    title: 'TDEE Calculator (Total Daily Energy Expenditure)',
    category: 'Fitness & Health',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) and Mifflin-St Jeor BMR with exact daily calorie targets for cutting, maintenance, and lean bulking.',
    meta: {
      title: 'TDEE Calculator – Total Daily Energy Expenditure & Calorie Targets',
      description: 'Calculate your TDEE and BMR using the Mifflin-St Jeor equation. Get personalized daily calorie goals for fat loss, maintenance, and muscle gain.',
      keywords: 'tdee calculator, total daily energy expenditure, maintenance calories, mifflin st jeor bmr',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora TDEE (Gasto Calórico Diario Total)',
        description: 'Calcula tu Gasto Energético Diario Total (TDEE) y TMB (Mifflin-St Jeor) con metas exactas de calorías para bajar grasa, mantener o ganar músculo.',
        meta: { title: 'Calculadora TDEE – Gasto Calórico Diario y Déficit Calórico', description: 'Calcula tu TDEE y calorías de mantenimiento según tu edad, peso, estatura y actividad física.', keywords: 'calculadora tdee, gasto calorico diario, calorias mantenimiento' },
      },
      fr: {
        title: 'Calculateur TDEE (Dépense Énergétique Journalière Totale)',
        description: 'Calculez votre dépense calorique quotidienne totale (TDEE) et métabolisme de base (Mifflin-St Jeor) pour perte de gras, maintien ou prise de masse.',
        meta: { title: 'Calculateur TDEE – Besoin Calorique Journalier & Métabolisme', description: 'Estimez précisément votre TDEE, métabolisme de base et objectifs caloriques quotidiens.', keywords: 'calculateur tdee, depense energetique journaliere, calories maintien' },
      },
      de: {
        title: 'TDEE-Rechner (Täglicher Gesamtumsatz & Kalorienverbrauch)',
        description: 'Berechnen Sie Ihren täglichen Gesamtumsatz (TDEE) und Grundumsatz nach Mifflin-St Jeor inkl. Kalorienzielen für Fettabbau und Muskelaufbau.',
        meta: { title: 'TDEE-Rechner – Gesamtumsatz & Kalorienbedarf exakt berechnen', description: 'Ermitteln Sie Ihren TDEE-Kalorienverbrauch, Grundumsatz (BMR) und optimales Kaloriendefizit.', keywords: 'tdee rechner, gesamtumsatz berechnen, kalorienverbrauch pro tag' },
      },
    },
    fields: [],
    logicModule: 'health',
  },
  {
    slug: 'one-rep-max-calculator',
    slugs: { en: 'one-rep-max-calculator', es: 'calculadora-1rm', fr: 'calculateur-1rm', de: '1rm-kraftrechner' },
    title: 'One Rep Max (1RM) Calculator',
    category: 'Fitness & Health',
    description: 'Estimate your 1-Repetition Maximum (1RM) for bench press, squat, and deadlift using Epley and Brzycki formulas plus a complete 60%–95% training load table.',
    meta: {
      title: '1RM Calculator – One Rep Max (Epley & Brzycki) & Training Loads',
      description: 'Safely calculate your One Rep Max (1RM) without attempting a maximal lift. Includes Epley, Brzycki, and percentage-based strength chart.',
      keywords: 'one rep max calculator, 1rm calculator, epley formula, brzycki formula, bench press max calculator',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de 1RM (Repetición Máxima)',
        description: 'Estima tu Repetición Máxima (1RM) en press de banca, sentadilla y peso muerto con las fórmulas de Epley y Brzycki más tabla de cargas (70 %–95 %).',
        meta: { title: 'Calculadora 1RM – Repetición Máxima (Epley y Brzycki) y Cargas', description: 'Calcula tu 1RM sin riesgo de lesión y obtén tu tabla de porcentajes para fuerza e hipertrofia.', keywords: 'calculadora 1rm, repeticion maxima, formula epley brzycki' },
      },
      fr: {
        title: 'Calculateur 1RM (Répétition Maximale Musculation)',
        description: 'Estimez votre charge maximale (1RM) au développé couché, squat et soulevé de terre via Epley & Brzycki avec tableau complet des charges (70 %–95 %).',
        meta: { title: 'Calculateur 1RM Musculation – Formules Epley & Brzycki + Tableau', description: 'Calculez votre 1RM en sécurité et planifiez vos charges d’entraînement en force et hypertrophie.', keywords: 'calculateur 1rm, repetition maximale musculation, formule epley brzycki' },
      },
      de: {
        title: '1RM-Rechner (One Rep Max Kraftrechner)',
        description: 'Berechnen Sie Ihr Maximalgewicht (1RM) für Bankdrücken, Kniebeuge & Kreuzheben nach Epley und Brzycki inkl. Prozent-Trainingsgewichtstabelle.',
        meta: { title: '1RM-Rechner – One Rep Max (Epley & Brzycki) & Trainingsgewichte', description: 'Ermitteln Sie Ihr 1RM verletzungsfrei inkl. Trainingslasten für Maximalkraft & Hypertrophie (70 %–95 %).', keywords: '1rm rechner, one rep max berechnen, maximalgewicht rechner krafttraining' },
      },
    },
    fields: [],
    logicModule: 'health',
  },
  {
    slug: 'water-intake-calculator',
    slugs: { en: 'water-intake-calculator', es: 'calculadora-de-agua-diaria', fr: 'calculateur-besoin-en-eau', de: 'wasserbedarf-rechner' },
    title: 'Daily Water Intake Calculator',
    category: 'Fitness & Health',
    description: 'Calculate personalized daily hydration needs in liters, milliliters, fluid ounces, and glasses based on body weight, workout duration, and climate.',
    meta: {
      title: 'Daily Water Intake Calculator – Liters, Ounces & Glasses per Day',
      description: 'Find out how much water you should drink daily based on body weight, exercise sweat loss, and hot/humid climate adjustments.',
      keywords: 'water intake calculator, how much water should i drink, daily hydration calculator, water per day liters',
      lastUpdated: '2026-11-27',
    },
    translations: {
      es: {
        title: 'Calculadora de Agua Diaria (Hidratación)',
        description: 'Calcula cuántos litros, onzas y vasos de agua debes beber al día según tu peso corporal, minutos de ejercicio y clima.',
        meta: { title: 'Calculadora de Agua Diaria – Litros y Vasos Recomendados al Día', description: 'Estima tu necesidad diaria de hidratación según peso, entrenamiento y temperatura ambiental.', keywords: 'calculadora agua diaria, cuanta agua beber al dia, hidratacion litros' },
      },
      fr: {
        title: 'Calculateur de Besoin en Eau Quotidien',
        description: 'Calculez votre apport hydrique journalier en litres et verres de 250 mL selon votre poids, durée d’entraînement et climat.',
        meta: { title: 'Calculateur Besoin en Eau par Jour – Litres & Verres Recommandés', description: 'Déterminez combien de litres d’eau boire chaque jour selon votre poids et activité physique.', keywords: 'calculateur besoin en eau, combien de litres eau par jour, hydratation' },
      },
      de: {
        title: 'Wasserbedarf-Rechner (Trinkmenge pro Tag)',
        description: 'Berechnen Sie Ihren täglichen Flüssigkeitsbedarf in Litern, Millilitern und Gläsern anhand von Körpergewicht, Sportdauer und Klima.',
        meta: { title: 'Wasserbedarf-Rechner – Wie viel Wasser am Tag trinken?', description: 'Berechnen Sie Ihre optimale tägliche Trinkmenge in Litern individuell nach Gewicht, Sport & Wetter.', keywords: 'wasserbedarf rechner, trinkmenge pro tag berechnen, wieviel wasser trinken' },
      },
    },
    fields: [],
    logicModule: 'health',
  },
];
