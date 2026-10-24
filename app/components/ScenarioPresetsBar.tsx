"use client";

import React, { useState } from "react";
import { Sparkles, Check, RotateCcw } from "lucide-react";

interface ScenarioField {
  id: string;
  label: string;
  type: string;
  defaultValue: number | string;
  unit?: string;
  min?: number;
  max?: number;
}

interface ScenarioPresetsBarProps {
  fields?: ScenarioField[];
  category: string;
  locale: string;
  targetId?: string;
}

const uiTranslations: Record<
  string,
  {
    badge: string;
    reset: string;
    applied: string;
    finance: [string, string, string];
    health: [string, string, string];
    general: [string, string, string];
  }
> = {
  en: {
    badge: "Try a 1-Click Scenario:",
    reset: "Reset",
    applied: "Active",
    finance: [
      "Conservative / Starter",
      "Standard Market Benchmark",
      "High-Growth / Aggressive",
    ],
    health: [
      "Light / Baseline Profile",
      "Standard Adult Reference",
      "High-Intensity / Athlete",
    ],
    general: [
      "Low-Range Sample (0.65×)",
      "Standard Benchmark (1.0×)",
      "High-Range Sample (1.5×)",
    ],
  },
  es: {
    badge: "Probar escenario en 1 clic:",
    reset: "Restablecer",
    applied: "Activo",
    finance: [
      "Conservador / Inicial",
      "Referencia del Mercado",
      "Alto Crecimiento / Intensivo",
    ],
    health: [
      "Perfil Ligero / Base",
      "Referencia Adulto Estándar",
      "Alta Intensidad / Atleta",
    ],
    general: [
      "Escenario Bajo (0.65×)",
      "Referencia Estándar (1.0×)",
      "Escenario Alto (1.5×)",
    ],
  },
  fr: {
    badge: "Tester un scénario en 1 clic :",
    reset: "Réinitialiser",
    applied: "Actif",
    finance: [
      "Prudent / Débutant",
      "Référence du Marché",
      "Forte Croissance / Dynamique",
    ],
    health: [
      "Profil Léger / Base",
      "Référence Adulte Standard",
      "Haute Intensité / Athlète",
    ],
    general: [
      "Échantillon Bas (0,65×)",
      "Référence Standard (1,0×)",
      "Échantillon Haut (1,5×)",
    ],
  },
  de: {
    badge: "1-Klick-Szenario testen:",
    reset: "Zurücksetzen",
    applied: "Aktiv",
    finance: [
      "Konservativ / Einsteiger",
      "Standard-Marktreferenz",
      "Wachstum / Dynamisch",
    ],
    health: [
      "Leichtes Basisprofil",
      "Standard-Erwachsenenprofil",
      "Leistungssport / Intensiv",
    ],
    general: [
      "Kleines Szenario (0,65×)",
      "Standard-Referenz (1,0×)",
      "Großes Szenario (1,5×)",
    ],
  },
};

function roundScenarioValue(val: number, baseline: number, min?: number, max?: number): number {
  let result: number;
  if (baseline >= 1000) {
    result = Math.round(val / 50) * 50;
  } else if (baseline >= 100) {
    result = Math.round(val / 5) * 5;
  } else if (Number.isInteger(baseline) && baseline >= 10) {
    result = Math.round(val);
  } else {
    result = Math.round(val * 100) / 100;
  }
  if (typeof min === "number" && !Number.isNaN(min)) {
    result = Math.max(min, result);
  }
  if (typeof max === "number" && !Number.isNaN(max)) {
    result = Math.min(max, result);
  }
  return result;
}

export function ScenarioPresetsBar({
  fields = [],
  category,
  locale,
  targetId = "calculator-export-target",
}: ScenarioPresetsBarProps) {
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const t = uiTranslations[locale] || uiTranslations.en;

  const catLower = category.toLowerCase();
  const isFinance = catLower.includes("financ");
  const isHealth = catLower.includes("health") || catLower.includes("fitness");
  const labels = isFinance ? t.finance : isHealth ? t.health : t.general;

  const multipliers = [0.65, 1.0, 1.5];

  const numericFields = fields.filter(
    (f) => f.type === "number" && typeof Number(f.defaultValue) === "number" && !Number.isNaN(Number(f.defaultValue))
  );

  const getPreviewHint = (mult: number): string | null => {
    if (numericFields.length === 0) return null;
    const sample = numericFields.slice(0, 2).map((f) => {
      const base = Number(f.defaultValue) || 100;
      const scaled = roundScenarioValue(base * mult, base, f.min, f.max);
      const formatted = scaled.toLocaleString("en-US", { maximumFractionDigits: 2 });
      return f.unit ? `${formatted} ${f.unit}` : formatted;
    });
    return sample.join(" • ");
  };

  const applyMultiplierToDom = (mult: number, presetIndex: number | null) => {
    const container = document.getElementById(targetId);
    if (!container) return;

    const inputs = Array.from(
      container.querySelectorAll<HTMLInputElement>(
        'input[type="number"], input[type="range"], input[inputmode="decimal"], input[inputmode="numeric"], input[type="text"]'
      )
    ).filter((el) => !el.readOnly && !el.disabled && el.type !== "search");

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;

    inputs.forEach((input, idx) => {
      let baselineStr = input.getAttribute("data-nexus-baseline");
      if (!baselineStr) {
        const currentClean = input.value.replace(/[^0-9.-]/g, "");
        const fallbackFieldVal = numericFields[idx]?.defaultValue;
        const parsedCurrent = parseFloat(currentClean);
        const initialBase =
          !Number.isNaN(parsedCurrent) && parsedCurrent !== 0
            ? parsedCurrent
            : typeof fallbackFieldVal !== "undefined" && !Number.isNaN(Number(fallbackFieldVal))
            ? Number(fallbackFieldVal)
            : 100;
        baselineStr = String(initialBase);
        input.setAttribute("data-nexus-baseline", baselineStr);
      }

      const baseline = parseFloat(baselineStr);
      if (Number.isNaN(baseline)) return;

      const minAttr = input.min !== "" ? parseFloat(input.min) : numericFields[idx]?.min;
      const maxAttr = input.max !== "" ? parseFloat(input.max) : numericFields[idx]?.max;
      const newVal = roundScenarioValue(baseline * mult, baseline, minAttr, maxAttr);

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(input, String(newVal));
      } else {
        input.value = String(newVal);
      }

      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    setActivePreset(presetIndex);
  };

  return (
    <div className="mb-4 p-3 sm:p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 print:hidden">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#518231]/15 text-[#518231] dark:text-[#6fa844]">
          <Sparkles className="w-3.5 h-3.5" />
        </span>
        <span>{t.badge}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {multipliers.map((mult, idx) => {
          const isSelected = activePreset === idx;
          const hint = getPreviewHint(mult);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => applyMultiplierToDom(mult, idx)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                isSelected
                  ? "bg-[#518231] text-white border-[#518231] shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-[#518231] dark:hover:border-[#6fa844] hover:text-[#518231] dark:hover:text-[#6fa844]"
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              <span>{labels[idx]}</span>
              {hint && (
                <span
                  className={`hidden md:inline text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-700/70 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {hint}
                </span>
              )}
            </button>
          );
        })}

        {activePreset !== null && (
          <button
            type="button"
            onClick={() => applyMultiplierToDom(1.0, null)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            title={t.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.reset}</span>
          </button>
        )}
      </div>
    </div>
  );
}
