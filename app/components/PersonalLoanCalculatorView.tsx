"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface Props {
  calcDef: CalculatorDef;
}

export const PersonalLoanCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("PersonalLoanCalculator");

  const [loanAmount, setLoanAmount] = useState(15000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [loanTerm, setLoanTerm] = useState(36);
  const [termType, setTermType] = useState<"years" | "months">("months");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(val);
  };

  const getCurrencySymbol = () => {
    try {
      const parts = new Intl.NumberFormat(locale, { style: "currency", currency }).formatToParts(0);
      return parts.find((p) => p.type === "currency")?.value || "$";
    } catch {
      return "$";
    }
  };
  const cSym = getCurrencySymbol();

  const results = useMemo(() => {
    const p = loanAmount;
    const r = (interestRate / 100) / 12;
    const n = termType === "years" ? loanTerm * 12 : loanTerm;

    let monthlyPayment = 0;
    if (r === 0) {
      monthlyPayment = n > 0 ? p / n : 0;
    } else {
      monthlyPayment = n > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
    }

    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - p;
    
    // Amortization schedule
    const schedule = [];
    let balance = p;
    let accumulatedInterest = 0;
    
    // Only generate schedule if term is reasonable to prevent performance issues
    if (n <= 360 && n > 0) {
      for (let month = 1; month <= n; month++) {
        const interestPayment = Math.max(0, balance * r);
        let principalPayment = monthlyPayment - interestPayment;
        
        // Handle last month rounding
        if (month === n) {
          principalPayment = balance;
          monthlyPayment = principalPayment + interestPayment;
        }

        balance -= principalPayment;
        accumulatedInterest += interestPayment;
        
        schedule.push({
          month,
          payment: principalPayment + interestPayment,
          principalPayment,
          interestPayment,
          totalInterest: accumulatedInterest,
          balance: Math.max(0, balance)
        });
      }
    }

    return {
      monthlyPayment,
      totalInterest,
      totalPaid,
      schedule
    };
  }, [loanAmount, interestRate, loanTerm, termType]);

  const chartData = {
    labels: [
      t("principal") !== "PersonalLoanCalculator.principal" ? t("principal") : "Principal", 
      t("totalInterest") !== "PersonalLoanCalculator.totalInterest" ? t("totalInterest") : "Total Interest"
    ],
    datasets: [
      {
        data: [loanAmount, results.totalInterest > 0 ? results.totalInterest : 0],
        backgroundColor: ["#10b981", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return " " + formatCurrency(context.raw);
          }
        }
      }
    },
  };

  return (
    <div className="flex flex-col gap-12 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "PersonalLoanCalculator.title" ? t("title") : "Personal Loan Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "PersonalLoanCalculator.desc" ? t("desc") : "Estimate monthly payments and total interest for personal loans."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {t("loanAmount") !== "PersonalLoanCalculator.loanAmount" ? t("loanAmount") : "Loan Amount"}
                </label>
                <div className="relative">
                  <span className="absolute start-3 top-2.5 text-slate-500 font-medium">{cSym}</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full ps-7 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {t("interestRate") !== "PersonalLoanCalculator.interestRate" ? t("interestRate") : "Interest Rate (APR %)"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pe-8 ps-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                  />
                  <span className="absolute end-3 top-2.5 text-slate-500">%</span>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {t("loanTerm") !== "PersonalLoanCalculator.loanTerm" ? t("loanTerm") : "Loan Term"}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={loanTerm}
                    min={1}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-2/3 px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                  />
                  <select
                    value={termType}
                    onChange={(e) => setTermType(e.target.value as "years"|"months")}
                    className="w-1/3 px-2 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                  >
                    <option value="years">{t("years") !== "PersonalLoanCalculator.years" ? t("years") : "Years"}</option>
                    <option value="months">{t("months") !== "PersonalLoanCalculator.months" ? t("months") : "Months"}</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h3 className="text-sm font-semibold text-slate-800 mb-2">{t("summaryTitle") !== "PersonalLoanCalculator.summaryTitle" ? t("summaryTitle") : "Payment Summary"}</h3>
               <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 text-sm">{t("principal") !== "PersonalLoanCalculator.principal" ? t("principal") : "Principal"}:</span>
                    <span className="font-medium">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 text-sm">{t("totalInterest") !== "PersonalLoanCalculator.totalInterest" ? t("totalInterest") : "Total Interest"}:</span>
                    <span className="font-medium text-amber-600">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 mt-1 pt-2">
                    <span className="text-slate-800 font-medium text-sm">{t("totalCost") !== "PersonalLoanCalculator.totalCost" ? t("totalCost") : "Total Cost of Loan"}:</span>
                    <span className="font-bold text-slate-900">{formatCurrency(results.totalPaid)}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[240px]">
              <span className="text-emerald-800 font-medium mb-2 uppercase tracking-wider text-sm">
                {t("monthlyPayment") !== "PersonalLoanCalculator.monthlyPayment" ? t("monthlyPayment") : "Estimated Monthly Payment"}
              </span>
              <span className="text-5xl md:text-6xl font-bold text-emerald-900 tracking-tight">
                {formatCurrency(results.monthlyPayment)}
              </span>
            </div>
            
            <div className="h-64 flex justify-center mt-4">
               <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {results.schedule.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl font-bold text-slate-800">
              {t("amortizationSchedule") !== "PersonalLoanCalculator.amortizationSchedule" ? t("amortizationSchedule") : "Amortization Schedule"}
            </h2>
          </div>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 shadow-sm">
                <tr>
                  <th className="px-6 py-3 font-medium">{t("monthShort") !== "PersonalLoanCalculator.monthShort" ? t("monthShort") : "Month"}</th>
                  <th className="px-6 py-3 font-medium text-right">{t("payment") !== "PersonalLoanCalculator.payment" ? t("payment") : "Payment"}</th>
                  <th className="px-6 py-3 font-medium text-right">{t("principalCol") !== "PersonalLoanCalculator.principalCol" ? t("principalCol") : "Principal"}</th>
                  <th className="px-6 py-3 font-medium text-right">{t("interestCol") !== "PersonalLoanCalculator.interestCol" ? t("interestCol") : "Interest"}</th>
                  <th className="px-6 py-3 font-medium text-right">{t("balanceCol") !== "PersonalLoanCalculator.balanceCol" ? t("balanceCol") : "Remaining Balance"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.schedule.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-slate-900">{row.month}</td>
                    <td className="px-6 py-3 text-right font-medium text-slate-700">{formatCurrency(row.payment)}</td>
                    <td className="px-6 py-3 text-right text-slate-700">{formatCurrency(row.principalPayment)}</td>
                    <td className="px-6 py-3 text-right text-amber-600/80">{formatCurrency(row.interestPayment)}</td>
                    <td className="px-6 py-3 text-right font-medium text-slate-900">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
