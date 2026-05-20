"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Copy, Download, Trash2, Upload, History, X, CheckCircle, AlertTriangle, 
  Search, Code, ChevronRight, ChevronDown, Globe, RefreshCw, Eye, 
  Smartphone, Settings, Link as LinkIcon, Plus, Minus, Info, Save, 
  FileText, Sparkles, Wand2, ArrowRight, Check
} from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { useToolShortcuts } from "../../../../lib/hooks/useToolShortcuts";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types & Interfaces ---
interface HreflangEntry {
  lang: string;
  url: string;
}

interface FAQEntry {
  question: string;
  answer: string;
}

interface BreadcrumbEntry {
  name: string;
  url: string;
}

interface MetaState {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords: string;
  author: string;
  themeColor: string;
  language: string;
  viewport: string;

  // Open Graph
  ogType: string;
  ogSiteName: string;
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;

  // Twitter Cards
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  twitterCreator: string;

  // Robots
  robotsIndex: "index" | "noindex";
  robotsFollow: "follow" | "nofollow";
  robotsMaxImagePreview: "none" | "standard" | "large";
  robotsNoSnippet: boolean;
  robotsNoArchive: boolean;

  // Verification
  verifyGoogle: string;
  verifyBing: string;
  verifyYandex: string;
  verifyAlexa: string;

  // Mobile App & PWAs
  appleAppId: string;
  appleAppArgument: string;
  googlePlayId: string;
  pwaManifest: string;
  appleStatusBarStyle: "default" | "black" | "black-translucent";

  // Language alternate (hreflangs)
  hreflangs: HreflangEntry[];

  // Structured Data Schema Statuses
  enableWebsiteSchema: boolean;
  enableOrgSchema: boolean;
  enableArticleSchema: boolean;
  enableFaqSchema: boolean;
  enableBreadcrumbSchema: boolean;

  // Schema Configs
  siteName: string;
  siteSearchUrl: string;
  orgName: string;
  orgLogoUrl: string;
  orgUrl: string;
  orgSocials: string; // Comma separated urls
  articleHeadline: string;
  articleAuthorName: string;
  articlePublisherName: string;
  articlePublisherLogo: string;
  articleDatePublished: string;
  articleDateModified: string;
  articleImageUrl: string;
  faqList: FAQEntry[];
  breadcrumbList: BreadcrumbEntry[];
}

interface Preset {
  name: string;
  description: string;
  icon: any;
  state: Partial<MetaState>;
}

interface HistoryItem {
  id: string;
  name: string;
  timestamp: string;
  state: MetaState;
}

// --- Initial Empty State ---
const initialMetaState: MetaState = {
  title: "",
  description: "",
  canonicalUrl: "",
  keywords: "",
  author: "",
  themeColor: "#518231",
  language: "en",
  viewport: "width=device-width, initial-scale=1.0",

  ogType: "website",
  ogSiteName: "",
  ogUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",

  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  twitterSite: "",
  twitterCreator: "",

  robotsIndex: "index",
  robotsFollow: "follow",
  robotsMaxImagePreview: "large",
  robotsNoSnippet: false,
  robotsNoArchive: false,

  verifyGoogle: "",
  verifyBing: "",
  verifyYandex: "",
  verifyAlexa: "",

  appleAppId: "",
  appleAppArgument: "",
  googlePlayId: "",
  pwaManifest: "",
  appleStatusBarStyle: "default",

  hreflangs: [],

  enableWebsiteSchema: false,
  enableOrgSchema: false,
  enableArticleSchema: false,
  enableFaqSchema: false,
  enableBreadcrumbSchema: false,

  siteName: "",
  siteSearchUrl: "",
  orgName: "",
  orgLogoUrl: "",
  orgUrl: "",
  orgSocials: "",
  articleHeadline: "",
  articleAuthorName: "",
  articlePublisherName: "",
  articlePublisherLogo: "",
  articleDatePublished: "",
  articleDateModified: "",
  articleImageUrl: "",
  faqList: [{ question: "What is this tool?", answer: "This is a premium meta tag generator." }],
  breadcrumbList: [
    { name: "Home", url: "https://example.com" },
    { name: "Blog", url: "https://example.com/blog" }
  ]
};

// --- Presets Configurations ---
const websitePresets = (currentColor: string): Preset[] => [
  {
    name: "Blog Post",
    description: "Ideal for blogs, articles, and long-form written content.",
    icon: FileText,
    state: {
      ogType: "article",
      twitterCard: "summary_large_image",
      enableArticleSchema: true,
      robotsMaxImagePreview: "large",
      title: "10 Essential Web Dev Tips for Beginners",
      description: "Discover the best web development techniques, code guidelines, and optimization hacks to jumpstart your programming career today.",
      canonicalUrl: "https://example.com/blog/web-dev-tips",
      keywords: "web dev, coding, javascript, react, html, css",
      author: "Jane Doe",
      themeColor: currentColor,
      ogTitle: "10 Essential Web Dev Tips for Beginners",
      ogDescription: "Discover the best web development techniques, code guidelines, and optimization hacks to jumpstart your programming career today.",
      ogImage: "https://example.com/images/blog-webdev.jpg",
      twitterTitle: "10 Essential Web Dev Tips for Beginners",
      twitterDescription: "Discover the best web development techniques, code guidelines, and optimization hacks to jumpstart your programming career today.",
      twitterImage: "https://example.com/images/blog-webdev.jpg",
      articleHeadline: "10 Essential Web Dev Tips for Beginners",
      articleAuthorName: "Jane Doe",
      articlePublisherName: "DevHQ Media",
      articlePublisherLogo: "https://example.com/logo.png",
      articleDatePublished: new Date().toISOString().split("T")[0],
      articleDateModified: new Date().toISOString().split("T")[0],
      articleImageUrl: "https://example.com/images/blog-webdev.jpg",
    }
  },
  {
    name: "SaaS / Web App",
    description: "Perfect for online tools, products, and subscription startups.",
    icon: Sparkles,
    state: {
      ogType: "website",
      twitterCard: "summary_large_image",
      enableWebsiteSchema: true,
      enableOrgSchema: true,
      title: "TaskFlow | Unified Workspace & Project Tracker",
      description: "Manage projects, organize sprints, and collaborate with your remote team in one fast, private workspace. Try TaskFlow free today.",
      canonicalUrl: "https://taskflow.io",
      keywords: "project tracker, workflow tracker, saas workspace, collaboration",
      themeColor: "#6366f1",
      ogTitle: "TaskFlow | Unified Workspace & Project Tracker",
      ogDescription: "Manage projects, organize sprints, and collaborate with your remote team in one fast, private workspace. Try TaskFlow free today.",
      ogImage: "https://taskflow.io/assets/og-home.png",
      twitterTitle: "TaskFlow | Unified Workspace & Project Tracker",
      twitterDescription: "Manage projects, organize sprints, and collaborate with your remote team in one fast, private workspace.",
      twitterImage: "https://taskflow.io/assets/og-home.png",
      siteName: "TaskFlow",
      siteSearchUrl: "https://taskflow.io/search?q=",
      orgName: "TaskFlow Labs Inc.",
      orgLogoUrl: "https://taskflow.io/assets/logo.png",
      orgUrl: "https://taskflow.io",
      orgSocials: "https://twitter.com/taskflow,https://linkedin.com/company/taskflow",
    }
  },
  {
    name: "E-Commerce",
    description: "Tailored for retail products, catalog indices, and storefronts.",
    icon: Smartphone,
    state: {
      ogType: "product",
      twitterCard: "summary_large_image",
      enableOrgSchema: true,
      title: "ActiveFit Wireless Earbuds - HD Sound",
      description: "Experience premium active noise cancelling, IPX7 waterproofing, and 30-hour battery life. Order ActiveFit Earbuds with free shipping.",
      canonicalUrl: "https://electrohub.com/products/activefit-earbuds",
      keywords: "noise cancelling earbuds, waterproof earphones, bluetooth audio",
      themeColor: "#059669",
      ogTitle: "ActiveFit Wireless Earbuds - HD Sound & ANC",
      ogDescription: "Experience premium active noise cancelling, IPX7 waterproofing, and 30-hour battery life. Shop ElectroHub now.",
      ogImage: "https://electrohub.com/images/earbuds-large.jpg",
      twitterTitle: "ActiveFit Wireless Earbuds - HD Sound & ANC",
      twitterDescription: "Experience premium active noise cancelling, IPX7 waterproofing, and 30-hour battery life.",
      twitterImage: "https://electrohub.com/images/earbuds-large.jpg",
      orgName: "ElectroHub Retail",
      orgLogoUrl: "https://electrohub.com/logo.png",
      orgUrl: "https://electrohub.com",
    }
  },
  {
    name: "Portfolio / Resume",
    description: "Designed for designers, engineers, writers, and freelancers.",
    icon: Eye,
    state: {
      ogType: "profile",
      twitterCard: "summary",
      title: "Alex Carter | Senior UI/UX Engineer Portfolio",
      description: "Explore the creative portfolio of Alex Carter, showcasing interactive web platforms, mobile user interfaces, and custom design systems.",
      canonicalUrl: "https://alexcarter.design",
      keywords: "ui designer portfolio, ux engineer resume, frontend developer design",
      author: "Alex Carter",
      themeColor: "#ec4899",
      ogTitle: "Alex Carter | Senior UI/UX Engineer Portfolio",
      ogDescription: "Explore the creative portfolio of Alex Carter, showcasing interactive web platforms, mobile user interfaces, and custom design systems.",
      ogImage: "https://alexcarter.design/profile-square.jpg",
      twitterTitle: "Alex Carter | UI/UX Engineer",
      twitterDescription: "Creative portfolio showcasing interactive web platforms and custom design systems.",
      twitterImage: "https://alexcarter.design/profile-square.jpg",
    }
  }
];

// --- Helper Functions ---
const getDomainName = (urlStr: string): string => {
  if (!urlStr) return "example.com";
  try {
    const url = new URL(urlStr);
    return url.hostname;
  } catch {
    // Remove protocol and trailing slashes if invalid URL
    let parsed = urlStr.replace(/(^\w+:|^)\/\//, "");
    parsed = parsed.split("/")[0];
    return parsed || "example.com";
  }
};

export function MetaTagGeneratorTool() {
  const [fields, setFields] = useState<MetaState>(initialMetaState);
  
  // UI States
  const [activeTab, setActiveTab] = useState<"basic" | "social" | "schema" | "advanced">("basic");
  const [previewTab, setPreviewTab] = useState<"google" | "facebook" | "twitter">("google");
  const [outputTab, setOutputTab] = useState<"html" | "schema">("html");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [saveName, setSaveName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Track tool usage in global history for dashboard
  useEffect(() => {
    addToGlobalHistory({ slug: "meta-tag-generator", title: "Meta Tag Generator", type: "tool" });
  }, []);

  // Load from local storage
  useEffect(() => {
    const savedFields = localStorage.getItem("meta_generator_current_fields");
    if (savedFields) {
      try {
        setFields(JSON.parse(savedFields));
      } catch (e) {
        console.error("Failed to parse current fields from localStorage");
      }
    }

    const savedHistory = localStorage.getItem("meta_generator_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history from localStorage");
      }
    }
  }, []);

  // Save fields state on change
  const updateFields = (updated: Partial<MetaState>) => {
    setFields(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem("meta_generator_current_fields", JSON.stringify(next));
      return next;
    });
  };

  const handleFieldChange = (key: keyof MetaState, value: any) => {
    updateFields({ [key]: value });
  };

  // Sync inputs (e.g. title to OG title automatically if OG title is empty)
  const syncSocialFields = () => {
    updateFields({
      ogTitle: fields.ogTitle || fields.title,
      ogDescription: fields.ogDescription || fields.description,
      ogUrl: fields.ogUrl || fields.canonicalUrl,
      twitterTitle: fields.twitterTitle || fields.title,
      twitterDescription: fields.twitterDescription || fields.description,
      twitterImage: fields.twitterImage || fields.ogImage,
      siteName: fields.siteName || fields.ogSiteName,
      articleHeadline: fields.articleHeadline || fields.title,
      articleImageUrl: fields.articleImageUrl || fields.ogImage
    });
    setSuccessMsg("Synced basic SEO values to social tags!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Pre-fill Preset
  const applyPreset = (preset: Preset) => {
    const mergedState = {
      ...initialMetaState,
      ...preset.state,
      // Retain state parameters that are independent
      verifyGoogle: fields.verifyGoogle,
      verifyBing: fields.verifyBing,
      verifyYandex: fields.verifyYandex,
      verifyAlexa: fields.verifyAlexa,
    };
    setFields(mergedState);
    localStorage.setItem("meta_generator_current_fields", JSON.stringify(mergedState));
    setSuccessMsg(`Preset "${preset.name}" applied successfully!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Reset fields
  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setFields(initialMetaState);
      localStorage.removeItem("meta_generator_current_fields");
      setSuccessMsg("Reset to empty configuration.");
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  // --- HTML Code Construction ---
  const generatedHtml = useMemo(() => {
    let code: string[] = [];

    // Basic SEO
    if (fields.title) {
      code.push(`<title>${fields.title}</title>`);
    }
    if (fields.description) {
      code.push(`<meta name="description" content="${fields.description.replace(/"/g, '&quot;')}" />`);
    }
    if (fields.keywords) {
      code.push(`<meta name="keywords" content="${fields.keywords.replace(/"/g, '&quot;')}" />`);
    }
    if (fields.canonicalUrl) {
      code.push(`<link rel="canonical" href="${fields.canonicalUrl}" />`);
    }
    if (fields.author) {
      code.push(`<meta name="author" content="${fields.author.replace(/"/g, '&quot;')}" />`);
    }
    if (fields.language) {
      code.push(`<meta http-equiv="content-language" content="${fields.language}" />`);
    }
    if (fields.themeColor) {
      code.push(`<meta name="theme-color" content="${fields.themeColor}" />`);
    }
    if (fields.viewport) {
      code.push(`<meta name="viewport" content="${fields.viewport}" />`);
    }

    // Robots
    let robotsDirectives: string[] = [];
    robotsDirectives.push(fields.robotsIndex);
    robotsDirectives.push(fields.robotsFollow);
    if (fields.robotsMaxImagePreview !== "none") {
      robotsDirectives.push(`max-image-preview:${fields.robotsMaxImagePreview}`);
    }
    if (fields.robotsNoSnippet) robotsDirectives.push("nosnippet");
    if (fields.robotsNoArchive) robotsDirectives.push("noarchive");
    
    code.push(`<meta name="robots" content="${robotsDirectives.join(', ')}" />`);

    // Verification Tags
    if (fields.verifyGoogle) {
      code.push(`<meta name="google-site-verification" content="${fields.verifyGoogle}" />`);
    }
    if (fields.verifyBing) {
      code.push(`<meta name="msvalidate.01" content="${fields.verifyBing}" />`);
    }
    if (fields.verifyYandex) {
      code.push(`<meta name="yandex-verification" content="${fields.verifyYandex}" />`);
    }
    if (fields.verifyAlexa) {
      code.push(`<meta name="alexaVerifyID" content="${fields.verifyAlexa}" />`);
    }

    // Mobile & PWAs
    if (fields.appleAppId) {
      let content = `app-id=${fields.appleAppId}`;
      if (fields.appleAppArgument) content += `, app-argument=${fields.appleAppArgument}`;
      code.push(`<meta name="apple-itunes-app" content="${content}" />`);
    }
    if (fields.googlePlayId) {
      code.push(`<meta name="google-play-app" content="app-id=${fields.googlePlayId}" />`);
    }
    if (fields.pwaManifest) {
      code.push(`<link rel="manifest" href="${fields.pwaManifest}" />`);
    }
    if (fields.appleStatusBarStyle && fields.pwaManifest) {
      code.push(`<meta name="apple-mobile-web-app-capable" content="yes" />`);
      code.push(`<meta name="apple-mobile-web-app-status-bar-style" content="${fields.appleStatusBarStyle}" />`);
    }

    // Hreflang alternate links
    fields.hreflangs.forEach((entry) => {
      if (entry.lang && entry.url) {
        code.push(`<link rel="alternate" hreflang="${entry.lang}" href="${entry.url}" />`);
      }
    });

    // Open Graph
    if (fields.ogType || fields.ogTitle || fields.ogDescription || fields.ogImage) {
      code.push(`<!-- Open Graph / Facebook -->`);
      code.push(`<meta property="og:type" content="${fields.ogType}" />`);
      if (fields.ogTitle || fields.title) {
        code.push(`<meta property="og:title" content="${fields.ogTitle || fields.title}" />`);
      }
      if (fields.ogDescription || fields.description) {
        code.push(`<meta property="og:description" content="${(fields.ogDescription || fields.description).replace(/"/g, '&quot;')}" />`);
      }
      if (fields.ogImage) {
        code.push(`<meta property="og:image" content="${fields.ogImage}" />`);
      }
      if (fields.ogUrl || fields.canonicalUrl) {
        code.push(`<meta property="og:url" content="${fields.ogUrl || fields.canonicalUrl}" />`);
      }
      if (fields.ogSiteName) {
        code.push(`<meta property="og:site_name" content="${fields.ogSiteName.replace(/"/g, '&quot;')}" />`);
      }
    }

    // Twitter Card
    if (fields.twitterCard || fields.twitterTitle || fields.twitterDescription || fields.twitterImage) {
      code.push(`<!-- Twitter -->`);
      code.push(`<meta name="twitter:card" content="${fields.twitterCard}" />`);
      if (fields.twitterTitle || fields.title) {
        code.push(`<meta name="twitter:title" content="${fields.twitterTitle || fields.title}" />`);
      }
      if (fields.twitterDescription || fields.description) {
        code.push(`<meta name="twitter:description" content="${(fields.twitterDescription || fields.description).replace(/"/g, '&quot;')}" />`);
      }
      if (fields.twitterImage || fields.ogImage) {
        code.push(`<meta name="twitter:image" content="${fields.twitterImage || fields.ogImage}" />`);
      }
      if (fields.twitterSite) {
        code.push(`<meta name="twitter:site" content="${fields.twitterSite}" />`);
      }
      if (fields.twitterCreator) {
        code.push(`<meta name="twitter:creator" content="${fields.twitterCreator}" />`);
      }
    }

    return code.join("\n");
  }, [fields]);

  // --- JSON-LD Schema Construction ---
  const generatedSchema = useMemo(() => {
    const schemas: any[] = [];

    // 1) WebSite Schema
    if (fields.enableWebsiteSchema) {
      const siteSchema: any = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": fields.siteName || fields.title || "My WebSite",
        "url": fields.canonicalUrl || "https://example.com"
      };
      if (fields.siteSearchUrl) {
        siteSchema.potentialAction = {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${fields.siteSearchUrl}{search_term_string}`
          },
          "query-input": "required name=search_term_string"
        };
      }
      schemas.push(siteSchema);
    }

    // 2) Organization Schema
    if (fields.enableOrgSchema) {
      const orgSchema: any = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": fields.orgName || "My Organization",
        "url": fields.orgUrl || fields.canonicalUrl || "https://example.com"
      };
      if (fields.orgLogoUrl) orgSchema.logo = fields.orgLogoUrl;
      if (fields.orgSocials) {
        orgSchema.sameAs = fields.orgSocials.split(",").map(u => u.trim()).filter(u => u.length > 0);
      }
      schemas.push(orgSchema);
    }

    // 3) Article Schema
    if (fields.enableArticleSchema) {
      const articleSchema: any = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": fields.articleHeadline || fields.title || "Article Headline",
        "datePublished": fields.articleDatePublished || new Date().toISOString().split("T")[0],
        "dateModified": fields.articleDateModified || new Date().toISOString().split("T")[0],
        "author": {
          "@type": "Person",
          "name": fields.articleAuthorName || fields.author || "Author Name"
        }
      };
      if (fields.articleImageUrl || fields.ogImage) {
        articleSchema.image = [fields.articleImageUrl || fields.ogImage];
      }
      if (fields.articlePublisherName) {
        articleSchema.publisher = {
          "@type": "Organization",
          "name": fields.articlePublisherName,
          "logo": {
            "@type": "ImageObject",
            "url": fields.articlePublisherLogo || fields.orgLogoUrl || "https://example.com/logo.png"
          }
        };
      }
      schemas.push(articleSchema);
    }

    // 4) FAQ Schema
    if (fields.enableFaqSchema && fields.faqList.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": fields.faqList.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      schemas.push(faqSchema);
    }

    // 5) Breadcrumb Schema
    if (fields.enableBreadcrumbSchema && fields.breadcrumbList.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": fields.breadcrumbList.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
      schemas.push(breadcrumbSchema);
    }

    if (schemas.length === 0) return "";
    
    // Format JSON blocks cleanly wrapped in <script> blocks
    return schemas.map(schema => {
      return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
    }).join("\n\n");
  }, [fields]);

  // --- SEO Score Calculation & Recommendations ---
  const seoAnalytics = useMemo(() => {
    let score = 0;
    const warnings: string[] = [];
    const successes: string[] = [];

    // Title Check
    if (fields.title) {
      score += 15;
      const len = fields.title.length;
      if (len >= 50 && len <= 60) {
        score += 10;
        successes.push("Title length is optimal (50-60 characters).");
      } else {
        score += 5;
        warnings.push(`Title tag is ${len} characters. Keep it between 50-60 characters for best Google styling.`);
      }
    } else {
      warnings.push("Page Title tag is missing. (Critical SEO Impact)");
    }

    // Description Check
    if (fields.description) {
      score += 15;
      const len = fields.description.length;
      if (len >= 120 && len <= 160) {
        score += 10;
        successes.push("Meta description length is optimal (120-160 characters).");
      } else {
        score += 5;
        warnings.push(`Meta description is ${len} characters. Keep it between 120-160 characters to prevent truncation.`);
      }
    } else {
      warnings.push("Meta Description is missing. (Critical SEO Impact)");
    }

    // Canonical Check
    if (fields.canonicalUrl) {
      score += 10;
      successes.push("Canonical link is configured properly.");
    } else {
      warnings.push("Canonical URL is missing. You risk search index bloat with duplicate links.");
    }

    // Keywords Check
    if (fields.keywords) {
      score += 5;
    }

    // Robots Check
    score += 5; // Directives always added defaults to index/follow

    // Social Media Open Graph (OG) Check
    if (fields.ogTitle || fields.ogDescription || fields.ogImage) {
      score += 10;
      if (!fields.ogImage) {
        warnings.push("Open Graph image URL is missing. Posts on Facebook/LinkedIn will have no preview card image.");
      } else {
        successes.push("Open Graph social tags are populated.");
      }
    } else {
      warnings.push("Social media Open Graph metadata is missing.");
    }

    // Twitter Card Check
    if (fields.twitterCard && (fields.twitterTitle || fields.twitterImage)) {
      score += 5;
      successes.push("Twitter Cards are configured.");
    } else {
      warnings.push("Twitter card metadata is missing.");
    }

    // Structured Data Check
    if (fields.enableWebsiteSchema || fields.enableOrgSchema || fields.enableArticleSchema || fields.enableFaqSchema || fields.enableBreadcrumbSchema) {
      score += 15;
      successes.push("JSON-LD structured schema script is enabled.");
    } else {
      warnings.push("No JSON-LD structured schemas are enabled. Consider adding Website or FAQ schema for Rich Snippet styling.");
    }

    // Hreflang Check
    if (fields.hreflangs.length > 0) {
      score += 5;
      successes.push("Hreflang language alternates configured.");
    }

    return {
      score: Math.min(score, 100),
      warnings,
      successes
    };
  }, [fields]);

  // --- Copy & Download Actions ---
  const handleCopy = () => {
    const textToCopy = outputTab === "html" ? generatedHtml : generatedSchema;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setSuccessMsg("Copied code to clipboard!");
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleDownload = () => {
    const textToDownload = outputTab === "html" ? generatedHtml : generatedSchema;
    if (!textToDownload) return;
    const blob = new Blob([textToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputTab === "html" ? "meta-tags.html" : "schema-structured-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSuccessMsg("Downloaded successfully!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // --- Session History Functions ---
  const handleSaveConfig = () => {
    if (!saveName.trim()) return;
    const item: HistoryItem = {
      id: Date.now().toString(),
      name: saveName.trim(),
      timestamp: new Date().toLocaleString(),
      state: fields
    };
    const nextHistory = [item, ...history].slice(0, 15);
    setHistory(nextHistory);
    localStorage.setItem("meta_generator_history", JSON.stringify(nextHistory));
    setSaveName("");
    setShowSaveModal(false);
    setSuccessMsg("Configuration saved to history!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setFields(item.state);
    localStorage.setItem("meta_generator_current_fields", JSON.stringify(item.state));
    setSuccessMsg(`Restored config: "${item.name}"`);
    setShowHistory(false);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextHistory = history.filter(item => item.id !== id);
    setHistory(nextHistory);
    localStorage.setItem("meta_generator_history", JSON.stringify(nextHistory));
  };

  // --- Import/Export JSON Configuration ---
  const handleExportState = () => {
    const jsonStr = JSON.stringify(fields, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meta-tag-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        if (event.target?.result) {
          const parsed = JSON.parse(event.target.result as string);
          // Check for core properties to validate config compatibility
          if (parsed && typeof parsed === "object" && "title" in parsed && "description" in parsed) {
            // Merge with initial empty state for safety in case of missing keys
            const merged = { ...initialMetaState, ...parsed };
            setFields(merged);
            localStorage.setItem("meta_generator_current_fields", JSON.stringify(merged));
            setSuccessMsg("Configuration imported successfully!");
          } else {
            alert("Invalid configuration file format.");
          }
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // reset
  };

  // --- Form List Manipulation ---
  const addHreflang = () => {
    updateFields({ hreflangs: [...fields.hreflangs, { lang: "", url: "" }] });
  };

  const removeHreflang = (index: number) => {
    const next = [...fields.hreflangs];
    next.splice(index, 1);
    updateFields({ hreflangs: next });
  };

  const updateHreflang = (index: number, key: keyof HreflangEntry, val: string) => {
    const next = [...fields.hreflangs];
    next[index] = { ...next[index], [key]: val };
    updateFields({ hreflangs: next });
  };

  const addFaq = () => {
    updateFields({ faqList: [...fields.faqList, { question: "", answer: "" }] });
  };

  const removeFaq = (index: number) => {
    const next = [...fields.faqList];
    next.splice(index, 1);
    updateFields({ faqList: next });
  };

  const updateFaq = (index: number, key: keyof FAQEntry, val: string) => {
    const next = [...fields.faqList];
    next[index] = { ...next[index], [key]: val };
    updateFields({ faqList: next });
  };

  const addBreadcrumb = () => {
    updateFields({ breadcrumbList: [...fields.breadcrumbList, { name: "", url: "" }] });
  };

  const removeBreadcrumb = (index: number) => {
    const next = [...fields.breadcrumbList];
    next.splice(index, 1);
    updateFields({ breadcrumbList: next });
  };

  const updateBreadcrumb = (index: number, key: keyof BreadcrumbEntry, val: string) => {
    const next = [...fields.breadcrumbList];
    next[index] = { ...next[index], [key]: val };
    updateFields({ breadcrumbList: next });
  };

  // Keyboard Shortcuts Configuration
  const shortcuts = useMemo(() => [
    { key: "s", ctrl: true, action: () => setShowSaveModal(true), label: "Save Config to History" },
    { key: "e", ctrl: true, action: handleExportState, label: "Export Config JSON" },
    { key: "c", ctrl: true, shift: true, action: handleCopy, label: "Copy Generated Code" },
  ], [fields, outputTab, generatedHtml, generatedSchema]);

  useToolShortcuts(shortcuts);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* 1. TOP MENU / CONTROLS PANEL */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Preset Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Sparkles size={14} className="text-[#518231]" /> Presets:</span>
          <div className="flex flex-wrap gap-2">
            {websitePresets(fields.themeColor).map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
                  title={preset.description}
                >
                  <Icon size={12} className="text-[#518231]" /> {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-end xl:self-auto">
          <button 
            onClick={syncSocialFields}
            className="px-3 py-2 bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Sync SEO inputs into Social tags & Schema headings"
          >
            <RefreshCw size={14} /> Sync Social Tags
          </button>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>

          <label className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors flex items-center gap-1 text-xs font-semibold" title="Import JSON Config">
            <Upload size={16} /> Import
            <input type="file" accept=".json" className="hidden" onChange={handleImportState} />
          </label>

          <button 
            onClick={handleExportState} 
            className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold" 
            title="Export config to JSON file"
          >
            <Download size={16} /> Export JSON
          </button>

          <button 
            onClick={() => setShowHistory(!showHistory)} 
            className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold ${showHistory ? 'bg-green-50 text-[#518231] dark:bg-green-950/30' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            <History size={16} /> History ({history.length})
          </button>

          <button 
            onClick={() => setShowSaveModal(true)} 
            className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Save current config"
          >
            <Save size={16} /> Save State
          </button>

          <button 
            onClick={handleReset} 
            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* 2. HISTORY SLIDEOUT / PANEL */}
      {showHistory && (
        <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-inner relative animate-in slide-in-from-top-2 duration-200">
          <button onClick={() => setShowHistory(false)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"><X size={16} /></button>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2"><History size={16} className="text-[#518231]" /> Generation History</h3>
          {history.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No saved metadata sessions. Save your configurations to recall them quickly.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#518231] cursor-pointer flex flex-col justify-between group transition-all"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate pr-4">{item.name}</h4>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{item.state.title || "Untitled"}</p>
                  </div>
                  <button 
                    onClick={(e) => deleteHistoryItem(item.id, e)}
                    className="self-end mt-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete item"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. ALERTS PANEL */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-850 dark:text-green-300 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold shadow-sm animate-in fade-in">
          <CheckCircle size={16} /> {successMsg}
        </div>
      )}

      {/* 4. MAIN INTERACTIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: CONFIGURATION INPUTS (58% / Col span 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col">
          
          {/* Tab Header */}
          <div className="flex bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
            {[
              { id: "basic", label: "Basic SEO", icon: Globe },
              { id: "social", label: "Social Cards", icon: Eye },
              { id: "schema", label: "JSON-LD Schemas", icon: Code },
              { id: "advanced", label: "Advanced & App", icon: Settings }
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-[#518231] text-[#518231] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  <TabIcon size={14} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-6">

            {/* TAB 1: BASIC SEO */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                
                {/* Title */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Page Title</label>
                    <span className={`text-xs font-mono font-bold ${fields.title.length >= 50 && fields.title.length <= 60 ? 'text-green-600' : 'text-slate-400'}`}>
                      {fields.title.length} / 60
                    </span>
                  </div>
                  <input
                    type="text"
                    value={fields.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    placeholder="e.g. My Website - Home"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Recommended length: 50-60 characters for proper Google search styling.</p>
                </div>

                {/* Description */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Meta Description</label>
                    <span className={`text-xs font-mono font-bold ${fields.description.length >= 120 && fields.description.length <= 160 ? 'text-green-600' : 'text-slate-400'}`}>
                      {fields.description.length} / 160
                    </span>
                  </div>
                  <textarea
                    value={fields.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    placeholder="Brief summary of the page contents..."
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Recommended length: 120-160 characters. Highlights search queries.</p>
                </div>

                {/* Canonical URL */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Canonical URL</label>
                  <input
                    type="url"
                    value={fields.canonicalUrl}
                    onChange={(e) => handleFieldChange("canonicalUrl", e.target.value)}
                    placeholder="https://nexuscalculator.net/tools/meta-tag-generator"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Directs crawlers to the authoritative version of this link.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Keywords */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Keywords</label>
                    <input
                      type="text"
                      value={fields.keywords}
                      onChange={(e) => handleFieldChange("keywords", e.target.value)}
                      placeholder="calculator, dev tools, seo"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Author / Publisher</label>
                    <input
                      type="text"
                      value={fields.author}
                      onChange={(e) => handleFieldChange("author", e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Language */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Content Language</label>
                    <input
                      type="text"
                      value={fields.language}
                      onChange={(e) => handleFieldChange("language", e.target.value)}
                      placeholder="en"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>

                  {/* Theme Color */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1 font-mono">Theme Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={fields.themeColor}
                        onChange={(e) => handleFieldChange("themeColor", e.target.value)}
                        className="w-10 h-10 border-0 bg-transparent cursor-pointer rounded overflow-hidden p-0"
                      />
                      <input
                        type="text"
                        value={fields.themeColor}
                        onChange={(e) => handleFieldChange("themeColor", e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-2 py-2 text-sm focus:outline-none focus:border-[#518231] dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Viewport */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Viewport Settings</label>
                    <input
                      type="text"
                      value={fields.viewport}
                      onChange={(e) => handleFieldChange("viewport", e.target.value)}
                      placeholder="width=device-width..."
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: SOCIAL SHARE */}
            {activeTab === "social" && (
              <div className="space-y-6">
                
                {/* FB / General Open Graph */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-6 space-y-4">
                  <h3 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><Eye size={16} /> Facebook & Open Graph (OG)</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">OG Type</label>
                      <select
                        value={fields.ogType}
                        onChange={(e) => handleFieldChange("ogType", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white dark:bg-slate-900 cursor-pointer"
                      >
                        <option value="website">website</option>
                        <option value="article">article</option>
                        <option value="product">product</option>
                        <option value="profile">profile</option>
                        <option value="book">book</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Site Name</label>
                      <input
                        type="text"
                        value={fields.ogSiteName}
                        onChange={(e) => handleFieldChange("ogSiteName", e.target.value)}
                        placeholder="My Platform"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">OG Title</label>
                    <input
                      type="text"
                      value={fields.ogTitle}
                      onChange={(e) => handleFieldChange("ogTitle", e.target.value)}
                      placeholder={fields.title || "Headline to display..."}
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">OG Description</label>
                    <textarea
                      value={fields.ogDescription}
                      onChange={(e) => handleFieldChange("ogDescription", e.target.value)}
                      placeholder={fields.description || "Brief engaging summary..."}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">OG Image URL</label>
                    <input
                      type="url"
                      value={fields.ogImage}
                      onChange={(e) => handleFieldChange("ogImage", e.target.value)}
                      placeholder="https://example.com/assets/og-preview.png"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Widescreen aspect ratio (1200 x 630 px) is highly recommended for Facebook cards.</p>
                  </div>
                </div>

                {/* Twitter Cards */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><Eye size={16} /> Twitter / X Card</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Twitter Card Style</label>
                      <select
                        value={fields.twitterCard}
                        onChange={(e) => handleFieldChange("twitterCard", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white dark:bg-slate-900 cursor-pointer"
                      >
                        <option value="summary_large_image">summary_large_image (Large banner)</option>
                        <option value="summary">summary (Square thumbnail)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Twitter Site Creator @username</label>
                      <input
                        type="text"
                        value={fields.twitterSite}
                        onChange={(e) => handleFieldChange("twitterSite", e.target.value)}
                        placeholder="@mybrand"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Twitter Card Title</label>
                    <input
                      type="text"
                      value={fields.twitterTitle}
                      onChange={(e) => handleFieldChange("twitterTitle", e.target.value)}
                      placeholder={fields.ogTitle || fields.title || "Custom card title..."}
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Twitter Card Description</label>
                    <textarea
                      value={fields.twitterDescription}
                      onChange={(e) => handleFieldChange("twitterDescription", e.target.value)}
                      placeholder={fields.ogDescription || fields.description || "Brief card summary..."}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Twitter Card Image URL</label>
                    <input
                      type="url"
                      value={fields.twitterImage}
                      onChange={(e) => handleFieldChange("twitterImage", e.target.value)}
                      placeholder={fields.ogImage || "https://example.com/assets/card-preview.png"}
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: JSON-LD SCHEMAS */}
            {activeTab === "schema" && (
              <div className="space-y-6">
                
                {/* Schema Toggles */}
                <div className="bg-slate-50 dark:bg-slate-800/20 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: "enableWebsiteSchema", label: "WebSite Schema" },
                    { id: "enableOrgSchema", label: "Organization Schema" },
                    { id: "enableArticleSchema", label: "Article/Post Schema" },
                    { id: "enableFaqSchema", label: "FAQ Page Schema" },
                    { id: "enableBreadcrumbSchema", label: "Breadcrumb Schema" }
                  ].map(schema => (
                    <label key={schema.id} className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fields[schema.id as keyof MetaState] as boolean}
                        onChange={(e) => handleFieldChange(schema.id as keyof MetaState, e.target.checked)}
                        className="w-4 h-4 accent-[#518231] cursor-pointer"
                      />
                      {schema.label}
                    </label>
                  ))}
                </div>

                {/* 1) Website Config */}
                {fields.enableWebsiteSchema && (
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <h4 className="font-bold text-sm text-[#518231]">WebSite Schema Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Site Title</label>
                        <input
                          type="text"
                          value={fields.siteName}
                          onChange={(e) => handleFieldChange("siteName", e.target.value)}
                          placeholder={fields.ogSiteName || fields.title || "My WebSite"}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1 font-mono">Google Site Search URL Query</label>
                        <input
                          type="url"
                          value={fields.siteSearchUrl}
                          onChange={(e) => handleFieldChange("siteSearchUrl", e.target.value)}
                          placeholder="https://example.com/search?q="
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2) Org Config */}
                {fields.enableOrgSchema && (
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <h4 className="font-bold text-sm text-[#518231]">Organization Schema Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Company / Organization Name</label>
                        <input
                          type="text"
                          value={fields.orgName}
                          onChange={(e) => handleFieldChange("orgName", e.target.value)}
                          placeholder="Acme Co"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Logo URL</label>
                        <input
                          type="url"
                          value={fields.orgLogoUrl}
                          onChange={(e) => handleFieldChange("orgLogoUrl", e.target.value)}
                          placeholder="https://example.com/assets/logo.png"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Organization URL</label>
                      <input
                        type="url"
                        value={fields.orgUrl}
                        onChange={(e) => handleFieldChange("orgUrl", e.target.value)}
                        placeholder="https://acme.com"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Social Profiles (Comma Separated)</label>
                      <input
                        type="text"
                        value={fields.orgSocials}
                        onChange={(e) => handleFieldChange("orgSocials", e.target.value)}
                        placeholder="https://twitter.com/acme, https://facebook.com/acme"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 3) Article Config */}
                {fields.enableArticleSchema && (
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <h4 className="font-bold text-sm text-[#518231]">Article Schema Configuration</h4>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Headline</label>
                      <input
                        type="text"
                        value={fields.articleHeadline}
                        onChange={(e) => handleFieldChange("articleHeadline", e.target.value)}
                        placeholder={fields.title || "The headline of your post..."}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Author Name</label>
                        <input
                          type="text"
                          value={fields.articleAuthorName}
                          onChange={(e) => handleFieldChange("articleAuthorName", e.target.value)}
                          placeholder={fields.author || "Jane Doe"}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Publisher Agency Name</label>
                        <input
                          type="text"
                          value={fields.articlePublisherName}
                          onChange={(e) => handleFieldChange("articlePublisherName", e.target.value)}
                          placeholder={fields.orgName || "Acme Media"}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Date Published</label>
                        <input
                          type="date"
                          value={fields.articleDatePublished}
                          onChange={(e) => handleFieldChange("articleDatePublished", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Date Modified</label>
                        <input
                          type="date"
                          value={fields.articleDateModified}
                          onChange={(e) => handleFieldChange("articleDateModified", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4) FAQ Config */}
                {fields.enableFaqSchema && (
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-[#518231]">FAQ Schema List</h4>
                      <button onClick={addFaq} className="text-xs bg-[#518231] hover:bg-[#436a28] text-white px-3 py-1 rounded-lg flex items-center gap-1 font-bold transition-colors">
                        <Plus size={12} /> Add FAQ
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {fields.faqList.map((faq, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 relative space-y-2 animate-in fade-in">
                          <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><X size={14} /></button>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400">Question #{index + 1}</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => updateFaq(index, "question", e.target.value)}
                              placeholder="e.g. Is this platform free?"
                              className="w-full bg-white border border-slate-250 dark:bg-slate-900 dark:border-slate-850 rounded-lg px-3 py-1.5 text-xs focus:outline-none mt-0.5"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400">Answer</label>
                            <textarea
                              value={faq.answer}
                              onChange={(e) => updateFaq(index, "answer", e.target.value)}
                              placeholder="e.g. Yes! Absolutely free."
                              rows={2}
                              className="w-full bg-white border border-slate-250 dark:bg-slate-900 dark:border-slate-850 rounded-lg px-3 py-1.5 text-xs focus:outline-none mt-0.5"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5) Breadcrumb Config */}
                {fields.enableBreadcrumbSchema && (
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-[#518231]">Breadcrumb Path List</h4>
                      <button onClick={addBreadcrumb} className="text-xs bg-[#518231] hover:bg-[#436a28] text-white px-3 py-1 rounded-lg flex items-center gap-1 font-bold transition-colors">
                        <Plus size={12} /> Add Item
                      </button>
                    </div>

                    <div className="space-y-2">
                      {fields.breadcrumbList.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 relative pr-8 animate-in fade-in">
                          <button onClick={() => removeBreadcrumb(index)} className="absolute right-2 text-slate-400 hover:text-red-500"><X size={14} /></button>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateBreadcrumb(index, "name", e.target.value)}
                              placeholder="Label (e.g. Home)"
                              className="w-full bg-white border border-slate-250 dark:bg-slate-900 dark:border-slate-850 rounded-lg px-2 py-1 text-xs focus:outline-none"
                            />
                          </div>
                          <div className="flex-[2]">
                            <input
                              type="url"
                              value={item.url}
                              onChange={(e) => updateBreadcrumb(index, "url", e.target.value)}
                              placeholder="https://..."
                              className="w-full bg-white border border-slate-250 dark:bg-slate-900 dark:border-slate-850 rounded-lg px-2 py-1 text-xs focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 4: ADVANCED & APP */}
            {activeTab === "advanced" && (
              <div className="space-y-6">

                {/* Robots Directives */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-6 space-y-4">
                  <h3 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><Settings size={16} /> Robots.txt & Crawler Directives</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Indexation Status</label>
                      <div className="flex gap-2">
                        {["index", "noindex"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleFieldChange("robotsIndex", opt as any)}
                            className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-colors ${fields.robotsIndex === opt ? 'bg-[#518231] text-white border-[#436a28]' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Link Follow directive</label>
                      <div className="flex gap-2">
                        {["follow", "nofollow"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleFieldChange("robotsFollow", opt as any)}
                            className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-colors ${fields.robotsFollow === opt ? 'bg-[#518231] text-white border-[#436a28]' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Max Image Preview</label>
                      <select
                        value={fields.robotsMaxImagePreview}
                        onChange={(e) => handleFieldChange("robotsMaxImagePreview", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
                      >
                        <option value="none">none</option>
                        <option value="standard">standard</option>
                        <option value="large">large (Widescreen Google Discover)</option>
                      </select>
                    </div>

                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-400 cursor-pointer pt-6">
                      <input
                        type="checkbox"
                        checked={fields.robotsNoSnippet}
                        onChange={(e) => handleFieldChange("robotsNoSnippet", e.target.checked)}
                        className="w-4 h-4 accent-[#518231] cursor-pointer"
                      />
                      No Snippet (No description text)
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-400 cursor-pointer pt-6">
                      <input
                        type="checkbox"
                        checked={fields.robotsNoArchive}
                        onChange={(e) => handleFieldChange("robotsNoArchive", e.target.checked)}
                        className="w-4 h-4 accent-[#518231] cursor-pointer"
                      />
                      No Archive (No Google Cache)
                    </label>
                  </div>
                </div>

                {/* Hreflang Configuration */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><Globe size={16} /> Multi-Language Alternate Links (hreflang)</h3>
                    <button onClick={addHreflang} className="text-xs bg-[#518231] hover:bg-[#436a28] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold transition-all">
                      <Plus size={12} /> Add lang
                    </button>
                  </div>

                  <div className="space-y-2">
                    {fields.hreflangs.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 relative pr-8 animate-in fade-in">
                        <button onClick={() => removeHreflang(index)} className="absolute right-2 text-slate-400 hover:text-red-500"><X size={14} /></button>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={item.lang}
                            onChange={(e) => updateHreflang(index, "lang", e.target.value)}
                            placeholder="e.g. es, fr, x-default"
                            className="w-full bg-white border border-slate-250 dark:bg-slate-900 dark:border-slate-850 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="flex-[3]">
                          <input
                            type="url"
                            value={item.url}
                            onChange={(e) => updateHreflang(index, "url", e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-white border border-slate-250 dark:bg-slate-900 dark:border-slate-850 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile / PWA Integrations */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-6 space-y-4">
                  <h3 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><Smartphone size={16} /> Mobile Integration & PWAs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Apple iTunes App ID</label>
                      <input
                        type="text"
                        value={fields.appleAppId}
                        onChange={(e) => handleFieldChange("appleAppId", e.target.value)}
                        placeholder="app-id=123456"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Apple Custom Arguments / Deep Links</label>
                      <input
                        type="text"
                        value={fields.appleAppArgument}
                        onChange={(e) => handleFieldChange("appleAppArgument", e.target.value)}
                        placeholder="app-argument=myApp://..."
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Google Play Store ID</label>
                      <input
                        type="text"
                        value={fields.googlePlayId}
                        onChange={(e) => handleFieldChange("googlePlayId", e.target.value)}
                        placeholder="app-id=com.myApp"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">PWA Manifest Path URL</label>
                      <input
                        type="text"
                        value={fields.pwaManifest}
                        onChange={(e) => handleFieldChange("pwaManifest", e.target.value)}
                        placeholder="/manifest.json"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">iOS status Bar Color theme</label>
                      <select
                        value={fields.appleStatusBarStyle}
                        onChange={(e) => handleFieldChange("appleStatusBarStyle", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none"
                      >
                        <option value="default">default</option>
                        <option value="black">black</option>
                        <option value="black-translucent">black-translucent</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Site Verifications */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><Settings size={16} /> Search Engine Site Verifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Google Search Console Verification Code</label>
                      <input
                        type="text"
                        value={fields.verifyGoogle}
                        onChange={(e) => handleFieldChange("verifyGoogle", e.target.value)}
                        placeholder="google123456789abc..."
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Bing Webmaster verification</label>
                      <input
                        type="text"
                        value={fields.verifyBing}
                        onChange={(e) => handleFieldChange("verifyBing", e.target.value)}
                        placeholder="A1B2C3D4E5F6..."
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Yandex verification code</label>
                      <input
                        type="text"
                        value={fields.verifyYandex}
                        onChange={(e) => handleFieldChange("verifyYandex", e.target.value)}
                        placeholder="yandex123456..."
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Alexa verify ID</label>
                      <input
                        type="text"
                        value={fields.verifyAlexa}
                        onChange={(e) => handleFieldChange("verifyAlexa", e.target.value)}
                        placeholder="alexaVerify123..."
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* RIGHT PANEL: SCORE, SIMULATIONS & CODE VIEW (42% / Col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* A. SEO SCORE INDICATOR */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-4">SEO Metadata Strength</h3>
            
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              {/* Radial Circle Strength representation */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="34" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="6" fill="transparent" />
                  <circle 
                    cx="40" cy="40" r="34" 
                    className="stroke-[#518231] transition-all duration-500" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={213.6}
                    strokeDashoffset={213.6 - (213.6 * seoAnalytics.score) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-extrabold text-lg text-slate-800 dark:text-slate-100 font-mono">{seoAnalytics.score}%</span>
              </div>

              <div>
                <div className="font-bold text-sm text-slate-800 dark:text-white">
                  {seoAnalytics.score === 100 ? '🥇 Perfect Configuration' : seoAnalytics.score >= 80 ? '🎯 Great SEO Setup' : seoAnalytics.score >= 50 ? '⚠️ Average Performance' : '❌ Incomplete Tags'}
                </div>
                <p className="text-xs text-slate-400 mt-1">Calculated in real-time based on tag presence, ideal lengths, social properties, and structured schemas.</p>
              </div>
            </div>

            {/* Checklist / Warnings */}
            <div className="pt-4 max-h-[180px] overflow-y-auto space-y-2 custom-scrollbar pr-1">
              {seoAnalytics.warnings.map((warn, i) => (
                <div key={i} className="flex gap-2 items-start text-xs text-amber-700 dark:text-amber-400 font-medium">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-500" />
                  <span>{warn}</span>
                </div>
              ))}
              {seoAnalytics.warnings.length === 0 && (
                <div className="flex gap-2 items-center text-xs text-green-700 dark:text-green-400 font-bold">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Excellent! All recommended meta tags are filled correctly.</span>
                </div>
              )}
            </div>
          </div>

          {/* B. SOCIAL PREVIEW SIMULATIONS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            
            {/* Header switcher */}
            <div className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-700 dark:text-slate-400 uppercase tracking-wider">Live Previews</span>
              <div className="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-0.5">
                {[
                  { id: "google", label: "Google" },
                  { id: "facebook", label: "Facebook" },
                  { id: "twitter", label: "X" }
                ].map(preview => (
                  <button
                    key={preview.id}
                    onClick={() => setPreviewTab(preview.id as any)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors ${previewTab === preview.id ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                    {preview.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Canvas */}
            <div className="p-6 bg-slate-100/50 dark:bg-slate-950/20 min-h-[190px] flex items-center justify-center">
              
              {/* GOOGLE SIMULATION */}
              {previewTab === "google" && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 w-full font-sans max-w-lg shadow-sm text-left">
                  {/* URL / Breadcrumb */}
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-1 truncate font-medium">
                    <span>{getDomainName(fields.canonicalUrl || "https://example.com")}</span>
                    {fields.canonicalUrl && (
                      <>
                        <ChevronRight size={10} className="text-slate-400" />
                        <span className="truncate">{fields.canonicalUrl.replace(/https?:\/\/[^\/]+\/?/, "")}</span>
                      </>
                    )}
                  </div>
                  {/* Title */}
                  <h4 className="text-lg text-blue-700 hover:underline cursor-pointer font-medium leading-snug line-clamp-1 mb-1 dark:text-blue-400">
                    {fields.title || "My Web Page Title"}
                  </h4>
                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal line-clamp-2">
                    {fields.description || "Enter a meta description to simulate the search snippet display. Google will display this text to describe your webpage."}
                  </p>
                </div>
              )}

              {/* FACEBOOK SIMULATION */}
              {previewTab === "facebook" && (
                <div className="bg-white dark:bg-[#242526] border border-slate-200 dark:border-[#3e4042] rounded-xl overflow-hidden w-full max-w-sm shadow-sm text-left">
                  {/* Post top header mock */}
                  <div className="p-3 flex items-center gap-2 border-b border-slate-100 dark:border-[#3e4042]">
                    <div className="w-8 h-8 rounded-full bg-[#518231] text-white flex items-center justify-center font-bold text-xs">NC</div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-250">Nexus Calculator</div>
                      <div className="text-[9px] text-slate-400">Just now · 🌐</div>
                    </div>
                  </div>
                  
                  {/* Card Widescreen image */}
                  <div className="relative aspect-[1.91/1] bg-slate-200 dark:bg-slate-800 w-full overflow-hidden flex items-center justify-center">
                    {fields.ogImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={fields.ogImage} alt="Social share preview" className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = "https://placehold.co/600x315/f8fafc/64748b?text=Invalid+Image+URL"; }} />
                    ) : (
                      <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center gap-1.5 p-4">
                        <Eye size={28} />
                        <span className="text-[10px] uppercase font-bold tracking-wider">No Image Preview URL</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Metadata fields card */}
                  <div className="p-3 bg-slate-100 dark:bg-[#2f3031]">
                    <span className="text-[10px] text-slate-500 uppercase font-mono">{getDomainName(fields.ogUrl || fields.canonicalUrl).toUpperCase()}</span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 line-clamp-1">
                      {fields.ogTitle || fields.title || "My Web Page Title"}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1.5 mt-0.5">
                      {fields.ogDescription || fields.description || "Enter an Open Graph description to customize this social link preview card."}
                    </p>
                  </div>
                </div>
              )}

              {/* TWITTER SIMULATION */}
              {previewTab === "twitter" && (
                <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden w-full max-w-sm shadow-sm text-left">
                  {/* Header Author info */}
                  <div className="p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs dark:bg-white dark:text-black">X</div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Brand account</div>
                      <div className="text-[10px] text-slate-400">@nexus_calc</div>
                    </div>
                  </div>
                  
                  {fields.twitterCard === "summary_large_image" ? (
                    /* Large Banner Format */
                    <div className="border border-slate-200 dark:border-slate-800 mx-3 mb-3 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950">
                      <div className="relative aspect-[1.91/1] bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                        {(fields.twitterImage || fields.ogImage) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={fields.twitterImage || fields.ogImage} alt="Twitter card preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center gap-1 p-4">
                            <Eye size={24} />
                            <span className="text-[9px] uppercase font-bold tracking-wider">No Image URL</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                        <span className="text-[10px] text-slate-400">{getDomainName(fields.canonicalUrl)}</span>
                        <h4 className="font-bold text-slate-850 dark:text-slate-200 line-clamp-1 mt-0.5">{fields.twitterTitle || fields.title || "My Web Page Title"}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{fields.twitterDescription || fields.description || "Enter custom Twitter Card parameters to preview."}</p>
                      </div>
                    </div>
                  ) : (
                    /* Square Summary Thumbnail Format */
                    <div className="border border-slate-200 dark:border-slate-800 mx-3 mb-3 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-stretch h-20">
                      <div className="w-20 bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        {(fields.twitterImage || fields.ogImage) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={fields.twitterImage || fields.ogImage} alt="Twitter card preview" className="w-full h-full object-cover" />
                        ) : (
                          <Eye size={16} className="text-slate-400" />
                        )}
                      </div>
                      <div className="p-2 border-l border-slate-200 dark:border-slate-800 flex-1 min-w-0 text-xs justify-center flex flex-col">
                        <span className="text-[9px] text-slate-400">{getDomainName(fields.canonicalUrl)}</span>
                        <h4 className="font-bold text-slate-850 dark:text-slate-200 truncate mt-0.5">{fields.twitterTitle || fields.title || "My Web Page Title"}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{fields.twitterDescription || fields.description || "Enter custom Twitter Card parameters."}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* C. GENERATED CODE DISPLAY */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-md flex-1 flex flex-col min-h-[350px]">
            
            {/* Header selector */}
            <div className="bg-slate-950 border-b border-slate-850 px-4 py-2 flex items-center justify-between">
              <div className="flex gap-2">
                {[
                  { id: "html", label: "HTML Meta Tags", count: generatedHtml.split("\n").filter(Boolean).length },
                  { id: "schema", label: "JSON-LD Schema", count: generatedSchema ? 1 : 0 }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setOutputTab(tab.id as any)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${outputTab === tab.id ? 'bg-[#518231] text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {tab.label} <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded-full font-mono">{tab.count}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopy} 
                  disabled={outputTab === "html" ? !generatedHtml : !generatedSchema}
                  className="p-1.5 text-slate-400 hover:text-white disabled:opacity-50 transition-colors"
                  title="Copy generated code block"
                >
                  <Copy size={16} />
                </button>
                <button 
                  onClick={handleDownload} 
                  disabled={outputTab === "html" ? !generatedHtml : !generatedSchema}
                  className="p-1.5 text-slate-400 hover:text-white disabled:opacity-50 transition-colors"
                  title="Download as File"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Code editor viewport */}
            <div className="flex-1 p-4 font-mono text-[12px] overflow-auto custom-scrollbar text-slate-350 text-left bg-slate-900 select-all selection:bg-[#518231]/30">
              {outputTab === "html" ? (
                generatedHtml ? (
                  <pre className="whitespace-pre m-0 leading-relaxed font-medium">{generatedHtml}</pre>
                ) : (
                  <div className="text-slate-500 italic h-full flex items-center justify-center font-mono">Fill in Basic SEO fields to generate HTML code.</div>
                )
              ) : (
                generatedSchema ? (
                  <pre className="whitespace-pre m-0 leading-relaxed font-medium text-emerald-400">{generatedSchema}</pre>
                ) : (
                  <div className="text-slate-500 italic h-full flex items-center justify-center font-mono">Enable schemas in the JSON-LD tab to generate structured data.</div>
                )
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 5. SAVE STATE MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-150">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-2">Save Configuration</h3>
            <p className="text-xs text-slate-500 mb-4">Give this metadata setup a custom name to save it in your local browser history.</p>
            <input 
              type="text" 
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="e.g. Acme Homepage Meta"
              className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] mb-4 dark:text-white"
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") handleSaveConfig(); }}
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => { setShowSaveModal(false); setSaveName(""); }} 
                className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-350 dark:hover:bg-slate-850 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveConfig} 
                className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl text-xs font-bold transition-colors"
              >
                Save Config
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
