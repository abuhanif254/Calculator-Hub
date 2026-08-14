import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// ─── Calculator slug redirect map ─────────────────────────────────────────────
// Auto-generated from i18n/routing.ts. Maps every wrong-path variant of a
// calculator URL to its correct canonical locale URL. Covers:
//   1. /{locale}/calculators/{en-slug}  → /{locale}/{localized-prefix}/{localized-slug}
//   2. /{locale}/{prefix}/{wrong-lang-slug} → correct slug for that locale
//   3. /calculators/{translated-slug}   → /{correct-locale}/{prefix}/{translated-slug}
//
// To regenerate: node scripts/generateRedirectMap.js
import { CALC_REDIRECT_MAP } from './lib/calcRedirectMap';

const intlMiddleware = createMiddleware(routing);

// Garbage paths injected by PDF metadata scrapers and bot probes
const GARBAGE_PATHS = new Set(['/Author', '/P', '/XObject', '/28', '/Contents', '/page', '/$', '/&']);

export default function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // ── 0. Non-www → www canonical redirect ───────────────────────────────────
  // Vercel handles this at infra level on most plans, but this ensures it happens
  // at middleware level too, preventing "Page with redirect" in GSC for non-www URLs.
  if (hostname === 'nexuscalculator.net') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.nexuscalculator.net';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 1. Calculator slug mismatch redirects (O(1) lookup, highest priority) ──
  // Must run before next-intl so Google gets a clean 301 without a redirect chain.
  const redirectTarget = CALC_REDIRECT_MAP[pathname];
  if (redirectTarget) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTarget;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 2. Garbage / PDF-metadata-scraped paths → redirect to homepage ─────────
  if (GARBAGE_PATHS.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 3. WordPress / admin probe paths → homepage ───────────────────────────
  if (pathname === '/wp-admin/' || pathname === '/wp-admin' || pathname === '/admin/') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 4. Bare paths without locale prefix → /en/... ────────────────────────
  // Calculator/tool components use href="/calculators/..." (no locale prefix).
  // next-intl would normally redirect these with a double-hop. We short-circuit
  // that here with an explicit 301 → /en/... for all bare-path internal routes.
  // This eliminates the largest source of "Page with redirect" in GSC.
  if (
    pathname.startsWith('/calculators/') ||
    pathname.startsWith('/tools/') ||
    pathname.startsWith('/guides/') ||
    pathname.startsWith('/community') ||
    pathname.startsWith('/collections/') ||
    pathname.startsWith('/compare/') ||
    pathname === '/about-us' ||
    pathname === '/privacy-policy' ||
    pathname === '/terms-of-use' ||
    pathname === '/sitemap' ||
    pathname === '/login' ||
    pathname === '/signup'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 5. /en/calculators listing (no slug) → /en ───────────────────────────
  if (pathname === '/en/calculators') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 6. Old community post format → community index ───────────────────────
  if (/^\/(en|es|fr|de)?\/?(community|comunidad|communaute|gemeinschaft)\/to-use-a-/.test(pathname)) {
    const localeMatch = pathname.match(/^\/(en|es|fr|de)\//);
    const locale = localeMatch ? localeMatch[1] : 'en';
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/community`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 6. Hand off all other routing to next-intl ────────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};