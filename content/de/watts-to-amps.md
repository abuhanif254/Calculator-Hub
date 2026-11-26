---
title: "Watt in Ampere Umrechner: Stromstärke für DC & AC berechnen"
description: "Rechnen Sie Leistung in Watt (W) präzise in Stromstärke in Ampere (A) um – für 12V-48V-Solaranlagen sowie 230V-Wechselstrom mit Leistungsfaktor und Beispielen."
faqs:
  - question: "Wie rechne ich Watt exakt in Ampere um?"
    answer: "Bei Gleichstrom (DC) teilen Sie die Leistung in Watt durch die Spannung in Volt: I = P ÷ U. Bei einphasigem Wechselstrom (AC) berücksichtigen Sie zusätzlich den Leistungsfaktor cos φ gemäß der Formel I = P ÷ (U × cos φ)."
  - question: "Wie viel Ampere sind 2.300 Watt bei 230 Volt?"
    answer: "Bei einer reinen ohmschen Last (Leistungsfaktor 1,0) im deutschen 230-V-Stromnetz fließen bei 2.300 Watt genau 10 Ampere (2.300 W ÷ 230 V = 10 A)."
  - question: "Wie viel Watt hält eine 16-Ampere-Sicherung maximal aus?"
    answer: "Bei der europäischen Netzspannung von 230 V liegt die rechnerische Maximalleistung eines 16-A-Stromkreises bei 3.680 Watt (230 V × 16 A). Für Dauerlasten empfiehlt die Elektrotechnik jedoch einen Sicherheitsabstand bis etwa 3.000 bis 3.300 Watt."
  - question: "Warum ist der Leistungsfaktor bei Wechselstrom so wichtig?"
    answer: "Induktive Verbraucher wie Motoren, Kühlschränke oder Netzteile erzeugen Blindleistung. Bei einem Leistungsfaktor (cos φ) von 0,8 statt 1,0 benötigt ein 1.000-W-Gerät an 230 V rund 5,43 A statt 4,35 A – die Leitungen werden stärker belastet."
  - question: "Wie berechne ich die Stromstärke bei Drehstrom (400 Volt)?"
    answer: "Für dreiphasigen Wechselstrom (Drehstrom mit 400 V Außenleiterspannung) wird die Formel um den Verkettungsfaktor Wurzel aus 3 (≈ 1,732) erweitert: I = P ÷ (√3 × U × cos φ)."
---

Um elektrische Leistung in Watt (W) in die Stromstärke in Ampere (A) umzurechnen, teilen Sie die Leistung durch die anliegende elektrische Spannung in Volt (V). Bei Gleichstrom (DC), wie er in Batterien und Photovoltaik-Modulen vorliegt, gilt die exakte Grundformel **`I (A) = P (W) ÷ U (V)`**. Eine Leistung von 600 W an einem 12-V-Bordnetz erzeugt demnach einen Strom von exakt 50 A.

Im Wechselstromnetz (AC) – etwa im europäischen 230-V-Haushaltsnetz – muss bei induktiven oder kapazitiven Geräten zusätzlich der Leistungsfaktor (`cos φ` bzw. `PF`) im Nenner einbezogen werden: **`I (A) = P (W) ÷ (U (V) × cos φ)`**. Diese präzise Berechnung ist entscheidend für die korrekte Auslegung von Leitungsschutzschaltern, Kabelquerschnitten, Wechselrichtern und mobilen Speicherlösungen.

## Exakte Umrechnungsformeln und physikalische Normen

Die Beziehung zwischen elektrischer Leistung (`P` in Watt), Spannung (`U` in Volt; in internationalen Formeln auch `V`) und Stromstärke (`I` in Ampere) basiert auf dem Jouleschen Gesetz und den Vorgaben des Internationalen Einheitensystems (SI) sowie den elektrotechnischen Normen der **IEC 60050** und der **DIN VDE 0100** im DACH-Raum. Ein Watt ist dabei definiert als ein Joule pro Sekunde beziehungsweise das Produkt aus einem Volt und einem Ampere bei Gleichstrom (`1 W = 1 V · 1 A`).

Je nach Stromart unterscheiden sich die Berechnungsformeln wie folgt:

* **Gleichstrom (DC – 12 V, 24 V, 48 V):** `I (A) = P (W) ÷ U (V)`
* **Einphasiger Wechselstrom (AC – 230 V / 120 V):** `I (A) = P (W) ÷ (U (V) × cos φ)`
* **Dreiphasiger Drehstrom (AC – 400 V):** `I (A) = P (W) ÷ (√3 × U (V) × cos φ)` mit `√3 ≈ 1,73205`

Der Leistungsfaktor `cos φ` bewegt sich zwischen `0` und `1`. Bei rein ohmschen Verbrauchern wie Heizlüftern, Wasserkochern oder klassischen Glühlampen beträgt `cos φ = 1,0`. Elektromotoren, Kompressoren oder Schaltnetzteile weisen typischerweise Werte zwischen `0,75` und `0,95` auf, wodurch bei gleicher Wirkleistung ein höherer Scheinstrom durch die Leitung fließt.

## Schritt-für-Schritt-Beispiele aus der Praxis

Die folgenden drei Rechenbeispiele decken typische Anwendungen von der Solaranlage über den Haushaltsstromkreis bis zur Werkstatt ab.

### Beispiel 1: 48-V-Photovoltaik-Batteriespeicher (Gleichstrom)
Ein Wechselrichter zieht an einem **48-V-Lithium-Eisenphosphat-Akku (LiFePO4)** dauerhaft **2.400 Watt**. Gesucht ist die Belastung für Batteriekabel und DC-Sicherung:
* Formel (DC): `I = P ÷ U`
* Berechnung: `2.400 W ÷ 48 V = 50 A`
* Ergebnis: Es fließen exakt **50 Ampere**, wofür je nach Leitungslänge meist mindestens 16 mm² Kabelquerschnitt erforderlich sind.

### Beispiel 2: Tauchpumpe im 230-V-Netz (Wechselstrom mit cos φ)
Eine elektrische Pumpe arbeitet im deutschen **230-V-Wechselstromnetz** mit einer Wirkleistung von **1.150 Watt** und einem Leistungsfaktor **`cos φ = 0,85`**:
* Formel (AC einphasig): `I = P ÷ (U × cos φ)`
* Berechnung: `1.150 W ÷ (230 V × 0,85) = 1.150 ÷ 195,5 = 5,8823...`
* Ergebnis: Die Pumpe zieht eine Stromstärke von rund **5,88 Ampere**.

### Beispiel 3: Wallbox am 400-V-Drehstromanschluss
Ein Elektrofahrzeug lädt dreiphasig an **400 V** mit **11.000 Watt (11 kW)** Ladeleistung und einem Leistungsfaktor von **`cos φ = 0,99`**:
* Formel (Drehstrom): `I = P ÷ (√3 × U × cos φ)`
* Berechnung: `11.000 W ÷ (1,73205 × 400 V × 0,99) = 11.000 ÷ 685,8918 = 16,0375...`
* Ergebnis: Pro Außenleiter fließen rund **16,04 Ampere** (geregelt auf maximal 16 A).

## Schnelle Referenz-Umrechnungstabelle (DC & AC 230 V)

Die Tabelle zeigt gängige Leistungsstufen für verschiedene Spannungen bei ohmscher AC-Last (`cos φ = 1,0`).

| Leistung | 12 V (DC) | 24 V (DC) | 48 V (DC) | 230 V (AC) | Typischer Praxiskontext |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 100 W | 8,33 A | 4,17 A | 2,08 A | 0,43 A | Laptop-Netzteil oder kleine Kühlbox |
| 250 W | 20,83 A | 10,42 A | 5,21 A | 1,09 A | Desktop-PC oder einzelnes Solarpanel |
| 500 W | 41,67 A | 20,83 A | 10,42 A | 2,17 A | Haushalts-Grundlast oder Handmixer |
| 800 W | 66,67 A | 33,33 A | 16,67 A | 3,48 A | Limit eines Balkonkraftwerks |
| 1.000 W | 83,33 A | 41,67 A | 20,83 A | 4,35 A | Staubsauger oder Kaffeemaschine |
| 1.500 W | 125,00 A | 62,50 A | 31,25 A | 6,52 A | Elektrischer Heizstrahler |
| 2.000 W | 166,67 A | 83,33 A | 41,67 A | 8,70 A | Wasserkocher oder Haartrockner |
| 2.300 W | 191,67 A | 95,83 A | 47,92 A | 10,00 A | Nennlast einer 10-A-Sicherung |
| 3.000 W | 250,00 A | 125,00 A | 62,50 A | 13,04 A | Kleiner Durchlauferhitzer |
| 3.680 W | 306,67 A | 153,33 A | 76,67 A | 16,00 A | Limit einer 16-A-Schuko-Leitung |

## Branchenanwendungen, regionale Netze und typische Fehler

Im DACH-Raum gilt eine Netzspannung von **230 Volt** bei **50 Hertz** (EN 50160). Nordamerika nutzt hingegen **120 Volt** und Japan **100 Volt** bei 60 Hertz. Bei halbierter Spannung verdoppelt sich die Stromstärke: Ein 1.800-W-Gerät benötigt an 230 V nur `7,83 A`, zieht an 120 V jedoch `15 A` und belastet dortige Leitungen doppelt so stark.

Ein kritischer Planungsfehler entsteht oft bei **12-V-Camping- und Solarsystemen**, wenn die hohen Gleichströme unterschätzt werden. Ein 2.000-W-Wechselrichter an 12 V zieht inklusive Wirkungsgradverlust (~10 %) rund **185 Ampere** (`2.000 ÷ 12 ÷ 0,90`). Zu dünne Kabel führen hier zu gefährlicher Erhitzung. Ab 1.500 W empfiehlt sich deshalb der Umstieg auf 24-V- oder 48-V-Systeme.

Zudem wird bei induktiven Lasten häufig **Wirkleistung (Watt)** mit **Scheinleistung (Voltampere, VA)** verwechselt. Auf Transformatoren oder USV-Anlagen geben Hersteller meist VA an. Erst durch Einbeziehung des Leistungsfaktors `cos φ` erhalten Sie die tatsächliche Stromaufnahme in Ampere zur sicheren Dimensionierung von Leitungsschutzschaltern (z. B. B16-Sicherungsautomaten) und Zuleitungen.
