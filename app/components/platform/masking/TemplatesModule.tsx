'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, HeartPulse, CreditCard, Globe, Download, Plus, Search } from 'lucide-react';
import { apiUrl } from '../../../lib/api';

interface Template {
  id: string;
  name: string;
  description: string;
  rules_count: number;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  'Globe': <Globe className="w-8 h-8 text-blue-400" />,
  'HeartPulse': <HeartPulse className="w-8 h-8 text-rose-400" />,
  'CreditCard': <CreditCard className="w-8 h-8 text-amber-400" />,
  'ShieldCheck': <ShieldCheck className="w-8 h-8 text-violet-400" />
};

export function TemplatesModule() {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetch(apiUrl('/api/templates'))
      .then(r => r.json())
      .then(setTemplates)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Search compliance templates..." 
            className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/50"
          />
        </div>
        <button className="whitespace-nowrap bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-xl border border-white/5 transition-colors">
          Browse Marketplace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.id} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-violet-500/50 transition-colors">
            <div className="p-6 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {iconMap[tpl.icon] || <ShieldCheck className="w-8 h-8 text-white/40" />}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{tpl.name}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">{tpl.description}</p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/60 text-xs font-medium border border-white/5">
                  {tpl.rules_count} Masking Rules
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/60 text-xs font-medium border border-white/5">
                  Pre-configured
                </span>
              </div>
            </div>
            <div className="p-4 border-t border-white/10 bg-[#080D18] flex items-center justify-between">
              <button className="flex-1 mr-2 bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 font-medium py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Install Profile
              </button>
              <button className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-xl flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
