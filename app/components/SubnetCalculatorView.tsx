"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Network, Server, ArrowRightCircle, Globe } from "lucide-react";

interface SubnetCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function SubnetCalculatorView({ calcDef }: SubnetCalculatorViewProps) {
  const t = useTranslations("SubnetCalculator");

  const [ipAddress, setIpAddress] = useState("192.168.1.1");
  const [cidr, setCidr] = useState("24");
  const [errorObj, setErrorObj] = useState("");

  const [results, setResults] = useState<{
    ipClass: string;
    subnetMask: string;
    networkAddress: string;
    broadcastAddress: string;
    firstHost: string;
    lastHost: string;
    totalHosts: number;
    usableHosts: number;
  } | null>(null);

  const ipToInt = (ip: string) => {
    return ip.split('.').reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;
  };

  const intToIp = (int: number) => {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255
    ].join('.');
  };

  const getIpClass = (ip: string) => {
    const firstOctet = parseInt(ip.split('.')[0], 10);
    if (firstOctet >= 1 && firstOctet <= 126) return "A";
    if (firstOctet >= 128 && firstOctet <= 191) return "B";
    if (firstOctet >= 192 && firstOctet <= 223) return "C";
    if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)";
    if (firstOctet >= 240 && firstOctet <= 255) return "E (Experimental)";
    return "Unknown";
  };

  const calculateSubnet = () => {
    setErrorObj("");
    setResults(null);

    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipPattern.test(ipAddress)) {
      setErrorObj(t("errorInvalidIp"));
      return;
    }

    const cidrNum = parseInt(cidr, 10);
    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
      setErrorObj(t("errorInvalidCidr"));
      return;
    }

    const ipInt = ipToInt(ipAddress);
    const maskInt = cidrNum === 0 ? 0 : (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
    
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt)) >>> 0;

    let firstHostInt = networkInt + 1;
    let lastHostInt = broadcastInt - 1;

    let totalHosts = Math.pow(2, 32 - cidrNum);
    let usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;

    if (cidrNum === 31) {
      usableHosts = 2;
      firstHostInt = networkInt;
      lastHostInt = broadcastInt;
    } else if (cidrNum === 32) {
      usableHosts = 1;
      firstHostInt = networkInt;
      lastHostInt = broadcastInt;
    }

    setResults({
      ipClass: getIpClass(ipAddress),
      subnetMask: intToIp(maskInt),
      networkAddress: intToIp(networkInt),
      broadcastAddress: intToIp(broadcastInt),
      firstHost: intToIp(firstHostInt),
      lastHost: intToIp(lastHostInt),
      totalHosts,
      usableHosts
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
          <Network size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-10">
         
         <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Globe size={16} className="text-slate-400" /> {t("ipAddress")}
               </label>
               <input 
                 type="text" 
                 value={ipAddress} 
                 onChange={(e) => setIpAddress(e.target.value)} 
                 placeholder="192.168.1.1"
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 font-mono tracking-wider text-lg" 
               />
               <p className="text-xs text-slate-400 px-1">{t("ipHint")}</p>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Server size={16} className="text-slate-400" /> {t("cidrSuffix")}
               </label>
               <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400 pointer-events-none">/</span>
                 <input 
                   type="number" 
                   min="0"
                   max="32"
                   value={cidr} 
                   onChange={(e) => setCidr(e.target.value)} 
                   className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 font-mono text-lg" 
                 />
               </div>
               <div className="flex flex-wrap gap-2 mt-2">
                  {[8, 16, 24, 32].map(commonCidr => (
                     <button key={commonCidr} onClick={() => setCidr(commonCidr.toString())} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-200">
                        /{commonCidr}
                     </button>
                  ))}
               </div>
            </div>

            {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

            <button onClick={calculateSubnet} className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2">
               {calcDef.title} <ArrowRightCircle size={18} />
            </button>
         </div>

         <div className="flex-1 flex flex-col bg-slate-50 rounded-2xl border border-slate-200 p-6 min-h-[300px]">
            {!results ? (
              <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                <Network size={80} className="mb-4" strokeWidth={1} />
                <p className="font-medium mt-2 max-w-[200px]">{t("waiting")}</p>
              </div>
            ) : (
              <div className="flex flex-col h-full space-y-3 animate-in fade-in zoom-in duration-300">
                 
                 <div className="bg-white border-2 border-indigo-200 rounded-2xl p-5 shadow-sm text-center">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{t("resNetworkAddress")}</span>
                    <div className="text-3xl font-black text-slate-800 font-mono tracking-tight mt-1">{results.networkAddress}</div>
                 </div>

                 <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">{t("resSubnetMask")}</span>
                       <div className="text-sm font-bold text-slate-700 font-mono mt-1">{results.subnetMask}</div>
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm border-l-4 border-l-rose-400">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">{t("resBroadcast")}</span>
                       <div className="text-sm font-bold text-slate-700 font-mono mt-1">{results.broadcastAddress}</div>
                    </div>
                 </div>

                 <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm border-l-4 border-l-emerald-400">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t("resUsableRange")}</span>
                    <div className="text-sm font-bold text-emerald-700 font-mono mt-1">
                       {results.usableHosts > 0 ? `${results.firstHost} - ${results.lastHost}` : "N/A"}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center">
                       <span className="text-xl font-black text-slate-800">{results.usableHosts.toLocaleString()}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">{t("resUsableHosts")}</span>
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center">
                       <span className="text-xl font-bold text-slate-600">{results.totalHosts.toLocaleString()}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">{t("resTotalHosts")}</span>
                    </div>
                 </div>
                 
                 <div className="text-center mt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t("resIpClass")}: {results.ipClass}</span>
                 </div>

              </div>
            )}
         </div>
      </div>
    </div>
  );
}
