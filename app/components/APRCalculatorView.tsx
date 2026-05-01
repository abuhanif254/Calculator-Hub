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

export const APRCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("APRCalculator");

  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [loanTerm, setLoanTerm] = useState(30);
  const [termType, setTermType] = useState<"years" | "months">("years");
  const [upfrontFees, setUpfrontFees] = useState(2500);

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
    
    // APR Calculation via Newton-Raphson method for IRR
    const targetValue = p - upfrontFees;
    let trueAPR = 0;

    if (n > 0 && targetValue > 0 && monthlyPayment > 0) {
       // Function to calculate PV of payments given rate rate per period 'rate'
       const calcPV = (rate: number) => {
         if (rate === 0) return monthlyPayment * n;
         return monthlyPayment * ((1 - Math.pow(1 + rate, -n)) / rate);
       };
       
       let guessRate = r;
       let prevRate = r;
       let tolerance = 0.000001;
       let maxIterations = 100;
       
       for (let i = 0; i < maxIterations; i++) {
         const pv = calcPV(guessRate);
         const diff = targetValue - pv;
         
         if (Math.abs(diff) < tolerance) {
           break;
         }
         
         // Derivative of PV with respect to rate
         const pvDeriv = (monthlyPayment / (guessRate * guessRate)) * (n * guessRate * Math.pow(1 + guessRate, -n - 1) + Math.pow(1 + guessRate, -n) - 1);
         
         guessRate = guessRate - (diff / pvDeriv);
         
         if (guessRate <= 0) {
            guessRate = 0.0001; // Avoid negative rates diverging
         }
       }
       
       trueAPR = guessRate * 12 * 100;
    }

    return {
      monthlyPayment,
      totalInterest,
      totalPaid,
      trueAPR
    };
  }, [loanAmount, interestRate, loanTerm, termType, upfrontFees]);

  const chartData = {
    labels: [
      t("principal") !== "APRCalculator.principal" ? t("principal") : "Net Loan Amount", 
      t("totalInterest") !== "APRCalculator.totalInterest" ? t("totalInterest") : "Total Interest",
      t("upfrontFees") !== "APRCalculator.upfrontFees" ? t("upfrontFees") : "Upfront Fees"
    ],
    datasets: [
      {
        data: [Math.max(0, loanAmount - upfrontFees), Math.max(0, results.totalInterest), upfrontFees],
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
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
            {t("title") !== "APRCalculator.title" ? t("title") : "APR Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "APRCalculator.desc" ? t("desc") : "Calculate the Annual Percentage Rate to discover the true cost of a loan."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {t("loanAmount") !== "APRCalculator.loanAmount" ? t("loanAmount") : "Loan Amount"}
                </label>
                <div className="relative">
                  <span className="absolute start-3 top-2.5 text-slate-500 font-medium">{cSym}</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full ps-7 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {t("interestRate") !== "APRCalculator.interestRate" ? t("interestRate") : "Stated Interest Rate (%)"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pe-8 ps-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  />
                  <span className="absolute end-3 top-2.5 text-slate-500">%</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {t("upfrontFeesLabel") !== "APRCalculator.upfrontFeesLabel" ? t("upfrontFeesLabel") : "Total Upfront Fees"}
                </label>
                <div className="relative">
                  <span className="absolute start-3 top-2.5 text-slate-500 font-medium">{cSym}</span>
                  <input
                    type="number"
                    value={upfrontFees}
                    onChange={(e) => setUpfrontFees(Number(e.target.value))}
                    className="w-full ps-7 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
                <span className="text-xs text-slate-500 ml-1">{t("upfrontFeesHelp") !== "APRCalculator.upfrontFeesHelp" ? t("upfrontFeesHelp") : "Origination fees, closing costs, administrative fees, etc."}</span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {t("loanTerm") !== "APRCalculator.loanTerm" ? t("loanTerm") : "Loan Term"}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={loanTerm}
                    min={1}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-2/3 px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  />
                  <select
                    value={termType}
                    onChange={(e) => setTermType(e.target.value as "years"|"months")}
                    className="w-1/3 px-2 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="years">{t("years") !== "APRCalculator.years" ? t("years") : "Years"}</option>
                    <option value="months">{t("months") !== "APRCalculator.months" ? t("months") : "Months"}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                 <span className="text-blue-800 font-medium mb-1 tracking-wider text-sm">
                   {t("trueApr") !== "APRCalculator.trueApr" ? t("trueApr") : "True APR"}
                 </span>
                 <span className="text-4xl font-bold text-blue-900 tracking-tight">
                   {results.trueAPR.toFixed(3)}%
                 </span>
                 {results.trueAPR > interestRate && (
                   <span className="text-xs text-blue-600 mt-2">
                     {(results.trueAPR - interestRate).toFixed(3)}% higher than stated rate
                   </span>
                 )}
               </div>
               
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                 <span className="text-slate-600 font-medium mb-1 tracking-wider text-sm">
                   {t("monthlyPayment") !== "APRCalculator.monthlyPayment" ? t("monthlyPayment") : "Monthly Payment"}
                 </span>
                 <span className="text-3xl font-bold text-slate-800 tracking-tight">
                   {formatCurrency(results.monthlyPayment)}
                 </span>
               </div>
               
               <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                 <span className="text-emerald-700 font-medium mb-1 tracking-wider text-sm">
                   {t("netReceived") !== "APRCalculator.netReceived" ? t("netReceived") : "Net Amount Received"}
                 </span>
                 <span className="text-2xl font-bold text-emerald-800 tracking-tight">
                   {formatCurrency(loanAmount - upfrontFees)}
                 </span>
               </div>
               
               <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                 <span className="text-amber-700 font-medium mb-1 tracking-wider text-sm">
                   {t("totalCost") !== "APRCalculator.totalCost" ? t("totalCost") : "Total Cost (Interest + Fees)"}
                 </span>
                 <span className="text-2xl font-bold text-amber-800 tracking-tight">
                   {formatCurrency(results.totalInterest + upfrontFees)}
                 </span>
               </div>
            </div>
            
            <div className="h-64 flex justify-center mt-6">
               <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
