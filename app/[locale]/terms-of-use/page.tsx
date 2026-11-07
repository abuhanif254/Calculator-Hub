import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getCanonicalAndAlternates } from '@/lib/utils/seoUtils';
import { FileText, CheckCircle, Copyright, Ban, Scale, Mail } from 'lucide-react';

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface TermsLocaleCopy {
  metaTitle: string;
  metaDesc: string;
  badge: string;
  h1: string;
  subtitle: string;
  tocHeading: string;
  s1: { toc: string; h2: string; p1: string; p2: string };
  s2: { toc: string; h2: string; p1: string; p2: string };
  s3: { toc: string; h2: string; p1: string; items: string[] };
  s4: { toc: string; h2: string; p1: string; p2: string };
  s5: { toc: string; h2: string; p1: string; label: string };
}

const TERMS_COPY: Record<string, TermsLocaleCopy> = {
  en: {
    metaTitle: 'Terms of Use | NexusCalculator',
    metaDesc: 'Read the Terms of Use and Conditions for accessing and using NexusCalculator online calculators and developer utilities.',
    badge: 'Effective Date: October 24, 2026',
    h1: 'Terms of Use',
    subtitle: 'Please read these terms and conditions carefully before using our calculators and web tools.',
    tocHeading: 'Table of Contents',
    s1: {
      toc: '1. Acceptance of Terms',
      h2: '1. Acceptance of Terms',
      p1: 'By accessing and using NexusCalculator (https://www.nexuscalculator.net), you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using this website\'s particular services, you shall be subject to any posted guidelines or rules applicable to such services.',
      p2: 'If you do not agree to abide by the above, please do not use this service. We reserve the right to modify these terms at any time, and your continued use of the site signifies your acceptance of any updated terms.',
    },
    s2: {
      toc: '2. Intellectual Property',
      h2: '2. Intellectual Property & License',
      p1: 'Unless otherwise stated, NexusCalculator and/or its licensors own the intellectual property rights for all original source code, UI designs, custom algorithms, and written guides on NexusCalculator. All intellectual property rights are reserved.',
      p2: 'You are granted a limited, non-exclusive, revocable license to access and use our calculators and tools for personal, educational, or internal business purposes. You may not republish, sell, rent, sub-license, or duplicate our proprietary code and design without explicit written permission.',
    },
    s3: {
      toc: '3. Prohibited Uses',
      h2: '3. Prohibited Activities',
      p1: 'You agree not to use the Site in any way that causes, or may cause, damage to the Site or impairment of the availability or accessibility of NexusCalculator. Specifically, you are prohibited from:',
      items: [
        'Using automated systems (bots, spiders, or scrapers) to extract data or overload our server infrastructure.',
        'Attempting to reverse-engineer, decompile, or hack any part of the website.',
        'Framing or mirroring any part of the Site on another domain without our prior written consent.',
        'Using the Site for any unlawful, fraudulent, or malicious purposes.',
      ],
    },
    s4: {
      toc: '4. "As-Is" Warranty',
      h2: '4. Disclaimer of Warranties ("As-Is")',
      p1: 'The calculators, code formatters, and content on NexusCalculator are provided "as is" and "as available." NexusCalculator makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.',
      p2: 'We do not warrant that the calculation results are 100% error-free, nor do we guarantee that the website will be uninterrupted or free of bugs.',
    },
    s5: {
      toc: '5. Contact Us',
      h2: '5. Governing Law & Contact',
      p1: 'These terms and conditions are governed by and construed in accordance with international internet laws. If you have any questions regarding these Terms of Use, please contact us at:',
      label: 'Legal & Support:',
    },
  },
  es: {
    metaTitle: 'Términos de Uso | NexusCalculator',
    metaDesc: 'Lea los Términos y Condiciones de Uso aplicables al acceso y utilización de las calculadoras y herramientas de NexusCalculator.',
    badge: 'Fecha de entrada en vigor: 24 de octubre de 2026',
    h1: 'Términos de Uso',
    subtitle: 'Por favor, lea detenidamente estos términos y condiciones antes de utilizar nuestras calculadoras y herramientas web.',
    tocHeading: 'Tabla de Contenidos',
    s1: {
      toc: '1. Aceptación de Términos',
      h2: '1. Aceptación de los Términos',
      p1: 'Al acceder y utilizar NexusCalculator (https://www.nexuscalculator.net), usted acepta quedar vinculado por los términos y disposiciones del presente acuerdo, así como por las normas específicas aplicables a cada servicio o herramienta.',
      p2: 'Si no está de acuerdo con estas condiciones, le rogamos que no utilice este servicio. Nos reservamos el derecho de actualizar estos términos en cualquier momento; el uso continuado del sitio implica la aceptación de las versiones actualizadas.',
    },
    s2: {
      toc: '2. Propiedad Intelectual',
      h2: '2. Propiedad Intelectual y Licencia de Uso',
      p1: 'Salvo indicación en contrario, NexusCalculator y/o sus licenciantes ostentan los derechos de propiedad intelectual sobre el código fuente original, diseños de interfaz, algoritmos cuantitativos y guías técnicas de NexusCalculator. Todos los derechos están reservados.',
      p2: 'Se le concede una licencia limitada, no exclusiva y revocable para acceder y utilizar nuestras calculadoras y utilidades con fines personales, académicos o empresariales internos. Queda prohibida la republicación, venta, alquiler, sublicencia o clonación de nuestro código y diseño sin autorización expresa por escrito.',
    },
    s3: {
      toc: '3. Usos Prohibidos',
      h2: '3. Actividades Prohibidas',
      p1: 'Usted se compromete a no utilizar el Sitio de ninguna forma que cause o pueda causar daños a la infraestructura o afectar la disponibilidad de NexusCalculator. En particular, queda prohibido:',
      items: [
        'Utilizar sistemas automatizados masivos (bots o scrapers abusivos) para extraer datos o sobrecargar nuestros servidores.',
        'Intentar realizar ingeniería inversa, descompilar o vulnerar la seguridad del sitio web.',
        'Incrustar o replicar el Sitio en otro dominio mediante iframes no autorizados sin nuestro consentimiento previo por escrito.',
        'Utilizar el Sitio con fines ilícitos, fraudulentos o maliciosos.',
      ],
    },
    s4: {
      toc: '4. Garantía «Tal Cual»',
      h2: '4. Exclusión de Garantías («Tal Cual»)',
      p1: 'Las calculadoras, herramientas de desarrollo y contenidos de NexusCalculator se proporcionan «tal cual» y «según disponibilidad». NexusCalculator no otorga garantías expresas ni implícitas, renunciando a cualquier garantía implícita de comerciabilidad, idoneidad para un propósito particular o ausencia de infracción.',
      p2: 'No garantizamos que los resultados matemáticos estén libres de errores en el 100 % de los casos particulares ni que el servicio funcione sin interrupciones.',
    },
    s5: {
      toc: '5. Contacto',
      h2: '5. Legislación Aplicable y Contacto',
      p1: 'Estos términos y condiciones se rigen e interpretan conforme a la normativa aplicable de servicios digitales. Si tiene alguna consulta sobre estos Términos de Uso, puede contactarnos en:',
      label: 'Asuntos Legales y Soporte:',
    },
  },
  fr: {
    metaTitle: 'Conditions d’Utilisation | NexusCalculator',
    metaDesc: 'Consultez les Conditions Générales d’Utilisation régissant l’accès et l’emploi des calculatrices et outils en ligne de NexusCalculator.',
    badge: 'Date d’entrée en vigueur : 24 octobre 2026',
    h1: 'Conditions d’Utilisation',
    subtitle: 'Veuillez lire attentivement les présentes conditions générales avant d’utiliser nos calculatrices et outils web.',
    tocHeading: 'Sommaire',
    s1: {
      toc: '1. Acceptation',
      h2: '1. Acceptation des Conditions',
      p1: 'En accédant à NexusCalculator (https://www.nexuscalculator.net) et en utilisant ses services, vous acceptez d’être lié par les présentes conditions générales d’utilisation ainsi que par les règles propres à chaque outil.',
      p2: 'Si vous n’acceptez pas ces dispositions, veuillez ne pas utiliser ce service. Nous nous réservons le droit de modifier ces conditions à tout moment ; la poursuite de votre navigation vaut acceptation des conditions mises à jour.',
    },
    s2: {
      toc: '2. Propriété Intellectuelle',
      h2: '2. Propriété Intellectuelle et Licence',
      p1: 'Sauf mention contraire, NexusCalculator et/ou ses concédants détiennent les droits de propriété intellectuelle sur l’ensemble du code source original, des interfaces, des algorithmes et des guides rédactionnels publiés sur NexusCalculator. Tous les droits sont réservés.',
      p2: 'Une licence limitée, non exclusive et révocable vous est accordée pour consulter et utiliser nos calculatrices et outils à des fins personnelles, pédagogiques ou professionnelles internes. Toute republication, revente, location ou reproduction non autorisée de notre code ou de nos contenus est interdite.',
    },
    s3: {
      toc: '3. Usages Interdits',
      h2: '3. Activités Interdites',
      p1: 'Vous vous engagez à ne pas utiliser le Site d’une manière susceptible d’endommager l’infrastructure ou de nuire à la disponibilité de NexusCalculator. Il est notamment interdit de :',
      items: [
        'Recourir à des systèmes automatisés abusifs (robots ou scrapers massifs) pour extraire des données ou saturer nos serveurs.',
        'Tenter de décompiler, désassembler ou compromettre la sécurité du site web.',
        'Intégrer ou dupliquer le Site sur un domaine tiers sans notre accord écrit préalable.',
        'Utiliser le Site à des fins illégales, frauduleuses ou malveillantes.',
      ],
    },
    s4: {
      toc: '4. Garantie « En l’État »',
      h2: '4. Exclusion de Garantie (« En l’État »)',
      p1: 'Les calculatrices, outils de développement et contenus éditoriaux de NexusCalculator sont fournis « en l’état » et « selon disponibilité ». NexusCalculator n’accorde aucune garantie expresse ou implicite, y compris toute garantie implicite de qualité marchande ou d’adéquation à un usage particulier.',
      p2: 'Nous ne garantissons pas que les résultats de calcul soient exempts d’erreur dans 100 % des cas particuliers ni que l’accès au site soit ininterrompu.',
    },
    s5: {
      toc: '5. Nous Contacter',
      h2: '5. Droit Applicable et Contact',
      p1: 'Les présentes conditions sont régies par le droit applicable aux services numériques internationaux. Pour toute question relative à ces Conditions d’Utilisation, vous pouvez nous écrire à :',
      label: 'Service Juridique & Support :',
    },
  },
  de: {
    metaTitle: 'Nutzungsbedingungen | NexusCalculator',
    metaDesc: 'Lesen Sie die offiziellen Nutzungsbedingungen für den Zugriff auf und die Verwendung der Online-Rechner und Entwickler-Tools von NexusCalculator.',
    badge: 'Gültig ab: 24. Oktober 2026',
    h1: 'Nutzungsbedingungen',
    subtitle: 'Bitte lesen Sie diese Nutzungsbedingungen sorgfältig durch, bevor Sie unsere Online-Rechner und Web-Werkzeuge verwenden.',
    tocHeading: 'Inhaltsverzeichnis',
    s1: {
      toc: '1. Geltungsbereich',
      h2: '1. Anerkennung der Nutzungsbedingungen',
      p1: 'Durch den Zugriff auf und die Nutzung von NexusCalculator (https://www.nexuscalculator.net) erklären Sie sich mit diesen Nutzungsbedingungen sowie allen ergänzenden Hinweisen für einzelne Dienste einverstanden.',
      p2: 'Wenn Sie mit diesen Bedingungen nicht einverstanden sind, nutzen Sie diese Website bitte nicht. Wir behalten uns das Recht vor, diese Bedingungen jederzeit anzupassen; durch die fortgesetzte Nutzung der Website stimmen Sie den aktualisierten Bedingungen zu.',
    },
    s2: {
      toc: '2. Urheberrecht & Lizenz',
      h2: '2. Geistiges Eigentum und Nutzungslizenz',
      p1: 'Sofern nicht anders angegeben, liegen sämtliche Schutz- und Urheberrechte an Quellcode, Benutzeroberflächen, Berechnungsalgorithmen und Fachratgebern bei NexusCalculator bzw. seinen Lizenzgebern. Alle Rechte sind vorbehalten.',
      p2: 'Sie erhalten eine beschränkte, nicht-exklusive und widerrufliche Lizenz zur Nutzung unserer Rechner und Werkzeuge für private, schulische oder interne geschäftliche Zwecke. Eine Weiterveröffentlichung, Vermietung, Unterlizenzierung oder Vervielfältigung unseres Codes und Designs ohne vorherige schriftliche Genehmigung ist untersagt.',
    },
    s3: {
      toc: '3. Unzulässige Nutzung',
      h2: '3. Verbotene Aktivitäten',
      p1: 'Sie verpflichten sich, die Website nicht in einer Weise zu nutzen, die die Infrastruktur beschädigt oder die Verfügbarkeit von NexusCalculator beeinträchtigt. Insbesondere ist es untersagt:',
      items: [
        'Automatisierte Systeme (aggressive Bots, Spider oder Scraper) einzusetzen, um Daten massenhaft abzugreifen oder unsere Server zu überlasten.',
        'Teile der Website zu dekompilieren, zurückzuentwickeln (Reverse Engineering) oder Sicherheitsmechanismen zu umgehen.',
        'Inhalte der Website ohne vorherige schriftliche Zustimmung auf fremden Domains einzubetten oder zu spiegeln.',
        'Die Website für rechtswidrige, betrügerische oder schädliche Zwecke zu verwenden.',
      ],
    },
    s4: {
      toc: '4. Gewährleistungsausschluss',
      h2: '4. Gewährleistungsausschluss („Wie Besehen“)',
      p1: 'Die Rechner, Code-Werkzeuge und redaktionellen Inhalte auf NexusCalculator werden „wie besehen“ und „nach Verfügbarkeit“ bereitgestellt. NexusCalculator übernimmt keinerlei ausdrückliche oder stillschweigende Gewährleistung, insbesondere nicht für die handelsübliche Qualität oder die Eignung für einen bestimmten Zweck.',
      p2: 'Wir übernehmen keine Garantie dafür, dass Berechnungsergebnisse in jedem Einzelfall zu 100 % fehlerfrei sind oder dass die Website jederzeit ohne Unterbrechung zur Verfügung steht.',
    },
    s5: {
      toc: '5. Kontakt',
      h2: '5. Anwendbares Recht und Kontakt',
      p1: 'Für diese Nutzungsbedingungen gelten die einschlägigen Bestimmungen für digitale Online-Dienste. Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns bitte unter:',
      label: 'Recht & Support:',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = TERMS_COPY[locale] || TERMS_COPY.en;
  const alternates = getCanonicalAndAlternates('/terms-of-use', locale);

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates,
  };
}

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = TERMS_COPY[locale] || TERMS_COPY.en;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#518231]/10 text-[#518231] font-medium text-sm mb-4">
            <FileText size={16} />
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
              <a href="#acceptance" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <CheckCircle size={16} /> {t.s1.toc}
              </a>
              <a href="#intellectual-property" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <Copyright size={16} /> {t.s2.toc}
              </a>
              <a href="#prohibited-use" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <Ban size={16} /> {t.s3.toc}
              </a>
              <a href="#warranty-disclaimer" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <Scale size={16} /> {t.s4.toc}
              </a>
              <a href="#contact-us" className="hover:text-[#518231] dark:hover:text-[#518231] transition-colors flex items-center gap-2">
                <Mail size={16} /> {t.s5.toc}
              </a>
            </nav>
          </aside>

          {/* Main Content (Right Column) */}
          <article className="flex-1 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-12 leading-relaxed">
            
            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><CheckCircle size={20} /></span>
                {t.s1.h2}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {t.s1.p1}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {t.s1.p2}
              </p>
            </section>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 2 */}
            <section id="intellectual-property" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><Copyright size={20} /></span>
                {t.s2.h2}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {t.s2.p1}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {t.s2.p2}
              </p>
            </section>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 3 */}
            <section id="prohibited-use" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><Ban size={20} /></span>
                {t.s3.h2}
              </h2>
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {t.s3.p1}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  {t.s3.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 4 */}
            <section id="warranty-disclaimer" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="bg-[#518231]/10 text-[#518231] p-2 rounded-lg"><Scale size={20} /></span>
                {t.s4.h2}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {t.s4.p1}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {t.s4.p2}
              </p>
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
