---
title: "401(k) & Betriebliche Altersvorsorge Rechner"
metaTitle: "401(k)-Rechner | Vorsorgekapital & Zuschuss berechnen"
description: "Berechnen Sie den langfristigen Vermögensaufbau Ihres 401(k)-Pensionsplans oder einer betrieblichen Altersvorsorge (bAV) inklusive Arbeitgeberzuschuss, Gehaltsentwicklung und Zinseszins."
metaDescription: "Berechnen Sie Ihr 401(k)- oder bAV-Endkapital mit Arbeitgeberzuschuss, Gehaltsplus und Zinseszins – inklusive Formel, Rechenbeispiel und Steuer-Check."
metaKeywords: "401k rechner, betriebliche altersvorsorge rechner, arbeitgeberzuschuss altersvorsorge, rentensparen zinseszins, traditional vs roth 401k, bav vergleich"
faqs:
  - question: "Wie berechnet der 401(k)-Rechner den gedeckelten Arbeitgeberzuschuss?"
    answer: "Der Arbeitgeberzuschuss greift nur bis zur vereinbarten Gehaltsobergrenze. Lautet die Regelung beispielsweise ‚100 % Zuschuss bis 4 % des Bruttogehalts‘, erhalten Sie bei 4 % Eigenbeitrag ebenfalls 4 % vom Arbeitgeber. Erhöhen Sie Ihren Eigenbeitrag auf 7 %, bleibt der Arbeitgeberanteil bei exakt 4 % gedeckelt; zahlen Sie nur 2 % ein, verschenken Sie die Hälfte der möglichen Förderung."
  - question: "Warum verzinst der Rechner die laufenden Jahresbeiträge nur mit der halben Jahresrendite?"
    answer: "Gehaltsabhängige Vorsorgebeiträge fließen nicht vollständig am 1. Januar, sondern gleichmäßig mit jeder monatlichen oder vierzehntägigen Lohnabrechnung in den Vertrag. Im Durchschnitt steht ein laufender Jahresbeitrag daher rund sechs Monate im Markt – der Faktor r/2 bildet diese unterjährige Einzahlungsdynamik realistisch ab, ohne das Endvermögen zu überschätzen."
  - question: "Wann ist ein Traditional-401(k) vorteilhafter als ein Roth-401(k)?"
    answer: "Entscheidend ist der Vergleich Ihres heutigen Grenzsteuersatzes mit dem erwarteten Steuersatz im Ruhestand. Ein Traditional-401(k) (nachgelagerte Besteuerung) lohnt sich vor allem bei aktuell hohem Einkommen und hoher Steuerprogression, wenn die Rente später niedriger besteuert wird. Ein Roth-401(k) (vorgelagerte Besteuerung) punktet am Berufsanfang, wenn Sie heute wenig Steuern zahlen und alle künftigen Wertzuwächse steuerfrei entnehmen möchten."
  - question: "Wie stark schmälern laufende Fondskosten (TER) das Vorsorgevermögen über Jahrzehnte?"
    answer: "Bereits 1,5 Prozentpunkte höhere jährliche Produktkosten wirken wie ein dauerhafter Gegenwind für den Zinseszins. Bei 39 Jahren Laufzeit, 12.000 € Startguthaben, 62.000 € Startgehalt, 7 % Eigenbeitrag und 4 % Arbeitgeberzuschuss sinkt das Endkapital bei 5,0 % statt 6,5 % Nettorendite von 1.625.459 € auf 1.138.354 € – ein Kostenverlust von über 487.000 €."
  - question: "Wie lässt sich das 401(k)-Modell auf Deutschland, Österreich und die Schweiz übertragen?"
    answer: "Mathematisch folgen die deutsche betriebliche Altersvorsorge (bAV per Entgeltumwandlung), österreichische Pensionskassen und die Schweizer Pensionskasse (2. Säule / BVG) exakt demselben Prinzip aus prozentualem Bruttobeitrag, Arbeitgeberzuschuss und Kapitalmarktverzinsung. Achten Sie jedoch auf nationale Besonderheiten wie den deutschen Pflichtzuschuss von mindestens 15 %, volle GKV-Beiträge oberhalb des Freibetrags im Ruhestand oder die mindestens paritätische 50-%-Finanzierung in der Schweiz."
---

Betrieblich geförderte Vorsorgepläne zählen weltweit zu den wirkungsvollsten Instrumenten für den langfristigen Ruhestandsaufbau. Ob ein US-amerikanischer **401(k)-Plan** bei einem internationalen Arbeitgeber, die **betriebliche Altersvorsorge (bAV)** in Deutschland, eine **Pensionskasse** in Österreich oder die **berufliche Vorsorge (2. Säule / BVG)** in der Schweiz: Immer greifen drei Verstärker ineinander – prozentuale Gehaltseinzahlungen, ein direkter **Arbeitgeberzuschuss** und jahrzehntelanger steuerbegünstigter **Zinseszins**. Unser Rechner verknüpft diese Größen mit Ihrer erwarteten Gehaltsentwicklung und schlüsselt exakt auf, wie sich Ihr Endvermögen bis zum Renteneintritt zusammensetzt.

## Aufbau und Eingabegrößen des 401(k)-Rechners

Anders als ein starrer Banksparplan mit gleichbleibenden Euro-Raten passen sich betriebliche Vorsorgepläne automatisch Ihrem Einkommen an. Jede Gehaltserhöhung hebt sowohl Ihren Eigenbeitrag als auch den proportionalen Zuschuss Ihres Arbeitgebers spürbar mit an. Der Rechner erfasst dafür sechs zentrale Stellschrauben:

- **Ansparhorizont:** Aktuelles Alter und geplantes Renteneintrittsalter bestimmen die Anzahl der vollen Beitragsjahre `N`.
- **Startguthaben (`K_0`):** Bereits bestehendes Vorsorgekapital in Euro, das ab dem ersten Jahr vollständig verzinst wird.
- **Bruttojahresgehalt (`G_0`) und Gehaltssteigerung (`g`):** Ihr jährliches Bruttoeinkommen samt erwarteter Lohnentwicklung in Prozent pro Jahr.
- **Eigene Sparquote (`s_AN`):** Der Prozentsatz Ihres Bruttogehalts, den Sie direkt über die Gehaltsabrechnung in den Vorsorgeplan einzahlen.
- **Arbeitgeberzuschuss (`m_AG` und `c_AG`):** Die Zuschussquote Ihres Arbeitgebers (z. B. 50 % oder 100 %) sowie die geförderte Gehaltsobergrenze (etwa bis 4 % oder 6 % des Bruttogehalts).
- **Erwartete Jahresrendite (`r`):** Ihre durchschnittliche jährliche Nettorendite nach Abzug laufender Produktkosten.

## Exakte Jahresformel für Kapitalaufbau und Arbeitgeberzuschuss

Weil Gehalt, Eigenbeitrag und gedeckelter Arbeitgeberzuschuss dynamisch mitwachsen, berechnet der Rechner die Kapitalentwicklung rekursiv für jedes einzelne Jahr `t = 1, 2, …, N`:

```text
Jahresgehalt:        G_t = G_0 × (1 + g)^(t − 1)
Eigenbeitrag:        E_t = G_t × s_AN
Arbeitgeberzuschuss: Z_t = G_t × min(s_AN, c_AG) × m_AG
Jahresrendite:       W_t = K_(t−1) × r + (E_t + Z_t) × (r / 2)
Jahresendguthaben:   K_t = K_(t−1) + E_t + Z_t + W_t
```

Zwei Details dieser Formel sind in der Praxis entscheidend: Erstens begrenzt `min(s_AN, c_AG)` den Arbeitgeberzuschuss exakt auf die vertragliche Obergrenze – sparen Sie weniger als `c_AG`, lassen Sie geschenktes Gehalt liegen; sparen Sie mehr, wächst Ihr Eigenanteil weiter, während der Zuschuss am Deckel verbleibt. Zweitens verzinst `(E_t + Z_t) × (r / 2)` laufende Jahresbeiträge im Mittel für ein halbes Jahr, weil Lohnabzüge gleichmäßig über zwölf Monate verteilt eingehen.

## Durchgerechnetes Fallbeispiel: 39 Jahre Ansparphase bis Alter 67

Verfolgen wir eine **28-jährige Angestellte**, die bis zum regulären Renteneintrittsalter von **67 Jahren** (`N = 39 Jahre`) vorsorgt. Ausgangsdaten: **12.000,00 €** Startguthaben, **62.000,00 €** Bruttojahresgehalt, **2,0 %** jährliche Gehaltssteigerung, **7,0 %** Eigenbeitrag, ein **1:1-Arbeitgeberzuschuss von 100 % bis 4,0 % Gehalt** (`m_AG = 1,0`, `c_AG = 0,04`) und **6,5 % p. a.** Nettorendite.

**Jahr 1 (Alter 28 auf 29):**

1. **Eigenbeitrag:** `62.000,00 × 0,07 = 4.340,00 €`.
2. **Arbeitgeberzuschuss:** `62.000,00 × min(0,07; 0,04) × 1,0 = 2.480,00 €`.
3. **Jahresrendite:** `12.000,00 × 0,065 + (4.340,00 + 2.480,00) × 0,0325 = 780,00 + 221,65 = 1.001,65 €`.
4. **Endstand nach Jahr 1:** **19.821,65 €**. Im zweiten Jahr steigt das Gehalt auf 63.240,00 €, Eigenbeitrag (4.426,80 €), Zuschuss (2.529,60 €) und Rendite (1.514,49 €) heben das Guthaben auf **28.292,54 €**.

**Gesamtergebnis nach 39 Jahren (Alter 67):** Auf 12.000,00 € Startkapital folgen **252.749,61 €** eigene Einzahlungen, **144.428,35 €** Arbeitgeberzuschüsse und **1.216.281,34 €** kumulierter Zinseszinsertrag (74,8 % des Endvermögens) – zusammen **1.625.459,30 €**. Ohne den Arbeitgeberzuschuss bliebe das Endkapital bei **1.085.255,71 €** stehen; der Zuschuss erzeugt über Zinseszins also **540.203,59 €** Mehrvermögen.

## Zeitfaktor im Vergleich: Was ein späterer Sparbeginn bis Alter 67 kostet

Die folgende Übersicht zeigt für ein Einstiegsgehalt von 62.000 € (2,0 % Gehaltsplus, 0 € Startguthaben, 7 % Eigenbeitrag, 100 % Zuschuss bis 4 %, 6,5 % Nettorendite), wie stark das Einstiegsalter das Endkapital prägt (alle Kapitalbeträge in Euro):

| Einstiegsalter (Laufzeit) | Eigenbeiträge (€) | Arbeitgeberzuschuss (€) | Zinseszinsertrag (€) | Endkapital mit 67 (€) | Zinsanteil |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **25 Jahre (42 Jahre)** | 281.502 | 160.858 | 1.401.829 | **1.844.189** | 76,0 % |
| **30 Jahre (37 Jahre)** | 234.509 | 134.005 | 914.311 | **1.282.824** | 71,3 % |
| **35 Jahre (32 Jahre)** | 191.945 | 109.683 | 577.426 | **879.054** | 65,7 % |
| **45 Jahre (22 Jahre)** | 118.478 | 67.701 | 197.298 | **383.477** | 51,4 % |
| **50 Jahre (17 Jahre)** | 86.852 | 49.630 | 100.869 | **237.351** | 42,5 % |

Wer den Beginn um zehn Jahre von 25 auf 35 verschiebt, verzichtet nicht bloß auf zehn Beitragsjahre, sondern verliert knapp **eine Million Euro** Endkapital – weil die ertragsstärksten Zinseszinsjahre am Ende der Laufzeit wegfallen. Wer später einsteigt, sollte daher konsequent jede Beförderung nutzen, um die persönliche Sparquote schrittweise anzuheben.

## Strategische Entscheidungen und häufige Fallstricke

- **Nachgelagerte versus vorgelagerte Besteuerung:** Bei einem US-amerikanischen **Traditional-401(k)** – ähnlich der deutschen bAV oder Schweizer Säule 3a – senken Beiträge heute die Einkommensteuer, während Rentenzahlungen im Alter besteuert werden. Ein **Roth-401(k)** kehrt diese Logik um: Einzahlungen stammen aus bereits versteuertem Einkommen, dafür bleiben sämtliche Gewinne und Entnahmen im Ruhestand steuerfrei.
- **Laufende Fondskosten (TER) streng kontrollieren:** Kostet ein aktiver Versicherungs- oder Fondsvertrag 1,5 Prozentpunkte mehr pro Jahr als ein günstiger Indexfonds, fällt das Endkapital unseres 39-Jahres-Beispiels bei 5,0 % statt 6,5 % Nettorendite auf **1.138.354,17 €** – ein stiller Gebührenverlust von **487.105,13 €**.
- **Guthaben aktiv investieren statt im Geldmarkt parken:** Bei US-401(k)-Plänen landen erste Einzahlungen mitunter automatisch in niedrig verzinsten Geldmarktfonds. Kontrollieren Sie nach Planeröffnung stets die tatsächliche Fondsauswahl und prüfen Sie regelmäßig die Aktienquote passend zu Ihrer Restlaufzeit.
- **Jobwechsel, Unverfallbarkeit und DACH-Abgaben prüfen:** Lassen Sie einen US-401(k) bei Stellenwechsel niemals vorzeitig auszahlen (sonst drohen Einkommensteuer plus 10 % Strafsteuer vor Alter 59½), sondern übertragen Sie ihn steuerneutral. In Deutschland greift für arbeitgeberfinanzierte bAV-Zusagen die gesetzliche Unverfallbarkeit nach § 1b BetrAVG ab Alter 21 und drei Jahren Betriebszugehörigkeit; bei Entgeltumwandlung lohnt sich ein Vertrag meist erst deutlich oberhalb des gesetzlichen Pflichtzuschusses von 15 %, weil im Alter Steuern sowie volle Kranken- und Pflegeversicherungsbeiträge oberhalb des monatlichen GKV-Freibetrags anfallen. In Österreich können Arbeitnehmer Beiträge aus Pensionskassen oder betrieblichen Kollektivversicherungen bei Firmenwechsel in die neue Vorsorgeeinrichtung mitnehmen; in der Schweiz wechseln angesparte BVG-Guthaben nahtlos in die neue Pensionskasse oder auf ein Freizügigkeitskonto.
