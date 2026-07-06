---
metaTitle: "Générateur et Vérificateur HMAC en Ligne | SHA256, SHA512, MD5"
metaDescription: "Générez et vérifiez des codes d'authentification HMAC de manière cryptographiquement sécurisée. Prend en charge SHA256, SHA512, SHA1 et MD5 pour les API."
metaKeywords: "générateur hmac, hmac sha256, code d'authentification de message, signature api, vérificateur webhook, hmac md5, outil hmac"
title: "Générateur HMAC"
shortDescription: "Générez et vérifiez des codes HMAC sécurisés côté client pour les clés d'API, les webhooks et la validation de l'intégrité des données."
faqs:
  - question: "Qu'est-ce qu'un HMAC ?"
    answer: "HMAC signifie Hash-based Message Authentication Code. C'est une signature cryptographique qui combine une clé secrète et une fonction de hachage (comme SHA-256) pour vérifier à la fois l'intégrité et l'authenticité des données."
  - question: "Mes clés secrètes sont-elles envoyées à votre serveur ?"
    answer: "Non, absolument pas. Tous les calculs sont effectués entièrement dans votre navigateur (API Web Crypto). Vos données et clés ne quittent jamais votre appareil."
  - question: "Pourquoi utiliser HMAC plutôt qu'un hachage normal comme SHA-256 ?"
    answer: "Les hachages standard sont vulnérables aux 'attaques par extension de longueur', où un attaquant peut ajouter des données et générer un hachage valide. La conception imbriquée du HMAC le rend immunisé contre ces attaques."
  - question: "Quel algorithme HMAC dois-je choisir ?"
    answer: "Pour la plupart des applications modernes, HMAC-SHA256 est la norme. Il offre un excellent équilibre entre vitesse et sécurité. Utilisez HMAC-SHA512 pour une sécurité maximale."
  - question: "Le HMAC est-il identique au chiffrement ?"
    answer: "Non. Le chiffrement est une fonction bidirectionnelle utilisée pour masquer des données. Le HMAC est une fonction unidirectionnelle utilisée pour vérifier que les données n'ont pas été altérées."
features:
  - "Génération HMAC côté client sécurisée (API Web Crypto)"
  - "Prise en charge : HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 et HMAC-MD5"
  - "Modes doubles : signature de texte ou de fichier local"
  - "Génération HMAC en temps réel avec des mises à jour instantanées"
  - "Moteur de vérification de la somme de contrôle intégré"
  - "Générateur de clés secrètes aléatoires sécurisées (CSPRNG)"
  - "Journalisation complète de l'historique de session (stockée localement)"
useCases:
  - "Génération de signatures HMAC authentiques pour les tests d'API"
  - "Simulation et vérification de signatures de webhooks (Stripe, GitHub)"
  - "Calcul de sommes de contrôle de fichiers locaux avec des clés partagées"
  - "Génération de signatures pour les JWT (jetons HS256 / HS512)"
howToSteps:
  - "Choisissez votre mode d'entrée : 'Texte' ou 'Fichier'."
  - "Sélectionnez l'algorithme de hachage (ex. SHA-256)."
  - "Saisissez votre message ou glissez-déposez un fichier."
  - "Saisissez votre clé secrète ou cliquez sur 'Générer une clé'."
  - "La signature HMAC s'affiche instantanément. Copiez-la."
  - "Facultatif : collez une signature attendue dans 'Comparer'."
---

## Qu'est-ce que le HMAC ?

Un **HMAC** (Hash-based Message Authentication Code) est un type de code d'authentification de message impliquant une fonction de hachage et une clé secrète. Il est utilisé pour vérifier simultanément **l'intégrité** et **l'authenticité** d'un message.

Contrairement aux hachages standard (SHA-256 ou MD5), un HMAC utilise une clé symétrique pré-partagée. Cette clé garantit que seules les personnes qui la possèdent peuvent générer ou vérifier la signature.

---

## Comment fonctionne le HMAC : La formule

Le simple hachage d'un message concaténé avec une clé ($Hash(Clé + Message)$) est vulnérable à une attaque appelée **attaque par extension de longueur**.

Le HMAC l'empêche en hachant la clé et le message dans une structure imbriquée :
$$\\text{HMAC}(K, m) = H((K^+ \\oplus \\text{opad}) \\parallel H((K^+ \\oplus \\text{ipad}) \\parallel m))$$

Ce mécanisme mathématique rend le HMAC hautement sécurisé contre les attaques par extension et troncature.

---

## HMAC vs Hachage standard

| Fonctionnalité | Hachage (ex. SHA-256) | HMAC (ex. HMAC-SHA256) |
| :--- | :--- | :--- |
| **Entrées** | Message seul ($m$) | Message ($m$) + Clé secrète ($K$) |
| **Objectif** | Vérification de l'intégrité | Intégrité ET authenticité |
| **Vulnérabilités** | Extension de longueur | Immunisé |
| **Cas d'utilisation** | Mots de passe, fichiers | Signatures API, Webhooks, JWT |

---

## Algorithmes pris en charge

1. **HMAC-SHA256** : Très sécurisé. Norme de l'industrie pour la signature des requêtes API et des webhooks (Stripe, Slack).
2. **HMAC-SHA512** : Extrêmement sécurisé. Pour une protection maximale des données.
3. **HMAC-SHA1** : Héritage. Toujours sécurisé grâce à la conception du HMAC, mais utilisé uniquement pour les anciens systèmes (Git).
4. **HMAC-MD5** : Faible/Obsolète. À éviter pour les nouveaux projets.

---

## Applications de développeur Web

### 1. Vérification des Webhooks
Lorsqu'un service tiers (Stripe) envoie un webhook à votre serveur, il le hache avec une clé secrète et envoie la signature dans un en-tête (`Stripe-Signature`). Votre serveur calcule le HMAC et le compare.

### 2. Signature des requêtes API (style AWS)
Pour éviter que les clés API ne soient interceptées, AWS utilise des signatures HMAC. Le client génère un HMAC de sa requête avec sa clé secrète et l'envoie.

### 3. Signatures JSON Web Token (JWT)
Dans les JWT (HS256), la signature est générée avec HMAC pour empêcher les utilisateurs de modifier leurs données (comme changer leur rôle en "admin").

---

## Sécurité totale côté client

Cet outil HMAC traite toutes les données **100% localement** dans votre navigateur. Ni vos messages ni vos clés secrètes ne sont envoyés sur Internet. C'est totalement sécurisé.
