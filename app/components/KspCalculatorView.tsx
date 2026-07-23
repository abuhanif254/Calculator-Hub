"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "s_from_ksp" 
  | "ksp_from_s" 
  | "qsp_calc" 
  | "common_ion" 
  | "missing_ion" 
  | "mass_solubility";

interface SaltPreset {
  id: string;
  name: string;
  formula: string;
  equationStr: string;
  cation: { name: string; coeff: number; charge: string };
  anion: { name: string; coeff: number; charge: string };
  ksp: number;
  molarMass: number; // g/mol
  stoichType: "1:1" | "1:2" | "2:1" | "1:3";
}

const SALT_PRESETS: SaltPreset[] = [
  {
    id: "agcl",
    name: "Silver Chloride (AgCl)",
    formula: "AgCl",
    equationStr: "AgCl(s) ⇌ Ag+(aq) + Cl-(aq)",
    cation: { name: "Ag+", coeff: 1, charge: "+1" },
    anion: { name: "Cl-", coeff: 1, charge: "-1" },
    ksp: 1.77e-10,
    molarMass: 143.32,
    stoichType: "1:1"
  },
  {
    id: "caf2",
    name: "Calcium Fluoride (CaF2)",
    formula: "CaF2",
    equationStr: "CaF2(s) ⇌ Ca2+(aq) + 2F-(aq)",
    cation: { name: "Ca2+", coeff: 1, charge: "+2" },
    anion: { name: "F-", coeff: 2, charge: "-1" },
    ksp: 3.45e-11,
    molarMass: 78.07,
    stoichType: "1:2"
  },
  {
    id: "ag2cro4",
    name: "Silver Chromate (Ag2CrO4)",
    formula: "Ag2CrO4",
    equationStr: "Ag2CrO4(s) ⇌ 2Ag+(aq) + CrO4^2-(aq)",
    cation: { name: "Ag+", coeff: 2, charge: "+1" },
    anion: { name: "CrO4^2-", coeff: 1, charge: "-2" },
    ksp: 1.12e-12,
    molarMass: 331.73,
    stoichType: "2:1"
  },
  {
    id: "al_oh3",
    name: "Aluminum Hydroxide (Al(OH)3)",
    formula: "Al(OH)3",
    equationStr: "Al(OH)3(s) ⇌ Al3+(aq) + 3OH-(aq)",
    cation: { name: "Al3+", coeff: 1, charge: "+3" },
    anion: { name: "OH-", coeff: 3, charge: "-1" },
    ksp: 1.3e-33,
    molarMass: 78.00,
    stoichType: "1:3"
  },
  {
    id: "baso4",
    name: "Barium Sulfate (BaSO4)",
    formula: "BaSO4",
    equationStr: "BaSO4(s) ⇌ Ba2+(aq) + SO4^2-(aq)",
    cation: { name: "Ba2+", coeff: 1, charge: "+2" },
    anion: { name: "SO4^2-", coeff: 1, charge: "-2" },
    ksp: 1.08e-10,
    molarMass: 233.38,
    stoichType: "1:1"
  },
  {
    id: "pbi2",
    name: "Lead(II) Iodide (PbI2)",
    formula: "PbI2",
    equationStr: "PbI2(s) ⇌ Pb2+(aq) + 2I-(aq)",
    cation: { name: "Pb2+", coeff: 1, charge: "+2" },
    anion: { name: "I-", coeff: 2, charge: "-1" },
    ksp: 9.8e-9,
    molarMass: 461.01,
    stoichType: "1:2"
  }
];

export function KspCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("s_from_ksp");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [selectedSaltId, setSelectedSaltId] = useState<string>("agcl");

  // Inputs
  const [inputKsp, setInputKsp] = useState<number>(1.77e-10);
  const [inputMolarSolubility, setInputMolarSolubility] = useState<number>(1.33e-5); // M
  const [inputCationConc, setInputCationConc] = useState<number>(1.33e-5); // M
  const [inputAnionConc, setInputAnionConc] = useState<number>(1.33e-5); // M
  const [inputCommonIonConc, setInputCommonIonConc] = useState<number>(0.10); // M common anion (e.g. 0.1M Cl-)

  // Current Salt Preset
  const salt = useMemo(() => {
    return SALT_PRESETS.find(s => s.id === selectedSaltId) || SALT_PRESETS[0];
  }, [selectedSaltId]);

  // Sync default Ksp when salt changes
  useEffect(() => {
    setInputKsp(salt.ksp);
  }, [salt]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"solubility_table" | "common_ion_chart" | "flashcards" | "quiz">("solubility_table");

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

  // Main Calculations Engine
  const results = useMemo(() => {
    const KspVal = Math.max(1e-45, inputKsp);
    const m = salt.cation.coeff;
    const n = salt.anion.coeff;

    let calculatedS = 0; // Molar solubility (mol/L)
    let calculatedKsp = KspVal;
    let calculatedQsp = 0;
    let calculatedMassSolubility = 0; // g/L
    let cationEqConc = 0;
    let anionEqConc = 0;
    let commonIonS = 0; // Reduced solubility with common ion
    let saturationState = "Unsaturated (No Precipitate)";
    let saturationBadge = "bg-blue-950 text-blue-300 border-blue-800";
    let formulaStr = `Ksp = [${salt.cation.name}]^${m} · [${salt.anion.name}]^${n}`;

    if (calcMode === "s_from_ksp") {
      // Ksp = (m*s)^m * (n*s)^n = m^m * n^n * s^(m+n)
      const factor = Math.pow(m, m) * Math.pow(n, n);
      const totalPower = m + n;
      calculatedS = Math.pow(KspVal / factor, 1 / totalPower);
      cationEqConc = m * calculatedS;
      anionEqConc = n * calculatedS;
      calculatedMassSolubility = calculatedS * salt.molarMass;
    } else if (calcMode === "ksp_from_s") {
      calculatedS = Math.max(1e-15, inputMolarSolubility);
      cationEqConc = m * calculatedS;
      anionEqConc = n * calculatedS;
      calculatedKsp = Math.pow(cationEqConc, m) * Math.pow(anionEqConc, n);
      calculatedMassSolubility = calculatedS * salt.molarMass;
    } else if (calcMode === "qsp_calc") {
      // Calculate Qsp = [Cation]^m * [Anion]^n
      cationEqConc = Math.max(1e-15, inputCationConc);
      anionEqConc = Math.max(1e-15, inputAnionConc);
      calculatedQsp = Math.pow(cationEqConc, m) * Math.pow(anionEqConc, n);

      if (calculatedQsp > KspVal * 1.01) {
        saturationState = "Supersaturated (Precipitation Thermodynamically Favored)";
        saturationBadge = "bg-[#518231]/20 text-[#518231] border-[#518231]/30";
      } else if (calculatedQsp >= KspVal * 0.99) {
        saturationState = "Saturated (At Solubility Equilibrium)";
        saturationBadge = "bg-[#518231]/20 text-[#518231] border-[#518231]/30";
      } else {
        saturationState = "Unsaturated (No Precipitate Formed)";
        saturationBadge = "bg-blue-950 text-blue-300 border-blue-800";
      }
    } else if (calcMode === "common_ion") {
      // Common anion case: [Anion] = inputCommonIonConc. Solves for [Cation] = m * s'
      const commonIon = Math.max(1e-8, inputCommonIonConc);
      // Approx Ksp ~ (m*s')^m * (commonIon)^n => s' = (Ksp / (commonIon^n * m^m))^(1/m)
      commonIonS = Math.pow(KspVal / (Math.pow(commonIon, n) * Math.pow(m, m)), 1 / m);
      calculatedS = commonIonS;
      cationEqConc = m * commonIonS;
      anionEqConc = commonIon;
      calculatedMassSolubility = commonIonS * salt.molarMass;
    } else {
      // Default fallback
      const factor = Math.pow(m, m) * Math.pow(n, n);
      calculatedS = Math.pow(KspVal / factor, 1 / (m + n));
      cationEqConc = m * calculatedS;
      anionEqConc = n * calculatedS;
      calculatedMassSolubility = calculatedS * salt.molarMass;
    }

    return {
      calculatedS,
      calculatedKsp,
      calculatedQsp,
      calculatedMassSolubility,
      cationEqConc,
      anionEqConc,
      commonIonS,
      saturationState,
      saturationBadge,
      formulaStr
    };
  }, [calcMode, inputKsp, inputMolarSolubility, inputCationConc, inputAnionConc, inputCommonIonConc, salt]);

  // Recharts Common-Ion Solubility Data (Molar Solubility vs Common Ion Conc)
  const commonIonData = useMemo(() => {
    const data = [];
    for (let c = 0.001; c <= 0.10; c += 0.01) {
      const m = salt.cation.coeff;
      const n = salt.anion.coeff;
      const KspVal = salt.ksp;
      const sPrime = Math.pow(KspVal / (Math.pow(c, n) * Math.pow(m, m)), 1 / m);

      data.push({
        commonIonM: Number(c.toFixed(3)),
        Solubility: Number((sPrime * 1e5).toFixed(3)) // scaled for chart
      });
    }
    return data;
  }, [salt]);

  // Flashcards Data
  const flashcards = [
    { title: "Solubility Product Constant (Ksp)", desc: "Ksp = [Cation]^m * [Anion]^n for a sparingly soluble salt M_m X_n(s) ⇌ m M^(+) + n X^(-). Solids are omitted." },
    { title: "Molar Solubility (s)", desc: "The number of moles of a sparingly soluble solute that dissolves in 1 liter of saturated solution to reach equilibrium." },
    { title: "Reaction Quotient (Qsp vs Ksp)", desc: "If Qsp < Ksp: Solution is unsaturated. If Qsp > Ksp: Solution is supersaturated and precipitation occurs." },
    { title: "Common-Ion Effect", desc: "Adding a common ion to a saturated solution shifts the equilibrium in reverse, drastically reducing the molar solubility of the salt." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Solubility Equilibrium Summary (${salt.name})
------------------------------------
Equation: ${salt.equationStr}
Ksp Expression: ${results.formulaStr}
Ksp Value: ${results.calculatedKsp.toExponential(3)}
Molar Solubility (s): ${results.calculatedS.toExponential(3)} M
Mass Solubility: ${results.calculatedMassSolubility.toFixed(5)} g/L
Equilibrium [${salt.cation.name}]: ${results.cationEqConc.toExponential(3)} M
Equilibrium [${salt.anion.name}]: ${results.anionEqConc.toExponential(3)} M
Saturation Status: ${results.saturationState}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Ksp analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the Ksp expression for AgCl(s) ⇌ Ag+(aq) + Cl-(aq)?", correctAnswer: "[AG+][CL-]" },
      { q: "True or False: Adding NaCl to a saturated AgCl solution decreases the solubility of AgCl.", correctAnswer: "TRUE" },
      { q: "If Qsp > Ksp, does a precipitate form?", correctAnswer: "YES" }
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
            Ksp Calculator
          </span>
          <Link href="/calculators/equilibrium-constant-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Equilibrium Constant Calculator
          </Link>
          <Link href="/calculators/ka-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ka Calculator
          </Link>
          <Link href="/calculators/kb-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Kb Calculator
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
                Ksp Input Cockpit
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
                <option value="s_from_ksp">1. Calculate Molar Solubility (s) from Ksp</option>
                <option value="ksp_from_s">2. Calculate Ksp from Molar Solubility (s)</option>
                <option value="qsp_calc">3. Qsp vs Ksp Precipitation Predictor</option>
                <option value="common_ion">4. Common-Ion Effect (Solubility in presence of common ion)</option>
              </select>
            </div>

            {/* Salt Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Sparingly Soluble Salt Preset</label>
              <select
                value={selectedSaltId}
                onChange={(e) => setSelectedSaltId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {SALT_PRESETS.map(s => (
                  <option key={s.id} value={s.id}>{s.name} [{s.stoichType}]</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              {calcMode !== "ksp_from_s" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Solubility Product (Ksp)</span>
                    <input
                      type="number"
                      step="0.0000000001"
                      value={inputKsp}
                      onChange={(e) => setInputKsp(Number(e.target.value))}
                      className="w-28 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {calcMode === "ksp_from_s" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Molar Solubility (s)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.000001"
                        value={inputMolarSolubility}
                        onChange={(e) => setInputMolarSolubility(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">M</span>
                    </div>
                  </div>
                </div>
              )}

              {calcMode === "qsp_calc" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>[{salt.cation.name}] Concentration</span>
                      <input
                        type="number"
                        step="0.00001"
                        value={inputCationConc}
                        onChange={(e) => setInputCationConc(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>[{salt.anion.name}] Concentration</span>
                      <input
                        type="number"
                        step="0.00001"
                        value={inputAnionConc}
                        onChange={(e) => setInputAnionConc(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                    </div>
                  </div>
                </>
              )}

              {calcMode === "common_ion" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Common Anion [{salt.anion.name}] Conc.</span>
                    <input
                      type="number"
                      step="0.01"
                      value={inputCommonIonConc}
                      onChange={(e) => setInputCommonIonConc(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Molar Solubility (s)" 
                val={`${results.calculatedS.toExponential(3)} M`} 
                icon={Atom} 
              />
              <ReadOnlyField 
                label="Mass Solubility" 
                val={`${results.calculatedMassSolubility.toFixed(5)} g/L`} 
                icon={Zap} 
              />

            </div>
          </div>

          {/* Integration Links to Equilibrium Constant Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">General chemical equilibrium & Kc/Kp?</span>
              <span className="text-[11px] text-slate-500">Try our companion Equilibrium Constant Calculator</span>
            </div>
            <Link
              href="/calculators/equilibrium-constant-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Kc/Kp Tool
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
                🧪 Solubility Equilibrium Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${results.saturationBadge}`}>
                {results.saturationState}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Ksp</span>
                <span className="text-xs font-black text-[#518231]">{results.calculatedKsp.toExponential(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Molar Sol. (s)</span>
                <span className="text-xs font-black text-amber-400">{results.calculatedS.toExponential(2)} M</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Mass Sol.</span>
                <span className="text-xs font-black text-white">{results.calculatedMassSolubility.toFixed(4)} g/L</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">[{salt.cation.name}] eq</span>
                <span className="text-xs font-black text-white">{results.cationEqConc.toExponential(2)} M</span>
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
                {(["solubility_table", "common_ion_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "solubility_table" ? "📋 Dissolution Table" : tab === "common_ion_chart" ? "📊 Common Ion Effect" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Dissolution Table */}
                {visualTab === "solubility_table" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Table size={16} className="text-[#518231]" />
                      Dissolution Stoichiometry Table ({salt.equationStr})
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2.5 text-left">Ion Species</th>
                            <th className="p-2.5 text-center">Stoichiometric Coeff</th>
                            <th className="p-2.5 text-center">Equilibrium Conc (M)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">Cation: {salt.cation.name}</td>
                            <td className="p-2.5 text-center">{salt.cation.coeff}</td>
                            <td className="p-2.5 text-center text-[#518231] font-bold">{results.cationEqConc.toExponential(3)} M</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">Anion: {salt.anion.name}</td>
                            <td className="p-2.5 text-center">{salt.anion.coeff}</td>
                            <td className="p-2.5 text-center text-amber-600 dark:text-amber-400 font-bold">{results.anionEqConc.toExponential(3)} M</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Expression: <span className="font-bold text-[#518231]">{results.formulaStr}</span>.
                      Molar Mass: {salt.molarMass} g/mol.
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Common Ion Plotter */}
                {visualTab === "common_ion_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molar Solubility vs Common Ion Concentration</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={commonIonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="commonIonM" label={{ value: "Added Common Ion [M]", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Solubility (x10^-5 M)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="Solubility" stroke="#3b82f6" strokeWidth={2} dot={false} name="Solubility s' (x10^-5 M)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ksp & Solubility Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ksp Chemistry Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. YES)"
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
