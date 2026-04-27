"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { LocalizedDatePicker } from "./LocalizedDatePicker";
import { getLocale } from "next-intl/server";

interface OvulationCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

export function OvulationCalculatorView({ calcDef, locale = 'en' }: OvulationCalculatorViewProps) {
  const t = useTranslations("AgeCalculator"); // reuse translations or hardcode english for now? I will hardcode standard text.
  
  const [lastPeriod, setLastPeriod] = useState<Date | null>(new Date());
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [resultDates, setResultDates] = useState<{
    ovulationDate: Date;
    fertileWindowStart: Date;
    fertileWindowEnd: Date;
    nextPeriod: Date;
    pregnancyTestDate: Date;
  } | null>(null);

  const calculate = () => {
    if (!lastPeriod) return;
    
    // Typically ovulation happens 14 days before the NEXT period.
    const nextPeriodDate = new Date(lastPeriod);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5); // 5 days before

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1); // 1 day after

    const pregnancyTestDate = new Date(nextPeriodDate);
    pregnancyTestDate.setDate(pregnancyTestDate.getDate() + 1); // day after missed period

    setResultDates({
      ovulationDate,
      fertileWindowStart: fertileStart,
      fertileWindowEnd: fertileEnd,
      nextPeriod: nextPeriodDate,
      pregnancyTestDate
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{calcDef.title}</h2>
        <p className="text-slate-600">{calcDef.description}</p>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">First day of last period</label>
            <LocalizedDatePicker
              selectedDate={lastPeriod || undefined}
              onSelect={(d) => setLastPeriod(d || null)}
              label="Select date"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Average Cycle Length (Days)</label>
            <input 
              type="number" 
              value={cycleLength} 
              onChange={e => setCycleLength(parseInt(e.target.value) || 28)}
              className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-slate-500">Most women have a 28-day cycle.</p>
          </div>

          <button onClick={calculate} className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors">
            Calculate Ovulation
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col justify-center border border-slate-100">
          {!resultDates ? (
            <div className="text-slate-400 font-medium text-lg text-center">
              Enter your period dates to see<br/>your fertility window
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Estimated Ovulation</div>
                <div className="text-2xl md:text-3xl font-extrabold text-blue-600">
                  {formatDate(resultDates.ovulationDate)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="text-sm font-semibold text-blue-800 mb-1">Fertile Window</div>
                  <div className="font-medium text-blue-900">
                    {formatDate(resultDates.fertileWindowStart)} - {formatDate(resultDates.fertileWindowEnd)}
                  </div>
                  <p className="text-xs text-blue-700 mt-2">Having intercourse during this timeframe maximizes the chance of conception.</p>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 font-medium">Next Period Expected</span>
                  <span className="font-bold text-slate-800">{formatDate(resultDates.nextPeriod)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-t border-slate-200">
                  <span className="text-slate-500 font-medium">Pregnancy Test Date</span>
                  <span className="font-bold text-slate-800">{formatDate(resultDates.pregnancyTestDate)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
