import QRCode from 'qrcode';

export interface ProfileInfo {
  name: string;
  username: string;
  bio: string;
  tagline: string;
  location: string;
  website: string;
  avatarUrl: string;
  coverColor: string;
  coverImageUrl: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  color: string;
  textColor: string;
  description?: string;
  thumbnailUrl?: string;
  iconName?: string;
  isFeatured?: boolean;
  mediaType?: "link" | "youtube" | "spotify" | "announcement" | "donation" | "newsletter";
}

export interface SocialLinks {
  instagram: string;
  tiktok: string;
  youtube: string;
  facebook: string;
  twitter: string;
  threads: string;
  linkedin: string;
  pinterest: string;
  snapchat: string;
  telegram: string;
  whatsapp: string;
  discord: string;
  github: string;
  dribbble: string;
  behance: string;
  twitch: string;
  reddit: string;
}

export interface CustomStyle {
  theme: "minimal" | "modern" | "glass" | "creator" | "neon" | "dark" | "premium";
  buttonShape: "rounded" | "square" | "pill" | "gradient" | "shadow";
  fontFamily: "inter" | "roboto" | "playfair" | "space";
  borderRadius: number;
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  textColor: string;
  customCss: string;
}

export interface BioPageConfig {
  profile: ProfileInfo;
  links: LinkItem[];
  socials: SocialLinks;
  styles: CustomStyle;
  seoTitle: string;
  seoDescription: string;
}

// Brand color mapping for social links
export const SOCIAL_BRAND_META: Record<keyof SocialLinks, { color: string; label: string }> = {
  instagram: { color: "#E1306C", label: "Instagram" },
  tiktok: { color: "#000000", label: "TikTok" },
  youtube: { color: "#FF0000", label: "YouTube" },
  facebook: { color: "#1877F2", label: "Facebook" },
  twitter: { color: "#1DA1F2", label: "X / Twitter" },
  threads: { color: "#000000", label: "Threads" },
  linkedin: { color: "#0A66C2", label: "LinkedIn" },
  pinterest: { color: "#BD081C", label: "Pinterest" },
  snapchat: { color: "#FFFC00", label: "Snapchat" },
  telegram: { color: "#0088cc", label: "Telegram" },
  whatsapp: { color: "#25D366", label: "WhatsApp" },
  discord: { color: "#5865F2", label: "Discord" },
  github: { color: "#181717", label: "GitHub" },
  dribbble: { color: "#EA4C89", label: "Dribbble" },
  behance: { color: "#1769FF", label: "Behance" },
  twitch: { color: "#9146FF", label: "Twitch" },
  reddit: { color: "#FF4500", label: "Reddit" }
};

// Preset Templates Library
export const TEMPLATE_LIBRARY: Record<string, BioPageConfig> = {
  influencer: {
    profile: {
      name: "Sophia Carter",
      username: "sophiacreates",
      bio: "Lifestyle, Fashion, & Daily Vlogs. Inspiring you to live beautifully.",
      tagline: "✨ Lifestyle & Fashion Creator",
      location: "Los Angeles, CA",
      website: "sophiacarter.com",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      coverColor: "#f3e8ff",
      coverImageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    },
    links: [
      { id: "1", title: "🛍️ Shop My Outfits (LTK)", url: "https://liketoknow.it", enabled: true, color: "#E1306C", textColor: "#ffffff", isFeatured: true },
      { id: "2", title: "📺 New Vlog: Week in My Life", url: "https://youtube.com", enabled: true, color: "#FF0000", textColor: "#ffffff", mediaType: "youtube" },
      { id: "3", title: "✨ Join My Newsletter for Beauty Tips", url: "https://substack.com", enabled: true, color: "#9146FF", textColor: "#ffffff" }
    ],
    socials: {
      instagram: "sophiacreates", tiktok: "sophiacreates", youtube: "sophiacreates",
      facebook: "", twitter: "", threads: "", linkedin: "", pinterest: "",
      snapchat: "", telegram: "", whatsapp: "", discord: "", github: "",
      dribbble: "", behance: "", twitch: "", reddit: ""
    },
    styles: {
      theme: "creator", buttonShape: "pill", fontFamily: "inter", borderRadius: 24,
      backgroundColor: "#faf5ff", buttonColor: "#7c3aed", buttonTextColor: "#ffffff", textColor: "#1e1b4b",
      customCss: ""
    },
    seoTitle: "Sophia Carter | Link in Bio",
    seoDescription: "Shop my outfits, watch new vlogs, and join my beauty newsletter."
  },
  developer: {
    profile: {
      name: "Alex Rivera",
      username: "alexr_dev",
      bio: "Full Stack Engineer & Tech Writer. Building modular Next.js platforms.",
      tagline: "💻 Full Stack Developer",
      location: "San Francisco, CA",
      website: "alexrivera.dev",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      coverColor: "#0f172a",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"
    },
    links: [
      { id: "1", title: "🚀 My Open Source Components library", url: "https://github.com", enabled: true, color: "#181717", textColor: "#ffffff", isFeatured: true },
      { id: "2", title: "📝 Read My Technical Articles on Medium", url: "https://medium.com", enabled: true, color: "#000000", textColor: "#ffffff" },
      { id: "3", title: "☕ Buy Me A Coffee", url: "https://buymeacoffee.com", enabled: true, color: "#FFDD00", textColor: "#000000", mediaType: "donation" }
    ],
    socials: {
      instagram: "", tiktok: "", youtube: "", facebook: "", twitter: "alexr_dev",
      threads: "", linkedin: "alexrivera", pinterest: "", snapchat: "", telegram: "",
      whatsapp: "", discord: "alexdev#9999", github: "alexrivera", dribbble: "",
      behance: "", twitch: "", reddit: ""
    },
    styles: {
      theme: "dark", buttonShape: "rounded", fontFamily: "space", borderRadius: 8,
      backgroundColor: "#0f172a", buttonColor: "#3b82f6", buttonTextColor: "#ffffff", textColor: "#f1f5f9",
      customCss: ""
    },
    seoTitle: "Alex Rivera | Developer Link Hub",
    seoDescription: "Explore my open source packages, coding blog, and portfolio."
  },
  musician: {
    profile: {
      name: "Luna & The Eclipse",
      username: "lunaband",
      bio: "Indie Pop duo. Touring North America this fall. New single 'Midnight' out now!",
      tagline: "🎵 Indie Pop Band",
      location: "Austin, TX",
      website: "lunaeclipse.com",
      avatarUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150",
      coverColor: "#000000",
      coverImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800"
    },
    links: [
      { id: "1", title: "🎧 Stream New Single: 'Midnight'", url: "https://spotify.com", enabled: true, color: "#1DB954", textColor: "#ffffff", isFeatured: true, mediaType: "spotify" },
      { id: "2", title: "🎫 Fall Tour Tickets (Ticketmaster)", url: "https://ticketmaster.com", enabled: true, color: "#1f2937", textColor: "#ffffff" },
      { id: "3", title: "🎬 Official Music Video on YouTube", url: "https://youtube.com", enabled: true, color: "#FF0000", textColor: "#ffffff", mediaType: "youtube" }
    ],
    socials: {
      instagram: "lunaband", tiktok: "lunaband", youtube: "lunaband",
      facebook: "lunaband", twitter: "", threads: "", linkedin: "", pinterest: "",
      snapchat: "", telegram: "", whatsapp: "", discord: "", github: "",
      dribbble: "", behance: "", twitch: "", reddit: ""
    },
    styles: {
      theme: "neon", buttonShape: "square", fontFamily: "space", borderRadius: 0,
      backgroundColor: "#050505", buttonColor: "#ec4899", buttonTextColor: "#ffffff", textColor: "#f8fafc",
      customCss: ""
    },
    seoTitle: "Luna & The Eclipse | New Single & Tour Tickets",
    seoDescription: "Listen to our new single, view fall tour schedules, and watch official music clips."
  }
};

// ----------------------------------------------------
// QR Code Generator Interface
// ----------------------------------------------------
export async function generateQrCodeUrl(text: string): Promise<string> {
  try {
    const url = await QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: {
        dark: "#1e293b",
        light: "#ffffff"
      }
    });
    return url;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ----------------------------------------------------
// Dynamic HTML Compiler Engine (Self-contained Page)
// ----------------------------------------------------
export function compileStaticHtml(config: BioPageConfig): string {
  const p = config.profile;
  const s = config.styles;
  
  // Font styling mapping
  const fonts = {
    inter: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap'); font-family: 'Inter', sans-serif;",
    roboto: "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'); font-family: 'Roboto', sans-serif;",
    playfair: "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,750;1,400&display=swap'); font-family: 'Playfair Display', serif;",
    space: "@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;750&display=swap'); font-family: 'Space Mono', monospace;"
  };

  // Compile active social icons
  const activeSocials = Object.entries(config.socials)
    .filter(([_, value]) => value && value.trim().length > 0)
    .map(([key, value]) => {
      const meta = SOCIAL_BRAND_META[key as keyof SocialLinks];
      // Map platform names to lucide icons (fallback unicode mapping in simple HTML)
      return `<a href="https://${key}.com/${value}" target="_blank" rel="noopener noreferrer" class="social-icon" style="background-color: ${meta.color};" title="${meta.label}">
        <span style="color:#fff; font-weight:bold; font-size:12px;">${key.charAt(0).toUpperCase()}</span>
      </a>`;
    }).join("\n");

  // Compile Links
  const activeLinks = config.links
    .filter(link => link.enabled)
    .map(link => {
      const isFeaturedClass = link.isFeatured ? "link-card featured" : "link-card";
      let embedHtml = "";
      
      if (link.mediaType === "youtube" && link.url.includes("youtube.com")) {
        // Embed youtube link
        const vidId = link.url.split("v=")[1]?.split("&")[0] || "";
        if (vidId) {
          embedHtml = `<div class="media-embed"><iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe></div>`;
        }
      } else if (link.mediaType === "spotify" && link.url.includes("spotify.com")) {
        // Embed spotify link
        const embedUrl = link.url.replace("open.spotify.com", "open.spotify.com/embed");
        embedHtml = `<div class="media-embed"><iframe src="${embedUrl}" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
      }

      return `
      <div class="${isFeaturedClass}" style="background-color: ${link.color || s.buttonColor}; border-radius: ${s.borderRadius}px;">
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="color: ${link.textColor || s.buttonTextColor};">
          <div class="link-title">${link.title}</div>
          ${link.description ? `<div class="link-desc" style="color: ${link.textColor || s.buttonTextColor}cc;">${link.description}</div>` : ""}
        </a>
        ${embedHtml}
      </div>`;
    }).join("\n");

  // Apply Theme CSS Styles overrides
  let themeCss = "";
  if (s.theme === "glass") {
    themeCss = `
      body { background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); }
      .profile-container { background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
      .link-card { background: rgba(255, 255, 255, 0.3) !important; backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1); }
    `;
  } else if (s.theme === "neon") {
    themeCss = `
      body { background-color: #0b0f19; }
      .profile-container { border: 2px solid #3b82f6; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
      .link-card { border: 2px solid #ec4899; box-shadow: 0 0 10px rgba(236, 72, 153, 0.3); transition: all 0.3s; }
      .link-card:hover { box-shadow: 0 0 20px rgba(236, 72, 153, 0.6); }
    `;
  } else if (s.theme === "creator") {
    themeCss = `
      body { background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%); }
      .profile-container { background-color: #ffffff; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    `;
  }

  // Final HTML String
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.seoTitle || p.name}</title>
  <meta name="description" content="${config.seoDescription || p.bio}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${config.seoTitle || p.name}">
  <meta property="og:description" content="${config.seoDescription || p.bio}">
  <meta property="og:type" content="website">
  ${p.avatarUrl ? `<meta property="og:image" content="${p.avatarUrl}">` : ""}
  
  <style>
    ${fonts[s.fontFamily]}
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      background-color: ${s.backgroundColor};
      color: ${s.textColor};
      display: flex;
      justify-content: center;
      min-height: 100vh;
      padding: 20px 10px;
    }
    
    .wrapper {
      width: 100%;
      max-width: 460px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    
    .cover-banner {
      width: 100%;
      height: 110px;
      background-color: ${p.coverColor || '#cbd5e1'};
      ${p.coverImageUrl ? `background-image: url('${p.coverImageUrl}'); background-size: cover; background-position: center;` : ""}
      border-radius: 16px;
    }
    
    .profile-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px;
      border-radius: 20px;
      text-align: center;
      margin-top: -50px;
    }
    
    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      object-fit: cover;
      background-color: #cbd5e1;
    }
    
    .profile-name {
      font-size: 20px;
      font-weight: 800;
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .tagline {
      font-size: 13px;
      opacity: 0.8;
      font-weight: 500;
      margin-top: 4px;
    }
    
    .bio {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 12px;
      line-height: 1.5;
    }
    
    .location {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 6px;
    }
    
    .social-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 16px;
      width: 100%;
    }
    
    .social-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: transform 0.2s;
    }
    
    .social-icon:hover {
      transform: scale(1.1);
    }
    
    .links-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .link-card {
      width: 100%;
      padding: 16px;
      text-align: center;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
      border: 1px solid rgba(0,0,0,0.05);
    }
    
    .link-card a {
      text-decoration: none;
      display: block;
    }
    
    .link-card:hover {
      transform: translateY(-2px);
      filter: brightness(0.95);
    }
    
    .link-title {
      font-size: 15px;
      font-weight: 700;
    }
    
    .link-desc {
      font-size: 12px;
      margin-top: 4px;
      opacity: 0.9;
    }
    
    .featured {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); box-shadow: 0 0 15px rgba(0,0,0,0.1); }
      100% { transform: scale(1); }
    }
    
    .media-embed {
      margin-top: 10px;
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 16/9;
    }
    
    .media-embed iframe {
      width: 100%;
      height: 100%;
    }
    
    /* Themes CSS */
    ${themeCss}
    
    /* User Custom CSS */
    ${s.customCss}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="cover-banner"></div>
    
    <div class="profile-container">
      ${p.avatarUrl ? `<img src="${p.avatarUrl}" alt="${p.name}" class="avatar">` : `<div class="avatar"></div>`}
      <div class="profile-name">
        ${p.name}
        <span style="color:#3b82f6; font-size:14px;">✓</span>
      </div>
      ${p.tagline ? `<div class="tagline">${p.tagline}</div>` : ""}
      ${p.bio ? `<div class="bio">${p.bio}</div>` : ""}
      ${p.location ? `<div class="location">📍 ${p.location}</div>` : ""}
      
      <div class="social-grid">
        ${activeSocials}
      </div>
    </div>
    
    <div class="links-list">
      ${activeLinks}
    </div>
  </div>
</body>
</html>`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  if (typeof window === "undefined") return;
  const link = document.createElement("a");
  if (mimeType === "image/png") {
    link.href = `data:image/png;base64,${content}`;
  } else {
    const blob = new Blob([content], { type: mimeType });
    link.href = URL.createObjectURL(blob);
  }
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (mimeType !== "image/png") {
    URL.revokeObjectURL(link.href);
  }
}
