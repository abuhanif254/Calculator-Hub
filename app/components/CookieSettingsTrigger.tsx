'use client';

import React from 'react';

const LABELS: Record<string, string> = {
  en: 'Cookie Settings',
  es: 'Preferencias de Cookies',
  fr: 'Préférences de Cookies',
  de: 'Cookie-Einstellungen',
};

export function CookieSettingsTrigger({ locale }: { locale: string }) {
  const label = LABELS[locale] || LABELS.en;

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('nexus:open-cookie-settings'));
        }
      }}
      className="text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-white transition-colors p-2 cursor-pointer"
    >
      {label}
    </button>
  );
}
