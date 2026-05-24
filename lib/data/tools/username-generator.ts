import { ToolConfig } from './types';

export const usernameGeneratorConfig: ToolConfig = {
  slug: "username-generator",
  title: "Username Generator",
  shortDescription: "Generate unique, memorable, and platform-optimized usernames for gaming, social media, branding, and professional use. Customize length, style presets, leetspeak modifications, and export in bulk.",
  category: "Generators",
  keywords: [
    "username generator", "cool username maker", "gaming username generator", "instagram username generator",
    "tiktok username generator", "social media name generator", "brand name generator", "professional nickname generator",
    "leetspeak username creator", "aesthetic username ideas", "creative alias generator", "youtube channel name generator",
    "gamer tag generator", "online identity builder", "unique username checker"
  ],

  longDescription: `
In the modern digital landscape, a username is more than a random string of characters used to log into an account; it is your digital signature, your online brand, and the cornerstone of your virtual identity. Whether you are an eSports competitor, an aspiring content creator, a software engineer, or a digital marketer building a startup, your username is the first point of contact between you and the global internet community.

This **Username Generator** is designed to solve the challenge of creating unique, high-quality, and platform-compliant handles. By blending semantic word databases, customized style presets, phonetic structures, and platform validation rules, this tool helps you formulate memorable names while simulating availability and evaluating memorability.

---

### The Evolution of Online Identity

In the early days of the web, online identities were highly anonymous. Forums, IRC channels, and early games were filled with simple handles or abstract aliases. As the internet matured into the social media age and the creator economy, the line between offline and online identity blurred. Today, a username functions as a personal brand. 

For influencers, creators, and business professionals, a consistent handle across Twitter/X, Instagram, YouTube, TikTok, and GitHub is crucial for cross-platform discoverability. A fragmented identity makes it difficult for followers or clients to find you, reducing the effectiveness of your digital footprint.

---

### Psychology of Memorability

What makes a username stick in the human brain? Memorability psychology suggests several key factors:
1. **Pronounceability**: Usernames that are easy to say aloud (even in one's head) are processed faster by the brain and remembered longer.
2. **Cognitive Ease**: Avoid overly complex spelling or long strings of random numbers. A name like "TechVibe" is significantly more memorable than "T3ch_V1b3_9824".
3. **Imagery and Association**: Usernames that evoke strong visual imagery (e.g., "SilverFalcon", "NeonGlitch") perform better because the brain links the verbal tag to a mental image.
4. **Rhythm and Sound**: Alliteration (e.g., "PixelPython") or rhyming handles stick in memory due to the natural rhythm of speech.

---

### Social Media Username Optimization

Each social platform has its own culture, target audience, and formatting constraints. Optimizing your username for these specific environments is key:

#### 1. Instagram and TikTok (Aesthetic & Trendy)
Visual-first platforms thrive on aesthetic and brand-focused handles. Usernames should be clean, lowercase, and avoid excessive punctuation. Using simple separators like underscores (\`_\`) or dots (\`.\`) is common, but keep them minimal.
* *Constraints*: Max 30 characters on Instagram (letters, numbers, underscores, periods). TikTok allows up to 24 characters.

#### 2. YouTube (Brandable & Search-Friendly)
Your YouTube handle should match your channel's niche or your real name. Since YouTube handles are used in comments and mentions, keep them short enough to type easily.
* *Constraints*: Max 30 characters, alphanumeric, hyphens, underscores, and periods.

#### 3. X / Twitter (Short & Punchy)
With a highly conversational format, Twitter handles need to be compact. Short usernames make it easier for others to mention you in tweets without consuming character limits.
* *Constraints*: Max 15 characters, letters, numbers, and underscores.

#### 4. GitHub (Professional & Dev-Focused)
For software engineers, GitHub is a living resume. Avoid childish or gaming-oriented handles. Instead, opt for variants of your real name, professional titles, or programming themes (e.g., "DevDave", "CodeCrafter").
* *Constraints*: Max 39 characters, alphanumeric, and single hyphens (no trailing or leading hyphens).

---

### Gaming Usernames and eSports Branding

In gaming communities (Twitch, Discord, Steam, Xbox, PlayStation), your username is your avatar. A strong gamertag should project confidence, play style, or thematic interest:
* **Thematic Presets**: Sci-fi (Cyberpunk/Hacker), Fantasy (medieval or mythological terms), or Action-heavy tags.
* **Leetspeak and Mutations**: Modifying letters to numbers (e.g., converting "E" to "3", "A" to "4") helps bypass registry blocks while keeping the visual identity intact.
* **Separators**: Utilizing hyphens or underscores can give a clan-like or competitive aesthetic.

---

### Secure Username Practices

While branding is important, cybersecurity should not be ignored. Utilizing the same username for highly secure bank accounts, emails, and public social forums creates a trail for **OSINT (Open Source Intelligence)** gathering. 

Attackers can use tools like Sherlock to search for a specific username across hundreds of websites. If you use the same handle for your public Reddit account (where you might share personal details) and your private banking email, you increase the risk of targeted social engineering.
* *Security Tip*: Use unique, randomized, or abstract usernames for sensitive accounts (banking, recovery emails, server administration) while reserving your branded handles for public profiles.

---

### Naming Concepts for Startups & Businesses

If you are generating a username for a brand, startup, or business account, follow these principles:
* **Niche Alignment**: The handle should suggest what your business does.
* **Future Proofing**: Do not pick a name so narrow that it limits expansion. If you sell shoes, choosing "CoolBoots" might limit your brand if you decide to sell apparel later.
* **Intellectual Property**: Always check that your username does not infringe on existing trademarks to avoid legal takedowns or platform disputes.
`,

  features: [
    "Multi-Mode Generator: Instantly generate Brandable, Gamer, Aesthetic, Tech, Professional, and Secure usernames.",
    "Advanced Custom Input: Feed keywords, names, hobbies, or gaming tags to personalize the generation engine.",
    "Platform Preset Filters: Enforces character limits and symbol rules for Instagram, TikTok, X, GitHub, Discord, and Reddit.",
    "Styling & Separators: Control letter cases (CamelCase, lowercase, UPPERCASE) and add dots, underscores, or hyphens.",
    "Smart Mutations & Leetspeak: Convert letters to numbers or inject secure random character mutations.",
    "Bulk Generation Mode: Create 10, 50, 100, or a custom amount of usernames in a single click.",
    "Availability & Strength Simulation: Get immediate visual feedback on username strength, memorability, and uniqueness scores.",
    "Favorites & Session History: Save names to a favorites panel stored in localStorage for offline access.",
    "Structured Exporters: Download lists of generated usernames as TXT, CSV, or JSON formats."
  ],

  useCases: [
    "Gamers searching for new unique gamertags, Twitch streams, or Discord handles.",
    "Influencers and content creators aligning their handles across Instagram, TikTok, and YouTube.",
    "Developers looking for professional, clean, and unique GitHub aliases.",
    "Entrepreneurs finding available, brandable usernames for startups and businesses.",
    "Cybersecurity-conscious individuals creating secure, anonymous accounts for forums.",
    "Branding experts brainstorming phonetic and aesthetic company nicknames."
  ],

  howToSteps: [
    "Enter a seed word, name, or keyword in the input box (optional).",
    "Select a style preset (e.g., Cyberpunk, Professional, Minimal) to customize word lists.",
    "Choose a target platform filter (e.g. X/Twitter, Instagram) to automatically adjust length and character rules.",
    "Configure numbers, symbols, separators, or leetspeak options in the advanced panel.",
    "Set the batch generation size (e.g., 50 usernames) and click 'Generate Usernames'.",
    "Filter or sort the results dynamically by length, uniqueness, or simplicity.",
    "Select your favorites and click the star icon to save them, or copy them to your clipboard.",
    "Export your final list as a TXT, CSV, or JSON file."
  ],

  examples: [
    {
      title: "Gamer Cyberpunk Handle",
      description: "A futuristic, tech-heavy gaming name utilizing leetspeak and hyphens.",
      input: "Keyword: 'Neon', Preset: 'Cyberpunk', Options: Leetspeak, Hyphen separator",
      output: "N30n-Ph4nt0m"
    },
    {
      title: "Clean Social Media Handle",
      description: "Aesthetic lowercase username optimized for Instagram with an underscore separator.",
      input: "Keyword: 'Luna', Preset: 'Aesthetic', Options: Lowercase, Underscore",
      output: "luna_whisper"
    },
    {
      title: "Professional Developer Alias",
      description: "A clean, trustworthy handle suited for GitHub or LinkedIn.",
      input: "Name: 'Alex', Preset: 'Professional', Options: CamelCase, No numbers",
      output: "AlexCodes"
    }
  ],

  faq: [
    {
      question: "What is a username generator?",
      answer: "A username generator is an interactive tool that combines keywords, styling filters, custom prefixes/suffixes, and word dictionaries to create unique, memorable handles for social media, gaming, and professional profiles."
    },
    {
      question: "How do I create a unique username?",
      answer: "To make a username unique, combine two unrelated words (like an adjective and a noun), add custom prefixes or suffixes, use separators like dots or underscores, or convert letters to leetspeak numbers (e.g., E to 3)."
    },
    {
      question: "What makes a good username?",
      answer: "A good username is pronounceable, memorable, short, and consistent across platforms. It should align with your niche (e.g., professional for GitHub, creative for Instagram) and avoid excessive numbers or symbols."
    },
    {
      question: "Can I generate gamer usernames?",
      answer: "Yes, our generator includes a 'Gamer' preset and styles like 'Cyberpunk', 'Hacker', and 'Fantasy' that combine action verbs, sci-fi terms, and gaming suffixes for unique gaming tags."
    },
    {
      question: "How do social media username limits work?",
      answer: "Platforms enforce strict rules: X/Twitter limits handles to 15 characters (letters, numbers, underscores), Instagram limits to 30 characters (allows periods), and TikTok limits to 24 characters. Our tool automatically enforces these rules."
    },
    {
      question: "Can I create professional usernames?",
      answer: "Yes, selecting the 'Professional' style combines your name or keywords with clean developer or industry terms (like 'Codes', 'Dev', 'Studio', 'Consult') without messy symbols or numbers."
    },
    {
      question: "Are these usernames generated securely?",
      answer: "Yes, all generations occur client-side in your browser. No data is sent to external servers or tracking databases, ensuring your privacy."
    },
    {
      question: "What is leetspeak?",
      answer: "Leetspeak (1337) is an internet writing style where standard letters are replaced with visually similar numbers (e.g., A becomes 4, E becomes 3, I becomes 1, O becomes 0, S becomes 5)."
    },
    {
      question: "How does the availability simulation work?",
      answer: "The tool analyzes the complexity, character sets, and commonness of words in the username to compute a theoretical availability probability, giving you an indication of whether the handle is likely to be taken."
    },
    {
      question: "Can I export my generated usernames?",
      answer: "Yes, you can export your generated list in one click as a plaintext file (.txt), a spreadsheet-compatible comma-separated file (.csv), or a structured web-data file (.json)."
    }
  ],

  relatedTools: [
    { name: "Password Generator", slug: "password-generator" },
    { name: "UUID Generator", slug: "uuid-generator" },
    { name: "Slug Generator", slug: "slug-generator" },
    { name: "Fake User Data Generator", slug: "fake-user-data-generator" },
    { name: "Random Number Generator", slug: "random-number-generator" }
  ]
};
