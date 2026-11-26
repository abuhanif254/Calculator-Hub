---
title: "Dreiecksrechner-Anleitung für Geometrie & Trigonometrie"
description: "Ein Leitfaden zur Berechnung von Seiten, Winkeln und Flächen von Dreiecken mithilfe des Satzes von Pythagoras, des Sinussatzes und des Kosinussatzes."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "triangle-calculator"
faqs:
  - question: "Warum reichen drei bekannte Winkel (WWW) nicht aus, um ein Dreieck eindeutig zu lösen?"
    answer: "Drei Winkel legen ausschließlich die Form (Ähnlichkeit) eines Dreiecks fest, nicht jedoch seine absolute Größe. Ein gleichseitiges Dreieck mit dreimal 60° kann Kantenlängen von 3 cm oder 300 m besitzen. Um ein Dreieck eindeutig zu bestimmen, benötigen Sie neben der Winkelinformation immer mindestens eine bekannte Seitenlänge."
  - question: "Was ist der mehrdeutige Ssw-Fall und wann existieren zwei Lösungen?"
    answer: "Sind zwei Seiten a und b sowie der Gegenwinkel α der kürzeren Seite (a < b) gegeben, hängt die Lösungsanzahl von der Höhe h = b × sin(α) ab. Ist a < h, existiert kein Dreieck; bei a = h genau ein rechtwinkliges. Liegt h < a < b vor, schneidet der Kreisbogen um C die Grundlinie zweimal – es entstehen ein spitz- und ein stumpfwinkliges Dreieck."
  - question: "Wann sollte man den Kosinussatz dem Sinussatz vorziehen?"
    answer: "Der Kosinussatz ist bei den Fällen SSS und SWS zwingend erforderlich, bietet aber auch bei der Winkelbestimmung einen entscheidenden Vorteil: Da der Kosinus im Bereich von 0° bis 180° eindeutig fällt, unterscheidet cos(γ) zuverlässig zwischen spitzen (< 90°) und stumpfen (> 90°) Winkeln. Der Sinus liefert hingegen für γ und (180° − γ) denselben Wert."
  - question: "Welchen Unterschied macht die Einstellung Gradmaß (DEG) vs. Bogenmaß (RAD)?"
    answer: "Im Bauwesen, in der Vermessung und in der Schule wird meist das Gradmaß mit 360° pro Vollkreis verwendet. Viele Programmiersprachen sowie wissenschaftliche Taschenrechner im Standardmodus erwarten Argumente für sin, cos und tan jedoch im Bogenmaß (2π rad = 360°). Die Umrechnung lautet rad = Grad × π / 180."
  - question: "Welche weiteren Dreiecksgrößen lassen sich aus den drei Seiten direkt berechnen?"
    answer: "Sobald alle drei Seiten a, b, c und die Fläche A bekannt sind, erhalten Sie den Umfang U = a + b + c, die drei Höhen über hₐ = 2A / a, den Inkreisradius über r = A / s (mit s = U / 2) sowie den Umkreisradius über R = (a × b × c) / (4A)."
---

Jedes ebene Dreieck wird durch sechs Größen bestimmt: die drei Seiten `a`, `b`, `c` und ihre gegenüberliegenden Innenwinkel `α` (bei Eckpunkt A), `β` (bei B) und `γ` (bei C). Sobald drei geeignete Angaben – darunter mindestens eine Seitenlänge – vorliegen, lassen sich alle fehlenden Längen, Winkel, Höhen und der Flächeninhalt eindeutig berechnen.

Welches Gesetz greift, hängt vom Dreieckstyp und den gegebenen Stücken ab. Rechtwinklige Dreiecke lösen Sie direkt über den Satz des Pythagoras und elementare Seitenverhältnisse, während **Sinussatz** und **Kosinussatz** beliebige schiefwinklige Dreiecke abdecken.

## Mathematische Grundgesetze und Formeln

Damit aus drei Vorgaben überhaupt ein geometrisch gültiges ebenes Dreieck entsteht, müssen zwei zwingende Bedingungen erfüllt sein:
1. **Innenwinkelsumme:** Die Summe aller drei Innenwinkel beträgt exakt `180°` (`α + β + γ = 180°` beziehungsweise `π rad`).
2. **Dreiecksungleichung:** Jede Seite muss strikt kürzer sein als die Summe der beiden anderen Seiten (`a + b > c`, `a + c > b`, `b + c > a`).

### Rechtwinklige Dreiecke (γ = 90°)
Bilden die Katheten `a` und `b` einen rechten Winkel gegenüber der Hypotenuse `c`, gelten der **Satz des Pythagoras** und die elementaren trigonometrischen Definitionen:

- `a² + b² = c²`
- `sin(α) = a / c` (Gegenkathete / Hypotenuse)
- `cos(α) = b / c` (Ankathete / Hypotenuse)
- `tan(α) = a / b` (Gegenkathete / Ankathete)

### Schiefwinklige Dreiecke: Sinussatz und Kosinussatz
Für allgemeine Dreiecke ohne rechten Winkel bilden zwei Sätze das Fundament:

- **Sinussatz:** Das Verhältnis jeder Seite zum Sinus ihres Gegenwinkels ist konstant und entspricht dem Umkreisdurchmesser `2R`:
  `a / sin(α) = b / sin(β) = c / sin(γ) = 2R`
- **Kosinussatz:** Er erweitert den Satz des Pythagoras um einen Korrekturterm für den eingeschlossenen Winkel:
  `c² = a² + b² − 2ab × cos(γ)`
  Nach dem Winkel umgestellt: `cos(γ) = (a² + b² − c²) / (2ab)`

### Flächenformeln im Überblick
Je nach gegebenen Eingängen wählen Sie die direkteste Flächenberechnung:
- **Grundseite und Höhe:** `A = 0,5 × c × h_c`
- **Zwei Seiten und eingeschlossener Winkel (SWS):** `A = 0,5 × a × b × sin(γ)`
- **Heronische Formel (nur drei Seiten SSS):** Mit dem halben Umfang `s = (a + b + c) / 2` gilt `A = √[ s × (s − a) × (s − b) × (s − c) ]`

## Schritt-für-Schritt-Beispiel: Schiefwinkliges Dreieck (SWS) lösen

Gegeben sei ein Grundstücks- oder Fachwerkdreieck mit den Seiten `a = 8,0 cm`, `b = 11,0 cm` und dem eingeschlossenen Winkel `γ = 60°` (Fall **SWS**).

### 1. Fehlende Seite c über den Kosinussatz berechnen
Setzen Sie `a`, `b` und `cos(60°) = 0,5` in den Kosinussatz ein:

`c² = 8,0² + 11,0² − 2 × 8,0 × 11,0 × cos(60°)`
`c² = 64 + 121 − 176 × 0,5 = 185 − 88 = 97`
`c = √97 ≈ 9,8489 cm` (gerundet `9,85 cm`)

### 2. Winkel α eindeutig über den Kosinussatz bestimmen
Da alle drei Seiten nun bekannt sind, liefert der umgestellte Kosinussatz den kleinsten oder mittleren Winkel ohne Vorzeichen- oder Quadrantenzweifel:

`cos(α) = (b² + c² − a²) / (2 × b × c) = (121 + 97 − 64) / (2 × 11,0 × 9,8489) = 154 / 216,675 = 0,71074`
`α = arccos(0,71074) ≈ 44,70°`

*(Gegenprobe mit dem Sinussatz: `sin(α) = 8,0 × sin(60°) / 9,8489 = 6,9282 / 9,8489 = 0,70345` → `arcsin(0,70345) = 44,70°`.)*

### 3. Dritten Winkel β über die Winkelsumme ableiten
`β = 180° − 60° − 44,70° = 75,30°`

### 4. Umfang und Flächeninhalt berechnen
Der Umfang beträgt `U = 8,0 + 11,0 + 9,85 = 28,85 cm`. Die Fläche berechnen Sie direkt über die SWS-Formel:

`A = 0,5 × 8,0 × 11,0 × sin(60°) = 44 × 0,866025 ≈ 38,11 cm²`

Über den halben Umfang `s = 14,425 cm` folgen daraus auch der Inkreisradius `r = A / s ≈ 2,64 cm` sowie die Höhe auf Seite `c` mit `h_c = 2A / c ≈ 7,74 cm`, wodurch alle geometrischen Kennwerte vollständig bestimmt sind.

## Entscheidungstabelle: Welcher Satz löst welchen Fall?

Die klassische Kongruenzlehre unterscheidet sechs Ausgangssituationen, anhand derer ein Rechner automatisch das passende Lösungsverfahren auswählt:

| Gegebene Stücke | Kürzel | Primäres Lösungsgesetz | Lösbarkeit & Eindeutigkeit | Besonderheit für die Berechnung |
|---|---|---|---|---|
| Drei Seiten (`a, b, c`) | `SSS` | Kosinussatz | Eindeutig, sofern Dreiecksungleichung gilt | Immer mit dem größten Winkel (gegenüber der längsten Seite) beginnen |
| Zwei Seiten + eingeschl. Winkel (`a, b, γ`) | `SWS` | Kosinussatz | Immer eindeutig für `0° < γ < 180°` | Fläche sofort per `0,5 × a × b × sin(γ)` bestimmbar |
| Eine Seite + zwei anliegende Winkel (`c, α, β`) | `WSW` | Winkelsumme + Sinussatz | Eindeutig, falls `α + β < 180°` | Dritten Winkel vorab über `180° − (α + β)` ergänzen |
| Eine Seite + anl. & gegenüberl. Winkel (`a, α, β`) | `WWS` | Winkelsumme + Sinussatz | Eindeutig, falls `α + β < 180°` | Führt rechnerisch identisch auf WSW zurück |
| Zwei Seiten + Gegenwinkel der längeren (`a, b, α; a ≥ b`) | `SsW` | Sinussatz | Immer eindeutig | Der zweite Winkel `β` ist zwingend spitz (`< 90°`) |
| Zwei Seiten + Gegenwinkel der kürzeren (`a, b, α; a < b`) | `Ssw` | Sinussatz mit Fallunterscheidung | `0`, `1` oder `2` gültige Dreiecke | Vergleich von `a` mit der Höhe `h = b × sin(α)` nötig |

## Praxisnutzen, Winkelsysteme und typische Fehlerquellen

In der Praxis begegnet Ihnen die Dreiecksberechnung in der **Geodäsie** (Triangulation), in der **Dachkonstruktion** (Sparrenlängen aus Dachneigung und Hausbreite) sowie in der **Mechanik** bei der Kräftezerlegung (`F_x = F × cos(α)`).

Vermeiden Sie dabei drei häufige Fehlerquellen:
1. **Gradmaß (DEG) vs. Bogenmaß (RAD):** Die Verwechslung des Winkelmodus verfälscht jedes Ergebnis: `sin(30°)` ergibt `0,5`, während `sin(30 rad)` den Wert `−0,988` liefert.
2. **Stumpfe Winkel beim Sinussatz übersehen:** Da `sin(β) = sin(180° − β)` gilt, liefert `arcsin` stets nur den spitzen Winkel. Berechnen Sie den größten Winkel deshalb per Kosinussatz oder beginnen Sie mit dem kleinsten Winkel.
3. **Auslöschung bei flachen Dreiecken:** Bei extrem spitzen Dreiecken (`a = 1.000`, `b = 500`, `c = 500,001`) verliert die Heronische Formel durch Subtraktion fast gleicher Zahlen an Präzision. Rechnen Sie mit vollen Zwischenwerten und prüfen Sie Resultate im Dreiecksrechner auf Konsistenz.
