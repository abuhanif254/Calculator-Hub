"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { ShieldCheck, DollarSign, CalendarHeart, Info, TrendingUp, Presentation } from "lucide-react";

interface SocialSecurityCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function SocialSecurityCalculatorView({ calcDef }: SocialSecurityCalculatorViewProps) {
  const t = useTranslations("SocialSecurityCalculator");

  const [currentAge, setCurrentAge] = useState<string>("35");
  const [retireAge, setRetireAge] = useState<string>("67");
  const [annualIncome, setAnnualIncome] = useState<string>("75000");
  
  const [estimatedBenefit, setEstimatedBenefit] = useState<number>(0);
  const [fraBenefit, setFraBenefit] = useState<number>(0);

  useEffect(() => {
    const age = parseInt(currentAge) || 35;
    const rAge = parseInt(retireAge) || 67;
    const income = parseFloat(annualIncome) || 0;

    // A simplified PIA calculation (2024 Bend Points used for estimation)
    // Note: Actual SS calculation indexes all past earnings. This is a naive projection assuming constant relative income.
    const maxTaxable = 168600; 
    const cappedIncome = Math.min(income, maxTaxable);
    
    // Average Indexed Monthly Earnings (AIME) approximation
    const aime = cappedIncome / 12;

    // Bend points for PIA calculation
    const bend1 = 1174;
    const bend2 = 7078;
    
    let pia = 0;
    if (aime <= bend1) {
       pia = aime * 0.90;
    } else if (aime <= bend2) {
       pia = (bend1 * 0.90) + ((aime - bend1) * 0.32);
    } else {
       pia = (bend1 * 0.90) + ((bend2 - bend1) * 0.32) + ((aime - bend2) * 0.15);
    }

    setFraBenefit(pia);

    // Full Retirement Age (FRA) assumed 67 for modern birth years
    let finalBenefit = pia;

    if (rAge < 67) {
       const monthsEarly = (67 - rAge) * 12;
       // Reduced 5/9 of 1% per month for first 36 months, then 5/12 of 1%
       const penaltyPerMonth1 = (5/9) / 100;
       const penaltyPerMonth2 = (5/12) / 100;
       
       let totalPenalty = 0;
       if (monthsEarly <= 36) {
          totalPenalty = monthsEarly * penaltyPerMonth1;
       } else {
          totalPenalty = (36 * penaltyPerMonth1) + ((monthsEarly - 36) * penaltyPerMonth2);
       }
       finalBenefit = pia * (1 - totalPenalty);
    } 
    else if (rAge > 67) {
       const monthsLate = (rAge - 67) * 12;
       const maxMonthsLate = 36; // Capped at 70 (3 years * 12)
       const applicableLate = Math.min(monthsLate, maxMonthsLate);
       
       // Delayed retirement credits: 2/3 of 1% per month (~8% per year)
       const bonusPerMonth = (2/3) / 100;
       finalBenefit = pia * (1 + (applicableLate * bonusPerMonth));
    }

    setEstimatedBenefit(Math.max(0, finalBenefit));

  }, [currentAge, retireAge, annualIncome]);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-indigo-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
               <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
               <p className="text-sm text-slate-500 font-medium">{t("subtitle")}</p>
            </div>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-10">

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
           
           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("currentAge")}</label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all bg-white">
                 <input 
                    type="number"
                    min="18"
                    max="70"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    className="flex-1 text-2xl font-bold text-slate-800 p-4 outline-none w-full"
                 />
              </div>
           </div>

           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("currentIncome")}</label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all bg-white">
                 <div className="pl-4 flex items-center text-slate-400">
                    <DollarSign size={20} strokeWidth={3} />
                 </div>
                 <input 
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    className="flex-1 text-2xl font-bold text-slate-800 p-4 pl-2 outline-none w-full"
                 />
              </div>
           </div>

           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("retireAge")}</label>
               <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all bg-white">
                 <input 
                    type="number"
                    min="62"
                    max="70"
                    value={retireAge}
                    onChange={(e) => setRetireAge(e.target.value)}
                    className="flex-1 text-2xl font-bold text-slate-800 p-4 outline-none w-full"
                 />
              </div>
              <span className="text-xs text-slate-400 px-2 font-medium bg-slate-100 rounded-md py-1 mt-1 inline-block">Min: 62 | Max: 70</span>
           </div>

        </div>

        {/* Results Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 text-indigo-400/20">
              <Presentation size={250} strokeWidth={1} />
           </div>
           
           <div className="relative z-10 flex flex-col items-center text-center">
               <p className="text-indigo-300 font-bold uppercase tracking-wider text-sm mb-2">{t("estimatedBenefit")}</p>
               <div className="flex items-baseline justify-center gap-1 mb-6">
                  <span className="text-4xl font-medium text-slate-300">$</span>
                  <span className="text-5xl md:text-7xl font-black tracking-tight">{estimatedBenefit.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  <span className="text-xl font-medium text-slate-400 ml-2">/ {t("month")}</span>
               </div>
               
               <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl justify-center mt-6">
                  <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex-1 flex flex-col items-center text-center">
                     <span className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-1">Age 62 (Early)</span>
                     <span className="text-xl font-bold text-white mb-1">${(fraBenefit * 0.70).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                     <span className="text-xs text-slate-400">~30% Penalty</span>
                  </div>
                  <div className="bg-indigo-800/80 backdrop-blur-sm border border-indigo-600 p-4 rounded-2xl flex-1 flex flex-col items-center text-center">
                     <span className="text-indigo-200 font-bold uppercase tracking-wider text-xs mb-1">Age 67 (FRA)</span>
                     <span className="text-xl font-bold text-white mb-1">${fraBenefit.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                     <span className="text-xs text-indigo-300">100% Base Rate</span>
                  </div>
                  <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex-1 flex flex-col items-center text-center">
                     <span className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-1">Age 70 (Delayed)</span>
                     <span className="text-xl font-bold text-white mb-1">${(fraBenefit * 1.24).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                     <span className="text-xs text-slate-400">~24% Bonus</span>
                  </div>
               </div>
           </div>
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex gap-4">
              <CalendarHeart className="text-indigo-500 shrink-0 mt-1" />
              <div>
                 <h4 className="font-bold text-slate-800 mb-1">{t("fraTitle")}</h4>
                 <p className="text-sm text-slate-600">{t("fraMsg")}</p>
              </div>
           </div>
           
           <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex gap-4">
              <TrendingUp className="text-indigo-500 shrink-0 mt-1" />
              <div>
                 <h4 className="font-bold text-slate-800 mb-1">{t("delayTitle")}</h4>
                 <p className="text-sm text-slate-600">{t("delayMsg")}</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
