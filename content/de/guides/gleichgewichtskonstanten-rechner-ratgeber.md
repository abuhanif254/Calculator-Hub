---
title: "Gleichgewichtskonstanten-Rechner (Keq): Chemisches Gleichgewicht"
description: "Lernen Sie, wie die Keq-Konstante das Gleichgewicht zwischen Produkten und Edukten misst, und nutzen Sie unseren kostenlosen Rechner."
category: "Math & Science"
relatedCalculator: "equilibrium-constant-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen der Gleichgewichtskonstanten Keq und dem Reaktionsquotienten Q?"
    answer: "Die Gleichgewichtskonstante Keq beschreibt das Konzentrations- oder Druckverhältnis von Produkten zu Edukten ausschließlich im Zustand des thermodynamischen Gleichgewichts bei einer bestimmten Temperatur. Der Reaktionsquotient Q wird nach derselben Formel berechnet, gilt jedoch zu jedem beliebigen Zeitpunkt einer Reaktion. Ist Q kleiner als Keq, läuft die Hinreaktion bevorzugt ab; ist Q größer als Keq, überwiegt die Rückreaktion."
  - question: "Warum werden reine Feststoffe und reine Flüssigkeiten bei der Berechnung von Keq weggelassen?"
    answer: "Streng genommen basiert das Massenwirkungsgesetz auf den thermodynamischen Aktivitäten der beteiligten Stoffe und nicht direkt auf ihren molaren Konzentrationen. Da reine Feststoffe sowie reine Flüssigkeiten (einschließlich des Lösungsmittels in verdünnten wässrigen Lösungen) per Konvention die konstante Aktivität 1 besitzen, bleiben sie als neutraler Faktor im Zähler oder Nenner unberücksichtigt."
  - question: "Verändert ein Katalysator den Zahlenwert der Gleichgewichtskonstanten Keq?"
    answer: "Nein. Ein Katalysator senkt die Aktivierungsenergie für die Hin- und die Rückreaktion um exakt denselben Betrag und beschleunigt dadurch beide Teilreaktionen gleichermaßen. Das chemische Gleichgewicht stellt sich deutlich schneller ein, doch die Gleichgewichtslage und damit der numerische Wert von Keq bleiben unverändert."
  - question: "Welcher Faktor beeinflusst die Gleichgewichtskonstante Keq tatsächlich?"
    answer: "Die Gleichgewichtskonstante Keq ist ausschließlich temperaturabhängig. Änderungen von Konzentration, Partialdruck oder Gesamtvolumen verschieben zwar gemäß dem Prinzip von Le Chatelier kurzfristig die Zusammensetzung der Mischung (Q ändert sich), doch das System reagiert so lange, bis das ursprüngliche Verhältnis Keq wiederhergestellt ist. Nur eine Temperaturänderung verändert Keq selbst, beschrieben durch die Van-'t-Hoff-Gleichung."
  - question: "Wie hängen Keq, Kc, Kp und die freie Reaktionsenthalpie ΔG° zusammen?"
    answer: "Kc bezieht sich auf molare Konzentrationen (mol/L) und Kp auf Partialdrücke (bar oder atm); beide Größen lassen sich bei idealen Gasen über Kp = Kc × (R × T)^Δn ineinander umrechnen. Thermodynamisch ist die Gleichgewichtskonstante über ΔG° = −R × T × ln(Keq) direkt mit der freien Standardreaktionsenthalpie verknüpft: Ein negatives ΔG° entspricht Keq > 1."
---

Viele chemische Reaktionen in Industrie und Labor verlaufen **reversibel**: Edukte bilden Produkte, während Produkte gleichzeitig wieder zu Edukten zerfallen. Sobald Hin- und Rückreaktion exakt gleich schnell ablaufen, entsteht ein **dynamisches Gleichgewicht** mit konstanten makroskopischen Stoffmengen.

Die **Gleichgewichtskonstante (`K_eq`)** quantifiziert diesen Zustand auf Basis des Massenwirkungsgesetzes (MWG). Sie zeigt auf einen Blick, ob bei gegebener Temperatur Produkte oder Edukte dominieren, und bildet die Grundlage für Ausbeute-, Säure-Base- und Fällungsberechnungen. Mit unserem [Gleichgewichtskonstanten-Rechner](/de/rechner/gleichgewichtskonstante-rechner) bestimmen Sie `K_c`, `K_p` und die Reaktionsrichtung für beliebige Stöchiometrien präzise.

## Methodik: Massenwirkungsgesetz, Kc, Kp und Reaktionsquotient Q

Für eine homogene Reaktion `a A + b B ⇄ c C + d D` verknüpft das Massenwirkungsgesetz nach Guldberg und Waage die Gleichgewichtskonzentrationen über ihre stöchiometrischen Koeffizienten als Exponenten:

```text
K_c = ([C]^c × [D]^d) / ([A]^a × [B]^b)
K_p = (p(C)^c × p(D)^d) / (p(A)^a × p(B)^b)
```

Parameterdefinitionen:

- **`[A], [B], [C], [D]`**: Molare Gleichgewichtskonzentrationen in `mol/L` (bezogen auf `c° = 1 mol/L`).
- **`p(A), p(B), p(C), p(D)`**: Gleichgewichts-Partialdrücke gasförmiger Stoffe in `bar` (oder `atm`).
- **`a, b, c, d`**: Stöchiometrische Koeffizienten der ausgeglichenen Reaktionsgleichung.
- **`Δn`**: Änderung der Gasmolzahl, berechnet als `(c + d) − (a + b)`.

Für ideale Gase lassen sich `K_c` und `K_p` umrechnen; zudem verknüpft die Thermodynamik `K_eq` mit der freien Standardreaktionsenthalpie `ΔG°`:

```text
K_p = K_c × (R × T)^Δn
ΔG° = −R × T × ln(K_eq)
```

Dabei ist `R` die universelle Gaskonstante (`8,3145 J/(mol·K)` für `ΔG°`, bzw. `0,083145 bar·L/(mol·K)` für `K_p`) und `T` die absolute Temperatur in Kelvin (`K = °C + 273,15`).

### Reaktionsrichtung und Gleichgewichtsverschiebung über Q prüfen

Befindet sich eine Reaktionsmischung noch nicht im Gleichgewicht, liefern die aktuell gemessenen Momentankonzentrationen den **Reaktionsquotienten `Q`**:

- **`Q < K_eq`**: Eduktüberschuss; die Hinreaktion läuft bevorzugt nach rechts ab, bis `Q = K_eq` gilt.
- **`Q = K_eq`**: Dynamisches Gleichgewicht; die Nettoreaktionsrate beträgt exakt null.
- **`Q > K_eq`**: Produktüberschuss; die Rückreaktion dominiert in Richtung der Ausgangsstoffe.

Reale Gleichgewichtszustände verändern sich zudem nach dem **Prinzip von Le Chatelier**: Übt man auf ein im Gleichgewicht befindliches System einen äußeren Zwang aus (etwa durch Konzentrations- oder Druckänderung), weicht die Zusammensetzung aus, um `Q` wieder an `K_eq` anzugleichen. Ausschließlich eine **Temperaturänderung** verändert die Konstante `K_eq` selbst: Bei exothermen Reaktionen (`ΔH° < 0`) sinkt `K_eq` mit steigender Temperatur, bei endothermen Reaktionen (`ΔH° > 0`) steigt `K_eq` an.

## Praxisbeispiel: Schwefeltrioxid-Synthese im Kontaktverfahren

Betrachten wir die exotherme Oxidation von Schwefeldioxid bei `T = 1.000 K` (`726,85 °C`), den zentralen Reaktionsschritt der industriellen Schwefelsäureherstellung:

```text
2 SO₂(g) + O₂(g) ⇄ 2 SO₃(g)
```

In einem geschlossenen `2,0-Liter`-Reaktor betragen die gemessenen Gleichgewichtskonzentrationen `[SO₂] = 0,40 mol/L`, `[O₂] = 0,25 mol/L` und `[SO₃] = 1,20 mol/L`.

1. **Massenwirkungsgesetz**: Die Koeffizienten `2`, `1` und `2` werden zu Exponenten:
   `K_c = [SO₃]² / ([SO₂]² × [O₂])`
2. **Berechnung von `K_c`**:
   `Zähler = (1,20)² = 1,44`
   `Nenner = (0,40)² × 0,25 = 0,16 × 0,25 = 0,040`
   `K_c = 1,44 / 0,040 = 36,0`
3. **Umrechnung in `K_p`**: Die Gasmolzahl sinkt von `3` auf `2`, somit beträgt `Δn = 2 − 3 = −1`. Mit `R = 0,083145 bar·L/(mol·K)` und `T = 1.000 K` ergibt sich `R × T = 83,145`, woraus `K_p = 36,0 / 83,145 ≈ 0,433` folgt (bezogen auf den Standarddruck `1 bar`).
4. **Richtungskontrolle mit `Q_c`**: Startet ein frischer Ansatz mit jeweils `0,50 mol/L` aller drei Gase, gilt `Q_c = (0,50)² / ((0,50)² × 0,50) = 1 / 0,50 = 2,0`. Da `Q_c = 2,0 < K_c = 36,0`, schreitet die Reaktion netto nach rechts in Richtung `SO₃` voran.
5. **Standard-Gibbs-Energie**: Über `ΔG° = −R × T × ln(K_p)` ergibt sich bei `1.000 K` mit `ln(0,433) = −0,837` ein Wert von `ΔG°(1.000 K) = −8,3145 × 1.000 × (−0,837) ≈ +6,96 kJ/mol`, was zeigt, dass `K_p` bei sehr hohen Temperaturen bereits unter `1` fällt.

## Einordnung von Keq-Werten: Gleichgewichtslage im Vergleich

Die Übersicht ordnet Größenordnungen von `K_eq` bei `298,15 K` (`25 °C`) ein:

| Größenordnung Keq | Vorzeichen ΔG° | Dominierende Spezies | Gleichgewichtslage | Beispielsystem |
| :--- | :--- | :--- | :--- | :--- |
| `K_eq < 10⁻⁶` | Stark positiv (`> +34 kJ/mol`) | Nahezu nur Edukte | Praktisch kein Umsatz | `N₂ + O₂ ⇄ 2 NO` (`25 °C`, `K_p ≈ 4 × 10⁻³¹`) |
| `10⁻⁶ bis 10⁻²` | Positiv (`+11 bis +34 kJ/mol`) | Überwiegend Edukte | Schwache Dissoziation | `CH₃COOH + H₂O ⇄ CH₃COO⁻ + H₃O⁺` (`K_a = 1,75 × 10⁻⁵`) |
| `0,01 bis 100` | Nahe null (`−11 bis +11 kJ/mol`) | Edukte & Produkte gemischt | Umkehrbares Gleichgewicht | `H₂ + I₂ ⇄ 2 HI` (`448 °C`, `K_c ≈ 50`) |
| `10² bis 10⁶` | Negativ (`−34 bis −11 kJ/mol`) | Überwiegend Produkte | Hohe Ausbeute | Veresterungen mit Wasserentzug |
| `K_eq > 10⁶` | Stark negativ (`< −34 kJ/mol`) | Praktisch nur Produkte | Nahezu quantitativ | `2 H₂ + O₂ ⇄ 2 H₂O` (`25 °C`, `K_p ≈ 10⁸⁰`) |

## Anwendungsbereiche, Fehlerquellen und Grenzen des Modells

In der Verfahrenstechnik steuert das Zusammenspiel von `K_eq` und dem **Prinzip von Le Chatelier** den Reaktorbetrieb. Bei der Ammoniaksynthese (`N₂ + 3 H₂ ⇄ 2 NH₃`) senken steigende Temperaturen zwar `K_eq`, doch Drücke von `150–300 bar` verschieben das Gleichgewicht zu `NH₃`, während ein Katalysator bei `400–500 °C` die Kinetik beschleunigt. In der Wasseranalytik steuern gekoppelte Gleichgewichte das Kalk-Kohlensäure-System, in der Biochemie misst `K_d` die Wirkstoffbindung an Proteine.

Vermeiden Sie vier häufige Rechenfehler:

1. **Einbezug reiner Phasen**: Feststoffe `(s)` und reine Flüssigkeiten `(l)` besitzen die konstante Aktivität `1` und entfallen im MWG.
2. **Start- statt Gleichgewichtswerte**: Nutzen Sie in `K_eq` nur Endkonzentrationen; bei Startwerten ist vorab eine Stoffbilanz (ICE-Tabelle) erforderlich.
3. **Falsches Umkehren oder Skalieren**: Gleichungsumkehr bildet den Kehrwert (`1 / K_hin`); Multiplikation der Gleichung mit `m` potenziert `K_eq` mit `m` (`K^m`).
4. **Aktivitäten bei hoher Konzentration**: Oberhalb von `0,1 mol/L` Ionenstärke oder `10 bar` Druck weichen reale Gase und Elektrolyte vom Idealverhalten ab und erfordern Aktivitäts- bzw. Fugazitätskoeffizienten.
