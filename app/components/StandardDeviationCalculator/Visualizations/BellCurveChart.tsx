'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface BellCurveChartProps {
  mean: number;
  sd: number; // usually population SD for theoretical bell curve, but sample works for approximation
}

export default function BellCurveChart({ mean, sd }: BellCurveChartProps) {
  const t = useTranslations('Calculators.StandardDeviation');

  // If SD is 0 or invalid, we can't draw a meaningful curve
  if (!sd || sd <= 0 || isNaN(mean) || isNaN(sd)) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 h-64">
        <p className="text-slate-500 dark:text-slate-400">
          Cannot generate bell curve. Standard deviation must be greater than zero.
        </p>
      </div>
    );
  }

  // Generate data points for Normal Distribution PDF
  const data = [];
  const minX = mean - 4 * sd;
  const maxX = mean + 4 * sd;
  const step = (maxX - minX) / 100;

  for (let x = minX; x <= maxX; x += step) {
    // Normal Distribution PDF formula
    const exponent = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(sd, 2)));
    const y = (1 / (sd * Math.sqrt(2 * Math.PI))) * exponent;
    
    // Group into standard deviation bands
    let band = 'outside';
    if (x >= mean - sd && x <= mean + sd) band = '1sd';
    else if (x >= mean - 2 * sd && x <= mean + 2 * sd) band = '2sd';
    else if (x >= mean - 3 * sd && x <= mean + 3 * sd) band = '3sd';

    data.push({
      x: Number(x.toFixed(4)),
      y: Number(y.toFixed(6)),
      band
    });
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="x" 
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(val) => Number(val).toFixed(2)}
            stroke="#94a3b8"
          />
          <YAxis hide domain={[0, 'dataMax']} />
          <Tooltip 
            formatter={(value: any, name: any) => [value, 'Probability Density']}
            labelFormatter={(label) => `Value: ${Number(label).toFixed(2)}`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="y" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.2}
            isAnimationActive={false}
          />
          
          {/* Mean Line */}
          <ReferenceLine x={mean} stroke="#059669" strokeDasharray="3 3" label={{ position: 'top', value: 'μ', fill: '#059669' }} />
          
          {/* 1 SD Lines */}
          <ReferenceLine x={mean - sd} stroke="#34d399" strokeOpacity={0.5} strokeDasharray="3 3" label={{ position: 'insideBottomRight', value: '-1σ', fill: '#34d399', fontSize: 12 }} />
          <ReferenceLine x={mean + sd} stroke="#34d399" strokeOpacity={0.5} strokeDasharray="3 3" label={{ position: 'insideBottomLeft', value: '+1σ', fill: '#34d399', fontSize: 12 }} />
          
          {/* 2 SD Lines */}
          <ReferenceLine x={mean - 2 * sd} stroke="#94a3b8" strokeOpacity={0.5} strokeDasharray="3 3" label={{ position: 'insideBottomRight', value: '-2σ', fill: '#94a3b8', fontSize: 12 }} />
          <ReferenceLine x={mean + 2 * sd} stroke="#94a3b8" strokeOpacity={0.5} strokeDasharray="3 3" label={{ position: 'insideBottomLeft', value: '+2σ', fill: '#94a3b8', fontSize: 12 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
