'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { X, Cookie, SlidersHorizontal, ShieldCheck } from 'lucide-react';

interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
}

const COOKIE_COPY: Record<
  string,
  {
    title: string;
    bodyBefore: string;
    privacyPolicy: string;
    decline: string;
    customize: string;
    savePrefs: string;
    acceptAll: string;
    close: string;
    necessaryTitle: string;
    necessaryDesc: string;
    alwaysActive: string;
    analyticsTitle: string;
    analyticsDesc: string;
    adsTitle: string;
    adsDesc: string;
  }
> = {
  en: {
    title: 'We value your privacy & data transparency',
    bodyBefore:
      'We use cookies and local storage to remember your preferences, analyze traffic, and serve personalized or non-personalized ads via Google AdSense (Consent Mode v2). You can accept all, reject non-essential cookies, or customize your choices anytime. Read our ',
    privacyPolicy: 'Privacy Policy',
    decline: 'Reject Non-Essential',
    customize: 'Customize',
    savePrefs: 'Save Preferences',
    acceptAll: 'Accept All',
    close: 'Close',
    necessaryTitle: 'Strictly Necessary & Local Calculation Storage',
    necessaryDesc: 'Required for theme preferences, language selection, consent state, and 100% client-side calculator execution.',
    alwaysActive: 'Always Active',
    analyticsTitle: 'Analytics & Performance Measurement (analytics_storage)',
    analyticsDesc: 'Helps us measure aggregated page performance, Core Web Vitals, and error diagnostics.',
    adsTitle: 'Personalized Advertising & Google AdSense (ad_storage, ad_user_data, ad_personalization)',
    adsDesc: 'Allows Google AdSense to show relevant advertisements and measure ad effectiveness. If disabled, only non-personalized contextual status is used.',
  },
  es: {
    title: 'Valoramos su privacidad y transparencia de datos',
    bodyBefore:
      'Utilizamos cookies y almacenamiento local para recordar sus preferencias, analizar el tráfico y mostrar anuncios personalizados o contextuales mediante Google AdSense (Consent Mode v2). Puede aceptar todas, rechazar las no esenciales o configurar sus preferencias. Consulte nuestra ',
    privacyPolicy: 'Política de Privacidad',
    decline: 'Rechazar no esenciales',
    customize: 'Personalizar',
    savePrefs: 'Guardar preferencias',
    acceptAll: 'Aceptar todo',
    close: 'Cerrar',
    necessaryTitle: 'Almacenamiento Estrictamente Necesario y Cálculos Locales',
    necessaryDesc: 'Imprescindible para guardar el idioma, modo oscuro, estado de consentimiento y ejecutar calculadoras localmente en su navegador.',
    alwaysActive: 'Siempre activo',
    analyticsTitle: 'Analítica y Rendimiento (analytics_storage)',
    analyticsDesc: 'Nos permite medir de forma agregada el rendimiento técnico y la estabilidad de las herramientas.',
    adsTitle: 'Publicidad Personalizada y Google AdSense (ad_storage, ad_user_data, ad_personalization)',
    adsDesc: 'Permite a Google AdSense mostrar anuncios relevantes. Si se desactiva, solo se solicitarán anuncios no personalizados.',
  },
  fr: {
    title: 'Nous respectons votre vie privée (Conformité RGPD)',
    bodyBefore:
      'Nous utilisons des cookies et le stockage local pour mémoriser vos préférences, analyser notre trafic et diffuser des publicités personnalisées ou contextuelles via Google AdSense (Consent Mode v2). Vous pouvez tout accepter, refuser les cookies non essentiels ou personnaliser vos choix. Consultez notre ',
    privacyPolicy: 'Politique de Confidentialité',
    decline: 'Refuser non essentiels',
    customize: 'Personnaliser',
    savePrefs: 'Enregistrer mes choix',
    acceptAll: 'Tout accepter',
    close: 'Fermer',
    necessaryTitle: 'Cookies Strictement Nécessaires & Calculs Locaux',
    necessaryDesc: 'Indispensables pour la langue, le thème d’affichage, votre choix de consentement et l’exécution locale des outils.',
    alwaysActive: 'Toujours actif',
    analyticsTitle: 'Mesure d’Audience & Performance (analytics_storage)',
    analyticsDesc: 'Permet de mesurer de façon agrégée les performances techniques et l’ergonomie du site.',
    adsTitle: 'Publicité Personnalisée & Google AdSense (ad_storage, ad_user_data, ad_personalization)',
    adsDesc: 'Autorise Google AdSense à diffuser des annonces pertinentes. En cas de refus, seules des annonces non personnalisées sont servies.',
  },
  de: {
    title: 'Wir schätzen Ihre Privatsphäre (DSGVO / Consent Mode v2)',
    bodyBefore:
      'Wir verwenden Cookies und lokalen Speicher, um Ihre Einstellungen zu speichern, den Datenverkehr zu analysieren und personalisierte oder kontextbezogene Anzeigen über Google AdSense bereitzustellen. Sie können alle akzeptieren, nicht notwendige ablehnen oder Ihre Auswahl anpassen. Details in unserer ',
    privacyPolicy: 'Datenschutzerklärung',
    decline: 'Nur Essenzielle',
    customize: 'Einstellungen',
    savePrefs: 'Auswahl speichern',
    acceptAll: 'Alle akzeptieren',
    close: 'Schließen',
    necessaryTitle: 'Technisch Notwendig & Lokale Browser-Berechnung',
    necessaryDesc: 'Erforderlich für Spracheinstellungen, Dark Mode, Einwilligungsstatus und die 100 % lokale Ausführung der Rechner.',
    alwaysActive: 'Immer aktiv',
    analyticsTitle: 'Analyse & Leistungsdiagnostik (analytics_storage)',
    analyticsDesc: 'Hilft uns, Ladezeiten, Core Web Vitals und technische Stabilität anonymisiert auszuwerten.',
    adsTitle: 'Personalisierte Werbung & Google AdSense (ad_storage, ad_user_data, ad_personalization)',
    adsDesc: 'Ermöglicht Google AdSense die Anzeige relevanter Werbung. Bei Deaktivierung werden ausschließlich nicht-personalisierte Anzeigen angefordert.',
  },
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [adsEnabled, setAdsEnabled] = useState(true);
  const locale = useLocale();
  const t = COOKIE_COPY[locale] || COOKIE_COPY.en;

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nexus_cookie_consent');
      if (!saved) {
        setIsVisible(true);
      } else if (saved === 'accepted') {
        setAnalyticsEnabled(true);
        setAdsEnabled(true);
      } else if (saved === 'declined') {
        setAnalyticsEnabled(false);
        setAdsEnabled(false);
      } else if (saved.startsWith('{')) {
        const parsed = JSON.parse(saved) as Partial<ConsentPreferences>;
        setAnalyticsEnabled(Boolean(parsed.analytics));
        setAdsEnabled(Boolean(parsed.advertising));
      }
    } catch {
      setIsVisible(true);
    }

    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowDetails(true);
    };
    window.addEventListener('nexus:open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('nexus:open-cookie-settings', handleOpenSettings);
  }, []);

  const applyConsent = (analytics: boolean, advertising: boolean, storageVal: string) => {
    try {
      localStorage.setItem('nexus_cookie_consent', storageVal);
    } catch {
      // Ignore storage quota errors
    }
    if (typeof window !== 'undefined') {
      const w = window as unknown as {
        dataLayer?: unknown[];
        adsbygoogle?: { requestNonPersonalizedAds?: number; pauseAdRequests?: number } & unknown[];
      };
      w.dataLayer = w.dataLayer || [];
      const gtag = (...args: unknown[]) => {
        w.dataLayer!.push(args);
      };
      const adStatus = advertising ? 'granted' : 'denied';
      const analyticsStatus = analytics ? 'granted' : 'denied';
      gtag('consent', 'update', {
        ad_storage: adStatus,
        ad_user_data: adStatus,
        ad_personalization: adStatus,
        analytics_storage: analyticsStatus,
      });
      w.adsbygoogle = (w.adsbygoogle || []) as { requestNonPersonalizedAds?: number; pauseAdRequests?: number } & unknown[];
      w.adsbygoogle.requestNonPersonalizedAds = advertising ? 0 : 1;
      if (typeof w.adsbygoogle.pauseAdRequests === 'number') {
        w.adsbygoogle.pauseAdRequests = 0;
      }
    }
    setIsVisible(false);
    setShowDetails(false);
  };

  const handleAcceptAll = () => {
    setAnalyticsEnabled(true);
    setAdsEnabled(true);
    applyConsent(true, true, 'accepted');
  };

  const handleRejectNonEssential = () => {
    setAnalyticsEnabled(false);
    setAdsEnabled(false);
    applyConsent(false, false, 'declined');
  };

  const handleSavePreferences = () => {
    const payload: ConsentPreferences = {
      necessary: true,
      analytics: analyticsEnabled,
      advertising: adsEnabled,
      updatedAt: new Date().toISOString(),
    };
    applyConsent(analyticsEnabled, adsEnabled, JSON.stringify(payload));
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] px-3 sm:px-6 md:px-8 pointer-events-none flex justify-center"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 sm:p-6 max-w-4xl w-full flex flex-col gap-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-[#518231]/10 text-[#518231] p-3 rounded-xl hidden sm:flex shrink-0">
              <Cookie size={24} />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-base sm:text-lg flex items-center gap-2 mb-1">
                <span className="sm:hidden text-[#518231]"><Cookie size={18} /></span> {t.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {t.bodyBefore}
                <Link href="/privacy-policy" className="text-[#518231] hover:underline font-medium">
                  {t.privacyPolicy}
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-xs sm:text-sm inline-flex items-center gap-1.5"
            >
              <SlidersHorizontal size={15} />
              {t.customize}
            </button>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-xs sm:text-sm"
            >
              {t.decline}
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white transition-colors font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md"
            >
              {t.acceptAll}
            </button>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors hidden md:block"
              aria-label={t.close}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
            <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#518231]" />
                  {t.necessaryTitle}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{t.necessaryDesc}</p>
              </div>
              <span className="text-xs font-bold text-[#518231] shrink-0 px-2.5 py-1 rounded-md bg-[#518231]/10">
                {t.alwaysActive}
              </span>
            </div>

            <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">{t.analyticsTitle}</div>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{t.analyticsDesc}</p>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#518231] focus:ring-[#518231]"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">{t.adsTitle}</div>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{t.adsDesc}</p>
              </div>
              <input
                type="checkbox"
                checked={adsEnabled}
                onChange={(e) => setAdsEnabled(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#518231] focus:ring-[#518231]"
              />
            </label>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
              >
                {t.savePrefs}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
