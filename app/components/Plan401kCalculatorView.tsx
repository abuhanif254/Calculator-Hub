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

export const Plan401kCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("Plan401kCalculator");

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(10000);
  const [currentSalary, setCurrentSalary] = useState(75000);
  const [expectedSalaryIncrease, setExpectedSalaryIncrease] = useState(2);
  const [contributionPercent, setContributionPercent] = useState(6);
  const [employerMatchPercent, setEmployerMatchPercent] = useState(50);
  const [employerMatchLimit, setEmployerMatchLimit] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(7);

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
    const years = Math.max(0, retirementAge - currentAge);
    const returnRate = expectedReturn / 100;
    const salaryGrowRate = expectedSalaryIncrease / 100;
    const myContRate = contributionPercent / 100;
    const employerMatchMultiplier = employerMatchPercent / 100;
    const employerMatchCap = employerMatchLimit / 100;

    let balance = currentBalance;
    let salary = currentSalary;
    
    let totalMyContributions = 0;
    let totalEmployerContributions = 0;

    const yearlyData = [];
    
    yearlyData.push({
      age: currentAge,
      salary: salary,
      myContribution: 0,
      employerContribution: 0,
      growth: 0,
      balance: balance
    });

    for (let i = 1; i <= years; i++) {
        const myCont = salary * myContRate;
        const matchablePercent = Math.min(myContRate, employerMatchCap);
        const employerCont = salary * matchablePercent * employerMatchMultiplier;
        
        // Assume contributions are made evenly throughout the year, so they get about half a year's return
        const growth = (balance * returnRate) + ((myCont + employerCont) * (returnRate / 2));
        
        balance += myCont + employerCont + growth;
        totalMyContributions += myCont;
        totalEmployerContributions += employerCont;
        
        yearlyData.push({
            age: currentAge + i,
            salary: salary,
            myContribution: myCont,
            employerContribution: employerCont,
            growth: growth,
            balance: balance
        });
        
        salary = salary * (1 + salaryGrowRate);
    }
    
    const totalGrowth = balance - currentBalance - totalMyContributions - totalEmployerContributions;

    return {
      years,
      finalBalance: balance,
      totalMyContributions,
      totalEmployerContributions,
      totalGrowth,
      yearlyData
    };
  }, [currentAge, retirementAge, currentBalance, currentSalary, expectedSalaryIncrease, contributionPercent, employerMatchPercent, employerMatchLimit, expectedReturn]);

  const chartData = {
    labels: results.yearlyData.map(d => d.age),
    datasets: [
      {
        label: t("projectedBalance") !== "Plan401kCalculator.projectedBalance" ? t("projectedBalance") : "Projected Balance",
        data: results.yearlyData.map(d => d.balance),
        borderColor: "#10b981", // emerald-500
        backgroundColor: "rgba(16, 185, 129, 0.1)", // emerald-500 with opacity
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return " " + formatCurrency(context.raw);
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
            {t("title") !== "Plan401kCalculator.title" ? t("title") : "401(k) Retirement Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "Plan401kCalculator.desc" ? t("desc") : "Estimate your retirement savings based on your salary, contributions, and employer match."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="space-y-6 lg:col-span-4">
            <h3 className="text-md font-semibold text-slate-800 border-b border-slate-100 pb-2">
               {t("personalInfo") !== "Plan401kCalculator.personalInfo" ? t("personalInfo") : "Personal Information"}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col space-y-1.5">
                 <label className="text-sm font-medium text-slate-700">
                   {t("currentAge") !== "Plan401kCalculator.currentAge" ? t("currentAge") : "Current Age"}
                 </label>
                 <input
                   type="number"
                   value={currentAge}
                   min={1}
                   max={100}
                   onChange={(e) => setCurrentAge(Number(e.target.value))}
                   className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                 />
               </div>
               
               <div className="flex flex-col space-y-1.5">
                 <label className="text-sm font-medium text-slate-700">
                   {t("retirementAge") !== "Plan401kCalculator.retirementAge" ? t("retirementAge") : "Retirement Age"}
                 </label>
                 <input
                   type="number"
                   value={retirementAge}
                   min={currentAge + 1}
                   max={100}
                   onChange={(e) => setRetirementAge(Number(e.target.value))}
                   className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                 />
               </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("currentBalance") !== "Plan401kCalculator.currentBalance" ? t("currentBalance") : "Current 401(k) Balance"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={currentBalance}
                  min={0}
                  onChange={(e) => setCurrentBalance(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                <div className="flex flex-col space-y-1.5 col-span-2">
                  <label className="text-sm font-medium text-slate-700">
                    {t("currentSalary") !== "Plan401kCalculator.currentSalary" ? t("currentSalary") : "Current Annual Salary"}
                  </label>
                  <div className="relative">
                    <span className="absolute start-3 top-2 text-slate-500">{cSym}</span>
                    <input
                      type="number"
                      value={currentSalary}
                      min={0}
                      onChange={(e) => setCurrentSalary(Number(e.target.value))}
                      className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 leading-tight">
                    {t("salaryIncrease") !== "Plan401kCalculator.salaryIncrease" ? t("salaryIncrease") : "Annual Salary Increase (%)"}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={expectedSalaryIncrease}
                      onChange={(e) => setExpectedSalaryIncrease(Number(e.target.value))}
                      className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="absolute end-3 top-2 text-slate-500">%</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 leading-tight">
                    {t("expectedReturn") !== "Plan401kCalculator.expectedReturn" ? t("expectedReturn") : "Expected Annual Return (%)"}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="absolute end-3 top-2 text-slate-500">%</span>
                  </div>
                </div>
            </div>

            <h3 className="text-md font-semibold text-slate-800 border-b border-slate-100 pb-2 mt-4">
               {t("contributions") !== "Plan401kCalculator.contributions" ? t("contributions") : "Contributions & Match"}
            </h3>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("yourContribution") !== "Plan401kCalculator.yourContribution" ? t("yourContribution") : "Your Contribution (% of salary)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={contributionPercent}
                  onChange={(e) => setContributionPercent(Number(e.target.value))}
                  className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <span className="absolute end-3 top-2 text-slate-500">%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 leading-tight">
                    {t("employerMatch") !== "Plan401kCalculator.employerMatch" ? t("employerMatch") : "Employer Match (%)"}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      value={employerMatchPercent}
                      onChange={(e) => setEmployerMatchPercent(Number(e.target.value))}
                      className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="absolute end-3 top-2 text-slate-500">%</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 leading-tight">
                    {t("matchLimit") !== "Plan401kCalculator.matchLimit" ? t("matchLimit") : "Match Limit (% of salary)"}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      value={employerMatchLimit}
                      onChange={(e) => setEmployerMatchLimit(Number(e.target.value))}
                      className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="absolute end-3 top-2 text-slate-500">%</span>
                  </div>
                </div>
            </div>
            <p className="text-xs text-slate-500">
               {t("matchHelp") !== "Plan401kCalculator.matchHelp" ? t("matchHelp") : "e.g., Matches 50% of your contributions up to 6% of your salary."}
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col sm:col-span-2 items-center justify-center text-center">
                  <span className="text-emerald-800 font-medium mb-1 uppercase tracking-wide text-sm">
                    {t("estimatedBalance") !== "Plan401kCalculator.estimatedBalance" ? t("estimatedBalance") : "Estimated Balance at Retirement"}
                  </span>
                  <span className="text-4xl sm:text-5xl font-bold text-emerald-900 tracking-tight">
                    {formatCurrency(results.finalBalance)}
                  </span>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-center text-center">
                  <span className="text-slate-600 font-medium mb-1 text-sm">
                    {t("totalContributions") !== "Plan401kCalculator.totalContributions" ? t("totalContributions") : "Total Your Contributions"}
                  </span>
                  <span className="text-2xl font-bold text-slate-800">
                    {formatCurrency(results.totalMyContributions)}
                  </span>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col justify-center text-center">
                  <span className="text-blue-700 font-medium mb-1 text-sm">
                    {t("totalEmployerMatch") !== "Plan401kCalculator.totalEmployerMatch" ? t("totalEmployerMatch") : "Total Employer Match"}
                  </span>
                  <span className="text-2xl font-bold text-blue-900">
                    {formatCurrency(results.totalEmployerContributions)}
                  </span>
                </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1 min-h-[300px] flex flex-col">
              <h3 className="text-sm font-semibold text-slate-700 text-center mb-2">
                {t("growthChart") !== "Plan401kCalculator.growthChart" ? t("growthChart") : "Projected Growth Over Time"}
              </h3>
              <div className="flex-1 relative w-full h-64">
                 <Line data={chartData} options={chartOptions as any} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
