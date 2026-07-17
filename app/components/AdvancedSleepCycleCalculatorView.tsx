"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "../../lib/types";
import { useTranslations } from "next-intl";
import { Moon, Sun, Clock, User, ArrowRight, Zap, PieChart } from "lucide-react";

export const AdvancedSleepCycleCalculatorView: React.FC<{ calcDef: CalculatorDef }> = ({ calcDef }) => {
  const t = useTranslations("SleepCalculator");

  const [mode, setMode] = useState<"wakeUp" | "goToBed" | "powerNap">("wakeUp");
  const [time, setTime] = useState("07:00");
  const [latency, setLatency] = useState(15);
  const [age, setAge] = useState<string>("adult");

  // Re-calculate when state changes
  const [cycles, setCycles] = useState<{ count: number; date: Date; recommended: boolean; durationMins: number }[]>([]);

  const calculateCycles = () => {
    if (mode === "powerNap") {
       // Power Nap is a static recommendation based on 'now'
       const baseDate = new Date();
       const shortNap = new Date(baseDate.getTime());
       shortNap.setMinutes(shortNap.getMinutes() + latency + 20); // 20 min nap + latency

       const longNap = new Date(baseDate.getTime());
       longNap.setMinutes(longNap.getMinutes() + latency + 90); // 90 min nap + latency
       
       setCycles([
         { count: 0, date: shortNap, recommended: true, durationMins: 20 },
         { count: 1, date: longNap, recommended: true, durationMins: 90 }
       ]);
       return;
    }

    if (!time) return;

    const [hours, minutes] = time.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);

    const generatedCycles = [];
    
    // Determine recommended cycle counts based on age
    let recommendedCycles = [5]; // Default adult (5 cycles = 7.5 hours)
    if (age === "newborn") recommendedCycles = [9, 10, 11]; // ~14-16.5 hrs
    else if (age === "infant") recommendedCycles = [8, 9, 10];
    else if (age === "toddler") recommendedCycles = [7, 8, 9];
    else if (age === "preschool") recommendedCycles = [6, 7, 8];
    else if (age === "school") recommendedCycles = [6, 7];
    else if (age === "teen") recommendedCycles = [5, 6];
    else if (age === "olderAdult") recommendedCycles = [4, 5];

    for (let i = 1; i <= 7; i++) {
      const cycleMins = i * 90;
      const targetDate = new Date(baseDate.getTime());

      if (mode === "wakeUp") {
        // We want to wake up at `baseDate`. We need to go to sleep `cycleMins + latency` BEFORE this time.
        targetDate.setMinutes(targetDate.getMinutes() - cycleMins - latency);
      } else {
        // We are going to bed at `baseDate`. We will wake up `cycleMins + latency` AFTER this time.
        targetDate.setMinutes(targetDate.getMinutes() + cycleMins + latency);
      }

      generatedCycles.push({
        count: i,
        date: targetDate,
        recommended: recommendedCycles.includes(i),
        durationMins: cycleMins
      });
    }

    if (mode === "wakeUp") {
      generatedCycles.reverse();
    }

    setCycles(generatedCycles);
  };

  useEffect(() => {
    calculateCycles();
  }, [mode, time, latency, age]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDurationString = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return t("duration", { hours: h, minutes: m });
  };

  const recommendedCycle = cycles.find(c => c.recommended);
  const avgDurationHours = recommendedCycle ? (recommendedCycle.durationMins / 60).toFixed(1) : "7.5";

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <Moon className="w-6 h-6 text-indigo-500" />
        {t("title")}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t("mode")}</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setMode("wakeUp")}
                className={`flex-1 py-1.5 text-[11px] sm:text-xs font-bold rounded-md transition-all flex flex-col justify-center items-center gap-1 ${mode === "wakeUp" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-900"}`}
              >
                <Sun className="w-4 h-4" />
                {t("wakeUpAt")}
              </button>
              <button 
                onClick={() => setMode("goToBed")}
                className={`flex-1 py-1.5 text-[11px] sm:text-xs font-bold rounded-md transition-all flex flex-col justify-center items-center gap-1 ${mode === "goToBed" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-900"}`}
              >
                <Moon className="w-4 h-4" />
                {t("goToBedAt")}
              </button>
              <button 
                onClick={() => setMode("powerNap")}
                className={`flex-1 py-1.5 text-[11px] sm:text-xs font-bold rounded-md transition-all flex flex-col justify-center items-center gap-1 ${mode === "powerNap" ? "bg-white shadow-sm text-amber-600" : "text-slate-500 hover:text-slate-900"}`}
              >
                <Zap className="w-4 h-4" />
                {t("powerNap")}
              </button>
            </div>
          </div>

          {mode !== "powerNap" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {t("time")}
                </label>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition-shadow" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  {t("ageBracket")}
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-white"
                >
                  <option value="newborn">{t("ageNewborn")}</option>
                  <option value="infant">{t("ageInfant")}</option>
                  <option value="toddler">{t("ageToddler")}</option>
                  <option value="preschool">{t("agePreschool")}</option>
                  <option value="school">{t("ageSchool")}</option>
                  <option value="teen">{t("ageTeen")}</option>
                  <option value="adult">{t("ageAdult")}</option>
                  <option value="olderAdult">{t("ageOlderAdult")}</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t("fallAsleepTime")}</label>
            <input 
              type="number" 
              value={latency}
              onChange={(e) => setLatency(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" 
              min="0"
              max="120"
            />
          </div>

        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner h-full flex flex-col">
            <h3 className="text-lg font-semibold text-slate-700 mb-6">
               {mode === "wakeUp" ? t("resultsTitleGoToBed", { time }) : 
                mode === "goToBed" ? t("resultsTitleWakeUp") : 
                t("napDescTitle")}
            </h3>
            
            <div className="space-y-4 flex-1">
              {cycles.map((cycle, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border transition-all ${cycle.recommended ? (mode === "powerNap" ? 'bg-amber-50 border-amber-200 ring-1 ring-amber-500 shadow-md' : 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500 shadow-md') : 'bg-white border-slate-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-black ${cycle.recommended ? (mode === 'powerNap' ? 'text-amber-700' : 'text-indigo-700') : 'text-slate-800'}`}>
                      {formatTime(cycle.date)}
                    </div>
                    {cycle.recommended && mode !== "powerNap" && (
                      <span className="bg-indigo-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full tracking-wide">
                        {t("recommended")}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 opacity-80">
                    {mode !== "powerNap" ? (
                      <div className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                        {t("cycleCount", { count: cycle.count })}
                      </div>
                    ) : (
                      <div className="text-sm font-bold text-amber-700 uppercase tracking-wide">
                        {cycle.count === 0 ? t("napShort") : t("napLong")}
                      </div>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div className="text-sm text-slate-500">
                      {getDurationString(cycle.durationMins)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mode === "powerNap" && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm">
                  <strong className="text-amber-700 block mb-1">{t("napShort")}</strong>
                  <span className="text-slate-500 leading-relaxed">{t("napShortDesc")}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm">
                  <strong className="text-indigo-700 block mb-1">{t("napLong")}</strong>
                  <span className="text-slate-500 leading-relaxed">{t("napLongDesc")}</span>
                </div>
              </div>
            )}
            
            {mode !== "powerNap" && (
              <div className="mt-8 text-sm text-slate-500 leading-relaxed p-4 bg-white rounded-lg border border-slate-100">
                <strong>Tip:</strong> Waking up in the middle of a sleep cycle causes grogginess. These times are calculated to wake you up precisely at the end of a cycle, factoring in your {latency} minutes of fall-asleep time.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics & Breakdown Section */}
      <div className="mt-8 border-t border-slate-200 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
             <PieChart className="w-5 h-5 text-indigo-500" />
             {t("sleepStageBreakdown")}
           </h3>
           <p className="text-slate-500 text-sm mb-6 leading-relaxed">
             {t("stageDesc", { duration: avgDurationHours })}
           </p>

           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                 <span className="text-sm font-medium text-slate-700">{t("lightSleep")}</span>
               </div>
               <span className="text-sm font-bold text-slate-900">50%</span>
             </div>
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                 <span className="text-sm font-medium text-slate-700">{t("remSleep")}</span>
               </div>
               <span className="text-sm font-bold text-slate-900">25%</span>
             </div>
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-violet-700"></div>
                 <span className="text-sm font-medium text-slate-700">{t("deepSleep")}</span>
               </div>
               <span className="text-sm font-bold text-slate-900">20%</span>
             </div>
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <span className="text-sm font-medium text-slate-700">{t("awake")}</span>
               </div>
               <span className="text-sm font-bold text-slate-900">5%</span>
             </div>
           </div>
        </div>

        <div className="flex items-center justify-center">
           {/* Custom SVG Donut Chart for performance & Zero Dependencies */}
           <svg viewBox="0 0 100 100" className="w-48 h-48 sm:w-56 sm:h-56 transform -rotate-90 drop-shadow-md">
             {/* 
                Circumference = 2 * pi * r = 2 * 3.14159 * 25 = 157.08
                1. Light Sleep (50%) -> dasharray 78.54 157.08, offset 0
                2. REM Sleep (25%) -> dasharray 39.27 157.08, offset -78.54
                3. Deep Sleep (20%) -> dasharray 31.42 157.08, offset -117.81
                4. Awake (5%) -> dasharray 7.85 157.08, offset -149.23
             */}
             
             {/* Light Sleep */}
             <circle cx="50" cy="50" r="25" fill="transparent" stroke="#38bdf8" strokeWidth="14" strokeDasharray="78.54 157.08" strokeDashoffset="0" className="transition-all duration-1000 ease-out" />
             
             {/* REM Sleep */}
             <circle cx="50" cy="50" r="25" fill="transparent" stroke="#6366f1" strokeWidth="14" strokeDasharray="39.27 157.08" strokeDashoffset="-78.54" className="transition-all duration-1000 ease-out delay-100" />
             
             {/* Deep Sleep */}
             <circle cx="50" cy="50" r="25" fill="transparent" stroke="#6d28d9" strokeWidth="14" strokeDasharray="31.42 157.08" strokeDashoffset="-117.81" className="transition-all duration-1000 ease-out delay-200" />

             {/* Awake */}
             <circle cx="50" cy="50" r="25" fill="transparent" stroke="#fbbf24" strokeWidth="14" strokeDasharray="7.85 157.08" strokeDashoffset="-149.23" className="transition-all duration-1000 ease-out delay-300" />
           </svg>
        </div>
      </div>
    </div>
  );
};
