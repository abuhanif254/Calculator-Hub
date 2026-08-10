'use client'
export const runtime = 'edge';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, CheckCircle, XCircle, FileText, Download, X, ChevronDown, ChevronUp, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';

interface ComplianceItem { id: string; label: string; passed: boolean; }
interface ComplianceData {
  gdpr: { items: ComplianceItem[], score: number };
  hipaa: { items: ComplianceItem[], score: number };
  pci: { items: ComplianceItem[], score: number };
  soc2: { items: ComplianceItem[], score: number };
}

type FrameworkKey = keyof ComplianceData;

export default function ComplianceCenter() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [data, setData] = useState<ComplianceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  
  const [showModal, setShowModal] = useState(false);
  const [reportData, setReportData] = useState<{ overallScore: number, passed: number, failed: number, recommendations: string[] } | null>(null);
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchComplianceData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await privacyFetch('/api/privacy/compliance');
      if (!res.ok) throw new Error('Failed to fetch compliance data');
      const json = await res.json();
      setData(json.frameworks);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching compliance data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplianceData();
  }, [fetchComplianceData]);

  const toggleExpand = (fw: string) => {
    setExpanded(prev => ({ ...prev, [fw]: !prev[fw] }));
  };

  const handleToggleItem = async (framework: FrameworkKey, item: ComplianceItem) => {
    if (updatingItem) return;
    const updateKey = `${framework}:${item.id}`;
    setUpdatingItem(updateKey);
    try {
      const res = await privacyFetch('/api/privacy/compliance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ framework, itemId: item.id, passed: !item.passed }),
      });
      if (!res.ok) throw new Error('Failed to update compliance item');
      const updatedFramework = await res.json();
      
      setData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [framework]: {
            items: updatedFramework.items,
            score: updatedFramework.score,
          }
        };
      });
      showToast('Item updated successfully');
    } catch (err: any) {
      showToast(err.message || 'Error updating item', 'error');
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleGenerateReport = () => {
    if (!data) return;
    let totalScore = 0;
    let passed = 0;
    let failed = 0;
    let recommendations: string[] = [];

    const frameworks: FrameworkKey[] = ['gdpr', 'hipaa', 'pci', 'soc2'];
    frameworks.forEach(fw => {
      totalScore += data[fw].score;
      data[fw].items.forEach(item => {
        if (item.passed) {
          passed++;
        } else {
          failed++;
          recommendations.push(item.label);
        }
      });
    });

    setReportData({
      overallScore: totalScore / 4,
      passed,
      failed,
      recommendations
    });
    setShowModal(true);
  };

  const handleDownload = () => {
    if (!reportData) return;
    const textContent = `Compliance Report
Date: ${new Date().toLocaleDateString()}
Overall Score: ${reportData.overallScore.toFixed(2)}%

Passed: ${reportData.passed}
Failed: ${reportData.failed}

Recommendations (Failed Items):
${reportData.recommendations.map(r => `- ${r}`).join('\n')}
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compliance_report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Report downloaded!');
    setShowModal(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-600';
    if (score >= 50) return 'bg-amber-600';
    return 'bg-red-600';
  };

  const frameworkConfig: { id: FrameworkKey; name: string }[] = [
    { id: 'gdpr', name: 'GDPR' },
    { id: 'hipaa', name: 'HIPAA' },
    { id: 'pci', name: 'PCI-DSS' },
    { id: 'soc2', name: 'SOC 2' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 font-sans text-slate-900 dark:text-slate-100 relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <ShieldCheck className="w-8 h-8 mr-3 text-violet-600" />
              Compliance Center
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Track your regulatory compliance posture</p>
          </div>
          <button
            onClick={handleGenerateReport}
            disabled={!data || loading}
            className="inline-flex items-center px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Compliance Report
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
            <AlertCircle className="w-8 h-8 mx-auto text-red-500 mb-3" />
            <p className="text-red-700 dark:text-red-400 font-medium mb-4">{error}</p>
            <button
              onClick={fetchComplianceData}
              className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Retry
            </button>
          </div>
        )}

        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-48 animate-pulse flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                </div>
                <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworkConfig.map(config => {
              const fw = data[config.id];
              const passedCount = fw.items.filter(i => i.passed).length;
              const totalCount = fw.items.length;
              const isExpanded = expanded[config.id];
              
              const scoreColor = getScoreColor(fw.score);
              const scoreBg = getScoreBgColor(fw.score);

              return (
                <div key={config.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm glass-panel overflow-hidden transition-all">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold">{config.name}</h3>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${scoreColor}`}>{fw.score}%</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-6 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${fw.score}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-2.5 rounded-full ${scoreBg}`} 
                      />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex space-x-4">
                        <span className="flex items-center text-emerald-600 dark:text-emerald-500">
                          <CheckCircle className="w-4 h-4 mr-1" /> {passedCount} passed
                        </span>
                        <span className="flex items-center text-red-600 dark:text-red-500">
                          <XCircle className="w-4 h-4 mr-1" /> {totalCount - passedCount} failed
                        </span>
                      </div>
                      <button
                        onClick={() => toggleExpand(config.id)}
                        className="text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium flex items-center"
                      >
                        {isExpanded ? (
                          <><ChevronUp className="w-4 h-4 mr-1" /> Collapse</>
                        ) : (
                          <><ChevronDown className="w-4 h-4 mr-1" /> Expand</>
                        )}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                      >
                        <div className="p-4 space-y-2">
                          {fw.items.map(item => {
                            const isUpdating = updatingItem === `${config.id}:${item.id}`;
                            return (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                              >
                                <span className="text-sm font-medium">{item.label}</span>
                                <button
                                  onClick={() => handleToggleItem(config.id, item)}
                                  disabled={isUpdating}
                                  className={`p-1 rounded-full flex items-center justify-center transition-colors ${item.passed ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'} disabled:opacity-50`}
                                >
                                  {isUpdating ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                  ) : item.passed ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : (
                                    <XCircle className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

      </div>

      <AnimatePresence>
        {showModal && reportData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold">Compliance Report</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-500">Date: {new Date().toLocaleDateString()}</p>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Overall Score</span>
                    <span className={getScoreColor(reportData.overallScore)}>{reportData.overallScore.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> {reportData.passed} Passed</span>
                    <span className="text-red-600 flex items-center"><XCircle className="w-4 h-4 mr-1"/> {reportData.failed} Failed</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-2">Recommendations</h4>
                  {reportData.recommendations.length > 0 ? (
                    <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400 max-h-40 overflow-y-auto pr-2">
                      {reportData.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start"><span className="mr-2">•</span> {rec}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">All compliance checks passed! Excellent work.</p>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center px-4 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 text-white px-6 py-3 rounded-xl shadow-lg flex items-center z-50 ${toast.type === 'error' ? 'bg-red-600' : 'bg-slate-900'}`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 mr-2 text-red-200" />
            ) : (
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}