'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  ComposedChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface BoxPlotProps {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  lowerFence: number;
  upperFence: number;
  outliers: number[];
}

export default function DispersionBoxPlot({
  min, q1, median, q3, max, lowerFence, upperFence, outliers
}: BoxPlotProps) {
  const t = useTranslations('Calculators.StandardDeviation');
  
  if (isNaN(q1) || isNaN(q3)) {
    return null;
  }

  // Determine whisker ends (min/max excluding outliers)
  const nonOutlierMin = Math.max(min, lowerFence);
  const nonOutlierMax = Math.min(max, upperFence);

  // Prepare outlier data for scatter plot
  const outlierData = outliers.map(val => ({ x: val, y: 1 }));

  return (
    <div className="w-full h-48 relative">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          layout="horizontal"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            dataKey="x"
            domain={['auto', 'auto']} 
            tickFormatter={(val) => Number(val).toFixed(2)}
            stroke="#94a3b8"
          />
          <YAxis type="number" dataKey="y" hide domain={[0, 2]} />
          
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value: any, name: any) => {
              if (name === 'Outlier') return [value, 'Outlier'];
              return [value, name];
            }}
            labelFormatter={(label) => `Value: ${Number(label).toFixed(2)}`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />

          {/* Central Box (Q1 to Q3) */}
          <ReferenceLine 
            segment={[{ x: q1, y: 0.8 }, { x: q1, y: 1.2 }]} 
            stroke="#10b981" 
            strokeWidth={2}
          />
          <ReferenceLine 
            segment={[{ x: q3, y: 0.8 }, { x: q3, y: 1.2 }]} 
            stroke="#10b981" 
            strokeWidth={2}
          />
          <ReferenceLine 
            segment={[{ x: q1, y: 1.2 }, { x: q3, y: 1.2 }]} 
            stroke="#10b981" 
            strokeWidth={2}
          />
          <ReferenceLine 
            segment={[{ x: q1, y: 0.8 }, { x: q3, y: 0.8 }]} 
            stroke="#10b981" 
            strokeWidth={2}
          />

          {/* Median Line inside Box */}
          <ReferenceLine 
            segment={[{ x: median, y: 0.8 }, { x: median, y: 1.2 }]} 
            stroke="#059669" 
            strokeWidth={4}
          />

          {/* Whiskers */}
          <ReferenceLine 
            segment={[{ x: nonOutlierMin, y: 1 }, { x: q1, y: 1 }]} 
            stroke="#10b981" 
            strokeWidth={2}
          />
          <ReferenceLine 
            segment={[{ x: q3, y: 1 }, { x: nonOutlierMax, y: 1 }]} 
            stroke="#10b981" 
            strokeWidth={2}
          />

          {/* Whisker Caps */}
          <ReferenceLine 
            segment={[{ x: nonOutlierMin, y: 0.9 }, { x: nonOutlierMin, y: 1.1 }]} 
            stroke="#10b981" 
            strokeWidth={2}
          />
          <ReferenceLine 
            segment={[{ x: nonOutlierMax, y: 0.9 }, { x: nonOutlierMax, y: 1.1 }]} 
            stroke="#10b981" 
            strokeWidth={2}
          />

          {/* Outliers */}
          <Scatter 
            name="Outlier" 
            data={outlierData} 
            fill="#ef4444" 
            shape="cross"
          />

        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
