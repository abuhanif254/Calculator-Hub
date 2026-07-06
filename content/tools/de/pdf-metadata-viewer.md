---
metaTitle: "PDF Metadaten Viewer | PDF Eigenschaften & XMP Auslesen"
metaDescription: "Analysieren Sie PDF Metadaten (Autor, XMP, Fonts, Sicherheit) zu 100% lokal. Überprüfen Sie Privacy-Risiken & SEO-Optimierung ohne Server-Upload (DSGVO)."
metaKeywords: "pdf metadaten viewer, pdf eigenschaften anzeigen, pdf metadaten auslesen, pdf analysieren, pdf informationen anzeigen, xmp auslesen, pdf privacy check, pdf fonts extrahieren"
title: "PDF Metadaten Viewer"
shortDescription: "Inspizieren Sie tiefgreifende PDF-Eigenschaften, Metadaten und Sicherheitslinien. Lesen Sie Autor, verwendete Software, Fonts und versteckte XMP-Daten lokal im Browser aus."
faqs:
  - question: "Was genau sind PDF-Metadaten?"
    - answer: "Metadaten sind unsichtbare, strukturierte Informationen, die tief in einer PDF-Datei verankert sind. Sie beschreiben den Ursprung des Dokuments. Dazu gehören Titel, Autor, Thema, Stichwörter (Keywords), das Erstellerprogramm (Creator), die Konvertierungssoftware (Producer) sowie genaue Zeitstempel zur Erstellung und Modifikation."
  - question: "Wie kann ich die PDF-Metadaten anzeigen lassen?"
    answer: "Ziehen Sie Ihre Datei einfach per Drag & Drop in den Viewer. Die Engine analysiert die PDF-Binärstruktur in Echtzeit und zeigt Standard-Eigenschaften, benutzerdefinierte Felder, die Seitenanzahl, eingebettete Schriftarten und Sicherheitsrechte übersichtlich an."
  - question: "Welche versteckten Informationen können meine Privatsphäre gefährden?"
    answer: "Textverarbeitungsprogramme wie Word speichern standardmäßig den Benutzernamen Ihres Windows-Systems im 'Autor'-Feld. Außerdem speichert der XML-Strom (XMP) oft exakte Dateipfade Ihres lokalen Netzwerks, lange Revisionshistorien und genaue Betriebssystem-Versionen. Dies ist ein hohes Risiko für Hackerangriffe oder Enttarnungen."
  - question: "Ist es sicher, vertrauliche Dokumente hier zu analysieren?"
    answer: "Absolut. Dieser Viewer nutzt eine reine Client-Side Architektur (Zero-Cloud). Das bedeutet: Ihre PDF-Dateien verlassen niemals Ihren Computer. Der gesamte Ausleseprozess findet sicher in der Sandbox Ihres Webbrowsers statt. Es gibt keine Uploads."
  - question: "Kann ich die ausgelesenen Metadaten exportieren?"
    answer: "Ja. Sie können den kompletten forensischen Metadaten-Bericht als JSON, CSV oder TXT-Datei exportieren oder einen formatierten PDF-Bericht ausdrucken."
  - question: "Was bedeutet der 'Privacy Risk Score' (Datenschutz-Risiko)?"
    answer: "Ein Algorithmus bewertet, wie viele persönliche oder systemkritische Daten (Autor, XMP-Histories, Software-Versionen) das Dokument preisgibt. Ein hoher Risiko-Score bedeutet, dass Sie das PDF mit einem Metadaten-Editor bereinigen (Sanitize) sollten, bevor Sie es veröffentlichen."
  - question: "Was misst der 'Document Health Score' (SEO)?"
    answer: "Dieser Score prüft, wie gut das Dokument für Suchmaschinen (Google) und Barrierefreiheit (Screenreader) aufbereitet ist. Er verlangt das Vorhandensein eines Titels, von Keywords, einer Beschreibung sowie korrekter Language-Tags."
  - question: "Was sind XMP-Metadaten?"
    answer: "Die Extensible Metadata Platform (XMP) ist ein von Adobe definierter XML-Standard. Im Gegensatz zum alten Dictionary erlaubt XMP verschachtelte Datensätze, die Speicherung von Dokumenten-IDs (Linage) und ist zwingende Voraussetzung für PDF/A Archiv-Standards."
  - question: "Werden eingebettete Schriftarten (Fonts) angezeigt?"
    answer: "Ja. Im Tab 'Erweitert' liest das Tool das Ressourcen-Dictionary des PDFs aus und listet alle im Dokument verwendeten, eingebetteten Schriftarten und deren Subtype exakt auf (wichtig für die Druckvorstufe)."
  - question: "Kann ich die Metadaten passwortgeschützter PDFs ansehen?"
    answer: "Wenn eine PDF-Datei durch ein Benutzerpasswort verschlüsselt ist, müssen Sie das Passwort eingeben, damit die Parsing-Engine das Dokument entschlüsseln und die Metadaten lesen kann."
  - question: "Kann ich die Eigenschaften von zwei PDFs vergleichen?"
    answer: "Ja. Nutzen Sie den 'Vergleichs-Modus'. Laden Sie Datei A und Datei B hoch, und die Software markiert automatisch alle Metadatenfelder, die sich zwischen beiden Versionen unterscheiden (z.B. Vertragsversionen)."
  - question: "Ändert dieser Viewer mein PDF in irgendeiner Form?"
    answer: "Nein. Der Viewer ist ein reines Read-Only-Tool (nur Lesen). Ihre Originaldatei bleibt absolut unverändert. Wenn Sie Daten löschen möchten, müssen Sie unseren 'PDF Metadaten Editor' verwenden."
features:
  - "Lokal & Zero-Cloud: Blitzschnelle Client-Side-Analyse (DSGVO-konform, kein Server-Transfer)."
  - "Metadaten-Scanner: Extrahiert Titel, Autor, Erstellungsdaten, Creator und Producer-Strings."
  - "Technische Analyse: Liest PDF-Versionsnummer, Seitenanzahl und exakte Seitenmaße in Millimetern/Inches aus."
  - "Font-Detektor: Findet alle eingebetteten TrueType-, Type1- oder CID-Schriftarten im Dokument."
  - "Krypto-Inspektor: Prüft Sicherheits-Flags (Ist das Drucken, Kopieren oder Editieren gesperrt?)."
  - "Privacy-Scanner: Bewertet das Risiko versteckter Datenlecks (Autorennamen, Serverpfade)."
  - "SEO-Diagnose: Misst die Indexierbarkeit für Suchmaschinen durch Prüfung von Title- und Lang-Tags."
  - "Diff-Compare-Tool: Visueller Vorher/Nachher-Vergleich zweier PDF-Versionen auf Metadaten-Ebene."
  - "Forensischer Export: Laden Sie die Eigenschaften des PDFs als JSON, CSV, Textdatei oder als generierten PDF-Bericht herunter."
useCases:
  - "Security-Audit (Whistleblowing): Prüfen Sie, ob in brisanten Leaks Ihr echter Windows-Account-Name im Autor-Feld steht, bevor Sie diese ins Internet stellen."
  - "Suchmaschinenoptimierung (SEO): Verifizieren Sie den Title und die Keywords von Whitepapern, damit diese optimal von Google indexiert werden."
  - "Pre-Press & Druckvorstufe: Überprüfen Sie, ob spezielle Firmen-Schriftarten (Fonts) korrekt im PDF eingebettet wurden."
  - "Digitale Archivierung (Legal): Extrahieren Sie Bates-Nummern, Document IDs und exakte Datumsstempel zur Beweisführung in Gerichtsverfahren."
  - "IT-Security Check: Erkennen Sie veraltete Software-Strings im /Creator-Feld, die Ihr Netzwerk als potenzielles Ziel für Hacker markieren könnten."
howToSteps:
  - "Schritt 1: Ziehen Sie Ihre PDF-Dateien (Drag & Drop) in das Upload-Feld des Viewers."
  - "Schritt 2: Das Tool analysiert die Dateigröße, Seitenanzahl und die Kern-Metadaten sofort."
  - "Schritt 3: Wechseln Sie durch die Tabs (Allgemein, Eigenschaften, Sicherheit, SEO, Erweitert), um die Tiefenprüfung zu starten."
  - "Schritt 4: Verwenden Sie die Suchleiste, um nach bestimmten Schlüsseln (z.B. 'Producer') zu filtern."
  - "Schritt 5: Prüfen Sie den 'Privacy Risk Score', um potenzielle Datenschutzlecks zu identifizieren."
  - "Schritt 6: Nutzen Sie den 'Export'-Button, um den Bericht als CSV, JSON oder PDF lokal abzuspeichern."
---

## Das Technische Manifest der PDF-Metadaten: Architektur, Datenlecks und forensische Inspektion

Im modernen, digitalen Zeitalter transportieren PDF-Dokumente oft weit mehr Informationen, als auf dem Bildschirm sichtbar sind. Jede Rechnung, jeder Vertrag, jedes Manuskript und jeder Gerichtsbeschluss verfügt über eine tiefgreifende Informationsebene: die versteckten, strukturellen Metadaten. Metadaten – "Daten über Daten" – beschreiben den Ursprung, die Geschichte, die Urheberschaft und die technische Anatomie der Datei.

Gemäß der ISO-32000-Spezifikation für PDFs fungieren Metadaten als digitaler Fingerabdruck des Dokuments. Sie ermöglichen es Betriebssystemen, Suchmaschinen (SEO) und Dokumenten-Management-Systemen (DMS), Dateien intelligent zu indexieren. Dieser Komfort ist jedoch ein massiver Angriffsvektor für Datenschutzverstöße und Identitätslecks.

Dieses Handbuch bietet eine Analyse der PDF-Metadaten-Architektur. Wir erklären die Bedeutung des `/Info`-Dictionaries und des modernen XMP-Standards, beleuchten die Gefahr fataler Datenlecks durch ungeprüfte Metadaten und begründen, warum das lokale (Client-Side) Auditing der einzige sichere Weg ist, Dokumente zu prüfen.

---

### 1. Die Architektur: Vom `/Info` Dictionary zum XMP-Stream

Die Methodik, wie PDFs Metadaten speichern, ist durch die jahrzehntelange Entwicklung des Formats fragmentiert. Eine professionelle Inspektion muss beide Datentöpfe des PDF-Binärcodes untersuchen.

#### Das klassische Document Information Dictionary (Info Dict)
In frühen PDF-Versionen (bis 1.3) wurden Metadaten ausschließlich in einer Tabelle am Dateiende abgelegt: dem **Document Information Dictionary** (`/Info`). Es basiert auf simplen Schlüssel-Wert-Paaren:
*   **`/Title`**: Der Name des Dokuments.
*   **`/Author`**: Der Verfasser (oft der Computer-Nutzername).
*   **`/Keywords`**: Kommaseparierte Schlagwörter.
*   **`/Creator`**: Die Textverarbeitungssoftware (z.B. Microsoft Word).
*   **`/Producer`**: Die PDF-Konvertierungs-Engine.
*   **`/CreationDate`** und **`/ModDate`**: Datumsstempel im strikten Format `D:YYYYMMDDHHmmSSZ`.

Dieses System stößt bei komplexen Hierarchien und mehrsprachigen Zeichen schnell an Grenzen.

#### Der moderne Standard: Die Extensible Metadata Platform (XMP)
Mit PDF 1.4 implementierte Adobe den **XMP-Standard**. Die Informationen werden als massiver XML-Code in den Wurzelknoten (den `/Catalog`) eingebettet.
XMP strukturiert Daten in "Namespaces" (Namensräume):
*   **Dublin Core (`dc`)**: Der Bibliotheks-Standard für Titel, Autoren.
*   **Adobe PDF Schema (`pdf`)**: Spezifische PDF-Konstanten.
*   **Media Management (`xmpMM`)**: Speichert den kompletten Lebenszyklus (Linage), Document IDs und dokumentiert jeden Speichervorgang in der Historie.

**Die Auditing-Herausforderung:** Moderne PDFs enthalten das alte `/Info`-Dictionary *und* den XML-XMP-Stream. Unser Viewer gleicht beide ab. Wenn ein Dokument im `/Info` einen anderen Autor ausweist als im `XMP` (z.B. nach einer unsauberen Bearbeitung), deckt die Inspektion diese Diskrepanz sofort auf.

---

### 2. Sicherheitsrisiken: Die unsichtbaren Datenlecks (Privacy Leaks)

Bevor eine PDF-Datei versendet oder publiziert wird, ist ein Audit Pflicht. Ungelesene Metadaten sind die häufigste Ursache für geleakte Unternehmensgeheimnisse.

#### Typische Angriffsvektoren:
1.  **Deanonymisierung (Echte Namen):** Word und Pages brennen standardmäßig Ihren Benutzernamen in das `/Author`-Feld. So wurden bereits Informanten und anonyme Autoren gegen ihren Willen enttarnt.
2.  **Verzeichnisstrukturen:** Der XMP-Stream speichert oft den Original-Speicherpfad (z.B. `C:\Benutzer\Projekt_X\Fusion.docx`). Hacker nutzen diese Infos, um Serverarchitekturen für Cyberangriffe auszuspähen.
3.  **Software-Forensik:** Die Felder `/Creator` und `/Producer` legen das Betriebssystem und veraltete Software-Iterationen offen. Dies dient Hackern zur Vorbereitung zielgerichteter Exploits (Zero-Day-Vulnerabilities).
4.  **Zeitstempel:** Manipulationen fliegen auf. Erstellungs- und Änderungsdaten beweisen vor Gericht unweigerlich, wann genau ein Dokument verfasst oder noch einmal heimlich abgeändert wurde.

#### Prävention durch Inspektion
Unser **Datenschutz-Risiko-Score** (Privacy Risk Score) bewertet automatisch, wie hoch die Gefahr durch die vorliegenden Metadaten ist. Zeigt der Score einen kritischen Wert (z.B. durch lange XMP-Bearbeitungshistorien oder freiliegende Windows-Usernamen), wissen Sie, dass Sie das Dokument vor dem Teilen zwingend "bereinigen" müssen.

---

### 3. Die Überlegenheit der lokalen Inspektion (Zero-Cloud)

Viele Online-PDF-Tools zwingen Sie, Ihre Bilanzen, Verträge oder juristischen Beweisstücke auf deren Server ins Internet hochzuladen (Upload), nur um die Eigenschaften auszulesen.

*   **Verlust der Datenhoheit:** Hochgeladene Dateien lagern auf fremden Festplatten.
*   **Rechtliche Verstöße (DSGVO):** Vertrauliche Daten auf unautorisierte Drittserver zu senden, verletzt NDAs und den europäischen Datenschutz schwer.

**Der Client-Side-Schutzwall:**
Unser Metadaten-Viewer eliminiert dieses Risiko durch **100% Client-Side** Ausführung.
1.  **Lokaler Arbeitsspeicher:** Ihre PDF-Datei verlässt niemals Ihren Rechner. Es gibt **keinen Upload**.
2.  **Echtzeit-Extraktion:** Die Engine (WebAssembly) liest die Metadaten, Fonts und Security-Flags blitzschnell im lokalen Browser aus.
3.  **Offline-Nutzung:** Nach dem Laden der Seite funktioniert der Viewer völlig unabhängig vom Internet.

Dieses lokale Zero-Trust-Modell ist der einzige professionelle Weg, Metadaten-Audits ohne Kompromisse bei der IT-Sicherheit und der Verschwiegenheitspflicht durchzuführen.
