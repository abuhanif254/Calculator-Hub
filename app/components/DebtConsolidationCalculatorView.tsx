'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  ArrowRight, 
  TrendingDown, 
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';
import { useTranslations } from 'next-intl';

interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  payment: number;
}

export function DebtConsolidationCalculatorView() {
  const t = useTranslations('DebtConsolidationCalculator');
  
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card A', balance: 5000, rate: 19.99, payment: 150 },
    { id: '2', name: 'Personal Loan', balance: 12000, rate: 12.5, payment: 350 },
  ]);

  const [newLoanRate, setNewLoanRate] = useState(8.5);
  const [newLoanTerm, setNewLoanTerm] = useState(48);
  const [originationFee, setOriginationFee] = useState(2);

  const [results, setResults] = useState({
    currentTotalMonthly: 0,
    currentTotalInterest: 0,
    currentTotalBalance: 0,
    newMonthlyPayment: 0,
    newTotalInterest: 0,
    newTotalCost: 0,
    monthlySavings: 0,
    totalInterestSavings: 0,
    isViable: false,
  });

  const addDebt = () => {
    const newDebt: Debt = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Debt ${debts.length + 1}`,
      balance: 0,
      rate: 0,
      payment: 0,
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: any) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  useEffect(() => {
    let currentMonthly = 0;
    let totalBalance = 0;
    let weightedRate = 0;

    debts.forEach(d => {
      currentMonthly += d.payment;
      totalBalance += d.balance;
      weightedRate += (d.rate * d.balance);
    });

    if (totalBalance > 0) {
      weightedRate = weightedRate / totalBalance;
    }

    // Simplified interest calculation for comparison
    // Current total cost (approximate payoff based on payments)
    let currentTotalCost = 0;
    debts.forEach(d => {
      const r = (d.rate / 100) / 12;
      if (r > 0 && d.payment > d.balance * r) {
        const n = -Math.log(1 - (d.balance * r) / d.payment) / Math.log(1 + r);
        currentTotalCost += d.payment * n;
      } else {
        currentTotalCost += d.balance; // Fallback
      }
    });

    const loanAmount = totalBalance * (1 + originationFee / 100);
    const rNew = (newLoanRate / 100) / 12;
    const nNew = newLoanTerm;
    
    let newMonthly = 0;
    if (rNew === 0) {
      newMonthly = loanAmount / nNew;
    } else {
      newMonthly = (loanAmount * rNew) / (1 - Math.pow(1 + rNew, -nNew));
    }

    const newTotalCost = newMonthly * nNew;
    const currentInterest = Math.max(0, currentTotalCost - totalBalance);
    const newInterest = Math.max(0, newTotalCost - totalBalance);

    setResults({
      currentTotalMonthly: currentMonthly,
      currentTotalInterest: currentInterest,
      currentTotalBalance: totalBalance,
      newMonthlyPayment: newMonthly,
      newTotalInterest: newInterest,
      newTotalCost,
      monthlySavings: currentMonthly - newMonthly,
      totalInterestSavings: currentInterest - newInterest,
      isViable: newTotalCost < currentTotalCost,
    });
  }, [debts, newLoanRate, newLoanTerm, originationFee]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Column */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          
          {/* Current Debts */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <CreditCard className="text-blue-600" />
                {t('currentDebts')}
              </h2>
              <button 
                onClick={addDebt}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} />
                {t('addDebt')}
              </button>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {debts.map((debt) => (
                  <motion.div 
                    key={debt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50"
                  >
                    <div className="md:col-span-4">
                      <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">{t('debtName')}</label>
                      <input 
                        type="text" 
                        value={debt.name}
                        onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                        className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3 text-sm font-semibold" 
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">{t('balance')}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                        <input 
                          type="number" 
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                          className="w-full h-10 bg-white border border-slate-200 rounded-lg pl-6 pr-3 text-sm font-semibold" 
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">{t('interestRate')}</label>
                      <input 
                        type="number" 
                        value={debt.rate}
                        onChange={(e) => updateDebt(debt.id, 'rate', Number(e.target.value))}
                        className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3 text-sm font-semibold" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">{t('monthlyPayment')}</label>
                      <input 
                        type="number" 
                        value={debt.payment}
                        onChange={(e) => updateDebt(debt.id, 'payment', Number(e.target.value))}
                        className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3 text-sm font-semibold" 
                      />
                    </div>
                    <div className="md:col-span-1 flex items-end justify-center pb-2">
                      <button 
                        onClick={() => removeDebt(debt.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* New Loan Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <ArrowRight className="text-blue-600" />
              {t('consolidatedLoan')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('interestRate')}</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={newLoanRate}
                    onChange={(e) => setNewLoanRate(Number(e.target.value))}
                    className="w-full h-11 border border-slate-200 rounded-xl px-4 font-semibold text-slate-700 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('loanTerm')}</label>
                <input 
                  type="number" 
                  value={newLoanTerm}
                  onChange={(e) => setNewLoanTerm(Number(e.target.value))}
                  className="w-full h-11 border border-slate-200 rounded-xl px-4 font-semibold text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('originationFee')}</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={originationFee}
                    onChange={(e) => setOriginationFee(Number(e.target.value))}
                    className="w-full h-11 border border-slate-200 rounded-xl px-4 font-semibold text-slate-700 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-blue-100">
              <TrendingDown size={20} />
              {t('comparisonResult')}
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-blue-100 text-xs font-bold uppercase mb-1">{t('monthlySaving')}</p>
                <p className={`text-4xl font-black ${results.monthlySavings >= 0 ? 'text-white' : 'text-red-200'}`}>
                  ${Math.abs(results.monthlySavings).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="text-blue-200 text-[10px] font-bold uppercase mt-1">
                  {results.monthlySavings >= 0 ? t('youSave') : t('youPayMore')}
                </p>
              </div>

              <div>
                <p className="text-blue-100 text-xs font-bold uppercase mb-1">{t('totalInterestSaving')}</p>
                <p className="text-2xl font-black">
                  ${Math.max(0, results.totalInterestSavings).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="pt-6 border-t border-blue-500/50">
                <div className="flex items-center gap-3">
                  {results.isViable ? (
                    <CheckCircle2 className="text-emerald-300" size={24} />
                  ) : (
                    <XCircle className="text-red-300" size={24} />
                  )}
                  <div>
                    <p className="font-bold text-sm">{t('recommendation')}</p>
                    <p className="text-blue-100 text-xs leading-relaxed">
                      {results.isViable ? t('consolidateTip') : t('stayTip')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Info size={18} className="text-blue-600" />
              Detailed Comparison
            </h4>
            
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Current', value: results.currentTotalMonthly },
                    { name: 'New', value: results.newMonthlyPayment },
                  ]}
                  layout="vertical"
                  margin={{ left: 20, right: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} />
                  <RechartsTooltip formatter={(val: any) => [`$${val.toLocaleString()}`, 'Monthly Payment']} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                    <Cell fill="#cbd5e1" />
                    <Cell fill="#3b82f6" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('currentTotal')}</p>
                <p className="text-lg font-black text-slate-900">${results.currentTotalMonthly.toLocaleString()}</p>
                <p className="text-[9px] text-slate-500">monthly payment</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">{t('consolidatedTotal')}</p>
                <p className="text-lg font-black text-blue-600">${results.newMonthlyPayment.toLocaleString()}</p>
                <p className="text-[9px] text-blue-500">monthly payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
