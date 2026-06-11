'use client';

import React, { useEffect, useRef, useState } from 'react';
import { List } from 'lucide-react';

interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface GuidesTableOfContentsProps {
  headings: TocHeading[];
}

export function GuidesTableOfContents({ headings }: GuidesTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Scrollspy: track which heading is currently in viewport ──────────
  useEffect(() => {
    if (!headings.length) return;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Find the topmost visible heading
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for sticky navbar (approx. 80px)
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (!headings.length) return null;

  return (
    <aside aria-label="Table of contents" className="w-full">
      <div className="sticky top-28">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 px-1">
          <List size={13} />
          On This Page
        </div>

        <nav>
          <ul className="space-y-0.5">
            {headings.map(({ id, text, level }) => {
              const isActive = activeId === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => handleClick(id)}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-all duration-200 leading-snug ${
                      level === 3 ? 'pl-6' : ''
                    } ${
                      isActive
                        ? 'text-[#518231] dark:text-[#6fa844] font-medium bg-[#518231]/5'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <span className="inline-block w-1 h-1 rounded-full bg-[#518231] mr-2 mb-0.5" />
                    )}
                    {text}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export type { TocHeading };
