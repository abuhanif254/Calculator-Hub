'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { 
  parseDataset, 
  frequencyTableToFlat,
  groupedDataToFlat,
  calculateStandardDeviationStats,
  DispersionStats,
} from '@/lib/calculators/standardDeviation';
import { Calculator, Trash2, Sigma, BarChart2, Layers, AlignLeft, Info, AlertCircle } from 'lucide-react';
import { CalculatorDef } from "@/lib/types";

// Lazy Load Heavy Components for 95+ Lighthouse Score
const BellCurveChart = dynamic(() => import('./Visualizations/BellCurveChart'), { 
  ssr: false, 
  loading: () => <div className="h-64 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl"></div> 
});
const DispersionBoxPlot = dynamic(() => import('./Visualizations/DispersionBoxPlot'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl"></div> 
});
const StepByStepSolver = dynamic(() => import('./StepByStepSolver'));
const DatasetAnalyzer = dynamic(() => import('./DatasetAnalyzer'));
const QuizEngine = dynamic(() => import('./QuizEngine'));
const Flashcards = dynamic(() => import('./Flashcards'));

type InputMode = 'raw-data' | 'frequency' | 'grouped' | 'summary';

interface Props {
  calcDef: CalculatorDef;
  locale?: string;
}

export default function StandardDeviationCalculator({ calcDef, locale }: Props) {
  const t = useTranslations('StandardDeviationCalculator');
  
  // State
  const [activeTab, setActiveTab] = useState<InputMode>('raw-data');
  const [rawDataInput, setRawDataInput] = useState('');
  const [freqInput, setFreqInput] = useState('');
  const [groupedInput, setGroupedInput] = useState('');
  const [summaryInput, setSummaryInput] = useState({ n: 0, mean: 0, variance: 0 });
  const [vizTab, setVizTab] = useState('bell');
  
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Stored results
  const [dataset, setDataset] = useState<number[]>([]);
  const [stats, setStats] = useState<DispersionStats | null>(null);

  const handleClear = () => {
    setRawDataInput('');
    setFreqInput('');
    setGroupedInput('');
    setSummaryInput({ n: 0, mean: 0, variance: 0 });
    setHasCalculated(false);
    setStats(null);
    setDataset([]);
  };

  const handleCalculate = () => {
    let parsed: number[] = [];
    let currentStats: DispersionStats | null = null;

    if (activeTab === 'raw-data') {
      if (!rawDataInput.trim()) return;
      parsed = parseDataset(rawDataInput);
    } else if (activeTab === 'frequency') {
      if (!freqInput.trim()) return;
      const table = freqInput.split('\n').map(line => {
        const parts = line.split(',');
        return { value: parseFloat(parts[0]), frequency: parseInt(parts[1] || '1', 10) };
      }).filter(item => !isNaN(item.value) && !isNaN(item.frequency) && item.frequency > 0);
      parsed = frequencyTableToFlat(table);
    } else if (activeTab === 'grouped') {
      if (!groupedInput.trim()) return;
      const groups = groupedInput.split('\n').map(line => {
        const parts = line.split(',');
        const range = parts[0]?.split('-') || [];
        const lower = parseFloat(range[0]);
        const upper = parseFloat(range[1]);
        const midpoint = (lower + upper) / 2;
        return { classMidpoint: midpoint, frequency: parseInt(parts[1] || '1', 10) };
      }).filter(item => !isNaN(item.classMidpoint) && !isNaN(item.frequency) && item.frequency > 0);
      parsed = groupedDataToFlat(groups);
    } else if (activeTab === 'summary') {
      if (summaryInput.n <= 0) return;
      // We don't have a dataset for summary
      parsed = [];
    }

    if (activeTab !== 'summary') {
      currentStats = calculateStandardDeviationStats(parsed);
    }

    setDataset(parsed);
    setStats(currentStats);
    setHasCalculated(true);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Sigma className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleClear}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> {t('clear')}
          </button>
          <button 
            onClick={handleCalculate}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Calculator className="w-4 h-4" /> {t('calculate')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-[500px]">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              <button onClick={() => setActiveTab('raw-data')} className={`flex-1 py-4 text-xs sm:text-sm font-semibold transition-colors ${activeTab === 'raw-data' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-gray-50 dark:bg-gray-800/50' : 'text-gray-500 hover:text-gray-700'}`}>
                {t('rawData')}
              </button>
              <button onClick={() => setActiveTab('frequency')} className={`flex-1 py-4 text-xs sm:text-sm font-semibold transition-colors ${activeTab === 'frequency' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-gray-50 dark:bg-gray-800/50' : 'text-gray-500 hover:text-gray-700'}`}>
                {t('frequency')}
              </button>
              <button onClick={() => setActiveTab('grouped')} className={`flex-1 py-4 text-xs sm:text-sm font-semibold transition-colors ${activeTab === 'grouped' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-gray-50 dark:bg-gray-800/50' : 'text-gray-500 hover:text-gray-700'}`}>
                {t('grouped')}
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              {activeTab === 'raw-data' && (
                <div className="flex-1 flex flex-col">
                  <label className="font-semibold text-gray-900 dark:text-white mb-2">{t('dataInputLabel')}</label>
                  <textarea
                    value={rawDataInput}
                    onChange={(e) => setRawDataInput(e.target.value)}
                    className="flex-1 w-full p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-sm resize-none"
                    placeholder={t('inputPlaceholder')}
                  />
                  <p className="text-sm text-gray-500 mt-4">{t('inputHelp')}</p>
                </div>
              )}

              {activeTab === 'frequency' && (
                <div className="flex-1 flex flex-col">
                  <label className="font-semibold text-gray-900 dark:text-white mb-2">{t('freqTable')}</label>
                  <textarea
                    value={freqInput}
                    onChange={(e) => setFreqInput(e.target.value)}
                    className="flex-1 w-full p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-mono text-sm resize-none"
                    placeholder={t('freqFormat')}
                  />
                </div>
              )}

              {activeTab === 'grouped' && (
                <div className="flex-1 flex flex-col">
                  <label className="font-semibold text-gray-900 dark:text-white mb-2">{t('groupedData')}</label>
                  <textarea
                    value={groupedInput}
                    onChange={(e) => setGroupedInput(e.target.value)}
                    className="flex-1 w-full p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-mono text-sm resize-none"
                    placeholder={t('groupedFormat')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Statistical Results Panel */}
        <div className="lg:col-span-7">
          {!hasCalculated ? (
            <div className="h-[500px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center p-8 text-center">
              <div className="flex items-center gap-2 mb-8 text-sm font-bold tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full uppercase">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> {t('results')}
              </div>
              <Sigma className="w-24 h-24 text-gray-200 dark:text-gray-800 mb-6" />
              <p className="text-gray-400 font-medium text-lg">{t('waiting')}</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              
              {/* Top Results Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                  <p className="text-emerald-100 font-medium mb-1">{t('sampleSD')} (s)</p>
                  <div className="text-4xl font-bold tracking-tight mb-4">
                    {activeTab === 'summary' ? Math.sqrt(summaryInput.variance).toFixed(4) : (stats?.sampleSD ? stats.sampleSD.toFixed(4) : 'N/A')}
                  </div>
                  <div className="pt-4 border-t border-emerald-400/30">
                    <p className="text-sm text-emerald-200">{t('popSD')} (σ)</p>
                    <div className="text-2xl font-bold tracking-tight">
                      {activeTab === 'summary' ? Math.sqrt(summaryInput.variance * ((summaryInput.n - 1) / summaryInput.n)).toFixed(4) : stats?.populationSD.toFixed(4)}
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4 content-center">
                  <div>
                    <p className="text-sm text-gray-500">{t('sampleVariance')} (s²)</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {activeTab === 'summary' ? summaryInput.variance : stats?.sampleVariance.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('mean')} (μ)</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {activeTab === 'summary' ? summaryInput.mean : stats?.mean.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('stdError')}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {activeTab === 'summary' ? (Math.sqrt(summaryInput.variance) / Math.sqrt(summaryInput.n)).toFixed(4) : stats?.standardError.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('coefOfVar')}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {activeTab === 'summary' ? ((Math.sqrt(summaryInput.variance) / summaryInput.mean) * 100).toFixed(2) + '%' : stats?.coefficientOfVariationSample.toFixed(2) + '%'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Dataset Intelligence */}
              {stats && activeTab !== 'summary' && (
                <DatasetAnalyzer stats={stats} />
              )}

            </div>
          )}
        </div>
      </div>

      {/* Advanced Modules Section (Only shows when calculated and dataset available) */}
      {hasCalculated && stats && activeTab !== 'summary' && (
        <div className="mt-12 space-y-8 animate-in fade-in duration-700 delay-300 fill-mode-both">
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <button
                onClick={() => setVizTab('bell')}
                className={`flex-1 py-4 px-4 text-sm font-semibold transition-colors ${vizTab === 'bell' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-white dark:bg-gray-800/50' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Bell Curve Chart
              </button>
              <button
                onClick={() => setVizTab('box')}
                className={`flex-1 py-4 px-4 text-sm font-semibold transition-colors ${vizTab === 'box' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-white dark:bg-gray-800/50' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Dispersion Box Plot
              </button>
            </div>
            <div className="p-6">
              {vizTab === 'bell' && (
                <div className="max-w-4xl mx-auto">
                  <BellCurveChart mean={stats.mean} sd={stats.populationSD || stats.sampleSD || 1} />
                </div>
              )}
              {vizTab === 'box' && (
                <div className="max-w-4xl mx-auto">
                  <DispersionBoxPlot 
                    min={stats.min} q1={stats.q1} median={stats.median} 
                    q3={stats.q3} max={stats.max} lowerFence={stats.lowerFence} 
                    upperFence={stats.upperFence} outliers={stats.outliers} 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Descriptive Stats Table */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden p-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Full Descriptive Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatItem label="Sample Size (N)" value={stats.sampleSize.toString()} />
              <StatItem label="Minimum" value={stats.min.toString()} />
              <StatItem label="Maximum" value={stats.max.toString()} />
              <StatItem label="Range" value={stats.range.toString()} />
              <StatItem label="Median" value={stats.median.toString()} />
              <StatItem label="Mode" value={stats.mode.length > 0 ? stats.mode.join(', ') : 'None'} />
              <StatItem label="MAD" value={stats.meanAbsoluteDeviation.toFixed(4)} />
              <StatItem label="Skewness" value={stats.skewness.toFixed(4)} />
              <StatItem label="Q1 (25th Pct)" value={stats.q1.toString()} />
              <StatItem label="Q3 (75th Pct)" value={stats.q3.toString()} />
              <StatItem label="IQR" value={stats.iqr.toString()} />
              <StatItem label="Kurtosis" value={stats.kurtosis.toFixed(4)} />
            </div>
          </div>

          <StepByStepSolver data={dataset} stats={stats} />

        </div>
      )}

      {/* Educational Modules */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interactive Learning</h2>
          <QuizEngine />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Core Concepts</h2>
          <Flashcards />
        </div>
      </div>

    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="font-bold text-lg text-gray-900 dark:text-white truncate">{value}</p>
    </div>
  );
}
