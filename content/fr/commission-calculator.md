---
title: "Calculateur de Commission"
metaTitle: "Calculateur de Commission : Ventes, Paliers et Immobilier"
description: "Estimez vos commissions commerciales, honoraires d'agence immobilière, grilles progressives par paliers et rémunérations variables brutes ou nettes."
metaDescription: "Calculez vos commissions sur ventes, paliers progressifs, honoraires immobiliers et rémunération variable brute ou nette avec notre calculateur gratuit."
metaKeywords: "calculateur de commission, calcul commission commerciale, commission par paliers progressifs, honoraires agence immobilière, salaire fixe plus variable, commission sur marge brute"
faqs:
  - question: "Quelle est la différence entre une commission sur chiffre d'affaires et une commission sur marge brute ?"
    answer: "Une commission sur le chiffre d'affaires (CA) récompense le volume total vendu (par exemple 5 % d'un contrat de 20 000 €, soit 1 000 €), quel que soit le coût de revient. À l'inverse, une commission sur la marge brute ne porte que sur le bénéfice dégagé après déduction du coût d'achat ou de production. Si le commercial accorde une remise excessive au client pour conclure la vente, sa marge brute chute et sa commission diminue proportionnellement, ce qui protège la rentabilité de l'entreprise."
  - question: "Doit-on calculer la commission d'un commercial sur le montant hors taxes (HT) ou toutes taxes comprises (TTC) ?"
    answer: "Sauf stipulation contraire dans le contrat de travail ou le mandat d'agent commercial, la jurisprudence constante (notamment de la Cour de cassation en France) et les usages professionnels établissent que les commissions se calculent sur le chiffre d'affaires hors taxes (HT) et hors frais accessoires (frais de port), car la TVA n'est qu'un impôt collecté pour l'État."
  - question: "Comment fonctionne le partage d'honoraires en immobilier entre l'agence, le mandataire et l'inter-cabinet ?"
    answer: "En immobilier, les honoraires affichés aux particuliers sont exprimés TTC. On retire d'abord la TVA (en divisant par 1,20 en France pour une TVA à 20 %) afin d'obtenir la commission hors taxes. En cas d'inter-cabinet (partage 50/50 entre l'agence qui détient le mandat et celle qui apporte l'acquéreur), l'enveloppe HT est divisée par deux. Ensuite, chaque négociateur salarié (15 % à 40 %) ou mandataire indépendant (70 % à 90 %) perçoit son pourcentage sur la part HT revenant à son enseigne."
  - question: "Qu'est-ce qu'une avance sur commission récupérable dans un plan de rémunération variable ?"
    answer: "Une avance sur commission récupérable garantit un versement mensuel minimal pendant les premiers mois d'activité, par exemple 1 500 €. Si le commercial ne génère que 900 € de commissions réelles le premier mois, l'employeur lui verse tout de même 1 500 €, mais le déficit de 600 € est reporté et déduit des commissions excédentaires des mois suivants."
  - question: "Les commissions versées à un commercial salarié sont-elles prises en compte pour les congés payés ?"
    answer: "Oui. En droit du travail français, belge et québécois, les commissions directement liées à l'activité personnelle du salarié entrent dans l'assiette de calcul de l'indemnité de congés payés (règle du dixième de la rémunération brute totale en France)."
---

La rémunération au résultat constitue le moteur financier des métiers de la vente interentreprises (B2B), de la transaction immobilière, du courtage financier et du marketing d'affiliation. Ce calculateur de commission modélise aussi bien un taux linéaire simple qu'une grille progressive par tranches marginales, un système de salaire fixe assorti de primes sur objectifs ou le partage d'honoraires entre une agence et ses négociateurs.

## Les trois grandes architectures de commissionnement commercial

Pour aligner la motivation d'une force de vente avec la stratégie financière d'une entreprise, les directions commerciales s'appuient sur trois mécanismes de calcul :

1. **La commission linéaire (taux fixe)** : Un pourcentage constant s'applique dès le premier euro ou dollar facturé. C'est le modèle privilégié des agents commerciaux indépendants, des courtiers et des plateformes d'affiliation.
2. **La commission progressive par paliers (tranches marginales)** : Inspirée du barème de l'impôt sur le revenu, elle augmente le taux de commission au fur et à mesure que le vendeur franchit des seuils de chiffre d'affaires. Lorsqu'un commercial dépasse $100\,\%$ de son quota périodique, un « accélérateur » majore fortement le taux sur les ventes excédentaires.
3. **La structure mixte (Fixe + Variable + Prime de palier)** : Standard des ingénieurs d'affaires salariés (logiciels SaaS, industrie), elle combine un salaire de base sécurisant ($60\,\%$ à $70\,\%$ de la rémunération cible) et une part variable indexée sur le chiffre d'affaires ou la marge brute.

## Formules de calcul : du chiffre d'affaires brut au revenu net

### 1. Commission linéaire sur chiffre d'affaires ou sur marge brute
Selon que le plan porte sur le volume des ventes hors taxes ($V_{\text{HT}}$) ou sur la marge brute dégagée après déduction du coût de revient ($M_{\text{brute}} = V_{\text{HT}} - C_{\text{revient}}$), la formule s'écrit :

$$C_{\text{linéaire}} = V_{\text{HT}} \times \frac{\tau}{100} \qquad \text{ou} \qquad C_{\text{marge}} = (V_{\text{HT}} - C_{\text{revient}}) \times \frac{\tau}{100}$$

où $\tau$ représente le taux de commission exprimé en pourcentage.

### 2. Commission progressive par paliers marginaux
Dans un barème à $n$ tranches délimitées par les seuils $S_0, S_1, \dots, S_n$ et associées aux taux marginaux $\tau_1, \tau_2, \dots, \tau_n$, chaque taux ne s'applique qu'à la portion de chiffre d'affaires comprise à l'intérieur de sa propre tranche :

$$C_{\text{totale}} = \sum_{i=1}^{n} \max\Big(0, \; \min(V_{\text{HT}}, S_i) - S_{i-1}\Big) \times \frac{\tau_i}{100}$$

### 3. Rétrocession et partage d'honoraires immobiliers
Lorsqu'une commission d'agence est exprimée toutes taxes comprises ($H_{\text{TTC}}$), il convient d'extraire la TVA au taux en vigueur ($t_{\text{TVA}}$, soit $20\,\%$ en France ou $21\,\%$ en Belgique) avant d'appliquer la quote-part d'inter-cabinet ($p_{\text{inter}}$) et le taux de rétrocession du négociateur ($r_{\text{agent}}$) :

$$H_{\text{HT}} = \frac{H_{\text{TTC}}}{1 + \frac{t_{\text{TVA}}}{100}} \qquad \Longrightarrow \qquad \text{Gain Agent HT} = H_{\text{HT}} \times p_{\text{inter}} \times r_{\text{agent}}$$

## Démonstration chiffrée : grille par paliers B2B et transaction immobilière

### Exemple 1 : Ingénieur commercial B2B avec accélérateur par paliers
Un responsable grands comptes perçoit un salaire fixe mensuel de **$2\,800\text{ €}$ brut** et bénéficie du barème trimestriel suivant sur son chiffre d'affaires HT signé :
* **Tranche 1** (de $0\text{ €}$ à $50\,000\text{ €}$) : **$4\,\%$**
* **Tranche 2** (de $50\,000\text{ €}$ à $100\,000\text{ €}$) : **$7\,\%$**
* **Tranche 3** (au-delà de $100\,000\text{ €}$, accélérateur de surperformance) : **$12\,\%$**

Au cours du trimestre, il réalise **$135\,000\text{ € HT}$** de ventes. Détaillons le calcul tranche par tranche :
1. **Sur la 1re tranche** ($50\,000\text{ €}$) : $50\,000\text{ €} \times 0{,}04 = 2\,000{,}00\text{ €}$
2. **Sur la 2e tranche** ($50\,000\text{ €}$) : $50\,000\text{ €} \times 0{,}07 = 3\,500{,}00\text{ €}$
3. **Sur la 3e tranche** ($35\,000\text{ €}$) : $35\,000\text{ €} \times 0{,}12 = 4\,200{,}00\text{ €}$
4. **Total des commissions variables** : $2\,000 + 3\,500 + 4\,200 = \mathbf{9\,700{,}00\text{ €}}$ (taux moyen effectif de $7{,}19\,\%$).
Avec ses trois mois de salaire fixe ($8\,400\text{ €}$), sa rémunération brute trimestrielle atteint **$18\,100{,}00\text{ €}$**.

### Exemple 2 : Vente immobilière et partage mandataire / réseau
Un bien est vendu **$350\,000\text{ €}$** avec des honoraires d'agence de **$5\,\%$ TTC**, soit **$17\,500{,}00\text{ € TTC}$**.
* **Conversion en hors taxes (TVA à 20 %)** : $17\,500{,}00\text{ €} \div 1{,}20 = 14\,583{,}33\text{ € HT}$
* **Part du mandataire indépendant (75 % de rétrocession)** : $14\,583{,}33\text{ €} \times 0{,}75 = \mathbf{10\,937{,}50\text{ € HT}}$
Le réseau conserve $25\,\%$ ($3\,645{,}83\text{ € HT}$). En cas d'inter-cabinet (50/50) avec un confrère, l'enveloppe HT est divisée par deux ($7\,291{,}67\text{ € HT}$) et notre mandataire facture **$5\,468{,}75\text{ € HT}$**.

## Structures de commissionnement par secteur d'activité

| Secteur / Métier | Assiette | Taux Usuel | Rétrocession | Fait Générateur |
| :--- | :--- | :--- | :--- | :--- |
| **Logiciels SaaS B2B** | Valeur annuelle HT (ACV) | 8 % à 12 % (18 % accéléré) | 100 % au titulaire | Signature ou 1er encaissement |
| **Immobilier (Mandataire)** | Honoraires agence HT | 3 % à 6 % TTC du bien | 70 % à 90 % du HT | Acte authentique chez le notaire |
| **Immobilier (Salarié)** | Honoraires agence HT | 3 % à 6 % TTC du bien | 15 % à 35 % du HT | Acte authentique chez le notaire |
| **Négoce Industriel** | Marge brute réelle HT | 10 % à 25 % de la marge | 100 % au commercial | Encaissement intégral client |
| **Affiliation E-commerce** | Panier client HT | 3 % à 15 % (20–40 % digital) | Direct plateforme | Fin du délai de retour (30 j) |

## Clause d'exigibilité et bonnes pratiques contractuelles

* **Fait générateur (commande signée ou facture encaissée)** : Une commission acquise « à la commande » est due dès la signature du contrat, tandis qu'une commission « à l'encaissement » n'est payée qu'après le règlement du client. Pour les agents commerciaux indépendants en Europe (article L134-9 du Code de commerce en France), le paiement doit intervenir au plus tard le dernier jour du mois suivant le trimestre d'acquisition.
* **Clauses de reprise sur annulation (*clawback*)** : Dans les abonnements, le courtage ou le recrutement, si le client résilie pendant la période de garantie, la commission versée peut être reprise sur les décomptes suivants.
* **Déplafonnement des commissions** : Évitez les plans plafonnés, qui incitent les meilleurs vendeurs à reporter leurs signatures au trimestre suivant une fois le plafond atteint.
