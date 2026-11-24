import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ShieldCheck, BookOpenCheck, Scale, CheckCircle2, Mail, ArrowRight, FileCheck2, Landmark, HeartPulse, FlaskConical } from 'lucide-react';
import { getCanonicalAndAlternates, getCanonicalUrl, optimizeSerpTitle } from '@/lib/utils/seoUtils';
import { LocaleSiblingLinks } from '@/app/components/LocaleSiblingLinks';

export const revalidate = false;
export const dynamicParams = false;

interface EditorialCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  crumb: string;
  badge: string;
  h1: string;
  subtitle: string;
  lastReviewedLabel: string;
  lastReviewedDate: string;
  standardsHeading: string;
  standardsIntro: string;
  domains: { icon: 'finance' | 'health' | 'science'; title: string; authority: string; detail: string }[];
  workflowHeading: string;
  workflowSteps: { title: string; body: string }[];
  privacyHeading: string;
  privacyBody: string;
  adsHeading: string;
  adsBody: string;
  correctionsHeading: string;
  correctionsBody: string;
  authorHeading: string;
  authorRole: string;
  authorBio: string;
  portfolioCta: string;
  contactCta: string;
}

const COPY: Record<string, EditorialCopy> = {
  en: {
    metaTitle: 'Editorial Policy & Formula Verification Standards | Nexus Calculator',
    metaDescription: 'Learn how Nexus Calculator verifies financial, clinical, mathematical, and scientific equations, ensures client-side privacy, maintains editorial independence, and processes corrections.',
    home: 'Home',
    crumb: 'Editorial Policy',
    badge: 'YMYL Quality & Verification Standards',
    h1: 'Editorial Policy & Formula Verification Standards',
    subtitle: 'How Nexus Calculator sources mathematical equations, validates numerical accuracy across financial, health, and scientific tools, and maintains strict separation between editorial integrity and advertising.',
    lastReviewedLabel: 'Policy Last Reviewed:',
    lastReviewedDate: 'November 24, 2026',
    standardsHeading: '1. Primary Authoritative Sources by Discipline',
    standardsIntro: 'Calculators and guides covering personal finance, health metrics, and engineering constants directly impact real-world decisions. Every calculation engine on Nexus Calculator is benchmarked against published institutional and regulatory references:',
    domains: [
      {
        icon: 'finance',
        title: 'Financial, Lending & Tax Models',
        authority: 'CFPB Regulation Z, IRS Publications, EU Consumer Credit Directive (TAEG/Effektivzins)',
        detail: 'Amortization schedules, APR/APY conversions, compound growth, retirement limits (401(k), Roth IRA, RMD), and discounted cash-flow models (NPV/IRR) are verified against published actuarial identities and current statutory thresholds.',
      },
      {
        icon: 'health',
        title: 'Biometric & Nutritional Screening',
        authority: 'World Health Organization (WHO), NIH, Mifflin-St Jeor & ACE Guidelines',
        detail: 'BMI classifications follow WHO cutoffs; basal metabolic rate (BMR) uses the peer-reviewed Mifflin-St Jeor equation; body-fat estimation implements published US Navy circumference formulas with clear clinical disclaimers.',
      },
      {
        icon: 'science',
        title: 'Physics, Chemistry & Developer Utilities',
        authority: 'NIST CODATA Constants, ISO 80000-2, RFC Specifications & W3C Standards',
        detail: 'Electrical, thermodynamic, stoichiometric, and statistical equations use current NIST constants. Developer utilities conform strictly to RFC 8259 (JSON), RFC 7519 (JWT), RFC 3986 (URI), and Web Crypto API standards.',
      },
    ],
    workflowHeading: '2. Four-Stage Verification & Publication Workflow',
    workflowSteps: [
      {
        title: 'Stage 1 — Formula Sourcing & Boundary Audit',
        body: 'Each calculator begins with an explicit closed-form equation or iterative numerical solver (such as Newton-Raphson for IRR) checked for edge cases including zero interest rates, negative cash flows, and unit conversions.',
      },
      {
        title: 'Stage 2 — Independent Worked-Example Cross-Check',
        body: 'Before publishing or updating a tool, outputs are cross-checked against hand-calculated reference cases and published institutional tables across both US Imperial and SI Metric conventions.',
      },
      {
        title: 'Stage 3 — Multilingual Technical Review (EN, DE, ES, FR)',
        body: 'Every guide, formula explanation, and comparison table is localized into native English, German, Spanish, and French terminology—adapting regional concepts such as Effektivzins, Sondertilgung, TAE, and TAEG.',
      },
      {
        title: 'Stage 4 — Periodic Re-Calibration',
        body: 'Annual statutory figures (such as retirement contribution caps, tax thresholds, and mortgage benchmarks) are reviewed regularly and updated with visible modification dates.',
      },
    ],
    privacyHeading: '3. Client-Side Execution & Data Privacy',
    privacyBody: 'All financial inputs, biometric measurements, code snippets, images, and PDF files processed through our browser tools execute strictly inside local browser memory (JavaScript and WebAssembly). Nexus Calculator does not transmit, store, or monetize user calculation inputs on remote servers.',
    adsHeading: '4. Advertising Disclosure & Editorial Independence',
    adsBody: 'Nexus Calculator is free to use and supported by non-intrusive display advertising (including Google AdSense) subject to user consent preferences under GDPR and Google Consent Mode v2. Advertisers have zero influence over calculation formulas, comparison verdicts, tool rankings, or educational guides. Ads are strictly disabled on legal, policy, authentication, search, and error pages.',
    correctionsHeading: '5. Corrections & Feedback Policy',
    correctionsBody: 'If you identify a formula discrepancy, outdated regulatory threshold, unit conversion edge case, or localization error on any page, please report it directly to our engineering team. Verified mathematical or factual errors are prioritized and patched promptly.',
    authorHeading: 'Editorial Oversight & Lead Systems Architect',
    authorRole: 'Founder & Lead Systems Architect — Nexus Calculator',
    authorBio: 'MD Abu Hanif Mia oversees platform architecture, numerical testing, client-side privacy tooling, and multilingual content verification across Nexus Calculator.',
    portfolioCta: 'View Architect Profile',
    contactCta: 'Report a Correction or Formula Issue',
  },
  es: {
    metaTitle: 'Política Editorial y Estándares de Verificación | Nexus Calculator',
    metaDescription: 'Conozca cómo Nexus Calculator verifica fórmulas financieras, clínicas y científicas, protege la privacidad local, mantiene su independencia editorial y gestiona correcciones.',
    home: 'Inicio',
    crumb: 'Política Editorial',
    badge: 'Estándares de Calidad y Verificación',
    h1: 'Política Editorial y Estándares de Verificación de Fórmulas',
    subtitle: 'Cómo seleccionamos ecuaciones matemáticas, validamos resultados en herramientas financieras, médicas y científicas, y garantizamos una separación total entre el rigor editorial y la publicidad.',
    lastReviewedLabel: 'Última revisión de la política:',
    lastReviewedDate: '24 de noviembre de 2026',
    standardsHeading: '1. Fuentes Institucionales Primarias por Disciplina',
    standardsIntro: 'Las calculadoras de finanzas personales, salud e ingeniería influyen en decisiones reales. Cada motor de cálculo de Nexus Calculator se contrasta con referencias técnicas e institucionales publicadas:',
    domains: [
      {
        icon: 'finance',
        title: 'Modelos Financieros, Créditos e Impuestos',
        authority: 'Directiva Europea de Crédito (TAE), CFPB Regulation Z y Publicaciones del IRS',
        detail: 'Los cuadros de amortización, conversiones TIN/TAE, interés compuesto, límites de jubilación y métricas VAN/TIR se contrastan con fórmulas actuariales estándar y umbrales vigentes.',
      },
      {
        icon: 'health',
        title: 'Biometría y Nutrición Clínica',
        authority: 'Organización Mundial de la Salud (OMS), NIH y Ecuación Mifflin-St Jeor',
        detail: 'Las clasificaciones de IMC siguen los rangos oficiales de la OMS; el metabolismo basal (TMB/BMR) emplea Mifflin-St Jeor; y el porcentaje de grasa corporal aplica fórmulas antropométricas validadas con avisos médicos claros.',
      },
      {
        icon: 'science',
        title: 'Física, Química y Utilidades de Desarrollo',
        authority: 'Constantes NIST CODATA, ISO 80000-2 y Especificaciones RFC/W3C',
        detail: 'Las calculadoras científicas emplean constantes NIST actualizadas. Nuestras herramientas para desarrolladores cumplen estrictamente RFC 8259 (JSON), RFC 7519 (JWT), RFC 3986 (URI) y Web Crypto API.',
      },
    ],
    workflowHeading: '2. Protocolo de Verificación en Cuatro Etapas',
    workflowSteps: [
      {
        title: 'Etapa 1 — Selección de Fórmula y Casos Límite',
        body: 'Cada herramienta parte de una ecuación matemática explícita o un resolutor numérico verificado (como Newton-Raphson para la TIR), probando tasas cero, flujos negativos y conversiones de unidades.',
      },
      {
        title: 'Etapa 2 — Contraste con Ejemplos Numéricos Independientes',
        body: 'Antes de publicar o actualizar una calculadora, verificamos sus salidas frente a cálculos manuales y tablas de referencia en sistema métrico internacional (SI) e imperial.',
      },
      {
        title: 'Etapa 3 — Revisión Técnica Multilingüe (ES, EN, FR, DE)',
        body: 'Cada guía, fórmula y tabla comparativa se redacta con terminología técnica nativa en español, inglés, francés y alemán, adaptando conceptos como TAE, amortización anticipada y unidades métricas.',
      },
      {
        title: 'Etapa 4 — Recalibración Periódica',
        body: 'Los topes regulatorios anuales y parámetros de referencia se revisan periódicamente y reflejan fechas de actualización transparentes.',
      },
    ],
    privacyHeading: '3. Ejecución 100 % Local y Privacidad',
    privacyBody: 'Todos los importes financieros, medidas corporales, fragmentos de código, imágenes y archivos PDF se procesan únicamente en la memoria local de su navegador (JavaScript y WebAssembly). Nunca almacenamos ni vendemos los datos introducidos en nuestras calculadoras.',
    adsHeading: '4. Transparencia Publicitaria e Independencia Editorial',
    adsBody: 'Nexus Calculator es gratuito y se financia mediante publicidad gráfica no intrusiva (como Google AdSense), respetando las preferencias de consentimiento del RGPD y Google Consent Mode v2. Los anunciantes no tienen ninguna influencia sobre las fórmulas, veredictos comparativos o contenidos educativos.',
    correctionsHeading: '5. Política de Correcciones',
    correctionsBody: 'Si detecta un error matemático, un límite normativo desactualizado o una imprecisión de localización en cualquier página, comuníquelo directamente a nuestro equipo técnico para su revisión prioritaria.',
    authorHeading: 'Dirección Técnica y Supervisión Editorial',
    authorRole: 'Fundador y Arquitecto Principal de Sistemas — Nexus Calculator',
    authorBio: 'MD Abu Hanif Mia dirige la arquitectura de la plataforma, la validación numérica, las herramientas de privacidad local y el control de calidad editorial multilingüe de Nexus Calculator.',
    portfolioCta: 'Ver Perfil del Arquitecto',
    contactCta: 'Reportar una Corrección',
  },
  fr: {
    metaTitle: 'Politique Éditoriale et Normes de Vérification | Nexus Calculator',
    metaDescription: 'Découvrez comment Nexus Calculator vérifie ses formules financières, médicales et scientifiques, protège la confidentialité locale et garantit son indépendance éditoriale.',
    home: 'Accueil',
    crumb: 'Politique Éditoriale',
    badge: 'Normes de Qualité & Vérification',
    h1: 'Politique Éditoriale et Normes de Vérification des Formules',
    subtitle: 'Comment Nexus Calculator sélectionne ses équations, contrôle l’exactitude numérique des outils financiers, médicaux et scientifiques et maintient une indépendance stricte vis-à-vis de la publicité.',
    lastReviewedLabel: 'Dernière révision de la politique :',
    lastReviewedDate: '24 novembre 2026',
    standardsHeading: '1. Sources Institutionnelles de Référence par Domaine',
    standardsIntro: 'Les calculatrices financières, de santé et d’ingénierie éclairent des décisions concrètes. Chaque moteur de calcul de Nexus Calculator s’appuie sur des référentiels reconnus :',
    domains: [
      {
        icon: 'finance',
        title: 'Finance, Crédit et Fiscalité',
        authority: 'Directive Européenne Crédit (TAEG), CFPB Regulation Z & Standards Actuariels',
        detail: 'Les tableaux d’amortissement, conversions taux nominal/TAEG, intérêts composés, plans de retraite et modèles VAN/TRI sont contrôlés selon les conventions actuarielles publiées.',
      },
      {
        icon: 'health',
        title: 'Biométrie et Nutrition Clinique',
        authority: 'Organisation Mondiale de la Santé (OMS), NIH et Équation Mifflin-St Jeor',
        detail: 'Les seuils d’IMC suivent les recommandations de l’OMS ; le métabolisme de base (MB/BMR) repose sur Mifflin-St Jeor ; le calcul de masse grasse applique les formules anthropométriques publiées avec mentions médicales claires.',
      },
      {
        icon: 'science',
        title: 'Physique, Chimie et Outils Développeur',
        authority: 'Constantes NIST CODATA, ISO 80000-2 et Spécifications RFC / W3C',
        detail: 'Les outils scientifiques utilisent les constantes NIST à jour. Les utilitaires développeur respectent strictement RFC 8259 (JSON), RFC 7519 (JWT), RFC 3986 (URI) et l’API Web Crypto.',
      },
    ],
    workflowHeading: '2. Processus de Vérification en Quatre Étapes',
    workflowSteps: [
      {
        title: 'Étape 1 — Vérification Mathématique et Cas Limites',
        body: 'Chaque calculatrice repose sur une formule analytique explicite ou un solveur numérique éprouvé (comme Newton-Raphson pour le TRI), testé sur les cas limites (taux nul, flux négatifs, conversions d’unités).',
      },
      {
        title: 'Étape 2 — Contrôle Croisé par Exemples Chiffrés',
        body: 'Avant toute mise en ligne, les résultats sont comparés à des calculs manuels vérifiés et des tables de référence en système métrique (SI) et impérial.',
      },
      {
        title: 'Étape 3 — Relecture Technique Multilingue (FR, EN, DE, ES)',
        body: 'Chaque guide, formule et tableau comparatif est rédigé dans une terminologie native en français, anglais, allemand et espagnol (TAEG, remboursement anticipé, unités SI).',
      },
      {
        title: 'Étape 4 — Révision Périodique',
        body: 'Les plafonds réglementaires annuels et repères financiers sont vérifiés régulièrement et mis à jour avec des dates transparentes.',
      },
    ],
    privacyHeading: '3. Exécution 100 % Locale et Confidentialité',
    privacyBody: 'Toutes les données financières, mesures biométriques, extraits de code, images et fichiers PDF sont traités exclusivement dans la mémoire locale de votre navigateur (JavaScript et WebAssembly). Aucune saisie n’est transmise ni stockée sur nos serveurs.',
    adsHeading: '4. Transparence Publicitaire et Indépendance Éditoriale',
    adsBody: 'Nexus Calculator est gratuit et financé par des espaces publicitaires discrets (dont Google AdSense) dans le respect du RGPD et de Google Consent Mode v2. Les annonceurs n’ont aucune influence sur les formules, comparatifs ou guides techniques.',
    correctionsHeading: '5. Politique de Correction',
    correctionsBody: 'Si vous repérez une erreur de formule, un seuil obsolète ou une imprécision linguistique, signalez-le directement à notre équipe technique afin que nous appliquions un correctif rapide.',
    authorHeading: 'Supervision Éditoriale & Architecture Systèmes',
    authorRole: 'Fondateur et Architecte Systèmes Principal — Nexus Calculator',
    authorBio: 'MD Abu Hanif Mia supervise l’architecture technique, la validation numérique, les outils de confidentialité côté client et la qualité éditoriale multilingue de Nexus Calculator.',
    portfolioCta: 'Voir le Profil de l’Architecte',
    contactCta: 'Signaler une Correction',
  },
  de: {
    metaTitle: 'Redaktionsrichtlinien & Formelprüfung | Nexus Calculator',
    metaDescription: 'Erfahren Sie, wie Nexus Calculator Finanz-, Gesundheits- und Wissenschaftsformeln prüft, 100 % lokalen Datenschutz garantiert, redaktionell unabhängig bleibt und Korrekturen umsetzt.',
    home: 'Startseite',
    crumb: 'Redaktionsrichtlinien',
    badge: 'Qualitäts- & Prüfstandards (YMYL)',
    h1: 'Redaktionsrichtlinien & Standards zur Formelprüfung',
    subtitle: 'Wie Nexus Calculator mathematische Gleichungen aus Primärquellen bezieht, Rechenmodelle in Finanzen, Gesundheit und Technik validiert und strikte Unabhängigkeit von Werbung wahrt.',
    lastReviewedLabel: 'Richtlinie zuletzt geprüft:',
    lastReviewedDate: '24. November 2026',
    standardsHeading: '1. Fachliche Primärquellen nach Themenbereich',
    standardsIntro: 'Rechner und Ratgeber zu Baufinanzierung, Altersvorsorge, Gesundheit und Naturwissenschaften unterstützen reale Entscheidungen. Jedes Rechenmodul auf Nexus Calculator orientiert sich an anerkannten Standards:',
    domains: [
      {
        icon: 'finance',
        title: 'Finanz-, Kredit- & Steuermodelle',
        authority: 'PAngV / EU-Verbraucherkreditrichtlinie (Effektivzins), CFPB Reg. Z & Versicherungsmathematik',
        detail: 'Annuitäten-Tilgungspläne, Effektivzins- und Zinseszinsformeln, Sondertilgungen sowie Barwert- und Renditemodelle (NPV/IRR) werden gegen veröffentlichte finanzmathematische Standards geprüft.',
      },
      {
        icon: 'health',
        title: 'Biometrie & Ernährungsmedizin',
        authority: 'Weltgesundheitsorganisation (WHO), NIH & Mifflin-St-Jeor-Formel',
        detail: 'BMI-Grenzwerte entsprechen den WHO-Klassifikationen; der Grundumsatz (BMR) nutzt die klinisch validierte Mifflin-St-Jeor-Gleichung; Körperfett-Schätzungen folgen anerkannten anthropometrischen Modellen inklusive medizinischer Hinweise.',
      },
      {
        icon: 'science',
        title: 'Physik, Chemie & Entwickler-Tools',
        authority: 'NIST CODATA-Konstanten, ISO 80000-2 sowie RFC- & W3C-Spezifikationen',
        detail: 'Naturwissenschaftliche Rechner nutzen aktuelle NIST-Konstanten und SI-Einheiten. Entwickler-Werkzeuge orientieren sich strikt an RFC 8259 (JSON), RFC 7519 (JWT), RFC 3986 (URI) und der Web Crypto API.',
      },
    ],
    workflowHeading: '2. Vierstufiger Prüf- und Veröffentlichungsprozess',
    workflowSteps: [
      {
        title: 'Stufe 1 — Formelherleitung & Grenzwertprüfung',
        body: 'Jeder Rechner basiert auf einer dokumentierten analytischen Gleichung oder einem stabilen numerischen Verfahren (z. B. Newton-Raphson für den internen Zinsfuß) mit Tests für Sonderfälle wie 0 % Zinsen oder Einheitenwechsel.',
      },
      {
        title: 'Stufe 2 — Unabhängige Gegenrechnung mit Referenzwerten',
        body: 'Vor jeder Veröffentlichung oder Aktualisierung prüfen wir Ergebnisse anhand manuell durchgerechneter Referenzbeispiele im metrischen SI-System (EUR, kg, cm, kWh) sowie im US-System.',
      },
      {
        title: 'Stufe 3 — Fachsprachliche Prüfung in vier Sprachen (DE, EN, ES, FR)',
        body: 'Ratgeber, Formelerklärungen und Vergleichstabellen werden fachlich sauber im jeweiligen Sprachraum verfasst – inklusive authentischer Begriffe wie Effektivzins p. a., Tilgungsplan und Sondertilgung.',
      },
      {
        title: 'Stufe 4 — Regelmäßige Aktualisierung',
        body: 'Jährliche gesetzliche Grenzwerte und Markt-Referenzsätze werden laufend überprüft und mit transparentem Änderungsdatum dokumentiert.',
      },
    ],
    privacyHeading: '3. 100 % lokale Browser-Ausführung & DSGVO-Datenschutz',
    privacyBody: 'Sämtliche Finanzdaten, Körpermaße, Quellcodes, Bilder und PDF-Dokumente werden ausschließlich lokal im Arbeitsspeicher Ihres Browsers (JavaScript und WebAssembly) verarbeitet. Nexus Calculator speichert oder überträgt keine Ihrer Recheneingaben auf externe Server.',
    adsHeading: '4. Werbekennzeichnung & Redaktionelle Unabhängigkeit',
    adsBody: 'Nexus Calculator ist kostenlos nutzbar und finanziert sich über unaufdringliche Display-Werbung (einschließlich Google AdSense) unter voller Einhaltung der DSGVO und des Google Consent Mode v2. Werbepartner haben keinerlei Einfluss auf Formeln, Vergleichsurteile oder Ratgeberinhalte. Auf Rechts-, Richtlinien-, Such- und Fehlerseiten werden grundsätzlich keine Anzeigen ausgespielt.',
    correctionsHeading: '5. Korrektur- und Feedback-Verfahren',
    correctionsBody: 'Wenn Sie eine mathematische Abweichung, veraltete Grenzwerte oder sprachliche Unstimmigkeiten entdecken, melden Sie diese bitte direkt an unser Entwicklungsteam. Bestätigte Korrekturen werden zeitnah eingespielt.',
    authorHeading: 'Redaktionelle Verantwortung & Systemarchitektur',
    authorRole: 'Gründer & Leitender Systemarchitekt — Nexus Calculator',
    authorBio: 'MD Abu Hanif Mia verantwortet die Plattformarchitektur, numerische Qualitätssicherung, lokale Datenschutz-Tools sowie die mehrsprachige fachliche Prüfung auf Nexus Calculator.',
    portfolioCta: 'Architekten-Profil ansehen',
    contactCta: 'Korrektur oder Fehler melden',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = COPY[locale] || COPY.en;
  const alternates = getCanonicalAndAlternates('/editorial-policy', locale);
  const title = optimizeSerpTitle(c.metaTitle, locale, 'page');

  return {
    title,
    description: c.metaDescription,
    alternates,
    openGraph: {
      title,
      description: c.metaDescription,
      url: alternates.canonical,
      siteName: 'Nexus Calculator',
      locale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function EditorialPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale] || COPY.en;

  const alternates = getCanonicalAndAlternates('/editorial-policy', locale);
  const canonicalUrl = getCanonicalUrl('/editorial-policy', locale);
  const homeUrl = getCanonicalUrl('/', locale);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: c.h1,
    description: c.metaDescription,
    url: canonicalUrl,
    inLanguage: locale,
    dateModified: '2026-11-24',
    publisher: {
      '@type': 'Organization',
      name: 'Nexus Calculator',
      url: 'https://www.nexuscalculator.net/en',
      logo: 'https://www.nexuscalculator.net/icons/icon-512x512.png',
      founder: {
        '@type': 'Person',
        name: 'MD Abu Hanif Mia',
        url: 'https://abuhanifmia.com',
        sameAs: [
          'https://abuhanifmia.com',
          'https://github.com/abuhanif254',
          'https://www.linkedin.com/company/nexus-calculator',
        ],
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: c.home, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: c.crumb, item: canonicalUrl },
      ],
    },
  };

  const renderDomainIcon = (kind: 'finance' | 'health' | 'science') => {
    if (kind === 'finance') return <Landmark className="w-5 h-5 text-[#518231]" />;
    if (kind === 'health') return <HeartPulse className="w-5 h-5 text-rose-500" />;
    return <FlaskConical className="w-5 h-5 text-blue-500" />;
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-[#518231] hover:underline">{c.home}</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{c.crumb}</span>
        </nav>

        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-[#518231] dark:text-[#6fa844] text-xs font-bold uppercase tracking-wider mb-5 border border-[#518231]/20">
            <BookOpenCheck className="w-4 h-4" />
            <span>{c.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {c.h1}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {c.subtitle}
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
            <FileCheck2 className="w-4 h-4 text-[#518231]" />
            <span>{c.lastReviewedLabel}</span>
            <strong className="text-slate-800 dark:text-slate-200">{c.lastReviewedDate}</strong>
          </div>
        </header>

        {/* Section 1: Authoritative Sources */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{c.standardsHeading}</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{c.standardsIntro}</p>
          <div className="grid grid-cols-1 gap-4">
            {c.domains.map((dom, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    {renderDomainIcon(dom.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{dom.title}</h3>
                    <p className="text-xs font-semibold text-[#518231] dark:text-[#6fa844]">{dom.authority}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{dom.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Four-Stage Workflow */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{c.workflowHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.workflowSteps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#518231] shrink-0" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{step.title}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sections 3, 4, 5: Privacy, Advertising Independence, Corrections */}
        <section className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#518231]" />
              <span>{c.privacyHeading}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{c.privacyBody}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-500" />
              <span>{c.adsHeading}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{c.adsBody}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              <span>{c.correctionsHeading}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{c.correctionsBody}</p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white text-sm font-semibold transition-colors"
            >
              <span>{c.contactCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Author / Oversight Card */}
        <section className="bg-gradient-to-br from-emerald-50/70 to-slate-50 dark:from-[#518231]/10 dark:to-slate-900 border border-[#518231]/20 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#518231] dark:text-[#6fa844] mb-1">{c.authorHeading}</p>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">MD Abu Hanif Mia</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{c.authorRole}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">{c.authorBio}</p>
          </div>
          <a
            href="https://abuhanifmia.com"
            target="_blank"
            rel="noopener noreferrer me author"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm hover:border-[#518231] hover:text-[#518231] transition-colors"
          >
            <span>{c.portfolioCta}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* Cross-Locale SSR Sibling Links */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <LocaleSiblingLinks languages={alternates.languages} currentLocale={locale} />
        </div>
      </div>
    </main>
  );
}
