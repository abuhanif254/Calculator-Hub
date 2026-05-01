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

export const BudgetCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("BudgetCalculator");

  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  
  // Expenses categories
  const [housing, setHousing] = useState(1500);
  const [transportation, setTransportation] = useState(400);
  const [food, setFood] = useState(600);
  const [utilities, setUtilities] = useState(300);
  const [insurance, setInsurance] = useState(250);
  const [health, setHealth] = useState(200);
  const [savings, setSavings] = useState(500);
  const [personal, setPersonal] = useState(400);
  const [debt, setDebt] = useState(300);

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

  const totalExpenses = housing + transportation + food + utilities + insurance + health + savings + personal + debt;
  const balance = monthlyIncome - totalExpenses;
  
  const isDeficit = balance < 0;

  // 50/30/20 Rule Calculation
  // Needs: Housing, Transportation, Food, Utilities, Insurance, Health, Debt
  const needsActual = housing + transportation + food + utilities + insurance + health + debt;
  // Wants: Personal
  const wantsActual = personal;
  // Savings: Savings
  const savingsActual = savings;

  const targetNeeds = monthlyIncome * 0.5;
  const targetWants = monthlyIncome * 0.3;
  const targetSavings = monthlyIncome * 0.2;

  const chartData = {
    labels: [
      t("housing") !== "BudgetCalculator.housing" ? t("housing") : "Housing",
      t("transportation") !== "BudgetCalculator.transportation" ? t("transportation") : "Transportation",
      t("food") !== "BudgetCalculator.food" ? t("food") : "Food",
      t("utilities") !== "BudgetCalculator.utilities" ? t("utilities") : "Utilities",
      t("insurance") !== "BudgetCalculator.insurance" ? t("insurance") : "Insurance",
      t("health") !== "BudgetCalculator.health" ? t("health") : "Health",
      t("savings") !== "BudgetCalculator.savings" ? t("savings") : "Savings",
      t("personal") !== "BudgetCalculator.personal" ? t("personal") : "Personal",
      t("debt") !== "BudgetCalculator.debt" ? t("debt") : "Debt Payoff"
    ],
    datasets: [
      {
        data: [housing, transportation, food, utilities, insurance, health, savings, personal, debt],
        backgroundColor: [
          "#3b82f6", // blue
          "#8b5cf6", // purple
          "#ec4899", // pink
          "#f43f5e", // rose
          "#f97316", // orange
          "#eab308", // yellow
          "#10b981", // emerald
          "#14b8a6", // teal
          "#64748b"  // slate
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return " " + formatCurrency(context.raw) + " (" + ((context.raw / totalExpenses) * 100).toFixed(1) + "%)";
          }
        }
      }
    },
  };

  const expenseInputs = [
    { label: t("housing") !== "BudgetCalculator.housing" ? t("housing") : "Housing (Rent/Mortgage)", value: housing, setter: setHousing },
    { label: t("food") !== "BudgetCalculator.food" ? t("food") : "Food & Groceries", value: food, setter: setFood },
    { label: t("transportation") !== "BudgetCalculator.transportation" ? t("transportation") : "Transportation", value: transportation, setter: setTransportation },
    { label: t("utilities") !== "BudgetCalculator.utilities" ? t("utilities") : "Utilities", value: utilities, setter: setUtilities },
    { label: t("insurance") !== "BudgetCalculator.insurance" ? t("insurance") : "Insurance", value: insurance, setter: setInsurance },
    { label: t("health") !== "BudgetCalculator.health" ? t("health") : "Health Care", value: health, setter: setHealth },
    { label: t("debt") !== "BudgetCalculator.debt" ? t("debt") : "Debt Repayment", value: debt, setter: setDebt },
    { label: t("personal") !== "BudgetCalculator.personal" ? t("personal") : "Personal / Entertainment", value: personal, setter: setPersonal },
    { label: t("savings") !== "BudgetCalculator.savings" ? t("savings") : "Savings & Investments", value: savings, setter: setSavings },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "BudgetCalculator.title" ? t("title") : "Monthly Budget Planner"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "BudgetCalculator.desc" ? t("desc") : "Track your income and expenses, and follow the 50/30/20 rule to meet financial goals."}
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Input Section */}
            <div>
              <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100 mb-6">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  {t("monthlyIncome") !== "BudgetCalculator.monthlyIncome" ? t("monthlyIncome") : "Total Monthly Income (After Tax)"}
                </label>
                <div className="relative">
                  <span className="absolute start-3 top-3 text-slate-500 font-medium">{cSym}</span>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full ps-8 pe-4 py-3 text-lg font-bold text-blue-900 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  />
                </div>
              </div>

              <h3 className="text-md font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                {t("monthlyExpenses") !== "BudgetCalculator.monthlyExpenses" ? t("monthlyExpenses") : "Monthly Expenses"}
              </h3>
              
              <div className="space-y-3">
                {expenseInputs.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-slate-700 w-1/2">
                      {item.label}
                    </label>
                    <div className="relative w-1/2">
                      <span className="absolute start-3 top-2 text-slate-400">{cSym}</span>
                      <input
                        type="number"
                        min="0"
                        value={item.value || ""}
                        onChange={(e) => item.setter(Number(e.target.value))}
                        className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Section */}
            <div className="flex flex-col gap-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-center text-center">
                  <span className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wide">
                    {t("totalExpensesSummary") !== "BudgetCalculator.totalExpensesSummary" ? t("totalExpensesSummary") : "Total Expenses"}
                  </span>
                  <span className="text-2xl font-bold text-slate-800">
                    {formatCurrency(totalExpenses)}
                  </span>
                </div>
                
                <div className={`border rounded-xl p-4 flex flex-col justify-center text-center ${isDeficit ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
                  <span className={`text-sm font-medium mb-1 uppercase tracking-wide ${isDeficit ? 'text-red-600' : 'text-emerald-700'}`}>
                    {t("leftOver") !== "BudgetCalculator.leftOver" ? t("leftOver") : "Left Over"}
                  </span>
                  <span className={`text-2xl font-bold ${isDeficit ? 'text-red-700' : 'text-emerald-800'}`}>
                    {formatCurrency(balance)}
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1 min-h-[250px] flex flex-col">
                <h3 className="text-sm font-semibold text-slate-700 text-center mb-2">
                  {t("expenseBreakdown") !== "BudgetCalculator.expenseBreakdown" ? t("expenseBreakdown") : "Expense Breakdown"}
                </h3>
                <div className="flex-1 relative w-full h-48">
                  {totalExpenses > 0 ? (
                    <Pie data={chartData} options={chartOptions} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm text-center px-4">
                      {t("noExpenses") !== "BudgetCalculator.noExpenses" ? t("noExpenses") : "Enter expenses to see your breakdown chart."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 50/30/20 Rule Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-800">
            {t("ruleTitle") !== "BudgetCalculator.ruleTitle" ? t("ruleTitle") : "The 50/30/20 Rule Analysis"}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Needs */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex justify-between items-end mb-3">
                <h4 className="text-md font-bold text-slate-800">
                  {t("needs") !== "BudgetCalculator.needs" ? t("needs") : "Needs (50%)"}
                </h4>
                <div className="text-right">
                  <span className="block text-sm text-slate-500">{t("target") !== "BudgetCalculator.target" ? t("target") : "Target"}: {formatCurrency(targetNeeds)}</span>
                </div>
              </div>
              <div className="mb-2">
                <span className={`text-xl font-bold ${needsActual > targetNeeds ? 'text-red-500' : 'text-slate-900'}`}>
                  {formatCurrency(needsActual)}
                </span>
                <span className="text-sm text-slate-500 ml-2">
                  ({((needsActual / (monthlyIncome || 1)) * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${needsActual > targetNeeds ? 'bg-red-500' : 'bg-blue-500'}`} 
                  style={{ width: `${Math.min(100, (needsActual / (monthlyIncome || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Wants */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex justify-between items-end mb-3">
                <h4 className="text-md font-bold text-slate-800">
                  {t("wants") !== "BudgetCalculator.wants" ? t("wants") : "Wants (30%)"}
                </h4>
                <div className="text-right">
                  <span className="block text-sm text-slate-500">{t("target") !== "BudgetCalculator.target" ? t("target") : "Target"}: {formatCurrency(targetWants)}</span>
                </div>
              </div>
              <div className="mb-2">
                <span className={`text-xl font-bold ${wantsActual > targetWants ? 'text-amber-500' : 'text-slate-900'}`}>
                  {formatCurrency(wantsActual)}
                </span>
                <span className="text-sm text-slate-500 ml-2">
                  ({((wantsActual / (monthlyIncome || 1)) * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${wantsActual > targetWants ? 'bg-amber-500' : 'bg-purple-500'}`} 
                  style={{ width: `${Math.min(100, (wantsActual / (monthlyIncome || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Savings */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex justify-between items-end mb-3">
                <h4 className="text-md font-bold text-slate-800">
                  {t("savingsGoal") !== "BudgetCalculator.savingsGoal" ? t("savingsGoal") : "Savings (20%)"}
                </h4>
                <div className="text-right">
                  <span className="block text-sm text-slate-500">{t("target") !== "BudgetCalculator.target" ? t("target") : "Target"}: {formatCurrency(targetSavings)}</span>
                </div>
              </div>
              <div className="mb-2">
                <span className={`text-xl font-bold ${savingsActual < targetSavings ? 'text-amber-500' : 'text-emerald-600'}`}>
                  {formatCurrency(savingsActual)}
                </span>
                <span className="text-sm text-slate-500 ml-2">
                  ({((savingsActual / (monthlyIncome || 1)) * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${savingsActual < targetSavings ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${Math.min(100, (savingsActual / (monthlyIncome || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
};
