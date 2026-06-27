---
title: "Dreiecksrechner-Ratgeber: Seiten, Winkel & Fläche"
description: "Ein umfassendes Nachschlagewerk zur Lösung jedes Dreiecks mit trigonometrischen Gesetzen, dem Satz des Pythagoras und der heronischen Formel."
category: "Math & Science"
readingTime: 7
lastUpdated: "2026-06-11"
relatedCalculator: "triangle-calculator"
---

## Was ist ein Dreieck?

Ein Dreieck ist ein Polygon mit drei Seiten und drei Winkeln. Die Summe aller Innenwinkel beträgt immer genau **180°**.

Dreiecke werden auf zwei Arten klassifiziert:
- **Nach Winkeln:** Spitzwinklig, Rechtwinklig (= 90°), Stumpfwinklig
- **Nach Seiten:** Gleichseitig, Gleichschenklig, Ungleichseitig

## Der Satz des Pythagoras (Rechtwinklige Dreiecke)

Für ein rechtwinkliges Dreieck mit Katheten **a** und **b** und Hypotenuse **c**:
$$
a^2 + b^2 = c^2
$$

### Trigonometrische Verhältnisse (SOH-CAH-TOA)
$$
\sin\theta = \frac{G}{H}, \quad \cos\theta = \frac{A}{H}, \quad \tan\theta = \frac{G}{A}
$$

## Sinussatz

Gilt für **jedes** Dreieck:
$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$
**Verwendung:** Zwei Winkel und eine Seite (WWS oder WSW) oder zwei Seiten und ein Gegenwinkel (SSW).

## Kosinussatz

Verallgemeinert den Satz des Pythagoras:
$$
c^2 = a^2 + b^2 - 2ab \cdot \cos C
$$
**Verwendung:** Drei Seiten (SSS) oder zwei Seiten und eingeschlossener Winkel (SWS).

## Heronische Formel für die Fläche

Wenn alle drei Seiten bekannt sind (SSS):
$$
s = \frac{a + b + c}{2}
$$
$$
A = \sqrt{s(s-a)(s-b)(s-c)}
$$

## Entscheidungstabelle — Welche Methode?

| Gegebene Informationen | Konfiguration | Methode |
|---|---|---|
| Drei Seiten | SSS | Kosinussatz → Heronische Formel |
| 2 Seiten + Winkel | SWS | Kosinussatz → Sinussatz |
| 2 Winkel + Seite | WWS oder WSW | Sinussatz |
| 2 Seiten + Gegenwinkel | SSW | Sinussatz (ambiguer Fall) |
| Drei Winkel | WWW | Form bestimmt, aber nicht die Größe |

## Häufig gestellte Fragen

**F: Was ist der ambigue Fall (SSW)?**
A: Bei zwei Seiten und einem nicht eingeschlossenen Winkel kann der Sinussatz 0, 1 oder 2 gültige Dreiecke ergeben.

**F: Kann ich den Kosinussatz für rechtwinklige Dreiecke verwenden?**
A: Ja. Wenn C = 90°, ist cos(90°) = 0, und die Formel reduziert sich auf den Satz des Pythagoras.
