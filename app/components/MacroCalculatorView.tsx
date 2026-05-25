"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { InlineMath, BlockMath } from "@/app/components/KatexMath";
import { 
  Heart, 
  Dumbbell, 
  Apple, 
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
  Zap
} from "lucide-react";

interface MacroCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

// Macro distributions presets
interface MacroRatio {
  name: string;
  protein: number; // percentage
  carbs: number;
  fat: number;
  desc: string;
}

const PRESET_RATIOS: MacroRatio[] = [
  { name: "Balanced Diet", protein: 30, carbs: 40, fat: 30, desc: "A standard, sustainable macronutrient split for general wellness, fat control, and energy stability." },
  { name: "High Protein / Bodybuilding", protein: 40, carbs: 40, fat: 20, desc: "Optimized for muscle hypertrophy, recovery, and thermogenesis during fat loss or lean bulk phases." },
  { name: "Keto / LCHF", protein: 20, carbs: 5, fat: 75, desc: "Ultra-low carbohydrate, high-fat split to induce physiological nutritional ketosis." },
  { name: "Low Carb / Fat Loss", protein: 40, carbs: 20, fat: 40, desc: "Designed for carb-sensitive individuals looking to restrict carbs while maintaining high protein intake." },
  { name: "High Carb Performance", protein: 25, carbs: 55, fat: 20, desc: "Fuel-focused split for endurance athletes, strength training, and high-volume fitness sessions." },
];

export function MacroCalculatorView({ calcDef }: MacroCalculatorViewProps) {
  // Unit Toggles
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Input states
  const [age, setAge] = useState<string>("28");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>("75"); // kg or lbs
  const [heightCm, setHeightCm] = useState<string>("178");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("10");
  
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // moderate default
  const [fitnessGoal, setFitnessGoal] = useState<string>("fat-loss");
  const [formula, setFormula] = useState<'mifflin' | 'harris' | 'katch'>('mifflin');
  const [bodyFat, setBodyFat] = useState<string>("18"); // percentage (optional)

  // Macro ratio state
  const [macroMode, setMacroMode] = useState<string>("Balanced Diet");
  const [customProtein, setCustomProtein] = useState<number>(30);
  const [customCarbs, setCustomCarbs] = useState<number>(40);
  const [customFat, setCustomFat] = useState<number>(30);

  // Meal Planner state
  const [mealsCount, setMealsCount] = useState<number>(4);

  // History & Copied visual states
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
    return isNaN(val) || val < 2 || val > 70 ? 15 : val; // default to 15% if invalid
  }, [bodyFat]);

  // Formulas logic
  const bmr = useMemo(() => {
    if (weightKg <= 0 || heightValCm <= 0) return 0;
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0) return 0;

    if (formula === 'mifflin') {
      // Mifflin-St Jeor
      if (gender === 'male') {
        return (10 * weightKg) + (6.25 * heightValCm) - (5 * ageNum) + 5;
      } else {
        return (10 * weightKg) + (6.25 * heightValCm) - (5 * ageNum) - 161;
      }
    } else if (formula === 'harris') {
      // Revised Harris-Benedict
      if (gender === 'male') {
        return 88.362 + (13.397 * weightKg) + (4.799 * heightValCm) - (5.677 * ageNum);
      } else {
        return 447.593 + (9.247 * weightKg) + (3.098 * heightValCm) - (4.330 * ageNum);
      }
    } else {
      // Katch-McArdle (requires lean body mass)
      const lbm = weightKg * (1 - bodyFatVal / 100);
      return 370 + (21.6 * lbm);
    }
  }, [weightKg, heightValCm, age, gender, formula, bodyFatVal]);

  const tdee = useMemo(() => {
    return bmr * activityLevel;
  }, [bmr, activityLevel]);

  // Adjust calorie target based on goal
  const calorieTarget = useMemo(() => {
    if (tdee <= 0) return 0;
    // Goals: fat-loss (-15%), weight-loss (-20% / -500kcal), muscle-gain (+15% / +500kcal), lean-bulk (+10% / +250kcal), maintenance (+0%), athletic (+0% performance macros)
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
      case 'performance':
      default:
        return Math.round(tdee);
    }
  }, [tdee, fitnessGoal]);

  // Selected ratios
  const activeSplit = useMemo(() => {
    if (macroMode !== "Custom Ratios") {
      const match = PRESET_RATIOS.find(r => r.name === macroMode);
      if (match) return { protein: match.protein, carbs: match.carbs, fat: match.fat };
    }
    return { protein: customProtein, carbs: customCarbs, fat: customFat };
  }, [macroMode, customProtein, customCarbs, customFat]);

  // Macro Grams calculation
  const macros = useMemo(() => {
    if (calorieTarget <= 0) return { proteinGrams: 0, carbsGrams: 0, fatGrams: 0, proteinCalories: 0, carbsCalories: 0, fatCalories: 0 };
    
    const pPct = activeSplit.protein / 100;
    const cPct = activeSplit.carbs / 100;
    const fPct = activeSplit.fat / 100;

    const proteinCalories = calorieTarget * pPct;
    const carbsCalories = calorieTarget * cPct;
    const fatCalories = calorieTarget * fPct;

    return {
      proteinGrams: Math.round(proteinCalories / 4),
      carbsGrams: Math.round(carbsCalories / 4),
      fatGrams: Math.round(fatCalories / 9),
      proteinCalories: Math.round(proteinCalories),
      carbsCalories: Math.round(carbsCalories),
      fatCalories: Math.round(fatCalories),
    };
  }, [calorieTarget, activeSplit]);

  // BMI preview
  const bmiResults = useMemo(() => {
    if (weightKg <= 0 || heightValCm <= 0) return null;
    const heightM = heightValCm / 100;
    const score = weightKg / (heightM * heightM);
    
    let status = "Normal Weight";
    let color = "text-emerald-400";
    if (score < 18.5) {
      status = "Underweight";
      color = "text-sky-400";
    } else if (score >= 25 && score < 29.9) {
      status = "Overweight";
      color = "text-amber-400";
    } else if (score >= 30) {
      status = "Obese";
      color = "text-rose-500";
    }

    const minHealthyWeight = Math.round(18.5 * heightM * heightM * (unitSystem === 'metric' ? 1 : 2.20462));
    const maxHealthyWeight = Math.round(24.9 * heightM * heightM * (unitSystem === 'metric' ? 1 : 2.20462));

    return {
      score: score.toFixed(1),
      status,
      color,
      healthyRange: `${minHealthyWeight} - ${maxHealthyWeight} ${unitSystem === 'metric' ? 'kg' : 'lbs'}`
    };
  }, [weightKg, heightValCm, unitSystem]);

  // Meal Planner calculations
  const mealsList = useMemo(() => {
    if (calorieTarget <= 0) return [];
    
    // Meal splits
    // 3 meals: breakfast 35%, lunch 35%, dinner 30%
    // 4 meals: breakfast 30%, lunch 30%, dinner 30%, snack 10%
    // 5 meals: breakfast 25%, lunch 25%, dinner 25%, snack1 12.5%, snack2 12.5%
    let distributions: number[] = [];
    let names: string[] = [];

    if (mealsCount === 3) {
      distributions = [0.35, 0.35, 0.30];
      names = ["Breakfast", "Lunch", "Dinner"];
    } else if (mealsCount === 4) {
      distributions = [0.30, 0.30, 0.30, 0.10];
      names = ["Breakfast", "Lunch", "Dinner", "Snack"];
    } else {
      distributions = [0.25, 0.25, 0.25, 0.125, 0.125];
      names = ["Breakfast", "Lunch", "Dinner", "Snack 1", "Snack 2"];
    }

    return distributions.map((pct, idx) => {
      const mealCalories = Math.round(calorieTarget * pct);
      return {
        name: names[idx],
        calories: mealCalories,
        protein: Math.round((macros.proteinGrams * pct)),
        carbs: Math.round((macros.carbsGrams * pct)),
        fat: Math.round((macros.fatGrams * pct)),
        suggestions: names[idx] === "Breakfast" ? "Ideal for high protein + slow release carbs (e.g. egg white omelet & oats)." :
                     names[idx] === "Lunch" ? "Lean protein + complex carbs & veggies (e.g. chicken breast with quinoa & broccoli)." :
                     names[idx] === "Dinner" ? "Protein + healthy fats & fiber (e.g. salmon with sweet potato & asparagus)." :
                     "Ideal for quick fuel or slow-digesting protein (e.g. whey protein shake & almonds)."
      };
    });
  }, [calorieTarget, macros, mealsCount]);

  // Load and save local history profiles
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nexus-macro-history");
      if (stored) setHistory(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToHistory = () => {
    if (calorieTarget <= 0) return;
    const profile = {
      id: Date.now(),
      timestamp: new Date().toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      gender,
      age,
      weight: `${weight} ${unitSystem === 'metric' ? 'kg' : 'lbs'}`,
      goal: fitnessGoal.replace("-", " ").toUpperCase(),
      calories: calorieTarget,
      protein: macros.proteinGrams,
      carbs: macros.carbsGrams,
      fat: macros.fatGrams,
      split: macroMode
    };

    setHistory(prev => {
      const updated = [profile, ...prev.slice(0, 19)];
      localStorage.setItem("nexus-macro-history", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteHistoryItem = (id: number) => {
    setHistory(prev => {
      const updated = prev.filter(x => x.id !== id);
      localStorage.setItem("nexus-macro-history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem("nexus-macro-history");
  };

  // Clipboard copy handlers
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export handlers
  const handleExport = (format: 'txt' | 'csv' | 'json') => {
    let output = "";
    const dateStr = new Date().toLocaleString();

    if (format === 'txt') {
      output = `====================================================\n`;
      output += `          NEXUS MACRO CALCULATOR REPORT             \n`;
      output += `====================================================\n`;
      output += `Generated on: ${dateStr}\n`;
      output += `Biometrics: ${gender === 'male' ? 'Male' : 'Female'}, ${age} yrs, ${weight} ${unitSystem === 'metric' ? 'kg' : 'lbs'}, ${heightValCm.toFixed(0)} cm\n`;
      output += `Fitness Goal: ${fitnessGoal.replace("-", " ").toUpperCase()}\n`;
      output += `Macro Diet Split: ${macroMode}\n\n`;
      output += `DAILY TARGETS:\n`;
      output += `- Daily Calories: ${calorieTarget} kcal\n`;
      output += `- Protein: ${macros.proteinGrams} g (${macros.proteinCalories} kcal)\n`;
      output += `- Carbohydrates: ${macros.carbsGrams} g (${macros.carbsCalories} kcal)\n`;
      output += `- Fats: ${macros.fatGrams} g (${macros.fatCalories} kcal)\n\n`;
      output += `MEAL PLAN BREAKDOWN (${mealsCount} Meals):\n`;
      mealsList.forEach(m => {
        output += `- ${m.name}: ${m.calories} kcal (P: ${m.protein}g, C: ${m.carbs}g, F: ${m.fat}g)\n`;
      });

      const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `macro-targets.txt`;
      link.click();
    } else if (format === 'csv') {
      output = `Metric,Value,Calories\n`;
      output += `"Daily Calories",${calorieTarget},${calorieTarget}\n`;
      output += `"Protein (g)",${macros.proteinGrams},${macros.proteinCalories}\n`;
      output += `"Carbohydrates (g)",${macros.carbsGrams},${macros.carbsCalories}\n`;
      output += `"Fats (g)",${macros.fatGrams},${macros.fatCalories}\n`;

      const blob = new Blob([output], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `macro-targets.csv`;
      link.click();
    } else if (format === 'json') {
      const data = {
        biometrics: { gender, age, weight: parseFloat(weight), height: heightValCm, unitSystem },
        goal: fitnessGoal,
        formula,
        results: {
          bmr: Math.round(bmr),
          tdee: Math.round(tdee),
          calories: calorieTarget,
          macros: {
            protein: { grams: macros.proteinGrams, calories: macros.proteinCalories, percentage: activeSplit.protein },
            carbs: { grams: macros.carbsGrams, calories: macros.carbsCalories, percentage: activeSplit.carbs },
            fat: { grams: macros.fatGrams, calories: macros.fatCalories, percentage: activeSplit.fat }
          }
        },
        meals: mealsList
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `macro-report.json`;
      link.click();
    }
  };

  // Adjust sliders to ensure custom sum is 100%
  const handleSliderChange = (type: 'protein' | 'carbs' | 'fat', value: number) => {
    setMacroMode("Custom Ratios");
    if (type === 'protein') {
      const remaining = 100 - value;
      const ratio = customCarbs + customFat > 0 ? customCarbs / (customCarbs + customFat) : 0.5;
      setCustomProtein(value);
      setCustomCarbs(Math.round(remaining * ratio));
      setCustomFat(Math.round(remaining * (1 - ratio)));
    } else if (type === 'carbs') {
      const remaining = 100 - value;
      const ratio = customProtein + customFat > 0 ? customProtein / (customProtein + customFat) : 0.5;
      setCustomCarbs(value);
      setCustomProtein(Math.round(remaining * ratio));
      setCustomFat(Math.round(remaining * (1 - ratio)));
    } else {
      const remaining = 100 - value;
      const ratio = customProtein + customCarbs > 0 ? customProtein / (customProtein + customCarbs) : 0.5;
      setCustomFat(value);
      setCustomProtein(Math.round(remaining * ratio));
      setCustomCarbs(Math.round(remaining * (1 - ratio)));
    }
  };

  // Visual SVG chart calculation
  const chartSlices = useMemo(() => {
    const total = activeSplit.protein + activeSplit.carbs + activeSplit.fat;
    if (total === 0) return [];
    
    let cumulative = 0;
    const slices = [
      { percentage: activeSplit.protein, color: "#10b981", name: "Protein" }, // emerald
      { percentage: activeSplit.carbs, color: "#3b82f6", name: "Carbs" },     // blue
      { percentage: activeSplit.fat, color: "#f59e0b", name: "Fats" }         // amber
    ];

    return slices.map(s => {
      const startAngle = (cumulative / total) * 360;
      cumulative += s.percentage;
      const endAngle = (cumulative / total) * 360;
      
      // Arc coordinates
      const radius = 50;
      const center = 60;
      
      const x1 = center + radius * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = center + radius * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = center + radius * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = center + radius * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const largeArc = s.percentage > 50 ? 1 : 0;
      const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      return { ...s, pathData };
    });
  }, [activeSplit]);

  return (
    <div className="bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden font-sans">
      
      {/* Header Dashboard Banner */}
      <div className="p-6 md:p-8 bg-slate-900/50 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-950">
            <Dumbbell className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{calcDef.title}</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-800/30 px-2 py-0.5 rounded-full uppercase tracking-wider">Bio-Nutrition</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Premium macronutrient analyzer & customized meal target distribution dashboard.
            </p>
          </div>
        </div>

        {/* Units Selector */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setUnitSystem('metric')}
            style={{ color: "#f1f5f9" }}
            className={`py-1.5 px-3 rounded-lg font-bold transition-all ${unitSystem === 'metric' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            style={{ color: "#f1f5f9" }}
            className={`py-1.5 px-3 rounded-lg font-bold transition-all ${unitSystem === 'imperial' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Imperial (lbs/ft)
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: INPUT FORM */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Biometrics Block */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Biometric Profiles</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Biological Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGender('male')}
                    style={{ color: "#f1f5f9" }}
                    className={`py-2 px-3 text-xs rounded-xl font-bold border transition ${gender === 'male' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-slate-800'}`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    style={{ color: "#f1f5f9" }}
                    className={`py-2 px-3 text-xs rounded-xl font-bold border transition ${gender === 'female' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-slate-800'}`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={{ color: "#f1f5f9" }}
                  className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-semibold text-xs"
                  placeholder="e.g. 28"
                  min="5"
                  max="120"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  style={{ color: "#f1f5f9" }}
                  className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-semibold text-xs"
                  placeholder={unitSystem === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                  min="20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Height</label>
                {unitSystem === 'metric' ? (
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    style={{ color: "#f1f5f9" }}
                    className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-semibold text-xs"
                    placeholder="e.g. 175"
                    min="50"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      style={{ color: "#f1f5f9" }}
                      className="w-full h-10 px-2 bg-slate-900 border border-slate-800 rounded-xl outline-none text-center font-semibold text-xs"
                      placeholder="ft"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      style={{ color: "#f1f5f9" }}
                      className="w-full h-10 px-2 bg-slate-900 border border-slate-800 rounded-xl outline-none text-center font-semibold text-xs"
                      placeholder="in"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Katch McArdle body fat dependency */}
            {formula === 'katch' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Body Fat Percentage (%)</label>
                <input
                  type="number"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  style={{ color: "#f1f5f9" }}
                  className="w-full h-10 px-3 bg-slate-900 border border-slate-850 rounded-xl outline-none font-semibold text-xs"
                  placeholder="e.g. 18"
                  min="2"
                  max="60"
                />
              </div>
            )}
          </div>

          {/* Activity and Goals */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Activity Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(Number(e.target.value))}
                style={{ color: "#f1f5f9" }}
                className="w-full h-10 px-2 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs"
              >
                <option value="1.2" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Sedentary (Little to no exercise)</option>
                <option value="1.375" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Lightly Active (Exercise 1-3 days/week)</option>
                <option value="1.55" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Moderately Active (Exercise 3-5 days/week)</option>
                <option value="1.725" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Very Active (Hard exercise 6-7 days/week)</option>
                <option value="1.9" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Extra Active (Physical job or daily heavy sports)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Primary Fitness Goal</label>
              <select
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                style={{ color: "#f1f5f9" }}
                className="w-full h-10 px-2 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs"
              >
                <option value="fat-loss" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Fat Loss (Moderate -15% deficit)</option>
                <option value="weight-loss" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Weight Loss (Aggressive -500 kcal deficit)</option>
                <option value="maintenance" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Maintenance (Stay at current weight)</option>
                <option value="lean-bulk" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Lean Bulk (Clean muscle gain +250 surplus)</option>
                <option value="muscle-gain" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Muscle Gain (High surplus +500 kcal)</option>
                <option value="performance" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Athletic Performance (Refuel glycogen)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">BMR Formula</label>
                <select
                  value={formula}
                  onChange={(e) => setFormula(e.target.value as any)}
                  style={{ color: "#f1f5f9" }}
                  className="w-full h-10 px-2 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs"
                >
                  <option value="mifflin" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Mifflin-St Jeor</option>
                  <option value="harris" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Revised Harris-Benedict</option>
                  <option value="katch" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>Katch-McArdle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Meals Count</label>
                <select
                  value={mealsCount}
                  onChange={(e) => setMealsCount(Number(e.target.value))}
                  style={{ color: "#f1f5f9" }}
                  className="w-full h-10 px-2 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs"
                >
                  <option value="3" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>3 Meals (No Snacks)</option>
                  <option value="4" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>4 Meals (With 1 Snack)</option>
                  <option value="5" style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>5 Meals (With 2 Snacks)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={saveToHistory}
            className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-2xl text-xs font-bold tracking-wider transition flex items-center justify-center gap-1.5 uppercase"
          >
            <Sparkles className="w-4 h-4" />
            <span>Save Profile Node</span>
          </button>

          {/* Local History Section */}
          {history.length > 0 && (
            <div className="pt-6 border-t border-slate-900 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-400 font-bold">
                  <History className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Logged Profiles</span>
                </span>
                <button onClick={clearAllHistory} className="text-slate-500 hover:text-rose-500 font-bold flex items-center gap-1">
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Log</span>
                </button>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto scrollbar-thin pr-1">
                {history.map(item => (
                  <div key={item.id} className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl flex justify-between items-center text-[10px] gap-2">
                    <div className="truncate">
                      <span className="font-bold text-slate-200">{item.weight} | {item.goal}</span>
                      <p className="text-slate-500 text-[9px]">{item.timestamp} • {item.split}</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold shrink-0">
                      <span className="text-emerald-400">{item.calories} kcal</span>
                      <button onClick={() => deleteHistoryItem(item.id)} className="text-slate-600 hover:text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: CALCULATED MACRO TARGETS */}
        <div className="lg:col-span-7 space-y-6">
          {bmr > 0 ? (
            <div className="space-y-6">
              
              {/* Daily Target Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Calories Target */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute right-3 top-3 text-slate-800/60"><Flame className="w-10 h-10" /></div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Daily Target Calories</span>
                  <div className="text-xl font-black text-emerald-400 tracking-tight">{calorieTarget.toLocaleString()} kcal</div>
                  <div className="text-[9px] text-slate-500 mt-1.5">TDEE Baseline: {Math.round(tdee)} kcal</div>
                </div>

                {/* BMR baseline */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute right-3 top-3 text-slate-800/60"><Sparkles className="w-10 h-10" /></div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Basal Metabolic Rate</span>
                  <div className="text-xl font-black text-emerald-400 tracking-tight">{Math.round(bmr).toLocaleString()} kcal</div>
                  <div className="text-[9px] text-slate-500 mt-1.5">BMR formula: {formula.toUpperCase()}</div>
                </div>

                {/* BMI status preview */}
                {bmiResults && (
                  <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-4 relative overflow-hidden">
                    <div className="absolute right-3 top-3 text-slate-800/60"><Scale className="w-10 h-10" /></div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Body Mass Index (BMI)</span>
                    <div className="text-xl font-black text-emerald-400 tracking-tight">{bmiResults.score}</div>
                    <div className={`text-[9px] font-bold mt-1.5 ${bmiResults.color}`}>{bmiResults.status}</div>
                  </div>
                )}
              </div>

              {/* Macro Ratios Preset Tabs */}
              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-850 pb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Macronutrient Distribution Models</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-950 font-bold font-mono">Current: {macroMode}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {PRESET_RATIOS.map(ratio => (
                    <button
                      key={ratio.name}
                      onClick={() => setMacroMode(ratio.name)}
                      style={{ color: "#f1f5f9" }}
                      className={`py-1.5 px-3 rounded-lg text-[10px] font-bold border transition ${
                        macroMode === ratio.name 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                          : 'bg-slate-950 border-slate-850 hover:border-slate-700'
                      }`}
                    >
                      {ratio.name} ({ratio.protein}/{ratio.carbs}/{ratio.fat})
                    </button>
                  ))}
                  <button
                    onClick={() => setMacroMode("Custom Ratios")}
                    style={{ color: "#f1f5f9" }}
                    className={`py-1.5 px-3 rounded-lg text-[10px] font-bold border transition ${
                      macroMode === "Custom Ratios" 
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                        : 'bg-slate-950 border-slate-850 hover:border-slate-700'
                    }`}
                  >
                    Custom Sliders
                  </button>
                </div>

                {/* Custom ratio sliders */}
                {macroMode === "Custom Ratios" && (
                  <div className="bg-slate-950/50 p-4 border border-slate-900 rounded-xl space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-350">
                        <span>Protein Ratio: {customProtein}%</span>
                        <span className="text-emerald-400">{Math.round(calorieTarget * (customProtein/100))} kcal</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={customProtein}
                        onChange={(e) => handleSliderChange('protein', Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-900 h-1 rounded-lg outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-350">
                        <span>Carbohydrates Ratio: {customCarbs}%</span>
                        <span className="text-blue-400">{Math.round(calorieTarget * (customCarbs/100))} kcal</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={customCarbs}
                        onChange={(e) => handleSliderChange('carbs', Number(e.target.value))}
                        className="w-full accent-blue-500 bg-slate-900 h-1 rounded-lg outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-350">
                        <span>Fats Ratio: {customFat}%</span>
                        <span className="text-amber-400">{Math.round(calorieTarget * (customFat/100))} kcal</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={customFat}
                        onChange={(e) => handleSliderChange('fat', Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-900 h-1 rounded-lg outline-none"
                      />
                    </div>

                    <div className="text-[10px] text-slate-500 text-center font-bold">
                      Slider adjustments dynamically balance to equal exactly 100% total.
                    </div>
                  </div>
                )}
              </div>

              {/* Graphic Pie chart & Gram breakdowns */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-900/20 border border-slate-850 p-5 rounded-3xl items-center">
                
                {/* SVG Pie Chart */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-36 h-36">
                    <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
                      {chartSlices.map((slice, i) => (
                        <path
                          key={i}
                          d={slice.pathData}
                          fill={slice.color}
                          className="hover:opacity-90 transition cursor-pointer"
                        />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Target</span>
                      <span className="text-sm font-extrabold text-white">{calorieTarget} kcal</span>
                    </div>
                  </div>
                </div>

                {/* Gram lists */}
                <div className="md:col-span-7 space-y-3 text-xs">
                  {[
                    { label: "Protein (4 kcal/g)", grams: macros.proteinGrams, kcal: macros.proteinCalories, pct: activeSplit.protein, colorBg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
                    { label: "Carbohydrates (4 kcal/g)", grams: macros.carbsGrams, kcal: macros.carbsCalories, pct: activeSplit.carbs, colorBg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
                    { label: "Fats (9 kcal/g)", grams: macros.fatGrams, kcal: macros.fatCalories, pct: activeSplit.fat, colorBg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" }
                  ].map((macro, idx) => (
                    <div key={idx} className={`p-3 rounded-2xl border ${macro.colorBg} ${macro.border} flex justify-between items-center`}>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400">{macro.label}</span>
                        <span className={`text-lg font-black ${macro.text}`}>{macro.grams} grams</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400 font-bold">{macro.pct}% Allocation</span>
                        <span className="font-mono text-slate-300 font-bold">{macro.kcal} kcal</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meal Planner Allocation Grid */}
              <div className="bg-slate-900/10 border border-slate-850 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-5 gap-3 p-3.5 border-b border-slate-850 bg-slate-900/40 font-bold text-slate-400 text-[10px] uppercase tracking-wider text-center">
                  <div className="text-left col-span-2">Meal Distribution</div>
                  <div>Calories</div>
                  <div>Protein</div>
                  <div>Carbs/Fat</div>
                </div>

                {mealsList.map((meal, idx) => (
                  <div key={idx} className="grid grid-cols-5 gap-3 p-3.5 border-b border-slate-900 hover:bg-slate-900/10 items-center text-center">
                    <div className="text-left col-span-2">
                      <span className="font-extrabold text-white block">{meal.name}</span>
                      <span className="text-[9px] text-slate-500 leading-none block mt-0.5">{meal.suggestions}</span>
                    </div>
                    <div className="font-bold text-emerald-400">{meal.calories} kcal</div>
                    <div className="font-mono font-bold text-slate-200">{meal.protein}g</div>
                    <div className="font-mono text-slate-400">
                      <span className="text-blue-400 font-bold">{meal.carbs}g</span> / <span className="text-amber-500 font-bold">{meal.fat}g</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Workout Timing Guidance */}
              <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-2xl space-y-2 text-xs">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Nutritional Timing & Performance Optimization</span>
                </h4>
                <p className="text-slate-400 leading-relaxed font-sans">
                  • **Pre-Workout Fuel**: Consume a meal containing ~0.5g carbs/kg bodyweight and 20-30g protein roughly 1.5 - 2 hours prior to training to optimize liver glycogen and prevent catabolism.
                </p>
                <p className="text-slate-400 leading-relaxed font-sans">
                  • **Post-Workout Recovery**: Consume ~20-40g high-quality protein (whey or plant isolates) and fast-digesting carbohydrates within 45 minutes of training to initiate muscle protein synthesis (MPS) and replenish depleted energy stores.
                </p>
              </div>

              {/* Actions Exporters */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = `Macros Report: Calories ${calorieTarget} kcal | Protein: ${macros.proteinGrams}g, Carbs: ${macros.carbsGrams}g, Fat: ${macros.fatGrams}g (Split: ${macroMode})`;
                    handleCopy(text, 'macro-summary-copy');
                  }}
                  className="flex-1 py-2 px-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  {copiedId === 'macro-summary-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'macro-summary-copy' ? "Copied Summary" : "Copy Macro Summary"}</span>
                </button>
                <div className="flex gap-1">
                  <button onClick={() => handleExport('txt')} className="p-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-xl transition" title="Export as TXT"><Download className="w-4 h-4" /></button>
                  <button onClick={() => handleExport('json')} className="p-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-xl transition font-mono text-[9px] font-bold" title="Export as JSON">JS</button>
                  <button onClick={() => handleExport('csv')} className="p-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-xl transition font-mono text-[9px] font-bold" title="Export as CSV">CS</button>
                </div>
              </div>

              {/* LaTeX Educational Calculations */}
              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl text-xs space-y-3 leading-relaxed text-slate-400">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider font-mono">Macronutrient Target Derivation</h4>
                
                {formula === 'mifflin' && (
                  <div className="space-y-2">
                    <p>{"1. Basal Metabolic Rate (BMR) is calculated using the Mifflin-St Jeor formula:"}</p>
                    {gender === 'male' ? (
                      <BlockMath math={`BMR = 10 \\times W + 6.25 \\times H - 5 \\times A + 5`} />
                    ) : (
                      <BlockMath math={`BMR = 10 \\times W + 6.25 \\times H - 5 \\times A - 161`} />
                    )}
                    <p>{"Substituting your metrics ($W = " + weightKg.toFixed(1) + "\\text{ kg}$, $H = " + heightValCm.toFixed(1) + "\\text{ cm}$, $A = " + age + "\\text{ yrs}$):"}</p>
                    <BlockMath math={`BMR = 10 \\times ${weightKg.toFixed(1)} + 6.25 \\times ${heightValCm.toFixed(1)} - 5 \\times ${age} ${gender === 'male' ? '+ 5' : '- 161'} = ${Math.round(bmr)}\\text{ kcal}`} />
                  </div>
                )}

                {formula === 'harris' && (
                  <div className="space-y-2">
                    <p>{"1. Basal Metabolic Rate (BMR) is calculated using the Revised Harris-Benedict formula:"}</p>
                    {gender === 'male' ? (
                      <BlockMath math={`BMR = 88.362 + 13.397 \\times W + 4.799 \\times H - 5.677 \\times A`} />
                    ) : (
                      <BlockMath math={`BMR = 447.593 + 9.247 \\times W + 3.098 \\times H - 4.330 \\times A`} />
                    )}
                    <p>{"Substituting your metrics ($W = " + weightKg.toFixed(1) + "\\text{ kg}$, $H = " + heightValCm.toFixed(1) + "\\text{ cm}$, $A = " + age + "\\text{ yrs}$):"}</p>
                    <BlockMath math={`BMR = ${Math.round(bmr)}\\text{ kcal}`} />
                  </div>
                )}

                {formula === 'katch' && (
                  <div className="space-y-2">
                    <p>{"1. Basal Metabolic Rate (BMR) is calculated using the body-fat dependent Katch-McArdle formula:"}</p>
                    <BlockMath math={`LBM = W \\times \\left(1 - \\frac{BF}{100}\\right) = ${weightKg.toFixed(1)} \\times \\left(1 - \\frac{${bodyFatVal}}{100}\\right) = ${(weightKg * (1 - bodyFatVal/100)).toFixed(1)}\\text{ kg}`} />
                    <BlockMath math={`BMR = 370 + 21.6 \\times LBM = 370 + 21.6 \\times ${(weightKg * (1 - bodyFatVal/100)).toFixed(1)} = ${Math.round(bmr)}\\text{ kcal}`} />
                  </div>
                )}

                <div className="space-y-2">
                  <p>{"2. Total Daily Energy Expenditure (TDEE) multiplies BMR by your active index factor (multiplier = " + activityLevel + "):"}</p>
                  <BlockMath math={`TDEE = BMR \\times \\text{Activity} = ${Math.round(bmr)} \\times ${activityLevel} = ${Math.round(tdee)}\\text{ kcal}`} />

                  <p>{"3. Calorie Target adjusts TDEE based on your goal (Deficit/Surplus factor):"}</p>
                  <BlockMath math={`\\text{Calorie Target} = ${calorieTarget}\\text{ kcal}`} />

                  <p>{"4. Macro Allocations are mapped as grams ($1\\text{g protein/carbs} = 4\\text{ kcal}$, $1\\text{g fat} = 9\\text{ kcal}$):"}</p>
                  <BlockMath math={`\\text{Protein} = \\frac{${calorieTarget} \\times ${activeSplit.protein}\\%}{4} = ${macros.proteinGrams}\\text{ grams}`} />
                  <BlockMath math={`\\text{Carbohydrates} = \\frac{${calorieTarget} \\times ${activeSplit.carbs}\\%}{4} = ${macros.carbsGrams}\\text{ grams}`} />
                  <BlockMath math={`\\text{Fats} = \\frac{${calorieTarget} \\times ${activeSplit.fat}\\%}{9} = ${macros.fatGrams}\\text{ grams}`} />
                </div>
              </div>

            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-3xl opacity-50 text-center p-6">
              <Apple className="w-12 h-12 mb-2 text-slate-500" />
              <span className="font-bold text-white text-sm">Please Input Valid Biometric Data</span>
              <p className="text-xs text-slate-500 mt-1 font-sans">Calculate customized macronutrient allocations in real-time by entering age, weight, and height profiles.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
