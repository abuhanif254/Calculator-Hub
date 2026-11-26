---
title: "So addieren und subtrahieren Sie Zeit: Der ultimative Leitfaden"
description: "Meistern Sie die Basis-60-Mathematik: Stunden addieren, Arbeitszeiten im Sexagesimalsystem subtrahieren, Dezimalstunden umrechnen und unseren Zeitrechner nutzen."
category: "Productivity & Utilities"
relatedCalculator: "time-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum ergibt 1 Stunde 30 Minuten plus 45 Minuten nicht 1,75 im Taschenrechner?"
    answer: "Herkömmliche Taschenrechner arbeiten im Dezimalsystem (Basis 10), bei dem ein Übertrag erst bei 100 erfolgt. Uhren und Zeitspannen basieren hingegen auf dem Sexagesimalsystem (Basis 60): Sobald 60 Minuten erreicht sind, springt die Anzeige auf die nächste volle Stunde. 1 Stunde 30 Minuten entsprechen dezimal 1,50 Stunden, plus 0,75 Stunden ergibt das 2,25 Stunden beziehungsweise 2 Stunden 15 Minuten."
  - question: "Wie rechnet man Minuten korrekt in Dezimalstunden für die Lohnabrechnung um?"
    answer: "Teilen Sie die Anzahl der Minuten durch 60 und addieren Sie diesen Wert zu den vollen Stunden. Beispielsweise entsprechen 8 Stunden und 45 Minuten genau 8 + (45 / 60) = 8,75 Dezimalstunden. Bei Sekunden teilen Sie zusätzlich durch 3.600."
  - question: "Was ist der Unterschied zwischen Dezimalstunden und Industrieminuten?"
    answer: "Beide Maßeinheiten teilen die Stunde in 100 statt 60 Teile, unterscheiden sich aber um den Faktor 100. 15 reale Minuten entsprechen 0,25 Dezimalstunden oder 25 Industrieminuten (1/100 Stunde). Zeiterfassungssysteme in der Produktion und Logistik nutzen häufig Industrieminuten, um Stückzeiten ohne Kommastellen zu summieren."
  - question: "Wie berechnet man die Arbeitszeit bei einer Nachtschicht über Mitternacht hinweg?"
    answer: "Bei einem Schichtende nach 00:00 Uhr darf die Startzeit nicht einfach von der Endzeit subtrahiert werden. Teilen Sie die Berechnung an Mitternacht (24:00 Uhr): Berechnen Sie zuerst die Dauer bis 24:00 Uhr (24:00 minus Startzeit), addieren Sie anschließend die Zeit nach Mitternacht (Endzeit) und ziehen Sie gesetzliche Pausen ab."
  - question: "Welche Rundungsregeln gelten für Arbeitszeiten im DACH-Raum?"
    answer: "Für die Entgeltabrechnung müssen tatsächlich geleistete Minuten prinzipiell minutengenau erfasst werden; einseitiges Abrunden zulasten von Beschäftigten ist arbeitsrechtlich unzulässig. Um Rundungsdifferenzen bei periodischen Stundenwerten wie 20 Minuten (0,3333... Stunden) zu vermeiden, sollten Sie erst nach der vollständigen Addition aller Schichten auf zwei Nachkommastellen runden."
---

Uhrzeiten und Zeitdauern folgen nicht unserem gewohnten Zehnersystem, sondern dem historischen Sexagesimalsystem zur Basis 60. Wer versucht, `2 Std. 45 Min.` und `1 Std. 35 Min.` wie gewöhnliche Kommazahlen (`2,45 + 1,35 = 3,80`) zu addieren, erzeugt einen schwerwiegenden Rechenfehler – denn tatsächlich liegen `4 Std. 20 Min.` vor.

Für die Lohnbuchhaltung, die Projektzeiterfassung, die Schichtplanung sowie die Schnittbearbeitung von Audio- und Videodateien ist eine saubere Zeitrechnung unverzichtbar. Mit unserem [Zeitrechner](/de/rechner/zeitrechner) addieren und subtrahieren Sie Stunden, Minuten und Sekunden ohne Übertragsfehler und wandeln klassische `HH:MM:SS`-Angaben direkt in abrechenbare Dezimalstunden um.

## Basis-60-Arithmetik: Übertrag, Leihen und Dezimalumrechnung

Beim Rechnen im Sexagesimalsystem entspricht jede volle Minute `60` Sekunden und jede volle Stunde `60` Minuten. Additionen erfolgen spaltenweise von der kleinsten Einheit (Sekunden) zur größten Einheit (Stunden); überschreitet eine Spalte den Wert `59`, wird durch `60` geteilt und der ganzzahlige Quotient als Übertrag an die nächsthöhere Einheit weitergegeben. Bei der Subtraktion gilt das umgekehrte Prinzip des Leihens: Ist der Minuend kleiner als der Subtrahend, borgt man sich `1` Einheit von der nächsthöheren Stelle und addiert `60`.

```text
Addition (Übertrag):    Min_neu = (Min_1 + Min_2) mod 60
                        Übertrag_Std = floor((Min_1 + Min_2) / 60)

Subtraktion (Leihen):   Falls Min_End < Min_Start:
                        Std_End_adj = Std_End − 1  und  Min_End_adj = Min_End + 60

Nachtschicht-Dauer:     Dauer = (24:00 − Startzeit) + Endzeit − Pausenzeit
Dezimalstunden:         Std_dez = Std + (Min / 60) + (Sek / 3.600)
Industrieminuten:       Min_ind = (Std × 100) + ((Min / 60) × 100)
```

Für fehlerfreie Berechnungen sollten drei Begriffe sauber getrennt werden:
* **Uhrzeit (Zeitpunkt):** Ein Punkt auf der 24-Stunden-Skala (zum Beispiel `08:15 Uhr`), der nur durch Differenzbildung eine Zeitspanne ergibt.
* **Zeitspanne (Dauer):** Ein Intervall in `Stunden : Minuten : Sekunden`, das addiert oder mit Pausen verrechnet werden kann.
* **Dezimalzeit (Industriezeit):** Die Umrechnung der Basis 60 in die Basis 10 (`1,50 Std.` statt `1 Std. 30 Min.`), damit Tabellenkalkulationen und Lohnprogramme Stundenlöhne korrekt multiplizieren können.

## Rechenbeispiel: Nachtschicht mit Pause zur Wochenarbeitszeit addieren

Ein Mechatroniker arbeitet eine Nachtschicht von **22:45 Uhr** bis **06:20 Uhr** am darauffolgenden Morgen und legt dabei eine unbezahlte Ruhepause von **45 Minuten** ein. Auf seinem Wochenkonto stehen bislang **31 Std. 50 Min.** Sein Bruttostundenlohn beträgt **32,00 €**. Gesucht sind die Nettoarbeitszeit der Schicht, die neue Wochensumme sowie der Bruttoverdienst.

1. **Abschnitt vor Mitternacht bestimmen:** Subtrahieren Sie `22:45` von `24:00`. Leihen Sie `1` Stunde (`24:00` → `23 Std. 60 Min.`): `23 − 22 = 1 Std.` und `60 − 45 = 15 Min.` (**1 Std. 15 Min.**).
2. **Abschnitt nach Mitternacht addieren:** Addieren Sie `6 Std. 20 Min.` zur Vor-Mitternacht-Dauer: `1 + 6 = 7 Std.` und `15 + 20 = 35 Min.` (**7 Std. 35 Min.** Brutto-Anwesenheit).
3. **Gesetzliche Pause abziehen:** Für `35 Min. − 45 Min.` leihen Sie eine Stunde (`7 Std. 35 Min.` → `6 Std. 95 Min.`). Danach ergibt `95 − 45 = 50 Min.` Nettoarbeitszeit der Schicht: **6 Std. 50 Min.** (`6,833...` Dezimalstunden).
4. **Zur Wochenarbeitszeit addieren:** `31 Std. 50 Min. + 6 Std. 50 Min. = 37 Std. 100 Min.` Mit Übertrag (`100 − 60 = 40 Min.`, `+1 Std.`) entsteht die Summe **38 Std. 40 Min.**
5. **Dezimalumrechnung und Entgelt:** `38 + (40 / 60) = 38,6667 Dezimalstunden × 32,00 € = 1.237,33 €`. Bei falscher Eingabe von `38,40 × 32,00 €` (`1.228,80 €`) fehlten `8,53 €`.

## Umrechnungstabelle: Zeitformat, Dezimalstunden und Industrieminuten

Die Tabelle zeigt typische Zeitwerte im direkten Vergleich zwischen klassischer Uhrzeitnotation, Dezimalstunden (Basis 10), Industrieminuten und der Auswirkung auf einen Stundenlohn von `30,00 €`:

| Zeitdauer (`HH:MM`) | Minuten gesamt | Dezimalstunden (Basis 10) | Industrieminuten (`1/100 Std.`) | Vergütung bei `30,00 €/Std.` | Fehler bei falscher Komma-Eingabe |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`00:15`** | `15 Min.` | `0,25 Std.` | `25` | `7,50 €` | `0,15 × 30 € = 4,50 €` (`−3,00 €`) |
| **`00:30`** | `30 Min.` | `0,50 Std.` | `50` | `15,00 €` | `0,30 × 30 € = 9,00 €` (`−6,00 €`) |
| **`00:45`** | `45 Min.` | `0,75 Std.` | `75` | `22,50 €` | `0,45 × 30 € = 13,50 €` (`−9,00 €`) |
| **`01:20`** | `80 Min.` | `1,3333 Std.` | `133,33` | `40,00 €` | `1,20 × 30 € = 36,00 €` (`−4,00 €`) |
| **`07:45`** | `465 Min.` | `7,75 Std.` | `775` | `232,50 €` | `7,45 × 30 € = 223,50 €` (`−9,00 €`) |
| **`08:36`** | `516 Min.` | `8,60 Std.` | `860` | `258,00 €` | `8,36 × 30 € = 250,80 €` (`−7,20 €`) |

## Praxisbeispiele, Fehlerquellen und arbeitsrechtliche Hinweise

Die Basis-60-Mathematik prägt zahlreiche Branchen: Kanzleien und Agenturen rechnen Projektkontingente minutengenau ab; Mediencutter addieren Timecodes einzelner Clips; Logistik und Luftfahrt bilanzieren Lenk- und Blockzeiten nach strengen Sicherheitsvorgaben.

Typische Fehlerquellen bei der Zeitberechnung lassen sich gezielt vermeiden:

1. **Vorzeitiges Runden von Drittelstunden:** Da `10`, `20`, `40` oder `50` Minuten unendliche Dezimalbrüche erzeugen (`20 Min. = 0,3333... Std.`), verfälscht frühes Runden Monatssummen (`20 × 0,33 = 6,60 Std.` statt `6,67 Std.`). Addieren Sie stets minutengenau und runden Sie erst den Endwert.
2. **Tabellenkalkulation über 24 Stunden:** Im Standardformat `hh:mm` springen Summen über 24 Stunden auf `00:00` zurück (`14:40` statt `38:40`). Erst das Format `[hh]:mm` zeigt fortlaufende Gesamtstunden korrekt an.
3. **Sommer-/Winterzeitumstellung:** In der Umstellungsnacht im März (`02:00` → `03:00`) verkürzt sich eine Nachtschicht um `1` Stunde; im Oktober verlängert sie sich um `1` Stunde.
4. **Zeitzonenversatz:** Internationale Termine müssen vor der Differenzbildung auf eine gemeinsame Referenzzeit (etwa UTC) normiert werden.

**Arbeitsrechtlicher Hinweis (ArbZG):** Nach § 4 ArbZG sind bei mehr als `6` Stunden Arbeit mindestens `30` Minuten und ab über `9` Stunden `45` Minuten Ruhepause Pflicht. Die reguläre Höchstarbeitszeit beträgt `8` Stunden täglich (maximal `10` Stunden mit Ausgleich nach § 3 ArbZG), gefolgt von `11` Stunden Ruhezeit (§ 5 ArbZG). Zudem gilt nach EuGH- und BAG-Rechtsprechung die Pflicht zur objektiven Erfassung der täglichen Arbeitszeit.
