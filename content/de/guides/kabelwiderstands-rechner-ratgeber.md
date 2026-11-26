---
title: "Kabelwiderstand: Warum Kabel warm werden"
description: "Berechnen Sie den elektrischen Leitungswiderstand aus Länge, Querschnitt und spezifischem Widerstand (Kupfer, Aluminium) inklusive Spannungsfall, Verlustleistung und Temperaturkorrektur mit dem Kabelwiderstands-Rechner."
category: "Math & Science"
relatedCalculator: "wire-resistance-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum muss bei der Berechnung des Kabelwiderstands meist mit der doppelten Kabellänge gerechnet werden?"
    answer: "In einem geschlossenen Gleichstrom- oder Einphasen-Wechselstromkreis (230 V) fließt der Strom über den Außenleiter (Phase bzw. Pluspol) zum Verbraucher und über den Neutralleiter (bzw. Minuspol) zurück zur Quelle. Die Gesamtlänge der stromdurchflossenen Leitung beträgt daher 2 × l. Nur wenn ausdrücklich der Einzeladerwiderstand gesucht wird, rechnet man mit der einfachen Länge."
  - question: "Wie rechnet man den deutschen Leitungsquerschnitt in mm² in den amerikanischen AWG-Wert um?"
    answer: "Der amerikanische Drahtdurchmesser-Standard AWG (American Wire Gauge) folgt einer logarithmischen Skala, bei der kleinere Nummern dickere Leiter bezeichnen. Gängige Äquivalente sind etwa 1,5 mm² ≈ AWG 16 (genau 1,31 mm²) bzw. AWG 15 (1,65 mm²), 2,5 mm² ≈ AWG 14 (2,08 mm²) bzw. AWG 13 (2,62 mm²) und 4,0 mm² ≈ AWG 11 (4,17 mm²). Für normgerechte Elektroinstallationen im DACH-Raum gilt stets die metrische Angabe in mm²."
  - question: "Warum wird Aluminium bei gleicher Stromstärke schneller warm als Kupfer?"
    answer: "Aluminium besitzt bei 20 °C einen spezifischen elektrischen Widerstand von rund 0,02826 Ω·mm²/m und leitet Strom damit um etwa 58 % schlechter als reines Leitkupfer (0,01786 Ω·mm²/m). Bei identischem Querschnitt und gleichem Strom fällt nach P_v = I² × R entsprechend mehr Verlustwärme an. Um dieselbe Belastbarkeit zu erreichen, muss ein Aluminiumkabel daher mindestens eine Querschnittsstufe dicker gewählt werden."
  - question: "Wie stark steigt der Kabelwiderstand, wenn sich die Leitung im Betrieb erwärmt?"
    answer: "Metallische Leiter sind Kaltleiter (PTC-Verhalten): Steigt ihre Temperatur, nimmt die Gitterbewegung der Metallionen zu und behindert den Elektronenfluss. Bei Kupfer beträgt der Temperaturkoeffizient α_20 = 0,00393 K⁻¹. Erwärmt sich eine Kupferader von 20 °C auf 70 °C (ΔT = 50 K), erhöht sich ihr Widerstand um knapp 19,7 % – und damit steigen auch Spannungsfall und Verlustleistung proportional an."
  - question: "Welcher Spannungsfall ist in deutschen und europäischen Hausinstallationen zulässig?"
    answer: "Nach DIN VDE 0100-520 darf der Spannungsfall zwischen dem Hausanschlusskasten und dem Verbrauchsmittel bei Beleuchtungsanlagen höchstens 3 % und bei anderen Verbrauchern höchstens 5 % der Nennspannung (230 V bzw. 400 V) betragen. Die Planungsnorm DIN 18015-1 empfiehlt für Endstromkreise ab dem Zähler einen Maximalwert von 3 %, während die VDE-AR-N 4100 für die Hauptleitung vor dem Zähler maximal 0,5 % vorgibt."
---

Jedes elektrische Kabel setzt dem Stromfluss einen messbaren Widerstand entgegen. Dieser **Leitungswiderstand** entsteht, weil freie Leitungselektronen im Metallgitter des Leiters mit den schwingenden Atomrümpfen zusammenstoßen und dabei kinetische Energie in thermische Schwingungsenergie umwandeln. Genau diese Umwandlung beschreibt das Joulesche Gesetz: Je höher der fließende Strom und der Eigenwiderstand einer Leitung sind, desto stärker erwärmt sich das Kabel – ein Effekt, der bei Ladekabeln spürbar, bei überlasteten Verlängerungsleitungen jedoch sicherheitskritisch werden kann.

Der ohmsche Gleichstromwiderstand eines Leiters wächst proportional zu seiner Länge und sinkt umgekehrt proportional zu seinem Querschnitt. Maßgeblich bestimmt wird er zudem vom spezifischen Widerstand des Werkstoffs und der Betriebstemperatur. Für die exakte Auslegung beliebiger Leiterlängen, Querschnitte in Quadratmillimetern oder AWG sowie unterschiedlicher Leitermaterialien nutzen Sie unseren interaktiven [Kabelwiderstands-Rechner](/de/rechner/drahtwiderstand-rechner).

## Physikalische Grundlagen: Widerstandsgleichung, Spannungsfall und Erwärmung

### Die Grundformel des Leitungswiderstands

Für einen homogenen metallischen Leiter mit konstantem Querschnitt gilt bei einer Referenztemperatur von `20 °C`:

```text
R_20 = (ρ_20 × l) / A
```

Für einen vollständigen einphasigen Stromkreis oder eine Gleichstromleitung mit Hin- und Rückleiter verdoppelt sich die wirksame Leiterlänge zu `l_ges = 2 × l_einfach`:

```text
R_ges = (2 × ρ_20 × l_einfach) / A
```

Die Parameter besitzen folgende Bedeutungen und Einheiten:

- **`R_20` (Ω):** Gleichstromwiderstand der Leitung bei `20 °C`.
- **`ρ_20` (Ω·mm²/m):** Spezifischer Widerstand des Materials bei `20 °C`. Für reines IACS-Kupfer liegt er bei `0,01724 Ω·mm²/m`; in der VDE-Praxis wird für technisches Leitkupfer mit `0,01786 Ω·mm²/m` (Leitfähigkeit `κ = 56 m/(Ω·mm²)`) gerechnet.
- **`l` (m):** Leiterlänge. Ist nur der Durchmesser `d` bekannt, gilt für den Querschnitt `A = π × (d / 2)²` in `mm²`.

### Verlustleistung, Spannungsfall und Temperatureinfluss

Fließt ein Betriebsstrom `I` durch den Widerstand `R`, entstehen ein Spannungsfall `ΔU` und eine Verlustwärme `P_v`:

```text
ΔU = I × R_ges       (Einphasen- und Gleichstrom)
ΔU = √3 × I × R_einfach × cos(φ)   (Drehstrom 400 V)
P_v = I² × R_ges = ΔU × I
```

Da `I` quadratisch eingeht, vervierfacht doppelter Strom die Wärmeleistung. Zudem steigt der Widerstand bei Erwärmung mit dem Temperaturkoeffizienten `α_20` (`0,00393 K⁻¹` bei Kupfer, `0,00403 K⁻¹` bei Aluminium):

```text
R(T) = R_20 × [1 + α_20 × (T − 20 °C)]
```

## Rechenbeispiel: Verlängerungsleitung unter Volllast bei 230 V

Betrachtet wird eine `25 m` lange Verlängerungsleitung (`230 V`, `cos φ = 1`) mit `1,5 mm²` Kupferquerschnitt bei einer Dauerlast von `I = 16 A` (`3.680 W`):

1. **Gesamtlänge bestimmen:** Für Hin- und Rückleiter beträgt `l_ges = 2 × 25 m = 50 m`.
2. **Widerstand bei 20 °C berechnen:** Mit `ρ_20 = 0,01786 Ω·mm²/m` ergibt sich `R_20 = (0,01786 × 50) / 1,5 = 0,5953 Ω`.
3. **Spannungsfall ermitteln:** `ΔU = 16 A × 0,5953 Ω = 9,53 V`, also `4,14 %` von `230 V`. Am Verbraucher kommen noch `220,47 V` an.
4. **Verlustleistung berechnen:** `P_v,20 = (16 A)² × 0,5953 Ω = 152,4 W`.
5. **Erwärmung auf 50 °C (`ΔT = 30 K`):** `R_50 = 0,5953 × [1 + 0,00393 × 30] = 0,6655 Ω`; die Verlustwärme steigt auf `P_v,50 = 256 × 0,6655 = 170,4 W`.

Mit `2,5 mm²` Querschnitt sinkt `R_20` auf `0,3572 Ω`, der Spannungsfall auf `5,72 V` (`2,49 %`) und `P_v,20` um `40 %` auf `91,4 W`.

## Werkstoffe und Leitungsquerschnitte im Vergleich

Die Tabelle vergleicht Werkstoffe und Querschnitte bei `20 °C` für eine `20 m` lange Anschlussleitung (`l_ges = 40 m`) bei `16 A` und `230 V`:

| Material & Querschnitt | Spez. Widerstand `ρ_20` | `R_ges` (40 m) | `ΔU` bei 16 A | `P_v` bei 16 A | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Silber `1,5 mm²` | `0,0159 Ω·mm²/m` | `0,424 Ω` | `6,78 V` (`2,95 %`) | `108,5 W` | Hochfrequenztechnik, Kontakte |
| Kupfer `1,5 mm²` | `0,01786 Ω·mm²/m` | `0,476 Ω` | `7,62 V` (`3,31 %`) | `121,9 W` | Licht- und Standardsteckdosenkreise |
| Kupfer `2,5 mm²` | `0,01786 Ω·mm²/m` | `0,286 Ω` | `4,57 V` (`1,99 %`) | `73,2 W` | Längere Stromkreise, Großgeräte |
| Kupfer `4,0 mm²` | `0,01786 Ω·mm²/m` | `0,179 Ω` | `2,86 V` (`1,24 %`) | `45,7 W` | Einphasige Wallbox, Durchlauferhitzer |
| Kupfer `6,0 mm²` | `0,01786 Ω·mm²/m` | `0,119 Ω` | `1,90 V` (`0,83 %`) | `30,5 W` | PV-Strings, Unterverteilungen |
| Aluminium `2,5 mm²` | `0,02826 Ω·mm²/m` | `0,452 Ω` | `7,23 V` (`3,15 %`) | `115,8 W` | Freileitungen, gewichtssparende Kabel |
| Baustahl `2,5 mm²` | `0,1000 Ω·mm²/m` | `1,600 Ω` | `25,60 V` (`11,13 %`) | `409,6 W` | Nicht als Energieleiter (nur Erdung) |

## Praxis-Anwendungen, typische Planungsfehler und Normvorgaben

### Aufgewickelte Kabeltrommeln und Übergangswiderstände

In der Praxis ist nicht nur der Aderwiderstand relevant. Auf einer aufgewickelten Kabeltrommel stauen sich `150 W` bis `170 W` Verlustwärme zwischen den Lagen, sodass die Leitertemperatur das für PVC zulässige Limit von `70 °C` überschreitet und den Mantel aufschmelzen kann. Rollen Sie Kabeltrommeln ab `1.000 W` Last stets vollständig ab. Ebenso gefährlich sind Übergangswiderstände an losen Klemmen: Bereits `0,2 Ω` Kontaktwiderstand setzen bei `16 A` lokal `51,2 W` Punkt-Wärme frei.

### CCA-Leiter und Normen (DIN VDE)

Vorsicht gilt bei günstigen Lautsprecher- oder Netzwerkkabeln mit **CCA-Leitern** (kupferkaschiertes Aluminium): Trotz kupferner Oberfläche besitzen sie den höheren Widerstand und die geringere Klemmsicherheit von Aluminium. Für Elektroinstallationen im DACH-Raum regeln **DIN VDE 0100-520** (max. `3 %` Spannungsfall für Beleuchtung, `5 %` für sonstige Verbraucher ab Hausanschluss) und **DIN VDE 0298-4** Querschnitt und Verlegeart. Bei `50 Hz` bis `16 mm²` bleibt der Skin-Effekt vernachlässigbar; erst bei hohen Frequenzen oder dicken Sammelschienen erhöht er den Wechselstromwiderstand spürbar.
