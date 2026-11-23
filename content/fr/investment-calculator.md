---
title: "Calculatrice d'Investissement"
metaTitle: "Calculatrice d'Investissement : Intérêts Composés et Gains"
description: "Projetez la valeur future de votre patrimoine financier à partir de votre capital initial, de vos versements périodiques et de votre taux de rendement annuel."
metaDescription: "Simulez la valeur future de vos placements avec intérêts composés, versements mensuels ou annuels et ajustement à l'inflation pour bâtir votre capital."
metaKeywords: "calculatrice investissement, simulateur intérêts composés, valeur future placement, versements programmés, rendement réel inflation, PEA assurance-vie, règle des 72"
faqs:
  - question: "Comment la fréquence des versements influence-t-elle la valeur finale d'un placement ?"
    answer: "À effort d'épargne annuel identique, des versements mensuels produisent un capital final supérieur à un versement annuel unique effectué en fin d'exercice. Chaque mensualité commence à capitaliser immédiatement au lieu d'attendre la fin de l'année. Sur les marchés boursiers volatils, des apports mensuels réguliers permettent aussi de lisser automatiquement le prix moyen d'acquisition des titres."
  - question: "Quel taux de rendement annuel est réaliste pour simuler un investissement à long terme ?"
    answer: "Tout dépend de la répartition d'actifs retenue. Historiquement, un portefeuille diversifié en actions mondiales a généré environ 7 % à 9 % par an en nominal sur longue période (soit 5 % à 6,5 % nets d'inflation). Un portefeuille équilibré mêlant actions et obligations se situe plutôt autour de 4,5 % à 5,5 %, tandis que les supports sécurisés à capital garanti offrent généralement 2 % à 3,5 %. Retenir une hypothèse prudente évite les déceptions budgétaires."
  - question: "Pourquoi faut-il toujours examiner la valeur ajustée de l'inflation ?"
    answer: "L'inflation réduit silencieusement le pouvoir d'achat de la monnaie au fil des décennies. Avec une inflation moyenne de 2 % par an, 100 000 € dans 20 ans n'achètent plus que l'équivalent de 67 297 € d'aujourd'hui. La valeur ajustée de l'inflation traduit votre solde futur en pouvoir d'achat actuel, ce qui est indispensable pour planifier une retraite ou un achat immobilier."
  - question: "Quel impact les frais de gestion et la fiscalité ont-ils sur 20 ans ?"
    answer: "Les frais annuels de gestion amputent directement le taux de capitalisation composé : passer d'un rendement net de 7,00 % à 5,50 % à cause de 1,50 % de frais supplémentaires réduit le capital final de plus de 18 % sur 20 ans. De même, loger ses placements dans une enveloppe capitalisante fiscalement optimisée (PEA, assurance-vie ou PER en France, CELI ou REER au Canada, Pilier 3a en Suisse) évite un frottement fiscal annuel sur les plus-values et dividendes."
  - question: "À quoi sert la règle des 72 pour vérifier rapidement une projection ?"
    answer: "La règle des 72 est une formule mentale simple qui estime le nombre d'années nécessaires au doublement d'un capital sans apport supplémentaire : il suffit de diviser 72 par le taux de rendement annuel exprimé en pourcentage. À 6 % par an, un capital double en environ 12 ans ; à 8 %, il double en 9 ans."
---

Construire un patrimoine financier solide — pour préparer la retraite, financer les études de ses enfants ou bâtir un complément de revenu — repose rarement sur une opération spéculative isolée. L'enrichissement durable obéit à une mécanique mathématique éprouvée qui conjugue trois leviers multiplicatifs : le **capital initial**, la **régularité des versements programmés** et la **durée de capitalisation composée**.

Notre calculatrice d'investissement modélise la croissance conjointe de votre épargne de départ et de vos contributions mensuelles ou annuelles, puis exprime le solde futur en pouvoir d'achat réel après inflation, en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`).

## Équation de la valeur future avec versements périodiques

Lorsque la capitalisation suit le même rythme que des apports versés en fin de période (mensuelle avec $m = 12$, ou annuelle avec $m = 1$), la valeur future nominale ($V_f$) additionne la capitalisation du capital de départ et celle des contributions régulières :

$$V_f = C_0 \left(1 + \frac{r}{m}\right)^{m \cdot n} + P \times \frac{\left(1 + \frac{r}{m}\right)^{m \cdot n} - 1}{\frac{r}{m}}$$

* **$C_0$ (Montant initial)** : capital investi dès l'ouverture (`€`, `CHF` ou `CAD`).
* **$P$ (Contribution supplémentaire)** : somme versée chaque mois ou chaque année.
* **$r$ (Taux de rendement annuel)** : performance nette de frais exprimée en décimal (0,07 pour 7,00 %).
* **$m$ (Fréquence de versement)** : 12 en rythme mensuel, 1 en rythme annuel.
* **$n$ (Horizon)** : nombre d'années de placement.

Les intérêts composés gagnés valent $I_{\text{total}} = V_f - (C_0 + P \times m \times n)$.

### Correction de l'inflation et équation de Fisher

Un solde nominal élevé dans vingt ans masque l'érosion monétaire. Face à une inflation annuelle moyenne $\pi$, la valeur réelle en pouvoir d'achat d'aujourd'hui ($V_{\text{réel}}$) et le rendement réel ($r_{\text{réel}}$) s'écrivent :

$$V_{\text{réel}} = \frac{V_f}{(1 + \pi)^n} \qquad \text{et} \qquad r_{\text{réel}} = \frac{1 + r}{1 + \pi} - 1$$

## Exemple chiffré : plan d'épargne diversifié sur 20 ans

Un épargnant place **10 000 €** au départ en fonds indiciels actions mondiales (PEA, assurance-vie ou CELI), puis verse **300 € par mois** pendant **20 ans** (240 mensualités), avec un rendement annuel net de **7,00 %** et une inflation de **2,00 %**.

1. **Taux mensuel** : $i = \frac{0,07}{12} \approx 0,00583333$ (soit 0,5833 % par mois).
2. **Facteur sur 240 mois** : $(1 + 0,00583333)^{240} \approx 4,038739$.
3. **Croissance du capital initial** : $10\,000 \times 4,038739 = 40\,387,39\text{ €}$.
4. **Croissance des versements mensuels** :
   $$300 \times \frac{4,038739 - 1}{0,00583333} = 156\,278,00\text{ €}$$
5. **Solde final nominal** : $40\,387,39 + 156\,278,00 = 196\,665,39\text{ €}$.
6. **Apports contre intérêts** : l'épargnant a versé **82 000,00 €** de sa poche (10 000 € initiaux plus 72 000 € de mensualités). Les intérêts composés atteignent **114 665,39 €**, soit **58,30 %** du capital final.
7. **Pouvoir d'achat réel après 2 % d'inflation** : avec $(1,02)^{20} \approx 1,485947$, la valeur ajustée s'élève à :
   $$V_{\text{réel}} = \frac{196\,665,39}{1,485947} = 132\,350,17\text{ €}$$

Pour un effort annuel identique de **3 600 €**, un versement unique chaque fin d'année ne donnerait que **186 280,62 €**, soit **10 384,77 €** de moins qu'un plan mensuel.

## Tableau comparatif : l'effet décisif du temps et du rendement

Sur la même base de **10 000 € initiaux** et **300 € par mois**, voici l'évolution du capital selon l'horizon et trois profils types (Prudent à 3,5 %, Équilibré à 5,5 %, Dynamique à 7,5 %) :

| Horizon | Total Versé | Prudent (3,5 %) | Équilibré (5,5 %) | Dynamique (7,5 %) | Valeur Réelle à 7,5 % (Inflation 2 %) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **10 ans** | 46 000 € | 57 213 € | 65 163 € | 74 500 € | 61 116 € |
| **15 ans** | 64 000 € | 87 777 € | 106 400 € | 130 028 € | 96 613 € |
| **20 ans** | 82 000 € | 124 178 € | 160 654 € | 210 727 € | 141 813 € |
| **30 ans** | 118 000 € | 219 157 € | 325 957 € | 498 449 € | 275 179 € |

### Point de bascule, coût de l'attente et règle des 72

Durant les dix premières années, vos propres versements forment encore l'essentiel du portefeuille. Entre la vingtième et la trentième année à 7,5 %, le capital bondit de **210 727 €** à **498 449 €** pour seulement **36 000 €** d'apports supplémentaires : les gains composés représentent alors **76,3 %** du patrimoine total. Reporter le démarrage de son épargne de dix ans coûte ainsi bien plus cher que de commencer tôt avec des mensualités modestes, car les dernières années concentrent l'essentiel de la création de valeur. Pour estimer rapidement cette accélération, la **règle des 72** indique qu'un capital sans nouvel apport double environ tous les $72 / (100 \times r)$ ans, soit tous les 9,6 ans à 7,5 % contre plus de 20 ans à 3,5 %.

## Pièges d'interprétation et bonnes pratiques patrimoniales

* **Déduire les frais annuels courants** : Saisissez toujours un rendement *net de frais*. Sur notre exemple à 20 ans, un surcoût de **1,50 %** de frais (ramenant le rendement de 7,00 % à 5,50 %) réduit le solde final de **196 665 €** à **160 654 €**, soit **36 011 €** évaporés.
* **Privilégier des enveloppes fiscales capitalisantes** : Sur un compte-titres ordinaire, l'imposition immédiate des dividendes et arbitrages (prélèvement forfaitaire unique de 30 % en France ou précompte mobilier en Belgique) freine la capitalisation. Recourir au PEA, au PER, à l'assurance-vie, au CELI ou REER au Canada, ou au Pilier 3a en Suisse maximise la croissance brute jusqu'au retrait.
* **Maintenir la discipline et gérer la séquence des rendements** : Les marchés financiers alternent années haussières et replis temporaires, rendant vaine toute tentative d'anticiper les points bas. Automatiser un virement mensuel supprime le biais émotionnel, tandis que la sécurisation progressive du portefeuille trois à cinq ans avant votre objectif protège le capital acquis contre une baisse boursière tardive.
