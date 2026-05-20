"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Copy, Download, Trash2, AlertTriangle, CheckCircle, ShieldAlert,
  Clock, ShieldCheck, FileJson, Link as LinkIcon, Key, Info
} from "lucide-react";
import { parseJwt, formatUnixTime, copyToClipboard, JwtData } from "./utils";

export function JwtDecoderTool() {
  const [input, setInput] = useState<string>("");
  const [jwtData, setJwtData] = useState<JwtData | null>(null);
  
  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("jwt_decoder_input");
    if (saved) {
      setInput(saved);
    }
  }, []);

  // Save to local storage & process
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("jwt_decoder_input", input);
    }, 500);

    if (input.trim()) {
      setJwtData(parseJwt(input));
    } else {
      setJwtData(null);
    }

    return () => clearTimeout(timer);
  }, [input]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCopy = async (text: string, key: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Copied to clipboard!");
    }
  };

  const handleDownload = (content: string, filename: string) => {
    if (!content) return;
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded!");
  };

  const clearAll = () => {
    setInput("");
    setJwtData(null);
    localStorage.removeItem("jwt_decoder_input");
    showToast("Cleared");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        showToast("Pasted from clipboard");
      }
    } catch {
      showToast("Could not paste from clipboard");
    }
  };

  const expTime = useMemo(() => {
    if (jwtData?.payload?.exp) return formatUnixTime(jwtData.payload.exp);
    return null;
  }, [jwtData]);

  const iatTime = useMemo(() => {
    if (jwtData?.payload?.iat) return formatUnixTime(jwtData.payload.iat);
    return null;
  }, [jwtData]);

  const nbfTime = useMemo(() => {
    if (jwtData?.payload?.nbf) return formatUnixTime(jwtData.payload.nbf);
    return null;
  }, [jwtData]);

  const algorithm = jwtData?.header?.alg || "None";
  const isNoneAlg = algorithm.toLowerCase() === "none";
  const isExpired = expTime?.isExpired === true;
  
  const headerJson = jwtData?.header ? JSON.stringify(jwtData.header, null, 2) : "";
  const payloadJson = jwtData?.payload ? JSON.stringify(jwtData.payload, null, 2) : "";

  return (
    <div className="w-full flex flex-col gap-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex-wrap">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Key className="w-5 h-5 text-[#518231]" />
          JWT Decoder & Analyzer
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={handlePaste}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-700">
            Paste
          </button>
          <button onClick={clearAll} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[350px]">
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <LinkIcon size={14}/> Encoded JWT
              </span>
            </div>
            <div className="flex-1 relative">
              <textarea 
                value={input} onChange={e => setInput(e.target.value)}
                placeholder="Paste your JWT here (e.g. eyJhbGciOiJIUzI1Ni...)"
                className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-slate-800 dark:text-slate-200 font-mono text-sm custom-scrollbar break-all"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Security Warnings / Info */}
          {jwtData && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
              <h3 className="text-sm font-semibold uppercase text-slate-500 mb-2">Token Analysis</h3>
              
              {!jwtData.isValid && jwtData.error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg flex gap-3 text-red-700 dark:text-red-400">
                  <AlertTriangle className="shrink-0" size={18} />
                  <span className="text-sm font-medium">{jwtData.error}</span>
                </div>
              )}

              {jwtData.isValid && (
                <>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    {isNoneAlg ? <ShieldAlert className="text-red-500" size={18} /> : <ShieldCheck className="text-emerald-500" size={18} />}
                    <div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Algorithm: {algorithm}</div>
                      {isNoneAlg && <div className="text-xs text-red-500 mt-1">Warning: 'none' algorithm is insecure. Token can be easily forged.</div>}
                    </div>
                  </div>

                  {expTime && (
                    <div className={`flex items-start gap-3 p-3 rounded-lg border ${isExpired ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/50' : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'}`}>
                      <Clock className={isExpired ? "text-red-500" : "text-emerald-500"} size={18} />
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          Status: {isExpired ? "Expired" : "Active"}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Expires: {expTime.date} ({expTime.relative})
                        </div>
                      </div>
                    </div>
                  )}

                  {!expTime && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50">
                      <AlertTriangle className="text-amber-500" size={18} />
                      <div>
                        <div className="text-sm font-semibold text-amber-800 dark:text-amber-200">No Expiration Claim</div>
                        <div className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-1">This token never expires naturally. Ensure this is intentional.</div>
                      </div>
                    </div>
                  )}

                  {iatTime && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <Info className="text-blue-500" size={18} />
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Issued At</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{iatTime.date} ({iatTime.relative})</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Output */}
        <div className="flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[150px]">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center gap-2">
                <FileJson size={14}/> Header
              </span>
              {headerJson && (
                 <div className="flex gap-2">
                   <button onClick={() => handleCopy(headerJson, "header")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-red-500 dark:text-slate-400 font-medium">
                     {copiedKey === "header" ? <span className="text-green-500">Copied!</span> : <><Copy size={12} /> Copy</>}
                   </button>
                 </div>
              )}
            </div>
            <div className="flex-1 relative bg-slate-50/50 dark:bg-[#1e1e1e]/50">
              <textarea 
                value={headerJson} readOnly
                className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-red-600 dark:text-red-400 font-mono text-sm custom-scrollbar"
                placeholder="Decoded Header JSON"
              />
            </div>
          </div>

          {/* Payload */}
          <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex-1 min-h-[250px]">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#a855f7] flex items-center gap-2">
                <FileJson size={14}/> Payload
              </span>
              {payloadJson && (
                 <div className="flex gap-2">
                   <button onClick={() => handleCopy(payloadJson, "payload")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#a855f7] dark:text-slate-400 font-medium">
                     {copiedKey === "payload" ? <span className="text-green-500">Copied!</span> : <><Copy size={12} /> Copy</>}
                   </button>
                   <button onClick={() => handleDownload(payloadJson, "jwt_payload.json")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#a855f7] dark:text-slate-400 font-medium">
                     <Download size={12} /> JSON
                   </button>
                 </div>
              )}
            </div>
            <div className="flex-1 relative bg-slate-50/50 dark:bg-[#1e1e1e]/50">
              <textarea 
                value={payloadJson} readOnly
                className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-[#9333ea] dark:text-[#c084fc] font-mono text-sm custom-scrollbar"
                placeholder="Decoded Payload JSON"
              />
            </div>
          </div>

          {/* Signature */}
          <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[100px]">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0ea5e9] flex items-center gap-2">
                <ShieldCheck size={14}/> Signature
              </span>
              {jwtData?.signature && (
                 <button onClick={() => handleCopy(jwtData.signature, "signature")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#0ea5e9] dark:text-slate-400 font-medium">
                   {copiedKey === "signature" ? <span className="text-green-500">Copied!</span> : <><Copy size={12} /> Copy</>}
                 </button>
              )}
            </div>
            <div className="flex-1 relative bg-slate-50/50 dark:bg-[#1e1e1e]/50 p-4">
              <div className="break-all font-mono text-sm text-[#0284c7] dark:text-[#38bdf8]">
                {jwtData?.signature || "Signature will appear here"}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
