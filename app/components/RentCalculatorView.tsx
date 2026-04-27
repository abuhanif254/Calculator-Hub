"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Home, DollarSign, PieChart, Info, Building } from "lucide-react";

interface RentCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function RentCalculatorView({ calcDef }: RentCalculatorViewProps) {
  const t = useTranslations("RentCalculator");

  const [income, setIncome] = useState<string>("60000");
  const [frequency, setFrequency] = useState<"yearly" | "monthly">("yearly");
  
  const [monthlyGross, setMonthlyGross] = useState(5000);
  const [recommendedRent, setRecommendedRent] = useState(1500);
  const [maxRentNYC, setMaxRentNYC] = useState(1500);

  useEffect(() => {
    const val = parseFloat(income) || 0;
    const monthly = frequency === "yearly" ? val / 12 : val;
    setMonthlyGross(monthly);
    setRecommendedRent(monthly * 0.30);
    setMaxRentNYC((monthly * 12) / 40);
  }, [income, frequency]);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-sky-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center shadow-inner">
               <Building size={24} strokeWidth={2.5} />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
               <p className="text-sm text-slate-500 font-medium">{t("subtitle")}</p>
            </div>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-10">

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
           
           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("incomeLabel")}</label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/20 transition-all bg-white">
                 <div className="pl-5 flex items-center text-slate-400">
                    <DollarSign size={20} strokeWidth={3} />
                 </div>
                 <input 
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="0"
                    className="flex-1 text-2xl font-bold text-slate-800 p-4 outline-none"
                 />
              </div>
           </div>

           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("incomeFreq")}</label>
              <div className="flex bg-white rounded-2xl border-2 border-slate-200 p-1">
                 <button 
                    onClick={() => setFrequency("yearly")}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm ${frequency === "yearly" ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                 >
                    {t("yearly")}
                 </button>
                 <button 
                    onClick={() => setFrequency("monthly")}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm ${frequency === "monthly" ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                 >
                    {t("monthly")}
                 </button>
              </div>
           </div>
        </div>

        {/* Results Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 text-slate-700/50">
              <Home size={200} strokeWidth={0.5} />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
              <div>
                 <p className="text-sky-300 font-bold uppercase tracking-wider text-sm mb-2">{t("recommendedRent")}</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-medium text-slate-300">$</span>
                    <span className="text-5xl md:text-6xl font-black tracking-tight">{recommendedRent.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    <span className="text-lg font-medium text-slate-400 ml-2">/ mo</span>
                 </div>
                 <p className="mt-4 text-slate-400 text-sm flex items-center gap-2">
                    <Info size={16} /> {t("rule30Desc")}
                 </p>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-5 rounded-2xl">
                 <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-1">{t("maxRent")}</p>
                 <div className="text-2xl font-bold text-white mb-1">${maxRentNYC.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                 <p className="text-xs text-slate-400 max-w-[200px] leading-tight">{t("rule40xDesc")}</p>
              </div>
           </div>
        </div>

        {/* 50/30/20 Breakdown */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <PieChart size={24} className="text-sky-500" /> {t("budgetBreakdown")}
           </h3>
           <p className="text-slate-500">{t("budgetDesc")}</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl border-2 border-emerald-100 bg-emerald-50 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                 <div className="absolute top-0 right-0 w-2 h-full bg-emerald-400"></div>
                 <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">{t("needs")} (50%)</span>
                 <div className="text-3xl font-black text-slate-800 mt-2">${(monthlyGross * 0.50).toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                 <p className="text-sm font-medium text-emerald-700/70 mt-2">{t("needsDesc")}</p>
              </div>
              <div className="p-6 rounded-2xl border-2 border-amber-100 bg-amber-50 relative overflow-hidden group hover:border-amber-200 transition-colors">
                 <div className="absolute top-0 right-0 w-2 h-full bg-amber-400"></div>
                 <span className="text-xs font-black text-amber-600 uppercase tracking-wider">{t("wants")} (30%)</span>
                 <div className="text-3xl font-black text-slate-800 mt-2">${(monthlyGross * 0.30).toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                 <p className="text-sm font-medium text-amber-700/70 mt-2">{t("wantsDesc")}</p>
              </div>
              <div className="p-6 rounded-2xl border-2 border-indigo-100 bg-indigo-50 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                 <div className="absolute top-0 right-0 w-2 h-full bg-indigo-400"></div>
                 <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">{t("savings")} (20%)</span>
                 <div className="text-3xl font-black text-slate-800 mt-2">${(monthlyGross * 0.20).toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                 <p className="text-sm font-medium text-indigo-700/70 mt-2">{t("savingsDesc")}</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
