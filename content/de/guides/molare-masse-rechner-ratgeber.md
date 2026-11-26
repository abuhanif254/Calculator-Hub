---
title: "Molare Masse: Das Periodensystem lesen"
description: "Lernen Sie, Standardatomgewichte im Periodensystem korrekt zu lesen, die molare Masse komplexer Verbindungen und Hydrate zu bestimmen und unseren Rechner zu nutzen."
category: "Math & Science"
relatedCalculator: "molar-mass-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Worin unterscheiden sich die Atommasse in u und die molare Masse in g/mol?"
    answer: "Die Atommasse gibt die Masse eines einzelnen Atoms in der atomaren Masseneinheit u (Dalton) an. Die molare Masse gibt die Masse von genau einem Mol Teilchen in g/mol an. Zahlenmäßig stimmen beide Werte praktisch exakt überein; durch die SI-Neudefinition von 2019 liegt die Abweichung zur molaren Massenkonstante M_u = 1 g/mol lediglich im Bereich von etwa 10⁻¹⁰ und ist im Laboralltag vernachlässigbar."
  - question: "Warum stehen im Periodensystem Dezimalzahlen wie 35,45 bei Chlor statt ganzer Zahlen?"
    answer: "Natürliche Elemente bestehen meist aus mehreren stabilen Isotopen mit unterschiedlichen Neutronenzahlen. Natürliches Chlor setzt sich etwa zu 75,76 % aus ³⁵Cl und zu 24,24 % aus ³⁷Cl zusammen. Das Standardatomgewicht von 35,453 ist der nach der natürlichen irdischen Häufigkeit gewichtete Mittelwert dieser Isotope."
  - question: "Wie berücksichtigt man Klammern und Kristallwasser in einer Summenformel?"
    answer: "Ein tiefgestellter Index hinter einer Klammer multipliziert alle Elemente innerhalb der Klammer – bei Ca(NO₃)₂ liegen also 1 Calcium-, 2 Stickstoff- und 6 Sauerstoffatome vor. Bei Hydraten wie CuSO₄ · 5 H₂O addieren Sie zusätzlich die fünffache molare Masse von Wasser (5 × 18,015 g/mol = 90,075 g/mol) zur wasserfreien Salzmasse."
  - question: "Was bedeuten Zahlen in eckigen Klammern wie [226] bei manchen Elementen?"
    answer: "Radioaktive Elemente ohne stabile Isotope besitzen keine konstante natürliche Isotopenzusammensetzung. Anstelle eines Standardatomgewichts führt die IUPAC in diesen Fällen die Massenzahl des langlebigsten bekannten Isotops in eckigen Klammern auf, etwa [226] für Radium oder [222] für Radon."
  - question: "Auf wie viele Nachkommastellen sollte man molare Massen in der Analytik runden?"
    answer: "Für überschlägige Rechnungen genügen zwei Nachkommastellen. In der quantitativen Analytik – etwa bei Maßlösungen für Titrationen, HPLC-Kalibrierstandards oder nach dem Europäischen Arzneibuch (Ph. Eur.) – sollten Sie mindestens vier signifikante Stellen bzw. drei Nachkommastellen verwenden, damit Rundungsfehler kleiner als die Toleranz moderner Analysenwaagen bleiben."
---

Wer für eine Reaktion oder eine Pufferlösung eine bestimmte Stoffmenge abwiegen möchte, muss wissen, wie viel Gramm exakt einem Mol des jeweiligen Stoffes entsprechen. Diese Kenngröße heißt **molare Masse** (`M`) und wird in **Gramm pro Mol** (`g/mol`) angegeben. Sie verbindet das abstrakte Zählmaß der Chemie mit der konkreten Einwaage auf der Laborwaage.

Die Grundlage für jede Bestimmung der molaren Masse bildet das **Periodensystem der Elemente** und dessen standardisierte relative Atommassen. Bei kleinen Molekülen gelingt die Addition per Hand in wenigen Sekunden; bei organischen Wirkstoffen, Polymerbausteinen oder hydratisierten Komplexsalzen spart unser [Molare Masse Rechner](/de/rechner/molare-masse-rechner) wertvolle Zeit und schließt Tipp- sowie Additionsfehler zuverlässig aus.

## Grundlagen: Standardatomgewichte, Isotope und Summenformeln

In jedem Feld des Periodensystems steht neben dem Elementsymbol und der Ordnungszahl das **Standardatomgewicht** (`A_r`), das von der *Commission on Isotopic Abundances and Atomic Weights* (CIAAW) der IUPAC regelmäßig überprüft wird. Dieser Wert ist kein Einzelmesswert eines bestimmten Atoms, sondern der mit den natürlichen Isotopenhäufigkeiten gewichtete Durchschnittswert:

```
A_r(Element) = Σ (x_i × A_r,i)
```

Hierbei steht `x_i` für den Stoffmengenanteil des jeweiligen stabilen Isotops auf der Erde und `A_r,i` für dessen relative Isotopenmasse. Für eine beliebige chemische Verbindung ergibt sich die molare Masse `M` als Summe aller beteiligten Elementmassen, multipliziert mit ihrem stöchiometrischen Index `ν_i` in der Summenformel:

```
M(Verbindung) = Σ (ν_i × A_r,i × M_u)     mit M_u ≈ 1 g/mol
```

In der chemischen Nomenklatur sollten dabei drei verwandte Begriffe sauber getrennt werden:

- **Molekularmasse vs. Formelmasse:** Bei diskreten Molekülen wie Wasser (`H₂O`) oder Glukose (`C₆H₁₂O₆`) spricht man von der Molekularmasse. Bei Salzen mit ausgedehntem Ionengitter wie Natriumchlorid (`NaCl`) existieren keine isolierten Moleküle; hier bezeichnet man den Wert präziser als **Formelmasse**.
- **Mittlere molare Masse vs. Monoisotopenmasse:** Für Einwaagen auf der Waage gilt immer die über alle natürlichen Isotope gemittelte molare Masse. In der hochauflösenden Massenspektrometrie (HRMS) hingegen detektiert man die einzelnen Isotopenpeaks getrennt und rechnet mit der **Monoisotopenmasse** des jeweils häufigsten Isotops (z. B. exakt `12,0000 u` für ¹²C).
- **IUPAC-Intervallnotation:** Für Elemente mit leicht variierender natürlicher Isotopenverteilung (z. B. Wasserstoff, Kohlenstoff, Sauerstoff oder Schwefel) veröffentlicht die IUPAC offizielle Wertebereiche wie `[12,0096; 12,0116]` für Kohlenstoff sowie konventionelle Einzelwerte (`12,011`) für den allgemeinen Laborgebrauch.

## Schritt-für-Schritt-Beispiel: Molare Masse eines Komplexsalzes und eines Hydrats

In der Laborpraxis entstehen die häufigsten Rechenfehler nicht bei einfachen Zweistoffverbindungen, sondern bei geklammerten Funktionsgruppen und Kristallwasser-Hydraten. Die folgende Zweifach-Rechnung zeigt das sichere Vorgehen.

### Beispiel A: Calciumnitrat `Ca(NO₃)₂` (Klammerauflösung)

Zuerst werden die tiefgestellten Indizes korrekt aufgelöst. Der Index `2` hinter der Klammer gilt für jedes Element innerhalb der Klammer:

- **Calcium (`Ca`):** `1 × 40,078 g/mol = 40,078 g/mol`
- **Stickstoff (`N`):** `1 × 2 = 2` Atome → `2 × 14,007 g/mol = 28,014 g/mol`
- **Sauerstoff (`O`):** `3 × 2 = 6` Atome → `6 × 15,999 g/mol = 95,994 g/mol`

```
M(Ca(NO₃)₂) = 40,078 + 28,014 + 95,994 = 164,086 g/mol
```

### Beispiel B: Kupfer(II)-sulfat-Pentahydrat `CuSO₄ · 5 H₂O` (Hydrat)

Der Mittelpunkt (`·`) in einer Hydratformel bedeutet eine stöchiometrische Addition, keine Multiplikation der gesamten Formel. Zuerst berechnen Sie die wasserfreie Salzkomponente, anschließend das gebundene Kristallwasser:

```
1. Wasserfreies CuSO₄:
   Cu: 1 × 63,546 g/mol =  63,546 g/mol
   S:  1 × 32,060 g/mol =  32,060 g/mol
   O:  4 × 15,999 g/mol =  63,996 g/mol
   Zwischensumme CuSO₄  = 159,602 g/mol

2. Kristallwasser (5 H₂O):
   H₂O: 2 × 1,008 + 15,999 = 18,015 g/mol
   5 × H₂O = 5 × 18,015    = 90,075 g/mol

3. Gesamte molare Masse:
   M(CuSO₄ · 5 H₂O) = 159,602 + 90,075 = 249,677 g/mol
```

Würden Sie das Kristallwasser vergessen und für `1,00 mol` versehentlich nur `159,60 g` des blauen Pentahydrat-Salzes abwiegen, enthielte Ihre Lösung lediglich `0,639 mol` Kupferionen – ein gravierender Fehler von über **36 %**.

## Benchmark-Tabelle: Molare Massen wichtiger Laborverbindungen

Die Tabelle fasst sechs Standardsubstanzen aus anorganischer Analytik, Titrimetrie und Biochemie zusammen, gerechnet mit konventionellen IUPAC-Atomgewichten.

| Verbindung | Summenformel | Gesamtzahl Atome je Einheit | Molare Masse `M` (g/mol) | Einwaage für `0,100 mol` | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Wasser** | `H₂O` | 3 | `18,015` | `1,802 g` | Universelles Lösungsmittel, Reinstwasserstandard |
| **Natriumhydroxid** | `NaOH` | 3 | `39,997` | `4,000 g` | Maßlösung in der Säure-Base-Titration (Alkalimetrie) |
| **Schwefelsäure** | `H₂SO₄` | 7 | `98,072` | `9,807 g` | Starke Mineralsäure, Aufschlüsse, Katalyse |
| **Calciumnitrat** | `Ca(NO₃)₂` | 9 | `164,086` | `16,409 g` | Nährsalz, Kalibrierlösung für Ca²⁺-Ionen |
| **D-Glukose** | `C₆H₁₂O₆` | 24 | `180,156` | `18,016 g` | Biochemische Assays, Nährmedien, Kalibrierung |
| **Kupfersulfat-Pentahydrat** | `CuSO₄ · 5 H₂O` | 21 | `249,677` | `24,968 g` | Fehling-Lösung, Komplexometrie, Galvanik |

## Anwendungsfälle, Rundungsregeln und typische Fehlerquellen

In der chemischen Qualitätssicherung nach **DIN 32625** oder dem **Europäischen Arzneibuch (Ph. Eur.)** entscheidet die exakte Bestimmung der molaren Masse direkt über die Gehaltsbestimmung von Wirkstoffen und Referenzmaterialien. Beachten Sie bei der praktischen Arbeit vier kritische Fallstricke:

- **Hygroskopie und tatsächlicher Wassergehalt:** Stoffe wie Natriumhydroxid (`NaOH`) ziehen rasch Luftfeuchtigkeit und Kohlenstoffdioxid aus der Umgebungsluft an, sodass sich eine Kruste aus Natriumcarbonat bildet. Zudem enthalten viele handelsübliche Salze herstellungsbedingt wechselnde Hydratstufen (z. B. `Na₂HPO₄` wasserfrei vs. Dihydrat vs. Dodecahydrat). Prüfen Sie vor jeder Berechnung zwingend das Etikett des Vorratsgefäßes auf den genauen Hydratationsgrad.
- **Verwechslung von Groß- und Kleinschreibung:** Elementsymbole sind eindeutig über ihre Schreibweise definiert. `Co` bezeichnet das Übergangsmetall Cobalt (`58,933 g/mol`), während `CO` für das giftige Gas Kohlenstoffmonoxid (`28,010 g/mol`) steht. Bei der Eingabe in digitale Formularrechner führt eine falsche Groß- oder Kleinschreibung sofort zu unbrauchbaren Resultaten.
- **Zu starkes Runden bei hohen Stöchiometriefaktoren:** Werden gerundete Atomgewichte (etwa `C = 12` statt `12,011` oder `Cl = 35,5` statt `35,453`) in großen Molekülen mit 30 oder 50 Atomen aufsummiert, akkumuliert sich der Rundungsfehler schnell auf über `0,5 g/mol`. Verwenden Sie deshalb bis zum Endergebnis mindestens drei Nachkommastellen pro Element.
- **Isotopenangereicherte Substanzen:** Bei deuterierten Lösungsmitteln für die NMR-Spektroskopie (wie `CDCl₃` oder `D₂O`) oder ¹³C-markierten Standards für die LC-MS/MS-Analytik dürfen nicht die Standardatomgewichte aus dem regulären Periodensystem verwendet werden. Hier muss Deuterium (`²H`) mit `2,014 g/mol` statt `1,008 g/mol` eingesetzt werden, wodurch `D₂O` eine molare Masse von `20,027 g/mol` statt `18,015 g/mol` besitzt.
