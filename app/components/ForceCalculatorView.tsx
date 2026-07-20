"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Clock, Zap, Bike, Car, Train, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowRight, ShieldAlert
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "force" | "mass" | "acceleration";

// Conversion factors to SI base units (N, kg, m/s²)
const FORCE_CONVERSIONS: Record<string, number> = {
  "N": 1,
  "kN": 1000,
  "MN": 1000000,
  "lbf": 4.44822,
  "kgf": 9.80665,
  "dyne": 0.00001
};

const MASS_CONVERSIONS: Record<string, number> = {
  "kg": 1,
  "g": 0.001,
  "mg": 0.000001,
  "lb": 0.453592,
  "oz": 0.0283495,
  "ton": 1000
};

const ACCELERATION_CONVERSIONS: Record<string, number> = {
  "m/s²": 1,
  "ft/s²": 0.3048
};

// Real-world presets
interface ForcePreset {
  name: string;
  mass: number; // kg
  accel: number; // m/s²
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const FORCE_PRESETS: ForcePreset[] = [
  { name: "Walking Person", mass: 70, accel: 0.5, icon: Zap, desc: "70 kg @ 0.5 m/s² (35 N)" },
  { name: "Sprinting Athlete", mass: 75, accel: 3.5, icon: Zap, desc: "75 kg @ 3.5 m/s² (262.5 N)" },
  { name: "Cyclist", mass: 85, accel: 1.2, icon: Bike, desc: "85 kg @ 1.2 m/s² (102 N)" },
  { name: "Motorcycle", mass: 200, accel: 6.0, icon: Car, desc: "200 kg @ 6 m/s² (1,200 N)" },
  { name: "Family Car", mass: 1500, accel: 3.0, icon: Car, desc: "1,500 kg @ 3 m/s² (4.5 kN)" },
  { name: "Semi Truck", mass: 15000, accel: 1.5, icon: Train, desc: "15,000 kg @ 1.5 m/s² (22.5 kN)" },
  { name: "Bullet Train", mass: 400000, accel: 0.8, icon: Train, desc: "400,000 kg @ 0.8 m/s² (320 kN)" },
  { name: "Commercial Jet Engine", mass: 180000, accel: 2.5, icon: Plane, desc: "180,000 kg @ 2.5 m/s² (450 kN)" },
  { name: "Space Rocket Thrust", mass: 2800000, accel: 12.1, icon: Rocket, desc: "2.8M kg @ 12.1 m/s² (33.88 MN)" },
  { name: "Elevator Cabin", mass: 1000, accel: 1.5, icon: Gauge, desc: "1,000 kg @ 1.5 m/s² (1.5 kN)" }
];

// Force Tier Benchmarks
const FORCE_TIERS = [
  { name: "Small Force", max: 100, color: "#10b981", label: "< 100 N (Human push)" },
  { name: "Medium Force", max: 10000, color: "#3b82f6", label: "100 N - 10 kN (Cars)" },
  { name: "Large Force", max: 1000000, color: "#f59e0b", label: "10 kN - 1 MN (Trains/Jets)" },
  { name: "Extreme Force", max: Infinity, color: "#ef4444", label: "> 1 MN (Rockets)" }
];

export function ForceCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("force");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [massVal, setMassVal] = useState<number>(1500);
  const [massUnit, setMassUnit] = useState<string>("kg");

  const [accelVal, setAccelVal] = useState<number>(3.0);
  const [accelUnit, setAccelUnit] = useState<string>("m/s²");

  const [forceVal, setForceVal] = useState<number>(4500);
  const [forceUnit, setForceUnit] = useState<string>("N");

  // Advanced Tabs
  const [activeTab, setActiveTab] = useState<"visuals" | "explanation" | "presets" | "quiz">("visuals");

  // Animation vector states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<{
    q: string;
    correctAnswer: number;
    units: string;
    type: CalcMode;
  } | null>(null);
  const [quizUserAnswer, setQuizUserAnswer] = useState<string>("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  // Alert banner
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
    generateQuiz();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode")) setCalcMode(params.get("mode") as CalcMode);
      if (params.get("m")) setMassVal(Number(params.get("m")));
      if (params.get("a")) setAccelVal(Number(params.get("a")));
      if (params.get("f")) setForceVal(Number(params.get("f")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (N, kg, m/s²)
  const siInputs = useMemo(() => {
    const mSI = massVal * (MASS_CONVERSIONS[massUnit] || 1);
    const aSI = accelVal * (ACCELERATION_CONVERSIONS[accelUnit] || 1);
    const fSI = forceVal * (FORCE_CONVERSIONS[forceUnit] || 1);
    return { mSI, aSI, fSI };
  }, [massVal, massUnit, accelVal, accelUnit, forceVal, forceUnit]);

  // Perform Newton's Second Law Calculation: F = m * a
  const results = useMemo(() => {
    let finalFSI = siInputs.fSI;
    let finalMSI = siInputs.mSI;
    let finalASI = siInputs.aSI;

    if (calcMode === "force") {
      finalFSI = siInputs.mSI * siInputs.aSI;
    } else if (calcMode === "mass") {
      if (Math.abs(siInputs.aSI) > 0.000001) {
        finalMSI = siInputs.fSI / siInputs.aSI;
      } else {
        finalMSI = 0;
      }
    } else if (calcMode === "acceleration") {
      if (Math.abs(siInputs.mSI) > 0.000001) {
        finalASI = siInputs.fSI / siInputs.mSI;
      } else {
        finalASI = 0;
      }
    }

    // Convert results back to selected display units
    const fDisplay = finalFSI / (FORCE_CONVERSIONS[forceUnit] || 1);
    const mDisplay = finalMSI / (MASS_CONVERSIONS[massUnit] || 1);
    const aDisplay = finalASI / (ACCELERATION_CONVERSIONS[accelUnit] || 1);

    // Determine Force Tier
    const tier = FORCE_TIERS.find(t => finalFSI <= t.max) || FORCE_TIERS[FORCE_TIERS.length - 1];

    return {
      fSI: finalFSI,
      mSI: finalMSI,
      aSI: finalASI,
      fDisplay,
      mDisplay,
      aDisplay,
      tier
    };
  }, [calcMode, siInputs, forceUnit, massUnit, accelUnit]);

  // Motion Graphs Data (Force vs Mass & Force vs Acceleration)
  const graphData = useMemo(() => {
    const steps = 10;
    const data = [];
    const baseMass = Math.max(1, results.mSI);
    const dM = (baseMass * 2) / steps;
    for (let i = 1; i <= steps; i++) {
      const m = i * dM;
      const f = m * results.aSI;
      data.push({
        Mass: Number(m.toFixed(1)),
        Force: Number((f / (FORCE_CONVERSIONS[forceUnit] || 1)).toFixed(2))
      });
    }
    return data;
  }, [results, forceUnit]);

  // Animation timeline effect
  const durationSim = 5; // 5 seconds simulation track
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      const tick = (now: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = now;
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        setCurrentTime(prev => {
          const nextVal = prev + delta * playbackSpeed;
          if (nextVal >= durationSim) {
            setIsPlaying(false);
            return durationSim;
          }
          return nextVal;
        });

        animationRef.current = requestAnimationFrame(tick);
      };
      animationRef.current = requestAnimationFrame(tick);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      lastTimeRef.current = null;
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Position calculation for vector animation: s = 0.5 * a * t^2
  const currentPosRatio = useMemo(() => {
    const totalDist = 0.5 * results.aSI * Math.pow(durationSim, 2);
    const dInstant = 0.5 * results.aSI * Math.pow(currentTime, 2);
    if (totalDist <= 0) return 0;
    return Math.min(1, dInstant / totalDist);
  }, [currentTime, results.aSI]);

  // Preset Applicator
  const applyPreset = (preset: ForcePreset) => {
    setMassVal(preset.mass);
    setMassUnit("kg");
    setAccelVal(preset.accel);
    setAccelUnit("m/s²");
    setCalcMode("force");
    triggerNotification("success", `Loaded ${preset.name} parameters!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&m=${massVal}&a=${accelVal}&f=${forceVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario parameters link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Force Calculation (F = m · a)
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Force: ${results.fDisplay.toFixed(4)} ${forceUnit}
Mass: ${results.mDisplay.toFixed(3)} ${massUnit}
Acceleration: ${results.aDisplay.toFixed(3)} ${accelUnit}
-----------------------------------------
SI Base values:
Force: ${results.fSI.toFixed(2)} N
Mass: ${results.mSI.toFixed(2)} kg
Acceleration: ${results.aSI.toFixed(2)} m/s²`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "What net force is required to accelerate a 1200 kg car at a rate of 2.5 m/s²?",
        correctAnswer: 3000,
        units: "N",
        type: "force" as CalcMode
      },
      {
        q: "If a force of 500 N is applied to a box resulting in an acceleration of 5 m/s², what is the mass of the box in kg?",
        correctAnswer: 100,
        units: "kg",
        type: "mass" as CalcMode
      },
      {
        q: "What acceleration in m/s² is produced when a force of 45 N acts on a 9 kg object?",
        correctAnswer: 5,
        units: "m/s²",
        type: "acceleration" as CalcMode
      }
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
    setQuizIsCorrect(diff < 0.1);
    setQuizChecked(true);
  };

  return (
    <div className="w-full">
      {/* Alert Banner */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all duration-300 animate-slide-in ${
          notification.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200" 
            : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
        }`}>
          <CheckCircle2 size={18} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Cockpit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="text-[#518231]" />
                Force Cockpit (F = m · a)
              </h2>

              {/* Simple vs Advanced Mode Toggle */}
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

            {/* Mode Select Segmented Control */}
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-3 gap-1 mb-8">
              {[
                { key: "force", label: "Force (F)" },
                { key: "mass", label: "Mass (m)" },
                { key: "acceleration", label: "Acceleration (a)" }
              ].map(m => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setCalcMode(m.key as CalcMode)}
                  className={`py-2 px-1 text-center text-xs font-bold rounded-xl transition-all capitalize ${
                    calcMode === m.key 
                      ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm font-black" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Parameter Fields based on Calculation Mode */}
            <div className="space-y-6">
              
              {/* Mass Input (m) */}
              {calcMode !== "mass" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Mass (m)
                      <InfoTooltip text="Quantity of matter contained within the object." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={massVal}
                        onChange={(e) => setMassVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={massUnit}
                        onChange={(e) => setMassUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(MASS_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5000"
                    step="5"
                    value={massVal}
                    onChange={(e) => setMassVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Mass (m - Calculated)" val={`${results.mDisplay.toFixed(3)} ${massUnit}`} icon={Gauge} />
              )}

              {/* Acceleration Input (a) */}
              {calcMode !== "acceleration" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Acceleration (a)
                      <InfoTooltip text="The rate of change of velocity produced by the applied force." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.1"
                        value={accelVal}
                        onChange={(e) => setAccelVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={accelUnit}
                        onChange={(e) => setAccelUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(ACCELERATION_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="50"
                    step="0.1"
                    value={accelVal}
                    onChange={(e) => setAccelVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Acceleration (a - Calculated)" val={`${results.aDisplay.toFixed(3)} ${accelUnit}`} icon={Activity} />
              )}

              {/* Force Input (F) */}
              {calcMode !== "force" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Applied Force (F)
                      <InfoTooltip text="The net push or pull force acting on the object." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={forceVal}
                        onChange={(e) => setForceVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={forceUnit}
                        onChange={(e) => setForceUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(FORCE_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20000"
                    step="10"
                    value={forceVal}
                    onChange={(e) => setForceVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Force (F - Calculated)" val={`${results.fDisplay.toFixed(3)} ${forceUnit}`} icon={Zap} />
              )}

            </div>
          </div>

          {/* Smart Conversion Table panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Smart Force Conversion Table
            </h3>
            <div className="space-y-2">
              {Object.keys(FORCE_CONVERSIONS).map(uKey => {
                const convVal = results.fSI / FORCE_CONVERSIONS[uKey];
                return (
                  <div key={uKey} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 font-semibold">{uKey}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{convVal.toFixed(4)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Dashboard, Vector Simulation Canvas & Graphs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                Vector Force Simulation & Radial Arc Gauge
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{results.tier.name}</span>
              </div>
            </div>

            {/* Radial Arc Force Gauge */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 mb-4 flex flex-col items-center justify-center relative">
              <div className="w-48 h-24 relative overflow-hidden flex justify-center">
                <svg viewBox="0 0 100 50" className="w-44 h-22">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
                  
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke={results.tier.color}
                    strokeWidth="10"
                    strokeDasharray="126"
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(1, results.fSI)) / 8) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.fSI)) / 8))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.fSI)) / 8))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.fDisplay.toFixed(2)} {forceUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {results.tier.label}
                </div>
              </div>
            </div>

            {/* Vector Animation Canvas */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-32 flex items-center justify-between">
              
              {/* Force Arrow Vector */}
              <div 
                className="absolute top-4 left-6 flex items-center gap-1 transition-all duration-300"
                style={{ left: `${10 + currentPosRatio * 75}%` }}
              >
                <div className="bg-[#518231] text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                  <ArrowRight size={12} />
                  <span>F = {results.fSI.toFixed(1)} N</span>
                </div>
              </div>

              {/* Motion Track line */}
              <div className="w-full h-1 bg-slate-800 rounded-full relative mt-6">
                <div 
                  className="absolute -top-3.5 -translate-x-1/2 w-8 h-8 bg-[#518231] rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all ease-linear"
                  style={{ left: `${currentPosRatio * 100}%` }}
                >
                  <Car size={14} className="text-white" />
                </div>
              </div>
            </div>

            {/* Animation Controls Panel */}
            <div className="mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#518231] hover:bg-[#436a28] text-white p-2.5 rounded-xl transition-colors"
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl transition-colors"
                >
                  <RotateCcw size={15} />
                </button>
              </div>

              {/* Time counter */}
              <div className="text-xs font-mono text-slate-300">
                Elapsed: <strong>{currentTime.toFixed(2)}s</strong> / {durationSim}s
              </div>

              {/* Speed control buttons */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
                {[
                  { label: "0.25x", value: 0.25 },
                  { label: "0.5x", value: 0.5 },
                  { label: "1x", value: 1.0 },
                  { label: "2x", value: 2.0 }
                ].map((speedOpt) => (
                  <button
                    key={speedOpt.value}
                    type="button"
                    onClick={() => setPlaybackSpeed(speedOpt.value)}
                    className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                      playbackSpeed === speedOpt.value
                        ? "bg-[#518231] text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {speedOpt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard Stat Cards */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Net Force</span>
                <div className="text-xs sm:text-sm font-black text-[#518231] mt-1">{results.fDisplay.toFixed(2)} {forceUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Object Mass</span>
                <div className="text-xs sm:text-sm font-black text-amber-400 mt-1">{results.mDisplay.toFixed(2)} {massUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Acceleration</span>
                <div className="text-xs sm:text-sm font-black text-blue-400 mt-1">{results.aDisplay.toFixed(2)} {accelUnit}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Share2 size={13} />
                Share Link
              </button>
              <button
                type="button"
                onClick={handleCopyResults}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Copy size={13} />
                Copy text
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
              
              {/* Header Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
                {(["visuals", "explanation", "presets", "quiz"] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                      activeTab === tab
                        ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {tab === "visuals" ? "Graphs" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Force vs Mass Recharts Graph */}
                {activeTab === "visuals" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Force vs Mass Curve (at {results.aDisplay.toFixed(2)} {accelUnit})</h4>
                    <p className="text-xs text-slate-500">Demonstrates proportional force requirements as object mass increases:</p>
                    
                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={graphData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Mass" label={{ value: "Mass (kg)", position: "insideBottom", offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Force" stroke="#518231" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 2: Step-by-Step Mathematical Derivation */}
                {activeTab === "explanation" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-Step Solution</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Newton's 2nd Law Formula: F = m · a</div>
                      <div>2. Knowns: m = {results.mSI.toFixed(2)} kg, a = {results.aSI.toFixed(2)} m/s²</div>
                      <div>3. Calculation: F = {results.mSI.toFixed(2)} · {results.aSI.toFixed(2)}</div>
                      <div>4. Result: F = {results.fSI.toFixed(2)} N ({results.fDisplay.toFixed(3)} {forceUnit})</div>
                    </div>

                    <div className="bg-[#518231]/5 border border-[#518231]/20 p-4 rounded-2xl flex items-start gap-2 text-xs">
                      <Sparkles size={16} className="text-[#518231] shrink-0 mt-0.5" />
                      <div>
                        <strong>Scientific Notation:</strong> In standard scientific notation, {results.fSI.toFixed(2)} N equals <strong>{results.fSI.toExponential(3)} N</strong>.
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Real-World Presets */}
                {activeTab === "presets" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Real-World Force Presets</h4>
                    <p className="text-xs text-slate-500">Click any preset to load mass and acceleration values directly into the calculator:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                      {FORCE_PRESETS.map((preset, idx) => {
                        const IconComp = preset.icon;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-950 hover:bg-[#518231]/10 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 text-left transition-all group"
                          >
                            <div className="p-2 bg-white dark:bg-slate-900 text-[#518231] rounded-xl shadow-sm group-hover:scale-105 transition-transform">
                              <IconComp size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{preset.name}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{preset.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab 4: Physics Quiz */}
                {activeTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Practice Physics Quiz</h4>
                    
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

interface InfoTooltipProps {
  text: string;
}

function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <div className="group relative inline-block text-slate-400 hover:text-slate-600 cursor-pointer">
      <Info size={13} />
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl pointer-events-none z-50 leading-relaxed font-normal">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
      </div>
    </div>
  );
}
