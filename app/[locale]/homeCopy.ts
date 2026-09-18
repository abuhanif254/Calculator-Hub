export interface CategoryItem {
  id: string;
  title: string;
  count: string;
  desc: string;
  bgColor: string;
  iconColor: string;
  links: { name: string; href: string }[];
}

export interface DevEssentialTool {
  name: string;
  desc: string;
  href: string;
}

export interface WhyChooseUsCard {
  title: string;
  desc: string;
}

export interface UseCaseFeature {
  title: string;
  desc: string;
}

export interface StepItem {
  title: string;
  desc: string;
}

export interface CollectionCard {
  name: string;
  slug: string;
  color: string;
  bg: string;
}

export interface RealWorldScenario {
  persona: string;
  role: string;
  scenario: string;
  tools: { name: string; href: string }[];
}

export interface FaqItem {
  q: string;
  a: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO COPY
// ─────────────────────────────────────────────────────────────────────────────
export const heroCopy: Record<string, {
  badge: string;
  titlePart1: string;
  titleGradient: string;
  titlePart2: string;
  desc: string;
  exploreBtn: string;
  communityBtn: string;
}> = {
  en: {
    badge: "302+ Tools — Calculators, Dev Utilities & More",
    titlePart1: "The Ultimate",
    titleGradient: "Calculators & Developer Tools",
    titlePart2: "Platform",
    desc: "The ultimate ecosystem for professionals. Access two hundreds of precise calculators and powerful developer utilities, PDF Tools, Image Tools instantly in your browser.",
    exploreBtn: "Explore Tools",
    communityBtn: "Join Community",
  },
  es: {
    badge: "Más de 302 Herramientas — Calculadoras y Utilidades Dev",
    titlePart1: "La Plataforma Definitiva de",
    titleGradient: "Calculadoras y Herramientas",
    titlePart2: "para Profesionales",
    desc: "El ecosistema ideal para profesionales. Acceda a cientos de calculadoras precisas, utilidades de desarrollo, herramientas PDF e imágenes al instante en su navegador.",
    exploreBtn: "Explorar Herramientas",
    communityBtn: "Unirse a la Comunidad",
  },
  fr: {
    badge: "Plus de 302 Outils — Calculatrices & Utilitaires Développeur",
    titlePart1: "La Plateforme Ultime de",
    titleGradient: "Calculatrices et Outils",
    titlePart2: "pour Développeurs",
    desc: "L'écosystème gratuit pour les professionnels. Accédez instantanément à des centaines de calculatrices précises et d'utilitaires web et PDF dans votre navigateur.",
    exploreBtn: "Explorer les Outils",
    communityBtn: "Rejoindre la Communauté",
  },
  de: {
    badge: "302+ Tools — Rechner, Entwickler-Tools & Mehr",
    titlePart1: "Die Ultimative Plattform für",
    titleGradient: "Rechner & Entwickler-Tools",
    titlePart2: "im Web",
    desc: "Das ultimative Ökosystem für Profis. Greifen Sie direkt im Browser auf Hunderte präzise Rechner, Entwickler-Tools, PDF- und Bildbearbeitungstools zu.",
    exploreBtn: "Tools Erkunden",
    communityBtn: "Community Beitreten",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. DEVELOPER ESSENTIALS
// ─────────────────────────────────────────────────────────────────────────────
export const developerEssentialsCopy: Record<string, {
  heading: string;
  subtitle: string;
  viewAll: string;
  tools: DevEssentialTool[];
}> = {
  en: {
    heading: "Developer Essentials",
    subtitle: "High-performance utilities built for modern web developers.",
    viewAll: "View all dev tools",
    tools: [
      { name: "JSON Formatter", desc: "Format, validate, and minify JSON data instantly.", href: "/tools/json-formatter" },
      { name: "HTML Formatter", desc: "Beautify and format raw HTML code with proper indentation.", href: "/tools/html-formatter" },
      { name: "Diff Checker", desc: "Compare two blocks of text or code to find differences.", href: "/tools/diff-checker" },
      { name: "Scientific Calculator", desc: "Advanced math with trigonometry, logarithms, and more.", href: "/calculators/scientific-calculator" },
    ],
  },
  es: {
    heading: "Herramientas Esenciales para Desarrolladores",
    subtitle: "Utilidades de alto rendimiento diseñadas para desarrolladores web modernos.",
    viewAll: "Ver todas las herramientas dev",
    tools: [
      { name: "Formateador JSON", desc: "Formatee, valide y minimice datos JSON al instante.", href: "/tools/json-formatter" },
      { name: "Formateador HTML", desc: "Embellezca y dé formato al código HTML con sangría adecuada.", href: "/tools/html-formatter" },
      { name: "Comparador de Texto (Diff)", desc: "Compare dos bloques de texto o código para detectar diferencias.", href: "/tools/diff-checker" },
      { name: "Calculadora Científica", desc: "Matemáticas avanzadas con trigonometría, logaritmos y más.", href: "/calculators/scientific-calculator" },
    ],
  },
  fr: {
    heading: "Essentiels pour Développeurs",
    subtitle: "Utilitaires haute performance conçus pour les développeurs web modernes.",
    viewAll: "Voir tous les outils dev",
    tools: [
      { name: "Formateur JSON", desc: "Formatez, validez et compressez vos données JSON instantanément.", href: "/tools/json-formatter" },
      { name: "Formateur HTML", desc: "Embellissez et formatez le code HTML avec une indentation correcte.", href: "/tools/html-formatter" },
      { name: "Comparateur de Texte (Diff)", desc: "Comparez deux blocs de texte ou de code pour détecter les différences.", href: "/tools/diff-checker" },
      { name: "Calculatrice Scientifique", desc: "Calculs mathématiques avancés avec trigonométrie et logarithmes.", href: "/calculators/scientific-calculator" },
    ],
  },
  de: {
    heading: "Entwickler-Basics",
    subtitle: "Hochleistungsfähige Tools für moderne Webentwickler.",
    viewAll: "Alle Entwickler-Tools ansehen",
    tools: [
      { name: "JSON-Formatierer", desc: "JSON-Daten sofort formatieren, validieren und minifizieren.", href: "/tools/json-formatter" },
      { name: "HTML-Formatierer", desc: "HTML-Code verschönern und mit sauberer Einrückung formatieren.", href: "/tools/html-formatter" },
      { name: "Textvergleich (Diff)", desc: "Zwei Text- oder Codeblöcke vergleichen und Unterschiede erkennen.", href: "/tools/diff-checker" },
      { name: "Wissenschaftlicher Rechner", desc: "Fortgeschrittene Mathematik mit Trigonometrie, Logarithmen und mehr.", href: "/calculators/scientific-calculator" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. CATEGORY DATA
// ─────────────────────────────────────────────────────────────────────────────
export const categoryDataByLocale: Record<string, {
  heading: string;
  viewAll: string;
  categories: CategoryItem[];
}> = {
  en: {
    heading: "Comprehensive Calculators & Developer Tools Library",
    viewAll: "View all tools",
    categories: [
      {
        id: "financial",
        title: "Financial Calculators",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        iconColor: "text-blue-500",
        count: "45+ Tools",
        desc: "Mortgage, loans, investments, taxes",
        links: [
          { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
          { name: "Loan Calculator", href: "/calculators/loan-calculator" },
          { name: "Auto Loan Calculator", href: "/calculators/auto-loan-calculator" },
          { name: "Interest Calculator", href: "/calculators/interest-calculator" },
          { name: "Savings Calculator", href: "/calculators/savings-calculator" },
          { name: "Retirement Calculator", href: "/calculators/retirement-calculator" },
        ],
      },
      {
        id: "health",
        title: "Fitness & Health",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        iconColor: "text-amber-500",
        count: "15+ Tools",
        desc: "BMI, calories, pregnancy, pace",
        links: [
          { name: "BMI Calculator", href: "/calculators/bmi-calculator" },
          { name: "Calorie Calculator", href: "/calculators/calorie-calculator" },
          { name: "Body Fat Calculator", href: "/calculators/body-fat-calculator" },
          { name: "BMR Calculator", href: "/calculators/bmr-calculator" },
          { name: "Ideal Weight Calculator", href: "/calculators/ideal-weight-calculator" },
          { name: "Pace Calculator", href: "/calculators/pace-calculator" },
        ],
      },
      {
        id: "math",
        title: "Math & Science",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        iconColor: "text-emerald-500",
        count: "20+ Tools",
        desc: "Scientific, fractions, geometry",
        links: [
          { name: "Scientific Calculator", href: "/calculators/scientific-calculator" },
          { name: "Fraction Calculator", href: "/calculators/fraction-calculator" },
          { name: "Percentage Calculator", href: "/calculators/percentage-calculator" },
          { name: "Random Number Generator", href: "/tools/random-number-generator" },
          { name: "Triangle Calculator", href: "/calculators/triangle-calculator" },
          { name: "Standard Deviation Calculator", href: "/calculators/standard-deviation-calculator" },
        ],
      },
      {
        id: "developer",
        title: "Developer Tools",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        iconColor: "text-purple-500",
        count: "60+ Utilities",
        desc: "Formatters, encoders, generators",
        links: [
          { name: "JSON Formatter", href: "/tools/json-formatter" },
          { name: "HTML Formatter", href: "/tools/html-formatter" },
          { name: "Diff Checker", href: "/tools/diff-checker" },
          { name: "Subnet Calculator", href: "/calculators/subnet-calculator" },
          { name: "Password Generator", href: "/tools/password-generator" },
          { name: "Conversion Calculator", href: "/calculators/conversion-calculator" },
        ],
      },
      {
        id: "privacy",
        title: "Privacy & Security",
        bgColor: "bg-sky-50 dark:bg-sky-900/20",
        iconColor: "text-sky-500",
        count: "Free Platform",
        desc: "PII scanning, data masking, GDPR compliance",
        links: [
          { name: "PII Scanner", href: "/database-privacy" },
          { name: "Data Masking Rules", href: "/database-privacy" },
          { name: "GDPR Compliance", href: "/database-privacy" },
          { name: "HIPAA Compliance", href: "/database-privacy" },
          { name: "Audit Logs", href: "/database-privacy" },
          { name: "Secrets Vault", href: "/database-privacy" },
        ],
      },
    ],
  },
  es: {
    heading: "Biblioteca Completa de Calculadoras y Herramientas para Desarrolladores",
    viewAll: "Ver todas las herramientas",
    categories: [
      {
        id: "financial",
        title: "Calculadoras Financieras",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        iconColor: "text-blue-500",
        count: "45+ Herramientas",
        desc: "Hipotecas, préstamos, inversiones, impuestos",
        links: [
          { name: "Calculadora de Hipotecas", href: "/calculators/mortgage-calculator" },
          { name: "Calculadora de Préstamos", href: "/calculators/loan-calculator" },
          { name: "Calculadora de Préstamos para Autos", href: "/calculators/auto-loan-calculator" },
          { name: "Calculadora de Interés", href: "/calculators/interest-calculator" },
          { name: "Calculadora de Ahorros", href: "/calculators/savings-calculator" },
          { name: "Calculadora de Jubilación", href: "/calculators/retirement-calculator" },
        ],
      },
      {
        id: "health",
        title: "Salud y Bienestar",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        iconColor: "text-amber-500",
        count: "15+ Herramientas",
        desc: "IMC, calorías, embarazo, ritmo",
        links: [
          { name: "Calculadora de IMC", href: "/calculators/bmi-calculator" },
          { name: "Calculadora de Calorías", href: "/calculators/calorie-calculator" },
          { name: "Calculadora de Grasa Corporal", href: "/calculators/body-fat-calculator" },
          { name: "Calculadora de TMB", href: "/calculators/bmr-calculator" },
          { name: "Calculadora de Peso Ideal", href: "/calculators/ideal-weight-calculator" },
          { name: "Calculadora de Ritmo", href: "/calculators/pace-calculator" },
        ],
      },
      {
        id: "math",
        title: "Matemáticas y Ciencia",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        iconColor: "text-emerald-500",
        count: "20+ Herramientas",
        desc: "Científica, fracciones, geometría",
        links: [
          { name: "Calculadora Científica", href: "/calculators/scientific-calculator" },
          { name: "Calculadora de Fracciones", href: "/calculators/fraction-calculator" },
          { name: "Calculadora de Porcentajes", href: "/calculators/percentage-calculator" },
          { name: "Generador de Números Aleatorios", href: "/tools/random-number-generator" },
          { name: "Calculadora de Triángulos", href: "/calculators/triangle-calculator" },
          { name: "Calculadora de Desviación Estándar", href: "/calculators/standard-deviation-calculator" },
        ],
      },
      {
        id: "developer",
        title: "Herramientas para Desarrolladores",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        iconColor: "text-purple-500",
        count: "60+ Utilidades",
        desc: "Formateadores, codificadores, generadores",
        links: [
          { name: "Formateador JSON", href: "/tools/json-formatter" },
          { name: "Formateador HTML", href: "/tools/html-formatter" },
          { name: "Comparador de Texto", href: "/tools/diff-checker" },
          { name: "Calculadora de Subredes", href: "/calculators/subnet-calculator" },
          { name: "Generador de Contraseñas", href: "/tools/password-generator" },
          { name: "Calculadora de Conversión", href: "/calculators/conversion-calculator" },
        ],
      },
      {
        id: "privacy",
        title: "Privacidad y Seguridad",
        bgColor: "bg-sky-50 dark:bg-sky-900/20",
        iconColor: "text-sky-500",
        count: "Plataforma Gratuita",
        desc: "Escaneo de PII, enmascaramiento, GDPR",
        links: [
          { name: "Escáner de PII", href: "/database-privacy" },
          { name: "Reglas de Enmascaramiento", href: "/database-privacy" },
          { name: "Cumplimiento GDPR", href: "/database-privacy" },
          { name: "Cumplimiento HIPAA", href: "/database-privacy" },
          { name: "Registros de Auditoría", href: "/database-privacy" },
          { name: "Bóveda de Secretos", href: "/database-privacy" },
        ],
      },
    ],
  },
  fr: {
    heading: "Bibliothèque Complète de Calculatrices et d'Outils Développeur",
    viewAll: "Voir tous les outils",
    categories: [
      {
        id: "financial",
        title: "Calculatrices Financières",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        iconColor: "text-blue-500",
        count: "45+ Outils",
        desc: "Hypothèque, prêts, investissements, impôts",
        links: [
          { name: "Calculatrice Hypothécaire", href: "/calculators/mortgage-calculator" },
          { name: "Calculatrice de Prêt", href: "/calculators/loan-calculator" },
          { name: "Calculatrice de Prêt Auto", href: "/calculators/auto-loan-calculator" },
          { name: "Calculatrice d'Intérêts", href: "/calculators/interest-calculator" },
          { name: "Calculatrice d'Épargne", href: "/calculators/savings-calculator" },
          { name: "Calculatrice de Retraite", href: "/calculators/retirement-calculator" },
        ],
      },
      {
        id: "health",
        title: "Santé et Forme",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        iconColor: "text-amber-500",
        count: "15+ Outils",
        desc: "IMC, calories, grossesse, allure",
        links: [
          { name: "Calculateur d'IMC", href: "/calculators/bmi-calculator" },
          { name: "Calculateur de Calories", href: "/calculators/calorie-calculator" },
          { name: "Calculateur de Masse Grasse", href: "/calculators/body-fat-calculator" },
          { name: "Calculateur de TMB", href: "/calculators/bmr-calculator" },
          { name: "Calculateur de Poids Idéal", href: "/calculators/ideal-weight-calculator" },
          { name: "Calculateur d'Allure", href: "/calculators/pace-calculator" },
        ],
      },
      {
        id: "math",
        title: "Mathématiques & Sciences",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        iconColor: "text-emerald-500",
        count: "20+ Outils",
        desc: "Scientifique, fractions, géométrie",
        links: [
          { name: "Calculatrice Scientifique", href: "/calculators/scientific-calculator" },
          { name: "Calculatrice de Fractions", href: "/calculators/fraction-calculator" },
          { name: "Calculatrice de Pourcentage", href: "/calculators/percentage-calculator" },
          { name: "Générateur de Nombres Aléatoires", href: "/tools/random-number-generator" },
          { name: "Calculateur de Triangle", href: "/calculators/triangle-calculator" },
          { name: "Calculateur d'Écart-Type", href: "/calculators/standard-deviation-calculator" },
        ],
      },
      {
        id: "developer",
        title: "Outils Développeur",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        iconColor: "text-purple-500",
        count: "60+ Utilitaires",
        desc: "Formateurs, encodeurs, générateurs",
        links: [
          { name: "Formateur JSON", href: "/tools/json-formatter" },
          { name: "Formateur HTML", href: "/tools/html-formatter" },
          { name: "Vérificateur de Différences", href: "/tools/diff-checker" },
          { name: "Calculateur de Sous-Réseau", href: "/calculators/subnet-calculator" },
          { name: "Générateur de Mots de Passe", href: "/tools/password-generator" },
          { name: "Convertisseur d'Unités", href: "/calculators/conversion-calculator" },
        ],
      },
      {
        id: "privacy",
        title: "Confidentialité & Sécurité",
        bgColor: "bg-sky-50 dark:bg-sky-900/20",
        iconColor: "text-sky-500",
        count: "Plateforme Gratuite",
        desc: "Analyse PII, masquage de données, RGPD",
        links: [
          { name: "Scanner PII", href: "/database-privacy" },
          { name: "Règles de Masquage", href: "/database-privacy" },
          { name: "Conformité RGPD", href: "/database-privacy" },
          { name: "Conformité HIPAA", href: "/database-privacy" },
          { name: "Journaux d'Audit", href: "/database-privacy" },
          { name: "Coffre-fort de Secrets", href: "/database-privacy" },
        ],
      },
    ],
  },
  de: {
    heading: "Umfassende Bibliothek für Rechner & Entwickler-Tools",
    viewAll: "Alle Tools ansehen",
    categories: [
      {
        id: "financial",
        title: "Finanzrechner",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        iconColor: "text-blue-500",
        count: "45+ Tools",
        desc: "Hypotheken, Kredite, Investitionen, Steuern",
        links: [
          { name: "Hypothekenrechner", href: "/calculators/mortgage-calculator" },
          { name: "Kreditrechner", href: "/calculators/loan-calculator" },
          { name: "Autokreditrechner", href: "/calculators/auto-loan-calculator" },
          { name: "Zinsrechner", href: "/calculators/interest-calculator" },
          { name: "Sparrechner", href: "/calculators/savings-calculator" },
          { name: "Rentenrechner", href: "/calculators/retirement-calculator" },
        ],
      },
      {
        id: "health",
        title: "Gesundheit & Fitness",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        iconColor: "text-amber-500",
        count: "15+ Tools",
        desc: "BMI, Kalorien, Schwangerschaft, Tempo",
        links: [
          { name: "BMI-Rechner", href: "/calculators/bmi-calculator" },
          { name: "Kalorienrechner", href: "/calculators/calorie-calculator" },
          { name: "Körperfettrechner", href: "/calculators/body-fat-calculator" },
          { name: "Grundumsatz-Rechner", href: "/calculators/bmr-calculator" },
          { name: "Idealgewicht-Rechner", href: "/calculators/ideal-weight-calculator" },
          { name: "Pacing-Rechner", href: "/calculators/pace-calculator" },
        ],
      },
      {
        id: "math",
        title: "Mathematik & Wissenschaft",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        iconColor: "text-emerald-500",
        count: "20+ Tools",
        desc: "Wissenschaftlich, Brüche, Geometrie",
        links: [
          { name: "Wissenschaftlicher Rechner", href: "/calculators/scientific-calculator" },
          { name: "Bruchrechner", href: "/calculators/fraction-calculator" },
          { name: "Prozentrechner", href: "/calculators/percentage-calculator" },
          { name: "Zufallszahlengenerator", href: "/tools/random-number-generator" },
          { name: "Dreiecksrechner", href: "/calculators/triangle-calculator" },
          { name: "Standardabweichungsrechner", href: "/calculators/standard-deviation-calculator" },
        ],
      },
      {
        id: "developer",
        title: "Entwickler-Tools",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        iconColor: "text-purple-500",
        count: "60+ Hilfsmittel",
        desc: "Formatierer, Encoder, Generatoren",
        links: [
          { name: "JSON-Formatierer", href: "/tools/json-formatter" },
          { name: "HTML-Formatierer", href: "/tools/html-formatter" },
          { name: "Textvergleich (Diff)", href: "/tools/diff-checker" },
          { name: "Subnetzrechner", href: "/calculators/subnet-calculator" },
          { name: "Passwortgenerator", href: "/tools/password-generator" },
          { name: "Einheitenumrechner", href: "/calculators/conversion-calculator" },
        ],
      },
      {
        id: "privacy",
        title: "Datenschutz & Sicherheit",
        bgColor: "bg-sky-50 dark:bg-sky-900/20",
        iconColor: "text-sky-500",
        count: "Kostenlose Plattform",
        desc: "PII-Scannen, Datenmaskierung, DSGVO",
        links: [
          { name: "PII-Scanner", href: "/database-privacy" },
          { name: "Datenmaskierungsregeln", href: "/database-privacy" },
          { name: "DSGVO-Konformität", href: "/database-privacy" },
          { name: "HIPAA-Konformität", href: "/database-privacy" },
          { name: "Audit-Protokolle", href: "/database-privacy" },
          { name: "Geheimnis-Tresor", href: "/database-privacy" },
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. WHY CHOOSE US
// ─────────────────────────────────────────────────────────────────────────────
export const whyChooseUsCopy: Record<string, {
  heading: string;
  subtitle: string;
  cards: WhyChooseUsCard[];
}> = {
  en: {
    heading: "Why Professionals Choose Us",
    subtitle: "We built this platform to respect your time, data, and device constraints.",
    cards: [
      { title: "Lightning Fast", desc: "Calculations run locally in your browser. Zero server latency." },
      { title: "Privacy First", desc: "No data logging. Your financial and health data never leaves your device." },
      { title: "Mobile Optimized", desc: "Flawless responsive design. Perfect UI on desktops, tablets, and phones." },
      { title: "No Signup Required", desc: "100% free access immediately. No paywalls, no forced registrations." },
    ],
  },
  es: {
    heading: "¿Por Qué Nos Eligen los Profesionales?",
    subtitle: "Diseñamos esta plataforma para respetar su tiempo, sus datos y su dispositivo.",
    cards: [
      { title: "Ultrarrápido", desc: "Los cálculos se ejecutan localmente en su navegador. Cero latencia de servidor." },
      { title: "Privacidad Primero", desc: "Sin registro de datos. Su información financiera y médica nunca sale de su dispositivo." },
      { title: "Optimizado para Móviles", desc: "Diseño adaptable impecable. Experiencia perfecta en escritorio, tabletas y teléfonos." },
      { title: "Sin Registro Obligatorio", desc: "Acceso 100% gratuito e inmediato. Sin muros de pago ni registros forzados." },
    ],
  },
  fr: {
    heading: "Pourquoi les Professionnels Nous Choisissent",
    subtitle: "Nous avons conçu cette plateforme pour respecter votre temps, vos données et vos appareils.",
    cards: [
      { title: "Ultra Rapide", desc: "Les calculs s'exécutent localement dans votre navigateur. Aucune latence serveur." },
      { title: "Confidentialité Absolue", desc: "Aucun enregistrement de données. Vos informations financières et de santé restent sur votre appareil." },
      { title: "Optimisé pour Mobile", desc: "Design réactif impeccable. Interface fluide sur ordinateurs, tablettes et smartphones." },
      { title: "Aucune Inscription Requise", desc: "Accès 100% gratuit et immédiat. Pas de mur payant ni d'inscription forcée." },
    ],
  },
  de: {
    heading: "Warum Profis Uns Wählen",
    subtitle: "Entwickelt, um Ihre Zeit, Ihre Daten und Ihre Geräteleistung optimal zu respektieren.",
    cards: [
      { title: "Blitzschnell", desc: "Berechnungen laufen lokal im Browser. Keine Server-Latenz." },
      { title: "Privatsphäre Zuerst", desc: "Keine Datenspeicherung. Ihre Finanz- und Gesundheitsdaten verlassen niemals Ihr Gerät." },
      { title: "Mobil Optimiert", desc: "Perfektes responsives Design. Optimale Bedienung auf PCs, Tablets und Smartphones." },
      { title: "Keine Registrierung Nötig", desc: "100% kostenloser Sofortzugriff. Keine Bezahlschranken, keine Pflichtanmeldung." },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. REAL-WORLD WORKFLOWS & 3-STEP GUIDE
// ─────────────────────────────────────────────────────────────────────────────
export const realWorldWorkflowsCopy: Record<string, {
  heading: string;
  subtitle: string;
  features: UseCaseFeature[];
  steps: StepItem[];
}> = {
  en: {
    heading: "Calculators Designed for Real World Scenarios",
    subtitle: "Whether you are planning a 30-year mortgage, debugging a critical API response, or tracking your fitness goals, we have a specialized tool waiting for you.",
    features: [
      { title: "Mortgage & Financial Calculators", desc: "Calculate mortgage payments, amortization schedules, and ROI." },
      { title: "Software & Developer Tools", desc: "Validate API JSON, encode tokens, and format raw data." },
      { title: "Health & Fitness Calculators", desc: "Track calories, BMI, body fat, and setup diet plans." },
    ],
    steps: [
      { title: "1. Find Your Tool", desc: "Search or browse our massive directory." },
      { title: "2. Input Data", desc: "Fill in the variables in our intuitive UI." },
      { title: "3. Instant Results", desc: "Get accurate answers with visual charts instantly." },
    ],
  },
  es: {
    heading: "Calculadoras Diseñadas para Casos Reales",
    subtitle: "Ya sea que esté planificando una hipoteca a 30 años, depurando una respuesta de API o monitoreando sus metas de salud, tenemos una herramienta especializada para usted.",
    features: [
      { title: "Calculadoras de Hipotecas y Finanzas", desc: "Calcule cuotas hipotecarias, tablas de amortización y rendimiento de inversión." },
      { title: "Herramientas de Software y Desarrollo", desc: "Valide JSON de APIs, codifique tokens y formatee datos sin procesar." },
      { title: "Calculadoras de Salud y Fitness", desc: "Controle calorías, IMC, grasa corporal y diseñe planes nutricionales." },
    ],
    steps: [
      { title: "1. Encuentre su Herramienta", desc: "Busque o explore nuestro amplio catálogo." },
      { title: "2. Ingrese los Datos", desc: "Complete las variables en nuestra interfaz intuitiva." },
      { title: "3. Resultados Inmediatos", desc: "Obtenga respuestas precisas con gráficos interactivos al instante." },
    ],
  },
  fr: {
    heading: "Calculatrices Conçues pour des Situations Réelles",
    subtitle: "Que vous planifiiez un prêt immobilier sur 30 ans, déboguiez une API ou suiviez vos objectifs de remise en forme, un outil dédié vous attend.",
    features: [
      { title: "Calculatrices Hypothécaires et Financières", desc: "Calculez vos mensualités de crédit, tableaux d'amortissement et ROI." },
      { title: "Outils Développeur et Logiciels", desc: "Validez le JSON d'API, encodez des jetons et formatez les données brutes." },
      { title: "Calculateurs Santé et Forme", desc: "Suivez vos calories, IMC, masse grasse et créez des programmes nutritionnels." },
    ],
    steps: [
      { title: "1. Trouvez votre Outil", desc: "Recherchez ou explorez notre vaste catalogue." },
      { title: "2. Saisissez vos Données", desc: "Renseignez les variables dans notre interface intuitive." },
      { title: "3. Résultats Instantanés", desc: "Obtenez des réponses précises avec graphiques interactifs instantanément." },
    ],
  },
  de: {
    heading: "Rechner für Echte Praxisszenarien",
    subtitle: "Ob Sie eine 30-jährige Hypothek planen, eine API-Antwort debuggen oder Fitnessziele verfolgen – wir haben das passende Werkzeug.",
    features: [
      { title: "Hypotheken- & Finanzrechner", desc: "Berechnen Sie monatliche Hypothekenraten, Tilgungspläne und Renditen." },
      { title: "Entwickler-Tools & Software", desc: "API-JSON validieren, Tokens encodieren und Rohdaten formatieren." },
      { title: "Gesundheits- & Fitnessrechner", desc: "Kalorien, BMI, Körperfett berechnen und Ernährungspläne erstellen." },
    ],
    steps: [
      { title: "1. Tool Auswählen", desc: "Durchsuchen oder finden Sie Ihr Werkzeug in unserem Verzeichnis." },
      { title: "2. Daten Eingeben", desc: "Tragen Sie Ihre Werte in unsere intuitive Benutzeroberfläche ein." },
      { title: "3. Sofortige Ergebnisse", desc: "Erhalten Sie präzise Antworten mit interaktiven Diagrammen sofort." },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. COMMUNITY SECTION
// ─────────────────────────────────────────────────────────────────────────────
export const communitySectionCopy: Record<string, {
  heading: string;
  subtitle: string;
  btn: string;
}> = {
  en: {
    heading: "Community & Discussions",
    subtitle: "Join developers and professionals worldwide.",
    btn: "View Community",
  },
  es: {
    heading: "Comunidad y Debates",
    subtitle: "Únase a desarrolladores y profesionales de todo el mundo.",
    btn: "Ver Comunidad",
  },
  fr: {
    heading: "Communauté et Échanges",
    subtitle: "Rejoignez des développeurs et professionnels du monde entier.",
    btn: "Voir la Communauté",
  },
  de: {
    heading: "Community & Diskussionen",
    subtitle: "Vernetzen Sie sich mit Entwicklern und Fachleuten weltweit.",
    btn: "Zur Community",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. CURATED COLLECTIONS
// ─────────────────────────────────────────────────────────────────────────────
export const curatedCollectionsCopy: Record<string, {
  heading: string;
  subtitle: string;
  viewCollection: string;
  collections: CollectionCard[];
}> = {
  en: {
    heading: "Curated Tool Collections",
    subtitle: "Hand-picked sets of tools for specific professions.",
    viewCollection: "View Collection →",
    collections: [
      { name: "Frontend Developer Kit", slug: "developer-starter-pack", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
      { name: "Financial Planner Pack", slug: "real-estate-investor-kit", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
      { name: "Student Toolkit", slug: "debt-freedom-plan", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
      { name: "Fitness Essentials", slug: "fitness-transformation", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    ],
  },
  es: {
    heading: "Colecciones de Herramientas Seleccionadas",
    subtitle: "Conjuntos de herramientas seleccionados para profesionales específicos.",
    viewCollection: "Ver Colección →",
    collections: [
      { name: "Kit para Desarrolladores Frontend", slug: "developer-starter-pack", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
      { name: "Paquete de Planificación Financiera", slug: "real-estate-investor-kit", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
      { name: "Herramientas para Estudiantes", slug: "debt-freedom-plan", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
      { name: "Esenciales de Fitness", slug: "fitness-transformation", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    ],
  },
  fr: {
    heading: "Collections d'Outils Sélectionnées",
    subtitle: "Ensembles d'outils triés sur le volet pour chaque métier.",
    viewCollection: "Voir la Collection →",
    collections: [
      { name: "Kit Développeur Frontend", slug: "developer-starter-pack", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
      { name: "Pack Planification Financière", slug: "real-estate-investor-kit", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
      { name: "Boîte à Outils Étudiant", slug: "debt-freedom-plan", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
      { name: "Essentiels Remise en Forme", slug: "fitness-transformation", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    ],
  },
  de: {
    heading: "Kuratierte Tool-Sammlungen",
    subtitle: "Handverlesene Werkzeugsets für verschiedene Berufsgruppen.",
    viewCollection: "Sammlung ansehen →",
    collections: [
      { name: "Frontend-Entwickler-Kit", slug: "developer-starter-pack", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
      { name: "Finanzplanungs-Paket", slug: "real-estate-investor-kit", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
      { name: "Studenten-Toolkit", slug: "debt-freedom-plan", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
      { name: "Fitness-Grundausstattung", slug: "fitness-transformation", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. TRUST & STATISTICS
// ─────────────────────────────────────────────────────────────────────────────
export const trustStatsCopy: Record<string, {
  toolsCount: string;
  devToolsCount: string;
  monthlyCalculations: string;
  uptime: string;
}> = {
  en: {
    toolsCount: "Tools & Calculators",
    devToolsCount: "Dev Utilities",
    monthlyCalculations: "Monthly Calculations",
    uptime: "Uptime & Reliability",
  },
  es: {
    toolsCount: "Herramientas y Calculadoras",
    devToolsCount: "Utilidades Dev",
    monthlyCalculations: "Cálculos Mensuales",
    uptime: "Disponibilidad y Confiabilidad",
  },
  fr: {
    toolsCount: "Outils et Calculatrices",
    devToolsCount: "Utilitaires Dev",
    monthlyCalculations: "Calculs Mensuels",
    uptime: "Disponibilité et Fiabilité",
  },
  de: {
    toolsCount: "Tools & Rechner",
    devToolsCount: "Entwickler-Tools",
    monthlyCalculations: "Monatliche Berechnungen",
    uptime: "Verfügbarkeit & Zuverlässigkeit",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. REAL-WORLD SCENARIOS
// ─────────────────────────────────────────────────────────────────────────────
export const realWorldScenariosCopy: Record<string, {
  badge: string;
  heading: string;
  subtitle: string;
  toolsUsedLabel: string;
  scenarios: RealWorldScenario[];
}> = {
  en: {
    badge: "Real-World Scenarios",
    heading: "Built for How Professionals Actually Work",
    subtitle: "From financial advisors to developers and students — see how Nexus fits into real workflows.",
    toolsUsedLabel: "Tools used in this workflow",
    scenarios: [
      {
        persona: "Financial Advisor",
        role: "Mortgage & Loan Planning",
        scenario: "A client wants to refinance a $450,000 home at a lower rate. Using the Mortgage Calculator and Amortization tool together, the advisor shows side-by-side monthly savings and total interest paid — exported to PDF in one click.",
        tools: [
          { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
          { name: "Amortization Calculator", href: "/calculators/amortization-calculator" },
        ],
      },
      {
        persona: "Backend Developer",
        role: "API Debugging & Data Validation",
        scenario: "During an API integration, a malformed JSON payload is causing 400 errors. The developer pastes the response into the JSON Formatter, spots the missing comma, validates it, and uses the Base64 Decoder to inspect the embedded token — all in one tab.",
        tools: [
          { name: "JSON Formatter", href: "/tools/json-formatter" },
          { name: "Base64 Decoder", href: "/tools/base64-decode" },
        ],
      },
      {
        persona: "University Student",
        role: "Study & Exam Preparation",
        scenario: "Preparing for a statistics exam, a student uses the Standard Deviation Calculator with step-by-step breakdown, then the Scientific Calculator for regression problems. No app installs, no sign-up — just open and solve.",
        tools: [
          { name: "Standard Deviation Calculator", href: "/calculators/standard-deviation-calculator" },
          { name: "Scientific Calculator", href: "/calculators/scientific-calculator" },
        ],
      },
    ],
  },
  es: {
    badge: "Casos de Uso Reales",
    heading: "Diseñado para la Forma en que Trabajan los Profesionales",
    subtitle: "Desde asesores financieros hasta desarrolladores y estudiantes: descubra cómo Nexus se integra en sus flujos de trabajo cotidianos.",
    toolsUsedLabel: "Herramientas utilizadas en este flujo",
    scenarios: [
      {
        persona: "Asesor Financiero",
        role: "Planificación Hipotecaria y de Préstamos",
        scenario: "Un cliente desea refinanciar una vivienda de $450,000 a una tasa menor. Con la Calculadora de Hipotecas y la de Amortización, el asesor muestra el ahorro mensual comparado y el interés total pagado, exportable a PDF con un clic.",
        tools: [
          { name: "Calculadora de Hipotecas", href: "/calculators/mortgage-calculator" },
          { name: "Calculadora de Amortización", href: "/calculators/amortization-calculator" },
        ],
      },
      {
        persona: "Desarrollador Backend",
        role: "Depuración de APIs y Validación de Datos",
        scenario: "Durante una integración de API, una carga JSON malformada genera errores 400. El desarrollador pega la respuesta en el Formateador JSON, detecta la coma faltante, la valida y utiliza el Decodificador Base64 para inspeccionar el token en la misma pestaña.",
        tools: [
          { name: "Formateador JSON", href: "/tools/json-formatter" },
          { name: "Decodificador Base64", href: "/tools/base64-decode" },
        ],
      },
      {
        persona: "Estudiante Universitario",
        role: "Estudio y Preparación para Exámenes",
        scenario: "Al prepararse para un examen de estadística, el estudiante usa la Calculadora de Desviación Estándar con desglose paso a paso y la Calculadora Científica para problemas de regresión. Sin descargas ni registros: solo abrir y resolver.",
        tools: [
          { name: "Calculadora de Desviación Estándar", href: "/calculators/standard-deviation-calculator" },
          { name: "Calculadora Científica", href: "/calculators/scientific-calculator" },
        ],
      },
    ],
  },
  fr: {
    badge: "Cas d'Usage Réels",
    heading: "Conçu pour la Réalité du Travail Quotidien",
    subtitle: "Des conseillers financiers aux développeurs et étudiants : découvrez comment Nexus s'adapte à vos besoins réels.",
    toolsUsedLabel: "Outils utilisés dans ce flux",
    scenarios: [
      {
        persona: "Conseiller Financier",
        role: "Planification de Prêts & Hypothèques",
        scenario: "Un client souhaite renégocier un prêt immobilier de 450 000 $ à un meilleur taux. En combinant la Calculatrice Hypothécaire et d'Amortissement, le conseiller montre les économies mensuelles et le coût total des intérêts, exportables en PDF en un clic.",
        tools: [
          { name: "Calculatrice Hypothécaire", href: "/calculators/mortgage-calculator" },
          { name: "Calculatrice d'Amortissement", href: "/calculators/amortization-calculator" },
        ],
      },
      {
        persona: "Développeur Backend",
        role: "Débogage d'API et Validation de Données",
        scenario: "Lors d'une intégration d'API, une charge utile JSON corrompue provoque des erreurs 400. Le développeur colle la réponse dans le Formateur JSON, repère la virgule manquante, la valide et décode le jeton avec le Décodeur Base64 dans le même onglet.",
        tools: [
          { name: "Formateur JSON", href: "/tools/json-formatter" },
          { name: "Décodeur Base64", href: "/tools/base64-decode" },
        ],
      },
      {
        persona: "Étudiant Universitaire",
        role: "Révision et Préparation aux Examens",
        scenario: "Pour réviser un examen de statistiques, l'étudiant utilise la Calculatrice d'Écart-Type avec détail étape par étape, puis la Calculatrice Scientifique pour la régression. Sans installation ni inscription : direct et immédiat.",
        tools: [
          { name: "Calculateur d'Écart-Type", href: "/calculators/standard-deviation-calculator" },
          { name: "Calculatrice Scientifique", href: "/calculators/scientific-calculator" },
        ],
      },
    ],
  },
  de: {
    badge: "Reale Anwendungsszenarien",
    heading: "Entwickelt für die Echte Arbeitsweise von Profis",
    subtitle: "Von Finanzberatern über Entwickler bis hin zu Studenten – so unterstützt Nexus Ihre alltäglichen Arbeitsabläufe.",
    toolsUsedLabel: "In diesem Workflow genutzte Tools",
    scenarios: [
      {
        persona: "Finanzberater",
        role: "Hypotheken- & Kreditplanung",
        scenario: "Ein Kunde möchte eine Immobilie im Wert von 450.000 $ zinsgünstiger umschulden. Mit dem Hypothekenrechner und Tilgungsrechner zeigt der Berater monatliche Ersparnisse und Zinskosten direkt im Vergleich – mit einem Klick als PDF exportiert.",
        tools: [
          { name: "Hypothekenrechner", href: "/calculators/mortgage-calculator" },
          { name: "Tilgungsrechner", href: "/calculators/amortization-calculator" },
        ],
      },
      {
        persona: "Backend-Entwickler",
        role: "API-Debugging & Datenvalidierung",
        scenario: "Bei einer API-Integration führt ein fehlerhaftes JSON zu 400-Fehlern. Der Entwickler fügt die Antwort in den JSON-Formatierer ein, findet das fehlende Komma, validiert es und nutzt den Base64-Decoder zur Token-Inspektion – alles in einem Tab.",
        tools: [
          { name: "JSON-Formatierer", href: "/tools/json-formatter" },
          { name: "Base64-Decoder", href: "/tools/base64-decode" },
        ],
      },
      {
        persona: "Universitätsstudent",
        role: "Prüfungsvorbereitung & Lernen",
        scenario: "Zur Vorbereitung auf eine Statistikprüfung nutzt ein Student den Standardabweichungsrechner mit Rechenschritten und anschließend den wissenschaftlichen Rechner. Keine Installation, kein Login – einfach aufrufen und lösen.",
        tools: [
          { name: "Standardabweichungsrechner", href: "/calculators/standard-deviation-calculator" },
          { name: "Wissenschaftlicher Rechner", href: "/calculators/scientific-calculator" },
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. FAQS
// ─────────────────────────────────────────────────────────────────────────────
export const faqCopy: Record<string, {
  heading: string;
  subtitle: string;
  faqs: FaqItem[];
}> = {
  en: {
    heading: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our calculators and tools.",
    faqs: [
      { q: "Are my financial inputs saved?", a: "No, all calculations are performed entirely in your browser. We do not store, save, or transmit any of the numbers you input on our site, ensuring your absolute privacy." },
      { q: "How often are the developer tools updated?", a: "Our team regularly updates parsing libraries, encoders, and formatting tools to support the latest web standards and programming languages." },
      { q: "Can I request a new tool?", a: "Absolutely! We love building tools our users need. Use our community forum to suggest a new specific calculator or utility." },
      { q: "Are these tools free to use?", a: "Yes, all calculators and developer tools on Nexus Calculator are 100% free with no limits on usage. We aim to provide high-quality utility for everyone." },
    ],
  },
  es: {
    heading: "Preguntas Frecuentes",
    subtitle: "Todo lo que necesita saber sobre nuestras calculadoras y herramientas.",
    faqs: [
      { q: "¿Se guardan mis datos financieros?", a: "No, todos los cálculos se realizan íntegramente en su navegador. No almacenamos, guardamos ni transmitimos ninguno de los números que ingresa en nuestro sitio, garantizando su total privacidad." },
      { q: "¿Con qué frecuencia se actualizan las herramientas dev?", a: "Nuestro equipo actualiza periódicamente las bibliotecas de análisis, codificadores y formateadores para ser compatibles con los últimos estándares web y lenguajes de programación." },
      { q: "¿Puedo solicitar una nueva herramienta?", a: "¡Por supuesto! Nos encanta crear las herramientas que nuestra comunidad necesita. Utilice nuestro foro comunitario para sugerir una nueva calculadora o utilidad específica." },
      { q: "¿El uso de estas herramientas es gratuito?", a: "Sí, todas las calculadoras y herramientas de desarrollo en Nexus Calculator son 100% gratuitas y sin límites de uso. Nuestro objetivo es brindar herramientas de máxima calidad a todos." },
    ],
  },
  fr: {
    heading: "Foire Aux Questions",
    subtitle: "Tout ce que vous devez savoir sur nos calculatrices et outils.",
    faqs: [
      { q: "Mes données financières sont-elles sauvegardées ?", a: "Non, tous les calculs sont exécutés exclusivement dans votre navigateur. Nous ne stockons, ne sauvegardons ni ne transmettons aucune de vos données, garantissant votre entière confidentialité." },
      { q: "À quelle fréquence les outils développeur sont-ils mis à jour ?", a: "Notre équipe met régulièrement à jour les bibliothèques d'analyse, d'encodage et de formatage pour prendre en charge les derniers standards web et langages de programmation." },
      { q: "Puis-je suggérer un nouvel outil ?", a: "Absolument ! Nous développons volontiers les outils demandés par nos utilisateurs. Utilisez notre forum communautaire pour suggérer un nouveau calculateur ou utilitaire." },
      { q: "Ces outils sont-ils gratuits ?", a: "Oui, toutes les calculatrices et outils de Nexus Calculator sont 100% gratuits sans restriction d'usage. Notre mission est d'offrir des utilitaires de haute qualité accessibles à tous." },
    ],
  },
  de: {
    heading: "Häufig Gestellte Fragen",
    subtitle: "Alles Wissenswerte über unsere Rechner und Entwickler-Tools.",
    faqs: [
      { q: "Werden meine finanziellen Eingaben gespeichert?", a: "Nein, alle Berechnungen werden vollständig in Ihrem Browser durchgeführt. Wir speichern oder übertragen keinerlei von Ihnen eingegebene Zahlen – Ihre Privatsphäre bleibt zu 100% geschützt." },
      { q: "Wie oft werden die Entwickler-Tools aktualisiert?", a: "Unser Team aktualisiert Parsing-Bibliotheken, Encoder und Formatierer regelmäßig, um stets die neuesten Webstandards und Programmiersprachen zu unterstützen." },
      { q: "Kann ich ein neues Tool anfragen?", a: "Selbstverständlich! Wir entwickeln gezielt Werkzeuge, die von Nutzern gebraucht werden. Nutzen Sie unser Community-Forum, um neue Rechner oder Tools vorzuschlagen." },
      { q: "Sind diese Tools kostenlos nutzbar?", a: "Ja, alle Rechner und Entwickler-Tools auf Nexus Calculator sind 100% kostenlos und ohne Nutzungslimits. Unser Ziel ist es, professionelle Werkzeuge für jeden bereitzustellen." },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. NEWSLETTER
// ─────────────────────────────────────────────────────────────────────────────
export const newsletterCopy: Record<string, {
  heading: string;
  subtitle: string;
}> = {
  en: {
    heading: "Stay Updated",
    subtitle: "Join our newsletter to be the first to know when new developer tools, APIs, and advanced calculators are deployed.",
  },
  es: {
    heading: "Manténgase Informado",
    subtitle: "Suscríbase a nuestro boletín para ser el primero en enterarse del lanzamiento de nuevas herramientas para desarrolladores, APIs y calculadoras avanzadas.",
  },
  fr: {
    heading: "Restez Informé",
    subtitle: "Abonnez-vous à notre newsletter pour être informé en avant-première du déploiement de nouveaux outils pour développeurs, d'APIs et de calculatrices avancées.",
  },
  de: {
    heading: "Bleiben Sie Informiert",
    subtitle: "Abonnieren Sie unseren Newsletter, um als Erster über neue Entwickler-Tools, APIs und Rechner informiert zu werden.",
  },
};
