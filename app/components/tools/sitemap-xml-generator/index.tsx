"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Copy, Download, Trash2, Plus, Minus, Info, RefreshCw, AlertTriangle, 
  CheckCircle, Settings, Globe, Sparkles, Layers, FileText, Check, 
  HelpCircle, Eye, Code, Search, ArrowRight, ExternalLink, Archive
} from "lucide-react";
import JSZip from "jszip";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Interfaces & Types ---
interface ImageMeta {
  loc: string;
  title?: string;
  caption?: string;
}

interface VideoMeta {
  thumbnail_loc: string;
  title: string;
  description: string;
  content_loc?: string;
  player_loc?: string;
}

interface NewsMeta {
  publicationName: string;
  publicationLanguage: string;
  publicationDate: string;
  title: string;
}

interface SitemapUrlEntry {
  id: string;
  loc: string; // URL path or full URL
  lastmod: string; // YYYY-MM-DD
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" | "none";
  priority: "1.0" | "0.9" | "0.8" | "0.7" | "0.6" | "0.5" | "0.4" | "0.3" | "0.2" | "0.1" | "0.0" | "none";
  type: "standard" | "image" | "video" | "news";
  images?: ImageMeta[];
  video?: VideoMeta;
  news?: NewsMeta;
}

interface IndexEntry {
  id: string;
  loc: string;
  lastmod?: string;
}

// --- Presets ---
const PRESETS = {
  nextjsApp: {
    name: "Next.js App Router",
    desc: "Standard canonical route configuration for Next.js 15 apps.",
    urls: [
      { loc: "/", priority: "1.0", changefreq: "daily", type: "standard" },
      { loc: "/about", priority: "0.7", changefreq: "monthly", type: "standard" },
      { loc: "/services", priority: "0.8", changefreq: "weekly", type: "standard" },
      { loc: "/blog", priority: "0.8", changefreq: "daily", type: "standard" },
      { loc: "/contact", priority: "0.5", changefreq: "monthly", type: "standard" },
      { loc: "/privacy", priority: "0.3", changefreq: "yearly", type: "standard" }
    ]
  },
  ecommerce: {
    name: "E-Commerce Catalog",
    desc: "Optimized prioritization setup for dynamic stores & product feeds.",
    urls: [
      { loc: "/", priority: "1.0", changefreq: "daily", type: "standard" },
      { loc: "/products", priority: "0.9", changefreq: "daily", type: "standard" },
      { loc: "/categories", priority: "0.8", changefreq: "weekly", type: "standard" },
      { loc: "/deals", priority: "0.8", changefreq: "daily", type: "standard" },
      { loc: "/blog", priority: "0.7", changefreq: "weekly", type: "standard" },
      { loc: "/about", priority: "0.5", changefreq: "monthly", type: "standard" },
      { loc: "/contact", priority: "0.3", changefreq: "monthly", type: "standard" }
    ]
  },
  blog: {
    name: "Blog / Magazine Hub",
    desc: "Optimized for publication cycles with high-frequency crawls.",
    urls: [
      { loc: "/", priority: "1.0", changefreq: "daily", type: "standard" },
      { loc: "/categories", priority: "0.8", changefreq: "weekly", type: "standard" },
      { loc: "/newsletter", priority: "0.6", changefreq: "monthly", type: "standard" },
      { loc: "/posts/hello-world", priority: "0.7", changefreq: "monthly", type: "standard" },
      { loc: "/posts/seo-guide", priority: "0.8", changefreq: "weekly", type: "standard" },
      { loc: "/about", priority: "0.5", changefreq: "monthly", type: "standard" }
    ]
  },
  saas: {
    name: "SaaS Landing & Docs",
    desc: "Focuses indexing weight on features, pricing and technical docs.",
    urls: [
      { loc: "/", priority: "1.0", changefreq: "daily", type: "standard" },
      { loc: "/features", priority: "0.9", changefreq: "weekly", type: "standard" },
      { loc: "/pricing", priority: "0.9", changefreq: "weekly", type: "standard" },
      { loc: "/docs/getting-started", priority: "0.8", changefreq: "daily", type: "standard" },
      { loc: "/blog", priority: "0.7", changefreq: "weekly", type: "standard" },
      { loc: "/login", priority: "0.1", changefreq: "never", type: "standard" }
    ]
  }
};

const DEFAULT_STATE = {
  hostUrl: "https://example.com",
  mode: "standard" as "standard" | "index",
  urls: [
    { id: "1", loc: "/", lastmod: new Date().toISOString().split("T")[0], changefreq: "daily" as const, priority: "1.0" as const, type: "standard" as const },
    { id: "2", loc: "/about", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly" as const, priority: "0.7" as const, type: "standard" as const },
    { id: "3", loc: "/blog", lastmod: new Date().toISOString().split("T")[0], changefreq: "weekly" as const, priority: "0.8" as const, type: "standard" as const }
  ] as SitemapUrlEntry[],
  indexUrls: [
    { id: "idx-1", loc: "/sitemap-posts.xml", lastmod: new Date().toISOString().split("T")[0] },
    { id: "idx-2", loc: "/sitemap-products.xml", lastmod: new Date().toISOString().split("T")[0] }
  ] as IndexEntry[],
  format: "beautify" as "beautify" | "minify"
};

// Unique ID generator helper
const generateId = (prefix: string = "entry"): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function SitemapXmlGeneratorTool() {
  const [hostUrl, setHostUrl] = useState<string>(DEFAULT_STATE.hostUrl);
  const [mode, setMode] = useState<"standard" | "index">(DEFAULT_STATE.mode);
  const [urls, setUrls] = useState<SitemapUrlEntry[]>(DEFAULT_STATE.urls);
  const [indexUrls, setIndexUrls] = useState<IndexEntry[]>(DEFAULT_STATE.indexUrls);
  const [format, setFormat] = useState<"beautify" | "minify">(DEFAULT_STATE.format);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Single url entry modal/form states
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  
  // Single Entry Form fields
  const [formLoc, setFormLoc] = useState<string>("");
  const [formLastmod, setFormLastmod] = useState<string>(new Date().toISOString().split("T")[0]);
  const [formChangefreq, setFormChangefreq] = useState<SitemapUrlEntry["changefreq"]>("weekly");
  const [formPriority, setFormPriority] = useState<SitemapUrlEntry["priority"]>("0.7");
  const [formType, setFormType] = useState<SitemapUrlEntry["type"]>("standard");

  // Single Entry Extension fields (Images)
  const [formImages, setFormImages] = useState<ImageMeta[]>([]);
  const [imgLoc, setImgLoc] = useState<string>("");
  const [imgTitle, setImgTitle] = useState<string>("");
  const [imgCaption, setImgCaption] = useState<string>("");

  // Single Entry Extension fields (Video)
  const [videoThumb, setVideoThumb] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDesc, setVideoDesc] = useState<string>("");
  const [videoContentUrl, setVideoContentUrl] = useState<string>("");
  const [videoPlayerUrl, setVideoPlayerUrl] = useState<string>("");

  // Single Entry Extension fields (News)
  const [newsName, setNewsName] = useState<string>("");
  const [newsLang, setNewsLang] = useState<string>("en");
  const [newsDate, setNewsDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [newsTitle, setNewsTitle] = useState<string>("");

  // Index Entry form fields
  const [idxLoc, setIdxLoc] = useState<string>("");
  const [idxLastmod, setIdxLastmod] = useState<string>(new Date().toISOString().split("T")[0]);

  // Bulk Paste Area
  const [bulkText, setBulkText] = useState<string>("");
  const [showBulkImport, setShowBulkImport] = useState<boolean>(false);

  // Success states
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync to global history on mount
  useEffect(() => {
    addToGlobalHistory({ slug: "sitemap-xml-generator", title: "Sitemap.xml Generator", type: "tool" });
  }, []);

  // Sync / Load from localStorage on mount
  useEffect(() => {
    const savedHost = localStorage.getItem("sitemap_generator_host");
    const savedMode = localStorage.getItem("sitemap_generator_mode");
    const savedUrls = localStorage.getItem("sitemap_generator_urls");
    const savedIndexUrls = localStorage.getItem("sitemap_generator_index_urls");
    const savedFormat = localStorage.getItem("sitemap_generator_format");

    if (savedHost) setHostUrl(savedHost);
    if (savedMode && (savedMode === "standard" || savedMode === "index")) setMode(savedMode as any);
    if (savedUrls) {
      try { setUrls(JSON.parse(savedUrls)); } catch (e) {}
    }
    if (savedIndexUrls) {
      try { setIndexUrls(JSON.parse(savedIndexUrls)); } catch (e) {}
    }
    if (savedFormat && (savedFormat === "beautify" || savedFormat === "minify")) setFormat(savedFormat as any);
  }, []);

  // Save changes helper
  const persist = (key: string, value: any) => {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  };

  const handleHostChange = (val: string) => {
    setHostUrl(val);
    persist("sitemap_generator_host", val);
  };

  const handleModeChange = (val: "standard" | "index") => {
    setMode(val);
    persist("sitemap_generator_mode", val);
  };

  const handleFormatChange = (val: "beautify" | "minify") => {
    setFormat(val);
    persist("sitemap_generator_format", val);
  };

  // Helper: Assemble full URL safely
  const buildFullUrl = useCallback((path: string, host: string): string => {
    const cleanHost = host.trim().replace(/\/+$/, "");
    let cleanPath = path.trim();
    if (!cleanPath) return cleanHost;
    
    // Check if it's already a full absolute URL
    if (/^https?:\/\//i.test(cleanPath)) {
      return cleanPath;
    }
    
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }
    return cleanHost + cleanPath;
  }, []);

  // Presets applicator
  const applyPreset = (presetKey: keyof typeof PRESETS) => {
    const preset = PRESETS[presetKey];
    const newEntries: SitemapUrlEntry[] = preset.urls.map(url => ({
      id: generateId(),
      loc: url.loc,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: url.changefreq as any,
      priority: url.priority as any,
      type: url.type as any
    }));
    setUrls(newEntries);
    persist("sitemap_generator_urls", newEntries);
    setSuccessMsg(`Preset "${preset.name}" applied successfully!`);
    setCurrentPage(1);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset configuration to defaults?")) {
      setHostUrl(DEFAULT_STATE.hostUrl);
      setMode(DEFAULT_STATE.mode);
      setUrls(DEFAULT_STATE.urls);
      setIndexUrls(DEFAULT_STATE.indexUrls);
      setFormat(DEFAULT_STATE.format);
      
      localStorage.removeItem("sitemap_generator_host");
      localStorage.removeItem("sitemap_generator_mode");
      localStorage.removeItem("sitemap_generator_urls");
      localStorage.removeItem("sitemap_generator_index_urls");
      localStorage.removeItem("sitemap_generator_format");
      
      setSuccessMsg("Configuration reset to default.");
      setCurrentPage(1);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  // Clear all entries
  const handleClearAll = () => {
    if (window.confirm("Delete all sitemap URL entries?")) {
      setUrls([]);
      persist("sitemap_generator_urls", []);
      setSuccessMsg("Cleared all sitemap entries.");
      setCurrentPage(1);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  // Bulk Import logic
  const handleBulkImport = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText.split("\n");
    const newEntries: SitemapUrlEntry[] = [];
    const today = new Date().toISOString().split("T")[0];

    lines.forEach(line => {
      let val = line.trim();
      if (!val) return;

      // Extract path or clean domain
      if (val.startsWith(hostUrl)) {
        val = val.replace(hostUrl, "");
      }
      if (!val.startsWith("/") && !/^https?:\/\//i.test(val)) {
        val = "/" + val;
      }

      newEntries.push({
        id: generateId(),
        loc: val,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.7",
        type: "standard"
      });
    });

    const updated = [...urls, ...newEntries];
    setUrls(updated);
    persist("sitemap_generator_urls", updated);
    setBulkText("");
    setShowBulkImport(false);
    setSuccessMsg(`Bulk imported ${newEntries.length} URLs!`);
    setCurrentPage(1);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Add/Edit Single Entry submit
  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLoc.trim()) return;

    let path = formLoc.trim();
    if (path.startsWith(hostUrl)) {
      path = path.replace(hostUrl, "");
    }
    if (!path.startsWith("/") && !/^https?:\/\//i.test(path)) {
      path = "/" + path;
    }

    const payload: SitemapUrlEntry = {
      id: editingEntryId || generateId(),
      loc: path,
      lastmod: formLastmod || new Date().toISOString().split("T")[0],
      changefreq: formChangefreq,
      priority: formPriority,
      type: formType
    };

    // Attach extension details
    if (formType === "image" && formImages.length > 0) {
      payload.images = formImages;
    }
    if (formType === "video" && videoThumb && videoTitle) {
      payload.video = {
        thumbnail_loc: videoThumb,
        title: videoTitle,
        description: videoDesc,
        content_loc: videoContentUrl || undefined,
        player_loc: videoPlayerUrl || undefined
      };
    }
    if (formType === "news" && newsName && newsTitle) {
      payload.news = {
        publicationName: newsName,
        publicationLanguage: newsLang || "en",
        publicationDate: newsDate || new Date().toISOString(),
        title: newsTitle
      };
    }

    let updated: SitemapUrlEntry[];
    if (editingEntryId) {
      updated = urls.map(u => u.id === editingEntryId ? payload : u);
      setSuccessMsg("Sitemap URL entry updated!");
    } else {
      updated = [...urls, payload];
      setSuccessMsg("New URL entry added!");
    }

    setUrls(updated);
    persist("sitemap_generator_urls", updated);
    
    // Reset Form & Close Modal
    setShowAddModal(false);
    setEditingEntryId(null);
    setFormLoc("");
    setFormLastmod(new Date().toISOString().split("T")[0]);
    setFormChangefreq("weekly");
    setFormPriority("0.7");
    setFormType("standard");
    setFormImages([]);
    setVideoThumb("");
    setVideoTitle("");
    setVideoDesc("");
    setVideoContentUrl("");
    setVideoPlayerUrl("");
    setNewsName("");
    setNewsLang("en");
    setNewsDate(new Date().toISOString().split("T")[0]);
    setNewsTitle("");
    
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Edit action trigger
  const handleEditClick = (entry: SitemapUrlEntry) => {
    setEditingEntryId(entry.id);
    setFormLoc(entry.loc);
    setFormLastmod(entry.lastmod);
    setFormChangefreq(entry.changefreq);
    setFormPriority(entry.priority);
    setFormType(entry.type);

    if (entry.images) setFormImages(entry.images);
    if (entry.video) {
      setVideoThumb(entry.video.thumbnail_loc || "");
      setVideoTitle(entry.video.title || "");
      setVideoDesc(entry.video.description || "");
      setVideoContentUrl(entry.video.content_loc || "");
      setVideoPlayerUrl(entry.video.player_loc || "");
    }
    if (entry.news) {
      setNewsName(entry.news.publicationName || "");
      setNewsLang(entry.news.publicationLanguage || "en");
      setNewsDate(entry.news.publicationDate || new Date().toISOString().split("T")[0]);
      setNewsTitle(entry.news.title || "");
    }
    setShowAddModal(true);
  };

  // Delete single entry
  const handleDeleteEntry = (id: string) => {
    const updated = urls.filter(u => u.id !== id);
    setUrls(updated);
    persist("sitemap_generator_urls", updated);
    
    // Fix current page if empty after deletion
    const totalFiltered = updated.filter(u => u.loc.toLowerCase().includes(searchTerm.toLowerCase())).length;
    const maxPage = Math.max(1, Math.ceil(totalFiltered / itemsPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  };

  // Index Mode: Add Entry
  const handleAddIndexEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idxLoc.trim()) return;

    let path = idxLoc.trim();
    if (path.startsWith(hostUrl)) {
      path = path.replace(hostUrl, "");
    }
    if (!path.startsWith("/") && !/^https?:\/\//i.test(path)) {
      path = "/" + path;
    }

    const newIdx: IndexEntry = {
      id: generateId("idx"),
      loc: path,
      lastmod: idxLastmod || undefined
    };

    const updated = [...indexUrls, newIdx];
    setIndexUrls(updated);
    persist("sitemap_generator_index_urls", updated);
    setIdxLoc("");
    setIdxLastmod(new Date().toISOString().split("T")[0]);
    setSuccessMsg("Sitemap Index link added!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Index Mode: Delete Entry
  const handleDeleteIndexEntry = (id: string) => {
    const updated = indexUrls.filter(u => u.id !== id);
    setIndexUrls(updated);
    persist("sitemap_generator_index_urls", updated);
  };

  // Images List management inside Single Entry form
  const handleAddImageToForm = () => {
    if (!imgLoc.trim()) return;
    setFormImages([...formImages, {
      loc: imgLoc.trim(),
      title: imgTitle.trim() || undefined,
      caption: imgCaption.trim() || undefined
    }]);
    setImgLoc("");
    setImgTitle("");
    setImgCaption("");
  };

  const handleRemoveImageFromForm = (idx: number) => {
    setFormImages(formImages.filter((_, i) => i !== idx));
  };

  // Filtering + Pagination computations
  const filteredUrls = useMemo(() => {
    return urls.filter(u => {
      const locMatch = u.loc.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = u.type.toLowerCase().includes(searchTerm.toLowerCase());
      return locMatch || typeMatch;
    });
  }, [urls, searchTerm]);

  const paginatedUrls = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUrls.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUrls, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredUrls.length / itemsPerPage));
  }, [filteredUrls, itemsPerPage]);

  // Sync pagination page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // --- XML Generator Engine ---
  const generatedXml = useMemo(() => {
    const isBeautify = format === "beautify";
    const indent = isBeautify ? "  " : "";
    const newline = isBeautify ? "\n" : "";

    if (mode === "index") {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>${newline}`;
      xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${newline}`;
      
      indexUrls.forEach(entry => {
        const fullLoc = buildFullUrl(entry.loc, hostUrl);
        xml += `${indent}<sitemap>${newline}`;
        xml += `${indent}${indent}<loc>${fullLoc}</loc>${newline}`;
        if (entry.lastmod) {
          xml += `${indent}${indent}<lastmod>${entry.lastmod}</lastmod>${newline}`;
        }
        xml += `${indent}</sitemap>${newline}`;
      });
      
      xml += `</sitemapindex>`;
      return xml;
    } else {
      // Determine namespaces needed
      const hasImages = urls.some(u => u.type === "image" && u.images && u.images.length > 0);
      const hasVideos = urls.some(u => u.type === "video" && u.video);
      const hasNews = urls.some(u => u.type === "news" && u.news);

      let xml = `<?xml version="1.0" encoding="UTF-8"?>${newline}`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`;
      if (hasImages) xml += `\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`;
      if (hasVideos) xml += `\n        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"`;
      if (hasNews) xml += `\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"`;
      xml += `>${newline}`;

      urls.forEach(entry => {
        const fullLoc = buildFullUrl(entry.loc, hostUrl);
        xml += `${indent}<url>${newline}`;
        xml += `${indent}${indent}<loc>${fullLoc}</loc>${newline}`;
        
        if (entry.lastmod) {
          xml += `${indent}${indent}<lastmod>${entry.lastmod}</lastmod>${newline}`;
        }
        if (entry.changefreq && entry.changefreq !== "none") {
          xml += `${indent}${indent}<changefreq>${entry.changefreq}</changefreq>${newline}`;
        }
        if (entry.priority && entry.priority !== "none") {
          xml += `${indent}${indent}<priority>${entry.priority}</priority>${newline}`;
        }

        // Add extensions
        if (entry.type === "image" && entry.images) {
          entry.images.forEach(img => {
            const fullImgLoc = buildFullUrl(img.loc, hostUrl);
            xml += `${indent}${indent}<image:image>${newline}`;
            xml += `${indent}${indent}${indent}<image:loc>${fullImgLoc}</image:loc>${newline}`;
            if (img.title) {
              xml += `${indent}${indent}${indent}<image:title>${img.title.replace(/"/g, "&quot;")}</image:title>${newline}`;
            }
            if (img.caption) {
              xml += `${indent}${indent}${indent}<image:caption>${img.caption.replace(/"/g, "&quot;")}</image:caption>${newline}`;
            }
            xml += `${indent}${indent}</image:image>${newline}`;
          });
        }

        if (entry.type === "video" && entry.video) {
          const v = entry.video;
          const fullThumb = buildFullUrl(v.thumbnail_loc, hostUrl);
          xml += `${indent}${indent}<video:video>${newline}`;
          xml += `${indent}${indent}${indent}<video:thumbnail_loc>${fullThumb}</video:thumbnail_loc>${newline}`;
          xml += `${indent}${indent}${indent}<video:title>${v.title.replace(/"/g, "&quot;")}</video:title>${newline}`;
          xml += `${indent}${indent}${indent}<video:description>${v.description.replace(/"/g, "&quot;")}</video:description>${newline}`;
          if (v.content_loc) {
            xml += `${indent}${indent}${indent}<video:content_loc>${buildFullUrl(v.content_loc, hostUrl)}</video:content_loc>${newline}`;
          }
          if (v.player_loc) {
            xml += `${indent}${indent}${indent}<video:player_loc>${v.player_loc}</video:player_loc>${newline}`;
          }
          xml += `${indent}${indent}</video:video>${newline}`;
        }

        if (entry.type === "news" && entry.news) {
          const n = entry.news;
          xml += `${indent}${indent}<news:news>${newline}`;
          xml += `${indent}${indent}${indent}<news:publication>${newline}`;
          xml += `${indent}${indent}${indent}${indent}<news:name>${n.publicationName.replace(/"/g, "&quot;")}</news:name>${newline}`;
          xml += `${indent}${indent}${indent}${indent}<news:language>${n.publicationLanguage}</news:language>${newline}`;
          xml += `${indent}${indent}${indent}</news:publication>${newline}`;
          xml += `${indent}${indent}${indent}<news:publication_date>${n.publicationDate}</news:publication_date>${newline}`;
          xml += `${indent}${indent}${indent}<news:title>${n.title.replace(/"/g, "&quot;")}</news:title>${newline}`;
          xml += `${indent}${indent}</news:news>${newline}`;
        }

        xml += `${indent}</url>${newline}`;
      });

      xml += `</urlset>`;
      return xml;
    }
  }, [mode, hostUrl, urls, indexUrls, format, buildFullUrl]);

  // Real-time Size estimation & Validation audit
  const statsAndValidation = useMemo(() => {
    const blobSize = new Blob([generatedXml], { type: "text/xml" }).size;
    const warnings: string[] = [];
    const successes: string[] = [];

    // Protocol check
    if (!/^https:\/\//i.test(hostUrl)) {
      warnings.push("Host URL is not using HTTPS. Search engines strongly prioritize secure HTTPS sitemaps.");
    } else {
      successes.push("Base Host URL is secure (HTTPS).");
    }

    if (mode === "standard") {
      const urlCount = urls.length;
      if (urlCount === 0) {
        warnings.push("Your URL list is empty. Add links manually, import them in bulk, or click a Preset.");
      } else {
        successes.push(`Contains ${urlCount.toLocaleString()} URL entries.`);
      }

      // Google limits: 50,000 URLs
      if (urlCount > 50000) {
        warnings.push("URL count exceeds 50,000 links (Sitemaps protocol limit). Search engines will reject this sitemap. Please split using Sitemap Index mode.");
      }

      // Google size limits: 50MB
      if (blobSize > 52428800) {
        warnings.push("Estimated file size exceeds 50MB limit. Split your URLs into a sitemap index structure.");
      } else if (blobSize > 0) {
        successes.push(`File size is optimal: ${(blobSize / 1024).toFixed(2)} KB.`);
      }

      // Check if homepage is included
      const hasHomepage = urls.some(u => u.loc === "/" || u.loc === "" || u.loc === hostUrl);
      if (!hasHomepage && urlCount > 0) {
        warnings.push("Homepage '/' or canonical root not detected. It is highly recommended to list the root index page first.");
      } else if (urlCount > 0) {
        successes.push("Homepage canonical link is declared.");
      }

      // Casing / duplicate / query checks
      const locSet = new Set<string>();
      let hasDuplicates = false;
      let hasQueryParams = false;

      urls.forEach(u => {
        const full = buildFullUrl(u.loc, hostUrl).toLowerCase();
        if (locSet.has(full)) hasDuplicates = true;
        locSet.add(full);

        if (u.loc.includes("?")) hasQueryParams = true;
      });

      if (hasDuplicates) {
        warnings.push("Duplicate URL paths detected. Remove duplicates to optimize crawl budget.");
      }
      if (hasQueryParams) {
        warnings.push("URLs with query parameters detected. Sitemaps should only list canonical URLs without search parameters.");
      }

      // Verify extension fields
      urls.forEach(u => {
        if (u.type === "image" && (!u.images || u.images.length === 0)) {
          warnings.push(`Image sitemap node for "${u.loc}" is missing image listings.`);
        }
        if (u.type === "video" && (!u.video || !u.video.thumbnail_loc || !u.video.title)) {
          warnings.push(`Video node for "${u.loc}" has incomplete required fields (Title, Thumbnail).`);
        }
        if (u.type === "news" && (!u.news || !u.news.publicationName || !u.news.title)) {
          warnings.push(`News node for "${u.loc}" is missing news publisher names or titles.`);
        }
      });

    } else {
      const idxCount = indexUrls.length;
      if (idxCount === 0) {
        warnings.push("No sitemaps declared inside your index file. Add child sitemap paths.");
      } else {
        successes.push(`Sitemap Index references ${idxCount} child sitemaps.`);
      }
    }

    return {
      size: blobSize,
      warnings,
      successes
    };
  }, [generatedXml, hostUrl, urls, indexUrls, mode, buildFullUrl]);

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedXml);
    setSuccessMsg("Copied XML sitemap code!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Download sitemap file
  const handleDownload = () => {
    const blob = new Blob([generatedXml], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "index" ? "sitemap-index.xml" : "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSuccessMsg("Sitemap downloaded successfully!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Download partitioned ZIP
  const handleDownloadZip = async () => {
    const zip = new JSZip();

    if (mode === "standard" && urls.length > 0) {
      // Chunk URLs into groups of 45,000 to remain safely under the 50,000 threshold
      const CHUNK_LIMIT = 45000;
      const chunks: SitemapUrlEntry[][] = [];
      for (let i = 0; i < urls.length; i += CHUNK_LIMIT) {
        chunks.push(urls.slice(i, i + CHUNK_LIMIT));
      }

      if (chunks.length <= 1) {
        // Just put sitemap.xml in ZIP
        zip.file("sitemap.xml", generatedXml);
      } else {
        // Create child sitemaps
        const childSitemaps: string[] = [];
        chunks.forEach((chunk, index) => {
          const sitemapName = `sitemap-part-${index + 1}.xml`;
          childSitemaps.push(sitemapName);

          const hasImages = chunk.some(u => u.type === "image" && u.images && u.images.length > 0);
          const hasVideos = chunk.some(u => u.type === "video" && u.video);
          const hasNews = chunk.some(u => u.type === "news" && u.news);

          let childXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
          childXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`;
          if (hasImages) childXml += `\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`;
          if (hasVideos) childXml += `\n        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"`;
          if (hasNews) childXml += `\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"`;
          childXml += `>\n`;

          chunk.forEach(entry => {
            const fullLoc = buildFullUrl(entry.loc, hostUrl);
            childXml += `  <url>\n    <loc>${fullLoc}</loc>\n`;
            if (entry.lastmod) childXml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
            if (entry.changefreq && entry.changefreq !== "none") childXml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
            if (entry.priority && entry.priority !== "none") childXml += `    <priority>${entry.priority}</priority>\n`;
            childXml += `  </url>\n`;
          });
          childXml += `</urlset>`;
          zip.file(sitemapName, childXml);
        });

        // Create main index sitemap
        let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        childSitemaps.forEach(name => {
          indexXml += `  <sitemap>\n    <loc>${buildFullUrl(name, hostUrl)}</loc>\n    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n  </sitemap>\n`;
        });
        indexXml += `</sitemapindex>`;
        zip.file("sitemap-index.xml", indexXml);
      }
    } else {
      // Index Mode or empty Standard Mode
      zip.file(mode === "index" ? "sitemap-index.xml" : "sitemap.xml", generatedXml);
    }

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sitemap-package.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccessMsg("Sitemap ZIP package downloaded successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e) {
      console.error("ZIP Generation Failed", e);
    }
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Toast Alert Success Messages */}
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl border border-emerald-500 animate-bounce">
          <CheckCircle size={20} className="shrink-0" />
          <span className="font-semibold text-sm">{successMsg}</span>
        </div>
      )}

      {/* Hero Layout Config Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Globe size={12} className="text-[#518231]" /> Target Domain URL
          </label>
          <input
            type="text"
            className="w-full text-sm py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all font-mono"
            placeholder="https://nexuscalculator.net"
            value={hostUrl}
            onChange={(e) => handleHostChange(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Layers size={12} className="text-[#518231]" /> Generation Mode
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-200/50 dark:bg-slate-900/50 p-1 rounded-lg">
            <button
              onClick={() => handleModeChange("standard")}
              className={`py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
                mode === "standard"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Standard Sitemap
            </button>
            <button
              onClick={() => handleModeChange("index")}
              className={`py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
                mode === "index"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Sitemap Index
            </button>
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

      {/* Main Form Fields vs Live Preview Code Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: URL Configuration Manager */}
        <div className="lg:col-span-7 space-y-6">
          
          {mode === "standard" ? (
            <>
              {/* Presets segment */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500 animate-pulse" /> Quick-Start Preset Templates
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(PRESETS).map(([key, data]) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key as any)}
                      className="p-3 text-left border border-slate-100 hover:border-[#518231]/30 hover:bg-[#518231]/5 dark:border-slate-800 dark:hover:border-[#518231]/40 rounded-xl transition-all group"
                    >
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#518231] transition-colors">{data.name}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-normal">{data.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* URL Entries controls panel */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">URL Directory Entries</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Configure absolute paths and priority parameters</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowBulkImport(!showBulkImport)}
                      className="px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all flex items-center gap-1"
                    >
                      <Layers size={12} /> Bulk Paste
                    </button>
                    <button
                      onClick={() => {
                        setEditingEntryId(null);
                        setFormLoc("");
                        setFormLastmod(new Date().toISOString().split("T")[0]);
                        setFormChangefreq("weekly");
                        setFormPriority("0.7");
                        setFormType("standard");
                        setFormImages([]);
                        setVideoThumb("");
                        setVideoTitle("");
                        setVideoDesc("");
                        setVideoContentUrl("");
                        setVideoPlayerUrl("");
                        setNewsName("");
                        setNewsLang("en");
                        setNewsDate(new Date().toISOString().split("T")[0]);
                        setNewsTitle("");
                        setShowAddModal(true);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#518231] hover:bg-[#436e28] text-white rounded-lg shadow-sm transition-all flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Path
                    </button>
                  </div>
                </div>

                {/* Bulk Import text area expansion */}
                {showBulkImport && (
                  <div className="p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Bulk URL Import (One link per line)
                    </label>
                    <textarea
                      rows={5}
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      placeholder="e.g.&#10;/pricing&#10;/services/web-dev&#10;https://example.com/blog/article"
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setShowBulkImport(false)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-lg transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleBulkImport}
                        className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
                      >
                        Process Imports
                      </button>
                    </div>
                  </div>
                )}

                {/* Search entries block */}
                <div className="px-5 py-3 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <Search size={14} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search entries by path or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:ring-0 py-1"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Main Table view of sitemap lists */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-4">Canonical Path</th>
                        <th className="py-3 px-2">Priority</th>
                        <th className="py-3 px-2">Freq</th>
                        <th className="py-3 px-2">Type</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      {paginatedUrls.length > 0 ? (
                        paginatedUrls.map(entry => (
                          <tr key={entry.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-medium truncate max-w-[200px]" title={entry.loc}>
                              {entry.loc}
                            </td>
                            <td className="py-3.5 px-2">
                              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono font-semibold text-[10px]">
                                {entry.priority === "none" ? "n/a" : entry.priority}
                              </span>
                            </td>
                            <td className="py-3.5 px-2">
                              <span className="text-[10px] font-semibold uppercase text-slate-500">
                                {entry.changefreq === "none" ? "n/a" : entry.changefreq}
                              </span>
                            </td>
                            <td className="py-3.5 px-2">
                              <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                                entry.type === "standard" ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" :
                                entry.type === "image" ? "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300" :
                                entry.type === "video" ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300" :
                                "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                              }`}>
                                {entry.type}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => handleEditClick(entry)}
                                  className="p-1 text-slate-400 hover:text-[#518231] dark:hover:text-emerald-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                  title="Edit entry details"
                                >
                                  <Settings size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteEntry(entry.id)}
                                  className="p-1 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                  title="Remove entry"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400 dark:text-slate-500">
                            No sitemap URL entries found. Add paths or search something else.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination footer */}
                {totalPages > 1 && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      Showing page <span className="font-semibold text-slate-800 dark:text-slate-200">{currentPage}</span> of <span className="font-semibold text-slate-800 dark:text-slate-200">{totalPages}</span> ({filteredUrls.length} total entries)
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition-all"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition-all"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-slate-100/50 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={handleClearAll}
                    disabled={urls.length === 0}
                    className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-950/50 dark:text-red-400 dark:hover:bg-red-950/20 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg transition-all flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Clear Entries
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Sitemap Index Mode
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Index Child Sitemaps</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Add the URLs pointing directly to your segmented child XML sitemaps.</p>
              </div>

              {/* Add Index Entry inline form */}
              <form onSubmit={handleAddIndexEntry} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sitemap Filename/Path</label>
                  <input
                    type="text"
                    required
                    value={idxLoc}
                    onChange={(e) => setIdxLoc(e.target.value)}
                    placeholder="e.g. /sitemap-products.xml"
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last Modified Date</label>
                  <input
                    type="date"
                    value={idxLastmod}
                    onChange={(e) => setIdxLastmod(e.target.value)}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#518231] hover:bg-[#436e28] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1"
                >
                  <Plus size={12} /> Add Sitemap Link
                </button>
              </form>

              {/* Index lists table */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-4">Segment URL</th>
                      <th className="py-2.5 px-4">Last Modified</th>
                      <th className="py-2.5 px-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {indexUrls.length > 0 ? (
                      indexUrls.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="py-3 px-4 truncate max-w-[200px] font-medium" title={item.loc}>
                            {buildFullUrl(item.loc, hostUrl)}
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            {item.lastmod || "n/a"}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteIndexEntry(item.id)}
                              className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-slate-400 dark:text-slate-500 font-sans">
                          Sitemap Index is empty. Add child sitemaps above.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Real-time XML Previewer & Code Auditing */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Real-time Code Editor box */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl flex flex-col h-[520px]">
            <div className="px-5 py-4 bg-slate-800/80 border-b border-slate-800 flex flex-wrap gap-4 items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Code className="text-[#518231]" size={16} />
                <span className="text-xs font-bold text-slate-200">XML Document Output</span>
              </div>

              {/* Formatting Selector */}
              <div className="flex gap-1.5 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => handleFormatChange("beautify")}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                    format === "beautify" ? "bg-slate-800 text-[#518231]" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Beautified
                </button>
                <button
                  onClick={() => handleFormatChange("minify")}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                    format === "minify" ? "bg-slate-800 text-[#518231]" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Minified
                </button>
              </div>
            </div>

            {/* XML code container */}
            <div className="p-4 bg-slate-950 font-mono text-xs text-green-400 overflow-auto flex-1 custom-scrollbar leading-relaxed">
              <pre className="whitespace-pre"><code>{generatedXml}</code></pre>
            </div>

            {/* Preview action buttons */}
            <div className="px-5 py-4 bg-slate-900 border-t border-slate-800 flex gap-2 shrink-0 justify-end">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Copy size={13} /> Copy XML
              </button>
              
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-[#518231] hover:bg-[#436e28] text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
              >
                <Download size={13} /> Download File
              </button>

              {mode === "standard" && (
                <button
                  onClick={handleDownloadZip}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
                  title="Generate multi-part zip if URLs exceed 45k"
                >
                  <Archive size={13} /> Download ZIP
                </button>
              )}
            </div>
          </div>

          {/* Validation Auditor board */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" /> Validation & Compatibility Audit
            </h3>
            
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {/* Warnings listing */}
              {statsAndValidation.warnings.map((warn, i) => (
                <div key={i} className="flex gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-300">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <div>{warn}</div>
                </div>
              ))}

              {/* Success metrics listing */}
              {statsAndValidation.successes.map((succ, i) => (
                <div key={i} className="flex gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-xs text-emerald-800 dark:text-emerald-300">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" />
                  <div>{succ}</div>
                </div>
              ))}
            </div>

            {/* Byte sizes info */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Total URL Entries</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                  {mode === "standard" ? urls.length.toLocaleString() : indexUrls.length.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">XML File Size</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                  {(statsAndValidation.size / 1024).toFixed(2)} KB
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* --- ADD / EDIT SINGLE URL ENTRY SLIDE-OVER/MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {editingEntryId ? "Modify Sitemap URL Entry" : "Add Canonical URL Path"}
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveEntry} className="p-6 space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">URL Path / Route</label>
                  <input
                    type="text"
                    required
                    value={formLoc}
                    onChange={(e) => setFormLoc(e.target.value)}
                    placeholder="e.g. /blog/seo-guide"
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last Modified Date</label>
                  <input
                    type="date"
                    value={formLastmod}
                    onChange={(e) => setFormLastmod(e.target.value)}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Change Freq</label>
                  <select
                    value={formChangefreq}
                    onChange={(e) => setFormChangefreq(e.target.value as any)}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all"
                  >
                    <option value="none">No Tag</option>
                    <option value="always">Always</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all"
                  >
                    <option value="none">No Tag</option>
                    <option value="1.0">1.0 (Highest)</option>
                    <option value="0.9">0.9</option>
                    <option value="0.8">0.8</option>
                    <option value="0.7">0.7</option>
                    <option value="0.6">0.6</option>
                    <option value="0.5">0.5</option>
                    <option value="0.4">0.4</option>
                    <option value="0.3">0.3</option>
                    <option value="0.2">0.2</option>
                    <option value="0.1">0.1</option>
                    <option value="0.0">0.0 (Lowest)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sitemap Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231] transition-all"
                  >
                    <option value="standard">Standard</option>
                    <option value="image">Google Image Extension</option>
                    <option value="video">Google Video Extension</option>
                    <option value="news">Google News Extension</option>
                  </select>
                </div>
              </div>

              {/* --- NESTED FORM FIELDS FOR TYPE EXTENSIONS --- */}
              
              {/* IMAGE EXTENSION FIELDS */}
              {formType === "image" && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="text-xs font-bold text-sky-600 flex items-center gap-1.5">
                    <Layers size={14} /> Embedded Images List
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Image Source URL</label>
                      <input
                        type="text"
                        placeholder="/images/hero.png"
                        value={imgLoc}
                        onChange={(e) => setImgLoc(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddImageToForm}
                      className="w-full py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold rounded"
                    >
                      Attach Image
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Image Title (Optional)</label>
                      <input
                        type="text"
                        placeholder="Hero banner"
                        value={imgTitle}
                        onChange={(e) => setImgTitle(e.target.value)}
                        className="w-full text-[11px] py-1 px-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Image Caption (Optional)</label>
                      <input
                        type="text"
                        placeholder="Nexus Calculator Dashboard screen"
                        value={imgCaption}
                        onChange={(e) => setImgCaption(e.target.value)}
                        className="w-full text-[11px] py-1 px-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Attached images layout */}
                  {formImages.length > 0 && (
                    <div className="space-y-1 pt-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Attached Images ({formImages.length})</div>
                      <div className="max-h-[110px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                        {formImages.map((img, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded text-[10px] font-mono">
                            <span className="truncate max-w-[280px]" title={img.loc}>{img.loc}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveImageFromForm(i)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* VIDEO EXTENSION FIELDS */}
              {formType === "video" && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                  <div className="text-xs font-bold text-purple-600 flex items-center gap-1.5">
                    <Layers size={14} /> Video Schema Parameters
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Thumbnail URL *</label>
                      <input
                        type="text"
                        required
                        placeholder="/videos/poster-1.png"
                        value={videoThumb}
                        onChange={(e) => setVideoThumb(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Video Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="How to use the calculator"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 block">Video Description *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Step by step tutorial showing how to use the scientific formulas"
                      value={videoDesc}
                      onChange={(e) => setVideoDesc(e.target.value)}
                      className="w-full text-[11px] p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Content Media URL (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. /media/video.mp4"
                        value={videoContentUrl}
                        onChange={(e) => setVideoContentUrl(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Player IFrame URL (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. https://youtube.com/embed/..."
                        value={videoPlayerUrl}
                        onChange={(e) => setVideoPlayerUrl(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NEWS EXTENSION FIELDS */}
              {formType === "news" && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                  <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <Layers size={14} /> Google News Meta Parameters
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[9px] font-bold text-slate-400 block">Publication Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nexus Calculator Daily"
                        value={newsName}
                        onChange={(e) => setNewsName(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Language Code (ISO) *</label>
                      <input
                        type="text"
                        required
                        placeholder="en"
                        value={newsLang}
                        onChange={(e) => setNewsLang(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[9px] font-bold text-slate-400 block">Article Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nexus Calculator Launches new Sitemap Tool"
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">Publication Date *</label>
                      <input
                        type="date"
                        required
                        value={newsDate}
                        onChange={(e) => setNewsDate(e.target.value)}
                        className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#518231] hover:bg-[#436e28] text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                >
                  {editingEntryId ? "Apply Changes" : "Create Entry"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
