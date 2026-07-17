'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Plus, Key, Lock, Hash, Type, Replace, X, ChevronRight, Activity, Save } from 'lucide-react';
import { apiUrl } from '../../../lib/api';

interface Rule {
  id: string;
  name: string;
  target: string;
  strategy: string;
  status: string;
  created_at: string;
}

export function MaskingRulesModule() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetch(apiUrl('/api/rules'))
      .then(r => r.json())
      .then(setRules)
      .catch(console.error);
  }, []);

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(apiUrl('/api/rules'), { method: 'POST' })
      .then(r => r.json())
      .then(newRule => {
        setRules([...rules, { ...newRule, name: "New Custom Rule", target: "Custom Column", strategy: "Hash", created_at: new Date().toISOString() }]);
        setIsDrawerOpen(false);
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New Rule
        </button>
      </div>

      <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#080D18]">
            <tr>
              <th className="px-6 py-4 text-white/40 font-medium">Rule Name</th>
              <th className="px-6 py-4 text-white/40 font-medium">Target PII</th>
              <th className="px-6 py-4 text-white/40 font-medium">Strategy</th>
              <th className="px-6 py-4 text-white/40 font-medium">Status</th>
              <th className="px-6 py-4 text-right text-white/40 font-medium">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {rules.map((rule, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-violet-400" />
                    </div>
                    <span className="text-white font-medium">{rule.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/80">{rule.target}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {rule.strategy.includes('Hash') ? <Hash className="w-3.5 h-3.5 text-blue-400" /> : 
                     rule.strategy.includes('Synthetic') ? <Replace className="w-3.5 h-3.5 text-green-400" /> : 
                     <Lock className="w-3.5 h-3.5 text-orange-400" />}
                    <span className="text-white/80">{rule.strategy}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${rule.status === 'Active' ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-white/40 bg-white/5 border-white/10'}`}>
                    {rule.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-white/40 text-xs font-mono">
                  {new Date(rule.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-[#0A0F1A] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-violet-400" />
                Rule Builder
              </h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              <form id="ruleForm" onSubmit={handleCreateRule} className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-white/60 mb-2 block uppercase tracking-wider">Rule Name</label>
                  <input required type="text" placeholder="e.g. Mask Client SSNs" className="w-full bg-[#0E1628] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50" />
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-white/60 mb-2 block uppercase tracking-wider">Target PII Classifier</label>
                  <select className="w-full bg-[#0E1628] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">
                    <option>Email Address</option>
                    <option>Social Security Number</option>
                    <option>Credit Card</option>
                    <option>Phone Number</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/60 mb-3 block uppercase tracking-wider">Masking Strategy</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Synthetic', icon: Replace, desc: 'Fake but realistic' },
                      { name: 'SHA-256 Hash', icon: Hash, desc: 'One-way token' },
                      { name: 'Redact', icon: Lock, desc: 'Replace with ***' },
                      { name: 'FPE', icon: Key, desc: 'Format Preserving' }
                    ].map((strat, i) => (
                      <label key={strat.name} className="relative flex flex-col p-3 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors focus-within:border-violet-500/50">
                        <input type="radio" name="strategy" className="absolute opacity-0" defaultChecked={i === 0} />
                        <strat.icon className="w-5 h-5 text-violet-400 mb-2" />
                        <span className="text-sm font-medium text-white">{strat.name}</span>
                        <span className="text-[10px] text-white/40 mt-1">{strat.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0E1628] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-white/40" />
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Live Preview</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-white/80">john.doe@example.com</span>
                    <ChevronRight className="w-4 h-4 text-violet-400" />
                    <span className="text-green-400">alice.smith@mock.org</span>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-white/10 bg-[#080D18]">
              <button form="ruleForm" className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                Save & Apply Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
