"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Wallet, Plus, Trash2, ArrowRight, Banknote, CreditCard, Home, Briefcase, BadgePercent, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DebtToIncomeRatioCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function DebtToIncomeRatioCalculatorView({ calcDef }: DebtToIncomeRatioCalculatorViewProps) {
  // Income Sources
  const [incomes, setIncomes] = useState<{ id: string; name: string; amount: string }[]>([
    { id: "inc-1", name: "Primary Salary (Gross)", amount: "5000" },
  ]);

  // Debt Sources
  const [debts, setDebts] = useState<{ id: string; name: string; amount: string; icon: any }[]>([
    { id: "debt-1", name: "Mortgage / Rent", amount: "1200", icon: Home },
    { id: "debt-2", name: "Auto Loan", amount: "350", icon: Banknote },
    { id: "debt-3", name: "Credit Cards (Min)", amount: "150", icon: CreditCard },
  ]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [dtiRatio, setDtiRatio] = useState(0);

  useEffect(() => {
    const incSum = incomes.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    const debtSum = debts.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    
    setTotalIncome(incSum);
    setTotalDebt(debtSum);
    
    if (incSum > 0) {
      setDtiRatio((debtSum / incSum) * 100);
    } else {
      setDtiRatio(0);
    }
  }, [incomes, debts]);

  const updateIncome = (id: string, field: "name" | "amount", value: string) => {
    setIncomes(incomes.map(inc => inc.id === id ? { ...inc, [field]: value } : inc));
  };

  const addIncome = () => {
    setIncomes([...incomes, { id: `inc-${Date.now()}`, name: "Other Income", amount: "0" }]);
  };

  const removeIncome = (id: string) => {
    if (incomes.length > 1) {
      setIncomes(incomes.filter(inc => inc.id !== id));
    }
  };

  const updateDebt = (id: string, field: "name" | "amount", value: string) => {
    setDebts(debts.map(debt => debt.id === id ? { ...debt, [field]: value } : debt));
  };

  const addDebt = () => {
    setDebts([...debts, { id: `debt-${Date.now()}`, name: "Other Debt", amount: "0", icon: Banknote }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const getStatusColor = (ratio: number) => {
    if (ratio <= 35) return "text-emerald-500";
    if (ratio <= 43) return "text-blue-500";
    if (ratio <= 49) return "text-amber-500";
    return "text-red-500";
  };

  const getBgColor = (ratio: number) => {
    if (ratio <= 35) return "bg-emerald-500";
    if (ratio <= 43) return "bg-blue-500";
    if (ratio <= 49) return "bg-amber-500";
    return "bg-red-500";
  };

  const getStatusText = (ratio: number) => {
    if (ratio === 0) return { label: "N/A", desc: "Please enter your income & debts." };
    if (ratio <= 35) return { label: "Excellent", desc: "You have a very healthy balance of debt to income." };
    if (ratio <= 43) return { label: "Good", desc: "Most lenders consider this an acceptable ratio for mortgages." };
    if (ratio <= 49) return { label: "High Risk", desc: "You may have difficulty getting new loans approved." };
    return { label: "Critical", desc: "A significant portion of your income goes to debt." };
  };

  const status = getStatusText(dtiRatio);

  const chartData = [
    { name: "Debt", value: totalDebt, color: "#f43f5e" }, // Rose
    { name: "Remaining Income", value: Math.max(0, totalIncome - totalDebt), color: "#10b981" } // Emerald
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
            <BadgePercent size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Analyze your borrowing capacity</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 space-y-8">
            {/* Income Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Briefcase size={20} className="text-emerald-500" />
                  Monthly Gross Income
                </h3>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">Before Taxes</span>
              </div>
              
              <div className="space-y-3">
                {incomes.map((inc, i) => (
                  <div key={inc.id} className="flex gap-3 items-center">
                    <input 
                      type="text" 
                      value={inc.name}
                      onChange={(e) => updateIncome(inc.id, "name", e.target.value)}
                      className="flex-1 h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                      placeholder="Income Source"
                    />
                    <div className="relative w-1/3">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input 
                        type="number"
                        min="0"
                        value={inc.amount}
                        onChange={(e) => updateIncome(inc.id, "amount", e.target.value)}
                        className="w-full h-12 pl-7 pr-3 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500"
                        placeholder="0"
                      />
                    </div>
                    <button
                      onClick={() => removeIncome(inc.id)}
                      disabled={incomes.length === 1}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                        incomes.length === 1 ? "text-slate-300 cursor-not-allowed" : "text-red-400 hover:bg-red-50"
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addIncome}
                className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:text-emerald-700 transition-colors"
              >
                <Plus size={16} /> Add Income Source
              </button>
            </div>

            {/* Divider */}
            <hr className="border-slate-100" />

            {/* Debts Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <CreditCard size={20} className="text-rose-500" />
                  Monthly Debt Payments
                </h3>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">Minimums</span>
              </div>
              
              <div className="space-y-3">
                {debts.map((debt, i) => {
                  const Icon = debt.icon;
                  return (
                    <div key={debt.id} className="flex gap-3 items-center">
                      <div className="relative flex-1 flex items-center">
                        <div className="absolute left-3 text-slate-400">
                          <Icon size={16} />
                        </div>
                        <input 
                          type="text" 
                          value={debt.name}
                          onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                          className="w-full h-12 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500"
                          placeholder="Debt Source"
                        />
                      </div>
                      <div className="relative w-1/3">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input 
                          type="number"
                          min="0"
                          value={debt.amount}
                          onChange={(e) => updateDebt(debt.id, "amount", e.target.value)}
                          className="w-full h-12 pl-7 pr-3 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-rose-500"
                          placeholder="0"
                        />
                      </div>
                      <button
                        onClick={() => removeDebt(debt.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={addDebt}
                className="text-rose-600 text-sm font-bold flex items-center gap-1 hover:text-rose-700 transition-colors"
              >
                <Plus size={16} /> Add Debt Payment
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-8 space-y-6">
              
              {/* Main DTI Widget */}
              <div className="bg-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BadgePercent size={120} />
                </div>
                
                <h4 className="text-slate-400 font-semibold mb-2 uppercase tracking-widest text-xs">Debt-to-Income Ratio</h4>
                
                <div className="flex items-end gap-3 mb-2">
                  <span className={`text-6xl font-black ${totalIncome > 0 ? getStatusColor(dtiRatio) : "text-white"}`}>
                    {totalIncome > 0 ? dtiRatio.toFixed(1) : "0"}
                  </span>
                  <span className="text-2xl font-bold text-slate-400 pb-1">%</span>
                </div>

                <div className="mt-4 bg-slate-700/50 rounded-xl p-4 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-1">
                    {dtiRatio <= 43 && totalIncome > 0 ? (
                      <CheckCircle size={18} className="text-emerald-400" />
                    ) : (
                      <AlertTriangle size={18} className={dtiRatio > 0 ? "text-amber-400" : "text-slate-400"} />
                    )}
                    <span className="font-bold text-slate-100">{status.label}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-snug">{status.desc}</p>
                </div>

                {/* Progress Bar Guage */}
                {totalIncome > 0 && (
                  <div className="mt-6">
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: `35%` }}></div>
                      <div className="h-full bg-blue-500" style={{ width: `8%` }}></div>
                      <div className="h-full bg-amber-500" style={{ width: `6%` }}></div>
                      <div className="h-full bg-red-500" style={{ width: `51%` }}></div>
                    </div>
                    <div className="relative w-full h-4 mt-2">
                      <div 
                        className="absolute top-0 transition-all duration-500" 
                        style={{ left: `${Math.min(dtiRatio, 100)}%`, transform: 'translateX(-50%)' }}
                      >
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white mx-auto"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Breakdown Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Income</p>
                  <p className="text-xl font-bold text-slate-800">${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Debt</p>
                  <p className="text-xl font-bold text-rose-600">${totalDebt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              {/* Chart */}
              {totalIncome > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-center">
                  <div className="w-full h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => {
                            const numericValue = Number(value);
                            return !isNaN(numericValue) ? `$${numericValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value;
                          }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-sm font-bold text-slate-400">Remaining</span>
                      <span className="text-lg font-black text-emerald-600">
                        {Math.max(0, 100 - dtiRatio).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
