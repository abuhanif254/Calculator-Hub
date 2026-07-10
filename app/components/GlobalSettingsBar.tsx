"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { ThemeToggle } from './ThemeToggle';
import { Globe, Ruler, ChevronDown, Check } from 'lucide-react';

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
  onChange 
}: { 
  icon: any, 
  label: string, 
  value: string, 
  options: { value: string, label: string, locale?: string }[], 
  onChange: (val: string, locale?: string) => void 
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

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider hidden sm:flex">
        <Icon size={12} />
        <span>{label}:</span>
      </div>
      <button
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
                onClick={() => {
                  onChange(opt.value, opt.locale);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80 ${
                  value === opt.value ? 'text-[#518231] dark:text-[#6fa844] font-semibold bg-[#518231]/5' : 'text-slate-700 dark:text-slate-300'
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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white/80 dark:bg-[#090E17]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white py-1.5 px-4 sm:px-6 lg:px-8 flex justify-end gap-6 items-center min-h-[44px]">
      </div>
    );
  }

  const unitOptions = [
    { value: 'imperial', label: 'Imperial (US)' },
    { value: 'metric', label: 'Metric (Global)' }
  ];

  const currencyOptions = CURRENCIES.map(c => ({
    value: c.code,
    label: c.label,
    locale: c.locale
  }));

  return (
    <div id="global-settings-bar" className="relative z-50 bg-white/80 dark:bg-[#090E17]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[11px] font-sans py-1.5 px-4 sm:px-6 lg:px-8 flex justify-end gap-1.5 sm:gap-3 lg:gap-6 items-center min-h-[44px] transition-colors duration-300">
      
      {/* Theme Toggle - untouched */}
      <ThemeToggle />

      <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

      {/* Units Toggle */}
      <CustomDropdown
        icon={Ruler}
        label="Units"
        value={unitSystem}
        options={unitOptions}
        onChange={(val) => setUnitSystem(val as 'metric' | 'imperial')}
      />

      {/* Currency Toggle */}
      <CustomDropdown
        icon={Globe}
        label="Region"
        value={currency}
        options={currencyOptions}
        onChange={(val, locale) => {
          if (locale) setCurrencyAndLocale(val as any, locale as any);
        }}
      />

    </div>
  );
}
