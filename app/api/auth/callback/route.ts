export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth callback handler for Supabase Auth (Google OAuth, magic links, etc.)
 * 
 * Supabase redirects here after the user authenticates with Google.
 * This route is excluded from next-intl middleware (matches /api/*).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const errorParam = searchParams.get('error');
  
  // Read locale from next-intl cookie or default to en
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  const next = '/database-privacy/dashboard';

  // Handle OAuth errors returned by provider
  if (errorParam) {
    console.error('[Supabase Auth Callback] Provider error:', errorParam);
    const redirectUrl = locale === 'en' 
      ? `${origin}/database-privacy/login?error=${encodeURIComponent(errorParam)}`
      : `${origin}/${locale}/database-privacy/login?error=${encodeURIComponent(errorParam)}`;
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successful auth — redirect to the platform dashboard
      const redirectUrl = locale === 'en'
        ? `${origin}${next}`
        : `${origin}/${locale}${next}`;
      return NextResponse.redirect(redirectUrl);
    }

    console.error('[Supabase Auth Callback] Session exchange error:', error.message);
  }

  // Fallback — redirect to login with error state
  const fallbackUrl = locale === 'en'
    ? `${origin}/database-privacy/login?error=auth_failed`
    : `${origin}/${locale}/database-privacy/login?error=auth_failed`;
  return NextResponse.redirect(fallbackUrl);
}
