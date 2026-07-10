'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, X, Menu } from 'lucide-react';
import { GuidesSidebar } from './GuidesSidebar';

interface GuidesMobileDrawerProps {
  /** Slug of the currently active guide, passed down to sidebar for active state */
  activeSlug?: string;
}

export function GuidesMobileDrawer({ activeSlug }: GuidesMobileDrawerProps) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Sticky mobile top bar — only visible below lg ─────────────────── */}
      <div className="lg:hidden sticky top-[3.5rem] z-30 bg-white/95 dark:bg-[#090E17]/95 backdrop-blur-md border-b border-slate-100 dark:border-white/5 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <BookOpen size={15} className="text-[#518231] dark:text-[#6fa844]" />
          Guides
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-sm font-medium text-[#518231] dark:text-[#6fa844] bg-[#518231]/8 dark:bg-[#518231]/15 hover:bg-[#518231]/15 dark:hover:bg-[#518231]/25 px-3 py-1.5 rounded-lg transition-colors"
          aria-label="Browse all guides"
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <Menu size={15} />
          Browse Guides
        </button>
      </div>

      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Slide-up Drawer ───────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Guides navigation"
        aria-modal="true"
        className={[
          'fixed inset-x-0 bottom-0 z-50 lg:hidden',
          'bg-white dark:bg-slate-900',
          'border-t border-slate-200 dark:border-white/10',
          'rounded-t-2xl shadow-2xl',
          'flex flex-col',
          // Height: up to 85dvh, min-height enough to show content
          'max-h-[85dvh]',
          // Transition
          'transition-transform duration-300 ease-out will-change-transform',
          open ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[#518231] dark:text-[#6fa844]" />
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Browse Guides
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Close guides drawer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Sidebar content — scrollable */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain"
          onClick={() => setOpen(false)} // Close on any guide link tap
        >
          <GuidesSidebar activeSlug={activeSlug} />
        </div>
      </div>
    </>
  );
}
