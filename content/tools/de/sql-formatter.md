---
metaTitle: "SQL Formatter & Beautifier Online | 9 Dialekte & Diff"
metaDescription: "SQL-Abfragen für PostgreSQL, MySQL, T-SQL, Oracle, BigQuery und Snowflake lokal im Browser formatieren, minifizieren, prüfen und vergleichen."
metaKeywords: "sql formatter, sql beautifier, sql formatieren online, sql minifier, postgresql formatter, mysql abfrage formatieren, t-sql formatter, bigquery sql formatter, snowflake sql formatter, sql analyse"
title: "SQL Formatter & Beautifier"
shortDescription: "Formatieren, minifizieren, validieren und analysieren Sie SQL-Abfragen für neun relationale Datenbanken und Cloud-Warehouses direkt im Browser. Inklusive Monaco-Syntaxhervorhebung, Komplexitätsbewertung und zeilenweisem Diff-Vergleich."
faqs:
  - question: "Wie bewahrt die dialektspezifische Formatierung Operatoren wie PostgreSQL-Casts oder T-SQL-Klammern?"
    answer: "Jeder wählbare SQL-Dialekt lädt eigene Lexer-Regeln, sodass herstellerspezifische Syntax beim Zerlegen in Token intakt bleibt. PostgreSQL behält ::-Typkonvertierungen sowie JSONB-Pfeiloperatoren (->, ->>), T-SQL schützt Bezeichner in eckigen Klammern ([Auftragsdetails]) samt temporären Tabellen (#tmp), und MySQL sowie BigQuery bewahren Backtick-Bezeichner ohne störende Leerzeichen."
  - question: "Verändert das Formatieren oder Minifizieren den Ausführungsplan einer SQL-Abfrage?"
    answer: "Das Formatieren ändert ausschließlich Leerzeichen, Einrückungen und die Groß-/Kleinschreibung von Schlüsselwörtern außerhalb von String-Literalen – der Datenbank-Parser erzeugt denselben Ausführungsplan. Beim Minifizieren werden hingegen -- und /* */ Kommentare entfernt, was nur dann relevant ist, wenn Ihre Abfrage Optimizer-Hints wie /*+ INDEX(...) */ enthält."
  - question: "Wie werden Komplexitätsstufe und Lesbarkeitswert von 0 bis 100 berechnet?"
    answer: "Der Analyse-Tab gewichtet SQL-Schlüsselwörter (je 1 Punkt), JOIN-Klauseln (je 3 Punkte) und verschachtelte SELECT-Unterabfragen (je 5 Punkte), um Statements als Einfach, Mittel, Komplex oder Sehr komplex einzustufen. Der Lesbarkeitswert startet bei 100 und zieht Punkte für Einzeiler über 100 Zeichen sowie mittlere Zeilenlängen über 80 oder 120 Zeichen ab."
  - question: "Welche Syntaxfehler erkennt die clientseitige Vorprüfung vor der Ausführung?"
    answer: "Der anführungszeichenbewusste Scanner prüft Token außerhalb von Zeichenketten-Literalen und meldet unerwartete schließende Klammern, nicht geschlossene Klammergruppen, offene String-Literale sowie unvollständige abschließende SELECT- oder FROM-Klauseln noch vor dem Absetzen an die Datenbank."
  - question: "Werden produktive Tabellenschemata oder Filterwerte an einen Server übertragen?"
    answer: "Nein. Formatierung, Minifizierung, Syntax-Vorprüfung, Komplexitätsanalyse und Diff-Vergleich laufen vollständig im Arbeitsspeicher Ihres Browsers. Auch der optionale Verlauf der letzten 10 Abfragen verbleibt ausschließlich im lokalen Browser-Speicher – vollständig DSGVO-konform."
features:
  - "Neun dialektspezifische Lexer für Standard-SQL, PostgreSQL, MySQL, MariaDB, SQLite, SQL Server (T-SQL), Oracle (PL/SQL), Google BigQuery und Snowflake"
  - "Acht Ein-Klick-Stilvorgaben (Lesbar, Kompakt, Enterprise, PostgreSQL-Stil, MySQL-Stil, Tabs, 2 Leerzeichen, 4 Leerzeichen) sowie freie Wahl von Einrückung und Schreibweise"
  - "Kompakter SQL-Minifier zum Entfernen von einzeiligen und mehrzeiligen Kommentaren sowie überflüssigen Leerzeichen rund um Klammern, Kommas und Semikolons"
  - "Echtzeit-Abfrageanalyse mit Zeichen- und Zeilenzahl, Schlüsselwort- und JOIN-Zähler, Unterabfragetiefe, Komplexitätsstufe und Lesbarkeitswert von 0 bis 100"
  - "Anführungszeichenbewusste Syntax-Vorprüfung kombiniert mit einer zeilenweisen Diff-Ansicht zur Kontrolle aller Filter- und Join-Bedingungen"
  - "Monaco-Code-Editor mit automatischer Hell-/Dunkel-Synchronisierung, .sql-Upload und -Download, lokalem Verlauf für 10 Abfragen und 100 % Client-Verarbeitung"
useCases:
  - "Entwirren langer einzeiliger ORM-Abfragen aus Hibernate, Prisma, Drizzle, SQLAlchemy oder Entity Framework bei der Slow-Query-Analyse"
  - "Prüfen verschachtelter CTE-Pipelines und Fensterfunktionen aus BigQuery-, Snowflake- oder PostgreSQL-Abfrageprotokollen"
  - "Vereinheitlichen von Einrückung, Klausel-Umbrüchen und Schlüsselwort-Schreibweise in Datenbank-Migrationsskripten vor Pull Requests"
  - "Minifizieren kommentierter SQL-Vorlagen für Kubernetes-ConfigMaps, CI/CD-Pipelines und Anwendungskonfigurationen"
  - "Vorab-Prüfung manuell geänderter Stored Procedures und dynamischer SQL-Fragmente auf Klammer- und String-Fehler vor dem Staging-Deployment"
  - "Absichern umstrukturierter Reporting-Abfragen aus DBeaver, pgAdmin oder SSMS per Diff-Vergleich gegen versehentliche Logikänderungen"
howToSteps:
  - "Fügen Sie Ihre rohe SQL-Abfrage in den linken Monaco-Editor ein, laden Sie eine lokale .sql- oder .txt-Datei hoch oder wählen Sie eine der fünf Beispielabfragen inklusive CTEs und Prozeduren."
  - "Wählen Sie im Dialekt-Menü das passende Datenbanksystem aus, damit herstellerspezifische Bezeichner, Platzhalter und Operatoren korrekt tokenisiert werden."
  - "Bestimmen Sie Einrückungsbreite (2 Leerzeichen, 4 Leerzeichen oder Tabulatoren) und Groß-/Kleinschreibung der Schlüsselwörter oder aktivieren Sie eine der acht Stilvorgaben."
  - "Klicken Sie auf Formatieren für eine sauber gegliederte Ausgabe mit doppelten Leerzeilen zwischen Statements oder auf Minifizieren für einen kompakten Einzeiler."
  - "Öffnen Sie den Analyse-Tab für JOIN-Dichte, Unterabfragen, Komplexitätsstufe und Lesbarkeitswert oder prüfen Sie im Diff-Tab alle zeilenweisen Abweichungen."
  - "Kopieren Sie das bereinigte SQL direkt in die Zwischenablage oder laden Sie es als .sql-Datei für Migrationen, Datenbankkonsolen und Code-Reviews herunter."
---

Moderne ORMs, Query-Builder und Business-Intelligence-Plattformen erzeugen im Produktivbetrieb tausende SQL-Statements pro Stunde – fast immer zusammengepresst auf eine einzige, unübersichtliche Zeile mit inkonsistenter Schreibweise und verschachtelten Unterabfragen. Wer eine 1.400 Zeichen lange Abfrage direkt aus einem Slow-Query-Log prüft, übersieht leicht eine falsche Operator-Präzedenz zwischen `AND` und `OR`, eine fehlende `JOIN`-Bedingung mit kartesischem Produkt oder eine korrelierte Unterabfrage. Dieser clientseitige **SQL Formatter & Beautifier** strukturiert Abfragen für neun relationale Datenbanken und Cloud-Data-Warehouses mittels lexikalischer Tokenisierung neu und liefert zugleich Minifizierung, Komplexitätsmetriken und einen zeilenweisen Diff-Vergleich, ohne interne Schemanamen an einen Server zu senden.

## Lexer-basierte Formatierung statt fehleranfälliger Regex-Ersetzungen

Einfache Skripte verketten reguläre Ausdrücke, um vor `SELECT`, `FROM` oder `WHERE` Zeilenumbrüche einzufügen. In produktivem SQL scheitert dieser Ansatz zuverlässig: Er zerreißt Zeichenketten-Literale mit enthaltenen Schlüsselwörtern wie `'Bestellt from Lager'`, beschädigt Inline-Kommentare und spaltet zusammengesetzte Operatoren wie den PostgreSQL-Cast `::` oder JSONB-Pfadoperatoren (`->`, `->>`, `#>`) durch eingefügte Leerzeichen auf.

Ein dialektbewusster Formatter arbeitet stattdessen in einer deterministischen zweistufigen Pipeline:

1. **Lexikalische Tokenisierung:** Der Eingabetext wird zeichenweise in typisierte Token zerlegt – Hauptklauseln, Join-Modifikatoren, Funktionen, maskierte Bezeichner, String-Literale inklusive verdoppelter Hochkommata (`''`), Zahlenliterale, Kommentare und Mehrzeichen-Operatoren.
2. **Einrückungs-Stack und Klausel-Layout:** Alle Token außerhalb von Literalen und Kommentaren werden anhand der aktuellen Blocktiefe ausgegeben. Hauptklauseln (`WITH`, `SELECT`, `FROM`, `INNER JOIN`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`) beginnen auf eigenen Zeilen, Klammerblöcke rücken Common Table Expressions (CTEs) und Unterabfragen sauber ein, und per Semikolon getrennte Skripte erhalten zwei Leerzeilen Abstand. Dadurch bleiben mehrstufige DDL-Migrationen (`CREATE TABLE`, `ALTER TABLE`, `CREATE INDEX`) in Git-Diffs klar gegliedert.

Da ausschließlich die äußere Formatierung und niemals die relationale Algebra verändert wird, erzeugen Datenbank-Optimierer nach dem Formatieren denselben Ausführungsplan.

## Dialekt-Referenzmatrix für neun Datenbanksysteme

Obwohl ISO/IEC 9075 den SQL-Kern festlegt, unterscheiden sich die großen Engines deutlich bei Bezeichner-Quoting, Parameter-Platzhaltern und Spezialoperatoren. Die Wahl des passenden Dialekts schützt jede dieser Eigenheiten:

| Dialekt | Bezeichner-Quoting | Parameter-Platzhalter | Typische Spezialsyntax & Operatoren | Üblicher Stil |
| :--- | :--- | :--- | :--- | :--- |
| **PostgreSQL** | Doppelte Anführungszeichen `"spalte"` | `$1`, `$2` | `::`-Cast, `->` / `->>` JSONB, `ILIKE`, `RETURNING`, `$$`-Blöcke | 4 Leerzeichen, `klein` oder `GROSS` |
| **MySQL / MariaDB** | Backticks `` `spalte` `` | `?` | `LIMIT offset, count`, `ON DUPLICATE KEY UPDATE`, `SIGNAL SQLSTATE` | 2 Leerzeichen, `GROSS` |
| **SQL Server (T-SQL)** | Eckige Klammern `[spalte]` oder `"spalte"` | `@param` | `TOP (N)`, `#temp`-Tabellen, `CROSS APPLY`, `OFFSET ... FETCH`, `GO` | 4 Leerzeichen, `GROSS` |
| **Oracle (PL/SQL)** | Doppelte Anführungszeichen `"spalte"` | `:param` | `CONNECT BY PRIOR`, `(+)` Outer Join, `MERGE INTO`, `BEGIN ... END;` | 4 Leerzeichen, `GROSS` |
| **SQLite** | `"spalte"`, `` `spalte` ``, `[spalte]` | `?`, `:name`, `@name` | `WITHOUT ROWID`, `STRICT`-Tabellen, `ON CONFLICT DO UPDATE`, `PRAGMA` | 2 Leerzeichen, `GROSS` |
| **Google BigQuery** | Backticks `` `proj.ds.tbl` `` | `@param`, `?` | `STRUCT<...>`, `ARRAY<...>`, `UNNEST()`, `SAFE_DIVIDE()`, `QUALIFY` | 2 Leerzeichen, `GROSS` |
| **Snowflake** | Doppelte Anführungszeichen `"spalte"` | `?`, `:1` | `VARIANT`-Pfade `col:feld::string`, `FLATTEN()`, `QUALIFY`, `AT` | 2 oder 4 Leerzeichen, `GROSS` |

## Praxisbeispiel: Analytische CTE-Abfrage strukturieren

Betrachten Sie eine komprimierte PostgreSQL-Abfrage direkt aus einem APM-Trace:

```sql
with monatlich as (select date_trunc('month',o.created_at) as m,o.meta->>'kanal' as ch,sum(o.total_cents)::numeric/100 as umsatz from orders o inner join accounts a on a.id=o.account_id where o.status='bezahlt' and o.created_at>='2026-01-01' group by 1,2) select m,ch,umsatz,umsatz-lag(umsatz) over (partition by ch order by m) as delta from monatlich order by m desc,umsatz desc;
```

Nach dem Formatieren im Dialekt **PostgreSQL** mit 2 Leerzeichen Einrückung und großgeschriebenen Schlüsselwörtern werden Struktur, Fensterfunktion und Operatoren sofort nachvollziehbar, während `::numeric` und `->>` unverändert erhalten bleiben:

```sql
WITH
  monatlich AS (
    SELECT
      date_trunc('month', o.created_at) AS m,
      o.meta ->> 'kanal' AS ch,
      sum(o.total_cents)::numeric / 100 AS umsatz
    FROM
      orders o
      INNER JOIN accounts a ON a.id = o.account_id
    WHERE
      o.status = 'bezahlt'
      AND o.created_at >= '2026-01-01'
    GROUP BY
      1,
      2
  )
SELECT
  m,
  ch,
  umsatz,
  umsatz - lag(umsatz) OVER (
    PARTITION BY
      ch
    ORDER BY
      m
  ) AS delta
FROM
  monatlich
ORDER BY
  m DESC,
  umsatz DESC;
```

Einheitliche Stilvorgaben verhindern zudem überflüssige Formatierungs-Diffs in der Versionskontrolle, wenn mehrere Entwickler gemeinsame Views oder Migrationen pflegen. Teams mit festen Konventionen wenden den **PostgreSQL-Stil** (4 Leerzeichen, Kleinschreibung) oder den **MySQL-Stil** (2 Leerzeichen, Großschreibung) per Einzelklick an. Enthalten Ihre Abfrageergebnisse semistrukturierte `JSONB`-Spalten, lassen sich die extrahierten Nutzdaten direkt im [JSON Formatter](/de/werkzeuge/json-formatter) untersuchen; vor der Weitergabe sensibler Beispieldaten an externe Teams empfiehlt sich zudem der [Datenbank-Anonymisierer](/de/werkzeuge/database-anonymizer).

## Komplexitätsmetriken, Syntax-Vorprüfung und Diff-Kontrolle

Vor dem Merge von Datenbank-Migrationen oder Performance-Patches liefert die integrierte Auswertung präzise Strukturkennzahlen:

- **Gewichtete Komplexitätsstufe:** Der Analyse-Tab berechnet `Schlüsselwörter + (JOINs * 3) + (Unterabfragen * 5)` und klassifiziert Abfragen als **Einfach** (bis 5), **Mittel** (6–15), **Komplex** (16–30) oder **Sehr komplex** (über 30). Tief verschachtelte Subselects, die sich für ein CTE-Refactoring eignen, fallen dadurch sofort auf.
- **Lesbarkeitswert (0–100):** Ausgehend von 100 Punkten zieht die Metrik für einzeilige Statements über 100 Zeichen pauschal 40 Punkte sowie für durchschnittliche Zeilenlängen über 80 (-15) beziehungsweise 120 Zeichen (-30) ab.
- **Anführungszeichenbewusste Vorprüfung:** Noch vor der Ausführung auf der Datenbank meldet der Validator unpaarige Klammern, ungeschlossene String-Literale sowie leere abschließende `SELECT`- oder `FROM`-Klauseln außerhalb von Textliteralen.
- **Zeilenweiser Diff-Abgleich:** Im Diff-Tab – oder für ausführliche Dokumentvergleiche im [Diff Checker](/de/werkzeuge/diff-checker) – verifizieren Sie auf einen Blick, dass jeder Join-Schlüssel und jedes Filterprädikat unverändert geblieben ist.

## Minifizierung, Optimizer-Hints und Datenschutz im Browser

Die Funktion **Minifizieren** entfernt einzeilige `--`-Kommentare sowie `/* ... */`-Blockkommentare, reduziert mehrfache Leerzeichen und verdichtet Abstände rund um `(`, `)`, `,` und `;` – ideal für Kubernetes-ConfigMaps, Telemetrie-Tags oder Umgebungsvariablen. Ein wichtiger Praxishinweis: Oracle, MySQL sowie PostgreSQL mit `pg_hint_plan` betten Optimierungsanweisungen in Blockkommentare ein (`/*+ FULL(t) */`). Enthalten Ihre Statements solche Hints, sollten Sie auf das Minifizieren verzichten und die formatierte Fassung beibehalten.

Da SQL-Skripte regelmäßig interne Tabellenmodelle, Geschäftslogik und produktive Kundenkennungen offenlegen, erfolgen Tokenisierung, Analyse, Diff-Prüfung und der 10-Einträge-Verlauf vollständig lokal in Ihrem Browser ohne jegliche Serverübertragung.
