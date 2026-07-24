'use client';

import React from "react";
import { motion } from "motion/react";
import { FolderGit2, Plus, Server, Activity, Clock } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Customer Portal",
      desc: "Main customer facing application database privacy controls.",
      env: "Production",
      connections: 4,
      jobs: 2,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Analytics Data Warehouse",
      desc: "Masking pipelines for BI and analytics environments.",
      env: "Staging",
      connections: 2,
      jobs: 0,
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Legacy CRM Migration",
      desc: "Anonymization jobs for old CRM data migration tests.",
      env: "Development",
      connections: 1,
      jobs: 5,
      lastActive: "15 mins ago",
    },
  ];

  const getEnvColor = (env: string) => {
    switch (env) {
      case "Production":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      case "Staging":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "Development":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Projects
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Organize your connections, masking rules, and jobs by project.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors">
          <Plus className="h-4 w-4" /> Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel rounded-2xl p-6 hover:border-violet-500/30 transition-colors cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                <FolderGit2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getEnvColor(project.env)}`}
              >
                {project.env}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {project.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-2">
              {project.desc}
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800/50 pt-4 mt-auto">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Server className="h-3 w-3" /> Conns
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {project.connections}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Jobs
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {project.jobs}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Active
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-200 text-xs mt-1">
                  {project.lastActive}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
