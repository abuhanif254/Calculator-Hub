---
metaTitle: "SQL INSERT zu JSON Konverter: Sicher & Direkt im Browser"
metaDescription: "Konvertieren Sie SQL INSERT INTO Anweisungen direkt im Browser in sauberes JSON. Mit Unterstützung für NULL, Booleans, Escaped Quotes und NoSQL-Migrationen."
metaKeywords: "sql zu json konverter, sql insert to json, rdbms zu nosql migration, sql parser browser, datenbank dump json, postgresql insert json, mysql seed json"
title: "SQL INSERT zu JSON Konverter"
shortDescription: "Wandeln Sie SQL INSERT INTO-Anweisungen mit mehreren Wertetupeln, NULL-Werten und maskierten Anführungszeichen direkt im Browser in strukturiertes JSON um."
faqs:
  - question: "Wie behandelt der Konverter SQL-NULL-Werte sowie TRUE- und FALSE-Booleans?"
    answer: "Das Schlüsselwort NULL (unabhängig von Groß- oder Kleinschreibung) wird nativ auf das JSON-Literal null abgebildet und nicht als Zeichenkette 'NULL' exportiert. Boolesche Literale wie TRUE und FALSE sowie numerische Werte wie Ganzzahlen oder Gleitkommazahlen erhalten ihren echten JSON-Datentyp."
  - question: "Werden maskierte Anführungszeichen wie '' oder Backslash-Quotes innerhalb von SQL-Strings korrekt erkannt?"
    answer: "Ja. Der integrierte zustandsbasierte Lexer unterscheidet exakt zwischen SQL-typischen doppelten Hochkommata ('O''Reilly') und Backslash-Maskierungen wie in MySQL-Dumps. Kommata, Klammern oder Semikolons innerhalb eines String-Literals brechen die Tupel-Erkennung nicht ab."
  - question: "Funktioniert die Konvertierung auch mit Backticks oder doppelten Anführungszeichen bei Spaltennamen?"
    answer: "Ja. Dialektspezifische Bezeichner wie `user_id` aus MySQL/MariaDB, doppelte Quotes aus PostgreSQL oder [email] aus SQL Server (T-SQL) werden beim Auslesen der Spaltenliste automatisch bereinigt, sodass saubere JSON-Schlüssel entstehen."
  - question: "Kann ich mehrere INSERT-Blöcke oder Multi-Row-Inserts in einem Durchgang verarbeiten?"
    answer: "Selbstverständlich. Sowohl einzelne INSERT-Statements mit hunderten kommaseparierten Tupeln in der VALUES-Klausel als auch mehrere aufeinanderfolgende INSERT-Anweisungen werden zu einem konsistenten JSON-Array zusammengeführt."
  - question: "Werden meine SQL-Dumps oder sensiblen Kundendaten auf einen Server hochgeladen?"
    answer: "Nein. Der vollständige SQL-Parser läuft zu 100 % lokal in Ihrem Webbrowser. Weder Tabellenstrukturen noch Datensätze werden über das Netzwerk gesendet – ideal für vertrauliche Produktions-Dumps und DSGVO-konforme Workflows."
features:
  - "Zustandsbasierter SQL-Lexer für präzises Parsing von Strings, Zahlen, Booleans und NULL"
  - "Unterstützung für Multi-Row VALUES (...), (...), (...) sowie multiple INSERT-Statements"
  - "Automatische Bereinigung von MySQL-Backticks, PostgreSQL-Quotes und T-SQL-Klammern"
  - "Wahlweise formatierte Pretty-Print-Ausgabe oder kompaktes Minified-JSON für Seed-Skripte"
  - "Vollständig lokale Browser-Verarbeitung ohne Upload sensibler Datenbank-Exports"
useCases:
  - "Migration relationaler Test-Fixtures aus MySQL oder PostgreSQL nach MongoDB oder DynamoDB"
  - "Erzeugung strukturierter JSON-Mockdaten für Frontend-Tests und REST-/GraphQL-Stubs"
  - "Schnelle Inspektion von SQL-Backup-Auszügen ohne laufende lokale Datenbankinstanz"
  - "Vorbereitung von Bulk-Importen für Elasticsearch, Firestore oder Supabase-APIs"
  - "Umwandlung statischer Lookup-Tabellen in JSON-Konfigurationsdateien für Microservices"
howToSteps:
  - "Fügen Sie eine oder mehrere SQL INSERT INTO ... VALUES (...)-Anweisungen in das Eingabefeld ein."
  - "Stellen Sie sicher, dass die Spaltenliste explizit angegeben ist, oder prüfen Sie die automatische Spaltenbenennung."
  - "Passen Sie bei Bedarf die Ausgabeformatierung (Einrückung oder kompaktes JSON) an."
  - "Kopieren Sie das generierte JSON-Array oder laden Sie es direkt als .json-Datei für Ihre Anwendung herunter."
---
Der SQL INSERT zu JSON Konverter überführt relationale Datenbank-Dumps und Seed-Skripte unmittelbar in valides, typisiertes JSON. Entwickler und Data Engineers sparen sich dadurch das manuelle Aufsetzen einer temporären PostgreSQL- oder MySQL-Instanz, wenn statische Tabelleninhalte für NoSQL-Datenbanken, API-Mocks oder Frontend-Fixtures aufbereitet werden müssen.

Die gesamte Lexer- und Parser-Pipeline wird zu 100 % clientseitig in Ihrem Browser ausgeführt. Selbst vertrauliche SQL-Auszüge mit personenbezogenen Datensätzen, E-Mail-Adressen oder internen Konfigurationen bleiben jederzeit auf Ihrem Rechner, da keinerlei Server-Übertragung stattfindet.

## Technische Architektur: Zustandsbasiertes SQL-Parsing statt fragiler Regex-Muster

Das Zerlegen von `INSERT INTO`-Anweisungen gilt auf den ersten Blick als trivial, scheitert bei naiven regulären Ausdrücken (`split(',')`) jedoch zuverlässig an realen Datensätzen. Sobald eine Textspalte etwa eine Adresse mit Komma, einen JSON-Payload oder ein maskiertes Hochkomma enthält, zerbrechen einfache String-Trennverfahren und erzeugen korrupte JSON-Objekte.

Unser Konverter implementiert deshalb einen deterministischen Finite-State-Lexer nach den Konventionen von ANSI SQL (ISO/IEC 9075) sowie verbreiteten Erweiterungen aus MySQL und PostgreSQL:

1. **Header-Extraktion**: Der Parser identifiziert den Tabellennamen (inklusive optionalem Schema-Präfix wie `public.users`) und liest die explizite Spaltenliste innerhalb des ersten Klammernpaars. Dialekt-Quoting wie Backticks (`` ` ``), doppelte Anführungszeichen (`"`) oder eckige Klammern (`[...]`) wird sauber entfernt.
2. **Kontextsensitives String-Scanning**: Innerhalb des `VALUES`-Blocks verfolgt der Scanner exakt, ob er sich in einem einfach gequoteten String-Literal befindet. Sowohl der ANSI-SQL-Standard für maskierte Hochkommata (`''`) als auch C-ähnliche Escape-Sequenzen (`\'`, `\"`, `\n`, `\\`) werden korrekt aufgelöst, ohne die laufende Tupel-Tiefe zu verfälschen.
3. **Klammer-Balancing**: Jeder Datensatz wird über eine Klammertiefe (`depth === 1` bis `depth === 0`) abgegrenzt, sodass verschachtelte Funktionsaufrufe oder eingebettete Ausdrücke die Datensatzgrenzen nicht verschieben.
4. **Typinferenz beim Mapping**: Jedes Token wird gemäß RFC 8259 (JSON-Spezifikation) auf den passenden primitiven Typ abgebildet: `NULL` wird zu `null`, `TRUE`/`FALSE` zu booleschen Werten und unquotierte Ziffernfolgen zu `Number` (sofern sie sicher darstellbar sind, um führende Nullen bei Postleitzahlen nicht zu zerstören, falls diese quotiert vorliegen).
5. **Kommentar- und Dialektbereinigung**: Einzeilige SQL-Kommentare (`-- ...`), Blockkommentare (`/* ... */`) sowie dialektspezifische Optionen wie `INSERT IGNORE INTO` oder `ON CONFLICT DO NOTHING` werden vor der Tupel-Auswertung übersprungen, sodass auch unveränderte Dump-Ausschnitte ohne manuelles Bereinigen direkt verarbeitet werden können.

Zusätzlich erkennt der Konverter verschachtelte JSON-Strings innerhalb von `JSONB`- oder `TEXT`-Spalten und übernimmt sie sauber maskiert in die Zielstruktur. Bei Bedarf lassen sich Datensätze über mehrere `INSERT INTO`-Blöcke hinweg zu einer homogenen JSON-Liste aggregieren, was besonders bei fragmentierten Seed-Dateien mit begrenzter Batch-Größe und gemischten Tabellenschemata äußerst hilfreich ist. Ebenso werden mehrzeilige String-Literale mit echten Zeilenumbrüchen zuverlässig in RFC-konforme `\n`-Sequenzen überführt.

## Schritt-für-Schritt-Praxisbeispiel: Migration von RDBMS-Fixtures zu JSON/NoSQL

Angenommen, Sie möchten eine bestehende Benutzer- und Rollen-Lookup-Tabelle aus einem PostgreSQL-Seed-Skript in eine JSON-Fixture-Datei für MongoDB oder einen Integrationstest unter Jest/Vitest überführen. Die Ausgangsdaten enthalten sowohl maskierte Hochkommata als auch Kommata in Textfeldern, `NULL`-Werte und Booleans:

```sql
INSERT INTO "public"."users" ("id", "full_name", "bio", "is_active", "last_login") VALUES
(101, 'Elena O''Connor', 'Lead DevOps, Berlin', TRUE, '2026-10-14T08:30:00Z'),
(102, 'Markus Weber', 'Systemarchitekt (Go, Rust)', FALSE, NULL),
(103, 'Aylin Kaya', NULL, TRUE, '2026-11-02T17:45:12Z');
```

Nach dem Einfügen in den Konverter löst der Lexer das doppelte Hochkomma bei `O''Connor`, bewahrt die Kommata innerhalb von `'Lead DevOps, Berlin'` sowie die Klammern in `'Systemarchitekt (Go, Rust)'` und wandelt `TRUE`, `FALSE` sowie `NULL` in native JSON-Literale um:

```json
[
  {
    "id": 101,
    "full_name": "Elena O'Connor",
    "bio": "Lead DevOps, Berlin",
    "is_active": true,
    "last_login": "2026-10-14T08:30:00Z"
  },
  {
    "id": 102,
    "full_name": "Markus Weber",
    "bio": "Systemarchitekt (Go, Rust)",
    "is_active": false,
    "last_login": null
  },
  {
    "id": 103,
    "full_name": "Aylin Kaya",
    "bio": null,
    "is_active": true,
    "last_login": "2026-11-02T17:45:12Z"
  }
]
```

Dieses Ergebnis lässt sich ohne Nachbearbeitung direkt via `mongoimport --jsonArray` einspielen oder in TypeScript per `import usersFixture from './users.json'` typsicher verwenden.

## Referenz- und Mapping-Tabelle zwischen SQL-Dialekten und JSON

Die nachstehende Übersicht dokumentiert, wie typische SQL-Konstrukte bei der Konvertierung nach RFC-8259-JSON abgebildet werden:

| SQL-Konstrukt / Literal | Dialekt-Herkunft | JSON-Ausgabe | Typ-Verhalten & Besonderheiten |
| :--- | :--- | :--- | :--- |
| `'Text mit ''Quote'''` | ANSI SQL / PostgreSQL | `"Text mit 'Quote'"` | Doppelte Hochkommata werden auf ein `'` reduziert |
| `'Text mit \'Quote\''` | MySQL (Standard-Modus) | `"Text mit 'Quote'"` | Backslash-Escapes werden aufgelöst |
| `NULL` / `null` | Alle RDBMS | `null` | Echtes JSON-Null-Literal statt String `"NULL"` |
| `TRUE` / `FALSE` | PostgreSQL, MySQL 8 | `true` / `false` | Native JSON-Booleans (unquotiert) |
| `42`, `-19.95` | Alle RDBMS | `42`, `-19.95` | Numerische Werte bleiben Zahlen |
| `'01067'` | Alle RDBMS | `"01067"` | Quotierte Zahlen behalten führende Nullen als String |
| `` `col` ``, `"col"`, `[col]` | MySQL / PG / MSSQL | `"col"` | Bezeichner-Quotes werden sauber abgestreift |

## Typische Produktionsfehler, Randfälle und Performance-Grenzen

Ein verbreiteter Stolperstein beim Export aus `pg_dump` oder `mysqldump` sind **INSERT-Anweisungen ohne explizite Spaltenliste**, etwa `INSERT INTO users VALUES (1, 'Anna');`. Da in reinem SQL-Text ohne das zugehörige `CREATE TABLE`-Schema keine Spaltennamen vorliegen, muss der Konverter in solchen Fällen auf generische Schlüssel wie `column_1`, `column_2` zurückfallen. Aktivieren Sie bei `mysqldump` daher idealerweise die Option `--complete-insert` beziehungsweise bei `pg_dump` das Flag `--column-inserts`, bevor Sie den Export erstellen.

Achten Sie außerdem auf **SQL-Funktionen und Expressions** in `VALUES`-Listen wie `NOW()`, `UUID()` oder `UNHEX('...')`. Da ein statischer Konverter keine Datenbank-Engine ausführt, lassen sich Laufzeitfunktionen nicht auswerten und werden als bereinigte Rohausdrücke oder Strings behandelt, die vor einem Import gegebenenfalls angepasst werden müssen. Ähnliches gilt für hexadezimale `BLOB`-Literale (`0x89504E47...`), die je nach Zielsystem (z. B. Base64 in JSON-APIs) eine Nachkonvertierung erfordern.

Schließlich sollten Sie bei sehr großen SQL-Dumps im Bereich mehrerer hundert Megabyte die Browser-Speichergrenzen im Blick behalten: JSON bläht wiederholte Spaltennamen in jedem Array-Objekt auf und kann im RAM das Drei- bis Fünffache der ursprünglichen SQL-Größe beanspruchen. Für umfangreiche Produktivmigrationen oberhalb von 50 MB empfiehlt sich daher die Aufteilung in handliche Tranchen oder die Nutzung eines Streaming-Parsers auf der Kommandozeile. Prüfen Sie zudem vor dem NoSQL-Import stets Zeitzonen und Datumsformate, da SQL-Timestamps ohne expliziten Offset (`2026-11-02 17:45:12`) in JSON-APIs idealerweise nach ISO 8601 (`Z` oder `+01:00`) normalisiert werden sollten.
