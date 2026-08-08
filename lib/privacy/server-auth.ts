import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { createClient } from '@/lib/supabase/server';

export interface PrivacyUser {
  uid: string;
  email: string | undefined;
}

/**
 * Unified auth for /api/privacy/* routes.
 *
 * Priority:
 *  1. Firebase Bearer token in `Authorization: Bearer <token>` header.
 *  2. Supabase session cookie (fallback for Supabase-native logins).
 *
 * The platform login page uses Firebase auth, so most requests will hit path 1.
 */
export async function getPrivacyUser(req: NextRequest): Promise<PrivacyUser | null> {
  // ── 1. Firebase Bearer token ────────────────────────────────────────────────
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.slice(7);
      const decoded = await adminAuth.verifyIdToken(token);
      return { uid: decoded.uid, email: decoded.email };
    } catch {
      // Token invalid / expired — fall through to Supabase
    }
  }

  // ── 2. Supabase session cookie (fallback) ───────────────────────────────────
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return { uid: user.id, email: user.email ?? undefined };
  } catch {
    // No Supabase client / cookies — fall through
  }

  return null;
}

/**
 * Convenience: return 401 JSON if user is not authenticated.
 * Usage: const user = await requirePrivacyUser(req);
 *        if (user instanceof Response) return user;
 */
export async function requirePrivacyUser(
  req: NextRequest
): Promise<PrivacyUser | Response> {
  const user = await getPrivacyUser(req);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return user;
}
