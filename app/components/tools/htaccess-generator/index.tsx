"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Copy, Download, Trash2, Plus, Minus, Info, RefreshCw, AlertTriangle, 
  CheckCircle, Settings, Globe, Shield, Sparkles, Layers, FileText, Check, 
  HelpCircle, Eye, Code, FileCode, CheckSquare, Server, AlertCircle, Play
} from "lucide-react";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Interfaces & Types ---
interface CustomRedirect {
  id: string;
  type: "301" | "302";
  from: string;
  to: string;
  isWildcard: boolean;
  isRegex: boolean;
}

interface HtaccessState {
  environment: "production" | "staging" | "development";
  apacheVersion: "2.4" | "2.2";
  
  // Rewrites
  forceHttps: boolean;
  forceWww: "none" | "www" | "non-www";
  trailingSlash: "none" | "add" | "remove";
  customRedirects: CustomRedirect[];
  
  // Security
  blockBadBots: boolean;
  disableDirectoryBrowsing: boolean;
  protectFiles: boolean;
  blockHotlinking: boolean;
  hotlinkWhitelist: string;
  preventScriptInjection: boolean;
  blockedIps: string;
  blockedUserAgents: string;

  // Caching & Performance
  browserCaching: boolean;
  gzipCompression: boolean;
  cacheControl: boolean;

  // Error Pages & Maintenance
  custom404: string;
  custom500: string;
  maintenanceMode: boolean;
  maintenanceIp: string;

  // Authentication
  basicAuth: boolean;
  authName: string;
  authUserFile: string;
  authPath: string;
}

const PRESETS = {
  nextjs: {
    name: "Next.js Static Export",
    desc: "Optimized fallback client router configurations for static Next.js 15 builds.",
    state: {
      forceHttps: true,
      forceWww: "none",
      trailingSlash: "none",
      blockBadBots: true,
      disableDirectoryBrowsing: true,
      protectFiles: true,
      blockHotlinking: false,
      preventScriptInjection: true,
      browserCaching: true,
      gzipCompression: true,
      cacheControl: true,
      custom404: "/404.html",
      custom500: "",
      maintenanceMode: false,
      basicAuth: false
    }
  },
  wordpress: {
    name: "WordPress Standard",
    desc: "Standard canonical rewrite directives protecting core database files.",
    state: {
      forceHttps: true,
      forceWww: "www",
      trailingSlash: "none",
      blockBadBots: true,
      disableDirectoryBrowsing: true,
      protectFiles: true,
      blockHotlinking: true,
      preventScriptInjection: true,
      browserCaching: true,
      gzipCompression: true,
      cacheControl: true,
      custom404: "",
      custom500: "",
      maintenanceMode: false,
      basicAuth: false
    }
  },
  ecommerce: {
    name: "E-Commerce Hardened",
    desc: "High caching limits, HTTPS enforcements, and script injection filters.",
    state: {
      forceHttps: true,
      forceWww: "www",
      trailingSlash: "add",
      blockBadBots: true,
      disableDirectoryBrowsing: true,
      protectFiles: true,
      blockHotlinking: true,
      preventScriptInjection: true,
      browserCaching: true,
      gzipCompression: true,
      cacheControl: true,
      custom404: "/404.html",
      custom500: "/500.html",
      maintenanceMode: false,
      basicAuth: false
    }
  },
  saas: {
    name: "SaaS Application Portal",
    desc: "Restricts directory lists, disables caches for API paths, and blocks rogue user-agents.",
    state: {
      forceHttps: true,
      forceWww: "none",
      trailingSlash: "none",
      blockBadBots: true,
      disableDirectoryBrowsing: true,
      protectFiles: true,
      blockHotlinking: false,
      preventScriptInjection: true,
      browserCaching: false,
      gzipCompression: true,
      cacheControl: true,
      custom404: "/error",
      custom500: "/error-500",
      maintenanceMode: false,
      basicAuth: false
    }
  },
  portfolio: {
    name: "Static Portfolio / Resume",
    desc: "Clean setup prioritizing long browser expiration parameters for fast repeat visits.",
    state: {
      forceHttps: true,
      forceWww: "none",
      trailingSlash: "none",
      blockBadBots: false,
      disableDirectoryBrowsing: true,
      protectFiles: true,
      blockHotlinking: false,
      preventScriptInjection: false,
      browserCaching: true,
      gzipCompression: true,
      cacheControl: false,
      custom404: "/404.html",
      custom500: "",
      maintenanceMode: false,
      basicAuth: false
    }
  },
  devTools: {
    name: "Developer Tools Platform",
    desc: "Protects sensitive code binaries and forces extreme static assets compression.",
    state: {
      forceHttps: true,
      forceWww: "none",
      trailingSlash: "none",
      blockBadBots: true,
      disableDirectoryBrowsing: true,
      protectFiles: true,
      blockHotlinking: true,
      preventScriptInjection: true,
      browserCaching: true,
      gzipCompression: true,
      cacheControl: true,
      custom404: "/404",
      custom500: "/500",
      maintenanceMode: false,
      basicAuth: false
    }
  }
} as const;

const DEFAULT_STATE: HtaccessState = {
  environment: "production",
  apacheVersion: "2.4",
  
  // Rewrites
  forceHttps: true,
  forceWww: "none",
  trailingSlash: "none",
  customRedirects: [
    { id: "r-init-1", type: "301", from: "/old-about", to: "/about", isWildcard: false, isRegex: false }
  ],

  // Security
  blockBadBots: true,
  disableDirectoryBrowsing: true,
  protectFiles: true,
  blockHotlinking: false,
  hotlinkWhitelist: "yourdomain.com",
  preventScriptInjection: true,
  blockedIps: "",
  blockedUserAgents: "",

  // Caching
  browserCaching: true,
  gzipCompression: true,
  cacheControl: true,

  // Error Pages
  custom404: "/404.html",
  custom500: "",
  maintenanceMode: false,
  maintenanceIp: "",

  // Auth
  basicAuth: false,
  authName: "Restricted Admin Area",
  authUserFile: "/home/user/.htpasswd",
  authPath: "/admin"
};

const generateId = (prefix: string = "rule"): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function HtaccessGeneratorTool() {
  const [state, setState] = useState<HtaccessState>(DEFAULT_STATE);
  const [activeTab, setActiveTab] = useState<"rewrites" | "security" | "caching" | "errors" | "auth">("rewrites");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Custom Redirect inline form states
  const [redirType, setRedirType] = useState<"301" | "302">("301");
  const [redirFrom, setRedirFrom] = useState<string>("");
  const [redirTo, setRedirTo] = useState<string>("");
  const [redirWild, setRedirWild] = useState<boolean>(false);
  const [redirRegex, setRedirRegex] = useState<boolean>(false);

  // Sync to global history on mount
  useEffect(() => {
    addToGlobalHistory({ slug: "htaccess-generator", title: ".htaccess Generator", type: "tool" });
  }, []);

  // Sync / Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("htaccess_generator_state");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load htaccess generator state", e);
      }
    }
  }, []);

  const persist = (next: HtaccessState) => {
    setState(next);
    localStorage.setItem("htaccess_generator_state", JSON.stringify(next));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset configuration to defaults?")) {
      persist(DEFAULT_STATE);
      triggerSuccess("Configuration reset to defaults.");
    }
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const applyPreset = (key: keyof typeof PRESETS) => {
    const preset = PRESETS[key];
    const updated: HtaccessState = {
      ...state,
      ...preset.state
    };
    persist(updated);
    triggerSuccess(`Preset "${preset.name}" applied successfully!`);
  };

  // Add custom redirect
  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redirFrom.trim() || !redirTo.trim()) return;

    const newRedir: CustomRedirect = {
      id: generateId("redir"),
      type: redirType,
      from: redirFrom.trim(),
      to: redirTo.trim(),
      isWildcard: redirWild,
      isRegex: redirRegex
    };

    const updated = {
      ...state,
      customRedirects: [...state.customRedirects, newRedir]
    };
    persist(updated);

    setRedirFrom("");
    setRedirTo("");
    setRedirWild(false);
    setRedirRegex(false);
    triggerSuccess("Redirect rule added.");
  };

  const handleDeleteRedirect = (id: string) => {
    const updated = {
      ...state,
      customRedirects: state.customRedirects.filter(r => r.id !== id)
    };
    persist(updated);
  };

  // State mutators helper
  const updateField = <K extends keyof HtaccessState>(field: K, value: HtaccessState[K]) => {
    const updated = {
      ...state,
      [field]: value
    };
    persist(updated);
  };

  // --- Compile engine ---
  const { generatedHtaccess, explanations } = useMemo(() => {
    let ht = "";
    const expls: { line: string; desc: string }[] = [];

    const append = (block: string, desc: string, linesCount: number) => {
      ht += block + "\n\n";
      const lines = block.split("\n");
      lines.forEach(l => {
        if (l.trim()) {
          expls.push({ line: l, desc });
        }
      });
    };

    // Header info
    let header = `# ----------------------------------------------------------------------\n`;
    header += `# | Apache .htaccess Configuration\n`;
    header += `# | Generated by NexusCalculator.net .htaccess Builder\n`;
    header += `# | Environment: ${state.environment.toUpperCase()} | Server Compatibility: Apache ${state.apacheVersion}\n`;
    header += `# ----------------------------------------------------------------------`;
    append(header, "Header information with environment and compatibility notes.", 5);

    // RewriteEngine base
    const hasRewrites = state.forceHttps || state.forceWww !== "none" || state.trailingSlash !== "none" || state.customRedirects.length > 0 || state.maintenanceMode;
    if (hasRewrites) {
      let rew = `RewriteEngine On`;
      if (state.environment === "development") {
        rew += `\n# Development base path\nRewriteBase /`;
      }
      append(rew, "Enables the Apache mod_rewrite module for URL rewriting and redirection.", 2);
    }

    // Force HTTPS
    if (state.forceHttps) {
      let httpsBlock = `RewriteCond %{HTTPS} off\n`;
      httpsBlock += `RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
      append(httpsBlock, "Redirects all insecure HTTP requests to secure HTTPS.", 2);
    }

    // Force WWW / Non-WWW
    if (state.forceWww === "www") {
      let wwwBlock = `RewriteCond %{HTTP_HOST} !^www\\. [NC]\n`;
      wwwBlock += `RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
      append(wwwBlock, "Forces URLs to use the 'www' prefix for canonicalization.", 2);
    } else if (state.forceWww === "non-www") {
      let nonWwwBlock = `RewriteCond %{HTTP_HOST} ^www\\.(.+) [NC]\n`;
      nonWwwBlock += `RewriteRule ^(.*)$ https://%1%{REQUEST_URI} [L,R=301]`;
      append(nonWwwBlock, "Forces URLs to exclude the 'www' prefix for canonicalization.", 2);
    }

    // Trailing slash enforcements
    if (state.trailingSlash === "add") {
      let slashBlock = `RewriteCond %{REQUEST_FILENAME} !-f\n`;
      slashBlock += `RewriteCond %{REQUEST_URI} !(.*)/$\n`;
      slashBlock += `RewriteRule ^(.*)$ $1/ [L,R=301]`;
      append(slashBlock, "Appends a trailing slash to folder-style paths to prevent duplicate content indexing.", 3);
    } else if (state.trailingSlash === "remove") {
      let slashBlock = `RewriteCond %{REQUEST_FILENAME} !-d\n`;
      slashBlock += `RewriteCond %{REQUEST_URI} ^(.+)/$\n`;
      slashBlock += `RewriteRule ^(.*)/$ /$1 [L,R=301]`;
      append(slashBlock, "Removes the trailing slash from request paths to keep them clean and unified.", 3);
    }

    // Maintenance Mode
    if (state.maintenanceMode) {
      let maint = `# Enable maintenance overlay\n`;
      maint += `RewriteCond %{REQUEST_URI} !/maintenance\\.html$\n`;
      if (state.maintenanceIp.trim()) {
        const ips = state.maintenanceIp.split(",").map(i => i.trim()).filter(Boolean);
        ips.forEach(ip => {
          maint += `RewriteCond %{REMOTE_ADDR} !^${ip.replace(/\./g, "\\.")}$\n`;
        });
      }
      maint += `RewriteRule ^(.*)$ /maintenance.html [R=503,L]`;
      append(maint, "Redirects all traffic to a maintenance page except for Whitelisted IP addresses.", 4);
    }

    // Custom Redirects
    if (state.customRedirects.length > 0) {
      let customBlock = `# Custom Redirect Rules\n`;
      state.customRedirects.forEach(r => {
        const flag = r.type === "301" ? "R=301,L" : "R=302,L";
        if (r.isRegex) {
          customBlock += `RewriteRule ${r.from} ${r.to} [${flag}]\n`;
        } else if (r.isWildcard) {
          customBlock += `RedirectMatch ${r.type} ${r.from} ${r.to}\n`;
        } else {
          customBlock += `Redirect ${r.type} ${r.from} ${r.to}\n`;
        }
      });
      append(customBlock.trim(), "Redirects specific paths dynamically or statically to new destination endpoints.", state.customRedirects.length);
    }

    // Security Rules
    if (state.disableDirectoryBrowsing) {
      append(`Options -Indexes`, "Disables folder listing, preventing visitors from seeing files in a directory that has no index page.", 1);
    }

    if (state.protectFiles) {
      let protect = `<FilesMatch "^\\.(htaccess|htpasswd|env|git|ini)$">\n`;
      if (state.apacheVersion === "2.4") {
        protect += `  Require all denied\n`;
      } else {
        protect += `  Order Allow,Deny\n  Deny from all\n`;
      }
      protect += `</FilesMatch>`;
      append(protect, "Denies access to sensitive server and local repository configurations.", 4);
    }

    if (state.blockHotlinking) {
      let wlPattern = "";
      if (state.hotlinkWhitelist.trim()) {
        wlPattern = state.hotlinkWhitelist.split(",")
          .map(d => d.trim().replace(/\./g, "\\."))
          .map(d => `RewriteCond %{HTTP_REFERER} !^https://(www\\.)?${d} [NC]\n`)
          .join("");
      }
      let hotlink = `RewriteCond %{HTTP_REFERER} !^$\n`;
      hotlink += wlPattern;
      hotlink += `RewriteRule \\.(jpg|jpeg|png|gif|svg|webp|ico)$ - [F,NC,L]`;
      append(hotlink, "Stops third-party sites from framing or linking your image resources directly, saving bandwidth.", 3);
    }

    if (state.preventScriptInjection) {
      let xss = `RewriteCond %{QUERY_STRING} (<|%3C).*script.*(>|%3E) [NC,OR]\n`;
      xss += `RewriteCond %{QUERY_STRING} GLOBALS(=|\\[|\\%) [OR]\n`;
      xss += `RewriteCond %{QUERY_STRING} _REQUEST(=|\\[|\\%) [NC]\n`;
      xss += `RewriteRule ^(.*)$ - [F,L]`;
      append(xss, "Filters out URL query string requests trying to inject Javascript, cookies, or database payloads.", 4);
    }

    // Blocked IPs
    if (state.blockedIps.trim()) {
      const ips = state.blockedIps.split(/[\n,]+/).map(i => i.trim()).filter(Boolean);
      if (ips.length > 0) {
        let ipBlock = "";
        if (state.apacheVersion === "2.4") {
          ipBlock += `<RequireAll>\n  Require all granted\n`;
          ips.forEach(ip => {
            ipBlock += `  Require not ip ${ip}\n`;
          });
          ipBlock += `</RequireAll>`;
        } else {
          ipBlock += `Order Allow,Deny\nAllow from all\n`;
          ips.forEach(ip => {
            ipBlock += `Deny from ${ip}\n`;
          });
        }
        append(ipBlock, "Explicitly restricts traffic coming from specific abusive blacklisted IP coordinates.", ips.length);
      }
    }

    // Blocked User Agents / Bad Bots
    let botsToBlock: string[] = [];
    if (state.blockBadBots) {
      botsToBlock = ["AhrefsBot", "SemrushBot", "DotBot", "MJ12bot", "Rogerbot", "Baiduspider", "YandexBot"];
    }
    if (state.blockedUserAgents.trim()) {
      const customBots = state.blockedUserAgents.split(/[\n,]+/).map(b => b.trim()).filter(Boolean);
      botsToBlock = [...botsToBlock, ...customBots];
    }
    if (botsToBlock.length > 0) {
      let botRules = "";
      botsToBlock.forEach((bot, idx) => {
        const flag = idx === botsToBlock.length - 1 ? "[NC,F,L]" : "[NC,OR]";
        botRules += `RewriteCond %{HTTP_USER_AGENT} ^.*${bot.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}.* [NC,OR]\n`;
      });
      // Clean last [NC,OR]
      botRules = botRules.replace(/\[NC,OR\]\n$/, "[NC,F,L]");
      botRules = `# Block Bad Crawlers\n` + botRules;
      append(botRules, "Blocks scanning requests originating from malicious scraping software or automated SEO audits.", botsToBlock.length);
    }

    // Caching Expires rules
    if (state.browserCaching) {
      let cache = `<IfModule mod_expires.c>\n`;
      cache += `  ExpiresActive On\n`;
      cache += `  ExpiresDefault "access plus 1 month"\n`;
      cache += `  ExpiresByType text/css "access plus 1 year"\n`;
      cache += `  ExpiresByType text/javascript "access plus 1 year"\n`;
      cache += `  ExpiresByType application/javascript "access plus 1 year"\n`;
      cache += `  ExpiresByType image/jpg "access plus 1 year"\n`;
      cache += `  ExpiresByType image/jpeg "access plus 1 year"\n`;
      cache += `  ExpiresByType image/png "access plus 1 year"\n`;
      cache += `  ExpiresByType image/gif "access plus 1 year"\n`;
      cache += `  ExpiresByType image/svg+xml "access plus 1 year"\n`;
      cache += `  ExpiresByType image/webp "access plus 1 year"\n`;
      cache += `  ExpiresByType image/x-icon "access plus 1 year"\n`;
      cache += `</IfModule>`;
      append(cache, "Configures standard mod_expires static caching intervals to reduce server hits for returning assets.", 13);
    }

    // Gzip mod_deflate
    if (state.gzipCompression) {
      let zip = `<IfModule mod_deflate.c>\n`;
      zip += `  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript\n`;
      zip += `  AddOutputFilterByType DEFLATE application/javascript application/x-javascript\n`;
      zip += `  AddOutputFilterByType DEFLATE application/xml application/xhtml+xml application/rss+xml\n`;
      zip += `  AddOutputFilterByType DEFLATE image/svg+xml application/vnd.ms-fontobject font/ttf font/opentype\n`;
      zip += `</IfModule>`;
      append(zip, "Enables mod_deflate Gzip processing parameters to compress text outputs before network sends.", 5);
    }

    // Cache-Control headers override
    if (state.cacheControl) {
      let cc = `<IfModule mod_headers.c>\n`;
      cc += `  <FilesMatch "\\\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf|webp)$">\n`;
      cc += `    Header set Cache-Control "max-age=31536000, public, no-transform"\n`;
      cc += `  </FilesMatch>\n`;
      cc += `  <FilesMatch "\\\.(html|htm|xml|json)$">\n`;
      cc += `    Header set Cache-Control "max-age=0, private, must-revalidate"\n`;
      cc += `  </FilesMatch>\n`;
      cc += `</IfModule>`;
      append(cc, "Enforces strict cache-control values to keep dynamic pages fresh and assets cached on disk.", 7);
    }

    // Custom Error Pages
    let errors = "";
    if (state.custom404.trim()) {
      errors += `ErrorDocument 404 ${state.custom404.trim()}\n`;
    }
    if (state.custom500.trim()) {
      errors += `ErrorDocument 500 ${state.custom500.trim()}\n`;
    }
    if (errors) {
      append(errors.trim(), "Registers localized files (e.g. 404.html) to render custom graphics upon client error events.", errors.split("\n").length - 1);
    }

    // Password Protection
    if (state.basicAuth && state.authPath.trim()) {
      let auth = `<Directory "${state.authPath.trim()}">\n`;
      auth += `  AuthType Basic\n`;
      auth += `  AuthName "${state.authName}"\n`;
      auth += `  AuthUserFile "${state.authUserFile}"\n`;
      auth += `  Require valid-user\n`;
      auth += `</Directory>`;
      append(auth, "Creates a Basic Login Prompt restricting folder access using an external htpasswd credential database.", 6);
    }

    return {
      generatedHtaccess: ht.trim(),
      explanations: expls
    };
  }, [state]);

  // Real-time scores and warnings auditor
  const { scores, warnings, suggestions } = useMemo(() => {
    let security = 40;
    let seo = 50;
    let performance = 40;
    const warns: string[] = [];
    const suggs: string[] = [];

    // Analyze Rewrites & Protocol
    if (state.forceHttps) {
      security += 20;
      seo += 15;
    } else {
      suggs.push("Enable HTTPS redirection to secure your traffic and boost search rankings.");
    }

    if (state.forceWww !== "none") {
      seo += 15;
    } else {
      suggs.push("Force a WWW or non-WWW host protocol to avoid dual-indexing duplication issues.");
    }

    if (state.trailingSlash !== "none") {
      seo += 10;
    }

    // Check loops
    // (Note: forceWww is an enum so it cannot conflict directly with itself)

    // Analyze Security
    if (state.disableDirectoryBrowsing) security += 10;
    else suggs.push("Disable directory browsing (Indexes) to prevent public file structure mapping.");

    if (state.protectFiles) security += 10;
    else suggs.push("Protect configuration files (.env, .git) from manual browser exploits.");

    if (state.preventScriptInjection) security += 10;
    if (state.blockBadBots) security += 5;
    if (state.blockedIps.trim()) security += 5;

    // Analyze Performance
    if (state.browserCaching) performance += 25;
    else suggs.push("Enable Expires browser caching headers to reduce bandwidth and speed up page paints.");

    if (state.gzipCompression) performance += 25;
    else suggs.push("Enable Gzip compression (mod_deflate) to compress documents over the wire.");

    if (state.cacheControl) performance += 10;

    // Warnings
    if (state.forceHttps && state.maintenanceMode && !state.maintenanceIp.trim()) {
      warns.push("Maintenance Mode is active without an IP whitelist. You will lock yourself out from viewing your local tests.");
    }

    // Wildcard conflicts
    state.customRedirects.forEach(r => {
      if (r.from === r.to) {
        warns.push(`Redirect Loop Warning: Path "${r.from}" redirects to itself.`);
      }
      if (r.from === "/" && r.type === "301") {
        warns.push("Dangerous redirection: Creating a 301 redirect from the root path '/' can break your homepage accessibility.");
      }
    });

    if (state.basicAuth && !state.authUserFile.trim()) {
      warns.push("Authentication error: AuthUserFile path is blank. You must define an absolute path pointing to your .htpasswd file.");
    }

    return {
      scores: {
        security: Math.min(100, security),
        seo: Math.min(100, seo),
        performance: Math.min(100, performance)
      },
      warnings: warns,
      suggestions: suggs
    };
  }, [state]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtaccess);
    triggerSuccess("Copied .htaccess code to clipboard!");
  };

  const handleDownload = (ext: "htaccess" | "txt") => {
    const blob = new Blob([generatedHtaccess], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ext === "htaccess" ? ".htaccess" : "htaccess-config.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerSuccess(`Downloaded as ${a.download}`);
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Toast notifications */}
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl border border-emerald-500 animate-bounce">
          <CheckCircle size={20} className="shrink-0" />
          <span className="font-semibold text-sm">{successMsg}</span>
        </div>
      )}

      {/* Preset segment header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Server size={12} className="text-[#518231]" /> Apache Version Compatibility
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-200/50 dark:bg-slate-900/50 p-1 rounded-lg">
            <button
              onClick={() => updateField("apacheVersion", "2.4")}
              className={`py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
                state.apacheVersion === "2.4"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Apache 2.4 (Modern)
            </button>
            <button
              onClick={() => updateField("apacheVersion", "2.2")}
              className={`py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
                state.apacheVersion === "2.2"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Apache 2.2 (Legacy)
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Layers size={12} className="text-[#518231]" /> Target Environment
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-200/50 dark:bg-slate-900/50 p-1 rounded-lg">
            {(["production", "staging", "development"] as const).map(env => (
              <button
                key={env}
                onClick={() => updateField("environment", env)}
                className={`py-1.5 px-2 text-[10px] font-bold uppercase rounded-md transition-all ${
                  state.environment === env
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {env}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-5">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-all flex items-center gap-1.5"
          >
            <RefreshCw size={12} /> Reset Config
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Settings Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick-Start presets slider */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500 animate-pulse" /> Architecture Optimization Presets
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(PRESETS).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key as any)}
                  className="p-3 text-left border border-slate-100 hover:border-[#518231]/30 hover:bg-[#518231]/5 dark:border-slate-800 dark:hover:border-[#518231]/40 rounded-xl transition-all group"
                >
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#518231] transition-colors">{item.name}</div>
                  <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 leading-normal line-clamp-2">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Form card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Tabs head */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 overflow-x-auto">
              {[
                { id: "rewrites", label: "Redirects & Rules" },
                { id: "security", label: "Security Locks" },
                { id: "caching", label: "Cache & Speeds" },
                { id: "errors", label: "Error Pages" },
                { id: "auth", label: "Authentication" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "border-[#518231] text-[#518231] bg-white dark:bg-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="p-6 space-y-6">
              
              {/* REWRITES TAB */}
              {activeTab === "rewrites" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Force HTTPS</label>
                        <span className="text-[10px] text-slate-400 block">Redirect http:// to https://</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={state.forceHttps}
                        onChange={(e) => updateField("forceHttps", e.target.checked)}
                        className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">WWW Host Canonicalization</label>
                      <select
                        value={state.forceWww}
                        onChange={(e) => updateField("forceWww", e.target.value as any)}
                        className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
                      >
                        <option value="none">No Preference (Leave untouched)</option>
                        <option value="www">Force WWW prefix</option>
                        <option value="non-www">Remove WWW prefix</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Trailing Slash Redirects</label>
                      <select
                        value={state.trailingSlash}
                        onChange={(e) => updateField("trailingSlash", e.target.value as any)}
                        className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
                      >
                        <option value="none">No Preference</option>
                        <option value="add">Force add trailing slash (e.g. /about/)</option>
                        <option value="remove">Force remove trailing slash (e.g. /about)</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Custom 301/302 URL Paths Redirections</h4>
                    
                    <form onSubmit={handleAddRedirect} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-slate-50 dark:bg-slate-800/20 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Redirect Type</label>
                        <select
                          value={redirType}
                          onChange={(e) => setRedirType(e.target.value as any)}
                          className="w-full text-xs py-1.5 px-2 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                        >
                          <option value="301">301 (Perm)</option>
                          <option value="302">302 (Temp)</option>
                        </select>
                      </div>

                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">From Path / Route</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. /old-blog"
                          value={redirFrom}
                          onChange={(e) => setRedirFrom(e.target.value)}
                          className="w-full text-xs py-1.5 px-2 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">To Destination URL</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. /blog or absolute"
                          value={redirTo}
                          onChange={(e) => setRedirTo(e.target.value)}
                          className="w-full text-xs py-1.5 px-2 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="md:col-span-2 py-1.5 bg-[#518231] hover:bg-[#436e28] text-white text-xs font-bold rounded shadow-sm flex items-center justify-center gap-1"
                      >
                        <Plus size={12} /> Add Rule
                      </button>

                      <div className="md:col-span-12 flex gap-4 text-[10px] text-slate-500 font-semibold pt-1">
                        <label className="flex items-center gap-1.5">
                          <input
                            type="checkbox"
                            checked={redirWild}
                            onChange={(e) => setRedirWild(e.target.checked)}
                            className="rounded text-[#518231] focus:ring-[#518231] w-3 h-3"
                          />
                          Use Wildcard matching (RedirectMatch)
                        </label>
                        <label className="flex items-center gap-1.5">
                          <input
                            type="checkbox"
                            checked={redirRegex}
                            onChange={(e) => setRedirRegex(e.target.checked)}
                            className="rounded text-[#518231] focus:ring-[#518231] w-3 h-3"
                          />
                          Regular Expression Rule
                        </label>
                      </div>
                    </form>

                    {/* Custom redirect list */}
                    {state.customRedirects.length > 0 && (
                      <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              <th className="py-2 px-3">Type</th>
                              <th className="py-2 px-3">From Path</th>
                              <th className="py-2 px-3">To Destination</th>
                              <th className="py-2 px-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                            {state.customRedirects.map(r => (
                              <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                                <td className="py-2.5 px-3">
                                  <span className={`px-1 rounded font-bold text-[9px] ${r.type === "301" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>
                                    {r.type}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 truncate max-w-[120px]" title={r.from}>{r.from}</td>
                                <td className="py-2.5 px-3 truncate max-w-[150px]" title={r.to}>{r.to}</td>
                                <td className="py-2.5 px-3 text-right">
                                  <button
                                    onClick={() => handleDeleteRedirect(r.id)}
                                    className="p-1 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Block Bad Bots</label>
                        <span className="text-[10px] text-slate-400 block">Restrict common crawling tools (Ahrefs, Semrush, etc.)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={state.blockBadBots}
                        onChange={(e) => updateField("blockBadBots", e.target.checked)}
                        className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Disable Directory Listings</label>
                        <span className="text-[10px] text-slate-400 block">Prevents directory browsing (Indexes)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={state.disableDirectoryBrowsing}
                        onChange={(e) => updateField("disableDirectoryBrowsing", e.target.checked)}
                        className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Protect System Files</label>
                        <span className="text-[10px] text-slate-400 block">Deny public reads of .htaccess, .env, etc.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={state.protectFiles}
                        onChange={(e) => updateField("protectFiles", e.target.checked)}
                        className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Prevent Script Injection</label>
                        <span className="text-[10px] text-slate-400 block">Shield against basic query injection exploits</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={state.preventScriptInjection}
                        onChange={(e) => updateField("preventScriptInjection", e.target.checked)}
                        className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col p-4 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Block Hotlinking</label>
                          <span className="text-[10px] text-slate-400 block">Block sites using your image host resources</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={state.blockHotlinking}
                          onChange={(e) => updateField("blockHotlinking", e.target.checked)}
                          className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                        />
                      </div>
                      {state.blockHotlinking && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 block">Allowed Whitelist Domains (Comma separated)</label>
                          <input
                            type="text"
                            value={state.hotlinkWhitelist}
                            onChange={(e) => updateField("hotlinkWhitelist", e.target.value)}
                            placeholder="yourdomain.com, partner.com"
                            className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Block IP Addresses</label>
                        <span className="text-[10px] text-slate-400 block">One IP address per line or comma-separated</span>
                        <textarea
                          rows={3}
                          value={state.blockedIps}
                          onChange={(e) => updateField("blockedIps", e.target.value)}
                          placeholder="e.g.&#10;192.168.1.1&#10;203.0.113.50"
                          className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#518231]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Block Custom User Agents</label>
                    <span className="text-[10px] text-slate-400 block">Identify crawler strings or browser engines you wish to restrict (comma-separated).</span>
                    <input
                      type="text"
                      value={state.blockedUserAgents}
                      onChange={(e) => updateField("blockedUserAgents", e.target.value)}
                      placeholder="e.g. Scrapy, HTTrack, wget"
                      className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
                    />
                  </div>
                </div>
              )}

              {/* CACHING TAB */}
              {activeTab === "caching" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Browser Expires Caching</label>
                        <input
                          type="checkbox"
                          checked={state.browserCaching}
                          onChange={(e) => updateField("browserCaching", e.target.checked)}
                          className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block leading-relaxed">Applies mod_expires durations to stylesheets, scripts, and static media, allowing faster loading on repeat visits.</span>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Gzip mod_deflate Compression</label>
                        <input
                          type="checkbox"
                          checked={state.gzipCompression}
                          onChange={(e) => updateField("gzipCompression", e.target.checked)}
                          className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block leading-relaxed">Compresses web files (HTML, JS, CSS) automatically before shipping them to user browsers, optimizing speed scores.</span>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Cache-Control Overrides</label>
                        <input
                          type="checkbox"
                          checked={state.cacheControl}
                          onChange={(e) => updateField("cacheControl", e.target.checked)}
                          className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block leading-relaxed">Adds Cache-Control values to responses to prevent caching dynamic files while maintaining persistent assets.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ERROR PAGES TAB */}
              {activeTab === "errors" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Custom 404 (Not Found) Path</label>
                      <input
                        type="text"
                        value={state.custom404}
                        onChange={(e) => updateField("custom404", e.target.value)}
                        placeholder="e.g. /404.html"
                        className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Custom 500 (Internal Error) Path</label>
                      <input
                        type="text"
                        value={state.custom500}
                        onChange={(e) => updateField("custom500", e.target.value)}
                        placeholder="e.g. /500.html"
                        className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6 p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                          <AlertTriangle size={14} /> Temporary Maintenance Mode
                        </label>
                        <span className="text-[10px] text-slate-400 block">Bounces all visitors to /maintenance.html with a 503 Service Unavailable code.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={state.maintenanceMode}
                        onChange={(e) => updateField("maintenanceMode", e.target.checked)}
                        className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4"
                      />
                    </div>

                    {state.maintenanceMode && (
                      <div className="space-y-1.5 pt-2">
                        <label className="text-[10px] font-bold text-slate-500 block">Whitelisted IP Address (To allow testing, comma-separated)</label>
                        <input
                          type="text"
                          value={state.maintenanceIp}
                          onChange={(e) => updateField("maintenanceIp", e.target.value)}
                          placeholder="e.g. 192.168.1.150"
                          className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* AUTH TAB */}
              {activeTab === "auth" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-0.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Enable Basic Authentication</label>
                      <span className="text-[10px] text-slate-400 block">Forces pop-up login screens for specific paths</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={state.basicAuth}
                      onChange={(e) => updateField("basicAuth", e.target.checked)}
                      className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                    />
                  </div>

                  {state.basicAuth && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Authentication Prompt Name</label>
                        <input
                          type="text"
                          value={state.authName}
                          onChange={(e) => updateField("authName", e.target.value)}
                          placeholder="Restricted Access"
                          className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Target Directory Path</label>
                        <input
                          type="text"
                          value={state.authPath}
                          onChange={(e) => updateField("authPath", e.target.value)}
                          placeholder="/admin"
                          className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Absolute Server Path to .htpasswd File</label>
                        <input
                          type="text"
                          value={state.authUserFile}
                          onChange={(e) => updateField("authUserFile", e.target.value)}
                          placeholder="/home/username/public_html/.htpasswd"
                          className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Right Side: Real-time Output & Scores Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Scorings panel */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield size={16} className="text-[#518231]" /> Rules Optimization Audit
            </h3>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Security", score: scores.security, color: scores.security > 70 ? "text-emerald-500" : scores.security > 50 ? "text-amber-500" : "text-rose-500" },
                { label: "SEO Score", score: scores.seo, color: scores.seo > 70 ? "text-emerald-500" : scores.seo > 50 ? "text-amber-500" : "text-rose-500" },
                { label: "Performance", score: scores.performance, color: scores.performance > 70 ? "text-emerald-500" : scores.performance > 50 ? "text-amber-500" : "text-rose-500" }
              ].map(item => (
                <div key={item.label} className="p-3 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block">{item.label}</span>
                  <span className={`text-xl font-bold font-mono ${item.color}`}>{item.score}/100</span>
                </div>
              ))}
            </div>

            {/* Smart warnings */}
            {warnings.length > 0 && (
              <div className="space-y-2">
                {warnings.map((w, idx) => (
                  <div key={idx} className="flex gap-2 p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900/30 text-xs text-rose-800 dark:text-rose-300">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <div>{w}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions lists */}
            {suggestions.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Performance & Security Recommendations</span>
                <div className="max-h-[140px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {suggestions.map((s, idx) => (
                    <div key={idx} className="text-[11px] text-slate-500 flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* XML/Plain htaccess code container */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl flex flex-col h-[460px]">
            <div className="px-5 py-4 bg-slate-800/80 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileCode className="text-[#518231]" size={16} />
                <span className="text-xs font-bold text-slate-200">.htaccess Code Output</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 font-mono text-xs text-green-400 overflow-auto flex-1 custom-scrollbar leading-relaxed">
              <pre className="whitespace-pre"><code>{generatedHtaccess}</code></pre>
            </div>

            <div className="px-5 py-4 bg-slate-900 border-t border-slate-800 flex gap-2 shrink-0 justify-end">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Copy size={13} /> Copy Rules
              </button>
              
              <button
                onClick={() => handleDownload("htaccess")}
                className="px-4 py-2 bg-[#518231] hover:bg-[#436e28] text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
              >
                <Download size={13} /> Download .htaccess
              </button>

              <button
                onClick={() => handleDownload("txt")}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
                title="Download as readable .txt file"
              >
                Download TXT
              </button>
            </div>
          </div>

          {/* Line by line explanation drawer */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle size={14} className="text-[#518231]" /> Rules Compiler Explainer
            </h4>
            <div className="max-h-[180px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 custom-scrollbar pr-1">
              {explanations.map((exp, idx) => (
                <div key={idx} className="py-2 text-[11px]">
                  <div className="font-mono text-slate-700 dark:text-slate-300 font-semibold truncate" title={exp.line}>{exp.line}</div>
                  <div className="text-slate-400 mt-0.5 leading-normal">{exp.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
