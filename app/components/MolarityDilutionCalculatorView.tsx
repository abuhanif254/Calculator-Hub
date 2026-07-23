"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

type CalculationMode = 
  | "find_final_concentration" 
  | "find_stock_volume" 
  | "find_final_volume" 
  | "find_stock_concentration" 
  | "find_target_concentration" 
  | "find_solvent_volume" 
  | "dilution_factor" 
  | "serial_dilution" 
  | "stock_solution_prep" 
  | "concentration_unit_conversion" 
  | "mass_based_dilution" 
  | "moles_molarity_volume" 
  | "interactive_dilution_simulator";

export function MolarityDilutionCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("find_final_concentration");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // M1 V1 = M2 V2 Input States
  const [m1StockConc, setM1StockConc] = useState<number>(1.5); // M1 = 1.5 mol/L
  const [v1StockVol, setV1StockVol] = useState<number>(2.0); // V1 = 2.0 L
  const [vWaterAdded, setVWaterAdded] = useState<number>(3.0); // Vwater = 3.0 L -> V2 = 5.0 L
  const [m2TargetConcInput, setM2TargetConcInput] = useState<number>(0.6); // M2 = 0.6 mol/L
  const [v2FinalVolInput, setV2FinalVolInput] = useState<number>(5.0); // V2 = 5.0 L

  // Units
  const [concUnit, setConcUnit] = useState<"M" | "mM" | "uM">("M");
  const [volUnit, setVolUnit] = useState<"L" | "mL" | "uL">("L");

  // Serial Dilution Inputs
  const [serialStepsCount, setSerialStepsCount] = useState<number>(4);
  const [serialDilutionFactor, setSerialDilutionFactor] = useState<number>(10); // 1:10
  const [serialTransferVol, setSerialTransferVol] = useState<number>(1.0); // 1 mL

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"beaker" | "serial" | "flashcards" | "quiz">("beaker");

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
    let computedM1 = m1StockConc;
    let computedV1 = v1StockVol;
    let computedVWater = vWaterAdded;
    let computedV2 = v1StockVol + vWaterAdded;
    let computedM2 = m1StockConc > 0 && computedV2 > 0 ? (m1StockConc * v1StockVol) / computedV2 : 0;

    if (calcMode === "find_final_concentration" || calcMode === "interactive_dilution_simulator") {
      computedV2 = v1StockVol + vWaterAdded;
      computedM2 = computedV2 > 0 ? (m1StockConc * v1StockVol) / computedV2 : 0;
    } else if (calcMode === "find_stock_volume") {
      computedM2 = m2TargetConcInput;
      computedV2 = v2FinalVolInput;
      computedV1 = m1StockConc > 0 ? (m2TargetConcInput * v2FinalVolInput) / m1StockConc : 0;
      computedVWater = Math.max(0, computedV2 - computedV1);
    } else if (calcMode === "find_final_volume") {
      computedM2 = m2TargetConcInput;
      computedV2 = computedM2 > 0 ? (m1StockConc * v1StockVol) / computedM2 : 0;
      computedVWater = Math.max(0, computedV2 - v1StockVol);
    } else if (calcMode === "find_stock_concentration") {
      computedV2 = v2FinalVolInput;
      computedM2 = m2TargetConcInput;
      computedV1 = v1StockVol;
      computedM1 = computedV1 > 0 ? (m2TargetConcInput * v2FinalVolInput) / computedV1 : 0;
      computedVWater = Math.max(0, computedV2 - computedV1);
    }

    const dilutionFactor = computedV1 > 0 ? computedV2 / computedV1 : 1;
    const retainedPercentage = computedM1 > 0 ? (computedM2 / computedM1) * 100 : 0;
    const soluteMoles = computedM1 * computedV1;

    // Serial Dilution Table Data
    const serialData = [];
    let currentConc = m1StockConc;
    for (let step = 1; step <= serialStepsCount; step++) {
      const stepConc = currentConc / serialDilutionFactor;
      serialData.push({
        step,
        initialConc: currentConc,
        finalConc: stepConc,
        dilutionFactorStr: `1:${Math.pow(serialDilutionFactor, step)}`,
        retainedPct: (stepConc / m1StockConc) * 100
      });
      currentConc = stepConc;
    }

    return {
      computedM1,
      computedV1,
      computedVWater,
      computedV2,
      computedM2,
      dilutionFactor,
      retainedPercentage,
      soluteMoles,
      serialData
    };
  }, [calcMode, m1StockConc, v1StockVol, vWaterAdded, m2TargetConcInput, v2FinalVolInput, serialStepsCount, serialDilutionFactor]);

  // Flashcards Data
  const flashcards = [
    { title: "Dilution Law (C₁V₁ = C₂V₂)", desc: "In a simple dilution, solute amount is conserved: Moles = C₁ × V₁ = C₂ × V₂. Concentration decreases as solvent is added." },
    { title: "Solvent Volume to Add", desc: "Solvent Volume = Final Solution Volume (V₂) - Stock Volume (V₁). Add solvent until total volume reaches V₂!" },
    { title: "Dilution Factor (DF)", desc: "Dilution Factor = V₂ / V₁ = C₁ / C₂. A 5-fold dilution (DF = 5) means the final concentration is 1/5th of original." },
    { title: "Serial Dilution", desc: "A sequence of stepwise dilutions performed to reduce concentration systematically (e.g. 1:10 → 1:100 → 1:1000)." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Molarity Dilution Analysis Summary (M1 V1 = M2 V2)
-----------------------------------------
Stock Concentration (M1): ${results.computedM1.toFixed(3)} ${concUnit}
Required Stock Volume (V1): ${results.computedV1.toFixed(3)} ${volUnit}
Solvent Volume to Add (Vwater): ${results.computedVWater.toFixed(3)} ${volUnit}
Final Total Volume (V2): ${results.computedV2.toFixed(3)} ${volUnit}
Final Concentration (M2): ${results.computedM2.toFixed(3)} ${concUnit}
-----------------------------------------
Dilution Factor: ${results.dilutionFactor.toFixed(2)}x (${results.retainedPercentage.toFixed(2)}% Retained)
Solute Moles: ${results.soluteMoles.toFixed(4)} moles (Conserved)`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Dilution analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "If 2.0 L of 1.5 M stock solution is diluted by adding 3.0 L of water (Final V2 = 5.0 L), what is the final concentration (M2)?", correctAnswer: 0.60, units: "M" },
      { q: "What volume of 2.0 M stock solution is needed to prepare 100 mL of 0.5 M solution?", correctAnswer: 25.0, units: "mL" },
      { q: "What is the Dilution Factor when 25 mL of stock is diluted to a total volume of 100 mL?", correctAnswer: 4.0, units: "x" }
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
            Dilution Solver
          </span>
          <Link href="/calculators/molarity-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity
          </Link>
          <Link href="/calculators/molality-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molality
          </Link>
          <Link href="/calculators/mole-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Mole Solver
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
                <Beaker className="text-[#518231]" />
                Dilution Lab Cockpit
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
                <option value="find_final_concentration">1. Find Final Concentration (M2 = M1 V1 / V2)</option>
                <option value="find_stock_volume">2. Find Stock Volume (V1 = M2 V2 / M1)</option>
                <option value="find_final_volume">3. Find Final Volume (V2 = M1 V1 / M2)</option>
                <option value="find_stock_concentration">4. Find Stock Concentration (M1)</option>
                <option value="find_solvent_volume">5. Find Solvent Volume to Add (Vwater = V2 - V1)</option>
                <option value="dilution_factor">6. Dilution Factor Solver (DF = V2 / V1)</option>
                <option value="serial_dilution">7. Multi-step Serial Dilution Solver</option>
                <option value="interactive_dilution_simulator">8. Interactive M1 V1 = M2 V2 Beaker Simulator</option>
              </select>
            </div>

            {/* Dynamic Slider / Input Controls */}
            <div className="space-y-5">
              
              {/* Primary Calculated Output */}
              <ReadOnlyField 
                label="Calculated Final Concentration (M2)" 
                val={`${results.computedM2.toFixed(3)} ${concUnit}`} 
                icon={Droplet} 
              />

              {/* M1 Stock Concentration Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Stock Concentration (M₁)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={m1StockConc}
                      onChange={(e) => setM1StockConc(Number(e.target.value))}
                      className="w-20 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">{concUnit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10.0"
                  step="0.1"
                  value={m1StockConc}
                  onChange={(e) => setM1StockConc(Number(e.target.value))}
                  className="w-full accent-[#518231]"
                />
              </div>

              {/* V1 Stock Volume Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Stock Volume (V₁)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={v1StockVol}
                      onChange={(e) => setV1StockVol(Number(e.target.value))}
                      className="w-20 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">{volUnit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10.0"
                  step="0.1"
                  value={v1StockVol}
                  onChange={(e) => setV1StockVol(Number(e.target.value))}
                  className="w-full accent-[#518231]"
                />
              </div>

              {/* Vwater Added Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Water Added (V_{`water`})</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={vWaterAdded}
                      onChange={(e) => setVWaterAdded(Number(e.target.value))}
                      className="w-20 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">{volUnit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10.0"
                  step="0.1"
                  value={vWaterAdded}
                  onChange={(e) => setVWaterAdded(Number(e.target.value))}
                  className="w-full accent-[#518231]"
                />
              </div>

            </div>
          </div>

          {/* Integration Links to Molarity Tools */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Preparing stock solutions from solid?</span>
              <span className="text-[11px] text-slate-500">Explore Molarity (mol/L) and Molality (mol/kg) tools</span>
            </div>
            <Link
              href="/calculators/molarity-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Molarity
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive M1 V1 = M2 V2 Particle & Beaker Visualizer Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Animated Liquid Beaker Particle Visualizer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 M₁V₁ = M₂V₂ Solution Dilution Visualizer
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                {results.dilutionFactor.toFixed(1)}x Dilution
              </span>
            </div>

            {/* Main SVG Animated Beakers Simulator (Initial vs Final) */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-around gap-6 relative mb-4">
              
              {/* Formula Formula Header */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-center">
                <span className="text-sm font-black italic text-white tracking-widest">M₁V₁ = M₂V₂</span>
                <span className="text-[10px] font-bold text-[#518231] block">
                  M₂ = {results.computedM1} × ({results.computedV1} / {results.computedV2.toFixed(1)}) = {results.computedM2.toFixed(2)} {concUnit}
                </span>
              </div>

              {/* Initial Beaker */}
              <div className="flex flex-col items-center pt-8">
                <span className="text-xs font-bold text-slate-400 mb-2">Initial Solution</span>
                
                {/* SVG Container Beaker 1 */}
                <div className="w-24 h-40 border-2 border-t-0 border-slate-600 rounded-b-2xl relative overflow-hidden bg-slate-900/50 flex items-end">
                  {/* Liquid Fill 1 */}
                  <div 
                    className="w-full bg-[#518231]/40 border-t-2 border-[#518231] transition-all duration-500 relative flex items-center justify-center"
                    style={{ height: `${Math.min(90, Math.max(20, (results.computedV1 / 10) * 100))}%` }}
                  >
                    {/* Solute Particle Dots (5 dots) */}
                    <div className="grid grid-cols-3 gap-1 p-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-black text-white mt-3">M₁ = {results.computedM1} {concUnit}</span>
                <span className="text-[10px] font-bold text-slate-400">V₁ = {results.computedV1} {volUnit}</span>
              </div>

              {/* Water Transfer Arrow */}
              <div className="flex flex-col items-center justify-center my-auto">
                <Droplet size={24} className="text-[#518231] animate-bounce mb-1" />
                <ArrowRight size={20} className="text-slate-500 hidden md:block" />
                <span className="text-[10px] font-bold text-slate-300 text-center mt-1">
                  Add water to {results.computedV2.toFixed(1)} {volUnit}
                </span>
                <span className="text-[9px] font-bold text-[#518231]">+ {results.computedVWater.toFixed(1)} {volUnit} Solvent</span>
              </div>

              {/* Final Beaker */}
              <div className="flex flex-col items-center pt-8">
                <span className="text-xs font-bold text-slate-400 mb-2">Final Diluted Solution</span>
                
                {/* SVG Container Beaker 2 */}
                <div className="w-24 h-40 border-2 border-t-0 border-slate-600 rounded-b-2xl relative overflow-hidden bg-slate-900/50 flex items-end">
                  {/* Liquid Fill 2 */}
                  <div 
                    className="w-full bg-[#518231]/25 border-t-2 border-[#518231] transition-all duration-500 relative flex items-center justify-center"
                    style={{ height: `${Math.min(90, Math.max(20, (results.computedV2 / 10) * 100))}%` }}
                  >
                    {/* SAME 5 Solute Particles Spread Out! */}
                    <div className="w-full h-full flex flex-col justify-around items-center p-2">
                      <div className="flex justify-between w-full">
                        <span className="w-2 h-2 rounded-full bg-white opacity-90"></span>
                        <span className="w-2 h-2 rounded-full bg-white opacity-90"></span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-white opacity-90"></span>
                      <div className="flex justify-between w-full">
                        <span className="w-2 h-2 rounded-full bg-white opacity-90"></span>
                        <span className="w-2 h-2 rounded-full bg-white opacity-90"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-black text-[#518231] mt-3">M₂ = {results.computedM2.toFixed(2)} {concUnit}</span>
                <span className="text-[10px] font-bold text-slate-400">V₂ = {results.computedV2.toFixed(1)} {volUnit}</span>
              </div>

            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Stock Volume</span>
                <span className="text-xs font-black text-white">{results.computedV1.toFixed(2)} {volUnit}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Solvent Added</span>
                <span className="text-xs font-black text-[#518231]">{results.computedVWater.toFixed(2)} {volUnit}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Final Conc (M₂)</span>
                <span className="text-xs font-black text-amber-400">{results.computedM2.toFixed(2)} {concUnit}</span>
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
                {(["beaker", "serial", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "beaker" ? "🧪 Overview" : tab === "serial" ? "🧪 Serial Dilution" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "beaker" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🧪 Solute Conservation in Dilution</h4>
                    <p className="leading-relaxed">
                      Adding pure solvent to a stock solution increases total liquid volume while keeping the total amount of solute moles constant ($n = C_1 V_1 = C_2 V_2$).
                    </p>
                  </div>
                )}

                {/* Tab 2: Serial Dilution Solver */}
                {visualTab === "serial" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Multi-step Serial Dilution Table (1:{serialDilutionFactor} Steps)</h4>
                    <div className="space-y-1.5">
                      {results.serialData.map((item) => (
                        <div key={item.step} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-slate-300">
                          <span>Tube #{item.step} ({item.dilutionFactorStr}):</span>
                          <span className="font-bold text-[#518231]">{item.finalConc.toExponential(3)} {concUnit} ({item.retainedPct.toFixed(2)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molarity Dilution Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molarity Dilution Quiz</h4>
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
