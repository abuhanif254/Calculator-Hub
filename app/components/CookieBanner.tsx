'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { X, Cookie } from 'lucide-react';

const COOKIE_COPY: Record<
  string,
  {
    title: string;
    bodyBefore: string;
    privacyPolicy: string;
    decline: string;
    acceptAll: string;
    close: string;
  }
> = {
  en: {
    title: 'We value your privacy',
    bodyBefore:
      'We use cookies to enhance your browsing experience, serve personalized ads or content via Google AdSense, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read more in our ',
    privacyPolicy: 'Privacy Policy',
    decline: 'Decline',
    acceptAll: 'Accept All',
    close: 'Close',
  },
  es: {
    title: 'Valoramos su privacidad',
    bodyBefore:
      'Utilizamos cookies para mejorar su experiencia de navegación, mostrar anuncios o contenido personalizado a través de Google AdSense y analizar nuestro tráfico. Al hacer clic en «Aceptar todo», usted acepta el uso de cookies. Lea más en nuestra ',
    privacyPolicy: 'Política de Privacidad',
    decline: 'Rechazar',
    acceptAll: 'Aceptar todo',
    close: 'Cerrar',
  },
  fr: {
    title: 'Nous respectons votre vie privée',
    bodyBefore:
      'Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser des publicités ou contenus personnalisés via Google AdSense et analyser notre trafic. En cliquant sur « Tout accepter », vous consentez à notre utilisation des cookies. En savoir plus dans notre ',
    privacyPolicy: 'Politique de Confidentialité',
    decline: 'Refuser',
    acceptAll: 'Tout accepter',
    close: 'Fermer',
  },
  de: {
    title: 'Wir schätzen Ihre Privatsphäre',
    bodyBefore:
      'Wir verwenden Cookies, um Ihr Nutzererlebnis zu verbessern, personalisierte Anzeigen oder Inhalte über Google AdSense bereitzustellen und unseren Datenverkehr zu analysieren. Mit Klick auf „Alle akzeptieren“ stimmen Sie der Verwendung von Cookies zu. Weitere Details in unserer ',
    privacyPolicy: 'Datenschutzerklärung',
    decline: 'Ablehnen',
    acceptAll: 'Alle akzeptieren',
    close: 'Schließen',
  },
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();
  const t = COOKIE_COPY[locale] || COOKIE_COPY.en;

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('nexus_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nexus_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('nexus_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] px-3 sm:px-6 md:px-8 pointer-events-none flex justify-center"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 sm:p-6 max-w-4xl w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
        
        <div className="flex items-start gap-4">
          <div className="bg-[#518231]/10 text-[#518231] p-3 rounded-xl hidden sm:flex shrink-0">
            <Cookie size={24} />
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2 mb-1">
              <span className="sm:hidden text-[#518231]"><Cookie size={18} /></span> {t.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
              {t.bodyBefore}<Link href="/privacy-policy" className="text-[#518231] hover:underline font-medium">{t.privacyPolicy}</Link>.
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 w-full md:w-auto shrink-0 justify-end md:justify-start">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-sm"
          >
            {t.decline}
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white transition-colors font-medium text-sm shadow-sm hover:shadow-md"
          >
            {t.acceptAll}
          </button>
          <button 
            onClick={() => setIsVisible(false)} 
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors hidden md:block"
            aria-label={t.close}
          >
            <X size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
