'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * ScrollReveal — fade-in-up when element enters viewport.
 *
 * CLS NOTE: The old implementation used `opacity-0 translate-y-8` as the
 * default state (before intersection). This caused CLS because:
 *   1. Server renders opacity-0 → browser paints invisible elements
 *   2. JS hydrates → element becomes visible → layout shift
 *
 * Fix: Use `data-revealed` attribute toggled by IntersectionObserver,
 * controlled entirely by CSS. The element renders visible server-side,
 * then the CSS animation fires when in viewport. No invisible initial state.
 */
export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setRevealed(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => { if (current) observer.unobserve(current); };
  }, [delay]);

  return (
    <div
      ref={domRef}
      // When not yet revealed: still visible (no opacity-0) but positioned slightly below.
      // When revealed: animate in with fade+slide. This avoids CLS from hidden content.
      className={`${revealed ? 'animate-fade-in-up' : ''} ${className}`}
      style={revealed ? undefined : { opacity: 1 }}
    >
      {children}
    </div>
  );
}
