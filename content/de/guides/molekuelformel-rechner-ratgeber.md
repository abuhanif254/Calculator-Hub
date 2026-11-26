---
title: "Molekülformel: Die wahre Verbindung finden"
description: "Lernen Sie den Unterschied zwischen empirischer Formel und Molekülformel, berechnen Sie die echten Atome, und nutzen Sie unseren Rechner."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molecular-formula-calculator"
relatedType: "calculator"
faqs:
  - question: "Welche beiden Angaben sind zwingend nötig, um aus einer Analyse die Molekülformel zu bestimmen?"
    answer: "Sie benötigen erstens die empirische Formel (Verhältnisformel) der Verbindung und zweitens ihre experimentell bestimmte wahre molare Masse in g/mol (beispielsweise aus der Massenspektrometrie oder einer Dampfdichtemessung). Ohne Kenntnis der Gesamtmolmasse lässt sich der ganzzahlige Multiplikator n nicht eindeutig festlegen."
  - question: "Kann die Molekülformel identisch mit der empirischen Formel sein?"
    answer: "Ja, immer dann, wenn der ganzzahlige Multiplikator n exakt 1 beträgt. Beispiele dafür sind Formaldehyd (CH₂O), Wasser (H₂O), Methan (CH₄) oder Ammoniak (NH₃), da ihre Atomzahlen bereits keinen gemeinsamen Teiler größer als 1 mehr besitzen."
  - question: "Reicht die Molekülformel allein aus, um eine Substanz eindeutig zu identifizieren?"
    answer: "Nein, die Summenformel gibt nur Art und exakte Anzahl der Atome im Molekül an, sagt aber nichts über deren Verknüpfung (Konstitution) oder räumliche Anordnung aus. So teilen sich etwa Essigsäure, Methylformiat und Glykolaldehyd exakt dieselbe Molekülformel C₂H₄O₂."
  - question: "Wie hilft das Doppelbindungsäquivalent (DBE) bei der Prüfung meiner berechneten Molekülformel?"
    answer: "Das Doppelbindungsäquivalent DBE = C − H/2 − X/2 + N/2 + 1 berechnet die Summe aller Mehrfachbindungen und Ringe im Molekül. Für eine stabile, ungeladene organische Verbindung muss der DBE-Wert zwingend eine nicht-negative ganze Zahl (0, 1, 2, ...) ergeben; ein halbzahliger oder negativer Wert weist auf einen Rechenfehler oder ein Radikal hin."
  - question: "Warum weicht die im Massenspektrometer gemessene Masse manchmal leicht von der Tabellenmolmasse ab?"
    answer: "Ein hochauflösendes Massenspektrometer misst die exakte monoisotopische Masse des häufigsten Einzelisotops (z. B. ¹²C = 12,0000 u, ³⁵Cl = 34,9689 u), während die klassische chemische Molmasse den gewichteten Durchschnitt aller natürlichen Isotope (z. B. Cl = 35,45 g/mol) abbildet. Bei großen oder halogenhaltigen Molekülen muss dieser Unterschied berücksichtigt werden."
---

Die Molekülformel – auch Summenformel genannt – gibt die tatsächliche, absolute Anzahl jedes chemischen Elements innerhalb eines einzelnen Moleküls an. Sie entsteht durch Multiplikation aller tiefgestellten Indizes der empirischen Formel (Verhältnisformel) mit einem ganzzahligen Faktor `n`, der sich aus dem Verhältnis der experimentell gemessenen molaren Masse zur molaren Masse der Verhältnisformel ergibt.

Während die Verhältnisformel lediglich den kleinsten gemeinsamen Baustein abbildet (etwa `CH₂O`), unterscheidet erst die Molekülformel exakt zwischen Formaldehyd (`CH₂O`), Essigsäure (`C₂H₄O₂`), Milchsäure (`C₃H₆O₃`) und Glucose (`C₆H₁₂O₆`). Mit unserem [Molekülformel-Rechner](/de/rechner/molekuelformel-rechner) ermitteln Sie den exakten Vervielfachungsfaktor `n`, generieren die vollständige Summenformel und vermeiden Rundungsfehler bei der Auswertung von Labordaten.

## Methodik, Formeln und experimentelle Molmassenbestimmung

Der Übergang von der empirischen Formel zur wahren Molekülformel folgt drei klar definierten Rechenschritten:

```text
1. Empirische Formelmasse:   M_emp = Σ (ν_i × M_i)
2. Ganzzahliger Faktor:       n = M_molar / M_emp   (gerundet auf n ∈ ℕ⁺)
3. Wahre Molekülformel:       (Empirische Formel)_n
Plausibilitätsprüfung (DBE):  DBE = C − H/2 − X/2 + N/2 + 1   (X = F, Cl, Br, I)
```

Die einzelnen Größen besitzen folgende Bedeutung:

- **Indizes der Verhältnisformel (`ν_i`):** Die kleinsten ganzzahligen Atomverhältnisse aus der Elementaranalyse.
- **Empirische Formelmasse (`M_emp`):** Die molare Masse genau einer Formeleinheit der Verhältnisformel in `g/mol`.
- **Wahre molare Masse (`M_molar`):** Die experimentell bestimmte Gesamtmasse pro Mol der Verbindung.
- **Multiplikator (`n`):** Eine positive ganze Zahl (`1, 2, 3, ...`), um die das Grundverhältnis im realen Molekül vervielfacht vorliegt.

### Wie wird `M_molar` im Labor gemessen?

In der modernen Analytik liefert vor allem die **Massenspektrometrie (MS)** über den Molekülionenpeak `[M]⁺•` oder das quasimolekulare Ion `[M+H]⁺` (abzüglich `1,0073 u` für das Proton) die präzise Molmasse. Bei flüchtigen Substanzen lässt sich `M_molar` klassisch über die Gasdichte und das ideale Gasgesetz (`M = (m × R × T) / (p × V)`) ermitteln, während bei nicht-flüchtigen Feststoffen die Gefrierpunktserniedrigung (Kryoskopie: `ΔT = K_g × b`) oder die Siedepunktserhöhung (Ebullioskopie) genutzt wird.

## Schritt-für-Schritt-Beispiel: Von `CH₂O` zur unbekannten Verbindung

Eine analysierte Reinsubstanz besitzt die empirische Formel **`CH₂O`**. Im Massenspektrometer wird eine wahre molare Masse von **`180,16 g/mol`** ermittelt.

### Schritt 1: Empirische Formelmasse berechnen

Summieren Sie die Standardatomgewichte von `1 × C`, `2 × H` und `1 × O`:
- `M_emp(CH₂O) = (1 × 12,011 g/mol) + (2 × 1,008 g/mol) + (1 × 15,999 g/mol) = 30,026 g/mol`.

### Schritt 2: Multiplikator `n` bestimmen

Teilen Sie die gemessene Gesamtmolmasse durch die empirische Masse:
- `n = 180,16 g/mol / 30,026 g/mol = 6,0001 ≈ 6`.

### Schritt 3: Indizes multiplizieren und prüfen

Multiplizieren Sie jeden Index in `CH₂O` mit `n = 6`:
- `C: 1 × 6 = 6`
- `H: 2 × 6 = 12`
- `O: 1 × 6 = 6`

Die gesuchte Molekülformel lautet **`C₆H₁₂O₆`** (zum Beispiel D-Glucose oder D-Fructose). Zur Plausibilitätsprüfung dient das Doppelbindungsäquivalent: `DBE = 6 − 12/2 + 1 = 1`. Das stimmt exakt mit der Struktur eines Monosaccharids überein, das in offenkettiger Form eine Carbonyl-Doppelbindung (`C=O`) oder in der Ringform einen Pyranose- bzw. Furanose-Ring aufweist.

Läuft derselbe Vergleich mit einer gemessenen Molmasse von `60,05 g/mol`, ergibt sich `n = 60,05 / 30,026 = 2,000` und damit die völlig andere Substanz **`C₂H₄O₂`** (Essigsäure).

## Vergleich: Identische Verhältnisformel, verschiedene Moleküle

Die Tabelle zeigt an drei bekannten Familien, wie stark sich physikalische und chemische Eigenschaften trotz identischer empirischer Formel mit dem Faktor `n` verändern:

| Empirische Formel (`M_emp`) | Faktor `n` | Wahre Molekülformel | Molare Masse (`g/mol`) | DBE | Reale Verbindung & typische Eigenschaft |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CH₂O` (`30,03 g/mol`) | `1` | `CH₂O` | `30,03` | `1` | Formaldehyd (stechendes Gas, Siedepunkt `−19 °C`) |
| `CH₂O` (`30,03 g/mol`) | `2` | `C₂H₄O₂` | `60,05` | `1` | Essigsäure (starke organische Säure, Siedepunkt `118 °C`) |
| `CH₂O` (`30,03 g/mol`) | `3` | `C₃H₆O₃` | `90,08` | `1` | Milchsäure (chirale Hydroxycarbonsäure) |
| `CH₂O` (`30,03 g/mol`) | `6` | `C₆H₁₂O₆` | `180,16` | `1` | D-Glucose (kristalliner Zucker, Feststoff) |
| `CH` (`13,02 g/mol`) | `2` | `C₂H₂` | `26,04` | `2` | Ethin / Acetylen (Brenngas mit Dreifachbindung) |
| `CH` (`13,02 g/mol`) | `6` | `C₆H₆` | `78,11` | `4` | Benzol (aromatischer Ring, flüssiges Lösungsmittel) |
| `NO₂` (`46,01 g/mol`) | `2` | `N₂O₄` | `92,01` | `—` | Distickstofftetroxid (farbloses Dimer von braunem `NO₂`) |

## Strukturaufklärung, Isomerie und analytische Stolpersteine

In der pharmazeutischen Wirkstoffforschung, forensischen Toxikologie und Naturstoffchemie bildet die Molekülformel den zentralen Filter zur Identifikation unbekannter Substanzen in Datenbanken. Moderne hochauflösende Massenspektrometer (HRMS, z. B. Orbitrap oder FT-ICR) bestimmen die Masse auf unter `5 ppm` genau und schränken die möglichen Elementkombinationen bereits direkt über den Massendefekt ein.

### Kritische Grenzen und Fehlerquellen

- **Verwechslung von Summenformel und Konstitution (Isomerie):** Eine korrekte Molekülformel identifiziert noch keine eindeutige Struktur. Für `C₆H₁₂O₆` existieren Dutzende verschiedene Hexosen und offenkettige Polyhydroxycarbonyl-Verbindungen. Zur Strukturaufklärung sind zwingend ergänzende Methoden wie NMR-Spektroskopie, IR-Spektroskopie oder Röntgenkristallographie erforderlich.
- **Addukt- und Fragmentionen in der Massenspektrometrie:** Im ESI-MS treten neben `[M+H]⁺` häufig Natriumaddukte (`[M+Na]⁺`, `+22,99 u`) oder Dimere (`[2M+H]⁺`) auf. Wer ein Dimer-Signal irrtümlich als wahre Molmasse verwendet, verdoppelt den Faktor `n` fälschlich.
- **Isotopeneffekte bei Halogenen und Metallen:** Während die empirische Berechnung mit gemittelten Atommassen arbeitet, zeigt ein Massenspektrum bei Brom (`⁷⁹Br` und `⁸¹Br` nahezu `1:1`) oder Chlor (`³⁵Cl` und `³⁷Cl` ca. `3:1`) charakteristische Isotopencluster. Prüfen Sie bei abweichenden `n`-Werten stets, ob der Peak der monoisotopischen oder der gemittelten Masse entspricht.
- **Anwendungsgrenzen bei Ionenkristallen:** Für Salze (`NaCl`, `CaCO₃`) oder Metalle existiert keine diskrete Molekülgröße im Festkörper; dort endet die sinnvolle Formelbestimmung bei der empirischen Formeleinheit.
