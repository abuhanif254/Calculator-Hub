---
title: "Potentielle Energie: Gespeicherte Energie der Lage"
description: "Potentielle Energie (Lageenergie) präzise berechnen: Gravitationsformel, Energieerhaltungssatz, Pumpspeicherkraftwerk-Beispiel und Potentielle Energie-Rechner."
category: "Math & Science"
relatedCalculator: "potential-energy-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum kann die potentielle Energie eines Körpers auch negativ sein?"
    answer: "Die Höhe h hängt stets von einem frei gewählten Bezugsniveau (Nullpunkt) ab. Setzt man das Erdgeschoss oder die Meeresoberfläche auf h = 0 m, besitzt ein Körper in einem Keller oder einem Bergwerkschacht (h < 0 m) eine negative potentielle Energie. Physikalisch entscheidend für die Arbeit und Energieumwandlung ist immer nur die Höhendifferenz Δh zwischen Start- und Zielpunkt."
  - question: "Bleibt die Formel E_pot = m × g × h in jeder Höhe über der Erde gültig?"
    answer: "Nein. Die einfache lineare Formel setzt eine konstante Fallbeschleunigung g voraus und liefert in der Nähe der Erdoberfläche (bis einige Kilometer Höhe) hochgenaue Ergebnisse. Bei großen Distanzen wie in der Satelliten- und Raumfahrttechnik nimmt die Gravitation quadratisch mit dem Abstand ab; dort muss das allgemeine Newtonsche Gravitationspotential E_pot(r) = −G × M × m / r verwendet werden."
  - question: "Hängt die potentielle Energie vom Weg ab, auf dem ein Gegenstand angehoben wurde?"
    answer: "Nein. Das Gravitationsfeld ist ein sogenanntes konservatives Kraftfeld. Ob Sie eine 50-kg-Last senkrecht mit einem Kran auf 10 m Höhe heben oder über eine 100 m lange, flache Rampe hinaufschieben: Die gewonnene potentielle Energie ist in beiden Fällen exakt gleich. Lediglich die zusätzlich verrichtete Reibungsarbeit hängt vom gewählten Weg ab."
  - question: "Wie viel potentielle Energie entspricht einer Kilowattstunde (kWh)?"
    answer: "Eine Kilowattstunde entspricht exakt 3.600.000 Joule (3,6 MJ). Um diese Energiemenge als reine Lageenergie zu speichern, müsste man beispielsweise 1.000 kg Wasser (1 m³) um rund 367 m anheben – oder einen 100 t schweren Lastwagen auf eine Höhe von 3,67 m befördern."
  - question: "Welche anderen Formen potentieller Energie gibt es neben der Lageenergie?"
    answer: "Neben der gravitativen Lageenergie existieren vor allem die elastische Spannenergie einer verformten Feder (E_spann = ½ × D × s²), die elektrische potentielle Energie geladener Teilchen im elektrischen Feld sowie die chemische Energie, die in atomaren und molekularen Bindungen gespeichert ist."
---

**Potentielle Energie** (in der Mechanik meist als **Lageenergie** bezeichnet) ist die Energie, die ein Körper aufgrund seiner Position in einem Kraftfeld – etwa dem Schwerefeld der Erde – gespeichert hat. Sobald ein Körper entgegen der Schwerkraft angehoben wird, wird mechanische Hubarbeit an ihm verrichtet; diese Arbeit geht nicht verloren, sondern steht als gespeicherte potentielle Energie für eine spätere Umwandlung in Bewegungsenergie (kinetische Energie) oder elektrische Energie bereit.

Im Internationalen Einheitensystem (SI) wird die potentielle Energie wie jede Energieform in **Joule (`J`)** gemessen, wobei `1 J = 1 N·m = 1 kg·m²/s²` gilt. Mit unserem [Potentielle Energie-Rechner](/de/rechner/potenzielle-energie-rechner) berechnen Sie aus Masse, Höhe und lokaler Fallbeschleunigung sofort den exakten Energieinhalt sowie auf Wunsch den Umrechnungswert in Kilojoule (`kJ`) oder Kilowattstunden (`kWh`).

## Formel, Parameterdefinitionen und Energieerhaltung

Solange sich der betrachtete Höhenunterschied nahe der Erdoberfläche bewegt und das Schwerefeld als homogen angesehen werden kann, gilt für die gravitative potentielle Energie die kompakte Gleichung:

```text
Lageenergie (homogen):  E_pot = m × g × h
Energiedifferenz:       ΔE_pot = m × g × (h_2 − h_1)
Energieerhaltung:       E_ges = E_pot + E_kin = m × g × h + ½ × m × v² = konstant
Fallgeschwindigkeit:    v = √(2 × g × h)
Allgemeines Feld:       E_pot(r) = −G × M × m / r
Elastische Feder:       E_spann = ½ × D × s²
```

Die einzelnen Formelzeichen bezeichnen folgende Größen:

- **`E_pot` (Potentielle Energie in `J`):** Gespeicherte Lageenergie relativ zum gewählten Nullniveau (`h = 0`). Größere Energiemengen werden häufig in Kilojoule (`1 kJ = 1.000 J`), Megajoule (`1 MJ = 10⁶ J`) oder Kilowattstunden (`1 kWh = 3,6 MJ`) angegeben.
- **`m` (Masse in `kg`):** Träge und schwere Masse des Objekts. Bei Flüssigkeiten wie Wasser ergibt sich die Masse aus Volumen mal Dichte (`m = V × ρ`, für Wasser `1.000 kg/m³`).
- **`g` (Fallbeschleunigung in `m/s²`):** Lokale Schwerebeschleunigung; der europäische Normwert liegt bei `9,81 m/s²`.
- **`h` (Höhe in `m`):** Vertikaler Abstand über der Bezugsebene. Nur die senkrechte Höhendifferenz ist maßgeblich, nicht eine schräg zurückgelegte Wegstrecke.

Gemäß dem **Energieerhaltungssatz der Mechanik** wandelt sich beim reibungsfreien Absinken oder Herabfallen eines Körpers die gesamte abgebaute Lageenergie vollständig in kinetische Energie um (`ΔE_pot = −ΔE_kin`). Auffällig ist dabei, dass sich die Masse `m` in `m × g × h = ½ × m × v²` herauskürzt – die Endgeschwindigkeit `v = √(2 × g × h)` ist unabhängig vom Gewicht des Körpers.

## Schritt-für-Schritt-Rechenbeispiel: Pumpspeicherkraftwerk in den Alpen

Pumpspeicherkraftwerke nutzen gravitative potentielle Energie im industriellen Maßstab zur Netzstabilisierung. Ein Oberbecken speichert ein nutzbares Wasservolumen von `V = 500.000 m³` (Dichte `ρ = 1.000 kg/m³`) auf einer effektiven Fallhöhe von `h = 320 m` über dem Turbinenhaus (`g = 9,81 m/s²`). Der Gesamtwirkungsgrad der Turbinen-Generator-Gruppe im Entladebetrieb beträgt `η = 88 %` (`0,88`).

1. **Gesamtmasse des gespeicherten Wassers ermitteln:**
   `m = 500.000 m³ × 1.000 kg/m³ = 500.000.000 kg` (`5,0 × 10⁸ kg`)
2. **Brutto-Lageenergie in Joule berechnen:**
   `E_pot = 5,0 × 10⁸ kg × 9,81 m/s² × 320 m = 1,5696 × 10¹² J` (`1,57 Terajoule`)
3. **Umrechnung in Megawattstunden (`MWh`):**
   Da `1 kWh = 3,6 × 10⁶ J` und `1 MWh = 3,6 × 10⁹ J` entspricht:
   `E_brutto = 1,5696 × 10¹² J / 3,6 × 10⁹ J/MWh = 436,00 MWh`
4. **Nutzbare elektrische Energie unter Berücksichtigung des Wirkungsgrads:**
   `E_el = 436,00 MWh × 0,88 = 383,68 MWh`
5. **Theoretische Ausströmgeschwindigkeit am Turbineneintritt (ohne Rohrreibung):**
   `v = √(2 × 9,81 m/s² × 320 m) = √6.278,4 = 79,24 m/s` (`≈ 285 km/h`)

Mit dieser einzigen Speicherfüllung kann das Kraftwerk beispielsweise rund `384 MW` Leistung für eine volle Stunde in das Stromnetz einspeisen – ein anschaulicher Beleg dafür, warum für große Energiemengen enorme Wassermassen und Höhenunterschiede erforderlich sind.

## Benchmark-Tabelle: Gespeicherte Lageenergie im Vergleich

Die Übersicht zeigt anhand von sechs Praxisbeispielen (mit `g = 9,81 m/s²`), wie stark Masse und Fallhöhe sowohl den Energieinhalt als auch die theoretische Endgeschwindigkeit im reibungsfreien Fall bestimmen:

| Szenario | Masse `m` | Höhe `h` | Lageenergie `E_pot` | Umrechnung (`kJ` / `kWh`) | Ideale Fallgeschwindigkeit `v` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Apfel auf einem Ast | `0,20 kg` | `2,0 m` | `3,92 J` | `0,004 kJ` | `6,26 m/s` (`22,5 km/h`) |
| Werkzeugkoffer auf Gerüst | `15,0 kg` | `12,0 m` | `1.766 J` | `1,77 kJ` | `15,34 m/s` (`55,2 km/h`) |
| Bauarbeiter (Absturzsicherung) | `85,0 kg` | `20,0 m` | `16.677 J` | `16,68 kJ` | `19,81 m/s` (`71,3 km/h`) |
| Achterbahnzug auf Lifthill | `4.000 kg` | `75,0 m` | `2.943.000 J` | `2.943 kJ` (`0,82 kWh`) | `38,36 m/s` (`138,1 km/h`) |
| PKW auf Alpenpass | `1.500 kg` | `400 m` | `5.886.000 J` | `5.886 kJ` (`1,64 kWh`) | `88,59 m/s` (`318,9 km/h`) |
| Groß-Pumpspeicherbecken | `1,0 × 10⁹ kg` | `250 m` | `2,45 × 10¹² J` | `681.250 kWh` | `70,04 m/s` (`252,1 km/h`) |

Bemerkenswert ist der Vergleich zwischen Batterie und Lageenergie: Ein PKW von `1.500 kg` speichert durch `400 m` Höhengewinn auf einer Passstraße lediglich `1,64 kWh` reine Lageenergie – eine Energiemenge, die bereits in rund `0,18 Litern` Benzin steckt oder durch Rekuperation bei der Talfahrt teilweise in die Traktionsbatterie zurückgespeist wird.

## Anwendungsfelder, typische Fehler und physikalische Grenzen

Berechnungen der potentiellen Energie spielen eine tragende Rolle bei der Auslegung von Krananlagen, Aufzügen, Rückhaltebecken, Absturzsicherungssystemen (Auffanggurte müssen die abgefangene Lageenergie über Falldämpfer unterhalb der Verletzungsschwelle abbauen) und in der Energiewirtschaft. In der Konstruktion wird dabei oft die **erforderliche Hubleistung** über `P = E_pot / t` bestimmt.

Zu den häufigsten Rechenfehlern zählen:

- **Gewichtskraft mit Masse verwechseln:** Ist eine Last bereits in Newton (`N`) angegeben (z. B. `500 N`), darf nicht nochmals mit `g` multipliziert werden, da bereits `F_G = m × g` vorliegt (`E_pot = F_G × h`).
- **Schiefe Länge statt vertikaler Höhe ansetzen:** Bei einer Rampe geht ausschließlich der vertikale Höhenunterschied `Δh = s × sin(α)` in `E_pot` ein, niemals die Streckenlänge `s`.
- **Reibungsverluste ignorieren:** Die tatsächlich rückgewinnbare Nutzarbeit sinkt durch Roll-, Lager- und Generatorverluste.

Erst bei großen Höhenunterschieden im Bereich von Hunderten Kilometern verliert `g = 9,81 m/s²` seine Gültigkeit, da die Erdanziehung quadratisch mit dem Abstand vom Erdmittelpunkt abnimmt.
