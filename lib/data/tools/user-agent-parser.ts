import { ToolConfig } from './types';

export const userAgentParserConfig: ToolConfig = {
  slug: "user-agent-parser",
  title: "User Agent Parser & Client Info Detector",
  shortDescription: "Parse, analyze, and decode any browser User Agent (UA) string to identify the browser engine, operating system, rendering engines, device types, bot/crawlers, and client capabilities in real-time.",
  category: "Web Dev Utilities",
  keywords: [
    "user agent parser", "ua parser", "detect browser", "decode user agent", "browser info checker",
    "device detector", "parse user agent string", "bot crawler detector", "os detector", "user agent debugger",
    "rendering engine test", "what is my user agent"
  ],

  longDescription: `
## What is a User Agent?

A **User Agent (UA)** is a text string that a web browser or client application transmits to a web server inside the HTTP request header envelope. This identifier acts as a digital self-declaration, detailing the software version, operating system, rendering engine, vendor, and device category of the requesting client. 

Whenever you navigate to a webpage, click a link, or fetch an API, your client sends a request header key named \`User-Agent\`. The destination server reads this string to determine how to format and serve the response content, ensuring that mobile layouts are delivered to smartphones, style assets are rendered correctly for specific engines, and search engine bots are directed to proper crawl pathways.

---

## How Browsers Identify Themselves: The Legacy of Compatibility

If you examine a modern user agent string, you will notice it starts with the word \`Mozilla/5.0\`, even if you are using Google Chrome, Microsoft Edge, or Apple Safari. This historical oddity is a product of early web development "browser sniffing" wars.

In the mid-1990s, Netscape Navigator (codenamed *Mozilla*) introduced support for advanced framesets. Servers checked the User-Agent header and served pages with frames only if they detected Netscape. Other browsers, to avoid being served flat pages without frames, began prepending \`Mozilla/\` to their user agent strings to declare "Mozilla compatibility." 

This trend persisted through Microsoft's Internet Explorer, WebKit (Safari), and Blink (Chrome). Today, standard browsers continue this tradition, creating complex user agent strings that contain references to almost every major predecessor browser engine to maintain backward compatibility with legacy servers:

*   **Chrome Desktop Example:** \`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\`
*   **Safari iPhone Example:** \`Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1\`

---

## Browser Rendering Engines Explained

A **rendering engine** (or layout engine) is the core software component within a web browser responsible for parsing HTML, CSS, XML, and images, calculating screen coordinates, and painting the pixels onto your display interface. The User-Agent string is the primary method for identifying which engine compiles the page:

1.  **Blink:** Developed by Google as a fork of WebKit's WebCore component, Blink powers Google Chrome, Chromium, Microsoft Edge, Opera, Vivaldi, and Samsung Internet.
2.  **WebKit:** Created by Apple as a fork of KHTML, WebKit powers Apple Safari. On iOS devices (iPhone and iPad), Apple mandates that all web browsers (including Chrome and Firefox mobile) utilize the WebKit rendering engine under the hood.
3.  **Gecko:** Developed by the Mozilla Foundation, Gecko is the open-source rendering engine powering Firefox and Tor Browser.
4.  **Trident:** The legacy engine created by Microsoft to power Internet Explorer from version 4.0 up to its retirement.
5.  **EdgeHTML:** The rendering engine originally built by Microsoft for Windows 10 Microsoft Edge before Edge migrated to Chromium (Blink).

---

## Mobile vs. Desktop User Agents

Web servers rely on user agent strings to partition traffic, serving optimized layouts depending on screen capabilities.

*   **Desktop User Agents:** Typically include references to desktop operating systems (like Windows, macOS, or Linux) and lack a \`Mobile\` flag. They signal to the server that the screen is large enough for multi-column, hover-enabled responsive layouts.
*   **Mobile User Agents:** Always contain a specific \`Mobile\` string segment (often alongside OS identifiers like \`Android\` or \`iPhone\`). This signals to the server to return compact single-column layouts, touch-optimized button targets, and lightweight media assets.

Detecting mobile clients correctly prevents layout breakages, reduces data consumption over mobile networks, and satisfies modern mobile-first design policies.

---

## Bot and Crawler Detection: SEO Bots vs. AI Crawlers

Not all requests are sent by human users browsing with graphical interfaces. Automated scripts, crawlers, and scrapers scour the web for various indices. We classify these automated agents into distinct categories based on their purpose:

### 1. Search Engine Crawlers (SEO Bots)
These crawlers are authorized agents representing public search indexes. They respect \`robots.txt\` directives and index content to rank pages.
*   **Googlebot:** The main crawler for Google search engines (\`Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)\`).
*   **Bingbot:** Microsoft's primary search spider.

### 2. Commercial SEO Audit Bots
Used by search marketing suites to gather metrics, compile backlinks, and audit site architectures.
*   **AhrefsBot:** Used by Ahrefs.
*   **SemrushBot:** Used by SEMrush.

### 3. AI Scrapers & Data Crawlers
These agents crawl public websites to collect natural language data to train Large Language Models (LLMs) and power AI search search tools.
*   **GPTBot:** OpenAI's web crawler designed to retrieve training datasets for ChatGPT.
*   **ClaudeBot:** Anthropic's data collector for the Claude AI engine.

---

## User Agent Spoofing

**User Agent Spoofing** is the practice of modifying or replacing the User-Agent header string sent by a client to trick a web server into classifying the client as another browser, operating system, or device. 

### Why Spoof User Agents?
1.  **Bypassing Arbitrary User-Agent Blocks:** Developers block old browsers, but users can spoof their UA to bypass blocks and view pages normally.
2.  **Web Scraping & Extraction:** Scraping scripts spoof browser UAs (e.g. simulating Google Chrome on Windows) to avoid automated anti-bot firewalls.
3.  **Testing Responsive Web Design:** Developers toggle user agent strings inside browser inspector consoles to simulate mobile phones or tablets and debug media queries.

---

## Privacy, Tracking, and Fingerprinting Risks

As browsers deprecate third-party cookies, tracking companies rely on **browser fingerprinting** to track users across websites. 

Browser fingerprinting aggregates distinct browser settings:
*   Screen resolution and color depth
*   Installed fonts and system languages
*   GPU properties via WebGL
*   The exact structure and version numbers in the **User-Agent String**.

Because unique User-Agent configurations can be combined with other properties to generate a distinct device fingerprint, browser vendors are transitioning to **User-Agent Client Hints (UA-CH)**. UA-CH provides a minimal default User-Agent string, requiring servers to explicitly request advanced details (like full OS version or CPU architecture) via secure, structured headers, enhancing user privacy.

---

## Analytics, Debugging, and Technical Use Cases

User agent parsing is critical for several engineering and marketing tasks:
1.  **Debugging Server Logs:** When an application crashes, engineers inspect server logs. Knowing the browser and OS version of affected clients helps developers replicate bugs locally.
2.  **Web Analytics:** Tracking scripts parse UAs to build charts showing browser market share, mobile vs. desktop visitor ratios, and geographical platform configurations.
3.  **Security Auditing:** Detecting outdated clients (like Internet Explorer or older Safari instances) allows security systems to warn users about vulnerabilities.
`,

  features: [
    "Instantly detect and decode your current browser user agent string",
    "Identify browser name, version, operating system, and architecture",
    "Determine device type (Desktop, Mobile, Tablet, Smart TV, Console, or Bot)",
    "Differentiate search engine bots (Googlebot/Bingbot) from AI scrapers (GPTBot/ClaudeBot)",
    "Audit mobile optimization details and responsive layouts",
    "Evaluate security alerts for outdated browsers and deprecated rendering engines",
    "Compare two user agent strings side-by-side with visual highlights",
    "Generate sample user agent presets for simulation testing",
    "Export reports to JSON copy, JSON file downloads, or formatted TXT summaries"
  ],

  useCases: [
    "Web developers testing responsive CSS media queries and device layouts",
    "SEO consultants auditing crawler log files for Googlebot and Bingbot indexing behavior",
    "Security teams verifying server access logs for anomalous browser configurations",
    "Analytics software builders categorizing platform and browser market share configurations",
    "IT support desks inspecting a client browser version to resolve compatibility bugs"
  ],

  howToSteps: [
    "Inspect the auto-detected User Agent string from your current browser, or paste any custom header in the input box.",
    "Click the 'Parse User Agent' button to start the analysis.",
    "Review the Dashboard Cards displaying OS version, browser version, device category, and rendering engine details.",
    "Analyze the Bot Detector card to inspect crawler purposes and search index links.",
    "Toggle the 'User Agent Comparison' tab to run a side-by-side difference comparison of two strings.",
    "Use the Generator presets to load popular user agents into the workspace.",
    "Download the results as a formatted TXT report or a raw JSON payload."
  ],

  faq: [
    {
      question: "What is a user agent?",
      answer: "A user agent is a text string sent by your browser inside the HTTP headers of every web request. It identifies your browser type, version, operating system, and rendering engine, helping servers deliver layouts optimized for your hardware."
    },
    {
      question: "What does a user agent string contain?",
      answer: "A standard user agent string contains the client application name, parent layout platform (e.g. Mozilla/5.0), operating system details (e.g. Windows NT 10.0), browser engine (e.g. AppleWebKit/537.36), and the active browser version (e.g. Chrome/120.0.0.0)."
    },
    {
      question: "Why do browsers use user agents?",
      answer: "Browsers use user agents to communicate their software and device configuration to web servers. This allows servers to return compatible content, such as mobile-optimized scripts or CSS styles tailored for specific rendering engines."
    },
    {
      question: "Can user agents be faked?",
      answer: "Yes, user agents can be easily faked or 'spoofed'. Most modern browsers allow you to modify your user agent string in the developer tools. Command-line clients like curl or wget also allow you to declare any custom user agent."
    },
    {
      question: "What is browser sniffing?",
      answer: "Browser sniffing is a practice where a web server or JavaScript code inspects the User-Agent string to determine browser type and block access or change functionality. Today, feature detection is preferred over browser sniffing."
    },
    {
      question: "What is Googlebot?",
      answer: "Googlebot is the search engine crawler used by Google to scan and index web pages. It uses specific user agent strings containing the word 'Googlebot' so webmasters can identify it in server logs."
    },
    {
      question: "How do websites detect devices?",
      answer: "Websites detect devices either by parsing the User-Agent header (for server-side routing) or using client-side JavaScript libraries and CSS media queries (like max-width rules) to check viewport dimensions."
    },
    {
      question: "Why is my browser detected incorrectly?",
      answer: "This occurs because modern browsers prepend historical terms like 'Mozilla/5.0', 'Safari', and 'AppleWebKit' to their user agent strings for backward compatibility, which can confuse simple parsing rules."
    },
    {
      question: "What is a rendering engine?",
      answer: "A rendering engine (like Blink or WebKit) is the core layout software inside a browser that parses HTML, CSS, and JS to calculate screen coordinates and render the visual layout of a page."
    },
    {
      question: "What is the difference between Blink and WebKit?",
      answer: "WebKit is the engine developed by Apple that powers Safari. Blink is a fork of WebKit developed by Google that powers Chrome, Edge, Opera, and Samsung Internet. Blink is optimized for Chromium's multi-process structure."
    },
    {
      question: "Can user agents affect SEO?",
      answer: "Yes. If a server is misconfigured and serves different layouts or blocking headers to search engine bots (like Googlebot) compared to human users, it can trigger Cloaking penalties, harming rankings."
    },
    {
      question: "Why do bots use user agents?",
      answer: "Bots use user agents to identify themselves to web servers. Responsible bots declare their name and a URL or contact email in their user agent so server admins can monitor their indexing footprint."
    },
    {
      question: "What is mobile user agent detection?",
      answer: "Mobile user agent detection checks for keywords like 'Mobile', 'Android', or 'iPhone' in the user agent header. This triggers redirects to mobile versions (like m.example.com) or adjusts responsive styling blocks."
    },
    {
      question: "Are user agents a privacy risk?",
      answer: "Yes. Because user agents contain specific version configurations, they can be combined with screen resolutions and system fonts to create a unique device fingerprint. To protect privacy, browsers are transitioning to User-Agent Client Hints."
    }
  ],

  relatedTools: [
    { name: "HTTP Header Checker", slug: "http-header-checker" },
    { name: "Website Screenshot Tool", slug: "website-screenshot-tool" },
    { name: "Redirect Checker", slug: "redirect-checker" },
    { name: "DNS Lookup", slug: "dns-lookup" },
    { name: "IP Lookup", slug: "ip-lookup" }
  ],

  examples: [
    {
      title: "Chrome on Windows Desktop",
      description: "Typical user agent string for Chrome running on Windows 10/11.",
      input: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      output: "Browser: Chrome 120.0.0.0\nOS: Windows 10 (64-bit)\nDevice: Desktop\nEngine: Blink (WebKit-compatible)\nCategory: Browser"
    },
    {
      title: "Safari on iPhone Mobile",
      description: "User agent string for Safari on iOS 17 showing mobile indicators.",
      input: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
      output: "Browser: Safari 17.2\nOS: iOS 17.2\nDevice: Mobile (iPhone)\nEngine: WebKit\nCategory: Mobile"
    },
    {
      title: "Googlebot Web Crawler",
      description: "Authored identifier for Google's desktop search index crawler.",
      input: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      output: "Browser: Googlebot 2.1\nOS: Unknown\nDevice: Bot / Crawler\nEngine: WebKit-compatible\nCategory: SEO Bot"
    }
  ]
};

export default userAgentParserConfig;
