"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Shield,
  ScanSearch,
  Zap,
  Database,
  GitBranch,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  Globe,
  HeartPulse,
  CreditCard,
  Award,
  ChevronRight,
  Play,
  Users,
  Key,
} from "lucide-react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ParticleGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(139,92,246,0.08) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-violet-500/40"
          style={{
            left: `${(i * 7.3 + 5) % 100}%`,
            top: `${(i * 13.7 + 10) % 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{
            duration: 2 + (i % 4),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/10 hover:border-violet-500/30 rounded-2xl p-6 transition-all duration-300 shadow-sm"
    >
      <div
        className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-slate-900 dark:text-white font-semibold text-base mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

export function StepCard({
  num,
  title,
  desc,
  delay,
}: {
  num: string;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex gap-5"
    >
      <div className="shrink-0 w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
        {num}
      </div>
      <div>
        <h3 className="text-slate-900 dark:text-white font-semibold mb-1">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

interface DbPrivacyCopy {
  heroBadge: string;
  h1Part1: string;
  h1Highlight: string;
  h1Part2: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustBadges: string[];
  scrollLabel: string;
  stats: [string, string, string, string];
  featuresTag: string;
  featuresH2: string;
  featuresSub: string;
  featuresList: { title: string; desc: string }[];
  howTag: string;
  howH2: string;
  steps: { title: string; desc: string }[];
  startFree: string;
  scannerSummary: string;
  complianceTag: string;
  complianceH2: string;
  complianceSub: string;
  readinessScore: string;
  pricingTag: string;
  pricingH2: string;
  pricingSub: string;
  perMonth: string;
  everythingIncluded: string;
  perks: string[];
  launchPlatform: string;
  noSignup: string;
  lovedByDbas: string;
  guidesH2: string;
  guidesSub: string;
  guideCards: { title: string; desc: string; badge: string }[];
  compH2: string;
  compSub: string;
  compFeatureCol: string;
  compRows: string[];
  faqH2: string;
  faqs: { q: string; a: string }[];
  finalH2Part1: string;
  finalH2Highlight: string;
  finalSub: string;
  finalCta: string;
  finalNote: string;
}

const DB_PRIVACY_COPY: Record<string, DbPrivacyCopy> = {
  en: {
    heroBadge: "Free & Open · No credit card required · Enterprise-grade",
    h1Part1: "Enterprise",
    h1Highlight: "Database",
    h1Part2: "Anonymizer",
    heroSubtitle:
      "Scan, mask, and anonymize sensitive data across your entire database infrastructure. GDPR · HIPAA · PCI-DSS compliance — built in, not bolted on.",
    ctaPrimary: "Launch Free Platform",
    ctaSecondary: "See How It Works",
    trustBadges: ["GDPR Ready", "HIPAA Compliant", "PCI-DSS", "SOC 2", "AES-256 Encrypted", "Zero Logs"],
    scrollLabel: "Scroll",
    stats: ["Rows Masked", "PII Types Detected", "Databases Supported", "Compliance Standards"],
    featuresTag: "Platform Features",
    featuresH2: "Enterprise Database Privacy & PII Protection Features",
    featuresSub: "Production-grade data privacy tooling that normally costs thousands per month — completely free.",
    featuresList: [
      {
        title: "PII Auto-Scanner",
        desc: "Automatically detect emails, SSNs, credit cards, phone numbers, IP addresses and 30+ other PII types across all your database columns.",
      },
      {
        title: "Smart Masking Engine",
        desc: "Apply SHA-256 hashing, synthetic data generation, format-preserving encryption, partial redaction, or custom regex patterns per column.",
      },
      {
        title: "Multi-DB Support",
        desc: "Connect PostgreSQL, MySQL, MongoDB, MariaDB, SQLite, Oracle, and SQL Server. Manage dozens of connections from a single dashboard.",
      },
      {
        title: "High-Performance Jobs",
        desc: "Process millions of rows with parallel worker nodes. Schedule recurring masking jobs via cron, get real-time progress and ETA.",
      },
      {
        title: "Compliance Reporting",
        desc: "Generate GDPR Article 30, HIPAA Safe Harbor, and PCI-DSS compliance certificates with one click. Full audit trail included.",
      },
      {
        title: "Projects & Environments",
        desc: "Organise databases, masking profiles, and jobs into Production, Staging, and Development projects with separate access controls.",
      },
      {
        title: "Secrets Manager",
        desc: "Store database credentials with AES-256-GCM encryption. Secrets are never logged or exposed in plain text — ever.",
      },
      {
        title: "Role-Based Access Control",
        desc: "Invite teammates as Admin, Compliance Officer, DBA, Developer, or Read-Only. Full RBAC with granular per-resource permissions.",
      },
    ],
    howTag: "How It Works",
    howH2: "How PII Scanning & Data Masking Works — 3 Simple Steps",
    steps: [
      {
        title: "Connect Your Database",
        desc: "Add a database connection in seconds. PostgreSQL, MySQL, MongoDB, and more — credentials stay encrypted in our AES-256 vault.",
      },
      {
        title: "Scan for Sensitive Data",
        desc: "Run the PII auto-scanner. It detects 30+ data types across every table and column, with risk scores and masking recommendations.",
      },
      {
        title: "Mask & Export",
        desc: "Apply masking rules, run the job, and export your anonymized dataset as CSV, JSON, SQL, Parquet, or push it back to the DB.",
      },
    ],
    startFree: "Start for Free",
    scannerSummary: "6 PII columns found · 3 high-risk · Masking rules ready",
    complianceTag: "Regulatory Compliance",
    complianceH2: "Built for regulated industries",
    complianceSub: "Track your compliance posture against major data protection frameworks and generate audit-ready certificates.",
    readinessScore: "Readiness Score",
    pricingTag: "Pricing",
    pricingH2: "Free Database Privacy Platform — No Credit Card Required",
    pricingSub: "Competitors charge $500–$5,000/month for the same capabilities. We believe data privacy tooling should be accessible to every team.",
    perMonth: "/month",
    everythingIncluded: "Everything included. No feature gates.",
    perks: [
      "Unlimited databases",
      "Unlimited masking jobs",
      "All 30+ PII detectors",
      "GDPR/HIPAA/PCI-DSS reports",
      "API access & webhooks",
      "Team collaboration (RBAC)",
      "AES-256 secrets vault",
      "Job scheduling & history",
    ],
    launchPlatform: "Launch Platform",
    noSignup: "No sign-up required",
    lovedByDbas: "Loved by DBAs worldwide",
    guidesH2: "Privacy & Compliance Guides",
    guidesSub: "In-depth technical guides to help you understand PII scanning, data masking, and regulatory compliance requirements.",
    guideCards: [
      {
        title: "What Is PII Scanning?",
        desc: "Learn how automated PII detection works, what types of sensitive data databases contain, and how to protect against breaches.",
        badge: "7 min read",
      },
      {
        title: "GDPR Database Compliance",
        desc: "A technical guide to GDPR Articles 25 and 32 — encryption, pseudonymisation, data minimisation, and audit logging.",
        badge: "9 min read",
      },
      {
        title: "Data Masking Techniques",
        desc: "Compare hashing, tokenization, redaction, pseudonymisation, and format-preserving encryption with real-world use cases.",
        badge: "8 min read",
      },
      {
        title: "HIPAA Data De-Identification",
        desc: "Safe Harbor vs Expert Determination — which 18 identifiers to remove and how to implement de-identification in SQL.",
        badge: "8 min read",
      },
      {
        title: "PCI DSS PAN Masking",
        desc: "How to truncate, tokenize, and hash Primary Account Numbers to descope your systems from PCI DSS compliance.",
        badge: "7 min read",
      },
      {
        title: "View All Privacy Guides",
        desc: "Browse our full library of data privacy, compliance, and database security guides — all written by engineers.",
        badge: "5 guides",
      },
    ],
    compH2: "Enterprise Privacy Tools — Without the Enterprise Price",
    compSub: "Competitors charge $500–$5,000/month. We charge $0.",
    compFeatureCol: "Feature",
    compRows: [
      "PII Auto-Detection (30+ types)",
      "GDPR / HIPAA / PCI-DSS Reports",
      "Browser-side processing",
      "Job Scheduler",
      "Team Management & RBAC",
      "AES-256 Secrets Vault",
      "Webhook Integrations",
      "Open Source",
      "No credit card required",
    ],
    faqH2: "Frequently Asked Questions",
    faqs: [
      {
        q: "What types of databases does the platform support?",
        a: "The platform supports PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake, and Redshift. New database connectors are added regularly.",
      },
      {
        q: "Is my data safe? Does any data leave my browser?",
        a: "In browser-side scan mode, all data is processed entirely within your browser using WebAssembly — nothing is sent to Nexus servers. For database scan mode, only anonymised metadata (column names, data types, sample statistics) is processed — never raw row values.",
      },
      {
        q: "What PII types can it detect?",
        a: "30+ PII detectors including: names, email addresses, phone numbers, SSNs, credit card numbers (PAN), dates of birth, IP addresses, passport numbers, bank account numbers, IBAN, National IDs, medical record numbers, and more.",
      },
      {
        q: "Which compliance frameworks are supported?",
        a: "The platform provides built-in compliance dashboards and downloadable reports for GDPR, HIPAA, PCI-DSS, and SOC 2. Each framework has a dedicated checklist, compliance score, and remediation recommendations.",
      },
      {
        q: "Is it really free? What is the catch?",
        a: "Yes, completely free. No usage limits, no credit card required, no paywalled features. The platform is open-source and hosted at no cost.",
      },
    ],
    finalH2Part1: "Your data privacy",
    finalH2Highlight: "starts here.",
    finalSub: "Stop exposing sensitive data in dev, staging, and analytics environments. Start masking in minutes.",
    finalCta: "Open the Platform Free",
    finalNote: "No account needed · Open source · GDPR compliant",
  },
  es: {
    heroBadge: "Gratis y Abierto · Sin tarjeta de crédito · Nivel Empresarial",
    h1Part1: "Anonimizador de",
    h1Highlight: "Bases de Datos",
    h1Part2: "Empresarial",
    heroSubtitle:
      "Escanee, enmascare y anonimice datos sensibles en toda su infraestructura de bases de datos. Cumplimiento RGPD · HIPAA · PCI-DSS integrado de forma nativa.",
    ctaPrimary: "Abrir Plataforma Gratis",
    ctaSecondary: "Ver Cómo Funciona",
    trustBadges: ["Listo para RGPD", "Cumple HIPAA", "PCI-DSS", "SOC 2", "Cifrado AES-256", "Cero Registros"],
    scrollLabel: "Desplazar",
    stats: ["Filas Enmascaradas", "Tipos de PII Detectados", "Bases de Datos Soportadas", "Estándares de Cumplimiento"],
    featuresTag: "Funciones de la Plataforma",
    featuresH2: "Funciones Empresariales de Privacidad y Protección PII",
    featuresSub: "Herramientas de privacidad de datos de grado de producción que suelen costar miles de dólares al mes, totalmente gratis.",
    featuresList: [
      {
        title: "Auto-Escáner de PII",
        desc: "Detecte automáticamente correos electrónicos, DNI/SSN, tarjetas de crédito, teléfonos, direcciones IP y más de 30 tipos de PII en todas sus columnas.",
      },
      {
        title: "Motor de Enmascaramiento Inteligente",
        desc: "Aplique hash SHA-256, generación de datos sintéticos, cifrado con preservación de formato (FPE), redacción parcial o expresiones regulares personalizadas.",
      },
      {
        title: "Soporte Multi-Base de Datos",
        desc: "Conecte PostgreSQL, MySQL, MongoDB, MariaDB, SQLite, Oracle y SQL Server. Gestione docenas de conexiones desde un único panel.",
      },
      {
        title: "Trabajos de Alto Rendimiento",
        desc: "Procese millones de filas con nodos paralelos. Programe tareas recurrentes de anonimización mediante cron con progreso en tiempo real.",
      },
      {
        title: "Informes de Cumplimiento",
        desc: "Genere certificados de auditoría para el Artículo 30 del RGPD, HIPAA Safe Harbor y PCI-DSS con un solo clic.",
      },
      {
        title: "Proyectos y Entornos",
        desc: "Organice bases de datos, perfiles de enmascaramiento y tareas en proyectos de Producción, Staging y Desarrollo con controles independientes.",
      },
      {
        title: "Gestor de Secretos",
        desc: "Almacene credenciales de bases de datos con cifrado AES-256-GCM. Las claves nunca se registran ni exponen en texto plano.",
      },
      {
        title: "Control de Acceso Basado en Roles",
        desc: "Invite a su equipo como Administrador, Oficial de Cumplimiento, DBA, Desarrollador o Solo Lectura con permisos granulares RBAC.",
      },
    ],
    howTag: "Cómo Funciona",
    howH2: "Cómo Funciona el Escaneo PII y Enmascaramiento — 3 Pasos Simples",
    steps: [
      {
        title: "Conecte su Base de Datos",
        desc: "Añada una conexión en segundos o cargue su volcado SQL/CSV en el navegador. Las credenciales permanecen cifradas en nuestra bóveda AES-256.",
      },
      {
        title: "Escanee Datos Sensibles",
        desc: "Ejecute el auto-escáner PII. Detecta más de 30 categorías de datos personales en cada tabla y columna con puntuaciones de riesgo.",
      },
      {
        title: "Enmascare y Exporte",
        desc: "Aplique reglas de anonimización y exporte su conjunto de datos seguro en formato CSV, JSON, SQL o Parquet.",
      },
    ],
    startFree: "Comenzar Gratis",
    scannerSummary: "6 columnas PII detectadas · 3 de alto riesgo · Reglas listas",
    complianceTag: "Cumplimiento Normativo",
    complianceH2: "Diseñado para industrias reguladas",
    complianceSub: "Supervise su postura de cumplimiento frente a los principales marcos internacionales de protección de datos y genere informes de auditoría.",
    readinessScore: "Índice de Preparación",
    pricingTag: "Precios",
    pricingH2: "Plataforma Gratuita de Privacidad de Datos — Sin Tarjeta de Crédito",
    pricingSub: "Otros proveedores cobran entre $500 y $5,000 al mes por estas mismas capacidades. Creemos que la seguridad de datos debe ser accesible para todos los equipos.",
    perMonth: "/mes",
    everythingIncluded: "Todo incluido. Sin funciones bloqueadas.",
    perks: [
      "Bases de datos ilimitadas",
      "Tareas de enmascaramiento ilimitadas",
      "Más de 30 detectores PII incluidos",
      "Informes RGPD / HIPAA / PCI-DSS",
      "Acceso API y webhooks",
      "Colaboración en equipo (RBAC)",
      "Bóveda de secretos AES-256",
      "Programador e historial de tareas",
    ],
    launchPlatform: "Abrir Plataforma",
    noSignup: "Sin registro obligatorio",
    lovedByDbas: "Recomendado por DBAs en todo el mundo",
    guidesH2: "Guías de Privacidad y Cumplimiento",
    guidesSub: "Guías técnicas detalladas para comprender la detección de PII, el enmascaramiento criptográfico y las normativas de protección de datos.",
    guideCards: [
      {
        title: "¿Qué es el Escaneo PII?",
        desc: "Aprenda cómo funciona la detección automatizada de datos personales, qué identificadores sensibles contienen las bases de datos y cómo prevenir filtraciones.",
        badge: "7 min de lectura",
      },
      {
        title: "Cumplimiento RGPD en Bases de Datos",
        desc: "Guía técnica sobre los Artículos 25 y 32 del RGPD: cifrado, seudonimización, minimización de datos y registros de auditoría.",
        badge: "9 min de lectura",
      },
      {
        title: "Técnicas de Enmascaramiento de Datos",
        desc: "Compare hashing, tokenización, redacción, seudonimización y cifrado con preservación de formato en casos reales.",
        badge: "8 min de lectura",
      },
      {
        title: "Desidentificación de Datos HIPAA",
        desc: "Safe Harbor frente a Determinación de Expertos: cuáles son los 18 identificadores que deben eliminarse en entornos clínicos SQL.",
        badge: "8 min de lectura",
      },
      {
        title: "Enmascaramiento PAN en PCI DSS",
        desc: "Cómo truncar, tokenizar y aplicar hash a números de tarjetas bancarias (PAN) para cumplir el Requisito 3 de PCI DSS.",
        badge: "7 min de lectura",
      },
      {
        title: "Ver Todas las Guías de Privacidad",
        desc: "Explore nuestra biblioteca completa de guías de seguridad de bases de datos y cumplimiento normativo escritas por ingenieros.",
        badge: "5 guías",
      },
    ],
    compH2: "Herramientas de Privacidad Empresarial — Sin el Precio Empresarial",
    compSub: "La competencia cobra entre $500 y $5,000/mes. Nosotros cobramos $0.",
    compFeatureCol: "Característica",
    compRows: [
      "Detección Automática PII (+30 tipos)",
      "Informes RGPD / HIPAA / PCI-DSS",
      "Procesamiento local en el navegador",
      "Programador de Tareas (Cron)",
      "Gestión de Equipos y RBAC",
      "Bóveda de Secretos AES-256",
      "Integraciones por Webhook",
      "Código Abierto (Open Source)",
      "Sin tarjeta de crédito",
    ],
    faqH2: "Preguntas Frecuentes",
    faqs: [
      {
        q: "¿Qué tipos de bases de datos soporta la plataforma?",
        a: "La plataforma soporta PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake y Redshift. Se añaden nuevos conectores regularmente.",
      },
      {
        q: "¿Están seguros mis datos? ¿Sale algún dato de mi navegador?",
        a: "En el modo de escaneo local en navegador, todos los datos se procesan íntegramente dentro de su navegador mediante WebAssembly; no se envía nada a servidores externos. En el modo de conexión remota, solo se analizan metadatos anonimizados.",
      },
      {
        q: "¿Qué tipos de datos PII puede detectar?",
        a: "Más de 30 detectores PII que incluyen nombres, correos electrónicos, teléfonos, DNI/SSN, números de tarjetas de crédito (PAN), fechas de nacimiento, direcciones IP, pasaportes, cuentas bancarias IBAN e historiales médicos.",
      },
      {
        q: "¿Qué marcos de cumplimiento normativo están incluidos?",
        a: "La plataforma proporciona paneles de control e informes descargables para RGPD (GDPR), HIPAA, PCI-DSS y SOC 2 con listas de verificación y recomendaciones técnicas.",
      },
      {
        q: "¿Es realmente gratis? ¿Cuál es el truco?",
        a: "Sí, es totalmente gratis. Sin límites de uso, sin tarjeta de crédito y sin funciones bloqueadas tras muros de pago.",
      },
    ],
    finalH2Part1: "La privacidad de sus datos",
    finalH2Highlight: "comienza aquí.",
    finalSub: "Deje de exponer datos confidenciales en entornos de desarrollo, pruebas y analítica. Comience a enmascarar en minutos.",
    finalCta: "Abrir la Plataforma Gratis",
    finalNote: "Sin cuenta obligatoria · Código abierto · Compatible con RGPD",
  },
  fr: {
    heroBadge: "Gratuit & Open Source · Sans carte bancaire · Niveau Entreprise",
    h1Part1: "Anonymiseur de",
    h1Highlight: "Bases de Données",
    h1Part2: "Entreprise",
    heroSubtitle:
      "Analysez, masquez et anonymisez les données sensibles sur l’ensemble de votre infrastructure de bases de données. Conformité RGPD · HIPAA · PCI-DSS native.",
    ctaPrimary: "Lancer la Plateforme Gratuite",
    ctaSecondary: "Voir le Fonctionnement",
    trustBadges: ["Prêt pour le RGPD", "Conforme HIPAA", "PCI-DSS", "SOC 2", "Chiffrement AES-256", "Zéro Journal"],
    scrollLabel: "Défiler",
    stats: ["Lignes Masquées", "Types de PII Détectés", "Bases Supportées", "Normes de Conformité"],
    featuresTag: "Fonctionnalités de la Plateforme",
    featuresH2: "Fonctionnalités Entreprise de Confidentialité & Protection PII",
    featuresSub: "Des outils de gouvernance et d’anonymisation de niveau production qui coûtent habituellement des milliers d’euros par mois — entièrement gratuits.",
    featuresList: [
      {
        title: "Auto-Scanner PII",
        desc: "Détectez automatiquement les e-mails, numéros de sécurité sociale, cartes bancaires, téléphones, adresses IP et plus de 30 types de PII dans vos colonnes.",
      },
      {
        title: "Moteur de Masquage Intelligent",
        desc: "Appliquez le hachage SHA-256, la génération de données synthétiques, le chiffrement préservant le format (FPE), le caviardage partiel ou des expressions régulières.",
      },
      {
        title: "Support Multi-Bases de Données",
        desc: "Connectez PostgreSQL, MySQL, MongoDB, MariaDB, SQLite, Oracle et SQL Server. Gérez des dizaines de connexions depuis un tableau de bord unique.",
      },
      {
        title: "Traitement Haute Performance",
        desc: "Traitez des millions de lignes via des nœuds parallèles. Planifiez des tâches récurrentes de masquage par cron avec suivi en temps réel.",
      },
      {
        title: "Rapports de Conformité",
        desc: "Générez en un clic vos certificats de conformité RGPD Article 30, HIPAA Safe Harbor et PCI-DSS avec piste d’audit complète.",
      },
      {
        title: "Projets & Environnements",
        desc: "Organisez vos bases de données, profils de masquage et tâches dans des environnements Production, Staging et Développement distincts.",
      },
      {
        title: "Gestionnaire de Secrets",
        desc: "Stockez vos identifiants de connexion avec un chiffrement AES-256-GCM. Les secrets ne sont jamais journalisés ni exposés en clair.",
      },
      {
        title: "Contrôle d’Accès Basé sur les Rôles",
        desc: "Invitez vos collaborateurs en tant qu’Administrateur, DPO / Responsable Conformité, DBA, Développeur ou Lecture Seule (RBAC granulaire).",
      },
    ],
    howTag: "Fonctionnement",
    howH2: "Comment Fonctionnent l’Analyse PII & le Masquage — 3 Étapes Simples",
    steps: [
      {
        title: "Connectez Votre Base de Données",
        desc: "Ajoutez une connexion en quelques secondes ou chargez un export SQL/CSV dans le navigateur. Vos identifiants restent chiffrés en AES-256.",
      },
      {
        title: "Analysez les Données Sensibles",
        desc: "Lancez l’auto-scanner PII. Il identifie plus de 30 catégories de données personnelles sur chaque table et colonne avec score de risque.",
      },
      {
        title: "Masquez & Exportez",
        desc: "Appliquez vos règles d’anonymisation et exportez votre jeu de données sécurisé au format CSV, JSON, SQL ou Parquet.",
      },
    ],
    startFree: "Démarrer Gratuitement",
    scannerSummary: "6 colonnes PII détectées · 3 à haut risque · Règles prêtes",
    complianceTag: "Conformité Réglementaire",
    complianceH2: "Conçu pour les secteurs réglementés",
    complianceSub: "Suivez votre niveau de conformité face aux grands référentiels internationaux de protection des données et générez des rapports prêts pour l’audit.",
    readinessScore: "Score de Conformité",
    pricingTag: "Tarification",
    pricingH2: "Plateforme Gratuite de Confidentialité des Données — Sans Carte Bancaire",
    pricingSub: "Les solutions concurrentes facturent de 500 € à 5 000 € par mois pour les mêmes fonctionnalités. Nous rendons la protection des données accessible à toutes les équipes.",
    perMonth: "/mois",
    everythingIncluded: "Tout est inclus. Aucune fonctionnalité bridée.",
    perks: [
      "Bases de données illimitées",
      "Tâches de masquage illimitées",
      "Plus de 30 détecteurs PII inclus",
      "Rapports RGPD / HIPAA / PCI-DSS",
      "Accès API & webhooks",
      "Collaboration d’équipe (RBAC)",
      "Coffre-fort de secrets AES-256",
      "Planificateur & historique des tâches",
    ],
    launchPlatform: "Ouvrir la Plateforme",
    noSignup: "Sans inscription obligatoire",
    lovedByDbas: "Plébiscité par les DBA du monde entier",
    guidesH2: "Guides de Confidentialité & Conformité RGPD",
    guidesSub: "Guides techniques approfondis pour maîtriser la détection PII, le masquage de données et les exigences réglementaires.",
    guideCards: [
      {
        title: "Qu’est-ce que le Scan PII ?",
        desc: "Découvrez comment fonctionne la détection automatisée des données personnelles et comment protéger vos bases contre les fuites.",
        badge: "7 min de lecture",
      },
      {
        title: "Conformité RGPD des Bases de Données",
        desc: "Guide technique des articles 25 et 32 du RGPD : chiffrement, pseudonymisation, minimisation des données et journaux d’audit.",
        badge: "9 min de lecture",
      },
      {
        title: "Techniques de Masquage des Données",
        desc: "Comparez le hachage, la tokénisation, le caviardage, la pseudonymisation et le chiffrement préservant le format (FPE).",
        badge: "8 min de lecture",
      },
      {
        title: "Désidentification des Données HIPAA",
        desc: "Safe Harbor vs Détermination d’Expert : quels sont les 18 identifiants à supprimer dans vos bases de données médicales SQL.",
        badge: "8 min de lecture",
      },
      {
        title: "Masquage PAN pour PCI DSS",
        desc: "Comment tronquer, tokéniser et hacher les numéros de cartes bancaires (PAN) pour respecter l’exigence 3 de la norme PCI DSS.",
        badge: "7 min de lecture",
      },
      {
        title: "Voir Tous les Guides de Confidentialité",
        desc: "Parcourez notre bibliothèque complète de guides sur la sécurité des bases de données et la conformité rédigés par des ingénieurs.",
        badge: "5 guides",
      },
    ],
    compH2: "Des Outils de Confidentialité Entreprise — Sans le Prix Entreprise",
    compSub: "Les concurrents facturent 500 $ à 5 000 $/mois. Notre plateforme est à 0 $.",
    compFeatureCol: "Fonctionnalité",
    compRows: [
      "Auto-Détection PII (+30 types)",
      "Rapports RGPD / HIPAA / PCI-DSS",
      "Traitement local dans le navigateur",
      "Planificateur de Tâches (Cron)",
      "Gestion d’Équipe & RBAC",
      "Coffre-fort de Secrets AES-256",
      "Intégrations Webhook",
      "Open Source",
      "Sans carte bancaire",
    ],
    faqH2: "Questions Fréquemment Posées",
    faqs: [
      {
        q: "Quels types de bases de données la plateforme prend-elle en charge ?",
        a: "La plateforme prend en charge PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake et Redshift. De nouveaux connecteurs sont ajoutés régulièrement.",
      },
      {
        q: "Mes données sont-elles en sécurité ? Des données quittent-elles mon navigateur ?",
        a: "En mode d’analyse locale côté navigateur, toutes les données sont traitées intégralement dans votre navigateur via WebAssembly — rien n’est envoyé à nos serveurs. En mode connexion distante, seules des métadonnées anonymisées sont analysées.",
      },
      {
        q: "Quels types de données personnelles (PII) peuvent être détectés ?",
        a: "Plus de 30 détecteurs PII incluant : noms, adresses e-mail, numéros de téléphone, NIR/SSN, numéros de carte bancaire (PAN), dates de naissance, adresses IP, passeports, IBAN et dossiers médicaux.",
      },
      {
        q: "Quels référentiels de conformité sont pris en charge ?",
        a: "La plateforme fournit des tableaux de bord de conformité et des rapports téléchargeables pour le RGPD, HIPAA, PCI-DSS et SOC 2 avec listes de contrôle et recommandations.",
      },
      {
        q: "Est-ce vraiment gratuit ? Quelle est la contrepartie ?",
        a: "Oui, entièrement gratuit. Aucune limite d’utilisation, aucune carte bancaire requise et aucune fonctionnalité payante cachée.",
      },
    ],
    finalH2Part1: "La confidentialité de vos données",
    finalH2Highlight: "commence ici.",
    finalSub: "Cessez d’exposer des données sensibles dans vos environnements de développement, de test et d’analytique. Anonymisez en quelques minutes.",
    finalCta: "Ouvrir la Plateforme Gratuite",
    finalNote: "Sans compte requis · Open source · Conforme au RGPD",
  },
  de: {
    heroBadge: "Kostenlos & Open Source · Keine Kreditkarte erforderlich · Enterprise-Niveau",
    h1Part1: "Enterprise",
    h1Highlight: "Datenbank",
    h1Part2: "Anonymisierer",
    heroSubtitle:
      "Scannen, maskieren und anonymisieren Sie sensible personenbezogene Daten in Ihrer gesamten Datenbank-Infrastruktur. DSGVO · HIPAA · PCI-DSS direkt integriert.",
    ctaPrimary: "Kostenlose Plattform starten",
    ctaSecondary: "So funktioniert es",
    trustBadges: ["DSGVO-konform", "HIPAA-konform", "PCI-DSS", "SOC 2", "AES-256-verschlüsselt", "Zero Logs"],
    scrollLabel: "Scrollen",
    stats: ["Maskierte Zeilen", "Erkannte PII-Typen", "Unterstützte Datenbanken", "Compliance-Standards"],
    featuresTag: "Plattform-Funktionen",
    featuresH2: "Enterprise-Funktionen für Datenbank-Datenschutz & PII-Schutz",
    featuresSub: "Produktionsreife Datenschutz-Werkzeuge, die normalerweise tausende Euro pro Monat kosten — komplett kostenlos.",
    featuresList: [
      {
        title: "PII-Auto-Scanner",
        desc: "Erkennen Sie automatisch E-Mail-Adressen, Sozialversicherungsnummern, Kreditkarten, Telefonnummern, IP-Adressen und über 30 weitere PII-Typen in allen Spalten.",
      },
      {
        title: "Intelligente Maskierungs-Engine",
        desc: "Wenden Sie SHA-256-Hashing, synthetische Datengenerierung, formatbewahrende Verschlüsselung (FPE), Teil-Schwärzung oder eigene Regex-Regeln pro Spalte an.",
      },
      {
        title: "Multi-Datenbank-Unterstützung",
        desc: "Verbinden Sie PostgreSQL, MySQL, MongoDB, MariaDB, SQLite, Oracle und SQL Server. Verwalten Sie dutzende Verbindungen über ein zentrales Dashboard.",
      },
      {
        title: "Hochleistungs-Jobs",
        desc: "Verarbeiten Sie Millionen Zeilen mit parallelen Worker-Nodes. Planen Sie wiederkehrende Maskierungs-Jobs per Cron mit Echtzeit-Fortschrittsanzeige.",
      },
      {
        title: "Compliance-Berichte",
        desc: "Erstellen Sie mit einem Klick DSGVO-Artikel-30-Verzeichnisse, HIPAA-Safe-Harbor- und PCI-DSS-Auditberichte inklusive vollständigem Audit-Trail.",
      },
      {
        title: "Projekte & Umgebungen",
        desc: "Organisieren Sie Datenbanken, Maskierungsprofile und Jobs getrennt nach Produktions-, Staging- und Entwicklungsumgebungen.",
      },
      {
        title: "Secrets Manager",
        desc: "Speichern Sie Datenbank-Zugangsdaten mit AES-256-GCM-Verschlüsselung. Zugangsdaten werden niemals im Klartext protokolliert.",
      },
      {
        title: "Rollenbasierte Zugriffskontrolle",
        desc: "Laden Sie Teammitglieder als Admin, Datenschutzbeauftragter, DBA, Entwickler oder mit Leseberechtigung ein (feingranulares RBAC).",
      },
    ],
    howTag: "Funktionsweise",
    howH2: "Wie PII-Scanning & Datenmaskierung funktioniert — 3 einfache Schritte",
    steps: [
      {
        title: "Datenbank verbinden",
        desc: "Fügen Sie in Sekunden eine Datenbankverbindung hinzu oder laden Sie Ihren SQL/CSV-Dump lokal im Browser. Zugangsdaten bleiben im AES-256-Tresor geschützt.",
      },
      {
        title: "Auf sensible Daten scannen",
        desc: "Starten Sie den PII-Auto-Scanner. Er erkennt über 30 Datenkategorien in jeder Tabelle und Spalte samt Risikobewertung.",
      },
      {
        title: "Maskieren & Exportieren",
        desc: "Wenden Sie Maskierungsregeln an und exportieren Sie Ihren anonymisierten Datensatz als CSV, JSON, SQL oder Parquet.",
      },
    ],
    startFree: "Kostenlos starten",
    scannerSummary: "6 PII-Spalten erkannt · 3 mit hohem Risiko · Maskierungsregeln bereit",
    complianceTag: "Regulatorische Compliance",
    complianceH2: "Entwickelt für regulierte Branchen",
    complianceSub: "Überwachen Sie Ihren Compliance-Status gegenüber führenden Datenschutz-Frameworks und erstellen Sie prüfungssichere Zertifikate.",
    readinessScore: "Compliance-Grad",
    pricingTag: "Preise",
    pricingH2: "Kostenlose Datenbank-Datenschutz-Plattform — Keine Kreditkarte erforderlich",
    pricingSub: "Mitbewerber verlangen 500 € bis 5.000 € pro Monat für dieselben Funktionen. Wir machen professionellen Datenschutz für jedes Team frei zugänglich.",
    perMonth: "/Monat",
    everythingIncluded: "Alles enthalten. Keine gesperrten Funktionen.",
    perks: [
      "Unbegrenzte Datenbanken",
      "Unbegrenzte Maskierungs-Jobs",
      "Alle 30+ PII-Detektoren",
      "DSGVO / HIPAA / PCI-DSS Berichte",
      "API-Zugriff & Webhooks",
      "Team-Zusammenarbeit (RBAC)",
      "AES-256 Secrets-Tresor",
      "Job-Planer & Versionsverlauf",
    ],
    launchPlatform: "Plattform starten",
    noSignup: "Keine Registrierung erforderlich",
    lovedByDbas: "Weltweit von DBAs geschätzt",
    guidesH2: "Datenschutz- & Compliance-Ratgeber",
    guidesSub: "Fundierte technische Leitfäden zu PII-Scanning, Datenmaskierung und gesetzlichen Datenschutzanforderungen.",
    guideCards: [
      {
        title: "Was ist PII-Scanning?",
        desc: "Erfahren Sie, wie automatische PII-Erkennung funktioniert, welche sensiblen Daten Datenbanken enthalten und wie Sie Datenlecks verhindern.",
        badge: "7 Min. Lesezeit",
      },
      {
        title: "DSGVO-Datenbankkonformität",
        desc: "Ein technischer Leitfaden zu Artikel 25 und 32 DSGVO — Verschlüsselung, Pseudonymisierung, Datenminimierung und Audit-Logs.",
        badge: "9 Min. Lesezeit",
      },
      {
        title: "Datenmaskierungstechniken",
        desc: "Vergleichen Sie Hashing, Tokenisierung, Schwärzung, Pseudonymisierung und formatbewahrende Verschlüsselung anhand realer Praxisbeispiele.",
        badge: "8 Min. Lesezeit",
      },
      {
        title: "HIPAA-Datenanonymisierung",
        desc: "Safe Harbor vs. Expert Determination — welche 18 Identifikatoren entfernt werden müssen und wie die Umsetzung in SQL erfolgt.",
        badge: "8 Min. Lesezeit",
      },
      {
        title: "PCI DSS PAN-Maskierung",
        desc: "Wie Sie Kreditkartennummern (PAN) kürzen, tokenisieren und hashen, um PCI-DSS-Anforderung 3 sicher zu erfüllen.",
        badge: "7 Min. Lesezeit",
      },
      {
        title: "Alle Datenschutz-Ratgeber ansehen",
        desc: "Durchsuchen Sie unsere komplette Bibliothek an Fachartikeln zu Datenbanksicherheit und Compliance.",
        badge: "5 Ratgeber",
      },
    ],
    compH2: "Enterprise-Datenschutz-Tools — Ohne den Enterprise-Preis",
    compSub: "Mitbewerber verlangen 500 $–5.000 $/Monat. Bei uns zahlen Sie 0 $.",
    compFeatureCol: "Funktion",
    compRows: [
      "Automatische PII-Erkennung (30+ Typen)",
      "DSGVO / HIPAA / PCI-DSS Berichte",
      "Lokale Browser-Verarbeitung",
      "Job-Scheduler (Cron)",
      "Teamverwaltung & RBAC",
      "AES-256 Secrets-Tresor",
      "Webhook-Integrationen",
      "Open Source",
      "Keine Kreditkarte erforderlich",
    ],
    faqH2: "Häufig gestellte Fragen (FAQ)",
    faqs: [
      {
        q: "Welche Datenbanksysteme unterstützt die Plattform?",
        a: "Die Plattform unterstützt PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Microsoft SQL Server, BigQuery, Snowflake und Redshift. Neue Datenbank-Konnektoren werden laufend ergänzt.",
      },
      {
        q: "Sind meine Daten sicher? Verlassen Daten meinen Browser?",
        a: "Im lokalen Browser-Scan-Modus werden sämtliche Daten vollständig innerhalb Ihres Browsers mittels WebAssembly verarbeitet — es werden keinerlei Daten an unsere Server gesendet.",
      },
      {
        q: "Welche PII-Datentypen werden erkannt?",
        a: "Über 30 PII-Detektoren erkennen Namen, E-Mail-Adressen, Telefonnummern, Sozialversicherungsnummern, Kreditkartennummern (PAN), Geburtsdaten, IP-Adressen, Reisepassnummern, IBAN-Konten und Patientenakten.",
      },
      {
        q: "Welche Compliance-Standards werden unterstützt?",
        a: "Integrierte Compliance-Dashboards und herunterladbare Prüfberichte stehen für DSGVO, HIPAA, PCI-DSS und SOC 2 inklusive Checklisten bereit.",
      },
      {
        q: "Ist die Plattform wirklich kostenlos? Wo ist der Haken?",
        a: "Ja, komplett kostenlos. Keine Nutzungslimits, keine Kreditkarte und keine versteckten Bezahlschranken.",
      },
    ],
    finalH2Part1: "Ihr Datenbank-Datenschutz",
    finalH2Highlight: "beginnt hier.",
    finalSub: "Schützen Sie sensible Daten in Entwicklungs-, Staging- und Analyseumgebungen. Starten Sie die Maskierung in wenigen Minuten.",
    finalCta: "Plattform kostenlos öffnen",
    finalNote: "Kein Konto nötig · Open Source · DSGVO-konform",
  },
};

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/8 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
          >
            <span className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">{item.q}</span>
            <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 ${
              openIdx === i
                ? "bg-violet-600 border-violet-600 text-white rotate-45"
                : "border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 group-hover:border-violet-400 dark:group-hover:border-violet-500"
            }`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          {openIdx === i && (
            <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
              {item.a}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function AnimatedContent({ initialLocale }: { initialLocale?: string }) {
  const params = useParams();
  const locale = initialLocale || (params?.locale as string) || "en";
  const t = DB_PRIVACY_COPY[locale] || DB_PRIVACY_COPY.en;
  const dashboardHref = `/${locale}/database-privacy/dashboard`;

  const featureIcons = [ScanSearch, Shield, Database, Zap, BarChart3, GitBranch, Key, Users];
  const featureColors = [
    "bg-violet-600",
    "bg-blue-600",
    "bg-indigo-600",
    "bg-amber-600",
    "bg-emerald-600",
    "bg-rose-600",
    "bg-teal-600",
    "bg-pink-600",
  ];

  const features = t.featuresList.map((f, idx) => ({
    icon: featureIcons[idx] || Shield,
    title: f.title,
    desc: f.desc,
    color: featureColors[idx] || "bg-violet-600",
    delay: idx * 0.05,
  }));

  const compliance = [
    {
      name: locale === "fr" ? "RGPD" : locale === "de" ? "DSGVO" : "GDPR",
      icon: Globe,
      score: 82,
      region: "EU",
      color:
        "from-blue-500/10 to-indigo-600/5 dark:from-blue-500/20 dark:to-indigo-600/10",
      border: "border-blue-500/20 dark:border-blue-500/30",
    },
    {
      name: "HIPAA",
      icon: HeartPulse,
      score: 91,
      region: "USA",
      color:
        "from-rose-500/10 to-pink-600/5 dark:from-rose-500/20 dark:to-pink-600/10",
      border: "border-rose-500/20 dark:border-rose-500/30",
    },
    {
      name: "PCI-DSS",
      icon: CreditCard,
      score: 78,
      region: "Global",
      color:
        "from-amber-500/10 to-orange-600/5 dark:from-amber-500/20 dark:to-orange-600/10",
      border: "border-amber-500/20 dark:border-amber-500/30",
    },
    {
      name: "SOC 2",
      icon: Award,
      score: 65,
      region: "USA",
      color:
        "from-violet-500/10 to-purple-600/5 dark:from-violet-500/20 dark:to-purple-600/10",
      border: "border-violet-500/20 dark:border-violet-500/30",
    },
  ];

  const stats = [
    { label: t.stats[0], value: 2400000, suffix: "+" },
    { label: t.stats[1], value: 30, suffix: "+" },
    { label: t.stats[2], value: 9, suffix: "" },
    { label: t.stats[3], value: 4, suffix: "" },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <ParticleGrid />

        {/* Radial glow blobs adapted for light/dark */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-white to-indigo-50/50 dark:from-[#080D18] dark:via-[#0A0F1A] dark:to-[#080D18] -z-10" />

        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 rounded-full px-4 py-2 text-sm text-violet-700 dark:text-violet-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            {t.heroBadge}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-slate-900 dark:text-white">{t.h1Part1}</span>{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6)",
              }}
            >
              {t.h1Highlight}
            </span>
            <br />
            <span className="text-slate-900 dark:text-white">{t.h1Part2}</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={dashboardHref}
              rel="nofollow"
              className="group flex items-center gap-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02]"
            >
              {t.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white font-medium text-lg px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all"
            >
              <Play className="w-4 h-4" /> {t.ctaSecondary}
            </a>
          </motion.div>

          {/* Compliance trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-12"
          >
            {t.trustBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/50 bg-white/50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-full px-3 py-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-white/20"
        >
          <span className="text-xs">{t.scrollLabel}</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-300 dark:from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <p className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-slate-500 dark:text-white/40">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-24 px-4 bg-white dark:bg-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
              {t.featuresTag}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4">
              {t.featuresH2}
            </h2>
            <p className="text-lg text-slate-600 dark:text-white/50 max-w-2xl mx-auto">
              {t.featuresSub}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-white/[0.015]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                {t.howTag}
              </span>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-3 mb-8">
                {t.howH2}
              </h2>
            </motion.div>
            <div className="space-y-8">
              {t.steps.map((s, idx) => (
                <StepCard
                  key={idx}
                  num={String(idx + 1)}
                  title={s.title}
                  desc={s.desc}
                  delay={idx * 0.1}
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-10"
            >
              <Link
                href={dashboardHref}
                rel="nofollow"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                {t.startFree} <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#0A0F1A] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xl dark:shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-slate-400 dark:text-white/30 font-mono">
                scanner · production-postgres
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              {[
                { col: "users.email", type: "Email", risk: "High", conf: 99 },
                {
                  col: "users.full_name",
                  type: "Full Name",
                  risk: "Medium",
                  conf: 95,
                },
                {
                  col: "payments.pan",
                  type: "Credit Card",
                  risk: "High",
                  conf: 100,
                },
                { col: "employees.ssn", type: "SSN", risk: "High", conf: 100 },
                {
                  col: "events.client_ip",
                  type: "IP Address",
                  risk: "Low",
                  conf: 88,
                },
                { col: "users.phone", type: "Phone", risk: "Medium", conf: 92 },
              ].map((row, i) => (
                <motion.div
                  key={row.col}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center justify-between bg-slate-50 dark:bg-white/[0.03] rounded-lg px-3 py-2"
                >
                  <span className="text-slate-700 dark:text-white/70">
                    {row.col}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-violet-600 dark:text-violet-400 text-[10px]">
                      {row.type}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${row.risk === "High" ? "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/10" : row.risk === "Medium" ? "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/10" : "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10"}`}
                    >
                      {row.risk}
                    </span>
                    <div className="w-8 h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-violet-500 rounded-full"
                        style={{ width: `${row.conf}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t.scannerSummary}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Compliance section ────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
              {t.complianceTag}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4">
              {t.complianceH2}
            </h2>
            <p className="text-lg text-slate-600 dark:text-white/50 max-w-2xl mx-auto">
              {t.complianceSub}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {compliance.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6 text-center shadow-sm`}
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-6 h-6 text-slate-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                  {s.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-white/40 mb-4">
                  {s.region}
                </p>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                  {s.score}%
                </div>
                <div className="h-2 bg-slate-200 dark:bg-black/20 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-violet-500 dark:bg-white/50 rounded-full"
                    style={{ width: `${s.score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-white/50">
                  {t.readinessScore}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why free section ──────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-white/[0.015]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
              {t.pricingTag}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4">
              {t.pricingH2}
            </h2>
            <p className="text-lg text-slate-600 dark:text-white/50 max-w-2xl mx-auto">
              {t.pricingSub}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-violet-50 to-indigo-50/50 dark:from-violet-500/10 dark:to-indigo-600/5 border border-violet-200 dark:border-violet-500/20 rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                  $0{" "}
                  <span className="text-2xl text-slate-500 dark:text-white/40 font-normal">
                    {t.perMonth}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-white/60 mb-6 text-lg">
                  {t.everythingIncluded}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.perks.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-white/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-center mt-6 md:mt-0">
                <Link
                  href={dashboardHref}
                  rel="nofollow"
                  className="inline-flex flex-col items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-lg shadow-violet-500/25 hover:scale-[1.02]"
                >
                  {t.launchPlatform}
                  <span className="text-xs font-normal text-violet-200 opacity-80">
                    {t.noSignup}
                  </span>
                </Link>
                <div className="flex items-center justify-center gap-1 mt-4 text-xs text-slate-500 dark:text-white/40">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-1">{t.lovedByDbas}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Privacy & Compliance Guides ──────────────────────────── */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t.guidesH2}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t.guidesSub}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const guidesPrefix = locale === "es" ? "guias" : locale === "de" ? "anleitungen" : "guides";
              const slugMap: Record<string, Record<string, string>> = {
                "what-is-pii-scanning": {
                  en: "what-is-pii-scanning",
                  es: "que-es-el-escaneo-pii",
                  fr: "quest-ce-que-le-scan-pii",
                  de: "was-ist-pii-scanning",
                },
                "gdpr-database-compliance": {
                  en: "gdpr-database-compliance",
                  es: "cumplimiento-gdpr-base-datos",
                  fr: "conformite-rgpd-base-de-donnees",
                  de: "dsgvo-datenbankkonformitaet",
                },
                "data-masking-techniques": {
                  en: "data-masking-techniques",
                  es: "tecnicas-enmascaramiento-datos",
                  fr: "techniques-masquage-donnees",
                  de: "datenmaskierungstechniken",
                },
                "hipaa-data-de-identification": {
                  en: "hipaa-data-de-identification",
                  es: "desidentificacion-datos-hipaa",
                  fr: "de-identification-donnees-hipaa",
                  de: "hipaa-datenanonymisierung",
                },
                "pci-dss-pan-masking": {
                  en: "pci-dss-pan-masking",
                  es: "enmascaramiento-pan-pci-dss",
                  fr: "masquage-pan-pci-dss",
                  de: "pci-dss-pan-maskierung",
                },
              };
              const guideUrl = (enSlug: string) =>
                `/${locale}/${guidesPrefix}/${slugMap[enSlug]?.[locale] || enSlug}`;
              const hrefs = [
                guideUrl("what-is-pii-scanning"),
                guideUrl("gdpr-database-compliance"),
                guideUrl("data-masking-techniques"),
                guideUrl("hipaa-data-de-identification"),
                guideUrl("pci-dss-pan-masking"),
                `/${locale}/${guidesPrefix}`,
              ];
              const colors = ["violet", "blue", "emerald", "rose", "amber", "sky"];

              return t.guideCards.map((card, idx) => ({
                ...card,
                href: hrefs[idx] || `/${locale}/${guidesPrefix}`,
                color: colors[idx] || "violet",
                isViewAll: idx === 5,
              }));
            })().map((guide, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={guide.href as any}
                  className={`group block h-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/8 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
                    guide.isViewAll
                      ? "border-dashed hover:border-violet-400 dark:hover:border-violet-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-${
                        guide.color
                      }-50 dark:bg-${guide.color}-500/10 text-${guide.color}-700 dark:text-${guide.color}-400`}
                    >
                      {guide.badge}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3
                    className={`text-base font-bold mb-2 ${
                      guide.isViewAll
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {guide.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Competitor Comparison ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white dark:bg-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t.compH2}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {t.compSub}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-white/10">
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{t.compFeatureCol}</th>
                  <th className="px-6 py-4 font-bold text-violet-600 dark:text-violet-400 text-center">
                    Nexus
                    <div className="text-xs font-normal text-emerald-600 dark:text-emerald-400">$0 {t.perMonth}</div>
                  </th>
                  <th className="px-6 py-4 font-medium text-slate-500 text-center">
                    Tonic.ai
                    <div className="text-xs">$500+{t.perMonth}</div>
                  </th>
                  <th className="px-6 py-4 font-medium text-slate-500 text-center">
                    Delphix
                    <div className="text-xs">$2,000+{t.perMonth}</div>
                  </th>
                  <th className="px-6 py-4 font-medium text-slate-500 text-center">
                    IBM Optim
                    <div className="text-xs">$5,000+{t.perMonth}</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {[
                  [t.compRows[0], true, true, true, true],
                  [t.compRows[1], true, true, true, true],
                  [t.compRows[2], true, false, false, false],
                  [t.compRows[3], true, true, true, true],
                  [t.compRows[4], true, true, true, true],
                  [t.compRows[5], true, false, true, true],
                  [t.compRows[6], true, true, false, true],
                  [t.compRows[7], true, false, false, false],
                  [t.compRows[8], true, false, false, false],
                ].map(([feature, ...vals], ri) => (
                  <tr key={ri} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5 text-slate-700 dark:text-slate-300 font-medium">{feature as string}</td>
                    {vals.map((v, ci) => (
                      <td key={ci} className="px-6 py-3.5 text-center">
                        {v ? (
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${ci === 0 ? "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}`}>
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400">
                            ✗
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t.faqH2}
            </h2>
          </motion.div>
          <FAQ items={t.faqs} />
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="relative py-32 px-4 overflow-hidden bg-white dark:bg-transparent">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(139,92,246,0.15) 0%, transparent 70%)",
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            {t.finalH2Part1}
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              }}
            >
              {t.finalH2Highlight}
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-white/50 mb-10">
            {t.finalSub}
          </p>
          <Link
            href={dashboardHref}
            rel="nofollow"
            className="inline-flex items-center gap-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xl px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-violet-500/30 hover:scale-[1.02]"
          >
            {t.finalCta}
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-sm text-slate-500 dark:text-white/30 mt-4">
            {t.finalNote}
          </p>
        </motion.div>
      </section>
    </>
  );
}
