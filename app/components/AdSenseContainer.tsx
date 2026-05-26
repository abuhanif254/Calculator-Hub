'use client';

import React from 'react';

interface AdSenseContainerProps {
  className?: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: string;
  layoutKey?: string;
  slot?: string;
  responsive?: boolean;
}

export function AdSenseContainer({
  className = '',
  style = { display: 'block' },
}: AdSenseContainerProps) {
  // Returns an empty div that reserves the space but shows no ads.
  return (
    <div 
      className={`adsense-wrapper overflow-hidden flex justify-center ${className}`}
      style={{ minHeight: '100px', ...style }}
    />
  );
}
