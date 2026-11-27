---
metaTitle: "Regex Tester & Live-Debugger: ECMAScript & ReDoS-Check"
metaDescription: "Testen und debuggen Sie reguläre Ausdrücke nach ECMAScript-Standard direkt im Browser. Mit Capture Groups, Lookaheads, Flags (g/i/m/s/u) und ReDoS-Analyse."
metaKeywords: "Regex Tester, Reguläre Ausdrücke Debugger, ECMAScript RegExp, Capture Groups, Lookahead Lookbehind, ReDoS Schutz, Catastrophic Backtracking, Regex Flags"
title: "Regex Tester & Live-Debugger"
shortDescription: "Entwickeln, testen und validieren Sie reguläre Ausdrücke nach ECMAScript-Standard in Echtzeit direkt im Browser. Prüfen Sie Capture Groups, Lookarounds und potenzielle ReDoS-Schwachstellen ohne Server-Übertragung."
faqs:
  - question: "Welchem Standard folgt dieser Regex Tester?"
    answer: "Das Tool nutzt die native JavaScript-RegExp-Engine Ihres Browsers und entspricht damit vollständig der aktuellen ECMAScript-Spezifikation. Sie erhalten exakt dasselbe Matching-Verhalten wie in modernen Browsern, Node.js, Deno oder Cloudflare Workers."
  - question: "Was bedeutet Catastrophic Backtracking (ReDoS) und wie erkenne ich es?"
    answer: "Catastrophic Backtracking tritt auf, wenn ein regulärer Ausdruck mit verschachtelten oder überlappenden Quantifizierern wie (a+)+ auf eine nicht passende Eingabe trifft. Die Engine probiert exponentiell viele Kombinationen durch, wodurch der Thread Sekunden oder Minuten blockieren kann."
  - question: "Worin liegt der Unterschied zwischen den Flags m und s?"
    answer: "Das Flag m (multiline) verändert das Verhalten der Anker ^ und $, sodass diese an jedem Zeilenumbruch statt nur am Textanfang und -ende greifen. Das Flag s (dotAll) sorgt hingegen dafür, dass der Punkt . auch Zeilenumbruchzeichen wie LF oder CR einschließt."
  - question: "Werden meine Log-Daten oder Test-Strings an einen Server gesendet?"
    answer: "Nein. Die gesamte Auswertung der regulären Ausdrücke findet ausschließlich lokal im Arbeitsspeicher Ihres Browsers statt. Sensible Server-Logs, E-Mail-Adressen, JWT-Tokens oder Quellcode bleiben vollständig privat."
  - question: "Wann sollte ich Lookbehind-Assertions mit Vorsicht einsetzen?"
    answer: "Positive und negative Lookbehinds wie (?<=...) oder (?<!...) sind seit ES2018 Bestandteil von ECMAScript. Falls Sie jedoch Code für sehr alte JavaScript-Laufzeitumgebungen oder andere Regex-Dialekte ohne variable Lookbehind-Länge schreiben, sollten Sie stattdessen auf Capture Groups ausweichen."
features:
  - "Echtzeit-Highlighting aller Treffer inklusive benannter und nummerierter Capture Groups"
  - "Volle Unterstützung der ECMAScript-Flags g, i, m, s, u und d direkt im Browser"
  - "Interaktive Prüfung von Lookahead- und Lookbehind-Assertions sowie Grenzankern"
  - "Integrierter Replace-Vorschaumodus mit Rückreferenzen wie $1 oder $<name>"
  - "100 % clientseitige Ausführung ohne Upload vertraulicher Testdaten"
useCases:
  - "Extraktion strukturierter Felder aus unstrukturierten Server- und Nginx-Access-Logs"
  - "Entwicklung robuster Eingabevalidierungen für Formulare, IDs und API-Parameter"
  - "Refactoring und Suchen-und-Ersetzen von Quellcode mithilfe benannter Capture Groups"
  - "Sicherheits-Audit bestehender Patterns auf Catastrophic Backtracking vor dem Deployment"
  - "Verifizierung von Unicode-Zeichenklassen und Emoji-Handling mit dem u-Flag"
howToSteps:
  - "Geben Sie Ihren regulären Ausdruck in das Pattern-Feld ein und wählen Sie die gewünschten Flags (z. B. g, i, m, u)."
  - "Fügen Sie Ihren repräsentativen Testtext oder Log-Ausschnitt in den Eingabebereich ein."
  - "Prüfen Sie die farblich markierten Treffer, die aufgeschlüsselten Capture Groups und die Treffer-Indizes."
  - "Testen Sie gezielt fehlerhafte Grenzwerteingaben, um unerwartetes Backtracking frühzeitig auszuschließen."
---

Reguläre Ausdrücke gehören zu den leistungsfähigsten Werkzeugen in der Softwareentwicklung – sei es beim Parsen von Log-Dateien, der Validierung von API-Payloads oder bei komplexen Texttransformationen. Gleichzeitig führen schwer lesbare Syntaxkonstrukte, subtile Unterschiede zwischen Regex-Dialekten und übersehene Randfälle häufig zu schwer auffindbaren Bugs. Mit diesem Regex Tester & Live-Debugger prüfen Sie ECMAScript-Patterns interaktiv und verifizieren jeden Treffer inklusive aller Gruppen in Millisekunden.

Sämtliche Auswertungen laufen zu 100 % clientseitig über die JavaScript-Engine Ihres Browsers. Ihre Testdaten – etwa Produktiv-Logs mit IP-Adressen, E-Mail-Beständen, API-Keys oder internen Dokumenten – verlassen zu keinem Zeitpunkt Ihr Endgerät. Eine Übertragung an externe Server oder eine Protokollierung findet nicht statt.

## Technische Architektur: ECMAScript-NFA, Gruppen und Flags

Die JavaScript-`RegExp`-Engine basiert auf einem Nondeterministic Finite Automaton (NFA) mit Backtracking. Im Gegensatz zu reinen DFA-Engines (Deterministic Finite Automaton), wie sie etwa in RE2 verwendet werden, unterstützt eine NFA-Engine mächtige Sprachkonstrukte wie Rückreferenzen (`\1`), nicht-gierige Quantifizierer (`+?`, `*?`) sowie beliebige Lookahead- und Lookbehind-Assertions. Der Preis für diese Ausdrucksstärke liegt darin, dass die Engine bei fehlgeschlagenen Teilpfaden schrittweise zurückspringt, um alternative Pfade zu testen.

Mit modernen ECMAScript-Erweiterungen (ES2018 bis ES2024) stehen Entwicklern präzise Strukturierungsmittel zur Verfügung. Benannte Capture Groups (`(?<jahr>\d{4})`) erhöhen die Wartbarkeit erheblich gegenüber rein positionsbasierten Gruppen, da spätere Änderungen am Pattern keine Verschiebung von Gruppenindizes verursachen. Non-Capturing Groups (`(?:...)`) bündeln Teilausdrücke für Quantifizierer oder Alternativen, ohne Speicher für Capture-Ergebnisse zu allokieren. Mit dem `d`-Flag (`hasIndices`) liefert das Ergebnisobjekt über `match.indices` zusätzlich exakte Start- und Endpositionen für jedes Teilmatch, was Syntax-Highlighter und Linter massiv vereinfacht.

Zudem steuern Flags das globale Verhalten des Automaten entscheidend:
- **`g` (global):** Findet alle Vorkommen im String statt nach dem ersten Treffer abzubrechen. Beachten Sie bei wiederholten Aufrufen von `exec()`, dass ein globales `RegExp`-Objekt einen internen `lastIndex`-Zustand mitführt.
- **`i` (ignoreCase):** Ignoriert Groß- und Kleinschreibung unter Berücksichtigung des Unicode-Case-Foldings (bei aktivem `u`-Flag).
- **`m` (multiline):** Lässt `^` und `$` an jedem Zeilenanfang bzw. Zeilenende greifen, statt nur am absoluten Anfang und Ende des gesamten Strings.
- **`s` (dotAll):** Erweitert den Platzhalter `.` auf Zeilenumbrüche (`\n`, `\r`, `\u2028`, `\u2029`).
- **`u` (unicode):** Aktiviert die korrekte Verarbeitung von Surrogatpaaren, Unicode-Codepoints (`\u{...}`) und Property-Escapes wie `\p{L}`.

## Praxis-Walkthrough: Log-Parsing mit Named Capture Groups und Lookaround

Betrachten wir einen typischen Anwendungsfall aus dem DevOps-Alltag: Sie möchten strukturierte Felder aus einer API-Gateway-Logzeile extrahieren, dabei jedoch Health-Check-Endpunkte konsequent ausschließen.

**Testdaten:**
```text
2026-11-27T09:14:22Z [WARN] POST /api/v2/orders status=502 latency=412ms
2026-11-27T09:14:25Z [INFO] GET /healthz status=200 latency=2ms
```

**Optimiertes ECMAScript-Pattern (Flags `g` und `m`):**
```regex
^(?<timestamp>\d{4}-\d{2}-\d{2}T[\d:]+Z)\s+\[(?<level>[A-Z]+)\]\s+(?<method>GET|POST|PUT|DELETE)\s+(?!\/healthz\b)(?<path>\/\S+)\s+status=(?<status>\d{3})\s+latency=(?<latency>\d+)ms$
```

**Funktionsweise im Detail:**
1. `(?<timestamp>...)` und `(?<level>...)` erfassen Zeitstempel und Log-Level direkt über sprechende Schlüsselnamen im `match.groups`-Objekt.
2. Der Negative Lookahead `(?!\/healthz\b)` prüft an genau dieser Position vorausschauend, ob der Pfad mit `/healthz` beginnt, ohne selbst Zeichen zu konsumieren. Die Wortgrenze `\b` stellt sicher, dass ein Pfad wie `/healthz-dashboard` nicht versehentlich verworfen wird, während `/healthz` sauber ausgeschlossen bleibt.
3. Spezifische Zeichenklassen wie `\S+` oder `\d+` ersetzen unspezifisches `.*`, sodass unnötiges Backtracking über Zeilengrenzen hinweg von vornherein verhindert wird.

In JavaScript lässt sich dieses Pattern direkt typsicher mit `String.prototype.matchAll()` auswerten, wodurch das fehleranfällige manuelle Zurücksetzen von `lastIndex` entfällt:

```javascript
const pattern = /^(?<timestamp>\d{4}-\d{2}-\d{2}T[\d:]+Z)\s+\[(?<level>[A-Z]+)\]\s+(?<method>GET|POST|PUT|DELETE)\s+(?!\/healthz\b)(?<path>\/\S+)\s+status=(?<status>\d{3})\s+latency=(?<latency>\d+)ms$/gm;

for (const match of logInput.matchAll(pattern)) {
  const { method, path, status, latency } = match.groups;
  console.log(`${method} ${path} -> ${status} (${latency}ms)`);
}
```

## Referenz-Tabelle: Wichtige ECMAScript-Konstrukte

| Konstrukt | Bezeichnung | Beispiel | Beschreibung |
| :--- | :--- | :--- | :--- |
| `(?<name>...)` | Named Capture Group | `(?<id>[a-f0-9]{8})` | Erfasst Teilmatch unter `groups.name` |
| `(?:...)` | Non-Capturing Group | `(?:http\|https)://` | Gruppiert ohne Treffer-Allokation |
| `(?=...)` | Positive Lookahead | `\d+(?= EUR)` | Prüft nachfolgendes Muster ohne Konsum |
| `(?!...)` | Negative Lookahead | `foo(?!bar)` | Schließt nachfolgendes Muster aus |
| `(?<=...)` | Positive Lookbehind | `(?<=#)[0-9a-f]{6}` | Prüft vorangehendes Muster (ab ES2018) |
| `\p{...}` | Unicode Property Escape | `[\p{L}\p{N}]+` | Matched Buchstaben/Ziffern mit `u`-Flag |
| `*?` / `+?` | Lazy Quantifier | `".*?"` | Minimales Matching bis zum nächsten Begrenzer |

## Sicherheitsrisiken in der Produktion: ReDoS und Performance-Grenzen

Die größte Gefahr beim Einsatz von NFA-Engines im Backend ist **Regular Expression Denial of Service (ReDoS)**. Wenn unvalidierte Nutzereingaben gegen ein Pattern mit mehrdeutigen Pfaden laufen, wächst die Rechenzeit exponentiell zur String-Länge `O(2^n)`. Ein klassisches Negativbeispiel ist `/^([a-zA-Z0-9]+)*$/` bei einer Eingabe wie `aaaaaaaaaaaaaaaaaaaa!`. Da das Ausrufezeichen am Ende scheitert, probiert die Engine sämtliche Aufteilungsmöglichkeiten der `a`-Zeichen durch, bevor sie `false` zurückgibt – in einem Single-Threaded-Runtime wie Node.js blockiert dies die gesamte Event-Loop und legt alle laufenden HTTP-Requests lahm.

Beachten Sie für produktive Systeme folgende Best Practices:
- **Keine verschachtelten Quantifizierer:** Vermeiden Sie Konstrukte wie `(a+)+`, `(a|aa)+` oder überlappende Alternativen innerhalb von Wiederholungen. Prüfen Sie komplexe Patterns zusätzlich mit statischen Analysetools wie `recheck` in Ihrer CI-Pipeline.
- **Spezifische Negation statt `.*`:** Nutzen Sie für abgegrenzte Werte präzise negierte Zeichenklassen wie `[^"]+` statt `.*?`. Dadurch kann der Automat bei einem fehlenden Endbegrenzer nicht über tausende Zeichen hinweg zurückspringen.
- **Eingabelängen begrenzen:** Prüfen Sie `input.length` vor jeder Regex-Auswertung, insbesondere bei HTTP-Headern, E-Mail-Feldern, URLs und Suchanfragen.
- **Lineare Engines für kritische Pfade:** Wenn Nutzer eigene Patterns definieren dürfen oder extrem große Datenmengen verarbeitet werden, setzen Sie auf DFA-basierte Bibliotheken wie Google RE2, die garantierte lineare Laufzeit `O(n)` bieten und gegen Backtracking-Angriffe immun sind.
- **Unicode-Flag konsequent setzen:** Ohne das `u`-Flag behandeln Zeichenklassen viele Emojis, mathematische Symbole und Sonderzeichen außerhalb der Basic Multilingual Plane als zwei getrennte UTF-16-Code-Units, was zu defekten Teil-Matches und fehlerhafter Validierung führt.
- **Kompilierte Patterns cachen:** Wenn reguläre Ausdrücke dynamisch über `new RegExp(...)` erzeugt werden, sollte die Instanziierung außerhalb heißer Schleifen erfolgen. Jede Neukompilierung verursacht spürbaren CPU-Overhead in der Engine. Bei häufig genutzten Validierungsregeln empfiehlt sich eine zentrale Konstante auf Modulebene, sodass die JIT-Optimierung von V8 das Bytecode-Matching optimal beschleunigen kann.
