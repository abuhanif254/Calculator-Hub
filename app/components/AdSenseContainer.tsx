'use client';

import React from 'react';
import { ArrowRight, Server, ShieldCheck } from 'lucide-react';

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
  style,
  slot,
}: AdSenseContainerProps) {
  
  // ⚙️ CONFIGURATION: Set everything to 'ad_network' to show Adsterra!
  const adStrategy: Record<string, 'affiliate' | 'ad_network'> = {
    tools_top_leaderboard: 'ad_network', 
    tools_sidebar_top: 'ad_network',       
    tools_sidebar: 'ad_network',          
    tools_content_middle: 'ad_network',    
    default: 'ad_network'
  };

  const currentMode = adStrategy[slot || 'default'] || adStrategy.default;

  // ==========================================
  // MODE 1: 3RD PARTY AD NETWORK (Adsterra)
  // ==========================================
  // We use a safe iframe approach because Adsterra's invoke.js breaks React apps if injected directly.
  if (currentMode === 'ad_network') {
    const isSidebar = slot === 'tools_sidebar' || slot === 'tools_sidebar_top';
    const adWidth = isSidebar ? 300 : 728;
    const adHeight = isSidebar ? 250 : 90;
    const htmlFile = isSidebar ? "/ad-300.html" : "/ad-728.html";

    return (
      <div 
        className={`ad-network-container w-full flex justify-center items-center overflow-hidden my-4 ${className}`} 
        style={{ minHeight: `${adHeight}px`, ...style }}
      >
        <iframe 
          src={htmlFile}
          width={adWidth} 
          height={adHeight} 
          frameBorder="0" 
          scrolling="no"
          style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
          title="Advertisement"
          loading="lazy"
        />
      </div>
    );
  }

  // ==========================================
  // MODE 2: CUSTOM AFFILIATE BANNER
  // ==========================================
  const affiliateLinks = {
    digitalOcean: "https://digitalocean.com/?refcode=example",
  };

  if (slot === "tools_sidebar" || slot === "tools_sidebar_top") {
    return (
      <a 
        href={affiliateLinks.digitalOcean}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block w-full relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all p-6 ${className}`}
        style={style}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
        <div className="relative z-10">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500 mb-4 block">Sponsored</span>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
            <Server size={24} />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
            Deploy Next.js for $5/mo
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Get $200 in free credit when you host your apps on DigitalOcean's App Platform.
          </p>
          <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400">
            Claim $200 Credit <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </a>
    );
  }

  return (
    <a 
      href={affiliateLinks.digitalOcean}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col sm:flex-row items-center justify-between w-full relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/50 shadow-sm hover:shadow-md transition-all p-4 sm:p-6 ${className}`}
      style={style}
    >
      <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
      <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto mb-4 sm:mb-0">
        <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <ShieldCheck size={28} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">Ad</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Secure Cloud Hosting
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
            Start deploying your web apps in seconds with $200 free credit.
          </p>
        </div>
      </div>
      <div className="relative z-10 w-full sm:w-auto flex justify-center sm:justify-end shrink-0">
        <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
          Get Started <ArrowRight size={16} />
        </span>
      </div>
    </a>
  );
}

