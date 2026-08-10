"use client";
export const runtime = 'edge';

import React, { useState, useRef } from "react";

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [ruleProfile, setRuleProfile] = useState('gdpr_strict');

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleProcess = () => {
    if (!file) return;
    setProgress(2);

    const formData = new FormData();
    formData.append('file', file);
    const ext = file.name.split('.').pop()?.toLowerCase();
    const type = (ext === 'csv' || ext === 'json' || ext === 'sql' || ext === 'xml') ? ext : 'findings';
    formData.append('type', type);
    if (ruleProfile) formData.append('rule_profile', ruleProfile);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/privacy/import?type=${type}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 85));
      }
    };

    xhr.onload = () => {
      setProgress(100);
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 400) {
          setResult({ error: data.error ?? 'Import failed' });
        } else {
          setResult({ rows: data.imported ?? 0, pii: data.skipped ?? 0, masked: data.imported ?? 0, errors: data.errors ?? [] });
        }
      } catch {
        setResult({ error: 'Invalid server response' });
      }
    };

    xhr.onerror = () => {
      setProgress(0);
      setResult({ error: 'Network error during upload' });
    };

    xhr.send(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Import & Anonymize Dataset
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Upload a file to securely process and apply masking rules before
          storing.
        </p>
      </div>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
            dragActive
              ? "border-violet-500 bg-violet-500/10"
              : "border-slate-300 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-500 bg-slate-50 dark:bg-[#090E17]/60"
          }`}
        >
          <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg
              className="w-8 h-8 text-violet-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Drop your file here
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Or click to browse from your computer
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {["CSV", "JSON", "SQL", "XML", "PARQUET"].map((fmt) => (
              <span
                key={fmt}
                className="text-[10px] font-bold px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
              >
                {fmt}
              </span>
            ))}
          </div>

          <label className="cursor-pointer px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium transition-colors hover:bg-slate-800 dark:hover:bg-slate-100">
            Select File
            <input
              type="file"
              className="hidden"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </label>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center text-violet-600 dark:text-violet-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {file.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!result && progress === 0 && (
              <button
                onClick={() => setFile(null)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          {!result ? (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  Select Active Rule Profile
                </h4>
                <select value={ruleProfile} onChange={e => setRuleProfile(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
                  <option value="gdpr_strict">GDPR Strict Baseline</option>
                  <option value="hipaa_phi">HIPAA PHI Redaction</option>
                  <option value="dev_sandbox">Development Sandbox (Synthetic)</option>
                </select>
              </div>

              {progress > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-700 dark:text-slate-300">
                      Processing file...
                    </span>
                    <span className="text-violet-600">{progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-600 transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleProcess}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-colors"
                >
                  Process & Import
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Import Complete
              </h3>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {result.rows.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Rows Processed
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="text-2xl font-bold text-orange-500">
                    {result.pii}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    PII Columns Found
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-500">
                    {result.masked.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Cells Masked
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setFile(null);
                  setResult(null);
                  setProgress(0);
                }}
                className="mt-6 px-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
              >
                Import Another File
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
