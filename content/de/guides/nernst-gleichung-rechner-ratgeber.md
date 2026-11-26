---
title: "Nernst-Gleichung-Rechner: Elektrochemie"
description: "Verstehen Sie, wie die Nernst-Gleichung das Zellpotenzial unter Nicht-Standardbedingungen berechnet, und nutzen Sie unseren Rechner."
category: "Math & Science"
relatedCalculator: "nernst-equation-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wann stimmt das reale Zellpotenzial E exakt mit dem Standardzellpotenzial E° überein?"
    answer: "Das reale Zellpotenzial E entspricht genau dann dem Standardzellpotenzial E°, wenn der Reaktionsquotient Q den Wert 1 annimmt — also etwa, wenn alle gelösten Ionen die Aktivität bzw. ideale Konzentration 1 mol/L und alle Gase einen Partialdruck von 1 bar aufweisen. Da ln(1) = 0 ist, verschwindet der Korrekturterm der Nernst-Gleichung unabhängig von der Temperatur."
  - question: "Woher stammt der Faktor 0,0592 V in der vereinfachten Nernst-Gleichung bei 25 °C?"
    answer: "Der Wert 0,05916 V (oft auf 0,0592 V gerundet) entsteht durch Kombination der Konstanten (R × T / F) × ln(10) bei T = 298,15 K (25 °C). Mit R = 8,3145 J/(mol·K), F = 96.485 C/mol und ln(10) = 2,302585 ergibt sich exakt (8,3145 × 298,15 / 96.485) × 2,302585 = 0,05916 V, während der natürliche Logarithmus ln(Q) durch den dekadischen Logarithmus log₁₀(Q) ersetzt wird."
  - question: "Kann eine Konzentrationszelle aus zwei identischen Elektrodenmetallen eine elektrische Spannung liefern?"
    answer: "Ja. Bei einer Konzentrationszelle bestehen beide Halbzellen aus demselben Elektrodenmaterial (beispielsweise zwei Kupferelektroden in CuSO₄-Lösungen unterschiedlicher Konzentration), sodass E° = 0 V beträgt. Solange sich die Konzentrationen unterscheiden (Q ≠ 1), erzeugt das System gemäß der Nernst-Gleichung ein messbares Potenzial, bis beide Lösungen identische Konzentrationen erreicht haben."
  - question: "Was passiert laut Nernst-Gleichung, wenn eine Batterie vollständig entladen ist?"
    answer: "Während der Entladung verbrauchen sich die Edukte, die Produkte reichern sich an und der Reaktionsquotient Q wächst kontinuierlich. Dadurch steigt der Abzugsterm (RT / nF) × ln(Q), bis er genau den Betrag von E° erreicht. In diesem Moment gilt E = 0 V und Q = Keq — die galvanische Zelle hat ihr chemisches Gleichgewicht erreicht."
  - question: "Warum muss bei der Temperaturkorrektur neben T auch E° beachtet werden?"
    answer: "Die explizite Temperatur T im Faktor RT / nF skaliert nur den Konzentrations-Korrekturterm. Bei stark von 25 °C abweichenden Betriebstemperaturen ändert sich jedoch auch das Standardzellpotenzial E° selbst über den Temperaturkoeffizienten dE°/dT = ΔS° / (n × F), weshalb Hochtemperatur-Berechnungen idealerweise das temperaturkorrigierte E°(T) verwenden."
---

Tabellenwerte für **Standardzellpotenziale (`E°`)** gelten streng genommen nur unter idealisierten Laborbedingungen: `25 °C` (`298,15 K`), `1 mol/L` Konzentration für gelöste Ionen und `1 bar` Partialdruck für Gase. Im praktischen Betrieb arbeitet jedoch kaum eine Batterie, kein Sensor und kein industrieller Elektrolyseur unter diesen Standardwerten: Beim Entladen einer Zelle steigen die Produktkonzentrationen an der Anode, während die Reaktanten an der Kathode verarmen — die Klemmenspannung sinkt schrittweise ab.

Die von Walther Nernst formulierte **Nernst-Gleichung** verknüpft die Thermodynamik des chemischen Gleichgewichts mit der Elektrochemie und berechnet das **reale Elektroden- oder Zellpotenzial (`E`)** für beliebige Konzentrationen, Partialdrücke und Temperaturen. Mit unserem [Nernst-Gleichung-Rechner](/de/rechner/nernst-gleichung-rechner) ermitteln Sie sowohl das exakte Zellpotenzial bei freier Temperaturwahl als auch einzelne Halbzellenpotenziale ohne manuelle Konstantenfehler.

## Methodik: Die Nernst-Gleichung und ihre Parameter

Die allgemeine Form der Nernst-Gleichung subtrahiert von der Standard-EMK `E°` einen logarithmischen Korrekturterm, der den Abstand zum chemischen Gleichgewicht abbildet:

```text
Allgemein (beliebige Temperatur T):
E = E° − (R × T / (n × F)) × ln(Q)

Dekadische Form bei 25 °C (298,15 K):
E = E° − (0,05916 V / n) × log₁₀(Q)
```

Für präzise Berechnungen müssen alle sieben Größen konsistent in SI-Einheiten eingesetzt werden:

- **`E`**: Reales Zell- oder Halbzellenpotenzial in Volt (`V`) unter den aktuellen Betriebsbedingungen.
- **`E°`**: Standardzellpotenzial in Volt (`V`) bei `298,15 K` (`E°_Kathode − E°_Anode`).
- **`R`**: Universelle Gaskonstante mit `8,3145 J/(mol·K)`.
- **`T`**: Absolute Temperatur in Kelvin (`K = °C + 273,15`).
- **`n`**: Anzahl der pro Formelumsatz übertragenen Mol Elektronen (dimensionslos, immer positiv).
- **`F`**: Faraday-Konstante (`96.485 C/mol`, entspricht `96.485 J/(V·mol)`).
- **`Q`**: Reaktionsquotient der ablaufenden Gesamtreaktion (Produkte im Zähler, Edukte im Nenner; reine Feststoffe und reine Flüssigkeiten erhalten den Faktor `1`).

Bei einer einzelnen Halbzelle, formuliert als Reduktion (`Ox + n e⁻ ⇄ Red`), lautet der Reaktionsquotient `Q = a(Red) / a(Ox)`. Bei Erhöhung der Konzentration der oxidierten Spezies sinkt `Q` und das Halbzellenpotenzial steigt an.

### Herleitung der Beziehung zur Gleichgewichtskonstanten

Da `ΔG = −n × F × E` und `ΔG = ΔG° + R × T × ln(Q)` gilt, folgt die Nernst-Gleichung unmittelbar durch Division durch `−n × F`. Im vollständig entladenen Zustand herrscht Gleichgewicht (`E = 0 V` und `Q = K_eq`), woraus sich die Gleichgewichtskonstante direkt bestimmen lässt:

```text
E° = (R × T / (n × F)) × ln(K_eq)
log₁₀(K_eq) = (n × E°) / 0,05916 V   (bei 25 °C)
```

## Schritt-für-Schritt-Beispiel: Teilentladenes Daniell-Element

Betrachten wir ein Daniell-Element aus Zink- und Kupferelektrode bei `25 °C` (`298,15 K`):

```text
Zn(s) + Cu²⁺(aq) ⇄ Zn²⁺(aq) + Cu(s)
```

Die Standardreduktionspotenziale betragen `E°(Cu²⁺/Cu) = +0,340 V` und `E°(Zn²⁺/Zn) = −0,760 V`, sodass sich `E°_Zelle = +0,340 V − (−0,760 V) = +1,100 V` ergibt. Pro Formelumsatz werden `n = 2` Elektronen übertragen.

In einer fortgeschritten entladenen Zelle liegen folgende Konzentrationen vor: `[Zn²⁺] = 1,50 mol/L` (Anreicherung an der Anode) und `[Cu²⁺] = 0,015 mol/L` (Verarmung an der Kathode).

1. **Aufstellen des Reaktionsquotienten `Q`**: Die reinen Metalle `Zn(s)` und `Cu(s)` werden mit `1` angesetzt und entfallen:
   `Q = [Zn²⁺] / [Cu²⁺] = 1,50 / 0,015 = 100`
2. **Berechnung des Vorfaktors bei `298,15 K`**:
   `(R × T) / (n × F) = (8,3145 × 298,15) / (2 × 96.485) = 2.478,97 / 192.970 = 0,012846 V`
3. **Berechnung des Logarithmus und Korrekturterms**:
   `ln(100) = 4,60517`
   `ΔE = 0,012846 V × 4,60517 = 0,05916 V`
   *(Kontrolle mit der 25-°C-Kurzform: `(0,05916 / 2) × log₁₀(100) = 0,02958 × 2 = 0,05916 V`.)*
4. **Bestimmung des realen Zellpotenzials `E`**:
   `E = 1,100 V − 0,05916 V = 1,0408 V ≈ 1,041 V`

Erhöht sich die Betriebstemperatur derselben Zelle auf `60 °C` (`333,15 K`), wächst der Abzugsterm auf `(8,3145 × 333,15 / 192.970) × 4,60517 = 0,06610 V`, wodurch das Potenzial allein durch den Entropie- und Konzentrationseinfluss auf `1,034 V` absinkt.

## Szenario-Analyse: Zellpotenzial bei Variation von Q (E° = 1,100 V, n = 2, 25 °C)

Die folgende Tabelle veranschaulicht, wie stark der Reaktionsquotient `Q` die tatsächliche Zellspannung entlang der Entladekurve beeinflusst:

| Reaktionsquotient Q | log₁₀(Q) | Korrekturterm −(0,05916 / 2) × log₁₀(Q) | Reales Zellpotenzial E | Chemischer Zustand der Zelle |
| :--- | :--- | :--- | :--- | :--- |
| `0,001` | `−3,0` | `+0,0887 V` | `1,189 V` | Stark eduktlastig (`[Cu²⁺] = 1.000 × [Zn²⁺]`) |
| `0,01` | `−2,0` | `+0,0592 V` | `1,159 V` | Frische Zelle, geringe Anodenionen |
| `1,0` | `0,0` | `0,0000 V` | `1,100 V` | Standardbedingungen (`E = E°`) |
| `100` | `+2,0` | `−0,0592 V` | `1,041 V` | Fortgeschrittene Entladung |
| `10⁶` | `+6,0` | `−0,1775 V` | `0,923 V` | Weitgehend erschöpfte Kathode |
| `1,54 × 10³⁷` (`= K_eq`) | `+37,19` | `−1,1000 V` | `0,000 V` | Gleichgewicht (Zelle vollständig entladen) |

## Sensorik, Korrosion und typische Anwendungsfehler

Die Nernst-Gleichung bildet das physikalische Messprinzip fast aller **potentiometrischen Sensoren**. Bei einer pH-Glaselektrode gilt für einfach geladene Hydroniumionen (`n = 1`) bei `25 °C` eine theoretische Steilheit von exakt **`−59,16 mV` pro pH-Einheit** (Nernst-Faktor). Auf demselben Prinzip basieren Lambda-Sonden aus Zirkoniumdioxid im Abgasstrang von Verbrennungsmotoren (Sauerstoffpartialdruck-Konzentrationszelle bei `600–800 °C`) sowie ionenselektive Elektroden (ISE) für Nitrat, Fluorid oder Kalium in der klinischen Diagnostik. Ebenso erklärt die Gleichung die **Belüftungskorrosion (Evans-Element)**: Saugschwache, sauerstoffarme Spalten unter Dichtungen werden gegenüber gut belüfteten Stahlbereichen automatisch zur Anode und korrodieren bevorzugt.

Vermeiden Sie in der rechnerischen Praxis vier häufige Fehlerquellen:

1. **Verwendung der 25-°C-Konstante bei anderen Temperaturen**: Die Näherung `0,05916 V` ist ausschließlich bei `298,15 K` gültig. Bei Körpertemperatur (`37 °C` = `310,15 K`) beträgt die Nernst-Steigung bereits `0,06154 V`.
2. **Verwechslung von `ln` und `log₁₀`**: In der allgemeinen `RT/nF`-Form steht der natürliche Logarithmus `ln(Q)`, in der `0,05916`-Kurzform der dekadische Logarithmus `log₁₀(Q)`. Eine Verwechslung verfälscht die Korrektur um den Faktor `2,3026`.
3. **Falsches Vorzeichen oder invertierter Quotient `Q`**: Ist die Gesamtreaktion umgekehrt aufgestellt oder werden Edukte in den Zähler gesetzt, kehrt sich das Vorzeichen des Potenzialshifts um.
4. **Abweichung durch Aktivitäten und Überspannungen**: Die Nernst-Gleichung liefert die **stromlose Leerlaufspannung (EMK)** unter Annahme idealer Aktivitäten. Unter elektrischer Last reduzieren Ohmsche Innenwiderstände sowie Aktivierungs- und Diffusionsüberspannungen die nutzbare Klemmenspannung zusätzlich; zudem treten bei realen Membranen Diffusionspotenziale auf.
