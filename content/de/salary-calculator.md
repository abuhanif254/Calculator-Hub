---
title: "Gehaltsrechner"
metaTitle: "Gehaltsrechner: Stundenlohn, Monats- & Jahresgehalt"
description: "Rechnen Sie Ihr Einkommen präzise zwischen Stundenlohn, Tageslohn, Wochenlohn, Monatsgehalt und Jahresgehalt um."
metaDescription: "Rechnen Sie Jahresgehalt, Monatslohn, Wochen-, Tages- und Stundenlohn präzise um – mit Wochenstunden, unbezahlter Freizeit sowie 13. und 14. Monatsgehalt."
metaKeywords: "gehaltsrechner, lohnumrechner, stundenlohn berechnen, jahresgehalt in monatsgehalt, 13. monatsgehalt, 14. gehalt österreich, wochenstunden umrechner"
faqs:
  - question: "Berechnet dieser Gehaltsrechner mein Nettogehalt nach Steuern und Sozialabgaben?"
    answer: "Nein, es handelt sich um einen periodengerechten Gehalts- und Lohnumrechner. Geben Sie ein Bruttogehalt ein, erhalten Sie alle Vergleichsperioden als Bruttowerte; geben Sie Ihr Nettoeinkommen ein, werden sämtliche Zeiträume entsprechend netto umgerechnet – ohne Lohnsteuer- oder Krankenkassenabzug."
  - question: "Warum ergeben 40 Wochenstunden nicht genau 160 Stunden pro Monat?"
    answer: "Nur der Februar eines Gemeinjahres hat exakt vier Wochen. Im Schnitt umfasst ein 52-Wochen-Jahr genau 52 ÷ 12 = 4,3333 Wochen pro Monat, was bei 40 Wochenstunden 173,33 Monatsstunden entspricht. Im deutschen Arbeitsrecht (z. B. TVöD) wird häufig sogar der kalendergenaue Faktor 4,348 (173,92 Stunden) verwendet."
  - question: "Wie berücksichtige ich ein 13. oder 14. Monatsgehalt aus Deutschland, Österreich oder der Schweiz?"
    answer: "Tragen Sie am besten das gesamte vereinbarte Jahresbrutto inklusive vertraglich fixiertem Urlaubs- und Weihnachtsgeld als Jahresbetrag ein. Der Rechner teilt für den Monatsdurchschnitt durch 12; für Ihre reguläre monatliche Überweisung teilen Sie das Jahresbrutto zusätzlich durch 13 (DE/CH) beziehungsweise durch 14 (AT)."
  - question: "Muss ich meinen bezahlten gesetzlichen Jahresurlaub als unbezahlte Ausfallwochen eintragen?"
    answer: "Nein. Bei festangestellten Arbeitnehmern im DACH-Raum werden gesetzlicher und tariflicher Urlaub sowie Feiertage voll weiterbezahlt – lassen Sie das Feld für unbezahlte Wochen daher auf 0. Relevant wird dieser Wert erst bei unbezahltem Sonderurlaub, Sabbaticals oder für Selbstständige und Freiberufler."
  - question: "Wie vergleiche ich zwei Jobangebote mit unterschiedlicher Wochenarbeitszeit fair?"
    answer: "Rechnen Sie beide Jahresgehälter mit der jeweils im Vertrag festgelegten Wochenstundenzahl auf den effektiven Stundenlohn herunter. Ein Angebot über 58.000 € bei 35 Wochenstunden bringt mit 31,87 €/Std. deutlich mehr pro geleisteter Stunde als 62.000 € bei 40 Wochenstunden (29,81 €/Std.)."
---

Steht eine Gehaltsverhandlung, ein Jobwechsel zwischen verschiedenen Tarifverträgen oder der Vergleich zwischen einer Festanstellung und einem Stundenhonorar an, trügt der schnelle Blick auf eine einzelne Zahl oft gewaltig. Eine **38,5-Stunden-Woche** statt **40 Stunden**, ein **13. oder 14. Monatsgehalt** oder vier Wochen unbezahlter Leerlauf als Freiberufler verändern den wahren Wert Ihrer Arbeitsstunde erheblich. Unser **Gehaltsrechner** schlüsselt jeden Ausgangsbetrag – ob Stunden-, Tages-, Wochen-, Monats- oder Jahresbasis – sofort und konsistent auf sämtliche üblichen Abrechnungszeiträume auf.

## Die Umrechnungsformeln für alle Gehaltsperioden

Sämtliche Berechnungen folgen einem einheitlichen Jahresmodell auf Basis von **52 Kalenderwochen**, das unbezahlte Ausfallwochen sauber herausrechnet. Zunächst wird jede Eingabe auf das **Jahreseinkommen** normiert und anschließend auf alle Zielperioden heruntergebrochen:

```text
Bezahlte Arbeitswochen:   W = 52 − w_unbez
Tagesarbeitszeit:         h_Tag = h_w / d_w

Normierung auf Jahresgehalt J:
  aus Stundenlohn L_h:    J = L_h × h_w × W
  aus Tageslohn L_d:      J = L_d × d_w × W
  aus Wochenlohn L_w:     J = L_w × W
  aus Monatsgehalt G_m:   J = G_m × 12

Ableitung aller Perioden aus J:
  Monatsgehalt (12×):     G_m  = J / 12
  14-tägiger Lohn:        G_2w = (J / W) × 2
  Wochenlohn:             L_w  = J / W
  Stundenlohn:            L_h  = J / (W × h_w)
  Tageslohn:              L_d  = L_h × h_Tag
```

Dabei bezeichnet **J** das Jahresgehalt in Euro (`€`), **h_w** die vertraglichen Wochenstunden (im DACH-Raum meist `35` bis `42` Stunden), **d_w** die Arbeitstage pro Woche (Standard `5` Tage) und **w_unbez** die Anzahl unbezahlter Wochen pro Jahr (bei regulärer Festanstellung `0`, da Erholungsurlaub nach BUrlG, UrlG oder Schweizer OR sowie gesetzliche Feiertage vergütet werden).

Eine wichtige DACH-Feinheit betrifft den Monatsfaktor: Da ein durchschnittliches Kalenderjahr `365,2425 / 7 ≈ 52,18` Wochen zählt, rechnen viele deutsche Tarifverträge – darunter der **TVöD** – mit dem Faktor **4,348** statt `52 / 12 = 4,333`. Bei einer 40-Stunden-Woche ergeben sich dadurch **173,92** statt **173,33 Monatsstunden**. Diese geringfügige Abweichung von `0,34 %` erklärt, warum tarifliche Überstundenabrechnungen gelegentlich wenige Cent vom Standardmodell abweichen.

## Rechenbeispiele aus Festanstellung und Freiberuflichkeit

### Beispiel 1: Tarifliche Festanstellung mit 54.600 € Jahresbrutto (38,5 h / Woche)

Sie erhalten ein Stellenangebot über **54.600,00 € Jahresbrutto** bei einer **38,5-Stunden-Woche**, **5 Arbeitstagen** und bezahltem Jahresurlaub (`w_unbez = 0`, also `W = 52` bezahlte Wochen).

1. **Monatsdurchschnitt und Sonderzahlungen:** Bei 12 Gehältern liegt die monatliche Überweisung bei `54.600,00 € / 12 = 4.550,00 €`. Wird das Jahresbrutto in **13 Teilzahlungen** ausgeschüttet (verbreitet in Deutschland und der Schweiz), beträgt das laufende Monatsgehalt `54.600,00 € / 13 = 4.200,00 €`; im österreichischen **14-Gehälter-Modell** sind es `3.900,00 €` pro regulärem Monat plus zwei steuerbegünstigte Sonderzahlungen (Urlaubs- und Weihnachtsgeld).
2. **Wochen- und 14-Tage-Lohn:** `54.600,00 € / 52 = 1.050,00 €` pro Woche beziehungsweise **2.100,00 €** alle zwei Wochen.
3. **Tages- und Stundenlohn:** Bei `38,5 / 5 = 7,7 Stunden` pro Arbeitstag resultiert ein Tageslohn von `1.050,00 € / 5 = 210,00 €` und ein effektiver Stundenlohn von `1.050,00 € / 38,5 = 27,27 €`. Zum Vergleich: Bei einer 40-Stunden-Woche läge derselbe Jahresverdienst bei exakt **26,25 €/Std.** (`54.600 € / 2.080 Std.`).

### Beispiel 2: Selbstständige Honorarkraft mit unbezahlter Freizeit

Ein freiberuflicher Berater stellt **45,00 € pro Stunde** in Rechnung, leistet durchschnittlich **40 fakturierbare Stunden** an **5 Tagen** und plant **4 unbezahlte Wochen** für Urlaub und Weiterbildung ein (`W = 52 − 4 = 48` abrechenbare Wochen). Sein Jahresumsatz erreicht `45,00 € × 40 × 48 = 86.400,00 €`, entsprechend **7.200,00 €** im Monatsdurchschnitt und **360,00 €** pro fakturiertem Arbeitstag – vor Betriebsausgaben, Einkommensteuer und vollständiger eigener Sozialvorsorge.

## Referenztabelle: Jahresbrutto nach Auszahlungsmodell und Wochenstunden

Die Übersicht vergleicht typische DACH-Jahresgehälter über alle drei verbreiteten Monatsmodelle (12, 13 und 14 Gehälter) sowie drei gängige Wochenarbeitszeiten bei 52 bezahlten Wochen (alle Werte in €):

| Jahresbrutto (in €) | 12 Gehälter | 13 Gehälter (DE/CH) | 14 Gehälter (AT) | Stunde (40 h) | Stunde (38,5 h) | Stunde (35 h) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **36.000,00** | 3.000,00 | 2.769,23 | 2.571,43 | 17,31 | 17,98 | 19,78 |
| **48.000,00** | 4.000,00 | 3.692,31 | 3.428,57 | 23,08 | 23,98 | 26,37 |
| **60.000,00** | 5.000,00 | 4.615,38 | 4.285,71 | 28,85 | 29,97 | 32,97 |
| **75.000,00** | 6.250,00 | 5.769,23 | 5.357,14 | 36,06 | 37,46 | 41,21 |
| **90.000,00** | 7.500,00 | 6.923,08 | 6.428,57 | 43,27 | 44,96 | 49,45 |

## Häufige Fallstricke beim Gehaltsvergleich im DACH-Raum

- **Brutto, Netto und Arbeitgeberbrutto sauber auseinanderhalten:** In Deutschland schmälern Lohnsteuer und Arbeitnehmeranteile zur Sozialversicherung das Brutto je nach Steuerklasse meist um **30 % bis 45 %**. Gleichzeitig zahlt Ihr Arbeitgeber rund **20 %** zusätzliche Lohnnebenkosten obenauf (Arbeitgeberbrutto). Wer von der Festanstellung in die Selbstständigkeit wechselt, muss diese Sozialabgaben sowie Ausfallzeiten durch Krankheit und Akquise zwingend in seinen Stundensatz einpreisen.
- **Länderunterschiede in Österreich und der Schweiz beachten:** In Österreich senkt die steuerbegünstigte Behandlung des 13. und 14. Monatsgehalts innerhalb des Jahressechstels die effektive Gesamtsteuerlast deutlich. In der Schweiz sind längere reguläre Arbeitszeiten von **42 Wochenstunden** üblich; die direkten Lohnabzüge fallen moderater aus, dafür werden Krankenversicherungsprämien privat und einkommensunabhängig getragen.
- **Reale Arbeitszeit gegen Überstundenpauschalen prüfen:** Wer ein festes Monatsgehalt bezieht, aber regelmäßig unvergütete Mehrarbeit leistet, drückt seinen faktischen Stundenlohn. Prüfen Sie bei Verträgen mit pauschaler Überstundenabgeltung stets das reale Stundenentgelt – auch im Hinblick auf den gesetzlichen Mindestlohn.
- **Variable Boni und Teilzeitquoten realistisch bewerten:** Erfolgsorientierte Prämien oder geldwerte Vorteile (etwa ein Firmenwagen nach der 1-%-Regelung) sind nicht immer voll garantiert. Vergleichen Sie zuerst das feste Grundgehalt und denken Sie bei Teilzeitwechseln (z. B. 32 statt 40 Stunden) daran, dass das Brutto zwar um **20 %** sinkt, das Netto wegen der Steuerprogression aber prozentual deutlich weniger zurückgeht.
- **Gesetzlichen Mindesturlaub nicht als unbezahlte Ausfallzeit abziehen:** Bei einer Fünftagewoche stehen Arbeitnehmern in Deutschland mindestens **20 bezahlte Urlaubstage** nach dem Bundesurlaubsgesetz (üblich sind 28 bis 30 Tage), in Österreich **25 Arbeitstage** und in der Schweiz **vier Wochen** zu. Weil das Gehalt während dieser Erholungszeit regulär weiterfließt, bleibt das Feld für unbezahlte Wochen im Angestelltenverhältnis auf null.
