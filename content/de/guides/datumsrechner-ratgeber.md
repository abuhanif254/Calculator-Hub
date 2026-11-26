---
title: "Der ultimative Datumsrechner-Leitfaden: Zeit addieren, subtrahieren und messen"
description: "Erfahren Sie, wie Sie die genaue Dauer zwischen zwei Daten berechnen, Werktage sowie gesetzliche Fristen bestimmen und unseren Datumsrechner präzise nutzen."
category: "Productivity & Utilities"
relatedCalculator: "date-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist im deutschen Recht der Unterschied zwischen Werktagen und Arbeitstagen?"
    answer: "Als Arbeitstage gelten im allgemeinen Sprachgebrauch die Tage Montag bis Freitag. Werktage im Sinne des deutschen Rechts (etwa gemäß § 193 BGB oder § 3 Abs. 2 Bundesurlaubsgesetz) umfassen hingegen alle Kalendertage außer Sonntagen und gesetzlichen Feiertagen – der Samstag zählt rechtlich also als Werktag."
  - question: "Wie funktioniert die Schaltjahr-Regel im Gregorianischen Kalender?"
    answer: "Ein Jahr ist ein Schaltjahr mit 366 Tagen, wenn die Jahreszahl ohne Rest durch 4 teilbar ist. Ausgenommen sind volle Jahrhunderte (teilbar durch 100), es sei denn, sie sind gleichzeitig durch 400 teilbar. Daher war das Jahr 2000 ein Schaltjahr, während 1900 kein Schaltjahr war und 2100 ebenfalls keines sein wird."
  - question: "Wird der Starttag bei der Berechnung einer Frist mitgezählt?"
    answer: "Das hängt von der Fristart ab: Bei einer sogenannten Ereignisfrist (§ 187 Abs. 1 BGB), etwa nach Zugang einer Kündigung oder einer Lieferung, wird der Tag des Ereignisses nicht mitgezählt; die Frist beginnt am Folgetag um 00:00 Uhr. Bei einer Beginnfrist (§ 187 Abs. 2 BGB), etwa dem Start eines Arbeitsverhältnisses am Monatsersten, zählt der erste Tag voll mit."
  - question: "Warum führt die Addition von einem Monat je nach Startdatum zu unterschiedlichen Ergebnissen?"
    answer: "Da Monate zwischen 28 und 31 Tagen lang sind, ist die Operation «+ 1 Monat» nicht streng umkehrbar. Addiert man zum 31. Januar einen Monat, wird das Ergebnis mangels 31. Februar auf den Monatsletzten (28. bzw. 29. Februar) gekappt. Subtrahiert man von diesem Ergebnis wieder einen Monat, landet man beim 28. oder 29. Januar."
  - question: "Was passiert, wenn eine vertragliche oder gesetzliche Frist auf ein Wochenende fällt?"
    answer: "Nach § 193 BGB verlängert sich die Frist automatisch bis zum Ablauf des nächsten Werktags, wenn das Fristende auf einen Sonntag, einen staatlich anerkannten allgemeinen Feiertag oder einen Sonnabend fällt. Diese Schutzregel gilt für Willenserklärungen und Leistungen, nicht jedoch für reine Lebensalter- oder Schutzfristen."
---

Eine verlässliche Datumsberechnung entscheidet im Arbeitsalltag, im Projektmanagement und im Vertragsrecht über die Einhaltung verbindlicher Termine. Da unser Kalender auf unregelmäßigen Monatslängen zwischen 28 und 31 Tagen, Schaltjahren sowie regional unterschiedlichen Feiertagen basiert, versagt einfaches Kopfrechnen häufig schon bei kurzen Zeitspannen von wenigen Wochen.

Ob Sie die exakte Kalendertagesdifferenz zwischen zwei Stichtagen ermitteln, eine Kündigungsfrist nach dem Bürgerlichen Gesetzbuch (BGB) bestimmen oder einen Projektmeilenstein um eine feste Zahl von Arbeitstagen verschieben möchten: Unser [Datumsrechner](/de/rechner/datumsrechner) berücksichtigt alle kalendarischen Besonderheiten automatisch und liefert sowohl die Gesamtzahl der Tage als auch die aufgeschlüsselte Dauer nach Jahren, Monaten, Wochen und Wochentagen.

## Kalendermathematik: Gregorianische Regeln und Zählweisen

Die Grundlage jeder modernen Datumsrechnung bildet der Gregorianische Kalender, der eine mittlere Jahreslänge von `365,2425` Tagen vorgibt, um das astronomische Sonnenjahr (`365,2422` Tage) langfristig synchron zu halten. Für exakte Berechnungen über mehrere Jahre hinweg prüfen Algorithmen jedes berührte Jahr auf die Schaltjahrbedingung und wandeln Daten intern häufig in fortlaufende Tagesnummern (Julianische Tageszahl) um.

```text
Schaltjahr:  (Jahr mod 4 = 0 UND Jahr mod 100 ≠ 0) ODER (Jahr mod 400 = 0)
Kalendertage: ΔTage = Tagesnummer(Enddatum) − Tagesnummer(Startdatum)
Monatsaddition: Tag_neu = min(Tag_Start, LetzterTagDesMonats(Zielmonat, Zieljahr))
```

In der Praxis müssen vor der Berechnung drei zentrale Parameter eindeutig festgelegt werden:

* **Inklusiv- versus Exklusivzählung:** Die reine Differenz (`Enddatum − Startdatum`) zählt den Starttag nicht mit (wie bei Hotelübernachtungen oder Zinstagen). Soll der Starttag als voller Nutzungstag gelten (etwa bei Urlaubstagen oder der Laufzeit eines Abonnements), muss `+ 1 Tag` addiert werden.
* **Kalendertage, Arbeitstage und Werktage:** Kalendertage umfassen alle sieben Wochentage. Arbeitstage beschränken sich üblicherweise auf Montag bis Freitag abzüglich gesetzlicher Feiertage am Arbeitsort. Werktage schließen im deutschen Recht (etwa im Bundesurlaubsgesetz oder nach § 193 BGB) auch den Samstag mit ein.
* **Ereignis- versus Beginnfrist (§ 187 BGB):** Wird eine Frist durch ein untertägiges Ereignis ausgelöst (zum Beispiel den Erhalt einer Rechnung), beginnt die Zählung erst am darauffolgenden Tag. Steht ein fester Kalendertag als Beginn fest (etwa der 1. eines Monats), zählt dieser Tag mit.

## Schritt-für-Schritt-Beispiel: Projektfrist mit Feiertagen berechnen

Angenommen, ein IT-Dienstleister erhält am **Montag, dem 16.03.2026**, eine schriftliche Beauftragung. Vertraglich vereinbart ist eine Umsetzungsfrist von exakt **45 Arbeitstagen** (Montag bis Freitag), wobei bundeseinheitliche Feiertage am Firmensitz in Deutschland nicht als Arbeitstage zählen. Da die Frist durch den Auftragseingang ausgelöst wird, gilt die Ereignisfrist nach § 187 Abs. 1 BGB: Die Zählung startet am Dienstag, dem 17.03.2026.

1. **März-Anteil bestimmen:** Vom 17.03. bis 20.03.2026 fallen `4` Arbeitstage an. In den beiden Folgewochen (23.03.–02.04.) folgen `5 + 4 = 9` Arbeitstage, da **Karfreitag (03.04.2026)** ein gesetzlicher Feiertag ist (Zwischenstand: `13`).
2. **April-Wochen zählen:** In der Osterwoche entfällt der **Ostermontag (06.04.2026)**, sodass bis 10.04. `4` Arbeitstage zählen (Summe: `17`). Vom 13.04. bis 24.04. folgen `10` Tage (Summe: `27`). In der Woche bis 01.05. entfällt der **Tag der Arbeit (01.05.2026)** (`+4` Tage, Summe: `31`).
3. **Mai-Wochen prüfen:** Vom 04.05. bis 08.05. entstehen `5` Arbeitstage (Summe: `36`). Da **Christi Himmelfahrt auf Donnerstag, den 14.05.2026** fällt, liefert die Woche vom 11.05. bis 15.05. nur `4` Tage (Summe: `40`). Die letzten `5` Arbeitstage laufen bis **Freitag, den 22.05.2026**.
4. **Gegenprobe in Kalendertagen:** Zwischen 16.03. und 22.05.2026 liegen `15 + 30 + 22 = 67` Kalendertage. Abzüglich `9` Wochenenden (`18` Tage) und `4` Feiertage verbleiben exakt `67 − 18 − 4 = 45` Arbeitstage.

## Zählmethoden und Zeitstandards im direkten Vergleich

Je nach Fachbereich gelten unterschiedliche Konventionen dafür, wie Monate, Schaltjahre und Wochenenden gewichtet werden. Die folgende Übersicht stellt die wichtigsten Verfahren im DACH-Raum gegenüber:

| Zählmethode / Norm | Gezählte Tage pro Jahr | Schaltjahr- & Monatslogik | Typische Spanne für «30 Einheiten» | Primärer Anwendungsbereich |
| :--- | :--- | :--- | :--- | :--- |
| **Kalendertage (exakt / act)** | `365` bzw. `366` | Jede Monatslänge exakt (`28–31` Tage) | `30` Kalendertage | Mietfristen, Gewährleistung, Reiseplanung |
| **Arbeitstage (Mo–Fr)** | ca. `250–255` (je nach Land) | Wochenenden und Feiertage ausgeschlossen | `42–44` Kalendertage | Projektpläne, Lieferzeiten, B2B-SLAs |
| **Werktage (BGB / BUrlG)** | ca. `300–305` | Montag bis Samstag abzüglich Feiertage | `35–37` Kalendertage | Gesetzliche Fristen, Urlaubsanspruch |
| **Deutsche Zinsmethode (`30E/360`)** | `360` | Jeder Monat pauschal `30` Tage | exakt `30` Tage (= `1/12` Jahr) | Bankdarlehen, Verzugszinsen, Kontokorrent |
| **ISO 8601 / DIN EN 28601** | `365` bzw. `366` | Woche startet montags; KW 1 mit erstem Donnerstag | `4` Wochen + `2` Tage | Logistik, Schichtpläne, Datenaustausch (`JJJJ-MM-TT`) |
| **Bankarbeitstage (TARGET2)** | ca. `255–258` | Ohne Wochenenden und EU-Bankfeiertage | ca. `42–45` Kalendertage | SEPA-Überweisungen, Wertpapier-Settlement |

## Praxisanwendung, Fehlerquellen und rechtliche Hinweise

Im Unternehmens- und Privatbereich dient präzise Datumsarithmetik der Kontrolle von Probezeiten, Mutterschutz- und Elternzeitkorridoren, Verjährungsfristen (regelmäßige Verjährung von drei Jahren zum Jahresende nach §§ 195, 199 BGB) sowie der Terminierung von Bauabnahmen.

In der Praxis treten vier häufige Fehlerquellen auf:

1. **Verwechslung von Werk- und Arbeitstagen:** Wer bei «10 Werktagen» nur Montage bis Freitage zählt, übersieht den Samstag als rechtlichen Werktag und kalkuliert zwei Tage zu großzügig.
2. **Regionale Feiertage:** Neben bundeseinheitlichen Feiertagen verschieben Fronleichnam, Mariä Himmelfahrt, Reformationstag oder Allerheiligen das Fristende je nach Bundesland oder Kanton.
3. **Asymmetrie bei Monatsenden:** Nach § 188 Abs. 3 BGB endet eine Monatsfrist am Monatsletzten, wenn der Zielmonat den Ausgangstag nicht besitzt (`31.01. + 1 Monat = 28.02.`). Zurückrechnen ergibt dann den `28.01.`, nicht den `31.01.`
4. **Kalenderwochen am Jahreswechsel:** Da ISO-Wochen montags starten und KW 1 stets den 4. Januar enthält, gehören Tage Ende Dezember teils schon zu KW 1 des Folgejahres.

**Rechtlicher Hinweis:** Dokumentieren Sie bei Rechtsbehelfs- und Kündigungsfristen stets das Zugangsdatum und prüfen Sie § 193 BGB. Für den Datenaustausch empfiehlt DIN 5008 `JJJJ-MM-TT`, für Geschäftsbriefe `TT.MM.JJJJ`.
