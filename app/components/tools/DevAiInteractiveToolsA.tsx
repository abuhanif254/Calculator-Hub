'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Copy, Check, RefreshCw, Sparkles, Clock, Terminal } from 'lucide-react';

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
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
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

// ─── 1. LLM Token & API Cost Calculator ──────────────────────────────────────
interface LlmModelPricing {
  id: string;
  provider: string;
  name: string;
  contextWindow: string;
  inputPer1M: number;
  outputPer1M: number;
  cachedPer1M: number;
}

const LLM_MODELS: LlmModelPricing[] = [
  { id: 'gemini-2.5-flash', provider: 'Google', name: 'Gemini 2.5 Flash', contextWindow: '1M', inputPer1M: 0.15, outputPer1M: 0.60, cachedPer1M: 0.0375 },
  { id: 'gemini-2.5-pro', provider: 'Google', name: 'Gemini 2.5 Pro', contextWindow: '1M', inputPer1M: 1.25, outputPer1M: 10.00, cachedPer1M: 0.3125 },
  { id: 'gpt-4o-mini', provider: 'OpenAI', name: 'GPT-4o mini', contextWindow: '128K', inputPer1M: 0.15, outputPer1M: 0.60, cachedPer1M: 0.075 },
  { id: 'gpt-4.1', provider: 'OpenAI', name: 'GPT-4.1', contextWindow: '1M', inputPer1M: 2.00, outputPer1M: 8.00, cachedPer1M: 0.50 },
  { id: 'gpt-4o', provider: 'OpenAI', name: 'GPT-4o', contextWindow: '128K', inputPer1M: 2.50, outputPer1M: 10.00, cachedPer1M: 1.25 },
  { id: 'o3-mini', provider: 'OpenAI', name: 'OpenAI o3-mini', contextWindow: '200K', inputPer1M: 1.10, outputPer1M: 4.40, cachedPer1M: 0.55 },
  { id: 'claude-3.5-haiku', provider: 'Anthropic', name: 'Claude Haiku', contextWindow: '200K', inputPer1M: 0.80, outputPer1M: 4.00, cachedPer1M: 0.08 },
  { id: 'claude-sonnet', provider: 'Anthropic', name: 'Claude Sonnet 4', contextWindow: '200K', inputPer1M: 3.00, outputPer1M: 15.00, cachedPer1M: 0.30 },
  { id: 'claude-opus', provider: 'Anthropic', name: 'Claude Opus 4', contextWindow: '200K', inputPer1M: 15.00, outputPer1M: 75.00, cachedPer1M: 1.50 },
  { id: 'deepseek-v3', provider: 'DeepSeek', name: 'DeepSeek V3', contextWindow: '128K', inputPer1M: 0.27, outputPer1M: 1.10, cachedPer1M: 0.07 },
  { id: 'deepseek-r1', provider: 'DeepSeek', name: 'DeepSeek R1', contextWindow: '128K', inputPer1M: 0.55, outputPer1M: 2.19, cachedPer1M: 0.14 },
];

function estimateTokens(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  // Accurate BPE heuristic (~4 chars/token + whitespace/punctuation weight)
  const charEst = Math.ceil(trimmed.length / 4);
  const wordEst = Math.ceil(trimmed.split(/\s+/).filter(Boolean).length * 1.33);
  return Math.round((charEst + wordEst) / 2);
}

export function LlmTokenCostCalculatorTool() {
  const [promptText, setPromptText] = useState(
    'You are a senior distributed systems architect. Summarize the latency bottlenecks in our PostgreSQL read-replica setup and provide 5 concrete indexing recommendations in JSON format.'
  );
  const [manualInputTokens, setManualInputTokens] = useState<string>('');
  const [outputTokens, setOutputTokens] = useState<number>(600);
  const [cachedPct, setCachedPct] = useState<number>(30);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(1000);

  const detectedTokens = useMemo(() => estimateTokens(promptText), [promptText]);
  const effectiveInputTokens = manualInputTokens.trim() ? Math.max(0, Number(manualInputTokens) || 0) : detectedTokens;

  const rows = useMemo(() => {
    const cacheFrac = Math.min(100, Math.max(0, cachedPct)) / 100;
    const uncachedIn = effectiveInputTokens * (1 - cacheFrac);
    const cachedIn = effectiveInputTokens * cacheFrac;
    return LLM_MODELS.map((m) => {
      const perReq =
        (uncachedIn / 1_000_000) * m.inputPer1M +
        (cachedIn / 1_000_000) * m.cachedPer1M +
        (outputTokens / 1_000_000) * m.outputPer1M;
      const daily = perReq * requestsPerDay;
      const monthly = daily * 30;
      return { ...m, perReq, daily, monthly };
    }).sort((a, b) => a.monthly - b.monthly);
  }, [effectiveInputTokens, outputTokens, cachedPct, requestsPerDay]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Sample Prompt / System Context (Live Token Counter)
            </label>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-[#518231]/20 text-[#518231] dark:text-[#7ac14d]">
              ~{detectedTokens.toLocaleString()} tokens · {promptText.length.toLocaleString()} chars
            </span>
          </div>
          <textarea
            rows={4}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-800 dark:text-slate-100 focus:border-[#518231] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Override Input Tokens</label>
            <input
              type="number"
              min={0}
              placeholder={String(detectedTokens)}
              value={manualInputTokens}
              onChange={(e) => setManualInputTokens(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Output Tokens / Call</label>
            <input
              type="number"
              min={0}
              value={outputTokens}
              onChange={(e) => setOutputTokens(Math.max(0, Number(e.target.value) || 0))}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Prompt Cache Hit (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={cachedPct}
              onChange={(e) => setCachedPct(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Requests / Day</label>
            <input
              type="number"
              min={1}
              value={requestsPerDay}
              onChange={(e) => setRequestsPerDay(Math.max(1, Number(e.target.value) || 1))}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
            <Sparkles className="w-4 h-4 text-[#518231]" />
            <span>API Cost Comparison ({effectiveInputTokens.toLocaleString()} in / {outputTokens.toLocaleString()} out · {requestsPerDay.toLocaleString()} req/day)</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-bold">Model</th>
                <th className="px-4 py-3 font-bold">Context</th>
                <th className="px-4 py-3 font-bold">In / Out ($/1M)</th>
                <th className="px-4 py-3 font-bold">Cost / 1K Calls</th>
                <th className="px-4 py-3 font-bold">Monthly Est. (30d)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                    {r.name} <span className="text-xs font-normal text-slate-400">({r.provider})</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{r.contextWindow}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">
                    ${r.inputPer1M.toFixed(2)} / ${r.outputPer1M.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-700 dark:text-slate-200">
                    ${(r.perReq * 1000).toFixed(3)}
                  </td>
                  <td className="px-4 py-3 font-mono font-extrabold text-[#518231] dark:text-[#86d254]">
                    ${r.monthly < 1 ? r.monthly.toFixed(4) : r.monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Regex Tester & Debugger ──────────────────────────────────────────────
const REGEX_PRESETS = [
  { label: 'Email', pattern: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})', flags: 'g' },
  { label: 'URL', pattern: 'https?:\\/\\/[\\w.-]+(?:\\/[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]*)?', flags: 'gi' },
  { label: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { label: 'ISO Date', pattern: '(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])', flags: 'g' },
  { label: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b', flags: 'gi' },
];

export function RegexTesterTool() {
  const [pattern, setPattern] = useState('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState(
    'Contact engineering@nexuscalculator.net or billing@example.org on 2026-11-27. Server IP: 192.168.1.42.'
  );
  const [replaceWith, setReplaceWith] = useState('[$1 at $2]');

  const analysis = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups: string[] }[] = [];
      if (flags.includes('g')) {
        let m: RegExpExecArray | null;
        let guard = 0;
        while ((m = re.exec(testText)) !== null && guard < 500) {
          guard++;
          matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (m[0] === '') re.lastIndex++;
        }
      } else {
        const m = re.exec(testText);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
      const replaced = testText.replace(re, replaceWith);
      return { error: null as string | null, matches, replaced };
    } catch (e: any) {
      return { error: e?.message || 'Invalid Regular Expression', matches: [], replaced: '' };
    }
  }, [pattern, flags, testText, replaceWith]);

  const toggleFlag = (f: string) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, '') : prev + f));
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase text-slate-400 mr-1">Presets:</span>
          {REGEX_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setPattern(p.pattern);
                setFlags(p.flags);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-[#518231]/15 hover:text-[#518231] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
          <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 px-3">
            <span className="font-mono text-slate-400 font-bold">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Regular expression..."
              className="w-full py-2.5 px-2 bg-transparent font-mono text-sm text-slate-900 dark:text-white focus:outline-none"
            />
            <span className="font-mono text-slate-400 font-bold">/{flags}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {['g', 'i', 'm', 's', 'u'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFlag(f)}
                className={`w-9 h-9 rounded-lg font-mono text-sm font-bold transition-colors ${
                  flags.includes(f)
                    ? 'bg-[#518231] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {analysis.error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs font-mono text-rose-700 dark:text-rose-300">
            {analysis.error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Test String</label>
          <textarea
            rows={4}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-sm focus:border-[#518231] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-4">
            <div className="text-xs font-bold uppercase text-[#518231] mb-2">
              Matches ({analysis.matches.length})
            </div>
            {analysis.matches.length === 0 ? (
              <p className="text-xs text-slate-400">No matches found.</p>
            ) : (
              <ul className="space-y-2 max-h-48 overflow-y-auto text-xs font-mono">
                {analysis.matches.map((m, idx) => (
                  <li key={idx} className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400">#{idx + 1} @{m.index}:</span>{' '}
                      <strong className="text-emerald-700 dark:text-emerald-400">{m.match}</strong>
                    </div>
                    {m.groups.length > 0 && (
                      <div className="text-slate-500 mt-0.5">
                        Groups: {m.groups.map((g, gi) => `$${gi + 1}="${g}"`).join(', ')}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500">Live Replace Preview</span>
              <CopyBtn text={analysis.replaced} />
            </div>
            <input
              type="text"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              placeholder="Replacement string (supports $1, $2...)"
              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs"
            />
            <pre className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs whitespace-pre-wrap text-slate-700 dark:text-slate-300">
              {analysis.replaced}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Cron Expression Generator ────────────────────────────────────────────
function matchCronField(val: number, expr: string, min: number, max: number): boolean {
  const parts = expr.split(',');
  for (const part of parts) {
    const [rangePart, stepStr] = part.split('/');
    const step = stepStr ? Math.max(1, parseInt(stepStr, 10) || 1) : 1;
    if (rangePart === '*') {
      if ((val - min) % step === 0) return true;
      continue;
    }
    if (rangePart.includes('-')) {
      const [s, e] = rangePart.split('-').map((n) => parseInt(n, 10));
      if (!Number.isNaN(s) && !Number.isNaN(e) && val >= s && val <= e && (val - s) % step === 0) return true;
      continue;
    }
    const exact = parseInt(rangePart, 10);
    if (!Number.isNaN(exact) && exact >= min && exact <= max && val === exact) return true;
  }
  return false;
}

function getNextCronRuns(expr: string, count = 8): string[] {
  const fields = expr.trim().split(/\s+/);
  if (fields.length !== 5) return [];
  const [mExpr, hExpr, domExpr, monExpr, dowExpr] = fields;
  const runs: string[] = [];
  const cursor = new Date();
  cursor.setUTCSeconds(0, 0);
  cursor.setUTCMinutes(cursor.getUTCMinutes() + 1);
  const maxSteps = 60 * 24 * 60; // scan up to 60 days
  for (let i = 0; i < maxSteps && runs.length < count; i++) {
    const m = cursor.getUTCMinutes();
    const h = cursor.getUTCHours();
    const dom = cursor.getUTCDate();
    const mon = cursor.getUTCMonth() + 1;
    const dow = cursor.getUTCDay();
    if (
      matchCronField(m, mExpr, 0, 59) &&
      matchCronField(h, hExpr, 0, 23) &&
      matchCronField(dom, domExpr, 1, 31) &&
      matchCronField(mon, monExpr, 1, 12) &&
      matchCronField(dow, dowExpr, 0, 6)
    ) {
      runs.push(cursor.toISOString().replace('T', ' ').replace('.000Z', ' UTC'));
    }
    cursor.setUTCMinutes(cursor.getUTCMinutes() + 1);
  }
  return runs;
}

const CRON_PRESETS = [
  { label: 'Every 5 min', expr: '*/5 * * * *' },
  { label: 'Hourly', expr: '0 * * * *' },
  { label: 'Daily 02:00 UTC', expr: '0 2 * * *' },
  { label: 'Weekdays 09:00', expr: '0 9 * * 1-5' },
  { label: 'Weekly Sun 00:00', expr: '0 0 * * 0' },
  { label: 'Monthly 1st 00:00', expr: '0 0 1 * *' },
];

export function CronExpressionGeneratorTool() {
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('9');
  const [dom, setDom] = useState('*');
  const [month, setMonth] = useState('*');
  const [dow, setDow] = useState('1-5');

  const expression = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const nextRuns = useMemo(() => getNextCronRuns(expression, 8), [expression]);

  const applyPreset = (expr: string) => {
    const [m, h, d, mo, dw] = expr.split(' ');
    setMinute(m);
    setHour(h);
    setDom(d);
    setMonth(mo);
    setDow(dw);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-5">
      <div className="flex flex-wrap gap-2">
        {CRON_PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.expr)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-[#518231]/15 hover:text-[#518231]"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-[#518231]/15 border border-[#518231]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-2xl font-extrabold text-[#365b1f] dark:text-[#86d254]">
          <Terminal className="w-5 h-5" />
          <span>{expression}</span>
        </div>
        <CopyBtn text={expression} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Minute (0-59)', val: minute, set: setMinute },
          { label: 'Hour (0-23)', val: hour, set: setHour },
          { label: 'Day (1-31)', val: dom, set: setDom },
          { label: 'Month (1-12)', val: month, set: setMonth },
          { label: 'Weekday (0-6)', val: dow, set: setDow },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{f.label}</label>
            <input
              type="text"
              value={f.val}
              onChange={(e) => f.set(e.target.value || '*')}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center"
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-4">
        <div className="text-xs font-bold uppercase text-slate-500 mb-2">Next 8 Scheduled Executions (UTC)</div>
        {nextRuns.length === 0 ? (
          <p className="text-xs text-rose-500">No upcoming run found within 60 days — check field syntax.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            {nextRuns.map((r, i) => (
              <div key={i} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                #{i + 1} · {r}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 4. Unix Timestamp Converter ─────────────────────────────────────────────
export function UnixTimestampConverterTool() {
  const [nowSec, setNowSec] = useState<number>(() => Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState<string>(() => String(Math.floor(Date.now() / 1000)));
  const [isoInput, setIsoInput] = useState<string>(() => new Date().toISOString().slice(0, 19));

  useEffect(() => {
    const id = setInterval(() => setNowSec(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const parsedFromEpoch = useMemo(() => {
    const n = Number(epochInput.trim());
    if (!epochInput.trim() || !Number.isFinite(n)) return null;
    const ms = Math.abs(n) >= 1e12 ? n : n * 1000;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return {
      isMs: Math.abs(n) >= 1e12,
      iso: d.toISOString(),
      utc: d.toUTCString(),
      local: d.toLocaleString(),
      sec: Math.floor(d.getTime() / 1000),
      ms: d.getTime(),
    };
  }, [epochInput]);

  const parsedFromDate = useMemo(() => {
    const d = new Date(isoInput.endsWith('Z') ? isoInput : `${isoInput}Z`);
    if (Number.isNaN(d.getTime())) return null;
    return { sec: Math.floor(d.getTime() / 1000), ms: d.getTime(), iso: d.toISOString() };
  }, [isoInput]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-emerald-50/80 dark:bg-[#518231]/15 border border-[#518231]/30 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-[#518231]" />
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-500">Current Unix Epoch (Seconds)</div>
            <div className="font-mono text-2xl font-extrabold text-[#365b1f] dark:text-[#86d254]">{nowSec}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEpochInput(String(nowSec))}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Use Now
          </button>
          <CopyBtn text={String(nowSec)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <label className="block text-sm font-bold text-slate-800 dark:text-white">
            Epoch (Seconds or Milliseconds) → Date
          </label>
          <input
            type="text"
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
          {parsedFromEpoch ? (
            <div className="space-y-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl">
              <div><strong>Detected:</strong> {parsedFromEpoch.isMs ? 'Milliseconds' : 'Seconds'}</div>
              <div><strong>ISO 8601:</strong> {parsedFromEpoch.iso}</div>
              <div><strong>UTC:</strong> {parsedFromEpoch.utc}</div>
              <div><strong>Local:</strong> {parsedFromEpoch.local}</div>
            </div>
          ) : (
            <p className="text-xs text-rose-500">Enter a valid numeric Unix timestamp.</p>
          )}
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <label className="block text-sm font-bold text-slate-800 dark:text-white">
            UTC Date & Time → Unix Epoch
          </label>
          <input
            type="datetime-local"
            step="1"
            value={isoInput}
            onChange={(e) => setIsoInput(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
          {parsedFromDate && (
            <div className="space-y-2 text-xs font-mono bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl">
              <div className="flex items-center justify-between">
                <span><strong>Seconds:</strong> {parsedFromDate.sec}</span>
                <CopyBtn text={String(parsedFromDate.sec)} />
              </div>
              <div className="flex items-center justify-between">
                <span><strong>Milliseconds:</strong> {parsedFromDate.ms}</span>
                <CopyBtn text={String(parsedFromDate.ms)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
