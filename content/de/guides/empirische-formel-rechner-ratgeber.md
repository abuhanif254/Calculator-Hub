---
title: "Empirische Formel (Verhältnisformel): Das einfachste Verhältnis"
description: "Lernen Sie, wie Sie das einfachste Zahlenverhältnis von Atomen in einer Verbindung berechnen, und nutzen Sie unseren Rechner."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "empirical-formula-calculator"
relatedType: "calculator"
faqs:
  - question: "Worin unterscheidet sich die empirische Formel von der Molekülformel?"
    answer: "Die empirische Formel (Verhältnisformel) zeigt ausschließlich das kleinste ganzzahlige Stoffmengenverhältnis der Elemente in einer Verbindung (z. B. CH₂O). Die Molekülformel (Summenformel) nennt dagegen die tatsächliche Anzahl aller Atome innerhalb eines einzelnen Moleküls, wie etwa C₂H₄O₂ bei Essigsäure oder C₆H₁₂O₆ bei Glucose."
  - question: "Was mache ich, wenn nach dem Teilen durch den kleinsten Molwert Zahlen wie 1,33 oder 1,5 herauskommen?"
    answer: "Solche Werte dürfen auf keinen Fall auf die nächste ganze Zahl gerundet werden. Sie entsprechen exakten Stammbrüchen (1,33 ≈ 4/3; 1,5 = 3/2). Multiplizieren Sie stattdessen alle Quotienten der Verbindung mit dem kleinsten gemeinsamen Faktor (hier 3 bzw. 2), bis sämtliche Indizes ganzzahlig sind."
  - question: "Wie berechne ich die Verhältnisformel, wenn statt Prozentwerten direkte Grammmassen gemessen wurden?"
    answer: "Bei direkt gemessenen Elementmassen (etwa aus einer Verbrennungsanalyse) entfällt der Schritt über die 100-g-Basis. Teilen Sie jede gemessene Masse direkt durch die jeweilige molare Atommasse (n = m / M) und normieren Sie anschließend wie gewohnt auf den kleinsten Stoffmengenwert."
  - question: "Warum ist die Verhältnisformel bei Salzen wie NaCl bereits die vollständige chemische Formel?"
    answer: "Ionenkristalle und viele Festkörper wie Natriumchlorid, Calciumfluorid oder Siliziumdioxid bilden dreidimensionale Kristallgitter ohne abgegrenzte Einzelmoleküle. Deshalb existiert keine klassische Molekülformel; die kleinste ladungsneutrale Formeleinheit entspricht dort direkt der Verhältnisformel."
  - question: "Wie groß darf die Abweichung von ganzen Zahlen bei realen Labordaten sein?"
    answer: "In der organischen Elementaranalyse (CHNS) gelten absolute Abweichungen von ±0,3 % bis ±0,4 % bei den Massenprozenten als analytisch akzeptabel. Bei der Normierung der Molquotienten dürfen Werte innerhalb von etwa ±0,03 um eine ganze Zahl oder einen typischen Bruch (z. B. 1,48 auf 1,50) geglättet werden."
---

Die empirische Formel – im Deutschen präzise als Verhältnisformel bezeichnet – gibt das kleinste ganzzahlige Zahlenverhältnis der beteiligten chemischen Elemente innerhalb einer Verbindung an. Sie wird direkt aus experimentellen Massenanteilen (Elementaranalyse) oder absoluten Massen bestimmt, indem sämtliche Elementmassen über ihre molaren Atommassen in Stoffmengen (`mol`) umgerechnet und auf das kleinste vorkommende Elementverhältnis normiert werden.

Während die Verhältnisformel bei Salzen wie `NaCl` oder `Fe₂O₃` bereits die vollständige Formeleinheit des Kristallgitters beschreibt, dient sie bei organischen Molekülverbindungen als unverzichtbare Vorstufe zur Bestimmung der wahren Summenformel. Mit unserem [Verhältnisformel-Rechner](/de/rechner/empirische-formel-rechner) wandeln Sie prozentuale Laboranalysen oder direkte Grammmessungen ohne manuelle Rundungsfehler in exakte Verhältnisformeln um.

## Systematische Methodik und mathematische Gleichungen

Das Verfahren zur Herleitung einer empirischen Formel folgt vier streng logischen Umrechnungsschritten:

```text
Schritt 1 (Massenbasis):      m_i = w_i × 100 g   (bei Prozentangaben)
Schritt 2 (Stoffmenge):       n_i = m_i / M_i
Schritt 3 (Normierung):       r_i = n_i / min(n_1, n_2, ..., n_k)
Schritt 4 (Ganzzahligkeit):   Index_i = k × r_i   mit kleinstem k ∈ ℕ⁺
```

Die Parameter sind dabei wie folgt festgelegt:

- **Massenanteil (`w_i`):** Der prozentuale Gewichtsanteil des Elements `i` an der Reinsubstanz. Die Summe aller Elemente muss `100,0 %` ergeben; bei organischen Verbindungen wird Sauerstoff (`O`) häufig als Restdifferenz zu `100 %` bestimmt, sofern kein weiteres Heteroelement vorliegt.
- **Molare Atommasse (`M_i`):** Das relative Atomgewicht des Elements in `g/mol` nach IUPAC (z. B. `C = 12,011 g/mol`, `H = 1,008 g/mol`, `O = 15,999 g/mol`, `N = 14,007 g/mol`).
- **Normierter Quotient (`r_i`):** Das relative Molverhältnis bezogen auf das am schwächsten vertretene Element (`r_min = 1,000`).
- **Multiplikator (`k`):** Die kleinste natürliche Zahl (`1, 2, 3, 4, ...`), mit der alle Quotienten `r_i` multipliziert werden müssen, um gebrochene Indizes wie `1,33` oder `1,50` in ganze Zahlen zu überführen.

### Herleitung aus der Verbrennungsanalyse

Liegen statt Prozentwerten die Produkte einer vollständigen Verbrennung vor (`CO₂` und `H₂O`), berechnet man zunächst die Elementmassen über die gravimetrischen Faktoren: `m(C) = m(CO₂) × (12,011 / 44,009)` und `m(H) = m(H₂O) × (2,016 / 18,015)`. Alle weiteren Schritte bleiben identisch.

## Durchgerechnetes Beispiel mit gebrochenem Molverhältnis

Eine analytisch reine organische Verbindung liefert in der Elementaranalyse folgende Massenanteile: **40,92 % Kohlenstoff (C)**, **4,58 % Wasserstoff (H)** und **54,50 % Sauerstoff (O)** (Summe: `100,00 %`).

### Schritt 1: Auf 100 g Substanz beziehen

Die Prozentwerte entsprechen direkt den Massen in Gramm:
- `m(C) = 40,92 g`
- `m(H) = 4,58 g`
- `m(O) = 54,50 g`

### Schritt 2: In Stoffmengen (`mol`) umrechnen

Teilen Sie jede Elementmasse durch die jeweilige molare Atommasse:
- `n(C) = 40,92 g / 12,011 g/mol = 3,407 mol`
- `n(H) = 4,58 g / 1,008 g/mol = 4,544 mol`
- `n(O) = 54,50 g / 15,999 g/mol = 3,406 mol`

### Schritt 3: Durch den kleinsten Molwert normieren

Der kleinste ermittelte Wert ist `n(O) = 3,406 mol`:
- `r(C) = 3,407 / 3,406 = 1,000`
- `r(H) = 4,544 / 3,406 = 1,334`
- `r(O) = 3,406 / 3,406 = 1,000`

### Schritt 4: Bruchwert ganzzahlig skalieren

Der Wert `1,334` liegt unmittelbar beim Bruch `4/3` (`1,333...`). Ein einfaches Abrunden auf `1` würde ein falsches Verhältnis erzeugen. Durch Multiplikation aller drei Quotienten mit `k = 3` erhält man exakte ganze Zahlen:
- `C: 1,000 × 3 = 3,00 → 3`
- `H: 1,334 × 3 = 4,002 → 4`
- `O: 1,000 × 3 = 3,00 → 3`

Die empirische Formel lautet somit **`C₃H₄O₃`** (entspricht z. B. Brenztraubensäure oder Ascorbinsäure im halben Verhältnis `C₆H₈O₆`).

## Normierungstabelle: Dezimalbrüche sicher in ganze Zahlen umwandeln

Wenn der normierte Quotient `r_i` nicht nahe bei einer ganzen Zahl liegt, entscheidet der Nachkommaanteil über den korrekten Multiplikator `k`:

| Nachkommawert von `r_i` | Entsprechender Bruch | Erforderlicher Faktor `k` | Beispiel-Rohverhältnis | Skalierte Verhältnisformel | Reales Substanzbeispiel |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0,00` (Toleranz `± 0,03`) | Ganzzahl | `1` | `C₁ H₂,₀₁ O₁,₀₀` | `CH₂O` | Formaldehyd / Glucose-Einheit |
| `0,50` (`0,47 – 0,53`) | `1/2` | `2` | `Fe₁ O₁,₅₀` | `Fe₂O₃` | Eisen(III)-oxid (Hämatit) |
| `0,33` oder `0,67` | `1/3` bzw. `2/3` | `3` | `C₁ H₁,₃₃ O₁` | `C₃H₄O₃` | Brenztraubensäure |
| `0,25` oder `0,75` | `1/4` bzw. `3/4` | `4` | `C₁ H₂,₂₅` | `C₄H₉` | Butyl-Verhältnis (z. B. Octan `C₈H₁₈`) |
| `0,20`, `0,40`, `0,60`, `0,80` | `n/5` | `5` | `C₁ H₁,₆₀ O₀,₄₀` | `C₅H₈O₂` | Methylmethacrylat |
| `0,17` oder `0,83` | `1/6` bzw. `5/6` | `6` | `C₁ H₁,₁₇ N₀,₃₃` | `C₆H₇N₂` | Heterocyclische Stickstoffbase |

## Anwendungsbereiche, Messgrenzen und typische Fallstricke

Die Herleitung der Verhältnisformel gehört in der synthetischen Chemie, Mineralogie und Werkstoffprüfung zum Standardprogramm bei der Charakterisierung unbekannter Feststoffe oder neu synthetisierter Wirkstoffe. In Publikationen und Zulassungsdossiers dient die Übereinstimmung zwischen berechneter und gemessener Elementaranalyse (CHNS) als Reinheitsbeleg, wobei typischerweise eine maximale Abweichung von `± 0,4 %` pro Element gefordert wird.

### Häufige Fehlerquellen bei der Auswertung

- **Zu frühes Runden der Zwischenergebnisse:** Runden Sie Stoffmengen `n_i` stets auf mindestens vier signifikante Stellen. Wer `0,333 mol` bereits auf `0,3 mol` kürzt, verfälscht nachfolgende Bruchverhältnisse wie `1,33` oder `1,25` bis zur Unkenntlichkeit.
- **Unentdeckte Heteroelemente oder Restfeuchte:** Da Sauerstoff in klassischen CHNS-Analysatoren oft nur rechnerisch als Differenz zu `100 %` ermittelt wird, führen Spuren von Kristallwasser, Restlösungsmittel oder nicht quantifizierten Halogenen direkt zu scheinbar unmöglichen Atomverhältnissen.
- **Verwechslung von Massen- und Volumenprozenten:** Die Umrechnung `n = m / M` verlangt zwingend Massenprozente (`Gew.-%`). Bei Gasgemischen oder Flüssigkeitsmischungen müssen Volumen- oder Stoffmengenanteile zuvor über Dichte und Molmasse konvertiert werden.
- **Fehlinterpretation bei Polymeren und Legierungen:** Bei makromolekularen Kunststoffen beschreibt die Verhältnisformel lediglich die Zusammensetzung der Wiederholungseinheit, während bei metallischen Phasen oder Keramiken nicht-stöchiometrische Defektstrukturen (etwa `Fe₀,₉₅O`) auftreten können, die sich bewusst nicht auf kleine ganze Zahlen zwingen lassen.
