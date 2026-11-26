---
title: "Chemische Gleichungen ausgleichen: Massenerhaltung"
description: "Lernen Sie, wie chemische Reaktionsgleichungen nach dem Massenerhaltungssatz Schritt für Schritt ausgeglichen werden, warum Indizes tabu sind und wie die Matrixalgebra komplexe Redoxsysteme löst."
category: "Math & Science"
relatedCalculator: "balancing-chemical-equations-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum dürfen die kleinen Indizes in einer chemischen Formel niemals geändert werden?"
    answer: "Die tiefgestellten Indizes legen die exakte molekulare Zusammensetzung eines Reinstoffs fest. Verändern Sie beispielsweise H₂O zu H₂O₂, um ein Sauerstoffatom auszugleichen, beschreiben Sie nicht mehr Wasser, sondern ätzendes Wasserstoffperoxid mit völlig anderen chemischen Eigenschaften. Beim Ausgleichen dürfen daher ausschließlich die stöchiometrischen Koeffizienten vor den Formeln angepasst werden."
  - question: "Was bedeutet ein gebrochener Koeffizient wie 13/2 O₂ in einer Reaktionsgleichung?"
    answer: "In der Thermochemie und bei Standardbildungsenthalpien wird oft auf 1 mol eines bestimmten Stoffs normiert, sodass Bruchteile wie 1/2 O₂ oder 13/2 O₂ auftreten (bezogen auf Stoffmengen in Mol). Für klassische stöchiometrische Gleichungen, die einzelne Moleküle oder Formeleinheiten abbilden, multipliziert man alle Koeffizienten anschließend mit dem Hauptnenner (hier 2), um kleinstmögliche ganze Zahlen zu erhalten."
  - question: "Wie gleicht man Reaktionen mit mehratomigen Ionen wie Sulfat oder Nitrat am schnellsten aus?"
    answer: "Bleibt ein mehratomiges Ion wie Sulfat (SO₄²⁻), Nitrat (NO₃⁻) oder Phosphat (PO₄³⁻) auf Edukt- und Produktseite unverändert erhalten, sollten Sie es nicht in einzelne Schwefel- und Sauerstoffatome zerlegen, sondern als geschlossene Einheit zählen. Das reduziert die Anzahl der Gleichungen erheblich und verhindert Zählfehler bei sauerstoffreichen Salzen."
  - question: "Worauf muss man bei Ionen- und Redoxgleichungen zusätzlich zur Atomanzahl achten?"
    answer: "Bei Reaktionen mit geladenen Teilchen in wässriger Lösung gilt neben der Massenerhaltung zwingend die Ladungserhaltung: Die Summe aller elektrischen Ladungen auf der Eduktseite muss exakt der Summe auf der Produktseite entsprechen. Zudem müssen bei Redoxreaktionen die abgegebenen Elektronen der Oxidation der Anzahl der aufgenommenen Elektronen bei der Reduktion genau gleichen."
  - question: "Wie berechnet ein automatischer Gleichungslöser schwierige Gleichungen ohne Ausprobieren?"
    answer: "Der Rechner übersetzt die Atombilanz jedes Elements in ein homogenes lineares Gleichungssystem (Matrixalgebra). Jede Verbindung bildet eine Spalte, jedes Element eine Zeile der Matrix. Über das Gaußsche Eliminationsverfahren wird der Nullraum der Matrix bestimmt und anschließend auf kleinste teilerfremde ganze Zahlen normiert."
---

Das **Ausgleichen chemischer Reaktionsgleichungen** basiert auf dem fundamentalen **Massenerhaltungssatz**, den Antoine Laurent de Lavoisier im späten 18. Jahrhundert quantitativ formulierte. Bei jeder chemischen Reaktion bleiben die Gesamtmasse sowie die Anzahl der Atome jedes einzelnen chemischen Elements unverändert: Atome werden weder erschaffen noch vernichtet, sondern lediglich in neuen Molekül- oder Kristallstrukturen neu angeordnet. Eine Reaktionsgleichung ist erst dann stöchiometrisch korrekt, wenn auf der Eduktseite (links) exakt ebenso viele Atome jedes Elements stehen wie auf der Produktseite (rechts).

Um dies zu erreichen, werden ausschließlich ganzzahlige **stöchiometrische Koeffizienten** vor die chemischen Formeln gesetzt. Für komplexe Gleichungen mit vielen Elementen oder aufwendige Redoxsysteme übernimmt unser [Chemische Gleichungen Rechner](/de/rechner/chemische-gleichungen-balancieren-rechner) die exakte Berechnung per Matrixalgebra.

## Massenerhaltungssatz, Stöchiometrie und Notation

### Koeffizienten versus Indizes

In einer Formelangabe wie `3 CO₂` erfüllen die beiden Zahlen völlig unterschiedliche Aufgaben:

- **Tiefgestellte Indizes** (die `2` in `CO₂` oder die `4` in `H₂SO₄`) gehören untrennbar zur Identität des Stoffs. Sie geben das Atomverhältnis innerhalb eines Moleküls bzw. einer Formeleinheit an und dürfen beim Ausgleichen **niemals verändert** werden.
- **Stöchiometrische Koeffizienten** (die vorgestellte `3` in `3 CO₂`) geben an, wie viele Moleküle oder wie viel Stoffmenge (in `mol`) an der Reaktion teilnehmen. Ein Koeffizient multipliziert jedes Atom der nachfolgenden Formel: `3 CO₂` umfasst somit `3` Kohlenstoffatome und `3 × 2 = 6` Sauerstoffatome. Steht kein Koeffizient vor einer Formel, gilt implizit der Faktor `1`.

### Die systematische Inspektions- und Matrixmethode

Bei den meisten anorganischen und organischen Gleichungen führt eine feste Reihenfolge deutlich schneller zum Ziel als unstrukturiertes Probieren:

1. **Komplexeste Verbindung fixieren:** Beginnen Sie mit dem Molekül, das die meisten verschiedenen Elemente oder größten Indizes enthält, und setzen Sie vorläufig `1`.
2. **Metalle und Nichtmetalle (außer H und O) ausgleichen:** Passen Sie zunächst Elemente an, die jeweils nur in einer Verbindung pro Seite vorkommen.
3. **Wasserstoff (`H`) und Sauerstoff (`O`) zuletzt ausgleichen:** Da beide Elemente häufig in mehreren Stoffen gleichzeitig auftreten (etwa in `CO₂` und `H₂O`), löst sich ihre Bilanz am Ende am saubersten.
4. **Brüche beseitigen:** Entsteht vor einem zweiatomigen Element wie `O₂` oder `H₂` ein halbzahliger Koeffizient, multiplizieren Sie alle Koeffizienten der gesamten Gleichung mit `2`.

Bei hochkomplexen Reaktionen stößt das Abzählen von Hand an Grenzen. Hier wandelt die **algebraische Matrixmethode** jedes Element in eine lineare Gleichung um (z. B. `a × C₄H₁₀ + b × O₂ → c × CO₂ + d × H₂O`) und löst das System eindeutig nach dem kleinsten ganzzahligen Verhältnis auf.

## Schritt-für-Schritt-Beispiel: Vollständige Verbrennung von Butan

Butan (`C₄H₁₀`, bekannt aus Feuerzeugen und Campingkartuschen) verbrennt bei ausreichendem Sauerstoffangebot (`O₂`) vollständig zu Kohlenstoffdioxid (`CO₂`) und Wasser (`H₂O`). Die unausgeglichene Rohgleichung lautet:

```text
C₄H₁₀ + O₂ → CO₂ + H₂O   (noch nicht ausgeglichen)
```

1. **Kohlenstoff (`C`) ausgleichen:** Im Molekül `C₄H₁₀` stehen `4` C-Atome. Auf der Produktseite muss daher eine `4` vor `CO₂` gesetzt werden:
   `1 C₄H₁₀ + O₂ → 4 CO₂ + H₂O`
2. **Wasserstoff (`H`) ausgleichen:** Links sind `10` H-Atome vorhanden. Da jedes `H₂O`-Molekül `2` H-Atome enthält, benötigen wir `10 / 2 = 5` Wassermoleküle:
   `1 C₄H₁₀ + O₂ → 4 CO₂ + 5 H₂O`
3. **Sauerstoff (`O`) zählen und ausgleichen:** Auf der Produktseite befinden sich nun `(4 × 2) + (5 × 1) = 8 + 5 = 13` O-Atome. Da Sauerstoff als zweiatomiges Molekül `O₂` vorliegt, wären rechnerisch `13 / 2 = 6,5` Moleküle `O₂` nötig:
   `1 C₄H₁₀ + 6,5 O₂ → 4 CO₂ + 5 H₂O`
4. **Ganze Zahlen herstellen:** Alle Koeffizienten werden mit `2` multipliziert:
   ```text
   2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O
   ```
5. **Atombilanz und Massenkontrolle prüfen:**
   - **C-Atome:** Links `2 × 4 = 8` | Rechts `8 × 1 = 8`
   - **H-Atome:** Links `2 × 10 = 20` | Rechts `10 × 2 = 20`
   - **O-Atome:** Links `13 × 2 = 26` | Rechts `(8 × 2) + (10 × 1) = 26`
   - **Massenprobe:** `2 mol C₄H₁₀` (`116,248 g`) + `13 mol O₂` (`415,974 g`) = **`532,222 g`** Edukte; `8 mol CO₂` (`352,072 g`) + `10 mol H₂O` (`180,150 g`) = **`532,222 g`** Produkte.

## Übersicht typischer Reaktionstypen und Ausgleichsstrategien

Die folgende Übersicht zeigt anhand sechs klassischer Reaktionstypen, welche Besonderheiten beim Ausgleichen zu beachten sind.

| Reaktionstyp | Ausgeglichene Beispielgleichung | Empfohlene Methode | Kritischer Stolperstein |
| :--- | :--- | :--- | :--- |
| Synthese (Knallgas) | `2 H₂ + O₂ → 2 H₂O` | Direkte Inspektion | Zweiatomige Elementmoleküle (`H₂`, `O₂`) beachten |
| Alkan-Verbrennung | `2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O` | C → H → O, dann `× 2` | Ungerade O-Anzahl erfordert Verdopplung |
| Fällungsreaktion | `Al₂(SO₄)₃ + 3 Ca(OH)₂ → 2 Al(OH)₃ + 3 CaSO₄` | Ionengruppen bündeln | Klammern um `SO₄` und `OH` korrekt multiplizieren |
| Neutralisation | `H₃PO₄ + 3 NaOH → Na₃PO₄ + 3 H₂O` | Protonen (`H⁺`) = `OH⁻` | Wasser als `H–OH` betrachten erleichtert Zählung |
| Thermit-Redoxreaktion | `Fe₂O₃ + 2 Al → 2 Fe + Al₂O₃` | Sauerstoffbilanz zuerst | Oxidationszahlen von Eisen und Aluminium prüfen |
| Komplexe Redoxreaktion | `2 KMnO₄ + 16 HCl → 2 KCl + 2 MnCl₂ + 5 Cl₂ + 8 H₂O` | Teilgleichungen / Matrix | `HCl` wirkt gleichzeitig als Säure und Reduktionsmittel |

## Typische Fehlerquellen und fachliche Grenzen

### Kritische Stolperfallen beim Ausgleichen

Ein verbreiteter Fehler bei Salzen und Komplexverbindungen ist das Übersehen von **Klammermultiplikatoren**. In `Al₂(SO₄)₃` bezieht sich die `3` außerhalb der Klammer auf jedes Atom darin – die Einheit enthält also `3` Schwefel- und `12` Sauerstoffatome. Bei Hydraten wie `CuSO₄ · 5 H₂O` werden ebenso leicht die `5` O- und `10` H-Atome des Kristallwassers vergessen.

Bei verkürzten **Ionengleichungen** in Lösung reicht reine Atomzählung nicht aus: `Fe³⁺ + Cu → Fe²⁺ + Cu²⁺` ist atomar ausgeglichen, aber elektrisch falsch (`+3` links vs. `+4` rechts). Erst `2 Fe³⁺ + Cu → 2 Fe²⁺ + Cu²⁺` erfüllt Atom- und Ladungserhaltung (`+6` beidseitig).

### Was eine ausgeglichene Gleichung nicht aussagt

Eine stöchiometrische Gleichung liefert die exakte Stoff- und Massenbilanz, jedoch keine Aussage über **Kinetik oder Gleichgewichtslage**. So reagiert ein Wasserstoff-Sauerstoff-Gemisch bei Raumtemperatur ohne Zündfunken trotz ausgeglichener Gleichung nicht merklich, und industrielle Prozesse wie das Haber-Bosch-Verfahren (`N₂ + 3 H₂ ⇌ 2 NH₃`) führen lediglich zu einem chemischen Gleichgewicht (`⇌`) statt vollständigem Umsatz.
