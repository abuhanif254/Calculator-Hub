---
title: "Kohlenhydrat-Rechner"
metaTitle: "Kohlenhydrat-Rechner | Tagesbedarf & Netto-Kohlenhydrate"
description: "Berechnen Sie Ihre optimale tägliche Kohlenhydratzufuhr, Netto-Kohlenhydrate, Kohlenhydrat-Cycling-Pläne und die Verteilung auf Mahlzeiten basierend auf Ihren Körperdaten und Fitnesszielen."
metaDescription: "Kostenloser Kohlenhydrat-Rechner: Berechnen Sie Ihren täglichen Bedarf in Gramm, Netto-Kohlenhydrate und Makroverteilung für Sport, Diät und Keto."
metaKeywords: "kohlenhydrat rechner, netto kohlenhydrate, kohlenhydratbedarf berechnen, diabetes ernährung, ketogene diät, low carb, fitness ernährung, sportnahrung"
faqs:
  - question: "Darf ich bei Lebensmitteln im DACH-Raum die Ballaststoffe von den Kohlenhydraten abziehen?"
    answer: "Nein! Auf europäischen und Schweizer Nährwerttabellen (gemäß EU-Lebensmittelinformationsverordnung LMIV) sind Ballaststoffe bereits vorab herausgerechnet und werden als separate Zeile ausgewiesen. Die Angabe 'Kohlenhydrate' auf deutschen, österreichischen und Schweizer Verpackungen zeigt also bereits die Netto-Kohlenhydrate (ohne Ballaststoffe). Ein erneuter Abzug gilt ausschließlich für US-amerikanische Nährwertetiketten."
  - question: "Wie werden Zuckeralkohole (Mehrwertige Alkohole) bei den Netto-Kohlenhydraten berücksichtigt?"
    answer: "Zuckeralkohole (Polyole) sind auf EU-Etiketten in den ausgewiesenen Kohlenhydraten enthalten, wirken sich jedoch unterschiedlich auf den Blutzucker aus. Erythrit wird im Dünndarm fast vollständig unverändert ausgeschieden (0 kcal/g) und kann zu 100 % abgezogen werden. Xylit, Sorbit und vor allem Maltit (ca. 2,4 kcal/g) werden hingegen teilweise verstoffwechselt; bei strenger Ketose oder Diabetes sollten Sie diese nur zu etwa 50 % bis 60 % von den Gesamtkohlenhydraten abziehen."
  - question: "Wie rechne ich Gramm Kohlenhydrate in Broteinheiten (BE) oder Kohlenhydrateinheiten (KE) um?"
    answer: "In der klinischen Diabetologie im deutschsprachigen Raum werden verwertbare Netto-Kohlenhydrate zur Insulindosierung in standardisierte Einheiten umgerechnet. Eine Kohlenhydrateinheit (1 KE bzw. KHE, Standard in der Schweiz und in modernen deutschen Schulungen) entspricht exakt 10 g verwertbaren Kohlenhydraten. Eine klassische Broteinheit (1 BE, häufig noch in Deutschland und Österreich genutzt) ist als 12 g verwertbare Kohlenhydrate definiert."
  - question: "Sollte ich meinen Kohlenhydratbedarf nach Kalorienprozenten oder pro Kilogramm Körpergewicht berechnen?"
    answer: "Für Personen mit moderater Alltagsbewegung eignet sich die prozentuale Aufteilung des Gesamtenergiebedarfs (z. B. über 50 % laut D-A-CH-Referenzwerten für eine ausgewogene Mischkost oder 15 % bis 25 % bei Low-Carb). Für Leistungs- und Ausdauersportler ist hingegen die Berechnung in Gramm pro Kilogramm Körpergewicht (3 bis 10 g/kg je nach Trainingsvolumen) präziser, da die Kapazität der Muskelglykogenspeicher direkt mit der aktiven Muskelmasse skaliert."
  - question: "Was ist der Unterschied zwischen Glykämischem Index (GI) und Glykämischer Last (GL)?"
    answer: "Der Glykämische Index (0 bis 100) misst lediglich, wie schnell 50 g verwertbare Kohlenhydrate eines Lebensmittels den Blutzucker im Vergleich zu reiner Glukose (GI = 100) ansteigen lassen, ignoriert aber die Kohlenhydratdichte. Die Glykämische Last multipliziert den GI mit der tatsächlich verzehrten Kohlenhydratmenge einer Portion (geteilt durch 100) und ist daher der entscheidende Praxiswert für die reale Insulinantwort."
---

Kohlenhydrate sind der effizienteste Energielieferant des menschlichen Stoffwechsels. Nach der enzymatischen Aufspaltung in Glukose versorgen sie das zentrale Nervensystem (das allein rund $120\text{ bis }140\text{ g}$ Glukose pro Tag benötigt) und werden in der Skelettmuskulatur sowie in der Leber als **Glykogen** gespeichert. Ob Sie Ihre Ausdauerleistung maximieren, durch ein gezieltes Kaloriendefizit Körperfett abbauen oder im Rahmen einer ketogenen Ernährung den Zustand der nutritiven Ketose erreichen möchten: Unser **Kohlenhydrat-Rechner** ermittelt aus Ihren Körperdaten, Ihrem Aktivitätsniveau und Ihrer Zielsetzung Ihren täglichen Kohlenhydratbedarf in Gramm ($\text{g/Tag}$), Ihren relativen Bedarf pro Kilogramm Körpergewicht ($\text{g/kg}$) sowie die Verteilung auf einzelne Mahlzeiten.

## Formeln zur Berechnung des täglichen Kohlenhydratbedarfs

Die wissenschaftliche Bedarfsberechnung erfolgt in zwei Stufen: Zunächst wird der tägliche Gesamtenergieumsatz aus Grundumsatz ($\text{GU}$) und Leistungsumsatz bestimmt; anschließend wird der gewünschte Kohlenhydratanteil über das physiologische Brennwertäquivalent in Gramm umgerechnet.

### 1. Ermittlung des Ziel-Energieumsatzes ($E_{\text{Ziel}}$)
Zur Bestimmung des Ruhe-Grundumsatzes ($\text{GU}$ in $\text{kcal/Tag}$) nutzt der Rechner die klinisch validierte **Mifflin-St.-Jeor-Gleichung**:

$$\text{GU}_{\text{Männer}} = (10 \cdot m) + (6,25 \cdot h) - (5 \cdot a) + 5$$

$$\text{GU}_{\text{Frauen}} = (10 \cdot m) + (6,25 \cdot h) - (5 \cdot a) - 161$$

Durch Multiplikation mit dem körperlichen Aktivitätsfaktor ($\text{PAL}$, typischerweise zwischen $1,20$ bei sitzender Tätigkeit und $2,20$ bei täglichem Leistungssport) und Verrechnung einer Kalorienanpassung $\Delta E_{\text{Ziel}}$ (z. B. $-500\text{ kcal}$ für Fettabbau oder $+300\text{ kcal}$ für Muskelaufbau) ergibt sich der tägliche Ziel-Energiebedarf:

$$E_{\text{Ziel}} = (\text{GU} \cdot \text{PAL}) \pm \Delta E_{\text{Ziel}}$$

### 2. Umrechnung in die tägliche Kohlenhydratmenge ($M_{\text{KH}}$)
Gemäß der europäischen Lebensmittelinformationsverordnung (LMIV) besitzt 1 Gramm verwertbare Kohlenhydrate einen physiologischen Brennwert von **$4,0\text{ kcal/g}$** bzw. **$17,0\text{ kJ/g}$** (physikalisch exakt $4,1\text{ kcal/g}$). Bei einer gewählten Kohlenhydratquote $q_{\text{KH}}$ (als Dezimalwert des Gesamtenergiebedarfs, z. B. $0,50$ für $50\text{ \%}$) berechnet sich die tägliche Zufuhr in Gramm nach:

$$M_{\text{KH}} = \frac{E_{\text{Ziel}} \cdot q_{\text{KH}}}{4,0\text{ kcal/g}}$$

### 3. Netto-Kohlenhydrate und Glykämische Last ($\text{GL}$)
Für die Berechnung der blutzuckerwirksamen **Netto-Kohlenhydrate** ($\text{KH}_{\text{netto}}$) muss zwischen europäischen (DACH/EU) und US-amerikanischen Nährwertdeklarationen unterschieden werden:

$$\text{KH}_{\text{netto (DACH/EU)}} = \text{KH}_{\text{lt. Etikett}} - (k_{\text{Polyol}} \cdot \text{Mehrwertige Alkohole})$$

$$\text{KH}_{\text{netto (US-Etikett)}} = \text{KH}_{\text{gesamt}} - \text{Ballaststoffe} - (k_{\text{Polyol}} \cdot \text{Zuckeralkohole})$$

Die **Glykämische Last ($\text{GL}$)** einer Portion mit dem Glykämischen Index $\text{GI}$ lautet:

$$\text{GL} = \frac{\text{GI} \cdot \text{KH}_{\text{netto pro Portion (in g)}}}{100}$$

### Definition der Berechnungsvariablen
* **$m$ (Körpermasse):** Aktuelles Körpergewicht in Kilogramm ($\text{kg}$).
* **$h$ (Körpergröße):** Körperhöhe in Zentimetern ($\text{cm}$).
* **$a$ (Lebensalter):** Alter in Jahren.
* **$\text{PAL}$ (Aktivitätsfaktor):** Multiplikator für Arbeits- und Trainingsbelastung (dimensionslos).
* **$q_{\text{KH}}$ (Makronährstoffquote):** Angestrebter Kalorienanteil der Kohlenhydrate an der Tagesenergie ($0,05\text{ bis }0,65$).
* **$k_{\text{Polyol}}$ (Anrechnungsfaktor für Zuckeralkohole):** $1,0$ für Erythrit (vollständig abziehbar), ca. $0,5$ für Xylit und Maltit.

## Schritt-für-Schritt-Rechenbeispiel aus der Praxis

Ein **35-jähriger Sportler** mit einem Körpergewicht von **$m = 78,0\text{ kg}$** und einer Körpergröße von **$h = 180\text{ cm}$** absolviert viermal wöchentlich ein intensives Lauf- und Krafttraining ($\text{PAL} = 1,65$). Er möchte sein Gewicht halten ($\Delta E_{\text{Ziel}} = 0\text{ kcal}$) und strebt eine ausgewogene Sporternährung mit **$50,0\text{ \%}$ Kohlenhydratanteil** ($q_{\text{KH}} = 0,50$) an.

1. **Berechnung des Grundumsatzes ($\text{GU}$):**
   $$\text{GU} = (10 \cdot 78,0) + (6,25 \cdot 180) - (5 \cdot 35) + 5 = 780 + 1.125 - 175 + 5 = 1.735,0\text{ kcal/Tag}$$
2. **Berechnung des täglichen Gesamtenergieumsatzes ($E_{\text{Ziel}}$):**
   $$E_{\text{Ziel}} = 1.735,0\text{ kcal} \cdot 1,65 = 2.862,75\text{ kcal/Tag} \quad (\approx 11.978\text{ kJ/Tag})$$
3. **Berechnung des täglichen Kohlenhydratbedarfs in Gramm ($M_{\text{KH}}$):**
   $$E_{\text{KH}} = 2.862,75\text{ kcal} \cdot 0,50 = 1.431,38\text{ kcal aus Kohlenhydraten}$$
   $$M_{\text{KH}} = \frac{1.431,38\text{ kcal}}{4,0\text{ kcal/g}} \approx 357,8\text{ g Kohlenhydrate pro Tag}$$
4. **Einordnung pro Kilogramm Körpergewicht und in Diabetes-Einheiten:**
   Bezogen auf die Körpermasse entspricht dieser Wert $\frac{357,8\text{ g}}{78,0\text{ kg}} = \mathbf{4,59\text{ g/kg Körpergewicht}}$, was exakt im sportmedizinischen Zielkorridor für regelmäßiges Training liegt. In klinischen Einheiten entspricht die Tagesration **$35,8\text{ Kohlenhydrateinheiten (KE)}$** bzw. **$29,8\text{ Broteinheiten (BE)}$**.

## Richtwerttabelle: Kohlenhydratbedarf nach Ernährungsform und Trainingsziel

Die folgende Referenzmatrix vergleicht die empfohlenen Zufuhrmengen der Fachgesellschaften (DGE, ÖGE, SGE sowie Sporternährungsleitlinien) für eine Beispielperson mit **$75,0\text{ kg}$ Körpergewicht**:

| Ernährungsform / Aktivitätsprofil | Energieanteil ($q_{\text{KH}}$) | Zufuhr pro kg Körpergewicht | Tagesmenge (bei 75,0 kg) | Primäres physiologisches Ziel |
| :--- | :--- | :--- | :--- | :--- |
| **Strikte Ketogene Diät (Keto)** | $5\text{ \% bis }8\text{ \%}$ | $0,3\text{ bis }0,6\text{ g/kg}$ | $20\text{ bis }45\text{ g/Tag}$ | Maximale Ketonkörperbildung (Ketose) |
| **Moderates Low-Carb (Fettabbau)** | $15\text{ \% bis }25\text{ \%}$ | $1,0\text{ bis }1,8\text{ g/kg}$ | $75\text{ bis }135\text{ g/Tag}$ | Blutzuckerstabilisierung, hohe Fettoxidation |
| **Ausgewogene Mischkost (D-A-CH-Referenz)** | $45\text{ \% bis }55\text{ \%}$ | $3,0\text{ bis }4,0\text{ g/kg}$ | $225\text{ bis }300\text{ g/Tag}$ | Alltagsleistung, Ballaststoffzufuhr ($\ge 30\text{ g}$) |
| **Kraftsport & Muskelaufbau** | $45\text{ \% bis }55\text{ \%}$ | $4,0\text{ bis }5,5\text{ g/kg}$ | $300\text{ bis }415\text{ g/Tag}$ | Volle Muskelglykogenspeicher, Regeneration |
| **Intensiver Ausdauersport (1–2 Std./Tag)** | $55\text{ \% bis }60\text{ \%}$ | $6,0\text{ bis }8,0\text{ g/kg}$ | $450\text{ bis }600\text{ g/Tag}$ | Rasche Glykogenresynthese zwischen Einheiten |
| **Wettkampf- & Ultradauersport (3+ Std./Tag)** | $60\text{ \% bis }70\text{ \%}$ | $8,0\text{ bis }12,0\text{ g/kg}$ | $600\text{ bis }900\text{ g/Tag}$ | Maximale Glykogensuperkompensation |

## Häufige Berechnungsfehler und Praxistipps

1. **Kein doppelter Ballaststoff-Abzug bei europäischen Lebensmitteln:** Wer US-amerikanische Keto-Ratgeber oder Apps mit US-Datenbanken nutzt, zieht oft gewohnheitsmäßig die Ballaststoffe von den Kohlenhydraten ab. Tun Sie dies niemals bei Produkten aus Deutschland, Österreich oder der Schweiz! Wenn Vollkornbrot laut deutschem Etikett $42,0\text{ g}$ Kohlenhydrate und $8,5\text{ g}$ Ballaststoffe pro $100\text{ g}$ enthält, betragen die verwertbaren Netto-Kohlenhydrate exakt **$42,0\text{ g}$** (und nicht $33,5\text{ g}$).
2. **Trockengewicht nicht mit Kochgewicht verwechseln:** Getreide, Reis, Teigwaren und Hülsenfrüchte nehmen beim Kochen das Zweifache ihres Eigengewichts an Wasser auf. Während $100\text{ g}$ ungekochter Basmatireis rund $78,0\text{ g}$ Kohlenhydrate liefern, enthalten $100\text{ g}$ gekochter Reis nur noch etwa $26,0\text{ bis }28,0\text{ g}$ Kohlenhydrate. Wiegen Sie Lebensmittel für präzises Tracking immer im Rohzustand ab.
3. **Zyklische Kohlenhydratzufuhr nach Trainingsbelastung:** Planen Sie an intensiven Trainingstagen eine höhere Zufuhr ($4,0\text{ bis }6,0\text{ g/kg}$), wobei rund $60\text{ \%}$ der Tagesmenge in die Mahlzeiten direkt vor und nach dem Training fließen. An trainingsfreien Ruhetagen senken Sie die Zufuhr auf $1,5\text{ bis }2,5\text{ g/kg}$ aus ballaststoffreichem Gemüse, Beeren und Hülsenfrüchten, um die Insulinsensitivität zu fördern.
