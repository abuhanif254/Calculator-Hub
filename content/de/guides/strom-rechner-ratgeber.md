---
title: "Elektrischer Strom: Der Fluss von Elektronen"
description: "Erfahren Sie, was elektrischer Strom ist, wie die Stromstärke in Ampere berechnet wird, welche Sicherheitsgrenzen nach DIN VDE gelten und wie Sie den Strom-Rechner nutzen."
category: "Math & Science"
relatedCalculator: "current-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen Gleichstrom (DC) und Wechselstrom (AC)?"
    answer: "Bei Gleichstrom (Direct Current, DC) bewegen sich die Ladungsträger dauerhaft in dieselbe Richtung, etwa aus Batterien, Akkus oder Photovoltaikmodulen. Bei Wechselstrom (Alternating Current, AC) ändert sich die Flussrichtung periodisch – im europäischen Stromnetz mit einer Frequenz von 50 Hertz, also 100 Richtungswechseln pro Sekunde. Wechselstrom lässt sich über Transformatoren verlustarm auf hohe Spannungen umspannen und eignet sich daher ideal für die Energieübertragung über weite Strecken."
  - question: "Warum löst ein Fehlerstrom-Schutzschalter (FI/RCD) bereits bei 30 Milliampere aus?"
    answer: "Für den menschlichen Körper werden Wechselströme ab etwa 30 Milliampere (0,03 A) lebensgefährlich, da sie ab dieser Schwelle Muskelkrämpfe (Loslassgrenze überschritten) und bei längerer Einwirkung Herzkammerflimmern auslösen können. Normale Leitungsschutzschalter reagieren erst bei 16 Ampere und schützen nur die Leitung vor Überhitzung, nicht aber den Menschen. Ein 30-mA-FI-Schutzschalter nach DIN VDE 0100-410 erkennt kleinste Fehlerströme zur Erde und trennt den Stromkreis innerhalb von Millisekunden."
  - question: "Wie hängt die technische Stromrichtung mit dem Elektronenfluss zusammen?"
    answer: "Historisch wurde die technische Stromrichtung vom Pluspol zum Minuspol festgelegt, bevor die Entdeckung des Elektrons bekannt war. Physikalisch fließen in metallischen Leitern jedoch die negativ geladenen Elektronen vom Minuspol (Elektronenüberschuss) zum Pluspol (Elektronenmangel). Für sämtliche Berechnungen mit dem Ohmschen Gesetz oder den Kirchhoffschen Regeln wird in der Elektrotechnik standardmäßig die technische Stromrichtung (Plus nach Minus) verwendet."
  - question: "Welcher Leitungsquerschnitt ist für 16 Ampere oder 32 Ampere erforderlich?"
    answer: "In der deutschen und europäischen Hausinstallation werden Steckdosenstromkreise mit 16 Ampere Absicherung in der Regel mit 1,5 mm² oder – bei längeren Leitungswegen und höherer Dauerlast – mit 2,5 mm² Kupferleitung verlegt. Für eine 32-Ampere-Drehstromsteckdose oder eine 22-kW-Wallbox sind je nach Verlegeart und Leitungslänge mindestens 4 mm² bis 6 mm² Kupferquerschnitt erforderlich, damit der Leiter sich nicht unzulässig erwärmt und der Spannungsfall unter 3 Prozent bleibt."
  - question: "Wie berechne ich die Stromstärke bei einem 400-Volt-Drehstromgerät?"
    answer: "Bei symmetrischem Dreiphasenwechselstrom (Drehstrom mit 400 V Außenleiterspannung) teilen Sie die Wirkleistung P nicht einfach durch 400 V, sondern berücksichtigen zusätzlich den Verkettungsfaktor Wurzel aus 3 (≈ 1,732) sowie den Leistungsfaktor cos φ: I = P / (√3 × U × cos φ). Eine 11-kW-Wallbox mit cos φ ≈ 1 zieht somit I = 11.000 W / (1,732 × 400 V × 1) ≈ 15,88 A pro Phase und passt exakt an einen 16-A-Drehstromanschluss."
---

Elektrischer Strom beschreibt die gerichtete Bewegung elektrischer Ladungsträger – in metallischen Leitern sind dies freie Elektronen – durch ein leitfähiges Medium. Die physikalische Größe für diese Flussrate ist die **elektrische Stromstärke** mit dem Formelzeichen `I` und der SI-Basiseinheit **Ampere (A)**. Während die elektrische Spannung (`U` in Volt) den treibenden Potentialunterschied darstellt, gibt die Stromstärke an, wie viel elektrische Ladung tatsächlich pro Sekunde durch einen Leiterquerschnitt transportiert wird.

Für die Dimensionierung von Leitungen, Sicherungen, Netzteilen und elektronischen Bauteilen ist die exakte Berechnung der Stromstärke unverzichtbar. Ist der Strom für einen gewählten Kabelquerschnitt zu hoch, erhitzt sich der Leiter durch ohmsche Verlustwärme bis hin zum Kabelbrand; im menschlichen Körper können bereits wenige Dutzend Milliampere tödlich wirken. Mit unserem [Strom-Rechner](/de/rechner/strom-rechner) ermitteln Sie die resultierende Stromstärke direkt aus Spannung und Widerstand nach dem Ohmschen Gesetz.

## Physikalische Grundlagen und Formeln der Stromstärke

In der Elektrotechnik wird die Stromstärke `I` grundsätzlich über zwei zentrale Beziehungen definiert: über den Ladungstransport pro Zeiteinheit sowie über das Ohmsche Gesetz im geschlossenen Stromkreis.

Die Grunddefinition über die elektrische Ladung `Q` (in Coulomb, C) und die Zeit `t` (in Sekunden, s) lautet:

```text
I = Q / t
```

Fließt eine Ladungsmenge von `1 Coulomb` innerhalb von `1 Sekunde` durch einen Leiter, entspricht dies exakt `1 Ampere` – das sind rund `6,242 × 10^18` Elektronen pro Sekunde. In praktischen Schaltungen sind jedoch meist die anliegende Spannung `U` (in Volt, V) und der elektrische Widerstand `R` (in Ohm, Ω) bekannt. Dann greift das **Ohmsche Gesetz**:

```text
I = U / R
```

Ist statt des Widerstands die elektrische Leistung `P` (in Watt, W) eines Verbrauchers angegeben, berechnet sich die Stromstärke im Gleichstromkreis und bei rein ohmschen Wechselstromverbrauchern über:

```text
I = P / U
```

### Gleichstrom (DC) vs. Wechselstrom (AC) und Drehstrom

Im europäischen Verbundnetz liegt an Haushaltssteckdosen eine Wechselspannung mit `230 V` Effektivwert bei `50 Hz` an (`325 V` Scheitelwert). Bei Motoren oder Schaltnetzteilen tritt zwischen Strom und Spannung eine Phasenverschiebung auf, die der Leistungsfaktor `cos φ` berücksichtigt:

- **Einphasiger Wechselstrom (230 V):** `I = P / (U × cos φ)`
- **Dreiphasiger Drehstrom (400 V):** `I = P / (√3 × U × cos φ)`

**Parameterübersicht:** `I` = Stromstärke (`A`, `1 mA = 0,001 A`), `U` = Spannung (`V`), `R` = Widerstand (`Ω`), `P` = Wirkleistung (`W`), `cos φ` = Leistungsfaktor (`0` bis `1`, rein ohmsch `1,0`).

## Schritt-für-Schritt-Rechenbeispiel aus der Praxis

**Szenario A: Ohmscher Verbraucher im 230-V-Netz**
Ein Heizgerät mit `R = 25,56 Ω` wird an `U = 230 V` angeschlossen (`cos φ = 1`).
1. **Stromstärke berechnen:** `I = 230 V / 25,56 Ω = 8,998 A ≈ 9,0 A`.
2. **Leistung gegenprüfen:** `P = 230 V × 9,0 A = 2.070 W` (`2,07 kW`).
3. **Absicherung bewerten:** Ein 16-A-Leitungsschutzschalter verkraftet `9,0 A` problemlos. Ein zusätzlicher 2.000-W-Verbraucher (`8,70 A`) erhöht den Gesamtstrom jedoch auf `17,70 A` und löst die Sicherung aus.

**Szenario B: Niederspannungs-Gleichstromkreis (24 V DC)**
Ein 24-V-Netzteil speist eine Last mit `R = 4,8 Ω`: `I = 24 V / 4,8 Ω = 5,0 A`. Bei einem Leitungswiderstand von `0,4 Ω` auf einer zu dünnen Zuleitung gehen bereits `U_Verlust = 5,0 A × 0,4 Ω = 2,0 V` verloren – am Verbraucher kommen nur `22 V` an.

## Richtwerte: Stromstärken, Leitungsquerschnitte und Schutzwirkung

Die folgende Tabelle ordnet typische Stromstärken aus Elektronik, Haushalt und Gebäudetechnik den passenden Kupfer-Leitungsquerschnitten und Sicherheitsgrenzen zu:

| Stromstärke (`I`) | Typische Anwendung oder Ereignis | Empfohlener Cu-Querschnitt | Wirkung und Schutzmaßnahme |
| :--- | :--- | :--- | :--- |
| `0,5 mA – 1 mA` | Wahrnehmungsschwelle auf der Haut | Signalleitung (`≤ 0,14 mm²`) | Leichtes Kribbeln spürbar, physiologisch unbedenklich |
| `10 mA – 30 mA` | Loslassgrenze / Auslösung FI-Schalter | Schutzleiter-Überwachung | Muskelverkrampfung möglich; RCD schaltet unter 30 mA ab |
| `50 mA – 100 mA` | Körperdurchströmung bei Kontaktfehler | Keine direkte Nutzung | Lebensgefahr durch Atemlähmung und Herzkammerflimmern |
| `2,0 A – 3,0 A` | USB-C-Schnellladegerät (5 V – 20 V DC) | `0,5 mm² – 0,75 mm²` | Sicher durch elektronische Überstrombegrenzung im Netzteil |
| `10 A` | Dauerlast auf Schuko-Steckdose (2.300 W) | `1,5 mm²` | Thermisch sichere Dauerbelastungsgrenze für Steckkontakte |
| `16 A` | Standard-Haushaltskreis (max. 3.680 W) | `1,5 mm² – 2,5 mm²` | Absicherung durch Leitungsschutzschalter Typ B16 |
| `32 A` (400 V) | Drehstrom-Werkstattdose / 22-kW-Wallbox | `4,0 mm² – 6,0 mm²` | Drehstrom-Sicherungsautomat 3-polig, selektive Auslösung |

## Praxisanwendungen, Fehlerquellen und Sicherheitsnormen

In der Praxis scheitern Stromberechnungen und Messungen meist nicht an der Formel, sondern an physikalischen Nebeneffekten und fehlerhaften Messaufbauten:

1. **Hohe Einschaltströme (Inrush Current):** Glühlampen, Halogenstrahler und Elektromotoren verhalten sich nicht streng linear. Eine kalte Glühwendel besitzt einen bis zu zehnmal geringeren Widerstand als im glühenden Betrieb; Elektromotoren ziehen beim Anlaufen kurzzeitig das Fünf- bis Achtfache ihres Nennstroms. Für solche Lasten sind träge Sicherungen oder Leitungsschutzschalter der Charakteristik C erforderlich.
2. **Reihen- vs. Parallelschaltung beim Messen:** Ein Amperemeter besitzt einen extrem kleinen Innenwiderstand und muss zwingend **in Reihe** zum Verbraucher geschaltet werden. Wer das Multimeter im Ampere-Messbereich versehentlich parallel an eine Steckdose hält, verursacht einen satten Kurzschluss. Für hohe Ströme empfehlen sich berührungslose Strommesszangen.
3. **Temperaturabhängige Leitungserwärmung und Normvorgaben:** Nach **DIN VDE 0100-520** hängt die zulässige Strombelastbarkeit einer Leitung stark von der Verlegeart (z. B. wärmegedämmte Wand vs. offenes Rohr) und der Häufung mehrerer Kabel ab. Zudem begrenzen Normen den Spannungsfall innerhalb der Kundenanlage auf maximal `3 %` für Beleuchtungs- und `5 %` für andere Stromkreise (nach DIN 18015-1 empfohlen max. `3 %` ab Zähler).
4. **Physiologische Sicherheitsgrenzen nach IEC 60479-1:** Schon Ströme ab `50 mA` Wechselstrom durch den Brustkorb können je nach Einwirkdauer tödlich enden. Gleichstrom gilt zwar erst ab etwa `120 V` Berührungsspannung als unmittelbar lebensgefährlich (gegenüber `50 V` bei AC), verursacht bei hohen Stromstärken wie in Photovoltaik-Strings oder Elektroauto-Batterien jedoch gefährliche Lichtbögen, die nicht von selbst verlöschen.
