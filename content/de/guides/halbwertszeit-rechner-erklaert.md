---
title: "Wie der Halbwertszeit-Rechner funktioniert (Radioaktiver Zerfall)"
description: "Umfassender Leitfaden zur Halbwertszeit: Exponentielles Zerfallsgesetz, Zerfallskonstante Lambda, Aktivitätsberechnung in Becquerel, Rechenbeispiele und Isotopen-Referenzwerte."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "half-life-calculator"
faqs:
  - question: "Warum bleibt die physikalische Halbwertszeit bei Temperatur-, Druck- oder chemischen Änderungen konstant?"
    answer: "Der radioaktive Zerfall ist ein quantenmechanischer Prozess innerhalb des Atomkerns. Chemische Bindungen, Aggregatzustände oder übliche Labor-Temperaturen beeinflussen lediglich die Elektronenhülle, erreichen jedoch nicht die Energieskalen der Kernkräfte im Megaelektronenvolt-Bereich. Nur bei extrem seltenen Zerfallsarten wie dem Elektroneneinfang von Beryllium-7 wurden unter extremen Bedingungen winzige Abweichungen im Promillebereich gemessen."
  - question: "Worin unterscheiden sich physikalische, biologische und effektive Halbwertszeit?"
    answer: "Die physikalische Halbwertszeit beschreibt allein den Kernzerfall eines Radionuklids. Die biologische Halbwertszeit gibt an, wie schnell ein lebender Organismus die Hälfte eines aufgenommenen Stoffes über Stoffwechsel und Ausscheidung eliminiert. Beide Effekte wirken parallel und ergeben die effektive Halbwertszeit über die Kehrwertsumme 1/t_eff = 1/t_phys + 1/t_biol, weshalb t_eff stets kürzer ist als jeder der beiden Einzelwerte."
  - question: "Was besagt die Zehner-Regel (zehn Halbwertszeiten) im Strahlenschutz?"
    answer: "Nach zehn Halbwertszeiten sinkt die ursprüngliche Stoffmenge bzw. Aktivität auf den Faktor (1/2)^10 = 1/1.024, also auf rund 0,0977 % (knapp ein Tausendstel) des Ausgangswerts. In nuklearmedizinischen Abklinganlagen und Laboratorien dient diese Schwelle als praktische Orientierungsgröße, bevor Abfälle zur behördlichen Freigabe nach Strahlenschutzverordnung geprüft werden."
  - question: "Wie hängen Halbwertszeit, Zerfallskonstante Lambda und mittlere Lebensdauer zusammen?"
    answer: "Die Zerfallskonstante λ verknüpft sich über λ = ln(2) / t₁/₂ ≈ 0,693147 / t₁/₂ mit der Halbwertszeit. Der Kehrwert τ = 1 / λ = t₁/₂ / ln(2) ≈ 1,4427 × t₁/₂ entspricht der mittleren Lebensdauer eines Atomkerns bis zum Zerfall. Nach Verstreichen einer mittleren Lebensdauer τ sind noch 1/e ≈ 36,79 % der Ausgangskerne vorhanden."
  - question: "Wann verwendet man die Basis 1/2 und wann die eulersche Zahl e?"
    answer: "Beide Darstellungen sind mathematisch identisch und liefern exakt dieselben Ergebnisse. Die Form mit der Basis 1/2 eignet sich besonders für direkte Abschätzungen über Vielfache der Halbwertszeit, während die Exponentialform mit e^(−λ × t) in der Physik, Dosimetrie und Differenzialrechnung bevorzugt wird, weil die Aktivität A(t) = λ × N(t) direkt aus der Ableitung nach der Zeit hervorgeht."
---

Die **Halbwertszeit** (`t₁/₂`) bezeichnet jene Zeitspanne, nach der genau die Hälfte der ursprünglich vorhandenen Atomkerne eines radioaktiven Nuklids zerfallen ist. Da der Kernzerfall ein rein statistischer Quantenprozess ohne „Alterungsgedächtnis“ ist, besitzt jedes einzelne Atom in jedem Zeitintervall dieselbe Zerfallswahrscheinlichkeit. Daraus folgt zwingend ein exponentieller Verlauf: Nach einer Halbwertszeit verbleiben 50 % der Ausgangsmenge, nach zwei Halbwertszeiten 25 %, nach drei 12,5 % und nach zehn Halbwertszeiten weniger als 0,1 %.

Für die Berechnung spielt es keine Rolle, ob Sie die verbleibende Teilchenzahl `N(t)`, die Masse `m(t)` oder die Radioaktivität `A(t)` in Becquerel (`Bq`) betrachten — alle drei Größen sind zueinander proportional und folgen demselben Zerfallsgesetz. Mit einem Halbwertszeit-Rechner lassen sich aus drei bekannten Größen wahlweise die Restmenge, die Anfangsmenge, die verstrichene Zeit oder die isotopenspezifische Halbwertszeit exakt bestimmen.

## Mathematische Grundlagen und Parameter des Zerfallsgesetzes

Das fundamentale Gesetz des radioaktiven Zerfalls lässt sich in zwei äquivalenten Schreibweisen formulieren. Welche Variante Sie wählen, hängt davon ab, ob die Halbwertszeit `t₁/₂` oder die Zerfallskonstante `λ` (Lambda) gegeben ist.

### Das exponentielle Zerfallsgesetz zur Basis 1/2

Für die direkte Berechnung über die Halbwertszeit gilt:

```text
N(t) = N₀ × (1/2)^(t / t₁/₂)
A(t) = A₀ × (1/2)^(t / t₁/₂)
m(t) = m₀ × (1/2)^(t / t₁/₂)
```

Dabei stehen `N₀`, `A₀` und `m₀` für die Ausgangswerte zum Zeitpunkt `t = 0`, während `N(t)`, `A(t)` und `m(t)` die verbleibenden Größen nach der verstrichenen Zeit `t` bezeichnen. Entscheidend ist die strikte Einheitenkonsistenz im Exponenten `t / t₁/₂`: Beide Zeitangaben müssen in derselben Einheit (Sekunden, Stunden, Tage oder Jahre) vorliegen, damit der Exponent dimensionslos bleibt.

### Zerfallskonstante, mittlere Lebensdauer und Aktivität

In der Kernphysik und Messtechnik wird häufig mit der natürlichen Exponentialfunktion gearbeitet. Die Zerfallskonstante `λ` beschreibt die Zerfallswahrscheinlichkeit pro Zeiteinheit und verknüpft sich über den natürlichen Logarithmus von 2 mit der Halbwertszeit:

```text
λ = ln(2) / t₁/₂ ≈ 0,693147 / t₁/₂
N(t) = N₀ × e^(−λ × t)
τ = 1 / λ = t₁/₂ / ln(2) ≈ 1,4427 × t₁/₂
A(t) = −dN/dt = λ × N(t)
```

Hierbei bezeichnet `τ` (Tau) die mittlere Lebensdauer eines Kerns, also den statistischen Durchschnittswert aller Zerfallszeiten. Wird nach der verstrichenen Zeit `t` gesucht — etwa bei der Altersbestimmung oder der Abklingzeit im Strahlenschutz —, löst man die Gleichung logarithmisch nach `t` auf:

```text
t = t₁/₂ × ln(N₀ / N(t)) / ln(2) = ln(A₀ / A(t)) / λ
```

## Schritt-für-Schritt-Rechenbeispiel: Iod-131 in der Nuklearmedizin

In der nuklearmedizinischen Schilddrüsentherapie wird häufig das Beta- und Gammastrahlen emittierende Isotop **Iod-131 (`¹³¹I`)** eingesetzt, dessen physikalische Halbwertszeit `t₁/₂ = 8,02 Tage` beträgt. Angenommen, ein Patient erhält eine Anfangsaktivität von `A₀ = 3.700 MBq` (`3,7 GBq`). Wir berechnen die physikalische Restaktivität nach genau drei Halbwertszeiten, nach 14 Tagen sowie den Zeitpunkt, zu dem die Aktivität unter `100 MBq` sinkt.

1. **Restaktivität nach drei Halbwertszeiten (`t = 24,06 Tage`):** Da `t / t₁/₂ = 24,06 / 8,02 = 3` ein ganzzahliges Vielfaches ist, ergibt sich `A(24,06 d) = 3.700 MBq × (1/2)^3 = 3.700 MBq × 0,125 = 462,5 MBq`.
2. **Zerfallskonstante bestimmen:** Für beliebige Zeitpunkte berechnen wir `λ = 0,693147 / 8,02 d ≈ 0,086427 d⁻¹`.
3. **Restaktivität nach `t = 14 Tagen`:** Eingesetzt in die Exponentialformel folgt `λ × t = 0,086427 × 14 = 1,20998`. Mit `e^(−1,20998) ≈ 0,29820` verbleibt eine physikalische Aktivität von `A(14 d) = 3.700 MBq × 0,29820 = 1.103,35 MBq`.
4. **Abklingzeit bis `A(t) = 100 MBq`:** Durch Umstellen auf die Zeit erhalten wir `t = 8,02 d × ln(3.700 / 100) / ln(2) = 8,02 d × ln(37) / 0,693147`. Mit `ln(37) ≈ 3,610918` entspricht dies `5,2095` Halbwertszeiten, also `t = 8,02 d × 5,2095 ≈ 41,78 Tage`.

Im klinischen Alltag sinkt die im Körper verbleibende Aktivität allerdings deutlich schneller, weil zusätzlich zur physikalischen Halbwertszeit die biologische Ausscheidung über Niere und Schweiß wirkt.

## Referenztabelle: Wichtige Isotope, Halbwertszeiten und Einsatzgebiete

Die folgende Übersicht zeigt sieben technisch, medizinisch und geowissenschaftlich bedeutsame Radionuklide mit ihren charakteristischen Zerfallsdaten:

| Isotop | Symbol | Halbwertszeit (t₁/₂) | Zerfallsart | Typische Anwendung |
|---|---|---|---|---|
| Technetium-99m | `⁹⁹ᵐTc` | 6,01 Stunden | Isomerer Übergang (γ) | Szintigrafie, Organdiagnostik |
| Radon-222 | `²²²Rn` | 3,82 Tage | Alpha-Zerfall (α) | Innenraum-Strahlenschutz, Geologie |
| Iod-131 | `¹³¹I` | 8,02 Tage | Beta-Minus (β⁻) + γ | Schilddrüsenkarzinom-Therapie |
| Cobalt-60 | `⁶⁰Co` | 5,27 Jahre | Beta-Minus (β⁻) + γ | Industrielle Sterilisation, Werkstoffprüfung |
| Cäsium-137 | `¹³⁷Cs` | 30,17 Jahre | Beta-Minus (β⁻) + γ | Umweltmonitoring, Füllstandsmessung |
| Kohlenstoff-14 | `¹⁴C` | 5.730 Jahre | Beta-Minus (β⁻) | Radiokarbondatierung in der Archäologie |
| Uran-238 | `²³⁸U` | 4,468 Mrd. Jahre | Alpha-Zerfall (α) | Geochronologie von Gesteinen und Meteoriten |

## Anwendungsbereiche, typische Rechenfehler und Strahlenschutz-Grenzen

Die Halbwertszeitberechnung bildet das Rückgrat der Radiokarbondatierung, der nuklearmedizinischen Dosimetrie und des gesetzlichen Strahlenschutzes. Bei der C-14-Methode lässt sich organisches Material zuverlässig bis zu einem Alter von etwa 50.000 Jahren datieren; jenseits von neun bis zehn Halbwertszeiten nähert sich das Messsignal der Nachweisgrenze der Beschleuniger-Massenspektrometrie (AMS). Zudem erfordern präzise Datierungen eine Kalibrierung (etwa über Baumring-Kurven wie IntCal20), da der atmosphärische `¹⁴C`-Gehalt historisch schwankte und durch den industriellen Suess-Effekt sowie Kernwaffentests beeinflusst wurde.

In der Praxis treten bei manuellen Berechnungen vier klassische Fehlerquellen auf:

- **Inkonsistente Zeiteinheiten:** Wird `t` in Stunden eingegeben, während `t₁/₂` in Tagen definiert ist, liefert der Exponent falsche Größenordnungen.
- **Lineare Interpolation statt Exponentialrechnung:** Ein Viertel der Halbwertszeit bedeutet nicht, dass 12,5 % zerfallen sind; exakt zerfallen `1 − (1/2)^0,25 ≈ 15,91 %`.
- **Verwechslung von physikalischer und effektiver Halbwertszeit:** Im menschlichen Körper oder in offenen Ökosystemen verkürzt die biologische Ausscheidung die Verweildauer gemäß `t_eff = (t_phys × t_biol) / (t_phys + t_biol)`.
- **Ignorierte Zerfallsketten und Tochternuklide:** Zerfällt ein Mutternuklid in ein ebenfalls radioaktives Tochternuklid (etwa `⁹⁰Sr → ⁹⁰Y` oder `²²⁶Ra → ²²²Rn`), beschreibt die einfache Formel nur die Muttersubstanz, nicht aber die Gesamtaktivität der Probe.

Im deutschen und europäischen Strahlenschutzrecht (StrlSchV) entscheidet nicht die Halbwertszeit allein über die Entsorgung, sondern die Unterschreitung nuklidspezifischer Freigrenzen und spezifischer Aktivitäten in Becquerel pro Gramm (`Bq/g`). Für sicherheitsrelevante Nachweise sind daher stets kalibrierte Messungen und behördlich anerkannte Abklingprotokolle heranzuziehen.
