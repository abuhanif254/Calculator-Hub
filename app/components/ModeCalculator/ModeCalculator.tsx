"use client";

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { 
  parseRawDataset, 
  parseFrequencyTable,
  expandFrequencyTable,
  parseGroupedData,
  estimateModeGrouped,
  analyzeModeDataset,
} from '@/lib/math/modeUtils';
import { AlertCircle, Calculator, TrendingUp, BarChart, Info, Layers, CheckCircle2 } from 'lucide-react';
import FrequencyBarChart from './Visualizations/FrequencyBarChart';
import StemAndLeafPlot from './Visualizations/StemAndLeafPlot';
import HistogramChart from './Visualizations/HistogramChart';
import StepByStepSolver from './StepByStepSolver';

type InputMode = 'raw-data' | 'frequency' | 'grouped';

export default function ModeCalculator() {
  const t = useTranslations('calculators.mode');
  
  // State
  const [activeTab, setActiveTab] = useState<InputMode>('raw-data');
  const [rawDataInput, setRawDataInput] = useState('12 15 15 15 18 20 20 20 22 25 30');
  const [freqInput, setFreqInput] = useState('15, 3\n18, 1\n20, 3\n24, 1');
  const [groupedInput, setGroupedInput] = useState('0-10, 5\n10-20, 20\n20-30, 15\n30-40, 10');
  const [vizTab, setVizTab] = useState('barchart');
  
  // Parsed and Calculated Data
  const { dataset, metrics, groupedMode, isGrouped } = useMemo(() => {
    let parsed: number[] = [];
    let groupedMod: number | null = null;
    let isGrp = false;

    if (activeTab === 'raw-data') {
      parsed = parseRawDataset(rawDataInput);
    } else if (activeTab === 'frequency') {
      const table = parseFrequencyTable(freqInput);
      parsed = expandFrequencyTable(table);
    } else if (activeTab === 'grouped') {
      const groups = parseGroupedData(groupedInput);
      groupedMod = estimateModeGrouped(groups);
      isGrp = true;
    }
    
    return {
      dataset: parsed,
      metrics: analyzeModeDataset(parsed),
      groupedMode: groupedMod,
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
            {t('inputDescription', { fallback: 'Enter your dataset to calculate modes, generate frequency tables, and analyze the distribution.' })}
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
                placeholder="Value, Frequency (e.g. 15, 3)"
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
      {isGrouped && groupedMode !== null && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-sm p-6 text-center">
          <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-400 flex items-center justify-center gap-2 mb-4">
            <Layers className="h-4 w-4 text-indigo-500" />
            {t('estimatedMode', { fallback: 'Estimated Mode (Grouped Class Formula)' })}
          </h3>
          <div className="text-5xl font-bold text-indigo-800 dark:text-indigo-300">
            {groupedMode.toFixed(4)}
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
          {/* Main Dashboard - Mode Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-500 dark:border-indigo-500 shadow-sm p-6 text-center md:col-span-2 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
              <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 mb-2 uppercase tracking-wide">
                Mode Value(s)
              </h3>
              <div className="text-4xl md:text-5xl font-bold text-indigo-800 dark:text-indigo-300 my-4 break-words">
                {metrics.modalityType === 'no-mode' ? (
                  <span className="text-gray-500 dark:text-gray-400 italic text-3xl">No Mode Detected</span>
                ) : (
                  metrics.modes.join(', ')
                )}
              </div>
              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold border border-indigo-100 dark:border-indigo-800 shadow-sm">
                  {metrics.modalityType === 'no-mode' ? 'Uniform/Flat Distribution' : 
                   metrics.modalityType === 'uni-modal' ? 'Uni-Modal' : 
                   metrics.modalityType === 'bi-modal' ? 'Bi-Modal' : 'Multi-Modal'}
                </span>
                {metrics.highestFrequency > 1 && (
                   <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold shadow-sm">
                     Frequency: {metrics.highestFrequency}
                   </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 text-center flex-grow flex flex-col justify-center">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase">
                  Mean (&mu;)
                </h3>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{metrics.mean.toFixed(2)}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 text-center flex-grow flex flex-col justify-center">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase">
                  Median
                </h3>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{metrics.median.toFixed(2)}</div>
              </div>
            </div>
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Frequency Distribution Table */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-indigo-500" />
                  {t('frequencyTableTitle', { fallback: 'Frequency Distribution Table' })}
                </h3>
                <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">N = {metrics.count}</span>
              </div>
              <div className="overflow-auto max-h-[350px] custom-scrollbar relative">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 sticky top-0 z-10 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300">Value (x)</th>
                      <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Frequency (f)</th>
                      <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Relative Freq</th>
                      <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Cumulative Freq</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {metrics.frequencyTable.map((row, i) => {
                      const isMode = metrics.modes.includes(row.value);
                      return (
                        <tr key={i} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${isMode ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                          <td className="px-6 py-3 font-mono text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            {row.value}
                            {isMode && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />}
                          </td>
                          <td className={`px-6 py-3 text-right font-mono ${isMode ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            {row.frequency}
                          </td>
                          <td className="px-6 py-3 text-right font-mono text-gray-500 dark:text-gray-400">
                            {(row.relativeFrequency * 100).toFixed(1)}%
                          </td>
                          <td className="px-6 py-3 text-right font-mono text-gray-500 dark:text-gray-400">
                            {row.cumulativeFrequency}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interpretation Engine */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
              <div className="p-4 border-b border-gray-100 dark:border-gray-750 flex items-center gap-2">
                <Info className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-lg">{t('interpretation', { fallback: 'Distribution Insights' })}</h3>
              </div>
              <div className="p-6 flex flex-col gap-6 flex-grow">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
                    <span>Modality Analysis</span>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {metrics.modalityType === 'no-mode' && "This dataset has no distinct mode. All values occur with the same frequency, suggesting a uniform or flat distribution."}
                    {metrics.modalityType === 'uni-modal' && "This dataset is uni-modal, meaning it has exactly one central peak. The most frequent value represents the standard concentration of data."}
                    {metrics.modalityType === 'bi-modal' && "This dataset is bi-modal, meaning it has two distinct peaks. This often suggests the presence of two different groups or populations within the data."}
                    {metrics.modalityType === 'multi-modal' && "This dataset is multi-modal with 3 or more peaks. The data is heavily segmented into several high-frequency clusters."}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Central Tendency Relationship</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {metrics.modalityType !== 'no-mode' && metrics.modes.length === 1 ? (
                      <>
                        The Mean is <strong>{metrics.mean.toFixed(2)}</strong>, Median is <strong>{metrics.median.toFixed(2)}</strong>, and Mode is <strong>{metrics.modes[0]}</strong>.
                        {metrics.mean > metrics.median && metrics.median > metrics.modes[0] ? " The order (Mean > Median > Mode) strongly indicates a right-skewed distribution." : ""}
                        {metrics.mean < metrics.median && metrics.median < metrics.modes[0] ? " The order (Mean < Median < Mode) strongly indicates a left-skewed distribution." : ""}
                        {Math.abs(metrics.mean - metrics.median) < 0.01 && Math.abs(metrics.median - metrics.modes[0]) < 0.01 ? " The Mean, Median, and Mode are nearly identical, indicating a perfectly symmetrical (normal) distribution." : ""}
                      </>
                    ) : (
                      "With multiple modes (or no mode), comparing Mean, Median, and Mode to determine skewness is less straightforward. Review the visual distributions for a clearer picture."
                    )}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Visualizations Tab */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg">{t('visualizations', { fallback: 'Interactive Visualizations' })}</h3>
            </div>
            <div className="p-6">
              <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                <button 
                  onClick={() => setVizTab('barchart')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'barchart' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Frequency Bar Chart
                </button>
                <button 
                  onClick={() => setVizTab('histogram')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'histogram' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Histogram
                </button>
                <button 
                  onClick={() => setVizTab('stemleaf')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${vizTab === 'stemleaf' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Stem-and-Leaf Plot
                </button>
              </div>
              
              {vizTab === 'barchart' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <FrequencyBarChart 
                    frequencyTable={metrics.frequencyTable} 
                    modes={metrics.modes}
                  />
                </div>
              )}

              {vizTab === 'histogram' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <HistogramChart 
                    data={dataset} 
                    median={metrics.median} 
                    mean={metrics.mean} 
                    modes={metrics.modes}
                  />
                </div>
              )}

              {vizTab === 'stemleaf' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <StemAndLeafPlot 
                    data={dataset} 
                    modes={metrics.modes}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Step-by-Step Educational Component */}
          <StepByStepSolver 
            data={dataset} 
            metrics={metrics}
          />
        </>
      )}

    </div>
  );
}
