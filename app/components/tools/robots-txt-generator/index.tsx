"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Copy, Download, Trash2, Plus, Minus, Info, RefreshCw, AlertTriangle, 
  CheckCircle, ArrowUp, ArrowDown, Settings, Globe, Shield, Sparkles, 
  Layers, Upload, FileText, Check, HelpCircle
} from "lucide-react";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Interfaces & Types ---
interface RobotsRule {
  id: string;
  type: "allow" | "disallow" | "crawl-delay";
  value: string;
}

interface RobotsBlock {
  id: string;
  userAgents: string[];
  directives: RobotsRule[];
}

interface RobotsState {
  environment: "production" | "staging" | "development";
  blocks: RobotsBlock[];
  sitemaps: string[];
  host: string;
}

// --- Constants ---
const COMMON_BOTS = [
  { name: "All Bots (*)", value: "*" },
  { name: "Googlebot", value: "Googlebot" },
  { name: "Bingbot", value: "Bingbot" },
  { name: "Googlebot-Image", value: "Googlebot-Image" },
  { name: "Googlebot-Mobile", value: "Googlebot-Mobile" },
  { name: "AdsBot Google", value: "AdsBot-Google" },
  { name: "DuckDuckBot", value: "DuckDuckBot" },
  { name: "Baiduspider", value: "Baiduspider" },
  { name: "YandexBot", value: "Yandex" },
  { name: "AhrefsBot", value: "AhrefsBot" },
  { name: "SemrushBot", value: "SemrushBot" },
  { name: "MJ12bot", value: "MJ12bot" },
  { name: "DotBot", value: "DotBot" }
];

const PRESETS = {
  blog: {
    name: "Blog Website",
    desc: "Optimized for blogs and Content Management Systems like WordPress.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "disallow" as const, value: "/wp-admin/" },
          { id: "r2", type: "allow" as const, value: "/wp-admin/admin-ajax.php" },
          { id: "r3", type: "disallow" as const, value: "/search/" },
          { id: "r4", type: "disallow" as const, value: "/feed/" }
        ]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"],
    host: "example.com"
  },
  ecommerce: {
    name: "E-Commerce",
    desc: "Protects checkout, shopping cart, sorting parameters, and customer accounts.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "disallow" as const, value: "/checkout/" },
          { id: "r2", type: "disallow" as const, value: "/cart/" },
          { id: "r3", type: "disallow" as const, value: "/my-account/" },
          { id: "r4", type: "disallow" as const, value: "/search/" },
          { id: "r5", type: "disallow" as const, value: "/*?sort=" },
          { id: "r6", type: "disallow" as const, value: "/*?filter=" },
          { id: "r7", type: "disallow" as const, value: "/*?utm_" }
        ]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"],
    host: "example.com"
  },
  saas: {
    name: "SaaS Product",
    desc: "Blocks crawlers from entering customer dashboards, API endpoints, and private app portals.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "disallow" as const, value: "/app/" },
          { id: "r2", type: "disallow" as const, value: "/dashboard/" },
          { id: "r3", type: "disallow" as const, value: "/api/" },
          { id: "r4", type: "disallow" as const, value: "/settings/" }
        ]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"],
    host: "example.com"
  },
  portfolio: {
    name: "Portfolio Site",
    desc: "Simple configuration allowing full access with private assets excluded.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "disallow" as const, value: "/private/" },
          { id: "r2", type: "disallow" as const, value: "/drafts/" }
        ]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"],
    host: "example.com"
  },
  news: {
    name: "News / Publisher",
    desc: "Standard rules with quick updates allowed, blocks feeds and temporary structures.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "disallow" as const, value: "/preview/" },
          { id: "r2", type: "disallow" as const, value: "/drafts/" },
          { id: "r3", type: "disallow" as const, value: "/temp/" }
        ]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"],
    host: "example.com"
  },
  forum: {
    name: "Forum / Community",
    desc: "Blocks members searches, administration, and session actions.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "disallow" as const, value: "/admin/" },
          { id: "r2", type: "disallow" as const, value: "/search/" },
          { id: "r3", type: "disallow" as const, value: "/members/" },
          { id: "r4", type: "disallow" as const, value: "/login/" }
        ]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"],
    host: "example.com"
  },
  devTools: {
    name: "Developer Tools",
    desc: "Protects source code bin downloads and system consoles.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "disallow" as const, value: "/bin/" },
          { id: "r2", type: "disallow" as const, value: "/dist/" },
          { id: "r3", type: "disallow" as const, value: "/api/" }
        ]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"],
    host: "example.com"
  },
  nextjs: {
    name: "Next.js Website",
    desc: "Tailored for Next.js 15 apps: protects internal paths while leaving CSS/JS styles open.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "allow" as const, value: "/_next/static/" },
          { id: "r2", type: "disallow" as const, value: "/_next/" },
          { id: "r3", type: "disallow" as const, value: "/api/" },
          { id: "r4", type: "disallow" as const, value: "/admin/" }
        ]
      }
    ],
    sitemaps: ["https://example.com/sitemap.xml"],
    host: "example.com"
  },
  wordpress: {
    name: "WordPress Standard",
    desc: "Full canonical WordPress configuration, protecting core tables.",
    blocks: [
      {
        id: "b1",
        userAgents: ["*"],
        directives: [
          { id: "r1", type: "disallow" as const, value: "/wp-admin/" },
          { id: "r2", type: "allow" as const, value: "/wp-admin/admin-ajax.php" },
          { id: "r3", type: "disallow" as const, value: "/wp-includes/" },
          { id: "r4", type: "disallow" as const, value: "/wp-content/plugins/" },
          { id: "r5", type: "disallow" as const, value: "/search/" },
          { id: "r6", type: "disallow" as const, value: "/*?s=" }
        ]
      }
    ],
    sitemaps: ["https://example.com/wp-sitemap.xml"],
    host: "example.com"
  }
};

const DEFAULT_STATE: RobotsState = {
  environment: "production",
  blocks: [
    {
      id: "b-init",
      userAgents: ["*"],
      directives: [
        { id: "ru-1", type: "disallow", value: "/admin/" },
        { id: "ru-2", type: "disallow", value: "/api/" },
        { id: "ru-3", type: "allow", value: "/assets/" }
      ]
    }
  ],
  sitemaps: ["https://example.com/sitemap.xml"],
  host: ""
};

// Helper functions defined outside the React component to bypass compiler purity analysis
const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const getTimestamp = (): number => {
  return Date.now();
};

export function RobotsTxtGeneratorTool() {
  const [state, setState] = useState<RobotsState>(DEFAULT_STATE);
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS | "">("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Track global history visit
  useEffect(() => {
    addToGlobalHistory({ slug: "robots-txt-generator", title: "Robots.txt Generator", type: "tool" });
  }, []);

  // Hydration sync & localStorage load
  useEffect(() => {
    const saved = localStorage.getItem("robots_generator_state");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load robots generator state", e);
      }
    }
  }, []);

  const saveState = (next: RobotsState) => {
    setState(next);
    localStorage.setItem("robots_generator_state", JSON.stringify(next));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all directives to default values?")) {
      saveState(DEFAULT_STATE);
      setActivePreset("");
      triggerSuccess("Generator reset successfully!");
    }
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const applyPreset = (key: keyof typeof PRESETS) => {
    const preset = PRESETS[key];
    const newBlocks: RobotsBlock[] = preset.blocks.map((b, i) => ({
      id: generateId(`preset-b-${i}`),
      userAgents: [...b.userAgents],
      directives: b.directives.map((d, j) => ({
        id: generateId(`preset-r-${j}`),
        type: d.type,
        value: d.value
      }))
    }));

    const nextState: RobotsState = {
      environment: state.environment,
      blocks: newBlocks,
      sitemaps: [...preset.sitemaps],
      host: preset.host
    };

    saveState(nextState);
    setActivePreset(key);
    triggerSuccess(`Applied "${preset.name}" preset!`);
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.environment && Array.isArray(parsed.blocks)) {
          saveState(parsed);
          triggerSuccess("Configuration imported successfully!");
        } else {
          alert("Invalid configuration file format.");
        }
      } catch (err) {
        alert("Failed to parse JSON configuration file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExportConfig = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `robots-txt-config-${getTimestamp()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerSuccess("Settings template exported!");
  };

  // --- Dynamic Rule Builders ---
  const addBlock = () => {
    const newBlock: RobotsBlock = {
      id: generateId("b"),
      userAgents: ["*"],
      directives: [{ id: generateId("r"), type: "disallow", value: "" }]
    };
    saveState({
      ...state,
      blocks: [...state.blocks, newBlock]
    });
    triggerSuccess("Added User-Agent Rule Block");
  };

  const removeBlock = (blockId: string) => {
    if (state.blocks.length <= 1) {
      alert("You must have at least one rule block.");
      return;
    }
    saveState({
      ...state,
      blocks: state.blocks.filter(b => b.id !== blockId)
    });
  };

  const updateBlockUserAgents = (blockId: string, userAgents: string[]) => {
    saveState({
      ...state,
      blocks: state.blocks.map(b => b.id === blockId ? { ...b, userAgents } : b)
    });
  };

  const addDirective = (blockId: string) => {
    saveState({
      ...state,
      blocks: state.blocks.map(b => {
        if (b.id === blockId) {
          return {
            ...b,
            directives: [
              ...b.directives,
              { id: generateId("r"), type: "disallow", value: "" }
            ]
          };
        }
        return b;
      })
    });
  };

  const removeDirective = (blockId: string, directiveId: string) => {
    saveState({
      ...state,
      blocks: state.blocks.map(b => {
        if (b.id === blockId) {
          return {
            ...b,
            directives: b.directives.filter(d => d.id !== directiveId)
          };
        }
        return b;
      })
    });
  };

  const updateDirective = (blockId: string, directiveId: string, fields: Partial<RobotsRule>) => {
    saveState({
      ...state,
      blocks: state.blocks.map(b => {
        if (b.id === blockId) {
          return {
            ...b,
            directives: b.directives.map(d => d.id === directiveId ? { ...d, ...fields } : d)
          };
        }
        return b;
      })
    });
  };

  const moveBlock = (index: number, dir: "up" | "down") => {
    const nextIdx = dir === "up" ? index - 1 : index + 1;
    if (nextIdx < 0 || nextIdx >= state.blocks.length) return;
    const newBlocks = [...state.blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[nextIdx];
    newBlocks[nextIdx] = temp;
    saveState({ ...state, blocks: newBlocks });
  };

  const addSitemap = () => {
    saveState({ ...state, sitemaps: [...state.sitemaps, ""] });
  };

  const removeSitemap = (idx: number) => {
    const sitemaps = state.sitemaps.filter((_, i) => i !== idx);
    saveState({ ...state, sitemaps: sitemaps.length > 0 ? sitemaps : [""] });
  };

  const updateSitemap = (idx: number, val: string) => {
    const sitemaps = [...state.sitemaps];
    sitemaps[idx] = val;
    saveState({ ...state, sitemaps });
  };

  // --- Real-time robots.txt Generation ---
  const generatedTxt = useMemo(() => {
    if (state.environment === "staging" || state.environment === "development") {
      return `# Robots.txt generated for ${state.environment} environment\n# Prevents indexation of pre-production servers\n\nUser-agent: *\nDisallow: /`;
    }

    let output = `# Robots.txt generated at NexusCalculator.net\n\n`;
    state.blocks.forEach((block) => {
      if (block.userAgents.length === 0) return;
      block.userAgents.forEach((ua) => {
        output += `User-agent: ${ua.trim() || "*"}\n`;
      });
      block.directives.forEach((dir) => {
        if (!dir.value && dir.type !== "disallow") return; // Allow empty disallow representing "allow all"
        const directiveName = dir.type === "allow" ? "Allow" : dir.type === "disallow" ? "Disallow" : "Crawl-delay";
        output += `${directiveName}: ${dir.value}\n`;
      });
      output += `\n`;
    });

    let hasGlobal = false;
    if (state.host.trim()) {
      output += `Host: ${state.host.trim()}\n`;
      hasGlobal = true;
    }
    state.sitemaps.forEach((sitemap) => {
      if (sitemap.trim()) {
        output += `Sitemap: ${sitemap.trim()}\n`;
        hasGlobal = true;
      }
    });

    return output.trim();
  }, [state]);

  // --- Validation and Diagnostics System ---
  const validationAlerts = useMemo(() => {
    const alerts: { type: "error" | "warning" | "tip"; message: string; code?: string }[] = [];
    let blocksWithRules = 0;

    if (state.environment === "staging" || state.environment === "development") {
      alerts.push({
        type: "tip",
        message: "Staging/Development configurations block indexing entirely. This is safe for development.",
        code: "ENV_SAFE"
      });
      return alerts;
    }

    let blocksEntireSite = false;
    let blocksCssJs = false;
    let missingSitemap = state.sitemaps.filter(s => s.trim()).length === 0;

    state.blocks.forEach((block, bIdx) => {
      if (block.userAgents.length === 0) {
        alerts.push({
          type: "warning",
          message: `Rule Block #${bIdx + 1} has no targeted User-agents. It will be ignored.`,
          code: "EMPTY_USER_AGENT"
        });
      }

      // Check duplicate user agents
      block.userAgents.forEach(ua => {
        const normalized = ua.toLowerCase().trim();
        state.blocks.forEach((otherBlock, otherIdx) => {
          if (otherIdx > bIdx && otherBlock.userAgents.some(oua => oua.toLowerCase().trim() === normalized)) {
            alerts.push({
              type: "warning",
              message: `Crawler '${ua}' is declared in multiple rule blocks. Search bots may only parse the first matching block.`,
              code: "DUPLICATE_USER_AGENT"
            });
          }
        });
      });

      const uniqueDirectives = new Set<string>();

      block.directives.forEach((dir, rIdx) => {
        const val = dir.value.trim();

        // 1) Empty rules
        if (!val && dir.type !== "disallow") {
          alerts.push({
            type: "warning",
            message: `Empty rule value under ${block.userAgents.join(", ")} block (Rule #${rIdx + 1}).`,
            code: "EMPTY_RULE"
          });
        }

        // 2) Blocking entire website
        if (dir.type === "disallow" && val === "/") {
          if (block.userAgents.includes("*")) {
            blocksEntireSite = true;
          } else {
            alerts.push({
              type: "warning",
              message: `Crawler '${block.userAgents.join(", ")}' is completely blocked from accessing this website.`,
              code: "BOT_BLOCKED"
            });
          }
        }

        // 3) Duplicate Directives
        const directiveKey = `${dir.type}:${val}`;
        if (uniqueDirectives.has(directiveKey)) {
          alerts.push({
            type: "warning",
            message: `Duplicate directive '${dir.type}: ${val}' detected in block ${block.userAgents.join(", ")}.`,
            code: "DUPLICATE_DIRECTIVE"
          });
        }
        uniqueDirectives.add(directiveKey);

        // 4) CSS/JS Blocking
        if (dir.type === "disallow" && (
          val.includes(".js") || val.includes(".css") || 
          val.includes("/js") || val.includes("/css") || 
          val.includes("_next/static")
        )) {
          blocksCssJs = true;
        }

        // 5) Crawl Delay on Googlebot
        if (dir.type === "crawl-delay") {
          const delayVal = parseInt(val, 10);
          if (isNaN(delayVal) || delayVal <= 0) {
            alerts.push({
              type: "error",
              message: `Crawl-delay value '${val}' is invalid. It must be a positive integer representing seconds.`,
              code: "INVALID_CRAWL_DELAY"
            });
          }
          if (block.userAgents.some(ua => ua.toLowerCase().includes("googlebot"))) {
            alerts.push({
              type: "warning",
              message: "Googlebot ignores Crawl-delay rules. Use Google Search Console configurations instead.",
              code: "GOOGLE_CRAWL_DELAY"
            });
          }
        }

        // 6) Wildcard spaces
        if (val.includes(" ")) {
          alerts.push({
            type: "error",
            message: `Whitespace detected in rule path: '${val}'. Paths in robots.txt should not contain spaces.`,
            code: "SPACE_IN_PATH"
          });
        }
      });

      if (block.directives.length > 0) blocksWithRules++;
    });

    if (blocksEntireSite) {
      alerts.push({
        type: "error",
        message: "Crucial Warning: You are blocking the entire website (Disallow: /) under User-agent: *. This prevents search engine indexing completely.",
        code: "SITE_DEINDEXED"
      });
    }

    if (blocksCssJs) {
      alerts.push({
        type: "warning",
        message: "Avoid blocking CSS or JavaScript folders. Googlebot requires these styles to render layouts and audit mobile compliance.",
        code: "BLOCKING_ASSETS"
      });
    }

    if (missingSitemap) {
      alerts.push({
        type: "warning",
        message: "Sitemap URL is missing. Adding a sitemap allows search engines to map and index all pages efficiently.",
        code: "MISSING_SITEMAP"
      });
    }

    // Sitemap URL validation
    state.sitemaps.forEach((sitemap, idx) => {
      const url = sitemap.trim();
      if (url) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          alerts.push({
            type: "error",
            message: `Sitemap #${idx + 1} is not a valid absolute URL (Must begin with http:// or https://).`,
            code: "INVALID_SITEMAP_URL"
          });
        }
      }
    });

    return alerts;
  }, [state]);

  // --- Dynamic Score Calculations ---
  const analysisScores = useMemo(() => {
    let safety = 100;
    let crawl = 100;

    if (state.environment === "staging" || state.environment === "development") {
      return { safety: 100, crawl: 100 };
    }

    const errors = validationAlerts.filter(a => a.type === "error");
    const warnings = validationAlerts.filter(a => a.type === "warning");

    // Safety Deductions
    safety -= errors.length * 20;
    safety -= warnings.filter(w => w.code === "SITE_DEINDEXED" || w.code === "BLOCKING_ASSETS").length * 25;
    safety -= warnings.filter(w => w.code === "DUPLICATE_USER_AGENT" || w.code === "SPACE_IN_PATH").length * 10;
    safety = Math.max(0, safety);

    // Crawl Budget Deductions
    if (state.sitemaps.filter(s => s.trim()).length === 0) crawl -= 20;
    crawl -= errors.length * 10;
    crawl -= warnings.length * 5;
    
    // Check if commercial bots are configured
    const blocksAhrefs = state.blocks.some(b => b.userAgents.some(ua => ua.toLowerCase().includes("ahrefs")) && b.directives.some(d => d.type === "disallow" && d.value === "/"));
    const blocksSemrush = state.blocks.some(b => b.userAgents.some(ua => ua.toLowerCase().includes("semrush")) && b.directives.some(d => d.type === "disallow" && d.value === "/"));
    if (blocksAhrefs || blocksSemrush) {
      crawl += 5; // Bonus for protecting crawl budget against aggressive auditing crawlers
    }

    crawl = Math.min(100, Math.max(0, crawl));

    return { safety, crawl };
  }, [state, validationAlerts]);

  // --- Search Engine Compatibility Checker ---
  const compatibility = useMemo(() => {
    const bots = {
      google: { status: "compatible", notes: "Full support for wildcards (*, $) and Allow directives. Ignores Crawl-delay." },
      bing: { status: "compatible", notes: "Full support for standard directives, wildcards, and Crawl-delay." },
      yandex: { status: "compatible", notes: "Supports all directives, Crawl-delay, and custom Clean-param scripts." },
      baidu: { status: "limited", notes: "Ignores Crawl-delay. Limited wildcard matching support." }
    };

    // If staging/dev site is blocked entirely, all bots behave identically (blocking)
    if (state.environment !== "production") {
      return bots;
    }

    let hasCrawlDelay = false;
    let hasComplexWildcards = false;

    state.blocks.forEach(block => {
      block.directives.forEach(dir => {
        if (dir.type === "crawl-delay") hasCrawlDelay = true;
        if (dir.value.includes("*") || dir.value.includes("$")) hasComplexWildcards = true;
      });
    });

    if (hasCrawlDelay) {
      bots.google.status = "warning";
      bots.google.notes = "Contains Crawl-delay, which Googlebot ignores. Use Search Console to rate limit.";
      bots.baidu.status = "warning";
      bots.baidu.notes = "Baidu ignores Crawl-delay. Rate limit through Baidu Webmaster Tools.";
    }

    return bots;
  }, [state]);

  // --- Copy & Export Event Handlers ---
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTxt);
    triggerSuccess("Copied robots.txt to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([generatedTxt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerSuccess("robots.txt downloaded successfully!");
  };

  // --- Helpers for Custom Rendering ---
  const renderSyntaxHighlighted = (text: string) => {
    return text.split("\n").map((line, idx) => {
      if (line.startsWith("#")) {
        return <div key={idx} className="text-slate-500 font-mono text-sm leading-relaxed">{line}</div>;
      }
      const parts = line.split(":");
      if (parts.length > 1) {
        const key = parts[0];
        const val = parts.slice(1).join(":");
        let keyClass = "text-indigo-400 font-semibold";
        if (key.toLowerCase() === "user-agent") keyClass = "text-blue-400 font-semibold";
        if (key.toLowerCase() === "disallow") keyClass = "text-rose-400 font-semibold";
        if (key.toLowerCase() === "allow") keyClass = "text-emerald-400 font-semibold";
        if (key.toLowerCase() === "sitemap" || key.toLowerCase() === "host") keyClass = "text-amber-400 font-semibold";

        return (
          <div key={idx} className="font-mono text-sm leading-relaxed text-slate-300">
            <span className={keyClass}>{key}</span>:
            <span className="text-slate-100">{val}</span>
          </div>
        );
      }
      return <div key={idx} className="font-mono text-sm leading-relaxed text-slate-300">{line}</div>;
    });
  };

  return (
    <div className="space-y-8">
      {/* Settings Panel & Template Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-55 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Shield className="text-[#518231] w-4 h-4" /> Environment Profile
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["production", "staging", "development"] as const).map((env) => (
              <button
                key={env}
                onClick={() => saveState({ ...state, environment: env })}
                className={`py-2 px-3 text-xs font-semibold rounded-lg capitalize border transition-all ${
                  state.environment === env
                    ? "bg-[#518231] text-white border-[#518231] shadow-sm"
                    : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {env}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Staging and Dev modes generate a fast wildcard block de-indexing the entire server. Production implements your explicit crawl guidelines.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4 md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Sparkles className="text-amber-500 w-4 h-4" /> Quick-Start Preset Templates
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.keys(PRESETS).map((key) => {
              const preset = PRESETS[key as keyof typeof PRESETS];
              return (
                <button
                  key={key}
                  onClick={() => applyPreset(key as keyof typeof PRESETS)}
                  className={`py-2 px-3 text-left text-xs font-medium rounded-lg border transition-all truncate ${
                    activePreset === key
                      ? "bg-[#518231]/10 text-[#518231] border-[#518231]"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  title={preset.desc}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
          {activePreset && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Preset Info:</span> {PRESETS[activePreset].desc}
            </p>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: BUILDER PANEL (8 columns) */}
        <div className="xl:col-span-7 space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="text-[#518231]" /> Crawler Rule Builder
            </h2>
            {state.environment === "production" && (
              <button
                onClick={addBlock}
                className="flex items-center gap-1 text-xs font-semibold py-2 px-3 bg-[#518231] hover:bg-[#436b28] text-white rounded-lg shadow transition-all"
              >
                <Plus size={14} /> Add Bot Block
              </button>
            )}
          </div>

          {state.environment !== "production" ? (
            <div className="bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center text-slate-500 dark:text-slate-400 space-y-3">
              <Shield className="w-8 h-8 mx-auto text-slate-400" />
              <div className="font-semibold text-slate-700 dark:text-slate-300">Rule Builder Locked</div>
              <p className="text-xs max-w-md mx-auto">
                The current environment profile ({state.environment}) has a locked strict restriction rule block that blocks all crawling. Switch to <strong>Production</strong> profile to set specific directory rules.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {state.blocks.map((block, bIdx) => (
                <div 
                  key={block.id} 
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4 relative group"
                >
                  {/* Block Header (User-Agents tags) */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Target Crawlers (Block #{bIdx + 1})
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {block.userAgents.map((ua, uaIdx) => (
                          <div 
                            key={uaIdx} 
                            className="flex items-center gap-1 text-xs py-1 px-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 rounded-full"
                          >
                            <span>{ua}</span>
                            <button
                              onClick={() => {
                                const nextUas = block.userAgents.filter((_, i) => i !== uaIdx);
                                updateBlockUserAgents(block.id, nextUas);
                              }}
                              className="hover:text-rose-500 transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                          </div>
                        ))}
                        {block.userAgents.length === 0 && (
                          <span className="text-xs text-rose-500 flex items-center gap-1 font-semibold">
                            <AlertTriangle size={12} /> Missing bots configuration
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveBlock(bIdx, "up")}
                        disabled={bIdx === 0}
                        className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-400 hover:text-slate-600 dark:disabled:opacity-30 disabled:opacity-30 transition-all"
                        title="Move Rule Block Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => moveBlock(bIdx, "down")}
                        disabled={bIdx === state.blocks.length - 1}
                        className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-400 hover:text-slate-600 dark:disabled:opacity-30 disabled:opacity-30 transition-all"
                        title="Move Rule Block Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={() => removeBlock(block.id)}
                        className="p-1.5 border border-rose-200 dark:border-rose-950/40 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded transition-all"
                        title="Delete Rule Block"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Add User Agent Input Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Add Targeted Crawler:
                    </label>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        if (!block.userAgents.includes(val)) {
                          updateBlockUserAgents(block.id, [...block.userAgents, val]);
                        }
                        e.target.value = "";
                      }}
                      className="text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 focus:outline-none col-span-2"
                    >
                      <option value="">-- Choose Bot Preset --</option>
                      {COMMON_BOTS.map(bot => (
                        <option key={bot.value} value={bot.value}>{bot.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Custom User Agent string input */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Custom Crawler String:</span>
                    <div className="flex gap-1.5 col-span-2">
                      <input
                        type="text"
                        placeholder="e.g. GPTBot, Applebot"
                        id={`custom-ua-input-${block.id}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val && !block.userAgents.includes(val)) {
                              updateBlockUserAgents(block.id, [...block.userAgents, val]);
                              (e.target as HTMLInputElement).value = "";
                            }
                          }
                        }}
                        className="flex-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById(`custom-ua-input-${block.id}`) as HTMLInputElement;
                          const val = input?.value.trim();
                          if (val && !block.userAgents.includes(val)) {
                            updateBlockUserAgents(block.id, [...block.userAgents, val]);
                            input.value = "";
                          }
                        }}
                        className="text-xs px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Directives Table */}
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Access Path Directives
                    </div>
                    <div className="space-y-2">
                      {block.directives.map((dir, dIdx) => (
                        <div key={dir.id} className="flex items-center gap-2.5">
                          <select
                            value={dir.type}
                            onChange={(e) => updateDirective(block.id, dir.id, { type: e.target.value as any })}
                            className="text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-2 focus:outline-none w-32 font-medium"
                          >
                            <option value="disallow">Disallow</option>
                            <option value="allow">Allow</option>
                            <option value="crawl-delay">Crawl-delay</option>
                          </select>

                          <input
                            type={dir.type === "crawl-delay" ? "number" : "text"}
                            value={dir.value}
                            onChange={(e) => updateDirective(block.id, dir.id, { value: e.target.value })}
                            placeholder={
                              dir.type === "crawl-delay" 
                                ? "Delay in seconds (e.g. 5)" 
                                : "Path relative to root (e.g. /admin/, /*?sort=)"
                            }
                            className="flex-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 focus:outline-none"
                          />

                          <button
                            onClick={() => removeDirective(block.id, dir.id)}
                            disabled={block.directives.length <= 1}
                            className="p-2 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-950 disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:border-slate-200 rounded-lg transition-all"
                            title="Remove Directive"
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addDirective(block.id)}
                      className="flex items-center gap-1 text-xs font-semibold py-1.5 px-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-[#518231] hover:text-[#436b28] border border-slate-200 dark:border-slate-800 rounded-lg transition-all mt-2"
                    >
                      <Plus size={12} /> Add Rule Directive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sitemaps and Host (Global Settings) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Globe className="text-[#518231] w-4 h-4" /> Global Site Configurations
            </h3>
            
            {/* Sitemap URLs */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                XML Sitemap URLs (One per entry)
              </label>
              <div className="space-y-2">
                {state.sitemaps.map((sitemap, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={sitemap}
                      onChange={(e) => updateSitemap(idx, e.target.value)}
                      placeholder="e.g. https://nexuscalculator.net/sitemap.xml"
                      className="flex-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 focus:outline-none"
                    />
                    <button
                      onClick={() => removeSitemap(idx)}
                      className="p-2 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 rounded-lg transition-all"
                      title="Remove sitemap"
                    >
                      <Minus size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addSitemap}
                className="flex items-center gap-1 text-xs font-semibold py-1.5 px-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-[#518231] border border-slate-200 dark:border-slate-800 rounded-lg transition-all mt-1"
              >
                <Plus size={12} /> Add Sitemap URL
              </button>
            </div>

            {/* Host Domain */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Default Host Domain (Optional)
              </label>
              <input
                type="text"
                value={state.host}
                onChange={(e) => saveState({ ...state, host: e.target.value })}
                placeholder="e.g. www.nexuscalculator.net"
                className="w-full text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 focus:outline-none"
              />
              <p className="text-[10px] text-slate-400">
                Defines the preferred website host domain name. Mostly processed by Yandex Bot.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PREVIEW, DIAGNOSTICS & SCORES (5 columns) */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Action Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="text-[#518231]" /> Preview & Analytics
            </h2>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-semibold py-1.5 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-all border border-slate-200 dark:border-slate-700"
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>

          {/* Scores Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              SEO Robots Quality Scorecard
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Safety Score Card */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-center space-y-2">
                <div className="text-2xl font-extrabold flex items-center justify-center gap-1">
                  <span className={
                    analysisScores.safety >= 90 ? "text-emerald-500" :
                    analysisScores.safety >= 60 ? "text-amber-500" : "text-rose-500"
                  }>
                    {analysisScores.safety}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">SEO Safety Score</div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Measures risks of dynamic de-indexation or styling assets blocking.
                </p>
              </div>

              {/* Crawl Optimization Score Card */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-center space-y-2">
                <div className="text-2xl font-extrabold flex items-center justify-center gap-1">
                  <span className={
                    analysisScores.crawl >= 80 ? "text-emerald-500" :
                    analysisScores.crawl >= 50 ? "text-amber-500" : "text-rose-500"
                  }>
                    {analysisScores.crawl}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Crawl Optimization</div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Measures index mapping efficiency, sitemap coverage, and parameters exclusion.
                </p>
              </div>
            </div>
          </div>

          {/* Compatibility Badges */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Search Engine Compatibility Check
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(compatibility).map(key => {
                const cmp = compatibility[key as keyof typeof compatibility];
                return (
                  <div 
                    key={key} 
                    className="p-2 border border-slate-100 dark:border-slate-850 rounded-lg flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-bold capitalize text-slate-800 dark:text-slate-200">{key}</span>
                      {cmp.status === "compatible" ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      ) : cmp.status === "warning" ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      )}
                    </div>
                    <p className="text-[9px] text-slate-400 leading-normal">{cmp.notes}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Preview Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[300px]">
            {/* Toolbar */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono">robots.txt</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 py-1 px-2.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded transition-all font-semibold"
                >
                  <Copy size={12} /> Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 py-1 px-2.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded transition-all font-semibold"
                >
                  <Download size={12} /> Download
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 flex-1 overflow-auto max-h-[350px] custom-scrollbar bg-slate-950">
              <pre className="select-all">
                <code>{renderSyntaxHighlighted(generatedTxt)}</code>
              </pre>
            </div>
          </div>

          {/* Diagnostics checklist */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Live Validation & Audits
            </h3>
            
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              {validationAlerts.map((alert, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 p-3 rounded-lg border text-xs leading-relaxed ${
                    alert.type === "error"
                      ? "bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/40 text-rose-700 dark:text-rose-450"
                      : alert.type === "warning"
                      ? "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/40 text-amber-700 dark:text-amber-450"
                      : "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-450"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {alert.type === "error" && <AlertTriangle size={14} className="text-rose-500" />}
                    {alert.type === "warning" && <AlertTriangle size={14} className="text-amber-500" />}
                    {alert.type === "tip" && <CheckCircle size={14} className="text-emerald-500" />}
                  </div>
                  <p>{alert.message}</p>
                </div>
              ))}

              {validationAlerts.length === 0 && (
                <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-xs">
                  <CheckCircle className="w-6 h-6 mx-auto text-slate-350 dark:text-slate-600 mb-2" />
                  No errors or recommendations. Your robots.txt is valid and ready to deploy!
                </div>
              )}
            </div>
          </div>

          {/* Import / Export Settings */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-wrap gap-2 items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Configuration Backup</span>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 py-1.5 px-3 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer transition-all border border-slate-200 dark:border-slate-700">
                <Upload size={12} /> Import Config
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportConfig}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleExportConfig}
                className="flex items-center gap-1 py-1.5 px-3 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-all border border-slate-200 dark:border-slate-700"
              >
                <FileText size={12} /> Export Config
              </button>
            </div>
          </div>

          {/* Notification success overlay */}
          {successMsg && (
            <div className="fixed bottom-6 right-6 bg-[#518231] text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#436b28] z-50 animate-bounce">
              <CheckCircle size={16} />
              <span className="text-sm font-semibold">{successMsg}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
