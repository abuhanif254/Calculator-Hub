---
title: "Remboursement de Prêt Étudiant"
metaTitle: "Calculateur de Prêt Étudiant : Mensualités, Différé et TAEG"
description: "Simulez le remboursement de votre prêt étudiant avec ou sans différé d'amortissement, calculez vos mensualités réelles et estimez le coût total du crédit."
metaDescription: "Simulez vos mensualités de prêt étudiant, comparez le différé partiel ou total et calculez le coût global des intérêts selon le TAEG et la durée choisie."
metaKeywords: "calculateur prêt étudiant, simulation crédit étudiant, différé partiel ou total, prêt étudiant garanti par l'État, tableau d'amortissement prêt étudiant, remboursement anticipé crédit études"
faqs:
  - question: "Quelle est la différence entre un différé partiel et un différé total sur un prêt étudiant ?"
    answer: "En différé partiel, vous réglez chaque mois les intérêts intercalaires (et l'assurance) pendant vos études, ce qui maintient votre capital emprunté intact. En différé total, vous ne payez que l'assurance pendant votre scolarité : les intérêts non réglés sont capitalisés annuellement et s'ajoutent au capital à rembourser à la fin des études, augmentant le coût global du prêt."
  - question: "Y a-t-il des pénalités en cas de remboursement anticipé d'un prêt étudiant ?"
    answer: "En France, le prêt étudiant relève juridiquement du crédit à la consommation (jusqu'à 75 000 €). Selon l'article L312-34 du Code de la consommation, aucun frais de remboursement anticipé ne peut être exigé si le montant remboursé par anticipation est inférieur à 10 000 € sur une période glissante de 12 mois. Au-delà de ce seuil, l'indemnité est plafonnée à 1 % du capital remboursé s'il reste plus d'un an de contrat (0,5 % sinon)."
  - question: "Comment fonctionne le prêt étudiant garanti par l'État ?"
    answer: "Géré avec le concours de Bpifrance et distribué par les banques partenaires, ce dispositif permet d'emprunter jusqu'à 20 000 € sans caution parentale ni justificatif de revenus. L'État garantit 70 % du risque auprès de la banque, mais le taux d'intérêt (TAEG) reste librement fixé par l'établissement prêteur et la durée minimale est de 2 ans."
  - question: "L'assurance emprunteur est-elle obligatoire pour souscrire un crédit étudiant ?"
    answer: "Légalement, l'assurance décès-invalidité (ADI) est facultative pour un crédit étudiant. En pratique, la plupart des banques l'exigent pour couvrir le garant (parents ou État) en cas d'accident grave. Grâce à la délégation d'assurance, vous pouvez comparer le contrat groupe bancaire (souvent facturé entre 0,10 % et 0,30 % du capital initial par an) avec une assurance externe."
  - question: "Quel salaire net faut-il viser à la sortie d'études pour absorber sa mensualité ?"
    answer: "Les banques appliquent la règle prudentielle d'un taux d'endettement maximal de 33 % à 35 % des revenus nets (en incluant votre futur loyer ou projet immobilier). Pour une mensualité de prêt étudiant de 450 €, il est recommandé que cette charge ne dépasse pas 15 % à 20 % de votre premier salaire net (soit 2 250 € à 3 000 € net mensuel) afin de préserver votre capacité à vous loger."
---

Financer un cursus dans l'enseignement supérieur — école d'ingénieurs, école de commerce, études médicales ou échange universitaire à l'étranger — nécessite souvent un emprunt structuré sur plusieurs années. Contrairement à un crédit personnel classique où le remboursement du capital débute dès le premier mois, le prêt étudiant dissocie la **période d'études** (phase de franchise ou de différé) de la **période d'activité professionnelle** (phase d'amortissement).

Ce calculateur de prêt étudiant modélise vos échéances mensuelles, le coût cumulé des intérêts et l'impact d'une franchise partielle ou totale afin d'anticiper votre effort financier dès votre premier emploi en France, en Belgique, en Suisse ou au Canada.

## Architecture d'un Crédit Étudiant : Franchise et Amortissement

Un prêt bancaire étudiant s'étale généralement sur une durée totale de **2 à 10 ans** (jusqu'à 12 ans pour les études médicales longues) et se décompose en deux séquences :

1. **La période de franchise (de 1 à 5 ans)** : tant que vous êtes étudiant, vous ne remboursez pas le capital emprunté. Vous choisissez entre deux mécanismes :
   - **La franchise partielle (différé partiel)** : vous payez uniquement les intérêts mensuels calculés sur le capital débloqué ainsi que la cotisation d'assurance emprunteur. Le capital dû reste strictement égal au montant emprunté.
   - **La franchise totale (différé total)** : vous ne réglez aucune mensualité de capital ni d'intérêts pendant vos études (seule l'assurance reste prélevée). En contrepartie, les intérêts annuels non payés s'ajoutent au capital emprunté par capitalisation annuelle (anatocisme encadré par l'article 1343-2 du Code civil en France), augmentant le capital à amortir à la sortie d'école.
2. **La période d'amortissement (de 2 à 5 ans)** : une fois diplômé et inséré sur le marché du travail, vous remboursez simultanément le capital et les intérêts par mensualités constantes.

## Formules Mathématiques du Remboursement

Pour calculer la mensualité constante $M$ (hors assurance) durant la phase d'amortissement, le moteur financier applique l'équation actuarielle des annuités constantes :

$$M = C_{amort} \times \frac{t_m}{1 - (1 + t_m)^{-n}}$$

Où chaque variable correspond à un paramètre contractuel :
- $C_{amort}$ : le **capital à amortir** à l'issue de la période d'études (en euros ou en dollars).
- $t_m$ : le **taux d'intérêt périodique mensuel** proportionnel, obtenu en divisant le taux nominal annuel $T$ par 12 ($t_m = T / 12$).
- $n$ : le **nombre de mensualités d'amortissement** (durée de remboursement actif en années multipliée par 12).

### Calcul du capital à l'issue du différé

Selon l'option retenue lors de la signature, le capital $C_{amort}$ entrant en phase de remboursement diffère :
- **Sans différé ou en différé partiel** : $C_{amort} = C_0$ (capital initial emprunté). Pendant la franchise partielle, l'étudiant verse chaque mois des intérêts intercalaires égaux à $I_{mensuel} = C_0 \times t_m$.
- **En différé total** (avec capitalisation annuelle sur $A$ années d'études) : $C_{amort} = C_0 \times (1 + T)^A$.

## Exemple Chiffré Pas à Pas : Emprunt de 25 000 € sur 8 Ans

Une étudiante emprunte **25 000 €** au taux nominal annuel fixe de **2,40 %** (taux mensuel $t_m = 0,024 / 12 = 0,002$, soit $0,20\text{ \%}$ par mois) pour financer 3 ans de cycle Master ($36\text{ mois}$ de franchise), suivis de 5 ans de remboursement actif ($n = 60\text{ mois}$). L'assurance emprunteur à $0,15\text{ \%}$ par an représente $3,13\text{ €/mois}$.

### Scénario A : Différé Partiel (recommandé avec un job étudiant ou une alternance)
1. **Pendant les 36 mois d'études** : l'étudiante règle chaque mois les intérêts intercalaires de $25\,000 \times 0,002 = 50,00\text{ €}$. Sur 3 ans, ces intérêts totalisent $36 \times 50,00 = 1\,800,00\text{ €}$.
2. **Durant les 60 mois d'amortissement** : le capital à rembourser demeure de $25\,000\text{ €}$.
   $$M = 25\,000 \times \frac{0,002}{1 - (1,002)^{-60}} = 442,57\text{ €/mois}$$
3. **Coût total des intérêts (hors assurance)** : les intérêts d'amortissement s'élèvent à $(60 \times 442,57) - 25\,000 = 1\,554,20\text{ €}$, soit un total sur 8 ans de $1\,800,00 + 1\,554,20 = \mathbf{3\,354,20\text{ €}}$ (plus $300,48\text{ €}$ d'assurance).

### Scénario B : Différé Total (aucun intérêt payé pendant 3 ans)
1. **Pendant les 36 mois d'études** : les intérêts capitalisés annuellement portent la dette à $C_{amort} = 25\,000 \times (1,024)^3 = 26\,843,55\text{ €}$.
2. **Durant les 60 mois d'amortissement** : la mensualité calculée sur $26\,843,55\text{ €}$ grimpe à **$475,20\text{ €/mois}$**.
3. **Coût total des intérêts (hors assurance)** : $(60 \times 475,20) - 25\,000 = \mathbf{3\,512,00\text{ €}}$, soit un surcoût de $157,80\text{ €}$ et une échéance alourdie de $32,63\text{ €}$ par mois.

## Tableau Comparatif des Modalités (25 000 € à 2,40 %)

| Modalité Choisie | Durée | Mensualité Études | Mensualité Post-Études | Capital Amorti | Intérêts Totaux |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Amortissement immédiat** | 5 ans | 442,57 € | 442,57 € | 25 000,00 € | 1 554,20 € |
| **Différé partiel (3 + 5 ans)** | 8 ans | 50,00 € | 442,57 € | 25 000,00 € | 3 354,20 € |
| **Différé total (3 + 5 ans)** | 8 ans | 0,00 € | 475,20 € | 26 843,55 € | 3 512,00 € |
| **Différé total (5 + 5 ans)** | 10 ans | 0,00 € | 498,29 € | 28 147,50 € | 4 897,40 € |

## Conseils Pratiques et Pièges à Éviter

- **Exigez un déblocage progressif par tranches** : si votre école facture $8\,000\text{ €}$ par an sur 3 ans, débloquez les fonds annuellement plutôt qu'en un versement unique de $24\,000\text{ €}$. Les intérêts intercalaires ne portant que sur les sommes versées, vous divisez par deux le coût de la franchise.
- **Exploitez la gratuité des remboursements anticipés sous 10 000 €** : en droit français (article L312-34 du Code de la consommation), tout remboursement anticipé inférieur ou égal à $10\,000\text{ €}$ par période de 12 mois est exonéré d'indemnités (IRA). Utilisez votre prime d'embauche pour réduire le capital juste avant la fin du différé.
- **Préservez votre capacité d'emprunt immobilier** : avec un plafond d'endettement fixé à **35 % des revenus nets** par le HCSF, une mensualité étudiante de $475\text{ €}$ ampute votre capacité d'achat immobilier d'environ $85\,000\text{ €}$.
