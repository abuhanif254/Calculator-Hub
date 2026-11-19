---
title: "HELOC-Rechner"
metaTitle: "HELOC-Rechner: Ziehungs- & Tilgungsrate exakt berechnen"
description: "Berechnen Sie monatliche Zinszahlungen, spätere Tilgungsraten und Gesamtzinskosten für eine Eigenheim-Kreditlinie (HELOC) über Ziehungs- und Rückzahlungsphase."
metaDescription: "Berechnen Sie Monatsraten, Gesamtzinsen und den möglichen Ratenschock einer Eigenheim-Kreditlinie (HELOC) für Ziehungs- und Rückzahlungsphase."
metaKeywords: "heloc rechner, eigenheim kreditlinie berechnen, home equity line of credit, ziehungsphase tilgungsphase, ratenschock heloc, cltv beleihungsauslauf, grundschuld rahmenkredit"
faqs:
  - question: "Gibt es ein klassisches HELOC-Modell auch bei Banken in Deutschland, Österreich oder der Schweiz?"
    answer: "Einen exakt nach US-Muster konstruierten revolvierenden Immobilien-Rahmenkredit bieten Banken im DACH-Raum nur selten für Privatkunden an. Als funktionale Gegenstücke dienen in Deutschland die erneute Beleihung einer bestehenden Grundschuld (Revalutierung), ein grundbuchfreier Modernisierungskredit bis etwa 50.000 € oder in der Schweiz die Aufstockung einer variablen Hypothek bzw. SARON-Hypothek."
  - question: "Wie berechnet sich der maximale Kreditrahmen eines HELOC?"
    answer: "Kreditgeber legen das Limit über den kombinierten Beleihungsauslauf (CLTV) fest, der in den USA meist bei 80 % bis 85 % des aktuellen Verkehrswerts liegt. Von diesem Höchstwert wird die verbleibende Restschuld Ihrer bestehenden Ersthypothek abgezogen – die Differenz bildet die maximal mögliche Kreditlinie."
  - question: "Was versteht man beim HELOC unter dem sogenannten Ratenschock?"
    answer: "Während der Ziehungsphase verlangen die meisten HELOC-Verträge lediglich monatliche Zinszahlungen auf den abgerufenen Betrag, ohne dass die Hauptschuld sinkt. Sobald die Rückzahlungsphase beginnt, muss der komplette offene Saldo zuzüglich Zinsen innerhalb der Restlaufzeit getilgt werden – je nach Zinssatz und Laufzeit steigt die Monatsrate schlagartig um 25 % bis über 75 %."
  - question: "Darf ich bereits während der Ziehungsphase Kapital tilgen, um Zinsen zu sparen?"
    answer: "Ja, genau darin liegt der größte wirtschaftliche Vorteil einer Eigenheim-Kreditlinie. Fast alle HELOCs erlauben flexible Rückzahlungen während der Ziehungsphase ohne Vorfälligkeitsentschädigung. Jeder vorzeitig getilgte Betrag reduziert sofort die laufende Zinslast und steht bis zum Ende der Ziehungsphase bei Bedarf erneut zur Verfügung."
  - question: "Wann ist ein Festzinsdarlehen besser geeignet als ein HELOC?"
    answer: "Wenn Sie eine fest kalkulierte Einmalinvestition finanzieren und Planungssicherheit brauchen, ist ein Festzins-Eigenheimdarlehen (Home Equity Loan) oder ein klassischer Modernisierungskredit meist überlegen. Ein HELOC spielt seine Stärken vor allem bei etappenweisen Renovierungen aus, bei denen Kapital schrittweise abgerufen und zügig wieder zurückgeführt werden soll."
---

## Wie ein HELOC funktioniert – und was ihn von der deutschen Grundschuld unterscheidet

Ein **HELOC** (*Home Equity Line of Credit*) ist eine im US-amerikanischen und kanadischen Immobilienmarkt weit verbreitete revolvierende Kreditlinie, die durch das aufgebaute Eigenkapital einer Wohnimmobilie besichert wird. Für deutschsprachige Auswanderer in Nordamerika, internationale Immobilieninvestoren oder Eigentümer von US-Objekten zählt er zu den flexibelsten Instrumenten der Nachfinanzierung. Anders als ein klassisches Annuitätendarlehen wird nicht die gesamte Summe auf einmal ausgezahlt: Die Bank gewährt ein festes Kreditlimit, aus dem Sie bei Bedarf Teilbeträge abrufen – vergleichbar mit einem grundschuldbesicherten Rahmenkredit zu spürbar niedrigeren Zinsen als bei Kreditkarten oder unbesicherten Ratenkrediten.

### Ziehungsphase und Rückzahlungsphase als Zweistufenmodell

Die Mechanik eines HELOC gliedert sich fast immer in zwei zeitlich getrennte Abschnitte:

- **Ziehungsphase (typisch 5 bis 10 Jahre):** Sie können Geld bis zum genehmigten Limit abrufen, jederzeit zurückzahlen und erneut beanspruchen. Zinsen fallen nur auf den tatsächlich genutzten Saldo an. Die vertragliche Mindestrate deckt meist ausschließlich die laufenden Monatszinsen (*Interest-Only*).
- **Rückzahlungsphase (typisch 10 bis 20 Jahre):** Weitere Abrufe sind gesperrt. Der verbleibende Saldo wandelt sich in ein reguläres Tilgungsdarlehen, das über die Restlaufzeit vollständig auf null abbezahlt wird.

Im deutschsprachigen Raum gibt es dieses reine Zwei-Phasen-Modell für Privatkunden kaum. Eigentümer in Deutschland, Österreich oder der Schweiz nutzen stattdessen die **Revalutierung einer bestehenden Grundschuld**, einen grundbuchfreien **Modernisierungskredit** (oft bis 50.000 €) oder in der Schweiz eine **Hypothekenaufstockung** im Rahmen der Tragbarkeitsregeln.

## Die Zwei-Phasen-Formel für Zins- und Tilgungsrate

Für die Kalkulation kombiniert der Rechner den maximalen Kreditrahmen über den **kombinierten Beleihungsauslauf (CLTV)** mit der Zinsrate der Ziehungsphase und der Annuität der Rückzahlungsphase:

```text
Max. Kreditrahmen = (Immobilienwert × CLTV_max) − Restschuld_Ersthypothek
Ziehungsphase:    R_Ziehung = A × i
Tilgungsphase:    R_Tilgung = A × [i × (1 + i)^n] / [(1 + i)^n − 1]
```

Dabei stehen **A** für den abgerufenen Saldo, **i** für den monatlichen Zinssatz (`variabler Jahreszins / 12`), **n** für die Anzahl der Monate in der Tilgungsphase (`Tilgungsjahre × 12`) und **CLTV_max** für die Beleihungsgrenze der Bank (marktüblich **80 % bis 85 %**). Die gesamten Zinskosten ergeben sich aus allen Zinsen der Ziehungsphase (`R_Ziehung × Ziehungsjahre × 12`) plus den Zinskosten der Rückzahlungsphase (`R_Tilgung × n − A`).

## Durchgerechnetes Beispiel: 50.000 $ Abruf bei 8,50 % über 10 + 20 Jahre

Angenommen, ein Eigenheim besitzt einen Marktwert von **450.000 $** bei **260.000 $** Restschuld auf der Ersthypothek. Bei einem maximalen CLTV von **80 %** (360.000 $) räumt die Bank ein HELOC-Limit von **100.000 $** ein. Für eine umfassende Renovierung ruft der Eigentümer **50.000 $** zu einem variablen Satz von **8,50 % p. a.** ab (10 Jahre Ziehungsphase, 20 Jahre Tilgungsphase).

1. **Monatszins bestimmen:** `i = 0,085 / 12 = 0,00708333`
2. **Monatsrate während der Ziehungsphase:** `50.000 $ × 0,00708333 = 354,17 $`
3. **Zinskosten der Ziehungsphase:** Über 10 Jahre (120 Monate) zahlt der Eigentümer **42.500,00 $** reine Zinsen – am Ende des zehnten Jahres beträgt die Restschuld unverändert **50.000 $**.
4. **Monatsrate in der Rückzahlungsphase:** Mit `(1 + 0,00708333)^240 ≈ 5,441243` steigt die Pflichtrate schlagartig auf **433,91 $** pro Monat – ein Zuwachs um **79,74 $** (+22,5 %).
5. **Gesamtzinsen über 30 Jahre:** Während der 20-jährigen Tilgung fallen weitere **54.138,79 $** Zinsen an. Insgesamt kosten die genutzten 50.000 $ somit **96.638,79 $** an Zinsen (Gesamtrückzahlung **146.638,79 $**).

Wer denselben Betrag sofort ab Monat 1 über 20 Jahre tilgt, erspart sich die kompletten **42.500,00 $** Ziehungszinsen.

## Ratenschock-Analyse: Zinssätze und Laufzeiten im Direktvergleich

Weil HELOC-Zinsen fast immer variabel an den US-Leitzins (*Prime Rate* plus Marge) gekoppelt sind, verschieben bereits zwei Prozentpunkte Zinsanstieg das Monatsbudget spürbar. Die Tabelle vergleicht fünf realistische Varianten für einen Abruf von **50.000 $**:

| Szenario (50.000 $ Abruf) | Zins p. a. | Ziehung / Tilgung | Ziehungsrate | Tilgungsrate | Ratensprung | Gesamtzinsen |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Niedrigzins-Fall** | 6,50 % | 10 J. / 20 J. | 270,83 $ | 372,79 $ | +101,95 $ (+37,6 %) | 71.968,78 $ |
| **Basis-Szenario** | 8,50 % | 10 J. / 20 J. | 354,17 $ | 433,91 $ | +79,74 $ (+22,5 %) | 96.638,79 $ |
| **Zinsanstieg (+2 %)** | 10,50 % | 10 J. / 20 J. | 437,50 $ | 499,19 $ | +61,69 $ (+14,1 %) | 122.305,59 $ |
| **Kurze Tilgung** | 8,50 % | 10 J. / 10 J. | 354,17 $ | 619,93 $ | +265,76 $ (+75,0 %) | 66.891,41 $ |
| **Sofortige Tilgung** | 8,50 % | 0 J. / 20 J. | 0,00 $ | 433,91 $ | entfällt | 54.138,79 $ |

Auffällig ist das vermeintliche Paradoxon der **10-jährigen Rückzahlungsphase**: Der monatliche Ratenschock fällt mit **+75,0 %** zwar am schärfsten aus, doch sinken die Gesamtzinsen gegenüber dem 10+20-Standardmodell um fast **30.000 $**.

## Vier zentrale Risiken und strategische Einsatzregeln

1. **Variables Zinsrisiko begrenzen:** Anders als bei deutschen 10- oder 15-Jahres-Zinsbindungen passt sich ein HELOC-Zinssatz bereits nach dem nächsten Notenbankentscheid an. Prüfen Sie im Vertrag die jährliche und lebenslange Zinsobergrenze (*Rate Cap*) sowie die Option, abgerufene Teilbeträge in eine Festzinstranche (*Fixed-Rate Lock*) umzuwandeln.
2. **Keine Konsumausgaben über Immobilien-Substanz finanzieren:** Da Ihr Eigenheim als nachrangige Grundsicherheit haftet, droht bei Zahlungsausfall im Ernstfall der Verlust des Hauses. Nutzen Sie einen HELOC gezielt für wertsteigernde Modernisierungen oder kurzfristige Zwischenfinanzierungen, niemals für Urlaub oder laufenden Konsum.
3. **Kreditlinien-Einfrierung einkalkulieren:** Fallen die regionalen Immobilienpreise oder sinkt Ihre Kreditwürdigkeit, dürfen US-Banken ungenutzte Kreditlinien jederzeit einseitig kürzen oder sperren (*HELOC Freeze*). Behandeln Sie eine offene Kreditlinie daher niemals als Ersatz für einen echten liquiden Notgroschen.
4. **US-Steuerregeln sauber anwenden:** Nach US-Steuerrecht sind HELOC-Zinsen ausschließlich dann steuerlich absetzbar, wenn die Mittel nachweislich für Kauf, Bau oder substanzielle Wertsteigerung der besicherten Immobilie verwendet werden und die kombinierte Hypothekenschuld das gesetzliche Limit von 750.000 $ (bei Zusammenveranlagung) nicht überschreitet. Für Umschuldungen von Konsum- oder Kreditkartenschulden entfällt jeder Steuerabzug.
