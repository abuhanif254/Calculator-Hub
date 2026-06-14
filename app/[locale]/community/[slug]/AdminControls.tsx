"use client";

import React, { useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Pin, Lock, Unlock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminControlsProps {
  postId: string;
  isPinned: boolean;
  isLocked: boolean;
}

export function AdminControls({ postId, isPinned, isLocked }: AdminControlsProps) {
  const { appUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (appUser?.role !== 'admin') return null;

  const togglePin = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'posts', postId), {
        isPinned: !isPinned
      });
      router.refresh();
    } catch (err) {
      console.error("Failed to toggle pin", err);
    }
    setLoading(false);
  };

  const toggleLock = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'posts', postId), {
        isLocked: !isLocked
      });
      router.refresh();
    } catch (err) {
      console.error("Failed to toggle lock", err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-500 mb-1">Admin Controls</h3>
      <div className="flex gap-2">
        <button
          onClick={togglePin}
          disabled={loading}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold rounded-lg border transition-colors ${
            isPinned 
              ? 'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700' 
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
        >
          <Pin size={16} className={isPinned ? "fill-current" : ""} />
          {isPinned ? 'Unpin Post' : 'Pin Post'}
        </button>
        
        <button
          onClick={toggleLock}
          disabled={loading}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold rounded-lg border transition-colors ${
            isLocked 
              ? 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-700' 
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
        >
          {isLocked ? <Unlock size={16} /> : <Lock size={16} />}
          {isLocked ? 'Unlock Thread' : 'Lock Thread'}
        </button>
      </div>
    </div>
  );
}
