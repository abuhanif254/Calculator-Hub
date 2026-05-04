"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function MarginCalculatorView({ calcDef }: { calcDef?: CalculatorDef }) {
  const [cost, setCost] = useState<number>(100);
  const [margin, setMargin] = useState<number>(20);
  
  // Results
  const [revenue, setRevenue] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [markup, setMarkup] = useState<number>(0);
  
  const t = useTranslations("calculator");

  useEffect(() => {
    function calculate() {
      // gross margin = (revenue - cost) / revenue
      // revenue = cost / (1 - margin/100)
      if (margin >= 100) {
          setRevenue(0);
          setProfit(0);
          setMarkup(0);
          return;
      }
      const rev = cost / (1 - (margin / 100));
      const prof = rev - cost;
      const mkup = cost > 0 ? (prof / cost) * 100 : 0;
      
      setRevenue(rev);
      setProfit(prof);
      setMarkup(mkup);
    }
    
    calculate();
  }, [cost, margin]);

  const chartData = [
    { name: "Cost", value: cost },
    { name: "Profit", value: profit }
  ];

  const COLORS = ['#94a3b8', '#10b981'];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Interactive Controls */}
        <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Margin Calculation</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Cost ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                      <span className="text-slate-400 font-medium">$</span>
                    </div>
                    <input
                      type="number"
                      value={cost === 0 ? '' : cost}
                      onChange={(e) => setCost(Number(e.target.value))}
                      className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Gross Margin (%)</label>
                  <div className="relative flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="99"
                      step="1"
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="relative min-w-[100px]">
                      <input
                        type="number"
                        value={margin}
                        onChange={(e) => setMargin(Number(e.target.value))}
                        className="w-full pe-8 ps-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium text-right"
                      />
                      <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none">
                        <span className="text-slate-400 font-medium">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Display */}
        <div className="p-6 md:p-10 bg-white">
          <div className="h-full flex flex-col justify-between space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-1">Revenue / Selling Price</p>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  <span className="text-slate-400 mr-1">$</span>
                  {revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                <p className="text-sm font-semibold text-blue-600/80 mb-1">Gross Profit</p>
                <div className="text-3xl font-bold text-blue-700 tracking-tight">
                  <span className="text-blue-400 mr-1">$</span>
                  {profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 col-span-2 flex justify-between items-center">
                 <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">Markup Percentage</p>
                    <div className="text-xl font-bold text-slate-900 tracking-tight">
                    {markup.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                    </div>
                 </div>
                 <div className="text-xs text-slate-400 max-w-[150px] text-right">
                   Profit as a percentage of the total cost.
                 </div>
              </div>
            </div>

            {/* Dynamic Visualization */}
            <div className="flex-1 mt-6 relative min-h-[200px]">
              <div className="absolute inset-0">
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => `$${Number(value).toLocaleString(undefined, {maximumFractionDigits: 2})}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
