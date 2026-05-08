"use client";

import React from "react";
import { useAuth } from "./AuthProvider";

export function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />;
  }

  if (user) {
    return (
      <div className="relative group">
        <button className="flex items-center gap-2" title={user.displayName || "User"}>
          <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}`} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
        </button>
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
           <div className="p-3 border-b border-slate-100 dark:border-slate-800">
             <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.displayName}</p>
             <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
           </div>
           <button onClick={signOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-b-xl">
             Sign out
           </button>
        </div>
      </div>
    );
  }

  return (
    <button onClick={signIn} className="text-sm font-semibold text-[#518231] hover:text-[#436a28] transition-colors">
      Sign In
    </button>
  );
}
