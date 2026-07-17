'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Store, Search, Star, Download, Shield, HeartPulse, CreditCard, Users, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../../components/platform/ui/Toast';

const categories = ['All', 'Healthcare', 'Finance', 'Retail', 'HR', 'Custom'];
const catIcons: Record<string, React.ElementType> = { Healthcare: HeartPulse, Finance: CreditCard, Retail: ShoppingCart, HR: Users, Custom: Zap };

const packs = [
  { id: 'p1', name: 'GDPR Pro Pack', cat: 'Finance', rules: 47, rating: 4.8, installs: '12.4k', desc: 'Complete GDPR-compliant masking for EU data — covers all personal identifiers, financial data, and special categories.', featured: true, installed: false, tags: ['GDPR', 'EU', 'Personal Data'] },
  { id: 'p2', name: 'HIPAA Complete', cat: 'Healthcare', rules: 63, rating: 4.9, installs: '8.1k',  desc: 'Comprehensive PHI de-identification per HIPAA Safe Harbor §164.514 with 18-identifier coverage.', featured: false, installed: true, tags: ['HIPAA', 'PHI', 'Healthcare'] },
  { id: 'p3', name: 'PCI-DSS Gold',  cat: 'Finance',     rules: 29, rating: 4.7, installs: '6.2k',  desc: 'PAN, CVV, and cardholder data masking suite. Format-preserving encryption preserves test validity.', featured: false, installed: false, tags: ['PCI-DSS', 'PAN', 'FPE'] },
  { id: 'p4', name: 'HR Data Shield', cat: 'HR',         rules: 38, rating: 4.6, installs: '3.8k',  desc: 'Employee PII protection: SSNs, salaries, performance scores, medical leave, and personal contact info.', featured: false, installed: false, tags: ['HR', 'SSN', 'Salary'] },
  { id: 'p5', name: 'E-Commerce Pack', cat: 'Retail',    rules: 22, rating: 4.5, installs: '5.1k',  desc: 'Customer data anonymization for e-commerce: orders, shipping addresses, payment info, and loyalty data.', featured: false, installed: false, tags: ['E-Commerce', 'Orders', 'PII'] },
  { id: 'p6', name: 'Custom Builder', cat: 'Custom',     rules: 0,  rating: 0,   installs: '',       desc: 'Build your own masking rule pack from scratch. Combine strategies, test with live preview, and publish.', featured: false, installed: false, tags: ['Custom', 'Builder'] },
];

export default function MarketplacePage() {
  const toast = useToast();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [installed, setInstalled] = useState<Set<string>>(new Set(['p2']));

  const filtered = packs.filter(p => (filter === 'All' || p.cat === filter) && (p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())));
  const featured = packs.find(p => p.featured);

  const install = (id: string, name: string) => {
    setInstalled(prev => { const n = new Set(prev); n.add(id); return n; });
    toast.success('Pack Installed!', `"${name}" rules are now available in your Rule Builder.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Rule Marketplace" subtitle="Browse and install pre-built masking rule packs from the community" />

      {featured && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-violet-500/20 to-indigo-600/10 border border-violet-500/30 rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full">⭐ Featured</div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/30 border border-violet-500/30 flex items-center justify-center shrink-0"><Shield className="w-7 h-7 text-violet-300" /></div>
            <div className="flex-1"><h2 className="text-xl font-bold text-white">{featured.name} <span className="text-xs text-white/40 font-normal ml-1">v2.0</span></h2>
              <p className="text-sm text-white/60 mt-1">{featured.desc}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{featured.rules} rules</span>
                <span className="flex items-center gap-1"><Download className="w-3 h-3" />{featured.installs} installs</span>
                <span className="flex items-center gap-1 text-amber-400">{Array(5).fill(0).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(featured.rating) ? 'fill-current' : ''}`} />)}{featured.rating}</span>
              </div>
            </div>
            <button onClick={() => install(featured.id, featured.name)} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 shrink-0">
              <Download className="w-4 h-4" /> Install Free
            </button>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rule packs..." className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/50" /></div>
        <div className="flex gap-1 bg-[#0A0F1A] border border-white/10 rounded-xl p-1 overflow-x-auto">
          {categories.map(c => <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filter === c ? 'bg-violet-600 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>{c}</button>)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((pack, i) => {
          const Icon = catIcons[pack.cat] || Store;
          const isInstalled = installed.has(pack.id);
          return (
            <motion.div key={pack.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Icon className="w-5 h-5 text-violet-400" /></div>
                <span className="text-xs text-white/40 bg-white/5 border border-white/5 px-2 py-1 rounded-lg">{pack.cat}</span>
              </div>
              <h3 className="font-bold text-white mb-1">{pack.name}</h3>
              <p className="text-xs text-white/50 mb-3 flex-1 leading-relaxed">{pack.desc}</p>
              <div className="flex flex-wrap gap-1 mb-3">{pack.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">{t}</span>)}</div>
              {pack.rules > 0 && <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                <span><Shield className="w-3 h-3 inline mr-1" />{pack.rules} rules</span>
                <span><Download className="w-3 h-3 inline mr-1" />{pack.installs}</span>
                <span className="flex items-center gap-0.5 text-amber-400"><Star className="w-3 h-3 fill-current" />{pack.rating}</span>
              </div>}
              <button onClick={() => pack.id === 'p6' ? toast.info('Custom Builder', 'Rule builder is available in the Masking section.') : install(pack.id, pack.name)}
                className={`w-full py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${isInstalled ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-default' : 'bg-violet-600 hover:bg-violet-500 text-white'}`}
                disabled={isInstalled}>
                {isInstalled ? <><CheckCircle2 className="w-4 h-4" />Installed</> : pack.id === 'p6' ? <><Zap className="w-4 h-4" />Open Builder</> : <><Download className="w-4 h-4" />Install Free</>}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
