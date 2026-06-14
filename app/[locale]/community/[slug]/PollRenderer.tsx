"use client";

import React, { useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface PollOption {
  id: string;
  text: string;
  votes: number;
  voterIds: string[];
}

interface PollData {
  question: string;
  options: PollOption[];
  totalVotes: number;
}

interface PollRendererProps {
  postId: string;
  initialPoll: PollData;
}

export function PollRenderer({ postId, initialPoll }: PollRendererProps) {
  const { appUser } = useAuth();
  const [poll, setPoll] = useState<PollData>(initialPoll);
  const [loading, setLoading] = useState(false);

  const hasVoted = appUser ? poll.options.some(opt => opt.voterIds.includes(appUser.uid)) : false;

  const handleVote = async (optionId: string) => {
    if (!appUser || hasVoted || loading) return;
    setLoading(true);

    try {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) return;

      const currentPoll = postSnap.data().poll as PollData;
      if (!currentPoll) return;

      // Prevent double voting globally
      if (currentPoll.options.some(opt => opt.voterIds.includes(appUser.uid))) {
        setPoll(currentPoll);
        setLoading(false);
        return;
      }

      // Increment vote locally
      const updatedOptions = currentPoll.options.map(opt => {
        if (opt.id === optionId) {
          return {
            ...opt,
            votes: opt.votes + 1,
            voterIds: [...opt.voterIds, appUser.uid]
          };
        }
        return opt;
      });

      const updatedPoll: PollData = {
        ...currentPoll,
        options: updatedOptions,
        totalVotes: currentPoll.totalVotes + 1
      };

      await updateDoc(postRef, { poll: updatedPoll });
      setPoll(updatedPoll);
    } catch (err) {
      console.error("Failed to vote", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
        {poll.question}
      </h3>

      <div className="space-y-3">
        {poll.options.map(option => {
          const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
          const isWinner = option.votes > 0 && option.votes === Math.max(...poll.options.map(o => o.votes));
          const userVotedForThis = appUser && option.voterIds.includes(appUser.uid);

          if (hasVoted) {
            return (
              <div key={option.id} className="relative overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4">
                <div 
                  className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out opacity-20 ${userVotedForThis ? 'bg-[#518231]' : isWinner ? 'bg-slate-400' : 'bg-slate-300 dark:bg-slate-600'}`}
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative flex justify-between items-center z-10">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${userVotedForThis ? 'text-[#518231] font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                      {option.text} {userVotedForThis && '(You)'}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-500">
                    {percentage}% <span className="text-xs font-normal opacity-70">({option.votes})</span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={loading || !appUser}
              className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#518231] hover:bg-[#518231]/5 transition-all focus:outline-none focus:ring-2 focus:ring-[#518231] focus:ring-offset-2 dark:focus:ring-offset-slate-900 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-[#518231] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#518231] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <span>{poll.totalVotes} total {poll.totalVotes === 1 ? 'vote' : 'votes'}</span>
        {!appUser && <span className="italic">Sign in to vote</span>}
      </div>
    </div>
  );
}
