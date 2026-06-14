"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { SmilePlus } from 'lucide-react';

// Emoji keyed by safe Firestore field name
export const REACTIONS = [
  { key: 'heart',    emoji: '❤️',  label: 'Love'    },
  { key: 'fire',     emoji: '🔥',  label: 'Fire'    },
  { key: 'thumbsup', emoji: '👍',  label: 'Nice'    },
  { key: 'laugh',    emoji: '😂',  label: 'Funny'   },
  { key: 'thinking', emoji: '🤔',  label: 'Hmm'     },
  { key: 'wow',      emoji: '😮',  label: 'Wow'     },
] as const;

export type ReactionKey = typeof REACTIONS[number]['key'];

// reactions map: { heart: ['uid1', 'uid2'], fire: ['uid1'] }
export type ReactionsMap = Partial<Record<ReactionKey, string[]>>;

interface ReactionBarProps {
  commentId: string;
  initialReactions?: ReactionsMap;
}

export function ReactionBar({ commentId, initialReactions = {} }: ReactionBarProps) {
  const { appUser } = useAuth();
  const [reactions, setReactions] = useState<ReactionsMap>(initialReactions);
  const [showPicker, setShowPicker] = useState(false);
  const [animating, setAnimating] = useState<ReactionKey | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close picker on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (
        pickerRef.current && !pickerRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const toggleReaction = async (key: ReactionKey) => {
    if (!appUser) {
      alert('You must be logged in to react.');
      return;
    }

    const uid = appUser.uid;
    const current = reactions[key] || [];
    const hasReacted = current.includes(uid);

    // Optimistic update
    setReactions(prev => ({
      ...prev,
      [key]: hasReacted
        ? (prev[key] || []).filter(id => id !== uid)
        : [...(prev[key] || []), uid],
    }));

    // Animate
    if (!hasReacted) {
      setAnimating(key);
      setTimeout(() => setAnimating(null), 400);
    }

    setShowPicker(false);

    // Firestore write using dot-notation for nested map field
    try {
      await updateDoc(doc(db, 'comments', commentId), {
        [`reactions.${key}`]: hasReacted ? arrayRemove(uid) : arrayUnion(uid),
      });
    } catch (err) {
      console.error('Reaction error:', err);
      // Rollback on error
      setReactions(prev => ({
        ...prev,
        [key]: hasReacted
          ? [...(prev[key] || []), uid]
          : (prev[key] || []).filter(id => id !== uid),
      }));
    }
  };

  // Only render reaction pills that have at least one reaction OR are being added
  const activeReactions = REACTIONS.filter(r => (reactions[r.key]?.length || 0) > 0);

  return (
    <div className="flex items-center gap-1.5 flex-wrap mt-2">
      {/* Active reaction pills */}
      {activeReactions.map(({ key, emoji, label }) => {
        const users = reactions[key] || [];
        const hasReacted = appUser ? users.includes(appUser.uid) : false;
        const count = users.length;

        return (
          <button
            key={key}
            type="button"
            onClick={() => toggleReaction(key)}
            title={label}
            className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
              border transition-all duration-200 select-none
              ${hasReacted
                ? 'bg-[#518231]/10 border-[#518231]/40 text-[#518231] dark:bg-[#518231]/20'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
              }
              ${animating === key ? 'scale-110' : 'scale-100'}
            `}
          >
            <span
              className={`text-sm transition-transform duration-300 inline-block ${
                animating === key ? 'animate-bounce' : ''
              }`}
            >
              {emoji}
            </span>
            <span>{count}</span>
          </button>
        );
      })}

      {/* Add reaction button */}
      {appUser && (
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setShowPicker(p => !p)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-dashed border-slate-300 dark:border-slate-600 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 select-none"
            title="Add reaction"
          >
            <SmilePlus size={13} />
          </button>

          {showPicker && (
            <div
              ref={pickerRef}
              className="absolute bottom-full left-0 mb-2 z-50 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-2 flex items-center gap-1"
            >
              {REACTIONS.map(({ key, emoji, label }) => {
                const hasReacted = appUser ? (reactions[key] || []).includes(appUser.uid) : false;
                return (
                  <button
                    key={key}
                    type="button"
                    onMouseDown={e => { e.preventDefault(); toggleReaction(key); }}
                    title={label}
                    className={`
                      text-xl w-9 h-9 rounded-xl flex items-center justify-center
                      transition-all duration-150 hover:scale-125
                      ${hasReacted
                        ? 'bg-[#518231]/15 ring-2 ring-[#518231]/40'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
