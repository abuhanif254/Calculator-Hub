"use client";

import React, { useState } from 'react';
import { Flag, X } from 'lucide-react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ReportButtonProps {
  targetType: 'post' | 'comment';
  targetId: string;
  className?: string;
  iconSize?: number;
}

export function ReportButton({ targetType, targetId, className = "", iconSize = 16 }: ReportButtonProps) {
  const { appUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('spam');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!appUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appUser || loading) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'reports'), {
        targetType,
        targetId,
        reporterId: appUser.uid,
        reason,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to submit report", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors ${className}`}
        title={`Report ${targetType}`}
      >
        <Flag size={iconSize} />
        <span className="sr-only sm:not-sr-only sm:text-xs sm:font-medium">Report</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden relative" style={{ animation: "fadeInUp 0.2s ease-out" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Flag size={18} className="text-red-500" />
                Report {targetType === 'post' ? 'Discussion' : 'Comment'}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white text-lg mb-1">Report Submitted</p>
                  <p className="text-slate-500 text-sm">Our moderators will review this shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Please select a reason for reporting this {targetType}. This helps our moderators take action quickly.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'spam', label: 'Spam or irrelevant' },
                      { id: 'harassment', label: 'Harassment or hate speech' },
                      { id: 'inappropriate', label: 'Inappropriate content' },
                      { id: 'other', label: 'Other violation' }
                    ].map(option => (
                      <label key={option.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <input
                          type="radio"
                          name="reason"
                          value={option.id}
                          checked={reason === option.id}
                          onChange={(e) => setReason(e.target.value)}
                          className="text-[#518231] focus:ring-[#518231] w-4 h-4"
                        />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit Report'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
