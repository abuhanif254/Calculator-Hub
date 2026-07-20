"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Zap, Car, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowRight, Scale, Globe, Layers, Building
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "work" | "force" | "distance" | "angle";

// Conversion factors to SI base units (J, N, m, Deg)
const WORK_CONVERSIONS: Record<string, number> = {
  "J": 1,
  "kJ": 1000,
  "MJ": 1000000,
  "Wh": 3600,
  "kWh": 3600000
};

const FORCE_CONVERSIONS: Record<string, number> = {
  "N": 1,
  "kN": 1000,
  "lbf": 4.44822,
  "kgf": 9.80665
};

const DISTANCE_CONVERSIONS: Record<string, number> = {
  "m": 1,
  "cm": 0.01,
  "mm": 0.001,
  "km": 1000,
  "ft": 0.3048,
  "in": 0.0254
};

const ANGLE_CONVERSIONS: Record<string, number> = {
  "deg": 1,
  "rad": 180 / Math.PI
};

// Real-world Presets
interface WorkPreset {
  name: string;
  force: number; // N
  distance: number; // m
  angle: number; // deg
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const WORK_PRESETS: WorkPreset[] = [
  { name: "Push Box (Direct)", force: 100, distance: 5.0, angle: 0, icon: Zap, desc: "500 Joules (Direct push, 0°)" },
  { name: "Pull Lawn Cart", force: 150, distance: 20.0, angle: 30, icon: Zap, desc: "2,598 Joules (30° handle pull)" },
  { name: "Lift Weight Upward", force: 500, distance: 1.5, angle: 0, icon: Zap, desc: "750 Joules (Vertical lift, 0°)" },
  { name: "Car Braking Friction", force: 4000, distance: 30.0, angle: 180, icon: Car, desc: "-120,000 Joules (-120 kJ negative work)" },
  { name: "Tower Crane Lift", force: 20000, distance: 40.0, angle: 0, icon: Building, desc: "800,000 Joules (800 kJ)" },
  { name: "Perpendicular Carry", force: 200, distance: 10.0, angle: 90, icon: Zap, desc: "0 Joules (Perpendicular 90° = Zero Work)" },
  { name: "Hydroelectric Turbine", force: 500000, distance: 50.0, angle: 0, icon: Globe, desc: "25 Megajoules (25 MJ)" },
  { name: "Rocket Thrust Launch", force: 30000000, distance: 1000.0, angle: 0, icon: Rocket, desc: "30 Gigajoules (30 GJ)" }
];

// Work Meter Tiers
const WORK_TIERS = [
  { name: "Negative Work", max: 0, color: "#ef4444", label: "W < 0 J (Friction / Opposing Force)" },
  { name: "Zero Work", max: 1, color: "#94a3b8", label: "W = 0 J (Perpendicular 90° Force)" },
  { name: "Low Work", max: 500, color: "#10b981", label: "1 J - 500 J (Light push / step)" },
  { name: "Medium Work", max: 50000, color: "#3b82f6", label: "500 J - 50 kJ (Vehicle / Cart)" },
  { name: "High Work", max: Infinity, color: "#f59e0b", label: "> 50 kJ (Cranes / Heavy Machinery)" }
];

export function WorkCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("work");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [forceVal, setForceVal] = useState<number>(100);
  const [forceUnit, setForceUnit] = useState<string>("N");

  const [distVal, setDistVal] = useState<number>(10.0);
  const [distUnit, setDistUnit] = useState<string>("m");

  const [angleVal, setAngleVal] = useState<number>(0);
  const [angleUnit, setAngleUnit] = useState<string>("deg");

  const [workVal, setWorkVal] = useState<number>(1000);
  const [workUnit, setWorkUnit] = useState<string>("J");

  // Advanced Mode Tab Selection
  const [activeTab, setActiveTab] = useState<"visuals" | "graphs" | "explanation" | "quiz">("visuals");

  // Animation states
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

  // Alert Banner
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
    generateQuiz();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode")) setCalcMode(params.get("mode") as CalcMode);
      if (params.get("f")) setForceVal(Number(params.get("f")));
      if (params.get("d")) setDistVal(Number(params.get("d")));
      if (params.get("a")) setAngleVal(Number(params.get("a")));
      if (params.get("w")) setWorkVal(Number(params.get("w")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (J, N, m, Rad)
  const siInputs = useMemo(() => {
    const fSI = forceVal * (FORCE_CONVERSIONS[forceUnit] || 1);
    const dSI = distVal * (DISTANCE_CONVERSIONS[distUnit] || 1);
    const angleRad = (angleVal * (ANGLE_CONVERSIONS[angleUnit] || 1) * Math.PI) / 180;
    const wSI = workVal * (WORK_CONVERSIONS[workUnit] || 1);
    return { fSI, dSI, angleRad, wSI };
  }, [forceVal, forceUnit, distVal, distUnit, angleVal, angleUnit, workVal, workUnit]);

  // Perform Mechanical Work Calculation: W = F * d * cos(theta)
  const results = useMemo(() => {
    let finalWSI = siInputs.wSI;
    let finalFSI = siInputs.fSI;
    let finalDSI = siInputs.dSI;
    let finalAngleRad = siInputs.angleRad;

    const cosVal = Math.cos(siInputs.angleRad);

    if (calcMode === "work") {
      finalWSI = siInputs.fSI * siInputs.dSI * cosVal;
    } else if (calcMode === "force") {
      const denom = siInputs.dSI * cosVal;
      finalFSI = Math.abs(denom) > 0.000001 ? siInputs.wSI / denom : 0;
    } else if (calcMode === "distance") {
      const denom = siInputs.fSI * cosVal;
      finalDSI = Math.abs(denom) > 0.000001 ? siInputs.wSI / denom : 0;
    } else if (calcMode === "angle") {
      const denom = siInputs.fSI * siInputs.dSI;
      if (Math.abs(denom) > 0.000001) {
        const ratio = Math.max(-1, Math.min(1, siInputs.wSI / denom));
        finalAngleRad = Math.acos(ratio);
      } else {
        finalAngleRad = 0;
      }
    }

    const cosFactor = Math.cos(finalAngleRad);
    const finalAngleDeg = (finalAngleRad * 180) / Math.PI;

    // Convert results back to display units
    const wDisplay = finalWSI / (WORK_CONVERSIONS[workUnit] || 1);
    const fDisplay = finalFSI / (FORCE_CONVERSIONS[forceUnit] || 1);
    const dDisplay = finalDSI / (DISTANCE_CONVERSIONS[distUnit] || 1);
    const aDisplay = finalAngleDeg / (ANGLE_CONVERSIONS[angleUnit] || 1);

    // Determine Work Tier & Category
    let workCategory = "Positive Work";
    if (Math.abs(cosFactor) < 0.00001) workCategory = "Zero Work (Perpendicular)";
    else if (cosFactor < 0) workCategory = "Negative Work (Opposing)";

    let tier = WORK_TIERS[2];
    if (finalWSI < 0) tier = WORK_TIERS[0];
    else if (Math.abs(finalWSI) < 1) tier = WORK_TIERS[1];
    else if (finalWSI <= 500) tier = WORK_TIERS[2];
    else if (finalWSI <= 50000) tier = WORK_TIERS[3];
    else tier = WORK_TIERS[4];

    return {
      wSI: finalWSI,
      fSI: finalFSI,
      dSI: finalDSI,
      angleRad: finalAngleRad,
      angleDeg: finalAngleDeg,
      cosFactor,
      workCategory,
      wDisplay,
      fDisplay,
      dDisplay,
      aDisplay,
      tier
    };
  }, [calcMode, siInputs, workUnit, forceUnit, distUnit, angleUnit]);

  // Simulation Duration
  const durationSim = 4;
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

  const currentPosRatio = useMemo(() => {
    return Math.min(1, currentTime / durationSim);
  }, [currentTime]);

  // Recharts Motion Graph Data (Work vs Angle)
  const graphData = useMemo(() => {
    const steps = 18;
    const data = [];
    for (let i = 0; i <= steps; i++) {
      const deg = i * 10;
      const rad = (deg * Math.PI) / 180;
      const w = results.fSI * results.dSI * Math.cos(rad);
      data.push({
        AngleDeg: deg,
        Work: Number((w / (WORK_CONVERSIONS[workUnit] || 1)).toFixed(1)),
        CosTheta: Number(Math.cos(rad).toFixed(3))
      });
    }
    return data;
  }, [results, workUnit]);

  // Preset Applicator
  const applyPreset = (preset: WorkPreset) => {
    setForceVal(preset.force);
    setForceUnit("N");
    setDistVal(preset.distance);
    setDistUnit("m");
    setAngleVal(preset.angle);
    setAngleUnit("deg");
    setCalcMode("work");
    triggerNotification("success", `Loaded ${preset.name} parameters!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&f=${forceVal}&d=${distVal}&a=${angleVal}&w=${workVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario parameters link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Mechanical Work Calculation (W = F · d · cosθ)
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Work: ${results.wDisplay.toFixed(4)} ${workUnit}
Force Applied: ${results.fDisplay.toFixed(3)} ${forceUnit}
Displacement Distance: ${results.dDisplay.toFixed(3)} ${distUnit}
Angle: ${results.aDisplay.toFixed(1)}° (cosθ = ${results.cosFactor.toFixed(3)})
Work Type: ${results.workCategory}
-----------------------------------------
SI Base Values:
Work: ${results.wSI.toFixed(2)} Joules
Force: ${results.fSI.toFixed(2)} N
Distance: ${results.dSI.toFixed(2)} m
Angle: ${results.angleDeg.toFixed(1)}°`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "What is the work done when a force of 50 N pushes a box parallel (0°) across a distance of 10 meters?",
        correctAnswer: 500,
        units: "J",
        type: "work" as CalcMode
      },
      {
        q: "How much work is done by carrying a 100 N weight horizontally at a perpendicular 90° angle for 20 meters?",
        correctAnswer: 0,
        units: "J",
        type: "work" as CalcMode
      },
      {
        q: "A friction force does -200 Joules of work over a distance of 5 meters. What is the friction force in Newtons?",
        correctAnswer: -40,
        units: "N",
        type: "force" as CalcMode
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

      {/* 🔄 Mechanical Energy Hub Top Pill Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-1.5 shrink-0">
          <Layers size={14} className="text-[#518231]" />
          Mechanical Energy Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <Link href="/calculators/kinetic-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Kinetic Energy
          </Link>
          <Link href="/calculators/potential-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Potential Energy
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Work
          </span>
          <Link href="/calculators/power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power
          </Link>
          <Link href="/calculators/momentum-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Momentum
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
                Work Cockpit (W = F·d·cosθ)
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
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-2 gap-1 mb-8">
              {[
                { key: "work", label: "Work (W)" },
                { key: "force", label: "Force (F)" },
                { key: "distance", label: "Distance (d)" },
                { key: "angle", label: "Angle (θ)" }
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

            {/* Dynamic Input Fields */}
            <div className="space-y-6">
              
              {/* Force Input (F) */}
              {calcMode !== "force" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Applied Force (F)
                      <InfoTooltip text="Magnitude of force vector applied to the object." />
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
                    max="2000"
                    step="5"
                    value={forceVal}
                    onChange={(e) => setForceVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Force (F - Calculated)" val={`${results.fDisplay.toFixed(3)} ${forceUnit}`} icon={Scale} />
              )}

              {/* Distance Input (d) */}
              {calcMode !== "distance" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Displacement (d)
                      <InfoTooltip text="Distance covered by the object." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.1"
                        value={distVal}
                        onChange={(e) => setDistVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={distUnit}
                        onChange={(e) => setDistUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(DISTANCE_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="100"
                    step="0.5"
                    value={distVal}
                    onChange={(e) => setDistVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Displacement (d - Calculated)" val={`${results.dDisplay.toFixed(3)} ${distUnit}`} icon={Building} />
              )}

              {/* Angle Input (θ) */}
              {calcMode !== "angle" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Force Angle (θ)
                      <InfoTooltip text="Angle between force vector and motion direction." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="1"
                        value={angleVal}
                        onChange={(e) => setAngleVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={angleUnit}
                        onChange={(e) => setAngleUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(ANGLE_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    step="1"
                    value={angleVal}
                    onChange={(e) => setAngleVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Angle (θ - Calculated)" val={`${results.aDisplay.toFixed(1)} ${angleUnit}`} icon={Globe} />
              )}

              {/* Work Input (W) */}
              {calcMode !== "work" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Mechanical Work (W)
                      <InfoTooltip text="Work done (W = F · d · cosθ)." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={workVal}
                        onChange={(e) => setWorkVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={workUnit}
                        onChange={(e) => setWorkUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(WORK_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="-5000"
                    max="10000"
                    step="100"
                    value={workVal}
                    onChange={(e) => setWorkVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Mechanical Work (W - Calculated)" val={`${results.wDisplay.toFixed(3)} ${workUnit}`} icon={Zap} />
              )}

            </div>
          </div>

          {/* Smart Conversion Table panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Smart Work Conversion Table
            </h3>
            <div className="space-y-2">
              {Object.keys(WORK_CONVERSIONS).map(uKey => {
                const convVal = results.wSI / WORK_CONVERSIONS[uKey];
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

        {/* Right Column: Force Direction Simulator, Meter & Presets */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit & 🎯 Competitor Killer "Force Direction Simulator" */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🚀 Force Direction Simulator & Work Meter
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{results.workCategory}</span>
              </div>
            </div>

            {/* Radial Arc Work Meter */}
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
                    strokeDashoffset={126 - Math.min(126, Math.max(5, ((results.cosFactor + 1) / 2) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, (results.cosFactor + 1) / 2))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, (results.cosFactor + 1) / 2))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.wDisplay.toFixed(2)} {workUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  cos({results.angleDeg.toFixed(0)}°) = {results.cosFactor.toFixed(3)}
                </div>
              </div>
            </div>

            {/* 🎯 FORCE DIRECTION SIMULATOR CANVAS */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-40 flex items-center justify-between overflow-hidden">
              {/* Motion Track */}
              <div className="w-full h-1 bg-slate-800 rounded-full relative mt-12">
                {/* Motion Arrow (Right) */}
                <div className="absolute right-0 -top-2 text-slate-500 text-[10px] flex items-center gap-1 font-bold">
                  <span>Motion Direction (d)</span>
                  <ArrowRight size={14} />
                </div>

                {/* Moving Box Object */}
                <div 
                  className="absolute -top-5 -translate-x-1/2 w-10 h-10 bg-slate-800 border-2 border-slate-600 rounded-xl flex items-center justify-center shadow-lg transition-all ease-linear"
                  style={{ left: `${15 + currentPosRatio * 70}%` }}
                >
                  {/* Applied Force Vector Arrow */}
                  <div 
                    className="absolute w-14 h-1 bg-[#518231] origin-left rounded-full transition-all duration-300 flex items-center justify-end"
                    style={{ 
                      transform: `rotate(${-results.angleDeg}deg)`,
                      left: '50%',
                      top: '50%'
                    }}
                  >
                    <div className="w-2 h-2 bg-[#518231] rotate-45 border-t-2 border-r-2 border-white -mr-1"></div>
                  </div>
                  <span className="text-[10px] font-black text-white z-10">F</span>
                </div>
              </div>

              {/* Angle Direction Indicator Text */}
              <div className="absolute top-3 left-4 text-xs font-bold text-slate-300 flex items-center gap-2">
                <span>Angle: {results.angleDeg.toFixed(0)}°</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-800 text-emerald-400">
                  {results.angleDeg === 0 ? "➡️ 0° Max Positive Work" : results.angleDeg === 45 ? "↗️ 45° Partial Work" : results.angleDeg === 90 ? "⬆️ 90° Zero Work" : results.angleDeg === 135 ? "↖️ 135° Negative Work" : results.angleDeg === 180 ? "⬅️ 180° Max Negative Work" : `${results.angleDeg.toFixed(0)}° Vector`}
                </span>
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
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Mechanical Work</span>
                <div className="text-xs font-black text-[#518231] mt-0.5">{results.wDisplay.toFixed(1)} {workUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Force (F)</span>
                <div className="text-xs font-black text-amber-400 mt-0.5">{results.fDisplay.toFixed(1)} {forceUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Distance (d)</span>
                <div className="text-xs font-black text-blue-400 mt-0.5">{results.dDisplay.toFixed(1)} {distUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">cos(θ) Factor</span>
                <div className="text-xs font-black text-emerald-400 mt-0.5">{results.cosFactor.toFixed(3)}</div>
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
                {(["visuals", "graphs", "explanation", "quiz"] as const).map(tab => (
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
                    {tab === "visuals" ? "Presets" : tab === "graphs" ? "📈 Work vs Angle" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Presets */}
                {activeTab === "visuals" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🎯 Real-World Work Presets</h4>
                    <p className="text-xs text-slate-500">Click any preset to inspect its force, distance, and angle:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {WORK_PRESETS.map((preset, idx) => {
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

                {/* Tab 2: Work vs Angle Chart */}
                {activeTab === "graphs" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      📈 Work vs Force Angle (W = Fd cosθ)
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={graphData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="AngleDeg" label={{ value: "Angle (°)", position: "insideBottom", offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Work" stroke="#518231" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 3: Step-by-Step Solution */}
                {activeTab === "explanation" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-step Solution</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Mechanical Work Formula: W = F · d · cos(θ)</div>
                      <div>2. Knowns: F = {results.fSI.toFixed(2)} N, d = {results.dSI.toFixed(2)} m, θ = {results.angleDeg.toFixed(1)}°</div>
                      <div>3. cos({results.angleDeg.toFixed(1)}°) = {results.cosFactor.toFixed(4)}</div>
                      <div>4. W = {results.fSI.toFixed(2)} · {results.dSI.toFixed(2)} · {results.cosFactor.toFixed(4)}</div>
                      <div>5. Result: W = {results.wSI.toFixed(2)} Joules ({results.wDisplay.toFixed(3)} {workUnit})</div>
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
