// ═══════════════════════════════════════════════════════════════════════
// lib/data/formulas/financeFormulas.ts
// 26 verified, 4-language (EN / ES / FR / DE) financial mathematical models.
// ═══════════════════════════════════════════════════════════════════════

import type { CalculatorFormulaDef } from './types';

export const financeFormulas: CalculatorFormulaDef[] = [
  // 1. Standard Amortization
  {
    slugs: [
      'mortgage-calculator', 'loan-calculator', 'amortization-calculator', 'auto-loan-calculator',
      'personal-loan-calculator', 'student-loan-calculator', 'business-loan-calculator',
      'fha-loan-calculator', 'va-mortgage-calculator', 'boat-loan-calculator', 'heloc-calculator',
      'mortgage-amortization-calculator', 'canadian-mortgage-calculator', 'payment-calculator',
      '15-year-mortgage-calculator', '30-year-mortgage-calculator', 'jumbo-mortgage-calculator',
      'va-loan-calculator', 'used-car-loan-calculator', 'new-car-loan-calculator',
      'motorcycle-loan-calculator', 'rv-loan-calculator',
    ],
    name: 'Standard Amortization Payment Formula',
    formula: 'M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]',
    latex: 'M = P \\frac{i(1 + i)^n}{(1 + i)^n - 1}',
    variables: [
      { symbol: 'M', name: 'Monthly Payment', description: 'Total periodic principal and interest payment' },
      { symbol: 'P', name: 'Principal Loan Amount', description: 'Initial borrowed loan balance' },
      { symbol: 'i', name: 'Periodic Interest Rate', description: 'Annual interest rate divided by payment frequency (APR / 12)' },
      { symbol: 'n', name: 'Total Number of Payments', description: 'Loan term in years multiplied by 12 monthly periods' },
    ],
    stepByStep: '1. Divide annual interest rate by 12 to get monthly rate i. 2. Multiply term in years by 12 to get n payments. 3. Compute (1 + i)^n. 4. Multiply by P and i, then divide by [(1 + i)^n - 1].',
    faq: {
      question: 'What is the mathematical formula used to calculate loan and mortgage payments?',
      answer: 'Monthly amortizing loan payments are calculated using M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ], where M is the monthly payment, P is principal, i is the monthly interest rate (APR / 12), and n is the total number of monthly payments.',
    },
    translations: {
      es: {
        name: 'Fórmula de Amortización Estándar (Sistema Francés)',
        variables: [
          { symbol: 'M', name: 'Cuota Mensual', description: 'Pago periódico constante de capital e intereses' },
          { symbol: 'P', name: 'Capital del Préstamo', description: 'Importe inicial financiado tras el pago inicial' },
          { symbol: 'i', name: 'Tasa de Interés Periódica', description: 'Tipo de interés nominal anual dividido entre 12 meses' },
          { symbol: 'n', name: 'Número Total de Cuotas', description: 'Plazo del préstamo en años multiplicado por 12' },
        ],
        stepByStep: '1. Divida la tasa anual por 12 para obtener i. 2. Multiplique los años por 12 para obtener n. 3. Calcule (1 + i)^n. 4. Multiplique por P e i y divida entre [(1 + i)^n - 1].',
      },
      fr: {
        name: 'Formule d’Amortissement Standard à Mensualités Constantes',
        variables: [
          { symbol: 'M', name: 'Mensualité', description: 'Échéance mensuelle constante (capital + intérêts)' },
          { symbol: 'P', name: 'Capital Emprunté', description: 'Montant initial du prêt hors apport personnel' },
          { symbol: 'i', name: 'Taux Périodique Mensuel', description: 'Taux d’intérêt annuel nominal divisé par 12' },
          { symbol: 'n', name: 'Nombre Total de Mensualités', description: 'Durée du crédit en années multipliée par 12' },
        ],
        stepByStep: '1. Divisez le taux annuel par 12 pour obtenir i. 2. Multipliez la durée en années par 12 pour obtenir n. 3. Calculez (1 + i)^n. 4. Multipliez par P et i, puis divisez par [(1 + i)^n - 1].',
      },
      de: {
        name: 'Annuitätenformel für Ratenkredite & Baufinanzierung',
        variables: [
          { symbol: 'M', name: 'Monatsrate (Annuität)', description: 'Gleichbleibende monatliche Rate aus Zins und Tilgung' },
          { symbol: 'P', name: 'Darlehensbetrag', description: 'Anfängliche Kreditsumme nach Abzug des Eigenkapitals' },
          { symbol: 'i', name: 'Monatszinssatz', description: 'Jährlicher Sollzinssatz geteilt durch 12 Monate' },
          { symbol: 'n', name: 'Gesamtanzahl der Raten', description: 'Kreditlaufzeit in Jahren multipliziert mit 12' },
        ],
        stepByStep: '1. Jahreszins durch 12 teilen, um i zu erhalten. 2. Laufzeit in Jahren mit 12 multiplizieren (n). 3. (1 + i)^n berechnen. 4. Mit P und i multiplizieren und durch [(1 + i)^n - 1] teilen.',
      },
    },
  },

  // 2. Compound Interest
  {
    slugs: [
      'compound-interest-calculator', 'investment-calculator', 'savings-calculator',
      'future-value-calculator', 'cd-calculator', 'average-return-calculator', 'finance-calculator',
      's-and-p-500-calculator', 'dividend-reinvestment-calculator', 'high-yield-savings-calculator',
      'certificate-of-deposit-calculator', 'mutual-fund-calculator',
    ],
    name: 'Compound Interest & Future Value Formula',
    formula: 'A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]',
    latex: 'A = P\\left(1 + \\frac{r}{n}\\right)^{nt} + \\text{PMT} \\cdot \\frac{\\left(1 + \\frac{r}{n}\\right)^{nt} - 1}{r/n}',
    variables: [
      { symbol: 'A', name: 'Future Value', description: 'Total accumulated balance including principal, contributions, and compounded gains' },
      { symbol: 'P', name: 'Initial Principal', description: 'Starting lump-sum deposit or investment' },
      { symbol: 'r', name: 'Annual Return Rate', description: 'Nominal annual rate in decimal form (e.g. 8% = 0.08)' },
      { symbol: 'n', name: 'Compounding Periods/Year', description: 'Frequency interest compounds per year (12 monthly, 1 annually)' },
      { symbol: 't', name: 'Time Horizon (Years)', description: 'Total number of years the capital stays invested' },
    ],
    stepByStep: '1. Divide nominal annual rate r by compounding periods n. 2. Raise (1 + r/n) to the power nt. 3. Multiply by initial deposit P and add the compounded series of recurring contributions PMT.',
    faq: {
      question: 'What is the compound interest formula?',
      answer: 'Compound interest is calculated as A = P(1 + r/n)^(nt) for a lump sum, plus PMT × [((1 + r/n)^(nt) - 1) / (r/n)] when recurring contributions are made each period.',
    },
    translations: {
      es: {
        name: 'Fórmula del Interés Compuesto y Valor Futuro',
        variables: [
          { symbol: 'A', name: 'Valor Futuro', description: 'Capital total acumulado sumando depósitos e intereses compuestos' },
          { symbol: 'P', name: 'Capital Inicial', description: 'Inversión o depósito inicial de partida' },
          { symbol: 'r', name: 'Tasa de Interés Anual', description: 'Rendimiento anual nominal en formato decimal (ej. 8% = 0,08)' },
          { symbol: 'n', name: 'Frecuencia de Capitalización', description: 'Número de capitalizaciones por año (12 mensual, 1 anual)' },
          { symbol: 't', name: 'Plazo en Años', description: 'Duración total de la inversión en años' },
        ],
        stepByStep: '1. Divida la tasa anual r entre n periodos. 2. Eleve (1 + r/n) a la potencia nt. 3. Multiplique por el capital inicial P y sume el valor futuro de las aportaciones periódicas PMT.',
      },
      fr: {
        name: 'Formule des Intérêts Composés et Valeur Future',
        variables: [
          { symbol: 'A', name: 'Valeur Future', description: 'Capital final accumulé incluant versements et intérêts capitalisés' },
          { symbol: 'P', name: 'Capital Initial', description: 'Montant placé au départ' },
          { symbol: 'r', name: 'Taux de Rendement Annuel', description: 'Taux nominal annuel en décimal (ex. 8 % = 0,08)' },
          { symbol: 'n', name: 'Fréquence de Capitalisation', description: 'Nombre de capitalisations par an (12 mensuelle, 1 annuelle)' },
          { symbol: 't', name: 'Durée (Années)', description: 'Horizon de placement total en années' },
        ],
        stepByStep: '1. Divisez le taux annuel r par n. 2. Élevez (1 + r/n) à la puissance nt. 3. Multipliez par P et ajoutez la série capitalisée des versements réguliers PMT.',
      },
      de: {
        name: 'Zinseszinsformel mit Sparraten (Endkapital)',
        variables: [
          { symbol: 'A', name: 'Endkapital', description: 'Gesamtwert aus Anfangskapital, Sparraten und Zinseszinsen' },
          { symbol: 'P', name: 'Anfangskapital', description: 'Einmalige Starteinlage zu Beginn' },
          { symbol: 'r', name: 'Jahreszinssatz', description: 'Nominaler Zinssatz als Dezimalzahl (z. B. 8 % = 0,08)' },
          { symbol: 'n', name: 'Zinsperioden pro Jahr', description: 'Anzahl der Zinsgutschriften pro Jahr (12 monatlich, 1 jährlich)' },
          { symbol: 't', name: 'Anlagedauer (Jahre)', description: 'Gesamtlaufzeit der Geldanlage in Jahren' },
        ],
        stepByStep: '1. Jahreszins r durch n teilen. 2. (1 + r/n) hoch nt potenzieren. 3. Mit Anfangskapital P multiplizieren und den aufgezinsten Endwert der Sparraten PMT addieren.',
      },
    },
  },

  // 3. Simple Interest
  {
    slugs: ['simple-interest-calculator', 'interest-calculator', 'interest-rate-calculator'],
    name: 'Simple Interest Formula',
    formula: 'I = P × r × t  |  A = P(1 + rt)',
    latex: 'I = P \\cdot r \\cdot t, \\quad A = P(1 + rt)',
    variables: [
      { symbol: 'I', name: 'Total Interest', description: 'Interest accrued linearly over the term' },
      { symbol: 'P', name: 'Principal', description: 'Original amount deposited or borrowed' },
      { symbol: 'r', name: 'Annual Interest Rate', description: 'Interest rate per year in decimal form (5% = 0.05)' },
      { symbol: 't', name: 'Time (Years)', description: 'Duration in years' },
    ],
    stepByStep: '1. Convert the annual interest rate to a decimal. 2. Multiply principal P by rate r and years t. 3. Add I to P to find the ending balance A.',
    faq: {
      question: 'What is the simple interest formula?',
      answer: 'Simple interest is computed as I = P × r × t, and total ending balance is A = P(1 + rt), where P is principal, r is annual decimal interest rate, and t is years.',
    },
    translations: {
      es: {
        name: 'Fórmula del Interés Simple',
        variables: [
          { symbol: 'I', name: 'Interés Total', description: 'Interés lineal devengado durante el plazo' },
          { symbol: 'P', name: 'Capital Inicial', description: 'Monto original prestado o invertido' },
          { symbol: 'r', name: 'Tasa Anual', description: 'Tipo de interés anual en decimal (5% = 0,05)' },
          { symbol: 't', name: 'Tiempo (Años)', description: 'Duración total en años' },
        ],
        stepByStep: '1. Convierta el porcentaje anual a decimal. 2. Multiplique P × r × t. 3. Sume I al capital inicial P para obtener el monto final A.',
      },
      fr: {
        name: 'Formule des Intérêts Simples',
        variables: [
          { symbol: 'I', name: 'Intérêts Totaux', description: 'Intérêts linéaires acquis sur la période' },
          { symbol: 'P', name: 'Capital Initial', description: 'Somme initialement placée ou empruntée' },
          { symbol: 'r', name: 'Taux Annuel', description: 'Taux d’intérêt annuel en décimal (5 % = 0,05)' },
          { symbol: 't', name: 'Durée (Années)', description: 'Durée totale en années' },
        ],
        stepByStep: '1. Convertissez le taux annuel en décimal. 2. Multipliez P × r × t. 3. Ajoutez I à P pour obtenir le capital final A.',
      },
      de: {
        name: 'Einfache Zinsformel (ohne Zinseszins)',
        variables: [
          { symbol: 'I', name: 'Gesamtzinsen', description: 'Linear berechneter Zinsertrag über die Laufzeit' },
          { symbol: 'P', name: 'Anfangskapital', description: 'Ursprünglich angelegter oder geliehener Betrag' },
          { symbol: 'r', name: 'Jahreszinssatz', description: 'Zinssatz pro Jahr als Dezimalzahl (5 % = 0,05)' },
          { symbol: 't', name: 'Laufzeit (Jahre)', description: 'Dauer in Jahren' },
        ],
        stepByStep: '1. Jahreszins in Dezimalzahl umwandeln. 2. Kapital P mit Zinssatz r und Laufzeit t multiplizieren. 3. Zinsen I zum Anfangskapital P addieren.',
      },
    },
  },

  // 4. Present Value
  {
    slugs: ['present-value-calculator'],
    name: 'Present Value (Discounted Cash Flow) Formula',
    formula: 'PV = FV / (1 + r)^n',
    latex: 'PV = \\frac{FV}{(1 + r)^n}',
    variables: [
      { symbol: 'PV', name: 'Present Value', description: 'Current worth of a future sum of money' },
      { symbol: 'FV', name: 'Future Value', description: 'Cash amount to be received in the future' },
      { symbol: 'r', name: 'Discount Rate', description: 'Required rate of return per period' },
      { symbol: 'n', name: 'Periods', description: 'Number of discounting periods until receipt' },
    ],
    stepByStep: '1. Add 1 to the discount rate r. 2. Raise (1 + r) to the power n. 3. Divide the future value FV by that discount factor.',
    faq: {
      question: 'What is the Present Value (PV) formula?',
      answer: 'Present Value is calculated using PV = FV / (1 + r)^n, discounting a future cash flow FV back to today at periodic discount rate r over n periods.',
    },
    translations: {
      es: {
        name: 'Fórmula del Valor Presente (Descuento de Flujos)',
        variables: [
          { symbol: 'PV', name: 'Valor Presente', description: 'Valor actual de un flujo de efectivo futuro' },
          { symbol: 'FV', name: 'Valor Futuro', description: 'Monto esperado a recibir en el futuro' },
          { symbol: 'r', name: 'Tasa de Descuento', description: 'Tasa de rendimiento exigida por periodo' },
          { symbol: 'n', name: 'Periodos', description: 'Número de periodos hasta el cobro' },
        ],
        stepByStep: '1. Sume 1 a la tasa de descuento r. 2. Eleve (1 + r) a la potencia n. 3. Divida el valor futuro FV por ese factor.',
      },
      fr: {
        name: 'Formule de la Valeur Actuelle (Actualisation)',
        variables: [
          { symbol: 'PV', name: 'Valeur Actuelle', description: 'Valeur aujourd’hui d’un flux financier futur' },
          { symbol: 'FV', name: 'Valeur Future', description: 'Somme attendue à une date ultérieure' },
          { symbol: 'r', name: 'Taux d’Actualisation', description: 'Taux de rendement exigé par période' },
          { symbol: 'n', name: 'Nombre de Périodes', description: 'Périodes séparant aujourd’hui de l’échéance' },
        ],
        stepByStep: '1. Ajoutez 1 au taux d’actualisation r. 2. Élevez (1 + r) à la puissance n. 3. Divisez la valeur future FV par ce facteur.',
      },
      de: {
        name: 'Barwertformel (Abzinsung / Present Value)',
        variables: [
          { symbol: 'PV', name: 'Barwert (Present Value)', description: 'Heutiger Wert einer zukünftigen Zahlung' },
          { symbol: 'FV', name: 'Zukunftswert (Future Value)', description: 'Erwarteter Betrag in der Zukunft' },
          { symbol: 'r', name: 'Diskontierungssatz', description: 'Kalkulationszinssatz pro Periode' },
          { symbol: 'n', name: 'Perioden', description: 'Anzahl der Abzinsungsperioden' },
        ],
        stepByStep: '1. 1 zum Abzinsungssatz r addieren. 2. (1 + r) hoch n berechnen. 3. Zukunftswert FV durch diesen Abzinsungsfaktor teilen.',
      },
    },
  },

  // 5. Debt-to-Income & Affordability
  {
    slugs: ['debt-to-income-ratio-calculator', 'house-affordability-calculator'],
    name: 'Debt-to-Income (DTI) Ratio Formula',
    formula: 'DTI = (Total Monthly Debt Payments / Gross Monthly Income) × 100',
    latex: '\\text{DTI} = \\frac{\\text{Monthly Debt}}{\\text{Gross Monthly Income}} \\times 100\\%',
    variables: [
      { symbol: 'DTI', name: 'Debt-to-Income Ratio', description: 'Share of gross monthly income absorbed by recurring debt' },
      { symbol: 'Debt', name: 'Monthly Debt Obligations', description: 'Housing PITI plus minimum auto, student, and card payments' },
      { symbol: 'Income', name: 'Gross Monthly Income', description: 'Total verifiable pre-tax monthly income' },
    ],
    stepByStep: '1. Add up housing costs and all recurring minimum monthly debt payments. 2. Divide by gross pre-tax monthly income. 3. Multiply by 100 for percentage.',
    faq: {
      question: 'How is Debt-to-Income (DTI) ratio calculated?',
      answer: 'DTI = (Total Monthly Debt Payments / Gross Monthly Income) × 100. Conventional mortgage underwriting follows the 28%/36% guideline, with 43% as the standard Qualified Mortgage cap.',
    },
    translations: {
      es: {
        name: 'Fórmula de la Relación Deuda-Ingresos (DTI)',
        variables: [
          { symbol: 'DTI', name: 'Ratio Deuda-Ingresos', description: 'Porcentaje del ingreso bruto destinado al pago de deudas' },
          { symbol: 'Debt', name: 'Deudas Mensuales', description: 'Hipoteca/alquiler más cuotas mínimas de préstamos y tarjetas' },
          { symbol: 'Income', name: 'Ingreso Mensual Bruto', description: 'Ingresos mensuales totales antes de impuestos' },
        ],
        stepByStep: '1. Sume todos los pagos mensuales obligatorios de deuda. 2. Divida el total por el ingreso mensual bruto. 3. Multiplique por 100 para obtener el porcentaje.',
      },
      fr: {
        name: 'Formule du Taux d’Endettement (DTI)',
        variables: [
          { symbol: 'DTI', name: 'Taux d’Endettement', description: 'Part des revenus bruts consacrée aux remboursements' },
          { symbol: 'Debt', name: 'Charges Mensuelles', description: 'Mensualités immobilières et crédits récurrents' },
          { symbol: 'Income', name: 'Revenu Mensuel Brut', description: 'Revenus mensuels totaux avant impôts' },
        ],
        stepByStep: '1. Additionnez toutes les mensualités de crédit et charges fixes. 2. Divisez par le revenu mensuel brut. 3. Multipliez par 100 (plafond HCSF en France : 35 %).',
      },
      de: {
        name: 'Formel für die Schulden-Einkommens-Quote (DTI)',
        variables: [
          { symbol: 'DTI', name: 'Schuldenquote (DTI)', description: 'Anteil des Bruttoeinkommens für laufende Kreditraten' },
          { symbol: 'Debt', name: 'Monatliche Schuldendienst-Raten', description: 'Summe aus Baufinanzierung, Ratenkrediten und Kartenraten' },
          { symbol: 'Income', name: 'Monatl. Bruttoeinkommen', description: 'Gesamtes monatliches Einkommen vor Steuern' },
        ],
        stepByStep: '1. Alle monatlichen Kredit- und Immobilienraten addieren. 2. Durch das monatliche Bruttoeinkommen teilen. 3. Mit 100 multiplizieren, um den Prozentsatz zu erhalten.',
      },
    },
  },

  // 6. IRR
  {
    slugs: ['irr-calculator'],
    name: 'Internal Rate of Return (IRR) Equation',
    formula: 'NPV = Σ [ CF_t / (1 + IRR)^t ] = 0',
    latex: '\\text{NPV} = \\sum_{t=0}^{N} \\frac{CF_t}{(1 + \\text{IRR})^t} = 0',
    variables: [
      { symbol: 'CF_t', name: 'Net Cash Flow at Period t', description: 'Cash inflow (+) or initial investment outflow (-) in period t' },
      { symbol: 'IRR', name: 'Internal Rate of Return', description: 'Discount rate that sets Net Present Value exactly to zero' },
      { symbol: 'N', name: 'Total Periods', description: 'Project lifespan in years or compounding periods' },
    ],
    stepByStep: '1. List initial outflow CF_0 (negative) and subsequent inflows CF_1..CF_N. 2. Iteratively solve for the discount rate IRR where the sum of discounted cash flows equals zero using Newton-Raphson.',
    faq: {
      question: 'What is the Internal Rate of Return (IRR) formula?',
      answer: 'IRR is the discount rate that satisfies Σ [CF_t / (1 + IRR)^t] = 0, making an investment’s Net Present Value (NPV) equal to zero.',
    },
    translations: {
      es: {
        name: 'Ecuación de la Tasa Interna de Retorno (TIR / IRR)',
        variables: [
          { symbol: 'CF_t', name: 'Flujo de Caja en t', description: 'Entrada neta (+) o desembolso inicial (-) en el periodo t' },
          { symbol: 'IRR', name: 'Tasa Interna de Retorno (TIR)', description: 'Tasa de descuento que iguala el VAN a cero' },
          { symbol: 'N', name: 'Periodos Totales', description: 'Horizonte temporal total del proyecto' },
        ],
        stepByStep: '1. Registre el desembolso inicial CF_0 (negativo) y los flujos futuros. 2. Resuelva iterativamente la tasa TIR que hace que el Valor Actual Neto (VAN) sea cero.',
      },
      fr: {
        name: 'Équation du Taux de Rendement Interne (TRI / IRR)',
        variables: [
          { symbol: 'CF_t', name: 'Flux de Trésorerie à t', description: 'Encaissement (+) ou décaissement initial (-) à la période t' },
          { symbol: 'IRR', name: 'Taux de Rendement Interne (TRI)', description: 'Taux d’actualisation annulant la Valeur Actuelle Nette (VAN)' },
          { symbol: 'N', name: 'Nombre de Périodes', description: 'Durée de vie totale du projet' },
        ],
        stepByStep: '1. Listez l’investissement initial CF_0 (négatif) et les flux futurs. 2. Résolvez numériquement le taux TRI qui annule la somme des flux actualisés.',
      },
      de: {
        name: 'Gleichung des Internen Zinsfußes (IRR)',
        variables: [
          { symbol: 'CF_t', name: 'Cashflow in Periode t', description: 'Einzahlung (+) oder Anfangsinvestition (-) zum Zeitpunkt t' },
          { symbol: 'IRR', name: 'Interner Zinsfuß (IRR)', description: 'Zinssatz, bei dem der Kapitalwert (NPV) exakt null beträgt' },
          { symbol: 'N', name: 'Gesamtlaufzeit', description: 'Anzahl der Projektperioden' },
        ],
        stepByStep: '1. Anfangsauszahlung CF_0 (negativ) und Folge-Cashflows auflisten. 2. Den Zinssatz IRR iterativ (Newton-Verfahren) bestimmen, bei dem der Kapitalwert genau null ist.',
      },
    },
  },

  // 7. APR & Effective Cost
  {
    slugs: ['apr-calculator', 'cash-back-vs-low-interest-calculator'],
    name: 'True Annual Percentage Rate (APR) Formula',
    formula: 'Loan - Fees = Σ [ M / (1 + APR/12)^k ]',
    latex: 'P - F = \\sum_{k=1}^{n} \\frac{M}{(1 + \\text{APR}/12)^k}',
    variables: [
      { symbol: 'P', name: 'Gross Loan Amount', description: 'Face principal borrowed before lender fees' },
      { symbol: 'F', name: 'Upfront Fees & Points', description: 'Origination fees, discount points, and prepaid finance charges' },
      { symbol: 'M', name: 'Scheduled Monthly Payment', description: 'Monthly payment computed on the stated note rate' },
      { symbol: 'APR', name: 'True Annual Percentage Rate', description: 'All-in annualized borrowing cost including fees' },
    ],
    stepByStep: '1. Calculate monthly payment M from principal P and note rate. 2. Subtract upfront finance charges F from P to get net amount financed. 3. Solve iteratively for the rate APR equating payments M to (P - F).',
    faq: {
      question: 'How is true APR calculated differently from the interest rate?',
      answer: 'True APR folds upfront loan fees and points F into the borrowing cost by solving for the effective rate that equates your scheduled monthly payments M to the net proceeds (P - F).',
    },
    translations: {
      es: {
        name: 'Fórmula de la Tasa Anual Equivalente (TAE / APR)',
        variables: [
          { symbol: 'P', name: 'Capital Nominal', description: 'Importe bruto solicitado antes de comisiones' },
          { symbol: 'F', name: 'Comisiones Iniciales', description: 'Gastos de apertura, estudio y costes financiados' },
          { symbol: 'M', name: 'Cuota Mensual', description: 'Pago mensual calculado al tipo nominal (TIN)' },
          { symbol: 'APR', name: 'TAE / APR Real', description: 'Coste efectivo anualizado incluyendo gastos' },
        ],
        stepByStep: '1. Calcule la cuota mensual M con el tipo nominal. 2. Reste las comisiones F del capital P. 3. Resuelva iterativamente la TAE que iguala las cuotas M al capital neto (P - F).',
      },
      fr: {
        name: 'Formule du Taux Annuel Effectif Global (TAEG / APR)',
        variables: [
          { symbol: 'P', name: 'Capital Emprunté', description: 'Montant brut du crédit avant frais de dossier' },
          { symbol: 'F', name: 'Frais Annexes', description: 'Frais de dossier, garantie et commissions initiales' },
          { symbol: 'M', name: 'Mensualité', description: 'Échéance calculée au taux nominal' },
          { symbol: 'APR', name: 'TAEG Réel', description: 'Coût total annualisé du crédit frais inclus' },
        ],
        stepByStep: '1. Calculez la mensualité M au taux nominal. 2. Déduisez les frais F du capital P. 3. Résolvez par itération le TAEG égalisant les mensualités au capital net (P - F).',
      },
      de: {
        name: 'Formel für den Effektiven Jahreszins (APR)',
        variables: [
          { symbol: 'P', name: 'Nettodarlehensbetrag', description: 'Nennbetrag des Kredits vor Gebühren' },
          { symbol: 'F', name: 'Bearbeitungsgebühren & Disagio', description: 'Einmalige Abschluss- und Finanzierungskosten' },
          { symbol: 'M', name: 'Monatsrate', description: 'Rate auf Basis des gebundenen Sollzinssatzes' },
          { symbol: 'APR', name: 'Effektiver Jahreszins', description: 'Tatsächliche jährliche Gesamtkosten inkl. Nebenkosten' },
        ],
        stepByStep: '1. Monatsrate M anhand des Sollzinses berechnen. 2. Einmalige Gebühren F vom Auszahlungsbetrag abziehen. 3. Effektivzins iterativ so lösen, dass die abgezinsten Raten (P - F) entsprechen.',
      },
    },
  },

  // 8. Debt & Credit Card Payoff Time
  {
    slugs: [
      'debt-payoff-calculator', 'credit-cards-payoff', 'credit-card-minimum-payment-calculator',
      'mortgage-payoff-calculator', 'debt-consolidation-calculator',
    ],
    name: 'Loan & Credit Card Payoff Duration Formula',
    formula: 'N = -ln(1 - (B × r) / PMT) / ln(1 + r)',
    latex: 'N = -\\frac{\\ln\\left(1 - \\frac{B \\cdot r}{\\text{PMT}}\\right)}{\\ln(1 + r)}',
    variables: [
      { symbol: 'N', name: 'Months to Debt-Free', description: 'Total monthly payments required to zero the balance' },
      { symbol: 'B', name: 'Current Balance', description: 'Remaining unpaid principal balance' },
      { symbol: 'r', name: 'Monthly Interest Rate', description: 'Annual APR divided by 12' },
      { symbol: 'PMT', name: 'Monthly Payment', description: 'Fixed monthly amount paid (must exceed B × r)' },
    ],
    stepByStep: '1. Compute monthly interest charge B × r. 2. Divide by your monthly payment PMT and subtract from 1. 3. Take the natural logarithm and divide by -ln(1 + r).',
    faq: {
      question: 'How do you calculate the months required to pay off debt or a credit card?',
      answer: 'Payoff months are given by N = -ln(1 - (B × r) / PMT) / ln(1 + r), where B is current balance, r is monthly rate (APR/12), and PMT is your monthly payment.',
    },
    translations: {
      es: {
        name: 'Fórmula de Tiempo de Liquidación de Deudas y Tarjetas',
        variables: [
          { symbol: 'N', name: 'Meses hasta Liquidar', description: 'Número de cuotas mensuales hasta dejar el saldo en cero' },
          { symbol: 'B', name: 'Saldo Actual', description: 'Deuda pendiente por amortizar' },
          { symbol: 'r', name: 'Tasa Mensual', description: 'Tasa anual (APR/TAE) dividida entre 12' },
          { symbol: 'PMT', name: 'Pago Mensual', description: 'Abono mensual fijo (debe superar B × r)' },
        ],
        stepByStep: '1. Calcule el interés mensual B × r. 2. Divida por su pago mensual PMT y réstelo de 1. 3. Aplique el logaritmo natural y divida entre -ln(1 + r).',
      },
      fr: {
        name: 'Formule de Durée de Remboursement d’une Dette',
        variables: [
          { symbol: 'N', name: 'Mois avant Solde Nul', description: 'Nombre de mensualités nécessaires pour solder la dette' },
          { symbol: 'B', name: 'Solde Restant Dû', description: 'Capital restant à rembourser' },
          { symbol: 'r', name: 'Taux Mensuel', description: 'Taux annuel divisé par 12' },
          { symbol: 'PMT', name: 'Versement Mensuel', description: 'Paiement mensuel fixe (doit dépasser B × r)' },
        ],
        stepByStep: '1. Calculez les intérêts mensuels B × r. 2. Divisez par PMT et soustrayez de 1. 3. Prenez le logarithme népérien et divisez par -ln(1 + r).',
      },
      de: {
        name: 'Formel für die Schulden- & Kreditkarten-Tilgungsdauer',
        variables: [
          { symbol: 'N', name: 'Monate bis Schuldenfreiheit', description: 'Benötigte Monatsraten bis zur vollständigen Tilgung' },
          { symbol: 'B', name: 'Restschuld', description: 'Aktuell offener Saldo' },
          { symbol: 'r', name: 'Monatszinssatz', description: 'Jahreszinssatz geteilt durch 12' },
          { symbol: 'PMT', name: 'Monatliche Rückzahlung', description: 'Feste Monatsrate (muss größer als B × r sein)' },
        ],
        stepByStep: '1. Monatliche Zinskosten B × r berechnen. 2. Durch Rate PMT teilen und von 1 abziehen. 3. Natürlichen Logarithmus bilden und durch -ln(1 + r) dividieren.',
      },
    },
  },

  // 9. Retirement, 401(k) & FIRE
  {
    slugs: [
      '401k-calculator', '401k-growth-calculator', 'roth-ira-calculator',
      'retirement-calculator', 'early-retirement-fire-calculator', 'college-cost-calculator',
    ],
    name: 'Retirement Nest Egg & FIRE Number Formula',
    formula: 'FV = P(1+r)^t + C × [((1+r)^t - 1)/r]  |  FIRE Target = Annual Expenses / SWR',
    latex: 'FV = P(1+r)^t + C\\frac{(1+r)^t - 1}{r}, \\quad \\text{FIRE} = \\frac{\\text{Annual Expenses}}{\\text{SWR}}',
    variables: [
      { symbol: 'FV', name: 'Projected Nest Egg', description: 'Total retirement portfolio at target retirement age' },
      { symbol: 'C', name: 'Annual Contribution', description: 'Employee contribution plus employer match per year' },
      { symbol: 'r', name: 'Real Annual Return', description: 'Expected annualized portfolio return (often inflation-adjusted)' },
      { symbol: 'SWR', name: 'Safe Withdrawal Rate', description: 'Sustainable annual withdrawal rate (typically 4% = 0.04, or 25× rule)' },
    ],
    stepByStep: '1. Compound existing balance P at annual return r over t years. 2. Add compounded annual contributions C (including match). 3. Compare against FIRE target (25× annual expenses at 4% SWR).',
    faq: {
      question: 'How is retirement savings growth and the FIRE target calculated?',
      answer: 'Retirement balance grows via FV = P(1+r)^t + C[((1+r)^t - 1)/r], and the financial independence target equals Annual Expenses divided by the Safe Withdrawal Rate (25× expenses at 4%).',
    },
    translations: {
      es: {
        name: 'Fórmula de Fondo de Jubilación y Número FIRE',
        variables: [
          { symbol: 'FV', name: 'Patrimonio Proyectado', description: 'Capital acumulado al llegar a la edad de retiro' },
          { symbol: 'C', name: 'Aportación Anual', description: 'Ahorro anual propio más aportación del empleador' },
          { symbol: 'r', name: 'Rentabilidad Real Anual', description: 'Rendimiento anual esperado ajustado por inflación' },
          { symbol: 'SWR', name: 'Tasa Segura de Retiro', description: 'Porcentaje anual retirable (regla del 4% = 25× gastos)' },
        ],
        stepByStep: '1. Capitalice el saldo actual P a la tasa r durante t años. 2. Sume las aportaciones anuales capitalizadas C. 3. Compare el total con el objetivo FIRE (gastos anuales / 0,04).',
      },
      fr: {
        name: 'Formule d’Épargne Retraite et Objectif FIRE',
        variables: [
          { symbol: 'FV', name: 'Capital Retraite Projeté', description: 'Patrimoine financier constitué à l’âge de départ' },
          { symbol: 'C', name: 'Versement Annuel', description: 'Épargne annuelle plus abondement employeur' },
          { symbol: 'r', name: 'Rendement Réel Annuel', description: 'Performance annuelle attendue nette d’inflation' },
          { symbol: 'SWR', name: 'Taux de Retrait Sûr', description: 'Taux de retrait annuel durable (règle des 4 % = 25× dépenses)' },
        ],
        stepByStep: '1. Capitalisez l’épargne actuelle P au taux r sur t ans. 2. Ajoutez les versements annuels C capitalisés. 3. Comparez avec l’objectif FIRE (dépenses annuelles / 0,04).',
      },
      de: {
        name: 'Altersvorsorge- & FIRE-Kapitalformel (4-%-Regel)',
        variables: [
          { symbol: 'FV', name: 'Prognostiziertes Endvermögen', description: 'Angespartes Vorsorgekapital zum Renteneintritt' },
          { symbol: 'C', name: 'Jährliche Sparleistung', description: 'Eigene Einzahlungen plus Arbeitgeberzuschuss pro Jahr' },
          { symbol: 'r', name: 'Reale Jahresrendite', description: 'Erwartete inflationsbereinigte Portfoliorendite' },
          { symbol: 'SWR', name: 'Sichere Entnahmerate', description: 'Nachhaltige jährliche Entnahmequote (meist 4 % bzw. 25× Ausgaben)' },
        ],
        stepByStep: '1. Bestehendes Vermögen P über t Jahre mit r verzinsen. 2. Aufgezinste jährliche Sparraten C addieren. 3. Mit dem FIRE-Ziel (Jahresausgaben / 0,04) abgleichen.',
      },
    },
  },

  // 10. Annuity & RMD Payout
  {
    slugs: ['annuity-calculator', 'annuity-payout-calculator', 'rmd-calculator', 'social-security-calculator'],
    name: 'Annuity Payout & Required Minimum Distribution Formula',
    formula: 'PMT = PV × [ r / (1 - (1 + r)^-n) ]  |  RMD = Balance / Distribution Period',
    latex: '\\text{PMT} = PV \\cdot \\frac{r}{1 - (1 + r)^{-n}}, \\quad \\text{RMD} = \\frac{\\text{Prior Year-End Balance}}{\\text{IRS Factor}}',
    variables: [
      { symbol: 'PMT', name: 'Periodic Payout', description: 'Fixed income distributed each month or year' },
      { symbol: 'PV', name: 'Starting Principal', description: 'Account value at payout commencement' },
      { symbol: 'r', name: 'Periodic Rate', description: 'Expected yield per payout period' },
      { symbol: 'n', name: 'Payout Periods', description: 'Total number of scheduled distributions' },
    ],
    stepByStep: '1. For fixed annuities, compute 1 - (1 + r)^-n and divide PV × r by it. 2. For IRS RMDs, divide prior Dec 31 tax-deferred balance by your age factor from the IRS Uniform Lifetime Table.',
    faq: {
      question: 'How are annuity payouts and RMDs calculated?',
      answer: 'Fixed annuity payouts use PMT = PV × [r / (1 - (1 + r)^-n)], while Required Minimum Distributions divide prior December 31 account balance by the IRS Uniform Lifetime Table factor.',
    },
    translations: {
      es: {
        name: 'Fórmula de Renta Vitalicia (Anualidad) y Retiro Mínimo',
        variables: [
          { symbol: 'PMT', name: 'Pago Periódico', description: 'Renta fija recibida cada mes o año' },
          { symbol: 'PV', name: 'Capital Inicial', description: 'Saldo acumulado al iniciar los cobros' },
          { symbol: 'r', name: 'Tasa Periódica', description: 'Rendimiento esperado por periodo de pago' },
          { symbol: 'n', name: 'Periodos de Pago', description: 'Número total de rentas programadas' },
        ],
        stepByStep: '1. Calcule 1 - (1 + r)^-n y divida PV × r entre ese valor para obtener la renta fija. 2. Para RMD, divida el saldo de fin de año por el factor actuarial de expectativa de vida.',
      },
      fr: {
        name: 'Formule de Rente (Annuité) et Retrait Minimum',
        variables: [
          { symbol: 'PMT', name: 'Rente Périodique', description: 'Revenu fixe versé chaque mois ou année' },
          { symbol: 'PV', name: 'Capital de Départ', description: 'Valeur du contrat au début de la phase de versement' },
          { symbol: 'r', name: 'Taux Périodique', description: 'Taux de rendement par période de versement' },
          { symbol: 'n', name: 'Nombre de Versements', description: 'Total des échéances de rente prévues' },
        ],
        stepByStep: '1. Calculez 1 - (1 + r)^-n puis divisez PV × r par ce résultat pour la rente fixe. 2. Pour le RMD, divisez le solde au 31 décembre par le diviseur actuariel d’âge.',
      },
      de: {
        name: 'Entnahmeplan- (Renten-) & Pflichtentnahmeformel',
        variables: [
          { symbol: 'PMT', name: 'Periodische Auszahlung', description: 'Regelmäßige Rente pro Monat oder Jahr' },
          { symbol: 'PV', name: 'Startkapital', description: 'Kontostand zu Beginn der Auszahlungsphase' },
          { symbol: 'r', name: 'Periodenzinssatz', description: 'Erwartete Rendite je Auszahlungsperiode' },
          { symbol: 'n', name: 'Auszahlungsperioden', description: 'Gesamtanzahl der geplanten Entnahmen' },
        ],
        stepByStep: '1. Für einen Auszahlplan 1 - (1 + r)^-n berechnen und PV × r dadurch teilen. 2. Für RMD den Vorjahresendstand durch den altersabhängigen Verteilungsfaktor teilen.',
      },
    },
  },

  // 11. Inflation
  {
    slugs: ['inflation-calculator'],
    name: 'Cumulative Inflation & Purchasing Power Formula',
    formula: 'Future Equivalent = P × (1 + π)^t  |  Real Value = P / (1 + π)^t',
    latex: 'FV_{\\text{inf}} = P(1 + \\pi)^t, \\quad \\text{Real Value} = \\frac{P}{(1 + \\pi)^t}',
    variables: [
      { symbol: 'P', name: 'Starting Dollar Amount', description: 'Baseline cash sum in base-year currency' },
      { symbol: 'π', name: 'Annual Inflation Rate', description: 'Average annual CPI price increase in decimal (e.g. 3% = 0.03)' },
      { symbol: 't', name: 'Years Elapsed', description: 'Time interval in years' },
    ],
    stepByStep: '1. Add 1 to the annual inflation rate π. 2. Raise (1 + π) to the power t. 3. Multiply P to project future cost, or divide P to measure remaining purchasing power.',
    faq: {
      question: 'How do you calculate inflation impact on purchasing power?',
      answer: 'Future cost equivalent equals P × (1 + π)^t, while today’s purchasing power of future cash equals P / (1 + π)^t, where π is annual inflation and t is years.',
    },
    translations: {
      es: {
        name: 'Fórmula de Inflación Acumulada y Poder Adquisitivo',
        variables: [
          { symbol: 'P', name: 'Monto Base', description: 'Importe inicial en moneda del año base' },
          { symbol: 'π', name: 'Tasa de Inflación Anual', description: 'Incremento medio anual del IPC en decimal (3% = 0,03)' },
          { symbol: 't', name: 'Años Transcurridos', description: 'Horizonte temporal en años' },
        ],
        stepByStep: '1. Sume 1 a la tasa anual de inflación π. 2. Eleve (1 + π) a la potencia t. 3. Multiplique P para costo futuro o divida P para medir poder adquisitivo real.',
      },
      fr: {
        name: 'Formule de l’Inflation Cumulée et du Pouvoir d’Achat',
        variables: [
          { symbol: 'P', name: 'Montant de Départ', description: 'Somme initiale exprimée en devise de l’année de référence' },
          { symbol: 'π', name: 'Taux d’Inflation Annuel', description: 'Hausse annuelle moyenne de l’IPC en décimal (3 % = 0,03)' },
          { symbol: 't', name: 'Nombre d’Années', description: 'Horizon temporel en années' },
        ],
        stepByStep: '1. Ajoutez 1 au taux d’inflation π. 2. Élevez (1 + π) à la puissance t. 3. Multipliez P pour le coût futur ou divisez P pour le pouvoir d’achat réel.',
      },
      de: {
        name: 'Inflations- & Kaufkraftverlust-Formel',
        variables: [
          { symbol: 'P', name: 'Ausgangsbetrag', description: 'Geldbetrag im Basisjahr' },
          { symbol: 'π', name: 'Jährliche Inflationsrate', description: 'Durchschnittliche Teuerungsrate als Dezimalzahl (3 % = 0,03)' },
          { symbol: 't', name: 'Zeitraum (Jahre)', description: 'Anzahl der Jahre' },
        ],
        stepByStep: '1. 1 zur jährlichen Inflationsrate π addieren. 2. (1 + π) hoch t berechnen. 3. Mit P multiplizieren für künftige Preise oder P teilen für verbleibende Kaufkraft.',
      },
    },
  },

  // 12. Profit Margin vs Markup
  {
    slugs: ['margin-calculator'],
    name: 'Gross Profit Margin & Markup Formulas',
    formula: 'Margin = [(Revenue - Cost) / Revenue] × 100  |  Markup = [(Revenue - Cost) / Cost] × 100',
    latex: '\\text{Margin} = \\frac{R - C}{R} \\times 100\\%, \\quad \\text{Markup} = \\frac{R - C}{C} \\times 100\\%',
    variables: [
      { symbol: 'R', name: 'Selling Price / Revenue', description: 'Net sales price charged to the customer' },
      { symbol: 'C', name: 'Cost of Goods Sold (COGS)', description: 'Direct production or wholesale acquisition cost' },
      { symbol: 'Margin', name: 'Gross Margin (%)', description: 'Percentage of selling price retained as gross profit' },
      { symbol: 'Markup', name: 'Markup (%)', description: 'Percentage added on top of unit cost' },
    ],
    stepByStep: '1. Subtract cost C from revenue R to find gross profit. 2. Divide profit by revenue R for Margin, or by cost C for Markup. 3. Multiply by 100.',
    faq: {
      question: 'What is the difference between profit margin and markup formulas?',
      answer: 'Gross margin divides profit by selling price [(R - C) / R × 100], whereas markup divides profit by unit cost [(R - C) / C × 100]. A 50% markup produces a 33.33% gross margin.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Margen Comercial y Recargo (Markup)',
        variables: [
          { symbol: 'R', name: 'Precio de Venta (Ingreso)', description: 'Importe neto cobrado al cliente' },
          { symbol: 'C', name: 'Costo Directo (COGS)', description: 'Costo de compra o producción por unidad' },
          { symbol: 'Margin', name: 'Margen Bruto (%)', description: 'Porcentaje del precio de venta que es beneficio' },
          { symbol: 'Markup', name: 'Recargo / Markup (%)', description: 'Porcentaje añadido sobre el costo' },
        ],
        stepByStep: '1. Reste el costo C del precio de venta R. 2. Divida el beneficio por R para Margen o por C para Markup. 3. Multiplique por 100.',
      },
      fr: {
        name: 'Formules de Taux de Marge et Taux de Marque',
        variables: [
          { symbol: 'R', name: 'Prix de Vente HT', description: 'Chiffre d’affaires net facturé au client' },
          { symbol: 'C', name: 'Coût d’Achat HT', description: 'Coût de revient unitaire direct' },
          { symbol: 'Margin', name: 'Taux de Marque (%)', description: 'Part de la marge commerciale dans le prix de vente' },
          { symbol: 'Markup', name: 'Taux de Marge (%)', description: 'Pourcentage ajouté au coût d’achat' },
        ],
        stepByStep: '1. Soustrayez le coût C du prix de vente R. 2. Divisez la marge par R (taux de marque) ou par C (taux de marge). 3. Multipliez par 100.',
      },
      de: {
        name: 'Handelsspanne (Marge) & Kalkulationsaufschlag-Formel',
        variables: [
          { symbol: 'R', name: 'Nettoverkaufspreis', description: 'Erlös bzw. Verkaufspreis ohne Umsatzsteuer' },
          { symbol: 'C', name: 'Einkaufspreis (Selbstkosten)', description: 'Direkte Waren- oder Herstellungskosten' },
          { symbol: 'Margin', name: 'Handelsspanne / Marge (%)', description: 'Gewinnanteil bezogen auf den Verkaufspreis' },
          { symbol: 'Markup', name: 'Kalkulationsaufschlag (%)', description: 'Aufschlag bezogen auf den Einkaufspreis' },
        ],
        stepByStep: '1. Einkaufspreis C vom Verkaufspreis R abziehen. 2. Gewinn durch R teilen für die Marge bzw. durch C für den Aufschlag. 3. Mit 100 multiplizieren.',
      },
    },
  },

  // 13. Discount / Percent Off
  {
    slugs: ['percent-off-calculator'],
    name: 'Sale Discount & Final Price Formula',
    formula: 'Savings = P × (d / 100)  |  Final Price = P × (1 - d / 100)',
    latex: '\\text{Final Price} = P \\left(1 - \\frac{d}{100}\\right), \\quad \\text{Savings} = P \\cdot \\frac{d}{100}',
    variables: [
      { symbol: 'P', name: 'Original Price', description: 'List price before promotional discount' },
      { symbol: 'd', name: 'Discount Percentage', description: 'Markdown rate expressed as a percentage (e.g. 25%)' },
    ],
    stepByStep: '1. Divide discount percentage d by 100. 2. Multiply by original price P to find dollar savings. 3. Subtract savings from P to get the discounted sale price.',
    faq: {
      question: 'How do you calculate a percent-off sale price?',
      answer: 'Multiply the original price by (1 - d/100). For stacked discounts d1 and d2, apply sequentially: Final = P × (1 - d1/100) × (1 - d2/100).',
    },
    translations: {
      es: {
        name: 'Fórmula de Descuento y Precio Rebajado',
        variables: [
          { symbol: 'P', name: 'Precio Original', description: 'Precio de lista antes de la rebaja' },
          { symbol: 'd', name: 'Porcentaje de Descuento', description: 'Tasa de rebaja aplicada en %' },
        ],
        stepByStep: '1. Divida el descuento d entre 100. 2. Multiplique por P para hallar el ahorro. 3. Reste el ahorro de P para obtener el precio final.',
      },
      fr: {
        name: 'Formule de Remise et Prix Soldé',
        variables: [
          { symbol: 'P', name: 'Prix Initial', description: 'Prix affiché avant réduction' },
          { symbol: 'd', name: 'Pourcentage de Remise', description: 'Taux de réduction en pourcentage' },
        ],
        stepByStep: '1. Divisez le taux d par 100. 2. Multipliez par le prix initial P pour l’économie réalisée. 3. Soustrayez l’économie de P pour le prix final.',
      },
      de: {
        name: 'Rabatt- & Endpreis-Formel',
        variables: [
          { symbol: 'P', name: 'Ursprungspreis', description: 'Regulärer Listenpreis vor Rabattabzug' },
          { symbol: 'd', name: 'Rabattprozentsatz', description: 'Preisnachlass in Prozent' },
        ],
        stepByStep: '1. Rabatt d durch 100 teilen. 2. Mit dem Ausgangspreis P multiplizieren für die Ersparnis. 3. Ersparnis von P abziehen.',
      },
    },
  },

  // 14. Sales Tax & VAT
  {
    slugs: ['sales-tax-calculator', 'vat-calculator'],
    name: 'Sales Tax & VAT (Add / Remove) Formulas',
    formula: 'Gross = Net × (1 + t)  |  Net = Gross / (1 + t)  |  Tax = Gross - Net',
    latex: '\\text{Gross} = \\text{Net}(1 + t), \\quad \\text{Net} = \\frac{\\text{Gross}}{1 + t}',
    variables: [
      { symbol: 'Net', name: 'Pre-Tax Net Amount', description: 'Base price excluding sales tax or VAT' },
      { symbol: 'Gross', name: 'Tax-Inclusive Total', description: 'Final checkout price including tax' },
      { symbol: 't', name: 'Tax Rate (Decimal)', description: 'Applicable sales tax or VAT rate (e.g. 19% = 0.19)' },
    ],
    stepByStep: '1. To add tax: multiply net price by (1 + t). 2. To extract VAT from a gross price: divide gross price by (1 + t) — never subtract t directly from gross.',
    faq: {
      question: 'How do you add or reverse-calculate sales tax and VAT?',
      answer: 'To add tax, compute Net × (1 + t). To remove VAT from a tax-inclusive gross amount, divide by (1 + t): Net = Gross / (1 + t), then Tax = Gross - Net.',
    },
    translations: {
      es: {
        name: 'Fórmulas de IVA e Impuesto sobre Ventas (Añadir / Desglosar)',
        variables: [
          { symbol: 'Net', name: 'Base Imponible (Neto)', description: 'Importe sin impuestos incluidos' },
          { symbol: 'Gross', name: 'Total con Impuestos (Bruto)', description: 'Precio final IVA incluido' },
          { symbol: 't', name: 'Tipo Impositivo', description: 'Tasa de IVA en decimal (ej. 21% = 0,21)' },
        ],
        stepByStep: '1. Para añadir IVA: multiplique el neto por (1 + t). 2. Para desglosar el IVA de un precio bruto: divida el bruto por (1 + t).',
      },
      fr: {
        name: 'Formules de TVA (HT vers TTC et TTC vers HT)',
        variables: [
          { symbol: 'Net', name: 'Montant Hors Taxes (HT)', description: 'Prix de base avant application de la TVA' },
          { symbol: 'Gross', name: 'Montant TTC', description: 'Prix final toutes taxes comprises' },
          { symbol: 't', name: 'Taux de TVA', description: 'Taux de TVA en décimal (ex. 20 % = 0,20)' },
        ],
        stepByStep: '1. Pour passer de HT à TTC : multipliez HT par (1 + t). 2. Pour extraire la TVA d’un prix TTC : divisez TTC par (1 + t).',
      },
      de: {
        name: 'Mehrwertsteuer-Formel (Netto-Brutto & MwSt. herausrechnen)',
        variables: [
          { symbol: 'Net', name: 'Nettobetrag', description: 'Preis ohne Umsatzsteuer' },
          { symbol: 'Gross', name: 'Bruttobetrag', description: 'Endpreis inklusive Mehrwertsteuer' },
          { symbol: 't', name: 'Steuersatz (Dezimal)', description: 'Gültiger MwSt.-Satz (z. B. 19 % = 0,19)' },
        ],
        stepByStep: '1. MwSt. aufschlagen: Netto × (1 + t). 2. MwSt. aus Brutto herausrechnen: Brutto geteilt durch (1 + t), danach Steuer = Brutto - Netto.',
      },
    },
  },

  // 15. Tip & Split
  {
    slugs: ['tip-calculator'],
    name: 'Gratuity Tip & Split Bill Formula',
    formula: 'Tip = Bill × (p / 100)  |  Per Person = (Bill + Tip) / N',
    latex: '\\text{Tip} = B \\cdot \\frac{p}{100}, \\quad \\text{Per Person} = \\frac{B(1 + p/100)}{N}',
    variables: [
      { symbol: 'B', name: 'Subtotal Bill', description: 'Pre-tax or check total before gratuity' },
      { symbol: 'p', name: 'Tip Percentage', description: 'Selected service gratuity rate (e.g. 15%, 18%, 20%)' },
      { symbol: 'N', name: 'Number of Guests', description: 'People splitting the total check evenly' },
    ],
    stepByStep: '1. Multiply subtotal B by tip percentage p/100. 2. Add tip to B for total bill. 3. Divide total by N guests to get each person’s share.',
    faq: {
      question: 'What is the formula for calculating a tip and splitting a bill?',
      answer: 'Tip = Bill × (p / 100), Total = Bill + Tip, and Per-Person Cost = Total / N guests.',
    },
    translations: {
      es: {
        name: 'Fórmula de Propina y División de Cuenta',
        variables: [
          { symbol: 'B', name: 'Cuenta Subtotal', description: 'Importe de la factura antes de la propina' },
          { symbol: 'p', name: 'Porcentaje de Propina', description: 'Gratificación de servicio (ej. 10%, 15%, 20%)' },
          { symbol: 'N', name: 'Comensales', description: 'Personas que dividen la cuenta a partes iguales' },
        ],
        stepByStep: '1. Multiplique la cuenta B por p/100. 2. Sume la propina a B. 3. Divida el total entre N personas.',
      },
      fr: {
        name: 'Formule de Pourboire et Partage d’Addition',
        variables: [
          { symbol: 'B', name: 'Montant de l’Addition', description: 'Total de la note avant pourboire' },
          { symbol: 'p', name: 'Taux de Pourboire', description: 'Pourcentage de service choisi (ex. 10 %, 15 %, 20 %)' },
          { symbol: 'N', name: 'Nombre de Convives', description: 'Nombre de personnes partageant la note' },
        ],
        stepByStep: '1. Multipliez la note B par p/100. 2. Ajoutez le pourboire à B. 3. Divisez le total par N convives.',
      },
      de: {
        name: 'Trinkgeld- & Rechnungsaufteilungs-Formel',
        variables: [
          { symbol: 'B', name: 'Rechnungsbetrag', description: 'Offener Rechnungsbetrag ohne Trinkgeld' },
          { symbol: 'p', name: 'Trinkgeldsatz (%)', description: 'Gewählter Prozentsatz (z. B. 10 %, 15 %, 20 %)' },
          { symbol: 'N', name: 'Anzahl Personen', description: 'Anzahl der Gäste zur gleichmäßigen Aufteilung' },
        ],
        stepByStep: '1. Rechnung B mit p/100 multiplizieren. 2. Trinkgeld zum Betrag B addieren. 3. Gesamtsumme durch N Personen teilen.',
      },
    },
  },

  // 16. Salary & Hourly Conversion
  {
    slugs: [
      'salary-calculator', 'hourly-to-salary-calculator',
      'salary-to-hourly-calculator', 'biweekly-salary-calculator',
    ],
    name: 'Annual Salary & Hourly Wage Conversion Formula',
    formula: 'Annual Salary = Hourly Rate × H × W  |  Biweekly = Annual / 26',
    latex: '\\text{Annual} = R_{\\text{hr}} \\times H \\times W, \\quad \\text{Biweekly} = \\frac{\\text{Annual}}{26}',
    variables: [
      { symbol: 'R_hr', name: 'Hourly Rate', description: 'Gross compensation earned per work hour' },
      { symbol: 'H', name: 'Hours per Week', description: 'Scheduled weekly hours (standard full-time = 40)' },
      { symbol: 'W', name: 'Paid Weeks per Year', description: 'Paid weeks annually (52 standard = 2,080 hours/year)' },
    ],
    stepByStep: '1. Multiply weekly hours H by paid weeks W (40 × 52 = 2,080). 2. Multiply by hourly rate for gross annual salary. 3. Divide annual salary by 12 (monthly) or 26 (biweekly).',
    faq: {
      question: 'How do you convert hourly wage to annual salary?',
      answer: 'For standard 40-hour weeks across 52 weeks (2,080 hours/year), Annual Salary = Hourly Rate × 2,080. Conversely, Hourly Rate = Annual Salary / 2,080.',
    },
    translations: {
      es: {
        name: 'Fórmula de Conversión de Salario Anual y Tarifa por Hora',
        variables: [
          { symbol: 'R_hr', name: 'Tarifa por Hora', description: 'Remuneración bruta por cada hora trabajada' },
          { symbol: 'H', name: 'Horas por Semana', description: 'Jornada semanal estándar (ej. 40 horas)' },
          { symbol: 'W', name: 'Semanas Pagadas/Año', description: 'Semanas retribuidas al año (52 semanas = 2.080 h)' },
        ],
        stepByStep: '1. Multiplique horas semanales H por semanas W (40 × 52 = 2.080). 2. Multiplique por la tarifa horaria para salario anual bruto. 3. Divida entre 12 o 26 para pagos periódicos.',
      },
      fr: {
        name: 'Formule de Conversion Salaire Annuel et Taux Horaire',
        variables: [
          { symbol: 'R_hr', name: 'Taux Horaire Brut', description: 'Rémunération brute par heure travaillée' },
          { symbol: 'H', name: 'Heures par Semaine', description: 'Durée hebdomadaire (35 h en France, 40 h standard)' },
          { symbol: 'W', name: 'Semaines Payées/An', description: 'Nombre de semaines rémunérées par an (52)' },
        ],
        stepByStep: '1. Multipliez les heures hebdomadaires H par 52 semaines. 2. Multipliez par le taux horaire pour le salaire annuel brut. 3. Divisez par 12 pour le salaire mensuel brut.',
      },
      de: {
        name: 'Umrechnungsformel Stundenlohn & Jahresgehalt',
        variables: [
          { symbol: 'R_hr', name: 'Brutto-Stundenlohn', description: 'Vergütung pro Arbeitsstunde vor Abzügen' },
          { symbol: 'H', name: 'Wochenstunden', description: 'Wöchentliche Arbeitszeit (Vollzeit meist 40 Std.)' },
          { symbol: 'W', name: 'Bezahlte Wochen/Jahr', description: 'Bezahlte Arbeitswochen inkl. Urlaub (52 Wochen = 2.080 Std.)' },
        ],
        stepByStep: '1. Wochenstunden H mit 52 Wochen multiplizieren (bei 40 Std. = 2.080 Std.). 2. Mit Stundenlohn multiplizieren für Jahresbrutto. 3. Durch 12 teilen für das Monatsbrutto.',
      },
    },
  },

  // 17. Rental Property Cap Rate & Cash-on-Cash
  {
    slugs: ['rental-property-calculator', 'real-estate-calculator'],
    name: 'Real Estate Cap Rate & Cash-on-Cash Return Formulas',
    formula: 'Cap Rate = (NOI / Property Value) × 100  |  CoC = (Annual Cash Flow / Cash Invested) × 100',
    latex: '\\text{Cap Rate} = \\frac{\\text{NOI}}{\\text{Purchase Price}} \\times 100\\%, \\quad \\text{CoC} = \\frac{\\text{Annual Pre-Tax Cash Flow}}{\\text{Total Cash Invested}} \\times 100\\%',
    variables: [
      { symbol: 'NOI', name: 'Net Operating Income', description: 'Annual gross rent minus vacancy and operating expenses (excluding mortgage)' },
      { symbol: 'Cap Rate', name: 'Capitalization Rate', description: 'Unlevered annual property yield (%)' },
      { symbol: 'CoC', name: 'Cash-on-Cash Return', description: 'Leveraged annual cash return on out-of-pocket cash invested' },
    ],
    stepByStep: '1. Subtract vacancy and operating expenses (taxes, insurance, maintenance, management) from gross rent to get NOI. 2. Divide NOI by property price for Cap Rate. 3. Subtract debt service from NOI and divide by total cash invested for CoC.',
    faq: {
      question: 'How are Cap Rate and Cash-on-Cash return calculated for rental properties?',
      answer: 'Cap Rate = (NOI / Property Value) × 100 measures unlevered yield, while Cash-on-Cash Return = [(NOI - Annual Mortgage Payments) / Total Cash Invested] × 100 measures leveraged return on equity.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Rentabilidad Inmobiliaria (Cap Rate y Cash-on-Cash)',
        variables: [
          { symbol: 'NOI', name: 'Ingreso Operativo Neto', description: 'Alquiler anual menos vacancia y gastos operativos (sin hipoteca)' },
          { symbol: 'Cap Rate', name: 'Tasa de Capitalización', description: 'Rentabilidad anual neta del inmueble sin financiación' },
          { symbol: 'CoC', name: 'Retorno Cash-on-Cash', description: 'Flujo de caja anual sobre el efectivo propio invertido' },
        ],
        stepByStep: '1. Reste vacancia y gastos operativos del alquiler bruto para hallar el NOI. 2. Divida NOI entre el precio para Cap Rate. 3. Reste cuotas hipotecarias al NOI y divida entre efectivo invertido.',
      },
      fr: {
        name: 'Formules de Rendement Locatif (Cap Rate et Cash-on-Cash)',
        variables: [
          { symbol: 'NOI', name: 'Revenu Net d’Exploitation', description: 'Loyers annuels moins vacance et charges hors crédit' },
          { symbol: 'Cap Rate', name: 'Rendement Net (Cap Rate)', description: 'Rentabilité annuelle nette sans effet de levier' },
          { symbol: 'CoC', name: 'Rendement Cash-on-Cash', description: 'Cash-flow annuel rapporté à l’apport personnel investi' },
        ],
        stepByStep: '1. Déduisez vacance et charges des loyers annuels pour le NOI. 2. Divisez le NOI par le prix d’acquisition (Cap Rate). 3. Déduisez les mensualités d’emprunt et divisez par l’apport total.',
      },
      de: {
        name: 'Immobilien-Nettomietrendite & Eigenkapitalrendite',
        variables: [
          { symbol: 'NOI', name: 'Nettobetriebsergebnis (NOI)', description: 'Jahreskaltmiete abzüglich Leerstand und nicht umlagefähiger Kosten' },
          { symbol: 'Cap Rate', name: 'Nettomietrendite (Cap Rate)', description: 'Objektrendite bezogen auf den Gesamtkaufpreis' },
          { symbol: 'CoC', name: 'Cash-on-Cash-Rendite', description: 'Jährlicher Cashflow im Verhältnis zum eingesetzten Eigenkapital' },
        ],
        stepByStep: '1. Bewirtschaftungskosten und Leerstand von der Jahresmiete abziehen (NOI). 2. NOI durch Kaufpreis teilen (Cap Rate). 3. Kreditraten vom NOI abziehen und durch Eigenkapital teilen.',
      },
    },
  },

  // 18. Rent vs Buy & Budget Rule
  {
    slugs: ['rent-vs-buy-calculator', 'rent-calculator', 'budget-calculator'],
    name: 'Housing Affordability & Rent vs. Buy Net Worth Formula',
    formula: 'Buyer Net Worth_t = Home Value_t - Mortgage Balance_t - Selling Costs_t',
    latex: '\\text{Net Worth}_{\\text{buy}, t} = V_0(1+g)^t - B_t - s \\cdot V_t',
    variables: [
      { symbol: 'V_0', name: 'Purchase Price', description: 'Initial home purchase price' },
      { symbol: 'g', name: 'Annual Home Appreciation', description: 'Expected yearly property value growth rate' },
      { symbol: 'B_t', name: 'Remaining Mortgage Balance', description: 'Unpaid loan principal at year t' },
      { symbol: 's', name: 'Selling Transaction Cost', description: 'Agent commissions and closing costs upon sale (typically 6%–8%)' },
    ],
    stepByStep: '1. Project home value after t years at appreciation g. 2. Subtract remaining mortgage balance and selling costs. 3. Compare against a renter’s invested down-payment and monthly savings portfolio.',
    faq: {
      question: 'How is the rent vs. buy break-even point calculated?',
      answer: 'The break-even year occurs when cumulative Buyer Net Worth (Appreciated Home Value - Mortgage Balance - Selling Costs) exceeds the Renter’s portfolio built by investing the down payment and any monthly cost difference.',
    },
    translations: {
      es: {
        name: 'Fórmula de Patrimonio Neto: Alquilar vs. Comprar',
        variables: [
          { symbol: 'V_0', name: 'Precio de Compra', description: 'Valor inicial de adquisición de la vivienda' },
          { symbol: 'g', name: 'Revalorización Anual', description: 'Tasa esperada de apreciación inmobiliaria anual' },
          { symbol: 'B_t', name: 'Capital Hipotecario Pendiente', description: 'Deuda restante de la hipoteca en el año t' },
          { symbol: 's', name: 'Gastos de Venta', description: 'Comisiones e impuestos al vender (habitualmente 6%–8%)' },
        ],
        stepByStep: '1. Proyecte el valor futuro de la vivienda a la tasa g. 2. Reste la hipoteca pendiente y gastos de venta. 3. Compare con la cartera de inversión acumulada alquilando.',
      },
      fr: {
        name: 'Formule du Patrimoine Net : Louer ou Acheter',
        variables: [
          { symbol: 'V_0', name: 'Prix d’Achat', description: 'Prix d’acquisition initial du bien immobilier' },
          { symbol: 'g', name: 'Valorisation Annuelle', description: 'Taux annuel estimé d’appréciation immobilière' },
          { symbol: 'B_t', name: 'Capital Restant Dû', description: 'Solde du crédit immobilier à l’année t' },
          { symbol: 's', name: 'Frais de Revente', description: 'Frais d’agence et de cession lors de la vente' },
        ],
        stepByStep: '1. Projetez la valeur du bien après t ans au taux g. 2. Soustrayez le capital restant dû et les frais de vente. 3. Comparez au capital financier accumulé par un locataire.',
      },
      de: {
        name: 'Vermögensvergleichs-Formel: Mieten vs. Kaufen',
        variables: [
          { symbol: 'V_0', name: 'Kaufpreis', description: 'Ursprünglicher Immobilienkaufpreis' },
          { symbol: 'g', name: 'Jährliche Wertsteigerung', description: 'Erwartete Immobilien-Wertentwicklung pro Jahr' },
          { symbol: 'B_t', name: 'Restschuld im Jahr t', description: 'Verbleibende Darlehensschuld zum Zeitpunkt t' },
          { symbol: 's', name: 'Verkaufskosten', description: 'Makler- und Veräußerungskosten bei Verkauf' },
        ],
        stepByStep: '1. Immobilienwert nach t Jahren mit Wertsteigerung g berechnen. 2. Restschuld und Verkaufskosten abziehen. 3. Mit dem ETF-Depotwert des Mieters vergleichen.',
      },
    },
  },

  // 19. Down Payment & LTV
  {
    slugs: ['down-payment-calculator'],
    name: 'Down Payment & Loan-to-Value (LTV) Formula',
    formula: 'Down Payment = Home Price × (d / 100)  |  LTV = (Loan / Home Price) × 100',
    latex: '\\text{Down Payment} = P \\cdot \\frac{d}{100}, \\quad \\text{LTV} = \\frac{P - \\text{Down Payment}}{P} \\times 100\\%',
    variables: [
      { symbol: 'P', name: 'Home Purchase Price', description: 'Agreed property contract price' },
      { symbol: 'd', name: 'Down Payment %', description: 'Upfront equity percentage (20% avoids PMI)' },
      { symbol: 'LTV', name: 'Loan-to-Value Ratio', description: 'Percentage of home price financed by the lender' },
    ],
    stepByStep: '1. Multiply home price P by down payment percent d/100. 2. Subtract down payment from P to find loan amount. 3. Divide loan by P × 100 to verify whether LTV exceeds 80% (PMI threshold).',
    faq: {
      question: 'How is Loan-to-Value (LTV) calculated from a down payment?',
      answer: 'LTV = [(Home Price - Down Payment) / Home Price] × 100. Putting 20% down yields an 80% LTV, eliminating private mortgage insurance (PMI) on conventional loans.',
    },
    translations: {
      es: {
        name: 'Fórmula de Pago Inicial y Ratio Préstamo-Valor (LTV)',
        variables: [
          { symbol: 'P', name: 'Precio de la Vivienda', description: 'Valor de compraventa del inmueble' },
          { symbol: 'd', name: 'Porcentaje de Entrada', description: 'Porcentaje aportado en efectivo al inicio' },
          { symbol: 'LTV', name: 'Ratio LTV (%)', description: 'Porcentaje del precio financiado mediante hipoteca' },
        ],
        stepByStep: '1. Multiplique el precio P por d/100. 2. Reste la entrada de P para hallar el préstamo. 3. Divida el préstamo entre P × 100 para obtener el LTV.',
      },
      fr: {
        name: 'Formule d’Apport Personnel et Ratio Prêt-Valeur (LTV)',
        variables: [
          { symbol: 'P', name: 'Prix d’Acquisition', description: 'Prix du bien immobilier hors frais' },
          { symbol: 'd', name: 'Taux d’Apport (%)', description: 'Pourcentage financé sur fonds propres' },
          { symbol: 'LTV', name: 'Ratio LTV (%)', description: 'Part du prix financée par l’emprunt bancaire' },
        ],
        stepByStep: '1. Multipliez le prix P par d/100. 2. Soustrayez l’apport de P pour le montant emprunté. 3. Divisez le prêt par P × 100 pour le ratio LTV.',
      },
      de: {
        name: 'Eigenkapital- & Beleihungsauslauf-Formel (LTV)',
        variables: [
          { symbol: 'P', name: 'Kaufpreis der Immobilie', description: 'Vereinbarter Immobilienkaufpreis' },
          { symbol: 'd', name: 'Eigenkapitalquote (%)', description: 'Anteil des selbst eingebrachten Kapitals' },
          { symbol: 'LTV', name: 'Beleihungsauslauf (LTV)', description: 'Fremdfinanzierungsanteil am Immobilienwert' },
        ],
        stepByStep: '1. Kaufpreis P mit Eigenkapitalquote d/100 multiplizieren. 2. Eigenkapital von P abziehen ergibt den Kreditbedarf. 3. Kredit durch P × 100 teilen für den Beleihungsauslauf.',
      },
    },
  },

  // 20. Bond Pricing & Yield
  {
    slugs: ['bond-calculator'],
    name: 'Bond Price & Yield to Maturity Formula',
    formula: 'Price = Σ [ C / (1 + y)^t ] + Face / (1 + y)^n',
    latex: 'P_{\\text{bond}} = \\sum_{t=1}^{n} \\frac{C}{(1 + y)^t} + \\frac{F}{(1 + y)^n}',
    variables: [
      { symbol: 'C', name: 'Periodic Coupon Payment', description: 'Face value × coupon rate / payments per year' },
      { symbol: 'F', name: 'Par / Face Value', description: 'Principal repaid at maturity (typically 1,000)' },
      { symbol: 'y', name: 'Periodic Yield (YTM)', description: 'Market yield to maturity per coupon period' },
      { symbol: 'n', name: 'Total Coupon Periods', description: 'Years to maturity × coupon frequency' },
    ],
    stepByStep: '1. Discount all scheduled coupon payments C at yield y. 2. Discount face value F back to present value. 3. Sum both components to obtain fair bond price.',
    faq: {
      question: 'What is the mathematical formula for bond pricing?',
      answer: 'A bond’s present price equals the discounted sum of its coupon payments plus its discounted face value: Price = Σ [C / (1 + y)^t] + F / (1 + y)^n.',
    },
    translations: {
      es: {
        name: 'Fórmula de Precio de Bono y Rendimiento al Vencimiento (YTM)',
        variables: [
          { symbol: 'C', name: 'Cupón Periódico', description: 'Valor nominal × tasa de cupón / frecuencia anual' },
          { symbol: 'F', name: 'Valor Nominal', description: 'Capital reembolsado al vencimiento' },
          { symbol: 'y', name: 'Rendimiento Periódico (TIR)', description: 'Tasa de descuento de mercado por periodo' },
          { symbol: 'n', name: 'Periodos de Cupón', description: 'Años hasta vencimiento × pagos por año' },
        ],
        stepByStep: '1. Descuente todos los cupones C a la tasa y. 2. Descuente el valor nominal F al presente. 3. Sume ambos valores para obtener el precio justo del bono.',
      },
      fr: {
        name: 'Formule de Valorisation Obligataire et Rendement Actuariel',
        variables: [
          { symbol: 'C', name: 'Coupon Périodique', description: 'Nominal × taux facial / fréquence annuelle' },
          { symbol: 'F', name: 'Valeur Nominale', description: 'Capital remboursé à l’échéance' },
          { symbol: 'y', name: 'Taux Actuariel (YTM)', description: 'Rendement exigé par le marché par période' },
          { symbol: 'n', name: 'Nombre de Coupons', description: 'Maturité en années × fréquence' },
        ],
        stepByStep: '1. Actualisez chaque coupon C au taux y. 2. Actualisez le nominal F à aujourd’hui. 3. Additionnez les deux termes pour le prix de l’obligation.',
      },
      de: {
        name: 'Anleihekurs- & Effektivrendite-Formel (YTM)',
        variables: [
          { symbol: 'C', name: 'Periodischer Kupon', description: 'Nennwert × Kuponzinssatz / Zinszahlungen pro Jahr' },
          { symbol: 'F', name: 'Nennwert (Nominal)', description: 'Rückzahlungsbetrag bei Endfälligkeit' },
          { symbol: 'y', name: 'Periodenrendite (YTM)', description: 'Marktrendite pro Kuponperiode' },
          { symbol: 'n', name: 'Anzahl Kuponperioden', description: 'Restlaufzeit in Jahren × Zinsfrequenz' },
        ],
        stepByStep: '1. Alle Kuponzahlungen C mit Rendite y abzinsen. 2. Nennwert F auf heute abzinsen. 3. Beide Barwerte zum fairen Anleihekurs addieren.',
      },
    },
  },

  // 21. Asset Depreciation
  {
    slugs: ['depreciation-calculator'],
    name: 'Straight-Line & Declining Balance Depreciation Formulas',
    formula: 'SL = (Cost - Salvage) / Useful Life  |  DDB_t = (2 / Life) × Book Value_t',
    latex: 'D_{\\text{SL}} = \\frac{\\text{Cost} - \\text{Salvage}}{L}, \\quad D_{\\text{DDB}, t} = \\frac{2}{L} \\cdot BV_t',
    variables: [
      { symbol: 'Cost', name: 'Asset Purchase Cost', description: 'Original capitalized acquisition cost' },
      { symbol: 'Salvage', name: 'Residual / Salvage Value', description: 'Estimated value at end of useful life' },
      { symbol: 'L', name: 'Useful Life (Years)', description: 'Accounting or IRS MACRS recovery period' },
      { symbol: 'BV_t', name: 'Beginning Book Value', description: 'Undepreciated carrying value at start of year t' },
    ],
    stepByStep: '1. Subtract salvage value from cost to find depreciable base. 2. Divide by useful life L for Straight-Line annual expense, or multiply book value by (2/L) for Double-Declining Balance.',
    faq: {
      question: 'How is straight-line vs. declining balance depreciation calculated?',
      answer: 'Straight-line depreciation spreads (Cost - Salvage) evenly across L years, whereas Double-Declining Balance accelerates write-offs via (2 / L) × Beginning Book Value until reaching salvage value.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Depreciación Lineal y Decreciente',
        variables: [
          { symbol: 'Cost', name: 'Costo de Adquisición', description: 'Valor inicial capitalizado del activo' },
          { symbol: 'Salvage', name: 'Valor Residual', description: 'Valor estimado al final de su vida útil' },
          { symbol: 'L', name: 'Vida Útil (Años)', description: 'Periodo contable o fiscal de amortización' },
          { symbol: 'BV_t', name: 'Valor en Libros', description: 'Valor neto contable al inicio del año t' },
        ],
        stepByStep: '1. Reste el valor residual al costo inicial. 2. Divida entre L para depreciación lineal, o multiplique el valor en libros por (2/L) para saldo decreciente doble.',
      },
      fr: {
        name: 'Formules d’Amortissement Linéaire et Dégressif',
        variables: [
          { symbol: 'Cost', name: 'Coût d’Acquisition', description: 'Valeur brute immobilisée à l’origine' },
          { symbol: 'Salvage', name: 'Valeur Résiduelle', description: 'Valeur estimée en fin d’utilisation' },
          { symbol: 'L', name: 'Durée d’Utilisation', description: 'Durée comptable d’amortissement en années' },
          { symbol: 'BV_t', name: 'Valeur Nette Comptable', description: 'Valeur non amortie au début de l’exercice t' },
        ],
        stepByStep: '1. Soustrayez la valeur résiduelle du coût initial. 2. Divisez par L (linéaire) ou multipliez la VNC par (2/L) pour l’amortissement dégressif accéléré.',
      },
      de: {
        name: 'Lineare & Degressive Abschreibungsformel (AfA)',
        variables: [
          { symbol: 'Cost', name: 'Anschaffungskosten', description: 'Ursprüngliche aktivierte Kosten des Wirtschaftsguts' },
          { symbol: 'Salvage', name: 'Restwert', description: 'Geschätzter Wert am Ende der Nutzungsdauer' },
          { symbol: 'L', name: 'Nutzungsdauer (Jahre)', description: 'Betriebsgewöhnliche Abschreibungsdauer' },
          { symbol: 'BV_t', name: 'Restbuchwert', description: 'Buchwert zu Beginn des Jahres t' },
        ],
        stepByStep: '1. Restwert von den Anschaffungskosten abziehen. 2. Durch Nutzungsdauer L teilen (lineare AfA) oder Buchwert mit (2/L) multiplizieren (degressive Abschreibung).',
      },
    },
  },

  // 22. Lease Payment
  {
    slugs: ['lease-calculator'],
    name: 'Auto & Equipment Lease Payment Formula',
    formula: 'Monthly Lease = (Cap Cost - Residual) / n + (Cap Cost + Residual) × MF',
    latex: '\\text{Lease} = \\frac{C_{\\text{cap}} - R_{\\text{res}}}{n} + (C_{\\text{cap}} + R_{\\text{res}}) \\cdot \\text{MF}',
    variables: [
      { symbol: 'C_cap', name: 'Net Capitalized Cost', description: 'Negotiated price plus fees minus cap cost reduction/trade-in' },
      { symbol: 'R_res', name: 'Residual Value', description: 'Contracted end-of-lease buyout value (MSRP × residual %)' },
      { symbol: 'MF', name: 'Money Factor', description: 'Lease financing factor (approximately APR / 2400)' },
      { symbol: 'n', name: 'Lease Term (Months)', description: 'Duration of lease contract (typically 24, 36, or 48 months)' },
    ],
    stepByStep: '1. Calculate monthly depreciation: (Cap Cost - Residual) / n. 2. Calculate monthly rent charge: (Cap Cost + Residual) × Money Factor. 3. Add both components (plus local sales tax).',
    faq: {
      question: 'How is a monthly car lease payment calculated?',
      answer: 'A lease payment equals Monthly Depreciation [(Cap Cost - Residual) / n] plus Monthly Finance Charge [(Cap Cost + Residual) × Money Factor], where Money Factor ≈ APR / 2400.',
    },
    translations: {
      es: {
        name: 'Fórmula de Cuota de Leasing (Arrendamiento Financiero)',
        variables: [
          { symbol: 'C_cap', name: 'Costo Capitalizado Neto', description: 'Precio negociado menos entrada o entrega de vehículo' },
          { symbol: 'R_res', name: 'Valor Residual', description: 'Valor garantizado de recompra al finalizar el contrato' },
          { symbol: 'MF', name: 'Factor Financiero (Money Factor)', description: 'Coeficiente de financiación equivalente a APR / 2400' },
          { symbol: 'n', name: 'Plazo (Meses)', description: 'Duración del leasing (24, 36 o 48 meses)' },
        ],
        stepByStep: '1. Calcule la depreciación mensual: (C_cap - R_res) / n. 2. Calcule el cargo financiero: (C_cap + R_res) × MF. 3. Sume ambos componentes.',
      },
      fr: {
        name: 'Formule de Loyer Mensuel de Leasing (LOA / LLD)',
        variables: [
          { symbol: 'C_cap', name: 'Coût Capitalisé Net', description: 'Prix négocié net après premier loyer majoré' },
          { symbol: 'R_res', name: 'Valeur Résiduelle', description: 'Option d’achat garantie en fin de contrat' },
          { symbol: 'MF', name: 'Facteur Financier', description: 'Coefficient de financement (environ TAEG / 2400)' },
          { symbol: 'n', name: 'Durée (Mois)', description: 'Durée du contrat en mois (24, 36 ou 48)' },
        ],
        stepByStep: '1. Calculez l’amortissement mensuel : (C_cap - R_res) / n. 2. Calculez les frais financiers : (C_cap + R_res) × MF. 3. Additionnez les deux montants.',
      },
      de: {
        name: 'Leasingraten-Formel (Restwert-Leasing)',
        variables: [
          { symbol: 'C_cap', name: 'Netto-Anschaffungswert', description: 'Kaufpreis abzüglich Sonderzahlung' },
          { symbol: 'R_res', name: 'Restwert', description: 'Vertraglicher Fahrzeugwert am Vertragsende' },
          { symbol: 'MF', name: 'Zinsfaktor (Money Factor)', description: 'Finanzierungsfaktor (ca. Jahreszins / 2400)' },
          { symbol: 'n', name: 'Laufzeit (Monate)', description: 'Vertragsdauer in Monaten (z. B. 24, 36, 48)' },
        ],
        stepByStep: '1. Monatlichen Wertverlust berechnen: (C_cap - R_res) / n. 2. Monatliche Finanzierungskosten: (C_cap + R_res) × MF. 3. Beide Werte zur Monatsrate addieren.',
      },
    },
  },

  // 23. Commission
  {
    slugs: ['commission-calculator'],
    name: 'Sales Commission & Tiered Payout Formula',
    formula: 'Commission = (Sales × Rate) + Bonus  |  Required Sales = (Target - Bonus) / Rate',
    latex: '\\text{Commission} = S \\cdot r + B, \\quad S_{\\text{req}} = \\frac{\\text{Target} - B}{r}',
    variables: [
      { symbol: 'S', name: 'Gross Sales Revenue', description: 'Total closed deal volume or net invoiced sales' },
      { symbol: 'r', name: 'Commission Rate', description: 'Agreed payout rate expressed as a decimal (e.g. 8% = 0.08)' },
      { symbol: 'B', name: 'Base / Accelerator Bonus', description: 'Fixed base draw or quota-attainment bonus' },
    ],
    stepByStep: '1. Multiply eligible sales volume S by commission rate r (applying tiered brackets if quota is exceeded). 2. Add base salary or bonus B for total payout.',
    faq: {
      question: 'How do you calculate sales commission?',
      answer: 'Standard sales commission equals Gross Sales × Commission Rate + Base/Bonus. For tiered quotas, apply each marginal rate only to sales within that bracket.',
    },
    translations: {
      es: {
        name: 'Fórmula de Comisión de Ventas y Bonificación',
        variables: [
          { symbol: 'S', name: 'Volumen de Ventas', description: 'Ingresos netos cerrados por el vendedor' },
          { symbol: 'r', name: 'Tasa de Comisión', description: 'Porcentaje de comisión en formato decimal' },
          { symbol: 'B', name: 'Bono / Base Fija', description: 'Prima adicional por cumplimiento de objetivos' },
        ],
        stepByStep: '1. Multiplique las ventas S por la tasa r (por tramos si es escalonada). 2. Sume el salario base o bono B para el pago total.',
      },
      fr: {
        name: 'Formule de Commission Commerciale et Prime',
        variables: [
          { symbol: 'S', name: 'Chiffre d’Affaires Réalisé', description: 'Montant net des ventes conclues' },
          { symbol: 'r', name: 'Taux de Commission', description: 'Taux de commissionnement en décimal' },
          { symbol: 'B', name: 'Prime / Fixe', description: 'Prime d’objectif ou part fixe associée' },
        ],
        stepByStep: '1. Multipliez le chiffre d’affaires S par le taux r. 2. Ajoutez la prime B pour obtenir la rémunération totale.',
      },
      de: {
        name: 'Verkaufsprovisions- & Bonusformel',
        variables: [
          { symbol: 'S', name: 'Umsatzvolumen', description: 'Abgeschlossener Nettoumsatz' },
          { symbol: 'r', name: 'Provisionssatz', description: 'Vereinbarter Prozentsatz als Dezimalzahl' },
          { symbol: 'B', name: 'Fixum / Zielbonus', description: 'Zusätzliche Prämie bei Zielerreichung' },
        ],
        stepByStep: '1. Umsatz S mit Provisionssatz r multiplizieren (bei Staffelprovision je Stufe). 2. Bonus oder Fixum B addieren.',
      },
    },
  },

  // 24. Effective & Marginal Income/Estate Tax
  {
    slugs: ['income-tax-calculator', 'marriage-tax-calculator', 'estate-tax-calculator'],
    name: 'Progressive Tax Bracket & Effective Tax Rate Formula',
    formula: 'Total Tax = Σ (Bracket Income_k × Marginal Rate_k)  |  Effective Rate = (Total Tax / Gross Income) × 100',
    latex: 'T = \\sum_{k} \\Delta I_k \\cdot r_k, \\quad r_{\\text{eff}} = \\frac{T}{I_{\\text{gross}}} \\times 100\\%',
    variables: [
      { symbol: 'ΔI_k', name: 'Income in Bracket k', description: 'Taxable income slice falling inside tax bracket k after deductions' },
      { symbol: 'r_k', name: 'Marginal Tax Rate', description: 'Statutory rate applied only to dollars within bracket k' },
      { symbol: 'r_eff', name: 'Effective Tax Rate', description: 'Actual average percentage of total gross income paid in tax' },
    ],
    stepByStep: '1. Subtract standard or itemized deductions to determine taxable income. 2. Multiply each progressive slice by its marginal bracket rate and sum. 3. Divide total tax by gross income for effective rate.',
    faq: {
      question: 'How is effective tax rate calculated from progressive tax brackets?',
      answer: 'Each progressive slice of taxable income is taxed only at its bracket’s marginal rate: Total Tax = Σ (ΔI_k × r_k). Effective Tax Rate = (Total Tax / Gross Income) × 100.',
    },
    translations: {
      es: {
        name: 'Fórmula de Tramos Fiscales Progresivos y Tipo Efectivo',
        variables: [
          { symbol: 'ΔI_k', name: 'Base en el Tramo k', description: 'Fracción de renta gravable dentro del tramo k tras deducciones' },
          { symbol: 'r_k', name: 'Tipo Marginal', description: 'Porcentaje aplicado únicamente a ese tramo' },
          { symbol: 'r_eff', name: 'Tipo Impositivo Efectivo', description: 'Porcentaje real promedio pagado sobre el ingreso bruto' },
        ],
        stepByStep: '1. Reste deducciones para hallar la base liquidable. 2. Multiplique cada tramo por su tipo marginal y sume. 3. Divida el impuesto total entre el ingreso bruto.',
      },
      fr: {
        name: 'Formule du Barème Progressif et Taux Moyen d’Imposition',
        variables: [
          { symbol: 'ΔI_k', name: 'Revenu dans la Tranche k', description: 'Fraction du revenu imposable dans la tranche k' },
          { symbol: 'r_k', name: 'Taux Marginal (TMI)', description: 'Taux appliqué uniquement à cette tranche' },
          { symbol: 'r_eff', name: 'Taux Moyen Effectif', description: 'Part réelle moyenne d’impôt sur le revenu brut' },
        ],
        stepByStep: '1. Appliquez les abattements pour le revenu imposable. 2. Multipliez chaque tranche par son taux marginal et additionnez. 3. Divisez l’impôt total par le revenu brut.',
      },
      de: {
        name: 'Progressiver Steuertarif & Durchschnittssteuersatz',
        variables: [
          { symbol: 'ΔI_k', name: 'Einkommen in Tarifzone k', description: 'Zu versteuernder Einkommensanteil in Stufe k nach Freibeträgen' },
          { symbol: 'r_k', name: 'Grenzsteuersatz', description: 'Steuersatz nur für den jeweiligen Einkommensabschnitt' },
          { symbol: 'r_eff', name: 'Effektiver Durchschnittssteuersatz', description: 'Tatsächliche prozentuale Steuerlast auf das Bruttoeinkommen' },
        ],
        stepByStep: '1. Freibeträge und Abzüge vom Brutto abziehen. 2. Jede Tarifzone mit ihrem Grenzsteuersatz multiplizieren und summieren. 3. Gesamtsteuer durch Bruttoeinkommen teilen.',
      },
    },
  },

  // 25. Zakat
  {
    slugs: ['zakat-calculator'],
    name: 'Zakat Obligation & Nisab Threshold Formula',
    formula: 'Zakat = 0.025 × (Zakatable Assets - Short-Term Liabilities)  [if Net ≥ Nisab]',
    latex: '\\text{Zakat} = 0.025 \\times (A_{\\text{zakatable}} - L_{\\text{due}}) \\quad (\\text{if Net} \\ge \\text{Nisab})',
    variables: [
      { symbol: 'A', name: 'Zakatable Wealth', description: 'Cash, gold, silver, liquid investments, and trade inventory held one lunar year (Hawl)' },
      { symbol: 'L', name: 'Immediate Liabilities', description: 'Short-term debts and bills currently due' },
      { symbol: 'Nisab', name: 'Minimum Threshold', description: 'Market value of 87.48 g of gold or 612.36 g of silver' },
    ],
    stepByStep: '1. Sum all liquid zakatable assets held for one lunar year. 2. Subtract immediate due debts. 3. If net zakatable wealth meets or exceeds Nisab, multiply by 2.5% (0.025).',
    faq: {
      question: 'What is the formula used to calculate Zakat?',
      answer: 'Zakat equals 2.5% (1/40th) of net zakatable wealth (eligible cash, gold, silver, investments, and inventory minus immediate due debts) when held for one lunar year above the Nisab threshold.',
    },
    translations: {
      es: {
        name: 'Fórmula de Cálculo del Zakat y Umbral Nisab',
        variables: [
          { symbol: 'A', name: 'Patrimonio Sujeto a Zakat', description: 'Efectivo, oro, plata, inversiones líquidas e inventario (1 año lunar)' },
          { symbol: 'L', name: 'Deudas Inmediatas', description: 'Obligaciones vencidas deducibles' },
          { symbol: 'Nisab', name: 'Umbral Nisab', description: 'Equivalente a 87,48 g de oro o 612,36 g de plata' },
        ],
        stepByStep: '1. Sume los activos elegibles mantenidos durante un año lunar. 2. Reste deudas exigibles inmediatas. 3. Si el neto alcanza el Nisab, multiplique por 2,5% (0,025).',
      },
      fr: {
        name: 'Formule de Calcul de la Zakat et Seuil du Nisab',
        variables: [
          { symbol: 'A', name: 'Actifs Éligibles', description: 'Liquidités, or, argent, placements et stocks détenus un an lunaire' },
          { symbol: 'L', name: 'Dettes Exigibles', description: 'Dettes à court terme immédiatement dues' },
          { symbol: 'Nisab', name: 'Seuil du Nisab', description: 'Valeur de 87,48 g d’or ou 612,36 g d’argent' },
        ],
        stepByStep: '1. Additionnez les actifs éligibles détenus pendant un cycle lunaire (Hawl). 2. Déduisez les dettes échues. 3. Si le solde atteint le Nisab, multipliez par 2,5 % (0,025).',
      },
      de: {
        name: 'Zakat-Berechnungsformel & Nisab-Schwelle',
        variables: [
          { symbol: 'A', name: 'Zakat-pflichtiges Vermögen', description: 'Bargeld, Gold, Silber, Wertpapiere und Handelsware (1 Mondjahr)' },
          { symbol: 'L', name: 'Fällige Schulden', description: 'Kurzfristig fällige Verbindlichkeiten' },
          { symbol: 'Nisab', name: 'Nisab-Freigrenze', description: 'Gegenwert von 87,48 g Gold oder 612,36 g Silber' },
        ],
        stepByStep: '1. Zakat-pflichtige Vermögenswerte summieren. 2. Sofort fällige Schulden abziehen. 3. Liegt der Nettobetrag mindestens beim Nisab, mit 2,5 % (0,025) multiplizieren.',
      },
    },
  },

  // 26. Currency Conversion
  {
    slugs: ['currency-calculator'],
    name: 'Foreign Exchange Currency Conversion Formula',
    formula: 'Converted Amount = Base Amount × FX Rate × (1 - Spread)',
    latex: 'A_{\\text{target}} = A_{\\text{base}} \\times R_{\\text{FX}} \\times (1 - s)',
    variables: [
      { symbol: 'A_base', name: 'Source Currency Amount', description: 'Amount being converted from the base currency' },
      { symbol: 'R_FX', name: 'Mid-Market Exchange Rate', description: 'Spot units of target currency per 1 unit of base currency' },
      { symbol: 's', name: 'Bank / Card FX Spread', description: 'Optional provider markup percentage (0% at mid-market)' },
    ],
    stepByStep: '1. Multiply your source amount by the live mid-market rate R_FX. 2. If applying a bank or card foreign transaction fee s, multiply by (1 - s).',
    faq: {
      question: 'How is currency conversion calculated with exchange rate spreads?',
      answer: 'Converted Amount = Base Amount × Mid-Market Exchange Rate × (1 - Fee/Spread). Zero-fee interbank conversions use s = 0.',
    },
    translations: {
      es: {
        name: 'Fórmula de Conversión de Divisas y Tipo de Cambio',
        variables: [
          { symbol: 'A_base', name: 'Importe Origen', description: 'Cantidad a convertir desde la divisa base' },
          { symbol: 'R_FX', name: 'Tipo de Cambio', description: 'Unidades de divisa destino por 1 unidad base' },
          { symbol: 's', name: 'Comisión / Spread FX', description: 'Margen opcional bancario (0% en tipo interbancario)' },
        ],
        stepByStep: '1. Multiplique el monto base por el tipo de cambio R_FX. 2. Si aplica comisión bancaria s, multiplique por (1 - s).',
      },
      fr: {
        name: 'Formule de Conversion de Devises (Taux de Change)',
        variables: [
          { symbol: 'A_base', name: 'Montant Initial', description: 'Somme en devise de départ' },
          { symbol: 'R_FX', name: 'Taux de Change', description: 'Unités de devise cible pour 1 unité de base' },
          { symbol: 's', name: 'Marge / Frais de Change', description: 'Frais bancaires optionnels (0 % au taux moyen)' },
        ],
        stepByStep: '1. Multipliez la somme initiale par le taux de change R_FX. 2. Appliquez (1 - s) si votre banque prélève une commission.',
      },
      de: {
        name: 'Währungsumrechnungs- & Wechselkurs-Formel',
        variables: [
          { symbol: 'A_base', name: 'Ausgangsbetrag', description: 'Umzurechnender Betrag in der Basiswährung' },
          { symbol: 'R_FX', name: 'Wechselkurs', description: 'Einheiten der Zielwährung pro 1 Einheit Basiswährung' },
          { symbol: 's', name: 'Wechselkurs-Aufschlag', description: 'Optionale Bankgebühr bzw. Spread (0 % beim Mittelkurs)' },
        ],
        stepByStep: '1. Ausgangsbetrag mit dem aktuellen Wechselkurs R_FX multiplizieren. 2. Bei Bank- oder Kartengebühren mit (1 - s) anpassen.',
      },
    },
  },
];
