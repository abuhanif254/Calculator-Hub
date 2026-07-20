"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Play, Pause, RotateCcw, AlertTriangle, Info, Download, Printer, Copy, Share2, 
  Target, Globe2, Sparkles, HelpCircle, CheckCircle2, ChevronRight, BarChart3, LineChart as LineChartIcon,
  Compass, ArrowRight, Gauge, Clock, Zap, Bike, Car, Train, Plane, ShieldAlert
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from "recharts";

type CalcMode = "velocity" | "distance" | "time";

// Conversion factors to SI base units (m, m/s, s)
const DISTANCE_CONVERSIONS: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
  nmi: 1852
};

const VELOCITY_CONVERSIONS: Record<string, number> = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  "mph": 0.44704,
  "ft/s": 0.3048,
  "knots": 0.514444
};

const TIME_CONVERSIONS: Record<string, number> = {
  ms: 0.001,
  s: 1,
  min: 60,
  h: 3600,
  d: 86400
};

// Travel Estimator presets (speed in m/s)
const ESTIMATOR_PRESETS = [
  { name: "Walking", speed: 1.4, icon: Zap, label: "Walking (1.4 m/s)" },
  { name: "Cycling", speed: 5.5, icon: Bike, label: "Cycling (5.5 m/s)" },
  { name: "Car Driving", speed: 28.0, icon: Car, label: "Driving (28 m/s)" },
  { name: "High-Speed Train", speed: 83.3, icon: Train, label: "Train (83.3 m/s)" },
  { name: "Commercial Jet", speed: 250.0, icon: Plane, label: "Jet Flight (250 m/s)" }
];

// Speed Comparison Scale (in m/s)
const SPEED_SCALE = [
  { name: "Human Walk", value: 1.4, color: "#94a3b8" },
  { name: "Cheetah Sprint", value: 30.0, color: "#fbbf24" },
  { name: "Formula 1 Car", value: 90.0, color: "#ef4444" },
  { name: "Bullet Train", value: 100.0, color: "#3b82f6" },
  { name: "Boeing 747 Jet", value: 250.0, color: "#10b981" },
  { name: "Space Shuttle", value: 7800.0, color: "#8b5cf6" },
  { name: "Speed of Light", value: 299792458.0, color: "#ec4899" }
];

// Planetary Constants (Escape velocity in km/s and surface gravity in m/s²)
const PLANET_CONSTANTS = [
  { name: "Earth", escape: 11.2, gravity: 9.81, radius: 6371 },
  { name: "Moon", escape: 2.4, gravity: 1.62, radius: 1737 },
  { name: "Mars", escape: 5.0, gravity: 3.71, radius: 3389 },
  { name: "Jupiter", escape: 59.5, gravity: 24.79, radius: 69911 }
];

export function VelocityCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("velocity");

  // Input states (in display units)
  const [distanceVal, setDistanceVal] = useState<number>(100);
  const [distanceUnit, setDistanceUnit] = useState<string>("m");

  const [timeVal, setTimeVal] = useState<number>(10);
  const [timeUnit, setTimeUnit] = useState<string>("s");

  const [velocityVal, setVelocityVal] = useState<number>(10);
  const [velocityUnit, setVelocityUnit] = useState<string>("m/s");

  // Extra modes tabs
  const [activeTab, setActiveTab] = useState<"visuals" | "explanation" | "planets" | "scale" | "quiz">("visuals");

  // Animation timelines
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
    args: any;
  } | null>(null);
  const [quizUserAnswer, setQuizUserAnswer] = useState<string>("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  // Alerts
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
    generateQuiz();
    
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode")) setCalcMode(params.get("mode") as CalcMode);
      if (params.get("d")) setDistanceVal(Number(params.get("d")));
      if (params.get("t")) setTimeVal(Number(params.get("t")));
      if (params.get("v")) setVelocityVal(Number(params.get("v")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (meters, meters/second, seconds)
  const siInputs = useMemo(() => {
    const dSI = distanceVal * (DISTANCE_CONVERSIONS[distanceUnit] || 1);
    const tSI = timeVal * (TIME_CONVERSIONS[timeUnit] || 1);
    const vSI = velocityVal * (VELOCITY_CONVERSIONS[velocityUnit] || 1);
    return { dSI, tSI, vSI };
  }, [distanceVal, distanceUnit, timeVal, timeUnit, velocityVal, velocityUnit]);

  // Perform Calculations based on calculation mode
  const results = useMemo(() => {
    let finalVelocity = siInputs.vSI;
    let finalDistance = siInputs.dSI;
    let finalTime = siInputs.tSI;

    if (calcMode === "velocity") {
      if (siInputs.tSI > 0) {
        finalVelocity = siInputs.dSI / siInputs.tSI;
      } else {
        finalVelocity = 0;
      }
    } else if (calcMode === "distance") {
      finalDistance = siInputs.vSI * siInputs.tSI;
    } else if (calcMode === "time") {
      if (siInputs.vSI > 0) {
        finalTime = siInputs.dSI / siInputs.vSI;
      } else {
        finalTime = 0;
      }
    }

    // Convert results back to selected display units
    const dDisplay = finalDistance / (DISTANCE_CONVERSIONS[distanceUnit] || 1);
    const tDisplay = finalTime / (TIME_CONVERSIONS[timeUnit] || 1);
    const vDisplay = finalVelocity / (VELOCITY_CONVERSIONS[velocityUnit] || 1);

    return {
      velocitySI: finalVelocity,
      distanceSI: finalDistance,
      timeSI: finalTime,
      velocityDisplay: vDisplay,
      distanceDisplay: dDisplay,
      timeDisplay: tDisplay
    };
  }, [calcMode, siInputs, distanceUnit, timeUnit, velocityUnit]);

  // Travel Estimator Calculations
  const travelEstimates = useMemo(() => {
    return ESTIMATOR_PRESETS.map(preset => {
      const timeSec = results.distanceSI / preset.speed;
      let displayTime = "";
      if (timeSec < 60) {
        displayTime = `${timeSec.toFixed(1)} s`;
      } else if (timeSec < 3600) {
        displayTime = `${(timeSec / 60).toFixed(1)} min`;
      } else if (timeSec < 86400) {
        displayTime = `${(timeSec / 3600).toFixed(1)} hrs`;
      } else {
        displayTime = `${(timeSec / 86400).toFixed(1)} days`;
      }
      return {
        ...preset,
        timeSec,
        displayTime
      };
    });
  }, [results.distanceSI]);

  // Escape velocity & Terminal Velocity planetary comparisons
  const planetaryCompares = useMemo(() => {
    return PLANET_CONSTANTS.map(planet => {
      // Escape velocity: sqrt(2 * g * R)
      const escapeSI = Math.sqrt(2 * planet.gravity * planet.radius * 1000) / 1000; // in km/s
      // Free fall speed after 5 seconds: v = g * t
      const fallSpeedSI = planet.gravity * 5; // m/s
      return {
        ...planet,
        escapeCalc: escapeSI,
        fallSpeedDisplay: fallSpeedSI * (VELOCITY_CONVERSIONS[velocityUnit] || 1)
      };
    });
  }, [velocityUnit]);

  // Motion graphs data (Position & Velocity vs Time)
  const graphData = useMemo(() => {
    const steps = 10;
    const data = [];
    const dt = results.timeSI / steps;
    for (let i = 0; i <= steps; i++) {
      const t = i * dt;
      const x = results.velocitySI * t;
      data.push({
        Time: Number(t.toFixed(2)),
        Position: Number(x.toFixed(2)),
        Velocity: Number(results.velocitySI.toFixed(2))
      });
    }
    return data;
  }, [results]);

  // Live animation playback loop
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      const tick = (now: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = now;
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        setCurrentTime(prev => {
          const nextVal = prev + delta * playbackSpeed;
          if (nextVal >= results.timeSI) {
            setIsPlaying(false);
            return results.timeSI;
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
  }, [isPlaying, playbackSpeed, results.timeSI]);

  // Animation current position
  const currentPosRatio = useMemo(() => {
    if (results.timeSI <= 0) return 0;
    return Math.min(1, currentTime / results.timeSI);
  }, [currentTime, results.timeSI]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&d=${distanceVal}&t=${timeVal}&v=${velocityVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario parameters link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Velocity Calculation Details
-------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Velocity: ${(results.velocityDisplay).toFixed(4)} ${velocityUnit}
Calculated Distance: ${(results.distanceDisplay).toFixed(4)} ${distanceUnit}
Calculated Time: ${(results.timeDisplay).toFixed(4)} ${timeUnit}
-------------------------------------
SI Equivalent values:
Distance: ${results.distanceSI.toFixed(2)} m
Velocity: ${results.velocitySI.toFixed(2)} m/s
Time: ${results.timeSI.toFixed(3)} s`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Velocity calculation results copied to clipboard!");
    });
  };

  // Quiz generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "A cyclist travels a distance of 1500 meters in exactly 300 seconds. Calculate the cyclist's average velocity in m/s.",
        correctAnswer: 5,
        units: "m/s",
        type: "velocity" as CalcMode,
        args: { distance: 1500, time: 300 }
      },
      {
        q: "A commercial aircraft flies with a constant speed of 250 m/s for 7200 seconds (2 hours). How far does the jet travel in kilometers?",
        correctAnswer: 1800,
        units: "km",
        type: "distance" as CalcMode,
        args: { speed: 250, time: 7200 }
      },
      {
        q: "How many seconds does it take a spacecraft traveling at a velocity of 8000 m/s to cover a distance of 40,000 meters?",
        correctAnswer: 5,
        units: "s",
        type: "time" as CalcMode,
        args: { speed: 8000, distance: 40000 }
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
      {/* Alert banner */}
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
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <Gauge className="text-[#518231]" />
              Calculation Cockpit
            </h2>

            {/* Mode Select Segmented Selector */}
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-3 gap-1 mb-8">
              {(["velocity", "distance", "time"] as const).map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setCalcMode(mode)}
                  className={`py-2 px-1 text-center text-xs font-bold rounded-xl transition-all capitalize ${
                    calcMode === mode 
                      ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm font-black" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {mode === "velocity" ? "Velocity (v)" : mode === "distance" ? "Distance (d)" : "Time (t)"}
                </button>
              ))}
            </div>

            {/* Parameter Fields based on Active Mode */}
            <div className="space-y-6">
              
              {/* Distance Input (Calculated in Velocity/Time modes) */}
              {calcMode !== "distance" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Distance (d)
                      <InfoTooltip text="Total physical length or displacement covered by the moving object." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={distanceVal}
                        onChange={(e) => setDistanceVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={distanceUnit}
                        onChange={(e) => setDistanceUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(DISTANCE_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5000"
                    step="1"
                    value={distanceVal}
                    onChange={(e) => setDistanceVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Distance (Calculated)" val={`${results.distanceDisplay.toFixed(3)} ${distanceUnit}`} icon={Compass} />
              )}

              {/* Time Input (Calculated in Velocity/Distance modes) */}
              {calcMode !== "time" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Time Duration (t)
                      <InfoTooltip text="Elapsed flight time or travel duration of the motion." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
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
                          <option key={u} value={u} className="bg-white dark:bg-slate-900">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="300"
                    step="1"
                    value={timeVal}
                    onChange={(e) => setTimeVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Time (Calculated)" val={`${results.timeDisplay.toFixed(3)} ${timeUnit}`} icon={Clock} />
              )}

              {/* Velocity Input (Calculated in Distance/Time modes) */}
              {calcMode !== "velocity" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Velocity (v)
                      <InfoTooltip text="The constant speed or displacement rate of the object in motion." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={velocityVal}
                        onChange={(e) => setVelocityVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={velocityUnit}
                        onChange={(e) => setVelocityUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(VELOCITY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    step="1"
                    value={velocityVal}
                    onChange={(e) => setVelocityVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Velocity (Calculated)" val={`${results.velocityDisplay.toFixed(3)} ${velocityUnit}`} icon={Gauge} />
              )}

            </div>
          </div>

          {/* Unit Conversion Tables panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Compass size={16} className="text-[#518231]" />
              Calculated Speed equivalents
            </h3>
            <div className="space-y-2">
              {Object.keys(VELOCITY_CONVERSIONS).map(unitKey => {
                const multiplier = VELOCITY_CONVERSIONS[unitKey];
                const valueInUnit = results.velocitySI / multiplier;
                return (
                  <div key={unitKey} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 font-semibold">{unitKey}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{valueInUnit.toFixed(4)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Visualizer Timeline & Comparison Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Dashboard Visualizer Canvas */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Compass size={13} className="text-[#518231]" />
                Animated Motion Timeline
              </span>
              <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span>Speed: {results.velocitySI.toFixed(2)} m/s</span>
              </div>
            </div>

            {/* Animation Timeline Track */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-28 flex items-center">
              {/* Start & End labels */}
              <div className="absolute left-4 bottom-2 text-[10px] text-slate-500 font-bold">Start (0m)</div>
              <div className="absolute right-4 bottom-2 text-[10px] text-slate-500 font-bold">End ({results.distanceSI.toFixed(1)}m)</div>
              
              {/* Track line */}
              <div className="w-full h-1 bg-slate-800 rounded-full relative">
                {/* Moving dot / vehicle */}
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

              {/* Time duration counter */}
              <div className="text-xs font-mono text-slate-300">
                Elapsed: <strong>{currentTime.toFixed(2)}s</strong> / {results.timeSI.toFixed(2)}s
              </div>

              {/* Slow-mo selector */}
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

            {/* Dashboard Quick Statistics cards */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Velocity</span>
                <div className="text-xs sm:text-sm font-black text-amber-400 mt-1">{results.velocityDisplay.toFixed(3)} {velocityUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Distance</span>
                <div className="text-xs sm:text-sm font-black text-emerald-400 mt-1">{results.distanceDisplay.toFixed(3)} {distanceUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Duration</span>
                <div className="text-xs sm:text-sm font-black text-blue-400 mt-1">{results.timeDisplay.toFixed(3)} {timeUnit}</div>
              </div>
            </div>

            {/* Export & print options */}
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

          {/* Interactive Multi-feature Tabs Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Headers */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
              {(["visuals", "explanation", "planets", "scale", "quiz"] as const).map(tab => (
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
                  {tab === "visuals" ? "Dashboard" : tab}
                </button>
              ))}
            </div>

            {/* Content areas */}
            <div className="p-6">
              
              {/* Tab 1: Recharts position graph */}
              {activeTab === "visuals" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Motion Graphs (Position vs Time)</h4>
                  <p className="text-xs text-slate-500">Shows linear displacement over time at a constant speed of {results.velocitySI.toFixed(2)} m/s:</p>
                  
                  {isClient ? (
                    <div className="h-48 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={graphData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="Time" label={{ value: "Time (s)", position: "insideBottom", offset: -5 }} />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="Position" stroke="#10b981" strokeWidth={2.5} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                  )}
                </div>
              )}

              {/* Tab 2: Travel Estimator list */}
              {activeTab === "explanation" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <Car size={16} className="text-[#518231]" />
                    Comparative Travel Estimator
                  </h4>
                  <p className="text-xs text-slate-500">Estimated duration to travel {results.distanceDisplay.toFixed(2)} {distanceUnit} across mode averages:</p>
                  
                  <div className="space-y-3">
                    {travelEstimates.map((est, idx) => {
                      const IconC = est.icon;
                      return (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/60">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-white dark:bg-slate-900 text-[#518231] rounded-lg shadow-sm">
                              <IconC size={16} />
                            </div>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{est.name}</span>
                          </div>
                          <span className="text-xs font-black text-slate-900 dark:text-white">{est.displayTime}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 3: Planet Escape Speed Comparisons */}
              {activeTab === "planets" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Planetary Escape Speeds</h4>
                  <p className="text-xs text-slate-500">Compare gravity indicators and planetary escape speed minimums:</p>
                  
                  <div className="space-y-3">
                    {planetaryCompares.map((planet, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200 block">{planet.name}</strong>
                          <span className="text-[10px] text-slate-400">Gravity: {planet.gravity} m/s²</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#518231]">{planet.escapeCalc.toFixed(2)} km/s</div>
                          <span className="text-[10px] text-slate-400 font-medium">Freefall: {planet.fallSpeedDisplay.toFixed(1)} {velocityUnit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Speed Scale Bar comparison */}
              {activeTab === "scale" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Logarithmic Speed scale comparisons</h4>
                  <p className="text-xs text-slate-500">Compare your calculated velocity ({results.velocitySI.toFixed(2)} m/s) against benchmark objects (m/s):</p>
                  
                  <div className="space-y-2">
                    {SPEED_SCALE.map((scaleItem, idx) => {
                      const isLarger = results.velocitySI >= scaleItem.value;
                      return (
                        <div key={idx} className="space-y-1 text-xs">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                            <span>{scaleItem.name}</span>
                            <span className={isLarger ? "text-emerald-500" : "text-slate-400"}>
                              {scaleItem.value.toLocaleString()} m/s
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${Math.min(100, (scaleItem.value / 299792458) * 100)}%`,
                                backgroundColor: scaleItem.color 
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 5: Physics Quiz */}
              {activeTab === "quiz" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Practice Mode Physics Quiz</h4>
                  
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
                              <span>Correct! The answer is approximately {quizQuestion.correctAnswer} {quizQuestion.units}.</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle size={16} className="text-red-600 shrink-0" />
                              <span>Incorrect. Correct answer is {quizQuestion.correctAnswer} {quizQuestion.units}. Try again!</span>
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
