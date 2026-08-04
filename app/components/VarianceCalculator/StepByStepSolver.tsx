"use client";

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StepByStepSolverProps {
  data: number[];
  mean: number;
  sumOfSquares: number;
  populationVariance: number;
  sampleVariance: number | null;
}

export default function StepByStepSolver({ data, mean, sumOfSquares, populationVariance, sampleVariance }: StepByStepSolverProps) {
  const t = useTranslations('calculators.variance.steps');
  
  const [openStep, setOpenStep] = useState<string | null>('step-1');

  const toggleStep = (step: string) => {
    setOpenStep(openStep === step ? null : step);
  };

  // We only show the first 5 and last 5 elements if the dataset is large to save space.
  const displayData = useMemo(() => {
    if (data.length <= 10) return data;
    return [...data.slice(0, 5), null, ...data.slice(data.length - 5)];
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-lg">{t('title')}</h3>
      </div>
      <div className="p-4 sm:p-6">
        <div className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
          
          {/* Step 1: Calculate Mean */}
          <div className="py-4">
            <button 
              onClick={() => toggleStep('step-1')}
              className="flex items-center justify-between w-full text-left font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>1. {t('calculateMean')}</span>
              {openStep === 'step-1' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {openStep === 'step-1' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>{t('meanDescription')}</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto text-center border border-gray-100 dark:border-gray-800">
                  <div className="text-lg font-serif italic mb-2 text-black dark:text-white">
                     &mu; = (&Sigma; x&#x2092;) / N
                  </div>
                  <div className="text-sm mt-4 font-mono break-all text-black dark:text-white">
                    &mu; = ({displayData.map(d => d === null ? '...' : d).join(' + ')}) / {data.length}
                  </div>
                  <div className="font-bold text-lg mt-2 text-blue-600 dark:text-blue-400">
                    &mu; = {mean.toFixed(4)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Find Deviations & Square them */}
          <div className="py-4">
            <button 
              onClick={() => toggleStep('step-2')}
              className="flex items-center justify-between w-full text-left font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>2. {t('calculateDeviations')}</span>
              {openStep === 'step-2' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {openStep === 'step-2' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>{t('deviationsDescription')}</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto border border-gray-100 dark:border-gray-800">
                   <div className="text-lg font-serif italic mb-2 text-center text-black dark:text-white">
                      (x&#x2092; - &mu;)&sup2;
                   </div>
                   <table className="w-full mt-4 text-sm text-left">
                     <thead>
                       <tr className="border-b border-gray-200 dark:border-gray-700 text-black dark:text-white">
                         <th className="py-2">x</th>
                         <th className="py-2">x - &mu;</th>
                         <th className="py-2">(x - &mu;)&sup2;</th>
                       </tr>
                     </thead>
                     <tbody className="text-gray-600 dark:text-gray-300">
                       {displayData.map((val, idx) => {
                         if (val === null) {
                           return (
                             <tr key="ellipsis">
                               <td className="py-2">...</td>
                               <td className="py-2">...</td>
                               <td className="py-2">...</td>
                             </tr>
                           );
                         }
                         const dev = val - mean;
                         const sq = dev * dev;
                         return (
                           <tr key={idx} className="border-b border-gray-200 dark:border-gray-700/50">
                             <td className="py-2 font-mono">{val}</td>
                             <td className="py-2 font-mono">{dev.toFixed(4)}</td>
                             <td className="py-2 font-mono text-blue-600 dark:text-blue-400 font-medium">{sq.toFixed(4)}</td>
                           </tr>
                         );
                       })}
                     </tbody>
                   </table>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Sum of Squares */}
          <div className="py-4">
            <button 
              onClick={() => toggleStep('step-3')}
              className="flex items-center justify-between w-full text-left font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>3. {t('sumOfSquares')}</span>
              {openStep === 'step-3' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {openStep === 'step-3' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>{t('sumOfSquaresDesc')}</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                  <div className="text-lg font-serif italic mb-2 text-black dark:text-white">
                     SS = &Sigma; (x&#x2092; - &mu;)&sup2;
                  </div>
                  <div className="font-bold text-lg mt-4 text-blue-600 dark:text-blue-400">
                    SS = {sumOfSquares.toFixed(4)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Population Variance */}
          <div className="py-4">
            <button 
              onClick={() => toggleStep('step-4')}
              className="flex items-center justify-between w-full text-left font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>4. {t('popVariance')}</span>
              {openStep === 'step-4' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {openStep === 'step-4' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>{t('popVarianceDesc')}</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                  <div className="text-lg font-serif italic mb-2 text-black dark:text-white">
                     &sigma;&sup2; = SS / N
                  </div>
                  <div className="text-sm mt-4 font-mono text-black dark:text-white">
                    &sigma;&sup2; = {sumOfSquares.toFixed(4)} / {data.length}
                  </div>
                  <div className="font-bold text-xl mt-2 text-blue-600 dark:text-blue-400">
                    &sigma;&sup2; = {populationVariance.toFixed(4)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 5: Sample Variance */}
          {sampleVariance !== null && (
            <div className="py-4">
              <button 
                onClick={() => toggleStep('step-5')}
                className="flex items-center justify-between w-full text-left font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>5. {t('sampleVariance')} (Bessel's Correction)</span>
                {openStep === 'step-5' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openStep === 'step-5' && (
                <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                  <p>{t('sampleVarianceDesc')}</p>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                    <div className="text-lg font-serif italic mb-2 text-black dark:text-white">
                       s&sup2; = SS / (N - 1)
                    </div>
                    <div className="text-sm mt-4 font-mono text-black dark:text-white">
                      s&sup2; = {sumOfSquares.toFixed(4)} / ({data.length} - 1)
                    </div>
                    <div className="font-bold text-xl mt-2 text-blue-600 dark:text-blue-400">
                      s&sup2; = {sampleVariance.toFixed(4)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
