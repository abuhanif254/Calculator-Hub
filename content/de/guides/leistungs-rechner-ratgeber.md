---
title: "Physik der Leistung: Wie schnell Arbeit verrichtet wird"
description: "Verstehen Sie den physikalischen Zusammenhang zwischen Arbeit, Energie, Zeit und Leistung (P = W / t). Inklusive Watt-PS-Umrechnung, Rechenbeispielen und direktem Zugang zum Leistungs-Rechner."
category: "Math & Science"
relatedCalculator: "power-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Worin liegt der genaue Unterschied zwischen Arbeit (Energie) und Leistung?"
    answer: "Arbeit beziehungsweise Energie (gemessen in Joule oder Kilowattstunden) gibt an, wie viel Energie insgesamt umgesetzt wird. Leistung (gemessen in Watt oder Kilowatt) beschreibt hingegen die Geschwindigkeit dieses Umsatzes pro Sekunde. Zwei Motoren, die dieselbe Last auf die gleiche Höhe heben, verrichten identische Arbeit – der schnellere Motor benötigt jedoch deutlich mehr Leistung."
  - question: "Wie rechnet man Kilowatt (kW) exakt in Pferdestärken (PS) um?"
    answer: "Im deutschsprachigen Raum gilt die metrische Pferdestärke: 1 PS entspricht exakt 735,49875 Watt (gerundet 735,5 W) beziehungsweise 0,7355 kW. Umgekehrt entspricht 1 kW rund 1,3596 PS. Vorsicht ist bei englischsprachigen Datenblättern geboten: Die angloamerikanische Mechanical Horsepower (hp) beträgt 745,7 W und weicht damit um etwa 1,4 % von der deutschen PS ab."
  - question: "Warum ist auf Stromrechnungen von kWh und bei Geräten von W die Rede?"
    answer: "Die auf dem Typenschild eines Geräts angegebene Wattzahl (W oder kW) beziffert die momentane Leistungsaufnahme. Multipliziert man diese Leistung mit der Betriebsdauer in Stunden, erhält man die verbrauchte elektrische Energie in Kilowattstunden (kWh). Ein 2-kW-Heizlüfter verbraucht in 30 Minuten genau 1 kWh (3,6 MJ) Energie."
  - question: "Was unterscheidet die mechanische Aufnahmeleistung von der Abgabeleistung?"
    answer: "Kein reales System arbeitet verlustfrei. Die Aufnahmeleistung (P_zu) ist die gesamte elektrisch oder chemisch zugeführte Leistung, während die Abgabeleistung (P_ab) jenen Anteil beschreibt, der tatsächlich als nutzbare mechanische oder thermische Leistung an der Welle oder Last ankommt. Das Verhältnis η = P_ab / P_zu heißt Wirkungsgrad."
  - question: "Wie lässt sich die Leistung eines bewegten Fahrzeugs direkt aus Kraft und Geschwindigkeit berechnen?"
    answer: "Da Arbeit gleich Kraft mal Weg (W = F × s) und Geschwindigkeit gleich Weg pro Zeit (v = s / t) ist, vereinfacht sich die Leistungsformel bei gleichförmiger Bewegung zu P = F × v. Müssen beispielsweise 800 N Fahrwiderstand bei 30 m/s (108 km/h) überwunden werden, sind exakt 24.000 W (24 kW) Antriebsleistung an den Rädern erforderlich."
---

Ob Sie eine schwere Umzugskiste gemächlich oder im Sprint eine Treppe hinauftragen: Die mechanische Hubarbeit bleibt exakt dieselbe, weil sich Masse und Höhenunterschied nicht ändern. Was beim Sprint stark ansteigt, ist die **Leistung** (Formelzeichen *P* für englisch *power*). Physikalisch definiert ist die Leistung als Quotient aus verrichteter Arbeit `W` (oder umgesetzter Energie `ΔE`) und benötigter Zeitspanne `t`. Je schneller eine gegebene Arbeit geleistet wird, desto größer ist die erforderliche Leistung.

Im Internationalen Einheitensystem (SI) wird Leistung in **Watt (W)** angegeben, benannt nach James Watt. Ein Watt entspricht genau einem Joule pro Sekunde (`1 W = 1 J/s`). Für alle Umstellungen zwischen Leistung, Arbeit und Zeit – etwa zur Auslegung von Antrieben oder zur Auswertung physikalischer Messreihen – nutzen Sie unseren [Leistungs-Rechner](/de/rechner/leistung-rechner).

## Grundlagen der physikalischen Leistung und ihre Gleichungen

### Mittlere Leistung, Momentanleistung und Geschwindigkeit

Für einen konstanten oder über ein Zeitintervall gemittelten Energieumsatz gilt die Grundgleichung:

```text
P = W / t = ΔE / t
```

Durch Umstellen ergeben sich direkt `W = P × t` (Arbeit aus Leistung und Dauer) sowie `t = W / P` (benötigte Zeit bei bekannter Leistung):

- **P (Leistung):** Energieumsatz pro Sekunde in Watt (`W`), Kilowatt (`1 kW = 1.000 W`) oder Megawatt (`1 MW = 1.000.000 W`).
- **W (Arbeit / Energie):** Umgesetzte Arbeit in Joule (`J = W·s`) oder Kilowattstunden (`1 kWh = 3,6 MJ`).
- **t (Zeit):** Dauer des Vorgangs in Sekunden (`s`).

Wirkt während einer Bewegung eine konstante Kraft `F` bei der Geschwindigkeit `v`, entsteht durch Einsetzen von `W = F × s` die in der Fahrzeugtechnik zentrale Beziehung `P = F × v × cos(α)`. Bei zeitlich schwankenden Vorgängen beschreibt `P(t) = dW / dt` die Momentanleistung.

### Mechanische, rotatorische und elektrische Leistung

Die Größe Leistung verknüpft Mechanik und Elektrotechnik über einheitliche Gleichungen: Bei rotierenden Wellen gilt `P = M × 2 × π × n` (Drehmoment `M` in `N·m`, Drehzahl `n` in `s⁻¹`), bei Gleichstrom `P = U × I`. In Deutschland und Österreich bleibt die metrische Pferdestärke als Zusatzangabe verbreitet (`1 PS = 735,49875 W ≈ 735,5 W`); nach der europäischen Einheitenverordnung ist in amtlichen Dokumenten und Fahrzeugpapieren jedoch `kW` verbindlich.

### Wirkungsgrad und Leistungsfluss

Reale Maschinen wandeln einen Teil der zugeführten Energie stets in Abwärme oder mechanische Reibung um. Der **Wirkungsgrad `η`** gibt das Verhältnis von nutzbarer Abgabeleistung `P_ab` zu zugeführter Aufnahmeleistung `P_zu` an (`η = P_ab / P_zu`). Bei einem Industriemotor mit `η = 0,85` gehen `15 %` der elektrischen Eingangsleistung als Verlustwärme verloren. In mehrstufigen Antrieben aus Elektromotor, Getriebe und Seiltrommel multiplizieren sich die Einzelwirkungsgrade zum Gesamtwirkungsgrad (`η_ges = η_Motor × η_Getriebe × η_Mechanik`), weshalb selbst scheinbar kleine Reibungsverluste jeder Stufe die insgesamt benötigte Netzleistung spürbar erhöhen.

## Schritt-für-Schritt-Beispiel: Lastenaufzug und Zeitverkürzung

Ein elektrischer Bauaufzug auf einer Baustelle hebt eine `250 kg` schwere Palette mit Mauersteinen senkrecht um `h = 12 m` auf ein Gerüst und benötigt dafür exakt `t = 15 s`. Die gesamte Antriebseinheit aus Drehstrommotor, Schneckengetriebe und Seilwinde erreicht unter Nennlast einen Gesamtwirkungsgrad von `η = 0,82` (`82 %`). Welche mechanische Nutzleistung am Seil und welche elektrische Aufnahmeleistung aus dem Baustromverteiler sind dafür erforderlich?

1. **Gewichtskraft bestimmen:** Mit `g = 9,81 m/s²` beträgt die Gewichtskraft:
   `F_G = 250 kg × 9,81 m/s² = 2.452,5 N`
2. **Hubarbeit berechnen:** Über `h = 12 m` ergibt sich unabhängig von der Hubdauer:
   `W = 2.452,5 N × 12 m = 29.430 J = 29,43 kJ`
3. **Mechanische Nutzleistung ermitteln:** Division durch `t = 15 s` liefert:
   `P_ab = 29.430 J / 15 s = 1.962 W ≈ 1,96 kW` (`≈ 2,67 PS`)
4. **Elektrische Aufnahmeleistung über den Wirkungsgrad bestimmen:** Durch den Getriebe- und Motorverlust benötigt das Netz:
   `P_zu = 1.962 W / 0,82 = 2.392,7 W ≈ 2,39 kW`
5. **Einfluss der Zeit:** Wird die Palette in `7,5 s` statt `15 s` gehoben, bleibt `W = 29,43 kJ` identisch, doch verdoppeln sich `P_ab` (`3,92 kW`) und `P_zu` (`4,79 kW`). Über den [Leistungs-Rechner](/de/rechner/leistung-rechner) prüfen Sie solche Szenarien sofort.

## Benchmark-Tabelle: Leistungsklassen in Alltag, Technik und Industrie

| System / Anwendung | Typische Leistung (P) | Umgerechnet in kW & PS | Arbeit pro Minute (`P × 60 s`) | Physikalischer Kontext |
| --- | --- | --- | --- | --- |
| LED-Haushaltslampe | `10 W` | `0,01 kW` (`0,014 PS`) | `600 J` (`0,6 kJ`) | Licht- und geringer Wärmeumsatz |
| Treppenlauf (`75 kg`, `3 m` in `4 s`) | `551,8 W` | `0,552 kW` (`0,75 PS`) | `33,1 kJ` (theor. Dauer) | Kurzzeitige menschliche Spitzenleistung |
| Elektrischer Wasserkocher | `2.200 W` | `2,20 kW` (`2,99 PS`) | `132 kJ` (`0,037 kWh`) | Thermische Erwärmung über Widerstand |
| Verbrennungsmotor (Kompaktwagen) | `81.000 W` | `81,0 kW` (`110,1 PS`) | `4,86 MJ` (`1,35 kWh`) | Mechanische Nennleistung an der Welle |
| E-Auto-Schnelllader (HPC) | `300.000 W` | `300 kW` (`407,9 PS`) | `18,0 MJ` (`5,00 kWh`) | Hohe Gleichstrom-Ladeleistung |
| Moderne Windenergieanlage | `5.500.000 W` | `5,50 MW` (`7.478 PS`) | `330 MJ` (`91,67 kWh`) | Generatorische Einspeisung ins Netz |

## Praxisanwendung, typische Fehlerquellen und gesetzliche Vorgaben

Leistungsberechnungen entscheiden in der technischen Praxis über Betriebssicherheit, Wirtschaftlichkeit und sichere Bauteilauslegung: In der Elektrotechnik bestimmen sie die maximal zulässige Stromkreisbelastung (`P_max = 230 V × 16 A = 3.680 W` an einer herkömmlichen Haushaltssteckdose), im Maschinenbau die erforderliche Kühlleistung und im Ausdauersport die funktionelle Schwellenleistung (`W/kg` Körpergewicht). Vermeiden Sie diese fünf typischen Fehler:

- **Leistung (`kW`) und Energie (`kWh`) verwechseln:** Eine Solaranlage mit `10 kWp` liefert im Peak `10 kW` Leistung, erzeugt im Jahr im DACH-Raum aber rund `10.000 kWh` Energie.
- **Spitzenleistung mit Dauerleistung gleichsetzen:** Motoren und Wechselrichter tragen Überlastspitzen nur kurzzeitig; maßgeblich für den Dauerbetrieb ist die thermische Nennleistung.
- **Deutsche `PS` mit `hp` vermischen:** Angloamerikanische Horsepower entsprechen `745,7 W` statt `735,5 W` (rund `1,4 %` Differenz).
- **Blindleistung ignorieren:** Bei induktiven Drehstrommotoren unterscheidet sich Wirkleistung von Scheinleistung um den Leistungsfaktor `cos(φ)` (`P = √3 × U × I × cos φ`).
- **Zeiteinheiten nicht in Sekunden konvertieren:** Für Ergebnisse in Watt müssen Arbeit zwingend in Joule (`J`) und Zeit in Sekunden (`s`) eingesetzt werden.
