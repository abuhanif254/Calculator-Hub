"use client";

import React from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { Link } from '@/i18n/routing';
import { Edit2 } from 'lucide-react';

export function EditButton({ postAuthorId, slug }: { postAuthorId: string, slug: string }) {
  const { appUser, isAdmin } = useAuth();
  
  if (!appUser) return null;
  
  if (appUser.uid !== postAuthorId && !isAdmin) return null;

  return (
    <Link 
      href={`/community/${slug}/edit` as any}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
    >
      <Edit2 size={14} />
      Edit
    </Link>
  );
}
