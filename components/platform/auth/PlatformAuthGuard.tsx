'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface PlatformAuthGuardProps {
  children: React.ReactNode;
}

/**
 * Client-side auth guard for the Data Privacy Platform.
 * Checks Supabase session. Redirects to platform login if unauthenticated.
 * Does NOT affect Firebase Auth used by the rest of the site.
 */
export default function PlatformAuthGuard({ children }: PlatformAuthGuardProps) {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace(`/${locale}/database-privacy/login`);
      } else {
        setIsAuthenticated(true);
      }
      setIsChecking(false);
    });

    // Listen for auth state changes (login/logout in another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setIsAuthenticated(false);
          router.replace(`/${locale}/database-privacy/login`);
        } else {
          setIsAuthenticated(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, locale]);

  // Show a loading state while checking auth
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Checking session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
