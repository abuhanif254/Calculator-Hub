---
metaTitle: "URL Encoder & Decoder Online | encodeURIComponent Tool"
metaDescription: "Erweitertes Percent-Encoding-Dienstprogramm für URLs. Unterstützt encodeURI, encodeURIComponent, Query-String-Parsing und Unicode-Konvertierung in Echtzeit."
metaKeywords: "url encoder, url decoder, url codieren, percent encoding, encodeURIComponent, encodeURI, url string dekodieren, url utf8"
title: "URL Encoder & Decoder"
shortDescription: "Erweitertes Percent-Encoding-Tool für URLs. Unterstützt encodeURI, encodeURIComponent, Query-Parameter-Analyse und Unicode-Konvertierung in Echtzeit."
faqs:
  - question: "Was ist URL-Encoding?"
    answer: "URL-Encoding (Percent-Encoding) ist ein Mechanismus zur Konvertierung von Zeichen, die in URLs nicht zulässig sind (wie Leerzeichen oder Emojis), in ein websicheres Format unter Verwendung eines '%'-Zeichens gefolgt von Hexadezimalziffern."
  - question: "Warum müssen URLs codiert werden?"
    answer: "URLs können über das Internet nur mit dem grundlegenden ASCII-Zeichensatz gesendet werden. Jedes Zeichen außerhalb dieses Satzes muss codiert werden, damit der Webserver die URL korrekt parsen kann."
  - question: "Was ist Percent Encoding?"
    answer: "Percent Encoding ist der formelle Fachbegriff für URL-Encoding. Es bezieht sich auf die Praxis, ein unsicheres Zeichen durch ein Prozentzeichen (%) und seinen 2-stelligen Hex-Byte-Wert zu ersetzen."
  - question: "Wie dekodiere ich eine URL?"
    answer: "Fügen Sie einfach Ihre codierte URL in unser Tool ein und stellen Sie sicher, dass die Registerkarte 'Dekodieren' ausgewählt ist. Das Tool analysiert die Zeichenfolge automatisch und wandelt alle %-Sequenzen wieder in ihre ursprünglichen Zeichen um."
  - question: "Was ist der Unterschied zwischen encodeURI und encodeURIComponent?"
    answer: "encodeURI ist für die Codierung einer gesamten URL gedacht; es ignoriert strukturelle Zeichen wie 'http://' und '/'. encodeURIComponent ist streng – es codiert fast alles. Es sollte nur zum Codieren einzelner Abfrageparameterwerte (Query Parameters) verwendet werden."
features:
  - "Sofortige bidirektionale URL-Codierung und -Dekodierung in Echtzeit"
  - "Umschalten zwischen encodeURI (vollständige URLs) und encodeURIComponent (Parameter)"
  - "Interaktiver Query-Parameter-Inspektor zum visuellen Bearbeiten von Schlüssel-Wert-Paaren"
  - "Vollständige Unterstützung für die Prozentcodierung von UTF-8- und Unicode-Emojis"
  - "Intelligente Erkennung doppelt codierter Zeichen und ungültiger URI-Formate"
  - "Fehlerbehandlung für fehlerhafte Prozentcodierungssequenzen"
  - "100 % clientseitige lokale Ausführung für absolute Privatsphäre und Sicherheit"
useCases:
  - "Vorbereitung von Benutzereingaben für URL-Abfrageparameter in API-Anforderungen"
  - "Dekodieren von verschleierten Tracking-Links, um das ursprüngliche Ziel zu sehen"
  - "Fehlerbehebung bei doppelt codierten Serverantworten ('%2520')"
  - "Visuelle Überprüfung und Bearbeitung großer Abfragezeichenfolgen aus Marketingkampagnen"
  - "Konvertierung von Unicode-Zeichen und Emojis in gültige ASCII-Links"
howToSteps:
  - "Wählen Sie den Betriebsmodus: 'Codieren' oder 'Dekodieren'."
  - "Fügen Sie Ihre URL oder Textzeichenfolge in das Eingabefeld ein."
  - "Wählen Sie beim Codieren zwischen 'Komponente' (strenge Codierung) oder 'Vollständige URL'."
  - "Das Ausgabefeld generiert sofort die sichere, prozentcodierte Zeichenfolge."
  - "Wenn Ihre URL eine Abfragezeichenfolge enthält, scrollen Sie nach unten zum 'Query Inspector', um Parameter einzeln zu bearbeiten."
  - "Kopieren Sie die Ausgabe oder laden Sie sie als Textdatei herunter."
---

## Was ist URL-Encoding?

**URL-Encoding** (oder Percent-Encoding) ist ein Mechanismus zum Codieren von Informationen in einem Uniform Resource Identifier (URI). URLs können über das Internet nur mit dem ASCII-Zeichensatz gesendet werden. Da URLs häufig Zeichen außerhalb des ASCII-Satzes enthalten (wie Leerzeichen, Emojis oder internationale Zeichen), müssen diese Zeichen in ein gültiges ASCII-Format konvertiert werden.

Beim URL-Encoding werden unsichere ASCII-Zeichen durch ein `%` ersetzt, gefolgt von zwei hexadezimalen Ziffern. Beispielsweise wird ein einfaches Leerzeichen durch `%20` ersetzt.

---

## Was ist Percent-Encoding?

Percent-Encoding (Prozentcodierung) ist der genaue Fachbegriff für das URL-Encoding, das in RFC 3986 definiert ist. Das Konzept ist einfach: Wenn ein Zeichen reserviert oder in einem URI nicht zulässig ist, ersetzt der Browser oder Server es durch ein Prozentzeichen `%` und seinen hexadezimalen Bytewert.

Das Ausrufezeichen `!` wird beispielsweise zu `%21` und das Rauten-Symbol `#` zu `%23`. Dadurch wird verhindert, dass Webserver die Daten innerhalb einer URL mit den strukturellen Komponenten der URL selbst verwechseln.

---

## encodeURI vs encodeURIComponent

Wenn Sie ein JavaScript-Entwickler sind, werden Sie häufig zwei integrierte Funktionen verwenden: `encodeURI()` und `encodeURIComponent()`. Der Unterschied ist entscheidend.

**encodeURI()**: Wird verwendet, um eine vollständig funktionale URL zu codieren. Protokollpräfixe (wie `http://`) und Domänentrennzeichens werden ignoriert. Zeichen wie `?`, `=`, `&`, `/` oder `:` werden NICHT codiert.

**encodeURIComponent()**: Wird verwendet, um eine bestimmte Komponente einer URL zu codieren, typischerweise einen Abfrageparameterwert. Es codiert fast alles, einschließlich `?`, `=`, `&` und `/`.

*Faustregel: Wenn Sie eine Abfragezeichenfolge wie `?name=${value}` erstellen, verwenden Sie immer `encodeURIComponent(value)`.*

---

## Häufige URL-Encoding-Fehler

1. **Doppelte Codierung**: Codierung einer bereits codierten Zeichenfolge. Beispielsweise wird ein Leerzeichen (` `) zu `%20`. Wird es erneut codiert, wird das `%` zu `%25`, was zu `%2520` führt. Unser Tool hebt potenziell doppelt codierte Segmente hervor.
2. **Die vollständige URL falsch codieren**: Die Verwendung von `encodeURIComponent` für eine vollständige URL verwandelt `https://google.com` in `https%3A%2F%2Fgoogle.com`, was ein Browser nicht navigieren kann.
3. **Falscher Umgang mit Leerzeichen**: In Abfrageparametern wird ein Leerzeichen traditionell als Pluszeichen (`+`) codiert, in URL-Pfaden dagegen als `%20`.

---

## Sicherheitsaspekte

URL-Encoding ist entscheidend für die Vermeidung von Injection-Angriffen (XSS). Wenn Benutzereingaben direkt in einen Hyperlink oder ein Bild-Tag reflektiert werden, können Angreifer durch das Fehlen der URL-Codierung Code einschleusen.

Denken Sie jedoch daran, dass URL-Encoding **keine** Verschlüsselung ist. Es bietet keine Vertraulichkeit und ist von jedermann vollständig reversibel. Übergeben Sie keine sensiblen Informationen (wie Passwörter) in URLs, da diese im Browserverlauf und in Serverprotokollen gespeichert werden.
