---
title: "Spannungsabfall: Warum lange Kabel Leistung verlieren"
description: "Verstehen Sie, warum elektrische Spannung über lange Kabelwege sinkt. Lernen Sie Formeln, VDE-Grenzwerte und den Einfluss des Querschnitts mit unserem Spannungsabfall-Rechner."
category: "Math & Science"
relatedCalculator: "voltage-drop-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wie hoch darf der Spannungsabfall in einer Elektroinstallation maximal sein?"
    answer: "In Deutschland orientiert sich die Praxis an DIN VDE 0100-520 und DIN 18015-1. Zwischen Hausanschlusskasten und Zählerplatz gilt meist ein Richtwert von maximal 0,5 %, für den gesamten Weg vom Speisepunkt bis zur letzten Steckdose oder Leuchte empfiehlt DIN VDE 0100-520 maximal 3 % bei Beleuchtungsanlagen und höchstens 5 % für andere Verbraucher. Für Wärmepumpen, Wallboxen oder empfindliche Elektronik planen Elektrofachkräfte in der Regel durchgehend mit höchstens 3 %."
  - question: "Warum erwärmt sich eine abgerollte oder aufgerollte Kabeltrommel bei hohem Spannungsabfall?"
    answer: "Die über den Leitungswiderstand abfallende Spannung wird nach der Formel P_V = ΔU × I vollständig in thermische Energie umgewandelt. Bei einer aufgerollten Kabeltrommel kann diese Verlustwärme nicht an die Umgebungsluft entweichen, sodass sich der PVC- oder Gummimantel im Inneren der Wicklung staut, aufweicht und im Extremfall verschmort."
  - question: "Warum muss bei einphasigem Wechselstrom oder Gleichstrom mit dem Faktor 2 gerechnet werden?"
    answer: "Bei einphasigen 230-V-Stromkreisen und in Gleichstromsystemen (etwa 12 V oder 24 V) muss der elektrische Strom sowohl den Hinleiter (Phase beziehungsweise Pluspol) als auch den gleich langen Rückleiter (Neutralleiter beziehungsweise Minuspol) durchfließen. Die physikalisch wirksame Leitungslänge entspricht daher exakt der doppelten einfachen Kabelstrecke."
  - question: "Warum braucht man bei Aluminiumkabeln einen größeren Querschnitt als bei Kupfer?"
    answer: "Kupfer besitzt bei 20 °C eine elektrische Leitfähigkeit von rund 56 m/(Ω·mm²), Aluminium hingegen nur etwa 35 m/(Ω·mm²). Um bei gleicher Stromstärke und Leitungslänge denselben geringen Spannungsabfall zu erreichen, muss der Leiterquerschnitt bei Aluminium um rund den Faktor 1,6 größer gewählt werden als bei Kupfer."
  - question: "Sinkt die Stromstärke bei einem Spannungsabfall automatisch, oder steigt sie?"
    answer: "Das hängt von der Art des Verbrauchers ab. Bei rein ohmschen Lasten wie Heizstäben oder Glühlampen sinkt der Strom proportional zur Spannung. Bei geregelten Schaltnetzteilen oder Elektromotoren mit konstanter Leistungsanforderung steigt die Stromaufnahme jedoch an, wenn die Spannung fällt, was zu zusätzlicher Überhitzung der Motorwicklungen und der Zuleitung führt."
---

Werden mehrere lange Verlängerungskabel hintereinandergeschaltet, verliert ein angeschlossener Motor spürbar an Kraft oder ein Baustrahler leuchtet dunkler. Ursache ist der **Spannungsabfall** (auch Spannungsfall genannt): Jede reale Leitung setzt dem Stromfluss einen elektrischen Widerstand entgegen, an dem ein Teil der eingespeisten Spannung verloren geht.

Mit dem [Spannungsabfall-Rechner](/de/rechner/spannungsabfall-rechner) berechnen Sie präzise, wie viele Volt bei definierter Kabellänge, Stromstärke, Netzspannung und Leiterquerschnitt auf der Strecke bleiben. So verhindern Sie Unterspannung an Geräten sowie gefährliche Leitungserwärmung durch zu dünne Kabel.

## Physikalische Grundlagen und Berechnungsformeln

Jeder metallische Leiter besitzt einen spezifischen elektrischen Widerstand `ρ` (Kehrwert: elektrische Leitfähigkeit `κ = 1 / ρ`). Bewegte Elektronen stoßen im Metallgitter mit Atomrümpfen zusammen und geben Energie als Wärme ab. Nach dem Ohmschen Gesetz `U = R × I` entsteht entlang des Kabels ein Spannungsverlust `ΔU`, der proportional zu Stromstärke `I` und Leitungswiderstand wächst.

Der Gesamtwiderstand hängt von Leitermaterial, einfacher Leitungslänge `L` und Leiterquerschnitt `A` ab. Je nach Stromart gelten folgende Formeln:

```text
Gleichstrom (DC) & Einphasen-Wechselstrom (230 V):
ΔU = (2 × I × L × ρ) / A   oder   ΔU = (2 × I × L × cos φ) / (κ × A)

Dreiphasen-Wechselstrom (Drehstrom 400 V):
ΔU = (√3 × I × L × cos φ) / (κ × A)

Prozentwert und Verlustleistung:
ΔU_% = (ΔU / U_N) × 100 %     |     P_V = ΔU × I
```

Die Parameter im Detail:

- **`I` (Stromstärke in A):** Der dauerhafte Betriebsstrom des Verbrauchers.
- **`L` (einfache Kabellänge in m):** Die Distanz zwischen Sicherung oder Steckdose und Gerät (Faktor `2` berücksichtigt Hin- und Rückleiter).
- **`A` (Leiterquerschnitt in mm²):** Querschnittsfläche einer einzelnen Ader (üblich sind `1,5 mm²`, `2,5 mm²`, `4 mm²` oder `6 mm²`).
- **`κ` (Leitfähigkeit in m/(Ω·mm²)):** Bei `20 °C` gilt `κ = 56` für Kupfer (`ρ ≈ 0,01786 Ω·mm²/m`) und `κ = 35` für Aluminium (`ρ ≈ 0,02857 Ω·mm²/m`).
- **`cos φ` (Leistungsfaktor):** `1,0` bei rein ohmschen Lasten (Heizgeräte), etwa `0,85` bei Induktionsmotoren.
- **`U_N` (Nennspannung in V):** Im europäischen Netz `230 V` (einphasig) oder `400 V` (Drehstrom).

## Rechenbeispiel: Baustellen-Heizgerät an langer Leitung

Sie betreiben auf einer Baustelle einen Heizlüfter mit `P = 3.220 W` an einer `230-V`-Steckdose (`cos φ = 1,0`). Weil der Verteiler weit entfernt steht, koppeln Sie zwei `20-m`-Kabeltrommeln zu `L = 40 m` Gesamtlänge. Beide Kupferleitungen (`κ = 56`) haben einen Querschnitt von `A = 1,5 mm²`.

1. **Betriebsstrom berechnen:** `I = 3.220 W / 230 V = 14 A`.
2. **Spannungsabfall ermitteln:** `ΔU = (2 × 14 A × 40 m × 1,0) / (56 × 1,5 mm²) = 1.120 / 84 = 13,33 V`.
3. **Prozentualen Verlust bestimmen:** `ΔU_% = (13,33 V / 230 V) × 100 % = 5,80 %`.

Am Heizlüfter kommen statt `230 V` nur noch `216,67 V` an. Gleichzeitig erwärmt eine Verlustleistung von `P_V = 13,33 V × 14 A = 186,67 W` die Kabelisolierung. Wählen Sie stattdessen ein `2,5-mm²`-Baustellenkabel, sinkt der Abfall auf `1.120 / (56 × 2,5) = 8,00 V` (`3,48 %`) und die Verlustwärme auf `112,00 W`. Bei `4,0 mm²` verbleiben nur noch `5,00 V` (`2,17 %`).

## Vergleich verschiedener Kabelquerschnitte und Längen

Die Tabelle zeigt Spannungsabfall und Verlustleistung bei voller Auslastung einer `16-A`-Sicherung (`U_N = 230 V`, `cos φ = 1,0`, `κ_Cu = 56`, `κ_Al = 35`):

| Kabellänge (`L`) | Querschnitt & Material | Spannungsabfall (`ΔU`) | Prozentwert (`ΔU_%`) | Verlustleistung (`P_V`) | Bewertung (230 V) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 15 m | 1,5 mm² Kupfer | 5,71 V | 2,48 % | 91,4 W | Normgerecht (< 3 %) |
| 30 m | 1,5 mm² Kupfer | 11,43 V | 4,97 % | 182,9 W | Grenzwert überschritten |
| 30 m | 2,5 mm² Kupfer | 6,86 V | 2,98 % | 109,7 W | Optimal (< 3 %) |
| 50 m | 1,5 mm² Kupfer | 19,05 V | 8,28 % | 304,8 W | Kritisch, Überhitzungsgefahr |
| 50 m | 2,5 mm² Kupfer | 11,43 V | 4,97 % | 182,9 W | Nur nach Einzelfallprüfung |
| 50 m | 4,0 mm² Kupfer | 7,14 V | 3,11 % | 114,3 W | Empfohlen für lange Strecken |
| 50 m | 4,0 mm² Aluminium | 11,43 V | 4,97 % | 182,9 W | Höherer Verlust als Kupfer |

## Praxisrelevante Grenzwerte, Normen und Planungsfehler

In Deutschland setzen **DIN VDE 0100-520** und **DIN 18015-1** klare Maßstäbe: Vom Hausanschluss bis zum letzten Verbraucher soll der Spannungsabfall idealerweise maximal `3 %` betragen (DIN VDE 0100-520 empfiehlt `3 %` für Beleuchtung und höchstens `5 %` für andere Stromkreise; DIN 18015-1 begrenzt die Zählerzuleitung auf `0,5 %`). Für Dauerlasten wie **11-kW- oder 22-kW-Wallboxen**, Wärmepumpen und Photovoltaikleitungen empfiehlt sich eine noch straffere Auslegung auf `1 %` bis `2 %`, da sich die eingesparten Leitungsverluste über Jahre direkt auf der Stromrechnung bemerkbar machen.

Ein kritisches Sicherheitsdetail ist zudem der **Kurzschlussschutz**: Bei zu langen, dünnen Leitungen steigt die Schleifenimpedanz so stark an, dass im Fehlerfall ein Leitungsschutzschalter (z. B. Typ B16) möglicherweise nicht schnell genug magnetisch auslöst.

Besondere Sorgfalt verlangen **12-V- oder 24-V-Gleichstromsysteme** in Wohnmobilen, Booten oder Inselsolaranlagen: Während `2 V` Verlust im `230-V`-Netz kaum auffallen (`0,87 %`), bedeuten dieselben `2 V` bei `12 V` bereits `16,7 %` – Kompressorkühlschränke und Standheizungen schalten dann wegen Unterspannung ab. Berücksichtigen Sie bei hoher Dauerlast außerdem die Temperatur: Erwärmt sich ein Kupferleiter von `20 °C` auf `70 °C`, steigt sein Widerstand um rund `20 %`.
