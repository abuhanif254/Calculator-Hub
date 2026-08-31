'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, Table, Activity, GraduationCap } from 'lucide-react';
import { CIBasicMode } from './CIBasicMode';
import dynamic from 'next/dynamic';
import type { CalculatorDef } from '@/lib/types';

// Lazy-load the heavier tabs so the primary calculator UI renders instantly
const CIDatasetAnalyzer = dynamic(() => import('./CIDatasetAnalyzer').then(m => ({ default: m.CIDatasetAnalyzer })), { ssr: false });
const CIVisualExplorer = dynamic(() => import('./CIVisualExplorer').then(m => ({ default: m.CIVisualExplorer })), { ssr: false });
const CILearningSuite = dynamic(() => import('./CILearningSuite').then(m => ({ default: m.CILearningSuite })), { ssr: false });

type TabMode = 'calculator' | 'dataset' | 'explorer' | 'learning';

interface Props {
  calcDef?: CalculatorDef;
}

export function ConfidenceIntervalCalculatorView({ calcDef }: Props) {
  const t = useTranslations('ConfidenceIntervalCalculator');
  const [activeTab, setActiveTab] = useState<TabMode>('calculator');

  const tabs = [
    { id: 'calculator' as TabMode, label: t('calculatorMode', { fallback: 'Calculator' }), icon: Calculator },
    { id: 'dataset'    as TabMode, label: t('datasetMode',    { fallback: 'Dataset Analyzer' }), icon: Table },
    { id: 'explorer'   as TabMode, label: t('explorerMode',   { fallback: 'Visual Explorer' }), icon: Activity },
    { id: 'learning'   as TabMode, label: t('learningMode',   { fallback: 'Learning Hub' }), icon: GraduationCap },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200 print:hidden">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {t('title', { fallback: calcDef?.title ?? 'Confidence Interval Calculator' })}
        </h2>
        <p className="text-slate-600">
          {t('desc', { fallback: calcDef?.description ?? 'Calculate confidence intervals for means, proportions, and differences with step-by-step solutions.' })}
        </p>
      </div>

      {/* ── Navigation Tabs ──────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white print:hidden">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
              role="tab"
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content Area ─────────────────────────────────────────── */}
      <div className="p-6 md:p-8">
        {activeTab === 'calculator' && <CIBasicMode />}
        {activeTab === 'dataset'    && <CIDatasetAnalyzer />}
        {activeTab === 'explorer'   && <CIVisualExplorer />}
        {activeTab === 'learning'   && <CILearningSuite />}
      </div>
    </div>
  );
}
