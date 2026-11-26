---
title: "Spezifische Wärmekapazität Rechner: Thermische Eigenschaften"
description: "Erfahren Sie, was die spezifische Wärmekapazität bedeutet, warum Wasser ein starker Wärmespeicher ist und wie Sie Energiebedarf exakt berechnen."
category: "Math & Science"
relatedCalculator: "specific-heat-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Worin unterscheiden sich spezifische Wärmekapazität c und Wärmekapazität C?"
    answer: "Die spezifische Wärmekapazität c ist eine intensive Stoffeigenschaft und gibt den Energiebedarf pro Masse und Kelvin an (Einheit kJ/(kg·K) oder J/(g·K)). Die Wärmekapazität C = m × c ist dagegen eine extensive Eigenschaft eines konkreten Gegenstands in J/K – ein schwerer Topf hat eine größere Wärmekapazität als ein leichter Topf aus demselben Material."
  - question: "Warum besitzt flüssiges Wasser eine so außergewöhnlich hohe spezifische Wärmekapazität?"
    answer: "Zwischen den polaren Wassermolekülen wirken starke Wasserstoffbrückenbindungen. Bevor sich die Moleküle schneller bewegen können und die Temperatur steigt, muss ein großer Teil der zugeführten Wärmeenergie erst zum Dehnen und Aufbrechen dieser Netzwerke aufgewendet werden. Mit 4,184 kJ/(kg·K) speichert Wasser rund zehnmal mehr Wärme pro Kilogramm als Stahl."
  - question: "Wann muss man zwischen isobarer (c_p) und isochorer (c_v) Wärmekapazität unterscheiden?"
    answer: "Bei Festkörpern und Flüssigkeiten ist die thermische Volumenausdehnung sehr gering, sodass c_p und c_v praktisch übereinstimmen. Bei Gasen hingegen leistet ein Gas unter konstantem Druck beim Erwärmen zusätzliche Ausdehnungsarbeit gegen die Umgebung. Daher gilt c_p > c_v, wobei die Differenz der spezifischen Gaskonstante R_s entspricht."
  - question: "Ist die spezifische Wärmekapazität eines Materials bei jeder Temperatur gleich?"
    answer: "Nein, sie ist streng genommen temperaturabhängig. Bei Wasser schwankt sie zwischen 0 °C und 100 °C allerdings nur leicht um etwa 1 % und erreicht bei rund 35 °C ein Minimum von 4,178 kJ/(kg·K). Bei Metallen oder Keramiken über weite Temperaturbereiche von mehreren hundert Kelvin muss hingegen oft mit einer mittleren spezifischen Wärmekapazität gerechnet werden."
  - question: "Wie berechne ich die Heizleistung in Kilowatt aus der Wärmemenge in Kilojoule?"
    answer: "Die benötigte elektrische oder thermische Leistung ergibt sich aus der Wärmemenge geteilt durch die gewünschte Aufheizzeit in Sekunden (1 kW = 1 kJ/s). Alternativ rechnen Sie die Energie zunächst durch Division durch 3.600 in Kilowattstunden (kWh) um und teilen anschließend durch die Aufheizdauer in Stunden."
---

Die spezifische Wärmekapazität `c` gibt an, wie viel thermische Energie benötigt wird, um ein Kilogramm (beziehungsweise ein Gramm) eines Stoffes ohne Phasenübergang um genau ein Kelvin (`1 K`) oder ein Grad Celsius (`1 °C`) zu erwärmen. Materialien mit niedriger spezifischer Wärmekapazität wie Kupfer oder Stahl erhitzen sich bei gleicher Energiezufuhr sehr rasch, während Stoffe mit hohem `c`-Wert wie Wasser große Wärmemengen puffern können.

In der Physik, Verfahrenstechnik und Gebäudetechnik bildet diese Kenngröße über die Grundformel `Q = m × c × ΔT` die Basis für Auslegungen von Wärmespeichern, Kühlsystemen und Heizprozessen. Mit unserem [Spezifische Wärmekapazität Rechner](/de/rechner/spezifische-waerme-rechner) ermitteln Sie jede der vier Variablen unmittelbar ohne manuelles Umstellen.

## Physikalische Definition, Gleichungen und Einheiten

Die spezifische Wärmekapazität ist definiert als das Verhältnis der zugeführten Wärmeenergie `Q` zum Produkt aus Masse `m` und Temperaturänderung `ΔT`:

```text
Q = m × c × ΔT
c = Q / (m × ΔT)
```

Je nach gesuchter Zielgröße lässt sich die Gleichung ebenso nach der Masse (`m = Q / (c × ΔT)`) oder der Temperaturdifferenz (`ΔT = Q / (m × c)`) umstellen. Für korrekte Ergebnisse müssen die Einheiten aller vier Größen sauber aufeinander abgestimmt sein:

- **`Q` (Wärmeenergie):** Joule (`J`) im Labor- und Gramm-Maßstab oder Kilojoule (`kJ`) bzw. Megajoule (`MJ`) in der Technik. Für energiewirtschaftliche Betrachtungen gilt die Umrechnung `1 kWh = 3.600 kJ = 3,6 MJ`.
- **`m` (Masse):** Gramm (`g`) passend zu `J/(g·K)` oder Kilogramm (`kg`) passend zu `kJ/(kg·K)`. Bemerkenswert ist die Zahlenwertgleichheit: `1 J/(g·K) = 1 kJ/(kg·K)`.
- **`c` (Spezifische Wärmekapazität):** Materialabhängige Größe. Für reines Wasser bei 20 °C beträgt der Standardwert `4,184 kJ/(kg·K)`.
- **`ΔT` (Temperaturänderung):** Differenz `T_Ende − T_Anfang` in Kelvin (`K`) oder Grad Celsius (`°C`). Bei Abkühlung wird `ΔT` negativ, wodurch auch `Q` ein negatives Vorzeichen erhält.

Neben der massebezogenen Größe `c` verwendet die Chemie häufig die **molare Wärmekapazität** `C_m = M × c` in `J/(mol·K)`. Nach der klassischen Dulong-Petit-Regel liegt `C_m` für viele feste Metalle nahe Raumtemperatur bei rund `3 × R ≈ 25 J/(mol·K)`, weshalb schwere Elemente wie Blei eine deutlich niedrigere massebezogene Wärmekapazität besitzen als leichte Elemente wie Aluminium.

## Schritt-für-Schritt-Beispiel: Aufheizenergie eines Warmwasserspeichers

In einem Wohngebäude soll ein Trinkwarmwasserspeicher mit einem Volumen von `200 Litern` von einer Kaltwasser-Zulauftemperatur von `12,0 °C` auf `60,0 °C` (Standardtemperatur zur Legionellenprävention nach DVGW W 551) aufgeheizt werden. Gesucht sind die erforderliche Wärmeenergie in Kilojoule und Kilowattstunden sowie die Aufheizzeit eines elektrischen Heizstabs mit `3,0 kW` Nennleistung (bei vernachlässigten Speicherverlusten).

1. **Masse des Wassers bestimmen:**
   Bei einer Wasserdichte von rund `1,00 kg/L` entspricht ein Speichervolumen von `200 L` einer Masse von `m = 200 kg`.
2. **Temperaturdifferenz berechnen:**
   `ΔT = 60,0 °C − 12,0 °C = 48,0 K`
3. **Wärmemenge in Kilojoule ermitteln:**
   Mit `c_Wasser = 4,184 kJ/(kg·K)` ergibt sich:
   `Q = 200 kg × 4,184 kJ/(kg·K) × 48,0 K = 836,8 kJ/K × 48,0 K = 40.166,4 kJ` (rund `40,17 MJ`)
4. **Umrechnung in Kilowattstunden und Aufheizdauer:**
   `Q_kWh = 40.166,4 kJ / 3.600 kJ/kWh = 11,157 kWh ≈ 11,16 kWh`
   Bei einer Leistung von `P = 3,0 kW` beträgt die ideale Aufheizzeit:
   `t = 11,157 kWh / 3,0 kW = 3,719 Stunden` (etwa `3 Stunden und 43 Minuten`).

Zum Vergleich: Würde derselbe Energieeintrag nicht auf `200 kg` Wasser, sondern auf einen `200 kg` schweren Kupferblock (`c = 0,385 kJ/(kg·K)`) angewendet, wären für dieselben `48,0 K` Temperaturhub lediglich `200 × 0,385 × 48,0 = 3.696 kJ` (`1,03 kWh`) nötig – weniger als ein Zehntel.

## Spezifische Wärmekapazität ausgewählter Stoffe im Vergleich

Die folgende Übersicht zeigt Referenzwerte bei `20 °C` und Normaldruck (`101,325 kPa`) sowie die charakteristische technische Einordnung.

| Stoff / Material | Aggregatzustand | `c` in `kJ/(kg·K)` | `c` in `J/(g·K)` | Typisches Einsatzfeld |
| :--- | :--- | :--- | :--- | :--- |
| **Wasser (rein)** | Flüssig | `4,184` | `4,184` | Heizkreise, Pufferspeicher, Prozesskühlung |
| **Ethanol** | Flüssig | `2,440` | `2,440` | Kältebäder, Laborthermostate |
| **Wassereis (−10 °C)** | Fest | `2,050` | `2,050` | Kältespeicher, Phasenwechsel-Analysen |
| **Holz (Fichte, trocken)** | Fest | `1,700` | `1,700` | Sommerlicher Wärmeschutz im Holzbau |
| **Luft (`c_p`, trocken)** | Gasförmig | `1,005` | `1,005` | Lüftungs- und Klimatechnik (RLT) |
| **Aluminium** | Fest | `0,897` | `0,897` | Kühlkörper, Leichtbau-Wärmetauscher |
| **Beton (Normalbeton)** | Fest | `0,880` | `0,880` | Thermische Bauteilaktivierung, Speichermasse |
| **Eisen / Baustahl** | Fest | `0,450` | `0,450` | Anlagenbau, Kochgeschirr, Wärmebehandlung |
| **Kupfer** | Fest | `0,385` | `0,385` | Wärmerohre, Induktionsspulen, Heizregister |

## Praxisanwendungen, Fehlerquellen und Modellgrenzen

In der Bau- und Energietechnik entscheidet neben der spezifischen Wärmekapazität häufig die **volumenbezogene Wärmekapazität** `C_V = ρ × c` darüber, wie viel Wärme ein Kubikmeter Baustoff speichern kann. Obwohl Holz pro Kilogramm fast doppelt so viel Wärme aufnimmt wie Beton, speichert ein Kubikmeter Normalbeton durch seine weitaus höhere Dichte (`ρ ≈ 2.400 kg/m³`) rund `2.112 kJ/(m³·K)` und übertrifft Holz deutlich bei der Trägheit gegen Raumtemperaturschwankungen.

In der Elektronikentwicklung und Metallurgie ermöglicht die Kenntnis von `c` eine schnelle Abschätzung von Aufheizraten und thermischen Zeitkonstanten. Bei Wärmebehandlungen, Abschreckprozessen oder der Auslegung von Kühlkreisläufen treten in der Praxis jedoch häufig folgende Fehler auf:

- **Übersehen von Phasenübergängen:** Wird Wasser über `100 °C` bei Normaldruck hinaus erhitzt, genügt `Q = m × c × ΔT` nicht mehr. Für das Verdampfen müssen zusätzlich `2.257 kJ/kg` an Verdampfungsenthalpie aufgewendet werden.
- **Unbeachtete Temperaturabhängigkeit:** Über große Temperaturintervalle (beispielsweise bei Abgasen von `20 °C` auf `800 °C`) steigt `c_p` deutlich an. Für hohe Präzision sind temperaturgemittelte Werte oder Polynome nach VDI-Wärmeatlas erforderlich.
- **Verwechslung von `c_p` und `c_v` bei Gasen:** Während bei Flüssigkeiten ein einziger Wert ausreicht, hängt der Energiebedarf eines Gases zwingend davon ab, ob sich das Gasvolumen frei ausdehnen darf (`c_p`) oder starr eingesperrt bleibt (`c_v`).
- **Vernachlässigte Behältermasse:** Beim Erwärmen von Flüssigkeiten in schweren Reaktoren oder Kesseln nimmt der Metallmantel selbst einen merklichen Teil der Wärmeenergie auf.
