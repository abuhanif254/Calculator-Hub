'use client';

import React, { useState, useEffect } from 'react';
import { 
  CircleDollarSign, 
  Info, 
  ArrowRight, 
  PieChart as PieChartIcon, 
  Gavel, 
  HelpCircle,
  Percent,
  Plus
} from 'lucide-react';
import { InputGroup } from './InputGroup';
import { ResultDisplay } from './ResultDisplay';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip, 
  Legend 
} from 'recharts';

interface Asset {
  id: string;
  name: string;
  value: number;
}

import { useTranslations } from 'next-intl';

export function EstateTaxCalculatorView() {
  const t = useTranslations('EstateTaxCalculator');
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: t('realEstate'), value: 500000 },
    { id: '2', name: t('cashAccounts'), value: 200000 },
    { id: '3', name: t('investments'), value: 300000 },
  ]);
  
  const [debts, setDebts] = useState(50000);
  const [funeralExpenses, setFuneralExpenses] = useState(15000);
  const [charitableGifts, setCharitableGifts] = useState(25000);
  const [exclusionLimit, setExclusionLimit] = useState(13610000); // 2024 US Federal Limit
  const [taxRate, setTaxRate] = useState(40); // 40% tax rate above limit
  
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetValue, setNewAssetValue] = useState<number | ''>('');

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalDeductions = debts + funeralExpenses + charitableGifts;
  const taxableEstate = Math.max(0, totalAssets - totalDeductions);
  const taxableAmount = Math.max(0, taxableEstate - exclusionLimit);
  const estimatedTax = (taxableAmount * taxRate) / 100;
  const netEstateToHeirs = totalAssets - totalDeductions - estimatedTax;

  const addAsset = () => {
    if (newAssetName && typeof newAssetValue === 'number') {
      setAssets([...assets, { 
        id: Math.random().toString(36).substr(2, 9), 
        name: newAssetName, 
        value: newAssetValue 
      }]);
      setNewAssetName('');
      setNewAssetValue('');
    }
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  const chartData = [
    { name: t('exclusion'), value: Math.min(taxableEstate, exclusionLimit) },
    { name: t('estTax'), value: estimatedTax },
    { name: t('netToHeirs'), value: Math.max(0, netEstateToHeirs) },
    { name: t('deductions'), value: totalDeductions },
  ].filter(d => d.value > 0);

  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#64748b'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CircleDollarSign className="text-blue-600" size={20} />
              {t('assetsTitle')}
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6">
              <AnimatePresence initial={false}>
                {assets.map((asset) => (
                  <motion.div 
                    key={asset.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 group"
                  >
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700 block">{asset.name}</span>
                      <span className="text-xs text-slate-500">${asset.value.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => removeAsset(asset.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all"
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">{t('assetName')}</label>
                <input 
                  type="text" 
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  placeholder={t('assetPlaceholder')}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1 flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">{t('value')}</label>
                  <input 
                    type="number" 
                    value={newAssetValue}
                    onChange={(e) => setNewAssetValue(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  onClick={addAsset}
                  className="mt-5 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-sm self-start"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center p-3 bg-slate-900 rounded-xl text-white">
              <span className="text-sm font-medium text-slate-300">{t('totalGrossEstate')}</span>
              <span className="text-xl font-bold">${totalAssets.toLocaleString()}</span>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Gavel className="text-blue-600" size={20} />
              {t('exemptionsTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputGroup
                label={t('debts')}
                type="number"
                value={debts}
                onChange={setDebts}
                prefix="$"
                tooltip={t('debtsTooltip')}
              />
              <InputGroup
                label={t('charitable')}
                type="number"
                value={charitableGifts}
                prefix="$"
                onChange={setCharitableGifts}
                tooltip={t('charitableTooltip')}
              />
              <InputGroup
                label={t('exclusionLimit')}
                type="number"
                value={exclusionLimit}
                prefix="$"
                onChange={setExclusionLimit}
                tooltip={t('exclusionTooltip')}
              />
              <InputGroup
                label={t('taxRate')}
                type="number"
                value={taxRate}
                suffix="%"
                onChange={setTaxRate}
                tooltip={t('taxRateTooltip')}
              />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
              <PieChartIcon className="text-blue-600" size={20} />
              {t('breakdownTitle')}
            </h3>

            <div className="grid grid-cols-1 gap-4 mb-8">
              <ResultDisplay
                label={t('estTax')}
                value={estimatedTax}
                type="currency"
                primary
              />
              <div className="grid grid-cols-2 gap-4">
                <ResultDisplay
                  label={t('taxableEstate')}
                  value={taxableEstate}
                  type="currency"
                />
                <ResultDisplay
                  label={t('netToHeirs')}
                  value={netEstateToHeirs}
                  type="currency"
                />
              </div>
            </div>

            <div className="h-[300px] w-full">
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
                  <RechartsTooltip 
                    formatter={(val: number) => `$${val.toLocaleString()}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 mt-6">
              <Info className="text-blue-600 shrink-0" size={24} />
              <div className="text-sm text-blue-800 leading-relaxed">
                <strong>{t('planningTipTitle')}:</strong> {t('planningTipText')}
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('guideTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
              <HelpCircle className="text-blue-600" size={20} />
              {t('guide1Title')}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('guide1Text')}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
              <HelpCircle className="text-blue-600" size={20} />
              {t('guide2Title')}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('guide2Text')}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
              <HelpCircle className="text-blue-600" size={20} />
              {t('guide3Title')}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('guide3Text')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
