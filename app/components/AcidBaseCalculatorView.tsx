"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "quick_ph" 
  | "strong_acid" 
  | "strong_base" 
  | "weak_acid" 
  | "weak_base" 
  | "ka_kb_conv" 
  | "neutralization" 
  | "polyprotic";

const TEMPERATURE_KW: { [temp: number]: { kw: number; pkw: number; neutralPh: number } } = {
  0: { kw: 1.14e-15, pkw: 14.94, neutralPh: 7.47 },
  25: { kw: 1.00e-14, pkw: 14.00, neutralPh: 7.00 },
  37: { kw: 2.40e-14, pkw: 13.62, neutralPh: 6.81 },
  60: { kw: 9.60e-14, pkw: 13.02, neutralPh: 6.51 }
};

export function AcidBaseCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("quick_ph");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputConc, setInputConc] = useState<number>(0.10); // 0.10 M
  const [inputKa, setInputKa] = useState<number>(1.8e-5); // Acetic Acid Ka
  const [inputKb, setInputKb] = useState<number>(1.8e-5); // Ammonia Kb
  const [inputPKa, setInputPKa] = useState<number>(4.76);
  const [inputPKb, setInputPKb] = useState<number>(4.75);

  // Strong Acid/Base Types
  const [strongAcidType, setStrongAcidType] = useState<"monoprotic" | "diprotic">("monoprotic");
  const [strongBaseType, setStrongBaseType] = useState<"monoprotic" | "diprotic">("monoprotic");

  // Neutralization Inputs
  const [acidMoles, setAcidMoles] = useState<number>(0.05); // 0.05 mol H+
  const [baseMoles, setBaseMoles] = useState<number>(0.05); // 0.05 mol OH-
  const [solutionVolumeL, setSolutionVolumeL] = useState<number>(1.0);

  // Polyprotic pKas
  const [pKa1, setPKa1] = useState<number>(2.14); // Phosphoric acid pKa1
  const [pKa2, setPKa2] = useState<number>(7.20); // Phosphoric acid pKa2
  const [pKa3, setPKa3] = useState<number>(12.37); // Phosphoric acid pKa3

  // Temperature
  const [temperatureC, setTemperatureC] = useState<number>(25);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"ph_scale" | "titration_chart" | "species_chart" | "flashcards" | "quiz">("ph_scale");

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
    let hPlus = 1e-7;
    let ohMinus = 1e-7;
    let percentIonization = 0;
    let classification = "Neutral";
    let methodNote = "";

    const C = Math.max(1e-8, inputConc);

    if (calcMode === "quick_ph" || calcMode === "strong_acid") {
      const factor = strongAcidType === "diprotic" ? 2 : 1;
      hPlus = C * factor;
      calculatedPH = -Math.log10(hPlus);
      calculatedPOH = kwInfo.pkw - calculatedPH;
      ohMinus = Math.pow(10, -calculatedPOH);
      percentIonization = 100;
      classification = "Strongly Acidic";
      methodNote = strongAcidType === "diprotic" 
        ? "Strong Diprotic Acid: [H+] = 2 * C" 
        : "Strong Monoprotic Acid: [H+] = C";
    } else if (calcMode === "strong_base") {
      const factor = strongBaseType === "diprotic" ? 2 : 1;
      ohMinus = C * factor;
      calculatedPOH = -Math.log10(ohMinus);
      calculatedPH = kwInfo.pkw - calculatedPOH;
      hPlus = Math.pow(10, -calculatedPH);
      percentIonization = 100;
      classification = "Strongly Basic";
      methodNote = strongBaseType === "diprotic" 
        ? "Strong Diprotic Base: [OH-] = 2 * C" 
        : "Strong Monoprotic Base: [OH-] = C";
    } else if (calcMode === "weak_acid") {
      const KaVal = Math.max(1e-15, inputKa);
      // Quadratic: x^2 + Ka*x - Ka*C = 0 => x = (-Ka + sqrt(Ka^2 + 4*Ka*C))/2
      const x = (-KaVal + Math.sqrt(KaVal * KaVal + 4 * KaVal * C)) / 2;
      hPlus = Math.max(1e-14, x);
      calculatedPH = -Math.log10(hPlus);
      calculatedPOH = kwInfo.pkw - calculatedPH;
      ohMinus = Math.pow(10, -calculatedPOH);
      percentIonization = (x / C) * 100;
      classification = calculatedPH < 7 ? "Weakly Acidic" : "Neutral";
      methodNote = "Exact Quadratic Weak Acid Equilibrium: x^2 + Ka*x - Ka*C = 0";
    } else if (calcMode === "weak_base") {
      const KbVal = Math.max(1e-15, inputKb);
      // Quadratic: x^2 + Kb*x - Kb*C = 0
      const x = (-KbVal + Math.sqrt(KbVal * KbVal + 4 * KbVal * C)) / 2;
      ohMinus = Math.max(1e-14, x);
      calculatedPOH = -Math.log10(ohMinus);
      calculatedPH = kwInfo.pkw - calculatedPOH;
      hPlus = Math.pow(10, -calculatedPH);
      percentIonization = (x / C) * 100;
      classification = calculatedPH > 7 ? "Weakly Basic" : "Neutral";
      methodNote = "Exact Quadratic Weak Base Equilibrium: x^2 + Kb*x - Kb*C = 0";
    } else if (calcMode === "ka_kb_conv") {
      const KaVal = Math.max(1e-15, inputKa);
      const KbVal = kwInfo.kw / KaVal;
      const pKaVal = -Math.log10(KaVal);
      const pKbVal = kwInfo.pkw - pKaVal;
      calculatedPH = pKaVal;
      methodNote = "Conjugate Pair Conjugate Relation: Ka * Kb = Kw";
      return {
        calculatedPH: pKaVal,
        calculatedPOH: pKbVal,
        hPlus: KaVal,
        ohMinus: KbVal,
        percentIonization: 0,
        classification: "Conjugate Equilibrium",
        methodNote,
        pkw: kwInfo.pkw,
        derivedKa: KaVal,
        derivedKb: KbVal,
        derivedPKa: pKaVal,
        derivedPKb: pKbVal
      };
    } else if (calcMode === "neutralization") {
      const excessH = acidMoles - baseMoles;
      const vol = Math.max(0.001, solutionVolumeL);
      if (Math.abs(excessH) < 1e-9) {
        calculatedPH = kwInfo.neutralPh;
        calculatedPOH = kwInfo.neutralPh;
        classification = "Neutral";
        methodNote = "Exact Stoichiometric Neutralization: Equal moles of H+ and OH-";
      } else if (excessH > 0) {
        hPlus = excessH / vol;
        calculatedPH = -Math.log10(hPlus);
        calculatedPOH = kwInfo.pkw - calculatedPH;
        classification = "Acidic Excess";
        methodNote = "Neutralization with Excess H+ Acid";
      } else {
        ohMinus = Math.abs(excessH) / vol;
        calculatedPOH = -Math.log10(ohMinus);
        calculatedPH = kwInfo.pkw - calculatedPOH;
        classification = "Basic Excess";
        methodNote = "Neutralization with Excess OH- Base";
      }
    } else {
      // Polyprotic Mode
      calculatedPH = (pKa1 + pKa2) / 2;
      calculatedPOH = kwInfo.pkw - calculatedPH;
      classification = "Polyprotic Intermediate Species";
      methodNote = "Polyprotic Amphiprotic Isoelectric pH = (pKa1 + pKa2) / 2";
    }

    return {
      calculatedPH,
      calculatedPOH,
      hPlus,
      ohMinus,
      percentIonization,
      classification,
      methodNote,
      pkw: kwInfo.pkw,
      derivedKa: inputKa,
      derivedKb: inputKb,
      derivedPKa: inputPKa,
      derivedPKb: inputPKb
    };
  }, [calcMode, inputConc, inputKa, inputKb, inputPKa, inputPKb, strongAcidType, strongBaseType, acidMoles, baseMoles, solutionVolumeL, pKa1, pKa2, pKa3, kwInfo]);

  // Recharts Titration Curve Plot Data
  const titrationData = useMemo(() => {
    const data = [];
    const KaVal = Math.pow(10, -inputPKa);
    const Cacid = 0.10;
    const Vacid = 50.0; // 50 mL weak acid

    for (let Vbase = 0; Vbase <= 100; Vbase += 5) {
      let ph = 7.0;
      if (Vbase === 0) {
        ph = -0.5 * Math.log10(KaVal * Cacid);
      } else if (Vbase < 50) {
        // Buffer region
        const ratio = Vbase / (50 - Vbase);
        ph = inputPKa + Math.log10(ratio);
      } else if (Vbase === 50) {
        // Equivalence point
        ph = inputPKa;
      } else {
        // Post-equivalence
        const excessOH = (0.10 * (Vbase - 50)) / (Vacid + Vbase);
        const poh = -Math.log10(excessOH);
        ph = 14.00 - poh;
      }
      data.push({
        volume: Vbase,
        pH: Number(Math.max(0, Math.min(14, ph)).toFixed(2))
      });
    }
    return data;
  }, [inputPKa]);

  // Recharts Species Distribution Data (% HA vs % A-)
  const speciesData = useMemo(() => {
    const data = [];
    const KaVal = Math.pow(10, -inputPKa);

    for (let ph = inputPKa - 3; ph <= inputPKa + 3; ph += 0.25) {
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
  }, [inputPKa]);

  // Flashcards Data
  const flashcards = [
    { title: "Acid & Base Definitions", desc: "Arrhenius: Acids produce H+, Bases produce OH-. Brønsted-Lowry: Acids donate proton H+, Bases accept proton H+." },
    { title: "pH & pOH Relationship", desc: "pH = -log10[H+], pOH = -log10[OH-]. At 25°C, pH + pOH = 14.00 (pKw)." },
    { title: "Ka and Kb Conjugate Pair Constant", desc: "For any conjugate acid-base pair in water: Ka * Kb = Kw (1.0 x 10^-14 at 25°C), and pKa + pKb = 14.00." },
    { title: "Half-Equivalence Point in Titration", desc: "At the half-equivalence point during a weak acid titration with a strong base, [HA] = [A-], so pH = pKa." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Acid-Base Chemistry & Equilibrium Summary
----------------------------------------------
Selected Mode: ${calcMode}
Temperature: ${temperatureC}°C (pKw = ${results.pkw.toFixed(2)})
Calculated pH: ${results.calculatedPH.toFixed(2)}
Calculated pOH: ${results.calculatedPOH.toFixed(2)}
Hydrogen Ion [H+]: ${results.hPlus.toExponential(3)} M
Hydroxide Ion [OH-]: ${results.ohMinus.toExponential(3)} M
Percent Ionization: ${results.percentIonization.toFixed(2)}%
Classification: ${results.classification}
Calculation Method: ${results.methodNote}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Acid-Base analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the pH of a 0.01 M HCl solution (strong acid)?", correctAnswer: "2.00" },
      { q: "True or False: For any conjugate acid-base pair at 25°C, Ka * Kb = 1.0 x 10^-14.", correctAnswer: "TRUE" },
      { q: "What is the pOH of a solution with pH = 4.00 at 25°C?", correctAnswer: "10.00" }
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
            Acid-Base Calculator
          </span>
          <Link href="/calculators/buffer-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Buffer Calculator
          </Link>
          <Link href="/calculators/henderson-hasselbalch-equation-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Henderson-Hasselbalch
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
                Acid-Base Cockpit
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
                <option value="quick_ph">1. Quick pH & Classification</option>
                <option value="strong_acid">2. Strong Acid Dissociation (HCl, H2SO4)</option>
                <option value="strong_base">3. Strong Base Dissociation (NaOH, Ca(OH)2)</option>
                <option value="weak_acid">4. Weak Acid Equilibrium (Ka & Quadratic Solver)</option>
                <option value="weak_base">5. Weak Base Equilibrium (Kb & Quadratic Solver)</option>
                <option value="ka_kb_conv">6. Ka / Kb & pKa / pKb Conjugate Converter</option>
                <option value="neutralization">7. Stoichiometric Neutralization Simulator</option>
                <option value="polyprotic">8. Polyprotic Acid Species Distribution (H3A)</option>
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
              
              {(calcMode === "quick_ph" || calcMode === "strong_acid" || calcMode === "strong_base" || calcMode === "weak_acid" || calcMode === "weak_base") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Molar Concentration (C)</span>
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

              {calcMode === "strong_acid" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Acid Type</label>
                  <select
                    value={strongAcidType}
                    onChange={(e) => setStrongAcidType(e.target.value as "monoprotic" | "diprotic")}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="monoprotic">Monoprotic Strong Acid (HCl, HNO3)</option>
                    <option value="diprotic">Diprotic Strong Acid (H2SO4)</option>
                  </select>
                </div>
              )}

              {calcMode === "strong_base" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Base Type</label>
                  <select
                    value={strongBaseType}
                    onChange={(e) => setStrongBaseType(e.target.value as "monoprotic" | "diprotic")}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="monoprotic">Monoprotic Strong Base (NaOH, KOH)</option>
                    <option value="diprotic">Diprotic Strong Base (Ca(OH)2, Ba(OH)2)</option>
                  </select>
                </div>
              )}

              {(calcMode === "weak_acid" || calcMode === "ka_kb_conv") && (
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

              {calcMode === "weak_base" && (
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

              {calcMode === "neutralization" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Acid Moles (H+)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={acidMoles}
                        onChange={(e) => setAcidMoles(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Base Moles (OH-)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={baseMoles}
                        onChange={(e) => setBaseMoles(Number(e.target.value))}
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
                icon={Zap} 
              />

            </div>
          </div>

          {/* Integration Links to Buffer Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Analyzing buffer capacity & design?</span>
              <span className="text-[11px] text-slate-500">Try our dedicated Buffer Calculator</span>
            </div>
            <Link
              href="/calculators/buffer-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Buffer Tool
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
                🧪 Acid-Base Analysis Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-green-950 text-green-300 border border-green-800">
                {results.classification}
              </span>
            </div>

            {/* Readout Cards Grid */}
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
                <span className="text-xs font-black text-white">{results.hPlus.toExponential(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">% Ionization</span>
                <span className="text-xs font-black text-white">{results.percentIonization.toFixed(1)}%</span>
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
                {(["ph_scale", "titration_chart", "species_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "ph_scale" ? "🛡️ pH Spectrum" : tab === "titration_chart" ? "📈 Titration Curve" : tab === "species_chart" ? "📊 Species Distribution" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Method Explanation */}
                {visualTab === "ph_scale" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Acid-Base Equilibrium Model</h4>
                    <p className="leading-relaxed">
                      Method: <span className="font-bold text-[#518231]">{results.methodNote}</span>.
                      At temperature {temperatureC}°C, water autoionization constant Kw = {kwInfo.kw.toExponential(2)} (pKw = {results.pkw.toFixed(2)}).
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Titration Chart */}
                {visualTab === "titration_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Acid-Base Titration Curve (pH vs Titrant Volume)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={titrationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="volume" label={{ value: "Added Base Volume (mL)", position: "insideBottom", offset: -5 }} />
                          <YAxis domain={[0, 14]} label={{ value: "pH", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="pH" stroke="#518231" strokeWidth={3} dot={false} name="pH" />
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Acid-Base Chemistry Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Acid-Base Chemistry Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. 2.00)"
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
