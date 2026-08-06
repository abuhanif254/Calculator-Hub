"use client";

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { 
  parseRawDataset, 
  parseFrequencyTable,
  expandFrequencyTable,
  analyzeDatasetFull,
  interpretSkewness,
  interpretKurtosis
} from '@/lib/math/meanUtils';
import { AlertCircle, Calculator, Sigma, TrendingUp, BarChart, Info, Scale, PieChart } from 'lucide-react';
import HistogramChart from './Visualizations/HistogramChart';
import DotPlot from './Visualizations/DotPlot';
import BoxPlotChart from './Visualizations/BoxPlotChart';
import StepByStepSolver from './StepByStepSolver';

type InputMode = 'raw-data' | 'frequency' | 'grouped' | 'weighted';

export default function MeanCalculator() {
  const t = useTranslations('calculators.mean');
  
  // State
  const [activeTab, setActiveTab] = useState<InputMode>('raw-data');
  const [rawDataInput, setRawDataInput] = useState('15 18 20 24 31');
  const [freqInput, setFreqInput] = useState('15, 2\n18, 3\n20, 1\n24, 4');
  const [vizTab, setVizTab] = useState('histogram');
  const [solverType, setSolverType] = useState('arithmetic');
  
  // Parsed and Calculated Data
  const { dataset, metrics } = useMemo(() => {
    let parsed: number[] = [];
    if (activeTab === 'raw-data') {
      parsed = parseRawDataset(rawDataInput);
    } else if (activeTab === 'frequency') {
      const table = parseFrequencyTable(freqInput);
      parsed = expandFrequencyTable(table);
    }
    
    return {
      dataset: parsed,
      metrics: analyzeDatasetFull(parsed)
    };
  }, [rawDataInput, freqInput, activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-indigo-500/10 shadow-lg overflow-hidden">
        <div className="p-6 bg-indigo-500/5 border-b border-indigo-500/10">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <Calculator className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            {t('inputData', { fallback: 'Dataset Input' })}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t('inputDescription', { fallback: 'Enter your dataset to calculate various means and analyze the distribution.' })}
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg inline-flex">
            <button 
              onClick={() => setActiveTab('raw-data')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'raw-data' ? 'bg-white dark:bg-gray-800 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {t('rawDataset', { fallback: 'Raw Dataset' })}
            </button>
            <button 
              onClick={() => setActiveTab('frequency')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'frequency' ? 'bg-white dark:bg-gray-800 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {t('frequencyTable', { fallback: 'Frequency Table' })}
            </button>
            <button disabled className="px-4 py-2 text-sm font-medium rounded-md text-gray-400 opacity-50 cursor-not-allowed">
              {t('groupedData', { fallback: 'Grouped Data' })}
            </button>
          </div>
          
          {activeTab === 'raw-data' && (
            <div className="space-y-2">
              <label htmlFor="raw-data-input" className="block text-sm font-medium">
                {t('pasteDataset', { fallback: 'Paste or type dataset' })}
              </label>
              <textarea 
                id="raw-data-input"
                placeholder="e.g. 15, 18, 20, 24, 31"
                value={rawDataInput}
                onChange={(e) => setRawDataInput(e.target.value)}
                className="w-full min-h-[120px] font-mono text-sm rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('pasteDescription', { fallback: 'Values can be separated by spaces, commas, or new lines.' })}
              </p>
            </div>
          )}

          {activeTab === 'frequency' && (
            <div className="space-y-2">
              <label htmlFor="freq-input" className="block text-sm font-medium">
                {t('pasteFreqTable', { fallback: 'Enter Frequency Table' })}
              </label>
              <textarea 
                id="freq-input"
                placeholder="Value, Frequency (e.g. 15, 2)"
                value={freqInput}
                onChange={(e) => setFreqInput(e.target.value)}
                className="w-full min-h-[120px] font-mono text-sm rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('freqDescription', { fallback: 'Enter value and frequency separated by comma or space on each line.' })}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error / Info States */}
      {metrics.count === 0 && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">{t('invalidData', { fallback: 'Invalid Data' })}</h4>
            <p className="text-sm opacity-90 mt-1">{t('invalidDataDescription', { fallback: 'Please enter a valid numeric dataset.' })}</p>
          </div>
        </div>
      )}

      {metrics.count > 0 && (
        <>
          {/* Main Dashboard - Central Tendency */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-4">
                <Sigma className="h-4 w-4 text-indigo-500" />
                {t('arithmeticMean', { fallback: 'Arithmetic Mean' })} (&mu;)
              </h3>
              <div className="text-3xl font-bold">
                {metrics.arithmeticMean.toFixed(4)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-4">
                <PieChart className="h-4 w-4 text-emerald-500" />
                {t('geometricMean', { fallback: 'Geometric Mean' })}
              </h3>
              <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                {metrics.geometricMean !== null ? metrics.geometricMean.toFixed(4) : 'N/A'}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-4">
                <Scale className="h-4 w-4 text-purple-500" />
                {t('harmonicMean', { fallback: 'Harmonic Mean' })}
              </h3>
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                {metrics.harmonicMean !== null ? metrics.harmonicMean.toFixed(4) : 'N/A'}
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-sm p-6">
              <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-400 flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-indigo-500" />
                {t('median', { fallback: 'Median' })}
              </h3>
              <div className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">
                {metrics.median}
              </div>
            </div>
            
          </div>

          {/* Descriptive Statistics Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg">{t('descriptiveStatistics', { fallback: 'Detailed Statistical Summary' })}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3 font-medium">{t('metric', { fallback: 'Metric' })}</th>
                    <th className="px-6 py-3 font-medium text-right">{t('value', { fallback: 'Value' })}</th>
                    <th className="px-6 py-3 font-medium">{t('metric', { fallback: 'Metric' })}</th>
                    <th className="px-6 py-3 font-medium text-right">{t('value', { fallback: 'Value' })}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Count (N)</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.count}</td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Mode</td>
                    <td className="px-6 py-4 text-right font-mono">
                      {metrics.modes.length > 0 ? metrics.modes.join(', ') : 'None'}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/50 dark:bg-gray-900/20">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Minimum</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.min}</td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Maximum</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.max}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Variance (Sample)</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.varianceSample?.toFixed(4) || 'N/A'}</td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Std Deviation (Sample)</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.standardDeviationSample?.toFixed(4) || 'N/A'}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/50 dark:bg-gray-900/20">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Skewness</td>
                    <td className="px-6 py-4 text-right font-mono">
                      {metrics.skewness !== null ? metrics.skewness.toFixed(4) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Kurtosis</td>
                    <td className="px-6 py-4 text-right font-mono">
                      {metrics.kurtosis !== null ? metrics.kurtosis.toFixed(4) : 'N/A'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interpretation Engine */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-750 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-lg">{t('interpretation', { fallback: 'Statistical Interpretation' })}</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Shape & Skewness</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {metrics.skewness !== null ? (
                    <>
                      The dataset has a skewness of <strong>{metrics.skewness.toFixed(2)}</strong>. This indicates that the distribution is <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t(`skew_${interpretSkewness(metrics.skewness)}`, { fallback: interpretSkewness(metrics.skewness).replace(/_/g, ' ') })}</span>. 
                      {Math.abs(metrics.skewness) > 0.5 ? " The arithmetic mean is being pulled towards the tail, making the median a potentially better measure of central tendency." : " The mean and median should be fairly close to each other."}
                    </>
                  ) : "Insufficient data to calculate skewness."}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Outliers Influence</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {metrics.outliers.length > 0 ? (
                    <>
                      We detected <strong>{metrics.outliers.length} outlier(s)</strong>: {metrics.outliers.join(', ')}. 
                      Outliers strongly affect the arithmetic mean. In this case, you might prefer the median or a trimmed mean for a more robust average.
                    </>
                  ) : (
                    "No significant outliers were detected using Tukey's fences (1.5 IQR rule). The arithmetic mean represents the dataset well."
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Visualizations Tab */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg">{t('visualizations', { fallback: 'Distribution Visualizations' })}</h3>
            </div>
            <div className="p-6">
              <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                <button 
                  onClick={() => setVizTab('dotplot')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'dotplot' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Dot Plot / Number Line
                </button>
                <button 
                  onClick={() => setVizTab('histogram')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'histogram' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Histogram
                </button>
                <button 
                  onClick={() => setVizTab('boxplot')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'boxplot' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Box Plot
                </button>
              </div>
              
              {vizTab === 'dotplot' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <DotPlot data={dataset} mean={metrics.arithmeticMean} median={metrics.median} />
                </div>
              )}

              {vizTab === 'histogram' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <HistogramChart data={dataset} mean={metrics.arithmeticMean} />
                </div>
              )}

              {vizTab === 'boxplot' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <BoxPlotChart 
                    data={dataset} 
                    q1={metrics.q1} 
                    median={metrics.median} 
                    q3={metrics.q3} 
                    min={metrics.min} 
                    max={metrics.max} 
                    outliers={metrics.outliers} 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Step-by-Step Educational Component */}
          <StepByStepSolver 
            data={dataset} 
            metrics={metrics}
            solverType={solverType}
            setSolverType={setSolverType}
          />
        </>
      )}

    </div>
  );
}
