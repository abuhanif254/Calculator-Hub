import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getCanonicalAndAlternates } from '@/lib/utils/seoUtils';
import { Mail, MapPin, MessageSquare, Send, Clock } from 'lucide-react';

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ContactLocaleCopy {
  metaTitle: string;
  metaDesc: string;
  badge: string;
  h1: string;
  subtitle: string;
  emailTitle: string;
  emailSub: string;
  locationTitle: string;
  locationSub: string;
  responseTitle: string;
  responseBody: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjects: {
    select: string;
    bug: string;
    request: string;
    feedback: string;
    business: string;
  };
  messageLabel: string;
  messagePlaceholder: string;
  submitBtn: string;
}

const CONTACT_COPY: Record<string, ContactLocaleCopy> = {
  en: {
    metaTitle: 'Contact Us | NexusCalculator',
    metaDesc: 'Get in touch with the NexusCalculator team for support, feedback, bug reports, or new calculator requests.',
    badge: "We'd love to hear from you",
    h1: 'Get in Touch',
    subtitle: 'Have a question about a formula, found a bug, or want to request a new calculator? Drop us a message below.',
    emailTitle: 'Email Us',
    emailSub: 'For general inquiries and support:',
    locationTitle: 'Our Location',
    locationSub: 'Operating globally from:',
    responseTitle: 'Response Time',
    responseBody: 'We are a small, dedicated engineering team. We aim to respond to all legitimate inquiries and bug reports within 24 to 48 hours during standard business days.',
    formTitle: 'Send a Message',
    nameLabel: 'Your Name',
    namePlaceholder: 'John Doe',
    emailLabel: 'Email Address',
    emailPlaceholder: 'john@example.com',
    subjectLabel: 'Subject',
    subjects: {
      select: 'Select a topic...',
      bug: 'Report a Bug / Formula Error',
      request: 'Request a New Calculator',
      feedback: 'General Feedback',
      business: 'Business / Advertising Inquiry',
    },
    messageLabel: 'Message',
    messagePlaceholder: 'Please provide as much detail as possible...',
    submitBtn: 'Send Message',
  },
  es: {
    metaTitle: 'Contáctenos | NexusCalculator',
    metaDesc: 'Póngase en contacto con el equipo de ingeniería de NexusCalculator para soporte técnico, comentarios, reporte de errores o solicitud de nuevas calculadoras.',
    badge: 'Nos encantaría saber de usted',
    h1: 'Póngase en Contacto',
    subtitle: '¿Tiene alguna duda sobre una fórmula matemática, encontró un error o desea solicitar una nueva calculadora? Envíenos un mensaje a continuación.',
    emailTitle: 'Correo Electrónico',
    emailSub: 'Para consultas generales y soporte técnico:',
    locationTitle: 'Nuestra Ubicación',
    locationSub: 'Operando globalmente desde:',
    responseTitle: 'Tiempo de Respuesta',
    responseBody: 'Somos un equipo dedicado de ingeniería cuantitativa. Respondemos a todas las consultas legítimas, revisiones de fórmulas y reportes técnicos en un plazo de 24 a 48 horas hábiles.',
    formTitle: 'Enviar un Mensaje',
    nameLabel: 'Su Nombre',
    namePlaceholder: 'Juan Pérez',
    emailLabel: 'Correo Electrónico',
    emailPlaceholder: 'juan@ejemplo.com',
    subjectLabel: 'Asunto',
    subjects: {
      select: 'Seleccione un tema...',
      bug: 'Reportar un Error / Revisión de Fórmula',
      request: 'Solicitar una Nueva Calculadora',
      feedback: 'Comentarios y Sugerencias',
      business: 'Consulta Comercial / Publicidad',
    },
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Por favor, proporcione tantos detalles como sea posible...',
    submitBtn: 'Enviar Mensaje',
  },
  fr: {
    metaTitle: 'Nous Contacter | NexusCalculator',
    metaDesc: 'Contactez l’équipe NexusCalculator pour toute demande d’assistance, signalement de bug, vérification de formule ou suggestion de nouvelle calculatrice.',
    badge: 'Nous sommes à votre écoute',
    h1: 'Contactez-Nous',
    subtitle: 'Vous avez une question sur une formule mathématique, vous avez repéré une anomalie ou souhaitez suggérer un nouvel outil ? Écrivez-nous ci-dessous.',
    emailTitle: 'Par Courriel',
    emailSub: 'Pour toute demande générale et assistance technique :',
    locationTitle: 'Notre Siège',
    locationSub: 'Opérant à l’international depuis :',
    responseTitle: 'Délai de Réponse',
    responseBody: 'Notre équipe d’ingénieurs examine chaque demande avec attention. Nous répondons aux questions techniques, signalements de bugs et propositions d’outils sous 24 à 48 heures ouvrées.',
    formTitle: 'Envoyer un Message',
    nameLabel: 'Votre Nom',
    namePlaceholder: 'Jean Dupont',
    emailLabel: 'Adresse E-mail',
    emailPlaceholder: 'jean@exemple.fr',
    subjectLabel: 'Objet',
    subjects: {
      select: 'Sélectionnez un sujet...',
      bug: 'Signaler un Bug / Erreur de Formule',
      request: 'Suggérer une Nouvelle Calculatrice',
      feedback: 'Commentaires Généraux',
      business: 'Partenariat / Publicité',
    },
    messageLabel: 'Message',
    messagePlaceholder: 'Veuillez préciser votre demande avec le plus de détails possible...',
    submitBtn: 'Envoyer le Message',
  },
  de: {
    metaTitle: 'Kontakt | NexusCalculator',
    metaDesc: 'Kontaktieren Sie das NexusCalculator-Team für technischen Support, Feedback, Fehlermeldungen oder Vorschläge für neue Online-Rechner.',
    badge: 'Wir freuen uns auf Ihre Nachricht',
    h1: 'Kontaktieren Sie uns',
    subtitle: 'Haben Sie eine Frage zu einer mathematischen Formel, einen Fehler entdeckt oder möchten Sie einen neuen Rechner vorschlagen? Schreiben Sie uns.',
    emailTitle: 'E-Mail-Kontakt',
    emailSub: 'Für allgemeine Anfragen und technischen Support:',
    locationTitle: 'Unser Standort',
    locationSub: 'Weltweit tätig von unserem Standort:',
    responseTitle: 'Antwortzeit',
    responseBody: 'Wir sind ein spezialisiertes Entwickler- und Redaktionsteam. Wir beantworten alle Fachanfragen, Formelprüfungen und Fehlermeldungen in der Regel innerhalb von 24 bis 48 Stunden an Werktagen.',
    formTitle: 'Nachricht senden',
    nameLabel: 'Ihr Name',
    namePlaceholder: 'Max Mustermann',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'max@beispiel.de',
    subjectLabel: 'Betreff',
    subjects: {
      select: 'Bitte Thema wählen...',
      bug: 'Fehler melden / Formelkorrektur',
      request: 'Neuen Rechner vorschlagen',
      feedback: 'Allgemeines Feedback',
      business: 'Geschäftliche Anfrage / Werbung',
    },
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Bitte beschreiben Sie Ihr Anliegen so detailliert wie möglich...',
    submitBtn: 'Nachricht absenden',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = CONTACT_COPY[locale] || CONTACT_COPY.en;
  const alternates = getCanonicalAndAlternates('/contact-us', locale);

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates,
  };
}

export default async function ContactUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = CONTACT_COPY[locale] || CONTACT_COPY.en;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#518231]/10 text-[#518231] font-medium text-sm mb-4">
            <MessageSquare size={16} />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.h1}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Contact Info Cards */}
          <div className="space-y-6">
            
            {/* Email Card */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="bg-[#518231]/10 text-[#518231] p-3 rounded-2xl shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{t.emailTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                  {t.emailSub}
                </p>
                <a href="mailto:support@nexuscalculator.net" className="text-[#518231] font-semibold hover:underline break-all">
                  support@nexuscalculator.net
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="bg-[#518231]/10 text-[#518231] p-3 rounded-2xl shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{t.locationTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  {t.locationSub}
                </p>
                <p className="text-slate-800 dark:text-slate-200 font-medium text-sm">
                  2300 Kishoreganj Sadar,<br />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="bg-[#518231]/10 text-[#518231] p-3 rounded-2xl shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{t.responseTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t.responseBody}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {t.formTitle}
            </h2>
            
            <form action="mailto:support@nexuscalculator.net" method="POST" encType="text/plain" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t.nameLabel}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t.emailLabel}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.subjectLabel}
                </label>
                <select 
                  id="subject" 
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all text-slate-900 dark:text-white"
                >
                  <option value="" disabled>{t.subjects.select}</option>
                  <option value="bug">{t.subjects.bug}</option>
                  <option value="request">{t.subjects.request}</option>
                  <option value="feedback">{t.subjects.feedback}</option>
                  <option value="business">{t.subjects.business}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.messageLabel}
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={5} 
                  required
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all text-slate-900 dark:text-white resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white font-bold transition-all shadow-lg shadow-[#518231]/20 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                <span>{t.submitBtn}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
