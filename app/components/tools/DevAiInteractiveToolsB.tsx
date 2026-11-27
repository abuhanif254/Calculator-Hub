'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download } from 'lucide-react';

function ActionBar({ text, filename, mime = 'text/plain' }: { text: string; filename: string; mime?: string }) {
  const [copied, setCopied] = useState(false);
  const download = () => {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            // ignore
          }
        }}
        disabled={!text}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#518231] hover:bg-[#436a28] disabled:opacity-50 text-white text-xs font-bold"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <button
        type="button"
        onClick={download}
        disabled={!text}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-200 text-xs font-bold"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Download</span>
      </button>
    </div>
  );
}

// ─── 5. JSON to CSV Converter ────────────────────────────────────────────────
function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenObject(v, key));
    } else if (Array.isArray(v)) {
      out[key] = JSON.stringify(v);
    } else {
      out[key] = v === null || v === undefined ? '' : String(v);
    }
  }
  return out;
}

function escapeCsv(val: string, delim: string): string {
  if (val.includes(delim) || val.includes('"') || val.includes('\n') || val.includes('\r')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export function JsonToCsvTool() {
  const [input, setInput] = useState(
    JSON.stringify(
      [
        { id: 101, name: 'Alice Chen', role: 'Engineer', location: { city: 'Berlin', country: 'DE' }, salary: 88000 },
        { id: 102, name: 'Carlos Ruiz', role: 'Designer', location: { city: 'Madrid', country: 'ES' }, salary: 72000 },
        { id: 103, name: 'Claire Moreau', role: 'PM', location: { city: 'Paris', country: 'FR' }, salary: 81000 },
      ],
      null,
      2
    )
  );
  const [delim, setDelim] = useState(',');

  const { csv, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const flatRows = arr.map((item) => (item && typeof item === 'object' ? flattenObject(item) : { value: String(item) }));
      const headers = Array.from(new Set(flatRows.flatMap((r) => Object.keys(r))));
      const lines = [
        headers.map((h) => escapeCsv(h, delim)).join(delim),
        ...flatRows.map((r) => headers.map((h) => escapeCsv(r[h] ?? '', delim)).join(delim)),
      ];
      return { csv: lines.join('\n'), error: null as string | null };
    } catch (e: any) {
      return { csv: '', error: e?.message || 'Invalid JSON' };
    }
  }, [input, delim]);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="text-slate-500">Delimiter:</span>
          {[
            { label: 'Comma (,)', v: ',' },
            { label: 'Semicolon (;)', v: ';' },
            { label: 'Tab (\\t)', v: '\t' },
          ].map((d) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setDelim(d.v)}
              className={`px-2.5 py-1 rounded-lg ${delim === d.v ? 'bg-[#518231] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <ActionBar text={csv} filename="converted.csv" mime="text/csv;charset=utf-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">JSON Input</label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs focus:border-[#518231] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">CSV Output</label>
          {error ? (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-xs font-mono text-rose-600">{error}</div>
          ) : (
            <textarea
              rows={10}
              readOnly
              value={csv}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 6. CSV to JSON Converter ────────────────────────────────────────────────
function parseCsvRows(text: string, delim: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === delim) {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== '')) rows.push(row);
  return rows;
}

function coerceValue(s: string, parseTypes: boolean): any {
  const t = s.trim();
  if (!parseTypes) return t;
  if (t === 'true') return true;
  if (t === 'false') return false;
  if (t === 'null') return null;
  if (t !== '' && !Number.isNaN(Number(t))) return Number(t);
  return t;
}

export function CsvToJsonTool() {
  const [input, setInput] = useState(
    'id,name,plan,mrr,active\n1,Acme Corp,Enterprise,1499,true\n2,Northwind,Pro,299,true\n3,Globex,Starter,49,false'
  );
  const [parseTypes, setParseTypes] = useState(true);
  const [delim, setDelim] = useState(',');

  const jsonOutput = useMemo(() => {
    const rows = parseCsvRows(input, delim);
    if (rows.length < 2) return '[]';
    const headers = rows[0].map((h) => h.trim());
    const objs = rows.slice(1).map((r) => {
      const obj: Record<string, any> = {};
      headers.forEach((h, i) => {
        obj[h || `col_${i + 1}`] = coerceValue(r[i] ?? '', parseTypes);
      });
      return obj;
    });
    return JSON.stringify(objs, null, 2);
  }, [input, delim, parseTypes]);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <select
            value={delim}
            onChange={(e) => setDelim(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value={'\t'}>Tab (TSV)</option>
          </select>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={parseTypes} onChange={(e) => setParseTypes(e.target.checked)} />
            <span>Auto-detect Numbers & Booleans</span>
          </label>
        </div>
        <ActionBar text={jsonOutput} filename="converted.json" mime="application/json" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">CSV Input</label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">JSON Output</label>
          <textarea
            rows={10}
            readOnly
            value={jsonOutput}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}

// ─── 7. JSON to YAML Converter ───────────────────────────────────────────────
function toYaml(val: any, indent = 0): string {
  const pad = ' '.repeat(indent);
  if (val === null) return 'null';
  if (typeof val === 'boolean' || typeof val === 'number') return String(val);
  if (typeof val === 'string') {
    if (val === '' || /[:#\-\n\r]|^(true|false|null|yes|no|on|off)$/i.test(val) || /^\s|\s$/.test(val)) {
      return JSON.stringify(val);
    }
    return val;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    return val
      .map((item) => {
        if (item && typeof item === 'object') {
          const inner = toYaml(item, indent + 2).replace(/^ +/, '');
          return `${pad}- ${inner}`;
        }
        return `${pad}- ${toYaml(item, indent + 2)}`;
      })
      .join('\n');
  }
  const entries = Object.entries(val);
  if (entries.length === 0) return '{}';
  return entries
    .map(([k, v]) => {
      const safeKey = /[:\s#]/.test(k) ? JSON.stringify(k) : k;
      if (v && typeof v === 'object' && Object.keys(v).length > 0) {
        return `${pad}${safeKey}:\n${toYaml(v, indent + 2)}`;
      }
      return `${pad}${safeKey}: ${toYaml(v, indent + 2)}`;
    })
    .join('\n');
}

export function JsonToYamlTool() {
  const [input, setInput] = useState(
    JSON.stringify(
      {
        service: 'nexus-api',
        version: '2.4',
        replicas: 3,
        env: { NODE_ENV: 'production', CACHE_TTL: 86400 },
        ports: [80, 443],
      },
      null,
      2
    )
  );

  const { yaml, error } = useMemo(() => {
    try {
      return { yaml: toYaml(JSON.parse(input)), error: null as string | null };
    } catch (e: any) {
      return { yaml: '', error: e?.message || 'Invalid JSON' };
    }
  }, [input]);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
      <div className="flex justify-end">
        <ActionBar text={yaml} filename="config.yaml" mime="text/yaml" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">JSON Input</label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">YAML Output</label>
          {error ? (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-xs font-mono text-rose-600">{error}</div>
          ) : (
            <textarea
              rows={10}
              readOnly
              value={yaml}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 8. JSON to TypeScript Interface Generator ───────────────────────────────
function capitalize(s: string): string {
  return s.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase());
}

function generateTsInterfaces(data: any, rootName = 'RootObject'): string {
  const defs: string[] = [];
  const seen = new Set<string>();

  function inferType(val: any, nameHint: string): string {
    if (val === null) return 'null';
    if (Array.isArray(val)) {
      if (val.length === 0) return 'unknown[]';
      const elemTypes = Array.from(new Set(val.map((item) => inferType(item, `${nameHint}Item`))));
      return elemTypes.length === 1 ? `${elemTypes[0]}[]` : `(${elemTypes.join(' | ')})[]`;
    }
    if (typeof val === 'object') {
      const ifaceName = capitalize(nameHint || 'Item');
      if (!seen.has(ifaceName)) {
        seen.add(ifaceName);
        const lines = Object.entries(val).map(([k, v]) => {
          const safeK = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
          return `  ${safeK}: ${inferType(v, k)};`;
        });
        defs.push(`export interface ${ifaceName} {\n${lines.join('\n')}\n}`);
      }
      return ifaceName;
    }
    return typeof val;
  }

  const rootType = inferType(data, rootName);
  if (defs.length === 0) {
    return `export type ${capitalize(rootName)} = ${rootType};`;
  }
  return defs.reverse().join('\n\n');
}

export function JsonToTypescriptTool() {
  const [rootName, setRootName] = useState('UserProfile');
  const [input, setInput] = useState(
    JSON.stringify(
      {
        id: 'usr_9821',
        name: 'Elena Rostova',
        verified: true,
        roles: ['admin', 'editor'],
        subscription: { plan: 'pro', seats: 5, renewalDate: '2026-12-01' },
      },
      null,
      2
    )
  );

  const { tsCode, error } = useMemo(() => {
    try {
      return { tsCode: generateTsInterfaces(JSON.parse(input), rootName || 'RootObject'), error: null as string | null };
    } catch (e: any) {
      return { tsCode: '', error: e?.message || 'Invalid JSON' };
    }
  }, [input, rootName]);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase text-slate-500">Root Interface:</label>
          <input
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold"
          />
        </div>
        <ActionBar text={tsCode} filename={`${rootName || 'types'}.ts`} mime="text/typescript" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">JSON Payload</label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">TypeScript Interfaces</label>
          {error ? (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-xs font-mono text-rose-600">{error}</div>
          ) : (
            <textarea
              rows={10}
              readOnly
              value={tsCode}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}
