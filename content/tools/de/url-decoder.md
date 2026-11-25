---
metaTitle: "URL Decoder Online | Percent-Decoding & Query-Inspektor"
metaDescription: "Dekodieren Sie prozentcodierte URLs, UTF-8-Umlaute und Query-Parameter lokal im Browser – inkl. decodeURIComponent, Double-Encoding-Erkennung."
metaKeywords: "url decoder, url dekodieren, percent decoding, decodeURIComponent, decodeURI, query parameter parser, doppelt codierte url, utf-8 url decoder"
title: "URL Decoder"
shortDescription: "Dekodieren Sie prozentcodierte URLs und Query-Strings nach RFC 3986 in Echtzeit – mit Parameter-Inspektor, UTF-8-Rekonstruktion, Moduswahl und automatischer Erkennung doppelter Codierung."
faqs:
  - question: "Was ist der Unterschied zwischen decodeURI und decodeURIComponent?"
    answer: "decodeURI dekodiert nur Zeichen, die die URL-Struktur nicht zerstören, und lässt reservierte Trennzeichen wie %2F (/), %3F (?), %26 (&) und %3D (=) bewusst codiert. decodeURIComponent löst hingegen sämtliche Prozentsequenzen auf und eignet sich daher für isolierte Parameterwerte oder Pfadsegmente."
  - question: "Warum bleibt ein Pluszeichen (+) bei decodeURIComponent stehen, während URLSearchParams daraus ein Leerzeichen macht?"
    answer: "Nach RFC 3986 ist + ein gültiges Zeichen und kein Leerzeichen; Leerzeichen werden als %20 codiert. Die Konvention + für Leerzeichen stammt aus dem HTML-Formularformat application/x-www-form-urlencoded (WHATWG URLSearchParams) und gilt ausschließlich im Query-String, niemals im URL-Pfad."
  - question: "Was verursacht den Fehler URIError: URI malformed beim URL-Dekodieren?"
    answer: "Der Fehler entsteht entweder durch ein alleinstehendes Prozentzeichen ohne zwei gültige Hex-Ziffern (etwa 20% Rabatt statt 20%25 Rabatt) oder durch abgeschnittene bzw. nicht UTF-8-konforme Bytefolgen – typischerweise Umlaute aus alten ISO-8859-1-Systemen wie %E4 statt %C3%A4."
  - question: "Wie erkenne und behebe ich doppelt codierte URLs wie %2520 oder %252F?"
    answer: "Doppelte Codierung zeigt sich sofort an Sequenzen, die mit %25 beginnen (dem Hex-Code des Prozentzeichens selbst): Aus %20 wird %2520, aus %2F wird %252F. Unser Decoder erkennt diese Schichten automatisch und zeigt an, wie viele Dekodierschritte bis zum stabilen Klartext nötig sind."
  - question: "Darf ich sensible Tracking-Links, OAuth-Callbacks oder API-URLs in diesen Decoder einfügen?"
    answer: "Die gesamte Dekodierung und Tabellenaufbereitung erfolgt zu 100 % clientseitig im Speicher Ihres Browsers ohne Serverübertragung. Dennoch sollten Sie produktive Access-Tokens oder persönliche Kundendaten grundsätzlich kurzlebig halten und niemals dauerhaft in URL-Parametern transportieren."
features:
  - "Echtzeit-Percent-Decoding nach RFC 3986 mit sauberer Trennung von Pfad, Query-String und Fragment"
  - "Interaktiver Query-Parameter-Inspektor zur tabellarischen Anzeige und Bearbeitung aller Schlüssel-Wert-Paare"
  - "Umschaltung zwischen decodeURIComponent, decodeURI und Form-Decoding (+ als Leerzeichen)"
  - "Vollständige UTF-8-Mehrbyte-Rekonstruktion für deutsche Umlaute (ä, ö, ü, ß), Eurozeichen und Emojis"
  - "Automatische Diagnose doppelt codierter Sequenzen (%2520, %253A) sowie fehlerhafter Prozent-Escapes"
  - "100 % lokale Verarbeitung im Browser ohne Protokollierung interner API-Endpunkte oder OAuth-Redirects"
useCases:
  - "Aufschlüsseln verschachtelter OAuth-2.0- und OpenID-Connect-Redirect-URIs samt State- und Scope-Parametern"
  - "Analysieren stark verschleierter UTM-Marketing-, Affiliate- und E-Mail-Tracking-Links vor dem Klick"
  - "Entpacken prozentcodierter JSON-Filter und Suchabfragen aus REST-API-GET-Requests und Server-Logs"
  - "Eingrenzen von Double-Encoding-Fehlern (%2520, %252F) in Nginx-, Apache- und CDN-Rewrite-Ketten"
  - "Fehlerdiagnose bei fehlerhaft codierten ISO-8859-1-Umlauten aus älteren ERP-, Shop- und CRM-Schnittstellen"
  - "Sicherheits-Triage verdächtiger URLs mit codierten Path-Traversal- oder Open-Redirect-Mustern"
howToSteps:
  - "Fügen Sie die vollständige URL, einen einzelnen Query-String oder eine prozentcodierte Zeichenfolge ein."
  - "Wählen Sie je nach Kontext den passenden Modus: decodeURIComponent für Einzelwerte, decodeURI für Gesamt-URLs oder Form-Modus für +-Leerzeichen."
  - "Prüfen Sie den sofort dekodierten Klartext im Ausgabefeld auf Umlaute, Sonderzeichen und lesbare Zielpfade."
  - "Nutzen Sie den Query-Parameter-Inspektor, um verschachtelte Schlüssel-Wert-Paare übersichtlich zeilenweise zu prüfen."
  - "Achten Sie auf Hinweise zu doppelter Codierung (%25...) und wiederholen Sie bei Bedarf die Dekodierung bis zum Klartext."
  - "Kopieren Sie die bereinigte URL oder einzelne dekodierte Parameter direkt für Code, HTTP-Clients oder Fehlerberichte."
---

Verschachtelte OAuth-Weiterleitungen, fehlerhafte Reverse-Proxy-Rewrites, mehrsprachige Shop-URLs oder serialisierte JSON-Filter in `GET`-Parametern werden durch **Percent-Encoding** rasch unlesbar. Eine einzelne Weiterleitung über zwei Systeme verwandelt harmlose Pfade in kryptische Zeichenketten voller `%253A%252F%252F` und `%C3%A4`. Der **URL Decoder** übersetzt prozentcodierte Zeichenfolgen nach **RFC 3986** und dem **WHATWG URL Standard** direkt im Browser zurück in menschenlesbaren UTF-8-Text, zerlegt komplexe Query-Strings tabellarisch und macht mehrschichtige Kodierungsfehler sofort sichtbar.

## Funktionsweise der Prozentdekodierung und UTF-8-Rekonstruktion

Ein normgerechter URL-Decoder scannt die Eingabe sequenziell von links nach rechts. Sobald er auf ein Prozentzeichen (`%`) stößt, liest er die beiden unmittelbar folgenden ASCII-Hexadezimalziffern (`0–9`, `A–F`, `a–f`) als einzelnes 8-Bit-Oktett ein – `%20` ergibt `0x20` (Leerzeichen), `%3F` ergibt `0x3F` (`?`). Entscheidend ist, was unmittelbar danach passiert: Der Decoder darf einzelne Oktette **nicht** isoliert als Latin-1-Zeichen ausgeben, sondern muss aufeinanderfolgende Prozent-Bytes zunächst in einem Rohbyte-Puffer sammeln und anschließend als gültige **UTF-8-Sequenz (RFC 3629)** dekodieren.

Nur diese vollständige Mehrbyte-Rekonstruktion stellt internationale Zeichen aus dem DACH-Raum sowie moderne Unicode-Symbole korrekt wieder her:

- **2-Byte-Umlaute**: `%C3%A4` → `ä`, `%C3%B6` → `ö`, `%C3%BC` → `ü`, `%C3%9F` → `ß`
- **3-Byte-Währungssymbol**: `%E2%82%AC` → `€` (`U+20AC`)
- **4-Byte-Emoji**: `%F0%9F%94%92` → `🔒` (`U+1F512`)

Stammt ein Link dagegen aus einem älteren deutschsprachigen ERP- oder Shopsystem mit **ISO-8859-1 / Windows-1252**, tauchen Einzelbytes wie `%E4` (für `ä`) oder `%FC` (für `ü`) ohne zugehörige UTF-8-Folgebytes (`0x80–0xBF`) auf. Strikt arbeitende UTF-8-Decoder brechen an exakt dieser Stelle mit `URIError: URI malformed` ab. Beachten Sie zudem, dass Umlaut-Domains im Hostnamen wie `xn--zrich-kva.ch` nicht per Percent-Decoding, sondern per **Punycode (IDNA, RFC 5891)** verarbeitet werden, während alles hinter dem Rauten-Symbol (`#fragment`) rein clientseitig im Browser bleibt und niemals in Server-Logs erscheint.

## Vergleich der Dekodierungs-Modi in Browser und Backend

Die Wahl der falschen Dekodierfunktion gehört zu den häufigsten Fehlerquellen bei Web-APIs – insbesondere beim Umgang mit reservierten Trennzeichen (`/`, `&`, `=`) und dem Pluszeichen (`+`):

| API / Modus | Dekodiert `%2F`, `%26`, `%3D`? | Behandelt `+` als Leerzeichen? | Verhalten bei ungültigem `%` / Byte | Empfohlener Einsatzkontext |
| :--- | :--- | :--- | :--- | :--- |
| `decodeURI()` (JS) | **Nein** (bleiben erhalten) | Nein (`+` bleibt `+`) | Wirft `URIError` | Ganze URLs anzeigen, ohne Trennzeichen zu zerbrechen |
| `decodeURIComponent()` (JS) | **Ja** (`/`, `&`, `=`) | Nein (`+` bleibt `+`) | Wirft `URIError` | Einzelne Query-Werte, Pfadsegmente, Fragmente |
| `URLSearchParams` (WHATWG) | **Ja** (nach Split an `&`/`=`) | **Ja** (`+` → ` `) | Ersetzt defektes UTF-8 durch `U+FFFD` | Vollständige Query-Strings (`application/x-www-form-urlencoded`) |
| Python `unquote` / `unquote_plus` | **Ja** | Nur `unquote_plus` | Ersetzt defekte Bytes durch `U+FFFD` | Klare Trennung: `unquote` für Pfade, `unquote_plus` für Queries |
| Go `url.PathUnescape` / `QueryUnescape` | **Ja** | Nur `QueryUnescape` | Gibt `url.EscapeError` zurück | Typsicheres Routing und Backend-Middleware |

Besonders heimtückisch ist das Pluszeichen beim Transport von Base64-Strings in Query-Parametern: Wurde ein Standard-Base64-Token ohne vorheriges Escapen (`%2B`) angehängt, wandelt `URLSearchParams` jedes `+` stillschweigend in ein Leerzeichen um und zerstört die Nutzdaten. Prüfen Sie solche Payloads gezielt im [Base64 Decoder](/de/werkzeuge/base64-decode) oder verwenden Sie durchgängig den [URL Encoder](/de/werkzeuge/url-encoder) mit sauberer Parameter-Kodierung.

## Double-Encoding, Query-Edge-Cases und Fehlerdiagnose

### Mehrfachcodierung erkennen und iterativ auflösen

**Double-Encoding** entsteht, sobald ein bereits codierter String ein weiteres Mal durch einen Encoder oder eine falsch konfigurierte Proxy-Rewrite-Regel läuft. Das Prozentzeichen (`%`) selbst wird dabei zu `%25`: Aus `https://app.de/?q=a b` wird im ersten Schritt `https%3A%2F%2Fapp.de%2F%3Fq%3Da%20b` und im zweiten `https%253A%252F%252Fapp.de%252F%253Fq%253Da%2520b`. Ein robuster Inspektions-Algorithmus dekodiert schrittweise bis zum Fixpunkt – stets mit harter Obergrenze gegen bösartige Eingaben:

```typescript
// Iterative Erkennung und Diagnose von Mehrfachcodierungen
export function decodeWithLayerCheck(input: string, maxPasses = 5) {
  let current = input;
  let layers = 0;

  while (layers < maxPasses) {
    const next = decodeURIComponent(current);
    if (next === current) break;
    current = next;
    layers += 1;
  }
  return { decoded: current, layers, isDoubleEncoded: layers > 1 };
}

// Schneller Terminal-Check per Python (Path vs. Query)
// python3 -c "import urllib.parse as u, sys; print(u.unquote_plus(sys.argv[1]))" "M%C3%BCnchen+S%C3%BCd"
```

Treten unerklärliche `%2520`- oder `%252F`-Ketten erst nach Deployments auf, prüfen Sie die gesamte Weiterleitungskette direkt mit unserem [Redirect-Checker](/de/werkzeuge/redirect-checker) und dem [HTTP-Header-Checker](/de/werkzeuge/http-header-checker).

### Typische Query-String-Sonderfälle und `URIError`-Fallbacks

Im Produktivbetrieb weichen reale Query-Strings häufig vom Idealbild ab: Wiederholte Schlüssel (`?tag=api&tag=rest`, die im Code explizit per `searchParams.getAll("tag")` statt `.get()` ausgelesen werden müssen), PHP-/Rails-Array-Notation (`filter[status]=aktiv`), Flags ohne Wert (`?debug`) oder uncodierte Prozentangaben aus Freitextfeldern (`rabatt=15%`) führen bei naiven `split()`-Parsern zu Datenverlust oder Abstürzen.

Muss eine Migration defekte Legacy-Links mit ISO-8859-1-Bytes (`%E4`) oder isolierten Prozentzeichen tolerant verarbeiten, lässt sich der Eingabestring vorab per regulärem Ausdruck `/%(?![0-9A-Fa-f]{2})/g` absichern und im Fehlerfall über `new TextDecoder("windows-1252")` statt striktem UTF-8 analysieren. Ebenso erzeugen macOS-Dateinamen in zerlegter Unicode-Normalform (**NFD**: `a%CC%88` statt **NFC**: `%C3%A4`) optisch identische, aber binär unterschiedliche Strings – ein häufiger Grund für fehlgeschlagene Signatur- oder Dateinamenvergleiche. Beachten Sie zudem, dass Webserver wie Apache und Tomcat codierte Schrägstriche (`%2F`) im URL-Pfad aus Sicherheitsgründen standardmäßig mit `400` oder `404` abweisen.

## Sicherheitsaspekte: Dekodierungsreihenfolge, Path Traversal und XSS

Eine korrekte Dekodier-Pipeline ist unmittelbar sicherheitskritisch. Beachten Sie drei verbindliche Architekturregeln:

1. **Immer zuerst parsen, erst danach dekodieren**: Zerlegen Sie einen Query-String zwingend **vor** dem Dekodieren an `&` und `=`. Wer die gesamte URL vorab durch `decodeURIComponent()` schickt, erlaubt Angreifern über eingeschleuste Sequenzen wie `%26rolle%3Dadmin` eine klassische **HTTP Parameter Pollution**.
2. **Kanonische Prüfung gegen Path Traversal und WAF-Bypass**: Doppelt codierte Sequenzen wie `%252e%252e%252f` (`../`) umgehen Filter, die nur die Roh-URL prüfen oder lediglich einmal dekodieren, während ein nachgelagerter Applikationsserver ein zweites Mal dekodiert. Validieren Sie Dateipfade immer auf dem vollständig aufgelösten kanonischen Pfad.
3. **Open Redirects und `javascript:`-XSS abwehren**: Ein vermeintlich harmloser `returnUrl`-Parameter wie `%6A%61%76%61%73%63%72%69%70%74%3Aalert(1)` offenbart erst nach dem Dekodieren das ausführbare `javascript:`-Schema. Prüfen Sie Weiterleitungsziele nach dem Dekodieren stets gegen eine strikte Protokoll- (`https:`) und Host-Allowlist – und formatieren Sie extrahierte JSON-Parameter bei der Analyse übersichtlich im [JSON Formatter](/de/werkzeuge/json-formatter).
