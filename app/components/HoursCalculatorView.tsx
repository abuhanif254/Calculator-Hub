"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Briefcase, Clock, Coffee, CircleDollarSign, ArrowRightCircle } from "lucide-react";

interface HoursCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function HoursCalculatorView({ calcDef }: HoursCalculatorViewProps) {
  const t = useTranslations("HoursCalculator");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakMins, setBreakMins] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const [errorObj, setErrorObj] = useState("");
  const [results, setResults] = useState<{
    totalHours: number;
    totalMinutes: number;
    decimalHours: number;
    grossPay: number | null;
  } | null>(null);

  const calculateHours = () => {
    setErrorObj("");
    setResults(null);

    if (!startTime || !endTime) {
      setErrorObj(t("errorTimes"));
      return;
    }

    const startParts = startTime.split(":");
    const endParts = endTime.split(":");

    const startMins = (parseInt(startParts[0]) * 60) + parseInt(startParts[1]);
    let endMins = (parseInt(endParts[0]) * 60) + parseInt(endParts[1]);

    // Handle cross-midnight calculations
    if (endMins < startMins) {
       endMins += (24 * 60);
    }

    const grossMins = endMins - startMins;
    const breakDeduction = parseInt(breakMins) || 0;

    if (breakDeduction < 0 || breakDeduction >= grossMins) {
       setErrorObj(t("errorBreak"));
       return;
    }

    const netMins = grossMins - breakDeduction;

    const totalHours = Math.floor(netMins / 60);
    const totalMinutes = netMins % 60;
    const decimalHours = +(netMins / 60).toFixed(4);

    let grossPay: number | null = null;
    const rate = parseFloat(hourlyRate);
    if (!isNaN(rate) && rate > 0) {
       grossPay = +(decimalHours * rate).toFixed(2);
    }

    setResults({
      totalHours,
      totalMinutes,
      decimalHours,
      grossPay
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shadow-inner">
          <Briefcase size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-10">
         
         {/* Input Form */}
         <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" /> {t("startTime")}
                 </label>
                 <input 
                   type="time" 
                   value={startTime} 
                   onChange={(e) => setStartTime(e.target.value)} 
                   className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-bold text-slate-700 text-lg date-input-picker" 
                 />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" /> {t("endTime")}
                 </label>
                 <input 
                   type="time" 
                   value={endTime} 
                   onChange={(e) => setEndTime(e.target.value)} 
                   className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-bold text-slate-700 text-lg date-input-picker" 
                 />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Coffee size={16} className="text-slate-400" /> {t("breakMins")}
               </label>
               <div className="relative">
                  <input 
                    type="number" 
                    value={breakMins} 
                    onChange={(e) => setBreakMins(e.target.value)} 
                    placeholder="e.g. 30"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-bold text-slate-700" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 pointer-events-none">
                     {t("minsSymbol")}
                  </span>
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <CircleDollarSign size={16} className="text-slate-400" /> {t("hourlyRate")}
               </label>
               <input 
                 type="number" 
                 value={hourlyRate} 
                 onChange={(e) => setHourlyRate(e.target.value)} 
                 placeholder="0.00"
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-bold text-slate-700" 
               />
            </div>

            {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

            <button onClick={calculateHours} className="w-full py-4 mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2">
               {calcDef.title} <ArrowRightCircle size={18} />
            </button>
         </div>

         {/* Results */}
         <div className="flex-1 flex flex-col bg-slate-50 rounded-2xl border border-slate-200 p-6 min-h-[300px]">
            {!results ? (
              <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                <Briefcase size={80} className="mb-4" strokeWidth={1} />
                <p className="font-medium mt-2 max-w-[200px]">{t("waiting")}</p>
              </div>
            ) : (
              <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in duration-300">
                 
                 <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-md flex-1">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 inline-block">{t("resultTitle")}</span>
                   
                   <div className="flex flex-col items-center gap-1">
                      <div className="flex items-baseline gap-1">
                         <span className="text-5xl font-black text-amber-600">{results.totalHours}</span>
                         <span className="text-sm font-bold text-slate-400 mr-2">{t("hoursLabel")}</span>
                         
                         <span className="text-5xl font-black text-amber-600">{results.totalMinutes}</span>
                         <span className="text-sm font-bold text-slate-400">{t("minsLabel")}</span>
                      </div>
                      <span className="text-2xl font-black text-slate-800 mt-2">{results.decimalHours.toFixed(2)}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{t("decimalHours")}</span>
                   </div>
                 </div>

                 {results.grossPay !== null && (
                   <div className="bg-green-50 border border-green-200 p-5 rounded-2xl flex justify-between items-center shadow-sm">
                      <span className="text-sm font-bold text-green-800 uppercase tracking-wider">{t("grossPay")}</span>
                      <span className="text-2xl font-black text-green-700">
                         {results.grossPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                   </div>
                 )}

              </div>
            )}
         </div>
      </div>
    </div>
  );
}
