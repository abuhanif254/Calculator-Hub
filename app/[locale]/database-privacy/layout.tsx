'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../../components/platform/Sidebar';
import { TopNavbar, CommandPalette } from '../../components/platform/TopNavbar';
import { ToastProvider } from '../../components/platform/ui/Toast';
import { ErrorBoundary } from '../../components/platform/ui/ErrorBoundary';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setCommandOpen(prev => !prev);
    }
    // Escape closes mobile sidebar
    if (e.key === 'Escape') {
      setMobileSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Close mobile sidebar on route change (via resize)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ToastProvider>
      <ErrorBoundary>
        <div className="flex h-screen bg-[#080D18] text-white overflow-hidden">

          {/* ── Desktop Sidebar ─────────────────────────────── */}
          <div className="hidden lg:flex shrink-0">
            <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(p => !p)} />
          </div>

          {/* ── Mobile Sidebar Overlay ───────────────────────── */}
          <AnimatePresence>
            {mobileSidebarOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                  onClick={() => setMobileSidebarOpen(false)}
                />
                {/* Sidebar drawer */}
                <motion.div
                  key="drawer"
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                  className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 flex flex-col"
                >
                  <Sidebar collapsed={false} onToggle={() => setMobileSidebarOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Main content ─────────────────────────────────── */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Navbar — passes mobile toggle */}
            <TopNavbar
              onCommandPalette={() => setCommandOpen(true)}
              onMobileMenu={() => setMobileSidebarOpen(p => !p)}
            />

            {/* Page content with enter animation */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <motion.div
                key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-full"
              >
                {children}
              </motion.div>
            </main>
          </div>

          {/* Command Palette */}
          <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
        </div>
      </ErrorBoundary>
    </ToastProvider>
  );
}
