"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Trophy, Medal, User as UserIcon, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface LeaderboardUser {
  id: string;
  displayName: string;
  photoURL?: string;
  role?: string;
  badges?: string[];
  reputation: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('reputation', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const topUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          reputation: doc.data().reputation || 0
        })) as LeaderboardUser[];
        
        // Filter out those with 0 reputation if we want to show active users only
        setUsers(topUsers.filter(u => u.reputation > 0));
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopUsers();
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-500 mb-6 shadow-sm">
            <Trophy size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Community Leaderboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Recognizing our top contributors. Earn reputation points by receiving upvotes on your discussions and providing accepted solutions to questions.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 md:p-8">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <p className="text-slate-500 dark:text-slate-400 font-medium">The leaderboard is currently empty. Be the first to earn reputation points!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user, index) => (
                  <div 
                    key={user.id} 
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex-shrink-0 w-8 md:w-12 text-center font-bold text-xl text-slate-400 dark:text-slate-500 transition-transform group-hover:scale-110">
                      {index === 0 && <Medal className="text-amber-400 mx-auto" size={28} />}
                      {index === 1 && <Medal className="text-slate-300 mx-auto" size={28} />}
                      {index === 2 && <Medal className="text-amber-600 mx-auto" size={28} />}
                      {index > 2 && `#${index + 1}`}
                    </div>
                    
                    <div className="flex-shrink-0">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-sm">
                          <UserIcon size={20} className="text-slate-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link href={`/community/user/${user.id}` as any} className="font-bold text-lg text-slate-900 dark:text-white truncate hover:text-[#518231] hover:underline transition-colors">
                          {user.displayName || "Community Member"}
                        </Link>
                        {user.role === 'admin' && (
                          <span className="bg-[#518231]/10 text-[#518231] dark:bg-[#518231]/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider hidden sm:inline-block">Admin</span>
                        )}
                        {user.role === 'pro' && (
                          <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider hidden sm:inline-block">Pro</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="inline-flex items-center gap-1.5 bg-[#518231]/10 text-[#518231] px-4 py-2 rounded-xl font-bold">
                        <Star size={18} className="fill-[#518231]" />
                        <span className="text-lg leading-none">{user.reputation.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
