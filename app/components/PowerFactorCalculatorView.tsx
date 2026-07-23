"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Battery, Server, RefreshCw, ExternalLink, Gauge
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

type CategoryTab = "basic_pf" | "pf_correction" | "before_after" | "multi_load" | "motor_capacity";

interface CustomLoadItem {
  id: string;
  name: string;
  realPowerKw: number;
  powerFactor: number;
  isLagging: boolean;
  quantity: number;
}

const DEFAULT_MULTI_LOADS: CustomLoadItem[] = [
  { id: "1", name: "Induction Motor 1", realPowerKw: 45, powerFactor: 0.75, isLagging: true, quantity: 1 },
  { id: "2", name: "HVAC Compressor", realPowerKw: 30, powerFactor: 0.80, isLagging: true, quantity: 1 },
  { id: "3", name: "LED Lighting Array", realPowerKw: 15, powerFactor: 0.95, isLagging: true, quantity: 1 },
  { id: "4", name: "Switching Server PSU", realPowerKw: 10, powerFactor: 0.98, isLagging: true, quantity: 1 }
];

const COLORS = ["#518231", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b"];

export function PowerFactorCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("basic_pf");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // System Type & Voltage Inputs
  const [systemPhase, setSystemPhase] = useState<"1phase" | "3phase">("3phase");
  const [voltageV, setVoltageV] = useState<number>(480); // 480V Line-to-Line for 3-phase, 240V for 1-phase
  const [frequencyHz, setFrequencyHz] = useState<number>(60); // 50Hz or 60Hz

  // Tab 1: Basic PF Inputs
  const [realPowerKw, setRealPowerKw] = useState<number>(100.0); // kW
  const [powerFactorPf, setPowerFactorPf] = useState<number>(0.75); // Initial PF 0.75
  const [pfNature, setPfNature] = useState<"lagging" | "leading" | "unity">("lagging");

  // Tab 2 & 3: PF Correction Target Inputs
  const [targetPf, setTargetPf] = useState<number>(0.95); // Target PF 0.95
  const [capTopology, setCapTopology] = useState<"delta" | "wye">("delta");

  // Tab 4: Multi-Load State
  const [loadList, setLoadList] = useState<CustomLoadItem[]>(DEFAULT_MULTI_LOADS);
  const [newLoadName, setNewLoadName] = useState<string>("");
  const [newLoadKw, setNewLoadKw] = useState<number>(20);
  const [newLoadPf, setNewLoadPf] = useState<number>(0.80);

  // Tab 5: Motor & Transformer Inputs
  const [transformerRatingKva, setTransformerRatingKva] = useState<number>(250);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"triangle" | "phasor" | "charts" | "quiz">("triangle");

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

  // Calculations Engine
  const results = useMemo(() => {
    // 1. Basic Single Load & Phase Calculations
    const validPf = Math.min(1.0, Math.max(0.01, powerFactorPf));
    const phaseAngleRad = Math.acos(validPf);
    const phaseAngleDeg = (phaseAngleRad * 180) / Math.PI;

    const apparentPowerKva = validPf > 0 ? realPowerKw / validPf : realPowerKw;
    const reactivePowerKvar = realPowerKw * Math.tan(phaseAngleRad);

    // Current Calculation
    let lineCurrentAmps = 0;
    if (systemPhase === "1phase") {
      lineCurrentAmps = voltageV > 0 ? (realPowerKw * 1000) / (voltageV * validPf) : 0;
    } else {
      lineCurrentAmps = voltageV > 0 ? (realPowerKw * 1000) / (Math.sqrt(3) * voltageV * validPf) : 0;
    }

    // 2. Power Factor Correction ($Q_c$ & Capacitor Sizing)
    const validTargetPf = Math.min(1.0, Math.max(validPf, targetPf));
    const targetAngleRad = Math.acos(validTargetPf);
    const targetAngleDeg = (targetAngleRad * 180) / Math.PI;

    const targetApparentKva = realPowerKw / validTargetPf;
    const targetReactiveKvar = realPowerKw * Math.tan(targetAngleRad);

    const qcRequiredKvar = Math.max(0, reactivePowerKvar - targetReactiveKvar);

    // Capacitor Sizing in $\mu\text{F}$
    let capMicroFaradPerPhase = 0;
    const w = 2 * Math.PI * frequencyHz;
    if (systemPhase === "1phase") {
      capMicroFaradPerPhase = voltageV > 0 ? ((qcRequiredKvar * 1000) / (w * Math.pow(voltageV, 2))) * 1e6 : 0;
    } else {
      if (capTopology === "delta") {
        capMicroFaradPerPhase = voltageV > 0 ? ((qcRequiredKvar * 1000) / (3 * w * Math.pow(voltageV, 2))) * 1e6 : 0;
      } else {
        // Wye: V_phase = V_L / sqrt(3) -> V_phase^2 = V_L^2 / 3
        capMicroFaradPerPhase = voltageV > 0 ? ((qcRequiredKvar * 1000) / (w * Math.pow(voltageV, 2))) * 1e6 : 0;
      }
    }

    // 3. Before vs After Comparison
    let correctedCurrentAmps = 0;
    if (systemPhase === "1phase") {
      correctedCurrentAmps = voltageV > 0 ? (realPowerKw * 1000) / (voltageV * validTargetPf) : 0;
    } else {
      correctedCurrentAmps = voltageV > 0 ? (realPowerKw * 1000) / (Math.sqrt(3) * voltageV * validTargetPf) : 0;
    }

    const currentReductionAmps = Math.max(0, lineCurrentAmps - correctedCurrentAmps);
    const currentReductionPct = lineCurrentAmps > 0 ? (currentReductionAmps / lineCurrentAmps) * 100 : 0;
    const kvaCapacityReleased = Math.max(0, apparentPowerKva - targetApparentKva);

    // 4. Multi-Load Vector Aggregation ($\sum P + j \sum Q$)
    let multiTotalKw = 0;
    let multiTotalKvar = 0;

    loadList.forEach(item => {
      const itemKw = item.realPowerKw * item.quantity;
      const itemPf = Math.min(1.0, Math.max(0.01, item.powerFactor));
      const itemAngle = Math.acos(itemPf);
      const itemKvar = itemKw * Math.tan(itemAngle) * (item.isLagging ? 1 : -1);

      multiTotalKw += itemKw;
      multiTotalKvar += itemKvar;
    });

    const multiTotalKva = Math.sqrt(Math.pow(multiTotalKw, 2) + Math.pow(multiTotalKvar, 2));
    const multiAggregatePf = multiTotalKva > 0 ? multiTotalKw / multiTotalKva : 1.0;

    // 5. Transformer / Generator Utilization
    const initialTransformerUtilPct = transformerRatingKva > 0 ? (apparentPowerKva / transformerRatingKva) * 100 : 0;
    const correctedTransformerUtilPct = transformerRatingKva > 0 ? (targetApparentKva / transformerRatingKva) * 100 : 0;

    return {
      validPf,
      phaseAngleRad,
      phaseAngleDeg,
      apparentPowerKva,
      reactivePowerKvar,
      lineCurrentAmps,
      validTargetPf,
      targetAngleRad,
      targetAngleDeg,
      targetApparentKva,
      targetReactiveKvar,
      qcRequiredKvar,
      capMicroFaradPerPhase,
      correctedCurrentAmps,
      currentReductionAmps,
      currentReductionPct,
      kvaCapacityReleased,
      multiTotalKw,
      multiTotalKvar,
      multiTotalKva,
      multiAggregatePf,
      initialTransformerUtilPct,
      correctedTransformerUtilPct
    };
  }, [
    realPowerKw, powerFactorPf, pfNature, systemPhase, voltageV, frequencyHz, 
    targetPf, capTopology, loadList, transformerRatingKva
  ]);

  // Recharts Data (PF vs Apparent Power S)
  const pfCurveData = useMemo(() => {
    const data = [];
    for (let pf = 0.5; pf <= 1.0; pf += 0.05) {
      const sKva = realPowerKw / pf;
      const iAmps = systemPhase === "1phase" 
        ? (realPowerKw * 1000) / (voltageV * pf)
        : (realPowerKw * 1000) / (Math.sqrt(3) * voltageV * pf);

      data.push({
        PF: Number(pf.toFixed(2)),
        ApparentPower: Number(sKva.toFixed(1)),
        Current: Number(iAmps.toFixed(1))
      });
    }
    return data;
  }, [realPowerKw, systemPhase, voltageV]);

  // Handlers for Multi-Load List
  const handleAddLoad = () => {
    if (!newLoadName.trim()) {
      triggerNotification("error", "Please enter a valid load description name.");
      return;
    }
    const newItem: CustomLoadItem = {
      id: Date.now().toString(),
      name: newLoadName.trim(),
      realPowerKw: newLoadKw,
      powerFactor: newLoadPf,
      isLagging: true,
      quantity: 1
    };
    setLoadList([...loadList, newItem]);
    setNewLoadName("");
    triggerNotification("success", `Added "${newItem.name}" to multi-load array!`);
  };

  const handleRemoveLoad = (id: string) => {
    setLoadList(loadList.filter(item => item.id !== id));
  };

  const handleCopySummary = () => {
    const text = `Power Factor Analysis Summary
-----------------------------------------
System Configuration: ${systemPhase.toUpperCase()} @ ${voltageV}V (${frequencyHz}Hz)
Real Power (P): ${realPowerKw} kW
Initial Power Factor: ${results.validPf} (${pfNature.toUpperCase()}, Phase Angle: ${results.phaseAngleDeg.toFixed(1)}°)
-----------------------------------------
Apparent Power (S): ${results.apparentPowerKva.toFixed(1)} kVA
Reactive Power (Q): ${results.reactivePowerKvar.toFixed(1)} kVAR
Full Load Current: ${results.lineCurrentAmps.toFixed(1)} A
-----------------------------------------
Power Factor Correction:
Target Power Factor: ${results.validTargetPf}
Required Capacitive Compensation (Qc): ${results.qcRequiredKvar.toFixed(1)} kVAR
Capacitance per Phase: ${results.capMicroFaradPerPhase.toFixed(1)} µF (${capTopology.toUpperCase()})
Corrected Line Current: ${results.correctedCurrentAmps.toFixed(1)} A (Reduction: ${results.currentReductionPct.toFixed(1)}%)
Released Transformer Capacity: ${results.kvaCapacityReleased.toFixed(1)} kVA`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Power Factor analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the Apparent Power (kVA) for a 100 kW load operating at a 0.80 Power Factor?", correctAnswer: 125, units: "kVA" },
      { q: "What is the Reactive Power (kVAR) of a 100 kW load at a 0.80 Power Factor (Phase angle = 36.87°)?", correctAnswer: 75, units: "kVAR" },
      { q: "What capacitive compensation (kVAR) is required to raise 100 kW from 0.80 PF (75 kVAR) to 0.95 PF (32.9 kVAR)?", correctAnswer: 42.1, units: "kVAR" }
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
    setQuizIsCorrect(diff < 2);
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

      {/* 🔄 Physics & Electrical Hub Top Pill Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-1.5 shrink-0">
          <Layers size={14} className="text-[#518231]" />
          Electrical Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Power Factor
          </span>
          <Link href="/calculators/electrical-power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrical Power
          </Link>
          <Link href="/calculators/power-supply-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power Supply
          </Link>
          <Link href="/calculators/ohms-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ohm's Law
          </Link>
          <Link href="/calculators/electricity-cost-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electricity Cost
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
                <Gauge className="text-[#518231]" />
                PF Cockpit
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

            {/* Category Select Tabs */}
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-5 gap-1 mb-6 text-center">
              {[
                { key: "basic_pf", label: "Basic" },
                { key: "pf_correction", label: "Capacitor" },
                { key: "before_after", label: "Compare" },
                { key: "multi_load", label: "Multi" },
                { key: "motor_capacity", label: "Capacity" }
              ].map(t => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key as CategoryTab)}
                  className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all capitalize ${
                    activeTab === t.key 
                      ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm font-black" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* System Phase & Voltage Configuration */}
            <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">AC System Type</span>
                <select
                  value={systemPhase}
                  onChange={(e) => setSystemPhase(e.target.value as any)}
                  className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                >
                  <option value="3phase">3-Phase AC (Line-to-Line)</option>
                  <option value="1phase">1-Phase AC</option>
                </select>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Voltage (V)</span>
                <input
                  type="number"
                  value={voltageV}
                  onChange={(e) => setVoltageV(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                />
              </div>
            </div>

            {/* Dynamic Tab Inputs */}
            <div className="space-y-5">
              
              {/* Primary Output Display */}
              <ReadOnlyField 
                label="Apparent Power (S) & Reactive Power (Q)" 
                val={`${results.apparentPowerKva.toFixed(1)} kVA (${results.reactivePowerKvar.toFixed(1)} kVAR)`} 
                icon={Zap} 
              />

              {/* Real Power (P in kW) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Real Power (P in kW)</span>
                  <input
                    type="number"
                    step="5"
                    value={realPowerKw}
                    onChange={(e) => setRealPowerKw(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={realPowerKw}
                  onChange={(e) => setRealPowerKw(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Power Factor (PF) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Initial Power Factor (PF)</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    max="1.0"
                    value={powerFactorPf}
                    onChange={(e) => setPowerFactorPf(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.0"
                  step="0.01"
                  value={powerFactorPf}
                  onChange={(e) => setPowerFactorPf(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Tab 2: PF Correction Target Inputs */}
              {(activeTab === "pf_correction" || activeTab === "before_after") && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Power Factor Correction Parameters</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Target PF</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.8"
                        max="1.0"
                        value={targetPf}
                        onChange={(e) => setTargetPf(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Capacitor Topology</span>
                      <select
                        value={capTopology}
                        onChange={(e) => setCapTopology(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value="delta">Delta (Δ) Bank</option>
                        <option value="wye">Wye (Y) Bank</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Multi-Load Builder Inputs */}
              {activeTab === "multi_load" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Multi-Load Vector Aggregation (ΣP + jΣQ)</span>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {loadList.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                          <span className="text-[10px] text-slate-400">{item.realPowerKw} kW · PF {item.powerFactor} ({item.isLagging ? "Lagging" : "Leading"})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveLoad(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Load Form */}
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    <input
                      type="text"
                      placeholder="Load Description"
                      value={newLoadName}
                      onChange={(e) => setNewLoadName(e.target.value)}
                      className="col-span-3 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />
                    <input
                      type="number"
                      placeholder="kW"
                      value={newLoadKw}
                      onChange={(e) => setNewLoadKw(Number(e.target.value))}
                      className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="PF"
                      value={newLoadPf}
                      onChange={(e) => setNewLoadPf(Number(e.target.value))}
                      className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleAddLoad}
                      className="bg-[#518231] hover:bg-[#436a28] text-white font-bold p-2 rounded-xl text-xs flex items-center justify-center gap-1"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 5: Motor & Transformer Inputs */}
              {activeTab === "motor_capacity" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Transformer Capacity Utilization</span>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Transformer kVA Rating</span>
                    <input
                      type="number"
                      value={transformerRatingKva}
                      onChange={(e) => setTransformerRatingKva(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Link to Electrical Power Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need general 3-phase power calculations?</span>
              <span className="text-[11px] text-slate-500">Calculate P = √3 · V · I · PF across industrial feeders</span>
            </div>
            <Link
              href="/calculators/electrical-power-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Electrical Power
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Power Triangle & Analytics Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Dynamic Interactive Power Triangle Diagram */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                📐 Dynamic Interactive Power Triangle Diagram
              </span>
              <span className="text-xs font-bold text-green-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                PF: {results.validPf.toFixed(2)} ({results.phaseAngleDeg.toFixed(1)}°)
              </span>
            </div>

            {/* Interactive SVG Power Triangle Visualizer */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              {/* Formula Readout */}
              <div className="text-center mb-4 font-mono text-xs sm:text-sm">
                <span className="text-slate-400">Formula: </span>
                <span className="text-white font-bold">S = √(P² + Q²) = √({realPowerKw}² + {results.reactivePowerKvar.toFixed(1)}²) = </span>
                <span className="text-[#518231] font-black">{results.apparentPowerKva.toFixed(1)} kVA</span>
              </div>

              {/* SVG Right-Triangle Visualizer */}
              <div className="w-full max-w-md h-44 relative flex items-center justify-center">
                <svg viewBox="0 0 360 160" className="w-full h-full">
                  
                  {/* Triangle Path */}
                  <polygon points="50,130 300,130 300,30" fill="rgba(81, 130, 49, 0.15)" stroke="#518231" strokeWidth="2.5" />

                  {/* Horizontal Real Power Line P */}
                  <line x1="50" y1="130" x2="300" y2="130" stroke="#10b981" strokeWidth="3" />
                  <text x="175" y="148" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Real Power P = {realPowerKw} kW</text>

                  {/* Vertical Reactive Power Line Q */}
                  <line x1="300" y1="130" x2="300" y2="30" stroke="#f59e0b" strokeWidth="3" />
                  <text x="310" y="85" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="start">Q = {results.reactivePowerKvar.toFixed(1)} kVAR</text>

                  {/* Hypotenuse Apparent Power Line S */}
                  <line x1="50" y1="130" x2="300" y2="30" stroke="#3b82f6" strokeWidth="3" />
                  <text x="160" y="70" fill="#3b82f6" fontSize="11" fontWeight="bold" textAnchor="end">S = {results.apparentPowerKva.toFixed(1)} kVA</text>

                  {/* Phase Angle Arc φ */}
                  <path d="M 80 130 A 30 30 0 0 0 74 120" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                  <text x="95" y="122" fill="#e2e8f0" fontSize="10" fontWeight="bold">φ = {results.phaseAngleDeg.toFixed(1)}°</text>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Line Current (I)</span>
                <span className="text-xs font-black text-white">{results.lineCurrentAmps.toFixed(1)} A</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Required Qc</span>
                <span className="text-xs font-black text-amber-400">{results.qcRequiredKvar.toFixed(1)} kVAR</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Capacitance / Ph</span>
                <span className="text-xs font-black text-[#518231]">{results.capMicroFaradPerPhase.toFixed(1)} µF</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800">
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
                {(["triangle", "phasor", "charts", "quiz"] as const).map(tab => (
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
                    {tab === "triangle" ? "Overview" : tab === "phasor" ? "🔄 Phasor Diagram" : tab === "charts" ? "📊 PF Curves" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Theory Overview */}
                {visualTab === "triangle" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Power Factor Correction Engineering Theory</h4>
                    <p className="leading-relaxed">
                      Power factor is the ratio of real power ($P$) to apparent power ($S$). Adding parallel capacitor banks provides reactive compensation ($Q_c = P (\tan \phi_1 - \tan \phi_2)$), reducing line current by {results.currentReductionPct.toFixed(1)}% and freeing {results.kvaCapacityReleased.toFixed(1)} kVA of transformer capacity.
                    </p>
                  </div>
                )}

                {/* Tab 2: Phasor Diagram */}
                {visualTab === "phasor" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Phasor Vector Representation</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center h-48">
                      <svg viewBox="0 0 300 150" className="w-full h-full">
                        {/* Reference Voltage Line */}
                        <line x1="40" y1="75" x2="260" y2="75" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow)" />
                        <text x="260" y="70" fill="#3b82f6" fontSize="10" fontWeight="bold">V (Voltage)</text>

                        {/* Lagging Current Line */}
                        <line x1="40" y1="75" x2="220" y2="125" stroke="#10b981" strokeWidth="2.5" />
                        <text x="225" y="130" fill="#10b981" fontSize="10" fontWeight="bold">I (Lagging Current)</text>

                        {/* Angle Arc */}
                        <path d="M 90 75 A 50 50 0 0 1 85 90" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="98" y="88" fill="#f59e0b" fontSize="10" fontWeight="bold">φ = {results.phaseAngleDeg.toFixed(1)}°</text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Tab 3: Recharts Graph */}
                {visualTab === "charts" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">PF vs Apparent Power (kVA) & Line Current (A)</h4>
                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={pfCurveData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="PF" label={{ value: 'Power Factor', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`${val}`, "Value"]} />
                            <Line type="monotone" dataKey="ApparentPower" stroke="#3b82f6" strokeWidth="2" name="Apparent Power (kVA)" dot={false} />
                            <Line type="monotone" dataKey="Current" stroke="#10b981" strokeWidth="2" name="Line Current (A)" dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 4: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Power Factor Engineering Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.1"
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
