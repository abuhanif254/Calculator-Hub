---
title: "So finden Sie den Median: Ein umfassender Leitfaden zu Durchschnittswerten"
description: "Erfahren Sie, was der Median in der Statistik ist, wie man ihn für ungerade und gerade Datensätze findet und warum er besser als der Mittelwert ist."
category: "Math & Science"
relatedCalculator: "median-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum weichen Median und arithmetisches Mittel bei Gehältern oder Immobilienpreisen so stark voneinander ab?"
    answer: "Einkommens- und Immobilienverteilungen sind typischerweise rechtsschief: Eine kleine Gruppe extrem hoher Werte zieht das arithmetische Mittel deutlich nach oben. Der Median betrachtet ausschließlich die mittlere Rangposition nach der Sortierung und bleibt davon unberührt, weshalb er das Einkommen oder den Kaufpreis eines typischen Haushalts realistischer abbildet."
  - question: "Kann man den Median auch bei Textwerten oder Schulnoten berechnen?"
    answer: "Für reine Textkategorien ohne natürliche Reihenfolge (Nominalskala wie Farben oder Automarken) existiert kein Median – dort ist nur der Modus zulässig. Sobald Daten jedoch eine eindeutige Rangfolge besitzen (Ordinalskala wie Schulnoten von 1 bis 6 oder Zufriedenheitsstufen), lässt sich ein Median bestimmen."
  - question: "Wie hoch ist der sogenannte Bruchpunkt des Medians im Vergleich zum Mittelwert?"
    answer: "Der Median besitzt den maximal möglichen Bruchpunkt von 50 Prozent. Das bedeutet, dass bis zu knapp die Hälfte aller Messwerte eines Datensatzes extrem verfälscht oder beliebig groß sein darf, ohne dass der Median ins Unendliche abdriftet. Beim arithmetischen Mittel liegt der Bruchpunkt bei null Prozent: Ein einziger Ausreißer genügt zur Verfälschung."
  - question: "Darf man die Mediane zweier Teilgruppen einfach mitteln, um den Gesamtmedian zu erhalten?"
    answer: "Nein, das ist ein häufiger statistischer Fehler. Der Median ist nicht additiv. Selbst bei gleich großen Teilgruppen liegt der kombinierte Median nur dann exakt zwischen den Einzelmedianen, wenn sich die Verteilungen symmetrisch verhalten. Für den korrekten Gesamtmedian müssen Sie stets alle Einzelwerte zusammenführen und neu sortieren."
  - question: "Was passiert, wenn bei einer geraden Anzahl von Werten die beiden mittleren Zahlen unterschiedlich sind?"
    answer: "In der Standardstatistik bildet man das arithmetische Mittel der beiden mittleren Rangpositionen x_(n/2) und x_(n/2 + 1). Dadurch kann der Median einer ganzen Zahlenreihe auch auf eine Kommazahl wie 24,5 fallen. Bei streng ordinalen Daten ohne definierte Abstände gibt man mitunter beide mittlere Kategorien als Medianintervall an."
---

Der **Median** (auch Zentralwert genannt) ist das Lageparameter-Maß, das einen nach Größe sortierten Datensatz exakt in zwei gleich große Hälften teilt: Mindestens 50 % der Beobachtungen sind kleiner oder gleich dem Median, und mindestens 50 % sind größer oder gleich diesem Wert. Im Gegensatz zum arithmetischen Mittel hängt er nicht von der absoluten Höhe extremer Randwerte ab, sondern ausschließlich von deren Rangfolge.

Gerade bei schiefen Verteilungen – etwa Gehältern, Wohnungsmieten, Bestellwerten oder Antwortzeiten von Servern – schützt der Median vor verzerrten Schlussfolgerungen. Mit unserem [Median-Rechner](/de/rechner/median-rechner) ermitteln Sie den exakten Zentralwert samt Minimum, Maximum und Anzahl automatisch, während dieser Leitfaden die Methodik hinter der Berechnung Schritt für Schritt erklärt.

## Definition, Formel und mathematische Grundlagen

Um den Median `x̃` zu bestimmen, wird eine Stichprobe mit `n` Beobachtungen zunächst aufsteigend sortiert: `x₁ ≤ x₂ ≤ ... ≤ xₙ`. Die weitere Berechnung richtet sich danach, ob die Anzahl `n` ungerade oder gerade ist:

```text
Bei ungeradem n:   x̃ = x_((n + 1) / 2)
Bei geradem n:     x̃ = [x_(n / 2) + x_(n / 2 + 1)] / 2
```

Statistisch betrachtet entspricht der Median dem `50-%-Quantil` (`P₅₀`) beziehungsweise dem zweiten Quartil (`Q₂`). Gemeinsam mit dem ersten Quartil (`Q₁`, 25 %-Grenze) und dem dritten Quartil (`Q₃`, 75 %-Grenze) bildet er das Rückgrat robuster Lage- und Streuungsmaße über den Interquartilsabstand `IQR = Q₃ − Q₁`.

Ein schneller Vergleich zwischen Median und arithmetischem Mittel `x̄` verrät zudem die Schiefe einer Verteilung:

* **Rechtsschiefe Verteilung (`x̄ > x̃`)**: Einige wenige sehr große Ausreißer heben den Mittelwert an (klassisch bei Einkommen und Vermögen).
* **Symmetrische Verteilung (`x̄ ≈ x̃`)**: Beide Kennzahlen fallen nahezu zusammen (typisch für die Normalverteilung, etwa Körpergrößen innerhalb eines Geschlechts).
* **Linksschiefe Verteilung (`x̄ < x̃`)**: Einzelne sehr niedrige Werte drücken den Mittelwert nach unten (beispielsweise Prüfungsergebnisse bei einer sehr leichten Klausur mit wenigen Durchfallern).

## Schritt-für-Schritt-Beispiele: Ungerade und gerade Stichproben

### Beispiel 1: Ungerade Anzahl (`n = 7`) bei Monatsgehältern

Ein kleines Softwareteam besteht aus sieben Mitarbeitenden mit den monatlichen Bruttogehältern (in Euro): `[3.100 €, 2.600 €, 14.500 €, 2.900 €, 2.450 €, 3.250 €, 2.750 €]`.

1. **Aufsteigend sortieren**: `[2.450 €, 2.600 €, 2.750 €, 2.900 €, 3.100 €, 3.250 €, 14.500 €]`.
2. **Rangposition ermitteln**: `(7 + 1) / 2 = 4`. Der vierte Wert der geordneten Reihe ist der Median.
3. **Median ablesen**: `x̃ = 2.900 €`.
4. **Vergleich mit dem arithmetischen Mittel**: Die Summe beträgt `31.550 €`, geteilt durch `7` ergibt sich ein Durchschnitt von `4.507,14 €`. Ein einziges Spitzengehalt (`14.500 €`) treibt den Mittelwert um `1.607,14 €` (+55,4 %) nach oben, sodass sechs von sieben Personen unter dem „Durchschnitt“ liegen. Der Median von `2.900 €` beschreibt das typische Teamgehalt realistisch.

### Beispiel 2: Gerade Anzahl (`n = 6`) bei Quadratmeterpreisen

Für sechs vergleichbare Eigentumswohnungen liegen folgende Angebotspreise pro Quadratmeter vor: `[4.550 €, 3.850 €, 5.200 €, 4.100 €, 4.800 €, 4.250 €]`.

1. **Aufsteigend sortieren**: `[3.850 €, 4.100 €, 4.250 €, 4.550 €, 4.800 €, 5.200 €]`.
2. **Mittlere Positionen identifizieren**: Bei `n = 6` liegen Position `n / 2 = 3` (`4.250 €`) und Position `n / 2 + 1 = 4` (`4.550 €`) in der Mitte.
3. **Mittelwert des inneren Paares bilden**: `x̃ = (4.250 + 4.550) / 2 = 8.800 / 2 = 4.400 €/m²`.

## Vergleichsszenario: Median vs. Arithmetisches Mittel in der Praxis

Die folgende Übersicht zeigt anhand typischer Praxisdaten, wie unterschiedlich beide Kennzahlen reagieren und welches Maß im jeweiligen Kontext die fundiertere Entscheidungsgrundlage liefert:

| Datensatz / Anwendung | Beispielwerte | Arithmetisches Mittel | Median | Verzerrung durch Mittelwert | Aussagekräftigeres Maß |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Nettohaushaltseinkommen | `2.100, 2.400, 2.650, 2.950, 12.400 €` | `4.500 €` | `2.650 €` | Stark überhöht (+69,8 %) | Median |
| Immobilienpreise (je m²) | `3.200, 3.450, 3.600, 3.750, 9.500 €` | `4.700 €` | `3.600 €` | Stark überhöht (+30,6 %) | Median |
| Web-Server-Latenz (ms) | `18, 21, 22, 24, 25, 490 ms` | `100,0 ms` | `23,0 ms` | Ausreißer verschleiert Regelfall | Median (+ p95/p99) |
| Paketgewicht einer Serie | `998, 999, 1.000, 1.001, 1.002 g` | `1.000 g` | `1.000 g` | Keine Abweichung (symmetrisch) | Beide gleichwertig |
| Monatsverbrauch Strom | `180, 195, 210, 220, 245 kWh` | `210,0 kWh` | `210,0 kWh` | Keine; Gesamtbudget = `n × x̄` | Mittelwert (Summenerhalt) |
| Klinische Überlebenszeit | `4, 7, 9, 12, 14, 68 Monate` | `19,0 Monate` | `10,5 Monate` | Langzeitfall verzerrt Prognose | Median |

## Anwendungsfelder, Klassendaten und methodische Fallstricke

In der amtlichen Statistik – etwa bei Destatis in Deutschland, Statistik Austria oder dem Schweizer Bundesamt für Statistik – gilt das Medianeinkommen als Standardmaß für die wirtschaftliche Lage privater Haushalte. Im Immobilienmarkt verhindert der Medianpreis, dass einzelne Luxusobjekte das Preisniveau eines Stadtteils verzerren. In der Medizin wiederum beschreibt das mediane Gesamtüberleben, wann exakt die Hälfte einer Studiengruppe ein definiertes Ereignis erreicht hat, wodurch einzelne Extremverläufe keine verzerrte Erwartung erzeugen.

### Besonderheit bei gruppierten Daten (Feinberechnung)

Liegen Messwerte nicht einzeln, sondern nur in Klassen vor (zum Beispiel Altersgruppen `20–29`, `30–39`), lässt sich der Median über lineare Interpolation innerhalb der Medianklasse annähern:

```text
x̃ ≈ L + [((n / 2) − F_kum) / f_m] × b
```

Dabei bezeichnet `L` die untere Grenze der Medianklasse, `F_kum` die kumulierte Häufigkeit aller Klassen davor, `f_m` die Häufigkeit der Medianklasse und `b` die Klassenbreite. Diese Näherung unterstellt eine gleichmäßige Verteilung der Beobachtungen innerhalb der Klasse.

### Typische Fehlerquellen vermeiden

* **Unsortierte Berechnung**: Der häufigste Flüchtigkeitsfehler ist das Ablesen des mittleren Werts direkt aus der Rohliste. Ohne vorherige Sortierung ist das Ergebnis ungültig.
* **Gesamtsummen-Trugschluss**: Benötigen Sie das Gesamtvolumen – etwa die gesamten Stromkosten aller Filialen oder den gesamten monatlichen Wasserverbrauch in `m³` –, dürfen Sie niemals `n × Median` rechnen. Nur das arithmetische Mittel bewahrt die Summe (`n × x̄ = Σ xᵢ`).
* **Mindestanforderung Ordinalskala**: Prüfen Sie stets das Skalenniveau. Während Noten, Altersangaben und Euro-Beträge geordnet werden können, besitzt eine Liste von Lieferanten oder Zahlungsarten keine mathematische Reihenfolge und erlaubt keinen Median.
