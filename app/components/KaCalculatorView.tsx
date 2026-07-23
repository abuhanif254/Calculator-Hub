"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "ka_from_eq" 
  | "ka_from_ph" 
  | "ka_from_hplus" 
  | "ka_from_percent" 
  | "ka_from_alpha" 
  | "ka_pka_conv" 
  | "eq_from_ka" 
  | "ph_from_ka";

const TEMPERATURE_KW: { [temp: number]: { kw: number; pkw: number; neutralPh: number } } = {
  0: { kw: 1.14e-15, pkw: 14.94, neutralPh: 7.47 },
  25: { kw: 1.00e-14, pkw: 14.00, neutralPh: 7.00 },
  37: { kw: 2.40e-14, pkw: 13.62, neutralPh: 6.81 },
  60: { kw: 9.60e-14, pkw: 13.02, neutralPh: 6.51 }
};

export function KaCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("ka_from_ph");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputConc, setInputConc] = useState<number>(0.10); // 0.10 M
  const [inputPH, setInputPH] = useState<number>(2.88); // Acetic acid pH at 0.1M = 2.88
  const [inputHPlus, setInputHPlus] = useState<number>(0.00132); // 1.32e-3 M
  const [inputPercentIon, setInputPercentIon] = useState<number>(1.32); // 1.32%
  const [inputAlpha, setInputAlpha] = useState<number>(0.0132); // 0.0132
  const [inputKa, setInputKa] = useState<number>(1.8e-5); // Acetic Acid Ka
  const [inputPKa, setInputPKa] = useState<number>(4.76); // Acetic Acid pKa

  // Temperature
  const [temperatureC, setTemperatureC] = useState<number>(25);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"ice_table" | "species_chart" | "flashcards" | "quiz">("ice_table");

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

  // Temperature Kw info
  const kwInfo = useMemo(() => {
    return TEMPERATURE_KW[temperatureC] || TEMPERATURE_KW[25];
  }, [temperatureC]);

  // Calculations Engine
  const results = useMemo(() => {
    let calculatedKa = 1.8e-5;
    let calculatedPKa = 4.76;
    let calculatedPH = 2.88;
    let calculatedHPlus = 0.00132;
    let calculatedHA = 0.09868;
    let calculatedA = 0.00132;
    let calculatedPercentIon = 1.32;
    let calculatedAlpha = 0.0132;
    let approxHPlus = 0.00134; // sqrt(Ka * C)
    let approxValid = true;
    let methodNote = "";

    const C = Math.max(1e-8, inputConc);

    if (calcMode === "ka_from_ph") {
      calculatedHPlus = Math.pow(10, -inputPH);
      calculatedA = calculatedHPlus;
      calculatedHA = Math.max(1e-9, C - calculatedHPlus);
      calculatedKa = (calculatedHPlus * calculatedA) / calculatedHA;
      calculatedPKa = -Math.log10(calculatedKa);
      calculatedPH = inputPH;
      calculatedAlpha = calculatedHPlus / C;
      calculatedPercentIon = calculatedAlpha * 100;
      methodNote = "Ka = x^2 / (C - x) where x = 10^(-pH)";
    } else if (calcMode === "ka_from_hplus") {
      calculatedHPlus = Math.max(1e-9, inputHPlus);
      calculatedA = calculatedHPlus;
      calculatedHA = Math.max(1e-9, C - calculatedHPlus);
      calculatedKa = (calculatedHPlus * calculatedA) / calculatedHA;
      calculatedPKa = -Math.log10(calculatedKa);
      calculatedPH = -Math.log10(calculatedHPlus);
      calculatedAlpha = calculatedHPlus / C;
      calculatedPercentIon = calculatedAlpha * 100;
      methodNote = "Ka = [H+]^2 / (C - [H+])";
    } else if (calcMode === "ka_from_percent") {
      calculatedPercentIon = Math.max(0.0001, inputPercentIon);
      calculatedAlpha = calculatedPercentIon / 100;
      calculatedHPlus = calculatedAlpha * C;
      calculatedA = calculatedHPlus;
      calculatedHA = Math.max(1e-9, C - calculatedHPlus);
      calculatedKa = (calculatedHPlus * calculatedA) / calculatedHA;
      calculatedPKa = -Math.log10(calculatedKa);
      calculatedPH = -Math.log10(calculatedHPlus);
      methodNote = "Ka = (alpha * C)^2 / (C - alpha * C)";
    } else if (calcMode === "ka_from_alpha") {
      calculatedAlpha = Math.max(1e-6, Math.min(0.9999, inputAlpha));
      calculatedPercentIon = calculatedAlpha * 100;
      calculatedHPlus = calculatedAlpha * C;
      calculatedA = calculatedHPlus;
      calculatedHA = Math.max(1e-9, C - calculatedHPlus);
      calculatedKa = (calculatedHPlus * calculatedA) / calculatedHA;
      calculatedPKa = -Math.log10(calculatedKa);
      calculatedPH = -Math.log10(calculatedHPlus);
      methodNote = "Ka = alpha^2 * C / (1 - alpha)";
    } else if (calcMode === "ka_pka_conv") {
      calculatedKa = Math.max(1e-15, inputKa);
      calculatedPKa = -Math.log10(calculatedKa);
      methodNote = "pKa = -log10(Ka) & Ka = 10^(-pKa)";
    } else {
      // eq_from_ka or ph_from_ka
      calculatedKa = Math.max(1e-15, inputKa);
      calculatedPKa = -Math.log10(calculatedKa);
      // Quadratic: x^2 + Ka*x - Ka*C = 0
      const x = (-calculatedKa + Math.sqrt(calculatedKa * calculatedKa + 4 * calculatedKa * C)) / 2;
      calculatedHPlus = x;
      calculatedA = x;
      calculatedHA = Math.max(1e-9, C - x);
      calculatedPH = -Math.log10(calculatedHPlus);
      calculatedAlpha = x / C;
      calculatedPercentIon = calculatedAlpha * 100;
      methodNote = "Exact Quadratic Weak Acid Equilibrium: x^2 + Ka*x - Ka*C = 0";
    }

    // 5% Approximation check: x_approx = sqrt(Ka * C)
    approxHPlus = Math.sqrt(calculatedKa * C);
    const approxPercent = (approxHPlus / C) * 100;
    approxValid = approxPercent <= 5.0;

    // Status
    let statusText = approxValid 
      ? "5% Rule Satisfied (Small-x Approximation Valid)" 
      : "5% Rule Exceeded (Use Exact Quadratic Solution)";

    return {
      calculatedKa,
      calculatedPKa,
      calculatedPH,
      calculatedHPlus,
      calculatedHA,
      calculatedA,
      calculatedPercentIon,
      calculatedAlpha,
      approxHPlus,
      approxValid,
      statusText,
      methodNote,
      pkw: kwInfo.pkw
    };
  }, [calcMode, inputConc, inputPH, inputHPlus, inputPercentIon, inputAlpha, inputKa, inputPKa, kwInfo]);

  // Recharts Species Distribution Data (% HA vs % A-)
  const speciesData = useMemo(() => {
    const data = [];
    const KaVal = results.calculatedKa;

    for (let ph = results.calculatedPKa - 3; ph <= results.calculatedPKa + 3; ph += 0.25) {
      const hPlus = Math.pow(10, -ph);
      const fHA = hPlus / (hPlus + KaVal);
      const fA = KaVal / (hPlus + KaVal);

      data.push({
        pH: Number(ph.toFixed(2)),
        HA: Number((fHA * 100).toFixed(1)),
        A: Number((fA * 100).toFixed(1))
      });
    }
    return data;
  }, [results.calculatedKa, results.calculatedPKa]);

  // Flashcards Data
  const flashcards = [
    { title: "Acid Dissociation Constant (Ka)", desc: "Ka = [H+][A-] / [HA]. Measures the quantitative strength of a weak acid in aqueous solution." },
    { title: "pKa Definition", desc: "pKa = -log10(Ka). Smaller pKa values correspond to larger Ka values and stronger weak acids." },
    { title: "5% Rule Approximation", desc: "The small-x approximation x ~ sqrt(Ka*C) is valid only when percent ionization (x/C * 100%) is <= 5%." },
    { title: "Percent Ionization", desc: "Percent Ionization = ([H+]_eq / C_initial) * 100%. Percent ionization increases as the acid is diluted." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Ka & Weak Acid Equilibrium Summary
------------------------------------
Selected Mode: ${calcMode}
Temperature: ${temperatureC}°C (pKw = ${results.pkw.toFixed(2)})
Acid Dissociation Constant (Ka): ${results.calculatedKa.toExponential(3)}
pKa: ${results.calculatedPKa.toFixed(2)}
Calculated pH: ${results.calculatedPH.toFixed(2)}
Hydrogen Ion [H+]: ${results.calculatedHPlus.toExponential(3)} M
Equilibrium [HA]: ${results.calculatedHA.toFixed(5)} M
Equilibrium [A-]: ${results.calculatedA.toExponential(3)} M
Percent Ionization: ${results.calculatedPercentIon.toFixed(2)}%
Approximation Status: ${results.statusText}
Calculation Method: ${results.methodNote}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Ka analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the pKa of acetic acid if Ka = 1.8 x 10^-5?", correctAnswer: "4.74" },
      { q: "True or False: Diluting a weak acid increases its percent ionization.", correctAnswer: "TRUE" },
      { q: "If Ka = 1.0 x 10^-4, what is pKa?", correctAnswer: "4.00" }
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
          Chemistry Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Ka Calculator
          </span>
          <Link href="/calculators/acid-base-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Acid-Base Calculator
          </Link>
          <Link href="/calculators/buffer-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Buffer Calculator
          </Link>
          <Link href="/calculators/pka-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            pKa Calculator
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
                <Dna className="text-[#518231]" />
                Ka Input Cockpit
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
                <option value="ka_from_ph">1. Calculate Ka from Initial Concentration & pH</option>
                <option value="ka_from_hplus">2. Calculate Ka from Initial Concentration & [H+]</option>
                <option value="ka_from_percent">3. Calculate Ka from Percent Ionization (%)</option>
                <option value="ka_from_alpha">4. Calculate Ka from Degree of Ionization (alpha)</option>
                <option value="ka_pka_conv">5. Ka ↔ pKa Two-Way Converter</option>
                <option value="eq_from_ka">6. Calculate Equilibrium Concentrations & pH from Ka</option>
              </select>
            </div>

            {/* Temperature Selector */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Temperature (°C)</label>
              <select
                value={temperatureC}
                onChange={(e) => setTemperatureC(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value={25}>25°C (Standard, pKw = 14.00)</option>
                <option value={37}>37°C (Body Temp, pKw = 13.62)</option>
                <option value={0}>0°C (Ice Point, pKw = 14.94)</option>
                <option value={60}>60°C (Hot Water, pKw = 13.02)</option>
              </select>
            </div>

            {/* Dynamic Input Controls */}
            <div className="space-y-5">
              
              {calcMode !== "ka_pka_conv" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Initial Weak Acid Conc. (C)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.01"
                        value={inputConc}
                        onChange={(e) => setInputConc(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">M</span>
                    </div>
                  </div>
                </div>
              )}

              {calcMode === "ka_from_ph" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Measured pH</span>
                    <input
                      type="number"
                      step="0.01"
                      value={inputPH}
                      onChange={(e) => setInputPH(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {calcMode === "ka_from_percent" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Percent Ionization (%)</span>
                    <input
                      type="number"
                      step="0.01"
                      value={inputPercentIon}
                      onChange={(e) => setInputPercentIon(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {(calcMode === "eq_from_ka" || calcMode === "ka_pka_conv") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Acid Dissociation Constant (Ka)</span>
                    <input
                      type="number"
                      step="0.000001"
                      value={inputKa}
                      onChange={(e) => setInputKa(Number(e.target.value))}
                      className="w-28 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Acid Dissociation Constant (Ka)" 
                val={results.calculatedKa.toExponential(3)} 
                icon={Atom} 
              />
              <ReadOnlyField 
                label="Negative Logarithm (pKa)" 
                val={results.calculatedPKa.toFixed(2)} 
                icon={Zap} 
              />

            </div>
          </div>

          {/* Integration Links to pKa Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Dedicated pKa solver & spectrum?</span>
              <span className="text-[11px] text-slate-500">Try our companion pKa Calculator</span>
            </div>
            <Link
              href="/calculators/pka-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              pKa Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Cockpit & Recharts Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Weak Acid Dissociation Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                results.approxValid ? "bg-green-950 text-green-300 border border-green-800" : "bg-amber-950 text-amber-300 border border-amber-800"
              }`}>
                {results.statusText}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Ka</span>
                <span className="text-xs font-black text-[#518231]">{results.calculatedKa.toExponential(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">pKa</span>
                <span className="text-2xl font-black text-amber-400">{results.calculatedPKa.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Equilibrium pH</span>
                <span className="text-2xl font-black text-white">{results.calculatedPH.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">% Ionization</span>
                <span className="text-xs font-black text-white">{results.calculatedPercentIon.toFixed(2)}%</span>
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
                {(["ice_table", "species_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "ice_table" ? "📋 ICE Table" : tab === "species_chart" ? "📊 Species Distribution" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: ICE Table */}
                {visualTab === "ice_table" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Table size={16} className="text-[#518231]" />
                      Weak Acid Equilibrium ICE Table (HA ⇌ H+ + A-)
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2.5 text-left">State</th>
                            <th className="p-2.5 text-center">[HA] (M)</th>
                            <th className="p-2.5 text-center">[H+] (M)</th>
                            <th className="p-2.5 text-center">[A-] (M)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">Initial (I)</td>
                            <td className="p-2.5 text-center">{inputConc.toFixed(3)}</td>
                            <td className="p-2.5 text-center">0.000</td>
                            <td className="p-2.5 text-center">0.000</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-amber-600 dark:text-amber-400">Change (C)</td>
                            <td className="p-2.5 text-center text-amber-600 dark:text-amber-400">-{results.calculatedHPlus.toExponential(2)}</td>
                            <td className="p-2.5 text-center text-green-600 dark:text-green-400">+{results.calculatedHPlus.toExponential(2)}</td>
                            <td className="p-2.5 text-center text-blue-600 dark:text-blue-400">+{results.calculatedHPlus.toExponential(2)}</td>
                          </tr>
                          <tr className="bg-slate-50 dark:bg-slate-950 font-bold">
                            <td className="p-2.5 text-slate-900 dark:text-white">Equilibrium (E)</td>
                            <td className="p-2.5 text-center text-slate-900 dark:text-white">{results.calculatedHA.toFixed(4)}</td>
                            <td className="p-2.5 text-center text-[#518231]">{results.calculatedHPlus.toExponential(2)}</td>
                            <td className="p-2.5 text-center text-[#518231]">{results.calculatedA.toExponential(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Method: <span className="font-bold text-[#518231]">{results.methodNote}</span>.
                      Exact Quadratic Result: x = {results.calculatedHPlus.toExponential(3)} M vs Small-x Approx: x ~ {results.approxHPlus.toExponential(3)} M.
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Species Distribution Chart */}
                {visualTab === "species_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Species Fraction vs pH (% HA vs % A-)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={speciesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="pH" label={{ value: "pH", position: "insideBottom", offset: -5 }} />
                          <YAxis domain={[0, 100]} label={{ value: "% Species", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="HA" stroke="#ef4444" strokeWidth={2} dot={false} name="% HA (Weak Acid)" />
                          <Line type="monotone" dataKey="A" stroke="#3b82f6" strokeWidth={2} dot={false} name="% A- (Conjugate Base)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ka & Weak Acid Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ka Chemistry Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. 4.74)"
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
