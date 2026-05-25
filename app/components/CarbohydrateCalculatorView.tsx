"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { InlineMath, BlockMath } from "@/app/components/KatexMath";
import { 
  Heart, 
  Flame, 
  TrendingUp, 
  ChevronRight, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Info, 
  History, 
  Trash2, 
  Scale, 
  Calendar,
  Grid,
  Clipboard,
  Sliders,
  Sparkles,
  Zap,
  Activity,
  Plus,
  Minus
} from "lucide-react";

interface CarbohydrateCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

// Preset dietary carbohydrate models
interface CarbPreset {
  name: string;
  carbPct: number; // percentage of calories
  desc: string;
  minRangePct: number;
  maxRangePct: number;
}

const DIET_PRESETS: CarbPreset[] = [
  { name: "Standard / Balanced Diet", carbPct: 50, desc: "A general, health-focused approach containing balanced carbohydrates to support moderate workouts and cognitive function.", minRangePct: 45, maxRangePct: 55 },
  { name: "Low-Carb Diet", carbPct: 20, desc: "Designed to restrict carbs to support weight loss, blood sugar management, and insulin sensitivity.", minRangePct: 15, maxRangePct: 25 },
  { name: "Ketogenic Diet", carbPct: 5, desc: "Ultra-low carbohydrate split (under 50g per day) designed to induce nutritional ketosis and burn fat for fuel.", minRangePct: 3, maxRangePct: 7 },
  { name: "Endurance & Athletic Performance", carbPct: 60, desc: "High-glycogen loading protocol optimized for marathoners, cyclists, and high-intensity lifters.", minRangePct: 55, maxRangePct: 65 },
];

export function CarbohydrateCalculatorView({ calcDef }: CarbohydrateCalculatorViewProps) {
  // Unit Toggles
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Input states for daily carbs target
  const [age, setAge] = useState<string>("28");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>("70"); // kg or lbs
  const [heightCm, setHeightCm] = useState<string>("175");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("9");
  
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // Moderate default
  const [fitnessGoal, setFitnessGoal] = useState<string>("maintenance");
  const [formula, setFormula] = useState<'mifflin' | 'harris' | 'katch'>('mifflin');
  const [bodyFat, setBodyFat] = useState<string>("18"); // % body fat for Katch-McArdle

  // Carb intake preference state
  const [dietMode, setDietMode] = useState<string>("Standard / Balanced Diet");
  const [customCarbPct, setCustomCarbPct] = useState<number>(50);

  // Net Carbs Calculator State
  const [totalCarbsInput, setTotalCarbsInput] = useState<string>("60");
  const [fiberInput, setFiberInput] = useState<string>("8");
  const [sugarAlcoholsInput, setSugarAlcoholsInput] = useState<string>("3");

  // Output Tab State
  const [activeTab, setActiveTab] = useState<'targets' | 'netcarbs' | 'cycling' | 'meals'>('targets');

  // History & Clipboard feedback state
  const [history, setHistory] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Convert inputs to metric values
  const weightKg = useMemo(() => {
    const val = parseFloat(weight);
    if (isNaN(val) || val <= 0) return 0;
    return unitSystem === 'metric' ? val : val * 0.45359237;
  }, [weight, unitSystem]);

  const heightValCm = useMemo(() => {
    if (unitSystem === 'metric') {
      const val = parseFloat(heightCm);
      return isNaN(val) || val <= 0 ? 0 : val;
    } else {
      const ft = parseFloat(heightFt);
      const inch = parseFloat(heightIn);
      const totalInches = (isNaN(ft) ? 0 : ft * 12) + (isNaN(inch) ? 0 : inch);
      return totalInches * 2.54;
    }
  }, [heightCm, heightFt, heightIn, unitSystem]);

  const bodyFatVal = useMemo(() => {
    const val = parseFloat(bodyFat);
    return isNaN(val) || val < 2 || val > 70 ? 15 : val;
  }, [bodyFat]);

  // Load calculation history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexus_carb_calculator_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Save computation to history
  const saveToHistory = (summary: string, details: any) => {
    try {
      const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleDateString(),
        summary,
        details,
      };
      const updated = [newEntry, ...history.slice(0, 9)];
      setHistory(updated);
      localStorage.setItem("nexus_carb_calculator_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("nexus_carb_calculator_history");
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset all daily inputs
  const handleReset = () => {
    setAge("28");
    setGender("male");
    setWeight("70");
    setHeightCm("175");
    setHeightFt("5");
    setHeightIn("9");
    setActivityLevel(1.55);
    setFitnessGoal("maintenance");
    setDietMode("Standard / Balanced Diet");
    setCustomCarbPct(50);
    setFormula("mifflin");
    setBodyFat("18");
  };

  // Basal Metabolic Rate (BMR) math
  const bmr = useMemo(() => {
    if (weightKg <= 0 || heightValCm <= 0) return 0;
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0) return 0;

    if (formula === 'mifflin') {
      if (gender === 'male') {
        return (10 * weightKg) + (6.25 * heightValCm) - (5 * ageNum) + 5;
      } else {
        return (10 * weightKg) + (6.25 * heightValCm) - (5 * ageNum) - 161;
      }
    } else if (formula === 'harris') {
      if (gender === 'male') {
        return 88.362 + (13.397 * weightKg) + (4.799 * heightValCm) - (5.677 * ageNum);
      } else {
        return 447.593 + (9.247 * weightKg) + (3.098 * heightValCm) - (4.330 * ageNum);
      }
    } else {
      const lbm = weightKg * (1 - bodyFatVal / 100);
      return 370 + (21.6 * lbm);
    }
  }, [weightKg, heightValCm, age, gender, formula, bodyFatVal]);

  // Total Daily Energy Expenditure (TDEE)
  const tdee = useMemo(() => {
    return bmr * activityLevel;
  }, [bmr, activityLevel]);

  // Calorie adjustments based on Goal
  const calorieTarget = useMemo(() => {
    if (tdee <= 0) return 0;
    switch (fitnessGoal) {
      case 'weight-loss':
        return Math.max(1200, Math.round(tdee - 500));
      case 'fat-loss':
        return Math.max(1200, Math.round(tdee * 0.85));
      case 'muscle-gain':
        return Math.round(tdee + 500);
      case 'lean-bulk':
        return Math.round(tdee + 250);
      case 'maintenance':
      default:
        return Math.round(tdee);
    }
  }, [tdee, fitnessGoal]);

  // Active carb percentage selection
  const activeCarbPct = useMemo(() => {
    if (dietMode !== "Custom Percentage") {
      const match = DIET_PRESETS.find(p => p.name === dietMode);
      if (match) return match.carbPct;
    }
    return customCarbPct;
  }, [dietMode, customCarbPct]);

  // Main Daily Carb Outputs (Grams and Calories)
  const carbResults = useMemo(() => {
    if (calorieTarget <= 0) return null;
    const pct = activeCarbPct / 100;
    const carbCalories = calorieTarget * pct;
    const carbGrams = Math.round(carbCalories / 4);

    // Suggested range
    const rangeMin = Math.round((calorieTarget * (activeCarbPct - 5) / 100) / 4);
    const rangeMax = Math.round((calorieTarget * (activeCarbPct + 5) / 100) / 4);

    return {
      grams: carbGrams,
      calories: Math.round(carbCalories),
      pct: activeCarbPct,
      rangeMin: Math.max(0, rangeMin),
      rangeMax: rangeMax,
    };
  }, [calorieTarget, activeCarbPct]);

  // Net Carbs Calculation
  const netCarbOutput = useMemo(() => {
    const total = parseFloat(totalCarbsInput) || 0;
    const fiber = parseFloat(fiberInput) || 0;
    const sugarAlcohols = parseFloat(sugarAlcoholsInput) || 0;

    const net = total - fiber - sugarAlcohols;
    return {
      net: Math.max(0, parseFloat(net.toFixed(1))),
      warning: (fiber + sugarAlcohols > total) ? "Fiber and sugar alcohols exceed total carbohydrates. Please check your label inputs." : null
    };
  }, [totalCarbsInput, fiberInput, sugarAlcoholsInput]);

  // Carb Cycling Planner targets
  const carbCyclingDays = useMemo(() => {
    if (!carbResults) return [];
    return [
      {
        type: "High-Carb Day",
        description: "Optimized for heavy training days (legs/back). Maximizes glycogen replenishment and thyroid hormones.",
        grams: Math.round(carbResults.grams * 1.25),
        calories: Math.round(carbResults.calories * 1.25),
        color: "border-emerald-500/20 text-emerald-500 dark:text-emerald-400 bg-emerald-500/5",
      },
      {
        type: "Medium-Carb Day",
        description: "For standard training days (chest/shoulders/arms). Matches activity level and supports moderate output.",
        grams: carbResults.grams,
        calories: carbResults.calories,
        color: "border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/5",
      },
      {
        type: "Low-Carb / Rest Day",
        description: "For non-training rest or cardio days. Promotes fat oxidation and insulin sensitivity recovery.",
        grams: Math.round(carbResults.grams * 0.65),
        calories: Math.round(carbResults.calories * 0.65),
        color: "border-sky-500/20 text-sky-600 dark:text-sky-400 bg-sky-500/5",
      }
    ];
  }, [carbResults]);

  // Meal distribution planner
  const mealsList = useMemo(() => {
    if (!carbResults) return [];
    
    // Per-meal carbohydrate ratios
    const distributions = [
      { name: "Breakfast", ratio: 0.25, time: "Within 1-2 hours of waking up", desc: "Best paired with complex, slow-release carbs to start the day." },
      { name: "Lunch", ratio: 0.30, time: "Mid-day energy fuel", desc: "Lean protein with fibrous carbs and starches (e.g. brown rice, chicken)." },
      { name: "Pre-Workout Fuel", ratio: 0.15, time: "1.5 - 2 hours before training", desc: "Easily digestible carbs to fuel performance and sustain output." },
      { name: "Post-Workout recovery", ratio: 0.20, time: "Within 45 minutes of training", desc: "Fast-acting carbs (e.g. dextrose, white rice) to drive glycogen store recovery." },
      { name: "Dinner / Late Meal", ratio: 0.10, time: "Evening dinner", desc: "Fibrous greens and minor complex carbs to avoid insulin spikes before sleep." }
    ];

    return distributions.map(meal => {
      const mealGrams = Math.round(carbResults.grams * meal.ratio);
      const mealCal = Math.round(carbResults.calories * meal.ratio);
      return {
        ...meal,
        grams: mealGrams,
        calories: mealCal
      };
    });
  }, [carbResults]);

  // Handle Export actions
  const handleExport = (format: 'txt' | 'json' | 'csv' | 'print') => {
    if (!carbResults) return;

    if (format === 'print') {
      window.print();
      return;
    }

    const cyclingSummary = carbCyclingDays.map(d => `${d.type}: ${d.grams}g (${d.calories} kcal)`).join("\n");
    const mealSummary = mealsList.map(m => `${m.name}: ${m.grams}g (${m.calories} kcal)`).join("\n");

    const content = {
      title: "Carbohydrate Intake Report",
      timestamp: new Date().toISOString(),
      biometrics: {
        age,
        gender,
        weight: `${weight} ${unitSystem === 'metric' ? 'kg' : 'lbs'}`,
        height: unitSystem === 'metric' ? `${heightCm} cm` : `${heightFt}'${heightIn}"`
      },
      targets: {
        calorieTarget: `${calorieTarget} kcal`,
        carbPercentage: `${activeCarbPct}%`,
        carbGrams: `${carbResults.grams}g`,
        carbCalories: `${carbResults.calories} kcal`,
        range: `${carbResults.rangeMin}g - ${carbResults.rangeMax}g`
      },
      netCarbs: {
        totalCarbs: `${totalCarbsInput}g`,
        fiber: `${fiberInput}g`,
        sugarAlcohols: `${sugarAlcoholsInput}g`,
        netCarbs: `${netCarbOutput.net}g`
      },
      carbCycling: carbCyclingDays,
      meals: mealsList
    };

    let blob: Blob;
    let fileName = `carbohydrate-plan-${Date.now()}`;

    if (format === 'json') {
      blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
      fileName += ".json";
    } else if (format === 'csv') {
      const csvLines = [
        "Parameter,Value",
        `Report Date,${content.timestamp}`,
        `Age,${age}`,
        `Gender,${gender}`,
        `Weight,${content.biometrics.weight}`,
        `Height,${content.biometrics.height}`,
        `Calorie Target,${content.targets.calorieTarget}`,
        `Carb Allocation %,${content.targets.carbPercentage}`,
        `Carb Grams Target,${content.targets.carbGrams}`,
        `Carb Calories,${content.targets.carbCalories}`,
        `Recommended range,${content.targets.range}`,
        `Total Carbs Input,${content.netCarbs.totalCarbs}`,
        `Fiber Input,${content.netCarbs.fiber}`,
        `Sugar Alcohols,${content.netCarbs.sugarAlcohols}`,
        `Calculated Net Carbs,${content.netCarbs.netCarbs}`,
      ];
      blob = new Blob([csvLines.join("\n")], { type: "text/csv" });
      fileName += ".csv";
    } else {
      const txtContent = `
==============================================
CARBOHYDRATE INTAKE & NUTRITION REPORT
==============================================
Date: ${content.timestamp}

BIOMETRIC DATA:
- Age: ${age}
- Gender: ${gender}
- Weight: ${content.biometrics.weight}
- Height: ${content.biometrics.height}

DAILY INTAKE TARGETS:
- Daily Calories: ${content.targets.calorieTarget}
- Carb Share: ${content.targets.carbPercentage} of calories
- Carb Target Grams: ${content.targets.carbGrams}
- Carb Target Calories: ${content.targets.carbCalories}
- Recommended Carb Range: ${content.targets.range}

NET CARBS SOLVER:
- Total Carbs: ${content.netCarbs.totalCarbs}
- Dietary Fiber: ${content.netCarbs.fiber}
- Sugar Alcohols: ${content.netCarbs.sugarAlcohols}
- Net Carbohydrates: ${content.netCarbs.netCarbs}

CARB CYCLING PROTOCOL:
${cyclingSummary}

MEAL TARGET ALLOCATIONS:
${mealSummary}

Disclaimer: This calculation provides nutritional education targets only. Consult a registered dietitian or medical professional prior to starting any restrictive diet.
`;
      blob = new Blob([txtContent], { type: "text/plain" });
      fileName += ".txt";
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Add automatic history logs
  useEffect(() => {
    if (carbResults && weightKg > 0) {
      const summaryText = `${carbResults.grams}g Carbs (${carbResults.pct}% of ${calorieTarget} kcal)`;
      const timer = setTimeout(() => {
        const isDuplicate = history.length > 0 && history[0].summary === summaryText && history[0].details.weight === weight;
        if (!isDuplicate) {
          saveToHistory(summaryText, {
            weight, age, goal: fitnessGoal, carbPct: activeCarbPct, netCarbs: netCarbOutput.net
          });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [carbResults, netCarbOutput.net]);

  // Compute Glycemic Load Risk (GL) indicator
  const glycemicLoadRisk = useMemo(() => {
    const total = parseFloat(totalCarbsInput) || 0;
    if (total <= 0) return { score: "0", status: "Unknown", color: "text-slate-500", bar: "bg-slate-350 dark:bg-slate-700" };
    
    const estimatedGL = (55 * total) / 100;
    
    let status = "Low Glycemic Impact";
    let color = "text-emerald-600 dark:text-emerald-400";
    let bar = "bg-emerald-500";
    if (estimatedGL >= 10 && estimatedGL <= 19) {
      status = "Medium Glycemic Impact";
      color = "text-amber-600 dark:text-amber-400";
      bar = "bg-amber-500";
    } else if (estimatedGL >= 20) {
      status = "High Glycemic Impact";
      color = "text-rose-600 dark:text-rose-500";
      bar = "bg-rose-500";
    }
    return {
      score: estimatedGL.toFixed(1),
      status,
      color,
      bar
    };
  }, [totalCarbsInput]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 select-none">
      
      {/* Premium Dashboard Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-850 dark:text-white flex items-center gap-2.5">
            <Activity className="w-8 h-8 text-emerald-500 animate-pulse" />
            <span>Carbohydrate Calculator</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl font-sans leading-relaxed">
            Determine your ideal daily carbohydrate targets, solve net carbohydrates, customize a carb cycling schedule, and partition servings across meals using sports science algorithms.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="bg-slate-100 dark:bg-slate-900/80 p-0.5 border border-slate-200 dark:border-slate-800 rounded-xl flex w-full sm:w-auto">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`flex-1 sm:flex-none py-1.5 px-4 rounded-lg text-xs font-bold transition-all ${unitSystem === 'metric' ? 'bg-emerald-500 text-slate-950 shadow-md font-black' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              Metric (kg, cm)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`flex-1 sm:flex-none py-1.5 px-4 rounded-lg text-xs font-bold transition-all ${unitSystem === 'imperial' ? 'bg-emerald-500 text-slate-950 shadow-md font-black' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              Imperial (lbs, ft)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Parameters Input Form */}
        <div className="col-span-1 lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 shadow-xl space-y-6 text-slate-800 dark:text-slate-100">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-4">
            <span className="font-extrabold text-sm text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">Biometric Profile</span>
            <button
              onClick={handleReset}
              className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Gender Toggle */}
            <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Gender</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${gender === 'male' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold shadow-sm' : 'border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-800'}`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${gender === 'female' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold shadow-sm' : 'border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-800'}`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label htmlFor="age-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Age (years)</label>
              <input
                id="age-input"
                type="number"
                value={age}
                onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 0).toString())}
                className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Weight */}
            <div className="space-y-1.5">
              <label htmlFor="weight-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                id="weight-input"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Height (Conditional Metric/Imperial) */}
            {unitSystem === 'metric' ? (
              <div className="space-y-1.5 col-span-2">
                <label htmlFor="height-cm-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Height (cm)</label>
                <input
                  id="height-cm-input"
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            ) : (
              <div className="col-span-2 grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="height-ft-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Height (feet)</label>
                  <input
                    id="height-ft-input"
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="height-in-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Height (inches)</label>
                  <input
                    id="height-in-input"
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Activity dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="activity-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Activity Multiplier Index</label>
            <select
              id="activity-input"
              value={activityLevel}
              onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
              className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-white font-bold focus:border-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            >
              <option value="1.2">Sedentary (desk work, minimal exercises)</option>
              <option value="1.375">Light Activity (exercises 1-3 days/week)</option>
              <option value="1.55">Moderate Activity (exercises 3-5 days/week)</option>
              <option value="1.725">High Activity (exercises 6-7 days/week)</option>
              <option value="1.9">Extreme Activity (heavy manual labor/twice daily workouts)</option>
            </select>
          </div>

          {/* Goal selection */}
          <div className="space-y-1.5">
            <label htmlFor="goal-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Primary Fitness Goal</label>
            <select
              id="goal-input"
              value={fitnessGoal}
              onChange={(e) => setFitnessGoal(e.target.value)}
              className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-white font-bold focus:border-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            >
              <option value="maintenance">Weight Maintenance</option>
              <option value="fat-loss">Fat Loss (-15% caloric deficit)</option>
              <option value="weight-loss">Weight Loss (-500 kcal deficit)</option>
              <option value="lean-bulk">Lean Muscle Bulk (+250 kcal surplus)</option>
              <option value="muscle-gain">Muscle Growth (+500 kcal surplus)</option>
            </select>
          </div>

          <hr className="border-slate-100 dark:border-slate-900" />

          {/* Diet Presets selection */}
          <div className="space-y-3">
            <span className="font-extrabold text-sm text-slate-650 dark:text-slate-300 uppercase tracking-wider font-mono block">Carb Diet Preference</span>
            <div className="space-y-2">
              {DIET_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setDietMode(preset.name)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex flex-col gap-1 ${dietMode === preset.name ? 'border-emerald-500 bg-emerald-500/5 text-slate-850 dark:text-white shadow-sm font-bold' : 'border-slate-200 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-900/10 text-slate-500 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-800'}`}
                >
                  <span className="font-extrabold text-slate-800 dark:text-white flex items-center justify-between">
                    <span>{preset.name}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{preset.carbPct}% of total daily calories</span>
                  </span>
                  <span className="text-[10px] text-slate-500 leading-normal font-sans">{preset.desc}</span>
                </button>
              ))}
              
              {/* Custom Sliders mode */}
              <button
                onClick={() => setDietMode("Custom Percentage")}
                className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex flex-col gap-2 ${dietMode === "Custom Percentage" ? 'border-emerald-500 bg-emerald-500/5 text-slate-850 dark:text-white shadow-sm font-bold' : 'border-slate-200 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-900/10 text-slate-500 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-800'}`}
              >
                <span className="font-extrabold text-slate-800 dark:text-white flex items-center justify-between">
                  <span>Custom Carbohydrate Ratio</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{customCarbPct}% Calories</span>
                </span>
                {dietMode === "Custom Percentage" && (
                  <div className="w-full space-y-1.5 pt-1.5">
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={customCarbPct}
                      onChange={(e) => setCustomCarbPct(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span>10% (Ketogenic limit)</span>
                      <span>80% (Endurance load)</span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-900" />

          {/* Scientific Formula parameters */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="col-span-2 space-y-1">
              <label htmlFor="formula-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Scientific Formula</label>
              <select
                id="formula-input"
                value={formula}
                onChange={(e) => setFormula(e.target.value as any)}
                className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white font-bold focus:border-emerald-500 outline-none transition-all"
              >
                <option value="mifflin">Mifflin-St Jeor (Modern standard)</option>
                <option value="harris">Revised Harris-Benedict (Aesthetic standard)</option>
                <option value="katch">Katch-McArdle (Requires body fat %)</option>
              </select>
            </div>
            {formula === 'katch' && (
              <div className="col-span-2 space-y-1.5 animate-fadeIn">
                <label htmlFor="bodyfat-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Body Fat Percentage (%)</label>
                <input
                  id="bodyfat-input"
                  type="number"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-1.5 text-xs text-slate-850 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Tabbed Calculations Dashboard */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 p-1.5 rounded-2xl flex gap-1 scrollbar-none overflow-x-auto shadow-sm">
            {[
              { id: 'targets', label: "Daily Targets" },
              { id: 'netcarbs', label: "Net Carbs" },
              { id: 'cycling', label: "Carb Cycling" },
              { id: 'meals', label: "Meal Distribution" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 whitespace-nowrap py-2 px-3 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-slate-950 font-black shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-slate-200'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Calculator Output View Container */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 shadow-xl text-slate-800 dark:text-slate-100">
            {carbResults ? (
              <div className="space-y-6">

                {/* TAB 1: DAILY TARGETS */}
                {activeTab === 'targets' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">Daily Carbohydrate Needs</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-550 font-bold font-mono bg-slate-100 dark:bg-slate-900/60 py-1 px-2 border border-slate-150 dark:border-slate-900 rounded-lg">Estimated Calorie Base: {calorieTarget} kcal</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      
                      {/* Metric Target Cards */}
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-2xl flex justify-between items-center shadow-sm">
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Target Intake</span>
                            <span className="text-3xl font-black text-slate-850 dark:text-white">{carbResults.grams} <span className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">grams/day</span></span>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Scale className="w-5 h-5 text-emerald-550 dark:text-emerald-400" />
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-2xl flex justify-between items-center shadow-sm">
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Recommended Range</span>
                            <span className="text-lg font-black text-slate-700 dark:text-slate-200">{carbResults.rangeMin}g - {carbResults.rangeMax}g <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/day</span></span>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-emerald-550 dark:text-emerald-400" />
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-2xl flex justify-between items-center shadow-sm">
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Energy Equivalent</span>
                            <span className="text-lg font-black text-slate-700 dark:text-slate-200">{carbResults.calories} <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">kcal ({carbResults.pct}%)</span></span>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Flame className="w-5 h-5 text-emerald-550 dark:text-emerald-400" />
                          </div>
                        </div>
                      </div>

                      {/* SVG Visualizer Chart */}
                      <div className="flex flex-col items-center justify-center py-4 bg-slate-50/30 dark:bg-slate-900/20 border border-slate-250 dark:border-slate-900 rounded-2xl shadow-sm">
                        <svg className="w-36 h-36" viewBox="0 0 100 100">
                          {/* Background Ring */}
                          <circle cx="50" cy="50" r="40" stroke="#e2e8f0" className="dark:stroke-slate-800" strokeWidth="8" fill="transparent" />
                          {/* Carbs Ring */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#10b981"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - activeCarbPct / 100)}`}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                          />
                          <text x="50" y="47" textAnchor="middle" fill="#1e293b" className="dark:fill-white font-extrabold text-[12px] font-mono">{activeCarbPct}%</text>
                          <text x="50" y="60" textAnchor="middle" fill="#64748b" className="font-bold text-[8px] uppercase tracking-widest font-sans">Carb Share</text>
                        </svg>
                        <div className="text-center mt-3 px-4">
                          <span className="text-[10px] text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider block font-mono">Glycogen Replenishment</span>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mt-0.5 block">
                            {activeCarbPct <= 20 ? "Lipolytic Fat Oxidation State" : "Glycolytic High Performance State"}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* TAB 2: NET CARBS CALCULATOR */}
                {activeTab === 'netcarbs' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">Net Carbohydrates Solver</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 py-1 px-2 border border-emerald-500/10 rounded-lg">Fibers and sugar alcohols are subtracted.</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Total Carbs Input */}
                      <div className="space-y-1.5">
                        <label htmlFor="total-carbs-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Carbs (g)</label>
                        <input
                          id="total-carbs-input"
                          type="number"
                          value={totalCarbsInput}
                          onChange={(e) => setTotalCarbsInput(e.target.value)}
                          className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-sm text-slate-850 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>

                      {/* Dietary Fiber */}
                      <div className="space-y-1.5">
                        <label htmlFor="fiber-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Dietary Fiber (g)</label>
                        <input
                          id="fiber-input"
                          type="number"
                          value={fiberInput}
                          onChange={(e) => setFiberInput(e.target.value)}
                          className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-sm text-slate-850 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>

                      {/* Sugar Alcohols */}
                      <div className="space-y-1.5">
                        <label htmlFor="sugar-alcohols-input" className="text-xs font-bold text-slate-500 dark:text-slate-400">Sugar Alcohols (g)</label>
                        <input
                          id="sugar-alcohols-input"
                          type="number"
                          value={sugarAlcoholsInput}
                          onChange={(e) => setSugarAlcoholsInput(e.target.value)}
                          className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-sm text-slate-850 dark:text-white font-bold font-mono focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {netCarbOutput.warning && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl flex items-center gap-2">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <span>{netCarbOutput.warning}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Calculated net carbs target */}
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex flex-col justify-center shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider block font-mono">Net Carbohydrates</span>
                        <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{netCarbOutput.net} <span className="text-lg font-medium text-slate-850 dark:text-white">grams</span></span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-550 font-bold block mt-1 font-sans">Impact carbs absorbed by the body.</span>
                      </div>

                      {/* Glycemic Load estimation indicator */}
                      <div className="p-5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-2 flex flex-col justify-center shadow-sm">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="font-bold text-slate-400 dark:text-slate-500 uppercase">GL Risk Metric</span>
                          <span className={`font-black ${glycemicLoadRisk.color}`}>{glycemicLoadRisk.status} (GL: {glycemicLoadRisk.score})</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden">
                          <div className={`h-full ${glycemicLoadRisk.bar} transition-all`} style={{ width: `${Math.min(100, (parseFloat(glycemicLoadRisk.score) || 0) * 4)}%` }}></div>
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-550 leading-normal block font-sans">Estimated Glycemic Impact based on standard meal size of this carb weight.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CARB CYCLING PLANNER */}
                {activeTab === 'cycling' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">Carb Cycling Planner</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-550 font-bold font-mono">Based on TDEE fluctuations.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {carbCyclingDays.map((day, idx) => (
                        <div key={idx} className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-2xl flex flex-col justify-between space-y-3 shadow-sm">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider block font-mono text-slate-400 dark:text-slate-550">{day.type}</span>
                            <span className="text-2xl font-black text-slate-800 dark:text-white block mt-1">{day.grams} <span className="text-xs font-normal text-slate-400 dark:text-slate-500">grams</span></span>
                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">{day.calories} kcal</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed font-sans">{day.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Cycle planner copy summary */}
                    <div className="p-4 bg-slate-50/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 rounded-2xl flex items-center justify-between shadow-sm">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">Save Carb Cycle targets</span>
                        <p className="text-[10px] text-slate-450 dark:text-slate-550 font-sans mt-0.5">Copy the cycling plan targets for easy logging in health journals.</p>
                      </div>
                      <button
                        onClick={() => {
                          const text = carbCyclingDays.map(d => `${d.type}: ${d.grams}g (${d.calories} kcal)`).join(" | ");
                          handleCopy(text, 'cycle-copy-id');
                        }}
                        className="py-1.5 px-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 hover:text-emerald-650 dark:hover:text-emerald-400 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5 shadow-sm"
                      >
                        {copiedId === 'cycle-copy-id' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Cycling Plan</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 4: MEAL DISTRIBUTION */}
                {activeTab === 'meals' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">Daily Carb Distribution</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-550 font-bold font-mono">5-Meal Allocation split</span>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden text-xs">
                      <div className="grid grid-cols-4 gap-2 p-3 border-b border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/40 font-bold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider text-center">
                        <div className="text-left col-span-2">Meal / Timing Window</div>
                        <div>Carbohydrates</div>
                        <div>Energy</div>
                      </div>

                      {mealsList.map((meal, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-2 p-3 border-b border-slate-150 dark:border-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 items-center text-center">
                          <div className="text-left col-span-2">
                            <span className="font-extrabold text-slate-800 dark:text-white block">{meal.name}</span>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 leading-none block mt-0.5">{meal.time}</span>
                          </div>
                          <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{meal.grams}g</div>
                          <div className="font-mono text-slate-500 dark:text-slate-400">{meal.calories} kcal</div>
                        </div>
                      ))}
                    </div>

                    {/* Pre & Post Workout Timing */}
                    <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-2 text-xs shadow-sm">
                      <h4 className="font-bold text-emerald-650 dark:text-emerald-400 flex items-center gap-1.5 font-mono">
                        <Zap className="w-4 h-4" />
                        <span>Sports Nutrition Carbohydrates Timing</span>
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        • **Pre-Workout Fueling**: Eat ~1.5 - 2 hours prior to workouts. Focus on low-GI, complex carbohydrates (oatmeal, sweet potatoes) to ensure a steady release of blood glucose.
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        • **Post-Workout Recovery**: Consume high-GI simple carbohydrates combined with protein within 30 - 45 minutes of training. This spikes insulin to quickly shuttle glycogen back into depleted muscle cells.
                      </p>
                    </div>
                  </div>
                )}

                <hr className="border-slate-100 dark:border-slate-900" />

                {/* Exporters and copy tools */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const text = `Carbs Target: ${carbResults.grams}g (${carbResults.pct}% of ${calorieTarget} kcal) | Daily Calories: ${calorieTarget} kcal | Net Carbs (Single Meal): ${netCarbOutput.net}g`;
                      handleCopy(text, 'carb-summary-copy');
                    }}
                    className="flex-1 py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-emerald-500/30 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    {copiedId === 'carb-summary-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === 'carb-summary-copy' ? "Copied Summary" : "Copy Target Summary"}</span>
                  </button>
                  <div className="flex gap-1.5">
                    <button onClick={() => handleExport('txt')} className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-emerald-500/30 hover:text-emerald-650 dark:hover:text-emerald-400 rounded-xl transition text-slate-700 dark:text-slate-300 shadow-sm" title="Export as TXT"><Download className="w-4.5 h-4.5" /></button>
                    <button onClick={() => handleExport('json')} className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-emerald-500/30 hover:text-emerald-650 dark:hover:text-emerald-400 rounded-xl transition font-mono text-[9px] font-bold text-slate-700 dark:text-slate-300 shadow-sm" title="Export as JSON">JS</button>
                    <button onClick={() => handleExport('csv')} className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-emerald-500/30 hover:text-emerald-650 dark:hover:text-emerald-400 rounded-xl transition font-mono text-[9px] font-bold text-slate-700 dark:text-slate-300 shadow-sm" title="Export as CSV">CS</button>
                    <button onClick={() => handleExport('print')} className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-emerald-500/30 hover:text-emerald-650 dark:hover:text-emerald-400 rounded-xl transition font-mono text-[9px] font-bold text-slate-700 dark:text-slate-300 shadow-sm" title="Print Report">PR</button>
                  </div>
                </div>

                {/* Step-by-Step LaTeX Explanation Math Box */}
                <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl text-xs space-y-3 leading-relaxed text-slate-650 dark:text-slate-400 shadow-sm">
                  <h4 className="font-bold text-emerald-650 dark:text-emerald-400 uppercase tracking-wider font-mono">Nutrient target Derivation Solver</h4>
                  
                  {formula === 'mifflin' && (
                    <div className="space-y-2">
                      <p>{"1. Basal Metabolic Rate (BMR) derived using Mifflin-St Jeor formula:"}</p>
                      {gender === 'male' ? (
                        <BlockMath math={`BMR = 10 \\times W + 6.25 \\times H - 5 \\times A + 5`} />
                      ) : (
                        <BlockMath math={`BMR = 10 \\times W + 6.25 \\times H - 5 \\times A - 161`} />
                      )}
                      <p>{"Substituting metrics ($W = " + weightKg.toFixed(1) + "\\text{ kg}$, $H = " + heightValCm.toFixed(1) + "\\text{ cm}$, $A = " + age + "\\text{ yrs}$):"}</p>
                      <BlockMath math={`BMR = 10 \\times ${weightKg.toFixed(1)} + 6.25 \\times ${heightValCm.toFixed(1)} - 5 \\times ${age} ${gender === 'male' ? '+ 5' : '- 161'} = ${Math.round(bmr)}\\text{ kcal}`} />
                    </div>
                  )}

                  {formula === 'harris' && (
                    <div className="space-y-2">
                      <p>{"1. Basal Metabolic Rate (BMR) derived using Revised Harris-Benedict formula:"}</p>
                      {gender === 'male' ? (
                        <BlockMath math={`BMR = 88.362 + 13.397 \\times W + 4.799 \\times H - 5.677 \\times A`} />
                      ) : (
                        <BlockMath math={`BMR = 447.593 + 9.247 \\times W + 3.098 \\times H - 4.330 \\times A`} />
                      )}
                      <p>{"Substituting metrics ($W = " + weightKg.toFixed(1) + "\\text{ kg}$, $H = " + heightValCm.toFixed(1) + "\\text{ cm}$, $A = " + age + "\\text{ yrs}$):"}</p>
                      <BlockMath math={`BMR = ${Math.round(bmr)}\\text{ kcal}`} />
                    </div>
                  )}

                  {formula === 'katch' && (
                    <div className="space-y-2">
                      <p>{"1. Basal Metabolic Rate (BMR) derived using body-fat dependent Katch-McArdle formula:"}</p>
                      <BlockMath math={`LBM = W \\times \\left(1 - \\frac{BF}{100}\\right) = ${weightKg.toFixed(1)} \\times \\left(1 - \\frac{${bodyFatVal}}{100}\\right) = ${(weightKg * (1 - bodyFatVal/100)).toFixed(1)}\\text{ kg}`} />
                      <BlockMath math={`BMR = 370 + 21.6 \\times LBM = 370 + 21.6 \\times ${(weightKg * (1 - bodyFatVal/100)).toFixed(1)} = ${Math.round(bmr)}\\text{ kcal}`} />
                    </div>
                  )}

                  <div className="space-y-2">
                    <p>{"2. Total Daily Energy Expenditure (TDEE) multiplies BMR by physical activity multiplier (" + activityLevel + "):"}</p>
                    <BlockMath math={`TDEE = BMR \\times \\text{Activity} = ${Math.round(bmr)} \\times ${activityLevel} = ${Math.round(tdee)}\\text{ kcal}`} />

                    <p>{"3. Daily caloric adjustment based on fitness goals:"}</p>
                    <BlockMath math={`\\text{Calorie Target} = ${calorieTarget}\\text{ kcal}`} />

                    <p>{"4. Daily Carbohydrates target split ($1\\text{g carbohydrate} = 4\\text{ kcal}$):"}</p>
                    <BlockMath math={`\\text{Carb Calories} = ${calorieTarget} \\times ${activeCarbPct}\\% = ${carbResults.calories}\\text{ kcal}`} />
                    <BlockMath math={`\\text{Carb Grams Target} = \\frac{${carbResults.calories}}{4} = ${carbResults.grams}\\text{ grams/day}`} />
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl opacity-50 text-center p-6">
                <Info className="w-12 h-12 mb-2 text-slate-400 dark:text-slate-500 animate-pulse" />
                <span className="font-bold text-slate-700 dark:text-white text-sm">Please Input Valid Biometric Parameters</span>
                <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 font-sans">Calculations of metabolic targets will process automatically on entering valid biometric age and weight profiles.</p>
              </div>
            )}
          </div>

          {/* Diabetic & Blood Sugar Awareness panel */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 p-5 rounded-3xl space-y-3 shadow-xl text-slate-800 dark:text-slate-100">
            <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
              <span>Diabetic & Blood Sugar Support Guidelines</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Carbohydrates have the most immediate impact on blood glucose levels. For individuals managing Type 1 or Type 2 Diabetes, balancing glycemic index (GI) and glycemic load (GL) is critical.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-sans">
              <div className="p-3 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">Glycemic Index (GI)</span>
                <span>Measures how rapidly a carbohydrate-containing food elevates blood glucose compared to pure glucose. Choose low-GI options (GI &lt; 55) like legumes, oats, and non-starchy vegetables.</span>
              </div>
              <div className="p-3 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">Glycemic Load (GL)</span>
                <span>{"Accounts for the portion size alongside the glycemic index of the food ($GL = \\frac{GI \\times \\text{Carbs}}{100}$). GL provides a more accurate real-world reflection of blood sugar impact."}</span>
              </div>
            </div>
            <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-2xl mt-2">
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-extrabold uppercase block font-mono">Medical Disclaimer</span>
              <span className="text-[10px] text-slate-500 leading-normal block mt-1 font-sans">
                The information provided by this calculator is for educational purposes only and must not be used as medical advice or for insulin dosing calculations. Always consult with a doctor, diabetologist, or registered dietitian before modifying carbohydrate levels.
              </span>
            </div>
          </div>

          {/* History logs panel */}
          {history.length > 0 && (
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 p-5 rounded-3xl shadow-xl space-y-4 text-slate-800 dark:text-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                  <History className="w-5 h-5 text-slate-400" />
                  <span>Recent Carb Plans History</span>
                </h3>
                <button onClick={clearHistory} className="text-[10px] font-bold text-rose-600 dark:text-rose-400 hover:text-rose-500 flex items-center gap-1 transition">
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="space-y-2">
                {history.map((entry) => (
                  <div key={entry.id} className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-2xl flex items-center justify-between text-xs transition-all hover:border-slate-350 dark:hover:border-slate-800 shadow-sm">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-white block">{entry.summary}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono block mt-0.5">Date: {entry.timestamp} | Goal: {entry.details.goal}</span>
                    </div>
                    <button
                      onClick={() => {
                        setWeight(entry.details.weight);
                        setAge(entry.details.age);
                        setFitnessGoal(entry.details.goal);
                        if (entry.details.carbPct) {
                          const matchingPreset = DIET_PRESETS.find(p => p.carbPct === entry.details.carbPct);
                          if (matchingPreset) {
                            setDietMode(matchingPreset.name);
                          } else {
                            setDietMode("Custom Percentage");
                            setCustomCarbPct(entry.details.carbPct);
                          }
                        }
                      }}
                      className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-350 py-1 px-3 border border-emerald-500/20 hover:border-emerald-500/40 rounded-lg transition"
                    >
                      Restore Parameters
                    </button>
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
