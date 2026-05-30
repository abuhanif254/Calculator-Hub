export interface Hashtag {
  name: string;
  volume: number; // Post count estimate
  competition: "low" | "medium" | "high";
  reachScore: number; // 1 - 100
  engagementScore: number; // 1.0 - 10.0
  trendScore: number; // 1 - 100
  category: string;
  tier: "trending" | "popular" | "medium" | "low" | "niche" | "longtail";
}

export type Platform = "instagram" | "tiktok";

export interface CaptionTemplate {
  title: string;
  hook: string;
  body: string;
  cta: string;
}

export interface SavedGroup {
  id: string;
  name: string;
  hashtags: string[];
  platform: Platform;
  timestamp: number;
}

// ----------------------------------------------------
// Large Category Hashtag Database
// ----------------------------------------------------
export const HASHTAG_DATABASE: Record<string, Record<string, string[]>> = {
  fitness: {
    trending: ["gymtok", "fitcheck", "fitnessmotivation", "motivationmonday", "healthgoals", "hybridathlete"],
    popular: ["fitness", "gym", "workout", "fit", "bodybuilding", "training", "exercise", "healthy"],
    medium: ["gymmotivation", "fitfam", "fitlife", "healthylifestyle", "personaltrainer", "powerlifting", "crossfit"],
    low: ["fitnessjourney", "workoutmotivation", "gymlife", "muscle", "abs", "cardio", "activewear"],
    niche: ["fitnessgoals", "homeworkouts", "glutesworkout", "strengthtraining", "cardioworkout", "fitnessaddict"],
    longtail: ["fitnessforbeginners", "naturalweightlossjourney", "getsmarterfitnesstips", "dailygymmotivationtips"]
  },
  travel: {
    trending: ["traveltok", "travelbucketlist", "wanderlust", "solotravel", "hiddengems", "roadtripvibe"],
    popular: ["travel", "photography", "adventure", "nature", "trip", "explore", "vacation", "holiday"],
    medium: ["travelgram", "instatravel", "travelblogger", "traveling", "tourist", "naturephotography", "landscape"],
    low: ["solotraveler", "travelguide", "beautifuldestinations", "backpacking", "roadtrip", "passportready"],
    niche: ["traveladdict", "wanderer", "traveltips", "budgettravel", "hiddengem", "travelphotography"],
    longtail: ["budgettraveltipsforeurope", "solofemaletravelguide", "hiddengemstraveldestinations", "bestroadtripplanner"]
  },
  food: {
    trending: ["foodtok", "easyrecipe", "mukbang", "comfortfood", "foodporn", "mealprepgoals"],
    popular: ["food", "cooking", "recipe", "delicious", "healthyfood", "yummy", "dinner", "lunch"],
    medium: ["foodie", "instafood", "foodphotography", "foodblogger", "baking", "vegan", "breakfast"],
    low: ["easyrecipes", "mealprep", "healthyrecipes", "dessert", "snack", "homecooked", "chef"],
    niche: ["veganrecipes", "glutenfreerecipes", "keto", "streetfood", "comfortfood", "quickmeals"],
    longtail: ["quickhealthydinnerideas", "easyveganmealpreptips", "glutenfreebakingforbeginners", "bestcomfortfoodrecipes"]
  },
  technology: {
    trending: ["techtok", "coolgadgets", "artificialintelligence", "developerlife", "coder", "desksetup"],
    popular: ["technology", "tech", "coding", "programming", "software", "gadgets", "innovation", "science"],
    medium: ["developer", "javascript", "python", "webdev", "artificialintelligence", "cyberspace", "computers"],
    low: ["gadgetshop", "desksetup", "futuretech", "smart-home", "appdeveloper", "coderlife", "techreview"],
    niche: ["nextjs", "reactjs", "tailwind-css", "machinelearning", "uxdesign", "hardwareupgrade"],
    longtail: ["remotewebdeveloperguide", "bestsmartgadgetsforhome", "learnpythonforbeginners", "nextjsexpertcodingtips"]
  },
  business: {
    trending: ["businesstok", "entrepreneurship", "sidehustleideas", "startupgrowth", "productivityhacks"],
    popular: ["business", "marketing", "entrepreneur", "startup", "management", "success", "work", "money"],
    medium: ["entrepreneurship", "smallbusiness", "businessowner", "hustle", "leadership", "branding", "strategy"],
    low: ["sidehustle", "startupcompany", "businessgrowth", "officevibes", "freelancing", "solopreneur"],
    niche: ["b2bmarketing", "saasgrowth", "businesstips", "consulting", "femaleentrepreneur", "agencylife"],
    longtail: ["startupgrowthstrategies2026", "howtostartasmallbusiness", "productivityhacksforcreators", "freelanceagencyscaling"]
  },
  finance: {
    trending: ["moneytok", "personalfinance", "investingforbeginners", "stockmarket", "passiveincometips"],
    popular: ["finance", "money", "investing", "stocks", "crypto", "saving", "wealth", "economy"],
    medium: ["personalfinance", "stockmarket", "realestate", "cryptocurrency", "wealthbuilding", "savingsgoals"],
    low: ["passiveincome", "budgeting", "investor", "financialfreedom", "dividendinvesting", "frugalliving"],
    niche: ["indexfunds", "realestateinvesting", "taxsaving", "financetips", "sideincome", "smartmoney"],
    longtail: ["personalfinanceforbeginners", "howtobuildpassiveincome", "bestrealestateinvestingtactics", "savingmoneytipsforstudents"]
  },
  education: {
    trending: ["learnontiktok", "studyhacks", "careeradvice", "education", "booktok", "factsweekly"],
    popular: ["education", "learning", "study", "science", "history", "knowledge", "school", "university"],
    medium: ["studygram", "studymotivation", "careertips", "languagelearning", "reading", "books", "mindset"],
    low: ["studyhacks", "careerguidance", "didyouknow", "facts", "onlinelearning", "selfimprovement", "tutoring"],
    niche: ["codingbootcamp", "academicwriting", "speedreading", "studytips", "productivity", "mentalmath"],
    longtail: ["productivitytipsforstudents", "howtoprepareforexams", "careeradviceforgraduates", "learnlanguagesfastathome"]
  },
  gaming: {
    trending: ["gamertok", "streamerlife", "gamingmemes", "funnyclips", "setupinspiration", "cosplayvibe"],
    popular: ["gaming", "gamer", "games", "playstation", "xbox", "nintendo", "pcgaming", "streamer"],
    medium: ["twitch", "gamingcommunity", "gamingsetup", "esports", "videogames", "gameplay", "streamerlife"],
    low: ["gamergirl", "setupinspiration", "cozygamer", "indiegames", "retrogaming", "clips", "gamingpc"],
    niche: ["speedrun", "cosplay", "minecraftbuilds", "valorantclips", "cozygaming", "setupgoals"],
    longtail: ["bestpcgamingbuild2026", "howtostartstreamingontwitch", "cozygamingsetupideas", "speedrunrecordsguide"]
  },
  fashion: {
    trending: ["fitcheck", "outfitinspo", "fashiontok", "thriftfinds", "streetwearstyle", "capsulewardrobe"],
    popular: ["fashion", "style", "clothing", "model", "outfit", "design", "shopping", "beauty"],
    medium: ["ootd", "fashionblogger", "streetwear", "instafashion", "wardrobe", "accessories", "designer"],
    low: ["outfitinspo", "thrifted", "capsulewardrobe", "minimalstyle", "lookbook", "casualstyle", "vintagestyle"],
    niche: ["sustainablefashion", "koreanfashion", "streetstyle", "menswear", "falloutfits", "grwm"],
    longtail: ["capsulewardrobechecklist", "sustainableclothingbrands2026", "affordableoutfitideas", "thriftshoppingtipsandhacks"]
  },
  beauty: {
    trending: ["makeupreview", "skincare101", "glowup", "makeuptutorial", "glassskin", "grwmmakeup"],
    popular: ["beauty", "makeup", "skincare", "cosmetics", "hair", "selfcare", "nails", "spa"],
    medium: ["makeupartist", "mua", "skincareroutine", "makeuplover", "glowingskin", "hairstyles", "aesthetic"],
    low: ["makeupreview", "skincaretips", "cleanbeauty", "nailart", "morningroutine", "beautyhacks", "selflove"],
    niche: ["antiaging", "kbeauty", "curlyhaircare", "glassskin", "nightskincare", "makeupfordryskin"],
    longtail: ["glassskincareroutineguide", "antiagingskincaretips", "makeupforbeginnersstepbystep", "curlyhairroutineforvolum"]
  },
  health: {
    trending: ["healthtok", "mentalhealthmatters", "healthyhabits", "guthealth", "wellnessjourney"],
    popular: ["health", "wellness", "nutrition", "mentalhealth", "organic", "lifestyle", "nature", "meditation"],
    medium: ["mentalhealthmatters", "healthyhabits", "nutritionist", "mindfulness", "holistichealth", "clean-eating"],
    low: ["guthealth", "selfcare", "stressrelief", "vegandiet", "healthyliving", "detox", "fitnessnutrition"],
    niche: ["intermittentfasting", "weightlossdiet", "sleepoptimization", "anxietyrelief", "healthytips", "vitamins"],
    longtail: ["anxietyreliefmindfulness", "guthealthrecipesforbeginners", "sleepoptimizationschedule", "weightlossdietforwomen"]
  },
  lifestyle: {
    trending: ["dailyvlog", "dayinmylife", "productivityvlog", "cozyvibes", "morningroutinevlog"],
    popular: ["lifestyle", "home", "aesthetic", "daily", "vlog", "happy", "inspiration", "morning"],
    medium: ["dailyvlog", "minimalism", "cozyhome", "productivity", "selflove", "mindfulness", "routines"],
    low: ["dayinmylife", "journaling", "morningroutine", "nightroutine", "aestheticlife", "homedecor", "satisfying"],
    niche: ["bulletjournal", "cozyvibes", "plants", "diyprojects", "slowliving", "minimalistdecor"],
    longtail: ["morningroutineforproductivity", "minimalisthomedecorideas", "slowlivingvlogsetup", "bulletjournalsetup2026"]
  },
  photography: {
    trending: ["phototok", "streetphotography", "cinematicvideo", "camerahacks", "editingtricks"],
    popular: ["photography", "photo", "photographer", "art", "portrait", "landscape", "camera", "travelphotography"],
    medium: ["portraitphotography", "streetphotography", "canon", "sony", "nikon", "photoediting", "visuals"],
    low: ["lightroom", "camerahacks", "mobilephotography", "cinematic", "bnwphotography", "composition"],
    niche: ["filmphotography", "dronephotography", "weddingphotography", "photoshop", "presets", "astrophotography"],
    longtail: ["streetphotographycamerahacks", "mobilephotographyeditingtips", "bestdronephotographygear", "lightroompresetstutorial"]
  },
  motivation: {
    trending: ["growthmindset", "selfdiscipline", "stoicism", "successmindset", "dailymotivationtok"],
    popular: ["motivation", "inspiration", "success", "quotes", "mindset", "growth", "happiness", "discipline"],
    medium: ["growthmindset", "stoicism", "inspirationalquotes", "selfdiscipline", "dreambig", "ambition"],
    low: ["successmindset", "motivationalspeaker", "dailyinspiration", "focus", "empowerment", "positivity"],
    niche: ["morninghabits", "mentalstrength", "hustlementality", "selfgrowth", "stoicquotes", "overcomingfear"],
    longtail: ["growthmindsetmotivationtips", "stoicismforbeginnersguide", "selfdisciplineroutines", "dailypositivitymindsetquotes"]
  },
  sports: {
    trending: ["sportstok", "footballhighlights", "dunkingvibe", "athletictraining", "extremehighlights"],
    popular: ["sports", "athlete", "game", "training", "football", "basketball", "soccer", "active"],
    medium: ["highlights", "athletics", "coaching", "fitnesssports", "workoutsession", "run", "player"],
    low: ["highlightreels", "skateboarding", "tennis", "cycling", "marathontraining", "teamwork"],
    niche: ["calisthenics", "trailrunning", "climbing", "boxingtraining", "skate", "swimmingtips"],
    longtail: ["marathontrainingforbeginners", "calisthenicsworkoutroutine", "trailrunningtipsandgearguide", "boxingtrainingathome"]
  },
  pets: {
    trending: ["pettok", "cuteanimals", "dogmomlife", "catsoftiktok", "funnyanimalsdaily"],
    popular: ["pets", "animals", "dog", "cat", "cute", "puppy", "kitten", "petstagram"],
    medium: ["dogsofinstagram", "catsofinstagram", "petlover", "funnyanimals", "dogtraining", "veterinary"],
    low: ["dogmom", "catmom", "puppylove", "petcare", "animalwelfare", "adoptdontshop"],
    niche: ["exoticpets", "dogtricks", "catgrooming", "reptiles", "birdsofinstagram", "doghealth"],
    longtail: ["dogtrainingtipsforpuppies", "easycatgroomingathome", "exoticpetcareinstructions", "funnydogvideosdaily"]
  },
  music: {
    trending: ["musictok", "originalsong", "singingchallenge", "guitarcover", "beatsmakers", "indiemusicvibe"],
    popular: ["music", "song", "singer", "artist", "musician", "cover", "concert", "guitar"],
    medium: ["indieartist", "songwriting", "livemusic", "instrumental", "rap", "beats", "piano", "band"],
    low: ["originalmusic", "singing", "guitarist", "musicproducer", "studioflow", "coversong"],
    niche: ["synthwave", "lofihiphop", "indiemusic", "beatmaker", "vocalist", "classicalguitar"],
    longtail: ["indieartistsongwritingtips", "howtoproducelofibeats", "guitarcoverlessonforbeginners", "synthwavemusicproduction"]
  },
  marketing: {
    trending: ["marketingtok", "socialmediatips", "contentstrategy", "seooptimization", "copywritinghacks"],
    popular: ["marketing", "advertising", "seo", "branding", "sales", "socialmedia", "design", "copywriting"],
    medium: ["socialmediamarketing", "digitalmarketing", "contentmarketing", "copywriting", "salesfunnel", "emailmarketing"],
    low: ["seooptimization", "brandingstrategy", "influencermarketing", "videomarketing", "growthhacking"],
    niche: ["local-seo", "tiktokads", "facebookads", "conversionrate", "copywritinghacks", "leadgeneration"],
    longtail: ["socialmediamarketingforstartups", "copywritinghacksforconversions", "saascontentmarketingstrategy", "localseooptimizationtips"]
  }
};

// ----------------------------------------------------
// Deterministic Hash Helper for Scoring Metrics
// ----------------------------------------------------
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getHashtagStats(tag: string): {
  volume: number;
  competition: "low" | "medium" | "high";
  reachScore: number;
  engagementScore: number;
  trendScore: number;
} {
  const hash = hashString(tag);
  
  // Volume: Deterministic range from 2.5k to 75M posts based on tag hash
  const volumeBases = [5000, 15000, 45000, 120000, 350000, 950000, 2500000, 8000000, 25000000, 68000000];
  const index = hash % volumeBases.length;
  const volume = volumeBases[index] + (hash % 12500);

  // Competition category
  let competition: "low" | "medium" | "high" = "medium";
  if (volume < 50000) competition = "low";
  else if (volume > 1500000) competition = "high";

  // Reach rating: 15 to 99
  const reachScore = 15 + (hash % 85);

  // Engagement rating: 1.5 to 9.8
  const engagementScore = parseFloat((1.5 + ((hash % 83) / 10)).toFixed(1));

  // Trend scorecard: 45 to 99
  const trendScore = 45 + (hash % 55);

  return { volume, competition, reachScore, engagementScore, trendScore };
}

// ----------------------------------------------------
// Core Keyword Matching & Generating Engine
// ----------------------------------------------------
export function generateHashtags(
  input: string,
  platform: Platform,
  limit: number = 30
): Hashtag[] {
  if (!input.trim()) return [];

  // Parse keywords by stripping spaces, comma splits
  const rawKeywords = input
    .toLowerCase()
    .split(",")
    .map(k => k.trim())
    .filter(k => k.length > 0);

  let gatheredTags: Omit<Hashtag, "name">[] = [];
  let nameTracker = new Set<string>();

  // Helper to add unique tag
  const addTag = (name: string, category: string, tier: Hashtag["tier"]) => {
    // Standardize hashtag structure: must start with '#' and have no spaces/specials
    const cleaned = "#" + name.replace(/#/g, "").replace(/[^a-zA-Z0-9]/g, "").trim();
    if (cleaned.length > 1 && !nameTracker.has(cleaned)) {
      nameTracker.add(cleaned);
      const stats = getHashtagStats(cleaned);
      gatheredTags.push({
        ...stats,
        category,
        tier
      });
    }
  };

  // 1) Search local database for exact/partial matches
  rawKeywords.forEach(kw => {
    // Check categories
    Object.entries(HASHTAG_DATABASE).forEach(([catName, tiers]) => {
      // If keyword matches the category name or a tier tag contains it
      const isCatMatch = catName.includes(kw) || kw.includes(catName);
      
      if (isCatMatch) {
        Object.entries(tiers).forEach(([tierName, tags]) => {
          tags.forEach(t => addTag(t, catName, tierName as Hashtag["tier"]));
        });
      } else {
        // Search inside tags for matches
        Object.entries(tiers).forEach(([tierName, tags]) => {
          tags.forEach(tag => {
            if (tag.toLowerCase().includes(kw)) {
              addTag(tag, catName, tierName as Hashtag["tier"]);
            }
          });
        });
      }
    });
  });

  // 2) Fallback smart generator: if gathered count is less than target, generate dynamic variations
  if (nameTracker.size < limit) {
    const suffixes = [
      "motivation", "journey", "life", "hacks", "tips", "goals", 
      "fyp", "reels", "vibes", "creator", "lifestyle", "challenge", 
      "hub", "tips", "hacks", "daily", "tok", "vlog", "setup", "aesthetic"
    ];

    rawKeywords.forEach(kw => {
      const cleanKw = kw.replace(/[^a-zA-Z0-9]/g, "");
      if (cleanKw.length === 0) return;

      // Add direct
      addTag(cleanKw, "custom", "niche");

      // Add suffixes
      suffixes.forEach((suffix, idx) => {
        let tier: Hashtag["tier"] = "niche";
        if (idx < 3) tier = "popular";
        else if (idx < 8) tier = "medium";
        else if (idx < 14) tier = "low";

        addTag(cleanKw + suffix, "custom", tier);
        addTag(suffix + cleanKw, "custom", tier);
      });
    });
  }

  // Convert back to full Hashtag list
  const results: Hashtag[] = gatheredTags.map((tag, idx) => {
    // Array order preserves original uniqueness tracking
    const name = Array.from(nameTracker)[idx];
    return { name, ...tag };
  });

  // Sort: prioritize trending and popular, and slice to requested count
  const sorted = results.sort((a, b) => {
    const priority = { trending: 0, popular: 1, medium: 2, low: 3, niche: 4, longtail: 5 };
    return priority[a.tier] - priority[b.tier];
  });

  // Apply platform adjustments (e.g. TikTok favors discovery/trending challenge tags)
  if (platform === "tiktok") {
    // Artificially boost "trending" and "fyp" style tags
    return sorted
      .map(tag => {
        if (tag.name.toLowerCase().includes("tok") || tag.name.toLowerCase().includes("fyp")) {
          return { ...tag, trendScore: Math.min(100, tag.trendScore + 10) };
        }
        return tag;
      })
      .slice(0, limit);
  }

  return sorted.slice(0, limit);
}

// ----------------------------------------------------
// Viral Mixer Algorithm (Constructs Balanced Sets)
// ----------------------------------------------------
export function mixHashtags(
  tags: Hashtag[],
  ratios: { trending: number; popular: number; medium: number; niche: number }
): string[] {
  const trending = tags.filter(t => t.tier === "trending" || t.tier === "longtail").map(t => t.name);
  const popular = tags.filter(t => t.tier === "popular").map(t => t.name);
  const medium = tags.filter(t => t.tier === "medium" || t.tier === "low").map(t => t.name);
  const niche = tags.filter(t => t.tier === "niche").map(t => t.name);

  const mixed: string[] = [];

  // Slice based on requested counts, fallback if index runs out
  mixed.push(...trending.slice(0, ratios.trending));
  mixed.push(...popular.slice(0, ratios.popular));
  mixed.push(...medium.slice(0, ratios.medium));
  mixed.push(...niche.slice(0, ratios.niche));

  // If we still lack tags, grab remaining from the raw list
  if (mixed.length < (ratios.trending + ratios.popular + ratios.medium + ratios.niche)) {
    tags.forEach(t => {
      if (!mixed.includes(t.name)) mixed.push(t.name);
    });
  }

  return mixed.slice(0, ratios.trending + ratios.popular + ratios.medium + ratios.niche);
}

// ----------------------------------------------------
// Caption Generator Module (Niche Pre-sets)
// ----------------------------------------------------
export const CAPTION_TEMPLATES: Record<string, CaptionTemplate[]> = {
  fitness: [
    {
      title: "🔥 Workout Motivation Hook",
      hook: "No excuses. Just execution.",
      body: "Here is your friendly reminder that consistency is the only way to reach your health goals. You don't have to feel like doing it, you just have to do it.",
      cta: "Save this workout for your next gym session! 👇"
    },
    {
      title: "🥗 Healthy Meal Prep Guide",
      hook: "Eat clean, feel great. 🥦",
      body: "Prepped these high-protein meals in under 45 minutes for the entire week. Fueling your body doesn't need to be complicated.",
      cta: "Comment 'RECIPE' and I will DM you the step-by-step PDF! 📩"
    }
  ],
  travel: [
    {
      title: "✈️ Travel Wanderlust Hook",
      hook: "Another checkmark off the bucket list. 📍",
      body: "Exploring the hidden gems and quiet streets of this magical destination. Every corner feels like a film frame.",
      cta: "Share this with your travel partner! 🗺️"
    },
    {
      title: "🎒 Budget Solo Travel Hacks",
      hook: "How I traveled Europe on a student budget. 💸",
      body: "From choosing local transport over taxis to staying in community hostels, you can explore the world without breaking the bank.",
      cta: "Click the link in my bio for the complete cost breakdown! 🔗"
    }
  ],
  marketing: [
    {
      title: "📈 Digital Growth Checklist",
      hook: "The algorithm didn't shadowban you. Your hooks just need work.",
      body: "Here are 3 simple copy frameworks to keep your viewers watching longer: 1. The curiosity gap, 2. The negative warning, 3. The statistical shock.",
      cta: "Save this reel to rewrite your scripts later! 📌"
    }
  ],
  lifestyle: [
    {
      title: "☕ Cozy Morning Routine",
      hook: "Slow mornings are a cheat code. ✨",
      body: "Starting the day with coffee, journaling, and 10 minutes of screen-free sunlight. Your morning sets the theme for your entire day.",
      cta: "What is one routine you never skip? Comment below! 👇"
    }
  ],
  technology: [
    {
      title: "💻 Desk Setup Productivity",
      hook: "My remote workstation upgrade is complete. 🚀",
      body: "Optimized my desk setup for maximum coding focus: ergonomic keyboard, lightbar, and dual-monitor routing. Cleaner layout, faster execution.",
      cta: "What gear item should I review next? Let me know! ⌨️"
    }
  ]
};

// ----------------------------------------------------
// File Export Utility
// ----------------------------------------------------
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateJSONReport(keywords: string, hashtags: Hashtag[], platform: Platform): string {
  const report = {
    generatedAt: new Date().toISOString(),
    engine: "Instagram & TikTok Hashtag Generator v2026",
    searchQuery: keywords,
    platform: platform,
    metricsSummary: {
      totalCount: hashtags.length,
      averageReachScore: Math.round(hashtags.reduce((acc, curr) => acc + curr.reachScore, 0) / (hashtags.length || 1)),
      averageEngagement: parseFloat((hashtags.reduce((acc, curr) => acc + curr.engagementScore, 0) / (hashtags.length || 1)).toFixed(1))
    },
    hashtags: hashtags.map(t => ({
      hashtag: t.name,
      estimatedVolume: t.volume,
      difficulty: t.competition,
      reachScore: t.reachScore,
      engagementScore: t.engagementScore,
      trendScore: t.trendScore,
      category: t.category,
      tier: t.tier
    }))
  };
  return JSON.stringify(report, null, 2);
}
