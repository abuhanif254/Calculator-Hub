"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type VariableMode = 
  | "solve_p2" 
  | "solve_v2" 
  | "solve_p1" 
  | "solve_v1";

interface BoylesPreset {
  id: string;
  name: string;
  desc: string;
  defaultP1Atm: number;
  defaultV1L: number;
  defaultP2Atm: number;
  defaultV2L: number;
}

const BOYLES_PRESETS: BoylesPreset[] = [
  {
    id: "syringe_compression",
    name: "Isothermal Gas Syringe Compression",
    desc: "Constant Temp (25°C): P1 = 1.0 atm, V1 = 0.06 L (60 mL) ➔ V2 = 0.02 L (20 mL), P2 = 3.0 atm",
    defaultP1Atm: 1.0,
    defaultV1L: 0.06,
    defaultP2Atm: 3.0,
    defaultV2L: 0.02
  },
  {
    id: "scuba_diving",
    name: "Scuba Diving Ascent (20m Depth to Surface)",
    desc: "Constant Temp: P1 = 3.0 atm (at 20m), V1 = 2.0 L ➔ P2 = 1.0 atm (surface), V2 = 6.0 L",
    defaultP1Atm: 3.0,
    defaultV1L: 2.0,
    defaultP2Atm: 1.0,
    defaultV2L: 6.0
  },
  {
    id: "bicycle_pump",
    name: "Bicycle Tire Pump Compression",
    desc: "P1 = 1.0 atm, V1 = 0.50 L ➔ V2 = 0.10 L, P2 = 5.0 atm",
    defaultP1Atm: 1.0,
    defaultV1L: 0.50,
    defaultP2Atm: 5.0,
    defaultV2L: 0.10
  },
  {
    id: "weather_balloon",
    name: "Weather Balloon High-Altitude Ascent",
    desc: "P1 = 1.0 atm, V1 = 10.0 L ➔ P2 = 0.25 atm, V2 = 40.0 L",
    defaultP1Atm: 1.0,
    defaultV1L: 10.0,
    defaultP2Atm: 0.25,
    defaultV2L: 40.0
  }
];

export function BoylesLawCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [variableMode, setVariableMode] = useState<VariableMode>("solve_p2");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("syringe_compression");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputP1Atm, setInputP1Atm] = useState<number>(1.0);
  const [inputV1L, setInputV1L] = useState<number>(0.06);
  const [inputP2Atm, setInputP2Atm] = useState<number>(3.0);
  const [inputV2L, setInputV2L] = useState<number>(0.02);

  // Current Preset Loader
  const preset = useMemo(() => {
    return BOYLES_PRESETS.find(p => p.id === selectedPresetId) || BOYLES_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputP1Atm(preset.defaultP1Atm);
    setInputV1L(preset.defaultV1L);
    setInputP2Atm(preset.defaultP2Atm);
    setInputV2L(preset.defaultV2L);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"isotherm_chart" | "dashboard" | "flashcards" | "quiz">("isotherm_chart");

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

  // Main Boyle's Law Engine: P1 * V1 = P2 * V2 = k (Constant T, n)
  const results = useMemo(() => {
    // 1. Solve P2 = (P1 * V1) / V2
    const calcP2Atm = (inputV2L > 0) ? (inputP1Atm * inputV1L) / inputV2L : 3.0;

    // 2. Solve V2 = (P1 * V1) / P2
    const calcV2L = (inputP2Atm > 0) ? (inputP1Atm * inputV1L) / inputP2Atm : 0.02;

    // 3. Solve P1 = (P2 * V2) / V1
    const calcP1Atm = (inputV1L > 0) ? (inputP2Atm * inputV2L) / inputV1L : 1.0;

    // 4. Solve V1 = (P2 * V2) / P1
    const calcV1L = (inputP1Atm > 0) ? (inputP2Atm * inputV2L) / inputP1Atm : 0.06;

    // Boyle's Constant k = P * V (L·atm)
    const boylesConstantK = inputP1Atm * inputV1L;

    // Percentage Changes
    const deltaPPercent = ((inputP2Atm - inputP1Atm) / inputP1Atm) * 100;
    const deltaVPercent = ((inputV2L - inputV1L) / inputV1L) * 100;

    // Process Classification
    const isCompression = inputV2L < inputV1L;
    const isExpansion = inputV2L > inputV1L;
    const processTypeLabel = isCompression ? "Isothermal Gas Compression (V ↓ ➔ P ↑)" : isExpansion ? "Isothermal Gas Expansion (V ↑ ➔ P ↓)" : "No Volume Change";

    return {
      calcP2Atm,
      calcV2L,
      calcP1Atm,
      calcV1L,
      boylesConstantK,
      deltaPPercent,
      deltaVPercent,
      isCompression,
      isExpansion,
      processTypeLabel
    };
  }, [inputP1Atm, inputV1L, inputP2Atm, inputV2L]);

  // Recharts Isotherm Curve Plotter Data (P = k / V)
  const isothermData = useMemo(() => {
    const data = [];
    const k = results.boylesConstantK > 0 ? results.boylesConstantK : 0.06;
    const maxV = Math.max(inputV1L, inputV2L, 0.1) * 1.5;
    const minV = Math.max(0.005, Math.min(inputV1L, inputV2L) * 0.5);

    const step = (maxV - minV) / 10;
    for (let v = minV; v <= maxV; v += step) {
      const p = k / v;
      data.push({
        VolumeL: Number(v.toFixed(3)),
        PressureAtm: Number(p.toFixed(3))
      });
    }
    return data;
  }, [inputV1L, inputV2L, results.boylesConstantK]);

  // Flashcards Data
  const flashcards = [
    { title: "Boyle's Law Formula", desc: "P1*V1 = P2*V2 under constant temperature T and moles n." },
    { title: "Inverse Proportionality (P ∝ 1/V)", desc: "If gas volume is halved, pressure doubles. If volume doubles, pressure halves." },
    { title: "Boyle's Constant (k = P*V)", desc: "The product of pressure and volume remains constant for an isothermal ideal gas." },
    { title: "Real-World Syringe Compression", desc: "Pushing a syringe plunger decreases volume and dramatically increases gas pressure inside." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Boyle's Law Analysis (${preset.name})
------------------------------------
Initial State 1: P1 = ${inputP1Atm.toFixed(3)} atm | V1 = ${inputV1L.toFixed(3)} L
Final State 2: P2 = ${results.calcP2Atm.toFixed(3)} atm | V2 = ${results.calcV2L.toFixed(3)} L
Boyle's Constant (k = P*V): ${results.boylesConstantK.toFixed(4)} L·atm
Process Type: ${results.processTypeLabel}
Pressure Change (ΔP): ${results.deltaPPercent.toFixed(1)}%
Volume Change (ΔV): ${results.deltaVPercent.toFixed(1)}%`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Boyle's law analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "According to Boyle's Law (P1*V1 = P2*V2), if gas Volume is HALVED at constant temp, what happens to Pressure?", correctAnswer: "DOUBLES" },
      { q: "What parameters MUST remain constant for Boyle's Law to strictly apply?", correctAnswer: "TEMPERATURE AND MOLES" },
      { q: "If initial pressure P1 = 2.0 atm and volume V1 = 5.0 L, what is Boyle's constant k (P*V)?", correctAnswer: "10 L·ATM" }
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
            Boyle's Law Calculator
          </span>
          <Link href="/calculators/combined-gas-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Combined Gas Law Calculator
          </Link>
          <Link href="/calculators/ideal-gas-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ideal Gas Law Calculator
          </Link>
          <Link href="/calculators/specific-heat-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Specific Heat Calculator
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
                Pressure-Volume Solver
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
                <option value="solve_p2">1. Calculate Final Pressure (P2)</option>
                <option value="solve_v2">2. Calculate Final Volume (V2)</option>
                <option value="solve_p1">3. Calculate Initial Pressure (P1)</option>
                <option value="solve_v1">4. Calculate Initial Volume (V1)</option>
              </select>
            </div>

            {/* Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Boyle's Law Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {BOYLES_PRESETS.map(p => (
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
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">P1 (atm)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={inputP1Atm}
                      onChange={(e) => setInputP1Atm(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">V1 (Liters)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={inputV1L}
                      onChange={(e) => setInputV1L(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* State 2 Inputs */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">State 2 (Final Conditions)</span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">P2 (atm)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={inputP2Atm}
                      onChange={(e) => setInputP2Atm(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">V2 (Liters)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={inputV2L}
                      onChange={(e) => setInputV2L(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Calculated Final Pressure (P2)" 
                val={`${results.calcP2Atm.toFixed(3)} atm`} 
                icon={Gauge} 
              />
              <ReadOnlyField 
                label="Calculated Final Volume (V2)" 
                val={`${results.calcV2L.toFixed(3)} Liters`} 
                icon={Atom} 
              />

            </div>
          </div>

          {/* Integration Links to Combined Gas Law Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Does temperature also change?</span>
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

        {/* Right Column: Interactive Cockpit & Isotherm Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Boyle's Law Pressure-Volume Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg border bg-green-950 text-green-300 border-green-800">
                Constant Temp (T1 = T2)
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Boyle's Constant (k)</span>
                <span className="text-xs font-black text-[#518231]">{results.boylesConstantK.toFixed(4)} L·atm</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Pressure Change</span>
                <span className="text-xs font-black text-amber-400">{results.deltaPPercent >= 0 ? "+" : ""}{results.deltaPPercent.toFixed(1)}%</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Volume Change</span>
                <span className="text-xs font-black text-cyan-400">{results.deltaVPercent >= 0 ? "+" : ""}{results.deltaVPercent.toFixed(1)}%</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Process Type</span>
                <span className="text-xs font-black text-white">{results.isCompression ? "Compression" : "Expansion"}</span>
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
                {(["isotherm_chart", "dashboard", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "isotherm_chart" ? "📊 Isotherm Chart" : tab === "dashboard" ? "⚡ Gas Summary" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Recharts Isotherm Plotter */}
                {visualTab === "isotherm_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Boyle's Law Isotherm (P = {results.boylesConstantK.toFixed(3)} / V)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={isothermData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="VolumeL" label={{ value: "Volume (L)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Pressure (atm)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="PressureAtm" stroke="#10b981" strokeWidth={2} dot={true} name="Pressure (atm)" />
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
                      Boyle's Law Summary ({results.processTypeLabel})
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Boyle's Law: P1 * V1 = P2 * V2</span>
                        <span className="text-[11px] font-bold text-green-400">k = {results.boylesConstantK.toFixed(4)} L·atm</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">State 1 Product (P1*V1)</span>
                          <span className="font-bold text-amber-400">{(inputP1Atm * inputV1L).toFixed(4)} L·atm</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">State 2 Product (P2*V2)</span>
                          <span className="font-bold text-cyan-400">{(inputP2Atm * inputV2L).toFixed(4)} L·atm</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Isothermal Check: <span className="font-bold text-white">P1V1 = P2V2 = {results.boylesConstantK.toFixed(4)} L·atm</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Boyle's Law Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-bold">Boyle's Law Quiz</h4>
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
