"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { CreditCard, DollarSign, CalendarDays, PieChart, Info, ArrowRight } from "lucide-react";

interface CreditCardsPayoffViewProps {
  calcDef: CalculatorDef;
}

export function CreditCardsPayoffView({ calcDef }: CreditCardsPayoffViewProps) {
  const t = useTranslations("CreditCardsPayoff");

  const [balance, setBalance] = useState<string>("5000");
  const [interestRate, setInterestRate] = useState<string>("19.9");
  const [calcMode, setCalcMode] = useState<"paymo" | "paytime">("paymo");
  
  // For paymo mode
  const [monthlyPayment, setMonthlyPayment] = useState<string>("150");
  // For paytime mode
  const [monthsToPayoff, setMonthsToPayoff] = useState<string>("24");

  const [resultMonths, setResultMonths] = useState<number>(0);
  const [resultPayment, setResultPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const bal = parseFloat(balance) || 0;
    const rate = parseFloat(interestRate) || 0;
    setErrorMsg("");

    if (bal <= 0) {
      setResultMonths(0);
      setResultPayment(0);
      setTotalInterest(0);
      setTotalPaid(0);
      return;
    }

    const unroundedRateMonthly = rate / 100 / 12;

    if (calcMode === "paymo") {
      const pmt = parseFloat(monthlyPayment) || 0;
      
      if (pmt <= bal * unroundedRateMonthly) {
        setErrorMsg(t("errorPaymentTooLow"));
        setResultMonths(0);
        setTotalInterest(0);
        setTotalPaid(0);
        return;
      }
      
      let months = 0;
      if (rate === 0) {
        months = Math.ceil(bal / pmt);
        setResultMonths(months);
        setResultPayment(pmt);
        setTotalInterest(0);
        setTotalPaid(bal);
      } else {
        months = Math.ceil(-Math.log(1 - (unroundedRateMonthly * bal) / pmt) / Math.log(1 + unroundedRateMonthly));
        setResultMonths(months);
        setResultPayment(pmt);
        const total = months * pmt;
        setTotalPaid(total);
        setTotalInterest(total - bal);
      }

    } else {
      const months = parseInt(monthsToPayoff) || 1;
      
      if (rate === 0) {
        const pmt = bal / months;
        setResultMonths(months);
        setResultPayment(pmt);
        setTotalInterest(0);
        setTotalPaid(bal);
      } else {
        const pmt = bal * (unroundedRateMonthly * Math.pow(1 + unroundedRateMonthly, months)) / (Math.pow(1 + unroundedRateMonthly, months) - 1);
        setResultMonths(months);
        setResultPayment(pmt);
        const total = pmt * months;
        setTotalPaid(total);
        setTotalInterest(total - bal);
      }
    }

  }, [balance, interestRate, calcMode, monthlyPayment, monthsToPayoff, t]);

  const years = Math.floor(resultMonths / 12);
  const remainingMonths = resultMonths % 12;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-rose-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center shadow-inner">
               <CreditCard size={24} strokeWidth={2.5} />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
               <p className="text-sm text-slate-500 font-medium">{t("subtitle")}</p>
            </div>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
           
           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("balance")}</label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/20 transition-all bg-white">
                 <div className="pl-5 flex items-center text-slate-400">
                    <DollarSign size={20} strokeWidth={3} />
                 </div>
                 <input 
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="flex-1 text-2xl font-bold text-slate-800 p-4 outline-none w-full"
                 />
              </div>
           </div>

           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("interestRate")}</label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/20 transition-all bg-white">
                 <input 
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="flex-1 text-2xl font-bold text-slate-800 p-4 pl-5 outline-none w-full"
                 />
                 <div className="pr-5 flex items-center text-slate-400 font-bold text-xl">%</div>
              </div>
           </div>

           <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200 mt-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2 mb-3 block">{t("calcGoal")}</label>
              <div className="flex flex-col md:flex-row gap-4">
                 
                 <div className={`flex-1 flex flex-col p-4 rounded-2xl border-2 transition-all cursor-pointer ${calcMode === 'paymo' ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`} onClick={() => setCalcMode("paymo")}>
                    <div className="flex items-center gap-2 mb-3">
                       <input type="radio" checked={calcMode === "paymo"} readOnly className="w-4 h-4 text-rose-600 focus:ring-rose-500" />
                       <span className="font-bold text-slate-700">{t("goalFixedPayment")}</span>
                    </div>
                    {calcMode === 'paymo' && (
                       <div className="relative flex rounded-xl border border-rose-300 overflow-hidden bg-white mt-1">
                          <div className="pl-3 flex items-center text-slate-400">
                             <DollarSign size={16} />
                          </div>
                          <input 
                             type="number"
                             value={monthlyPayment}
                             onChange={(e) => setMonthlyPayment(e.target.value)}
                             className="flex-1 text-lg font-bold text-slate-800 p-2 outline-none w-full"
                             onClick={(e) => e.stopPropagation()}
                          />
                       </div>
                    )}
                 </div>

                 <div className={`flex-1 flex flex-col p-4 rounded-2xl border-2 transition-all cursor-pointer ${calcMode === 'paytime' ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`} onClick={() => setCalcMode("paytime")}>
                    <div className="flex items-center gap-2 mb-3">
                       <input type="radio" checked={calcMode === "paytime"} readOnly className="w-4 h-4 text-rose-600 focus:ring-rose-500" />
                       <span className="font-bold text-slate-700">{t("goalFixedTime")}</span>
                    </div>
                    {calcMode === 'paytime' && (
                       <div className="relative flex rounded-xl border border-rose-300 overflow-hidden bg-white mt-1 group">
                          <input 
                             type="number"
                             value={monthsToPayoff}
                             onChange={(e) => setMonthsToPayoff(e.target.value)}
                             className="flex-1 text-lg font-bold text-slate-800 p-2 pl-3 outline-none w-full"
                             onClick={(e) => e.stopPropagation()}
                          />
                          <div className="pr-3 flex items-center text-slate-400 font-bold text-xs uppercase group-focus-within:text-rose-500">{t("monthsShort")}</div>
                       </div>
                    )}
                 </div>

              </div>
           </div>

        </div>

        {errorMsg ? (
           <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3">
              <Info size={24} className="shrink-0 mt-0.5" />
              <div>
                 <h4 className="font-bold mb-1">Calculation Error</h4>
                 <p>{errorMsg}</p>
              </div>
           </div>
        ) : (
           <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 text-slate-700/50">
                 <PieChart size={250} strokeWidth={0.5} />
              </div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div>
                    <p className="text-rose-300 font-bold uppercase tracking-wider text-sm mb-2">
                       {calcMode === 'paymo' ? t("timeToPayoff") : t("requiredPayment")}
                    </p>
                    
                    {calcMode === 'paymo' ? (
                       <div className="flex items-baseline gap-2 mb-4">
                          {years > 0 && (
                             <>
                                <span className="text-5xl md:text-6xl font-black tracking-tight">{years}</span>
                                <span className="text-xl font-medium text-slate-400">{t("years")}</span>
                             </>
                          )}
                          <span className="text-5xl md:text-6xl font-black tracking-tight">{remainingMonths}</span>
                          <span className="text-xl font-medium text-slate-400">{t("months")}</span>
                       </div>
                    ) : (
                       <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-3xl font-medium text-slate-300">$</span>
                          <span className="text-5xl md:text-6xl font-black tracking-tight">{resultPayment.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                          <span className="text-xl font-medium text-slate-400 ml-2">/ {t("mo")}</span>
                       </div>
                    )}

                    <div className="h-1 w-full bg-slate-700 rounded-full mt-6 mb-6 overflow-hidden flex">
                       <div className="bg-rose-500 h-full" style={{ width: `${(parseFloat(balance) / totalPaid) * 100}%` }}></div>
                       <div className="bg-orange-400 h-full" style={{ width: `${(totalInterest / totalPaid) * 100}%` }}></div>
                    </div>

                 </div>

                 <div className="space-y-4">
                    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-wider">
                          <div className="w-3 h-3 rounded-full bg-rose-500"></div> {t("principal")}
                       </div>
                       <span className="text-xl font-bold text-white">${parseFloat(balance || "0").toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-wider">
                          <div className="w-3 h-3 rounded-full bg-orange-400"></div> {t("totalInterest")}
                       </div>
                       <span className="text-xl font-bold text-white">${totalInterest.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center justify-between mt-2 border-t-2 border-t-slate-600">
                       <div className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-wider">
                           {t("totalPaid")}
                       </div>
                       <span className="text-xl font-bold text-rose-300">${totalPaid.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                    </div>
                 </div>
              </div>
           </div>
        )}

      </div>
    </div>
  );
}
