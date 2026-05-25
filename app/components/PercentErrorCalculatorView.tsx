"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { InlineMath, BlockMath } from "@/app/components/KatexMath";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { 
  Sliders, 
  RotateCcw, 
  Copy, 
  Check, 
  Download, 
  HelpCircle, 
  Info, 
  Clock, 
  Database,
  ArrowRightLeft,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface PercentErrorCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

const PHYSICS_PRESETS = [
  { name: "Acceleration due to Gravity", exp: "9.58", theo: "9.80665", unit: "m/s²", desc: "Comparing student lab pendulum measurement against accepted earth gravity standard." },
  { name: "Speed of Sound (20°C)", exp: "340.2", theo: "343.2", unit: "m/s", desc: "Student measurement using resonance tube vs accepted speed of sound in dry air." },
  { name: "Gravitational Constant G", exp: "6.51e-11", theo: "6.6743e-11", unit: "N·m²/kg²", desc: "Cavendish torsion balance experiment measurement against CODATA accepted value." },
  { name: "Density of Aluminum", exp: "2.62", theo: "2.70", unit: "g/cm³", desc: "Archimedes water displacement lab measurement vs accepted handbook density." }
];

const CHEMISTRY_PRESETS = [
  { name: "Density of Pure Water (4°C)", exp: "0.985", theo: "1.000", unit: "g/cm³", desc: "Density measurement using pycnometer vs absolute water density reference." },
  { name: "Ideal Gas Constant R", exp: "0.0845", theo: "0.082057", unit: "L·atm/(mol·K)", desc: "Determination of gas constant R from gas syringe experiment vs accepted theoretical constant." },
  { name: "Molar Mass of Carbon Dioxide", exp: "43.1", theo: "44.01", unit: "g/mol", desc: "Lab calculation from vapor density vs theoretical periodic table molar mass." },
  { name: "Avogadro's Number", exp: "5.88e23", theo: "6.02214e23", unit: "particles/mol", desc: "Electroplating experiment determination of N_A vs defined constant value." }
];

export function PercentErrorCalculatorView({ calcDef }: PercentErrorCalculatorViewProps) {
  // Modes: 'error' (experimental vs theoretical), 'difference' (value 1 vs value 2)
  const [mode, setMode] = useState<'error' | 'difference'>('error');
  const [activePresetGroup, setActivePresetGroup] = useState<'physics' | 'chemistry'>('physics');
  const [activePreset, setActivePreset] = useState<string>("");

  // Input states
  const [expValue, setExpValue] = useState<string>("9.58");
  const [theoValue, setTheoValue] = useState<string>("9.80665");
  const [val1, setVal1] = useState<string>("15.2");
  const [val2, setVal2] = useState<string>("14.8");
  const [customUnit, setCustomUnit] = useState<string>("units");
  const [precision, setPrecision] = useState<number>(4);

  // Output/Results
  const [result, setResult] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Copy indicator states
  const [copiedResult, setCopiedResult] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [copiedData, setCopiedData] = useState(false);

  // History list
  const [history, setHistory] = useState<any[]>([]);

  // Parse scientific notation safely
  const parseValue = (str: string): number => {
    if (!str) return NaN;
    const clean = str.trim().toLowerCase();
    if (!clean) return NaN;
    
    // Support "6.022 x 10^23", "6.022*10^23", "6.022e23"
    if (clean.includes('x10^')) {
      const parts = clean.split('x10^');
      return Number(parts[0]) * Math.pow(10, Number(parts[1]));
    }
    if (clean.includes('x 10^')) {
      const parts = clean.split('x 10^');
      return Number(parts[0]) * Math.pow(10, Number(parts[1]));
    }
    if (clean.includes('*10^')) {
      const parts = clean.split('*10^');
      return Number(parts[0]) * Math.pow(10, Number(parts[1]));
    }
    return Number(clean);
  };

  // Format scientific values nicely
  const formatValue = (num: number, limit = 4): string => {
    if (num === 0) return "0";
    if (isNaN(num) || !isFinite(num)) return "NaN";
    
    const abs = Math.abs(num);
    // Standard localized formats for normal ranges
    if (abs >= 0.0001 && abs < 1000000) {
      return num.toLocaleString(undefined, { 
        maximumFractionDigits: limit,
        minimumFractionDigits: 0
      });
    }
    
    // Format large/small values in scientific notation
    const expStr = num.toExponential(limit);
    const [coeff, exp] = expStr.split('e');
    const cleanExp = exp.replace('+', '');
    return `${coeff} × 10^${cleanExp}`;
  };

  // Load history list from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("percent-error-calculator-history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load calculation history", e);
    }
  }, []);

  // Handle preset loading
  const handlePresetSelect = (presetName: string) => {
    setActivePreset(presetName);
    if (!presetName) return;

    const group = activePresetGroup === 'physics' ? PHYSICS_PRESETS : CHEMISTRY_PRESETS;
    const preset = group.find(p => p.name === presetName);
    if (preset) {
      setExpValue(preset.exp);
      setTheoValue(preset.theo);
      setCustomUnit(preset.unit);
    }
  };

  // Scientific calculation routine
  const calculate = () => {
    setValidationError(null);

    try {
      if (mode === "error") {
        const E = parseValue(expValue);
        const T = parseValue(theoValue);

        if (isNaN(E) || isNaN(T)) {
          setValidationError("Please enter valid numeric values. Scientific notation (e.g. 1.23e-4) is fully supported.");
          return;
        }
        if (T === 0) {
          setValidationError("Theoretical/accepted value cannot be zero because dividing by zero is mathematically undefined.");
          return;
        }

        const absoluteDiff = Math.abs(E - T);
        const deviation = E - T;
        const relativeError = absoluteDiff / Math.abs(T);
        const percentErrorVal = relativeError * 100;
        const precisionScore = Math.max(0, Math.min(100, 100 - percentErrorVal));

        // Define accuracy rating
        let rating = "Low Accuracy";
        let ratingColor = "text-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50";
        let ratingBadge = "bg-red-500 text-white";
        if (percentErrorVal <= 1.0) {
          rating = "Excellent Accuracy";
          ratingColor = "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900/50";
          ratingBadge = "bg-emerald-500 text-white";
        } else if (percentErrorVal <= 5.0) {
          rating = "High Accuracy";
          ratingColor = "text-teal-600 bg-teal-50 dark:bg-teal-950/20 dark:border-teal-900/50";
          ratingBadge = "bg-teal-500 text-white";
        } else if (percentErrorVal <= 10.0) {
          rating = "Moderate / Acceptable";
          ratingColor = "text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50";
          ratingBadge = "bg-amber-500 text-white";
        }

        const steps = [
          {
            desc: "Identify the formula for percent error:",
            latex: "\\text{Percent Error} = \\frac{|\\text{Experimental} - \\text{Theoretical}|}{|\\text{Theoretical}|} \\times 100\\%"
          },
          {
            desc: "Substitute experimental (E) and theoretical (T) values into the equation:",
            latex: `\\text{Percent Error} = \\frac{|${formatValue(E)} - ${formatValue(T)}|}{|${formatValue(T)}|} \\times 100\\%`
          },
          {
            desc: "Calculate absolute error (absolute difference in numerator):",
            latex: `\\text{Absolute Error} = |${formatValue(E)} - ${formatValue(T)}| = |${formatValue(deviation)}| = ${formatValue(absoluteDiff)}`
          },
          {
            desc: "Calculate relative error (divide absolute error by absolute theoretical value):",
            latex: `\\text{Relative Error} = \\frac{${formatValue(absoluteDiff)}}{${formatValue(Math.abs(T))}} = ${relativeError.toFixed(precision + 2)}`
          },
          {
            desc: "Multiply relative error by 100 to get percentage error:",
            latex: `\\text{Percent Error} = ${relativeError.toFixed(precision + 2)} \\times 100 = ${percentErrorVal.toFixed(precision)}\\%`
          }
        ];

        setResult({
          percentError: percentErrorVal,
          absoluteError: absoluteDiff,
          relativeError,
          deviation,
          precisionScore,
          rating,
          ratingColor,
          ratingBadge,
          steps,
          chartData: [
            { name: "Theoretical", value: T, fill: "#3b82f6" },
            { name: "Experimental", value: E, fill: "#8b5cf6" },
            { name: "Absolute Error", value: absoluteDiff, fill: "#ef4444" }
          ]
        });

        // Store to local history list
        saveToHistory({
          mode,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          preset: activePreset || "Custom Values",
          summary: `Err: ${percentErrorVal.toFixed(2)}% (E: ${formatValue(E)}, T: ${formatValue(T)})`
        });

      } else {
        // Difference Mode
        const V1 = parseValue(val1);
        const V2 = parseValue(val2);

        if (isNaN(V1) || isNaN(V2)) {
          setValidationError("Please enter valid numeric values for both experimental measurements.");
          return;
        }
        if (V1 + V2 === 0) {
          setValidationError("The sum of Value 1 and Value 2 cannot be zero.");
          return;
        }

        const absoluteDiff = Math.abs(V1 - V2);
        const average = (V1 + V2) / 2;
        const relativeDiff = absoluteDiff / Math.abs(average);
        const percentDiffVal = relativeDiff * 100;
        const precisionScore = Math.max(0, Math.min(100, 100 - percentDiffVal));

        // Rating
        let rating = "Significant Difference";
        let ratingColor = "text-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50";
        let ratingBadge = "bg-red-500 text-white";
        if (percentDiffVal <= 1.0) {
          rating = "Minimal Difference";
          ratingColor = "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900/50";
          ratingBadge = "bg-emerald-500 text-white";
        } else if (percentDiffVal <= 5.0) {
          rating = "Close Correlation";
          ratingColor = "text-teal-600 bg-teal-50 dark:bg-teal-950/20 dark:border-teal-900/50";
          ratingBadge = "bg-teal-500 text-white";
        } else if (percentDiffVal <= 10.0) {
          rating = "Moderate Variance";
          ratingColor = "text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50";
          ratingBadge = "bg-amber-500 text-white";
        }

        const steps = [
          {
            desc: "Identify the formula for percent difference between two measurements:",
            latex: "\\text{Percent Difference} = \\frac{|V_1 - V_2|}{\\frac{V_1 + V_2}{2}} \\times 100\\%"
          },
          {
            desc: "Substitute measurement values V₁ and V₂ into the formula:",
            latex: `\\text{Percent Difference} = \\frac{|${formatValue(V1)} - ${formatValue(V2)}|}{\\frac{${formatValue(V1)} + ${formatValue(V2)}}{2}} \\times 100\\%`
          },
          {
            desc: "Calculate absolute difference (numerator):",
            latex: `\\text{Difference} = |${formatValue(V1)} - ${formatValue(V2)}| = ${formatValue(absoluteDiff)}`
          },
          {
            desc: "Calculate average value (denominator):",
            latex: `\\text{Average} = \\frac{${formatValue(V1)} + ${formatValue(V2)}}{2} = ${formatValue(average)}`
          },
          {
            desc: "Divide absolute difference by average to get relative difference:",
            latex: `\\text{Relative Difference} = \\frac{${formatValue(absoluteDiff)}}{${formatValue(average)}} = ${relativeDiff.toFixed(precision + 2)}`
          },
          {
            desc: "Multiply by 100 to get percent difference:",
            latex: `\\text{Percent Difference} = ${relativeDiff.toFixed(precision + 2)} \\times 100 = ${percentDiffVal.toFixed(precision)}\\%`
          }
        ];

        setResult({
          percentError: percentDiffVal, // reuse key for simplicity in result cards
          absoluteError: absoluteDiff,
          relativeError: relativeDiff,
          deviation: V1 - V2,
          precisionScore,
          rating,
          ratingColor,
          ratingBadge,
          steps,
          chartData: [
            { name: "Value 1 (V₁)", value: V1, fill: "#3b82f6" },
            { name: "Value 2 (V₂)", value: V2, fill: "#8b5cf6" },
            { name: "Difference", value: absoluteDiff, fill: "#ef4444" }
          ]
        });

        saveToHistory({
          mode,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          preset: "Comparative Mode",
          summary: `Diff: ${percentDiffVal.toFixed(2)}% (V1: ${formatValue(V1)}, V2: ${formatValue(V2)})`
        });
      }
    } catch (e) {
      console.error(e);
      setValidationError("An error occurred during scientific calculation. Check exponent or decimal syntax.");
    }
  };

  const saveToHistory = (item: { mode: string; timestamp: string; preset: string; summary: string }) => {
    const historyItem = {
      id: Date.now(),
      ...item,
      details: {
        expValue,
        theoValue,
        val1,
        val2,
        customUnit,
        mode
      }
    };
    
    setHistory(prev => {
      const filtered = prev.filter(h => h.summary !== item.summary);
      const updated = [historyItem, ...filtered.slice(0, 19)];
      localStorage.setItem("percent-error-calculator-history", JSON.stringify(updated));
      return updated;
    });
  };

  const restoreHistory = (item: any) => {
    setMode(item.details.mode);
    if (item.details.mode === "error") {
      setExpValue(item.details.expValue);
      setTheoValue(item.details.theoValue);
    } else {
      setVal1(item.details.val1);
      setVal2(item.details.val2);
    }
    setCustomUnit(item.details.customUnit);
    setActivePreset(item.preset === "Custom Values" || item.preset === "Comparative Mode" ? "" : item.preset);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("percent-error-calculator-history");
  };

  // Re-run calculations on change
  useEffect(() => {
    calculate();
  }, [mode, expValue, theoValue, val1, val2, precision]);

  // Copy features
  const copyText = (text: string, type: 'result' | 'formula' | 'data') => {
    navigator.clipboard.writeText(text);
    if (type === 'result') {
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2000);
    } else if (type === 'formula') {
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2000);
    } else if (type === 'data') {
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2000);
    }
  };

  // Export report routines
  const downloadReport = (format: 'txt' | 'csv' | 'json') => {
    if (!result) return;

    if (format === 'txt') {
      let txt = "====================================================\n";
      txt += `          PERCENT ERROR CALCULATION REPORT          \n`;
      txt += "====================================================\n";
      txt += `Calculation Mode: ${mode === 'error' ? 'Experimental vs Theoretical' : 'Percent Difference'}\n`;
      txt += `Timestamp: ${new Date().toLocaleString()}\n`;
      txt += `Preset Group: ${mode === 'error' ? activePresetGroup.toUpperCase() : 'None'}\n`;
      txt += `Active Preset: ${activePreset || 'None'}\n`;
      txt += `Measurement Units: ${customUnit}\n\n`;
      
      txt += "INPUT METRICS:\n";
      if (mode === 'error') {
        txt += `- Experimental Value (E): ${expValue}\n`;
        txt += `- Theoretical Value (T): ${theoValue}\n`;
      } else {
        txt += `- Value 1 (V₁): ${val1}\n`;
        txt += `- Value 2 (V₂): ${val2}\n`;
      }
      
      txt += "\nRESULTS SUMMARY:\n";
      txt += `- Percent ${mode === 'error' ? 'Error' : 'Difference'}: ${result.percentError.toFixed(precision)}%\n`;
      txt += `- Absolute Error: ${result.absoluteError.toFixed(precision)}\n`;
      txt += `- Relative Error: ${result.relativeError.toFixed(precision + 2)}\n`;
      txt += `- Deviation: ${result.deviation.toFixed(precision)}\n`;
      txt += `- Accuracy Rating: ${result.rating}\n`;
      txt += `- Precision Score: ${result.precisionScore.toFixed(1)}/100\n`;
      txt += "====================================================\n";
      
      const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `percent-error-report.txt`;
      link.click();
    }
    
    else if (format === 'csv') {
      let csv = "Variable,Value,Unit\n";
      if (mode === 'error') {
        csv += `Experimental,${expValue},${customUnit}\n`;
        csv += `Theoretical,${theoValue},${customUnit}\n`;
      } else {
        csv += `Value 1,${val1},${customUnit}\n`;
        csv += `Value 2,${val2},${customUnit}\n`;
      }
      csv += `Percent Error/Difference,${result.percentError.toFixed(precision)},%\n`;
      csv += `Absolute Error,${result.absoluteError.toFixed(precision)},${customUnit}\n`;
      csv += `Relative Error,${result.relativeError.toFixed(precision + 2)},ratio\n`;

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `percent-error-data.csv`;
      link.click();
    }
    
    else if (format === 'json') {
      const data = {
        mode,
        inputs: mode === 'error' ? { experimental: expValue, theoretical: theoValue } : { value1: val1, value2: val2 },
        units: customUnit,
        results: {
          percentErrorOrDiff: result.percentError,
          absoluteError: result.absoluteError,
          relativeError: result.relativeError,
          deviation: result.deviation,
          precisionScore: result.precisionScore,
          rating: result.rating
        }
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `percent-error-data.json`;
      link.click();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden font-sans">
      
      {/* Header Panel */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {calcDef.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Calculate absolute, relative, and percentage errors or variances in experimental measurements.
            </p>
          </div>
        </div>
      </div>

      {/* Modes tab selector */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto scrollbar-thin bg-slate-50/30 dark:bg-slate-900">
        {[
          { key: 'error', label: 'Experimental vs Theoretical (Percent Error)' },
          { key: 'difference', label: 'Measurement Comparison (Percent Difference)' }
        ].map((tab) => (
          <button 
            key={tab.key}
            onClick={() => {
              setMode(tab.key as any);
              setResult(null);
              setActivePreset("");
            }}
            className={`py-4 px-6 text-center font-bold text-sm border-b-2 transition-all whitespace-nowrap outline-none ${
              mode === tab.key 
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 bg-white dark:bg-slate-800' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Preset options under Standard Mode */}
          {mode === "error" && (
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <Database className="w-3.5 h-3.5" />
                  <span>Lab Presets Database</span>
                </label>
                <div className="flex gap-2 bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                  <button 
                    onClick={() => {
                      setActivePresetGroup('physics');
                      setActivePreset("");
                    }}
                    className={`px-2 py-1 rounded-md transition ${activePresetGroup === 'physics' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
                  >
                    Physics
                  </button>
                  <button 
                    onClick={() => {
                      setActivePresetGroup('chemistry');
                      setActivePreset("");
                    }}
                    className={`px-2 py-1 rounded-md transition ${activePresetGroup === 'chemistry' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
                  >
                    Chemistry
                  </button>
                </div>
              </div>

              <select
                value={activePreset}
                onChange={(e) => handlePresetSelect(e.target.value)}
                className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all shadow-sm"
              >
                <option value="">-- Custom (Enter values manually) --</option>
                {(activePresetGroup === 'physics' ? PHYSICS_PRESETS : CHEMISTRY_PRESETS).map((preset) => (
                  <option key={preset.name} value={preset.name}>
                    {preset.name}
                  </option>
                ))}
              </select>
              
              {activePreset && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  { (activePresetGroup === 'physics' ? PHYSICS_PRESETS : CHEMISTRY_PRESETS).find(p => p.name === activePreset)?.desc }
                </p>
              )}
            </div>
          )}

          {/* Validation Alert */}
          {validationError && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-4 flex gap-2">
              <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-red-800 dark:text-red-300">{validationError}</span>
            </div>
          )}

          {/* Numeric Inputs */}
          <div className="space-y-4">
            {mode === 'error' ? (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Theoretical / Accepted Value (T)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={theoValue}
                      onChange={(e) => {
                        setTheoValue(e.target.value);
                        setActivePreset("");
                      }}
                      className="w-full h-12 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-medium text-sm transition-all shadow-sm"
                      placeholder="e.g. 9.80665"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">The established reference standard, handbook, or accepted constant value.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Experimental / Measured Value (E)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={expValue}
                      onChange={(e) => {
                        setExpValue(e.target.value);
                        setActivePreset("");
                      }}
                      className="w-full h-12 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-medium text-sm transition-all shadow-sm"
                      placeholder="e.g. 9.58"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">The actual value obtained via lab testing, trials, or observations.</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    First Measured Value (V₁)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={val1}
                      onChange={(e) => setVal1(e.target.value)}
                      className="w-full h-12 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-medium text-sm transition-all shadow-sm"
                      placeholder="e.g. 15.2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Second Measured Value (V₂)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={val2}
                      onChange={(e) => setVal2(e.target.value)}
                      className="w-full h-12 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-medium text-sm transition-all shadow-sm"
                      placeholder="e.g. 14.8"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Custom unit labels and decimal limits */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Units (Label Only)
                </label>
                <input
                  type="text"
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-medium text-sm transition-all"
                  placeholder="e.g. g/cm³"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Decimal Precision
                </label>
                <select
                  value={precision}
                  onChange={(e) => setPrecision(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                >
                  {[2, 3, 4, 5, 6, 8].map(p => (
                    <option key={p} value={p}>{p} decimal places</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Clean / Reset Form */}
          <button
            onClick={() => {
              if (mode === "error") {
                setExpValue("");
                setTheoValue("");
              } else {
                setVal1("");
                setVal2("");
              }
              setValidationError(null);
              setResult(null);
            }}
            className="w-full h-11 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl font-semibold text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Inputs</span>
          </button>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-7 space-y-8 bg-slate-50/50 dark:bg-slate-800/10 p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/40">
          {result ? (
            <div className="space-y-6">
              
              {/* Primary Error/Accuracy Rating Badge & Percent Result */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Score Box */}
                <div className="bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">
                      Calculated {mode === 'error' ? 'Percent Error' : 'Percent Difference'}
                    </h3>
                    <div className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-tight font-mono">
                      {result.percentError.toFixed(precision)}%
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => copyText(`${result.percentError.toFixed(precision)}%`, 'result')}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      {copiedResult ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Value</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Rating & Accuracy analysis */}
                <div className={`border rounded-2xl p-6 shadow-sm flex flex-col justify-between ${result.ratingColor}`}>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                      Measurement Accuracy
                    </h3>
                    <div className="text-2xl font-black tracking-tight leading-tight mb-1">
                      {result.rating}
                    </div>
                    <p className="text-xs opacity-75 font-medium mt-1">
                      Precision index stands at <span className="font-bold">{result.precisionScore.toFixed(1)}/100</span>.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold">
                    {result.percentError <= 5.0 ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                    )}
                    <span>
                      {result.percentError <= 5.0 
                        ? "High reliability experimental run." 
                        : "Requires audit for systematic lab errors."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-results details box */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 grid grid-cols-2 md:grid-cols-3 gap-4 shadow-sm">
                <div>
                  <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Absolute Error</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {formatValue(result.absoluteError, precision)} <span className="text-xs font-normal text-slate-500">{customUnit}</span>
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Relative Error</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {result.relativeError.toFixed(precision + 2)}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Numeric Deviation</span>
                  <span className={`text-base font-bold font-mono ${result.deviation > 0 ? "text-red-500" : result.deviation < 0 ? "text-blue-500" : "text-slate-700"}`}>
                    {result.deviation > 0 ? "+" : ""}{formatValue(result.deviation, precision)} <span className="text-xs font-normal text-slate-500">{customUnit}</span>
                  </span>
                </div>
              </div>

              {/* Dynamic Comparison Chart */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-500" />
                  <span>Experimental Deviation Chart</span>
                </h3>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={85} />
                      <RechartsTooltip 
                        formatter={(value: any) => [`${formatValue(Number(value))} ${customUnit}`, 'Value']}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                        {result.chartData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xxs text-slate-400 dark:text-slate-500 mt-2 italic text-center">
                  Comparing the magnitude of difference relative to the primary measurements.
                </p>
              </div>

              {/* Step-by-Step educational breakdown */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <span>Step-by-Step Lab Calculations</span>
                </h3>
                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                  {result.steps.map((step: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-slate-200 dark:border-slate-700 pl-4 py-1 space-y-1">
                      <div className="font-semibold text-slate-700 dark:text-slate-300">
                        Step {idx + 1}: {step.desc}
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl overflow-x-auto text-slate-800 dark:text-slate-200">
                        <BlockMath math={step.latex} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Exporter Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => downloadReport('txt')}
                  className="flex-1 min-w-[120px] h-10 flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold text-xs transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Report TXT</span>
                </button>
                <button
                  onClick={() => downloadReport('csv')}
                  className="flex-1 min-w-[120px] h-10 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Data CSV</span>
                </button>
                <button
                  onClick={() => downloadReport('json')}
                  className="flex-1 min-w-[120px] h-10 flex items-center justify-center gap-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-slate-800 dark:text-slate-300 rounded-xl font-semibold text-xs transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Config JSON</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              Enter valid inputs on the left to compute error metrics.
            </div>
          )}
        </div>
      </div>

      {/* History log drawer / drawer panel */}
      {history.length > 0 && (
        <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Recent Experiment Logs</span>
            </h3>
            <button
              onClick={clearHistory}
              className="text-xs font-semibold text-red-500 hover:underline"
            >
              Clear Logs
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {history.map((item) => (
              <div 
                key={item.id}
                onClick={() => restoreHistory(item)}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    <span>{item.preset}</span>
                    <span>{item.timestamp}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.summary}</p>
                </div>
                <div className="mt-2 text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold hover:underline">
                  Click to Restore
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational context section */}
      <div className="p-6 md:p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <span>Understanding Experimental Error</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-300">Accuracy vs. Precision</h4>
            <p>
              <strong>Accuracy</strong> refers to how close an experimental measurement is to the true or accepted theoretical value. This is directly measured by <em>Percent Error</em>. 
              <strong>Precision</strong>, on the other hand, refers to the consistency or repeatability of multiple trials, regardless of how close they are to the truth.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-300">Systematic vs. Random Errors</h4>
            <p>
              <strong>Systematic errors</strong> are predictable deviations that skew results consistently in one direction (e.g. an uncalibrated scale). They usually increase percent error. 
              <strong>Random errors</strong> are unpredictable fluctuations in measurement due to environmental conditions or observer limits. Repeating trials helps mitigate random noise.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
