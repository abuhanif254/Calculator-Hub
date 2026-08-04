"use client";

import React, { useState } from "react";
import { Coins, Dice5 } from "lucide-react";

type SimType = "coin" | "dice";

export function CoinDiceSimulator() {
  const [simType, setSimType] = useState<SimType>("coin");
  const [numTrials, setNumTrials] = useState<number>(100);
  
  // Results
  const [coinResults, setCoinResults] = useState<{ heads: number; tails: number } | null>(null);
  const [diceResults, setDiceResults] = useState<Record<number, number> | null>(null);

  const runCoinSim = () => {
    let heads = 0;
    let tails = 0;
    for (let i = 0; i < numTrials; i++) {
      if (Math.random() < 0.5) heads++;
      else tails++;
    }
    setCoinResults({ heads, tails });
    setDiceResults(null);
  };

  const runDiceSim = () => {
    const results: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (let i = 0; i < numTrials; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      results[roll]++;
    }
    setDiceResults(results);
    setCoinResults(null);
  };

  const handleSimulate = () => {
    if (simType === "coin") runCoinSim();
    else runDiceSim();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Interactive Simulators</h3>
        <p className="text-slate-600 mb-4">
          Run Monte Carlo simulations to see the Law of Large Numbers in action.
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setSimType("coin")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${simType === "coin" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            <Coins size={16} /> Coin Toss
          </button>
          <button 
            onClick={() => setSimType("dice")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${simType === "dice" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            <Dice5 size={16} /> Dice Roll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h4 className="font-semibold text-slate-800 mb-4">Simulation Settings</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Number of Trials
              </label>
              <input
                type="number" min="1" max="100000"
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={numTrials}
                onChange={(e) => setNumTrials(Number(e.target.value))}
              />
              <p className="text-xs text-slate-500 mt-1">Try larger numbers (e.g., 1000) to see results converge to theoretical probability.</p>
            </div>
            
            <button
              onClick={handleSimulate}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Run Simulation
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-slate-800 mb-4">Simulation Results</h4>
          
          {!coinResults && !diceResults && (
            <div className="h-[200px] flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl">
              Run the simulation to see results.
            </div>
          )}

          {coinResults && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Heads</div>
                  <div className="text-2xl font-bold text-slate-800">{coinResults.heads}</div>
                  <div className="text-xs text-slate-500 mt-1">{(coinResults.heads / numTrials * 100).toFixed(1)}%</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Tails</div>
                  <div className="text-2xl font-bold text-slate-800">{coinResults.tails}</div>
                  <div className="text-xs text-slate-500 mt-1">{(coinResults.tails / numTrials * 100).toFixed(1)}%</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="w-full bg-slate-100 rounded-full h-8 flex overflow-hidden">
                  <div className="bg-amber-400 h-full transition-all duration-1000 ease-out" style={{ width: `${(coinResults.heads / numTrials * 100)}%` }}></div>
                  <div className="bg-slate-300 h-full transition-all duration-1000 ease-out" style={{ width: `${(coinResults.tails / numTrials * 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Heads</span>
                  <span>Tails</span>
                </div>
              </div>
            </div>
          )}

          {diceResults && (
            <div className="space-y-4">
              <div className="text-sm text-slate-500 mb-2">Distribution of Rolls (Expected ~16.67% each)</div>
              {[1, 2, 3, 4, 5, 6].map(face => {
                const count = diceResults[face];
                const pct = (count / numTrials * 100);
                return (
                  <div key={face} className="flex items-center gap-3 text-sm">
                    <div className="w-8 font-bold text-slate-700">Face {face}</div>
                    <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                      <div className="bg-blue-500 h-full transition-all duration-1000 ease-out" style={{ width: `${pct}%` }}></div>
                    </div>
                    <div className="w-20 text-right text-slate-600">
                      <span className="font-semibold">{count}</span> ({pct.toFixed(1)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
