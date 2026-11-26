---
title: "Impuls verstehen: Die Physik von Kollisionen"
description: "Impuls, Kraftstoß und Impulserhaltungssatz fundiert erklärt: Elastische und unelastische Stöße, Rechenbeispiele, Vergleichstabelle und der Impuls-Rechner."
category: "Math & Science"
relatedCalculator: "momentum-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen Impuls und kinetischer Energie?"
    answer: "Der Impuls (p = m × v) ist eine vektorielle Größe, die linear von Masse und Geschwindigkeit abhängt und eine Richtung besitzt. Die kinetische Energie (E_kin = ½ × m × v²) ist ein Skalar ohne Richtung, bei dem die Geschwindigkeit quadratisch eingeht. Bei jedem Stoß in einem abgeschlossenen System bleibt der Gesamtimpuls exakt erhalten, während kinetische Energie in Wärme oder Verformung umgewandelt werden kann."
  - question: "Warum verhindert eine Knautschzone beim Auto schwere Verletzungen?"
    answer: "Bei einem Aufprall muss der Impuls des Fahrzeugs innerhalb kurzer Zeit auf null abgebaut werden – der erforderliche Kraftstoß (Δp = F × Δt) liegt somit fest. Eine Knautschzone verlängert die Brems- bzw. Verformungszeit Δt um ein Vielfaches. Da Kraft und Zeitdauer umgekehrt proportional sind, sinkt die auf die Insassen wirkende mittlere Stoßkraft F im selben Verhältnis."
  - question: "Kann ein Körper ohne Masse – wie ein Photon – einen Impuls besitzen?"
    answer: "Ja. In der klassischen Mechanik gilt p = m × v, doch gemäß der speziellen Relativitätstheorie tragen auch masselose Lichtteilchen (Photonen) einen Impuls, der über p = E / c = h / λ mit ihrer Energie und Wellenlänge verknüpft ist. Auf diesem Prinzip beruht unter anderem der Strahlungsdruck von Sonnensegeln in der Raumfahrt."
  - question: "Wann spricht man von einem vollkommen elastischen, wann von einem plastischen Stoß?"
    answer: "Bei einem vollkommen elastischen Stoß (Stoßzahl e = 1) bleiben sowohl der Gesamtimpuls als auch die gesamte kinetische Energie erhalten, weil sich die Körper nach dem Kontakt verlustfrei wieder voneinander lösen. Bei einem vollkommen unelastischen oder plastischen Stoß (Stoßzahl e = 0) haften beide Körper nach dem Zusammenprall aneinander und bewegen sich mit gemeinsamer Geschwindigkeit weiter, wobei der maximal mögliche Anteil an Bewegungsenergie verloren geht."
  - question: "Warum bleibt der Impuls auch dann erhalten, wenn zwei Autos völlig verformt werden?"
    answer: "Der Impulserhaltungssatz folgt direkt aus dem dritten Newtonschen Gesetz (Actio gleich Reactio): Während der Kollision üben beide Fahrzeuge in jedem Augenblick exakt gleich große, aber entgegengesetzt gerichtete Kräfte aufeinander aus. Die inneren Kräfte heben sich für das Gesamtsystem vollständig auf, sodass sich die Summe der Impulse beider Fahrzeuge ohne äußere Reibung niemals ändert."
---

Der mechanische **Impuls** (Formelzeichen `p`) quantifiziert die Bewegungsmenge eines Körpers als Produkt aus seiner trägen Masse `m` und seiner Geschwindigkeit `v`. Als vektorielle Erhaltungsgröße besitzt der Impuls sowohl einen Betrag als auch eine eindeutige Richtung im Raum und wird im Internationalen Einheitensystem (SI) in Kilogramm-Meter pro Sekunde (`kg·m/s`) oder äquivalent in Newtonsekunden (`N·s`) angegeben.

Das zentrale Gesetz der Kollisionsphysik ist der **Impulserhaltungssatz**: In jedem mechanisch abgeschlossenen System, auf das keine resultierenden äußeren Kräfte wirken, bleibt die Vektorsumme aller Einzelimpulse vor, während und nach einem Zusammenstoß unverändert. Ob zwei Billardkugeln abprallen, Güterwagen ankuppeln oder Raketentriebwerke Stützmasse ausstoßen – mit unserem [Impuls-Rechner](/de/rechner/impulsrechner) ermitteln Sie aus Masse, Geschwindigkeit und Impuls unmittelbar die jeweils gesuchte Größe.

## Grundformeln: Impuls, Kraftstoß und Stoßgesetze

Die Dynamik bewegter Körper und ihrer Wechselwirkungen bei Kollisionen lässt sich auf vier kompakte Grundgleichungen zurückführen:

```text
Linearer Impuls:      p = m × v
Kraftstoß:            J = Δp = F_mittel × Δt = m × (v_nach − v_vor)
Impulserhaltung (1D): m_1 × v_1 + m_2 × v_2 = m_1 × v_1' + m_2 × v_2'

Elastischer Stoß:     v_1' = [(m_1 − m_2) × v_1 + 2 × m_2 × v_2] / (m_1 + m_2)
                      v_2' = [(m_2 − m_1) × v_2 + 2 × m_1 × v_1] / (m_1 + m_2)

Plastischer Stoß:     v_gem = (m_1 × v_1 + m_2 × v_2) / (m_1 + m_2)
Stoßzahl (Restitution): e = |v_2' − v_1'| / |v_1 − v_2|
```

Die Variablen definieren folgende physikalische Zusammenhänge:

- **`p` (Impuls in `kg·m/s` oder `N·s`):** Bewegungszustand eines Körpers. Da die Geschwindigkeit ein Vektor ist, erhalten entgegengesetzte Bewegungsrichtungen entlang einer Achse entgegengesetzte Vorzeichen (`+` und `−`).
- **`J` / `Δp` (Kraftstoß in `N·s`):** Das Produkt aus mittlerer einwirkender Kraft `F_mittel` und Einwirkdauer `Δt` entspricht exakt der verursachten Impulsänderung.
- **`v_1, v_2` und `v_1', v_2'` (Geschwindigkeiten in `m/s`):** Geschwindigkeiten der beiden Stoßpartner unmittelbar vor (`v`) und nach (`v'`) der Kollision.
- **`e` (Stoßzahl):** Dimensionsloser Kennwert für die Elastizität eines Stoßes. Bei `e = 1` liegt ein ideal elastischer Stoß vor, bei `e = 0` ein vollkommen plastischer Stoß und bei `0 < e < 1` ein realer teilelastischer Stoß.

## Schritt-für-Schritt-Rechenbeispiel: Plastischer Rangierstoß

Ein rollender Güterwagen (`m_1 = 12.000 kg`) fährt mit `v_1 = 4,0 m/s` (`14,4 km/h`) auf einen stehenden zweiten Güterwagen (`m_2 = 8.000 kg`, `v_2 = 0 m/s`) auf. Beide Wagen kuppeln automatisch ein, sodass ein vollkommen unelastischer (plastischer) Stoß vorliegt. Der Kontaktvorgang der Kupplung dauert `Δt = 0,25 s`.

1. **Gesamtimpuls vor dem Zusammenstoß berechnen:**
   `p_vor = m_1 × v_1 + m_2 × v_2 = 12.000 kg × 4,0 m/s + 8.000 kg × 0 m/s = 48.000 kg·m/s`
2. **Gemeinsame Endgeschwindigkeit nach dem Ankuppeln ermitteln:**
   Da `p_nach = p_vor` gilt, teilt sich der Gesamtimpuls auf die Gesamtmasse (`20.000 kg`) auf:
   `v_gem = 48.000 kg·m/s / (12.000 kg + 8.000 kg) = 2,40 m/s` (`8,64 km/h`)
3. **Verlust an kinetischer Energie prüfen:**
   `E_kin,vor = ½ × 12.000 kg × (4,0 m/s)² = 96.000 J = 96,0 kJ`
   `E_kin,nach = ½ × 20.000 kg × (2,40 m/s)² = 57.600 J = 57,6 kJ`
   `ΔE_kin = 96,0 kJ − 57,6 kJ = 38,4 kJ`
4. **Mittlere Stoßkraft auf den stehenden Wagen bestimmen:**
   Der zweite Wagen erfährt eine Impulsänderung von `Δp_2 = 8.000 kg × 2,40 m/s = 19.200 N·s`.
   `F_mittel = Δp_2 / Δt = 19.200 N·s / 0,25 s = 76.800 N = 76,8 kN`

Obwohl exakt `40,0 %` der ursprünglichen Bewegungsenergie durch Dämpfer, Verformung und Wärme umgewandelt werden, bleibt der Gesamtimpuls von `48.000 kg·m/s` vollständig erhalten.

## Vergleichstabelle: Impuls und kinetische Energie im Alltag

Die Gegenüberstellung verdeutlicht, warum Masse und Geschwindigkeit bei Impuls und Energie unterschiedlich gewichtet sind – eine sehr schnelle Gewehrkugel besitzt mehr Energie als ein Tennisball, aber weitaus weniger Impuls als ein laufender Mensch:

| Objekt / Szenario | Masse `m` | Geschwindigkeit `v` | Impuls `p` (`kg·m/s`) | Kinetische Energie `E_kin` (`J`) |
| :--- | :--- | :--- | :--- | :--- |
| Gewehrkugel (Kaliber .308) | `0,010 kg` | `800 m/s` (`2.880 km/h`) | `8,0` | `3.200` |
| Aufschlag-Tennisball | `0,058 kg` | `50,0 m/s` (`180 km/h`) | `2,9` | `72,5` |
| 100-m-Sprinter im Ziel | `80,0 kg` | `10,0 m/s` (`36 km/h`) | `800,0` | `4.000` |
| Mittelklasse-PKW (Innerorts) | `1.500 kg` | `13,89 m/s` (`50 km/h`) | `20.833` | `144.676` |
| Mittelklasse-PKW (Landstraße) | `1.500 kg` | `27,78 m/s` (`100 km/h`) | `41.667` | `578.704` |
| Güterzug (Vollbeladung) | `2.000.000 kg` | `20,0 m/s` (`72 km/h`) | `40.000.000` | `400.000.000` |

Beim Vergleich der beiden PKW-Zeilen zeigt sich ein zentrales Sicherheitsprinzip: Verdoppelt sich die Fahrgeschwindigkeit von `50 km/h` auf `100 km/h`, verdoppelt sich zwar der Impuls (`20.833` auf `41.667 kg·m/s`), die abzubauende Zerstörungs- und Bremsenergie vervierfacht sich jedoch auf `578,7 kJ`.

## Praxisanwendungen, Fehlerquellen und physikalische Grenzen

Das Impulsprinzip bildet das Fundament für die Unfallrekonstruktion im Straßenverkehr, die Auslegung von Pralldämpfern und Airbags, die Werkstoffprüfung (Kerbschlagbiegeversuch) sowie die Antriebstechnik von Düsentriebwerken und Raumfahrzeugen. Eine Rakete im Vakuum benötigt keinen „Gegendruck“ der Luft: Sie beschleunigt Verbrennungsgase mit hoher Austrittsgeschwindigkeit nach hinten und erhält dadurch gemäß der Impulserhaltung exakt denselben Vorwärtsimpuls.

Bei der praktischen Anwendung entstehen Rechenfehler vor allem aus drei Ursachen:

- **Fehlende Vorzeichenkonvention:** Bewegen sich zwei Körper frontal aufeinander zu, muss eine Richtung zwingend negativ angesetzt werden (`v_2 < 0`). Werden nur Beträge addiert, ergibt die Gleichung physikalisch unmögliche Werte.
- **Verwechslung von Impuls und Energieerhaltung:** Im Gegensatz zum Impuls gilt der Erhaltungssatz der mechanischen kinetischen Energie ausschließlich beim ideal elastischen Stoß.
- **Vernachlässigung äußerer Kräfte:** Sobald während des Stoßes starke äußere Kräfte wie Blockierbremsungen auf Asphalt oder Verankerungen wirken, ist das System nur über extrem kurze Zeitspannen (`Δt → 0`) als abgeschlossen anzusehen.

Zudem gilt `p = m × v` nur im nicht-relativistischen Geschwindigkeitsbereich weit unterhalb der Lichtgeschwindigkeit (`c ≈ 300.000 km/s`). Bei Elementarteilchen in Beschleunigern greift der relativistische Impuls `p = γ × m × v` mit dem Lorentzfaktor `γ = 1 / √(1 − v² / c²)`. Ebenso muss bei schrägen zweidimensionalen Stößen (etwa beim Billard oder bei Kreuzungskollisionen im Straßenverkehr) die vektorielle Impulserhaltung stets getrennt für die horizontale x- und die vertikale y-Achse angesetzt werden, da sich beide Raumrichtungen unabhängig überlagern.
