"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type VariableMode = 
  | "solve_v2" 
  | "solve_t2" 
  | "solve_v1" 
  | "solve_t1";

interface CharlesPreset {
  id: string;
  name: string;
  desc: string;
  defaultV1L: number;
  defaultT1C: number;
  defaultV2L: number;
  defaultT2C: number;
}

const CHARLES_PRESETS: CharlesPreset[] = [
  {
    id: "hot_air_balloon",
    name: "Hot Air Balloon Thermal Heating",
    desc: "Constant Pressure (1 atm): V1 = 2800 L at 20°C ➔ T2 = 100°C, V2 = 3564 L",
    defaultV1L: 2800.0,
    defaultT1C: 20.0,
    defaultV2L: 3564.0,
    defaultT2C: 100.0
  },
  {
    id: "ball_in_freezer",
    name: "Inflatable Soccer Ball in Freezer",
    desc: "V1 = 2.50 L at 25°C (298.15 K) ➔ T2 = -15°C (258.15 K), V2 = 2.16 L",
    defaultV1L: 2.50,
    defaultT1C: 25.0,
    defaultV2L: 2.164,
    defaultT2C: -15.0
  },
  {
    id: "isobaric_piston",
    name: "Isobaric Piston Thermal Expansion",
    desc: "V1 = 1.0 L at 27°C (300.15 K) ➔ T2 = 327°C (600.15 K), V2 = 2.0 L",
    defaultV1L: 1.0,
    defaultT1C: 27.0,
    defaultV2L: 2.0,
    defaultT2C: 327.0
  },
  {
    id: "syringe_cooling",
    name: "Gas Syringe Thermal Cooling",
    desc: "V1 = 0.050 L (50 mL) at 80°C ➔ T2 = 20°C, V2 = 0.0415 L (41.5 mL)",
    defaultV1L: 0.050,
    defaultT1C: 80.0,
    defaultV2L: 0.0415,
    defaultT2C: 20.0
  }
];

export function CharlesLawCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [variableMode, setVariableMode] = useState<VariableMode>("solve_v2");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("hot_air_balloon");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputV1L, setInputV1L] = useState<number>(2800.0);
  const [inputT1C, setInputT1C] = useState<number>(20.0);
  const [inputV2L, setInputV2L] = useState<number>(3564.0);
  const [inputT2C, setInputT2C] = useState<number>(100.0);

  // Current Preset Loader
  const preset = useMemo(() => {
    return CHARLES_PRESETS.find(p => p.id === selectedPresetId) || CHARLES_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputV1L(preset.defaultV1L);
    setInputT1C(preset.defaultT1C);
    setInputV2L(preset.defaultV2L);
    setInputT2C(preset.defaultT2C);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"vt_chart" | "dashboard" | "flashcards" | "quiz">("vt_chart");

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

  // Main Charles's Law Engine: V1 / T1 = V2 / T2 (assuming P1 = P2, n1 = n2, T in Kelvin)
  const results = useMemo(() => {
    const t1K = inputT1C + 273.15;
    const t2K = inputT2C + 273.15;

    // 1. Solve V2 = (V1 * T2) / T1
    const calcV2L = (t1K > 0) ? (inputV1L * t2K) / t1K : 3564.0;

    // 2. Solve T2 (K) = (V2 * T1) / V1
    const calcT2K = (inputV1L > 0) ? (inputV2L * t1K) / inputV1L : 373.15;
    const calcT2C = calcT2K - 273.15;

    // 3. Solve V1 = (V2 * T1) / T2
    const calcV1L = (t2K > 0) ? (inputV2L * t1K) / t2K : 2800.0;

    // 4. Solve T1 (K) = (V1 * T2) / V2
    const calcT1K = (inputV2L > 0) ? (inputV1L * t2K) / inputV2L : 293.15;
    const calcT1C = calcT1K - 273.15;

    // Charles's Ratio k = V / T (L/K)
    const charlesRatioK = t1K > 0 ? inputV1L / t1K : 9.55;

    // Percentage Changes
    const deltaVPercent = ((inputV2L - inputV1L) / inputV1L) * 100;
    const deltaTPercent = ((t2K - t1K) / t1K) * 100;

    // Process Classification
    const isExpansion = inputT2C > inputT1C;
    const isContraction = inputT2C < inputT1C;
    const processTypeLabel = isExpansion ? "Thermal Expansion (T ↑ ➔ V ↑)" : isContraction ? "Thermal Contraction (T ↓ ➔ V ↓)" : "No Temperature Change";

    return {
      t1K,
      t2K,
      calcV2L,
      calcT2K,
      calcT2C,
      calcV1L,
      calcT1K,
      calcT1C,
      charlesRatioK,
      deltaVPercent,
      deltaTPercent,
      isExpansion,
      isContraction,
      processTypeLabel
    };
  }, [inputV1L, inputT1C, inputV2L, inputT2C]);

  // Recharts V-T Linear Plotter Data (V = k * T)
  const vtChartData = useMemo(() => {
    const data = [];
    const k = results.charlesRatioK > 0 ? results.charlesRatioK : 1.0;
    const minT = 100; // Kelvin
    const maxT = Math.max(results.t1K, results.t2K, 450);

    for (let t = minT; t <= maxT; t += 50) {
      const v = k * t;
      data.push({
        TempK: t,
        VolumeL: Number(v.toFixed(2))
      });
    }
    return data;
  }, [results.charlesRatioK, results.t1K, results.t2K]);

  // Flashcards Data
  const flashcards = [
    { title: "Charles's Law Formula", desc: "V1/T1 = V2/T2 under constant pressure P and moles n." },
    { title: "Direct Proportionality (V ∝ T in Kelvin)", desc: "Gas volume increases linearly with absolute Kelvin temperature. Doubling T(K) doubles volume." },
    { title: "Kelvin Temperature Requirement", desc: "T(K) = T(°C) + 273.15. Celsius or Fahrenheit temperatures must NEVER be used directly in V1/T1." },
    { title: "Extrapolation to Absolute Zero (0 K)", desc: "If an ideal gas could remain a gas to 0 K (-273.15°C), its volume would theoretically approach zero." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Charles's Law Analysis (${preset.name})
------------------------------------
Initial State 1: V1 = ${inputV1L.toFixed(2)} L | T1 = ${results.t1K.toFixed(2)} K (${inputT1C} °C)
Final State 2: V2 = ${results.calcV2L.toFixed(2)} L | T2 = ${results.t2K.toFixed(2)} K (${inputT2C} °C)
Charles's Ratio (k = V/T): ${results.charlesRatioK.toFixed(4)} L/K
Process Type: ${results.processTypeLabel}
Volume Change (ΔV): ${results.deltaVPercent.toFixed(1)}%
Temperature Change (ΔT): ${results.deltaTPercent.toFixed(1)}%`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Charles's law analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "According to Charles's Law (V1/T1 = V2/T2), if absolute temperature in Kelvin is DOUBLED, what happens to Volume?", correctAnswer: "DOUBLES" },
      { q: "Why must temperature be converted to KELVIN before using Charles's Law?", correctAnswer: "ABSOLUTE TEMPERATURE SCALE" },
      { q: "What gas parameter MUST remain constant for Charles's Law to apply?", correctAnswer: "PRESSURE" }
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
            Charles's Law Calculator
          </span>
          <Link href="/calculators/boyles-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Boyle's Law Calculator
          </Link>
          <Link href="/calculators/combined-gas-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Combined Gas Law Calculator
          </Link>
          <Link href="/calculators/ideal-gas-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ideal Gas Law Calculator
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
                <Gauge className="text-[#518231]" />
                Volume-Temperature Solver
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
                <option value="solve_v2">1. Calculate Final Volume (V2)</option>
                <option value="solve_t2">2. Calculate Final Temp (T2)</option>
                <option value="solve_v1">3. Calculate Initial Volume (V1)</option>
                <option value="solve_t1">4. Calculate Initial Temp (T1)</option>
              </select>
            </div>

            {/* Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Charles's Law Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {CHARLES_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dual Panel Inputs: State 1 & State 2 */}
            <div className="space-y-5">
              
              {/* State 1 Inputs */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">State 1 (Initial Conditions)</span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">V1 (Liters)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputV1L}
                      onChange={(e) => setInputV1L(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">T1 (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputT1C}
                      onChange={(e) => setInputT1C(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">T1 = {results.t1K.toFixed(2)} K</span>
                  </div>
                </div>
              </div>

              {/* State 2 Inputs */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">State 2 (Final Conditions)</span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">V2 (Liters)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputV2L}
                      onChange={(e) => setInputV2L(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">T2 (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputT2C}
                      onChange={(e) => setInputT2C(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">T2 = {results.t2K.toFixed(2)} K</span>
                  </div>
                </div>
              </div>

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Calculated Final Volume (V2)" 
                val={`${results.calcV2L.toFixed(2)} Liters`} 
                icon={Atom} 
              />
              <ReadOnlyField 
                label="Calculated Final Temperature (T2)" 
                val={`${results.t2K.toFixed(2)} K (${results.calcT2C.toFixed(1)} °C)`} 
                icon={Thermometer} 
              />

            </div>
          </div>

          {/* Integration Links to Combined Gas Law Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Does pressure also change?</span>
              <span className="text-[11px] text-slate-500">Try our companion Combined Gas Law Calculator</span>
            </div>
            <Link
              href="/calculators/combined-gas-law-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Combined Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Cockpit & V-T Linear Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Charles's Law Volume-Temperature Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg border bg-green-950 text-green-300 border-green-800">
                Constant Pressure (P1 = P2)
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Charles's Ratio (k)</span>
                <span className="text-xs font-black text-[#518231]">{results.charlesRatioK.toFixed(4)} L/K</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Volume Change</span>
                <span className="text-xs font-black text-amber-400">{results.deltaVPercent >= 0 ? "+" : ""}{results.deltaVPercent.toFixed(1)}%</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Temp Change</span>
                <span className="text-xs font-black text-cyan-400">{results.deltaTPercent >= 0 ? "+" : ""}{results.deltaTPercent.toFixed(1)}%</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Process Type</span>
                <span className="text-xs font-black text-white">{results.isExpansion ? "Expansion" : "Contraction"}</span>
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
                {(["vt_chart", "dashboard", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "vt_chart" ? "📊 V-T Chart" : tab === "dashboard" ? "⚡ Gas Summary" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Recharts Linear V-T Plotter */}
                {visualTab === "vt_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Charles's Law Linear Plot (Volume L vs Absolute Temperature K)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={vtChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="TempK" label={{ value: "Temperature (K)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Volume (L)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="VolumeL" stroke="#10b981" strokeWidth={2} dot={true} name="Volume (L)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 2: Gas State Summary */}
                {visualTab === "dashboard" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Charles's Law Summary ({results.processTypeLabel})
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Charles's Law: V1 / T1 = V2 / T2</span>
                        <span className="text-[11px] font-bold text-green-400">k = {results.charlesRatioK.toFixed(4)} L/K</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">State 1 Ratio (V1/T1)</span>
                          <span className="font-bold text-amber-400">{(inputV1L / results.t1K).toFixed(4)} L/K</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">State 2 Ratio (V2/T2)</span>
                          <span className="font-bold text-cyan-400">{(inputV2L / results.t2K).toFixed(4)} L/K</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Isobaric Check: <span className="font-bold text-white">V1/T1 = V2/T2 = {results.charlesRatioK.toFixed(4)} L/K</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Charles's Law Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-bold">Charles's Law Quiz</h4>
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
