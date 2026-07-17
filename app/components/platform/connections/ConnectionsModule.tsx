'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Plus, X, Server, Shield, DatabaseZap, CheckCircle2, XCircle, Loader2, Play } from 'lucide-react';
import { StatusBadge, PageHeader } from '../ui/PlatformUI';
import { apiUrl } from '../../../lib/api';

// Mock DB icons map based on types
const dbIcons: Record<string, string> = {
  postgres: '🐘', // PostgreSQL
  mysql: '🐬', // MySQL
  mongodb: '🍃', // MongoDB
  sqlserver: '🪟', // SQL Server
  oracle: '🔴', // Oracle
  snowflake: '❄️', // Snowflake
  redshift: '🧱', // Redshift
};

export interface Connection {
  id?: string;
  name: string;
  db_type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
  database_name: string;
  ssl_enabled: boolean;
  read_only: boolean;
  created_at?: string;
}

export function ConnectionCard({ conn, onDelete }: { conn: Connection, onDelete: (id: string) => void }) {
  const icon = dbIcons[conn.db_type] || '🗄️';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0E1628] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group relative"
    >
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <StatusBadge status="completed" size="sm" />
        <button
          onClick={() => conn.id && onDelete(conn.id)}
          className="text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
          title="Delete Connection"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{conn.name}</h3>
          <p className="text-white/40 text-xs flex items-center gap-1.5 uppercase font-medium tracking-wider mt-0.5">
            {conn.db_type}
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-4 bg-white/[0.02] rounded-lg p-3 border border-white/5">
        <div className="flex justify-between text-xs">
          <span className="text-white/40">Host</span>
          <span className="text-white/80 font-mono">{conn.host}:{conn.port}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/40">Database</span>
          <span className="text-white/80 font-mono">{conn.database_name}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/40">Mode</span>
          <span className="text-white/80">{conn.read_only ? 'Read Only' : 'Read / Write'}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5" /> Access Control
        </button>
        <button className="flex-1 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-violet-500/20">
          <DatabaseZap className="w-3.5 h-3.5" /> Scan DB
        </button>
      </div>
    </motion.div>
  );
}

interface ConnectionFormProps {
  onClose: () => void;
  onSave: (conn: Connection) => void;
}

export function ConnectionFormDrawer({ onClose, onSave }: ConnectionFormProps) {
  const [formData, setFormData] = useState<Connection>({
    name: '',
    db_type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: '',
    password: '',
    database_name: '',
    ssl_enabled: true,
    read_only: true,
  });

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(apiUrl('/api/connections/test'), {
        method: 'POST',
      });
      if (res.ok) {
        setTestResult('success');
      } else {
        setTestResult('error');
      }
    } catch (e) {
      setTestResult('error');
    }
    setTesting(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-end"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-md bg-[#080D18] h-full border-l border-white/10 flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0 bg-[#0E1628]">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-violet-400" /> Add Connection
              </h2>
              <p className="text-xs text-white/40 mt-1">Configure your database source</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
            
            <div className="space-y-3">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Engine Type</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(dbIcons).map(([type, icon]) => (
                  <button
                    key={type}
                    onClick={() => setFormData(p => ({ ...p, db_type: type, port: type === 'postgres' ? 5432 : type === 'mysql' ? 3306 : type === 'mongodb' ? 27017 : p.port }))}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${formData.db_type === type ? 'bg-violet-500/20 border-violet-500/50 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-[10px] uppercase font-bold">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-white/60 mb-1.5 block">Connection Name</label>
                <input
                  type="text"
                  placeholder="e.g. Production Analytics DB"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#0A0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-white/60 mb-1.5 block">Host / Endpoint</label>
                  <input
                    type="text"
                    value={formData.host}
                    onChange={e => setFormData(p => ({ ...p, host: e.target.value }))}
                    className="w-full bg-[#0A0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50"
                  />
                </div>
                <div className="w-24 shrink-0">
                  <label className="text-xs font-semibold text-white/60 mb-1.5 block">Port</label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={e => setFormData(p => ({ ...p, port: Number(e.target.value) }))}
                    className="w-full bg-[#0A0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/60 mb-1.5 block">Database Name</label>
                <input
                  type="text"
                  value={formData.database_name}
                  onChange={e => setFormData(p => ({ ...p, database_name: e.target.value }))}
                  className="w-full bg-[#0A0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-white/60 mb-1.5 block">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={e => setFormData(p => ({ ...p, username: e.target.value }))}
                    className="w-full bg-[#0A0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-white/60 mb-1.5 block">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                    className="w-full bg-[#0A0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-5 rounded-full p-1 transition-colors ${formData.ssl_enabled ? 'bg-violet-500' : 'bg-white/10'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${formData.ssl_enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">Enable SSL/TLS</p>
                    <p className="text-[10px] text-white/40">Encrypt data in transit</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-5 rounded-full p-1 transition-colors ${formData.read_only ? 'bg-emerald-500' : 'bg-white/10'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${formData.read_only ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">Read-Only Mode</p>
                    <p className="text-[10px] text-white/40">Prevent destructive operations (Recommended)</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Test Connection Result */}
            {testResult && (
              <div className={`p-3 rounded-lg text-sm flex items-start gap-2 border ${testResult === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {testResult === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
                <div>
                  <p className="font-semibold">{testResult === 'success' ? 'Connection Successful' : 'Connection Failed'}</p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {testResult === 'success' ? 'Mock Database v14.0 (42ms latency)' : 'Check your credentials or network rules.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-white/10 bg-[#0E1628] grid grid-cols-2 gap-3 shrink-0">
            <button
              onClick={handleTest}
              disabled={testing}
              className="w-full bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />} Test Connection
            </button>
            <button
              onClick={() => onSave(formData)}
              disabled={!formData.name || !formData.host}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              Save Source
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
