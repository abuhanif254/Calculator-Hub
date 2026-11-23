---
title: "Wissenschaftlicher Taschenrechner"
metaTitle: "Wissenschaftlicher Taschenrechner Online | RAD, DEG, ln"
description: "Berechnen Sie Trigonometrie in Grad und Bogenmaß, Logarithmen, Potenzen, Wurzeln und verschachtelte Klammerausdrücke präzise online."
metaDescription: "Kostenloser wissenschaftlicher Online-Taschenrechner für Trigonometrie (RAD/DEG), Logarithmen, Wurzeln, Potenzen und Klammerausdrücke mit Rechenregeln."
metaKeywords: "wissenschaftlicher taschenrechner, online taschenrechner mathe, trigonometrie rechner rad deg, logarithmus rechner ln log, wurzel potenz rechner"
faqs:
  - question: "Warum liefert sin(30) manchmal −0,988 statt 0,5?"
    answer: "Das liegt am eingestellten Winkelmodus. Standardmäßig arbeitet ein wissenschaftlicher Rechner häufig im Bogenmaß (RAD), in dem 30 für 30 Radianten (rund 1.719°) steht. Schalten Sie vor Winkelberechnungen in Grad stets auf DEG um, damit sin(30) exakt 0,5 ergibt."
  - question: "Was ist der Unterschied zwischen ln und log auf dem Taschenrechner?"
    answer: "Die Taste ln berechnet den natürlichen Logarithmus zur Eulerschen Zahl e (≈ 2,71828), wie er bei Wachstums- und Zerfallsprozessen auftritt. Die Taste log steht auf wissenschaftlichen Taschenrechnern für den dekadischen Logarithmus zur Basis 10 (im Deutschen oft lg geschrieben), etwa für Dezibel- oder pH-Wert-Berechnungen."
  - question: "Wie berechne ich einen Logarithmus zu einer beliebigen Basis wie log₂(64)?"
    answer: "Nutzen Sie die Basiswechselformel: Teilen Sie den Logarithmus des Arguments durch den Logarithmus der gewünschten Basis, also ln(64) ÷ ln(2) oder log(64) ÷ log(2). Beide Ausdrücke liefern exakt 6."
  - question: "Wie gehe ich mit höheren Wurzeln wie der Kubikwurzel um?"
    answer: "Neben der Quadratwurzeltaste √ lassen sich beliebige n-te Wurzeln über gebrochene Exponenten mit der Potenztaste x^y eingeben. Die dritte Wurzel aus 125 schreiben Sie als 125^(1÷3) und erhalten 5. Achten Sie dabei unbedingt auf die Klammern um den Bruchexponenten."
  - question: "Warum meldet der Rechner bei tan(90°) oder ln(0) einen Fehler?"
    answer: "Der Tangens entspricht sin(α) / cos(α) und hat bei 90° (π/2 rad) sowie allen ungeraden Vielfachen eine Polstelle, weil dort durch cos(90°) = 0 geteilt würde. Ebenso sind Logarithmen in den reellen Zahlen ausschließlich für strikt positive Argumente (x > 0) definiert."
---

Ob in der gymnasialen Oberstufe, im MINT-Studium, in der Vermessungstechnik oder bei schnellen Plausibilitätsprüfungen im Ingenieurbüro: Sobald Winkelbeziehungen, exponentielles Wachstum, Pegelrechnungen oder verschachtelte Terme ins Spiel kommen, stoßen einfache Grundrechenrechner sofort an ihre Grenzen. Unser **wissenschaftlicher Taschenrechner** verarbeitet vollständige mathematische Ausdrücke mit struktureller Klammerung, automatischer Klammervervollständigung und strikter Operatorrangfolge. Auf dem kompakten Tastenfeld stehen sämtliche Kernfunktionen aus Trigonometrie (`sin`, `cos`, `tan` im umschaltbaren Modus **RAD** oder **DEG**), Logarithmen (`ln` zur Basis `e`, dekadischer `log` zur Basis `10`), Potenzen (`x^y`), Quadratwurzeln (`√`) sowie die beiden fundamentalen Naturkonstanten **π** (`3,14159265…`) und **e** (`2,71828182…`) bereit.

## Operatorrangfolge und zentrale Funktionsgesetze

Anders als simple Kassier-Rechner, die jede Eingabe stur von links nach rechts auswerten, löst ein wissenschaftlicher Taschenrechner komplexe Eingabezeilen streng nach der internationalen mathematischen Hierarchie auf – im deutschsprachigen Unterricht prägnant als **KLA-PO-PU-STRI** gelehrt:

1. **Klammern** von innen nach außen (`( … )`)
2. **Potenzen, Wurzeln und Funktionsaufrufe** (`x^y`, `√(x)`, `sin(x)`, `ln(x)`)
3. **Punktrechnung** (`×`, `÷`) von links nach rechts
4. **Strichrechnung** (`+`, `−`) von links nach rechts

Für die tägliche Arbeit mit Winkeln, Logarithmen und Potenzen gelten dabei vier verbindliche Grundgleichungen:

```text
Winkelumrechnung:      α_rad = α_deg × (π / 180°)     bzw.   α_deg = α_rad × (180° / π)
Logarithmus-Basis:     log_b(x) = ln(x) / ln(b) = log_10(x) / log_10(b)   (x > 0, b > 0, b ≠ 1)
Allgemeine Wurzel:     ⁿ√x = x^(1 / n)                und    x^(−k) = 1 / x^k
Umkehrbeziehungen:     e^(ln(x)) = x                  und    10^(log_10(x)) = x
```

Dabei steht **α_deg** für den Winkel im Gradmaß (`DEG`, Vollkreis gleich `360°`), **α_rad** für den Winkel im Bogenmaß (`RAD`, Vollkreis gleich `2π ≈ 6,283185 rad`), **x** für das Funktionsargument und **b** für eine beliebige Logarithmusbasis. In der Physik, der Wechselstromtechnik und der höheren Analysis ist das dimensionslose Bogenmaß verpflichtender Standard, weil Ableitungen wie `(sin x)' = cos x` sowie Kleinwinkelnäherungen (`sin(x) ≈ x`) ausschließlich in **RAD** ohne Umrechnungsfaktor gelten. Im Bauwesen, in der Kartografie, in der Navigation und in der Schulgeometrie dominiert dagegen das vertraute Gradmaß **DEG**.

## Rechenbeispiele aus Vermessung, Akustik und Wachstumsrechnung

### Beispiel 1: Höhen- und Distanzmessung eines Sendemasts (Trigonometrie und Wurzel)

Ein Vermessungstechniker steht im waagerechten Abstand von **d = 42,0 m** vor einem Sendemast. Sein Neigungsmesser in **h_0 = 1,70 m** Augenhöhe zeigt zur Mastspitze einen Höhenwinkel von **α = 35°** an. Gesucht sind die Gesamthöhe **h** des Masts sowie die direkte Schrägdistanz **s** zur Spitze.

1. **Winkelmodus auf DEG umschalten:** Prüfen Sie oben links im Display, dass **DEG** aktiv markiert ist, da der Rechner beim Start im Bogenmaß (**RAD**) öffnet.
2. **Höhendifferenz berechnen:** Geben Sie `1.7 + 42 × tan(35)` ein. Da `tan(35°) ≈ 0,700208` beträgt, liefert der zweite Term `42 × 0,700208 ≈ 29,41 m`; zusammen mit der Augenhöhe entsteht eine Gesamthöhe von **h = 31,11 m**.
3. **Schrägdistanz bestimmen:** Über den Kosinus im rechtwinkligen Dreieck folgt `42 ÷ cos(35) = 42 ÷ 0,819152 ≈ 51,27 m`.
4. **Gegenprobe über den Satz des Pythagoras:** Mit der Quadratwurzeltaste ergibt `√(42^2 + 29.4087^2) = √(1.764 + 864,87) = √2.628,87 ≈ 51,27 m`. Beide Rechenwege stimmen auf den Zentimeter genau überein.

### Beispiel 2: Schallleistungspegel und Verdopplungszeit (Logarithmen)

- **Akustik (dekadischer Logarithmus):** Eine Industriemaschine strahlt die 250-fache Schallleistung einer Referenzquelle ab. Der Pegelunterschied in Dezibel (`dB`) beträgt `10 × log(250) = 10 × 2,39794 ≈ 23,98 dB`. Eine Verdopplung der Schallleistung entspricht dabei stets einem Anstieg um rund `3,01 dB`.
- **Exponentielles Wachstum (natürlicher Logarithmus):** Wie viele Jahre benötigt eine Größe bei **6,0 %** jährlichem Zuwachs, um sich zu verdoppeln? Über die Basiswechselformel `ln(2) ÷ ln(1.06) = 0,693147 ÷ 0,058269` liefert der Rechner exakt **11,90 Jahre**.

## Referenztabelle: Exakte trigonometrische Standardwerte

Diese Kernwerte dienen zur schnellen Kontrolle, ob Winkelmodus (**RAD** versus **DEG**) und Vorzeichen im jeweiligen Quadranten korrekt eingestellt sind:

| Winkel (DEG) | Bogenmaß (RAD) | Sinus (`sin`) | Kosinus (`cos`) | Tangens (`tan`) |
| :--- | :--- | :--- | :--- | :--- |
| **0°** | `0` (`0,0000`) | `0` | `1` | `0` |
| **30°** | `π / 6` (`0,5236`) | `0,5` (`1/2`) | `0,8660` (`√3 / 2`) | `0,5774` (`1 / √3`) |
| **45°** | `π / 4` (`0,7854`) | `0,7071` (`√2 / 2`) | `0,7071` (`√2 / 2`) | `1` |
| **60°** | `π / 3` (`1,0472`) | `0,8660` (`√3 / 2`) | `0,5` (`1/2`) | `1,7321` (`√3`) |
| **90°** | `π / 2` (`1,5708`) | `1` | `0` | nicht definiert |
| **180°** | `π` (`3,1416`) | `0` | `−1` | `0` |

## Häufige Bedienfehler und bewährte Rechenstrategien

- **Vor jeder Winkelrechnung RAD und DEG prüfen:** Der häufigste Fehler in Klausuren, Abschlussprüfungen und Baustellenberechnungen entsteht durch den falschen Winkelmodus. Ein zwei Sekunden kurzer Kontrolltest – `sin(30)` muss im Gradmaß exakt `0,5` liefern – verhindert grobe Folgefehler.
- **Negative Basen beim Potenzieren stets einklammern:** Der Ausdruck `−3^2` wird gemäß Operatorrangfolge als `−(3^2) = −9` ausgewertet, weil die Potenz enger bindet als das Vorzeichen. Möchten Sie die negative Zahl quadrieren, setzen Sie zwingend Klammern: `(−3)^2 = 9`.
- **Multiplikationszeichen vor Klammern und Konstanten explizit setzen:** Schreiben Sie statt verkürzter Handschrift wie `2π` oder `3(4+5)` im Online-Rechner stets `2 × π` und `3 × (4 + 5)`, damit der Ausdrucksparser jeden Faktor ohne Mehrdeutigkeit erkennt.
- **Dezimaltrennzeichen und Weiterrechnung nutzen:** Internationale Web-Rechner arbeiten am Tastenfeld mit dem Dezimalpunkt (`.` statt `,`). Geben Sie `1.7` statt `1,7` ein und runden Sie Zwischenergebnisse nicht von Hand ab – nach einem Klick auf `=` übernimmt der Rechner den ungerundeten Endwert direkt für den nächsten Rechenschritt.
- **Klammerpaare bei Produkten im Nenner setzen:** Für den Quotienten `10 / (2 × π)` liefert die ungekapselte Eingabe `10 ÷ 2 × π` ein um den Faktor `π²` zu großes Resultat (`5π ≈ 15,71`), weil Division und Multiplikation gleichrangig von links nach rechts ausgewertet werden. Mit Klammern um den Nenner entsteht korrekt `1,5915`.
- **Prozenttaste nicht blind für Aufschläge verwenden:** Bei vielen wissenschaftlichen Rechnern und Programmiersprachen steht `%` für den Restwert-Operator (Modulo) und nicht für den Faktor `0,01`. Für Prozentrechnungen wie einen 19-prozentigen Mehrwertsteueraufschlag multiplizieren Sie deshalb sicherer direkt mit `1.19`.
- **Definitionsbereiche vorab prüfen:** Quadratwurzeln sind in den reellen Zahlen nur für nichtnegative Argumente definiert, Logarithmen ausschließlich für strikt positive Zahlen und der Tangens besitzt bei ungeraden Vielfachen von `90°` Polstellen. Zeigt das Display eine Fehlermeldung an, liegt meist ein Vorzeichen- oder Klammerfehler innerhalb des Funktionsarguments vor.
