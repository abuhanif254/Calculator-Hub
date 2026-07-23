"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "auto_solver" 
  | "manual_manipulation" 
  | "target_verifier" 
  | "pathway_visualizer";

interface HessStep {
  id: string;
  originalEq: string;
  reactantsStr: string;
  productsStr: string;
  baseDeltaHKj: number;
  multiplier: number;
  isReversed: boolean;
}

interface HessPreset {
  id: string;
  name: string;
  targetEq: string;
  targetDeltaHKj: number;
  steps: HessStep[];
}

const HESS_LAW_PRESETS: HessPreset[] = [
  {
    id: "co_synthesis",
    name: "Synthesis of Carbon Monoxide (C + 0.5O2 ➔ CO)",
    targetEq: "C(s) + 0.5O2(g) ➔ CO(g)",
    targetDeltaHKj: -110.5,
    steps: [
      {
        id: "step1",
        originalEq: "C(s) + O2(g) ➔ CO2(g)",
        reactantsStr: "C(s) + O2(g)",
        productsStr: "CO2(g)",
        baseDeltaHKj: -393.5,
        multiplier: 1,
        isReversed: false
      },
      {
        id: "step2",
        originalEq: "CO(g) + 0.5O2(g) ➔ CO2(g)",
        reactantsStr: "CO(g) + 0.5O2(g)",
        productsStr: "CO2(g)",
        baseDeltaHKj: -283.0,
        multiplier: 1,
        isReversed: true // CO2(g) ➔ CO(g) + 0.5O2(g), +283.0 kJ
      }
    ]
  },
  {
    id: "methane_synthesis",
    name: "Synthesis of Methane (C + 2H2 ➔ CH4)",
    targetEq: "C(s) + 2H2(g) ➔ CH4(g)",
    targetDeltaHKj: -74.7,
    steps: [
      {
        id: "step1",
        originalEq: "C(s) + O2(g) ➔ CO2(g)",
        reactantsStr: "C(s) + O2(g)",
        productsStr: "CO2(g)",
        baseDeltaHKj: -393.5,
        multiplier: 1,
        isReversed: false
      },
      {
        id: "step2",
        originalEq: "2H2(g) + O2(g) ➔ 2H2O(l)",
        reactantsStr: "2H2(g) + O2(g)",
        productsStr: "2H2O(l)",
        baseDeltaHKj: -571.6,
        multiplier: 1,
        isReversed: false
      },
      {
        id: "step3",
        originalEq: "CH4(g) + 2O2(g) ➔ CO2(g) + 2H2O(l)",
        reactantsStr: "CH4(g) + 2O2(g)",
        productsStr: "CO2(g) + 2H2O(l)",
        baseDeltaHKj: -890.4,
        multiplier: 1,
        isReversed: true
      }
    ]
  },
  {
    id: "so3_synthesis",
    name: "Production of Sulfur Trioxide (2SO2 + O2 ➔ 2SO3)",
    targetEq: "2SO2(g) + O2(g) ➔ 2SO3(g)",
    targetDeltaHKj: -197.8,
    steps: [
      {
        id: "step1",
        originalEq: "S(s) + O2(g) ➔ SO2(g)",
        reactantsStr: "S(s) + O2(g)",
        productsStr: "SO2(g)",
        baseDeltaHKj: -296.8,
        multiplier: 2,
        isReversed: true
      },
      {
        id: "step2",
        originalEq: "2S(s) + 3O2(g) ➔ 2SO3(g)",
        reactantsStr: "2S(s) + 3O2(g)",
        productsStr: "2SO3(g)",
        baseDeltaHKj: -791.4,
        multiplier: 1,
        isReversed: false
      }
    ]
  },
  {
    id: "acetylene_synthesis",
    name: "Formation of Acetylene (2C + H2 ➔ C2H2)",
    targetEq: "2C(s) + H2(g) ➔ C2H2(g)",
    targetDeltaHKj: 226.7,
    steps: [
      {
        id: "step1",
        originalEq: "C(s) + O2(g) ➔ CO2(g)",
        reactantsStr: "C(s) + O2(g)",
        productsStr: "CO2(g)",
        baseDeltaHKj: -393.5,
        multiplier: 2,
        isReversed: false
      },
      {
        id: "step2",
        originalEq: "H2(g) + 0.5O2(g) ➔ H2O(l)",
        reactantsStr: "H2(g) + 0.5O2(g)",
        productsStr: "H2O(l)",
        baseDeltaHKj: -285.8,
        multiplier: 1,
        isReversed: false
      },
      {
        id: "step3",
        originalEq: "C2H2(g) + 2.5O2(g) ➔ 2CO2(g) + H2O(l)",
        reactantsStr: "C2H2(g) + 2.5O2(g)",
        productsStr: "2CO2(g) + H2O(l)",
        baseDeltaHKj: -1299.5,
        multiplier: 1,
        isReversed: true
      }
    ]
  }
];

export function HessLawCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("auto_solver");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("co_synthesis");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Active steps list
  const [steps, setSteps] = useState<HessStep[]>(HESS_LAW_PRESETS[0].steps);

  // Current Preset
  const preset = useMemo(() => {
    return HESS_LAW_PRESETS.find(p => p.id === selectedPresetId) || HESS_LAW_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setSteps(preset.steps);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"energy_profile" | "pathway_chart" | "flashcards" | "quiz">("energy_profile");

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

  // Step Modification Handlers
  const handleToggleReverse = (id: string) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, isReversed: !s.isReversed } : s));
  };

  const handleMultiplierChange = (id: string, newMult: number) => {
    if (newMult <= 0) return;
    setSteps(prev => prev.map(s => s.id === id ? { ...s, multiplier: newMult } : s));
  };

  // Main Hess's Law Calculation Engine
  const results = useMemo(() => {
    let totalTargetDeltaHKj = 0;

    const transformedSteps = steps.map(s => {
      const sign = s.isReversed ? -1 : 1;
      const adjustedDeltaHKj = s.baseDeltaHKj * s.multiplier * sign;
      totalTargetDeltaHKj += adjustedDeltaHKj;

      const effReactants = s.isReversed ? s.productsStr : s.reactantsStr;
      const effProducts = s.isReversed ? s.reactantsStr : s.productsStr;

      return {
        ...s,
        adjustedDeltaHKj,
        effReactants,
        effProducts
      };
    });

    const isExothermic = totalTargetDeltaHKj < 0;
    const reactionTypeLabel = isExothermic 
      ? "Exothermic Target Reaction (ΔH < 0)" 
      : "Endothermic Target Reaction (ΔH > 0)";
    const reactionTypeColor = isExothermic ? "text-[#518231]" : "text-amber-500";

    return {
      transformedSteps,
      totalTargetDeltaHKj,
      isExothermic,
      reactionTypeLabel,
      reactionTypeColor
    };
  }, [steps]);

  // Recharts Pathway Sensitivity Data (Cumulative Enthalpy Step by Step)
  const pathwayData = useMemo(() => {
    const data = [{ stepName: "Initial Reactants", CumulativeDeltaHKj: 0 }];
    let cumm = 0;

    results.transformedSteps.forEach((s, idx) => {
      cumm += s.adjustedDeltaHKj;
      data.push({
        stepName: `Step ${idx + 1}`,
        CumulativeDeltaHKj: Number(cumm.toFixed(1))
      });
    });

    return data;
  }, [results]);

  // Flashcards Data
  const flashcards = [
    { title: "Hess's Law of Constant Heat Summation", desc: "The total enthalpy change for a chemical reaction is independent of the pathway or number of steps: ΔH_total = ΣΔH_i." },
    { title: "Reaction Reversal Rule", desc: "If a chemical reaction is REVERSED, the magnitude of ΔH remains identical, but the sign FLIPS (ΔH_reverse = -ΔH_forward)." },
    { title: "Reaction Scaling Rule", desc: "If a reaction equation is MULTIPLIED by factor n, ΔH must be MULTIPLIED by n (ΔH_new = n * ΔH_original)." },
    { title: "State Function Property", desc: "Enthalpy H is a state function. Only the initial reactants state and final products state dictate net ΔH, regardless of intermediate reaction paths." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Hess's Law Thermochemistry Analysis (${preset.name})
------------------------------------
Target Reaction: ${preset.targetEq}
Calculated Target ΔH: ${results.totalTargetDeltaHKj.toFixed(1)} kJ
Reaction Type: ${results.reactionTypeLabel}

Individual Step Transformations:
${results.transformedSteps.map((s, i) => `${i + 1}. [${s.isReversed ? 'REVERSED' : 'FORWARD'}, Mult x${s.multiplier}] ${s.effReactants} ➔ ${s.effProducts} | ΔH = ${s.adjustedDeltaHKj.toFixed(1)} kJ`).join('\n')}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Hess's Law analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "If a chemical equation with ΔH = -250 kJ is REVERSED, what is the new ΔH?", correctAnswer: "+250 KJ" },
      { q: "If a reaction with ΔH = -100 kJ is MULTIPLIED by 3, what is the new ΔH?", correctAnswer: "-300 KJ" },
      { q: "Is Enthalpy H a State Function or Path Function?", correctAnswer: "STATE FUNCTION" }
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
          Thermochemistry Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Hess's Law Calculator
          </span>
          <Link href="/calculators/heat-of-reaction-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Heat of Reaction Calculator
          </Link>
          <Link href="/calculators/enthalpy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Enthalpy Calculator
          </Link>
          <Link href="/calculators/gibbs-free-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Gibbs Free Energy Calculator
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
                <Flame className="text-[#518231]" />
                Hess's Law Solver
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

            {/* Mode Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Solver Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="auto_solver">1. Automatic Multi-Step Hess Solver</option>
                <option value="manual_manipulation">2. Manual Reaction Manipulation</option>
                <option value="target_verifier">3. Target Reaction Verifier</option>
                <option value="pathway_visualizer">4. Enthalpy Pathway Visualizer</option>
              </select>
            </div>

            {/* Reaction Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {HESS_LAW_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Target Reaction Readout */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Chemical Equation</span>
              <p className="text-xs font-bold text-[#518231]">{preset.targetEq}</p>
            </div>

            {/* Steps Controls Grid */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Intermediate Step Transformations</span>

              {steps.map((s, idx) => {
                const sign = s.isReversed ? -1 : 1;
                const adjDeltaH = s.baseDeltaHKj * s.multiplier * sign;

                return (
                  <div key={s.id} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Step {idx + 1}</span>
                      <span className="text-xs font-black text-amber-500">{adjDeltaH.toFixed(1)} kJ</span>
                    </div>

                    <p className="text-xs font-mono text-slate-600 dark:text-slate-400 leading-relaxed">
                      {s.originalEq} (ΔH = {s.baseDeltaHKj} kJ)
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleToggleReverse(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          s.isReversed 
                            ? "bg-amber-950 text-amber-300 border-amber-800" 
                            : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {s.isReversed ? "↺ Reversed" : "➔ Forward"}
                      </button>

                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-400">Mult:</span>
                        <input
                          type="number"
                          step="1"
                          min="1"
                          max="10"
                          value={s.multiplier}
                          onChange={(e) => handleMultiplierChange(s.id, Number(e.target.value))}
                          className="w-16 bg-white dark:bg-slate-900 text-center p-1 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-xs"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Primary Output Readout */}
              <ReadOnlyField 
                label="Calculated Target Enthalpy (ΔH_target)" 
                val={`${results.totalTargetDeltaHKj.toFixed(1)} kJ`} 
                icon={Flame} 
              />

            </div>
          </div>

          {/* Integration Links to Heat of Reaction Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need calorimetry or reaction heat?</span>
              <span className="text-[11px] text-slate-500">Try our Heat of Reaction Calculator</span>
            </div>
            <Link
              href="/calculators/heat-of-reaction-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Heat Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Cockpit & Recharts Enthalpy Pathway */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Hess's Law Reaction Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                results.isExothermic 
                  ? "bg-green-950 text-green-300 border-green-800" 
                  : "bg-amber-950 text-amber-300 border-amber-800"
              }`}>
                {results.isExothermic ? "Exothermic" : "Endothermic"}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Target ΔH_rxn</span>
                <span className={`text-xs font-black ${results.reactionTypeColor}`}>{results.totalTargetDeltaHKj.toFixed(1)} kJ</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Theoretical Preset ΔH</span>
                <span className="text-xs font-black text-amber-400">{preset.targetDeltaHKj.toFixed(1)} kJ</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Active Steps</span>
                <span className="text-xs font-black text-white">{steps.length} Steps</span>
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
                {(["energy_profile", "pathway_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "energy_profile" ? "⚡ Target Analysis" : tab === "pathway_chart" ? "📊 Enthalpy Pathway" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Target Reaction Analysis */}
                {visualTab === "energy_profile" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Multi-Step Transformed Equations ({preset.name})
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Target Reaction: {preset.targetEq}</span>
                      </div>

                      <div className="space-y-2">
                        {results.transformedSteps.map((s, i) => (
                          <div key={s.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                            <div>
                              <span className="text-[10px] text-slate-400 block">Step {i + 1} [{s.isReversed ? "REVERSED" : "FORWARD"}, x{s.multiplier}]</span>
                              <span className="font-mono text-white">{s.effReactants} ➔ {s.effProducts}</span>
                            </div>
                            <span className="font-bold text-amber-400">{s.adjustedDeltaHKj.toFixed(1)} kJ</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center font-bold">
                        <span className="text-slate-300">Summed Net ΔH_target:</span>
                        <span className={results.reactionTypeColor}>{results.totalTargetDeltaHKj.toFixed(1)} kJ</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Recharts Enthalpy Pathway Plotter */}
                {visualTab === "pathway_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cumulative State Function Enthalpy Pathway (kJ)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={pathwayData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="stepName" />
                          <YAxis label={{ value: "Cumulative ΔH (kJ)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="CumulativeDeltaHKj" stroke="#10b981" strokeWidth={2} dot={true} name="Cumulative ΔH (kJ)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Hess's Law Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Hess's Law Quiz</h4>
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
