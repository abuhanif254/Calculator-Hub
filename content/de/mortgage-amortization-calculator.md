---
title: "Hypothekentilgungs-Rechner: Tilgungsplan & Baufinanzierung"
description: "Berechnen Sie Ihre monatliche Hypothekenrate, den detaillierten Tilgungsplan, die Restschuld nach der Zinsbindung und die Ersparnis durch höhere Tilgung."
metaTitle: "Hypothekentilgungs-Rechner | Tilgungsplan & Ratenrechner"
metaDescription: "Berechnen Sie Ihre monatliche Hypothekenrate und den kompletten Tilgungsplan. Vergleichen Sie Zinsen, Tilgung, Sondertilgungen und die Restschuld."
metaKeywords: "tilgungsrechner, hypothekenrechner, tilgungsplan baufinanzierung, restschuld berechnen, zinsen und tilgung, annuitätendarlehen, sondertilgung, anschlussfinanzierung"
faqs:
  - question: "Warum steigt der Tilgungsanteil bei einer gleichbleibenden Monatsrate von Monat zu Monat an?"
    answer: "Bei einem Annuitätendarlehen werden die Zinsen jeden Monat nur noch auf die aktuell verbleibende Restschuld berechnet. Da die Restschuld mit jeder Zahlung sinkt, verringert sich der monatliche Zinsbetrag kontinuierlich. Bei konstanter Gesamtrate fließt diese Differenz als sogenannte ersparte Zinsen eins zu eins in die zusätzliche Tilgung."
  - question: "Welche anfängliche Tilgungsrate ist bei einer Baufinanzierung empfehlenswert?"
    answer: "Finanzierungsberater im DACH-Raum empfehlen eine anfängliche Tilgung von mindestens 2,00 % bis 3,00 % pro Jahr. Bei einer zu niedrigen Tilgung von nur 1,00 % dauert die Entschuldung selbst bei moderaten Zinsen über 35 bis 40 Jahre, und am Ende einer 10-jährigen Zinsbindung ist noch ein Großteil der ursprünglichen Kreditsumme offen."
  - question: "Was passiert am Ende der Sollzinsbindung mit der verbleibenden Restschuld?"
    answer: "In Deutschland und Österreich wird der Zinssatz meist für 10, 15 oder 20 Jahre festgeschrieben, während die vollständige Tilgung länger dauert. Über die am Ende der Zinsbindung verbleibende Restschuld wird eine Anschlussfinanzierung abgeschlossen – entweder als Prolongation bei der bisherigen Bank, als Umschuldung zu einem neuen Kreditinstitut oder vorab über ein Forward-Darlehen."
  - question: "Wann gilt das gesetzliche Sonderkündigungsrecht nach § 489 BGB bei langen Zinsbindungen?"
    answer: "In Deutschland kann jeder Darlehensnehmer ein Immobiliendarlehen mit einer Sollzinsbindung von mehr als 10 Jahren gemäß § 489 Abs. 1 Nr. 2 BGB exakt 10 Jahre nach dem vollständigen Empfang der Darlehenssumme mit einer Frist von 6 Monaten ganz oder teilweise kündigen, ohne dass die Bank eine Vorfälligkeitsentschädigung verlangen darf."
  - question: "Wie wirken sich jährliche Sondertilgungen auf den Tilgungsplan aus?"
    answer: "Eine Sondertilgung reduziert unmittelbar am Tag der Einzahlung die verbleibende Restschuld. Da die reguläre Monatsrate unverändert weiterläuft, sinkt ab dem Folgemonat sofort der Zinsanteil jeder Rate. Dadurch verkürzt sich die Gesamtlaufzeit des Darlehens oft um mehrere Jahre, und die kumulierte Zinsersparnis übersteigt den eingezahlten Sondertilgungsbetrag häufig deutlich."
---

## Wie funktioniert die Tilgung bei einer Immobilienfinanzierung?

Der Erwerb oder Bau einer Wohnimmobilie ist für die meisten privaten Haushalte die größte finanzielle Entscheidung ihres Lebens. Im deutschsprachigen Raum (Deutschland, Österreich und der Schweiz) erfolgt die Baufinanzierung überwiegend über ein **Annuitätendarlehen** mit gebundenem Sollzinssatz. Das charakteristische Merkmal dieses Darlehenstyps ist eine über die gesamte Sollzinsbindung (typischerweise $10$, $15$ oder $20\text{ Jahre}$) exakt konstante monatliche Rate, die dem Kreditnehmer maximale Budget- und Planungssicherheit im Alltag bietet.

Obwohl die monatliche Abbuchung vom Girokonto über Jahre hinweg gleich bleibt, verändert sich ihre innere Zusammensetzung mit jeder einzelnen Zahlung: Ein **Tilgungsplan** (Amortisationsplan) schlüsselt für jeden Monat und jedes Laufzeitjahr centgenau auf, welcher Anteil der Rate zur Deckung der Darlehenszinsen verwendet wird, welcher Betrag die tatsächliche Kreditschuld mindert und wie hoch die verbleibende Restschuld zum Stichtag einer geplanten Anschlussfinanzierung oder eines Immobilienverkaufs ausfällt.

## Mathematische Formeln für Hypothekenrate, Restschuld und Laufzeit

Je nachdem, ob in der Finanzierungsplanung ein anfänglicher Tilgungssatz in Prozent (Standard in der deutschen und österreichischen Baufinanzierung) oder eine feste Gesamtlaufzeit bis zur vollständigen Entschuldung (wie bei Volltilgerdarlehen oder internationalen Hypotheken über $15$ bis $30\text{ Jahre}$) vorgegeben wird, kommen zwei korrespondierende Berechnungsformeln zum Einsatz.

### 1. Monatliche Rate aus Sollzins und anfänglichem Tilgungssatz
Wird die Baufinanzierung über den Nettodarlehensbetrag $K_0$ (in Euro $€$), den nominalen Jahreszinssatz $p$ (in $\% \text{ p. a.}$) und den anfänglichen Tilgungssatz $t_0$ (in $\% \text{ p. a.}$) definiert, lautet die monatliche Rate $R$:

$$R = K_0 \cdot \frac{p + t_0}{100 \cdot 12}$$

Im ersten Monat beträgt der Zinsanteil $Z_1 = K_0 \cdot \frac{p}{100 \cdot 12}$ und der anfängliche Tilgungsanteil $T_1 = K_0 \cdot \frac{t_0}{100 \cdot 12}$.

### 2. Monatliche Rate bei vorgegebener Gesamtlaufzeit (Volltilgung)
Soll das Darlehen innerhalb einer fest definierten Gesamtlaufzeit von $T$ Jahren ($n = T \cdot 12$ Monatsraten) vollständig auf $0,00\text{ €}$ zurückgezahlt werden, berechnet sich die Monatsrate über den monatlichen Periodenzins $i = \frac{p}{100 \cdot 12}$ wie folgt:

$$R = K_0 \cdot \frac{i \cdot (1 + i)^n}{(1 + i)^n - 1}$$

### 3. Exakte Restschuld nach $m$ Monaten und Gesamtlaufzeit
Da im ersten Monat um den Betrag $T_1 = R - K_0 \cdot i$ getilgt wird und dieser Tilgungsanteil durch den Effekt der ersparten Zinsen jeden Monat mit dem Faktor $(1 + i)$ wächst, beträgt die verbleibende Restschuld $K_m$ nach $m$ gezahlten Monatsraten:

$$K_m = K_0 \cdot (1 + i)^m - R \cdot \frac{(1 + i)^m - 1}{i}$$

Die rechnerische Gesamtlaufzeit $n$ (in Monaten) bis zur vollständigen Schuldenfreiheit ergibt sich bei unverändertem Zinssatz über den natürlichen Logarithmus:

$$n = \frac{\ln\left(1 + \frac{p}{t_0}\right)}{\ln(1 + i)}$$

## Vergleichstabelle: Einfluss der Tilgungsrate bei 350.000,00 € Darlehen

Die folgende Übersicht zeigt für ein Immobiliendarlehen über $K_0 = 350.000,00\text{ €}$ bei einem konstanten Sollzinssatz von $p = 3,60\text{ \% p. a.}$, wie stark der gewählte anfängliche Tilgungssatz die Restschuld nach $10$ bzw. $15\text{ Jahren}$, die Gesamtlaufzeit und den kumulierten Zinsaufwand beeinflusst:

| Anfängliche Tilgung ($t_0$) | Monatliche Rate ($R$) | Restschuld nach 10 Jahren | Restschuld nach 15 Jahren | Gesamtlaufzeit bis Volltilgung | Gesamtzinsen bis Volltilgung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1,50 % p. a.** | $1.487,50\text{ €}$ | $286.918,75\text{ €}$ | $245.785,92\text{ €}$ | $34\text{ Jahre, } 1\text{ Monat}$ | $257.703,00\text{ €}$ |
| **2,00 % p. a.** | $1.633,33\text{ €}$ | $265.891,67\text{ €}$ | $211.047,89\text{ €}$ | $28\text{ Jahre, } 8\text{ Monate}$ | $211.416,00\text{ €}$ |
| **3,00 % p. a.** | $1.925,00\text{ €}$ | $223.837,50\text{ €}$ | $141.571,83\text{ €}$ | $21\text{ Jahre, } 11\text{ Monate}$ | $156.660,00\text{ €}$ |
| **4,00 % p. a.** | $2.216,67\text{ €}$ | $181.783,33\text{ €}$ | $72.095,78\text{ €}$ | $17\text{ Jahre, } 10\text{ Monate}$ | $125.032,00\text{ €}$ |

Bereits eine Anhebung der anfänglichen Tilgung von $2,00\text{ \%}$ auf $3,00\text{ \%}$ erhöht die Monatsrate um $291,67\text{ €}$, verkürzt die Gesamtlaufzeit jedoch um fast $7\text{ Jahre}$ und spart über die Gesamtlaufzeit rund $54.756,00\text{ €}$ an Darlehenszinsen ein.

## Schritt-für-Schritt-Rechenbeispiel: Tilgungsverlauf über 10 Jahre

Eine Familie nimmt für den Kauf eines Einfamilienhauses ein Annuitätendarlehen über $K_0 = 350.000,00\text{ €}$ mit $10\text{ Jahren}$ Sollzinsbindung ($m = 120\text{ Monate}$), einem Sollzinssatz von $p = 3,60\text{ \% p. a.}$ (monatlicher Periodenzins $i = 0,30\text{ \%} = 0,003$) und einer anfänglichen Tilgung von $t_0 = 2,00\text{ \% p. a.}$ auf.

1. **Konstante Monatsrate $R$:** Es gilt $R = 350.000,00\text{ €} \cdot \frac{3,60 + 2,00}{1.200} = 1.633,33\text{ €}$.
2. **Aufschlüsselung im 1. Monat:** Der Zinsanteil im ersten Monat beträgt $Z_1 = 350.000,00\text{ €} \cdot 0,003 = 1.050,00\text{ €}$, sodass ein Tilgungsanteil von $T_1 = 1.633,33\text{ €} - 1.050,00\text{ €} = 583,33\text{ €}$ verbleibt. Die neue Restschuld nach Monat 1 sinkt auf $K_1 = 349.416,67\text{ €}$.
3. **Aufschlüsselung im 2. Monat (Effekt der ersparten Zinsen):** Auf Basis der niedrigeren Restschuld sinkt der Zinsanteil im zweiten Monat auf $Z_2 = 349.416,67\text{ €} \cdot 0,003 = 1.048,25\text{ €}$ (exakt $1,75\text{ €}$ weniger Zinsen), während der Tilgungsanteil auf $T_2 = 585,08\text{ €}$ anwächst. Die Restschuld nach Monat 2 beträgt $K_2 = 348.831,59\text{ €}$.
4. **Bilanz am Ende der 10-jährigen Zinsbindung (Monat 120):** Mit $(1 + 0,003)^{120} \approx 1,432557$ wurden nach 10 Jahren insgesamt $84.108,33\text{ €}$ getilgt. Für die Anschlussfinanzierung verbleibt eine Restschuld von $K_{120} = 265.891,67\text{ €}$, während in den ersten 10 Jahren insgesamt $111.891,67\text{ €}$ an Zinsen gezahlt wurden.

## Strategische Praxistipps für Darlehensnehmer

* **Beleihungsauslauf-Schwellen (LTV) gezielt nutzen:** Banken staffeln ihre Bauzinsen nach dem Verhältnis von Darlehenssumme zu Immobilienbeleihungswert (*Loan-to-Value*). Wer durch minimal höheres Eigenkapital eine Schwelle wie $90\text{ \%}$, $80\text{ \%}$ oder $60\text{ \%}$ unterschreitet, erhält oft einen um $0,15\text{ \%}$ bis $0,40\text{ \%}$ günstigeren Sollzinssatz auf das *gesamte* Darlehen.
* **Kostenfreie Sondertilgungsoptionen und Tilgungssatzwechsel vereinbaren:** Achten Sie im Darlehensvertrag auf ein kostenfreies Sondertilgungsrecht von mindestens $5\text{ \% p. a.}$ der ursprünglichen Darlehenssumme sowie auf die Möglichkeit, den Tilgungssatz während der Zinsbindung zwei- bis dreimal kostenfrei anzupassen (z. B. bei Gehaltssteigerungen oder Elternzeit).
* **Zinsänderungsrisiko der Restschuld frühzeitig absichern:** Kalkulieren Sie im Tilgungsplan stets ein Stress-Szenario für die Anschlussfinanzierung ein: Würde der Marktzins nach $10\text{ Jahren}$ im obigen Beispiel auf $5,50\text{ \%}$ steigen, erhöhte sich allein die monatliche Zinslast auf die Restschuld von $265.891,67\text{ €}$ auf rund $1.218,67\text{ €}$. Mit einem Forward-Darlehen lassen sich günstige Zinsen bereits bis zu $36\text{ bis }60\text{ Monate}$ vor Ablauf der Zinsbindung festschreiben.
