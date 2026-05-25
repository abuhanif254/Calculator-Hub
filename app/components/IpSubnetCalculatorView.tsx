"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { InlineMath, BlockMath } from "@/app/components/KatexMath";
import { 
  Network, 
  Settings, 
  Server, 
  Database,
  ArrowRightLeft, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Info, 
  History, 
  Trash2, 
  Layers, 
  Terminal,
  Grid,
  ChevronRight,
  Plus,
  X
} from "lucide-react";

interface IpSubnetCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

// IP Validation helper
const isValidIPv4 = (ip: string): boolean => {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    const num = Number(part);
    return part !== "" && !isNaN(num) && num >= 0 && num <= 255 && part.length === num.toString().length;
  });
};

// Convert IP to number
const ipToNum = (ip: string): number => {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
};

// Convert number to IP
const numToIp = (num: number): string => {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ].join('.');
};

// Convert number to binary string
const numToBinary = (num: number): string => {
  return (num >>> 0).toString(2).padStart(32, '0');
};

// Format binary string into 4 dot-separated octets
const formatBinaryOctets = (binStr: string): string => {
  return [
    binStr.substring(0, 8),
    binStr.substring(8, 16),
    binStr.substring(16, 24),
    binStr.substring(24, 32)
  ].join('.');
};

// Convert CIDR to Subnet Mask (number)
const cidrToMaskNum = (cidr: number): number => {
  return cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
};

// Special Range Detector
const getSpecialRange = (ipNum: number): { name: string; desc: string; type: 'private' | 'reserved' | 'public' | 'loopback' | 'apipa' | 'multicast' } => {
  const o1 = (ipNum >>> 24) & 255;
  const o2 = (ipNum >>> 16) & 255;

  // Loopback (127.0.0.0/8)
  if (o1 === 127) {
    return { name: "Loopback Address", desc: "Reserved for local loopback testing.", type: 'loopback' };
  }
  // Private Class A (10.0.0.0/8)
  if (o1 === 10) {
    return { name: "Private Address (Class A)", desc: "Reserved for private local networks (RFC 1918). Not routable on the public internet.", type: 'private' };
  }
  // APIPA (169.254.0.0/16)
  if (o1 === 169 && o2 === 254) {
    return { name: "APIPA Link-Local", desc: "Automatic Private IP Addressing used when DHCP is unavailable.", type: 'apipa' };
  }
  // Private Class B (172.16.0.0/12)
  if (o1 === 172 && o2 >= 16 && o2 <= 31) {
    return { name: "Private Address (Class B)", desc: "Reserved for private local networks (RFC 1918). Not routable on the public internet.", type: 'private' };
  }
  // Private Class C (192.168.0.0/16)
  if (o1 === 192 && o2 === 168) {
    return { name: "Private Address (Class C)", desc: "Reserved for private local networks (RFC 1918). Not routable on the public internet.", type: 'private' };
  }
  // Multicast (224.0.0.0/4)
  if (o1 >= 224 && o1 <= 239) {
    return { name: "Multicast Range", desc: "Reserved for multicast groups (Class D).", type: 'multicast' };
  }
  // Reserved (240.0.0.0/4)
  if (o1 >= 240) {
    return { name: "Reserved / Experimental", desc: "Reserved for future use or experimental research (Class E).", type: 'reserved' };
  }

  return { name: "Public Address", desc: "Routable globally across the public internet.", type: 'public' };
};

// Class Detector
const getIpClass = (ipNum: number): { name: string; mask: string; desc: string } => {
  const o1 = (ipNum >>> 24) & 255;
  if (o1 >= 1 && o1 <= 126) {
    return { name: "Class A", mask: "255.0.0.0 (/8)", desc: "Designed for massive networks with over 16 million hosts." };
  }
  if (o1 === 127) {
    return { name: "Class A (Loopback)", mask: "255.0.0.0 (/8)", desc: "Reserved loopback diagnostics." };
  }
  if (o1 >= 128 && o1 <= 191) {
    return { name: "Class B", mask: "255.255.0.0 (/16)", desc: "Designed for medium-sized enterprise networks with up to 65,534 hosts." };
  }
  if (o1 >= 192 && o1 <= 223) {
    return { name: "Class C", mask: "255.255.255.0 (/24)", desc: "Designed for small networks with up to 254 hosts (commonly home/office)." };
  }
  if (o1 >= 224 && o1 <= 239) {
    return { name: "Class D", mask: "N/A (Multicast)", desc: "Reserved exclusively for multicast traffic groups." };
  }
  return { name: "Class E", mask: "N/A (Experimental)", desc: "Reserved for research, development, and future testing." };
};

export function IpSubnetCalculatorView({ calcDef }: IpSubnetCalculatorViewProps) {
  // Tabs: 'calculator' | 'vlsm' | 'generator' | 'classes' | 'ipv6'
  const [activeTab, setActiveTab] = useState<'calculator' | 'vlsm' | 'generator' | 'classes' | 'ipv6'>('calculator');

  // Input states for main calculator
  const [ipInput, setIpInput] = useState<string>("192.168.1.10");
  const [cidrInput, setCidrInput] = useState<number>(24);
  const [maskInput, setMaskInput] = useState<string>("255.255.255.0");

  // Sync mask from CIDR
  const handleCidrChange = (val: number) => {
    setCidrInput(val);
    const mNum = cidrToMaskNum(val);
    setMaskInput(numToIp(mNum));
  };

  // Sync CIDR from Mask
  const handleMaskChange = (val: string) => {
    setMaskInput(val);
    if (isValidIPv4(val)) {
      const num = ipToNum(val);
      // Count leading ones in binary representation
      const bin = (num >>> 0).toString(2);
      const ones = bin.split('1').length - 1;
      // Confirm that the mask is contiguous ones
      const isContiguous = (num | (~num >>> 1)) === ~0 || num === 0;
      if (isContiguous) {
        setCidrInput(ones);
      }
    }
  };

  // VLSM Subnet Planner inputs
  const [vlsmBaseIp, setVlsmBaseIp] = useState<string>("10.0.0.0");
  const [vlsmBaseCidr, setVlsmBaseCidr] = useState<number>(16);
  const [vlsmSegments, setVlsmSegments] = useState<Array<{ id: number; name: string; size: number }>>([
    { id: 1, name: "Engineering Department", size: 60 },
    { id: 2, name: "Sales Team Office", size: 20 },
    { id: 3, name: "Server Infrastructure", size: 10 },
    { id: 4, name: "Router Links Point-to-Point", size: 2 },
  ]);
  const [segmentNameInput, setSegmentNameInput] = useState<string>("");
  const [segmentSizeInput, setSegmentSizeInput] = useState<string>("");

  const addVlsmSegment = () => {
    const sizeNum = Number(segmentSizeInput);
    if (!segmentNameInput || isNaN(sizeNum) || sizeNum <= 0) return;
    setVlsmSegments(prev => [
      ...prev,
      { id: Date.now(), name: segmentNameInput, size: sizeNum }
    ]);
    setSegmentNameInput("");
    setSegmentSizeInput("");
  };

  const removeVlsmSegment = (id: number) => {
    setVlsmSegments(prev => prev.filter(s => s.id !== id));
  };

  // Preset IP options
  const applyPreset = (ip: string, cidr: number) => {
    setIpInput(ip);
    handleCidrChange(cidr);
    if (activeTab === 'vlsm') {
      setVlsmBaseIp(ip);
      setVlsmBaseCidr(cidr);
    }
  };

  // Calculations Local Storage History
  const [history, setHistory] = useState<any[]>([]);
  const [copiedResult, setCopiedResult] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ip-subnet-calculator-history");
      if (stored) setHistory(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToHistory = (type: string, inputDesc: string, resultDesc: string) => {
    const item = {
      id: Date.now(),
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inputDesc,
      resultDesc,
    };
    setHistory(prev => {
      const updated = [item, ...prev.slice(0, 19)];
      localStorage.setItem("ip-subnet-calculator-history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("ip-subnet-calculator-history");
  };

  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResult(id);
    setTimeout(() => setCopiedResult(null), 2000);
  };

  // Main Subnet Calculation logic
  const subnetResult = useMemo(() => {
    if (!isValidIPv4(ipInput)) return null;

    const ip = ipToNum(ipInput);
    const mask = cidrToMaskNum(cidrInput);
    const wildcard = ~mask >>> 0;

    const network = (ip & mask) >>> 0;
    const broadcast = (network | wildcard) >>> 0;

    const firstUsable = cidrInput >= 31 ? network : (network + 1) >>> 0;
    const lastUsable = cidrInput >= 31 ? broadcast : (broadcast - 1) >>> 0;

    const totalHosts = Math.pow(2, 32 - cidrInput);
    const usableHosts = cidrInput >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

    const special = getSpecialRange(ip);
    const ipClass = getIpClass(ip);

    return {
      ipStr: numToIp(ip),
      maskStr: numToIp(mask),
      wildcardStr: numToIp(wildcard),
      networkStr: numToIp(network),
      broadcastStr: numToIp(broadcast),
      firstUsableStr: numToIp(firstUsable),
      lastUsableStr: numToIp(lastUsable),
      totalHosts,
      usableHosts,
      ipBinary: numToBinary(ip),
      maskBinary: numToBinary(mask),
      special,
      ipClass,
    };
  }, [ipInput, cidrInput]);

  // VLSM Allocation logic
  const vlsmResult = useMemo(() => {
    if (!isValidIPv4(vlsmBaseIp)) return null;

    const sortedSegments = [...vlsmSegments].sort((a, b) => b.size - a.size);
    let currentIpNum = ipToNum(vlsmBaseIp);
    const allocations = [];
    let isSuccessful = true;

    for (const segment of sortedSegments) {
      // Find smallest subnet that fits segment.size + 2 (network & broadcast)
      const neededHosts = segment.size + 2;
      let power = 0;
      while (Math.pow(2, power) < neededHosts) {
        power++;
      }
      const segmentCidr = 32 - power;
      const segmentMaskNum = cidrToMaskNum(segmentCidr);
      
      // Subnet boundary alignment
      const segmentSize = Math.pow(2, power);
      if (currentIpNum % segmentSize !== 0) {
        currentIpNum = (Math.floor(currentIpNum / segmentSize) + 1) * segmentSize;
      }

      const segmentNetwork = currentIpNum;
      const segmentBroadcast = segmentNetwork + segmentSize - 1;
      const segmentFirst = segmentNetwork + 1;
      const segmentLast = segmentBroadcast - 1;

      allocations.push({
        id: segment.id,
        name: segment.name,
        requestedSize: segment.size,
        allocatedSize: segmentSize - 2,
        cidr: `/${segmentCidr}`,
        maskStr: numToIp(segmentMaskNum),
        networkStr: numToIp(segmentNetwork),
        broadcastStr: numToIp(segmentBroadcast),
        rangeStr: `${numToIp(segmentFirst)} - ${numToIp(segmentLast)}`,
      });

      // Move to next segment start boundary
      currentIpNum = segmentBroadcast + 1;
    }

    return { allocations, isSuccessful };
  }, [vlsmBaseIp, vlsmSegments]);

  // Generator Preview limits
  const ipPreviewList = useMemo(() => {
    if (!subnetResult) return [];
    const maxPreview = 128;
    const list = [];
    const netNum = ipToNum(subnetResult.networkStr);
    
    // Limits based on host count
    const limit = Math.min(subnetResult.totalHosts, maxPreview);
    for (let i = 0; i < limit; i++) {
      const current = netNum + i;
      let label = "Usable Host";
      if (i === 0 && cidrInput < 31) label = "Network Address";
      if (i === subnetResult.totalHosts - 1 && cidrInput < 31) label = "Broadcast Address";
      
      list.push({
        ip: numToIp(current),
        binary: formatBinaryOctets(numToBinary(current)),
        label,
      });
    }
    return list;
  }, [subnetResult, cidrInput]);

  // Download export reports
  const triggerExport = (format: 'txt' | 'csv' | 'json') => {
    if (!subnetResult) return;
    let txt = "====================================================\n";
    txt += "          IPV4 SUBNET CALCULATOR REPORT          \n";
    txt += "====================================================\n";
    txt += `Timestamp: ${new Date().toLocaleString()}\n`;
    txt += `Input IP Address: ${ipInput} / ${cidrInput}\n\n`;

    txt += "NETWORK VALUES:\n";
    txt += `- Network Address: ${subnetResult.networkStr}\n`;
    txt += `- Broadcast Address: ${subnetResult.broadcastStr}\n`;
    txt += `- Usable Host Range: ${subnetResult.firstUsableStr} - ${subnetResult.lastUsableStr}\n`;
    txt += `- Subnet Mask: ${subnetResult.maskStr}\n`;
    txt += `- Wildcard Mask: ${subnetResult.wildcardStr}\n`;
    txt += `- Usable Host Capacity: ${subnetResult.usableHosts} hosts (Total: ${subnetResult.totalHosts})\n`;
    txt += `- Special Ranges: ${subnetResult.special.name} (${subnetResult.ipClass.name})\n`;

    if (format === 'txt') {
      const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `subnet-report.txt`;
      link.click();
    } else if (format === 'csv') {
      let csv = "Variable,Value\n";
      txt.split("\n").forEach(line => {
        if (line && line.includes(":")) {
          const parts = line.split(":");
          csv += `"${parts[0].trim()}","${parts[1].trim()}"\n`;
        }
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `subnet-report.csv`;
      link.click();
    } else if (format === 'json') {
      const blob = new Blob([JSON.stringify(subnetResult, null, 2)], { type: "application/json;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `subnet-report.json`;
      link.click();
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden font-mono">
      
      {/* Header Dashboard Panel */}
      <div className="p-6 md:p-8 bg-slate-900/50 border-b border-slate-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-950">
            <Network className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{calcDef.title}</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-800/30 px-2 py-0.5 rounded-full uppercase tracking-wider">v4 CIDR</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Advanced Variable Length Subnet Masking (VLSM) and IPv4 bit-mask analysis tools.
            </p>
          </div>
        </div>

        {/* Action Presets */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button onClick={() => applyPreset("192.168.1.10", 24)} className="py-1 px-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-lg transition">Home: /24</button>
          <button onClick={() => applyPreset("10.0.0.0", 16)} className="py-1 px-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-lg transition">VPC Base: /16</button>
          <button onClick={() => applyPreset("172.16.0.0", 12)} className="py-1 px-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-lg transition">Corp WAN: /12</button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="border-b border-slate-850 flex overflow-x-auto scrollbar-none bg-slate-900/10">
        {[
          { key: 'calculator', label: 'Subnet Calc', icon: Terminal },
          { key: 'vlsm', label: 'VLSM Planner', icon: Layers },
          { key: 'generator', label: 'IP Previewer', icon: Grid },
          { key: 'classes', label: 'Network Classes', icon: Server },
          { key: 'ipv6', label: 'IPv6 Reference', icon: ArrowRightLeft },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-6 text-center text-xs border-b-2 transition-all whitespace-nowrap outline-none flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'border-emerald-500 text-emerald-400 bg-slate-900/30'
                  : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-slate-900/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Inputs */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* TAB 1 & TAB 3: CALC INPUTS */}
          {(activeTab === 'calculator' || activeTab === 'generator') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">IPv4 IP Address</label>
                 <input
                  type="text"
                  value={ipInput}
                  onChange={(e) => setIpInput(e.target.value)}
                  style={{ color: "#f1f5f9" }}
                  className={`w-full h-11 px-3 bg-slate-900 border rounded-xl outline-none font-semibold text-sm transition ${
                    isValidIPv4(ipInput) ? 'border-slate-800 focus:border-emerald-500' : 'border-rose-500/50'
                  }`}
                  placeholder="e.g. 192.168.1.1"
                />
                {!isValidIPv4(ipInput) && (
                  <span className="block text-[10px] text-rose-500 mt-1">Please enter a valid IPv4 address (e.g. 4 octets between 0-255).</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">CIDR Block</label>
                  <select
                    value={cidrInput}
                    onChange={(e) => handleCidrChange(Number(e.target.value))}
                    style={{ color: "#f1f5f9" }}
                    className="w-full h-11 px-2 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl outline-none font-semibold text-sm"
                  >
                    {Array.from({ length: 32 }, (_, i) => 32 - i).map(c => (
                      <option key={c} value={c} style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>/{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Subnet Mask</label>
                  <input
                    type="text"
                    value={maskInput}
                    onChange={(e) => handleMaskChange(e.target.value)}
                    style={{ color: "#f1f5f9" }}
                    className="w-full h-11 px-3 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl outline-none font-semibold text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VLSM PLANNER INPUTS */}
          {activeTab === 'vlsm' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Base IP Network</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={vlsmBaseIp}
                    onChange={(e) => setVlsmBaseIp(e.target.value)}
                    style={{ color: "#f1f5f9" }}
                    className="col-span-2 h-11 px-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-semibold text-sm"
                    placeholder="e.g. 10.0.0.0"
                  />
                  <select
                    value={vlsmBaseCidr}
                    onChange={(e) => setVlsmBaseCidr(Number(e.target.value))}
                    style={{ color: "#f1f5f9" }}
                    className="h-11 px-1 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs"
                  >
                    {[8, 12, 16, 20, 24].map(c => (
                      <option key={c} value={c} style={{ color: "#f1f5f9", backgroundColor: "#0f172a" }}>/{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add segments */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-850 space-y-3">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add Custom Segment</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={segmentNameInput}
                    onChange={(e) => setSegmentNameInput(e.target.value)}
                    placeholder="e.g. WiFi Users"
                    style={{ color: "#f1f5f9" }}
                    className="h-10 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs"
                  />
                  <input
                    type="number"
                    value={segmentSizeInput}
                    onChange={(e) => setSegmentSizeInput(e.target.value)}
                    placeholder="Hosts required"
                    style={{ color: "#f1f5f9" }}
                    className="h-10 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs"
                  />
                </div>
                <button
                  onClick={addVlsmSegment}
                  className="w-full h-9 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert Subnet</span>
                </button>
              </div>

              {/* Segments list preview */}
              <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin pr-1">
                {vlsmSegments.map(s => (
                  <div key={s.id} className="flex justify-between items-center text-xs p-2 bg-slate-900 border border-slate-850 rounded-lg">
                    <div className="truncate pr-2">
                      <span className="font-semibold text-slate-300">{s.name}</span>
                      <span className="block text-[10px] text-slate-500">Hosts: {s.size}</span>
                    </div>
                    <button onClick={() => removeVlsmSegment(s.id)} className="text-slate-500 hover:text-rose-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4 & 5: STATIC CONTROLS */}
          {(activeTab === 'classes' || activeTab === 'ipv6') && (
            <div className="bg-slate-900/20 p-4 rounded-xl border border-slate-850 text-xs leading-relaxed text-slate-400">
              <Info className="w-5 h-5 text-emerald-400 mb-2" />
              <p>
                IPv4 is structured using 32-bit addresses divided into 4 octets. Local subnets allow network routers to index traffic efficiently.
              </p>
              <p className="mt-2">
                Use the upper tabs to analyze subnets dynamically or calculate VLSM allocations.
              </p>
            </div>
          )}

          {/* History tracker */}
          {history.length > 0 && (
            <div className="pt-6 border-t border-slate-900 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-400 font-bold">
                  <History className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Subnet Log Vault</span>
                </span>
                <button onClick={clearHistory} className="text-slate-500 hover:text-rose-500 font-bold flex items-center gap-1">
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto scrollbar-thin">
                {history.map(h => (
                  <div key={h.id} className="p-2 bg-slate-900 border border-slate-850 rounded-lg flex justify-between items-center text-[10px]">
                    <div>
                      <span className="font-bold text-emerald-400">{h.type}</span>
                      <p className="text-slate-500">{h.inputDesc}</p>
                    </div>
                    <span className="font-bold text-slate-350">{h.resultDesc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Results & Bitmasks */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TAB 1: CALC RESULTS */}
          {activeTab === 'calculator' && subnetResult && (
            <div className="space-y-6">
              
              {/* Dashboard overview row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Network / CIDR Block */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute right-4 top-4 text-slate-800"><Terminal className="w-12 h-12" /></div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Calculated IP Subnet</span>
                  <div className="text-2xl font-black text-emerald-400 tracking-tight">{subnetResult.networkStr} /{cidrInput}</div>
                  <div className="text-[10px] text-slate-500 mt-2">Default Netmask: {subnetResult.maskStr}</div>
                </div>

                {/* Hosts allocation */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute right-4 top-4 text-slate-800"><Server className="w-12 h-12" /></div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Usable Host Capacity</span>
                  <div className="text-2xl font-black text-emerald-400 tracking-tight">{subnetResult.usableHosts.toLocaleString()} hosts</div>
                  <div className="text-[10px] text-slate-500 mt-2">Total IP allocations: {subnetResult.totalHosts.toLocaleString()}</div>
                </div>
              </div>

              {/* Bitmask Matrix representation */}
              <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-5 space-y-3">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Binary Bitmask Breakdown</span>
                
                {/* Bitwise alignment rows */}
                <div className="space-y-2 text-xs leading-none">
                  {/* IP Binary */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 p-2 bg-slate-900/40 rounded-lg">
                    <span className="text-slate-400 font-bold uppercase w-24">IP Address</span>
                    <div className="flex gap-2 font-black text-slate-200">
                      {formatBinaryOctets(subnetResult.ipBinary).split('.').map((octet, idx) => (
                        <span key={idx}>{octet}</span>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">{subnetResult.ipStr}</span>
                  </div>

                  {/* Mask Binary */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 p-2 bg-slate-900/40 rounded-lg">
                    <span className="text-slate-400 font-bold uppercase w-24">Netmask</span>
                    <div className="flex gap-2 font-black text-slate-250">
                      {formatBinaryOctets(subnetResult.maskBinary).split('.').map((octet, idx) => {
                        // Highlight network vs host bits
                        return (
                          <span key={idx} className="flex">
                            {octet.split('').map((bit, bitIdx) => {
                              const overallIdx = idx * 8 + bitIdx;
                              const isNet = overallIdx < cidrInput;
                              return (
                                <span key={bitIdx} className={isNet ? "text-emerald-400" : "text-slate-600"}>{bit}</span>
                              );
                            })}
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-slate-500">{subnetResult.maskStr}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-[10px] font-bold mt-1">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" /> Network Bits ({cidrInput})</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-600 rounded-sm" /> Host Bits ({32 - cidrInput})</span>
                </div>
              </div>

              {/* Subnet details table */}
              <div className="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-slate-850 bg-slate-900/40 font-bold text-slate-400">
                  <div className="col-span-2">Network Variable</div>
                  <div>IP Stature</div>
                  <div>Clipboard</div>
                </div>

                {[
                  { label: "Network Address", val: subnetResult.networkStr },
                  { label: "First Usable Host", val: subnetResult.firstUsableStr },
                  { label: "Last Usable Host", val: subnetResult.lastUsableStr },
                  { label: "Broadcast Address", val: subnetResult.broadcastStr },
                  { label: "Wildcard Mask", val: subnetResult.wildcardStr },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-slate-900 hover:bg-slate-900/10 items-center">
                    <div className="col-span-2 font-bold text-slate-200">{row.label}</div>
                    <div className="font-mono text-emerald-400 font-bold">{row.val}</div>
                    <div>
                      <button
                        onClick={() => triggerCopy(row.val, `calc-row-${idx}`)}
                        className="text-[10px] text-slate-500 hover:text-emerald-400 flex items-center gap-1 font-bold"
                      >
                        {copiedResult === `calc-row-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special ranges info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 border border-slate-850 rounded-xl text-center">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Special Scope Range</span>
                  <span className="text-xs font-extrabold text-emerald-400">{subnetResult.special.name}</span>
                  <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{subnetResult.special.desc}</p>
                </div>
                <div className="p-4 bg-slate-900/50 border border-slate-850 rounded-xl text-center">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Standard Network Class</span>
                  <span className="text-xs font-extrabold text-emerald-400">{subnetResult.ipClass.name}</span>
                  <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{subnetResult.ipClass.desc}</p>
                </div>
              </div>

              {/* Copy & Export Report actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = `IP: ${ipInput}/${cidrInput}, Network: ${subnetResult.networkStr}, Usable range: ${subnetResult.firstUsableStr} - ${subnetResult.lastUsableStr}, Mask: ${subnetResult.maskStr}`;
                    triggerCopy(text, 'main-calc-copy');
                    saveToHistory("Subnet Calculation", `${ipInput}/${cidrInput}`, subnetResult.networkStr);
                  }}
                  className="flex-1 py-2 px-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  {copiedResult === 'main-calc-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedResult === 'main-calc-copy' ? "Copied Subnet Summary" : "Copy Subnet Summary"}</span>
                </button>
                <div className="flex gap-1">
                  <button onClick={() => triggerExport('txt')} className="p-2 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-xl transition"><Download className="w-4.5 h-4.5" /></button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VLSM PLANNER */}
          {activeTab === 'vlsm' && vlsmResult && (
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-850 p-5 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">VLSM Subnet Plan Allocations</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                  Allocates optimal subnets using Variable Length Subnet Masking (VLSM). Segments are sorted by host requirements (largest first) to prevent address overlap and optimize address density.
                </p>
              </div>

              {/* Subnet plans table */}
              <div className="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-slate-850 bg-slate-900/40 font-bold text-slate-400 text-[10px]">
                  <div>Segment Name</div>
                  <div>Hosts (Req / Alloc)</div>
                  <div>CIDR & Netmask</div>
                  <div>Address Allocation Ranges</div>
                </div>

                {vlsmResult.allocations.map((alloc) => (
                  <div key={alloc.id} className="grid grid-cols-4 gap-4 p-4 border-b border-slate-900 hover:bg-slate-900/10 items-center">
                    <div className="font-bold text-slate-200 truncate">{alloc.name}</div>
                    <div className="font-mono text-slate-350">{alloc.requestedSize} / {alloc.allocatedSize}</div>
                    <div className="font-mono">
                      <span className="text-emerald-400 font-bold">{alloc.cidr}</span>
                      <span className="block text-[10px] text-slate-500">{alloc.maskStr}</span>
                    </div>
                    <div className="font-mono text-slate-300">
                      <span className="block text-[10px] text-slate-500 font-bold">Net: {alloc.networkStr}</span>
                      <span>{alloc.rangeStr}</span>
                      <span className="block text-[10px] text-slate-500 font-bold">Bc: {alloc.broadcastStr}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = vlsmResult.allocations.map(a => `${a.name}: Network ${a.networkStr}${a.cidr} (Range: ${a.rangeStr})`).join("; ");
                    triggerCopy(text, 'vlsm-copy');
                    saveToHistory("VLSM Plan", `${vlsmBaseIp}/${vlsmBaseCidr}`, `${vlsmResult.allocations.length} Segments`);
                  }}
                  className="flex-1 py-2 px-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  {copiedResult === 'vlsm-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedResult === 'vlsm-copy' ? "Copied VLSM Schedule" : "Copy VLSM Schedule"}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: IP RANGE PREVIEWER */}
          {activeTab === 'generator' && ipPreviewList.length > 0 && (
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-850 p-5 rounded-2xl flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subnet Allocations Preview</h3>
                  <p className="text-[10px] text-slate-500 mt-1 font-sans">
                    Showing up to 128 allocations in this local subnet block.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400">{ipPreviewList.length} IPs</span>
              </div>

              {/* Previewer list */}
              <div className="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden max-h-96 overflow-y-auto scrollbar-thin text-xs">
                <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-850 bg-slate-900/40 font-bold text-slate-400 text-[10px]">
                  <div>IP Address</div>
                  <div>Special Boundary Label</div>
                  <div>Binary Equivalent Octets</div>
                </div>

                {ipPreviewList.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-4 p-4 border-b border-slate-900 hover:bg-slate-900/10 items-center font-mono">
                    <div className="font-bold text-slate-200">{row.ip}</div>
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.label === 'Network Address' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-950' : 
                        row.label === 'Broadcast Address' ? 'bg-rose-500/10 text-rose-400 border border-rose-950' : 
                        'bg-slate-850 text-slate-400'
                      }`}>
                        {row.label}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">{row.binary}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NETWORK CLASSES */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-850 p-5 rounded-2xl">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Standard IP Network Classes</h3>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed font-sans">
                  The original classful networking system segments IPv4 addresses into 5 distinct classes based on the first octet bits.
                </p>
              </div>

              {/* Class grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Class A", range: "1.0.0.0 to 126.255.255.255", mask: "255.0.0.0 (/8)", desc: "Reserved for huge corporations and telcos. High host count.", color: "border-emerald-950 hover:border-emerald-500/30" },
                  { name: "Class B", range: "128.0.0.0 to 191.255.255.255", mask: "255.255.0.0 (/16)", desc: "Reserved for universities and large companies. Moderate host density.", color: "border-slate-850 hover:border-emerald-500/30" },
                  { name: "Class C", range: "192.0.0.0 to 223.255.255.255", mask: "255.255.255.0 (/24)", desc: "Reserved for standard small networks, houses, and local routers.", color: "border-slate-850 hover:border-emerald-500/30" },
                  { name: "Class D", range: "224.0.0.0 to 239.255.255.255", mask: "N/A (Multicast)", desc: "Reserved for IP multicast transmission protocols.", color: "border-slate-850 hover:border-emerald-500/30" },
                  { name: "Class E", range: "240.0.0.0 to 255.255.255.255", mask: "N/A (Reserved)", desc: "Reserved for future engineering tests and scientific research.", color: "border-slate-850 hover:border-emerald-500/30" },
                ].map((c, idx) => (
                  <div key={idx} className={`p-4 bg-slate-900/30 border rounded-xl transition ${c.color}`}>
                    <span className="block font-bold text-white text-xs">{c.name}</span>
                    <span className="block text-[10px] text-emerald-400 mt-1 font-bold">Range: {c.range}</span>
                    <span className="block text-[10px] text-slate-500">Default Mask: {c.mask}</span>
                    <p className="text-[10px] text-slate-400 mt-2 leading-relaxed font-sans">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: IPV6 REFERENCE */}
          {activeTab === 'ipv6' && (
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-850 p-5 rounded-2xl">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">IPv4 vs IPv6 Structure Comparison</h3>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed font-sans">
                  IPv6 was created to solve the IPv4 address exhaustion crisis. It uses 128-bit addresses represented in hexadecimal.
                </p>
              </div>

              {/* Comparison table */}
              <div className="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-850 bg-slate-900/40 font-bold text-slate-400 text-[10px]">
                  <div>Feature Parameter</div>
                  <div>IPv4 Standard</div>
                  <div>IPv6 Standard</div>
                </div>

                {[
                  { param: "Address Stature Length", v4: "32 bits", v6: "128 bits" },
                  { param: "Octet Representation", v4: "Decimal (e.g. 192.168.1.1)", v6: "Hexadecimal (e.g. 2001:db8::1)" },
                  { param: "Total Capacity Size", v4: "~4.3 billion addresses", v6: "~3.4 × 10^38 addresses" },
                  { param: "Security Protocols", v4: "Optional IPsec features", v6: "Mandatory built-in IPsec support" },
                  { param: "Auto-configuration", v4: "DHCP services", v6: "SLAAC stateful auto-config" },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-4 p-4 border-b border-slate-900 hover:bg-slate-900/10 font-mono">
                    <div className="font-bold text-slate-300">{row.param}</div>
                    <div className="text-slate-400">{row.v4}</div>
                    <div className="text-emerald-400 font-bold">{row.v6}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educational step solver equations */}
          {subnetResult && (
            <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl text-xs space-y-3 leading-relaxed text-slate-400">
              <h4 className="font-bold text-emerald-400 font-mono uppercase tracking-wider">Subnet Allocation Calculations</h4>
              <p>For a CIDR suffix $N = {cidrInput}$:</p>
              <div className="space-y-2">
                <p>{"1. The total host addresses count ($H_{total}$) is calculated as:"}</p>
                <BlockMath math={`H_{total} = 2^{32 - N} = 2^{32 - ${cidrInput}} = 2^{${32 - cidrInput}} = ${subnetResult.totalHosts.toLocaleString()}`} />
                
                <p>{"2. The usable host addresses count ($H_{usable}$) excludes the Network & Broadcast bounds:"}</p>
                <BlockMath math={`H_{usable} = H_{total} - 2 = ${subnetResult.usableHosts.toLocaleString()}`} />

                <p>{"3. Binary subnet masking values: Netmask uses $N$ leading ones, Wildcard uses $32 - N$ leading ones."}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
