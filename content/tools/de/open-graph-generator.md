---
metaTitle: "Open Graph Generator | Facebook, Twitter & LinkedIn Vorschau"
metaDescription: "Entwerfen und generieren Sie Open Graph (OG) Meta-Tags für Facebook, LinkedIn, Slack und WhatsApp. Simulieren Sie Social-Media-Vorschaukarten in Echtzeit."
metaKeywords: "open graph generator, og tags generator, facebook vorschau simulator, linkedin vorschau, twitter card generator, og:image größe, website metadaten"
title: "Open Graph Generator"
shortDescription: "Entwerfen, testen und generieren Sie Open Graph (OG) Meta-Tags für Social Media. Simulieren Sie Freigabekarten in Echtzeit."
faqs:
  - question: "Was ist der Unterschied zwischen HTML-Meta-Tags und Open Graph-Tags?"
    answer: "Standard-HTML-Meta-Tags ('title' und 'description') sind für Suchmaschinen wie Google gedacht. Open Graph-Tags (mit dem Präfix 'og:') sind für Social-Sharing-Plattformen (wie Facebook, LinkedIn, Discord) gedacht, um beim Teilen von Links visuelle Karten zu rendern."
  - question: "Was ist die ideale Größe für ein Open-Graph-Bild?"
    answer: "Die empfohlene Größe für ein Widescreen-Open-Graph-Bild beträgt 1200 x 630 Pixel (Seitenverhältnis 1,91:1). Wenn Sie sicherstellen möchten, dass Ihr Bild auf WhatsApp richtig angezeigt wird (das Vorschaubilder quadratisch zuschneidet), platzieren Sie wichtige Inhalte im mittleren 630x630 Bereich."
  - question: "Warum wird das Vorschaubild nicht auf WhatsApp angezeigt?"
    answer: "Dies hat zwei Hauptgründe: 1) Die Bild-URL ist relativ ('/images/og.png') statt absolut ('https://.../og.png'). 2) Die Bilddateigröße überschreitet 300 KB. WhatsApp ignoriert Bilder, die dieses Limit überschreiten."
  - question: "Wie lösche ich die Open Graph-Vorschau im Cache von Facebook oder LinkedIn?"
    answer: "Soziale Netzwerke speichern Vorschauen zwischen. Sie müssen den Facebook Sharing Debugger oder den LinkedIn Post Inspector besuchen, Ihre URL eingeben und auf 'Scrape Again' klicken, um den Cache der Server zu leeren."
  - question: "Kann ich SVG-Bilder für das Open-Graph-Bild verwenden?"
    answer: "Nein. Die meisten Social Crawler (einschließlich Facebook und LinkedIn) unterstützen keine SVG-Dateien. Verwenden Sie PNG, JPEG oder optimierte WebP-Bilder für Ihre 'og:image'-Tags."
features:
  - "Interaktiver Generator für Standard- und spezielle OG-Eigenschaften (Artikel, Produkt, Profil)"
  - "Drag & Drop-Bild-Upload mit automatischer Überprüfung des Seitenverhältnisses und Größenwarnungen"
  - "Realistische Live-Vorschauen für Facebook, LinkedIn, Discord, Slack, WhatsApp und X"
  - "Automatischer Warnungs- und Empfehlungs-Check"
  - "Vorgefertigte Vorlagen (SaaS, Blog, E-Commerce, Portfolio)"
  - "Lokale Speicherung des Verlaufs zum Wiederherstellen von Konfigurationssitzungen"
  - "100 % clientseitige Ausführung"
useCases:
  - "Optimierung der Linkvorschau auf Facebook und LinkedIn, um Klicks zu erhöhen"
  - "Erstellen professioneller E-Commerce-Produktkarten mit Preisen und Währungen"
  - "Formatieren von Blog-Artikeln mit Publikationsdaten, Kategorie-Tags und Autorenprofilen"
  - "Testen von zugeschnittenen Social-Media-Karten (wie bei WhatsApp) vor Veröffentlichung"
howToSteps:
  - "Wählen Sie eine Vorlage (z.B. Blog) aus der Konfigurationsleiste."
  - "Geben Sie Seitentitel, Beschreibung und die kanonische URL (Canonical) ein."
  - "Laden Sie ein Vorschaubild hoch oder geben Sie eine Bild-URL ein. Achten Sie auf die Warnungen des Größenprüfers."
  - "Wählen Sie unter 'OG Object Type' den Schematyp (z. B. Artikel oder Produkt) für spezielle Felder."
  - "Wechseln Sie zwischen den Registerkarten (Facebook, LinkedIn), um die Vorschaukarten zu überprüfen."
  - "Klicken Sie auf 'HTML kopieren', um den Code-Block direkt in den <head>-Bereich der Webseite einzufügen."
---

## Einführung in das Open Graph Protokoll

Im modernen Web-Ökosystem werden Inhalte nicht mehr nur über Suchmaschinen entdeckt. Ein massiver Teil des Datenverkehrs wird durch Nutzer gesteuert, die Links auf sozialen Plattformen (Facebook, LinkedIn, X, WhatsApp) teilen. Wenn jemand einen Link teilt, sieht er selten nur eine Text-URL. Stattdessen wird eine interaktive, ansprechende Vorschaukarte gerendert.

Diese Interaktion wird durch das **Open Graph Protokoll** (OGP) gesteuert. Es wurde 2010 von Facebook entwickelt und verwandelt Webseiten in \"Rich Objects\". Durch das Platzieren von standardisierten `<meta>`-Tags im HTML-Kopf (`<head>`) können Entwickler genau steuern, wie ihre Websites auf sozialen Netzwerken formatiert werden.

---

## Warum Open Graph so wichtig ist

Open Graph-Tags haben zwar keinen direkten Einfluss auf Ihr Google-Ranking, sie haben jedoch massive indirekte Auswirkungen:

1. **Click-Through-Rate (CTR)**: Eine schöne Vorschaukarte mit einem hochauflösenden Bild und einer klaren Beschreibung wird viel häufiger angeklickt als ein defekter Link.
2. **Markenkontrolle**: Indem Sie `og:image` angeben, verhindern Sie, dass Social-Media-Plattformen generische Platzhalter-Logos auswählen.
3. **Soziale Bewährtheit**: Reichhaltige Vorschauen lassen geteilte Links legitim und professionell aussehen, was Vertrauen schafft.

---

## Plattform-Analyse: So werden Vorschauen gerendert

Verschiedene Plattformen parsen Open-Graph-Tags unterschiedlich:

### 1. Facebook: Der Goldstandard
Facebook empfiehlt ein **Seitenverhältnis von 1,91:1**. Das Bild muss mindestens **600 x 315 Pixel** groß sein, besser noch **1200 x 630 Pixel** für hochauflösende Bildschirme. Ist es kleiner, wird es zu einem winzigen, unattraktiven Quadrat geschrumpft.

### 2. LinkedIn: B2B-Plattform
LinkedIn verwendet ein ähnliches Breitbild-Format (1,91:1). Es schneidet Titel bei etwa **70 Zeichen** und Beschreibungen bei **150 Zeichen** ab.

### 3. Slack & Discord
Kollaborations-Apps betten eine Rich-Vorschau in Chat-Threads ein. Slack unterstützt Lesedaten und Autor-Tags. Discord unterstützt sogar Farb-Akzentleisten (über `theme-color`).

### 4. WhatsApp: Mobile Peer-to-Peer
WhatsApp generiert Vorschauen lokal auf dem Gerät des Senders. Es zeigt nur ein kleines, quadratisches Thumbnail an. 
* Wenn Ihr Bild nicht **Crop-Safe** ist, werden Details abgeschnitten.
* Dateigröße: Wenn Ihr Bild **größer als 300 KB** ist, schlägt die Anzeige bei WhatsApp komplett fehl.

---

## Anleitung zu den wichtigsten Open Graph Tags

Damit Open Graph funktioniert, benötigen Sie vier Pflicht-Eigenschaften in Ihrem HTML-Header:

```html
<meta property=\"og:title\" content=\"Der Titel\" />
<meta property=\"og:type\" content=\"website\" />
<meta property=\"og:image\" content=\"https://beispiel.de/bild.jpg\" />
<meta property=\"og:url\" content=\"https://beispiel.de/seite\" />
```

* `og:title`: Halten Sie den Titel unter 60 Zeichen.
* `og:description`: 60-90 Zeichen sind ideal für die Vorschau.
* `og:image`: Muss eine **absolute URL** sein (mit https://).
* `og:type`: Das Objekt (z.B. `website`, `article`).

---

## Spezielle Open Graph Objekttypen

### 1. Der Artikel (`og:type=\"article\"`)
Für Blogbeiträge und News:
* `article:published_time`: Das ISO-Datum.
* `article:author`: Profil-URL des Autors.

### 2. Das Produkt (`og:type=\"product\"`)
Für E-Commerce-Kataloge:
* `product:price:amount`: Der numerische Preis (z.B. `49.99`).
* `product:price:currency`: Währungscode (z.B. `EUR`).
* `product:availability`: Lagerstatus (z.B. `instock`).

---

## Checkliste für Entwickler (Open Graph Image)

* **Abmessungen**: **1200 x 630 Pixel**.
* **Seitenverhältnis**: Exakt **1,91:1**.
* **Dateiformat**: **PNG**, **JPEG**, oder **WebP** verwenden (Kein SVG).
* **Safe Zone**: Wichtige Inhalte (Gesichter, Texte) in der Mitte eines **630 x 630** Quadrats zentrieren.
* **Dateigröße**: Unbedingt **unter 300 KB** komprimieren.

Mit unserem integrierten Simulator können Sie all diese Spezifikationen live in Ihrem Browser überprüfen.
