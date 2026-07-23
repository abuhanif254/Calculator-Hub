"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

type CalculationMode = 
  | "molality" 
  | "moles" 
  | "solvent_mass" 
  | "solute_mass" 
  | "molality_from_mass" 
  | "molar_mass_assistant" 
  | "convert_units" 
  | "molality_vs_molarity" 
  | "solution_prep" 
  | "colligative_properties" 
  | "advanced_analysis";

// Atomic Mass Table (g/mol)
const ATOMIC_WEIGHTS: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078,
  Cr: 51.996, Mn: 54.938, Fe: 55.845, Cu: 63.546, Zn: 65.38, Br: 79.904, Ag: 107.87, I: 126.90, Ba: 137.33,
  Au: 196.97, Pb: 207.2
};

interface ElementContribution {
  element: string;
  count: number;
  atomicWeight: number;
  totalMass: number;
}

// Solvent Constants Preset Table
interface SolventPreset {
  name: string;
  Kb: number; // °C/m (Ebullioscopic constant)
  pureTb: number; // °C
  Kf: number; // °C/m (Cryoscopic constant)
  pureTf: number; // °C
}

const SOLVENT_PRESETS: Record<string, SolventPreset> = {
  water: { name: "Water (H₂O)", Kb: 0.512, pureTb: 100.0, Kf: 1.86, pureTf: 0.0 },
  benzene: { name: "Benzene (C₆H₆)", Kb: 2.53, pureTb: 80.1, Kf: 5.12, pureTf: 5.5 },
  ethanol: { name: "Ethanol (C₂H₅OH)", Kb: 1.20, pureTb: 78.4, Kf: 1.99, pureTf: -114.6 },
  chloroform: { name: "Chloroform (CHCl₃)", Kb: 3.63, pureTb: 61.2, Kf: 4.68, pureTf: -63.5 }
};

// Parser for Chemical Formulas
function parseChemicalFormula(formulaStr: string): { totalMolarMass: number; breakdown: ElementContribution[]; isValid: boolean; errorMsg?: string } {
  try {
    const cleanFormula = formulaStr.trim().replace(/\s+/g, "");
    if (!cleanFormula) return { totalMolarMass: 0, breakdown: [], isValid: false, errorMsg: "Formula is empty" };

    let mainPart = cleanFormula;
    let hydrateMultiplier = 0;
    let hydratePart = "";

    if (cleanFormula.includes(".") || cleanFormula.includes("*")) {
      const parts = cleanFormula.split(/[.*]/);
      mainPart = parts[0];
      const hydrateStr = parts[1] || "";
      const match = hydrateStr.match(/^(\d*)(.*)$/);
      if (match) {
        hydrateMultiplier = match[1] ? parseInt(match[1], 10) : 1;
        hydratePart = match[2];
      }
    }

    const counts: Record<string, number> = {};

    const parseSegment = (segment: string, multiplier = 1) => {
      const regex = /([A-Z][a-z]?|\()(\d*)|(\))(\d*)/g;
      let match;
      const stack: Record<string, number>[] = [];
      let currCounts: Record<string, number> = {};

      while ((match = regex.exec(segment)) !== null) {
        const token = match[1] || match[3];
        const num = match[2] || match[4];
        const subCount = num ? parseInt(num, 10) : 1;

        if (token === "(") {
          stack.push(currCounts);
          currCounts = {};
        } else if (token === ")") {
          if (stack.length === 0) throw new Error("Unbalanced parentheses");
          const parentCounts = stack.pop()!;
          for (const [el, cnt] of Object.entries(currCounts)) {
            parentCounts[el] = (parentCounts[el] || 0) + cnt * subCount;
          }
          currCounts = parentCounts;
        } else if (ATOMIC_WEIGHTS[token]) {
          currCounts[token] = (currCounts[token] || 0) + subCount * multiplier;
        } else {
          throw new Error(`Unknown element symbol: '${token}'`);
        }
      }

      for (const [el, cnt] of Object.entries(currCounts)) {
        counts[el] = (counts[el] || 0) + cnt;
      }
    };

    parseSegment(mainPart, 1);
    if (hydratePart && hydrateMultiplier > 0) {
      parseSegment(hydratePart, hydrateMultiplier);
    }

    let totalMolarMass = 0;
    const breakdown: ElementContribution[] = [];

    for (const [el, count] of Object.entries(counts)) {
      const weight = ATOMIC_WEIGHTS[el] || 0;
      const totalMass = weight * count;
      totalMolarMass += totalMass;
      breakdown.push({ element: el, count, atomicWeight: weight, totalMass });
    }

    return { totalMolarMass, breakdown, isValid: true };
  } catch (err: any) {
    return { totalMolarMass: 0, breakdown: [], isValid: false, errorMsg: err.message || "Invalid chemical formula" };
  }
}

export function MolalityCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("molality");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Common Inputs
  const [soluteMoles, setSoluteMoles] = useState<number>(0.5); // 0.5 mol
  const [solventMassKg, setSolventMassKg] = useState<number>(1.0); // 1.0 kg solvent
  const [targetMolalityM, setTargetMolalityM] = useState<number>(0.5); // 0.5 mol/kg
  const [soluteMassG, setSoluteMassG] = useState<number>(29.22); // 29.22 g NaCl
  const [molarMassGmol, setMolarMassGmol] = useState<number>(58.44); // 58.44 g/mol NaCl

  // Formula Assistant Input
  const [chemicalFormulaInput, setChemicalFormulaInput] = useState<string>("NaCl");

  // Colligative Properties Inputs
  const [selectedSolventKey, setSelectedSolventKey] = useState<string>("water");
  const [vantHoffFactor, setVantHoffFactor] = useState<number>(2); // i = 2 for NaCl

  // Temperature Simulation State
  const [tempSimCelsius, setTempSimCelsius] = useState<number>(25); // 25°C baseline

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"vessel" | "temp" | "colligative" | "flashcards" | "quiz">("vessel");

  // Flashcards State
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{ q: string; correctAnswer: number; units: string } | null>(null);
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

  // Parsed Formula Data
  const parsedFormulaData = useMemo(() => {
    return parseChemicalFormula(chemicalFormulaInput);
  }, [chemicalFormulaInput]);

  // Main Calculations Engine
  const results = useMemo(() => {
    let calculatedMolality = targetMolalityM;
    let calculatedMoles = soluteMoles;
    let calculatedSolventKg = solventMassKg;
    let calculatedSoluteMassG = soluteMassG;

    // Effective Molar Mass
    const activeMolarMass = parsedFormulaData.isValid ? parsedFormulaData.totalMolarMass : molarMassGmol;

    if (calcMode === "molality") {
      calculatedMolality = solventMassKg > 0 ? soluteMoles / solventMassKg : 0;
    } else if (calcMode === "moles") {
      calculatedMoles = targetMolalityM * solventMassKg;
    } else if (calcMode === "solvent_mass") {
      calculatedSolventKg = targetMolalityM > 0 ? soluteMoles / targetMolalityM : 0;
    } else if (calcMode === "solute_mass") {
      calculatedMoles = targetMolalityM * solventMassKg;
      calculatedSoluteMassG = calculatedMoles * activeMolarMass;
    } else if (calcMode === "molality_from_mass") {
      calculatedMoles = activeMolarMass > 0 ? soluteMassG / activeMolarMass : 0;
      calculatedMolality = solventMassKg > 0 ? calculatedMoles / solventMassKg : 0;
    }

    // Colligative Property Calculations (Boiling Elevation & Freezing Depression)
    const solvent = SOLVENT_PRESETS[selectedSolventKey] || SOLVENT_PRESETS.water;
    const deltaTb = vantHoffFactor * solvent.Kb * calculatedMolality; // °C elevation
    const finalTb = solvent.pureTb + deltaTb;

    const deltaTf = vantHoffFactor * solvent.Kf * calculatedMolality; // °C depression
    const finalTf = solvent.pureTf - deltaTf;

    // Temperature Effect Simulation (Molarity volume changes vs Molality mass invariance)
    // Water density ~ 0.997 g/mL at 25°C, 0.958 g/mL at 100°C (approx thermal expansion)
    const volumetricExpansionFactor = 1 + (tempSimCelsius - 25) * 0.0004; // ~0.04% per °C expansion
    const simulatedMolarityM = calculatedMolality / volumetricExpansionFactor; // Molarity decreases as volume expands!

    return {
      calculatedMolality,
      calculatedMoles,
      calculatedSolventKg,
      calculatedSoluteMassG,
      activeMolarMass,
      solvent,
      deltaTb,
      finalTb,
      deltaTf,
      finalTf,
      simulatedMolarityM,
      volumetricExpansionFactor
    };
  }, [
    calcMode, soluteMoles, solventMassKg, targetMolalityM, soluteMassG, molarMassGmol,
    parsedFormulaData, selectedSolventKey, vantHoffFactor, tempSimCelsius
  ]);

  // Flashcards Data
  const flashcards = [
    { title: "Molality (m)", desc: "Molality is the number of moles of solute per Kilogram of pure solvent (m = n / kg_solvent)." },
    { title: "Temperature Independence", desc: "Because mass does not expand or contract with temperature changes, molality remains constant at high and low temperatures!" },
    { title: "Colligative Properties", desc: "Properties depending only on the number of solute particles in solution: Boiling Point Elevation (ΔTb = i Kb m) and Freezing Point Depression (ΔTf = i Kf m)." },
    { title: "Van't Hoff Factor (i)", desc: "The number of ionic particles produced per formula unit upon dissolving (e.g. Glucose i=1, NaCl i=2, CaCl₂ i=3)." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Molality & Physical Chemistry Analysis Summary
-----------------------------------------
Selected Mode: ${calcMode.toUpperCase()}
Molality: ${results.calculatedMolality.toFixed(4)} mol/kg (m)
Solute Amount: ${results.calculatedMoles.toFixed(4)} Moles (${results.calculatedSoluteMassG.toFixed(2)} grams)
Solvent Mass: ${results.calculatedSolventKg.toFixed(3)} kg (${(results.calculatedSolventKg * 1000).toFixed(0)} grams)
Active Molar Mass: ${results.activeMolarMass.toFixed(3)} g/mol
-----------------------------------------
Colligative Property Impacts (${results.solvent.name}):
Van't Hoff Factor (i): ${vantHoffFactor}
Boiling Point Elevation (ΔTb): +${results.deltaTb.toFixed(3)} °C (Final Tb: ${results.finalTb.toFixed(2)} °C)
Freezing Point Depression (ΔTf): -${results.deltaTf.toFixed(3)} °C (Final Tf: ${results.finalTf.toFixed(2)} °C)`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Molality solution summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the Molality (m) of a solution containing 0.5 moles of NaCl dissolved in 2.0 kg of pure water?", correctAnswer: 0.25, units: "mol/kg" },
      { q: "Calculate the Freezing Point Depression (ΔTf) of a 1.0 m NaCl solution in water (Kf = 1.86 °C/m, i = 2).", correctAnswer: 3.72, units: "°C" },
      { q: "How many grams of water solvent are required to dissolve 1.0 mole of solute to make a 2.0 mol/kg solution?", correctAnswer: 500.0, units: "grams" }
    ];

    const rand = questions[Math.floor(Math.random() * questions.length)];
    setQuizQuestion(rand);
    setQuizUserAnswer("");
    setQuizChecked(false);
  };

  const handleCheckQuiz = () => {
    if (!quizQuestion) return;
    const userVal = parseFloat(quizUserAnswer);
    const diff = Math.abs(userVal - quizQuestion.correctAnswer);
    setQuizIsCorrect(diff < 0.05);
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
            Molality Solver
          </span>
          <Link href="/calculators/molarity-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity Calculator
          </Link>
          <Link href="/calculators/solar-panel-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Solar Panel
          </Link>
          <Link href="/calculators/inverter-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Inverter Sizing
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
                <Scale className="text-[#518231]" />
                Molality Lab Cockpit
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
                <option value="molality">1. Calculate Molality (m = n / kg_solvent)</option>
                <option value="moles">2. Calculate Moles (n = m × kg_solvent)</option>
                <option value="solvent_mass">3. Calculate Solvent Mass (kg)</option>
                <option value="solute_mass">4. Calculate Solute Mass (Grams)</option>
                <option value="molality_from_mass">5. Calculate Molality from Mass & Solvent kg</option>
                <option value="molar_mass_assistant">6. Molar Mass Assistant & Formula Parser</option>
                <option value="molality_vs_molarity">7. Molality vs Molarity Temperature Split-Screen</option>
                <option value="colligative_properties">8. Colligative Properties (ΔTb & ΔTf)</option>
                <option value="solution_prep">9. Prepare Molal Solution Protocol</option>
              </select>
            </div>

            {/* Dynamic Input Controls */}
            <div className="space-y-5">
              
              {/* Primary Output Field */}
              <ReadOnlyField 
                label="Calculated Molality (m)" 
                val={`${results.calculatedMolality.toFixed(4)} mol/kg (${results.calculatedMolality.toFixed(4)} m)`} 
                icon={Scale} 
              />

              {/* Chemical Formula Parser Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Chemical Formula</span>
                  <input
                    type="text"
                    value={chemicalFormulaInput}
                    onChange={(e) => setChemicalFormulaInput(e.target.value)}
                    placeholder="e.g. NaCl, H2SO4, CaCl2"
                    className="w-32 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-xs uppercase"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {["NaCl", "CaCl2", "H2SO4", "C6H12O6", "CuSO4.5H2O"].map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setChemicalFormulaInput(f)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all border ${
                        chemicalFormulaInput === f 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Moles of Solute Input */}
              {(calcMode === "molality" || calcMode === "solvent_mass") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Solute Amount (Moles)</span>
                    <input
                      type="number"
                      step="0.05"
                      value={soluteMoles}
                      onChange={(e) => setSoluteMoles(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Solvent Mass (Kilograms) */}
              {(calcMode === "molality" || calcMode === "moles" || calcMode === "solute_mass" || calcMode === "molality_from_mass") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Solvent Mass (Kilograms)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={solventMassKg}
                      onChange={(e) => setSolventMassKg(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Target Molality Input */}
              {(calcMode === "moles" || calcMode === "solvent_mass" || calcMode === "solute_mass") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Target Molality (m)</span>
                    <input
                      type="number"
                      step="0.05"
                      value={targetMolalityM}
                      onChange={(e) => setTargetMolalityM(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Solute Mass Input (Grams) */}
              {calcMode === "molality_from_mass" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Solute Mass (Grams)</span>
                    <input
                      type="number"
                      step="1.0"
                      value={soluteMassG}
                      onChange={(e) => setSoluteMassG(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Colligative Property Inputs */}
              {(calcMode === "colligative_properties" || isAdvancedMode) && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Colligative Property Parameters</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Solvent Selection</span>
                      <select
                        value={selectedSolventKey}
                        onChange={(e) => setSelectedSolventKey(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value="water">Water (H₂O)</option>
                        <option value="benzene">Benzene (C₆H₆)</option>
                        <option value="ethanol">Ethanol</option>
                        <option value="chloroform">Chloroform</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Van't Hoff Factor (i)</span>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={vantHoffFactor}
                        onChange={(e) => setVantHoffFactor(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Link to Molarity Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need Molarity (mol/L) calculations?</span>
              <span className="text-[11px] text-slate-500">Calculate volumetric solution concentration and dilution ratios</span>
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

        {/* Right Column: Interactive Solvent Container & Colligative Visualizer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Dynamic Solvent Mass Vessel Visualizer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                ⚖️ Dynamic Solvent Mass Vessel & Colligative Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                {results.calculatedMolality.toFixed(3)} mol/kg
              </span>
            </div>

            {/* SVG Interactive Laboratory Solvent Vessel */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              <div className="w-full max-w-md h-36 relative flex items-center justify-center">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  
                  {/* Glass Vessel Body */}
                  <path d="M 140 20 L 260 20 L 280 100 L 120 100 Z" fill="none" stroke="#64748b" strokeWidth="3" />

                  {/* Solvent Liquid Fill (scaled by solvent mass) */}
                  <path 
                    d={`M 130 ${100 - Math.min(65, Math.max(20, results.calculatedSolventKg * 35))} L 270 ${100 - Math.min(65, Math.max(20, results.calculatedSolventKg * 35))} L 280 100 L 120 100 Z`} 
                    fill="#3b82f6" 
                    opacity="0.30" 
                  />

                  {/* Conceptual Solute Dots */}
                  {Array.from({ length: Math.min(30, Math.max(4, Math.round(results.calculatedMolality * 16))) }).map((_, idx) => (
                    <circle
                      key={idx}
                      cx={145 + (idx % 6) * 22}
                      cy={90 - Math.floor(idx / 6) * 12}
                      r="3.5"
                      fill="#f59e0b"
                    />
                  ))}

                  <text x="200" y="60" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    {results.calculatedMolality.toFixed(3)} m (mol/kg)
                  </text>
                  <text x="200" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    {results.calculatedSolventKg.toFixed(2)} kg Solvent
                  </text>
                </svg>
              </div>
            </div>

            {/* Colligative Property Results Dashboard */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-bold text-red-400 uppercase mb-1">
                  <span className="flex items-center gap-1"><Flame size={12} /> Boiling Elevation (ΔTb)</span>
                  <span>+{results.deltaTb.toFixed(2)} °C</span>
                </div>
                <span className="text-sm font-black text-white block">Final Tb: {results.finalTb.toFixed(2)} °C</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-bold text-blue-400 uppercase mb-1">
                  <span className="flex items-center gap-1"><Snowflake size={12} /> Freezing Depression (ΔTf)</span>
                  <span>-{results.deltaTf.toFixed(2)} °C</span>
                </div>
                <span className="text-sm font-black text-white block">Final Tf: {results.finalTf.toFixed(2)} °C</span>
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
                {(["vessel", "temp", "colligative", "flashcards", "quiz"] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setVisualTab(tab)}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                      visualTab === tab
                        ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {tab === "vessel" ? "Overview" : tab === "temp" ? "🌡️ Temp Sim" : tab === "colligative" ? "❄️ Colligative" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "vessel" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚖️ Physical Chemistry & Molality Principles</h4>
                    <p className="leading-relaxed">
                      Molality (**m = n / kg_solvent**) computes concentration relative to pure solvent mass. Unlike Molarity (**M = n / V**), molality is completely invariant under temperature variations because mass does not undergo thermal expansion!
                    </p>
                    {parsedFormulaData.isValid && parsedFormulaData.breakdown.length > 0 && (
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">Elemental Breakdown ({chemicalFormulaInput})</span>
                        <div className="grid grid-cols-2 gap-1 text-[11px]">
                          {parsedFormulaData.breakdown.map((item, idx) => (
                            <div key={idx} className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 py-0.5">
                              <span>{item.element} (×{item.count}):</span>
                              <span className="font-bold">{item.totalMass.toFixed(2)} g/mol</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Temperature Effect Simulation */}
                {visualTab === "temp" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Temperature Sensitivity Simulator</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span>Solution Temperature: {tempSimCelsius} °C</span>
                        <span className="text-[#518231]">Expansion Factor: {results.volumetricExpansionFactor.toFixed(3)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={tempSimCelsius}
                        onChange={(e) => setTempSimCelsius(Number(e.target.value))}
                        className="w-full accent-[#518231]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-green-50 dark:bg-green-950/40 p-3 rounded-2xl border border-green-200 dark:border-green-800 text-green-900 dark:text-green-200">
                        <span className="font-bold block mb-1">Molality (m = n / kg_solvent)</span>
                        <span className="text-base font-black">{results.calculatedMolality.toFixed(4)} m</span>
                        <span className="text-[10px] block text-green-700 dark:text-green-400 mt-1">100% Constant at all temperatures</span>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                        <span className="font-bold block mb-1">Estimated Molarity (M = n / V)</span>
                        <span className="text-base font-black">{results.simulatedMolarityM.toFixed(4)} M</span>
                        <span className="text-[10px] block text-amber-700 dark:text-amber-400 mt-1">Shifts due to liquid volume expansion</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Colligative Properties */}
                {visualTab === "colligative" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Colligative Property Derivations</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 space-y-2">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Solvent: {results.solvent.name}</span>
                        <span className="font-bold text-[#518231]">Kb = {results.solvent.Kb} | Kf = {results.solvent.Kf}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Boiling Elevation (ΔTb = i Kb m):</span>
                        <span className="font-bold text-red-400">+{results.deltaTb.toFixed(3)} °C (Tb = {results.finalTb.toFixed(2)} °C)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Freezing Depression (ΔTf = i Kf m):</span>
                        <span className="font-bold text-blue-400">-{results.deltaTf.toFixed(3)} °C (Tf = {results.finalTf.toFixed(2)} °C)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Solution Physical Chemistry Study Cards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molality & Colligative Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.01"
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
                                <span>Correct! The answer is {quizQuestion.correctAnswer} {quizQuestion.units}.</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={16} className="text-red-600 shrink-0" />
                                <span>Incorrect. The correct answer is {quizQuestion.correctAnswer} {quizQuestion.units}. Try again!</span>
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
