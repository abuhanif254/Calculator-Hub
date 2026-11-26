---
title: "Charles'sches Gesetz Rechner: Volumen vs. Temperatur"
description: "Erfahren Sie, wie sich Gasvolumen und absolute Temperatur bei konstantem Druck nach dem Charles'schen Gesetz verhalten, warum die Kelvin-Skala zwingend ist und wie Sie Normvolumen berechnen."
category: "Math & Science"
relatedCalculator: "charles-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum darf beim Charles'schen Gesetz niemals mit Grad Celsius gerechnet werden?"
    answer: "Die direkte Proportionalität zwischen Volumen und Temperatur setzt einen Nullpunkt voraus, an dem auch das theoretische Volumen eines idealen Gases auf null sinkt. Die Celsius-Skala legt ihren Nullpunkt willkürlich auf den Gefrierpunkt von Wasser (273,15 K). Rechnen Sie direkt mit 0 °C im Nenner, entsteht eine unzulässige Division durch null; bei negativen Celsius-Werten ergäben sich physikalisch unmögliche negative Volumina."
  - question: "Was ist der Unterschied zwischen dem Charles'schen Gesetz und dem Gesetz von Gay-Lussac?"
    answer: "Im deutschsprachigen Raum wird der Zusammenhang V₁ / T₁ = V₂ / T₂ bei konstantem Druck oft als erstes Gesetz von Gay-Lussac bezeichnet, während im angloamerikanischen Raum der Name Charles'sches Gesetz gebräuchlich ist. Historisch entdeckte Jacques Charles den Effekt um 1787, veröffentlichte ihn jedoch nicht; Joseph Louis Gay-Lussac publizierte die exakte Gesetzmäßigkeit 1802. Das zweite Gesetz von Gay-Lussac (Amontons-Gesetz) betrifft dagegen p₁ / T₁ = p₂ / T₂ bei konstantem Volumen."
  - question: "Gilt das Charles'sches Gesetz auch für einen starren Druckbehälter oder Autoreifen?"
    answer: "Nein, nicht direkt. Das Charles'sche Gesetz setzt voraus, dass sich das Gas frei ausdehnen kann und der Druck exakt konstant bleibt (isobar). In einem starren Stahlbehälter bleibt stattdessen das Volumen konstant (isochor), sodass bei Erwärmung der Druck gemäß dem Amontons-Gesetz ansteigt. In einem elastischen Reifen ändern sich bei Temperaturanstieg sowohl der Druck als auch geringfügig das Volumen."
  - question: "Was geschieht mit einem realen Gas bei starker Abkühlung nahe 0 Kelvin?"
    answer: "Das Charles'sche Gesetz sagt für ein ideales Gas bei T = 0 K (−273,15 °C) ein Volumen von null voraus. Jedes reale Gas verflüssigt sich jedoch lange vor Erreichen des absoluten Nullpunkts und geht bei noch tieferen Temperaturen in den festen Aggregatzustand über – Sauerstoff etwa kondensiert bei Normaldruck bereits bei −182,96 °C (90,19 K). Ab dem Phasenübergang gilt das Gasgesetz nicht mehr."
  - question: "Wie rechnet man Gasvolumina in der Energiewirtschaft auf Normkubikmeter um?"
    answer: "In der Gasversorgung im DACH-Raum wird das Betriebsvolumen häufig nach DIN 1343 auf den Normzustand (T_n = 273,15 K bzw. 0 °C und p_n = 1.013,25 hPa) normiert. Bei konstantem Normdruck folgt die thermische Volumenkorrektur unmittelbar dem Charles'schen Gesetz: V_n = V_Betrieb × (273,15 K / T_Betrieb). Bei gleichzeitig abweichendem Druck wird zusätzlich die Druckkomponente über das kombinierte Gasgesetz berücksichtigt."
---

Das **Charles'sche Gesetz** (im deutschsprachigen Raum auch als **1. Gesetz von Gay-Lussac** bekannt) beschreibt die isobare Zustandsänderung einer abgeschlossenen idealen Gasmenge. Es besagt, dass bei konstantem Druck (`p = konstant`) und unveränderter Stoffmenge (`n = konstant`) das **Volumen** `V` eines Gases **direkt proportional zur absoluten Temperatur** `T` in Kelvin ist. Erhitzt man ein eingeschlossenes Gas bei gleichbleibendem Umgebungsdruck, bewegen sich die Moleküle schneller, legen größere mittlere Weglängen zurück und beanspruchen mehr Raum – das Volumen vergrößert sich linear mit der Temperatur.

In Gleichungsform gilt `V₁ / T₁ = V₂ / T₂`. Dabei muss die Temperatur zwingend in Kelvin (`K = °C + 273,15`) eingesetzt werden, da nur die thermodynamische Temperaturskala am absoluten Nullpunkt beginnt. Für sofortige Umrechnungen und Berechnungen nutzen Sie unseren [Charles'sches Gesetz Rechner](/de/rechner/charles-gesetz-rechner).

## Thermodynamische Grundlagen und die Kelvin-Skala

### Die Grundgleichung und ihre Umformungen

Aus der thermischen Zustandsgleichung idealer Gase (`p × V = n × R × T`) folgt für konstanten Druck `p` und konstante Stoffmenge `n`, dass der Quotient `V / T` unveränderlich bleibt:

```text
V₁ / T₁ = V₂ / T₂ = konstant   (bei p = konstant, n = konstant)
```

Je nachdem, welche Größe unbekannt ist, stellt sich die Gleichung wie folgt um:

- Gesuchtes Endvolumen: `V₂ = V₁ × (T₂ / T₁)`
- Gesuchte Endtemperatur: `T₂ = T₁ × (V₂ / V₁)`
- Gesuchtes Anfangsvolumen: `V₁ = V₂ × (T₁ / T₂)`
- Gesuchte Anfangstemperatur: `T₁ = T₂ × (V₁ / V₂)`

Für das Volumen können alle gängigen Volumeneinheiten (`m³`, `L`, `dm³`, `mL`) frei gewählt werden, solange `V₁` und `V₂` dieselbe Einheit tragen. Bei der Temperatur ist ausschließlich die **Kelvin-Skala** zulässig. Die Umrechnung aus Grad Celsius (`ϑ`) erfolgt exakt über:

```text
T [K] = ϑ [°C] + 273,15
```

### Zusammenhang mit dem thermischen Ausdehnungskoeffizienten

Historisch formulierte Gay-Lussac das Gesetz über den isobaren Volumenausdehnungskoeffizienten `γ₀` für ideale Gase bei `0 °C`: Pro Kelvin Temperaturerhöhung dehnt sich ein Gas um exakt `1 / 273,15` seines Volumens bei `0 °C` aus (`γ₀ ≈ 0,003661 K⁻¹`). Die zugehörige lineare Beziehung lautet:

```text
V(ϑ) = V₀ × (1 + γ₀ × ϑ)   mit V₀ = Volumen bei 0 °C (273,15 K)
```

Beide Schreibweisen sind mathematisch identisch. Sobald eine Temperatur von `273,15 °C` (`546,30 K`) erreicht wird, hat sich das Gasvolumen gegenüber `0 °C` exakt verdoppelt.

## Schritt-für-Schritt-Rechenbeispiel: Abkühlung eines Prüfgasvolumens

In einem Kalibrierlabor befindet sich ein extrem dehnbarer, spannungsfreier Prüfballon mit einem Anfangsvolumen von `V₁ = 12,00 L` bei einer Raumtemperatur von `ϑ₁ = 22,0 °C` und konstantem Luftdruck (`1.013,25 hPa`). Der Ballon wird anschließend in eine Kältekammer mit `ϑ₂ = −18,0 °C` überführt, wobei der Umgebungsdruck unverändert bleibt. Welches Volumen `V₂` nimmt das Gas nach vollständigem Temperaturausgleich ein?

1. **Temperaturen von Grad Celsius in Kelvin umrechnen:**
   - `T₁ = 22,0 + 273,15 = 295,15 K`
   - `T₂ = −18,0 + 273,15 = 255,15 K`
2. **Formel nach dem gesuchten Endvolumen `V₂` umstellen:**
   `V₂ = V₁ × (T₂ / T₁)`
3. **Zahlenwerte einsetzen und berechnen:**
   `V₂ = 12,00 L × (255,15 K / 295,15 K) = 12,00 L × 0,864476 ≈ 10,37 L`

Durch die Abkühlung um `40 K` schrumpft das Gasvolumen um `1,63 L` beziehungsweise um `13,55 %` auf **`10,37 L`**. Hätte man fälschlicherweise direkt mit Grad Celsius gerechnet (`12,00 × (−18,0 / 22,0)`), wäre ein physikalisch unsinniger Wert von `−9,82 L` herausgekommen.

## Isobare Volumenentwicklung von 1,000 Liter Gas über verschiedene Temperaturen

Die folgende Referenztabelle veranschaulicht die theoretische Ausdehnung eines idealen Gases (beispielsweise Helium oder trockener Stickstoff oberhalb des jeweiligen Taupunkts) ausgehend vom Normzustand `V₀ = 1,000 L` bei `0,0 °C` (`273,15 K`) unter konstantem Normaldruck.

| Temperatur `ϑ` (°C) | Absolute Temperatur `T` (K) | Volumen `V` (L) | Veränderung vs. `0 °C` | Typisches Umfeld / Praxisbezug |
| :--- | :--- | :--- | :--- | :--- |
| `−78,5 °C` | `194,65 K` | `0,7126 L` | `−28,7 %` | Trockeneis-Kühlung (Helium bleibt gasförmig) |
| `−20,0 °C` | `253,15 K` | `0,9268 L` | `−7,3 %` | Winterkälte / Tiefkühllager |
| `0,0 °C` | `273,15 K` | `1,0000 L` | `0,0 %` (Referenz) | Normtemperatur nach DIN 1343 |
| `+20,0 °C` | `293,15 K` | `1,0732 L` | `+7,3 %` | Standard-Labortemperatur |
| `+100,0 °C` | `373,15 K` | `1,3661 L` | `+36,6 %` | Siedepunkt von Wasser bei Normaldruck |
| `+273,15 °C` | `546,30 K` | `2,0000 L` | `+100,0 %` (Verdopplung) | Heißluft- und Prozessgasanlagen |

## Anwendungen in Technik und Alltag sowie typische Fehlerquellen

### Technische und naturwissenschaftliche Einsatzbereiche

Das wohl bekannteste Anwendungsbeispiel ist der **Heißluftballon**. Da die Hülle unten offen ist, entspricht der Innendruck nahezu dem äußeren Luftdruck (isobar). Erhitzt der Brenner die Luft von `20 °C` (`293,15 K`) auf `100 °C` (`373,15 K`), vergrößert sich das Gasvolumen theoretisch um `27,3 %`, sodass überschüssige Luft unten entweicht. Die verbleibende warme Luft besitzt eine entsprechend geringere Dichte als die kühlere Umgebungsluft und erzeugt den notwendigen statischen Auftrieb nach dem archimedischen Prinzip.

In der **Messtechnik und Energiewirtschaft** bildet das Charles'sche Gesetz die Grundlage von Gasthermometern sowie der Temperaturkompensation bei Gaszählern. Da Erdgas je nach Außentemperatur ein anderes Volumen einnimmt, rechnen Abrechnungssysteme das gemessene Betriebsvolumen auf den einheitlichen Normzustand (`0 °C` nach DIN 1343 oder `15 °C` nach ISO 13443) zurück. Auch in der Bäckerei nutzt der Backtrieb teilweise diesen Effekt: Eingeschlossene Gasbläschen und Wasserdampf dehnen sich im heißen Ofen aus und lockern das Gebäck.

### Typische Fehlerquellen und physikalische Einschränkungen

In der Praxis treten bei Anwendung des Charles'schen Gesetzes vor allem drei Fehler auf:

1. **Rechnen mit Celsius- oder Fahrenheit-Werten:** Relative Skalen ohne absoluten Nullpunkt erzeugen falsche Verhältnisse und im Frostbereich negative Volumina. Nutzen Sie stets Kelvin (`K`).
2. **Fehlende Isobar-Bedingung:** Das Gesetz gilt nur bei **konstantem Druck**. In einem aufgepumpten Autoreifen begrenzt die Karkasse die Ausdehnung; bei Erwärmung steigen Druck und Volumen gemeinsam. In einem starren Stahlzylinder steigt allein der Druck (`p₁ / T₁ = p₂ / T₂`, Gesetz von Amontons).
3. **Phasenübergänge und reale Gase:** Bei starker Abkühlung kondensieren Gase (Wasserdampf unter `100 °C` bei `1 bar`, `CO₂` unter `−78,5 °C`), wodurch das Gasgesetz sofort endet. Bei hohen Drücken werden zudem Realgaskorrekturen (`Z`) nötig.
