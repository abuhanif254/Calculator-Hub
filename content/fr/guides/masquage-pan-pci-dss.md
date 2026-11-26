---
title: "Masquage PAN PCI DSS : Protection des Données de Cartes Bancaires en Base"
description: "Guide technique de l’exigence 3 de la norme PCI DSS v4.0 : comment masquer, tronquer et tokéniser les numéros de compte primaire (PAN) pour sécuriser les données bancaires."
category: "Privacy & Security"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "database-anonymizer"
relatedType: "tool"
faqs:
  - question: "Combien de chiffres d'un PAN peuvent être affichés selon PCI DSS v4.0 ?"
    answer: "L'exigence 3.4.1 de PCI DSS v4.0 limite l'affichage du PAN au BIN (les 6 ou 8 premiers chiffres selon l'émetteur) et aux 4 derniers chiffres, uniquement pour le personnel disposant d'un besoin métier légitime. Par prudence opérationnelle sur les cartes à 16 chiffres, la majorité des architectures n'affiche que les 6 premiers et les 4 derniers chiffres (ou uniquement les 4 derniers pour les clients)."
  - question: "Le simple chiffrement AES suffit-il pour des bases de test ou de développement ?"
    answer: "Non. L'exigence 6.5.3 de PCI DSS interdit formellement l'utilisation de véritables numéros de compte primaire (PAN) de production dans les environnements de développement, de test ou de recette, même s'ils sont chiffrés. Vous devez impérativement substituer les PAN par des numéros synthétiques conformes à l'algorithme de Luhn ou par des données entièrement anonymisées."
  - question: "Quelle est la différence entre troncature et masquage dans PCI DSS ?"
    answer: "Le masquage consiste à dissimuler certains chiffres du PAN lors de l'affichage à l'écran, sur un ticket ou dans un fichier journal (ex. 453201******7890), tandis que la donnée complète peut exister ailleurs dans le système. La troncature est une suppression physique et définitive des chiffres centraux avant stockage en base : le PAN d'origine ne peut jamais être reconstitué à partir du segment conservé."
  - question: "Pourquoi le hachage SHA-256 sans sel secret d'un PAN est-il non conforme ?"
    answer: "Un numéro de carte bancaire à 16 chiffres ne comporte que 10 chiffres variables après prise en compte du BIN à 6 chiffres (6 chiffres fixes) et du chiffre de contrôle de Luhn (déterministe). Avec seulement 10^9 combinaisons possibles par BIN, un attaquant peut recalculer l'intégralité des empreintes SHA-256 en quelques secondes par force brute. PCI DSS v4.0 exige un hachage cryptographique à clé secrète (HMAC) ou salé."
  - question: "Peut-on stocker le code de sécurité CVV/CVC après autorisation de la transaction ?"
    answer: "Jamais. L'exigence 3.3.1 de PCI DSS v4.0 interdit de manière absolue le stockage des données sensibles d'authentification (SAD), notamment le cryptogramme visuel (CVV2/CVC2/CID), les pistes magnétiques complètes et le code PIN chiffré, après la fin du processus d'autorisation, même sous forme chiffrée ou hachée."
---

L'**exigence 3 de la norme PCI DSS v4.0** (*Payment Card Industry Data Security Standard*) régit la protection des données de titulaires de cartes stockées au repos et affichées à l'écran. L'élément central en est le **PAN** (*Primary Account Number*), le numéro de 13 à 19 chiffres identifiant le compte bancaire, dont la fuite expose l'entreprise à des fraudes directes, des amendes des réseaux émetteurs et la révocation de son agrément monétique.

Pour maintenir vos entrepôts analytiques, journaux applicatifs et bases de recette hors du périmètre d'audit **CDE** (*Cardholder Data Environment*), vous devez rendre le PAN cryptographiquement illisible au repos (exigence 3.5.1) ou le remplacer définitivement par une valeur factice. Selon vos besoins métier — rapprochement visuel, déduplication antifraude ou paiements récurrents — vous choisirez entre masquage à l'affichage, troncature irréversible, hachage à clé secrète ou tokénisation.

## Méthodologie PCI DSS v4.0 et sécurité cryptographique

PCI DSS v4.0 distingue strictement la **visibilité à l'affichage** (exigence 3.4.1) de la **protection au repos** (exigence 3.5.1). Sur une console de gestion ou un reçu, seuls le code **BIN** (les 6 premiers chiffres, ou jusqu'à 8 chiffres selon la norme ISO/IEC 7812) et les **4 derniers chiffres** peuvent être affichés au personnel autorisé. Toutefois, afficher `8 + 4 = 12` chiffres sur une carte à 16 chiffres ne laisse que `4` chiffres masqués, réduisant l'entropie résiduelle à `1 000` candidats valides selon l'algorithme de Luhn ; conserver le format `6 + 4` offre donc une marge de sécurité nettement supérieure.

Pour rendre le PAN illisible en base de données (exigence 3.5.1), quatre mécanismes sont reconnus :

1. **Troncature irréversible** : suppression définitive des chiffres centraux avant écriture sur disque. L'entropie résiduelle dépend directement du nombre de chiffres détruits :
   ```text
   Chiffres_masqués = Longueur_PAN − (Chiffres_début + Chiffres_fin)
   Candidats_Luhn ≈ 10^(Chiffres_masqués − 1)
   ```
2. **Hachage unidirectionnel à clé secrète (HMAC)** : emploi de `HMAC-SHA-256` ou `HMAC-SHA-512` avec une clé secrète gérée selon les exigences 3.6 et 3.7, bloquant les tables arc-en-ciel sur les `10^9` numéros possibles d'un BIN.
3. **Tokénisation** : remplacement du PAN par un jeton aléatoire isolé dans un coffre-fort (*Token Vault*), sans dérivation mathématique possible.
4. **Chiffrement fort** : chiffrement symétrique `AES-256` avec séparation stricte entre base de données et serveur de clés (KMS/HSM).

## Exemple chiffré : assainissement d'une table de paiements

Soit une table SQL `paiements` de `250 000` transactions traitée avec notre [outil d'anonymisation de base de données](/fr/outils/database-anonymizer). Prenons le PAN valide `4532 0155 8294 7890` (16 chiffres) associé au cryptogramme `412` :

1. **Suppression des données SAD (3.3.1)** : la colonne `cvv` (`412`) est détruite dès l'autorisation (`DROP COLUMN cvv`) dans la base, les réplicas et les sauvegardes.
2. **Troncature au format `6 + 4`** : en conservant `453201` et `7890`, `6` chiffres centraux sont purgés (`16 − 6 − 4 = 6`). Le champ devient `453201******7890`, laissant `10^5 = 100 000` combinaisons Luhn indiscernables.
3. **Calcul HMAC pour l'antifraude** : pour compter les paiements d'une même carte sans stocker le PAN, l'application stocke `HMAC-SHA-256(clé_256_bits, "4532015582947890")`. Sur `250 000` enregistrements, la probabilité de collision reste inférieure à `10^-66`.
4. **Substitution synthétique hors production (6.5.3)** : en environnement QA, les PAN réels sont remplacés par des numéros fictifs respectant la somme de Luhn modulo 10 (ex. `4000001234567892`), conservant la validation de formulaire sans aucune donnée bancaire réelle.

## Comparatif des techniques de protection du PAN

| Technique | Réversibilité | Sortie du CDE | Usage principal | Erreur fréquente |
| :--- | :--- | :--- | :--- | :--- |
| Masquage visuel (`6+4` ou `*7890`) | Non (affichage) | Non (si PAN stocké) | Tickets, consoles SAV | PAN brut écrit dans les logs JSON |
| Troncature (`453201******7890`) | Irréversible | Oui (si PAN purgé) | Reporting comptable | Conservation de 8+4 chiffres peu sûrs |
| Hachage HMAC-SHA-256 | Irréversible | Oui (clé protégée) | Déduplication, antifraude | SHA-256 sans sel cassé par force brute |
| Tokénisation par coffre | Réversible (coffre) | Oui (systèmes tiers) | Abonnements, 1-clic | Jeton séquentiel ou prédictible |
| Chiffrement AES-256-GCM | Réversible (KMS) | Non (inclut le KMS) | Coffre interne haute sécurité | Clé stockée sur le même serveur SQL |
| Substitution synthétique (Luhn) | Irréversible | Oui (données fictives) | Bases de test, QA, staging | PAN de production chiffrés en recette |

## Scénarios d'architecture, erreurs courantes et limites d'audit

Dans une architecture e-commerce moderne, confier la saisie des numéros de cartes aux champs hébergés (*Hosted Fields* ou redirection 3DS2) du prestataire de paiement permet à votre serveur applicatif de ne manipuler qu'un **jeton** unique et les quatre derniers chiffres, maintenant votre base de données hors périmètre CDE (éligibilité au questionnaire allégé **SAQ A**).

Les auditeurs QSA (*Qualified Security Assessor*) relèvent régulièrement quatre failles critiques lors des contrôles PCI DSS v4.0 :

1. **Fuites dans les journaux et APM** : des middlewares enregistrent le corps JSON des requêtes POST avant masquage, stockant des PAN en clair dans les agrégateurs de logs.
2. **Coexistence troncature + hachage (3.5.1.1)** : stocker simultanément un PAN tronqué et son hachage sans contrôle d'isolement permet de retrouver les `10^5` chiffres manquants par force brute.
3. **Dumps et sauvegardes oubliés** : d'anciennes copies SQL non purgées réintroduisent des PAN réels lors du rafraîchissement des environnements de test.
4. **Absence de scan PAN Discovery** : sans détection périodique par expressions régulières et contrôle de Luhn sur les colonnes texte (`notes`, `référence`), des numéros saisis manuellement échappent au chiffrement.
