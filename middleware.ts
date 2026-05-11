import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/', 
    '/(en|es|fr|de)/:path*',
    '/((?!api|_next|_vercel|sitemap\\.xml|robots\\.txt|favicon\\.ico|manifest\\.webmanifest|.*\\..*).*)'
  ]
};
