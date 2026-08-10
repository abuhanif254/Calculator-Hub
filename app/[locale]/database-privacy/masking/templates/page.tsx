export const runtime = 'edge';
"use client";

import React, { useState, useRef } from "react";
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';

const TEMPLATES = [
  { id: 'gdpr', name: "GDPR Starter Kit", category: "Compliance", desc: "Baseline rules for EU GDPR compliance. Masks PII like names, emails, and IPs.", rules: 12, icon: "🇪🇺",
    rulePayloads: [
      { column_pattern: 'email', strategy: 'redact', pii_type: 'EMAIL' },
      { column_pattern: 'first_name', strategy: 'redact', pii_type: 'NAME' },
      { column_pattern: 'last_name', strategy: 'redact', pii_type: 'NAME' },
      { column_pattern: 'phone', strategy: 'redact', pii_type: 'PHONE_NUMBER' },
      { column_pattern: 'address', strategy: 'redact', pii_type: 'ADDRESS' },
      { column_pattern: 'ip_address', strategy: 'redact', pii_type: 'IP_ADDRESS' },
      { column_pattern: 'dob', strategy: 'redact', pii_type: 'DATE_OF_BIRTH' },
      { column_pattern: 'birth_date', strategy: 'redact', pii_type: 'DATE_OF_BIRTH' },
      { column_pattern: 'national_id', strategy: 'redact', pii_type: 'NATIONAL_ID' },
      { column_pattern: 'passport', strategy: 'redact', pii_type: 'PASSPORT_NUMBER' },
      { column_pattern: 'zip', strategy: 'redact', pii_type: 'ZIP_CODE' },
      { column_pattern: 'postal_code', strategy: 'redact', pii_type: 'ZIP_CODE' },
    ],
  },
  { id: 'hipaa', name: "HIPAA Healthcare Pack", category: "Healthcare", desc: "Strict redaction for PHI (Protected Health Information) including medical records.", rules: 24, icon: "🏥",
    rulePayloads: [
      { column_pattern: 'patient_name', strategy: 'redact', pii_type: 'NAME' },
      { column_pattern: 'mrn', strategy: 'redact', pii_type: 'MEDICAL_RECORD_NUMBER' },
      { column_pattern: 'dob', strategy: 'redact', pii_type: 'DATE_OF_BIRTH' },
      { column_pattern: 'ssn', strategy: 'redact', pii_type: 'US_SOCIAL_SECURITY_NUMBER' },
      { column_pattern: 'diagnosis', strategy: 'redact', pii_type: 'MEDICAL_TERM' },
      { column_pattern: 'insurance_id', strategy: 'redact', pii_type: 'MEDICAL_RECORD_NUMBER' },
    ],
  },
  { id: 'pci', name: "PCI-DSS Financial Pack", category: "Finance", desc: "Tokenization and encryption for credit cards, PANs, and bank accounts.", rules: 18, icon: "💳",
    rulePayloads: [
      { column_pattern: 'card_number', strategy: 'redact', pii_type: 'CREDIT_CARD_NUMBER' },
      { column_pattern: 'pan', strategy: 'redact', pii_type: 'CREDIT_CARD_NUMBER' },
      { column_pattern: 'cvv', strategy: 'redact', pii_type: 'CREDIT_CARD_NUMBER' },
      { column_pattern: 'iban', strategy: 'redact', pii_type: 'IBAN_CODE' },
      { column_pattern: 'bank_account', strategy: 'redact', pii_type: 'IBAN_CODE' },
    ],
  },
  { id: 'dev', name: "Developer Sandbox Pack", category: "Development", desc: "Replaces sensitive data with realistic synthetic data for dev/test environments.", rules: 35, icon: "💻",
    rulePayloads: [
      { column_pattern: 'email', strategy: 'synthetic', pii_type: 'EMAIL' },
      { column_pattern: 'name', strategy: 'synthetic', pii_type: 'NAME' },
      { column_pattern: 'phone', strategy: 'synthetic', pii_type: 'PHONE_NUMBER' },
    ],
  },
  { id: 'ccpa', name: "CCPA California Pack", category: "Compliance", desc: "Rules aligned with the California Consumer Privacy Act requirements.", rules: 15, icon: "🐻",
    rulePayloads: [
      { column_pattern: 'email', strategy: 'redact', pii_type: 'EMAIL' },
      { column_pattern: 'name', strategy: 'redact', pii_type: 'NAME' },
      { column_pattern: 'ip_address', strategy: 'redact', pii_type: 'IP_ADDRESS' },
    ],
  },
  { id: 'enterprise', name: "Custom Enterprise", category: "Custom", desc: "Your organization specific custom baseline for broad anonymization.", rules: 8, icon: "🏢",
    rulePayloads: [
      { column_pattern: 'email', strategy: 'redact', pii_type: 'EMAIL' },
      { column_pattern: 'name', strategy: 'redact', pii_type: 'NAME' },
    ],
  },
];

export default function TemplatesPage() {
  const [filter, setFilter] = useState("All");
  const [applying, setApplying] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filtered = filter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

  const handleUse = async (template: typeof TEMPLATES[0]) => {
    setApplying(template.id);
    try {
      // Create all rules for this template via the masking-rules API
      const results = await Promise.allSettled(
        template.rulePayloads.map(payload =>
          privacyFetch('/api/privacy/masking-rules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: `[${template.name}] ${payload.column_pattern}`,
              column_pattern: payload.column_pattern,
              strategy: payload.strategy,
              pii_type: payload.pii_type,
              is_active: true,
            }),
          })
        )
      );
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      showToast(`Applied ${template.name}: ${succeeded}/${template.rulePayloads.length} rules created`);
    } catch {
      showToast('Failed to apply template', 'error');
    } finally {
      setApplying(null);
    }
  };

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const rules = JSON.parse(text);
      if (!Array.isArray(rules)) throw new Error('JSON must be an array of rules');
      const results = await Promise.allSettled(
        rules.map((rule: any) =>
          privacyFetch('/api/privacy/masking-rules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rule),
          })
        )
      );
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      showToast(`Imported ${succeeded}/${rules.length} rules from ${file.name}`);
    } catch (err: any) {
      showToast(err.message ?? 'Invalid JSON file', 'error');
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Masking Rule Templates</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Pre-built profiles for instant compliance — applies real masking rules to your account.</p>
        </div>
        <div className="flex gap-3">
          <label className="cursor-pointer px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2">
            <span>Import .json</span>
            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImportJson} />
          </label>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Compliance', 'Healthcare', 'Finance', 'Development', 'Custom'].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === cat ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(template => (
          <div key={template.id} className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex flex-col">
            <div className="text-4xl mb-4">{template.icon}</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{template.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex-1 mb-4">{template.desc}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {template.rules} Rules Included
              </span>
              <button
                onClick={() => handleUse(template)}
                disabled={applying === template.id}
                className="text-sm px-3 py-1.5 bg-violet-600/10 hover:bg-violet-600/20 text-violet-600 dark:text-violet-400 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {applying === template.id ? (
                  <><span className="w-3 h-3 border-2 border-violet-400/30 border-t-violet-500 rounded-full animate-spin" />Applying...</>
                ) : 'Use Template'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg text-white font-medium flex items-center gap-2 animate-in slide-in-from-bottom-4 ${
          toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        }`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
