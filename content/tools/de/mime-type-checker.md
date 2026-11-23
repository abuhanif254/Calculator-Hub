---
metaTitle: "MIME-Type Checker | Content-Type & Magic-Bytes Analyse"
metaDescription: "Prüfen Sie MIME-Types, HTTP Content-Type-Header und Magic Bytes von Dateien und URLs. Erkennen Sie Datei-Spoofing und fehlendes nosniff sofort."
metaKeywords: "mime type checker, content type prüfen, magic bytes auslesen, mime sniffing schutz, x-content-type-options nosniff, iana media types, file upload validierung, http header audit"
title: "MIME-Type & Content-Type Checker"
shortDescription: "Prüfen und verifizieren Sie IANA-MIME-Types, HTTP Content-Type-Header und binäre Magic Bytes für Dateien, Dateiendungen und Live-URLs direkt im Browser."
faqs:
  - question: "Worin unterscheidet sich ein IANA-MIME-Type von einer Dateiendung?"
    answer: "Eine Dateiendung wie .pdf oder .png ist lediglich eine Namenskonvention des Dateisystems und lässt sich beliebig umbenennen. Ein MIME-Type (offiziell Media Type nach RFC 6838) wird hingegen im HTTP-Header Content-Type übertragen und steuert verbindlich, wie Browser und API-Clients den Datenstrom parsen."
  - question: "Wie erkennt das Tool manipulierte Datei-Uploads über Magic Bytes?"
    answer: "Der Checker liest die ersten Bytes einer lokal ausgewählten Datei über die FileReader-API im Arbeitsspeicher des Browsers aus und vergleicht deren Hexadezimal-Signatur mit bekannten Dateiformaten. Weicht die binäre Signatur von der deklarierten Dateiendung ab, wird sofort ein Spoofing-Hinweis ausgegeben."
  - question: "Warum ist der Sicherheits-Header X-Content-Type-Options: nosniff unverzichtbar?"
    answer: "Ohne nosniff wenden Browser den WHATWG-MIME-Sniffing-Algorithmus an und interpretieren etwa eine als image/jpeg ausgelieferte Datei mit eingebettetem HTML-Code dennoch als ausführbare Webseite. Der Header unterbindet dieses Verhalten und schützt wirksam vor Stored-XSS-Angriffen."
  - question: "Welche Rolle spielt der Parameter charset im Content-Type-Header?"
    answer: "Bei textbasierten Formaten wie text/html, text/css oder text/csv legt charset=UTF-8 die Zeichenkodierung fest. Fehlt diese Angabe oder weicht sie von der tatsächlichen Kodierung ab, entstehen Darstellungsfehler bei Umlauten (Mojibake) oder Fehlinterpretationen bei Sicherheitsfiltern."
  - question: "Warum blockieren moderne Browser JavaScript-Module bei falschem MIME-Type?"
    answer: "Für ES-Module (<script type='module'>), Stylesheets und WebAssembly-Dateien verlangen Browser strikte MIME-Type-Übereinstimmung (text/javascript, text/css, application/wasm). Liefert der Webserver stattdessen text/plain oder application/octet-stream, verweigert der Browser die Ausführung komplett."
features:
  - "Sofortige Zuordnung zwischen Dateiendungen und offiziellen IANA Media Types inklusive strukturierter Suffixe (+xml, +json, +zip)"
  - "Clientseitige Binäranalyse (Magic-Bytes-Inspektion) am Datei-Offset zur Aufdeckung umbenannter oder manipulierter Dateien"
  - "Live-Inspektion von HTTP-Response-Headern (Content-Type, charset, Content-Disposition und X-Content-Type-Options)"
  - "Erkennung von Polyglot-Risiken und fehlendem nosniff-Schutz für Upload-Endpunkte und Asset-CDNs"
  - "Durchsuchbare Referenzdatenbank mit gängigen Web-, Dokument-, Archiv-, Medien- und Schriftart-Formaten"
  - "100 % lokale Dateiprüfung im Browser ohne Übertragung vertraulicher Dateien an externe Server"
useCases:
  - "Debugging blockierter ES-Module (.mjs), WebAssembly-Binaries (.wasm) oder Webfonts (.woff2) nach Webserver-Deployments"
  - "Sicherheits-Audits von Upload-Formularen gegen Extension-Spoofing, SVG-XSS und Polyglot-Dateien"
  - "Konfiguration und Verifizierung der mime.types-Tabellen in Nginx, Apache HTTP Server und Reverse Proxies"
  - "Prüfung von REST-API-Antworten auf korrekte Media-Type-Negotiation (application/json, application/problem+json)"
  - "Fehleranalyse bei korrupten Downloads oder unerwartetem Inline-Rendering statt Datei-Download über Content-Disposition"
  - "Technisches SEO-Audit zur Sicherstellung, dass Googlebot CSS, JavaScript und strukturierte Ressourcen korrekt lädt"
howToSteps:
  - "Wählen Sie den gewünschten Prüfmodus: Dateiendungs-Suche, lokaler Magic-Bytes-Dateicheck oder Live-URL-Header-Inspektion."
  - "Geben Sie für die Schnellsuche eine Dateiendung (etwa .webp oder .woff2) oder einen Media Type (etwa application/pdf) ein."
  - "Ziehen Sie eine lokale Testdatei in den Prüfbereich, um die rohen Magic Bytes im Hex-Format clientseitig auszulesen."
  - "Vergleichen Sie den ermittelten Binärtyp mit dem vom Betriebssystem gemeldeten MIME-Type, um Abweichungen sofort zu erkennen."
  - "Fügen Sie bei Bedarf eine öffentliche Asset-URL in den URL-Inspektor ein, um Content-Type, Charset und nosniff-Header live zu prüfen."
  - "Übernehmen Sie die empfohlenen Server-Direktiven direkt in Ihre Nginx-, Apache- oder CDN-Konfiguration."
---

Im HTTP-Protokoll entscheidet nicht der Dateiname, sondern der deklarierte **MIME-Type** (offiziell *Media Type* gemäß RFC 6838 und RFC 9110) darüber, ob ein Browser eine Ressource als Stylesheet ausführt, als Bild rendert oder als Download speichert. Bereits ein einzelner falsch konfigurierter `Content-Type`-Header legt moderne Single-Page-Anwendungen lahm, bricht ES-Module ab oder öffnet bei Datei-Uploads kritische Cross-Site-Scripting-Lücken. Der **MIME-Type & Content-Type Checker** kombiniert eine vollständige IANA-Referenzsuche mit clientseitiger Magic-Bytes-Analyse und HTTP-Header-Prüfung, damit Entwickler, Administratoren und Sicherheitsteams Protokollfehler sowie manipulierte Dateien in Sekunden identifizieren können.

## Anatomie und Standardisierung nach RFC 6838 und RFC 9110

Ein standardkonformer Media Type folgt der Grammatik `type/subtype`, optional ergänzt durch Semikolon-getrennte Parameter wie `charset=UTF-8` oder `boundary=...`. Der Haupttyp (*Top-Level Type*) gliedert Daten in diskrete Kategorien (`text`, `image`, `audio`, `video`, `font`, `application`) sowie zusammengesetzte Typen (`multipart`, `message`). Die Registrierung erfolgt zentral bei der **IANA** (Internet Assigned Numbers Authority) in vier Subtype-Bäumen:

- **Standards Tree** ohne Präfix (z. B. `application/pdf`, `text/javascript`): offiziell standardisierte Formate.
- **Vendor Tree** mit `vnd.` (z. B. `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` für `.xlsx`): herstellerspezifische Formate.
- **Personal Tree** mit `prs.` für nicht kommerzielle oder experimentelle Spezialformate.
- **Structured Syntax Suffixes** wie `+xml`, `+json` oder `+zip` (z. B. `image/svg+xml`, `application/ld+json`): signalisieren generischen Parsern die zugrunde liegende Datenstruktur.

Ein wichtiges Detail aus **RFC 9239**: Der historische Typ `application/javascript` gilt offiziell als veraltet; für klassische Skripte sowie ES-Module (`.js`, `.mjs`) ist heute verbindlich `text/javascript` vorgeschrieben.

### Content-Negotiation und REST-API-Konventionen

In modernen HTTP-APIs steuern Media Types die **Content-Negotiation** zwischen Client und Server: Der Client signalisiert bevorzugte Formate über den Request-Header `Accept` (etwa `Accept: application/json, application/problem+json;q=0.9`), während der Server das tatsächlich gewählte Format im `Content-Type` zurückmeldet und bei variierenden Repräsentationen zusätzlich `Vary: Accept` für nachgelagerte Proxy- und CDN-Caches setzt. Für standardisierte Fehlerobjekte empfiehlt **RFC 9457** den dedizierten Typ `application/problem+json`, während zeilenbasierte Event-Streams mit `application/x-ndjson` oder `text/event-stream` gekennzeichnet werden.

## Magic Bytes vs. Dateiendungen: Warum Header allein nicht reichen

Dateiendungen und der vom Browser im `multipart/form-data`-Upload mitgesendete `Content-Type` sind vollständig vom Client kontrollierbar und daher sicherheitstechnisch nicht vertrauenswürdig. Ein Angreifer kann eine ausführbare Datei oder ein HTML-Dokument mit eingebettetem JavaScript schlicht als `profilbild.jpg` hochladen.

Verlässliche Upload-Validierung untersucht deshalb die **Magic Bytes** – charakteristische Byte-Sequenzen an definierten Offsets am Dateianfang (meist Offset `0x00`). Beim lokalen Datei-Check liest unser Werkzeug die Rohbytes per `ArrayBuffer` direkt im Arbeitsspeicher aus und gleicht sie gegen bekannte Container-Signaturen ab.

### Referenz-Spezifikation gängiger MIME-Types und Magic Bytes

| Format | Endung | Offizieller MIME-Type (IANA) | Magic Bytes (Hex & Offset) | Sicherheitsprofil & Besonderheiten |
| :--- | :--- | :--- | :--- | :--- |
| PNG-Grafik | `.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` (Offset 0) | Sicher bei sauberem Re-Encoding; Metadaten-Chunks (tEXt) prüfen |
| JPEG-Foto | `.jpg`, `.jpeg` | `image/jpeg` | `FF D8 FF E0` / `FF D8 FF E1` (Offset 0) | Risiko durch Polyglot-Kommentare; EXIF-Strip empfohlen |
| WebP-Grafik | `.webp` | `image/webp` | `52 49 46 46` (0) + `57 45 42 50` (Offset 8) | RIFF-Container; beide Signaturen gemeinsam prüfen |
| SVG-Vektorgrafik | `.svg` | `image/svg+xml` | Text/XML (`<svg` oder `<?xml`) | **Hochkritisch**: kann `<script>` und Event-Handler enthalten (XSS) |
| PDF-Dokument | `.pdf` | `application/pdf` | `25 50 44 46 2D` (`%PDF-`, Offset 0) | Kann eingebettetes JavaScript enthalten; Sandbox/Download erzwingen |
| ZIP / Office OOXML | `.zip`, `.docx` | `application/zip` | `50 4B 03 04` (`PK..`, Offset 0) | Container-Format; innere Struktur (`[Content_Types].xml`) prüfen |
| WebAssembly | `.wasm` | `application/wasm` | `00 61 73 6D` (`\0asm`, Offset 0) | Strikte MIME-Prüfung bei `WebAssembly.instantiateStreaming()` |
| Windows Executable | `.exe`, `.dll` | `application/vnd.microsoft.portable-executable` | `4D 5A` (`MZ`, Offset 0) | Upload auf Webservern konsequent blockieren |

Besondere Vorsicht verlangen **Polyglot-Dateien** (wie GIFAR oder modifizierte JPEG-Dateien), die gleichzeitig gültige Bild-Header und ausführbaren HTML- oder Skriptcode enthalten. Selbst eine erfolgreiche Magic-Bytes-Prüfung ersetzt bei öffentlichen Nutzer-Uploads daher nicht das serverseitige Neu-Kodieren von Rasterbildern und die Auslieferung über eine separate, cookie-freie Sandbox-Domain.

## MIME-Sniffing, `nosniff` und Upload-Härtung

Um historisch fehlkonfigurierte Webserver auszugleichen, spezifiziert der **WHATWG MIME Sniffing Standard** Heuristiken, mit denen Browser den tatsächlichen Inhalt einer HTTP-Antwort erraten, wenn der `Content-Type` fehlt, generisch (`text/plain`, `application/octet-stream`) oder mehrdeutig ist. Dieses Verhalten bildet den Nährboden für **MIME-Confusion-XSS**: Lädt ein Nutzer eine manipulierte Datei hoch und serviert der Server sie ohne strikte Header, interpretiert der Browser den Inhalt als `text/html` und führt das Skript im Kontext der Anwendungs-Origin aus.

Die verbindliche Gegenmaßnahme besteht aus drei komplementären HTTP-Headern, die Sie zusätzlich mit unserem [HTTP-Header-Checker](/de/werkzeuge/http-header-checker) gegenprüfen können:

```nginx
# Sichere MIME-Auslieferung und Upload-Härtung in Nginx
include /etc/nginx/mime.types;
default_type application/octet-stream;

# Verhindert Browser-seitiges MIME-Sniffing global
add_header X-Content-Type-Options "nosniff" always;

# Nutzergenerierte Uploads niemals inline als Skript ausführen
location /uploads/ {
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Disposition "attachment" always;
    add_header Content-Security-Policy "default-src 'none'; sandbox" always;
}
```

Für Apache-Umgebungen lassen sich fehlende Zuordnungen und Schutz-Header analog über eine `.htaccess`-Regel ergänzen – passende Vorlagen erzeugt unser [htaccess-Generator](/de/werkzeuge/htaccess-generator):

```apache
AddType text/javascript .mjs
AddType image/webp .webp
AddType font/woff2 .woff2
Header always set X-Content-Type-Options "nosniff"
```

## Typische Fehlerbilder in Produktion und SEO-Auswirkungen

In der Praxis zeigen sich fehlerhafte Media Types häufig erst nach der Aktivierung von `X-Content-Type-Options: nosniff` oder beim Umzug hinter ein CDN:

1. **Blockierte Stylesheets und ES-Module**: Meldet die Browser-Konsole `Refused to apply style ... because its MIME type ('text/html') is not a supported stylesheet MIME type`, liefert der Server meist eine HTML-404-Fehlerseite statt der CSS-Datei aus – oft verursacht durch eine fehlerhafte Rewrite-Regel oder fehlende Fallback-Ausnahmen für statische Assets.
2. **Defekte WebAssembly-Streams**: Scheitert `WebAssembly.instantiateStreaming()` mit einem TypeError, fehlt in `mime.types` häufig der Eintrag `application/wasm wasm;`.
3. **Googlebot-Rendering und Weiterleitungen**: Blockiert `nosniff` falsch deklarierte CSS- oder JS-Dateien, rendert auch der Googlebot die Seite ohne Layout, was Core Web Vitals und Mobile-Usability-Signale beeinträchtigt. Bei komplexen Weiterleitungsketten lohnt zusätzlich ein Abgleich mit dem [Redirect-Checker](/de/werkzeuge/redirect-checker), da Zwischenziele manchmal abweichende `Content-Type`-Header setzen.

Durch die Kombination aus IANA-Konformitätsprüfung, Hex-Signatur-Analyse und konsequenter Header-Härtung beseitigen Sie sowohl subtile Darstellungsfehler als auch kritische Upload-Schwachstellen nachhaltig.
