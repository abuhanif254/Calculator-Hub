"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "buffer_ph" 
  | "design_buffer" 
  | "prepare_buffer" 
  | "buffer_capacity" 
  | "add_acid_base" 
  | "buffer_dilution";

const TEMPERATURE_KW: { [temp: number]: { kw: number; pkw: number; neutralPh: number } } = {
  0: { kw: 1.14e-15, pkw: 14.94, neutralPh: 7.47 },
  25: { kw: 1.00e-14, pkw: 14.00, neutralPh: 7.00 },
  37: { kw: 2.40e-14, pkw: 13.62, neutralPh: 6.81 },
  60: { kw: 9.60e-14, pkw: 13.02, neutralPh: 6.51 }
};

export function BufferCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("buffer_ph");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [bufferType, setBufferType] = useState<"acidic" | "basic">("acidic");
  const [inputPKa, setInputPKa] = useState<number>(4.76); // Acetic Acid pKa = 4.76
  const [inputConjugateBaseConc, setInputConjugateBaseConc] = useState<number>(0.10); // [A-] = 0.10 M
  const [inputWeakAcidConc, setInputWeakAcidConc] = useState<number>(0.10); // [HA] = 0.10 M
  
  // Design Buffer Inputs
  const [targetPH, setTargetPH] = useState<number>(4.76);
  const [totalBufferConc, setTotalBufferConc] = useState<number>(0.20);
  const [targetVolumeL, setTargetVolumeL] = useState<number>(1.0);

  // Add Acid/Base Inputs
  const [addedSpecies, setAddedSpecies] = useState<"strong_acid" | "strong_base">("strong_acid");
  const [addedMoles, setAddedMoles] = useState<number>(0.02); // 0.02 mol H+ or OH-

  // Temperature
  const [temperatureC, setTemperatureC] = useState<number>(25);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"buffer_range" | "capacity_chart" | "species_chart" | "flashcards" | "quiz">("buffer_range");

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
    let calculatedPH = 4.76;
    let calculatedPKa = 4.76;
    let calculatedBase = 0.10;
    let calculatedAcid = 0.10;
    let calculatedRatio = 1.00;
    let bufferCapacityBeta = 0.0576;
    let methodNote = "";
    let isExhausted = false;

    const pKaVal = Math.max(-5, Math.min(20, inputPKa));
    const KaVal = Math.pow(10, -pKaVal);

    if (calcMode === "buffer_ph") {
      calculatedBase = Math.max(1e-6, inputConjugateBaseConc);
      calculatedAcid = Math.max(1e-6, inputWeakAcidConc);
      calculatedRatio = calculatedBase / calculatedAcid;
      calculatedPKa = pKaVal;
      calculatedPH = calculatedPKa + Math.log10(calculatedRatio);
      methodNote = "Henderson-Hasselbalch: pH = pKa + log10([A-]/[HA])";
    } else if (calcMode === "design_buffer") {
      calculatedPKa = pKaVal;
      calculatedPH = targetPH;
      calculatedRatio = Math.pow(10, calculatedPH - calculatedPKa);
      // [A-] + [HA] = Ctotal, [A-] = ratio * [HA] => [HA] * (1 + ratio) = Ctotal
      const Ctotal = Math.max(1e-6, totalBufferConc);
      calculatedAcid = Ctotal / (1 + calculatedRatio);
      calculatedBase = Ctotal - calculatedAcid;
      methodNote = "Buffer Design: Solved [HA] and [A-] for target pH & Ctotal";
    } else if (calcMode === "add_acid_base") {
      calculatedPKa = pKaVal;
      let initMolesHA = inputWeakAcidConc * targetVolumeL;
      let initMolesA = inputConjugateBaseConc * targetVolumeL;

      if (addedSpecies === "strong_acid") {
        // H+ + A- -> HA
        if (addedMoles >= initMolesA) {
          isExhausted = true;
          initMolesHA += initMolesA;
          initMolesA = 1e-6;
        } else {
          initMolesA -= addedMoles;
          initMolesHA += addedMoles;
        }
      } else {
        // OH- + HA -> A- + H2O
        if (addedMoles >= initMolesHA) {
          isExhausted = true;
          initMolesA += initMolesHA;
          initMolesHA = 1e-6;
        } else {
          initMolesHA -= addedMoles;
          initMolesA += addedMoles;
        }
      }

      calculatedBase = initMolesA / targetVolumeL;
      calculatedAcid = initMolesHA / targetVolumeL;
      calculatedRatio = calculatedBase / calculatedAcid;
      calculatedPH = calculatedPKa + Math.log10(calculatedRatio);
      methodNote = isExhausted 
        ? "Buffer Exhausted: All conjugate component neutralized!" 
        : "Stoichiometric Neutralization followed by Henderson-Hasselbalch";
    } else {
      calculatedBase = Math.max(1e-6, inputConjugateBaseConc);
      calculatedAcid = Math.max(1e-6, inputWeakAcidConc);
      calculatedRatio = calculatedBase / calculatedAcid;
      calculatedPKa = pKaVal;
      calculatedPH = calculatedPKa + Math.log10(calculatedRatio);
      methodNote = "Standard Buffer Equilibrium Calculation";
    }

    // Buffer Capacity beta = 2.303 * Ctotal * (Ka * [H+]) / (Ka + [H+])^2
    const Ctotal = calculatedBase + calculatedAcid;
    const hPlus = Math.pow(10, -calculatedPH);
    const denom = KaVal + hPlus;
    bufferCapacityBeta = 2.303 * Ctotal * ((KaVal * hPlus) / (denom * denom));

    // Buffer Validity Status
    let bufferStatus = "Optimal Buffer";
    const delta = Math.abs(calculatedPH - calculatedPKa);
    if (isExhausted) bufferStatus = "Exhausted Buffer (Neutralization Complete)";
    else if (delta <= 1.0) bufferStatus = "Optimal Buffer (within pKa ± 1.0)";
    else if (delta <= 2.0) bufferStatus = "Acceptable Buffer (within pKa ± 2.0)";
    else bufferStatus = "Imbalanced Ratio (Outside Optimal Buffer Range)";

    return {
      calculatedPH,
      calculatedPKa,
      calculatedBase,
      calculatedAcid,
      calculatedRatio,
      bufferCapacityBeta,
      bufferStatus,
      methodNote,
      isExhausted,
      pkw: kwInfo.pkw
    };
  }, [calcMode, inputPKa, inputConjugateBaseConc, inputWeakAcidConc, targetPH, totalBufferConc, targetVolumeL, addedSpecies, addedMoles, kwInfo]);

  // Recharts Buffer Capacity Plot Data (beta vs pH)
  const capacityData = useMemo(() => {
    const data = [];
    const KaVal = Math.pow(10, -results.calculatedPKa);
    const Ctotal = results.calculatedBase + results.calculatedAcid;

    for (let ph = results.calculatedPKa - 3; ph <= results.calculatedPKa + 3; ph += 0.25) {
      const hPlus = Math.pow(10, -ph);
      const denom = KaVal + hPlus;
      const beta = 2.303 * Ctotal * ((KaVal * hPlus) / (denom * denom));
      data.push({
        pH: Number(ph.toFixed(2)),
        capacity: Number(beta.toFixed(4))
      });
    }
    return data;
  }, [results.calculatedPKa, results.calculatedBase, results.calculatedAcid]);

  // Recharts Species Distribution Data (% HA vs % A-)
  const speciesData = useMemo(() => {
    const data = [];
    const KaVal = Math.pow(10, -results.calculatedPKa);

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
  }, [results.calculatedPKa]);

  // Flashcards Data
  const flashcards = [
    { title: "Buffer Solution Definition", desc: "A solution containing a weak acid and its conjugate base (or weak base and conjugate acid) that resists changes in pH." },
    { title: "Buffer Capacity (beta)", desc: "beta = 2.303 * Ctotal * (Ka*[H+]) / (Ka+[H+])^2. Maximum capacity occurs at pH = pKa." },
    { title: "Optimal Buffer Range", desc: "Buffers are most effective within pKa ± 1.0 pH unit, where [A-]/[HA] ratios lie between 0.1 and 10." },
    { title: "Acid/Base Addition Behavior", desc: "Added strong acid H+ reacts with A- to form HA. Added strong base OH- reacts with HA to form A-." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Buffer Solution Analysis Summary
------------------------------------
Selected Mode: ${calcMode}
Temperature: ${temperatureC}°C (pKw = ${results.pkw.toFixed(2)})
Calculated Buffer pH: ${results.calculatedPH.toFixed(2)}
Weak Acid pKa: ${results.calculatedPKa.toFixed(2)}
Conjugate Base [A-]: ${results.calculatedBase.toFixed(4)} M
Weak Acid [HA]: ${results.calculatedAcid.toFixed(4)} M
Conjugate Ratio [A-]/[HA]: ${results.calculatedRatio.toFixed(3)}
Buffer Capacity (beta): ${results.bufferCapacityBeta.toFixed(4)} M/pH
Buffer Status: ${results.bufferStatus}
Calculation Method: ${results.methodNote}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Buffer solution analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the pH of an acetic acid buffer (pKa = 4.76) when [A-] = 0.20 M and [HA] = 0.20 M?", correctAnswer: "4.76" },
      { q: "True or False: Adding strong acid to a buffer converts conjugate base [A-] into weak acid [HA].", correctAnswer: "TRUE" },
      { q: "What is the effective pH range of a buffer with pKa = 7.20?", correctAnswer: "6.20-8.20" }
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
            Buffer Calculator
          </span>
          <Link href="/calculators/henderson-hasselbalch-equation-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Henderson-Hasselbalch
          </Link>
          <Link href="/calculators/pka-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            pKa Calculator
          </Link>
          <Link href="/calculators/ph-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            pH Calculator
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
                Buffer Input Cockpit
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
                <option value="buffer_ph">1. Buffer pH (from pKa, [A-], and [HA])</option>
                <option value="design_buffer">2. Design Buffer (Target pH & Total Concentration)</option>
                <option value="add_acid_base">3. Add Strong Acid / Base Simulation</option>
                <option value="buffer_capacity">4. Buffer Capacity Analysis (beta)</option>
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
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Weak Acid pKa</span>
                  <input
                    type="number"
                    step="0.01"
                    value={inputPKa}
                    onChange={(e) => setInputPKa(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                  />
                </div>
              </div>

              {calcMode === "design_buffer" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Target pH</span>
                      <input
                        type="number"
                        step="0.01"
                        value={targetPH}
                        onChange={(e) => setTargetPH(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Total Concentration (Ctotal)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={totalBufferConc}
                          onChange={(e) => setTotalBufferConc(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">M</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {calcMode === "add_acid_base" && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Added Species</label>
                    <select
                      value={addedSpecies}
                      onChange={(e) => setAddedSpecies(e.target.value as "strong_acid" | "strong_base")}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="strong_acid">Strong Acid (H+ added)</option>
                      <option value="strong_base">Strong Base (OH- added)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Added Moles (mol)</span>
                      <input
                        type="number"
                        step="0.001"
                        value={addedMoles}
                        onChange={(e) => setAddedMoles(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                    </div>
                  </div>
                </>
              )}

              {(calcMode === "buffer_ph" || calcMode === "add_acid_base" || calcMode === "buffer_capacity") && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Conjugate Base [A-]</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={inputConjugateBaseConc}
                          onChange={(e) => setInputConjugateBaseConc(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">M</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Weak Acid [HA]</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={inputWeakAcidConc}
                          onChange={(e) => setInputWeakAcidConc(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">M</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Calculated Buffer pH" 
                val={results.calculatedPH.toFixed(2)} 
                icon={Atom} 
              />
              <ReadOnlyField 
                label="Buffer Capacity (beta)" 
                val={`${results.bufferCapacityBeta.toFixed(4)} M/pH`} 
                icon={Zap} 
              />

            </div>
          </div>

          {/* Integration Links to Henderson-Hasselbalch Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Dedicated Henderson-Hasselbalch solver?</span>
              <span className="text-[11px] text-slate-500">Try our Henderson-Hasselbalch Calculator</span>
            </div>
            <Link
              href="/calculators/henderson-hasselbalch-equation-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              HH Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Buffer Cockpit & Capacity Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Buffer Cards & Ratio */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Buffer Solution Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                results.isExhausted ? "bg-red-950 text-red-300 border border-red-800" : "bg-green-950 text-green-300 border border-green-800"
              }`}>
                {results.bufferStatus}
              </span>
            </div>

            {/* Buffer Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">pH</span>
                <span className="text-2xl font-black text-[#518231]">{results.calculatedPH.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">pKa</span>
                <span className="text-2xl font-black text-amber-400">{results.calculatedPKa.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">[A-]/[HA] Ratio</span>
                <span className="text-xs font-black text-white">{results.calculatedRatio.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Capacity (beta)</span>
                <span className="text-xs font-black text-white">{results.bufferCapacityBeta.toFixed(4)} M/pH</span>
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
                {(["buffer_range", "capacity_chart", "species_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "buffer_range" ? "🛡️ Buffer Model" : tab === "capacity_chart" ? "📈 Buffer Capacity" : tab === "species_chart" ? "📊 Species Distribution" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Method Explanation */}
                {visualTab === "buffer_range" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Buffer Chemistry Mathematical Model</h4>
                    <p className="leading-relaxed">
                      Method: <span className="font-bold text-[#518231]">{results.methodNote}</span>.
                      At temperature {temperatureC}°C, water autoionization constant Kw = {kwInfo.kw.toExponential(2)} (pKw = {results.pkw.toFixed(2)}).
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Buffer Capacity Chart */}
                {visualTab === "capacity_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Buffer Capacity (beta) vs pH</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={capacityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="pH" label={{ value: "pH", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "beta (M/pH)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="capacity" stroke="#518231" strokeWidth={3} dot={false} name="Buffer Capacity" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Recharts Species Distribution Chart */}
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

                {/* Tab 4: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Buffer Solution Study Flashcards</h4>
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

                {/* Tab 5: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Buffer Solution Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. 4.76)"
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
