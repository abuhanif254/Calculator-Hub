"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Percent, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

interface PercentageCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function PercentageCalculatorView({ calcDef }: PercentageCalculatorViewProps) {
  const t = useTranslations("PercentageCalculator");

  // State for Calc 1: What is X% of Y?
  const [c1X, setC1X] = useState("");
  const [c1Y, setC1Y] = useState("");
  const [c1Res, setC1Res] = useState<number | null>(null);

  // State for Calc 2: X is what % of Y?
  const [c2X, setC2X] = useState("");
  const [c2Y, setC2Y] = useState("");
  const [c2Res, setC2Res] = useState<number | null>(null);

  // State for Calc 3: Percentage change from X to Y
  const [c3X, setC3X] = useState("");
  const [c3Y, setC3Y] = useState("");
  const [c3Res, setC3Res] = useState<{ value: number; type: "increase" | "decrease" | "none" } | null>(null);

  const calculate1 = () => {
    const x = parseFloat(c1X);
    const y = parseFloat(c1Y);
    if (!isNaN(x) && !isNaN(y)) {
      setC1Res((x / 100) * y);
    } else {
      setC1Res(null);
    }
  };

  const calculate2 = () => {
    const x = parseFloat(c2X);
    const y = parseFloat(c2Y);
    if (!isNaN(x) && !isNaN(y) && y !== 0) {
      setC2Res((x / y) * 100);
    } else {
      setC2Res(null);
    }
  };

  const calculate3 = () => {
    const x = parseFloat(c3X);
    const y = parseFloat(c3Y);
    if (!isNaN(x) && !isNaN(y) && x !== 0) {
      const change = ((y - x) / Math.abs(x)) * 100;
      setC3Res({
        value: Math.abs(change),
        type: change > 0 ? "increase" : change < 0 ? "decrease" : "none"
      });
    } else {
      setC3Res(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
          <Percent size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 gap-8">
        
        {/* Calculator 1 */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
          <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">1</span>
            {t('calc1Title')}
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="font-semibold text-slate-600 capitalize">{t('calc1Title').split(' ')[0]}</span>
              <input type="number" value={c1X} onChange={(e) => setC1X(e.target.value)} className="w-24 h-12 text-center text-xl font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500" placeholder="X" />
              <span className="font-semibold text-slate-600">%</span>
            </div>
            <div className="hidden md:block text-slate-400">of</div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input type="number" value={c1Y} onChange={(e) => setC1Y(e.target.value)} className="w-32 h-12 text-center text-xl font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500" placeholder="Y" />
            </div>
            <button onClick={calculate1} className="w-full md:w-auto px-6 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md">
              {t("calculate")}
            </button>
            {c1Res !== null && (
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 bg-blue-50 px-6 h-12 rounded-xl border border-blue-100">
                <span className="text-sm font-bold text-blue-400 uppercase">{t("result")}:</span>
                <span className="text-2xl font-extrabold text-blue-700">{c1Res.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
              </div>
            )}
          </div>
        </div>

        {/* Calculator 2 */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
          <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">2</span>
            {t('calc2Title')}
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input type="number" value={c2X} onChange={(e) => setC2X(e.target.value)} className="w-32 h-12 text-center text-xl font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500" placeholder="X" />
              <span className="font-semibold text-slate-600">is what % of</span>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input type="number" value={c2Y} onChange={(e) => setC2Y(e.target.value)} className="w-32 h-12 text-center text-xl font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500" placeholder="Y" />
            </div>
            <button onClick={calculate2} className="w-full md:w-auto px-6 h-12 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-md">
              {t("calculate")}
            </button>
            {c2Res !== null && (
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 bg-emerald-50 px-6 h-12 rounded-xl border border-emerald-100">
                <span className="text-sm font-bold text-emerald-400 uppercase">{t("result")}:</span>
                <span className="text-2xl font-extrabold text-emerald-700">{c2Res.toLocaleString(undefined, { maximumFractionDigits: 4 })}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Calculator 3 */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
          <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
            {t('calc3Title')}
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="font-semibold text-slate-600 capitalize">{t('calc3X')}</span>
              <input type="number" value={c3X} onChange={(e) => setC3X(e.target.value)} className="w-32 h-12 text-center text-xl font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500" placeholder="Total 1" />
            </div>
            <div className="hidden md:flex items-center text-slate-400">
              <ArrowRight size={20} />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
               <span className="font-semibold text-slate-600 capitalize">{t('calc3Y')}</span>
              <input type="number" value={c3Y} onChange={(e) => setC3Y(e.target.value)} className="w-32 h-12 text-center text-xl font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500" placeholder="Total 2" />
            </div>
            <button onClick={calculate3} className="w-full md:w-auto px-6 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md">
              {t("calculate")}
            </button>
            {c3Res !== null && (
              <div className={`flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 px-6 h-12 rounded-xl border ${c3Res.type === 'increase' ? 'bg-orange-50 border-orange-100' : 'bg-purple-50 border-purple-100'} `}>
                {c3Res.type === 'increase' && <TrendingUp size={20} className="text-orange-500" />}
                {c3Res.type === 'decrease' && <TrendingDown size={20} className="text-purple-500" />}
                <span className={`text-2xl font-extrabold ${c3Res.type === 'increase' ? 'text-orange-700' : 'text-purple-700'}`}>
                   {c3Res.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}% {c3Res.type === 'increase' ? t('increase') : c3Res.type === 'decrease' ? t('decrease') : ''}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
