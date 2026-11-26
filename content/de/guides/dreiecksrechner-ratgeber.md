---
title: "Dreiecksrechner-Ratgeber: Seiten, Winkel & Fläche"
description: "Komplettes Nachschlagewerk zur Dreiecksberechnung: Satz des Pythagoras, Sinus- und Kosinussatz, heronische Formel, Zweideutigkeitsfall (SsW) sowie typische Fehlerquellen."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "triangle-calculator"
faqs:
  - question: "Warum reichen drei Winkel (WWW) allein nicht zur Berechnung eines Dreiecks aus?"
    answer: "Drei Winkel legen lediglich die Form eines Dreiecks fest, nicht aber seine absolute Größe. Alle Dreiecke mit denselben Innenwinkeln sind zueinander ähnlich, lassen sich jedoch beliebig skalieren. Für eine eindeutige Seiten- und Flächenberechnung muss mindestens eine Längenangabe (eine Seite, eine Höhe oder der Umfang) bekannt sein."
  - question: "Was bedeutet der Zweideutigkeitsfall (SsW) und wann entstehen null, eine oder zwei Lösungen?"
    answer: "Sind zwei Seiten und der Gegenwinkel der kürzeren Seite gegeben, kann der Sinussatz auf zwei verschiedene Ergänzungswinkel (α und 180° − α) führen. Liegt die gegenüberliegende Seite unterhalb der minimalen Höhe, existiert keine Lösung; bei exakter Gleichheit entsteht genau ein rechtwinkliges Dreieck; liegt sie zwischen Höhe und anliegender Seite, existieren zwei gültige Dreiecke."
  - question: "Wann sollte man zur Winkelberechnung den Kosinussatz statt des Sinussatzes bevorzugen?"
    answer: "Immer dann, wenn unbekannte Winkel stumpf (> 90°) sein können oder alle drei Seiten gegeben sind. Der Arkussinus liefert grundsätzlich nur Winkel zwischen 0° und 90° und unterscheidet nicht zwischen α und 180° − α, während der Arkuskosinus im gesamten Bereich von 0° bis 180° eindeutig bleibt."
  - question: "Wie prüft man vorab, ob drei gegebene Seitenlängen überhaupt ein Dreieck bilden?"
    answer: "Die Dreiecksungleichung verlangt, dass die Summe je zweier Seiten stets echt größer ist als die dritte Seite: a + b > c, a + c > b und b + c > a. In der Praxis genügt es zu prüfen, ob die Summe der beiden kürzeren Seiten strikt größer ist als die längste Seite; bei Gleichheit liegt ein zu einer Strecke entartetes Dreieck mit Fläche null vor."
  - question: "Welche Vorteile bietet die heronische Formel gegenüber der Grundformel A = (g × h) / 2?"
    answer: "Die heronische Formel berechnet den Flächeninhalt direkt aus den drei Seitenlängen a, b und c über den halben Umfang s, ohne dass zuvor ein Winkel oder eine Höhe bestimmt werden muss. Dies spart Zwischenschritte in der Vermessung, im Bauwesen und bei CAD-Berechnungen, sofern alle drei Seiten bekannt sind."
---

Ein ebenes Dreieck wird durch sechs Basisgrößen vollständig beschrieben: die drei Seitenlängen `a`, `b`, `c` sowie die jeweils gegenüberliegenden Innenwinkel `α`, `β`, `γ`. In der euklidischen Geometrie beträgt die Innenwinkelsumme stets exakt `α + β + γ = 180°`, und die Seitenlängen müssen die Dreiecksungleichung `a + b > c` (analog für alle Seitenpaare) erfüllen.

Sobald mindestens drei unabhängige Größen bekannt sind — darunter zwingend mindestens eine Länge —, lassen sich alle übrigen Seiten, Winkel, Höhen, der Umfang `U` sowie der Flächeninhalt `A` berechnen. Ein moderner Dreiecksrechner wählt je nach Eingabekombination automatisch zwischen rechtwinkliger Trigonometrie, Sinussatz, Kosinussatz und der heronischen Formel und erkennt dabei auch mehrdeutige oder geometrisch unmögliche Eingaben.

## Geometrische Grundlagen, Formeln und Lösungsverfahren

Die Wahl des Rechenwegs richtet sich danach, ob ein rechter Winkel (`90°`) vorliegt und welche Kombination aus Seiten (`S`) und Winkeln (`W`) bekannt ist.

### Rechtwinklige Dreiecke: Pythagoras und Winkelfunktionen

Bei `γ = 90°` bilden `a` und `b` die Katheten und `c` die Hypotenuse. Für den spitzen Winkel `α` (Gegenkathete `a`, Ankathete `b`) gelten:

```text
a² + b² = c²
sin(α) = a / c,   cos(α) = b / c,   tan(α) = a / b
A = (a × b) / 2
```

### Allgemeine Dreiecke: Sinussatz und Kosinussatz

Für beliebige Dreiecke verknüpfen Sinussatz (`R` = Umkreisradius) und Kosinussatz Seiten und Winkel:

```text
Sinussatz:    a / sin(α) = b / sin(β) = c / sin(γ) = 2 × R
Kosinussatz:  c² = a² + b² − 2 × a × b × cos(γ)
Winkelform:   cos(γ) = (a² + b² − c²) / (2 × a × b)
```

Für `γ = 90°` wird `cos(90°) = 0`, sodass der Kosinussatz in den Satz des Pythagoras übergeht. Bei der Winkelberechnung bietet der Arkuskosinus den entscheidenden Vorteil der Eindeutigkeit zwischen `0°` und `180°`: Negative Kosinuswerte zeigen direkt einen stumpfen Winkel (`> 90°`) an.

### Flächenberechnung, Umfang und Radien

```text
Zwei Seiten + Winkel:  A = (1/2) × a × b × sin(γ)
Heronische Formel:     s = (a + b + c) / 2,   A = √(s × (s − a) × (s − b) × (s − c))
Umfang & Inkreis:      U = a + b + c,         r = A / s
```

Aus der Fläche folgen unmittelbar die drei Dreieckshöhen über `h_a = 2 × A / a`, `h_b = 2 × A / b` und `h_c = 2 × A / c`.

## Schritt-für-Schritt-Rechenbeispiel: Allgemeines Dreieck (SSS-Fall)

Gegeben sei ein Dreieck mit den Seitenlängen `a = 7 cm`, `b = 9 cm` und `c = 12 cm`. Gesucht sind alle Innenwinkel, der Flächeninhalt und der Inkreisradius.

1. **Dreiecksungleichung prüfen:** Die Summe der beiden kürzeren Seiten beträgt `7 cm + 9 cm = 16 cm > 12 cm`; das Dreieck ist gültig.
2. **Größten Winkel `γ` zuerst berechnen:** Um Sinus-Mehrdeutigkeiten auszuschließen, starten wir bei `c = 12 cm`: `cos(γ) = (7² + 9² − 12²) / (2 × 7 × 9) = (49 + 81 − 144) / 126 = −14 / 126 ≈ −0,111111`. Daraus folgt `γ = arccos(−0,111111) ≈ 96,38°` (stumpfwinklig).
3. **Zweiten Winkel `α` bestimmen:** `cos(α) = (9² + 12² − 7²) / (2 × 9 × 12) = (81 + 144 − 49) / 216 = 176 / 216 ≈ 0,814815`, also `α = arccos(0,814815) ≈ 35,43°`.
4. **Dritten Winkel `β` über die Winkelsumme ermitteln:** `β = 180° − 96,38° − 35,43° = 48,19°`.
5. **Fläche nach Heron und Inkreisradius:** Mit dem halben Umfang `s = (7 + 9 + 12) / 2 = 14 cm` folgt `A = √(14 × 7 × 5 × 2) = √980 ≈ 31,30 cm²` und `r = 31,30 cm² / 14 cm ≈ 2,24 cm`.

## Entscheidungstabelle: Welcher Lösungsweg passt zu welchen Eingabewerten?

| Fall | Gegebene Größen | Primäre Methode | Lösungen | Besonderheit / Hinweis |
|---|---|---|---|---|
| **SSS** | Drei Seiten (`a, b, c`) | Kosinussatz + Heron | 0 oder 1 | Größten Winkel zuerst; Dreiecksungleichung prüfen |
| **SWS** | Zwei Seiten + Zwischenwinkel | Kosinussatz → Sinussatz | 1 | Eindeutig für jeden Winkel `0° < γ < 180°` |
| **WSW** | Seite + zwei anliegende Winkel | Winkelsumme → Sinussatz | 0 oder 1 | Nur lösbar bei Winkelsumme `< 180°` |
| **WWS** | Seite + an- und gegenüberliegender Winkel | Winkelsumme → Sinussatz | 0 oder 1 | Dritten Winkel zuerst über `180°` bestimmen |
| **SsW** | Zwei Seiten + Gegenwinkel (längere Seite) | Sinussatz | 1 | Eindeutig, da größerer Winkel der längeren Seite gegenüberliegt |
| **sSW** | Zwei Seiten + Gegenwinkel (kürzere Seite) | Sinussatz (Fallunterscheidung) | 0, 1 oder 2 | Zweideutigkeitsfall: `β` und `180° − β` prüfen |
| **WWW** | Drei Winkel (`α, β, γ`) | Nur Ähnlichkeit | ∞ | Mindestens eine Seitenlänge erforderlich |

## Praxisbeispiele, numerische Fallstricke und Genauigkeitshinweise

Dreiecksberechnungen sind zentral in der Geodäsie (Triangulation bei Grundstücksvermessungen), im konstruktiven Ingenieurbau (Fachwerkstäbe, Dachneigungen), in der CNC-Fertigung und in der Navigation. In der deutschen Vermessungspraxis wird häufig statt Altgrad (`360°`) das **Gon** genutzt, bei dem ein Vollkreis `400 gon` misst — vor der Eingabe ist dann `1 gon = 0,9°` umzurechnen.

Vermeiden Sie bei eigenen Berechnungen vier klassische Fehlerquellen:

- **Radiant vs. Gradmaß (`RAD` vs. `DEG`):** Programmiersprachen erwarten Winkel im Bogenmaß (`π rad = 180°`); ein falscher Modus verfälscht jedes Ergebnis.
- **Unbemerkter Zweideutigkeitsfall (`sSW`):** Wer blind den ersten `arcsin`-Wert übernimmt, übersieht eine mögliche zweite Lösung mit stumpfem Winkel.
- **Auslöschung bei extrem flachen Dreiecken:** Bei `s − a ≈ 0` verliert die klassische heronische Formel durch Rundungsfehler Genauigkeit; stabile Algorithmen sortieren `a ≥ b ≥ c`.
- **Verfrühtes Runden:** Runden Sie Zwischenwerte nicht auf zwei Stellen, da schon `0,1°` Winkelabweichung bei großen Distanzen spürbare Längenfehler erzeugt.
