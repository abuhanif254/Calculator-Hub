---
metaTitle: "User Agent Parser — Browser, OS, Engine & Bots erkennen"
metaDescription: "Decodieren und vergleichen Sie User-Agent-Strings lokal im Browser. Erkennen Sie Chrome, Safari, Blink, iOS-WebKit, SEO-Crawler und KI-Bots."
metaKeywords: "user agent parser, browser check, was ist mein user agent, ua string decodieren, rendering engine erkennen, blink webkit gecko, googlebot gptbot erkennen, geräteerkennung"
title: "User Agent Parser & Checker"
shortDescription: "Analysieren, decodieren und vergleichen Sie beliebige User-Agent-Strings lokal im Browser, um Browser-Familie, Betriebssystem, Rendering-Engine, Gerätetyp sowie Suchmaschinen- und KI-Crawler zu erkennen."
faqs:
  - question: "Warum enthält ein Chrome-User-Agent gleichzeitig Mozilla/5.0, AppleWebKit, KHTML und Safari?"
    answer: "Moderne User-Agent-Strings tragen über dreißig Jahre Geschichte serverseitiger Browser-Weichen mit sich. Chrome behält Mozilla/5.0 für alte Netscape-Prüfungen bei, führt AppleWebKit/537.36 und KHTML, like Gecko seit der Abspaltung von Blink aus WebKit mit und ergänzt Safari/537.36, damit WebKit-Skripte keine abgespeckten Fallback-Seiten ausliefern."
  - question: "Warum sendet Chrome auf dem iPhone das Token CriOS und nutzt WebKit statt Blink?"
    answer: "Apples App-Store-Richtlinien verpflichten Drittanbieter-Browser unter iOS seit Jahren zur Nutzung von Apples WKWebView (WebKit) für das Seiten-Rendering. Deshalb melden Chrome für iOS das Token CriOS und Firefox das Token FxiOS jeweils in Kombination mit AppleWebKit/605.1.15 statt Blink oder Gecko."
  - question: "Was sind User-Agent Client Hints (Sec-CH-UA) und warum werden UA-Strings eingefroren?"
    answer: "Detaillierte User-Agent-Strings übertragen bei jedem Request passiv exakte Betriebssystem-Builds und Gerätemodelle und erleichtern damit Browser-Fingerprinting. Chromium-Browser frieren deshalb sensible Felder im klassischen UA-String ein (z. B. Windows NT 10.0 und .0.0.0) und liefern genaue Details nur noch nach HTTPS-Opt-in über Accept-CH."
  - question: "Kann ich einem User-Agent wie Googlebot oder GPTBot in meinen Server-Logs vertrauen?"
    answer: "Niemals blind. Jeder HTTP-Client kann per curl -A beliebige Zeichenketten vortäuschen. Zur sicheren Echtheitsprüfung verifizierter Crawler kombinieren Administratoren die UA-Analyse mit Forward-Confirmed Reverse DNS (z. B. auf *.googlebot.com) oder gleichen die Quell-IP mit offiziellen JSON-Präfixlisten des Betreibers ab."
  - question: "Werden eingefügte User-Agent-Strings aus internen Logs an externe Server übertragen?"
    answer: "Nein. Tokenisierung, Engine- und Bot-Klassifizierung, der direkte String-Vergleich, die Vorlagenauswahl sowie der JSON- und TXT-Export laufen vollständig lokal in der JavaScript-Laufzeit Ihres Browsers, ohne eingegebene Log-Zeilen an externe Endpunkte zu senden."
features:
  - "Sofortige Auslesung Ihres aktiven Browser-User-Agents sowie vollständig lokale Analyse beliebiger UA-Strings im Browser"
  - "Priorisierte Token-Erkennung für Blink, WebKit, Gecko, Trident und EdgeHTML ohne typische Safari-Chrome-Fehlzuordnungen"
  - "Feingranulare Geräteklassifizierung nach Desktop, Mobilgerät, Tablet, Smart-TV, Spielekonsole und automatisiertem Bot"
  - "Gezielte Crawler-Identifikation mit Trennung zwischen Suchmaschinen-Indexern (Googlebot, Bingbot) und KI-Scrapern (GPTBot, ClaudeBot)"
  - "Side-by-Side-Diff-Ansicht zum direkten Vergleich zweier User-Agent-Strings nach Version, Engine, Plattform und Fähigkeiten"
  - "Kuratierte Vorlagenbibliothek für Geräte und Crawler inklusive Ein-Klick-Export als JSON- oder formatierte TXT-Diagnose"
useCases:
  - "Eingrenzung browserspezifischer JavaScript- oder CSS-Fehler anhand roher User-Agent-Einträge aus Fehler-Trackern und Logs"
  - "Audit von Nginx-, Apache- oder CDN-Zugriffslogs zur Trennung legitimer Suchmaschinen-Crawler von KI-Trainings-Scrapern"
  - "Vergleich von Desktop-, iOS-WebKit- und Android-Chromium-Headern bei Adaptive Serving und mobiler Qualitätssicherung"
  - "Aufspüren veralteter Browser oder eingestellter Engines (wie Internet Explorer Trident) im Zuge von Sicherheits-Audits"
  - "Validierung eigener Regex-Parser gegen Chromium-Derivate wie Microsoft Edge (Edg/), Opera (OPR/) und Samsung Internet"
  - "Test benutzerdefinierter User-Agent-Overrides für Headless-Browser, Uptime-Monitore und automatisierte Test-Pipelines"
howToSteps:
  - "Prüfen Sie direkt beim Aufruf Ihren automatisch ausgelesenen Browser-User-Agent oder fügen Sie einen beliebigen UA-String ein."
  - "Starten Sie die Decodierung, um Browser-Familie, Version, Betriebssystem, CPU-Architektur, Rendering-Engine und Geräteklasse auszulesen."
  - "Prüfen Sie das Bot- und Crawler-Panel auf bekannte Suchmaschinen-Indexer, SEO-Audit-Tools oder KI-Daten-Scraper."
  - "Wechseln Sie in die Vergleichsansicht und fügen Sie einen zweiten UA-String ein, um Struktur- und Versionsunterschiede zu markieren."
  - "Laden Sie bei Bedarf Beispiel-Strings für Desktop, Smartphones oder Crawler aus der integrierten Vorlagenbibliothek."
  - "Kopieren Sie die strukturierte Zusammenfassung oder laden Sie den Bericht lokal als JSON- oder TXT-Datei herunter."
---

Jede HTTP-Anfrage darf gemäß RFC 9110 Abschnitt 10.1.5 einen `User-Agent`-Header mitführen, aufgebaut als Leerzeichen-getrennte Folge aus `Produkt[/Version]`-Tokens und eingeklammerten Kommentaren. Auf dem Papier wirkt diese Syntax simpel; in der Praxis haben drei Jahrzehnte serverseitiger Browser-Weichen daraus verschachtelte Palimpseste geformt, in denen sich fast jeder Browser gleichzeitig als drei andere ausgibt. Dieser User Agent Parser arbeitet vollständig lokal in der JavaScript-Engine Ihres Browsers – so decodieren Sie sensible Server-Log-Einträge, vergleichen zwei UA-Strings direkt nebeneinander und trennen menschliche Besucher zuverlässig von Suchmaschinen- und KI-Bots, ohne interne Logdaten hochzuladen.

## Anatomie einer modernen User-Agent-Zeichenkette

Ein typischer Desktop-Chrome-Header verdeutlicht den historischen Aufbau:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

Jeder einzelne Baustein erfüllt eine konkrete technische oder historische Aufgabe:
- **`Mozilla/5.0`**: Kompatibilitäts-Präfix aus der Netscape-Navigator-Ära, damit veraltete Server keine abgespeckten HTML-Seiten ausliefern.
- **`(Windows NT 10.0; Win64; x64)`**: Systemkommentar zu Betriebssystem-Kernel und 64-Bit-Architektur. Bemerkenswert: Auch Windows 11 meldet im klassischen UA-String weiterhin `Windows NT 10.0`, um brüchige Versionsprüfungen nicht zu brechen; eine sichere Unterscheidung gelingt erst über Client Hints (`Sec-CH-UA-Platform-Version`).
- **`AppleWebKit/537.36 (KHTML, like Gecko)`**: Eingefrorenes Engine-Token seit der Abspaltung von Blink aus WebKit (das selbst von KDEs KHTML abstammt und Gecko-Kompatibilität beanspruchte).
- **`Chrome/120.0.0.0 Safari/537.36`**: Die eigentliche Chromium-Hauptversion (mit eingefrorenen Nebenstellen `.0.0.0` im Zuge der User-Agent Reduction), gefolgt vom nachgestellten `Safari`-Kompatibilitäts-Token.

### Warum die Prüfungsreihenfolge naive Regex-Parser scheitern lässt

Da nahezu alle Chromium-Derivate sowohl `Chrome/` als auch `Safari/` im Header behalten, klassifiziert eine Prüfung auf `/Safari/` vor `/Chrome/` – oder auf `/Chrome/` vor `/Edg/` beziehungsweise `/OPR/` – fast jeden Besucher falsch. Zuverlässige Parser werten Tokens daher strikt vom spezifischsten zum allgemeinsten Muster aus:

1. **Bots und Headless-Clients zuerst**: `Googlebot`, `Bingbot`, `GPTBot`, `ClaudeBot`, `HeadlessChrome`, `curl`.
2. **Chromium-Derivate vor Chrome**: `Edg/` (Edge Desktop), `EdgA/` (Edge Android), `OPR/` (Opera), `SamsungBrowser/`, `Vivaldi`.
3. **In-App-WebViews und iOS-Wrapper vor Safari**: Native App-Container wie Instagram (`Instagram`), Facebook (`FBAN`/`FBAV`) oder Android WebView (`; wv)`) weisen häufig strikte Cookie- und OAuth-Beschränkungen auf. Ebenso rendern `CriOS/` (Chrome unter iOS), `FxiOS/` (Firefox unter iOS) und `EdgiOS/` stets unter Apples WebKit-Engine statt unter Blink oder Gecko.
4. **Basis-Engines zuletzt**: `Chrome/`, `Firefox/` und schließlich `Safari/` (ausschließlich bei vorhandenem `Version/`-Token und fehlenden Chromium-Kennungen).

Eine besonders subtile Falle entstand mit iPadOS 13+: Safari auf aktuellen iPads sendet bewusst eine Desktop-macOS-Kennung (`Macintosh; Intel Mac OS X 10_15_7`), damit Webanwendungen vollwertige Desktop-Oberflächen statt reduzierter Mobilansichten liefern. Wer allein den `User-Agent`-Header auswertet, stuft solche iPads daher als Mac-Desktops ein; Frontend-Code sollte Touch-Geräte stattdessen über Media Queries (`@media (pointer: coarse)`) oder `navigator.maxTouchPoints > 1` erkennen.

## Matrix der Rendering-Engines, Plattformen und Bot-Signaturen

| Client / Crawler | Signatur-Token | Echte Rendering-Engine | Typische Parsing-Falle |
| :--- | :--- | :--- | :--- |
| Desktop Chrome | `Chrome/<v>` (ohne `Edg/`, `OPR/`) | Blink | Enthält `AppleWebKit` und `Safari/537.36`; Forks zwingend ausschließen. |
| Microsoft Edge | `Edg/<v>` (Desktop) oder `EdgA/` | Blink | Altes Edge vor 2020 nutzte `Edge/<v>` auf EdgeHTML statt `Edg/`. |
| Apple Safari | `Version/<v>` + `Safari/<v>` | WebKit | Die echte Safari-Version steht bei `Version/`, nicht beim Build `Safari/604.1`. |
| Mozilla Firefox | `Gecko/20100101 Firefox/<v>` | Gecko | `Gecko/20100101` ist am Desktop eingefroren; mobil erscheinen `Android` + `Mobile`. |
| Chrome unter iOS | `CriOS/<v>` + `Mobile/... Safari/` | WebKit (`WKWebView`) | Falsche Zuordnung zu Blink verschleiert iOS-spezifische CSS- und WebKit-Bugs. |
| Android WebView | `; wv)` + `Version/4.0 Chrome/<v>` | Blink (WebView) | Läuft eingebettet in nativen Apps; OAuth-Popups schlagen oft fehl. |
| Googlebot Mobile | `Googlebot/2.1` + `Android` + `Mobile` | Evergreen Chromium (Blink) | Leicht fälschbar; Echtheit stets per FCrDNS (`*.googlebot.com`) und IP-Liste prüfen. |
| OpenAI GPTBot | `GPTBot/1.2` | Fetcher ohne Rendering | Beachtet `robots.txt` (`User-agent: GPTBot`); getrennt von `OAI-SearchBot`. |
| Anthropic ClaudeBot | `ClaudeBot/1.0` | Fetcher ohne Rendering | Eigenständig über `robots.txt`-Regeln und dokumentierte IP-Bereiche steuerbar. |

## User-Agent Reduction und Client Hints (UA-CH)

Um passives Cross-Site-Fingerprinting einzudämmen, frieren Chromium-Browser sensible Detailfelder im klassischen `User-Agent`-String ein (exakte Android-Gerätemodelle schrumpfen auf das Platzhalterzeichen `K`, Desktop-Nebenversionen auf `.0.0.0`). Server, die legitim genaue OS-Builds, CPU-Architektur oder vollständige Browserversionen benötigen, fordern diese über **User-Agent Client Hints (UA-CH)** per HTTPS gezielt an:

```http
# Standardmäßig gesendete Low-Entropy-Header bei HTTPS-Anfragen
Sec-CH-UA: "Chromium";v="120", "Google Chrome";v="120", "Not_A Brand";v="8"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "Windows"

# Server-Antwort zum Opt-in für High-Entropy-Hints ab der Folgeanfrage
Accept-CH: Sec-CH-UA-Full-Version-List, Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch
Critical-CH: Sec-CH-UA-Platform-Version
Vary: Sec-CH-UA-Mobile
```

Ein unterschätzter Vorteil für Caching-Architekturen: Während ein pauschales `Vary: User-Agent` CDN-Caches wegen tausender Browser-Varianten fast vollständig zersplittert, erlaubt `Vary: Sec-CH-UA-Mobile` sauberes Edge-Caching mit nur zwei Cache-Schlüsseln (`?0` und `?1`). Das zufällig generierte GREASE-Token `"Not_A Brand";v="8"` wechselt regelmäßig seine Syntax, damit Server strukturierte Header-Listen sauber parsen statt starre Array-Indizes zu erwarten. Clientseitig lesen JavaScript-Anwendungen in Chromium dieselben Metadaten asynchron über `navigator.userAgentData` aus:

```javascript
if (navigator.userAgentData) {
  const hints = await navigator.userAgentData.getHighEntropyValues([
    'architecture',
    'platformVersion',
    'fullVersionList',
  ]);
  // Windows 11 sicher von Windows 10 trennen (platformVersion Major >= 13)
  console.log(hints.platform, hints.platformVersion, hints.architecture);
}
```

Ob ein Webserver die Header `Accept-CH`, `Critical-CH` und `Vary` korrekt ausliefert, überprüfen Sie unmittelbar mit unserem [HTTP Header Checker](/de/werkzeuge/http-header-checker).

## Suchmaschinen-Crawler und KI-Scraper zuverlässig verifizieren

In realen Access-Logs tauchen täglich gefälschte `Googlebot`- oder Desktop-Chrome-Signaturen auf, die von automatisierten Scrapern stammen. Eine belastbare Verifikation verbindet das Auslesen des User-Agents immer mit der Netzwerkanalyse der Quell-IP im [IP Lookup Checker](/de/werkzeuge/ip-lookup) und einer anschließenden Vorwärtsprüfung im [DNS Lookup Tool](/de/werkzeuge/dns-lookup). Um berechtigte Suchmaschinen-Indexer sauber von KI-Trainings-Crawlern abzugrenzen, erstellen Sie eindeutige Direktiven im [Robots.txt Generator](/de/werkzeuge/robots-txt-generator).

Verzichten Sie zudem im Frontend-Code möglichst auf Layout-Weichen anhand von `navigator.userAgent`. Bevorzugen Sie CSS-`@supports`-Regeln, JavaScript-Feature-Detection (`'IntersectionObserver' in window`) sowie reale Viewport-Tests im [Responsive Screen Tester](/de/werkzeuge/responsive-screen-tester) und reservieren Sie User-Agent-Parsing gezielt für Server-Diagnose, Log-Analytik und Crawler-Telemetrie.
