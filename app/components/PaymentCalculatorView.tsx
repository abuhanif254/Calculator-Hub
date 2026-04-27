"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";

interface PaymentCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function PaymentCalculatorView({ calcDef }: PaymentCalculatorViewProps) {
  const t = useTranslations("PaymentCalculator");
  
  const [loanAmount, setLoanAmount] = useState<number>(20000);
  const [rate, setRate] = useState<number>(6.5);
  const [term, setTerm] = useState<number>(5);
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");
  
  const [results, setResults] = useState<{ monthlyPayment: number; totalInterest: number; totalPaid: number; } | null>(null);

  const calculate = () => {
    if (loanAmount <= 0) {
      setResults({ monthlyPayment: 0, totalInterest: 0, totalPaid: 0 });
      return;
    }

    const principal = loanAmount;
    const r = rate / 100 / 12;
    const n = termUnit === "years" ? term * 12 : term;
    
    let monthly = 0;
    if (r === 0) {
      monthly = principal / n;
    } else {
      monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPaidSum = monthly * n;
    const totalInterestSum = totalPaidSum - principal;

    setResults({
      monthlyPayment: monthly,
      totalInterest: totalInterestSum,
      totalPaid: totalPaidSum
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
            <label className="text-sm font-semibold text-slate-700">{t("loanAmount")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={loanAmount || ""}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
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
            <label className="text-sm font-semibold text-slate-700">{t("loanTerm")}</label>
            <div className="flex space-x-2">
              <input 
                type="number"
                value={term || ""}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-2/3 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
              <select 
                value={termUnit} 
                onChange={(e) => setTermUnit(e.target.value as "years" | "months")}
                className="w-1/3 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium cursor-pointer"
              >
                <option value="years">{t("years")}</option>
                <option value="months">{t("months")}</option>
              </select>
            </div>
          </div>

          <button onClick={calculate} className="w-full mt-4 h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
            {t("calculateButton")}
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 flex items-center justify-center border border-slate-100">
          {!results ? (
            <div className="text-slate-400 font-medium text-lg text-center">
              Calculate to view your<br/>monthly payment
            </div>
          ) : (
            <div className="w-full space-y-6">
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("monthlyPayment")}</div>
                <div className="text-5xl md:text-6xl font-extrabold text-blue-600">
                  ${results.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="space-y-4 pt-2 text-slate-700">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-slate-500">{t("totalInterest")}</span>
                  <span className="font-bold text-slate-800">${results.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-lg pt-4 border-t border-slate-200">
                  <span className="font-medium text-slate-500">{t("totalPaid")}</span>
                  <span className="font-bold text-slate-800">${results.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
