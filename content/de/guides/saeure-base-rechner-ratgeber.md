---
title: "Säure-Base-Rechner: Neutralisation verstehen"
description: "Berechnen Sie Neutralisationsreaktionen und Titrationsvolumina präzise, berücksichtigen Sie mehrwertige Säuren und bestimmen Sie den wahren pH am Äquivalenzpunkt."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "acid-base-calculator"
relatedType: "calculator"
faqs:
  - question: "Liegt der pH-Wert am Äquivalenzpunkt einer Neutralisation immer exakt bei 7,0?"
    answer: "Nein, pH 7,00 gilt bei 25 °C nur für die Reaktion einer starken Säure mit einer starken Base (z. B. HCl und NaOH). Titriert man eine schwache Säure (Essigsäure) mit Natronlauge, entsteht eine schwach basische Acetatlösung mit einem Äquivalenzpunkt oberhalb von pH 8. Bei starker Säure und schwacher Base liegt der Äquivalenzpunkt dagegen unter pH 7."
  - question: "Warum reicht die einfache Formel Ma × Va = Mb × Vb bei Schwefelsäure nicht aus?"
    answer: "Die Gleichung Ma × Va = Mb × Vb setzt eine 1:1-Stöchiometrie voraus. Da ein Molekül Schwefelsäure (H₂SO₄) jedoch zwei Protonen abgeben kann (Wertigkeit z_S = 2), benötigt 1 mol H₂SO₄ zur vollständigen Neutralisation 2 mol Natronlauge (NaOH). Es muss stets die erweiterte Form z_S × c_S × V_S = z_B × c_B × V_B verwendet werden."
  - question: "Was ist der Unterschied zwischen Äquivalenzpunkt und Endpunkt bei einer Titration?"
    answer: "Der Äquivalenzpunkt ist der theoretische stöchiometrische Punkt, an dem exakt äquivalente Stoffmengen an Säure und Base reagiert haben. Der Endpunkt hingegen ist der experimentell beobachtete Punkt, an dem ein Farbindikator umschlägt. Ein unpassender Indikator erzeugt einen systematischen Titrierfehler."
  - question: "Warum entsteht bei jeder Neutralisation von Säure und Base Wärme?"
    answer: "Die eigentliche Nettoreaktion zwischen freien Hydronium- und Hydroxidionen (H₃O⁺ + OH⁻ → 2 H₂O) ist stark exotherm. Bei starken Säuren und Basen beträgt die molare Neutralisationsenthalpie etwa −57,3 kJ/mol, weshalb konzentrierte Ansätze gekühlt oder kontrolliert verdünnt werden müssen."
  - question: "Wie wählt man den richtigen Indikator für eine Säure-Base-Titration aus?"
    answer: "Der Umschlagsbereich des Farbindikators muss möglichst genau den steilen pH-Sprung rund um den theoretischen Äquivalenzpunkt abdecken. Für Essigsäure mit Natronlauge (Äquivalenzpunkt ca. pH 8,7) eignet sich Phenolphthalein (Umschlag 8,2–10,0), während Methylorange (3,1–4,4) viel zu früh umschlagen würde."
---

Bei einer **Neutralisationsreaktion** übertragen Säuren ihre Protonen auf Basen, sodass sich ihre ätzenden und korrosiven Eigenschaften gegenseitig aufheben und im Kern Wasser sowie ein gelöstes Salz entstehen. In der analytischen Chemie und im Qualitätslabor bildet genau diese stöchiometrische Reaktion die Grundlage der **Säure-Base-Titration** (Acidimetrie und Alkalimetrie), mit der sich unbekannte Konzentrationen hochpräzise bestimmen lassen.

Entgegen einem verbreiteten Missverständnis bedeutet der **Äquivalenzpunkt** (`n(H⁺) = n(OH⁻)`) jedoch nicht automatisch einen pH-Wert von `7,00`: Entscheidend sind sowohl die Wertigkeit (Anzahl abgebbarer Protonen bzw. Hydroxidionen) als auch die Säure- und Basenstärken der Reaktionspartner. Mit unserem [Säure-Base-Rechner](/de/rechner/saeure-base-rechner) lösen Sie Titrationsgleichungen für Volumina und Molaritäten in Sekunden ohne Umstellungsfehler.

## Stöchiometrie und allgemeine Titrationsgleichung

Im Brønsted-Lowry-Modell lässt sich die Neutralisation starker wässriger Lösungen auf die Bildung von Wasser reduzieren: `H₃O⁺ + OH⁻ → 2 H₂O`. Für die quantitative Berechnung am Äquivalenzpunkt müssen die abgegebenen Protonen-Äquivalente der Säure exakt den aufgenommenen Hydroxid-Äquivalenten der Base entsprechen:

```text
n_äq(Säure) = n_äq(Base)
z_S × c_S × V_S = z_B × c_B × V_B
```

Die Parameter dieser Titrationsgleichung umfassen:

- **`z_S` (Protonenwertigkeit der Säure):** Anzahl der neutralisierbaren `H⁺`-Ionen pro Molekül (z. B. `1` bei `HCl` oder `CH₃COOH`; `2` bei `H₂SO₄`; `3` bei `H₃PO₄`).
- **`c_S` und `V_S` (Konzentration und Volumen der Säure):** Stoffmengenkonzentration in `mol/L` und eingesetztes Lösungsvolumen (z. B. in `mL` oder `L`, solange beide Seiten dieselbe Volumeneinheit verwenden).
- **`z_B` (Hydroxidwertigkeit der Base):** Anzahl der aufnehmbaren Protonen bzw. abgegebenen `OH⁻`-Ionen pro Formeleinheit (`1` bei `NaOH`, `KOH`, `NH₃`; `2` bei `Ca(OH)₂` oder `Na₂CO₃`).
- **`c_B` und `V_B` (Konzentration und Volumen der Base):** Molarität in `mol/L` und verbrauchtes Maßlösungs- bzw. Vorlagevolumen.

Das Produkt `z × c` wird in der älteren Maßanalyse auch als **Normalität (`N`)** bezeichnet (`N_S × V_S = N_B × V_B`). Wer direkt mit der modernen Stoffmengenkonzentration (`mol/L`) und den expliziten Wertigkeiten `z_S` und `z_B` rechnet, vermeidet Verwechslungen bei mehrstufigen Reaktionen.

## Schritt-für-Schritt-Beispiele: Stöchiometrie und Äquivalenz-pH

Die drei folgenden Rechenbeispiele zeigen einwertige Titrationen, mehrwertige Ansätze sowie die Bestimmung des echten pH-Werts am Äquivalenzpunkt.

### Beispiel 1: Klassische 1:1-Titration (`HCl` mit `NaOH`)

Zur Gehaltsbestimmung werden `25,0 mL` einer Salzsäure-Probe (`z_S = 1`) mit einer eingestellten `0,100 mol/L` Natronlauge (`z_B = 1`) bis zum Äquivalenzpunkt titriert. Der Bürettenverbrauch beträgt `18,4 mL`.

```text
c_S = (z_B × c_B × V_B) / (z_S × V_S)
c_S = (1 × 0,100 mol/L × 18,4 mL) / (1 × 25,0 mL) = 0,0736 mol/L
```

### Beispiel 2: Zweiwertige Säure (`H₂SO₄` mit `NaOH`)

Wie viel `0,200 mol/L` Natronlauge (`z_B = 1`) wird benötigt, um `20,0 mL` einer `0,150 mol/L` Schwefelsäure (`z_S = 2`) vollständig zu neutralisieren?

1. **Säure-Äquivalente berechnen:** `n_äq(Säure) = 2 × 0,150 mol/L × 0,0200 L = 0,00600 mol = 6,00 mmol`.
2. **Benötigtes Laugenvolumen auflösen:** `V_B = (2 × 0,150 × 20,0 mL) / (1 × 0,200) = 30,0 mL`.

### Beispiel 3: Warum Essigsäure + `NaOH` am Äquivalenzpunkt alkalisch ist

Titriert man `25,0 mL` Essigsäure (`0,100 mol/L`, `pKa = 4,76`) mit `25,0 mL` Natronlauge (`0,100 mol/L`), liegen am Äquivalenzpunkt `50,0 mL` einer reinen `0,0500 mol/L` Natriumacetat-Lösung vor. Da das Acetat-Ion (`CH₃COO⁻`, `pKb = 14,00 − 4,76 = 9,24`) als schwache Base geringfügig mit Wasser zu Essigsäure und `OH⁻` zurückreagiert, gilt:

```text
pOH ≈ 0,5 × (9,24 − log₁₀(0,0500)) = 0,5 × (9,24 + 1,301) = 5,27
pH = 14,00 − 5,27 = 8,73
```

Der Äquivalenzpunkt liegt somit eindeutig im alkalischen Bereich bei **pH 8,73** und nicht bei 7,00.

## Titrationsszenarien, Äquivalenzpunkte und Indikatorwahl

Die Wahl der Nachweismethode hängt unmittelbar vom Stoffsystem ab:

| Titrationssystem (Analyt + Titrant) | Stöchiometrie (`z_S : z_B`) | pH am Äquivalenzpunkt (25 °C) | Dominierende Spezies am ÄP | Geeigneter Farbindikator (Umschlagsbereich) |
| :--- | :--- | :--- | :--- | :--- |
| Starke Säure + Starke Base (`HCl + NaOH`) | 1 : 1 | 7,00 | `Na⁺`, `Cl⁻` (keine Hydrolyse) | Bromthymolblau (pH 6,0–7,6) |
| Zweiwertige Säure + Starke Base (`H₂SO₄ + NaOH`) | 2 : 1 | ~7,00 | `Na⁺`, `SO₄²⁻` (sehr schwache Base) | Bromthymolblau (pH 6,0–7,6) |
| Schwache Säure + Starke Base (`CH₃COOH + NaOH`) | 1 : 1 | > 7 (z. B. 8,73) | `CH₃COO⁻` (basische Hydrolyse) | Phenolphthalein (pH 8,2–10,0) |
| Starke Säure + Schwache Base (`HCl + NH₃`) | 1 : 1 | < 7 (z. B. 5,28) | `NH₄⁺` (saure Hydrolyse) | Methylrot (pH 4,4–6,2) |
| Schwache Säure + Schwache Base (`CH₃COOH + NH₃`) | 1 : 1 | ≈ 7,0 (flacher Sprung) | `CH₃COO⁻`, `NH₄⁺` | Potentiometrie / Konduktometrie (kein scharfer Farbumschlag) |
| Carbonatlösung + Starke Säure (`Na₂CO₃ + HCl`) | 1 : 2 (2 Stufen) | ~8,3 (1.) / ~3,8 (2.) | `HCO₃⁻` (1.) bzw. `H₂CO₃*` (2.) | Phenolphthalein (1.) / Methylorange (2.) |

## Laborpraxis, Sicherheitshinweise und häufige Rechenfehler

In der **Lebensmittelanalytik** bestimmt die Neutralisationstitration den Gesamtsäuregehalt von Wein, Fruchtsäften oder Speiseessig, während in der **Umwelt- und Wasserwirtschaft** die Pufferkapazität (*Säurekapazität Ks 4,3* bzw. *Basekapazität Kb 8,2* nach DIN 38409-7) ermittelt wird. In der **Abwassertechnik** werden saure oder alkalische Produktionsströme vor der Einleitung in die Kanalisation automatisiert auf den zulässigen Korridor (meist `pH 6,5` bis `9,5`) neutralisiert.

Für sichere Experimente und fehlerfreie Ergebnisse sollten Sie vier Punkte beachten:

1. **Wärmeentwicklung und Verdünnungsregel:** Bei Neutralisationen wird pro Mol reagiertem `H₃O⁺` eine Reaktionswärme von rund `57,3 kJ` frei. Konzentrierte Säuren oder Laugen dürfen niemals direkt unkontrolliert gemischt werden; beim Verdünnen von Schwefelsäure gilt strikt: *„Erst das Wasser, dann die Säure“*, um Siedeverzüge zu verhindern.
2. **Titerverlust durch Kohlendioxid:** Natronlauge-Maßlösungen nehmen an der Luft rasch `CO₂` auf und bilden Natriumcarbonat (`Na₂CO₃`). Vor präzisen Analysen muss der tatsächliche Titer gegen einen Urtiter wie Kaliumhydrogenphthalat (KHP) überprüft werden.
3. **Indikatorfehler vermeiden:** Wird Essigsäure irrtümlich mit Methylorange titriert, schlägt der Indikator schon im Pufferbereich (`pH ~4,4`) weit vor dem Äquivalenzpunkt (`pH 8,73`) um — der berechnete Säuregehalt fällt massiv zu niedrig aus.
4. **Vergessene Volumenverdünnung:** Nach dem Mischen zweier Lösungen müssen die Teilvolumina stets zum Gesamtvolumen (`V_ges = V_S + V_B`) addiert werden, wenn anschließend der pH-Wert des entstandenen Puffers oder Salzes berechnet wird.
