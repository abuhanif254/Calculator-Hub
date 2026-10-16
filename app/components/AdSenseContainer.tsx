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

/**
 * Clean, policy-compliant Google AdSense container.
 * - Never loads third-party pop-under/iframe ad networks (e.g., Adsterra) that violate
 *   Google AdSense "More Ads Than Publisher Content" / "Low Value Content" policies.
 * - Collapses cleanly to null (0px height, zero empty whitespace) unless both
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID and a valid numeric AdSense slot ID are configured.
 * - During Google AdSense site review, Auto Ads loaded in app/[locale]/layout.tsx
 *   handles verification without injecting empty reserved boxes above the fold.
 */
export function AdSenseContainer({
  className = '',
  style,
  format = 'auto',
  layout,
  layoutKey,
  slot,
  responsive = true,
}: AdSenseContainerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isNumericSlot = Boolean(slot && /^\d+$/.test(slot));

  useEffect(() => {
    if (!clientId || !isNumericSlot) return;
    try {
      const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
      adsbygoogle.push({});
    } catch {
      // Ignore AdSense push errors when ad blocker or review script is active
    }
  }, [clientId, isNumericSlot]);

  if (!clientId || !isNumericSlot) {
    return null;
  }

  return (
    <div className={`adsense-unit-wrapper my-4 overflow-hidden ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...(style || {}) }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
