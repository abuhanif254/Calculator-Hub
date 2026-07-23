"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "kb_from_eq" 
  | "kb_from_poh" 
  | "kb_from_ph" 
  | "kb_from_ohminus" 
  | "kb_from_percent" 
  | "kb_pkb_conv" 
  | "kb_from_ka" 
  | "eq_from_kb";

const TEMPERATURE_KW: { [temp: number]: { kw: number; pkw: number; neutralPh: number } } = {
  0: { kw: 1.14e-15, pkw: 14.94, neutralPh: 7.47 },
  25: { kw: 1.00e-14, pkw: 14.00, neutralPh: 7.00 },
  37: { kw: 2.40e-14, pkw: 13.62, neutralPh: 6.81 },
  60: { kw: 9.60e-14, pkw: 13.02, neutralPh: 6.51 }
};

export function KbCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("kb_from_poh");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputConc, setInputConc] = useState<number>(0.10); // 0.10 M
  const [inputPOH, setInputPOH] = useState<number>(2.88); // Ammonia pOH at 0.1M = 2.88
  const [inputPH, setInputPH] = useState<number>(11.12); // Ammonia pH at 0.1M = 11.12
  const [inputOHMinus, setInputOHMinus] = useState<number>(0.00132); // 1.32e-3 M
  const [inputPercentIon, setInputPercentIon] = useState<number>(1.32); // 1.32%
  const [inputKb, setInputKb] = useState<number>(1.8e-5); // Ammonia Kb
  const [inputPKb, setInputPKb] = useState<number>(4.75); // Ammonia pKb
  const [inputKaConjugate, setInputKaConjugate] = useState<number>(5.56e-10); // Ammonium ion Ka

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
    let calculatedKb = 1.8e-5;
    let calculatedPKb = 4.75;
    let calculatedPOH = 2.88;
    let calculatedPH = 11.12;
    let calculatedOHMinus = 0.00132;
    let calculatedHPlus = 7.58e-12;
    let calculatedB = 0.09868;
    let calculatedBH = 0.00132;
    let calculatedPercentIon = 1.32;
    let calculatedAlpha = 0.0132;
    let approxOHMinus = 0.00134; // sqrt(Kb * C)
    let approxValid = true;
    let methodNote = "";

    const C = Math.max(1e-8, inputConc);

    if (calcMode === "kb_from_poh") {
      calculatedOHMinus = Math.pow(10, -inputPOH);
      calculatedBH = calculatedOHMinus;
      calculatedB = Math.max(1e-9, C - calculatedOHMinus);
      calculatedKb = (calculatedOHMinus * calculatedBH) / calculatedB;
      calculatedPKb = -Math.log10(calculatedKb);
      calculatedPOH = inputPOH;
      calculatedPH = kwInfo.pkw - calculatedPOH;
      calculatedHPlus = Math.pow(10, -calculatedPH);
      calculatedAlpha = calculatedOHMinus / C;
      calculatedPercentIon = calculatedAlpha * 100;
      methodNote = "Kb = x^2 / (C - x) where x = 10^(-pOH)";
    } else if (calcMode === "kb_from_ph") {
      calculatedPOH = kwInfo.pkw - inputPH;
      calculatedOHMinus = Math.pow(10, -calculatedPOH);
      calculatedBH = calculatedOHMinus;
      calculatedB = Math.max(1e-9, C - calculatedOHMinus);
      calculatedKb = (calculatedOHMinus * calculatedBH) / calculatedB;
      calculatedPKb = -Math.log10(calculatedKb);
      calculatedPH = inputPH;
      calculatedHPlus = Math.pow(10, -calculatedPH);
      calculatedAlpha = calculatedOHMinus / C;
      calculatedPercentIon = calculatedAlpha * 100;
      methodNote = "pOH = pKw - pH & Kb = [OH-]^2 / (C - [OH-])";
    } else if (calcMode === "kb_from_ohminus") {
      calculatedOHMinus = Math.max(1e-9, inputOHMinus);
      calculatedBH = calculatedOHMinus;
      calculatedB = Math.max(1e-9, C - calculatedOHMinus);
      calculatedKb = (calculatedOHMinus * calculatedBH) / calculatedB;
      calculatedPKb = -Math.log10(calculatedKb);
      calculatedPOH = -Math.log10(calculatedOHMinus);
      calculatedPH = kwInfo.pkw - calculatedPOH;
      calculatedHPlus = Math.pow(10, -calculatedPH);
      calculatedAlpha = calculatedOHMinus / C;
      calculatedPercentIon = calculatedAlpha * 100;
      methodNote = "Kb = [OH-]^2 / (C - [OH-])";
    } else if (calcMode === "kb_from_percent") {
      calculatedPercentIon = Math.max(0.0001, inputPercentIon);
      calculatedAlpha = calculatedPercentIon / 100;
      calculatedOHMinus = calculatedAlpha * C;
      calculatedBH = calculatedOHMinus;
      calculatedB = Math.max(1e-9, C - calculatedOHMinus);
      calculatedKb = (calculatedOHMinus * calculatedBH) / calculatedB;
      calculatedPKb = -Math.log10(calculatedKb);
      calculatedPOH = -Math.log10(calculatedOHMinus);
      calculatedPH = kwInfo.pkw - calculatedPOH;
      calculatedHPlus = Math.pow(10, -calculatedPH);
      methodNote = "Kb = (alpha * C)^2 / (C - alpha * C)";
    } else if (calcMode === "kb_pkb_conv") {
      calculatedKb = Math.max(1e-15, inputKb);
      calculatedPKb = -Math.log10(calculatedKb);
      methodNote = "pKb = -log10(Kb) & Kb = 10^(-pKb)";
    } else if (calcMode === "kb_from_ka") {
      const KaVal = Math.max(1e-15, inputKaConjugate);
      calculatedKb = kwInfo.kw / KaVal;
      calculatedPKb = -Math.log10(calculatedKb);
      methodNote = "Conjugate Pair Relation: Kb = Kw / Ka";
    } else {
      // eq_from_kb
      calculatedKb = Math.max(1e-15, inputKb);
      calculatedPKb = -Math.log10(calculatedKb);
      // Quadratic: x^2 + Kb*x - Kb*C = 0
      const x = (-calculatedKb + Math.sqrt(calculatedKb * calculatedKb + 4 * calculatedKb * C)) / 2;
      calculatedOHMinus = x;
      calculatedBH = x;
      calculatedB = Math.max(1e-9, C - x);
      calculatedPOH = -Math.log10(calculatedOHMinus);
      calculatedPH = kwInfo.pkw - calculatedPOH;
      calculatedHPlus = Math.pow(10, -calculatedPH);
      calculatedAlpha = x / C;
      calculatedPercentIon = calculatedAlpha * 100;
      methodNote = "Exact Quadratic Weak Base Equilibrium: x^2 + Kb*x - Kb*C = 0";
    }

    // 5% Approximation check: x_approx = sqrt(Kb * C)
    approxOHMinus = Math.sqrt(calculatedKb * C);
    const approxPercent = (approxOHMinus / C) * 100;
    approxValid = approxPercent <= 5.0;

    // Status
    let statusText = approxValid 
      ? "5% Rule Satisfied (Small-x Approximation Valid)" 
      : "5% Rule Exceeded (Use Exact Quadratic Solution)";

    return {
      calculatedKb,
      calculatedPKb,
      calculatedPOH,
      calculatedPH,
      calculatedOHMinus,
      calculatedHPlus,
      calculatedB,
      calculatedBH,
      calculatedPercentIon,
      calculatedAlpha,
      approxOHMinus,
      approxValid,
      statusText,
      methodNote,
      pkw: kwInfo.pkw
    };
  }, [calcMode, inputConc, inputPOH, inputPH, inputOHMinus, inputPercentIon, inputKb, inputPKb, inputKaConjugate, kwInfo]);

  // Recharts Species Distribution Data (% B vs % BH+)
  const speciesData = useMemo(() => {
    const data = [];
    const pKaConjugate = kwInfo.pkw - results.calculatedPKb;
    const KaConjugate = Math.pow(10, -pKaConjugate);

    for (let ph = pKaConjugate - 3; ph <= pKaConjugate + 3; ph += 0.25) {
      const hPlus = Math.pow(10, -ph);
      const fBH = hPlus / (hPlus + KaConjugate);
      const fB = KaConjugate / (hPlus + KaConjugate);

      data.push({
        pH: Number(ph.toFixed(2)),
        BH: Number((fBH * 100).toFixed(1)),
        B: Number((fB * 100).toFixed(1))
      });
    }
    return data;
  }, [results.calculatedPKb, kwInfo]);

  // Flashcards Data
  const flashcards = [
    { title: "Base Dissociation Constant (Kb)", desc: "Kb = [BH+][OH-] / [B]. Measures the quantitative strength of a weak base in aqueous solution." },
    { title: "pKb Definition", desc: "pKb = -log10(Kb). Smaller pKb values correspond to larger Kb values and stronger weak bases." },
    { title: "Ka and Kb Conjugate Pair Constant", desc: "For any conjugate acid-base pair in water: Ka * Kb = Kw (1.0 x 10^-14 at 25°C), and pKa + pKb = 14.00." },
    { title: "5% Rule Approximation", desc: "The small-x approximation x ~ sqrt(Kb*C) is valid only when percent ionization (x/C * 100%) is <= 5%." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Kb & Weak Base Equilibrium Summary
------------------------------------
Selected Mode: ${calcMode}
Temperature: ${temperatureC}°C (pKw = ${results.pkw.toFixed(2)})
Base Dissociation Constant (Kb): ${results.calculatedKb.toExponential(3)}
pKb: ${results.calculatedPKb.toFixed(2)}
Calculated pOH: ${results.calculatedPOH.toFixed(2)}
Calculated pH: ${results.calculatedPH.toFixed(2)}
Hydroxide Ion [OH-]: ${results.calculatedOHMinus.toExponential(3)} M
Equilibrium [B]: ${results.calculatedB.toFixed(5)} M
Equilibrium [BH+]: ${results.calculatedBH.toExponential(3)} M
Percent Ionization: ${results.calculatedPercentIon.toFixed(2)}%
Approximation Status: ${results.statusText}
Calculation Method: ${results.methodNote}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Kb analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the pKb of ammonia if Kb = 1.8 x 10^-5?", correctAnswer: "4.74" },
      { q: "True or False: For any conjugate pair at 25°C, pKa + pKb = 14.00.", correctAnswer: "TRUE" },
      { q: "If Kb = 1.0 x 10^-5, what is pKb?", correctAnswer: "5.00" }
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
            Kb Calculator
          </span>
          <Link href="/calculators/ka-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ka Calculator
          </Link>
          <Link href="/calculators/acid-base-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Acid-Base Calculator
          </Link>
          <Link href="/calculators/buffer-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Buffer Calculator
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
                Kb Input Cockpit
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
                <option value="kb_from_poh">1. Calculate Kb from Initial Concentration & pOH</option>
                <option value="kb_from_ph">2. Calculate Kb from Initial Concentration & pH</option>
                <option value="kb_from_ohminus">3. Calculate Kb from Initial Concentration & [OH-]</option>
                <option value="kb_from_percent">4. Calculate Kb from Percent Ionization (%)</option>
                <option value="kb_pkb_conv">5. Kb ↔ pKb Two-Way Converter</option>
                <option value="kb_from_ka">6. Calculate Kb from Conjugate Acid Ka</option>
                <option value="eq_from_kb">7. Calculate Equilibrium Concentrations & pOH/pH from Kb</option>
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
              
              {calcMode !== "kb_pkb_conv" && calcMode !== "kb_from_ka" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Initial Weak Base Conc. (C)</span>
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

              {calcMode === "kb_from_poh" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Measured pOH</span>
                    <input
                      type="number"
                      step="0.01"
                      value={inputPOH}
                      onChange={(e) => setInputPOH(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {calcMode === "kb_from_ph" && (
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

              {calcMode === "kb_from_ka" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Conjugate Acid Ka</span>
                    <input
                      type="number"
                      step="0.0000000001"
                      value={inputKaConjugate}
                      onChange={(e) => setInputKaConjugate(Number(e.target.value))}
                      className="w-28 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {(calcMode === "eq_from_kb" || calcMode === "kb_pkb_conv") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Base Dissociation Constant (Kb)</span>
                    <input
                      type="number"
                      step="0.000001"
                      value={inputKb}
                      onChange={(e) => setInputKb(Number(e.target.value))}
                      className="w-28 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Base Dissociation Constant (Kb)" 
                val={results.calculatedKb.toExponential(3)} 
                icon={Atom} 
              />
              <ReadOnlyField 
                label="Negative Logarithm (pKb)" 
                val={results.calculatedPKb.toFixed(2)} 
                icon={Zap} 
              />

            </div>
          </div>

          {/* Integration Links to pOH Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Dedicated pOH solver & hydroxide ion tool?</span>
              <span className="text-[11px] text-slate-500">Try our companion pOH Calculator</span>
            </div>
            <Link
              href="/calculators/poh-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              pOH Tool
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
                🧪 Weak Base Dissociation Cockpit
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
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Kb</span>
                <span className="text-xs font-black text-[#518231]">{results.calculatedKb.toExponential(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">pKb</span>
                <span className="text-2xl font-black text-amber-400">{results.calculatedPKb.toFixed(2)}</span>
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
                      Weak Base Equilibrium ICE Table (B + H2O ⇌ BH+ + OH-)
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2.5 text-left">State</th>
                            <th className="p-2.5 text-center">[B] (M)</th>
                            <th className="p-2.5 text-center">[BH+] (M)</th>
                            <th className="p-2.5 text-center">[OH-] (M)</th>
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
                            <td className="p-2.5 text-center text-amber-600 dark:text-amber-400">-{results.calculatedOHMinus.toExponential(2)}</td>
                            <td className="p-2.5 text-center text-green-600 dark:text-green-400">+{results.calculatedOHMinus.toExponential(2)}</td>
                            <td className="p-2.5 text-center text-blue-600 dark:text-blue-400">+{results.calculatedOHMinus.toExponential(2)}</td>
                          </tr>
                          <tr className="bg-slate-50 dark:bg-slate-950 font-bold">
                            <td className="p-2.5 text-slate-900 dark:text-white">Equilibrium (E)</td>
                            <td className="p-2.5 text-center text-slate-900 dark:text-white">{results.calculatedB.toFixed(4)}</td>
                            <td className="p-2.5 text-center text-[#518231]">{results.calculatedBH.toExponential(2)}</td>
                            <td className="p-2.5 text-center text-[#518231]">{results.calculatedOHMinus.toExponential(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Method: <span className="font-bold text-[#518231]">{results.methodNote}</span>.
                      Exact Quadratic Result: x = {results.calculatedOHMinus.toExponential(3)} M vs Small-x Approx: x ~ {results.approxOHMinus.toExponential(3)} M.
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Species Distribution Chart */}
                {visualTab === "species_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Species Fraction vs pH (% B vs % BH+)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={speciesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="pH" label={{ value: "pH", position: "insideBottom", offset: -5 }} />
                          <YAxis domain={[0, 100]} label={{ value: "% Species", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="B" stroke="#3b82f6" strokeWidth={2} dot={false} name="% B (Weak Base)" />
                          <Line type="monotone" dataKey="BH" stroke="#ef4444" strokeWidth={2} dot={false} name="% BH+ (Conjugate Acid)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Kb & Weak Base Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Kb Chemistry Quiz</h4>
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
