'use client';

import React from "react";
import { motion } from "motion/react";
import {
  Building2,
  Users,
  Database,
  Zap,
  HardDrive,
  Settings,
} from "lucide-react";

export default function OrganizationsPage() {
  const members = [
    {
      name: "Alice Smith",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Bob Jones",
      email: "bob@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Compliance Officer",
      status: "Invited",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Organization
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage members and view organization usage.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <Settings className="h-4 w-4" /> Org Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Current Organization</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Acme Corp
              </h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
            <span className="text-sm text-slate-500">Plan</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Free Tier
            </span>
          </div>
        </motion.div>

        <motion.div
          className="glass-panel rounded-2xl p-6 md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Usage This Month
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Database className="h-4 w-4" /> Databases
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                7<span className="text-sm font-normal text-slate-400">/10</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[70%]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Zap className="h-4 w-4" /> Jobs Run
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                124
                <span className="text-sm font-normal text-slate-400">/500</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[25%]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-500">
                <HardDrive className="h-4 w-4" /> Storage
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                2.4
                <span className="text-sm font-normal text-slate-400">
                  GB / 5GB
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 w-[48%]"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="glass-panel rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#0f1523]">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <Users className="h-5 w-5 text-violet-500" /> Members (3)
          </h2>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700">
            Invite Member
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="p-4 font-medium text-slate-500">Name</th>
                <th className="p-4 font-medium text-slate-500">Role</th>
                <th className="p-4 font-medium text-slate-500">Status</th>
                <th className="p-4 font-medium text-slate-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {members.map((m, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {m.name}
                    </div>
                    <div className="text-slate-500">{m.email}</div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {m.role}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${m.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
