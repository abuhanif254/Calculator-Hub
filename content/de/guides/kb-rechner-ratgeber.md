---
title: "Kb-Rechner: Die Basendissoziationskonstante"
description: "Erfahren Sie, wie die Basendissoziationskonstante Kb und der pKb-Wert die Basenstärke quantifizieren, wie Kb über Kw mit Ka verknüpft ist und wie Sie unseren Kb-Rechner nutzen."
category: "Math & Science"
relatedCalculator: "kb-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wie hängen Kb-Wert und pKb-Wert mit der Stärke einer Base zusammen?"
    answer: "Eine große Basendissoziationskonstante Kb bedeutet, dass ein größerer Anteil der Base in Wasser Protonen aufnimmt und Hydroxidionen (OH⁻) bildet — die Base ist also stärker. Über pKb = −log₁₀(Kb) wird diese Skala umgekehrt: Je kleiner der pKb-Wert ausfällt, desto stärker wirkt die Base."
  - question: "Wie lässt sich Kb direkt aus dem Ka-Wert der korrespondierenden Säure berechnen?"
    answer: "Für jedes korrespondierende Säure-Base-Paar gilt in wässriger Lösung der exakte Zusammenhang Ka × Kb = Kw. Bei 25 °C beträgt das Ionenprodukt des Wassers Kw = 1,0 × 10⁻¹⁴. Daraus folgt unmittelbar Kb = 1,0 × 10⁻¹⁴ / Ka beziehungsweise logarithmisch pKb = 14,00 − pKa."
  - question: "Warum ist Ammoniak eine schwache Base, obwohl Natronlauge stark alkalisch ist?"
    answer: "Natriumhydroxid (NaOH) ist eine ionische Base, deren Hydroxidionen beim Auflösen in Wasser sofort vollständig freigesetzt werden. Ammoniak (NH₃) enthält dagegen keine eigenen OH⁻-Ionen, sondern muss dem Wasser in einer reversiblen Gleichgewichtsreaktion ein Proton entziehen (NH₃ + H₂O ⇌ NH₄⁺ + OH⁻). Bei moderaten Konzentrationen reagieren nur wenige Prozent der Moleküle."
  - question: "Wann reicht die Näherung [OH⁻] ≈ √(Kb · c₀) nicht mehr aus?"
    answer: "Die Wurzel-Näherung setzt voraus, dass maximal 5 % der Basenmoleküle protoniert werden (c₀ / Kb ≥ 400). Ist die Base mittelstark oder die Lösung stark verdünnt, müssen Sie die exakte quadratische Gleichung [OH⁻]² + Kb · [OH⁻] − Kb · c₀ = 0 lösen. Bei extrem verdünnten Lösungen (Kb · c₀ < 10⁻¹²) muss zusätzlich die Autoprotolyse des Wassers berücksichtigt werden."
  - question: "Weshalb verändert sich der pH-Wert einer Basenlösung bei Erwärmung?"
    answer: "Zwei Effekte überlagern sich: Erstens verschiebt sich Kb gemäß der Van-’t-Hoff-Gleichung mit der Temperatur. Zweitens steigt das Ionenprodukt des Wassers Kw mit zunehmender Temperatur stark an — von pKw = 14,94 (0 °C) über 14,00 (25 °C) auf 13,62 (37 °C). Da pH = pKw − pOH gilt, sinkt der pH-Wert einer gleichbleibend konzentrierten Basenlösung bei Erwärmung merklich."
---

Die **Basendissoziationskonstante `Kb`** (auch Basenkonstante) misst die Stärke einer schwachen Brønsted-Base in Wasser. Sie gibt an, wie stark das Gleichgewicht bei der Protonenaufnahme durch die Base (`B + H₂O ⇌ BH⁺ + OH⁻`) auf der Seite der Produkte — also der korrespondierenden Säure `BH⁺` und der Hydroxidionen `OH⁻` — liegt. Während starke Basen wie Natriumhydroxid oder Kaliumhydroxid im Wasser vollständig in Ionen zerfallen, bilden schwache Basen wie Ammoniak, Anilin oder organische Amine nur einen begrenzten Bruchteil an `OH⁻`-Ionen.

Weil reale `Kb`-Werte viele Größenordnungen umspannen, nutzen Chemiker ergänzend den negativen dekadischen Logarithmus **`pKb`** sowie die feste Kopplung an die Säurekonstante über das Ionenprodukt des Wassers `Kw`. Mit unserem [Kb-Rechner](/de/rechner/kb-wert-rechner) ermitteln Sie `Kb` direkt aus gemessenen Gleichgewichtskonzentrationen ohne Fehler bei Potenzen oder Zehnerexponenten.

## Protolyse-Gleichgewicht, Kb-Formel und Verknüpfung mit Ka und Kw

Reagiert eine schwache Base `B` (beispielsweise ein freies Amin) mit Wasser, fungiert das Wassermolekül als Protonendonator. Nach dem Massenwirkungsgesetz und unter Einbeziehung der praktisch konstanten Wasserkonzentration (`~55,5 mol/L`) gelten folgende Gleichungen:

```text
Basendissoziationskonstante:
Kb  = ([BH⁺] · [OH⁻]) / [B]

Logarithmische Skala:
pKb = −log₁₀(Kb)     bzw.     Kb = 10^(−pKb)

Kopplung über das Ionenprodukt des Wassers (bei 25 °C: Kw = 1,0 × 10⁻¹⁴):
Kw  = Ka × Kb = [H₃O⁺] · [OH⁻]
pKw = pKa + pKb = 14,00     (bei 25 °C)

Umrechnung auf pOH und pH:
pOH = −log₁₀([OH⁻])     und     pH = pKw − pOH
```

Die Parameter in der Gleichgewichtsgleichung bezeichnen stets molare Konzentrationen im Gleichgewicht (`mol/L`):

- **[OH⁻]:** Gleichgewichtskonzentration der Hydroxidionen, bestimmbar über `10^(−pOH)` bzw. `10^(pH − pKw)`.
- **[BH⁺]:** Gleichgewichtskonzentration der protonierten Base (korrespondierende Säure). In einer reinen Basenlösung ohne Fremdzusätze entspricht sie `[OH⁻]`.
- **[B]:** Gleichgewichtskonzentration der unprotonierten, freien Base (`c₀ − [OH⁻]`).

Die Beziehung `Ka × Kb = Kw` hat eine fundamentale Konsequenz für das gesamte Säure-Base-Verständnis: **Je stärker eine Base ist, desto schwächer ist ihre korrespondierende Säure** — und umgekehrt.

## Schritt-für-Schritt-Rechenbeispiel: Kb und pKb einer Ammoniaklösung bestimmen

Eine wässrige **Ammoniaklösung (`NH₃`)** mit der Ausgangskonzentration **`c₀ = 0,200 mol/L`** zeigt bei **25 °C** am pH-Meter einen stabilen Wert von **`pH = 11,28`**. Daraus sollen die Basendissoziationskonstante `Kb`, der `pKb`-Wert sowie der `pKa`-Wert des korrespondierenden Ammoniumions (`NH₄⁺`) berechnet werden.

1. **pOH-Wert berechnen:** Nutzen Sie das Ionenprodukt des Wassers bei 25 °C (`pKw = 14,00`): `pOH = 14,00 − 11,28 = 2,72`.
2. **Hydroxidionen-Konzentration bestimmen:** Über die Potenzierung erhalten Sie `[OH⁻] = 10^(−2,72) ≈ 1,905 × 10⁻³ mol/L` (`0,001905 mol/L`). Da bei der Reaktion `NH₃ + H₂O ⇌ NH₄⁺ + OH⁻` beide Ionen im Verhältnis 1 : 1 entstehen, gilt zugleich `[NH₄⁺] = 1,905 × 10⁻³ mol/L`.
3. **Gleichgewichtskonzentration der freien Base berechnen:** Ziehen Sie den umgesetzten Anteil von der Ausgangskonzentration ab: `[NH₃] = 0,200 − 0,001905 = 0,1981 mol/L`.
4. **Kb ermitteln:** Setzen Sie die Werte in die Gleichgewichtsformel ein:
   `Kb = (1,905 × 10⁻³ × 1,905 × 10⁻³) / 0,1981 = (3,629 × 10⁻⁶) / 0,1981 ≈ 1,83 × 10⁻⁵`.
5. **pKb und korrespondierenden pKa berechnen:** Der `pKb`-Wert lautet `pKb = −log₁₀(1,83 × 10⁻⁵) ≈ 4,74`. Für das korrespondierende Ammoniumion `NH₄⁺` folgt unmittelbar `pKa = 14,00 − 4,74 = 9,26` beziehungsweise `Ka = 1,0 × 10⁻¹⁴ / 1,83 × 10⁻⁵ ≈ 5,46 × 10⁻¹⁰`.

Der Anteil der tatsächlich protonierten Ammoniakmoleküle beträgt hier lediglich `0,001905 / 0,200 = 0,95 %` — ein typischer Wert für eine schwache Base in wässriger Lösung.

## Vergleichstabelle: Kb-, pKb- und konjugierte pKa-Werte bei 25 °C

Die Übersicht vergleicht wichtige aliphatische, anorganische und aromatische Basen sowie ihre jeweilige korrespondierende Säure bei Standardtemperatur (25 °C).

| Base (Formel) | Kb (25 °C) | pKb | Korrespondierende Säure (`BH⁺`) | pKa (`BH⁺`) | Basenstärke und Strukturmerkmal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Diethylamin `(C₂H₅)₂NH` | `6,9 × 10⁻⁴` | 3,16 | Diethylammoniumion | 10,84 | Mäßig stark; zwei +I-Alkylgruppen stabilisieren `BH⁺` |
| Methylamin `CH₃NH₂` | `4,4 × 10⁻⁴` | 3,36 | Methylammoniumion | 10,64 | Stärker als Ammoniak durch induktiven Elektronenschub |
| Ammoniak `NH₃` | `1,8 × 10⁻⁵` | 4,75 | Ammoniumion (`NH₄⁺`) | 9,25 | Klassische schwache anorganische Base; Referenzstandard |
| Pyridin `C₅H₅N` | `1,7 × 10⁻⁹` | 8,77 | Pyridiniumion | 5,23 | Sehr schwach; sp²-hybridisierter Stickstoff bindet Elektronen fester |
| Anilin `C₆H₅NH₂` | `4,3 × 10⁻¹⁰` | 9,37 | Aniliniumion | 4,63 | Sehr schwach; freies Elektronenpaar delokalisiert in den Benzolring |
| Harnstoff `CO(NH₂)₂` | `1,5 × 10⁻¹⁴` | 13,82 | Protonierter Harnstoff | 0,18 | Extrem schwach; Mesomerie mit Carbonylgruppe verhindert Protonierung |

## Anwendungsgebiete, Salzhydrolyse und typische Fehlerquellen

Die `Kb`-Konstante ist unverzichtbar bei der Beurteilung der **Salzhydrolyse**. Löst man etwa das Salz einer schwachen Säure und einer starken Base — zum Beispiel Natriumacetat (`CH₃COONa`) — in Wasser, reagiert das Acetation `CH₃COO⁻` als schwache Base mit einer Basenkonstante von `Kb = Kw / Ka = 1,0 × 10⁻¹⁴ / 1,8 × 10⁻⁵ ≈ 5,6 × 10⁻¹⁰` und verschiebt den pH-Wert der Lösung deutlich in den alkalischen Bereich. In der industriellen Verfahrenstechnik steuert `Kb` die Auslegung von Aminwäschen zur Abscheidung saurer Gase (`CO₂`, `H₂S`), die Extraktion pharmazeutischer Alkaloide sowie die Neutralisation saurer Abwässer mit Ammonium- oder Carbonatsystemen.

Vermeiden Sie bei Berechnungen rund um `Kb` vier häufige Fehler:

- **Verwechslung von pH und pOH:** Das Einsetzen von `Kb` und `c₀` in `[OH⁻] ≈ √(Kb · c₀)` liefert über `−log₁₀([OH⁻])` zunächst den **`pOH`-Wert**, niemals direkt den `pH`-Wert. Eine fehlende Umrechnung über `pKw − pOH` führt bei Ammoniak zu einem scheinbar sauren statt alkalischen Ergebnis.
- **Starres Anwenden von pKw = 14,00 bei anderen Temperaturen:** Bei Körpertemperatur (37 °C) gilt `pKw = 13,62`, bei 50 °C bereits `pKw = 13,26`. Für präzise biochemische oder prozesstechnische Berechnungen muss stets der temperaturangepasste `Kw`-Wert genutzt werden.
- **Unzulässige Wurzel-Näherung bei stärkeren Aminen:** Bei Methylamin oder Diethylamin (`Kb ≈ 10⁻⁴`) in verdünnter Lösung (`c₀ ≤ 0,01 mol/L`) steigt der Protonierungsgrad deutlich über 5 %. In solchen Fällen muss zwingend die exakte quadratische Gleichung gelöst werden.
- **Verwechslung von Kb der freien Base mit Ka des Hydrochlorid-Salzes:** In Tabellen für Arzneistoffe oder Amine wird häufig der `pKa`-Wert der *protonierten* Form (z. B. `NH₄⁺`, `pKa = 9,25`) angegeben, nicht `pKb`. Prüfen Sie vor der Eingabe immer genau, welche Spezies tabelliert ist.
