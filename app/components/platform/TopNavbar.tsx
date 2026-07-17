'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { Search, Sun, Moon, Bell, ChevronRight, Command, LayoutDashboard, Database, ScanSearch, Shield, Cpu, FileBarChart2, Settings, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';

const quickLinks = [
  { label: 'Dashboard', href: '/database-privacy/dashboard', icon: LayoutDashboard },
  { label: 'Connections', href: '/database-privacy/connections', icon: Database },
  { label: 'Scanner', href: '/database-privacy/scanner', icon: ScanSearch },
  { label: 'Rule Builder', href: '/database-privacy/masking/rules', icon: Shield },
  { label: 'Active Jobs', href: '/database-privacy/jobs', icon: Cpu },
  { label: 'Upload & Mask', href: '/database-privacy/anonymize', icon: Zap },
  { label: 'Reports', href: '/database-privacy/reports', icon: FileBarChart2 },
  { label: 'Settings', href: '/database-privacy/settings', icon: Settings },
];

interface TopNavbarProps {
  onCommandPalette: () => void;
  onMobileMenu?: () => void;
}

export function TopNavbar({ onCommandPalette, onMobileMenu }: TopNavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="h-16 bg-[#080D18]/95 backdrop-blur-xl border-b border-white/5 flex items-center px-4 gap-4 shrink-0 z-30">
      {/* Mobile hamburger */}
      {onMobileMenu && (
        <button
          onClick={onMobileMenu}
          className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Open navigation"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
      {/* Search trigger */}
      <button
        onClick={onCommandPalette}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl px-3 py-2 text-white/40 hover:text-white/60 transition-all text-sm flex-1 max-w-sm"
      >
        <Search className="w-4 h-4" />
        <span>Search anything...</span>
        <div className="ml-auto flex items-center gap-1">
          <kbd className="bg-white/10 text-white/40 text-xs px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>
      </button>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
        </button>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        )}

        {/* User avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
          G
        </div>
      </div>
    </header>
  );
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const filtered = quickLinks.filter(l => l.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-xl bg-[#0E1628] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search pages, actions..."
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
              />
              <kbd className="text-white/20 text-xs font-mono bg-white/5 px-2 py-1 rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div className="py-2 max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-8">No results found</p>
              ) : (
                filtered.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href as any}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white/60 hover:text-white transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-white/30" />
                  </Link>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="border-t border-white/5 px-4 py-2.5 flex items-center gap-4">
              <span className="text-white/20 text-xs flex items-center gap-1"><Command className="w-3 h-3" /> K to open</span>
              <span className="text-white/20 text-xs">↑↓ navigate</span>
              <span className="text-white/20 text-xs">↵ select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
