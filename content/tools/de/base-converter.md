---
metaTitle: "Zahlensystem-Umrechner: Binär, Oktal, Dezimal & Hex-Tool"
metaDescription: "Konvertieren Sie Zahlen präzise zwischen Binär, Oktal, Dezimal, Hexadezimal und Base 36. Mit 64-Bit-BigInt-Präzision für Bitmasken und Speicheradressen."
metaKeywords: "zahlensystem umrechner, binär dezimal hexadezimal, basis konverter, javascript bigint präzision, bitmasken berechnen, hex farbcodes, zweierkomplement, radix konverter"
title: "Zahlensystem-Umrechner (Binär, Oktal, Dezimal, Hex & Base36)"
shortDescription: "Rechnen Sie beliebig große Ganzzahlen verlustfrei zwischen den Basen 2, 8, 10, 16 und 36 um – exakt mit JavaScript BigInt direkt im Browser."
faqs:
  - question: "Warum verlieren herkömmliche Browser-Rechner ab der Zahl 2^53 - 1 an Genauigkeit?"
    answer: "Standard-JavaScript-Zahlen basieren auf IEEE-754-Gleitkommazahlen mit doppelter Genauigkeit (64-Bit-Float). Davon stehen nur 53 Bit für die Mantisse zur Verfügung, weshalb Number.MAX_SAFE_INTEGER bei 9.007.199.254.740.991 liegt. Jede größere Ganzzahl wird gerundet. Unser Konverter nutzt konsequent den BigInt-Datentyp, sodass auch 64-Bit-, 128-Bit- oder 256-Bit-Werte exakt bleiben."
  - question: "Wofür wird das Zahlensystem zur Basis 36 (Base 36) in der Softwareentwicklung verwendet?"
    answer: "Base 36 kombiniert die zehn Ziffern 0-9 mit den 26 Buchstaben A-Z. Dadurch lassen sich lange numerische IDs, Zeitstempel oder Hash-Werte äußerst kompakt in URL-sichere Zeichenketten kodieren, ohne Sonderzeichen wie Plus oder Schrägstrich wie bei Base64 zu benötigen."
  - question: "Wie hängen Hexadezimalzahlen mit Bytes und Bitmasken zusammen?"
    answer: "Eine einzelne Hexadezimalziffer (0 bis F) repräsentiert exakt vier Binärstellen, also ein sogenanntes Nibble. Zwei Hex-Ziffern ergeben somit immer genau ein Byte (8 Bit). Entwickler können lange Bitfolgen dadurch übersichtlich ablesen, ohne binäre Einsen und Nullen abzählen zu müssen."
  - question: "Werden bei der Eingabe Präfixe wie 0x, 0b oder 0o unterstützt?"
    answer: "Ja. Das Werkzeug erkennt gängige Literalschreibweisen aus C, Python, Rust und JavaScript automatisch. Sie können beispielsweise 0xFF, 0b10101100 oder 0o755 direkt einfügen, ohne Präfixe manuell entfernen zu müssen."
  - question: "Verlässt eine meiner Zahlen oder Speicheradressen meinen Rechner?"
    answer: "Nein. Alle Parser-Routinen und Radix-Umwandlungen laufen vollständig lokal im Arbeitsspeicher Ihres Browsers. Es erfolgen weder Serveranfragen noch Datenbankprotokollierungen, was volle Datensicherheit für interne Schlüssel, IDs oder Debugging-Dumps gewährleistet."
features:
  - "Verlustfreie Konvertierung beliebig großer Integer durch native BigInt-Arithmetik"
  - "Simultane Echtzeit-Ausgabe für Binär (Base 2), Oktal (Base 8), Dezimal (Base 10), Hex (Base 16) und Base 36"
  - "Automatische Erkennung und Bereinigung von Präfixen (0x, 0b, 0o) sowie Trennzeichen"
  - "Gruppierte Bit- und Byte-Darstellung zur schnellen Prüfung von Flags und Registern"
  - "100 % clientseitige Ausführung im Browser ohne Netzwerk-Latenz oder Telemetrie"
useCases:
  - "Analyse von Hardware-Registern, Bitmasken und Netzwerk-Flags im Embedded- und Kernel-Debugging"
  - "Exakte Umrechnung von 64-Bit-Snowflake-IDs, UUID-Segmenten und Speicheradressen"
  - "Umwandlung von RGB- und RGBA-Hexadezimal-Farbwerten in dezimale Kanalwerte"
  - "Kompakte Darstellung langer Datenbank-Primärschlüssel im Base-36-Format für Short-URLs"
  - "Prüfung von Unix-Oktalwerten und ASCII-/UTF-8-Codepoints während der Entwicklung"
howToSteps:
  - "Wählen Sie das Ausgangssystem (Binär, Oktal, Dezimal, Hexadezimal oder Base 36) oder geben Sie direkt in das entsprechende Feld ein."
  - "Fügen Sie Ihre Zahl ein – optionale Präfixe wie 0x oder 0b sowie Unterstriche zur Gruppierung werden sauber verarbeitet."
  - "Lesen Sie alle umgerechneten Zielbasen inklusive Bitlänge unmittelbar aus der synchronisierten Ergebnisansicht ab."
  - "Kopieren Sie den benötigten Zielwert per Klick direkt in Ihren Quellcode, Debugger oder Ihr Terminal."
---
Der Zahlensystem-Umrechner konvertiert Ganzzahlen verzögerungsfrei zwischen den Positionssystemen Binär (Basis 2), Oktal (Basis 8), Dezimal (Basis 10), Hexadezimal (Basis 16) sowie Base 36. Im Gegensatz zu einfachen Taschenrechnern verarbeitet dieses Werkzeug beliebig große Werte ohne Rundungsfehler, sodass sich 64-Bit-Integer, kryptografische Nonces, Speicheradressen und verschachtelte Bitmasken jederzeit präzise prüfen lassen.

Alle Berechnungsschritte laufen zu 100 % lokal in Ihrer Browser-Engine ab. Sensible Werte wie interne Datenbank-IDs, Hardware-Seriennummern oder Debugging-Register verlassen zu keinem Zeitpunkt Ihr Endgerät, sodass keinerlei Server-Upload und keine Protokollierung stattfinden.

## Technische Architektur: Positionssysteme und BigInt-Präzision jenseits von 2^53 - 1

Jedes Stellenwertsystem zur Basis `b` stellt eine ganze Zahl als Polynom aus Ziffern `d_i` und Potenzen der jeweiligen Basis dar. Während das Dezimalsystem mit zehn Symbolen (`0–9`) arbeitet, verwendet das Binärsystem ausschließlich `0` und `1`, das Oktalsystem `0–7` und das Hexadezimalsystem `0–9` ergänzt um `A–F` für die Werte `10` bis `15`. Base 36 erweitert diesen Vorrat um das gesamte lateinische Alphabet `A–Z`.

Eine zentrale Fehlerquelle vieler webbasierter Konverter liegt in der Standard-Zahlenrepräsentation von ECMAScript gemäß IEEE 754 (Double-Precision Floating-Point). Ein regulärer JavaScript-`Number`-Wert nutzt 64 Bit, reserviert jedoch 11 Bit für den Exponenten und 1 Bit für das Vorzeichen. Für die exakte Abbildung ganzer Zahlen bleiben lediglich 53 Bit Signifikand übrig. Ab `Number.MAX_SAFE_INTEGER` (`9007199254740991`, hexadezimal `0x1FFFFFFFFFFFFF`) treten stille Präzisionsverluste auf: So liefert `9007199254740992 + 1` im regulären Float-Modus fehlerhaft erneut `9007199254740992`.

Unser Konverter umgeht diese Begrenzung konsequent mithilfe von ECMAScript `BigInt` (ES2020) und einem iterativen Horner-Schema für beliebige Basen zwischen `2` und `36`:

- **Parsing**: Jeder Eingabestring wird zeichenweise validiert, in den numerischen Stellenwert `0..35` abgebildet und mittels `acc = acc * BigInt(base) + BigInt(digit)` exakt aufgebaut.
- **Serialisierung**: Für die Zielbasis `targetBase` erfolgt eine fortlaufende Ganzzahldivision mit Rest (`acc % BigInt(targetBase)`), wodurch selbst 256-Bit-Werte oder 128-Bit-UUID-Fragmente bitgenau transformiert werden.
- **Bitgruppen-Ausrichtung**: Für die binäre und hexadezimale Anzeige gruppiert die Engine Ausgaben automatisch auf Byte- beziehungsweise Nibble-Grenzen (4 Bit oder 8 Bit), sodass führende Nullen bei Registeranalysen sichtbar bleiben und Maskierungsfehler sofort auffallen.

Da `BigInt` im Gegensatz zu regulären Gleitkommazahlen beliebig wachsenden Speicher für die Ziffernfolge allokiert, lassen sich selbst kryptografische Diffie-Hellman-Parameter, Ethereum-256-Bit-Werte oder IPv6-Adressen als vollständige 128-Bit-Ganzzahl verarbeiten. Alle bitweisen Operationen (`&`, `|`, `^`, `<<`, `>>`) arbeiten dabei präzise auf den exakten Zweierpotenzen ohne Überlauf in den Vorzeichen-Bitbereich, wie er bei 32-Bit-Bitwise-Operatoren (`x | 0`) in Standard-JavaScript sonst unvermeidlich auftritt.

## Schritt-für-Schritt-Praxisbeispiel: Bitmasken, 64-Bit-IDs und Hex-Farbwerte

In der Systemprogrammierung und Backend-Entwicklung treten regelmäßig Szenarien auf, bei denen unterschiedliche Zahlensysteme ineinandergreifen. Das folgende JavaScript-Beispiel demonstriert anhand einer 64-Bit-Snowflake-ID sowie einer TCP-Flag-Bitmaske, warum BigInt-Präzision unverzichtbar ist:

```javascript
// 64-Bit Twitter/Discord Snowflake ID (überschreitet 2^53 - 1 deutlich)
const snowflakeId = 1794823194827194369n;

// Umwandlung in Hexadezimal und Base 36 ohne Präzisionsverlust
const hexId = snowflakeId.toString(16).toUpperCase(); // "18E86A7F4A180001"
const compactId = snowflakeId.toString(36);           // "k9m3x8r2p1x1"

// Vergleich mit unsicherem IEEE-754 Number (Rundungsfehler!)
const unsafeNumber = Number("1794823194827194369");   // 1794823194827194400
```

Ebenso hilfreich ist die direkte Übersetzung bei Bitmasken und Farbdefinitionen. Angenommen, Sie inspizieren ein Statusregister eines Embedded-Sensors, das den Hex-Wert `0xA5` liefert. Im Binärsystem entspricht `0xA` dem Nibble `1010` und `0x5` dem Nibble `0101`, zusammen also `10100101`. Daraus lässt sich unmittelbar ablesen, dass die Bits `7`, `5`, `2` und `0` gesetzt sind.

Bei CSS- und Grafik-Pipelines repräsentiert eine 24-Bit-Farbe wie `#1E90FF` exakt drei Bytes für Rot, Grün und Blau:
1. `0x1E` ergibt dezimal `30` (Rot-Kanal).
2. `0x90` ergibt dezimal `144` (Grün-Kanal).
3. `0xFF` ergibt dezimal `255` (Blau-Kanal).

Damit erhalten Sie ohne manuelle Multiplikation direkt das äquivalente `rgb(30, 144, 255)`-Tupel für Canvas- oder Shader-Berechnungen.

## Referenz- und Vergleichstabelle der Zahlensysteme

Die nachfolgende Tabelle fasst Aufbau, Zeichenvorrat, Bits pro Ziffer sowie typische Einsatzgebiete der unterstützten Basen zusammen:

| Basis | Bezeichnung | Ziffernvorrat | Bits pro Ziffer | Typisches Präfix | Hauptanwendung in der Praxis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `2` | Binär (Dual) | `0`, `1` | `1 Bit` | `0b` | Logikgatter, CPU-Register, Bitflags |
| `8` | Oktal | `0`–`7` | `3 Bit` | `0o` oder `0` | Unix-Dateirechte (`chmod`), Legacy-Dumps |
| `10` | Dezimal | `0`–`9` | `~3,32 Bit` | keines | Menschliche Lesbarkeit, Metriken, Ports |
| `16` | Hexadezimal | `0`–`9`, `A`–`F` | `4 Bit` (1 Nibble) | `0x`, `#` | Speicheradressen, MAC/IPv6, RGB-Farben |
| `32` | Base32 (RFC 4648) | `A`–`Z`, `2`–`7` | `5 Bit` | keines | TOTP-Secrets, case-insensitive IDs |
| `36` | Base36 (Alphanumerisch) | `0`–`9`, `A`–`Z` | `~5,17 Bit` | keines | Kompakte URL-Slugs, Short-IDs |

## Typische Produktionsfehler, Endianness und Sicherheitsaspekte

Bei der Arbeit mit binären und hexadezimalen Darstellungen entstehen in der Praxis häufig Missverständnisse durch fehlende Kontextinformationen zu **Vorzeichenbehaftung** und **Byte-Reihenfolge (Endianness)**. So steht `0xFF` als vorzeichenloser 8-Bit-Wert (`uint8`) für `255`, interpretiert als vorzeichenbehaftetes Zweierkomplement (`int8`) jedoch für `-1`. Ein Zahlensystem-Konverter bildet stets die reine mathematische Betragsdarstellung ab; prüfen Sie daher bei Register-Dumps vorab, ob Ihre Zielarchitektur vorzeichenbehaftete Typen verwendet.

Ein zweiter Stolperstein betrifft **Big-Endian vs. Little-Endian**: Auf x86-64-Systemen liegt ein 32-Bit-Integer `0x12345678` im Arbeitsspeicher in umgekehrter Byte-Folge als `78 56 34 12`. Wer rohe Hex-Dumps aus Netzwerk-Sniffern oder Speicherauszügen kopiert, sollte vor der Umrechnung sicherstellen, ob die Bytes bereits in Host-Byte-Order vorliegen.

Schließlich lohnt ein Blick auf führende Nullen in älteren Programmiersprachen und Konfigurationsformaten (wie C, älterem JavaScript außerhalb von Strict Mode oder YAML 1.1): Eine vermeintliche Dezimalzahl wie `0755` wird durch die führende Null dort stillschweigend als Oktalzahl (`493` dezimal) geparst, während `0789` zu einem Syntaxfehler führt, da `8` und `9` im Oktalsystem nicht existieren. Entfernen Sie bei automatisierten Pipelines stets ungewollte führende Nullen oder setzen Sie explizit moderne Präfixe wie `0o` und `0x` ein.

Beachten Sie zudem bei der Serialisierung großer Hexadezimal- und Base-36-Schlüssel für JSON-APIs, dass Standard-JSON-Parser keinen nativen `BigInt`-Typ kennen. Übergeben Sie Werte oberhalb von `2^53 - 1` über API-Grenzen hinweg stets als String im Hex-, Dezimal- oder Base-36-Format, damit nachgelagerte Frontend-Clients beim Aufruf von `JSON.parse()` keine stillen Rundungsfehler erleiden.
