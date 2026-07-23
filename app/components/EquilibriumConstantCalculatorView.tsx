"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "kc_calc" 
  | "kp_calc" 
  | "qc_calc" 
  | "kc_kp_conv" 
  | "ice_table" 
  | "le_chatelier" 
  | "van_t_hoff";

interface ReactionPreset {
  id: string;
  name: string;
  equationStr: string;
  reactants: { name: string; coeff: number; state: "g" | "aq" | "s" | "l" }[];
  products: { name: string; coeff: number; state: "g" | "aq" | "s" | "l" }[];
  defaultKc: number;
  deltaN: number; // gas moles products - gas moles reactants
}

const REACTION_PRESETS: ReactionPreset[] = [
  {
    id: "haber",
    name: "Haber-Bosch Ammonia Synthesis (N2 + 3H2 ⇌ 2NH3)",
    equationStr: "N2(g) + 3H2(g) ⇌ 2NH3(g)",
    reactants: [
      { name: "N2", coeff: 1, state: "g" },
      { name: "H2", coeff: 3, state: "g" }
    ],
    products: [
      { name: "NH3", coeff: 2, state: "g" }
    ],
    defaultKc: 0.50,
    deltaN: -2 // 2 - 4
  },
  {
    id: "hi_synth",
    name: "Hydrogen Iodide Synthesis (H2 + I2 ⇌ 2HI)",
    equationStr: "H2(g) + I2(g) ⇌ 2HI(g)",
    reactants: [
      { name: "H2", coeff: 1, state: "g" },
      { name: "I2", coeff: 1, state: "g" }
    ],
    products: [
      { name: "HI", coeff: 2, state: "g" }
    ],
    defaultKc: 54.3,
    deltaN: 0 // 2 - 2
  },
  {
    id: "pcl5",
    name: "PCl5 Decomposition (PCl5 ⇌ PCl3 + Cl2)",
    equationStr: "PCl5(g) ⇌ PCl3(g) + Cl2(g)",
    reactants: [
      { name: "PCl5", coeff: 1, state: "g" }
    ],
    products: [
      { name: "PCl3", coeff: 1, state: "g" },
      { name: "Cl2", coeff: 1, state: "g" }
    ],
    defaultKc: 0.042,
    deltaN: 1 // 2 - 1
  },
  {
    id: "caco3",
    name: "CaCO3 Decomposition (Heterogeneous: CaCO3(s) ⇌ CaO(s) + CO2(g))",
    equationStr: "CaCO3(s) ⇌ CaO(s) + CO2(g)",
    reactants: [
      { name: "CaCO3", coeff: 1, state: "s" }
    ],
    products: [
      { name: "CaO", coeff: 1, state: "s" },
      { name: "CO2", coeff: 1, state: "g" }
    ],
    defaultKc: 0.050,
    deltaN: 1 // 1 - 0
  }
];

export function EquilibriumConstantCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("kc_calc");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("haber");

  // Reaction State
  const preset = useMemo(() => {
    return REACTION_PRESETS.find(p => p.id === selectedPresetId) || REACTION_PRESETS[0];
  }, [selectedPresetId]);

  // Concentration / Pressure inputs
  const [concInputs, setConcInputs] = useState<{ [key: string]: number }>({
    N2: 0.50,
    H2: 1.50,
    NH3: 0.85,
    H2_hi: 0.10,
    I2_hi: 0.10,
    HI_hi: 0.74,
    PCl5: 0.20,
    PCl3: 0.09,
    Cl2: 0.09,
    CO2: 0.05
  });

  const [inputKc, setInputKc] = useState<number>(0.50);
  const [inputTemperatureK, setInputTemperatureK] = useState<number>(500); // 500 K

  // van 't Hoff inputs
  const [vanTHoffK1, setVanTHoffK1] = useState<number>(0.50);
  const [vanTHoffT1, setVanTHoffT1] = useState<number>(500);
  const [vanTHoffT2, setVanTHoffT2] = useState<number>(600);
  const [vanTHoffDeltaH, setVanTHoffDeltaH] = useState<number>(-92.4); // kJ/mol (exothermic Haber process)

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"ice_table" | "progress_chart" | "flashcards" | "quiz">("ice_table");

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

  // Gas constant R = 0.08206 L*atm/(mol*K)
  const R_GAS = 0.08206;

  // Main Calculations Engine
  const results = useMemo(() => {
    let calculatedKc = 0.50;
    let calculatedKp = 0.50;
    let calculatedQc = 0.50;
    let deltaN = preset.deltaN;
    let directionText = "At Equilibrium (Q = K)";
    let directionBadge = "bg-green-950 text-green-300 border-green-800";
    let expressionStr = "";

    // Build Kc Expression String (Excluding (s) and (l))
    const prodExp = preset.products
      .filter(p => p.state === "g" || p.state === "aq")
      .map(p => `[${p.name}]${p.coeff > 1 ? `^${p.coeff}` : ""}`)
      .join(" · ") || "1";

    const reactExp = preset.reactants
      .filter(r => r.state === "g" || r.state === "aq")
      .map(r => `[${r.name}]${r.coeff > 1 ? `^${r.coeff}` : ""}`)
      .join(" · ") || "1";

    expressionStr = `Kc = (${prodExp}) / (${reactExp})`;

    // Calculate Kc / Qc from concInputs
    let numVal = 1;
    let denVal = 1;

    preset.products.forEach(p => {
      if (p.state === "g" || p.state === "aq") {
        const val = Math.max(1e-8, concInputs[p.name] || 0.10);
        numVal *= Math.pow(val, p.coeff);
      }
    });

    preset.reactants.forEach(r => {
      if (r.state === "g" || r.state === "aq") {
        const val = Math.max(1e-8, concInputs[r.name] || 0.10);
        denVal *= Math.pow(val, r.coeff);
      }
    });

    calculatedKc = denVal > 0 ? numVal / denVal : 1e-5;
    calculatedQc = calculatedKc;

    // Kp = Kc * (R * T)^deltaN
    const RT = R_GAS * inputTemperatureK;
    calculatedKp = calculatedKc * Math.pow(RT, deltaN);

    // Q vs K direction evaluation
    const targetK = inputKc > 0 ? inputKc : preset.defaultKc;
    if (calculatedQc < targetK * 0.99) {
      directionText = "Net Reaction Shifts FORWARD (Q < K, Towards Products)";
      directionBadge = "bg-blue-950 text-blue-300 border-blue-800";
    } else if (calculatedQc > targetK * 1.01) {
      directionText = "Net Reaction Shifts REVERSE (Q > K, Towards Reactants)";
      directionBadge = "bg-amber-950 text-amber-300 border-amber-800";
    }

    // van 't Hoff calculation: ln(K2/K1) = -deltaH/R * (1/T2 - 1/T1) where R = 8.314 J/mol*K = 0.008314 kJ/mol*K
    const R_KJ = 0.008314;
    const vanTHoffK2 = vanTHoffK1 * Math.exp((-vanTHoffDeltaH / R_KJ) * (1 / vanTHoffT2 - 1 / vanTHoffT1));

    return {
      calculatedKc,
      calculatedKp,
      calculatedQc,
      targetK,
      deltaN,
      directionText,
      directionBadge,
      expressionStr,
      vanTHoffK2,
      RT
    };
  }, [preset, concInputs, inputKc, inputTemperatureK, vanTHoffK1, vanTHoffT1, vanTHoffT2, vanTHoffDeltaH]);

  // Recharts Reaction Progress Data (Concentration vs Reaction Extent)
  const progressData = useMemo(() => {
    const data = [];
    for (let extent = 0; extent <= 1; extent += 0.1) {
      data.push({
        progress: Number((extent * 100).toFixed(0)),
        Reactants: Number(((1 - extent * 0.7) * 100).toFixed(1)),
        Products: Number(((extent * 0.85) * 100).toFixed(1))
      });
    }
    return data;
  }, []);

  // Flashcards Data
  const flashcards = [
    { title: "Equilibrium Constant (Kc)", desc: "Kc = [Products]^c / [Reactants]^a. Pure solids (s) and pure liquids (l) are omitted because their activity is 1." },
    { title: "Kc vs Kp Relationship", desc: "Kp = Kc * (R * T)^deltaN, where deltaN = (moles of gas products) - (moles of gas reactants)." },
    { title: "Reaction Quotient (Q vs K)", desc: "If Q < K: Net forward reaction. If Q > K: Net reverse reaction. If Q = K: System is at equilibrium." },
    { title: "Le Chatelier's Principle", desc: "If a system at equilibrium is disturbed, the equilibrium shifts to counteract the disturbance." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Chemical Equilibrium Summary (${preset.name})
------------------------------------
Equation: ${preset.equationStr}
Equilibrium Expression: ${results.expressionStr}
Temperature: ${inputTemperatureK} K
Equilibrium Constant (Kc): ${results.calculatedKc.toExponential(3)}
Equilibrium Constant (Kp): ${results.calculatedKp.toExponential(3)}
Reaction Quotient (Qc): ${results.calculatedQc.toExponential(3)}
Gas Mole Difference (deltaN): ${results.deltaN}
Reaction Direction: ${results.directionText}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Equilibrium analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "True or False: Pure solids (s) and pure liquids (l) are included in the equilibrium constant expression Kc.", correctAnswer: "FALSE" },
      { q: "If Q < K, in which direction will the reaction shift to reach equilibrium?", correctAnswer: "FORWARD" },
      { q: "What is deltaN for N2(g) + 3H2(g) ⇌ 2NH3(g)?", correctAnswer: "-2" }
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
            Equilibrium Constant Calculator
          </span>
          <Link href="/calculators/ka-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ka Calculator
          </Link>
          <Link href="/calculators/kb-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Kb Calculator
          </Link>
          <Link href="/calculators/acid-base-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Acid-Base Calculator
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
                Equilibrium Cockpit
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
                <option value="kc_calc">1. Calculate Kc from Equilibrium Concentrations</option>
                <option value="kp_calc">2. Calculate Kp from Partial Pressures</option>
                <option value="qc_calc">3. Calculate Reaction Quotient Qc & Predict Direction</option>
                <option value="kc_kp_conv">4. Kc ↔ Kp Conversion [Kp = Kc(RT)^deltaN]</option>
                <option value="van_t_hoff">5. van &apos;t Hoff Temperature Shift [ln(K2/K1)]</option>
              </select>
            </div>

            {/* Reaction Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Chemical Reaction Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {REACTION_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Temperature Input */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                <span>Temperature (K)</span>
                <input
                  type="number"
                  value={inputTemperatureK}
                  onChange={(e) => setInputTemperatureK(Number(e.target.value))}
                  className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                />
              </div>
            </div>

            {/* Species Concentration Inputs */}
            {calcMode !== "van_t_hoff" && (
              <div className="space-y-4 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Species Concentrations / Pressures</span>
                
                {preset.reactants.map(r => (
                  <div key={r.name} className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Reactant: [{r.name}] ({r.state})</span>
                    <input
                      type="number"
                      step="0.01"
                      value={concInputs[r.name] || 0.10}
                      onChange={(e) => setConcInputs({ ...concInputs, [r.name]: Number(e.target.value) })}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                ))}

                {preset.products.map(p => (
                  <div key={p.name} className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Product: [{p.name}] ({p.state})</span>
                    <input
                      type="number"
                      step="0.01"
                      value={concInputs[p.name] || 0.10}
                      onChange={(e) => setConcInputs({ ...concInputs, [p.name]: Number(e.target.value) })}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Primary Output Readouts */}
            <ReadOnlyField 
              label="Equilibrium Constant (Kc)" 
              val={results.calculatedKc.toExponential(3)} 
              icon={Atom} 
            />
            <ReadOnlyField 
              label="Gas-Phase Constant (Kp)" 
              val={results.calculatedKp.toExponential(3)} 
              icon={Zap} 
            />

          </div>
        </div>

        {/* Right Column: Interactive Cockpit & Recharts Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Chemical Equilibrium Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${results.directionBadge}`}>
                {results.directionText}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Kc</span>
                <span className="text-xs font-black text-[#518231]">{results.calculatedKc.toExponential(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Kp</span>
                <span className="text-xs font-black text-amber-400">{results.calculatedKp.toExponential(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Qc</span>
                <span className="text-xs font-black text-white">{results.calculatedQc.toExponential(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">deltaN (gas)</span>
                <span className="text-2xl font-black text-white">{results.deltaN}</span>
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
                {(["ice_table", "progress_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "ice_table" ? "📋 ICE Table" : tab === "progress_chart" ? "📊 Reaction Progress" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: ICE Table */}
                {visualTab === "ice_table" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Table size={16} className="text-[#518231]" />
                      Reaction Equilibrium ICE Table ({preset.equationStr})
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2.5 text-left">Species</th>
                            <th className="p-2.5 text-center">Initial (I)</th>
                            <th className="p-2.5 text-center">Change (C)</th>
                            <th className="p-2.5 text-center">Equilibrium (E)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                          {preset.reactants.map(r => (
                            <tr key={r.name}>
                              <td className="p-2.5 font-bold text-slate-900 dark:text-white">{r.name} ({r.state})</td>
                              <td className="p-2.5 text-center">{(concInputs[r.name] || 0.10).toFixed(3)} M</td>
                              <td className="p-2.5 text-center text-amber-600 dark:text-amber-400">-{r.coeff}x</td>
                              <td className="p-2.5 text-center text-[#518231] font-bold">{(concInputs[r.name] || 0.10).toFixed(3)} M</td>
                            </tr>
                          ))}
                          {preset.products.map(p => (
                            <tr key={p.name}>
                              <td className="p-2.5 font-bold text-slate-900 dark:text-white">{p.name} ({p.state})</td>
                              <td className="p-2.5 text-center">0.000 M</td>
                              <td className="p-2.5 text-center text-green-600 dark:text-green-400">+{p.coeff}x</td>
                              <td className="p-2.5 text-center text-[#518231] font-bold">{(concInputs[p.name] || 0.10).toFixed(3)} M</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Equilibrium Expression: <span className="font-bold text-[#518231]">{results.expressionStr}</span>.
                      Pure solids (s) and liquids (l) are omitted from the expression.
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Reaction Progress Chart */}
                {visualTab === "progress_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Concentration vs Reaction Progress</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="progress" label={{ value: "% Reaction Progress", position: "insideBottom", offset: -5 }} />
                          <YAxis domain={[0, 100]} label={{ value: "% Amount", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="Reactants" stroke="#ef4444" strokeWidth={2} dot={false} name="Reactants" />
                          <Line type="monotone" dataKey="Products" stroke="#3b82f6" strokeWidth={2} dot={false} name="Products" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Equilibrium Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Equilibrium Chemistry Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. FALSE)"
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
