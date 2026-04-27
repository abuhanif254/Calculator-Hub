"use client";

import React, { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSettings } from "../context/SettingsContext";

interface ResultDisplayProps {
  result: any;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const { currency, locale } = useSettings();

  if (!result) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(val);
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

  const hasAmortization = Array.isArray(result.amortizationSchedule);

  return (
    <div className="flex flex-col h-full bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">Calculation Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(result).map(([key, value]) => {
          if (key === "amortizationSchedule" || typeof value !== "number") return null;
          
          // Format the label
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());

          // Highlight the total monthly payment
          const isHighlight = key === "totalMonthlyPayment";

          return (
            <div 
              key={key} 
              className={`p-4 rounded-lg ${isHighlight ? "bg-blue-600 text-white shadow-md md:col-span-2" : "bg-white border border-slate-200"}`}
            >
              <p className={`text-sm font-medium ${isHighlight ? "text-blue-100" : "text-slate-500"}`}>
                {label}
              </p>
              <p className={`text-2xl font-bold mt-1 ${isHighlight ? "text-white" : "text-slate-800"}`}>
                {formatCurrency(value as number)}
              </p>
            </div>
          );
        })}
      </div>

      {hasAmortization && (
        <div className="mt-auto">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">Balance Over Time</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.amortizationSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="year" 
                  tickFormatter={(val) => `Yr ${val}`}
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tickFormatter={(val) => `${cSym}${(val / 1000).toFixed(0)}k`}
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                />
                <Tooltip 
                  formatter={(value: any) => formatCurrency(Number(value))}
                  labelFormatter={(label) => `Year ${label}`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="remainingBalance" 
                  name="Balance"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
