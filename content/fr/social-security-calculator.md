---
title: "Calculateur de Sécurité Sociale"
metaTitle: "Calculateur de Sécurité Sociale : Pension, Décote, Surcote"
description: "Estimez votre pension mensuelle de retraite publique selon votre revenu annuel et comparez un départ anticipé à 62 ans, au taux plein à 67 ans ou ajourné à 70 ans."
metaDescription: "Simulez votre pension mensuelle de retraite selon votre revenu et comparez un départ anticipé à 62 ans, au taux plein à 67 ans ou ajourné à 70 ans."
metaKeywords: "calculateur de sécurité sociale, estimation pension de retraite, âge du taux plein, décote retraite anticipée, surcote ajournement, taux de remplacement, retraite internationale"
faqs:
  - question: "Comment la formule progressive par tranches détermine-t-elle la pension de base ?"
    answer: "Le modèle plafonne d'abord votre revenu annuel cotisable (168 600 $) pour obtenir votre revenu mensuel moyen indexé, puis applique trois taux de remplacement décroissants : 90 % jusqu'au premier palier de 1 174 $, 32 % entre 1 174 $ et 7 078 $, et 15 % au-delà de 7 078 $. Cette structure redistributive protège davantage les revenus modestes et réduit progressivement le taux de remplacement pour les salaires élevés."
  - question: "Quel est l'écart réel entre liquider sa retraite à 62 ans, à 67 ans ou à 70 ans ?"
    answer: "Par rapport au taux plein à 67 ans (100 %), un départ anticipé à 62 ans subit une décote viagère de 30 % (soit 70 % de la pension de base), tandis qu'un report à 70 ans procure une surcote définitive de 24 % (soit 124 %). Le versement mensuel à 70 ans est ainsi supérieur de 77,1 % à celui perçu dès 62 ans, et l'attente jusqu'à 67 ans devient cumulativement gagnante à partir de 78 ans et 8 mois."
  - question: "Que se passe-t-il si ma carrière compte moins de 35 années cotisées ?"
    answer: "Le calculateur suppose une carrière complète stabilisée à votre revenu saisi. Dans le calcul officiel du régime fédéral de sécurité sociale, la moyenne porte toujours sur les 35 meilleures années indexées : chaque année manquante est comptabilisée à zéro, ce qui abaisse le revenu mensuel moyen. Remplacer une année à zéro par une année cotisée en fin de carrière augmente donc directement la pension future."
  - question: "Comment les conventions bilatérales jouent-elles pour les Français, Belges, Suisses ou Canadiens ?"
    answer: "La France, la Belgique, la Suisse et le Canada ont signé des accords bilatéraux de sécurité sociale avec les États-Unis. Grâce au mécanisme de totalisation, vos périodes cotisées dans votre pays d'origine et outre-Atlantique s'additionnent pour atteindre les durées minimales d'ouverture des droits, chaque caisse versant ensuite sa quote-part proportionnelle de pension."
  - question: "Les pensions de sécurité sociale sont-elles imposables à la retraite ?"
    answer: "Oui, dans la majorité des situations. Dans le régime fédéral américain, jusqu'à 85 % de la prestation peut entrer dans le revenu imposable selon les autres ressources du foyer. En France (impôt sur le revenu après abattement de 10 % et prélèvements sociaux CSG/CRDS selon le revenu fiscal), en Belgique, en Suisse et au Canada (RRQ/RPC), les pensions publiques s'ajoutent au revenu imposable, sous réserve des conventions fiscales bilatérales évitant la double imposition."
---

La préparation de la retraite repose sur un arbitrage décisif : **l'âge de liquidation** de sa pension publique. Liquider tôt procure une trésorerie immédiate mais fige une **décote viagère** permanente ; patienter déclenche une **surcote garantie**, revalorisée contre l'inflation, qui sécurise le pouvoir d'achat aux grands âges.

Ce calculateur met en œuvre le barème progressif à trois tranches du régime fédéral nord-américain (taux plein à **67 ans**, anticipation dès **62 ans**, report jusqu'à **70 ans**, en dollars `$`). Il sert aux expatriés et binationaux francophones tout en illustrant la logique actuarielle des régimes publics de **France (`€`)**, **Belgique (`€`)**, **Suisse (`CHF`)** et **Canada (`$ CAD`)**.

## Formule de la pension de base et coefficients d'âge

Le calcul combine plafonnement du revenu, tranches progressives et coefficient d'âge.

### 1. Revenu mensuel indexé ($R_m$) et pension de base ($P_{\text{base}}$)

Le revenu annuel brut ($Y$) est borné au **plafond annuel cotisable** ($168\,600\text{ \$}$) pour obtenir $R_m = \min(Y,\, 168\,600) / 12$. La pension mensuelle au taux plein (67 ans) applique deux seuils, $B_1 = 1\,174\text{ \$}$ et $B_2 = 7\,078\text{ \$}$ :

$$P_{\text{base}} = 0{,}90 \cdot \min(R_m, B_1) + 0{,}32 \cdot \max\!\bigl(0,\; \min(R_m, B_2) - B_1\bigr) + 0{,}15 \cdot \max(0,\; R_m - B_2)$$

* **$Y$ et $R_m$** : salaire annuel brut moyen (plafonné à $168\,600\text{ \$}$) et revenu mensuel indexé sur 35 ans ($R_m \le 14\,050\text{ \$}$).
* **$B_1$ et $B_2$** : paliers mensuels délimitant les taux de remplacement de $90\,\%$, $32\,\%$ et $15\,\%$.
* **$P_{\text{base}}$** : pension mensuelle brute versée à 67 ans.

### 2. Décote d'anticipation et surcote d'ajournement

Pour un départ à l'âge $A \in [62\,;\,70]$, la pension finale $P(A)$ applique un coefficient viager mensuel :

* **Anticipation ($A < 67$, $m = 12(67 - A)$ mois)** : décote de $\frac{5}{9}\,\%$ par mois sur les $36$ premiers mois ($-20\,\%$ à 64 ans), puis $\frac{5}{12}\,\%$ au-delà, atteignant **$-30{,}0\,\%$ à 62 ans** ($m = 60$).
* **Taux plein ($A = 67$)** : $P(67) = P_{\text{base}}$ ($100\,\%$).
* **Ajournement ($67 < A \le 70$, $m = \min(12(A - 67),\, 36)$ mois)** : surcote de $\frac{2}{3}\,\%$ par mois (**$+8{,}0\,\%$ par an**), plafonnée à **$+24{,}0\,\%$ à 70 ans**.

## Exemple chiffré : revenu annuel de 75 000 $ et points morts

Prenons un revenu annuel brut de **$75\,000\text{ \$}$** (ordre de grandeur proche de $69\,000\text{ €}$ ou $102\,000\text{ \$ CAD}$).

1. **Revenu mensuel** : $R_m = 75\,000 / 12 = \mathbf{6\,250{,}00\text{ \$/mois}}$.
2. **Tranche 1 ($90\,\%$)** : $1\,174 \times 0{,}90 = \mathbf{1\,056{,}60\text{ \$}}$.
3. **Tranche 2 ($32\,\%$)** : $(6\,250 - 1\,174) \times 0{,}32 = 5\,076 \times 0{,}32 = \mathbf{1\,624{,}32\text{ \$}}$ (tranche 3 nulle car $R_m \le 7\,078\text{ \$}$).
4. **Taux plein (67 ans)** : $P(67) = 1\,056{,}60 + 1\,624{,}32 = \mathbf{2\,680{,}92\text{ \$/mois}}$ (remplacement brut de **$42{,}9\,\%$**).
5. **À 62 ans ($-30\,\%$)** : $P(62) = 2\,680{,}92 \times 0{,}70 = \mathbf{1\,876{,}64\text{ \$/mois}}$ ($-804{,}28\text{ \$/mois}$).
6. **À 70 ans ($+24\,\%$)** : $P(70) = 2\,680{,}92 \times 1{,}24 = \mathbf{3\,324{,}34\text{ \$/mois}}$, soit **$+77{,}1\,\%$** par rapport à 62 ans.

**Points morts cumulatifs (hors actualisation)** : attendre 67 ans rattrape le départ à 62 ans à **78 ans et 8 mois** ; reporter de 67 à 70 ans devient gagnant dès **82 ans et 6 mois**.

## Barème comparatif des pensions et repères francophones

| Revenu annuel brut | Revenu mensuel ($R_m$) | À 62 ans ($-30\,\%$) | À 67 ans ($100\,\%$) | À 70 ans ($+24\,\%$) | Remplacement (67 ans) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **36 000 $** | 3 000 $ | 1 149 $ | 1 641 $ | 2 035 $ | 54,7 % |
| **60 000 $** | 5 000 $ | 1 597 $ | 2 281 $ | 2 828 $ | 45,6 % |
| **75 000 $** | 6 250 $ | 1 877 $ | 2 681 $ | 3 324 $ | 42,9 % |
| **100 000 $** | 8 333 $ | 2 194 $ | 3 134 $ | 3 886 $ | 37,6 % |
| **140 000 $** | 11 667 $ | 2 544 $ | 3 634 $ | 4 506 $ | 31,2 % |
| **168 600 $ (plafond)** | 14 050 $ | 2 794 $ | 3 992 $ | 4 950 $ | 28,4 % |

### Parallèle avec les régimes publics francophones

Cette logique actuarielle structure aussi les retraites publiques francophones : en **France** (CNAV en `€`), les 25 meilleures années plafonnées au PASS ouvrent le taux plein automatique à 67 ans avec décote ou surcote de $1{,}25\,\%$ par trimestre ; au **Canada et au Québec** (RPC/RRQ en `$ CAD`), l'anticipation dès 60 ans réduit la rente de $0{,}6\,\%$ par mois ($-36\,\%$) et le report jusqu'à 70 ans la majore de $0{,}7\,\%$ par mois ($+42\,\%$) ; en **Suisse** (AVS en `CHF`), l'ajournement après 65 ans accorde jusqu'à $+31{,}5\,\%$ sur cinq ans ; en **Belgique** (`€`), l'âge légal passe à 66 puis 67 ans avec bonus de pension.

## Pièges d'estimation et stratégies de liquidation

* **Corriger les carrières incomplètes** : Sous 35 années cotisées, chaque année absente entre à zéro dans la moyenne officielle ; les conventions bilatérales de totalisation (France, Belgique, Suisse, Canada) évitent toutefois de perdre l'ouverture des droits.
* **Utiliser une épargne-relais jusqu'à 70 ans** : En bonne santé, puiser temporairement dans un PER, une assurance-vie, un REER/CELI ou un 2e/3e pilier permet de sécuriser une surcote viagère de $+8\,\%$ par an.
* **Raisonner en net après impôt** : La pension simulée est brute ; intégrez impôt progressif, prélèvements sociaux locaux et conventions fiscales bilatérales.
* **Protéger le conjoint survivant** : Reporter jusqu'à 70 ans la pension la plus élevée du couple rehausse durablement la réversion du survivant.
