---
metaTitle: "User Agent Parser — Decode Browser, OS, Engine & Bots"
metaDescription: "Parse and compare User-Agent strings locally in your browser to detect Chrome, Safari, Gecko, iOS WebKit, SEO bots, and AI crawlers instantly."
metaKeywords: "user agent parser, ua parser, detect browser, decode user agent, browser info checker, device detector, parse user agent string, bot crawler detector, os detector, user agent debugger, rendering engine test, what is my user agent"
title: "User Agent Parser & Client Info Detector"
shortDescription: "Parse, analyze, and decode any browser User Agent (UA) string to identify the browser engine, operating system, rendering engines, device types, bot/crawlers, and client capabilities in real-time."
faqs:
  - question: "Why does Google Chrome include Mozilla/5.0, AppleWebKit, KHTML, and Safari in its User-Agent?"
    answer: "Modern User-Agent strings accumulated legacy compatibility tokens over thirty years of server-side browser sniffing. Chrome preserves Mozilla/5.0 for Netscape-era servers, AppleWebKit/537.36 and KHTML, like Gecko because Blink forked from WebKit, and Safari/537.36 so scripts targeting WebKit browsers do not serve degraded fallback pages."
  - question: "Why does Chrome on iPhone report CriOS and run WebKit instead of Google's Blink engine?"
    answer: "Apple's iOS App Store guidelines have long required third-party iOS browsers to use Apple's WKWebView (WebKit) for web content rendering. Consequently, Chrome on iOS sends the CriOS token and Firefox sends FxiOS alongside AppleWebKit/605.1.15 rather than Chromium's Blink or Mozilla's Gecko engine."
  - question: "What are User-Agent Client Hints (Sec-CH-UA) and why are browsers freezing legacy UA strings?"
    answer: "Detailed User-Agent strings expose exact OS patch versions and device models passively on every request, enabling covert browser fingerprinting. Chromium browsers now freeze low-entropy details in User-Agent (such as Windows NT 10.0 and minor build 0.0.0) and require origins to opt in via Accept-CH headers to receive high-entropy Client Hints over HTTPS."
  - question: "Can I trust a User-Agent string that claims to be Googlebot or GPTBot in my server logs?"
    answer: "Never trust the User-Agent header alone for access control, because any HTTP client can spoof arbitrary strings via curl -A. To verify genuine crawlers, run reverse DNS (PTR) followed by forward DNS confirmation against official domains (such as googlebot.com) or match the source IP against the provider's published JSON IP prefix list."
  - question: "Does pasting internal server access-log User-Agent strings send data to remote servers?"
    answer: "No. User-Agent tokenization, engine and bot classification, side-by-side string comparisons, preset loading, and JSON/TXT report generation execute locally inside your browser's JavaScript runtime without uploading pasted strings to any external endpoint."
features:
  - "Instant auto-detection of your live browser User-Agent alongside custom string parsing directly in the browser"
  - "Ordered token parsing distinguishing Blink, WebKit, Gecko, Trident, and EdgeHTML engines without Safari/Chrome false positives"
  - "Granular device classification across Desktop, Mobile, Tablet, Smart TV, Game Console, and automated bot categories"
  - "Dedicated crawler identification separating SEO indexers (Googlebot, Bingbot) from AI scrapers (GPTBot, ClaudeBot)"
  - "Side-by-side User-Agent diff view highlighting token, version, platform, and capability divergences between two strings"
  - "Curated device and crawler preset generator plus one-click JSON and formatted TXT diagnostic exports"
useCases:
  - "Triaging browser-specific production JavaScript or CSS bugs by decoding raw User-Agent fields from error trackers and logs"
  - "Auditing nginx or CDN access logs to separate legitimate search engine crawlers from LLM training scrapers and fake bots"
  - "Comparing desktop, iOS WebKit, and Android Chromium User-Agent headers during adaptive serving and responsive QA"
  - "Flagging deprecated browsers or end-of-life rendering engines (such as Internet Explorer Trident) during security audits"
  - "Validating custom User-Agent parsing regular expressions against Chromium derivatives like Edge (Edg/), Opera (OPR/), and Samsung Internet"
  - "Testing User-Agent overrides for headless scrapers, monitoring probes, and automated integration suites"
howToSteps:
  - "Inspect your automatically detected browser User-Agent on page load, or paste any captured UA string into the parser input."
  - "Execute the parse action to decode browser family, version, operating system, CPU architecture, rendering engine, and device class."
  - "Check the Bot & Crawler panel to determine whether the string matches a known search indexer, SEO audit tool, or AI scraper."
  - "Switch to the Comparison view and paste a second User-Agent string to highlight structural and version differences side by side."
  - "Load sample desktop, mobile, or crawler strings from the preset generator when simulating client headers for testing."
  - "Copy the parsed summary or export the structured JSON or TXT report locally for bug reports and log-analysis pipelines."
---

Every HTTP request carries an optional `User-Agent` header formatted under RFC 9110 Section 10.1.5 as a whitespace-separated list of `product[/version]` tokens and parenthetical comments. In theory, that syntax should make client identification trivial; in practice, three decades of browser compatibility hacks turned modern User-Agent strings into dense palimpsests where almost every browser pretends to be three others. This parser runs entirely inside your browser's JavaScript engine, letting you decode captured production log headers, compare two UA strings side by side, and separate human browsers from search and AI bots without sending internal logs off your machine.

## Anatomy of a Modern User-Agent Token Chain

Consider a standard desktop Chrome string:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

Each segment exists for a specific engineering or historical reason:
- **`Mozilla/5.0`**: Legacy prefix retained since the Netscape Navigator era so old servers do not withhold modern HTML or frames.
- **`(Windows NT 10.0; Win64; x64)`**: System comment denoting the OS kernel and 64-bit architecture. Notably, Windows 11 still reports `Windows NT 10.0` in the legacy UA string to prevent version-check breakages; distinguishing Windows 11 requires Client Hints (`Sec-CH-UA-Platform-Version`).
- **`AppleWebKit/537.36 (KHTML, like Gecko)`**: Frozen engine token inherited when Blink forked from WebKit (which itself forked from KDE's KHTML and claimed Gecko compatibility).
- **`Chrome/120.0.0.0 Safari/537.36`**: The actual Chromium major version (with minor/build/patch frozen to `.0.0.0` under User-Agent Reduction) followed by a trailing `Safari` compatibility token.

### Why Evaluation Order Breaks Naive Regex Parsers

Because downstream Chromium browsers keep both `Chrome/` and `Safari/` in their headers, checking `/Safari/` before `/Chrome/`, or `/Chrome/` before `/Edg/` or `/OPR/`, misclassifies virtually every visitor. Accurate parsers evaluate tokens from most specific to most generic:

1. **Bots & Headless Clients first**: `Googlebot`, `Bingbot`, `GPTBot`, `ClaudeBot`, `HeadlessChrome`, `curl`.
2. **Chromium Forks before Chrome**: `Edg/` (Edge desktop), `EdgA/` (Edge Android), `OPR/` (Opera), `SamsungBrowser/`, `Brave`, `Vivaldi`.
3. **iOS WebKit Wrappers before Safari**: `CriOS/` (Chrome on iOS), `FxiOS/` (Firefox on iOS), `EdgiOS/` (Edge on iOS)—all of which render on Apple WebKit rather than Blink or Gecko.
4. **Core Engines last**: `Chrome/`, `Firefox/`, and finally `Safari/` (only when `Version/` is present and Chromium tokens are absent).

A subtler classification trap arrived with iPadOS 13+: Safari on modern iPads intentionally sends a desktop macOS string (`Macintosh; Intel Mac OS X 10_15_7`) so sites deliver full desktop web apps instead of stripped-down mobile templates. Relying purely on the `User-Agent` header therefore classifies desktop-mode iPads as Mac desktops; frontend code that needs to identify touch-capable tablets must combine pointer media queries (`@media (pointer: coarse)`) or `navigator.maxTouchPoints > 1` with platform inspection.

## Rendering Engine, Platform, and Bot Token Matrix

| Client / Crawler | Signature Token(s) | True Rendering Engine | Common Parsing Pitfall |
| :--- | :--- | :--- | :--- |
| Desktop Chrome | `Chrome/<v>` (no `Edg/`, `OPR/`) | Blink | Contains `AppleWebKit` and `Safari/537.36`; must exclude forks. |
| Microsoft Edge | `Edg/<v>` (Windows/macOS) or `EdgA/` | Blink | Legacy pre-2020 Edge used `Edge/<v>` on EdgeHTML, not `Edg/`. |
| Apple Safari | `Version/<v>` + `Safari/<v>` | WebKit | True Safari version comes from `Version/`, not the `Safari/604.1` build token. |
| Mozilla Firefox | `Gecko/20100101 Firefox/<v>` | Gecko | `Gecko/20100101` is frozen on desktop; mobile uses `Android` + `Mobile`. |
| Chrome on iOS | `CriOS/<v>` + `Mobile/... Safari/` | WebKit (`WKWebView`) | Misidentifying engine as Blink hides iOS-specific CSS/WebKit bugs. |
| Googlebot Mobile | `Googlebot/2.1` + `Android` + `Mobile` | Evergreen Chromium (Blink) | Spoofable string; verify via FCrDNS (`*.googlebot.com`) and official IPs. |
| OpenAI GPTBot | `GPTBot/1.2` | Non-rendering fetcher | Obeys `robots.txt` (`User-agent: GPTBot`); distinct from `OAI-SearchBot`. |
| Anthropic ClaudeBot | `ClaudeBot/1.0` | Non-rendering fetcher | Governed independently via `robots.txt` rules and published IP ranges. |

## User-Agent Reduction and Client Hints (UA-CH)

To curb passive cross-site fingerprinting, Chromium browsers have frozen sensitive subfields in the legacy `User-Agent` string (replacing exact Android device models with `K` and pinning desktop minor versions to `0.0.0`). Servers that genuinely need exact OS builds, CPU bitness, or full browser versions must migrate to **User-Agent Client Hints (UA-CH)** over HTTPS:

```http
# Default low-entropy headers sent automatically on HTTPS requests
Sec-CH-UA: "Chromium";v="120", "Google Chrome";v="120", "Not_A Brand";v="8"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "Windows"

# Server opt-in response requesting high-entropy hints on subsequent navigations
Accept-CH: Sec-CH-UA-Full-Version-List, Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch
Critical-CH: Sec-CH-UA-Platform-Version
Vary: Sec-CH-UA-Platform-Version
```

Notice the `"Not_A Brand";v="8"` GREASE token: browsers intentionally randomize a fake brand entry on every release so servers cannot hardcode brittle array indices instead of parsing structured header dictionaries properly. Client-side scripts in Chromium can query the same structured metadata asynchronously via `navigator.userAgentData`:

```javascript
if (navigator.userAgentData) {
  const hints = await navigator.userAgentData.getHighEntropyValues([
    'architecture',
    'platformVersion',
    'fullVersionList',
  ]);
  // Distinguish Windows 11 (major platformVersion >= 13) from Windows 10
  console.log(hints.platform, hints.platformVersion, hints.architecture);
}
```

You can inspect whether a live origin advertises `Accept-CH`, `Critical-CH`, and `Vary` headers using our [HTTP Header Checker](/en/tools/http-header-checker).

## Detecting and Verifying Search Crawlers vs. AI Scrapers

Server access logs routinely contain forged `Googlebot` and desktop `Chrome` strings sent by residential scrapers. Distinguishing genuine crawlers requires pairing UA parsing with network verification (reverse PTR lookup followed by forward DNS confirmation) and controlling crawl access cleanly through explicit `robots.txt` directives generated via our [Robots.txt Generator](/en/tools/robots-txt-generator).

Finally, in frontend application code, avoid branching UI layouts on `navigator.userAgent` whenever possible. Prefer CSS `@supports` rules, JavaScript feature detection (`'IntersectionObserver' in window`), and responsive viewport testing inside our [Responsive Screen Tester](/en/tools/responsive-screen-tester), reserving User-Agent parsing for server diagnostics, log analytics, and crawler telemetry where client-side probes are unavailable.
