"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Triangle, Info } from "lucide-react";

interface TriangleCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function TriangleCalculatorView({ calcDef }: TriangleCalculatorViewProps) {
  const t = useTranslations("TriangleCalculator");

  const [mode, setMode] = useState<"sss" | "sas" | "bh">("sss");

  // SSS state
  const [sa, setSa] = useState("");
  const [sb, setSb] = useState("");
  const [sc, setSc] = useState("");
  const [sssRes, setSssRes] = useState<{ A: number; B: number; C: number; area: number; perimeter: number } | null>(null);
  const [sssErr, setSssErr] = useState("");

  // SAS state
  const [sasA, setSasA] = useState(""); // side
  const [sasB, setSasB] = useState(""); // side
  const [sasAngle, setSasAngle] = useState(""); // angle between them
  const [sasRes, setSasRes] = useState<{ C: number; AngA: number; AngB: number; area: number; perimeter: number } | null>(null);
  const [sasErr, setSasErr] = useState("");

  // Base Height state
  const [bhBase, setBhBase] = useState("");
  const [bhHeight, setBhHeight] = useState("");
  const [bhRes, setBhRes] = useState<{ area: number } | null>(null);

  const calculateSSS = () => {
    setSssErr("");
    const a = parseFloat(sa);
    const b = parseFloat(sb);
    const c = parseFloat(sc);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) return;

    if (a + b <= c || a + c <= b || b + c <= a) {
      setSssErr(t("invalidTriangle"));
      setSssRes(null);
      return;
    }

    const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB;

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    setSssRes({ A: angleA, B: angleB, C: angleC, area, perimeter: a + b + c });
  };

  const calculateSAS = () => {
    setSasErr("");
    const a = parseFloat(sasA);
    const b = parseFloat(sasB);
    const angleDeg = parseFloat(sasAngle); // angle in degrees

    if (isNaN(a) || isNaN(b) || isNaN(angleDeg) || a <= 0 || b <= 0 || angleDeg <= 0 || angleDeg >= 180) {
      if (angleDeg >= 180) setSasErr(t("invalidAngle"));
      return;
    }

    const angleRad = angleDeg * (Math.PI / 180);
    const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angleRad));

    // Now we have SSS, we can find the other angels
    const angA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    const angB = 180 - angleDeg - angA; // The angle given was C in typical notation, but we just name it angC and let users know

    const perimeter = a + b + c;
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    setSasRes({ C: c, AngA: angA, AngB: angB, area, perimeter });
  };

  const calculateBH = () => {
    const b = parseFloat(bhBase);
    const h = parseFloat(bhHeight);
    if (!isNaN(b) && !isNaN(h) && b > 0 && h > 0) {
      setBhRes({ area: 0.5 * b * h });
    } else {
      setBhRes(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
        <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center shadow-inner">
          <Triangle size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8">
        
        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 p-2 rounded-2xl w-full max-w-xl mx-auto">
          <button 
            onClick={() => setMode('sss')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${mode === 'sss' ? 'bg-white text-slate-800 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t("modeSSS")}
          </button>
          <button 
            onClick={() => setMode('sas')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${mode === 'sas' ? 'bg-white text-slate-800 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t("modeSAS")}
          </button>
          <button 
            onClick={() => setMode('bh')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${mode === 'bh' ? 'bg-white text-slate-800 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t("modeBH")}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SSS Mode */}
          {mode === 'sss' && (
            <>
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("sideA")}</label>
                  <input type="number" value={sa} onChange={(e) => setSa(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("sideB")}</label>
                  <input type="number" value={sb} onChange={(e) => setSb(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("sideC")}</label>
                  <input type="number" value={sc} onChange={(e) => setSc(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500" />
                </div>
                {sssErr && <div className="text-sm text-red-500 font-semibold">{sssErr}</div>}
                <button onClick={calculateSSS} className="w-full py-4 mt-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg transition-all">{t("calculate")}</button>
              </div>

              <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100">
                <h3 className="text-sm border border-pink-200 bg-white px-3 py-1 rounded-full font-bold text-pink-800 uppercase tracking-wider inline-block mb-6">{t("result")}</h3>
                {sssRes ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("angleA")}</span><span className="font-bold text-pink-700 text-lg">{sssRes.A.toFixed(2)}°</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("angleB")}</span><span className="font-bold text-pink-700 text-lg">{sssRes.B.toFixed(2)}°</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("angleC")}</span><span className="font-bold text-pink-700 text-lg">{sssRes.C.toFixed(2)}°</span></div>
                    <div className="h-px bg-pink-200 my-2"></div>
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("area")}</span><span className="font-bold text-pink-700 text-lg">{sssRes.area.toFixed(2)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("perimeter")}</span><span className="font-bold text-pink-700 text-lg">{sssRes.perimeter.toFixed(2)}</span></div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-50"><Triangle size={48} className="mb-2 text-pink-300"/><span className="font-medium text-pink-500">{t("waiting")}</span></div>
                )}
              </div>
            </>
          )}

          {/* SAS Mode */}
          {mode === 'sas' && (
            <>
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("side1")}</label>
                  <input type="number" value={sasA} onChange={(e) => setSasA(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("side2")}</label>
                  <input type="number" value={sasB} onChange={(e) => setSasB(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("angleBetween")}</label>
                  <input type="number" value={sasAngle} onChange={(e) => setSasAngle(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500" />
                </div>
                {sasErr && <div className="text-sm text-red-500 font-semibold">{sasErr}</div>}
                <button onClick={calculateSAS} className="w-full py-4 mt-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg transition-all">{t("calculate")}</button>
              </div>

              <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100">
                <h3 className="text-sm border border-pink-200 bg-white px-3 py-1 rounded-full font-bold text-pink-800 uppercase tracking-wider inline-block mb-6">{t("result")}</h3>
                {sasRes ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("unknownSide")}</span><span className="font-bold text-pink-700 text-lg">{sasRes.C.toFixed(2)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("otherAngle1")}</span><span className="font-bold text-pink-700 text-lg">{sasRes.AngA.toFixed(2)}°</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("otherAngle2")}</span><span className="font-bold text-pink-700 text-lg">{sasRes.AngB.toFixed(2)}°</span></div>
                    <div className="h-px bg-pink-200 my-2"></div>
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("area")}</span><span className="font-bold text-pink-700 text-lg">{sasRes.area.toFixed(2)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("perimeter")}</span><span className="font-bold text-pink-700 text-lg">{sasRes.perimeter.toFixed(2)}</span></div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-50"><Triangle size={48} className="mb-2 text-pink-300"/><span className="font-medium text-pink-500">{t("waiting")}</span></div>
                )}
              </div>
            </>
          )}

          {/* Base Height Mode */}
          {mode === 'bh' && (
            <>
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("base")}</label>
                  <input type="number" value={bhBase} onChange={(e) => setBhBase(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("height")}</label>
                  <input type="number" value={bhHeight} onChange={(e) => setBhHeight(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500" />
                </div>
                <button onClick={calculateBH} className="w-full py-4 mt-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg transition-all">{t("calculate")}</button>
              </div>

              <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100">
                <h3 className="text-sm border border-pink-200 bg-white px-3 py-1 rounded-full font-bold text-pink-800 uppercase tracking-wider inline-block mb-6">{t("result")}</h3>
                {bhRes ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold">{t("area")}</span><span className="font-bold text-pink-700 text-4xl">{bhRes.area.toLocaleString()}</span></div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-50"><Triangle size={48} className="mb-2 text-pink-300"/><span className="font-medium text-pink-500">{t("waiting")}</span></div>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
