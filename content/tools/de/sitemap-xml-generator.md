---
metaTitle: "Sitemap.xml Generator & Index-Builder | SEO-XML-Validator"
metaDescription: "Erstellen Sie valide XML-Sitemaps (Standard, Bild, Video, News) und Sitemap-Indexdateien mit Next.js-Vorlagen, 45k-ZIP-Splitting und Validator."
metaKeywords: "sitemap xml generator, sitemap erstellen, sitemap index builder, xml sitemap validator, google image sitemap, video sitemap, google news sitemap, nextjs sitemap xml, seo sitemap protokoll 0.9"
title: "Sitemap.xml Generator"
shortDescription: "Erstellen Sie valide Standard-, Bilder-, Video- und News-XML-Sitemaps sowie mehrteilige Sitemap-Indexdateien mit Framework-Vorlagen, Echtzeit-Protokollprüfung und automatischer 45.000-URL-ZIP-Partitionierung – 100 % clientseitig."
faqs:
  - question: "Welche harten Limits gelten für URL-Anzahl und Dateigröße einer einzelnen XML-Sitemap?"
    answer: "Nach dem Sitemaps-Protokoll 0.9 darf eine einzelne XML-Sitemap höchstens 50.000 URLs enthalten und unkomprimiert maximal 50 MB (52.428.800 Bytes) groß sein. Überschreitet Ihre Website eine dieser beiden Grenzen, teilen Sie die Einträge auf mehrere Kind-Sitemaps auf und referenzieren diese über eine übergeordnete Sitemap-Indexdatei."
  - question: "Wie bewerten Google und Bing heute die Tags lastmod, changefreq und priority?"
    answer: "Sowohl Google als auch Bing ignorieren die Werte in priority und changefreq vollständig, da viele CMS-Plugins pauschal jede Seite mit 1.0 und daily ausgeben. Das Tag lastmod im W3C-Datetime-Format werten beide Suchmaschinen hingegen aktiv aus, um Recrawls gezielt auf tatsächlich aktualisierte Inhalte zu lenken."
  - question: "Wann sollte ich von einer einzelnen urlset-Sitemap auf eine sitemapindex-Datei umsteigen?"
    answer: "Der Wechsel auf einen Sitemap-Index empfiehlt sich, sobald sich Ihr URL-Inventar der Grenze von 50.000 Seiten oder 50 MB nähert – oder bereits früher, wenn Sie getrennte Seitentypen wie Produkte, Ratgeberartikel und Videos in der Google Search Console separat auf Indexierungsfehler auswerten möchten."
  - question: "Welche XML-Namensräume sind für Bilder-, Video- und Google-News-Sitemaps erforderlich?"
    answer: "Standard-Sitemaps deklarieren xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'. Für Rich-Media-Erweiterungen müssen im Wurzelelement urlset zusätzlich xmlns:image='http://www.google.com/schemas/sitemap-image/1.1', xmlns:video='http://www.google.com/schemas/sitemap-video/1.1' oder xmlns:news='http://www.google.com/schemas/sitemap-news/0.9' angegeben werden – dieser Generator ergänzt sie automatisch."
  - question: "Warum warnt der Live-Validator bei Query-Parametern, doppelten URLs oder fehlendem HTTPS?"
    answer: "Suchmaschinen erwarten in einer Sitemap ausschließlich kanonische, über HTTPS erreichbare 200-OK-Zieladressen. Doppelte Pfade verschwenden Crawl-Budget, Query-Parameter wie ?utm_ oder ?sort= erzeugen Duplicate-Content-Konflikte, und unverschlüsselte HTTP-Hosts spalten Indexierungssignale von Ihrer sicheren Hauptdomain ab."
features:
  - "Dual-Modus-XML-Builder für Sitemaps-0.9-Dateien (<urlset>) und mehrteilige Master-Indexdateien (<sitemapindex>) mit formatierter oder minifizierter Ausgabe"
  - "Automatische XML-Namensraum-Deklaration und strukturierte Eingabemasken für Google-Bilder- (1.1), Video- (1.1) und Google-News-Erweiterungen (0.9)"
  - "Vier direkt anpassbare Framework- und Projektvorlagen für Next.js App Router, E-Commerce-Kataloge, Blogs/Magazine und SaaS-Dokumentationen"
  - "Massenimport zeilengetrennter URL-Listen mit automatischer Host-Normalisierung, Live-Suchfilter, paginierter Verwaltung und lokaler Speicherung im Browser"
  - "Echtzeit-SEO-Validator für HTTPS-Konformität, 50.000-URL- und 50-MB-Schwellenwerte, Startseitenabdeckung, Duplikate, Query-Parameter und Pflichtfelder der Erweiterungen"
  - "Clientseitige ZIP-Partitionierung (via JSZip), die Bestände über 45.000 URLs automatisch in nummerierte Kind-Sitemaps samt Master-Index aufteilt"
useCases:
  - "Erstellung einer sauberen kanonischen sitemap.xml-Basis für neue Next.js-15-App-Router-, Astro- oder statische Websites vor dem Livegang"
  - "Aufteilung umfangreicher E-Commerce-Produktkataloge jenseits von 50.000 Artikeln in protokollkonforme Kind-Sitemaps unter einer zentralen sitemap-index.xml"
  - "Ergänzung von image:image-Knoten (URL, Titel, Bildunterschrift) für Produktgalerien und Fotostrecken zur schnelleren Erfassung in Google Bilder"
  - "Deklaration von video:video-Vorschaubildern, Player- und Stream-URLs auf JavaScript-gerenderten Landingpages, deren Einbettungen Crawler sonst übersehen"
  - "Ausgabe zeitkritischer Google-News-Sitemaps (news:news) mit ISO-639-Sprachcode und Veröffentlichungszeitstempel innerhalb des 48-Stunden-Fensters"
  - "Bereinigung massenhaft exportierter CMS-URL-Listen von Duplikaten und Tracking-Parametern vor dem Einreichen in Google Search Console und Bing Webmaster Tools"
howToSteps:
  - "Tragen Sie Ihre kanonische HTTPS-Basis-URL (z. B. https://beispiel.de) ein und wählen Sie den Modus Standard-Sitemap (<urlset>) oder Sitemap-Index (<sitemapindex>)."
  - "Starten Sie mit einer der vier Vorlagen (Next.js App Router, E-Commerce, Blog oder SaaS), importieren Sie URLs gesammelt über den Massenimport oder erfassen Sie Routen einzeln."
  - "Konfigurieren Sie bei Bedarf lastmod-, changefreq- und priority-Werte und wählen Sie für spezialisierte Google-Erweiterungen den passenden Eintragstyp (Bild, Video oder News)."
  - "Prüfen Sie das Echtzeit-Validierungspanel auf HTTPS-Konformität, fehlende Duplikate und Parameter, vollständige Erweiterungsfelder sowie sichere Dateigröße."
  - "Wählen Sie zwischen formatiertem XML (2 Leerzeichen Einrückung) oder minifizierter Ausgabe und kopieren oder laden Sie sitemap.xml bzw. sitemap-index.xml direkt herunter."
  - "Nutzen Sie bei großen Beständen den partitionierten ZIP-Download (45.000 URLs pro Teil-Sitemap inkl. Index), laden Sie die Dateien ins Stammverzeichnis hoch und verlinken Sie den Index in der robots.txt."
---

Eine XML-Sitemap ist kein direkter Ranking-Faktor, sondern ein maschinenlesbares **kanonisches URL-Inventar** nach dem **Sitemaps-Protokoll 0.9**, das von Google, Bing, Yandex und Yahoo gleichermaßen unterstützt wird. Während Suchmaschinen-Bots kleinere Unternehmenswebsites mit flacher Navigation meist vollständig über interne Links erschließen, beschleunigt eine valide `sitemap.xml` bei neu gestarteten Domains, tief verschachtelten Online-Shops, JavaScript-gerenderten Next.js-Anwendungen oder umfangreichen Redaktionsportalen sowohl die Erstentdeckung als auch die zeitnahe Aktualisierung geänderter Inhalte. Da dieser Generator Erstellung, Validierung und ZIP-Partitionierung vollständig clientseitig im Browser ausführt, gelangen unveröffentlichte Routenstrukturen und geplante Produkt-Slugs zu keinem Zeitpunkt auf externe Drittserver.

## Protokollspezifikation 0.9: Limits, Kodierung und tatsächliche Crawler-Signale

Die XML-Parser der Suchmaschinen prüfen Sitemaps streng gegen die Protokollvorgaben und weisen fehlerhafte Dateien in der Search Console mit Abruffehlern zurück:

- **Harte Mengen- und Größenlimits**: Jede einzelne unkomprimierte Sitemap-Datei darf maximal **50.000 `<url>`-Elemente** umfassen und höchstens **50 MB (52.428.800 Bytes)** groß sein. Eine `<sitemapindex>`-Datei kann wiederum bis zu 50.000 Kind-Sitemaps referenzieren – rechnerisch also bis zu 2,5 Milliarden kanonische URLs. Um Grenzwertüberschreitungen im Produktivbetrieb auszuschließen, partitioniert der integrierte JSZip-Exporter große Listen automatisch bei **45.000 URLs pro Teil-Sitemap** und hält damit einen Sicherheitspuffer von 5.000 Einträgen ein.
- **UTF-8-Kodierung, XML-Escaping und RFC 3986**: Jede Datei muss mit `<?xml version="1.0" encoding="UTF-8"?>` beginnen, ausschließlich vollständige absolute HTTPS-URLs führen und reservierte XML-Zeichen sauber maskieren (`&amp;`, `&apos;`, `&quot;`, `&lt;`, `&gt;`). Nicht-ASCII-Zeichen wie Umlaute in URL-Pfaden müssen UTF-8-prozentkodiert werden – zur schnellen Prüfung einzelner Pfade eignet sich der [URL-Encoder](/de/werkzeuge/url-encoder).
- **Host- und Verzeichnis-Geltungsbereich**: Eine unter `https://beispiel.de/blog/sitemap.xml` gehostete Sitemap ist nach Protokoll ausschließlich für URLs unterhalb von `/blog/` maßgeblich. Platzieren Sie Ihre zentrale `sitemap.xml` oder `sitemap-index.xml` daher stets im Stammverzeichnis Ihrer Domain.
- **Welche Signale Suchmaschinen wirklich auswerten**: Googlebot und Bingbot **ignorieren `<priority>` und `<changefreq>`** inzwischen konsequent, weil ältere CMS-Plugins standardmäßig nahezu jede Seite mit `1.0` und `daily` versahen. Aktiv genutzt wird hingegen **`<lastmod>`** im W3C-Datetime-Format (etwa `2026-11-24` oder `2026-11-24T14:30:00+01:00`) – allerdings nur, wenn der Zeitstempel echte inhaltliche Änderungen widerspiegelt und nicht blind bei jedem CI-Build neu gesetzt wird.

## XML-Namensräume und Spezifikation der Google-Erweiterungen

Über reguläre Web-URLs hinaus spezifiziert Google dedizierte XML-Namensräume, die direkt innerhalb von `<url>`-Blöcken eingebettet werden, um Bilder, eingebettete Videostreams und tagesaktuelle Nachrichten unabhängig vom JavaScript-Rendering auffindbar zu machen:

| Sitemap-Schema | Wurzel- / Knoten-Element | Vorgeschriebener Namensraum (`xmlns`) | Pflicht-Kindelemente | Protokolllimits & Betriebshinweise |
| :--- | :--- | :--- | :--- | :--- |
| **Core Sitemap 0.9** | `<urlset>` / `<url>` | `http://www.sitemaps.org/schemas/sitemap/0.9` | `<loc>` | Max. 50.000 URLs oder 50 MB unkomprimiert; `<lastmod>` dringend empfohlen |
| **Sitemap Index 0.9** | `<sitemapindex>` / `<sitemap>` | `http://www.sitemaps.org/schemas/sitemap/0.9` | `<loc>` | Max. 50.000 Kind-Sitemaps; `<lastmod>` markiert jeweils jüngste Änderung |
| **Google Bilder 1.1** | `<image:image>` | `http://www.google.com/schemas/sitemap-image/1.1` | `<image:loc>` | Bis zu 1.000 Bilder je `<url>`; erschließt CDN- und Lazy-Loading-Grafiken |
| **Google Video 1.1** | `<video:video>` | `http://www.google.com/schemas/sitemap-video/1.1` | `<video:thumbnail_loc>`, `<video:title>`, `<video:description>` sowie `content_loc` oder `player_loc` | Deklariert Vorschaubilder, Player-URLs und Videostreams für die Videosuche |
| **Google News 0.9** | `<news:news>` | `http://www.google.com/schemas/sitemap-news/0.9` | `<news:publication>` (`name`, `language`), `<news:publication_date>`, `<news:title>` | Nur Artikel der letzten **48 Stunden**; maximal 1.000 URLs pro Datei |

## Praxisbeispiele: Bild-Erweiterung und Index-Partitionierung

Kombinieren Sie reguläre URLs mit Bild-Metadaten, sollten im Wurzelelement `<urlset>` ausschließlich jene XML-Namensräume deklariert werden, die tatsächlich im Dokument vorkommen:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://beispiel-shop.de/produkte/buerostuhl-ergo</loc>
    <lastmod>2026-11-20</lastmod>
    <image:image>
      <image:loc>https://cdn.beispiel-shop.de/bilder/buerostuhl-ergo-front.webp</image:loc>
      <image:title>Ergonomischer Netz-Bürostuhl Ergo</image:title>
      <image:caption>Verstellbarer Bürostuhl mit Lordosenstütze in Schiefergrau</image:caption>
    </image:image>
  </url>
</urlset>
```

Sobald Ihr Bestand 45.000 URLs übersteigt – oder Sie in der Google Search Console getrennte Indexierungsquoten für Produkte, Ratgeber und Dokumentation beobachten möchten – bündeln Sie alle Teil-Sitemaps in einer zentralen `<sitemapindex>`-Datei:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://beispiel-shop.de/sitemap-part-1.xml</loc>
    <lastmod>2026-11-24</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://beispiel-shop.de/sitemap-part-2.xml</loc>
    <lastmod>2026-11-24</lastmod>
  </sitemap>
</sitemapindex>
```

### Deployment-Prüfung, Gzip-Komprimierung und Next.js-Workflow

Prüfen Sie nach dem Kopieren der generierten XML-Datei – oder nach dem Entpacken des partitionierten ZIP-Archivs – in Ihr `/public`-Verzeichnis bzw. Ihren CDN-Bucket per Terminal, ob der Endpunkt korrekt mit `HTTP/2 200` und `content-type: application/xml; charset=utf-8` antwortet statt auf eine HTML-Fehlerseite umzuleiten:

```bash
curl -I https://beispiel-shop.de/sitemap.xml
```

Umfangreiche Feeds lassen sich zur Bandbreitenschonung problemlos per Gzip (`.xml.gz`) ausliefern – beachten Sie dabei, dass das **50-MB-Limit stets für die unkomprimierte XML-Datei** gilt. Liegen Teil-Sitemaps auf einem externen Objektspeicher wie Amazon S3 oder Cloudflare R2, autorisieren Sie das Cross-Origin-Hosting über die Property-Verifizierung beider Domains in der Search Console und verweisen in Ihrer Stamm-`robots.txt` (`Sitemap: https://beispiel-shop.de/sitemap-index.xml`) mittels des [Robots.txt Generators](/de/werkzeuge/robots-txt-generator) auf die Master-Datei. Bei dynamischen Next.js-15-Projekten dient die integrierte App-Router-Vorlage als verlässlicher Bauplan, bevor Datenbankabfragen in `app/sitemap.ts` oder `generateSitemaps()` angebunden werden; da Google seinen historischen Ping-Endpunkt abgeschaltet hat, erfolgt die Benachrichtigung neuerdings verlässlich über Search Console, `robots.txt` und aktuelle `<lastmod>`-Werte.

## Crawl-Hygiene vor der Einreichung in der Search Console

Eine unsaubere Sitemap untergräbt das Vertrauen der Crawler und bindet Crawl-Kapazität auf nicht indexierbaren Endpunkten. Prüfen Sie vor dem Einreichen vier technische Grundregeln:

1. **Ausschließlich `200 OK`-URLs mit Selbst-Canonical aufnehmen**: Entfernen Sie `301`/`302`-Weiterleitungen, `404`/`410`-Fehlerseiten und nicht-kanonische Varianten. Umgezogene Pfade prüfen Sie vor dem Export zuverlässig mit dem [Redirect-Checker](/de/werkzeuge/redirect-checker), und saubere URL-Strukturen erzeugen Sie vorab im [Slug-Generator](/de/werkzeuge/slug-generator).
2. **Widersprüche zu `noindex` und `Disallow` ausschließen**: Eine URL gleichzeitig in der Sitemap zu melden und über `robots.txt` oder den Antwort-Header `X-Robots-Tag: noindex` zu sperren, erzeugt widersprüchliche Signale. Kontrollieren Sie Server-Header im [HTTP-Header-Checker](/de/werkzeuge/http-header-checker) und stimmen Sie HTML-Canonicals über den [Meta-Tag-Generator](/de/werkzeuge/meta-tag-generator) ab.
3. **Parameter-Facetten und Tracking-Tags fernhalten**: URLs mit Query-Parametern wie `?sort=preis`, `?farbe=grau` oder `?utm_source=newsletter` lösen im Live-Validator sofort Warnungen aus und gehören nicht in eine kanonische Sitemap.
4. **XML nach manuellen Anpassungen neu prüfen**: Werden CI-generierte Teil-Sitemaps von Hand zusammengeführt oder ergänzt, validieren Sie Wohlgeformtheit und Zeichen-Escaping vor dem Release im [XML-Formatter](/de/werkzeuge/xml-formatter).
