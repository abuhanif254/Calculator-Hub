---
title: "Datumsrechner"
metaTitle: "Datumsrechner: Tage zwischen zwei Daten & Fristen prüfen"
description: "Ermitteln Sie die genaue Anzahl von Tagen, Wochen, Monaten und Jahren zwischen zwei Daten oder addieren und subtrahieren Sie beliebige Zeiträume."
metaDescription: "Berechnen Sie exakt Tage, Wochen, Monate und Jahre zwischen zwei Daten oder addieren Sie Zeiträume – inkl. Schaltjahren und BGB-Fristregeln im DACH-Raum."
metaKeywords: "datumsrechner, tage zwischen zwei daten berechnen, datum addieren subtrahieren, fristenrechner bgb, schaltjahr regel, kalendertage berechnen"
faqs:
  - question: "Wann sollte ich die Option Endtag einbeziehen aktivieren?"
    answer: "Aktivieren Sie den Endtag immer dann, wenn sowohl der erste als auch der letzte Kalendertag vollständig mitzählen – etwa bei Urlaubstagen, Projekttagen, Mietwagen oder einer Beginnfrist nach § 187 Abs. 2 BGB. Für Übernachtungen oder klassische Ereignisfristen (z. B. 14-tägige Widerrufsfrist) bleibt der Endtag deaktiviert."
  - question: "Warum ist das Jahr 2000 ein Schaltjahr, das Jahr 2100 jedoch nicht?"
    answer: "Nach der gregorianischen Kalenderregel ist ein Jahr ein Schaltjahr, wenn es durch 4 teilbar ist – ausgenommen volle Jahrhunderte, sofern diese nicht zusätzlich durch 400 teilbar sind. Da 2000 durch 400 teilbar ist, hatte es einen 29. Februar; 1900 und 2100 bleiben dagegen Gemeinjahre mit 365 Tagen."
  - question: "Was passiert, wenn ich zum 31. Januar einen Monat addiere?"
    answer: "Unser Datumsrechner nutzt die sogenannte Monatsende-Kappung: Weil der Februar keinen 31. Tag besitzt, wird das Ergebnis sauber auf den letzten gültigen Tag des Zielmonats begrenzt – also den 28. Februar im Gemeinjahr beziehungsweise den 29. Februar im Schaltjahr, statt unintuitiv in den März überzulaufen."
  - question: "Verfälscht die Umstellung zwischen Sommer- und Winterzeit das Ergebnis?"
    answer: "Nein. Der Rechner normiert sämtliche Datumsangaben intern auf UTC-Mitternacht mit exakt 86.400 Sekunden pro Kalendertag. Dadurch führen die 23-Stunden-Tage im März und 25-Stunden-Tage im Oktober niemals zu einem Versatz um einen ganzen Tag."
  - question: "Berücksichtigt der Datumsrechner Wochenenden und gesetzliche Feiertage für rechtliche Fristen?"
    answer: "Der Rechner zählt exakte Kalendertage und zeigt für das Zieldatum direkt den Wochentag an. Fällt ein gesetzliches Fristende auf einen Samstag, Sonntag oder regionalen Feiertag, prüfen Sie zusätzlich die Verschiebung auf den nächsten Werktag nach § 193 BGB (Deutschland), § 903 ABGB (Österreich) oder Art. 78 OR (Schweiz)."
---

Wie viele Kalendertage liegen zwischen Vertragsbeginn und Kündigungstermin? Auf welchen Wochentag fällt eine 90-Tage-Zahlungsfrist? Und wie viele volle Monate und Resttage umfasst ein Bauprojekt über ein Schaltjahr hinweg? Weil unser gregorianischer Kalender Monate mit **28, 29, 30 und 31 Tagen** sowie besondere Schaltjahr-Ausnahmen mischt, führen Überschlagsrechnungen im Kopf rasch zu Fehlern von mehreren Tagen. Unser **Datumsrechner** automatisiert beide Kernaufgaben zuverlässig: die exakte Zeitspanne zwischen zwei Kalendertagen sowie das punktgenaue Addieren und Subtrahieren von Jahren, Monaten, Wochen und Tagen.

## Kalenderlogik, Schaltjahrregel und Berechnungsformeln

Für konsistente Resultate ohne Zeitzonen- oder Sommerzeitfehler überführt der Rechner jedes eingegebene Datum in einen **UTC-Mitternachtszeitstempel** (`00:00:00 UTC`), bei dem jeder Kalendertag exakt **86.400.000 Millisekunden** (86.400 Sekunden) umfasst. Die exakten Regeln beider Rechenmodi lauten:

```text
Gregorianisches Schaltjahr J:
  Schaltjahr ⇔ (J mod 4 = 0 UND J mod 100 ≠ 0) ODER (J mod 400 = 0)
  Mittlere Jahreslänge = 365 + 1/4 − 1/100 + 1/400 = 365,2425 Tage

Tagesdifferenz (Modus Zeitspanne):
  ΔT_exkl = (t_Ende − t_Start) / 86.400.000 ms
  ΔT_inkl = ΔT_exkl + 1                      (mit Option Endtag einbeziehen)
  Wochen  = ΔT / 7

Kalenderaddition / -subtraktion (Modus Hinzufügen/Abziehen):
  1. Zieljahr & Zielmonat anpassen, Tag kappen: Tag_neu = min(Tag_Start, Tage_im_Zielmonat)
  2. Exakte Wochen und Tage verschieben:        Datum_Ziel = Datum_gekappt ± (7 × W + D)
```

Dabei stehen **t_Start** und **t_Ende** für die normierten UTC-Zeitstempel von Anfangs- und Enddatum, **ΔT** für die exakte Anzahl der Kalendertage, **W** für volle Wochen und **D** für einzelne Tage. Bei der kalendarischen Zerlegung in **Jahre, Monate und Resttage** zieht der Algorithmus zunächst Jahres-, Monats- und Tageskomponenten voneinander ab; entsteht eine negative Tagesdifferenz, borgt er exakt die tatsächliche Tagesanzahl des unmittelbar vorangehenden Monats (`28`, `29`, `30` oder `31`), sodass kein pauschaler 30-Tage-Schätzwert entsteht.

## Rechenbeispiele: Schaltjahr-Zeitspanne und Monatsende-Frist

### Beispiel 1: Exakte Dauer über ein Schaltjahr (15.01.2024 bis 10.03.2026)

Ein langfristiger Projektvertrag läuft vom **15. Januar 2024** bis zum **10. März 2026**. Gesucht sind die absoluten Kalendertage, die Wochenanzahl sowie die kalendarische Aufschlüsselung.

1. **Volle Jahre abgrenzen:** Vom `15.01.2024` bis zum `15.01.2025` liegen **366 Tage**, da der Schalttag **29. Februar 2024** im Zeitraum enthalten ist. Vom `15.01.2025` bis zum `15.01.2026` folgen **365 Tage** (Gemeinjahr 2025).
2. **Restmonate und Resttage bestimmen:** Vom `15.01.2026` bis zum `15.02.2026` vergeht genau **1 Monat** (**31 Tage**). Danach verbleiben im Februar 2026 (`28 − 15 = 13 Tage`) plus **10 Tage** im März exakt **23 Resttage**.
3. **Gesamtergebnis (ohne Endtag):** `366 + 365 + 31 + 23 = 785 Tage`, das entspricht **112,14 Wochen** (112 Wochen und 1 Tag) beziehungsweise kalendarisch **2 Jahren, 1 Monat und 23 Tagen**.
4. **Mit aktiviertem Endtag:** Zählen Start- und Enddatum als volle Einsatztage mit, erhöht sich die Spanne um einen Tag auf **786 Tage** (`112,29 Wochen` bzw. **2 Jahre, 1 Monat und 24 Tage**).

### Beispiel 2: Datum addieren mit Monatsende-Kappung (31.01.2026 + 1 Monat + 14 Tage)

Ausgehend vom **31. Januar 2026** addieren Sie **1 Monat** und **14 Tage**. Zuerst springt der Rechner auf den Februar 2026 und kappt den nicht existierenden 31. auf den **28. Februar 2026** (2026 ist kein Schaltjahr). Anschließend addiert er exakt 14 Tage und landet auf **Samstag, dem 14. März 2026**. Handelt es sich um eine gesetzliche Abgabe- oder Zahlungsfrist im deutschen Recht, greift zusätzlich **§ 193 BGB**: Die Frist verlängert sich automatisch auf den nächsten Werktag, **Montag, den 16. März 2026**.

## Referenztabelle: Zähl- und Fristkonventionen im DACH-Raum

Je nach Rechtsgebiet oder Branche entscheidet ein einziger Tag über wirksame Kündigungen, Verzugszinsen oder Mietkosten. Die Übersicht ordnet die wichtigsten Konventionen ein:

| Anwendungsfall | Maßgebliche Regel / Konvention | Endtag einbeziehen? | Wichtige Besonderheit |
| :--- | :--- | :--- | :--- |
| **Widerrufs- & Kündigungsfrist (Ereignisfrist)** | § 187 Abs. 1, § 188 BGB / Art. 77 OR | Nein | Tag des Zugangs zählt nicht mit; Ende bei Wochenende am nächsten Werktag (§ 193 BGB) |
| **Miet- oder Arbeitsbeginn (Beginnfrist)** | § 187 Abs. 2 BGB / § 902 ABGB | Ja | Anfangstag zählt voll mit; ein Jahresvertrag ab 01.04. endet am 31.03. des Folgejahres |
| **Hotelbuchung (Übernachtungen)** | Differenz `Abreise − Anreise` | Nein | Anreise 10.07., Abreise 14.07. ergibt exakt 4 Nächte (bei 5 Urlaubstagen) |
| **Bankzinsen (Tagzählmethode)** | `ACT/ACT` vs. deutsch `30E/360` | Nein | Datumsrechner zählt `ACT/ACT`; die kaufmännische Zinsmethode setzt jeden Monat pauschal auf 30 Tage |
| **Kalenderwochen (Projektplanung)** | ISO 8601 / DIN EN 28601 | Abhängig vom Plan | Woche beginnt montags; KW 1 ist die erste Woche mit mindestens vier Tagen im neuen Jahr |

## Typische Stolpersteine und Praxistipps bei Datumsrechnungen

- **Werktag und Arbeitstag sauber unterscheiden:** Im deutschen Recht (BGB, BUrlG) zählt der **Samstag als Werktag** (6 Werktage pro Woche), während Banken, Behörden und viele Tarifverträge nur Montag bis Freitag als **Arbeitstage** bzw. **Bankarbeitstage** anerkennen. Prüfen Sie bei knappen Terminen stets den Wortlaut des Vertrags.
- **Reihenfolge bei kombinierten Additionen beachten:** Die Addition von „1 Monat + 1 Tag“ ab dem 30. Januar ergibt über die Monatskappung den `1. März` (`28. Februar + 1 Tag`). Vertauscht man die Reihenfolge manuell („erst +1 Tag auf den 31. Januar, dann +1 Monat“), landet man wegen der Kappung am `28. Februar`. Nutzen Sie für rechtliche Monatsfristen daher stets die konsistente Reihenfolge Jahre → Monate → Tage.
- **Regionale Feiertage im DACH-Raum gegenprüfen:** Gesetzliche Feiertage unterscheiden sich je nach Bundesland (z. B. Fronleichnam, Allerheiligen, Reformationstag) und Schweizer Kanton erheblich. Ein Datumsrechner zeigt Ihnen zuverlässig das exakte Kalenderdatum samt Wochentag – für verbindliche Behörden- oder Gerichtsfristen gleichen Sie das Zieldatum unbedingt mit dem lokalen Feiertagskalender ab.
- **Zinsmethoden nicht vermischen:** Wenn Sie Verzugs- oder Anlagezinsen auf Tagesbasis nachrechnen, klären Sie vorab, ob Ihre Bank kalendergenau (`ACT/365` bzw. `ACT/ACT` – direkt aus diesem Datumsrechner ablesbar) oder kaufmännisch (`30E/360`) abrechnet.
