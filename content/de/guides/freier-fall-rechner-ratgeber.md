---
title: "Die Physik des freien Falls: Schwerkraft im Vakuum"
description: "Kinematik des freien Falls im Vakuum verständlich erklärt: Formeln für Fallzeit und Geschwindigkeit, Fallturm-Rechenbeispiel, Grenzgeschwindigkeit und Freier Fall-Rechner."
category: "Math & Science"
relatedCalculator: "free-fall-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum fallen im Vakuum eine Feder und eine Bowlingkugel exakt gleich schnell?"
    answer: "Die auf einen Körper wirkende Gewichtskraft F_G = m × g steigt proportional zu seiner Masse m. Gleichzeitig leistet ein schwererer Körper aufgrund seiner höheren Trägheit genau im selben Verhältnis größeren Widerstand gegen Beschleunigung (a = F / m). Die Masse kürzt sich daher exakt heraus: Jeder Körper erfährt im selben Gravitationsfeld unabhängig von Gewicht oder Material exakt dieselbe Fallbeschleunigung g."
  - question: "Wie stark ändert sich die Fallbeschleunigung g an verschiedenen Orten der Erde?"
    answer: "Der internationale Standardwert beträgt 9,80665 m/s² (meist gerundet auf 9,81 m/s²). Aufgrund der Erdabplattung und der Zentrifugalkraft der Erdrotation ist g jedoch am Äquator mit rund 9,78 m/s² etwas geringer und erreicht an den Polen etwa 9,83 m/s². Mit zunehmender Höhe über dem Meeresspiegel nimmt g zudem leicht ab."
  - question: "Welche Geschwindigkeit erreicht ein Fallschirmspringer im freien Fall in der Atmosphäre?"
    answer: "Da der Luftwiderstand quadratisch mit der Geschwindigkeit wächst, beschleunigt ein Mensch in der Erdatmosphäre nicht unbegrenzt weiter. In stabiler Bauchlage stellt sich nach etwa 12 bis 15 Sekunden ein Kräftegleichgewicht zwischen Gewichtskraft und Luftwiderstand ein – die sogenannte Grenzgeschwindigkeit liegt dann bei rund 55 m/s (etwa 200 km/h), in senkrechter Kopf-voran-Haltung bei über 300 km/h."
  - question: "Verdoppelt sich die Fallzeit, wenn ein Gegenstand aus doppelter Höhe fällt?"
    answer: "Nein. Da die Fallstrecke quadratisch mit der Zeit wächst (h = ½ × g × t²), benötigt ein Körper für die doppelte Fallhöhe nur das √2-fache (etwa 1,414-fache) der Zeit. Um die Fallzeit zu verdoppeln, muss die Fallhöhe vervierfacht werden."
  - question: "Wann ist das ideale Vakuum-Modell für Berechnungen im Alltag ausreichend genau?"
    answer: "Bei kompakten, schweren Objekten (wie Steinen, Stahlkugeln oder Bauwerkzeugen) über Fallhöhen bis etwa 15 bis 20 m weicht das Vakuum-Modell nur um wenige Prozent von der Realität ab. Bei leichten, voluminösen Körpern wie Papier, Laub, Regentropfen oder bei großen Fallhöhen ab 50 m muss der aerodynamische Luftwiderstand hingegen zwingend berücksichtigt werden."
---

Der **freie Fall** bezeichnet in der klassischen Mechanik die ungestörte Bewegung eines Körpers, auf den ausschließlich die Gravitation einwirkt. Im luftleeren Raum (Vakuum) fallen alle Objekte – unabhängig von ihrer Masse, Dichte oder geometrischen Form – exakt gleich schnell, weil das Verhältnis aus antreibender Gewichtskraft und bremsender Massenträgheit für jeden Körper identisch ist (`a = F_G / m = g`).

Für Berechnungen auf der Erdoberfläche gilt in Mitteleuropa eine konstante Fallbeschleunigung von `g = 9,81 m/s²`. Das bedeutet, dass die Fallgeschwindigkeit eines aus der Ruhe losgelassenen Objekts in jeder verstrichenen Sekunde um weitere `9,81 m/s` (`35,3 km/h`) zunimmt. Mit unserem [Freier Fall-Rechner](/de/rechner/freier-fall-rechner) bestimmen Sie aus einer einzigen bekannten Größe – etwa der Fallhöhe oder der gestoppten Fallzeit – augenblicklich die exakten Werte für Aufprallgeschwindigkeit und Falldauer.

## Kinematische Gleichungen des freien Falls

Für einen Fall aus der Ruhe (`v_0 = 0 m/s`) in einem homogenen Schwerefeld ohne Luftwiderstand gelten vier zentrale Zeit-Weg- und Geschwindigkeitsgesetze. Wird das Objekt zusätzlich mit einer Anfangsgeschwindigkeit `v_0` senkrecht nach unten geworfen, erweitern sich die Gleichungen um den linearen Startterm:

```text
Fall aus der Ruhe (v_0 = 0):
  Geschwindigkeit nach Zeit t:    v(t) = g × t
  Fallstrecke nach Zeit t:        h(t) = ½ × g × t²
  Fallzeit aus bekannter Höhe h:  t    = √(2 × h / g)
  Endgeschwindigkeit bei Höhe h:  v    = √(2 × g × h)

Senkrechter Wurf nach unten (v_0 > 0):
  Geschwindigkeit:                v(t) = v_0 + g × t
  Fallstrecke:                    h(t) = v_0 × t + ½ × g × t²
  Weg-Geschwindigkeits-Bezug:     v²   = v_0² + 2 × g × h
```

Die Variablen sind wie folgt definiert:

- **`h` (Fallstrecke bzw. Fallhöhe in `m`):** Vertikal zurückgelegte Distanz vom Loslasspunkt bis zum Aufprall.
- **`t` (Fallzeit in `s`):** Dauer der reinen Fallbewegung in Sekunden.
- **`v` (Geschwindigkeit in `m/s`):** Momentangeschwindigkeit in Richtung Erdmittelpunkt (`v × 3,6` liefert den Wert in `km/h`).
- **`g` (Fallbeschleunigung in `m/s²`):** Lokale Gravitationsbeschleunigung (`9,81 m/s²` auf der Erde, `1,62 m/s²` auf dem Mond, `3,72 m/s²` auf dem Mars).

Die Gleichung `h(t) = ½ × g × t²` zeigt unmittelbar die quadratische Zeitabhängigkeit: Während der ersten Sekunde fällt ein Körper `4,91 m` tief, nach zwei Sekunden bereits `19,62 m` und nach drei Sekunden `44,15 m`.

## Schritt-für-Schritt-Rechenbeispiel: Experiment im Fallturm Bremen

Im Bremer Zentrum für angewandte Raumfahrttechnologie und Mikrogravitation (ZARM) steht einer der bekanntesten Falltürme Europas. In der evakuierten Fallröhre herrscht ein technisches Vakuum (Restdruck unter `10 Pa`), sodass Experimentierkapseln eine nutzbare Fallhöhe von `h = 110 m` nahezu vollständig ohne Luftwiderstand durchfallen (`g = 9,81 m/s²`, Start aus der Ruhe).

1. **Reine Fallzeit im Vakuum berechnen:**
   `t = √(2 × h / g) = √(2 × 110 m / 9,81 m/s²) = √(220 / 9,81) = √22,426 s² = 4,74 s`
2. **Maximale Geschwindigkeit vor dem Abbremsen im Auffangbehälter bestimmen:**
   `v = g × t = 9,81 m/s² × 4,736 s = 46,46 m/s`
3. **Umrechnung in Kilometer pro Stunde:**
   `v_kmh = 46,46 m/s × 3,6 = 167,2 km/h`
4. **Gegenprobe über die Höhenformel (Energieerhaltung):**
   `v = √(2 × 9,81 m/s² × 110 m) = √2.158,2 = 46,46 m/s`

Für knapp `4,74 Sekunden` herrscht in dieser Fallkapsel nahezu perfekte Schwerelosigkeit (Mikrogravitation), weil Kapsel und Versuchsaufbau exakt derselben Beschleunigung unterliegen und keine Stützkräfte wirken.

## Referenz-Tabelle: Fallzeiten und Aufprallgeschwindigkeiten im Vakuum

Die folgende Übersicht gibt die theoretischen Vakuumwerte für ausgewählte Fallhöhen auf der Erde (`g = 9,81 m/s²`) sowie die pro Kilogramm Masse freigesetzte spezifische Aufprallenergie an:

| Fallhöhe `h` (`m`) | Fallzeit `t` (`s`) | Geschwindigkeit `v` (`m/s`) | Geschwindigkeit (`km/h`) | Spezifische Energie (`J/kg`) | Praxisbezug |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1,0` | `0,45` | `4,43` | `15,9` | `9,8` | Sturz vom Arbeitstisch |
| `5,0` | `1,01` | `9,90` | `35,7` | `49,1` | Sprung vom 5-m-Turm |
| `10,0` | `1,43` | `14,01` | `50,4` | `98,1` | 10-m-Sprungturm im Schwimmbad |
| `25,0` | `2,26` | `22,15` | `79,7` | `245,2` | Hochhausdach (ca. 8. Stockwerk) |
| `50,0` | `3,19` | `31,32` | `112,8` | `490,5` | Brücke über tiefes Flusstal |
| `110,0` | `4,74` | `46,46` | `167,2` | `1.079,1` | Fallturm Bremen (Vakuumröhre) |
| `400,0` | `9,03` | `88,59` | `318,9` | `3.924,0` | Wolkenkratzer (Vakuum-Referenz) |

Bereits aus `10 m` Höhe entspricht die Aufprallgeschwindigkeit über `50 km/h`; ein Sturz aus `25 m` erreicht fast `80 km/h`.

## Praxisanwendungen, Luftwiderstand und physikalische Grenzen

Das Vakuum-Fallgesetz wird in der Praxis eingesetzt, um Brücken-, Schacht- oder Brunnentiefen akustisch oder optisch abzuschätzen, Fallschutzsysteme und Verpackungsprüfungen auszulegen sowie die Fallzeiten von Aufzugs-Fangvorrichtungen zu dimensionieren. Auch beim Abwerfen von Messsonden in der Geophysik liefert die Formel eine erste Näherung.

In der Erdatmosphäre weichen reale Fallkurven allerdings ab, sobald der **aerodynamische Luftwiderstand** an Gewicht gewinnt. Die bremsende Widerstandskraft wächst quadratisch mit der Geschwindigkeit: `F_W = ½ × ρ_Luft × c_w × A × v²`. Erreicht sie die Größe der Gewichtskraft `m × g`, fällt die Nettobeschleunigung auf null und der Körper sinkt mit konstanter **Grenzgeschwindigkeit** weiter:

```text
v_max = √[(2 × m × g) / (ρ_Luft × c_w × A)]
```

Hierbei stehen `ρ_Luft` für die Luftdichte (ca. `1,225 kg/m³` auf Meereshöhe), `c_w` für den Widerstandsbeiwert und `A` für die Querschnittsfläche. Dadurch entstehen zwei typische Fehlerquellen bei Berechnungen:

- **Überschätzung bei großen Höhen:** Aus `400 m` Höhe erreicht ein Mensch in der Atmosphäre keine `318,9 km/h`, sondern nähert sich bereits nach rund `12 s` seiner aerodynamischen Grenzgeschwindigkeit von rund `200 km/h`.
- **Vernachlässigung der Schalllaufzeit bei Tiefenmessungen:** Wer einen Stein in einen tiefen Brunnenschacht wirft und die Zeit bis zum Aufprallgeräusch misst, muss bei größeren Tiefen die Schallgeschwindigkeit in Luft (`≈ 343 m/s` bei `20 °C`) herausrechnen, um die Brunnentiefe nicht systematisch zu überschätzen.
- **Lokale Schwankungen der Erdbeschleunigung:** Während für Alltagsrechnungen `g = 9,81 m/s²` ausreicht, schwankt der exakte Wert auf der Erde zwischen `9,78 m/s²` am Äquator und `9,83 m/s²` an den Polen sowie mit der geografischen Höhe über dem Meeresspiegel. Für hochpräzise Messungen in der Gravimetrie, bei geodätischen Experimenten oder im Fallturm wird daher stets die lokale Erdbeschleunigung vor Ort kalibriert.
