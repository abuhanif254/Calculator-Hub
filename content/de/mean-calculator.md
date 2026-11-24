---
title: "Mittelwertrechner – Arithmetisches, gewichtetes, geometrisches & harmonisches Mittel"
metaTitle: "Mittelwertrechner: Arithmetisch, geometrisch & harmonisch"
description: "Berechnen Sie arithmetisches, gewichtetes, geometrisches, harmonisches und quadratisches Mittel für beliebige Datensätze – mit Formeln, Vergleichstabelle und Rechenbeispielen."
metaDescription: "Berechnen Sie arithmetisches, gewichtetes, geometrisches, harmonisches und quadratisches Mittel inkl. Formeln, Vergleichstabelle und Beispielen."
metaKeywords: "mittelwertrechner, durchschnitt berechnen, arithmetisches mittel, gewichtetes mittel, geometrisches mittel, harmonisches mittel, quadratisches mittel, lagemaße"
faqs:
  - question: "Worin unterscheiden sich arithmetisches, geometrisches und harmonisches Mittel?"
    answer: "Das arithmetische Mittel addiert alle Messwerte und teilt durch ihre Anzahl – es eignet sich für additive Größen wie Längen, Gewichte oder Umsätze. Das geometrische Mittel multipliziert positive Faktoren und zieht die n-te Wurzel, weshalb es für Wachstumsraten, Zinseszinsen und Indizes unverzichtbar ist. Das harmonische Mittel bildet den Kehrwert des Durchschnitts der Kehrwerte und liefert exakte Mittelwerte für Verhältniszahlen wie Geschwindigkeiten bei gleicher Strecke."
  - question: "Wann muss ich für Renditen das geometrische statt des arithmetischen Mittels nutzen?"
    answer: "Sobald Erträge über mehrere Perioden hinweg aufeinander aufbauen (Zinseszinseffekt), ist das geometrische Mittel der Wachstumsfaktoren (1 + r_i) zwingend erforderlich. Das arithmetische Mittel einzelner Jahresrenditen überschätzt die reale Wertentwicklung bei jeder vorhandenen Schwankung systematisch – bei +50 % im ersten und -50 % im zweiten Jahr suggeriert es 0 %, obwohl tatsächlich 25 % Kapital verloren gingen."
  - question: "Warum liefert das harmonische Mittel die richtige Durchschnittsgeschwindigkeit für Hin- und Rückfahrt?"
    answer: "Werden identische Teilstrecken mit unterschiedlichen Geschwindigkeiten zurückgelegt, verbringt das Fahrzeug deutlich mehr Fahrzeit im langsameren Abschnitt. Das harmonische Mittel gewichtet jede Geschwindigkeit automatisch nach der jeweiligen Fahrtdauer, während das arithmetische Mittel fälschlicherweise gleich lange Zeitabschnitte unterstellt."
  - question: "Funktionieren geometrisches und harmonisches Mittel auch bei Nullwerten oder negativen Zahlen?"
    answer: "Beide Mittelwerte sind im Standardfall strikt für positive reelle Zahlen (x_i > 0) definiert. Im geometrischen Mittel drückt eine einzige Null das gesamte Produkt auf null, und negative Werte können zu nicht-reellen Wurzeln führen. Bei negativen prozentualen Veränderungen oder Renditen wandeln Sie jeden Wert r_i vorab in einen positiven Wachstumsfaktor (1 + r_i) um."
  - question: "Was besagt die Mittelwert-Ungleichung zwischen quadratischem, arithmetischem, geometrischem und harmonischem Mittel?"
    answer: "Für jeden Datensatz aus positiven reellen Zahlen gilt ausnahmslos die strenge Rangfolge: Quadratisches Mittel >= Arithmetisches Mittel >= Geometrisches Mittel >= Harmonisches Mittel. Gleichheit tritt genau dann ein, wenn alle Einzelwerte im Datensatz vollkommen identisch sind; je stärker die Werte streuen, desto weiter klaffen die Mittelwerte auseinander."
---

## Warum »der Durchschnitt« allein oft in die Irre führt

Im Alltag steht der Begriff **Mittelwert** fast immer für das einfache arithmetische Mittel. In der Finanzmathematik, der Physik und der Datenanalyse führt pauschales Aufaddieren jedoch rasch zu Fehlschlüssen: Wer Fondsrenditen arithmetisch mittelt, überschätzt das Endkapital; wer Geschwindigkeiten über identische Strecken addiert, erhält eine falsche Reisezeit; und wer Modulnoten ohne Leistungspunkte (ECTS) mittelt, verzerrt den Studienabschluss.

Welches Lagemaß mathematisch korrekt ist, hängt davon ab, wie die Größe verknüpft wird – additiv, gewichtet, multiplikativ, als Verhältniszahl oder über ihre quadratische Energie. Unser **Mittelwertrechner** berechnet alle fünf zentralen Mittelwertarten auf einen Blick.

## Mathematische Formeln der wichtigsten Mittelwertarten

Für $n$ reelle Beobachtungen $\{x_1, x_2, \dots, x_n\}$ bewahrt jede Mittelwertform eine eigene algebraische Invariante.

### 1. Arithmetisches Mittel ($\bar{x}$ bzw. $\mu$)

Erhält die Gesamtsumme des Datensatzes ($n \cdot \bar{x} = \sum x_i$):

$$\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$$

### 2. Gewichtetes arithmetisches Mittel ($\bar{x}_w$)

Berücksichtigt ungleiche Gewichte $w_i \ge 0$ wie ECTS-Punkte, Depotanteile oder Gruppengrößen:

$$\bar{x}_w = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}$$

### 3. Geometrisches Mittel ($\bar{x}_{\text{geom}}$)

Bewahrt das Gesamtprodukt positiver Werte ($x_i > 0$). Die logarithmische Form schützt bei großen Datenmengen vor Zahlenüberlauf:

$$\bar{x}_{\text{geom}} = \left(\prod_{i=1}^{n} x_i\right)^{\frac{1}{n}} = \exp\left(\frac{1}{n} \sum_{i=1}^{n} \ln(x_i)\right)$$

### 4. Harmonisches Mittel ($\bar{x}_{\text{harm}}$)

Bildet den Kehrwert des Durchschnitts der Kehrwerte positiver Beobachtungen ($x_i > 0$):

$$\bar{x}_{\text{harm}} = \frac{n}{\sum_{i=1}^{n} \frac{1}{x_i}}$$

### 5. Quadratisches Mittel / Effektivwert ($\bar{x}_{\text{quad}}$)

Bewahrt in der Elektrotechnik (Wechselspannung) und Fehleranalyse (mittlerer quadratischer Fehler) die mittlere quadratische Größe:

$$\bar{x}_{\text{quad}} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} x_i^2}$$

### Bedeutung der Variablen

* **$x_i$:** Der $i$-te Messwert im Datensatz.
* **$n$:** Gesamtanzahl der Beobachtungen.
* **$w_i$:** Nicht-negatives Gewicht oder Häufigkeit zu $x_i$ (mit $\sum w_i > 0$).
* **$\prod_{i=1}^{n}$ / $\ln(x_i)$:** Produktzeichen über alle $n$ Faktoren bzw. natürlicher Logarithmus zur Basis $e$ für $x_i > 0$.

## Die verallgemeinerte Potenzmittel-Hierarchie

Alle klassischen Mittelwerte bilden Spezialfälle der **verallgemeinerten Potenzmittel** $M_p = \left(\frac{1}{n} \sum x_i^p\right)^{1/p}$: $p = 2$ ergibt das quadratische, $p = 1$ das arithmetische, $p \to 0$ das geometrische und $p = -1$ das harmonische Mittel. Für beliebige positive Zahlen gilt ausnahmslos die **Mittelwert-Ungleichung**:

$$\bar{x}_{\text{quad}} \ge \bar{x} \ge \bar{x}_{\text{geom}} \ge \bar{x}_{\text{harm}}$$

Je stärker ein Datensatz streut, desto weiter liegen die Maße auseinander. Bei Geldanlagen beschreibt die Differenz zwischen arithmetischer und geometrischer Rendite den **Volatilitätsverlust** ($\bar{r}_{\text{geom}} \approx \bar{r}_{\text{arith}} - \frac{\sigma^2}{2}$).

## Schritt-für-Schritt-Rechenbeispiele aus Finanzen und Logistik

### Beispiel 1: Mehrjährige Fondsrendite (Geometrisches vs. arithmetisches Mittel)

Ein Anleger investiert $10.000\text{ €}$ in einen Aktienfonds. Im 1. Jahr steigt der Wert um $+40\ \%$ auf $14.000\text{ €}$, im 2. Jahr fällt er um $-30\ \%$ auf $9.800\text{ €}$, im 3. Jahr legt er um $+25\ \%$ auf $12.250\text{ €}$ zu.

1. **Wachstumsfaktoren ($q_i = 1 + r_i$) bilden:** $q_1 = 1{,}40$, $q_2 = 0{,}70$, $q_3 = 1{,}25$.
2. **Gesamtfaktor multiplizieren:** $1{,}40 \times 0{,}70 \times 1{,}25 = 1{,}2250$ (exakt $\frac{12.250\text{ €}}{10.000\text{ €}}$).
3. **Geometrisches Mittel berechnen:**
   $$\bar{q}_{\text{geom}} = \sqrt[3]{1{,}2250} \approx 1{,}069987 \implies \bar{r}_{\text{geom}} = +7{,}00\ \%\text{ p. a.}$$
   *Gegenprobe:* $10.000\text{ €} \times 1{,}069987^3 = 12.250{,}00\text{ €}$.
4. **Arithmetischer Vergleich:** $\frac{+40\ \% - 30\ \% + 25\ \%}{3} = +11{,}67\ \%\text{ p. a.}$ – dies ergäbe fiktiv rund $13.924\text{ €}$ und überschätzt den realen Ertrag deutlich.

### Beispiel 2: Durchschnittsgeschwindigkeit gleicher Strecke (Harmonisches Mittel)

Ein Lieferfahrzeug fährt $120\text{ km}$ auf der Autobahn mit $100\text{ km/h}$ ($1{,}2\text{ h}$) hin und dieselben $120\text{ km}$ im Berufsverkehr mit $60\text{ km/h}$ ($2{,}0\text{ h}$) zurück. Für $240\text{ km}$ in $3{,}2\text{ h}$ ergibt sich exakt $75{,}00\text{ km/h}$ – identisch zum harmonischen Mittel:

$$\bar{x}_{\text{harm}} = \frac{2}{\frac{1}{100} + \frac{1}{60}} = \frac{2}{\frac{8}{300}} = 75{,}00\text{ km/h}$$

Am Paar $\{60;\; 100\}$ bestätigt sich zudem die gesamte Ungleichung: $\bar{x}_{\text{quad}} = 82{,}46 > \bar{x} = 80{,}00 > \bar{x}_{\text{geom}} = 77{,}46 > \bar{x}_{\text{harm}} = 75{,}00\text{ km/h}$.

## Vergleichstabelle aller Mittelwertarten

| Mittelwertart | Formel | Definitionsbereich | Ausreißerverhalten | Typische Anwendung |
| :--- | :--- | :--- | :--- | :--- |
| **Arithmetisch ($\bar{x}$)** | $\frac{1}{n}\sum x_i$ | Alle $\mathbb{R}$ | Stark anfällig | Messreihen, Prüfwerte, Temperaturen |
| **Gewichtet ($\bar{x}_w$)** | $\frac{\sum w_i x_i}{\sum w_i}$ | $x_i \in \mathbb{R},\; w_i \ge 0$ | Dominiert von Gewichten | ECTS-Schnitt, Kapitalkosten, Gruppen |
| **Geometrisch ($\bar{x}_{\text{geom}}$)** | $\left(\prod x_i\right)^{1/n}$ | $x_i > 0$ | Dämpft Spitzen | Fondsrenditen, Inflation, Wachstum |
| **Harmonisch ($\bar{x}_{\text{harm}}$)** | $\frac{n}{\sum (1/x_i)}$ | $x_i > 0$ | Geprägt von Minima | Geschwindigkeiten, KGV, F1-Maß |
| **Quadratisch ($\bar{x}_{\text{quad}}$)** | $\sqrt{\frac{1}{n}\sum x_i^2}$ | Alle $\mathbb{R}$ | Verstärkt Beträge | $230\text{ V}$ Effektivwert, Prognosefehler |
| **Gestutztes Mittel** | $\bar{x}$ ohne äußere $k\ \%$ | Alle $\mathbb{R}$ | Sehr robust | Sportwertungen, robuste Preisindizes |

## Häufige Fehlerquellen bei der Mittelwertberechnung

* **Ungewichteter Durchschnitt aus Gruppendurchschnitten:** Erzielt Filiale A ($10$ Verkäufe) im Schnitt $50\text{ €}$ Bonwert und Filiale B ($90$ Verkäufe) im Schnitt $100\text{ €}$, liegt der gesamte Durchschnitt nicht bei $75\text{ €}$, sondern nach Stückzahlen gewichtet exakt bei $95\text{ €}$. Ein ungewichteter Mittelwert aus Gruppenmitteln führt zuverlässig zu Verzerrungen.
* **Verwechslung gleicher Zeit- und Streckenanteile:** Fährt ein Fahrzeug eine Stunde lang $100\text{ km/h}$ und eine weitere Stunde lang $60\text{ km/h}$, liefert das arithmetische Mittel ($80\text{ km/h}$) den exakten Durchschnitt. Nur bei gleicher Streckenlänge – oder beim Wertpapiersparplan mit festem monatlichem Euro-Betrag (Durchschnittskosteneffekt) – ist das harmonische Mittel die richtige Wahl.
* **Schiefe Verteilungen ohne Median bewerten:** Bei Haushaltseinkommen, Betriebsgrößen oder Immobilienpreisen im DACH-Raum ziehen wenige Spitzenwerte das arithmetische Mittel deutlich über das typische Niveau hinaus. Ergänzen Sie stark rechtsschiefe Analysen daher stets um den Median oder das gestutzte Mittel.
* **Negative Prozente direkt im geometrischen Mittel:** Das direkte Einsetzen negativer Prozentzahlen wie $-30\ \%$ in das geometrische Mittel ist mathematisch unzulässig und erzeugt ungültige Wurzeln. Wandeln Sie periodische Veränderungsraten stets vorab in positive Wachstumsfaktoren $q_i = 1 + r_i$ um und subtrahieren Sie erst vom fertigen Endergebnis wieder $1$.
* **Unkritische Mittelung von Ordinaldaten:** Schulnoten oder Kundenbewertungen auf einer Fünf-Punkte-Skala weisen nicht zwingend exakt gleiche Abstände zwischen den Stufen auf; ergänzen Sie den berechneten Durchschnitt bei Umfragen stets durch Median und Häufigkeitsverteilung.
