"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

type CalculationMode = 
  | "general_dilution" 
  | "dilution_factor" 
  | "dilution_ratio" 
  | "find_final_concentration" 
  | "find_initial_concentration" 
  | "find_diluent_volume" 
  | "find_final_volume" 
  | "percentage_dilution" 
  | "mass_concentration_dilution" 
  | "volume_concentration_dilution" 
  | "serial_dilution" 
  | "multi_step_dilution" 
  | "cumulative_dilution" 
  | "stock_solution_dilution" 
  | "custom_dilution_planning";

type ConcentrationType = "molarity" | "mass_conc" | "percent_ww" | "percent_vv" | "percent_wv" | "ratio";

export function DilutionCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("general_dilution");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [concType, setConcType] = useState<ConcentrationType>("molarity");

  // Inputs
  const [c1InitialConc, setC1InitialConc] = useState<number>(100); // e.g. 100 mg/L or 10 M
  const [v1InitialVol, setV1InitialVol] = useState<number>(25); // 25 mL
  const [c2FinalConcInput, setC2FinalConcInput] = useState<number>(20); // 20 mg/L or 2 M
  const [v2FinalVolInput, setV2FinalVolInput] = useState<number>(100); // 100 mL
  const [vDiluentInput, setVDiluentInput] = useState<number>(75); // 75 mL

  // Dilution Ratio Input (1:X)
  const [dilutionRatioX, setDilutionRatioX] = useState<number>(10); // 1:10 ratio

  // Units
  const [concUnitStr, setConcUnitStr] = useState<string>("mg/L");
  const [volUnitStr, setVolUnitStr] = useState<string>("mL");

  // Serial Dilution Inputs
  const [serialStepsCount, setSerialStepsCount] = useState<number>(4);
  const [serialStepDF, setSerialStepDF] = useState<number>(10); // 1:10 each step

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"fluid" | "serial" | "flashcards" | "quiz">("fluid");

  // Flashcards State
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{ q: string; correctAnswer: number; units: string } | null>(null);
  const [quizUserAnswer, setQuizUserAnswer] = useState<string>("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  // Notification Banner
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
    generateQuiz();
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Main Calculations Engine
  const results = useMemo(() => {
    let computedC1 = c1InitialConc;
    let computedV1 = v1InitialVol;
    let computedC2 = c2FinalConcInput;
    let computedV2 = v2FinalVolInput;
    let computedVDiluent = vDiluentInput;

    if (calcMode === "general_dilution" || calcMode === "find_final_concentration") {
      computedV2 = v1InitialVol + vDiluentInput;
      computedC2 = computedV2 > 0 ? (c1InitialConc * v1InitialVol) / computedV2 : 0;
      computedVDiluent = Math.max(0, computedV2 - v1InitialVol);
    } else if (calcMode === "find_initial_concentration") {
      computedV2 = v2FinalVolInput;
      computedC2 = c2FinalConcInput;
      computedV1 = v1InitialVol;
      computedC1 = computedV1 > 0 ? (c2FinalConcInput * v2FinalVolInput) / computedV1 : 0;
      computedVDiluent = Math.max(0, computedV2 - computedV1);
    } else if (calcMode === "find_diluent_volume" || calcMode === "find_final_volume") {
      computedC1 = c1InitialConc;
      computedC2 = c2FinalConcInput;
      computedV1 = v1InitialVol;
      computedV2 = computedC2 > 0 ? (c1InitialConc * v1InitialVol) / computedC2 : 0;
      computedVDiluent = Math.max(0, computedV2 - v1InitialVol);
    } else if (calcMode === "dilution_ratio") {
      // 1:X ratio => DF = X, stock parts = 1, diluent parts = X - 1
      const df = dilutionRatioX;
      computedV1 = v2FinalVolInput / df;
      computedVDiluent = v2FinalVolInput - computedV1;
      computedC2 = c1InitialConc / df;
      computedV2 = v2FinalVolInput;
    }

    const dilutionFactor = computedV1 > 0 ? computedV2 / computedV1 : 1;
    const percentageRetained = computedC1 > 0 ? (computedC2 / computedC1) * 100 : 0;
    const percentageReduction = 100 - percentageRetained;

    // Serial Dilution Table Data
    const serialData = [];
    let currentConc = computedC1;
    for (let step = 1; step <= serialStepsCount; step++) {
      const stepConc = currentConc / serialStepDF;
      const stepCumulativeDF = Math.pow(serialStepDF, step);
      serialData.push({
        step,
        initialConc: currentConc,
        finalConc: stepConc,
        dilutionRatioStr: `1:${stepCumulativeDF}`,
        cumulativeDF: stepCumulativeDF,
        retainedPct: (stepConc / computedC1) * 100
      });
      currentConc = stepConc;
    }

    return {
      computedC1,
      computedV1,
      computedC2,
      computedV2,
      computedVDiluent,
      dilutionFactor,
      percentageRetained,
      percentageReduction,
      serialData
    };
  }, [calcMode, c1InitialConc, v1InitialVol, c2FinalConcInput, v2FinalVolInput, vDiluentInput, dilutionRatioX, serialStepsCount, serialStepDF]);

  // Flashcards Data
  const flashcards = [
    { title: "Universal Dilution Law", desc: "C₁V₁ = C₂V₂ applies to any compatible concentration unit (M, g/L, %, mg/L). Solute amount remains constant during dilution." },
    { title: "Dilution Factor (DF)", desc: "DF = V₂ / V₁ = C₁ / C₂. A 10-fold dilution (DF = 10) reduces concentration to 10% of its original value." },
    { title: "Dilution Ratio (1:X)", desc: "A 1:10 dilution ratio means 1 part stock solution combined with 9 parts diluent to make 10 total parts." },
    { title: "Solvent / Diluent Volume", desc: "Diluent Volume = Final Volume (V₂) - Initial Stock Volume (V₁). Add diluent until reaching total final volume V₂." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Universal Dilution Analysis Summary
-----------------------------------------
Selected Mode: ${calcMode.toUpperCase()}
Initial Concentration (C1): ${results.computedC1.toFixed(2)} ${concUnitStr}
Initial Stock Volume (V1): ${results.computedV1.toFixed(2)} ${volUnitStr}
Diluent Volume Added (Vdiluent): ${results.computedVDiluent.toFixed(2)} ${volUnitStr}
Final Solution Volume (V2): ${results.computedV2.toFixed(2)} ${volUnitStr}
Final Concentration (C2): ${results.computedC2.toFixed(2)} ${concUnitStr}
-----------------------------------------
Dilution Factor: ${results.dilutionFactor.toFixed(2)}x
Percentage Retained: ${results.percentageRetained.toFixed(2)}% (${results.percentageReduction.toFixed(2)}% Reduction)`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Universal dilution summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the Dilution Factor when 25 mL of 100 mg/L stock is diluted to a final volume of 100 mL?", correctAnswer: 4.0, units: "x" },
      { q: "How much diluent volume must be added to 20 mL of stock solution to reach a final volume of 100 mL?", correctAnswer: 80.0, units: "mL" },
      { q: "What is the final concentration if a 50 mg/L solution undergoes a 1:5 dilution ratio?", correctAnswer: 10.0, units: "mg/L" }
    ];

    const rand = questions[Math.floor(Math.random() * questions.length)];
    setQuizQuestion(rand);
    setQuizUserAnswer("");
    setQuizChecked(false);
  };

  const handleCheckQuiz = () => {
    if (!quizQuestion) return;
    const userVal = parseFloat(quizUserAnswer);
    const diff = Math.abs(userVal - quizQuestion.correctAnswer);
    setQuizIsCorrect(diff < 0.05);
    setQuizChecked(true);
  };

  return (
    <div className="w-full">
      {/* Notification Banner */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all duration-300 ${
          notification.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200" 
            : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
        }`}>
          <CheckCircle2 size={18} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* 🔄 Chemistry Hub Top Pill Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-1.5 shrink-0">
          <FlaskConical size={14} className="text-[#518231]" />
          Chemistry Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Universal Dilution
          </span>
          <Link href="/calculators/molarity-dilution-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity Dilution (C1V1)
          </Link>
          <Link href="/calculators/molarity-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity
          </Link>
          <Link href="/calculators/percent-composition-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Percent Composition
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Cockpit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowRightLeft className="text-[#518231]" />
                Universal Dilution Cockpit
              </h2>

              <button
                type="button"
                onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isAdvancedMode 
                    ? "bg-[#518231]/10 text-[#518231] border-[#518231]/30 dark:bg-[#518231]/20" 
                    : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                }`}
              >
                <Sliders size={13} />
                {isAdvancedMode ? "Advanced Mode" : "Simple Mode"}
              </button>
            </div>

            {/* Mode Select Dropdown */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculation Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="general_dilution">1. General Universal Dilution (C1V1 = C2V2)</option>
                <option value="dilution_factor">2. Dilution Factor Solver (DF = V2 / V1)</option>
                <option value="dilution_ratio">3. Dilution Ratio Solver (1:X Ratio)</option>
                <option value="find_final_concentration">4. Find Final Concentration (C2)</option>
                <option value="find_initial_concentration">5. Find Initial Concentration (C1)</option>
                <option value="find_diluent_volume">6. Find Diluent Volume (Vdiluent = V2 - V1)</option>
                <option value="find_final_volume">7. Find Final Volume (V2)</option>
                <option value="percentage_dilution">8. Percentage Concentration Dilution (% w/w, % v/v)</option>
                <option value="mass_concentration_dilution">9. Mass Concentration Dilution (g/L, mg/L)</option>
                <option value="serial_dilution">10. Multi-step Serial Stepwise Dilution</option>
              </select>
            </div>

            {/* Dynamic Input Controls */}
            <div className="space-y-5">
              
              {/* Primary Output Field */}
              <ReadOnlyField 
                label="Calculated Final Concentration (C2)" 
                val={`${results.computedC2.toFixed(2)} ${concUnitStr}`} 
                icon={Droplet} 
              />

              {/* Initial Concentration Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Initial Concentration (C₁)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="1"
                      value={c1InitialConc}
                      onChange={(e) => setC1InitialConc(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <input
                      type="text"
                      value={concUnitStr}
                      onChange={(e) => setConcUnitStr(e.target.value)}
                      className="w-16 bg-slate-50 dark:bg-slate-950 text-center p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Initial Stock Volume Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Initial Stock Volume (V₁)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="1"
                      value={v1InitialVol}
                      onChange={(e) => setV1InitialVol(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <input
                      type="text"
                      value={volUnitStr}
                      onChange={(e) => setVolUnitStr(e.target.value)}
                      className="w-16 bg-slate-50 dark:bg-slate-950 text-center p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Diluent Volume Added Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Diluent Volume Added (V_{`diluent`})</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="1"
                      value={vDiluentInput}
                      onChange={(e) => setVDiluentInput(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">{volUnitStr}</span>
                  </div>
                </div>
              </div>

              {/* Dilution Ratio Input (1:X) */}
              {calcMode === "dilution_ratio" && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Dilution Ratio (1:X)</span>
                    <input
                      type="number"
                      step="1"
                      value={dilutionRatioX}
                      onChange={(e) => setDilutionRatioX(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Links to Molarity Dilution Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need molarity-specific C1V1 calculations?</span>
              <span className="text-[11px] text-slate-500">Try our dedicated Molarity Dilution Calculator</span>
            </div>
            <Link
              href="/calculators/molarity-dilution-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Molarity C1V1
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Universal Interactive Solution & Diluent Visualizer Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Universal Solution Fluid Visualizer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                💧 Universal Solution & Diluent Visualizer
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                {results.dilutionFactor.toFixed(1)}x Dilution Factor
              </span>
            </div>

            {/* SVG Visual Solution Containers */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-around gap-6 relative mb-4">
              
              {/* Container 1: Initial Solution */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 mb-2">Initial Stock Solution</span>
                
                <div className="w-24 h-36 border-2 border-t-0 border-slate-600 rounded-b-2xl relative overflow-hidden bg-slate-900/50 flex items-end">
                  <div 
                    className="w-full bg-[#518231]/40 border-t-2 border-[#518231] transition-all duration-500 relative flex items-center justify-center"
                    style={{ height: `${Math.min(90, Math.max(20, (results.computedV1 / (results.computedV2 || 1)) * 90))}%` }}
                  >
                    <div className="grid grid-cols-2 gap-1.5 p-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-black text-white mt-3">C₁ = {results.computedC1.toFixed(1)} {concUnitStr}</span>
                <span className="text-[10px] font-bold text-slate-400">V₁ = {results.computedV1.toFixed(1)} {volUnitStr}</span>
              </div>

              {/* Diluent Addition Transfer Arrow */}
              <div className="flex flex-col items-center justify-center my-auto">
                <Droplet size={24} className="text-[#518231] animate-bounce mb-1" />
                <ArrowRight size={20} className="text-slate-500 hidden md:block" />
                <span className="text-[10px] font-bold text-slate-300 text-center mt-1">
                  Add {results.computedVDiluent.toFixed(1)} {volUnitStr} Diluent
                </span>
                <span className="text-[9px] font-bold text-[#518231]">Total V₂ = {results.computedV2.toFixed(1)} {volUnitStr}</span>
              </div>

              {/* Container 2: Final Solution */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 mb-2">Final Diluted Solution</span>
                
                <div className="w-24 h-36 border-2 border-t-0 border-slate-600 rounded-b-2xl relative overflow-hidden bg-slate-900/50 flex items-end">
                  <div 
                    className="w-full bg-[#518231]/20 border-t-2 border-[#518231] transition-all duration-500 relative flex items-center justify-center"
                    style={{ height: "90%" }}
                  >
                    <div className="w-full h-full flex flex-col justify-around items-center p-2">
                      <div className="flex justify-between w-full">
                        <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80"></span>
                      </div>
                      <div className="flex justify-between w-full">
                        <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-black text-[#518231] mt-3">C₂ = {results.computedC2.toFixed(1)} {concUnitStr}</span>
                <span className="text-[10px] font-bold text-slate-400">V₂ = {results.computedV2.toFixed(1)} {volUnitStr}</span>
              </div>

            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Diluent Volume</span>
                <span className="text-xs font-black text-white">{results.computedVDiluent.toFixed(1)} {volUnitStr}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Concentration Retained</span>
                <span className="text-xs font-black text-[#518231]">{results.percentageRetained.toFixed(1)}%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Concentration Reduction</span>
                <span className="text-xs font-black text-amber-400">{results.percentageReduction.toFixed(1)}%</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Copy size={13} />
                Copy Summary
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center justify-center gap-1.5 bg-[#518231] hover:bg-[#436a28] text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-[#436a28]"
              >
                <Printer size={13} />
                Print PDF
              </button>
            </div>
          </div>

          {/* Advanced Mode Tabbed Panel */}
          {isAdvancedMode && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
              
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
                {(["fluid", "serial", "flashcards", "quiz"] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setVisualTab(tab)}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                      visualTab === tab
                        ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {tab === "fluid" ? "💧 Fluid Overview" : tab === "serial" ? "🧪 Serial Dilution" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "fluid" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">💧 Universal Solution Dilution Principles</h4>
                    <p className="leading-relaxed">
                      Dilution lowers concentration by increasing total solution volume. The required diluent volume is given by V_{`diluent`} = V₂ - V₁.
                    </p>
                  </div>
                )}

                {/* Tab 2: Serial Stepwise Dilution */}
                {visualTab === "serial" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Multi-step Serial Dilution Table (1:{serialStepDF} Step DF)</h4>
                    <div className="space-y-1.5">
                      {results.serialData.map((item) => (
                        <div key={item.step} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-slate-300">
                          <span>Step #{item.step} (Cumulative {item.dilutionRatioStr}):</span>
                          <span className="font-bold text-[#518231]">{item.finalConc.toExponential(3)} {concUnitStr} ({item.retainedPct.toFixed(2)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Universal Dilution Study Flashcards</h4>
                    <div 
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center cursor-pointer transition-all duration-300 min-h-32 flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] font-bold text-[#518231] uppercase tracking-wider block mb-1">
                        {isFlipped ? "Definition (Click to Flip)" : "Concept (Click to Flip)"}
                      </span>
                      <p className="text-sm font-bold text-white leading-relaxed">
                        {isFlipped ? flashcards[flashcardIndex].desc : flashcards[flashcardIndex].title}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <button
                        type="button"
                        onClick={() => { setIsFlipped(false); setFlashcardIndex((flashcardIndex - 1 + flashcards.length) % flashcards.length); }}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold"
                      >
                        Previous
                      </button>
                      <span className="text-slate-400 font-semibold">{flashcardIndex + 1} of {flashcards.length}</span>
                      <button
                        type="button"
                        onClick={() => { setIsFlipped(false); setFlashcardIndex((flashcardIndex + 1) % flashcards.length); }}
                        className="px-3 py-1.5 bg-[#518231] text-white rounded-xl font-bold"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 4: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Universal Dilution Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.01"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer"
                            className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleCheckQuiz}
                            className="bg-[#518231] hover:bg-[#436a28] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                          >
                            Submit
                          </button>
                        </div>

                        {quizChecked && (
                          <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                            quizIsCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
                          }`}>
                            {quizIsCorrect ? (
                              <>
                                <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                                <span>Correct! The answer is {quizQuestion.correctAnswer} {quizQuestion.units}.</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={16} className="text-red-600 shrink-0" />
                                <span>Incorrect. The correct answer is {quizQuestion.correctAnswer} {quizQuestion.units}. Try again!</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={generateQuiz}
                      className="flex items-center gap-1 text-xs font-bold text-[#518231] hover:underline"
                    >
                      Next Question
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Sub-component Helper
interface ReadOnlyFieldProps {
  label: string;
  val: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

function ReadOnlyField({ label, val, icon: IconComp }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <div className="w-full flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-inner">
        <span className="text-sm font-black text-slate-900 dark:text-slate-100">{val}</span>
        <IconComp size={16} className="text-[#518231]" />
      </div>
    </div>
  );
}
