"use client";

import React, { useState } from "react";
import { calculateAmortizedLoan } from "../../lib/formulas/loan";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

const COLORS = ['#10b981', '#3b82f6'];

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

export const StudentLoanCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("StudentLoanCalculator");

  const [amAmount, setAmAmount] = useState(30000);
  const [amYears, setAmYears] = useState(10);
  const [amMonths, setAmMonths] = useState(0);
  const [amRate, setAmRate] = useState(5.5);

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

  // Student loans usually compound monthly and are paid monthly
  const amCompound = "Monthly (APR)";
  const amPayBack = "Every Month";
  
  const amResult = calculateAmortizedLoan(amAmount, amYears, amMonths, amRate, amCompound, amPayBack);

  return (
    <div className="flex flex-col gap-12 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">{t("title") !== "StudentLoanCalculator.title" ? t("title") : "Student Loan Repayment"}</h2>
          <p className="text-sm text-slate-500 mt-1">{t("desc") !== "StudentLoanCalculator.desc" ? t("desc") : "Estimate your monthly payments and total interest for a student loan."}</p>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("loanAmount") !== "StudentLoanCalculator.loanAmount" ? t("loanAmount") : "Loan Amount"}</label>
                <div className="relative w-48">
                  <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                  <input type="number" value={amAmount} onChange={(e) => setAmAmount(Number(e.target.value))} className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("loanTerm") !== "StudentLoanCalculator.loanTerm" ? t("loanTerm") : "Loan Term"}</label>
                <div className="flex gap-2 w-48">
                  <input type="number" value={amYears} onChange={(e) => setAmYears(Number(e.target.value))} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm" placeholder="Years" title="Years" />
                  <input type="number" value={amMonths} onChange={(e) => setAmMonths(Number(e.target.value))} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md shadow-sm" placeholder="Months" title="Months" />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{t("interestRate") !== "StudentLoanCalculator.interestRate" ? t("interestRate") : "Interest Rate"}</label>
                <div className="relative w-48">
                  <input type="number" step="0.1" value={amRate} onChange={(e) => setAmRate(Number(e.target.value))} className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                  <span className="absolute end-3 top-2 text-slate-500">%</span>
                </div>
             </div>
          </div>
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-6 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-2">
               <span className="text-slate-600 font-medium">{t("monthlyPayment") !== "StudentLoanCalculator.monthlyPayment" ? t("monthlyPayment") : "Monthly Payment"}</span>
               <span className="text-xl font-bold text-slate-900">{formatCurrency(amResult.paymentEveryMonth || 0)}</span>
             </div>
             <div className="flex justify-between items-center mb-2">
               <span className="text-slate-600 font-medium">{t("totalPayments") !== "StudentLoanCalculator.totalPayments" ? t("totalPayments") : "Total Payments"}</span>
               <span className="text-lg font-bold text-slate-900">{formatCurrency(amResult.totalPayments || 0)}</span>
             </div>
             <div className="flex justify-between items-center mb-6">
               <span className="text-slate-600 font-medium">{t("totalInterest") !== "StudentLoanCalculator.totalInterest" ? t("totalInterest") : "Total Interest"}</span>
               <span className="text-lg font-bold text-slate-900">{formatCurrency(amResult.totalInterest)}</span>
             </div>
             <div className="flex items-center gap-6">
                <ChartObj principal={amResult.principal} interest={amResult.totalInterest} formatCurrency={formatCurrency} />
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>{t("principal") !== "StudentLoanCalculator.principal" ? t("principal") : "Principal"} {(amResult.principal / (amResult.totalPayments || 1) * 100).toFixed(0)}%</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>{t("interest") !== "StudentLoanCalculator.interest" ? t("interest") : "Interest"} {(amResult.totalInterest / (amResult.totalPayments || 1) * 100).toFixed(0)}%</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
