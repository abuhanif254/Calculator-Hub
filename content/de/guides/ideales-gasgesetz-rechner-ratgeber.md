---
title: "Ideales Gasgesetz Rechner: PV = nRT"
description: "Verstehen Sie das ideale Gasgesetz, das präzise Zusammenspiel von Druck, Volumen, Stoffmenge und Temperatur sowie die Anwendung unseres Rechners."
category: "Math & Science"
relatedCalculator: "ideal-gas-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum muss die Temperatur im idealen Gasgesetz zwingend in Kelvin angegeben werden?"
    answer: "Die Gleichung PV = nRT setzt voraus, dass Druck und Volumen proportional zur mittleren kinetischen Energie der Gasteilchen sind. Nur die Kelvin-Skala beginnt beim absoluten Nullpunkt (0 K = −273,15 °C), an dem die thermische Molekülbewegung ruht. Die Verwendung von Grad Celsius würde bei 0 °C zu einer Division durch null und bei Minusgraden zu physikalisch unmöglichen negativen Drücken führen."
  - question: "Welche Gaskonstante R sollte man im DACH-Raum standardmäßig verwenden?"
    answer: "In der Physik, Chemie und Verfahrenstechnik ist die SI-Konstante R = 8,31446 J/(mol·K) der universelle Standard. Sie passt direkt zu Pascal und Kubikmetern sowie zu Kilopascal und Litern. Arbeitet man in der Drucktechnik mit Bar und Litern, empfiehlt sich der umgerechnete Wert R = 0,083145 bar·L/(mol·K)."
  - question: "Muss bei PV = nRT der Manometerdruck oder der Absolutdruck eingesetzt werden?"
    answer: "Es muss immer der absolute Druck eingesetzt werden. Typische Manometer an Gasflaschen, Kompressoren oder Reifen zeigen jedoch nur den relativen Überdruck gegenüber dem umgebenden Luftdruck an. Für exakte Berechnungen addieren Sie deshalb den aktuellen Atmosphärendruck (im Mittel 1,01325 bar) zum abgelesenen Überdruck."
  - question: "Wann weicht ein reales Gas spürbar vom idealen Gasgesetz ab?"
    answer: "Deutliche Abweichungen treten bei sehr hohen Drücken (ab etwa 20 bis 50 bar) und bei tiefen Temperaturen nahe dem Verflüssigungspunkt auf. Unter diesen Bedingungen sind das Eigenvolumen der Gasmoleküle sowie die Van-der-Waals-Anziehungskräfte zwischen ihnen nicht mehr vernachlässigbar, sodass reale Zustandsgleichungen nötig werden."
  - question: "Wie berechne ich aus der bekannten Gasmasse die Stoffmenge n?"
    answer: "Teilen Sie die Masse m des Gases in Gramm durch seine molare Masse M in Gramm pro Mol (n = m / M). Für reinen Stickstoff (N₂) beträgt M = 28,014 g/mol, für Sauerstoff (O₂) M = 31,998 g/mol und für trockene Luft im Mittel rund 28,96 g/mol."
---

Das ideale Gasgesetz beschreibt den thermodynamischen Zustand eines Gases über die universelle Zustandsgleichung `p × V = n × R × T` (häufig kurz `PV = nRT`). Es verknüpft den absoluten Druck `p`, das Volumen `V`, die Stoffmenge `n` und die absolute Temperatur `T` mithilfe der universellen Gaskonstante `R` zu einer einzigen geschlossenen Beziehung.

In der Praxis lässt sich damit jede der vier Zustandsgrößen exakt berechnen, sobald die übrigen drei bekannt sind – etwa die Gasmenge in einer Druckflasche, die Dichte eines Gasgemisches oder der Druckanstieg beim Erhitzen in einem geschlossenen Reaktor. Unser [Ideales Gasgesetz Rechner](/de/rechner/ideales-gas-gesetz-rechner) übernimmt die Umrechnung von Temperatureinheiten sowie die Auswahl des passenden `R`-Wertes automatisch.

## Die Zustandsgleichung PV = nRT und ihre Parameter

Das Modell des idealen Gases geht von drei vereinfachenden Annahmen aus: Die Gasmoleküle besitzen kein eigenes Volumen (Punktmassen), es wirken außer bei direkten Zusammenstößen keine Anziehungs- oder Abstoßungskräfte zwischen ihnen, und alle Stöße untereinander sowie mit der Behälterwand verlaufen vollkommen elastisch. Unter diesen Bedingungen lautet die Gleichung:

```text
p × V = n × R × T
```

Aufgelöst nach den vier Grundgrößen sowie in der massenbezogenen Form mit der molaren Masse `M` (`n = m / M`) und der Gasdichte `ρ = m / V` ergeben sich folgende Arbeitsformeln:

```text
p = (n × R × T) / V        V = (n × R × T) / p
n = (p × V) / (R × T)      T = (p × V) / (n × R)
p × V = (m / M) × R × T    ρ = (p × M) / (R × T)
```

Für fehlerfreie Ergebnisse sind folgende Definitionen und Umrechnungen maßgeblich:

- **`p` (Absoluter Druck):** Kraft pro Fläche in Pascal (`1 Pa = 1 N/m²`), Kilopascal (`1 kPa = 1.000 Pa`) oder Bar (`1 bar = 100.000 Pa`).
- **`V` (Volumen):** Der vom Gas eingenommene Raum in Kubikmetern (`m³`) oder Litern (`1 m³ = 1.000 L`).
- **`n` (Stoffmenge):** Anzahl der Gasteilchen in Mol (`mol`), wobei `1 mol` exakt `6,02214 × 10²³` Molekülen entspricht.
- **`R` (Universelle Gaskonstante):** Exakte Naturkonstante mit dem SI-Wert `R = 8,31446 J/(mol·K)`.
- **`T` (Absolute Temperatur):** Temperatur in Kelvin (`K`), berechnet über `T [K] = t [°C] + 273,15`.

## Schritt-für-Schritt-Beispiel: Druck in einer Stickstoffflasche

Eine industrielle Stahlflasche mit einem Innenvolumen von `V = 50,0 L` wird mit `m = 1,40 kg` (`1.400 g`) reinem Stickstoff (`N₂`, molare Masse `M = 28,014 g/mol`) befüllt. In der Lagerhalle herrscht eine konstante Temperatur von `t = 20,0 °C`. Gesucht ist der sich einstellende Absolutdruck in der Flasche in Pascal und Bar.

1. **Stoffmenge `n` aus der Masse bestimmen:**
   `n = m / M = 1.400 g / 28,014 g/mol = 49,975 mol`
2. **Temperatur in Kelvin umrechnen:**
   `T = 20,0 °C + 273,15 = 293,15 K`
3. **Volumen in SI-Einheiten angeben:**
   `V = 50,0 L = 0,0500 m³`
4. **Zustandsgleichung nach `p` auflösen und einsetzen:**
   `p = (n × R × T) / V`
   `p = (49,975 mol × 8,31446 J/(mol·K) × 293,15 K) / 0,0500 m³`
   Der Zähler liefert eine Energie von `121.808,26 J` (`Pa·m³`). Nach Division durch `0,0500 m³` folgt:
   `p = 2.436.165 Pa ≈ 2.436,2 kPa`
5. **Umrechnung in Bar und Abgleich mit dem Manometer:**
   Da `1 bar = 100.000 Pa` entspricht, beträgt der **Absolutdruck** `p = 24,36 bar`. Ein an der Flasche montiertes Manometer misst gegen den Umgebungsdruck (`1,01 bar`) und zeigt daher einen relativen Überdruck von rund `23,35 bar` an.

## Einheiten der Gaskonstante R im Überblick

Je nach Fachgebiet werden Druck und Volumen in unterschiedlichen Einheiten angegeben. Da `R` das Produkt `p × V` ins Verhältnis zu `n × T` setzt, muss der Zahlenwert von `R` zwingend zur gewählten Druck- und Volumeneinheit passen.

| Einheitensystem (`p`, `V`) | Zahlenwert von `R` | Exakte Einheit | Typisches Anwendungsgebiet |
| :--- | :--- | :--- | :--- |
| **SI-Basis (`Pa`, `m³`)** | `8,31446` | `J/(mol·K)` bzw. `Pa·m³/(mol·K)` | Physik, technische Thermodynamik |
| **Labor-Metrisch (`kPa`, `L`)** | `8,31446` | `kPa·L/(mol·K)` | Chemieunterricht, Prozessanalytik |
| **Drucktechnik (`bar`, `L`)** | `0,083145` | `bar·L/(mol·K)` | Gasflaschen, Pneumatik, Tauchsport |
| **Barometrie (`hPa`, `L`)** | `83,1446` | `hPa·L/(mol·K)` | Meteorologie, Wettermodelle |
| **Vakuumtechnik (`mbar`, `L`)** | `83,1446` | `mbar·L/(mol·K)` | Vakuumkammern, Leckratenprüfung |
| **Angloamerikanisch (`atm`, `L`)** | `0,082057` | `atm·L/(mol·K)` | Ältere Lehrbücher, US-Fachliteratur |

In der technischen Thermodynamik arbeitet man für einzelne Gase oft zusätzlich mit der **spezifischen Gaskonstante** `R_s = R / M` (für trockene Luft beispielsweise `R_s = 287,05 J/(kg·K)`). Dadurch lässt sich die Zustandsgleichung direkt mit der Masse schreiben als `p × V = m × R_s × T`.

## Normbedingungen, Modellgrenzen und häufige Fehlerquellen

Für den Vergleich von Gasvolumina über Standorte hinweg existieren genormte Referenzzustände, die sich leicht unterscheiden und in Ausschreibungen exakt benannt werden müssen:

- **Physikalischer Normzustand (DIN 1343):** `T_n = 273,15 K` (`0 °C`) und `p_n = 101.325 Pa` (`1,01325 bar`). Das molare Normvolumen eines idealen Gases beträgt hier `V_m = 22,414 L/mol`.
- **IUPAC-Standardzustand (STP seit 1982):** `T = 273,15 K` (`0 °C`) und `p = 100.000 Pa` (`1,00 bar`), entsprechend `V_m = 22,711 L/mol`.
- **Labor-Umgebungsstandard (SATP):** `T = 298,15 K` (`25 °C`) und `p = 100.000 Pa`, entsprechend `V_m = 24,790 L/mol`.

Bei der praktischen Anwendung von `PV = nRT` gilt es, Grenzen und typische Fehler zu beachten. Bei leichten Gasen wie Helium, Stickstoff oder Sauerstoff nahe Raumtemperatur und bis etwa `15 bar` liegt der Fehler des idealen Modells unter `1 %`. Bei hohen Drücken ab `50 bis 200 bar` oder tiefen Temperaturen nahe der Kondensation – etwa bei Kohlendioxid (`CO₂`) oder Kältemitteln – weicht der reale Zustand spürbar ab. Ingenieure korrigieren die Gleichung dann über den Realgasfaktor `Z` (`p × V = Z × n × R × T`) oder wechseln zur Van-der-Waals-Gleichung.

Vermeiden Sie bei jeder Berechnung zudem drei klassische Eingabefehler: erstens die direkte Eingabe von Grad Celsius statt Kelvin, zweitens die Nutzung des Manometer-Überdrucks anstelle des Absolutdrucks und drittens gemischte Einheiten (etwa `bar` in Kombination mit `R = 8,31446`, was das Ergebnis um den Faktor `100` verfälscht).
