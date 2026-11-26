---
title: "Ksp-Rechner: Das Löslichkeitsprodukt"
description: "Lernen Sie, warum sich manche Salze in Wasser lösen und andere nicht, wie man den Ksp berechnet, und nutzen Sie unseren Ksp-Rechner."
category: "Math & Science"
relatedCalculator: "ksp-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen dem Löslichkeitsprodukt Ksp und der molaren Löslichkeit S?"
    answer: "Die molare Löslichkeit S gibt an, wie viele Mol eines Salzes sich maximal pro Liter Lösungsmittel bei einer bestimmten Temperatur auflösen (Einheit mol/L). Das Löslichkeitsprodukt Ksp hingegen ist die dimensionslose thermodynamische Gleichgewichtskonstante dieser Auflösung und hängt über einen stöchiometrischen Faktor und Exponenten (z. B. S², 4 S³ oder 27 S⁴) von S ab."
  - question: "Kann man die Löslichkeit zweier Salze direkt anhand ihrer Ksp-Werte vergleichen?"
    answer: "Ein direkter Vergleich der Ksp-Werte ist nur dann zulässig, wenn beide Salze exakt denselben Dissoziationstyp aufweisen (beispielsweise beide 1:1-Salze wie AgCl und BaSO₄ sind). Vergleicht man etwa ein 1:1-Salz mit einem 1:2- oder 2:1-Salz wie Ag₂CrO₄, kann das Salz mit dem kleineren Ksp-Wert trotzdem eine höhere molare Löslichkeit besitzen."
  - question: "Was bewirkt der Fremdioneneffekt (Common-Ion Effect) bei schwerlöslichen Salzen?"
    answer: "Wird einer gesättigten Lösung ein leicht lösliches Salz zugesetzt, das ein gemeinsames Ion mit dem Bodenkörper teilt (z. B. NaCl zu einer AgCl-Lösung), steigt die Konzentration dieses Ions stark an. Gemäß dem Prinzip von Le Chatelier verschiebt sich das Löslichkeitsgleichgewicht zurück zum Feststoff, wodurch die Löslichkeit des schwerlöslichen Salzes oft um mehrere Zehnerpotenzen sinkt."
  - question: "Wann fällt ein Niederschlag aus einer Lösung aus?"
    answer: "Zur Vorhersage einer Fällung berechnet man das aktuelle Ionenprodukt Qsp aus den momentanen Ionenkonzentrationen nach dem Mischen zweier Lösungen. Ist Qsp kleiner als Ksp, ist die Lösung ungesättigt und es bildet sich kein Niederschlag; bei Qsp = Ksp liegt eine exakt gesättigte Lösung vor; erst bei Qsp > Ksp überschreitet die Konzentration die Sättigungsgrenze und das Salz fällt aus."
  - question: "Warum ist die tatsächliche Löslichkeit in der Praxis oft höher als der aus Ksp berechnete Idealwert?"
    answer: "Mehrere Nebengleichgewichte können die reale Löslichkeit deutlich erhöhen: Hohe Konzentrationen fremder Inertsalze senken die Aktivitätskoeffizienten der Ionen (Salzeffekt), Anionen schwacher Säuren (wie Carbonat, Sulfid oder Fluorid) werden in saurem Milieu protoniert, und Übergangsmetalle bilden lösliche Komplexionen wie [Ag(NH₃)₂]⁺."
---

Während sich Speisesalz über `350 g/L` in Wasser löst, sinkt Silberchlorid nahezu vollständig zu Boden. Dennoch geht auch bei schwerlöslichen Salzen ein winziger, messbarer Ionenanteil in Lösung, bis sich bei gegebener Temperatur ein **heterogenes Sättigungsgleichgewicht** zwischen Bodenkörper und Lösung einstellt.

Zur Quantifizierung dient das **Löslichkeitsprodukt (`K_sp`, auch `K_L`)**. Es erlaubt exakte Aussagen zur maximalen Löslichkeit, zur Niederschlagsvorhersage und zur gezielten Fällungssteuerung in Analytik und Wassertechnik. Mit unserem [Ksp-Rechner](/de/rechner/ksp-rechner) berechnen Sie `K_sp` direkt aus der molaren Löslichkeit oder leiten umgekehrt alle Gleichgewichtskonzentrationen der Ionen ab.

## Methodik: Löslichkeitsprodukt, Stöchiometrie und Ionenprodukt Qsp

Dissoziiert ein schwerlösliches Salz `A_a B_b` in wässriger Lösung in Kationen `A^(b+)` und Anionen `B^(a−)`, lautet das Gleichgewicht:

```text
A_a B_b(s) ⇄ a A^(b+)(aq) + b B^(a−)(aq)
```

Da der feste Bodenkörper `(s)` eine konstante Aktivität von `1` besitzt, entfällt er im Massenwirkungsgesetz. Das **Löslichkeitsprodukt `K_sp`** ist das Produkt der Ionenkonzentrationen, potenziert mit ihren stöchiometrischen Koeffizienten:

```text
K_sp = [A^(b+)]^a × [B^(a−)]^b
```

Bezeichnet `S` die **molare Löslichkeit** in reinem Wasser (`mol/L`), entstehen `a × S` Kationen und `b × S` Anionen:

```text
K_sp = (a × S)^a × (b × S)^b = (a^a × b^b) × S^(a + b)
```

### Fällungsvorhersage über das Ionenprodukt Qsp

Beim Mischen zweier Elektrolytlösungen vergleicht man das momentane **Ionenprodukt `Q_sp`** — berechnet aus den Anfangskonzentrationen unmittelbar nach Berücksichtigung des Mischvolumens — mit dem Literaturwert `K_sp`:

- **`Q_sp < K_sp`**: Untersättigte Lösung; alle Ionen bleiben vollständig gelöst und vorhandener Bodenkörper würde sich weiter auflösen.
- **`Q_sp = K_sp`**: Exakt gesättigte Lösung im dynamischen Gleichgewicht zwischen Auflösung und Kristallisation.
- **`Q_sp > K_sp`**: Übersättigte Lösung; das überschüssige Salz fällt so lange als Niederschlag aus, bis `Q_sp = K_sp` wiederhergestellt ist.

Für die umgekehrte Aufgabe — die Berechnung der molaren Löslichkeit `S` aus einem tabellierten `K_sp`-Wert — wird die Stöchiometrieformel nach `S` aufgelöst: `S = (K_sp / (a^a × b^b))^(1 / (a + b))`. Bei einem `1:2`-Salz entspricht dies `S = (K_sp / 4)^(1/3)`, bei einem `1:3`-Salz `S = (K_sp / 27)^(1/4)`.

## Rechenbeispiel: Löslichkeit und Fremdioneneffekt bei Calciumfluorid

Calciumfluorid (`CaF₂`, Mineral Fluorit) ist ein zentraler Referenzstoff für `1:2`-Elektrolyte in der Wasserchemie und Halbleiterfertigung bei `25 °C` (`298,15 K`):

```text
CaF₂(s) ⇄ Ca²⁺(aq) + 2 F⁻(aq)
```

Aus `a = 1` und `b = 2` folgen `[Ca²⁺] = S` sowie `[F⁻] = 2 × S`, woraus sich ergibt:

```text
K_sp = [Ca²⁺] × [F⁻]² = S × (2 S)² = 4 S³
```

**Schritt 1 – Bestimmung von `K_sp` aus der molaren Löslichkeit:**
In reinem Wasser bei `25 °C` beträgt die molare Löslichkeit `S = 2,14 × 10⁻⁴ mol/L`.

1. Kubieren von `S`: `S³ = (2,14 × 10⁻⁴)³ = 9,800 × 10⁻¹²`.
2. Multiplikation mit `4`: `K_sp = 4 × 9,800 × 10⁻¹² = 3,92 × 10⁻¹¹`.
3. Massenkonzentration (`M(CaF₂) = 78,08 g/mol`): `β = 2,14 × 10⁻⁴ mol/L × 78,08 g/mol = 0,01671 g/L` (`16,71 mg/L`).

**Schritt 2 – Fremdioneneffekt durch Natriumfluorid (`NaF`):**
Enthält die Lösung bereits `0,10 mol/L` vollständig dissoziiertes `NaF`, gilt näherungsweise `[F⁻] ≈ 0,10 mol/L`, da der Eigenbeitrag `2 S'` des kaum löslichen `CaF₂` vernachlässigbar klein bleibt:

```text
[Ca²⁺] = S' = K_sp / [F⁻]² = (3,92 × 10⁻¹¹) / (0,10)² = 3,92 × 10⁻⁹ mol/L
```

Durch das gemeinsame Fluoridion sinkt die Calciumlöslichkeit von `2,14 × 10⁻⁴ mol/L` auf `3,92 × 10⁻⁹ mol/L` — eine Reduktion um mehr als den **Faktor 54.500**.

**Schritt 3 – Prüfung auf Fällung bei Mischung:**
Mischen Sie je `500 mL` einer `0,002 mol/L CaCl₂`-Lösung und einer `0,004 mol/L NaF`-Lösung, halbieren sich die Konzentrationen auf `[Ca²⁺] = 0,001 mol/L` und `[F⁻] = 0,002 mol/L`. Das Ionenprodukt beträgt `Q_sp = 0,001 × (0,002)² = 4,0 × 10⁻⁹`. Da `Q_sp > K_sp` (`4,0 × 10⁻⁹ > 3,92 × 10⁻¹¹`), fällt unmittelbar `CaF₂` aus.

## Vergleich gängiger Salztypen und Löslichkeitsprodukte (25 °C)

Die Tabelle zeigt den Einfluss der Stöchiometrie auf die Umrechnung zwischen `K_sp` und molarer Löslichkeit `S`:

| Salztyp (a : b) | Ksp-Formel | Beispielsalz | Ksp (25 °C) | Löslichkeit S (mol/L) | Praxisrelevanz |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1 : 1` (`AB`) | `K_sp = S²` | Silberchlorid (`AgCl`) | `1,77 × 10⁻¹⁰` | `1,33 × 10⁻⁵` | Chloridtitration (Argentometrie) |
| `1 : 1` (`AB`) | `K_sp = S²` | Bariumsulfat (`BaSO₄`) | `1,10 × 10⁻¹⁰` | `1,05 × 10⁻⁵` | Röntgenkontrastmittel, Scaling |
| `1 : 2` (`AB₂`) | `K_sp = 4 S³` | Calciumfluorid (`CaF₂`) | `3,92 × 10⁻¹¹` | `2,14 × 10⁻⁴` | Fluorid-Abwasserbehandlung |
| `2 : 1` (`A₂B`) | `K_sp = 4 S³` | Silberchromat (`Ag₂CrO₄`) | `1,12 × 10⁻¹²` | `6,54 × 10⁻⁵` | Indikator der Mohr-Titration |
| `1 : 3` (`AB₃`) | `K_sp = 27 S⁴` | Eisen(III)-hydroxid (`Fe(OH)₃`) | `2,79 × 10⁻³⁹` | `1,01 × 10⁻¹⁰` | Enteisenung im Wasserwerk |
| `3 : 2` (`A₃B₂`) | `K_sp = 108 S⁵` | Calciumphosphat (`Ca₃(PO₄)₂`) | `2,07 × 10⁻³³` | `1,14 × 10⁻⁷` | Phosphatfällung, Knochenmineral |

Bemerkenswert ist der Vergleich zwischen `AgCl` und `Ag₂CrO₄`: Obwohl Silberchromat (`1,12 × 10⁻¹²`) einen deutlich kleineren `K_sp`-Wert besitzt als `AgCl` (`1,77 × 10⁻¹⁰`), löst es sich molar (`6,54 × 10⁻⁵ mol/L`) fast **fünfmal stärker**, da die dritte Wurzel statt der Quadratwurzel gezogen wird.

## Anwendungsfelder, Fallstricke und physikochemische Grenzen

In der Abwassertechnik und Hydrometallurgie ermöglicht `K_sp` die **fraktionierte Fällung**: Durch kontrollierte Zugabe von Sulfid, Hydroxid oder Phosphat lassen sich Schwermetalle selektiv abtrennen, bevor Begleitionen ausfallen. Kraftwerke und Wasserwerke überwachen Sättigungsindizes (etwa für `CaCO₃` und `CaSO₄`), um Verkalkungen in Wärmetauschern zu verhindern; in der Medizin beschreibt `K_sp` die Kristallisation von Calciumoxalat-Nierensteinen.

Schließen Sie bei der Berechnung vier typische Fehler aus:

1. **Fehlender Stöchiometriefaktor**: Bei `1:2`-Salzen ist `[F⁻] = 2 S`; häufig wird fälschlich `S³` statt `4 S³` angesetzt.
2. **pH-Einfluss auf basische Anionen**: Salze mit `OH⁻`, `CO₃²⁻`, `S²⁻` oder `PO₄³⁻` lösen sich im Sauren durch Protonierung deutlich stärker als nach reinem `K_sp`.
3. **Komplexbildung**: Liganden wie Ammoniak (`[Ag(NH₃)₂]⁺`) oder Chloridüberschuss (`[PbCl₄]²⁻`) erhöhen die Gesamtlöslichkeit massiv.
4. **Salzeffekt bei hoher Ionenstärke**: In Meerwasser oder Solen senken Fremdionen die Aktivitätskoeffizienten unter `1`, sodass die reale Löslichkeit `20 %` bis über `100 %` höher ausfallen kann.
