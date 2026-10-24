"use client";

import React from 'react';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#518231] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Sign In Required
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Please sign in with your account to access this workspace.
        </p>
        <button
          type="button"
          onClick={() => signIn()}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white font-semibold text-sm transition-colors"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
