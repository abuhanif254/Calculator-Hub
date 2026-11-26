---
title: "Rentenrechner (Annuität): Den Ruhestand absichern"
description: "Berechnen Sie Ihre monatliche Rentenauszahlung aus Einmalbeträgen: Annuitätenformel, Leibrente vs. Zeitrente, Inflationsrisiko und Besteuerung im Ruhestand."
category: "Finance"
relatedCalculator: "annuity-payout-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen einer Leibrente und einer Zeitrente?"
    answer: "Eine Zeitrente zahlt Ihr Kapital inklusive Zinsen über eine fest vereinbarte Laufzeit – etwa 20 oder 25 Jahre – vollständig aus und endet danach. Eine lebenslange Leibrente wird von einem Versicherer kalkuliert und garantiert die monatliche Zahlung bis zum Tod, unabhängig davon, wie alt Sie werden."
  - question: "Wie berechne ich die monatliche Auszahlung aus einem Einmalbetrag?"
    answer: "Bei einer nachschüssigen Zeitrente multiplizieren Sie das Startkapital mit dem Annuitätenfaktor auf Basis des Monatszinses und der gesamten Auszahlungsmonate. Ein Kapital von 300.000 € bei 4,0 % Jahreszins über 25 Jahre ergibt beispielsweise rund 1.583,51 € brutto pro Monat."
  - question: "Was passiert mit dem Restkapital bei vorzeitigem Tod?"
    answer: "Bei einem Bankauszahlplan oder einer reinen Zeitrente fällt das unverbrauchte Restkapital vollständig an Ihre Erben. Bei einer klassischen Leibrente verbleibt das Restkapital ohne Zusatzvereinbarung im Versichertenkollektiv; durch eine Rentengarantiezeit (z. B. 10 oder 20 Jahre) oder Beitragsrückgewähr lässt sich ein Hinterbliebenenschutz vereinbaren, was jedoch die Monatsrente leicht mindert."
  - question: "Wie hoch sollte die angenommene Verzinsung im Rentenrechner sein?"
    answer: "Kalkulieren Sie konservativ. Für garantierte klassische Rentenversicherungen liegen die laufenden Gesamtverzinsungen häufig zwischen 2,0 % und 3,5 % vor Kosten. Bei Entnahmeplänen aus breit gestreuten Portfolios empfiehlt sich eine vorsichtige reale Renditeannahme nach Inflation, um das Sequenz-Risiko in frühen Ruhestandsjahren abzufedern."
  - question: "Wie werden private Rentenauszahlungen in Deutschland besteuert?"
    answer: "Lebenslange private Leibrenten werden in Deutschland nur mit dem günstigen Ertragsanteil besteuert, der sich nach dem Alter bei Rentenbeginn richtet (bei Beginn mit 65 Jahren beträgt der steuerpflichtige Anteil beispielsweise 18 % der Rente). Bei reinen Kapitalauszahlungen oder Bankauszahlplänen unterliegen hingegen die erzielten Zinserträge der Abgeltungsteuer."
---

Eine wesentliche Herausforderung in der Ruhestandsplanung besteht darin, angespartes Vermögen so in laufendes Einkommen umzuwandeln, dass es weder zu früh aufgebraucht wird noch unnötig Kaufkraft verschenkt. Eine **Annuität** – im Versicherungskontext meist als Sofortrente oder Leibrente bezeichnet – löst dieses Problem, indem sie ein Einmalkapital planmäßig verzinst und in gleichbleibende monatliche Auszahlungen überführt.

Während eine klassische Risikolebensversicherung das Todesfallrisiko absichert, schützt eine lebenslange Rente vor dem **Langlebigkeitsrisiko**. Mit unserem [Renten-Auszahlungsrechner](/de/rechner/rentenauszahlungsrechner) ermitteln Sie in Sekunden, welche monatliche Rate ein vorhandenes Kapital bei gegebenem Zinssatz und gewünschter Laufzeit liefert.

## Methodik: Die Annuitätenformel und ihre Stellschrauben

Rechnerisch basiert jeder feste Auszahlungsplan (Zeitrente) auf dem Barwertprinzip: Die Summe aller abgezinsten künftigen Monatsraten entspricht exakt dem eingesetzten Startkapital `K`. Bei **nachschüssiger** Auszahlung (jeweils am Monatsende) lautet die Formel für die konstante Monatsrate `R`:

```text
R = K × [i × (1 + i)^n] / [(1 + i)^n − 1]
i = r / 12
n = T × 12
```

Dabei stehen die Parameter für folgende Größen:

* **`K` (Einmalbetrag / Barwert):** Das zu Beginn der Auszahlungsphase verfügbare Nettokapital in Euro.
* **`r` (Nominaler Jahreszins):** Die unterstellte jährliche Verzinsung nach Kosten (als Dezimalzahl, z. B. `0,04` für `4,0 %`).
* **`i` (Monatlicher Periodenzins):** Der auf einen Monat heruntergebrochene Zinssatz (`r / 12`).
* **`T` und `n` (Auszahlungsdauer):** Die Laufzeit in Jahren (`T`) beziehungsweise die Gesamtzahl der monatlichen Auszahlungen (`n`).

Erfolgt die Zahlung **vorschüssig** (am Monatsanfang), sinkt die Rate geringfügig auf `R_vor = R / (1 + i)`, weil jeder Auszahlungsbetrag einen Monat weniger Zins trägt. Soll das Kapital hingegen niemals schrumpfen (**ewige Rente**), dürfen Sie monatlich höchstens den reinen Zinsertrag `R_ewig = K × i` entnehmen.

### Zeitrente vs. versicherungsmathematische Leibrente

Ein deterministischer Rechner ermittelt eine Zeitrente über eine feste Jahreszahl `T`. Versicherer kalkulieren eine **lebenslange Leibrente** hingegen mithilfe von Sterbetafeln und einem garantierten **Rentenfaktor** (Angabe der monatlichen Rente je `10.000 €` Kapital). Weil früh verstorbene Versicherte Kapital im Kollektiv belassen, finanziert dieser Sterblichkeitsgewinn die lebenslangen Zahlungen an sehr langlebige Rentner – abzüglich Abschluss-, Verwaltungs- und Sicherheitskosten.

## Rechenbeispiel: 300.000 € Kapital über 25 Jahre verrenten

Nehmen wir an, Sie gehen mit `65 Jahren` in den Ruhestand und legen ein freies Kapital von `300.000 €` zu einem konstanten Jahreszins von `4,0 %` über eine geplante Auszahlungsdauer von `25 Jahren` an (`n = 300 Monate`):

1. **Monatlichen Zinssatz berechnen:**
   `i = 0,04 / 12 = 0,0033333` (`0,3333 %` pro Monat).
2. **Aufzinsungsfaktor ermitteln:**
   `(1 + 0,0033333)^300 ≈ 2,713765`.
3. **Annuitätenfaktor anwenden:**
   `Zähler = 0,0033333 × 2,713765 ≈ 0,0090459`
   `Nenner = 2,713765 − 1 = 1,713765`
   `Faktor = 0,0090459 / 1,713765 ≈ 0,0052784`
4. **Monatliche Rente und Gesamtauszahlung bestimmen:**
   `R = 300.000 € × 0,0052784 = 1.583,51 €` pro Monat.
   Über `300 Monate` summieren sich die Auszahlungen auf **`475.053,16 €`**. Davon entfallen `300.000,00 €` auf den Kapitalverzehr und **`175.053,16 €`** auf erwirtschaftete Zinserträge.

Im ersten Monat erwirtschaftet Ihr Kapital `1.000,00 €` Zinsen (`300.000 € × 0,0033333`), sodass `583,51 €` aus der Substanz fließen. Im letzten Monat besteht die Rate fast vollständig aus Restkapital.

## Vergleichstabelle: Einfluss von Laufzeit und Zinssatz

Die folgende Matrix zeigt für ein Startkapital von `300.000 €`, wie stark die gewählte Auszahlungsdauer (bei `4,0 %` Zins) sowie der Zinssatz (bei `25 Jahren` Laufzeit) Ihre monatliche Liquidität und die gesamten Zinserträge verändern:

| Parameter-Szenario | Startkapital | Jahreszins | Laufzeit | Monatliche Auszahlung | Gesamtauszahlung | Zinsanteil gesamt |
|---|---|---|---|---|---|---|
| Kurzfristige Überbrückung | `300.000 €` | `4,0 %` | `15 Jahre` | `2.219,06 €` | `399.431,48 €` | `99.431,48 €` |
| Standard-Ruhestand | `300.000 €` | `4,0 %` | `20 Jahre` | `1.817,94 €` | `436.305,84 €` | `136.305,84 €` |
| Langlebigkeits-Puffer | `300.000 €` | `4,0 %` | `25 Jahre` | `1.583,51 €` | `475.053,16 €` | `175.053,16 €` |
| Sicherheits-Horizont | `300.000 €` | `4,0 %` | `30 Jahre` | `1.432,25 €` | `515.608,52 €` | `215.608,52 €` |
| Konservativer Zins | `300.000 €` | `2,0 %` | `25 Jahre` | `1.271,56 €` | `381.468,90 €` | `81.468,90 €` |
| Wachstums-Portfolio | `300.000 €` | `6,0 %` | `25 Jahre` | `1.932,90 €` | `579.871,26 €` | `279.871,26 €` |

## Praxis-Fallstricke: Inflation, Renditereihenfolge und Kosten

Wer eine Rentenauszahlung plant, sollte niemals ausschließlich auf die nominale Monatsrate blicken. Drei strukturelle Risiken entscheiden in der Praxis über den tatsächlichen Lebensstandard im Alter:

* **Kaufkraftverlust durch Inflation:** Eine konstante Nominalrente von `1.583,51 €` verliert bei `2,5 %` jährlicher Teuerung nach `20 Jahren` rund `39 %` ihrer Kaufkraft – sie entspricht real nur noch knapp `966 €` heutiger Kaufkraft. Prüfen Sie daher dynamische Rentensteigerungen oder halten Sie einen wachstumsorientierten Depotbaustein vor.
* **Renditereihenfolge-Risiko (Sequence-of-Returns-Risiko):** Bei variablen Auszahlungsplänen (etwa ETF-Entnahmen statt fester Policen) führen Kursverluste in den ersten drei bis fünf Rentenjahren zu einem überproportionalen Kapitalverzehr, weil Anteile zu Tiefstkursen verkauft werden müssen. Eine Liquiditätsreserve für `24 bis 36 Monate` in Tagesgeld oder kurzlaufenden Anleihen schützt vor Zwangsverkäufen.
* **Versteckte Abschluss- und Verwaltungskosten:** Bei sofort beginnenden Versicherungsrenten mindern Abschlusskosten (`2 %` bis `4 %` des Einmalbetrags) sowie laufende Verwaltungskosten die effektive Nettorendite spürbar. Rechnen Sie immer mit der garantierten Auszahlung nach Kosten, nicht mit unverbindlichen Überschussprognosen.
* **Planungshinweis:** Alle Berechnungen zeigen Bruttobeträge vor individueller Einkommensteuer (Ertragsanteil bei Leibrenten bzw. Abgeltungsteuer auf Zinsgewinne) sowie vor eventuellen Beiträgen zur Kranken- und Pflegeversicherung.
