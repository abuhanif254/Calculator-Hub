// ═══════════════════════════════════════════════════════════════════════
// lib/data/programmaticPresets.ts
// Central registry of high-volume programmatic SEO (pSEO) presets.
// These preset calculators target high-intent long-tail keywords
// (e.g., "used car loan calculator", "15 year mortgage calculator")
// powered by our proven parent calculation engines.
// ═══════════════════════════════════════════════════════════════════════

import { CalculatorDef } from "../types";

export const programmaticPresets: CalculatorDef[] = [
  // ─── 1. AUTO & VEHICLE FINANCING ─────────────────────────────────────
  {
    slug: "used-car-loan-calculator",
    parentSlug: "auto-loan-calculator",
    slugs: {
      en: "used-car-loan-calculator",
      es: "calculadora-de-prestamos-de-autos-usados",
      fr: "calculatrice-de-pret-auto-d-occasion",
      de: "gebrauchtwagen-kreditrechner",
    },
    title: "Used Car Loan Calculator",
    category: "Financial",
    description: "Calculate monthly payments, total interest, and payoff schedule for a used car or pre-owned vehicle loan.",
    meta: {
      title: "Used Car Loan Calculator – Monthly Payments & Interest (2026)",
      description: "Estimate monthly payments for used and certified pre-owned vehicles. Includes customized interest rates, loan terms, down payments, and total financing costs.",
      keywords: "used car loan calculator, pre owned auto loan, used vehicle financing, car payment estimator, used car interest rate",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Préstamos de Autos Usados",
        description: "Calcula pagos mensuales, intereses totales y calendario de amortización para préstamos de vehículos usados.",
        meta: {
          title: "Calculadora de Préstamos de Autos Usados – Cuotas y Amortización",
          description: "Calcula la cuota mensual para financiar un auto usado. Ajusta tasa de interés, plazo, enganche y compara el costo total.",
          keywords: "calculadora prestamo auto usado, financiamiento autos usados, calcular cuota auto, credito automotriz usado",
        },
      },
      fr: {
        title: "Calculatrice de Prêt Auto d'Occasion",
        description: "Calculez vos mensualités, le total des intérêts et le tableau d'amortissement pour l'achat d'un véhicule d'occasion.",
        meta: {
          title: "Calculatrice de Prêt Auto d'Occasion – Mensualités & Taux",
          description: "Estimez les mensualités de votre crédit automobile pour un véhicule d'occasion. Personnalisez l'apport, la durée et le taux.",
          keywords: "calculatrice pret auto occasion, credit voiture occasion, mensualite pret auto occasion, simulateur pret vehicule",
        },
      },
      de: {
        title: "Gebrauchtwagen-Kreditrechner",
        description: "Berechnen Sie monatliche Raten, Gesamtzinsen und Tilgungsplan für Ihren Gebrauchtwagenkredit.",
        meta: {
          title: "Gebrauchtwagen Kreditrechner – Monatliche Raten & Zinsen",
          description: "Ermitteln Sie die monatliche Kreditrate für Ihren Gebrauchtwagenkauf. Passen Sie Anzahlung, Laufzeit und Zinssatz an.",
          keywords: "gebrauchtwagen kreditrechner, autofinanzierung gebrauchtwagen, kfz kredit rechner, gebrauchtwagen monatsrate berechnen",
        },
      },
    },
    defaultValues: {
      vehiclePrice: 18500,
      downPayment: 2500,
      loanTerm: 48,
      interestRate: 7.49,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "new-car-loan-calculator",
    parentSlug: "auto-loan-calculator",
    slugs: {
      en: "new-car-loan-calculator",
      es: "calculadora-de-prestamos-de-autos-nuevos",
      fr: "calculatrice-de-pret-auto-neuve",
      de: "neuwagen-kreditrechner",
    },
    title: "New Car Loan Calculator",
    category: "Financial",
    description: "Calculate monthly auto loan payments for new car purchases with manufacturer financing rates and trade-in value.",
    meta: {
      title: "New Car Loan Calculator – Monthly Auto Loan Payment Estimator",
      description: "Calculate monthly payments and total interest for new car purchases. Compare 48, 60, and 72-month terms at competitive auto loan APRs.",
      keywords: "new car loan calculator, new vehicle financing, auto loan rates, car payment calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Préstamos de Autos Nuevos",
        description: "Calcula las cuotas mensuales de préstamos para autos nuevos con tasas del concesionario y valor de intercambio.",
        meta: {
          title: "Calculadora de Préstamos para Autos Nuevos – Simulador de Cuotas",
          description: "Estima los pagos mensuales e intereses totales para la compra de un vehículo nuevo con opciones de 48, 60 y 72 meses.",
          keywords: "calculadora auto nuevo, prestamo coche nuevo, financiamiento vehiculo nuevo, cuota auto nuevo",
        },
      },
      fr: {
        title: "Calculatrice de Prêt Auto Neuve",
        description: "Calculez les mensualités de votre crédit auto pour l'achat d'un véhicule neuf avec options de reprise et taux concessionnaire.",
        meta: {
          title: "Calculatrice de Prêt Auto Neuve – Simulateur de Financement",
          description: "Calculez vos mensualités et le coût total de crédit pour l'achat d'une voiture neuve. Comparez les durées de 48, 60 et 72 mois.",
          keywords: "calculatrice pret auto neuve, credit voiture neuve, mensualite auto neuve, simulateur pret auto",
        },
      },
      de: {
        title: "Neuwagen-Kreditrechner",
        description: "Berechnen Sie monatliche Raten für Neuwagenfinanzierungen mit Händlerkonditionen und Inzahlungnahme.",
        meta: {
          title: "Neuwagen Kreditrechner – Raten & Gesamtkosten Berechnen",
          description: "Berechnen Sie monatliche Raten und Gesamtzinsen für Neuwagen. Vergleichen Sie Laufzeiten von 48, 60 und 72 Monaten.",
          keywords: "neuwagen kreditrechner, autofinanzierung neuwagen, kfz kredit neuwagen, autokredit rechner",
        },
      },
    },
    defaultValues: {
      vehiclePrice: 44500,
      downPayment: 6000,
      loanTerm: 60,
      interestRate: 5.25,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "motorcycle-loan-calculator",
    parentSlug: "auto-loan-calculator",
    slugs: {
      en: "motorcycle-loan-calculator",
      es: "calculadora-de-prestamos-de-motos",
      fr: "calculatrice-de-pret-moto",
      de: "motorrad-kreditrechner",
    },
    title: "Motorcycle Loan Calculator",
    category: "Financial",
    description: "Estimate monthly payments, interest charges, and loan amortization for street, cruiser, and touring motorcycles.",
    meta: {
      title: "Motorcycle Loan Calculator – Bike Financing & Payment Estimator",
      description: "Calculate monthly payments on new and used motorcycles. Factor in down payments, bike loan interest rates, and loan terms.",
      keywords: "motorcycle loan calculator, bike financing, motorcycle payment estimator, powersports loan",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Préstamos para Motos",
        description: "Calcula los pagos mensuales y costos de financiamiento para motos deportivas, de turismo o crucero.",
        meta: {
          title: "Calculadora de Préstamos para Motos – Cuotas Mensuales",
          description: "Calcula las mensualidades y el costo total de financiamiento para comprar una motocicleta nueva o usada.",
          keywords: "calculadora prestamo moto, financiamiento de motocicletas, credito para motos",
        },
      },
      fr: {
        title: "Calculatrice de Prêt Moto",
        description: "Estimez vos mensualités et le coût total de financement pour une moto neuve ou d'occasion.",
        meta: {
          title: "Calculatrice de Prêt Moto – Mensualités & Amortissement",
          description: "Simulez facilement votre crédit moto. Calculez les mensualités, les intérêts et la durée optimale.",
          keywords: "calculatrice pret moto, credit moto, simulation pret scooter moto, mensualite credit moto",
        },
      },
      de: {
        title: "Motorrad-Kreditrechner",
        description: "Berechnen Sie monatliche Raten und Finanzierungskosten für neue und gebrauchte Motorräder.",
        meta: {
          title: "Motorrad Kreditrechner – Raten & Finanzierung Berechnen",
          description: "Monatliche Rate und Gesamtzinsen für Ihren Motorradkredit berechnen. Passen Sie Anzahlung und Laufzeit an.",
          keywords: "motorrad kreditrechner, motorrad finanzierung rechner, bike kredit, motorrad monatsrate",
        },
      },
    },
    defaultValues: {
      vehiclePrice: 12000,
      downPayment: 2000,
      loanTerm: 36,
      interestRate: 8.25,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "rv-loan-calculator",
    parentSlug: "auto-loan-calculator",
    slugs: {
      en: "rv-loan-calculator",
      es: "calculadora-de-prestamos-para-casas-rodantes",
      fr: "calculatrice-de-pret-camping-car",
      de: "wohnmobil-kreditrechner",
    },
    title: "RV Loan Calculator",
    category: "Financial",
    description: "Calculate monthly payments, interest outlay, and financing terms for recreational vehicles, campers, and motorhomes.",
    meta: {
      title: "RV Loan Calculator – Motorhome & Camper Financing Estimator",
      description: "Estimate monthly financing payments for RVs, camper vans, travel trailers, and motorhomes with extended 10 to 15-year loan terms.",
      keywords: "rv loan calculator, motorhome financing, camper loan calculator, recreational vehicle loan",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Préstamos para Casas Rodantes",
        description: "Calcula pagos mensuales para casas rodantes, autocaravanas y remolques de viaje con plazos de hasta 15 o 20 años.",
        meta: {
          title: "Calculadora de Préstamos para Casas Rodantes y Autocaravanas",
          description: "Simula el financiamiento a largo plazo para casas rodantes y autocaravanas con plazos de 10 a 20 años.",
          keywords: "prestamo casa rodante, financiamiento autocaravana, credito motorhome",
        },
      },
      fr: {
        title: "Calculatrice de Prêt Camping-Car",
        description: "Calculez les mensualités de financement pour camping-car, caravane ou fourgon aménagé sur des durées jusqu'à 15 ans.",
        meta: {
          title: "Calculatrice de Prêt Camping-Car – Simulateur de Crédit",
          description: "Estimez le coût de financement de votre camping-car ou van aménagé avec calendrier d'amortissement détaillé.",
          keywords: "pret camping car, credit camping car, simulateur pret van amenage, financement caravane",
        },
      },
      de: {
        title: "Wohnmobil-Kreditrechner",
        description: "Berechnen Sie Raten und Gesamtkosten für Wohnmobile, Caravans und Campingbusse mit langen Laufzeiten.",
        meta: {
          title: "Wohnmobil Kreditrechner – Finanzierung & Raten Berechnen",
          description: "Kreditraten und Zinskosten für Wohnmobile und Wohnwagen berechnen. Laufzeiten bis zu 180 Monaten.",
          keywords: "wohnmobil kreditrechner, camper finanzierung, wohnwagen kredit, caravan darlehen",
        },
      },
    },
    defaultValues: {
      vehiclePrice: 75000,
      downPayment: 15000,
      loanTerm: 120,
      interestRate: 7.99,
    },
    fields: [],
    logicModule: "financial",
  },

  // ─── 2. MORTGAGES & REAL ESTATE ──────────────────────────────────────
  {
    slug: "15-year-mortgage-calculator",
    parentSlug: "mortgage-calculator",
    slugs: {
      en: "15-year-mortgage-calculator",
      es: "calculadora-de-hipoteca-a-15-anos",
      fr: "calculatrice-hypothecaire-15-ans",
      de: "15-jahre-hypothekenrechner",
    },
    title: "15-Year Mortgage Calculator",
    category: "Financial",
    description: "Compare 15-year fixed mortgage payments against 30-year loans and discover how much interest you save by paying off your home in half the time.",
    meta: {
      title: "15-Year Mortgage Calculator – Estimate Monthly Payments & Savings",
      description: "Calculate your monthly payment on a 15-year fixed-rate mortgage. See interest savings compared to a 30-year mortgage with full amortization.",
      keywords: "15 year mortgage calculator, 15 yr fixed mortgage, mortgage payoff, home loan calculator 15 years",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Hipoteca a 15 Años",
        description: "Calcula los pagos mensuales y el ahorro masivo en intereses de una hipoteca de tasa fija a 15 años frente a una a 30 años.",
        meta: {
          title: "Calculadora de Hipoteca a 15 Años – Cuotas y Ahorro en Intereses",
          description: "Calcula tu cuota mensual en una hipoteca a 15 años y descubre cuánto puedes ahorrar en intereses frente a un préstamo a 30 años.",
          keywords: "hipoteca 15 anos, calcular hipoteca 15 anos, amortizacion 15 anos, cuota hipotecaria fija",
        },
      },
      fr: {
        title: "Calculatrice d'Hypothèque sur 15 Ans",
        description: "Calculez vos mensualités et découvrez l'économie importante d'intérêts sur un prêt immobilier sur 15 ans.",
        meta: {
          title: "Calculatrice de Prêt Immobilier sur 15 Ans – Mensualités & Coût",
          description: "Simulez votre prêt immobilier sur 15 ans. Calculez les mensualités, le coût total du crédit et le tableau d'amortissement.",
          keywords: "pret immobilier 15 ans, credit immobilier 15 ans, simulation pret 15 ans, mensualite pret 15 ans",
        },
      },
      de: {
        title: "15-Jahre-Hypothekenrechner",
        description: "Berechnen Sie Raten und Zinsersparnisse für eine 15-jährige Baufinanzierung im Vergleich zu längeren Laufzeiten.",
        meta: {
          title: "15-Jahre Hypothekenrechner – Baufinanzierung mit 15 Jahren Laufzeit",
          description: "Ermitteln Sie Monatsrate und Zinsersparnis bei einer 15-jährigen Zinsbindung oder Volltilgung Ihrer Baufinanzierung.",
          keywords: "15 jahre hypothekenrechner, baufinanzierung 15 jahre, immobiliendarlehen 15 jahre, tilgungsrechner 15 jahre",
        },
      },
    },
    defaultValues: {
      homePrice: 400000,
      downPayment: 80000,
      loanTerm: 15,
      interestRate: 5.75,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "30-year-mortgage-calculator",
    parentSlug: "mortgage-calculator",
    slugs: {
      en: "30-year-mortgage-calculator",
      es: "calculadora-de-hipoteca-a-30-anos",
      fr: "calculatrice-hypothecaire-30-ans",
      de: "30-jahre-hypothekenrechner",
    },
    title: "30-Year Mortgage Calculator",
    category: "Financial",
    description: "Calculate monthly principal and interest payments for a standard 30-year fixed-rate conventional or jumbo mortgage.",
    meta: {
      title: "30-Year Mortgage Calculator – Monthly Payment & Amortization",
      description: "Estimate monthly payments on a 30-year fixed mortgage. Includes breakdown of principal, interest, taxes, insurance, and lifetime interest costs.",
      keywords: "30 year mortgage calculator, 30 year fixed mortgage payment, home loan payment calculator, amortization schedule",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Hipoteca a 30 Años",
        description: "Calcula los pagos mensuales, intereses totales y amortización para hipotecas estándar a 30 años.",
        meta: {
          title: "Calculadora de Hipoteca a 30 Años – Cuota Mensual y Desglose",
          description: "Calcula la cuota mensual de una hipoteca fija a 30 años con desglose de capital, intereses y tabla de amortización completa.",
          keywords: "hipoteca 30 anos, calculadora hipoteca 30 anos, simulador hipoteca 30 anos",
        },
      },
      fr: {
        title: "Calculatrice d'Hypothèque sur 30 Ans",
        description: "Estimez les mensualités et le coût des intérêts pour un emprunt immobilier à long terme sur 30 ans.",
        meta: {
          title: "Calculatrice de Prêt Immobilier sur 30 Ans – Mensualités",
          description: "Calculez vos mensualités sur un prêt immobilier de 30 ans et visualisez la répartition entre capital et intérêts.",
          keywords: "pret immobilier 30 ans, credit immobilier 30 ans, mensualite emprunt 30 ans",
        },
      },
      de: {
        title: "30-Jahre-Hypothekenrechner",
        description: "Berechnen Sie monatliche Raten und Tilgungsverlauf für langfristige Baufinanzierungen über 30 Jahre.",
        meta: {
          title: "30-Jahre Hypothekenrechner – Langfristige Baufinanzierung",
          description: "Ermitteln Sie Monatsraten und Zinskosten für 30-jährige Immobiliendarlehen mit detailliertem Tilgungsplan.",
          keywords: "30 jahre hypothekenrechner, baufinanzierung 30 jahre, immobiliendarlehen tilgungsplan",
        },
      },
    },
    defaultValues: {
      homePrice: 425000,
      downPayment: 85000,
      loanTerm: 30,
      interestRate: 6.50,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "jumbo-mortgage-calculator",
    parentSlug: "mortgage-calculator",
    slugs: {
      en: "jumbo-mortgage-calculator",
      es: "calculadora-de-hipotecas-jumbo",
      fr: "calculatrice-hypothecaire-jumbo",
      de: "jumbo-hypothekenrechner",
    },
    title: "Jumbo Mortgage Calculator",
    category: "Financial",
    description: "Calculate monthly payments and borrowing requirements for non-conforming jumbo mortgages exceeding FHFA conventional loan limits.",
    meta: {
      title: "Jumbo Mortgage Calculator – Non-Conforming Home Loan Estimator",
      description: "Estimate monthly payments for luxury and high-value real estate financing exceeding conventional conforming limits with competitive jumbo rates.",
      keywords: "jumbo mortgage calculator, jumbo loan calculator, non conforming mortgage, high balance mortgage payment",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Préstamos Jumbo",
        description: "Calcula pagos para préstamos hipotecarios que exceden los límites conformes estándar para propiedades de alto valor.",
        meta: {
          title: "Calculadora de Préstamos Hipotecarios Jumbo – Propiedades de Lujo",
          description: "Simula hipotecas no conformes y préstamos jumbo de alto valor con requisitos de enganche y tasas competitivas.",
          keywords: "prestamo jumbo, hipoteca jumbo, credito hipotecario alto valor",
        },
      },
      fr: {
        title: "Calculatrice de Prêt Immobilier Jumbo",
        description: "Calculez les mensualités pour les prêts immobiliers de montant élevé dépassant les plafonds conventionnels.",
        meta: {
          title: "Calculatrice de Prêt Immobilier Jumbo – Biens de Prestige",
          description: "Estimez les mensualités et le coût d'emprunt pour les biens immobiliers de grande valeur et financements haut de gamme.",
          keywords: "pret immobilier jumbo, emprunt haut de gamme, credit immobilier prestige",
        },
      },
      de: {
        title: "Jumbo-Hypothekenrechner",
        description: "Berechnen Sie Raten und Finanzierungsstrukturen für großvolumige Immobiliendarlehen und Luxusimmobilien.",
        meta: {
          title: "Jumbo Hypothekenrechner – Großkredite für Luxusimmobilien",
          description: "Ratenberechnung für hochvolumige Baufinanzierungen oberhalb der Standardgrenzen mit Tilgungsanalyse.",
          keywords: "jumbo darlehen rechner, grosskredit immobilien, luxusimmobilien finanzierung",
        },
      },
    },
    defaultValues: {
      homePrice: 950000,
      downPayment: 190000,
      loanTerm: 30,
      interestRate: 6.875,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "va-loan-calculator",
    parentSlug: "mortgage-calculator",
    slugs: {
      en: "va-loan-calculator",
      es: "calculadora-de-prestamos-va",
      fr: "calculatrice-de-pret-va",
      de: "va-darlehensrechner",
    },
    title: "VA Mortgage Calculator",
    category: "Financial",
    description: "Calculate zero-down monthly mortgage payments for US military service members, veterans, and surviving spouses with 0% PMI.",
    meta: {
      title: "VA Loan Calculator – 0% Down Military & Veteran Mortgage Estimator",
      description: "Calculate VA mortgage payments with 0% down payment, no private mortgage insurance (PMI), and competitive government-backed rates.",
      keywords: "va loan calculator, va mortgage payment, veteran home loan calculator, 0 down mortgage",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Préstamos VA para Veteranos",
        description: "Calcula pagos hipotecarios respaldados por el Departamento de Asuntos de Veteranos con opción de $0 de enganche y sin PMI.",
        meta: {
          title: "Calculadora de Préstamos Hipotecarios VA – 0% de Enganche",
          description: "Calcula cuotas hipotecarias para veteranos y personal militar activo sin seguro hipotecario privado (PMI).",
          keywords: "prestamo va, hipoteca veteranos, prestamo militar sin enganche",
        },
      },
      fr: {
        title: "Calculatrice de Prêt VA pour Anciens Combattants",
        description: "Simulateur de prêt immobilier garanti pour vétérans et militaires avec financement sans apport initial.",
        meta: {
          title: "Calculatrice de Prêt Immobilier Militaire & Vétérans (VA)",
          description: "Calculez les mensualités de prêt immobilier pour militaires et vétérans sans assurance de prêt requise.",
          keywords: "pret va veterans, credit militaire, pret sans apport militaire",
        },
      },
      de: {
        title: "VA-Kreditrechner für Veteranen",
        description: "Hypothekenrechner für Veteranen und Streitkräfteangehörige mit 0% Eigenkapital und günstigen Sonderkonditionen.",
        meta: {
          title: "VA-Hypothekenrechner – Kredite für Veteranen & Soldaten",
          description: "Berechnen Sie zinsgünstige Darlehen für Veteranen und Militärangehörige ohne Eigenkapitalanforderung.",
          keywords: "va kreditrechner, veteranen darlehen, militaerkredit rechner",
        },
      },
    },
    defaultValues: {
      homePrice: 380000,
      downPayment: 0,
      loanTerm: 30,
      interestRate: 6.25,
    },
    fields: [],
    logicModule: "financial",
  },

  // ─── 3. COMPOUND INTEREST & WEALTH ───────────────────────────────────
  {
    slug: "s-and-p-500-calculator",
    parentSlug: "compound-interest-calculator",
    slugs: {
      en: "s-and-p-500-calculator",
      es: "calculadora-de-rendimiento-sp500",
      fr: "calculatrice-de-rendement-sp500",
      de: "sp500-renditerechner",
    },
    title: "S&P 500 Return Calculator",
    category: "Financial",
    description: "Simulate compound returns from investing in an S&P 500 index fund using historical average nominal market growth rates.",
    meta: {
      title: "S&P 500 Return Calculator – Historical Market Compound Growth",
      description: "Estimate your future wealth by investing in an S&P 500 index fund with regular monthly contributions and historical 10% average annual returns.",
      keywords: "s&p 500 calculator, sp 500 return calculator, index fund compound interest, stock market return calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Rendimiento S&P 500",
        description: "Proyecta el crecimiento de tu inversión basado en el rendimiento histórico promedio del 10% del índice S&P 500.",
        meta: {
          title: "Calculadora de Rendimiento S&P 500 – Crecimiento Compuesto",
          description: "Calcula cuánto crecerá tu dinero invirtiendo en el S&P 500 con aportes mensuales y reinversión de dividendos.",
          keywords: "calculadora sp500, rendimiento sp500, invertir en sp500, interes compuesto sp500",
        },
      },
      fr: {
        title: "Calculatrice de Rendement S&P 500",
        description: "Projetez la croissance de vos investissements boursiers selon le rendement historique moyen de 10% du S&P 500.",
        meta: {
          title: "Calculatrice S&P 500 – Simulation d'Investissement & Intérêts Composés",
          description: "Estimez vos gains futurs sur l'indice S&P 500 avec versements mensuels et intérêts composés.",
          keywords: "calculateur sp500, rendement sp500, investissement sp500, simulation etf sp500",
        },
      },
      de: {
        title: "S&P 500 Rendite-Rechner",
        description: "Prognostizieren Sie Ihr Vermögenswachstum basierend auf der historischen Durchschnittsrendite von ca. 10% p.a. des S&P 500.",
        meta: {
          title: "S&P 500 Rendite-Rechner – ETF & Zinseszins Berechnen",
          description: "Berechnen Sie den langfristigen Vermögensaufbau mit einem S&P 500 ETF-Sparplan und Zinseszinseffekt.",
          keywords: "sp 500 renditerechner, etf sparplan rechner sp 500, sp500 zinseszins, sp500 historische rendite",
        },
      },
    },
    defaultValues: {
      principal: 10000,
      monthlyContribution: 500,
      interestRate: 10.0,
      years: 20,
      frequency: 12,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "dividend-reinvestment-calculator",
    parentSlug: "compound-interest-calculator",
    slugs: {
      en: "dividend-reinvestment-calculator",
      es: "calculadora-de-reinversion-de-dividendos",
      fr: "calculatrice-de-reinvestissement-des-dividendes",
      de: "dividenden-reinvestitionsrechner",
    },
    title: "Dividend Reinvestment (DRIP) Calculator",
    category: "Financial",
    description: "Calculate the compounding snowball effect of reinvesting corporate dividends (DRIP) into additional dividend-paying shares.",
    meta: {
      title: "Dividend Reinvestment (DRIP) Calculator – Compound Growth",
      description: "Project the compounding power of dividend reinvestment plans (DRIP). See your portfolio snowball over 5, 10, 20, and 30 years.",
      keywords: "dividend reinvestment calculator, drip calculator, dividend compounding calculator, passive income calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Reinversión de Dividendos (DRIP)",
        description: "Simula el efecto de la reinversión automática de dividendos en acciones de dividendos crecientes a lo largo del tiempo.",
        meta: {
          title: "Calculadora de Reinversión de Dividendos (DRIP) – Crecimiento Compuesto",
          description: "Calcula los ingresos pasivos y el crecimiento de capital al reinvertir dividendos automáticamente en tus acciones y ETFs.",
          keywords: "calculadora dividendos, reinversion de dividendos, calculadora drip, ingresos por dividendos",
        },
      },
      fr: {
        title: "Calculatrice de Réinvestissement des Dividendes (DRIP)",
        description: "Mesurez la puissance de la capitalisation en réinvestissant automatiquement vos dividendes dans votre portefeuille d'actions.",
        meta: {
          title: "Calculatrice de Dividendes Réinvestis (DRIP) – Simulation d'Épargne",
          description: "Calculez la croissance de vos dividendes et l'accumulation de capital grâce à l'effet multiplicateur du réinvestissement automatique.",
          keywords: "calculateur dividendes reinvestis, plan drip, simulation dividendes, portefeuille a dividendes",
        },
      },
      de: {
        title: "Dividenden-Reinvestitionsrechner (DRIP)",
        description: "Veranschaulichen Sie das exponentielle Wachstum durch die automatische Wiederanlage von Dividenden (DRIP-Strategie).",
        meta: {
          title: "Dividenden Reinvestitionsrechner – DRIP Zinseszinseffekt",
          description: "Berechnen Sie passives Einkommen und Vermögenswachstum durch die automatische Wiederanlage von Aktiendividenden.",
          keywords: "dividenden reinvestieren rechner, drip rechner, dividendenwachstum berechnen, aktien dividenden reinvestition",
        },
      },
    },
    defaultValues: {
      principal: 25000,
      monthlyContribution: 300,
      interestRate: 7.5,
      years: 15,
      frequency: 12,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "high-yield-savings-calculator",
    parentSlug: "compound-interest-calculator",
    slugs: {
      en: "high-yield-savings-calculator",
      es: "calculadora-de-cuenta-de-ahorros-de-alto-rendimiento",
      fr: "calculatrice-de-compte-d-epargne-a-haut-rendement",
      de: "tagesgeld-zinsrechner",
    },
    title: "High-Yield Savings Account (HYSA) Calculator",
    category: "Financial",
    description: "Calculate daily and monthly compound interest earned on your emergency fund or cash reserves in a high-yield savings account.",
    meta: {
      title: "High-Yield Savings (HYSA) Calculator – APY Compound Interest",
      description: "Calculate compound interest on cash in a high-yield savings account. See how monthly deposits grow with 4% to 5% APY interest rates.",
      keywords: "high yield savings calculator, hysa calculator, high interest savings account, apy interest calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Cuenta de Ahorros de Alto Rendimiento (HYSA)",
        description: "Calcula los intereses acumulados con tasas APY de alto rendimiento en comparación con cuentas bancarias tradicionales.",
        meta: {
          title: "Calculadora de Cuenta de Ahorros de Alto Rendimiento – Intereses y APY",
          description: "Calcula cuánto dinero ganarás en una cuenta de ahorros con intereses de alto rendimiento y aportes mensuales continuos.",
          keywords: "calculadora cuenta ahorro, cuenta alto rendimiento, calcular intereses ahorro, interes compuesto hysa",
        },
      },
      fr: {
        title: "Calculatrice de Compte d'Épargne à Haut Rendement",
        description: "Calculez les intérêts perçus sur un compte d'épargne rémunéré ou livret bancaire à fort rendement.",
        meta: {
          title: "Calculatrice de Compte d'Épargne Rémunéré – Intérêts Composés",
          description: "Estimez vos gains d'intérêts sur un livret d'épargne ou compte à terme avec versements réguliers.",
          keywords: "calculateur epargne haut rendement, livret bancaire interets, calcul interets composes epargne",
        },
      },
      de: {
        title: "Tagesgeldrechner mit Hohen Zinsen",
        description: "Berechnen Sie Ihre Zinserträge auf einem gut verzinsten Tagesgeldkonto mit monatlichen Zinsgutschriften.",
        meta: {
          title: "Tagesgeldrechner – Zinserträge & Zinseszins Berechnen",
          description: "Ermitteln Sie die Zinsen Ihres Tagesgeldkontos mit Sparplanfunktion und Zinseszinseffekt.",
          keywords: "tagesgeldrechner, zinsrechner tagesgeld, tagesgeld zinsen berechnen, tagesgeld sparplan",
        },
      },
    },
    defaultValues: {
      principal: 15000,
      monthlyContribution: 300,
      interestRate: 4.5,
      years: 5,
      frequency: 12,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "certificate-of-deposit-calculator",
    parentSlug: "compound-interest-calculator",
    slugs: {
      en: "certificate-of-deposit-calculator",
      es: "calculadora-de-certificado-de-deposito",
      fr: "calculatrice-de-certificat-de-depot",
      de: "festgeld-rechner",
    },
    title: "Certificate of Deposit (CD) Calculator",
    category: "Financial",
    description: "Calculate the exact maturity value and total interest earned on fixed-rate bank and credit union certificates of deposit.",
    meta: {
      title: "Certificate of Deposit (CD) Calculator – Interest & Maturity",
      description: "Calculate guaranteed earnings on bank CD terms from 6 months to 5 years. Find total interest earned upon certificate maturity.",
      keywords: "cd calculator, certificate of deposit calculator, bank cd rates, cd maturity value calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Depósitos a Plazo Fijo (CD)",
        description: "Calcula el retorno garantizado al vencimiento de un certificado de depósito a plazo fijo.",
        meta: {
          title: "Calculadora de Depósitos a Plazo Fijo (CD) – Intereses Ganados",
          description: "Calcula el rendimiento exacto y los intereses generados por tus certificados de depósito a plazo fijo garantizado.",
          keywords: "calculadora certificado de deposito, intereses plazo fijo, rendimiento cd bancario",
        },
      },
      fr: {
        title: "Calculatrice de Rendement de Dépôt à Terme",
        description: "Calculez le rendement garanti à l'échéance de votre compte à terme ou certificat de dépôt.",
        meta: {
          title: "Calculatrice de Compte à Terme (CAT) – Intérêts Garantis",
          description: "Simulez les intérêts acquis sur votre compte à terme (CAT) selon la durée et le taux fixe convenu.",
          keywords: "calculateur compte a terme, rendement depot a terme, interets garantis cat",
        },
      },
      de: {
        title: "Festgeld-Zinsrechner",
        description: "Berechnen Sie den garantierten Endbetrag und Zinsertrag Ihrer Festgeldanlage über die gewählte Laufzeit.",
        meta: {
          title: "Festgeldrechner – Zinsen & Ertrag bei Fälligkeit",
          description: "Ermitteln Sie Ihren garantierten Zinsgewinn für Festgeldanlagen mit festen Laufzeiten und Zinsgutschriften.",
          keywords: "festgeld rechner, festgeld zinsen berechnen, zinsertrag festgeldanlage, festgeldkonto vergleich",
        },
      },
    },
    defaultValues: {
      principal: 10000,
      monthlyContribution: 0,
      interestRate: 4.8,
      years: 3,
      frequency: 12,
    },
    fields: [],
    logicModule: "financial",
  },

  // ─── 4. SALARY & WAGES ───────────────────────────────────────────────
  {
    slug: "hourly-to-salary-calculator",
    parentSlug: "salary-calculator",
    slugs: {
      en: "hourly-to-salary-calculator",
      es: "calculadora-de-salario-por-hora-a-anual",
      fr: "calculatrice-de-salaire-horaire-en-annuel",
      de: "stundenlohn-in-jahresgehalt-rechner",
    },
    title: "Hourly to Salary Calculator",
    category: "Financial",
    description: "Convert your hourly wage into annual salary, monthly pay, biweekly paychecks, and daily earnings based on weekly working hours.",
    meta: {
      title: "Hourly to Salary Calculator – Convert Hourly Pay to Annual Income",
      description: "Convert your hourly wage to annual salary. Calculate daily, weekly, biweekly, and monthly earnings with custom hours and vacation time.",
      keywords: "hourly to salary calculator, wage converter, hourly rate to annual salary, paycheck calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Pago por Hora a Salario Anual",
        description: "Convierte tu tarifa por hora a ingresos anuales, mensuales, quincenales y semanales equivalentes.",
        meta: {
          title: "Calculadora de Sueldo por Hora a Salario Anual – Conversión de Ingresos",
          description: "Convierte cualquier tarifa horaria en salario anual equivalente considerando 40 horas semanales y horas extra.",
          keywords: "calculadora hora a salario anual, convertir tarifa por hora a sueldo, calcular ingreso anual",
        },
      },
      fr: {
        title: "Calculateur de Salaire Horaire en Salaire Annuel",
        description: "Convertissez votre taux horaire en salaire annuel, mensuel et hebdomadaire équivalent.",
        meta: {
          title: "Calculateur Salaire Horaire en Salaire Annuel – Conversion Rapide",
          description: "Convertissez facilement un taux horaire brut en salaire annuel et mensuel sur la base de 35h ou 40h par semaine.",
          keywords: "taux horaire en salaire annuel, convertir salaire horaire, calcul salaire annuel",
        },
      },
      de: {
        title: "Stundenlohn in Jahresgehalt Rechner",
        description: "Wandeln Sie Ihren Stundenlohn in das entsprechende Jahres-, Monats- und Wochengehalt um.",
        meta: {
          title: "Stundenlohn in Jahresgehalt Rechner – Schnelle Umrechnung",
          description: "Berechnen Sie Ihr Jahresbrutto und Monatsgehalt aus Ihrem Stundenlohn basierend auf Ihren Wochenstunden.",
          keywords: "stundenlohn in jahresgehalt, stundenlohn umrechnen jahresgehalt, gehalt berechnen aus stundenlohn",
        },
      },
    },
    defaultValues: {
      amount: 30,
      period: "hourly",
      hoursPerWeek: 40,
      daysPerWeek: 5,
      unpaidWeeks: 0,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "salary-to-hourly-calculator",
    parentSlug: "salary-calculator",
    slugs: {
      en: "salary-to-hourly-calculator",
      es: "calculadora-de-salario-anual-a-por-hora",
      fr: "calculatrice-de-salaire-annuel-en-horaire",
      de: "jahresgehalt-in-stundenlohn-rechner",
    },
    title: "Salary to Hourly Calculator",
    category: "Financial",
    description: "Convert an annual salary offer into an equivalent hourly wage, daily rate, and weekly compensation package.",
    meta: {
      title: "Salary to Hourly Calculator – Convert Annual Salary to Hourly Rate",
      description: "Find out how much you make per hour based on your annual salary. Accurately calculates hourly rate for 40-hour workweeks.",
      keywords: "salary to hourly calculator, convert salary to hourly, annual to hourly wage, salary rate calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Salario Anual a Tarifa por Hora",
        description: "Calcula exactamente cuánto ganas por hora a partir de tu salario anual o sueldo mensual.",
        meta: {
          title: "Calculadora de Salario Anual a Tarifa por Hora – ¿Cuánto ganas por hora?",
          description: "Descubre tu tarifa por hora real dividiendo tu salario anual entre las semanas trabajadas y horas por semana.",
          keywords: "salario anual a hora, convertir sueldo a tarifa horaria, cuanto gano por hora",
        },
      },
      fr: {
        title: "Calculateur de Salaire Annuel en Taux Horaire",
        description: "Déterminez votre taux horaire exact à partir de votre salaire annuel ou rémunération mensuelle brute.",
        meta: {
          title: "Calculateur Salaire Annuel en Taux Horaire – Votre Valeur par Heure",
          description: "Découvrez votre salaire horaire précis en convertissant votre rémunération annuelle brute.",
          keywords: "salaire annuel en horaire, convertir salaire en taux horaire, taux horaire salaire brut",
        },
      },
      de: {
        title: "Jahresgehalt in Stundenlohn Rechner",
        description: "Ermitteln Sie Ihren genauen Stundenlohn aus Ihrem jährlichen Bruttogehalt und Ihrer wöchentlichen Arbeitszeit.",
        meta: {
          title: "Jahresgehalt in Stundenlohn Rechner – Was verdienen Sie pro Stunde?",
          description: "Berechnen Sie Ihren echten Stundenlohn aus Ihrem Jahresgehalt bei 35, 38,5 oder 40 Stunden pro Woche.",
          keywords: "jahresgehalt in stundenlohn, stundenlohn aus gehalt berechnen, bruttogehalt umrechnen stunde",
        },
      },
    },
    defaultValues: {
      amount: 65000,
      period: "annually",
      hoursPerWeek: 40,
      daysPerWeek: 5,
      unpaidWeeks: 0,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "biweekly-salary-calculator",
    parentSlug: "salary-calculator",
    slugs: {
      en: "biweekly-salary-calculator",
      es: "calculadora-de-salario-quincenal",
      fr: "calculatrice-de-salaire-bihebdomadaire",
      de: "zweiwochentliches-gehalt-rechner",
    },
    title: "Biweekly Paycheck Calculator",
    category: "Financial",
    description: "Calculate your gross biweekly paycheck (26 pay periods per year) from an annual salary or hourly compensation.",
    meta: {
      title: "Biweekly Paycheck Calculator – Calculate Biweekly Income",
      description: "Calculate your biweekly take-home and gross pay across 26 pay periods per year. Free online paycheck converter.",
      keywords: "biweekly salary calculator, biweekly paycheck calculator, 26 pay periods salary, gross paycheck calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Sueldo Quincenal",
        description: "Calcula tus ingresos netos y desglose de pago para nóminas con frecuencia de pago quincenal (26 períodos al año).",
        meta: {
          title: "Calculadora de Pago Quincenal – Estimador de Sueldo Neto",
          description: "Calcula cuánto recibirás en cada cheque quincenal con base en tu salario anual o tarifa horaria.",
          keywords: "calculadora sueldo quincenal, pago cada dos semanas, estimar cheque quincenal",
        },
      },
      fr: {
        title: "Calculateur de Salaire Bimensuel",
        description: "Estimez le montant net de chaque versement de paie effectué toutes les deux semaines (26 périodes par an).",
        meta: {
          title: "Calculateur de Salaire Bimensuel – Simulation de Paie",
          description: "Calculez le montant perçu sur chaque fiche de paie pour les rémunérations versées toutes les deux semaines.",
          keywords: "salaire bimensuel, calcul paie toutes les deux semaines, simulateur salaire quinzaine",
        },
      },
      de: {
        title: "Zweiwöchentlicher Gehaltsrechner",
        description: "Berechnen Sie Ihr Auszahlungsgehalt bei 14-tägiger bzw. zweiwöchentlicher Auszahlung (26 Abrechnungszeiträume).",
        meta: {
          title: "Zweiwöchentlicher Gehaltsrechner – Auszahlung alle 2 Wochen",
          description: "Ermitteln Sie Ihr Gehalt pro Auszahlungszyklus bei zweiwöchentlicher Lohnabrechnung.",
          keywords: "zweiwoechentlicher gehaltsrechner, auszahlung alle zwei wochen, 26 gehaltsperioden rechner",
        },
      },
    },
    defaultValues: {
      amount: 72000,
      period: "annually",
      hoursPerWeek: 40,
      daysPerWeek: 5,
      unpaidWeeks: 0,
    },
    fields: [],
    logicModule: "financial",
  },

  // ─── 5. BODY METRICS & HEALTH ────────────────────────────────────────
  {
    slug: "bmi-calculator-for-men",
    parentSlug: "bmi-calculator",
    slugs: {
      en: "bmi-calculator-for-men",
      es: "calculadora-de-imc-para-hombres",
      fr: "calculatrice-imc-pour-hommes",
      de: "bmi-rechner-fur-manner",
    },
    title: "BMI Calculator for Men",
    category: "Health & Fitness",
    description: "Calculate Body Mass Index (BMI) specifically calibrated for adult men with age-adjusted health classifications and optimal weight targets.",
    meta: {
      title: "BMI Calculator for Men – Body Mass Index & Healthy Weight",
      description: "Calculate Body Mass Index for adult men. See if your weight is in the healthy range, underweight, overweight, or obese.",
      keywords: "bmi calculator for men, male bmi calculator, healthy bmi for men, male weight chart",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de IMC para Hombres",
        description: "Calcula el índice de masa corporal específico para hombres considerando contextura muscular, estatura y peso.",
        meta: {
          title: "Calculadora de IMC para Hombres – Tablas y Rangos de Salud",
          description: "Calcula tu Índice de Masa Corporal (IMC) masculino y conoce tu peso ideal y clasificación según la OMS.",
          keywords: "imc hombres, calculadora imc para hombres, indice masa corporal masculino",
        },
      },
      fr: {
        title: "Calculateur d'IMC pour Hommes",
        description: "Calculez l'indice de masse corporelle pour hommes avec courbes d'évaluation et fourchettes de poids recommandées.",
        meta: {
          title: "Calculateur d'IMC pour Hommes – Poids Idéal Masculin",
          description: "Évaluez votre corpulence masculine grâce au calcul d'IMC adapté aux hommes avec recommandations de santé.",
          keywords: "imc homme, calculateur imc masculin, indice de masse corporelle homme",
        },
      },
      de: {
        title: "BMI-Rechner für Männer",
        description: "Berechnen Sie den Body-Mass-Index speziell für Männer mit Berücksichtigung von Muskelmasse und Körperbau.",
        meta: {
          title: "BMI-Rechner für Männer – Idealgewicht & Bewertungskategorien",
          description: "Ermitteln Sie Ihren BMI als Mann mit Alterseinstufung, Idealgewichtsbereich und WHO-Richtwerten.",
          keywords: "bmi rechner maenner, body mass index mann, idealgewicht maenner berechnen",
        },
      },
    },
    defaultValues: {
      gender: "male",
      heightCm: 178,
      weightKg: 79,
      age: 30,
    },
    fields: [],
    logicModule: "health",
  },
  {
    slug: "bmi-calculator-for-women",
    parentSlug: "bmi-calculator",
    slugs: {
      en: "bmi-calculator-for-women",
      es: "calculadora-de-imc-para-mujeres",
      fr: "calculatrice-imc-pour-femmes",
      de: "bmi-rechner-fur-frauen",
    },
    title: "BMI Calculator for Women",
    category: "Health & Fitness",
    description: "Calculate Body Mass Index (BMI) tailored for adult women with body composition benchmarks and healthy weight ranges.",
    meta: {
      title: "BMI Calculator for Women – Female Body Mass Index & Health Chart",
      description: "Free online BMI calculator for adult women. Discover your BMI classification, healthy weight targets, and body mass benchmarks.",
      keywords: "bmi calculator for women, female bmi calculator, healthy weight for women, female bmi chart",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de IMC para Mujeres",
        description: "Calcula el índice de masa corporal para mujeres con rangos de peso saludable y composición corporal.",
        meta: {
          title: "Calculadora de IMC para Mujeres – Rangos de Peso Saludable",
          description: "Calcula tu IMC femenino de forma precisa y conoce tu rango de peso saludable de acuerdo con los estándares de salud.",
          keywords: "imc mujeres, calculadora imc para mujeres, peso ideal mujer",
        },
      },
      fr: {
        title: "Calculateur d'IMC pour Femmes",
        description: "Calculez votre indice de masse corporelle féminin avec seuils de santé et poids de forme recommandé.",
        meta: {
          title: "Calculateur d'IMC pour Femmes – Poids Santé Féminin",
          description: "Calculez l'IMC féminin et accédez aux recommandations de poids santé personnalisées pour femmes.",
          keywords: "imc femme, calculateur imc pour femmes, indice masse corporelle femme",
        },
      },
      de: {
        title: "BMI-Rechner für Frauen",
        description: "Berechnen Sie den Body-Mass-Index speziell für Frauen mit altersgerechten Tabellen und Wohlfühlgewicht.",
        meta: {
          title: "BMI-Rechner für Frauen – Idealgewicht & Altersangepasste Tabellen",
          description: "Ermitteln Sie Ihren Body-Mass-Index als Frau mit individueller Gewichtsanalyse und gesunden Richtwerten.",
          keywords: "bmi rechner frauen, body mass index frau, idealgewicht frauen berechnen",
        },
      },
    },
    defaultValues: {
      gender: "female",
      heightCm: 163,
      weightKg: 63,
      age: 30,
    },
    fields: [],
    logicModule: "health",
  },

  // ─── 6. MATH & PERCENTAGES ───────────────────────────────────────────
  {
    slug: "percentage-increase-calculator",
    parentSlug: "percentage-calculator",
    slugs: {
      en: "percentage-increase-calculator",
      es: "calculadora-de-aumento-porcentual",
      fr: "calculatrice-d-augmentation-en-pourcentage",
      de: "prozentuale-steigerung-rechner",
    },
    title: "Percentage Increase Calculator",
    category: "Math",
    description: "Calculate the exact percentage increase from an initial starting value to a higher final value with step-by-step math formulas.",
    meta: {
      title: "Percentage Increase Calculator – Calculate Growth & Percent Change",
      description: "Easily compute the percentage increase between two numbers. Formula: ((New Value - Old Value) / Old Value) x 100%.",
      keywords: "percentage increase calculator, percent growth calculator, calculate percentage rise, percent difference increase",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Incremento Porcentual",
        description: "Calcula el porcentaje de aumento entre dos números paso a paso con explicación detallada.",
        meta: {
          title: "Calculadora de Incremento Porcentual – Calcular Subida de Porcentaje",
          description: "Calcula rápidamente el porcentaje de aumento o crecimiento entre un valor inicial y uno final.",
          keywords: "calculadora incremento porcentual, calcular porcentaje de aumento, variacion porcentual positiva",
        },
      },
      fr: {
        title: "Calculatrice d'Augmentation en Pourcentage",
        description: "Calculez le taux de hausse ou d'augmentation en pourcentage entre deux valeurs avec détail du calcul.",
        meta: {
          title: "Calculatrice d'Augmentation en Pourcentage – Taux d'Évolution Positif",
          description: "Déterminez instantanément le pourcentage d'augmentation entre une valeur initiale et finale.",
          keywords: "calculer pourcentage augmentation, taux d evolution, calcul hausse pourcentage",
        },
      },
      de: {
        title: "Prozentualer Anstiegsrechner",
        description: "Berechnen Sie den prozentualen Anstieg zwischen zwei Werten mit schrittweiser Lösungsformel.",
        meta: {
          title: "Prozentualer Anstiegsrechner – Prozentuale Zunahme Berechnen",
          description: "Ermitteln Sie blitzschnell den prozentualen Zuwachs von einem Ausgangswert zu einem Endwert.",
          keywords: "prozentualer anstieg berechnen, prozentuale zunahme rechner, steigerung in prozent",
        },
      },
    },
    defaultValues: {
      c3X: "100",
      c3Y: "140",
    },
    fields: [],
    logicModule: "math",
  },
  {
    slug: "percentage-decrease-calculator",
    parentSlug: "percentage-calculator",
    slugs: {
      en: "percentage-decrease-calculator",
      es: "calculadora-de-disminucion-porcentual",
      fr: "calculatrice-de-diminution-en-pourcentage",
      de: "prozentuale-abnahme-rechner",
    },
    title: "Percentage Decrease Calculator",
    category: "Math",
    description: "Calculate percentage drop, discount reduction, or percent loss between two numeric values with formula explanations.",
    meta: {
      title: "Percentage Decrease Calculator – Percent Drop & Markdown",
      description: "Calculate percentage decrease between two numbers. Ideal for sales discounts, weight loss percentages, and price drops.",
      keywords: "percentage decrease calculator, percent drop calculator, calculate percent reduction, discount calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Reducción Porcentual",
        description: "Calcula el porcentaje de caída o disminución entre un valor inicial y un valor final.",
        meta: {
          title: "Calculadora de Reducción Porcentual – Calcular Descuento y Caída",
          description: "Calcula la disminución porcentual o el porcentaje de rebaja entre dos cantidades de manera inmediata.",
          keywords: "calculadora reduccion porcentual, calcular disminucion porcentaje, porcentaje de bajada",
        },
      },
      fr: {
        title: "Calculatrice de Diminution en Pourcentage",
        description: "Calculez le pourcentage de baisse, de réduction ou de rabais entre deux valeurs.",
        meta: {
          title: "Calculatrice de Diminution en Pourcentage – Taux de Baisse",
          description: "Calculez la baisse en pourcentage entre deux chiffres rapidement avec explication de la formule.",
          keywords: "calculer pourcentage diminution, calcul baisse pourcentage, pourcentage de rabais",
        },
      },
      de: {
        title: "Prozentualer Verringerungsrechner",
        description: "Berechnen Sie den prozentualen Rückgang oder Rabatt zwischen zwei Werten mit Formelerklärung.",
        meta: {
          title: "Prozentualer Verringerungsrechner – Prozentuale Abnahme Berechnen",
          description: "Ermitteln Sie die prozentuale Senkung oder Minderung von einem Ausgangswert zu einem Endwert.",
          keywords: "prozentuale abnahme berechnen, rueckgang in prozent rechner, verminderung prozent",
        },
      },
    },
    defaultValues: {
      c3X: "200",
      c3Y: "150",
    },
    fields: [],
    logicModule: "math",
  },
  {
    slug: "percentage-difference-calculator",
    parentSlug: "percentage-calculator",
    slugs: {
      en: "percentage-difference-calculator",
      es: "calculadora-de-diferencia-porcentual",
      fr: "calculatrice-de-difference-en-pourcentage",
      de: "prozentuale-differenz-rechner",
    },
    title: "Percentage Difference Calculator",
    category: "Math",
    description: "Calculate the relative percentage difference between two independent numbers when neither is the primary baseline.",
    meta: {
      title: "Percentage Difference Calculator – Compare Two Values",
      description: "Calculate the absolute percentage difference between two positive numbers divided by their average value.",
      keywords: "percentage difference calculator, relative difference calculator, percent difference formula, compare two numbers",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Diferencia Porcentual",
        description: "Calcula la diferencia relativa en porcentaje entre dos valores cuando no existe un orden cronológico.",
        meta: {
          title: "Calculadora de Diferencia Porcentual – Comparar Dos Valores",
          description: "Calcula la diferencia porcentual absoluta entre dos números dividida por su promedio.",
          keywords: "calculadora diferencia porcentual, comparar dos numeros en porcentaje, formula diferencia porcentual",
        },
      },
      fr: {
        title: "Calculatrice de Différence de Pourcentage",
        description: "Calculez la différence relative en pourcentage entre deux nombres indépendamment de leur ordre.",
        meta: {
          title: "Calculatrice de Différence de Pourcentage – Comparaison Relative",
          description: "Calculez la différence en pourcentage entre deux valeurs par rapport à leur moyenne.",
          keywords: "calculer difference pourcentage, comparaison pourcentage deux nombres",
        },
      },
      de: {
        title: "Prozentualer Differenzrechner",
        description: "Berechnen Sie den relativen prozentualen Unterschied zwischen zwei Zahlen bezogen auf deren Mittelwert.",
        meta: {
          title: "Prozentualer Differenzrechner – Relative Differenz Berechnen",
          description: "Berechnen Sie die relative prozentuale Abweichung zwischen zwei Werten mit transparenter Formel.",
          keywords: "prozentuale differenz berechnen, abweichung in prozent rechner, prozentualer unterschied",
        },
      },
    },
    defaultValues: {
      c2X: "25",
      c2Y: "100",
    },
    fields: [],
    logicModule: "math",
  },

  // ─── 7. RETIREMENT & DEBT ────────────────────────────────────────────
  {
    slug: "early-retirement-fire-calculator",
    parentSlug: "retirement-calculator",
    slugs: {
      en: "early-retirement-fire-calculator",
      es: "calculadora-fire-retiro-anticipado",
      fr: "calculatrice-fire-retraite-anticipee",
      de: "fire-rechner-fruhe-rente",
    },
    title: "FIRE Calculator (Financial Independence, Retire Early)",
    category: "Financial",
    description: "Calculate your Financial Independence number (25x annual spending) and see how many years until you can retire early.",
    meta: {
      title: "FIRE Calculator – Financial Independence & Early Retirement Number",
      description: "Calculate your FIRE number and early retirement timeline based on savings rate, investment returns, and annual living expenses.",
      keywords: "fire calculator, early retirement calculator, financial independence retire early, fire number calculator",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora FIRE (Independencia Financiera y Jubilación Anticipada)",
        description: "Calcula tu número FIRE objetivo y los años necesarios para jubilarte joven aplicando la regla del 4%.",
        meta: {
          title: "Calculadora FIRE – Independencia Financiera y Retiro Temprano",
          description: "Descubre cuándo alcanzarás la libertad financiera total calculando tus gastos anuales y tasa de ahorro.",
          keywords: "calculadora fire, independencia financiera retiro anticipado, regla del 4 por ciento, jubilarse joven",
        },
      },
      fr: {
        title: "Calculatrice FIRE (Indépendance Financière et Retraite Anticipée)",
        description: "Déterminez votre capital FIRE cible et le nombre d'années pour vivre de vos rentes selon la règle des 4%.",
        meta: {
          title: "Calculatrice FIRE – Indépendance Financière & Retraite Précoce",
          description: "Simulez le mouvement FIRE : calculez le montant requis pour prendre votre retraite anticipée grâce à vos investissements.",
          keywords: "calculateur fire, independance financiere retraite anticipee, regle des 4 pourcent, vivre de ses rentes",
        },
      },
      de: {
        title: "FIRE-Rechner (Finanzielle Unabhängigkeit und Frührente)",
        description: "Ermitteln Sie Ihre FIRE-Zielsumme und wie viele Jahre Sie bis zur finanziellen Freiheit und Frührente benötigen.",
        meta: {
          title: "FIRE-Rechner – Finanzielle Freiheit & Frührente Berechnen",
          description: "Berechnen Sie Ihr FIRE-Vermögen mit der 4%-Regel, monatlichen Sparraten und Anlagerenditen.",
          keywords: "fire rechner, finanzielle freiheit rechner, fruehrente berechnen, 4 prozent regel fire",
        },
      },
    },
    defaultValues: {
      currentAge: 30,
      retirementAge: 45,
      currentSavings: 100000,
      monthlyContribution: 2500,
      annualReturn: 8,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "401k-growth-calculator",
    parentSlug: "401k-calculator",
    slugs: {
      en: "401k-growth-calculator",
      es: "calculadora-de-crecimiento-401k",
      fr: "calculatrice-de-croissance-401k",
      de: "401k-wachstumsrechner",
    },
    title: "401(k) Growth Calculator",
    category: "Financial",
    description: "Estimate long-term 401(k) retirement savings growth incorporating employer matching contributions and compound stock market returns.",
    meta: {
      title: "401(k) Growth Calculator – Maximize Employer Match & Returns",
      description: "Calculate how much your 401(k) will grow by retirement with employee deferrals, company matches, and compound annual investment growth.",
      keywords: "401k growth calculator, 401k retirement calculator, 401k employer match, retirement savings projector",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Crecimiento y Aportes 401(k)",
        description: "Proyecta el saldo de tu fondo de jubilación considerando contribuciones de nómina y aportes del empleador.",
        meta: {
          title: "Calculadora de Crecimiento 401(k) – Proyección de Fondos de Retiro",
          description: "Calcula el valor futuro de tu fondo 401(k) o plan de pensiones con igualación de la empresa y rentabilidad compuesta.",
          keywords: "calculadora 401k, crecimiento fondo de retiro, plan de jubilacion 401k, aportes del empleador",
        },
      },
      fr: {
        title: "Calculatrice de Croissance de Plan d'Épargne Retraite 401(k)",
        description: "Estimez le capital retraite constitué avec abondement employeur et intérêts composés jusqu'à votre départ.",
        meta: {
          title: "Calculatrice Plan Retraite 401(k) – Simulation de Croissance",
          description: "Projetez l'évolution de votre plan d'épargne retraite avec abondement de l'entreprise et réinvestissement des gains.",
          keywords: "simulateur epargne retraite, calcul plan retraite, abondement employeur epargne",
        },
      },
      de: {
        title: "Altersvorsorge-Sparplan-Rechner (401k)",
        description: "Prognostizieren Sie das Endkapital Ihrer betrieblichen und privaten Altersvorsorge mit Arbeitgeberzuschuss.",
        meta: {
          title: "Altersvorsorge & 401(k) Rechner – Sparplan mit Arbeitgeberzuschuss",
          description: "Berechnen Sie den Vermögensaufbau Ihrer Altersvorsorge mit Zinseszins und Arbeitgeberbeitrag bis zum Renteneintritt.",
          keywords: "altersvorsorge rechner, betriebliche altersvorsorge rechner, 401k sparplan, vermoegensaufbau rente",
        },
      },
    },
    defaultValues: {
      currentAge: 28,
      retirementAge: 65,
      currentBalance: 25000,
      currentSalary: 85000,
      expectedSalaryIncrease: 2.5,
      contributionPercent: 9,
      employerMatchPercent: 50,
      employerMatchLimit: 6,
      expectedReturn: 8,
    },
    fields: [],
    logicModule: "financial",
  },
  {
    slug: "credit-card-minimum-payment-calculator",
    parentSlug: "debt-payoff-calculator",
    slugs: {
      en: "credit-card-minimum-payment-calculator",
      es: "calculadora-de-pago-minimo-de-tarjeta-de-credito",
      fr: "calculatrice-de-paiement-minimum-carte-de-credit",
      de: "kreditkarten-mindestzahlungsrechner",
    },
    title: "Credit Card Minimum Payment Calculator",
    category: "Financial",
    description: "Reveal the true cost of making only minimum monthly credit card payments and calculate how much faster extra payments clear your balance.",
    meta: {
      title: "Credit Card Minimum Payment Calculator – See True Payoff Cost",
      description: "See how many years it takes to pay off credit card debt making only minimum payments, and how much interest you can save with extra payments.",
      keywords: "credit card minimum payment calculator, credit card payoff calculator, credit card interest calculator, debt payoff time",
      lastUpdated: "2026-09-08",
    },
    translations: {
      es: {
        title: "Calculadora de Pago Mínimo de Tarjeta de Crédito",
        description: "Descubre cuántos años y miles de dólares en intereses pagarás si solo realizas el pago mínimo mensual.",
        meta: {
          title: "Calculadora de Pago Mínimo de Tarjeta de Crédito – Costo Real de la Deuda",
          description: "Comprueba el impacto financiero devastador de pagar solo el mínimo y cómo liquidar tu deuda mucho antes.",
          keywords: "calculadora pago minimo tarjeta de credito, liquidar deuda tarjeta, intereses pago minimo",
        },
      },
      fr: {
        title: "Calculatrice de Paiement Minimum par Carte de Crédit",
        description: "Visualisez les années et les intérêts astronomiques requis pour rembourser votre dette en ne payant que le minimum.",
        meta: {
          title: "Calculatrice de Paiement Minimum Carte de Crédit – Coût de la Dette",
          description: "Découvrez le coût réel du remboursement minimum par carte bancaire et le calendrier pour vous désendetter plus vite.",
          keywords: "paiement minimum carte credit, simuler remboursement carte bancaire, cout des interets carte credit",
        },
      },
      de: {
        title: "Kreditkarten-Mindestzahlungsrechner",
        description: "Erfahren Sie, wie viele Jahre Sie zahlen und wie viel Zinsen anfallen, wenn Sie nur die Mindestrate überweisen.",
        meta: {
          title: "Kreditkarten Mindestzahlungsrechner – Die Zinsfalle Berechnen",
          description: "Berechnen Sie die wahre Dauer und Zinskosten bei ausschließlicher Zahlung des Kreditkarten-Mindestbetrags.",
          keywords: "kreditkarten mindestzahlung rechner, kreditkarte zinsfalle, schuldenabbau rechner kreditkarte",
        },
      },
    },
    defaultValues: {
      loanAmount: 7500,
      interestRate: 24.99,
      monthlyPayment: 190,
      extraPayment: 50,
    },
    fields: [],
    logicModule: "financial",
  },
];
