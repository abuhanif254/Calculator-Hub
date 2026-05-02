"use client";
import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { ThemeToggle } from './ThemeToggle';

const CURRENCIES = [
  { code: 'USD', locale: 'en-US', label: 'USD ($)' },
  { code: 'EUR', locale: 'de-DE', label: 'EUR (€)' },
  { code: 'GBP', locale: 'en-GB', label: 'GBP (£)' },
  { code: 'JPY', locale: 'ja-JP', label: 'JPY (¥)' },
  { code: 'INR', locale: 'en-IN', label: 'INR (₹)' },
  { code: 'CAD', locale: 'en-CA', label: 'CAD ($)' },
  { code: 'AUD', locale: 'en-AU', label: 'AUD ($)' },
] as const;

export function GlobalSettingsBar() {
  const { currency, unitSystem, setCurrencyAndLocale, setUnitSystem } = useSettings();

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white text-[11px] font-sans py-1.5 px-4 sm:px-6 lg:px-8 flex justify-end gap-6 items-center">
      
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Units Toggle */}
      <div className="flex items-center gap-2">
        <label htmlFor="unit-selector" className="text-slate-400 uppercase tracking-wider font-semibold">Units:</label>
        <select
          id="unit-selector"
          value={unitSystem}
          onChange={(e) => setUnitSystem(e.target.value as 'metric' | 'imperial')}
          className="bg-white border-none text-slate-100 text-[11px] py-0.5 px-2 rounded focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
        >
          <option value="imperial">Imperial (US)</option>
          <option value="metric">Metric (Global)</option>
        </select>
      </div>

      {/* Currency Toggle */}
      <div className="flex items-center gap-2">
        <label htmlFor="currency-selector" className="text-slate-400 uppercase tracking-wider font-semibold">Region / Currency:</label>
        <select
          id="currency-selector"
          value={currency}
          onChange={(e) => {
            const match = CURRENCIES.find(c => c.code === e.target.value);
            if (match) setCurrencyAndLocale(match.code as any, match.locale as any);
          }}
          className="bg-white border-none text-slate-100 text-[11px] py-0.5 px-2 rounded focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      </div>

    </div>
  );
}
