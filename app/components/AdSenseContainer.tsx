'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseContainerProps {
  className?: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: string;
  layoutKey?: string;
  slot?: string;
  responsive?: boolean;
}

// Ensure the TypeScript compiler knows about adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSenseContainer({
  className = '',
  style = { display: 'block' },
  format = 'auto',
  layout = '',
  layoutKey = '',
  slot = 'placeholder',
  responsive = true,
}: AdSenseContainerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  // Use the public client ID from environment, or fallback to a dummy for dev
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Only attempt to push ads if the AdSense script is loaded and we haven't loaded this slot yet
    if (typeof window !== 'undefined' && !isLoaded.current && clientId) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isLoaded.current = true;
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [clientId, slot]);

  // Show placeholders during development or if no client ID is provided
  if (!clientId || process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`bg-slate-100 dark:bg-slate-800/50 flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-400 dark:text-slate-500 overflow-hidden ${className}`}
        style={{ minHeight: '100px', ...style }}
      >
        <span className="text-sm font-medium tracking-wide">Ad Placement Placeholder</span>
        <span className="text-xs opacity-70">Slot: {slot || 'Not configured'}</span>
      </div>
    );
  }

  return (
    <div className={`adsense-wrapper overflow-hidden flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
