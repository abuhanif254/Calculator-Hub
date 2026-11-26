---
title: "Lohnabrechnung meistern: Stundenzettel und Arbeitsstunden berechnen"
description: "Wandeln Sie Minuten fehlerfrei in Industriestunden um, berücksichtigen Sie gesetzliche Pausen nach Arbeitszeitgesetz und berechnen Sie Bruttolohn sowie Zuschläge exakt."
category: "Productivity & Utilities"
relatedCalculator: "hours-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum sind 8 Stunden und 30 Minuten nicht gleich 8,30 Stunden in der Lohnabrechnung?"
    answer: "Uhrzeiten nutzen das Sexagesimalsystem mit 60 Minuten pro Stunde, Lohn- und Buchhaltungssysteme rechnen jedoch im Dezimalsystem (Industriezeit). Da 30 Minuten exakt der Hälfte einer Stunde entsprechen, ergeben 8:30 Stunden umgerechnet 8,50 Industriestunden. Wer fälschlich 8,30 multipliziert, verliert bei jedem solchen Arbeitstag 12 Minuten Bezahlung."
  - question: "Welche gesetzlichen Ruhepausen müssen in Deutschland, Österreich und der Schweiz abgezogen werden?"
    answer: "In Deutschland schreibt § 4 ArbZG bei mehr als 6 bis 9 Stunden Arbeitszeit mindestens 30 Minuten und über 9 Stunden mindestens 45 Minuten unbezahlte Ruhepause vor. In Österreich gilt ab über 6 Stunden eine 30-minütige Pause (§ 11 AZG). In der Schweiz verlangt Art. 15 ArG ab 5,5 Stunden 15 Minuten, ab 7 Stunden 30 Minuten und ab 9 Stunden 60 Minuten Pause."
  - question: "Wie vermeidet man Rundungsfehler bei ungeraden Minutenwerten wie 10, 20 oder 50 Minuten?"
    answer: "Summieren Sie über die gesamte Woche oder den Abrechnungsmonat zunächst alle Netto-Arbeitszeiten in exakten ganzzahligen Minuten und teilen Sie erst die Gesamtsumme durch 60. Wer bereits jeden einzelnen Arbeitstag auf zwei Nachkommastellen rundet (etwa 0,17 h statt 0,1667 h), erzeugt über 20 Arbeitstage spürbare Cent- oder Stundenabweichungen."
  - question: "Wie berechnet man Nachtschichten, die über Mitternacht hinweggehen?"
    answer: "Bei Schichten über den Tageswechsel teilen Sie die Berechnung rechnerisch an 24:00 Uhr oder addieren zum Endzeitpunkt 24 Stunden hinzu (Beispiel: Start 22:00 Uhr, Ende 06:30 Uhr des Folgetags entspricht 30,50 − 22,00 = 8,50 Stunden Bruttoanwesenheit vor Pausenabzug). Bei Zeiterfassungssystemen empfiehlt sich eine datumsgebundene Erfassung."
  - question: "Wann sind Nacht-, Sonntags- und Feiertagszuschläge in Deutschland steuerfrei?"
    answer: "Nach § 3b EStG bleiben tatsächlich gezahlte Zuschläge neben dem Grundlohn steuerfrei, sofern sie bestimmte Prozentsätze des Grundlohns nicht überschreiten: bis zu 25 % für Nachtarbeit (20:00–06:00 Uhr, bei Beginn vor 00:00 Uhr zwischen 00:00 und 04:00 Uhr bis 40 %), bis zu 50 % für Sonntagsarbeit und bis zu 125 % bzw. 150 % an gesetzlichen Feiertagen (maximal auf 50 €/h Grundlohn gedeckelt)."
---

Fehlerhafte Stundenzettel kosten Arbeitnehmer bare Vergütung und führen in der Lohnbuchhaltung regelmäßig zu zeitaufwendigen Korrekturläufen. Die zwei häufigsten Ursachen sind das Verwechseln von Uhrzeit-Minuten mit Dezimalwerten sowie vergessene oder falsch abgezogene gesetzliche Ruhepausen. Da die klassische Zeiterfassung im `60er`-System arbeitet, die Multiplikation mit dem Stundenlohn jedoch ein `100er`-Dezimalsystem verlangt, muss jede Schicht sauber konvertiert werden.

Mit unserem [Stundenrechner](/de/rechner/stundenrechner) erfassen Sie Arbeitsbeginn, Arbeitsende und Pausen direkt im Zeitformat und erhalten sowohl die exakte Netto-Arbeitszeit als auch die Bruttovergütung. Dieser Ratgeber erklärt die mathematische Umrechnung in Industriestunden, rechnet eine komplette Arbeitswoche mit Zuschlägen nach und fasst die verbindlichen Pausenregeln im DACH-Raum zusammen.

## Sexagesimalsystem vs. Industriestunden: Die Umrechnungsformel

Eine Stunde besitzt `60 Minuten`, während eine Dezimalstunde in `100 Industrieminuten` unterteilt wird. Um von einer gestempelten Uhrzeit auf den abrechenbaren Lohnwert zu gelangen, gelten drei Grundformeln:

```text
Netto-Arbeitszeit (Min):  M_netto = (Endzeit_min − Startzeit_min) − Pause_min
Dezimalstunden (Industrie): H_dez = Stunden + (Minuten / 60)
Industrieminuten:           M_ind = (Minuten / 60) × 100
Bruttolohn (€):             Lohn  = (H_regel × S) + (H_zuschlag × S × F_zuschlag)
```

Dabei stehen:

* `Startzeit_min` und `Endzeit_min` für die Uhrzeit umgerechnet in Minuten seit Mitternacht (`z. B. 08:15 Uhr = 8 × 60 + 15 = 495 Min.`), bei Nachtschichten über Mitternacht zuzüglich `1.440 Min.` für den Folgetag.
* `Pause_min` für unbezahlte Arbeitsunterbrechungen.
* `S` für den vertraglichen Stundenlohn in Euro (`€`).
* `F_zuschlag` für den Vergütungsfaktor bei Mehrarbeit oder Schichtarbeit (beispielsweise `1,25` bei `25 %` Zuschlag).

## Schritt-für-Schritt-Beispiel: Wochenabrechnung mit Pausen und Mehrarbeit

Angenommen, ein Facharbeiter verdient einen Grundlohn von `24,00 €/Stunde` (`0,40 €/Minute`) bei einer vertraglichen Wochenarbeitszeit von `40 Stunden`. Seine Stempelzeiten lauten:

* **Montag bis Donnerstag (je 4 Tage):** `07:45 Uhr` bis `17:00 Uhr`, gesetzliche Pause je `45 Minuten` (da Anwesenheit über `9 Stunden`).
* **Freitag:** `08:00 Uhr` bis `15:20 Uhr`, gesetzliche Pause `30 Minuten`.
* **Samstag (Sondereinsatz mit `25 %` Zuschlag):** `09:00 Uhr` bis `13:30 Uhr`, keine Pause (unter `6 Stunden`).

1. **Netto-Arbeitszeit Montag bis Donnerstag berechnen:**  
   Pro Tag liegen zwischen `07:45` und `17:00 Uhr` exakt `9 Stunden und 15 Minuten` (`555 Minuten`).  
   Abzüglich `45 Minuten` Pause verbleiben `510 Minuten` (`8 Stunden 30 Minuten`).  
   Umgerechnet in Industriestunden: `8 + (30 / 60) = 8,50 Stunden` pro Tag.  
   Summe für vier Tage: `4 × 8,50 h = 34,00 Stunden` (`2.040 Minuten`).
2. **Netto-Arbeitszeit am Freitag berechnen:**  
   Zwischen `08:00` und `15:20 Uhr` vergehen `7 Stunden und 20 Minuten` (`440 Minuten`).  
   Abzüglich `30 Minuten` Pause bleiben `410 Minuten` (`6 Stunden 50 Minuten`).  
   In Dezimalstunden entspricht das `6 + (50 / 60) = 6,8333... Stunden`.
3. **Wochen-Regelarbeitszeit und Überstunden bestimmen:**  
   Addition der exakten Minuten von Montag bis Freitag: `2.040 + 410 = 2.450 Minuten` = `40 Stunden und 50 Minuten` (`40,8333... Stunden`).  
   Davon entfallen `40,00 Stunden` auf die reguläre Arbeitszeit (`40,00 × 24,00 € = 960,00 €`) und `50 Minuten` auf regulär vergütete Mehrarbeit (`50 × 0,40 € = 20,00 €`).
4. **Samstagseinsatz mit `25 %` Zuschlag abrechnen:**  
   Zwischen `09:00` und `13:30 Uhr` liegen `4 Stunden 30 Minuten`, also `4,50 Industriestunden`.  
   Mit `25 %` Zuschlag (`24,00 € × 1,25 = 30,00 €/h`) ergibt das `4,50 × 30,00 € = 135,00 €`.
5. **Gesamten Bruttolohn summieren:**  
   `960,00 € + 20,00 € + 135,00 € = 1.115,00 €` brutto.

## Umrechnungstabelle: Echtzeit-Minuten in Dezimalstunden

Da nicht jede Minutenzahl einen glatten Dezimalbruch bildet, zeigt die Tabelle sowohl die exakten Werte als auch den Rundungseffekt auf zwei Nachkommastellen.

| Echtzeit-Minuten | Bruch (von 60) | Dezimalstunden (exakt) | Industrieminuten | Rundungsdifferenz (2 Stellen) | Lohnwert bei `24,00 €/h` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `5 Min.` | `1/12` | `0,0833 h` | `8,33 Ind.-Min.` | `−0,0033 h` (bei `0,08 h`) | `2,00 €` |
| `10 Min.` | `1/6` | `0,1667 h` | `16,67 Ind.-Min.` | `+0,0033 h` (bei `0,17 h`) | `4,00 €` |
| `15 Min.` | `1/4` | `0,2500 h` | `25,00 Ind.-Min.` | `0,0000 h` (exakt) | `6,00 €` |
| `20 Min.` | `1/3` | `0,3333 h` | `33,33 Ind.-Min.` | `−0,0033 h` (bei `0,33 h`) | `8,00 €` |
| `30 Min.` | `1/2` | `0,5000 h` | `50,00 Ind.-Min.` | `0,0000 h` (exakt) | `12,00 €` |
| `45 Min.` | `3/4` | `0,7500 h` | `75,00 Ind.-Min.` | `0,0000 h` (exakt) | `18,00 €` |
| `50 Min.` | `5/6` | `0,8333 h` | `83,33 Ind.-Min.` | `−0,0033 h` (bei `0,83 h`) | `20,00 €` |

## Gesetzliche Pausenregeln im DACH-Raum und typische Abrechnungsfehler

In der Lohnbuchhaltung dürfen Arbeitszeiten nicht beliebig verkürzt oder aufsummiert werden, sondern unterliegen strengen gesetzlichen Schutzvorgaben:

* **Deutschland (`§ 4 ArbZG`):** Bei einer Arbeitszeit von mehr als `6` bis `9 Stunden` ist mindestens `30 Minuten` Ruhepause vorgeschrieben, ab mehr als `9 Stunden` mindestens `45 Minuten`. Pausen dürfen in Zeitabschnitte von jeweils mindestens `15 Minuten` aufgeteilt werden. Zudem gilt nach `§ 3 ArbZG` grundsätzlich die `8`-Stunden-Grenze (maximal `10 Stunden` pro Werktag bei Ausgleich innerhalb von `6 Monaten`) sowie nach `§ 5 ArbZG` eine ununterbrochene Ruhezeit von `11 Stunden` zwischen zwei Schichten.
* **Österreich (`§ 11 AZG`):** Beträgt die Gesamtdauer der Tagesarbeitszeit mehr als `6 Stunden`, ist die Arbeit durch eine Ruhepause von mindestens `30 Minuten` zu unterbrechen (teilbar in zwei Abschnitte zu `15 Minuten` oder drei zu `10 Minuten`).
* **Schweiz (`Art. 15 ArG`):** Gesetzliche Mindestpausen betragen `15 Minuten` bei mehr als `5,5 Stunden`, `30 Minuten` bei mehr als `7 Stunden` und `60 Minuten` bei mehr als `9 Stunden` täglicher Arbeitszeit.

Ein häufiger Fehler in manuellen Excel-Stundenzetteln entsteht durch vorzeitiges Runden: Wer täglich `6 Stunden 50 Minuten` pauschal als `6,83 h` notiert, verliert pro Tag `0,0033 Stunden`. Addieren Sie stattdessen immer erst alle ganzzahligen Netto-Minuten eines Abrechnungszeitraums und teilen Sie erst die Gesamtsumme durch `60`. Prüfen Sie zudem bei Schichtarbeit, ob Nacht-, Sonntags- und Feiertagszuschläge getrennt ausgewiesen sind, da diese Anteile im Rahmen der gesetzlichen Höchstsätze (`§ 3b EStG` in Deutschland) lohnsteuer- und sozialversicherungsfrei ausgezahlt werden können.
