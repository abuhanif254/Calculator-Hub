"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type VariableMode = "solve_c" | "solve_q" | "solve_m" | "solve_delta_t" | "solve_t_final" | "material_id";

interface MaterialRef {
  name: string;
  specHeatJgC: number;
  category: string;
}

const MATERIAL_DATABASE: MaterialRef[] = [
  { name: "Water (Liquid)", specHeatJgC: 4.184, category: "Liquids" },
  { name: "Ice (Solid)", specHeatJgC: 2.090, category: "Solids" },
  { name: "Steam (Gas)", specHeatJgC: 2.010, category: "Gases" },
  { name: "Ethanol", specHeatJgC: 2.440, category: "Liquids" },
  { name: "Aluminum", specHeatJgC: 0.897, category: "Metals" },
  { name: "Glass", specHeatJgC: 0.840, category: "Non-Metals" },
  { name: "Sand / Silica", specHeatJgC: 0.830, category: "Minerals" },
  { name: "Granite", specHeatJgC: 0.790, category: "Minerals" },
  { name: "Iron / Steel", specHeatJgC: 0.449, category: "Metals" },
  { name: "Copper", specHeatJgC: 0.385, category: "Metals" },
  { name: "Brass", specHeatJgC: 0.380, category: "Metals" },
  { name: "Silver", specHeatJgC: 0.235, category: "Metals" },
  { name: "Gold", specHeatJgC: 0.129, category: "Metals" },
  { name: "Lead", specHeatJgC: 0.128, category: "Metals" }
];

export function SpecificHeatCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [variableMode, setVariableMode] = useState<VariableMode>("solve_c");
  const [selectedMaterialName, setSelectedMaterialName] = useState<string>("Copper");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputHeatJoules, setInputHeatJoules] = useState<number>(3850.0); // 3.85 kJ
  const [inputMassG, setInputMassG] = useState<number>(100.0); // 100g
  const [inputSpecHeat, setInputSpecHeat] = useState<number>(0.385); // J/g·°C
  const [inputTempInitC, setInputTempInitC] = useState<number>(20.0);
  const [inputTempFinalC, setInputTempFinalC] = useState<number>(120.0);

  // Sync preset when material dropdown changes
  useEffect(() => {
    const found = MATERIAL_DATABASE.find(m => m.name.includes(selectedMaterialName));
    if (found) {
      setInputSpecHeat(found.specHeatJgC);
    }
  }, [selectedMaterialName]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"material_compare" | "heating_chart" | "flashcards" | "quiz">("material_compare");

  // Flashcards State
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{ q: string; correctAnswer: string } | null>(null);
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

  // Main Specific Heat Calculation Engine
  const results = useMemo(() => {
    const deltaTC = inputTempFinalC - inputTempInitC;

    // 1. Calculate Specific Heat c = q / (m * ΔT)
    const calcSpecHeat = (inputMassG > 0 && Math.abs(deltaTC) > 0) 
      ? inputHeatJoules / (inputMassG * deltaTC) 
      : 0.385;

    // 2. Calculate Heat q = m * c * ΔT
    const calcHeatJoules = inputMassG * inputSpecHeat * deltaTC;
    const calcHeatKj = calcHeatJoules / 1000;

    // 3. Calculate Mass m = q / (c * ΔT)
    const calcMassG = (inputSpecHeat > 0 && Math.abs(deltaTC) > 0) 
      ? inputHeatJoules / (inputSpecHeat * deltaTC) 
      : 100.0;

    // 4. Calculate Temperature Change ΔT = q / (m * c)
    const calcDeltaTC = (inputMassG > 0 && inputSpecHeat > 0) 
      ? inputHeatJoules / (inputMassG * inputSpecHeat) 
      : 100.0;

    // 5. Calculate Final Temperature T_f = T_i + q / (m * c)
    const calcTempFinalC = inputTempInitC + calcDeltaTC;

    // 6. Total Heat Capacity C = m * c
    const heatCapacityJc = inputMassG * inputSpecHeat;

    // 7. Find Closest Reference Material Match
    let closestMaterial = MATERIAL_DATABASE[0];
    let minDiff = Math.abs(calcSpecHeat - MATERIAL_DATABASE[0].specHeatJgC);

    MATERIAL_DATABASE.forEach(m => {
      const diff = Math.abs(calcSpecHeat - m.specHeatJgC);
      if (diff < minDiff) {
        minDiff = diff;
        closestMaterial = m;
      }
    });

    const percentErrorVsRef = closestMaterial.specHeatJgC > 0 
      ? (Math.abs(calcSpecHeat - closestMaterial.specHeatJgC) / closestMaterial.specHeatJgC) * 100 
      : 0;

    const isHeating = calcHeatJoules >= 0;
    const heatFlowLabel = isHeating 
      ? "Heat Absorbed (q > 0, Endothermic Heating)" 
      : "Heat Released (q < 0, Exothermic Cooling)";
    const heatFlowColor = isHeating ? "text-amber-500" : "text-[#518231]";

    return {
      deltaTC,
      calcSpecHeat,
      calcHeatJoules,
      calcHeatKj,
      calcMassG,
      calcDeltaTC,
      calcTempFinalC,
      heatCapacityJc,
      closestMaterial,
      percentErrorVsRef,
      isHeating,
      heatFlowLabel,
      heatFlowColor
    };
  }, [inputHeatJoules, inputMassG, inputSpecHeat, inputTempInitC, inputTempFinalC]);

  // Recharts Material Comparison Plotter Data
  const materialComparisonData = useMemo(() => {
    const testHeatJ = 5000; // 5 kJ added to 100g sample
    const testMassG = 100;

    return MATERIAL_DATABASE.slice(0, 7).map(m => {
      const deltaT = testHeatJ / (testMassG * m.specHeatJgC);
      return {
        Name: m.name.split(" ")[0],
        SpecHeat: m.specHeatJgC,
        TempIncreaseC: Number(deltaT.toFixed(1))
      };
    });
  }, []);

  // Flashcards Data
  const flashcards = [
    { title: "Specific Heat Capacity (c)", desc: "Heat required to raise 1 gram of substance by 1°C (J/g·°C). Water has a high c = 4.184 J/g·°C." },
    { title: "Heat Capacity (C = m * c)", desc: "Extensive heat capacity of an entire object or vessel (J/°C). Scales linearly with total mass m." },
    { title: "Temperature Change (ΔT = T_final - T_initial)", desc: "Directly proportional to heat added q and inversely proportional to specific heat capacity c." },
    { title: "Sign Convention (q = mcΔT)", desc: "q > 0 indicates heat absorbed (heating). q < 0 indicates heat released (cooling)." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Specific Heat Analysis (${selectedMaterialName})
------------------------------------
Mass (m): ${inputMassG} g
Specific Heat Capacity (c): ${results.calcSpecHeat.toFixed(3)} J/g·°C
Heat Transferred (q): ${results.calcHeatKj.toFixed(2)} kJ (${results.calcHeatJoules.toFixed(0)} J)
Temperature Change (ΔT): ${results.deltaTC.toFixed(2)} °C (T_init = ${inputTempInitC} °C, T_final = ${inputTempFinalC} °C)
Total Heat Capacity (C = mc): ${results.heatCapacityJc.toFixed(1)} J/°C
Closest Material Match: ${results.closestMaterial.name} (Ref c = ${results.closestMaterial.specHeatJgC} J/g·°C, ${results.percentErrorVsRef.toFixed(1)}% error)`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Specific heat analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "Why does Liquid Water (c = 4.184 J/g·°C) heat up MUCH SLOWER than Copper (c = 0.385 J/g·°C) for the same heat input?", correctAnswer: "HIGH SPECIFIC HEAT" },
      { q: "What is the relation between extensive Heat Capacity C and intensive Specific Heat c?", correctAnswer: "C = MC" },
      { q: "If heat q is RELEASED during cooling (T_final < T_initial), is q POSITIVE or NEGATIVE?", correctAnswer: "NEGATIVE" }
    ];

    const rand = questions[Math.floor(Math.random() * questions.length)];
    setQuizQuestion(rand);
    setQuizUserAnswer("");
    setQuizChecked(false);
  };

  const handleCheckQuiz = () => {
    if (!quizQuestion) return;
    const cleanUser = quizUserAnswer.trim().toUpperCase();
    const cleanCorrect = quizQuestion.correctAnswer.trim().toUpperCase();
    setQuizIsCorrect(cleanUser === cleanCorrect);
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
          Thermochemistry Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Specific Heat Calculator
          </span>
          <Link href="/calculators/calorimetry-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Calorimetry Calculator
          </Link>
          <Link href="/calculators/hess-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Hess's Law Calculator
          </Link>
          <Link href="/calculators/enthalpy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Enthalpy Calculator
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
                <Flame className="text-[#518231]" />
                Specific Heat Solvers
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

            {/* Variable Solver Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target Variable Solver</label>
              <select
                value={variableMode}
                onChange={(e) => setVariableMode(e.target.value as VariableMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="solve_c">1. Calculate Specific Heat Capacity (c = q / mΔT)</option>
                <option value="solve_q">2. Solve Heat Transferred (q = mcΔT)</option>
                <option value="solve_m">3. Solve Mass (m = q / cΔT)</option>
                <option value="solve_delta_t">4. Solve Temperature Change (ΔT = q / mc)</option>
                <option value="solve_t_final">5. Solve Final Temperature (T_f = T_i + q/mc)</option>
                <option value="material_id">6. Unknown Material Identifier</option>
              </select>
            </div>

            {/* Material Reference Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Material Reference Preset</label>
              <select
                value={selectedMaterialName}
                onChange={(e) => setSelectedMaterialName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {MATERIAL_DATABASE.map(m => (
                  <option key={m.name} value={m.name}>{m.name} ({m.specHeatJgC} J/g·°C)</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-4">
              
              {/* Heat Input q (Joules) */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Heat Transferred q (Joules)</label>
                <input
                  type="number"
                  step="10"
                  value={inputHeatJoules}
                  onChange={(e) => setInputHeatJoules(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              {/* Mass m (g) */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Sample Mass m (grams)</label>
                <input
                  type="number"
                  step="1"
                  value={inputMassG}
                  onChange={(e) => setInputMassG(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              {/* Specific Heat c (J/g·°C) */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Specific Heat Capacity c (J/g·°C)</label>
                <input
                  type="number"
                  step="0.001"
                  value={inputSpecHeat}
                  onChange={(e) => setInputSpecHeat(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              {/* Temperature Inputs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Initial Temp T_i (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputTempInitC}
                    onChange={(e) => setInputTempInitC(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Final Temp T_f (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputTempFinalC}
                    onChange={(e) => setInputTempFinalC(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                  />
                </div>
              </div>

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Calculated Specific Heat (c)" 
                val={`${results.calcSpecHeat.toFixed(3)} J/g·°C`} 
                icon={Flame} 
              />
              <ReadOnlyField 
                label="Calculated Heat Transferred (q)" 
                val={`${results.calcHeatKj.toFixed(2)} kJ (${results.calcHeatJoules.toFixed(0)} J)`} 
                icon={Thermometer} 
              />

            </div>
          </div>

          {/* Integration Links to Calorimetry Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need Coffee-Cup or Bomb Calorimetry?</span>
              <span className="text-[11px] text-slate-500">Try our companion Calorimetry Calculator</span>
            </div>
            <Link
              href="/calculators/calorimetry-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Calorimetry Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Cockpit & Material Comparison Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Specific Heat Material Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                results.isHeating 
                  ? "bg-amber-950 text-amber-300 border-amber-800" 
                  : "bg-green-950 text-green-300 border-green-800"
              }`}>
                {results.isHeating ? "Endothermic Heating" : "Exothermic Cooling"}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Specific Heat c</span>
                <span className="text-xs font-black text-[#518231]">{results.calcSpecHeat.toFixed(3)} J/g·°C</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Temp Change ΔT</span>
                <span className="text-xs font-black text-amber-400">{results.deltaTC.toFixed(2)} °C</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Heat Capacity C</span>
                <span className="text-xs font-black text-cyan-400">{results.heatCapacityJc.toFixed(1)} J/°C</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Material Match</span>
                <span className="text-xs font-black text-white">{results.closestMaterial.name}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800">
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
                {(["material_compare", "heating_chart", "flashcards", "quiz"] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setVisualTab(tab)}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                      visualTab === tab
                        ? "bg-white dark:bg-slate-900 text-[#518231]"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {tab === "material_compare" ? "⚡ Material Comparison" : tab === "heating_chart" ? "📊 Temp Rise Chart" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Material Comparison Engine */}
                {visualTab === "material_compare" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Material Specific Heat Database & Identification
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Calculated Specific Heat: {results.calcSpecHeat.toFixed(3)} J/g·°C</span>
                        <span className="text-[11px] font-bold text-green-400">Closest Match: {results.closestMaterial.name}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Reference Database Comparison</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {MATERIAL_DATABASE.slice(0, 6).map(m => (
                            <div key={m.name} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                              <div>
                                <span className="font-bold text-white block">{m.name}</span>
                                <span className="text-[10px] text-slate-400">{m.category}</span>
                              </div>
                              <span className="font-bold text-[#518231]">{m.specHeatJgC} J/g·°C</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Match Confidence: <span className="font-bold text-white">{results.percentErrorVsRef.toFixed(1)}% Error vs {results.closestMaterial.name} (Reference c = {results.closestMaterial.specHeatJgC} J/g·°C)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Recharts Temperature Rise Plotter */}
                {visualTab === "heating_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Temperature Rise Comparison (5 kJ Heat Added to 100g Sample)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={materialComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="Name" />
                          <YAxis label={{ value: "Temp Rise (°C)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="TempIncreaseC" stroke="#10b981" strokeWidth={2} dot={true} name="Temperature Increase (°C)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Specific Heat Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Specific Heat Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
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
                                <span>Correct! The answer is {quizQuestion.correctAnswer}.</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={16} className="text-red-600 shrink-0" />
                                <span>Incorrect. The correct answer is {quizQuestion.correctAnswer}. Try again!</span>
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
