"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { ShieldCheck, Copy, RefreshCw, CheckCircle2 } from "lucide-react";

interface PasswordGeneratorViewProps {
  calcDef: CalculatorDef;
}

export function PasswordGeneratorView({ calcDef }: PasswordGeneratorViewProps) {
  const t = useTranslations("PasswordGenerator");

  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);

  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Fallback if user unchecks everything
    if (charset === "") {
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      setIncludeLowercase(true);
      setIncludeUppercase(true);
      setIncludeNumbers(true);
    }

    let newPassword = "";
    const randomBuffer = new Uint32Array(length);
    window.crypto.getRandomValues(randomBuffer);

    for (let i = 0; i < length; i++) {
        newPassword += charset[randomBuffer[i] % charset.length];
    }
    
    setPassword(newPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // Initial generation on mount
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrengthIndicator = () => {
    let strength = 0;
    if (length > 12) strength += 1;
    if (length >= 16) strength += 1;
    if (includeUppercase) strength += 1;
    if (includeLowercase) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSymbols) strength += 1;

    if (strength <= 3) return { label: t("strengthWeak"), color: "bg-rose-500", w: "w-1/3" };
    if (strength <= 5) return { label: t("strengthGood"), color: "bg-amber-400", w: "w-2/3" };
    return { label: t("strengthStrong"), color: "bg-emerald-500", w: "w-full" };
  };

  const strengthData = getStrengthIndicator();

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
          <ShieldCheck size={26} strokeWidth={2.5} />
        </div>
        <div>
           <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
           <p className="text-sm text-slate-500 font-medium">{t("subtitle")}</p>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        
        {/* Output Display */}
        <div className="relative group">
           <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 md:py-8 flex items-center justify-between gap-4 transition-colors group-hover:border-emerald-200">
              <div className="text-2xl md:text-3xl lg:text-4xl font-mono text-slate-800 tracking-wider break-all leading-tight font-medium">
                 {password}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button 
                    onClick={copyToClipboard}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${copied ? 'bg-emerald-500 text-white shadow-md' : 'bg-white border hover:bg-slate-50 border-slate-300 text-slate-600 shadow-sm'}`}
                  >
                     {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                     <span className="hidden sm:inline">{copied ? t("copied") : t("copy")}</span>
                  </button>
                  <button 
                    onClick={generatePassword}
                    className="flex items-center justify-center p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md shadow-emerald-500/20"
                    title={t("refresh")}
                  >
                     <RefreshCw size={20} strokeWidth={2.5} />
                  </button>
              </div>
           </div>
        </div>

        {/* Strength Bar */}
        <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold">
               <span className="text-slate-500">{t("strengthTitle")}</span>
               <span className={strengthData.color.replace('bg-', 'text-')}>{strengthData.label}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
               <div className={`h-full transition-all duration-300 ease-out ${strengthData.color} ${strengthData.w}`}></div>
            </div>
        </div>

        <hr className="border-slate-100" />

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           
           {/* Length Slider */}
           <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <label className="text-lg font-bold text-slate-700">{t("lengthTitle")}</label>
                 <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-lg text-xl font-black font-mono border border-emerald-100">
                    {length}
                 </div>
              </div>
              <input 
                 type="range" 
                 min="4" 
                 max="64" 
                 value={length} 
                 onChange={(e) => setLength(parseInt(e.target.value, 10))}
                 className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs font-bold text-slate-400">
                 <span>4</span>
                 <span>32</span>
                 <span>64</span>
              </div>
           </div>

           {/* Checkboxes */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { id: 'uppercase', label: t("uppercase"), state: includeUppercase, set: setIncludeUppercase, hint: "A-Z" },
                 { id: 'lowercase', label: t("lowercase"), state: includeLowercase, set: setIncludeLowercase, hint: "a-z" },
                 { id: 'numbers', label: t("numbers"), state: includeNumbers, set: setIncludeNumbers, hint: "0-9" },
                 { id: 'symbols', label: t("symbols"), state: includeSymbols, set: setIncludeSymbols, hint: "!@#$" }
               ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                     <div className="relative flex items-center">
                        <input 
                          type="checkbox"
                          checked={opt.state}
                          onChange={(e) => opt.set(e.target.checked)}
                          className="w-5 h-5 appearance-none rounded border-2 border-slate-300 checked:bg-emerald-500 checked:border-emerald-500 transition-colors cursor-pointer"
                        />
                        <CheckCircle2 size={14} strokeWidth={3} className={`absolute left-0.5 pointer-events-none text-white transition-opacity ${opt.state ? 'opacity-100' : 'opacity-0'}`} />
                     </div>
                     <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm select-none">{opt.label}</span>
                        <span className="text-xs text-slate-400 font-mono">{opt.hint}</span>
                     </div>
                  </label>
               ))}
           </div>

        </div>

      </div>
    </div>
  );
}
