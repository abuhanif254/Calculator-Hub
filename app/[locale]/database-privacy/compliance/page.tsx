'use client'

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, CheckCircle, XCircle, FileText, Download, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_GDPR = [
  { id: 'g1', label: 'Data Processing Records', passed: true },
  { id: 'g2', label: 'Privacy Notice', passed: true },
  { id: 'g3', label: 'Consent Management', passed: true },
  { id: 'g4', label: 'Data Subject Rights', passed: true },
  { id: 'g5', label: 'DPO Appointed', passed: true },
  { id: 'g6', label: 'Breach Notification', passed: true },
  { id: 'g7', label: 'Data Minimization', passed: false },
  { id: 'g8', label: 'Cross-border Transfers', passed: false },
];
const INITIAL_HIPAA = [
  { id: 'h1', label: 'Access Controls', passed: true },
  { id: 'h2', label: 'Audit Logs', passed: true },
  { id: 'h3', label: 'Encryption at Rest', passed: true },
  { id: 'h4', label: 'Encryption in Transit', passed: true },
  { id: 'h5', label: 'Employee Training', passed: true },
  { id: 'h6', label: 'Business Associate Agreements', passed: true },
  { id: 'h7', label: 'Disaster Recovery', passed: false },
];
const INITIAL_PCI = [
  { id: 'p1', label: 'Firewall', passed: true },
  { id: 'p2', label: 'No Default Passwords', passed: true },
  { id: 'p3', label: 'Cardholder Data Protection', passed: true },
  { id: 'p4', label: 'Encrypted Transmission', passed: true },
  { id: 'p5', label: 'Anti-virus', passed: true },
  { id: 'p6', label: 'Secure Systems', passed: true },
  { id: 'p7', label: 'Restrict Access', passed: true },
  { id: 'p8', label: 'Unique IDs', passed: false },
  { id: 'p9', label: 'Physical Access', passed: false },
];
const INITIAL_SOC2 = [
  { id: 's1', label: 'Security Policies', passed: true },
  { id: 's2', label: 'Change Management', passed: true },
  { id: 's3', label: 'Risk Assessment', passed: true },
  { id: 's4', label: 'Incident Response', passed: true },
  { id: 's5', label: 'Vendor Management', passed: true },
  { id: 's6', label: 'Monitoring', passed: true },
];

export default function ComplianceCenter() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [gdpr, setGdpr] = useState(INITIAL_GDPR);
  const [hipaa, setHipaa] = useState(INITIAL_HIPAA);
  const [pci, setPci] = useState(INITIAL_PCI);
  const [soc2, setSoc2] = useState(INITIAL_SOC2);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');

  const toggleExpand = (fw: string) => {
    setExpanded(prev => ({ ...prev, [fw]: !prev[fw] }));
  };

  const handleDownload = () => {
    setToast('Report downloaded!');
    setTimeout(() => setToast(''), 3000);
    setShowModal(false);
  };

  const frameworks = [
    { id: 'gdpr', name: 'GDPR', score: 87, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-600', items: gdpr, setter: setGdpr },
    { id: 'hipaa', name: 'HIPAA', score: 92, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-600', items: hipaa, setter: setHipaa },
    { id: 'pci', name: 'PCI-DSS', score: 79, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-600', items: pci, setter: setPci },
    { id: 'soc2', name: 'SOC 2', score: 95, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-600', items: soc2, setter: setSoc2 },
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
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Compliance Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frameworks.map(fw => {
            const passedCount = fw.items.filter(i => i.passed).length;
            const totalCount = fw.items.length;
            const isExpanded = expanded[fw.id];

            return (
              <div key={fw.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm glass-panel overflow-hidden transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold">{fw.name}</h3>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${fw.color}`}>{fw.score}%</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-6">
                    <div className={`h-2.5 rounded-full ${fw.bg}`} style={{ width: `${fw.score}%` }}></div>
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
                      onClick={() => toggleExpand(fw.id)}
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
                        {fw.items.map(item => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                          >
                            <span className="text-sm font-medium">{item.label}</span>
                            <button
                              onClick={() => {
                                const newItems = fw.items.map(i => i.id === item.id ? { ...i, passed: !i.passed } : i);
                                fw.setter(newItems);
                              }}
                              className={`p-1 rounded-full ${item.passed ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                            >
                              {item.passed ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

      <AnimatePresence>
        {showModal && (
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
                    <span className="text-violet-600 dark:text-violet-400">88.25%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> 26 Passed</span>
                    <span className="text-red-600 flex items-center"><XCircle className="w-4 h-4 mr-1"/> 4 Failed</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-2">Top 3 Recommendations</h4>
                  <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="mr-2">•</span> Implement Data Minimization rules across all DBs.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Ensure Physical Access restrictions are enforced.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Setup Disaster Recovery plan for HIPAA compliance.</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center px-4 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
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
            className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}