---
title: "Wahrscheinlichkeitsrechner"
metaTitle: "Wahrscheinlichkeitsrechner | Bayes, Quoten & Ereignisse"
description: "Berechnen Sie Einzel- und Mehrfachereignisse, Vereinigungen, Schnittmengen, bedingte Wahrscheinlichkeiten, den Satz von Bayes, Binomialwahrscheinlichkeiten, Erwartungswerte und Quoten inklusive Münz- und Würfelsimulation."
metaDescription: "Kostenloser Wahrscheinlichkeitsrechner: Berechnen Sie bedingte Wahrscheinlichkeiten, Satz von Bayes, Erwartungswert, Quoten und Simulationen."
metaKeywords: "wahrscheinlichkeitsrechner, wahrscheinlichkeit berechnen, satz von bayes, bedingte wahrscheinlichkeit, erwartungswert rechner, binomialverteilung, quoten umrechnen, stochastik"
faqs:
  - question: "Worin unterscheiden sich stochastisch unabhängige und disjunkte (unvereinbare) Ereignisse?"
    answer: "Unabhängige Ereignisse beeinflussen einander nicht, sodass P(A ∩ B) = P(A) × P(B) gilt – etwa zwei aufeinanderfolgende Würfelwürfe. Disjunkte Ereignisse schließen sich gegenseitig aus, sodass P(A ∩ B) = 0 ist – etwa gleichzeitig eine 2 und eine 5 mit einem Würfel zu werfen. Zwei Ereignisse mit positiver Wahrscheinlichkeit können daher niemals zugleich unabhängig und disjunkt sein."
  - question: "Wann multipliziert man Wahrscheinlichkeiten und wann addiert man sie?"
    answer: "Für die Schnittmenge (Ereignis A UND Ereignis B treten beide ein) gilt die Multiplikationsregel: P(A) × P(B) bei Unabhängigkeit beziehungsweise P(A) × P(B | A) bei Abhängigkeit. Für die Vereinigung (mindestens A ODER B tritt ein) gilt der allgemeine Additionssatz P(A ∪ B) = P(A) + P(B) − P(A ∩ B), damit gemeinsame Ergebnisse nicht doppelt gezählt werden."
  - question: "Wie aktualisiert der Satz von Bayes eine Wahrscheinlichkeit anhand neuer Befunde?"
    answer: "Der Satz von Bayes verknüpft die anfängliche Basisrate P(A) mit der bedingten Testgüte P(B | A) und teilt das Produkt durch die Gesamtwahrscheinlichkeit P(B) des beobachteten Signals. So berechnet er die wahre Trefferwahrscheinlichkeit nach einem positiven Test und verhindert den verbreiteten Basisraten-Trugschluss."
  - question: "Wie rechnet man Wahrscheinlichkeiten in Quoten (Chancenverhältnis) um und zurück?"
    answer: "Die Wahrscheinlichkeit p setzt günstige Fälle ins Verhältnis zu allen möglichen Fällen, während das Chancenverhältnis günstige gegen ungünstige Fälle stellt: Chance = p / (1 − p). Umgekehrt entspricht ein Chancenverhältnis von a : b der Wahrscheinlichkeit p = a / (a + b), und eine europäische Dezimalquote q impliziert p = 1 / q."
  - question: "Was beschreibt das Gesetz der großen Zahlen bei Münz- und Würfelsimulationen?"
    answer: "Das Gesetz der großen Zahlen besagt, dass sich die beobachtete relative Häufigkeit eines Ereignisses bei steigender Anzahl unabhängiger Wiederholungen immer enger an die theoretische Wahrscheinlichkeit annähert. Kurzfristige Serien wie fünfmal Zahl in Folge bleiben dabei völlig normal und erzwingen keinen Ausgleich im nächsten Wurf."
---

Die **Wahrscheinlichkeitsrechnung** (Stochastik) quantifiziert Unsicherheit auf einer exakten Skala von `0` (unmögliches Ereignis) bis `1` beziehungsweise `100 %` (sicheres Ereignis). Grundlage bilden die drei **Kolmogorow-Axiome**: Nichtnegativität (`P(E) ≥ 0`), Normierung des gesamten Ergebnisraums (`P(Ω) = 1`) und Additivität disjunkter Ereignisse. Versicherungsmathematik, medizinische Diagnostik, industrielle Qualitätsprüfung und finanzwirtschaftliches Risikomanagement stützen sich unmittelbar auf dieses mathematische Regelwerk.

Da menschliche Intuition bei kombinierten Risiken, mehrstufigen Zufallsexperimenten und niedrigen Basisraten häufig trügt, liefert unser **Wahrscheinlichkeitsrechner** exakte Resultate für Einzel- und Mehrfachereignisse, Vereinigungen (`A ∪ B`), Schnittmengen (`A ∩ B`), Gegenereignisse (`Ā`), **bedingte Wahrscheinlichkeiten**, den **Satz von Bayes**, **Binomialverteilung**, **Erwartungswert**, **Quoten** sowie interaktive **Münz- und Würfelsimulationen**.

## Zentrale Formeln der Wahrscheinlichkeitsrechnung

```text
Laplace & Gegenereignis:   P(A) = |A| / |Ω|                  |  P(Ā) = 1 − P(A)
Multiplikationssatz:       P(A ∩ B) = P(A) × P(B)            (unabhängig)
                           P(A ∩ B) = P(A) × P(B ∣ A)        (abhängig)
Addition & Entweder-Oder:  P(A ∪ B) = P(A) + P(B) − P(A ∩ B) |  P(A △ B) = P(A) + P(B) − 2×P(A ∩ B)
Satz von Bayes:            P(A ∣ B) = [ P(B ∣ A) × P(A) ] / [ P(B ∣ A)×P(A) + P(B ∣ Ā)×P(Ā) ]
Binomialverteilung:        P(X = k) = (n über k) × p^k × (1 − p)^(n − k)
Erwartungswert & Quoten:   E(X) = ∑ x_i × P(X = x_i)         |  Chance = p / (1 − p),  p = a / (a + b)
```

### Variablendefinitionen

- **Ω** und **|A|**: Vollständige Ergebnismenge sämtlicher möglicher Ausgänge sowie Anzahl der für `A` günstigen Elementarereignisse.
- **P(A ∩ B)** und **P(A ∪ B)**: Schnittwahrscheinlichkeit (beide Ereignisse treten ein) und Vereinigung (mindestens eines tritt ein).
- **P(A)** und **P(Ā)**: A-priori-Wahrscheinlichkeit (Basisrate) von `A` sowie die Wahrscheinlichkeit des Gegenereignisses.
- **P(B ∣ A)** und **P(A ∣ B)**: Bedingte Wahrscheinlichkeit des Signals `B` bei gegebenem `A` sowie aktualisierte A-posteriori-Wahrscheinlichkeit nach Kenntnis von `B`.
- **(n über k)**: Binomialkoeffizient `n! / [k! × (n − k)!]` für `k` Treffer in `n` unabhängigen Bernoulli-Versuchen mit Erfolgswahrscheinlichkeit `p`.
- **E(X)**: Erwartungswert einer diskreten Zufallsvariable `X` als wahrscheinlichkeitsgewichteter Durchschnitt aller Werte `x_i` (etwa in EUR).

## Schritt-für-Schritt-Rechenbeispiele

### Beispiel 1: Zwei unabhängige Sicherheitssensoren

In einer Fertigungsanlage überwachen zwei stochastisch unabhängige Sensoren dieselbe Temperaturgrenze. Sensor `A` meldet eine Störung mit `P(A) = 0,40` (`40 %`), Sensor `B` unabhängig davon mit `P(B) = 0,25` (`25 %`).

1. **Beide Sensoren lösen aus (`A ∩ B`):** `0,40 × 0,25 = 0,10` (**`10,0 %`**).
2. **Mindestens ein Sensor löst aus (`A ∪ B`):** `0,40 + 0,25 − 0,10 = 0,55` (**`55,0 %`**).
3. **Genau ein Sensor löst aus (`A △ B`):** `0,40 + 0,25 − 2 × 0,10 = 0,45` (**`45,0 %`**).
4. **Kein Sensor löst aus (`Ā ∩ B̄`):** `1 − 0,55 = 0,45` (**`45,0 %`**), direkt bestätigt über `0,60 × 0,75 = 0,45`.

### Beispiel 2: Satz von Bayes in der optischen Qualitätsprüfung

In einer Halbleiterfertigung besitzen `1 %` der Mikrochips einen Haarriss (`P(D) = 0,01`; fehlerfrei `P(D̄) = 0,99`). Ein Prüfscanner erkennt Defekte mit `95 %` Sensitivität (`P(+ ∣ D) = 0,95`) und `90 %` Spezifität, also `10 %` Falsch-Positiv-Rate (`P(+ ∣ D̄) = 0,10`). Wie wahrscheinlich ist ein echter Defekt bei Alarm (`P(D ∣ +)`)?

1. **Richtig-positiv:** `0,95 × 0,01 = 0,0095` (`0,95 %` aller Chips).
2. **Falsch-positiv:** `0,10 × 0,99 = 0,0990` (`9,90 %` aller Chips).
3. **Gesamtwahrscheinlichkeit eines Alarms (`P(+)`):** Nach dem Gesetz der totalen Wahrscheinlichkeit `0,0095 + 0,0990 = 0,1085` (`10,85 %`).
4. **A-posteriori-Wahrscheinlichkeit:** `P(D ∣ +) = 0,0095 / 0,1085 ≈ 0,08756` → **`8,76 %`**.

Trotz `95 %` Sensitivität sind über `91 %` der aussortierten Chips intakt, weil `10 %` Fehlalarme auf `99 %` fehlerfreie Teile treffen. Das zugehörige Chancenverhältnis für einen echten Defekt bei Alarm beträgt `0,08756 / 0,91244 ≈ 1 : 10,4`.

## Referenztabelle: Wichtige Ereignisverknüpfungen

| Verknüpfung | Notation | Formel | Bedingung | Alltagsbedeutung |
| :--- | :--- | :--- | :--- | :--- |
| **Gegenereignis** | `P(Ā)` | `1 − P(A)` | Vollständiger Raum `Ω` | `A` tritt **nicht** ein |
| **Unabhängige Schnittmenge** | `P(A ∩ B)` | `P(A) × P(B)` | `P(B ∣ A) = P(B)` | **Beide** treten unabhängig ein |
| **Abhängige Schnittmenge** | `P(A ∩ B)` | `P(A) × P(B ∣ A)` | `B` hängt von `A` ab | **Beide** treten nacheinander ein |
| **Disjunkte Vereinigung** | `P(A ∪ B)` | `P(A) + P(B)` | `P(A ∩ B) = 0` | **Entweder** `A` oder `B` |
| **Allgemeine Vereinigung** | `P(A ∪ B)` | `P(A) + P(B) − P(A ∩ B)` | Überlappung möglich | **Mindestens eines** tritt ein |
| **Symmetrische Differenz** | `P(A △ B)` | `P(A) + P(B) − 2×P(A ∩ B)` | Entweder-Oder | **Genau eines** tritt ein |
| **Keines der Ereignisse** | `P(Ā ∩ B̄)` | `1 − P(A ∪ B)` | Regel von De Morgan | **Weder** `A` noch `B` |
| **Mindestens 1 Treffer (`n`-fach)** | `P(X ≥ 1)` | `1 − (1 − p)^n` | `n` unabhängige Versuche | Ereignis tritt `≥ 1`-mal auf |

## Typische Denkfehler in der Stochastik vermeiden

- **Unabhängigkeit und Unvereinbarkeit trennen:** Disjunkte Ereignisse schließen einander aus (`P(B ∣ A) = 0`) und sind bei positiver Wahrscheinlichkeit maximal **abhängig**, niemals unabhängig.
- **Basisraten-Trugschluss vermeiden:** Verwechseln Sie `P(+ ∣ D)` (Sensitivität) nicht mit `P(D ∣ +)` (Trefferwahrscheinlichkeit bei positivem Befund). Rechnen Sie bei seltenen Ereignissen stets mit dem Satz von Bayes oder einer Vierfeldertafel.
- **Spielerfehlschluss bei Simulationen ablegen:** Nach sechs Mal „Kopf“ beträgt die Chance für „Zahl“ bei einer fairen Münze weiterhin exakt `50 %`. Das Gesetz der großen Zahlen verdünnt Abweichungen über viele Versuche, erzwingt aber keinen kurzfristigen Ausgleich.
- **Überschneidungen bei Oder-Fragen abziehen:** Addieren Sie nicht blind `P(A) + P(B)`, wenn beide Ereignisse zugleich eintreten können – sonst entstehen unmögliche Werte über `100 %`.
- **Erwartungswert nicht als häufigstes Ergebnis lesen:** Bei einem fairen Würfel liegt `E(X) = 3,5` zwischen den Augenzahlen; bei einem Losspiel kann der Erwartungswert trotz hoher Maximalquote negativ sein (z. B. `−0,40 €` je Los).
