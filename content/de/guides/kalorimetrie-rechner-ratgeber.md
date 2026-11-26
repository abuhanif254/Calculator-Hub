---
title: "Kalorimetrie-Rechner: Wärmeübertragung messen"
description: "Erfahren Sie, wie die Kalorimetrie funktioniert, wie Sie Wärmeübertragung sowie Mischtemperaturen exakt berechnen und den Kalorimetrie-Rechner anwenden."
category: "Math & Science"
relatedCalculator: "calorimetry-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Worin liegt der Unterschied zwischen Wärmeenergie Q und Wärmekapazität C?"
    answer: "Die Wärmeenergie Q (in Joule oder Kilojoule) beschreibt die gesamte thermische Energie, die bei einem Prozess zwischen zwei Systemen übertragen wird. Die Wärmekapazität C (in J/K) gibt hingegen an, wie viel Energie ein bestimmter Körper aufnehmen muss, um sich um genau ein Kelvin zu erwärmen. Sie ist das Produkt aus Masse und spezifischer Wärmekapazität."
  - question: "Warum muss die Eigenwärmekapazität des Kalorimeters berücksichtigt werden?"
    answer: "In der Praxis erwärmt sich nicht nur das Wasser im Gefäß, sondern auch das Innengefäß selbst, das Thermometer und das Rührwerk. Diese kombinierte Wärmekapazität wird als Kalorimeterkonstante C_Kal bezeichnet. Ignoriert man sie bei genauen Laborversuchen, fällt die berechnete Reaktions- oder Abgabewärme systematisch zu niedrig aus."
  - question: "Wann verwendet man ein Bombenkalorimeter statt eines Becherkalorimeters?"
    answer: "Ein offenes oder einfach isoliertes Becherkalorimeter arbeitet bei konstantem Umgebungsdruck und eignet sich für Lösungsenthalpien, Neutralisationsreaktionen oder Mischversuche in wässriger Phase. Ein Bombenkalorimeter arbeitet dagegen bei konstantem Volumen in einem druckfesten Stahlzylinder und ist für Verbrennungsreaktionen sowie die Brennwertbestimmung von Kraftstoffen oder Lebensmitteln unverzichtbar."
  - question: "Welche Bedeutung hat das Vorzeichen bei der kalorimetrischen Wärmemenge Q?"
    answer: "Nach thermodynamischer Konvention steht ein negatives Vorzeichen (Q < 0) für eine Wärmeabgabe des untersuchten Systems an die Umgebung, also einen exothermen Vorgang. Ein positives Vorzeichen (Q > 0) kennzeichnet eine Wärmeaufnahme durch das System und damit einen endothermen Prozess. Da Energie erhalten bleibt, gilt stets Q_System = −Q_Umgebung."
  - question: "Gilt die Formel Q = m × c × ΔT auch während eines Phasenübergangs?"
    answer: "Nein, während ein Stoff schmilzt, erstarrt, verdampft oder kondensiert, bleibt seine Temperatur trotz Energiezufuhr oder -abgabe konstant (ΔT = 0). Die aufgenommene oder freigesetzte Wärme wird in diesem Abschnitt nicht durch die spezifische Wärmekapazität, sondern über die spezifische latente Wärme L mittels Q = m × L berechnet."
---

Die Kalorimetrie ist das experimentelle und rechnerische Standardverfahren der Thermodynamik, um bei physikalischen Vorgängen oder chemischen Reaktionen übertragene Wärmemengen präzise zu bestimmen. Da sich thermische Energie nicht direkt ablesen lässt, misst ein Kalorimeter die Temperaturänderung `ΔT` eines thermisch isolierten Referenzmediums – meist Wasser – und ermittelt daraus mithilfe der Masse `m` sowie der spezifischen Wärmekapazität `c` über die Grundgleichung `Q = m × c × ΔT` die exakt ausgetauschte Energie.

Je nach Aufgabenstellung arbeitet man entweder bei konstantem Druck (etwa im Labor-Becherkalorimeter für Lösungs- und Mischungsprozesse) oder bei konstantem Volumen (im druckfesten Bombenkalorimeter für Verbrennungs- und Brennwertanalysen). Mit unserem [Kalorimetrie-Rechner](/de/rechner/kalorimetrie-rechner) lösen Sie diese Energiebilanz automatisch nach jeder gesuchten Größe auf – ob Wärmeenergie, Masse, spezifische Wärmekapazität oder Temperaturdifferenz.

## Physikalische Grundlagen und die Kalorimetrie-Gleichung

Jede kalorimetrische Berechnung beruht auf dem ersten Hauptsatz der Thermodynamik, dem Energieerhaltungssatz. In einem ideal abgeschlossenen, adiabatischen System geht keine Wärme an die Umgebung verloren. Gibt eine heiße Probe oder eine exotherme Reaktion thermische Energie ab, nimmt das umgebende Kalorimeterwasser inklusive Gefäß genau diese Energiemenge auf:

```text
Q_Probe + Q_Wasser + Q_Kalorimeter = 0
Q_Probe = −(m_Wasser × c_Wasser × ΔT + C_Kal × ΔT)
```

Für einen einzelnen Stoff ohne Phasenübergang lautet die zentrale Kalorimetrie-Gleichung:

```text
Q = m × c × ΔT   mit   ΔT = T_Ende − T_Anfang
```

Die Parameter besitzen folgende physikalische Bedeutung und gebräuchliche Einheiten:

- **`Q` (Wärmeenergie):** Die übertragene thermische Energie in Joule (`J`) oder Kilojoule (`kJ`). Im Lebensmittel- und Ernährungsbereich wird historisch auch die Kilokalorie (`kcal`) genutzt, wobei exakt `1 kcal = 4,184 kJ` entspricht.
- **`m` (Masse):** Die Stoffmasse in Gramm (`g`) oder Kilogramm (`kg`). In wässrigen Laborversuchen wird häufig über die Dichte umgerechnet (`1,00 mL` Wasser bei 20 °C entspricht etwa `0,998 g`).
- **`c` (Spezifische Wärmekapazität):** Die Materialkonstante in `J/(g·K)` oder `kJ/(kg·K)`. Für flüssiges Wasser bei Raumtemperatur gilt `c = 4,184 J/(g·K)`.
- **`ΔT` (Temperaturänderung):** Die Differenz aus Endtemperatur und Anfangstemperatur in Kelvin (`K`) oder Grad Celsius (`°C`). Da beide Skalen dieselbe Schrittweite besitzen, ist eine Differenz von `1 K` identisch mit `1 °C`.
- **`C_Kal` (Kalorimeterkonstante):** Die Wärmekapazität des Kalorimetergefäßes einschließlich Rührer und Temperatursensor in `J/K`.

Werden zwei Körper unterschiedlicher Anfangstemperatur (`T₁` und `T₂`) in Kontakt gebracht, stellt sich im thermischen Gleichgewicht eine gemeinsame Mischtemperatur `T_Misch` ein. Ohne Berücksichtigung von `C_Kal` berechnet sich diese nach der Richmannschen Mischungsregel als gewichteter Mittelwert:

```text
T_Misch = (m₁ × c₁ × T₁ + m₂ × c₂ × T₂) / (m₁ × c₁ + m₂ × c₂)
```

## Schritt-für-Schritt-Beispiel: Spezifische Wärmekapazität einer Metallprobe

In einem Kalorimeter befinden sich `m_Wasser = 500 g` destilliertes Wasser bei einer Anfangstemperatur von `T_Wasser = 20,0 °C`. Die zuvor experimentell ermittelte Kalorimeterkonstante des Gefäßes beträgt `C_Kal = 58,0 J/K`. Ein erhitzter Messingkörper mit der Masse `m_Probe = 250 g` und einer Ausgangstemperatur von `T_Probe = 110,0 °C` wird rasch in das Wasser getaucht. Nach vollständiger Durchmischung stellt sich eine konstante Endtemperatur von `T_Ende = 24,0 °C` ein. Gesucht ist die spezifische Wärmekapazität `c_Probe` der Metalllegierung.

1. **Temperaturänderung des Wassers und des Kalorimeters bestimmen:**
   `ΔT_Wasser = T_Ende − T_Wasser = 24,0 °C − 20,0 °C = 4,0 K`
2. **Aufgenommene Wärmeenergie berechnen:**
   Zuerst wird die gesamte Wärmekapazität von Wasser und Kalorimeter addiert:
   `C_Gesamt = (500 g × 4,184 J/(g·K)) + 58,0 J/K = 2.092,0 J/K + 58,0 J/K = 2.150,0 J/K`
   Anschließend folgt die aufgenommene Wärmemenge:
   `Q_aufgenommen = 2.150,0 J/K × 4,0 K = 8.600 J` (`8,60 kJ`)
3. **Energiebilanz auf die Metallprobe übertragen:**
   Da die Probe genau die Energie abgibt, die Wasser und Gefäß aufnehmen, gilt `Q_Probe = −8.600 J`. Ihre Abkühlung beträgt:
   `ΔT_Probe = 24,0 °C − 110,0 °C = −86,0 K`
4. **Nach der spezifischen Wärmekapazität auflösen:**
   `c_Probe = Q_Probe / (m_Probe × ΔT_Probe) = (−8.600 J) / (250 g × (−86,0 K)) = 8.600 J / 21.500 g·K = 0,400 J/(g·K)`

Das Ergebnis von `0,400 J/(g·K)` (bzw. `0,400 kJ/(kg·K)`) stimmt präzise mit typischen Literaturwerten für Messing- und Kupferlegierungen überein.

## Kalorimetertypen und Messverfahren im Vergleich

Je nach Aggregatzustand der Probe, erwarteter Wärmetönung und erforderlicher Messgenauigkeit kommen in Wissenschaft und Industrie unterschiedliche Kalorimeterbauarten zum Einsatz.

| Kalorimetertyp | Messbedingung | Typische Messgröße | Erreichbare Genauigkeit | Hauptanwendungsgebiet |
| :--- | :--- | :--- | :--- | :--- |
| **Becherkalorimeter** | Konstanter Druck (`p = const`) | Lösungs- und Mischwärmen | ±2 % bis ±5 % | Ausbildung, einfache Laborversuche |
| **Bombenkalorimeter** | Konstantes Volumen (`V = const`) | Brenn- und Heizwert | ±0,1 % bis ±0,5 % | Kohle, Kraftstoffe, Lebensmittel (DIN 51900) |
| **Dynamische Differenzkalorimetrie (DSC)** | Programmierte Temperaturrampe | Schmelz- und Glasübergang | ±0,5 % bis ±2 % | Polymeranalytik, Pharmazie (ISO 11357) |
| **Reaktionskalorimeter** | Isotherm oder adiabatisch | Wärmefluss über die Zeit | ±1 % bis ±3 % | Chemische Verfahrenstechnik, Sicherheit |
| **Isotherme Titrationskalorimetrie (ITC)** | Konstante Temperatur (`T = const`) | Bindungsenthalpie im Mikrobereich | Nanowatt-Bereich | Biochemie, Wirkstoffforschung |
| **Durchflusskalorimeter** | Stationärer Massenstrom | Heizwert von Brenngasen | ±0,2 % bis ±1 % | Gasversorgung, Energiewirtschaft |

Bei konstantem Volumen im Bombenkalorimeter misst man die Änderung der inneren Energie `ΔU`, während beim offenen Druckkalorimeter direkt die Reaktionsenthalpie `ΔH` bestimmt wird. Bei reinen Festkörper- oder Flüssigkeitsreaktionen ist der Unterschied vernachlässigbar; bei Gasreaktionen mit Änderung der Teilchenzahl `Δn_Gas` gilt der Zusammenhang `ΔH = ΔU + Δn_Gas × R × T`.

## Praxisanwendungen, Fehlerquellen und Normhinweise

In der industriellen Qualitätskontrolle liefert die Kalorimetrie unverzichtbare Kenndaten. Brennstoffanalysen nach **DIN 51900** oder **ISO 1928** bestimmen im Bombenkalorimeter den Brennwert (`H_o`), aus dem über den Wasser- und Wasserstoffgehalt der Heizwert (`H_u`) abgeleitet wird. In der chemischen Sicherheitstechnik identifizieren Reaktionskalorimeter kritische Exothermien frühzeitig, um ein thermisches Durchgehen von Reaktoren zu verhindern.

Im Laboralltag entstehen Abweichungen vor allem durch vier Fehlerquellen:

- **Wärmeaustausch mit der Umgebung:** Kein Kalorimeter isoliert perfekt. Bei längeren Versuchen empfiehlt sich eine Vor- und Nachperiode mit grafischer Extrapolation.
- **Vergessene Kalorimeterkonstante:** Ohne vorangehende Kalibrierung (elektrisch oder mit Benzoesäure) geht die vom Gefäß aufgenommene Energie als systematischer Fehler verloren.
- **Unvollständige Durchmischung:** Temperaturgradienten im Wasserbad verfälschen den Messwert erheblich.
- **Mitgeschleppte Heizflüssigkeit:** Tropft beim Umsetzen der Probe heißes Wasser mit ins Kalorimeter, wird die gemessene Wärmemenge verfälscht.

Achten Sie zudem auf konsistente Einheiten und unterscheiden Sie bei Lebensmitteln zwischen dem physikalischen Brennwert im Bombenkalorimeter und dem physiologischen Brennwert gemäß EU-Lebensmittelinformationsverordnung.
