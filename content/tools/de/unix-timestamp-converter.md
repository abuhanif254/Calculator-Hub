---
metaTitle: "Unix Timestamp & Epoch Converter: ISO 8601, JWT & 2038"
metaDescription: "Konvertieren Sie Unix-Timestamps (10-stellig & 13-stellig) in ISO 8601 und lokale Zeitzonen. Prüfen Sie JWT exp/iat Claims und das Jahr-2038-Problem im Browser."
metaKeywords: "Unix Timestamp Converter, Epoch Konverter, ISO 8601 RFC 3339, 10-stellig vs 13-stellig Millisekunden, JWT exp iat prüfen, Jahr 2038 Problem, BigInt Unix Zeit"
title: "Unix Timestamp & Epoch Converter"
shortDescription: "Wandeln Sie Unix-Zeitstempel in Sekunden, Millisekunden, Mikro- oder Nanosekunden präzise in ISO-8601-Daten und lokale Zeitzonen um. Ideal zum Debuggen von JWT-Claims (exp, iat), API-Logs und Datenbank-Timestamps."
faqs:
  - question: "Was ist der Unterschied zwischen 10-stelligen und 13-stelligen Unix-Timestamps?"
    answer: "Ein 10-stelliger Timestamp misst die vergangenen Sekunden seit dem 1. Januar 1970 (00:00:00 UTC) – dies ist der Standard in POSIX, JWT-Claims und vielen SQL-Datenbanken. Ein 13-stelliger Wert gibt dagegen Millisekunden an, wie sie beispielsweise JavaScript mit Date.now() liefert."
  - question: "Warum sind in JSON Web Tokens (JWT) die Claims exp und iat immer 10-stellig?"
    answer: "RFC 7519 definiert den Datentyp NumericDate für Claims wie exp, iat und nbf ausdrücklich in ganzen Sekunden seit der Unix-Epoche. Wer in JavaScript versehentlich Date.now() ohne Teilung durch 1000 verwendet, setzt das Ablaufdatum um den Faktor 1000 in die ferne Zukunft."
  - question: "Was passiert beim Jahr-2038-Problem genau?"
    answer: "Systeme, die die Unix-Zeit in einem vorzeichenbehafteten 32-Bit-Integer speichern, erreichen am 19. Januar 2038 um 03:14:07 UTC den Maximalwert 2.147.483.647. Eine Sekunde später erfolgt ein Integer-Überlauf auf -2.147.483.648, was als Dezember 1901 interpretiert wird."
  - question: "Werden meine eingefügten JWT-Zeiten oder Produktions-Logs an einen Server gesendet?"
    answer: "Nein. Sämtliche Umrechnungen erfolgen zu 100 % lokal in Ihrem Browser mittels JavaScript Intl.DateTimeFormat und BigInt. Es werden keinerlei Eingaben, Zeitstempel oder Debug-Daten über das Netzwerk übertragen."
  - question: "Berücksichtigen Unix-Timestamps Schaltsekunden?"
    answer: "Nein. Nach POSIX.1 wird jeder Tag mit exakt 86.400 Sekunden modelliert. Bei einer Schaltsekunde hält die POSIX-Uhr effektiv kurz an oder wird per Leap Smearing über mehrere Stunden verteilt, sodass Berechnungen zwischen Tagen deterministisch bleiben."
features:
  - "Automatische Erkennung von Sekunden (10-stellig), Millisekunden (13-stellig), Mikro- und Nanosekunden"
  - "Präzise Konvertierung in ISO 8601 / RFC 3339, UTC sowie beliebige IANA-Zeitzonen"
  - "Verlustfreie Verarbeitung großer Nanosekunden-Werte durch 64-Bit-BigInt-Arithmetik"
  - "Schnelle Kontrolle von JWT-Claims (iat, nbf, exp) auf abgelaufene oder fehlerhafte Zeitfenster"
  - "100 % clientseitige Ausführung ohne Upload sensibler Log- und Token-Daten"
useCases:
  - "Debugging von JWT-Authentifizierungsfehlern durch Prüfung von exp-, iat- und nbf-Werten"
  - "Auswertung von Datenbank-Einträgen, Kafka-Offsets und verteilten Tracing-Logs"
  - "Umrechnung von Frontend-Zeitstempeln (ms) in Backend-kompatible Unix-Sekunden"
  - "Testen von Ablaufdaten nach dem 19. Januar 2038 zur Absicherung gegen 32-Bit-Overflows"
  - "Erzeugung standardkonformer RFC-3339-Strings für REST- und GraphQL-Schnittstellen"
howToSteps:
  - "Fügen Sie einen numerischen Unix-Timestamp oder ein Datum im ISO-8601-Format in das Eingabefeld ein."
  - "Überprüfen Sie die automatisch erkannte Zeiteinheit (Sekunden, Millisekunden, Mikro- oder Nanosekunden)."
  - "Lesen Sie die umgerechneten Werte für UTC, Ihre lokale Zeitzone und das relative Zeitdelta ab."
  - "Kopieren Sie den benötigten ISO-String oder numerischen Timestamp direkt in Ihren Code oder Ihre Datenbankabfrage."
---

Unix-Timestamps sind das universelle Zeitformat moderner IT-Systeme. Ob in verteilten Microservices, JSON Web Tokens (JWT), Message-Brokern oder Audit-Logs: Eine einzelne Ganzzahl ersetzt fehleranfällige Zeitzonen-Strings und ermöglicht schnelle mathematische Vergleiche sowie platzsparende Datenbank-Indizes. Beim täglichen Debugging bereiten jedoch unterschiedliche Granularitäten – von 10-stelligen Sekunden bis zu 19-stelligen Nanosekunden – sowie unklare Zeitzonenbezüge häufig Kopfzerbrechen. Dieser Unix Timestamp & Epoch Converter übersetzt Epochenwerte augenblicklich und verlustfrei zwischen allen gängigen Zeitformaten.

Alle Umrechnungen laufen zu 100 % lokal in Ihrem Browser. Sensible Produktions-Logs, interne Datenbank-Exports oder dekodierte JWT-Ablaufdaten verlassen niemals Ihr System und werden weder an externe Server gesendet noch protokolliert. Dadurch eignet sich das Werkzeug uneingeschränkt für die Analyse vertraulicher Authentifizierungsdaten und sicherheitsrelevanter Audit-Trails.

## Technische Architektur: Unix-Epoche, Granularitäten und 64-Bit-BigInt

Die Unix-Zeit (Epoch Time) zählt die vergangenen Sekunden seit dem definierten Nullpunkt **`1970-01-01T00:00:00Z`** (UTC). Gemäß dem POSIX.1-Standard besitzt jeder Kalendertag exakt `86.400` Sekunden; Schaltsekunden der internationalen Atomzeit (UTC) werden ignoriert beziehungsweise durch sogenannte Leap-Smearing-Verfahren über mehrere Stunden verteilt. Dadurch lässt sich jeder Zeitpunkt eindeutig als kontinuierliche skalare Zahl darstellen, unabhängig von historischen Kalenderreformen, Sommerzeitumstellungen oder regionalen Zeitzonen. Negative Werte vor `0` repräsentieren folgerichtig Zeitpunkte vor dem 1. Januar 1970.

In der Softwarepraxis existieren jedoch vier verschiedene Auflösungen nebeneinander, die bei API-Integrationen leicht verwechselt werden:
- **Sekunden (10 Stellen, z. B. `1795752410`):** Standard in POSIX, Linux-Dateisystemen, JWT-Claims (`exp`, `iat`) und klassischen Unix-APIs. Bis zum Jahr 2286 bleibt dieser Wert zehnstellig.
- **Millisekunden (13 Stellen, z. B. `1795752410000`):** Standard in JavaScript (`Date.now()`), Java (`System.currentTimeMillis()`), Kafka-Message-Timestamps und vielen Browser-APIs.
- **Mikrosekunden (16 Stellen):** Häufig eingesetzt in PostgreSQL (`TIMESTAMPTZ`), Python (`time.time_ns() // 1000`) und verteilten Tracing-Formaten wie OpenTelemetry.
- **Nanosekunden (19 Stellen):** Genutzt von Go (`time.Now().UnixNano()`), Kubernetes-Events, Prometheus-Exporten und hochauflösenden Performance-Profilern.

Eine besondere technische Hürde betrifft JavaScript: Der Standard-Datentyp `Number` basiert auf 64-Bit-Gleitkommazahlen (IEEE 754) und garantiert exakte Ganzzahl-Präzision nur bis `Number.MAX_SAFE_INTEGER` (`9.007.199.254.740.991`). Ein aktueller 19-stelliger Nanosekunden-Timestamp überschreitet diese Grenze um das Hundertfache. Um Rundungsfehler auf den letzten Ziffern auszuschließen, verarbeitet ein sauberer Konverter Nanosekunden zwingend mithilfe von `BigInt`-Arithmetik, bevor die Sekundendifferenz an `Intl.DateTimeFormat` zur exakten Zeitzonenformatierung (z. B. `Europe/Berlin` mit automatischer MEZ/MESZ-Auflösung) übergeben wird.

## Praxis-Walkthrough: JWT-Claims prüfen und Einheiten sicher umrechnen

Ein typisches Problem in Authentifizierungs-Pipelines entsteht beim Verwechseln von Sekunden und Millisekunden in JSON Web Tokens gemäß RFC 7519. Ein decodierter JWT-Payload enthält beispielsweise folgende Zeit-Claims im Format `NumericDate`:

```json
{
  "sub": "usr_94821",
  "iat": 1795752000,
  "nbf": 1795752000,
  "exp": 1795755600
}
```

Hier beträgt die Gültigkeitsdauer exakt `1795755600 - 1795752000 = 3600` Sekunden (eine Stunde). Übergibt ein Entwickler in Node.js jedoch ungeprüft `Date.now() + 3600 * 1000`, entsteht ein 13-stelliger `exp`-Wert – das Token wäre bis ins Jahr 58.000 gültig und würde jedes Sicherheitsaudit verletzen. Umgekehrt führt das Teilen durch `1000` ohne `Math.floor()` zu Nachkommastellen, die strikte OAuth2-Validatoren in Java oder Go mit einem Parsing-Fehler ablehnen.

So normalisieren Sie Zeitstempel unterschiedlicher Herkunft in TypeScript sauber und ohne Präzisionsverlust auf `ISO 8601` (RFC 3339):

```typescript
function epochToIsoUtc(rawTimestamp: number | string | bigint): string {
  const value = BigInt(rawTimestamp);
  const abs = value < 0n ? -value : value;

  let ms: bigint;
  if (abs < 10_000_000_000n) {
    ms = value * 1000n; // 10-stellig: Sekunden
  } else if (abs < 10_000_000_000_000n) {
    ms = value; // 13-stellig: Millisekunden
  } else if (abs < 10_000_000_000_000_000n) {
    ms = value / 1_000n; // 16-stellig: Mikrosekunden
  } else {
    ms = value / 1_000_000n; // 19-stellig: Nanosekunden
  }

  return new Date(Number(ms)).toISOString();
}
```

Für die Rückrichtung – etwa beim Berechnen eines JWT-`exp`-Claims in 15 Minuten – verwenden Sie in JavaScript konsequent `Math.floor(Date.now() / 1000) + 900`, um eine saubere 10-stellige Ganzzahl zu garantieren.

## Referenz-Tabelle: Wichtige Unix-Epochen und Schwellenwerte

| Unix-Timestamp | Einheit / Typ | ISO 8601 (UTC) | Technische Bedeutung |
| :--- | :--- | :--- | :--- |
| `0` | Sekunden (32/64-Bit) | `1970-01-01T00:00:00.000Z` | Beginn der Unix-Epoche (POSIX.1) |
| `1000000000` | Sekunden (10-stellig) | `2001-09-09T01:46:40.000Z` | Erste Milliarde Unix-Sekunden (Billennium) |
| `1700000000` | Sekunden (10-stellig) | `2023-11-14T22:13:20.000Z` | Moderner Referenzpunkt in aktuellen Logs |
| `2147483647` | Signed 32-Bit Max | `2038-01-19T03:14:07.000Z` | Jahr-2038-Grenze (`2^31 - 1`) |
| `-2147483648` | Signed 32-Bit Min | `1901-12-13T20:45:52.000Z` | Überlauf-Ziel bei 32-Bit-Wraparound |
| `4294967295` | Unsigned 32-Bit Max | `2106-02-07T06:28:15.000Z` | Maximum vorzeichenloser 32-Bit-Felder |

## Produktions-Fallstricke: Jahr-2038-Überlauf, ISO 8601 und Zeitzonen

Beim Entwurf langlebiger Datenbanken, Token-Infrastrukturen und API-Schnittstellen sollten Entwickler vier zentrale Risiken aktiv ausschließen:

- **Das Jahr-2038-Problem (Y2K38):** Anwendungen mit langfristigen Verträgen, Hypothekenlaufzeiten, Anleihen oder Root-Zertifikaten überschreiten das kritische Datum `2038-01-19T03:14:07Z` bereits heute. Ältere MySQL-`TIMESTAMP`-Spalten (auf 32-Bit begrenzt bis einschließlich Version 8.0, sofern nicht `DATETIME` genutzt wird) sowie Legacy-C-Bibliotheken und Embedded-Systeme mit 32-Bit-`time_t` schlagen bei Daten nach 2038 fehl oder springen ins Jahr 1901 zurück. Stellen Sie Schemas konsequent auf 64-Bit-Ganzzahlen (`BIGINT`) oder `DATETIME(6)` um.
- **ISO 8601 vs. RFC 3339:** Für den Datenaustausch zwischen APIs empfiehlt sich RFC 3339 (ein strenges Profil von ISO 8601) mit verpflichtendem Zeitzonen-Suffix (`Z` für UTC oder `+01:00`). Fehlt dieses Suffix, interpretieren verschiedene Parser den Zeitstempel uneinheitlich entweder als UTC oder als lokale Serverzeit, was in verteilten Systemen zu schwer reproduzierbaren Offsets führt.
- **Verlust durch IEEE-754-JSON-Parser:** Wenn Ihre Go- oder Rust-Backends 19-stellige Nanosekunden als JSON-Number serialisieren, verfälscht ein JavaScript-Client beim `JSON.parse()` unbemerkt die letzten Ziffern. Übertragen Sie Nanosekunden in JSON-APIs grundsätzlich als String oder bleiben Sie bei Millisekunden (`13` Stellen).
- **Clock Skew bei JWT-Prüfungen:** Selbst bei korrekt gesetzten `iat`- und `exp`-Sekunden weichen Systemuhren zwischen Microservices oft um einige Sekunden ab. Konfigurieren Sie bei der JWT-Signaturprüfung eine kleine Toleranz (`clockTolerance`, üblicherweise 30 bis 60 Sekunden) und synchronisieren Sie alle Server-Nodes kontinuierlich über NTP.
- **Monotone Zeit für Latenzmessungen nutzen:** Für reine Dauer- und Timeout-Messungen innerhalb eines Prozesses ist die klassische Unix-Epochenzeit ungeeignet, da NTP-Korrekturen oder manuelle Uhrumstellungen zu negativen Zeitdifferenzen führen können. Greifen Sie hierfür auf monotone Uhren wie `performance.now()` im Browser, `process.hrtime.bigint()` in Node.js oder `time.monotonic()` in Python zurück, und reservieren Sie Unix-Timestamps gezielt für persistente Ereignisse und verteilte Log-Korrelationen.
