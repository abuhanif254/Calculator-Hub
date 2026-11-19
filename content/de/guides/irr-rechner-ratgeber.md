---
title: "Interner Zinsfuß (IRR) verstehen: Ein kompletter Leitfaden"
metaTitle: "Interner Zinsfuß (IRR) berechnen: Formel, Beispiel & Tipps"
description: "Erfahren Sie, was der interne Zinsfuß (IRR) ist, wie er sich vom ROI unterscheidet und wie Sie ihn für Immobilien und Unternehmensfinanzierung berechnen."
metaDescription: "Lernen Sie den internen Zinsfuß (IRR) zu berechnen: Kapitalwertformel, Vergleich mit ROI und MIRR sowie Praxisbeispiele für Immobilien und Projekte."
category: "Finance"
relatedCalculator: "irr-calculator"
faqs:
  - question: "Was sagt der interne Zinsfuß bei einer Investitionsentscheidung konkret aus?"
    answer: "Der interne Zinsfuß gibt die durchschnittliche jährliche Rendite des gebundenen Kapitals an. Liegt der berechnete Zinsfuß über dem geforderten Kalkulationszinssatz oder den Kapitalkosten des Unternehmens, gilt die Investition als wirtschaftlich vorteilhaft."
  - question: "Warum lässt sich die Formel für den internen Zinsfuß ab drei Perioden nicht direkt nach r auflösen?"
    answer: "Bei mehr als zwei Zahlungsperioden entsteht eine Polynomgleichung höheren Grades. Da für Polynome ab dem fünften Grad keine allgemeine algebraische Lösungsformel existiert und auch bei drei oder vier Perioden numerische Verfahren effizienter sind, nutzt man Iterationsmethoden wie das Newton-Verfahren."
  - question: "Was versteht man unter der Wiederanlageprämisse der internen Zinsfußmethode?"
    answer: "Das klassische Modell unterstellt mathematisch, dass sämtliche während der Laufzeit zufließenden Rückflüsse sofort wieder exakt zum berechneten internen Zinsfuß angelegt werden können. Bei Projekten mit sehr hoher Rendite führt diese Annahme häufig zu einer Überschätzung der tatsächlichen Verzinsung."
  - question: "Wann treten bei einer Investitionsrechnung mehrere interne Zinsfüße gleichzeitig auf?"
    answer: "Wechselt das Vorzeichen der Nettozahlungsströme im Zeitverlauf mehr als einmal — etwa durch hohe Rekultivierungs- oder Sanierungskosten am Projektende —, kann die Kapitalwertfunktion die Nulllinie mehrfach schneiden. Nach der Vorzeichenregel von Descartes gibt es bis zu so viele reelle Lösungen wie Vorzeichenwechsel."
  - question: "Wie behebt der modifizierte interne Zinsfuß die Schwächen der klassischen Berechnung?"
    answer: "Der modifizierte interne Zinsfuß trennt Finanzierungs- und Wiederanlagezins sauber voneinander. Negative Zahlungsströme werden mit dem tatsächlichen Fremdkapitalzins abgezinst, während positive Rückflüsse mit einem realistischen Kapitalmarktzins bis zum Projektende aufgezinst werden."
---

Bei der Beurteilung einer Kapitalanlage betrachten viele Anleger zunächst die einfache Gesamtrendite. Wer $100\,000\text{ €}$ investiert und nach Abschluss des Vorhabens $130\,000\text{ €}$ zurückerhält, erzielt einen nominalen Wertzuwachs von $30\ \%$. Diese statische Betrachtung vernachlässigt jedoch den wichtigsten Faktor der Finanzmathematik: den **Zeitwert des Geldes**. Ein Gewinn von $30\ \%$ innerhalb eines einzigen Jahres ist hervorragend, während derselbe Ertrag über einen Zeitraum von fünfzehn Jahren kaum die Inflation ausgleicht.

Der **interne Zinsfuß** (international als **IRR** abgekürzt) löst dieses Problem der dynamischen Investitionsrechnung, indem er den exakten annualisierten Effektivzinssatz sämtlicher Ein- und Auszahlungen über die gesamte Projektlaufzeit ermittelt. Mit unserem [IRR-Rechner](/de/rechner/irr-rechner) können Sie beliebige Zahlungsreihen sekundenschnell auswerten.

## Mathematische Definition und Kapitalwertformel

Finanzmathematisch ist der interne Zinsfuß definiert als genau jener Diskontierungszinssatz (Abzinsungssatz), bei dem der **Kapitalwert** aller zukünftigen Zahlungsströme exakt mit der ursprünglichen Anfangsauszahlung übereinstimmt — der Netto-Kapitalwert der gesamten Zahlungsreihe wird also gleich null.

Die fundamentale Bestimmungsgleichung lautet:

$$C_0 + \sum_{t=1}^{n} \frac{CF_t}{(1 + r)^t} = 0$$

Oder in ausgeschriebener Form für aufeinanderfolgende Perioden:

$$0 = CF_0 + \frac{CF_1}{(1 + r)^1} + \frac{CF_2}{(1 + r)^2} + \frac{CF_3}{(1 + r)^3} + \dots + \frac{CF_n}{(1 + r)^n}$$

### Erklärung der Variablen
* **$CF_0$ bzw. $C_0$ (Anfangsinvestition) :** Der Mittelabfluss zum Zeitpunkt $t = 0$. Da es sich um eine Auszahlung handelt, geht dieser Wert stets mit einem negativen Vorzeichen in die Gleichung ein (z. B. $-100\,000\text{ €}$).
* **$CF_t$ (Netto-Zahlungsstrom der Periode $t$) :** Die Differenz aus Einzahlungen und Auszahlungen im jeweiligen Jahr $t$. Überwiegen die Rückflüsse, ist $CF_t$ positiv; entsteht ein Nachschussbedarf, ist der Wert negativ.
* **$t$ (Zeitindex) :** Die jeweilige Periode (üblicherweise in Jahren ab Projektbeginn gezählt, von $1$ bis $n$).
* **$n$ (Gesamtlaufzeit) :** Die Anzahl der betrachteten Perioden bis zum endgültigen Abschluss oder Verkauf des Investitionsobjekts.
* **$r$ (Interner Zinsfuß / IRR) :** Der gesuchte kritische Kalkulationszinssatz (als Dezimalzahl), bei dem die Summe aller Barwerte genau $0$ ergibt.

Da die Variable $r$ bei mehrjährigen Projekten im Nenner mit steigenden Exponenten auftritt, handelt es sich um eine Polynomgleichung $n$-ten Grades. Ab $n \ge 3$ wird der Wert von $r$ durch iterative Näherungsverfahren wie die **lineare Interpolation (Regula falsi)** oder das **Newton-Raphson-Verfahren** bestimmt.

## Schritt-für-Schritt-Rechenbeispiel aus der Praxis

Ein Produktionsunternehmen prüft die Anschaffung einer automatisierten Fertigungsanlage. Die Zahlungsreihe über drei Jahre sieht folgendermaßen aus:
* **Anfangsauszahlung ($CF_0$) :** $-80\,000\text{ €}$
* **Netto-Rückfluss Jahr 1 ($CF_1$) :** $+30\,000\text{ €}$
* **Netto-Rückfluss Jahr 2 ($CF_2$) :** $+35\,000\text{ €}$
* **Netto-Rückfluss Jahr 3 ($CF_3$, inkl. Restwerterlös) :** $+40\,000\text{ €}$

### Schritt 1: Aufstellen der Kapitalwertgleichung
Wir setzen die Werte in die Gleichung ein und suchen den Zinssatz $r$, der den Kapitalwert ($KW$) auf null bringt:

$$KW(r) = -80\,000 + \frac{30\,000}{(1 + r)^1} + \frac{35\,000}{(1 + r)^2} + \frac{40\,000}{(1 + r)^3} = 0$$

### Schritt 2: Erster Versuchszinssatz ($r_1 = 12\ \% = 0,12$)
Wir berechnen die Barwerte der drei Jahresrückflüsse bei einem Abzinsungssatz von $12\ \%$:
* **Jahr 1 :** $\frac{30\,000}{1,12^1} = 26\,785,71\text{ €}$
* **Jahr 2 :** $\frac{35\,000}{1,12^2} = 27\,901,79\text{ €}$
* **Jahr 3 :** $\frac{40\,000}{1,12^3} = 28\,471,21\text{ €}$

Addition der Barwerte abzüglich der Anschaffungskosten:

$$KW(0,12) = -80\,000 + 26\,785,71 + 27\,901,79 + 28\,471,21 = +3\,158,71\text{ €}$$

Da der Kapitalwert positiv ist ($+3\,158,71\text{ €}$), liegt der tatsächliche interne Zinsfuß über $12\ \%$.

### Schritt 3: Zweiter Versuchszinssatz ($r_2 = 15\ \% = 0,15$)
Wir erhöhen den Diskontierungssatz auf $15\ \%$:
* **Jahr 1 :** $\frac{30\,000}{1,15^1} = 26\,086,96\text{ €}$
* **Jahr 2 :** $\frac{35\,000}{1,15^2} = 26\,465,03\text{ €}$
* **Jahr 3 :** $\frac{40\,000}{1,15^3} = 26\,300,65\text{ €}$

Neuer Kapitalwert bei $15\ \%$:

$$KW(0,15) = -80\,000 + 26\,086,96 + 26\,465,03 + 26\,300,65 = -1\,147,36\text{ €}$$

Die Nullstelle liegt folglich zwischen $12\ \%$ und $15\ \%$.

### Schritt 4: Näherung durch lineare Interpolation und exakter Wert
Mit der Interpolationsformel schätzen wir den Nulldurchgang:

$$r \approx r_1 + \frac{KW(r_1)}{KW(r_1) - KW(r_2)} \times (r_2 - r_1) = 12\ \% + \frac{3\,158,71}{4\,306,07} \times 3\ \% \approx 14,20\ \%$$

Eine weitere Iteration liefert den exakten internen Zinsfuß von **$14,16\ %$**. Liegen die Kapitalkosten des Unternehmens bei $9,0\ \%$, übertrifft das Projekt die Mindestverzinsung um $5,16$ Prozentpunkte und ist vorteilhaft.

## Vergleichstabelle: Kennzahlen der Investitionsrechnung im Überblick

| Kennzahl | Maßeinheit | Berücksichtigung des Zeitwerts | Wiederanlageprämisse | Entscheidungsregel | Hauptstärke in der Praxis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Interner Zinsfuß (IRR)** | Prozent p. a. ($\ \%$) | Ja (periodengenaue Diskontierung) | Zum internen Zinsfuß $r$ selbst | $r >$ Kapitalkostensatz | Sofortige Vergleichbarkeit mit Finanzierungszinsen |
| **Kapitalwert** | Geldeinheit ($\text{€}$) | Ja (Diskontierung zum Kalkulationszins) | Zum Kalkulationszinssatz $i$ | Kapitalwert $> 0\text{ €}$ | Zeigt den absoluten Vermögenszuwachs in Euro |
| **Modifizierter Zinsfuß** | Prozent p. a. ($\ \%$) | Ja (getrennte Auf- und Abzinsung) | Zum realistischen Reinvestitionszins | Modifizierter Zins $>$ Kapitalkosten | Vermeidet unrealistische Verzinsungsannahmen |
| **Einfache Gesamtrendite** | Prozent gesamt ($\ \%$) | Nein (ignoriert Laufzeit komplett) | Keine Wiederanlage modelliert | Höherer Prozentsatz bevorzugt | Schneller Überschlag für sehr kurze Laufzeiten |
| **Amortisationsdauer** | Zeitdauer (Jahre) | Nur bei dynamischer Variante | Keine | Rückflussdauer $<$ Höchstgrenze | Bewertet das Liquiditäts- und Verlustrisiko |

## Typische Einsatzgebiete und methodische Fallstricke

In der Immobilienwirtschaft, bei Unternehmensbeteiligungen und in der Projektfinanzierung dient der interne Zinsfuß als zentrale Zielgröße. Dennoch müssen Entscheider zwei strukturelle Besonderheiten beachten:

1. **Das Timing der Rückflüsse dominiert die Kennzahl :** Da frühe Zahlungseingänge nur geringfügig abgezinst werden, erhöht eine vorgezogene Ausschüttung im ersten Jahr den internen Zinsfuß deutlich stärker als ein gleich hoher Zusatzerlös im zehnten Jahr.
2. **Größenblindheit bei sich ausschließenden Alternativen :** Ein kleines Projekt mit $10\,000\text{ €}$ Kapitaleinsatz und einem internen Zinsfuß von $25\ \%$ wirkt prozentual attraktiver als ein Großprojekt mit $500\,000\text{ €}$ Volumen und $16\ \%$ Zinsfuß. Dennoch schafft das Großprojekt einen vielfach höheren absoluten Kapitalwert. Bei sich gegenseitig ausschließenden Projekten sollte daher immer der absolute Kapitalwert den Ausschlag geben.
