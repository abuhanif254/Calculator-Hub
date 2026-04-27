"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { CalendarDays, CalendarPlus, PlusSquare, MinusSquare, ArrowRightCircle } from "lucide-react";

interface DateCalculatorViewProps {
  calcDef: CalculatorDef;
}

type Mode = "duration" | "addSubtract";

export function DateCalculatorView({ calcDef }: DateCalculatorViewProps) {
  const t = useTranslations("DateCalculator");

  const [mode, setMode] = useState<Mode>("duration");
  
  // Duration State
  const [startDateStr, setStartDateStr] = useState("");
  const [endDateStr, setEndDateStr] = useState("");
  const [includeEndDay, setIncludeEndDay] = useState(false);
  
  // Add/Subtract State
  const [baseDateStr, setBaseDateStr] = useState("");
  const [opState, setOpState] = useState<"add" | "subtract">("add");
  const [opYears, setOpYears] = useState("");
  const [opMonths, setOpMonths] = useState("");
  const [opWeeks, setOpWeeks] = useState("");
  const [opDays, setOpDays] = useState("");

  // Results
  const [errorObj, setErrorObj] = useState("");
  const [resDuration, setResDuration] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
  } | null>(null);
  
  const [resDate, setResDate] = useState<Date | null>(null);

  const calculateDuration = () => {
    setErrorObj("");
    setResDuration(null);

    if (!startDateStr || !endDateStr) {
      setErrorObj(t("errorDates"));
      return;
    }

    const start = new Date(startDateStr + "T00:00:00Z");
    let end = new Date(endDateStr + "T00:00:00Z");

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setErrorObj(t("errorDates"));
      return;
    }

    // Always ensure start is chronologically before end for math logic
    const isNegative = end.getTime() < start.getTime();
    const d1 = isNegative ? end : start;
    let d2 = isNegative ? start : end;

    if (includeEndDay) {
       d2 = new Date(d2.getTime() + 86400000);
    }

    const totalDays = Math.floor((d2.getTime() - d1.getTime()) / 86400000);
    const totalWeeks = totalDays / 7;

    let years = d2.getUTCFullYear() - d1.getUTCFullYear();
    let months = d2.getUTCMonth() - d1.getUTCMonth();
    let days = d2.getUTCDate() - d1.getUTCDate();

    if (days < 0) {
       months -= 1;
       const daysInPrevMonth = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), 0).getDate();
       days += daysInPrevMonth;
    }
    if (months < 0) {
       years -= 1;
       months += 12;
    }

    setResDuration({
       years, months, days, totalDays, totalWeeks
    });
  };

  const calculateAddSubtract = () => {
    setErrorObj("");
    setResDate(null);

    if (!baseDateStr) {
      setErrorObj(t("errorDates"));
      return;
    }

    const d = new Date(baseDateStr + "T00:00:00Z");
    if (isNaN(d.getTime())) {
      setErrorObj(t("errorDates"));
      return;
    }

    const y = parseInt(opYears) || 0;
    const m = parseInt(opMonths) || 0;
    const w = parseInt(opWeeks) || 0;
    const dx = parseInt(opDays) || 0;

    const mod = opState === "add" ? 1 : -1;
    
    // JS Date perfectly handles month overflow/underflow automatically
    d.setUTCFullYear(d.getUTCFullYear() + (y * mod));
    d.setUTCMonth(d.getUTCMonth() + (m * mod));
    
    // Add weeks and days together
    const exactDays = (w * 7) + dx;
    d.setUTCDate(d.getUTCDate() + (exactDays * mod));

    setResDate(new Date(d.getTime()));
  };

  const handleCalculate = () => {
     if (mode === "duration") calculateDuration();
     else calculateAddSubtract();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center shadow-inner">
          <CalendarDays size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
         
         {/* Mode Selector */}
         <div className="bg-slate-100 p-1.5 rounded-2xl w-full max-w-2xl flex relative mb-8">
            <button 
               onClick={() => { setMode("duration"); setErrorObj(""); setResDuration(null); setResDate(null); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "duration" ? "bg-white text-sky-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               <CalendarDays size={16} /> {t("modeDuration")}
            </button>
            <button 
               onClick={() => { setMode("addSubtract"); setErrorObj(""); setResDuration(null); setResDate(null); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "addSubtract" ? "bg-white text-sky-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               <CalendarPlus size={16} /> {t("modeAddSub")}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
            
            {/* Input Form */}
            <div className="space-y-6">
              
              {mode === "duration" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("startDate")}</label>
                    <input 
                      type="date" 
                      value={startDateStr} 
                      onChange={(e) => setStartDateStr(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-bold text-slate-700 h-[50px] date-input-picker" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("endDate")}</label>
                    <input 
                      type="date" 
                      value={endDateStr} 
                      onChange={(e) => setEndDateStr(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-bold text-slate-700 h-[50px] date-input-picker" 
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                    <input 
                       type="checkbox" 
                       id="incEnd" 
                       checked={includeEndDay} 
                       onChange={(e) => setIncludeEndDay(e.target.checked)}
                       className="w-5 h-5 text-sky-600 rounded bg-white border-slate-300 focus:ring-sky-500"
                    />
                    <label htmlFor="incEnd" className="text-sm font-medium text-slate-700 select-none cursor-pointer">
                      {t("includeEndDay")}
                    </label>
                  </div>
                </>
              )}

              {mode === "addSubtract" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("baseDate")}</label>
                    <input 
                      type="date" 
                      value={baseDateStr} 
                      onChange={(e) => setBaseDateStr(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-bold text-slate-700 h-[50px] date-input-picker" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                     <button onClick={() => setOpState("add")} className={`border rounded-xl p-3 flex justify-center items-center gap-2 font-bold transition-all ${opState === "add" ? "bg-sky-50 border-sky-300 text-sky-700" : "bg-white border-slate-200 text-slate-500"}`}>
                        <PlusSquare size={16} /> {t("add")}
                     </button>
                     <button onClick={() => setOpState("subtract")} className={`border rounded-xl p-3 flex justify-center items-center gap-2 font-bold transition-all ${opState === "subtract" ? "bg-rose-50 border-rose-300 text-rose-700" : "bg-white border-slate-200 text-slate-500"}`}>
                        <MinusSquare size={16} /> {t("subtract")}
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                     <div className="flex flex-col gap-1">
                       <label className="text-xs font-semibold text-slate-500 ml-1">{t("years")}</label>
                       <input type="number" min="0" placeholder="0" value={opYears} onChange={(e) => setOpYears(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-bold text-slate-700 text-center text-lg" />
                     </div>
                     <div className="flex flex-col gap-1">
                       <label className="text-xs font-semibold text-slate-500 ml-1">{t("months")}</label>
                       <input type="number" min="0" placeholder="0" value={opMonths} onChange={(e) => setOpMonths(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-bold text-slate-700 text-center text-lg" />
                     </div>
                     <div className="flex flex-col gap-1">
                       <label className="text-xs font-semibold text-slate-500 ml-1">{t("weeks")}</label>
                       <input type="number" min="0" placeholder="0" value={opWeeks} onChange={(e) => setOpWeeks(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-bold text-slate-700 text-center text-lg" />
                     </div>
                     <div className="flex flex-col gap-1">
                       <label className="text-xs font-semibold text-slate-500 ml-1">{t("days")}</label>
                       <input type="number" min="0" placeholder="0" value={opDays} onChange={(e) => setOpDays(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-bold text-slate-700 text-center text-lg" />
                     </div>
                  </div>
                </>
              )}

              {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

              <button onClick={handleCalculate} className="w-full py-4 mt-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2">
                 {t("calculateButton")} <ArrowRightCircle size={18} />
              </button>
            </div>

            {/* RESULTS UI */}
            <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
               {(!resDuration && !resDate) ? (
                 <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                   <CalendarDays size={80} className="mb-4" strokeWidth={1} />
                   <p className="font-medium mt-2">{t("waiting")}</p>
                 </div>
               ) : (
                 <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in duration-300">
                    
                    {/* RESULTS MODE 1: DURATION */}
                    {resDuration && (
                      <div className="flex flex-col gap-4 h-full">
                         <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-md flex-1">
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 inline-block">{t("resExactDuration")}</span>
                           <div className="flex flex-wrap justify-center gap-4 text-slate-800">
                              {resDuration.years > 0 && (
                                <div className="flex items-baseline gap-1"><span className="text-4xl font-black">{resDuration.years}</span><span className="text-sm font-bold text-slate-400">{t("resYears")}</span></div>
                              )}
                              {resDuration.months > 0 && (
                                <div className="flex items-baseline gap-1"><span className="text-4xl font-black">{resDuration.months}</span><span className="text-sm font-bold text-slate-400">{t("resMonths")}</span></div>
                              )}
                              {(resDuration.years === 0 && resDuration.months === 0) || resDuration.days > 0 ? (
                                <div className="flex items-baseline gap-1"><span className="text-4xl font-black">{resDuration.days}</span><span className="text-sm font-bold text-slate-400">{t("resDays")}</span></div>
                              ) : null}
                           </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col items-center shadow-sm">
                               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t("resTotalDays")}</span>
                               <span className="text-2xl font-black text-sky-600">{resDuration.totalDays.toLocaleString()}</span>
                            </div>
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col items-center shadow-sm">
                               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t("resTotalWeeks")}</span>
                               <span className="text-2xl font-black text-slate-700">{resDuration.totalWeeks.toFixed(2)}</span>
                            </div>
                         </div>
                      </div>
                    )}

                    {/* RESULTS MODE 2: ADD / SUBTRACT */}
                    {resDate && (
                      <div className="bg-white border-2 border-sky-200 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden h-full">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-50 rounded-full opacity-50 pointer-events-none"></div>
                         <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50 pointer-events-none"></div>
                         
                         <h3 className="relative z-10 text-sm font-bold text-sky-500 uppercase tracking-widest mb-4">
                           {t("resTargetDate")}
                         </h3>
                         <span className="relative z-10 text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                           {formatDate(resDate)}
                         </span>
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
