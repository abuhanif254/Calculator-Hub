"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Clock, Zap, Bike, Car, Train, Plane, 
  Rocket, Sliders, Activity, Sparkles, HelpCircle, AlertTriangle, ArrowRight, Download
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "acceleration" | "final_velocity" | "initial_velocity" | "time";

// Conversion factors to SI base units (m/s, m/s², s)
const VELOCITY_CONVERSIONS: Record<string, number> = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  "mph": 0.44704,
  "ft/s": 0.3048
};

const ACCELERATION_CONVERSIONS: Record<string, number> = {
  "m/s²": 1,
  "ft/s²": 0.3048,
  "km/h²": 1 / (3.6 * 3600),
  "g": 9.80665
};

const TIME_CONVERSIONS: Record<string, number> = {
  ms: 0.001,
  s: 1,
  min: 60,
  h: 3600
};

// Real-World Presets
interface Preset {
  name: string;
  vi: number; // m/s
  vf: number; // m/s
  time: number; // s
  accel: number; // m/s²
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const REAL_WORLD_PRESETS: Preset[] = [
  { name: "Human Walk", vi: 0, vf: 1.4, time: 2.8, accel: 0.5, icon: Zap, desc: "0 to 5 km/h in 2.8s" },
  { name: "Running Sprint", vi: 0, vf: 10, time: 5.0, accel: 2.0, icon: Zap, desc: "0 to 36 km/h in 5s" },
  { name: "Cycling Acceleration", vi: 0, vf: 6.0, time: 5.0, accel: 1.2, icon: Bike, desc: "0 to 21.6 km/h in 5s" },
  { name: "Family Sedan (0-100 km/h)", vi: 0, vf: 27.78, time: 9.2, accel: 3.02, icon: Car, desc: "0 to 100 km/h in 9.2s" },
  { name: "Sports Motorcycle", vi: 0, vf: 27.78, time: 3.5, accel: 7.94, icon: Car, desc: "0 to 100 km/h in 3.5s" },
  { name: "Formula 1 Racecar", vi: 0, vf: 55.56, time: 3.8, accel: 14.62, icon: Activity, desc: "0 to 200 km/h in 3.8s" },
  { name: "High-Speed Bullet Train", vi: 0, vf: 83.33, time: 100.0, accel: 0.83, icon: Train, desc: "0 to 300 km/h in 100s" },
  { name: "Commercial Jet Takeoff", vi: 0, vf: 75.0, time: 30.0, accel: 2.5, icon: Plane, desc: "0 to 270 km/h in 30s" },
  { name: "Space Rocket Launch", vi: 0, vf: 1000.0, time: 34.0, accel: 29.4, icon: Rocket, desc: "0 to 3600 km/h in 34s (~3g)" },
  { name: "Earth Free Fall", vi: 0, vf: 49.03, time: 5.0, accel: 9.81, icon: Gauge, desc: "Gravity acceleration (g = 9.81 m/s²)" }
];

export function AccelerationCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("acceleration");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input States (in display units)
  const [initialVelVal, setInitialVelVal] = useState<number>(0);
  const [initialVelUnit, setInitialVelUnit] = useState<string>("m/s");

  const [finalVelVal, setFinalVelVal] = useState<number>(27.78);
  const [finalVelUnit, setFinalVelUnit] = useState<string>("m/s");

  const [timeVal, setTimeVal] = useState<number>(10);
  const [timeUnit, setTimeUnit] = useState<string>("s");

  const [accelVal, setAccelVal] = useState<number>(2.778);
  const [accelUnit, setAccelUnit] = useState<string>("m/s²");

  // Tabs for Advanced Views
  const [activeTab, setActiveTab] = useState<"visuals" | "explanation" | "presets" | "quiz">("visuals");

  // Animation timeline states
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
      if (params.get("vi")) setInitialVelVal(Number(params.get("vi")));
      if (params.get("vf")) setFinalVelVal(Number(params.get("vf")));
      if (params.get("t")) setTimeVal(Number(params.get("t")));
      if (params.get("a")) setAccelVal(Number(params.get("a")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (m/s, m/s², s)
  const siInputs = useMemo(() => {
    const viSI = initialVelVal * (VELOCITY_CONVERSIONS[initialVelUnit] || 1);
    const vfSI = finalVelVal * (VELOCITY_CONVERSIONS[finalVelUnit] || 1);
    const tSI = timeVal * (TIME_CONVERSIONS[timeUnit] || 1);
    const aSI = accelVal * (ACCELERATION_CONVERSIONS[accelUnit] || 1);
    return { viSI, vfSI, tSI, aSI };
  }, [initialVelVal, initialVelUnit, finalVelVal, finalVelUnit, timeVal, timeUnit, accelVal, accelUnit]);

  // Main Calculation Logic
  const results = useMemo(() => {
    let finalViSI = siInputs.viSI;
    let finalVfSI = siInputs.vfSI;
    let finalTimeSI = siInputs.tSI;
    let finalAccelSI = siInputs.aSI;

    if (calcMode === "acceleration") {
      if (siInputs.tSI > 0) {
        finalAccelSI = (siInputs.vfSI - siInputs.viSI) / siInputs.tSI;
      } else {
        finalAccelSI = 0;
      }
    } else if (calcMode === "final_velocity") {
      finalVfSI = siInputs.viSI + siInputs.aSI * siInputs.tSI;
    } else if (calcMode === "initial_velocity") {
      finalViSI = siInputs.vfSI - siInputs.aSI * siInputs.tSI;
    } else if (calcMode === "time") {
      if (Math.abs(siInputs.aSI) > 0.000001) {
        finalTimeSI = (siInputs.vfSI - siInputs.viSI) / siInputs.aSI;
        if (finalTimeSI < 0) finalTimeSI = Math.abs(finalTimeSI); // Physical magnitude
      } else {
        finalTimeSI = 0;
      }
    }

    // Displacement / Total Distance covered under uniform acceleration: s = vi * t + 0.5 * a * t^2
    const totalDistanceSI = finalViSI * finalTimeSI + 0.5 * finalAccelSI * Math.pow(finalTimeSI, 2);
    const velocityChangeSI = finalVfSI - finalViSI;
    const gForce = finalAccelSI / 9.80665;

    // Convert results back to selected display units
    const viDisplay = finalViSI / (VELOCITY_CONVERSIONS[initialVelUnit] || 1);
    const vfDisplay = finalVfSI / (VELOCITY_CONVERSIONS[finalVelUnit] || 1);
    const tDisplay = finalTimeSI / (TIME_CONVERSIONS[timeUnit] || 1);
    const aDisplay = finalAccelSI / (ACCELERATION_CONVERSIONS[accelUnit] || 1);

    return {
      viSI: finalViSI,
      vfSI: finalVfSI,
      timeSI: finalTimeSI,
      accelSI: finalAccelSI,
      totalDistanceSI,
      velocityChangeSI,
      gForce,
      viDisplay,
      vfDisplay,
      tDisplay,
      aDisplay
    };
  }, [calcMode, siInputs, initialVelUnit, finalVelUnit, timeUnit, accelUnit]);

  // Motion Graphs Data (Velocity & Position vs Time)
  const graphData = useMemo(() => {
    const steps = 12;
    const data = [];
    const dt = Math.max(0.01, results.timeSI / steps);
    for (let i = 0; i <= steps; i++) {
      const t = i * dt;
      const v = results.viSI + results.accelSI * t;
      const x = results.viSI * t + 0.5 * results.accelSI * Math.pow(t, 2);
      data.push({
        Time: Number(t.toFixed(2)),
        Velocity: Number(v.toFixed(2)),
        Position: Number(x.toFixed(2)),
        Acceleration: Number(results.accelSI.toFixed(2))
      });
    }
    return data;
  }, [results]);

  // Animation Playback Effect
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

  // Animated position fraction
  const currentPosRatio = useMemo(() => {
    if (results.timeSI <= 0) return 0;
    const t = Math.min(results.timeSI, currentTime);
    const dInstant = results.viSI * t + 0.5 * results.accelSI * Math.pow(t, 2);
    if (Math.abs(results.totalDistanceSI) < 0.001) return 0;
    return Math.min(1, Math.max(0, dInstant / results.totalDistanceSI));
  }, [currentTime, results]);

  // Current instantaneous velocity at currentTime
  const currentInstantVelocity = useMemo(() => {
    const t = Math.min(results.timeSI, currentTime);
    const v = results.viSI + results.accelSI * t;
    return v / (VELOCITY_CONVERSIONS[finalVelUnit] || 1);
  }, [currentTime, results, finalVelUnit]);

  // Preset Applicator
  const applyPreset = (preset: Preset) => {
    setInitialVelVal(preset.vi);
    setInitialVelUnit("m/s");
    setFinalVelVal(preset.vf);
    setFinalVelUnit("m/s");
    setTimeVal(preset.time);
    setTimeUnit("s");
    setAccelVal(preset.accel);
    setAccelUnit("m/s²");
    setCalcMode("acceleration");
    triggerNotification("success", `Loaded ${preset.name} parameters!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&vi=${initialVelVal}&vf=${finalVelVal}&t=${timeVal}&a=${accelVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario URL copied to clipboard!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Acceleration Calculation Details
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Acceleration: ${results.aDisplay.toFixed(4)} ${accelUnit} (${results.gForce.toFixed(2)} g)
Initial Velocity: ${results.viDisplay.toFixed(3)} ${initialVelUnit}
Final Velocity: ${results.vfDisplay.toFixed(3)} ${finalVelUnit}
Time Duration: ${results.tDisplay.toFixed(3)} ${timeUnit}
Total Distance Covered: ${results.totalDistanceSI.toFixed(2)} m
-----------------------------------------
Velocity Change: ${results.velocityChangeSI.toFixed(3)} m/s`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "A sports car accelerates from rest (0 m/s) to 30 m/s in 6 seconds. What is its acceleration in m/s²?",
        correctAnswer: 5,
        units: "m/s²",
        type: "acceleration" as CalcMode
      },
      {
        q: "A train traveling at 20 m/s accelerates at 2 m/s² for 10 seconds. What is its final velocity in m/s?",
        correctAnswer: 40,
        units: "m/s",
        type: "final_velocity" as CalcMode
      },
      {
        q: "An airplane decelerates at -4 m/s² to reach a complete stop (0 m/s) in 20 seconds. What was its initial velocity in m/s?",
        correctAnswer: 80,
        units: "m/s",
        type: "initial_velocity" as CalcMode
      },
      {
        q: "How many seconds does it take an object to accelerate from 10 m/s to 50 m/s with an acceleration of 8 m/s²?",
        correctAnswer: 5,
        units: "s",
        type: "time" as CalcMode
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
        
        {/* Left Column: Input Cockpit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Gauge className="text-[#518231]" />
                Kinematics Cockpit
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
                { key: "acceleration", label: "Acceleration (a)" },
                { key: "final_velocity", label: "Final Velocity (v_f)" },
                { key: "initial_velocity", label: "Initial Velocity (v_i)" },
                { key: "time", label: "Time (t)" }
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

            {/* Dynamic Inputs based on Calculation Mode */}
            <div className="space-y-6">
              
              {/* Initial Velocity (v_i) */}
              {calcMode !== "initial_velocity" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Initial Velocity (v_i)
                      <InfoTooltip text="The velocity of the object at the start of the time interval." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={initialVelVal}
                        onChange={(e) => setInitialVelVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={initialVelUnit}
                        onChange={(e) => setInitialVelUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(VELOCITY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.5"
                    value={initialVelVal}
                    onChange={(e) => setInitialVelVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Initial Velocity (v_i - Calculated)" val={`${results.viDisplay.toFixed(3)} ${initialVelUnit}`} icon={Gauge} />
              )}

              {/* Final Velocity (v_f) */}
              {calcMode !== "final_velocity" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Final Velocity (v_f)
                      <InfoTooltip text="The velocity of the object at the end of the time interval." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={finalVelVal}
                        onChange={(e) => setFinalVelVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={finalVelUnit}
                        onChange={(e) => setFinalVelUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(VELOCITY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="0.5"
                    value={finalVelVal}
                    onChange={(e) => setFinalVelVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Final Velocity (v_f - Calculated)" val={`${results.vfDisplay.toFixed(3)} ${finalVelUnit}`} icon={Gauge} />
              )}

              {/* Acceleration (a) */}
              {calcMode !== "acceleration" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Acceleration (a)
                      <InfoTooltip text="The rate of change of velocity over time." />
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
                    min="-20"
                    max="30"
                    step="0.1"
                    value={accelVal}
                    onChange={(e) => setAccelVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Acceleration (a - Calculated)" val={`${results.aDisplay.toFixed(3)} ${accelUnit}`} icon={Activity} />
              )}

              {/* Time (t) */}
              {calcMode !== "time" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Time Elapsed (t)
                      <InfoTooltip text="Duration over which the acceleration occurs." />
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
              ) : (
                <ReadOnlyField label="Time (t - Calculated)" val={`${results.tDisplay.toFixed(3)} ${timeUnit}`} icon={Clock} />
              )}

            </div>
          </div>

          {/* Smart Unit Conversion Table panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Activity size={16} className="text-[#518231]" />
              Smart Acceleration Conversion Table
            </h3>
            <div className="space-y-2">
              {Object.keys(ACCELERATION_CONVERSIONS).map(uKey => {
                const convVal = results.accelSI / ACCELERATION_CONVERSIONS[uKey];
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

        {/* Right Column: Visual Dashboard, Motion Canvas & Charts */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                Live Motion Simulation & Acceleration Gauge
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>G-Force: {results.gForce.toFixed(2)} g</span>
              </div>
            </div>

            {/* Acceleration Radial Arc Gauge */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 mb-4 flex flex-col items-center justify-center relative">
              <div className="w-48 h-24 relative overflow-hidden flex justify-center">
                <svg viewBox="0 0 100 50" className="w-44 h-22">
                  {/* Gauge Arc background */}
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
                  
                  {/* Active Gauge Arc colored according to deceleration or acceleration */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke={results.accelSI < 0 ? "#ef4444" : results.accelSI === 0 ? "#f59e0b" : "#10b981"}
                    strokeWidth="10"
                    strokeDasharray="126"
                    strokeDashoffset={126 - Math.min(126, Math.max(0, ((results.accelSI + 10) / 40) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Center Pivot Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, (results.accelSI + 10) / 40))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, (results.accelSI + 10) / 40))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className={`text-xl font-black ${
                  results.accelSI < 0 ? "text-red-400" : results.accelSI === 0 ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {results.aDisplay.toFixed(2)} {accelUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {results.accelSI < 0 ? "Deceleration (Slowing Down)" : results.accelSI === 0 ? "Constant Speed" : "Positive Acceleration"}
                </div>
              </div>
            </div>

            {/* Motion Animation Timeline Track */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-28 flex items-center">
              <div className="absolute left-4 bottom-2 text-[10px] text-slate-500 font-bold">Start: {results.viDisplay.toFixed(1)} {initialVelUnit}</div>
              <div className="absolute right-4 bottom-2 text-[10px] text-slate-500 font-bold">Finish: {results.vfDisplay.toFixed(1)} {finalVelUnit}</div>
              
              <div className="w-full h-1 bg-slate-800 rounded-full relative">
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

              {/* Instant Speed Readout */}
              <div className="text-xs font-mono text-slate-300">
                Speed: <strong>{currentInstantVelocity.toFixed(2)} {finalVelUnit}</strong> | Elapsed: {currentTime.toFixed(2)}s
              </div>

              {/* Speed control segmented buttons */}
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
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Accel</span>
                <div className="text-xs sm:text-sm font-black text-[#518231] mt-1">{results.aDisplay.toFixed(2)} {accelUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Δ Velocity</span>
                <div className="text-xs sm:text-sm font-black text-amber-400 mt-1">{results.velocityChangeSI.toFixed(2)} m/s</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Distance</span>
                <div className="text-xs sm:text-sm font-black text-emerald-400 mt-1">{results.totalDistanceSI.toFixed(1)} m</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Duration</span>
                <div className="text-xs sm:text-sm font-black text-blue-400 mt-1">{results.tDisplay.toFixed(2)} {timeUnit}</div>
              </div>
            </div>

            {/* Action buttons */}
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
                
                {/* Tab 1: Recharts Kinematic Graphs */}
                {activeTab === "visuals" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Velocity vs. Time Kinematic Graph</h4>
                    <p className="text-xs text-slate-500">Shows velocity changing from {results.viDisplay.toFixed(1)} to {results.vfDisplay.toFixed(1)} {finalVelUnit} over time:</p>
                    
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

                {/* Tab 2: Step-by-step math derivation */}
                {activeTab === "explanation" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-step Solution</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Formula: a = (v_f - v_i) / t</div>
                      <div>2. Knowns: v_i = {results.viSI.toFixed(2)} m/s, v_f = {results.vfSI.toFixed(2)} m/s, t = {results.timeSI.toFixed(2)} s</div>
                      <div>3. Δv = {results.vfSI.toFixed(2)} - {results.viSI.toFixed(2)} = {results.velocityChangeSI.toFixed(2)} m/s</div>
                      <div>4. a = {results.velocityChangeSI.toFixed(2)} / {results.timeSI.toFixed(2)} = {results.accelSI.toFixed(4)} m/s²</div>
                    </div>

                    <div className="bg-[#518231]/5 border border-[#518231]/20 p-4 rounded-2xl flex items-start gap-2 text-xs">
                      <Sparkles size={16} className="text-[#518231] shrink-0 mt-0.5" />
                      <div>
                        <strong>G-Force Value:</strong> An acceleration of {results.accelSI.toFixed(2)} m/s² equals <strong>{results.gForce.toFixed(2)} g</strong> (where 1g = 9.80665 m/s²).
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Real World Presets */}
                {activeTab === "presets" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Real-World Acceleration Presets</h4>
                    <p className="text-xs text-slate-500">Click any preset to load real-world acceleration data directly into the calculator:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                      {REAL_WORLD_PRESETS.map((preset, idx) => {
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
                              <div className="text-[10px] font-bold text-[#518231] mt-1">{preset.accel.toFixed(2)} m/s²</div>
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
