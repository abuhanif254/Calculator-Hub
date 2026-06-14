"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from '@/i18n/routing';
import { Shield, Flag, Trash2, Check, ArrowLeft, ExternalLink, Megaphone, Plus } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';

interface Announcement {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  link?: string;
  linkLabel?: string;
  isActive: boolean;
}

interface Report {
  id: string;
  targetType: 'post' | 'comment';
  targetId: string;
  reporterId: string;
  reason: string;
  status: 'pending' | 'dismissed' | 'resolved';
  createdAt: any;
}

export default function AdminDashboardPage() {
  const { appUser, isAdmin, loading: authLoading } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ message: '', type: 'info' as const, link: '', linkLabel: '' });
  const [postingAnnouncement, setPostingAnnouncement] = useState(false);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) {
      router.push('/community');
      return;
    }

    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: Report[] = [];
      snapshot.forEach((docSnap) => {
        results.push({ id: docSnap.id, ...docSnap.data() } as Report);
      });
      setReports(results);
      setLoading(false);
    });

    // Also listen to announcements
    const annQ = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const annUnsub = onSnapshot(annQ, (snapshot) => {
      setAnnouncements(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Announcement)));
    });

    return () => { unsubscribe(); annUnsub(); };
  }, [isAdmin, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#518231]"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Redirect handled in useEffect
  }

  const handleDismiss = async (reportId: string) => {
    try {
      await updateDoc(doc(db, 'reports', reportId), { status: 'dismissed' });
    } catch (err) {
      console.error("Error dismissing report", err);
    }
  };

  const handleDeleteContent = async (report: Report) => {
    if (!confirm(`Are you sure you want to delete this ${report.targetType}?`)) return;
    try {
      // Delete the actual content
      if (report.targetType === 'post') {
        await deleteDoc(doc(db, 'posts', report.targetId));
      } else {
        await deleteDoc(doc(db, 'comments', report.targetId));
      }
      
      // Mark report as resolved
      await updateDoc(doc(db, 'reports', report.id), { status: 'resolved' });
    } catch (err) {
      console.error("Error deleting content", err);
    }
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.message.trim()) return;
    setPostingAnnouncement(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        ...newAnnouncement,
        isActive: true,
        createdAt: serverTimestamp(),
      });
      setNewAnnouncement({ message: '', type: 'info', link: '', linkLabel: '' });
    } catch (err) {
      console.error('Error posting announcement', err);
    } finally {
      setPostingAnnouncement(false);
    }
  };

  const handleToggleAnnouncement = async (id: string, current: boolean) => {
    await updateDoc(doc(db, 'announcements', id), { isActive: !current }).catch(console.error);
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    await deleteDoc(doc(db, 'announcements', id)).catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120]">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/community" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <Shield size={20} className="text-[#518231]" />
            Moderation Dashboard
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Reports</h2>
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold">
              {reports.filter(r => r.status === 'pending').length} Pending
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="p-12 text-center">
              <Shield size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
              <p className="text-lg font-medium text-slate-900 dark:text-white">All clear!</p>
              <p className="text-slate-500">No content has been reported.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {reports.map((report) => (
                <div key={report.id} className={`p-6 transition-colors ${report.status === 'pending' ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50 opacity-75'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {report.status === 'pending' ? (
                          <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                            Pending Review
                          </span>
                        ) : report.status === 'dismissed' ? (
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                            Dismissed
                          </span>
                        ) : (
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                            Resolved (Deleted)
                          </span>
                        )}
                        <span className="text-xs text-slate-500">
                          {report.createdAt ? new Date(report.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <Flag size={16} className="text-red-500" />
                        Reported {report.targetType === 'post' ? 'Discussion' : 'Comment'}
                      </h3>
                      
                      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        <p><span className="font-medium text-slate-900 dark:text-white">Reason:</span> {report.reason}</p>
                        <p><span className="font-medium text-slate-900 dark:text-white">Reporter ID:</span> {report.reporterId}</p>
                        <p className="flex items-center gap-1 mt-1">
                          <span className="font-medium text-slate-900 dark:text-white">Target ID:</span> 
                          <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">{report.targetId}</span>
                        </p>
                      </div>
                    </div>

                    {report.status === 'pending' && (
                      <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end shrink-0">
                        <button
                          onClick={() => handleDismiss(report.id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Check size={16} /> Dismiss Report
                        </button>
                        <button
                          onClick={() => handleDeleteContent(report)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Trash2 size={16} /> Delete Content
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Announcements Panel */}
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Megaphone size={20} className="text-[#518231]" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Announcements</h2>
          </div>

          {/* Create new */}
          <form onSubmit={handlePostAnnouncement} className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">New Announcement</p>
            <div className="flex gap-3">
              <select
                value={newAnnouncement.type}
                onChange={e => setNewAnnouncement(p => ({ ...p, type: e.target.value as any }))}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#518231]"
              >
                <option value="info">📢 Info</option>
                <option value="warning">⚠️ Warning</option>
                <option value="success">✅ Success</option>
              </select>
              <input
                required
                type="text"
                value={newAnnouncement.message}
                onChange={e => setNewAnnouncement(p => ({ ...p, message: e.target.value }))}
                placeholder="Announcement message..."
                className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="url"
                value={newAnnouncement.link}
                onChange={e => setNewAnnouncement(p => ({ ...p, link: e.target.value }))}
                placeholder="Optional link URL"
                className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
              />
              <input
                type="text"
                value={newAnnouncement.linkLabel}
                onChange={e => setNewAnnouncement(p => ({ ...p, linkLabel: e.target.value }))}
                placeholder='Link label (e.g. "Learn more")'
                className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
              />
              <button
                type="submit"
                disabled={postingAnnouncement}
                className="flex items-center gap-2 px-5 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl text-sm font-bold transition disabled:opacity-60 flex-shrink-0"
              >
                <Plus size={16} /> Post
              </button>
            </div>
          </form>

          {/* Existing announcements */}
          {announcements.length === 0 ? (
            <div className="p-10 text-center">
              <Megaphone size={40} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-slate-500">No announcements yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {announcements.map(ann => (
                <div key={ann.id} className={`p-5 flex items-start justify-between gap-4 transition-colors ${ann.isActive ? '' : 'opacity-50'}`}>
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-xl mt-0.5">{ann.type === 'warning' ? '⚠️' : ann.type === 'success' ? '✅' : '📢'}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{ann.message}</p>
                      {ann.link && <p className="text-xs text-slate-400 mt-0.5 truncate">{ann.link}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleAnnouncement(ann.id, ann.isActive)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        ann.isActive
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {ann.isActive ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
