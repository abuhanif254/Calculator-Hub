---
title: "Den T-Test verstehen: Unabhängige vs. verbundene Stichproben"
description: "Praxisleitfaden zum t-Test: Einstichproben-, Zweistichproben- und gepaarter t-Test, Welch-Korrektur, Freiheitsgrade, p-Wert, Effektstärke Cohens d und Fehlerquellen."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "t-test-calculator"
faqs:
  - question: "Wann verwendet man den Welch-t-Test statt des klassischen Student-t-Tests?"
    answer: "Der klassische Student-t-Test setzt exakt gleiche Varianzen in beiden Gruppen (Varianzhomogenität) voraus. Der Welch-t-Test verzichtet auf diese Annahme, passt die Freiheitsgrade über die Welch-Satterthwaite-Gleichung an und liefert auch bei ungleichen Streuungen oder Gruppengrößen zuverlässige Fehlerquoten. In der modernen Statistik gilt der Welch-t-Test daher als empfohlener Standard für unabhängige Gruppen."
  - question: "Worin liegt der Unterschied zwischen einem einseitigen und einem zweiseitigen t-Test?"
    answer: "Ein zweiseitiger t-Test prüft ungerichtet auf Abweichungen in beide Richtungen (μ₁ ≠ μ₂) und halbiert das Signifikanzniveau α auf beide Ränder der t-Verteilung. Ein einseitiger Test prüft ausschließlich auf eine vorab festgelegte Richtung (z. B. μ₁ > μ₂) und besitzt dort zwar höhere Teststärke, übersieht jedoch selbst starke Effekte in die Gegenrichtung und muss vor der Datenerhebung präregistriert sein."
  - question: "Wie groß muss eine Stichprobe sein, damit der t-Test verlässliche Ergebnisse liefert?"
    answer: "Bei annähernd normalverteilten Messwerten funktioniert der t-Test bereits bei sehr kleinen Stichproben (ab etwa n = 5 bis 10 pro Gruppe) exakt, sofern keine starken Ausreißer vorliegen. Bei schiefen Verteilungen greift ab rund n ≥ 30 pro Gruppe der Zentrale Grenzwertsatz, sodass die Verteilung des Mittelwerts ausreichend normalverteilt bleibt."
  - question: "Warum reicht der p-Wert allein nicht aus und warum sollte man Cohens d angeben?"
    answer: "Der p-Wert misst lediglich, wie unwahrscheinlich die beobachteten Daten unter Geltung der Nullhypothese sind, und hängt stark von der Stichprobengröße ab: Bei tausenden Fällen wird selbst ein praktisch belangloser Unterschied hochsignifikant. Die Effektstärke Cohens d normiert die Mittelwertdifferenz an der Streuung und zeigt unabhängig von n die tatsächliche praktische Relevanz."
  - question: "Welche nichtparametrischen Alternativen gibt es bei verletzten Voraussetzungen?"
    answer: "Sind die Daten lediglich ordinalskaliert, extrem schief verteilt oder durch Ausreißer verzerrt, ersetzt man den unabhängigen t-Test durch den Mann-Whitney-U-Test (Wilcoxon-Rangsummentest) und den verbundenen t-Test durch den Wilcoxon-Vorzeichen-Rang-Test. Beide Verfahren werten Ränge statt metrischer Mittelwerte aus."
---

Der **t-Test** (nach William Sealy Gosset, Pseudonym *„Student“*) ist ein parametrisches Verfahren der Inferenzstatistik, mit dem Sie prüfen, ob ein beobachteter Unterschied zwischen Mittelwerten statistisch signifikant ist oder im Bereich zufälliger Stichprobenschwankungen liegt. Im Gegensatz zum Z-Test ist beim t-Test die wahre Standardabweichung `σ` der Grundgesamtheit unbekannt und wird aus den Stichprobendaten geschätzt — die Prüfgröße folgt daher der etwas breiter gestreuten `t`-Verteilung, deren genaue Form von den Freiheitsgraden (`df`) abhängt.

Für die korrekte Anwendung ist vor allem die Unterscheidung zwischen **unabhängigen** und **verbundenen (gepaarten)** Stichproben entscheidend: Unabhängige Tests vergleichen zwei getrennte Gruppen (etwa Kontroll- vs. Interventionsgruppe), während verbundene Tests Messwertpaare derselben Untersuchungseinheiten vergleichen (etwa Vorher-Nachher-Messungen). Neben dem `p`-Wert sollte eine vollständige Auswertung stets auch das Konfidenzintervall und die Effektstärke `Cohens d` ausweisen.

## Die drei Varianten des t-Tests und ihre Formeln

Je nach Studiendesign kommen drei Varianten zum Einsatz, die sich in der Berechnung des Standardfehlers (`SE`) und der Freiheitsgrade unterscheiden.

### 1. Einstichproben-t-Test (One-Sample)

Hierbei wird der Mittelwert `x̄` einer einzigen Stichprobe vom Umfang `n` gegen einen bekannten Soll- oder Referenzwert `μ₀` geprüft:

```text
t = (x̄ − μ₀) / (s / √n)
df = n − 1
```

### 2. Unabhängiger Zweistichproben-t-Test (Student vs. Welch)

Bei zwei getrennten Gruppen mit den Mittelwerten `x̄₁`, `x̄₂`, den Standardabweichungen `s₁`, `s₂` und den Stichprobengrößen `n₁`, `n₂` unterscheidet man zwischen dem klassischen Student-t-Test (gepoolte Varianz `s_p²` bei gleicher Streuung) und dem robusteren Welch-t-Test:

```text
Student (gepoolt):  s_p² = [ (n₁ − 1) × s₁² + (n₂ − 1) × s₂² ] / (n₁ + n₂ − 2)
                    t = (x̄₁ − x̄₂) / (s_p × √(1/n₁ + 1/n₂))
                    df = n₁ + n₂ − 2

Welch (Standard):   t = (x̄₁ − x̄₂) / √(s₁²/n₁ + s₂²/n₂)
```

Die Freiheitsgrade beim Welch-Test fallen meist nicht-ganzzahlig aus (`df ≤ n₁ + n₂ − 2`) und werden über die Welch-Satterthwaite-Näherung berechnet.

### 3. Verbundener (gepaarter) t-Test

Liegen `n` zusammengehörige Messpaare vor, bildet man zunächst für jedes Paar die Differenz `dᵢ = xᵢ,₁ − xᵢ,₂` und testet deren Mittelwert `d̄` mit der Differenz-Standardabweichung `s_d` gegen null:

```text
t = d̄ / (s_d / √n)
df = n − 1
```

Da die interindividuelle Grundstreuung zwischen den Personen herausfällt, besitzt der verbundene t-Test bei positiven Korrelationen eine deutlich höhere statistische Trennschärfe (Power) als der unabhängige Test. Zur Einordnung der Effektgröße dient **Cohens d**: `d = (x̄₁ − x̄₂) / s_p` (bzw. `d̄ / s_d` im gepaarten Fall), wobei Werte ab `0,2` als klein, ab `0,5` als mittel und ab `0,8` als groß gelten.

## Schritt-für-Schritt-Rechenbeispiel: Vergleich zweier Lehrmethoden

In einer Studie werden `32` Teilnehmende zufällig zwei Gruppen zugeteilt (unabhängige Stichproben). Gruppe A (`n₁ = 16`) erzielt `x̄₁ = 78,0 Punkte` (`s₁ = 6,0`, `s₁² = 36`), Gruppe B (`n₂ = 16`) erreicht `x̄₂ = 72,0 Punkte` (`s₂ = 8,0`, `s₂² = 64`). Geprüft wird zweiseitig bei `α = 0,05` (`H₀: μ₁ = μ₂`).

1. **Gepoolte Varianz `s_p²`:** `s_p² = (15 × 36 + 15 × 64) / 30 = 1.500 / 30 = 50,0`, also `s_p = √50,0 ≈ 7,071`.
2. **Standardfehler und `t`-Wert:** `SE = 7,071 × √(1/16 + 1/16) = √6,25 = 2,50`, woraus `t = (78,0 − 72,0) / 2,50 = 2,40` folgt (Welch-Test liefert identisch `t = 2,40` bei `df ≈ 27,82`).
3. **Signifikanzprüfung:** Bei `df = 30` beträgt der kritische Wert `t_krit = 2,042`. Da `|2,40| > 2,042`, wird `H₀` verworfen (`p ≈ 0,0228`; Welch `p ≈ 0,0233`).
4. **Effektstärke:** `Cohens d = 6,0 / 7,071 ≈ 0,85` — ein großer praktischer Effekt.

## Vergleichstabelle: Varianten des t-Tests und nichtparametrische Alternativen

| Testverfahren | Anwendungsfall | Freiheitsgrade (`df`) | Varianzannahme | Besonderheit / Empfehlung |
|---|---|---|---|---|
| **Einstichproben-t-Test** | 1 Gruppe vs. Sollwert `μ₀` | `n − 1` | Keine zweite Gruppe | Ideal für Qualitäts- und Sollwertprüfungen |
| **Student-t-Test (unabhängig)** | 2 getrennte Gruppen | `n₁ + n₂ − 2` | Gleiche Varianzen erforderlich | Empfindlich bei ungleichen Gruppengrößen und Varianzen |
| **Welch-t-Test (unabhängig)** | 2 getrennte Gruppen | Welch-Satterthwaite | Ungleiche Varianzen erlaubt | Empfohlener Standard ohne Levene-Vortest |
| **Verbundener t-Test** | Messpaare / Vorher-Nachher | `n − 1` (Paarzahl) | Differenzen normalverteilt | Sehr hohe Power bei abhängigen Messungen |
| **Mann-Whitney-U-Test** | 2 getrennte Gruppen (nichtparametrisch) | Rangsummen-basiert | Keine Normalverteilung nötig | Alternative bei schiefen Daten oder Ordinalskala |
| **Wilcoxon-Vorzeichen-Rang-Test** | Messpaare (nichtparametrisch) | Rang-basiert | Symmetrische Differenzen | Alternative zum verbundenen t-Test bei Ausreißern |

## Voraussetzungen, Fehlerquellen und methodische Einordnung

Damit der `t`-Test gültige Fehlerwahrscheinlichkeiten liefert, müssen vier Kernvoraussetzungen erfüllt sein: Die abhängige Variable ist metrisch (intervall- oder verhältnisskaliert), die Beobachtungen innerhalb einer Gruppe sind voneinander unabhängig, die Gruppenvariablen sind annähernd normalverteilt (ab `n ≥ 30` je Gruppe schützt der Zentrale Grenzwertsatz weitgehend vor Verletzungen) und beim klassischen Student-Test liegt Varianzhomogenität vor.

In empirischen Studien und Bachelor- bzw. Masterarbeiten treten vier Fehler besonders häufig auf:

- **Fehlzuordnung unabhängig vs. verbunden:** Werden abhängige Vorher-Nachher-Messungen fälschlich als unabhängige Gruppen ausgewertet, wird die positive Korrelation zwischen den Messzeitpunkten ignoriert und die statistische Teststärke verschenkt; umgekehrt führt eine fälschliche Paarung unabhängiger Fälle zu unzulässigen Ergebnissen.
- **Multiples Testen ohne Korrektur:** Wer bei zehn Variablen zehn separate `t`-Tests zum Niveau `α = 0,05` durchführt, treibt die Wahrscheinlichkeit für mindestens einen falsch-positiven Befund (Alpha-Fehler-Kumulierung) auf rund `40 %`. Abhilfe schaffen Verfahren wie die Bonferroni- oder Holm-Korrektur bzw. eine Varianzanalyse (ANOVA).
- **Fehlinterpretation von `p > 0,05`:** Ein nicht signifikantes Ergebnis beweist niemals die Gleichheit zweier Gruppen (`H₀`), sondern besagt lediglich, dass die vorliegende Stichprobe nicht ausreicht, um einen Unterschied abzusichern — häufig infolge zu geringer Stichprobengröße (Typ-II-Fehler / `β`-Fehler).
- **Signifikanz mit Relevanz verwechseln:** Prüfen Sie nach jedem signifikanten `t`-Test neben dem `p`-Wert stets das 95-%-Konfidenzintervall der Mittelwertdifferenz und `Cohens d`, um den tatsächlichen Nutzen in der Anwendungspraxis zu bewerten.
