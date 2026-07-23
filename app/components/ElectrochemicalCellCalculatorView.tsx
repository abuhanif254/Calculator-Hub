"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CellType = "galvanic" | "electrolytic" | "concentration" | "custom";

interface CellPreset {
  id: string;
  name: string;
  type: CellType;
  anodeName: string;
  anodeHalfReaction: string;
  anodeE0: number; // Standard Reduction Potential (V)
  anodeConc: number; // M
  cathodeName: string;
  cathodeHalfReaction: string;
  cathodeE0: number; // Standard Reduction Potential (V)
  cathodeConc: number; // M
  nElectrons: number;
  cellNotation: string;
}

const CELL_PRESETS: CellPreset[] = [
  {
    id: "daniell",
    name: "Daniell Cell (Zn | Zn2+ || Cu2+ | Cu)",
    type: "galvanic",
    anodeName: "Zinc Anode (Zn)",
    anodeHalfReaction: "Zn(s) ⇌ Zn2+(aq) + 2e-",
    anodeE0: -0.763,
    anodeConc: 0.10,
    cathodeName: "Copper Cathode (Cu)",
    cathodeHalfReaction: "Cu2+(aq) + 2e- ⇌ Cu(s)",
    cathodeE0: +0.337,
    cathodeConc: 1.00,
    nElectrons: 2,
    cellNotation: "Zn(s) | Zn2+(aq, 0.10M) || Cu2+(aq, 1.00M) | Cu(s)"
  },
  {
    id: "water_electrolysis",
    name: "Water Electrolysis Cell (2H2O -> 2H2 + O2)",
    type: "electrolytic",
    anodeName: "Anode (O2 Generation)",
    anodeHalfReaction: "2H2O(l) ⇌ O2(g) + 4H+(aq) + 4e-",
    anodeE0: +1.229,
    anodeConc: 1.00,
    cathodeName: "Cathode (H2 Generation)",
    cathodeHalfReaction: "2H2O(l) + 2e- ⇌ H2(g) + 2OH-(aq)",
    cathodeE0: -0.828,
    cathodeConc: 1.00,
    nElectrons: 4,
    cellNotation: "Pt(s) | O2(g) | H2O(l) || H2O(l) | H2(g) | Pt(s)"
  },
  {
    id: "ag_concentration",
    name: "Silver Concentration Cell (Ag | Ag+ low || Ag+ high | Ag)",
    type: "concentration",
    anodeName: "Anode (Dilute Ag+)",
    anodeHalfReaction: "Ag(s) ⇌ Ag+(aq, low) + e-",
    anodeE0: 0.7996,
    anodeConc: 0.01,
    cathodeName: "Cathode (Concentrated Ag+)",
    cathodeHalfReaction: "Ag+(aq, high) + e- ⇌ Ag(s)",
    cathodeE0: 0.7996,
    cathodeConc: 1.00,
    nElectrons: 1,
    cellNotation: "Ag(s) | Ag+(aq, 0.01M) || Ag+(aq, 1.00M) | Ag(s)"
  },
  {
    id: "fe_cu_galvanic",
    name: "Iron-Copper Galvanic Cell (Fe | Fe2+ || Cu2+ | Cu)",
    type: "galvanic",
    anodeName: "Iron Anode (Fe)",
    anodeHalfReaction: "Fe(s) ⇌ Fe2+(aq) + 2e-",
    anodeE0: -0.440,
    anodeConc: 0.05,
    cathodeName: "Copper Cathode (Cu)",
    cathodeHalfReaction: "Cu2+(aq) + 2e- ⇌ Cu(s)",
    cathodeE0: +0.337,
    cathodeConc: 1.00,
    nElectrons: 2,
    cellNotation: "Fe(s) | Fe2+(aq, 0.05M) || Cu2+(aq, 1.00M) | Cu(s)"
  }
];

export function ElectrochemicalCellCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCellType, setSelectedCellType] = useState<CellType>("galvanic");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("daniell");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Constants
  const R_GAS = 8.31446; // J/(mol K)
  const FARADAY = 96485.33; // C/mol

  // Inputs
  const [inputTempC, setInputTempC] = useState<number>(25);
  const [inputAnodeE0, setInputAnodeE0] = useState<number>(-0.763);
  const [inputAnodeConc, setInputAnodeConc] = useState<number>(0.10);
  const [inputCathodeE0, setInputCathodeE0] = useState<number>(0.337);
  const [inputCathodeConc, setInputCathodeConc] = useState<number>(1.00);
  const [inputNElectrons, setInputNElectrons] = useState<number>(2);

  // Preset loading
  const preset = useMemo(() => {
    return CELL_PRESETS.find(p => p.id === selectedPresetId) || CELL_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setSelectedCellType(preset.type);
    setInputAnodeE0(preset.anodeE0);
    setInputAnodeConc(preset.anodeConc);
    setInputCathodeE0(preset.cathodeE0);
    setInputCathodeConc(preset.cathodeConc);
    setInputNElectrons(preset.nElectrons);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"cell_diagram" | "temp_chart" | "flashcards" | "quiz">("cell_diagram");

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

  // Main Electrochemistry Calculations Engine
  const results = useMemo(() => {
    const tempK = Math.max(1, inputTempC + 273.15);
    const n = Math.max(1, inputNElectrons);
    const cAnode = Math.max(1e-6, inputAnodeConc);
    const cCathode = Math.max(1e-6, inputCathodeConc);

    // Standard Cell Potential: E0_cell = E0_cathode - E0_anode
    const e0Cell = inputCathodeE0 - inputAnodeE0;

    // Reaction Quotient Q = [Anode_Ion] / [Cathode_Ion]
    let qVal = cAnode / cCathode;
    if (selectedCellType === "concentration") {
      qVal = Math.max(cAnode, cCathode) / Math.min(cAnode, cCathode);
    }

    // Nernst Pre-factor: (R * T) / (n * F)
    const nernstFactor = (R_GAS * tempK) / (n * FARADAY);

    // Non-Standard Cell Potential: E_cell = E0_cell - (RT/nF) * ln(Q)
    let eCell = e0Cell - (nernstFactor * Math.log(qVal));

    if (selectedCellType === "concentration") {
      // E_cell = (RT/nF) * ln(C_high / C_low)
      const ratio = Math.max(cAnode, cCathode) / Math.min(cAnode, cCathode);
      eCell = nernstFactor * Math.log(ratio);
    }

    // Gibbs Free Energy: ΔG = -n * F * E_cell (kJ/mol)
    const gibbsEnergyKJ = (-n * FARADAY * eCell) / 1000;
    const gibbsStandardKJ = (-n * FARADAY * e0Cell) / 1000;

    // Equilibrium Constant K: K = exp(n * F * E0_cell / (R * T))
    const lnK = (n * FARADAY * e0Cell) / (R_GAS * tempK);
    const log10K = lnK / Math.LN10;

    // Spontaneity & Polarity Rules
    let spontaneityText = "Spontaneous Galvanic Cell (Generates Voltage)";
    let spontaneityBadge = "bg-green-950 text-green-300 border-green-800";
    let anodeSign = "Negative (-)";
    let cathodeSign = "Positive (+)";

    if (selectedCellType === "electrolytic" || eCell < -0.001) {
      spontaneityText = "Non-Spontaneous Electrolytic Cell (Requires Power)";
      spontaneityBadge = "bg-red-950 text-red-300 border-red-800";
      anodeSign = "Positive (+)";
      cathodeSign = "Negative (-)";
    } else if (Math.abs(eCell) <= 0.001) {
      spontaneityText = "At Equilibrium (E_cell = 0 V, Dead Cell)";
      spontaneityBadge = "bg-blue-950 text-blue-300 border-blue-800";
    }

    // IUPAC Cell Notation
    const formattedNotation = `${preset.anodeName.split(' ')[0]}(s) | [${cAnode.toFixed(2)}M] || [${cCathode.toFixed(2)}M] | ${preset.cathodeName.split(' ')[0]}(s)`;

    return {
      tempK,
      e0Cell,
      eCell,
      qVal,
      gibbsEnergyKJ,
      gibbsStandardKJ,
      log10K,
      spontaneityText,
      spontaneityBadge,
      anodeSign,
      cathodeSign,
      formattedNotation
    };
  }, [selectedCellType, inputTempC, inputNElectrons, inputAnodeE0, inputAnodeConc, inputCathodeE0, inputCathodeConc, preset]);

  // Recharts Temperature Sensitivity Data (E_cell vs T)
  const tempSensitivityData = useMemo(() => {
    const data = [];
    const n = Math.max(1, inputNElectrons);
    const e0Cell = results.e0Cell;
    const qVal = results.qVal;

    for (let tC = 0; tC <= 100; tC += 10) {
      const tK = tC + 273.15;
      const factor = (R_GAS * tK) / (n * FARADAY);
      const eVal = e0Cell - (factor * Math.log(qVal));

      data.push({
        tempC: tC,
        CellPotentialV: Number(eVal.toFixed(4))
      });
    }
    return data;
  }, [inputNElectrons, results.e0Cell, results.qVal]);

  // Flashcards Data
  const flashcards = [
    { title: "Anode vs Cathode Rule", desc: "ANODE = OXIDATION (loss of e-). CATHODE = REDUCTION (gain of e-). Remember: AN OX and RED CAT!" },
    { title: "Standard Cell Potential (E°cell)", desc: "E°cell = E°cathode - E°anode. Both potentials must be expressed as standard reduction potentials." },
    { title: "Galvanic vs Electrolytic Cells", desc: "Galvanic: Spontaneous (E > 0, ΔG < 0), converts chemical to electrical energy. Electrolytic: Non-spontaneous (E < 0, ΔG > 0), requires external electrical power." },
    { title: "Salt Bridge Function", desc: "Maintains electrical neutrality by allowing anions to migrate to the anode and cations to migrate to the cathode, completing the circuit." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Electrochemical Cell Summary (${preset.name})
------------------------------------
Cell Type: ${selectedCellType.toUpperCase()}
Cell Notation: ${results.formattedNotation}
Anode (-/+): ${preset.anodeName} [E° = ${inputAnodeE0} V]
Cathode (+/-): ${preset.cathodeName} [E° = ${inputCathodeE0} V]
Standard Cell Potential (E°cell): ${results.e0Cell.toFixed(4)} V
Non-Standard Cell Potential (Ecell): ${results.eCell.toFixed(4)} V
Gibbs Free Energy (ΔG): ${results.gibbsEnergyKJ.toFixed(2)} kJ/mol
Equilibrium Constant (log10 K): ${results.log10K.toFixed(2)}
Spontaneity: ${results.spontaneityText}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Electrochemical cell analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "Where does oxidation occur in an electrochemical cell?", correctAnswer: "ANODE" },
      { q: "What is the sign of ΔG for a spontaneous Galvanic cell?", correctAnswer: "NEGATIVE" },
      { q: "In a galvanic cell, which direction do electrons flow through the external wire?", correctAnswer: "ANODE TO CATHODE" }
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
            Electrochemical Cell Calculator
          </span>
          <Link href="/calculators/nernst-equation-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Nernst Equation Calculator
          </Link>
          <Link href="/calculators/equilibrium-constant-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Equilibrium Constant Calculator
          </Link>
          <Link href="/calculators/ksp-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ksp Calculator
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
                <Cpu className="text-[#518231]" />
                Cell Builder Cockpit
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

            {/* Cell Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Electrochemical Cell Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {CELL_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Anode Standard Potential (E°_anode)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputAnodeE0}
                      onChange={(e) => setInputAnodeE0(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">V</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Anode Concentration</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputAnodeConc}
                      onChange={(e) => setInputAnodeConc(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">M</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Cathode Standard Potential (E°_cathode)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputCathodeE0}
                      onChange={(e) => setInputCathodeE0(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">V</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Cathode Concentration</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputCathodeConc}
                      onChange={(e) => setInputCathodeConc(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">M</span>
                  </div>
                </div>
              </div>

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

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Standard Cell Potential (E°_cell)" 
                val={`${results.e0Cell.toFixed(4)} V`} 
                icon={Zap} 
              />
              <ReadOnlyField 
                label="Non-Standard Cell Potential (E_cell)" 
                val={`${results.eCell.toFixed(4)} V`} 
                icon={Activity} 
              />

            </div>
          </div>

          {/* Integration Links to Nernst Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Detailed Nernst Equation & Gibbs Free Energy?</span>
              <span className="text-[11px] text-slate-500">Try our companion Nernst Equation Calculator</span>
            </div>
            <Link
              href="/calculators/nernst-equation-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Nernst Tool
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
                🧪 Electrochemical Cell Analysis Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${results.spontaneityBadge}`}>
                {results.spontaneityText}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">E_cell</span>
                <span className="text-xs font-black text-[#518231]">{results.eCell.toFixed(4)} V</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">E°_cell</span>
                <span className="text-xs font-black text-amber-400">{results.e0Cell.toFixed(4)} V</span>
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
                {(["cell_diagram", "temp_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "cell_diagram" ? "🧪 Cell Diagram" : tab === "temp_chart" ? "📊 Temperature Plot" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Interactive Cell Diagram */}
                {visualTab === "cell_diagram" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Interactive Cell Component Diagram ({preset.name})
                    </h4>

                    {/* Conceptual Cell Flow Diagram */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400 flex items-center gap-1">
                          <ArrowRight size={14} className="text-[#518231]" />
                          External Wire Electron Flow: Anode ➔ Cathode
                        </span>
                        <span className="text-[10px] text-slate-400">Salt Bridge: Anions ➔ Anode, Cations ➔ Cathode</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-amber-400 block">ANODE [{results.anodeSign}]</span>
                          <span className="text-[11px] text-slate-300 font-semibold block">{preset.anodeName}</span>
                          <p className="text-[10px] text-slate-400">{preset.anodeHalfReaction}</p>
                          <span className="text-[10px] text-[#518231] font-bold block pt-1">Process: OXIDATION (Loss of e-)</span>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-[#518231] block">CATHODE [{results.cathodeSign}]</span>
                          <span className="text-[11px] text-slate-300 font-semibold block">{preset.cathodeName}</span>
                          <p className="text-[10px] text-slate-400">{preset.cathodeHalfReaction}</p>
                          <span className="text-[10px] text-[#518231] font-bold block pt-1">Process: REDUCTION (Gain of e-)</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        IUPAC Cell Notation: <span className="font-bold text-white font-mono">{results.formattedNotation}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Recharts Temperature Plotter */}
                {visualTab === "temp_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cell Potential E_cell (V) vs Temperature T (°C)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tempSensitivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="tempC" label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "E_cell (V)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="CellPotentialV" stroke="#10b981" strokeWidth={2} dot={true} name="Cell Potential E_cell (V)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrochemical Cell Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrochemical Cell Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. ANODE)"
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
