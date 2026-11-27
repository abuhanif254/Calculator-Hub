import type { CalculatorFormulaDef } from './types';

export const highRpmFormulas: CalculatorFormulaDef[] = [
  {
    slugs: ['roi-calculator'],
    name: 'Return on Investment (ROI) Formula',
    formula: 'ROI (%) = [(Final Value − Initial Cost) ÷ Initial Cost] × 100',
    latex: '\\text{ROI} = \\frac{V_f - V_i}{V_i} \\times 100\\%',
    variables: [
      { symbol: 'Vf', name: 'Final Value', description: 'Ending value or total cash recovered from the investment.' },
      { symbol: 'Vi', name: 'Initial Investment', description: 'Total upfront capital deployed including fees.' },
    ],
    stepByStep: 'Subtract your initial investment from the final value to obtain net profit, divide by the initial cost, and multiply by 100 for total percentage ROI.',
    faq: { question: 'How is ROI calculated?', answer: 'ROI = ((Final Value − Initial Cost) ÷ Initial Cost) × 100. Divide over holding years with CAGR to compare investments of different durations.' },
    translations: {
      es: {
        name: 'Fórmula del Retorno de Inversión (ROI)',
        variables: [
          { symbol: 'Vf', name: 'Valor Final', description: 'Valor recuperado al término de la inversión.' },
          { symbol: 'Vi', name: 'Inversión Inicial', description: 'Capital desembolsado inicialmente.' },
        ],
        stepByStep: 'Reste la inversión inicial del valor final para hallar la ganancia neta, divida entre el capital inicial y multiplique por 100.',
      },
      fr: {
        name: 'Formule du Retour sur Investissement (ROI)',
        variables: [
          { symbol: 'Vf', name: 'Valeur Finale', description: 'Montant total récupéré à la sortie.' },
          { symbol: 'Vi', name: 'Investissement Initial', description: 'Capital engagé au départ, frais inclus.' },
        ],
        stepByStep: 'Soustrayez l’investissement initial de la valeur finale pour obtenir le gain net, divisez par le capital initial puis multipliez par 100.',
      },
      de: {
        name: 'Return-on-Investment-Formel (ROI)',
        variables: [
          { symbol: 'Vf', name: 'Endwert', description: 'Gesamtrückfluss am Ende der Anlage.' },
          { symbol: 'Vi', name: 'Anfangsinvestition', description: 'Eingesetztes Kapital inklusive Nebenkosten.' },
        ],
        stepByStep: 'Ziehen Sie die Anfangsinvestition vom Endwert ab, teilen Sie den Nettogewinn durch das eingesetzte Kapital und multiplizieren Sie mit 100.',
      },
    },
  },
  {
    slugs: ['cagr-calculator'],
    name: 'Compound Annual Growth Rate (CAGR) Formula',
    formula: 'CAGR = (Ending Value ÷ Beginning Value)^(1 ÷ n) − 1',
    latex: '\\text{CAGR} = \\left(\\frac{V_n}{V_0}\\right)^{\\frac{1}{n}} - 1',
    variables: [
      { symbol: 'Vn', name: 'Ending Value', description: 'Final portfolio or revenue balance after n years.' },
      { symbol: 'V0', name: 'Beginning Value', description: 'Starting balance at year 0.' },
      { symbol: 'n', name: 'Number of Years', description: 'Total investment holding period in years.' },
    ],
    stepByStep: 'Divide ending value by beginning value, raise the ratio to the power of (1 ÷ years), and subtract 1 to get the smoothed annual compound growth rate.',
    faq: { question: 'How do you calculate CAGR?', answer: 'CAGR = (Ending Value / Beginning Value)^(1 / Years) − 1. It represents the constant annual return needed to grow from start to end value.' },
    translations: {
      es: {
        name: 'Fórmula de la Tasa de Crecimiento Anual Compuesto (CAGR)',
        variables: [
          { symbol: 'Vn', name: 'Valor Final', description: 'Saldo o ingresos al final del período.' },
          { symbol: 'V0', name: 'Valor Inicial', description: 'Saldo inicial en el año 0.' },
          { symbol: 'n', name: 'Años', description: 'Número total de años.' },
        ],
        stepByStep: 'Divida el valor final entre el valor inicial, eleve el cociente a la potencia (1 ÷ n) y reste 1.',
      },
      fr: {
        name: 'Formule du Taux de Croissance Annuel Composé (TCAC / CAGR)',
        variables: [
          { symbol: 'Vn', name: 'Valeur Finale', description: 'Capital ou chiffre d’affaires à la fin.' },
          { symbol: 'V0', name: 'Valeur Initiale', description: 'Montant de départ.' },
          { symbol: 'n', name: 'Années', description: 'Nombre total d’années.' },
        ],
        stepByStep: 'Divisez la valeur finale par la valeur initiale, élevez le rapport à la puissance (1 ÷ n), puis retranchez 1.',
      },
      de: {
        name: 'CAGR-Formel (Jährliche Wachstumsrate)',
        variables: [
          { symbol: 'Vn', name: 'Endwert', description: 'Kapital oder Umsatz am Ende der Laufzeit.' },
          { symbol: 'V0', name: 'Startwert', description: 'Ausgangswert zu Beginn.' },
          { symbol: 'n', name: 'Laufzeit (Jahre)', description: 'Anzahl der betrachteten Jahre.' },
        ],
        stepByStep: 'Teilen Sie Endwert durch Startwert, potenzieren Sie das Verhältnis mit (1 ÷ n) und ziehen Sie 1 ab.',
      },
    },
  },
  {
    slugs: ['net-worth-calculator'],
    name: 'Personal Net Worth Identity',
    formula: 'Net Worth = Total Assets − Total Liabilities',
    latex: '\\text{Net Worth} = \\sum \\text{Assets} - \\sum \\text{Liabilities}',
    variables: [
      { symbol: 'Assets', name: 'Total Assets', description: 'Cash, brokerage & retirement accounts, real estate market value, and vehicles.' },
      { symbol: 'Liabilities', name: 'Total Liabilities', description: 'Mortgage balances, student/auto loans, and revolving credit card debt.' },
    ],
    stepByStep: 'Sum the fair market value of everything you own, sum all outstanding debt balances, and subtract liabilities from assets.',
    faq: { question: 'How is personal net worth calculated?', answer: 'Net Worth equals Total Assets minus Total Liabilities. Monitoring it quarterly tracks true wealth progression.' },
    translations: {
      es: {
        name: 'Ecuación de Patrimonio Neto',
        variables: [
          { symbol: 'Activos', name: 'Activos Totales', description: 'Efectivo, inversiones, jubilación y valor de inmuebles.' },
          { symbol: 'Pasivos', name: 'Pasivos Totales', description: 'Hipotecas, préstamos y tarjetas pendientes.' },
        ],
        stepByStep: 'Sume el valor actual de todos sus bienes y reste la suma total de sus deudas vigentes.',
      },
      fr: {
        name: 'Équation du Patrimoine Net',
        variables: [
          { symbol: 'Actifs', name: 'Total des Actifs', description: 'Liquidités, placements financiers et immobilier.' },
          { symbol: 'Passifs', name: 'Total des Dettes', description: 'Capital restant dû sur prêts immobiliers et crédits.' },
        ],
        stepByStep: 'Additionnez la valeur de marché de tous vos avoirs puis déduisez l’ensemble de vos dettes restantes.',
      },
      de: {
        name: 'Nettovermögens-Gleichung',
        variables: [
          { symbol: 'Aktiva', name: 'Gesamtvermögen', description: 'Guthaben, Wertpapiere, Immobilien und Sachwerte.' },
          { symbol: 'Passiva', name: 'Verbindlichkeiten', description: 'Restschulden aus Baufinanzierung und Krediten.' },
        ],
        stepByStep: 'Addieren Sie sämtliche Vermögenswerte zum Marktwert und ziehen Sie alle offenen Schulden ab.',
      },
    },
  },
  {
    slugs: ['break-even-calculator'],
    name: 'Break-Even Point Formula',
    formula: 'Break-Even Units = Fixed Costs ÷ (Selling Price − Variable Cost)',
    latex: 'Q_{BE} = \\frac{F}{P - V}',
    variables: [
      { symbol: 'F', name: 'Fixed Costs', description: 'Rent, salaries, insurance, and overhead independent of output volume.' },
      { symbol: 'P', name: 'Selling Price', description: 'Revenue earned per unit sold.' },
      { symbol: 'V', name: 'Variable Cost', description: 'Direct materials, shipping, and payment fees per unit.' },
    ],
    stepByStep: 'Compute unit contribution margin (P − V), then divide total fixed costs by unit contribution margin to obtain break-even units.',
    faq: { question: 'What is the break-even point formula?', answer: 'Break-Even Units = Fixed Costs ÷ (Unit Price − Unit Variable Cost). Multiply by unit price for break-even revenue.' },
    translations: {
      es: {
        name: 'Fórmula del Punto de Equilibrio',
        variables: [
          { symbol: 'F', name: 'Costos Fijos', description: 'Gastos fijos independientes del volumen de ventas.' },
          { symbol: 'P', name: 'Precio Unitario', description: 'Precio de venta de cada unidad.' },
          { symbol: 'V', name: 'Costo Variable', description: 'Costo directo por unidad vendida.' },
        ],
        stepByStep: 'Calcule el margen de contribución (P − V) y divida los costos fijos entre ese margen.',
      },
      fr: {
        name: 'Formule du Seuil de Rentabilité',
        variables: [
          { symbol: 'F', name: 'Charges Fixes', description: 'Coûts structurels indépendants du volume.' },
          { symbol: 'P', name: 'Prix Unitaire', description: 'Prix de vente hors taxes par unité.' },
          { symbol: 'V', name: 'Coût Variable', description: 'Coût direct de production ou d’achat par unité.' },
        ],
        stepByStep: 'Calculez la marge unitaire (P − V), puis divisez les charges fixes par cette marge.',
      },
      de: {
        name: 'Break-Even-Formel (Gewinnschwelle)',
        variables: [
          { symbol: 'F', name: 'Fixkosten', description: 'Miete, Personal und laufende Gemeinkosten.' },
          { symbol: 'P', name: 'Verkaufspreis', description: 'Netto-Erlös pro verkaufter Einheit.' },
          { symbol: 'V', name: 'Variable Stückkosten', description: 'Direkte Material- und Versandkosten pro Einheit.' },
        ],
        stepByStep: 'Ermitteln Sie den Stückdeckungsbeitrag (P − V) und teilen Sie die Fixkosten durch diesen Betrag.',
      },
    },
  },
  {
    slugs: ['mortgage-refinance-calculator'],
    name: 'Refinance Break-Even & Monthly Savings Formula',
    formula: 'Break-Even Months = Closing Costs ÷ (Old Payment − New Payment)',
    latex: 'T_{BE} = \\frac{C_{\\text{close}}}{M_{\\text{old}} - M_{\\text{new}}}',
    variables: [
      { symbol: 'C', name: 'Closing Costs', description: 'Appraisal, origination, title, or early prepayment penalties.' },
      { symbol: 'Mold', name: 'Current Payment', description: 'Current monthly principal and interest payment.' },
      { symbol: 'Mnew', name: 'Refinanced Payment', description: 'New monthly principal and interest payment at the lower APR.' },
    ],
    stepByStep: 'Calculate both standard amortized payments, take the monthly reduction, and divide refinance closing costs by monthly savings to find the break-even month.',
    faq: { question: 'When does refinancing a mortgage pay off?', answer: 'Refinancing pays off once you stay in the home past your break-even month (Closing Costs ÷ Monthly Savings) and total remaining interest decreases.' },
    translations: {
      es: {
        name: 'Fórmula de Equilibrio en Refinanciamiento',
        variables: [
          { symbol: 'C', name: 'Costos de Cierre', description: 'Comisiones, tasación y gastos de escritura.' },
          { symbol: 'Mold', name: 'Cuota Actual', description: 'Cuota mensual vigente.' },
          { symbol: 'Mnew', name: 'Nueva Cuota', description: 'Cuota mensual tras refinanciar.' },
        ],
        stepByStep: 'Calcule el ahorro mensual restando la nueva cuota de la actual y divida los costos de cierre entre ese ahorro.',
      },
      fr: {
        name: 'Formule de Rentabilité du Rachat de Crédit',
        variables: [
          { symbol: 'C', name: 'Frais de Rachat', description: 'IRA, frais de dossier et nouvelle garantie.' },
          { symbol: 'Mold', name: 'Mensualité Actuelle', description: 'Mensualité hors assurance du prêt initial.' },
          { symbol: 'Mnew', name: 'Nouvelle Mensualité', description: 'Mensualité au nouveau taux négocié.' },
        ],
        stepByStep: 'Calculez l’économie mensuelle puis divisez les frais totaux de rachat par cette économie pour obtenir le nombre de mois d’amortissement.',
      },
      de: {
        name: 'Umschuldungs-Amortisationsformel',
        variables: [
          { symbol: 'C', name: 'Umschuldungskosten', description: 'Notar-, Grundbuch- oder Vorfälligkeitskosten.' },
          { symbol: 'Mold', name: 'Bisherige Rate', description: 'Aktuelle monatliche Zins- und Tilgungsrate.' },
          { symbol: 'Mnew', name: 'Neue Rate', description: 'Monatsrate nach Umschuldung.' },
        ],
        stepByStep: 'Teilen Sie die gesamten Umschuldungskosten durch die monatliche Ratenersparnis, um die Amortisationszeit in Monaten zu bestimmen.',
      },
    },
  },
  {
    slugs: ['cap-rate-calculator'],
    name: 'Real Estate Capitalization Rate (Cap Rate) Formula',
    formula: 'Cap Rate (%) = (Net Operating Income ÷ Property Value) × 100',
    latex: '\\text{Cap Rate} = \\frac{\\text{NOI}}{\\text{Purchase Price}} \\times 100\\%',
    variables: [
      { symbol: 'NOI', name: 'Net Operating Income', description: 'Annual effective gross rent minus property taxes, insurance, maintenance, and management (excluding mortgage).' },
      { symbol: 'Price', name: 'Property Value', description: 'Purchase price or current fair market valuation.' },
    ],
    stepByStep: 'Subtract vacancy allowance and annual operating expenses from gross annual rent to find NOI, then divide NOI by purchase price and multiply by 100.',
    faq: { question: 'Does Cap Rate include mortgage payments?', answer: 'No. Cap Rate measures unlevered property return using Net Operating Income (NOI) before debt service so properties can be compared apples-to-apples.' },
    translations: {
      es: {
        name: 'Fórmula de Tasa de Capitalización (Cap Rate)',
        variables: [
          { symbol: 'NOI', name: 'Ingreso Operativo Neto', description: 'Renta anual efectiva menos gastos operativos (sin hipoteca).' },
          { symbol: 'Precio', name: 'Valor del Inmueble', description: 'Precio de compra o valor de mercado.' },
        ],
        stepByStep: 'Reste vacancia y gastos operativos anuales del alquiler bruto para obtener el NOI y divídalo entre el precio de compra.',
      },
      fr: {
        name: 'Formule du Taux de Capitalisation (Cap Rate)',
        variables: [
          { symbol: 'NOI', name: 'Revenu Net d’Exploitation', description: 'Loyers annuels nets de vacance et de charges (hors crédit).' },
          { symbol: 'Prix', name: 'Prix du Bien', description: 'Prix d’achat ou valeur vénale actuelle.' },
        ],
        stepByStep: 'Déduisez vacance locative et charges annuelles des loyers bruts pour obtenir le NOI, puis divisez par le prix du bien.',
      },
      de: {
        name: 'Netto-Mietrendite-Formel (Cap Rate)',
        variables: [
          { symbol: 'NOI', name: 'Jährlicher Reinertrag', description: 'Effektive Jahreskaltmiete abzüglich Bewirtschaftungskosten (ohne Zinsen).' },
          { symbol: 'Preis', name: 'Kaufpreis', description: 'Immobilienkaufpreis bzw. Marktwert.' },
        ],
        stepByStep: 'Ziehen Sie Mietausfall und nicht umlagefähige Kosten von der Jahresmiete ab und teilen Sie den Reinertrag durch den Kaufpreis.',
      },
    },
  },
  {
    slugs: ['take-home-pay-calculator'],
    name: 'Gross-to-Net Take-Home Pay Equation',
    formula: 'Net Pay = Gross Salary − Income Tax − Social Security − Pre-Tax Pension',
    latex: '\\text{Net} = G - T_{\\text{inc}} - S_{\\text{sec}} - P_{\\text{ret}}',
    variables: [
      { symbol: 'G', name: 'Gross Annual Salary', description: 'Total contractual annual wage before statutory withholdings.' },
      { symbol: 'Tinc', name: 'Progressive Income Tax', description: 'Federal/national progressive income tax after allowances.' },
      { symbol: 'Ssec', name: 'Social Security Contributions', description: 'Mandatory employee payroll taxes (FICA, Sozialversicherung, Cotisations, Seguridad Social).' },
    ],
    stepByStep: 'Deduct pre-tax retirement contributions, compute progressive income tax across statutory brackets, subtract employee social security contributions, and divide by 12 for monthly net pay.',
    faq: { question: 'Why is my effective tax rate lower than my marginal tax bracket?', answer: 'Because income taxes are progressive: standard allowances are taxed at 0% and only income above each bracket threshold is taxed at the higher marginal rate.' },
    translations: {
      es: {
        name: 'Ecuación de Salario Bruto a Neto',
        variables: [
          { symbol: 'G', name: 'Salario Bruto Anual', description: 'Remuneración total antes de retenciones.' },
          { symbol: 'IRPF', name: 'Impuesto sobre la Renta', description: 'Retención progresiva por tramos fiscales.' },
          { symbol: 'SS', name: 'Seguridad Social', description: 'Cotizaciones obligatorias a cargo del trabajador.' },
        ],
        stepByStep: 'Aplique deducciones pre-impuesto, calcule el impuesto progresivo por tramos, reste la Seguridad Social y divida entre 12 meses.',
      },
      fr: {
        name: 'Formule de Passage du Salaire Brut au Net',
        variables: [
          { symbol: 'G', name: 'Salaire Brut', description: 'Rémunération contractuelle avant cotisations.' },
          { symbol: 'Cotis', name: 'Cotisations Sociales', description: 'Prélèvements salariaux (~22 % non-cadre, ~24,5 % cadre).' },
          { symbol: 'IR', name: 'Impôt sur le Revenu', description: 'Barème progressif appliqué au net imposable.' },
        ],
        stepByStep: 'Retirez les cotisations salariales du brut, calculez l’impôt progressif par tranches sur le net imposable, puis divisez par 12.',
      },
      de: {
        name: 'Brutto-Netto-Berechnungsformel',
        variables: [
          { symbol: 'G', name: 'Bruttojahresgehalt', description: 'Vertragliches Gehalt vor Steuern und Abgaben.' },
          { symbol: 'LSt', name: 'Lohn- / Einkommensteuer', description: 'Progressive Steuer unter Berücksichtigung des Grundfreibetrags.' },
          { symbol: 'SV', name: 'Sozialabgaben', description: 'Arbeitnehmeranteile zu Renten-, Kranken-, Pflege- und Arbeitslosenversicherung.' },
        ],
        stepByStep: 'Ziehen Sie Lohnsteuer (nach Grundfreibetrag und Steuerklasse), Arbeitnehmer-Sozialabgaben und Vorsorgebeiträge vom Brutto ab und teilen Sie durch 12.',
      },
    },
  },
  {
    slugs: ['overtime-pay-calculator'],
    name: 'Overtime Total Pay Equation',
    formula: 'Total Pay = (Regular Hours × Rate) + (Overtime Hours × Rate × Multiplier)',
    latex: 'W = (H_r \\times R) + (H_o \\times R \\times m)',
    variables: [
      { symbol: 'R', name: 'Hourly Rate', description: 'Standard base wage per hour.' },
      { symbol: 'Hr', name: 'Regular Hours', description: 'Standard shift hours worked at 1.0× base wage.' },
      { symbol: 'Ho', name: 'Overtime Hours', description: 'Extra hours compensated at multiplier m (e.g., 1.5×).' },
    ],
    stepByStep: 'Multiply regular hours by your base wage, multiply overtime hours by the boosted overtime rate (Rate × Multiplier), and add both components.',
    faq: { question: 'How do you calculate 1.5× time-and-a-half overtime pay?', answer: 'Multiply your base hourly wage by 1.5 to get the overtime rate, then multiply by the number of overtime hours worked beyond your regular threshold.' },
    translations: {
      es: {
        name: 'Fórmula de Pago de Horas Extras',
        variables: [
          { symbol: 'R', name: 'Tarifa Horaria', description: 'Salario base por hora.' },
          { symbol: 'Hr', name: 'Horas Regulares', description: 'Horas trabajadas a tarifa normal.' },
          { symbol: 'Ho', name: 'Horas Extras', description: 'Horas adicionales con multiplicador m.' },
        ],
        stepByStep: 'Multiplique las horas regulares por la tarifa base y sume las horas extras multiplicadas por la tarifa con recargo.',
      },
      fr: {
        name: 'Formule des Heures Supplémentaires',
        variables: [
          { symbol: 'R', name: 'Taux Horaire', description: 'Salaire horaire brut de base.' },
          { symbol: 'Hr', name: 'Heures Normales', description: 'Heures payées au taux standard.' },
          { symbol: 'Ho', name: 'Heures Supplémentaires', description: 'Heures majorées au coefficient m (1,25× ou 1,5×).' },
        ],
        stepByStep: 'Additionnez la rémunération des heures normales et celle des heures supplémentaires multipliées par le taux majoré.',
      },
      de: {
        name: 'Überstundenvergütungs-Formel',
        variables: [
          { symbol: 'R', name: 'Stundenlohn', description: 'Regulärer Bruttostundenlohn.' },
          { symbol: 'Hr', name: 'Reguläre Stunden', description: 'Vertragliche Arbeitsstunden.' },
          { symbol: 'Ho', name: 'Überstunden', description: 'Mehrarbeitsstunden mit Faktor m (z. B. 1,25× oder 1,5×).' },
        ],
        stepByStep: 'Multiplizieren Sie reguläre Stunden mit dem Stundenlohn und addieren Sie die mit dem Zuschlagsfaktor bewerteten Überstunden.',
      },
    },
  },
  {
    slugs: ['rule-of-72-calculator'],
    name: 'Rule of 72 & Exact Logarithmic Doubling Formula',
    formula: 'Years ≈ 72 ÷ r (%)  |  Exact: Years = ln(2) ÷ ln(1 + r)',
    latex: 't \\approx \\frac{72}{r_{\\%}}, \\quad t_{\\text{exact}} = \\frac{\\ln(2)}{\\ln(1 + r)}',
    variables: [
      { symbol: 'r', name: 'Annual Return Rate', description: 'Compound annual return expressed as percentage (e.g., 8 for 8%).' },
      { symbol: 't', name: 'Doubling Time', description: 'Years required for initial capital to grow 2×.' },
    ],
    stepByStep: 'Divide 72 by the annual percentage return for a fast mental estimate, or divide ln(2) ≈ 0.69315 by ln(1 + r/100) for exact mathematical doubling time.',
    faq: { question: 'How accurate is the Rule of 72?', answer: 'Between 6% and 10% annual return, the Rule of 72 is accurate within 0.1–0.2 years of exact logarithmic compounding. At 8%, 72 ÷ 8 = 9.00 years vs 9.006 years exact.' },
    translations: {
      es: {
        name: 'Fórmula de la Regla del 72 y Logaritmo Exacto',
        variables: [
          { symbol: 'r', name: 'Tasa Anual (%)', description: 'Rendimiento anual compuesto.' },
          { symbol: 't', name: 'Años para Duplicar', description: 'Plazo para multiplicar por 2 el capital.' },
        ],
        stepByStep: 'Divida 72 entre la tasa anual porcentual para estimar al instante, o calcule ln(2) ÷ ln(1 + r/100) para precisión exacta.',
      },
      fr: {
        name: 'Formule de la Règle des 72 et Temps Exact',
        variables: [
          { symbol: 'r', name: 'Rendement Annuel (%)', description: 'Taux composé annuel.' },
          { symbol: 't', name: 'Temps de Doublement', description: 'Années nécessaires pour doubler le capital.' },
        ],
        stepByStep: 'Divisez 72 par le taux annuel en pourcentage pour une estimation rapide, ou calculez ln(2) ÷ ln(1 + r/100) pour la valeur exacte.',
      },
      de: {
        name: '72er-Regel und Exakte Verdopplungsformel',
        variables: [
          { symbol: 'r', name: 'Jahresrendite (%)', description: 'Jährliche Verzinsung in Prozent.' },
          { symbol: 't', name: 'Verdopplungszeit', description: 'Jahre bis zur Verdopplung des Kapitals.' },
        ],
        stepByStep: 'Teilen Sie 72 durch den Zinssatz in Prozent für die Schnellschätzung oder berechnen Sie ln(2) ÷ ln(1 + r/100) für das exakte Ergebnis.',
      },
    },
  },
  {
    slugs: ['tdee-calculator'],
    name: 'Mifflin-St Jeor TDEE Energy Expenditure Formula',
    formula: 'TDEE = [10×kg + 6.25×cm − 5×age + (+5 M / −161 F)] × Activity Factor',
    latex: '\\text{TDEE} = (10w + 6.25h - 5a + s) \\times \\text{PAL}',
    variables: [
      { symbol: 'w', name: 'Body Weight (kg)', description: 'Current body weight in kilograms.' },
      { symbol: 'h', name: 'Height (cm)', description: 'Standing height in centimeters.' },
      { symbol: 'PAL', name: 'Activity Multiplier', description: 'Physical activity factor from 1.2 (sedentary) to 1.9 (athlete).' },
    ],
    stepByStep: 'Compute resting BMR via Mifflin-St Jeor (+5 for men, −161 for women), then multiply BMR by your Physical Activity Level (1.2 to 1.9) to find maintenance TDEE.',
    faq: { question: 'Which BMR equation is most accurate for TDEE?', answer: 'Clinical validation studies consistently identify the 1990 Mifflin-St Jeor equation as the most accurate predictive formula for modern adult populations.' },
    translations: {
      es: {
        name: 'Fórmula TDEE de Mifflin-St Jeor',
        variables: [
          { symbol: 'w', name: 'Peso (kg)', description: 'Peso corporal en kilogramos.' },
          { symbol: 'h', name: 'Estatura (cm)', description: 'Altura en centímetros.' },
          { symbol: 'PAL', name: 'Factor de Actividad', description: 'Multiplicador entre 1,2 (sedentario) y 1,9 (atleta).' },
        ],
        stepByStep: 'Calcule la TMB con Mifflin-St Jeor (+5 hombres, −161 mujeres) y multiplique por su nivel de actividad física.',
      },
      fr: {
        name: 'Formule TDEE de Mifflin-St Jeor',
        variables: [
          { symbol: 'w', name: 'Poids (kg)', description: 'Poids corporel en kilogrammes.' },
          { symbol: 'h', name: 'Taille (cm)', description: 'Taille en centimètres.' },
          { symbol: 'PAL', name: 'Facteur d’Activité', description: 'Coefficient de 1,2 (sédentaire) à 1,9 (athlète).' },
        ],
        stepByStep: 'Calculez le métabolisme de base selon Mifflin-St Jeor (+5 homme, −161 femme) puis multipliez par votre facteur d’activité.',
      },
      de: {
        name: 'Mifflin-St-Jeor-TDEE-Formel',
        variables: [
          { symbol: 'w', name: 'Gewicht (kg)', description: 'Körpergewicht in Kilogramm.' },
          { symbol: 'h', name: 'Größe (cm)', description: 'Körpergröße in Zentimetern.' },
          { symbol: 'PAL', name: 'Aktivitätsfaktor', description: 'PAL-Multiplikator von 1,2 (sitzend) bis 1,9 (Leistungssport).' },
        ],
        stepByStep: 'Berechnen Sie den Grundumsatz nach Mifflin-St Jeor (+5 Männer, −161 Frauen) und multiplizieren Sie mit Ihrem PAL-Faktor.',
      },
    },
  },
  {
    slugs: ['one-rep-max-calculator'],
    name: 'Epley & Brzycki 1RM Equations',
    formula: 'Epley: 1RM = w × (1 + r ÷ 30)  |  Brzycki: 1RM = w × 36 ÷ (37 − r)',
    latex: '1\\text{RM}_{\\text{Epley}} = w\\left(1 + \\frac{r}{30}\\right)',
    variables: [
      { symbol: 'w', name: 'Weight Lifted', description: 'Submaximal barbell or dumbbell load lifted cleanly.' },
      { symbol: 'r', name: 'Repetitions', description: 'Number of strict repetitions performed (most accurate for 2–10 reps).' },
    ],
    stepByStep: 'Multiply the weight lifted by (1 + reps ÷ 30) for the Epley estimate and average with Brzycki [w × 36 ÷ (37 − reps)] for a balanced 1RM prediction.',
    faq: { question: 'What rep range gives the most accurate 1RM estimate?', answer: 'Sets of 3 to 8 strict repetitions yield the lowest prediction error across both Epley and Brzycki equations.' },
    translations: {
      es: {
        name: 'Fórmulas Epley y Brzycki de 1RM',
        variables: [
          { symbol: 'w', name: 'Carga Levantada', description: 'Peso submáximo movido con técnica estricta.' },
          { symbol: 'r', name: 'Repeticiones', description: 'Número de repeticiones completadas (óptimo 2–10).' },
        ],
        stepByStep: 'Multiplique el peso por (1 + reps ÷ 30) según Epley y promedie con Brzycki para obtener una estimación equilibrada.',
      },
      fr: {
        name: 'Formules d’Epley et de Brzycki (1RM)',
        variables: [
          { symbol: 'w', name: 'Charge Soulevée', description: 'Poids soulevé avec technique contrôlée.' },
          { symbol: 'r', name: 'Répétitions', description: 'Nombre de répétitions réalisées (précision optimale entre 2 et 10).' },
        ],
        stepByStep: 'Calculez w × (1 + r ÷ 30) avec Epley et faites la moyenne avec Brzycki [w × 36 ÷ (37 − r)].',
      },
      de: {
        name: 'Epley- und Brzycki-1RM-Formeln',
        variables: [
          { symbol: 'w', name: 'Trainingsgewicht', description: 'Sauber bewältigte Last in kg oder lb.' },
          { symbol: 'r', name: 'Wiederholungen', description: 'Anzahl sauberer Wiederholungen (am präzisesten bei 2–10 Wdh.).' },
        ],
        stepByStep: 'Berechnen Sie w × (1 + r ÷ 30) nach Epley und mitteln Sie das Ergebnis mit der Brzycki-Formel [w × 36 ÷ (37 − r)].',
      },
    },
  },
  {
    slugs: ['water-intake-calculator'],
    name: 'Weight & Activity Hydration Equation',
    formula: 'Daily Water (L) = (Weight kg × 0.035) + (Exercise min ÷ 30 × 0.35) + Climate Bonus',
    latex: 'V_{\\text{H}_2\\text{O}} = 0.035\\,w + 0.35\\,\\frac{t_{\\text{ex}}}{30} + c',
    variables: [
      { symbol: 'w', name: 'Body Weight (kg)', description: 'Adult body weight (~35 mL baseline fluid per kg).' },
      { symbol: 'tex', name: 'Exercise Minutes', description: 'Adds ~350 mL per 30 minutes of moderate-to-vigorous sweat loss.' },
    ],
    stepByStep: 'Multiply body weight in kg by 35 mL, add 350 mL for every 30 minutes of daily exercise, and add 500 mL in hot or humid conditions.',
    faq: { question: 'Does coffee or food water count toward daily hydration?', answer: 'Yes — water-rich foods typically supply ~20% of total fluid intake, and moderate coffee/tea contributes net positive hydration.' },
    translations: {
      es: {
        name: 'Fórmula de Hidratación Diaria por Peso y Actividad',
        variables: [
          { symbol: 'w', name: 'Peso Corporal (kg)', description: 'Base fisiológica de ~35 mL por kg de peso.' },
          { symbol: 'tex', name: 'Minutos de Ejercicio', description: 'Añade ~350 mL por cada 30 minutos de actividad.' },
        ],
        stepByStep: 'Multiplique su peso en kg por 35 mL, sume 350 mL por cada 30 minutos de deporte y 500 mL en climas calurosos.',
      },
      fr: {
        name: 'Formule du Besoin Hydrique Quotidien',
        variables: [
          { symbol: 'w', name: 'Poids (kg)', description: 'Base physiologique de ~35 mL par kg.' },
          { symbol: 'tex', name: 'Minutes de Sport', description: 'Ajoute ~350 mL par tranche de 30 minutes d’effort.' },
        ],
        stepByStep: 'Multipliez le poids en kg par 35 mL, ajoutez 350 mL par demi-heure de sport et 500 mL par temps chaud.',
      },
      de: {
        name: 'Formel für den täglichen Wasserbedarf',
        variables: [
          { symbol: 'w', name: 'Körpergewicht (kg)', description: 'Richtwert ca. 35 mL pro Kilogramm Körpergewicht.' },
          { symbol: 'tex', name: 'Sportdauer (Min.)', description: 'Zusätzlich ca. 350 mL je 30 Minuten Sport.' },
        ],
        stepByStep: 'Multiplizieren Sie Ihr Gewicht in kg mit 35 mL, addieren Sie 350 mL pro 30 Minuten Training sowie 500 mL bei Hitze.',
      },
    },
  },
];
