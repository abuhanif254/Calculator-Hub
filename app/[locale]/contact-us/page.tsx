import { Metadata } from 'next';
import { Link as CustomLink } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

export const revalidate = false;
export const dynamicParams = false;

const metaByLocale: Record<string, { title: string; description: string; home: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Contact Us — Support, Feedback & Feature Requests',
    description: 'Get in touch with the Nexus Calculator team. We are here to help with your questions, feedback, and technical support inquiries.',
    home: 'Home',
    h1: 'Contact Us',
    subtitle: 'Whether you have a question about our calculators, need technical support, or want to suggest a new feature, our team is ready to listen.',
  },
  es: {
    title: 'Contáctenos — Soporte Técnico, Comentarios y Sugerencias',
    description: 'Póngase en contacto con el equipo de Nexus Calculator. Estamos aquí para ayudar con sus preguntas, comentarios y soporte técnico.',
    home: 'Inicio',
    h1: 'Contáctenos',
    subtitle: 'Si tienes alguna pregunta sobre nuestras calculadoras, necesitas soporte técnico o deseas sugerir una nueva herramienta, nuestro equipo está listo para ayudarte.',
  },
  fr: {
    title: 'Nous Contacter — Support Technique, Avis et Suggestions',
    description: 'Contactez l’équipe Nexus Calculator. Nous sommes là pour répondre à vos questions, suggestions de fonctionnalités et demandes d’assistance.',
    home: 'Accueil',
    h1: 'Nous Contacter',
    subtitle: 'Que vous ayez une question sur nos calculatrices, besoin d’une assistance technique ou envie de suggérer un nouvel outil, notre équipe est à votre écoute.',
  },
  de: {
    title: 'Kontaktieren Sie Uns — Support, Feedback & Funktionswünsche',
    description: 'Nehmen Sie Kontakt mit dem Nexus Calculator-Team auf. Wir helfen Ihnen gerne bei Fragen, Feedback und technischen Supportanfragen weiter.',
    home: 'Startseite',
    h1: 'Kontaktieren Sie Uns',
    subtitle: 'Ob Sie eine Frage zu unseren Rechnern haben, technischen Support benötigen oder ein neues Tool vorschlagen möchten — unser Team hilft Ihnen gerne weiter.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  const meta = metaByLocale[locale] || metaByLocale.en;

  return {
    title: meta.title,
    description: meta.description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: getCanonicalAndAlternates('/contact-us', locale),
  };
}

export default async function ContactUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const meta = metaByLocale[locale] || metaByLocale.en;
  
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 font-sans">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <ol className="flex items-center space-x-2">
          <li>
            <CustomLink href="/" className="hover:text-[#518231] dark:hover:text-[#6fa844] hover:underline transition-colors">{meta.home}</CustomLink>
          </li>
          <li><span className="mx-1 text-slate-400 dark:text-slate-600">/</span></li>
          <li aria-current="page" className="text-slate-700 dark:text-slate-300 font-medium">{meta.h1}</li>
        </ol>
      </nav>

      <header className="mb-14 max-w-3xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-[#518231]/10 p-3 rounded-xl text-[#518231] dark:text-[#6fa844]">
            <MessageSquare size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{meta.h1}</h1>
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mt-6">
          {meta.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h3>
            
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Email Support</h4>
                  <a href="mailto:support@nexuscalculator.net" className="text-lg text-slate-900 dark:text-white hover:text-[#518231] dark:hover:text-[#6fa844] font-medium transition-colors break-all">
                    support[at]nexuscalculator.net
                  </a>
                  <p className="text-sm text-slate-500 mt-1">We aim to reply within 24 hours.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl text-green-600 dark:text-green-400 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Phone Number</h4>
                  <a href="tel:+8801724010261" className="text-lg text-slate-900 dark:text-white hover:text-[#518231] dark:hover:text-[#6fa844] font-medium transition-colors">
                    +8801724010261
                  </a>
                  <p className="text-sm text-slate-500 mt-1">Available Mon-Fri, 9am - 5pm (BST).</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-purple-600 dark:text-purple-400 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Headquarters</h4>
                  <address className="text-lg text-slate-900 dark:text-white font-medium not-italic">
                    2300 Kishoreganj Sadar<br />
                    Dhaka, Bangladesh
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form (Static UI) */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h3>
            
            <form className="space-y-6" action="mailto:support@nexuscalculator.net" method="GET">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <input type="text" id="name" name="subject" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:text-white transition-all" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <input type="email" id="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:text-white transition-all" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Topic</label>
                <select id="topic" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:text-white transition-all">
                  <option>General Inquiry</option>
                  <option>Bug Report / Calculator Issue</option>
                  <option>Feature Request</option>
                  <option>Partnership / Advertising</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Your Message</label>
                <textarea id="message" name="body" rows={5} placeholder="How can we help you today?" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:text-white transition-all resize-none" required></textarea>
              </div>

              <button type="submit" className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 bg-[#518231] hover:bg-[#436a28] text-white font-semibold rounded-xl transition-colors shadow-sm hover:shadow-md">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
