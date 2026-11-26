---
title: "Molalität: Die temperaturunabhängige Konzentration"
description: "Erfahren Sie, warum Chemiker und Thermodynamiker Molalität (mol/kg) statt Molarität verwenden, wie Sie Gefrierpunktserniedrigungen berechnen und nutzen Sie unseren Molalitäts-Rechner."
category: "Math & Science"
relatedCalculator: "molality-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum ist die Molalität unabhängig von der Temperatur, die Molarität jedoch nicht?"
    answer: "Die Molarität teilt die Stoffmenge durch das Lösungsvolumen, das sich bei Temperaturänderungen ausdehnt oder zusammenzieht. Die Molalität teilt die Stoffmenge dagegen ausschließlich durch die Masse des reinen Lösungsmittels in Kilogramm – und Masse bleibt bei jeder Temperatur und jedem Druck absolut konstant."
  - question: "Wird die Molalität durch die Gesamtmasse der Lösung oder nur durch die Masse des Lösungsmittels geteilt?"
    answer: "Ausschlaggebend ist ausschließlich die Masse des reinen Lösungsmittels (z. B. reines Wasser) in Kilogramm, nicht die Gesamtmasse der fertigen Mischung. Teilt man durch die Gesamtmasse, erhält man eine fehlerhafte Konzentration, die insbesondere bei konzentrierten Lösungen stark abweicht."
  - question: "Welches Formelzeichen steht im DACH-Raum korrekt für die Molalität?"
    answer: "Nach IUPAC und DIN 1310 lautet das genormte Formelzeichen b (z. B. b(NaCl) = 1,5 mol/kg), um Verwechslungen mit der Masse m oder der Einheit Meter (m) auszuschließen. In vielen Lehrbüchern und Software-Rechnern wird jedoch weiterhin das historische kleine m verwendet."
  - question: "Wie rechne ich Molarität in Molalität um, wenn das Volumen bekannt ist?"
    answer: "Für die Umrechnung benötigen Sie zwingend die Dichte ρ der Lösung (in kg/L beziehungsweise g/cm³) sowie die molare Masse M_Gelöst (in kg/mol). Die exakte Formel lautet b = c / (ρ − c × M_Gelöst). Nur bei sehr verdünnten wässrigen Lösungen (ρ ≈ 1,00 kg/L) stimmen beide Zahlenwerte näherungsweise überein."
  - question: "Warum spielt der van-'t-Hoff-Faktor i bei Molalitätsrechnungen eine so wichtige Rolle?"
    answer: "Kolligative Eigenschaften wie die Gefrierpunktserniedrigung hängen von der gesamten Anzahl gelöster Teilchen pro Kilogramm Lösungsmittel ab. Während ein Molekül Glucose als ein Teilchen gelöst bleibt (i = 1), dissoziiert Kochsalz (NaCl) in Wasser idealerweise in zwei Ionen (Na⁺ und Cl⁻, also i = 2) und verdoppelt so den physikalischen Effekt."
---

Die **Molalität** (nach IUPAC- und DIN-1310-Nomenklatur Formelzeichen `b`, in englischsprachiger Literatur häufig `m`) definiert die Konzentration einer Lösung als Stoffmenge des gelösten Stoffes pro Kilogramm **reinen Lösungsmittels** (`mol/kg`). Anders als die volumenbasierte Molarität (`mol/L`) bleibt die Molalität gegenüber Temperatur- und Druckänderungen vollständig stabil, weil Massen sich bei Erwärmung oder Abkühlung nicht verändern.

Deshalb bildet die Molalität den Standard in der physikalischen Chemie, der Thermodynamik und der Verfahrenstechnik – insbesondere bei Experimenten über große Temperaturspannen sowie bei kolligativen Effekten wie Gefrierpunktserniedrigung oder Siedepunktserhöhung. Zur schnellen Berechnung aus Einwaage, Molmasse und Lösungsmittelmasse dient unser [Molalitäts-Rechner](/de/rechner/molalitaets-rechner).

## Thermodynamische Grundlagen, Formeln und Umrechnung

### Grundgleichung der Molalität

Die Molalität `b` verknüpft die Stoffmenge `n_Gelöst` (in `mol`) mit der Masse `m_Lösungsmittel` des reinen Lösungsmittels (in `kg`):

```text
b = n_Gelöst / m_Lösungsmittel
b = m_Gelöst / (M_Gelöst × m_Lösungsmittel)
```

Wird das Lösungsmittel in Gramm (`g`) gewogen, muss es vor der Division durch `1.000` in Kilogramm umgerechnet werden (`1.000 g = 1 kg`). Setzen Sie niemals die Gesamtmasse `m_Lösung = m_Gelöst + m_Lösungsmittel` in den Nenner – diese gehört ausschließlich zum Massenanteil `w`.

### Umrechnung zwischen Molarität `c` und Molalität `b`

Da Molarität am Lösungsvolumen und Molalität an der Lösungsmittelmasse ansetzt, erfordert jede Umrechnung die Dichte `ρ` der fertigen Lösung. Mit konsistenten Einheiten (`c` in `mol/L`, `ρ` in `kg/L` beziehungsweise `g/cm³`, `M_Gelöst` in `kg/mol = g/mol ÷ 1.000`) gilt:

```text
b = c / (ρ − c × M_Gelöst)
c = (b × ρ) / (1 + b × M_Gelöst)
```

Bei stark verdünnten wässrigen Lösungen (`c < 0,01 mol/L` bei `20 °C`, `ρ ≈ 0,9982 kg/L`) weichen beide Werte kaum ab. Bei konzentrierten Salzlösungen oder organischen Lösungsmitteln wie Ethanol (`ρ = 0,789 kg/L` bei `20 °C`) entstehen dagegen deutliche Differenzen: Eine `1,0-molare` Ethanollösung erreicht bereits eine Molalität von rund `1,27 mol/kg`.

### Kolligative Eigenschaften

Kolligative Effekte hängen allein von der Teilchenanzahl pro Kilogramm Lösungsmittel ab:

```text
Gefrierpunktserniedrigung: ΔT_f = i × K_f × b
Siedepunktserhöhung:       ΔT_b = i × K_b × b
```

Hierbei stehen `K_f` für die kryoskopische Konstante (Wasser: `1,86 K·kg/mol`), `K_b` für die ebullioskopische Konstante (Wasser: `0,512 K·kg/mol`) und `i` für den van-'t-Hoff-Faktor der Dissoziation.

## Schritt-für-Schritt-Rechenbeispiel: Gefrierpunktserniedrigung einer Kochsalzlösung

Für ein Kälteexperiment werden `m_Gelöst = 116,88 g` trockenes Natriumchlorid (`NaCl`, `M = 58,44 g/mol`) vollständig in `m_Lösungsmittel = 800 g` (`0,800 kg`) reinem Wasser gelöst. Gesucht sind die Molalität sowie die theoretische Gefrierpunktserniedrigung.

1. **Stoffmenge berechnen:** Teilen Sie die Salzeinwaage durch die molare Masse: `n_Gelöst = 116,88 g / 58,44 g/mol = 2,00 mol`.
2. **Lösungsmittelmasse umrechnen:** `m_Lösungsmittel = 800 g / 1.000 = 0,800 kg`. (Die Gesamtlösung wiegt zwar `916,88 g`, wird für `b` jedoch nicht verwendet.)
3. **Molalität `b` ermitteln:** `b = 2,00 mol / 0,800 kg = 2,50 mol/kg`. Dieser Wert gilt unverändert sowohl bei `25 °C` als auch bei `−8 °C`.
4. **Gefrierpunktserniedrigung berechnen:** Da `NaCl` in Wasser idealerweise in `Na⁺` und `Cl⁻` zerfällt, gilt `i = 2`. Mit `K_f = 1,86 K·kg/mol` ergibt sich `ΔT_f = 2 × 1,86 K·kg/mol × 2,50 mol/kg = 9,30 K`. Der Gefrierpunkt sinkt ideal von `0,00 °C` auf `−9,30 °C` (reale Ionenwechselwirkungen senken das effektive `i` bei hoher Konzentration leicht auf rund `1,85`, sodass experimentell etwa `−8,6 °C` gemessen werden).
5. **Gegenprobe zur Molarität bei `20 °C`:** Beträgt die Dichte dieser `2,50-mol/kg`-Salzlösung bei Raumtemperatur rund `ρ = 1,092 kg/L`, liefert die Umrechnungsformel mit `M = 0,05844 kg/mol` eine Molarität von `c = (2,50 × 1,092) / (1 + 2,50 × 0,05844) = 2,73 / 1,1461 = 2,38 mol/L`. Zwischen `mol/kg` und `mol/L` entsteht hier bereits ein Unterschied von rund `5 %`.

## Vergleichstabelle: Molalität vs. Molarität im Labor- und Thermodynamik-Alltag

| Vergleichskriterium | Molalität (`b` bzw. `m`) | Molarität (`c` bzw. `M`) | Praktische Konsequenz |
| :--- | :--- | :--- | :--- |
| Bezugsgröße im Nenner | Masse des reinen Lösungsmittels (`kg`) | Gesamtvolumen der fertigen Lösung (`L`) | Molalität nutzt Waage, Molarität nutzt Messkolben |
| Standardeinheit | `mol/kg` | `mol/L` (`M`) | Umrechnung erfordert Lösungsdichte `ρ` |
| Temperatureinfluss | Unabhängig (konstant) | Abhängig (Volumenausdehnung) | Zwingend bei Kälte-, Siede- und Dampfdruckdaten |
| Druckeinfluss | Unabhängig | Leicht abhängig bei Hochdruck | Bevorzugt in Autoklaven und Geochemie |
| Mischverhalten | Exakt additiv über Massen | Verzerrt durch Volumenkontraktion | Wägen verhindert Mischvolumenfehler |
| Hauptanwendung | Kolligative Effekte, Phasendiagramme | Titrationen, Puffer, Stöchiometrie | Beide Maße ergänzen sich komplementär |

## Anwendungsfelder, Fehlerquellen und Präzisionshinweise

Industriell kommt die Molalität überall dort zum Einsatz, wo Flüssigkeiten starken Temperaturschwankungen unterliegen – etwa bei Kühlsolen und Frostschutzgemischen (Ethylenglykol-Wasser in Wärmepumpen und Fahrzeugen), bei der Kristallisationssteuerung in der Pharmazie sowie in der Lebensmitteltechnik zur Gefrierpunktberechnung. Ebenso bildet `mol/kg` in Elektrochemie und Geochemie die Basis für Aktivitätskoeffizienten.

Vermeiden Sie in der Praxis vier typische Fehlerquellen:

- **Lösungs- statt Lösungsmittelmasse einsetzen:** Bei einer `20-%-Salzlösung` (`200 g` Salz in `1.000 g` Lösung) beträgt die reine Lösungsmittelmasse lediglich `0,800 kg`, nicht `1,000 kg`.
- **Volumen pauschal mit Kilogramm gleichsetzen:** Wasser hat bei `20 °C` eine Dichte von `0,9982 kg/L`, bei `80 °C` nur noch `0,9718 kg/L`. Bei Aceton (`0,791 kg/L`) oder Chloroform (`1,489 kg/L`) erzeugt das Gleichsetzen von Litern und Kilogramm Fehler von `20 %` bis fast `50 %`.
- **Symbole `M` und `m` verwechseln:** Achten Sie in Protokollen strikt auf Groß- und Kleinschreibung (`M` = `mol/L`, `m` beziehungsweise `b` = `mol/kg`).
- **Kristallwasser bei Hydraten ignorieren:** Bei Salzen wie `MgCl₂ · 6 H₂O` gelangt zusätzliches Kristallwasser in die Lösung und muss bei hochgenauen Rechnungen der Lösungsmittelmasse zugeschlagen werden.
