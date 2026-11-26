---
title: "Boyle-Mariotte-Gesetz Rechner: Druck vs. Volumen"
description: "Verstehen Sie das umgekehrt proportionale Verhältnis zwischen Gasdruck und Gasvolumen bei konstanter Temperatur, berechnen Sie isotherme Zustandsänderungen und vermeiden Sie typische Fehler bei Druckeinheiten."
category: "Math & Science"
relatedCalculator: "boyles-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Muss beim Boyle-Mariotte-Gesetz mit Absolutdruck oder Überdruck gerechnet werden?"
    answer: "Es muss zwingend der Absolutdruck verwendet werden. Herkömmliche Manometer und Reifenfüllgeräte zeigen im DACH-Raum meist den Überdruck relativ zum örtlichen Luftdruck (ca. 1,013 bar auf Meereshöhe) an. Addieren Sie vor jeder Berechnung mit p₁ × V₁ = p₂ × V₂ den Umgebungsdruck zum gemessenen Überdruck, da ein scheinbarer Überdruck von 0 bar physikalisch etwa 1 bar Absolutdruck entspricht."
  - question: "Warum bleibt das Produkt aus Druck und Volumen nur bei konstanter Temperatur konstant?"
    answer: "Die mittlere kinetische Energie der Gasmoleküle hängt direkt von der absoluten Temperatur ab. Wird ein Gas sehr schnell komprimiert – etwa in einer Fahrradpumpe oder einem Dieselmotor –, erwärmt es sich (adiabatische bzw. polytrope Zustandsänderung), sodass der Druck stärker steigt, als das Boyle-Mariotte-Gesetz vorhersagt. Erst nach vollständigem Temperaturausgleich mit der Umgebung gilt wieder p₁ × V₁ = p₂ × V₂."
  - question: "Ab welchem Druck weichen reale Gase deutlich vom Boyle-Mariotte-Gesetz ab?"
    answer: "Bei Raumtemperatur und Drücken bis etwa 10 bar verhalten sich Luft, Stickstoff oder Sauerstoff mit weniger als 0,5 % Abweichung nahezu ideal. Oberhalb von 50 bis 100 bar machen sich jedoch das Eigenvolumen der Moleküle sowie zwischenmolekulare Anziehungskräfte bemerkbar. Bei 200 bar liegt das reale Volumen von Stickstoff je nach Temperatur rund 3 % bis 6 % über dem Idealwert; bei leicht kondensierbaren Gasen wie CO₂ treten Abweichungen schon deutlich früher auf."
  - question: "Welche Einheiten dürfen für Druck und Volumen im Rechner kombiniert werden?"
    answer: "Das Gesetz basiert auf einer Verhältnisgleichung. Sie können beliebige Einheiten wie Pascal (Pa), Hektopascal (hPa), Bar (bar), Kubikmeter (m³) oder Liter (L) verwenden, solange p₁ und p₂ sowie V₁ und V₂ jeweils dieselbe Einheit tragen. Bei Verwendung gemischter Einheiten müssen Sie vorab umrechnen, etwa mit 1 bar = 100.000 Pa und 1 m³ = 1.000 L."
  - question: "Welche medizinische und sicherheitstechnische Bedeutung hat das Gesetz beim Tauchen?"
    answer: "Alle 10 Meter Wassertiefe steigt der hydrostatische Druck um rund 1 bar. Taucht ein Gerätetaucher mit angehaltenem Atem auf, dehnt sich die in der Lunge eingeschlossene Luft nach dem Boyle-Mariotte-Gesetz aus. Besonders kritisch ist der Bereich zwischen 10 Metern Tiefe (2 bar) und der Wasseroberfläche (1 bar), da sich das Lungenvolumen dort verdoppelt – ein mechanisches Lungenbarotrauma kann die Folge sein."
---

Das **Boyle-Mariotte-Gesetz** (Robert Boyle, 1662; Edme Mariotte, 1676) beschreibt die isotherme Zustandsänderung einer abgeschlossenen idealen Gasmenge. Es besagt, dass bei konstanter Temperatur (`T = konstant`) und unveränderter Stoffmenge (`n = konstant`) der **Absolutdruck** `p` und das **Volumen** `V` **umgekehrt proportional** zueinander sind. Verdoppelt sich der Druck, halbiert sich das Volumen; vervierfacht sich das Volumen bei langsamer Expansion, sinkt der Druck auf ein Viertel.

Mathematisch lautet die Beziehung `p₁ × V₁ = p₂ × V₂`: Das Produkt `p × V` bleibt unter isothermen Bedingungen konstant. Für schnelle, einheitenkonsistente Berechnungen steht Ihnen unser [Boyle-Mariotte-Gesetz Rechner](/de/rechner/boyle-mariotte-gesetz-rechner) zur Verfügung.

## Physikalische Grundlagen und mathematische Formulierung

### Herleitung aus der thermischen Zustandsgleichung

Das Boyle-Mariotte-Gesetz ist ein Spezialfall der idealen Gasgleichung (`p × V = n × R × T`). Bleiben Stoffmenge `n` (in `mol`) und absolute Temperatur `T` (in `K`) konstant, bleibt mit der Gaskonstante `R = 8,3145 J/(mol·K)` auch das Produkt `p × V` konstant:

```text
p₁ × V₁ = p₂ × V₂ = konstant   (bei T = konstant, n = konstant)
```

Daraus folgen die vier Arbeitsformeln:

- Enddruck: `p₂ = (p₁ × V₁) / V₂`
- Endvolumen: `V₂ = (p₁ × V₁) / p₂`
- Anfangsdruck: `p₁ = (p₂ × V₂) / V₁`
- Anfangsvolumen: `V₁ = (p₂ × V₂) / p₁`

Grafisch bildet die Funktion `p(V)` eine rechteckige Hyperbel (**Isotherme**), die sich mit steigender Temperatur vom Ursprung nach rechts oben verschiebt.

### Parameter und normgerechte Einheiten (SI und DACH-Praxis)

Nach DIN 1301 und ISO 80000-4 ist Pascal (`1 Pa = 1 N/m²`) die SI-Basiseinheit des Drucks. In der DACH-Ingenieur- und Taucherpraxis dominieren Bar (`bar`) und Hektopascal (`hPa`):

- `1 bar = 100.000 Pa = 100 kPa = 1.000 hPa`
- `1 atm = 1,01325 bar = 101.325 Pa`
- `1 m³ = 1.000 L = 1.000 dm³ = 1.000.000 mL`

Da sich identische Einheiten beidseitig kürzen, genügen einheitliche Paare (`p₁`/`p₂` sowie `V₁`/`V₂`) und die konsequente Nutzung des **Absolutdrucks**.

## Schritt-für-Schritt-Rechenbeispiel: Atemgasvorrat einer Tauchflasche

Eine Stahl-Tauchflasche besitzt ein Innenvolumen von `V₁ = 12,0 L` und ist nach Temperaturausgleich im Wasser (`10 °C` bzw. `283,15 K`) auf einen Absolutdruck von `p₁ = 200 bar` gefüllt. Welches entspannte Atemgasvolumen `V₂` steht in `20 m` Süßwassertiefe bereit?

1. **Umgebungsdruck bestimmen:** An der Oberfläche herrschen `1,0 bar` Luftdruck; je `10 m` Wassertiefe steigt der Druck um `1,0 bar`. In `20 m` Tiefe gilt:
   `p₂ = 1,0 bar + (20 m / 10 m) × 1,0 bar = 3,0 bar` (absolut)
2. **Bekannte Größen:** `p₁ = 200 bar`, `V₁ = 12,0 L`, `p₂ = 3,0 bar`.
3. **Umstellen und berechnen:**
   `V₂ = (200 bar × 12,0 L) / 3,0 bar = 2.400 bar·L / 3,0 bar = 800 L`

In `20 m` Tiefe entsprechen die komprimierten `12,0 L` einem Atemvolumen von **`800 L`** (an der Oberfläche `2.400 L`). Bei einem Atemminutenvolumen von `20 L/min` reicht der Vorrat in `20 m` Tiefe rechnerisch `40 Minuten` – abzüglich Sicherheitsreserve.

## Druck-Volumen-Szenarien und Realgasabweichungen im Vergleich

Die Übersicht zeigt für eine Gasmenge mit dem Ausgangszustand `10,00 L` bei `1,00 bar` (`p × V = 10,00 bar·L`, `20 °C`) das Idealvolumen sowie reale Abweichungen.

| Anwendung / Betriebszustand | Absolutdruck `p` | Ideales Volumen `V` | Faktor vs. `1 bar` | Realgas-Hinweis (Luft bei `20 °C`) |
| :--- | :--- | :--- | :--- | :--- |
| Grobvakuum-Verpackung | `0,10 bar` | `100,00 L` | `10,00 ×` | Praktisch ideal (< 0,05 % Abweichung) |
| Normaldruck auf Meereshöhe | `1,00 bar` | `10,00 L` | `1,00 ×` | Referenzwert; ideal (< 0,1 % Abweichung) |
| Fahrradreifen (~`5 bar` Überdruck) | `6,00 bar` | `1,67 L` | `0,167 ×` | Nahezu ideal (~`0,2 %` Abweichung) |
| Industrielles Druckluftnetz | `8,00 bar` | `1,25 L` | `0,125 ×` | Sehr geringe Abweichung (< 0,4 %) |
| Tauchen in `30 m` Tiefe | `4,00 bar` | `2,50 L` | `0,250 ×` | Für Feldberechnungen voll exakt |
| Hochdruckflasche (`200 bar`) | `200,00 bar` | `0,050 L` | `0,005 ×` | Realgasfaktor `Z ≈ 1,04` (~`4 %` Abweichung) |

## Praxisrelevante Anwendungen, Fehlerquellen und Grenzen

### Technische und medizinische Einsatzgebiete

In der **Pneumatik, Kältetechnik und Verfahrenstechnik** dient das Boyle-Mariotte-Gesetz zur Auslegung von Druckluftspeichern, Membran-Ausdehnungsgefäßen in Heizungsanlagen und Gasfedern. Bei der Abnahme von Druckbehältern nach der europäischen Druckgeräterichtlinie (2014/68/EU) hilft das Gesetz zudem bei der Abschätzung gespeicherter Kompressionsenergie im Versagensfall, da ein großes Volumen unter hohem Druck erhebliche Expansionsarbeit freisetzt.

Auch die **Atemmechanik** beim Menschen folgt diesem Prinzip: Senkt sich das Zwerchfell, vergrößert sich das Brustkorbvolumen; der Alveolardruck sinkt um `2` bis `3 hPa` unter den äußeren Luftdruck, sodass Atemluft passiv einströmt. Bei einer **medizinischen Injektionsspritze** erzeugt das Zurückziehen des Kolbens denselben Unterdruckeffekt, wodurch der höhere Umgebungsdruck die Flüssigkeit in den Zylinder presst. Umgekehrt steigt beim Tauchen mit angehaltenem Atem während des Auftauchens die Gefahr eines Lungenbarotraumas, weil sich eingeschlossene Luft zwischen `10 m` Tiefe (`2 bar`) und Wasseroberfläche (`1 bar`) im Volumen verdoppelt.

### Typische Rechenfehler und physikalische Gültigkeitsgrenzen

Die häufigste Fehlerquelle ist das **Verwechseln von Überdruck und Absolutdruck**. Zeigt ein Reifenmanometer `2,4 bar` Überdruck an, beträgt der physikalische Absolutdruck `2,4 bar + 1,013 bar = 3,413 bar`. Rechnen ohne Luftdruck-Addition erzeugt Volumenfehler von über `30 %`.

Zusätzlich gelten zwei physikalische Grenzen:

1. **Nicht-isotherme Prozesse:** Bei schneller Kompression ohne Wärmeaustausch erwärmt sich das Gas gemäß dem Adiabatengesetz (`p × V^κ = konstant`, `κ ≈ 1,4` für Luft), sodass der Druck deutlich stärker steigt.
2. **Hohe Drücke und tiefe Temperaturen:** Bei starker Verdichtung oder nahe am Siedepunkt greifen das Eigenvolumen der Moleküle und Anziehungskräfte, die über die **Van-der-Waals-Gleichung** oder den Realgasfaktor `Z` korrigiert werden. Kohlenstoffdioxid (`CO₂`) verflüssigt sich bei `20 °C` bereits ab etwa `57 bar`, womit das Gasgesetz dort endet.
