---
title: "Gibbs-Energie-Rechner: Spontane Reaktionen"
description: "Erfahren Sie, wie die freie Enthalpie (Gibbs-Energie) bestimmt, ob eine Reaktion spontan abläuft, wie Enthalpie und Entropie zusammenwirken, und nutzen Sie unseren Rechner."
category: "Math & Science"
relatedCalculator: "gibbs-free-energy-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wann läuft eine chemische Reaktion laut Gibbs-Energie spontan ab?"
    answer: "Eine Reaktion verläuft bei konstantem Druck und konstanter Temperatur genau dann thermodynamisch freiwillig (exergon), wenn die Änderung der freien Enthalpie negativ ist (ΔG < 0). Bei ΔG > 0 ist der Vorgang endergon und läuft ohne Energiezufuhr nicht ab; bei ΔG = 0 befindet sich das System im chemischen Gleichgewicht."
  - question: "Warum muss die Temperatur T in der Gibbs-Helmholtz-Gleichung immer in Kelvin angegeben werden?"
    answer: "Die Entropieänderung ΔS wird in Joule pro Kelvin und Mol gemessen, da sie auf dem absoluten Nullpunkt (0 K) basiert. Würde man Grad Celsius einsetzen, könnten negative Temperaturen auftreten und das Vorzeichen von T · ΔS physikalisch verfälschen. Rechnen Sie Celsius stets über T(K) = θ(°C) + 273,15 um."
  - question: "Was ist der Unterschied zwischen ΔG und ΔG°?"
    answer: "ΔG° bezeichnet die freie Standardreaktionsenthalpie bei 1 bar Druck, 1 mol/L Konzentration (ideal) und meist 298,15 K (25 °C). Das reale ΔG berücksichtigt dagegen die tatsächlichen Stoffkonzentrationen und Partialdrücke über den Reaktionsquotienten Q gemäß ΔG = ΔG° + R · T · ln(Q)."
  - question: "Bedeutet ein stark negatives ΔG, dass eine Reaktion sofort und schnell abläuft?"
    answer: "Nein. Die Gibbs-Energie trifft ausschließlich eine thermodynamische Aussage über die Triebkraft und Gleichgewichtslage, nicht über die Reaktionsgeschwindigkeit (Kinetik). Ist die Aktivierungsenergie hoch – wie bei der Knallgasreaktion bei Raumtemperatur –, bleibt das System trotz stark negativem ΔG metastabil, bis ein Funke oder Katalysator die Barriere senkt."
  - question: "Wie berechne ich die Umschlagtemperatur einer temperaturabhängigen Reaktion?"
    answer: "Haben Reaktionsenthalpie ΔH und Reaktionsentropie ΔS dasselbe Vorzeichen, wechselt die Reaktion bei der Inversionstemperatur Teq = ΔH / ΔS zwischen spontan und nicht spontan. Achten Sie vor der Division unbedingt darauf, ΔH und ΔS in identische Energieeinheiten (entweder beide in Joule oder beide in Kilojoule) umzurechnen."
---

Ob Eisen an feuchter Luft rostet, Ammoniak im Hochdruckreaktor entsteht oder Adenosintriphosphat (ATP) in biologischen Zellen Energie bereitstellt: Ob ein chemischer oder physikalischer Prozess bei konstantem Druck und konstanter Temperatur von selbst abläuft, entscheidet allein die Änderung der **freien Enthalpie**, international meist als **Gibbs-Energie (`ΔG`)** bezeichnet. Eine Reaktion verläuft thermodynamisch spontan (exergon), wenn `ΔG < 0` gilt; bei `ΔG > 0` erfordert sie kontinuierliche Energiezufuhr (endergon), und bei `ΔG = 0` liegt ein dynamisches Gleichgewicht vor.

Die Gibbs-Energie verbindet zwei fundamentale Triebkräfte der Natur – das Bestreben nach minimaler Energie (Enthalpie `ΔH`) und das Bestreben nach maximaler Zustandsverteilung (Entropie `ΔS`) – in einer einzigen Zustandsgröße. Mit unserem [Gibbs-Energie-Rechner](/de/rechner/gibbs-energie-rechner) prüfen Sie in Sekunden die Spontanität beliebiger Reaktionen, gleichen Einheiten automatisch ab und bestimmen präzise Gleichgewichts- und Umschlagtemperaturen.

## Methodik: Die Gibbs-Helmholtz-Gleichung und ihre Parameter

Der US-amerikanische Physiker Josiah Willard Gibbs formulierte 1873 die nach ihm benannte Zustandsfunktion `G = H − T · S`. Für eine isobare und isotherme Zustandsänderung – den Standardfall bei offenen Laborgefäßen, biologischen Prozessen und vielen industriellen Reaktoren – folgt daraus die **Gibbs-Helmholtz-Gleichung**:

```text
Standardbedingungen:   ΔG° = ΔH° − T · ΔS°
Allgemeine Bedingungen: ΔG  = ΔG° + R · T · ln(Q)
Gleichgewichtslage:     ΔG° = −R · T · ln(K)
Umschlagtemperatur:     T_eq = ΔH / ΔS   (sofern ΔH und ΔS gleiches Vorzeichen haben)
```

Für exakte Berechnungen ist die strikte Definition jeder Größe entscheidend:

* **Änderung der freien Enthalpie (`ΔG` bzw. `ΔG°`, in `kJ/mol`)**: Sie beziffert die maximal gewinnbare Nutzarbeit bei konstantem Druck und konstanter Temperatur.
* **Reaktionsenthalpie (`ΔH` bzw. `ΔH°`, in `kJ/mol`)**: Sie beschreibt die ausgetauschte Wärmeenergie bei konstantem Druck (`ΔH < 0`: exotherm; `ΔH > 0`: endotherm).
* **Absolute Temperatur (`T`, in `K`)**: Die thermodynamische Temperatur (`T = θ + 273,15`); Standardtabellen beziehen sich meist auf `298,15 K` (`25,00 °C`).
* **Reaktionsentropie (`ΔS` bzw. `ΔS°`, in `J/(mol·K)`)**: Sie misst die Entropieänderung zwischen Produkten und Edukten und steigt stark, wenn Gase entstehen.
* **Gaskonstante (`R = 8,31446 J/(mol·K)`)**, **Reaktionsquotient (`Q`)** und **Gleichgewichtskonstante (`K`)**: Sie verbinden die Standardtriebkraft mit realen Partialdrücken und Konzentrationen.

## Rechenbeispiel: Thermische Zersetzung von Calciumcarbonat

Am Beispiel des Kalkbrennens lässt sich der Temperatureinfluss auf die Spontanität nachvollziehen:

```text
Reaktionsgleichung: CaCO3(s) → CaO(s) + CO2(g)
```

Aus Standardtabellen (`298,15 K`, `1 bar`) entnehmen wir `ΔrH° = +178,3 kJ/mol` (`+178.300 J/mol`, endotherm) und `ΔrS° = +160,4 J/(mol·K)` (`+0,1604 kJ/(mol·K)`, Entropiegewinn durch gasförmiges `CO2`).

**Schritt 1: Spontanität bei Raumtemperatur (`298,15 K`)**
```text
T · ΔrS° = 298,15 K × 0,1604 kJ/(mol·K) = 47,82 kJ/mol
ΔrG°(298,15 K) = 178,30 kJ/mol − 47,82 kJ/mol = +130,48 kJ/mol
```
Wegen `ΔrG° > 0` bleibt Kalkstein bei Raumtemperatur stabil.

**Schritt 2: Umschlagtemperatur `T_eq` bestimmen**
Unter der Ellingham-Näherung konstanter `ΔrH°`- und `ΔrS°`-Werte liegt das Gleichgewicht (`ΔrG° = 0`) bei:
```text
T_eq = 178.300 J/mol / 160,4 J/(mol·K) = 1.111,6 K  (838,5 °C)
```

**Schritt 3: Verhalten im Brennofen bei `1.200 K` (`926,9 °C`)**
```text
T · ΔrS° = 1.200 K × 0,1604 kJ/(mol·K) = 192,48 kJ/mol
ΔrG°(1.200 K) ≈ 178,30 kJ/mol − 192,48 kJ/mol = −14,18 kJ/mol
```
Oberhalb von `838,5 °C` überwiegt `−T · ΔS°`, sodass Kalk spontan zu Branntkalk und `CO2` zerfällt.

## Fallunterscheidung: Zusammenspiel von Enthalpie, Entropie und Temperatur

Die folgende Übersicht fasst alle vier Vorzeichenkombinationen sowie die Sonderfälle Gleichgewicht und Reaktionskopplung zusammen:

| Vorzeichen `ΔH` | Vorzeichen `ΔS` | Verhalten von `ΔG = ΔH − T · ΔS` | Temperaturabhängigkeit | Typisches Praxisbeispiel |
| :--- | :--- | :--- | :--- | :--- |
| `ΔH < 0` (exotherm) | `ΔS > 0` (Zunahme) | Immer negativ (`ΔG < 0`) | Bei jeder Temperatur spontan | Verbrennung von Oktan; Zerfall von `H2O2` |
| `ΔH > 0` (endotherm) | `ΔS < 0` (Abnahme) | Immer positiv (`ΔG > 0`) | Bei keiner Temperatur spontan | Ozonbildung aus `O2` ohne UV-Strahlung |
| `ΔH < 0` (exotherm) | `ΔS < 0` (Abnahme) | Negativ bei tiefen Temperaturen | Spontan für `T < ΔH / ΔS` | Gefrieren von Wasser unter `0 °C`; Haber-Bosch |
| `ΔH > 0` (endotherm) | `ΔS > 0` (Zunahme) | Negativ bei hohen Temperaturen | Spontan für `T > ΔH / ΔS` | Schmelzen von Eis über `0 °C`; Kalkbrennen |
| Beliebig (`ΔH = T · ΔS`) | Beliebig | Exakt Null (`ΔG = 0`) | Nur an der Gleichgewichtsgrenze | Phasengleichgewicht Wasser/Dampf bei `100 °C` |
| Endergon (`ΔG_1 > 0`) | Gekoppelt (`ΔG_2 < 0`) | Gesamtbilanz negativ (`ΔG_ges < 0`) | Thermodynamische Kopplung | Biochemische Synthesen mittels ATP-Hydrolyse |

## Praxisanwendungen, typische Fehlerquellen und thermodynamische Grenzen

In der **Verfahrenstechnik und Werkstoffkunde** bildet die Gibbs-Energie das Rückgrat von Ellingham-Diagrammen zur Erzreduktion (etwa im Hochofenprozess), von Brennstoffzellenberechnungen (`ΔG = −z · F · E_Zelle`) sowie der Vorhersage von Korrosionsprozessen. In der **Biochemie** zeigt `ΔG°'`, wie Zellen thermodynamisch ungünstige Reaktionen durch Kopplung an die Hydrolyse von ATP (`ΔG°' ≈ −30,5 kJ/mol`) antreiben.

Bei der praktischen Berechnung treten vier klassische Fehlerquellen besonders häufig auf:

1. **Einheitenkonflikt zwischen Kilojoule und Joule**: Reaktionsenthalpien werden fast immer in `kJ/mol` tabelliert, Entropien jedoch in `J/(mol·K)`. Wer `ΔS` nicht durch `1.000` teilt, überschätzt den Entropieterm um den Faktor `1.000` und erhält völlig falsche Umschlagtemperaturen.
2. **Celsius- statt Kelvin-Skala**: Das Einsetzen von `25 °C` statt `298,15 K` oder von Minustemperaturen unter `0 °C` führt zu groben Vorzeichen- und Größenfehlern.
3. **Verwechslung von `ΔG°` und `ΔG`**: Eine Reaktion mit leicht positivem `ΔG°` kann dennoch spontan anlaufen, solange ausreichend Edukte im Überschuss vorliegen (`Q < K` ergibt ein negatives `R · T · ln(Q)`). Umgekehrt stoppt jede reale Reaktion im geschlossenen Gefäß, sobald durch Produktanreicherung `Q = K` und damit `ΔG = 0` erreicht wird.
4. **Thermodynamik versus Kinetik und Temperaturdrift**: Selbst ein stark negatives `ΔG` garantiert keinen raschen Stoffumsatz – Diamant ist bei Umgebungsdruck gegenüber Graphit thermodynamisch instabil (`ΔG° = −2,9 kJ/mol`), wandelt sich wegen der extrem hohen Aktivierungsbarriere aber praktisch nicht um. Zudem ändern sich `ΔH` und `ΔS` bei sehr großen Temperaturintervallen leicht über die Wärmekapazitätsdifferenz `ΔC_p`, weshalb Werte weit jenseits von `298 K` bei Präzisionsauslegungen mithilfe des Kirchhoffschen Gesetzes korrigiert werden sollten.
