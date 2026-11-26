---
title: "Funktionen grafisch darstellen: Parabeln und Steigungen"
description: "Lernen Sie, lineare Gleichungen und Parabeln präzise zu zeichnen, Steigungen sowie Scheitelpunkte zu berechnen und Schnittpunkte mit unserem Grafikrechner zu analysieren."
category: "Math & Science"
relatedCalculator: "graphing-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wie bestimme ich die Steigung m einer Geraden aus zwei bekannten Punkten?"
    answer: "Verwenden Sie den Differenzenquotienten m = (y₂ − y₁) / (x₂ − x₁). Teilen Sie also die vertikale Veränderung (Δy) durch die horizontale Veränderung (Δx). Ein positives m bedeutet eine steigende Gerade von links nach rechts, ein negatives m eine fallende Gerade und m = 0 eine waagerechte Parallele zur x-Achse."
  - question: "Woran erkenne ich bei einer Parabelgleichung die Öffnungsrichtung und Breite?"
    answer: "Entscheidend ist der Leitkoeffizient a vor x² in f(x) = a·x² + b·x + c. Ist a > 0, öffnet sich die Parabel nach oben und der Scheitelpunkt bildet ein Minimum; bei a < 0 öffnet sie sich nach unten mit einem Maximum. Für |a| > 1 ist die Parabel schmaler (gestreckt), für 0 < |a| < 1 breiter (gestaucht) als die Normalparabel."
  - question: "Wie wandle ich die allgemeine Form einer Parabel in die Scheitelpunktform um?"
    answer: "Die x-Koordinate des Scheitelpunkts S(d | e) lautet d = −b / (2a), die y-Koordinate erhalten Sie durch Einsetzen als e = f(d). Alternativ führt die quadratische Ergänzung direkt zur Scheitelpunktform f(x) = a·(x − d)² + e, aus der sich der Extremwert unmittelbar ablesen lässt."
  - question: "Warum können Parabeln null, eine oder zwei Nullstellen besitzen?"
    answer: "Die Anzahl der reellen Schnittpunkte mit der x-Achse hängt von der Diskriminante D = b² − 4ac ab. Ist D > 0, existieren zwei Nullstellen; bei D = 0 berührt der Scheitelpunkt die x-Achse genau einmal; bei D < 0 liegt die gesamte Parabel oberhalb oder unterhalb der x-Achse und hat keine reelle Nullstelle."
  - question: "Weshalb wirken Steigungen auf Bildschirmen manchmal steiler oder flacher als erwartet?"
    answer: "Wenn x-Achse und y-Achse unterschiedliche Maßstäbe verwenden – etwa 1 Einheit auf der x-Achse gleich 10 Einheiten auf der y-Achse –, verzerrt die Darstellung Winkel und Krümmungen. Eine Gerade mit Steigung m = 1 erscheint dann nicht mehr im 45°-Winkel. Für geometrisch treue Proportionen empfiehlt sich eine 1:1-Skalierung beider Achsen."
---

Mathematische Funktionsgleichungen beschreiben Zusammenhänge zwischen einer Eingangsgröße `x` und einer abhängigen Ausgangsgröße `f(x)` beziehungsweise `y`. Erst die grafische Darstellung im kartesischen Koordinatensystem macht Struktur, Änderungsraten, Extremwerte und Schnittpunkte unmittelbar sichtbar: Während lineare Funktionen konstante Änderungsraten als Geraden abbilden, erzeugen quadratische Funktionen symmetrische Parabeln, deren Steigung sich in jedem Punkt verändert.

Die beiden grundlegenden Funktionsklassen folgen den Gleichungen `f(x) = mx + b` (linear) und `f(x) = ax² + bx + c` (quadratisch). Mit unserem interaktiven [Grafikrechner](/de/rechner/grafikrechner) lassen sich mehrere Graphen gleichzeitig darstellen, Achsenabschnitte ablesen sowie Null- und Schnittstellen präzise analysieren.

## Mathematische Grundlagen: Steigungen, Achsenabschnitte und Parabeln

### Lineare Funktionen und Steigungsdreieck

Eine lineare Funktion ordnet jeder reellen Zahl `x` genau einen Funktionswert nach der Normalform `f(x) = mx + b` zu. Der Parameter `b` bezeichnet den y-Achsenabschnitt, also die Stelle `P_y(0|b)`, an der die Gerade die vertikale Achse schneidet. Der Parameter `m` steht für die konstante Steigung. Sie berechnet sich aus zwei beliebigen Kurvenpunkten `P₁(x₁|y₁)` und `P₂(x₂|y₂)` mit `x₂ ≠ x₁` über den Differenzenquotienten:

```text
m = Δy / Δx = (y₂ − y₁) / (x₂ − x₁)
```

Geometrisch entspricht `m` der Höhenänderung pro Einheit nach rechts. Zwei Geraden mit identischer Steigung `m₁ = m₂` und verschiedenem `b` verlaufen parallel; stehen sie senkrecht aufeinander (orthogonal), erfüllen sie `m₁·m₂ = −1`. Die Nullstelle einer Geraden mit `m ≠ 0` liegt bei `x₀ = −b / m`.

### Quadratische Funktionen: Normalform, Scheitelpunkt und Diskriminante

Tritt das quadratische Glied `ax²` mit `a ≠ 0` hinzu, entsteht eine Parabel. In der Praxis nutzt man drei äquivalente Schreibweisen:

```text
Allgemeine Form:    f(x) = ax² + bx + c
Scheitelpunktform:  f(x) = a(x − d)² + e
Faktorisierte Form: f(x) = a(x − x₁)(x − x₂)
```

Der Leitkoeffizient `a` bestimmt die Öffnungsrichtung (`a > 0`: nach oben; `a < 0`: nach unten) sowie Streckung oder Stauchung relativ zur Normalparabel `f(x) = x²`. Der Term `c` liefert stets den y-Achsenabschnitt `P_y(0|c)`. Der Scheitelpunkt `S(d|e)` – zugleich Extremwert und Punkt der Symmetrieachse `x = d` – ergibt sich direkt aus den Koeffizienten:

```text
d = −b / (2a)   und   e = c − b² / (4a) = f(d)
```

Die Nullstellen `f(x) = 0` berechnet die allgemeine Lösungsformel (Mitternachtsformel):

```text
x₁,₂ = [−b ± √(b² − 4ac)] / (2a)
```

Die Diskriminante `D = b² − 4ac` entscheidet über die Lösungsanzahl: Bei `D > 0` existieren zwei Nullstellen, bei `D = 0` berührt der Scheitelpunkt die x-Achse exakt einmal, und bei `D < 0` gibt es keine reellen Nullstellen.

## Schritt-für-Schritt-Rechenbeispiel: Parabel und Gerade schneiden

Gegeben seien die quadratische Funktion `f(x) = 0,5x² − 2x − 2,5` und die lineare Funktion `g(x) = x − 2,5`. Gesucht sind Scheitelpunkt, Nullstellen und beide Schnittpunkte.

1. **y-Achsenabschnitte ablesen:** Bei `x = 0` liefern beide Funktionen den Wert `−2,5`. Beide Graphen schneiden die y-Achse gemeinsam im Punkt `P_y(0|−2,5)`.
2. **Scheitelpunkt berechnen:** Mit `a = 0,5` und `b = −2` folgt `d = −(−2) / (2·0,5) = 2 / 1 = 2`. Einsetzen liefert `e = 0,5·2² − 2·2 − 2,5 = 2 − 4 − 2,5 = −4,5`. Der Scheitelpunkt liegt bei `S(2|−4,5)`, die Scheitelpunktform lautet `f(x) = 0,5(x − 2)² − 4,5`. Da `a = 0,5 > 0` gilt, ist die Parabel nach oben geöffnet und gestaucht.
3. **Nullstellen von `f(x)` bestimmen:** Die Gleichung `0,5x² − 2x − 2,5 = 0` ergibt nach Multiplikation mit `2` die normierte Form `x² − 4x − 5 = 0`. Die Diskriminante der Ausgangsfunktion beträgt `D = (−2)² − 4·0,5·(−2,5) = 4 + 5 = 9 > 0`. Durch Faktorisierung `(x − 5)(x + 1) = 0` erhält man die Nullstellen `x₁ = −1` und `x₂ = 5`.
4. **Schnittpunkte bestimmen:** Gleichsetzen `f(x) = g(x)` führt auf `0,5x² − 2x − 2,5 = x − 2,5`, also `0,5x² − 3x = 0`. Ausklammern liefert `x(0,5x − 3) = 0` mit `x₃ = 0` und `x₄ = 6`. Eingesetzt in `g(x)` erhält man `y₃ = −2,5` und `y₄ = 3,5` – die Schnittpunkte sind `Q₁(0|−2,5)` und `Q₂(6|3,5)`.

## Vergleichstabelle: Funktionstypen und ihre Graphen

| Funktionstyp | Gleichung | Graph-Form | Kennwerte | Typisches Einsatzgebiet |
| :--- | :--- | :--- | :--- | :--- |
| Konstante Funktion | `f(x) = b` | Waagerechte Gerade | Steigung `m = 0`, Schnittpunkt `(0\|b)` | Fixkosten, Ruhezustand |
| Lineare Funktion | `f(x) = mx + b` | Schräge Gerade | Steigung `m`, Nullstelle `−b/m` | Stromtarife, konstante Geschwindigkeit |
| Normalparabel | `f(x) = x²` | Symmetrische U-Kurve | Scheitelpunkt `(0\|0)`, `a = 1` | Quadratische Flächenskalierung |
| Allgemeine Parabel | `f(x) = ax² + bx + c` | Gestreckte/gestauchte U-Kurve | Scheitel `(d\|e)`, 0–2 Nullstellen | Wurfparabeln, Gewinnmaximierung |
| Kubische Funktion | `f(x) = ax³ + bx² + cx + d` | S-förmige Kurve | 1–3 Nullstellen, Wendepunkt | Biegelinien, kubische Splines |
| Exponentialfunktion | `f(x) = c·a^x` | Monoton gekrümmte Kurve | Asymptote `y = 0`, keine Nullstelle | Zinseszins, radioaktiver Zerfall |

## Praxisbeispiele, Fehlerquellen und numerische Präzision

In der Physik beschreibt eine nach unten geöffnete Parabel die ideale Wurfbewegung ohne Luftwiderstand: `h(t) = −0,5·g·t² + v₀·t + h₀` (mit Fallbeschleunigung `g ≈ 9,81 m/s²`, Anfangsgeschwindigkeit `v₀` und Abwurfhöhe `h₀`). Der Scheitelpunkt markiert den Zeitpunkt maximaler Flughöhe. In der Betriebswirtschaftslehre wiederum zeigen lineare Kostenfunktionen `K(x) = k_var·x + K_fix` im Schnittpunkt mit der Erlösfunktion die Gewinnschwelle (Break-even-Point), während quadratische Erlösmodelle ein eindeutiges Maximum liefern.

Vermeiden Sie bei der grafischen Auswertung vier häufige Fehlerquellen:

- **Vorzeichenfehler in der Scheitelpunktform:** In `f(x) = a(x − d)² + e` verschiebt `(x − 3)²` den Scheitelpunkt nach rechts zu `d = +3`, nicht zu `−3`. Erst `(x + 3)²` entspricht `d = −3`.
- **Verzerrtes Achsenverhältnis:** Ungleiche Maßstäbe von x- und y-Achse verzerren Winkel und Krümmungen. Eine flache Parabel mit `a = 0,05` wirkt bei stark gestreckter y-Achse optisch spitz.
- **Zu enges Sichtfenster:** Zeigt der Ausschnitt nur den Bereich um den Ursprung, bleiben Scheitelpunkte oder zweite Schnittpunkte verborgen. Bestimmen Sie vorab `d = −b/(2a)` und zentrieren Sie das Plot-Intervall um `d`.
- **Pixelrundung statt exakter Rechnung:** Abgelesene Cursor-Koordinaten unterliegen der Bildschirmauflösung und ersetzen bei Prüfungs- oder Konstruktionsaufgaben keine algebraische Probe.
