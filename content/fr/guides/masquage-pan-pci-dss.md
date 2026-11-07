---
title: "Masquage PAN PCI DSS : Protection des Données de Cartes Bancaires en Base"
description: "Guide technique de l’exigence 3 de la norme PCI DSS v4.0 : comment masquer, tronquer et tokéniser les numéros de compte primaire (PAN) pour sécuriser les données bancaires."
---

## Norme PCI DSS v4.0 Exigence 3 : Protection du Numéro de Compte Primaire (PAN)

La norme **PCI DSS (Payment Card Industry Data Security Standard)** encadre la sécurité des données des titulaires de cartes bancaires. Le **Numéro de Compte Primaire (PAN)** — les 15 ou 16 chiffres de la carte — constitue l’élément central soumis aux obligations de masquage et de chiffrement.

### Règle de Masquage à l’Affichage (BIN + 4 Derniers Chiffres)
Lorsqu’un PAN est affiché sur un écran, un reçu ou un rapport, la norme PCI DSS autorise au maximum la visibilité **des 6 premiers chiffres (code BIN/IIN) et des 4 derniers chiffres** (par exemple `453201******7890` ou `************7890`).

### Troncature, Tokénisation et Hachage en Base de Données
Pour rendre le PAN illisible au repos conformément à l’exigence 3.5 de PCI DSS v4.0, les ingénieurs doivent recourir à :
1. **La Troncature Irréversible** : Suppression définitive des chiffres centraux avant toute écriture sur disque ou dans les logs.
2. **La Tokénisation** : Remplacement du PAN par un jeton de référence généré par un coffre-fort cryptographique.
3. **Le Hachage Salé à Sens Unique** : Calcul d’une empreinte cryptographique robuste à clé secrète sur l’intégralité du numéro.
