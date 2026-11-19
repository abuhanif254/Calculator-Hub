---
title: "Studienkostenrechner"
metaTitle: "Studienkostenrechner 2026: Studium & Sparplan berechnen"
description: "Schätzen Sie die zukünftigen Gesamtkosten eines Studiums inklusive Inflation und ermitteln Sie die erforderliche monatliche Sparrate bis zum Studienbeginn."
metaDescription: "Schätzen Sie künftige Studienkosten inklusive Inflation und berechnen Sie Ihre nötige Sparrate – mit BAföG-Höchstsatz, DACH- & Auslandsvergleich."
metaKeywords: "studienkostenrechner, studium kosten berechnen, studienfinanzierung rechner, bafög höchstsatz 2026, ausbildungssparplan kinder, kosten studium deutschland schweiz"
faqs:
  - question: "Was kostet ein Studium an einer staatlichen Universität in Deutschland insgesamt?"
    answer: "Obwohl im Erststudium an staatlichen Hochschulen in Deutschland keine regulären Studiengebühren anfallen, summieren sich Miete, Lebenshaltung, Semesterbeitrag, Krankenversicherung und Lernmittel je nach Hochschulstadt auf rund 950 € bis 1.300 € pro Monat. Ein dreijähriger Bachelor kostet damit heute etwa 35.000 € bis 47.000 €, ein fünfjähriges Studium bis zum Master rund 60.000 € bis 78.000 €."
  - question: "Wie hoch ist der BAföG-Höchstsatz 2026 und reicht er für die Lebenshaltung?"
    answer: "Der reguläre BAföG-Höchstsatz beträgt 2026 bis zu 992 € monatlich für Studierende mit eigenem Haushalt und eigener Kranken- sowie Pflegeversicherung (475 € Grundbedarf, 380 € Wohnpauschale, 137 € Versicherungszuschlag). Wer noch kostenfrei über die Eltern familienversichert ist, erhält maximal 855 €. In teuren Universitätsstädten deckt die Wohnpauschale von 380 € die tatsächliche WG-Miete jedoch oft nicht vollständig ab."
  - question: "Gefährdet ein Junior-Depot auf den Namen des Kindes den späteren BAföG-Anspruch?"
    answer: "Ja, das ist eine häufig übersehene Falle. Beim BAföG gilt für eigenes Vermögen des Studierenden ein Freibetrag von 15.000 € (bis zum 30. Lebensjahr). Übersteigt das angesparte Depot auf den Namen des Kindes diese Grenze zum Antragszeitpunkt, wird der übersteigende Betrag voll auf die Förderung angerechnet. Bei absehbarem BAföG-Anspruch kann das Sparen im Elterndepot daher strategisch sinnvoller sein."
  - question: "Welche Inflationsrate sollte ich im Studienkostenrechner ansetzen?"
    answer: "Für ein Studium im deutschsprachigen Raum ist eine jährliche Steigerungsrate von 2,5 % bis 3,5 % realistisch, da vor allem studentische Wohnungsmieten in Universitätsstädten langfristig stärker steigen als der allgemeine Verbraucherpreisindex. Planen Sie ein Studium an einer US-amerikanischen oder britischen Privatuniversität, sollten Sie vorsichtiger mit 4 % bis 5 % Bildungs-Inflation kalkulieren."
  - question: "Wann sollte angespartes Studiengeld von Aktien-ETFs in sichere Anlagen umgeschichtet werden?"
    answer: "Spätestens drei bis fünf Jahre vor der geplanten Immatrikulation empfiehlt es sich, schrittweise Gewinne zu sichern und den kurzfristigen Bedarf für die ersten zwei Studienjahre in Tagesgeld, kurzlaufendes Festgeld oder Geldmarktfonds umzuschichten. So vermeiden Sie, bei einem Börsenrückgang kurz vor Semesterbeginn Anteile mit Verlust verkaufen zu müssen."
---

## Warum ein Studium oft teurer wird als auf den ersten Blick gedacht

Wer im deutschsprachigen Raum ein Hochschulstudium plant, denkt bei den Kosten oft zuerst an Studiengebühren – und wähnt sich dank gebührenfreier staatlicher Universitäten in Deutschland und Österreich auf der sicheren Seite. In Wahrheit machen die eigentlichen Hochschulgebühren im Erststudium nur einen Bruchteil der Rechnung aus. Der dominierende Kostenblock sind **Miete, Lebenshaltung, Krankenversicherung ab dem 25. Lebensjahr, Semesterbeiträge, Laptop und Fachliteratur**. Selbst ein moderates Großstadtstudium erfordert heute schnell über 1.100 € im Monat.

Liegen zwischen heute und dem Studienbeginn Ihres Kindes noch zehn oder fünfzehn Jahre, verschärft die **Kosteninflation** diesen Bedarf erheblich. Gerade WG-Zimmer, Studentenwohnheime und Gebühren privater Hochschulen steigen erfahrungsgemäß spürbar schneller als klassische Verbraucherpreise. Der **Studienkostenrechner** verbindet diese künftige Kostenkurve mit dem Wachstum Ihrer Ersparnisse und ermittelt exakt, welche monatliche Sparrate heute nötig ist, um das Studium schuldenfrei zu finanzieren.

## Zweistufige Kalkulation: Studieninflation und monatliche Sparrate

Eine realistische Studienfinanzierung verknüpft zwei finanzmathematische Schritte: Zuerst werden die künftigen Gesamtkosten (`K_gesamt`) unter Berücksichtigung einer jährlichen Steigerungsrate (`g`) über alle `D` Studienjahre ermittelt, wobei der Studienbeginn in `t` Jahren liegt:

```
K_gesamt = K₀ · (1 + g)^t · [ ((1 + g)^D − 1) / g ]
```

Anschließend wird berechnet, welcher monatliche Sparbetrag (`S`) bei bereits vorhandenem Startguthaben (`A₀`) und monatlicher Anlagerendite `i = r / 12` über `n = 12 · t` Monate bis zur Immatrikulation erforderlich ist:

```
S = [ K_gesamt − A₀ · (1 + i)^n ] · i / [ (1 + i)^n − 1 ]
```

Die Variablen im Überblick:

- **`K₀`**: Heutige jährliche Gesamtkosten (Lebenshaltung + Studien- und Semestergebühren + Lernmittel).
- **`g`**: Erwartete jährliche Kostensteigerung (z. B. `3,0 %` für DACH-Städte, `4,5 %` für US-Colleges).
- **`t`**: Jahre bis zum Studienbeginn (`n = 12 · t` Sparmonate).
- **`D`**: Geplante Studiendauer in Jahren (typisch `3` für Bachelor, `5` für Bachelor + Master).
- **`A₀`** und **`r`**: Vorhandenes Startkapital und erwartete jährliche Nettorendite Ihrer Geldanlage.

## Fallstudie: 5-jähriges Großstadtstudium in zehn Jahren finanzieren

Eltern eines achtjährigen Kindes möchten ab dessen 18. Lebensjahr (**`t = 10 Jahre`**, `n = 120 Monate`) ein fünfjähriges Studium (**`D = 5 Jahre`**, Bachelor + Master) an einer staatlichen deutschen Universität finanzieren. Die heutigen Gesamtkosten setzen sie mit **`K₀ = 13.200 € pro Jahr`** an (`1.100 €/Monat` inklusive WG-Zimmer, Verpflegung, Semesterbeitrag und Lernmitteln). Sie kalkulieren mit **`g = 3,0 %`** jährlicher Kostensteigerung, bringen **`A₀ = 5.000 €`** Startkapital mit und besparen einen globalen Aktien-ETF mit **`r = 6,0 % p. a.`** (`i = 0,005`).

1. **Jahreskosten im ersten Studienjahr (in 10 Jahren)**: `13.200 € · (1,03)^10 = 17.739,70 €`.
2. **Inflationsangepasste Gesamtkosten über 5 Studienjahre**: `17.739,70 € · ((1,03)^5 − 1) / 0,03 = 94.182,46 €` – im Vergleich zu `66.000 €` nach heutigen Preisen treibt die Inflation den Bedarf um über **28.000 €** nach oben.
3. **Endwert des Startkapitals nach 10 Jahren**: `5.000 € · (1,005)^120 = 9.096,98 €`.
4. **Verbleibende Finanzierungslücke**: `94.182,46 € − 9.096,98 € = 85.085,47 €`.
5. **Erforderliche monatliche Sparrate**: `85.085,47 € · 0,005 / ((1,005)^120 − 1) = 519,20 €`.

Über zehn Jahre zahlen die Eltern insgesamt **67.303,50 €** aus eigener Tasche ein (`5.000 €` Startkapital plus `120` Sparraten); die Kapitalmarktrendite steuert **26.878,96 €** bei. Berücksichtigen die Eltern zusätzlich das deutsche **Kindergeld (255 €/Monat)** während des Studiums (über 5 Jahre weitere `15.300 €`), sinkt die nötige monatliche Ansparrate bereits erheblich.

## Studienkosten nach Hochschultyp und Studienland im Vergleich

Je nach Hochschulform und Studienort klaffen die Budgets weit auseinander. Die folgende Übersicht vergleicht typische Richtwerte (Stand 2026, umgerechnet bzw. in EUR-Größenordnung) heute und bei Studienbeginn in 10 Jahren:

| Studienmodell | Gebühren / Jahr | Lebenshaltung / Jahr | Gesamtkosten heute | Projektion in 10 J. |
| :--- | :---: | :---: | :---: | :---: |
| **Staatl. Uni Deutschland (Bachelor, 3 J.)** | ca. 600 €* | 12.600 € | 39.600 € | **54.832 €** (3 % Infl.) |
| **Staatl. Uni Deutschland (Bachelor + Master, 5 J.)** | ca. 600 €* | 12.600 € | 66.000 € | **94.182 €** (3 % Infl.) |
| **Private Hochschule DACH (Bachelor, 3 J.)** | ca. 7.800 € | 12.600 € | 61.200 € | **84.740 €** (3 % Infl.) |
| **Staatl. Uni Schweiz (Bachelor, 3 J.)** | ca. 1.600 € | 21.000 € | 67.800 € | **88.978 €** (2,5 % Infl.) |
| **US-Privatuniversität (Bachelor, 4 J.)** | ca. 42.000 € | 18.000 € | 240.000 € | **398.634 €** (4,5 % Infl.) |

*\*Staatliche Universitäten in Deutschland erheben im Erststudium grundsätzlich keine Studiengebühren; der Betrag bildet typische Semesterbeiträge inklusive Semesterticket ab.*

## Finanzierung klug kombinieren: BAföG-Falle, Junior-Depot und Timing

Niemand muss die gesamte Projektsumme allein vorab ansparen. Eine kluge Studienfinanzierung kombiniert mehrere Säulen – und vermeidet dabei teure Strukturfehler:

### BAföG-Vermögensfreibetrag gegen Steuervorteile abwägen
Ein **Junior-Depot auf den Namen des Kindes** ist steuerlich äußerst attraktiv: Mit einer Nichtveranlagungsbescheinigung bleiben Kapitalerträge bis zum Grundfreibetrag (2026: **12.348 €**) zuzüglich Sparer-Pauschbetrag (**1.000 €**) komplett steuerfrei. Der Haken: Ab dem 18. Geburtstag gehört das Geld uneingeschränkt dem Kind, und eigenes Vermögen oberhalb von **15.000 €** mindert einen möglichen **BAföG-Anspruch** (der zu 50 % aus geschenktem Staatszuschuss besteht und dessen zinsloses Darlehen bei 10.010 € gedeckelt ist). Verdienen die Eltern so gut, dass ohnehin kein BAföG zusteht, spielt das Junior-Depot seine Stärken voll aus; andernfalls bleibt das Depot besser im Namen der Eltern.

### KfW-Studienkredit, Stipendien und US-529-Pläne
Nutzen Sie kostenfreie Bausteine zuerst: Neben Kindergeld, Werkstudentenjobs (Minijob-Grenze ohne BAföG-Abzug beachten) und steuerlich absetzbaren Ausbildungsfreibeträgen vergeben Begabtenförderungswerke tausende Stipendien – nicht nur an Einser-Abiturienten, sondern auch für gesellschaftliches Engagement. Verzinsliche Studienkredite (wie der KfW-Studienkredit) sind wegen variabler Zinsen hingegen meist die teuerste Option und sollten nur punktuelle Lücken schließen. Für Familien mit **US-Steuerpflicht** lohnt sich zudem ein steuerbegünstigter **529-Plan**: Erträge wachsen US-steuerfrei, und nicht genutztes Guthaben lässt sich nach 15 Jahren Haltedauer dank SECURE 2.0 bis zu 35.000 USD in eine Roth IRA des Kindes übertragen.

### Ablaufmanagement fünf Jahre vor dem Abitur
Spätestens fünf Jahre vor Studienbeginn sollte das Risiko im Ausbildungsdepot schrittweise reduziert werden. Schichten Sie mindestens den Bedarf der ersten vier Semester rechtzeitig aus Aktienfonds in sichere Tages- oder Festgelder um, damit ein ungünstiges Börsenjahr den Studienstart nicht plötzlich gefährdet.
