'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
import type { CalculatorDef } from '@/lib/types';
import {
  UNIT_CONVERTER_SPECS,
  convertForward,
  convertReverse,
  type UnitPairSpec,
} from '@/lib/data/unitConverterSpecs';
import { Link, resolveIntlHref } from '@/i18n/routing';

interface UnitPairConverterViewProps {
  calcDef?: CalculatorDef;
  locale?: string;
}

const UI_COPY: Record<
  'en' | 'es' | 'fr' | 'de',
  {
    swap: string;
    copy: string;
    copied: string;
    reset: string;
    precision: string;
    decimals: string;
    quickPresets: string;
    formulaLabel: string;
    reverseLinkPrefix: string;
    binaryNote: string;
    imperialGalNote: string;
  }
> = {
  en: {
    swap: 'Swap Direction',
    copy: 'Copy Result',
    copied: 'Copied',
    reset: 'Reset',
    precision: 'Decimal Precision',
    decimals: 'decimals',
    quickPresets: 'Quick Values',
    formulaLabel: 'Exact Formula',
    reverseLinkPrefix: 'Need the reverse conversion? Open',
    binaryNote: 'Binary IEC equivalent (÷ 1,024):',
    imperialGalNote: 'UK Imperial Gallons (÷ 4.54609):',
  },
  es: {
    swap: 'Invertir Dirección',
    copy: 'Copiar Resultado',
    copied: 'Copiado',
    reset: 'Restablecer',
    precision: 'Precisión Decimal',
    decimals: 'decimales',
    quickPresets: 'Valores Rápidos',
    formulaLabel: 'Fórmula Exacta',
    reverseLinkPrefix: '¿Necesita la conversión inversa? Abrir',
    binaryNote: 'Equivalente binario IEC (÷ 1.024):',
    imperialGalNote: 'Galones Imperiales UK (÷ 4,54609):',
  },
  fr: {
    swap: 'Inverser le Sens',
    copy: 'Copier le Résultat',
    copied: 'Copié',
    reset: 'Réinitialiser',
    precision: 'Précision Décimale',
    decimals: 'décimales',
    quickPresets: 'Valeurs Rapides',
    formulaLabel: 'Formule Exacte',
    reverseLinkPrefix: 'Besoin de la conversion inverse ? Ouvrir',
    binaryNote: 'Équivalent binaire CEI (÷ 1 024) :',
    imperialGalNote: 'Gallons Impériaux UK (÷ 4,54609) :',
  },
  de: {
    swap: 'Richtung tauschen',
    copy: 'Ergebnis kopieren',
    copied: 'Kopiert',
    reset: 'Zurücksetzen',
    precision: 'Nachkommastellen',
    decimals: 'Stellen',
    quickPresets: 'Schnellwerte',
    formulaLabel: 'Exakte Formel',
    reverseLinkPrefix: 'Umgekehrte Umrechnung benötigt? Öffnen:',
    binaryNote: 'Binärwert nach IEC (÷ 1.024):',
    imperialGalNote: 'Britische Imperial-Gallonen (÷ 4,54609):',
  },
};

function formatNum(val: number, decimals: number): string {
  if (!Number.isFinite(val)) return '';
  if (Math.abs(val) >= 1e9 || (val !== 0 && Math.abs(val) < 1e-6)) {
    return val.toExponential(decimals);
  }
  return Number(val.toFixed(decimals)).toString();
}

export function UnitPairConverterView({ calcDef, locale = 'en' }: UnitPairConverterViewProps) {
  const loc = (locale === 'es' || locale === 'fr' || locale === 'de' ? locale : 'en') as 'en' | 'es' | 'fr' | 'de';
  const spec: UnitPairSpec =
    (calcDef?.slug && UNIT_CONVERTER_SPECS[calcDef.slug]) || UNIT_CONVERTER_SPECS['cm-to-inches'];
  const ui = UI_COPY[loc];
  const lbl = spec.labels[loc];

  const [swapped, setSwapped] = useState(false);
  const [precision, setPrecision] = useState<number>(4);
  const [paramVal, setParamVal] = useState<number>(
    spec.slug === 'watts-to-amps' && loc !== 'en' ? 230 : spec.paramDefault ?? 16
  );
  const [inputStr, setInputStr] = useState<string>(String(spec.defaultInput));
  const [copied, setCopied] = useState(false);

  const numericInput = Number(inputStr);
  const isValid = inputStr.trim() !== '' && Number.isFinite(numericInput);

  const outputNum = useMemo(() => {
    if (!isValid) return NaN;
    return swapped ? convertReverse(spec, numericInput, paramVal) : convertForward(spec, numericInput, paramVal);
  }, [isValid, numericInput, swapped, spec, paramVal]);

  const formattedOutput = isValid ? formatNum(outputNum, precision) : '';
  const activeFromName = swapped ? lbl.toName : lbl.fromName;
  const activeToName = swapped ? lbl.fromName : lbl.toName;
  const activeFromSymbol = swapped ? spec.toSymbol : spec.fromSymbol;
  const activeToSymbol = swapped ? spec.fromSymbol : spec.toSymbol;

  const handleSwap = () => {
    if (isValid) {
      setInputStr(formatNum(outputNum, precision));
    }
    setSwapped((prev) => !prev);
  };

  const handleReset = () => {
    setSwapped(false);
    setInputStr(String(spec.defaultInput));
    setPrecision(4);
    if (spec.paramDefault !== undefined) {
      setParamVal(spec.slug === 'watts-to-amps' && loc !== 'en' ? 230 : spec.paramDefault);
    }
  };

  const handleCopy = async () => {
    if (!formattedOutput) return;
    try {
      await navigator.clipboard.writeText(`${formattedOutput} ${activeToSymbol}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failures in restricted frames
    }
  };

  return (
    <div id="calculator-export-target" className="w-full space-y-6">
      {/* Main Conversion Panel */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6">
        {/* Optional Secondary Parameter Bar (px-to-rem base font, watts-to-amps voltage, kwh-to-watts hours) */}
        {spec.paramOptions && lbl.paramLabel && (
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lbl.paramLabel}
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {spec.paramOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setParamVal(opt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    paramVal === opt
                      ? 'bg-[#518231] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {opt}
                  {spec.kind === 'px-to-rem' ? 'px' : spec.kind === 'watts-to-amps' ? 'V' : 'h'}
                </button>
              ))}
              <input
                type="number"
                min="0.1"
                step="any"
                value={paramVal}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  if (Number.isFinite(v) && v > 0) setParamVal(v);
                }}
                aria-label={lbl.paramLabel}
                className="w-20 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#518231]"
              />
            </div>
          </div>
        )}

        {/* Bidirectional Input → Result Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          {/* From Field */}
          <div className="space-y-2">
            <label
              htmlFor="unit-converter-input"
              className="block text-sm font-bold text-slate-700 dark:text-slate-200"
            >
              {activeFromName}
            </label>
            <div className="relative">
              <input
                id="unit-converter-input"
                type="number"
                step="any"
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value)}
                className="w-full pl-4 pr-16 py-4 rounded-2xl text-2xl font-extrabold bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#518231] focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 dark:text-slate-500">
                {activeFromSymbol}
              </span>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:pb-2">
            <button
              type="button"
              onClick={handleSwap}
              title={ui.swap}
              aria-label={ui.swap}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 md:p-3.5 rounded-2xl bg-[#518231]/10 hover:bg-[#518231] text-[#518231] hover:text-white border border-[#518231]/25 transition-all font-semibold text-sm shadow-sm"
            >
              <ArrowLeftRight className="w-5 h-5" />
              <span className="md:hidden">{ui.swap}</span>
            </button>
          </div>

          {/* Result Display */}
          <div className="space-y-2">
            <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">
              {activeToName}
            </span>
            <div className="relative flex items-center justify-between px-4 py-4 rounded-2xl bg-emerald-50/70 dark:bg-[#518231]/15 border-2 border-[#518231]/40">
              <output
                htmlFor="unit-converter-input"
                className="text-2xl font-extrabold text-[#365b1f] dark:text-[#86d254] truncate pr-14"
              >
                {formattedOutput || '—'}
              </output>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#518231] dark:text-[#86d254]">
                {activeToSymbol}
              </span>
            </div>
          </div>
        </div>

        {/* Live Equation Readout & Optional Companion Standard Readout */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#518231] dark:text-[#7ac14d]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{ui.formulaLabel}</span>
            </div>
            <p className="text-sm font-mono font-semibold text-slate-800 dark:text-slate-200">
              {isValid
                ? `${inputStr} ${activeFromSymbol} = ${formattedOutput} ${activeToSymbol}`
                : lbl.formulaSummary}
              <span className="ml-3 text-xs text-slate-500 dark:text-slate-400">({lbl.formulaSummary})</span>
            </p>
            {spec.slug === 'mb-to-gb' && isValid && !swapped && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ui.binaryNote} <strong>{formatNum(numericInput / 1024, precision)} GiB</strong>
              </p>
            )}
            {spec.slug === 'liters-to-gallons' && isValid && !swapped && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ui.imperialGalNote} <strong>{formatNum(numericInput / 4.54609, precision)} imp gal</strong>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!formattedOutput}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#518231] hover:bg-[#436a28] disabled:opacity-50 text-white text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? ui.copied : ui.copy}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{ui.reset}</span>
            </button>
          </div>
        </div>

        {/* Quick Values & Precision Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
              {ui.quickPresets}:
            </span>
            {spec.quickValues.map((qv) => (
              <button
                key={qv}
                type="button"
                onClick={() => setInputStr(String(qv))}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-[#518231]/15 hover:text-[#518231] dark:hover:text-[#7ac14d] text-slate-700 dark:text-slate-300 transition-colors"
              >
                {qv} {activeFromSymbol}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400">{ui.precision}:</span>
            {[2, 4, 6].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setPrecision(d)}
                className={`px-2 py-1 rounded-md font-bold transition-colors ${
                  precision === d
                    ? 'bg-[#518231] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Cross-Link to Dedicated Reverse Converter Page */}
        {spec.reverseSlug && (
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
            {ui.reverseLinkPrefix}{' '}
            <Link
              href={resolveIntlHref(`/calculators/${spec.reverseSlug}`)}
              className="font-bold text-[#518231] dark:text-[#7ac14d] hover:underline"
            >
              {spec.toSymbol} → {spec.fromSymbol}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
