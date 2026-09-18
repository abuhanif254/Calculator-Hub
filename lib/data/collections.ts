// ═══════════════════════════════════════════════════════
// TOOL COLLECTIONS / BUNDLES
// ═══════════════════════════════════════════════════════
// Curated groups of tools built around specific workflows
// or user personas. Helps users discover related tools that
// they didn't know they needed.
// ═══════════════════════════════════════════════════════

export interface CollectionTranslation {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export interface CollectionDef {
  slug: string;
  title: string;
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  toolSlugs: string[]; // Slugs of calculators or developer tools
  translations?: Record<string, CollectionTranslation>;
}

export const collections: CollectionDef[] = [
  {
    slug: 'real-estate-investor-kit',
    title: 'Real Estate Investor Kit',
    description: 'Everything you need to analyze properties, estimate mortgages, and calculate ROI.',
    icon: 'Home',
    seoTitle: 'Real Estate Investor Calculators & Tools | Nexus Calculator',
    seoDescription: 'A curated bundle of calculators for real estate investors: mortgages, ROI, cap rates, rental yield, and depreciation.',
    toolSlugs: [
      'mortgage-calculator',
      'rental-property-calculator',
      'real-estate-calculator',
      'irr-calculator',
      'depreciation-calculator',
      'house-affordability-calculator'
    ],
    translations: {
      es: {
        title: 'Kit para Inversionistas de Bienes Raíces',
        description: 'Todo lo que necesita para analizar inmuebles, estimar hipotecas y calcular el ROI de sus inversiones.',
        seoTitle: 'Calculadoras para Inversionistas Inmobiliarios | Nexus Calculator',
        seoDescription: 'Herramientas esenciales para inversores en bienes raíces: cálculo de hipotecas, rentabilidad por alquiler, tasa de capitalización y amortización.'
      },
      fr: {
        title: 'Kit Investisseur Immobilier',
        description: 'Tous les outils nécessaires pour analyser les biens, simuler vos crédits et calculer le rendement locatif.',
        seoTitle: 'Calculateurs pour Investisseurs Immobiliers | Nexus Calculator',
        seoDescription: 'Pack d\'outils d\'analyse immobilière : simulation de prêt, calcul de rentabilité locative, taux de capitalisation et cash-flow.'
      },
      de: {
        title: 'Immobilien-Investor-Toolkit',
        description: 'Alles, was Sie zur Immobilienbewertung, Baufinanzierung und Renditeberechnung (ROI) benötigen.',
        seoTitle: 'Rechner für Immobilien-Investoren | Nexus Calculator',
        seoDescription: 'Kompakte Sammlung von Immobilienrechnern: Mietrendite, Tilgungspläne, Cashflow-Analysen und steuerliche Abschreibung.'
      }
    }
  },
  {
    slug: 'developer-starter-pack',
    title: 'Developer Starter Pack',
    description: 'Essential utilities for software engineers, from formatting JSON to subnetting IPs.',
    icon: 'Terminal',
    seoTitle: 'Developer Tools Starter Pack | Nexus Calculator',
    seoDescription: 'Essential utilities for software engineers: JSON formatters, diff checkers, subnet calculators, and secure password generators.',
    toolSlugs: [
      'json-formatter',
      'html-formatter',
      'diff-checker',
      'subnet-calculator',
      'password-generator',
      'conversion-calculator',
      'html-css-js-playground'
    ],
    translations: {
      es: {
        title: 'Kit de Inicio para Desarrolladores',
        description: 'Utilidades esenciales para ingenieros de software, desde formateo de JSON hasta cálculo de subredes IP.',
        seoTitle: 'Herramientas Básicas para Desarrolladores | Nexus Calculator',
        seoDescription: 'Colección indispensable para programadores: formateador JSON, comprobador de diferencias diff, calculadora de subredes y generador de contraseñas.'
      },
      fr: {
        title: 'Pack de Démarrage Développeur',
        description: 'Utilitaires essentiels pour les développeurs, du formatage JSON au calcul de sous-réseaux IP.',
        seoTitle: 'Outils Essentiels pour Développeurs | Nexus Calculator',
        seoDescription: 'Boîte à outils indispensables pour ingénieurs logiciel : formateur JSON, comparateur de code diff, calculatrice IP et mots de passe sécurisés.'
      },
      de: {
        title: 'Entwickler-Starterpaket',
        description: 'Wichtige Dienstprogramme für Softwareentwickler, von der JSON-Formatierung bis zur Subnetz-Berechnung.',
        seoTitle: 'Entwickler-Tools Starterpaket | Nexus Calculator',
        seoDescription: 'Praktische Web-Tools für Programmierer: JSON-Formatter, Diff-Checker, IP-Subnetzrechner und sichere Passwortgeneratoren.'
      }
    }
  },
  {
    slug: 'debt-freedom-plan',
    title: 'Debt Freedom Planner',
    description: 'Tools to help you consolidate debt, calculate payoffs, and plan your journey to zero balance.',
    icon: 'TrendingDown',
    seoTitle: 'Debt Payoff & Consolidation Calculators | Nexus Calculator',
    seoDescription: 'Plan your journey to debt freedom with our suite of payoff calculators for credit cards, auto loans, and personal debt.',
    toolSlugs: [
      'debt-payoff-calculator',
      'debt-consolidation-calculator',
      'credit-cards-payoff',
      'student-loan-calculator',
      'personal-loan-calculator',
      'budget-calculator'
    ],
    translations: {
      es: {
        title: 'Planificador de Libertad de Deudas',
        description: 'Herramientas para consolidar deudas, calcular amortizaciones aceleradas y alcanzar un saldo cero.',
        seoTitle: 'Calculadoras de Pago y Consolidación de Deudas | Nexus Calculator',
        seoDescription: 'Trace su ruta hacia la libertad financiera con calculadoras para tarjetas de crédito, préstamos personales y créditos vehiculares.'
      },
      fr: {
        title: 'Planificateur de Libération des Dettes',
        description: 'Outils pratiques pour regrouper vos crédits, simuler des remboursements anticipés et solder vos dettes.',
        seoTitle: 'Calculateurs de Désendettement et Rachat de Crédit | Nexus Calculator',
        seoDescription: 'Organisez l\'apurement de vos emprunts avec nos simulateurs pour cartes de crédit, prêts auto et crédits à la consommation.'
      },
      de: {
        title: 'Schuldenfreiheits-Planer',
        description: 'Werkzeuge zur Kreditkonsolidierung, vorzeitigen Tilgung und schrittweisen Erreichung der Schuldenfreiheit.',
        seoTitle: 'Schuldentilgung & Umschuldung Rechner | Nexus Calculator',
        seoDescription: 'Planen Sie Ihren Weg aus den Schulden mit Spezialrechnern für Kreditkarten, Ratenkredite und Konsolidierungsdarlehen.'
      }
    }
  },
  {
    slug: 'fitness-transformation',
    title: 'Fitness Transformation Kit',
    description: 'Track your macros, analyze body composition, and plan your physical transformation.',
    icon: 'Activity',
    seoTitle: 'Fitness & Health Calculator Bundle | Nexus Calculator',
    seoDescription: 'A comprehensive bundle of health calculators to track your BMI, BMR, body fat percentage, and daily caloric needs.',
    toolSlugs: [
      'bmi-calculator',
      'bmr-calculator',
      'calorie-calculator',
      'body-fat-calculator',
      'ideal-weight-calculator',
      'healthy-weight-calculator',
      'pace-calculator'
    ],
    translations: {
      es: {
        title: 'Kit de Transformación Fitness',
        description: 'Controle sus macronutrientes, analice su composición corporal y planifique sus objetivos físicos.',
        seoTitle: 'Calculadoras de Fitness y Salud | Nexus Calculator',
        seoDescription: 'Conjunto completo de calculadoras corporales: IMC, metabolismo basal BMR, porcentaje de grasa y gasto calórico diario.'
      },
      fr: {
        title: 'Kit Transformation Fitness et Santé',
        description: 'Suivez vos macronutriments, évaluez votre masse grasse et planifiez vos objectifs d\'entraînement.',
        seoTitle: 'Pack Calculateurs Santé et Fitness | Nexus Calculator',
        seoDescription: 'Ensemble complet d\'outils physiologiques : calcul de l\'IMC, métabolisme de base (BMR), pourcentage de graisse et besoin calorique.'
      },
      de: {
        title: 'Fitness-Transformationspaket',
        description: 'Erfassen Sie Makronährstoffe, analysieren Sie Ihre Körperzusammensetzung und steuern Sie Ihre Trainingsziele.',
        seoTitle: 'Fitness- & Gesundheitsrechner Bundle | Nexus Calculator',
        seoDescription: 'Umfassendes Set an Gesundheitsrechnern: BMI, Grundumsatz (BMR), Körperfettanteil und täglicher Kalorienbedarf.'
      }
    }
  },
  {
    slug: 'home-buyer-toolkit',
    title: 'Home Buyer\'s Toolkit',
    description: 'Calculate affordability, compare loan types, and estimate down payments to buy your dream home confidently.',
    icon: 'Key',
    seoTitle: 'Home Buying Calculators & Toolkit | Nexus Calculator',
    seoDescription: 'A complete toolkit for homebuyers. Calculate mortgage payments, home affordability, down payments, FHA loans, and HELOC options.',
    toolSlugs: [
      'mortgage-calculator',
      'house-affordability-calculator',
      'down-payment-calculator',
      'fha-loan-calculator',
      'va-mortgage-calculator',
      'heloc-calculator',
      'mortgage-amortization-calculator',
      'rent-vs-buy-calculator'
    ],
    translations: {
      es: {
        title: 'Kit para Compradores de Vivienda',
        description: 'Calcule su capacidad de compra, compare hipotecas y estime enganches para adquirir su vivienda con seguridad.',
        seoTitle: 'Calculadoras para Comprar Casa | Nexus Calculator',
        seoDescription: 'Caja de herramientas para futuros propietarios: cuota hipotecaria, capacidad de endeudamiento, enganches y comparación compra vs renta.'
      },
      fr: {
        title: 'Boîte à Outils Achat Immobilier',
        description: 'Évaluez votre capacité d\'emprunt, comparez les formules de crédit et préparez votre apport personnel.',
        seoTitle: 'Calculateurs pour l\'Achat d\'un Logement | Nexus Calculator',
        seoDescription: 'Le kit parfait pour les futurs acquéreurs : mensualité de prêt, capacité d\'achat, apport initial et simulateur acheter ou louer.'
      },
      de: {
        title: 'Toolkit für Hauskäufer',
        description: 'Kaufpreis-Budget berechnen, Zinskonditionen vergleichen und benötigtes Eigenkapital für den Immobilienkauf planen.',
        seoTitle: 'Rechner für den Immobilienkauf | Nexus Calculator',
        seoDescription: 'Umfassendes Set für Immobilienkäufer: Monatsraten-Kalkulation, Tragbarkeitsprüfung, Eigenkapitalbedarf und Mieten-oder-Kaufen-Vergleich.'
      }
    }
  },
  {
    slug: 'retirement-planning-suite',
    title: 'Retirement Planning Suite',
    description: 'Project your nest egg, calculate RMDs, and estimate Social Security benefits for a secure future.',
    icon: 'Umbrella',
    seoTitle: 'Retirement Planning Calculators | 401(k), IRA & RMDs | Nexus Calculator',
    seoDescription: 'Plan your retirement with our suite of tools covering 401(k) growth, Roth IRA contributions, RMD calculations, and Social Security benefits.',
    toolSlugs: [
      'retirement-calculator',
      'roth-ira-calculator',
      '401k-calculator',
      'rmd-calculator',
      'social-security-calculator',
      'annuity-payout-calculator'
    ],
    translations: {
      es: {
        title: 'Suite de Planificación de Jubilación',
        description: 'Proyecte su fondo de retiro, calcule distribuciones mínimas y estime sus pensiones para un futuro estable.',
        seoTitle: 'Calculadoras de Planificación para el Retiro | Nexus Calculator',
        seoDescription: 'Planifique su jubilación con calculadoras para planes 401(k), cuentas Roth IRA, pensiones de seguridad social y rentas vitalicias.'
      },
      fr: {
        title: 'Suite de Préparation à la Retraite',
        description: 'Anticipez votre épargne retraite, estimez vos rentes et évaluez vos droits pour garantir votre avenir.',
        seoTitle: 'Calculateurs de Préparation à la Retraite | Nexus Calculator',
        seoDescription: 'Simulateurs d\'épargne retraite : projection du capital accumulé, versements programmés, pensions et rentes viagères.'
      },
      de: {
        title: 'Ruhestandsplanungs-Suite',
        description: 'Berechnen Sie Ihr Altersvorsorgekapital, Rentenlücken und Auszahlpläne für einen finanziell sorgenfreien Ruhestand.',
        seoTitle: 'Rechner zur Ruhestandsplanung | Nexus Calculator',
        seoDescription: 'Strategische Vorsorgerechner: Altersvorsorge-Simulation, Zinseszins-Vermögensaufbau, gesetzliche Rente und lebenslange Entnahmepläne.'
      }
    }
  },
  {
    slug: 'student-finance-pack',
    title: 'Student Finance Pack',
    description: 'Manage student loans, calculate GPAs, and build a student budget effectively.',
    icon: 'GraduationCap',
    seoTitle: 'Student Calculators: GPA, Loans & College Costs | Nexus Calculator',
    seoDescription: 'Financial and academic tools for students. Calculate GPA, estimate college costs, plan student loan payoffs, and manage your budget.',
    toolSlugs: [
      'student-loan-calculator',
      'gpa-calculator',
      'grade-calculator',
      'budget-calculator',
      'college-cost-calculator',
      'salary-calculator'
    ],
    translations: {
      es: {
        title: 'Paquete Financiero y Académico Estudiantil',
        description: 'Gestione préstamos educativos, calcule su promedio de calificaciones y administre su presupuesto universitario.',
        seoTitle: 'Calculadoras para Estudiantes: Promedios y Costos | Nexus Calculator',
        seoDescription: 'Herramientas académicas y de finanzas para universitarios: promedio GPA, amortización de créditos estudiantiles y presupuesto.'
      },
      fr: {
        title: 'Pack Finance et Études Supérieures',
        description: 'Gérez vos prêts étudiants, calculez vos moyennes académiques et maîtrisez votre budget de scolarité.',
        seoTitle: 'Calculateurs pour Étudiants : Prêts et Moyennes | Nexus Calculator',
        seoDescription: 'Outils scolaires et budgétaires pour étudiants : remboursement de prêt étudiant, calcul de moyenne (GPA) et coût des études.'
      },
      de: {
        title: 'Studenten-Finanzpaket',
        description: 'Studienkredite managen, Notendurchschnitte berechnen und ein solides Studentenbudget erstellen.',
        seoTitle: 'Rechner für Studenten: BAföG, Kredite & Noten | Nexus Calculator',
        seoDescription: 'Akademische und finanzielle Rechner für das Studium: Notendurchschnitt (GPA), Tilgung von Bildungskrediten und Lebenshaltungsbudget.'
      }
    }
  },
  {
    slug: 'crypto-investor-tools',
    title: 'Tax & Investment Tools',
    description: 'Analyze capital gains, calculate compound interest, and factor in inflation for your investments.',
    icon: 'LineChart',
    seoTitle: 'Investment & Capital Gains Calculators | Nexus Calculator',
    seoDescription: 'Track and forecast investment returns. Calculate capital gains, compound interest, average returns, and adjust for inflation over time.',
    toolSlugs: [
      'investment-calculator',
      'compound-interest-calculator',
      'average-return-calculator',
      'inflation-calculator',
      'capital-gains-calculator'
    ],
    translations: {
      es: {
        title: 'Herramientas de Inversión y Ganancias de Capital',
        description: 'Calcule ganancias de capital, visualice el interés compuesto y descuente la inflación en sus activos.',
        seoTitle: 'Calculadoras de Inversión y Rentabilidad | Nexus Calculator',
        seoDescription: 'Proyecte rendimientos financieros: impuestos sobre ganancias de capital, tasa de interés compuesto, rendimiento promedio y efecto inflacionario.'
      },
      fr: {
        title: 'Outils d\'Investissement et Plus-Values',
        description: 'Analysez vos gains financiers, simulez les intérêts composés et ajustez vos rendements selon l\'inflation.',
        seoTitle: 'Calculateurs d\'Investissement et Plus-Values | Nexus Calculator',
        seoDescription: 'Optimisez vos placements : calcul de plus-values mobilières, capitalisation des intérêts composés, rendement moyen et inflation.'
      },
      de: {
        title: 'Steuer- & Anlagetools für Investoren',
        description: 'Kapitalertragsteuer ermitteln, Zinseszins simulieren und Inflationsauswirkungen auf Ihr Portfolio prognostizieren.',
        seoTitle: 'Investment- & Kapitalertragsrechner | Nexus Calculator',
        seoDescription: 'Finanzrechner für Anleger: Kapitalertragsteuern, Zinseszinsentwicklung, Portfoliorendite und inflationsbereinigtes Wachstum.'
      }
    }
  },
  {
    slug: 'developer-security-pack',
    title: 'Developer Security Pack',
    description: 'Generate hashes, decode JWTs, and create strong passwords securely in your browser.',
    icon: 'Shield',
    seoTitle: 'Security Tools for Developers: Hash & Password Generators | Nexus Calculator',
    seoDescription: 'A suite of security tools for developers. Generate MD5/SHA256 hashes, create HMACs, decode JWT tokens, and generate strong passwords locally.',
    toolSlugs: [
      'hash-generator',
      'hmac-generator',
      'sha256-generator',
      'md5-generator',
      'password-generator',
      'strong-password-generator',
      'jwt-decoder'
    ],
    translations: {
      es: {
        title: 'Paquete de Seguridad para Desarrolladores',
        description: 'Genere hashes criptográficos, decodifique tokens JWT y cree contraseñas seguras directamente en su navegador.',
        seoTitle: 'Herramientas de Seguridad Web: Generadores de Hash y Claves | Nexus Calculator',
        seoDescription: 'Suite de ciberseguridad para programadores: generadores MD5/SHA256, cálculo de HMAC, decodificador JWT y contraseñas de alta entropía.'
      },
      fr: {
        title: 'Pack Sécurité pour Développeurs',
        description: 'Générez des empreintes cryptographiques, décodez des jetons JWT et créez des mots de passe robustes en local.',
        seoTitle: 'Outils de Sécurité Web Développeur : Hash et Mots de Passe | Nexus Calculator',
        seoDescription: 'Outils cryptographiques gratuits : calcul de hash MD5 et SHA256, signature HMAC, décodage de tokens JWT et générateur de mots de passe.'
      },
      de: {
        title: 'Entwickler-Sicherheitspaket',
        description: 'Kryptografische Hashes erzeugen, JWT-Tokens dekodieren und extrem sichere Passwörter lokal im Browser generieren.',
        seoTitle: 'Sicherheits-Tools für Entwickler: Hashes & Passwort-Generatoren | Nexus Calculator',
        seoDescription: 'Kryptografie-Suite für Programmierer: MD5- und SHA256-Generatoren, HMAC-Berechnung, JWT-Decoder und Zufallspasswort-Erstellung.'
      }
    }
  }
];

export function getCollectionBySlug(slug: string): CollectionDef | undefined {
  return collections.find(c => c.slug === slug);
}
