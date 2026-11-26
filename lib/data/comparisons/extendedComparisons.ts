import type { ComparisonDef } from '../comparisons';

/**
 * 22 High-Intent Commercial, Financial, Health, Science & Developer Comparisons (88 localized pages).
 * Every toolA and toolB maps 1-to-1 to verified live calculators/tools in lib/registry/index.ts.
 */
export const extendedComparisons: ComparisonDef[] = [
  {
    slug: '15-year-vs-30-year-mortgage',
    title: '15-Year vs. 30-Year Fixed Mortgage',
    seoTitle: '15-Year vs 30-Year Mortgage Comparison | Monthly Payment & Interest Saved',
    seoDescription: 'Compare 15-year and 30-year fixed-rate mortgages side by side. Evaluate monthly payment differences, lifetime interest savings, equity velocity, and opportunity cost.',
    toolA: '15-year-mortgage-calculator',
    toolB: '30-year-mortgage-calculator',
    verdict: 'A 15-year mortgage typically carries a 0.50%–0.75% lower APR and cuts total lifetime interest by more than 55%, while a 30-year mortgage minimizes required monthly cash flow and maximizes borrowing flexibility.',
    differences: [
      { label: 'Typical Interest Rate Spread', a: '0.50% to 0.75% lower APR', b: 'Baseline standard fixed rate' },
      { label: 'Monthly Principal & Interest ($400k loan)', a: '~$3,354/mo (at 5.9%)', b: '~$2,555/mo (at 6.6%)' },
      { label: 'Lifetime Interest Paid ($400k loan)', a: '~$203,700 total interest', b: '~$519,800 total interest' },
      { label: 'Equity Building Speed', a: 'Rapid — over 40% of year-1 payment reduces principal', b: 'Slow initially — >80% of year-1 payment goes to interest' },
      { label: 'Cash-Flow Flexibility', a: 'Lower — higher mandatory monthly obligation', b: 'High — extra principal payments remain optional' }
    ],
    translations: {
      es: {
        title: 'Hipoteca a 15 Años vs. 30 Años a Tasa Fija',
        seoTitle: 'Hipoteca a 15 vs 30 Años | Cuota Mensual y Ahorro en Intereses',
        seoDescription: 'Compare hipotecas a tasa fija de 15 y 30 años. Analice cuota mensual, intereses totales ahorrados, velocidad de amortización y liquidez.',
        verdict: 'Una hipoteca a 15 años suele ofrecer una tasa 0,50 %–0,75 % menor y reduce los intereses totales en más de un 55 %, mientras que la hipoteca a 30 años protege su flujo de caja mensual.',
        differences: [
          { label: 'Diferencial de Tasa de Interés', a: '0,50 % a 0,75 % más baja', b: 'Tasa fija de referencia estándar' },
          { label: 'Cuota Mensual (préstamo de 400.000 $)', a: '~3.354 $/mes (al 5,9 %)', b: '~2.555 $/mes (al 6,6 %)' },
          { label: 'Intereses Totales Acumulados', a: '~203.700 $ en intereses', b: '~519.800 $ en intereses' },
          { label: 'Acumulación de Capital Propio', a: 'Muy rápida desde el primer año', b: 'Lenta al inicio (más del 80 % son intereses)' },
          { label: 'Flexibilidad Presupuestaria', a: 'Menor por cuota obligatoria más alta', b: 'Alta, con opción de abonos extra a capital' }
        ]
      },
      fr: {
        title: 'Prêt Immobilier 15 Ans vs 30 Ans à Taux Fixe',
        seoTitle: 'Crédit Immobilier 15 Ans vs 30 Ans | Mensualités & Coût Total',
        seoDescription: 'Comparez un emprunt immobilier sur 15 ans et sur 30 ans. Évaluez la mensualité, les intérêts économisés, le taux d’endettement et le coût d’opportunité.',
        verdict: 'Un crédit sur 15 ans bénéficie généralement d’un taux inférieur de 0,50 % à 0,75 % et divise par plus de deux le coût total des intérêts, tandis qu’un prêt sur 30 ans allège fortement la mensualité obligatoire.',
        differences: [
          { label: 'Écart Moyen de Taux', a: '0,50 % à 0,75 % inférieur', b: 'Taux fixe long terme standard' },
          { label: 'Mensualité (emprunt de 300 000 €)', a: '~2 150 €/mois (à 3,5 %)', b: '~1 432 €/mois (à 4,0 %)' },
          { label: 'Coût Total des Intérêts', a: 'Réduit de plus de 50 %', b: 'Plus du double sur la durée complète' },
          { label: 'Vitesse d’Amortissement', a: 'Très rapide dès les premières années', b: 'Lente au début (part d’intérêts dominante)' },
          { label: 'Souplesse de Trésorerie', a: 'Effort mensuel élevé et contraignant', b: 'Mensualité réduite, épargne parallèle possible' }
        ]
      },
      de: {
        title: '15-jährige vs. 30-jährige Immobilienfinanzierung',
        seoTitle: 'Baufinanzierung 15 Jahre vs 30 Jahre | Rate & Zinsersparnis',
        seoDescription: 'Vergleichen Sie Baufinanzierungen mit 15 und 30 Jahren Laufzeit. Berechnen Sie Monatsrate, Gesamtzinsen, Tilgungstempo und Liquiditätsspielraum.',
        verdict: 'Eine 15-jährige Tilgung sichert meist 0,50 %–0,75 % niedrigere Zinsen und halbiert die Zinskosten über die Laufzeit, während eine 30-jährige Finanzierung die monatliche Belastung deutlich senkt.',
        differences: [
          { label: 'Zinsvorteil', a: 'Meist 0,50 % bis 0,75 % günstiger', b: 'Standard-Langfristzinssatz' },
          { label: 'Monatliche Rate (300.000 € Darlehen)', a: '~2.150 €/Monat (bei 3,5 %)', b: '~1.432 €/Monat (bei 4,0 %)' },
          { label: 'Gesamtzinsbelastung', a: 'Über 50 % niedrigere Gesamtzinsen', b: 'Deutlich höhere Zinskosten durch lange Restschuld' },
          { label: 'Tilgungsgeschwindigkeit', a: 'Sehr hoch ab dem ersten Jahr', b: 'Langsam zu Beginn, hoher Zinsanteil' },
          { label: 'Monatliche Flexibilität', a: 'Höhere feste Pflichtrate', b: 'Niedrige Pflichtrate, Sondertilgungen optional' }
        ]
      }
    }
  },
  {
    slug: 'va-vs-fha-loan',
    title: 'VA Loan vs. FHA Loan',
    seoTitle: 'VA Loan vs FHA Loan Comparison | Down Payment, Funding Fee & MIP',
    seoDescription: 'Compare VA and FHA government-backed mortgages. Review zero-down eligibility, monthly mortgage insurance (MIP) vs VA funding fees, and total borrowing costs.',
    toolA: 'va-mortgage-calculator',
    toolB: 'fha-loan-calculator',
    verdict: 'For eligible military service members, veterans, and surviving spouses, VA loans almost always beat FHA loans thanks to 0% down payment and zero monthly mortgage insurance.',
    differences: [
      { label: 'Minimum Down Payment', a: '0% down (100% financing)', b: '3.5% down (580+ credit) or 10% (500–579)' },
      { label: 'Monthly Mortgage Insurance', a: '$0/month (never charged)', b: 'Annual MIP (~0.55% of loan) paid monthly' },
      { label: 'Upfront Government Fee', a: 'VA Funding Fee (1.25%–3.3%, waived for disabled vets)', b: '1.75% Upfront Mortgage Insurance Premium (UFMIP)' },
      { label: 'Eligibility Requirements', a: 'Active duty, veterans, National Guard/Reserves, eligible spouses', b: 'Open to all qualified U.S. homebuyers' },
      { label: 'Loan Limits', a: 'No statutory cap with full VA entitlement', b: 'County-based FHA loan limits apply' }
    ],
    translations: {
      es: {
        title: 'Préstamo Hipotecario VA vs. Préstamo FHA',
        seoTitle: 'Préstamo VA vs FHA | Enganche, Seguro Hipotecario y Requisitos',
        seoDescription: 'Compare hipotecas respaldadas VA y FHA. Analice el 0 % de enganche, el seguro hipotecario mensual (MIP), comisiones iniciales y requisitos.',
        verdict: 'Para militares activos y veteranos elegibles, el préstamo VA supera casi siempre al FHA al permitir 0 % de enganche y eliminar por completo el seguro hipotecario mensual.',
        differences: [
          { label: 'Enganche Mínimo', a: '0 % de pago inicial', b: '3,5 % (crédito 580+) o 10 % (500–579)' },
          { label: 'Seguro Hipotecario Mensual', a: '0 $/mes (inexistente)', b: 'MIP anual (~0,55 %) prorrateado al mes' },
          { label: 'Comisión Inicial Gubernamental', a: 'Tarifa VA (1,25 %–3,3 %, exenta por discapacidad)', b: '1,75 % de prima inicial UFMIP' },
          { label: 'Elegibilidad', a: 'Militares, veteranos y cónyuges elegibles', b: 'Abierto a cualquier comprador calificado' },
          { label: 'Límites de Préstamo', a: 'Sin límite legal con derecho VA completo', b: 'Sujeto a topes FHA por condado' }
        ]
      },
      fr: {
        title: 'Prêt Immobilier VA vs Prêt FHA',
        seoTitle: 'Prêt VA vs FHA | Apport, Assurance Emprunteur & Frais',
        seoDescription: 'Comparez les prêts garantis américains VA et FHA : apport minimal, assurance hypothécaire mensuelle (MIP), frais d’accès et conditions d’éligibilité.',
        verdict: 'Pour les militaires et vétérans éligibles, le prêt VA l’emporte presque systématiquement grâce à l’absence d’apport obligatoire et de prime d’assurance hypothécaire mensuelle.',
        differences: [
          { label: 'Apport Personnel Minimum', a: '0 % (financement à 100 %)', b: '3,5 % (score 580+) ou 10 % (500–579)' },
          { label: 'Assurance Hypothécaire Mensuelle', a: '0 $/mois (aucune MIP)', b: 'MIP annuelle (~0,55 %) prélevée chaque mois' },
          { label: 'Frais Initiaux Garantis', a: 'Frais VA (1,25 %–3,3 %, exonérés si invalidité)', b: '1,75 % de prime initiale UFMIP' },
          { label: 'Conditions d’Éligibilité', a: 'Militaires, vétérans et conjoints éligibles', b: 'Accessible à tout acheteur résident qualifié' },
          { label: 'Plafonds d’Emprunt', a: 'Aucun plafond légal avec droit VA complet', b: 'Plafonds FHA fixés par comté' }
        ]
      },
      de: {
        title: 'VA-Darlehen vs. FHA-Darlehen',
        seoTitle: 'VA-Darlehen vs FHA-Darlehen Vergleich | Eigenkapital & Kosten',
        seoDescription: 'Vergleichen Sie staatlich abgesicherte US-Hypotheken (VA vs. FHA): 0 % Eigenkapital, monatliche Kreditversicherung (MIP) und Gebühren im Überblick.',
        verdict: 'Für berechtigte US-Militärangehörige und Veteranen ist das VA-Darlehen fast immer günstiger, da weder Eigenkapital noch eine monatliche Hypothekenversicherung (MIP) anfallen.',
        differences: [
          { label: 'Mindesteigenkapital', a: '0 % Anzahlung (Vollfinanzierung)', b: '3,5 % (Score 580+) oder 10 % (500–579)' },
          { label: 'Monatliche Kreditversicherung', a: '0 $/Monat (entfällt komplett)', b: 'Jährliche MIP (~0,55 %) auf Monatsbasis' },
          { label: 'Einmalige Gebühr', a: 'VA Funding Fee (1,25 %–3,3 %, oft erlassen)', b: '1,75 % Vorab-Versicherungsprämie (UFMIP)' },
          { label: 'Berechtigung', a: 'Aktive Soldaten, Veteranen & berechtigte Ehepartner', b: 'Offen für alle qualifizierten Immobilienkäufer' },
          { label: 'Darlehensobergrenzen', a: 'Kein gesetzliches Limit bei vollem Anspruch', b: 'Regionale FHA-Höchstgrenzen je Bezirk' }
        ]
      }
    }
  },
  {
    slug: 'hysa-vs-cd',
    title: 'High-Yield Savings Account (HYSA) vs. Certificate of Deposit (CD)',
    seoTitle: 'HYSA vs CD Calculator & Comparison | Liquidity, APY & Penalties',
    seoDescription: 'Compare High-Yield Savings Accounts and Certificates of Deposit (CDs). Analyze variable vs locked APYs, liquidity access, and early withdrawal penalties.',
    toolA: 'savings-calculator',
    toolB: 'cd-calculator',
    verdict: 'Use a High-Yield Savings Account for emergency funds and flexible cash goals where instant liquidity matters. Choose a CD when you can lock funds for 6–60 months to protect a guaranteed APY against future rate cuts.',
    differences: [
      { label: 'Interest Rate Type', a: 'Variable APY (changes with central bank rates)', b: 'Fixed APY locked for the entire term' },
      { label: 'Liquidity & Access', a: 'Withdraw anytime without penalty', b: 'Locked until maturity; early withdrawal penalty applies' },
      { label: 'Additional Deposits', a: 'Add recurring contributions anytime', b: 'Single lump-sum deposit at account opening' },
      { label: 'Best Rate Environment', a: 'Rising interest rate cycles', b: 'Peaking or falling interest rate cycles' },
      { label: 'Ideal Use Case', a: 'Emergency reserves & short-term sinking funds', b: 'Dated goals (tuition, down payment in 1–5 years)' }
    ],
    translations: {
      es: {
        title: 'Cuenta de Ahorro de Alto Rendimiento (HYSA) vs. Certificado de Depósito (CD)',
        seoTitle: 'Cuenta de Ahorro vs Certificado de Depósito (CD) | Rendimiento y Liquidez',
        seoDescription: 'Compare cuentas de ahorro remuneradas y certificados de depósito a plazo fijo. Evalúe liquidez, tasas fijas vs variables y penalizaciones.',
        verdict: 'Utilice una cuenta de ahorro remunerada para fondos de emergencia que requieren liquidez inmediata. Elija un depósito a plazo fijo (CD) cuando pueda inmovilizar el capital para asegurar una tasa fija ante posibles recortes.',
        differences: [
          { label: 'Tipo de Rendimiento', a: 'Tasa APY variable según el mercado', b: 'Tasa APY fija garantizada durante todo el plazo' },
          { label: 'Liquidez y Retiros', a: 'Disponibilidad inmediata sin penalización', b: 'Penalización por retiro anticipado antes del vencimiento' },
          { label: 'Aportaciones Adicionales', a: 'Permite depósitos periódicos en cualquier momento', b: 'Depósito único al momento de apertura' },
          { label: 'Escenario Óptimo de Tasas', a: 'Ciclos de tasas de interés al alza', b: 'Ciclos de tasas estables o a la baja' },
          { label: 'Uso Recomendado', a: 'Fondo de emergencia y liquidez mensual', b: 'Metas con fecha fija (1 a 5 años)' }
        ]
      },
      fr: {
        title: 'Livret d’Épargne à Haut Rendement vs Compte à Terme (CD)',
        seoTitle: 'Livret d’Épargne vs Compte à Terme | Taux, Liquidité & Pénalités',
        seoDescription: 'Comparez un livret d’épargne rémunéré et un compte à terme (dépôt à terme). Analysez taux variable vs fixe, disponibilité des fonds et fiscalité.',
        verdict: 'Privilégiez le livret d’épargne rémunéré pour votre épargne de précaution disponible à tout moment. Optez pour un compte à terme afin de verrouiller un taux garanti si vous n’avez pas besoin du capital avant l’échéance.',
        differences: [
          { label: 'Nature du Taux', a: 'Taux variable révisable à tout moment', b: 'Taux fixe contractuellement garanti jusqu’au terme' },
          { label: 'Disponibilité des Fonds', a: 'Retraits libres sans pénalité', b: 'Capital bloqué ; pénalité en cas de sortie anticipée' },
          { label: 'Versements Complémentaires', a: 'Versements programmés libres', b: 'Versement unique à l’ouverture du contrat' },
          { label: 'Contexte de Taux Idéal', a: 'Hausse des taux directeurs', b: 'Pic ou baisse anticipée des taux d’intérêt' },
          { label: 'Objectif Privilégié', a: 'Fonds d’urgence et trésorerie flexible', b: 'Projet daté à horizon 6 à 60 mois' }
        ]
      },
      de: {
        title: 'Tagesgeld (HYSA) vs. Festgeld (CD)',
        seoTitle: 'Tagesgeld vs Festgeld Vergleich | Zinsen, Verfügbarkeit & Laufzeit',
        seoDescription: 'Vergleichen Sie Tagesgeld und Festgeld direkt miteinander: variable vs. feste Zinssätze, tägliche Verfügbarkeit, Einlagensicherung und Rendite.',
        verdict: 'Tagesgeld ist die erste Wahl für den Notgroschen und jederzeit verfügbare Rücklagen. Festgeld lohnt sich, wenn Sie Kapital für 6 bis 60 Monate fest anlegen und sich gegen sinkende Zinsen absichern möchten.',
        differences: [
          { label: 'Zinsbindung', a: 'Variabler Zinssatz (jederzeit anpassbar)', b: 'Garantierter Festzins über die gesamte Laufzeit' },
          { label: 'Verfügbarkeit', a: 'Täglich ohne Kündigungsfrist abrufbar', b: 'Gebunden bis Laufzeitende (Vorfälligkeitsabzug)' },
          { label: 'Zuzahlungen', a: 'Flexible Sparraten jederzeit möglich', b: 'Einmalanlage bei Vertragsabschluss' },
          { label: 'Optimales Zinsumfeld', a: 'Steigende Leitzinsen', b: 'Höchststand oder fallende Leitzinsen' },
          { label: 'Idealer Einsatzzweck', a: 'Notgroschen & kurzfristige Liquidität', b: 'Planbare Ausgaben in 1 bis 5 Jahren' }
        ]
      }
    }
  },
  {
    slug: 'mutual-fund-vs-401k',
    title: 'Taxable Mutual Fund vs. 401(k) Retirement Plan',
    seoTitle: 'Mutual Fund vs 401(k) Calculator & Comparison | Fees, Taxes & Limits',
    seoDescription: 'Compare investing in a taxable mutual fund brokerage account versus a workplace 401(k). Evaluate tax deferral, employer matches, expense ratios, and early withdrawal rules.',
    toolA: 'mutual-fund-calculator',
    toolB: '401k-calculator',
    verdict: 'A 401(k) is a tax-advantaged account wrapper (offering an employer match and up to $24,500 in 2026 tax-sheltered contributions), whereas a mutual fund is an investment vehicle you can hold inside either a 401(k) or a flexible taxable brokerage account.',
    differences: [
      { label: 'Structural Role', a: 'Pooled investment vehicle (taxable if held in brokerage)', b: 'Employer-sponsored tax-advantaged retirement account' },
      { label: '2026 Contribution Limit', a: 'Unlimited in standard brokerage accounts', b: '$24,500 employee limit ($32,500 if age 50+)' },
      { label: 'Tax Treatment', a: 'Annual dividend/capital gains tax in taxable accounts', b: 'Tax-deferred growth (or tax-free for Roth 401(k))' },
      { label: 'Employer Match', a: 'None', b: 'Commonly 3%–6% of salary (instant 100% return)' },
      { label: 'Withdrawal Access', a: 'Penalty-free liquidity at any age', b: '10% penalty generally applies before age 59½' }
    ],
    translations: {
      es: {
        title: 'Fondo Mutuo Gravable vs. Plan de Jubilación 401(k)',
        seoTitle: 'Fondo Mutuo vs 401(k) | Impuestos, Comisiones y Límites 2026',
        seoDescription: 'Compare invertir en fondos mutuos en cuenta bursátil frente a un plan 401(k). Evalúe diferimiento fiscal, aporte patronal y retiros anticipados.',
        verdict: 'Un 401(k) es una cuenta con ventajas fiscales (con aporte patronal y límite de 24.500 $ en 2026), mientras que un fondo mutuo es un instrumento de inversión con liquidez total si se adquiere fuera de planes de retiro.',
        differences: [
          { label: 'Naturaleza Financiera', a: 'Vehículo de inversión colectiva', b: 'Cuenta de retiro patrocinada por el empleador' },
          { label: 'Límite de Aporte 2026', a: 'Sin límite en cuentas bursátiles estándar', b: '24.500 $ (32.500 $ para mayores de 50 años)' },
          { label: 'Tratamiento Fiscal', a: 'Tributa por dividendos y plusvalías realizadas', b: 'Crecimiento diferido o exento (Roth 401k)' },
          { label: 'Aporte del Empleador', a: 'No disponible', b: 'Frecuente entre 3 % y 6 % del salario' },
          { label: 'Acceso al Capital', a: 'Retiro libre a cualquier edad', b: 'Penalización habitual del 10 % antes de los 59,5 años' }
        ]
      },
      fr: {
        title: 'Fonds Commun de Placement vs Plan Retraite 401(k)',
        seoTitle: 'Fonds Commun vs 401(k) | Fiscalité, Plafonds 2026 & Liquidité',
        seoDescription: 'Comparez l’investissement en fonds commun imposable et l’enveloppe retraite 401(k) : abondement employeur, frais de gestion, fiscalité et disponibilité.',
        verdict: 'Le 401(k) est une enveloppe fiscale retraite (avec abondement employeur et plafond de 24 500 $ en 2026), alors que le fonds commun détenu sur compte-titres ordinaire offre une liquidité immédiate sans condition d’âge.',
        differences: [
          { label: 'Nature Juridique', a: 'Véhicule d’investissement collectif', b: 'Enveloppe d’épargne retraite d’entreprise' },
          { label: 'Plafond de Versement 2026', a: 'Illimité en compte-titres ordinaire', b: '24 500 $ (32 500 $ dès 50 ans)' },
          { label: 'Régime Fiscal', a: 'Imposition annuelle des dividendes et plus-values', b: 'Croissance capitalisée en franchise d’impôt' },
          { label: 'Abondement Employeur', a: 'Aucun', b: 'Souvent 3 % à 6 % du salaire brut' },
          { label: 'Liquidité Avant Retraite', a: 'Retrait libre à tout âge', b: 'Pénalité standard de 10 % avant 59 ans et demi' }
        ]
      },
      de: {
        title: 'Investmentfonds (Depot) vs. 401(k)-Altersvorsorgeplan',
        seoTitle: 'Investmentfonds vs 401(k) Vergleich | Steuern, Gebühren & Flexibilität',
        seoDescription: 'Vergleichen Sie freie Investmentfonds im Wertpapierdepot mit einem steuerbegünstigten 401(k)-Plan: Arbeitgeberzuschuss, Steuerstundung und Entnahme.',
        verdict: 'Ein 401(k) ist ein steuerbegünstigter Vorsorgemantel (mit Arbeitgeberzuschuss und 24.500 $ Limit 2026), während ein freies Fondsdepot unbegrenzte Einzahlungen und jederzeitige Verfügbarkeit ohne Altersgrenze bietet.',
        differences: [
          { label: 'Struktur', a: 'Anlageprodukt im freien Wertpapierdepot', b: 'Betrieblicher Altersvorsorgemantel (US-Recht)' },
          { label: 'Einzahlungslimit 2026', a: 'Unbegrenzt', b: '24.500 $ Arbeitnehmerbeitrag (32.500 $ ab 50 J.)' },
          { label: 'Besteuerung', a: 'Laufende Kapitalertragsteuer auf Ausschüttungen', b: 'Steuerstundung bzw. steuerfrei bei Roth 401(k)' },
          { label: 'Arbeitgeberzuschuss', a: 'Keiner', b: 'Häufig 3 %–6 % des Gehalts' },
          { label: 'Vorzeitige Entnahme', a: 'Jederzeit straffrei verkäuflich', b: 'Meist 10 % Strafsteuer vor Alter 59,5' }
        ]
      }
    }
  },
  {
    slug: 'heloc-vs-personal-loan',
    title: 'HELOC vs. Personal Loan',
    seoTitle: 'HELOC vs Personal Loan Calculator | Rates, Collateral & Repayment',
    seoDescription: 'Compare a Home Equity Line of Credit (HELOC) and an unsecured Personal Loan. Analyze APRs, variable vs fixed rates, home collateral risk, and closing fees.',
    toolA: 'heloc-calculator',
    toolB: 'personal-loan-calculator',
    verdict: 'Choose a HELOC for large, staged home renovations ($30,000+) when you have 20%+ home equity and want lower rates. Choose an unsecured personal loan for smaller, fixed budgets when you want fast funding without putting your home up as collateral.',
    differences: [
      { label: 'Collateral Required', a: 'Secured by your home (foreclosure risk on default)', b: 'Unsecured — no home equity or collateral pledged' },
      { label: 'Interest Rate Structure', a: 'Typically variable APR tied to Prime Rate', b: 'Fixed APR and fixed monthly payment' },
      { label: 'Typical Borrowing Limit', a: 'Up to 80%–85% combined LTV ($25k–$500k+)', b: '$1,000 to $50,000–$100,000' },
      { label: 'Funding Speed & Closing Costs', a: '2–6 weeks; appraisal and closing fees may apply', b: '1–3 business days; minimal or $0 origination fees' },
      { label: 'Disbursement Style', a: 'Revolving credit line — borrow only what you need', b: 'Single lump sum disbursed upfront' }
    ],
    translations: {
      es: {
        title: 'Línea de Crédito Hipotecario (HELOC) vs. Préstamo Personal',
        seoTitle: 'HELOC vs Préstamo Personal | Tasas, Garantía y Plazos',
        seoDescription: 'Compare una línea de crédito con garantía hipotecaria (HELOC) y un préstamo personal sin aval. Analice tasas fijas vs variables y riesgo patrimonial.',
        verdict: 'Elija una HELOC para reformas importantes si posee capital acumulado en su vivienda y busca tasas más bajas. Opte por un préstamo personal para montos menores, desembolso rápido y sin arriesgar su inmueble.',
        differences: [
          { label: 'Garantía Exigida', a: 'Garantizado con su vivienda', b: 'Sin garantía hipotecaria ni aval real' },
          { label: 'Tipo de Interés', a: 'Generalmente variable ligado a tasa preferencial', b: 'Tasa fija y cuota mensual invariable' },
          { label: 'Monto Máximo', a: 'Hasta 80 %–85 % del valor neto de la vivienda', b: 'Normalmente entre 1.000 $ y 50.000 $' },
          { label: 'Rapidez de Aprobación', a: '2 a 6 semanas con tasación inmobiliaria', b: '24 a 72 horas hábiles' },
          { label: 'Formato de Disposición', a: 'Línea revolvente según avance del proyecto', b: 'Suma global única al inicio' }
        ]
      },
      fr: {
        title: 'Ligne de Crédit Hypothécaire (HELOC) vs Prêt Personnel',
        seoTitle: 'HELOC vs Prêt Personnel | Taux, Garantie & Flexibilité',
        seoDescription: 'Comparez une marge de crédit hypothécaire (HELOC) et un prêt personnel non garanti : taux variable ou fixe, garantie immobilière et délai de déblocage.',
        verdict: 'La marge hypothécaire (HELOC) convient aux gros travaux échelonnés grâce à des taux réduits adossés à votre bien. Le prêt personnel reste préférable pour un besoin ponctuel rapide sans hypothéquer votre logement.',
        differences: [
          { label: 'Garantie Requise', a: 'Hypothèque sur votre résidence', b: 'Aucune garantie réelle ni hypothèque' },
          { label: 'Structure de Taux', a: 'Taux variable indexé sur le taux directeur', b: 'Taux fixe et mensualité constante' },
          { label: 'Plafond Finançable', a: 'Jusqu’à 80 %–85 % de la valeur du bien', b: 'Généralement de 1 000 € à 75 000 €' },
          { label: 'Délai de Déblocage', a: '2 à 6 semaines avec expertise immobilière', b: 'Rapide (quelques jours après accord)' },
          { label: 'Versement des Fonds', a: 'Ligne renouvelable tirée selon vos besoins', b: 'Capital versé en une seule fois' }
        ]
      },
      de: {
        title: 'Grundschuldkredit (HELOC) vs. Ratenkredit (Privatkredit)',
        seoTitle: 'HELOC vs Ratenkredit Vergleich | Zinsen, Sicherheit & Auszahlung',
        seoDescription: 'Vergleichen Sie einen grundschuldbesicherten Kreditrahmen (HELOC) mit einem unbesicherten Ratenkredit: Zinsbindung, Risiko und Auszahlungsdauer.',
        verdict: 'Ein grundschuldbesicherter Kreditrahmen (HELOC) senkt die Zinskosten bei großen Sanierungen deutlich, erfordert aber Immobilienbesicherung. Ein Ratenkredit bietet feste Raten, schnelle Auszahlung und schützt Ihr Eigenheim.',
        differences: [
          { label: 'Besicherung', a: 'Abgesichert über Ihre Immobilie', b: 'Unbesichert — kein Grundbucheintrag nötig' },
          { label: 'Zinsstruktur', a: 'Meist variabler Zinssatz', b: 'Fester Sollzins über die gesamte Laufzeit' },
          { label: 'Kreditrahmen', a: 'Bis ca. 80 %–85 % des Beleihungswerts', b: 'Typischerweise 1.000 € bis 100.000 €' },
          { label: 'Bearbeitungszeit', a: '2 bis 6 Wochen inkl. Wertermittlung', b: 'Oft innerhalb von 24 bis 72 Stunden' },
          { label: 'Auszahlungsart', a: 'Flexibler Abrufkredit nach Baufortschritt', b: 'Einmalige Auszahlung der Gesamtsumme' }
        ]
      }
    }
  },
  {
    slug: 'auto-lease-vs-auto-loan',
    title: 'Car Lease vs. Auto Loan (Buy)',
    seoTitle: 'Car Lease vs Auto Loan Comparison | Monthly Cost, Equity & Mileage',
    seoDescription: 'Compare leasing a car versus financing with an auto loan. Weigh lower monthly payments, mileage limits, wear-and-tear fees, and long-term ownership equity.',
    toolA: 'lease-calculator',
    toolB: 'auto-loan-calculator',
    verdict: 'Buying with an auto loan almost always costs less over 6–10 years because you own a debt-free asset once payments end. Leasing makes sense if you want lower monthly payments, always drive a new under-warranty car, and drive fewer than 12,000 miles/year.',
    differences: [
      { label: 'Monthly Payment', a: 'Lower — you pay only for depreciation + money factor', b: 'Higher — you finance the entire vehicle price' },
      { label: 'End-of-Term Ownership', a: '$0 equity unless you pay residual buyout price', b: '100% vehicle ownership and resale value' },
      { label: 'Mileage Restrictions', a: 'Strict cap (10,000–15,000 mi/yr; $0.15–$0.30/mi excess)', b: 'Unlimited mileage' },
      { label: 'Maintenance & Warranty', a: 'Nearly always covered by factory bumper-to-bumper warranty', b: 'Owner covers repairs after warranty expires' },
      { label: 'Long-Term 8-Year Cost', a: 'Higher — perpetual payments across consecutive leases', b: 'Lowest — years of payment-free driving' }
    ],
    translations: {
      es: {
        title: 'Leasing Automotriz vs. Préstamo para Comprar Auto',
        seoTitle: 'Leasing vs Crédito Automotriz | Cuota Mensual, Kilometraje y Valor',
        seoDescription: 'Compare arrendar un vehículo (leasing) frente a comprarlo con préstamo automotriz. Evalúe cuotas mensuales, límites de kilómetros y costo a 8 años.',
        verdict: 'Comprar con crédito automotriz casi siempre es más económico a 6–10 años porque conserva el valor residual del vehículo. El leasing conviene si prioriza cuotas bajas, garantía vigente y menos de 15.000 km al año.',
        differences: [
          { label: 'Cuota Mensual', a: 'Más baja (solo cubre depreciación y cargo financiero)', b: 'Más alta (amortiza el precio íntegro del vehículo)' },
          { label: 'Propiedad al Final', a: 'Sin capital propio salvo pago del valor residual', b: '100 % propietario con valor de reventa' },
          { label: 'Límite de Kilometraje', a: 'Restringido (penalización por kilómetro extra)', b: 'Kilometraje ilimitado' },
          { label: 'Garantía y Mantenimiento', a: 'Cubierto por garantía de fábrica casi todo el plazo', b: 'Gastos de reparación a cargo del dueño tras garantía' },
          { label: 'Costo Total a 8 Años', a: 'Más alto por contratos consecutivos permanentes', b: 'Más bajo gracias a años sin cuotas mensuales' }
        ]
      },
      fr: {
        title: 'Leasing Automobile (LOA/LLD) vs Crédit Auto',
        seoTitle: 'Leasing Auto vs Crédit Auto | Mensualités, Kilométrage & Coût Réel',
        seoDescription: 'Comparez la location avec option d’achat (LOA/LLD) et le crédit auto classique. Mesurez l’écart de mensualité, les frais de remise en état et le coût sur 8 ans.',
        verdict: 'L’achat à crédit revient presque toujours moins cher sur 6 à 10 ans grâce à la valeur de revente et aux années sans mensualité. Le leasing reste intéressant pour renouveler souvent un véhicule garanti avec un kilométrage maîtrisé.',
        differences: [
          { label: 'Loyer / Mensualité', a: 'Plus faible (finance la décote sur 24–48 mois)', b: 'Plus élevée (rembourse 100 % du prix d’achat)' },
          { label: 'Propriété en Fin de Contrat', a: 'Restitution ou rachat à la valeur résiduelle', b: 'Pleine propriété et revente libre' },
          { label: 'Plafond Kilométrique', a: 'Limité (10 000 à 20 000 km/an, pénalités au-delà)', b: 'Kilométrage illimité' },
          { label: 'Frais de Remise en État', a: 'Facturés en cas d’usure anormale à la restitution', b: 'Aucun contrôle de restitution' },
          { label: 'Coût Global sur 8 Ans', a: 'Élevé (loyers ininterrompus)', b: 'Optimal après la fin du remboursement' }
        ]
      },
      de: {
        title: 'Auto-Leasing vs. Autokredit (Kauf)',
        seoTitle: 'Auto-Leasing vs Autokredit Vergleich | Monatsrate, Kilometer & Restwert',
        seoDescription: 'Vergleichen Sie Kfz-Leasing und Autokredit: monatliche Belastung, Kilometerbegrenzung, Rückgabekosten und Gesamtkosten über 8 Jahre.',
        verdict: 'Ein Autokredit ist über 6 bis 10 Jahre fast immer wirtschaftlicher, da das Fahrzeug nach Tilgung schuldenfrei Ihnen gehört. Leasing passt bei niedrigen Ratenwünschen, planbarer Garantie und unter 15.000 km/Jahr.',
        differences: [
          { label: 'Monatliche Rate', a: 'Niedriger — deckt primär Wertverlust und Zins', b: 'Höher — finanziert den vollen Kaufpreis' },
          { label: 'Eigentum am Vertragsende', a: 'Kein Eigentum (Rückgabe an Leasinggeber)', b: 'Volles Eigentum inkl. Wiederverkaufswert' },
          { label: 'Kilometerbegrenzung', a: 'Vertraglich begrenzt (Mehrkilometer kosten Aufpreis)', b: 'Unbegrenzte Fahrleistung' },
          { label: 'Rückgaberisiko', a: 'Nachzahlungen für Kratzer & Gebrauchsspuren möglich', b: 'Keine Rückgabegutachten' },
          { label: 'Langfristige 8-Jahres-Kosten', a: 'Höher durch fortlaufende Anschlussverträge', b: 'Günstigster Weg dank ratenfreier Nutzungsjahre' }
        ]
      }
    }
  },
  {
    slug: 'cash-back-vs-low-interest-auto',
    title: 'Dealer Cash-Back Rebate vs. 0% Low-Interest Financing',
    seoTitle: 'Cash Back Rebate vs Low Interest Auto Loan | Which Saves More?',
    seoDescription: 'Compare taking a manufacturer cash-back rebate with a bank auto loan versus accepting promotional 0%–1.9% dealer financing.',
    toolA: 'cash-back-vs-low-interest-calculator',
    toolB: 'auto-loan-calculator',
    verdict: 'For larger loans ($35,000+) and longer terms (60–72 months), 0%–1.9% promotional financing usually beats a modest $1,500–$2,500 rebate. For smaller loans or short 36-month payoffs, an upfront cash rebate often yields lower total cost.',
    differences: [
      { label: 'How Savings Apply', a: 'Reduces financed principal immediately on Day 1', b: 'Reduces monthly interest expense across all payments' },
      { label: 'Sales Tax Impact', a: 'May still tax pre-rebate price in some U.S. states', b: 'No effect on vehicle purchase price tax' },
      { label: 'Early Payoff Advantage', a: 'You keep 100% of the rebate even if you pay off early', b: 'Early payoff reduces total value of promotional APR' },
      { label: 'Credit Score Requirement', a: 'Available to almost all buyers regardless of credit tier', b: 'Typically restricted to Tier-1 credit (720–740+)' },
      { label: 'Best Term Length', a: '36–48 month loans or cash purchases', b: '60–72 month loans on higher-priced vehicles' }
    ],
    translations: {
      es: {
        title: 'Bono de Reembolso (Cash Back) vs. Financiamiento a Tasa Baja',
        seoTitle: 'Reembolso en Efectivo vs Tasa 0 % en Autos | Comparador',
        seoDescription: 'Compare aceptar un bono de descuento en efectivo con préstamo bancario frente a un financiamiento promocional al 0 %–1,9 % del concesionario.',
        verdict: 'En vehículos de mayor precio y plazos de 60–72 meses, el financiamiento promocional al 0 % suele superar a un bono moderado. En montos bajos o pagos anticipados, el reembolso directo ahorra más.',
        differences: [
          { label: 'Mecanismo de Ahorro', a: 'Reduce el capital financiado desde el día 1', b: 'Elimina o minimiza los intereses mensuales' },
          { label: 'Si Liquida Anticipadamente', a: 'Conserva el 100 % del descuento recibido', b: 'Aprovecha menos meses de tasa promocional' },
          { label: 'Requisito Crediticio', a: 'Disponible para casi cualquier perfil', b: 'Reservado a puntajes crediticios excelentes' },
          { label: 'Plazo Más Favorable', a: '36 a 48 meses o compra al contado', b: '60 a 72 meses en vehículos de alto valor' }
        ]
      },
      fr: {
        title: 'Remise Immédiate (Cash Back) vs Financement à Taux Zéro',
        seoTitle: 'Remise Constructeur vs Crédit Auto 0 % | Comparatif Financier',
        seoDescription: 'Comparez une prime de remise immédiate avec crédit bancaire classique face à une offre constructeur à taux 0 % ou réduit.',
        verdict: 'Sur un montant élevé financé sur 60 mois, le taux 0 % surpasse souvent une petite remise. En revanche, si vous remboursez vite ou financez peu, la remise immédiate reste plus rentable.',
        differences: [
          { label: 'Effet Financier', a: 'Diminue le capital emprunté dès l’achat', b: 'Supprime les intérêts sur la durée du prêt' },
          { label: 'Remboursement Anticipé', a: 'Gain 100 % acquis même en cas de solde rapide', b: 'Avantage moindre si le prêt est soldé tôt' },
          { label: 'Accès selon Dossier', a: 'Accessible à la majorité des acheteurs', b: 'Exige souvent un profil emprunteur irréprochable' },
          { label: 'Durée Optimale', a: 'Achat comptant ou crédit court (36 mois)', b: 'Financement long (60 à 72 mois)' }
        ]
      },
      de: {
        title: 'Barzahlerrabatt (Cashback) vs. 0 %-Händlerfinanzierung',
        seoTitle: 'Barzahlerrabatt vs 0 %-Finanzierung Auto | Was spart mehr?',
        seoDescription: 'Vergleichen Sie einen Händler-Barzahlerrabatt mit Bankkredit gegen eine 0 %-Aktionsfinanzierung. Berechnen Sie den echten Gesamtkostenvorteil.',
        verdict: 'Bei hohen Kaufpreisen und 60 Monaten Laufzeit schlägt eine echte 0 %-Finanzierung häufig kleine Rabatte. Bei hohen Barzahlerrabatten (10 %+) oder schneller Tilgung ist der Rabatt mit günstigem Bankkredit überlegen.',
        differences: [
          { label: 'Sparmechanismus', a: 'Sofortiger Abzug vom Fahrzeugpreis', b: 'Zinsersparnis über die gesamte Kreditlaufzeit' },
          { label: 'Vorzeitige Ablösung', a: 'Rabatt bleibt zu 100 % erhalten', b: 'Zinsvorteil sinkt bei verkürzter Laufzeit' },
          { label: 'Bonitätsanforderung', a: 'Für nahezu alle Käufer verfügbar', b: 'Oft an erstklassige Bonität gekoppelt' },
          { label: 'Optimale Laufzeit', a: 'Kurze Laufzeiten (24–48 Monate) oder Barkauf', b: 'Lange Laufzeiten (60–72 Monate)' }
        ]
      }
    }
  },
  {
    slug: 'annuity-vs-401k',
    title: 'Annuity vs. 401(k) for Retirement Income',
    seoTitle: 'Annuity vs 401(k) Comparison | Fees, Guarantees & Contribution Caps',
    seoDescription: 'Compare annuities and 401(k) plans for retirement planning. Review guaranteed lifetime income, surrender fees, employer matches, and 2026 IRS contribution rules.',
    toolA: 'annuity-calculator',
    toolB: '401k-calculator',
    verdict: 'Always fund your workplace 401(k) first — especially up to the full employer match — due to lower fees and immediate tax deductions. Consider an annuity only after maxing tax-advantaged accounts if you specifically want insurance-backed guaranteed lifetime income.',
    differences: [
      { label: 'Primary Strength', a: 'Contractual guaranteed income floor for life', b: 'Low-cost market compounding + employer match' },
      { label: 'Annual Contribution Cap (2026)', a: 'No IRS statutory cap on non-qualified annuities', b: '$24,500 employee cap ($32,500 if 50+)' },
      { label: 'Fee Structure', a: 'Mortality/expense & rider fees (often 1%–3%/yr)', b: 'Low institutional index fund fees (0.03%–0.50%)' },
      { label: 'Liquidity & Surrender Charges', a: 'Multi-year surrender periods (5–10 yrs) often apply', b: 'No insurer surrender charges (IRS age 59½ rule applies)' },
      { label: 'Estate & Legacy Value', a: 'Life-only payouts end at death unless rider is bought', b: '100% of remaining account balance passes to heirs' }
    ],
    translations: {
      es: {
        title: 'Anualidad (Renta Vitalicia) vs. Plan 401(k)',
        seoTitle: 'Anualidad vs 401(k) para Jubilación | Comisiones y Renta Garantizada',
        seoDescription: 'Compare anualidades de jubilación frente a un plan 401(k). Analice ingresos vitalicios garantizados, cargos por rescate, aporte patronal y límites 2026.',
        verdict: 'Priorice siempre el plan 401(k) hasta captar todo el aporte patronal gracias a sus bajas comisiones. Considere una anualidad únicamente después de maximizar cuentas fiscales si busca un piso de ingresos vitalicio asegurado.',
        differences: [
          { label: 'Ventaja Principal', a: 'Ingreso vitalicio garantizado por aseguradora', b: 'Crecimiento bursátil de bajo costo + aporte patronal' },
          { label: 'Límite de Aportación 2026', a: 'Sin tope IRS en anualidades no calificadas', b: '24.500 $ (32.500 $ mayores de 50 años)' },
          { label: 'Costos y Comisiones', a: 'Comisiones de seguro y cláusulas (1 %–3 % anual)', b: 'Fondos indexados de bajo costo (0,03 %–0,50 %)' },
          { label: 'Herencia del Saldo', a: 'Depende de cláusulas de supervivencia contratadas', b: 'El 100 % del saldo remanente pasa a beneficiarios' }
        ]
      },
      fr: {
        title: 'Rente Viagère (Annuity) vs Plan Retraite 401(k)',
        seoTitle: 'Rente Viagère vs 401(k) | Revenus Garantis, Frais & Succession',
        seoDescription: 'Comparez une rente viagère assurantielle et un plan de retraite par capitalisation 401(k) : frais annuels, garantie à vie et transmission du capital.',
        verdict: 'Alimentez d’abord le 401(k) pour profiter de l’abondement employeur et des frais réduits. Une rente viagère ne se justifie qu’en complément si vous recherchez un revenu plancher garanti à vie.',
        differences: [
          { label: 'Atout Principal', a: 'Revenu viager contractuellement garanti à vie', b: 'Capitalisation boursière à frais réduits + abondement' },
          { label: 'Plafond Annuel 2026', a: 'Aucun plafond légal hors enveloppe fiscale', b: '24 500 $ (32 500 $ à partir de 50 ans)' },
          { label: 'Frais Annuels', a: 'Frais de contrat et d’options (souvent 1 %–3 %/an)', b: 'Fonds indiciels institutionnels (0,03 %–0,50 %)' },
          { label: 'Transmission aux Héritiers', a: 'Capital aliéné sauf option de réversion payante', b: '100 % du solde transmis aux bénéficiaires' }
        ]
      },
      de: {
        title: 'Rentenversicherung (Annuity) vs. 401(k)-Vorsorgeplan',
        seoTitle: 'Rentenversicherung vs 401(k) Vergleich | Gebühren, Garantie & Erbe',
        seoDescription: 'Vergleichen Sie eine Leibrente (Annuity) mit einem 401(k)-Altersvorsorgeplan: lebenslange Rentengarantie, laufende Gebühren, Arbeitgeberzuschuss und Vererbung.',
        verdict: 'Besparung eines 401(k) hat wegen Arbeitgeberzuschuss und niedriger Indexfonds-Gebühren fast immer Vorrang. Eine Rentenversicherung eignet sich ergänzend für Anleger, die eine garantierte lebenslange Basisrente wünschen.',
        differences: [
          { label: 'Kernvorteil', a: 'Vertraglich garantierte lebenslange Auszahlung', b: 'Günstiges Kapitalmarktwachstum + Arbeitgeberzuschuss' },
          { label: 'Einzahlungslimit 2026', a: 'Kein gesetzlicher Höchstbetrag', b: '24.500 $ (32.500 $ ab 50 Jahren)' },
          { label: 'Kostenstruktur', a: 'Versicherungs- und Garantiegebühren (oft 1 %–3 % p. a.)', b: 'Niedrige ETF-/Indexkosten (0,03 %–0,50 %)' },
          { label: 'Vererbbarkeit', a: 'Nur mit gesonderter Rentengarantiezeit', b: '100 % des Restkapitals gehen an die Erben' }
        ]
      }
    }
  },
  {
    slug: 'present-value-vs-future-value',
    title: 'Present Value (PV) vs. Future Value (FV)',
    seoTitle: 'Present Value vs Future Value | Time Value of Money Explained',
    seoDescription: 'Compare Present Value (discounting) and Future Value (compounding) formulas in finance. Learn when to discount future cash flows versus compound current investments.',
    toolA: 'present-value-calculator',
    toolB: 'future-value-calculator',
    verdict: 'Present Value answers what a future payout is worth in today’s dollars by discounting; Future Value answers how much today’s money will grow to by compounding. They are mathematical inverses connected by (1 + r)^n.',
    differences: [
      { label: 'Core Equation', a: 'PV = FV / (1 + r)^n', b: 'FV = PV × (1 + r)^n' },
      { label: 'Direction in Time', a: 'Backward (Future → Today)', b: 'Forward (Today → Future)' },
      { label: 'Mathematical Process', a: 'Discounting future cash flows', b: 'Compounding current capital' },
      { label: 'Effect of Higher Rate (r)', a: 'Decreases Present Value', b: 'Increases Future Value' },
      { label: 'Primary Applications', a: 'Bond pricing, DCF valuation, lump-sum vs annuity choice', b: 'Retirement projections, college savings, CD maturity' }
    ],
    translations: {
      es: {
        title: 'Valor Presente (VP) vs. Valor Futuro (VF)',
        seoTitle: 'Valor Presente vs Valor Futuro | Fórmulas del Valor del Dinero en el Tiempo',
        seoDescription: 'Compare el Valor Presente (descuento) y el Valor Futuro (capitalización). Comprenda cuándo descontar flujos futuros o proyectar inversiones actuales.',
        verdict: 'El Valor Presente determina cuánto vale hoy un monto futuro mediante descuento; el Valor Futuro proyecta cuánto crecerá un capital actual mediante capitalización compuesta.',
        differences: [
          { label: 'Ecuación Fundamental', a: 'VP = VF / (1 + r)^n', b: 'VF = VP × (1 + r)^n' },
          { label: 'Dirección Temporal', a: 'Hacia atrás (Futuro → Hoy)', b: 'Hacia adelante (Hoy → Futuro)' },
          { label: 'Operación Financiera', a: 'Descuento financiero', b: 'Capitalización compuesta' },
          { label: 'Efecto de Mayor Tasa (r)', a: 'Reduce el Valor Presente', b: 'Aumenta el Valor Futuro' },
          { label: 'Aplicaciones Clave', a: 'Valoración de bonos y proyectos DCF', b: 'Metas de jubilación y crecimiento de ahorros' }
        ]
      },
      fr: {
        title: 'Valeur Actuelle (VA) vs Valeur Future (VF)',
        seoTitle: 'Valeur Actuelle vs Valeur Future | Actualisation & Capitalisation',
        seoDescription: 'Comparez la Valeur Actuelle (actualisation) et la Valeur Future (capitalisation) en mathématiques financières, avec leurs formules et cas d’application.',
        verdict: 'La Valeur Actuelle mesure la valeur aujourd’hui d’un flux futur par actualisation ; la Valeur Future calcule le capital atteint à terme par capitalisation. Ce sont deux opérations exactement inverses.',
        differences: [
          { label: 'Formule de Base', a: 'VA = VF / (1 + r)^n', b: 'VF = VA × (1 + r)^n' },
          { label: 'Sens Temporel', a: 'Rétrospectif (Futur → Aujourd’hui)', b: 'Prospectif (Aujourd’hui → Futur)' },
          { label: 'Mécanisme Mathématique', a: 'Actualisation des flux futurs', b: 'Capitalisation des intérêts' },
          { label: 'Impact d’un Taux Plus Élevé', a: 'Diminue la Valeur Actuelle', b: 'Augmente la Valeur Future' },
          { label: 'Usages Principaux', a: 'Valorisation d’obligations et DCF', b: 'Projections d’épargne retraite et placements' }
        ]
      },
      de: {
        title: 'Barwert (Present Value) vs. Endwert (Future Value)',
        seoTitle: 'Barwert vs Endwert Vergleich | Abzinsung & Aufzinsung erklärt',
        seoDescription: 'Vergleichen Sie Barwert (Abzinsung) und Endwert (Aufzinsung) in der Finanzmathematik: Formeln, Zinseffekte und typische Praxisanwendungen.',
        verdict: 'Der Barwert zeigt durch Abzinsung, was eine künftige Zahlung heute wert ist; der Endwert zeigt durch Aufzinsung, auf welchen Betrag heutiges Kapital anwächst.',
        differences: [
          { label: 'Grundformel', a: 'PV = FV / (1 + r)^n', b: 'FV = PV × (1 + r)^n' },
          { label: 'Zeitrichtung', a: 'Rückwärts (Zukunft → Heute)', b: 'Vorwärts (Heute → Zukunft)' },
          { label: 'Rechenverfahren', a: 'Diskontierung (Abzinsung)', b: 'Aufzinsung (Zinseszins)' },
          { label: 'Wirkung höherer Zinsen (r)', a: 'Senkt den Barwert', b: 'Erhöht den Endwert' },
          { label: 'Typische Praxisbeispiele', a: 'Anleihebewertung, DCF-Analyse, Abfindungen', b: 'Altersvorsorge, Sparplan-Endkapital' }
        ]
      }
    }
  },
  {
    slug: 'bond-vs-cd-investment',
    title: 'Bonds vs. Certificates of Deposit (CDs)',
    seoTitle: 'Bonds vs CDs Comparison | Yield, Liquidity, Risk & Taxes',
    seoDescription: 'Compare fixed-income bonds (Treasury & Corporate) with bank Certificates of Deposit (CDs). Evaluate FDIC insurance, market price risk, yield, and tax advantages.',
    toolA: 'bond-calculator',
    toolB: 'cd-calculator',
    verdict: 'CDs offer FDIC-insured principal safety with zero market price fluctuation, making them ideal for conservative savers holding to maturity. U.S. Treasury and municipal bonds offer superior liquidity, potential capital gains when rates fall, and state/federal tax exemptions.',
    differences: [
      { label: 'Principal Protection', a: 'Issuer credit backing (full faith & credit for Treasuries)', b: 'FDIC / NCUA insured up to $250,000 per depositor' },
      { label: 'Early Exit Mechanism', a: 'Sell on secondary market (price fluctuates with rates)', b: 'Redeem with bank for a fixed early withdrawal penalty' },
      { label: 'Interest Rate Sensitivity', a: 'Market price rises when rates fall and drops when rates rise', b: 'No secondary market price fluctuation' },
      { label: 'Tax Advantages', a: 'Treasuries exempt from state tax; munis often federally exempt', b: 'Interest fully taxable at federal and state levels' },
      { label: 'Income Payment Schedule', a: 'Usually semiannual coupon payments', b: 'Compounded monthly/quarterly or paid at maturity' }
    ],
    translations: {
      es: {
        title: 'Bonos de Renta Fija vs. Certificados de Depósito (CD)',
        seoTitle: 'Bonos vs Certificados de Depósito (CD) | Rendimiento, Riesgo e Impuestos',
        seoDescription: 'Compare bonos gubernamentales o corporativos frente a certificados de depósito bancarios: seguridad, liquidez secundaria, sensibilidad a tasas e impuestos.',
        verdict: 'Los CD ofrecen capital asegurado sin volatilidad de precio de mercado. Los bonos soberanos y corporativos brindan mayor liquidez secundaria, posible ganancia de capital si bajan tasas y ventajas fiscales específicas.',
        differences: [
          { label: 'Respaldo del Capital', a: 'Solvencia del Estado o emisor corporativo', b: 'Seguro de depósito bancario garantizado' },
          { label: 'Salida Anticipada', a: 'Venta en mercado secundario a precio de mercado', b: 'Rescate bancario con penalización fija' },
          { label: 'Sensibilidad a Tasas', a: 'El precio sube si bajan tasas y viceversa', b: 'Sin fluctuación diaria de precio' },
          { label: 'Ventajas Fiscales', a: 'Bonos públicos pueden tener exenciones locales', b: 'Intereses gravados de forma ordinaria' }
        ]
      },
      fr: {
        title: 'Obligations vs Comptes à Terme (CD)',
        seoTitle: 'Obligations vs Comptes à Terme | Rendement, Risque de Taux & Fiscalité',
        seoDescription: 'Comparez les obligations d’État ou d’entreprise et les comptes à terme bancaires : sécurité du capital, liquidité de marché et sensibilité aux taux.',
        verdict: 'Les comptes à terme protègent intégralement le capital sans risque de cotation. Les obligations offrent une liquidité sur le marché secondaire, un potentiel de plus-value en cas de baisse des taux et parfois un rendement supérieur.',
        differences: [
          { label: 'Protection du Capital', a: 'Qualité de crédit de l’émetteur (État ou entreprise)', b: 'Garantie bancaire des dépôts (100 000 € en UE / 250 000 $ US)' },
          { label: 'Sortie Avant Échéance', a: 'Revente sur le marché secondaire au cours du jour', b: 'Rachat bancaire soumis à pénalité contractuelle' },
          { label: 'Sensibilité aux Taux', a: 'Cours inversement corrélé aux taux d’intérêt', b: 'Aucune fluctuation de valeur de marché' },
          { label: 'Versement des Revenus', a: 'Coupons semestriels ou annuels', b: 'Intérêts capitalisés ou versés à l’échéance' }
        ]
      },
      de: {
        title: 'Anleihen vs. Festgeld (CD)',
        seoTitle: 'Anleihen vs Festgeld Vergleich | Rendite, Kursrisiko & Einlagensicherung',
        seoDescription: 'Vergleichen Sie Staats- und Unternehmensanleihen mit klassischem Festgeld: Einlagensicherung, Handelbarkeit an der Börse und Zinsänderungsrisiko.',
        verdict: 'Festgeld bietet gesetzliche Einlagensicherung ganz ohne Kursschwankungen. Anleihen überzeugen durch tägliche Börsenhandelbarkeit, Kurschancen bei fallenden Zinsen und breite Laufzeitenwahl.',
        differences: [
          { label: 'Kapitalsicherheit', a: 'Bonität des Emittenten (Staat/Unternehmen)', b: 'Gesetzliche Einlagensicherung bis 100.000 € (EU)' },
          { label: 'Vorzeitiger Ausstieg', a: 'Börsenverkauf jederzeit zum aktuellen Kurs', b: 'In der Regel bis Fälligkeit gesperrt' },
          { label: 'Zinsänderungsrisiko', a: 'Kurse fallen bei Zinsanstieg und steigen bei Zinssenkung', b: 'Kein Börsenkursrisiko' },
          { label: 'Ertragsauszahlung', a: 'Regelmäßige Kuponzahlungen (jährlich/halbjährlich)', b: 'Zinsgutschrift jährlich oder am Laufzeitende' }
        ]
      }
    }
  },
  {
    slug: 'bmr-vs-daily-calories',
    title: 'BMR (Basal Metabolic Rate) vs. TDEE (Daily Calories)',
    seoTitle: 'BMR vs TDEE Calorie Calculator | Understand Daily Energy Expenditure',
    seoDescription: 'Compare Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Learn why you should base fat-loss or muscle-gain targets on TDEE rather than BMR.',
    toolA: 'bmr-calculator',
    toolB: 'calorie-calculator',
    verdict: 'BMR measures only the calories your body burns at complete rest to sustain vital organs. TDEE (daily calorie needs) multiplies BMR by your activity factor (1.2×–1.9×) and is the true number you should use to set weight-loss or muscle-gain calorie targets.',
    differences: [
      { label: 'What It Measures', a: 'Resting organ & cellular energy burn (lying completely still)', b: 'Total 24-hour burn including movement, NEAT, exercise & digestion' },
      { label: 'Mathematical Relationship', a: 'Baseline output of Mifflin-St Jeor equation', b: 'TDEE = BMR × Activity Multiplier (1.2 to 1.9)' },
      { label: 'Typical Value (Active Adult)', a: '~1,400 – 1,850 kcal/day', b: '~2,000 – 2,900 kcal/day' },
      { label: 'Dieting Safety Rule', a: 'Never eat persistently far below BMR without medical oversight', b: 'Subtract 300–500 kcal from TDEE for sustainable fat loss' },
      { label: 'Primary Use Case', a: 'Clinical metabolic baseline assessment', b: 'Daily meal planning, cutting, maintenance & lean bulking' }
    ],
    translations: {
      es: {
        title: 'Tasa Metabólica Basal (TMB/BMR) vs. Gasto Calórico Diario (TDEE)',
        seoTitle: 'TMB (BMR) vs Calorías Diarias (TDEE) | Diferencia y Uso en Dietas',
        seoDescription: 'Compare la Tasa Metabólica Basal (BMR) y el Gasto Energético Diario Total (TDEE). Aprenda cuál cifra usar para perder grasa o ganar músculo.',
        verdict: 'La TMB mide únicamente las calorías consumidas en reposo absoluto. El gasto calórico diario (TDEE) multiplica la TMB por su factor de actividad física y es la referencia real para planificar déficit o superávit calórico.',
        differences: [
          { label: 'Qué Mide', a: 'Consumo energético vital en reposo absoluto', b: 'Gasto total en 24 h (reposo + actividad + ejercicio + digestión)' },
          { label: 'Relación Matemática', a: 'Resultado base de la ecuación Mifflin-St Jeor', b: 'TDEE = TMB × Factor de Actividad (1,2 a 1,9)' },
          { label: 'Rango Típico Adulto Activo', a: '~1.400 – 1.850 kcal/día', b: '~2.000 – 2.900 kcal/día' },
          { label: 'Regla Nutricional Clave', a: 'No conviene bajar crónicamente por debajo de la TMB', b: 'Restar 300–500 kcal al TDEE para bajar grasa' }
        ]
      },
      fr: {
        title: 'Métabolisme de Base (MB/BMR) vs Besoin Calorique Journalier (TDEE)',
        seoTitle: 'Métabolisme de Base (BMR) vs Calories Journalières (TDEE) | Comparatif',
        seoDescription: 'Comparez le Métabolisme de Base (BMR) et la Dépense Énergétique Journalière Totale (TDEE) pour fixer votre objectif calorique sans erreur.',
        verdict: 'Le métabolisme de base ne représente que l’énergie vitale dépensée au repos complet. Le besoin calorique journalier (TDEE) intègre votre niveau d’activité (×1,2 à ×1,9) et constitue la vraie référence pour maigrir ou prendre du muscle.',
        differences: [
          { label: 'Grandeur Mesurée', a: 'Dépense minimale des organes vitaux au repos strict', b: 'Dépense totale sur 24 h (activité quotidienne + sport + digestion)' },
          { label: 'Lien Mathématique', a: 'Base calculée via Mifflin-St Jeor', b: 'TDEE = MB × Facteur d’Activité (1,2 à 1,9)' },
          { label: 'Ordre de Grandeur (Adulte Actif)', a: '~1 400 – 1 850 kcal/jour', b: '~2 000 – 2 900 kcal/jour' },
          { label: 'Règle de Sécurité Nutritionnelle', a: 'Éviter de descendre durablement sous le MB', b: 'Retirer 300 à 500 kcal au TDEE pour une perte de gras saine' }
        ]
      },
      de: {
        title: 'Grundumsatz (BMR) vs. Gesamtumsatz / Kalorienbedarf (TDEE)',
        seoTitle: 'Grundumsatz (BMR) vs Gesamtumsatz (TDEE) | Kalorien richtig planen',
        seoDescription: 'Vergleichen Sie Grundumsatz (BMR) und täglichen Gesamtumsatz (TDEE). Erfahren Sie, welcher Wert für gesundes Abnehmen und Muskelaufbau entscheidend ist.',
        verdict: 'Der Grundumsatz beziffert nur den Ruheverbrauch lebenswichtiger Organe. Der Gesamtumsatz (TDEE) berücksichtigt zusätzlich Alltag und Sport (PAL 1,2–1,9) und bildet die korrekte Basis für jedes Kaloriendefizit.',
        differences: [
          { label: 'Messbereich', a: 'Energieverbrauch bei absoluter körperlicher Ruhe', b: 'Gesamter 24h-Verbrauch inkl. Alltag, Sport & Verdauung' },
          { label: 'Formelzusammenhang', a: 'Basiswert nach Mifflin-St Jeor', b: 'Gesamtumsatz = Grundumsatz × PAL-Faktor (1,2–1,9)' },
          { label: 'Typische Werte (aktiver Erwachsener)', a: '~1.400 – 1.850 kcal/Tag', b: '~2.000 – 2.900 kcal/Tag' },
          { label: 'Praxisregel fürs Abnehmen', a: 'Dauerhaft nicht unter dem Grundumsatz essen', b: '300–500 kcal vom Gesamtumsatz abziehen' }
        ]
      }
    }
  },
  {
    slug: 'macros-vs-calorie-counting',
    title: 'Macro Tracking vs. Calorie Counting',
    seoTitle: 'Tracking Macros vs Counting Calories | Fat Loss & Muscle Retention',
    seoDescription: 'Compare tracking macronutrients (protein, carbs, fats) against tracking total daily calories alone. See which approach fits your fitness goal and lifestyle.',
    toolA: 'macro-calculator',
    toolB: 'calorie-calculator',
    verdict: 'Total calories govern overall scale weight change, while macronutrient ratios govern body composition (muscle retention, satiety, and workout performance). Start with calories + a daily protein floor, then track full macros for physique or athletic goals.',
    differences: [
      { label: 'What You Track', a: 'Grams of protein (4 kcal/g), carbs (4 kcal/g), and fat (9 kcal/g)', b: 'Single daily total energy target (kcal)' },
      { label: 'Impact on Body Composition', a: 'Superior muscle retention and training recovery', b: 'Controls scale weight but can under-deliver protein' },
      { label: 'Daily Logging Effort', a: 'Moderate to high — requires checking food labels closely', b: 'Low — fastest habit for beginners' },
      { label: 'Best Audience', a: 'Strength athletes, body recomposition & marathoners', b: 'Beginners prioritizing simple, sustainable weight loss' }
    ],
    translations: {
      es: {
        title: 'Conteo de Macros vs. Conteo de Calorías',
        seoTitle: 'Contar Macros vs Contar Calorías | Pérdida de Grasa y Músculo',
        seoDescription: 'Compare el seguimiento de macronutrientes (proteínas, carbohidratos, grasas) frente al conteo simple de calorías para mejorar su composición corporal.',
        verdict: 'Las calorías totales determinan si baja o sube de peso, pero los macros determinan si conserva masa muscular y energía. Para principiantes basta contar calorías más proteína; para recomposición corporal, mida todos los macros.',
        differences: [
          { label: 'Qué Se Registra', a: 'Gramos de proteína (4 kcal/g), carbohidratos (4) y grasas (9)', b: 'Un único total energético diario (kcal)' },
          { label: 'Efecto en Masa Muscular', a: 'Óptimo para retener músculo y rendimiento deportivo', b: 'Controla el peso pero puede descuidar la proteína' },
          { label: 'Complejidad Diaria', a: 'Media-alta (requiere revisar etiquetas nutricionales)', b: 'Baja y fácil de sostener al comenzar' },
          { label: 'Perfil Ideal', a: 'Deportistas de fuerza y recomposición corporal', b: 'Principiantes enfocados en simplicidad' }
        ]
      },
      fr: {
        title: 'Suivi des Macros vs Comptage des Calories',
        seoTitle: 'Compter les Macros vs Compter les Calories | Quelle Méthode Choisir ?',
        seoDescription: 'Comparez le calcul des macronutriments (protéines, glucides, lipides) et le simple comptage calorique pour la perte de graisse et la prise de muscle.',
        verdict: 'Les calories dictent l’évolution du poids sur la balance, tandis que les macros déterminent la qualité de cette évolution (préservation musculaire et satiété). Combinez calories + objectif protéines avant d’affiner glucides et lipides.',
        differences: [
          { label: 'Indicateurs Suivis', a: 'Grammes de protéines (4 kcal/g), glucides (4) et lipides (9)', b: 'Total énergétique unique en kilocalories' },
          { label: 'Composition Corporelle', a: 'Meilleure conservation musculaire et récupération', b: 'Baisse de poids globale sans garantie protéique' },
          { label: 'Effort Quotidien', a: 'Modéré à élevé (lecture précise des étiquettes)', b: 'Faible — idéal pour débuter durablement' },
          { label: 'Public Cible', a: 'Pratiquants de musculation, sports d’endurance', b: 'Débutants visant une gestion simple du poids' }
        ]
      },
      de: {
        title: 'Makros zählen vs. Kalorien zählen',
        seoTitle: 'Makros vs Kalorien zählen | Muskelaufbau & Fettabbau Vergleich',
        seoDescription: 'Vergleichen Sie Makronährstoff-Tracking (Protein, Kohlenhydrate, Fett) mit reinem Kalorienzählen für nachhaltigen Fettabbau und Muskelerhalt.',
        verdict: 'Die Gesamtkalorien bestimmen das Körpergewicht, während die Makroverteilung über Muskelerhalt, Sättigung und Trainingsleistung entscheidet. Für Einsteiger reichen Kalorien plus Proteinziel; für Athleten lohnt volles Makro-Tracking.',
        differences: [
          { label: 'Erfasste Größen', a: 'Gramm Protein (4 kcal/g), Kohlenhydrate (4) & Fett (9)', b: 'Ein einziger täglicher Gesamtwert in kcal' },
          { label: 'Körperzusammensetzung', a: 'Optimal für Muskelerhalt & Regeneration', b: 'Steuert Gewicht, birgt aber Risiko für Proteinmangel' },
          { label: 'Täglicher Aufwand', a: 'Mittel bis hoch (genaues Nährwert-Tracking)', b: 'Gering und sehr einsteigerfreundlich' },
          { label: 'Beste Zielgruppe', a: 'Kraftsportler, Body-Recomposition & Ausdauerathleten', b: 'Einsteiger mit Fokus auf einfache Gewichtskontrolle' }
        ]
      }
    }
  },
  {
    slug: 'ideal-weight-vs-bmi',
    title: 'Ideal Body Weight (IBW) vs. BMI',
    seoTitle: 'Ideal Weight vs BMI Calculator | Devine, Robinson & WHO Formulas',
    seoDescription: 'Compare Ideal Body Weight formulas (Devine, Robinson, Miller, Hamwi) with Body Mass Index (BMI). Understand clinical dosing vs population health ranges.',
    toolA: 'ideal-weight-calculator',
    toolB: 'bmi-calculator',
    verdict: 'BMI provides a healthy weight range (18.5–24.9 kg/m²) for general screening, while Ideal Body Weight equations give a single height- and sex-adjusted reference weight historically developed for clinical medication dosing and ventilator settings.',
    differences: [
      { label: 'Output Format', a: 'Single target weight (kg/lbs) by sex & height', b: 'Index score (kg/m²) mapped to 4 WHO categories' },
      { label: 'Sex Adjustment', a: 'Yes — separate male and female baseline formulas', b: 'No — identical formula for adult men and women' },
      { label: 'Historical Origin', a: 'Clinical pharmacology & drug dosage calibration', b: 'Epidemiological population health screening' },
      { label: 'Shared Limitation', a: 'Does not measure muscle vs adipose tissue directly', b: 'Misclassifies high-muscle athletes as overweight' }
    ],
    translations: {
      es: {
        title: 'Peso Corporal Ideal vs. Índice de Masa Corporal (IMC)',
        seoTitle: 'Peso Ideal vs IMC | Fórmulas Devine, Robinson y Rangos OMS',
        seoDescription: 'Compare las fórmulas de Peso Corporal Ideal con el Índice de Masa Corporal (IMC). Conozca sus diferencias clínicas y cuál utilizar.',
        verdict: 'El IMC ofrece un rango saludable amplio (18,5–24,9 kg/m²), mientras que las fórmulas de Peso Ideal calculan un valor puntual ajustado por sexo y estatura, creado originalmente para dosificación clínica.',
        differences: [
          { label: 'Tipo de Resultado', a: 'Peso objetivo puntual (kg/lb) según sexo y talla', b: 'Índice (kg/m²) en 4 categorías de la OMS' },
          { label: 'Ajuste por Sexo', a: 'Sí — coeficientes diferenciados para hombre y mujer', b: 'No — fórmula idéntica para adultos' },
          { label: 'Origen Médico', a: 'Farmacología clínica y cálculo de dosis', b: 'Estadística epidemiológica poblacional' },
          { label: 'Limitación Común', a: 'No mide composición corporal ni músculo', b: 'Sobrestima riesgo en personas muy musculosas' }
        ]
      },
      fr: {
        title: 'Poids Idéal (IBW) vs Indice de Masse Corporelle (IMC)',
        seoTitle: 'Poids Idéal vs IMC | Formules Devine, Lorentz & Seuils OMS',
        seoDescription: 'Comparez le calcul du poids idéal selon le sexe et la taille avec l’Indice de Masse Corporelle (IMC) de l’OMS.',
        verdict: 'L’IMC définit une fourchette de poids sain (18,5–24,9 kg/m²), tandis que le poids idéal (Devine, Robinson) fournit une valeur ponctuelle ajustée au sexe, initialement conçue pour les posologies médicales.',
        differences: [
          { label: 'Format du Résultat', a: 'Poids cible unique (kg) selon taille et sexe', b: 'Indice (kg/m²) classé en 4 catégories OMS' },
          { label: 'Prise en Compte du Sexe', a: 'Oui — formules distinctes homme / femme', b: 'Non — formule adulte unique' },
          { label: 'Usage Clinique Historique', a: 'Dosage médicamenteux et ventilation médicale', b: 'Dépistage statistique en santé publique' },
          { label: 'Limite Commune', a: 'Ignore la répartition muscle / masse grasse', b: 'Peut classer un athlète musclé en surpoids' }
        ]
      },
      de: {
        title: 'Idealgewicht vs. Body-Mass-Index (BMI)',
        seoTitle: 'Idealgewicht vs BMI Vergleich | Devine-Formel & WHO-Bereiche',
        seoDescription: 'Vergleichen Sie medizinische Idealgewicht-Formeln (Devine, Robinson) mit dem Body-Mass-Index (BMI) der WHO.',
        verdict: 'Der BMI liefert eine gesunde Gewichtsspanne (18,5–24,9 kg/m²) für die Allgemeinbevölkerung, während Idealgewicht-Formeln einen geschlechtsspezifischen Referenzwert für klinische Dosierungen berechnen.',
        differences: [
          { label: 'Ergebnisformat', a: 'Einzelner Zielwert in kg nach Größe & Geschlecht', b: 'Indexwert (kg/m²) in 4 WHO-Kategorien' },
          { label: 'Geschlechtsanpassung', a: 'Ja — getrennte Formeln für Männer & Frauen', b: 'Nein — identische Formel für Erwachsene' },
          { label: 'Medizinischer Ursprung', a: 'Klinische Medikamentendosierung', b: 'Epidemiologisches Bevölkerungs-Screening' },
          { label: 'Gemeinsame Grenze', a: 'Berücksichtigt keine Muskelmasse', b: 'Stuft muskulöse Sportler oft zu hoch ein' }
        ]
      }
    }
  },
  {
    slug: 'pregnancy-due-date-vs-ovulation',
    title: 'Pregnancy Due Date vs. Ovulation & Fertile Window',
    seoTitle: 'Due Date Calculator vs Ovulation Calculator | Conception & Gestation Math',
    seoDescription: 'Compare how ovulation calculators predict your 6-day fertile window versus how due date calculators estimate 40-week delivery using Naegele’s Rule.',
    toolA: 'due-date-calculator',
    toolB: 'ovulation-calculator',
    verdict: 'Use an Ovulation Calculator when actively trying to conceive (pinpointing the 5–6 day fertile window before egg release). Switch to a Due Date Calculator once pregnant to track gestational weeks, trimester milestones, and estimated delivery date (EDD).',
    differences: [
      { label: 'Primary Stage', a: 'Post-conception pregnancy tracking (Weeks 1–40)', b: 'Pre-conception cycle & fertility planning' },
      { label: 'Core Clinical Formula', a: 'Naegele’s Rule: LMP + 280 days (adjusted for cycle length)', b: 'Estimated Ovulation = Next Period − 14 days (luteal phase)' },
      { label: 'Key Output', a: 'Estimated Delivery Date (EDD) & trimester calendar', b: 'Peak 6-day fertile window & next cycle forecast' },
      { label: 'Accuracy Refinement', a: 'First-trimester crown-rump ultrasound confirms EDD (±5 days)', b: 'LH ovulation strips & basal body temperature confirm peak day' }
    ],
    translations: {
      es: {
        title: 'Fecha Probable de Parto vs. Calculadora de Ovulación',
        seoTitle: 'Fecha de Parto vs Ovulación | Regla de Naegele y Días Fértiles',
        seoDescription: 'Compare cómo calcular la ventana fértil de ovulación frente a la fecha probable de parto (40 semanas) mediante la Regla de Naegele.',
        verdict: 'Utilice la calculadora de ovulación al planificar un embarazo para identificar sus 6 días fértiles. Una vez confirmado el embarazo, use la fecha probable de parto para seguir semanas y trimestres.',
        differences: [
          { label: 'Etapa Principal', a: 'Seguimiento gestacional (semanas 1 a 40)', b: 'Planificación preconcepcional y fertilidad' },
          { label: 'Fórmula Clínica Base', a: 'Regla de Naegele: FUM + 280 días', b: 'Ovulación ≈ Próximo periodo − 14 días' },
          { label: 'Resultado Clave', a: 'Fecha probable de parto (FPP) y trimestres', b: 'Ventana fértil de 6 días y pico de fertilidad' },
          { label: 'Confirmación Precisa', a: 'Ecografía del primer trimestre (±5 días)', b: 'Pruebas de hormona LH y temperatura basal' }
        ]
      },
      fr: {
        title: 'Date d’Accouchement (DPA) vs Calculateur d’Ovulation',
        seoTitle: 'Date d’Accouchement vs Ovulation | Règle de Naegele & Fenêtre Fertile',
        seoDescription: 'Comparez le suivi d’ovulation pour concevoir et le calcul de la date prévue d’accouchement (40 SA) selon la règle de Naegele.',
        verdict: 'Utilisez le calculateur d’ovulation pour cibler votre fenêtre fertile de 6 jours avant conception, puis le calculateur de date d’accouchement dès la grossesse confirmée pour suivre chaque trimestre.',
        differences: [
          { label: 'Phase Concernée', a: 'Suivi de grossesse (40 semaines d’aménorrhée)', b: 'Projet bébé et repérage des jours fertiles' },
          { label: 'Méthode de Calcul', a: 'Règle de Naegele : DDR + 280 jours (287 en France)', b: 'Ovulation ≈ Prochaines règles − 14 jours' },
          { label: 'Résultat Principal', a: 'Date prévue d’accouchement et jalons trimestriels', b: 'Fenêtre fertile de 6 jours' },
          { label: 'Confirmation Médicale', a: 'Échographie de datation du 1er trimestre', b: 'Tests d’ovulation LH et courbe thermique' }
        ]
      },
      de: {
        title: 'Geburtstermin-Rechner vs. Eisprungrechner',
        seoTitle: 'Geburtstermin vs Eisprung berechnen | Naegele-Regel & Fruchtbare Tage',
        seoDescription: 'Vergleichen Sie Eisprungrechner (fruchtbare Tage bei Kinderwunsch) und Geburtstermin-Rechner (40 SSW nach Naegele-Regel).',
        verdict: 'Der Eisprungrechner bestimmt bei Kinderwunsch das 6-tägige fruchtbare Zeitfenster. Bei bestehender Schwangerschaft ermittelt der Geburtstermin-Rechner den voraussichtlichen Entbindungstermin (ET) und die Trimester.',
        differences: [
          { label: 'Anwendungsphase', a: 'Schwangerschaftsverlauf (SSW 1 bis 40)', b: 'Kinderwunsch & Zyklusplanung' },
          { label: 'Klinische Formel', a: 'Naegele-Regel: 1. Tag letzte Periode + 280 Tage', b: 'Eisprung ≈ Nächste Periode − 14 Tage' },
          { label: 'Hauptergebnis', a: 'Errechneter Geburtstermin (ET) & Trimester', b: '6 fruchtbare Tage & Eisprungtag' },
          { label: 'Medizinische Verfeinerung', a: 'Ersttrimester-Ultraschall (Scheitel-Steiß-Länge)', b: 'LH-Ovulationstests & Basaltemperatur' }
        ]
      }
    }
  },
  {
    slug: 'mean-vs-median',
    title: 'Mean (Average) vs. Median in Statistics',
    seoTitle: 'Mean vs Median Comparison | When to Use Average vs Middle Value',
    seoDescription: 'Compare the arithmetic mean and the median. Understand outlier sensitivity, skewed distributions (income, home prices), and when each measure of center is accurate.',
    toolA: 'mean-calculator',
    toolB: 'median-calculator',
    verdict: 'Use the Mean for symmetric, bell-curved datasets without extreme outliers (like test scores or sensor measurements). Always use the Median for skewed distributions with extreme values (such as household incomes, salaries, or real estate prices).',
    differences: [
      { label: 'Mathematical Definition', a: 'Sum of all values divided by sample size (Σx / n)', b: 'Exact middle value when dataset is sorted' },
      { label: 'Outlier Sensitivity', a: 'Highly sensitive — one extreme value pulls the mean heavily', b: 'Robust (50% breakdown point) — unaffected by extreme outliers' },
      { label: 'Best Distribution Shape', a: 'Symmetric / Normal (Gaussian) distributions', b: 'Right-skewed or left-skewed distributions' },
      { label: 'Real-World Example', a: 'Average daily temperature or manufacturing tolerances', b: 'Median home price, median salary, median net worth' },
      { label: 'Algebraic Properties', a: 'Used directly in variance, standard deviation, and t-tests', b: 'Paired with Interquartile Range (IQR) for box plots' }
    ],
    translations: {
      es: {
        title: 'Media (Promedio) vs. Mediana en Estadística',
        seoTitle: 'Media vs Mediana | Cuándo Usar el Promedio o el Valor Central',
        seoDescription: 'Compare la media aritmética y la mediana estadística. Descubra cómo afectan los valores atípicos en ingresos, vivienda y distribuciones asimétricas.',
        verdict: 'Use la media en distribuciones simétricas sin valores extremos. Utilice siempre la mediana en datos sesgados como salarios o precios de vivienda, donde un solo valor extremo distorsiona el promedio.',
        differences: [
          { label: 'Definición Matemática', a: 'Suma total dividida entre el número de datos (Σx / n)', b: 'Valor central exacto al ordenar los datos' },
          { label: 'Sensibilidad a Valores Atípicos', a: 'Muy alta — un extremo altera todo el promedio', b: 'Robusta — inmune a extremos aislados' },
          { label: 'Distribución Ideal', a: 'Distribución normal o simétrica', b: 'Distribuciones asimétricas o sesgadas' },
          { label: 'Ejemplo Práctico', a: 'Calificaciones académicas o mediciones de laboratorio', b: 'Salario mediano o precio mediano de vivienda' }
        ]
      },
      fr: {
        title: 'Moyenne vs Médiane en Statistique',
        seoTitle: 'Moyenne vs Médiane | Valeurs Extrêmes & Distributions Asymétriques',
        seoDescription: 'Comparez la moyenne arithmétique et la médiane statistique. Comprenez l’effet des valeurs aberrantes sur les salaires et prix immobiliers.',
        verdict: 'Utilisez la moyenne pour les données symétriques sans valeurs aberrantes. Privilégiez impérativement la médiane pour les distributions asymétriques (salaires, patrimoine, immobilier) afin d’éviter toute distorsion.',
        differences: [
          { label: 'Définition Mathématique', a: 'Somme des valeurs divisée par l’effectif (Σx / n)', b: 'Valeur centrale partageant la série triée en deux' },
          { label: 'Sensibilité aux Valeurs Aberrantes', a: 'Très sensible aux extrêmes', b: 'Très robuste face aux valeurs extrêmes' },
          { label: 'Distribution Adaptée', a: 'Loi normale ou distribution symétrique', b: 'Distributions asymétriques (revenus, prix)' },
          { label: 'Mesure de Dispersion Associée', a: 'Écart-type et variance', b: 'Écart interquartile (IQR) et boîte à moustaches' }
        ]
      },
      de: {
        title: 'Mittelwert (Durchschnitt) vs. Median in der Statistik',
        seoTitle: 'Mittelwert vs Median Vergleich | Ausreißer & Schiefe Verteilungen',
        seoDescription: 'Vergleichen Sie arithmetisches Mittel und Median: Ausreißer-Empfindlichkeit, schiefe Einkommensverteilungen und richtige statistische Kennzahl.',
        verdict: 'Verwenden Sie den Mittelwert bei symmetrischen Daten ohne Ausreißer. Bei schiefen Verteilungen wie Gehältern, Vermögen oder Immobilienpreisen liefert nur der Median ein realistisches Bild der Mitte.',
        differences: [
          { label: 'Definition', a: 'Summe aller Werte geteilt durch Anzahl (Σx / n)', b: 'Exakter Zentralwert einer sortierten Datenreihe' },
          { label: 'Ausreißer-Empfindlichkeit', a: 'Sehr hoch — Extremwerte verzerren das Ergebnis stark', b: 'Extrem robust gegenüber Ausreißern' },
          { label: 'Optimale Verteilung', a: 'Symmetrische Normalverteilung', b: 'Rechts- oder linksschiefe Verteilungen' },
          { label: 'Praxisbeispiele', a: 'Messreihen, Durchschnittstemperaturen', b: 'Medianeinkommen, Median-Immobilienpreis' }
        ]
      }
    }
  },
  {
    slug: 'variance-vs-standard-deviation',
    title: 'Variance (σ²) vs. Standard Deviation (σ)',
    seoTitle: 'Variance vs Standard Deviation | Formulas, Units & Interpretation',
    seoDescription: 'Compare statistical variance and standard deviation. Understand squared units, Bessel’s correction (n − 1), and why standard deviation is preferred for reporting.',
    toolA: 'variance-calculator',
    toolB: 'standard-deviation-calculator',
    verdict: 'Variance (σ²) measures average squared dispersion and is essential in ANOVA, regression, and portfolio math because variances of independent variables add linearly. Standard Deviation (σ = √Variance) converts dispersion back into your original units (dollars, cm, seconds) for intuitive interpretation.',
    differences: [
      { label: 'Mathematical Formula (Sample)', a: 's² = Σ(xᵢ − x̄)² / (n − 1)', b: 's = √[ Σ(xᵢ − x̄)² / (n − 1) ]' },
      { label: 'Measurement Units', a: 'Squared units (e.g., $², cm², sec²)', b: 'Same units as raw data ($, cm, sec)' },
      { label: 'Additivity Rule', a: 'Additive for independent random variables: Var(X+Y) = Var(X)+Var(Y)', b: 'Not directly additive (must square, add, then take square root)' },
      { label: 'Empirical 68-95-99.7 Rule', a: 'Not directly plotted as ± intervals on data scale', b: '±1σ (68%), ±2σ (95%), ±3σ (99.7%) in normal data' },
      { label: 'Best Use Case', a: 'ANOVA, regression decomposition & risk modeling', b: 'Reporting error bars, volatility, and quality control' }
    ],
    translations: {
      es: {
        title: 'Varianza (σ²) vs. Desviación Estándar (σ)',
        seoTitle: 'Varianza vs Desviación Estándar | Fórmulas, Unidades y Uso',
        seoDescription: 'Compare la varianza y la desviación estándar en estadística: unidades cuadráticas, corrección de Bessel (n − 1) e interpretación práctica.',
        verdict: 'La varianza (σ²) es clave en modelos estadísticos como ANOVA porque es aditiva para variables independientes. La desviación estándar (σ = √Varianza) devuelve la dispersión a las unidades originales para interpretarla directamente.',
        differences: [
          { label: 'Fórmula Muestral', a: 's² = Σ(xᵢ − x̄)² / (n − 1)', b: 's = √[ Σ(xᵢ − x̄)² / (n − 1) ]' },
          { label: 'Unidades de Medida', a: 'Unidades al cuadrado (cm², $², s²)', b: 'Mismas unidades que los datos originales' },
          { label: 'Propiedad Aditiva', a: 'Aditiva en variables independientes', b: 'No es directamente aditiva' },
          { label: 'Interpretación Directa', a: 'Abstracta por estar elevada al cuadrado', b: 'Regla empírica ±1σ (68 %), ±2σ (95 %), ±3σ (99,7 %)' }
        ]
      },
      fr: {
        title: 'Variance (σ²) vs Écart-Type (σ)',
        seoTitle: 'Variance vs Écart-Type | Formules, Unités & Interprétation',
        seoDescription: 'Comparez la variance statistique et l’écart-type : unités au carré, correction de Bessel (n − 1) et règle des 68-95-99,7 %.',
        verdict: 'La variance (σ²) est indispensable en analyse ANOVA et modélisation car les variances indépendantes s’additionnent. L’écart-type (σ = √Variance) s’exprime dans l’unité d’origine des données, ce qui le rend immédiatement lisible.',
        differences: [
          { label: 'Formule d’Échantillon', a: 's² = Σ(xᵢ − x̄)² / (n − 1)', b: 's = √[ Σ(xᵢ − x̄)² / (n − 1) ]' },
          { label: 'Unité Physique', a: 'Unité au carré (€², cm², s²)', b: 'Même unité que la variable mesurée' },
          { label: 'Additivité', a: 'Additive pour des variables indépendantes', b: 'Non directement additive' },
          { label: 'Usage Privilégié', a: 'ANOVA, régression et théorie financière', b: 'Rapports, volatilité et barres d’erreur (±1σ, ±2σ)' }
        ]
      },
      de: {
        title: 'Varianz (σ²) vs. Standardabweichung (σ)',
        seoTitle: 'Varianz vs Standardabweichung | Formeln, Einheiten & Praxis',
        seoDescription: 'Vergleichen Sie Varianz und Standardabweichung: quadrierte Einheiten, Bessel-Korrektur (n − 1) und Interpretation in der Statistik.',
        verdict: 'Die Varianz (σ²) bildet das mathematische Fundament für ANOVA und Varianzzerlegung, da sie additiv ist. Die Standardabweichung (σ = √Varianz) überführt die Streuung zurück in die Originaleinheit (€, cm, s) für klare Aussagen.',
        differences: [
          { label: 'Stichprobenformel', a: 's² = Σ(xᵢ − x̄)² / (n − 1)', b: 's = √[ Σ(xᵢ − x̄)² / (n − 1) ]' },
          { label: 'Maßeinheit', a: 'Quadrierte Einheit (€², cm², s²)', b: 'Identische Einheit wie die Rohdaten' },
          { label: 'Additivität', a: 'Additiv bei unabhängigen Zufallsvariablen', b: 'Nicht direkt additiv' },
          { label: 'Praktische Deutung', a: 'Rechengröße für ANOVA & Portfoliotheorie', b: 'Direkte Streubreite (68-95-99,7-%-Regel)' }
        ]
      }
    }
  },
  {
    slug: 'z-score-vs-t-test',
    title: 'Z-Test / Z-Score vs. Student’s T-Test',
    seoTitle: 'Z-Test vs T-Test Comparison | Sample Size, Known σ & Hypothesis Testing',
    seoDescription: 'Compare the Z-test (Z-score) and Student’s t-test in hypothesis testing. Learn when sample size (n ≥ 30) and known vs unknown population σ determine the right test.',
    toolA: 'z-score-calculator',
    toolB: 't-test-calculator',
    verdict: 'Use a Z-test only when the true population standard deviation (σ) is known (or for large-sample proportions). In almost all real-world experiments where σ is unknown and estimated from sample data (s), Student’s t-test is the statistically valid choice.',
    differences: [
      { label: 'Population Std. Dev. (σ)', a: 'Must be known in advance', b: 'Unknown — estimated from sample (s)' },
      { label: 'Distribution Shape', a: 'Standard Normal Distribution (fixed bell curve)', b: 'Student’s t-distribution (heavier tails, depends on df = n − 1)' },
      { label: 'Small Sample Performance (n < 30)', a: 'Underestimates uncertainty when σ is estimated', b: 'Exact for normal populations even at small n' },
      { label: 'Large Sample Convergence', a: '95% two-tailed critical value = ±1.960', b: 'Approaches ±1.960 smoothly as df → ∞' },
      { label: 'Common Applications', a: 'Standardized exam percentiles & large A/B conversion rates', b: 'Clinical trials, lab experiments & comparing two sample means' }
    ],
    translations: {
      es: {
        title: 'Prueba Z (Z-Score) vs. Prueba T de Student',
        seoTitle: 'Prueba Z vs Prueba T de Student | Desviación Poblacional y Tamaño Muestral',
        seoDescription: 'Compare la prueba Z y la prueba T de Student en contraste de hipótesis. Sepa cuándo usar distribución normal estándar o distribución t.',
        verdict: 'Use la prueba Z únicamente cuando conozca la desviación estándar poblacional real (σ) o en proporciones con muestras grandes. Cuando σ es desconocida y se estima con la muestra, aplique siempre la prueba T de Student.',
        differences: [
          { label: 'Desviación Poblacional (σ)', a: 'Conocida de antemano', b: 'Desconocida (se estima mediante s muestral)' },
          { label: 'Distribución Teórica', a: 'Normal estándar (curva fija)', b: 'Distribución t (colas más pesadas según gl = n − 1)' },
          { label: 'Muestras Pequeñas (n < 30)', a: 'Subestima el margen de error si σ se estima', b: 'Exacta bajo normalidad poblacional' },
          { label: 'Valor Crítico al 95 %', a: 'Siempre ±1,960 (bilateral)', b: 'Mayor que ±1,960 y converge al crecer n' }
        ]
      },
      fr: {
        title: 'Test Z (Score Z) vs Test t de Student',
        seoTitle: 'Test Z vs Test t de Student | Écart-Type Connu & Taille d’Échantillon',
        seoDescription: 'Comparez le test Z et le test t de Student en statistique inférentielle : écart-type populationnel connu ou inconnu et degrés de liberté.',
        verdict: 'Utilisez le test Z uniquement lorsque l’écart-type réel de la population (σ) est connu ou pour de grandes proportions. Dans la quasi-totalité des études expérimentales où σ est inconnu, le test t de Student s’impose.',
        differences: [
          { label: 'Écart-Type Populationnel (σ)', a: 'Connu avec certitude', b: 'Inconnu — estimé par l’écart-type s de l’échantillon' },
          { label: 'Loi de Probabilité', a: 'Loi normale centrée réduite', b: 'Loi de Student (queues plus épaisses selon ddl = n − 1)' },
          { label: 'Petits Échantillons (n < 30)', a: 'Sous-estime l’incertitude si σ est inconnu', b: 'Exact sous hypothèse de normalité' },
          { label: 'Seuil Critique à 95 %', a: 'Fixe à ±1,960 (bilatéral)', b: 'Supérieur à 1,960, tend vers 1,960 quand n augmente' }
        ]
      },
      de: {
        title: 'Z-Test (Z-Wert) vs. Student-t-Test',
        seoTitle: 'Z-Test vs t-Test Vergleich | Bekannte Varianz & Stichprobengröße',
        seoDescription: 'Vergleichen Sie Z-Test und Student-t-Test bei Hypothesentests: Wann entscheiden bekannte Standardabweichung (σ) und Stichprobengröße n?',
        verdict: 'Nutzen Sie den Z-Test nur bei bekannter Populations-Standardabweichung (σ) oder großen Anteilstests. Da σ in realen Studien fast immer unbekannt ist und aus der Stichprobe geschätzt wird, ist der t-Test der Standard.',
        differences: [
          { label: 'Populations-Standardabweichung (σ)', a: 'Vorab exakt bekannt', b: 'Unbekannt — aus Stichprobe s geschätzt' },
          { label: 'Verteilungsmodell', a: 'Standardnormalverteilung (feste Form)', b: 't-Verteilung (breitere Ränder je nach df = n − 1)' },
          { label: 'Kleine Stichproben (n < 30)', a: 'Unterschätzt Unsicherheit bei geschätztem σ', b: 'Exakt bei normalverteilter Grundgesamtheit' },
          { label: 'Kritischer Wert (95 %, zweiseitig)', a: 'Konstant ±1,960', b: 'Größer als ±1,960; nähert sich für große n an' }
        ]
      }
    }
  },
  {
    slug: 'molarity-vs-molality',
    title: 'Molarity (M) vs. Molality (m) in Chemistry',
    seoTitle: 'Molarity vs Molality | Chemistry Concentration Formulas & Temperature Effects',
    seoDescription: 'Compare Molarity (mol/L solution) and Molality (mol/kg solvent). Learn why molality is temperature-independent and required for colligative property calculations.',
    toolA: 'molarity-calculator',
    toolB: 'molality-calculator',
    verdict: 'Use Molarity (mol/L) for room-temperature bench chemistry, titrations, and dilutions (C₁V₁ = C₂V₂). Use Molality (mol/kg solvent) whenever temperature changes significantly — such as boiling-point elevation or freezing-point depression — because mass does not expand with heat.',
    differences: [
      { label: 'Formula & Units', a: 'M = moles of solute / liters of total solution (mol/L)', b: 'm = moles of solute / kilograms of pure solvent (mol/kg)' },
      { label: 'Denominator Basis', a: 'Total final volume of solution', b: 'Mass of solvent alone (excluding solute)' },
      { label: 'Temperature Dependence', a: 'Changes with temperature as liquid volume expands/contracts', b: '100% temperature-independent (mass is invariant)' },
      { label: 'Primary Lab Uses', a: 'Stoichiometry, acid-base titrations, spectrophotometry', b: 'Colligative properties (ΔTf, ΔTb), phase thermodynamics' }
    ],
    translations: {
      es: {
        title: 'Molaridad (M) vs. Molalidad (m) en Química',
        seoTitle: 'Molaridad vs Molalidad | Fórmulas, Unidades y Efecto de la Temperatura',
        seoDescription: 'Compare molaridad (mol/L de solución) y molalidad (mol/kg de solvente). Entienda por qué la molalidad no varía con la temperatura.',
        verdict: 'Use molaridad (mol/L) para titulaciones y diluciones a temperatura ambiente. Use molalidad (mol/kg de disolvente) en propiedades coligativas o procesos con cambio térmico, ya que la masa no se dilata con el calor.',
        differences: [
          { label: 'Fórmula y Unidades', a: 'M = moles de soluto / litros de disolución (mol/L)', b: 'm = moles de soluto / kilogramos de disolvente (mol/kg)' },
          { label: 'Base del Denominador', a: 'Volumen total final de la disolución', b: 'Masa exclusiva del disolvente puro' },
          { label: 'Dependencia Térmica', a: 'Varía con la temperatura por expansión volumétrica', b: 'Independiente de la temperatura' },
          { label: 'Uso Principal', a: 'Estequiometría, valoraciones y diluciones', b: 'Descenso crioscópico y ascenso ebulloscópico' }
        ]
      },
      fr: {
        title: 'Molarité (M) vs Molalité (m) en Chimie',
        seoTitle: 'Molarité vs Molalité | Formules de Concentration & Température',
        seoDescription: 'Comparez la molarité (mol/L de solution) et la molalité (mol/kg de solvant) ainsi que leur comportement face aux variations de température.',
        verdict: 'Employez la molarité (mol/L) pour les dosages, dilutions et réactions à température constante. Choisissez la molalité (mol/kg de solvant) dès que la température varie (cryoscopie, ébullioscopie) car la masse reste invariante.',
        differences: [
          { label: 'Formule & Unité', a: 'M = moles de soluté / litre de solution (mol/L)', b: 'm = moles de soluté / kilogramme de solvant (mol/kg)' },
          { label: 'Dénominateur', a: 'Volume total de la solution finale', b: 'Masse du solvant pur uniquement' },
          { label: 'Sensibilité à la Température', a: 'Varie selon la dilatation thermique du liquide', b: 'Strictement indépendante de la température' },
          { label: 'Domaine d’Application', a: 'Titrages acido-basiques, dilutions C₁V₁ = C₂V₂', b: 'Propriétés colligatives et thermodynamique' }
        ]
      },
      de: {
        title: 'Molarität (M) vs. Molalität (m) in der Chemie',
        seoTitle: 'Molarität vs Molalität Vergleich | Formeln & Temperaturabhängigkeit',
        seoDescription: 'Vergleichen Sie Molarität (mol/L Lösung) und Molalität (mol/kg Lösungsmittel) sowie deren Bedeutung bei temperaturabhängigen Prozessen.',
        verdict: 'Die Molarität (mol/L) ist der Laborstandard für Titrationen und Verdünnungen bei Raumtemperatur. Bei Temperaturänderungen (Gefrierpunktserniedrigung, Siedepunktserhöhung) ist die temperaturunabhängige Molalität (mol/kg) zwingend erforderlich.',
        differences: [
          { label: 'Formel & Einheit', a: 'c = Stoffmenge Solut / Volumen Lösung (mol/L)', b: 'b = Stoffmenge Solut / Masse Lösungsmittel (mol/kg)' },
          { label: 'Bezugsgröße im Nenner', a: 'Gesamtvolumen der fertigen Lösung', b: 'Masse des reinen Lösungsmittels' },
          { label: 'Temperaturabhängigkeit', a: 'Ändert sich durch thermische Volumenausdehnung', b: 'Vollständig temperaturunabhängig' },
          { label: 'Haupteinsatzgebiet', a: 'Titration, Stöchiometrie, Verdünnungsreihen', b: 'Kolligative Eigenschaften & Thermodynamik' }
        ]
      }
    }
  },
  {
    slug: 'ph-vs-pka',
    title: 'pH vs. pKa in Acid-Base Chemistry',
    seoTitle: 'pH vs pKa Explained | Acidity, Acid Strength & Henderson-Hasselbalch',
    seoDescription: 'Compare pH and pKa in acid-base chemistry. Understand how pH measures solution acidity while pKa measures intrinsic acid strength via the Henderson-Hasselbalch equation.',
    toolA: 'ph-calculator',
    toolB: 'pka-calculator',
    verdict: 'pH describes the acidity of a specific solution (dependent on concentration and dilution), whereas pKa is an intrinsic constant measuring how strongly a molecule donates protons. When pH = pKa, an acid is exactly 50% protonated and 50% deprotonated (maximum buffer capacity).',
    differences: [
      { label: 'What It Measures', a: 'Hydronium ion concentration in solution: pH = −log₁₀[H⁺]', b: 'Intrinsic acid dissociation strength: pKa = −log₁₀(Ka)' },
      { label: 'Concentration Dependence', a: 'Changes when you dilute or concentrate the solution', b: 'Constant for a given molecule at fixed temperature' },
      { label: 'Connecting Equation', a: 'pH = pKa + log₁₀([A⁻]/[HA])', b: 'At half-equivalence point, pKa = pH' },
      { label: 'Interpretation of Lower Value', a: 'More acidic solution (pH < 7)', b: 'Stronger acid (donates H⁺ more readily)' },
      { label: 'Biochemical Importance', a: 'Blood homeostasis (7.35–7.45) & enzyme activity', b: 'Predicts drug ionization & membrane permeability' }
    ],
    translations: {
      es: {
        title: 'pH vs. pKa en Química Ácido-Base',
        seoTitle: 'pH vs pKa | Diferencia, Fuerza Ácida y Ecuación Henderson-Hasselbalch',
        seoDescription: 'Compare el pH y el pKa en química. Entienda cómo el pH mide la acidez de la solución mientras el pKa define la fuerza intrínseca del ácido.',
        verdict: 'El pH indica la acidez de una disolución concreta (cambia al diluir), mientras que el pKa es una constante propia de cada ácido. Cuando pH = pKa, exactamente el 50 % del ácido está disociado y el tampón alcanza máxima capacidad.',
        differences: [
          { label: 'Qué Mide', a: 'Concentración de protones: pH = −log₁₀[H⁺]', b: 'Fuerza intrínseca del ácido: pKa = −log₁₀(Ka)' },
          { label: 'Efecto de Dilución', a: 'Cambia al diluir o concentrar la solución', b: 'Constante para cada sustancia a temperatura fija' },
          { label: 'Relación Matemática', a: 'pH = pKa + log₁₀([A⁻]/[HA])', b: 'En el punto de semi-equivalencia, pKa = pH' },
          { label: 'Valor Más Bajo Significa', a: 'Solución más ácida', b: 'Ácido intrínsecamente más fuerte' }
        ]
      },
      fr: {
        title: 'pH vs pKa en Chimie Acide-Base',
        seoTitle: 'pH vs pKa | Acidité d’une Solution, Force d’un Acide & Tampons',
        seoDescription: 'Comparez pH et pKa : relation de Henderson-Hasselbalch, zone de prédominance et capacité tampon maximale lorsque pH = pKa.',
        verdict: 'Le pH mesure l’acidité réelle d’une solution (sensible à la dilution), tandis que le pKa caractérise la force intrinsèque d’un couple acide-base. À pH = pKa, les formes acide et basique sont à parts égales (50/50).',
        differences: [
          { label: 'Définition', a: 'Activité des ions H₃O⁺ : pH = −log₁₀[H₃O⁺]', b: 'Constante de dissociation : pKa = −log₁₀(Ka)' },
          { label: 'Sensibilité à la Dilution', a: 'Varie fortement avec la concentration', b: 'Constante intrinsèque à température donnée' },
          { label: 'Équation de Lien', a: 'pH = pKa + log₁₀([A⁻]/[HA])', b: 'À la demi-équivalence, pH = pKa' },
          { label: 'Valeur Plus Faible', a: 'Milieu plus acide', b: 'Acide intrinsèquement plus fort' }
        ]
      },
      de: {
        title: 'pH-Wert vs. pKs-Wert (pKa) in der Säure-Base-Chemie',
        seoTitle: 'pH vs pKs (pKa) Vergleich | Säurestärke & Henderson-Hasselbalch',
        seoDescription: 'Vergleichen Sie pH-Wert und pKs-Wert (pKa): Unterschied zwischen Lösungsazidität und Stoffkonstante sowie Pufferwirkung bei pH = pKs.',
        verdict: 'Der pH-Wert beschreibt die aktuelle Azidität einer Lösung und ändert sich beim Verdünnen. Der pKs-Wert (pKa) ist eine feste Stoffkonstante für die Säurestärke; bei pH = pKs liegen Säure und konjugierte Base genau im Verhältnis 1:1 vor.',
        differences: [
          { label: 'Messgröße', a: 'Protonenkonzentration: pH = −log₁₀[H₃O⁺]', b: 'Intrinsische Säurestärke: pKs = −log₁₀(Ks)' },
          { label: 'Verdünnungseinfluss', a: 'Ändert sich direkt mit der Konzentration', b: 'Konstant bei fester Temperatur' },
          { label: 'Verknüpfungsgleichung', a: 'pH = pKs + log₁₀([A⁻]/[HA])', b: 'Am Halbäquivalenzpunkt gilt pH = pKs' },
          { label: 'Kleinerer Zahlenwert', a: 'Saurere Lösung', b: 'Stärkere Säure' }
        ]
      }
    }
  },
  {
    slug: 'sha256-vs-md5-hashing',
    title: 'SHA-256 vs. MD5 Cryptographic Hashing',
    seoTitle: 'SHA-256 vs MD5 Hash Comparison | Security, Speed & Collision Resistance',
    seoDescription: 'Compare SHA-256 and MD5 hash algorithms. Review digest length, collision resistance, cryptographic security, and when MD5 is still acceptable (non-security checksums).',
    toolA: 'sha256-generator',
    toolB: 'md5-generator',
    verdict: 'Always use SHA-256 (or SHA-3 / Argon2 for passwords) for security, digital signatures, API integrity, and TLS certificates. MD5 is cryptographically broken due to trivial chosen-prefix collisions and should only be used for legacy non-adversarial file checksums or cache keys.',
    differences: [
      { label: 'Output Digest Length', a: '256 bits (64 hexadecimal characters)', b: '128 bits (32 hexadecimal characters)' },
      { label: 'Collision Resistance', a: 'No practical collisions known (2¹²⁸ birthday bound)', b: 'Broken — collisions generated in seconds on a laptop' },
      { label: 'Security Status (NIST)', a: 'Approved cryptographic standard (FIPS 180-4)', b: 'Deprecated & disallowed for security/signatures' },
      { label: 'Computational Speed', a: 'Very fast (hardware SHA-NI acceleration on modern CPUs)', b: 'Slightly faster in pure software' },
      { label: 'Recommended Use Cases', a: 'File verification, HMAC, JWT signing, blockchain, TLS', b: 'Legacy ETag/cache deduplication only (non-security)' }
    ],
    translations: {
      es: {
        title: 'Hash SHA-256 vs. MD5 en Seguridad Informática',
        seoTitle: 'SHA-256 vs MD5 | Seguridad, Colisiones y Rendimiento Criptográfico',
        seoDescription: 'Compare los algoritmos hash SHA-256 y MD5: longitud del resumen, resistencia a colisiones y cuándo aún puede usarse MD5.',
        verdict: 'Use siempre SHA-256 para verificación de integridad, firmas digitales y seguridad. MD5 está criptográficamente roto por colisiones prácticas y solo debe emplearse en sumas de verificación heredadas sin amenaza adversaria.',
        differences: [
          { label: 'Longitud del Digest', a: '256 bits (64 caracteres hexadecimales)', b: '128 bits (32 caracteres hexadecimales)' },
          { label: 'Resistencia a Colisiones', a: 'Segura sin colisiones prácticas conocidas', b: 'Rota — colisiones generables en segundos' },
          { label: 'Estado Normativo (NIST)', a: 'Estándar vigente (FIPS 180-4)', b: 'Obsoleto y prohibido en seguridad' },
          { label: 'Uso Recomendado', a: 'Integridad de archivos, HMAC, TLS, certificados', b: 'Solo claves de caché o compatibilidad heredada' }
        ]
      },
      fr: {
        title: 'Hachage SHA-256 vs MD5 en Cryptographie',
        seoTitle: 'SHA-256 vs MD5 | Sécurité, Collisions & Cas d’Usage',
        seoDescription: 'Comparez les fonctions de hachage SHA-256 et MD5 : taille d’empreinte, résistance aux collisions et recommandations NIST.',
        verdict: 'Utilisez impérativement SHA-256 pour l’intégrité de fichiers, les signatures et l’authentification. MD5 est vulnérable aux collisions choisies et doit être réservé aux clés de cache non critiques.',
        differences: [
          { label: 'Taille de l’Empreinte', a: '256 bits (64 caractères hexadécimaux)', b: '128 bits (32 caractères hexadécimaux)' },
          { label: 'Résistance aux Collisions', a: 'Aucune collision pratique connue', b: 'Cassée — collisions générées en quelques secondes' },
          { label: 'Statut Cryptographique', a: 'Standard approuvé (FIPS 180-4)', b: 'Obsolète et interdit en sécurité' },
          { label: 'Usages Recommandés', a: 'Vérification logicielle, HMAC, TLS, blockchain', b: 'Déduplication non sécuritaire / ETag hérité' }
        ]
      },
      de: {
        title: 'SHA-256 vs. MD5 Hash-Algorithmen',
        seoTitle: 'SHA-256 vs MD5 Vergleich | Sicherheit, Kollisionen & Geschwindigkeit',
        seoDescription: 'Vergleichen Sie SHA-256 und MD5: Hash-Länge, Kollisionsresistenz, NIST-Empfehlungen und sinnvolle Einsatzgebiete in der Praxis.',
        verdict: 'Für Integritätsprüfungen, Signaturen und Sicherheitsanwendungen ist SHA-256 Pflicht. MD5 gilt wegen praktischer Kollisionsangriffe als unsicher und eignet sich höchstens noch für einfache Cache-Schlüssel ohne Sicherheitsrelevanz.',
        differences: [
          { label: 'Hash-Länge', a: '256 Bit (64 Hex-Zeichen)', b: '128 Bit (32 Hex-Zeichen)' },
          { label: 'Kollisionssicherheit', a: 'Keine praktischen Kollisionen bekannt', b: 'Gebrochen — Kollisionen in Sekunden erzeugbar' },
          { label: 'Sicherheitsstatus (NIST)', a: 'Anerkannter Standard (FIPS 180-4)', b: 'Veraltet & für Kryptografie unzulässig' },
          { label: 'Empfohlener Einsatz', a: 'Prüfsummen, HMAC, TLS, Software-Verifikation', b: 'Nur unkritische Cache-Keys / Alt-Systeme' }
        ]
      }
    }
  },
  {
    slug: 'webp-vs-png-images',
    title: 'WebP vs. PNG Image Formats for Web Performance',
    seoTitle: 'WebP vs PNG Comparison | File Size, Transparency, LCP & Quality',
    seoDescription: 'Compare WebP and PNG image formats for websites and Core Web Vitals. Analyze compression ratios, alpha transparency support, lossless fidelity, and browser compatibility.',
    toolA: 'convert-to-webp',
    toolB: 'convert-to-png',
    verdict: 'WebP is the clear winner for web delivery: it supports both lossy and lossless compression plus full alpha transparency at 26%–70% smaller file sizes than PNG, accelerating Largest Contentful Paint (LCP). Keep PNG primarily for archival print masters or legacy software exports.',
    differences: [
      { label: 'Lossless File Size', a: '~26% smaller than equivalent PNG', b: 'Baseline lossless reference size' },
      { label: 'Lossy + Transparency Size', a: 'Up to 65%–75% smaller than transparent PNG', b: 'No native lossy mode (remains heavy)' },
      { label: 'Alpha Transparency', a: 'Full 8-bit alpha channel in both lossy & lossless modes', b: 'Full 8-bit / 16-bit lossless alpha channel' },
      { label: 'Browser Compatibility', a: '97%+ global support (Chrome, Safari, Firefox, Edge)', b: '100% universal support across all legacy apps' },
      { label: 'Core Web Vitals (LCP) Impact', a: 'Fastest transfer & lower CDN bandwidth cost', b: 'Slower mobile page loads for large graphics' }
    ],
    translations: {
      es: {
        title: 'Imágenes WebP vs. PNG para Rendimiento Web',
        seoTitle: 'WebP vs PNG | Tamaño de Archivo, Transparencia y Core Web Vitals',
        seoDescription: 'Compare los formatos de imagen WebP y PNG: compresión con y sin pérdida, canal alfa de transparencia, compatibilidad y velocidad LCP.',
        verdict: 'WebP es claramente superior para sitios web: conserva transparencia alfa reduciendo el peso entre un 26 % y 70 % frente a PNG y acelerando el LCP. Reserve PNG para archivos maestros o programas antiguos.',
        differences: [
          { label: 'Peso Sin Pérdida', a: '~26 % más ligero que PNG equivalente', b: 'Tamaño base sin compresión con pérdida' },
          { label: 'Transparencia Alfa', a: 'Soporte completo en modo con y sin pérdida', b: 'Soporte completo únicamente sin pérdida' },
          { label: 'Compatibilidad Web', a: '+97 % de navegadores modernos', b: '100 % universal en cualquier software' },
          { label: 'Impacto en SEO / LCP', a: 'Carga móvil mucho más rápida y menor ancho de banda', b: 'Archivos pesados que penalizan velocidad móvil' }
        ]
      },
      fr: {
        title: 'Format Image WebP vs PNG pour la Performance Web',
        seoTitle: 'WebP vs PNG | Poids, Transparence, Qualité & Core Web Vitals',
        seoDescription: 'Comparez les formats WebP et PNG : taux de compression, transparence alpha, compatibilité navigateurs et impact sur le LCP.',
        verdict: 'WebP surclasse PNG sur le web en réduisant le poids des images de 26 % à 70 % tout en conservant la transparence alpha, ce qui booste directement le LCP et le SEO. Gardez PNG pour l’archivage maître.',
        differences: [
          { label: 'Poids en Mode Sans Perte', a: 'Environ 26 % plus léger que PNG', b: 'Poids de référence sans perte' },
          { label: 'Transparence Alpha', a: 'Prise en charge complète avec ou sans perte', b: 'Prise en charge complète sans perte uniquement' },
          { label: 'Compatibilité Navigateurs', a: 'Plus de 97 % des navigateurs mondiaux', b: '100 % universelle sur tous les logiciels' },
          { label: 'Impact Core Web Vitals (LCP)', a: 'Chargement rapide et économie de bande passante', b: 'Ralentit le rendu des visuels haute résolution' }
        ]
      },
      de: {
        title: 'WebP vs. PNG Bildformat für Web-Performance',
        seoTitle: 'WebP vs PNG Vergleich | Dateigröße, Transparenz & Core Web Vitals',
        seoDescription: 'Vergleichen Sie WebP und PNG für Websites: Kompressionsrate, Alpha-Transparenz, Browser-Support und Einfluss auf Largest Contentful Paint (LCP).',
        verdict: 'WebP ist im Web klar überlegen: Es unterstützt volle Transparenz bei 26 % bis 70 % kleineren Dateien als PNG und verbessert den Core-Web-Vitals-Wert LCP spürbar. PNG bleibt für Master-Dateien und Druckvorstufen sinnvoll.',
        differences: [
          { label: 'Dateigröße (verlustfrei)', a: 'Ca. 26 % kleiner als identisches PNG', b: 'Größere Referenzdateien' },
          { label: 'Transparenz (Alpha-Kanal)', a: 'Vollständig im verlustfreien & verlustbehafteten Modus', b: 'Vollständig, aber nur verlustfrei (große Dateien)' },
          { label: 'Browser-Kompatibilität', a: 'Über 97 % weltweit (alle modernen Browser)', b: '100 % universell auch in Alt-Software' },
          { label: 'SEO & Ladezeit (LCP)', a: 'Schneller Seitenaufbau & geringerer Traffic', b: 'Bremst mobile Ladezeiten bei großen Grafiken' }
        ]
      }
    }
  },
  {
    slug: 'json-vs-yaml-format',
    title: 'JSON vs. YAML Data Serialization Formats',
    seoTitle: 'JSON vs YAML Comparison | Syntax, Comments, APIs & DevOps Configs',
    seoDescription: 'Compare JSON and YAML for APIs, Kubernetes, Docker, and configuration files. Evaluate parsing speed, comments, multiline strings, and indentation safety.',
    toolA: 'json-formatter',
    toolB: 'yaml-formatter',
    verdict: 'Use JSON for APIs, webhooks, browser storage, and machine-to-machine data exchange because parsing is native, deterministic, and ultra-fast. Use YAML for human-edited DevOps configurations (Kubernetes, GitHub Actions, Docker Compose) where comments and readability matter.',
    differences: [
      { label: 'Comments Support', a: 'Not allowed in strict RFC 8259 JSON', b: 'Native # inline and block comments supported' },
      { label: 'Syntax Style', a: 'Explicit braces {}, brackets [], and double quotes', b: 'Whitespace/indentation-sensitive structure' },
      { label: 'Parsing Speed & Safety', a: 'Ultra-fast native JSON.parse(); zero ambiguity', b: 'Slower parsing; indentation/type-coercion pitfalls ("NO" → false)' },
      { label: 'Superset Relationship', a: 'Valid JSON is technically valid YAML 1.2', b: 'YAML features anchors, aliases, and multiline strings' },
      { label: 'Primary Ecosystem', a: 'REST/GraphQL APIs, package.json, TypeScript/JS', b: 'Kubernetes, CI/CD pipelines, Docker Compose, Ansible' }
    ],
    translations: {
      es: {
        title: 'JSON vs. YAML para APIs y Configuración DevOps',
        seoTitle: 'JSON vs YAML | Diferencias, Comentarios, Velocidad y Uso',
        seoDescription: 'Compare los formatos JSON y YAML en APIs, Kubernetes y archivos de configuración: comentarios, velocidad de análisis y legibilidad humana.',
        verdict: 'Use JSON para APIs, intercambio máquina-a-máquina y navegadores gracias a su rapidez y sintaxis estricta. Elija YAML para archivos editados por humanos (Kubernetes, CI/CD, Docker) donde los comentarios son esenciales.',
        differences: [
          { label: 'Soporte de Comentarios', a: 'No permitido en JSON estándar RFC 8259', b: 'Comentarios nativos con #' },
          { label: 'Sintaxis', a: 'Llaves {}, corchetes [] y comillas obligatorias', b: 'Basada en indentación por espacios' },
          { label: 'Velocidad de Parseo', a: 'Nativa y ultrarrápida en todos los lenguajes', b: 'Más lenta y sensible a errores de indentación' },
          { label: 'Uso Predominante', a: 'APIs REST, almacenamiento web, payloads', b: 'Kubernetes, GitHub Actions, Docker Compose' }
        ]
      },
      fr: {
        title: 'Format JSON vs YAML pour API et DevOps',
        seoTitle: 'JSON vs YAML | Syntaxe, Commentaires, Performance & Cas d’Usage',
        seoDescription: 'Comparez JSON et YAML pour vos API REST, Kubernetes, Docker Compose et CI/CD : lisibilité, commentaires et risques d’indentation.',
        verdict: 'Privilégiez JSON pour les API et échanges automatisés grâce à sa rapidité native et son absence d’ambiguïté. Utilisez YAML pour les fichiers de configuration édités à la main (Kubernetes, CI/CD) où les commentaires sont précieux.',
        differences: [
          { label: 'Commentaires', a: 'Interdits en JSON strict (RFC 8259)', b: 'Commentaires natifs via #' },
          { label: 'Délimiteurs', a: 'Accolades {}, crochets [] et guillemets doubles', b: 'Structure dictée par l’indentation' },
          { label: 'Rapidité & Fiabilité', a: 'JSON.parse() natif ultra-rapide et sans ambiguïté', b: 'Plus lent, pièges d’indentation et de typage implicite' },
          { label: 'Écosystème Dominant', a: 'API REST, JavaScript, stockage navigateur', b: 'Kubernetes, GitHub Actions, Docker, Ansible' }
        ]
      },
      de: {
        title: 'JSON vs. YAML Datenformate im Vergleich',
        seoTitle: 'JSON vs YAML Vergleich | Syntax, Kommentare, APIs & DevOps',
        seoDescription: 'Vergleichen Sie JSON und YAML für Schnittstellen, Kubernetes und CI/CD-Pipelines: Parser-Geschwindigkeit, Kommentare und Fehleranfälligkeit.',
        verdict: 'JSON ist der Standard für APIs und maschinellen Datenaustausch dank nativer Geschwindigkeit und strikter Eindeutigkeit. YAML überzeugt bei manuell gepflegten DevOps-Konfigurationen (Kubernetes, CI/CD) durch Kommentare und Lesbarkeit.',
        differences: [
          { label: 'Kommentare', a: 'In striktem RFC-8259-JSON nicht erlaubt', b: 'Native Kommentare mit # möglich' },
          { label: 'Syntaxstruktur', a: 'Explizite Klammern {} und []', b: 'Einrückungsbasiert mit Leerzeichen' },
          { label: 'Parsing & Sicherheit', a: 'Extrem schnell & deterministisch (JSON.parse)', b: 'Langsamer; Einrückungs- und Typisierungsfallen' },
          { label: 'Hauptanwendung', a: 'REST-APIs, Web-Apps, Datenaustausch', b: 'Kubernetes, Docker Compose, GitHub Actions' }
        ]
      }
    }
  },
  {
    slug: 'voltage-vs-current-vs-resistance',
    title: 'Voltage (V) vs. Current (A) in Electrical Circuits',
    seoTitle: 'Voltage vs Current (Volts vs Amps) | Ohm’s Law & Power Explained',
    seoDescription: 'Compare electrical Voltage (Volts) and Current (Amps) using Ohm’s Law (V = I × R). Understand electrical pressure vs charge flow, wire sizing, and safety.',
    toolA: 'voltage-calculator',
    toolB: 'current-calculator',
    verdict: 'Voltage (V) is the electrical potential difference pushing electrons through a circuit, while Current (I, in Amps) is the actual flow rate of charge. Power (Watts = V × I) requires both: higher voltage delivers the same power with lower current, allowing thinner wires and lower heat loss.',
    differences: [
      { label: 'Physical Meaning', a: 'Electrical potential difference ("pressure" per unit charge)', b: 'Rate of electric charge flow (1 A = 1 Coulomb/sec)' },
      { label: 'SI Unit & Symbol', a: 'Volt (V)', b: 'Ampere / Amp (A), symbol I' },
      { label: 'Ohm’s Law Formula', a: 'V = I × R (or V = P / I)', b: 'I = V / R (or I = P / V)' },
      { label: 'Effect on Cable Sizing', a: 'Dictates insulation voltage rating', b: 'Dictates copper wire gauge (AWG / mm²) & heat loss (I²R)' },
      { label: 'Measurement Method', a: 'Measured in parallel across two circuit points', b: 'Measured in series (or via clamp meter) through a conductor' }
    ],
    translations: {
      es: {
        title: 'Voltaje (V) vs. Corriente Eléctrica (A)',
        seoTitle: 'Voltaje vs Corriente Eléctrica (Voltios vs Amperios) | Ley de Ohm',
        seoDescription: 'Compare voltaje (V) y corriente eléctrica (A) según la Ley de Ohm. Comprenda la presión eléctrica, el flujo de carga y el calibre del cableado.',
        verdict: 'El voltaje (V) es la diferencia de potencial que impulsa los electrones y la corriente (A) es el caudal real de carga eléctrica. Elevar el voltaje permite transmitir la misma potencia con menor corriente y menos pérdidas térmicas (I²R).',
        differences: [
          { label: 'Significado Físico', a: 'Diferencia de potencial eléctrico ("presión")', b: 'Caudal de carga eléctrica (1 A = 1 C/s)' },
          { label: 'Unidad SI', a: 'Voltio (V)', b: 'Amperio (A), símbolo I' },
          { label: 'Ley de Ohm', a: 'V = I × R', b: 'I = V / R' },
          { label: 'Impacto en Cables', a: 'Define el nivel de aislamiento eléctrico', b: 'Define el calibre del conductor y calentamiento I²R' }
        ]
      },
      fr: {
        title: 'Tension (Volts) vs Intensité du Courant (Ampères)',
        seoTitle: 'Tension vs Courant Électrique (V vs A) | Loi d’Ohm & Puissance',
        seoDescription: 'Comparez tension électrique (V) et courant (A) via la loi d’Ohm (U = R × I) : section de câble, pertes thermiques et méthodes de mesure.',
        verdict: 'La tension (V) représente la différence de potentiel qui met les électrons en mouvement, tandis que l’intensité (A) mesure le débit effectif de courant. À puissance égale, doubler la tension divise par deux le courant et par quatre les pertes par effet Joule.',
        differences: [
          { label: 'Grandeur Physique', a: 'Différence de potentiel électrique', b: 'Débit de charge électrique (1 A = 1 C/s)' },
          { label: 'Unité SI', a: 'Volt (V)', b: 'Ampère (A), symbole I' },
          { label: 'Loi d’Ohm', a: 'U = R × I', b: 'I = U / R' },
          { label: 'Dimensionnement Câble', a: 'Détermine la classe d’isolation', b: 'Détermine la section en mm² et l’échauffement RI²' }
        ]
      },
      de: {
        title: 'Elektrische Spannung (Volt) vs. Stromstärke (Ampere)',
        seoTitle: 'Spannung vs Stromstärke (Volt vs Ampere) | Ohmsches Gesetz',
        seoDescription: 'Vergleichen Sie elektrische Spannung (U in Volt) und Stromstärke (I in Ampere) nach dem Ohmschen Gesetz inkl. Kabelquerschnitt und Verlustleistung.',
        verdict: 'Die Spannung (V) ist die treibende Potenzialdifferenz, während die Stromstärke (A) die tatsächlich fließende Ladungsmenge pro Sekunde misst. Höhere Spannung ermöglicht bei gleicher Leistung dünnere Leitungen und drastisch geringere Wärmeverluste (I²·R).',
        differences: [
          { label: 'Physikalische Bedeutung', a: 'Elektrische Potenzialdifferenz („Antrieb“)', b: 'Ladungsfluss pro Sekunde (1 A = 1 C/s)' },
          { label: 'SI-Einheit & Formelzeichen', a: 'Volt (V), Zeichen U', b: 'Ampere (A), Zeichen I' },
          { label: 'Ohmsches Gesetz', a: 'U = R × I', b: 'I = U / R' },
          { label: 'Kabeldimensionierung', a: 'Bestimmt Isolationsspannung', b: 'Bestimmt Leiterquerschnitt (mm²) & Erwärmung' }
        ]
      }
    }
  },
  {
    slug: 'electrical-power-vs-energy',
    title: 'Electrical Power (Watts / kW) vs. Energy (kWh)',
    seoTitle: 'Watts (kW) vs Kilowatt-Hours (kWh) | Power vs Energy Explained',
    seoDescription: 'Compare Electrical Power (Watts/kW) and Electrical Energy (kWh). Learn how appliances draw power instantly while your utility bill charges for total kWh consumed over time.',
    toolA: 'electrical-power-calculator',
    toolB: 'electrical-energy-calculator',
    verdict: 'Power (Watts or kW) is the instantaneous rate at which a device draws electricity, while Energy (Wh or kWh) is the cumulative electricity consumed over time (Energy = Power × Hours). Your electric bill charges per kWh — not per Watt.',
    differences: [
      { label: 'Physical Concept', a: 'Instantaneous rate of energy transfer', b: 'Total accumulated work / electricity consumed over time' },
      { label: 'Units', a: 'Watt (W) or Kilowatt (1 kW = 1,000 W)', b: 'Watt-hour (Wh) or Kilowatt-hour (kWh)' },
      { label: 'Formula', a: 'P = V × I (or V × I × cos φ for AC)', b: 'E (kWh) = [Power (W) × Hours] / 1,000' },
      { label: 'Practical Example', a: 'A 1,500 W space heater draws 1.5 kW right now', b: 'Running that 1.5 kW heater for 4 hours uses 6.0 kWh' },
      { label: 'Sizing Role', a: 'Sizes circuit breakers, inverters, and generators', b: 'Determines monthly utility bills and battery bank capacity' }
    ],
    translations: {
      es: {
        title: 'Potencia Eléctrica (Watts / kW) vs. Energía Eléctrica (kWh)',
        seoTitle: 'Watts (kW) vs Kilovatios-Hora (kWh) | Diferencia en la Factura Eléctrica',
        seoDescription: 'Compare potencia eléctrica (W/kW) y energía consumida (kWh). Entienda cómo se dimensionan inversores y cómo se calcula su recibo de luz.',
        verdict: 'La potencia (kW) mide el ritmo instantáneo de consumo de un equipo, mientras que la energía (kWh) mide el total consumido a lo largo del tiempo (Energía = Potencia × Horas). Su compañía eléctrica factura por kWh.',
        differences: [
          { label: 'Concepto Físico', a: 'Ritmo instantáneo de consumo eléctrico', b: 'Cantidad total de electricidad consumida en el tiempo' },
          { label: 'Unidades', a: 'Vatio (W) o Kilovatio (kW)', b: 'Vatio-hora (Wh) o Kilovatio-hora (kWh)' },
          { label: 'Fórmula', a: 'P = V × I', b: 'E (kWh) = [Potencia (W) × Horas] / 1.000' },
          { label: 'Para Qué Sirve', a: 'Dimensionar breakers, cables e inversores', b: 'Calcular factura mensual y autonomía de baterías' }
        ]
      },
      fr: {
        title: 'Puissance Électrique (Watts / kW) vs Énergie (kWh)',
        seoTitle: 'kW vs kWh | Différence entre Puissance & Énergie Électrique',
        seoDescription: 'Comparez la puissance électrique (W, kW) et l’énergie consommée (Wh, kWh) pour comprendre votre facture d’électricité et dimensionner un onduleur.',
        verdict: 'La puissance (kW) exprime le débit instantané appelé par un appareil, tandis que l’énergie (kWh) mesure la quantité cumulée sur une durée (kWh = kW × heures). Votre fournisseur facture les kWh consommés.',
        differences: [
          { label: 'Notion Physique', a: 'Débit instantané d’énergie', b: 'Quantité totale d’énergie consommée dans le temps' },
          { label: 'Unités', a: 'Watt (W) ou Kilowatt (kW)', b: 'Watt-heure (Wh) ou Kilowatt-heure (kWh)' },
          { label: 'Formule', a: 'P = U × I (× cos φ en alternatif)', b: 'E (kWh) = [P (W) × Heures] / 1 000' },
          { label: 'Application Pratique', a: 'Calibrage disjoncteur, onduleur et abonnement kVA', b: 'Facture mensuelle et capacité de batterie' }
        ]
      },
      de: {
        title: 'Elektrische Leistung (Watt / kW) vs. Energie (kWh)',
        seoTitle: 'Watt (kW) vs Kilowattstunden (kWh) | Stromverbrauch richtig verstehen',
        seoDescription: 'Vergleichen Sie elektrische Leistung (W/kW) und elektrische Arbeit bzw. Energie (kWh) für Stromrechnung, Wechselrichter und Batteriespeicher.',
        verdict: 'Die Leistung (kW) gibt an, wie viel Strom ein Gerät in einem einzelnen Augenblick zieht; die Energie (kWh) misst die über die Nutzungsdauer verbrauchte Gesamtmenge (kWh = kW × Stunden). Auf der Stromrechnung zahlen Sie kWh.',
        differences: [
          { label: 'Physikalische Größe', a: 'Momentane Leistungsaufnahme', b: 'Über die Zeit verbrauchte Gesamtarbeit' },
          { label: 'Einheiten', a: 'Watt (W) / Kilowatt (kW)', b: 'Wattstunde (Wh) / Kilowattstunde (kWh)' },
          { label: 'Formel', a: 'P = U × I (× cos φ bei Wechselstrom)', b: 'E (kWh) = [Leistung (W) × Stunden] / 1.000' },
          { label: 'Praxisbedeutung', a: 'Auslegung von Sicherungen & Wechselrichtern', b: 'Berechnung der Stromkosten & Akku-Kapazität' }
        ]
      }
    }
  },
  {
    slug: 'ups-vs-inverter-backup',
    title: 'UPS (Uninterruptible Power Supply) vs. Home Inverter',
    seoTitle: 'UPS vs Inverter Comparison | Switchover Time, Runtime & Electronics Safety',
    seoDescription: 'Compare an Uninterruptible Power Supply (UPS) and a home power inverter. Analyze switchover speed (ms), pure sine wave protection, battery runtime, and cost.',
    toolA: 'ups-calculator',
    toolB: 'inverter-calculator',
    verdict: 'Use a UPS for computers, servers, NAS devices, and routers because its sub-10 ms transfer time prevents sudden reboots and data corruption. Use a Home Inverter + deep-cycle battery bank for longer whole-room backup (lights, fans, Wi-Fi, appliances) during multi-hour outages.',
    differences: [
      { label: 'Switchover Time', a: '0–10 milliseconds (seamless — PCs stay running)', b: '15–500 milliseconds (desktops often reboot unless UPS-mode)' },
      { label: 'Typical Backup Runtime', a: '5 to 45 minutes (designed for graceful shutdown)', b: '2 to 12+ hours (large external 100Ah–400Ah batteries)' },
      { label: 'Voltage Regulation (AVR)', a: 'Built-in surge protection & automatic voltage regulation', b: 'Basic filtering unless Pure Sine Wave hybrid inverter' },
      { label: 'Primary Load Type', a: 'Workstations, servers, networking gear, POS terminals', b: 'Home lighting, fans, TV, Wi-Fi, refrigerators' }
    ],
    translations: {
      es: {
        title: 'UPS (SAI) vs. Inversor Doméstico con Baterías',
        seoTitle: 'UPS vs Inversor | Tiempo de Conmutación, Autonomía y Protección',
        seoDescription: 'Compare un sistema UPS (SAI) frente a un inversor doméstico: velocidad de transferencia en milisegundos, autonomía y protección de computadoras.',
        verdict: 'Use un UPS para computadoras, servidores y routers gracias a su conmutación casi instantánea (<10 ms) que evita reinicios. Use un inversor con baterías externas para respaldar iluminación y electrodomésticos durante varias horas.',
        differences: [
          { label: 'Tiempo de Transferencia', a: '0–10 milisegundos (sin apagado de PC)', b: '15–500 ms (puede reiniciar equipos sin modo SAI)' },
          { label: 'Autonomía Típica', a: '5 a 45 minutos para guardado seguro', b: '2 a 12+ horas con baterías de ciclo profundo' },
          { label: 'Regulación de Voltaje', a: 'AVR y protección contra picos integrada', b: 'Básica salvo inversores de onda sinusoidal pura' },
          { label: 'Uso Principal', a: 'PCs, servidores, NAS y equipos críticos', b: 'Luces, ventiladores, módem y electrodomésticos' }
        ]
      },
      fr: {
        title: 'Onduleur Informatique (UPS) vs Onduleur Domestique (Inverter)',
        seoTitle: 'Onduleur UPS vs Convertisseur Domestique | Temps de Bascule & Autonomie',
        seoDescription: 'Comparez un onduleur informatique UPS et un onduleur/convertisseur de secours domestique : temps de commutation, autonomie batterie et protection PC.',
        verdict: 'Un onduleur UPS est indispensable pour les PC, NAS et serveurs grâce à sa bascule en moins de 10 ms évitant toute coupure. Un convertisseur domestique avec batteries externes assure plusieurs heures d’autonomie pour l’éclairage et la maison.',
        differences: [
          { label: 'Temps de Commutation', a: '0 à 10 millisecondes (invisible pour un PC)', b: '15 à 500 ms (coupure brève possible)' },
          { label: 'Autonomie Courante', a: '5 à 45 minutes (arrêt propre sécurisé)', b: '2 à 12+ heures sur parc batterie externe' },
          { label: 'Régulation Tension (AVR)', a: 'Régulation automatique et parafoudre intégrés', b: 'Variable selon modèle pur sinus / hybride' },
          { label: 'Équipements Cibles', a: 'Ordinateurs, serveurs, routeurs, NAS', b: 'Éclairage, ventilateurs, box internet, électroménager' }
        ]
      },
      de: {
        title: 'USV (UPS) vs. Haus-Wechselrichter (Inverter)',
        seoTitle: 'USV (UPS) vs Wechselrichter Vergleich | Umschaltzeit & Laufzeit',
        seoDescription: 'Vergleichen Sie eine unterbrechungsfreie Stromversorgung (USV) mit einem Haus-Wechselrichter: Umschaltzeit in Millisekunden, Überbrückungszeit und Schutz.',
        verdict: 'Eine USV schützt PCs, Server und NAS durch extrem schnelle Umschaltzeiten (<10 ms) vor Datenverlust. Ein Wechselrichter mit großer Batteriebank eignet sich für stundenlange Notstromversorgung von Licht und Haushaltsgeräten.',
        differences: [
          { label: 'Umschaltzeit', a: '0–10 Millisekunden (nahtlos für IT-Hardware)', b: '15–500 ms (PCs starten oft neu ohne USV-Modus)' },
          { label: 'Typische Laufzeit', a: '5 bis 45 Minuten für geordnetes Herunterfahren', b: '2 bis 12+ Stunden mit externen Akkubänken' },
          { label: 'Spannungsregelung (AVR)', a: 'Integrierte AVR & Überspannungsschutz', b: 'Abhängig von reinem Sinus-Hybridgerät' },
          { label: 'Einsatzbereich', a: 'Workstations, Server, NAS, Router', b: 'Wohnraumbeleuchtung, Kühlschrank, Heizungspumpe' }
        ]
      }
    }
  },
  {
    slug: 'kinetic-vs-potential-energy',
    title: 'Kinetic Energy vs. Potential Energy in Physics',
    seoTitle: 'Kinetic Energy vs Potential Energy | Formulas (½mv² vs mgh) & Conservation',
    seoDescription: 'Compare Kinetic Energy (energy of motion) and Gravitational Potential Energy (stored position energy). Review SI units, velocity scaling, and energy conservation.',
    toolA: 'kinetic-energy-calculator',
    toolB: 'potential-energy-calculator',
    verdict: 'Kinetic energy (KE = ½mv²) is energy of active motion and quadruples every time velocity doubles. Gravitational potential energy (PE = mgh) is stored energy due to elevation and scales linearly with height. In frictionless systems, their sum remains constant (KE + PE = constant).',
    differences: [
      { label: 'Core Equation', a: 'KE = ½ × m × v²', b: 'PE = m × g × h' },
      { label: 'Source of Energy', a: 'Motion (mass moving at velocity v)', b: 'Position or configuration in a force field (height h)' },
      { label: 'Scaling Sensitivity', a: 'Quadratic with speed (2× speed → 4× energy)', b: 'Linear with height (2× height → 2× energy)' },
      { label: 'Reference Frame Dependence', a: 'Depends on observer velocity frame', b: 'Depends on chosen zero-height datum (h = 0)' },
      { label: 'SI Unit', a: 'Joule (J = kg·m²/s²)', b: 'Joule (J = kg·m²/s²)' }
    ],
    translations: {
      es: {
        title: 'Energía Cinética vs. Energía Potencial en Física',
        seoTitle: 'Energía Cinética vs Potencial | Fórmulas (½mv² vs mgh) y Conservación',
        seoDescription: 'Compare energía cinética y energía potencial gravitatoria: fórmulas en Joules, dependencia cuadrática de la velocidad y conservación mecánica.',
        verdict: 'La energía cinética (Ec = ½mv²) es energía en movimiento y se cuadruplica al duplicar la velocidad. La energía potencial (Ep = mgh) es energía almacenada por altura y crece linealmente.',
        differences: [
          { label: 'Fórmula Principal', a: 'Ec = ½ × m × v²', b: 'Ep = m × g × h' },
          { label: 'Origen Físico', a: 'Movimiento de una masa a velocidad v', b: 'Posición a una altura h en un campo gravitatorio' },
          { label: 'Escalado', a: 'Cuadrático con la velocidad (2× v → 4× Ec)', b: 'Lineal con la altura (2× h → 2× Ep)' },
          { label: 'Unidad del SI', a: 'Julio / Joule (J)', b: 'Julio / Joule (J)' }
        ]
      },
      fr: {
        title: 'Énergie Cinétique vs Énergie Potentielle en Physique',
        seoTitle: 'Énergie Cinétique vs Potentielle | Formules ½mv² et mgh',
        seoDescription: 'Comparez énergie cinétique et énergie potentielle de pesanteur : formules SI en Joules, dépendance à la vitesse et conservation de l’énergie.',
        verdict: 'L’énergie cinétique (Ec = ½mv²) correspond au mouvement et quadruple lorsque la vitesse double. L’énergie potentielle (Ep = mgh) représente l’énergie stockée par l’altitude et varie linéairement avec la hauteur.',
        differences: [
          { label: 'Équation Fondamentale', a: 'Ec = ½ × m × v²', b: 'Ep = m × g × h' },
          { label: 'Nature de l’Énergie', a: 'Énergie liée au mouvement', b: 'Énergie stockée par position ou altitude' },
          { label: 'Sensibilité d’Échelle', a: 'Quadratique en vitesse (v × 2 ⇒ Ec × 4)', b: 'Linéaire en hauteur (h × 2 ⇒ Ep × 2)' },
          { label: 'Unité SI', a: 'Joule (J)', b: 'Joule (J)' }
        ]
      },
      de: {
        title: 'Kinetische Energie vs. Potenzielle Energie in der Physik',
        seoTitle: 'Kinetische vs Potenzielle Energie | Formeln ½mv² & mgh erklärt',
        seoDescription: 'Vergleichen Sie kinetische Bewegungsenergie und potenzielle Lageenergie: SI-Einheit Joule, quadratische Geschwindigkeitsabhängigkeit und Energieerhaltung.',
        verdict: 'Kinetische Energie (Ekin = ½mv²) ist Bewegungsenergie und vervierfacht sich bei doppelter Geschwindigkeit. Potenzielle Energie (Epot = mgh) ist gespeicherte Lageenergie, die linear mit der Höhe wächst.',
        differences: [
          { label: 'Grundformel', a: 'Ekin = ½ × m × v²', b: 'Epot = m × g × h' },
          { label: 'Energieform', a: 'Bewegungsenergie', b: 'Gespeicherte Lageenergie im Schwerefeld' },
          { label: 'Skalierung', a: 'Quadratisch mit Geschwindigkeit (2× v → 4× E)', b: 'Linear mit Höhe (2× h → 2× E)' },
          { label: 'SI-Einheit', a: 'Joule (J = kg·m²/s²)', b: 'Joule (J = kg·m²/s²)' }
        ]
      }
    }
  },
  {
    slug: 'base64-encode-vs-url-encode',
    title: 'Base64 Encoding vs. URL Percent-Encoding',
    seoTitle: 'Base64 vs URL Encoding | Payload Overhead, Character Sets & Web APIs',
    seoDescription: 'Compare Base64 encoding and URL percent-encoding for APIs, JWTs, query strings, and binary data. Learn why encoding is not encryption and when to use each.',
    toolA: 'base64-encode',
    toolB: 'url-encoder',
    verdict: 'Use URL percent-encoding for query parameters, path segments, and form fields containing text (minimal overhead for ASCII). Use Base64 (or Base64URL) when embedding arbitrary binary data (images, cryptographic keys, JWT claims) inside text-only protocols like JSON or MIME.',
    differences: [
      { label: 'Primary Purpose', a: 'Represent arbitrary binary bytes safely as ASCII text', b: 'Escape reserved URI characters (?, &, =, /, spaces) in URLs' },
      { label: 'Output Size Overhead', a: 'Always ~33% larger (3 bytes → 4 characters)', b: '0% for safe ASCII; 3× only on escaped bytes (%XX)' },
      { label: 'URL Safety', a: 'Standard Base64 uses +, /, = (must use Base64URL for URLs)', b: '100% RFC 3986 URL-safe by definition' },
      { label: 'Human Readability', a: 'Completely opaque encoded block', b: 'Mostly readable plain text except escaped symbols' },
      { label: 'Security Note', a: 'Encoding only — NOT encryption', b: 'Encoding only — NOT encryption' }
    ],
    translations: {
      es: {
        title: 'Codificación Base64 vs. Codificación URL (Percent-Encoding)',
        seoTitle: 'Base64 vs URL Encoding | Diferencias, Sobrecarga y Seguridad',
        seoDescription: 'Compare la codificación Base64 y la codificación URL en APIs web, JWT y parámetros GET. Entienda el tamaño resultante y el uso correcto.',
        verdict: 'Use codificación URL para parámetros de consulta y texto en direcciones web. Use Base64 (o Base64URL) para incrustar archivos binarios, firmas o payloads JWT dentro de JSON o correos.',
        differences: [
          { label: 'Propósito Principal', a: 'Convertir datos binarios arbitrarios en texto ASCII', b: 'Escapar caracteres reservados en direcciones URI' },
          { label: 'Incremento de Tamaño', a: 'Siempre ~33 % mayor (3 bytes → 4 caracteres)', b: '0 % en ASCII seguro; 3× solo en símbolos escapados' },
          { label: 'Legibilidad Humana', a: 'Bloque ilegible a simple vista', b: 'Texto en su mayoría legible' },
          { label: 'Nivel de Seguridad', a: 'Solo codificación — NO es cifrado', b: 'Solo codificación — NO es cifrado' }
        ]
      },
      fr: {
        title: 'Encodage Base64 vs Encodage URL (Percent-Encoding)',
        seoTitle: 'Base64 vs Encodage URL | Poids, Caractères & API Web',
        seoDescription: 'Comparez l’encodage Base64 et l’encodage URL (RFC 3986) pour les API, paramètres de requête, JWT et pièces jointes binaires.',
        verdict: 'Utilisez l’encodage URL pour sécuriser les paramètres texte d’une adresse web. Utilisez Base64 (ou Base64URL) pour transporter des données binaires (images, clés, jetons JWT) dans des formats texte comme JSON.',
        differences: [
          { label: 'Objectif Principal', a: 'Représenter des octets binaires en texte ASCII sûr', b: 'Échapper les caractères réservés d’une URI (?, &, =)' },
          { label: 'Surcoût de Taille', a: 'Environ +33 % systématiquement', b: '0 % sur ASCII standard ; 3× par octet échappé' },
          { label: 'Lisibilité Humaine', a: 'Chaîne opaque non lisible', b: 'Largement lisible hors caractères spéciaux' },
          { label: 'Sécurité', a: 'Simple encodage — aucun chiffrement', b: 'Simple encodage — aucun chiffrement' }
        ]
      },
      de: {
        title: 'Base64-Kodierung vs. URL-Kodierung (Percent-Encoding)',
        seoTitle: 'Base64 vs URL-Encoding Vergleich | Overhead, Zeichensatz & APIs',
        seoDescription: 'Vergleichen Sie Base64-Kodierung und URL-Encoding für REST-APIs, JWTs und Query-Parameter: Daten-Overhead, Lesbarkeit und Einsatzbereiche.',
        verdict: 'Verwenden Sie URL-Encoding für Query-Parameter und Textpfade in Web-Adressen. Nutzen Sie Base64 (bzw. Base64URL) zur Einbettung binärer Daten, Schlüssel oder JWT-Payloads in textbasierten Protokollen wie JSON.',
        differences: [
          { label: 'Hauptzweck', a: 'Binärdaten sicher als ASCII-Text kodieren', b: 'Reservierte URI-Zeichen (?, &, =) maskieren' },
          { label: 'Größenzuwachs', a: 'Konstant ca. +33 % (3 Bytes → 4 Zeichen)', b: '0 % bei Standard-ASCII; 3× nur bei Sonderzeichen' },
          { label: 'Lesbarkeit', a: 'Nicht direkt lesbar', b: 'Größtenteils im Klartext lesbar' },
          { label: 'Sicherheitshinweis', a: 'Reine Kodierung — keine Verschlüsselung', b: 'Reine Kodierung — keine Verschlüsselung' }
        ]
      }
    }
  },
  {
    slug: 'compress-pdf-vs-flatten-pdf',
    title: 'Compress PDF vs. Flatten PDF',
    seoTitle: 'Compress PDF vs Flatten PDF | File Size, Form Locking & Print Readiness',
    seoDescription: 'Compare compressing a PDF versus flattening a PDF. Understand when you need smaller file sizes versus permanently locking form fields, annotations, and signatures.',
    toolA: 'compress-pdf',
    toolB: 'flatten-pdf',
    verdict: 'Compress a PDF when your goal is shrinking file size for email or portal upload limits while keeping text selectable. Flatten a PDF when you need to permanently bake interactive form fields, annotations, and visual signatures into static page layers so recipients cannot alter them.',
    differences: [
      { label: 'Primary Objective', a: 'Reduce file size (MB → KB) for fast sharing', b: 'Lock interactive forms, comments & layers permanently' },
      { label: 'Form Field Editability', a: 'Interactive fields usually remain editable', b: 'All form fields become non-editable static content' },
      { label: 'Visual Fidelity / Print', a: 'Aggressive compression can slightly soften embedded photos', b: 'Eliminates missing-font & unprinted-annotation bugs' },
      { label: 'Best Workflow Order', a: 'Step 2: Compress after flattening for smallest locked file', b: 'Step 1: Flatten filled tax/legal forms first' }
    ],
    translations: {
      es: {
        title: 'Comprimir PDF vs. Aplanar PDF (Flatten)',
        seoTitle: 'Comprimir PDF vs Aplanar PDF | Tamaño, Formularios y Seguridad',
        seoDescription: 'Compare comprimir y aplanar un archivo PDF. Descubra cuándo reducir el peso del documento y cuándo bloquear formularios y anotaciones de forma permanente.',
        verdict: 'Comprima un PDF cuando necesite reducir su peso en MB para enviarlo por correo o subirlo a portales. Aplane un PDF cuando deba fijar permanentemente campos de formulario y comentarios para evitar ediciones.',
        differences: [
          { label: 'Objetivo Principal', a: 'Reducir el tamaño del archivo (MB a KB)', b: 'Fusionar y bloquear formularios y capas de forma irreversible' },
          { label: 'Campos Editables', a: 'Suelen conservarse editables', b: 'Se convierten en contenido estático no editable' },
          { label: 'Impresión y Compatibilidad', a: 'Compresión alta puede suavizar imágenes', b: 'Evita que firmas o anotaciones desaparezcan al imprimir' },
          { label: 'Orden Recomendado', a: 'Paso 2: Comprimir al final', b: 'Paso 1: Aplanar primero el formulario completo' }
        ]
      },
      fr: {
        title: 'Compresser un PDF vs Aplatir un PDF (Flatten)',
        seoTitle: 'Compresser PDF vs Aplatir PDF | Poids, Formulaires & Impression',
        seoDescription: 'Comparez la compression PDF et l’aplatissement PDF : réduction de taille, verrouillage définitif des champs de formulaire et fiabilité d’impression.',
        verdict: 'Compressez un PDF pour alléger son poids avant envoi par e-mail ou téléversement. Aplatissez un PDF pour figer définitivement les champs remplis, annotations et tampons dans la page afin d’empêcher toute modification.',
        differences: [
          { label: 'Objectif Principal', a: 'Réduire le poids du fichier (Mo → Ko)', b: 'Fusionner les calques et verrouiller les formulaires' },
          { label: 'Modification des Champs', a: 'Les champs restent généralement modifiables', b: 'Tous les champs deviennent statiques et figés' },
          { label: 'Fiabilité à l’Impression', a: 'Compression forte peut adoucir les photos', b: 'Élimine les bugs de polices ou annotations absentes' },
          { label: 'Ordre Optimal', a: 'Étape 2 : Compresser le document final', b: 'Étape 1 : Aplatir d’abord le formulaire rempli' }
        ]
      },
      de: {
        title: 'PDF komprimieren vs. PDF abflachen (Flatten)',
        seoTitle: 'PDF komprimieren vs PDF abflachen | Dateigröße & Formularschutz',
        seoDescription: 'Vergleichen Sie PDF-Komprimierung und PDF-Abflachung (Flatten): Dateigröße reduzieren vs. Formularfelder und Kommentare dauerhaft sperren.',
        verdict: 'Komprimieren Sie ein PDF, um Dateigrößen für E-Mail oder Upload-Limits zu verkleinern. Flachen Sie ein PDF ab (Flatten), um ausgefüllte Formularfelder, Stempel und Kommentare dauerhaft unveränderlich einzubetten.',
        differences: [
          { label: 'Hauptziel', a: 'Dateigröße reduzieren (MB → KB)', b: 'Ebenen, Kommentare & Formulare dauerhaft fixieren' },
          { label: 'Bearbeitbare Felder', a: 'Bleiben in der Regel weiter ausfüllbar', b: 'Werden fest in statischen Seiteninhalt umgewandelt' },
          { label: 'Druckzuverlässigkeit', a: 'Starke Kompression senkt ggf. Bildauflösung', b: 'Verhindert fehlende Formulareinträge beim Drucken' },
          { label: 'Optimale Reihenfolge', a: 'Schritt 2: Anschließend komprimieren', b: 'Schritt 1: Ausgefülltes Formular zuerst abflachen' }
        ]
      }
    }
  },
  {
    slug: 'protect-pdf-vs-redact-pdf',
    title: 'Password-Protect PDF vs. Redact PDF',
    seoTitle: 'Protect PDF vs Redact PDF | Encryption vs Permanent Data Removal',
    seoDescription: 'Compare password-protecting (encrypting) a PDF against permanently redacting sensitive PII. Learn why blacking out text without true redaction leaks confidential data.',
    toolA: 'protect-pdf',
    toolB: 'redact-pdf',
    verdict: 'Password-protecting encrypts the entire file so only authorized password holders can open it. Redacting permanently destroys specific sensitive words, SSNs, or figures from the underlying PDF stream so you can safely share the rest of the document publicly.',
    differences: [
      { label: 'Protection Scope', a: 'Whole-document access control via encryption password', b: 'Selective permanent removal of sensitive text/regions' },
      { label: 'Reversibility', a: 'Reversible by anyone who possesses the password', b: '100% irreversible — underlying bytes are deleted' },
      { label: 'Public / Third-Party Sharing', a: 'Requires transmitting a password out-of-band', b: 'Safe to publish or send openly without a password' },
      { label: 'Compliance Use Case', a: 'Sending full financial statements to a known recipient', b: 'GDPR, HIPAA, legal discovery & FOIA disclosures' }
    ],
    translations: {
      es: {
        title: 'Proteger PDF con Contraseña vs. Censurar (Redactar) PDF',
        seoTitle: 'Proteger PDF vs Censurar PDF | Cifrado vs Eliminación Permanente',
        seoDescription: 'Compare cifrar un PDF con contraseña frente a censurar (redaction) datos personales de forma irreversible para cumplimiento GDPR y legal.',
        verdict: 'Proteger con contraseña cifra el archivo completo para destinatarios autorizados. Censurar (Redact) destruye irreversiblemente datos sensibles específicos para compartir el resto del documento con terceros sin fugas.',
        differences: [
          { label: 'Alcance de Seguridad', a: 'Controla el acceso al archivo completo', b: 'Elimina selectivamente textos o datos confidenciales' },
          { label: 'Reversibilidad', a: 'Accesible para quien tenga la contraseña', b: '100 % irreversible — los datos subyacentes se borran' },
          { label: 'Uso Compartido Externo', a: 'Exige compartir la contraseña por otro canal', b: 'Seguro para envío abierto o publicación' },
          { label: 'Cumplimiento Normativo', a: 'Envío de documentos íntegros a clientes', b: 'GDPR, HIPAA, expedientes judiciales y auditorías' }
        ]
      },
      fr: {
        title: 'Protéger un PDF par Mot de Passe vs Biffer (Caviarder) un PDF',
        seoTitle: 'Protéger PDF vs Biffer PDF | Chiffrement vs Suppression Définitive',
        seoDescription: 'Comparez le chiffrement PDF par mot de passe et le caviardage permanent (redaction) pour protéger vos données sensibles selon le RGPD.',
        verdict: 'La protection par mot de passe chiffre l’intégralité du fichier pour des destinataires identifiés. Le caviardage (Redact) détruit définitivement les informations confidentielles ciblées afin de diffuser le reste du document sans risque.',
        differences: [
          { label: 'Périmètre de Protection', a: 'Verrouillage intégral du fichier par chiffrement', b: 'Effacement sélectif de données confidentielles' },
          { label: 'Réversibilité', a: 'Déverrouillable avec le mot de passe', b: '100 % irréversible — texte source supprimé' },
          { label: 'Diffusion Externe', a: 'Nécessite de transmettre le mot de passe', b: 'Partage libre sans fuite de données masquées' },
          { label: 'Cas Réglementaires', a: 'Envoi de dossiers complets à un tiers autorisé', b: 'RGPD, dossiers médicaux, pièces juridiques' }
        ]
      },
      de: {
        title: 'PDF mit Passwort schützen vs. PDF dauerhaft schwärzen (Redaction)',
        seoTitle: 'PDF schützen vs PDF schwärzen | Verschlüsselung & DSGVO-Sicherheit',
        seoDescription: 'Vergleichen Sie PDF-Passwortschutz (Verschlüsselung) mit echtem, unwiderruflichem Schwärzen sensibler Daten für DSGVO und Rechtsverkehr.',
        verdict: 'Passwortschutz verschlüsselt das gesamte Dokument für autorisierte Empfänger. Echtes Schwärzen (Redaction) löscht gezielt sensible Angaben unwiderruflich aus dem Datenstrom, sodass der Rest sicher weitergegeben werden kann.',
        differences: [
          { label: 'Schutzumfang', a: 'Zugriffsschutz für die gesamte Datei', b: 'Gezielte dauerhafte Entfernung einzelner Passagen' },
          { label: 'Umkehrbarkeit', a: 'Mit Passwort vollständig entschlüsselbar', b: '100 % unumkehrbar — zugrunde liegender Text wird gelöscht' },
          { label: 'Weitergabe an Dritte', a: 'Erfordert separate Passwortübermittlung', b: 'Sicher für öffentliche oder externe Weitergabe' },
          { label: 'Typischer Einsatz', a: 'Vertraulicher Versand vollständiger Berichte', b: 'DSGVO-Auskünfte, Rechtsakten, Behörden-Uploads' }
        ]
      }
    }
  },
  {
    slug: 'svg-to-png-vs-png-to-svg',
    title: 'SVG to PNG (Rasterize) vs. PNG to SVG (Vectorize)',
    seoTitle: 'SVG to PNG vs PNG to SVG | Vector vs Raster Image Conversion Explained',
    seoDescription: 'Compare converting vector SVG to raster PNG versus tracing raster PNG to vector SVG. Understand scalability, sharpness, transparency, and file size trade-offs.',
    toolA: 'svg-to-png',
    toolB: 'png-to-svg',
    verdict: 'Convert SVG → PNG when you need guaranteed compatibility in email clients, social media OpenGraph cards, or fixed-pixel exports with crisp anti-aliasing. Convert PNG → SVG to recover infinitely scalable vector paths from simple logos, icons, and line art.',
    differences: [
      { label: 'Conversion Direction', a: 'Vector math paths → Fixed pixel grid (exact render)', b: 'Pixel grid → Traced mathematical vector curves (approximation)' },
      { label: 'Visual Fidelity', a: '100% pixel-accurate at chosen resolution (1×, 2×, 4×)', b: 'Excellent on flat logos/icons; unsuitable for complex photos' },
      { label: 'Infinite Zoom Scaling', a: 'Pixelates if enlarged beyond exported pixel size', b: 'Crisp at any scale from 16px favicon to billboard' },
      { label: 'Best Use Case', a: 'Email signatures, OG cards, app store icons, slides', b: 'Logo recovery, laser/CNC cutting, responsive web icons' }
    ],
    translations: {
      es: {
        title: 'SVG a PNG (Rasterizar) vs. PNG a SVG (Vectorizar)',
        seoTitle: 'SVG a PNG vs PNG a SVG | Diferencia entre Vectorial y Mapa de Bits',
        seoDescription: 'Compare rasterizar SVG a PNG frente a vectorizar PNG a SVG: nitidez al escalar, fidelidad en logotipos y compatibilidad en redes y correo.',
        verdict: 'Convierta SVG → PNG cuando necesite compatibilidad garantizada en correos, redes sociales o resoluciones exactas. Convierta PNG → SVG para transformar logotipos o iconos simples en vectores escalables infinitamente.',
        differences: [
          { label: 'Dirección de Conversión', a: 'Trazos vectoriales → Cuadrícula fija de píxeles', b: 'Píxeles → Trazado de curvas vectoriales aproximadas' },
          { label: 'Fidelidad Visual', a: 'Exacta al 100 % en la resolución elegida', b: 'Ideal en logos planos; no recomendada para fotografías' },
          { label: 'Escalado Infinito', a: 'Se pixela si se amplía sobre su tamaño exportado', b: 'Nítido a cualquier tamaño sin pérdida' },
          { label: 'Uso Óptimo', a: 'Tarjetas sociales, correos, presentaciones', b: 'Recuperación de logos, corte láser e iconos web' }
        ]
      },
      fr: {
        title: 'SVG vers PNG (Pixellisation) vs PNG vers SVG (Vectorisation)',
        seoTitle: 'SVG vers PNG vs PNG vers SVG | Vectoriel & Bitmap Expliqués',
        seoDescription: 'Comparez l’export SVG vers PNG et la vectorisation PNG vers SVG : netteté à l’agrandissement, logos, icônes et compatibilité web.',
        verdict: 'Convertissez SVG → PNG pour les e-mails, visuels sociaux ou formats exigeant des pixels fixes. Convertissez PNG → SVG pour vectoriser des logos simples ou icônes afin de les agrandir à l’infini sans perte.',
        differences: [
          { label: 'Sens de Transformation', a: 'Courbes vectorielles → Grille de pixels exacte', b: 'Pixels → Tracé vectoriel recalculé' },
          { label: 'Fidélité de Rendu', a: '100 % fidèle à la résolution choisie', b: 'Parfait pour logos plats ; inadapté aux photos complexes' },
          { label: 'Mise à l’Échelle', a: 'Flou au-delà de la taille exportée', b: 'Netteté parfaite à toute dimension' },
          { label: 'Cas d’Usage', a: 'Signatures mail, cartes OpenGraph, diaporamas', b: 'Refonte de logo, découpe laser, icônes responsives' }
        ]
      },
      de: {
        title: 'SVG zu PNG (Rastern) vs. PNG zu SVG (Vektorisieren)',
        seoTitle: 'SVG zu PNG vs PNG zu SVG | Vektor- & Pixelgrafiken im Vergleich',
        seoDescription: 'Vergleichen Sie SVG-zu-PNG-Rasterung mit PNG-zu-SVG-Vektorisierung: Skalierbarkeit, Logo-Qualität, Dateigröße und optimale Einsatzbereiche.',
        verdict: 'Wandeln Sie SVG → PNG für E-Mails, Social-Media-Vorschaubilder und feste Pixel-Exporte um. Nutzen Sie PNG → SVG, um schlichte Logos, Icons oder Strichzeichnungen verlustfrei skalierbar zu machen.',
        differences: [
          { label: 'Konvertierungsrichtung', a: 'Vektorpfade → Exaktes Pixelraster', b: 'Pixelraster → Nachgezeichnete Vektorkurven' },
          { label: 'Detailtreue', a: '100 % exakt in der gewählten Auflösung', b: 'Top bei flachen Logos; ungeeignet für komplexe Fotos' },
          { label: 'Skalierbarkeit', a: 'Verpixelt bei Vergrößerung über Exportmaß', b: 'Unbegrenzt scharf vom Favicon bis zum Plakat' },
          { label: 'Optimaler Einsatz', a: 'E-Mail-Banner, OG-Grafiken, Präsentationen', b: 'Logo-Rettung, Plotter/Laser-Schnitt, Web-Icons' }
        ]
      }
    }
  },
  {
    slug: 'margin-vs-markup-pricing',
    title: 'Profit Margin vs. Markup Pricing',
    seoTitle: 'Margin vs Markup Calculator | Pricing Formulas & Retail Profit Traps',
    seoDescription: 'Compare Gross Profit Margin and Markup percentages. Avoid the costly retail mistake of confusing 50% markup (33.3% margin) with a true 50% profit margin.',
    toolA: 'margin-calculator',
    toolB: 'percentage-calculator',
    verdict: 'Margin measures profit as a percentage of selling price — Margin = (Price − Cost) / Price — and can never exceed 100%. Markup measures profit as a percentage of cost — Markup = (Price − Cost) / Cost — and is always higher than margin (e.g., 100% markup equals 50% margin).',
    differences: [
      { label: 'Formula', a: 'Margin = (Revenue − Cost) / Revenue × 100%', b: 'Markup = (Revenue − Cost) / Cost × 100%' },
      { label: 'Example ($60 cost, $100 price)', a: '40.0% Profit Margin', b: '66.7% Markup' },
      { label: 'Upper Mathematical Limit', a: 'Strictly < 100% (at positive cost)', b: 'Unbounded (can be 100%, 300%, 500%+)' },
      { label: 'Primary Business Audience', a: 'CFOs, financial statements & SaaS/retail P&L reporting', b: 'Merchandising, wholesale & rapid cost-plus pricing' }
    ],
    translations: {
      es: {
        title: 'Margen de Beneficio vs. Recargo (Markup)',
        seoTitle: 'Margen vs Markup (Recargo) | Fórmulas de Precios y Rentabilidad',
        seoDescription: 'Compare margen de beneficio bruto y recargo sobre costo (markup). Evite errores costosos al fijar precios comerciales.',
        verdict: 'El margen mide la ganancia sobre el precio de venta y nunca supera el 100 %. El markup mide la ganancia sobre el costo y siempre es numéricamente mayor (por ejemplo, 100 % de markup equivale a 50 % de margen).',
        differences: [
          { label: 'Fórmula', a: 'Margen = (Precio − Costo) / Precio × 100 %', b: 'Markup = (Precio − Costo) / Costo × 100 %' },
          { label: 'Ejemplo (costo 60 €, venta 100 €)', a: '40,0 % de Margen', b: '66,7 % de Recargo (Markup)' },
          { label: 'Límite Matemático', a: 'Siempre menor al 100 %', b: 'Sin límite superior (100 %, 300 %+)' },
          { label: 'Uso Habitual', a: 'Estados financieros y análisis de rentabilidad', b: 'Fijación rápida de precios minoristas' }
        ]
      },
      fr: {
        title: 'Taux de Marge vs Taux de Marque (Margin vs Markup)',
        seoTitle: 'Taux de Marque (Marge) vs Taux de Marge (Markup) | Calcul de Prix',
        seoDescription: 'Comparez taux de marque (marge sur prix de vente) et taux de marge (majoration sur coût d’achat) pour fixer vos prix sans erreur.',
        verdict: 'La marge sur prix de vente (taux de marque) divise le bénéfice par le prix de vente et reste inférieure à 100 %. La majoration sur coût (markup) divise le bénéfice par le coût d’achat et est toujours plus élevée (100 % de markup = 50 % de marge).',
        differences: [
          { label: 'Formule', a: 'Marge (Vente) = (Prix − Coût) / Prix × 100 %', b: 'Markup (Coût) = (Prix − Coût) / Coût × 100 %' },
          { label: 'Exemple (Coût 60 €, Vente 100 €)', a: '40,0 % de marge sur vente', b: '66,7 % de majoration sur coût' },
          { label: 'Plafond Mathématique', a: 'Strictement inférieur à 100 %', b: 'Illimité (100 %, 200 %, 500 %+)' },
          { label: 'Usage Comptable', a: 'Compte de résultat et pilotage financier', b: 'Tarification rapide sur prix d’achat' }
        ]
      },
      de: {
        title: 'Gewinnmarge (Handelsspanne) vs. Kalkulationsaufschlag (Markup)',
        seoTitle: 'Marge vs Aufschlag (Markup) Vergleich | Preiskalkulation ohne Fehler',
        seoDescription: 'Vergleichen Sie Gewinnmarge (bezogen auf Verkaufspreis) und Kalkulationsaufschlag (bezogen auf Einkaufspreis) inkl. Rechenbeispiel.',
        verdict: 'Die Marge bezieht den Gewinn auf den Verkaufspreis und liegt stets unter 100 %. Der Aufschlag (Markup) bezieht den Gewinn auf den Einkaufspreis und ist stets höher — 100 % Aufschlag entsprechen exakt 50 % Marge.',
        differences: [
          { label: 'Formel', a: 'Marge = (Verkaufspreis − Kosten) / Verkaufspreis × 100 %', b: 'Aufschlag = (Verkaufspreis − Kosten) / Kosten × 100 %' },
          { label: 'Beispiel (60 € Einkauf, 100 € Verkauf)', a: '40,0 % Gewinnmarge', b: '66,7 % Kalkulationsaufschlag' },
          { label: 'Obergrenze', a: 'Immer unter 100 %', b: 'Nach oben offen (100 %, 300 %+)' },
          { label: 'Einsatzbereich', a: 'GuV, Controlling & Unternehmensberichte', b: 'Handelskalkulation auf Einkaufspreise' }
        ]
      }
    }
  },
  {
    slug: 'salary-vs-hourly-wage',
    title: 'Salaried Pay vs. Hourly Wage',
    seoTitle: 'Salary vs Hourly Pay Comparison | Overtime, Stability & True Effective Rate',
    seoDescription: 'Compare salaried compensation and hourly wages using a standard 2,080-hour work year. Evaluate overtime pay eligibility, benefits, and true effective hourly rate.',
    toolA: 'salary-calculator',
    toolB: 'hours-calculator',
    verdict: 'Hourly pay rewards every extra hour worked (often at 1.5× overtime) and protects against unpaid scope creep, whereas salaried pay delivers predictable paychecks, paid time off (PTO), and clearer career advancement — provided weekly hours stay near 40.',
    differences: [
      { label: 'Standard Conversion Formula', a: 'Annual Salary = Hourly Rate × 2,080 hrs (40h × 52w)', b: 'Effective Hourly = Annual Pay / Actual Hours Worked' },
      { label: 'Overtime Compensation', a: 'Exempt roles typically receive $0 extra for 45–55 hr weeks', b: 'Non-exempt roles earn 1.5× pay beyond 40 hrs/week' },
      { label: 'Income Predictability', a: 'Fixed paycheck regardless of holidays or slow weeks', b: 'Fluctuates with scheduled shifts and unpaid absences' },
      { label: 'Hidden Effective Rate Risk', a: '$80k at 50 hrs/wk drops effective rate from $38.46 to $30.77/hr', b: 'Every billable or shift hour is directly compensated' }
    ],
    translations: {
      es: {
        title: 'Salario Fijo Anual vs. Pago por Hora',
        seoTitle: 'Salario Anual vs Pago por Hora | Horas Extras y Tarifa Real',
        seoDescription: 'Compare salario fijo anual frente a remuneración por hora sobre 2.080 horas anuales. Analice horas extras, estabilidad y tarifa horaria efectiva.',
        verdict: 'El pago por hora compensa cada hora adicional trabajada (a menudo al 1,5×), mientras que el salario fijo ofrece ingresos predecibles y prestaciones siempre que la jornada no exceda habitualmente las 40 horas semanales.',
        differences: [
          { label: 'Conversión Estándar', a: 'Salario Anual = Tarifa Hora × 2.080 h', b: 'Tarifa Real = Ingreso Anual / Horas Reales' },
          { label: 'Horas Extraordinarias', a: 'Muchos puestos fijos no pagan horas extras', b: 'Compensación directa (1,5× habitual tras 40 h)' },
          { label: 'Estabilidad del Ingreso', a: 'Nómina constante en festivos y vacaciones', b: 'Varía según turnos asignados' },
          { label: 'Riesgo de Tarifa Efectiva', a: 'Trabajar 50 h/sem diluye la tarifa por hora real', b: 'Cada hora trabajada se remunera íntegra' }
        ]
      },
      fr: {
        title: 'Salaire Fixe Annuel (Forfait) vs Taux Horaire',
        seoTitle: 'Salaire Annuel vs Taux Horaire | Heures Supplémentaires & Revenu Réel',
        seoDescription: 'Comparez rémunération fixe annuelle et paiement à l’heure : heures supplémentaires majorées, prévisibilité et taux horaire effectif.',
        verdict: 'Le taux horaire garantit la rémunération de chaque heure supplémentaire effectuée, tandis que le salaire fixe assure une trésorerie stable et des congés payés tant que le volume horaire hebdomadaire reste maîtrisé.',
        differences: [
          { label: 'Base de Conversion', a: 'Annuel = Horaire × 1 820 h (35 h) ou 2 080 h (40 h)', b: 'Taux Réel = Rémunération / Heures Effectives' },
          { label: 'Heures Supplémentaires', a: 'Souvent incluses en forfait jours/cadre', b: 'Payées et majorées dès dépassement légal' },
          { label: 'Prévisibilité Mensuelle', a: 'Salaire identique chaque mois', b: 'Variable selon les heures planifiées' },
          { label: 'Effet des Semaines Chargées', a: 'Dilue le taux horaire réel si non compensé', b: 'Augmente directement le revenu mensuel' }
        ]
      },
      de: {
        title: 'Festgehalt (Jahresgehalt) vs. Stundenlohn',
        seoTitle: 'Festgehalt vs Stundenlohn Vergleich | Überstunden & Effektiver Stundensatz',
        seoDescription: 'Vergleichen Sie fixes Jahresgehalt und Stundenlohn bei 40-Stunden-Woche: Überstundenvergütung, Einkommenssicherheit und realer Stundenlohn.',
        verdict: 'Ein Stundenlohn vergütet jede geleistete Mehrarbeitsstunde direkt, während ein Festgehalt konstante Monatsbezüge und Planbarkeit sichert — solange unbezahlte Überstunden den effektiven Stundensatz nicht drücken.',
        differences: [
          { label: 'Standard-Umrechnung', a: 'Jahresgehalt = Stundenlohn × 2.080 Std. (40h/W)', b: 'Effektiver Satz = Jahreslohn / reale Arbeitsstunden' },
          { label: 'Überstundenregelung', a: 'Bei Führungspositionen oft teilweise abgegolten', b: 'Jede Stunde inkl. Zuschlägen wird erfasst & bezahlt' },
          { label: 'Planbarkeit', a: 'Konstantes Monatsgehalt trotz Feiertagen', b: 'Schwankt je nach geleisteten Schichten' },
          { label: 'Effektivlohn-Effekt', a: '50h/Woche senken den realen Stundenlohn um 20 %', b: 'Direkte Belohnung höherer Arbeitszeit' }
        ]
      }
    }
  },
  {
    slug: 'debt-consolidation-vs-credit-card-payoff',
    title: 'Debt Consolidation Loan vs. Direct Credit Card Payoff',
    seoTitle: 'Debt Consolidation vs Credit Card Payoff | APR Savings & Payoff Speed',
    seoDescription: 'Compare consolidating high-APR credit cards into a fixed personal loan versus aggressively paying off cards directly without taking a new loan.',
    toolA: 'debt-consolidation-calculator',
    toolB: 'credit-cards-payoff',
    verdict: 'Consolidation wins when your credit score qualifies you for a fixed loan APR at least 4–6 percentage points lower than your credit cards (e.g., 10% vs 24%) and you stop adding new card balances. Direct payoff is faster and cheaper if you can clear the balance within 6–12 months or face high origination fees.',
    differences: [
      { label: 'Typical APR Range', a: '7%–16% fixed (good to excellent credit)', b: '19%–29% variable revolving card APR' },
      { label: 'Upfront Origination Fees', a: '0% to 8% of consolidated loan amount', b: '$0 origination fees' },
      { label: 'Payment Structure', a: 'Single fixed monthly payment with fixed payoff date', b: 'Multiple due dates & variable minimum payments' },
      { label: 'Behavioral Trap Risk', a: 'High risk if freed credit cards are charged back up', b: 'Lower risk — focuses purely on eliminating balances' }
    ],
    translations: {
      es: {
        title: 'Préstamo de Consolidación vs. Pago Directo de Tarjetas',
        seoTitle: 'Consolidación de Deudas vs Pago de Tarjetas | Ahorro en Intereses',
        seoDescription: 'Compare consolidar tarjetas de crédito en un préstamo fijo frente a pagarlas directamente. Evalúe comisiones de apertura, tasas y plazo.',
        verdict: 'Consolidar conviene si obtiene una tasa fija al menos 5 puntos menor a sus tarjetas y evita volver a endeudarse. Pagar directamente es mejor si puede liquidar todo en menos de 12 meses sin pagar comisiones de apertura.',
        differences: [
          { label: 'Tasa APR Habitual', a: '7 %–16 % fija (con buen crédito)', b: '19 %–29 % variable en tarjetas' },
          { label: 'Comisión de Apertura', a: '0 % a 8 % del monto consolidado', b: '0 $ en comisiones' },
          { label: 'Organización de Pagos', a: 'Una sola cuota fija y fecha límite exacta', b: 'Múltiples fechas y saldos revolventes' },
          { label: 'Riesgo Conductual', a: 'Volver a usar los cupos liberados en tarjetas', b: 'Enfoque directo en reducir la deuda' }
        ]
      },
      fr: {
        title: 'Rachat de Crédits vs Remboursement Direct des Cartes',
        seoTitle: 'Rachat de Crédits vs Remboursement Cartes | Taux & Coût Total',
        seoDescription: 'Comparez un prêt de regroupement de crédits à taux fixe et le remboursement accéléré direct de vos cartes renouvelables.',
        verdict: 'Le rachat de crédits est gagnant si vous réduisez votre TAEG d’au moins 4 à 6 points sans frais excessifs et sans réutiliser vos crédits renouvelables. Le remboursement direct l’emporte sur un horizon inférieur à 12 mois.',
        differences: [
          { label: 'Fourchette de TAEG', a: 'Taux fixe réduit (bon dossier)', b: 'Taux renouvelable élevé (souvent >20 %)' },
          { label: 'Frais de Dossier', a: 'Parfois 1 % à 5 % du capital', b: '0 € de frais de montage' },
          { label: 'Gestion Mensuelle', a: 'Une seule mensualité et fin programmée', b: 'Multiples échéances variables' },
          { label: 'Piège Comportemental', a: 'Risque de réendettement sur les cartes soldées', b: 'Discipline directe sur les soldes existants' }
        ]
      },
      de: {
        title: 'Umschuldungskredit vs. Direkte Kreditkarten-Tilgung',
        seoTitle: 'Umschuldung vs Kreditkarte abbezahlen | Zinsersparnis im Vergleich',
        seoDescription: 'Vergleichen Sie eine Umschuldung per Ratenkredit mit der direkten Rückzahlung teurer Kreditkarten-Teilzahlungen.',
        verdict: 'Eine Umschuldung lohnt sich deutlich, sobald der neue Ratenkredit mindestens 4–6 Prozentpunkte günstiger ist als der Kreditkarten-Sollzins und die Karte nicht erneut belastet wird. Bei Rückzahlung in unter 12 Monaten reicht oft die direkte Sondertilgung.',
        differences: [
          { label: 'Typischer Effektivzins', a: 'Ca. 5 %–11 % fest bei guter Bonität', b: 'Oft 15 %–24 % variabler Teilzahlungszins' },
          { label: 'Bearbeitungsgebühren', a: 'Meist 0 € in Deutschland (teils Gebühren international)', b: '0 € Zusatzgebühren' },
          { label: 'Übersichtlichkeit', a: 'Eine feste Rate mit klarem Enddatum', b: 'Mehrere Kartenabrechnungen & variable Mindestraten' },
          { label: 'Schuldenfallen-Risiko', a: 'Hoch, wenn freier Kartenrahmen erneut genutzt wird', b: 'Geringer durch direkten Schuldenabbau' }
        ]
      }
    }
  }
];
