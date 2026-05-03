'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Calendar, 
  PieChart as PieChartIcon, 
  HelpCircle,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { useTranslations } from 'next-intl';

interface LocalResultProps {
  label: string;
  value: number;
  type?: 'currency' | 'percent';
  primary?: boolean;
}

const LocalResultDisplay = ({ label, value, type = 'currency', primary = false }: LocalResultProps) => (
  <div className={`p-4 rounded-xl border ${primary ? 'bg-blue-600 border-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 border-slate-200 text-slate-900'} transition-all hover:scale-[1.02]`}>
    <p className={`text-[10px] uppercase font-bold mb-1 ${primary ? 'text-blue-100' : 'text-slate-400'}`}>
      {label}
    </p>
    <p className={`text-2xl font-black ${primary ? 'text-white' : 'text-slate-900'}`}>
      {type === 'currency' ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${value}%`}
    </p>
  </div>
);

interface LocalInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
}

const LocalInputGroup = ({ label, value, onChange, prefix, suffix, tooltip }: LocalInputProps) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
      {label}
      {tooltip && (
        <div className="group relative">
          <HelpCircle size={14} className="text-slate-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            {tooltip}
          </div>
        </div>
      )}
    </label>
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{prefix}</span>}
      <input 
        type="number" 
        value={value || ''} 
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-11 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 px-4 font-semibold text-slate-700 ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-8' : ''}`}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{suffix}</span>}
    </div>
  </div>
);

export function SimpleInterestCalculatorView() {
  const t = useTranslations('SimpleInterestCalculator');
  
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(5);
  const [timeUnit, setTimeUnit] = useState<'years' | 'months'>('years');

  const [results, setResults] = useState({
    interest: 0,
    total: 0,
    chartData: [] as any[],
  });

  useEffect(() => {
    const tInYears = timeUnit === 'years' ? time : time / 12;
    const interest = principal * (rate / 100) * tInYears;
    const total = principal + interest;

    setResults({
      interest,
      total,
      chartData: [
        { name: t('principalLabel'), value: principal },
        { name: t('interestLabel'), value: interest },
      ],
    });
  }, [principal, rate, time, timeUnit, t]);

  const COLORS = ['#3b82f6', '#10b981'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="text-blue-600" />
              {t('title')}
            </h2>

            <div className="space-y-6">
              <LocalInputGroup
                label={t('principal')}
                value={principal}
                onChange={setPrincipal}
                prefix="$"
                tooltip="The initial amount of money borrowed or invested."
              />

              <LocalInputGroup
                label={t('interestRate')}
                value={rate}
                onChange={setRate}
                suffix="%"
                tooltip="The annual interest percentage."
              />

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('time')}</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="number" 
                      value={time || ''} 
                      onChange={(e) => setTime(Number(e.target.value))}
                      className="w-full h-11 border border-slate-200 rounded-xl px-4 font-semibold text-slate-700"
                    />
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setTimeUnit('years')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeUnit === 'years' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                    >
                      {t('years')}
                    </button>
                    <button
                      onClick={() => setTimeUnit('months')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeUnit === 'months' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                    >
                      {t('months')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <LocalResultDisplay 
              label={t('totalBalance')} 
              value={results.total} 
              primary 
            />
            <LocalResultDisplay 
              label={t('totalInterest')} 
              value={results.interest} 
            />
          </div>
        </div>

        {/* Dynamic Visualization */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm h-full flex flex-col items-center justify-center">
            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2 self-start">
              <PieChartIcon className="text-blue-600" />
              {t('visualSummary')}
            </h3>

            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {results.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, '']}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8 w-full max-w-sm">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{t('principalLabel')}</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <p className="text-lg font-black text-slate-900">${principal.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{t('interestLabel')}</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-lg font-black text-slate-900">${results.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
