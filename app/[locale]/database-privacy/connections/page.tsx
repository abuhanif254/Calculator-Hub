"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Database,
  Plus,
  RefreshCw,
  Server,
  Search,
  Activity,
  Link2,
  X,
} from "lucide-react";

type ConnectionStatus = "connected" | "disconnected";

interface DBConnection {
  name: string;
  type: string;
  host: string;
  port: number;
  database: string;
  status: ConnectionStatus;
  tables: number;
  lastSync: string;
}

const initialConnections: DBConnection[] = [
  {
    name: "prod-postgres",
    type: "PostgreSQL",
    host: "db.example.com",
    port: 5432,
    database: "production",
    status: "connected",
    tables: 142,
    lastSync: "2m ago",
  },
  {
    name: "analytics-mysql",
    type: "MySQL",
    host: "mysql.internal",
    port: 3306,
    database: "analytics",
    status: "connected",
    tables: 38,
    lastSync: "15m ago",
  },
  {
    name: "user-mongodb",
    type: "MongoDB",
    host: "mongo.cloud.net",
    port: 27017,
    database: "users",
    status: "disconnected",
    tables: 12,
    lastSync: "2h ago",
  },
  {
    name: "staging-sqlite",
    type: "SQLite",
    host: "localhost",
    port: 0,
    database: "staging.db",
    status: "connected",
    tables: 8,
    lastSync: "1h ago",
  },
];

export default function ConnectionsPage() {
  const [connections, setConnections] = useState(initialConnections);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleTestConnection = (name: string) => {
    setTestingId(name);
    setTimeout(() => {
      setTestingId(null);
      const isSuccess = Math.random() > 0.3; // Random success/fail for demo
      setToast({
        message: isSuccess
          ? "Connection successful!"
          : "Connection failed. Check credentials.",
        type: isSuccess ? "success" : "error",
      });
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    return status === "connected" ? "bg-emerald-500" : "bg-red-500";
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {toast && (
        <div
          className={`fixed bottom-4 right-4 text-white px-4 py-2 rounded-lg shadow-lg z-50 ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Link2 className="w-8 h-8 text-violet-600" />
            Database Connections
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your secure database connections for privacy scanning.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm shadow-violet-600/20"
        >
          <Plus className="w-5 h-5" />
          Add Connection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((conn) => (
          <motion.div
            key={conn.name}
            className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 dark:border-white/10 flex flex-col h-full"
            whileHover={{ y: -4 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <Database className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {conn.name}
                  </h3>
                  <p className="text-xs text-slate-500">{conn.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                <span
                  className={`w-2 h-2 rounded-full ${getStatusColor(conn.status)}`}
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">
                  {conn.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6 flex-grow text-sm">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Server className="w-4 h-4" /> Host
                </span>
                <span className="text-slate-900 dark:text-slate-200 font-mono text-xs">
                  {conn.host}:{conn.port}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4" /> Database
                </span>
                <span className="text-slate-900 dark:text-slate-200">
                  {conn.database}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Synced
                </span>
                <span className="text-slate-900 dark:text-slate-200">
                  {conn.lastSync}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
              <button
                onClick={() => handleTestConnection(conn.name)}
                disabled={testingId === conn.name}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors disabled:opacity-50"
              >
                {testingId === conn.name ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {testingId === conn.name ? "Testing..." : "Test Connection"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-heavy bg-white dark:bg-[#0f172a] rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Add Connection
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Connection Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                  placeholder="e.g., prod-db"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Database Type
                </label>
                <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none">
                  <option>PostgreSQL</option>
                  <option>MySQL</option>
                  <option>MongoDB</option>
                  <option>Redis</option>
                  <option>SQLite</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Host
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                    placeholder="localhost"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Port
                  </label>
                  <input
                    type="number"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                    placeholder="5432"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Database Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                  placeholder="public"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="ssl"
                  className="rounded text-violet-600 focus:ring-violet-500 bg-slate-100 border-slate-300"
                />
                <label
                  htmlFor="ssl"
                  className="text-sm text-slate-600 dark:text-slate-400"
                >
                  Require SSL/TLS
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm shadow-sm"
                >
                  Save Connection
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
