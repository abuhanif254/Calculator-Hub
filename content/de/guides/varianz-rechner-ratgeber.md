---
title: "Varianz verstehen: Populations- vs. Stichprobenformeln"
description: "Erfahren Sie den Unterschied zwischen Populationsvarianz (σ²) und Stichprobenvarianz (s²), verstehen Sie Bessels Korrektur (n − 1) und berechnen Sie die Streuung anhand eines Beispiels."
category: "Math & Science"
relatedCalculator: "variance-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum teilt man bei der Stichprobenvarianz durch n − 1 statt durch n?"
    answer: "Weil der wahre Populationsmittelwert μ bei einer Stichprobe unbekannt ist und durch den empirischen Stichprobenmittelwert x̄ geschätzt wird. Da x̄ exakt im Schwerpunkt der Stichprobe liegt, fallen die quadrierten Abweichungen um x̄ systematisch kleiner aus als um μ. Die Division durch n − 1 (Bessels Korrektur) gleicht diese Unterschätzung aus und macht s² zu einem erwartungstreuen Schätzer."
  - question: "Wann verwende ich die Populationsvarianz (σ²) und wann die Stichprobenvarianz (s²)?"
    answer: "Die Populationsvarianz σ² verwenden Sie ausschließlich dann, wenn Ihnen ausnahmslos alle Elemente der betrachteten Grundgesamtheit vorliegen – etwa die Abschlussnoten eines kompletten Jahrgangs oder alle Tagesumsätze eines Jahres. Sobald Ihre Daten lediglich eine Teilmenge darstellen, aus der Sie auf eine größere Grundgesamtheit schließen möchten, ist die Stichprobenvarianz s² korrekt."
  - question: "Was ist der Unterschied zwischen Varianz und Standardabweichung?"
    answer: "Die Varianz ist der Durchschnitt der quadrierten Abweichungen vom Mittelwert und trägt deshalb stets das Quadrat der ursprünglichen Maßeinheit (zum Beispiel Euro² oder Millimeter²). Die Standardabweichung ist die positive Quadratwurzel der Varianz und besitzt wieder exakt dieselbe Einheit wie die Ausgangsdaten, was die direkte Interpretation erheblich erleichtert."
  - question: "Kann eine Varianz jemals negativ werden?"
    answer: "Nein, eine Varianz ist aus mathematischen Gründen immer größer oder gleich null. Da jede einzelne Abweichung vom Mittelwert quadriert wird, sind sämtliche Summanden nichtnegativ. Den Wert 0 nimmt die Varianz genau dann an, wenn alle Datenpunkte in der Menge exakt identisch sind und keinerlei Streuung vorliegt."
  - question: "Warum reagieren Varianz und Standardabweichung so empfindlich auf Ausreißer?"
    answer: "Durch das Quadrieren der Abweichungen gehen einzelne Extremwerte überproportional stark in die Quadratsumme ein: Ein Datenpunkt mit dem fünffachen Abstand zum Mittelwert trägt 25-mal so stark zur Varianz bei wie ein Punkt mit einfachem Abstand. Bei stark schiefen Verteilungen mit extremen Ausreißern empfiehlt sich ergänzend der robuste Interquartilsabstand (IQR)."
---

Die Varianz ist das zentrale statistische Maß zur Beschreibung der Streuung einer Datenreihe um ihren arithmetischen Mittelwert. Während Mittelwert oder Median lediglich das Zentrum einer Verteilung abbilden, zeigt die Varianz, wie homogen oder breit gefächert die Einzelwerte um dieses Zentrum liegen: Eine kleine Varianz signalisiert eng gebündelte Messwerte, eine große Varianz weist auf starke Schwankungen hin.

Mit unserem [Varianzrechner](/de/rechner/varianz-rechner) ermitteln Sie Populations- und Stichprobenvarianz sowie die zugehörige Standardabweichung samt Zwischenschritten direkt aus Ihrer Zahlenliste. Für eine fundierte Auswertung ist vor allem entscheidend, ob Sie eine vollständige Grundgesamtheit beschreiben oder aus einer Stichprobe auf ein größeres Kollektiv schließen – denn davon hängt ab, ob im Nenner `N` oder `n − 1` steht.

## Mathematische Definition und Parameter der Varianz

In der Statistik unterscheidet man zwischen der **Populationsvarianz (`σ²`)** für eine vollständig erfasste Grundgesamtheit und der **Stichprobenvarianz (`s²`)** für eine Teilmenge:

```text
Populationsvarianz:  σ² = (1 / N)       × Σ (x_i − μ)²   für i = 1 bis N
Stichprobenvarianz:  s² = [1 / (n − 1)] × Σ (x_i − x̄)²   für i = 1 bis n
```

Die Parameter besitzen folgende exakte Bedeutung:

- **`x_i`:** Der `i`-te beobachtete Einzelwert im Datensatz.
- **`μ` bzw. `x̄`:** Der arithmetische Mittelwert der Grundgesamtheit (`μ`) beziehungsweise der gezogenen Stichprobe (`x̄`).
- **`N` bzw. `n`:** Die Gesamtanzahl der Elemente in der Population (`N`) oder in der Stichprobe (`n`).
- **`Σ (x_i − x̄)²`:** Die Summe der Abweichungsquadrate (Quadratsumme, oft als `SS` abgekürzt). Das Quadrieren verhindert, dass sich positive und negative Abweichungen gegenseitig aufheben, und gewichtet größere Ausreißer stärker.
- **`n − 1` (Bessels Korrektur):** Die Anzahl der **Freiheitsgrade**. Da der Stichprobenmittelwert `x̄` aus denselben `n` Datenpunkten berechnet wird, liegen nur `n − 1` Abweichungen frei fest; die letzte ergibt sich zwangsläufig aus der Bedingung `Σ (x_i − x̄) = 0`. Die Division durch `n − 1` korrigiert die systematische Unterschätzung der wahren Streuung.

Zieht man aus der Varianz die positive Quadratwurzel (`σ = √σ²` beziehungsweise `s = √s²`), erhält man die **Standardabweichung**, die wieder in der Originaleinheit der Messwerte vorliegt.

## Schritt-für-Schritt-Beispiel: Populations- vs. Stichprobenvarianz

Angenommen, Sie prüfen fünf gefertigte Wellen auf ihren Außendurchmesser (in Millimetern) und messen die Werte `14 mm`, `16 mm`, `17 mm`, `20 mm` und `23 mm`. Nachfolgend sehen Sie die exakte Berechnung für beide Fälle:

1. **Arithmetischen Mittelwert bestimmen:**
   `x̄ = (14 + 16 + 17 + 20 + 23) / 5 = 90 / 5 = 18 mm`
2. **Einzelabweichungen berechnen (`x_i − 18`):**
   - `14 − 18 = −4`
   - `16 − 18 = −2`
   - `17 − 18 = −1`
   - `20 − 18 = +2`
   - `23 − 18 = +5`
   (Kontrollsumme: `−4 − 2 − 1 + 2 + 5 = 0`)
3. **Abweichungen quadrieren und summieren (`SS`):**
   `(−4)² + (−2)² + (−1)² + 2² + 5² = 16 + 4 + 1 + 4 + 25 = 50 mm²`
4. **Durch `N` oder `n − 1` dividieren:**
   - **Als vollständige Population (`N = 5`):** `σ² = 50 / 5 = 10,00 mm²` → Standardabweichung `σ = √10 ≈ 3,162 mm`.
   - **Als Stichprobe (`n = 5`, `n − 1 = 4`):** `s² = 50 / 4 = 12,50 mm²` → Standardabweichung `s = √12,5 ≈ 3,536 mm`.

Bei lediglich fünf Beobachtungen fällt die Stichprobenvarianz um exakt `25 %` höher aus als die Populationsvarianz (`5 / 4 = 1,25`). Bei größeren Stichproben schrumpft dieser relative Unterschied rasch zusammen: Bei `n = 100` beträgt das Verhältnis `100 / 99 ≈ 1,0101` (nur noch `1,01 %` Differenz).

## Vergleich von Streuungsmaßen und Stichprobengrößen

Die nachstehende Übersicht fasst anhand der berechneten Quadratsumme `SS = 50 mm²` (`x̄ = 18 mm`) zusammen, wie sich Nenner, Ergebniswert und Maßeinheit je nach Kennzahl unterscheiden:

| Kennzahl | Formel / Faktor | Ergebnis (Beispiel) | Maßeinheit | Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- |
| Populationsvarianz (`σ²`) | `SS / N` (`N = 5`) | `10,00` | `mm²` | Vollerhebungen, abgeschlossene Kollektive |
| Stichprobenvarianz (`s²`) | `SS / (n − 1)` (`n = 5`) | `12,50` | `mm²` | Inferenzstatistik, Labor- und Qualitätsproben |
| Populationsstandardabweichung (`σ`) | `√(SS / N)` | `3,162` | `mm` | Beschreibende Risiko- und Prozessberichte |
| Stichprobenstandardabweichung (`s`) | `√[SS / (n − 1)]` | `3,536` | `mm` | Konfidenzintervalle, t-Tests, Prozessfähigkeiten |
| Variationskoeffizient (`VK`) | `(s / x̄) × 100 %` | `19,64 %` | Dimensionslos (`%`) | Vergleich von Datensätzen mit ungleichen Einheiten |
| Stichprobenvarianz bei `n = 100` | Korrekturfaktor `100 / 99` | `+1,01 %` vs. `σ²` | Quadrateinheit | Große Stichproben (Vernachlässigbare Differenz) |

## Praktische Anwendung, Ausreißer-Sensitivität und Fehlerquellen

In der industriellen Qualitätskontrolle steuern Varianz und Standardabweichung über Prozessfähigkeitsindizes (`C_p` und `C_pk`), ob Fertigungstoleranzen sicher eingehalten werden. Im Portfoliomanagement dient die Stichprobenvarianz historischer Renditen als Ausgangspunkt für die Volatilität sowie zur Berechnung von Kovarianzen bei der Diversifikation. In der Messtechnik quantifiziert sie die Wiederholpräzision von Analysegeräten.

Vermeiden Sie bei eigenen Berechnungen vier verbreitete Stolpersteine:

- **Falsche Tabellenkalkulations-Funktion:** In Microsoft Excel und LibreOffice Calc berechnet `VAR.P` (ältere Versionen: `VARIANZEN`) die Populationsvarianz mit `N`, während `VAR.S` (`VARIANZ`) durch `n − 1` teilt. Ein verwechselter Funktionsaufruf verfälscht bei kleinen Stichproben (`n < 20`) nachfolgende Hypothesentests deutlich.
- **Fehlinterpretation der Maßeinheit:** Die Varianz einer Kostenreihe in Euro hat die Einheit `€²` und darf nicht direkt mit dem Mittelwert addiert oder subtrahiert werden; dafür ist stets die Standardabweichung heranzuziehen.
- **Verzerrung durch extreme Ausreißer:** Einzelne Messfehler schlagen quadratisch auf `s²` durch. Prüfen Sie Rohdaten vorab auf Erfassungsfehler und ziehen Sie bei stark schiefen Verteilungen zusätzlich den Median und den Interquartilsabstand heran.
- **Numerische Auslöschung bei Verschiebungsformeln:** Die algebraisch äquivalente Kurzformel `(1 / n) × Σ x_i² − x̄²` kann bei großen Zahlen mit winziger Streuung (etwa `1.000.000,01` und `1.000.000,02`) im Computer durch Subtraktion fast gleich großer Gleitkommazahlen komplett falsche oder sogar negative Werte liefern. Stabile Rechner und Algorithmen wie das Verfahren nach Welford subtrahieren deshalb stets erst den Mittelwert oder aktualisieren die Abweichungen iterativ.
