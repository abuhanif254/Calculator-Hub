'use client';

import React, { useState, useEffect } from 'react';
import { 
  CircleDollarSign, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  PieChart as PieChartIcon, 
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useTranslations } from 'next-intl';

interface LocalResultProps {
  label: string;
  value: number | string;
  type?: 'currency' | 'number' | 'text';
  primary?: boolean;
}

const LocalResultDisplay = ({ label, value, type = 'currency', primary = false }: LocalResultProps) => (
  <div className={`p-4 rounded-xl border ${primary ? 'bg-blue-600 border-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 border-slate-200 text-slate-900'} transition-all hover:scale-[1.02]`}>
    <p className={`text-[10px] uppercase font-bold mb-1 ${primary ? 'text-blue-100' : 'text-slate-400'}`}>
      {label}
    </p>
    <p className={`text-2xl font-black ${primary ? 'text-white' : 'text-slate-900'}`}>
      {type === 'currency' ? `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value}
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
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-11 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 px-4 font-semibold text-slate-700 ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-8' : ''}`}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{suffix}</span>}
    </div>
  </div>
);

export function AnnuityPayoutCalculatorView() {
  const t = useTranslations('AnnuityPayoutCalculator');
  
  const [mode, setMode] = useState<'fixedTerm' | 'fixedAmount'>('fixedTerm');
  const [principal, setPrincipal] = useState(100000);
  const [annualRate, setAnnualRate] = useState(5);
  const [years, setYears] = useState(20);
  const [payoutAmount, setPayoutAmount] = useState(660);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');

  const [results, setResults] = useState({
    calculatedPayout: 0,
    totalWithdrawn: 0,
    totalInterest: 0,
    durationYears: 0,
    durationMonths: 0,
    chartData: [] as any[],
  });

  function calculateResults() {
    const freqFactor = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
    const r = (annualRate / 100) / freqFactor;
    
    if (mode === 'fixedTerm') {
      const n = years * freqFactor;
      let calculatedP = 0;
      if (r === 0) {
        calculatedP = principal / n;
      } else {
        calculatedP = (principal * r) / (1 - Math.pow(1 + r, -n));
      }

      const totalWithdrawn = calculatedP * n;
      const totalInterest = totalWithdrawn - principal;

      // Chart Data
      let currentBalance = principal;
      const chartData = [];
      for (let y = 0; y <= years; y++) {
        chartData.push({
          year: y,
          balance: Math.max(0, currentBalance),
        });
        
        // Simple yearly interest and payout subtraction for chart
        for (let f = 0; f < freqFactor; f++) {
          currentBalance = currentBalance * (1 + r) - calculatedP;
        }
      }

      setResults({
        calculatedPayout: calculatedP,
        totalWithdrawn,
        totalInterest,
        durationYears: years,
        durationMonths: 0,
        chartData,
      });
    } else {
      // Fixed Amount Mode
      const p = payoutAmount;
      let n = 0;
      
      if (r === 0) {
        n = principal / p;
      } else if (p <= principal * r) {
        // Infinite duration if interest > payout
        n = 999; 
      } else {
        n = -Math.log(1 - (principal * r) / p) / Math.log(1 + r);
      }

      const totalMonths = n;
      const yearsVal = Math.floor(totalMonths / freqFactor);
      const monthsVal = Math.round((totalMonths % freqFactor) * (12 / freqFactor));

      const totalWithdrawn = p * totalMonths;
      const totalInterest = totalWithdrawn - principal;

      // Chart Data
      let currentBalance = principal;
      const chartData = [];
      const maxYears = Math.min(100, Math.ceil(n / freqFactor));
      for (let y = 0; y <= maxYears; y++) {
        chartData.push({
          year: y,
          balance: Math.max(0, currentBalance),
        });
        for (let f = 0; f < freqFactor; f++) {
          currentBalance = currentBalance * (1 + r) - p;
        }
        if (currentBalance <= 0) break;
      }

      setResults({
        calculatedPayout: p,
        totalWithdrawn,
        totalInterest,
        durationYears: yearsVal,
        durationMonths: monthsVal,
        chartData,
      });
    }
  }

  useEffect(() => {
    calculateResults();
  }, [principal, annualRate, years, payoutAmount, frequency, mode]);

  const COLORS = ['#3b82f6', '#10b981'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <CircleDollarSign className="text-blue-600" />
              {t('title')}
            </h2>

            <div className="space-y-6">
              {/* Mode Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setMode('fixedTerm')}
                  className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${mode === 'fixedTerm' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t('fixedTerm')}
                </button>
                <button
                  onClick={() => setMode('fixedAmount')}
                  className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${mode === 'fixedAmount' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t('fixedAmount')}
                </button>
              </div>

              <LocalInputGroup
                label={t('startingPrincipal')}
                value={principal}
                onChange={setPrincipal}
                prefix="$"
                tooltip="The initial lump sum amount available for the annuity."
              />

              <LocalInputGroup
                label={t('annualReturn')}
                value={annualRate}
                onChange={setAnnualRate}
                suffix="%"
                tooltip="Expected annual return on the remaining balance."
              />

              {mode === 'fixedTerm' ? (
                <LocalInputGroup
                  label={t('payoutTerm')}
                  value={years}
                  onChange={setYears}
                  suffix="yrs"
                  tooltip="How many years you want to receive payments."
                />
              ) : (
                <LocalInputGroup
                  label={t('desiredPayout')}
                  value={payoutAmount}
                  onChange={setPayoutAmount}
                  prefix="$"
                  tooltip="The amount you wish to withdraw in each period."
                />
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('payoutFrequency')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['monthly', 'quarterly', 'annually'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${frequency === f ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      {t(f)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 gap-4">
            <LocalResultDisplay 
              label={mode === 'fixedTerm' ? t('payoutAmount') : t('estimatedDuration')}
              value={mode === 'fixedTerm' ? results.calculatedPayout : `${results.durationYears} ${t('yearsSuffix')} ${results.durationMonths} ${t('monthsSuffix')}`}
              type={mode === 'fixedTerm' ? 'currency' : 'text'}
              primary 
            />
            <div className="grid grid-cols-2 gap-4">
              <LocalResultDisplay label={t('totalInterest')} value={results.totalInterest} />
              <LocalResultDisplay label={t('totalPayout')} value={results.totalWithdrawn} />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="text-blue-600" />
                {t('chartTitle')}
              </h3>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.chartData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}}
                    label={{ value: t('yearLabel'), position: 'insideBottom', offset: -5, fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, t('remainingBalance')]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown */}
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <PieChartIcon size={18} className="text-blue-600" />
                {t('summaryTitle')}
              </h4>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: principal },
                          { name: 'Interest', value: Math.max(0, results.totalInterest) }
                        ]}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {COLORS.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      Principal
                    </span>
                    <span className="font-bold text-slate-900">${principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      {t('totalInterest')}
                    </span>
                    <span className="font-bold text-slate-900">${results.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-base">
                    <span className="font-bold text-slate-900">{t('totalPayout')}</span>
                    <span className="font-black text-blue-600">${results.totalWithdrawn.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
