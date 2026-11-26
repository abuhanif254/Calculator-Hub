---
title: "Elektrischer Widerstand: Den Stromfluss kontrollieren"
description: "Verstehen Sie den elektrischen Widerstand in Ohm, das Ohmsche Gesetz, spezifische Materialwiderstände, Vorwiderstände für LEDs sowie unseren Widerstands-Rechner."
category: "Math & Science"
relatedCalculator: "resistance-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Worin liegt der Unterschied zwischen Widerstand (R) und Impedanz (Z)?"
    answer: "Der ohmsche Widerstand R wirkt bei Gleichstrom und Wechselstrom gleichermaßen, ist frequenzunabhängig und wandelt elektrische Energie vollständig in Wärme um. Die Impedanz Z hingegen ist der komplexe Gesamtwiderstand im Wechselstromkreis und setzt sich aus dem ohmschen Wirkwiderstand R sowie dem frequenzabhängigen Blindwiderstand X (durch Spulen und Kondensatoren) zusammen. Beide Größen werden in Ohm (Ω) angegeben."
  - question: "Wie berechne ich den passenden Vorwiderstand für eine LED?"
    answer: "Ziehen Sie zuerst die Durchlassspannung der LED (z. B. 2,0 V bei rot oder 3,2 V bei weiß/blau) von der Versorgungsspannung ab. Diesen Spannungsabfall teilen Sie durch den gewünschten LED-Strom in Ampere (typisch 0,02 A = 20 mA). Bei 9 V und einer 2-V-LED ergibt das (9 V − 2 V) / 0,02 A = 350 Ω; in der Praxis wählen Sie den nächsthöheren Normwert der E-Reihe, also 360 Ω oder 390 Ω."
  - question: "Warum erwärmen sich Widerstände und wofür steht die Watt-Angabe?"
    answer: "Jeder Widerstand bremst Elektronen durch Stöße im Atomgitter des Materials, wodurch elektrische Energie in thermische Energie umgewandelt wird. Die entstehende Verlustleistung berechnet sich nach P = I² × R oder P = U² / R. Standard-Bedrahtungswiderstände sind oft nur für 0,25 W ausgelegt; wird diese Grenze überschritten, verfärbt sich das Bauteil, driftet im Wert ab oder brennt durch."
  - question: "Wie berechnet man den Gesamtwiderstand bei Reihen- und Parallelschaltung?"
    answer: "In einer Reihenschaltung (hintereinander geschaltet) addieren sich alle Einzelwiderstände direkt: R_ges = R_1 + R_2 + ... Der Gesamtwiderstand ist immer größer als der größte Einzelwiderstand. In einer Parallelschaltung addieren sich hingegen die Kehrwerte (Leitwerte): 1 / R_ges = 1 / R_1 + 1 / R_2 + ... Dadurch ist der Gesamtwiderstand stets kleiner als der kleinste einzelne Parallelwiderstand."
  - question: "Wie beeinflussen Temperatur und Kabelquerschnitt den Leitungswiderstand?"
    answer: "Bei reinen Metallen wie Kupfer oder Aluminium steigt der Widerstand mit zunehmender Temperatur, da die stärkere Wärmebewegung der Metallatome den Elektronenfluss behindert (Kaltleiter bzw. PTC-Verhalten). Zudem gilt R = ρ × (l / A): Verdoppelt sich die Kabellänge l, verdoppelt sich der Widerstand; verdoppelt sich die Querschnittsfläche A, halbiert sich der Widerstand."
---

Der **elektrische Widerstand** gibt an, wie stark ein Bauteil oder ein Werkstoff den Fluss elektrischer Ladungsträger hemmt. Sein Formelzeichen ist `R` (von englisch *Resistance*), die SI-Einheit ist das **Ohm (Ω)**. Ein Widerstand von `1 Ω` liegt vor, wenn eine angelegte Spannung von `1 Volt` genau einen Strom von `1 Ampere` durch den Leiter treibt.

In der Elektrotechnik und Elektronik sind Widerstände keineswegs nur unerwünschte Verlustquellen: Gezielt eingesetzte Bauelemente begrenzen Ströme zum Schutz empfindlicher Halbleiter wie LEDs oder Mikrocontroller, erzeugen definierte Teilspannungen in Messbrücken und wandeln elektrische Energie in Heizgeräten gezielt in Wärme um. Mit unserem [Widerstands-Rechner](/de/rechner/widerstand-rechner) bestimmen Sie den benötigten Widerstandswert unmittelbar aus Spannung und gewünschter Stromstärke.

## Das Ohmsche Gesetz und spezifischer Materialwiderstand

Der grundlegende Zusammenhang zwischen Spannung `U`, Stromstärke `I` und Widerstand `R` wird durch das **Ohmsche Gesetz** beschrieben:

```text
R = U / I
```

Sind neben oder anstelle von `U` und `I` die elektrische Verlustleistung `P` bekannt, lassen sich zwei weitere praxisrelevante Formen ableiten:

```text
R = U² / P    und    R = P / I²
```

Für Leitungen, Heizdrähte und Leiterbahnen lässt sich der Widerstand zudem aus der Geometrie und dem Materialkennwert – dem **spezifischen Widerstand `ρ`** (Rho) – berechnen:

```text
R = ρ × (l / A)
```

**Parameterdefinitionen:** `R` = Widerstand (`Ω`, `1 kΩ = 1.000 Ω`, `1 MΩ = 1.000.000 Ω`), `U` = Spannung (`V`), `I` = Stromstärke (`A`), `ρ` = spezifischer Widerstand bei `20 °C` (`Ω·mm²/m`, Kupfer `0,0178`), `l` = Leiterlänge (`m`), `A` = Querschnitt (`mm²`).

### Leiter, Halbleiter und Isolatoren im Überblick

Werkstoffe unterscheiden sich im spezifischen Widerstand um über zwanzig Größenordnungen. **Leiter** wie Silber, Kupfer und Aluminium besitzen viele freie Elektronen und extrem geringe Widerstände. **Halbleiter** wie Silizium lassen sich durch Dotierung oder Temperatur steuern. **Isolatoren** wie PVC, Glas oder Keramik binden Elektronen fest an die Atome und sichern den Berührungs- und Hochspannungsschutz.

### Reihen- und Parallelschaltung von Widerständen

- **Reihenschaltung:** `R_ges = R_1 + R_2 + ... + R_n` (gleicher Strom, Spannungen addieren sich)
- **Parallelschaltung:** `1 / R_ges = 1 / R_1 + 1 / R_2 + ... + 1 / R_n`; für zwei Widerstände `R_ges = (R_1 × R_2) / (R_1 + R_2)` (gleiche Spannung, Teilströme addieren sich)

## Schritt-für-Schritt-Rechenbeispiel: Vorwiderstand für eine LED

Schließen Sie eine rote LED ungeschützt an eine `9-V`-Batterie an, zerstört der unkontrollierte Strom den Halbleiter sofort.

**Gegeben:** `U_ges = 9,0 V`, Durchlassspannung `U_LED = 2,0 V`, Zielstrom `I_LED = 20 mA = 0,020 A`.

1. **Spannungsabfall am Widerstand:** `U_R = 9,0 V − 2,0 V = 7,0 V`.
2. **Erforderlicher Widerstand:** `R = 7,0 V / 0,020 A = 350 Ω`.
3. **Normwert wählen:** Als nächsthöherer Standardwert der E12-Reihe schützt `390 Ω` (oder `360 Ω` aus E24) die LED zuverlässig. Mit `390 Ω` fließt ein Strom von `I = 7,0 V / 390 Ω ≈ 17,9 mA`.
4. **Verlustleistung prüfen:** `P_R = 7,0 V × 0,0179 A ≈ 0,125 W`. Ein üblicher `0,25-W`-Widerstand bietet fast doppelte Sicherheitsreserve.

## Vergleichstabelle: Typische Widerstandswerte und Werkstoffe

Die folgende Übersicht zeigt charakteristische Widerstandswerte aus Materialtechnik, Elektronik und Elektrosicherheit (bezogen auf `20 °C` Raumtemperatur):

| Material / Bauteil | Spezifischer Widerstand `ρ` bzw. Richtwert | Typisches Einsatzgebiet | Temperaturverhalten & Besonderheit |
| :--- | :--- | :--- | :--- |
| **Silber (Ag)** | `0,016 Ω·mm²/m` | Hochfrequenzkontakte, Relais | Bester metallischer Leiter; läuft an Luft schwefelbedingt an |
| **Kupfer (Cu)** | `0,0178 Ω·mm²/m` | Hausinstallation, Wicklungen | Standardleiter; Widerstand steigt um ca. `0,39 %` pro Kelvin |
| **Aluminium (Al)** | `0,0282 Ω·mm²/m` | Erdkabel, Freileitungen | Ca. `60 %` höhere Masseersparnis pro Leitwert gegenüber Cu |
| **Konstantan (CuNi44)** | `0,49 Ω·mm²/m` | Präzisions- und Messwiderstände | Nahezu temperaturunabhängig; ideal für Shunt-Widerstände |
| **Metallschichtwiderstand** | `1 Ω – 10 MΩ` (Bauteilwert) | Elektronik, Spannungsteiler | Enge Toleranz (`±1 %` bei E96), geringes Eigenrauschen |
| **Menschlicher Körper** | ca. `1.000 Ω` (Hand–Hand, feucht) | Sicherheitsbewertung IEC 60479 | Sinkt bei feuchter Haut oder hoher Spannung rapide ab |
| **PVC / Hartgummi** | `10^13 – 10^15 Ω·mm²/m` | Kabelmäntel, Gehäuseisolation | Isolationswiderstand nach DIN VDE 0100-600 mind. `1 MΩ` |

## Praxisanwendungen, Fehlerquellen und technische Grenzen

Bei der Berechnung und Messung elektrischer Widerstände treten in Werkstatt und Labor häufig systematische Fehler auf:

- **Nicht-lineare Bauteile:** Das Ohmsche Gesetz mit konstantem Widerstand `R` gilt streng genommen nur für lineare ohmsche Widerstände bei konstanter Temperatur. Bei Halbleiterdioden, Leuchtdioden, Varistoren oder Glühlampen ändert sich der differenzielle Widerstand je nach Spannung und Eigenerwärmung massiv.
- **Temperatureinfluss:** Bei Metallen erhöht eine Temperatursteigerung `ΔT` den Widerstand gemäß `R(T) = R_20 × [1 + α × (T − 20 °C)]`. Eine `230-V`-Glühlampe hat bei `2.500 °C` Betriebstemperatur oft mehr als den zehnfachen Widerstand gegenüber dem kalten Zustand bei `20 °C`. Umgekehrt sinkt der Widerstand von Heißleitern (NTC) bei Erwärmung – ein Prinzip, das zur Einschaltstrombegrenzung und Temperaturmessung genutzt wird.
- **Messfehler bei sehr kleinen Widerständen:** Wer mit einem einfachen Zwei-Leiter-Multimeter Widerstände unter `1 Ω` misst (etwa bei Motorwicklungen oder Shunts), misst automatisch den Eigenwiderstand der Messstrippen (`0,1–0,3 Ω`) mit. Präzise Werte unter `1 Ω` erfordern eine **Vierleitermessung (Kelvin-Messung)**.
- **Normative Anforderungen an den Isolationswiderstand:** In der Gebäudetechnik prüft der Fachbetrieb bei der Erstprüfung nach **DIN VDE 0100-600** den Isolationswiderstand mit `500 V` Gleichspannung. Ein ordnungsgemäßer Stromkreis (`230/400 V`) muss dabei mindestens `1,0 MΩ` aufweisen; niedrigere Werte deuten auf Feuchtigkeit oder beschädigte Leitungsisolierungen hin. Außerdem gilt: Widerstände niemals unter anliegender Betriebsspannung mit dem Ohmmeter messen, da die interne Prüfspannung des Messgeräts verfälscht wird oder das Gerät Schaden nimmt.
