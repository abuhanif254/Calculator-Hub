---
title: "Varianzrechner: Der ultimative Leitfaden zur Streuung"
metaTitle: "Varianzrechner: Stichproben- & Grundgesamtheitsvarianz"
description: "Berechnen Sie Stichprobenvarianz (n-1), Grundgesamtheitsvarianz (N), Standardabweichung und Quadratsumme präzise mit Bessel-Korrektur, Formeln und Schritt-für-Schritt-Beispiel."
metaDescription: "Berechnen Sie Stichprobenvarianz (n-1), Grundgesamtheitsvarianz (N), Standardabweichung und Quadratsumme mit Bessel-Korrektur und Rechenweg."
metaKeywords: "varianzrechner, varianz berechnen, stichprobenvarianz, grundgesamtheitsvarianz, bessel korrektur, standardabweichung berechnen, quadratsumme, streuungsmaß"
faqs:
  - question: "Wann teile ich bei der Varianz durch n - 1 und wann durch N?"
    answer: "Durch N teilen Sie ausschließlich dann, wenn Ihr Datensatz sämtliche Elemente der betrachteten Grundgesamtheit vollständig erfasst – etwa alle 16 Bundesländer Deutschlands oder alle gefertigten Werkstücke einer abgeschlossenen Kleinserie. Sobald die Daten eine Stichprobe aus einer größeren Grundgesamtheit darstellen, ist die Stichprobenvarianz mit dem Nenner n - 1 (Bessel-Korrektur) zu wählen, um die wahre Streuung erwartungstreu zu schätzen."
  - question: "Warum werden die Abweichungen vom Mittelwert bei der Varianz quadriert?"
    answer: "Addiert man die einfachen Abweichungen (x_i - x_quer) ohne Quadrierung, heben sich positive und negative Differenzen exakt zu null auf. Durch das Quadrieren werden alle Beiträge nicht-negativ, große Ausreißer erhalten ein überproportionales Gewicht, und es entsteht eine glatte, differenzierbare Funktion, auf der zentrale Verfahren wie lineare Regression und Varianzanalyse (ANOVA) aufbauen."
  - question: "Kann die Varianz jemals einen negativen Wert annehmen?"
    answer: "Nein. Da die Varianz als Mittelwert quadrierter reeller Abweichungen definiert ist und jedes Quadrat einer reellen Zahl größer oder gleich null ist, kann die Varianz niemals negativ sein. Ein Wert von exakt 0 tritt nur dann auf, wenn alle Beobachtungen im Datensatz vollkommen identisch sind."
  - question: "Worin liegt der praktische Unterschied zwischen Varianz und Standardabweichung?"
    answer: "Die Varianz misst die Streuung in quadrierten Einheiten der Ausgangsdaten (beispielsweise EUR^2, mm^2 oder MPa^2), was für mathematische Zerlegungen und die Addition unabhängiger Risiken ideal ist. Die Standardabweichung ist die positive Quadratwurzel aus der Varianz und überführt das Streuungsmaß zurück in die ursprüngliche Maßeinheit, sodass sie sich direkt mit dem Mittelwert vergleichen lässt."
  - question: "Warum steigt die Varianz bei einzelnen Ausreißern so stark an?"
    answer: "Weil jede Abweichung vom arithmetischen Mittel im Quadrat eingeht, wächst ihr Einfluss auf die Quadratsumme quadratisch mit dem Abstand. Liegt ein einzelner Messwert dreimal so weit vom Durchschnitt entfernt wie typische Werte, trägt er das Neunfache zur Quadratsumme bei – weshalb stark schiefe Verteilungen stets zusätzlich mit dem Interquartilsabstand bewertet werden sollten."
---

## Was misst die Varianz in der Statistik?

Lagemaße wie das arithmetische Mittel oder der Median nennen zwar das Zentrum eines Datensatzes, verraten aber nichts über die Streuung der Einzelwerte. Zwei Abfüllanlagen können exakt dasselbe mittlere Füllgewicht von $500\text{ g}$ erreichen und sich dennoch grundlegend in ihrer Prozessgüte unterscheiden: Während die erste Anlage zuverlässig zwischen $498\text{ g}$ und $502\text{ g}$ arbeitet, schwankt die zweite zwischen $470\text{ g}$ und $530\text{ g}$.

Die **Varianz** ($\sigma^2$ für die Grundgesamtheit, $s^2$ für eine Stichprobe) ist das maßgebliche Streuungsmaß der Statistik. Sie quantifiziert die mittlere quadrierte Abweichung aller Datenpunkte von ihrem arithmetischen Mittel und bildet in Qualitätssicherung, Werkstoffprüfung, empirischer Forschung und Finanzmathematik das Fundament für Risikomodelle, Konfidenzintervalle, Regression und Varianzanalyse (ANOVA).

## Mathematische Formeln: Grundgesamtheit vs. Stichprobe

Entscheidend für die Formelwahl ist, ob die Daten eine vollständige Grundgesamtheit oder eine Zufallsstichprobe abbilden.

### 1. Varianz der Grundgesamtheit ($\sigma^2$)

Sind sämtliche $N$ Elemente der Zielgesamtheit erfasst, entspricht die Varianz dem Durchschnitt der quadrierten Abweichungen vom wahren Mittelwert $\mu$:

$$\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2$$

### 2. Empirische Stichprobenvarianz ($s^2$)

Bei einer Stichprobe des Umfangs $n$ greift die **Bessel-Korrektur**: Die Quadratsumme wird durch die Freiheitsgrade $n - 1$ geteilt:

$$s^2 = \frac{1}{n - 1} \sum_{i=1}^{n} (x_i - \bar{x})^2$$

### 3. Verschiebungssatz und Quadratsumme ($QS$)

Die Summe der quadrierten Abweichungen ($QS$) lässt sich über den **Steiner-Verschiebungssatz** direkt aus den Rohdaten und deren Quadraten berechnen:

$$QS = \sum_{i=1}^{n} (x_i - \bar{x})^2 = \sum_{i=1}^{n} x_i^2 - n \bar{x}^2 = \sum_{i=1}^{n} x_i^2 - \frac{\left(\sum_{i=1}^{n} x_i\right)^2}{n}$$

Die Standardabweichung ergibt sich unmittelbar als Quadratwurzel der Varianz: $s = \sqrt{s^2}$ beziehungsweise $\sigma = \sqrt{\sigma^2}$.

### Bedeutung der Variablen

* **$\sigma^2$ / $s^2$:** Grundgesamtheitsvarianz bzw. erwartungstreue Stichprobenvarianz in quadrierten Einheiten.
* **$x_i$:** Der $i$-te einzelne Messwert im Datensatz.
* **$\mu$ / $\bar{x}$:** Arithmetisches Mittel der Grundgesamtheit bzw. der Stichprobe.
* **$N$ / $n$:** Umfang der Grundgesamtheit bzw. der Stichprobe.
* **$df = n - 1$:** Anzahl der **Freiheitsgrade** um den geschätzten Mittelwert $\bar{x}$.
* **$QS$:** Quadratsumme aller Abweichungen vom Mittelwert.

## Warum die Bessel-Korrektur ($n - 1$) unverzichtbar ist

Da der wahre Mittelwert $\mu$ in einer Stichprobe unbekannt ist, setzen wir den Stichprobenmittelwert $\bar{x}$ ein. Dieser minimiert jedoch exakt für diese Stichprobe die Summe der quadrierten Abstände, sodass stets gilt:

$$\sum_{i=1}^{n} (x_i - \bar{x})^2 \le \sum_{i=1}^{n} (x_i - \mu)^2$$

Eine Division durch $n$ würde die wahre Varianz $\sigma^2$ im Mittel um den Faktor $\frac{n - 1}{n}$ unterschätzen – bei $n = 5$ um volle $20\ \%$. Die Division durch $n - 1$ korrigiert diese systematische Verzerrung exakt ($E(s^2) = \sigma^2$). Anschaulich geht ein Freiheitsgrad verloren, da bei festem $\bar{x}$ nur $n - 1$ Werte frei variieren können und der letzte Wert über $\sum (x_i - \bar{x}) = 0$ bestimmt ist.

## Schritt-für-Schritt-Rechenbeispiel aus der Werkstoffprüfung

In einem Prüflabor wird die Zugfestigkeit (in Megapascal, $\text{MPa}$) einer Stichprobe von $n = 6$ Aluminium-Druckgussbauteilen gemessen: $\{214,\; 218,\; 220,\; 222,\; 226,\; 232\}$.

1. **Stichprobenmittelwert ($\bar{x}$) berechnen:**
   $$\bar{x} = \frac{214 + 218 + 220 + 222 + 226 + 232}{6} = \frac{1.332}{6} = 222{,}0\text{ MPa}$$
2. **Einzelabweichungen ($x_i - \bar{x}$) bilden:**
   Die Differenzen zu $222{,}0\text{ MPa}$ betragen $-8$, $-4$, $-2$, $0$, $+4$ und $+10\text{ MPa}$ (Kontrollsumme exakt $0$).
3. **Abweichungen quadrieren und Quadratsumme ($QS$) summieren:**
   $$QS = (-8)^2 + (-4)^2 + (-2)^2 + 0^2 + 4^2 + 10^2 = 64 + 16 + 4 + 0 + 16 + 100 = 200\text{ MPa}^2$$
   *Gegenprobe per Verschiebungssatz:* $\sum x_i^2 = 295.904$ minus $n \bar{x}^2 = 6 \times 222^2 = 295.704$ ergibt ebenfalls $QS = 200\text{ MPa}^2$.
4. **Varianz und Standardabweichung ermitteln:**
   Mit $df = 6 - 1 = 5$ folgen für die Stichprobe:
   $$s^2 = \frac{200}{5} = 40{,}00\text{ MPa}^2, \qquad s = \sqrt{40{,}00} \approx 6{,}3246\text{ MPa}$$
   Der Variationskoeffizient beträgt $VK = \frac{6{,}3246}{222{,}0} \times 100\ \% \approx 2{,}85\ \%$. Bei einer Vollerhebung ($N = 6$) ergäbe sich hingegen $\sigma^2 = \frac{200}{6} \approx 33{,}3333\text{ MPa}^2$ ($\sigma \approx 5{,}7735\text{ MPa}$).

## Vergleich statistischer Streuungsmaße

| Streuungsmaß | Formel | Maßeinheit | Ausreißerempfindlichkeit | Typisches Einsatzgebiet |
| :--- | :--- | :--- | :--- | :--- |
| **Stichprobenvarianz ($s^2$)** | $\frac{1}{n-1}\sum (x_i - \bar{x})^2$ | Quadriert ($\text{Einh.}^2$) | Sehr hoch | Varianzanalyse (ANOVA), Regression, Risikomodelle |
| **Standardabweichung ($s$)** | $\sqrt{s^2}$ | Ausgangseinheit | Hoch | Konfidenzintervalle, Prozessfähigkeit, Qualität |
| **Variationskoeffizient ($VK$)** | $\frac{s}{\lvert \bar{x} \rvert} \times 100\ \%$ | Prozent ($\%$) | Hoch | Vergleich bei unterschiedlichen Größenordnungen |
| **Mittlere abs. Abweichung ($MAD$)** | $\frac{1}{n}\sum \lvert x_i - \bar{x} \rvert$ | Ausgangseinheit | Mittel | Absatzprognosen, robuste Fehlerbewertung |
| **Interquartilsabstand ($IQA$)** | $Q_3 - Q_1$ | Ausgangseinheit | Sehr gering | Schiefe Verteilungen (Gehälter, Immobilienpreise) |

## Typische Fehlerquellen in der Praxis vermeiden

* **Falsche Nennerwahl bei kleinen Stichproben:** Wer bei $n = 8$ Laborproben versehentlich durch $8$ statt $7$ teilt, unterschätzt die wahre Varianz im Mittel um $12{,}5\ \%$ und leitet daraus zu enge Toleranzgrenzen und Konfidenzintervalle ab.
* **Vergleich von Varianzen ungleicher Skalen:** Eine Varianz von $400\text{ €}^2$ bei Preisen um $1.000\text{ €}$ ($VK = 2\ \%$) entspricht deutlich geringerer relativer Streuung als $4\text{ €}^2$ bei Artikeln um $10\text{ €}$ ($VK = 20\ \%$). Ziehen Sie für skalenübergreifende Vergleiche stets den Variationskoeffizienten heran.
* **Auslöschung beim Verschiebungssatz:** Liegen große Messwerte extrem dicht beisammen (etwa Präzisionsmassen um $10.000{,}1\text{ g}$), subtrahiert $\sum x_i^2 - n\bar{x}^2$ zwei beinahe identische Großzahlen und verliert erheblich an Stellengenauigkeit. Verwenden Sie bei großen Basiswerten immer zentrierte Abweichungen $(x_i - \bar{x})^2$ oder das stabile Welford-Verfahren.
* **Fehlende Kovarianz in Wertpapierportfolios:** Nur für statistisch unabhängige Größen gilt die einfache Varianzaddition $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$. In einem diversifizierten Wertpapierdepot korrelieren Aktien- und Anleiherenditen miteinander, weshalb die Gesamtvarianz zwingend auch die paarweisen Kovarianzen $2 w_i w_j \text{Cov}(R_i, R_j)$ berücksichtigen muss.
* **Ungeprüfte Ausreißer in schiefen Daten:** Weil einzelne Messfehler quadratisch in die Varianz eingehen, kann bereits ein fehlerhaft erfasster Wert das Ergebnis vervielfachen; prüfen Sie Rohdaten vorab per Boxplot und Interquartilsabstand.
