"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

interface SalaryCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function SalaryCalculatorView({ calcDef }: SalaryCalculatorViewProps) {
  const t = useTranslations("SalaryCalculator");
  
  const [amount, setAmount] = useState<number>(50000);
  const [period, setPeriod] = useState<string>("annually");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  
  const [results, setResults] = useState<{ 
    hourly: number;
    daily: number;
    weekly: number;
    biweekly: number;
    monthly: number;
    annually: number;
    chartData: any[];
  } | null>(null);

  const calculate = () => {
    if (amount <= 0 || hoursPerWeek <= 0 || daysPerWeek <= 0) return;

    let annually = 0;
    const weeksPerYear = 52;
    const hoursPerDay = hoursPerWeek / daysPerWeek;

    // Convert input amount to annual baseline
    switch (period) {
      case "hourly":
        annually = amount * hoursPerWeek * weeksPerYear;
        break;
      case "daily":
        annually = amount * daysPerWeek * weeksPerYear;
        break;
      case "weekly":
        annually = amount * weeksPerYear;
        break;
      case "monthly":
        annually = amount * 12;
        break;
      case "annually":
      default:
        annually = amount;
        break;
    }

    const weekly = annually / weeksPerYear;
    const hourly = weekly / hoursPerWeek;
    const daily = hourly * hoursPerDay;
    const biweekly = weekly * 2;
    const monthly = annually / 12;

    const chartData = [
      { name: t("hourlyPeriod"), value: hourly, fullValue: hourly },
      { name: t("dailyPeriod"), value: daily, fullValue: daily },
      { name: t("weeklyPeriod"), value: weekly, fullValue: weekly },
      { name: t("monthlyPeriod"), value: monthly, fullValue: monthly },
      { name: t("annuallyPeriod"), value: annually, fullValue: annually }
    ];

    setResults({
      hourly,
      daily,
      weekly,
      biweekly,
      monthly,
      annually,
      chartData
    });
  };

  useEffect(() => {
    calculate();
  }, [amount, period, hoursPerWeek, daysPerWeek]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("amount")}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number"
                  value={amount === 0 ? "" : amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("period")}</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-700"
              >
                <option value="hourly">{t("hourlyPeriod")}</option>
                <option value="daily">{t("dailyPeriod")}</option>
                <option value="weekly">{t("weeklyPeriod")}</option>
                <option value="monthly">{t("monthlyPeriod")}</option>
                <option value="annually">{t("annuallyPeriod")}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("hoursPerWeek")}</label>
              <input 
                type="number"
                value={hoursPerWeek === 0 ? "" : hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("daysPerWeek")}</label>
              <input 
                type="number"
                max={7}
                value={daysPerWeek === 0 ? "" : daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

        </div>

        <div className="md:col-span-8 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || amount <= 0 ? (
             <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center min-h-[300px]">
               Enter a salary amount to see<br/>the converted periods.
             </div>
          ) : (
            <div className="w-full space-y-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm col-span-2 md:col-span-3">
                  <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">{t("annually")}</div>
                  <div className="text-3xl md:text-5xl font-extrabold text-slate-900">
                    ${results.annually.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("monthly")}</div>
                  <div className="text-xl font-bold text-slate-700">
                    ${results.monthly.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("biweekly")}</div>
                  <div className="text-xl font-bold text-slate-700">
                    ${results.biweekly.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("weekly")}</div>
                  <div className="text-xl font-bold text-slate-700">
                    ${results.weekly.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("daily")}</div>
                  <div className="text-xl font-bold text-slate-700">
                    ${results.daily.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("hourly")}</div>
                  <div className="text-xl font-bold text-indigo-500">
                    ${results.hourly.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
