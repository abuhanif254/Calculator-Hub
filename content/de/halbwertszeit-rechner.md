---
title: "Halbwertszeit-Rechner"
metaTitle: "Halbwertszeit-Rechner | Exponentieller Zerfall & Formel"
description: "Berechnen Sie Halbwertszeit, Restmenge, Ausgangsmenge, Zerfallsdauer und Zerfallskonstante für radioaktive Isotope, Pharmakokinetik und exponentielle Zerfallsprozesse."
metaDescription: "Kostenloser Halbwertszeit-Rechner: Berechnen Sie Restmenge, Ausgangsmenge, Halbwertszeit, Zerfallskonstante und mittlere Lebensdauer mit allen Formeln."
metaKeywords: "halbwertszeit rechner, radioaktiver zerfall berechnen, zerfallskonstante formel, exponentieller zerfall, mittlere lebensdauer, c14 methode, pharmakokinetik"
faqs:
  - question: "Was ist der Unterschied zwischen Halbwertszeit und mittlerer Lebensdauer?"
    answer: "Die Halbwertszeit gibt an, nach welcher Zeit genau 50 % der ursprünglichen Teilchen zerfallen sind. Die mittlere Lebensdauer (Tau) ist hingegen der statistische Erwartungswert für die Existenzdauer eines einzelnen Teilchens und entspricht dem Kehrwert der Zerfallskonstante. Sie ist um den Faktor 1 / ln(2), also rund 1,4427-mal länger als die Halbwertszeit; nach Ablauf einer mittleren Lebensdauer sind noch exakt 1/e (etwa 36,79 %) der Ausgangsmenge vorhanden."
  - question: "Wie unterscheiden sich physikalische, biologische und effektive Halbwertszeit?"
    answer: "In der Nuklearmedizin und im Strahlenschutz wirkt neben dem rein physikalischen Kernzerfall auch die physiologische Ausscheidung über Nieren, Leber oder Atmung (biologische Halbwertszeit). Da beide Prozesse parallel ablaufen, addieren sich ihre Zerfallskonstanten. Die resultierende effektive Halbwertszeit ist daher stets kürzer als die kürzere der beiden Einzelhalbwertszeiten."
  - question: "Wie rechnet man die Teilchenzahl in die radioaktive Aktivität in Becquerel um?"
    answer: "Die Aktivität A(t) gibt die Anzahl der Kernzerfälle pro Sekunde an und wird in der SI-Einheit Becquerel (1 Bq = 1 Zerfall pro Sekunde) gemessen. Man erhält sie, indem man die aktuelle Anzahl der radioaktiven Atomkerne N(t) mit der Zerfallskonstante in der Einheit pro Sekunde multipliziert: A(t) = Lambda mal N(t). Dazu muss die Halbwertszeit zwingend in Sekunden umgerechnet werden."
  - question: "Gilt die Halbwertszeit-Formel auch für den Abbau von Medikamenten im Körper?"
    answer: "Ja, sofern der Wirkstoff einer Eliminationskinetik erster Ordnung folgt, was bei den meisten Medikamenten in therapeutischer Dosierung der Fall ist. Hierbei ist die Abbaurate proportional zur aktuellen Plasmakonzentration. Eine Ausnahme bilden Substanzen mit Kinetik nullter Ordnung (wie Ethanol oder hochdosiertes Phenytoin), bei denen die Leberenzyme gesättigt sind und pro Stunde eine konstante Menge statt eines konstanten Prozentsatzes abgebaut wird."
  - question: "Nach wie vielen Halbwertszeiten gilt eine Substanz praktisch als vollständig zerfallen?"
    answer: "Mathematisch nähert sich die Exponentialfunktion der Null nur asymptotisch an. In der klinischen Pharmakologie gilt ein Wirkstoff nach 5 Halbwertszeiten (Restmenge 3,125 %) als weitgehend eliminiert, im operativen Strahlenschutz setzt man meist 10 Halbwertszeiten an, nach denen nur noch ein Tausendstel (exakt 1/1.024 bzw. 0,098 %) der Ausgangsaktivität messbar ist."
---

Die **Halbwertszeit** ($T_{1/2}$ bzw. $t_{1/2}$) ist die zentrale Kenngröße jedes exponentiellen Zerfallsprozesses erster Ordnung. Sie beschreibt das konstante Zeitintervall, innerhalb dessen sich die Menge, Konzentration oder Aktivität einer Ausgangssubstanz exakt um die Hälfte reduziert. Ob bei der Berechnung des radioaktiven Zerfalls von Nukliden in der Kernphysik, der Altersbestimmung organischer Funde mittels der Radiokarbonmethode ($^{14}\text{C}$) oder der Dosierungsplanung von Arzneimitteln in der Pharmakokinetik: Unser **Halbwertszeit-Rechner** bestimmt aus drei bekannten Größen wahlweise die verbleibende Restmenge, die ursprüngliche Ausgangsmenge, die Halbwertszeit, die verstrichene Zeit, die Zerfallskonstante sowie die mittlere Lebensdauer.

## Das Zerfallsgesetz und alle Umstellungsformeln

Beim exponentiellen Zerfall ist die momentane Abnahmerate $-\frac{\mathrm{d}N}{\mathrm{d}t}$ zu jedem Zeitpunkt direkt proportional zur aktuell noch vorhandenen Teilchenzahl oder Stoffmenge $N(t)$. Die Lösung dieser Differentialgleichung liefert das fundamentale **Zerfallsgesetz** in zwei äquivalenten Darstellungsformen:

$$N(t) = N_0 \cdot \left(\frac{1}{2}\right)^{\frac{t}{T_{1/2}}} = N_0 \cdot e^{-\lambda \cdot t}$$

Dabei sind die **Zerfallskonstante** $\lambda$ (Zerfallswahrscheinlichkeit pro Zeiteinheit) und die **mittlere Lebensdauer** $\tau$ über den natürlichen Logarithmus von 2 ($\ln(2) \approx 0,693147$) fest mit der Halbwertszeit verknüpft:

$$\lambda = \frac{\ln(2)}{T_{1/2}} \approx \frac{0,693147}{T_{1/2}} \qquad \text{sowie} \qquad \tau = \frac{1}{\lambda} = \frac{T_{1/2}}{\ln(2)} \approx 1,442695 \cdot T_{1/2}$$

Je nach Fragestellung lässt sich die Grundgleichung durch Logarithmieren nach jeder gesuchten Variable auflösen:

* **Berechnung der verstrichenen Zeit ($t$):**
  $$t = T_{1/2} \cdot \frac{\ln\left(\frac{N(t)}{N_0}\right)}{\ln(0,5)} = -\frac{1}{\lambda} \cdot \ln\left(\frac{N(t)}{N_0}\right)$$
* **Berechnung der Halbwertszeit ($T_{1/2}$) aus zwei Messpunkten:**
  $$T_{1/2} = \frac{t \cdot \ln(2)}{\ln\left(\frac{N_0}{N(t)}\right)}$$
* **Berechnung der ursprünglichen Ausgangsmenge ($N_0$):**
  $$N_0 = N(t) \cdot 2^{\frac{t}{T_{1/2}}} = N(t) \cdot e^{\lambda \cdot t}$$
* **Effektive Halbwertszeit ($T_{\text{eff}}$) in Nuklearmedizin und Biologie:** Wirken physikalischer Kernzerfall ($T_{\text{phys}}$) und biologische Ausscheidung ($T_{\text{biol}}$) gleichzeitig, gilt:
  $$T_{\text{eff}} = \frac{T_{\text{phys}} \cdot T_{\text{biol}}}{T_{\text{phys}} + T_{\text{biol}}}$$

### Definition der Größen und SI-Einheiten
* **$N_0$ (Anfangsbestand):** Ursprüngliche Teilchenzahl, Masse (in $\text{g}$ oder $\text{mg}$), Stoffmenge (in $\text{mol}$), Konzentration (in $\text{mg/l}$) oder Ausgangsaktivität $A_0$ (in Becquerel, $\text{Bq} = \text{s}^{-1}$) zum Zeitpunkt $t = 0$.
* **$N(t)$ (Restbestand):** Verbleibende Menge oder Aktivität $A(t)$ nach Ablauf der Zeitspanne $t$ in derselben Einheit wie $N_0$.
* **$T_{1/2}$ (Halbwertszeit):** Zeitspanne bis zur Halbierung des Bestands in Sekunden ($\text{s}$), Minuten ($\text{min}$), Stunden ($\text{h}$), Tagen ($\text{d}$) oder julianischen Jahren ($\text{a}$).
* **$t$ (Verstrichene Zerfallszeit):** Beobachtungsdauer in derselben Zeiteinheit wie $T_{1/2}$.
* **$\lambda$ (Zerfallskonstante):** Relative Abnahmerate mit der reziproken Zeiteinheit ($\text{s}^{-1}$, $\text{h}^{-1}$, $\text{d}^{-1}$ oder $\text{a}^{-1}$).

## Durchgerechnete Praxisbeispiele

### Beispiel 1: Nuklearmedizinische Therapie mit Jod-131
Ein Präparat mit dem Radioisotop Jod-131 ($^{131}\text{I}$) besitzt bei Kalibrierung eine Ausgangsaktivität von **$A_0 = 1.200,00\text{ MBq}$** ($1,20\text{ GBq}$). Die physikalische Halbwertszeit beträgt **$T_{\text{phys}} = 8,02\text{ Tage}$**. Gesucht sind die rein physikalische Restaktivität nach **$t = 20,00\text{ Tagen}$** sowie die effektive Restaktivität im Patienten bei einer biologischen Halbwertszeit von **$T_{\text{biol}} = 24,00\text{ Tagen}$**.

1. **Ermittlung der Zerfallskonstante und der Halbwertszeit-Zyklen (physikalisch):**
   $$\lambda_{\text{phys}} = \frac{\ln(2)}{8,02\text{ d}} \approx 0,086427\text{ d}^{-1} \qquad \text{und} \qquad \frac{t}{T_{\text{phys}}} = \frac{20,00\text{ d}}{8,02\text{ d}} \approx 2,49377$$
2. **Physikalische Restaktivität nach 20,00 Tagen:**
   $$A(20) = 1.200,00\text{ MBq} \cdot \left(\frac{1}{2}\right)^{2,49377} = 1.200,00\text{ MBq} \cdot 0,17754 \approx 213,05\text{ MBq}$$
3. **Effektive Restaktivität im Patienten ($T_{\text{eff}}$):**
   $$T_{\text{eff}} = \frac{8,02\text{ d} \cdot 24,00\text{ d}}{8,02\text{ d} + 24,00\text{ d}} = \frac{192,48}{32,02}\text{ d} \approx 6,0112\text{ Tage}$$
   $$A_{\text{eff}}(20) = 1.200,00\text{ MBq} \cdot \left(\frac{1}{2}\right)^{\frac{20,00}{6,0112}} = 1.200,00\text{ MBq} \cdot 0,09964 \approx 119,57\text{ MBq}$$

### Beispiel 2: Archäologische Altersbestimmung mit der Radiokarbonmethode ($^{14}\text{C}$)
In einer antiken Holzprobe wird ein verbliebener $^{14}\text{C}$-Anteil von **$68,50\text{ \%}$** im Verhältnis zu frischer Biomasse gemessen ($\frac{N(t)}{N_0} = 0,685$). Mit der Halbwertszeit von $^{14}\text{C}$ ($T_{1/2} = 5.730\text{ Jahre}$) ergibt sich das Alter $t$ des Fundes:

$$t = 5.730\text{ a} \cdot \frac{\ln(0,685)}{\ln(0,5)} = 5.730\text{ a} \cdot \frac{-0,378336}{-0,693147} \approx 5.730\text{ a} \cdot 0,545824 \approx 3.127,6\text{ Jahre}$$

## Referenztabelle: Wichtige Nuklide und pharmakologische Wirkstoffe

Die nachstehende Tabelle fasst die Zerfallsparameter wichtiger medizinischer, technischer und geologischer Referenzsubstanzen zusammen:

| Isotop / Substanz | Halbwertszeit ($T_{1/2}$) | Zerfallskonstante ($\lambda$) | Mittlere Lebensdauer ($\tau$) | Zerfallsart / Abbauweg | Typisches Anwendungsgebiet |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Fluor-18 ($^{18}\text{F}$)** | 109,77 min (1,83 h) | $0,006315\text{ min}^{-1}$ | 158,36 min (2,64 h) | $\beta^{+}$-Zerfall (Positronen) | Onkologische PET/CT-Diagnostik |
| **Technetium-99m ($^{99\text{m}}\text{Tc}$)** | 6,006 h | $0,11541\text{ h}^{-1}$ | 8,665 h | Isomerer Übergang ($\gamma$) | Skelett- & Myokardszintigrafie |
| **Koffein (im Blutplasma)** | ca. 4,50 h | $0,15403\text{ h}^{-1}$ | ca. 6,49 h | Hepatisch (CYP1A2-Enzym) | Klinische Pharmakokinetik |
| **Jod-131 ($^{131}\text{I}$)** | 8,02 d | $0,08643\text{ d}^{-1}$ | 11,57 d | $\beta^{-}$- und $\gamma$-Zerfall | Radiojodtherapie der Schilddrüse |
| **Caesium-137 ($^{137}\text{Cs}$)** | 30,17 a | $0,02297\text{ a}^{-1}$ | 43,53 a | $\beta^{-}$-Zerfall zu $^{137\text{m}}\text{Ba}$ | Umweltmonitoring, Radiometrie |
| **Kohlenstoff-14 ($^{14}\text{C}$)** | 5.730 a | $1,2097 \cdot 10^{-4}\text{ a}^{-1}$ | 8.267 a | $\beta^{-}$-Zerfall zu $^{14}\text{N}$ | Radiokohlenstoffdatierung |
| **Uran-238 ($^{238}\text{U}$)** | $4,468 \cdot 10^{9}\text{ a}$ | $1,5514 \cdot 10^{-10}\text{ a}^{-1}$ | $6,446 \cdot 10^{9}\text{ a}$ | $\alpha$-Zerfall (Uran-Radium-Reihe) | Geologische Uran-Blei-Datierung |

## Häufige Berechnungsfehler und Praxishinweise

1. **Strikte Einheitenkonsistenz bei Zeit und Aktivität:** In den Exponenten $\frac{t}{T_{1/2}}$ bzw. $\lambda \cdot t$ kürzen sich die Zeiteinheiten nur dann heraus, wenn $t$ und $T_{1/2}$ in exakt derselben Einheit eingesetzt werden. Wollen Sie aus einer Stoffmenge $N$ (über die Avogadro-Konstante $N_{\text{A}} = 6,02214 \cdot 10^{23}\text{ mol}^{-1}$) die absolute Aktivität $A = \lambda \cdot N$ in der SI-Einheit Becquerel ($\text{Bq} = \text{s}^{-1}$) berechnen, müssen Sie die Halbwertszeit zuvor in Sekunden umrechnen (1 julianisches Jahr = $365,25\text{ d} = 31.557.600\text{ s}$).
2. **Tochterkerne und Zerfallsreihen beachten:** Die einfache Halbwertszeitformel beschreibt ausschließlich die Abnahme des Mutternuklids. Zerfällt ein Nuklid in einen ebenfalls radioaktiven Tochterkern, baut sich dessen Aktivität zunächst auf, sodass die Gesamtstrahlung einer Probe langsamer abnimmt.
3. **Verwechslung von zerfallener und verbleibender Menge:** Prüfen Sie genau, ob nach der **Restmenge** $N(t)$ oder der **bereits abgebauten Menge** $\Delta N = N_0 - N(t)$ gefragt wird. Wenn $85,00\text{ \%}$ einer Substanz zerfallen sind, müssen Sie in die Formel den verbleibenden Anteil $\frac{N(t)}{N_0} = 1 - 0,85 = 0,15$ ($15,00\text{ \%}$) einsetzen.
