---
title: "Puffer-Rechner: pH-Stabilität bewahren"
description: "Erfahren Sie, wie Sie chemische Pufferlösungen gezielt ansetzen, die Pufferkapazität berechnen, das richtige Puffersystem wählen und unseren Puffer-Rechner nutzen."
category: "Math & Science"
relatedCalculator: "buffer-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wie wähle ich das passende Puffersystem für einen Ziel-pH-Wert aus?"
    answer: "Wählen Sie stets eine schwache Säure oder Base, deren pKa-Wert möglichst nahe am gewünschten Ziel-pH-Wert liegt — idealerweise innerhalb von pKa ± 1,0. Neben dem pH-Bereich entscheiden Temperaturstabilität, biologische Verträglichkeit, UV-Transparenz bei photometrischen Messungen sowie das Ausbleiben unerwünschter Komplexe oder Niederschläge mit Metallionen im Reaktionsansatz."
  - question: "Was beschreibt die Pufferkapazität β und wie lässt sie sich steigern?"
    answer: "Die Pufferkapazität β (oft nach Van Slyke) gibt an, wie viel Mol einer starken Säure oder Base pro Liter Pufferlösung benötigt werden, um den pH-Wert um genau eine Einheit zu verschieben. Sie steigt linear mit der Gesamtpufferkonzentration c_ges und erreicht ihr Maximum bei pH = pKa mit β_max ≈ 0,576 × c_ges."
  - question: "Kann man eine Pufferlösung auch ohne das korrespondierende Salz herstellen?"
    answer: "Ja. Durch partielle Neutralisation können Sie ausschließlich von der schwachen Säure (oder schwachen Base) ausgehen und eine berechnete Menge starker Natronlauge (NaOH) bzw. Salzsäure (HCl) zutropfen. Die zugegebene Lauge wandelt einen stöchiometrisch exakten Teil der Säure direkt in ihre korrespondierende Base um."
  - question: "Warum eignet sich ein Phosphatpuffer nicht für calcium- oder magnesiumhaltige Ansätze?"
    answer: "Hydrogen- und Phosphationen bilden mit zweiwertigen Kationen wie Ca²⁺, Mg²⁺ oder Fe²⁺/Fe³⁺ schwerlösliche Salze, die als weißlicher Niederschlag ausfallen. Dadurch sinkt die verfügbare Pufferkonzentration unkontrolliert und wichtige Metall-Cofaktoren werden Enzymen entzogen. Für solche Medien empfiehlt sich ein zwitterionischer Good-Puffer wie HEPES oder MOPS."
  - question: "Welche Mindestkonzentration sollte ein robuster Laborpuffer aufweisen?"
    answer: "Für Standardanwendungen in Analytik und Biochemie haben sich Gesamtkonzentrationen zwischen 20 mmol/L und 200 mmol/L bewährt. Als Faustregel sollte die Pufferkonzentration mindestens zehn- bis zwanzigmal höher sein als die maximal erwartete Säure- oder Basenfreisetzung während der Reaktion, damit die pH-Drift unter 0,1 Einheiten bleibt."
---

Eine **Pufferlösung** stabilisiert den pH-Wert eines wässrigen Systems selbst dann, wenn durch chemische Reaktionen, enzymatische Prozesse oder Verunreinigungen starke Säuren oder Basen eingetragen werden. Erreicht wird diese pH-Konstanz durch das gleichzeitige Vorhandensein zweier aufeinander abgestimmter Komponenten: einer **schwachen Säure**, die zugesetzte Hydroxidionen (`OH⁻`) abfängt, und ihrer **korrespondierenden Base**, die eindringende Oxoniumionen (`H₃O⁺`) bindet.

In der Laborpraxis reicht das Wissen um das Prinzip allein nicht aus — entscheidend sind die exakte Einwaage beider Komponenten, das richtige molare Verhältnis für den angestrebten Ziel-pH-Wert und eine ausreichend dimensionierte Pufferkapazität. Mit unserem [Puffer-Rechner](/de/rechner/puffer-rechner) berechnen Sie das benötigte Säure-Base-Verhältnis sowie die Konzentrationen für Ihre Rezeptur schnell und reproduzierbar.

## Wirkprinzip, Mischungsverhältnis und Pufferkapazität

Trifft eine starke Säure auf ein Puffersystem `HA / A⁻`, protoniert sie die korrespondierende Base (`A⁻ + H₃O⁺ → HA + H₂O`). Anstelle freier Oxoniumionen entsteht überwiegend schwach dissoziierte Säure `HA`, sodass der pH-Wert kaum sinkt. Gelangt umgekehrt eine starke Lauge in das System, gibt die schwache Säure Protonen ab (`HA + OH⁻ → A⁻ + H₂O`), wodurch das Hydroxidion zu neutralem Wasser abreagiert.

Für die gezielte Formulierung einer Pufferlösung werden drei zentrale Gleichungen kombiniert:

```text
Mischungsverhältnis aus Ziel-pH und pKa:
[A⁻] / [HA] = 10^(pH − pKa)

Massenbilanz der Gesamtpufferkonzentration:
c_ges = [HA] + [A⁻]
[HA]  = c_ges / (1 + 10^(pH − pKa))
[A⁻]  = c_ges − [HA]

Pufferkapazität β nach Van Slyke (in mol / (L · pH)):
β     = 2,303 × c_ges × (Ka × [H₃O⁺]) / (Ka + [H₃O⁺])²
β_max = 0,576 × c_ges   (erreicht bei pH = pKa)
```

Dabei steht `c_ges` für die Summe der molaren Konzentrationen beider Pufferpartner in `mol/L`, `Ka` für die Säuredissoziationskonstante (`10^(−pKa)`) und `β` für die **Pufferkapazität** — also jene Stoffmenge an starker einprotoniger Säure oder Base, die 1 Liter Puffer aufnehmen kann, bevor sich der pH-Wert um 1,0 Einheit ändert. Die Formel zeigt zwei Konsequenzen deutlich: Erstens skaliert die Belastbarkeit eines Puffers direkt proportional zur Gesamtkonzentration `c_ges`. Zweitens sinkt `β` stark ab, sobald der Ziel-pH-Wert mehr als eine Einheit vom `pKa`-Wert entfernt liegt; bei `pH = pKa ± 1` beträgt die Pufferkapazität nur noch rund ein Drittel ihres Maximalwerts.

## Schritt-für-Schritt-Rechenbeispiel: Phosphatpuffer für pH 7,40 ansetzen

In der Zellbiologie und Proteinanalytik wird häufig ein physiologischer Phosphatpuffer bei **pH 7,40** benötigt. Wir berechnen die exakten Einwaagen für **1,00 Liter** eines **0,100 mol/L** Phosphatpuffers bei **25 °C** aus Natriumdihydrogenphosphat (`NaH₂PO₄`, schwache Säure `H₂PO₄⁻`, `M = 119,98 g/mol`, zweiter Dissoziationsschritt `pKa₂ = 7,21`) und Dinatriumhydrogenphosphat (`Na₂HPO₄`, korrespondierende Base `HPO₄²⁻`, `M = 141,96 g/mol`).

1. **Erforderliches Verhältnis berechnen:** Setzen Sie Ziel-pH und `pKa₂` in die Exponentialform ein: `[A⁻] / [HA] = 10^(7,40 − 7,21) = 10^(0,19) ≈ 1,5488`. Es werden also rund 1,55-mal so viele Mole der basischen Komponente wie der sauren Komponente benötigt.
2. **Einzelkonzentrationen aus der Gesamtkonzentration ableiten:** Mit `c_ges = 0,100 mol/L` folgt für die Säurekomponente `[NaH₂PO₄] = 0,100 / (1 + 1,5488) = 0,100 / 2,5488 ≈ 0,03923 mol/L`. Die Basenkonzentration ergibt sich aus der Differenz: `[Na₂HPO₄] = 0,100 − 0,03923 = 0,06077 mol/L`.
3. **Salzeinwaagen für 1,00 Liter ermitteln:** Multiplizieren Sie die Stoffmengen mit den jeweiligen Molmassen der wasserfreien Salze:
   - `m(NaH₂PO₄) = 0,03923 mol × 119,98 g/mol ≈ 4,71 g`
   - `m(Na₂HPO₄) = 0,06077 mol × 141,96 g/mol ≈ 8,63 g`
4. **Pufferkapazität prüfen:** Im Optimum (`pH = 7,21`) liegt die maximale Kapazität dieses `0,100 mol/L`-Ansatzes bei `β_max = 0,576 × 0,100 = 0,0576 mol/(L · pH)`. Bei `pH 7,40` ist die Säurekapazität etwas höher als die Basenkapazität, da bereits mehr `HPO₄²⁻` vorliegt.

## Vergleichstabelle: Gängige Puffersysteme in Labor und Industrie

Die Wahl des geeigneten Puffers richtet sich nicht allein nach dem `pKa`-Wert, sondern ebenso nach chemischer Inertheit, Kosten und Temperaturempfindlichkeit.

| Puffersystem | pKa (25 °C) | Nutzbarer pH-Bereich | Typische Einsatzgebiete | Wichtige Einschränkungen |
| :--- | :--- | :--- | :--- | :--- |
| Ameisensäure / Formiat | 3,75 | 2,75 – 4,75 | LC-MS-Analytik, Proteinelution | Flüchtig; stechender Geruch; reduzierende Eigenschaften |
| Essigsäure / Acetat | 4,76 | 3,76 – 5,76 | HPLC, Enzymkinetik im Sauren | Bei mikrobieller Kontamination abbaubar; leicht flüchtig |
| MES (Good-Puffer) | 6,15 | 5,15 – 7,15 | Pflanzenzellkultur, Proteinstabilität | Höhere Materialkosten; geringe Bindung an Metallionen |
| Phosphat (`H₂PO₄⁻ / HPO₄²⁻`) | 7,21 | 6,21 – 8,21 | PBS-Puffer, Zellkultur, Diagnostik | Fällt `Ca²⁺`, `Mg²⁺` und Schwermetalle aus; hemmt Kinasen |
| Tris (Trometamol) | 8,07 | 7,07 – 9,07 | Elektrophorese (TAE/TBE), Molekularbiologie | Starker Temperatureffekt (`−0,028 pH/K`); reagiert mit Aldehyden |
| Ammoniak / Ammonium | 9,25 | 8,25 – 10,25 | Komplexometrische Titration, Galvanik | Ausgasen von `NH₃` bei offener Lagerung; toxisch für Zellen |

## Praktische Herstellung, Kalibrierung und typische Fehlerquellen

In der professionellen Laborpraxis lassen sich Pufferlösungen auf zwei Wegen ansetzen: durch **direktes Einwiegen** der beiden korrespondierenden Reinstoffe (wie im obigen Rechenbeispiel) oder durch **partielle Titration** einer einzelnen Säure- bzw. Basenlösung mit starker Natronlauge oder Salzsäure unter pH-Meter-Kontrolle. Bei der zweiten Methode müssen Sie beachten, dass durch das Gegenion (`Na⁺` oder `Cl⁻`) die Ionenstärke steigt und sich bei Verwendung von konzentrierter `NaOH` das Volumen leicht erhöht.

Unabhängig von der Methode sollten feste Puffersalze zunächst in etwa **80 % des Zielvolumens** an hochreinem, CO₂-armem Wasser gelöst werden. Anschließend wird der pH-Wert mit einem frisch zweipunkt- oder dreipunktkalibrierten pH-Meter **bei genau jener Temperatur** feinjustiert, bei der die Lösung später verwendet wird. Erst danach füllen Sie die Lösung im geeichten Messkolben exakt bis zur Eichmarke auf.

Vermeiden Sie bei Herstellung und Lagerung typische Praxisprobleme:

- **Hydratwasser in der Einwaage übersehen:** Handelsübliche Puffersalze liegen häufig als Hydrate vor, etwa `NaH₂PO₄ · H₂O` (`137,99 g/mol`) oder `Na₂HPO₄ · 2 H₂O` (`177,99 g/mol`). Verwenden Sie stets die Molmasse exakt jener Hydratstufe, die auf Ihrem Reagenzglas vermerkt ist.
- **CO₂-Aufnahme aus der Raumluft:** Alkalische Puffer oberhalb von pH 8,0 absorbieren fortlaufend Kohlendioxid aus der Luft und bilden Kohlensäure, wodurch der pH-Wert über Tage hinweg langsam sinkt. Lagern Sie solche Puffer in dicht verschlossenen Flaschen mit minimalem Kopfraum.
- **Elektrodenfehler bei Tris-Puffern:** Standard-pH-Elektroden mit einfacher Keramikdiaphragma-Referenz können in Tris-Lösungen durch Komplexbildung mit Silberionen (`Ag⁺` aus der `Ag/AgCl`-Bezugselektrode) träge reagieren oder Drift zeigen; hier sind doppelte Referenzsysteme (Double-Junction-Elektroden) vorzuziehen.
