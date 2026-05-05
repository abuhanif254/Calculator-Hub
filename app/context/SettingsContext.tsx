"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'CAD' | 'AUD';
type LocaleCode = 'en-US' | 'de-DE' | 'en-GB' | 'ja-JP' | 'en-IN' | 'en-CA' | 'en-AU';
type UnitSystem = 'metric' | 'imperial';

export interface Settings {
  currency: CurrencyCode;
  locale: LocaleCode;
  unitSystem: UnitSystem;
}

interface SettingsContextType extends Settings {
  setCurrencyAndLocale: (currency: CurrencyCode, locale: LocaleCode) => void;
  setUnitSystem: (system: UnitSystem) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({ currency: 'USD', locale: 'en-US', unitSystem: 'imperial' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('calc-settings');
    if (stored) {
      try { 
         
        setSettings(JSON.parse(stored)); 
      } catch (e) {}
    } else {
      // Auto-detect settings based on region (timeZone or language)
      let defaultCurrency: CurrencyCode = 'USD';
      let defaultLocale: LocaleCode = 'en-US';
      let defaultUnitSystem: UnitSystem = 'metric';

      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const langLower = (navigator.languages?.[0] || navigator.language || '').toLowerCase();

        if (timeZone.startsWith('America/New_York') || timeZone.startsWith('America/Chicago') || timeZone.startsWith('America/Denver') || timeZone.startsWith('America/Los_Angeles') || timeZone.startsWith('America/Phoenix') || timeZone.startsWith('America/Anchorage') || timeZone.startsWith('America/Boise') || timeZone.startsWith('America/Indiana/')) {
           defaultUnitSystem = 'imperial';
           defaultCurrency = 'USD';
           defaultLocale = 'en-US';
        } else if (timeZone.startsWith('Europe/London') || langLower.includes('en-gb')) {
           defaultCurrency = 'GBP';
           defaultLocale = 'en-GB';
           defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Europe/') || langLower.includes('de-de') || langLower.includes('fr-fr') || langLower.includes('es-es')) {
           defaultCurrency = 'EUR';
           defaultLocale = 'de-DE';
           defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Tokyo') || langLower.includes('ja-jp')) {
           defaultCurrency = 'JPY';
           defaultLocale = 'ja-JP';
           defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Calcutta') || timeZone.startsWith('Asia/Kolkata') || langLower.includes('en-in')) {
           defaultCurrency = 'INR';
           defaultLocale = 'en-IN';
           defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('America/Toronto') || timeZone.startsWith('America/Vancouver') || timeZone.startsWith('America/Edmonton') || timeZone.startsWith('America/Winnipeg') || timeZone.startsWith('America/Halifax') || langLower.includes('en-ca')) {
           defaultCurrency = 'CAD';
           defaultLocale = 'en-CA';
           defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Australia/') || langLower.includes('en-au')) {
           defaultCurrency = 'AUD';
           defaultLocale = 'en-AU';
           defaultUnitSystem = 'metric';
        } else {
           // Fallback to US if imperial is requested by language, otherwise keep default metric/USD
           if (langLower === 'en-us') {
             defaultUnitSystem = 'imperial';
           }
        }
      } catch(e) {}

      setSettings({ currency: defaultCurrency, locale: defaultLocale, unitSystem: defaultUnitSystem });
    }
     
    setMounted(true);
  }, []);

  const setCurrencyAndLocale = (currency: CurrencyCode, locale: LocaleCode) => {
    setSettings((prev) => {
      const newSettings = { ...prev, currency, locale };
      localStorage.setItem('calc-settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const setUnitSystem = (unitSystem: UnitSystem) => {
    setSettings((prev) => {
      const newSettings = { ...prev, unitSystem };
      localStorage.setItem('calc-settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Provide initial settings value immediately so SSR matches initial CSR
  // For proper hydration we wait for mounted to flip to true if doing deep visual changes, 
  // but we can just render context immediately.
  return (
    <SettingsContext.Provider value={{ ...settings, setCurrencyAndLocale, setUnitSystem }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
