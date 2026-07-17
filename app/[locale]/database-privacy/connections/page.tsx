'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Database, ShieldAlert } from 'lucide-react';
import { PageHeader, EmptyState } from '../../../components/platform/ui/PlatformUI';
import { Connection, ConnectionCard, ConnectionFormDrawer } from '../../../components/platform/connections/ConnectionsModule';
import { useToast } from '../../../components/platform/ui/Toast';
import { apiUrl } from '../../../lib/api';

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchConnections = async () => {
    setLoading(true);
    try {
      // Create table if doesn't exist (handled gracefully by backend too)
      await fetch(apiUrl('/api/connections/setup'), { method: 'POST' });
      
      const res = await fetch(apiUrl('/api/connections'));
      if (res.ok) {
        const data = await res.json();
        setConnections(data);
      } else {
        setError('Failed to fetch connections');
      }
    } catch (err) {
      setError('Could not connect to Database Backend. Make sure the Worker is running on port 8787.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleSave = async (conn: Connection) => {
    try {
      const res = await fetch(apiUrl('/api/connections'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conn),
      });
      if (res.ok) {
        setDrawerOpen(false);
        fetchConnections();
        toast.success('Connection saved', 'Your database connection was added successfully.');
      } else {
        toast.error('Failed to save connection', 'Please check your connection details and try again.');
      }
    } catch (e) {
      toast.error('Error saving connection', 'Could not reach the backend worker.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this connection?')) return;
    try {
      await fetch(apiUrl(`/api/connections/${id}`), { method: 'DELETE' });
      fetchConnections();
      toast.success('Connection deleted');
    } catch (e) {
      toast.error('Error deleting connection');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Database Connections"
        subtitle="Manage your connected databases and data sources"
      >
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(139,92,246,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Connection
        </button>
      </PageHeader>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : connections.length === 0 && !error ? (
        <EmptyState
          icon={Database}
          title="No Connections Found"
          description="Connect your first database to start scanning and masking sensitive data."
          action={
            <button
              onClick={() => setDrawerOpen(true)}
              className="bg-white/10 hover:bg-white/15 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Add Connection
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {connections.map(c => (
            <ConnectionCard key={c.id} conn={c} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {drawerOpen && (
        <ConnectionFormDrawer
          onClose={() => setDrawerOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
