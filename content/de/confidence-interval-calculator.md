---
title: "Konfidenzintervall-Rechner – Z, T & Anteil KI"
metaTitle: "Konfidenzintervall-Rechner: Z-, t- & Anteils-KI (95 %)"
description: "Berechnen Sie präzise Konfidenzintervalle für Mittelwerte (Z- und t-Verteilung), Anteilswerte und Gruppendifferenzen inklusive Fehlermarge, Standardfehler und Schritt-für-Schritt-Lösung."
metaDescription: "Berechnen Sie 90 %, 95 % und 99 % Konfidenzintervalle für Mittelwerte (Z/t) und Anteile – inklusive Standardfehler, Fehlermarge und Rechenweg."
metaKeywords: "konfidenzintervall rechner, vertrauensintervall berechnen, 95 konfidenzintervall, z-intervall, t-intervall, fehlermarge berechnen, standardfehler, anteilswert ki"
faqs:
  - question: "Wann verwende ich das Z-Intervall und wann das t-Intervall für den Mittelwert?"
    answer: "Das Z-Intervall setzt voraus, dass die wahre Standardabweichung Sigma der Grundgesamtheit bekannt ist – was in der Praxis fast nur bei normierten Prüfverfahren vorkommt. Ist Sigma unbekannt und wird durch die Stichprobenstandardabweichung s geschätzt, ist die Student-t-Verteilung mit df = n - 1 Freiheitsgraden die exakte Wahl. Erst ab großen Stichprobenumfängen (etwa n >= 30 bis 100) nähern sich t- und Z-Quantile weitgehend an."
  - question: "Bedeutet ein 95-%-Konfidenzintervall, dass der wahre Wert mit 95 % Wahrscheinlichkeit darin liegt?"
    answer: "Nein, in der frequentistischen Statistik ist der wahre Parameter der Grundgesamtheit eine feste, wenngleich unbekannte Konstante – kein Zufallswert. Das berechnete Einzelintervall überdeckt ihn entweder oder nicht. Die Angabe 95 % bezieht sich auf das Schätzverfahren: Würde man sehr viele unabhängige Stichproben ziehen und jeweils ein 95-%-KI bilden, enthielten langfristig 95 % dieser Intervalle den wahren Parameter."
  - question: "Halbiert eine Verdopplung des Stichprobenumfangs die Fehlermarge?"
    answer: "Nein. Da der Stichprobenumfang n im Nenner des Standardfehlers unter einer Quadratwurzel steht, verringert eine Verdopplung von n die Fehlermarge lediglich um den Faktor 1 durch Wurzel aus 2 (also um rund 29,3 %). Um die Intervallbreite exakt zu halbieren, muss der Stichprobenumfang vervierfacht werden."
  - question: "Wie hängen ein 95-%-Konfidenzintervall und ein zweiseitiger Hypothesentest zusammen?"
    answer: "Beide Verfahren sind mathematisch dual zueinander. Liegt ein hypothetischer Referenzwert (wie ein Sollmaß oder der Differenzwert 0 beim Gruppenvergleich) außerhalb des zweiseitigen 95-%-Konfidenzintervalls, wird die entsprechende Nullhypothese auf dem Signifikanzniveau Alpha = 0,05 verworfen. Das Konfidenzintervall liefert zusätzlich die geschätzte Effektgröße und deren Präzision."
  - question: "Wann ist das klassische Wald-Konfidenzintervall für Anteilswerte unzuverlässig?"
    answer: "Die Standardformel für Anteilswerte stützt sich auf die Normalapproximation und liefert nur dann verlässliche Überdeckungswahrscheinlichkeiten, wenn mindestens n * p * (1 - p) >= 9 gilt. Bei kleinen Stichproben oder extremen Anteilen nahe 0 % oder 100 % kann sie sogar unsinnige Grenzen unter 0 % oder über 100 % erzeugen; in solchen Fällen empfiehlt sich das Wilson- oder Clopper-Pearson-Intervall."
---

## Was ist ein Konfidenzintervall und warum ist es unverzichtbar?

In der empirischen Forschung, der industriellen Qualitätssicherung, der medizinischen Biometrie sowie der Wahl- und Marktforschung lässt sich fast nie eine vollständige Grundgesamtheit erheben. Stattdessen wird aus einer Zufallsstichprobe ein einzelner **Punktschätzer** – etwa der Stichprobenmittelwert $\bar{x}$ oder ein Anteilswert $\hat{p}$ – berechnet. Da jede Stichprobe zufälligen Schwankungen unterliegt, bleibt zunächst offen, wie präzise dieser Wert den wahren Parameter der Grundgesamtheit abbildet.

Ein **Konfidenzintervall (KI)**, häufig auch als **Vertrauensbereich** bezeichnet, quantifiziert genau diese Schätzunsicherheit: Es spannt um den Punktschätzer einen Bereich auf, dessen Halbbreite als **Fehlermarge ($E$)** die Genauigkeit der Schätzung angibt. Unser **Konfidenzintervall-Rechner** ermittelt Vertrauensbereiche für Mittelwerte ($Z$- und $t$-Verteilung), Anteilswerte sowie Differenzen zwischen zwei Gruppen bei frei wählbarem Konfidenzniveau ($90\ \%$, $95\ \%$ oder $99\ \%$).

## Mathematische Formeln für die wichtigsten Konfidenzintervalle

Jedes symmetrische Konfidenzintervall folgt dem Aufbau $\text{Punktschätzer} \pm \text{Fehlermarge}$, wobei die Fehlermarge $E$ das Produkt aus kritischem Verteilungsquantil und **Standardfehler ($SE$)** ist.

### 1. $Z$-Intervall für den Mittelwert (bekanntes $\sigma$)

Ist die Standardabweichung $\sigma$ der Grundgesamtheit bekannt und das Merkmal normalverteilt (oder $n$ gemäß zentralem Grenzwertsatz hinreichend groß), gilt:

$$KI = \bar{x} \pm z_{1 - \alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

### 2. Student-$t$-Intervall für den Mittelwert (unbekanntes $\sigma$)

In fast allen Praxisfällen ist $\sigma$ unbekannt und wird durch die empirische Standardabweichung $s$ geschätzt. Die breiteren Ränder der Student-$t$-Verteilung mit $df = n - 1$ Freiheitsgraden erfassen diese zusätzliche Unsicherheit:

$$KI = \bar{x} \pm t_{1 - \alpha/2;\, n - 1} \cdot \frac{s}{\sqrt{n}}$$

### 3. Konfidenzintervall für einen Anteilswert ($\hat{p}$)

Für dichotome Merkmale (z. B. Zustimmung/Ablehnung oder Ausschuss/Gutteil) mit $k$ Treffern in $n$ Versuchen ($\hat{p} = \frac{k}{n}$) lautet das approximative Wald-Intervall:

$$KI = \hat{p} \pm z_{1 - \alpha/2} \cdot \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$$

### 4. Differenz zweier unabhängiger Mittelwerte (Welch-$t$-Intervall)

Für den Vergleich zweier unabhängiger Gruppen ohne Annahme gleicher Varianzen gilt:

$$KI = (\bar{x}_1 - \bar{x}_2) \pm t_{1 - \alpha/2;\, \nu} \cdot \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$$

### Bedeutung der Variablen

* **$\bar{x}$ / $\hat{p}$:** Stichprobenmittelwert bzw. Stichprobenanteil als Punktschätzer.
* **$\sigma$ / $s$:** Wahre Standardabweichung der Grundgesamtheit bzw. empirische Stichprobenstandardabweichung.
* **$n$:** Stichprobenumfang (Anzahl unabhängiger Messwerte bzw. Befragter).
* **$1 - \alpha$ / $\alpha$:** Konfidenzniveau (z. B. $0{,}95$) und Irrtumswahrscheinlichkeit (z. B. $\alpha = 0{,}05$).
* **$z_{1 - \alpha/2}$ / $t_{1 - \alpha/2;\, df}$:** Kritischer Quantilwert der Standardnormal- bzw. Student-$t$-Verteilung (beim Welch-Verfahren mit $\nu$ Freiheitsgraden nach Welch-Satterthwaite).
* **$SE$ / $E$:** Standardfehler ($\frac{s}{\sqrt{n}}$ bzw. $\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$) und Fehlermarge ($E = \text{Quantil} \cdot SE$).

## Referenztabelle: Kritische Werte nach Konfidenzniveau

Ein höheres Konfidenzniveau vergrößert die kritischen Quantile und damit die Intervallbreite. Die Übersicht vergleicht die wichtigsten Niveaus für die $Z$- sowie die $t$-Verteilung ($df = 15$ und $df = 30$):

| Konfidenzniveau ($1 - \alpha$) | Irrtumswahrscheinlichkeit ($\alpha$) | Kritischer $z$-Wert | $t$-Wert ($df = 15$) | $t$-Wert ($df = 30$) | Relative Breite ($Z$, $95\ \% = 1{,}00$) | Typischer Einsatz |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **$80\ \%$** | $0{,}200$ | $1{,}282$ | $1{,}341$ | $1{,}310$ | $0{,}65$ | Explorative Vorstudien |
| **$90\ \%$** | $0{,}100$ | $1{,}645$ | $1{,}753$ | $1{,}697$ | $0{,}84$ | Marktforschung, Prognosen |
| **$95\ \%$** | $0{,}050$ | $1{,}960$ | $2{,}131$ | $2{,}042$ | $1{,}00$ | Wissenschaftlicher Standard |
| **$99\ \%$** | $0{,}010$ | $2{,}576$ | $2{,}947$ | $2{,}750$ | $1{,}31$ | Klinische Studien, Pharmazie |
| **$99{,}9\ \%$** | $0{,}001$ | $3{,}291$ | $4{,}073$ | $3{,}646$ | $1{,}68$ | Luftfahrt, Sicherheitsbauteile |

## Schritt-für-Schritt-Rechenbeispiele aus der Praxis

### Beispiel 1: $t$-Intervall in der industriellen Fertigung

Ein Maschinenbauunternehmen prüft den Außendurchmesser von Präzisionswellen (Sollmaß $25{,}00\text{ mm}$). Eine Zufallsstichprobe von $n = 36$ Wellen ergibt $\bar{x} = 25{,}06\text{ mm}$ und $s = 0{,}12\text{ mm}$. Da $\sigma$ unbekannt ist, nutzen wir die $t$-Verteilung für ein $95\ \%$-KI:

1. **Freiheitsgrade und Quantil bestimmen:** Bei $df = 36 - 1 = 35$ und $1 - \alpha = 0{,}95$ gilt $t_{0{,}975;\, 35} = 2{,}0301$.
2. **Standardfehler ($SE$) berechnen:**
   $$SE = \frac{s}{\sqrt{n}} = \frac{0{,}12\text{ mm}}{\sqrt{36}} = 0{,}0200\text{ mm}$$
3. **Fehlermarge ($E$) ermitteln:**
   $$E = 2{,}0301 \times 0{,}0200\text{ mm} = 0{,}0406\text{ mm}$$
4. **Intervallgrenzen bilden:**
   $$25{,}06 - 0{,}0406 = 25{,}0194\text{ mm}, \qquad 25{,}06 + 0{,}0406 = 25{,}1006\text{ mm}$$

**Ergebnis:** Das $95\ \%$-KI lautet $[25{,}02\text{ mm};\; 25{,}10\text{ mm}]$. Weil das Sollmaß $25{,}00\text{ mm}$ außerhalb dieses Bereichs liegt, weicht der mittlere Durchmesser auf dem $5\ \%$-Niveau signifikant nach oben ab – die Drehmaschine muss nachjustiert werden.

### Beispiel 2: Anteils-KI in der Umfrageforschung

In einer Befragung von $n = 1.000$ Wahlberechtigten befürworten $k = 520$ Personen ein Nahverkehrsprojekt ($\hat{p} = 0{,}520$). Mit $z_{0{,}975} = 1{,}960$ folgen $SE = \sqrt{\frac{0{,}52 \times 0{,}48}{1.000}} = 0{,}0158$ ($1{,}58$ Prozentpunkte) und $E = 1{,}960 \times 0{,}0158 = 0{,}0310$ ($3{,}10$ Prozentpunkte). Das $95\ \%$-KI reicht von **$48{,}90\ \%$ bis $55{,}10\ \%$** – da $50\ \%$ enthalten ist, ist noch keine absolute Mehrheit statistisch abgesichert.

## Häufige Fehlerquellen bei der Arbeit mit Konfidenzintervallen

* **Verwechslung von Sicherheit und Präzision:** Eine Erhöhung des Konfidenzniveaus von $90\ \%$ auf $99\ \%$ liefert kein genaueres, sondern ein rund $57\ \%$ breiteres Intervall. Höhere Sicherheit bei konstantem Stichprobenumfang $n$ geht stets zulasten der Präzision; eine engere Schätzung bei gleichbleibender Sicherheit gelingt nur über eine größere Stichprobe.
* **Trugschluss bei überlappenden Intervallen:** Überlappen sich die $95\ \%$-KI zweier unabhängiger Gruppen geringfügig, schließt das einen statistisch signifikanten Unterschied keineswegs automatisch aus. Prüfen Sie Gruppenvergleiche stets direkt über das Konfidenzintervall der Differenz ($\mu_1 - \mu_2$).
* **Vernachlässigung der Stichprobenqualität:** Jede Schätzformel setzt eine unverzerrte Zufallsstichprobe voraus. Systematische Auswahlfehler – etwa durch selbstselektive Online-Umfragen ohne repräsentative Gewichtung – verzerren den Punktschätzer dauerhaft und werden von der berechneten Fehlermarge nicht abgebildet.
* **Wald-Intervall am Randbereich:** Gilt $n \hat{p}(1 - \hat{p}) < 9$ (etwa bei seltenen Fertigungsfehlern unter $1\ \%$ oder kleinen klinischen Gruppen), weicht die reale Überdeckung stark vom Nennniveau ab; nutzen Sie dort das Wilson- oder Clopper-Pearson-Intervall.
* **Fehlkalkulation bei der Stichprobenplanung:** Wer die gewünschte Fehlermarge halbieren möchte, muss wegen des Wurzel-$n$-Gesetzes den vierfachen Stichprobenumfang einplanen – ein entscheidender Kostenfaktor in der klinischen Forschung und Marktforschung.
