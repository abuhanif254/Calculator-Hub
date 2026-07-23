"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "mass_deposited" 
  | "charge" 
  | "time" 
  | "current" 
  | "electroplating" 
  | "faraday_second_law";

interface ElectroplatingPreset {
  id: string;
  name: string;
  metalSymbol: string;
  halfReaction: string;
  molarMass: number; // g/mol
  nElectrons: number;
  density: number; // g/cm^3
  defaultCurrentA: number;
  defaultTimeSec: number;
}

const ELECTROPLATING_PRESETS: ElectroplatingPreset[] = [
  {
    id: "silver",
    name: "Silver Electroplating (Ag+)",
    metalSymbol: "Ag",
    halfReaction: "Ag+(aq) + e- ➔ Ag(s)",
    molarMass: 107.87,
    nElectrons: 1,
    density: 10.49,
    defaultCurrentA: 2.0,
    defaultTimeSec: 3600 // 1 hour
  },
  {
    id: "copper",
    name: "Copper Refining (Cu2+)",
    metalSymbol: "Cu",
    halfReaction: "Cu2+(aq) + 2e- ➔ Cu(s)",
    molarMass: 63.55,
    nElectrons: 2,
    density: 8.96,
    defaultCurrentA: 5.0,
    defaultTimeSec: 3600
  },
  {
    id: "gold",
    name: "Gold Electroplating (Au3+)",
    metalSymbol: "Au",
    halfReaction: "Au3+(aq) + 3e- ➔ Au(s)",
    molarMass: 196.97,
    nElectrons: 3,
    density: 19.32,
    defaultCurrentA: 1.5,
    defaultTimeSec: 1800 // 30 min
  },
  {
    id: "aluminum",
    name: "Aluminum Smelting (Al3+)",
    metalSymbol: "Al",
    halfReaction: "Al3+(aq) + 3e- ➔ Al(s)",
    molarMass: 26.98,
    nElectrons: 3,
    density: 2.70,
    defaultCurrentA: 100.0,
    defaultTimeSec: 3600
  },
  {
    id: "nickel",
    name: "Nickel Electroplating (Ni2+)",
    metalSymbol: "Ni",
    halfReaction: "Ni2+(aq) + 2e- ➔ Ni(s)",
    molarMass: 58.69,
    nElectrons: 2,
    density: 8.90,
    defaultCurrentA: 3.0,
    defaultTimeSec: 3600
  }
];

export function FaradaysLawCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("mass_deposited");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("silver");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Constant
  const FARADAY = 96485.33212; // C/mol e-

  // Inputs
  const [inputCurrentA, setInputCurrentA] = useState<number>(2.0); // A
  const [inputTimeSec, setInputTimeSec] = useState<number>(3600); // s
  const [inputMolarMass, setInputMolarMass] = useState<number>(107.87); // g/mol
  const [inputNElectrons, setInputNElectrons] = useState<number>(1);
  const [inputEfficiencyPercent, setInputEfficiencyPercent] = useState<number>(100); // %
  const [inputSurfaceAreaCm2, setInputSurfaceAreaCm2] = useState<number>(50); // cm^2
  const [inputDensityGCm3, setInputDensityGCm3] = useState<number>(10.49); // g/cm^3
  const [inputTargetMassG, setInputTargetMassG] = useState<number>(5.0); // g

  // Current Preset
  const preset = useMemo(() => {
    return ELECTROPLATING_PRESETS.find(p => p.id === selectedPresetId) || ELECTROPLATING_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputMolarMass(preset.molarMass);
    setInputNElectrons(preset.nElectrons);
    setInputDensityGCm3(preset.density);
    setInputCurrentA(preset.defaultCurrentA);
    setInputTimeSec(preset.defaultTimeSec);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"conversion_flow" | "second_law" | "temp_chart" | "flashcards" | "quiz">("conversion_flow");

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

  // Main Faraday's Law Calculations Engine
  const results = useMemo(() => {
    const current = Math.max(0.001, inputCurrentA);
    const timeS = Math.max(1, inputTimeSec);
    const M = Math.max(0.1, inputMolarMass);
    const n = Math.max(1, inputNElectrons);
    const eff = Math.min(100, Math.max(1, inputEfficiencyPercent)) / 100;
    const area = Math.max(0.1, inputSurfaceAreaCm2);
    const density = Math.max(0.1, inputDensityGCm3);

    // Charge: Q = I * t (Coulombs)
    const chargeC = current * timeS;

    // Moles of electrons: n_e = Q / F
    const molesElectrons = chargeC / FARADAY;

    // Moles of substance: n_substance = n_e / n
    const molesSubstance = molesElectrons / n;

    // Theoretical mass deposited: m = (M * I * t) / (n * F) in grams
    const theoreticalMassG = molesSubstance * M;

    // Actual mass deposited considering efficiency
    const actualMassG = theoreticalMassG * eff;

    // Electrochemical Equivalent Z = M / (n * F) in g/C
    const zEquivalentGC = M / (n * FARADAY);

    // Equivalent Mass E = M / n
    const equivalentMassG = M / n;

    // Electroplating volume V = m / density (cm^3)
    const volumeCm3 = actualMassG / density;

    // Thickness h = V / area (cm -> micrometers µm)
    const thicknessCm = volumeCm3 / area;
    const thicknessMicrons = thicknessCm * 10000; // 1 cm = 10,000 µm

    // Inverse calculation: Time required for target mass: t = (m * n * F) / (M * I * eff)
    const requiredTimeSec = (inputTargetMassG * n * FARADAY) / (M * current * eff);
    const requiredTimeMin = requiredTimeSec / 60;
    const requiredTimeHr = requiredTimeSec / 3600;

    // Inverse calculation: Current required for target mass: I = (m * n * F) / (M * t * eff)
    const requiredCurrentA = (inputTargetMassG * n * FARADAY) / (M * timeS * eff);

    return {
      chargeC,
      molesElectrons,
      molesSubstance,
      theoreticalMassG,
      actualMassG,
      zEquivalentGC,
      equivalentMassG,
      volumeCm3,
      thicknessMicrons,
      requiredTimeSec,
      requiredTimeMin,
      requiredTimeHr,
      requiredCurrentA
    };
  }, [inputCurrentA, inputTimeSec, inputMolarMass, inputNElectrons, inputEfficiencyPercent, inputSurfaceAreaCm2, inputDensityGCm3, inputTargetMassG]);

  // Faraday's Second Law Comparison Data (Same Charge Deposited across Metals)
  const secondLawComparisonData = useMemo(() => {
    const charge = results.chargeC;
    const metals = [
      { name: "Silver (Ag+)", symbol: "Ag", M: 107.87, n: 1 },
      { name: "Copper (Cu2+)", symbol: "Cu", M: 63.55, n: 2 },
      { name: "Gold (Au3+)", symbol: "Au", M: 196.97, n: 3 },
      { name: "Aluminum (Al3+)", symbol: "Al", M: 26.98, n: 3 },
      { name: "Nickel (Ni2+)", symbol: "Ni", M: 58.69, n: 2 }
    ];

    return metals.map(m => {
      const eqMass = m.M / m.n;
      const massG = (m.M * charge) / (m.n * FARADAY);
      return {
        metalName: m.symbol,
        EquivalentMassG: Number(eqMass.toFixed(2)),
        MassDepositedG: Number(massG.toFixed(3))
      };
    });
  }, [results.chargeC]);

  // Recharts Deposition Time Sensitivity Data (Mass vs Time 0 to 2 hours)
  const timeSensitivityData = useMemo(() => {
    const data = [];
    const current = inputCurrentA;
    const M = inputMolarMass;
    const n = inputNElectrons;
    const eff = inputEfficiencyPercent / 100;

    for (let tMin = 0; tMin <= 120; tMin += 15) {
      const tSec = tMin * 60;
      const massG = ((M * current * tSec) / (n * FARADAY)) * eff;

      data.push({
        timeMin: tMin,
        MassGrams: Number(massG.toFixed(3))
      });
    }
    return data;
  }, [inputCurrentA, inputMolarMass, inputNElectrons, inputEfficiencyPercent]);

  // Flashcards Data
  const flashcards = [
    { title: "Faraday's First Law", desc: "The mass (m) of a substance deposited or liberated at an electrode is directly proportional to the quantity of electricity (Q = I * t) passed through the electrolyte: m = Z * Q." },
    { title: "Faraday's Second Law", desc: "When the same quantity of electricity is passed through different electrolytes, the masses of substances deposited are proportional to their chemical equivalent masses (E = M / n)." },
    { title: "Faraday Constant (F)", desc: "F = 96,485.33 C/mol of electrons. Represents the total electric charge carried by one mole of electrons." },
    { title: "Electrochemical Equivalent (Z)", desc: "Z = M / (n * F). The mass of a substance in grams deposited by one Coulomb of charge." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Faraday's Law Electrolysis Analysis (${preset.name})
------------------------------------
Half-Reaction: ${preset.halfReaction}
Current (I): ${inputCurrentA} A
Time (t): ${inputTimeSec} s (${(inputTimeSec / 60).toFixed(1)} min)
Electric Charge (Q): ${results.chargeC.toFixed(2)} Coulombs
Moles of Electrons (n_e): ${results.molesElectrons.toFixed(4)} mol
Theoretical Mass Deposited: ${results.theoreticalMassG.toFixed(4)} g
Actual Mass (${inputEfficiencyPercent}% Eff): ${results.actualMassG.toFixed(4)} g
Electrochemical Equivalent (Z): ${results.zEquivalentGC.toExponential(4)} g/C
Coating Thickness: ${results.thicknessMicrons.toFixed(2)} µm`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Faraday's Law analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the formula for electric charge Q in terms of current I and time t?", correctAnswer: "Q = I * T" },
      { q: "What is the charge of 1 mole of electrons in Coulombs?", correctAnswer: "96485" },
      { q: "True or False: Doubling the electrolysis time doubles the deposited metal mass under constant current.", correctAnswer: "TRUE" }
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
            Faraday's Law Calculator
          </span>
          <Link href="/calculators/cell-potential-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Cell Potential Calculator
          </Link>
          <Link href="/calculators/electrochemical-cell-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrochemical Cell Calculator
          </Link>
          <Link href="/calculators/nernst-equation-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Nernst Equation Calculator
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
                Electrolysis Cockpit
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

            {/* Calculation Mode Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculation Target</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="mass_deposited">1. Mass Deposited (m = MIt / nF)</option>
                <option value="charge">2. Electric Charge (Q = I * t)</option>
                <option value="time">3. Electrolysis Time (t = mnF / MI)</option>
                <option value="current">4. Current Required (I = mnF / Mt)</option>
                <option value="electroplating">5. Electroplating Thickness (h = m / ρA)</option>
                <option value="faraday_second_law">6. Faraday's Second Law Multi-Metal Comparison</option>
              </select>
            </div>

            {/* Electroplating Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Electrolysis / Plating Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {ELECTROPLATING_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Current (I)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={inputCurrentA}
                      onChange={(e) => setInputCurrentA(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">A</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Time (t)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="60"
                      value={inputTimeSec}
                      onChange={(e) => setInputTimeSec(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">s</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Molar Mass (M)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputMolarMass}
                      onChange={(e) => setInputMolarMass(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">g/mol</span>
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

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Current Efficiency</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max="100"
                      value={inputEfficiencyPercent}
                      onChange={(e) => setInputEfficiencyPercent(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>
              </div>

              {calcMode === "electroplating" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Plating Surface Area</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="1"
                          value={inputSurfaceAreaCm2}
                          onChange={(e) => setInputSurfaceAreaCm2(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">cm²</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Metal Density</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={inputDensityGCm3}
                          onChange={(e) => setInputDensityGCm3(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">g/cm³</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Mass Deposited (m)" 
                val={`${results.actualMassG.toFixed(4)} g`} 
                icon={Scale} 
              />
              <ReadOnlyField 
                label="Electric Charge (Q)" 
                val={`${results.chargeC.toFixed(2)} Coulombs`} 
                icon={Zap} 
              />

            </div>
          </div>

          {/* Integration Links to Cell Potential Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need cell potential or Nernst equation?</span>
              <span className="text-[11px] text-slate-500">Try our companion Cell Potential Calculator</span>
            </div>
            <Link
              href="/calculators/cell-potential-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Cell Potential
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
                🧪 Faraday's Law Electrolysis Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg border bg-green-950 text-green-300 border-green-800">
                {preset.name}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Mass Deposited</span>
                <span className="text-xs font-black text-[#518231]">{results.actualMassG.toFixed(4)} g</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Charge Q</span>
                <span className="text-xs font-black text-amber-400">{results.chargeC.toFixed(1)} C</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Moles e- (n_e)</span>
                <span className="text-xs font-black text-white">{results.molesElectrons.toFixed(4)} mol</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Coating Thickness</span>
                <span className="text-xs font-black text-white">{results.thicknessMicrons.toFixed(2)} µm</span>
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
                {(["conversion_flow", "second_law", "temp_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "conversion_flow" ? "⚡ Conversion Flow" : tab === "second_law" ? "⚖️ 2nd Law Compare" : tab === "temp_chart" ? "📊 Time Plot" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Conversion Chain Flow Diagram */}
                {visualTab === "conversion_flow" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Electrochemistry Conversion Chain (Q ➔ n_e ➔ n ➔ m ➔ h)
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">1. Electric Charge</span>
                          <span className="font-bold text-amber-400">{results.chargeC.toFixed(1)} C</span>
                          <span className="text-[9px] text-slate-500 block">Q = I * t</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">2. Moles of e-</span>
                          <span className="font-bold text-[#518231]">{results.molesElectrons.toFixed(4)} mol</span>
                          <span className="text-[9px] text-slate-500 block">n_e = Q / F</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">3. Deposited Mass</span>
                          <span className="font-bold text-[#518231]">{results.actualMassG.toFixed(4)} g</span>
                          <span className="text-[9px] text-slate-500 block">m = n_substance * M</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">4. Thickness</span>
                          <span className="font-bold text-amber-400">{results.thicknessMicrons.toFixed(2)} µm</span>
                          <span className="text-[9px] text-slate-500 block">h = m / ρA</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Cathodic Reduction Half-Reaction: <span className="font-bold text-white font-mono">{preset.halfReaction}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Faraday's Second Law Comparison */}
                {visualTab === "second_law" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Faraday's Second Law Multi-Metal Comparison (Q = {results.chargeC.toFixed(0)} C)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={secondLawComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="metalName" />
                          <YAxis label={{ value: "Mass Deposited (g)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="MassDepositedG" stroke="#10b981" strokeWidth={2} dot={true} name="Deposited Mass (g)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Recharts Time Plotter */}
                {visualTab === "temp_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mass Deposited m (g) vs Electrolysis Time t (min)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeSensitivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="timeMin" label={{ value: "Time (minutes)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Mass (g)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="MassGrams" stroke="#eab308" strokeWidth={2} dot={true} name="Deposited Mass (g)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 4: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Faraday's Law Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Faraday's Law Quiz</h4>
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
