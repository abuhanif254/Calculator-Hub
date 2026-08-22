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

// Garbage paths injected by PDF metadata scrapers, bot probes, and malformed crawls
const GARBAGE_PATHS = new Set([
  '/Author', '/Producer', '/Kids', '/P', '/XObject', '/28', '/Contents',
  '/page', '/$', '/&', '/egneodunq', '/$', '/admin',
  '/images/*', '/new-path/:slug',
]);

// Locale-aware tool category aliases (old nav paths) → redirect to locale homepage
const LOCALE_TOOL_CATEGORY_PATHS: Record<string, string> = {
  '/de/pdf': '/de', '/de/bild': '/de',
  '/en/image': '/en', '/en/pdf': '/en',
  '/fr/pdf': '/fr', '/fr/image': '/fr',
  '/es/imagen': '/es', '/es/pdf': '/es',
};

// Cross-locale community path aliases (e.g. /fr/community → /fr/communaute)
const LOCALE_COMMUNITY_ALIAS: Record<string, string> = {
  '/de/community': '/de/gemeinschaft',
  '/fr/community': '/fr/communaute',
  '/es/community': '/es/comunidad',
};

export default function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // ── 0. Non-www → www canonical redirect ───────────────────────────────────
  if (hostname === 'nexuscalculator.net') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.nexuscalculator.net';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 1. Calculator slug mismatch redirects (O(1) lookup, highest priority) ──
  const redirectTarget = CALC_REDIRECT_MAP[pathname];
  if (redirectTarget) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTarget;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 2. Garbage / PDF-metadata-scraped paths → homepage ────────────────────
  if (GARBAGE_PATHS.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 3. WordPress / admin probe paths → homepage ───────────────────────────
  if (
    pathname === '/wp-admin/' || pathname === '/wp-admin' ||
    pathname === '/admin/' || pathname === '/admin'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 4a. Old locale-specific tool category paths (/de/pdf, /en/image, etc.) ──
  const toolCategoryRedirect = LOCALE_TOOL_CATEGORY_PATHS[pathname];
  if (toolCategoryRedirect) {
    const url = request.nextUrl.clone();
    url.pathname = toolCategoryRedirect;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 4b. Cross-locale community aliases (/fr/community → /fr/communaute) ───
  const communityAlias = LOCALE_COMMUNITY_ALIAS[pathname];
  if (communityAlias) {
    const url = request.nextUrl.clone();
    url.pathname = communityAlias;
    // preserve ?q= params
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 5. Bare paths without locale prefix → /en/... ─────────────────────────
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

  // ── 6. /[locale]/calculators listing (no slug) → /[locale] ──────────────
  const calcListingMatch = pathname.match(/^\/(en|es|fr|de)\/calculators$/);
  if (calcListingMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/${calcListingMatch[1]}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 7. Old community post format → community index ───────────────────────
  if (/^\/(en|es|fr|de)?\/?(?:community|comunidad|communaute|gemeinschaft)\/to-use-a-/.test(pathname)) {
    const localeMatch = pathname.match(/^\/(en|es|fr|de)\//);
    const locale = localeMatch ? localeMatch[1] : 'en';
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/community`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 8. Hand off all other routing to next-intl ────────────────────────────
  return intlMiddleware(request);
}


export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};