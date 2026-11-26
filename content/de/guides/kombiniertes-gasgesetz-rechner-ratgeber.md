---
title: "Kombiniertes Gasgesetz Rechner: Veränderliche Bedingungen"
description: "Erfahren Sie, wie das kombinierte Gasgesetz die Gesetze von Boyle-Mariotte, Charles und Gay-Lussac vereint und wie Sie Zustandsänderungen berechnen."
category: "Math & Science"
relatedCalculator: "combined-gas-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wann nutzt man das kombinierte Gasgesetz statt des idealen Gasgesetzes PV = nRT?"
    answer: "Das kombinierte Gasgesetz ist immer dann ideal, wenn sich ein Gas mit unveränderter Stoffmenge (geschlossener Behälter, Ballon, Zylinder) von einem bekannten Anfangszustand in einen neuen Endzustand bewegt und weder die Molzahl noch die Gaskonstante R bekannt sein müssen. Sind dagegen Masse oder Molzahl gesucht, wird PV = nRT benötigt."
  - question: "Warum dürfen Druck und Volumen beliebige Einheiten haben, die Temperatur aber nicht?"
    answer: "Bei Druck und Volumen kürzt sich jeder konstante Umrechnungsfaktor zwischen linker und rechter Gleichungsseite heraus, sofern beide Seiten dieselbe Einheit nutzen (etwa beides in Bar oder beides in Liter). Bei der Temperatur ist die Celsius-Skala jedoch gegenüber Kelvin um +273,15 verschoben; diese Addition kürzt sich bei Verhältnissen T₂ / T₁ nicht heraus."
  - question: "Darf das kombinierte Gasgesetz beim Aufpumpen eines Reifens angewendet werden?"
    answer: "Nein, beim Aufpumpen gelangt zusätzliche Luft in den Reifen, sodass die Stoffmenge n nicht konstant bleibt. Das kombinierte Gasgesetz gilt jedoch hervorragend, um bei einem bereits aufgepumpten, dichten Reifen die Druckänderung zwischen warmer Werkstatt und frostiger Außentemperatur zu berechnen."
  - question: "Was passiert, wenn bei einer Zustandsänderung gleichzeitig der Druck sinkt und die Temperatur fällt?"
    answer: "Die beiden Effekte wirken auf das Gasvolumen gegensätzlich: Ein sinkender Druck vergrößert das Volumen, während eine fallende Temperatur das Gas zusammenzieht. Erst die vollständige Formel V₂ = V₁ × (p₁ / p₂) × (T₂ / T₁) zeigt exakt, welcher Einfluss überwiegt."
  - question: "Wie rechnet man einen gemessenen Betriebsvolumenstrom in Normkubikmeter um?"
    answer: "Über das kombinierte Gasgesetz setzt man den aktuellen Betriebszustand (p₁, V₁, T₁) mit den Normbedingungen nach DIN 1343 (p₂ = 1.013,25 hPa, T₂ = 273,15 K) gleich. Dadurch erhält man sofort das normierte Volumen V₀ für Gaszähler, Verdichter oder Druckluftanlagen."
---

Das kombinierte Gasgesetz beschreibt die Zustandsänderung einer konstanten Gasmenge über die Gleichung `(p₁ × V₁) / T₁ = (p₂ × V₂) / T₂`. Es fasst die drei klassischen Gasgesetze von Boyle-Mariotte, Charles und Gay-Lussac zu einer einzigen Formel zusammen und ermöglicht die präzise Berechnung von Enddruck, Endvolumen oder Endtemperatur, sobald sich zwei oder alle drei Größen gleichzeitig verändern.

Da sich bei einem geschlossenen System die Stoffmenge `n` und die Gaskonstante `R` zwischen Anfangszustand (`1`) und Endzustand (`2`) nicht ändern, entfallen beide Größen vollständig aus der Rechnung. Mit unserem [Kombiniertes Gasgesetz Rechner](/de/rechner/kombiniertes-gas-gesetz-rechner) bestimmen Sie jede der sechs Variablen sofort mit automatischer Kelvin-Konvertierung.

## Herleitung und die drei Teilgesetze im Überblick

Ausgangspunkt ist das ideale Gasgesetz in umgestellter Form: `(p × V) / T = n × R`. Bleibt das System nach außen dicht und laufen keine chemischen Reaktionen ab, ist das Produkt `n × R` für jeden Zustand identisch. Daraus folgt unmittelbar die kombinierte Verhältnisgleichung:

```text
(p₁ × V₁) / T₁ = (p₂ × V₂) / T₂
```

Durch Multiplikation über Kreuz lässt sich die Gleichung schnell nach jeder unbekannten Endgröße umstellen:

```text
p₂ = p₁ × (V₁ / V₂) × (T₂ / T₁)
V₂ = V₁ × (p₁ / p₂) × (T₂ / T₁)
T₂ = T₁ × (p₂ × V₂) / (p₁ × V₁)
```

Wird eine der drei Größen konstant gehalten, reduziert sich die allgemeine Formel automatisch auf eines der drei historischen Einzelgesetze:

1. **Gesetz von Boyle-Mariotte (isotherm, `T₁ = T₂`):** Druck und Volumen verhalten sich umgekehrt proportional (`p₁ × V₁ = p₂ × V₂`).
2. **Gesetz von Charles (isobar, `p₁ = p₂`):** Volumen und absolute Temperatur wachsen direkt proportional zueinander (`V₁ / T₁ = V₂ / T₂`).
3. **Gesetz von Amontons / Gay-Lussac (isochor, `V₁ = V₂`):** Druck und absolute Temperatur steigen im starren Gefäß direkt proportional (`p₁ / T₁ = p₂ / T₂`).

Für die korrekte Anwendung gelten zwei strikte Einheitenregeln: Erstens müssen `p₁` und `p₂` sowie `V₁` und `V₂` jeweils in derselben Einheit vorliegen (etwa beide in `bar` oder `hPa`, bzw. `L` oder `m³`), und zwar stets als **Absolutdruck**. Zweitens müssen `T₁` und `T₂` zwingend in **Kelvin** (`T [K] = t [°C] + 273,15`) eingesetzt werden.

## Schritt-für-Schritt-Beispiel: Gasvolumen eines Wetterballons beim Aufstieg

Ein meteorologischer Wetterballon wird am Boden bei einem Luftdruck von `p₁ = 1.000 hPa` und einer Umgebungstemperatur von `t₁ = 20,0 °C` mit `V₁ = 2,50 m³` Helium befüllt. In der oberen Troposphäre (rund `10 km` Höhe) sinkt der Außendruck auf `p₂ = 250 hPa` und die Temperatur fällt auf `t₂ = −50,0 °C`. Wie groß ist das Gasvolumen `V₂` in dieser Höhe, wenn die elastische Ballonhülle praktisch keinen eigenen Überdruck aufbaut?

1. **Beide Temperaturen in Kelvin umrechnen:**
   `T₁ = 20,0 °C + 273,15 = 293,15 K`
   `T₂ = −50,0 °C + 273,15 = 223,15 K`
2. **Gleichung nach dem Endvolumen `V₂` umstellen:**
   `V₂ = V₁ × (p₁ / p₂) × (T₂ / T₁)`
3. **Druck- und Temperaturverhältnis getrennt analysieren:**
   Das Druckverhältnis beträgt `p₁ / p₂ = 1.000 hPa / 250 hPa = 4,00`. Durch die Druckabnahme allein würde sich das Volumen vervierfachen (`2,50 m³ × 4,00 = 10,00 m³`).
   Das Temperaturverhältnis beträgt `T₂ / T₁ = 223,15 K / 293,15 K = 0,7612`. Die starke Abkühlung zieht das Gas also auf `76,12 %` zusammen.
4. **Endvolumen berechnen:**
   `V₂ = 2,50 m³ × 4,00 × 0,761214 = 10,00 m³ × 0,761214 = 7,612 m³ ≈ 7,61 m³`

Das Ergebnis verdeutlicht, warum Wetterballons am Boden scheinbar schlaff gefüllt starten: Der Druckabfall dominiert gegenüber der Abkühlung deutlich, sodass das Volumen in großer Höhe auf ein Vielfaches anwächst, bis die Hülle schließlich platzt.

## Prozessarten und Sonderfälle im Vergleich

Die folgende Übersicht zeigt, wie das kombinierte Gasgesetz unterschiedliche technische und naturwissenschaftliche Zustandsänderungen abbildet und wo seine Grenzen liegen.

| Prozessart | Konstante Größe | Resultierende Formel | Physikalischer Effekt | Typisches Praxisbeispiel |
| :--- | :--- | :--- | :--- | :--- |
| **Allgemeine Zustandsänderung** | Stoffmenge `n` | `(p₁ × V₁)/T₁ = (p₂ × V₂)/T₂` | Druck, Volumen und Temperatur gekoppelt | Wetterballon, Tauchgase, Pneumatik |
| **Isotherm (Boyle-Mariotte)** | `n` und `T` | `p₁ × V₁ = p₂ × V₂` | Doppelter Druck halbiert das Volumen | Langsames Abtauchen, Kompressor-Stufe |
| **Isobar (Charles)** | `n` und `p` | `V₁ / T₁ = V₂ / T₂` | Erwärmung dehnt das Gas linear aus | Heißluftballon, Gasometer mit Schwimmglocke |
| **Isochor (Amontons / Gay-Lussac)** | `n` und `V` | `p₁ / T₁ = p₂ / T₂` | Erwärmung steigert den Druck linear | Reifendruck bei Temperaturwechsel, Spraydose |
| **Normumrechnung (DIN 1343)** | `n` | `V₀ = V × (p / 1.013,25 hPa) × (273,15 K / T)` | Normierung auf `0 °C` und `1.013,25 hPa` | Erdgas- und Druckluftabrechnung (`Nm³`) |
| **Offenes System (Grenze!)** | keine (`n` variabel) | `p × V = n × R × T` erforderlich | Zu- oder Abstrom von Molekülen | Reifen aufpumpen, Abblasen über Ventil |

## Typische Anwendungen, Fehlerquellen und Modellgrenzen

In der Gas- und Energiewirtschaft gehört das kombinierte Gasgesetz zur täglichen Abrechnungspraxis: Erdgaszähler erfassen ein Betriebsvolumen (`Bm³`) bei lokalem Leitungsdruck und Gastemperatur. Für eine korrekte Umrechnung in Kilowattstunden wird dieses Volumen mithilfe der Zustandszahl `z = (p_Gas / p_Norm) × (T_Norm / T_Gas) / K` direkt in Normkubikmeter (`Nm³`) überführt, wobei `K` die Kompressibilitätszahl berücksichtigt.

In der Praxis treten trotz der kompakten Formel immer wieder vier typische Fehler auf:

- **Überdruck statt Absolutdruck:** Ein Pkw-Reifen mit `2,40 bar` Manometerdruck bei `+20 °C` besitzt bei `1,01 bar` Luftdruck einen Absolutdruck von `3,41 bar`. Fällt die Temperatur auf `−10 °C` (`263,15 K`), sinkt der Absolutdruck isochor auf `3,06 bar` (Manometeranzeige `2,05 bar`). Wer direkt mit `2,40 bar` rechnet, unterschätzt den Druckabfall deutlich.
- **Grad Celsius statt Kelvin:** Negative Temperaturen würden rechnerisch zu unphysikalischen negativen Volumina führen; bei `0 °C` wäre die Formel undefiniert.
- **Veränderliche Stoffmenge:** Undichte Ventile oder kondensierender Wasserdampf verändern `n`. Bei feuchten Gasen muss vorab der Wasserdampfpartialdruck abgezogen werden.
- **Hohe Drücke (> 50 bar) nahe der Verflüssigung:** Reale Gase erfordern dort Kompressibilitätsfaktoren (`Z₁`, `Z₂`) gemäß `(p₁ × V₁) / (Z₁ × T₁) = (p₂ × V₂) / (Z₂ × T₂)`.
