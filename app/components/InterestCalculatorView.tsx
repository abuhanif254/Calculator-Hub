"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";

interface InterestCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function InterestCalculatorView({ calcDef }: InterestCalculatorViewProps) {
  const t = useTranslations("InterestCalculator");
  
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(10);
  const [timeUnit, setTimeUnit] = useState<"years" | "months">("years");
  const [frequency, setFrequency] = useState<string>("annually");
  
  const [results, setResults] = useState<{ totalPrincipal: number; totalInterest: number; totalBalance: number; } | null>(null);

  const calculate = () => {
    if (principal <= 0) {
      setResults({ totalPrincipal: principal, totalInterest: 0, totalBalance: principal });
      return;
    }

    const r = rate / 100;
    const tInYears = timeUnit === "years" ? time : time / 12;
    
    let a = 0; // Total accumulated amount

    switch (frequency) {
      case "simple":
        a = principal * (1 + r * tInYears);
        break;
      case "annually":
        a = principal * Math.pow(1 + r / 1, 1 * tInYears);
        break;
      case "semiAnnually":
        a = principal * Math.pow(1 + r / 2, 2 * tInYears);
        break;
      case "quarterly":
        a = principal * Math.pow(1 + r / 4, 4 * tInYears);
        break;
      case "monthly":
        a = principal * Math.pow(1 + r / 12, 12 * tInYears);
        break;
      case "daily":
        a = principal * Math.pow(1 + r / 365, 365 * tInYears);
        break;
      case "continuously":
        a = principal * Math.exp(r * tInYears);
        break;
      default:
        a = principal * Math.pow(1 + r / 1, 1 * tInYears);
    }

    const i = a - principal;

    setResults({
      totalPrincipal: principal,
      totalInterest: i,
      totalBalance: a
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("principalAmount")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={principal || ""}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("interestRate")}</label>
            <div className="relative">
              <input 
                type="number"
                step="0.01"
                value={rate || ""}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("timePeriod")}</label>
            <div className="flex space-x-2">
              <input 
                type="number"
                value={time || ""}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-2/3 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
              <select 
                value={timeUnit} 
                onChange={(e) => setTimeUnit(e.target.value as "years" | "months")}
                className="w-1/3 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium cursor-pointer"
              >
                <option value="years">{t("years")}</option>
                <option value="months">{t("months")}</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("compoundFrequency")}</label>
            <select 
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium cursor-pointer"
            >
              <option value="annually">{t("annually")}</option>
              <option value="semiAnnually">{t("semiAnnually")}</option>
              <option value="quarterly">{t("quarterly")}</option>
              <option value="monthly">{t("monthly")}</option>
              <option value="daily">{t("daily")}</option>
              <option value="continuously">{t("continuously")}</option>
              <option value="simple">{t("simpleInterest")}</option>
            </select>
          </div>

          <button onClick={calculate} className="w-full mt-4 h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
            {t("calculateButton")}
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 flex items-center justify-center border border-slate-100">
          {!results ? (
            <div className="text-slate-400 font-medium text-lg text-center">
              Calculate to view your<br/>total interest yield
            </div>
          ) : (
            <div className="w-full space-y-6">
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("totalBalance")}</div>
                <div className="text-5xl md:text-6xl font-extrabold text-blue-600">
                  ${results.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="space-y-4 pt-2 text-slate-700">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-slate-500">{t("totalPrincipal")}</span>
                  <span className="font-bold text-slate-800">${results.totalPrincipal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-lg pt-4 border-t border-slate-200">
                  <span className="font-medium text-slate-500">{t("totalInterest")}</span>
                  <span className="font-bold text-emerald-600">+ ${results.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
