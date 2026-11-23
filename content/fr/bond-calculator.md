---
title: "Calculateur d'Obligations : Rendement et Valorisation"
metaTitle: "Calculateur d'Obligations : Prix et Rendement Actuariel"
description: "Calculez la juste valeur d'une obligation à taux fixe, son taux de rendement actuariel à l'échéance, son rendement courant et ses flux de coupons annuels ou semestriels."
metaDescription: "Estimez le prix d'une obligation, son taux de rendement actuariel et son rendement courant selon le nominal, le coupon, la fréquence et l'échéance."
metaKeywords: "calculateur d'obligations, taux de rendement actuariel, prix d'une obligation, rendement à l'échéance, rendement courant, coupon obligataire, obligation OAT, sensibilité obligataire"
faqs:
  - question: "Quelle est la différence entre taux de coupon, rendement courant et taux de rendement actuariel ?"
    answer: "Le taux de coupon (ou taux facial) s'applique à la valeur nominale pour fixer le versement annuel contractuel. Le rendement courant rapporte ce coupon annuel au prix de marché actuel de l'obligation. Le taux de rendement actuariel à l'échéance intègre à la fois l'ensemble des coupons futurs réinvestis et la plus-value ou moins-value constatée entre le prix d'achat et le remboursement au pair à l'échéance."
  - question: "Pourquoi le cours d'une obligation évolue-t-il en sens inverse des taux d'intérêt du marché ?"
    answer: "Le coupon d'une obligation à taux fixe reste figé jusqu'à l'échéance. Si les taux du marché montent au-dessus du taux facial, les investisseurs exigent une décote sur le prix du titre existant afin que son rendement global s'aligne sur les nouvelles émissions plus rémunératrices. À l'inverse, une baisse des taux valorise le titre au-dessus du pair (avec prime)."
  - question: "Comment choisir la bonne fréquence de versement entre marchés européens et nord-américains ?"
    answer: "En zone euro (OAT françaises, OLO belges, emprunts d'entreprises européens) et en Suisse (obligations de la Confédération), la grande majorité des obligations classiques paient un coupon annuel (fréquence égale à 1). Au Canada et aux États-Unis, la convention de marché standard impose un paiement semestriel (fréquence égale à 2), ce qui modifie légèrement la capitalisation effective à taux nominal identique."
  - question: "Que distingue le prix pied de coupon du prix réellement déboursé lors d'un achat ?"
    answer: "Sur les marchés obligataires francophones, le cours affiché est le prix pied de coupon (ou cours nu), exprimé en pourcentage de la valeur nominale. Si vous achetez le titre entre deux dates de détachement, vous réglez ce cours majoré du coupon couru, qui indemnise le vendeur au prorata des jours écoulés depuis le dernier paiement d'intérêts."
  - question: "Comment la fiscalité francophone impacte-t-elle le rendement net d'une obligation ?"
    answer: "Les coupons et gains de cession sont soumis à la fiscalité nationale hors enveloppes dédiées : Prélèvement Forfaitaire Unique de 30 % en France (sauf option au barème progressif), précompte mobilier de 30 % en Belgique, imposition au revenu ordinaire en Suisse pour les intérêts (les gains en capital privés étant généralement exonérés) et inclusion intégrale des intérêts au revenu imposable au Canada hors CELI et REER."
---

Les obligations à taux fixe constituent le socle de la gestion obligataire — des OAT françaises, OLO belges et emprunts de la Confédération suisse aux obligations du gouvernement du Canada et aux émissions d'entreprises. Savoir relier le **cours de marché** d'un titre à son **taux de rendement actuariel** (TRA) permet d'évaluer objectivement tout achat ou arbitrage sur le marché secondaire.

Ce calculateur fonctionne dans les deux sens : il détermine la **juste valeur théorique** à partir du rendement exigé, ou extrait par calcul numérique le **rendement actuariel à l'échéance** implicite correspondant au cours coté, tout en affichant le **rendement courant** et le coupon annuel.

## Formule de Valorisation Obligataire et Indicateurs Clés

La valeur théorique $P$ d'une obligation à taux fixe remboursée *in fine* égale la somme actualisée de ses coupons futurs et de sa valeur nominale au taux actuariel du marché :

$$P = \sum_{k=1}^{n} \frac{C}{(1 + r)^k} + \frac{VN}{(1 + r)^n} = C \times \frac{1 - (1 + r)^{-n}}{r} + \frac{VN}{(1 + r)^n}$$

* **$VN$** : **valeur nominale** remboursée à l'échéance (`€`, `CHF` ou `$ CAD`).
* **$c$** : **taux de coupon annuel** (taux facial, en forme décimale).
* **$m$** : **fréquence annuelle de paiement** ($1$ annuel, $2$ semestriel, $4$ trimestriel, $12$ mensuel).
* **$C = \frac{VN \times c}{m}$** : **coupon périodique** versé à chaque échéance.
* **$n = T \times m$** : **nombre total de périodes** sur une durée résiduelle de $T$ années.
* **$r = \frac{TRA}{m}$** : **taux actuariel périodique**, issu du taux actuariel annuel $TRA$.

Deux relations complètent ce modèle :

1. **Rendement courant** ($R_{\text{courant}}$) : revenu immédiat rapporté au prix payé, hors gain ou perte au remboursement :
   $$R_{\text{courant}} = \frac{VN \times c}{P} \times 100$$
2. **Résolution inverse et duration modifiée** : Pour $n > 2$, l'équation en $r$ ne s'inverse pas algébriquement ; le calculateur trouve le $TRA$ par dichotomie. Par ailleurs, la **duration modifiée** ($D_{\text{mod}}$) estime l'impact d'une variation de taux $\Delta r$ sur le cours :
   $$\frac{\Delta P}{P} \approx -D_{\text{mod}} \times \Delta r \qquad \text{avec} \qquad D_{\text{mod}} = \frac{D_{\text{Macaulay}}}{1 + r}$$

## Exemples Chiffrés Pas à Pas : Titre Européen et Titre Canadien

### Cas n° 1 : Valoriser une obligation en euros (coupon annuel)

Soit une obligation de nominal **$1\,000\text{ €}$**, coupon annuel de **$4{,}00\,\%$** ($m = 1$, $C = 40\text{ €}$), maturité **$8\text{ ans}$** ($n = 8$), lorsque le marché exige un $TRA$ de **$5{,}00\,\%$** ($r = 0{,}05$) :

1. **Actualisation des 8 coupons** :
   $$VA_{\text{coupons}} = 40 \times \frac{1 - (1{,}05)^{-8}}{0{,}05} = 40 \times 6{,}46321 = \mathbf{258{,}53\text{ €}}$$
2. **Actualisation du nominal** :
   $$VA_{\text{nominal}} = \frac{1\,000}{(1{,}05)^8} = \mathbf{676{,}84\text{ €}}$$
3. **Prix théorique et métriques** :
   $$P = 258{,}53 + 676{,}84 = \mathbf{935{,}37\text{ €}}$$
   Le titre cote **sous le pair** à $93{,}54\,\%$ (décote de $64{,}63\text{ €}$). Son rendement courant s'établit à $40 / 935{,}37 = \mathbf{4{,}28\,\%}$, inférieur au $TRA$ ($5{,}00\,\%$) car ce dernier inclut la plus-value finale. Sa duration de Macaulay atteint $6{,}96\text{ ans}$ et sa duration modifiée **$6{,}63$** : une hausse de $+1\,\%$ des taux réduirait le cours d'environ $6{,}4\,\%$ (amortie par la convexité).

### Cas n° 2 : Extraire le rendement actuariel d'une obligation canadienne (semestrielle)

Un titre de nominal **$1\,000\text{ CAD}$**, coupon **$5{,}00\,\%$** versé semestriellement ($m = 2$, $C = 25\text{ CAD}$) et maturité **$10\text{ ans}$** ($n = 20$), s'achète à **$920{,}00\text{ CAD}$**.

* **Rendement courant** : $50 / 920 = \mathbf{5{,}43\,\%}$.
* **Rendement actuariel (TRA)** : La dichotomie résout $25 \times \frac{1 - (1 + r)^{-20}}{r} + \frac{1\,000}{(1 + r)^{20}} = 920$ et converge vers $r = 3{,}0397\,\%$ par semestre, soit un **$TRA$ annuel nominal de $6{,}079\,\%$** intégrant les coupons et les $80\text{ CAD}$ de gain en capital.

## Grille de Sensibilité : Obligation 4 % Selon le Taux et la Maturité

Pour une valeur nominale de **$1\,000\text{ €}$** et un coupon annuel de **$4{,}00\,\%$** ($m = 1$) :

| TRA | Cotation | 3 ans | 5 ans | 10 ans | 20 ans | Duration modifiée (10 ans) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **2,00 %** | Prime | 1 057,68 € | 1 094,27 € | 1 179,65 € | 1 327,03 € | 8,41 |
| **3,00 %** | Prime | 1 028,29 € | 1 045,80 € | 1 085,30 € | 1 148,77 € | 8,26 |
| **4,00 %** | Au pair | 1 000,00 € | 1 000,00 € | 1 000,00 € | 1 000,00 € | 8,11 |
| **5,00 %** | Décote | 972,77 € | 956,71 € | 922,78 € | 875,38 € | 7,96 |
| **6,00 %** | Décote | 946,54 € | 915,75 € | 852,80 € | 770,60 € | 7,81 |
| **7,00 %** | Décote | 921,27 € | 876,99 € | 789,29 € | 682,18 € | 7,66 |

L'allongement de la maturité démultiplie la sensibilité : une hausse des taux de $4\,\%$ à $6\,\%$ coûte $-5{,}3\,\%$ sur 3 ans contre $-22{,}9\,\%$ sur 20 ans. Grâce à la **convexité positive**, le gain lors d'une baisse de $2\,\%$ ($+32{,}7\,\%$ à 20 ans) excède la perte d'une hausse symétrique ($-22{,}9\,\%$).

## Repères Pratiques et Pièges Courants de Valorisation Obligataire

* **Distinguer prix pied de coupon et décaissement réel** : Entre deux dates de détachement, le cours coté ne comprend pas le **coupon couru** (calculé en base *Exact/Exact* sur les emprunts d'État européens), qui s'ajoute au montant facturé à l'achat.
* **Mesurer l'hypothèse de réinvestissement** : Le $TRA$ suppose l'absence de défaut et le réinvestissement de chaque coupon au même taux jusqu'à l'échéance ; seules les obligations zéro-coupon verrouillent un rendement indépendant des taux futurs.
* **Harmoniser la fréquence entre marchés** : Un taux nominal semestriel de $6{,}00\,\%$ équivaut à un taux annuel effectif de $(1 + 0{,}03)^2 - 1 = \mathbf{6{,}09\,\%}$. Convertissez toujours en base annuelle équivalente avant de comparer une obligation canadienne à un titre européen.
* **Surveiller les clauses de rappel et le risque de crédit** : Une obligation remboursable par anticipation à l'initiative de l'émetteur plafonne sa hausse en cas de détente des taux ; évaluez alors le **rendement au premier rappel** plutôt que le seul $TRA$ final.
