"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from '@/i18n/routing';
import { User as UserIcon, Globe, Twitter, Github, ArrowLeft, Save, CheckCircle, BarChart3, Eye, Heart, MessageCircle } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function ProfileSettingsPage() {
  const { appUser } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    displayName: '',
    bio: '',
    website: '',
    twitter: '',
    github: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{
    totalViews: number;
    totalUpvotes: number;
    totalReplies: number;
    bestPost: { title: string; slug: string; views: number } | null;
    loadingStats: boolean;
  }>({ totalViews: 0, totalUpvotes: 0, totalReplies: 0, bestPost: null, loadingStats: true });

  useEffect(() => {
    if (!appUser) return;
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', appUser.uid));
        if (snap.exists()) {
          const d = snap.data();
          setForm({
            displayName: d.displayName || appUser.displayName || '',
            bio: d.bio || '',
            website: d.website || '',
            twitter: d.twitter || '',
            github: d.github || '',
          });
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();

    // Fetch author stats from posts
    const fetchStats = async () => {
      if (!appUser) return;
      try {
        const q = query(collection(db, 'posts'), where('authorId', '==', appUser.uid));
        const snap = await getDocs(q);
        let totalViews = 0, totalUpvotes = 0, totalReplies = 0;
        let bestPost: { title: string; slug: string; views: number } | null = null;
        snap.forEach(d => {
          const data = d.data();
          totalViews += data.viewCount || 0;
          totalUpvotes += data.likesCount || data.upvotes || 0;
          totalReplies += data.replyCount || 0;
          const views = data.viewCount || 0;
          if (!bestPost || views > bestPost.views) {
            bestPost = { title: data.title, slug: data.slug, views };
          }
        });
        setStats({ totalViews, totalUpvotes, totalReplies, bestPost, loadingStats: false });
      } catch {
        setStats(s => ({ ...s, loadingStats: false }));
      }
    };
    fetchStats();
  }, [appUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appUser) return;
    setSaving(true);
    setError('');
    try {
      await updateDoc(doc(db, 'users', appUser.uid), {
        displayName: form.displayName.trim() || appUser.displayName,
        bio: form.bio.trim(),
        website: form.website.trim(),
        twitter: form.twitter.replace('@', '').trim(),
        github: form.github.replace('@', '').trim(),
        updatedAt: serverTimestamp(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save profile', err);
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!appUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center">
        <p className="text-slate-500">You must be logged in to edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Back link */}
        <Link
          href={`/community/user/${appUser.uid}` as any}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to My Profile
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#518231] to-[#3a5e23] p-8">
            <div className="flex items-center gap-4">
              {appUser.photoURL ? (
                <img src={appUser.photoURL} alt={appUser.displayName || ''} className="w-16 h-16 rounded-full object-cover border-4 border-white/30 shadow-md" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
                  <UserIcon size={28} className="text-white" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-extrabold text-white">Edit Profile</h1>
                <p className="text-white/70 text-sm mt-0.5">Personalize how you appear to the community</p>
              </div>
            </div>
          </div>

          {/* Form */}
          {loading ? (
            <div className="p-10 flex justify-center">
              <div className="animate-spin h-8 w-8 rounded-full border-b-2 border-[#518231]" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="p-8 space-y-6">

              {/* Display Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="displayName">
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  maxLength={40}
                  value={form.displayName}
                  onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))}
                  placeholder="Your public name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition"
                />
                <p className="text-xs text-slate-400 mt-1">This is how others will see your name across the community.</p>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={3}
                  maxLength={200}
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Tell the community a bit about yourself..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition resize-none"
                />
                <p className="text-xs text-slate-400 mt-1 text-right">{form.bio.length}/200</p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Social Links</p>
                <div className="space-y-4">

                  {/* Website */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Globe size={18} className="text-slate-400" />
                    </div>
                    <input
                      type="url"
                      value={form.website}
                      onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                      placeholder="https://yourwebsite.com"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition text-sm"
                    />
                  </div>

                  {/* Twitter / X */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center flex-shrink-0">
                      <Twitter size={18} className="text-sky-500" />
                    </div>
                    <div className="flex-1 flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-[#518231]">
                      <span className="px-3 py-2.5 text-slate-400 text-sm select-none">@</span>
                      <input
                        type="text"
                        value={form.twitter}
                        onChange={e => setForm(f => ({ ...f, twitter: e.target.value.replace('@', '') }))}
                        placeholder="username"
                        className="flex-1 py-2.5 pr-4 bg-transparent text-slate-900 dark:text-white focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Github size={18} className="text-slate-600 dark:text-slate-300" />
                    </div>
                    <div className="flex-1 flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-[#518231]">
                      <span className="px-3 py-2.5 text-slate-400 text-sm select-none">@</span>
                      <input
                        type="text"
                        value={form.github}
                        onChange={e => setForm(f => ({ ...f, github: e.target.value.replace('@', '') }))}
                        placeholder="username"
                        className="flex-1 py-2.5 pr-4 bg-transparent text-slate-900 dark:text-white focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3">{error}</p>
              )}

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`/community/user/${appUser.uid}` as any}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl text-sm font-bold transition disabled:opacity-60 shadow-sm"
                >
                  {saved ? (
                    <><CheckCircle size={16} /> Saved!</>
                  ) : saving ? (
                    'Saving...'
                  ) : (
                    <><Save size={16} /> Save Changes</>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* My Stats Card */}
        <div className="mt-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <BarChart3 size={18} className="text-[#518231]" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">My Content Stats</h2>
          </div>
          {stats.loadingStats ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin h-6 w-6 rounded-full border-b-2 border-[#518231]" />
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Eye size={13} /> Views
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.totalViews.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Heart size={13} /> Upvotes
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.totalUpvotes.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <MessageCircle size={13} /> Replies
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.totalReplies.toLocaleString()}</p>
                </div>
              </div>
              {stats.bestPost && (
                <div className="bg-[#518231]/5 dark:bg-[#518231]/10 border border-[#518231]/20 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#518231] mb-1">🏆 Best Performing Post</p>
                  <Link
                    href={`/community/${stats.bestPost.slug}` as any}
                    className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#518231] transition-colors line-clamp-1"
                  >
                    {stats.bestPost.title}
                  </Link>
                  <p className="text-xs text-slate-400 mt-0.5">{stats.bestPost.views.toLocaleString()} views</p>
                </div>
              )}
              {stats.totalViews === 0 && !stats.bestPost && (
                <p className="text-sm text-slate-400 text-center">Post something to start tracking your stats!</p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
