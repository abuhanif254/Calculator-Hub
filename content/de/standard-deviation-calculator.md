---
title: "Standardabweichungs-Rechner"
metaTitle: "Standardabweichung berechnen | Stichprobe & Grundgesamtheit"
description: "Berechnen Sie Standardabweichung, Varianz, Mittelwert, Standardfehler und Variationskoeffizient präzise für Stichproben (Bessel-Korrektur) und Grundgesamtheiten."
metaDescription: "Kostenloser Standardabweichungs-Rechner: Berechnen Sie Stichproben- und Populations-Standardabweichung, Varianz, Mittelwert und Standardfehler."
metaKeywords: "standardabweichung rechner, varianz berechnen, stichproben standardabweichung, bessel korrektur, grundgesamtheit, mittelwert, variationskoeffizient, statistik"
faqs:
  - question: "Wann verwende ich die Stichproben-Standardabweichung (s) und wann die Grundgesamtheit (σ)?"
    answer: "Die Populations-Standardabweichung σ (Division durch N) gilt ausschließlich dann, wenn wirklich jedes einzelne Element der untersuchten Gesamtheit vorliegt – etwa alle 24 Prüfungsergebnisse einer einzelnen Schulklasse, über die keine weitergehende Aussage getroffen wird. Sobald Ihre Daten eine Teilmenge einer größeren Gesamtheit oder eines laufenden Prozesses darstellen, müssen Sie zwingend die Stichproben-Standardabweichung s mit Bessel-Korrektur (n − 1) nutzen."
  - question: "Warum teilt die Stichprobenvarianz durch (n − 1) statt durch n?"
    answer: "In einer Stichprobe ist der wahre Mittelwert μ der Grundgesamtheit unbekannt und wird durch den Stichprobenmittelwert x̄ geschätzt. Da die Beobachtungen im Schnitt näher an ihrem eigenen Stichprobenmittelwert liegen als am unbekannten wahren μ, würde die Division durch n die tatsächliche Streuung systematisch unterschätzen. Die Bessel-Korrektur (n − 1) gleicht diesen Verlust eines Freiheitsgrads aus und macht die Varianzschätzung s² erwartungstreu."
  - question: "Worin unterscheiden sich Standardabweichung und Varianz?"
    answer: "Die Varianz (s² oder σ²) ist der Durchschnitt der quadrierten Abweichungen vom Mittelwert und trägt deshalb eine quadrierte Maßeinheit (z. B. cm² oder Euro²). Die Standardabweichung ist die positive Quadratwurzel der Varianz. Sie besitzt wieder exakt dieselbe Einheit wie die Ursprungsdaten und lässt sich daher unmittelbar mit dem Mittelwert vergleichen."
  - question: "Was unterscheidet die Standardabweichung vom Standardfehler des Mittelwerts (SE)?"
    answer: "Die Standardabweichung beschreibt, wie stark einzelne Messwerte um den Durchschnitt streuen – sie bleibt auch bei sehr großen Stichproben annähernd stabil. Der Standardfehler SE = s / √n misst dagegen, wie genau der geschätzte Mittelwert selbst den wahren Populationsmittelwert trifft, und wird mit steigender Stichprobengröße n immer kleiner."
  - question: "Wann ist der Variationskoeffizient (VK) aussagekräftiger als die Standardabweichung?"
    answer: "Der Variationskoeffizient setzt die Standardabweichung ins Verhältnis zum Mittelwert (VK = s / x̄ × 100 %). Er ermöglicht den direkten Streuungsvergleich zwischen Datensätzen mit völlig unterschiedlichen Größenordnungen oder Einheiten – etwa zwischen der Gewichtsschwankung einer 500-g-Packung und einer 25-kg-Industriecharge. Voraussetzung ist eine positive Verhältnisskala mit echtem Nullpunkt."
---

Der bloße Durchschnitt sagt über die Wirklichkeit eines Datensatzes oft überraschend wenig aus. Zwei Produktionslinien können im Mittel exakt **500,0 g** abfüllen – während die erste Maschine präzise zwischen 498 g und 502 g arbeitet, schwankt die zweite zwischen 470 g und 530 g und produziert laufend Ausschuss. Ebenso können zwei Aktienfonds über zehn Jahre identische Durchschnittsrenditen erzielen, jedoch völlig unterschiedliche Kursabstürze aufweisen.

Die **Standardabweichung** schließt genau diese Informationslücke: Sie quantifiziert in derselben Maßeinheit wie Ihre Ursprungsdaten, wie stark einzelne Beobachtungen im Mittel um den Durchschnitt streuen. Unser **Standardabweichungs-Rechner** bestimmt aus beliebig vielen Messwerten gleichzeitig **Stichproben- und Grundgesamtheits-Standardabweichung**, **Varianz**, **Mittelwert**, **Quadratsumme**, **Standardfehler**, **Variationskoeffizient** sowie **Quartile und Ausreißer nach Tukey**.

## Formeln für Stichprobe, Grundgesamtheit und abgeleitete Streuungsmaße

Nach DIN ISO 3534 und statistischer Standardkonvention unterscheiden sich die Gleichungen für eine unvollständige **Stichprobe** (`s`) und eine vollständig erfasste **Grundgesamtheit** (`σ`) allein im Nenner der Varianz:

```text
Mittelwert & Quadratsumme:  x̄ = (1 / n) × ∑ x_i   |   SS = ∑ (x_i − x̄)²
Stichprobe (Bessel):        s² = SS / (n − 1)     |   s = √s²
Grundgesamtheit:            σ² = SS / N           |   σ = √σ²
Standardfehler & relative Streuung: SE = s / √n   |   VK = (s / x̄) × 100 %
```

Dabei steht **x_i** für jeden einzelnen Messwert, **n** bzw. **N** für die Anzahl der Beobachtungen, **x̄** (oder **μ**) für das arithmetische Mittel, **s²** bzw. **σ²** für die Varianz und **s** bzw. **σ** für die Standardabweichung. Durch das Quadrieren der Einzelabweichungen heben sich positive und negative Differenzen nicht gegenseitig auf; zugleich erhalten weiter entfernte Werte ein überproportionales Gewicht. Die anschließende Quadratwurzel führt das Ergebnis zurück in die ursprüngliche SI- oder Währungseinheit (`g`, `mm`, `s`, `€`, `%`).

## Schritt-für-Schritt-Rechenbeispiel: Qualitätskontrolle in der Abfüllung

In einer Kaffeerösterei werden sechs zufällig ausgewählte 500-g-Packungen aus einer laufenden Tagesproduktion gewogen. Die Stichprobe (`n = 6`) liefert folgende Messwerte in Gramm: **496 g, 502 g, 499 g, 505 g, 498 g und 500 g**.

**1. Summe und Mittelwert berechnen:**
Die Summe aller sechs Messwerte beträgt `496 + 502 + 499 + 505 + 498 + 500 = 3.000 g`. Geteilt durch sechs Beobachtungen ergibt sich exakt der Mittelwert `x̄ = 500,00 g`.

**2. Abweichungen vom Mittelwert quadrieren und summieren:**
Die Einzelabweichungen `(x_i − x̄)` lauten `-4 g`, `+2 g`, `-1 g`, `+5 g`, `-2 g` und `0 g` (ihre Summe ist stets genau null). Quadriert entstehen die Werte `16`, `4`, `1`, `25`, `4` und `0 g²`, woraus eine Abweichungsquadratsumme von **`SS = 50,00 g²`** folgt.

**3. Varianz und Standardabweichung bestimmen:**
Da sechs Packungen lediglich eine Stichprobe aus tausenden Tageseinheiten bilden, gilt die **Stichprobenformel** mit fünf Freiheitsgraden (`n − 1 = 5`):
- Stichprobenvarianz: `s² = 50,00 / 5 = 10,00 g²`
- Stichproben-Standardabweichung: **`s = √10,00 = 3,16 g`**
- *(Zum Vergleich: Wären diese sechs Packungen tatsächlich die gesamte Tagescharge, ergäben sich als Populationswerte `σ² = 50,00 / 6 = 8,33 g²` und `σ = 2,89 g`.)*

**4. Präzision und relative Streuung einordnen:**
- Standardfehler des Mittelwerts: **`SE = 3,1623 / √6 = 1,29 g`**
- Variationskoeffizient: **`VK = (3,1623 / 500,00) × 100 % = 0,63 %`** – ein ausgesprochen eng geführter Abfüllprozess.

## Referenztabelle: Sigma-Intervalle der Normalverteilung

Folgen Messdaten näherungsweise einer **Gaußschen Normalverteilung**, legt die Standardabweichung exakt fest, welcher Anteil aller Werte innerhalb symmetrischer Intervalle um den Mittelwert liegt – illustriert am Kaffee-Beispiel (`x̄ = 500,00 g`, `s = 3,16 g`):

| Sigma-Intervall | Anteil innerhalb | Anteil außerhalb | Beispielbereich (500 g) | Typische Anwendung in Praxis & Normung |
| :--- | :--- | :--- | :--- | :--- |
| **±1,00 s** | 68,27 % | 31,73 % | 496,84–503,16 g | Typischer Normalbereich / Finanz-Volatilität |
| **±1,645 s** | 90,00 % | 10,00 % | 494,80–505,20 g | 90-%-Konfidenz- und Prognoseintervall |
| **±1,96 s** | 95,00 % | 5,00 % | 493,80–506,20 g | Wissenschaftlicher Standard (Signifikanzniveau α = 5 %) |
| **±2,00 s** | 95,45 % | 4,55 % | 493,68–506,32 g | Erweiterte Messunsicherheit nach DIN 1319 (k = 2) |
| **±2,576 s** | 99,00 % | 1,00 % | 491,85–508,15 g | Hohes Vertrauensniveau (α = 1 %) |
| **±3,00 s** | 99,73 % | 0,27 % | 490,51–509,49 g | Industrielle Prozessgrenzen / statistische Prozesslenkung |

## Stichprobengröße, Ausreißer und robuste Alternativen

Für die Planung von Experimenten, Umfragen und Laboranalysen liefert der **Standardfehler (`SE = s / √n`)** eine zentrale Faustregel: Um die Unsicherheit des Mittelwerts zu halbieren, genügt keine Verdopplung der Stichprobe – wegen der Quadratwurzel im Nenner muss die Anzahl der Messungen **vervierfacht** werden. Im obigen Abfüllbeispiel wären also 24 statt 6 Prüfpackungen erforderlich, um den Standardfehler von 1,29 g auf rund 0,65 g zu senken. Gleichzeitig lohnt bei jeder Datenreihe ein Blick auf **Median** und **Interquartilsabstand (`IQR = Q3 − Q1`)**: Während ein einzelner Mess- oder Eingabefehler die quadrierte Varianz und damit die Standardabweichung massiv verzerrt, bleiben Median und IQR selbst bei starken Extremwerten stabil.

## Typische Interpretationsfehler und Praxistipps

- **Ausreißer vor der Berechnung prüfen:** Kontrollieren Sie auffällige Extremwerte mithilfe der Tukey-Ausreißergrenzen (`Q1 − 1,5 × IQR` bis `Q3 + 1,5 × IQR`). Echte Tipp- oder Sensorfehler sollten korrigiert werden; reale Extremereignisse (etwa Börsencrashs) dürfen dagegen nicht einfach gelöscht werden.
- **Stichproben- und Populationsformel bei kleinem n trennen:** Bei 1.000 Messwerten unterscheiden sich `s` und `σ` um weniger als 0,05 %. Bei kleinen Labormessreihen (`n = 5` bis `n = 10`) unterschätzt `σ` die tatsächliche Streuung jedoch um 5 % bis 11 % – in Wissenschaft und Qualitätssicherung ist fast immer **s** die zutreffende Kennzahl.
- **Keine Blindanwendung der 68-95-99,7-Regel auf schiefe Daten:** Die Sigma-Prozentwerte gelten streng nur für symmetrische Normalverteilungen. Bei stark rechtsschiefen Größen wie Haushaltseinkommen, Wartezeiten oder Versicherungsschäden kann `x̄ − 2s` rechnerisch sogar unmögliche negative Werte erzeugen.
- **Volatilität am Kapitalmarkt richtig annualisieren:** In der Geldanlage bezeichnet die jährliche Standardabweichung die **Volatilität**. Rechnen Sie monatliche Rendite-Standardabweichungen über die Wurzel-Zeit-Regel aufs Jahr hoch (`s_Jahr = s_Monat × √12`) und berücksichtigen Sie, dass Finanzmärkte häufiger Extrembewegungen zeigen als eine ideale Glockenkurve.
- **Prozessfähigkeit in der Technik nutzen:** In der industriellen Fertigung bestimmt die Standardabweichung direkt den Prozessfähigkeitsindex (`C_p`), indem sie die zulässige Konstruktionstoleranz mit der sechsfachen Prozessstreuung vergleicht und frühzeitig auf Werkzeugverschleiß oder Kalibrierungsbedarf hinweist.
