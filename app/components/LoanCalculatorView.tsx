"use client";

import React, { useState } from "react";
import { calculateAmortizedLoan, calculateDeferredLoan, calculateBond } from "../../lib/formulas/loan";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

const COLORS = ['#10b981', '#3b82f6']; // Principal (green-ish), Interest (blue-ish)

const ChartObj = ({ principal, interest, formatCurrency }: { principal: number, interest: number, formatCurrency: (val: number) => string }) => {
  const data = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: interest },
  ];
  return (
     <div className="h-32 w-32 relative">
       <ResponsiveContainer width="100%" height="100%">
         <PieChart>
           <Pie
             data={data}
             cx="50%"
             cy="50%"
             innerRadius={0}
             outerRadius={50}
             fill="#8884d8"
             dataKey="value"
             stroke="none"
           >
             {data.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
             ))}
           </Pie>
           <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value))} />
         </PieChart>
       </ResponsiveContainer>
     </div>
  );
};

export const LoanCalculatorView: React.FC<Props> = () => {
  const { currency, locale } = useSettings();
  const t = useTranslations("LoanCalculator");

  // Amortized State
  const [amAmount, setAmAmount] = useState(100000);
  const [amYears, setAmYears] = useState(10);
  const [amMonths, setAmMonths] = useState(0);
  const [amRate, setAmRate] = useState(6);
  const [amCompound, setAmCompound] = useState("Monthly (APR)");
  const [amPayBack, setAmPayBack] = useState("Every Month");

  // Deferred State
  const [defAmount, setDefAmount] = useState(100000);
  const [defYears, setDefYears] = useState(10);
  const [defMonths, setDefMonths] = useState(0);
  const [defRate, setDefRate] = useState(6);
  const [defCompound, setDefCompound] = useState("Annually (APY)");

  // Bond State
  const [bondAmount, setBondAmount] = useState(100000);
  const [bondYears, setBondYears] = useState(10);
  const [bondMonths, setBondMonths] = useState(0);
  const [bondRate, setBondRate] = useState(6);
  const [bondCompound, setBondCompound] = useState("Annually (APY)");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(val);
  };

  const getCurrencySymbol = () => {
    try {
      const parts = new Intl.NumberFormat(locale, { style: 'currency', currency }).formatToParts(0);
      return parts.find((p) => p.type === 'currency')?.value || '$';
    } catch {
      return '$';
    }
  };
  const cSym = getCurrencySymbol();

  const amResult = calculateAmortizedLoan(amAmount, amYears, amMonths, amRate, amCompound, amPayBack);
  const defResult = calculateDeferredLoan(defAmount, defYears, defMonths, defRate, defCompound);
  const bondResult = calculateBond(bondAmount, bondYears, bondMonths, bondRate, bondCompound);

  return (
    <div className="flex flex-col gap-12 pb-8">
      
      {/* 1. Amortized Loan */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">{t("amortizedTitle")}</h2>
          <p className="text-sm text-slate-500 mt-1">{t("amortizedDesc")}</p>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("loanAmount")}</label>
                <div className="relative w-48">
                  <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                  <input type="number" value={amAmount} onChange={(e) => setAmAmount(Number(e.target.value))} className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("loanTerm")}</label>
                <div className="flex gap-2 w-48">
                  <input type="number" value={amYears} onChange={(e) => setAmYears(Number(e.target.value))} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm" placeholder={t("yearsPlaceholder")} />
                  <input type="number" value={amMonths} onChange={(e) => setAmMonths(Number(e.target.value))} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm" placeholder={t("monthsPlaceholder")} />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("interestRate")}</label>
                <div className="relative w-48">
                  <input type="number" value={amRate} onChange={(e) => setAmRate(Number(e.target.value))} className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                  <span className="absolute end-3 top-2 text-slate-500">%</span>
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("compound")}</label>
                <select value={amCompound} onChange={(e) => setAmCompound(e.target.value)} className="w-48 px-3 py-2 border border-slate-300 rounded-md shadow-sm">
                  <option value="Monthly (APR)">{t("monthlyApr")}</option>
                  <option value="Annually (APY)">{t("annuallyApy")}</option>
                  <option value="Semi-Annually">{t("semiAnnually")}</option>
                  <option value="Quarterly">{t("quarterly")}</option>
                </select>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("payBack")}</label>
                <select value={amPayBack} onChange={(e) => setAmPayBack(e.target.value)} className="w-48 px-3 py-2 border border-slate-300 rounded-md shadow-sm">
                  <option value="Every Month">{t("everyMonth")}</option>
                </select>
             </div>
          </div>
          <div className="bg-green-50/50 border border-green-100 rounded-lg p-6 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-2">
               <span className="text-slate-600 font-medium">{t("paymentEveryMonth")}</span>
               <span className="text-xl font-bold text-slate-900">{formatCurrency(amResult.paymentEveryMonth || 0)}</span>
             </div>
             <div className="flex justify-between items-center mb-2">
               <span className="text-slate-600 font-medium">{t("totalOf")} {(amYears * 12) + amMonths} {t("payments")}</span>
               <span className="text-lg font-bold text-slate-900">{formatCurrency(amResult.totalPayments || 0)}</span>
             </div>
             <div className="flex justify-between items-center mb-6">
               <span className="text-slate-600 font-medium">{t("totalInterest")}</span>
               <span className="text-lg font-bold text-slate-900">{formatCurrency(amResult.totalInterest)}</span>
             </div>
             <div className="flex items-center gap-6">
                <ChartObj principal={amResult.principal} interest={amResult.totalInterest} formatCurrency={formatCurrency} />
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>{t("principal")} {(amResult.principal / (amResult.totalPayments || 1) * 100).toFixed(0)}%</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>{t("interest")} {(amResult.totalInterest / (amResult.totalPayments || 1) * 100).toFixed(0)}%</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Deferred Payment Loan */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">{t("deferredTitle")}</h2>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("loanAmount")}</label>
                <div className="relative w-48">
                  <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                  <input type="number" value={defAmount} onChange={(e) => setDefAmount(Number(e.target.value))} className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("loanTerm")}</label>
                <div className="flex gap-2 w-48">
                  <input type="number" value={defYears} onChange={(e) => setDefYears(Number(e.target.value))} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm" placeholder={t("yearsPlaceholder")} />
                  <input type="number" value={defMonths} onChange={(e) => setDefMonths(Number(e.target.value))} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm" placeholder={t("monthsPlaceholder")} />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("interestRate")}</label>
                <div className="relative w-48">
                  <input type="number" value={defRate} onChange={(e) => setDefRate(Number(e.target.value))} className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                  <span className="absolute end-3 top-2 text-slate-500">%</span>
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("compound")}</label>
                <select value={defCompound} onChange={(e) => setDefCompound(e.target.value)} className="w-48 px-3 py-2 border border-slate-300 rounded-md shadow-sm">
                  <option value="Annually (APY)">{t("annuallyApy")}</option>
                  <option value="Monthly (APR)">{t("monthlyApr")}</option>
                  <option value="Semi-Annually">{t("semiAnnually")}</option>
                  <option value="Quarterly">{t("quarterly")}</option>
                </select>
             </div>
          </div>
          <div className="bg-green-50/50 border border-green-100 rounded-lg p-6 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-2">
               <span className="text-slate-600 font-medium">{t("amountDueAtMaturity")}</span>
               <span className="text-xl font-bold text-slate-900">{formatCurrency(defResult.amountDueAtMaturity || 0)}</span>
             </div>
             <div className="flex justify-between items-center mb-6">
               <span className="text-slate-600 font-medium">{t("totalInterest")}</span>
               <span className="text-lg font-bold text-slate-900">{formatCurrency(defResult.totalInterest)}</span>
             </div>
             <div className="flex items-center gap-6">
                <ChartObj principal={defResult.principal} interest={defResult.totalInterest} formatCurrency={formatCurrency} />
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>{t("principal")} {((defResult.principal / (defResult.amountDueAtMaturity || 1)) * 100).toFixed(0)}%</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>{t("interest")} {((defResult.totalInterest / (defResult.amountDueAtMaturity || 1)) * 100).toFixed(0)}%</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. Bond */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">{t("bondTitle")}</h2>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("predeterminedDueAmount")}</label>
                <div className="relative w-48">
                  <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                  <input type="number" value={bondAmount} onChange={(e) => setBondAmount(Number(e.target.value))} className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("loanTerm")}</label>
                <div className="flex gap-2 w-48">
                  <input type="number" value={bondYears} onChange={(e) => setBondYears(Number(e.target.value))} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm" placeholder={t("yearsPlaceholder")} />
                  <input type="number" value={bondMonths} onChange={(e) => setBondMonths(Number(e.target.value))} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm" placeholder={t("monthsPlaceholder")} />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("interestRate")}</label>
                <div className="relative w-48">
                  <input type="number" value={bondRate} onChange={(e) => setBondRate(Number(e.target.value))} className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                  <span className="absolute end-3 top-2 text-slate-500">%</span>
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("compound")}</label>
                <select value={bondCompound} onChange={(e) => setBondCompound(e.target.value)} className="w-48 px-3 py-2 border border-slate-300 rounded-md shadow-sm">
                  <option value="Annually (APY)">{t("annuallyApy")}</option>
                  <option value="Monthly (APR)">{t("monthlyApr")}</option>
                  <option value="Semi-Annually">{t("semiAnnually")}</option>
                  <option value="Quarterly">{t("quarterly")}</option>
                </select>
             </div>
          </div>
          <div className="bg-green-50/50 border border-green-100 rounded-lg p-6 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-2">
               <span className="text-slate-600 font-medium">{t("amountReceivedAtStart")}</span>
               <span className="text-xl font-bold text-slate-900">{formatCurrency(bondResult.amountReceivedAtStart || 0)}</span>
             </div>
             <div className="flex justify-between items-center mb-6">
               <span className="text-slate-600 font-medium">{t("totalInterest")}</span>
               <span className="text-lg font-bold text-slate-900">{formatCurrency(bondResult.totalInterest)}</span>
             </div>
             <div className="flex items-center gap-6">
                <ChartObj principal={bondResult.principal} interest={bondResult.totalInterest} formatCurrency={formatCurrency} />
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>{t("principal")} {((bondResult.principal / bondAmount) * 100).toFixed(0)}%</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>{t("interest")} {((bondResult.totalInterest / bondAmount) * 100).toFixed(0)}%</div>
                </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};
