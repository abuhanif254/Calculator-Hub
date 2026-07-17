'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import Script from 'next/script';
import { useParams } from 'next/navigation';
import {
  Shield, ScanSearch, Zap, Database, GitBranch, BarChart3,
  CheckCircle2, ArrowRight, Star, Globe, HeartPulse,
  CreditCard, Award, ChevronRight, Play, Users, Key
} from 'lucide-react';

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Floating particles background ─────────────────────────────────────────────
function ParticleGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,92,246,0.08) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      {[...Array(20)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full bg-violet-500/40"
          style={{ left: `${(i * 7.3 + 5) % 100}%`, top: `${(i * 13.7 + 10) % 100}%` }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.3 }} />
      ))}
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, color, delay }: { icon: React.ElementType; title: string; desc: string; color: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}
      className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-violet-500/30 rounded-2xl p-6 transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ── Step card ─────────────────────────────────────────────────────────────────
function StepCard({ num, title, desc, delay }: { num: string; title: string; desc: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay }}
      className="flex gap-5">
      <div className="shrink-0 w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">{num}</div>
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Main landing page ─────────────────────────────────────────────────────────
export default function DatabasePrivacyLanding() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dashboardHref = `/${locale}/database-privacy/dashboard`;

  const features = [
    { icon: ScanSearch,  title: 'PII Auto-Scanner',           desc: 'Automatically detect emails, SSNs, credit cards, phone numbers, IP addresses and 30+ other PII types across all your database columns.',           color: 'bg-violet-600',   delay: 0 },
    { icon: Shield,      title: 'Smart Masking Engine',        desc: 'Apply SHA-256 hashing, synthetic data generation, format-preserving encryption, partial redaction, or custom regex patterns per column.',     color: 'bg-blue-600',     delay: 0.05 },
    { icon: Database,    title: 'Multi-DB Support',            desc: 'Connect PostgreSQL, MySQL, MongoDB, MariaDB, SQLite, Oracle, and SQL Server. Manage dozens of connections from a single dashboard.',                 color: 'bg-indigo-600',   delay: 0.1 },
    { icon: Zap,         title: 'High-Performance Jobs',       desc: 'Process millions of rows with parallel worker nodes. Schedule recurring masking jobs via cron, get real-time progress and ETA.',                    color: 'bg-amber-600',    delay: 0.15 },
    { icon: BarChart3,   title: 'Compliance Reporting',        desc: 'Generate GDPR Article 30, HIPAA Safe Harbor, and PCI-DSS compliance certificates with one click. Full audit trail included.',                        color: 'bg-emerald-600',  delay: 0.2 },
    { icon: GitBranch,   title: 'Projects & Environments',     desc: 'Organise databases, masking profiles, and jobs into Production, Staging, and Development projects with separate access controls.',                   color: 'bg-rose-600',     delay: 0.25 },
    { icon: Key,         title: 'Secrets Manager',             desc: 'Store database credentials with AES-256-GCM encryption. Secrets are never logged or exposed in plain text — ever.',                                    color: 'bg-teal-600',     delay: 0.3 },
    { icon: Users,       title: 'Role-Based Access Control',   desc: 'Invite teammates as Admin, Compliance Officer, DBA, Developer, or Read-Only. Full RBAC with granular per-resource permissions.',                     color: 'bg-pink-600',     delay: 0.35 },
  ];

  const compliance = [
    { name: 'GDPR', icon: Globe,       score: 82, region: 'EU',       color: 'from-blue-500/20 to-indigo-600/10',   border: 'border-blue-500/30' },
    { name: 'HIPAA', icon: HeartPulse, score: 91, region: 'USA',      color: 'from-rose-500/20 to-pink-600/10',     border: 'border-rose-500/30' },
    { name: 'PCI-DSS', icon: CreditCard, score: 78, region: 'Global', color: 'from-amber-500/20 to-orange-600/10', border: 'border-amber-500/30' },
    { name: 'SOC 2', icon: Award,      score: 65, region: 'USA',      color: 'from-violet-500/20 to-purple-600/10', border: 'border-violet-500/30' },
  ];

  const stats = [
    { label: 'Rows Masked',     value: 2400000, suffix: '+' },
    { label: 'PII Types Detected', value: 30,   suffix: '+' },
    { label: 'Databases Supported', value: 9,   suffix: '' },
    { label: 'Compliance Standards', value: 4,  suffix: '' },
  ];

  return (
    <div className="min-h-screen bg-[#080D18] text-white">

      {/* JSON-LD Structured Data */}
      <Script id="jsonld-dataprivacy" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'DataPrivacy Enterprise — Database Anonymizer',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        description: 'Free enterprise-grade database anonymization platform. Scan for PII, apply masking rules, enforce GDPR/HIPAA/PCI-DSS compliance.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: ['PII Auto-Scanner', 'Data Masking Engine', 'GDPR Compliance', 'HIPAA Compliance', 'Job Scheduler', 'Audit Logs', 'API Keys', 'Webhooks'],
        keywords: 'database anonymizer, data masking, PII scanner, GDPR compliance, HIPAA compliance',
      }) }} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <ParticleGrid />
        {/* Radial glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 text-sm text-violet-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Free & Open · No credit card required · Enterprise-grade
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Enterprise</span>{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6)' }}>
              Database
            </span>
            <br />
            <span className="text-white">Anonymizer</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Scan, mask, and anonymize sensitive data across your entire database infrastructure.
            GDPR · HIPAA · PCI-DSS compliance — built in, not bolted on.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={dashboardHref}
              className="group flex items-center gap-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02]">
              Launch Free Platform
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#features"
              className="flex items-center gap-2 text-white/60 hover:text-white font-medium text-lg px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <Play className="w-4 h-4" /> See How It Works
            </a>
          </motion.div>

          {/* Compliance trust badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-12">
            {['GDPR Ready', 'HIPAA Compliant', 'PCI-DSS', 'SOC 2', 'AES-256 Encrypted', 'Zero Logs'].map(badge => (
              <span key={badge} className="flex items-center gap-1.5 text-xs text-white/50 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />{badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-xs">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <p className="text-3xl md:text-4xl font-black text-white mb-1">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Platform Features</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Everything you need.</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">Production-grade data privacy tooling that normally costs thousands per month — completely free.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">How It Works</span>
              <h2 className="text-4xl font-black text-white mt-3 mb-8">Anonymize in 3 steps</h2>
            </motion.div>
            <div className="space-y-8">
              <StepCard num="1" title="Connect Your Database" desc="Add a database connection in seconds. PostgreSQL, MySQL, MongoDB, and more — credentials stay encrypted in our AES-256 vault." delay={0} />
              <StepCard num="2" title="Scan for Sensitive Data" desc="Run the PII auto-scanner. It detects 30+ data types across every table and column, with risk scores and masking recommendations." delay={0.1} />
              <StepCard num="3" title="Mask & Export" desc="Apply masking rules, run the job, and export your anonymized dataset as CSV, JSON, SQL, Parquet, or push it back to the DB." delay={0.2} />
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="mt-10">
              <Link href={dashboardHref}
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Start for Free <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Visual panel */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-white/30 font-mono">scanner · production-postgres</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              {[
                { col: 'users.email',      type: 'Email',       risk: 'High',   conf: 99 },
                { col: 'users.full_name',  type: 'Full Name',   risk: 'Medium', conf: 95 },
                { col: 'payments.pan',     type: 'Credit Card', risk: 'High',   conf: 100 },
                { col: 'employees.ssn',    type: 'SSN',         risk: 'High',   conf: 100 },
                { col: 'events.client_ip', type: 'IP Address',  risk: 'Low',    conf: 88 },
                { col: 'users.phone',      type: 'Phone',       risk: 'Medium', conf: 92 },
              ].map((row, i) => (
                <motion.div key={row.col} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }}
                  className="flex items-center justify-between bg-white/[0.03] rounded-lg px-3 py-2">
                  <span className="text-white/70">{row.col}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-violet-400 text-[10px]">{row.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${row.risk === 'High' ? 'text-red-400 bg-red-400/10' : row.risk === 'Medium' ? 'text-amber-400 bg-amber-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>{row.risk}</span>
                    <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${row.conf}%` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />6 PII columns found · 3 high-risk · Masking rules ready
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Compliance section ────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Regulatory Compliance</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Built for regulated industries</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">Track your compliance posture against major data protection frameworks and generate audit-ready certificates.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {compliance.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6 text-center`}>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3"><s.icon className="w-6 h-6 text-white" /></div>
                <h3 className="text-xl font-black text-white mb-1">{s.name}</h3>
                <p className="text-xs text-white/40 mb-4">{s.region}</p>
                <div className="text-3xl font-black text-white mb-2">{s.score}%</div>
                <div className="h-2 bg-black/20 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-white/50 rounded-full" style={{ width: `${s.score}%` }} />
                </div>
                <p className="text-xs text-white/50">Readiness Score</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why free section ──────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white/[0.015]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Free. Forever. No catch.</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">Competitors charge $500–$5,000/month for the same capabilities. We believe data privacy tooling should be accessible to every team.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-violet-500/10 to-indigo-600/5 border border-violet-500/20 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="text-5xl font-black text-white mb-2">$0 <span className="text-2xl text-white/40 font-normal">/month</span></div>
                <p className="text-white/60 mb-6 text-lg">Everything included. No feature gates.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Unlimited databases', 'Unlimited masking jobs', 'All 30+ PII detectors', 'GDPR/HIPAA/PCI-DSS reports', 'API access & webhooks', 'Team collaboration (RBAC)', 'AES-256 secrets vault', 'Job scheduling & history'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-center">
                <Link href={dashboardHref}
                  className="inline-flex flex-col items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-lg shadow-violet-500/25 hover:scale-[1.02]">
                  Launch Platform
                  <span className="text-xs font-normal text-violet-200 opacity-80">No sign-up required</span>
                </Link>
                <div className="flex items-center justify-center gap-1 mt-4 text-xs text-white/40">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  <span className="ml-1">Loved by DBAs worldwide</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Your data privacy<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>starts here.</span>
          </h2>
          <p className="text-xl text-white/50 mb-10">Stop exposing sensitive data in dev, staging, and analytics environments. Start masking in minutes.</p>
          <Link href={dashboardHref}
            className="inline-flex items-center gap-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xl px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-violet-500/30 hover:scale-[1.02]">
            Open the Platform Free
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-sm text-white/30 mt-4">No account needed · Open source · GDPR compliant</p>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
            <span className="font-bold text-white">DataPrivacy</span>
            <span className="text-white/40 text-sm">by Nexus</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href={dashboardHref} className="hover:text-white transition-colors">Dashboard</Link>
            <Link href={`/${locale}/database-privacy/compliance`} className="hover:text-white transition-colors">Compliance</Link>
            <Link href={`/${locale}/database-privacy/reports`} className="hover:text-white transition-colors">Reports</Link>
            <Link href={`/${locale}/database-privacy/settings`} className="hover:text-white transition-colors">Settings</Link>
          </div>
          <p className="text-xs text-white/30">© 2024 Nexus DataPrivacy · Free forever</p>
        </div>
      </footer>

    </div>
  );
}
