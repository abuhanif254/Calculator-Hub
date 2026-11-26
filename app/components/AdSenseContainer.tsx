'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { isAdSenseBlockedPath } from './AdSenseScriptLoader';

interface AdSenseContainerProps {
  className?: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: string;
  layoutKey?: string;
  slot?: string;
  responsive?: boolean;
}

interface ResolvedSlotConfig {
  numericSlot?: string;
  minHeight: string;
}

/**
 * Maps symbolic layout placement keys to numeric Google AdSense ad-unit slot IDs
 * configured via NEXT_PUBLIC_ADSENSE_SLOT_* environment variables.
 * - While unset (during AdSense site review), every container collapses to null (0px height).
 * - Once approved and numeric slot IDs are configured in Vercel Environment Variables,
 *   each placement activates automatically with CLS-safe min-height reservations (CLS = 0.00).
 */
const NAMED_SLOT_MAP: Record<string, ResolvedSlotConfig> = {
  calculator_content_top: {
    numericSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALC_TOP,
    minHeight: '100px',
  },
  calculator_content_bottom: {
    numericSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALC_BOTTOM,
    minHeight: '100px',
  },
  calculator_sidebar_1: {
    numericSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALC_SIDEBAR,
    minHeight: '250px',
  },
  guide_content_bottom: {
    numericSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM,
    minHeight: '100px',
  },
  guide_sidebar: {
    numericSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_SIDEBAR,
    minHeight: '250px',
  },
  tools_content_middle: {
    numericSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOLS_MIDDLE,
    minHeight: '100px',
  },
  tools_sidebar: {
    numericSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOLS_SIDEBAR,
    minHeight: '250px',
  },
};

function resolveAdSlot(slot?: string): ResolvedSlotConfig {
  if (!slot) return { numericSlot: undefined, minHeight: '100px' };
  const trimmed = slot.trim();
  if (/^\d+$/.test(trimmed)) {
    return { numericSlot: trimmed, minHeight: '100px' };
  }
  const mapped = NAMED_SLOT_MAP[trimmed];
  if (mapped?.numericSlot && /^\d+$/.test(mapped.numericSlot.trim())) {
    return { numericSlot: mapped.numericSlot.trim(), minHeight: mapped.minHeight };
  }
  return { numericSlot: undefined, minHeight: mapped?.minHeight || '100px' };
}

/**
 * Clean, policy-compliant, CLS-safe Google AdSense container.
 * - Never loads third-party pop-under/iframe ad networks that violate AdSense policies.
 * - Collapses cleanly to null (0px height, zero empty whitespace) unless both
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID and a valid numeric AdSense slot ID are configured.
 * - Reserves fixed CLS-safe minHeight only when an active numeric ad slot is enabled.
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
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const { numericSlot, minHeight } = resolveAdSlot(slot);
  const isBlocked = isAdSenseBlockedPath(pathname);

  useEffect(() => {
    if (!clientId || !numericSlot || isBlocked) return;
    if (typeof document !== 'undefined' && document.querySelector('[data-nexus-404="true"]')) return;
    try {
      const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
      adsbygoogle.push({});
    } catch {
      // Ignore AdSense push errors when ad blocker or review script is active
    }
  }, [clientId, numericSlot, isBlocked, pathname]);

  if (!clientId || !numericSlot || isBlocked) {
    return null;
  }

  const mergedStyle: React.CSSProperties = {
    minHeight,
    ...(style || {}),
  };

  return (
    <div
      className={`adsense-unit-wrapper my-4 w-full overflow-hidden flex items-center justify-center ${className}`}
      style={mergedStyle}
      aria-label="Advertisement"
    >
      <ins
        ref={adRef}
        className="adsbygoogle w-full"
        style={{ display: 'block', minHeight, ...(style || {}) }}
        data-ad-client={clientId}
        data-ad-slot={numericSlot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
