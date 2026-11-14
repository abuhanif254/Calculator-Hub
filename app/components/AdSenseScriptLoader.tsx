'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Route patterns where Google AdSense MUST NEVER load or display ads
 * per Google Publisher Policies (No ads on 404/error pages, login/registration,
 * internal search results, empty user profile shells, private messaging, or app settings).
 */
const BLOCKED_AD_ROUTE_SEGMENTS = [
  '/login',
  '/signup',
  '/search',
  '/buscar',
  '/rechercher',
  '/suche',
  '/dashboard',
  '/panel',
  '/tableau-de-bord',
  '/admin',
  '/database-privacy',
  '/embed',
  '/community',
  '/comunidad',
  '/communaute',
  '/gemeinschaft',
  '/privacy-policy',
  '/politica-de-privacidad',
  '/politique-de-confidentialite',
  '/datenschutzrichtlinie',
  '/terms-of-use',
  '/terminos-de-uso',
  '/conditions-d-utilisation',
  '/nutzungsbedingungen',
  '/disclaimer',
  '/descargo-de-responsabilidad',
  '/clause-de-non-responsabilite',
  '/haftungsausschluss',
  '/contact-us',
  '/contactenos',
  '/nous-contacter',
  '/kontakt',
  '/about-us',
  '/sobre-nosotros',
  '/a-propos',
  '/ueber-uns',
  '/sitemap',
  '/mapa-del-sitio',
  '/plan-du-site',
];

export function isAdSenseBlockedPath(pathname: string | null | undefined): boolean {
  if (!pathname) return true;
  const clean = pathname.toLowerCase();
  if (clean.endsWith('/edit')) return true;
  return BLOCKED_AD_ROUTE_SEGMENTS.some(
    (seg) => clean === seg || clean.endsWith(seg) || clean.includes(`${seg}/`) || clean.includes(`${seg}?`)
  );
}

export function AdSenseScriptLoader({ adClientId }: { adClientId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!adClientId || typeof window === 'undefined') return;

    // 1. Never load AdSense on blocked utility/auth/search/admin/community/legal/SaaS routes
    if (isAdSenseBlockedPath(pathname)) {
      return;
    }

    // 2. Verify after DOM paint that this is not a 404/error view or thin/empty shell
    const timer = window.setTimeout(() => {
      if (isAdSenseBlockedPath(window.location.pathname)) return;

      // Never load on 404 / NotFoundView or pages marked noindex
      if (document.querySelector('[data-nexus-404="true"]')) return;
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta && robotsMeta.getAttribute('content')?.toLowerCase().includes('noindex')) {
        return;
      }

      // Ensure substantial publisher text content exists in #global-content (>= 1200 chars / ~200+ words)
      const mainEl = document.getElementById('global-content');
      const visibleTextLength = (mainEl?.innerText || '').replace(/\s+/g, ' ').trim().length;
      if (visibleTextLength < 1200) return;

      // Avoid duplicate script injection
      const existingScript = document.querySelector(
        'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
      );
      if (existingScript) return;

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [adClientId, pathname]);

  return null;
}
