---
metaTitle: "Responsive Screen Tester: Multi-Device Viewport prüfen"
metaDescription: "Website-Layout in Echtzeit auf Smartphone, Tablet und Desktop testen: CSS-Breakpoints, Pixel-Lineale, Zoom und Split-Screen-Vergleich im Browser."
metaKeywords: "responsive screen tester, responsive design testen, viewport simulator, website mobile ansicht prüfen, css breakpoints testen, tailwind breakpoints, multi device simulator, mobile first test"
title: "Responsive Screen Tester"
shortDescription: "Prüfen Sie Webseiten in Echtzeit auf Smartphone-, Tablet-, Laptop- und individuellen Auflösungen – inklusive Rotationsmodus, Zoom-Skalierung, Pixel-Linealen und Split-Screen-Vergleich."
faqs:
  - question: "Warum meldet die Vorschau bei manchen Webseiten 'Verbindung verweigert'?"
    answer: "Aus Schutz vor Clickjacking senden viele Server die HTTP-Header 'X-Frame-Options: DENY' oder 'Content-Security-Policy: frame-ancestors none'. Browser blockieren dann das Einbetten der Seite in einem iframe. Für eigene Projekte können Sie die Header auf Staging-Systemen gezielt anpassen oder Ihre Anwendung lokal über localhost testen."
  - question: "Kann ich lokale Entwicklungsserver wie localhost:3000 im Simulator testen?"
    answer: "Ja. Solange Ihr lokaler Entwicklungsserver läuft und keine restriktiven Framing-Header ausliefert, lassen sich lokale Adressen direkt prüfen. Beachten Sie bei HTTPS-Kontexten die Mixed-Content-Regeln moderner Browser, die unverschlüsselte HTTP-Ziele außerhalb von localhost blockieren können."
  - question: "Ersetzt der Viewport-Simulator Tests auf echten iOS- und Android-Geräten?"
    answer: "Nein. Der Simulator prüft Layout-Umbruch, CSS-Media-Queries, Grid-Verhalten und Proportionen mithilfe Ihrer Desktop-Browser-Engine. Plattform-Eigenheiten wie iOS-Safari-Rubber-Banding, mobile Software-Tastaturen, WebKit-Font-Rendering oder GPU-Engpässe müssen vor dem Livegang zusätzlich auf realer Hardware oder in Xcode/Android-Emulatoren verifiziert werden."
  - question: "Warum unterscheidet sich die CSS-Pixelbreite eines Smartphones von der Herstellerauflösung?"
    answer: "Moderne Retina- und OLED-Displays bündeln mehrere physische Bildpunkte zu einem logischen CSS-Pixel – gesteuert über die Device Pixel Ratio (DPR). Ein iPhone mit 1179 x 2556 physischen Pixeln bei DPR 3 rendert Webseiten effektiv auf einem CSS-Viewport von 393 x 852 Pixeln."
  - question: "Wie erstelle ich trotz Cross-Origin-Schutz einen vollständigen Seiten-Screenshot?"
    answer: "Aufgrund der Same-Origin-Policy darf JavaScript keine fremden iframe-Inhalte auslesen oder abfotografieren. Öffnen Sie die Zielseite im Browser, drücken Sie F12 für die DevTools, starten Sie per Strg+Shift+P (macOS: Cmd+Shift+P) die Befehlspalette und führen Sie 'Capture full size screenshot' aus."
features:
  - "Echtzeit-Vorschau von Live-Webseiten und lokalen Entwicklungsservern über frei definierbare Viewport-Abmessungen."
  - "Vorkonfigurierte Geräte-Presets für aktuelle Smartphones, Tablets, Laptops und Widescreen-Monitore."
  - "Sofortiger Wechsel zwischen Hochformat (Portrait) und Querformat (Landscape) per Klick."
  - "Stufenlose Zoom-Skalierung (50 % bis 150 %) via CSS-Transform zur Inspektion von 2K- und 4K-Layouts auf kompakten Displays."
  - "Zuschaltbare horizontale und vertikale Pixel-Lineale sowie Rasterhilfen zur exakten Prüfung von Abständen und Ausrichtung."
  - "Multi-Device-Split-Screen-Ansicht und Barrierefreiheitsfilter für Kontrast, Graustufen und Textvergrößerung."
useCases:
  - "Überprüfung von CSS-Media-Queries und Container-Queries an kritischen Umbruchpunkten von 320px bis 2560px."
  - "Visuelle Qualitätssicherung von Tailwind-CSS- und Bootstrap-Grid-Layouts über mehrere Endgeräte hinweg."
  - "Aufspüren von horizontalem Overflow, abgeschnittenen Navigationen und überlappenden Karten im Querformat."
  - "Prüfung der Mobile-First-Indexing-Anforderungen und Core-Web-Vitals-Layoutstabilität vor einem Website-Relaunch."
  - "Schnelle Kontrolle von Checkout-Formularen, Cookie-Bannern und Call-to-Action-Buttons auf schmalen Smartphone-Displays."
  - "Direkte Kunden- und Team-Abnahmen durch parallelen Vergleich von Mobil-, Tablet- und Desktop-Darstellung."
howToSteps:
  - "Geben Sie die gewünschte Ziel-URL (z. B. https://ihre-domain.de oder http://localhost:3000) in die Adressleiste ein."
  - "Wählen Sie ein Geräte-Preset aus der Toolbar oder tragen Sie manuell eine benutzerdefinierte Breite und Höhe in CSS-Pixeln ein."
  - "Nutzen Sie die Rotationsfunktion, um das Layout sowohl im Hoch- als auch im Querformat zu kontrollieren."
  - "Aktivieren Sie bei Bedarf Pixel-Lineale, Rasterhilfen oder die Zoom-Skalierung für breite Desktop-Auflösungen."
  - "Wechseln Sie in die Split-Screen-Ansicht, um mehrere Breakpoints gleichzeitig nebeneinander zu vergleichen."
  - "Prüfen Sie abschließend mit den Kontrast- und Barrierefreiheitsfiltern, ob Lesbarkeit und Bedienbarkeit durchgängig gewahrt bleiben."
---

Moderne Webanwendungen müssen auf einem 360-Pixel-Smartphone ebenso fehlerfrei funktionieren wie auf einem faltbaren Tablet oder einem Ultrawide-Desktop-Monitor. Dennoch schleichen sich im Entwicklungsalltag schnell Layoutbrüche ein: Ein zu breiter Codeblock erzeugt horizontales Scrollen, eine fixierte Navigationsleiste verdeckt im Querformat den Hauptinhalt oder ein Checkout-Button rutscht aus dem sichtbaren Bereich. Der **Responsive Screen Tester** simuliert beliebige Viewport-Größen direkt im Browser und kombiniert präzise Pixel-Lineale, Zoom-Skalierung sowie parallele Gerätevergleiche zu einem effizienten Prüfwerkzeug für Frontend-Entwicklung, UX-Design und technisches SEO.

## Viewport-Architektur: CSS-Pixel, DPR und Visual Viewport

Um Testergebnisse korrekt zu interpretieren, muss zwischen physischen Hardware-Pixeln und logischen **CSS-Pixeln** unterschieden werden. Hochauflösende Smartphones arbeiten mit einer *Device Pixel Ratio* (DPR) von `2`, `3` oder höher. Ein Display mit `1179 × 2556` physischen Pixeln bei `DPR = 3` meldet CSS-Media-Queries exakt `393 × 852` CSS-Pixel. Genau diese logischen Maße bildet ein Viewport-Simulator ab.

Voraussetzung dafür ist die korrekte Deklaration im HTML-`<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Fehlt dieses Tag, legen mobile Browser automatisch einen virtuellen Desktop-Layout-Viewport (typischerweise `980px`) an und skalieren die gesamte Seite mikroskopisch klein herunter. Vermeiden Sie unbedingt Attribute wie `user-scalable=no` oder `maximum-scale=1`, da diese das manuelle Zoomen unterbinden und gegen WCAG-Barrierefreiheitskriterien verstoßen.

Ein weiteres technisches Detail betrifft den Unterschied zwischen **Layout Viewport** und **Visual Viewport** auf Mobilgeräten: Wenn sich auf Smartphones die Browser-Adressleiste beim Scrollen ein- oder ausblendet, ändert sich die effektiv sichtbare Höhe. Klassische `100vh`-Container schneiden dann häufig untere Buttons ab. Moderne CSS-Einheiten wie `100dvh` (*Dynamic Viewport Height*) oder `100svh` (*Small Viewport Height*) beheben dieses Problem zuverlässig.

## Gängige Geräte-Viewports und Framework-Breakpoints im Überblick

Anstatt starre Gerätemodelle nachzubauen, sollten Layouts inhaltsgetrieben umbrechen. Dennoch helfen die etablierten Raster-Systeme von Tailwind CSS und Bootstrap als strukturierte Orientierung beim systematischen Testen:

| Geräteklasse | Typischer CSS-Viewport | Typische DPR | Tailwind Breakpoint | Bootstrap 5 Breakpoint | Kritische Prüfpunkte |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Kleines Smartphone** | 320–375 × 667 px | 2× | Basis (`< 640px`) | `xs` (`< 576px`) | WCAG-Reflow, kein 2D-Scroll, Touch-Ziele |
| **Modernes Smartphone** | 390–430 × 844–932 px | 3× | Basis (`< 640px`) | `xs` (`< 576px`) | Sticky-Header, Cookie-Banner, Formularfelder |
| **Smartphone Querformat** | 640–844 × 390 px | 2×–3× | `sm` (`≥ 640px`) | `sm` (`≥ 576px`) | Geringe Viewport-Höhe, Modals, Menüs |
| **Tablet Hochformat** | 768–834 × 1024 px | 2× | `md` (`≥ 768px`) | `md` (`≥ 768px`) | 2-Spalten-Raster, Sidebar-Einblendung |
| **Laptop / Tablet Quer** | 1024–1366 × 768 px | 1×–2× | `lg` (`≥ 1024px`) | `lg` (`≥ 992px`) / `xl` (`≥ 1200px`) | Desktop-Navigation, Tabellenbreiten |
| **Desktop / Ultrawide** | 1440–2560 × 900–1440 px | 1×–2× | `xl` (`≥ 1280px`) / `2xl` (`≥ 1536px`) | `xxl` (`≥ 1400px`) | Maximale Zeilenlänge (`65–75ch`), Bildschärfe |

## Modernes Responsive CSS: Fluid Grids, clamp() und Container Queries

Klassische Breakpoint-Sprünge erzeugen oft unruhige Übergänge zwischen zwei Rasterstufen. Moderne Frontends kombinieren daher fließende Skalierung mit komponentenbasierten **CSS Container Queries**, die sich nicht an der gesamten Fensterbreite, sondern an der Breite des umschließenden Elternelements orientieren:

```css
/* Fluid Typography ohne harte Breakpoint-Sprünge */
h1 {
  font-size: clamp(1.75rem, 1.2rem + 2.2vw, 3.25rem);
  line-height: 1.15;
}

/* Komponentenabhängiges Layout mit Container Queries */
.card-wrapper {
  container-type: inline-size;
}

@container (width >= 420px) {
  .card {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 1.25rem;
  }
}

/* Mobile-freundliche Vollbild-Sektion ohne Adressleisten-Sprung */
.hero {
  min-height: 100svh;
}
```

Ein häufiger Fehler bei der Implementierung sind starre Breiten (`width: 600px`) oder lange URLs ohne Umbruch in Flex- und Grid-Kindern. Durch `min-width: 0` auf Grid- und Flex-Items sowie `overflow-wrap: anywhere` und `max-width: 100%` auf Medien verhindern Sie zuverlässig ungewollten horizontalen Überlauf.

### Responsive Bilder mit srcset, sizes und picture optimieren

Ein sauberes Layout nutzt wenig, wenn Mobilgeräte über Mobilfunknetze unnötig große Desktop-Banner herunterladen. Über das `srcset`-Attribut mit Breitendeskriptoren (`480w`, `960w`, `1600w`) in Kombination mit `sizes` wählt der Browser selbstständig die passende Bildvariante anhand von Viewport-Breite und DPR aus. Für unterschiedliche Seitenverhältnisse zwischen Smartphone und Desktop (Art Direction) greifen Sie zum `<picture>`-Element mit `<source media="(min-width: 768px)">`. Versehen Sie das oberste Hero-Bild zusätzlich mit `fetchpriority="high"` statt `loading="lazy"`, um den *Largest Contentful Paint (LCP)* nicht künstlich zu verzögern.

## Wie iframe-Simulatoren technisch arbeiten – und wo ihre Grenzen liegen

Der Responsive Screen Tester bettet die Ziel-URL in einen präzise dimensionierten `<iframe>` ein. Um große Zielauflösungen wie `1920 × 1080` oder `2560 × 1440` vollständig auf einem regulären Laptop-Monitor darzustellen, skaliert das Tool den Rahmen über `transform: scale()`. Entscheidend dabei: Die innere logische Fensterbreite (`window.innerWidth`) des iframes bleibt unverändert bei `1920px`, sodass sämtliche Media Queries exakt wie auf einem echten Full-HD-Monitor auslösen.

Gleichzeitig gelten zwei wichtige technische Rahmenbedingungen:

1. **Framing-Schutz durch Sicherheitsheader**: Sendet der Zielserver `X-Frame-Options: DENY`, `SAMEORIGIN` oder `Content-Security-Policy: frame-ancestors 'none'`, verweigert der Browser das Laden im iframe. Ob eine Domain das Einbetten blockiert, klären Sie sofort im [HTTP Header Checker](/de/werkzeuge/http-header-checker).
2. **Browser-Engine und Eingabemodalität**: Da der Simulator die Render-Engine Ihres Desktop-Browsers nutzt, bleiben plattformspezifische Effekte (etwa iOS-WebKit-Scrolling, Safe-Area-Insets durch Notch-Ausschnitte oder echte Touch-Ereignisse) außen vor. Prüfen Sie interaktive Hover-Menüs daher kritisch: Wichtige Aktionen dürfen niemals ausschließlich über `:hover` erreichbar sein, sondern müssen auf Touchscreens per Tap auslösen (`@media (hover: hover) and (pointer: fine)`).

## Mobile-First SEO, Barrierefreiheit und ergänzende Prüfungen

Da Suchmaschinen primär die mobile Version einer Website crawlen und bewerten (**Mobile-First Indexing**), wirken sich Layoutmängel direkt auf Sichtbarkeit und Conversion aus. Achten Sie insbesondere auf **WCAG 2.1 Reflow (1.4.10)** – Inhalte müssen bei `320 CSS-px` Breite ohne zweidimensionales Scrollen nutzbar bleiben – sowie auf ausreichende Klickflächen (mindestens `44 × 44` bis `48 × 48 CSS-px` mit klarer Trennung). Reservieren Sie zudem explizite `width`- und `height`-Attribute oder `aspect-ratio` für Bilder, um *Cumulative Layout Shift (CLS)* zu vermeiden.

Für eine ganzheitliche Qualitätssicherung verbinden Sie den Layout-Check idealerweise mit dem [Contrast Checker](/de/werkzeuge/contrast-checker) zur WCAG-Kontrastprüfung, testen kleine CSS-Anpassungen direkt im [HTML CSS JS Playground](/de/werkzeuge/html-css-js-playground), formatieren komplexe Stylesheets mit dem [CSS Beautifier](/de/werkzeuge/css-beautifier) oder erstellen Dokumentations-Ansichten über das [Website Screenshot Tool](/de/werkzeuge/website-screenshot-tool).
