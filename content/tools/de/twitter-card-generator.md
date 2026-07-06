---
metaTitle: "Twitter Card Generator | X Social Preview & HTML Meta Tags"
metaDescription: "Generieren Sie gültige Twitter/X Card Meta-Tags. Erstellen Sie Summary-, App- und Player-Karten mit Echtzeit-Vorschau und HTML-Export."
metaKeywords: "twitter card generator, twitter meta tags, x card generator, twitter seo tool, social media vorschau, summary card generator, twitter og tags"
title: "Twitter (X) Card Generator"
shortDescription: "Erstellen und testen Sie Meta-Tags für Twitter Cards. Simulieren Sie Echtzeit-Vorschauen (Summary, App, Player) für X (ehemals Twitter)."
faqs:
  - question: "Was ist der Unterschied zwischen einer Summary Card und einer Summary Large Image Card auf X?"
    answer: "Eine 'Summary Card' zeigt links ein kleines quadratisches Vorschaubild (min. 144x144 px) an. Eine 'Summary Large Image Card' zeigt ein großes, breites Bild (empfohlen 1200x628) über dem Text. Die Variante mit dem großen Bild erzielt bei visuellen Inhalten wie News-Artikeln die höchste Klickrate."
  - question: "Brauche ich sowohl Twitter Card- als auch Open Graph-Tags?"
    answer: "Nicht zwingend. Wenn Twitter-spezifische Tags fehlen greift X (Twitter) auf Open Graph (OG) Tags zurück. Das einzige Pflicht-Tag ist 'twitter:card'. Für plattformspezifische Optimierungen (z. B. ein anderer Titel für X) sollten Sie jedoch beide definieren."
  - question: "Was ist die empfohlene Bildgröße für Twitter Cards?"
    answer: "Für 'Summary Cards': mind. 144x144 Pixel (1:1). Für 'Summary Large Image': 1200x628 Pixel (1,91:1). Bilder müssen unter 5 MB groß sein und über HTTPS ausgeliefert werden. SVG-Dateien werden vom Twitterbot nicht unterstützt."
  - question: "Warum wird meine Twitter-Karte nicht angezeigt, wenn ich einen Link auf X teile?"
    answer: "Häufige Ursachen: 1) Das Tag 'twitter:card' fehlt. 2) Relative Bild-URLs anstelle von absoluten HTTPS-URLs. 3) Blockieren des 'Twitterbot' Crawlers in der robots.txt. 4) Bereitstellen von Bildern über HTTP. 5) X zeigt veraltete Cache-Daten an."
  - question: "Wie lösche ich die zwischengespeicherte Twitter-Karten-Vorschau auf X?"
    answer: "X speichert Kartenmetadaten oft für ca. 7 Tage. Um eine Aktualisierung zu erzwingen, nutzen Sie den offiziellen Card Validator (cards-dev.x.com/validator). Geben Sie Ihre URL ein und klicken Sie auf 'Preview card', um den Cache zu leeren."
features:
  - "Interaktiver Editor für alle 4 Arten von Twitter Cards (Summary, Large Image, App, Player)."
  - "Pixelgenaue Live-Vorschau (Social Preview), genau wie in der X Timeline."
  - "Automatische Erkennung des Open Graph-Fallbacks."
  - "Zeichenzähler (Titel max. 70, Beschreibung max. 200 Zeichen) mit Echtzeit-Warnungen."
  - "App Card-Erstellung mit iOS- und Android-Konfigurationsfenstern."
  - "Ein-Klick-HTML-Export in die Zwischenablage."
  - "100 % clientseitige Ausführung ohne Server-Uploads."
useCases:
  - "Optimierung der Klickraten (CTR) auf X durch große Vorschaubilder."
  - "Erstellung von App Cards für mobile Installationskampagnen."
  - "Vorschau von Inhalten vor dem Go-Live, um falsche Bildzuschnitte zu vermeiden."
  - "Player Card-Tags für Podcaster und Video-Creator."
howToSteps:
  - "Wählen Sie den Twitter Card-Typ (Summary, Summary Large Image, App oder Player)."
  - "Geben Sie Seitentitel (max. 70) und Beschreibung (max. 200 Zeichen) ein."
  - "Geben Sie die HTTPS-URL des Bildes ein oder laden Sie eines hoch."
  - "Fügen Sie die Twitter-Handles (@site, @creator) hinzu."
  - "Überprüfen Sie das Live-Vorschau-Fenster."
  - "Klicken Sie auf 'HTML kopieren' und fügen Sie den Code in den <head> Ihrer Website ein."
---

## Einführung in Twitter Cards (X)

Wenn Links auf Twitter (jetzt **X**) geteilt werden, erweitert die Plattform diese URLs automatisch in ansprechende Inhaltskarten. Diese sogenannten **Twitter Cards** wandeln langweilige Text-Tweets in medienreiche Posts um, die die Klickraten (CTR) und das Engagement drastisch erhöhen.

Diese Karten werden über spezielle HTML-`<meta>`-Tags im `<head>`-Bereich generiert. Wenn der X-Crawler (**Twitterbot**) eine URL abruft, liest er diese Meta-Tags aus. 

---

## Die 4 Twitter Card-Typen

### 1. Summary Card
Der Standard. Zeigt links ein kleines Vorschaubild (Thumbnail) und rechts Text an. Gut für allgemeine Blogartikel.

### 2. Summary Large Image Card
Die erfolgreichste Karte. Sie platziert ein **großes, vollflächiges Bild** (empfohlen 1200x628 Pixel) über dem Titel und der Beschreibung. Ideal für Portfolios, News und E-Commerce.

### 3. App Card
Perfekt für Mobile App-Entwickler. Zeigt Icon, Preis, Bewertung und einen direkten Download-Button zum App Store (iOS) oder Google Play.

### 4. Player Card
Für die direkte Wiedergabe von Video- und Audio-Dateien innerhalb des Feeds (wird oft von YouTube, SoundCloud etc. genutzt).

---

## Wichtige Twitter Meta-Tags (Markup)

Ein gültiges Markup für die *Summary Large Image* Karte sieht so aus:

```html
<meta name=\"twitter:card\" content=\"summary_large_image\" />
<meta name=\"twitter:site\" content=\"@IhrHandle\" />
<meta name=\"twitter:title\" content=\"Titel (max 70 Zeichen)\" />
<meta name=\"twitter:description\" content=\"Beschreibung der Webseite (max 200 Zeichen).\" />
<meta name=\"twitter:image\" content=\"https://beispiel.de/bild.jpg\" />
```

* Das `twitter:card` Tag ist das **wichtigste**. Fehlt es, rendert X eine winzige Summary Card oder nutzt Open Graph Fallbacks nicht richtig.

---

## Open Graph vs. Twitter Cards

X (Twitter) greift automatisch auf Ihre Facebook Open Graph (`og:`) Tags zurück, wenn bestimmte `twitter:` Tags fehlen.
Wenn Sie beispielsweise kein `twitter:title` haben, wird `og:title` gelesen.
Sie müssen jedoch **immer** das Tag `twitter:card` definieren!

---

## Häufige Fehler vermeiden

1. **Relative Bild-URLs**: Der Twitterbot versteht `/images/bild.png` nicht. Sie benötigen eine absolute URL (`https://...`).
2. **HTTP-Bilder**: X erfordert **HTTPS** für alle eingebetteten Ressourcen.
3. **Robots.txt blockiert Twitterbot**: Stellen Sie sicher, dass Ihr Server den Crawler *Twitterbot* nicht sperrt.
4. **Fehlender Cache-Reset**: Wenn Sie Fehler an Ihrer Karte korrigieren, ändert sich bei X oft stundenlang nichts. Gehen Sie auf den offiziellen Card Validator, um den Cache für Ihre URL manuell zu leeren.

Nutzen Sie unseren **Twitter Card Generator**, um das Verhalten in Echtzeit zu simulieren und syntaktisch einwandfreien HTML-Code in Sekunden zu exportieren!
