---
metaTitle: "Open Graph Generator & Live-Vorschau für Social Media"
metaDescription: "Erstellen und prüfen Sie Open-Graph-Meta-Tags mit Live-Vorschau für Facebook, LinkedIn, Slack, Discord und WhatsApp inkl. lokaler Bildprüfung."
metaKeywords: "open graph generator, og tags erstellen, social media vorschau simulator, facebook link vorschau, linkedin post vorschau, whatsapp vorschaubild 300 kb, discord embed generator, og:image größe, rdfa metadaten"
title: "Open Graph Generator"
shortDescription: "Entwerfen, validieren und testen Sie Open-Graph-Metadaten (OGP) mit Echtzeit-Vorschauen für Facebook, LinkedIn, Discord, Slack, WhatsApp, Telegram und Apple iMessage. Prüfen Sie Bildabmessungen, Seitenverhältnis (1,91:1) und Dateigröße lokal im Browser."
faqs:
  - question: "Warum verwenden Open-Graph-Tags das Attribut property statt name?"
    answer: "Das Open-Graph-Protokoll baut auf RDFa (Resource Description Framework in Attributes) auf und deklariert Metadaten-Prädikate zwingend über property='og:*' statt über das klassische HTML-Attribut name. Strenge Unfurler wie der Facebook-Crawler oder der LinkedInBot ignorieren Tags, die fälschlicherweise mit name='og:title' ausgezeichnet sind."
  - question: "Warum zeigt WhatsApp mein Open-Graph-Vorschaubild nicht an, obwohl Facebook es darstellt?"
    answer: "WhatsApp lädt Linkvorschauen direkt vom Endgerät des Absenders ab und erzwingt dabei ein strenges Dateigrößenlimit von rund 300 KB sowie einen quadratischen 1:1-Zuschnitt. Überschreitet Ihr og:image diese Grenze, scheitert an Weiterleitungsketten oder nutzt ein nicht unterstütztes Format wie SVG, blendet WhatsApp das Bild kommentarlos aus."
  - question: "Was passiert technisch, wenn ich ein lokales Bild per Drag-and-Drop in die Vorschau ziehe?"
    answer: "Ihr Browser liest die Datei ausschließlich lokal über die FileReader-API ein, um Originalauflösung, Seitenverhältnis und Kilobyte-Größe ohne Server-Upload zu messen. Im generierten HTML-Export ersetzt das Werkzeug den temporären data:-URI automatisch durch eine Platzhalter-HTTPS-URL, damit keine ungültigen Base64-Bilder live gehen."
  - question: "Warum sollte ich og:image:width und og:image:height explizit deklarieren?"
    answer: "Wird eine neue URL erstmals auf Facebook geteilt, parst der Crawler das HTML synchron, lädt und dekodiert unbekannte Bilddateien jedoch asynchron im Hintergrund. Durch explizite Pixelangaben in og:image:width und og:image:height reserviert die Plattform sofort den vollen Bildplatz, sodass bereits der allererste Share fehlerfrei mit Grafik erscheint."
  - question: "Wie aktualisiere ich eine veraltete Open-Graph-Vorschau im Cache von Facebook, LinkedIn oder Slack?"
    answer: "Soziale Netzwerke cachen geparste OG-Objekte aggressiv anhand der og:url und der Bildadresse. Nach Anpassungen im HTML sollten Sie die URL im Meta Sharing Debugger oder LinkedIn Post Inspector neu einlesen lassen und den Dateinamen des Bildes versionieren (z. B. banner-v2.jpg oder ?v=2), damit auch CDN- und Bild-Caches erneuert werden."
features:
  - "Sieben Echtzeit-Vorschausimulatoren für Facebook, LinkedIn, Discord, Slack, WhatsApp, Telegram und Apple iMessage"
  - "Lokaler Drag-and-Drop-Bildinspektor per FileReader-API mit Prüfung von Originalauflösung, 1,91:1-Seitenverhältnis und dem 300-KB-Limit für WhatsApp"
  - "Sechs Open-Graph-Objekttyp-Builder für website, article, product, profile, video und music inklusive spezialisierter Namensräume"
  - "Automatisierte 100-Punkte-Qualitätsprüfung auf absolute HTTPS-URLs, optimale Titel- (40–60 Zeichen) und Beschreibungslängen (60–90 Zeichen) sowie og:image:alt"
  - "Sieben vorgefertigte Branchenvorlagen für SaaS, Blogartikel, E-Commerce-Produkte, Portfolio, Unternehmen, Nachrichten und Entwickler-Tools"
  - "JSON-Konfigurations-Import/-Export, direkter HTML-Download sowie lokaler Verlauf für bis zu 30 Sitzungen vollständig im Browser"
useCases:
  - "Überprüfung von Hero-Typografie und Logos auf sichere Darstellung im 1,91:1-Querformat für Facebook/LinkedIn und im zentralen 1:1-Ausschnitt für WhatsApp"
  - "Erstellung strukturierter E-Commerce-Produktkarten mit product:price:amount, Währung, Verfügbarkeit und Händler-Artikelnummer für Social-Shopping-Kataloge"
  - "Auszeichnung redaktioneller Beiträge mit ISO-8601-Veröffentlichungsdaten (article:published_time), Autoren-URLs und mehrfachen article:tag-Elementen"
  - "Lokales Prüfen unveröffentlichter Kampagnen- und Produktlaunch-Grafiken im Browser, ohne Embargo-Assets an externe Preview-Server zu übertragen"
  - "Einrichtung einheitlicher Rich-Embeds in Slack- und Discord-Kanälen für API-Dokumentationen, Changelogs und Software-Releases"
  - "Export standardisierter Open-Graph-JSON-Vorlagen für markenübergreifende Design-Systeme und die Übergabe zwischen Marketing und Entwicklung"
howToSteps:
  - "Wählen Sie eine der sieben Startvorlagen (z. B. SaaS, Blogartikel, E-Commerce oder Entwickler-Tool) oder füllen Sie die Kernmetadaten direkt im Hauptreiter aus."
  - "Halten Sie og:title zwischen 40 und 60 Zeichen sowie og:description zwischen 60 und 90 Zeichen und hinterlegen Sie eine absolute HTTPS-og:url samt Sprachcode (z. B. de_DE)."
  - "Öffnen Sie den Bereich für Bild und Medien, fügen Sie eine gehostete HTTPS-Bild-URL ein oder ziehen Sie eine lokale PNG-, JPEG- oder WebP-Datei zur Dimensions- und Größenprüfung hinein."
  - "Ergänzen Sie einen aussagekräftigen og:image:alt-Text für Barrierefreiheit und LinkedIn-Konformität und verifizieren Sie das 1,91:1-Seitenverhältnis sowie die 300-KB-Obergrenze."
  - "Wechseln Sie bei spezialisierten Objekttypen (article, product, profile, video oder music) in den Namensraum-Reiter, um typenspezifische Zusatzfelder zu ergänzen."
  - "Kontrollieren Sie alle sieben Plattform-Vorschauen samt 100-Punkte-Validierung und kopieren oder laden Sie Ihren fertigen HTML-Snippet-Block für den Dokument-Head herunter."
---

Sobald eine URL in Slack, LinkedIn, Facebook, Discord, WhatsApp oder iMessage eingefügt wird, sendet ein spezialisierter Unfurler-Bot eine HTTP-`GET`-Anfrage an den Zielserver, liest den rohen HTML-`<head>` vollständig ohne JavaScript-Ausführung aus und erzeugt aus den **Open-Graph-Protokoll-Tags (OGP)** eine interaktive Link-Vorschaukarte. Weil jede Plattform eigene Seitenverhältnisse, Kürzungsgrenzen, Cache-Regeln und Dateigrößenlimits durchsetzt, führen ungeprüfte Metadaten im Produktivbetrieb rasch zu abgeschnittenen Titeln oder fehlenden Vorschaubildern. Dieser Open Graph Generator simuliert alle sieben Zielplattformen in Echtzeit lokal im Browser – inklusive Bildanalyse über die `FileReader`-API, sodass unveröffentlichte Kampagnengrafiken Ihr Gerät niemals verlassen.

## Wie Social-Media-Crawler Open-Graph-Daten parsen

Das ursprünglich 2010 von Facebook spezifizierte Open-Graph-Protokoll basiert technisch auf **RDFa** (*Resource Description Framework in Attributes*). Es schreibt vier Pflichtprädikate vor – `og:title`, `og:type`, `og:image` und `og:url` –, die zwingend über das Attribut `property="og:*"` deklariert werden. Weil Unfurler-Bots häufig nur die ersten **50 bis 100 KB** einer HTML-Antwort einlesen und das Parsing danach abbrechen, sollten Open-Graph-Tags stets weit oben im `<head>` noch vor umfangreichen Inline-Stylesheets oder JSON-Skripten stehen. Achten Sie außerdem auf eine gültige TLS-Zertifikatskette für sämtliche Bild-URLs, da strenge Scraper Bilder hinter unvollständigen Intermediate-Zertifikaten oder gemischten HTTP-Pfaden kommentarlos verwerfen.

Die folgende Matrix fasst das reale Rendering- und Caching-Verhalten der sieben Plattformen zusammen:

| Plattform & Crawler | Empfohlenes Bildmaß | Layout & Zuschnitt | Payload & Cache | Textlimit |
| :--- | :--- | :--- | :--- | :--- |
| **Facebook** (`facebookexternalhit`) | 1200 × 630 px (`1,91:1`); min. 600 × 315 px | Vollbreites Banner; unter 600 px kleines Quadrat | Bis 8 MB; Cache-Reset via Sharing Debugger | Titel ~60 Z.; Desc. ~65–90 Z. |
| **LinkedIn** (`LinkedInBot`) | 1200 × 627 px (`1,91:1`); min. 200 px Breite | Breitbild-Karte; unter 200 px kein Bild | Bis 5 MB; Cache ~7 Tage (Post Inspector) | Titel ~70 Z.; Desc. meist ausgeblendet |
| **Discord** (`Discordbot`) | 1200 × 630 px (`1,91:1`) | Dunkles Embed mit `theme-color`-Leiste | Liest `og:site_name`, Titel & Beschreibung | Titel ~256 Z.; Desc. ~350 Z. |
| **Slack** (`Slackbot-LinkExpanding`) | 1200 × 630 px (`1,91:1`) | Kompaktes Embed mit linkem Balken | Intensives Workspace-Bild-Caching | Titel ~70 Z.; Desc. ~150 Z. |
| **WhatsApp** (`WhatsApp`) | 1200 × 630 px + `1:1`-Safe-Zone | Quadratisches Thumbnail mobil | **Striktes ~300-KB-Limit** (sonst kein Bild) | Titel ~60 Z.; Desc. ~80–100 Z. |
| **Telegram** (`TelegramBot`) | 1200 × 630 px (`1,91:1`) | Chat-Blase; optional Instant View | Cache-Reset jederzeit via `@WebpageBot` | Titel ~65 Z.; Desc. ~140 Z. |
| **Apple iMessage** (`LPLinkMetadata`) | 1200 × 630 px (`1,91:1`) | Abgerundete Kachel (Titel + Bild) | Client-Abruf am Absendergerät | Titel ~50–60 Z.; ohne Desc. |

## Bildgeometrie, Safe Zones und Cold-Cache-Schutz

Damit ein einziges Open-Graph-Banner sowohl in breiten Desktop-Feeds als auch in quadratischen Chat-Thumbnails sauber wirkt, zählen vier technische Regeln:

1. **1,91:1-Format mit zentraler 1:1-Safe-Zone**: Exportieren Sie Grafiken standardmäßig in **1200 × 630 Pixeln** (`1,905:1`) und zentrieren Sie Logos, Gesichter und Kernbotschaften im mittleren **630 × 630**-Quadrat, damit WhatsApp und schmale Mobilansichten beim quadratischen Zuschnitt keine Ränder abschneiden.
2. **Sicher unter 300 KB für WhatsApp bleiben**: Fotografische PNGs überschreiten schnell 800 KB und fallen in WhatsApp komplett weg. Skalieren Sie Motive exakt im [Bildgröße ändern-Tool](/de/werkzeuge/resize-image), konvertieren Sie schwere Dateien über den [WebP-Konverter](/de/werkzeuge/convert-to-webp) oder komprimieren Sie JPEG/WebP mit dem [Bildkomprimierer](/de/werkzeuge/compress-image) zuverlässig unter 300 KB.
3. **Cold-Cache-Voraballokation mit `width` und `height`**: Beim allerersten Teilen einer neuen URL parst Facebook das HTML synchron, dekodiert unbekannte Bilddateien jedoch asynchron. Explizite Angaben in `og:image:width`, `og:image:height`, `og:image:type` und ein beschreibender `og:image:alt`-Text reservieren sofort die volle Kartenfläche und verhindern leere Textkarten beim Erst-Share.
4. **Keine SVGs und keine `data:`-URIs live ausliefern**: Social-Crawler rastern weder SVG-Dateien noch eingebettete Base64-URIs. Lokale Entwürfe visualisiert dieses Werkzeug sofort über `FileReader`, ersetzt sie im exportierten HTML aber automatisch durch eine `https://`-Platzhalteradresse als Deployment-Erinnerung.

## Spezialisierte Objekttypen und CLI-Verifizierung

Jenseits von `og:type="website"` schalten vertikale Objekttypen strukturierte Namensräume für E-Commerce-Kataloge, Redaktionen und Medienportale frei – im DACH-Raum inklusive regionaler Gebietsschema-Angaben über `og:locale` und `og:locale:alternate`:

```html
<meta property="og:type" content="product" />
<meta property="og:title" content="Mechanische Tastatur Zenith Pro (ISO-DE)" />
<meta property="og:description" content="Hot-Swap-fähige Tastatur im CNC-Aluminiumgehäuse. Sofort ab Lager lieferbar." />
<meta property="og:url" content="https://beispiel-shop.de/produkte/zenith-pro" />
<meta property="og:image" content="https://beispiel-shop.de/og/zenith-pro-v2.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Draufsicht auf die Aluminium-Tastatur Zenith Pro" />
<meta property="og:locale" content="de_DE" />
<meta property="og:locale:alternate" content="de_AT" />
<meta property="og:locale:alternate" content="de_CH" />
<meta property="product:price:amount" content="189.90" />
<meta property="product:price:currency" content="EUR" />
<meta property="product:availability" content="instock" />
```

### Artikel-, Video- und Profil-Namensräume sowie Terminal-Check

Bei Fachbeiträgen (`og:type="article"`) ergänzen **ISO-8601-Zeitstempel** (`article:published_time`, `article:modified_time`), Autoren-Profil-URLs (`article:author`), Rubriken (`article:section`) und wiederholbare `article:tag`-Zeilen die Auszeichnung – jedes Schlagwort benötigt dabei ein eigenes `<meta>`-Element statt einer kommaseparierten Liste. Analog unterstützt der Generator mehrfache Prädikate wie `video:actor`, `video:director`, `music:musician` sowie Profil-Felder (`profile:first_name`, `profile:last_name`, `profile:username`).

Prüfen Sie nach dem Deployment direkt im Terminal mit simuliertem Crawler-User-Agent, ob sämtliche Tags serverseitig ohne JavaScript in der initialen Antwort stehen:

```bash
curl -sL -A "facebookexternalhit/1.1" https://beispiel-shop.de/produkte/zenith-pro \
  | grep -iE 'property="(og|product|article):'
```

## Häufige Produktionsfehler und Cache-Invalidierung

- **`property` vs. `name` und X-Fallback**: Open Graph erfordert `property="og:..."`, während X sein eigenes Vokabular über `name="twitter:..."` liest. Für maßgeschneiderte X-Karten (`summary_large_image`, Player- oder App-Cards) ergänzt der [Twitter-Card-Generator](/de/werkzeuge/twitter-card-generator) Ihren Workflow; sämtliche `<head>`-Tags inklusive JSON-LD bündelt der [Meta-Tag-Generator](/de/werkzeuge/meta-tag-generator).
- **WAF-Sperren und Weiterleitungsketten**: Restriktive Firewalls blockieren `LinkedInBot` oder `Slackbot-LinkExpanding` oft mit `403 Forbidden` oder Bot-Challenges. Prüfen Sie Statuscodes im [HTTP-Header-Checker](/de/werkzeuge/http-header-checker) und bereinigen Sie Weiterleitungsketten mit dem [Redirect-Checker](/de/werkzeuge/redirect-checker).
- **Unversionierte Bild-Updates**: Überschreiben Sie `/og/home.jpg` unter identischer URL, liefern Plattform-CDNs oft tagelang das alte Motiv aus. Versionieren Sie geänderte Dateien konsequent im Dateinamen (`/og/home-v2.jpg` oder `?v=2`) vor dem erneuten Abruf im Debugger.
- **Rein clientseitige SPA-Injektion**: Metadaten, die erst nach der Browser-Hydration entstehen, bleiben für statische Crawler unsichtbar – rendern Sie Open-Graph-Tags stets per SSR, SSG oder Edge-Middleware wie `generateMetadata` in Next.js oder `useSeoMeta` in Nuxt.
