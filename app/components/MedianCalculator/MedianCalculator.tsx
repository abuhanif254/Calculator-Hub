"use client";

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { 
  parseRawDataset, 
  parseFrequencyTable,
  expandFrequencyTable,
  parseGroupedData,
  estimateMedianGrouped,
  analyzeDatasetFull,
  interpretSkewness,
} from '@/lib/math/medianUtils';
import { AlertCircle, Calculator, Sigma, TrendingUp, BarChart, Info, DivideCircle, PieChart, Layers } from 'lucide-react';
import BoxPlotChart from './Visualizations/BoxPlotChart';
import SortedNumberLine from './Visualizations/SortedNumberLine';
import HistogramChart from './Visualizations/HistogramChart';
import StepByStepSolver from './StepByStepSolver';

type InputMode = 'raw-data' | 'frequency' | 'grouped';

export default function MedianCalculator() {
  const t = useTranslations('calculators.median');
  
  // State
  const [activeTab, setActiveTab] = useState<InputMode>('raw-data');
  const [rawDataInput, setRawDataInput] = useState('12 15 15 18 20 22 25 30 45');
  const [freqInput, setFreqInput] = useState('15, 2\n18, 3\n20, 1\n24, 4');
  const [groupedInput, setGroupedInput] = useState('0-10, 5\n10-20, 15\n20-30, 20\n30-40, 10');
  const [vizTab, setVizTab] = useState('boxplot');
  
  // Parsed and Calculated Data
  const { dataset, metrics, groupedMedian, isGrouped } = useMemo(() => {
    let parsed: number[] = [];
    let groupedMed: number | null = null;
    let isGrp = false;

    if (activeTab === 'raw-data') {
      parsed = parseRawDataset(rawDataInput);
    } else if (activeTab === 'frequency') {
      const table = parseFrequencyTable(freqInput);
      parsed = expandFrequencyTable(table);
    } else if (activeTab === 'grouped') {
      const groups = parseGroupedData(groupedInput);
      groupedMed = estimateMedianGrouped(groups);
      isGrp = true;
    }
    
    return {
      dataset: parsed,
      metrics: analyzeDatasetFull(parsed),
      groupedMedian: groupedMed,
      isGrouped: isGrp
    };
  }, [rawDataInput, freqInput, groupedInput, activeTab]);

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
            {t('inputDescription', { fallback: 'Enter your dataset to calculate the median, quartiles, and detect outliers.' })}
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
            <button 
              onClick={() => setActiveTab('grouped')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'grouped' ? 'bg-white dark:bg-gray-800 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
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
                placeholder="e.g. 12, 15, 15, 18, 20..."
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

          {activeTab === 'grouped' && (
            <div className="space-y-2">
              <label htmlFor="grouped-input" className="block text-sm font-medium">
                {t('pasteGrouped', { fallback: 'Enter Grouped Data (Class Intervals)' })}
              </label>
              <textarea 
                id="grouped-input"
                placeholder="0-10, 5\n10-20, 15"
                value={groupedInput}
                onChange={(e) => setGroupedInput(e.target.value)}
                className="w-full min-h-[120px] font-mono text-sm rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('groupedDescription', { fallback: 'Format: min-max, frequency (e.g. 10-20, 15)' })}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grouped Data Special View */}
      {isGrouped && groupedMedian !== null && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-sm p-6 text-center">
          <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-400 flex items-center justify-center gap-2 mb-4">
            <Layers className="h-4 w-4 text-indigo-500" />
            {t('estimatedMedian', { fallback: 'Estimated Median (Interpolated)' })}
          </h3>
          <div className="text-5xl font-bold text-indigo-800 dark:text-indigo-300">
            {groupedMedian.toFixed(4)}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            {t('groupedDisclaimer', { fallback: 'Note: Visualizations and detailed descriptive statistics are not available for grouped class intervals. Switch to Raw Data or Frequency Tables for a complete analysis.' })}
          </p>
        </div>
      )}

      {/* Error / Info States for Raw/Freq */}
      {!isGrouped && metrics.count === 0 && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">{t('invalidData', { fallback: 'Invalid Data' })}</h4>
            <p className="text-sm opacity-90 mt-1">{t('invalidDataDescription', { fallback: 'Please enter a valid numeric dataset.' })}</p>
          </div>
        </div>
      )}

      {/* Main Analysis View (Raw / Freq) */}
      {!isGrouped && metrics.count > 0 && (
        <>
          {/* Main Dashboard - Five Number Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 text-center">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                Minimum
              </h3>
              <div className="text-2xl font-bold">{metrics.min}</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 text-center">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                Q1 (25th)
              </h3>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{metrics.q1.toFixed(2)}</div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-500 dark:border-indigo-500 shadow-sm p-4 text-center transform scale-105 z-10">
              <h3 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-2 uppercase tracking-wide">
                Median (Q2)
              </h3>
              <div className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">{metrics.median.toFixed(2)}</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 text-center">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                Q3 (75th)
              </h3>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{metrics.q3.toFixed(2)}</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 text-center">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                Maximum
              </h3>
              <div className="text-2xl font-bold">{metrics.max}</div>
            </div>
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Descriptive Statistics Table */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold text-lg">{t('descriptiveStatistics', { fallback: 'Detailed Statistical Summary' })}</h3>
                <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">N = {metrics.count}</span>
              </div>
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-sm text-left h-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400 hidden">
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 h-full flex flex-col justify-between">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex w-full">
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 w-1/4">Mean (&mu;)</td>
                      <td className="px-6 py-4 text-right font-mono w-1/4 font-semibold text-emerald-600 dark:text-emerald-400">{metrics.mean.toFixed(4)}</td>
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 w-1/4 border-l border-gray-200 dark:border-gray-700">Mode</td>
                      <td className="px-6 py-4 text-right font-mono w-1/4">
                        {metrics.modes.length > 0 ? metrics.modes.join(', ') : 'None'}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/50 dark:bg-gray-900/20 flex w-full">
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 w-1/4">IQR</td>
                      <td className="px-6 py-4 text-right font-mono w-1/4">{metrics.iqr.toFixed(4)}</td>
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 w-1/4 border-l border-gray-200 dark:border-gray-700">Range</td>
                      <td className="px-6 py-4 text-right font-mono w-1/4">{metrics.range.toFixed(4)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex w-full">
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 w-1/4">Variance (Sample)</td>
                      <td className="px-6 py-4 text-right font-mono w-1/4">{metrics.varianceSample?.toFixed(4) || 'N/A'}</td>
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 w-1/4 border-l border-gray-200 dark:border-gray-700">Std Dev (Sample)</td>
                      <td className="px-6 py-4 text-right font-mono w-1/4">{metrics.standardDeviationSample?.toFixed(4) || 'N/A'}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/50 dark:bg-gray-900/20 flex w-full">
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 w-1/4">Skewness</td>
                      <td className="px-6 py-4 text-right font-mono w-1/4">
                        {metrics.skewness !== null ? metrics.skewness.toFixed(4) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 w-1/4 border-l border-gray-200 dark:border-gray-700">Kurtosis</td>
                      <td className="px-6 py-4 text-right font-mono w-1/4">
                        {metrics.kurtosis !== null ? metrics.kurtosis.toFixed(4) : 'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interpretation Engine */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
              <div className="p-4 border-b border-gray-100 dark:border-gray-750 flex items-center gap-2">
                <Info className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-lg">{t('interpretation', { fallback: 'Dataset Insights' })}</h3>
              </div>
              <div className="p-6 flex flex-col gap-6 flex-grow">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
                    <span>Mean vs Median</span>
                    {metrics.mean > metrics.median ? <TrendingUp className="h-4 w-4 text-red-500"/> : <TrendingUp className="h-4 w-4 text-emerald-500 transform rotate-180"/>}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {metrics.skewness !== null ? (
                      <>
                        The dataset is <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t(`skew_${interpretSkewness(metrics.skewness)}`, { fallback: interpretSkewness(metrics.skewness).replace(/_/g, ' ') })}</span>. 
                        {metrics.mean > metrics.median 
                          ? " The Mean is greater than the Median, suggesting the right tail (higher values) is pulling the average up." 
                          : metrics.mean < metrics.median 
                            ? " The Mean is less than the Median, suggesting the left tail (lower values) is pulling the average down."
                            : " The Mean and Median are identical, indicating a perfectly symmetric distribution."}
                      </>
                    ) : "Insufficient data for skewness comparison."}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Outlier Analysis</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {metrics.outliers.length > 0 ? (
                      <>
                        Detected <strong className="text-red-500">{metrics.outliers.length} outlier(s)</strong> using Tukey's fences (1.5 × IQR).
                        The Median is a <em>robust</em> statistic, meaning it accurately represents the center despite these outliers: {metrics.outliers.slice(0, 5).join(', ')}{metrics.outliers.length > 5 ? '...' : ''}.
                      </>
                    ) : (
                      "No outliers were detected. The Mean and Median should both be reliable indicators of central tendency."
                    )}
                  </p>
                </div>
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
                  onClick={() => setVizTab('boxplot')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'boxplot' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Box Plot
                </button>
                <button 
                  onClick={() => setVizTab('dotplot')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'dotplot' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Sorted Number Line
                </button>
                <button 
                  onClick={() => setVizTab('histogram')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'histogram' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Histogram
                </button>
              </div>
              
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

              {vizTab === 'dotplot' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <SortedNumberLine data={dataset} median={metrics.median} q1={metrics.q1} q3={metrics.q3} mean={metrics.mean} />
                </div>
              )}

              {vizTab === 'histogram' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <HistogramChart data={dataset} median={metrics.median} mean={metrics.mean} />
                </div>
              )}
            </div>
          </div>

          {/* Step-by-Step Educational Component */}
          <StepByStepSolver 
            data={dataset} 
            median={metrics.median}
          />
        </>
      )}

    </div>
  );
}
