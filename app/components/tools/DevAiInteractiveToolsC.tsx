'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

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
      disabled={!text}
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#518231] hover:bg-[#436a28] disabled:opacity-50 text-white text-xs font-bold"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

// ─── 9. Linux Chmod Permissions Calculator ───────────────────────────────────
export function ChmodCalculatorTool() {
  const [bits, setBits] = useState({
    or: true, ow: true, ox: true,
    gr: true, gw: false, gx: true,
    pr: true, pw: false, px: true,
  });

  const owner = (bits.or ? 4 : 0) + (bits.ow ? 2 : 0) + (bits.ox ? 1 : 0);
  const group = (bits.gr ? 4 : 0) + (bits.gw ? 2 : 0) + (bits.gx ? 1 : 0);
  const pub = (bits.pr ? 4 : 0) + (bits.pw ? 2 : 0) + (bits.px ? 1 : 0);
  const octal = `${owner}${group}${pub}`;
  const sym =
    (bits.or ? 'r' : '-') + (bits.ow ? 'w' : '-') + (bits.ox ? 'x' : '-') +
    (bits.gr ? 'r' : '-') + (bits.gw ? 'w' : '-') + (bits.gx ? 'x' : '-') +
    (bits.pr ? 'r' : '-') + (bits.pw ? 'w' : '-') + (bits.px ? 'x' : '-');

  const applyOctal = (code: string) => {
    const [o, g, p] = code.split('').map((d) => parseInt(d, 10) || 0);
    setBits({
      or: Boolean(o & 4), ow: Boolean(o & 2), ox: Boolean(o & 1),
      gr: Boolean(g & 4), gw: Boolean(g & 2), gx: Boolean(g & 1),
      pr: Boolean(p & 4), pw: Boolean(p & 2), px: Boolean(p & 1),
    });
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-5">
      <div className="flex flex-wrap gap-2">
        {[
          { code: '644', label: '644 (Files / Configs)' },
          { code: '755', label: '755 (Scripts / Dirs)' },
          { code: '600', label: '600 (SSH Keys)' },
          { code: '700', label: '700 (Private Dir)' },
          { code: '775', label: '775 (Group Shared)' },
        ].map((p) => (
          <button
            key={p.code}
            type="button"
            onClick={() => applyOctal(p.code)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              octal === p.code ? 'bg-[#518231] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Owner (u)', keys: ['or', 'ow', 'ox'] as const },
          { title: 'Group (g)', keys: ['gr', 'gw', 'gx'] as const },
          { title: 'Public / Others (o)', keys: ['pr', 'pw', 'px'] as const },
        ].map((col) => (
          <div key={col.title} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="text-xs font-bold uppercase text-slate-500">{col.title}</div>
            {(['Read (4)', 'Write (2)', 'Execute (1)'] as const).map((lbl, idx) => {
              const k = col.keys[idx];
              return (
                <label key={k} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bits[k]}
                    onChange={(e) => setBits((prev) => ({ ...prev, [k]: e.target.checked }))}
                    className="w-4 h-4 accent-[#518231]"
                  />
                  <span>{lbl}</span>
                </label>
              );
            })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-[#518231]/15 border border-[#518231]/30 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-500">Octal & CLI Command</div>
            <div className="font-mono text-xl font-extrabold text-[#365b1f] dark:text-[#86d254]">
              chmod {octal} filename
            </div>
          </div>
          <CopyBtn text={`chmod ${octal} filename`} />
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-500">Symbolic Notation</div>
            <div className="font-mono text-xl font-extrabold text-slate-900 dark:text-white">-{sym}</div>
          </div>
          <CopyBtn text={sym} />
        </div>
      </div>
    </div>
  );
}

// ─── 10. Number Base Converter (Bin / Oct / Dec / Hex / Base36) ──────────────
export function BaseConverterTool() {
  const [rawInput, setRawInput] = useState('255');
  const [fromBase, setFromBase] = useState(10);

  const converted = useMemo(() => {
    const clean = rawInput.trim().replace(/^0[bxo]/i, '');
    if (!clean) return { error: null as string | null, bin: '', oct: '', dec: '', hex: '', b36: '' };
    try {
      const neg = clean.startsWith('-');
      const digits = neg ? clean.slice(1) : clean;
      let val = BigInt(0);
      const base = BigInt(fromBase);
      for (const ch of digits.toLowerCase()) {
        const d = parseInt(ch, fromBase);
        if (Number.isNaN(d)) throw new Error(`Invalid base-${fromBase} digit "${ch}"`);
        val = val * base + BigInt(d);
      }
      if (neg) val = -val;
      return {
        error: null as string | null,
        bin: val.toString(2),
        oct: val.toString(8),
        dec: val.toString(10),
        hex: val.toString(16).toUpperCase(),
        b36: val.toString(36).toUpperCase(),
      };
    } catch (e: any) {
      return { error: e?.message || 'Invalid number', bin: '', oct: '', dec: '', hex: '', b36: '' };
    }
  }, [rawInput, fromBase]);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-3">
        <input
          type="text"
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="Enter integer value..."
          className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-lg font-bold"
        />
        <select
          value={fromBase}
          onChange={(e) => setFromBase(Number(e.target.value))}
          className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-bold text-sm"
        >
          <option value={2}>Binary (Base 2)</option>
          <option value={8}>Octal (Base 8)</option>
          <option value={10}>Decimal (Base 10)</option>
          <option value={16}>Hexadecimal (Base 16)</option>
          <option value={36}>Base 36</option>
        </select>
      </div>

      {converted.error ? (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-xs font-mono text-rose-600">{converted.error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Binary (Base 2)', value: converted.bin },
            { label: 'Octal (Base 8)', value: converted.oct },
            { label: 'Decimal (Base 10)', value: converted.dec },
            { label: 'Hexadecimal (Base 16)', value: converted.hex },
            { label: 'Base 36 (Alphanumeric)', value: converted.b36 },
          ].map((item) => (
            <div key={item.label} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase text-slate-400">{item.label}</div>
                <div className="font-mono text-sm font-extrabold text-slate-900 dark:text-white break-all">{item.value || '—'}</div>
              </div>
              <CopyBtn text={item.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 11. SQL INSERT to JSON Converter ────────────────────────────────────────
function parseSqlValuesTuple(tupleStr: string): any[] {
  const vals: any[] = [];
  let cur = '';
  let inSingle = false;
  for (let i = 0; i < tupleStr.length; i++) {
    const ch = tupleStr[i];
    if (inSingle) {
      if (ch === "'" && tupleStr[i + 1] === "'") {
        cur += "'";
        i++;
      } else if (ch === "'") {
        inSingle = false;
      } else {
        cur += ch;
      }
    } else if (ch === "'") {
      inSingle = true;
    } else if (ch === ',') {
      vals.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  vals.push(cur.trim());
  return vals.map((raw) => {
    if (/^null$/i.test(raw)) return null;
    if (/^true$/i.test(raw)) return true;
    if (/^false$/i.test(raw)) return false;
    if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
    return raw;
  });
}

export function SqlToJsonTool() {
  const [sql, setSql] = useState(
    `INSERT INTO users (id, name, email, active) VALUES (1, 'Ada Lovelace', 'ada@example.com', true);\nINSERT INTO users (id, name, email, active) VALUES (2, 'Alan Turing', 'alan@example.com', true);`
  );

  const { json, error } = useMemo(() => {
    try {
      const results: Record<string, any>[] = [];
      const regex = /INSERT\s+INTO\s+[`"\[]?[\w.]+[`"\]]?\s*\(([^)]+)\)\s*VALUES\s*([\s\S]*?);/gi;
      let match: RegExpExecArray | null;
      while ((match = regex.exec(sql.endsWith(';') ? sql : `${sql};`)) !== null) {
        const cols = match[1].split(',').map((c) => c.trim().replace(/^[`"\[]|[`"\]]$/g, ''));
        const tuplesBlock = match[2];
        const tupleMatches = tuplesBlock.match(/\(([^)]+)\)/g) || [];
        for (const t of tupleMatches) {
          const inner = t.slice(1, -1);
          const vals = parseSqlValuesTuple(inner);
          const row: Record<string, any> = {};
          cols.forEach((c, idx) => {
            row[c] = vals[idx] !== undefined ? vals[idx] : null;
          });
          results.push(row);
        }
      }
      if (results.length === 0) {
        return { json: '[]', error: 'No valid INSERT INTO ... (cols) VALUES (...); statements matched.' };
      }
      return { json: JSON.stringify(results, null, 2), error: null as string | null };
    } catch (e: any) {
      return { json: '', error: e?.message || 'SQL parse error' };
    }
  }, [sql]);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
      <div className="flex justify-end">
        <CopyBtn text={json} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">SQL INSERT Statements</label>
          <textarea
            rows={10}
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">JSON Array Output</label>
          {error ? (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs font-mono text-amber-700 dark:text-amber-300">{error}</div>
          ) : (
            <textarea
              rows={10}
              readOnly
              value={json}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 12. cURL to JavaScript Fetch & Python Requests Converter ────────────────
function parseCurl(cmd: string) {
  const cleaned = cmd.replace(/\\\r?\n/g, ' ').trim();
  const urlMatch = cleaned.match(/['"]?(https?:\/\/[^\s'"]+)['"]?/);
  const url = urlMatch ? urlMatch[1] : 'https://api.example.com/v1/resource';

  const methodMatch = cleaned.match(/(?:-X|--request)\s+['"]?([A-Z]+)['"]?/i);
  const headers: Record<string, string> = {};
  const headerRe = /(?:-H|--header)\s+['"]([^'"]+)['"]/g;
  let hm: RegExpExecArray | null;
  while ((hm = headerRe.exec(cleaned)) !== null) {
    const idx = hm[1].indexOf(':');
    if (idx > 0) headers[hm[1].slice(0, idx).trim()] = hm[1].slice(idx + 1).trim();
  }

  const dataMatch = cleaned.match(/(?:-d|--data|--data-raw)\s+['"]([\s\S]*?)['"](\s|$)/);
  const body = dataMatch ? dataMatch[1] : null;
  const method = methodMatch ? methodMatch[1].toUpperCase() : body ? 'POST' : 'GET';

  const jsHeaders = Object.keys(headers).length ? `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, '\n  ')},\n` : '';
  const jsBody = body ? `  body: ${body.trim().startsWith('{') ? `JSON.stringify(${body})` : JSON.stringify(body)},\n` : '';
  const jsCode = `const response = await fetch(${JSON.stringify(url)}, {\n  method: ${JSON.stringify(method)},\n${jsHeaders}${jsBody}});\nconst data = await response.json();\nconsole.log(data);`;

  const pyHeaders = Object.keys(headers).length ? `headers = ${JSON.stringify(headers, null, 2)}\n` : '';
  const pyBody = body ? `payload = ${JSON.stringify(body)}\n` : '';
  const pyArgs = [
    JSON.stringify(url),
    Object.keys(headers).length ? 'headers=headers' : '',
    body ? 'data=payload' : '',
  ].filter(Boolean).join(', ');
  const pyCode = `import requests\n\n${pyHeaders}${pyBody}response = requests.${method.toLowerCase()}(${pyArgs})\nprint(response.json())`;

  return { jsCode, pyCode };
}

export function CurlToFetchTool() {
  const [curlInput, setCurlInput] = useState(
    `curl -X POST https://api.example.com/v1/items \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -d '{"name":"Nexus","tier":"pro"}'`
  );
  const [target, setTarget] = useState<'js' | 'py'>('js');

  const { jsCode, pyCode } = useMemo(() => parseCurl(curlInput), [curlInput]);
  const activeOutput = target === 'js' ? jsCode : pyCode;

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#518231]" />
          <button
            type="button"
            onClick={() => setTarget('js')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${target === 'js' ? 'bg-[#518231] text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            JavaScript fetch()
          </button>
          <button
            type="button"
            onClick={() => setTarget('py')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${target === 'py' ? 'bg-[#518231] text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            Python requests
          </button>
        </div>
        <CopyBtn text={activeOutput} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">cURL Command</label>
          <textarea
            rows={9}
            value={curlInput}
            onChange={(e) => setCurlInput(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
            {target === 'js' ? 'JavaScript Fetch Output' : 'Python Requests Output'}
          </label>
          <textarea
            rows={9}
            readOnly
            value={activeOutput}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}
