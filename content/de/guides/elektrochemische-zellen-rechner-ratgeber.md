---
title: "Elektrochemische Zellen-Rechner: Batterien erklärt"
description: "Lernen Sie, wie galvanische Zellen Strom erzeugen, wie man das Standardzellpotenzial berechnet, und nutzen Sie unseren Rechner."
category: "Math & Science"
relatedCalculator: "electrochemical-cell-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wie merkt man sich zuverlässig, wo Oxidation und wo Reduktion stattfindet?"
    answer: "Eine eindeutige Eselsbrücke lautet: Anode und Oxidation beginnen beide mit einem Vokal (Elektronenabgabe), während Kathode und Reduktion beide mit einem Konsonanten beginnen (Elektronenaufnahme). Dies gilt ausnahmslos für alle elektrochemischen Zellen — sowohl für Batterien beim Entladen (galvanische Zelle) als auch beim Laden oder bei der Elektrolyse (Elektrolysezelle)."
  - question: "Warum ändert sich die Polarität (+/−) von Anode und Kathode zwischen Batterie und Elektrolyse?"
    answer: "In einer galvanischen Zelle (Entladung) setzt die Anode spontan Elektronen frei und bildet daher den Minuspol (−), während die Kathode Elektronen verbraucht und den Pluspol (+) darstellt. Bei einer Elektrolysezelle oder beim Aufladen eines Akkus erzwingt eine äußere Spannungsquelle die umgekehrte Reaktionsrichtung: Die Anode wird an den Pluspol (+) und die Kathode an den Minuspol (−) gelegt."
  - question: "Darf man das Standardreduktionspotenzial E° verdoppeln, wenn man eine Halbreaktion mit 2 multipliziert?"
    answer: "Nein, keinesfalls. Das elektrische Potenzial in Volt ist eine intensive Größe (Energie pro Ladung, 1 V = 1 J/C), ähnlich wie die Temperatur oder Dichte. Verdoppelt man die Stoffmenge der Reaktion, verdoppeln sich zwar Energieumsatz (ΔG°) und übertragene Ladung (n × F) gleichermaßen, ihr Quotient E° = −ΔG° / (n × F) bleibt jedoch exakt konstant."
  - question: "Wozu dient die Salzbrücke (oder Membran) in einer galvanischen Zelle?"
    answer: "Während Elektronen durch den äußeren Metalldraht von der Anode zur Kathode fließen, würde sich ohne inneren Ladungsausgleich sofort ein elektrisches Gegenfeld aufbauen und der Stromfluss nach Sekundenbruchteilen abbrechen. Die Salzbrücke (gefüllt mit einem Inertsalz wie KCl oder KNO₃) oder ein poröser Separator ermöglicht die Wanderung von Kationen und Anionen zwischen den Halbzellen und schließt so den Stromkreis."
  - question: "Was sagt ein negatives Standardzellpotenzial E° über die Reaktion aus?"
    answer: "Ein negatives Standardzellpotenzial (E°_Zelle < 0) bedeutet, dass die freie Standardreaktionsenthalpie ΔG° positiv ist. Die Reaktion läuft in der notierten Richtung unter Standardbedingungen nicht freiwillig ab; stattdessen verläuft die Rückreaktion spontan. Um die notierte Reaktion dennoch zu erzwingen (wie bei der Wasserelektrolyse oder Aluminiumgewinnung), muss mindestens die Spannung |E°_Zelle| plus Überspannung von außen angelegt werden."
---

Jede Batterie, jeder Akkumulator und jede Brennstoffzelle trennt eine Redoxreaktion räumlich, sodass Elektronen gezwungen sind, ihren Weg über einen äußeren Stromkreis zu nehmen. Die dabei entstehende Potenzialdifferenz zwischen den beiden Halbzellen liefert die nutzbare elektrische Spannung in Volt.

Wie hoch diese Standardspannung ausfällt und ob eine Materialkombination freiwillig Strom erzeugt oder äußere Energiezufuhr benötigt, lässt sich aus tabellierten **Standardreduktionspotenzialen (`E°_red`)** exakt bestimmen. Mit unserem [Elektrochemische Zellen-Rechner](/de/rechner/elektrochemische-zelle-rechner) berechnen Sie `E°_Zelle`, ordnen Anode und Kathode eindeutig zu und prüfen die Spontanität Ihrer Reaktion.

## Funktionsprinzip: Galvanische Zelle, Halbzellen und Zellpotenzial

Eine **galvanische Zelle** gliedert die Redoxreaktion in zwei räumlich getrennte Halbzellen:

1. **Anode (Oxidation)**: Das unedlere Material gibt Elektronen ab (`Red₁ → Ox₁ + n e⁻`) und bildet beim Entladen den **Minuspol**.
2. **Kathode (Reduktion)**: Das edlere Material nimmt Elektronen auf (`Ox₂ + n e⁻ → Red₂`) und bildet beim Entladen den **Pluspol**.
3. **Salzbrücke oder Separator**: Im Elektrolyten wandern Kationen zur Kathode und Anionen zur Anode, um die Ladungsneutralität aufrechtzuerhalten.

Da alle Tabellenwerte der Spannungsreihe gegen die **Standardwasserstoffelektrode (SHE, `E° = 0,00 V` bei `25 °C`, `1 mol/L` H⁺, `1 bar` H₂)** als Reduktionspotenziale angegeben sind, gilt:

```text
E°_Zelle = E°_Kathode − E°_Anode
ΔG°      = −n × F × E°_Zelle
```

Parameterdefinitionen:

- **`E°_Kathode`**: Standardreduktionspotenzial der reduzierten Halbzelle in Volt (`V`).
- **`E°_Anode`**: Unverändertes Standardreduktionspotenzial (ohne Vorzeichenumkehr) der oxidierten Halbzelle in Volt (`V`).
- **`n`**: Zahl der ausgetauschten Mol Elektronen je Formelumsatz.
- **`F`**: Faraday-Konstante (`96.485 C/mol`).
- **`ΔG°`**: Freie Standardreaktionsenthalpie in `J/mol` (`1 C·V = 1 J`).

Bei **`E°_Zelle > 0`** ist **`ΔG° < 0`**, die Reaktion verläuft freiwillig (galvanisches Element). Bei **`E°_Zelle < 0`** ist **`ΔG° > 0`**, die Reaktion lässt sich nur erzwungen als **Elektrolysezelle** betreiben.

### Standardisierte IUPAC-Zellnotation und Zelltypen

In der IUPAC-Schreibweise steht die Anode stets links und die Kathode rechts; `|` markiert eine Phasengrenze zwischen Elektrode und Elektrolyt, `||` die Salzbrücke beziehungsweise Membran:

```text
Anode(s) | Anodenelektrolyt(aq) || Kathodenelektrolyt(aq) | Kathode(s)
```

Wichtig für Akkumulatoren ist die Unterscheidung zwischen Entlade- und Ladebetrieb: Beim **Entladen** arbeitet der Akku als galvanische Zelle (`E°_Zelle > 0`), die Anode ist der Minuspol und die Kathode der Pluspol. Beim **Aufladen** durch ein Ladegerät (Elektrolysebetrieb) kehren sich die chemischen Rollen von Oxidation und Reduktion an den beiden physischen Elektroden um — die bisherige Kathode wird zur Anode am Pluspol, die bisherige Anode zur Kathode am Minuspol.

## Durchgerechnetes Beispiel: Silber-Zink-Zelle

Silber-Zink-Systeme zeichnen sich durch stabile Spannung, geringen Innenwiderstand und hohe Energiedichte in Präzisionsuhren, Medizintechnik und Raumfahrt aus. Betrachten wir die Standardzelle `Zn(s) | Zn²⁺(aq) || Ag⁺(aq) | Ag(s)` bei `25 °C` (`298,15 K`):

- `Ag⁺(aq) + e⁻ → Ag(s)` mit `E° = +0,80 V`
- `Zn²⁺(aq) + 2 e⁻ → Zn(s)` mit `E° = −0,76 V`

1. **Zuordnung von Kathode und Anode**: Das positivere Standardreduktionspotenzial bildet die Kathode (`Ag⁺/Ag`, `+0,80 V`), das negativere die Anode (`Zn²⁺/Zn`, `−0,76 V`).
2. **Ausgeglichene Gesamtgleichung**: Um `n = 2` Elektronen auszugleichen, wird die Silber-Halbreaktion mit zwei multipliziert; `E°` bleibt als intensive Größe (Energie pro Ladung) jedoch unverändert:
   `Zn(s) + 2 Ag⁺(aq) → Zn²⁺(aq) + 2 Ag(s)`
3. **Standardzellpotenzial**:
   `E°_Zelle = E°_Kathode − E°_Anode = +0,80 V − (−0,76 V) = +1,56 V`
4. **Freie Standardreaktionsenthalpie**:
   `ΔG° = −n × F × E°_Zelle = −2 × 96.485 C/mol × 1,56 V = −301.033 J/mol ≈ −301,0 kJ/mol`

Mit `E°_Zelle = +1,56 V` und stark negativem `ΔG°` arbeitet die Zelle spontan als galvanisches Element und übertrifft das klassische Daniell-Element (`+1,10 V`) um `0,46 V`.

## Benchmark-Übersicht: Wichtige elektrochemische Zellsysteme

Die Tabelle vergleicht verbreitete Labor- und Industriezellen hinsichtlich Elektroden, Spannung und Energieumsatz:

| Zellsystem | Anode (Oxidation) | Kathode (Reduktion) | Zellspannung | n | ΔG° pro Umsatz | Anwendung |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Daniell-Element (`Zn / Cu`) | `Zn → Zn²⁺ + 2 e⁻` | `Cu²⁺ + 2 e⁻ → Cu` | `+1,10 V` | `2` | `−212,3 kJ/mol` | Referenz- und Lehrzelle |
| Silber-Zink (`Zn / Ag`) | `Zn → Zn²⁺ + 2 e⁻` | `2 Ag⁺ + 2 e⁻ → 2 Ag` | `+1,56 V` | `2` | `−301,0 kJ/mol` | Uhren, Hörgeräte, Raumfahrt |
| Blei-Akku (`Pb / PbO₂`) | `Pb + HSO₄⁻ → PbSO₄ + H⁺ + 2 e⁻` | `PbO₂ + 3 H⁺ + HSO₄⁻ + 2 e⁻ → PbSO₄ + 2 H₂O` | `+2,04 V` | `2` | `−393,7 kJ/mol` | `12-V`-Starterbatterie (6 Zellen) |
| H₂/O₂-Brennstoffzelle | `2 H₂ → 4 H⁺ + 4 e⁻` | `O₂ + 4 H⁺ + 4 e⁻ → 2 H₂O` | `+1,23 V` | `4` | `−474,7 kJ/mol` | Stationäre KWK, Antriebe |
| Lithium-Eisenphosphat (`LFP`) | `LiC₆ → 6 C + Li⁺ + e⁻` | `FePO₄ + Li⁺ + e⁻ → LiFePO₄` | `3,20–3,30 V` | `1` | ca. `−310 kJ/mol` | Heimspeicher, E-Mobilität |
| Wasserelektrolyse (sauer) | `2 H₂O → O₂ + 4 H⁺ + 4 e⁻` | `4 H⁺ + 4 e⁻ → 2 H₂` | `−1,23 V` | `4` | `+474,7 kJ/mol` | Grüner Wasserstoff |

## Praxisrelevanz, Korrosionsschutz und typische Rechenfehler

Über Batterien hinaus steuert die Spannungsreihe den **Korrosionsschutz**. Verbindet man Stahl (`Fe`, `−0,44 V`) leitend mit Magnesium (`−2,37 V`) oder Zink (`−0,76 V`), wirkt das unedlere Metall als **Opferanode** (`E°_Zelle > 0`) und schützt das Bauwerk kathodisch. Umgekehrt verursacht direkter Kontakt von Kupfer (`+0,34 V`) mit verzinktem Stahl schwere **Kontaktkorrosion**.

Beachten Sie bei der Berechnung vier häufige Fallstricke:

1. **Doppelte Vorzeichenumkehr**: In `E°_Kathode − E°_Anode` stehen beide Werte als Reduktionspotenziale. Wer das Anodenvorzeichen vorab dreht, muss anschließend addieren, niemals subtrahieren.
2. **Skalierung von `E°`**: Das Vervielfachen einer Halbreaktion zum Elektronenausgleich ändert `E°` nicht.
3. **Leerlauf- vs. Betriebsspannung**: Standardwerte gelten stromlos bei `25 °C` und `1 mol/L`. In realen Zellen verschieben Nernst-Einflüsse und kinetische Überspannungen — etwa `1,7–2,0 V` bei realer Wasserelektrolyse statt `1,23 V` — die Klemmenspannung erheblich.
4. **Kinetische Passivierung**: Aluminium (`−1,66 V`) ist thermodynamisch extrem unedel, bleibt durch seine dichte Oxidschicht (`Al₂O₃`) an Luft und Wasser jedoch kinetisch stabil.
