---
title: "Dichte verstehen: Warum Eis schwimmt"
description: "Meistern Sie das physikalische Konzept der Dichte. Erfahren Sie, wie Masse, Volumen und die Dichteanomalie des Wassers zusammenhängen, und nutzen Sie unseren Dichte-Rechner."
category: "Math & Science"
relatedCalculator: "density-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum ist Eis leichter als flüssiges Wasser, obwohl beide aus denselben Molekülen bestehen?"
    answer: "Eis ist nicht pro Molekül leichter, sondern nimmt bei gleicher Masse ein rund 9 % größeres Volumen ein. Beim Gefrieren ordnen sich die H₂O-Moleküle über gerichtete Wasserstoffbrückenbindungen in einem offenen, sechseckigen Kristallgitter an, wodurch größere Hohlräume entstehen als in flüssigem Wasser. Dadurch sinkt die Dichte auf 0,917 g/cm³ und Eis schwimmt oben."
  - question: "Wie rechnet man die Dichte von g/cm³ korrekt in kg/m³ um?"
    answer: "Multiplizieren Sie den Zahlenwert in g/cm³ einfach mit 1.000, um kg/m³ zu erhalten (und umgekehrt teilen Sie durch 1.000). Da 1 kg gleich 1.000 g sind und 1 m³ exakt 1.000.000 cm³ umfasst, ergibt sich der Umrechnungsfaktor 1.000.000 / 1.000 = 1.000. Beispielsweise entspricht Aluminium mit 2,70 g/cm³ exakt 2.700 kg/m³."
  - question: "Sind Dichte und Viskosität dasselbe?"
    answer: "Nein. Dichte beschreibt die Masse pro Volumeneinheit, während Viskosität die Zähflüssigkeit (innere Reibung) eines Fluids angibt. Speiseöl ist beispielsweise deutlich zähflüssiger als Wasser, besitzt mit rund 0,91 g/cm³ jedoch eine geringere Dichte als Wasser (1,00 g/cm³) und schwimmt deshalb auf der Wasseroberfläche."
  - question: "Wie lässt sich die Dichte eines unregelmäßig geformten Körpers ohne Maßband bestimmen?"
    answer: "Mithilfe der archimedischen Wasserverdrängung: Wiegen Sie den trockenen Gegenstand zunächst auf einer Feinwaage, um seine Masse zu bestimmen. Tauchen Sie ihn anschließend vollständig in einen teilweise gefüllten Messzylinder mit Wasser ein. Die Differenz des Wasserstands vor und nach dem Eintauchen entspricht exakt dem Volumen des Körpers, sodass Sie ρ = m / V direkt berechnen können."
  - question: "Wann stimmt die gemessene Dichte eines Materials nicht mit der Tabellen-Reindichte überein?"
    answer: "Sobald ein Objekt Lufteinschlüsse, Poren oder Hohlräume enthält – etwa bei Schüttgütern wie Sand, Schnee oder Getreide, bei Schaumstoffen oder bei hohlen Gussteilen –, fällt die sogenannte Roh- oder Schüttdichte niedriger aus als die Reindichte des massiven Werkstoffs. Auch Temperaturänderungen und Legierungszusätze verändern den Messwert."
---

Auf die klassische Rätselfrage, ob ein Kilogramm Federn oder ein Kilogramm Blei schwerer sei, lautet die Antwort: Beide haben exakt dieselbe Masse von einem Kilogramm. Der Unterschied liegt allein im Raumbedarf – ein Kilogramm Blei passt in eine Faust, ein Kilogramm Federn füllt einen großen Sack. Die physikalische Größe für dieses Verhältnis aus Materiemenge und Raumbedarf ist die **Dichte**.

Mit unserem [Dichte-Rechner](/de/rechner/dichte-rechner) bestimmen Sie wahlweise die Dichte aus Masse und Volumen oder berechnen direkt die fehlende Masse beziehungsweise das Volumen. Das unterstützt Sie im Labor, bei der Werkstoffprüfung sowie bei Konstruktions- und Logistikaufgaben.

## Grundformel, Einheiten und die Dichteanomalie des Wassers

Die Massendichte (Formelzeichen `ρ`, gesprochen „Rho“) beschreibt die Masse `m` eines homogenen Körpers bezogen auf sein Volumen `V`. Sie ist eine intensive Stoffeigenschaft: Ein kleiner Kupferdraht besitzt bei gleicher Temperatur und gleichem Druck exakt dieselbe Dichte wie ein massiver Kupferblock.

```text
Grundgleichung:         ρ = m / V
Umgestellt:             m = ρ × V   |   V = m / ρ
Umrechnung:             1 g/cm³ = 1 kg/dm³ = 1 kg/L = 1.000 kg/m³
```

Die drei beteiligten Größen im Überblick:

- **`ρ` (Dichte):** Angegeben in `kg/m³` (SI-Einheit) oder laborüblich in `g/cm³` (identisch mit `kg/L`).
- **`m` (Masse):** Materiemenge des Körpers in `kg` oder `g`.
- **`V` (Volumen):** Räumliche Ausdehnung in `m³`, `dm³` (Liter) oder `cm³` (Milliliter).

Normalerweise ziehen sich Stoffe beim Abkühlen zusammen, sodass Feststoffe dichter sind als ihre eigene Schmelze. **Wasser bildet eine entscheidende Ausnahme:** Seine maximale Dichte erreicht flüssiges Wasser bei `3,98 °C` mit rund `1,000 g/cm³` (`999,97 kg/m³`). Beim Gefrieren bei `0 °C` ordnen sich die Moleküle über Wasserstoffbrückenbindungen in einem offenen, hexagonalen Kristallgitter an. Dadurch steigt das Volumen um etwa `9 %`, und die Dichte von Eis fällt auf `0,917 g/cm³`. Nach dem Archimedischen Prinzip entspricht die Auftriebskraft genau der Gewichtskraft des verdrängten Wassers (`F_A = ρ_Wasser × V_verdrängt × g`). Weil Eis weniger dicht ist als flüssiges Wasser, schwimmt es stets oben.

## Rechenbeispiel: Werkstoffprüfung und Eintauchtiefe von Eis

Angenommen, Sie prüfen einen unbeschrifteten Metallzylinder, um zwischen reinem Kupfer (`8,96 g/cm³`) und Messing (`8,40–8,70 g/cm³`) zu unterscheiden. Eine Feinwaage misst `m = 448 g`. Da das Bauteil komplexe Bohrungen besitzt, ermitteln Sie das Volumen per Wasserverdrängung: Im Messzylinder steigt der Pegel von `200 cm³` auf `250 cm³`.

1. **Volumen:** `V = 250 cm³ − 200 cm³ = 50 cm³`.
2. **Dichte:** `ρ = 448 g / 50 cm³ = 8,96 g/cm³`.
3. **SI-Wert:** `8,96 g/cm³ × 1.000 = 8.960 kg/m³`.

Der Wert bestätigt zweifelsfrei reines Kupfer.

Genauso präzise lässt sich die Eintauchtiefe von Eis berechnen. Ein Eisblock mit `V_Eis = 1,20 m³` hat bei `ρ_Eis = 917 kg/m³` eine Masse von:

`m = 917 kg/m³ × 1,20 m³ = 1.100,4 kg`

Um im Süßwasser (`ρ_Wasser = 1.000 kg/m³`) im Gleichgewicht zu schwimmen, verdrängt der Block genau sein Eigengewicht an Wasser:

`V_verdrängt = 1.100,4 kg / 1.000 kg/m³ = 1,1004 m³`

Bezogen auf `1,20 m³` liegen `91,7 %` des Eises unter der Wasseroberfläche und `8,3 %` darüber. Im dichteren Meerwasser (`1.025 kg/m³`) tauchen `917 / 1.025 = 89,5 %` ein – die „Spitze des Eisbergs“.

## Dichte-Vergleichstabelle gängiger Stoffe

Die Übersicht listet Referenzwerte bei Normaldruck (`1.013 hPa`) auf:

| Stoff / Material | Temperatur | Dichte (`g/cm³`) | Dichte (`kg/m³`) | Verhalten gegenüber Wasser |
| :--- | :--- | :--- | :--- | :--- |
| Wasserstoff (Gas) | 0 °C | 0,00009 | 0,09 | Steigt in Luft extrem schnell auf |
| Trockene Luft (Gas) | 20 °C | 0,00120 | 1,20 | Erwärmte Luft wird leichter (Heißluftballon) |
| Fichtenholz (trocken) | 20 °C | 0,45 | 450 | Schwimmt stabil (~45 % eingetaucht) |
| Eis (kristallin) | 0 °C | 0,917 | 917 | Schwimmt oben (~91,7 % eingetaucht) |
| Reines Wasser | 4 °C | 1,000 | 1.000 | Referenzpunkt der Dichte |
| Aluminium | 20 °C | 2,70 | 2.700 | Sinkt sofort; Leichtbauwerkstoff |
| Kupfer | 20 °C | 8,96 | 8.960 | Sinkt sofort; hohe Masse je Volumen |

## Anwendungen in Natur, Technik und typische Fehlerquellen

Die Dichteanomalie des Wassers sichert das Überleben in Gewässern: Im Herbst sinkt `4 °C` warmes, schwerstes Wasser auf den Seegrund, während kälteres Wasser darüber auf `0 °C` abkühlt und von oben zufriert. Fische überwintern geschützt unter der Eisdecke. Im Bauwesen führt dieselbe `9-%`-Ausdehnung beim Gefrieren allerdings zu Frostsprengung in ungeschützten Wasserrohren und Mauerwerk.

In der Luftfahrt zeigt sich der Temperatureffekt unmittelbar: Erhitzt ein Heißluftballon die Hüllenluft von `20 °C` (`1,20 kg/m³`) auf `100 °C` (`0,95 kg/m³`), entsteht bei `3.000 m³` Volumen eine Tragkraft von rund `750 kg`. Nach dem idealen Gasgesetz `ρ = (p × M) / (R × T)` sinkt die Gasdichte direkt mit steigender Temperatur und fallendem Luftdruck. Deshalb benötigen Flugzeuge an heißen Sommertagen oder auf hochgelegenen Flughäfen eine deutlich längere Startbahn. In der Lebensmitteltechnik und Chemie messen Aräometer (Senkspindeln) wiederum die Flüssigkeitsdichte, um exakt den Zuckergehalt von Bierwürze oder die Frostschutzkonzentration im Kühlwasser zu bestimmen.

Bei praktischen Berechnungen entstehen Fehler meist durch drei Stolpersteine: Erstens durch **gemischte Einheiten** (Gramm kombiniert mit Litern erzeugt einen Faktor-1.000-Fehler). Zweitens durch das **Verwechseln von Reindichte und Rohdichte**: Ein Stahlschiff schwimmt trotz `7,85 g/cm³` Stahldichte, weil der luftgefüllte Rumpf als Gesamtkörper unter `1,00 g/cm³` bleibt; analog liegt die Schüttdichte von Sand, Getreide oder Neuschnee weit unter der Feststoffdichte. Drittens wird **Viskosität** (Zähflüssigkeit) oft mit Dichte verwechselt – Speiseöl ist zwar dickflüssiger als Wasser, hat aber eine geringere Dichte (`~0,91 g/cm³`) und schwimmt daher oben.
