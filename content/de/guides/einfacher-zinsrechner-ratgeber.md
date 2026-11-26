---
title: "Einfache Zinsen vs. Zinseszinsen: Was ist der Unterschied?"
description: "Grundlagen und Formeln zu einfachen Zinsen und Zinseszinsen: Lineare vs. exponentielle Verzinsung, Zinstagekonventionen, Rechenbeispiele und rechtliche Praxis im DACH-Raum."
category: "Finance"
relatedCalculator: "simple-interest-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wann sind einfache Zinsen für mich vorteilhafter als Zinseszinsen?"
    answer: "Als Kreditnehmer profitieren Sie von einfachen Zinsen, weil bereits entstandene Zinsen nicht weiter verzinst werden und die Zinslast nur linear steigt. Als Sparer oder Anleger hingegen sollten Sie konsequent auf den Zinseszins setzen, weil wiederangelegte Erträge über lange Zeiträume exponentiell wachsen."
  - question: "Wie berechne ich einfache Zinsen für unterjährige Zeiträume wie Tage oder Monate?"
    answer: "Bei Laufzeiten unter einem Jahr wird der Zeitraum t als Jahresbruchteil angegeben: bei Monaten meist t = Monate ÷ 12, bei Tagen je nach Bankusance t = Tage ÷ 360 (deutsche bzw. kaufmännische Zinsmethode 30/360 und Euro-Geldmarktmethode act/360) oder t = Tage ÷ 365 (englische Methode act/365)."
  - question: "Warum verbietet § 248 BGB grundsätzlich Zinseszinsen?"
    answer: "In Deutschland schützt § 248 Abs. 1 BGB Schuldner vor einer unkontrollierten Schuldenspirale, indem Vereinbarungen im Voraus, dass fällige Zinsen wieder Zinsen tragen sollen, grundsätzlich nichtig sind. Ausnahmen gelten jedoch ausdrücklich für Kreditinstitute bei Kontokorrent- und Sparkonten sowie für spezielle gesetzliche Regelungen."
  - question: "Arbeiten Festgeldkonten mit einfachen Zinsen oder mit Zinseszinsen?"
    answer: "Das hängt von der Zinsgutschrift ab. Wird der Zins eines mehrjährigen Festgeldes jährlich auf Ihr Referenz- oder Girokonto ausgeschüttet, erhalten Sie effektiv nur einfache Zinsen auf das Ursprungskapital. Bleibt der jährliche Zins hingegen auf dem Festgeldkonto und wird mitverzinst (Thesaurierung), entsteht der Zinseszinseffekt."
  - question: "Ab welcher Laufzeit macht der Unterschied zwischen einfachem Zins und Zinseszins wirklich viel aus?"
    answer: "Bei einjährigen Anlagen oder Krediten ist das Ergebnis bei jährlicher Zinsgutschrift identisch. Ab 5 Jahren wird der Vorsprung deutlich spürbar (+10,5 % mehr Zinsertrag bei 5 % Zins), und nach 20 bis 30 Jahren übersteigen die aufgelaufenen Zinseszinsen das einfache Zinsmodell bei mittleren Zinssätzen bereits um mehr als das Doppelte."
---

Im Finanzwesen existieren zwei grundlegend verschiedene Methoden zur Zinsberechnung: die **lineare Verzinsung** (einfache Zinsen) und die **exponentielle Verzinsung** (Zinseszinsen). Während einfache Zinsen ausschließlich auf das ursprüngliche Anfangskapital erhoben oder gutgeschrieben werden, schlägt das Zinseszins-Modell bereits erwirtschaftete oder fällige Zinsen dem Kapital zu — Sie erzielen oder zahlen also „Zinsen auf Zinsen“.

Für kurzfristige Anlagen, Privatdarlehen, Verzugszinsen oder Stückzinsen bei Anleihen ist die lineare Berechnung der Standard. Mit unserem [Rechner für einfache Zinsen](/de/rechner/einfacher-zinsrechner) ermitteln Sie in Sekunden exakt den linearen Zinsbetrag für beliebige Tage, Monate oder Jahre und grenzen ihn direkt gegen den Zinseszins ab.

## Mathematische Grundlagen und Zinstagekonventionen

Bei der **einfachen Zinsrechnung** wächst der Zinsertrag `Z` proportional zur Anlagedauer `t`. Da die Berechnungsbasis während der gesamten Laufzeit unverändert bei dem Anfangskapital `K` bleibt, lautet die Grundformel:

```text
Z = K × p × t
Endkapital (einfach): E_einfach = K × (1 + p × t)
```

Demgegenüber kapitalisiert der **Zinseszins** die Erträge periodisch mit der Zinsfrequenz `m` pro Jahr (etwa `m = 1` bei jährlicher oder `m = 12` bei monatlicher Gutschrift):

```text
Endkapital (Zinseszins): E_zinseszins = K × (1 + p ÷ m)^(m × t)
```

Die Parameter im Detail:
- **`K` (Anfangskapital):** Ursprünglich angelegter oder geliehener Nettobetrag in Euro.
- **`p` (Nominalzinssatz p. a.):** Jährlicher Zinssatz als Dezimalzahl (z. B. `0,05` für `5,00 %`).
- **`t` (Laufzeit in Jahren):** Ganze Jahre oder bei unterjährigen Zeiträumen der exakte Zeitbruch.

Bei Laufzeiten unter zwölf Monaten entscheidet die vertragliche **Zinsmethode** (Day-Count Convention) über das exakte Ergebnis auf den Cent:
- **Deutsche kaufmännische Methode (`30/360`):** Jeder Monat zählt pauschal `30` Tage, das Jahr `360` Tage (`t = Tage ÷ 360`). Üblich bei vielen Ratenkrediten und Sparbriefen.
- **Eurozinsmethode (`act/360`):** Es zählen die kalendergenauen Tage im Zähler, geteilt durch `360` im Nenner. Standard im Interbanken-Geldmarkt und bei vielen Dispositionskrediten.
- **Englische Methode (`act/365`):** Kalendergenaue Tage geteilt durch `365`. Verbreitet bei Tagesgeldkonten und vielen europäischen Staatsanleihen.

## Durchgerechnetes Rechenbeispiel: 10 Jahre und unterjährige Tagesrechnung

Angenommen, Sie legen `K = 10.000 €` zu einem festen Nominalzinssatz von `p = 5,00 % p. a.` (`0,05`) für `t = 10` Jahre an:

1. **Berechnung mit einfachen Zinsen (z. B. Sparbrief mit jährlicher Ausschüttung):**
   Pro Jahr entstehen konstant `10.000 € × 0,05 = 500,00 €` Zinsen.
   Nach zehn Jahren beträgt der Gesamtzins `Z = 10.000 € × 0,05 × 10 = 5.000,00 €`, das Endkapital einschließlich ausgezahlter Erträge liegt bei `15.000,00 €`.
2. **Berechnung mit Zinseszins (jährliche Wiederanlage, `m = 1`):**
   `E_zinseszins = 10.000 € × (1 + 0,05)^10 = 16.288,95 €`.
   Der Gesamtzinsertrag steigt auf `6.288,95 €`. Allein durch die Mitverzinsung der Vorjahreszinsen entsteht ein Mehrbetrag von `1.288,95 €` (`+25,8 %`).

**Unterjähriges Beispiel (1. Juli bis 31. Dezember = 184 Kalendertage):**
Auf dieselben `10.000 €` zu `5,00 %` einfachen Zinsen ergibt die Methode `30/360` (6 Monate × 30 = 180 Tage) exakt `10.000 € × 0,05 × (180 ÷ 360) = 250,00 €`. Nach `act/365` ergeben sich `10.000 € × 0,05 × (184 ÷ 365) = 252,05 €`, während die Eurozinsmethode `act/360` sogar `10.000 € × 0,05 × (184 ÷ 360) = 255,56 €` ausweist.

## Benchmark-Tabelle: Lineares Wachstum vs. Zinseszins-Kurve

Die Tabelle zeigt für `10.000 €` Startkapital bei `5,00 %` Jahreszins (jährliche Periode), wie gering der Unterschied zu Beginn ausfällt und wie dramatisch die Schere ab dem zweiten Jahrzehnt auseinandergeht:

| Laufzeit | Endkapital (einfach) | Zinsertrag (einfach) | Endkapital (Zinseszins) | Zinsertrag (Zinseszins) | Zinseszins-Vorteil |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 Jahr | 10.500,00 € | 500,00 € | 10.500,00 € | 500,00 € | +0,00 € (+0,0 %) |
| 3 Jahre | 11.500,00 € | 1.500,00 € | 11.576,25 € | 1.576,25 € | +76,25 € (+5,1 %) |
| 5 Jahre | 12.500,00 € | 2.500,00 € | 12.762,82 € | 2.762,82 € | +262,82 € (+10,5 %) |
| 10 Jahre | 15.000,00 € | 5.000,00 € | 16.288,95 € | 6.288,95 € | +1.288,95 € (+25,8 %) |
| 15 Jahre | 17.500,00 € | 7.500,00 € | 20.789,28 € | 10.789,28 € | +3.289,28 € (+43,9 %) |
| 20 Jahre | 20.000,00 € | 10.000,00 € | 26.532,98 € | 16.532,98 € | +6.532,98 € (+65,3 %) |
| 30 Jahre | 25.000,00 € | 15.000,00 € | 43.219,42 € | 33.219,42 € | +18.219,42 € (+121,5 %) |

Nach 30 Jahren verdreifacht sich Ihr Ursprungskapital durch Zinseszinsen mehr als vierfach, während der reine einfache Zinsertrag bei `15.000 €` stehen bleibt — ein Unterschied von `18.219,42 €` ohne einen einzigen zusätzlichen Euro Einzahlung.

## Praktische Anwendungsfälle, Fallstricke und rechtliche Grenzen

In der Finanz- und Rechtspraxis begegnet Ihnen die einfache Zinsrechnung deutlich häufiger, als es auf den ersten Blick scheint:

1. **Verzugszinsen und gerichtliche Forderungen:** Nach § 288 BGB werden Verzugszinsen im Geschäfts- und Verbraucherverkehr grundsätzlich als einfache Zinsen taggenau auf die Hauptforderung berechnet. Gemäß § 289 BGB dürfen auf reine Verzugszinsen ausdrücklich keine weiteren Zinsen (Zinseszinsen) verlangt werden.
2. **Privatdarlehen unter Angehörigen oder Gesellschaftern:** Um steuerliche Schenkungsfiktionen zu vermeiden, werden Privatdarlehen meist mit einem fremdüblichen Festzins als einfache Verzinsung oder klassisches Annuitätendarlehen aufgesetzt.
3. **Festgeld mit Ausschüttung vs. Thesaurierung:** Wer ein dreijähriges Festgeld abschließt, erhält oft zwei Optionen: jährliche Zinsauszahlung (ergibt einfache Zinsen auf das Kapital) oder Zinsansammlung bis Laufzeitende (ergibt Zinseszins). Bei gleichem Nominalzins erzielen Sie mit der Thesaurierung stets die höhere Effektivrendite.
4. **Ratenkredite und Dispositionskredite:** Bei ordnungsgemäß gezahlten Ratenkrediten fallen in jeder Periode nur einfache Zinsen auf die aktuelle Restschuld an, da der fällige Zins direkt aus der Monatsrate beglichen wird. Gerät hingegen ein Girokonto dauerhaft ins Minus und die Bank schlägt Quartalszinsen dem Sollsaldo zu, wirkt der Zinseszins gegen Sie — ein wesentlicher Grund, warum das deutsche Zinseszinsverbot (§ 248 BGB) für Kontokorrentkonten von Banken gesetzlich ausgenommen ist.

Achten Sie bei Vergleichen stets darauf, ob ein Produkt den **Nominalzins** oder den **effektiven Jahreszins** ausweist: Je häufiger unterjährige Zinskapitalisierungen stattfinden (z. B. monatlich statt jährlich), desto stärker weicht der Effektivzins nach oben vom Nominalzins ab.
