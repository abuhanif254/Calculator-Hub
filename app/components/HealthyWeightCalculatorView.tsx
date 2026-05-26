"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useSettings } from "@/app/context/SettingsContext";
import {
  Scale,
  CheckCircle,
  Info,
  Activity,
  Copy,
  Download,
  History,
  Trash,
  Plus,
  RefreshCw,
  FileText,
  User,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Printer
} from "lucide-react";

// Helper conversions
const kgToLbs = (kg: number) => kg * 2.20462262;
const lbsToKg = (lbs: number) => lbs / 2.20462262;
const cmToInches = (cm: number) => cm / 2.54;
const inchesToCm = (inches: number) => inches * 2.54;

interface HistoryItem {
  id: string;
  date: string;
  gender: "male" | "female";
  age: number;
  heightCm: number;
  weightKg: number | null;
  frameSize: "small" | "medium" | "large" | "none";
  computedFrame: "small" | "medium" | "large";
  bmi: number | null;
  targetWeightKg: number;
}

export function HealthyWeightCalculatorView({ calcDef }: { calcDef: CalculatorDef }) {
  const t = useTranslations("HealthyWeightCalculator");
  const { unitSystem } = useSettings();

  // Unit settings (initialized with global unit, can be overridden locally)
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  useEffect(() => {
    if (unitSystem) {
      setUnit(unitSystem);
    }
  }, [unitSystem]);

  // Form State
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number | "">(25);
  
  // Height inputs
  const [heightCm, setHeightCm] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");

  // Weight input (optional but enables BMI & goal planner)
  const [currentWeight, setCurrentWeight] = useState("70");

  // Frame size inputs
  const [frameSize, setFrameSize] = useState<"small" | "medium" | "large" | "none">("none");
  const [useWristCalc, setUseWristCalc] = useState(false);
  const [wristVal, setWristVal] = useState("17.5"); // default 17.5 cm / 6.9 in

  // Goal settings
  const [weeklyChangeRate, setWeeklyChangeRate] = useState<number>(0.5); // kg per week
  const [customTargetWeight, setCustomTargetWeight] = useState<string>("");

  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedResult, setCopiedResult] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load history on mount
  useEffect(() => {
    const stored = localStorage.getItem("healthy-weight-calculator-history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

  // Sync inputs when switching units
  const handleUnitChange = (newUnit: "metric" | "imperial") => {
    if (newUnit === unit) return;
    setUnit(newUnit);

    // Convert height values
    if (newUnit === "imperial") {
      const cm = parseFloat(heightCm);
      if (!isNaN(cm)) {
        const inches = cmToInches(cm);
        const ft = Math.floor(inches / 12);
        const inc = Math.round(inches % 12);
        setHeightFt(ft.toString());
        setHeightIn(inc.toString());
      }
      // Convert wrist
      const wrist = parseFloat(wristVal);
      if (!isNaN(wrist)) {
        setWristVal((wrist / 2.54).toFixed(1));
      }
      // Convert current weight
      const weight = parseFloat(currentWeight);
      if (!isNaN(weight)) {
        setCurrentWeight((kgToLbs(weight)).toFixed(1));
      }
      // Convert custom target weight if any
      const target = parseFloat(customTargetWeight);
      if (!isNaN(target)) {
        setCustomTargetWeight((kgToLbs(target)).toFixed(1));
      }
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inc = parseFloat(heightIn) || 0;
      const inches = (ft * 12) + inc;
      if (inches > 0) {
        setHeightCm(Math.round(inchesToCm(inches)).toString());
      }
      // Convert wrist
      const wrist = parseFloat(wristVal);
      if (!isNaN(wrist)) {
        setWristVal(Math.round(wrist * 2.54 * 10) / 10 + "");
      }
      // Convert current weight
      const weight = parseFloat(currentWeight);
      if (!isNaN(weight)) {
        setCurrentWeight((lbsToKg(weight)).toFixed(1));
      }
      // Convert custom target weight if any
      const target = parseFloat(customTargetWeight);
      if (!isNaN(target)) {
        setCustomTargetWeight((lbsToKg(target)).toFixed(1));
      }
    }
  };

  // Advanced calculations
  const calculations = useMemo(() => {
    // 1. Height in metric / imperial
    let hCm = parseFloat(heightCm);
    let hInches = 0;
    if (unit === "imperial") {
      const ft = parseFloat(heightFt) || 0;
      const inc = parseFloat(heightIn) || 0;
      hInches = (ft * 12) + inc;
      hCm = inchesToCm(hInches);
    } else {
      hInches = cmToInches(hCm);
    }

    const hMeters = hCm / 100;

    // Validation checks
    const isHeightValid = !isNaN(hCm) && hCm >= 100 && hCm <= 250;
    const parsedAge = typeof age === "number" ? age : parseFloat(age || "");
    const isAgeValid = !isNaN(parsedAge) && parsedAge >= 2 && parsedAge <= 120;
    const isWeightValid = currentWeight !== "" && !isNaN(parseFloat(currentWeight)) && parseFloat(currentWeight) > 0;
    const wristValNum = parseFloat(wristVal);
    const isWristValid = !useWristCalc || (!isNaN(wristValNum) && wristValNum > 0);

    if (!isHeightValid || !isAgeValid) {
      return { isValid: false, isWeightValid, isWristValid };
    }

    // 2. Body Frame Size
    let computedFrame: "small" | "medium" | "large" = "medium";
    if (useWristCalc && !isNaN(wristValNum) && wristValNum > 0) {
      const wristCm = unit === "metric" ? wristValNum : wristValNum * 2.54;
      const r = hCm / wristCm;
      if (gender === "male") {
        if (r > 10.4) computedFrame = "small";
        else if (r >= 9.6) computedFrame = "medium";
        else computedFrame = "large";
      } else {
        if (r > 11.0) computedFrame = "small";
        else if (r >= 10.1) computedFrame = "medium";
        else computedFrame = "large";
      }
    } else if (frameSize !== "none") {
      computedFrame = frameSize as "small" | "medium" | "large";
    }

    // Adjustments based on frame size
    let frameMultiplier = 1.0;
    if (computedFrame === "small") frameMultiplier = 0.9;
    else if (computedFrame === "large") frameMultiplier = 1.1;

    // 3. Clinical Ideal Weight Formulas (Return in Kg)
    // Formulas assume 5ft+ base (60 inches)
    const inchesOver5Ft = Math.max(-20, hInches - 60);

    let devine = 0;
    let robinson = 0;
    let miller = 0;
    let hamwi = 0;

    if (gender === "male") {
      devine = 50.0 + 2.3 * inchesOver5Ft;
      robinson = 52.0 + 1.9 * inchesOver5Ft;
      miller = 56.2 + 1.41 * inchesOver5Ft;
      hamwi = 48.0 + 2.7 * inchesOver5Ft;
    } else {
      devine = 45.5 + 2.3 * inchesOver5Ft;
      robinson = 49.0 + 1.7 * inchesOver5Ft;
      miller = 53.1 + 1.36 * inchesOver5Ft;
      hamwi = 45.5 + 2.2 * inchesOver5Ft;
    }

    // Apply frame size adjustments
    const devineAdj = devine * frameMultiplier;
    const robinsonAdj = robinson * frameMultiplier;
    const millerAdj = miller * frameMultiplier;
    const hamwiAdj = hamwi * frameMultiplier;

    // 4. BMI limits (WHO standard: 18.5 - 24.9)
    // Adjust normal weight boundaries for frame size
    const bmiMinWeightKg = 18.5 * (hMeters * hMeters) * frameMultiplier;
    const bmiMaxWeightKg = 24.9 * (hMeters * hMeters) * frameMultiplier;
    const bmiIdealWeightKg = 21.7 * (hMeters * hMeters) * frameMultiplier;

    // Clinical Average Recommended weight
    const clinicalAvgWeightKg = (devineAdj + robinsonAdj + millerAdj + hamwiAdj) / 4;
    const recommendedTargetKg = clinicalAvgWeightKg;

    // 5. Current Weight / BMI integration
    let currentWeightKg: number | null = null;
    let currentBmi: number | null = null;
    let bmiCategory = "";
    let bmiColor = "slate";

    if (isWeightValid) {
      const wVal = parseFloat(currentWeight);
      currentWeightKg = unit === "metric" ? wVal : lbsToKg(wVal);
      currentBmi = currentWeightKg / (hMeters * hMeters);

      if (currentBmi < 18.5) {
        bmiCategory = "Underweight";
        bmiColor = "sky";
      } else if (currentBmi < 25.0) {
        bmiCategory = "Normal weight";
        bmiColor = "emerald";
      } else if (currentBmi < 30.0) {
        bmiCategory = "Overweight";
        bmiColor = "amber";
      } else {
        bmiCategory = "Obesity";
        bmiColor = "rose";
      }
    }

    return {
      isValid: true,
      isWeightValid,
      isWristValid,
      heightCm: hCm,
      heightInches: hInches,
      computedFrame,
      frameMultiplier,
      formulas: {
        devine: devineAdj,
        robinson: robinsonAdj,
        miller: millerAdj,
        hamwi: hamwiAdj,
        bmiIdeal: bmiIdealWeightKg
      },
      healthyWeightRange: {
        min: bmiMinWeightKg,
        max: bmiMaxWeightKg
      },
      recommendedTarget: recommendedTargetKg,
      currentWeightKg,
      currentBmi,
      bmiCategory,
      bmiColor
    };
  }, [gender, age, heightCm, heightFt, heightIn, currentWeight, frameSize, useWristCalc, wristVal, unit]);

  // Handle format representation
  const formatWeight = (kg: number) => {
    if (unit === "metric") {
      return `${kg.toFixed(1)} kg`;
    }
    return `${(kgToLbs(kg)).toFixed(1)} lbs`;
  };

  const getTranslatedCategory = (category: string) => {
    switch (category) {
      case "Normal weight":
        return t("normalWeight");
      case "Underweight":
        return t("underweight");
      case "Overweight":
        return t("overweight");
      case "Obesity":
        return t("obesity");
      default:
        return category;
    }
  };

  // Save calculation to local history
  const handleSaveToHistory = () => {
    if (!calculations.isValid) return;

    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      gender,
      age: Number(age),
      heightCm: calculations.heightCm!,
      weightKg: calculations.currentWeightKg ?? null,
      frameSize,
      computedFrame: calculations.computedFrame ?? "medium",
      bmi: calculations.currentBmi ?? null,
      targetWeightKg: calculations.recommendedTarget!
    };

    const updated = [newItem, ...history].slice(0, 20); // Keep last 20
    setHistory(updated);
    localStorage.setItem("healthy-weight-calculator-history", JSON.stringify(updated));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Restore calculation
  const handleRestore = (item: HistoryItem) => {
    setGender(item.gender);
    setAge(item.age);
    setFrameSize(item.frameSize);
    setUseWristCalc(false);
    
    if (unit === "metric") {
      setHeightCm(item.heightCm.toFixed(0));
      if (item.weightKg) {
        setCurrentWeight(item.weightKg.toFixed(1));
      } else {
        setCurrentWeight("");
      }
    } else {
      const inches = cmToInches(item.heightCm);
      setHeightFt(Math.floor(inches / 12).toString());
      setHeightIn(Math.round(inches % 12).toString());
      if (item.weightKg) {
        setCurrentWeight(kgToLbs(item.weightKg).toFixed(1));
      } else {
        setCurrentWeight("");
      }
    }
  };

  // Delete history item
  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("healthy-weight-calculator-history", JSON.stringify(updated));
  };

  // Clear all history
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("healthy-weight-calculator-history");
  };

  // Copy results summary
  const triggerCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResult(key);
    setTimeout(() => setCopiedResult(null), 2000);
  };

  const getCopyText = () => {
    if (!calculations.isValid) return "";

    const targetW = calculations.recommendedTarget!;
    const minW = calculations.healthyWeightRange!.min!;
    const maxW = calculations.healthyWeightRange!.max!;

    let text = `--- Healthy Weight Calculator Report ---\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n`;
    text += `Profile: ${gender.toUpperCase()}, ${age} years old\n`;
    text += `Height: ${calculations.heightCm!.toFixed(1)} cm (${Math.floor(calculations.heightInches! / 12)} ft ${Math.round(calculations.heightInches! % 12)} in)\n`;
    if (calculations.currentWeightKg) {
      text += `Current Weight: ${formatWeight(calculations.currentWeightKg)} (BMI: ${calculations.currentBmi!.toFixed(1)} - ${calculations.bmiCategory})\n`;
    }
    text += `Body Frame Size: ${calculations.computedFrame!.toUpperCase()}\n`;
    text += `------------------------------------\n`;
    text += `HEALTHY WEIGHT RANGE (BMI 18.5 - 24.9):\n`;
    text += `  ${formatWeight(minW)} - ${formatWeight(maxW)}\n\n`;
    text += `RECOMMENDED TARGET WEIGHT:\n`;
    text += `  ${formatWeight(targetW)}\n\n`;
    text += `CLINICAL FORMULAS ESTIMATES:\n`;
    text += `  Robinson: ${formatWeight(calculations.formulas!.robinson)}\n`;
    text += `  Miller:   ${formatWeight(calculations.formulas!.miller)}\n`;
    text += `  Devine:   ${formatWeight(calculations.formulas!.devine)}\n`;
    text += `  Hamwi:    ${formatWeight(calculations.formulas!.hamwi)}\n`;
    text += `  BMI Base: ${formatWeight(calculations.formulas!.bmiIdeal)}\n`;
    text += `------------------------------------\n`;
    text += `Created at NexusCalculator.net`;

    return text;
  };

  // Export handlers
  const downloadFile = (content: string, type: string, ext: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `healthy-weight-report.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsTXT = () => {
    const text = getCopyText();
    downloadFile(text, "text/plain", "txt");
  };

  const exportAsCSV = () => {
    if (!calculations.isValid) return;

    const data = [
      ["Metric", "Value"],
      ["Date", new Date().toLocaleDateString()],
      ["Gender", gender],
      ["Age", age.toString()],
      ["Height (cm)", calculations.heightCm!.toFixed(1)],
      ["Weight (kg)", calculations.currentWeightKg ? calculations.currentWeightKg.toFixed(1) : "N/A"],
      ["BMI", calculations.currentBmi ? calculations.currentBmi.toFixed(1) : "N/A"],
      ["BMI Category", calculations.bmiCategory || "N/A"],
      ["Frame Size", calculations.computedFrame],
      ["Min Healthy Weight (kg)", calculations.healthyWeightRange!.min!.toFixed(1)],
      ["Max Healthy Weight (kg)", calculations.healthyWeightRange!.max!.toFixed(1)],
      ["Recommended Target (kg)", calculations.recommendedTarget!.toFixed(1)],
      ["Robinson Formula (kg)", calculations.formulas!.robinson.toFixed(1)],
      ["Miller Formula (kg)", calculations.formulas!.miller.toFixed(1)],
      ["Devine Formula (kg)", calculations.formulas!.devine.toFixed(1)],
      ["Hamwi Formula (kg)", calculations.formulas!.hamwi.toFixed(1)]
    ];

    const csvContent = data.map((row) => row.map((val) => `"${val}"`).join(",")).join("\n");
    downloadFile(csvContent, "text/csv", "csv");
  };

  const exportAsJSON = () => {
    if (!calculations.isValid) return;

    const jsonContent = JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        inputs: {
          gender,
          age,
          heightCm: calculations.heightCm,
          weightKg: calculations.currentWeightKg,
          frameSize: calculations.computedFrame
        },
        results: {
          bmi: calculations.currentBmi,
          bmiCategory: calculations.bmiCategory,
          healthyWeightRange: calculations.healthyWeightRange,
          recommendedTarget: calculations.recommendedTarget,
          formulas: calculations.formulas
        }
      },
      null,
      2
    );

    downloadFile(jsonContent, "application/json", "json");
  };

  const triggerPrintReport = () => {
    window.print();
  };

  // Goal calculations
  const goalAnalysis = useMemo(() => {
    if (!calculations.isValid || !calculations.currentWeightKg) return null;

    const currentW = calculations.currentWeightKg;
    const targetW = calculations.recommendedTarget!;
    const diff = currentW - targetW;
    const diffAbs = Math.abs(diff);

    // Convert change rate to kg
    const rateKg = unit === "metric" ? weeklyChangeRate : lbsToKg(weeklyChangeRate);
    const weeksNeeded = rateKg > 0 ? Math.ceil(diffAbs / rateKg) : 0;

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + (weeksNeeded * 7));

    return {
      diff,
      diffAbs,
      direction: diff > 0 ? "lose" : diff < 0 ? "gain" : "maintain",
      weeksNeeded,
      targetDate: targetDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };
  }, [calculations, weeklyChangeRate, unit]);

  // Pointer position for gauge (BMI 15 to 35)
  const pointerPosition = useMemo(() => {
    if (!calculations.isValid || !calculations.currentBmi) return 0;
    const bmi = calculations.currentBmi;
    const min = 15;
    const max = 35;
    const clamped = Math.max(min, Math.min(max, bmi));
    return ((clamped - min) / (max - min)) * 100;
  }, [calculations]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden print:shadow-none print:border-none">
      
      {/* HEADER SECTION */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shadow-inner">
            <Scale size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white leading-tight">
              {calcDef.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 print:hidden">
              Clinical & BMI Health Weight Analyst
            </p>
          </div>
        </div>

        {/* Localized unit switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full md:w-auto print:hidden">
          <button
            onClick={() => handleUnitChange("metric")}
            className={`flex-1 md:w-28 py-2 text-xs font-extrabold rounded-lg transition-all ${
              unit === "metric"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {t("metric")}
          </button>
          <button
            onClick={() => handleUnitChange("imperial")}
            className={`flex-1 md:w-28 py-2 text-xs font-extrabold rounded-lg transition-all ${
              unit === "imperial"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {t("imperial")}
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS PANEL (LEFT 5 COLUMNS) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          
          <div className="bg-slate-50 dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-5">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <User size={16} /> Demographics & Metrics
            </h3>

            {/* Gender Selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  gender === "male"
                    ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/30 dark:border-blue-900/50 dark:text-blue-400 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                ♂ {t("male")}
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  gender === "female"
                    ? "bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-950/30 dark:border-pink-900/50 dark:text-pink-400 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                ♀ {t("female")}
              </button>
            </div>

            {/* Age & Height */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                  {t("age")}
                </label>
                <input
                  type="number"
                  min="2"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value !== "" ? Number(e.target.value) : "")}
                  placeholder="e.g. 25"
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none transition-shadow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                  {t("currentWeight")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder="Optional"
                    className="w-full pl-3 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none transition-shadow"
                  />
                  <span className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 text-xs font-bold pointer-events-none">
                    {unit === "metric" ? "kg" : "lbs"}
                  </span>
                </div>
              </div>
            </div>

            {/* Height input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                {t("height")}
              </label>
              {unit === "metric" ? (
                <div className="relative">
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="175"
                    className="w-full pl-3 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none transition-shadow"
                  />
                  <span className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 text-xs font-bold">
                    cm
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      placeholder="ft"
                      className="w-full pr-8 pl-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none transition-shadow"
                    />
                    <span className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 text-xs font-bold">
                      ft
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      placeholder="in"
                      className="w-full pr-8 pl-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none transition-shadow"
                    />
                    <span className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 text-xs font-bold">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* BODY FRAME SIZE CALCULATOR */}
          <div className="bg-slate-50 dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("frameSize")}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wrist-calc-toggle"
                  checked={useWristCalc}
                  onChange={(e) => setUseWristCalc(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="wrist-calc-toggle" className="text-xs font-medium text-slate-500 dark:text-slate-400 cursor-pointer">
                  {t("calculateFrameSize")}
                </label>
              </div>
            </div>

            {useWristCalc ? (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                  {t("wristCircumference")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={wristVal}
                    onChange={(e) => setWristVal(e.target.value)}
                    placeholder="Measure wrist"
                    className="w-full pl-3 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none transition-shadow"
                  />
                  <span className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 text-xs font-bold">
                    {unit === "metric" ? "cm" : "in"}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Measure dominant wrist just above the wrist bone.
                </p>
              </div>
            ) : (
              <select
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none transition-shadow appearance-none"
              >
                <option value="none">{t("notSpecified")} ({t("medium")})</option>
                <option value="small">{t("small")}</option>
                <option value="medium">{t("medium")}</option>
                <option value="large">{t("large")}</option>
              </select>
            )}
          </div>

          {/* Validation Errors */}
          {!calculations.isValid && (
            <div className="text-xs text-red-600 font-bold p-3 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 rounded-xl">
              {!calculations.isWristValid ? t("errorWrist") : (parseFloat(heightCm) <= 0 || isNaN(parseFloat(heightCm))) ? t("errorHeight") : t("errorAge")}
            </div>
          )}

          {calculations.isValid && (
            <div className="flex gap-2">
              <button
                onClick={handleSaveToHistory}
                className={`flex-1 py-3 px-4 font-bold text-sm text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                  savedSuccess
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
                }`}
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle size={16} /> Saved!
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Save Profile Log
                  </>
                )}
              </button>
            </div>
          )}

          {/* HISTORY LOGS */}
          {history.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/10 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <History size={16} /> History Logs ({history.length})
                </h4>
                <button
                  onClick={handleClearHistory}
                  className="text-[10px] text-rose-600 hover:underline font-bold"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleRestore(item)}
                    className="p-3 bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800/80 rounded-xl cursor-pointer text-left transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                        {item.date}
                      </div>
                      <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300 mt-0.5">
                        {item.gender.toUpperCase()}, {item.age} yrs • {item.heightCm.toFixed(0)}cm
                      </div>
                      {item.weightKg && (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          Weight: {formatWeight(item.weightKg)} • BMI: {item.bmi?.toFixed(1)}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleDeleteHistory(item.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg"
                      title="Delete entry"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RESULTS & VISUAL DASHBOARD (RIGHT 7 COLUMNS) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {!calculations.isValid ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/10">
              <Scale size={64} className="mb-4 stroke-[1.5]" />
              <p className="font-extrabold text-slate-600 dark:text-slate-400 mb-2">{t("waiting")}</p>
              <p className="text-xs text-slate-400 max-w-sm">
                Provide height and age details to dynamically view healthy range spectrums, silhouette scans, and clinical formulas.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              
              {/* PRIMARY VISUAL CARDS: HEALTHY WEIGHT RANGE & TARGET */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* HEALTHY WEIGHT CARD */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/20 dark:bg-emerald-500/5 rounded-full -mr-8 -mt-8"></div>
                  <div>
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                      {t("healthyBmiRange")}
                    </span>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white mt-1 leading-tight tracking-tight">
                      {formatWeight(calculations.healthyWeightRange!.min)} - {formatWeight(calculations.healthyWeightRange!.max)}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-emerald-500 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full">
                      {calculations.computedFrame!.toUpperCase()} FRAME
                    </span>
                  </div>
                </div>

                {/* RECOMMENDED TARGET CARD */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/20 dark:bg-blue-500/5 rounded-full -mr-8 -mt-8"></div>
                  <div>
                    <span className="text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">
                      Recommended Ideal Weight
                    </span>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white mt-1 leading-tight tracking-tight">
                      {formatWeight(calculations.recommendedTarget!)}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-blue-500 dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Median Clinical IBW target
                    </span>
                  </div>
                </div>

              </div>

              {/* VISUAL DASHBOARD GRID (SILHOUETTE, GAUGE & COMP-BAR) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                
                {/* Silhouette Scanner (Left 4 cols) */}
                <div className="md:col-span-4 flex flex-col justify-center">
                  <BodySilhouette category={calculations.bmiCategory || "Normal weight"} />
                </div>

                {/* BMI Gauge & Category indicator (Right 8 cols) */}
                <div className="md:col-span-8 bg-slate-50/50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Body Proportions
                      </span>
                      {calculations.currentBmi && (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold shadow-sm
                          ${calculations.bmiColor === "emerald" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400" : ""}
                          ${calculations.bmiColor === "sky" ? "bg-sky-100 text-sky-850 dark:bg-sky-950/30 dark:text-sky-400" : ""}
                          ${calculations.bmiColor === "amber" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400" : ""}
                          ${calculations.bmiColor === "rose" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400" : ""}
                        `}>
                          {getTranslatedCategory(calculations.bmiCategory)}
                        </span>
                      )}
                    </div>

                    {calculations.currentBmi ? (
                      <div className="text-center py-2">
                        <div className="text-sm font-semibold text-slate-400 mb-0.5">Current BMI</div>
                        <div className="text-5xl font-black text-slate-800 dark:text-white tracking-tighter">
                          {calculations.currentBmi.toFixed(1)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-xs">
                        Enter current weight to display BMI details
                      </div>
                    )}
                  </div>

                  {/* BMI Gauge Meter */}
                  {calculations.currentBmi && (
                    <div className="w-full mt-4 relative">
                      <div className="flex h-3 w-full rounded-full overflow-hidden shadow-inner bg-slate-250 dark:bg-slate-855">
                        <div className="bg-sky-400 h-full" style={{ width: '17.5%' }} title="Underweight (<18.5)"></div>
                        <div className="bg-emerald-400 h-full" style={{ width: '32.5%' }} title="Normal (18.5-25)"></div>
                        <div className="bg-amber-400 h-full" style={{ width: '25%' }} title="Overweight (25-30)"></div>
                        <div className="bg-rose-500 h-full" style={{ width: '25%' }} title="Obese (>=30)"></div>
                      </div>
                      
                      {/* Gauge Pointer */}
                      <div 
                        className="absolute top-0 -mt-2.5 transition-all duration-700 ease-out"
                        style={{ left: `calc(${pointerPosition}% - 6px)` }}
                      >
                         <div className="w-3 h-3 bg-slate-850 dark:bg-slate-200 rounded-full border border-white dark:border-slate-900 shadow-md"></div>
                         <div className="w-0.5 h-3 bg-slate-850 dark:bg-slate-200 mx-auto"></div>
                      </div>
                      
                      <div className="flex justify-between text-[9px] font-bold text-slate-450 mt-1 px-1">
                        <span>15.0</span>
                        <span>18.5</span>
                        <span>25.0</span>
                        <span>30.0</span>
                        <span>35.0+</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* HORIZONTAL SCALE WEIGHT COMPARISON GRAPH */}
              {calculations.currentWeightKg && (
                <div className="bg-white dark:bg-slate-850/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Weight Alignment Chart
                  </h4>
                  
                  <div className="relative pt-8 pb-3">
                    {/* Visual bar range representing 15 to 35 BMI converted back to weights for user height */}
                    {(() => {
                      const hM = calculations.heightCm! / 100;
                      const getWeightByBmi = (b: number) => b * hM * hM * calculations.frameMultiplier!;
                      const w15 = getWeightByBmi(15);
                      const w35 = getWeightByBmi(35);
                      const range = w35 - w15;
                      
                      const getPct = (w: number) => {
                        return Math.max(0, Math.min(100, ((w - w15) / range) * 100));
                      };

                      const currentPct = getPct(calculations.currentWeightKg!);
                      const targetPct = getPct(calculations.recommendedTarget!);
                      const minHealthyPct = getPct(calculations.healthyWeightRange!.min);
                      const maxHealthyPct = getPct(calculations.healthyWeightRange!.max);

                      return (
                        <div className="relative">
                          {/* Main background bar */}
                          <div className="h-6 w-full rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex shadow-inner">
                            <div className="bg-slate-200/50 dark:bg-slate-700/30 h-full" style={{ width: `${minHealthyPct}%` }}></div>
                            <div className="bg-emerald-500/10 dark:bg-emerald-500/5 h-full" style={{ width: `${maxHealthyPct - minHealthyPct}%` }}></div>
                            <div className="bg-slate-200/50 dark:bg-slate-700/30 h-full flex-1"></div>
                          </div>

                          {/* Range Indicators */}
                          <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-emerald-500/50" style={{ left: `${minHealthyPct}%` }} title="Min Healthy Weight">
                            <span className="absolute -top-6 -translate-x-1/2 text-[9px] font-black text-emerald-600 dark:text-emerald-400 whitespace-nowrap bg-emerald-50 dark:bg-emerald-950/30 px-1 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/30">
                              Min: {formatWeight(calculations.healthyWeightRange!.min)}
                            </span>
                          </div>
                          
                          <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-emerald-500/50" style={{ left: `${maxHealthyPct}%` }} title="Max Healthy Weight">
                            <span className="absolute -top-6 -translate-x-1/2 text-[9px] font-black text-emerald-600 dark:text-emerald-400 whitespace-nowrap bg-emerald-50 dark:bg-emerald-950/30 px-1 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/30">
                              Max: {formatWeight(calculations.healthyWeightRange!.max)}
                            </span>
                          </div>

                          {/* Recommended Target Pin */}
                          <div className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: `${targetPct}%` }}>
                            <div className="w-1 h-full bg-blue-500 z-10"></div>
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full -mt-1 shadow z-20"></div>
                            <span className="absolute -bottom-6 -translate-x-1/2 text-[9px] font-black text-blue-600 dark:text-blue-400 whitespace-nowrap bg-blue-50 dark:bg-blue-950/30 px-1 py-0.5 rounded border border-blue-100 dark:border-blue-900/30 z-20">
                              Target: {formatWeight(calculations.recommendedTarget!)}
                            </span>
                          </div>

                          {/* Current Weight Pin */}
                          <div className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: `${currentPct}%` }}>
                            <div className="w-1 h-full bg-purple-600 z-15"></div>
                            <div className="w-3 h-3 bg-purple-600 border border-white dark:border-slate-800 rounded-full -mt-1.5 shadow-md z-30 animate-pulse"></div>
                            <span className="absolute -top-8 -translate-x-1/2 text-[10px] font-extrabold text-white whitespace-nowrap bg-purple-600 px-2 py-0.5 rounded-lg shadow-sm z-30">
                              You: {formatWeight(calculations.currentWeightKg!)}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* WEIGHT GOAL ANALYSIS & WEEKLY PLANNER */}
              {goalAnalysis && (
                <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-150 dark:border-slate-800/80 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <TrendingUp size={16} /> Target weight planner
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Goal analysis stats */}
                    <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
                      {goalAnalysis.direction === "lose" && (
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                          You are currently <span className="font-extrabold text-rose-600">{formatWeight(goalAnalysis.diffAbs)}</span> above your recommended ideal target weight.
                        </p>
                      )}
                      {goalAnalysis.direction === "gain" && (
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                          You are currently <span className="font-extrabold text-sky-600">{formatWeight(goalAnalysis.diffAbs)}</span> below your recommended ideal target weight.
                        </p>
                      )}
                      {goalAnalysis.direction === "maintain" && (
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                          Congratulations! You are perfectly aligned with your recommended clinical target weight. Focus on healthy maintenance.
                        </p>
                      )}
                    </div>

                    {/* Change rate setter */}
                    {goalAnalysis.direction !== "maintain" && (
                      <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          Weekly Weight Change Rate
                        </label>
                        <select
                          value={weeklyChangeRate}
                          onChange={(e) => setWeeklyChangeRate(Number(e.target.value))}
                          className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-bold dark:text-white outline-none"
                        >
                          <option value={0.25}>Slow & Steady (0.5 lbs / 0.25 kg)</option>
                          <option value={0.5}>Standard Healthy (1 lb / 0.5 kg)</option>
                          <option value={1.0}>Accelerated (2 lbs / 1.0 kg)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {goalAnalysis.direction !== "maintain" && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl text-xs flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-slate-400 font-bold uppercase text-[9px] mb-0.5">Estimated Duration</span>
                        <span className="text-base font-extrabold text-blue-800 dark:text-blue-400">
                          {goalAnalysis.weeksNeeded} Weeks
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-bold uppercase text-[9px] mb-0.5">Target Horizon Date</span>
                        <span className="text-base font-extrabold text-blue-800 dark:text-blue-400">
                          {goalAnalysis.targetDate}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CLINICAL WEIGHT FORMULAS BREAKDOWN */}
              <div className="bg-white dark:bg-slate-850/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  Medically Recognized Equations
                </h4>
                
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
                  {[
                    { name: "J.D. Robinson Formula (1983)", val: calculations.formulas!.robinson, desc: "Modified Devine logic; preferred clinical standard for median builds." },
                    { name: "D.R. Miller Formula (1983)", val: calculations.formulas!.miller, desc: "Broader regression slope; often matches athletic baselines." },
                    { name: "G.J. Hamwi Formula (1964)", val: calculations.formulas!.hamwi, desc: "Traditional medicine baseline; drug clearance index." },
                    { name: "B.J. Devine Formula (1974)", val: calculations.formulas!.devine, desc: "The original clinical benchmark, globally cited in medical software." },
                    { name: "WHO Ideal BMI Benchmark", val: calculations.formulas!.bmiIdeal, desc: "Average mathematical center (BMI 21.7) of the healthy spectrum." }
                  ].map((f, i) => (
                    <div key={i} className="flex justify-between items-center p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <div>
                        <span className="block text-xs font-extrabold text-slate-700 dark:text-slate-350">{f.name}</span>
                        <span className="block text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">{f.desc}</span>
                      </div>
                      <span className="font-extrabold text-slate-800 dark:text-white text-base font-mono whitespace-nowrap ml-4">
                        {formatWeight(f.val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP-BY-STEP CALCULATION BREAKDOWN */}
              <div className="bg-slate-50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Step-by-Step Explanation
                </h4>
                
                <div className="space-y-3.5 text-xs text-slate-650 dark:text-slate-405 leading-relaxed">
                  <div className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</span>
                    <p>
                      <strong>Biological Baseline:</strong> Your gender is set to <strong>{gender}</strong> and height is <strong>{calculations.heightCm!.toFixed(1)} cm</strong> ({Math.floor(calculations.heightInches! / 12)} ft {Math.round(calculations.heightInches! % 12)} in). Clinical equations are formulated based on height above 5 feet (60 inches), which is <strong>{(calculations.heightInches! - 60).toFixed(1)} inches</strong>.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</span>
                    <p>
                      <strong>Body Frame Adjustments:</strong> Based on your inputs, your frame is determined to be <strong>{calculations.computedFrame!.toUpperCase()}</strong> (multiplier: <strong>{calculations.frameMultiplier!.toFixed(2)}</strong>). Clinical ideal weight formulas are scaled by this multiplier to adjust for skeletal thickness and bone mass.
                    </p>
                  </div>

                  {calculations.currentBmi && (
                    <div className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</span>
                      <p>
                        <strong>BMI Calculations:</strong> Current body mass index is computed as:
                        <code className="block mt-1.5 p-2 bg-white dark:bg-slate-900 rounded font-mono text-center border border-slate-100 dark:border-slate-800">
                          {calculations.currentWeightKg!.toFixed(1)} kg / ({ (calculations.heightCm!/100).toFixed(2) } m)² = {calculations.currentBmi!.toFixed(1)}
                        </code>
                        This categorizes your current weight as <strong>{getTranslatedCategory(calculations.bmiCategory)}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION TOOLBAR: COPY & EXPORTS */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 print:hidden">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Share Report:</span>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => triggerCopy(getCopyText(), "copy-results")}
                    className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
                  >
                    {copiedResult === "copy-results" ? (
                      <>
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={exportAsTXT}
                    className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
                    title="Export as Text File"
                  >
                    <Download size={14} />
                    <span>TXT</span>
                  </button>

                  <button
                    onClick={exportAsCSV}
                    className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
                    title="Export as Spreadsheet CSV"
                  >
                    <Download size={14} />
                    <span>CSV</span>
                  </button>

                  <button
                    onClick={exportAsJSON}
                    className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
                    title="Export as JSON Data"
                  >
                    <Download size={14} />
                    <span>JSON</span>
                  </button>

                  <button
                    onClick={triggerPrintReport}
                    className="h-9 px-3 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm shadow-blue-500/10"
                    title="Print report"
                  >
                    <Printer size={14} />
                    <span>Print Report</span>
                  </button>
                </div>
              </div>

              {/* HEALTH RISKS & EDUCATION CORNER */}
              <div className="bg-white dark:bg-slate-850/15 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Info size={16} className="text-blue-500" /> Clinical & Wellness Insights
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Underweight Risks */}
                  <div className="p-4 bg-sky-50/40 dark:bg-sky-950/5 border border-sky-100/50 dark:border-sky-950/20 rounded-xl space-y-2">
                    <h5 className="font-extrabold text-sky-700 dark:text-sky-400">Risk Assessment: Underweight</h5>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Maintaining a weight below the healthy range can increase risks of nutritional deficiencies, compromised immune response, osteoporosis (bone density loss), and fatigue.
                    </p>
                  </div>

                  {/* Overweight Risks */}
                  <div className="p-4 bg-amber-50/40 dark:bg-amber-950/5 border border-amber-100/50 dark:border-amber-950/20 rounded-xl space-y-2">
                    <h5 className="font-extrabold text-amber-700 dark:text-amber-400">Risk Assessment: Overweight & Obesity</h5>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Carrying excess body fat is linked to elevated cardiovascular strain, high blood pressure, type 2 diabetes, joint wear, sleep apnea, and reduced metabolic flexibility.
                    </p>
                  </div>
                </div>

                {/* General Wellness Strategy */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs leading-relaxed space-y-2 text-slate-700 dark:text-slate-350">
                  <h5 className="font-bold text-slate-800 dark:text-white">Suggested Lifestyle Habits:</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Nutrition:</strong> Prioritize whole foods, lean proteins, high-fiber carbohydrates, and essential fatty acids. Avoid simple sugars and ultra-processed meals.</li>
                    <li><strong>Activity:</strong> Aim for a minimum of 150 minutes of moderate-intensity aerobic exercise weekly alongside 2+ strength/resistance sessions to build and protect lean mass.</li>
                    <li><strong>Longevity:</strong> Focus on sleep consistency (7-9 hours), stress management, and proper hydration rather than purely chasing a number on the scale.</li>
                  </ul>
                </div>

                <p className="text-[10px] text-slate-400 dark:text-slate-500 italic text-center">
                  Disclaimer: This tool calculates ideal estimations based on clinical guidelines. It is not a medical diagnostic tool or treatment plan. Always consult with a qualified health professional or doctor.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

function BodySilhouette({ category }: { category: string }) {
  // Determine color theme based on category
  let colorClass = "text-emerald-500 fill-emerald-500/10 stroke-emerald-500";
  let pulseColorClass = "bg-emerald-500/20";
  let label = "Normal";

  if (category === "Underweight") {
    colorClass = "text-sky-400 fill-sky-400/10 stroke-sky-400";
    pulseColorClass = "bg-sky-400/20";
    label = "Underweight";
  } else if (category === "Overweight") {
    colorClass = "text-amber-500 fill-amber-500/10 stroke-amber-500";
    pulseColorClass = "bg-amber-500/20";
    label = "Overweight";
  } else if (category === "Obesity") {
    colorClass = "text-rose-500 fill-rose-500/10 stroke-rose-500";
    pulseColorClass = "bg-rose-500/20";
    label = "Obese";
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-150 dark:border-slate-800/80 relative overflow-hidden shadow-inner h-full min-h-[280px]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanner-sweep {
          0% { top: 0%; opacity: 0.1; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0.1; }
        }
        .animate-scanner {
          animation: scanner-sweep 3s ease-in-out infinite;
        }
      `}} />

      {/* High-tech scanner laser sweep effect */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-40 dark:opacity-60 ${colorClass.split(' ')[0]}`}>
        <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent animate-scanner"></div>
      </div>
      
      <h4 className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3 z-10">Anatomical Scan</h4>
      
      <div className="relative w-32 h-56 flex items-center justify-center">
        {/* Glowing background behind silhouette */}
        <div className={`absolute w-24 h-44 rounded-full filter blur-xl opacity-20 dark:opacity-30 transition-all duration-700 ${pulseColorClass}`}></div>
        
        {/* SVG Unisex Anatomical Outline */}
        <svg
          viewBox="0 0 100 200"
          className={`w-full h-full transition-all duration-700 ${colorClass}`}
        >
          {/* Head */}
          <circle cx="50" cy="20" r="10" strokeWidth="2" />
          
          {/* Neck */}
          <path d="M 47 30 L 47 35 L 53 35 L 53 30 Z" strokeWidth="1.5" />
          
          {/* Body shape */}
          <path
            d="M50,35 C42,35 34,39 30,45 C28,48 27,52 27,56 C27,65 29,85 29,95 C29,100 32,100 32,95 C32,88 33,70 34,62 C35,66 36,95 38,125 C39,145 40,195 40,195 C40,198 44,198 44,195 L46,135 L48,135 L50,195 C50,198 54,198 54,195 C54,195 55,145 56,125 C58,95 59,66 60,62 C61,70 62,88 62,95 C62,100 65,100 65,95 C65,85 67,65 67,56 C67,52 66,48 64,45 C60,39 52,35 50,35 Z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Spine / Centerline indicator for clinical style */}
          <line x1="50" y1="35" x2="50" y2="145" strokeWidth="1" strokeDasharray="2,3" className="opacity-40" />
        </svg>
      </div>

      <div className="mt-2 text-center z-10">
        <span className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest block">Status</span>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-350">{label} Proportion</span>
      </div>
    </div>
  );
}
