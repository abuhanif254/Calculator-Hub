---
title: "Die Physik der Arbeit: Kraft und Weg"
description: "Verstehen Sie die physikalische Definition von Arbeit (W = F × s × cos α), warum statischer Kraftaufwand keine Arbeit verrichtet und wie Sie mechanische Arbeit mit unserem Arbeit-Rechner präzise bestimmen."
category: "Math & Science"
relatedCalculator: "work-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum verrichtet das Drücken gegen eine unbewegliche Wand physikalisch keine Arbeit?"
    answer: "Mechanische Arbeit entsteht erst dann, wenn eine Kraft eine messbare Wegstrecke in Kraftrichtung überwindet (W = F × s × cos α). Bleibt der Weg s gleich null, ergibt das Produkt unabhängig von der aufgewendeten Kraft exakt 0 Joule. Die empfundene Ermüdung stammt aus biochemischen Prozessen in den Muskelfasern, die chemische Energie in Wärme umwandeln."
  - question: "Welche Einheit wird im Internationalen Einheitensystem (SI) für Arbeit verwendet?"
    answer: "Die SI-Einheit der Arbeit ist das Joule (J), benannt nach James Prescott Joule. Ein Joule entspricht der Arbeit, die verrichtet wird, wenn eine Kraft von einem Newton (1 N) ein Objekt um einen Meter (1 m) in Kraftrichtung bewegt: 1 J = 1 N·m = 1 kg·m²/s². Größere Energiemengen werden häufig in Kilojoule (1 kJ = 1.000 J) oder Kilowattstunden (1 kWh = 3,6 MJ) angegeben."
  - question: "Kann physikalische Arbeit auch einen negativen Wert annehmen?"
    answer: "Ja. Sobald Kraft- und Bewegungsrichtung einander entgegengesetzt sind – etwa beim Abbremsen eines Fahrzeugs durch Reibung oder beim kontrollierten Absenken einer Last –, liegt der Winkel α zwischen 90° und 180°. Da der Kosinus in diesem Bereich negativ ist (cos 180° = −1), wird negative Arbeit verrichtet: Dem Körper wird mechanische Energie entzogen."
  - question: "Wie berechne ich die Hubarbeit, wenn nur die Masse eines Körpers bekannt ist?"
    answer: "Multiplizieren Sie zunächst die Masse m (in Kilogramm) mit der örtlichen Fallbeschleunigung g (im DACH-Raum rund 9,81 m/s²), um die Gewichtskraft F = m × g in Newton zu erhalten. Anschließend multiplizieren Sie diese Kraft mit der Hubhöhe h in Metern: W_Hub = m × g × h."
  - question: "Welchen Unterschied gibt es zwischen der deutschen Formel W = F × s und der englischen Schreibweise W = F × d?"
    answer: "Beide Formeln beschreiben exakt denselben physikalischen Zusammenhang. Im deutschsprachigen Raum steht nach DIN 1304 und ISO 80000-3 der Buchstabe s für die zurückgelegte Wegstrecke und α für den Winkel zwischen Kraft- und Wegvektor. In englischsprachigen Lehrbüchern und internationalen Rechnern wird stattdessen d (distance) und θ verwendet."
---

In der klassischen Mechanik bezeichnet **Arbeit** (Formelzeichen *W* für englisch *work*) die Übertragung von Energie auf einen Körper durch eine entlang einer Wegstrecke wirkende Kraft. Damit im physikalischen Sinne Arbeit verrichtet wird, müssen zwei Bedingungen gleichzeitig erfüllt sein: Eine Kraft `F` wirkt auf das Objekt, und das Objekt verschiebt sich um eine Strecke `s` mit einer Bewegungskomponente in Kraftrichtung. Drücken Sie gegen eine massive Ziegelwand, wandelt Ihr Körper zwar chemische Energie in Muskelwärme um – da sich die Wand nicht bewegt (`s = 0 m`), beträgt die mechanische Arbeit exakt `0 J`.

Mathematisch wird Arbeit als Skalarprodukt definiert: `W = F × s × cos(α)`. Die Basiseinheit ist das Joule (`1 J = 1 N·m`), identisch mit der Dimension der Energie. Für präzise Berechnungen beliebiger Kraft-, Weg- und Winkelkombinationen nutzen Sie unseren interaktiven [Arbeit-Rechner](/de/rechner/arbeit-rechner).

## Physikalische Grundlagen, Formeln und Einheiten

### Die Grundgleichung und ihre Parameter

Wirkt eine konstante Kraft `F` unter dem Winkel `α` zur geradlinigen Bewegung, gilt nach DIN 1301 und ISO 80000-4 (international oft mit `d` für Weg und `θ` für Winkel notiert):

```text
W = F × s × cos(α)
```

- **W (Arbeit):** Ergebnisgröße in Joule (`J`), mit `1 J = 1 N·m = 1 W·s = 1 kg·m²/s²`.
- **F (Kraft):** Betrag der Kraft in Newton (`N`), mit `1 N = 1 kg·m/s²`.
- **s (Weg):** Zurückgelegte Verschiebung des Angriffspunkts in Metern (`m`).
- **α (Kraftwinkel):** Winkel zwischen Kraftvektor und Bewegungsrichtung in Grad (`°`).

### Positive, negative und verschwindende Arbeit

Obwohl Kraft und Weg Vektoren sind, ist Arbeit ein Skalar mit Vorzeichen. Der Faktor `cos(α)` entscheidet über den Energiefluss:

- **α = 0° (`cos 0° = +1`):** Kraft und Weg sind gleichgerichtet. Dem System wird maximale Energie zugeführt.
- **0° < α < 90°:** Nur die Parallelkomponente `F × cos(α)` verrichtet Arbeit; die senkrechte Komponente belastet lediglich die Unterlage.
- **α = 90° (`cos 90° = 0`):** Kraft und Bewegung stehen senkrecht aufeinander (`W = 0 J`), etwa beim ebenen Tragen eines Koffers gegen die senkrechte Schwerkraft.
- **90° < α ≤ 180° (`cos 180° = −1`):** Die Kraft bremst die Bewegung und leistet **negative Arbeit**, beispielsweise durch Reibung.

### Spezielle Formen mechanischer Arbeit

Für wiederkehrende Ingenieursaufgaben existieren spezialisierte Gleichungen: **Hubarbeit** (`W_Hub = m × g × h` mit der mittleren Erdbeschleunigung `g ≈ 9,81 m/s²`), **Beschleunigungsarbeit** (`W_B = 0,5 × m × (v₂² − v₁²)`) sowie **Spannarbeit** einer linearen Feder (`W_Spann = 0,5 × D × s²`). Bei der Federarbeit resultiert der Faktor `0,5` aus der entlang des Federwegs linear ansteigenden Rückstellkraft `F(s) = D × s`. Auch bei der **Reibungsarbeit** (`W_R = μ × F_N × s`) fließt die Normalkraft mit dem Gleitreibungsbeiwert `μ` direkt in die Berechnung ein, wobei die gesamte mechanische Energie als Wärme an die Kontaktflächen abgegeben wird. In geschlossenen mechanischen Systemen ohne Reibungsverluste bleibt nach dem Energieerhaltungssatz die Summe aus verrichteter Arbeit und gespeicherter potenzieller beziehungsweise kinetischer Energie jederzeit konstant.

## Schritt-für-Schritt-Beispiel: Schräg gezogene Transportkiste

Ein Logistikmitarbeiter zieht eine `40 kg` schwere Transportkiste über den ebenen Betonboden einer Lagerhalle exakt `s = 15 m` weit. Das Zugseil ist unter einem konstanten Winkel von `α = 30°` nach oben geneigt, und die am Kraftmesser abgelesene Zugkraft beträgt durchgängig `F = 120 N`. Gesucht sind sowohl die effektiv geleistete horizontale Zugarbeit als auch der Vergleichswert für das anschließende senkrechte Anheben derselben Kiste um `h = 2,0 m` auf eine Werkbank.

1. **Horizontale Kraftkomponente berechnen:** Mit `cos(30°) ≈ 0,8660` wirkt lediglich folgender Anteil tatsächlich in Bewegungsrichtung nach vorn:
   `F_eff = 120 N × 0,8660 = 103,92 N`
   Die verbleibende Vertikalkomponente `F_vert = 120 N × sin(30°) = 60,0 N` hebt die Kiste leicht an, verringert die Reibung am Boden, leistet jedoch keine Arbeit entlang der horizontalen Wegstrecke.
2. **Zugarbeit bestimmen:** Die Multiplikation der wirksamen Kraftkomponente mit `s = 15 m` ergibt:
   `W_Zug = 103,92 N × 15 m = 1.558,8 J ≈ 1,56 kJ`
3. **Vertikale Hubarbeit zum Vergleich:** Für das direkte Anheben beträgt die Gewichtskraft `F_G = 40 kg × 9,81 m/s² = 392,4 N`. Bei `h = 2,0 m` (`α = 0°`) folgt:
   `W_Hub = 392,4 N × 2,0 m = 784,8 J ≈ 0,78 kJ`
4. **Gegenprüfung:** Mit `F = 120 N`, `s = 15 m` und `α = 30°` liefert der [Arbeit-Rechner](/de/rechner/arbeit-rechner) sofort den exakten Wert von `1.558,85 J`.

## Vergleichstabelle: Typische Arbeitswerte in Physik und Technik

| Vorgang / Szenario | Wirkende Kraft (F) | Weg (s) & Winkel (α) | Verrichtete Arbeit (W) | Einordnung |
| --- | --- | --- | --- | --- |
| Heben einer 1-l-Wasserflasche | `9,81 N` | `1,0 m` (`α = 0°`) | `9,81 J` | Anschaulicher Richtwert für rund 10 J |
| Bergwanderung (75 kg, 500 m Höhe) | `735,75 N` | `500 m` (`α = 0°`) | `367.875 J` (`367,9 kJ`) | Entspricht `0,102 kWh` Hubarbeit |
| Spannen Industriefeder (`D = 2.000 N/m`) | `0` bis `300 N` | `0,15 m` (`α = 0°`) | `22,5 J` | Faktor `0,5` durch lineare Kraftzunahme |
| Pkw-Bremsung (`1.500 kg`, `50 km/h` auf `0`) | `5.787 N` (Mittel) | `25 m` (`α = 180°`) | `−144.676 J` (`−144,7 kJ`) | Kinetische Energie wird zu Bremswärme |
| Statisches Halten einer 20-kg-Hantel | `196,2 N` | `0,0 m` | `0,0 J` | Keine mechanische Arbeit am Objekt |
| Satellit auf kreisförmiger Umlaufbahn | Gravitation | Bahnkurve (`α = 90°`) | `0,0 J` | Zentralkraft steht senkrecht zur Bahn |

## Anwendungsbereiche, typische Rechenfehler und Normhinweise

Arbeitsberechnungen steuern die Auslegung von Krananlagen, Förderbändern, hydraulischen Pressen und Rekuperationssystemen. Vermeiden Sie dabei folgende vier Fehlerquellen:

- **Masse statt Gewichtskraft einsetzen:** Kilogramm (`kg`) bezeichnen eine Masse. Bei Hubvorgängen muss vor `W = F × s` stets mit `9,81 m/s²` multipliziert werden.
- **Gradmaß und Bogenmaß verwechseln:** Steht ein Rechner auf `RAD` statt `DEG`, liefert `cos(30)` einen falschen Wert (`0,154` statt `0,866`).
- **Variable Kräfte vereinfachen:** Bei nicht-konstanten Kräften (Luftwiderstand, Gasexpansion) ist `W = F × s` unzulässig; erforderlich ist das Wegintegral `W = ∫ F(s) ds`.
- **Einheiten mischen:** Kilonewton (`kN`), Zentimeter (`cm`) oder `kWh` (`1 kWh = 3,6 MJ`) müssen konsequent in `N`, `m` und `J` umgerechnet werden. Zudem darf physiologische Muskelermüdung beim statischen Halten nicht mit physikalischer Arbeit gleichgesetzt werden.
