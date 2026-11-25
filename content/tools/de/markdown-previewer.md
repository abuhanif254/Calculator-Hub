---
metaTitle: "Markdown Editor & Live-Vorschau Online | GFM, HTML & PDF"
metaDescription: "Schreiben und prüfen Sie GitHub Flavored Markdown live im Split-Screen-Monaco-Editor. Exportieren Sie sauberes HTML, DIN-A4-PDF oder .md lokal."
metaKeywords: "markdown editor, markdown vorschau, markdown live vorschau, github flavored markdown, gfm editor, markdown zu html, markdown zu pdf, online markdown editor, commonmark vorschau, markdown konverter"
title: "Markdown Editor & Live-Vorschau"
shortDescription: "Schreiben und prüfen Sie GitHub Flavored Markdown in Echtzeit in einem professionellen Split-Screen-Monaco-Editor. Mit Syntaxhervorhebung, interaktivem Inhaltsverzeichnis, Live-Statistiken sowie HTML-, PDF- und .md-Export – 100 % lokal im Browser."
faqs:
  - question: "Welcher Markdown-Standard wird in der Live-Vorschau unterstützt?"
    answer: "Der Vorschau-Renderer parst CommonMark mit der Erweiterung GitHub Flavored Markdown (GFM) über remark-gfm. Dadurch funktionieren Pipe-Tabellen, Aufgabenlisten mit Checkboxen, Durchstreichungen und direkte URL-Autolinks ebenso wie die Syntaxhervorhebung für eingezäunte Codeblöcke über Highlight.js."
  - question: "Akzeptiert der Editor rohes Inline-HTML in Markdown-Dokumenten?"
    answer: "Ja. Die Rendering-Pipeline bindet rehype-raw ein, sodass Inline-HTML wie <details>, <kbd>, Status-Badges oder ausgerichtete <img>-Elemente nativ gerendert werden. Da rohes HTML direkt im Vorschau-DOM verarbeitet wird, sollten Sie keine fremden, nicht vertrauenswürdigen Skripte einfügen."
  - question: "Wie funktioniert die automatische Entwurfsspeicherung beim Schließen des Tabs?"
    answer: "Jede Eingabe wird mit einer Verzögerung von 800 Millisekunden entprellt und lokal im localStorage Ihres Browsers gesichert. Beim erneuten Laden der Seite wird Ihr letzter Stand automatisch wiederhergestellt, ohne dass Daten an einen Server übertragen werden."
  - question: "Worin unterscheidet sich das Kopieren von HTML vom HTML-Datei-Download?"
    answer: "Beim Kopieren von HTML landet das reine Body-Fragment aus dem Vorschau-Container in Ihrer Zwischenablage – ideal für CMS-Felder oder Newsletter-Vorlagen. Der HTML-Download verpackt dieses Fragment hingegen in ein vollständiges UTF-8-HTML5-Dokument inklusive sauberer Typografie- und Tabellenstile."
  - question: "Wie werden mehrseitige PDF-Dokumente aus langen Markdown-Dateien erzeugt?"
    answer: "Der PDF-Export läuft vollständig lokal im Browser: Die gerenderte Vorschau wird per html2canvas in zweifacher Auflösung gerastert und anschließend mit jsPDF automatisch in sauber umbrochene DIN-A4-Hochformatseiten aufgeteilt."
features:
  - "Monaco-Editor-Engine mit auswahlbewusster Symbolleiste, Zeilennummern, farbiger Klammerzuordnung, Zeilenumbruch und Schriftgröße von 10 bis 24 px"
  - "Vollständiges GitHub Flavored Markdown (GFM) inklusive Pipe-Tabellen, Aufgabenlisten, Durchstreichung, Autolinks und Inline-HTML-Durchreichung"
  - "Automatische Syntaxhervorhebung für eingezäunte Codeblöcke mit direkter Ein-Klick-Kopierfunktion pro Block"
  - "Einblendbares, interaktives Inhaltsverzeichnis aus H1- bis H6-Überschriften mit sanfter Sprungnavigation"
  - "Echtzeit-Statistikleiste für Wörter, Zeichen, Zeilen, Überschriften und geschätzte Lesezeit bei 200 Wörtern pro Minute"
  - "Lokaler Drag-and-Drop-Import für .md-, .markdown- und .txt-Dateien sowie Export als .md, eigenständiges .html oder paginiertes DIN-A4-PDF"
useCases:
  - "Verfassen und Prüfen von README.md-Dateien, Changelogs und Pull-Request-Vorlagen vor dem Git-Commit"
  - "Ausarbeiten technischer Spezifikationen, Architecture Decision Records (ADRs) und API-Leitfäden mit hervorgehobenen Codebeispielen"
  - "Umwandeln von Markdown-Entwürfen in semantisches HTML für Static-Site-Generatoren, Headless-CMS oder Entwickler-Newsletter"
  - "Exportieren strukturierter Besprechungsprotokolle, Release-Notes und Projektdokumentationen als teilbare DIN-A4-PDF-Handouts"
  - "Kontrollieren der Überschriftenhierarchie und Abschnittsfolge langer Handbücher über das interaktive Inhaltsverzeichnis"
  - "Öffnen und Prüfen externer .md-Dateien im Browser ohne Installation eines Desktop-Editors oder IDE-Plugins"
howToSteps:
  - "Tippen Sie Markdown direkt in den linken Monaco-Editor, fügen Sie vorhandenen Quelltext ein oder ziehen Sie eine lokale .md-, .markdown- oder .txt-Datei per Drag-and-Drop auf die Arbeitsfläche."
  - "Formatieren Sie markierte Textpassagen über die Symbolleiste punktgenau an der Cursor-Position – etwa für Fettschrift, Kursivtext, Inline-Code, Links, Zitate, Aufgabenlisten oder GFM-Tabellen."
  - "Wechseln Sie je nach Arbeitsphase zwischen geteilter Ansicht, reinem Editor oder reiner Vorschau und passen Sie Zeilenumbruch sowie Schriftgröße flexibel an."
  - "Öffnen Sie das automatisch generierte Inhaltsverzeichnis, um die H1- bis H6-Gliederung zu prüfen und direkt zu einzelnen Abschnitten zu springen."
  - "Überwachen Sie Wortanzahl, Zeichenzahl, Zeilenzahl, Überschriften und geschätzte Lesezeit in der Live-Statistikleiste oberhalb des Editors."
  - "Kopieren Sie rohes Markdown oder gerendertes HTML mit einem Klick oder laden Sie über das Exportmenü eine .md-, eine gestylte .html- oder eine DIN-A4-.pdf-Datei herunter."
---

Klartext-Auszeichnungssprachen haben sich als Standard für Software-Dokumentation durchgesetzt, weil sie im Terminal lesbar bleiben, saubere Git-Diffs erzeugen und unabhängig von proprietären Dateiformaten langfristig archivierbar sind. Sobald Dokumente jedoch tief verschachtelte Listen, komplexe Pipe-Tabellen und mehrsprachige Codeblöcke enthalten, führen reine Texteditoren ohne Sichtkontrolle schnell zu unbemerkten Formatierungsfehlern, die erst nach dem Push im Repository auffallen. Unser **Markdown Editor & Live-Vorschau** kombiniert den professionellen Monaco-Code-Editor mit einem verzögerungsfreien Renderer für GitHub Flavored Markdown (GFM) direkt im Browser. So prüfen Sie Typografie, Code-Hervorhebung und Gliederung unmittelbar beim Schreiben und exportieren fertige HTML- oder PDF-Dokumente, ohne vertrauliche Entwürfe an externe Server zu übertragen.

## Aufbau der Markdown-zu-HTML-Rendering-Pipeline

Statt fehleranfälliger Ersetzungen per regulärem Ausdruck übersetzt das Vorschaufenster Ihr Dokument über eine deterministische Abstract-Syntax-Tree-Pipeline (AST) nach dem Vorbild des `unified`-Ökosystems:

1. **Lexikalische Analyse und Parsing (`mdast`):** Der Rohtext wird gemäß der CommonMark-Spezifikation in Token zerlegt. Die Erweiterung `remark-gfm` ergänzt die Grammatikregeln für Tabellen, Durchstreichungen, Aufgabenlisten und automatische URL-Erkennung.
2. **Transformation in den HTML-Baum (`hast`):** Der Markdown-Syntaxbaum wird in eine semantische HTML-Struktur überführt. Durch `rehype-raw` werden eingebettete Inline-HTML-Tags wie `<kbd>`, `<details>` oder `<figure>` gezielt erneut geparst und als echte DOM-Knoten statt als maskierter Text dargestellt.
3. **Syntaxhervorhebung (`rehype-highlight`):** Eingezäunte Codeblöcke mit Sprachkennung (etwa `typescript`, `python`, `bash` oder `sql`) werden über Highlight.js in semantische `<span>`-Klassen überführt, bevor die Vorschau im Browser gerendert wird.

Auf der Eingabeseite arbeitet die Monaco-Engine – derselbe Textpuffer, der auch Visual Studio Code antreibt. Jeder Klick auf eine Schaltfläche der Formatierungsleiste nutzt die `executeEdits`-API gegen die aktive Textauswahl. Markierter Text wird sauber umschlossen, statt Syntax blind am Dokumentende anzuhängen. Alle Änderungen werden mit 800 Millisekunden Entprellzeit im lokalen `localStorage` Ihres Browsers zwischengespeichert, sodass Entwürfe einen Seitenreload sicher überstehen und streng auf Ihrem Endgerät bleiben.

## CommonMark und GitHub Flavored Markdown im Direktvergleich

Viele Darstellungsunterschiede zwischen Plattformen entstehen, weil nicht jeder Parser dieselben Erweiterungen beherrscht. Die folgende Übersicht zeigt, wie sich der CommonMark-Kern von der hier unterstützten GFM-Obermenge unterscheidet:

| Syntax-Element | CommonMark 0.31 | GFM-Erweiterung | Erzeugtes HTML-Element | Zentrale Parsing-Regel |
| :--- | :--- | :--- | :--- | :--- |
| ATX-Überschriften (`## Titel`) | Unterstützt | Unterstützt | `<h1>`–`<h6>` mit Anker-`id` | Erfordert ein Leerzeichen nach `#`; `##Titel` bleibt Fließtext |
| Codeblöcke (` ```sprache `) | Unterstützt | Unterstützt | `<pre><code class="hljs">` | Info-String nach den öffnenden Backticks steuert Highlight.js |
| Pipe-Tabellen (`\| A \| B \|`) | Nicht enthalten | Unterstützt | `<table>`, `<thead>`, `<tbody>` | Trennzeile benötigt mindestens drei Bindestriche pro Spalte |
| Aufgabenlisten (`- [x] Erledigt`) | Nicht enthalten | Unterstützt | `<li><input type="checkbox">` | Kleines `x` oder Leerzeichen in Klammern nach dem Listenmarker |
| Durchgestrichen (`~~alt~~`) | Nicht enthalten | Unterstützt | `<del>` | Einfache oder doppelte Tilden ohne Leerzeichen direkt am Rand |
| Direkte Autolinks | Benötigt `<...>` | Unterstützt | `<a target="_blank">` | Erkennt `https://`- und `www.`-Adressen ohne spitze Klammern |
| Rohes Inline-HTML | Unterstützt | Unterstützt | Nativer DOM-Knoten | Block-HTML braucht Leerzeilen davor und danach für weiteres Markdown |

## Saubere Syntax in der Praxis: Verschachtelung und Escape-Zeichen

Kleine Einrückungsregeln entscheiden darüber, ob verschachtelte Strukturen auf GitHub, in Static-Site-Generatoren und in internen Wikis identisch gerendert werden. Soll ein eingezäunter Codeblock innerhalb einer nummerierten Liste stehen, muss der Zaun exakt an der ersten Textspalte des Listenpunkts ausgerichtet sein. Zudem müssen literale Pipe-Zeichen innerhalb einer GFM-Tabellenzelle mit einem Backslash (`\|`) maskiert werden:

````markdown
1. Build- und Linting-Prüfung vor dem Release ausführen:

   ```bash
   npm run build && npm run lint
   ```

| Option | Verhalten | Beispiel |
| :--- | :---: | :--- |
| `--strict` | Bricht bei Warnungen ab | `lint --strict` |
| `A \| B` | Maskierte Pipe in der Zelle | `echo "ok"` |
````

Bei breiten mehrspaltigen Datenmatrizen wird das manuelle Ausrichten von Pipe-Symbolen schnell mühsam. Komplexe Tabellenstrukturen oder kopierte Tabellenkalkulationsdaten lassen sich komfortabel im [HTML-Tabellen-Generator](/de/werkzeuge/html-table-generator) visuell zusammenstellen und anschließend nahtlos weiterverarbeiten.

### Exportpfade für Web, Git und Druckverteilung

Das Exportmenü stellt drei rein clientseitige Ausgabeformate für unterschiedliche Veröffentlichungsziele bereit:

- **Quelltext als `.md`:** Exportiert den unveränderten UTF-8-Puffer direkt aus Monaco über eine lokale `Blob`-URL mit dem MIME-Typ `text/markdown`.
- **Eigenständige `.html`-Datei:** Übernimmt das kompilierte Vorschau-DOM in ein vollständiges HTML5-Grundgerüst inklusive Systemschrift-Typografie, responsiven Bildgrenzen, strukturierten Tabellenrahmen und hervorgehobenen Blockzitaten. Möchten Sie Einrückungen, Tag-Verschachtelungen oder Leerzeichen vor der Einbindung in eine Website nachbearbeiten, können Sie den Export direkt im [HTML Formatter](/de/werkzeuge/html-formatter) prüfen.
- **Paginiertes DIN-A4-`.pdf`:** Lädt bei Bedarf `html2canvas` in zweifacher Pixeldichte und teilt die gerenderte Seite über `jsPDF` verlustarm auf Hochformat-A4-Bögen auf. Tabellenrahmen und hervorgehobene Codeblöcke behalten so ihr exaktes Layout unabhängig von abweichenden Browser-Druckdialogen.

Für umfangreiche Handbücher blendet das Inhaltsverzeichnis alle `H1`- bis `H6`-Ebenen ein und ermöglicht direkte Sprünge zu jedem Kapitel. Gleichzeitig berechnet die Statistikleiste bei jedem Tastenanschlag Wörter, Zeichen, Zeilen, Überschriften und die voraussichtliche Lesezeit auf Basis von 200 Wörtern pro Minute. Vor einem Pull Request lohnt sich ein abschließender Abgleich der überarbeiteten `.md`-Datei mit der Vorgängerversion im [Diff Checker](/de/werkzeuge/diff-checker), um jede geänderte Zeile gezielt zu überprüfen.

## Typische Fallstricke und sichere HTML-Bereinigung

Drei wiederkehrende Eigenheiten sorgen selbst bei erfahrenen technischen Redakteuren regelmäßig für Überraschungen:

- **Harte gegen weiche Zeilenumbrüche:** Ein einzelner Zeilenumbruch innerhalb eines Absatzes wird nach CommonMark als Leerzeichen zusammengeführt. Erzwingen Sie ein explizites `<br>` sauber über einen Backslash (`\`) oder zwei Leerzeichen am Zeilenende.
- **Unterstriche in Bezeichnern:** GFM deaktiviert Kursivformatierung innerhalb von Wörtern, sodass `kunden_konto_id` unverändert bleibt, während ältere Parser `_konto_` kursiv setzen. Das Einschließen von Variablennamen in Backticks sichert eine portierbare Darstellung auf jeder Plattform.
- **Sicherheitsgrenzen bei Inline-HTML:** Da `rehype-raw` rohes HTML gezielt ausgibt, eignet sich der Editor hervorragend für eigene und vertrauenswürdige Repository-Dokumentationen auf dem lokalen Rechner. Falls Sie kopiertes HTML jedoch in einer Mehrbenutzer-Webanwendung mit fremden Eingaben ausliefern, muss das Markup zwingend durch einen strengen Allowlist-Sanitizer wie DOMPurify bereinigt werden, um `<script>`-Tags und `on*`-Event-Attribute zuverlässig zu entfernen.
