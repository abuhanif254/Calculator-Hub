"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Clock, Hourglass, PlusSquare, MinusSquare, ArrowRightCircle } from "lucide-react";

interface TimeCalculatorViewProps {
  calcDef: CalculatorDef;
}

type Mode = "difference" | "math";

export function TimeCalculatorView({ calcDef }: TimeCalculatorViewProps) {
  const t = useTranslations("TimeCalculator");

  const [mode, setMode] = useState<Mode>("difference");
  
  // Diff State
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  // Math State
  const [opState, setOpState] = useState<"add" | "subtract">("add");
  const [t1d, setT1d] = useState("");
  const [t1h, setT1h] = useState("");
  const [t1m, setT1m] = useState("");
  const [t1s, setT1s] = useState("");

  const [t2d, setT2d] = useState("");
  const [t2h, setT2h] = useState("");
  const [t2m, setT2m] = useState("");
  const [t2s, setT2s] = useState("");

  // Results
  const [errorObj, setErrorObj] = useState("");
  const [resDiff, setResDiff] = useState<{
    hours: number;
    minutes: number;
    totalMinutes: number;
    isCrossMidnight: boolean;
  } | null>(null);
  
  const [resMath, setResMath] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isNegative: boolean;
  } | null>(null);

  const calculateDiff = () => {
    setErrorObj("");
    setResDiff(null);

    if (!startTime || !endTime) {
      setErrorObj(t("errorTimes"));
      return;
    }

    const startParts = startTime.split(":");
    const endParts = endTime.split(":");

    const startMins = (parseInt(startParts[0]) * 60) + parseInt(startParts[1]);
    let endMins = (parseInt(endParts[0]) * 60) + parseInt(endParts[1]);

    let isCrossMidnight = false;
    if (endMins < startMins) {
       endMins += (24 * 60); // add 24 hours of minutes to safely bridge midnight
       isCrossMidnight = true;
    }

    const diffMins = endMins - startMins;
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;

    setResDiff({
       hours,
       minutes,
       totalMinutes: diffMins,
       isCrossMidnight
    });
  };

  const calculateMath = () => {
    setErrorObj("");
    setResMath(null);

    const s1 = (parseInt(t1d) || 0) * 86400 
             + (parseInt(t1h) || 0) * 3600
             + (parseInt(t1m) || 0) * 60
             + (parseInt(t1s) || 0);

    const s2 = (parseInt(t2d) || 0) * 86400 
             + (parseInt(t2h) || 0) * 3600
             + (parseInt(t2m) || 0) * 60
             + (parseInt(t2s) || 0);

    let totalSeconds = 0;
    if (opState === "add") totalSeconds = s1 + s2;
    if (opState === "subtract") totalSeconds = s1 - s2;

    const isNegative = totalSeconds < 0;
    let absoluteSeconds = Math.abs(totalSeconds);

    const days = Math.floor(absoluteSeconds / 86400);
    absoluteSeconds %= 86400;
    const hours = Math.floor(absoluteSeconds / 3600);
    absoluteSeconds %= 3600;
    const minutes = Math.floor(absoluteSeconds / 60);
    const seconds = absoluteSeconds % 60;

    setResMath({ days, hours, minutes, seconds, isNegative });
  };

  const handleCalculate = () => {
     if (mode === "difference") calculateDiff();
     else calculateMath();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center shadow-inner">
          <Clock size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
         
         <div className="bg-slate-100 p-1.5 rounded-2xl w-full max-w-2xl flex relative mb-8">
            <button 
               onClick={() => { setMode("difference"); setErrorObj(""); setResDiff(null); setResMath(null); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "difference" ? "bg-white text-teal-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               <Hourglass size={16} /> {t("modeDiff")}
            </button>
            <button 
               onClick={() => { setMode("math"); setErrorObj(""); setResDiff(null); setResMath(null); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "math" ? "bg-white text-teal-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               <Clock size={16} /> {t("modeMath")}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
            
            {/* Input Form */}
            <div className="space-y-6">
              
              {mode === "difference" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("startTime")}</label>
                    <input 
                      type="time" 
                      value={startTime} 
                      onChange={(e) => setStartTime(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 h-[50px] date-input-picker text-lg" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("endTime")}</label>
                    <input 
                      type="time" 
                      value={endTime} 
                      onChange={(e) => setEndTime(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 h-[50px] date-input-picker text-lg" 
                    />
                  </div>
                </>
              )}

              {mode === "math" && (
                <>
                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl relative overflow-hidden">
                     <span className="absolute top-0 right-0 bg-teal-100 text-teal-700 text-xs font-black px-2 py-1 rounded-bl-lg">1</span>
                     <label className="text-sm font-bold text-slate-800 mb-3 block">{t("firstDuration")}</label>
                     <div className="grid grid-cols-4 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{t("daysShort")}</label>
                          <input type="number" min="0" placeholder="0" value={t1d} onChange={(e)=>setT1d(e.target.value)} className="w-full px-2 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 text-center" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{t("hoursShort")}</label>
                          <input type="number" min="0" placeholder="0" value={t1h} onChange={(e)=>setT1h(e.target.value)} className="w-full px-2 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 text-center" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{t("minsShort")}</label>
                          <input type="number" min="0" placeholder="0" value={t1m} onChange={(e)=>setT1m(e.target.value)} className="w-full px-2 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 text-center" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{t("secsShort")}</label>
                          <input type="number" min="0" placeholder="0" value={t1s} onChange={(e)=>setT1s(e.target.value)} className="w-full px-2 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 text-center" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 px-2">
                     <button onClick={() => setOpState("add")} className={`border rounded-xl p-3 flex justify-center items-center gap-2 font-black transition-all ${opState === "add" ? "bg-teal-50 border-teal-300 text-teal-700 shadow-sm" : "bg-white border-slate-200 text-slate-500"}`}>
                        <PlusSquare size={16} strokeWidth={3} /> {t("add")}
                     </button>
                     <button onClick={() => setOpState("subtract")} className={`border rounded-xl p-3 flex justify-center items-center gap-2 font-black transition-all ${opState === "subtract" ? "bg-rose-50 border-rose-300 text-rose-700 shadow-sm" : "bg-white border-slate-200 text-slate-500"}`}>
                        <MinusSquare size={16} strokeWidth={3} /> {t("subtract")}
                     </button>
                  </div>

                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl relative overflow-hidden">
                     <span className="absolute top-0 right-0 bg-teal-100 text-teal-700 text-xs font-black px-2 py-1 rounded-bl-lg">2</span>
                     <label className="text-sm font-bold text-slate-800 mb-3 block">{t("secondDuration")}</label>
                     <div className="grid grid-cols-4 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{t("daysShort")}</label>
                          <input type="number" min="0" placeholder="0" value={t2d} onChange={(e)=>setT2d(e.target.value)} className="w-full px-2 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 text-center" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{t("hoursShort")}</label>
                          <input type="number" min="0" placeholder="0" value={t2h} onChange={(e)=>setT2h(e.target.value)} className="w-full px-2 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 text-center" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{t("minsShort")}</label>
                          <input type="number" min="0" placeholder="0" value={t2m} onChange={(e)=>setT2m(e.target.value)} className="w-full px-2 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 text-center" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{t("secsShort")}</label>
                          <input type="number" min="0" placeholder="0" value={t2s} onChange={(e)=>setT2s(e.target.value)} className="w-full px-2 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 text-center" />
                        </div>
                     </div>
                  </div>
                </>
              )}

              {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

              <button onClick={handleCalculate} className="w-full py-4 mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2">
                 {t("calculateButton")} <ArrowRightCircle size={18} />
              </button>
            </div>

            {/* RESULTS UI */}
            <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
               {(!resDiff && !resMath) ? (
                 <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                   <Clock size={80} className="mb-4" strokeWidth={1} />
                   <p className="font-medium mt-2">{t("waiting")}</p>
                 </div>
               ) : (
                 <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in duration-300">
                    
                    {/* RESULTS MODE 1: DIFFERENCE */}
                    {resDiff && (
                      <div className="flex flex-col gap-4 h-full">
                         <div className="bg-white border-2 border-teal-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-md flex-1 relative overflow-hidden">
                           {resDiff.isCrossMidnight && (
                             <div className="absolute top-0 w-full bg-indigo-500 text-white text-xs font-bold py-1.5">{t("crossMidnight")}</div>
                           )}
                           <span className={`text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 inline-block ${resDiff.isCrossMidnight ? 'mt-6' : ''}`}>
                             {t("timeElapsed")}
                           </span>
                           <div className="flex flex-wrap justify-center gap-4 text-slate-800">
                              <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-teal-600">{resDiff.hours}</span>
                                <span className="text-sm font-bold text-slate-400">{t("hoursShortLong")}</span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-teal-600">{resDiff.minutes}</span>
                                <span className="text-sm font-bold text-slate-400">{t("minsShortLong")}</span>
                              </div>
                           </div>
                         </div>
                         <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center shadow-sm">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t("totalMinsConverted")}</span>
                            <span className="text-2xl font-black text-slate-700">{resDiff.totalMinutes.toLocaleString()}</span>
                         </div>
                      </div>
                    )}

                    {/* RESULTS MODE 2: MATH */}
                    {resMath && (
                      <div className="bg-white border-2 border-teal-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-md flex-1 relative overflow-hidden">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-50 rounded-full opacity-50 pointer-events-none"></div>
                         
                         <span className="relative z-10 text-sm font-black text-teal-500 uppercase tracking-widest mb-8">
                           {resMath.isNegative ? t("resNegative") : t("resTotalDuration")}
                         </span>
                         
                         <div className="relative z-10 flex flex-wrap justify-center gap-4 text-slate-800 w-full">
                            {resMath.days > 0 && (
                              <div className="flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 min-w-[70px]">
                                <span className="text-4xl font-black">{resMath.isNegative ? `-${resMath.days}` : resMath.days}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase mt-1">{t("daysShort")}</span>
                              </div>
                            )}
                            {(resMath.days > 0 || resMath.hours > 0) && (
                              <div className="flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 min-w-[70px]">
                                <span className="text-4xl font-black">{resMath.isNegative && resMath.days === 0 ? `-${resMath.hours}` : resMath.hours}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase mt-1">{t("hoursShort")}</span>
                              </div>
                            )}
                            <div className="flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 min-w-[70px]">
                               <span className="text-4xl font-black">{resMath.isNegative && resMath.days === 0 && resMath.hours === 0 ? `-${resMath.minutes}` : resMath.minutes}</span>
                               <span className="text-xs font-bold text-slate-400 uppercase mt-1">{t("minsShort")}</span>
                            </div>
                            <div className="flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 min-w-[70px]">
                               <span className="text-4xl font-black">{resMath.isNegative && resMath.days === 0 && resMath.hours === 0 && resMath.minutes === 0 ? `-${resMath.seconds}` : resMath.seconds}</span>
                               <span className="text-xs font-bold text-slate-400 uppercase mt-1">{t("secsShort")}</span>
                            </div>
                         </div>
                      </div>
                    )}
                 </div>
               )}
            </div>

         </div>
      </div>
    </div>
  );
}
