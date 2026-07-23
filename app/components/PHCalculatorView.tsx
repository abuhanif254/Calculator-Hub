"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "ph_from_h" 
  | "h_from_ph" 
  | "poh_from_oh" 
  | "oh_from_poh" 
  | "ph_poh_converter" 
  | "strong_acid_ph" 
  | "strong_base_ph" 
  | "weak_acid_ph" 
  | "weak_base_ph" 
  | "buffer_ph" 
  | "henderson_hasselbalch" 
  | "titration_analysis";

const TEMPERATURE_KW: { [temp: number]: { kw: number; pkw: number; neutralPh: number } } = {
  0: { kw: 1.14e-15, pkw: 14.94, neutralPh: 7.47 },
  25: { kw: 1.00e-14, pkw: 14.00, neutralPh: 7.00 },
  37: { kw: 2.40e-14, pkw: 13.62, neutralPh: 6.81 },
  60: { kw: 9.60e-14, pkw: 13.02, neutralPh: 6.51 }
};

export function PHCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("ph_from_h");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputHConc, setInputHConc] = useState<number>(0.001); // 1e-3 M
  const [inputPH, setInputPH] = useState<number>(3.00);
  const [inputOHConc, setInputOHConc] = useState<number>(1e-11);
  const [inputPOH, setInputPOH] = useState<number>(11.00);
  const [temperatureC, setTemperatureC] = useState<number>(25);

  // Weak Acid Inputs
  const [weakAcidConc, setWeakAcidConc] = useState<number>(0.10);
  const [weakAcidKa, setWeakAcidKa] = useState<number>(1.8e-5); // Acetic Acid Ka = 1.8e-5

  // Buffer Inputs
  const [pKaVal, setPKaVal] = useState<number>(4.76); // Acetic Acid pKa = 4.76
  const [conjugateBaseConc, setConjugateBaseConc] = useState<number>(0.10);
  const [weakAcidBufferConc, setWeakAcidBufferConc] = useState<number>(0.10);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"ph_scale" | "titration_chart" | "flashcards" | "quiz">("ph_scale");

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
    let calculatedPH = 7.00;
    let calculatedPOH = 7.00;
    let calculatedH = 1e-7;
    let calculatedOH = 1e-7;
    let methodNote = "";

    if (calcMode === "ph_from_h") {
      calculatedH = Math.max(1e-16, inputHConc);
      calculatedPH = -Math.log10(calculatedH);
      calculatedPOH = kwInfo.pkw - calculatedPH;
      calculatedOH = Math.pow(10, -calculatedPOH);
      methodNote = "pH = -log10[H+]";
    } else if (calcMode === "h_from_ph") {
      calculatedPH = inputPH;
      calculatedH = Math.pow(10, -calculatedPH);
      calculatedPOH = kwInfo.pkw - calculatedPH;
      calculatedOH = Math.pow(10, -calculatedPOH);
      methodNote = "[H+] = 10^(-pH)";
    } else if (calcMode === "poh_from_oh") {
      calculatedOH = Math.max(1e-16, inputOHConc);
      calculatedPOH = -Math.log10(calculatedOH);
      calculatedPH = kwInfo.pkw - calculatedPOH;
      calculatedH = Math.pow(10, -calculatedPH);
      methodNote = "pOH = -log10[OH-], pH = pKw - pOH";
    } else if (calcMode === "weak_acid_ph") {
      // Quadratic Solver: x^2 + Ka*x - Ka*C = 0
      const C = Math.max(1e-6, weakAcidConc);
      const Ka = Math.max(1e-14, weakAcidKa);
      const hPlus = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * C)) / 2;
      calculatedH = hPlus;
      calculatedPH = -Math.log10(calculatedH);
      calculatedPOH = kwInfo.pkw - calculatedPH;
      calculatedOH = Math.pow(10, -calculatedPOH);
      methodNote = "Equilibrium Quadratic Solver: Ka = [H+][A-]/[HA]";
    } else if (calcMode === "buffer_ph" || calcMode === "henderson_hasselbalch") {
      const baseHA = Math.max(1e-6, weakAcidBufferConc);
      const baseA = Math.max(1e-6, conjugateBaseConc);
      calculatedPH = pKaVal + Math.log10(baseA / baseHA);
      calculatedPOH = kwInfo.pkw - calculatedPH;
      calculatedH = Math.pow(10, -calculatedPH);
      calculatedOH = Math.pow(10, -calculatedPOH);
      methodNote = "Henderson-Hasselbalch: pH = pKa + log10([A-]/[HA])";
    } else {
      calculatedH = Math.max(1e-16, inputHConc);
      calculatedPH = -Math.log10(calculatedH);
      calculatedPOH = kwInfo.pkw - calculatedPH;
      calculatedOH = Math.pow(10, -calculatedPOH);
      methodNote = "Standard Logarithmic pH Calculation";
    }

    // Classification
    let classification = "Neutral";
    if (calculatedPH < kwInfo.neutralPh - 0.2) classification = "Acidic";
    else if (calculatedPH > kwInfo.neutralPh + 0.2) classification = "Basic / Alkaline";

    return {
      calculatedPH,
      calculatedPOH,
      calculatedH,
      calculatedOH,
      classification,
      methodNote,
      neutralPh: kwInfo.neutralPh,
      pkw: kwInfo.pkw
    };
  }, [calcMode, inputHConc, inputPH, inputOHConc, weakAcidConc, weakAcidKa, pKaVal, conjugateBaseConc, weakAcidBufferConc, kwInfo]);

  // Recharts Titration Curve Simulation Data
  const titrationData = useMemo(() => {
    const data = [];
    const vEquiv = 25.0; // 25 mL equivalence point
    for (let v = 0; v <= 50; v += 2) {
      let ph = 3.0;
      if (v < vEquiv) {
        ph = 3.0 + (v / vEquiv) * 1.8;
      } else if (v === vEquiv) {
        ph = 7.0;
      } else {
        ph = 7.0 + ((v - vEquiv) / 25.0) * 5.5;
      }
      data.push({ volume: v, pH: Number(ph.toFixed(2)) });
    }
    return data;
  }, []);

  // Flashcards Data
  const flashcards = [
    { title: "pH Definition", desc: "pH = -log10[H+]. A logarithmic measure of hydrogen ion concentration in an aqueous solution." },
    { title: "pOH Definition", desc: "pOH = -log10[OH-]. A logarithmic measure of hydroxide ion concentration." },
    { title: "pH + pOH = pKw", desc: "At 25°C, pKw = 14.00, so pH + pOH = 14.00. At 37°C (body temperature), neutral pH is 6.81." },
    { title: "Henderson-Hasselbalch Equation", desc: "pH = pKa + log10([A-]/[HA]). Used to calculate the pH of buffer solutions." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `pH & Acid-Base Equilibrium Analysis Summary
-----------------------------------------
Selected Mode: ${calcMode}
Temperature: ${temperatureC}°C (pKw = ${results.pkw.toFixed(2)}, Neutral pH = ${results.neutralPh.toFixed(2)})
Calculated pH: ${results.calculatedPH.toFixed(2)}
Calculated pOH: ${results.calculatedPOH.toFixed(2)}
Hydrogen Ion Concentration [H+]: ${results.calculatedH.toExponential(3)} M
Hydroxide Ion Concentration [OH-]: ${results.calculatedOH.toExponential(3)} M
Classification: ${results.classification}
Calculation Method: ${results.methodNote}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "pH analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the pH of a solution with [H+] = 1.0 × 10⁻³ M?", correctAnswer: "3.00" },
      { q: "What is the pOH of a solution with pH = 4.00 at 25°C?", correctAnswer: "10.00" },
      { q: "True or False: Neutral pH is always 7.00 regardless of temperature.", correctAnswer: "FALSE" }
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
            pH Calculator
          </span>
          <Link href="/calculators/molarity-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity
          </Link>
          <Link href="/calculators/dilution-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Dilution
          </Link>
          <Link href="/calculators/stoichiometry-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Stoichiometry
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
                pH Input Cockpit
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
                <option value="ph_from_h">1. pH from Hydrogen Ion [H+]</option>
                <option value="h_from_ph">2. [H+] from pH</option>
                <option value="poh_from_oh">3. pOH from Hydroxide Ion [OH-]</option>
                <option value="weak_acid_ph">4. Weak Acid pH (Equilibrium Quadratic Solver)</option>
                <option value="buffer_ph">5. Buffer pH (Henderson-Hasselbalch)</option>
                <option value="titration_analysis">6. Titration Curve Analysis</option>
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
                <option value={25}>25°C (Standard, pKw = 14.00, Neutral = 7.00)</option>
                <option value={37}>37°C (Body Temp, pKw = 13.62, Neutral = 6.81)</option>
                <option value={0}>0°C (Ice Point, pKw = 14.94, Neutral = 7.47)</option>
                <option value={60}>60°C (Hot Water, pKw = 13.02, Neutral = 6.51)</option>
              </select>
            </div>

            {/* Dynamic Input Controls */}
            <div className="space-y-5">
              
              {calcMode === "ph_from_h" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Hydrogen Ion Concentration [H+]</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.0001"
                        value={inputHConc}
                        onChange={(e) => setInputHConc(Number(e.target.value))}
                        className="w-28 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">M</span>
                    </div>
                  </div>
                </div>
              )}

              {calcMode === "h_from_ph" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Target pH Value</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="14"
                        value={inputPH}
                        onChange={(e) => setInputPH(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {calcMode === "weak_acid_ph" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Weak Acid Initial Concentration</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={weakAcidConc}
                          onChange={(e) => setWeakAcidConc(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">M</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Acid Dissociation Constant (Ka)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.00001"
                          value={weakAcidKa}
                          onChange={(e) => setWeakAcidKa(Number(e.target.value))}
                          className="w-28 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {calcMode === "buffer_ph" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Weak Acid pKa</span>
                      <input
                        type="number"
                        step="0.01"
                        value={pKaVal}
                        onChange={(e) => setPKaVal(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Conjugate Base [A-]</span>
                      <input
                        type="number"
                        step="0.01"
                        value={conjugateBaseConc}
                        onChange={(e) => setConjugateBaseConc(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Calculated pH" 
                val={results.calculatedPH.toFixed(2)} 
                icon={Atom} 
              />
              <ReadOnlyField 
                label="Calculated pOH" 
                val={results.calculatedPOH.toFixed(2)} 
                icon={Droplet} 
              />

            </div>
          </div>

          {/* Integration Links to Molarity Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Calculate solution molarity from mass & volume?</span>
              <span className="text-[11px] text-slate-500">Try our Molarity Calculator</span>
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

        {/* Right Column: Interactive Acid-Base Cockpit & Titration Curve */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: pH & Ion Concentration Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Acid-Base Equilibrium Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                results.classification === "Acidic" ? "bg-red-950 text-red-300 border border-red-800" :
                results.classification === "Basic / Alkaline" ? "bg-blue-950 text-blue-300 border border-blue-800" :
                "bg-green-950 text-green-300 border border-green-800"
              }`}>
                {results.classification}
              </span>
            </div>

            {/* pH & Ion Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">pH</span>
                <span className="text-2xl font-black text-[#518231]">{results.calculatedPH.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">pOH</span>
                <span className="text-2xl font-black text-amber-400">{results.calculatedPOH.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">[H+] (M)</span>
                <span className="text-xs font-black text-white">{results.calculatedH.toExponential(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">[OH-] (M)</span>
                <span className="text-xs font-black text-white">{results.calculatedOH.toExponential(2)}</span>
              </div>
            </div>

            {/* Dynamic 0-14 pH Spectrum Bar */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span>0 (Acidic)</span>
                <span>Neutral ({results.neutralPh.toFixed(2)})</span>
                <span>14 (Alkaline)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 relative overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 w-2 bg-white shadow-lg transform -translate-x-1/2 transition-all duration-300"
                  style={{ left: `${Math.min(100, Math.max(0, (results.calculatedPH / 14) * 100))}%` }}
                />
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
                {(["ph_scale", "titration_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "ph_scale" ? "🌈 Equilibrium Method" : tab === "titration_chart" ? "📈 Titration Curve" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Method Explanation */}
                {visualTab === "ph_scale" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Acid-Base Mathematical Model</h4>
                    <p className="leading-relaxed">
                      Method: <span className="font-bold text-[#518231]">{results.methodNote}</span>.
                      At temperature {temperatureC}°C, water autoionization constant Kw = {kwInfo.kw.toExponential(2)} (pKw = {results.pkw.toFixed(2)}).
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Titration Curve Chart */}
                {visualTab === "titration_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Acid-Base Titration Curve Simulation</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={titrationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="volume" label={{ value: "Titrant Volume (mL)", position: "insideBottom", offset: -5 }} />
                          <YAxis domain={[0, 14]} label={{ value: "pH", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="pH" stroke="#518231" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">pH & Acid-Base Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">pH & Acid-Base Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. 3.00)"
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
