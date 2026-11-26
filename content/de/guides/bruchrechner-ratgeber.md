---
title: "Der ultimative Bruch-Leitfaden: Addieren, Subtrahieren, Multiplizieren & Dividieren"
description: "Meistern Sie die Regeln von Brüchen. Erfahren Sie, wie Sie gemeinsame Nenner finden, Brüche vereinfachen und unseren Bruchrechner verwenden."
category: "Math & Science"
relatedCalculator: "fraction-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum muss bei der Addition und Subtraktion von Brüchen ein gemeinsamer Nenner gefunden werden?"
    answer: "Der Nenner gibt an, in wie viele gleich große Stücke ein Ganzes geteilt wurde. Nur wenn beide Brüche denselben Nenner besitzen, beziehen sich ihre Zähler auf identische Größenanteile und dürfen direkt addiert oder subtrahiert werden. Bei ungleichen Nennern wie 1/2 und 1/3 müssen die Brüche zuerst auf das kleinste gemeinsame Vielfache (hier Sechstel) erweitert werden."
  - question: "Worin liegt der Unterschied zwischen dem kleinsten gemeinsamen Vielfachen (kgV) und dem größten gemeinsamen Teiler (ggT)?"
    answer: "Das kgV der Nenner wird benötigt, um ungleichnamige Brüche für Addition, Subtraktion oder Größenvergleiche auf den kleinstmöglichen Hauptnenner zu erweitern. Der ggT von Zähler und Nenner hingegen dient dazu, einen Bruch nach der Rechnung vollständig zu kürzen, ohne seinen mathematischen Wert zu verändern."
  - question: "Wie rechnet man eine gemischte Zahl in einen unechten Bruch um?"
    answer: "Multiplizieren Sie die ganze Zahl mit dem Nenner und addieren Sie anschließend den bisherigen Zähler – dieser Wert bildet den neuen Zähler, während der Nenner unverändert bleibt. Aus 3 2/5 wird beispielsweise (3 × 5 + 2) / 5 = 17/5. Vor jeder Multiplikation oder Division sollten gemischte Zahlen zwingend auf diese Weise umgewandelt werden."
  - question: "Warum funktioniert bei der Division von Brüchen die Multiplikation mit dem Kehrwert?"
    answer: "Eine Division fragt danach, wie oft der Divisor in den Dividenden passt. Durch einen Bruch c/d zu teilen ist mathematisch äquivalent zur Multiplikation mit seinem multiplikativen Inversen d/c, weil (c/d) × (d/c) = 1 ergibt. Da der Nenner eines Kehrwerts nicht null sein darf, bleibt jede Division durch einen Bruch mit Zähler 0 undefiniert."
  - question: "Wann sollte man exakt mit Brüchen rechnen statt Dezimalzahlen zu verwenden?"
    answer: "Immer dann, wenn Nenner Primfaktoren enthalten, die weder 2 noch 5 sind – etwa Drittel, Sechstel, Siebtel oder Zwölftel –, entstehen unendliche periodische Dezimalzahlen wie 0,3333…. Sobald Zwischenwerte gerundet werden, schleichen sich Rundungsfehler ein. Brüche bewahren bei exakten Kalkulationen, technischen Konstruktionen und Quotenaufteilungen die vollständige Präzision bis zum Endergebnis."
---

Ein gewöhnlicher Bruch stellt eine rationale Zahl als Verhältnis zweier ganzer Zahlen dar: Der **Zähler** oberhalb des Bruchstrichs gibt an, wie viele Anteile vorhanden sind, während der **Nenner** unterhalb festlegt, in wie viele gleich große Teile das Ganze zerlegt wurde (wobei stets `Nenner ≠ 0` gilt). Bei der Addition und Subtraktion müssen beide Brüche denselben Nenner besitzen, sodass lediglich die Zähler verrechnet werden. Bei der Multiplikation werden Zähler mit Zähler sowie Nenner mit Nenner direkt multipliziert; die Division erfolgt durch Multiplikation mit dem Kehrwert des zweiten Bruchs.

Wer regelmäßig mit Anteilen, Mischungsverhältnissen oder gemischten Zahlen arbeitet, profitiert von einer systematischen Vorgehensweise über das kleinste gemeinsame Vielfache (`kgV`) zum Erweitern und den größten gemeinsamen Teiler (`ggT`) zum Kürzen. Unser [Bruchrechner](/de/rechner/bruchrechner) übernimmt genau diese Schritte automatisch, verarbeitet sowohl echte Brüche als auch gemischte Zahlen und liefert neben dem vollständig gekürzten Ergebnis auf Wunsch auch den zugehörigen Dezimalwert.

## Grundlagen der Bruchrechnung und Brucharten

Der Bruchstrich entspricht mathematisch dem Divisionszeichen (`a/b = a ÷ b`). Je nach Verhältnis von Zähler und Nenner unterscheidet die Arithmetik vier Grundformen:

- **Echter Bruch:** Der Betrag des Zählers ist kleiner als der des Nenners (`|a| < |b|`, z. B. `3/8`). Sein Wert liegt stets zwischen `-1` und `1`.
- **Unechter Bruch:** Der Betrag des Zählers ist mindestens so groß wie der des Nenners (`|a| ≥ |b|`, z. B. `11/4`).
- **Gemischte Zahl:** Kombination aus ganzer Zahl und echtem Bruch (`2 3/4`). Vor Multiplikation und Division wird sie umgewandelt: `G a/b = (G×b + a)/b`.
- **Scheinbruch:** Der Zähler ist ein ganzzahliges Vielfaches des Nenners (`12/3 = 4`).

Beim **Erweitern** multiplizieren Sie Zähler und Nenner mit derselben Zahl `k ≠ 0`, beim **Kürzen** dividieren Sie beide durch einen gemeinsamen Teiler. Vollständig gekürzt ist ein Bruch, wenn `ggT(|a|, |b|) = 1` gilt.

## Die vier Grundrechenarten mit exakten Formeln

Für zwei Brüche `a/b` und `c/d` (`b ≠ 0`, `d ≠ 0`) gelten eindeutige Rechenregeln:

```text
Addition:       a/b + c/d = (a×d + c×b) / (b×d)
Subtraktion:    a/b − c/d = (a×d − c×b) / (b×d)
Multiplikation: a/b × c/d = (a×c) / (b×d)
Division:       a/b ÷ c/d = (a×d) / (b×c)   [mit c ≠ 0]
```

Statt blind mit `b×d` zu rechnen, bestimmen Sie bei Addition und Subtraktion effizienter den **Hauptnenner** über `H = kgV(b, d)` und erweitern beide Brüche gezielt auf `H`. Bei Multiplikation und Division (nach Bildung des Kehrwerts) kürzen Sie gemeinsame Faktoren zwischen Zählern und Nennern idealerweise bereits **überkreuz** vor dem Ausmultiplizieren.

## Schritt-für-Schritt-Rechenbeispiele aus der Praxis

### Beispiel 1: Gemischte Zahlen addieren (`2 3/4 + 1 5/6`)

1. **Umwandeln:** `2 3/4 = (2×4 + 3)/4 = 11/4` und `1 5/6 = (1×6 + 5)/6 = 11/6`.
2. **Hauptnenner:** Die Vielfachen von `4` und `6` treffen sich bei `kgV(4, 6) = 12`.
3. **Erweitern:** `11/4` mit `3` ergibt `33/12`; `11/6` mit `2` ergibt `22/12`.
4. **Addieren und umformen:** `(33 + 22)/12 = 55/12`. Da `ggT(55, 12) = 1` gilt, ist der Bruch vollständig gekürzt; als gemischte Zahl ergibt sich `4 7/12` (dezimal `4,5833…`).

### Beispiel 2: Brüche dividieren mit Kehrwert (`9/14 ÷ 15/28`)

1. **Kehrwert bilden:** Aus `÷ 15/28` wird die Multiplikation `(9/14) × (28/15)`.
2. **Überkreuzkürzen:** `9` und `15` durch `3` kürzen (`3` und `5`); `28` und `14` durch `14` kürzen (`2` und `1`).
3. **Ausmultiplizieren:** `(3×2) / (1×5) = 6/5 = 1 1/5` (exakt `1,2`).

## Übersicht der Verfahren und Umrechnungen

Die folgende Tabelle fasst sämtliche Kernregeln anhand geprüfter Zahlenbeispiele kompakt zusammen:

| Operation | Allgemeine Regel | Hauptnenner? | Zahlenbeispiel | Ergebnis |
| :--- | :--- | :--- | :--- | :--- |
| Addition | `(a×k₁ + c×k₂) / kgV(b, d)` | Ja (`kgV`) | `1/4 + 2/3 = 3/12 + 8/12` | `11/12` |
| Subtraktion | `(a×k₁ − c×k₂) / kgV(b, d)` | Ja (`kgV`) | `5/6 − 3/8 = 20/24 − 9/24` | `11/24` |
| Multiplikation | `(a×c) / (b×d)` | Nein | `4/9 × 3/10` | `2/15` |
| Division | `(a×d) / (b×c)` (`c ≠ 0`) | Nein | `5/8 ÷ 15/16 = 5/8 × 16/15` | `2/3` |
| Umwandlung | `G a/b = (G×b + a)/b` | Nein | `4 2/7 = (4×7 + 2)/7` | `30/7` |
| Kürzen (`ggT`) | `(a÷ggT) / (b÷ggT)` | Nein | `36/48` (`ggT = 12`) | `3/4` |

## Anwendungsfälle, häufige Fehlerquellen und Präzisionshinweise

In der Praxis begegnet Ihnen exakte Bruchrechnung weit über den Mathematikunterricht hinaus: im **Handwerk und Maschinenbau** bei Steigungen, Übersetzungsverhältnissen von Zahnrädern oder metrischen Mischungen (`3/4` Teil Bindemittel auf `1/4` Teil Zusatz), in der **Gastronomie** beim Skalieren von Rezepturen sowie im **Immobilien- und Erbrecht**, wenn etwa Wohnungseigentum nach `145/10.000` Miteigentumsanteilen oder Nachlässe nach gesetzlichen Erbquoten (`1/2`, `1/4`, `1/6`) aufgeteilt werden.

Achten Sie dabei auf vier typische Fehlerquellen:

1. **Getrennte Addition von Zähler und Nenner:** `1/2 + 1/3` ergibt niemals `2/5`, sondern `5/6`. Der Nenner darf beim Addieren und Subtrahieren niemals mitaddiert werden.
2. **Vorzeichenfehler bei gemischten Zahlen:** Bei `-2 1/3` bezieht sich das Minuszeichen auf die gesamte Zahl (`-(2 + 1/3) = -7/3`), nicht nur auf die `2` (`-2 + 1/3 = -5/3` wäre falsch).
3. **Verdeckte Division durch null:** In algebraischen Aufgaben oder bei Kehrwerten muss sichergestellt sein, dass der Zähler des Divisors ungleich `0` ist.
4. **Vorzeitiges Runden in Dezimalzahlen:** Wer `1/3` frühzeitig durch `0,33` ersetzt und anschließend mit `3` multipliziert, erhält `0,99` statt `1,00` – ein Abweichungsfehler von `1 %`. Behalten Sie Brüche bei mehrstufigen Kalkulationen daher bis zum letzten Rechenschritt bei oder nutzen Sie den [Bruchrechner](/de/rechner/bruchrechner) für eine verlustfreie Berechnung.
