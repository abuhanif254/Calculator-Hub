---
title: "pH-Rechner: Säuregrad berechnen"
description: "Verstehen Sie die pH-Skala, berechnen Sie Hydroniumionen-Konzentrationen logarithmisch und vermeiden Sie typische Mess- und Rechenfehler bei Verdünnungen."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ph-calculator"
relatedType: "calculator"
faqs:
  - question: "Warum ist eine Lösung mit pH 3 genau zehnmal saurer als eine Lösung mit pH 4?"
    answer: "Die pH-Skala beruht auf dem negativen dekadischen Logarithmus der Hydroniumionen-Konzentration. Jede Verringerung um eine ganze pH-Einheit entspricht daher einer Verzehnfachung der Protonenaktivität. Zwischen pH 3 und pH 5 liegt bereits der Faktor 100."
  - question: "Kann der pH-Wert auch kleiner als 0 oder größer als 14 sein?"
    answer: "Ja. Der Bereich 0 bis 14 beschreibt lediglich wässrige Lösungen zwischen 1 mol/L starker Säure und 1 mol/L starker Base bei 25 °C. Hochkonzentrierte Salzsäure (z. B. 5 mol/L) weist theoretisch einen negativen pH-Wert auf, während konzentrierte Natronlauge über pH 14 liegt."
  - question: "Warum hat sehr stark verdünnte Salzsäure (10⁻⁸ mol/L) nicht den pH-Wert 8?"
    answer: "Bei extrem starken Verdünnungen darf die Eigendissoziation (Autoprotolyse) des Wassers nicht vernachlässigt werden. Da reines Wasser bereits 1,0 × 10⁻⁷ mol/L Hydroniumionen liefert, stellt sich bei Zugabe von 10⁻⁸ mol/L HCl ein pH-Wert von etwa 6,98 ein — die Lösung bleibt minimal sauer."
  - question: "Wie beeinflusst die Temperatur den neutralen pH-Wert von reinem Wasser?"
    answer: "Die Autoprotolyse des Wassers ist endotherm, sodass das Ionenprodukt Kw mit steigender Temperatur zunimmt. Bei 0 °C liegt der Neutralpunkt bei pH 7,47, bei 25 °C bei pH 7,00 und bei 50 °C bei pH 6,63. Das Wasser bleibt dennoch neutral, weil stets [H₃O⁺] = [OH⁻] gilt."
  - question: "Was ist der Unterschied zwischen Konzentration und Aktivität beim pH-Wert?"
    answer: "Streng nach IUPAC ist der pH-Wert über die thermodynamische Aktivität a(H⁺) = γ · [H₃O⁺] definiert. In stark verdünnten Lösungen liegt der Aktivitätskoeffizient γ nahe 1, sodass man direkt mit der molaren Konzentration rechnen kann. Bei hoher Ionenstärke (> 0,1 mol/L) weichen berechnete und mit einer Glaselektrode gemessene Werte messbar voneinander ab."
---

Der **pH-Wert** (*potentia Hydrogenii*) ist die zentrale Messgröße für den sauren oder basischen Charakter einer wässrigen Lösung. Er gibt den negativen dekadischen Logarithmus der Wasserstoff- beziehungsweise Hydroniumionen-Aktivität (`[H₃O⁺]`) an und überführt winzige molare Konzentrationen über viele Größenordnungen hinweg in eine handliche Skala, die bei 25 °C typischerweise von **0** (stark sauer) über **7** (neutral) bis **14** (stark alkalisch) reicht.

Da es sich um eine logarithmische Skala handelt, bedeutet ein Unterschied von einer pH-Einheit stets eine zehnfache Änderung der Ionenkonzentration. Für präzise Laboransätze, Wasseranalysen oder Stöchiometrie-Übungen genügt grobes Abschätzen meist nicht: Mit unserem [pH-Rechner](/de/rechner/ph-wert-rechner) wandeln Sie molare Konzentrationen sofort in den exakten pH-Wert um und führen auch die Umkehrrechnung zuverlässig durch.

## Logarithmische Definition, Formeln und Parameter

Chemisch gesehen existieren freie Protonen (`H⁺`) in Wasser nicht isoliert, sondern lagern sich an Wassermoleküle zu Hydroniumionen (`H₃O⁺`) an. Gemäß IUPAC-Definition gilt für den pH-Wert sowie für die Rückrechnung zur Konzentration:

```text
pH = −log₁₀(a(H⁺)) ≈ −log₁₀([H₃O⁺])
[H₃O⁺] = 10^(−pH)   [Einheit: mol/L]
```

Die einzelnen Variablen haben dabei folgende Bedeutung:

- **`a(H⁺)` (Protonenaktivität):** Dimensionslose, effektive Konzentration der Hydroniumionen unter Berücksichtigung elektrostatischer Wechselwirkungen (`a = γ · c / c°`).
- **`[H₃O⁺]` (Molare Hydroniumionen-Konzentration):** Stoffmenge der gelösten Oxoniumionen pro Liter Lösung in `mol/L` (Molarität `M`).
- **`c₀` (Ausgangskonzentration der Säure):** Eingewogene oder titrierte Gesamtkonzentration vor der Protolyse. Bei starken einwertigen Säuren wie `HCl`, `HNO₃` oder `HClO₄` gilt oberhalb von `10⁻⁶ mol/L` näherungsweise `[H₃O⁺] ≈ c₀`.
- **`Kw` (Ionenprodukt des Wassers):** Gleichgewichtskonstante der Autoprotolyse `2 H₂O ⇌ H₃O⁺ + OH⁻`. Bei 25 °C beträgt `Kw = [H₃O⁺] · [OH⁻] = 1,0 × 10⁻¹⁴ mol²/L²`.

### Starke Säuren versus schwache Säuren

Während starke Säuren in Wasser praktisch vollständig protolysieren, stellt sich bei schwachen Säuren (wie Essigsäure oder Kohlensäure) ein Gleichgewicht ein, das durch die Säurekonstante `Ks` (`Ka`) beschrieben wird. Solange die Ausgangskonzentration deutlich größer als `Ks` ist (`c₀ ≫ Ks`) und `[H₃O⁺]` weit über `10⁻⁷ mol/L` liegt, lässt sich der pH-Wert näherungsweise über `pH ≈ 0,5 × (pKs − log₁₀(c₀))` bestimmen.

### Aktivitätskorrektur bei hoher Ionenstärke

In verdünnten Lösungen bis etwa `0,01 mol/L` darf der Aktivitätskoeffizient `γ` gleich `1` gesetzt werden. Steigt jedoch der gesamte Elektrolytgehalt (z. B. durch zugesetzte Neutralsalze wie `NaCl`), schirmen sich die Ionen gegenseitig ab: `γ` sinkt unter `1`, wodurch eine pH-Elektrode einen etwas höheren pH-Wert misst, als die rein stöchiometrische Konzentration erwarten ließe.

## Schritt-für-Schritt-Beispiel: Verdünnung einer starken Säure

Die folgende Berechnung demonstriert zuerst den Standardfall einer starken einwertigen Säure und anschließend den häufigen Denkfehler bei extremer Verdünnung.

**Aufgabe A:** Berechnen Sie den pH-Wert einer Salzsäure-Lösung (`HCl`) mit der Konzentration `c₀ = 0,0025 mol/L` bei 25 °C sowie nach zehnfacher Verdünnung.

1. **Vollständige Dissoziation ansetzen:** Da `HCl` eine sehr starke Säure ist (`c₀ ≫ 10⁻⁶ mol/L`), entspricht die Hydroniumionen-Konzentration direkt der Säurekonzentration: `[H₃O⁺] = 2,5 × 10⁻³ mol/L`.
2. **Negativen Dekadenlogarithmus bilden:** `pH = −log₁₀(2,5 × 10⁻³) = −(log₁₀(2,5) + log₁₀(10⁻³)) = −(0,3979 − 3) = 2,6021 ≈ 2,60`.
3. **Zehnfache Verdünnung prüfen:** Bei `c₀ = 2,5 × 10⁻⁴ mol/L` ergibt sich `pH = −log₁₀(2,5 × 10⁻⁴) = 3,60`. Eine Verdünnung um den Faktor 10 erhöht den pH-Wert exakt um `1,00` Einheit.

**Aufgabe B (Grenzfall):** Was passiert bei einer extrem verdünnten Salzsäure mit `c₀ = 1,0 × 10⁻⁸ mol/L`?

Eine naive Rechnung (`−log₁₀(10⁻⁸) = 8,00`) wäre physikalisch falsch, da eine Säure kein alkalisches Milieu erzeugen kann. Berücksichtigt man die Autoprotolyse des Wassers über die Ladungsbilanz `[H₃O⁺] = c₀ + Kw / [H₃O⁺]`, entsteht die quadratische Gleichung `[H₃O⁺]² − c₀ · [H₃O⁺] − Kw = 0`. Einsetzen von `c₀ = 1,0 × 10⁻⁸` und `Kw = 1,0 × 10⁻¹⁴` liefert:

```text
[H₃O⁺] = (1,0×10⁻⁸ + √((1,0×10⁻⁸)² + 4 × 1,0×10⁻¹⁴)) / 2
[H₃O⁺] = (1,0×10⁻⁸ + 2,0025×10⁻⁷) / 2 ≈ 1,051 × 10⁻⁷ mol/L
pH = −log₁₀(1,051 × 10⁻⁷) ≈ 6,98
```

## Referenzwerte typischer wässriger Lösungen bei 25 °C

Die folgende Übersicht zeigt charakteristische pH-Werte und zugehörige Hydroniumionen-Konzentrationen aus Alltag, Medizin und Laborpraxis:

| Lösung / Substanz | Typischer pH-Wert | `[H₃O⁺]`-Konzentration (mol/L) | Einordnung | Fachlicher Hinweis |
| :--- | :--- | :--- | :--- | :--- |
| Salzsäure (0,1 mol/L) | 1,0 | 1,0 × 10⁻¹ | Stark sauer | Vollständige Protolyse im Laborstandard |
| Menschlicher Magensaft | 1,5 | 3,2 × 10⁻² | Stark sauer | Ermöglicht Pepsinaktivierung und Keimabbau |
| Zitronensaft | 2,3 | 5,0 × 10⁻³ | Sauer | Dominiert durch dreiprotonige Zitronensäure |
| Schwarzer Kaffee | 5,0 | 1,0 × 10⁻⁵ | Schwach sauer | Abhängig von Röstgrad und Extraktionszeit |
| Reines Wasser (25 °C) | 7,0 | 1,0 × 10⁻⁷ | Neutral | Exakter Gleichgewichtspunkt `[H₃O⁺] = [OH⁻]` |
| Arterielles Blut | 7,4 | 4,0 × 10⁻⁸ | Schwach alkalisch | Eng gepuffert (7,35–7,45) via Hydrogencarbonat |
| Haushaltsammoniak (ca. 1 mol/L) | 11,6 | 2,5 × 10⁻¹² | Alkalisch | Schwache Base mit Teilprotolyse |
| Natronlauge (0,1 mol/L) | 13,0 | 1,0 × 10⁻¹³ | Stark alkalisch | Ätzend; pOH-Wert beträgt 1,0 |

## Praxisanwendungen, Fehlerquellen und Messpräzision

In der Praxis entscheidet der pH-Wert über chemische Reaktivität, biologische Verträglichkeit und Anlagenstabilität. In der **klinischen Diagnostik** markiert bereits ein Abfall des arteriellen Blut-pH unter `7,35` eine Azidose, während Werte über `7,45` auf eine Alkalose hinweisen. In der **Wasser- und Abwassertechnik** (z. B. nach DIN EN ISO 10523) schützt die kontinuierliche pH-Überwachung Rohrleitungen vor Korrosion (zu sauer) oder Kalkausfällungen (zu basisch) und gewährleistet die Wirksamkeit von Desinfektionsmitteln wie Chlor. In der **Agrar- und Bodenkunde** steuert der Boden-pH unmittelbar die Löslichkeit von Mikronährstoffen wie Eisen, Mangan oder Phosphat.

Bei Messungen und Berechnungen treten vier typische Fehlerquellen auf:

1. **CO₂-Aufnahme aus der Raumluft:** Ungepuffertes, frisch destilliertes Wasser zeigt an der Luft selten `pH 7,0`, sondern sinkt rasch auf `pH 5,5` bis `5,8`, da gelöstes Kohlendioxid Kohlensäure bildet.
2. **Ignorierte Temperaturabhängigkeit:** Sowohl das Ionenprodukt `Kw` als auch die Steilheit einer Glaselektrode (Nernst-Steigung `−59,16 mV` pro pH-Einheit bei 25 °C) sind temperaturabhängig. Präzise Messgeräte benötigen daher einen integrierten Temperaturfühler (ATC).
3. **Veraltete Kalibrierpuffer:** Alkalische Kalibrierlösungen (`pH 9` oder `pH 10`) ziehen Kohlendioxid aus der Luft und verlieren schnell ihren Nennwert; für valide Messungen ist eine regelmäßige Zweipunkt- oder Dreipunktkalibrierung Pflicht.
4. **Fehlende Verdünnungs- und Stöchiometrieprüfung:** Bei der Verwendung schwacher Säuren oder mehrprotoniger Systeme führt die Gleichsetzung `[H₃O⁺] = c₀` zu massiven Abweichungen — hier sind stets die jeweiligen `pKa`-Werte einzubeziehen.
