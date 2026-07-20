"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Zap, Car, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowRight, Scale, Globe, Layers, Cpu, BatteryCharging
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "power" | "work" | "time" | "mechanical" | "electrical";

// Unit conversion maps to Base SI (W, J, s, N, m/s, V, A)
const POWER_CONVERSIONS: Record<string, number> = {
  "W": 1,
  "kW": 1000,
  "MW": 1000000,
  "GW": 1000000000,
  "hp": 745.7,
  "PS": 735.5
};

const WORK_CONVERSIONS: Record<string, number> = {
  "J": 1,
  "kJ": 1000,
  "MJ": 1000000,
  "Wh": 3600,
  "kWh": 3600000
};

const TIME_CONVERSIONS: Record<string, number> = {
  "s": 1,
  "ms": 0.001,
  "min": 60,
  "h": 3600
};

const FORCE_CONVERSIONS: Record<string, number> = {
  "N": 1,
  "kN": 1000
};

const VELOCITY_CONVERSIONS: Record<string, number> = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  "mph": 0.44704,
  "ft/s": 0.3048
};

const VOLTAGE_CONVERSIONS: Record<string, number> = {
  "V": 1,
  "kV": 1000
};

const CURRENT_CONVERSIONS: Record<string, number> = {
  "A": 1,
  "mA": 0.001
};

// Real-world Presets
interface PowerPreset {
  name: string;
  pSI: number; // Watts
  mode: CalcMode;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const POWER_PRESETS: PowerPreset[] = [
  { name: "Phone Charger", pSI: 15, mode: "electrical", icon: BatteryCharging, desc: "15 Watts (5V, 3A Fast Charging)" },
  { name: "Laptop Charger", pSI: 65, mode: "electrical", icon: Cpu, desc: "65 Watts (20V, 3.25A Type-C)" },
  { name: "Human Walking", pSI: 100, mode: "power", icon: Zap, desc: "100 Watts (0.13 hp metabolic power)" },
  { name: "Pro Cyclist Sprint", pSI: 500, mode: "mechanical", icon: Zap, desc: "500 Watts (0.67 hp peak mechanical power)" },
  { name: "1 Horsepower Motor", pSI: 745.7, mode: "power", icon: Scale, desc: "745.7 Watts (1.0 hp standard motor)" },
  { name: "Sedan Car Engine", pSI: 100000, mode: "mechanical", icon: Car, desc: "100 kW (~134 hp family sedan engine)" },
  { name: "Industrial Wind Turbine", pSI: 3000000, mode: "power", icon: Globe, desc: "3 Megawatts (3 MW renewable generator)" },
  { name: "Commercial Jet Engine", pSI: 60000000, mode: "mechanical", icon: Plane, desc: "60 Megawatts (~80,000 hp thrust power)" },
  { name: "Starship Rocket Engine", pSI: 1000000000, mode: "power", icon: Rocket, desc: "1 Gigawatt (1 GW massive thrust power)" }
];

// Power Meter Tiers
const POWER_TIERS = [
  { name: "Very Low Power", max: 100, color: "#10b981", label: "< 100 W (Mobile devices, LEDs)" },
  { name: "Low Power", max: 1000, color: "#3b82f6", label: "100 W - 1 kW (Appliances, Cyclists)" },
  { name: "Medium Power", max: 100000, color: "#f59e0b", label: "1 kW - 100 kW (Electric Motors, Cars)" },
  { name: "High Power", max: 10000000, color: "#ef4444", label: "100 kW - 10 MW (Turbines, Trains)" },
  { name: "Extreme Power", max: Infinity, color: "#8b5cf6", label: "> 10 MW (Rockets, Power Plants)" }
];

export function PowerCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("power");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [powerVal, setPowerVal] = useState<number>(1000);
  const [powerUnit, setPowerUnit] = useState<string>("W");

  const [workVal, setWorkVal] = useState<number>(5000);
  const [workUnit, setWorkUnit] = useState<string>("J");

  const [timeVal, setTimeVal] = useState<number>(5.0);
  const [timeUnit, setTimeUnit] = useState<string>("s");

  const [forceVal, setForceVal] = useState<number>(500);
  const [forceUnit, setForceUnit] = useState<string>("N");

  const [velVal, setVelVal] = useState<number>(2.0);
  const [velUnit, setVelUnit] = useState<string>("m/s");

  const [voltVal, setVoltVal] = useState<number>(230);
  const [voltUnit, setVoltUnit] = useState<string>("V");

  const [currVal, setCurrVal] = useState<number>(4.35);
  const [currUnit, setCurrUnit] = useState<string>("A");

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
      if (params.get("p")) setPowerVal(Number(params.get("p")));
      if (params.get("w")) setWorkVal(Number(params.get("w")));
      if (params.get("t")) setTimeVal(Number(params.get("t")));
      if (params.get("f")) setForceVal(Number(params.get("f")));
      if (params.get("v")) setVelVal(Number(params.get("v")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (W, J, s, N, m/s, V, A)
  const siInputs = useMemo(() => {
    const pSI = powerVal * (POWER_CONVERSIONS[powerUnit] || 1);
    const wSI = workVal * (WORK_CONVERSIONS[workUnit] || 1);
    const tSI = timeVal * (TIME_CONVERSIONS[timeUnit] || 1);
    const fSI = forceVal * (FORCE_CONVERSIONS[forceUnit] || 1);
    const vSI = velVal * (VELOCITY_CONVERSIONS[velUnit] || 1);
    const voltSI = voltVal * (VOLTAGE_CONVERSIONS[voltUnit] || 1);
    const currSI = currVal * (CURRENT_CONVERSIONS[currUnit] || 1);
    return { pSI, wSI, tSI, fSI, vSI, voltSI, currSI };
  }, [powerVal, powerUnit, workVal, workUnit, timeVal, timeUnit, forceVal, forceUnit, velVal, velUnit, voltVal, voltUnit, currVal, currUnit]);

  // Perform Power Calculation across 5 Modes
  const results = useMemo(() => {
    let finalPSI = siInputs.pSI;
    let finalWSI = siInputs.wSI;
    let finalTSI = siInputs.tSI;
    let finalFSI = siInputs.fSI;
    let finalVSI = siInputs.vSI;
    let finalVoltSI = siInputs.voltSI;
    let finalCurrSI = siInputs.currSI;

    if (calcMode === "power") {
      finalPSI = siInputs.tSI > 0 ? siInputs.wSI / siInputs.tSI : 0;
    } else if (calcMode === "work") {
      finalWSI = siInputs.pSI * siInputs.tSI;
    } else if (calcMode === "time") {
      finalTSI = siInputs.pSI > 0 ? siInputs.wSI / siInputs.pSI : 0;
    } else if (calcMode === "mechanical") {
      finalPSI = siInputs.fSI * siInputs.vSI;
    } else if (calcMode === "electrical") {
      finalPSI = siInputs.voltSI * siInputs.currSI;
    }

    // Convert results back to display units
    const pDisplay = finalPSI / (POWER_CONVERSIONS[powerUnit] || 1);
    const wDisplay = finalWSI / (WORK_CONVERSIONS[workUnit] || 1);
    const tDisplay = finalTSI / (TIME_CONVERSIONS[timeUnit] || 1);
    const fDisplay = finalFSI / (FORCE_CONVERSIONS[forceUnit] || 1);
    const vDisplay = finalVSI / (VELOCITY_CONVERSIONS[velUnit] || 1);
    const voltDisplay = finalVoltSI / (VOLTAGE_CONVERSIONS[voltUnit] || 1);
    const currDisplay = finalCurrSI / (CURRENT_CONVERSIONS[currUnit] || 1);

    // Horsepower Equivalent
    const hpMech = finalPSI / 745.7;
    const hpMetric = finalPSI / 735.5;

    // Power Tier
    let tier = POWER_TIERS[0];
    if (finalPSI <= 100) tier = POWER_TIERS[0];
    else if (finalPSI <= 1000) tier = POWER_TIERS[1];
    else if (finalPSI <= 100000) tier = POWER_TIERS[2];
    else if (finalPSI <= 10000000) tier = POWER_TIERS[3];
    else tier = POWER_TIERS[4];

    return {
      pSI: finalPSI,
      wSI: finalWSI,
      tSI: finalTSI,
      fSI: finalFSI,
      vSI: finalVSI,
      voltSI: finalVoltSI,
      currSI: finalCurrSI,
      pDisplay,
      wDisplay,
      tDisplay,
      fDisplay,
      vDisplay,
      voltDisplay,
      currDisplay,
      hpMech,
      hpMetric,
      tier
    };
  }, [calcMode, siInputs, powerUnit, workUnit, timeUnit, forceUnit, velUnit, voltUnit, currUnit]);

  // Simulation Duration
  const durationSim = 5;
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

  // Recharts Motion Graph Data (Power vs Time / Velocity)
  const graphData = useMemo(() => {
    const steps = 15;
    const data = [];
    for (let i = 1; i <= steps; i++) {
      const t = i * 2;
      const p = results.wSI / t;
      data.push({
        Time: t,
        Power: Number((p / (POWER_CONVERSIONS[powerUnit] || 1)).toFixed(1))
      });
    }
    return data;
  }, [results, powerUnit]);

  // Preset Applicator
  const applyPreset = (preset: PowerPreset) => {
    setPowerVal(preset.pSI);
    setPowerUnit("W");
    setCalcMode(preset.mode);
    triggerNotification("success", `Loaded ${preset.name} (${preset.pSI} W)!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&p=${powerVal}&w=${workVal}&t=${timeVal}&f=${forceVal}&v=${velVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario parameters link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Power Calculation (P = W/t = F·v = V·I)
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Power: ${results.pDisplay.toFixed(3)} ${powerUnit} (${results.hpMech.toFixed(2)} hp)
Work Transferred: ${results.wDisplay.toFixed(2)} ${workUnit}
Elapsed Time: ${results.tDisplay.toFixed(2)} ${timeUnit}
Mechanical Force: ${results.fDisplay.toFixed(2)} ${forceUnit}
Velocity: ${results.vDisplay.toFixed(2)} ${velUnit}
Electrical Voltage: ${results.voltDisplay.toFixed(1)} ${voltUnit}
Electrical Current: ${results.currDisplay.toFixed(2)} ${currUnit}
-----------------------------------------
SI Base Values:
Power: ${results.pSI.toFixed(2)} Watts
Work: ${results.wSI.toFixed(2)} Joules
Time: ${results.tSI.toFixed(2)} s`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "What is the power output of a crane lifting a load with 5,000 Joules of work in 10 seconds?",
        correctAnswer: 500,
        units: "W",
        type: "power" as CalcMode
      },
      {
        q: "How many Watts of power are delivered by a 100 N force pushing a cart at a speed of 3 m/s?",
        correctAnswer: 300,
        units: "W",
        type: "mechanical" as CalcMode
      },
      {
        q: "How many Watts are generated by an electric motor drawing 10 Amps at 120 Volts?",
        correctAnswer: 1200,
        units: "W",
        type: "electrical" as CalcMode
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
          <Link href="/calculators/work-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Work
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Power
          </span>
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
                Power Cockpit (P = W/t = Fv = VI)
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
                { key: "power", label: "Power (P)" },
                { key: "work", label: "Work (W)" },
                { key: "time", label: "Time (t)" },
                { key: "mechanical", label: "Mech (F·v)" },
                { key: "electrical", label: "Elec (V·I)" }
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
              
              {/* Power Input (P) */}
              {calcMode !== "power" && calcMode !== "mechanical" && calcMode !== "electrical" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Power (P)
                      <InfoTooltip text="Power output (P = W/t)." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={powerVal}
                        onChange={(e) => setPowerVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={powerUnit}
                        onChange={(e) => setPowerUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(POWER_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    step="50"
                    value={powerVal}
                    onChange={(e) => setPowerVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Power (P - Calculated)" val={`${results.pDisplay.toFixed(3)} ${powerUnit} (${results.hpMech.toFixed(2)} hp)`} icon={Zap} />
              )}

              {/* Work Input (W) */}
              {calcMode === "power" || calcMode === "time" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Work Transferred (W)
                      <InfoTooltip text="Energy or work transferred." />
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
                    min="100"
                    max="50000"
                    step="500"
                    value={workVal}
                    onChange={(e) => setWorkVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : null}

              {/* Time Input (t) */}
              {calcMode === "power" || calcMode === "work" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Time Elapsed (t)
                      <InfoTooltip text="Duration of work transfer." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.1"
                        value={timeVal}
                        onChange={(e) => setTimeVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(TIME_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="60"
                    step="0.5"
                    value={timeVal}
                    onChange={(e) => setTimeVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : null}

              {/* Mechanical Inputs (F, v) */}
              {calcMode === "mechanical" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Force (F)</span>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <input
                          type="number"
                          value={forceVal}
                          onChange={(e) => setForceVal(Number(e.target.value))}
                          className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                        />
                        <select value={forceUnit} onChange={(e) => setForceUnit(e.target.value)} className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none">
                          {Object.keys(FORCE_CONVERSIONS).map(u => (
                            <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Velocity (v)</span>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <input
                          type="number"
                          step="0.1"
                          value={velVal}
                          onChange={(e) => setVelVal(Number(e.target.value))}
                          className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                        />
                        <select value={velUnit} onChange={(e) => setVelUnit(e.target.value)} className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none">
                          {Object.keys(VELOCITY_CONVERSIONS).map(u => (
                            <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Electrical Inputs (V, I) */}
              {calcMode === "electrical" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Voltage (V)</span>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <input
                          type="number"
                          value={voltVal}
                          onChange={(e) => setVoltVal(Number(e.target.value))}
                          className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                        />
                        <select value={voltUnit} onChange={(e) => setVoltUnit(e.target.value)} className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none">
                          {Object.keys(VOLTAGE_CONVERSIONS).map(u => (
                            <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Current (I)</span>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <input
                          type="number"
                          step="0.1"
                          value={currVal}
                          onChange={(e) => setCurrVal(Number(e.target.value))}
                          className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                        />
                        <select value={currUnit} onChange={(e) => setCurrUnit(e.target.value)} className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none">
                          {Object.keys(CURRENT_CONVERSIONS).map(u => (
                            <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Horsepower & Unit Conversion Table panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Horsepower & Power Conversion Table
            </h3>
            <div className="space-y-2">
              {[
                { label: "Watts (W)", val: results.pSI.toFixed(2) },
                { label: "Kilowatts (kW)", val: (results.pSI / 1000).toFixed(3) },
                { label: "Megawatts (MW)", val: (results.pSI / 1000000).toFixed(6) },
                { label: "Mechanical Horsepower (hp)", val: results.hpMech.toFixed(2) },
                { label: "Metric Horsepower (PS)", val: results.hpMetric.toFixed(2) },
                { label: "BTU per hour (BTU/h)", val: (results.pSI * 3.41214).toFixed(1) }
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 font-semibold">{item.label}</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Real-World Explorer, Flow Simulator & Presets */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit & 🎯 Competitor Killer "Real-World Power Explorer" */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🚀 Real-World Power Explorer & Flow Simulator
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{results.tier.name}</span>
              </div>
            </div>

            {/* Radial Arc Power Gauge */}
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
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(1, results.pSI)) / 9) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.pSI)) / 9))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.pSI)) / 9))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.pDisplay.toFixed(2)} {powerUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  ({results.hpMech.toFixed(2)} Horsepower)
                </div>
              </div>
            </div>

            {/* 🎯 REAL-WORLD POWER EXPLORER COMPARISON SCALE */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
                🌐 Real-World Power Scale Comparison:
              </span>

              {[
                { name: "Phone Charger", val: 15, text: "15 W" },
                { name: "Human Walking", val: 100, text: "100 W" },
                { name: "1 Horsepower", val: 745.7, text: "746 W" },
                { name: "Sedan Car Engine", val: 100000, text: "100 kW" },
                { name: "Wind Turbine", val: 3000000, text: "3 MW" }
              ].map((comp, idx) => {
                const ratio = Math.min(100, Math.max(5, (results.pSI / comp.val) * 50));
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                      <span>{comp.name} ({comp.text})</span>
                      <span className="text-emerald-400 font-bold">
                        {results.pSI >= comp.val 
                          ? `${(results.pSI / comp.val).toFixed(1)}x larger` 
                          : `${((results.pSI / comp.val) * 100).toFixed(1)}% of value`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#518231] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, ratio)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
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
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Power (P)</span>
                <div className="text-xs font-black text-[#518231] mt-0.5">{results.pDisplay.toFixed(1)} {powerUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Horsepower</span>
                <div className="text-xs font-black text-amber-400 mt-0.5">{results.hpMech.toFixed(2)} hp</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Work (W)</span>
                <div className="text-xs font-black text-blue-400 mt-0.5">{results.wDisplay.toFixed(1)} {workUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Time (t)</span>
                <div className="text-xs font-black text-emerald-400 mt-0.5">{results.tDisplay.toFixed(1)} {timeUnit}</div>
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
                    {tab === "visuals" ? "Presets" : tab === "graphs" ? "📈 Power vs Time" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Presets */}
                {activeTab === "visuals" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🎯 Real-World Power Presets</h4>
                    <p className="text-xs text-slate-500">Click any preset to inspect its power rating and parameters:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {POWER_PRESETS.map((preset, idx) => {
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

                {/* Tab 2: Power vs Time Chart */}
                {activeTab === "graphs" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      📈 Power vs Time (P = W / t)
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={graphData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Time" label={{ value: "Time (s)", position: "insideBottom", offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Power" stroke="#518231" strokeWidth={2.5} dot={false} />
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
                      <div>1. Power Formula: P = W / t  (or P = F·v, P = V·I)</div>
                      <div>2. Knowns: Work W = {results.wSI.toFixed(2)} J, Time t = {results.tSI.toFixed(2)} s</div>
                      <div>3. Calculation: P = {results.wSI.toFixed(2)} / {results.tSI.toFixed(2)}</div>
                      <div>4. Result: P = {results.pSI.toFixed(2)} Watts</div>
                      <div>5. Horsepower Conversion: {results.pSI.toFixed(2)} / 745.7 = {results.hpMech.toFixed(2)} hp</div>
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
