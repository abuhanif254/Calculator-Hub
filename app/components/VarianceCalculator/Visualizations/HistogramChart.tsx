"use client";

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useTranslations } from 'next-intl';

interface HistogramChartProps {
  data: number[];
}

export default function HistogramChart({ data }: HistogramChartProps) {
  const t = useTranslations('calculators.variance');

  const { bins, mean, min, max } = useMemo(() => {
    if (!data || data.length === 0) {
      return { bins: [], mean: 0, min: 0, max: 0 };
    }

    const n = data.length;
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const meanVal = data.reduce((a, b) => a + b, 0) / n;

    // Freedman-Diaconis rule or Sturges' formula for bin count
    // Using Sturges for simplicity: k = ceil(log2(n) + 1)
    let k = Math.ceil(Math.log2(n) + 1);
    if (k < 5) k = 5; // minimum 5 bins
    if (k > 20) k = 20;

    let binWidth = (maxVal - minVal) / k;
    if (binWidth === 0) binWidth = 1;

    const binData = Array.from({ length: k }, (_, i) => ({
      binStart: minVal + i * binWidth,
      binEnd: minVal + (i + 1) * binWidth,
      count: 0,
      label: `${(minVal + i * binWidth).toFixed(1)} - ${(minVal + (i + 1) * binWidth).toFixed(1)}`
    }));

    data.forEach(val => {
      let binIndex = Math.floor((val - minVal) / binWidth);
      if (binIndex >= k) binIndex = k - 1; // Put max value in the last bin
      if (binIndex < 0) binIndex = 0;
      binData[binIndex].count += 1;
    });

    return { bins: binData, mean: meanVal, min: minVal, max: maxVal };
  }, [data]);

  if (bins.length === 0) return null;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={bins}
          margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
          <XAxis 
            dataKey="label" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            angle={-30}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            allowDecimals={false}
          />
          <Tooltip 
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--card-foreground))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <ReferenceLine 
             x={bins.find(b => mean >= b.binStart && mean <= b.binEnd)?.label || bins[0].label} 
             stroke="hsl(var(--destructive))" 
             strokeDasharray="3 3" 
             label={{ position: 'top', value: t('mean'), fill: 'hsl(var(--destructive))', fontSize: 12 }} 
          />
          <Bar 
            dataKey="count" 
            name={t('frequency')} 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
