---
title: "Batterielaufzeit: Wie lange hält der Akku?"
description: "Erfahren Sie, wie Sie Akkukapazitäten (Ah, mAh, Wh) richtig umrechnen, Peukert-Effekt und Entladetiefe berücksichtigen und die exakte Batterielaufzeit berechnen."
category: "Math & Science"
relatedCalculator: "battery-runtime-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum reicht die einfache Formel Kapazität geteilt durch Strom in der Praxis nicht aus?"
    answer: "Die vereinfachte Division t = Ah / A ignoriert drei entscheidende reale Einflussgrößen: den Peukert-Effekt bei hohen Entladeströmen, die maximal zulässige Entladetiefe (DoD) zum Schutz vor Zellschäden sowie Umwandlungsverluste von Wechselrichtern oder Gleichspannungswandlern. Ohne diese Korrekturfaktoren überschätzt man die tatsächliche Laufzeit bei Blei-Säure-Batterien oft um mehr als 100 %."
  - question: "Was ist der Unterschied zwischen mAh, Ah und Wattstunden (Wh)?"
    answer: "Amperestunden (Ah) und Milliamperestunden (1.000 mAh = 1 Ah) geben die elektrische Ladungsmenge an, die jedoch erst zusammen mit der Nennspannung eine Energieaussage ergibt. Wattstunden (Wh = Ah × V) messen hingegen den tatsächlichen Energiegehalt. Eine 12,8-V-LiFePO4-Batterie mit 100 Ah speichert 1.280 Wh, während eine 3,7-V-Powerbank mit 10.000 mAh (10 Ah) lediglich 37 Wh enthält."
  - question: "Wie stark beeinflusst die Umgebungstemperatur die Batterielaufzeit?"
    answer: "Kälte verlangsamt die elektrochemischen Prozesse in der Zelle erheblich. Bei 0 °C sinkt die entnehmbare Kapazität einer Blei-Säure-Batterie um rund 20 %, bei −20 °C sogar um bis zu 50 %. Auch Lithium-Ionen- und LiFePO4-Akkus verlieren bei Frost temporär Spannung und Kapazität; zudem dürfen herkömmliche LiFePO4-Zellen unter 0 °C nicht geladen werden, um dauerhaftes Lithium-Plating zu vermeiden."
  - question: "Warum liefert ein 100-Ah-LiFePO4-Akku in der Praxis doppelt so viel Energie wie eine 100-Ah-AGM-Batterie?"
    answer: "Eine AGM- oder Gel-Blei-Säure-Batterie darf für eine akzeptable Lebensdauer maximal zu 50 % entladen werden (50 Ah nutzbar) und verliert unter hoher Last durch den Peukert-Effekt weitere Kapazität. Ein LiFePO4-Akku verträgt problemlos 80 bis 90 % Entladetiefe (80–90 Ah nutzbar) und hält seine Spannung auch bei hohen Strömen nahezu konstant."
  - question: "Wie berücksichtige ich den Eigenverbrauch eines Wechselrichters bei der Laufzeitberechnung?"
    answer: "Jeder Wechselrichter benötigt im eingeschalteten Zustand einen Ruhe- oder Eigenstrom (oft 0,5 bis 2,0 A bei 12 V, also 6 bis 24 W), selbst wenn nur kleine Verbraucher laufen, und hat typischerweise einen Umwandlungswirkungsgrad von 85 bis 92 %. Addieren Sie diesen Eigenverbrauch zur umgerechneten Gleichstrom-Last (P_AC / Wirkungsgrad), bevor Sie die Laufzeit aus dem nutzbaren Energieinhalt berechnen."
---

Ob für eine autarke Wohnmobil-Stromversorgung, eine Notstromlösung im Serverraum oder eine mobile Drohne: Die Frage nach der exakten Batterielaufzeit entscheidet über Zuverlässigkeit und Betriebssicherheit. In der Praxis weicht die tatsächliche Einsatzdauer jedoch häufig massiv vom Nennaufdruck auf dem Gehäuse ab, weil die bloße Division von Kapazität durch Laststrom chemische Verluste, Spannungseinbrüche und zwingende Entladegrenzen außer Acht lässt.

Mit unserem [Batterielaufzeit-Rechner](/de/rechner/batterielaufzeit-rechner) bestimmen Sie die realistische Betriebsdauer unter Berücksichtigung von Zellchemie, zulässiger Entladetiefe (Depth of Discharge, DoD), Systemspannung und Wandlerwirkungsgrad. Dieser Leitfaden erläutert die zugrunde liegenden physikalischen Gleichungen, liefert ein nachgerechnetes Vergleichsbeispiel und zeigt die wichtigsten Grenzwerte gängiger Akkutypen.

## Kapazitätsangaben und die Basisformel der Laufzeit

Batteriehersteller geben die Kapazität meist in Amperestunden (`Ah`) oder Milliamperestunden (`mAh`) an (`1 Ah = 1.000 mAh`). Da `Ah` lediglich eine elektrische Ladungsmenge ohne Spannungsbezug beschreibt, lässt sich die nutzbare Energie erst über die Nennspannung `U_nenn` in Wattstunden (`Wh`) exakt vergleichen:

```text
Nennenergie (Wh):        E_nenn = C (Ah) × U_nenn (V)
Nutzbare Energie (Wh):   E_nutzbar = E_nenn × DoD × η_system
Reale Laufzeit (h):      t = E_nutzbar / P_last
```

Dabei bedeuten:

* `C` = Nennkapazität der Batterie in `Ah` (bei Blei-Säure meist bezogen auf eine 20-stündige Entladung, bezeichnet als `C20`)
* `U_nenn` = Nennspannung in Volt (`V`), etwa `3,7 V` bei Li-Ion-Einzelzellen, `12,0 V` bei Blei-Säure oder `12,8 V` bei 4S-LiFePO4-Blöcken
* `DoD` = zulässige Entladetiefe als Dezimalwert (z. B. `0,50` für Blei-Säure, `0,80` bis `0,90` für LiFePO4)
* `η_system` = Gesamtwirkungsgrad von Kabeln und Spannungswandlern (bei Betrieb über einen Wechselrichter typischerweise `0,85` bis `0,90`)
* `P_last` = Leistungsaufnahme der angeschlossenen Verbraucher in Watt (`W`)

## Der Peukert-Effekt: Warum hohe Ströme Kapazität kosten

Bei Blei-Säure-Batterien sinkt die tatsächlich entnehmbare Kapazität drastisch, sobald der Entladestrom steigt. Ursache ist die träge Diffusion der Schwefelsäure in den Bleiplatten: An der Elektrodenoberfläche verarmt der Elektrolyt schneller, als frische Säure nachströmen kann. Dieser Zusammenhang wird durch die Peukert-Gleichung beschrieben:

```text
t_peukert = H × [C / (I × H)]^k
```

Hier steht `H` für die Bezugs-Entladezeit der Herstellerangabe (in der Regel `20 h`), `I` für den tatsächlichen Entladestrom in Ampere und `k` für den zellchemiespezifischen Peukert-Exponenten. Während ideale Akkus einen Exponenten von `1,00` hätten, liegen Standard-Nassbatterien bei `k = 1,20 bis 1,35`, AGM-Batterien bei `k = 1,10 bis 1,20` und moderne LiFePO4-Zellen bei lediglich `k = 1,02 bis 1,05`.

## Schritt-für-Schritt-Beispiel: AGM vs. LiFePO4 bei 180 W AC-Last

Angenommen, Sie betreiben ein `180-W`-Gerät (etwa eine Kombination aus Kühlbox, Router und Laptop) über einen Wechselrichter mit `88 %` Wirkungsgrad (`η = 0,88`). Verglichen werden eine `12-V-AGM-Batterie (100 Ah, C20, k = 1,20)` und eine `12,8-V-LiFePO4-Batterie (100 Ah, k ≈ 1,03)`.

1. **Gleichstrom-Leistungsaufnahme berechnen:**  
   `P_DC = 180 W / 0,88 ≈ 204,55 W`.
2. **Fall A — 12-V-AGM-Batterie (100 Ah, max. DoD 50 %):**  
   * Entladestrom: `I = 204,55 W / 12,0 V ≈ 17,05 A`.  
   * Peukert-Korrektur für volle Entladung (100 % DoD) bei `H = 20 h`:  
     `t_voll = 20 × [100 / (17,05 × 20)]^1,20 = 20 × (0,2933)^1,20 ≈ 20 × 0,2295 = 4,59 Stunden`.  
   * Berücksichtigung der sicheren `50 %`-Entladetiefe (Schutz vor Sulfatierung):  
     `t_sicher = 4,59 h × 0,50 ≈ 2,29 Stunden` (2 Stunden und 17 Minuten).
3. **Fall B — 12,8-V-LiFePO4-Batterie (100 Ah, empfohlene DoD 80 %):**  
   * Nennenergie: `12,8 V × 100 Ah = 1.280 Wh`.  
   * Nutzbare Energie bei `80 %` DoD: `1.280 Wh × 0,80 = 1.024 Wh`.  
   * Entladestrom: `I = 204,55 W / 12,8 V ≈ 15,98 A` (`0,16 C`, Peukert-Verlust vernachlässigbar).  
   * Reale Laufzeit: `t_LiFePO4 = 1.024 Wh / 204,55 W ≈ 5,01 Stunden` (5 Stunden und 0 Minuten).

Obwohl beide Batterien mit „100 Ah“ beschriftet sind, liefert das LiFePO4-System unter dieser Last mehr als die doppelte Laufzeit (`5,01 h` gegenüber `2,29 h`).

## Benchmark-Tabelle: Akkutechnologien im technischen Vergleich

Die Wahl der Zellchemie bestimmt nicht nur die nutzbare Kapazität, sondern auch Zyklenfestigkeit, Gewicht und Preis pro nutzbarer Kilowattstunde.

| Batterietyp | Nennspannung (Block/Zelle) | Empfohlene DoD | Peukert-Exponent k | Zyklenzahl (bei DoD) | Besonderheit im Betrieb |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Blei-Säure (Nass) | `12 V` (`2,0 V`/Zelle) | `30–50 %` | `1,20–1,35` | `300–500` | Wartungspflichtig (Destilliertes Wasser), Ausgasung |
| Blei-AGM | `12 V` (`2,0 V`/Zelle) | `50 %` | `1,10–1,20` | `500–800` | Zyklenfest, niedrige Selbstentladung, schwer |
| Blei-Gel | `12 V` (`2,0 V`/Zelle) | `50–60 %` | `1,10–1,20` | `600–1.000` | Gut für langsame Entladung, empfindlich auf Hochstrom |
| LiFePO4 (LFP) | `12,8 V` (`3,2 V`/Zelle) | `80–90 %` | `1,02–1,05` | `3.000–6.000` | Sehr eigensicher, integriertes BMS, leicht |
| Li-Ion (NMC / NCA) | `3,6–3,7 V`/Zelle | `80 %` | `1,02–1,05` | `800–1.500` | Höchste Energiedichte, wichtig bei Drohnen/E-Bikes |
| NiMH (AA/AAA) | `1,2 V`/Zelle | `80–90 %` | `1,05–1,10` | `500–1.000` | Kälteresistent, höhere Selbstentladung (außer LSD-Typen) |

## Häufige Rechenfehler, BMS-Grenzen und Sicherheitsregeln

Ein weit verbreiteter Fehler betrifft USB-Powerbanks: Hersteller geben deren Kapazität fast immer bezogen auf die interne Zellspannung von `3,7 V` an (z. B. `20.000 mAh = 74 Wh`). Lädt man damit über USB-C PD ein Notebook mit `20 V`, reduziert sich die am Ausgang verfügbare Ladungsmenge aufgrund der Spannungserhöhung und eines Wandlerwirkungsgrads von rund `85 %` auf etwa `3.145 mAh` (`74 Wh × 0,85 / 20 V`). Vergleichen Sie Powerbanks und Solarspeicher deshalb grundsätzlich über die Wattstunden (`Wh`).

Beachten Sie zudem die elektrischen Schutzgrenzen des Batteriemanagementsystems (BMS) und der Sicherheitsnormen. Jedes BMS besitzt einen maximal zulässigen Dauerentladestrom (häufig `1 C`, also `100 A` bei einer `100-Ah`-Batterie); wird dieser durch einen großen Wechselrichter überschritten, schaltet der Akku schlagartig ab. Bei mehreren parallel geschalteten Batterien müssen die Anschlusskabel exakt gleich lang und diagonal angeschlossen sein, damit sich die Entladeströme gleichmäßig auf alle Blöcke verteilen. Bei Temperaturen unter `0 °C` darf ein Standard-LiFePO4-Akku ohne integrierte Zellheizung nicht geladen werden, da sich metallisches Lithium an der Anode ablagert und die Zelle dauerhaft schädigt. Blei-Säure-Batterien wiederum sollten nach jeder Entladung möglichst zügig wieder vollständig aufgeladen werden, weil bereits wenige Tage im teilentladenen Zustand eine irreversible Sulfatierung der Bleiplatten auslösen. Für den gewerblichen Versand oder Transport größerer Lithiumbatterien gelten darüber hinaus die Prüfvorschriften nach UN 38.3 sowie die Gefahrgutregeln ab `100 Wh` Einzelbatterie-Energieinhalt.
