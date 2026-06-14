"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

interface MentionUser {
  id: string;
  displayName: string;
  photoURL?: string;
}

interface MentionInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
  className?: string;
  onMentionedUsers?: (users: MentionUser[]) => void;
}

export function MentionInput({
  value,
  onChange,
  placeholder,
  rows = 3,
  id,
  className,
  onMentionedUsers,
}: MentionInputProps) {
  const [suggestions, setSuggestions] = useState<MentionUser[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mentionedUsers, setMentionedUsers] = useState<MentionUser[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchUsers = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      // Firestore prefix search trick: >= "prefix" && < "prefix\uf8ff"
      const usersRef = collection(db, 'users');
      const snap = await getDocs(
        query(
          usersRef,
          where('displayName', '>=', q),
          where('displayName', '<=', q + '\uf8ff'),
          orderBy('displayName'),
          limit(5)
        )
      );

      const results: MentionUser[] = snap.docs.map(d => ({
        id: d.id,
        displayName: d.data().displayName || 'Unknown',
        photoURL: d.data().photoURL || null,
      }));

      setSuggestions(results);
      setShowDropdown(results.length > 0);
      setSelectedIndex(0);
    } catch (err) {
      console.error('Mention search error:', err);
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onChange(text);

    const cursor = e.target.selectionStart;
    // Find the last @ before the cursor that is either at start or preceded by whitespace
    const textBeforeCursor = text.slice(0, cursor);
    const match = textBeforeCursor.match(/(^|[\s\n])@(\w*)$/);

    if (match) {
      const start = cursor - match[2].length - 1; // position of '@'
      setMentionStart(start);
      setMentionQuery(match[2]);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => searchUsers(match[2]), 250);
    } else {
      setMentionStart(null);
      setMentionQuery('');
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  const insertMention = (user: MentionUser) => {
    if (mentionStart === null) return;

    const before = value.slice(0, mentionStart);
    // Find where the query ends in the current value after mentionStart
    const after = value.slice(mentionStart + 1 + mentionQuery.length);
    const newValue = `${before}@${user.displayName} ${after}`;
    onChange(newValue);

    // Track mentioned user
    setMentionedUsers(prev => {
      const updated = prev.find(u => u.id === user.id) ? prev : [...prev, user];
      onMentionedUsers?.(updated);
      return updated;
    });

    setShowDropdown(false);
    setSuggestions([]);
    setMentionStart(null);
    setMentionQuery('');
    setSelectedIndex(0);

    // Restore focus
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (showDropdown) {
        e.preventDefault();
        insertMention(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !textareaRef.current?.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        id={id}
        rows={rows}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
      />

      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 bottom-full left-0 mb-1 w-72 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden"
        >
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700">
            Mention a user
          </div>
          {suggestions.map((user, i) => (
            <button
              key={user.id}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); insertMention(user); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                i === selectedIndex
                  ? 'bg-[#518231]/10 text-[#518231]'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0 text-slate-500 dark:text-slate-300 text-sm font-bold">
                  {user.displayName?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <span className="font-semibold text-sm truncate">@{user.displayName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
