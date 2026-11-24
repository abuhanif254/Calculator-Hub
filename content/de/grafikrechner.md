---
title: "Grafikrechner"
metaTitle: "Grafikrechner online: Funktionen zeichnen & analysieren"
description: "Zeichnen und analysieren Sie mathematische Funktionen im interaktiven Koordinatensystem mit frei wählbaren Achsenbegrenzungen für Kurvendiskussion und Studium."
metaDescription: "Kostenloser Online-Grafikrechner: Zeichnen Sie Funktionen wie Polynome, Sinus oder Logarithmen präzise und prüfen Sie Nullstellen und Extrempunkte."
metaKeywords: "grafikrechner, funktionsplotter online, funktionen zeichnen, koordinatensystem rechner, kurvendiskussion, nullstellen bestimmen, mathematik rechner"
faqs:
  - question: "Welche mathematischen Funktionen und Operatoren versteht der Online-Grafikrechner?"
    answer: "Der Grafikrechner unterstützt alle Grundrechenarten (+, -, *, /), Potenzen mit dem Zirkumflex (^), runde Klammern sowie die gängigen Standardfunktionen wie sin(x), cos(x), tan(x), sqrt(x) für die Quadratwurzel, abs(x) für den Betrag, exp(x) für die natürliche Exponentialfunktion sowie log(x) und log10(x)."
  - question: "Rechnet der Grafikrechner bei Sinus, Kosinus und Tangens im Bogenmaß oder im Gradmaß?"
    answer: "Alle trigonometrischen Funktionen arbeiten nach internationalem Mathematikstandard im Bogenmaß (Radiant). Eine volle Periode von sin(x) beträgt daher 2*pi (etwa 6,283). Wenn Sie eine Funktion im Gradmaß darstellen möchten, multiplizieren Sie das Argument direkt mit pi / 180, also beispielsweise sin(x * pi / 180)."
  - question: "Berechnet log(x) im Grafikrechner den natürlichen oder den dekadischen Logarithmus?"
    answer: "Im Funktionsauswerter steht log(x) für den natürlichen Logarithmus ln(x) zur Eulerschen Basis e (etwa 2,71828). Wenn Sie den in der Schule verbreiteten Zehnerlogarithmus lg(x) zeichnen möchten, verwenden Sie die Schreibweise log10(x) oder alternativ log(x) / log(10)."
  - question: "Warum sehe ich meinen Funktionsgraphen manchmal nicht im Koordinatensystem?"
    answer: "Bleibt die Zeichenfläche leer, liegt der Funktionsgraph meist außerhalb der aktuell eingestellten Achsenbegrenzungen (Standardbereich -10 bis +10) oder der gewählte x-Bereich liegt außerhalb des reellen Definitionsbereichs – etwa bei sqrt(x) oder log(x) für negative x-Werte. Erweitern Sie die Grenzen für X und Y gezielt anhand einer kurzen Werteabschätzung."
  - question: "Warum erscheint bei Funktionen wie 1/x oder tan(x) oft eine senkrechte Linie an der Polstelle?"
    answer: "Weil ein digitaler Funktionszeichner diskrete Punkte entlang der x-Achse auswertet und benachbarte Bildpunkte durch kurze Strecken verbindet, springt die Linie an einer vertikalen Asymptote direkt von einem sehr großen positiven zu einem sehr großen negativen Funktionswert. Diese steile Verbindungslinie ist ein rein grafisches Artefakt und gehört nicht zum eigentlichen Funktionsgraphen."
---

Ein interaktiver **Grafikrechner** verwandelt Funktionsgleichungen $y = f(x)$ unmittelbar in präzise Kurven im kartesischen Koordinatensystem. Für die Kurvendiskussion in der Sekundarstufe II (Abitur und Matura), die Analysis im Ingenieurstudium sowie zur schnellen Plausibilitätsprüfung macht der Graph zentrale Eigenschaften wie Nullstellen, Extrempunkte, Wendepunkte, Symmetrien und Asymptoten auf einen Blick sichtbar.

## Mathematische Funktionsweise der Kurvendarstellung

Nach der Eingabe zerlegt der mathematische Ausdrucksauswerter den Term gemäß der Operatorrangfolge (Klammern vor Potenzen, Punkt- vor Strichrechnung) in einen **Syntaxbaum**. Danach wird die Funktion im gewählten Intervall $[x_{\min}, x_{\max}]$ an äquidistanten Stützstellen ausgewertet und auf das Bildpunktraster übertragen.

### Affine Koordinatentransformation auf die Zeichenfläche

Für eine Zeichenfläche der Breite $W$ und Höhe $H$ (in Pixeln, $\text{px}$) sowie den Darstellungsbereich $[x_{\min}, x_{\max}] \times [y_{\min}, y_{\max}]$ mit $x_{\min} < x_{\max}$ und $y_{\min} < y_{\max}$ berechnet der Grafikrechner für jede horizontale Spalte $k \in \{0, 1, \dots, W\}$ die Schrittweite $\Delta x$, den Funktionswert $y_k$ und die Bildschirmkoordinaten $(p_x, p_y)$:

$$\Delta x = \frac{x_{\max} - x_{\min}}{W}, \qquad x_k = x_{\min} + k \cdot \Delta x, \qquad y_k = f(x_k)$$

$$p_x(x) = \frac{x - x_{\min}}{x_{\max} - x_{\min}} \cdot W, \qquad p_y(y) = H - \frac{y - y_{\min}}{y_{\max} - y_{\min}} \cdot H$$

* **$x_{\min}, x_{\max}, y_{\min}, y_{\max}$ (Achsenbegrenzungen):** Bestimmen den sichtbaren Ausschnitt und die Achsenmaßstäbe.
* **$\Delta x$ (Abtastschrittweite):** Horizontaler Abstand zweier Stützstellen; ein engeres $x$-Intervall erhöht die geometrische Detailauflösung.
* **$p_x(x)$ und $p_y(y)$ (Bildpunktkoordinaten):** Die Subtraktion von $H$ bei $p_y(y)$ spiegelt die Vertikale, da die mathematische $y$-Achse nach oben zeigt, Bildschirmkoordinaten jedoch am oberen Rand bei $0$ beginnen.

Stellen außerhalb des reellen Definitionsbereichs (etwa Division durch Null oder negative Radikanden) werden beim Zeichnen gezielt übersprungen, sodass der Linienzug unterbrochen wird.

## Schritt-für-Schritt-Rechenbeispiel: Kubische Kurvendiskussion

Analysiert wird die ganzrationale Funktion dritten Grades mit der Eingabe `x^3 - 3*x^2 - 9*x + 5`:

$$f(x) = x^3 - 3x^2 - 9x + 5$$

1. **Achsenabschnitt und Ableitungen bestimmen:**
   * $y$-Achsenabschnitt: $f(0) = 5 \implies S_y(0 \mid 5)$.
   * Ableitungen: $f'(x) = 3x^2 - 6x - 9 = 3(x + 1)(x - 3)$ und $f''(x) = 6x - 6$.
2. **Extrem- und Wendepunkte exakt berechnen:**
   * $f'(x) = 0$ liefert die Kandidaten $x_1 = -1$ und $x_2 = 3$.
   * **Hochpunkt:** $f''(-1) = -12 < 0$ und $f(-1) = -1 - 3 + 9 + 5 = 10 \implies \mathbf{H(-1 \mid 10)}$.
   * **Tiefpunkt:** $f''(3) = 12 > 0$ und $f(3) = 27 - 27 - 27 + 5 = -22 \implies \mathbf{T(3 \mid -22)}$.
   * **Wendepunkt:** $f''(x) = 0 \implies x_W = 1$ mit $f'''(1) = 6 \neq 0$ und $f(1) = -6 \implies \mathbf{W(1 \mid -6)}$.
3. **Achsenbegrenzungen optimieren und Bildkoordinaten prüfen:**
   Im Standardfenster $[-10, 10] \times [-10, 10]$ läge der Tiefpunkt $T(3 \mid -22)$ außerhalb der Zeichenfläche. Mit $x \in [-4, 6]$ und $y \in [-25, 15]$ auf einer $600 \times 500\text{-px}$-Fläche ergibt sich $\Delta x = \frac{10}{600} \approx 0{,}0167$, und die markanten Punkte liegen exakt bei:
   * $H(-1 \mid 10)$: $p_x = \frac{3}{10} \cdot 600 = 180{,}0\text{ px}$, $p_y = 500 - \frac{35}{40} \cdot 500 = 62{,}5\text{ px}$
   * $W(1 \mid -6)$: $p_x = \frac{5}{10} \cdot 600 = 300{,}0\text{ px}$, $p_y = 500 - \frac{19}{40} \cdot 500 = 262{,}5\text{ px}$
   * $T(3 \mid -22)$: $p_x = \frac{7}{10} \cdot 600 = 420{,}0\text{ px}$, $p_y = 500 - \frac{3}{40} \cdot 500 = 462{,}5\text{ px}$

Am eingerahmten Graphen lassen sich zudem alle drei reellen Nullstellen bei $x_1 \approx -2{,}18$, $x_2 \approx 0{,}49$ und $x_3 \approx 4{,}69$ direkt ablesen.

## Referenztabelle: Wichtige Funktionsklassen und Eingabesyntax

| Funktionsklasse | Beispiel-Eingabe | Definitionsbereich $D_f$ | Merkmal im Graphen | Empfohlenes Fenster |
| :--- | :--- | :--- | :--- | :--- |
| **Quadratisch** | `0.5*x^2 - 2*x - 3` | $\mathbb{R}$ | Parabel mit Scheitel $(2 \mid -5)$ | $x \in [-6, 10], \; y \in [-8, 12]$ |
| **Gebrochenrational** | `1 / (x - 2)` | $\mathbb{R} \setminus \{2\}$ | Hyperbel mit Polstelle $x = 2$ | $x \in [-4, 8], \; y \in [-6, 6]$ |
| **Trigonometrisch** | `2*sin(x) + cos(2*x)` | $\mathbb{R}$ | Periodische Welle ($2\pi$) | $x \in [-6{,}5, 6{,}5], \; y \in [-4, 4]$ |
| **Exponentialfunktion** | `exp(0.5*x)` | $\mathbb{R}$ | Streng wachsend, Asymptote $y = 0$ | $x \in [-6, 6], \; y \in [-1, 20]$ |
| **Logarithmus** | `log(x)` | $(0, \infty)$ | Nullstelle $x = 1$, Polstelle $0^+$ | $x \in [-1, 10], \; y \in [-4, 4]$ |
| **Wurzel & Betrag** | `sqrt(x + 4)`, `abs(x - 1)` | $[-4, \infty)$ bzw. $\mathbb{R}$ | Startpunkt $(-4 \mid 0)$, Knick $(1 \mid 0)$ | $x \in [-6, 10], \; y \in [-2, 8]$ |

## Häufige Fehler bei der Arbeit mit Grafikrechnern

* **Bogenmaß mit Gradmaß verwechseln:** Wer `sin(x)` auf $[-360, 360]$ aufruft, sieht dicht gedrängte Schwingungen statt einer Periode, weil alle Winkelfunktionen im Bogenmaß rechnen. Nutzen Sie für Gradangaben ausdrücklich `sin(x * pi / 180)`.
* **Fehlende Klammern und Dezimalkomma:** `1/x+2` bedeutet $\frac{1}{x} + 2$ statt $\frac{1}{x + 2}$, und `2^x+1` entspricht nicht $2^{x+1}$. Setzen Sie zusammengesetzte Nenner und Exponenten konsequent in Klammern (`1/(x+2)`, `2^(x+1)`) und verwenden Sie im Eingabefeld stets den Dezimalpunkt (`0.5*x`).
* **Unterabtastung bei hohen Frequenzen:** Ist das $x$-Intervall für schnell schwingende Terme wie `sin(25*x)` zu breit gewählt, verfehlt das Pixelraster die Extrema und erzeugt falsche Schwebungsmuster; verkleinern Sie dann den $x$-Bereich.
* **Verzerrte Winkel durch ungleiche Maßstäbe:** Weichen die Intervalllängen von $[x_{\min}, x_{\max}]$ und $[y_{\min}, y_{\max}]$ vom $6:5$-Seitenverhältnis der Zeichenfläche ab, erscheinen Kreise als Ellipsen und orthogonale Geraden nicht rechtwinklig.
