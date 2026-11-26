---
title: "Das Ohmsche Gesetz erklärt: Die Basis der Elektronik"
description: "Meistern Sie das Ohmsche Gesetz (U = R × I) mit verständlichen Herleitungen, der Wasser-Analogie, Rechenbeispielen, Grenzbedingungen und unserem Ohmsches Gesetz Rechner."
category: "Math & Science"
relatedCalculator: "ohms-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum verwendet man im Deutschen U für Spannung statt V?"
    answer: "Im deutschsprachigen Raum sowie in den Normen DIN 1304 und IEC 60027 steht das Formelzeichen U (abgeleitet vom lateinischen urgere für drängen) eindeutig für die elektrische Spannung, während V als Einheitenzeichen für Volt reserviert bleibt. In englischsprachigen Unterlagen wird dagegen für beide Bedeutungen V (Voltage und Volt) verwendet."
  - question: "Gilt das Ohmsche Gesetz auch für LEDs, Dioden oder Glühlampen?"
    answer: "Nein, diese Bauteile verhalten sich nicht-ohmsch. Bei einer LED steigt der Strom oberhalb der Durchlassspannung exponentiell an; bei einer Glühlampe nimmt der Widerstand des Wolframfadens mit steigender Temperatur stark zu. Das Ohmsche Gesetz gilt in seiner linearen Form R = konstant nur für ohmsche Leiter bei gleichbleibender Temperatur – etwa Metallschichtwiderstände."
  - question: "Wie berechne ich einen passenden Vorwiderstand für eine LED?"
    answer: "Subtrahieren Sie zuerst die Durchlassspannung der LED (U_LED, typischerweise 1,8 bis 3,3 V) von der Versorgungsspannung (U_ges), um den Spannungsabfall am Widerstand (U_R) zu erhalten. Teilen Sie diesen Wert anschließend durch den gewünschten Betriebsstrom in Ampere: R = (U_ges − U_LED) / I."
  - question: "Was passiert physikalisch bei einem Kurzschluss gemäß dem Ohmschen Gesetz?"
    answer: "Bei einem Kurzschluss werden Plus- und Minuspol über eine extrem niederohmige Verbindung (R nahe 0 Ω) direkt miteinander verbunden. Da I = U / R gilt, schnellt die Stromstärke schlagartig auf extrem hohe Werte – begrenzt nur noch durch den Innenwiderstand der Quelle und den Leiterwiderstand. Gemäß P = I² × R erhitzt sich das Kabel in Sekundenbruchteilen bis zur Brandgefahr."
  - question: "Kann man das Ohmsche Gesetz auch in Wechselstromkreisen (AC) anwenden?"
    answer: "Für rein ohmsche Verbraucher wie Heizstäbe, Backöfen oder konventionelle Glühlampen gilt U = R × I auch bei Wechselspannung unmittelbar über die Effektivwerte. Sobald jedoch Spulen (Induktivitäten) oder Kondensatoren (Kapazitäten) beteiligt sind, muss der ohmsche Widerstand R durch den frequenzabhängigen Scheinwiderstand Z (Impedanz) ersetzt werden."
---

Wer elektrische Schaltungen verstehen, Bauteile sicher dimensionieren oder Fehler in elektronischen Geräten eingrenzen möchte, beginnt beim **Ohmschen Gesetz**. Formuliert von Georg Simon Ohm im Jahr 1827, beschreibt es den fundamentalen Zusammenhang zwischen elektrischer Spannung `U`, Stromstärke `I` und elektrischem Widerstand `R`: In einem linearen Leiter ist die Stromstärke bei konstanter Temperatur direkt proportional zur angelegten Spannung (`U = R × I`).

Gemeinsam mit der Leistungsformel (`P = U × I`) ermöglicht diese Gleichung die Berechnung nahezu aller Gleichstrom-Grundschaltungen – vom LED-Vorwiderstand bis zur Leitungsabsicherung. Für schnelle Umstellungen nach Spannung, Strom oder Widerstand steht Ihnen unser [Ohmsches Gesetz Rechner](/de/rechner/ohmsches-gesetz-rechner) zur Verfügung.

## Physikalische Grundlagen, Formeldreieck und Wasser-Analogie

### Spannung, Stromstärke und Widerstand im Detail

Die drei Größen bilden ein geschlossenes Formeldreieck, sodass sich aus zwei bekannten Messwerten stets die fehlende Größe exakt bestimmen lässt:

```text
U = R × I    |    I = U / R    |    R = U / I
```

Nach DIN 1304 und IEC gelten folgende Definitionen (im Englischen steht oft `V` statt `U`):

- **U (Spannung):** Elektrische Potenzialdifferenz in Volt (`V`), der Antrieb für Ladungsträger.
- **I (Stromstärke):** Ladung pro Sekunde in Ampere (`A`, `1 A = 1 C/s`).
- **R (Widerstand):** Hemmung des Elektronenflusses in Ohm (`Ω`, `1 Ω = 1 V/A`).

Die **Wasser-Analogie** macht das Verhältnis greifbar: Wasserdruck aus einem Hochtank entspricht der **Spannung `U`**, die Durchflussmenge pro Sekunde der **Stromstärke `I`** und eine Rohrverengung dem **Widerstand `R`**. Anders als bei einem offenen Wasserschlauch fließt elektrischer Strom jedoch ausschließlich in einem geschlossenen Stromkreis, und während sich elektrische Felder nahezu mit Lichtgeschwindigkeit ausbreiten, driften einzelne Elektronen nur langsam durch den Leiter.

### Kombination mit der elektrischen Leistung

Durch Einsetzen von `U = R × I` in die elektrische Leistungsformel `P = U × I` ergeben sich zwei besonders hilfreiche Gleichungen für die thermische Belastung von Bauelementen und Leitungen: `P = I² × R` zeigt unmittelbar, dass eine Verdopplung der Stromstärke die entstehende Verlustwärme am Widerstand vervierfacht. Die umgeformte Variante `P = U² / R` kommt hingegen überall dort zum Einsatz, wo Verbraucher wie elektrische Heizpatronen oder Glühdrähte an einer konstanten Netzspannung betrieben werden und sich die Heizleistung aus dem gegebenen Kalt- oder Warmwiderstand ergibt.

### Grenzen des Ohmschen Gesetzes

Streng genommen gilt das Ohmsche Gesetz im engeren physikalischen Sinne ausschließlich für Bauteile mit konstantem Widerstand unabhängig von der angelegten Spannungshöhe und Stromrichtung (**ohmsche Leiter**, etwa Präzisions-Metallschichtwiderstände bei stabilisierter Umgebungstemperatur). Nicht-ohmsche Bauelemente wie Siliziumdioden, Leuchtdioden, Transistoren, Zener-Dioden oder Glühfäden besitzen stark gekrümmte Strom-Spannungs-Kennlinien: Ihr differenzieller Widerstand verändert sich laufend mit der angelegten Spannung oder der Eigenerwärmung. Bei Wechselstromschaltungen mit Spulen oder Kondensatoren treten zusätzlich frequenzabhängige Phasenverschiebungen zwischen Strom und Spannung auf, die über die komplexe Impedanz `Z` anstelle des reinen Gleichstromwiderstands `R` berechnet werden müssen.

## Schritt-für-Schritt-Beispiel: Vorwiderstand einer LED berechnen

Eine rote Standard-Leuchtdiode besitzt laut Datenblatt eine typische Durchlassspannung von `U_LED = 2,0 V` und soll bei ihrem empfohlenen Nennstrom `I_LED = 20 mA` (`0,020 A`) an einer stabilisierten `12,0-V`-Gleichspannungsquelle betrieben werden. Da oberhalb der Durchlassspannung bereits kleinste Spannungsanstiege zu einem zerstörerischen Überstrom führen, ist zwingend ein strombegrenzender Vorwiderstand in Reihe erforderlich.

1. **Spannungsabfall am Vorwiderstand berechnen:** In der Reihenschaltung trägt der Widerstand die Differenzspannung:
   `U_R = U_ges − U_LED = 12,0 V − 2,0 V = 10,0 V`
2. **Erforderlichen Widerstandswert ermitteln:** Rechnen Sie `20 mA` in `0,020 A` um und setzen Sie in `R = U / I` ein:
   `R = 10,0 V / 0,020 A = 500 Ω`
3. **Normwert wählen:** Da `500 Ω` kein E24-Standardwert ist, wählen Sie den nächsthöheren Wert `510 Ω`. Der reale Strom beträgt damit:
   `I_real = 10,0 V / 510 Ω = 0,01961 A = 19,61 mA`
4. **Verlustleistung prüfen:** Am Widerstand entsteht folgende Wärme:
   `P_R = 10,0 V × 0,01961 A = 0,196 W`
   Ein `0,25-W`-Widerstand wäre zu `78 %` ausgelastet; sicherer ist ein `0,5-W`-Modell. Alle Werte prüfen Sie bequem im [Ohmsches Gesetz Rechner](/de/rechner/ohmsches-gesetz-rechner).

## Szenario-Tabelle: Spannung, Strom, Widerstand und Verlustleistung

| Schaltung / Szenario | Spannung (U) | Widerstand (R) | Stromstärke (I) | Leistung (P) | Technische Bewertung |
| --- | --- | --- | --- | --- | --- |
| Mikrocontroller Pull-up-Kreis | `3,3 V` | `10.000 Ω` (`10 kΩ`) | `0,33 mA` | `1,09 mW` | Vernachlässigbare Eigenwärme |
| USB-Standardverbraucher | `5,0 V` | `2,50 Ω` | `2,00 A` | `10,0 W` | Typische Last an USB-Netzteilen |
| Kfz-Halogenscheinwerfer | `12,0 V` | `2,62 Ω` (heiß) | `4,58 A` | `55,0 W` | Kalter Einschaltstrom deutlich höher |
| Heizlüfter (DACH-Netz) | `230 V` (RMS) | `26,45 Ω` | `8,70 A` | `2.000 W` | Erfordert abgesicherte `16-A`-Leitung |
| Körper (Hand–Hand, trocken) | `230 V` (RMS) | `≈ 1.000 Ω` | `230 mA` | `52,9 W` | Lebensgefährlich (Kammerflimmern) |
| Kurzschluss Autobatterie | `12,0 V` | `0,015 Ω` (Kreis) | `800 A` | `9.600 W` | Akute Schmelz- und Brandgefahr |

## Praxisanwendung, häufige Messfehler und Sicherheitshinweise

In Labor, Industrie und Elektrohandwerk unterstützt das Ohmsche Gesetz täglich die präzise Auswahl von Shunt-Messwiderständen, die korrekte Leitungsdimensionierung zur Vermeidung unzulässiger Spannungsverluste sowie messtechnische Prüfungen von Erdungs-, Schutzleiter- und Isolationswiderständen gemäß **DIN VDE 0100**. Gerade bei der Fehlersuche an ausgefallenen Geräten ermöglicht der Abgleich von Soll- und Ist-Widerständen eine schnelle Eingrenzung von Leitungsunterbrechungen oder schleichenden Kontaktkorrosionen. Vermeiden Sie bei Messung und Auslegung insbesondere diese fünf verbreiteten Fehler:

- **Vorsätze übersehen:** Milliampere (`mA = 10⁻³ A`) oder Kiloohm (`kΩ = 10³ Ω`) müssen vor dem Rechnen in Ampere und Ohm konvertiert werden.
- **Widerstand unter Spannung messen:** Multimeter im Ohm-Bereich speisen eigene Messspannung ein; Fremdspannung verfälscht Messwerte oder zerstört das Gerät.
- **Innenwiderstand ignorieren:** Jede Spannungsquelle besitzt einen Innenwiderstand `R_i`, sodass die Klemmenspannung unter Last gemäß `U_Kl = U_0 − I × R_i` sinkt.
- **Kaltleiter-Effekt vergessen:** Bei Glühfäden oder Motoren liegt der Kaltwiderstand deutlich unter dem Betriebswert, was hohe Einschaltströme verursacht.
- **Personenschutz missachten:** Nach IEC 60479 sind Wechselströme ab `30 bis 50 mA` durch den Oberkörper lebensbedrohlich; Fehlerstrom-Schutzschalter (RCD/FI) müssen spätestens bei `30 mA` abschalten.
