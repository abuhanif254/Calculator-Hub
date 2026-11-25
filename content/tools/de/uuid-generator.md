---
metaTitle: "UUID Generator Online | UUID v4, v7 & GUIDs (RFC 9562)"
metaDescription: "Generieren Sie bis zu 10.000 RFC-9562-UUIDs (v1, v4, v6, v7) lokal via Web Crypto API – mit Validator, Formatoptionen sowie JSON-, CSV- und TXT-Export."
metaKeywords: "uuid generator, guid generator, uuid v4 erstellen, uuid v7, rfc 9562, bulk uuid, datenbank primärschlüssel, uuid validator, eindeutiger bezeichner"
title: "UUID Generator"
shortDescription: "Erzeugen Sie kryptografisch sichere RFC-9562-UUIDs (v1, v4, v6 und zeitlich sortierte v7) einzeln oder im Stapel bis 10.000 Stück direkt im Browser – inklusive Validator, Formatierung und Entwickler-Snippets."
faqs:
  - question: "Warum schlägt UUID v7 bei PostgreSQL- und MySQL-Primärschlüsseln die klassische UUID v4?"
    answer: "UUID v4 besteht aus reinen Zufallsbits, sodass neue Datensätze verstreut auf beliebigen Blattseiten eines B-Tree-Index landen und laufend Page-Splits sowie Buffer-Pool-Fehltreffer auslösen. UUID v7 platziert dagegen einen 48-Bit-Unix-Zeitstempel in den höchstwertigen Bits, wodurch neue Einträge chronologisch am rechten Rand des Index angefügt werden."
  - question: "Was hat sich mit dem Standard RFC 9562 gegenüber dem älteren RFC 4122 geändert?"
    answer: "Der im Mai 2024 von der IETF veröffentlichte RFC 9562 löst RFC 4122 offiziell ab, standardisiert die zeitlich sortierten Versionen v6 und v7 sowie das benutzerdefinierte Format v8, rät bei datenschutzsensiblen Systemen von MAC-basierten v1-IDs ab und definiert verbindliche Monotonieverfahren für hochfrequente v7-Generierung innerhalb derselben Millisekunde."
  - question: "Wie sollten UUIDs in SQL-Datenbanken gespeichert werden, um Speicherplatz und RAM zu sparen?"
    answer: "Vermeiden Sie die Speicherung als 36-stellige ASCII-Zeichenkette in VARCHAR(36)- oder CHAR(36)-Spalten, da dies den Speicherbedarf mehr als verdoppelt und sämtliche Sekundärindizes aufbläht. Nutzen Sie stattdessen native 16-Byte-Spaltentypen wie UUID in PostgreSQL, UNIQUEIDENTIFIER in SQL Server oder BINARY(16) mit UUID_TO_BIN() in MySQL 8."
  - question: "Akzeptiert der integrierte UUID-Validator auch Großbuchstaben, geschweifte Klammern oder GUIDs ohne Bindestriche?"
    answer: "Ja. Vor der Prüfung von Struktur, Versions-Nibble und Varianten-Bits entfernt der Validator automatisch optionale geschweifte Klammern ({...}) sowie umschließende Anführungszeichen und normalisiert kompakte 32-stellige Hex-Strings selbstständig in das kanonische 8-4-4-4-12-Schema."
  - question: "Wie hoch ist das Kollisionsrisiko von UUID v4 und v7 in verteilten Systemen – und bleiben meine IDs privat?"
    answer: "UUID v4 bietet 122 Zufallsbits (rund 5,32 × 10^36 Zustände); selbst bei einer Billion erzeugter IDs liegt die Kollisionswahrscheinlichkeit unter 10^-13. UUID v7 ergänzt den Millisekunden-Zeitstempel um 74 Zufalls- bzw. Zählerbits pro Millisekunde. Sämtliche UUIDs entstehen zu 100 % lokal über die Web Crypto API Ihres Browsers ohne Serverübertragung."
features:
  - "Vollständige RFC-9562-Generierung für vier Versionen: v1 (Gregorianisch/MAC), v4 (CSPRNG-Zufall), v6 (zeitlich umsortiert) und v7 (Unix-Epoch-sortiert)"
  - "Clientseitige Massengenerierung über die Web Crypto API für bis zu 10.000 formatierte UUIDs in einem Durchgang"
  - "Granulare Formatierungsoptionen für Großbuchstaben, kompakte 32-Zeichen-Notation ohne Bindestriche, Microsoft-{Klammern} und Anführungszeichen"
  - "Eigener Validator-Tab mit automatischer Normalisierung geklammerter oder bindestrichloser Strings sowie strikter RFC-Konformitätsprüfung"
  - "Kopierfertige Entwickler-Snippets für JavaScript/TypeScript, Node.js, Python, Java, C#/.NET und PostgreSQL"
  - "Ein-Klick-Kopie, Dateiexport als TXT, JSON-Array oder CSV sowie lokaler Sitzungsverlauf für die letzten 10 Stapel"
useCases:
  - "Entwurf leistungsstarker PostgreSQL-, MySQL- und CockroachDB-Schemas mit B-Tree-freundlichen UUID-v7-Primärschlüsseln"
  - "Erzeugung unvorhersehbarer UUID-v4-Ressourcenkennungen für REST- und GraphQL-APIs zur Abwehr von IDOR-Enumeration"
  - "Befüllung von Staging-Datenbanken, Integrationstests und Lasttest-Fixtures mit bis zu 10.000 Bulk-UUIDs"
  - "Erstellung formatierter Microsoft-.NET-, COM- und SQL-Server-GUID-Literale in Großbuchstaben mit geschweiften Klammern"
  - "Vergabe verteilter Trace- und Korrelations-IDs über Microservices, Message-Queues und Offline-First-Clients hinweg"
  - "Validierung eingehender Webhook-IDs, Drittanbieter-Schlüssel und Legacy-Migrationen auf strikte RFC-9562-Konformität"
howToSteps:
  - "Wählen Sie im Generator-Tab die gewünschte Spezifikation: v4 für reine Unvorhersehbarkeit, v7 für chronologische Datenbank-Indizes oder v1/v6 für klassische Zeitstempel-Pipelines."
  - "Erstellen Sie eine einzelne Kennung oder wählen Sie über Presets bzw. Zahlenfeld eine Stapelgröße von bis zu 10.000 UUIDs."
  - "Aktivieren Sie nach Bedarf Formatierungsoptionen wie Großbuchstaben, Bindestriche entfernen, geschweifte Klammern oder Anführungszeichen passend zu Ihrer Zielsyntax."
  - "Klicken Sie auf 'Generieren', um frische IDs lokal zu erzeugen, und kopieren Sie einzelne Zeilen oder laden Sie den gesamten Stapel als TXT, CSV oder JSON herunter."
  - "Prüfen Sie externe Zeichenfolgen im Tab 'Validator' auf RFC-Gültigkeit oder kopieren Sie fertigen Bibliotheks-Code aus dem Tab 'Entwickler-Snippets'."
---

Verteilte Architekturen stoßen bei zentral hochgezählten Datenbank-Sequenzen rasch an Skalierungsgrenzen, während öffentlich sichtbare Ganzzahl-IDs (`/bestellungen/4019`) das Geschäftsvolumen preisgeben und **Insecure Direct Object Reference (IDOR)**-Angriffe erleichtern. **Universally Unique Identifiers (UUIDs)** – im Microsoft-`.NET`- und Windows-Umfeld traditionell **GUIDs** genannt – lösen beide Probleme über eine global eindeutige 128-Bit-Struktur nach **IETF RFC 9562** (veröffentlicht im Mai 2024 als Nachfolger von RFC 4122). Dieser Arbeitsbereich erzeugt, formatiert und validiert `v1`-, `v4`-, `v6`- und `v7`-UUIDs vollständig lokal im Browser über die kryptografisch sichere Web Crypto API, ohne Produktionskennungen über das Netzwerk zu senden.

## Kanonischer 128-Bit-Aufbau und Versionscodierung

In ihrer kanonischen Textdarstellung besteht jede UUID aus 32 Hexadezimalziffern, gegliedert in fünf durch Bindestriche getrennte Gruppen (`8-4-4-4-12`, insgesamt 36 ASCII-Zeichen):

```text
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
              ^    ^
              |    └── Varianten-Nibble: 8, 9, a oder b (binär 10xx = RFC 9562)
              └─────── Versions-Nibble: 1, 4, 6 oder 7
```

Genau sechs Bits sind in allen Standardversionen als Strukturmetadaten reserviert: das 4-Bit-Feld `ver` im oberen Nibble von Oktett 6 sowie das 2-Bit-Feld `var` (`10` binär) in den obersten Bits von Oktett 8. Die verbleibenden **122 Nutzbits** werden je nach Version grundlegend anders auf Zeitstempel, Knotendaten und Zufallsentropie verteilt:

| UUID-Version | Zeitdarstellung | Zufalls- / Node-Bits | Lexikografisch sortierbar | Datenschutz / MAC-Risiko | Typisches Einsatzgebiet |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **UUID v1** | 60-Bit 100-ns-Ticks seit `1582-10-15` (Low-Bits zuerst) | 14-Bit `clock_seq` + 48-Bit MAC/Node | Nein (Zeitfelder geteilt) | Hoch bei echter MAC-Adresse | Legacy-Systeme, Altbestand-Kompatibilität |
| **UUID v4** | Keine | 122 CSPRNG-Zufallsbits | Nein (gleichverteilt) | Keines | Öffentliche API-URLs, Tokens, Korrelations-IDs |
| **UUID v6** | 60-Bit Gregorianische 100-ns-Ticks (Big-Endian sortiert) | 14-Bit `clock_seq` + 48-Bit Node | Ja | Mittel (Zufalls-Node wählen) | Sortierbarer Migrationspfad von UUID v1 |
| **UUID v7** | 48-Bit Big-Endian Unix-Epoch-Millisekunden (`1970-01-01`) | 12-Bit `rand_a` (oder Zähler) + 62-Bit `rand_b` | Ja (nativ chronologisch) | Gering (nur Zeitstempel) | Moderne SQL-/NoSQL-Primärschlüssel, Event-Logs |

## Warum UUID v7 die B-Tree-Fragmentierung in Datenbanken löst

In relationalen Speicher-Engines wie PostgreSQL-B-Tree-Indizes oder MySQL-InnoDB-Clustered-Indizes bestimmt die Schlüsselreihenfolge unmittelbar die physische Festplatten- und RAM-Last. Werden Millionen zufälliger **UUID-v4**-Primärschlüssel eingefügt, treffen neue Zeilen statistisch auf völlig zufällige Blattseiten im gesamten Indexbaum:

1. **Page-Splits und Write Amplification**: Halbvolle Indexseiten teilen sich fortlaufend neu auf, blähen den Index um 30 bis 50 % auf und vervielfachen bei PostgreSQL die Full-Page-Image-Einträge im Write-Ahead Log (WAL).
2. **Buffer-Pool-Thrashing**: Da Schreibzugriffe nicht auf der letzten Indexseite gebündelt bleiben, sondern über Gigabyte kalter Daten verstreut einschlagen, bricht die Cache-Trefferrate massiv ein, sobald der Index nicht mehr vollständig in den Arbeitsspeicher passt.

**UUID v7** behebt diesen Engpass systematisch. Die ersten 48 Bits codieren Unix-Millisekunden in Big-Endian-Bytefolge (ausreichend bis zum Jahr 10889), gefolgt von 74 Zufalls- oder Monotoniezähler-Bits. Neue Einträge landen sauber am rechten Ende des B-Tree und erreichen eine Einfügegeschwindigkeit nahe klassischer 64-Bit-`BIGINT`-Sequenzen – ganz ohne zentrale Koordination über verteilte Rechenzentren hinweg. Ein wichtiger Sicherheitsaspekt bleibt dennoch zu beachten: Da v7 den Erstellungszeitpunkt millisekundengenau offenlegt, sollten für sicherheitskritische Freigabelinks, Einmal-Tokens oder vertrauliche API-Endpunkte weiterhin **UUID v4** eingesetzt werden.

## Kollisionsmathematik und Geburtstagsparadoxon

Die Wahrscheinlichkeit einer zufälligen Doppelvergabe bei gleichverteilten Bezeichnern mit `k` Zufallsbits folgt dem Geburtstagsparadoxon:

```text
P(Kollision) ≈ 1 - exp( -n² / (2 · 2^k) )
```

Für **UUID v4** (`k = 122`, also `2¹²² ≈ 5,32 × 10³⁶` mögliche Zustände) ergibt sich selbst bei `n = 10¹²` (einer Billion) erzeugter Datensätze ein Kollisionsrisiko von unter `10⁻¹³`. Erst bei rund `2,71 × 10¹⁸` generierten Kennungen steigt die Wahrscheinlichkeit auf 50 % – das entspräche einer Milliarde neuer UUIDs pro Sekunde über mehr als 85 Jahre hinweg. Bei **UUID v7** stehen innerhalb jeder einzelnen Millisekunde `74` Zufallsbits (`1,89 × 10²²` Zustände) bereit. Für extreme Schreibspitzen innerhalb derselben Millisekunde erlaubt RFC 9562 Abschnitt 6.2 zudem die Nutzung des 12-Bit-Felds `rand_a` als strikt monoton steigenden Zähler.

## Datenbank-Speicherung, Endianness-Fallen und Validierung

Speichern Sie UUIDs in Produktivtabellen niemals als `VARCHAR(36)`. Eine kompakte binäre Ablage in 16 Byte halbiert den Speicherbedarf und beschleunigt Indexvergleiche deutlich:

```sql
-- PostgreSQL: nativer 16-Byte-Typ (v4 integriert; v7 nativ ab PG 18 oder per Extension)
CREATE TABLE ereignisse (
  id UUID PRIMARY KEY,
  nutzdaten JSONB NOT NULL
);

-- MySQL 8: kompakte 16-Byte-Ablage (swap_flag = 0 bei UUID v7 zwingend beibehalten)
CREATE TABLE ereignisse (
  id BINARY(16) PRIMARY KEY,
  erstellt_am TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO ereignisse (id)
VALUES (UUID_TO_BIN('019345a2-8c1d-7f2e-9a41-3b7e2f8c1d09', 0));
```

In plattformübergreifenden Systemen lauern zwei häufig übersehene Stolperfallen:

- **MySQL-`UUID_TO_BIN(uuid, 1)`-Falle**: Das zweite Argument `1` vertauscht Zeit-Oktette speziell für **UUID v1**. Übergeben Sie bei **UUID v7** niemals `1`, da dessen bereits Big-Endian-sortiertes Zeitstempel-Präfix sonst zerrissen wird.
- **Microsoft-`.NET`-Bytefolge (Mixed-Endian)**: `Guid.ToByteArray()` in C# codiert die ersten drei Gruppen (`Data1`, `Data2`, `Data3`) in **Little-Endian**, die letzten beiden jedoch in Big-Endian. Nutzen Sie beim binären Austausch mit PostgreSQL, Go oder Rust ab .NET 8 explizit `Guid.ToByteArray(bigEndian: true)` oder serialisieren Sie über kanonische Textstrings.

Für eine strenge Eingabeprüfung auf RFC-9562-UUIDs der Versionen 1, 4, 6 und 7 inklusive gültiger Variante (`8`, `9`, `a`, `b`) eignet sich folgender regulärer Ausdruck:

```regex
^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1467][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$
```

### Nil-UUID, Max-UUID und NTP-Zeitsprünge

RFC 9562 reserviert außerdem zwei spezielle Grenzwerte für Schema-Migrationen und Bereichsabfragen: die **Nil-UUID** (`00000000-0000-0000-0000-000000000000`) als nicht-nullbarer Platzhalter sowie die **Max-UUID** (`ffffffff-ffff-ffff-ffff-ffffffffffff`) als obere Schranke in partitionierten B-Tree-Abfragen. Beim produktiven Einsatz von UUID v7 auf Server-Clustern mit NTP-Zeitsynchronisation sollte Ihre Bibliothek die Monotonie-Regeln aus RFC 9562 umsetzen, damit kleine Rückwärtssprünge der Systemuhr weder die Sortierreihenfolge umkehren noch parallele Threads kollidieren lassen.

## Weiterverarbeitung in Ihrer Entwicklungs-Pipeline

Nach dem Stapel-Export von bis zu 10.000 Kennungen als JSON-Array lassen sich die Ausgaben direkt im [JSON Formatter](/de/werkzeuge/json-formatter) formatieren oder im [API Mock Data Generator](/de/werkzeuge/api-mock-data-generator) zu vollständigen Testdatensätzen kombinieren. Benötigen Sie statt 36-stelliger UUIDs kürzere URL-kompakte Bezeichner mit benutzerdefinierten Präfixen (etwa `knd_...`), wechseln Sie zum [Zufalls-String-Generator](/de/werkzeuge/random-string-generator); für deterministische Prüfsummen steht der [Hash-Generator](/de/werkzeuge/hash-generator) bereit.
