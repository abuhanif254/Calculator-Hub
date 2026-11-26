---
title: "Elektrische Leistung: Watt berechnen (P=U*I)"
description: "Meistern Sie das Wattsche Gesetz (P = U × I), lernen Sie Wirk-, Schein- und Blindleistung im Wechselstromnetz zu unterscheiden und nutzen Sie unseren Elektrische Leistung Rechner."
category: "Math & Science"
relatedCalculator: "electrical-power-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Worin liegt der Unterschied zwischen Watt (W) und Voltampere (VA)?"
    answer: "Watt (W) bezeichnet die tatsächliche Wirkleistung P, die ein Gerät in Wärme, Licht oder mechanische Arbeit umsetzt. Voltampere (VA) steht für die Scheinleistung S = U × I im Wechselstromnetz. Bei rein ohmschen Geräten wie Wasserkochern sind beide Werte identisch. Bei Geräten mit Motoren, Transformatoren oder bestimmten Netzteilen entsteht Blindleistung, sodass die Scheinleistung in VA höher ausfällt als die Wirkleistung in Watt."
  - question: "Warum nimmt ein Computer mit 750-Watt-Netzteil im Betrieb oft nur 150 Watt auf?"
    answer: "Die Angabe auf einem PC-Netzteil beschreibt die maximale Ausgangsleistung, die das Netzteil dauerhaft an die Komponenten liefern kann – nicht den ständigen Verbrauch. Im Office-Betrieb ziehen Prozessor und Grafikkarte oft nur rund 120 Watt. Unter Berücksichtigung des Netzteil-Wirkungsgrads (z. B. 88 Prozent) liegt die reale Leistungsaufnahme aus der Steckdose dann bei etwa 136 Watt."
  - question: "Wie hoch ist die maximale Leistung einer normalen 230-Volt-Haushaltssteckdose?"
    answer: "Ein mit 16 Ampere abgesicherter 230-Volt-Stromkreis liefert rechnerisch maximal 230 V × 16 A = 3.680 Watt (3,68 kW) Gesamtleistung für alle gemeinsam angeschlossenen Steckdosen. Für eine einzelne Schuko-Steckdose gilt aus Sicherheitsgründen jedoch die Empfehlung der Norm DIN VDE 0620-1, keine Dauerlast über etwa 10 bis 12 Ampere (ca. 2.300 bis 2.760 Watt) über Stunden hinweg zu betreiben, um eine Überhitzung der Federkontakte zu vermeiden."
  - question: "Was bedeutet der Leistungsfaktor cos φ auf dem Typenschild?"
    answer: "Der Leistungsfaktor cos φ gibt das Verhältnis von Wirkleistung P zu Scheinleistung S an (cos φ = P / S) und liegt zwischen 0 und 1. Ein Wert von 1,0 bedeutet, dass Strom und Spannung exakt phasengleich verlaufen und kein Blindstrom fließt. Moderne Schaltnetzteile erreichen dank aktiver Leistungsfaktorkorrektur (PFC) Werte von 0,95 bis 0,99, während ältere Asynchronmotoren oft bei 0,75 bis 0,85 liegen."
  - question: "Wie unterscheidet sich die elektrische Leistung (Watt) von der elektrischen Energie (kWh)?"
    answer: "Die Leistung in Watt beschreibt die momentane Arbeitsrate – also wie schnell Energie pro Sekunde umgesetzt wird (1 Watt = 1 Joule pro Sekunde). Die Energie in Kilowattstunden (kWh) entspricht dagegen dem Produkt aus Leistung und Betriebsdauer (E = P × t). Auf Ihrer Stromrechnung bezahlen Sie nicht die Anschlussleistung eines Geräts, sondern die über die Nutzungszeit bezogenen Kilowattstunden."
---

Die **elektrische Leistung** (Formelzeichen `P`, Einheit **Watt (W)**) misst, wie viel elektrische Energie pro Zeiteinheit in eine andere Energieform – etwa Wärme, Licht oder mechanische Bewegung – umgewandelt wird. Physikalisch entspricht `1 Watt` genau `1 Joule pro Sekunde` (`1 W = 1 J/s`) und im Gleichstromkreis dem Produkt aus `1 Volt` mal `1 Ampere`.

Das Verständnis der Leistungsberechnung entscheidet im Alltag wie in der professionellen Elektroplanung darüber, ob Sicherungen auslösen, Netzteile ausreichend Reserven besitzen und Leitungen thermisch sicher bleiben. Während eine LED-Lampe lediglich `10 W` umsetzt, fordert ein moderner Induktionsherd oder eine Wallbox `11.000 W` (`11 kW`). Mit unserem [Elektrische Leistung Rechner](/de/rechner/elektrische-leistung-rechner) lösen Sie das Wattsche Gesetz flexibel nach Leistung (`P`), Spannung (`U`) oder Stromstärke (`I`) auf.

## Das Wattsche Gesetz und alle abgeleiteten Leistungsformeln

Die zentrale Grundgleichung für Gleichstrom sowie für rein ohmsche Wechselstromverbraucher (Heizstäbe, klassische Glühlampen) lautet:

```text
P = U × I
```

Durch Einsetzen des Ohmschen Gesetzes (`U = I × R` bzw. `I = U / R`) entstehen zwei weitere äquivalente Gleichungen, die immer dann helfen, wenn entweder die Spannung oder die Stromstärke unbekannt ist:

```text
P = I² × R    und    P = U² / R
```

Aus `P = I² × R` wird sofort ersichtlich, warum sich die Verlustwärme auf einer Zuleitung vervierfacht, sobald sich der fließende Strom verdoppelt – genau deshalb wird elektrische Energie über Hochspannungsleitungen mit hoher Spannung und möglichst niedrigem Strom transportiert.

### Wechselstrom und Drehstrom: Wirk-, Schein- und Blindleistung

Im Wechselstromnetz (`230 V` / `50 Hz`) verschiebt sich bei Motoren, Transformatoren und ungeregelten Netzteilen die Phasenlage zwischen Strom und Spannung. Deshalb unterscheidet die Elektrotechnik drei Leistungsgrößen:
- **Wirkleistung `P` (in Watt, W):** `P = U × I × cos φ` (verrichtet die nutzbare Arbeit und wird vom Stromzähler erfasst)
- **Scheinleistung `S` (in Voltampere, VA):** `S = U × I` (belastet Leitungen, Transformatoren und Sicherungen)
- **Blindleistung `Q` (in Var, var):** `Q = U × I × sin φ` (pendelt zwischen Erzeuger und Verbraucher zum Auf- und Abbau von Magnetfeldern)

Bei **Dreiphasenwechselstrom (Drehstrom, `400 V`)** fließt die Leistung symmetrisch über drei Außenleiter. Die Wirkleistung ergibt sich mit dem Verkettungsfaktor `√3 ≈ 1,732` zu:

```text
P = √3 × U × I × cos φ
```

**Parameterdefinitionen:** `P` = Wirkleistung (`W`, `1 kW = 1.000 W`), `U` = Spannung (`V`), `I` = Stromstärke (`A`), `R` = Widerstand (`Ω`), `cos φ` = Leistungsfaktor (`0` bis `1`).

## Schritt-für-Schritt-Rechenbeispiel: Haushaltskreis und Wallbox

**Beispiel A: Überlastung eines 230-V-Steckdosenkreises prüfen**
Ein Küchenstromkreis ist mit einem `16-A`-Leitungsschutzschalter (Typ B16) bei `U = 230 V` abgesichert.
1. **Maximallast:** `P_max = 230 V × 16 A = 3.680 W = 3,68 kW`.
2. **Einzelströme:** Ein `2.000-W`-Wasserkocher zieht `I_1 = 2.000 W / 230 V = 8,70 A`, ein `1.800-W`-Haartrockner `I_2 = 1.800 W / 230 V = 7,83 A`.
3. **Gesamtbilanz:** Zusammen ergeben sich `3.800 W` bzw. `16,53 A` – der Sicherungsautomat löst thermisch aus.

**Beispiel B: Ladeleistung einer 400-V-Drehstrom-Wallbox**
Bei `I = 16 A` pro Phase, `U = 400 V` und `cos φ = 0,99` gilt: `P = 1,732 × 400 V × 16 A × 0,99 ≈ 10.974 W ≈ 11,0 kW`. In drei Stunden lädt das System brutto rund `33 kWh`.

## Leistungstabelle typischer Geräte im DACH-Haushalt

Die nachfolgende Übersicht vergleicht typische Nennleistungen, Betriebsspannungen und resultierende Stromstärken im europäischen Stromnetz:

| Gerät / Verbraucher | Typische Wirkleistung (`P`) | Netzspannung (`U`) | Resultierender Strom (`I`) | Technischer Hinweis |
| :--- | :--- | :--- | :--- | :--- |
| **LED-Leuchtmittel** | `10 W` | `230 V` AC | ca. `0,05 A` | Bei `cos φ ≈ 0,85`; Schaltnetzteil im Sockel |
| **Laptop-Netzteil (USB-C)** | `65 W` | `230 V` AC | ca. `0,31 A` | Primärstrom sinkt bei aktivem PFC (`cos φ ≈ 0,92`) |
| **Kühlschrank (Kompressor)** | `120 W` (Betrieb) | `230 V` AC | ca. `0,65 A` | Hoher Anlaufstrom beim Einschalten des Motors |
| **Wasserkocher** | `2.000 W` (`2,0 kW`) | `230 V` AC | `8,70 A` | Rein ohmsch (`cos φ = 1,0`); ideal für Kurzzeitbetrieb |
| **Waschmaschine (Heizphase)** | `2.200 W` (`2,2 kW`) | `230 V` AC | `9,57 A` | Maximallast nur während des Aufheizens |
| **Induktionsherd / Wallbox** | `11.000 W` (`11,0 kW`) | `400 V` 3-phasig | `16,0 A` pro Phase | Festanschluss erforderlich; nach § 14a EnWG steuerbar |

## Praxisanwendungen, Denkfehler und rechtliche Rahmenbedingungen

Bei der Planung elektrischer Anlagen und beim Gerätekauf führen drei häufige Missverständnisse zu Fehldimensionierungen:

1. **Verwechslung von Eingangs- und Ausgangsleistung (Wirkungsgrad):** Kein Wandler arbeitet verlustfrei. Der elektrische Wirkungsgrad `η` (Eta) beschreibt das Verhältnis von abgegebener Nutzleistung zu aufgenommener elektrischer Leistung (`η = P_ab / P_zu`). Ein Audioverstärker oder ein Ladegerät mit `100 W` Ausgangsleistung und `85 %` Wirkungsgrad zieht netzseitig `100 W / 0,85 = 117,6 W`; die Differenz von `17,6 W` geht als Abwärme verloren.
2. **Unterschätzte Blindleistung bei USV-Anlagen und Generatoren:** Notstromaggregate, Transformatoren und unterbrechungsfreie Stromversorgungen (USV) werden nach ihrer **Scheinleistung in VA** bemessen. Eine USV mit `1.000 VA` und einem internen Leistungsfaktor von `0,8` darf maximal mit `800 W` Wirkleistung belastet werden – rechnet man fälschlich 1:1 in Watt, schaltet die USV bei Lastspitzen ab.
3. **Dauerlastgrenzen und Regulierungen in Deutschland/DACH:** Nach **DIN VDE 0620-1** ist eine haushaltsübliche Schuko-Steckdose für `16 A` Prüfstrom über definierte Zeiträume ausgelegt, nicht jedoch für stundenlange Volllast mit `3,68 kW`. Bei Dauerverbrauchern wie mobilen E-Auto-Ladegeräten oder Heizlüftern begrenzt man den Strom dauerhaft auf `10 A` bis `12 A` (`2,3–2,76 kW`). Zudem gelten in Deutschland für steuerbare Verbrauchseinrichtungen über `4,2 kW` (z. B. Wallboxen, Wärmepumpen oder Batteriespeicher) gemäß **§ 14a EnWG** Anmelde- und Steuerbarkeitsvorgaben durch den Netzbetreiber.
