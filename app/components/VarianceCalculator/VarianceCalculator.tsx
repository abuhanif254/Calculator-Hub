"use client";

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { parseRawDataset, analyzeDataset, interpretVariability } from '@/lib/math/varianceUtils';
import { AlertCircle, Calculator, Sigma, TrendingUp, BarChart, Info } from 'lucide-react';
import HistogramChart from './Visualizations/HistogramChart';
import BoxPlotChart from './Visualizations/BoxPlotChart';
import StepByStepSolver from './StepByStepSolver';

export default function VarianceCalculator() {
  const t = useTranslations('calculators.variance');
  
  // State
  const [activeTab, setActiveTab] = useState('raw-data');
  const [rawDataInput, setRawDataInput] = useState('12, 18, 20, 25, 17, 22, 19, 24, 21, 15');
  const [vizTab, setVizTab] = useState('histogram');
  
  // Parsed and Calculated Data
  const { dataset, metrics } = useMemo(() => {
    let parsed: number[] = [];
    if (activeTab === 'raw-data') {
      parsed = parseRawDataset(rawDataInput);
    }
    
    return {
      dataset: parsed,
      metrics: analyzeDataset(parsed)
    };
  }, [rawDataInput, activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-500/10 shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-500/5 border-b border-blue-500/10">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            {t('inputData')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t('inputDescription')}
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg inline-flex">
            <button 
              onClick={() => setActiveTab('raw-data')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'raw-data' ? 'bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {t('rawDataset')}
            </button>
            <button disabled className="px-4 py-2 text-sm font-medium rounded-md text-gray-400 opacity-50 cursor-not-allowed">
              {t('frequencyTable')}
            </button>
            <button disabled className="px-4 py-2 text-sm font-medium rounded-md text-gray-400 opacity-50 cursor-not-allowed">
              {t('groupedData')}
            </button>
          </div>
          
          {activeTab === 'raw-data' && (
            <div className="space-y-2">
              <label htmlFor="raw-data-input" className="block text-sm font-medium">
                {t('pasteDataset')}
              </label>
              <textarea 
                id="raw-data-input"
                placeholder="e.g. 1.2, 3.4, 5.6..."
                value={rawDataInput}
                onChange={(e) => setRawDataInput(e.target.value)}
                className="w-full min-h-[120px] font-mono text-sm rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('pasteDescription')}
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
            <h4 className="font-semibold">{t('invalidData')}</h4>
            <p className="text-sm opacity-90 mt-1">{t('invalidDataDescription')}</p>
          </div>
        </div>
      )}

      {metrics.count === 1 && (
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
          <Info className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">{t('singlePoint')}</h4>
            <p className="text-sm opacity-90 mt-1">{t('singlePointDescription')}</p>
          </div>
        </div>
      )}

      {metrics.count > 0 && (
        <>
          {/* Main Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2 mb-4">
                <Sigma className="h-4 w-4 text-blue-500" />
                {t('populationVariance')} (&sigma;&sup2;)
              </h3>
              <div className="text-4xl font-bold">
                {metrics.populationVariance.toFixed(4)}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {t('populationVarianceDesc')}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm p-6">
              <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                {t('sampleVariance')} (s&sup2;)
              </h3>
              <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                {metrics.sampleVariance !== null ? metrics.sampleVariance.toFixed(4) : 'N/A'}
              </div>
              <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-2">
                {t('sampleVarianceDesc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2 mb-4">
                <BarChart className="h-4 w-4 text-purple-500" />
                {t('standardDeviation')} (s)
              </h3>
              <div className="text-4xl font-bold">
                {metrics.sampleStandardDeviation !== null ? metrics.sampleStandardDeviation.toFixed(4) : 'N/A'}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {t('standardDeviationDesc')}
              </p>
            </div>
            
          </div>

          {/* Descriptive Statistics Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg">{t('descriptiveStatistics')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3 font-medium">{t('metric')}</th>
                    <th className="px-6 py-3 font-medium text-right">{t('value')}</th>
                    <th className="px-6 py-3 font-medium">{t('metric')}</th>
                    <th className="px-6 py-3 font-medium text-right">{t('value')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('count')} (N)</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.count}</td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('mean')} (&mu;)</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.mean.toFixed(4)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/50 dark:bg-gray-900/20">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('minimum')}</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.min}</td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('median')} (Q2)</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.median}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('maximum')}</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.max}</td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('mode')}</td>
                    <td className="px-6 py-4 text-right font-mono">
                      {metrics.modes.length > 0 ? metrics.modes.join(', ') : t('noMode')}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/50 dark:bg-gray-900/20">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('range')}</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.range}</td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('iqr')}</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.iqr}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('cv')}</td>
                    <td className="px-6 py-4 text-right font-mono">
                      {metrics.coefficientOfVariationSample !== null ? `${metrics.coefficientOfVariationSample.toFixed(2)}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{t('mad')}</td>
                    <td className="px-6 py-4 text-right font-mono">{metrics.meanAbsoluteDeviation.toFixed(4)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Outliers & Interpretation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-750">
                <h3 className="font-semibold text-lg">{t('outliers')}</h3>
              </div>
              <div className="p-6">
                {metrics.outliers.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">{t('outliersFound', { count: metrics.outliers.length })}</p>
                    <div className="flex flex-wrap gap-2">
                      {metrics.outliers.map((outlier, i) => (
                         <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm font-mono border border-red-200 dark:border-red-800">
                           {outlier}
                         </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">{t('noOutliers')}</p>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-750">
                <h3 className="font-semibold text-lg">{t('variabilityInterpretation')}</h3>
              </div>
              <div className="p-6">
                {metrics.coefficientOfVariationSample !== null ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                       {t(`interp_${interpretVariability(metrics.coefficientOfVariationSample).replace(' ', '')}`)}
                    </p>
                    <p className="text-sm text-gray-500">
                       {t('variabilityDesc', { cv: metrics.coefficientOfVariationSample.toFixed(1) })}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">N/A</p>
                )}
              </div>
            </div>
          </div>

          {/* Visualizations Tab */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg">{t('visualizations')}</h3>
            </div>
            <div className="p-6">
              <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-6">
                <button 
                  onClick={() => setVizTab('histogram')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors ${vizTab === 'histogram' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  {t('histogram')}
                </button>
                <button 
                  onClick={() => setVizTab('boxplot')}
                  className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors ${vizTab === 'boxplot' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  {t('boxPlot')}
                </button>
              </div>
              
              {vizTab === 'histogram' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <HistogramChart data={dataset} />
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
            mean={metrics.mean} 
            sumOfSquares={metrics.sumOfSquares} 
            populationVariance={metrics.populationVariance} 
            sampleVariance={metrics.sampleVariance} 
          />
        </>
      )}

    </div>
  );
}
