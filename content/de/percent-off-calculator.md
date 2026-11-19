---
title: "Prozent-Rabatt-Rechner"
metaTitle: "Prozent-Rabatt-Rechner: Endpreis & Ersparnis berechnen"
description: "Ermitteln Sie sofort Endpreis, absolute Ersparnis, kombinierte Rabattstaffeln und den Einfluss von Mehrwertsteuer oder Skonto auf Ihren Einkaufspreis."
metaDescription: "Prozent-Rabatt-Rechner für Einzel- und Mehrfachrabatte: Endpreis, Ersparnis in Euro, Skonto und Mehrwertsteuer exakt berechnen – ohne Rabattfallen."
metaKeywords: "Prozent-Rabatt-Rechner, Rabatt berechnen, Endpreis nach Rabatt, Mehrfachrabatt Formel, Skonto berechnen, Prozentrechnung Einkauf, Mehrwertsteuer Rabatt, UVP Vergleich"
faqs:
  - question: "Warum ergeben 30 % Rabatt plus 20 % Extra-Rabatt nicht 50 % Ersparnis?"
    answer: "Bei kombinierten Aktionen wirkt der zweite Rabatt nicht auf den ursprünglichen Listenpreis, sondern auf den bereits reduzierten Zwischenpreis. Bei 100,00 € senken 30 % den Preis zunächst auf 70,00 €. Weitere 20 % davon entsprechen 14,00 €, sodass der Endpreis 56,00 € beträgt. Die reale Gesamtersparnis liegt damit bei 44 % statt 50 %."
  - question: "Spielt es bei der Mehrwertsteuer eine Rolle, ob der Rabatt auf den Netto- oder Bruttopreis wirkt?"
    answer: "Bei reinen Prozentrabatten bleibt das Endergebnis identisch, weil die Multiplikation kommutativ ist: Ein Artikel für 100,00 € netto mit 20 % Rabatt und 19 % Umsatzsteuer kostet 100 € × 0,80 × 1,19 = 95,20 € brutto – genauso wie 119,00 € brutto × 0,80. Abweichungen entstehen erst, wenn fixe Euro-Gutscheine oder Versandkosten hinzukommen."
  - question: "Wie berechne ich den ursprünglichen Preis aus dem reduzierten Endpreis zurück?"
    answer: "Teilen Sie den reduzierten Endpreis durch den verbliebenen Zahlungsanteil, also durch (1 − Rabatt ÷ 100). Kostet eine Jacke nach 30 % Preisnachlass noch 84,00 €, entsprechen diese 84,00 € genau 70 % des Ursprungspreises. Die Rechnung 84,00 € ÷ 0,70 liefert den korrekten Originalpreis von 120,00 €. Wer stattdessen 30 % auf 84,00 € aufschlägt, landet fälschlicherweise bei 109,20 €."
  - question: "Worin unterscheiden sich Rabatt, Skonto und Cashback im Handel?"
    answer: "Ein Rabatt mindert den Kaufpreis sofort auf der Rechnung. Skonto ist ein zusätzlicher prozentualer Nachlass für schnelle Bezahlung innerhalb einer kurzen Frist (häufig 2 % binnen 10 Tagen) und senkt ebenfalls die Bemessungsgrundlage der Umsatzsteuer. Cashback hingegen wird erst nach dem Kauf erstattet und reduziert den ursprünglichen Rechnungsbetrag nicht."
  - question: "Wie schützt die 30-Tage-Regel der Preisangabenverordnung vor Scheinrabatten?"
    answer: "Nach § 11 der deutschen Preisangabenverordnung (PAngV) und der zugrunde liegenden EU-Richtlinie müssen Händler bei jeder Preisermäßigung den niedrigsten Gesamtpreis angeben, den sie innerhalb der letzten 30 Tage verlangt haben. Dadurch wird verhindert, dass Preise kurz vor Aktionswochen künstlich angehoben werden, um hohe Rabatte vorzutäuschen."
---

Im Einzelhandel, bei saisonalen Schlussverkäufen oder in gewerblichen Einkaufsverhandlungen begegnen uns Prozentabschläge täglich. Gleichzeitig setzen Handelsketten bewusst verschachtelte Aktionsmechaniken ein – etwa doppelte Nachlässe, sogenannte „Mehrwertsteuer geschenkt“-Wochenenden oder Mengenaktionen –, deren tatsächlicher Preisvorteil im Kopf leicht überschätzt wird. Der **Prozent-Rabatt-Rechner** übersetzt jede Rabattangabe unmittelbar in den zahlbaren Endpreis, die exakte Ersparnis in Euro und den effektiven Gesamtrabatt über mehrere Stufen hinweg.

## Die drei Kernformeln der Rabattrechnung

Ein Prozentsatz bezeichnet stets einen Anteil von Hundert (`1 % = 0,01`). Für eine verlässliche Preiskalkulation im Privat- und Geschäftsalltag genügen drei Grundgleichungen.

### Einfacher Rabatt und Restfaktor-Abkürzung

```
Rabattbetrag = Ausgangspreis × (p ÷ 100)
Endpreis     = Ausgangspreis × (1 − p ÷ 100)
```

Hier steht `Ausgangspreis` für den regulären Listen- oder Referenzpreis vor Abzug und `p` für den Rabattsatz in Prozent. Der Faktor `(1 − p ÷ 100)` heißt **Restfaktor**: Bei `25 %` Preisnachlass zahlen Sie `75 %` des ursprünglichen Betrags und multiplizieren direkt mit `0,75`.

### Gestaffelte Mehrfachrabatte

Werden mehrere prozentuale Nachlässe nacheinander angewendet – etwa Saisonrabatt, Treuecode und Skonto –, multiplizieren sich die jeweiligen Restfaktoren statt einer einfachen Addition der Prozentwerte:

```
Endpreis_gestaffelt = Ausgangspreis × (1 − p₁ ÷ 100) × (1 − p₂ ÷ 100)
Effektiver Rabatt   = [ 1 − (1 − p₁ ÷ 100) × (1 − p₂ ÷ 100) ] × 100
```

Die Reihenfolge der Abzüge verändert den Endpreis nicht: Ob zuerst `25 %` und danach `10 %` abgezogen werden oder umgekehrt, ergibt stets denselben Faktor `0,75 × 0,90 = 0,675` (`32,5 %` Gesamtrabatt).

### Rückwärtsrechnung auf den Ausgangspreis

Kennen Sie lediglich den reduzierten Endpreis und den gewährten Rabattsatz, führt die Division durch den Restfaktor zuverlässig zurück zum ursprünglichen Preis:

```
Ausgangspreis = Endpreis ÷ (1 − p ÷ 100)
```

## Rechenbeispiel: Mehrfachrabatt, Skonto und Umsatzsteuer im Einkauf

Ein Handwerksbetrieb erwirbt ein professionelles Lasermessgerät zum Listenpreis von `1.200,00 €` netto. Der Fachhändler gewährt `25 %` Aktionsrabatt, zusätzlich `10 %` Stammkunden-Nachlass auf den reduzierten Nettobetrag sowie `2 %` Skonto bei Überweisung innerhalb von zehn Tagen. Auf den verbleibenden Nettobetrag fallen `19 %` deutsche Umsatzsteuer an.

1. **Aktionsrabatt (`25 %`)**: `1.200,00 € × 0,75 = 900,00 €` (Ersparnis: `300,00 €`).
2. **Stammkunden-Nachlass (`10 %` auf den Zwischenpreis)**: `900,00 € × 0,90 = 810,00 €` (weitere Ersparnis: `90,00 €`).
3. **Skonto (`2 %` auf den Rechnungs-Nettobetrag)**: `810,00 € × 0,98 = 793,80 €` netto (Skontoabzug: `16,20 €`).
4. **Effektiver Gesamtrabatt**: Der kombinierte Restfaktor beträgt `0,75 × 0,90 × 0,98 = 0,6615`. Der reale Nachlass liegt somit bei `(1 − 0,6615) × 100 = 33,85 %` (`406,20 €` Ersparnis) – und nicht bei addierten `37 %` (`444,00 €`). Die typische Schätzabweichung beträgt `37,80 €`.
5. **Brutto-Endpreis inkl. `19 %` Umsatzsteuer**: `793,80 € × 1,19 = 944,62 €` (darin `150,82 €` Umsatzsteuer).

Die Gegenprobe bestätigt die Kommutativität: Der reguläre Bruttopreis beträgt `1.200,00 € × 1,19 = 1.428,00 €`; multipliziert mit `0,6615` ergeben sich exakt `944,62 €`. Bei `20 %` österreichischer Umsatzsteuer läge der Endpreis bei `952,56 €`, bei `8,1 %` Schweizer Mehrwertsteuer bei `858,10 €` (bei paritätischem Umrechnungskurs).

## Vergleichstabelle: Beworbene Aktion vs. reale Ersparnis

Die Übersicht zeigt anhand eines Warenwerts von `200,00 €` (bzw. preisgleicher Artikel bei Mengenaktionen), wie weit Werbeversprechen und wirksamer Gesamtrabatt im DACH-Handel auseinanderliegen:

| Beworbene Aktion | Vermuteter Rabatt | Wirksamer Rabatt | Endpreis (`200 €` Basis) | Reale Ersparnis |
| :--- | :--- | :--- | :--- | :--- |
| `20 %` + `10 %` Extra-Rabatt | `30,00 %` | `28,00 %` | `144,00 €` | `56,00 €` |
| `30 %` + `20 %` Extra-Rabatt | `50,00 %` | `44,00 %` | `112,00 €` | `88,00 €` |
| `50 %` + `20 %` Extra-Rabatt | `70,00 %` | `60,00 %` | `80,00 €` | `120,00 €` |
| `19 %` MwSt. geschenkt (DE) | `19,00 %` | `15,97 %` | `168,07 €` | `31,93 €` |
| `20 %` USt. geschenkt (AT) | `20,00 %` | `16,67 %` | `166,67 €` | `33,33 €` |
| 2. Artikel zum halben Preis (`2 × 100 €`) | `50,00 %` | `25,00 %` | `150,00 €` | `50,00 €` |
| 3 für 2 (`3 × 100 €` → Basis `300 €`) | `33–50 %` | `33,33 %` | `200,00 €` | `100,00 €` |

## Typische Rabattfallen im DACH-Handel durchschauen

### Die „Mehrwertsteuer geschenkt“-Rechnung

Bei Elektronik- oder Möbelaktionen werben Anbieter gern mit dem Erlass der gesetzlichen Mehrwertsteuer. Da der reguläre Ladenpreis `119 %` umfasst (`100 %` Netto plus `19 %` Steuer), entspricht der Wegfall des Steueranteils nicht `19 %` auf den Bruttopreis, sondern lediglich `19 ÷ 119 = 15,97 %` (in Österreich `20 ÷ 120 = 16,67 %`, in der Schweiz bei `8,1 %` MwSt. genau `7,49 %`). Rechtlich bleibt die Umsatzsteuer auf dem Kassenbon ausgewiesen; der Händler verbucht lediglich einen regulären Preisnachlass.

### UVP-Anker und Grundpreis gegenprüfen

Eine unverbindliche Preisempfehlung (UVP) des Herstellers liegt bei Technik, Haushaltsgeräten und Matratzen oft deutlich über dem üblichen Marktpreis. Orientieren Sie sich vor dem Kauf am gesetzlich vorgeschriebenen 30-Tage-Tiefstpreis (§ 11 PAngV) und prüfen Sie bei Lebensmitteln sowie Drogeriewaren zusätzlich den Grundpreis je Kilogramm oder Liter. Eine scheinbar reduzierte Sondergröße ist pro Mengeneinheit gelegentlich teurer als die unrabattierte Standardpackung.

### Euro-Gutschein gegen Prozent-Code abwägen

Akzeptiert ein Online-Shop nur einen Gutschein pro Bestellung, entscheidet der Warenkorb-Schwellenwert über die günstigere Option:

```
Schwellenwert-Warenkorb = Fixer Gutscheinwert (€) ÷ (Prozentrabatt ÷ 100)
```

Zwischen einem `25,00 €`-Gutschein und `15 %` Nachlass liegt die Grenze bei `25 ÷ 0,15 = 166,67 €`. Liegt Ihr Bestellwert darunter, spart der feste Euro-Betrag mehr; darüber übertrifft der prozentuale Rabatt den Gutschein.

### Lieferantenskonto als Renditehebel nutzen

Im Geschäftsalltag zählt Skonto zu den wirksamsten Liquiditätsgewinnen überhaupt. Wer eine Eingangsrechnung mit `2 %` Skonto binnen `10` Tagen statt `30` Tagen netto begleicht, erzielt für `20` Tage frühere Zahlung einen effektiven Jahreszins von `(2 ÷ 98) × (360 ÷ 20) ≈ 36,7 % p. a.` Selbst eine kurzfristige Überbrückung über den betrieblichen Kontokorrentkredit zu `10 %` bis `12 %` p. a. rechnet sich gegenüber dem Skontoverzicht deutlich. Prüfen Sie dabei stets, ob Skonto auf den gesamten Rechnungsbetrag inklusive Versandkosten oder ausschließlich auf den reinen Warenwert vereinbart wurde.
