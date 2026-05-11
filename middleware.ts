import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // NUCLEAR BYPASS: If the path is a sitemap or XML/TXT file, 
  // skip internationalization logic entirely to prevent HTML redirects.
  if (
    pathname.includes('sitemap') || 
    pathname.endsWith('.xml') || 
    pathname.endsWith('.txt') ||
    pathname.startsWith('/robots.txt')
  ) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/', 
    '/(en|es|fr|de)/:path*',
    // Standard Next.js exclusion list for assets
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
