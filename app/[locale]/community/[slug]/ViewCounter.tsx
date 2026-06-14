'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
  postId: string;
  initialCount?: number;
}

export function ViewCounter({ postId, initialCount = 0 }: ViewCounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const KEY = `nexus_viewed_${postId}`;
    // Only count once per browser session
    if (sessionStorage.getItem(KEY)) {
      // Already counted — just fetch latest count silently
      getDoc(doc(db, 'posts', postId))
        .then(snap => {
          if (snap.exists() && typeof snap.data().viewCount === 'number') {
            setCount(snap.data().viewCount);
          }
        })
        .catch(() => {});
      return;
    }

    sessionStorage.setItem(KEY, '1');

    updateDoc(doc(db, 'posts', postId), { viewCount: increment(1) })
      .then(() => {
        setCount(prev => prev + 1);
      })
      .catch(() => {});
  }, [postId]);

  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
      <Eye size={13} />
      {count.toLocaleString()} {count === 1 ? 'view' : 'views'}
    </span>
  );
}
