---
title: "Calculateur de Prêt Professionnel : Tableau d'Amortissement"
metaTitle: "Calculateur de Prêt Professionnel : Mensualité et TAEG"
description: "Calculez les mensualités constantes, le coût total des intérêts et le tableau d'amortissement complet d'un crédit professionnel ou d'un financement d'équipement."
metaDescription: "Simulez votre prêt professionnel en ligne : mensualité constante, tableau d'amortissement détaillé, coût total des intérêts et effet fiscal de l'IS."
metaKeywords: "calculateur prêt professionnel, simulation crédit entreprise, tableau amortissement emprunt pro, mensualité financement entreprise, TAEG professionnel, capacité de remboursement, RCSD"
faqs:
  - question: "Comment une banque évalue-t-elle la capacité de remboursement d'une entreprise ?"
    answer: "L'analyste bancaire compare les annuités totales d'emprunt (capital plus intérêts) à la capacité d'autofinancement (CAF) et à l'excédent brut d'exploitation (EBE) de la société. Le critère central est le ratio de couverture du service de la dette (RCSD) : la plupart des banques en France, en Belgique, en Suisse et au Canada exigent un RCSD compris entre 1,20 et 1,35, signifiant que les flux d'exploitation disponibles dépassent de 20 % à 35 % les échéances annuelles."
  - question: "Les intérêts d'un prêt professionnel sont-ils fiscalement déductibles ?"
    answer: "Oui. Lorsque l'emprunt est contracté dans l'intérêt direct de l'exploitation, les intérêts, les frais de dossier et les primes d'assurance emprunteur constituent des charges financières déductibles du résultat imposable. Pour une société soumise à l'impôt sur les sociétés à 25 %, un taux nominal de 4,80 % revient ainsi à un coût net d'impôt de 3,60 %. En revanche, la fraction de la mensualité qui rembourse le capital n'est jamais une charge déductible."
  - question: "Quelle différence existe-t-il entre échéances constantes et amortissement constant du capital ?"
    answer: "Dans un prêt à échéances constantes (le format standard des banques), la mensualité globale reste identique du premier au dernier mois : la part d'intérêts est élevée au démarrage puis décroît au profit du capital. En amortissement constant, l'entreprise rembourse chaque mois la même fraction de capital plus des intérêts dégressifs ; les premières échéances sont donc plus lourdes pour la trésorerie, mais le coût total des intérêts sur la durée est légèrement plus bas."
  - question: "Pourquoi le TAEG d'un crédit professionnel est-il supérieur au taux nominal ?"
    answer: "Le taux nominal mesure uniquement la rémunération du capital prêté. Le Taux Annuel Effectif Global (TAEG) intègre en plus tous les frais obligatoires liés à l'octroi du financement : frais de dossier bancaire, commission de garantie (caution mutuelle, garantie Bpifrance ou BDC, nantissement de fonds de commerce) et assurance décès-invalidité ou homme-clé exigée par l'établissement prêteur."
  - question: "Peut-on rembourser un prêt professionnel par anticipation sans pénalité ?"
    answer: "Contrairement aux crédits immobiliers des particuliers dont les pénalités sont plafonnées par la loi, les indemnités de remboursement anticipé (IRA) d'un crédit professionnel sont fixées librement dans le contrat. Elles s'élèvent souvent entre 3 % et 5 % du capital restant dû, voire incluent une indemnité actuarielle si les taux du marché ont baissé. Il est donc indispensable de négocier leur plafonnement ou leur suppression avant la signature."
---

L'acquisition d'un parc matériel, la reprise d'un fonds de commerce, l'aménagement de locaux ou le financement de la croissance reposent souvent sur le crédit professionnel à moyen ou long terme. Bien calibré, l'emprunt active un **effet de levier financier** tout en préservant les liquidités. Mal dimensionné, il crée une charge fixe susceptible de tendre le besoin en fonds de roulement dès le moindre ralentissement commercial.

Notre calculateur de prêt professionnel détermine la mensualité constante, la ventilation mensuelle entre principal amorti et intérêts financiers, ainsi que le coût global du crédit en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`).

## Équation d'amortissement d'un crédit professionnel

La majorité des emprunts bancaires d'entreprise suivent un **amortissement progressif à mensualités constantes**. La mensualité fixe ($M$), hors assurance facultative, suit la relation actuarielle suivante :

$$M = C \times \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

* **$C$ (Capital emprunté)** : montant net financé par l'établissement prêteur (`€`, `CHF` ou `CAD`).
* **$r$ (Taux périodique mensuel)** : taux nominal annuel divisé par 12 ($r = \frac{T_{\text{annuel}}}{12}$). Un taux annuel de 4,80 % donne 0,004 par mois.
* **$n$ (Nombre total d'échéances)** : durée du prêt en mois (années multipliées par 12).
* **$M$ (Mensualité constante)** : versement identique prélevé chaque mois jusqu'au solde complet.

### Ventilation mensuelle et bouclier fiscal

À chaque mois $k$ (de 1 à $n$), les intérêts sont calculés sur le capital restant dû précédent ($CRD_{k-1}$), et le solde amortit le capital :

$$I_k = CRD_{k-1} \times r \qquad A_k = M - I_k \qquad CRD_k = CRD_{k-1} - A_k$$

Le coût brut des intérêts vaut $I_{\text{total}} = (M \times n) - C$. Les intérêts étant fiscalement déductibles du résultat imposable, le **taux d'intérêt net après impôt sur les sociétés (IS)** s'établit à :

$$T_{\text{net}} = T_{\text{annuel}} \times (1 - \tau_{\text{IS}})$$

où $\tau_{\text{IS}}$ désigne le taux marginal d'imposition sur les bénéfices de l'entreprise.

## Étude de cas chiffrée : financement matériel de 120 000 € sur 5 ans

Une PME industrielle emprunte **120 000 €** pour financer une ligne de production sur **5 ans (60 mois)** au taux nominal fixe de **4,80 %**, avec un impôt sur les sociétés de **25 %**.

### Étape 1 : Calcul de la mensualité constante

* **Taux mensuel** : $r = \frac{0,048}{12} = 0,004$ (soit 0,40 % par mois).
* **Facteur sur 60 mois** : $(1 + 0,004)^{60} \approx 1,270641$.
* **Mensualité fixe** :
  $$M = 120\,000 \times \frac{0,004 \times 1,270641}{1,270641 - 1} = 2\,253,57\text{ €}$$

### Étape 2 : Lecture du tableau d'amortissement

* **Mois 1** : intérêts de **480,00 €** ($120\,000 \times 0,004$), capital amorti de **1 773,57 €**, capital restant dû de **118 226,43 €**.
* **Mois 2** : intérêts de **472,91 €** ($118\,226,43 \times 0,004$), capital amorti de **1 780,66 €**, capital restant dû de **116 445,77 €**.
* **Mois 60 (dernière échéance)** : intérêts de **8,98 €**, capital amorti de **2 244,59 €**, solde final ramené à **0,00 €**.

### Étape 3 : Coût financier brut et net après impôt

Sur 60 mois, la société verse **135 214,14 €** au total, dont **15 214,14 €** d'intérêts bruts. Avec un IS à **25 %**, la déductibilité génère **3 803,54 €** d'économie fiscale, ramenant le coût financier net à **11 410,61 €** (taux net effectif de **3,60 %**).

## Tableau de sensibilité : durée, coût global et EBE minimal requis

Pour un même besoin de **120 000 €**, comparons quatre maturités usuelles, leurs taux indicatifs et l'excédent brut d'exploitation (EBE) minimal requis pour un ratio de couverture du service de la dette (RCSD) prudent de **1,25** :

| Durée du Prêt | Usage Type | Taux Nominal | Mensualité | Intérêts Totaux | Poids Intérêts | EBE Minimal (RCSD 1,25) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **3 ans (36 mois)** | Trésorerie, informatique | 4,20 % | 3 553,56 € | 7 928,32 € | 6,61 % | 53 303 € |
| **5 ans (60 mois)** | Outillage, véhicules | 4,80 % | 2 253,57 € | 15 214,14 € | 12,68 % | 33 804 € |
| **7 ans (84 mois)** | Fonds de commerce | 5,40 % | 1 718,72 € | 24 372,06 € | 20,31 % | 25 781 € |
| **10 ans (120 mois)** | Murs commerciaux | 5,90 % | 1 326,23 € | 39 147,35 € | 32,62 % | 19 893 € |

Allonger la maturité de 5 à 7 ans abaisse la mensualité de **534,85 €** et préserve **6 418 €** de trésorerie annuelle, pour un surcoût brut de **9 157,92 €** d'intérêts. Lorsque le projet porte sur des véhicules utilitaires ou des équipements à renouvellement rapide, il convient également de comparer l'emprunt amortissable classique au crédit-bail mobilier, dont les loyers sont intégralement passés en charges d'exploitation et qui évite d'immobiliser un apport initial important, même si son coût global demeure généralement supérieur à celui du prêt bancaire.

## Règles de gestion et erreurs fréquentes à éviter

* **Adosser la durée du crédit à celle de l'actif** : Un financement doit être remboursé avant l'obsolescence économique du bien. Financer du matériel informatique sur 7 ans dégrade durablement l'équilibre du bilan.
* **Arbitrer sur la base du TAEG réel** : Sur 24 ou 36 mois, des frais de dossier de 1 500 €, une commission de garantie et une assurance homme-clé majorent le taux annuel effectif de **1,20 à 2,00 points**. Saisissez le TAEG complet dans le calculateur pour comparer deux banques.
* **Distinguer résultat comptable et trésorerie** : Seuls les intérêts et amortissements comptables réduisent l'impôt, mais l'intégralité de la mensualité quitte le compte bancaire. Validez la tenue de votre plan de trésorerie durant les mois creux.
* **Encadrer caution personnelle et pénalités** : Mobilisez les garanties publiques ou mutualistes (Bpifrance en France, Banque de développement du Canada, Wallonie Entreprendre en Belgique, coopératives de cautionnement en Suisse), négociez un différé de 3 à 6 mois en phase de travaux et plafonnez les indemnités de remboursement anticipé.
