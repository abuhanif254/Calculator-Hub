---
title: "Elektrische Spannung verstehen: Der Druck des Stroms"
description: "Was elektrische Spannung (Volt) physikalisch bedeutet, wie Potenzialdifferenzen in Batterien und Stromnetzen entstehen und wie Sie U mit unserem Spannungs-Rechner exakt bestimmen."
category: "Math & Science"
relatedCalculator: "voltage-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was genau bedeutet die Einheit Volt physikalisch?"
    answer: "Ein Volt (1 V) entspricht der Potenzialdifferenz zwischen zwei Punkten, bei der genau 1 Joule Arbeit erforderlich ist (oder frei wird), um eine elektrische Ladung von 1 Coulomb zwischen diesen Punkten zu bewegen: 1 V = 1 J/C = 1 W/A. Spannung ist somit die potenzielle Energie pro Ladungseinheit."
  - question: "Warum tötet nicht primär die hohe Volt-Zahl, sondern der Stromfluss?"
    answer: "Gewebeschäden und Herzkammerflimmern entstehen durch die durch den Körper fließende Stromstärke (Ampere) und die Einwirkdauer. Eine elektrostatische Entladung an einer Türklinke erreicht leicht 15.000 bis 20.000 Volt, bleibt aber harmlos, weil die Ladungsmenge winzig ist und die Spannung sofort zusammenbricht. Dennoch ist Spannung zwingend nötig, um den Körperwiderstand überhaupt zu überwinden."
  - question: "Was unterscheidet die Leerlaufspannung von der Klemmenspannung einer Batterie?"
    answer: "Die Leerlaufspannung (U_0) misst man an einer unbelasteten Batterie ohne Stromfluss; bei einer vollen 12-V-Autobatterie liegt sie bei etwa 12,6 bis 12,7 V. Sobald Strom fließt, fällt ein Teil dieser Spannung am Innenwiderstand R_i der Batterie ab, sodass an den Polen nur noch die niedrigere Klemmenspannung U_Kl = U_0 − I × R_i anliegt."
  - question: "Warum hat das europäische Stromnetz 230 V, obwohl der Spitzenwert bei 325 V liegt?"
    answer: "Die Angabe 230 V bezeichnet den Effektivwert (RMS) der sinusförmigen Wechselspannung. Eine Wechselspannung von 230 V RMS setzt an einem ohmschen Heizwiderstand exakt dieselbe mittlere Wärmeenergie um wie eine konstante Gleichspannung von 230 V. Die Scheitelspannung erreicht dabei jedoch das √2-Fache, also 230 V × 1,4142 ≈ 325 V."
  - question: "Wie berechne ich den Spannungsfall auf einem langen Stromkabel?"
    answer: "Berechnen Sie zuerst den Gesamtwiderstand der Hin- und Rückleitung über R = (ρ × 2 × l) / A, wobei ρ der spezifische Widerstand (bei Kupfer 0,0178 Ω·mm²/m), l die einfache Kabellänge in Metern und A der Querschnitt in mm² ist. Multipliziert mit dem Laststrom I ergibt sich der Spannungsfall ΔU = R × I."
---

Auf einer AA-Batterie steht „1,5 V“, auf einer Autobatterie „12 V“ und an einer Haushaltssteckdose liegen „230 V“ an. Die **elektrische Spannung** (Formelzeichen *U*, Einheit **Volt (V)** nach Alessandro Volta) beschreibt physikalisch die elektrische Potenzialdifferenz zwischen zwei Punkten eines Feldes. Anschaulich wirkt Spannung wie ein „elektrischer Druck“: Sie gibt an, wie viel Energie pro Ladungseinheit bereitsteht, um Elektronen durch einen Leiter zu bewegen.

Ohne Potenzialdifferenz bewegen sich freie Elektronen in einem Metalldraht lediglich ungeordnet aufgrund ihrer Wärmeenergie – ein Netto-Strom fließt nicht. Erst eine angelegte Spannung zwingt die Ladungsträger in eine gerichtete Bewegung, deren Stärke vom Widerstand abhängt (`U = R × I`). Für schnelle Berechnungen aus Strom und Widerstand nutzen Sie unseren [Spannungs-Rechner](/de/rechner/spannung-rechner).

## Physikalische Definition, Potenzialdifferenz und Berechnung

### Potenzial vs. Spannung und die Batterie

Die Spannung `U` ist stets die **Differenz** zweier elektrischer Potenziale (`U = φ₁ − φ₂`). Sie existiert niemals an einem einzelnen Punkt allein, sondern immer zwischen zwei Bezugspunkten. Energetisch entspricht Spannung der Arbeit `W` pro verschobener Ladung `Q`:

```text
U = W / Q     (1 V = 1 J / 1 C)
```

In einer Batterie trennt eine chemische Reaktion Elektronen von ihren Atomen: Am Minuspol stauen sich Elektronen, am Pluspol herrscht Elektronenmangel. Schließt ein Verbraucher den Stromkreis, treibt diese Potenzialdifferenz den Strom vom Minus- zum Pluspol, bis die Reaktanden erschöpft sind.

### Berechnung über das Ohmsche Gesetz und Leistung

Je nach gegebenen Messgrößen stehen drei gleichwertige Standardgleichungen bereit: `U = R × I` (aus Widerstand und Strom), `U = P / I` (aus Wirkleistung und Stromstärke) sowie `U = √(P × R)` (aus Leistung und bekanntem Lastwiderstand). In der elektrischen Gebäude- und Fahrzeuginstallation dient außerdem `ΔU = I × R_Leitung` zur exakten Bestimmung des **Spannungsfalls** entlang langer Kupfer- oder Aluminiumleitungen. Da jeder reale Leiter einen nicht zu vernachlässigenden Widerstand aufweist, sinkt die direkt am Endgerät verfügbare Spannung umso stärker, je höher der gezogene Laststrom und je länger oder dünner das verlegte Kabel ausfällt.

### Gleichspannung (DC) und Wechselspannung (AC)

Bei **Gleichspannung (DC)** bleiben Polarität und Betrag über die Zeit konstant, wie es bei Batterien, Lithium-Ionen-Akkus, Photovoltaikmodulen und modernen USB-Netzteilen der Fall ist. Bei **Wechselspannung (AC)** kehren Polarität und Amplitude hingegen periodisch sinusförmig um: Das europäische Verbundnetz arbeitet mit einer Frequenz von `50 Hz` (entspricht 100 Nulldurchgängen pro Sekunde) bei einem Effektivwert von `230 V` zwischen Außen- und Neutralleiter sowie `400 V` zwischen zwei Außenleitern im dreiphasigen Drehstromnetz. Der Effektivwert gibt dabei jene Gleichspannung an, die an einem rein ohmschen Heizwiderstand exakt dieselbe mittlere thermische Leistung umsetzen würde; die maximale Scheitelspannung erreicht jedoch das `√2`-Fache (`230 V × 1,4142 ≈ 325 V`).

## Schritt-für-Schritt-Beispiel: Spannungsfall auf einer Gleichstromleitung

Eine `12,0-V`-Solarbatterie speist in einem ausgebauten Campingfahrzeug einen Kompressorkühlschrank, der im aktiven Kühlbetrieb konstant `I = 8,5 A` zieht. Das zweipolige Kupferkabel zwischen Batterie und Gerät ist einfach `l = 10 m` lang (Hin- und Rückleiter zusammen `20 m`) und weist einen Aderquerschnitt von `A = 2,5 mm²` auf. Der spezifische Widerstand von Kupfer bei Raumtemperatur beträgt `ρ = 0,0178 Ω·mm²/m`. Wie hoch fällt der Spannungsverlust aus?

1. **Leitungswiderstand berechnen:** Berücksichtigen Sie den doppelten Weg (`2 × 10 m = 20 m`):
   `R_Leitung = (0,0178 Ω·mm²/m × 20 m) / 2,5 mm² = 0,1424 Ω`
2. **Spannungsfall über `U = R × I` ermitteln:** Multiplikation mit `I = 8,5 A` ergibt:
   `ΔU = 0,1424 Ω × 8,5 A = 1,21 V`
3. **Verbraucherspannung prüfen:** Subtraktion von der Batteriespannung liefert:
   `U_Last = 12,0 V − 1,21 V = 10,79 V`
4. **Bewertung und Querschnittswahl:** Ein Verlust von `1,21 V` (`10,1 %`) sowie `10,29 W` Kabelheizleistung lässt viele 12-V-Kühlschränke wegen Unterspannung abschalten. Ein Wechsel auf `6,0 mm²` senkt `R_Leitung` auf `0,0593 Ω` und `ΔU` auf `0,50 V` (`4,2 %`). Prüfen Sie solche Werte direkt mit dem [Spannungs-Rechner](/de/rechner/spannung-rechner).

## Vergleichstabelle: Typische Spannungsniveaus in Natur und Technik

| System / Quelle | Nennspannung (U) | Spannungsart | Typischer Strombereich | Praxis- und Sicherheitskontext |
| --- | --- | --- | --- | --- |
| Menschliche Nervenzelle | `−70 mV` bis `+30 mV` | Biologisch | Nano- bis Mikroampere | Reizleitung über Ionenkanäle |
| AA-Alkaline-Batterie | `1,5 V` | Gleichspannung (DC) | `10 mA` bis `1,0 A` | Kleingeräte und Sensorik |
| USB-C Power Delivery | `5 V` bis `48 V` | Gleichspannung (DC) | bis `5,0 A` (`max. 240 W`) | Notebooks und Schnelllader |
| Kfz-Bordnetz | `12 V` (`14,4 V` Ladung) | Gleichspannung (DC) | `1 A` bis `400 A` | Hohe Ströme verlangen dicke Kabel |
| Europäisches Hausnetz | `230 V` (`325 V` Spitze) | Wechselspannung (`50 Hz`) | bis `16 A` je Kreis | Berührungsschutz und RCD Pflicht |
| Drehstromnetz (Starkstrom) | `400 V` (Außenleiter) | 3-Phasen-AC (`50 Hz`) | `16 A` bis `63 A` | Wallboxen, Herde, Motoren |
| Bahnoberleitung (DACH) | `15.000 V` (`15 kV`) | Wechselspannung (`16,7 Hz`) | mehrere `100 A` | Gefahr durch Lichtbogenüberschlag |

## Gefahr durch Spannung vs. Strom, Messfehler und Normen

Der Satz „Nicht die Volt töten, sondern die Ampere“ ist nur halb richtig: Zwar schädigt der fließende Strom das Gewebe, doch ist eine hinreichende Spannung nötig, um den Körperwiderstand (`ca. 1.000 bis 2.500 Ω`) zu überwinden. Ein elektrostatischer Funke von `20.000 V` ist wegen winziger Ladung harmlos; `230 V` aus der Steckdose treiben dagegen tödliche Ströme. Nach **DIN VDE 0100-410** gelten nur Schutzkleinspannungen (SELV/PELV) bis `50 V AC` oder `120 V DC` als dauerhaft berührungssicher.

Vermeiden Sie bei Messungen und Planungen diese typischen Fehler:

- **Voltmeter in Reihe anschließen:** Spannung wird ausschließlich **parallel** zum Verbraucher gemessen; ein Reihenanschluss unterbricht den Stromkreis.
- **Leerlauf- mit Lastspannung verwechseln:** Alternde Akkus zeigen unbelastet oft `12,4 V`, brechen unter Last aber durch hohen Innenwiderstand sofort ein.
- **Effektiv- und Scheitelwert verwechseln:** Bauteile am `230-V`-Netz müssen für den Scheitelwert (`325 V` plus Reserve) spannungsfest sein.
- **Spannungsfall bei Kleinspannung unterschätzen:** `1 V` Kabelverlust entspricht bei `230 V` nur `0,4 %`, bei `12 V` jedoch bereits `8,3 %`.
