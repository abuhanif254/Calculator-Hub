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
