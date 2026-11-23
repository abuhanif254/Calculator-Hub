---
title: "Statistik-Rechner"
metaTitle: "Statistik-Rechner: Mittelwert, Median, Varianz & Quartile"
description: "Analysieren Sie Datensätze präzise mit arithmetischem Mittel, Median, Modus, Varianz, Standardabweichung, Quartilen (IQR), Standardfehler sowie Schiefe und Kurtosis."
metaDescription: "Berechnen Sie Mittelwert, Median, Modus, Stichproben- & Grundgesamtheitsvarianz, Standardabweichung, Quartile (IQR) und Ausreißer Schritt für Schritt."
metaKeywords: "statistik rechner, deskriptive statistik rechner, standardabweichung berechnen, varianz rechner, median mittelwert modus, quartile iqr rechner, ausreißer berechnen"
faqs:
  - question: "Wann verwende ich die Stichproben-Standardabweichung (n − 1) statt der Grundgesamtheits-Standardabweichung (n)?"
    answer: "Die Grundgesamtheitsformel mit Nenner n gilt nur bei einer echten Vollerhebung, wenn wirklich jeder einzelne Wert der Zielgruppe vorliegt. Sobald Ihre Daten eine Teilmenge (Stichprobe) darstellen – etwa in Umfragen, Laborreihen oder der Qualitätsprüfung –, muss durch (n − 1) geteilt werden. Diese Bessel-Korrektur verhindert eine systematische Unterschätzung der wahren Streuung."
  - question: "Warum weichen arithmetisches Mittel und Median bei Gehältern oder Immobilienpreisen stark ab?"
    answer: "Das arithmetische Mittel bezieht jeden einzelnen Wert mit seinem vollen Betrag ein und wird durch wenige sehr hohe Extremwerte stark nach oben gezogen. Der Median teilt die sortierten Daten exakt in der Mitte und bleibt gegen Ausreißer immun. Deshalb weisen amtliche Statistiken im DACH-Raum bei Einkommen und Kaufpreisen stets den Median mit aus."
  - question: "Wie erkenne ich statistische Ausreißer objektiv mithilfe des Interquartilsabstands (IQR)?"
    answer: "Nach der Ausreißerregel von John Tukey gilt jeder Datenpunkt unterhalb von Q1 − 1,5 × IQR oder oberhalb von Q3 + 1,5 × IQR als statistischer Ausreißer. Werte jenseits von 3,0 × IQR werden als extreme Ausreißer eingestuft. Diese Methode ist deutlich robuster als die reine Standardabweichung, weil Q1 und Q3 selbst unempfindlich gegen Extremwerte sind."
  - question: "Was sagen Schiefe und Exzess-Kurtosis über die Form einer Verteilung aus?"
    answer: "Die Schiefe misst die Asymmetrie: Werte um 0 stehen für Symmetrie, positive Werte für eine rechtsschiefe Verteilung mit langem Ausläufer nach oben (typisch bei Wartezeiten oder Einkommen), negative Werte für Linksschiefe. Die Exzess-Kurtosis beschreibt das Gewicht der Verteilungsränder im Vergleich zur Normalverteilung – hohe positive Werte signalisieren gehäufte Extremereignisse."
  - question: "Warum liefern verschiedene Statistikprogramme manchmal leicht abweichende Quartilswerte?"
    answer: "Während der Median eindeutig definiert ist, existieren in der Statistik rund neun gängige Interpolationsverfahren für das erste und dritte Quartil (etwa die R-Standardmethode Typ 7 analog zu Excel QUARTIL.INKL sowie die exklusive Halbierung nach Tukey). Bei kleinen Datensätzen ohne doppelte Randwerte können die Ergebnisse daher minimal differieren."
---

Rohe Messwerte, Verkaufszahlen oder Umfrageergebnisse liefern für sich genommen kaum verlässliche Erkenntnisse. Erst die **deskriptive Statistik** verdichtet einen Datensatz in aussagekräftige **Lagemaße** (wo liegt das Zentrum?), **Streuungsmaße** (wie breit fächern sich die Werte auf?) und **Formmaße** (ist die Verteilung symmetrisch oder durch Extremwerte verzerrt?). Der **Statistik-Rechner** ermittelt aus beliebigen Zahlenreihen sämtliche zentralen Kennzahlen, von arithmetischem Mittel, Median und Modus über Stichproben- und Grundgesamtheitsvarianz bis hin zu Quartilen, Interquartilsabstand (`IQR`), Standardfehler, Schiefe und Kurtosis.

## Zentrale Formeln der deskriptiven Statistik

Für einen geordneten oder ungeordneten Datensatz aus **n** reellen Beobachtungen `x_1, x_2, ..., x_n` bilden folgende Gleichungen das mathematische Fundament jeder Auswertung:

```text
Arithmetisches Mittel:            x̄ = (1 / n) × Σ x_i
Grundgesamtheitsvarianz / -SD:    σ² = (1 / n) × Σ (x_i − x̄)²,       σ = √σ²
Stichprobenvarianz / -SD:         s² = [1 / (n − 1)] × Σ (x_i − x̄)²,  s = √s²
Standardfehler des Mittelwerts:   SE = s / √n
Interquartilsabstand & Grenzen:   IQR = Q3 − Q1,  Grenzen = [Q1 − 1,5×IQR ; Q3 + 1,5×IQR]
```

Hierbei bezeichnen **n** den Stichprobenumfang, **x_i** den einzelnen Messwert in der jeweiligen SI- oder Sachgröße (z. B. Minuten, Millimeter oder Euro), **x̄** das arithmetische Mittel, **x̃** den Median (50.-Perzentil), **Q1** das untere Quartil (25.-Perzentil) und **Q3** das obere Quartil (75.-Perzentil).

Der entscheidende Unterschied zwischen **σ²** und **s²** liegt in der **Bessel-Korrektur** (`n − 1` im Nenner): Weil der wahre Mittelwert der Grundgesamtheit `μ` unbekannt ist und durch das aus denselben Daten geschätzte `x̄` ersetzt wird, fallen die quadrierten Abweichungen um `x̄` systematisch etwas zu klein aus. Die Division durch `n − 1` Freiheitsgrade gleicht diese Verzerrung exakt aus und liefert einen erwartungstreuen Varianzschätzer.

## Durchgerechnetes Beispiel: Neun Fertigungszeiten mit Ausreißer

In einer Werkstätte werden neun Bearbeitungszeiten (in Minuten) für baugleiche Werkstücke gemessen. Sortiert lautet die Stichprobe (`n = 9`):

`19, 20, 20, 20, 23, 25, 28, 28, 42`

1. **Lagemaße berechnen:** Die Summe aller neun Messwerte beträgt `225 min`. Das **arithmetische Mittel** liegt bei `x̄ = 225 / 9 = 25,00 min`. Der exakt mittlere (fünfte) Wert liefert den **Median `x̃ = 23,00 min`**. Am häufigsten tritt der Wert `20` (dreimal) auf und bildet damit den eindeutigen **Modus (`20 min`)**. Die **Spannweite** beträgt `42 − 19 = 23 min`.
2. **Quadratsumme der Abweichungen bestimmen:** Die Differenzen `(x_i − 25)` lauten `−6, −5, −5, −5, −2, 0, +3, +3, +17`. Quadriert und aufsummiert ergibt sich `36 + 25 + 25 + 25 + 4 + 0 + 9 + 9 + 289 = 422,00 min²`.
3. **Varianz, Standardabweichung und Standardfehler ermitteln:**
   - **Stichprobe (`n − 1 = 8`):** `s² = 422 / 8 = 52,75 min²`, Stichproben-Standardabweichung **`s = √52,75 ≈ 7,26 min`**, Standardfehler **`SE = 7,26 / √9 = 2,42 min`**.
   - **Grundgesamtheit (`n = 9`):** `σ² = 422 / 9 ≈ 46,89 min²`, Standardabweichung **`σ = √46,89 ≈ 6,85 min`**.
4. **Quartile und Ausreißerprüfung nach Tukey:** Unteres Quartil **`Q1 = 20 min`**, oberes Quartil **`Q3 = 28 min`**, **Interquartilsabstand `IQR = 28 − 20 = 8 min`**. Die obere Zaungrenze liegt bei `28 + 1,5 × 8 = 40 min`, die untere bei `20 − 1,5 × 8 = 8 min`. Der Messwert **42 min** überschreitet 40 min und wird objektiv als **Ausreißer** identifiziert; allein er erzeugt **289 von 422 min²** (**68,5 %**) der gesamten Quadratsumme.
5. **Auswirkung des Ausreißers und Schiefe:** Durch den Ausreißer entsteht eine deutliche **Rechtsschiefe** (Stichproben-Schiefe `G1 = +1,83`), erkennbar an der klassischen Reihenfolge `x̄ > x̃ > Modus` (`25,00 > 23,00 > 20`). Entfernt man den einzelnen Störfall `42 min`, sinkt der Mittelwert auf **22,88 min** und die Stichproben-Standardabweichung schrumpft fast auf die Hälfte (**3,72 min**), während der robuste Median nur moderat auf **21,50 min** nachgibt.

## Entscheidungshilfe: Welche Kennzahl passt zu welchem Datensatz?

| Kennzahl | Berechnung / Bedeutung | Ausreißer-robust? | Erforderliches Skalenniveau | Typische Anwendung im DACH-Raum |
| :--- | :--- | :--- | :--- | :--- |
| **Arithmetisches Mittel (`x̄`)** | Summe aller Werte geteilt durch `n` | Nein | Metrisch | Symmetrische Labor- und Fertigungsmessungen, Durchschnittsumsatz |
| **Median (`x̃`)** | Mittlerer Wert (50.-Perzentil) | Ja | Ordinal & metrisch | Einkommensberichte (Destatis, Statistik Austria, BFS), Immobilienpreise |
| **Modus (`x_mod`)** | Häufigster Wert im Datensatz | Ja | Ab Nominalskala | Häufigste Fehlerart, Konfektionsgrößen, meistgewählte Tarifstufe |
| **Standardabweichung (`s` / `σ`)** | Wurzel der Varianz (in Originaleinheit) | Nein | Metrisch | Prozessfähigkeit in der Qualitätssicherung, Aktien-Volatilität |
| **Interquartilsabstand (`IQR`)** | `Q3 − Q1` (mittlere 50 % der Daten) | Ja | Ordinal & metrisch | Schiefe Verteilungen, Boxplot-Vergleiche, Ausreißeranalyse |
| **Spannweite (`R`)** | `Maximum − Minimum` | Nein (sehr empfindlich) | Metrisch | Schneller Plausibilitätscheck für Temperatur- oder Preiskorridore |

Bei annähernd symmetrischen, glockenförmigen Messreihen hilft zusätzlich die **68-95-99,7-Regel** der Normalverteilung: Rund **68,3 %** aller Werte liegen innerhalb einer einfachen Standardabweichung um den Mittelwert (`x̄ ± 1s`), **95,4 %** innerhalb von `x̄ ± 2s` und **99,7 %** innerhalb von `x̄ ± 3s`. Prüfen Sie jedoch stets das Histogramm und den Boxplot, denn sobald Ihre Daten deutlich schief verlaufen oder mehrere ausgeprägte Gipfel aufweisen, liefern Median und Quartile das deutlich verlässlichere Lagebild.

## Häufige Interpretationsfehler in Studium, Forschung und Praxis

- **Stichprobe und Grundgesamtheit sauber trennen:** Bei kleinen Stichproben (`n < 30`) weichen `s` und `σ` spürbar voneinander ab; im obigen Beispiel beträgt der Unterschied über **6 %** (`7,26` gegenüber `6,85 min`). Prüfen Sie vor jeder Auswertung sorgfältig, ob Sie eine Stichprobe analysieren oder tatsächlich sämtliche Einheiten erhoben haben.
- **Standardabweichung nicht mit Standardfehler verwechseln:** Die Standardabweichung `s` zeigt, wie stark einzelne Beobachtungen streuen; sie bleibt bei größeren Stichproben ungefähr konstant. Der Standardfehler `SE = s / √n` beschreibt dagegen die Präzision des geschätzten Mittelwerts und schrumpft mit steigendem Stichprobenumfang.
- **Ausreißer prüfen statt blind entfernen:** Ein Wert oberhalb von `Q3 + 1,5 × IQR` kann ein Eingabefehler sein oder auf einen realen Werkzeugbruch mit hoher wirtschaftlicher Relevanz hinweisen. Dokumentieren Sie Ergebnisse im Zweifel einmal für den vollständigen und einmal für den bereinigten Datensatz.
- **Dezimalkomma beim Datenimport beachten:** Deutschsprachige Excel- und CSV-Tabellen nutzen standardmäßig das Komma als Dezimaltrennzeichen (`12,5`). Wenn ein Eingabefeld Kommas als Werttrenner interpretiert, wird `12,5` irrtümlich in zwei separate Zahlen (`12` und `5`) zerlegt. Verwenden Sie beim Einfügen daher Dezimalpunkte oder trennen Sie Messwerte zeilenweise ohne Tausenderpunkte.
