"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { useLocale } from 'next-intl';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace(`/${locale}/login`);
      } else if (!isAdmin) {
        router.replace(`/${locale}/`);
      }
    }
  }, [user, isAdmin, loading, router, locale]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#518231] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user && isAdmin ? <>{children}</> : null;
};
