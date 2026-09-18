// ═══════════════════════════════════════════════════════
// TOOL COMPARISONS
// ═══════════════════════════════════════════════════════
// Comparison pages (e.g. "Roth IRA vs 401(k)") are massive
// drivers of SEO traffic because users often search for
// the difference between two financial or technical concepts
// before using a calculator.
// ═══════════════════════════════════════════════════════

export interface ComparisonTranslation {
  title: string;
  seoTitle: string;
  seoDescription: string;
  verdict: string;
  differences: { label: string; a: string; b: string }[];
}

export interface ComparisonDef {
  slug: string; // e.g. "roth-ira-vs-401k"
  title: string;
  seoTitle: string;
  seoDescription: string;
  toolA: string; // slug of first tool
  toolB: string; // slug of second tool
  verdict: string;
  differences: { label: string; a: string; b: string }[];
  translations?: Record<string, ComparisonTranslation>;
}

export const comparisons: ComparisonDef[] = [
  {
    slug: 'roth-ira-vs-401k',
    title: 'Roth IRA vs. 401(k): Which is Better?',
    seoTitle: 'Roth IRA vs 401(k) Calculator & Comparison | Nexus Calculator',
    seoDescription: 'Compare Roth IRA and 401(k) retirement plans. Calculate your potential returns and understand the tax implications of each.',
    toolA: 'roth-ira-calculator',
    toolB: '401k-calculator',
    verdict: 'A 401(k) is best for high earners seeking immediate tax deductions and employer matches. A Roth IRA is better for tax-free growth and withdrawals in retirement.',
    differences: [
      { label: 'Tax Advantage', a: 'Tax-free withdrawals in retirement', b: 'Tax-deductible contributions now' },
      { label: 'Employer Match', a: 'Rarely applicable', b: 'Commonly offered' },
      { label: 'Contribution Limits (2024)', a: '$7,000 ($8,000 if 50+)', b: '$23,000 ($30,500 if 50+)' },
      { label: 'Required Minimum Distributions (RMDs)', a: 'None', b: 'Required at age 73' }
    ],
    translations: {
      es: {
        title: 'Roth IRA vs. 401(k): ¿Cuál es Mejor?',
        seoTitle: 'Calculadora y Comparación Roth IRA vs 401(k) | Nexus Calculator',
        seoDescription: 'Compare planes de jubilación Roth IRA y 401(k). Calcule sus rendimientos y entienda el impacto fiscal de cada opción.',
        verdict: 'Un plan 401(k) es ideal para quienes buscan deducciones fiscales inmediatas y aportes del empleador. Un Roth IRA es superior para crecimiento y retiros libres de impuestos durante la jubilación.',
        differences: [
          { label: 'Ventaja Fiscal', a: 'Retiros libres de impuestos en la jubilación', b: 'Aportaciones deducibles de impuestos hoy' },
          { label: 'Aporte del Empleador', a: 'Rara vez disponible', b: 'Comúnmente ofrecido' },
          { label: 'Límites de Contribución', a: '$7,000 ($8,000 para mayores de 50)', b: '$23,000 ($30,500 para mayores de 50)' },
          { label: 'Distribuciones Mínimas Requeridas (RMD)', a: 'Ninguna', b: 'Obligatorias a partir de los 73 años' }
        ]
      },
      fr: {
        title: 'Roth IRA vs 401(k) : Lequel Choisir ?',
        seoTitle: 'Calculateur et Comparatif Roth IRA vs 401(k) | Nexus Calculator',
        seoDescription: 'Comparez les plans d\'épargne retraite Roth IRA et 401(k). Évaluez vos rendements et comprenez la fiscalité de chaque option.',
        verdict: 'Le 401(k) convient mieux à ceux recherchant des déductions fiscales immédiates et l\'abondement employeur. Le Roth IRA est idéal pour une croissance et des retraits nets d\'impôt à la retraite.',
        differences: [
          { label: 'Avantage Fiscal', a: 'Retraits non imposables à la retraite', b: 'Cotisations déductibles des impôts aujourd\'hui' },
          { label: 'Abondement Employeur', a: 'Rarement proposé', b: 'Fréquemment offert' },
          { label: 'Plafond de Versement', a: '7 000 $ (8 000 $ si 50+ ans)', b: '23 000 $ (30 500 $ si 50+ ans)' },
          { label: 'Retraits Minimaux Obligatoires (RMD)', a: 'Aucun', b: 'Exigés à partir de 73 ans' }
        ]
      },
      de: {
        title: 'Roth IRA vs. 401(k): Was ist besser?',
        seoTitle: 'Roth IRA vs 401(k) Rechner & Vergleich | Nexus Calculator',
        seoDescription: 'Vergleichen Sie Roth IRA und 401(k) Altersvorsorgepläne. Berechnen Sie Renditen und verstehen Sie die Steuervorteile beider Modelle.',
        verdict: 'Ein 401(k) eignet sich am besten für Arbeitnehmer, die sofortige Steuerabzüge und Arbeitgeberzuschüsse nutzen wollen. Ein Roth IRA bietet steuerfreies Wachstum und steuerfreie Auszahlungen im Ruhestand.',
        differences: [
          { label: 'Steuervorteil', a: 'Steuerfreie Auszahlungen im Ruhestand', b: 'Steuerlich absetzbare Einzahlungen heute' },
          { label: 'Arbeitgeberzuschuss', a: 'Sehr selten', b: 'Weit verbreitet' },
          { label: 'Beitragsobergrenzen', a: '7.000 $ (8.000 $ ab 50 Jahren)', b: '23.000 $ (30.500 $ ab 50 Jahren)' },
          { label: 'Mindestauszahlungen (RMD)', a: 'Keine', b: 'Pflicht ab Alter 73' }
        ]
      }
    }
  },
  {
    slug: 'fha-vs-conventional-loan',
    title: 'FHA vs. Conventional Loan',
    seoTitle: 'FHA vs Conventional Loan Calculator | Compare Mortgages',
    seoDescription: 'Compare FHA and Conventional loans. See which mortgage type offers better rates, down payment requirements, and PMI costs for your situation.',
    toolA: 'fha-loan-calculator',
    toolB: 'mortgage-calculator',
    verdict: 'FHA loans are ideal for first-time buyers with lower credit scores and smaller down payments. Conventional loans are better for buyers with good credit who want to avoid lifetime mortgage insurance.',
    differences: [
      { label: 'Minimum Down Payment', a: '3.5%', b: '3%' },
      { label: 'Minimum Credit Score', a: '580 (typically)', b: '620' },
      { label: 'Mortgage Insurance (PMI)', a: 'Required for life of loan (usually)', b: 'Can be cancelled at 20% equity' },
      { label: 'Property Requirements', a: 'Strict appraisal standards', b: 'Standard appraisal' }
    ],
    translations: {
      es: {
        title: 'Préstamo FHA vs. Préstamo Convencional',
        seoTitle: 'Calculadora Préstamo FHA vs Convencional | Comparar Hipotecas',
        seoDescription: 'Compare hipotecas FHA y préstamos convencionales. Descubra qué opción ofrece mejores tasas, requisitos de enganche y costos de seguro hipotecario.',
        verdict: 'Los préstamos FHA son idóneos para compradores primerizos con puntaje crediticio moderado y enganches reducidos. Los préstamos convencionales convienen a quienes tienen buen crédito y buscan cancelar el seguro hipotecario.',
        differences: [
          { label: 'Enganche Mínimo', a: '3.5%', b: '3%' },
          { label: 'Puntaje Crediticio Mínimo', a: '580 (típicamente)', b: '620' },
          { label: 'Seguro Hipotecario (PMI)', a: 'Requerido durante toda la vida del préstamo', b: 'Cancelable al alcanzar 20% de plusvalía' },
          { label: 'Requisitos de la Propiedad', a: 'Normas de tasación estrictas', b: 'Tasación estándar' }
        ]
      },
      fr: {
        title: 'Prêt FHA vs Prêt Conventionnel',
        seoTitle: 'Calculateur Prêt FHA vs Conventionnel | Comparateur Hypothèque',
        seoDescription: 'Comparez les prêts FHA et conventionnels. Découvrez quelle formule propose les meilleurs taux, apports initiaux et coûts d\'assurance.',
        verdict: 'Les prêts FHA sont idéaux pour les primo-accédants ayant un apport modeste ou un dossier moyen. Les prêts conventionnels avantagent les bons profils souhaitant résilier leur assurance emprunteur au bout de 20 % d\'amortissement.',
        differences: [
          { label: 'Apport Initial Minimum', a: '3,5 %', b: '3 %' },
          { label: 'Score de Crédit Minimum', a: '580 (généralement)', b: '620' },
          { label: 'Assurance Emprunteur (PMI)', a: 'Obligatoire pendant toute la durée', b: 'Résilable dès 20 % de capital acquis' },
          { label: 'Exigences du Bien', a: 'Expertise technique stricte', b: 'Expertise standard' }
        ]
      },
      de: {
        title: 'FHA-Darlehen vs. Konventioneller Kredit',
        seoTitle: 'FHA vs Konventioneller Kredit Rechner | Baufinanzierung Vergleich',
        seoDescription: 'Vergleichen Sie FHA- und konventionelle Immobilienkredite. Prüfen Sie Zinssätze, Eigenkapitalanforderungen und Kreditversicherungskosten.',
        verdict: 'FHA-Darlehen eignen sich hervorragend für Erstkäufer mit geringerem Eigenkapital oder mittlerer Bonität. Konventionelle Kredite sind vorteilhafter für Kreditnehmer mit guter Bonität, die keine dauerhafte Kreditversicherung zahlen möchten.',
        differences: [
          { label: 'Mindesteigenkapital', a: '3,5 %', b: '3 %' },
          { label: 'Mindest-Bonitätswert (Score)', a: '580 (üblicherweise)', b: '620' },
          { label: 'Hypothekenversicherung (PMI)', a: 'Meist für die gesamte Laufzeit fällig', b: 'Kündbar ab 20 % Eigenkapitalquote' },
          { label: 'Immobilienanforderungen', a: 'Strenge Gutachterauflagen', b: 'Standard-Gutachten' }
        ]
      }
    }
  },
  {
    slug: 'simple-vs-compound-interest',
    title: 'Simple vs. Compound Interest',
    seoTitle: 'Simple vs Compound Interest Calculator & Comparison',
    seoDescription: 'Compare simple and compound interest to see how your money grows over time. Understand the power of compounding for investments and loans.',
    toolA: 'simple-interest-calculator',
    toolB: 'compound-interest-calculator',
    verdict: 'Compound interest is vastly superior for investments as your interest earns interest over time. Simple interest is generally preferable when you are the one borrowing money (though most loans use compound interest).',
    differences: [
      { label: 'Calculation Basis', a: 'Principal only', b: 'Principal + accumulated interest' },
      { label: 'Growth Rate', a: 'Linear (constant amount each period)', b: 'Exponential (accelerates over time)' },
      { label: 'Best For', a: 'Short-term personal loans', b: 'Long-term investments & savings' },
      { label: 'Common Uses', a: 'Car loans, some personal loans', b: 'Savings accounts, mortgages, credit cards' }
    ],
    translations: {
      es: {
        title: 'Interés Simple vs. Interés Compuesto',
        seoTitle: 'Calculadora y Comparación Interés Simple vs Compuesto',
        seoDescription: 'Compare el interés simple y compuesto para visualizar el crecimiento de su dinero. Comprenda el poder de la capitalización en inversiones y préstamos.',
        verdict: 'El interés compuesto es ampliamente superior para invertir, ya que genera intereses sobre intereses. El interés simple resulta más ventajoso al solicitar un crédito (aunque la mayoría de préstamos emplean capitalización compuesta).',
        differences: [
          { label: 'Base de Cálculo', a: 'Solo sobre el capital original', b: 'Capital original + intereses acumulados' },
          { label: 'Tasa de Crecimiento', a: 'Lineal (importe constante por período)', b: 'Exponencial (se acelera en el tiempo)' },
          { label: 'Mejor Para', a: 'Préstamos personales a corto plazo', b: 'Inversiones a largo plazo y cuentas de ahorro' },
          { label: 'Usos Habituales', a: 'Préstamos para automóviles, pagarés', b: 'Fondos indexados, cuentas remuneradas, tarjetas' }
        ]
      },
      fr: {
        title: 'Intérêt Simple vs Intérêt Composé',
        seoTitle: 'Calculateur et Comparatif Intérêt Simple vs Composé',
        seoDescription: 'Comparez les intérêts simples et composés pour observer la croissance de votre capital. Maîtrisez l\'effet boule de neige pour vos placements.',
        verdict: 'L\'intérêt composé est nettement supérieur pour les investissements grâce au réinvestissement systématique des gains. L\'intérêt simple est plus avantageux pour l\'emprunteur lorsqu\'il souscrit un prêt.',
        differences: [
          { label: 'Base de Calcul', a: 'Capital initial uniquement', b: 'Capital initial + intérêts capitalisés' },
          { label: 'Vitesse de Croissance', a: 'Linéaire (montant constant chaque période)', b: 'Exponentielle (s\'accélère avec la durée)' },
          { label: 'Idéal Pour', a: 'Prêts court terme et crédits directs', b: 'Épargne long terme et investissements boursiers' },
          { label: 'Cas d\'Usage Courants', a: 'Crédits auto, prêts personnels simples', b: 'Livrets d\'épargne, assurance-vie, cartes de crédit' }
        ]
      },
      de: {
        title: 'Einfache Zinsen vs. Zinseszinsen',
        seoTitle: 'Einfache Zinsen vs Zinseszins Rechner & Vergleich',
        seoDescription: 'Vergleichen Sie einfache Zinsen und Zinseszinsen. Berechnen Sie das exponentielle Vermögenswachstum und verstehen Sie den Zinseszinseffekt.',
        verdict: 'Zinseszinsen sind bei der Geldanlage unschlagbar, weil erwirtschaftete Erträge erneut Erträge abwerfen. Einfache Zinsen sind hingegen für Kreditnehmer vorteilhafter, da die Zinslast nicht exponentiell ansteigt.',
        differences: [
          { label: 'Berechnungsgrundlage', a: 'Ausschließlich das Anfangskapital', b: 'Anfangskapital + aufgelaufene Zinsen' },
          { label: 'Wachstumsdynamik', a: 'Linear (konstanter Zinsertrag je Periode)', b: 'Exponentiell (beschleunigt sich über die Zeit)' },
          { label: 'Optimal Für', a: 'Kurzfristige Ratenkredite', b: 'Langfristige Geldanlagen, ETF-Sparpläne' },
          { label: 'Typische Anwendung', a: 'Autokredite, Privatdarlehen', b: 'Festgeld, Aktienfonds, Kreditkarten' }
        ]
      }
    }
  },
  {
    slug: 'apr-vs-interest-rate',
    title: 'APR vs. Interest Rate',
    seoTitle: 'APR vs Interest Rate Calculator & Comparison | True Cost of Borrowing',
    seoDescription: 'Understand the difference between APR (Annual Percentage Rate) and Interest Rate. Calculate the true cost of loans and mortgages.',
    toolA: 'apr-calculator',
    toolB: 'interest-rate-calculator',
    verdict: 'Interest rate only tells you the cost of borrowing the principal. APR is the more important metric because it represents the true total cost of the loan, including fees and closing costs.',
    differences: [
      { label: 'What it Measures', a: 'Total cost of borrowing (rate + fees)', b: 'Just the cost of the principal borrowed' },
      { label: 'Includes Fees?', a: 'Yes (origination fees, closing costs, etc.)', b: 'No' },
      { label: 'Value', a: 'Always higher than (or equal to) the interest rate', b: 'Always lower than the APR' },
      { label: 'Best Use', a: 'Comparing multiple loan offers side-by-side', b: 'Calculating monthly principal & interest payments' }
    ],
    translations: {
      es: {
        title: 'APR (TAE) vs. Tasa de Interés Nominal',
        seoTitle: 'Calculadora APR vs Tasa de Interés | Costo Real del Crédito',
        seoDescription: 'Comprenda la diferencia entre APR (Tasa Anual Equivalente) y Tasa de Interés Nominal. Calcule el costo total real de sus préstamos e hipotecas.',
        verdict: 'La tasa de interés solo refleja el costo directo del dinero prestado. El APR es la métrica clave porque incorpora todas las comisiones, gastos de apertura y costos de cierre.',
        differences: [
          { label: 'Qué Mide', a: 'Costo financiero total (intereses + comisiones)', b: 'Únicamente el costo del capital financiado' },
          { label: '¿Incluye Comisiones?', a: 'Sí (apertura, tasación, gastos de cierre)', b: 'No' },
          { label: 'Relación de Valor', a: 'Siempre mayor o igual a la tasa nominal', b: 'Siempre menor o igual al APR' },
          { label: 'Mejor Utilidad', a: 'Comparar diferentes ofertas de préstamo', b: 'Calcular la cuota mensual de amortización' }
        ]
      },
      fr: {
        title: 'TAEG vs Taux d\'Intérêt Nominal',
        seoTitle: 'Calculateur TAEG vs Taux d\'Intérêt | Coût Réel du Crédit',
        seoDescription: 'Découvrez la différence entre le TAEG (Taux Annuel Effectif Global) et le taux débiteur nominal. Évaluez le coût total de votre financement.',
        verdict: 'Le taux nominal n\'indique que la rémunération de la banque sur le capital. Le TAEG est le seul indicateur fiable représentant le coût global du crédit, frais de dossier et assurances inclus.',
        differences: [
          { label: 'Ce qu\'il Mesure', a: 'Coût total du financement (taux + frais + assurance)', b: 'Seulement les intérêts sur le capital prêté' },
          { label: 'Inclut les Frais Annexes ?', a: 'Oui (frais de dossier, garantie, courtage)', b: 'Non' },
          { label: 'Niveau Relatif', a: 'Toujours supérieur ou égal au taux nominal', b: 'Toujours inférieur ou égal au TAEG' },
          { label: 'Meilleure Utilisation', a: 'Comparer les offres concurrentes de prêt', b: 'Calculer la mensualité brute de base' }
        ]
      },
      de: {
        title: 'Effektiver Jahreszins vs. Sollzins (Nominalzins)',
        seoTitle: 'Effektiver Jahreszins vs Sollzins Rechner | Echte Kreditkosten',
        seoDescription: 'Unterschied zwischen Effektivzins und Sollzins einfach erklärt. Berechnen Sie die tatsächlichen Gesamtkosten von Darlehen und Baufinanzierungen.',
        verdict: 'Der Sollzins beziffert nur die reine Verzinsung der Kreditsumme. Der effektive Jahreszins ist die unverzichtbare Kennzahl zum transparenten Vergleich, da er Nebenkosten und Bearbeitungsgebühren beinhaltet.',
        differences: [
          { label: 'Messgröße', a: 'Gesamtkosten des Kredits (Zinsen + Gebühren)', b: 'Reine Darlehensverzinsung ohne Nebenkosten' },
          { label: 'Enthält Nebenkosten?', a: 'Ja (Abschlussgebühren, Disagio, Vermittlung)', b: 'Nein' },
          { label: 'Wertverhältnis', a: 'Stets höher als oder gleich dem Sollzins', b: 'Stets niedriger als oder gleich dem Effektivzins' },
          { label: 'Beste Anwendung', a: 'Vergleich verschiedener Kreditangebote', b: 'Exakte Berechnung der monatlichen Rate' }
        ]
      }
    }
  },
  {
    slug: 'mortgage-vs-rent',
    title: 'Buy vs. Rent a Home',
    seoTitle: 'Buy vs Rent Calculator | Compare Mortgage vs Renting Costs',
    seoDescription: 'Should you buy or rent? Compare the long-term financial impact of taking out a mortgage versus continuing to pay rent.',
    toolA: 'mortgage-calculator',
    toolB: 'rent-calculator',
    verdict: 'Buying builds long-term equity and stabilizes housing costs, making it better for those staying 5+ years. Renting offers flexibility, predictable monthly costs, and no maintenance liabilities.',
    differences: [
      { label: 'Wealth Building', a: 'Builds equity over time', b: 'No equity generated (sunk cost)' },
      { label: 'Upfront Costs', a: 'High (Down payment, closing costs)', b: 'Low (Security deposit)' },
      { label: 'Maintenance', a: 'Homeowner is responsible for all repairs', b: 'Landlord handles maintenance' },
      { label: 'Flexibility', a: 'Low (Harder to move quickly)', b: 'High (Can move at end of lease)' }
    ],
    translations: {
      es: {
        title: 'Comprar vs. Alquilar una Vivienda',
        seoTitle: 'Calculadora Comprar vs Alquilar | Costos Hipoteca vs Renta',
        seoDescription: '¿Conviene comprar o alquilar? Compare el impacto financiero a largo plazo de una hipoteca frente al pago continuado de alquiler.',
        verdict: 'Comprar genera patrimonio neto y estabiliza los costos habitacionales, ideal si prevé residir 5 o más años. Alquilar brinda máxima flexibilidad geográfica y elimina la responsabilidad de reparaciones costosas.',
        differences: [
          { label: 'Creación de Patrimonio', a: 'Acumula plusvalía y capital con cada cuota', b: 'Gasto hundido sin acumulación de activos' },
          { label: 'Inversión Inicial', a: 'Elevada (Enganche, escrituras, notaría)', b: 'Reducida (Depósito de fianza)' },
          { label: 'Mantenimiento', a: 'El propietario asume reparaciones e impuestos', b: 'El arrendador cubre mantenimiento mayor' },
          { label: 'Flexibilidad de Mudanza', a: 'Baja (Vender requiere meses y comisiones)', b: 'Alta (Posibilidad de cambio al vencer contrato)' }
        ]
      },
      fr: {
        title: 'Acheter ou Louer son Logement',
        seoTitle: 'Calculateur Acheter ou Louer | Comparateur Mensualité vs Loyer',
        seoDescription: 'Faut-il acheter ou rester locataire ? Évaluez l\'impact financier à long terme d\'un crédit immobilier comparé au versement de loyers.',
        verdict: 'Acheter permet de se constituer un patrimoine immobilier et de sécuriser son logement sur plus de 5 ans. Louer offre une souplesse financière totale et évite les charges de copropriété et gros travaux.',
        differences: [
          { label: 'Constitution de Capital', a: 'Crée de la valeur nette à chaque remboursement', b: 'Dépense à fonds perdus' },
          { label: 'Apport Initial Requis', a: 'Élevé (Apport personnel, frais de notaire)', b: 'Faible (Dépôt de garantie)' },
          { label: 'Entretien et Travaux', a: 'À la charge exclusive du propriétaire', b: 'Gros travaux assumés par le bailleur' },
          { label: 'Mobilité Géographique', a: 'Faible (Revente complexe à court terme)', b: 'Élevée (Préavis simple de 1 à 3 mois)' }
        ]
      },
      de: {
        title: 'Haus kaufen oder mieten',
        seoTitle: 'Kaufen oder Mieten Rechner | Baufinanzierung vs Mietkosten',
        seoDescription: 'Lohnt sich Eigentum oder Miete? Vergleichen Sie Vermögensaufbau, monatliche Belastung und Nebenkosten beider Wohnmodelle.',
        verdict: 'Kaufen fördert den langfristigen Vermögensaufbau durch Tilgung, besonders bei einem Zeithorizont von über 5 Jahren. Mieten bietet maximale Flexibilität, planbare Kosten und keine Instandhaltungsrisiken.',
        differences: [
          { label: 'Vermögensaufbau', a: 'Baut stetig Eigentum und Sachwert auf', b: 'Reine Konsumausgabe ohne Vermögensbildung' },
          { label: 'Anfangsinvestition', a: 'Hoch (Eigenkapital, Notar, Grunderwerbsteuer)', b: 'Gering (Mietkaution)' },
          { label: 'Instandhaltung', a: 'Eigentümer trägt alle Reparaturkosten', b: 'Vermieter ist für Reparaturen zuständig' },
          { label: 'Ortsflexibilität', a: 'Gering (Verkauf erfordert Zeit und Kosten)', b: 'Hoch (Kündigung mit gesetzlicher Frist)' }
        ]
      }
    }
  },
  {
    slug: 'debt-snowball-vs-avalanche',
    title: 'Debt Snowball vs. Avalanche',
    seoTitle: 'Debt Snowball vs Avalanche Calculator | Best Payoff Strategy',
    seoDescription: 'Compare the debt snowball (smallest balance first) and debt avalanche (highest interest first) payoff strategies to see which saves you more money.',
    toolA: 'debt-payoff-calculator',
    toolB: 'debt-consolidation-calculator',
    verdict: 'The Avalanche method is mathematically superior and saves the most money on interest. However, the Snowball method offers quick psychological wins, which helps many people stay motivated to become debt-free.',
    differences: [
      { label: 'Primary Focus', a: 'Smallest balances first', b: 'Highest interest rates first' },
      { label: 'Interest Paid', a: 'Usually higher total interest paid', b: 'Mathematically minimizes interest paid' },
      { label: 'Psychological Benefit', a: 'High (quick wins by eliminating small debts)', b: 'Lower (can take a long time to clear the first debt)' },
      { label: 'Time to Debt-Free', a: 'Usually takes slightly longer', b: 'The fastest path to zero debt' }
    ],
    translations: {
      es: {
        title: 'Método Bola de Nieve vs. Avalancha de Deudas',
        seoTitle: 'Calculadora Bola de Nieve vs Avalancha | Estrategia Pago Deudas',
        seoDescription: 'Compare las estrategias de bola de nieve (saldos menores primero) y avalancha (interés más alto primero). Ahorre dinero y liquide sus deudas.',
        verdict: 'El método avalancha es matemáticamente óptimo y reduce al mínimo los intereses pagados. La bola de nieve brinda victorias psicológicas rápidas, manteniendo la motivación para liquidar todo.',
        differences: [
          { label: 'Enfoque Principal', a: 'Liquidar primero los saldos más pequeños', b: 'Liquidar primero las deudas con mayor tasa de interés' },
          { label: 'Intereses Totales', a: 'Mayor cantidad total de intereses', b: 'Minimiza al máximo los intereses pagados' },
          { label: 'Impacto Psicológico', a: 'Muy alto (satisfacción de cancelar cuentas rápidamente)', b: 'Moderado (puede tardar en cerrar la primera cuenta)' },
          { label: 'Plazo Total', a: 'Ligeramente más extenso', b: 'La ruta matemáticamente más rápida a cero deudas' }
        ]
      },
      fr: {
        title: 'Méthode Boule de Neige vs Avalanche de Dettes',
        seoTitle: 'Calculateur Boule de Neige vs Avalanche | Stratégie Remboursement',
        seoDescription: 'Comparez la méthode boule de neige (plus petits soldes d\'abord) et avalanche (taux le plus élevé d\'abord). Réduisez vos coûts d\'emprunt.',
        verdict: 'L\'avalanche est la formule mathématiquement optimale qui génère le plus d\'économies d\'intérêts. La boule de neige procure des victoires psychologiques immédiates pour rester rigoureux.',
        differences: [
          { label: 'Ordre de Remboursement', a: 'Les dettes aux montants les plus faibles en premier', b: 'Les dettes aux taux d\'intérêt les plus élevés d\'abord' },
          { label: 'Coût des Intérêts', a: 'Coût total généralement supérieur', b: 'Minimise mathématiquement le coût des intérêts' },
          { label: 'Bénéfice Psychologique', a: 'Élevé (succès rapides en éliminant des créances)', b: 'Plus modéré (première dette parfois longue à solder)' },
          { label: 'Délai d\'Apurement', a: 'Légèrement plus long', b: 'La trajectoire la plus rapide vers le désendettement' }
        ]
      },
      de: {
        title: 'Schuldenschneeball vs. Schuldenlawine',
        seoTitle: 'Schuldenschneeball vs Lawinenmethode Rechner | Schuldenabbau',
        seoDescription: 'Vergleichen Sie die Schneeball-Methode (kleinste Kredite zuerst) mit der Lawinen-Methode (höchste Zinsen zuerst). Finden Sie die beste Tilgungsstrategie.',
        verdict: 'Die Lawinen-Methode ist mathematisch überlegen und spart die meisten Zinskosten. Die Schneeball-Methode bietet dafür schnelle psychologische Erfolge, die beim Durchhalten enorm helfen.',
        differences: [
          { label: 'Tilgungsfokus', a: 'Kleinste Restschuldsummen zuerst tilgen', b: 'Kredite mit den höchsten Zinssätzen zuerst tilgen' },
          { label: 'Gezahlte Zinsen', a: 'Meist etwas höherer Zinsaufwand', b: 'Minimiert die Zinsausgaben rechnerisch optimal' },
          { label: 'Motivationseffekt', a: 'Sehr hoch (schnelle Schließung erster Konten)', b: 'Niedriger (erste Ablösung kann länger dauern)' },
          { label: 'Weg zur Schuldenfreiheit', a: 'Dauert rechnerisch geringfügig länger', b: 'Der absolut schnellste Weg zur Schuldenfreiheit' }
        ]
      }
    }
  },
  {
    slug: 'bmi-vs-body-fat',
    title: 'BMI vs. Body Fat %',
    seoTitle: 'BMI vs Body Fat Percentage Calculator | Health Metrics Compared',
    seoDescription: 'Compare Body Mass Index (BMI) and Body Fat Percentage. Understand which metric provides a better picture of your overall health and fitness.',
    toolA: 'bmi-calculator',
    toolB: 'body-fat-calculator',
    verdict: 'Body Fat Percentage is a much more accurate indicator of metabolic health and fitness. BMI is a useful, quick screening tool for populations but fails to distinguish between muscle mass and fat on an individual basis.',
    differences: [
      { label: 'What it Measures', a: 'Weight relative to height', b: 'Proportion of fat mass to total body weight' },
      { label: 'Accuracy', a: 'Low for muscular individuals', b: 'High (if measured correctly)' },
      { label: 'Data Required', a: 'Just height and weight', b: 'Measurements (neck, waist, etc.) or clinical tools' },
      { label: 'Primary Use', a: 'Broad population screening', b: 'Individual fitness tracking and health assessment' }
    ],
    translations: {
      es: {
        title: 'IMC vs. Porcentaje de Grasa Corporal',
        seoTitle: 'Calculadora IMC vs Grasa Corporal | Métricas de Salud Comparadas',
        seoDescription: 'Compare el Índice de Masa Corporal (IMC) con el Porcentaje de Grasa Corporal. Descubra cuál indicador refleja mejor su estado físico y composición real.',
        verdict: 'El porcentaje de grasa corporal es un biomarcador mucho más preciso de salud metabólica. El IMC es un índice estadístico rápido, pero no discrimina entre masa muscular magra y tejido adiposo.',
        differences: [
          { label: 'Qué Determina', a: 'Relación peso/altura', b: 'Proporción de masa grasa sobre el peso total' },
          { label: 'Precisión Anatómica', a: 'Baja en deportistas y personas musculosas', b: 'Alta (mediante antropometría o bioimpedancia)' },
          { label: 'Datos Requeridos', a: 'Únicamente estatura y peso corporal', b: 'Medidas corporales (cintura, cuello, cadera)' },
          { label: 'Uso Clínico Principal', a: 'Cribado poblacional general', b: 'Seguimiento fitness y valoración nutricional individual' }
        ]
      },
      fr: {
        title: 'IMC vs Pourcentage de Masse Grasse',
        seoTitle: 'Calculateur IMC vs Masse Grasse | Comparatif Santé et Forme',
        seoDescription: 'Comparez l\'Indice de Masse Corporelle (IMC) et le Taux de Graisse Corporelle. Identifiez la mesure la plus fidèle pour évaluer votre forme.',
        verdict: 'Le pourcentage de masse grasse est bien plus représentatif de la santé métabolique et de la composition corporelle. L\'IMC reste un outil de tri rapide mais ignore la masse musculaire.',
        differences: [
          { label: 'Grandeur Mesurée', a: 'Rapport poids / taille au carré', b: 'Proportion de masse adipeuse dans l\'organisme' },
          { label: 'Précision Réelle', a: 'Faible chez les sportifs et profils musclés', b: 'Élevée (via mesures précises ou impédancemétrie)' },
          { label: 'Paramètres Nécessaires', a: 'Poids et taille uniquement', b: 'Mensurations corporelles (taille, cou, hanches)' },
          { label: 'Champ d\'Application', a: 'Dépistage épidémiologique large', b: 'Suivi sportif individuel et bilan diététique' }
        ]
      },
      de: {
        title: 'BMI vs. Körperfettanteil (KFA)',
        seoTitle: 'BMI vs Körperfettanteil Rechner | Gesundheitswerte im Vergleich',
        seoDescription: 'Vergleichen Sie Body-Mass-Index (BMI) und Körperfettanteil. Finden Sie heraus, welcher Messwert Ihre körperliche Fitness verlässlicher widerspiegelt.',
        verdict: 'Der Körperfettanteil ist die deutlich aussagekräftigere Kennzahl für Stoffwechselgesundheit und Fitness. Der BMI dient als grober Richtwert für die Gesamtbevölkerung, unterscheidet aber nicht zwischen Muskel- und Fettgewebe.',
        differences: [
          { label: 'Messgegenstand', a: 'Körpergewicht im Verhältnis zur Körpergröße', b: 'Reiner Fettgewebeanteil am Gesamtgewicht' },
          { label: 'Aussagekraft', a: 'Gering bei Sportlern mit hoher Muskelmasse', b: 'Sehr hoch (bei korrekter Messung)' },
          { label: 'Erforderliche Werte', a: 'Lediglich Körpergröße und Gewicht', b: 'Körperumfänge (Taille, Nacken, Hüfte)' },
          { label: 'Hauptanwendung', a: 'Schnelles Screening großer Bevölkerungsgruppen', b: 'Gezielte Trainingssteuerung und Ernährungsanalyse' }
        ]
      }
    }
  },
  {
    slug: 'personal-vs-business-loan',
    title: 'Personal vs. Business Loan',
    seoTitle: 'Personal vs Business Loan Calculator | Compare Financing Options',
    seoDescription: 'Compare personal loans and business loans. Decide which financing option is right for your startup, expansion, or personal needs.',
    toolA: 'personal-loan-calculator',
    toolB: 'business-loan-calculator',
    verdict: 'Business loans are better for established companies needing larger capital and wanting to protect personal credit. Personal loans are often the only option for brand new startups but put your personal assets on the line.',
    differences: [
      { label: 'Credit Check', a: 'Based purely on personal credit score', b: 'Based on business credit and revenue (plus personal guarantee)' },
      { label: 'Loan Amounts', a: 'Usually capped around $50,000 - $100,000', b: 'Can go up to $5M+ (SBA loans)' },
      { label: 'Approval Speed', a: 'Fast (Often within 24-48 hours)', b: 'Slower (Requires extensive documentation)' },
      { label: 'Liability', a: 'Personal liability', b: 'Business liability (though personal guarantee often required)' }
    ],
    translations: {
      es: {
        title: 'Préstamo Personal vs. Préstamo Comercial',
        seoTitle: 'Calculadora Préstamo Personal vs Comercial | Comparar Financiación',
        seoDescription: 'Compare créditos personales y préstamos para empresas. Elija la opción de financiamiento óptima para su negocio o requerimientos individuales.',
        verdict: 'Los préstamos comerciales convienen a empresas consolidadas que precisan sumas elevadas protegiendo el patrimonio personal. Los préstamos personales son útiles para emprendimientos iniciales pero comprometen bienes propios.',
        differences: [
          { label: 'Evaluación Crediticia', a: 'Basada exclusivamente en historial personal', b: 'Basada en facturación y balance comercial (+ aval personal)' },
          { label: 'Importe Máximo', a: 'Habitualmente hasta $50,000 - $100,000', b: 'Hasta varios millones (fondos corporativos o gubernamentales)' },
          { label: 'Tiempo de Aprobación', a: 'Rápido (normalmente 24 a 48 horas)', b: 'Más pausado (exige estados contables detallados)' },
          { label: 'Responsabilidad Legal', a: 'Patrimonio individual del prestatario', b: 'Sociedad mercantil (con posible fianza de socios)' }
        ]
      },
      fr: {
        title: 'Prêt Personnel vs Prêt Professionnel',
        seoTitle: 'Calculateur Prêt Personnel vs Professionnel | Financement',
        seoDescription: 'Comparez le crédit personnel et l\'emprunt professionnel. Choisissez la meilleure solution de trésorerie pour votre société ou projet individuel.',
        verdict: 'Les prêts professionnels sont parfaits pour les sociétés actives cherchant des capitaux conséquents avec séparation des patrimoines. Le prêt personnel dépanne au lancement mais engage vos fonds personnels.',
        differences: [
          { label: 'Critères d\'Octroi', a: 'Solvabilité et revenus personnels', b: 'Bilans financiers, chiffre d\'affaires (+ caution du dirigeant)' },
          { label: 'Plafonds de Financement', a: 'Généralement limité à 50 000 - 100 000 €', b: 'Plusieurs centaines de milliers voire millions d\'euros' },
          { label: 'Délai d\'Obtention', a: 'Très rapide (souvent 24 à 72 heures)', b: 'Plus long (audit des comptes prévisionnels)' },
          { label: 'Engagement Juridique', a: 'Responsabilité personnelle intégrale', b: 'Responsabilité de la personne morale' }
        ]
      },
      de: {
        title: 'Privatkredit vs. Geschäftskredit',
        seoTitle: 'Privatkredit vs Geschäftskredit Rechner | Finanzierung vergleichen',
        seoDescription: 'Vergleichen Sie Privatkredite und Firmenkredite. Wählen Sie die richtige Finanzierungsform für Ihr Unternehmen oder private Vorhaben.',
        verdict: 'Geschäftskredite sind die beste Wahl für bestehende Unternehmen mit hohem Kapitalbedarf, um privates Vermögen abzuschirmen. Privatkredite finanzieren oft Startups, bürgen jedoch mit privatem Vermögen.',
        differences: [
          { label: 'Bonitätsprüfung', a: 'Rein über Schufa und privates Einkommen', b: 'Über BWA, Jahresabschlüsse und Firmenbonität' },
          { label: 'Darlehenshöhe', a: 'Meist auf 50.000 - 100.000 € begrenzt', b: 'Bis zu mehreren Millionen Euro (z.B. KfW-Mittel)' },
          { label: 'Auszahlungsdauer', a: 'Sehr zügig (oft innerhalb von 24-48 Stunden)', b: 'Umfangreicher Prüfungsprozess' },
          { label: 'Haftungsrisiko', a: 'Volle persönliche Haftung des Kreditnehmers', b: 'Primär Haftung der Gesellschaft' }
        ]
      }
    }
  }
];

export function getComparisonBySlug(slug: string): ComparisonDef | undefined {
  return comparisons.find(c => c.slug === slug);
}
