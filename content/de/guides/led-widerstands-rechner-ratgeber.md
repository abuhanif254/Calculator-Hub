---
title: "LED-Vorwiderstand: Bauteile schützen"
description: "Berechnen Sie den optimalen LED-Vorwiderstand samt Verlustleistung, E12/E24-Normwert und Reihenschaltung für sichere Elektronik- und Mikrocontroller-Schaltungen mit dem LED-Widerstands-Rechner."
category: "Math & Science"
relatedCalculator: "led-resistor-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum brennt eine LED ohne Vorwiderstand an einer Batterie sofort durch?"
    answer: "Eine Leuchtdiode besitzt keinen konstanten ohmschen Widerstand, sondern eine exponentielle Strom-Spannungs-Kennlinie. Sobald die Versorgungsspannung die Durchlassspannung (Vf, meist 1,8 V bis 3,4 V) auch nur leicht überschreitet, steigt der Strom lawinenartig an. Eine 9-V-Batterie treibt dann ein Vielfaches des zulässigen Stroms durch den Halbleiterkristall und zerstört ihn innerhalb von Millisekunden thermisch."
  - question: "Welchen Standard-Widerstandswert aus der E-Reihe sollte man wählen, wenn der berechnete Wert nicht existiert?"
    answer: "Wählen Sie grundsätzlich den nächsthöheren verfügbaren Normwert aus der E12- oder E24-Reihe. Ein leicht höherer Widerstand reduziert den Durchlassstrom geringfügig, ohne die sichtbare Helligkeit merklich zu mindern, und erhöht gleichzeitig die Lebensdauer der LED. Ein Abrunden auf den nächstkleineren Wert kann dagegen bei Spannungsspitzen den Maximalstrom überschreiten."
  - question: "Darf man mehrere LEDs parallel an einem einzigen gemeinsamen Vorwiderstand betreiben?"
    answer: "Nein, davon ist dringend abzuraten. Durch fertigungsbedingte Toleranzen der Durchlassspannung zieht die LED mit der niedrigsten Flussspannung einen überproportional großen Stromanteil an sich. Dadurch erwärmt sie sich stärker, ihre Durchlassspannung sinkt aufgrund des negativen Temperaturkoeffizienten weiter und sie fällt durch thermisches Durchgehen aus – gefolgt von den übrigen LEDs. Jede parallele LED benötigt einen eigenen Vorwiderstand."
  - question: "Wie wähle ich die passende Leistungsbelastbarkeit (Wattzahl) für den Vorwiderstand?"
    answer: "Berechnen Sie zunächst die reale Verlustleistung P_R = (U_0 − U_F) × I_F und multiplizieren Sie diesen Wert als Sicherheitsfaktor mindestens mit 2. Liegt P_R beispielsweise bei 0,18 W, ist ein klassischer 0,25-W-Widerstand bereits zu stark ausgelastet und wird sehr heiß; wählen Sie in diesem Fall mindestens einen 0,5-W- oder 0,6-W-Widerstand."
  - question: "Was ist beim Anschluss von LEDs an Arduino-, Raspberry-Pi- oder ESP32-Pins zu beachten?"
    answer: "Die digitalen Ausgangspins von Mikrocontrollern dürfen nur begrenzt belastet werden: Beim klassischen Arduino Uno (5 V) liegt das empfohlene Dauerlimit bei maximal 20 mA pro Pin, bei modernen 3,3-V-Boards wie ESP32 oder Raspberry Pi oft bei nur 12 mA bzw. 16 mA. Dimensionieren Sie den Vorwiderstand für Status-LEDs an Logikpins am besten auf 5 mA bis 10 mA, um den Controller nicht zu überlasten."
---

Eine Leuchtdiode (LED) ist ein Halbleiterbauteil mit nichtlinearer Kennlinie und darf niemals direkt an eine Spannungsquelle wie eine Batterie oder ein Labornetzteil angeschlossen werden. Oberhalb ihrer materialabhängigen **Durchlassspannung (`U_F`)** fällt ihr differentieller Innenwiderstand extrem stark ab, sodass bereits kleine Spannungsüberschüsse zu einem unkontrollierten Stromanstieg führen und den Halbleiterchip sofort zerstören. Ein in Reihe geschalteter **Vorwiderstand** übernimmt die überschüssige Spannungsdifferenz und begrenzt den Strom exakt auf den zulässigen Betriebswert.

Für die sichere Dimensionierung müssen sowohl der Widerstandswert in Ohm als auch die thermische Verlustleistung am Widerstand bestimmt werden. Mit unserem [LED-Widerstands-Rechner](/de/rechner/led-widerstand-rechner) ermitteln Sie den exakten Vorwiderstand für Einzel- und Reihenschaltungen sowie die passende Leistungsstufe in Sekunden.

## Elektrotechnische Grundlagen: Kennlinie, Formeln und E-Reihen

### Die Bemessungsgleichung für Einzel- und Reihenschaltungen

Befindet sich eine LED (oder eine Reihenschaltung aus `n` identischen LEDs) gemeinsam mit einem Vorwiderstand `R` an einer Gleichspannungsquelle `U_0`, gilt nach der Maschenregel und dem Ohmschen Gesetz:

```text
R = (U_0 − n × U_F) / I_F
```

Für die im Widerstand in Wärme umgewandelte elektrische Verlustleistung `P_R` gilt:

```text
P_R = (U_0 − n × U_F) × I_F = I_F² × R
```

Die Parameter der Berechnung im Überblick:

- **`U_0` (V):** Stabilisierte Versorgungsspannung (z. B. `5,0 V` USB, `9,0 V` Blockbatterie, `12,0 V` Netzteil).
- **`U_F` (V):** Durchlassspannung (englisch *Forward Voltage*) einer LED bei Nennstrom, abhängig vom Halbleitermaterial (`~1,8–2,1 V` bei Rot bis `~3,0–3,4 V` bei Blau und Weiß).
- **`n`:** Anzahl in Reihe geschalteter LEDs. Es muss `n × U_F < U_0` gelten; idealerweise verbleiben mindestens `15–20 %` von `U_0` am Widerstand.
- **`I_F` (A):** Gewünschter Durchlassstrom (`20 mA = 0,020 A` Standard; `2–5 mA` bei Low-Current-LEDs).

### Auswahl nach IEC-60063-Normreihe und Leistungsreserve

Widerstände werden in Vorzugsreihen nach **IEC 60063** gefertigt (`E12` mit `100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820 Ω` oder feinere `E24`-Reihe). Runden Sie das Ergebnis stets auf den **nächsthöheren Normwert** auf und wählen Sie eine Nennbelastbarkeit von mindestens `2 × P_R`, damit das Bauteil thermisch stabil bleibt.

## Rechenbeispiel: 12-V-Netzteil als Einzel- und Reihenschaltung

Betrieben werden rote 5-mm-Standard-LEDs (`U_F = 2,0 V`, `I_F = 20 mA = 0,020 A`) an einem stabilisierten `12,0-V`-Netzteil.

### Fall A: Eine einzelne LED an 12 V

1. **Spannung am Vorwiderstand:** `U_R = 12,0 V − 2,0 V = 10,0 V`.
2. **Widerstandswert berechnen:** `R = 10,0 V / 0,020 A = 500 Ω`.
3. **Normwert wählen:** In `E24` ist `510 Ω` der nächsthöhere Wert (`E12`: `560 Ω`). Mit `510 Ω` fließen `I_F = 10,0 V / 510 Ω = 19,61 mA`.
4. **Verlustleistung prüfen:** `P_R = 10,0 V × 0,01961 A = 0,196 W`. Da ein `0,25-W`-Widerstand hier zu `78 %` ausgelastet wäre, empfiehlt sich mindestens ein `0,5-W`-Typ.

### Fall B: Drei rote LEDs in Reihe an 12 V

Bei drei LEDs in Reihe (`n = 3`) summiert sich die Flussspannung auf `3 × 2,0 V = 6,0 V`:

1. **Restspannung am Widerstand:** `U_R = 12,0 V − 6,0 V = 6,0 V`.
2. **Vorwiderstand berechnen:** `R = 6,0 V / 0,020 A = 300 Ω` (`E24` exakt `300 Ω`, `E12` `330 Ω`).
3. **Verlustleistung berechnen:** `P_R = 6,0 V × 0,020 A = 0,120 W` — hier genügt ein `0,25-W`-Widerstand zuverlässig.

Bei gleichem Gesamtstrom (`20 mA`) leuchten somit drei LEDs statt einer, während die Abwärme am Widerstand um fast `40 %` sinkt.

## Richtwerte nach LED-Farbe und Versorgungsspannung

Die Tabelle zeigt typische Durchlassspannungen (`U_F`) und berechnete Vorwiderstände für `I_F = 20 mA`:

| LED-Farbe / Typ | Halbleiter | Typische `U_F` | Widerstand `5 V` | Widerstand `12 V` | E24-Normwert (`12 V`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Infrarot (940 nm) | GaAs / AlGaAs | `1,3 V` | `185 Ω` | `535 Ω` | `560 Ω` (`0,5 W`) |
| Rot (Standard) | GaAsP / AlGaInP | `2,0 V` | `150 Ω` | `500 Ω` | `510 Ω` (`0,5 W`) |
| Gelb / Bernstein | GaAsP / AlGaInP | `2,1 V` | `145 Ω` | `495 Ω` | `510 Ω` (`0,5 W`) |
| Grün (klassisch) | GaP | `2,2 V` | `140 Ω` | `490 Ω` | `510 Ω` (`0,5 W`) |
| Smaragdgrün | InGaN | `3,2 V` | `90 Ω` | `440 Ω` | `470 Ω` (`0,5 W`) |
| Blau & Weiß | InGaN (+ Phosphor) | `3,2 V` | `90 Ω` | `440 Ω` | `470 Ω` (`0,5 W`) |

## Typische Schaltungsfehler, Kfz-Bordnetz und Konstantstromquellen

### Schwankende Versorgungsspannungen im Fahrzeug und an Batterien

Im Kfz-Bereich liefert eine „12-V-Batterie“ im Ruhezustand `12,6 V`, bei laufender Lichtmaschine jedoch **`13,8 V` bis `14,4 V`**. Ein knapp auf `12,0 V` gerechneter Widerstand lässt den LED-Strom bei `14,4 V` stark ansteigen und gefährdet besonders Reihenschaltungen mit kleiner Restspannung `U_R`. Dimensionieren Sie Fahrzeugschaltungen deshalb stets für `U_0 = 14,4 V` (und volle `3S`-Li-Ion-Akkus für `12,6 V`).

### Verpolungsschutz und Konstantstromquellen (KSQ)

LEDs vertragen meist nur eine maximale Sperrspannung von **`U_R,max = 5 V`**. An Wechselspannung schlägt eine ungeschützte LED in der negativen Halbwelle durch; eine antiparallel geschaltete Diode (z. B. `1N4148`) verhindert dies sicher. Bei **High-Power-LEDs** ab `350 mA` (`1 W` und mehr) oder stark schwankender Batteriespannung stößt ein Vorwiderstand an thermische Grenzen – hier ist ein getakteter Konstantstromtreiber (KSQ) mit über `90 %` Wirkungsgrad erforderlich.
