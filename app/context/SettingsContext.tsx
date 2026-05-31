"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Explicitly define all 22 supported regions from the GlobalSettingsBar
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'BDT' | 'CAD' | 'AUD' | 'CNY' | 'AED' | 'SAR' | 'KRW' | 'BRL' | 'MXN' | 'SGD' | 'CHF' | 'SEK' | 'NOK' | 'TRY' | 'ZAR' | 'IDR' | 'PKR' | string;
export type LocaleCode = 'en-US' | 'de-DE' | 'en-GB' | 'ja-JP' | 'en-IN' | 'bn-BD' | 'en-CA' | 'en-AU' | 'zh-CN' | 'ar-AE' | 'ar-SA' | 'ko-KR' | 'pt-BR' | 'es-MX' | 'en-SG' | 'de-CH' | 'sv-SE' | 'nb-NO' | 'tr-TR' | 'en-ZA' | 'id-ID' | 'ur-PK' | string;
export type UnitSystem = 'metric' | 'imperial';

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

        // 1. US / Imperial defaults
        if (timeZone.startsWith('America/New_York') || timeZone.startsWith('America/Chicago') || timeZone.startsWith('America/Denver') || timeZone.startsWith('America/Los_Angeles') || timeZone.startsWith('America/Phoenix') || timeZone.startsWith('America/Anchorage') || timeZone.startsWith('America/Boise') || timeZone.startsWith('America/Indiana/')) {
           defaultUnitSystem = 'imperial';
           defaultCurrency = 'USD';
           defaultLocale = 'en-US';
        }
        // 2. Europe
        else if (timeZone.startsWith('Europe/London') || langLower === 'en-gb') {
           defaultCurrency = 'GBP'; defaultLocale = 'en-GB'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Europe/Zurich')) {
           defaultCurrency = 'CHF'; defaultLocale = 'de-CH'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Europe/Stockholm')) {
           defaultCurrency = 'SEK'; defaultLocale = 'sv-SE'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Europe/Oslo')) {
           defaultCurrency = 'NOK'; defaultLocale = 'nb-NO'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Europe/Istanbul')) {
           defaultCurrency = 'TRY'; defaultLocale = 'tr-TR'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Europe/') || langLower.includes('de-de') || langLower.includes('fr-fr') || langLower.includes('es-es')) {
           defaultCurrency = 'EUR'; defaultLocale = 'de-DE'; defaultUnitSystem = 'metric';
        }
        // 3. Middle East / Africa
        else if (timeZone.startsWith('Asia/Dubai')) {
           defaultCurrency = 'AED'; defaultLocale = 'ar-AE'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Riyadh')) {
           defaultCurrency = 'SAR'; defaultLocale = 'ar-SA'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Africa/Johannesburg')) {
           defaultCurrency = 'ZAR'; defaultLocale = 'en-ZA'; defaultUnitSystem = 'metric';
        }
        // 4. Asia
        else if (timeZone.startsWith('Asia/Tokyo') || langLower.includes('ja-jp')) {
           defaultCurrency = 'JPY'; defaultLocale = 'ja-JP'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Shanghai') || langLower.includes('zh-cn')) {
           defaultCurrency = 'CNY'; defaultLocale = 'zh-CN'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Seoul') || langLower.includes('ko-kr')) {
           defaultCurrency = 'KRW'; defaultLocale = 'ko-KR'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Singapore')) {
           defaultCurrency = 'SGD'; defaultLocale = 'en-SG'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Calcutta') || timeZone.startsWith('Asia/Kolkata') || langLower.includes('en-in')) {
           defaultCurrency = 'INR'; defaultLocale = 'en-IN'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Dhaka') || langLower.includes('bn-bd')) {
           defaultCurrency = 'BDT'; defaultLocale = 'bn-BD'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Karachi') || langLower.includes('ur-pk')) {
           defaultCurrency = 'PKR'; defaultLocale = 'ur-PK'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('Asia/Jakarta') || langLower.includes('id-id')) {
           defaultCurrency = 'IDR'; defaultLocale = 'id-ID'; defaultUnitSystem = 'metric';
        }
        // 5. Americas (Non-US)
        else if (timeZone.startsWith('America/Toronto') || timeZone.startsWith('America/Vancouver') || timeZone.startsWith('America/Edmonton') || timeZone.startsWith('America/Winnipeg') || timeZone.startsWith('America/Halifax') || langLower.includes('en-ca')) {
           defaultCurrency = 'CAD'; defaultLocale = 'en-CA'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('America/Mexico_City') || timeZone.startsWith('America/Monterrey') || timeZone.startsWith('America/Cancun')) {
           defaultCurrency = 'MXN'; defaultLocale = 'es-MX'; defaultUnitSystem = 'metric';
        } else if (timeZone.startsWith('America/Sao_Paulo') || timeZone.startsWith('America/Bahia') || langLower.includes('pt-br')) {
           defaultCurrency = 'BRL'; defaultLocale = 'pt-BR'; defaultUnitSystem = 'metric';
        }
        // 6. Oceania
        else if (timeZone.startsWith('Australia/') || langLower.includes('en-au')) {
           defaultCurrency = 'AUD'; defaultLocale = 'en-AU'; defaultUnitSystem = 'metric';
        }
        else {
           // Fallback if not caught above
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
