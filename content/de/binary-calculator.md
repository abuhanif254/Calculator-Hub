---
title: "Binärrechner"
metaTitle: "Binärrechner: Dualsystem, Zweierkomplement & Bit-Logik"
description: "Rechnen Sie im Dualsystem mit Addition, Subtraktion, Multiplikation, Division, bitweisen Operatoren, Bitverschiebungen und Zweierkomplement-Darstellung."
metaDescription: "Binärrechner für Dualsystem-Arithmetik, Zweierkomplement, AND/OR/XOR-Logikgatter, Bit-Shifts sowie Umrechnung zwischen Binär, Dezimal und Hexadezimal."
metaKeywords: "Binärrechner, Dualsystem rechnen, Binär in Dezimal, Zweierkomplement berechnen, bitweise Operatoren, Bitverschiebung Rechner, Binär in Hexadezimal, Logikgatter"
faqs:
  - question: "Wie bilde ich das Zweierkomplement für eine negative Dezimalzahl in 8 Bit?"
    answer: "Schreiben Sie zunächst den positiven Betrag als 8-Bit-Binärzahl auf, invertieren Sie jedes einzelne Bit zum Einerkomplement (aus 0 wird 1 und umgekehrt) und addieren Sie anschließend 1. Für −27 startet man mit +27 = 00011011₂, invertiert zu 11100100₂ und erhält nach Addition von 1 exakt 11100101₂."
  - question: "Warum nutzen Entwickler Hexadezimal statt Dezimal als Kurzform für Binärzahlen?"
    answer: "Weil 16 exakt gleich 2 hoch 4 ist, entspricht jeder Block aus vier Bits (ein Nibble) eindeutig genau einer Hexadezimalziffer zwischen 0 und F. Speicheradressen, Farbcodes und Bitmasken lassen sich dadurch ohne Basis-10-Division direkt aus dem Bitmuster ablesen."
  - question: "Worin unterscheidet sich eine logische von einer arithmetischen Rechtsverschiebung?"
    answer: "Eine logische Rechtsverschiebung füllt frei werdende Stellen links stets mit Nullen auf und halbiert damit vorzeichenlose Ganzzahlen pro Schritt. Eine arithmetische Rechtsverschiebung kopiert hingegen das linke Vorzeichenbit, sodass negative Zahlen im Zweierkomplement ihr Minuszeichen behalten."
  - question: "Wann entsteht bei einer 8-Bit-Addition ein vorzeichenbehafteter Überlauf?"
    answer: "Ein vorzeichenbehafteter Überlauf tritt auf, sobald zwei Zahlen mit identischem Vorzeichen addiert werden und das Vorzeichenbit des Ergebnisses umschlägt. Addiert man in 8 Bit etwa +90 (01011010₂) und +50 (00110010₂), ergibt sich 10001100₂ – vorzeichenbehaftet interpretiert kippt das Ergebnis auf −116 statt +140."
  - question: "Warum lassen sich Dezimalbrüche wie 0,1 oder 0,2 im Dualsystem nicht endlich darstellen?"
    answer: "Im Binärsystem brechen nur Brüche ab, deren gekürzter Nenner eine reine Zweierpotenz ist – etwa 1/2, 1/4 oder 3/8. Da 1/10 den Primfaktor 5 enthält, entsteht die unendliche binäre Periode 0,0001100110011…₂, weshalb Buchhaltungs- und Kassensysteme Geldbeträge häufig als ganzzahlige Cent-Werte speichern."
---

## Das Dualsystem als Rechenbasis moderner Prozessoren und Netzwerke

Jeder Mikroprozessor, jede IPv4-Routingtabelle, jeder RGB-Farbkanal und jedes Steuerregister in eingebetteten Systemen verarbeitet Informationen als Abfolge zweier elektrischer Zustände: `0` (aus) und `1` (ein). Während unser Alltag das Dezimalsystem zur Basis `10` nutzt, rechnet digitale Hardware konsequent im **Dualsystem (Basis `2`)**. Wer Netzwerk-Subnetze plant, Hexadezimal-Auszüge prüft, Mikrocontroller programmiert oder Grundlagen der technischen Informatik vertieft, benötigt neben den vier Grundrechenarten ein sicheres Verständnis von Zweierkomplement, Registerbreiten und bitweiser Logik. Der **Binärrechner** vereint all diese Operationen mit direkter Umrechnung ins Dezimal-, Oktal- und Hexadezimalsystem.

## Stellenwerte, Zweierkomplement und Basiswechsel exakt verstehen

### Vorzeichenlose Ganzzahlen, Binärbrüche und Zeichencodes

In einer `n`-Bit-Binärzahl trägt jede Stelle von rechts (niedrigstwertiges Bit, `b_0`) nach links (höchstwertiges Bit, `b_(n−1)`) eine aufsteigende Zweierpotenz:

```
Vorzeichenloser Wert = b_(n−1)×2^(n−1) + ... + b_2×2^2 + b_1×2^1 + b_0×2^0
```

Nachkommastellen hinter dem Komma tragen entsprechend negative Zweierpotenzen (`2^(−1) = 0,5`, `2^(−2) = 0,25`, `2^(−3) = 0,125`). So entspricht die binäre Zahl `101,101₂` exakt `4 + 1 + 0,5 + 0,125 = 5,625₁₀`. Auch Textdaten werden bitweise abgebildet: Im ASCII-Standard entspricht der Großbuchstabe `A` der Dezimalzahl `65`, gespeichert als 8-Bit-Byte `01000001₂` (`0x41`).

### Negative Zahlen im Zweierkomplement

Damit Rechenwerke keine getrennte Subtraktionsschaltung benötigen, codieren moderne Prozessoren negative Ganzzahlen im **Zweierkomplement**. Dabei erhält ausschließlich das ganz linke Bit ein negatives Gewicht (`−2^(n−1)`), während alle übrigen Stellen positiv bleiben:

```
Zweierkomplement-Wert = −b_(n−1)×2^(n−1) + b_(n−2)×2^(n−2) + ... + b_1×2^1 + b_0×2^0
```

Diese Codierung garantiert zwei entscheidende Eigenschaften: Die Null existiert nur eindeutig (`00000000₂`), und jede Subtraktion `A − B` lässt sich direkt als Addition `A + (−B)` ausführen. Für die schnelle Konvertierung in **Hexadezimal** (Basis `16`) gruppiert man Bits in Viererblöcke (Nibbles: `1101 0111₂ = 0xD7`); für das **Oktalsystem** (Basis `8`) in Dreierblöcke – etwa bei Unix-Dateirechten (`111 101 101₂ = 755₈`).

## Registerbreiten im Vergleich: Wertebereiche von 4 bis 64 Bit

Die gewählte Bitbreite legt den exakten Zahlenraum und das Überlaufverhalten im Speicher fest:

| Registerbreite | Hex-Ziffern | Vorzeichenlos (`0` bis `2ⁿ − 1`) | Zweierkomplement (`−2^(n−1)` bis `2^(n−1) − 1`) | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- |
| `4 Bit` (Nibble) | `1` | `0` bis `15` | `−8` bis `+7` | Einzelne Hex-Ziffer, BCD-Codierung |
| `8 Bit` (Byte) | `2` | `0` bis `255` | `−128` bis `+127` | ASCII-Zeichen, RGB-Farbkanal, IPv4-Oktett |
| `16 Bit` (Wort) | `4` | `0` bis `65.535` | `−32.768` bis `+32.767` | TCP-/UDP-Ports, 16-Bit-Audio-Samples |
| `32 Bit` (Doppelwort) | `8` | `0` bis `4.294.967.295` | `−2.147.483.648` bis `+2.147.483.647` | IPv4-Adressen, klassischer Unix-Zeitstempel |
| `64 Bit` (Quadwort) | `16` | `0` bis `18.446.744.073.709.551.615` | `−9.223.372.036.854.775.808` bis `+9.223.372.036.854.775.807` | Moderne CPU-Register, 64-Bit-Speicherzeiger |

## Zwei Praxisbeispiele: 8-Bit-Subtraktion und IPv4-Subnetzmaske

### Beispiel 1: Subtraktion `73 − 27` im 8-Bit-Zweierkomplement

Statt spaltenweise zu borgen, addiert ein 8-Bit-Rechenwerk `+73` und das Zweierkomplement von `27`:

1. **`+73` binär darstellen**: `64 + 8 + 1 = 01001001₂` (`0x49`).
2. **`+27` binär darstellen**: `16 + 8 + 2 + 1 = 00011011₂` (`0x1B`).
3. **Zweierkomplement (`−27`) bilden**: Erst alle Bits invertieren → `11100100₂`, dann `1` addieren → `11100101₂` (`0xE5`; Gegenprobe: `−128 + 64 + 32 + 4 + 1 = −27`).
4. **Binär addieren**:
   ```
     01001001₂  (+73)
   + 11100101₂  (−27)
   -----------
   1 00101110₂  → Übertrag links verwerfen → 00101110₂
   ```
5. **Ergebnis prüfen**: `00101110₂ = 32 + 8 + 4 + 2 = 46₁₀` (`0x2E`), exakt gleich `73 − 27`.

### Beispiel 2: Netzadresse per bitweisem `AND` bestimmen

Ein Rechner besitzt die IPv4-Adresse `192.168.10.213` in einem `/26`-Subnetz (Maske `255.255.255.192`). Da die ersten drei Oktette durch `255` (`11111111₂`) unverändert bleiben, genügt die bitweise UND-Verknüpfung des vierten Oktetts:

- Host-Oktett `213`: `128 + 64 + 16 + 4 + 1 = 11010101₂`
- Masken-Oktett `192`: `128 + 64 = 11000000₂`
- `11010101₂ AND 11000000₂ = 11000000₂ = 192₁₀`

Die Netzadresse lautet somit `192.168.10.192`. Der nutzbare Host-Bereich umfasst `.193` bis `.254` (`62` Endgeräte), während `.255` als Broadcast-Adresse reserviert ist.

## Bitweise Operatoren, Verschiebungen und typische Entwicklungsfehler

### Die fünf wichtigsten Bit-Operationen im Überblick

- **`AND` (`&`)**: Liefert nur `1`, wenn beide Eingangsbits `1` sind – ideal zum Ausmaskieren einzelner Bits und Prüfen von Status-Flags.
- **`OR` (`|`)**: Liefert `1`, sobald mindestens ein Bit `1` ist – Standard zum gezielten Aktivieren einzelner Steuerbits.
- **`XOR` (`^`)**: Liefert `1` bei ungleichen Bits – unverzichtbar zum Umschalten von Zuständen, für Paritätsprüfungen und Stromchiffren.
- **`NOT` (`~`)**: Kippt jedes Bit ins Gegenteil (Einerkomplement).
- **Bitverschiebungen (`<<`, `>>`)**: Eine Linksverschiebung um `k` Stellen multipliziert mit `2^k` (solange keine gesetzten Bits herausgeschoben werden); eine Rechtsverschiebung entspricht der ganzzahligen Division durch `2^k`. Auch die binäre Multiplikation basiert intern auf wiederholtem Verschieben und Addieren der Teilprodukte.

### Vier klassische Fallstricke in Code und Hardware

1. **Stiller Überlauf bei fester Bitbreite**: In einem vorzeichenlosen 8-Bit-Zähler springt `255 + 1` lautlos auf `0` zurück; im vorzeichenbehafteten `int8` kippt `+90 + +50` auf `−116`.
2. **Verwechslung von `&` und `&&`**: In C, C++, Java und JavaScript prüft `&&` logische Wahrheitswerte mit Kurzschlussauswertung, während `&` jedes Bit paarweise verknüpft – eine häufige Quelle subtiler Verzweigungsfehler.
3. **Unbeabsichtigte Vorzeichenerweiterung**: Wandelt man ein negatives `int8` (`11111111₂ = −1`) in `int16` um, füllt der Prozessor links mit Einsen auf (`11111111 11111111₂`). Bei Rohbytes aus Netzwerk- oder Dateiströmen sollten Sie daher explizit `uint8` verwenden.
4. **Byte-Reihenfolge (Endianness)**: x86- und gängige ARM-Prozessoren speichern Mehrbyte-Werte im Arbeitsspeicher als Little-Endian (niederwertigstes Byte zuerst), während Netzwerkprotokolle wie TCP/IP konsequent Big-Endian als Netzwerk-Bytereihenfolge vorschreiben. Wer binäre Datenpakete ohne gezielte Byte-Umwandlung übernimmt, liest Portnummern und Längenangaben sofort spiegelverkehrt aus.
