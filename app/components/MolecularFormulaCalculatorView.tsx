"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "empirical_plus_molar_mass" 
  | "empirical_plus_relative_mass" 
  | "percent_plus_molar_mass" 
  | "elemental_mass_plus_molar_mass" 
  | "molecular_formula_analysis" 
  | "empirical_reduction" 
  | "molecular_multiplier_validator";

interface PresetItem {
  id: string;
  name: string;
  empiricalStr: string;
  empiricalMass: number;
  molecularMolarMass: number;
  expectedFormula: string;
  n: number;
  elements: { symbol: string; count: number; mass: number }[];
}

const PRESETS: PresetItem[] = [
  {
    id: "glucose",
    name: "Glucose (Empirical: CH₂O, Molar Mass: 180.16 g/mol)",
    empiricalStr: "CH₂O",
    empiricalMass: 30.026,
    molecularMolarMass: 180.156,
    expectedFormula: "C₆H₁₂O₆",
    n: 6,
    elements: [
      { symbol: "C", count: 1, mass: 12.011 },
      { symbol: "H", count: 2, mass: 1.008 },
      { symbol: "O", count: 1, mass: 15.999 }
    ]
  },
  {
    id: "dinitrogen_tetroxide",
    name: "Dinitrogen Tetroxide (Empirical: NO₂, Molar Mass: 92.01 g/mol)",
    empiricalStr: "NO₂",
    empiricalMass: 46.0055,
    molecularMolarMass: 92.011,
    expectedFormula: "N₂O₄",
    n: 2,
    elements: [
      { symbol: "N", count: 1, mass: 14.007 },
      { symbol: "O", count: 2, mass: 15.999 }
    ]
  },
  {
    id: "benzene",
    name: "Benzene (Empirical: CH, Molar Mass: 78.11 g/mol)",
    empiricalStr: "CH",
    empiricalMass: 13.019,
    molecularMolarMass: 78.114,
    expectedFormula: "C₆H₆",
    n: 6,
    elements: [
      { symbol: "C", count: 1, mass: 12.011 },
      { symbol: "H", count: 1, mass: 1.008 }
    ]
  },
  {
    id: "hydrogen_peroxide",
    name: "Hydrogen Peroxide (Empirical: HO, Molar Mass: 34.01 g/mol)",
    empiricalStr: "HO",
    empiricalMass: 17.007,
    molecularMolarMass: 34.014,
    expectedFormula: "H₂O₂",
    n: 2,
    elements: [
      { symbol: "H", count: 1, mass: 1.008 },
      { symbol: "O", count: 1, mass: 15.999 }
    ]
  }
];

const CHART_COLORS = ["#518231", "#eab308", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6", "#f97316"];

export function MolecularFormulaCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("empirical_plus_molar_mass");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("glucose");

  // Inputs
  const [inputEmpiricalStr, setInputEmpiricalStr] = useState<string>("CH2O");
  const [targetMolarMass, setTargetMolarMass] = useState<number>(180.16);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"formula_tree" | "donut" | "flashcards" | "quiz">("formula_tree");

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

  const selectedPreset = useMemo(() => {
    return PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];
  }, [selectedPresetId]);

  // Calculations Engine
  const results = useMemo(() => {
    const item = selectedPreset;
    const empiricalMass = item.empiricalMass;
    const rawN = targetMolarMass > 0 && empiricalMass > 0 ? targetMolarMass / empiricalMass : 1;
    const roundedN = Math.max(1, Math.round(rawN));
    const diffN = Math.abs(rawN - roundedN);

    const isMultiplierValid = diffN < 0.08;

    // Derived Molecular Formula Elements
    const molecularElements = item.elements.map(e => ({
      ...e,
      molecularCount: e.count * roundedN,
      totalElementMass: e.count * roundedN * e.mass
    }));

    const calculatedMolecularMass = empiricalMass * roundedN;

    // Format Molecular Formula string
    const molecularFormulaStr = molecularElements
      .map(e => `${e.symbol}${e.molecularCount > 1 ? e.molecularCount : ""}`)
      .join("");

    return {
      empiricalStr: item.empiricalStr,
      empiricalMass,
      targetMolarMass,
      rawN,
      roundedN,
      diffN,
      isMultiplierValid,
      molecularElements,
      calculatedMolecularMass,
      molecularFormulaStr
    };
  }, [selectedPreset, targetMolarMass]);

  // Recharts Composition Donut Chart Data
  const chartData = results.molecularElements.map(e => ({
    name: e.symbol,
    value: Number(e.totalElementMass.toFixed(2))
  }));

  // Flashcards Data
  const flashcards = [
    { title: "Molecular Formula Definition", desc: "The molecular formula shows the actual number of atoms of each element in a single molecule of a chemical compound." },
    { title: "Molecular Multiplier (n)", desc: "n = (Molecular Molar Mass) / (Empirical Formula Mass). Multiply all empirical subscripts by integer n." },
    { title: "Relative Molecular Mass (Mr)", desc: "Relative molecular mass (Mr) is dimensionless and numerically equal to molar mass in g/mol." },
    { title: "Formula Subscript Reduction", desc: "Dividing all subscripts of a molecular formula by their Greatest Common Divisor (GCD) yields the empirical formula." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Molecular Formula Analysis Summary
-----------------------------------------
Selected Reaction Preset: ${selectedPreset.name}
Empirical Formula: ${results.empiricalStr} (${results.empiricalMass.toFixed(3)} g/mol)
Target Molecular Molar Mass: ${targetMolarMass.toFixed(2)} g/mol
Calculated Multiplier (n): ${results.roundedN} (Raw: ${results.rawN.toFixed(3)})
-----------------------------------------
Calculated Molecular Formula: ${results.molecularFormulaStr} (${results.calculatedMolecularMass.toFixed(3)} g/mol)
Multiplier Validation: ${results.isMultiplierValid ? "✓ Valid Integer Multiplier" : "⚠️ Experimental Variance Detected"}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Molecular formula summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "If the empirical formula is CH2O (30.03 g/mol) and molar mass is 180.16 g/mol, what is the molecular formula?", correctAnswer: "C6H12O6" },
      { q: "If the empirical formula is NO2 (46.01 g/mol) and molar mass is 92.01 g/mol, what is the molecular multiplier n?", correctAnswer: "2" },
      { q: "What is the empirical formula derived from C6H6?", correctAnswer: "CH" }
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
            Molecular Formula
          </span>
          <Link href="/calculators/empirical-formula-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Empirical Formula
          </Link>
          <Link href="/calculators/molar-mass-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molar Mass
          </Link>
          <Link href="/calculators/percent-composition-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Percent Composition
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
                Molecular Formula Cockpit
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

            {/* Compound Presets Dropdown */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Compound Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => {
                  setSelectedPresetId(e.target.value);
                  const found = PRESETS.find(p => p.id === e.target.value);
                  if (found) setTargetMolarMass(found.molecularMolarMass);
                }}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Calculation Mode Dropdown */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculation Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="empirical_plus_molar_mass">1. Empirical Formula + Molecular Molar Mass (n = M/M_emp)</option>
                <option value="empirical_plus_relative_mass">2. Empirical Formula + Relative Molecular Mass (Mr)</option>
                <option value="empirical_reduction">3. Empirical Formula Reduction (Subscript GCD Reduction)</option>
                <option value="molecular_multiplier_validator">4. Molecular Multiplier Integer Validator</option>
              </select>
            </div>

            {/* Dynamic Controls */}
            <div className="space-y-5">
              
              {/* Primary Output Readout */}
              <ReadOnlyField 
                label="Calculated Molecular Formula" 
                val={results.molecularFormulaStr} 
                icon={Atom} 
              />

              {/* Target Molecular Molar Mass Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Molecular Molar Mass</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={targetMolarMass}
                      onChange={(e) => setTargetMolarMass(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">g/mol</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="10.0"
                  max="400.0"
                  step="0.5"
                  value={targetMolarMass}
                  onChange={(e) => setTargetMolarMass(Number(e.target.value))}
                  className="w-full accent-[#518231]"
                />
              </div>

            </div>
          </div>

          {/* Integration Links to Empirical Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need simplest empirical whole-number ratios?</span>
              <span className="text-[11px] text-slate-500">Try our Empirical Formula Calculator</span>
            </div>
            <Link
              href="/calculators/empirical-formula-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Empirical Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Molecular Cockpit & Donut Composition */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Molecular Formula & Multiplier Tree */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧬 Molecular Formula Analysis Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                n = {results.roundedN} Multiplier
              </span>
            </div>

            {/* Dynamic Formula Derivation Tree */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 text-center mb-4">
              <span className="text-xs font-bold text-slate-400 block mb-1">Formula Derivation Flow</span>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 block">Empirical Formula</span>
                  <span className="text-lg font-black text-white">{results.empiricalStr}</span>
                  <span className="text-[10px] text-slate-400 block">{results.empiricalMass.toFixed(2)} g/mol</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-[#518231]">× {results.roundedN}</span>
                  <ArrowRight size={18} className="text-[#518231] hidden sm:block" />
                  <ArrowDown size={18} className="text-[#518231] sm:hidden" />
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 block">Molecular Formula</span>
                  <span className="text-lg font-black text-amber-400">{results.molecularFormulaStr}</span>
                  <span className="text-[10px] text-slate-400 block">{results.calculatedMolecularMass.toFixed(2)} g/mol</span>
                </div>
              </div>
            </div>

            {/* Element Subscript Multiplier Matrix Table */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Element Subscript Multiplier Table</span>
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Element</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Empirical Count</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Multiplier (n)</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Molecular Count</div>

                {results.molecularElements.map((item) => (
                  <React.Fragment key={item.symbol}>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white font-bold">{item.symbol}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white">{item.count}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[#518231] font-bold">× {results.roundedN}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-amber-400 font-black">{item.molecularCount}</div>
                  </React.Fragment>
                ))}
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
                {(["formula_tree", "donut", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "formula_tree" ? "🧬 Multiplier Validation" : tab === "donut" ? "📊 Element Mass Donut" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Multiplier Validation Engine */}
                {visualTab === "formula_tree" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molecular Multiplier (n) Validation</h4>
                    <p className="leading-relaxed">
                      n = Target Molar Mass ({targetMolarMass.toFixed(2)}) / Empirical Mass ({results.empiricalMass.toFixed(2)}) = <span className="font-bold text-[#518231]">{results.rawN.toFixed(3)}</span>.
                      Rounded integer multiplier n = <span className="font-black text-[#518231]">{results.roundedN}</span>.
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Donut Pie Chart */}
                {visualTab === "donut" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molecular Element Mass Distribution</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={75}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molecular Formula Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molecular Formula Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. C6H12O6)"
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
