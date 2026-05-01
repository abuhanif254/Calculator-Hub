"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface Props {
  calcDef: CalculatorDef;
}

export const MutualFundCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("MutualFundCalculator");

  const [investmentType, setInvestmentType] = useState<"sip" | "lumpsum">("sip");
  const [investmentAmount, setInvestmentAmount] = useState(500); // Monthly SIP or Lumpsum
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [timePeriodYears, setTimePeriodYears] = useState(10);

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
    const p = isNaN(investmentAmount) ? 0 : investmentAmount;
    const rate = isNaN(expectedReturnRate) ? 0 : expectedReturnRate;
    const nYears = Math.min(Math.max(isNaN(timePeriodYears) ? 1 : timePeriodYears, 1), 50); // Ensure reasonable timeframe 1-50

    let totalInvested = 0;
    let expectedAmount = 0;
    let totalWealthGained = 0;
    
    const yearlyData = [];
    const monthlyRate = rate / 100 / 12;
    const totalMonths = nYears * 12;

    yearlyData.push({
      year: 0,
      invested: 0,
      balance: 0
    });

    if (investmentType === "sip") {
        totalInvested = p * totalMonths;
        // SIP Expected Amount = P × ({[1 + i]^n - 1} / i) × (1 + i) where i=r/100/12, n=months
        if(monthlyRate > 0) {
            expectedAmount = p * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
        } else {
            expectedAmount = totalInvested;
        }

        // For chart data creation (by year)
        let runningInvested = 0;
        let runningBalance = 0;
        for (let y = 1; y <= nYears; y++) {
            const monthsInYear = y * 12;
            runningInvested = p * monthsInYear;
            if(monthlyRate > 0) {
               runningBalance = p * ((Math.pow(1 + monthlyRate, monthsInYear) - 1) / monthlyRate) * (1 + monthlyRate);
            } else {
               runningBalance = runningInvested;
            }
            yearlyData.push({
                year: y,
                invested: runningInvested,
                balance: runningBalance
            });
        }
    } else { // lumpsum
        totalInvested = p;
        const annualRate = rate / 100;
        expectedAmount = p * Math.pow(1 + annualRate, nYears);

        // For chart data
        for (let y = 1; y <= nYears; y++) {
            yearlyData.push({
                year: y,
                invested: totalInvested,
                balance: p * Math.pow(1 + annualRate, y)
            });
        }
    }

    totalWealthGained = Math.max(0, expectedAmount - totalInvested);

    return {
      totalInvested,
      expectedAmount,
      totalWealthGained,
      yearlyData,
      nYears
    };
  }, [investmentType, investmentAmount, expectedReturnRate, timePeriodYears]);

  const chartData = {
    labels: results.yearlyData.map(d => `${t("yearLabel") !== "MutualFundCalculator.yearLabel" ? t("yearLabel") : "Year"} ${d.year}`),
    datasets: [
      {
        label: t("investedAmount") !== "MutualFundCalculator.investedAmount" ? t("investedAmount") : "Invested Amount",
        data: results.yearlyData.map(d => d.invested),
        borderColor: "#94a3b8", // slate-400
        backgroundColor: "rgba(148, 163, 184, 0.1)", // slate-400 with opacity
        fill: true,
        tension: 0.4,
      },
      {
        label: t("totalValue") !== "MutualFundCalculator.totalValue" ? t("totalValue") : "Total Value",
        data: results.yearlyData.map(d => d.balance),
        borderColor: "#3b82f6", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)", // blue-500 with opacity
        fill: '-1', // fill to previous dataset
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
            usePointStyle: true,
            boxWidth: 8
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return ` ${context.dataset.label}: ` + formatCurrency(context.raw);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => {
            if (value >= 1000000) {
              return cSym + (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return cSym + (value / 1000).toFixed(0) + 'k';
            }
            return cSym + value;
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "MutualFundCalculator.title" ? t("title") : "Mutual Fund Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "MutualFundCalculator.desc" ? t("desc") : "Calculate SIP and Lumpsum investment returns over time."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="space-y-6 xl:col-span-4">
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${investmentType === "sip" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                onClick={() => setInvestmentType("sip")}
              >
                {t("sipOption") !== "MutualFundCalculator.sipOption" ? t("sipOption") : "SIP (Monthly)"}
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${investmentType === "lumpsum" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                onClick={() => setInvestmentType("lumpsum")}
              >
                {t("lumpsumOption") !== "MutualFundCalculator.lumpsumOption" ? t("lumpsumOption") : "Lumpsum (One-time)"}
              </button>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {investmentType === "sip" ? (t("monthlyInvestment") !== "MutualFundCalculator.monthlyInvestment" ? t("monthlyInvestment") : "Monthly Investment") : (t("totalInvestment") !== "MutualFundCalculator.totalInvestment" ? t("totalInvestment") : "Total Investment")}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={investmentAmount}
                  min={0}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-700">
                  {t("expectedReturnRate") !== "MutualFundCalculator.expectedReturnRate" ? t("expectedReturnRate") : "Expected Return Rate (p.a)"}
                </label>
                <span className="text-sm font-semibold text-blue-700">{expectedReturnRate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={expectedReturnRate}
                onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
              />
               <div className="flex justify-between text-xs text-slate-400 mt-1">
                 <span>1%</span>
                 <span>15%</span>
                 <span>30%</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-700">
                  {t("timePeriod") !== "MutualFundCalculator.timePeriod" ? t("timePeriod") : "Time Period"}
                </label>
                <span className="text-sm font-semibold text-blue-700">{timePeriodYears} {t("yearsLabel") !== "MutualFundCalculator.yearsLabel" ? t("yearsLabel") : "Years"}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={timePeriodYears}
                onChange={(e) => setTimePeriodYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
              />
               <div className="flex justify-between text-xs text-slate-400 mt-1">
                 <span>1 {t("yrLabel") !== "MutualFundCalculator.yrLabel" ? t("yrLabel") : "yr"}</span>
                 <span>50 {t("yrsLabel") !== "MutualFundCalculator.yrsLabel" ? t("yrsLabel") : "yrs"}</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 italic gap-2 flex">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {t("disclaimer") !== "MutualFundCalculator.disclaimer" ? t("disclaimer") : "Mutual fund investments are subject to market risks. Past performance is not indicative of future returns. The calculator provides estimates based on your expected return rate."}
            </p>
          </div>

          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-center text-center">
                  <span className="text-slate-600 font-medium mb-1 text-sm">
                    {t("investedAmount") !== "MutualFundCalculator.investedAmount" ? t("investedAmount") : "Invested Amount"}
                  </span>
                  <span className="text-xl font-bold text-slate-800">
                    {formatCurrency(results.totalInvested)}
                  </span>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col justify-center text-center">
                  <span className="text-emerald-700 font-medium mb-1 text-sm">
                    {t("estReturns") !== "MutualFundCalculator.estReturns" ? t("estReturns") : "Est. Returns"}
                  </span>
                  <span className="text-xl font-bold text-emerald-800">
                    {formatCurrency(results.totalWealthGained)}
                  </span>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col justify-center text-center relative overflow-hidden sm:col-span-3 lg:col-span-1">
                   <div className="absolute top-0 w-full h-1 bg-blue-500 left-0"></div>
                  <span className="text-blue-800 font-medium mb-1 text-sm uppercase tracking-wider">
                    {t("totalValue") !== "MutualFundCalculator.totalValue" ? t("totalValue") : "Total Value"}
                  </span>
                  <span className="text-3xl font-bold text-blue-900 tracking-tight">
                    {formatCurrency(results.expectedAmount)}
                  </span>
                </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1 min-h-[350px] flex flex-col">
              <h3 className="text-sm font-semibold text-slate-700 mb-2 px-2">
                {t("chartTitle") !== "MutualFundCalculator.chartTitle" ? t("chartTitle") : "Investment Growth"}
              </h3>
              <div className="flex-1 relative w-full h-64 px-2 pb-2">
                 <Line data={chartData} options={chartOptions as any} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
