---
title: "Provisionsrechner: Verfolgen Sie Ihre Verkaufseinnahmen"
description: "Berechnen Sie Verkaufsprovisionen präzise: Feste Sätze, gestaffelte Provisionen (Tiered Commissions), Akzeleratoren, Stornoreserven und Steuerabzüge."
category: "Finance"
relatedCalculator: "commission-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Worin unterscheiden sich Grenzstaffel und Vollstaffel bei Verkaufsprovisionen?"
    answer: "Bei einer Grenzstaffel (Marginal Tiering) gilt der höhere Prozentsatz immer nur für den Umsatzanteil innerhalb der jeweiligen Umsatzstufe – ähnlich wie bei der Einkommensteuer. Bei einer Vollstaffel (Retroactive Tiering) greift der erreichte Spitzensatz rückwirkend auf den gesamten Monats- oder Quartalsumsatz, sobald ein Schwellenwert überschritten wird."
  - question: "Wird die Verkaufsprovision auf den Brutto- oder Netto-Umsatz berechnet?"
    answer: "Im B2B- und B2C-Vertrieb bildet fast ausschließlich der Netto-Umsatz ohne Umsatzsteuer sowie nach Abzug von Rabatten, Skonti und Gutschriften die Bemessungsgrundlage. Bei margenorientierten Modellen wird statt des Umsatzes sogar nur der erzielte Rohertrag oder Deckungsbeitrag verprovisioniert."
  - question: "Wie wirken sich Stornos und Rückforderungen (Clawbacks) auf die Auszahlung aus?"
    answer: "Zahlt ein Kunde eine Rechnung nicht oder widerruft einen Vertrag innerhalb der vereinbarten Stornohaftungszeit, wird die bereits gutgeschriebene Provision anteilig oder vollständig mit künftigen Abrechnungen verrechnet. Viele Unternehmen behalten daher zunächst 10 bis 20 % als Stornoreserve auf einem separaten Konto zurück."
  - question: "Wie hoch ist das übliche Verhältnis zwischen Fixgehalt und variabler Provision (OTE)?"
    answer: "Im klassischen B2B-Software- und Investitionsgütervertrieb sind Aufteilungen von 50/50 oder 60/40 zwischen Grundgehalt und variabler Zielprovision bei 100 % Zielerreichung (On-Target Earnings, OTE) Standard. Im Innendienst überwiegen oft 70/30- oder 80/20-Modelle, während reine Handelsvertreter häufig zu 100 % auf Provisionsbasis arbeiten."
  - question: "Wie werden variable Verkaufsprovisionen bei Angestellten steuerlich behandelt?"
    answer: "Laufend monatlich gezahlte Provisionen werden als regulärer Arbeitslohn mit dem normalen Lohnsteuertarif und Sozialabgaben (bis zu den jeweiligen Beitragsbemessungsgrenzen) abgerechnet. Größere Quartals- oder Jahresboni gelten lohnsteuerlich oft als sonstige Bezüge, was im Auszahlungsmonat zu höheren Abzügen führt, über den Jahresausgleich aber geglättet wird."
---

Im Vertrieb macht die variable Vergütung häufig `30 %` bis `60 %` des gesamten Jahreseinkommens aus – doch unklare Staffelregeln, Rabattabzüge und Stornoverrechnungen erschweren eine verlässliche Monatsplanung. Wer seine Provisionsformel exakt kennt, kann nicht nur kommende Gehaltsabrechnungen präzise gegenprüfen, sondern auch jeden Verhandlungsrabatt direkt auf seinen persönlichen Verdienst umlegen.

Dabei entscheidet vor allem die Struktur des Vergütungsplans: Eine lineare Einheitsprovision verhält sich völlig anders als eine mehrstufige **Grenzstaffel** oder ein **Akzelerator** oberhalb der `100-%`-Zielmarke. Mit unserem [Provisionsrechner](/de/rechner/provisionsrechner) kalkulieren Sie sowohl einfache Prozentsätze als auch gestaffelte Zielerreichungsszenarien sofort auf den Cent genau.

## Methodik: Feste, gestaffelte und margenbasierte Provisionsformeln

Die Grundformel für eine lineare Festprovision lautet:

```text
P_fest = (U_brutto − USt − Rabatte − Stornos) × s
Gesamtbrutto = Fixgehalt + P_fest
```

Hierbei bezeichnet `U_brutto` den fakturierten Auftragswert, `USt` die enthaltene Umsatzsteuer (im DACH-Raum meist `19 %` in Deutschland, `20 %` in Österreich oder `8,1 %` in der Schweiz) und `s` den vereinbarten Provisionssatz (z. B. `0,06` für `6,0 %`).

### Gestaffelte Provisionen: Grenzstaffel vs. Vollstaffel

In modernen Vertriebsorganisationen steigen die Provisionssätze mit zunehmender Leistung. Entscheidend ist die vertragliche Unterscheidung zwischen zwei Rechenlogiken:

* **Grenzstaffel (Marginal Tiering):** Jeder Umsatzbereich (`Stufe k`) wird separat mit dem zugehörigen Satz `s_k` multipliziert und aufsummiert:
  `P_grenz = Σ (U_Stufe_k × s_k)`
  Dieses Prinzip verhindert harte Sprünge und belohnt jeden weiteren Euro stetig höher.
* **Vollstaffel (Retroactive / Cliff Tiering):** Sobald ein Schwellenwert geknackt wird, gilt der höhere Prozentsatz rückwirkend für den gesamten Umsatz (`U_netto × s_max`). Ein einziger Abschluss am Monatsende kann hier einen Einkommenssprung von mehreren Tausend Euro auslösen.

### Deckungsbeitragsprovision und Akzeleratoren

Um unrentable Preisnachlässe durch das Vertriebsteam zu verhindern, koppeln viele B2B-Unternehmen den Provisionssatz an die **Rohertragsmarge (`Marge = (Netto_Umsatz − Herstellkosten) / Netto_Umsatz`)** oder kürzen den Provisionssatz bei gewährten Kundenrabatten überproportional. Erreicht ein Mitarbeiter `100 %` seiner Quote (On-Target Earnings, OTE), aktivieren viele Pläne zudem einen **Akzelerator** (z. B. `1,5x` bis `2,0x` des Basissatzes für jeden Umsatz oberhalb des Ziels).

## Rechenbeispiel: Dreistufige Grenzstaffel mit Stornoabzug

Betrachten wir einen B2B-Account-Manager mit einem monatlichen Fixgehalt von `3.500,00 €` und einer dreistufigen Grenzstaffel auf den stornobereinigten Netto-Umsatz:

* **Stufe 1 (`0 €` bis `40.000 €`):** `4,0 %`
* **Stufe 2 (`40.001 €` bis `80.000 €`):** `7,0 %`
* **Stufe 3 (über `80.000 €`):** `10,0 %`

Im laufenden Monat verbucht der Mitarbeiter abgeschlossene Netto-Aufträge im Wert von `100.000,00 €`. Ein früherer Kundenauftrag über `5.000,00 €` wird jedoch storniert, sodass der provisionspflichtige Netto-Umsatz **`95.000,00 €`** beträgt:

1. **Stufe 1 berechnen (`40.000,00 €`):**
   `40.000,00 € × 0,04 = 1.600,00 €`.
2. **Stufe 2 berechnen (`80.000 € − 40.000 € = 40.000,00 €`):**
   `40.000,00 € × 0,07 = 2.800,00 €`.
3. **Stufe 3 berechnen (`95.000 € − 80.000 € = 15.000,00 €`):**
   `15.000,00 € × 0,10 = 1.500,00 €`.
4. **Gesamtprovision und Effektivsatz:**
   `P_ges = 1.600,00 € + 2.800,00 € + 1.500,00 € = 5.900,00 €`.
   Der effektive Durchschnittsprovisionssatz liegt bei `5.900,00 € / 95.000,00 € = 6,21 %`.
5. **Monatliches Gesamtbrutto:**
   `3.500,00 € (Fixum) + 5.900,00 € (Provision) = 9.400,00 €`.

Zum Vergleich: Hätte der Arbeitsvertrag statt der Grenzstaffel eine rückwirkende **Vollstaffel** von `10,0 %` ab `80.001 €` vorgesehen, läge die Provision bei `9.500,00 €` – eine Differenz von `3.600,00 €` bei identischem Umsatz.

## Vergleichstabelle: Typische Provisionsmodelle im Vertrieb

Die folgende Übersicht zeigt, wie verschiedene Vergütungsmodelle Einkommen, Risiko und Verkaufsverhalten steuern:

| Provisionsmodell | Typischer Einsatzbereich | Effektiver Satz bei `95.000 €` (Beispiel) | Vorteil für Vertrieb | Risiko / Nachteil |
|---|---|---|---|---|
| Feste lineare Provision (`6 %`) | Standardvertrieb, Handel | `5.700,00 €` (`6,00 %`) | Extrem einfach planbar | Kein Zusatzanreiz für Spitzenleistung |
| Grenzstaffel (`4 % / 7 % / 10 %`) | B2B-SaaS, Außendienst | `5.900,00 €` (`6,21 %`) | Faire, kontinuierliche Motivation | Erfordert laufendes Stufen-Tracking |
| Vollstaffel (`10 %` ab `80.000 €`) | Hochpreisige Projektgeschäfte | `9.500,00 €` (`10,00 %`) | Enormer Hebel bei Zielerreichung | Hohes Risiko bei knapp verfehlter Schwelle |
| Rohertrags- / Margenprovision | Großhandel, Agenturen | `15 %` auf `28.500 €` Rohertrag = `4.275,00 €` | Schützt Unternehmensmarge gegen Rabatte | Einkaufspreise müssen transparent sein |
| Basis + Akzelerator (`1,5x` > Ziel) | Enterprise-Sales mit OTE | Stark progressiv über `100 %` Ziel | Überproportionale Belohnung für Übererfüllung | Unregelmäßige Quartalsschwankungen |
| Residual- / Abo-Provision | Versicherungen, Telekom, SaaS | `3 %` bis `10 %` wiederkehrend | Planbare, kumulative Einnahmen | Lange Anlaufzeit bis zum Einkommensaufbau |

## Vertragliche Fallstricke: Fälligkeit, Splits und Buchauszug

In der Praxis gehen Vertriebsmitarbeitern regelmäßig erhebliche Beträge verloren, weil Nebenbedingungen im Arbeits- oder Handelsvertretervertrag übersehen werden:

* **Auftrags- vs. Zahlungseingangsprinzip:** Prüfen Sie, ob Ihre Provision bereits bei **Vertragsabschluss (Booked)**, bei **Rechnungsstellung (Billed)** oder erst bei **Kundenzahlungseingang (Collected)** fällig wird. Bei langen Zahlungszielen (`60 bis 90 Tage`) verschiebt das Collected-Prinzip Ihre Liquidität um ein ganzes Quartal.
* **Deal-Splits und Gebietsabgrenzung:** Arbeiten Innendienst (SDR), Account Executive und Solutions Engineer gemeinsam an einem Abschluss, muss schriftlich geklärt sein, ob beide Parteien volle Quotenanrechnung erhalten oder der Provisionsbetrag `50/50` geteilt wird.
* **Nachweispflicht und Buchauszug:** Selbstständige Handelsvertreter haben nach § 87c HGB Anspruch auf eine monatliche Abrechnung sowie einen detaillierten Buchauszug zur Prüfung unklarer Abzüge. Angestellte sollten eigene Abschlüsse fortlaufend dokumentieren, um Stornobuchungen nachvollziehen zu können.
* **Netto-Kalkulation beachten:** Rechnen Sie variable Provisionen bei der persönlichen Finanzplanung immer mit Ihrer individuellen Grenzsteuerbelastung (Lohnsteuer plus Solidaritätszuschlag und ggf. Kirchensteuer) sowie eventuellen Renten- und Krankenkassenbeiträgen herunter, bevor Sie fixe Lebenshaltungskosten darauf aufbauen.
