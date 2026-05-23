"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Settings2, Download, Copy, RefreshCw, Table, Code, Check, ShieldAlert } from 'lucide-react';
import { generateFakeUsers, formatData, downloadFile, FakeUserOptions, FakeUser, ExportFormat, LocaleType } from './utils';

export function FakeUserDataGenerator() {
  const [options, setOptions] = useState<FakeUserOptions>({
    amount: 10,
    locale: 'US',
    fields: {
      id: true,
      fullName: true,
      username: true,
      email: true,
      password: true,
      phone: true,
      dob: true,
      gender: true,
      address: true,
      country: true,
      city: true,
      zipCode: true,
      company: true,
      jobTitle: true,
      website: true,
      bio: true,
      avatar: true
    },
    passwordOptions: {
      length: 12,
      includeSymbols: true,
      includeNumbers: true
    },
    seed: ""
  });

  const [exportFormat, setExportFormat] = useState<ExportFormat>('JSON');
  const [activeTab, setActiveTab] = useState<'table' | 'code'>('table');
  const [users, setUsers] = useState<FakeUser[]>([]);
  const [formattedOutput, setFormattedOutput] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Search
  const [searchQuery, setSearchQuery] = useState("");

  const handleGenerate = useCallback(() => {
    const generated = generateFakeUsers({
      ...options,
      // If seed is empty, generate a new random seed every time user clicks generate manually
      seed: (options.seed || "").trim() === "" ? Math.random().toString() : options.seed
    });
    setUsers(generated);
  }, [options]);

  useEffect(() => {
    // Initial generation on load
    handleGenerate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFormattedOutput(formatData(users, exportFormat));
  }, [users, exportFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let ext = exportFormat.toLowerCase();
    let type = "text/plain";
    if (ext.startsWith('sql')) { ext = 'sql'; type = "application/sql"; }
    if (ext === 'json') type = "application/json";
    if (ext === 'csv') type = "text/csv";
    if (ext === 'xml') type = "application/xml";
    if (ext === 'yaml') type = "application/x-yaml";
    
    downloadFile(formattedOutput, `fake_users.${ext}`, type);
  };

  const filteredUsers = users.filter(u => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return Object.values(u).some(val => String(val).toLowerCase().includes(q));
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Sidebar Controls */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings2 size={18} className="text-[#518231]" />
            Generation Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Amount ({options.amount})
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={options.amount}
                onChange={(e) => setOptions(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
                className="w-full accent-[#518231]"
              />
              <div className="flex gap-2 mt-2">
                {[1, 10, 50, 100].map(val => (
                  <button
                    key={val}
                    onClick={() => setOptions(prev => ({ ...prev, amount: val }))}
                    className={`flex-1 text-xs py-1 rounded ${options.amount === val ? 'bg-[#518231] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Locale
              </label>
              <select
                value={options.locale}
                onChange={(e) => setOptions(prev => ({ ...prev, locale: e.target.value as LocaleType }))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#518231] outline-none text-slate-700 dark:text-slate-200"
              >
                <option value="Random">Random Global</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="ES">Spain</option>
                <option value="IN">India</option>
                <option value="BD">Bangladesh</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Deterministic Seed (Optional)
              </label>
              <input
                type="text"
                placeholder="Leave blank for random"
                value={options.seed || ""}
                onChange={(e) => setOptions(prev => ({ ...prev, seed: e.target.value }))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#518231] outline-none text-slate-700 dark:text-slate-200"
              />
            </div>
            
            <button
              onClick={handleGenerate}
              className="w-full py-2.5 bg-[#518231] hover:bg-[#426a27] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Generate Data
            </button>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 h-96 overflow-y-auto custom-scrollbar">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Include Fields</h3>
          <div className="space-y-2">
            {Object.keys(options.fields).map((field) => (
              <label key={field} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={options.fields[field as keyof typeof options.fields]}
                  onChange={(e) => setOptions(prev => ({
                    ...prev,
                    fields: { ...prev.fields, [field]: e.target.checked }
                  }))}
                  className="w-4 h-4 text-[#518231] rounded border-slate-300 focus:ring-[#518231]"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3">
          <ShieldAlert className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            <strong>Privacy Note:</strong> All data is algorithmically generated using randomization. It does not reflect real individuals. Use for testing environments only.
          </p>
        </div>
      </div>

      {/* Main Area */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'table' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <Table size={16} />
              Table View
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <Code size={16} />
              Code Export
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-[#518231] outline-none text-slate-700 dark:text-slate-200"
            >
              <option value="JSON">JSON Array</option>
              <option value="SQL_Postgres">SQL (PostgreSQL)</option>
              <option value="SQL_MySQL">SQL (MySQL)</option>
              <option value="CSV">CSV Format</option>
              <option value="XML">XML Document</option>
              <option value="YAML">YAML List</option>
            </select>
            
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-2 text-slate-500 hover:text-[#518231] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors tooltip-trigger"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors tooltip-trigger"
                title="Download file"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          
          {activeTab === 'table' ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <input 
                  type="text" 
                  placeholder="Filter users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#518231]"
                />
                <span className="text-xs text-slate-500 font-medium">Showing {filteredUsers.length} users</span>
              </div>
              <div className="overflow-x-auto flex-grow custom-scrollbar">
                {filteredUsers.length > 0 ? (
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 sticky top-0 z-10">
                      <tr>
                        {Object.keys(filteredUsers[0]).map(key => (
                          <th key={key} className="px-4 py-3 font-medium border-b border-slate-200 dark:border-slate-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {filteredUsers.map((user, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          {Object.entries(user).map(([key, val], cellIdx) => (
                            <td key={cellIdx} className="px-4 py-3">
                              {key === 'avatar' && val ? (
                                <img src={String(val)} alt="Avatar" className="w-8 h-8 rounded-full" loading="lazy" />
                              ) : (
                                <span className={key === 'password' ? 'font-mono text-xs' : ''}>
                                  {String(val).length > 40 ? String(val).substring(0, 40) + '...' : String(val)}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    No users generated or found.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full relative group">
              <pre className="h-full p-4 overflow-auto custom-scrollbar text-sm font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#0d1117] m-0">
                <code>{formattedOutput}</code>
              </pre>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
