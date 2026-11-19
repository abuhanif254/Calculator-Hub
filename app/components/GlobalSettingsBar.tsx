"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSettings } from '../context/SettingsContext';
import { ThemeToggle } from './ThemeToggle';
import { Globe, Ruler, ChevronDown, Check, Languages } from 'lucide-react';

const SETTINGS_BAR_COPY: Record<
  string,
  {
    badge: string;
    tagline: string;
    unitsLabel: string;
    regionLabel: string;
    languageLabel: string;
    imperial: string;
    metric: string;
  }
> = {
  en: {
    badge: '100% Client-Side',
    tagline: 'Verified Mathematical & Developer Utilities — Zero Server Data Retention',
    unitsLabel: 'Units',
    regionLabel: 'Region',
    languageLabel: 'Language',
    imperial: 'Imperial (US)',
    metric: 'Metric (Global)',
  },
  es: {
    badge: '100% Local',
    tagline: 'Calculadoras y utilidades verificadas — Sin retención de datos en servidor',
    unitsLabel: 'Unidades',
    regionLabel: 'Región',
    languageLabel: 'Idioma',
    imperial: 'Imperial (EE. UU.)',
    metric: 'Métrico (Global)',
  },
  fr: {
    badge: '100 % Local',
    tagline: 'Calculatrices et outils vérifiés — Aucune donnée conservée sur serveur',
    unitsLabel: 'Unités',
    regionLabel: 'Région',
    languageLabel: 'Langue',
    imperial: 'Impérial (US)',
    metric: 'Métrique (Mondial)',
  },
  de: {
    badge: '100 % Lokal',
    tagline: 'Geprüfte Rechner & Entwickler-Tools — Keine Datenspeicherung auf Servern',
    unitsLabel: 'Einheiten',
    regionLabel: 'Region',
    languageLabel: 'Sprache',
    imperial: 'Imperial (US)',
    metric: 'Metrisch (SI)',
  },
};

const SITE_LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English', href: '/en' },
  { code: 'es', short: 'ES', label: 'Español', href: '/es' },
  { code: 'fr', short: 'FR', label: 'Français', href: '/fr' },
  { code: 'de', short: 'DE', label: 'Deutsch', href: '/de' },
] as const;

const CURRENCIES = [
  { code: 'USD', locale: 'en-US',  label: '🇺🇸 USD ($)' },
  { code: 'EUR', locale: 'de-DE',  label: '🇪🇺 EUR (€)' },
  { code: 'GBP', locale: 'en-GB',  label: '🇬🇧 GBP (£)' },
  { code: 'JPY', locale: 'ja-JP',  label: '🇯🇵 JPY (¥)' },
  { code: 'INR', locale: 'en-IN',  label: '🇮🇳 INR (₹)' },
  { code: 'BDT', locale: 'bn-BD',  label: '🇧🇩 BDT (৳)' },
  { code: 'CAD', locale: 'en-CA',  label: '🇨🇦 CAD ($)' },
  { code: 'AUD', locale: 'en-AU',  label: '🇦🇺 AUD ($)' },
  { code: 'CNY', locale: 'zh-CN',  label: '🇨🇳 CNY (¥)' },
  { code: 'AED', locale: 'ar-AE',  label: '🇦🇪 AED (د.إ)' },
  { code: 'SAR', locale: 'ar-SA',  label: '🇸🇦 SAR (ر.س)' },
  { code: 'KRW', locale: 'ko-KR',  label: '🇰🇷 KRW (₩)' },
  { code: 'BRL', locale: 'pt-BR',  label: '🇧🇷 BRL (R$)' },
  { code: 'MXN', locale: 'es-MX',  label: '🇲🇽 MXN ($)' },
  { code: 'SGD', locale: 'en-SG',  label: '🇸🇬 SGD ($)' },
  { code: 'CHF', locale: 'de-CH',  label: '🇨🇭 CHF (Fr)' },
  { code: 'SEK', locale: 'sv-SE',  label: '🇸🇪 SEK (kr)' },
  { code: 'NOK', locale: 'nb-NO',  label: '🇳🇴 NOK (kr)' },
  { code: 'TRY', locale: 'tr-TR',  label: '🇹🇷 TRY (₺)' },
  { code: 'ZAR', locale: 'en-ZA',  label: '🇿🇦 ZAR (R)' },
  { code: 'IDR', locale: 'id-ID',  label: '🇮🇩 IDR (Rp)' },
  { code: 'PKR', locale: 'ur-PK',  label: '🇵🇰 PKR (₨)' },
] as const;

// Custom Dropdown Component
function CustomDropdown({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: any;
  label: string;
  value: string;
  options: { value: string; label: string; locale?: string }[];
  onChange: (val: string, locale?: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider hidden sm:flex">
        <Icon size={12} />
        <span>{label}:</span>
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-xs py-1.5 px-3 rounded-lg transition-colors border border-transparent focus:border-[#518231] outline-none min-w-[90px] sm:min-w-[120px]"
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-1.5 w-48 max-w-[calc(100vw-1rem)] bg-white/90 dark:bg-[#090E17]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value, opt.locale);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80 ${
                  value === opt.value
                    ? 'text-[#518231] dark:text-[#6fa844] font-semibold bg-[#518231]/5'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check size={12} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function GlobalSettingsBar() {
  const { currency, unitSystem, setCurrencyAndLocale, setUnitSystem } = useSettings();
  const locale = useLocale();
  const t = SETTINGS_BAR_COPY[locale] || SETTINGS_BAR_COPY.en;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const unitOptions = [
    { value: 'imperial', label: t.imperial },
    { value: 'metric', label: t.metric },
  ];

  const currencyOptions = CURRENCIES.map((c) => ({
    value: c.code,
    label: c.label,
    locale: c.locale,
  }));

  return (
    <div
      id="global-settings-bar"
      className="relative z-50 bg-white/80 dark:bg-[#090E17]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[11px] font-sans py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between gap-1.5 sm:gap-3 lg:gap-6 items-center min-h-[44px] transition-colors duration-300"
    >
      {/* Platform Verification & Privacy Status (SSR localized) */}
      <div className="flex-1 overflow-hidden mr-4 hidden md:flex items-center">
        <span className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
          <span className="bg-emerald-600/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            {t.badge}
          </span>
          {t.tagline}
        </span>
      </div>

      <div className="flex items-center justify-end gap-1.5 sm:gap-3 lg:gap-4 ml-auto">
        {/* Crawlable SSR Language Switcher */}
        <nav aria-label={t.languageLabel} className="flex items-center gap-1">
          <Languages size={12} className="text-slate-400 hidden sm:inline-block mr-0.5" aria-hidden="true" />
          {SITE_LANGUAGES.map((lang) => {
            const isActive = lang.code === locale;
            return (
              <a
                key={lang.code}
                href={lang.href}
                hrefLang={lang.code}
                title={lang.label}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'px-1.5 py-0.5 rounded bg-[#518231]/15 text-[#518231] dark:text-[#7ac14d] font-bold'
                    : 'px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 hover:text-[#518231] dark:hover:text-[#7ac14d] hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium transition-colors'
                }
              >
                {lang.short}
              </a>
            );
          })}
        </nav>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        {mounted ? (
          <>
            {/* Theme Toggle */}
            <ThemeToggle />

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            {/* Units Toggle */}
            <CustomDropdown
              icon={Ruler}
              label={t.unitsLabel}
              value={unitSystem}
              options={unitOptions}
              onChange={(val) => setUnitSystem(val as 'metric' | 'imperial')}
            />

            {/* Currency Toggle */}
            <CustomDropdown
              icon={Globe}
              label={t.regionLabel}
              value={currency}
              options={currencyOptions}
              onChange={(val, loc) => {
                if (loc) setCurrencyAndLocale(val as any, loc as any);
              }}
            />
          </>
        ) : (
          <div className="w-[210px] sm:w-[290px] h-7" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
