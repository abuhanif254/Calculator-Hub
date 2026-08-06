"use client";

import React, { useMemo } from 'react';

interface StemAndLeafPlotProps {
  data: number[];
  modes: number[];
}

export default function StemAndLeafPlot({ data, modes }: StemAndLeafPlotProps) {
  const stemData = useMemo(() => {
    if (data.length === 0) return [];
    
    // Convert to integers (Stem and leaf is tricky for decimals, we'll floor/round for display simplicity)
    const intData = data.map(d => Math.floor(d)).sort((a,b) => a-b);
    
    const plot = new Map<number, number[]>();
    
    intData.forEach(num => {
      // e.g. 152 -> Stem: 15, Leaf: 2
      // e.g. 8 -> Stem: 0, Leaf: 8
      const isNegative = num < 0;
      const absNum = Math.abs(num);
      const strNum = absNum.toString();
      
      let stem: number;
      let leaf: number;
      
      if (strNum.length === 1) {
        stem = isNegative ? -0 : 0;
        leaf = absNum;
      } else {
        stem = parseInt(strNum.substring(0, strNum.length - 1), 10);
        if (isNegative) stem = -stem;
        leaf = parseInt(strNum.substring(strNum.length - 1), 10);
      }
      
      const leaves = plot.get(stem) || [];
      leaves.push(leaf);
      plot.set(stem, leaves);
    });

    // Sort stems
    const sortedStems = Array.from(plot.keys()).sort((a,b) => a-b);
    
    return sortedStems.map(stem => ({
      stem,
      leaves: plot.get(stem)!
    }));
  }, [data]);

  if (stemData.length === 0) return null;

  return (
    <div className="w-full py-6">
      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 max-w-xl mx-auto overflow-x-auto">
        <div className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-4 text-center border-b border-gray-200 dark:border-gray-700 pb-2">
          Stem | Leaf
        </div>
        <table className="mx-auto text-lg font-mono">
          <tbody>
            {stemData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <td className="pr-4 py-1 text-right font-bold text-gray-700 dark:text-gray-300 border-r-2 border-indigo-500">
                  {row.stem === 0 && (1 / row.stem === -Infinity) ? "-0" : row.stem}
                </td>
                <td className="pl-4 py-1 tracking-widest text-indigo-700 dark:text-indigo-400">
                  {row.leaves.map((leaf, j) => {
                    // Check if this specific leaf combined with stem is a mode
                    // Reconstruct number to check
                    let reconstructed: number;
                    if (row.stem === 0 && (1 / row.stem === -Infinity)) {
                       reconstructed = -leaf;
                    } else if (row.stem < 0) {
                       reconstructed = (row.stem * 10) - leaf;
                    } else {
                       reconstructed = (row.stem * 10) + leaf;
                    }
                    
                    const isMode = modes.map(m => Math.floor(m)).includes(reconstructed);
                    
                    return (
                      <span key={j} className={isMode ? "text-red-500 font-bold bg-red-100 dark:bg-red-900/30 px-0.5 rounded" : ""}>
                        {leaf}
                      </span>
                    );
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center italic">
          * Decimals are floored. Red highlighted leaves indicate mode values. <br/>
          Key: 1 | 2 = 12
        </div>
      </div>
    </div>
  );
}
