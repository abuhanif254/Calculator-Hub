---
title: "Das Zweite Newtonsche Gesetz: Kraft und Masse verstehen"
description: "Meistern Sie Newtons zweites Gesetz (F=ma). Lernen Sie den Unterschied zwischen Masse und Gewicht und nutzen Sie unseren Kraft-Rechner."
category: "Math & Science"
relatedCalculator: "force-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was genau besagt 1 Newton (N) anschaulich im Alltag?"
    answer: "Ein Newton ist die Kraft, die nötig ist, um eine Masse von 1 Kilogramm innerhalb von 1 Sekunde gleichmäßig auf 1 m/s zu beschleunigen (1 N = 1 kg·m/s²). Auf der Erdoberfläche entspricht 1 Newton nahezu exakt der Gewichtskraft einer Masse von 102 Gramm – also etwa der einer handelsüblichen Tafel Schokolade."
  - question: "Warum bleibt ein Auto auf der Autobahn bei konstant 130 km/h kräftefrei, obwohl der Motor arbeitet?"
    answer: "In Newtons Gleichung F = m × a steht F ausschließlich für die resultierende Gesamtkraft (Summe aller angreifenden Kräfte). Bei konstanter Geschwindigkeit (a = 0) hebt die Antriebskraft des Motors exakt die Summe aus Luftwiderstand und Rollreibung auf, sodass F_res = 0 N beträgt."
  - question: "Was ist der Unterschied zwischen Masse (kg) und Gewichtskraft (N)?"
    answer: "Die Masse misst die Menge an Materie und den Trägheitswiderstand eines Körpers; sie ist an jedem Ort des Universums konstant (z. B. 80 kg). Die Gewichtskraft dagegen ist die gravitative Anziehungskraft auf diese Masse (F_G = m × g) und beträgt für 80 kg auf der Erde rund 785 N, auf dem Mond jedoch nur etwa 130 N."
  - question: "Wann gilt die vereinfachte Formel F = m × a in der Physik nicht mehr direkt?"
    answer: "Immer dann, wenn sich die Masse des bewegten Systems während des Vorgangs verändert – etwa bei einer startenden Rakete, die pro Sekunde Tonnen an Treibstoff ausstößt –, muss die allgemeine Impulsform des zweiten Newtonschen Gesetzes verwendet werden: F = dp / dt = d(m × v) / dt. Bei Geschwindigkeiten nahe der Lichtgeschwindigkeit greift zudem die relativistische Dynamik."
  - question: "Warum ist der Faktor 9,81 m/s² beim Berechnen von Traglasten oder Zugkräften oft nicht ausreichend?"
    answer: "Die reine Gewichtskraft F_G = m × g beschreibt nur den statischen Ruhezustand. Sobald eine Last durch einen Kran oder Aufzug ruckartig angehoben wird, überlagert sich zur Gewichtskraft die dynamische Beschleunigungskraft F_dyn = m × a, weshalb Seile, Anker und Konstruktionen zusätzlich mit Sicherheitsbeiwerten ausgelegt werden."
---

Eine voll beladene Palette erfordert beim Anschieben ein Vielfaches an Muskel- oder Motorenkraft gegenüber einem leeren Rollwagen – genau diesen quantitativen Zusammenhang beschreibt **das Zweite Newtonsche Gesetz (Aktionsprinzip)**. Es verknüpft die auf einen Körper einwirkende resultierende Kraft (`F`) direkt proportional mit seiner trägen Masse (`m`) und der daraus entstehenden Beschleunigung (`a`).

Mit unserem [Kraft-Rechner](/de/rechner/kraftrechner) lösen Sie die Grundgleichung der klassischen Mechanik gezielt nach jeder der drei Größen auf: Ermitteln Sie aus Masse und gewünschter Beschleunigung die notwendige Kraft in Newton (`N`) oder Kilonewton (`kN`), oder bestimmen Sie umgekehrt Beschleunigung und Masse aus gemessenen Lastwerten. Das Prinzip trägt jede Berechnung in Maschinenbau, Statik, Fahrzeugdynamik und Luft- und Raumfahrt.

## Physikalische Grundlagen: Aktionsprinzip, Kraft und Trägheit

Isaac Newton formulierte 1687 in seinen *Principia* den fundamentalen Grundsatz der Dynamik: Eine Änderung der Bewegung ist der Einwirkung der bewegenden Kraft proportional und geschieht entlang der Geraden, in der jene Kraft wirkt.

### Resultierende Kraft statt Einzelkraft

Entscheidend für jede korrekte Anwendung ist, dass in der Formel nicht irgendeine einzelne Kraft steht, sondern stets die **Vektorsumme aller am Körper angreifenden Kräfte (`F_res = ΣF⃗`)**. Liegt ein schwerer Stahlblock ruhig auf einer Werkbank, wirkt seine Gewichtskraft nach unten – dennoch beschleunigt er nicht, weil die Werkbank eine gleich große Normalkraft nach oben ausübt. Beide Kräfte kompensieren einander zu `F_res = 0 N`.

### Masse versus Gewichtskraft

Im Alltag wird häufig vom „Gewicht in Kilogramm“ gesprochen; physikalisch handelt es sich um zwei grundverschiedene Größen:

- **Masse (`m` in `kg`):** Ein ortsunabhängiger Skalar, der sowohl die Stoffmenge als auch die **Trägheit** – also den Widerstand eines Körpers gegen jede Geschwindigkeitsänderung – angibt.
- **Gewichtskraft (`F_G` in `N`):** Ein nach unten gerichteter Vektor, mit dem ein Himmelskörper eine Masse anzieht (`F_G = m × g`). Während Ihre Masse auf der Erde, auf dem Mond und in der Schwerelosigkeit einer Raumstation exakt identisch bleibt, sinkt Ihre Gewichtskraft auf dem Mond auf rund ein Sechstel (`g_Mond ≈ 1,62 m/s²`), weil die örtliche Fallbeschleunigung geringer ausfällt.

## Die Gleichung `F = m × a` und ihre Parameter

In Systemen mit konstanter Masse lautet das Zweite Newtonsche Gesetz samt seinen beiden algebraischen Umstellungen:

```text
Kraft berechnen:           F = m × a
Beschleunigung berechnen:  a = F / m
Masse berechnen:           m = F / a
Gewichtskraft auf Erde:    F_G = m × g   (mit g_0 = 9,80665 m/s²)
```

Die zugehörigen SI-Größen lauten:

- **`F` (Kraft):** Gemessen in **Newton (`N`)**. Es gilt die abgeleitete Einheit `1 N = 1 kg × m/s²`. Große technische Kräfte werden üblicherweise in Kilonewton (`1 kN = 1.000 N`) oder Meganewton (`1 MN = 1.000.000 N`) angegeben.
- **`m` (Masse):** Gemessen in **Kilogramm (`kg`)**. Eingaben in Tonnen (`t`) oder Gramm (`g`) müssen vor der Berechnung umgerechnet werden (`1 t = 1.000 kg`, `1.000 g = 1 kg`).
- **`a` (Beschleunigung):** Gemessen in Metern pro Quadratsekunde (`m/s²`).

## Schritt-für-Schritt-Rechenbeispiel: Transporter unter Last

Ein voll beladener Lieferwagen mit einer Gesamtmasse von `m = 2.800 kg` soll auf einer ebenen Straße innerhalb von `8,0 s` gleichmäßig aus dem Stand auf `72 km/h` beschleunigen. Die gesamten Fahrwiderstände aus Rollreibung und Luftwiderstand wirken im betrachteten Geschwindigkeitsbereich im Mittel mit `F_W = 650 N` entgegen der Fahrtrichtung.

1. **Zielgeschwindigkeit in `m/s` umrechnen:** Teilen Sie `72 km/h` durch `3,6`, um `v_2 = 20,0 m/s` zu erhalten.
2. **Erforderliche Beschleunigung bestimmen:** Aus `a = (v_2 − v_1) / Δt` folgt `a = (20,0 m/s − 0 m/s) / 8,0 s = 2,50 m/s²`.
3. **Resultierende Beschleunigungskraft berechnen:** Wenden Sie das Zweite Newtonsche Gesetz an: `F_res = 2.800 kg × 2,50 m/s² = 7.000 N` (`7,0 kN`).
4. **Tatsächliche Antriebskraft am Rad ermitteln:** Da `F_res = F_Antrieb − F_W` gilt, muss der Antriebsstrang zusätzlich die Gegenkräfte überwinden: `F_Antrieb = 7.000 N + 650 N = 7.650 N` (`7,65 kN`).
5. **Vergleich mit der Gewichtskraft:** Die vertikale Gewichtskraft des beladenen Fahrzeugs beträgt `F_G = 2.800 kg × 9,81 m/s² = 27.468 N` (`27,47 kN`).

Das Beispiel verdeutlicht, warum zwischen der *resultierenden* Nettokraft (`7,00 kN`) für die reine Geschwindigkeitsänderung und der *realen Antriebskraft* (`7,65 kN`) inklusive Reibung unterschieden werden muss.

## Vergleichstabelle: Typische Kräfte in Alltag und Technik

Die folgende Tabelle setzt reale Kraftgrößen in Newton mit ihrer äquivalenten statischen Erdmasse (`m = F / 9,81 m/s²`) ins Verhältnis.

| Kraftquelle oder Belastungsfall | Kraft in `N` | Äquivalente Gewichtskraft-Masse auf der Erde | Technischer Anwendungsbereich |
| :--- | :--- | :--- | :--- |
| Gewichtskraft eines mittelgroßen Apfels | `1,0 N` | `0,102 kg` | Anschauliche Bezugsgröße der SI-Einheit Newton |
| Handkraft am Schraubenschlüssel | `150 bis 300 N` | `15,3 bis 30,6 kg` | Ergonomie, Montage und Drehmoment-Auslegung |
| Rückhaltekraft eines Sicherheitsgurts (75 kg bei 20 g) | `14.715 N` (`14,7 kN`) | `1.500 kg` | Fahrzeugsicherheit und Crashtest-Normung |
| Zugkraft einer modernen Elektrolokomotive (Anfahrt) | `300.000 N` (`300 kN`) | `30.581 kg` | Schienengüterverkehr und Kupplungsfestigkeit |
| Startschub eines Großraumjet-Triebwerks (GE90-Klasse) | `510.000 N` (`510 kN`) | `51.988 kg` | Zivile Luftfahrt und Triebwerksprüfstände |
| Gesamtschub der Ariane-5-Trägerrakete beim Abheben | `14.000.000 N` (`14 MN`) | `1.427 t` | Raumfahrttechnik zur Überwindung von Eigenmasse und Schwerkraft |

## Anwendungsfelder, typische Irrtümer und Modellgrenzen

In der **Konstruktion und Fördertechnik** dient `F = m × a` der Dimensionierung von Seilen, Bremsen und Antrieben. Hebt ein Kran eine `1.000 kg` schwere Last (`F_G = 9.810 N`) mit `2,0 m/s²` an, steigt die Seilzugkraft sofort auf `1.000 kg × (9,81 + 2,0) m/s² = 11.810 N` (`+20,4 %` gegenüber dem Stillstand).

Vermeiden Sie in der Praxis vier typische Denkfehler:

1. **Verwechslung von `kg` und `N`:** Angaben wie „eine Feder drückt mit 50 kg“ sind physikalisch falsch; korrekt sind `490,5 N` (`50 × 9,81`).
2. **Annahme, Bewegung brauche immer Kraft:** Nach dem Trägheitssatz erfordert gleichförmige Bewegung im Vakuum keine Kraft; Kraft ändert nur den Bewegungszustand.
3. **Fehlende Hangabtriebskraft:** Auf Steigungen wirkt zusätzlich `F_Hang = m × g × sin(α)` entgegen der Antriebskraft.
4. **Veränderliche Masse:** Bei Raketen mit Treibstoffausstoß gilt statt `m × a` die Impulsform `F = d(m × v) / dt`, nahe der Lichtgeschwindigkeit zudem die relativistische Dynamik.
