"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { InlineMath, BlockMath } from "@/app/components/KatexMath";
import { 
  Ruler, 
  Users, 
  Baby, 
  Scale, 
  ArrowLeftRight, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Info, 
  History, 
  Trash2, 
  Activity, 
  TrendingUp, 
  UserCheck
} from "lucide-react";

interface HeightCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

// Regional database of average heights in cm (Male Mean, Male SD, Female Mean, Female SD)
const REGIONAL_AVERAGES: Record<string, { name: string; mMean: number; mSd: number; fMean: number; fSd: number }> = {
  global: { name: "Global Average", mMean: 171.0, mSd: 7.0, fMean: 159.0, fSd: 6.5 },
  us: { name: "United States", mMean: 175.3, mSd: 7.4, fMean: 161.8, fSd: 6.9 },
  uk: { name: "United Kingdom", mMean: 177.5, mSd: 7.2, fMean: 163.5, fSd: 6.7 },
  germany: { name: "Germany", mMean: 180.0, mSd: 7.1, fMean: 166.0, fSd: 6.5 },
  netherlands: { name: "Netherlands (Tallest)", mMean: 183.8, mSd: 7.1, fMean: 170.4, fSd: 6.5 },
  japan: { name: "Japan", mMean: 170.8, mSd: 6.1, fMean: 158.0, fSd: 5.8 },
  china: { name: "China", mMean: 171.8, mSd: 6.5, fMean: 160.0, fSd: 6.0 },
  india: { name: "India", mMean: 166.5, mSd: 6.8, fMean: 155.2, fSd: 6.2 },
};

// Numerical erf function for high accuracy normal distribution percentiles
function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const absX = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

function cdf(x: number, mean: number, sd: number): number {
  return 0.5 * (1 + erf((x - mean) / (sd * Math.sqrt(2))));
}

export function HeightCalculatorView({ calcDef }: HeightCalculatorViewProps) {
  // Tabs: 'converter' | 'predictor' | 'compare' | 'percentile' | 'bmi'
  const [activeTab, setActiveTab] = useState<'converter' | 'predictor' | 'compare' | 'percentile' | 'bmi'>('converter');

  // Global units: 'metric' (cm/m) or 'imperial' (ft/in)
  const [globalUnitSystem, setGlobalUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Shared converter inputs (stored internally in cm)
  const [cmVal, setCmVal] = useState<string>("175");
  const [mVal, setMVal] = useState<string>("1.75");
  const [mmVal, setMmVal] = useState<string>("1750");
  const [ftVal, setFtVal] = useState<string>("5");
  const [inVal, setInVal] = useState<string>("9");
  const [totalInVal, setTotalInVal] = useState<string>("68.9");
  
  // Precision settings
  const [precision, setPrecision] = useState<number>(1);
  const [fractionDenominator, setFractionDenominator] = useState<number>(8); // 8 = 1/8 inch

  // Child predictor inputs
  const [childGender, setChildGender] = useState<'boy' | 'girl'>('boy');
  const [fatherCm, setFatherCm] = useState<string>("180");
  const [motherCm, setMotherCm] = useState<string>("165");

  // Compare mode inputs
  const [compareName1, setCompareName1] = useState<string>("You");
  const [compareCm1, setCompareCm1] = useState<string>("175");
  const [compareName2, setCompareName2] = useState<string>("Average");
  const [compareCm2, setCompareCm2] = useState<string>("165");

  // Percentile mode inputs
  const [userGender, setUserGender] = useState<'male' | 'female'>('male');
  const [userAgeCm, setUserAgeCm] = useState<string>("175");
  const [regionKey, setRegionKey] = useState<string>("global");

  // BMI helper inputs
  const [bmiCm, setBmiCm] = useState<string>("175");
  const [weightKg, setWeightKg] = useState<string>("70");
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  // Local storage history
  const [history, setHistory] = useState<any[]>([]);
  
  // Clipboard copied indicators
  const [copiedResult, setCopiedResult] = useState<string | null>(null);

  // Sync inputs from cm
  const syncFromCm = (cmValue: number) => {
    if (isNaN(cmValue) || cmValue <= 0) return;
    setCmVal(cmValue.toFixed(precision));
    setMVal((cmValue / 100).toFixed(precision + 2));
    setMmVal((cmValue * 10).toFixed(0));

    const totalInches = cmValue / 2.54;
    setTotalInVal(totalInches.toFixed(precision));
    
    const ft = Math.floor(totalInches / 12);
    const inchRemainder = totalInches - ft * 12;
    setFtVal(ft.toString());
    setInVal(inchRemainder.toFixed(precision));
  };

  // Sync inputs from feet/inches
  const syncFromFtIn = (feet: number, inches: number) => {
    const totalInches = feet * 12 + inches;
    const cmValue = totalInches * 2.54;
    setCmVal(cmValue.toFixed(precision));
    setMVal((cmValue / 100).toFixed(precision + 2));
    setMmVal((cmValue * 10).toFixed(0));
    setTotalInVal(totalInches.toFixed(precision));
  };

  // Fractional inches text generator
  const getFractionalInchesStr = (inches: number, denom: number): string => {
    const whole = Math.floor(inches);
    const frac = inches - whole;
    if (frac < 1 / (denom * 2)) return `${whole}"`;
    
    const numerator = Math.round(frac * denom);
    if (numerator === denom) return `${whole + 1}"`;

    // Reduce fraction
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    const divisor = gcd(numerator, denom);
    return `${whole} ${numerator / divisor}/${denom / divisor}"`;
  };

  // Convert custom input string to standard height in cm
  const parseHeightToCm = (str: string, isImperial: boolean): number => {
    if (!str) return NaN;
    const trimmed = str.trim();
    if (isImperial) {
      // Support patterns like 5'9", 5ft 9in, 5 9, etc.
      const matchFtIn = trimmed.match(/^(\d+)'\s*(\d*(?:\.\d+)?)"?$/);
      if (matchFtIn) {
        return (Number(matchFtIn[1]) * 12 + Number(matchFtIn[2])) * 2.54;
      }
      return Number(trimmed) * 2.54;
    }
    return Number(trimmed);
  };

  // Run initial sync
  useEffect(() => {
    syncFromCm(175);
    // Load history
    try {
      const stored = localStorage.getItem("height-calculator-history");
      if (stored) setHistory(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save entry to local history list
  const saveToHistory = (type: string, inputDesc: string, resultDesc: string) => {
    const item = {
      id: Date.now(),
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inputDesc,
      resultDesc,
    };
    setHistory(prev => {
      const updated = [item, ...prev.slice(0, 19)];
      localStorage.setItem("height-calculator-history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("height-calculator-history");
  };

  // Copy helper
  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResult(id);
    setTimeout(() => setCopiedResult(null), 2000);
  };

  // Export handlers
  const downloadReport = (format: 'txt' | 'csv' | 'json') => {
    let title = "Height Calculation Report";
    let text = `====================================================\n${title.toUpperCase()}\n====================================================\n`;
    text += `Timestamp: ${new Date().toLocaleString()}\n`;
    text += `Tab: ${activeTab.toUpperCase()}\n\n`;

    if (activeTab === 'converter') {
      text += `Centimeters: ${cmVal} cm\n`;
      text += `Meters: ${mVal} m\n`;
      text += `Millimeters: ${mmVal} mm\n`;
      text += `Feet & Inches: ${ftVal} ft ${inVal} in\n`;
      text += `Total Inches: ${totalInVal} in\n`;
    } else if (activeTab === 'predictor') {
      const f = parseHeightToCm(fatherCm, globalUnitSystem === 'imperial');
      const m = parseHeightToCm(motherCm, globalUnitSystem === 'imperial');
      const pred = childGender === 'boy' ? (f + m + 13) / 2 : (f + m - 13) / 2;
      text += `Child Gender Target: ${childGender.toUpperCase()}\n`;
      text += `Father Height: ${fatherCm} ${globalUnitSystem === 'imperial' ? 'in' : 'cm'}\n`;
      text += `Mother Height: ${motherCm} ${globalUnitSystem === 'imperial' ? 'in' : 'cm'}\n`;
      text += `Midpoint Predicted Height: ${pred.toFixed(1)} cm\n`;
      text += `Estimated Range: ${(pred - 8.5).toFixed(1)} cm to ${(pred + 8.5).toFixed(1)} cm\n`;
    } else if (activeTab === 'compare') {
      const h1 = Number(compareCm1);
      const h2 = Number(compareCm2);
      const diff = Math.abs(h1 - h2);
      const pct = (diff / Math.min(h1, h2)) * 100;
      text += `Subject 1 (${compareName1}): ${h1} cm\n`;
      text += `Subject 2 (${compareName2}): ${h2} cm\n`;
      text += `Height Difference: ${diff.toFixed(1)} cm\n`;
      text += `Ratio: ${(h1 / h2).toFixed(3)}\n`;
      text += `Percentage Difference: ${pct.toFixed(2)}%\n`;
    } else if (activeTab === 'percentile') {
      const h = Number(userAgeCm);
      const r = REGIONAL_AVERAGES[regionKey];
      const mean = userGender === 'male' ? r.mMean : r.fMean;
      const sd = userGender === 'male' ? r.mSd : r.fSd;
      const pct = cdf(h, mean, sd) * 100;
      text += `Subject Gender: ${userGender.toUpperCase()}\n`;
      text += `Subject Height: ${h} cm\n`;
      text += `Region Dataset: ${r.name}\n`;
      text += `Regional Mean Height: ${mean} cm\n`;
      text += `Calculated Percentile: ${pct.toFixed(2)}%\n`;
    } else if (activeTab === 'bmi') {
      const hM = Number(bmiCm) / 100;
      const wKg = weightUnit === 'kg' ? Number(weightKg) : Number(weightKg) * 0.45359237;
      const bmi = wKg / (hM * hM);
      const minW = 18.5 * (hM * hM);
      const maxW = 24.9 * (hM * hM);
      text += `Height: ${bmiCm} cm\n`;
      text += `Weight: ${weightKg} ${weightUnit}\n`;
      text += `Calculated BMI: ${bmi.toFixed(2)}\n`;
      text += `Healthy Ideal Weight Range: ${minW.toFixed(1)} kg - ${maxW.toFixed(1)} kg\n`;
      text += `Ponderal Index: ${(wKg / Math.pow(hM, 3)).toFixed(2)} kg/m³\n`;
    }

    if (format === 'txt') {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `height-report.txt`;
      link.click();
    } else if (format === 'csv') {
      let csv = "Variable,Value\n";
      text.split("\n").forEach(line => {
        if (line && line.includes(":")) {
          const parts = line.split(":");
          csv += `"${parts[0].trim()}","${parts[1].trim()}"\n`;
        }
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `height-report.csv`;
      link.click();
    } else if (format === 'json') {
      const obj: Record<string, string> = {};
      text.split("\n").forEach(line => {
        if (line && line.includes(":")) {
          const parts = line.split(":");
          obj[parts[0].trim()] = parts[1].trim();
        }
      });
      const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `height-report.json`;
      link.click();
    }
  };

  // Prediction Math Memo
  const predictionResult = useMemo(() => {
    const father = parseHeightToCm(fatherCm, globalUnitSystem === 'imperial');
    const mother = parseHeightToCm(motherCm, globalUnitSystem === 'imperial');
    
    if (isNaN(father) || isNaN(mother) || father <= 0 || mother <= 0) return null;

    // Mid-parental Height Formula
    // Boys: (Father + Mother + 13) / 2
    // Girls: (Father + Mother - 13) / 2
    const offset = childGender === 'boy' ? 13 : -13;
    const predictedMid = (father + mother + offset) / 2;
    const minRange = predictedMid - 8.5; // +- 8.5 cm
    const maxRange = predictedMid + 8.5;

    // Formatted range strings
    const predictedMidIn = predictedMid / 2.54;
    const minRangeIn = minRange / 2.54;
    const maxRangeIn = maxRange / 2.54;

    const ftMid = Math.floor(predictedMidIn / 12);
    const inMid = (predictedMidIn - ftMid * 12).toFixed(1);

    const ftMin = Math.floor(minRangeIn / 12);
    const inMin = (minRangeIn - ftMin * 12).toFixed(1);

    const ftMax = Math.floor(maxRangeIn / 12);
    const inMax = (maxRangeIn - ftMax * 12).toFixed(1);

    return {
      predictedMid,
      minRange,
      maxRange,
      midStr: `${predictedMid.toFixed(1)} cm (${ftMid}' ${inMid}")`,
      rangeStr: `${minRange.toFixed(1)} - ${maxRange.toFixed(1)} cm (${ftMin}' ${inMin}" - ${ftMax}' ${inMax}")`,
    };
  }, [fatherCm, motherCm, childGender, globalUnitSystem]);

  // Comparison Math Memo
  const comparisonResult = useMemo(() => {
    const h1 = Number(compareCm1);
    const h2 = Number(compareCm2);

    if (isNaN(h1) || isNaN(h2) || h1 <= 0 || h2 <= 0) return null;

    const diff = Math.abs(h1 - h2);
    const diffIn = diff / 2.54;
    const ratio = h1 / h2;
    const percentDiff = (diff / h2) * 100;

    return {
      diff,
      diffStr: `${diff.toFixed(1)} cm (${diffIn.toFixed(1)} inches)`,
      ratio: ratio.toFixed(3),
      percentDiff: percentDiff.toFixed(1) + "%",
      taller: h1 > h2 ? compareName1 : h2 > h1 ? compareName2 : "Both",
    };
  }, [compareCm1, compareCm2, compareName1, compareName2]);

  // Percentile Math Memo
  const percentileResult = useMemo(() => {
    const height = Number(userAgeCm);
    if (isNaN(height) || height <= 0) return null;

    const region = REGIONAL_AVERAGES[regionKey];
    const mean = userGender === 'male' ? region.mMean : region.fMean;
    const sd = userGender === 'male' ? region.mSd : region.fSd;

    const zScore = (height - mean) / sd;
    const percentile = cdf(height, mean, sd) * 100;

    let heightClass = "Average Height";
    let colorClass = "text-emerald-500 bg-emerald-500/10";
    if (percentile < 5) {
      heightClass = "Extremely Short";
      colorClass = "text-rose-500 bg-rose-500/10";
    } else if (percentile < 25) {
      heightClass = "Below Average / Short";
      colorClass = "text-amber-500 bg-amber-500/10";
    } else if (percentile > 95) {
      heightClass = "Extremely Tall";
      colorClass = "text-indigo-500 bg-indigo-500/10";
    } else if (percentile > 75) {
      heightClass = "Above Average / Tall";
      colorClass = "text-teal-500 bg-teal-500/10";
    }

    return {
      zScore,
      percentile,
      heightClass,
      colorClass,
      mean,
      sd,
    };
  }, [userAgeCm, userGender, regionKey]);

  // BMI Math Memo
  const bmiResult = useMemo(() => {
    const height = Number(bmiCm);
    const weight = Number(weightKg);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) return null;

    const heightM = height / 100;
    const actualWeightKg = weightUnit === 'kg' ? weight : weight * 0.45359237;

    const bmi = actualWeightKg / (heightM * heightM);
    const ponderalIndex = actualWeightKg / Math.pow(heightM, 3);

    // Healthy weight range (BMI 18.5 - 24.9)
    const minWeightKg = 18.5 * (heightM * heightM);
    const maxWeightKg = 24.9 * (heightM * heightM);

    const minWeight = weightUnit === 'kg' ? minWeightKg : minWeightKg / 0.45359237;
    const maxWeight = weightUnit === 'kg' ? maxWeightKg : maxWeightKg / 0.45359237;

    let category = "Normal weight";
    let bmiColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (bmi < 18.5) {
      category = "Underweight";
      bmiColor = "text-sky-500 bg-sky-500/10 border-sky-500/20";
    } else if (bmi >= 30) {
      category = "Obesity";
      bmiColor = "text-rose-500 bg-rose-500/10 border-rose-500/20";
    } else if (bmi >= 25) {
      category = "Overweight";
      bmiColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
    }

    return {
      bmi,
      ponderalIndex,
      category,
      bmiColor,
      idealStr: `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} ${weightUnit}`,
    };
  }, [bmiCm, weightKg, weightUnit]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden font-sans">
      
      {/* Header Panel */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Ruler className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {calcDef.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Convert units, compare heights side-by-side, predict growth ranges, and check percentiles.
              </p>
            </div>
          </div>

          {/* Quick Units Toggle */}
          <div className="flex gap-1 bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold self-start md:self-auto">
            <button
              onClick={() => setGlobalUnitSystem('metric')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                globalUnitSystem === 'metric' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-500'
              }`}
            >
              Metric (cm/m)
            </button>
            <button
              onClick={() => setGlobalUnitSystem('imperial')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                globalUnitSystem === 'imperial' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-500'
              }`}
            >
              Imperial (ft/in)
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto scrollbar-none bg-slate-50/20 dark:bg-slate-900">
        {[
          { key: 'converter', label: 'Unit Converter', icon: ArrowLeftRight },
          { key: 'predictor', label: 'Height Predictor', icon: Baby },
          { key: 'compare', label: 'Silhouette Comparison', icon: Users },
          { key: 'percentile', label: 'Percentile & Stats', icon: Activity },
          { key: 'bmi', label: 'BMI & Ideal Weight', icon: Scale },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button 
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-6 text-center font-bold text-sm border-b-2 transition-all whitespace-nowrap outline-none flex items-center gap-2 ${
                activeTab === tab.key 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 bg-white dark:bg-slate-800/30' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* TAB 1: CONVERTER CONTROLS */}
          {activeTab === 'converter' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Height Value Inputs</h3>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Centimeters (cm)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={cmVal}
                    onChange={(e) => {
                      setCmVal(e.target.value);
                      const num = Number(e.target.value);
                      if (!isNaN(num)) syncFromCm(num);
                    }}
                    className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Meters (m)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={mVal}
                    onChange={(e) => {
                      setMVal(e.target.value);
                      const num = Number(e.target.value);
                      if (!isNaN(num)) syncFromCm(num * 100);
                    }}
                    className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Feet (ft)
                  </label>
                  <input
                    type="number"
                    value={ftVal}
                    onChange={(e) => {
                      setFtVal(e.target.value);
                      syncFromFtIn(Number(e.target.value), Number(inVal));
                    }}
                    className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Inches (in)
                  </label>
                  <input
                    type="number"
                    value={inVal}
                    onChange={(e) => {
                      setInVal(e.target.value);
                      syncFromFtIn(Number(ftVal), Number(e.target.value));
                    }}
                    className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Total Inches
                  </label>
                  <input
                    type="number"
                    value={totalInVal}
                    onChange={(e) => {
                      setTotalInVal(e.target.value);
                      const num = Number(e.target.value);
                      if (!isNaN(num)) syncFromCm(num * 2.54);
                    }}
                    className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Millimeters (mm)
                  </label>
                  <input
                    type="number"
                    value={mmVal}
                    onChange={(e) => {
                      setMmVal(e.target.value);
                      const num = Number(e.target.value);
                      if (!isNaN(num)) syncFromCm(num / 10);
                    }}
                    className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  />
                </div>
              </div>

              {/* Decimal Precision config */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Rounding Decimal</label>
                  <select
                    value={precision}
                    onChange={(e) => {
                      setPrecision(Number(e.target.value));
                      const num = Number(cmVal);
                      if (!isNaN(num)) {
                        setCmVal(num.toFixed(Number(e.target.value)));
                      }
                    }}
                    className="w-full h-9 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold dark:text-white outline-none"
                  >
                    {[0, 1, 2, 3].map(p => (
                      <option key={p} value={p}>{p} places</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Inch Fractions</label>
                  <select
                    value={fractionDenominator}
                    onChange={(e) => setFractionDenominator(Number(e.target.value))}
                    className="w-full h-9 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold dark:text-white outline-none"
                  >
                    <option value={4}>Nearest 1/4"</option>
                    <option value={8}>Nearest 1/8"</option>
                    <option value={16}>Nearest 1/16"</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PREDICTOR CONTROLS */}
          {activeTab === 'predictor' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Genetics Inputs</h3>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Child Gender Target
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setChildGender('boy')}
                    className={`py-2 rounded-xl text-sm font-bold border transition ${
                      childGender === 'boy'
                        ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    Boy (Male)
                  </button>
                  <button
                    onClick={() => setChildGender('girl')}
                    className={`py-2 rounded-xl text-sm font-bold border transition ${
                      childGender === 'girl'
                        ? 'bg-pink-500/10 border-pink-500 text-pink-600 dark:text-pink-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    Girl (Female)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Father's Height ({globalUnitSystem === 'imperial' ? 'ft\' in"' : 'cm'})
                </label>
                <input
                  type="text"
                  value={fatherCm}
                  onChange={(e) => setFatherCm(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  placeholder={globalUnitSystem === 'imperial' ? "e.g. 5'11" : "e.g. 180"}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mother's Height ({globalUnitSystem === 'imperial' ? 'ft\' in"' : 'cm'})
                </label>
                <input
                  type="text"
                  value={motherCm}
                  onChange={(e) => setMotherCm(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  placeholder={globalUnitSystem === 'imperial' ? "e.g. 5'5" : "e.g. 165"}
                />
              </div>
            </div>
          )}

          {/* TAB 3: COMPARISON CONTROLS */}
          {activeTab === 'compare' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Compare Setup</h3>
              
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 space-y-3">
                <h4 className="text-xs font-extrabold text-indigo-500 uppercase tracking-wide">Subject A</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={compareName1}
                    onChange={(e) => setCompareName1(e.target.value)}
                    placeholder="Name"
                    className="h-10 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-lg text-xs font-semibold dark:text-white outline-none"
                  />
                  <input
                    type="number"
                    value={compareCm1}
                    onChange={(e) => setCompareCm1(e.target.value)}
                    placeholder="Height (cm)"
                    className="h-10 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-lg text-xs font-semibold dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 space-y-3">
                <h4 className="text-xs font-extrabold text-indigo-500 uppercase tracking-wide">Subject B</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={compareName2}
                    onChange={(e) => setCompareName2(e.target.value)}
                    placeholder="Name"
                    className="h-10 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-lg text-xs font-semibold dark:text-white outline-none"
                  />
                  <input
                    type="number"
                    value={compareCm2}
                    onChange={(e) => setCompareCm2(e.target.value)}
                    placeholder="Height (cm)"
                    className="h-10 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-lg text-xs font-semibold dark:text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PERCENTILE CONTROLS */}
          {activeTab === 'percentile' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">User Demographics</h3>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Gender Reference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUserGender('male')}
                    className={`py-2 rounded-xl text-sm font-bold border transition ${
                      userGender === 'male'
                        ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setUserGender('female')}
                    className={`py-2 rounded-xl text-sm font-bold border transition ${
                      userGender === 'female'
                        ? 'bg-pink-500/10 border-pink-500 text-pink-600 dark:text-pink-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Height to Compare (cm)
                </label>
                <input
                  type="number"
                  value={userAgeCm}
                  onChange={(e) => setUserAgeCm(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  placeholder="e.g. 175"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Region Standard
                </label>
                <select
                  value={regionKey}
                  onChange={(e) => setRegionKey(e.target.value)}
                  className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                >
                  {Object.entries(REGIONAL_AVERAGES).map(([key, region]) => (
                    <option key={key} value={key}>{region.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 5: BMI CONTROLS */}
          {activeTab === 'bmi' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">BMI Proportions</h3>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={bmiCm}
                  onChange={(e) => setBmiCm(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Weight
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none font-semibold text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Unit
                  </label>
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value as any)}
                    className="w-full h-11 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-semibold text-sm"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Clean Inputs */}
          <button
            onClick={() => {
              if (activeTab === 'converter') {
                syncFromCm(175);
              } else if (activeTab === 'predictor') {
                setFatherCm("180");
                setMotherCm("165");
              } else if (activeTab === 'compare') {
                setCompareCm1("175");
                setCompareCm2("165");
              } else if (activeTab === 'percentile') {
                setUserAgeCm("175");
              } else if (activeTab === 'bmi') {
                setBmiCm("175");
                setWeightKg("70");
              }
            }}
            className="w-full h-11 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30 rounded-xl font-semibold text-sm transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Inputs</span>
          </button>
        </div>

        {/* RIGHT COLUMN: Interactive Visuals & LaTeX Solvers */}
        <div className="lg:col-span-7 bg-slate-50/50 dark:bg-slate-800/10 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 space-y-6">
          
          {/* TAB 1 RESULTS: CONVERTER */}
          {activeTab === 'converter' && (
            <div className="space-y-6">
              <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6">
                <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Precision Conversion Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400">Metric Output</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">{cmVal} cm</span>
                    <span className="block text-xs text-slate-500">{mVal} meters</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400">Imperial Feet</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">{ftVal}' {inVal}"</span>
                    <span className="block text-xs text-slate-500">{totalInVal} total inches</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400">Fractional Inches</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">
                      {ftVal}' {getFractionalInchesStr(Number(inVal), fractionDenominator)}
                    </span>
                    <span className="block text-xs text-slate-500">To nearest 1/{fractionDenominator}"</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = `${cmVal} cm = ${ftVal} ft ${inVal} in = ${mVal} m`;
                    triggerCopy(text, 'converter-copy');
                    saveToHistory("Unit Conversion", `${cmVal} cm`, `${ftVal} ft ${inVal} in`);
                  }}
                  className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center justify-center gap-2"
                >
                  {copiedResult === 'converter-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedResult === 'converter-copy' ? "Copied!" : "Copy Result"}</span>
                </button>
                <div className="flex gap-1">
                  <button onClick={() => downloadReport('txt')} className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><Download className="w-4 h-4" /></button>
                </div>
              </div>

              {/* LaTeX formulas */}
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-xl text-slate-600 dark:text-slate-300">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-indigo-500">Mathematical Transformations</h4>
                <div className="space-y-3 text-xs leading-relaxed">
                  <p>To convert from Imperial (Feet/Inches) to Metric (Centimeters):</p>
                  <BlockMath math={`\\text{Height (cm)} = \\left( \\text{Feet} \\times 12 + \\text{Inches} \\right) \\times 2.54`} />
                  <p>Substituting your input values:</p>
                  <BlockMath math={`\\left( ${ftVal} \\times 12 + ${inVal} \\right) \\times 2.54 = ${cmVal}\\text{ cm}`} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 RESULTS: PREDICTOR */}
          {activeTab === 'predictor' && predictionResult && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 rounded-2xl p-6">
                <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Target Adult Growth Prediction</h4>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400">Estimated Target Height (Midpoint)</span>
                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{predictionResult.midStr}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400">95% Growth Interval Range</span>
                    <span className="text-lg font-bold text-slate-800 dark:text-white font-mono">{predictionResult.rangeStr}</span>
                    <p className="text-xs text-slate-500 mt-1">Based on Mid-parental Galton pediatric forecasting standard. Actual heights vary based on dietary and environmental factors during childhood.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = `Predicted Child Height (${childGender}): ${predictionResult.midStr}. Range: ${predictionResult.rangeStr}`;
                    triggerCopy(text, 'predictor-copy');
                    saveToHistory("Child Prediction", `Father: ${fatherCm}, Mother: ${motherCm} (${childGender})`, predictionResult.midStr);
                  }}
                  className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center justify-center gap-2"
                >
                  {copiedResult === 'predictor-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedResult === 'predictor-copy' ? "Copied!" : "Copy Result"}</span>
                </button>
              </div>

              {/* LaTeX Mid-Parental formulas */}
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-xl text-slate-600 dark:text-slate-300 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-indigo-500 font-mono">Pediatric Growth Equation</h4>
                <div className="space-y-3 leading-relaxed">
                  <p>The Mid-Parental formula predicts the child's final stature using biological parent heights:</p>
                  {childGender === 'boy' ? (
                    <BlockMath math={`\\text{Boy Predicted Height} = \\frac{\\text{Father Height} + \\text{Mother Height} + 13\\text{ cm}}{2}`} />
                  ) : (
                    <BlockMath math={`\\text{Girl Predicted Height} = \\frac{\\text{Father Height} + \\text{Mother Height} - 13\\text{ cm}}{2}`} />
                  )}
                  <p>Substituting parental statures (converted to cm):</p>
                  <BlockMath math={`\\text{Predicted Height} = \\frac{${parseHeightToCm(fatherCm, globalUnitSystem === 'imperial').toFixed(1)} + ${parseHeightToCm(motherCm, globalUnitSystem === 'imperial').toFixed(1)} ${childGender === 'boy' ? '+' : '-'} 13}{2} = ${predictionResult.predictedMid.toFixed(1)}\\text{ cm}`} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3 RESULTS: SILHOUETTE COMPARISON */}
          {activeTab === 'compare' && comparisonResult && (
            <div className="space-y-6">
              
              {/* Dynamic SVG Silhouette Widget */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 self-start">Human Stature Scale Model</h4>
                
                {/* SVG Canvas */}
                <svg className="w-full max-w-sm h-64 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 rounded-xl" viewBox="0 0 300 250">
                  {/* Height grids */}
                  {[50, 100, 150, 200].map(h => {
                    const y = 250 - (h / 220) * 230;
                    return (
                      <g key={h} className="opacity-30 dark:opacity-20">
                        <line x1="0" y1={y} x2="300" y2={y} stroke="#94a3b8" strokeDasharray="3,3" />
                        <text x="5" y={y - 3} fill="#94a3b8" fontSize="9" fontWeight="bold">{h} cm</text>
                      </g>
                    );
                  })}

                  {/* Figure 1 (Left) */}
                  {(() => {
                    const h = Number(compareCm1);
                    const scaleHeight = (h / 220) * 230;
                    const yTop = 250 - scaleHeight;
                    return (
                      <g transform="translate(60, 0)">
                        {/* Body representation */}
                        {/* Head */}
                        <circle cx="40" cy={yTop + 20} r="15" className="fill-indigo-500/20 stroke-indigo-500" strokeWidth="2" />
                        {/* Body torso */}
                        <path d={`M 25 ${yTop + 35} L 55 ${yTop + 35} L 50 250 L 30 250 Z`} className="fill-indigo-500/30 stroke-indigo-500" strokeWidth="2" />
                        {/* Arm lines */}
                        <line x1="22" y1={yTop + 40} x2="22" y2={yTop + 120} stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                        <line x1="58" y1={yTop + 40} x2="58" y2={yTop + 120} stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                        
                        {/* Text Label */}
                        <text x="40" y={yTop - 10} textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="extrabold">{compareName1}</text>
                        <text x="40" y={yTop + 65} textAnchor="middle" fill="#6366f1" fontSize="9" fontWeight="bold">{h}cm</text>
                      </g>
                    );
                  })()}

                  {/* Figure 2 (Right) */}
                  {(() => {
                    const h = Number(compareCm2);
                    const scaleHeight = (h / 220) * 230;
                    const yTop = 250 - scaleHeight;
                    return (
                      <g transform="translate(160, 0)">
                        {/* Body representation */}
                        {/* Head */}
                        <circle cx="40" cy={yTop + 20} r="15" className="fill-teal-500/20 stroke-teal-500" strokeWidth="2" />
                        {/* Body torso */}
                        <path d={`M 25 ${yTop + 35} L 55 ${yTop + 35} L 50 250 L 30 250 Z`} className="fill-teal-500/30 stroke-teal-500" strokeWidth="2" />
                        {/* Arm lines */}
                        <line x1="22" y1={yTop + 40} x2="22" y2={yTop + 120} stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
                        <line x1="58" y1={yTop + 40} x2="58" y2={yTop + 120} stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />

                        {/* Text Label */}
                        <text x="40" y={yTop - 10} textAnchor="middle" fill="#14b8a6" fontSize="11" fontWeight="extrabold">{compareName2}</text>
                        <text x="40" y={yTop + 65} textAnchor="middle" fill="#14b8a6" fontSize="9" fontWeight="bold">{h}cm</text>
                      </g>
                    );
                  })()}
                </svg>

                {/* Metrics Box */}
                <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="block text-xs font-semibold text-slate-400">Difference</span>
                    <span className="text-sm font-extrabold text-slate-800 dark:text-white font-mono">{comparisonResult.diffStr}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="block text-xs font-semibold text-slate-400">Ratio (A:B)</span>
                    <span className="text-sm font-extrabold text-slate-800 dark:text-white font-mono">{comparisonResult.ratio}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="block text-xs font-semibold text-slate-400">Variance (%)</span>
                    <span className="text-sm font-extrabold text-slate-800 dark:text-white font-mono">{comparisonResult.percentDiff}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = `${compareName1} is ${comparisonResult.diffStr} taller/shorter than ${compareName2}. Ratio is ${comparisonResult.ratio}.`;
                    triggerCopy(text, 'compare-copy');
                    saveToHistory("Comparison", `${compareName1}: ${compareCm1}cm vs ${compareName2}: ${compareCm2}cm`, `${comparisonResult.diffStr} Difference`);
                  }}
                  className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center justify-center gap-2"
                >
                  {copiedResult === 'compare-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedResult === 'compare-copy' ? "Copied!" : "Copy Comparison"}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4 RESULTS: PERCENTILE */}
          {activeTab === 'percentile' && percentileResult && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Height Percentile Rank</h4>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold uppercase">Percentile Standing</span>
                    <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {percentileResult.percentile.toFixed(1)}%
                    </span>
                    <p className="text-xs text-slate-500 mt-1">
                      You are taller than <span className="font-bold">{percentileResult.percentile.toFixed(1)}%</span> of adults of the same gender in the selected database standard.
                    </p>
                  </div>
                  <div className={`py-3 px-5 rounded-2xl font-extrabold text-sm ${percentileResult.colorClass}`}>
                    {percentileResult.heightClass}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 text-center text-xs">
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Z-Score Deviation</span>
                    <span className="text-base font-extrabold text-slate-850 dark:text-white font-mono">{percentileResult.zScore.toFixed(3)}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Database Mean</span>
                    <span className="text-base font-extrabold text-slate-850 dark:text-white font-mono">{percentileResult.mean} cm</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = `Height Percentile Standing: ${percentileResult.percentile.toFixed(1)}% (${percentileResult.heightClass}). Z-Score: ${percentileResult.zScore.toFixed(2)}`;
                    triggerCopy(text, 'percentile-copy');
                    saveToHistory("Percentile Analysis", `${userAgeCm}cm (${userGender})`, `${percentileResult.percentile.toFixed(1)}% percentile`);
                  }}
                  className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center justify-center gap-2"
                >
                  {copiedResult === 'percentile-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedResult === 'percentile-copy' ? "Copied!" : "Copy Summary"}</span>
                </button>
              </div>

              {/* LaTeX CDF equations */}
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-xl text-slate-600 dark:text-slate-300 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-indigo-500">Probability Density Function Math</h4>
                <div className="space-y-3 leading-relaxed">
                  <p>Height is modeled as a normal distribution $X \sim N(\mu, \sigma^2)$. The percentile rank is computed using the Cumulative Distribution Function (CDF):</p>
                  <BlockMath math={`P(X \le x) = \Phi(z) = \frac{1}{2} \left[ 1 + \text{erf}\left( \frac{x - \mu}{\sigma \sqrt{2}} \right) \right]`} />
                  <p>Substituting your parameters ($x = ${userAgeCm}, \mu = ${percentileResult.mean}, \sigma = ${percentileResult.sd}$):</p>
                  <BlockMath math={`z = \frac{${userAgeCm} - ${percentileResult.mean}}{${percentileResult.sd}} = ${percentileResult.zScore.toFixed(3)}`} />
                  <BlockMath math={`P(X \le x) = \frac{1}{2} \left[ 1 + \text{erf}\left( \frac{${percentileResult.zScore.toFixed(3)}}{\sqrt{2}} \right) \right] \approx ${percentileResult.percentile.toFixed(2)}\\%`} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5 RESULTS: BMI */}
          {activeTab === 'bmi' && bmiResult && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Body Proportions & Weight</h4>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-150 dark:border-slate-800">
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold uppercase">Body Mass Index (BMI)</span>
                    <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {bmiResult.bmi.toFixed(1)}
                    </span>
                  </div>
                  <div className={`py-3 px-5 border rounded-2xl font-black text-sm ${bmiResult.bmiColor}`}>
                    {bmiResult.category}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 text-xs text-slate-600 dark:text-slate-400">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="block font-bold text-slate-400 uppercase tracking-wide text-[10px] mb-1">Ideal Weight Range</span>
                    <span className="text-base font-extrabold text-slate-800 dark:text-white font-mono">{bmiResult.idealStr}</span>
                    <p className="text-[10px] text-slate-550 mt-1">Based on medical standards representing healthy BMI (18.5 - 24.9).</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="block font-bold text-slate-400 uppercase tracking-wide text-[10px] mb-1">Ponderal Index</span>
                    <span className="text-base font-extrabold text-slate-800 dark:text-white font-mono">
                      {bmiResult.ponderalIndex.toFixed(2)} kg/m³
                    </span>
                    <p className="text-[10px] text-slate-550 mt-1">Stature-adjusted volume indicator for tall/short individuals.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = `Height: ${bmiCm} cm, Weight: ${weightKg} ${weightUnit}. BMI: ${bmiResult.bmi.toFixed(1)} (${bmiResult.category}). Ideal weight range: ${bmiResult.idealStr}.`;
                    triggerCopy(text, 'bmi-copy');
                    saveToHistory("BMI Helper", `${bmiCm}cm, ${weightKg}${weightUnit}`, `BMI: ${bmiResult.bmi.toFixed(1)} (${bmiResult.category})`);
                  }}
                  className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center justify-center gap-2"
                >
                  {copiedResult === 'bmi-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedResult === 'bmi-copy' ? "Copied!" : "Copy Profile Summary"}</span>
                </button>
              </div>
            </div>
          )}

          {/* HISTORY SECTION */}
          {history.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-indigo-500" />
                  <span>Calculation Logs History</span>
                </h4>
                <button
                  onClick={clearHistory}
                  className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-red-500 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
                {history.map((h) => (
                  <div key={h.id} className="flex justify-between items-center text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl shadow-sm">
                    <div>
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{h.type}</span>
                      <span className="text-slate-400 dark:text-slate-500 ml-2">({h.timestamp})</span>
                      <p className="text-slate-550 dark:text-slate-400 mt-0.5">Input: {h.inputDesc}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-800 dark:text-slate-200 font-mono">{h.resultDesc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
