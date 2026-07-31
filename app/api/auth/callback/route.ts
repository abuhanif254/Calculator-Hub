import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth callback handler for Supabase Auth (Google OAuth, magic links, etc.)
 * 
 * Supabase redirects here after the user authenticates with Google.
 * This route is excluded from next-intl middleware (matches /api/*).
 * 
 * Set this URL in Supabase Dashboard → Authentication → URL Configuration:
 *   Site URL: https://nexuscalculator.net
 *   Redirect URL: https://nexuscalculator.net/api/auth/callback
 * 
 * For local dev also add:
 *   http://localhost:3000/api/auth/callback
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/database-privacy/dashboard';
  const locale = searchParams.get('locale') ?? 'en';
  const errorParam = searchParams.get('error');

  // Handle OAuth errors returned by provider
  if (errorParam) {
    console.error('[Supabase Auth Callback] Provider error:', errorParam);
    return NextResponse.redirect(
      `${origin}/${locale}/database-privacy/login?error=${encodeURIComponent(errorParam)}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successful auth — redirect to the platform dashboard
      return NextResponse.redirect(`${origin}/${locale}${next}`);
    }

    console.error('[Supabase Auth Callback] Session exchange error:', error.message);
  }

  // Fallback — redirect to login with error state
  return NextResponse.redirect(
    `${origin}/en/database-privacy/login?error=auth_failed`
  );
}
