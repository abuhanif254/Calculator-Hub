---
metaTitle: "URL Encoder & Decoder | RFC 3986 Percent-Encoding Tool"
metaDescription: "Kodieren und dekodieren Sie URLs nach RFC 3986 mit encodeURI, encodeURIComponent, UTF-8-Prüfung, Query-Parser und Erkennung doppelter Codierung."
metaKeywords: "url encoder, url decoder, percent encoding rfc 3986, encodeURIComponent, encodeURI, urlsearchparams, utf-8 url codieren, query string parser"
title: "URL Encoder & Decoder"
shortDescription: "Kodieren und dekodieren Sie URLs und Query-Parameter nach RFC 3986 in Echtzeit – inklusive Umschaltung zwischen encodeURI, encodeURIComponent, UTF-8-Byteanalyse und Double-Encoding-Erkennung."
faqs:
  - question: "Wann verwende ich encodeURI und wann encodeURIComponent?"
    answer: "Verwenden Sie encodeURI ausschließlich für bereits zusammengesetzte vollständige URLs, bei denen strukturelle Trennzeichen wie Doppelpunkt, Schrägstrich, Fragezeichen und kaufmännisches Und erhalten bleiben müssen. Nutzen Sie encodeURIComponent immer dann, wenn Sie einzelne Parameterwerte oder Pfadsegmente dynamisch in eine URL einfügen."
  - question: "Warum wird ein Leerzeichen manchmal als %20 und manchmal als Pluszeichen (+) codiert?"
    answer: "Nach RFC 3986 wird ein Leerzeichen in Pfaden und generischen URIs stets als %20 codiert. Das Pluszeichen (+) stammt aus der älteren HTML-Formularspezifikation application/x-www-form-urlencoded (genutzt von URLSearchParams) und gilt ausschließlich im Query-String, niemals im URL-Pfad."
  - question: "Wie werden deutsche Umlaute wie ä, ö, ü, ß und Emojis im Percent-Encoding dargestellt?"
    answer: "Alle Nicht-ASCII-Zeichen werden zuerst als UTF-8-Bytefolge serialisiert und anschließend Byte für Byte hexadezimal mit vorangestelltem Prozentzeichen notiert. So entsteht aus dem Umlaut ä (UTF-8: 0xC3 0xA4) die Sequenz %C3%A4, aus dem Eurozeichen € wird %E2%82%AC und aus einem 4-Byte-Emoji vier Hex-Blöcke."
  - question: "Was verursacht den Fehler URIError: URI malformed beim Dekodieren?"
    answer: "Dieser Fehler tritt auf, wenn eine Zeichenkette ein isoliertes Prozentzeichen ohne zwei gültige Hexadezimalziffern enthält (etwa 50% statt 50%25) oder wenn eine Legacy-Anwendung Umlaute in ISO-8859-1 statt UTF-8 codiert hat (beispielsweise %E4 statt %C3%A4)."
  - question: "Warum werden Umlaut-Domains wie münchen.de nicht per Percent-Encoding codiert?"
    answer: "Internationale Domainnamen (IDN) im Host-Abschnitt einer URL unterliegen dem IDNA-Standard (RFC 5891) und werden per Punycode in reines ASCII umgewandelt (xn--mnchen-3ya.de). Percent-Encoding kommt erst hinter dem Host in Pfaden, Query-Parametern und Fragmenten zum Einsatz."
features:
  - "Echtzeit-Konvertierung zwischen Klartext und RFC-3986-konformem Percent-Encoding (Encode und Decode)"
  - "Direkter Moduswechsel zwischen encodeURI (Gesamt-URL), encodeURIComponent (Einzelwerte) und Form-Encoding (+)"
  - "Interaktiver Query-String-Inspektor zur strukturierten Bearbeitung einzelner Schlüssel-Wert-Paare"
  - "Vollständige UTF-8-Unterstützung für DACH-Umlaute, Sonderzeichen, mathematische Symbole und Mehrbyte-Emojis"
  - "Automatische Diagnose doppelt codierter Sequenzen wie %2520 sowie ungültiger Prozent-Escapes"
  - "100 % lokale Verarbeitung im Browser ohne Übertragung von API-Keys, Tokens oder Tracking-URLs an Server"
useCases:
  - "Sicheres Escapen dynamischer Suchbegriffe, Filter und Redirect-Ziele in REST- und GraphQL-API-Anfragen"
  - "Aufschlüsselung verschachtelter OAuth-2.0-Callback-URLs und komplexer UTM-Kampagnenparameter"
  - "Fehlersuche bei Double-Encoding-Bugs (%2520, %252F) hinter Nginx-, Apache- oder CDN-Reverse-Proxys"
  - "Bereinigung fehlerhafter ISO-8859-1-Altdaten bei der Migration deutschsprachiger Shopsysteme auf UTF-8"
  - "Prüfung und Dekodierung verschleierter Phishing- oder Tracking-Links vor dem Aufruf im Browser"
  - "Erstellung normgerechter Signaturen für AWS SigV4, S3 Pre-Signed URLs und OAuth-1.0a-Endpunkte"
howToSteps:
  - "Wählen Sie den gewünschten Modus aus: Codieren (Encode) oder Dekodieren (Decode)."
  - "Fügen Sie die vollständige URL, einen Query-Parameter oder beliebigen UTF-8-Text in das Eingabefeld ein."
  - "Entscheiden Sie beim Codieren zwischen encodeURIComponent (für Parameterwerte) und encodeURI (für komplette Adressen)."
  - "Prüfen Sie bei URLs mit Query-String die aufgeschlüsselten Schlüssel-Wert-Paare direkt im Parameter-Inspektor."
  - "Kontrollieren Sie eventuelle Hinweise auf doppelte Codierungen (%25...) oder fehlerhafte Byte-Sequenzen."
  - "Kopieren Sie das Ergebnis mit einem Klick für Code, HTTP-Clients (curl/Postman) oder Serverkonfigurationen."
---

Das **URL-Encoding** – in **RFC 3986** präzise als **Percent-Encoding** spezifiziert – bildet das syntaktische Fundament jeder HTTP- und REST-Kommunikation. Da Uniform Resource Identifiers (URIs) auf der Transportebene lediglich eine fest umrissene Teilmenge des US-ASCII-Zeichensatzes enthalten dürfen, müssen reservierte Trennzeichen, Leerzeichen sowie internationale UTF-8-Zeichen eindeutig maskiert werden. Fehler beim Escapen gehören im Entwicklungsalltag zu den häufigsten Ursachen für fehlgeschlagene API-Aufrufe, unterbrochene OAuth-2.0-Weiterleitungen, fehlerhafte Dateidownloads mit deutschen Umlauten und kritische Sicherheitslücken.

## URI-Anatomie, Zeichensätze nach RFC 3986 und UTF-8-Bytecodierung

Eine Standard-URI gliedert sich gemäß RFC 3986 in fünf strukturelle Bestandteile: `scheme://authority/path?query#fragment`. Je nachdem, in welchem dieser Abschnitte ein Zeichen steht, gelten unterschiedliche Kodierungsregeln. Der Standard unterteilt alle zulässigen ASCII-Zeichen zunächst in **Unreserved Characters** (`A–Z`, `a–z`, `0–9`, `-`, `.`, `_`, `~`), die überall unverändert stehen bleiben dürfen, sowie **Reserved Characters** mit fest definierter Trennfunktion. Diese zerfallen in `gen-delims` (`:`, `/`, `?`, `#`, `[`, `]`, `@`) zur Abgrenzung der Hauptkomponenten und `sub-delims` (`!`, `$`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `;`, `=`) innerhalb einzelner Segmente.

Tritt ein reserviertes Zeichen als bloßer Datenwert auf – beispielsweise ein `&` im Firmennamen `Meier & Söhne` oder ein `/` in einer Datumsangabe innerhalb eines Query-Parameters –, muss es durch `%` gefolgt von seinem zweistelligen Hexadezimalwert ersetzt werden (`%26` bzw. `%2F`). Gemäß RFC 3986 Abschnitt 2.1 sollten Erzeuger konsistent Großbuchstaben (`%C3%A4` statt `%c3%a4`) ausgeben, um Cache-Keys und kryptografische Request-Signaturen deterministisch zu halten.

Zeichen außerhalb des ASCII-Raums durchlaufen eine zweistufige Umwandlung: Zuerst werden sie in ihre **UTF-8-Bytefolge** zerlegt, anschließend wird jedes Byte einzeln prozentcodiert:

* `ä` (`U+00E4`) → UTF-8 `0xC3 0xA4` → `%C3%A4`
* `ß` (`U+00DF`) → UTF-8 `0xC3 0x9F` → `%C3%9F`
* `€` (`U+20AC`) → UTF-8 `0xE2 0x82 0xAC` → `%E2%82%AC`
* `🚀` (`U+1F680`) → UTF-8 `0xF0 0x9F 0x9A 0x80` → `%F0%9F%9A%80`

Eine wichtige Sonderregel betrifft internationale Domainnamen (IDN) im `authority`-Teil wie `münchen.de`: Der Hostname wird nicht per Percent-Encoding, sondern nach **RFC 5891 (IDNA)** über **Punycode** in `xn--mnchen-3ya.de` umgewandelt. Für saubere, suchmaschinenfreundliche Pfadsegmente ohne Sonderzeichen nutzen Sie ergänzend den [Slug-Generator](/de/werkzeuge/slug-generator).

## Vergleich: `encodeURI`, `encodeURIComponent`, `URLSearchParams` und RFC 3986

In JavaScript, TypeScript und modernen Web-Frameworks stehen mehrere native Kodierungs-APIs zur Auswahl, deren Verhalten bei kritischen Sonderzeichen spürbar voneinander abweicht. Besonders bei signierten Schnittstellen (wie AWS Signature Version 4, S3 Pre-Signed URLs oder OAuth 1.0a) führen diese feinen Differenzen regelmäßig zu `403 SignatureDoesNotMatch`-Fehlern:

| Zeichen / Beispiel | `encodeURI()` | `encodeURIComponent()` | `URLSearchParams` | RFC 3986 Strict |
| :--- | :--- | :--- | :--- | :--- |
| Leerzeichen (` `) | `%20` | `%20` | `+` | `%20` |
| Pfadtrenner (`/`) | `/` (unverändert) | `%2F` | `%2F` | `%2F` |
| Query-Trenner (`? & =`) | `? & =` (unverändert) | `%3F %26 %3D` | `%3F %26 %3D` | `%3F %26 %3D` |
| Pluszeichen (`+`) | `+` (unverändert) | `%2B` | `%2B` | `%2B` |
| Sub-Delims (`! ' ( ) *`) | unverändert | unverändert | `%21 %27 %28 %29 %2A` | `%21 %27 %28 %29 %2A` |
| Umlaut (`ä`) / Euro (`€`) | `%C3%A4` / `%E2%82%AC` | `%C3%A4` / `%E2%82%AC` | `%C3%A4` / `%E2%82%AC` | `%C3%A4` / `%E2%82%AC` |

Beachten Sie besonders zwei Fallstricke: Erstens kodiert `URLSearchParams` Leerzeichen nach dem HTML-Formularstandard `application/x-www-form-urlencoded` als `+` statt `%20` – ein Pluszeichen im URL-Pfad (`/suche/c+plus`) wird vom Webserver hingegen **nicht** als Leerzeichen interpretiert! Zweitens belässt `encodeURIComponent()` die fünf Zeichen `!`, `'`, `(`, `)` und `*` uncodiert. Für strikte RFC-3986-Konformität empfiehlt sich folgender Wrapper:

```typescript
// Strikte RFC-3986-Kodierung (inkl. ! ' ( ) *)
export function encodeRFC3986(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

// Sichere Query-Konstruktion mit WHATWG URL API
const url = new URL("https://api.beispiel.de/v2/suche");
url.searchParams.set("firma", "Meier & Söhne");
url.searchParams.set("redirect", "https://beispiel.de/danke?status=ok");
```

## Typische Produktionsfehler: Double-Encoding, Unicode-Normalisierung und Proxys

Im produktiven Betrieb entstehen die hartnäckigsten URI-Fehler an den Übergängen zwischen Browser, Reverse-Proxy und Anwendungsserver:

### 1. Double-Encoding (`%2520`, `%252F`) in Nginx und Apache

Durchläuft ein bereits codierter Wert ein zweites Mal `encodeURIComponent()` oder eine fehlerhafte Rewrite-Regel, wird das Prozentzeichen selbst zu `%25` umgeschrieben: Aus `%20` entsteht `%2520`, aus `%C3%A4` wird `%25C3%25A4`. Bei **Nginx** tritt dies klassischerweise auf, wenn `proxy_pass` mit angehängtem URI-Pfad auf eine bereits normalisierte Location zeigt. Bei **Apache `mod_rewrite`** verhindert das Flag `[NE]` (*No Escape*) unerwünschtes doppeltes Escapen von Ziel-URLs, während `[B]` (*Escape Backreferences*) sicherstellt, dass ein `&` aus einer Pfad-Variable nicht fälschlich als neuer Query-Parameter interpretiert wird:

```apache
# Apache mod_rewrite: Backreference sicher für Query-Parameter escapen
RewriteRule ^suche/(.*)$ /index.php?q=$1 [B,QSA,L]
```

Prüfen Sie mehrstufige Weiterleitungsketten im Zweifel gezielt über unseren [Redirect-Checker](/de/werkzeuge/redirect-checker) und den [HTTP-Header-Checker](/de/werkzeuge/http-header-checker).

### 2. Legacy-ISO-8859-1 und Unicode-Normalisierung (NFC vs. NFD)

Ältere ERP- oder Shopsysteme kodieren Umlaute gelegentlich noch nach ISO-8859-1/Windows-1252 (etwa `%FC` statt `%C3%BC` für `ü`). Beim Aufruf von `decodeURIComponent("%FC")` wirft JavaScript sofort einen `URIError: URI malformed`. Ähnlich subtil verhält sich die Unicode-Normalisierung bei Dateiuploads von macOS: Ein zerlegtes `ä` (NFD: `a` + Kombinations-Trema `U+0308`) erzeugt `%61%CC%88`, während Windows und Linux die zusammengesetzte NFC-Form `%C3%A4` erwarten. Analysieren Sie problematische Bytefolgen im [URL-Decoder](/de/werkzeuge/url-decoder) und normalisieren Sie Dateinamen serverseitig vor der Signatur- oder Pfadbildung mit `.normalize("NFC")`.

### 3. Kodierte Schrägstriche im Pfad und Fragment-Besonderheiten

Ein häufig übersehenes Detail in REST-Architekturen betrifft prozentcodierte Schrägstriche (`%2F`) innerhalb von Pfadsegmenten: Webserver wie Apache HTTP Server und Apache Tomcat lehnen Anfragen mit `%2F` im Pfad standardmäßig mit `404 Not Found` oder `400 Bad Request` ab, um Umgehungen pfadbasierter Zugriffskontrollen zu verhindern (konfigurierbar über `AllowEncodedSlashes NoDecode`). Übergeben Sie beliebige Benutzerwerte, externe URLs oder zusammengesetzte IDs daher konsequent als Query-Parameter statt als Pfadsegment. Beachten Sie zudem, dass alles hinter dem Rauten-Symbol (`#fragment`) ausschließlich im Browser ausgewertet und niemals in der HTTP-Request-Zeile an den Server gesendet wird – ein uncodiertes `#` in einem Farbwert wie `#ff6600` schneidet daher alle nachfolgenden Query-Parameter vollständig ab, solange es nicht als `%23ff6600` maskiert wird.

## Sicherheitsaspekte beim Umgang mit URL-Encoding

Percent-Encoding garantiert syntaktische Transportfähigkeit, bietet aber **keinerlei Vertraulichkeit oder Verschlüsselung**. Zugangsdaten, API-Schlüssel, Session-Tokens oder personenbezogene Daten gehören niemals in URL-Parameter, da sie ungeschützt in Browser-Chroniken, Proxy-Logs, CDN-Protokollen und `Referer`-Headern auftauchen. Für strukturierte Binärdaten in HTTP-Headern oder Request-Bodys greifen Sie stattdessen auf den [Base64-Encoder](/de/werkzeuge/base64-encode) zurück.

Gleichzeitig muss jede serverseitige Sicherheitsprüfung – etwa gegen **Path Traversal** (`%2e%2e%2f` oder doppelt maskiertes `%252e%252e%252f`) sowie gegen Cross-Site Scripting über `javascript:`-URIs – stets **nach** der vollständigen kanonischen Dekodierung erfolgen, um WAF- und Filter-Umgehungen zuverlässig auszuschließen.
