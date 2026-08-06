'use client';

import React from 'react';
import { DispersionStats } from '@/lib/calculators/standardDeviation';
import { Target, TrendingDown, TrendingUp, Equal, AlertTriangle, Layers } from 'lucide-react';

interface DatasetAnalyzerProps {
  stats: DispersionStats;
}

export default function DatasetAnalyzer({ stats }: DatasetAnalyzerProps) {
  
  // Analyze Skewness
  const getSkewnessAnalysis = () => {
    const s = stats.skewness;
    if (Math.abs(s) < 0.5) {
      return { 
        label: "Fairly Symmetrical", 
        icon: Equal, 
        color: "text-emerald-500", 
        desc: "The data is relatively evenly distributed around the mean." 
      };
    } else if (s > 0) {
      return { 
        label: "Right-Skewed (Positive)", 
        icon: TrendingUp, 
        color: "text-amber-500", 
        desc: "The tail on the right side is longer or fatter than the left side. The mean is greater than the median." 
      };
    } else {
      return { 
        label: "Left-Skewed (Negative)", 
        icon: TrendingDown, 
        color: "text-blue-500", 
        desc: "The tail on the left side is longer or fatter than the right side. The mean is less than the median." 
      };
    }
  };

  // Analyze Kurtosis
  const getKurtosisAnalysis = () => {
    const k = stats.kurtosis; // Excess kurtosis (baseline 0)
    if (Math.abs(k) < 0.5) {
      return { 
        label: "Mesokurtic (Normal)", 
        desc: "The distribution has tails similar to a normal distribution (no extreme outliers expected)." 
      };
    } else if (k > 0) {
      return { 
        label: "Leptokurtic (Heavy Tails)", 
        desc: "The distribution has heavy tails and a sharper peak. High likelihood of extreme outliers." 
      };
    } else {
      return { 
        label: "Platykurtic (Light Tails)", 
        desc: "The distribution has light tails and a flatter peak. Fewer extreme outliers than a normal distribution." 
      };
    }
  };

  // Analyze CV
  const getCVAnalysis = () => {
    const cv = stats.coefficientOfVariationSample;
    if (cv < 15) {
      return { label: "Low Variance", desc: "The data points are highly consistent and close to the mean." };
    } else if (cv < 30) {
      return { label: "Moderate Variance", desc: "The data points show moderate dispersion around the mean." };
    } else {
      return { label: "High Variance", desc: "The data points are highly dispersed and volatile relative to the mean." };
    }
  };

  const skew = getSkewnessAnalysis();
  const kurt = getKurtosisAnalysis();
  const cv = getCVAnalysis();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
        <Target className="w-5 h-5 text-indigo-500" />
        <h3 className="font-bold text-lg">Dataset Intelligence</h3>
      </div>

      <div className="space-y-6">
        
        {/* Skewness */}
        <div className="flex gap-4">
          <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shrink-0 ${skew.color}`}>
            <skew.icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Shape: {skew.label}
              <span className="text-xs font-normal text-gray-500 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                Skew = {stats.skewness.toFixed(3)}
              </span>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{skew.desc}</p>
          </div>
        </div>

        {/* Kurtosis */}
        <div className="flex gap-4">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shrink-0 text-purple-500">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Tails: {kurt.label}
              <span className="text-xs font-normal text-gray-500 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                Kurtosis = {stats.kurtosis.toFixed(3)}
              </span>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{kurt.desc}</p>
          </div>
        </div>

        {/* CV */}
        <div className="flex gap-4">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shrink-0 text-orange-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Volatility: {cv.label}
              <span className="text-xs font-normal text-gray-500 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                CV = {stats.coefficientOfVariationSample.toFixed(2)}%
              </span>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cv.desc}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
