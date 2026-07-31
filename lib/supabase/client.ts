import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client.
 * Used ONLY for the Data Privacy Platform (/database-privacy/*).
 * Firebase Auth is used for the rest of the site.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
