---
metaTitle: "CSV Viewer, Editor & Analyzer Online | CSV zu JSON Tool"
metaDescription: "CSV-Dateien lokal im Browser öffnen, bearbeiten, validieren und analysieren. Mit Trennzeichen-Erkennung, Fehlerprüfung und CSV-zu-JSON-Export."
metaKeywords: "csv viewer, csv editor online, csv analyzer, csv datei öffnen, csv in json umwandeln, json in csv konvertieren, csv validator, rfc 4180 parser, semikolon csv öffnen, csv tabelle"
title: "CSV Viewer & Analyzer"
shortDescription: "Öffnen, bearbeiten, validieren und analysieren Sie CSV-Dateien lokal im Browser in einer schnellen Tabellenansicht. Mit RFC-4180-Parser, automatischer Trennzeichen-Erkennung, Datenqualitätsprüfung und bidirektionaler CSV-JSON-Konvertierung."
faqs:
  - question: "Warum bleiben führende Nullen und ISO-Datumsangaben erhalten, die Excel oft verfälscht?"
    answer: "Klassische Tabellenkalkulationen wandeln numerisch wirkende Zeichenketten wie deutsche Postleitzahlen (01067), Artikelnummern oder 16-stellige Transaktions-IDs beim Öffnen automatisch in Gleitkommazahlen um und formatieren ISO-Daten neu. Dieser Parser speichert jede Zelle unverändert als Roh-String und führt die Typanalyse getrennt davon aus."
  - question: "Welche Trennzeichen und Zeilenenden erkennt der Parser automatisch?"
    answer: "Die Trennzeichen-Heuristik analysiert die ersten fünf nicht-leeren Zeilen, ignoriert dabei Trenner innerhalb doppelter Anführungszeichen und unterscheidet zuverlässig Komma, Semikolon, Tabulator und Pipe-Zeichen über Windows-CRLF und Unix-LF hinweg."
  - question: "Wie schützt der Export vor gefährlicher CSV-Formel-Injektion?"
    answer: "Bei der CSV- und TSV-Serialisierung wird jedem Feldwert, der mit =, +, -, @, einem Tabulator oder einem Wagenrücklauf beginnt, automatisch ein einfaches Apostroph vorangestellt. Microsoft Excel und LibreOffice Calc behandeln die Zelle dadurch als reinen Text statt als ausführbare Formel."
  - question: "Lassen sich verschachtelte oder uneinheitliche JSON-Arrays in eine flache CSV-Tabelle umwandeln?"
    answer: "Ja. Der JSON-zu-CSV-Konverter durchläuft sämtliche Objekte des Eingabe-Arrays, bildet die vollständige Vereinigungsmenge aller Schlüssel als Spaltenüberschriften, lässt fehlende Eigenschaften leer und serialisiert verschachtelte Objekte oder Arrays sauber als maskierte JSON-Strings."
  - question: "Werden sensible Finanz-, Kunden- oder Personaldaten an einen Server hochgeladen?"
    answer: "Nein. Dateieinlesen, RFC-4180-Tokenisierung, Spaltenanalyse, Inline-Bearbeitung und alle Exporte laufen vollständig im lokalen Browser-Tab. Zwischenstände werden ausschließlich im localStorage Ihres Geräts abgelegt."
features:
  - "RFC-4180-Zustandsautomat für maskierte Felder, doppelte Anführungszeichen, mehrzeilige Zellen und automatische UTF-8-BOM-Entfernung"
  - "Automatische Trennzeichen-Erkennung für Komma-, Semikolon-, Tabulator- und Pipe-getrennte Datensätze"
  - "Interaktive Tabellenansicht mit Doppelklick-Inline-Bearbeitung, 20-stufigem Rückgängig/Wiederherstellen, numerischer Sortierung und Spaltenauswahl"
  - "Globale Zellensuche mit optionaler Groß-/Kleinschreibung, Treffernavigation und Echtzeit-Zeilenfilterung"
  - "Datenqualitäts-Validator und Analyse-Dashboard für Spaltentypen, Leerzellen, exakte Zeilenduplikate und abweichende Spaltenzahlen"
  - "Bidirektionale CSV-zu-JSON- und JSON-zu-CSV-Konvertierung sowie vor Formel-Injektion geschützter Export als CSV, TSV, JSON und TXT"
useCases:
  - "Prüfen von DATEV-, Stripe-, ERP- oder CRM-Exporten, ohne dass Tabellenkalkulationen Postleitzahlen, Artikelnummern oder Zeitstempel verfälschen"
  - "Aufspüren fehlerhafter Zeilen, fehlender Spaltenköpfe und doppelter Datensätze vor einem PostgreSQL-COPY- oder Snowflake-Bulk-Import"
  - "Umwandeln von REST-API-JSON-Antworten in saubere CSV-Tabellen für Controlling, Einkauf oder Fachabteilungen"
  - "Konvertieren tabellarischer Produktkataloge und Konfigurationsmatrizen in strukturierte JSON-Arrays für Frontend-Seed-Dateien"
  - "Schnelles Bearbeiten einzelner Zellen und Filtern deutschsprachiger Semikolon-CSVs direkt im Browser ohne Excel-Installation"
  - "Auswerten tabulatorgetrennter Server-Logs und Exportieren ausgerichteter ASCII-Tabellen für Jira-Tickets oder technische Protokolle"
howToSteps:
  - "Laden Sie eine lokale .csv- oder .tsv-Datei per Drag-and-Drop hoch, fügen Sie Rohdaten aus der Zwischenablage ein oder starten Sie mit einem Beispieldatensatz."
  - "Prüfen Sie die geparste Tabelle im Viewer-Tab, sortieren Sie Spalten per Klick auf die Kopfzeile numerisch oder alphabetisch und grenzen Sie Zeilen über die Filterleiste ein."
  - "Nutzen Sie die globale Suchleiste mit optionaler Groß-/Kleinschreibung, um Treffer in großen Tabellen gezielt hervorzuheben und anzuspringen."
  - "Klicken Sie doppelt auf eine beliebige Zelle zur Inline-Bearbeitung und nutzen Sie Strg+Z sowie Strg+Umschalt+Z für bis zu 20 Rückgängig- und Wiederherstellen-Schritte."
  - "Öffnen Sie die Tabs Analyse und Validierung, um abgeleitete Spaltentypen, Leerzellen, Duplikate und zeilennummerierte Spaltenfehler auszuwerten."
  - "Wechseln Sie für Schemakonvertierungen zu CSV zu JSON oder JSON zu CSV oder laden Sie den bereinigten Datensatz als CSV, TSV, JSON oder TXT herunter."
---

Comma-Separated Values (CSV) bleibt das universelle Austauschformat zwischen Datenbanken, ERP-Systemen, Buchhaltungslösungen und SaaS-Plattformen – dennoch birgt das Öffnen einer rohen CSV-Datei in klassischen Desktop-Tabellenkalkulationen erhebliche Risiken. Gerade im DACH-Raum schneidet Excel stillschweigend führende Nullen bei Postleitzahlen ab (`01067` wird zu `1067`), rundet 16-stellige Transaktionsnummern in wissenschaftliche Notation und quetscht englische Komma-CSVs oder deutsche Semikolon-Exporte bei abweichender Gebietsschema-Einstellung in eine einzige unleserliche Spalte. Unser **CSV Viewer & Analyzer** verarbeitet Ihre Dateien lokal im Arbeitsspeicher des Browsers über einen strikten RFC-4180-Zustandsautomaten. So bleiben Rohwerte exakt erhalten, während Sie Daten komfortabel sortieren, filtern, inline bearbeiten, validieren und verlustfrei nach JSON konvertieren – vollständig ohne Server-Upload.

## RFC-4180-Zustandsautomat, UTF-8-BOM und Trennzeichen-Heuristik

Produktive CSV-Exporte bestehen selten aus simplen Wörtern zwischen Kommas. Naive `zeile.split(',')`-Skripte brechen sofort zusammen, sobald eine Artikelbezeichnung ein Komma enthält, eine Lieferadresse über zwei Zeilen läuft oder ein Produkttitel Zollzeichen trägt. Dieses Tool nutzt daher einen zeichenweisen endlichen Zustandsautomaten, der sämtliche Randfälle von RFC 4180 zuverlässig abdeckt:

- **UTF-8-BOM-Bereinigung:** Excel und zahlreiche Windows-Reporting-Tools stellen UTF-8-Dateien ein unsichtbares Byte Order Mark (`0xFEFF`) voran. Bleibt dieses Präfix erhalten, verfälscht es den ersten Spaltennamen (`ID` wird zu `\uFEFFID`) und lässt anschließende Feldzugriffe in JavaScript oder Python fehlschlagen. Der Parser entfernt führende BOM-Bytes automatisch vor der Zerlegung.
- **Maskierte Felder und doppelte Anführungszeichen:** Ein öffnendes doppeltes Anführungszeichen aktiviert den Quote-Modus, sodass enthaltene Trennzeichen sowie `CRLF`- oder `LF`-Zeilenumbrüche innerhalb der aktiven Zelle verbleiben. Zwei aufeinanderfolgende Anführungszeichen (`""`) innerhalb eines maskierten Feldes werden korrekt als einzelnes literales `"` dekodiert.
- **Heuristische Trennzeichen-Erkennung:** Vor dem eigentlichen Parsen untersucht die Engine die ersten fünf nicht-leeren Zeilen und zählt unmaskierte Vorkommen von `,`, `;`, `\t` und `|`. Trennzeichen, die in jeder Stichprobenzeile exakt dieselbe positive Anzahl liefern, erhalten einen zehnfachen Konsistenzfaktor – dadurch werden deutschsprachige Semikolon-Exporte, TSV-Dumps und internationale Komma-Dateien sicher unterschieden.

Das folgende Beispiel zeigt, wie RFC-4180-Zustandsverfolgung verschachtelte Anführungszeichen und mehrzeilige Zellinhalte sauber trennt:

```csv
ArtikelNr;Bezeichnung;Hinweise;Preis
PRD-004;"27"" 4K-Monitor";"Inkl. HDMI-, DP-
und USB-C-Kabel";549.99
PRD-012;"34"" Ultrawide-Monitor";"Flachverpackt geliefert";899.99
```

Hier dekodiert der Parser `27""` exakt zu `27"`, und der zweizeilige Eintrag unter `Hinweise` verbleibt sauber in Spalte 3 von Datensatz 1, statt eine fehlerhafte Zusatzzeile zu erzeugen.

## Exportformate und Trennzeichen-Spezifikationen im Vergleich

Je nach nachgelagertem Zielsystem gelten strikte Erwartungen an Maskierung, Leerzeichen und Datenstruktur. Die folgende Matrix erleichtert die Wahl des passenden Exportformats für Ihre Daten-Pipeline:

| Exportformat | MIME-Typ | Trenn- und Maskierungsregeln | Schematreue | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- |
| **CSV (`.csv`)** | `text/csv` | Kommagetrennt; RFC-4180-Maskierung per Doppel-Anführungszeichen | Flaches Textraster mit einheitlicher Spaltenzahl | Datenbank-`COPY`, CRM-Importe, Tabellenkalkulation |
| **TSV (`.tsv`)** | `text/tab-separated-values` | Tabulatorgetrennt (`\t`); Maskierung nur bei Bedarf | Flaches Textraster; kaum Kollisionen mit Kommas | Bioinformatik, Unix-Pipelines mit `awk` und `cut` |
| **JSON (`.json`)** | `application/json` | Array aus Schlüssel-Wert-Objekten mit 2 Leerzeichen Einrückung | Explizite Schlüssel-Zuordnung je Datensatz | REST-APIs, NoSQL-Seeds, JavaScript-/Python-Apps |
| **Pipe-TXT (`.txt`)** | `text/plain` | Leerzeichen-aufgefüllte ` \| `-Spalten mit Trennzeile | Visuelle Festbreiten-Ausrichtung | Jira-Tickets, Slack-Berichte, Klartext-Protokolle |

## Automatische Spaltenprofilierung, Datenvalidierung und Konvertierung

Unmittelbar nach dem Laden durchläuft jeder Datensatz parallel zur interaktiven Tabellenansicht zwei diagnostische Prüfschritte.

### Typableitung und strukturelle Fehlerdiagnose

Zur Bewertung der Spaltenhomogenität prüft der Analyzer sämtliche nicht-leeren Zellen jeder Spalte gegen boolesche Werte (`true`, `false`, `yes`, `no`), numerische Muster sowie fünf gängige Datumsformate (`YYYY-MM-DD`, `MM/DD/YYYY`, `MM-DD-YYYY`, `YYYY/MM/DD` und `D Mon YYYY`). Entsprechen mindestens **80 %** der belegten Werte einer Kategorie, wird der Spaltentyp entsprechend klassifiziert; uneinheitliche Spalten erscheinen als `mixed` und machen Dateningenieure vor dem Import auf inkonsistente Einträge aufmerksam.

Zeitgleich erkennt der Validator strukturelle Mängel, die ETL-Prozesse abbrechen lassen:
- **Abweichende Spaltenanzahl:** Zeilen mit weniger Feldern als in der Kopfzeile erzeugen eine Warnung (`warning`) und werden im normalisierten Raster mit Leerstrings aufgefüllt; überzählige Felder lösen einen Fehler (`error`) inklusive exakter 1-basierter Zeilennummer aus.
- **Kopfzeilen-Integrität:** Leere Spaltennamen sowie doppelt vergebene Überschriften (unabhängig von Groß-/Kleinschreibung) werden sofort markiert, damit bei einer JSON-Konvertierung keine Objektschlüssel stillschweigend überschrieben werden.
- **Exakte Duplikate:** Jede Datenzeile erhält über ein Nullbyte-Trennzeichen (`\x00`) einen eindeutigen Fingerabdruck in einem Hash-Set, um exakte Dubletten neben Leerzellen-Summen und geschätzter Dateigröße auszuweisen.

### Bidirektionale JSON-Transformation und Begleitwerkzeuge

Über die Tabs **CSV zu JSON** und **JSON zu CSV** wechseln Sie ohne eigene Python-Skripte zwischen Tabellen- und Dokumentformaten. Bei heterogenen JSON-Arrays mit optionalen Eigenschaften ermittelt der Konverter die vollständige Schlüssel-Vereinigungsmenge über alle Elemente und serialisiert verschachtelte Unterobjekte sicher als Textzellen. Für tiefgehende Prüfungen oder das Minifizieren umfangreicher JSON-Ausgaben bietet sich anschließend der [JSON Formatter](/de/werkzeuge/json-formatter) an. Sollen bereinigte Datensätze als responsive Vergleichstabelle im Web veröffentlicht werden, übernimmt der [HTML-Tabellen-Generator](/de/werkzeuge/html-table-generator) den Export direkt. Und wenn Sie Datenbankauszüge mit der zugrunde liegenden Abfrage abgleichen, sorgt der [SQL Formatter](/de/werkzeuge/sql-formatter) für übersichtliche Extraktions-Queries.

## Schutz vor CSV-Formel-Injektion beim Tabellen-Export

Ein häufig unterschätztes Sicherheitsrisiko webbasierter Exporte ist die **CSV-Injektion** (auch Formel- oder DDE-Injektion genannt). Trägt ein externer Nutzer etwa `=HYPERLINK("https://example.com","Klick")` oder `+cmd|' /C calc'!A0` in ein Webformular ein, können Microsoft Excel oder LibreOffice Calc beim Öffnen des späteren CSV-Exports Formeln ausführen oder Zellinhalte nach außen leiten.

Bei der `.csv`- und `.tsv`-Serialisierung neutralisiert dieses Tool solche Eingaben automatisch, indem es vor dem RFC-4180-Quoting jedem Wert mit den Anfangszeichen `=`, `+`, `-`, `@`, `\t` oder `\r` ein einzelnes Apostroph (`'`) voranstellt. Beachten Sie dabei einen praktischen Nebeneffekt: Enthält Ihr Datensatz reguläre negative Zahlen wie `-42.50`, die für einen automatisierten SQL- oder Python-Import statt für Excel bestimmt sind, wählen Sie bevorzugt den **JSON-Export** oder entfernen Anzeige-Präfixe im Ziel-Parser. Dank rein lokaler Browser-Verarbeitung bleiben Ihre geschäftskritischen Tabellen jederzeit DSGVO-konform auf Ihrem Gerät.
