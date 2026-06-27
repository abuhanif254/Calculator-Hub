---
title: "Wissenschaftliche Schreibweise einfach gemacht: Formatieren, Umrechnen & Rechnen"
description: "Erfahren Sie, wie Sie Zahlen in wissenschaftlicher Schreibweise lesen und schreiben, arithmetische Operationen durchführen und umrechnen."
category: "Math & Science"
readingTime: 5
lastUpdated: "2026-06-11"
relatedCalculator: "scientific-notation-calculator"
---

## Was ist die wissenschaftliche Schreibweise?

Die **wissenschaftliche Schreibweise** (auch Normdarstellung) ist eine kompakte Möglichkeit, sehr große oder sehr kleine Zahlen auszudrücken — Zahlen, die in dezimaler Standardform unpraktisch lang wären. Sie ist die universelle Sprache der Wissenschaft und Technik.

Eine Zahl in wissenschaftlicher Schreibweise hat die Form:
$$
a \times 10^n
$$
Wobei:
- **a** der **Koeffizient** (Mantisse) ist und **1 ≤ |a| < 10** erfüllen muss
- **n** ein **ganzzahliger Exponent** ist (positiv für große Zahlen, negativ für kleine Zahlen)

## Die Umrechnungsregel

### Große Zahlen umwandeln (Standard → Wissenschaftlich)
Verschieben Sie das Komma nach **links**, bis links davon nur noch eine von Null verschiedene Ziffer übrig ist. Die Anzahl der verschobenen Stellen wird zum positiven Exponenten.

**Beispiel:** 4.700.000
- Komma um 6 Stellen nach links verschieben: 4,7
- Exponent = +6
$$
4.700.000 = 4,7 \times 10^6
$$

### Kleine Zahlen umwandeln (Standard → Wissenschaftlich)
Verschieben Sie das Komma nach **rechts**, bis links davon eine von Null verschiedene Ziffer steht. Die Anzahl der Stellen ist der negative Exponent.

**Beispiel:** 0,000047
- Komma um 5 Stellen nach rechts verschieben: 4,7
- Exponent = −5
$$
0,000047 = 4,7 \times 10^{-5}
$$

## Grundrechenarten

### Multiplikation
Multiplizieren Sie die Koeffizienten und **addieren** Sie dann die Exponenten.
$$
(3,0 \times 10^4) \times (2,5 \times 10^3) = 7,5 \times 10^7
$$

### Division
Dividieren Sie die Koeffizienten und **subtrahieren** Sie dann die Exponenten.
$$
\frac{9,6 \times 10^8}{3,2 \times 10^3} = 3,0 \times 10^5
$$

### Addition und Subtraktion
**Beide Zahlen müssen denselben Exponenten haben**. Passen Sie die Zahl mit dem kleineren Exponenten an, bevor Sie die Operation durchführen.
$$
(5,4 \times 10^6) + (2,0 \times 10^5) = (5,4 + 0,20) \times 10^6 = 5,6 \times 10^6
$$

## Häufig gestellte Fragen

**F: Was ist die E-Notation und wie hängt sie mit der wissenschaftlichen Notation zusammen?**
A: Die E-Notation (wird von Taschenrechnern und Programmiersprachen verwendet) ersetzt "× 10^" durch den Buchstaben E. Zum Beispiel wird $4,7 \times 10^{-5}$ zu `4.7E-5`. Sie sind mathematisch identisch.

**F: Kann der Koeffizient negativ sein?**
A: Ja. Bei negativen Zahlen ist der Koeffizient negativ: $-6,022 \times 10^{23}$ ist zulässig.
