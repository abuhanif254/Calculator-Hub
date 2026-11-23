---
title: "Calculateur de Prêt Bateau"
metaTitle: "Calculateur de Prêt Bateau : Mensualités et Coût Total"
description: "Calculez vos mensualités, les intérêts totaux et le coût global d'un financement nautique en fonction du prix du bateau, de la taxe, de l'apport, du taux et de la durée."
metaDescription: "Simulez votre prêt bateau en ligne : estimez la mensualité, les intérêts totaux et l'impact de la durée de 5 à 20 ans sur le coût de votre financement."
metaKeywords: "calculateur de prêt bateau, financement maritime, crédit bateau, simulation crédit nautique, prêt voilier, mensualité bateau, LOA bateau"
faqs:
  - question: "Quel apport personnel les banques demandent-elles pour financer un bateau ?"
    answer: "La plupart des organismes de financement nautique exigent un apport initial compris entre 10 % et 20 % du prix TTC du navire, et jusqu'à 25 % ou 30 % pour un bateau d'occasion âgé de plus de dix ans ou une unité hauturière. Un apport d'au moins 20 % réduit fortement le risque de valeur nette négative lié à la décote initiale et permet souvent de négocier un taux d'intérêt plus avantageux."
  - question: "Dois-je saisir la TVA dans le champ taxe de vente si le prix du bateau est déjà affiché TTC ?"
    answer: "Non. Si le prix saisi inclut déjà la TVA (cas habituel des annonces en France, en Belgique ou en Suisse), vous devez entrer 0 % dans le champ de taxe afin de ne pas la compter deux fois. Utilisez ce champ uniquement lorsque vous partez d'un prix catalogue hors taxe de chantier naval (par exemple 20 % de TVA en France, 21 % en Belgique, 8,1 % en Suisse) ou d'un tarif avant taxes au Canada (14,975 % de TPS et TVQ au Québec, 13 % de TVH en Ontario)."
  - question: "Quelle est la différence entre un crédit bateau classique et une LOA nautique ?"
    answer: "Avec un crédit bateau amortissable, vous devenez immédiatement propriétaire du navire dès la livraison et remboursez le capital plus les intérêts sur une durée fixe. Avec une Location avec Option d'Achat (LOA), l'organisme financier demeure propriétaire du bateau pendant le contrat et vous versez un premier loyer majoré suivi de loyers mensuels, avec une option de rachat finale. En France, la réfaction forfaitaire de 50 % de TVA sur les loyers de LOA a pris fin en novembre 2020 ; toute exonération exige désormais de justifier le temps réel passé hors des eaux territoriales de l'Union européenne."
  - question: "Pourquoi la durée d'un prêt bateau peut-elle atteindre 15 ou 20 ans contrairement à un crédit auto ?"
    answer: "Contrairement à une automobile dont la valeur résiduelle chute rapidement après cinq à huit ans, un voilier ou une vedette bien entretenue conserve une durée de vie structurelle de vingt à trente ans. Pour les montants élevés (souvent à partir de 50 000 € ou 75 000 €), les prêteurs maritimes accordent des amortissements longs de 12 à 15 ans, voire 20 ans sur les yachts, en prenant parfois une hypothèque maritime en garantie."
  - question: "Quels frais annexes annuels faut-il ajouter à la mensualité du crédit bateau ?"
    answer: "La mensualité bancaire ne couvre que l'acquisition. Selon la règle empirique des 10 %, l'entretien et l'exploitation annuels d'un bateau de plaisance représentent en moyenne 8 % à 12 % de sa valeur : anneau de port ou port à sec, assurance plaisance tous risques (obligatoire pour tout financement), carénage et antifouling, révision moteur, hivernage, carburant et taxe annuelle sur les engins maritimes à usage personnel en France (ex-DAFN dès 7 mètres ou 22 CV administratifs)."
---

Financer un voilier, une vedette habitable ou un semi-rigide diffère nettement d'un crédit automobile classique. Entre des montants d'acquisition élevés, des durées d'amortissement qui s'étendent couramment de **5 à 20 ans**, des régimes fiscaux distincts entre tarifs hors taxe et prix TTC (en Europe comme au Canada), et des frais portuaires récurrents, la structure de l'emprunt conditionne directement le coût réel de la plaisance. Maîtriser le lien entre apport personnel, taux nominal et durée d'amortissement permet d'arbitrer lucidement entre confort de trésorerie mensuel et total des intérêts versés.

## Formule d'amortissement d'un prêt bateau à taux fixe

Le calcul d'un crédit nautique amortissable suit la formule financière des annuités constantes. Soit :

- $P$ : prix de vente du bateau (en euros `€` ou en dollars canadiens `CAD`),
- $t_{\text{tax}}$ : taux de taxe de vente ou de TVA sur un prix hors taxe (saisir $0$ si $P$ est déjà TTC),
- $A$ : apport initial versé comptant lors de l'achat,
- $r$ : taux d'intérêt nominal annuel (en décimal, soit $0,06$ pour $6\text{ \%}$),
- $n$ : durée totale du prêt exprimée en mois.

### 1. Capital effectivement emprunté ($C$)

$$C = P \times \left(1 + t_{\text{tax}}\right) - A$$

### 2. Mensualité constante ($M$) et coût total

Avec un taux périodique mensuel $i = \dfrac{r}{12}$ (pour $i > 0$) :

$$M = C \times \frac{i \cdot (1 + i)^n}{(1 + i)^n - 1}$$

Si le taux est nul ($i = 0$), on obtient simplement $M = \dfrac{C}{n}$. Les intérêts totaux et le coût global de l'acquisition (apport inclus) valent :

$$I_{\text{total}} = (M \times n) - C \qquad \text{et} \qquad K_{\text{total}} = A + (M \times n)$$

Chaque échéance reste constante, mais la part d'intérêts diminue au fil des mois à mesure que le capital restant dû s'amortit.

## Exemple chiffré : financement d'une vedette neuve de 50 000 € HT

Supposons l'achat d'un bateau neuf au tarif chantier hors taxe de **$50\,000\text{ €}$**, soumis à la TVA française de **$20\text{ \%}$**, avec un apport initial de **$12\,000\text{ €}$** ($20\text{ \%}$ du prix TTC), un taux nominal fixe de **$6,0\text{ \%}$** et une durée de **$120$ mois ($10$ ans)**.

### Étape 1 : Capital à financer
- **TVA ($20\text{ \%}$)** : $50\,000 \times 0,20 = 10\,000\text{ €}$, portant le prix TTC à **$60\,000\text{ €}$**.
- **Capital emprunté** : $C = 60\,000 - 12\,000 = \mathbf{48\,000\text{ €}}$.

### Étape 2 : Mensualité fixe
- **Taux mensuel** : $i = \dfrac{0,06}{12} = 0,005$ ($0,5\text{ \%}$ par mois).
- **Facteur de capitalisation** : $(1 + 0,005)^{120} \approx 1,819397$.
- **Échéance mensuelle** :

$$M = 48\,000 \times \frac{0,005 \times 1,819397}{1,819397 - 1} \approx \mathbf{532,90\text{ € / mois}}$$

### Étape 3 : Bilan financier complet
- **Total remboursé à la banque** : $532,8984 \times 120 = \mathbf{63\,947,81\text{ €}}$.
- **Intérêts totaux** : $I_{\text{total}} = 63\,947,81 - 48\,000 = \mathbf{15\,947,81\text{ €}}$ (soit $33,2\text{ \%}$ du capital emprunté).
- **Coût global (apport inclus)** : $K_{\text{total}} = 12\,000 + 63\,947,81 = \mathbf{75\,947,81\text{ €}}$.

*Sensibilité au taux* : sur ce prêt de $48\,000\text{ €}$ sur $10$ ans, passer de $5,5\text{ \%}$ à $7,5\text{ \%}$ relève la mensualité de $520,93\text{ €}$ à $569,77\text{ €}$ et alourdit les intérêts de **$5\,861,08\text{ €}$** ($14\,511,14\text{ €}$ contre $20\,372,22\text{ €}$).

## Impact de la durée sur un emprunt de 48 000 € à 6,0 %

| Durée du Prêt | Mensualité | Intérêts Totaux | Intérêts / Capital | Coût Total (avec apport) | Unité Habituelle |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **5 ans** ($60$ mois) | **$927,97\text{ €}$** | $7\,678,47\text{ €}$ | $16,0\text{ \%}$ | $67\,678,47\text{ €}$ | Semi-rigide ou petit hors-bord |
| **10 ans** ($120$ mois) | **$532,90\text{ €}$** | $15\,947,81\text{ €}$ | $33,2\text{ \%}$ | $75\,947,81\text{ €}$ | Vedette côtière ou voilier de 8–10 m |
| **15 ans** ($180$ mois) | **$405,05\text{ €}$** | $24\,909,23\text{ €}$ | $51,9\text{ \%}$ | $84\,909,23\text{ €}$ | Voilier habitable ou croiseur récent |
| **20 ans** ($240$ mois) | **$343,89\text{ €}$** | $34\,532,86\text{ €}$ | $71,9\text{ \%}$ | $94\,532,86\text{ €}$ | Yacht ou unité hauturière |

Allonger le crédit de $10$ à $20$ ans réduit la mensualité de $189,01\text{ €}$ ($-35,5\text{ \%}$), mais fait plus que doubler le poids des intérêts ($+18\,585,05\text{ €}$).

## Conseils pratiques et pièges du financement maritime

1. **Éviter le double comptage de la TVA** : en France, en Belgique ou en Suisse, les prix affichés pour les particuliers incluent déjà la TVA ($20\text{ \%}$, $21\text{ \%}$ ou $8,1\text{ \%}$) : saisissez alors $0\text{ \%}$ dans le champ taxe. Au Québec ou sur un tarif chantier hors taxe, indiquez le taux exact ($14,975\text{ \%}$ pour TPS + TVQ au Québec) afin d'intégrer la fiscalité au montant financé.
2. **Comparer les offres via le TAEG** : le taux nominal ne comprend ni les frais de dossier bancaire, ni l'inscription d'hypothèque maritime ou de francisation, ni l'assurance emprunteur facultative. Arbitrez toujours sur le **Taux Annuel Effectif Global (TAEG)** et le coût total assurance incluse.
3. **Anticiper la décote initiale** : un bateau neuf perd $15\text{ \%}$ à $25\text{ \%}$ de sa valeur dès la première année. Un emprunt sur $15$ à $20$ ans avec moins de $15\text{ \%}$ d'apport crée un risque de solde bancaire supérieur à la valeur de revente du navire.
4. **Prévoir l'expertise maritime sur l'occasion** : les prêteurs et assureurs exigent quasi systématiquement une expertise à sec ($600\text{ €}$ à $1\,500\text{ €}$) contrôlant l'absence d'osmose, l'état du moteur et la valeur vénale réelle.
5. **Provisionner la règle des 10 % annuels** : ajoutez environ $10\text{ \%}$ par an de la valeur du bateau pour couvrir place de port, assurance plaisance, carénage, entretien mécanique et taxe annuelle de navigation.
