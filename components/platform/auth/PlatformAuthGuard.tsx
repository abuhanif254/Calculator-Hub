'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useAuth } from '@/app/components/AuthProvider';

interface PlatformAuthGuardProps {
  children: React.ReactNode;
}

/**
 * Client-side auth guard for the Data Privacy Platform.
 * 
 * Now uses Firebase Auth via the unified AuthProvider to eliminate
 * cross-domain cookie issues that plagued Supabase Auth.
 */
export default function PlatformAuthGuard({ children }: PlatformAuthGuardProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const loginPath = `/database-privacy/login`;
  
  const { appUser, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (!loading) {
      if (!appUser && !pathname?.includes('/database-privacy/login') && !pathname?.includes('/database-privacy/signup')) {
        window.location.href = loginPath;
      } else {
        setIsReady(true);
      }
    }
  }, [appUser, loading, pathname, loginPath]);

  if (loading || !isReady) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Checking session…</p>
        </div>
      </div>
    );
  }

  // Prevent flashing protected content before redirect
  if (!appUser && !pathname?.includes('/database-privacy/login') && !pathname?.includes('/database-privacy/signup')) {
    return null; 
  }

  return <>{children}</>;
}
