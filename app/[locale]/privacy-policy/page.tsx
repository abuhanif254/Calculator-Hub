import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getCanonicalAndAlternates, optimizeSerpTitle } from '@/lib/utils/seoUtils';
import { ShieldCheck, Cookie, Eye, Lock, Mail } from 'lucide-react';

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface PrivacyLocaleCopy {
  metaTitle: string;
  metaDesc: string;
  badge: string;
  h1: string;
  subtitle: string;
  tocHeading: string;
  s1: {
    toc: string;
    h2: string;
    p1: string;
    b1Label: string;
    b1Text: string;
    b2Label: string;
    b2Text: string;
  };
  s2: {
    toc: string;
    h2: string;
    p1: string;
    p2Before: string;
    p2LinkText: string;
    p3Before: string;
    p3LinkText: string;
  };
  s3: {
    toc: string;
    h2: string;
    p1: string;
    p2: string;
  };
  s4: {
    toc: string;
    h2: string;
    p1: string;
    rights: string[];
  };
  s5: {
    toc: string;
    h2: string;
    p1: string;
    label: string;
  };
}

const PRIVACY_COPY: Record<string, PrivacyLocaleCopy> = {
  en: {
    metaTitle: 'Privacy Policy | NexusCalculator',
    metaDesc: 'Read the Privacy Policy of NexusCalculator to understand how we handle your data, browser-local processing, cookies, and Google AdSense advertising.',
    badge: 'Last Updated: October 24, 2026',
    h1: 'Privacy Policy',
    subtitle: 'At NexusCalculator, your privacy is our priority. Learn how we protect your data, keep calculations local, and maintain full transparency.',
    tocHeading: 'Table of Contents',
    s1: {
      toc: '1. Data We Collect',
      h2: '1. Information We Collect',
      p1: 'Welcome to NexusCalculator ("we," "our," or "us"). When you use our website (https://www.nexuscalculator.net), you do not need to create an account or provide personal information to use our calculators and developer utilities.',
      b1Label: 'Calculator & Tool Inputs:',
      b1Text: 'All numbers, financial data, health metrics, PDF/image files, and code payloads you enter into our calculators and browser utilities are processed locally in your browser (client-side). We do not store, save, or transmit your personal calculation inputs to our servers.',
      b2Label: 'Log Files:',
      b2Text: 'Like most standard websites, we use log files. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends and administer the site.',
    },
    s2: {
      toc: '2. Google AdSense & Cookies',
      h2: '2. Google AdSense & the DoubleClick DART Cookie',
      p1: 'We use third-party advertising companies, specifically Google AdSense (publisher ID pub-9824094207004107), to serve ads when you visit our website.',
      p2Before: "Google, as a third-party vendor, uses cookies to serve ads on NexusCalculator. Google's use of the DART and advertising cookies enables it and its partners to serve ads to our users based on their visit to https://www.nexuscalculator.net and other sites on the Internet. Users may opt out of the use of personalized advertising cookies by visiting the ",
      p2LinkText: 'Google Ad Settings & Privacy Policy',
      p3Before: 'Alternatively, you can opt out of a third-party vendor\'s use of cookies for personalized advertising by visiting ',
      p3LinkText: 'www.aboutads.info/choices/',
    },
    s3: {
      toc: '3. How We Use Cookies',
      h2: '3. How We Use Cookies & Local Storage',
      p1: 'NexusCalculator uses browser "Local Storage" and essential cookies to enhance your user experience. For example, we store your preferred theme (Dark Mode vs. Light Mode), your selected language, and your cookie consent choice locally on your device so you do not have to reset it every time you visit.',
      p2: 'You can choose to disable cookies through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers\' respective websites.',
    },
    s4: {
      toc: '4. GDPR & CCPA Rights',
      h2: '4. Your Data Protection Rights (GDPR & CCPA)',
      p1: 'Depending on your location, you have specific rights regarding your personal data under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA):',
      rights: [
        'The right to access, update, or delete the information we have on you.',
        'The right of rectification if your information is inaccurate or incomplete.',
        'The right to object to our processing of your personal data.',
        'The right to opt-out of the sale or sharing of personal information (Note: NexusCalculator does not sell your personal information).',
      ],
    },
    s5: {
      toc: '5. Contact Us',
      h2: '5. Contact Us',
      p1: 'If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us:',
      label: 'Email:',
    },
  },
  es: {
    metaTitle: 'Política de Privacidad | NexusCalculator',
    metaDesc: 'Lea la Política de Privacidad de NexusCalculator para conocer cómo protegemos sus datos, el procesamiento local en el navegador, las cookies y Google AdSense.',
    badge: 'Última actualización: 24 de octubre de 2026',
    h1: 'Política de Privacidad',
    subtitle: 'En NexusCalculator, su privacidad es nuestra máxima prioridad. Conozca cómo protegemos sus datos y procesamos sus cálculos localmente.',
    tocHeading: 'Tabla de Contenidos',
    s1: {
      toc: '1. Datos que Recopilamos',
      h2: '1. Información que Recopilamos',
      p1: 'Bienvenido a NexusCalculator («nosotros» o «nuestro»). Al utilizar nuestro sitio web (https://www.nexuscalculator.net), usted no necesita registrarse ni proporcionar datos personales para emplear nuestras calculadoras y herramientas técnicas.',
      b1Label: 'Datos Introducidos en Calculadoras y Herramientas:',
      b1Text: 'Todos los valores numéricos, datos financieros, métricas de salud, documentos PDF, imágenes y fragmentos de código que introduce en nuestras calculadoras y utilidades se procesan al 100 % de forma local en su navegador web (Client-Side). No almacenamos, guardamos ni transmitimos sus entradas de cálculo a nuestros servidores.',
      b2Label: 'Archivos de Registro (Logs):',
      b2Text: 'Al igual que los sitios web estándar, utilizamos archivos de registro técnicos que incluyen direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), marcas de fecha y hora, páginas de referencia/salida y métricas agregadas para administrar la seguridad y el rendimiento del sitio.',
    },
    s2: {
      toc: '2. Google AdSense y Cookies',
      h2: '2. Google AdSense y la Cookie DART de DoubleClick',
      p1: 'Utilizamos servicios publicitarios de terceros, específicamente Google AdSense (ID de editor pub-9824094207004107), para mostrar anuncios cuando visita nuestro sitio web.',
      p2Before: 'Google, como proveedor externo, utiliza cookies (incluida la cookie DART de DoubleClick) para publicar anuncios en NexusCalculator. El uso de cookies publicitarias permite a Google y a sus socios mostrar anuncios basados en las visitas de los usuarios a https://www.nexuscalculator.net y a otros sitios de Internet. Los usuarios pueden inhabilitar el uso de cookies para publicidad personalizada visitando la ',
      p2LinkText: 'Configuración de Anuncios y Política de Privacidad de Google',
      p3Before: 'Asimismo, puede optar por no recibir cookies de terceros para publicidad personalizada visitando ',
      p3LinkText: 'www.aboutads.info/choices/',
    },
    s3: {
      toc: '3. Uso de Cookies',
      h2: '3. Cómo Utilizamos las Cookies y el Almacenamiento Local',
      p1: 'NexusCalculator emplea el almacenamiento local del navegador («Local Storage») y cookies técnicas esenciales para mejorar su experiencia de uso. Por ejemplo, guardamos localmente en su dispositivo su preferencia de tema visual (Modo Oscuro o Modo Claro), su idioma seleccionado y su preferencia de consentimiento de cookies.',
      p2: 'Usted puede desactivar las cookies en cualquier momento desde las opciones de configuración de su navegador web.',
    },
    s4: {
      toc: '4. Derechos RGPD y CCPA',
      h2: '4. Sus Derechos de Protección de Datos (RGPD y CCPA)',
      p1: 'Dependiendo de su jurisdicción, usted dispone de derechos específicos sobre sus datos personales conforme al Reglamento General de Protección de Datos (RGPD/GDPR) y la Ley de Privacidad del Consumidor de California (CCPA):',
      rights: [
        'Derecho a acceder, actualizar o solicitar la eliminación de la información personal que podamos tener sobre usted.',
        'Derecho de rectificación en caso de que sus datos sean inexactos o estén incompletos.',
        'Derecho a oponerse al tratamiento de sus datos personales.',
        'Derecho a excluir la venta o cesión de información personal (Nota: NexusCalculator nunca vende información personal a terceros).',
      ],
    },
    s5: {
      toc: '5. Contacto',
      h2: '5. Contáctenos',
      p1: 'Si tiene alguna pregunta o consulta sobre nuestra Política de Privacidad, no dude en escribirnos:',
      label: 'Correo Electrónico:',
    },
  },
  fr: {
    metaTitle: 'Politique de Confidentialité | NexusCalculator',
    metaDesc: 'Consultez la Politique de Confidentialité de NexusCalculator : traitement local dans le navigateur, protection des données, cookies et publicité Google AdSense.',
    badge: 'Dernière mise à jour : 24 octobre 2026',
    h1: 'Politique de Confidentialité',
    subtitle: 'Chez NexusCalculator, la protection de votre vie privée est primordiale. Découvrez comment nous protégeons vos données et exécutons vos calculs localement.',
    tocHeading: 'Sommaire',
    s1: {
      toc: '1. Données Collectées',
      h2: '1. Informations que Nous Collectons',
      p1: 'Bienvenue sur NexusCalculator (« nous » ou « notre »). Lorsque vous consultez notre site web (https://www.nexuscalculator.net), vous n’avez pas besoin de créer un compte ni de fournir des informations personnelles pour utiliser nos calculatrices et outils développeur.',
      b1Label: 'Données Saisies dans les Calculatrices et Outils :',
      b1Text: 'L’ensemble des chiffres, paramètres financiers, indicateurs de santé, fichiers PDF/images et chaînes de code que vous saisissez dans nos calculatrices et utilitaires est traité à 100 % localement dans votre navigateur (côté client). Nous n’enregistrons ni ne transmettons vos données de calcul sur nos serveurs.',
      b2Label: 'Journaux Techniques (Logs) :',
      b2Text: 'Comme la plupart des sites web standards, nos serveurs enregistrent des journaux techniques comprenant l’adresse IP, le type de navigateur, le fournisseur d’accès (FAI), l’horodatage et les pages consultées afin d’assurer la sécurité et l’administration technique du site.',
    },
    s2: {
      toc: '2. Google AdSense & Cookies',
      h2: '2. Google AdSense et le Cookie DoubleClick DART',
      p1: 'Nous faisons appel à des partenaires publicitaires tiers, notamment Google AdSense (identifiant éditeur pub-9824094207004107), pour diffuser des annonces lors de votre visite sur notre site.',
      p2Before: 'En tant que fournisseur tiers, Google utilise des cookies (y compris le cookie DART) pour diffuser des annonces sur NexusCalculator. L’utilisation des cookies publicitaires permet à Google et à ses partenaires de proposer des annonces adaptées aux visites des internautes sur https://www.nexuscalculator.net et d’autres sites web. Vous pouvez désactiver la publicité personnalisée à tout moment en consultant les ',
      p2LinkText: 'Paramètres des Annonces et Règles de Confidentialité de Google',
      p3Before: 'Vous pouvez également refuser l’utilisation des cookies publicitaires tiers en vous rendant sur ',
      p3LinkText: 'www.aboutads.info/choices/',
    },
    s3: {
      toc: '3. Utilisation des Cookies',
      h2: '3. Utilisation des Cookies et du Stockage Local',
      p1: 'NexusCalculator utilise le stockage local du navigateur (« Local Storage ») et des cookies fonctionnels pour améliorer votre confort de navigation. Nous mémorisons par exemple localement votre thème d’affichage (Mode Sombre ou Clair), votre langue et votre choix de consentement aux cookies.',
      p2: 'Vous pouvez configurer votre navigateur web pour bloquer ou supprimer les cookies à tout moment.',
    },
    s4: {
      toc: '4. Droits RGPD & CCPA',
      h2: '4. Vos Droits en Matière de Protection des Données (RGPD & CCPA)',
      p1: 'Selon votre lieu de résidence, vous bénéficiez de droits spécifiques au titre du Règlement Général sur la Protection des Données (RGPD) et du California Consumer Privacy Act (CCPA) :',
      rights: [
        'Le droit d’accéder aux données vous concernant, de les mettre à jour ou d’en demander la suppression.',
        'Le droit de rectification si vos informations sont inexactes ou incomplètes.',
        'Le droit de vous opposer au traitement de vos données personnelles.',
        'Le droit de refuser la vente ou le partage de vos données personnelles (Note : NexusCalculator ne vend jamais vos informations personnelles).',
      ],
    },
    s5: {
      toc: '5. Nous Contacter',
      h2: '5. Nous Contacter',
      p1: 'Si vous avez des questions ou des remarques concernant notre Politique de Confidentialité, n’hésitez pas à nous écrire :',
      label: 'Courriel :',
    },
  },
  de: {
    metaTitle: 'Datenschutzerklärung | NexusCalculator',
    metaDesc: 'Lesen Sie die Datenschutzerklärung von NexusCalculator: lokale Browser-Verarbeitung, Datenschutz nach DSGVO, Cookies und Google AdSense.',
    badge: 'Zuletzt aktualisiert: 24. Oktober 2026',
    h1: 'Datenschutzerklärung',
    subtitle: 'Bei NexusCalculator hat der Schutz Ihrer Privatsphäre höchste Priorität. Erfahren Sie, wie wir Ihre Daten schützen und Berechnungen lokal ausführen.',
    tocHeading: 'Inhaltsverzeichnis',
    s1: {
      toc: '1. Erhobene Daten',
      h2: '1. Welche Daten wir erheben',
      p1: 'Willkommen bei NexusCalculator („wir“ oder „uns“). Wenn Sie unsere Website (https://www.nexuscalculator.net) besuchen, müssen Sie weder ein Benutzerkonto anlegen noch personenbezogene Daten angeben, um unsere Online-Rechner und Entwickler-Tools zu nutzen.',
      b1Label: 'Eingaben in Rechner und Werkzeuge:',
      b1Text: 'Alle Zahlenwerte, Finanzdaten, Gesundheitskennzahlen, PDF-/Bilddateien und Code-Eingaben, die Sie in unsere Rechner und Browser-Werkzeuge eingeben, werden zu 100 % lokal in Ihrem Webbrowser (Client-Side) verarbeitet. Wir speichern oder übertragen Ihre Berechnungseingaben nicht an unsere Server.',
      b2Label: 'Server-Logdateien:',
      b2Text: 'Wie bei Standard-Websites üblich, erfassen unsere Server technische Protokolldaten (IP-Adresse, Browsertyp, Internetdienstanbieter, Datum/Uhrzeit sowie abgerufene Seiten), um die technische Sicherheit und Stabilität der Plattform zu gewährleisten.',
    },
    s2: {
      toc: '2. Google AdSense & Cookies',
      h2: '2. Google AdSense und das DoubleClick-DART-Cookie',
      p1: 'Wir nutzen Drittanbieter-Werbedienste, insbesondere Google AdSense (Publisher-ID pub-9824094207004107), um beim Besuch unserer Website Werbeanzeigen einzublenden.',
      p2Before: 'Google verwendet als Drittanbieter Cookies (einschließlich des DART-Cookies), um Anzeigen auf NexusCalculator zu schalten. Durch die Verwendung von Werbe-Cookies können Google und seine Partner Nutzern Anzeigen auf Grundlage ihrer Besuche auf https://www.nexuscalculator.net und anderen Websites im Internet bereitstellen. Nutzer können personalisierte Werbung jederzeit deaktivieren unter ',
      p2LinkText: 'Google- Einstellungen für Werbung & Datenschutzerklärung',
      p3Before: 'Alternativ können Sie die Verwendung von Cookies durch Drittanbieter für personalisierte Werbung deaktivieren unter ',
      p3LinkText: 'www.aboutads.info/choices/',
    },
    s3: {
      toc: '3. Verwendung von Cookies',
      h2: '3. Wie wir Cookies und Local Storage verwenden',
      p1: 'NexusCalculator nutzt den lokalen Browserspeicher („Local Storage“) sowie technisch notwendige Cookies, um die Benutzerfreundlichkeit zu verbessern. So speichern wir beispielsweise Ihr gewähltes Farbschema (Dunkelmodus oder Hellmodus), Ihre Spracheinstellung und Ihre Cookie-Einwilligung lokal auf Ihrem Endgerät.',
      p2: 'Sie können das Speichern von Cookies jederzeit in den Einstellungen Ihres Browsers deaktivieren oder gespeicherte Cookies löschen.',
    },
    s4: {
      toc: '4. DSGVO- & CCPA-Rechte',
      h2: '4. Ihre Datenschutzrechte (DSGVO & CCPA)',
      p1: 'Je nach Ihrem Wohnsitz stehen Ihnen nach der Datenschutz-Grundverordnung (DSGVO / GDPR) sowie dem California Consumer Privacy Act (CCPA) folgende Rechte zu:',
      rights: [
        'Das Recht auf Auskunft, Aktualisierung oder Löschung der über Sie gespeicherten personenbezogenen Daten.',
        'Das Recht auf Berichtigung unrichtiger oder unvollständiger Daten.',
        'Das Recht auf Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten.',
        'Das Recht, dem Verkauf oder der Weitergabe personenbezogener Daten zu widersprechen (Hinweis: NexusCalculator verkauft niemals personenbezogene Daten).',
      ],
    },
    s5: {
      toc: '5. Kontakt',
      h2: '5. Kontaktieren Sie uns',
      p1: 'Bei Fragen oder Anliegen zu unserer Datenschutzerklärung erreichen Sie uns jederzeit unter:',
      label: 'E-Mail:',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = PRIVACY_COPY[locale] || PRIVACY_COPY.en;
  const alternates = getCanonicalAndAlternates('/privacy-policy', locale);

  return {
    title: optimizeSerpTitle(t.metaTitle, locale, 'page'),
    description: t.metaDesc,
    alternates,
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = PRIVACY_COPY[locale] || PRIVACY_COPY.en;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#518231]/10 text-[#518231] font-medium text-sm mb-4">
            <ShieldCheck size={16} />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.h1}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Sticky Table of Contents (Left Sidebar) */}
          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-28 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">
              {t.tocHeading}
            </h3>
            <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              <a href="#data-collection" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <Eye size={16} /> {t.s1.toc}
              </a>
              <a href="#google-adsense" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <Cookie size={16} /> {t.s2.toc}
              </a>
              <a href="#cookies-usage" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <Lock size={16} /> {t.s3.toc}
              </a>
              <a href="#user-rights" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <ShieldCheck size={16} /> {t.s4.toc}
              </a>
              <a href="#contact-us" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <Mail size={16} /> {t.s5.toc}
              </a>
            </nav>
          </aside>

          {/* Main Content (Right Column) */}
          <article className="flex-1 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-12 leading-relaxed">
            
            {/* Section 1 */}
            <section id="data-collection" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><Eye size={20} /></span>
                {t.s1.h2}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {t.s1.p1}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  <strong className="text-slate-900 dark:text-white">{t.s1.b1Label}</strong> {t.s1.b1Text}
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">{t.s1.b2Label}</strong> {t.s1.b2Text}
                </li>
              </ul>
            </section>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 2: CRITICAL FOR ADSENSE */}
            <section id="google-adsense" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><Cookie size={20} /></span>
                {t.s2.h2}
              </h2>
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-4">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {t.s2.p1}
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {t.s2.p2Before}
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#518231] underline hover:text-[#436a28] font-medium">
                    {t.s2.p2LinkText}
                  </a>.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {t.s2.p3Before}
                  <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#518231] underline hover:text-[#436a28] font-medium">
                    {t.s2.p3LinkText}
                  </a>.
                </p>
              </div>
            </section>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 3 */}
            <section id="cookies-usage" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><Lock size={20} /></span>
                {t.s3.h2}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {t.s3.p1}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {t.s3.p2}
              </p>
            </section>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 4 */}
            <section id="user-rights" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><ShieldCheck size={20} /></span>
                {t.s4.h2}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {t.s4.p1}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                {t.s4.rights.map((right, idx) => (
                  <li key={idx}>{right}</li>
                ))}
              </ul>
            </section>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 5 */}
            <section id="contact-us" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><Mail size={20} /></span>
                {t.s5.h2}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {t.s5.p1}
              </p>
              <div className="inline-block bg-slate-50 dark:bg-slate-950 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="font-medium text-slate-900 dark:text-white">
                  {t.s5.label}{' '}
                  <a href="mailto:support@nexuscalculator.net" className="text-[#518231] hover:underline ml-1">
                    support@nexuscalculator.net
                  </a>
                </p>
              </div>
            </section>

          </article>

        </div>
      </div>
    </div>
  );
}
