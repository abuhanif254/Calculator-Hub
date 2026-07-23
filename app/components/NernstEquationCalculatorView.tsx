"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "electrode_potential" 
  | "full_cell_potential" 
  | "concentration_cell" 
  | "ph_dependent" 
  | "gibbs_equilibrium";

interface RedoxCellPreset {
  id: string;
  name: string;
  equationStr: string;
  eStandard: number; // V
  nElectrons: number;
  anodeHalfStr: string;
  cathodeHalfStr: string;
  defaultQ: number;
}

const REDOX_CELL_PRESETS: RedoxCellPreset[] = [
  {
    id: "daniell",
    name: "Daniell Cell (Zn/Cu2+)",
    equationStr: "Zn(s) + Cu2+(aq) ⇌ Zn2+(aq) + Cu(s)",
    eStandard: 1.10, // V
    nElectrons: 2,
    anodeHalfStr: "Zn(s) ⇌ Zn2+(aq) + 2e- (E° = -0.76 V)",
    cathodeHalfStr: "Cu2+(aq) + 2e- ⇌ Cu(s) (E° = +0.34 V)",
    defaultQ: 0.10 // [Zn2+]/[Cu2+]
  },
  {
    id: "she",
    name: "Standard Hydrogen Electrode (SHE)",
    equationStr: "2H+(aq) + 2e- ⇌ H2(g)",
    eStandard: 0.00, // V
    nElectrons: 2,
    anodeHalfStr: "H2(g) ⇌ 2H+(aq) + 2e-",
    cathodeHalfStr: "2H+(aq) + 2e- ⇌ H2(g)",
    defaultQ: 1.00
  },
  {
    id: "ag_ag",
    name: "Silver / Silver Ion (Ag+/Ag)",
    equationStr: "Ag+(aq) + e- ⇌ Ag(s)",
    eStandard: 0.7996, // V
    nElectrons: 1,
    anodeHalfStr: "Ag(s) ⇌ Ag+(aq) + e-",
    cathodeHalfStr: "Ag+(aq) + e- ⇌ Ag(s)",
    defaultQ: 0.10
  },
  {
    id: "fe3_fe2",
    name: "Iron Redox Pair (Fe3+/Fe2+)",
    equationStr: "Fe3+(aq) + e- ⇌ Fe2+(aq)",
    eStandard: 0.771, // V
    nElectrons: 1,
    anodeHalfStr: "Fe2+(aq) ⇌ Fe3+(aq) + e-",
    cathodeHalfStr: "Fe3+(aq) + e- ⇌ Fe2+(aq)",
    defaultQ: 0.50
  },
  {
    id: "lead_acid",
    name: "Lead-Acid Battery Cell",
    equationStr: "Pb(s) + PbO2(s) + 2H2SO4(aq) ⇌ 2PbSO4(s) + 2H2O(l)",
    eStandard: 2.05, // V
    nElectrons: 2,
    anodeHalfStr: "Pb + SO4^2- ⇌ PbSO4 + 2e-",
    cathodeHalfStr: "PbO2 + 4H+ + SO4^2- + 2e- ⇌ PbSO4 + 2H2O",
    defaultQ: 0.01
  }
];

export function NernstEquationCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("electrode_potential");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("daniell");

  // Physical Constants
  const R_GAS = 8.31446; // J/(mol K)
  const FARADAY = 96485.33; // C/mol

  // Inputs
  const [inputEStandard, setInputEStandard] = useState<number>(1.10); // V
  const [inputECathode, setInputECathode] = useState<number>(0.34); // V
  const [inputEAnode, setInputEAnode] = useState<number>(-0.76); // V
  const [inputTempC, setInputTempC] = useState<number>(25); // deg C
  const [inputNElectrons, setInputNElectrons] = useState<number>(2);
  const [inputQ, setInputQ] = useState<number>(0.10); // Reaction Quotient
  const [inputCHigh, setInputCHigh] = useState<number>(1.00); // M
  const [inputCLow, setInputCLow] = useState<number>(0.01); // M
  const [inputPH, setInputPH] = useState<number>(7.00); // pH

  // Current Preset
  const preset = useMemo(() => {
    return REDOX_CELL_PRESETS.find(p => p.id === selectedPresetId) || REDOX_CELL_PRESETS[0];
  }, [selectedPresetId]);

  // Sync inputs when preset changes
  useEffect(() => {
    setInputEStandard(preset.eStandard);
    setInputNElectrons(preset.nElectrons);
    setInputQ(preset.defaultQ);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"temp_chart" | "cell_summary" | "flashcards" | "quiz">("temp_chart");

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
    const tempK = Math.max(1, inputTempC + 273.15);
    const n = Math.max(1, inputNElectrons);
    const QVal = Math.max(1e-30, inputQ);
    const E0 = calcMode === "full_cell_potential" ? (inputECathode - inputEAnode) : inputEStandard;

    // Nernst Pre-factor: (R * T) / (n * F) in Volts
    const nernstFactor = (R_GAS * tempK) / (n * FARADAY); // Volts per natural log unit
    const nernst25CLogFactor = 0.05916 / n; // 25C log10 factor

    // Non-standard potential calculation: E = E0 - (RT/nF) * ln(Q)
    let calculatedE = E0 - (nernstFactor * Math.log(QVal));

    if (calcMode === "concentration_cell") {
      const cHigh = Math.max(1e-6, inputCHigh);
      const cLow = Math.max(1e-6, inputCLow);
      const concRatio = Math.max(1, cHigh / cLow);
      calculatedE = nernstFactor * Math.log(concRatio); // E_cell = (RT/nF) * ln(Chigh/Clow)
    } else if (calcMode === "ph_dependent") {
      // Proton-coupled potential: E = E0 - 0.05916 * pH (at 25C)
      calculatedE = E0 - ((R_GAS * tempK * Math.LN10) / (n * FARADAY)) * inputPH;
    }

    // Gibbs Free Energy: ΔG = -n * F * E (J/mol -> kJ/mol)
    const gibbsEnergyKJ = (-n * FARADAY * calculatedE) / 1000;
    const gibbsStandardKJ = (-n * FARADAY * E0) / 1000;

    // Equilibrium Constant K from E0: K = exp(n * F * E0 / (R * T))
    const lnK = (n * FARADAY * E0) / (R_GAS * tempK);
    const log10K = lnK / Math.LN10;
    const KVal = Math.exp(Math.min(700, Math.max(-700, lnK)));

    // Spontaneity State
    let spontaneityState = "Spontaneous (Galvanic / Battery Mode)";
    let spontaneityBadge = "bg-green-950 text-green-300 border-green-800";

    if (calculatedE < -0.001) {
      spontaneityState = "Non-Spontaneous (Electrolytic / Reverse Driven)";
      spontaneityBadge = "bg-red-950 text-red-300 border-red-800";
    } else if (Math.abs(calculatedE) <= 0.001) {
      spontaneityState = "At Equilibrium (E_cell = 0 V, Dead Battery)";
      spontaneityBadge = "bg-blue-950 text-blue-300 border-blue-800";
    }

    return {
      tempK,
      E0,
      calculatedE,
      nernstFactor,
      nernst25CLogFactor,
      gibbsEnergyKJ,
      gibbsStandardKJ,
      lnK,
      log10K,
      KVal,
      spontaneityState,
      spontaneityBadge
    };
  }, [calcMode, inputEStandard, inputECathode, inputEAnode, inputTempC, inputNElectrons, inputQ, inputCHigh, inputCLow, inputPH]);

  // Recharts Temperature Sensitivity Data (E vs Temperature 0C to 100C)
  const tempSensitivityData = useMemo(() => {
    const data = [];
    const n = Math.max(1, inputNElectrons);
    const QVal = Math.max(1e-30, inputQ);
    const E0 = results.E0;

    for (let tC = 0; tC <= 100; tC += 10) {
      const tK = tC + 273.15;
      const factor = (R_GAS * tK) / (n * FARADAY);
      const eVal = E0 - (factor * Math.log(QVal));

      data.push({
        tempC: tC,
        PotentialV: Number(eVal.toFixed(4))
      });
    }
    return data;
  }, [inputNElectrons, inputQ, results.E0]);

  // Flashcards Data
  const flashcards = [
    { title: "Nernst Equation", desc: "E = E° - (RT/nF) * ln(Q). Relates cell potential under non-standard conditions to standard cell potential E°, temperature T, electron count n, and reaction quotient Q." },
    { title: "Faraday Constant (F)", desc: "F = 96,485 C/mol of electrons. Represents the total electrical charge carried by one mole of electrons." },
    { title: "Gibbs Free Energy & Potential", desc: "ΔG = -nFE. If cell potential E > 0, ΔG < 0, making the redox reaction thermodynamically spontaneous (galvanic cell)." },
    { title: "Equilibrium Constant K from E°", desc: "At equilibrium, E = 0 V and Q = K. Therefore, E° = (RT/nF) * ln(K) => ln(K) = (nFE°)/(RT)." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Nernst Electrochemistry Summary (${preset.name})
------------------------------------
Equation: ${preset.equationStr}
Standard Potential (E°): ${results.E0.toFixed(4)} V
Temperature: ${inputTempC} °C (${results.tempK.toFixed(2)} K)
Transferred Electrons (n): ${inputNElectrons}
Reaction Quotient (Q): ${inputQ}
Non-Standard Cell Potential (E): ${results.calculatedE.toFixed(4)} V
Gibbs Free Energy (ΔG): ${results.gibbsEnergyKJ.toFixed(2)} kJ/mol
Equilibrium Constant (log10 K): ${results.log10K.toFixed(2)}
Spontaneity: ${results.spontaneityState}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Electrochemistry summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "If cell potential E > 0 V, is the redox reaction spontaneous or non-spontaneous?", correctAnswer: "SPONTANEOUS" },
      { q: "What is the Nernst equation log10 pre-factor at 25°C divided by n?", correctAnswer: "0.05916" },
      { q: "True or False: Pure solids and pure liquids are included in the reaction quotient Q.", correctAnswer: "FALSE" }
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
          Electrochemistry Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Nernst Calculator
          </span>
          <Link href="/calculators/equilibrium-constant-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Equilibrium Constant Calculator
          </Link>
          <Link href="/calculators/ksp-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ksp Calculator
          </Link>
          <Link href="/calculators/solubility-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Solubility Calculator
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
                <Zap className="text-[#518231]" />
                Nernst Input Cockpit
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
                <option value="electrode_potential">1. Electrode Potential (E = E° - (RT/nF)lnQ)</option>
                <option value="full_cell_potential">2. Full Cell Potential (E_cell = E°_cath - E°_anode - (RT/nF)lnQ)</option>
                <option value="concentration_cell">3. Concentration Cell Potential (E_cell = (RT/nF)ln(Chigh/Clow))</option>
                <option value="ph_dependent">4. pH-Dependent Potential (E = E° - 0.05916 * pH)</option>
                <option value="gibbs_equilibrium">5. Gibbs Free Energy (ΔG) & Equilibrium Constant (K)</option>
              </select>
            </div>

            {/* Redox Cell Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Redox System Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {REDOX_CELL_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name} [E° = {p.eStandard} V]</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              {calcMode === "full_cell_potential" ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Cathode Standard Potential (E°_cathode)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={inputECathode}
                          onChange={(e) => setInputECathode(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">V</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Anode Standard Potential (E°_anode)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={inputEAnode}
                          onChange={(e) => setInputEAnode(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">V</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Standard Potential (E°)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.01"
                        value={inputEStandard}
                        onChange={(e) => setInputEStandard(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">V</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Temperature (T)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="1"
                      value={inputTempC}
                      onChange={(e) => setInputTempC(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">°C</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Transferred Electrons (n)</span>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={inputNElectrons}
                    onChange={(e) => setInputNElectrons(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                  />
                </div>
              </div>

              {calcMode === "concentration_cell" ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>High Concentration (C_high)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={inputCHigh}
                          onChange={(e) => setInputCHigh(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">M</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Low Concentration (C_low)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.001"
                          value={inputCLow}
                          onChange={(e) => setInputCLow(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">M</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : calcMode === "ph_dependent" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Solution pH</span>
                    <input
                      type="number"
                      step="0.1"
                      value={inputPH}
                      onChange={(e) => setInputPH(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Reaction Quotient (Q)</span>
                    <input
                      type="number"
                      step="0.01"
                      value={inputQ}
                      onChange={(e) => setInputQ(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Non-Standard Cell Potential (E)" 
                val={`${results.calculatedE.toFixed(4)} V`} 
                icon={Zap} 
              />
              <ReadOnlyField 
                label="Gibbs Free Energy (ΔG)" 
                val={`${results.gibbsEnergyKJ.toFixed(2)} kJ/mol`} 
                icon={Flame} 
              />

            </div>
          </div>

          {/* Integration Links to Equilibrium Constant Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Chemical equilibrium & Kc/Kp?</span>
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

        {/* Right Column: Interactive Cockpit & Recharts Thermal Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Nernst Electrochemistry Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${results.spontaneityBadge}`}>
                {results.spontaneityState}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">E_cell</span>
                <span className="text-xs font-black text-[#518231]">{results.calculatedE.toFixed(4)} V</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">E°_standard</span>
                <span className="text-xs font-black text-amber-400">{results.E0.toFixed(4)} V</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">ΔG (kJ/mol)</span>
                <span className="text-xs font-black text-white">{results.gibbsEnergyKJ.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">log10 K</span>
                <span className="text-xs font-black text-white">{results.log10K.toFixed(2)}</span>
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
                {(["temp_chart", "cell_summary", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "temp_chart" ? "📊 Temperature Plot" : tab === "cell_summary" ? "📋 Redox Half-Cells" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Recharts Temperature Plotter */}
                {visualTab === "temp_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cell Potential E (V) vs Temperature T (°C)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tempSensitivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="tempC" label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Potential E (V)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="PotentialV" stroke="#eab308" strokeWidth={2} dot={true} name="Cell Potential E (V)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 2: Cell Summary Table */}
                {visualTab === "cell_summary" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Table size={16} className="text-[#518231]" />
                      Redox Cell Half-Reaction Breakdown ({preset.name})
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2.5 text-left">Electrode</th>
                            <th className="p-2.5 text-left">Half-Reaction</th>
                            <th className="p-2.5 text-center">Process</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">Anode (-)</td>
                            <td className="p-2.5 text-slate-600 dark:text-slate-300">{preset.anodeHalfStr}</td>
                            <td className="p-2.5 text-center text-amber-600 font-bold">Oxidation (Loss of e-)</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">Cathode (+)</td>
                            <td className="p-2.5 text-slate-600 dark:text-slate-300">{preset.cathodeHalfStr}</td>
                            <td className="p-2.5 text-center text-[#518231] font-bold">Reduction (Gain of e-)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Overall Cell Equation: <span className="font-bold text-slate-900 dark:text-white">{preset.equationStr}</span>.
                      Transferred Electrons n = {inputNElectrons}.
                    </p>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrochemistry Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrochemistry Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. SPONTANEOUS)"
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
