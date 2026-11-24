---
title: "Median-Rechner – Finden Sie den Median mit Schritt-für-Schritt-Lösungen"
metaTitle: "Median-Rechner: Zentralwert, Quartile & IQR berechnen"
description: "Berechnen Sie den Median (Zentralwert), Quartile, Interquartilsabstand (IQR), Perzentile, Ausreißer nach Tukey und die Fünf-Zahlen-Zusammenfassung Schritt für Schritt für ungruppierte und klassierte Datensätze."
metaDescription: "Kostenloser Median-Rechner: Berechnen Sie Zentralwert, Quartile, IQR, Perzentile und Ausreißer nach Tukey für ungruppierte und gruppierte Daten."
metaKeywords: "median rechner, zentralwert berechnen, quartile rechner, interquartilsabstand iqr, fünf zahlen zusammenfassung, boxplot ausreißer, gruppierter median, deskriptive statistik"
faqs:
  - question: "Wie berechnet man den Median bei einer geraden Anzahl von Messwerten?"
    answer: "Sortieren Sie zunächst alle Daten der Größe nach aufsteigend. Da bei geradem Stichprobenumfang n kein einzelner Wert exakt in der Mitte steht, bilden Sie das arithmetische Mittel aus den beiden mittleren Beobachtungen an den Positionen n/2 und (n/2) + 1."
  - question: "Warum verwenden Destatis, Statistik Austria und das BFS bei Einkommen den Median statt des Durchschnitts?"
    answer: "Einkommens- und Vermögensverteilungen verlaufen stark rechtsschief, weil wenige Spitzenverdiener das arithmetische Mittel weit nach oben ziehen. Der Median halbiert die sortierten Daten genau beim 50.-Perzentil und zeigt, was ein typischer Haushalt tatsächlich verdient – unabhängig von einzelnen Millionenbeträgen."
  - question: "Was bedeutet der 50-%-Bruchpunkt des Medians in der robusten Statistik?"
    answer: "Der Bruchpunkt bezeichnet den Anteil eines Datensatzes, der durch beliebig extreme Ausreißer ersetzt werden kann, ohne dass die Kennzahl unbrauchbar wird. Beim Median liegt dieser Bruchpunkt bei 50 Prozent, während beim arithmetischen Mittel bereits ein einziger extremer Wert das Ergebnis beliebig verzerren kann."
  - question: "Wie hängen Median, Quartile, Interquartilsabstand (IQR) und Tukey-Ausreißer zusammen?"
    answer: "Quartile teilen eine geordnete Datenreihe in vier gleiche Viertel: Q1 entspricht dem 25.-Perzentil, Q2 dem Median (50.-Perzentil) und Q3 dem 75.-Perzentil. Die Differenz IQR = Q3 − Q1 misst die Streuung der mittleren 50 Prozent; Werte unterhalb von Q1 − 1,5 × IQR oder oberhalb von Q3 + 1,5 × IQR gelten nach John Tukey als Ausreißer."
  - question: "Lässt sich der Median auch für ordinale oder nominale Daten bestimmen?"
    answer: "Für ordinalskalierte Daten mit eindeutiger Rangfolge – etwa Schulnoten von 1 bis 6 oder Zufriedenheitsskalen von 1 bis 5 – ist der Median vollständig zulässig. Bei rein nominalen Kategorien ohne natürliche Reihenfolge wie Blutgruppen, Postleitzahlen oder Zahlungsarten existiert dagegen kein Median; dort greift ausschließlich der Modus."
---

Der **Median** (auch **Zentralwert**, Formelzeichen `x̃` oder `Q2`) bezeichnet die exakte Positionsmitte einer der Größe nach sortierten Datenreihe: Mindestens 50 % aller Beobachtungen liegen kleiner oder gleich dem Median und mindestens 50 % größer oder gleich dem Median. Während das arithmetische Mittel jeden Messwert mit seinem vollen Betrag gewichtet, stützt sich der Median allein auf die **Rangordnung**. Dank seines maximalen **Bruchpunkts von 50 %** bleibt er selbst bei extremen Ausreißern und stark schiefen Verteilungen verlässlich – etwa bei Haushaltseinkommen, Immobilienpreisen, Krankheitsdauern oder technischen Antwortzeiten.

Unser **Median-Rechner** bestimmt aus ungeraden, geraden und klassierten Daten den exakten Zentralwert sowie **Quartile (`Q1`, `Q3`)**, **Interquartilsabstand (`IQR`)**, **Perzentile**, **Fünf-Zahlen-Zusammenfassung**, **Boxplot-Grenzen** und **Ausreißer nach Tukey**.

## Formeln für ungruppierte und klassierte Daten

Vor jeder Berechnung werden die Rohdaten `{x_1, ..., x_n}` aufsteigend in **Ordnungsstatistiken** sortiert: `x_(1) ≤ x_(2) ≤ ... ≤ x_(n)`.

```text
Ungerades n:          x̃ = x_((n + 1) / 2)
Gerades n:            x̃ = [ x_(n / 2) + x_((n / 2) + 1) ] / 2
Klassierte Daten:     x̃ = L + [ (N / 2 − F_vor) / f_m ] × b
IQR & Ausreißer:      IQR = Q3 − Q1   |   Grenzen = [ Q1 − 1,5×IQR ; Q3 + 1,5×IQR ]
Median-Abweichung:    MAD = Median( |x_i − x̃| )
```

### Variablendefinitionen

- **x_(k)**: Wert an Rangposition `k` der aufsteigend sortierten Datenreihe (`x_(1)` Minimum, `x_(n)` Maximum).
- **n** bzw. **N**: Gesamtzahl aller Beobachtungen in der Stichprobe oder Häufigkeitstabelle.
- **L**: Untere Klassengrenze der **Medianklasse** (erstes Intervall, dessen kumulierte Häufigkeit `N / 2` erreicht oder übersteigt).
- **F_vor**: Kumulierte Häufigkeit aller Klassen unterhalb der Medianklasse.
- **f_m** und **b**: Absolute Besetzungszahl und Klassenbreite der Medianklasse.
- **Q1, Q3, IQR, MAD**: Unteres Quartil (25.-Perzentil), oberes Quartil (75.-Perzentil), Streuung der mittleren 50 % sowie ausreißerfeste Median-Absolutabweichung.

Die **Fünf-Zahlen-Zusammenfassung** (`Minimum, Q1, Median, Q3, Maximum`) bildet das Gerüst jedes **Boxplots**. Die innere Box umschließt die mittleren 50 % der Daten und macht Asymmetrien sofort sichtbar: Liegt der Median deutlich näher an `Q1` als an `Q3`, deutet dies auf eine rechtsschiefe Verteilung hin. Werte außerhalb von `[Q1 − 1,5×IQR ; Q3 + 1,5×IQR]` gelten nach John Tukey als Ausreißer, Werte jenseits von `3,0×IQR` als extreme Ausreißer.

## Schritt-für-Schritt-Rechenbeispiele

### Beispiel 1: Wohnungspreise mit Ausreißer (ungerade vs. gerade Fallzahl)

Ein Gutachterausschuss erfasst `n = 9` Kaufpreise für Eigentumswohnungen (in Tausend EUR, `T€`):

`310, 275, 340, 290, 1.450, 325, 280, 360, 300`

1. **Aufsteigend sortieren:** `275, 280, 290, 300, 310, 325, 340, 360, 1.450` (Summe `3.930 T€`).
2. **Median bei ungeradem `n = 9`:** Rang `k = (9 + 1) / 2 = 5` liefert **`x̃ = 310.000 €`**. Das arithmetische Mittel `x̄ = 3.930 / 9 = 436.667 €` liegt dagegen über acht der neun Wohnungen, weil das Luxus-Penthouse (`1.450.000 €`) den Schnitt stark nach oben verzieht.
3. **Quartile, IQR, Ausreißer und MAD:** Ohne den Zentralwert ergibt die untere Hälfte `{275, 280, 290, 300}` **`Q1 = (280 + 290) / 2 = 285.000 €`** und die obere Hälfte `{325, 340, 360, 1.450}` **`Q3 = (340 + 360) / 2 = 350.000 €`**. Daraus folgen **`IQR = 65.000 €`**, untere Grenze **`187.500 €`** und obere Grenze **`447.500 €`**. Die Wohnung zu `1.450.000 €` übertrifft sogar die Extremgrenze `545.000 €`. Die sortierten Abstände `|x_i − 310|` ergeben `{0, 10, 15, 20, 30, 30, 35, 50, 1.140}` und damit eine robuste **`MAD = 30.000 €`**.
4. **Vergleich bei geradem `n = 8`:** Ohne das Penthouse verbleiben `{275, 280, 290, 300, 310, 325, 340, 360}`. Das Mittel aus Rang 4 und 5 lautet **`x̃ = (300 + 310) / 2 = 305.000 €`** (`−1,6 %`), während der Durchschnitt um `126.667 €` auf `310.000 €` (`2.480 / 8`) einbricht.

### Beispiel 2: Klassierte Antwortzeiten (gruppierter Median)

Für `N = 50` Server-Antwortzeiten liegen kumuliert `F_vor = 18` Messwerte unter `40 ms`. Die Medianklasse `40–50 ms` (`L = 40 ms`, `b = 10 ms`) umfasst `f_m = 14` Anfragen (kumuliert bis `32`, umschließt also `N / 2 = 25`):

`x̃ = 40 + [ (25 − 18) / 14 ] × 10 = 40 + 5,0 = 45,0 ms`

Diese lineare Interpolation nimmt an, dass sich die 14 Anfragen gleichmäßig über das Intervall von `40` bis `50 ms` verteilen.

## Referenztabelle: Verteilungsform und optimales Lagemaß

| Verteilungsform | Reihenfolge der Lagemaße | Empfohlenes Zentrum | Empfohlene Streuung | DACH-Praxisbeispiele |
| :--- | :--- | :--- | :--- | :--- |
| **Symmetrisch (Normal)** | `Modus = Median = Mittelwert` | Arithmetisches Mittel (`x̄`) | Standardabweichung (`s`) | Fertigungstoleranzen in mm, Körpergröße |
| **Rechtsschief (positiv)** | `Modus < Median < Mittelwert` | **Median (`x̃`)** | Interquartilsabstand (`IQR`) | Einkommen (Destatis, Statistik Austria, BFS), Kaufpreise |
| **Linksschief (negativ)** | `Mittelwert < Median < Modus` | **Median (`x̃`)** | Interquartilsabstand (`IQR`) | Renteneintrittsalter, leichte Klausuren |
| **Ordinalskala** | Geordnete Rangstufen | **Median (`x̃`)** | `IQR` oder Perzentilspanne | Schulnoten, Schmerz- und Bewertungsskalen |
| **Schwere Ränder** | Mittelwert stark verzerrt | **Median (`x̃`)** | Median-Absolutabweichung (`MAD`) | Großschäden, Hochfrequenz-Renditen |

## Häufige Fehlerquellen und Praxistipps

- **Unsortierte Daten nicht direkt halbieren:** Ohne vorherige Sortierung würde im Wohnungsbeispiel der Extremwert `1.450 T€` an fünfter Stelle irrtümlich als Median abgelesen.
- **Quartilsdefinitionen sauber unterscheiden:** Während der Median weltweit einheitlich definiert ist, weichen `Q1` und `Q3` zwischen Tukeys Halbierung, Excel `QUARTIL.INKL` (R-Typ 7) und `QUARTIL.EXKL` (R-Typ 6) bei kleinem `n` leicht ab. Nennen Sie in Berichten und Abschlussarbeiten stets das genutzte Verfahren.
- **Teilgruppen-Mediane niemals mitteln:** Der Durchschnitt aus Filial-, Regionen- oder Monatsmedianen ergibt mathematisch nicht den Gesamtmedian. Führen Sie für belastbare Gesamtauswertungen immer die ursprünglichen Einzeldaten zusammen.
- **Offene Randklassen und Klassenbreite prüfen:** In amtlichen Einkommenstabellen mit offener Endklasse („über 10.000 €“) bleibt der Median exakt berechenbar, der Mittelwert dagegen nicht. Verwenden Sie bei ungleichen Intervallen stets die exakte Breite `b` der Medianklasse.
- **Dezimalkomma beim Import beachten:** Deutschsprachige Tabellen nutzen das Komma als Dezimalzeichen (`45,5`). Trennen Sie Eingaben zeilenweise oder per Semikolon, damit Kommas keinen Wert ungewollt in zwei Zahlen zerschneiden.
