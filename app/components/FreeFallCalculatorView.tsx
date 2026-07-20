"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Zap, Car, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowDown, Globe, Layers, Building
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "time" | "velocity" | "height" | "gravity" | "advanced";

// Conversion factors to SI base units (m, m/s², s, m/s)
const HEIGHT_CONVERSIONS: Record<string, number> = {
  "m": 1,
  "cm": 0.01,
  "mm": 0.001,
  "km": 1000,
  "ft": 0.3048,
  "in": 0.0254,
  "yd": 0.9144
};

const GRAVITY_CONVERSIONS: Record<string, number> = {
  "m/s²": 1,
  "ft/s²": 0.3048
};

const TIME_CONVERSIONS: Record<string, number> = {
  "s": 1,
  "ms": 0.001,
  "min": 60
};

const VELOCITY_CONVERSIONS: Record<string, number> = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  "mph": 0.44704,
  "ft/s": 0.3048
};

// Planet Presets
interface PlanetPreset {
  name: string;
  g: number; // m/s²
  desc: string;
}

const PLANET_PRESETS: PlanetPreset[] = [
  { name: "Earth", g: 9.81, desc: "Standard Earth Gravity (9.81 m/s²)" },
  { name: "Moon", g: 1.62, desc: "Lunar Gravity (1.62 m/s²)" },
  { name: "Mars", g: 3.71, desc: "Martian Gravity (3.71 m/s²)" },
  { name: "Mercury", g: 3.70, desc: "Mercurian Gravity (3.70 m/s²)" },
  { name: "Venus", g: 8.87, desc: "Cytherean Gravity (8.87 m/s²)" },
  { name: "Jupiter", g: 24.79, desc: "Jovian Gravity (24.79 m/s²)" },
  { name: "Saturn", g: 10.44, desc: "Saturnian Gravity (10.44 m/s²)" },
  { name: "Uranus", g: 8.69, desc: "Uranian Gravity (8.69 m/s²)" },
  { name: "Neptune", g: 11.15, desc: "Neptunian Gravity (11.15 m/s²)" },
  { name: "Pluto", g: 0.62, desc: "Plutonian Gravity (0.62 m/s²)" }
];

// Real-world Drop Presets
interface DropPreset {
  name: string;
  height: number; // m
  g: number; // m/s²
  vInit: number; // m/s
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const DROP_PRESETS: DropPreset[] = [
  { name: "Drop a Ball", height: 1.5, g: 9.81, vInit: 0, icon: Zap, desc: "0.55s fall from hand (1.5m)" },
  { name: "Book from Desk", height: 0.75, g: 9.81, vInit: 0, icon: Zap, desc: "0.39s fall from desk (0.75m)" },
  { name: "Tree Branch Drop", height: 10.0, g: 9.81, vInit: 0, icon: Zap, desc: "1.43s fall (14 m/s impact)" },
  { name: "Water Tower Drop", height: 25.0, g: 9.81, vInit: 0, icon: Building, desc: "2.26s fall (22.1 m/s impact)" },
  { name: "10-Story Building", height: 30.0, g: 9.81, vInit: 0, icon: Building, desc: "2.47s fall (24.3 m/s impact)" },
  { name: "Drone Camera Drop", height: 120.0, g: 9.81, vInit: 0, icon: Plane, desc: "4.95s fall (48.5 m/s impact)" },
  { name: "Mountain Cliff", height: 300.0, g: 9.81, vInit: 0, icon: Globe, desc: "7.82s fall (76.7 m/s impact)" },
  { name: "Helicopter Drop", height: 500.0, g: 9.81, vInit: 0, icon: Plane, desc: "10.10s fall (99.0 m/s impact)" },
  { name: "Skydiver High Altitude", height: 3000.0, g: 9.81, vInit: 0, icon: Rocket, desc: "24.73s vacuum drop time" }
];

// Speed Tiers for Impact Gauge
const SPEED_TIERS = [
  { name: "Low Speed Impact", max: 10, color: "#10b981", label: "< 10 m/s (Light drop / safe step)" },
  { name: "Moderate Impact", max: 30, color: "#3b82f6", label: "10 - 30 m/s (Low building / roof drop)" },
  { name: "High Speed Impact", max: 100, color: "#f59e0b", label: "30 - 100 m/s (Cliff drop / tower)" },
  { name: "Extreme Velocity", max: Infinity, color: "#ef4444", label: "> 100 m/s (High altitude / orbital entry)" }
];

export function FreeFallCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("time");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [heightVal, setHeightVal] = useState<number>(30.0);
  const [heightUnit, setHeightUnit] = useState<string>("m");

  const [gravityVal, setGravityVal] = useState<number>(9.81);
  const [gravityUnit, setGravityUnit] = useState<string>("m/s²");

  const [timeVal, setTimeVal] = useState<number>(2.47);
  const [timeUnit, setTimeUnit] = useState<string>("s");

  const [vFinalVal, setVFinalVal] = useState<number>(24.26);
  const [vFinalUnit, setVFinalUnit] = useState<string>("m/s");

  const [vInitVal, setVInitVal] = useState<number>(0);
  const [vInitUnit, setVInitUnit] = useState<string>("m/s");

  // Advanced Mode Tab Selection
  const [activeTab, setActiveTab] = useState<"visuals" | "graphs" | "planets" | "explanation" | "quiz">("visuals");

  // Selected Planet
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPreset>(PLANET_PRESETS[0]);

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
      if (params.get("h")) setHeightVal(Number(params.get("h")));
      if (params.get("g")) setGravityVal(Number(params.get("g")));
      if (params.get("t")) setTimeVal(Number(params.get("t")));
      if (params.get("vi")) setVInitVal(Number(params.get("vi")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (m, m/s², s, m/s)
  const siInputs = useMemo(() => {
    const hSI = heightVal * (HEIGHT_CONVERSIONS[heightUnit] || 1);
    const gSI = gravityVal * (GRAVITY_CONVERSIONS[gravityUnit] || 1);
    const tSI = timeVal * (TIME_CONVERSIONS[timeUnit] || 1);
    const vfSI = vFinalVal * (VELOCITY_CONVERSIONS[vFinalUnit] || 1);
    const viSI = vInitVal * (VELOCITY_CONVERSIONS[vInitUnit] || 1);
    return { hSI, gSI, tSI, vfSI, viSI };
  }, [heightVal, heightUnit, gravityVal, gravityUnit, timeVal, timeUnit, vFinalVal, vFinalUnit, vInitVal, vInitUnit]);

  // Perform Kinematic Free-Fall Calculations
  // h = vi*t + 0.5*g*t²
  // vf² = vi² + 2*g*h
  const results = useMemo(() => {
    let finalHSI = siInputs.hSI;
    let finalGSI = siInputs.gSI;
    let finalTSI = siInputs.tSI;
    let finalVfSI = siInputs.vfSI;
    const finalViSI = siInputs.viSI;

    if (calcMode === "time") {
      // t = (-vi + sqrt(vi² + 2*g*h)) / g
      const discrim = Math.pow(finalViSI, 2) + 2 * siInputs.gSI * siInputs.hSI;
      finalTSI = siInputs.gSI > 0 ? (-finalViSI + Math.sqrt(Math.max(0, discrim))) / siInputs.gSI : 0;
      finalVfSI = finalViSI + siInputs.gSI * finalTSI;
    } else if (calcMode === "velocity") {
      // vf = sqrt(vi² + 2*g*h)
      const discrim = Math.pow(finalViSI, 2) + 2 * siInputs.gSI * siInputs.hSI;
      finalVfSI = Math.sqrt(Math.max(0, discrim));
      finalTSI = siInputs.gSI > 0 ? (finalVfSI - finalViSI) / siInputs.gSI : 0;
    } else if (calcMode === "height") {
      // h = vi*t + 0.5*g*t²
      finalHSI = finalViSI * siInputs.tSI + 0.5 * siInputs.gSI * Math.pow(siInputs.tSI, 2);
      finalVfSI = finalViSI + siInputs.gSI * siInputs.tSI;
    } else if (calcMode === "gravity") {
      // g = 2*(h - vi*t) / t²
      const denom = Math.pow(siInputs.tSI, 2);
      finalGSI = denom > 0 ? (2 * (siInputs.hSI - finalViSI * siInputs.tSI)) / denom : 0;
      finalVfSI = finalViSI + finalGSI * siInputs.tSI;
    } else if (calcMode === "advanced") {
      // h = vi*t + 0.5*g*t²
      finalTSI = siInputs.tSI > 0 ? siInputs.tSI : (siInputs.gSI > 0 ? (-finalViSI + Math.sqrt(Math.max(0, Math.pow(finalViSI, 2) + 2 * siInputs.gSI * siInputs.hSI))) / siInputs.gSI : 0);
      finalHSI = finalViSI * finalTSI + 0.5 * siInputs.gSI * Math.pow(finalTSI, 2);
      finalVfSI = finalViSI + siInputs.gSI * finalTSI;
    }

    // Convert results back to display units
    const hDisplay = finalHSI / (HEIGHT_CONVERSIONS[heightUnit] || 1);
    const gDisplay = finalGSI / (GRAVITY_CONVERSIONS[gravityUnit] || 1);
    const tDisplay = finalTSI / (TIME_CONVERSIONS[timeUnit] || 1);
    const vfDisplay = finalVfSI / (VELOCITY_CONVERSIONS[vFinalUnit] || 1);
    const viDisplay = finalViSI / (VELOCITY_CONVERSIONS[vInitUnit] || 1);

    // Speed Tier
    const tier = SPEED_TIERS.find(s => finalVfSI <= s.max) || SPEED_TIERS[SPEED_TIERS.length - 1];

    return {
      hSI: finalHSI,
      gSI: finalGSI,
      tSI: finalTSI,
      vfSI: finalVfSI,
      viSI: finalViSI,
      hDisplay,
      gDisplay,
      tDisplay,
      vfDisplay,
      viDisplay,
      tier
    };
  }, [calcMode, siInputs, heightUnit, gravityUnit, timeUnit, vFinalUnit, vInitUnit]);

  // Simulation Duration
  const durationSim = useMemo(() => {
    return Math.min(10, Math.max(1, results.tSI));
  }, [results.tSI]);

  // Simulation Tick
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
  }, [isPlaying, playbackSpeed, durationSim]);

  // Current height fallen ratio: h(t) = vi*t + 0.5*g*t²
  const fallRatio = useMemo(() => {
    if (results.hSI <= 0) return 0;
    const t = Math.min(results.tSI, currentTime);
    const hCurrent = results.viSI * t + 0.5 * results.gSI * Math.pow(t, 2);
    return Math.min(1, Math.max(0, hCurrent / results.hSI));
  }, [currentTime, results]);

  const currentVelocityInst = useMemo(() => {
    const t = Math.min(results.tSI, currentTime);
    return results.viSI + results.gSI * t;
  }, [currentTime, results]);

  // Recharts Kinematic Graphs Data
  const graphData = useMemo(() => {
    const steps = 12;
    const data = [];
    const baseT = Math.max(0.1, results.tSI);
    const dT = baseT / steps;
    for (let i = 0; i <= steps; i++) {
      const t = i * dT;
      const hFallen = results.viSI * t + 0.5 * results.gSI * Math.pow(t, 2);
      const hRemaining = Math.max(0, results.hSI - hFallen);
      const v = results.viSI + results.gSI * t;
      data.push({
        Time: Number(t.toFixed(2)),
        HeightRemaining: Number((hRemaining / (HEIGHT_CONVERSIONS[heightUnit] || 1)).toFixed(1)),
        Velocity: Number((v / (VELOCITY_CONVERSIONS[vFinalUnit] || 1)).toFixed(1))
      });
    }
    return data;
  }, [results, heightUnit, vFinalUnit]);

  // Preset Applicators
  const applyDropPreset = (preset: DropPreset) => {
    setHeightVal(preset.height);
    setHeightUnit("m");
    setGravityVal(preset.g);
    setGravityUnit("m/s²");
    setVInitVal(preset.vInit);
    setVInitUnit("m/s");
    setCalcMode("time");
    triggerNotification("success", `Loaded ${preset.name} parameters!`);
  };

  const applyPlanet = (planet: PlanetPreset) => {
    setSelectedPlanet(planet);
    setGravityVal(planet.g);
    setGravityUnit("m/s²");
    triggerNotification("success", `Applied ${planet.name} gravity (${planet.g} m/s²)!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&h=${heightVal}&g=${gravityVal}&t=${timeVal}&vi=${vInitVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario parameter link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Free Fall Kinematics Calculation
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Fall Height: ${results.hDisplay.toFixed(3)} ${heightUnit}
Fall Time: ${results.tDisplay.toFixed(3)} ${timeUnit}
Impact Velocity: ${results.vfDisplay.toFixed(3)} ${vFinalUnit}
Initial Velocity: ${results.viDisplay.toFixed(3)} ${vInitUnit}
Gravitational Acceleration: ${results.gDisplay.toFixed(3)} ${gravityUnit}
-----------------------------------------
SI Base Values:
Height: ${results.hSI.toFixed(2)} m
Time: ${results.tSI.toFixed(2)} s
Final Velocity: ${results.vfSI.toFixed(2)} m/s (${(results.vfSI * 3.6).toFixed(1)} km/h)
Gravity: ${results.gSI.toFixed(2)} m/s²`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "How long does it take an apple to fall from a height of 19.62 meters on Earth (g = 9.81 m/s²)?",
        correctAnswer: 2,
        units: "s",
        type: "time" as CalcMode
      },
      {
        q: "What is the final impact velocity in m/s of a stone dropped from a 45m building on Earth?",
        correctAnswer: 29.71,
        units: "m/s",
        type: "velocity" as CalcMode
      },
      {
        q: "What is the fall distance in meters of a dropped object after 3 seconds of free fall on Earth?",
        correctAnswer: 44.15,
        units: "m",
        type: "height" as CalcMode
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
                <ArrowDown className="text-[#518231]" />
                Free Fall Cockpit
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
                { key: "time", label: "Fall Time (t)" },
                { key: "velocity", label: "Velocity (vf)" },
                { key: "height", label: "Height (h)" },
                { key: "gravity", label: "Gravity (g)" },
                { key: "advanced", label: "Advanced (vi)" }
              ].map(m => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setCalcMode(m.key as CalcMode)}
                  className={`py-2 px-1 text-center text-[11px] font-bold rounded-xl transition-all capitalize ${
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
              
              {/* Height Input (h) */}
              {calcMode !== "height" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Drop Height (h)
                      <InfoTooltip text="Total vertical distance of fall." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.1"
                        value={heightVal}
                        onChange={(e) => setHeightVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={heightUnit}
                        onChange={(e) => setHeightUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(HEIGHT_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="500"
                    step="1"
                    value={heightVal}
                    onChange={(e) => setHeightVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Drop Height (h - Calculated)" val={`${results.hDisplay.toFixed(3)} ${heightUnit}`} icon={Building} />
              )}

              {/* Gravitational Acceleration Input (g) */}
              {calcMode !== "gravity" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Gravity (g)
                      <InfoTooltip text="Gravitational acceleration field strength." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.01"
                        value={gravityVal}
                        onChange={(e) => setGravityVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={gravityUnit}
                        onChange={(e) => setGravityUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(GRAVITY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="30"
                    step="0.1"
                    value={gravityVal}
                    onChange={(e) => setGravityVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Gravity (g - Calculated)" val={`${results.gDisplay.toFixed(3)} ${gravityUnit}`} icon={Globe} />
              )}

              {/* Fall Time Input (t) */}
              {calcMode !== "time" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Fall Time (t)
                      <InfoTooltip text="Duration of free fall elapsed." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.01"
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
                    min="0.1"
                    max="30"
                    step="0.1"
                    value={timeVal}
                    onChange={(e) => setTimeVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Fall Time (t - Calculated)" val={`${results.tDisplay.toFixed(3)} ${timeUnit}`} icon={Zap} />
              )}

              {/* Initial Velocity Input (vi) for Advanced Mode */}
              {isAdvancedMode && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Initial Velocity (vᵢ)
                      <InfoTooltip text="Downward starting velocity (0 for pure drop)." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.1"
                        value={vInitVal}
                        onChange={(e) => setVInitVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={vInitUnit}
                        onChange={(e) => setVInitUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(VELOCITY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Smart Unit Converter panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Smart Impact Velocity Conversion
            </h3>
            <div className="space-y-2">
              {Object.keys(VELOCITY_CONVERSIONS).map(uKey => {
                const convVal = results.vfSI / VELOCITY_CONVERSIONS[uKey];
                return (
                  <div key={uKey} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 font-semibold">{uKey}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{convVal.toFixed(3)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Free Fall Simulator, Graphs & Pro Features */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Free Fall Simulator Canvas */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                Animated Free Fall Canvas & Impact Speed Gauge
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{results.tier.name}</span>
              </div>
            </div>

            {/* Radial Arc Impact Gauge */}
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
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (results.vfSI / 100) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, results.vfSI / 100))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, results.vfSI / 100))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.vfDisplay.toFixed(2)} {vFinalUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {results.tier.label}
                </div>
              </div>
            </div>

            {/* Free Fall Drop Simulation Track */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-40 flex items-center justify-between overflow-hidden">
              <div className="absolute left-4 top-3 text-[10px] text-slate-400 font-bold">Top Elevation ({results.hDisplay.toFixed(1)} {heightUnit})</div>
              <div className="absolute left-4 bottom-3 text-[10px] text-slate-500 font-bold">Ground Impact (0 {heightUnit})</div>
              
              {/* Vertical Scale Ruler */}
              <div className="w-1.5 bg-slate-800 h-28 mx-auto relative rounded-full">
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-7 h-7 bg-[#518231] rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all ease-linear"
                  style={{ top: `${fallRatio * 85}%` }}
                >
                  <ArrowDown size={14} className="text-white animate-bounce" />
                </div>
              </div>

              <div className="absolute right-4 top-4 text-right space-y-1">
                <div className="text-[10px] text-emerald-400 font-mono font-bold">Time: {currentTime.toFixed(2)}s / {results.tSI.toFixed(2)}s</div>
                <div className="text-[10px] text-amber-400 font-mono font-bold">Speed: {currentVelocityInst.toFixed(1)} m/s</div>
                <div className="text-[9px] text-slate-400 font-mono">Gravity: {results.gSI.toFixed(2)} m/s²</div>
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
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Fall Time</span>
                <div className="text-xs font-black text-[#518231] mt-0.5">{results.tDisplay.toFixed(2)} {timeUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Impact Velocity</span>
                <div className="text-xs font-black text-amber-400 mt-0.5">{results.vfDisplay.toFixed(1)} {vFinalUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Drop Height</span>
                <div className="text-xs font-black text-blue-400 mt-0.5">{results.hDisplay.toFixed(1)} {heightUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Gravity</span>
                <div className="text-xs font-black text-emerald-400 mt-0.5">{results.gDisplay.toFixed(2)} {gravityUnit}</div>
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
                {(["visuals", "graphs", "planets", "explanation", "quiz"] as const).map(tab => (
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
                    {tab === "visuals" ? "Presets" : tab === "graphs" ? "📈 Kinematic Charts" : tab === "planets" ? "🪐 Planets" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Presets */}
                {activeTab === "visuals" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🎯 Real-World Free Fall Drop Presets</h4>
                    <p className="text-xs text-slate-500">Click any preset to inspect its drop kinematics:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {DROP_PRESETS.map((preset, idx) => {
                        const IconComp = preset.icon;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => applyDropPreset(preset)}
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

                {/* Tab 2: Kinematic Motion Charts */}
                {activeTab === "graphs" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      📈 Velocity vs Time Kinematic Motion Chart
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={graphData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Time" label={{ value: "Time (s)", position: "insideBottom", offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Velocity" stroke="#518231" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 3: Solar System Planets Gravity Comparison */}
                {activeTab === "planets" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Globe size={16} className="text-[#518231]" />
                      🪐 Solar System Planet Gravity Comparison ({results.hDisplay.toFixed(1)} {heightUnit} Drop)
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {PLANET_PRESETS.map(planet => (
                        <button
                          key={planet.name}
                          type="button"
                          onClick={() => applyPlanet(planet)}
                          className={`p-2.5 rounded-2xl border text-center transition-all ${
                            selectedPlanet.name === planet.name 
                              ? "bg-[#518231]/10 border-[#518231] text-[#518231] font-bold" 
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600"
                          }`}
                        >
                          <div className="text-xs">{planet.name}</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">{planet.g} m/s²</div>
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="text-slate-400 font-bold text-[10px] uppercase">{selectedPlanet.name} Free Fall Result</div>
                      <div className="flex justify-between">
                        <span>Fall Duration from {results.hDisplay.toFixed(1)} m:</span>
                        <strong className="text-emerald-400">{Math.sqrt((2 * results.hSI) / selectedPlanet.g).toFixed(2)} Seconds</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Impact Velocity:</span>
                        <strong className="text-amber-400">{Math.sqrt(2 * selectedPlanet.g * results.hSI).toFixed(2)} m/s</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Step-by-Step Solution */}
                {activeTab === "explanation" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-step Solution</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Free Fall Kinematic Formula: t = √ (2·h / g)</div>
                      <div>2. Knowns: h = {results.hSI.toFixed(2)} m, g = {results.gSI.toFixed(2)} m/s²</div>
                      <div>3. 2·h / g = 2 · {results.hSI.toFixed(2)} / {results.gSI.toFixed(2)} = {((2 * results.hSI) / results.gSI).toFixed(2)}</div>
                      <div>4. t = √({((2 * results.hSI) / results.gSI).toFixed(2)}) = {results.tSI.toFixed(2)} Seconds</div>
                      <div>5. Impact Velocity: v_f = g · t = {results.vfSI.toFixed(2)} m/s ({results.vfDisplay.toFixed(2)} {vFinalUnit})</div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Physics Quiz */}
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
