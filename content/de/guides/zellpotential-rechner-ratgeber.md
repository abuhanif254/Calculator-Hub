---
title: "Zellpotential Rechner: Spontane Redoxreaktionen vorhersagen"
description: "Lernen Sie, wie das Standardzellpotential aus Halbzellenpotentialen berechnet wird, wie es mit der freien Reaktionsenthalpie ΔG° zusammenhängt und wann die Nernst-Gleichung erforderlich ist."
category: "Math & Science"
relatedCalculator: "cell-potential-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum wird das Standardreduktionspotential beim Ausgleichen einer Redoxgleichung nicht multipliziert?"
    answer: "Das Elektrodenpotential E° ist eine intensive Größe (Energie pro Ladungseinheit: 1 V = 1 J/C), ähnlich wie die Temperatur oder die Dichte. Verdoppelt man die Stoffmenge einer Halbreaktion – etwa 2 Ag⁺ + 2 e⁻ → 2 Ag –, verdoppeln sich zwar sowohl die übertragene Ladung als auch die umgesetzte Energie, ihr Quotient bleibt jedoch exakt gleich. E°(+0,80 V) wird daher niemals mit dem Koeffizienten 2 multipliziert."
  - question: "Wann ist die Formel E°_Zelle = E°_Kathode − E°_Anode korrekt und warum entstehen oft Vorzeichenfehler?"
    answer: "Die Subtraktionsformel setzt voraus, dass Sie für beide Elektroden die tabellierten Standardreduktionspotentiale aus der elektrochemischen Spannungsreihe unverändert einsetzen. Durch das Minuszeichen vor E°_Anode wird die Oxidation an der Anode mathematisch bereits umgekehrt. Kehren Sie das Vorzeichen des Anodenpotentials vorab von Hand um und subtrahieren trotzdem, entsteht eine doppelte Negation mit falschem Ergebnis."
  - question: "Bedeutet ein positives Zellpotential automatisch, dass eine Reaktion sofort schnell abläuft?"
    answer: "Nein. Ein positives Zellpotential (E°_Zelle > 0) und die daraus folgende negative freie Reaktionsenthalpie (ΔG° < 0) zeigen lediglich an, dass die Reaktion thermodynamisch freiwillig möglich ist. Über die Reaktionsgeschwindigkeit entscheidet jedoch die Kinetik (Aktivierungsenergie bzw. Überspannung). Viele Reaktionen mit hohem positivem Potential bleiben ohne Katalysator kinetisch gehemmt."
  - question: "Wie verändert sich das Zellpotential, wenn die Konzentrationen von 1 mol/L abweichen?"
    answer: "Standardpotentiale gelten strikt bei 25 °C (298,15 K), 101,325 kPa Gasdruck und einer Ionenaktivität bzw. -konzentration von 1 mol/L. Sinkt beispielsweise im Verlauf der Entladung die Konzentration der Edukt-Ionen an der Kathode und steigt sie an der Anode, nimmt das reale Zellpotential gemäß der Nernst-Gleichung ab, bis bei Erreichen des chemischen Gleichgewichts E_Zelle = 0 V gilt."
  - question: "Welche Rolle spielt die Standardwasserstoffelektrode (SHE) in der Elektrochemie?"
    answer: "Einzelne Halbzellenpotentiale lassen sich nicht absolut messen, da für einen Stromkreis immer zwei Elektroden nötig sind. Als internationaler Nullpunkt wurde daher die Standardwasserstoffelektrode (2 H⁺ + 2 e⁻ ⇌ H₂ bei pH 0, 101,325 kPa H₂ und 25 °C) definiert und per Konvention exakt auf E° = 0,00 V festgelegt. Alle Tabellenwerte geben die Spannung gegen diese Referenzelektrode an."
---

Das **Standardzellpotential** (`E°_Zelle`) gibt an, welche elektrische Leerlaufspannung eine galvanische Zelle unter Normbedingungen erzeugt und ob eine Redoxreaktion thermodynamisch **spontan** abläuft. Ergibt die Differenz aus dem Reduktionspotential der Kathode und dem Reduktionspotential der Anode einen positiven Wert (`E°_Zelle > 0 V`), wandern Elektronen freiwillig von der Anode zur Kathode – die Zelle liefert elektrische Energie wie eine Batterie. Ist das berechnete Zellpotential negativ (`E°_Zelle < 0 V`), erfordert der Stoffumsatz die Zufuhr externer elektrischer Energie, wie es bei der **Elektrolyse** oder beim Aufladen eines Akkumulators der Fall ist.

Die zentrale Berechnungsgrundlage nutzt die Werte der elektrochemischen Spannungsreihe gemäß `E°_Zelle = E°_Kathode − E°_Anode`. Für schnelle Auswertungen beliebiger Halbzellenkombinationen steht Ihnen unser [Zellpotential Rechner](/de/rechner/zellpotenzial-rechner) zur Verfügung.

## Elektrochemische Grundlagen: Standardpotentiale und Thermodynamik

### Definition von Kathode, Anode und Spannungsreihe

In jeder elektrochemischen Zelle laufen zwei räumlich getrennte Teilprozesse ab:

- **Kathode (Reduktion):** Die Elektrode, an der Elektronen aufgenommen werden. In einer spontan arbeitenden galvanischen Zelle besitzt die Kathode das **positivere (edlere) Standardreduktionspotential** und bildet den Pluspol.
- **Anode (Oxidation):** Die Elektrode, an der Elektronen abgegeben werden. Sie besitzt das **negativere (unedlere) Standardreduktionspotential** und bildet bei galvanischen Zellen den Minuspol.

Alle Tabellenwerke der elektrochemischen Spannungsreihe notieren Halbreaktionen einheitlich als **Reduktion** (`Ox + z e⁻ ⇌ Red`) bei Standardbedingungen (`T = 298,15 K` bzw. `25 °C`, Konzentration/Aktivität `c = 1 mol/L`, Gaspartialdruck `p = 101,325 kPa`), bezogen auf die Standardwasserstoffelektrode (`E° = 0,00 V`). Mit diesen unveränderten Tabellenwerten gilt:

```text
E°_Zelle = E°_Kathode − E°_Anode
```

### Verknüpfung mit der freien Reaktionsenthalpie ΔG°

Das Zellpotential steht über die **Faraday-Konstante** (`F = 96.485 C/mol`) direkt mit der maximal nutzbaren elektrischen Arbeit und der freien Standardreaktionsenthalpie `ΔG°` in Verbindung:

```text
ΔG° = −n × F × E°_Zelle
```

Hierbei bezeichnet `n` die Stoffmenge der in der ausgeglichenen Gesamtgleichung übertragenen Elektronen (in `mol`). Ein positives Zellpotential `E°_Zelle > 0` führt zwingend zu `ΔG° < 0` und belegt damit die thermodynamische Spontaneität (exergonischer Prozess). Bei `E°_Zelle = 0 V` herrscht chemisches Gleichgewicht.

## Schritt-für-Schritt-Rechenbeispiel: Das Daniell-Element

Das klassische **Daniell-Element** kombiniert eine Zink-Halbzelle mit einer Kupfer-Halbzelle, getrennt durch eine Ionenbrücke bzw. ein Diaphragma (`Zn | Zn²⁺ (1 mol/L) || Cu²⁺ (1 mol/L) | Cu`) bei `25 °C`.

1. **Standardreduktionspotentiale aus der Spannungsreihe ablesen:**
   - `Cu²⁺ + 2 e⁻ ⇌ Cu` mit `E°(Cu²⁺/Cu) = +0,34 V`
   - `Zn²⁺ + 2 e⁻ ⇌ Zn` mit `E°(Zn²⁺/Zn) = −0,76 V`
2. **Kathode und Anode für eine spontane Zelle identifizieren:**
   Da `+0,34 V > −0,76 V` ist, besitzt Kupfer die höhere Elektronenaffinität und wird reduziert (**Kathode**). Zink wird oxidiert (**Anode**): `Zn → Zn²⁺ + 2 e⁻`.
3. **Standardzellpotential berechnen:**
   `E°_Zelle = E°_Kathode − E°_Anode = +0,34 V − (−0,76 V) = +1,10 V`
4. **Freie Reaktionsenthalpie `ΔG°` bestimmen (`n = 2 mol` Elektronen):**
   `ΔG° = −2 × 96.485 C/mol × 1,10 V = −212.267 J/mol ≈ −212,3 kJ/mol`

Da `E°_Zelle = +1,10 V` positiv und `ΔG°` stark negativ ist, läuft die Gesamtreaktion `Zn + Cu²⁺ → Zn²⁺ + Cu` spontan ab.

### Korrektur für abweichende Konzentrationen über die Nernst-Gleichung

Weichen die Ionenkonzentrationen vom Standardwert `1 mol/L` ab, greift bei `25 °C` die **Nernst-Gleichung** (mit `Q` als Reaktionsquotient `[Zn²⁺] / [Cu²⁺]`):

```text
E_Zelle = E°_Zelle − (0,05916 V / n) × log₁₀(Q)
```

Sinkt im Betrieb die Kupferionen-Konzentration auf `[Cu²⁺] = 0,01 mol/L` bei `[Zn²⁺] = 1,0 mol/L`, ergibt sich `Q = 1,0 / 0,01 = 100` und `log₁₀(100) = 2`:

`E_Zelle = 1,10 V − (0,05916 V / 2) × 2 = 1,10 V − 0,05916 V ≈ +1,04 V`

Die Zellspannung sinkt messbar von `1,10 V` auf **`1,04 V`**.

## Vergleich ausgewählter galvanischer und elektrolytischer Zellen

Die Tabelle stellt sechs praxisrelevante elektrochemische Systeme mit ihren Standardpotentialen bei `25 °C` gegenüber.

| Elektrochemisches System | Anode (`E°_Anode`) | Kathode (`E°_Kathode`) | `E°_Zelle` | Verhalten |
| :--- | :--- | :--- | :--- | :--- |
| Daniell-Element (`Zn / Cu`) | `Zn²⁺/Zn` (`−0,76 V`) | `Cu²⁺/Cu` (`+0,34 V`) | `+1,10 V` | Spontan (galvanische Zelle) |
| Silber-Zink-Zelle (`Zn / Ag`) | `Zn²⁺/Zn` (`−0,76 V`) | `Ag⁺/Ag` (`+0,80 V`) | `+1,56 V` | Spontan (Knopfzelle / Primärzelle) |
| H₂/O₂-Brennstoffzelle (sauer) | `2 H⁺/H₂` (`0,00 V`) | `O₂, 4 H⁺/2 H₂O` (`+1,23 V`) | `+1,23 V` | Spontan (Energiewandler) |
| Eisenkorrosion im sauren Milieu | `Fe²⁺/Fe` (`−0,44 V`) | `O₂, 4 H⁺/2 H₂O` (`+1,23 V`) | `+1,67 V` | Spontan (unerwünschte Oxidation) |
| Blei-Säure-Akkumulator | `PbSO₄/Pb` (`−0,36 V`) | `PbO₂/PbSO₄` (`+1,69 V`) | `+2,05 V` | Spontan bei Entladung (ca. `2 V`/Zelle) |
| Wasserelektrolyse (Umkehrung) | `O₂/H₂O` (`+1,23 V`) | `2 H⁺/H₂` (`0,00 V`) | `−1,23 V` | Nicht spontan (Zersetzungsspannung nötig) |

## Technische Anwendungen, Rechenfehler und kinetische Grenzen

### Einsatzbereiche von Batterietechnik bis Korrosionsschutz

Die Differenzbildung der Standardpotentiale ermöglicht die gezielte Auswahl von Elektrodenmaterialien für Batterien und Akkumulatoren sowie den **kathodischen Korrosionsschutz**. Verbindet man ein Stahlbauwerk (`Fe²⁺/Fe: −0,44 V`) leitend mit einer Opferanode aus Zink (`−0,76 V`) oder Magnesium (`−2,36 V`), übernimmt das unedlere Metall die Rolle der Anode und löst sich kontrolliert auf, während der Stahl geschützt bleibt. Umgekehrt erklärt die Spannungsreihe, warum Gold (`Au³⁺/Au: +1,50 V`) durch Luftsauerstoff (`+1,23 V`) nicht oxidiert wird und über Jahrtausende blank bleibt.

### Typische Rechenfehler und Abweichungen in der Realität

Zwei Berechnungsfehler treten besonders häufig auf: Erstens wird das Standardpotential fälschlich mit stöchiometrischen Koeffizienten multipliziert (intensive Größe bleibt unverändert). Zweitens wird das Minuszeichen an der Anode doppelt berücksichtigt. Merken Sie sich eine feste Regel: Entweder **subtrahieren** Sie die unveränderten Reduktionspotentiale (`E°_Kathode − E°_Anode`), oder Sie kehren das Vorzeichen für die Oxidation um und **addieren** beide Werte.

In realen technischen Zellen weicht die Klemmenspannung vom idealen Leerlaufwert ab:

1. **Überspannung (Kinetik):** Bei Gasentwicklungen wie der Wasserelektrolyse genügen in der Praxis die theoretischen `1,23 V` nicht. Abhängig vom Elektrodenmaterial (Platin, Nickel, Graphit) sind durch Aktivierungshemmungen oft `1,6 V` bis `2,0 V` erforderlich.
2. **Innenwiderstand und Polarisation:** Sobald ein elektrischer Strom fließt, fällt am Elektrolyt- und Kontaktwiderstand Spannung ab (`U_Klemm = E_Zelle − I × R_i`), sodass die unter Last messbare Spannung sinkt.
3. **Passivierung:** Unedle Metalle wie Aluminium (`−1,66 V`) oder Titan bilden an Luft dichte Oxidschichten, die eine theoretisch spontane Weiterkorrosion kinetisch blockieren.
