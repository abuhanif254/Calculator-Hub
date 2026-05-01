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

export const HELOCCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("HELOCCalculator");

  const [creditLimit, setCreditLimit] = useState(100000);
  const [initialDraw, setInitialDraw] = useState(50000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [drawPeriod, setDrawPeriod] = useState(10);
  const [repaymentPeriod, setRepaymentPeriod] = useState(20);

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
    const rate = (interestRate / 100) / 12;
    // Draw period calculations (interest only)
    const drawPeriodPayment = initialDraw * rate;
    const totalDrawPeriodInterest = drawPeriodPayment * drawPeriod * 12;

    // Repayment period calculations (principal + interest)
    const repaymentMonths = repaymentPeriod * 12;
    let repaymentPeriodPayment = 0;
    
    if (rate === 0) {
      repaymentPeriodPayment = repaymentMonths > 0 ? initialDraw / repaymentMonths : 0;
    } else {
      repaymentPeriodPayment = repaymentMonths > 0 ? (initialDraw * rate * Math.pow(1 + rate, repaymentMonths)) / (Math.pow(1 + rate, repaymentMonths) - 1) : 0;
    }
    
    const totalRepaymentPeriodCost = repaymentPeriodPayment * repaymentMonths;
    const totalRepaymentPeriodInterest = totalRepaymentPeriodCost - initialDraw;
    
    const totalInterest = totalDrawPeriodInterest + totalRepaymentPeriodInterest;
    const totalLifetimeCost = initialDraw + totalInterest;

    return {
      drawPeriodPayment,
      totalDrawPeriodInterest,
      repaymentPeriodPayment,
      totalRepaymentPeriodInterest,
      totalInterest,
      totalLifetimeCost
    };
  }, [initialDraw, interestRate, drawPeriod, repaymentPeriod]);

  const chartData = {
    labels: [
      t("principal") !== "HELOCCalculator.principal" ? t("principal") : "Principal (Amount Drawn)", 
      t("drawInterest") !== "HELOCCalculator.drawInterest" ? t("drawInterest") : "Draw Period Interest",
      t("repaymentInterest") !== "HELOCCalculator.repaymentInterest" ? t("repaymentInterest") : "Repayment Period Interest"
    ],
    datasets: [
      {
        data: [initialDraw, results.totalDrawPeriodInterest, results.totalRepaymentPeriodInterest],
        backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
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
            {t("title") !== "HELOCCalculator.title" ? t("title") : "HELOC Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "HELOCCalculator.desc" ? t("desc") : "Calculate your estimated Home Equity Line of Credit payments during the draw and repayment periods."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5 hidden">
                <label className="text-sm font-medium text-slate-700">Credit Limit</label>
                <div className="relative">
                  <span className="absolute start-3 top-2.5 text-slate-500 font-medium">{cSym}</span>
                  <input
                    type="number"
                    value={creditLimit}
                    onChange={(e) => setCreditLimit(Number(e.target.value))}
                    className="w-full ps-7 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    {t("initialDraw") !== "HELOCCalculator.initialDraw" ? t("initialDraw") : "Drawn Amount"}
                  </label>
                  <span className="text-sm text-slate-500">{t("available") !== "HELOCCalculator.available" ? t("available") : "Available Limit"}: {formatCurrency(creditLimit - initialDraw)}</span>
                </div>
                <div className="relative">
                  <span className="absolute start-3 top-2.5 text-slate-500 font-medium">{cSym}</span>
                  <input
                    type="number"
                    value={initialDraw}
                    max={creditLimit}
                    onChange={(e) => setInitialDraw(Number(e.target.value))}
                    className="w-full ps-7 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {t("interestRate") !== "HELOCCalculator.interestRate" ? t("interestRate") : "Interest Rate (%)"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pe-8 ps-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  />
                  <span className="absolute end-3 top-2.5 text-slate-500">%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 break-words">
                    {t("drawPeriod") !== "HELOCCalculator.drawPeriod" ? t("drawPeriod") : "Draw Period"}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={drawPeriod}
                      onChange={(e) => setDrawPeriod(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                    />
                    <span className="absolute text-slate-500 text-sm right-3 top-3">{t("years") !== "HELOCCalculator.years" ? t("years") : "yrs"}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 break-words">
                    {t("repaymentPeriod") !== "HELOCCalculator.repaymentPeriod" ? t("repaymentPeriod") : "Repayment Period"}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={repaymentPeriod}
                      onChange={(e) => setRepaymentPeriod(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                    />
                    <span className="absolute text-slate-500 text-sm right-3 top-3">{t("years") !== "HELOCCalculator.years" ? t("years") : "yrs"}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h3 className="text-sm font-semibold text-slate-800 mb-2">{t("summaryTitle") !== "HELOCCalculator.summaryTitle" ? t("summaryTitle") : "HELOC Summary"}</h3>
               <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 text-sm">{t("totalInterest") !== "HELOCCalculator.totalInterest" ? t("totalInterest") : "Total Interest"}:</span>
                    <span className="font-medium">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 mt-1 pt-2">
                    <span className="text-slate-800 font-medium text-sm">{t("totalCost") !== "HELOCCalculator.totalCost" ? t("totalCost") : "Total Lifetime Cost"}:</span>
                    <span className="font-bold text-slate-900">{formatCurrency(results.totalLifetimeCost)}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <span className="text-blue-800 font-medium mb-1 uppercase tracking-wider text-sm flex flex-col">
                  <span>{t("drawPeriodPayment") !== "HELOCCalculator.drawPeriodPayment" ? t("drawPeriodPayment") : "Draw Period Payment"}</span>
                  <span className="text-xs opacity-75 capitalize font-normal">({t("interestOnly") !== "HELOCCalculator.interestOnly" ? t("interestOnly") : "Interest Only"})</span>
                </span>
                <span className="text-4xl font-bold text-blue-900 tracking-tight mt-1">
                  {formatCurrency(results.drawPeriodPayment)}
                </span>
                <span className="text-xs text-blue-600/80 mt-2">
                  {drawPeriod} {t("yearsLong") !== "HELOCCalculator.yearsLong" ? t("yearsLong") : "years"}
                </span>
              </div>
              
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <span className="text-emerald-800 font-medium mb-1 uppercase tracking-wider text-sm flex flex-col">
                  <span>{t("repaymentPayment") !== "HELOCCalculator.repaymentPayment" ? t("repaymentPayment") : "Repayment Payment"}</span>
                  <span className="text-xs opacity-75 capitalize font-normal">({t("principalAndInterest") !== "HELOCCalculator.principalAndInterest" ? t("principalAndInterest") : "Principal & Interest"})</span>
                </span>
                <span className="text-4xl font-bold text-emerald-900 tracking-tight mt-1">
                  {formatCurrency(results.repaymentPeriodPayment)}
                </span>
                <span className="text-xs text-emerald-600/80 mt-2">
                  {repaymentPeriod} {t("yearsLong") !== "HELOCCalculator.yearsLong" ? t("yearsLong") : "years"}
                </span>
              </div>
            </div>
            
            <div className="h-64 flex justify-center mt-4">
               <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
