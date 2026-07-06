---
metaTitle: "Encodeur et Décodeur d'URL en Ligne | encodeURIComponent"
metaDescription: "Utilitaire d'encodage de pourcentage (percent-encoding) avancé pour les URL. Prend en charge encodeURI, encodeURIComponent, et la conversion Unicode UTF-8."
metaKeywords: "encodeur url, décodeur url, encodage url, percent encoding, encodeURIComponent, encodeURI, décoder url, url utf8"
title: "Encodeur et Décodeur d'URL"
shortDescription: "Utilitaire avancé d'encodage de pourcentage pour les URL. Prend en charge encodeURI, encodeURIComponent, l'analyse des paramètres et la conversion Unicode en temps réel."
faqs:
  - question: "Qu'est-ce que l'encodage d'URL ?"
    answer: "L'encodage d'URL (percent-encoding) est un mécanisme permettant de convertir les caractères non autorisés dans les URL (comme les espaces ou les emojis) en un format sécurisé pour le Web à l'aide d'un signe '%' suivi de chiffres hexadécimaux."
  - question: "Pourquoi les URL ont-elles besoin d'être encodées ?"
    answer: "Les URL ne peuvent être envoyées sur Internet qu'à l'aide du jeu de caractères ASCII de base. Tout caractère en dehors de cet ensemble, ou les caractères qui ont une signification structurelle (comme '?' ou '&'), doivent être encodés."
  - question: "Qu'est-ce que le Percent-Encoding ?"
    answer: "Le Percent-encoding est le terme technique formel de l'encodage d'URL. Il fait référence à la pratique consistant à remplacer un caractère non sûr par un signe de pourcentage (%) et sa valeur d'octet hexadécimale à 2 chiffres."
  - question: "Comment décoder une URL ?"
    answer: "Collez simplement votre URL encodée dans notre outil et assurez-vous que l'onglet 'Décoder' est sélectionné. L'outil analysera la chaîne et rétablira toutes les séquences %."
  - question: "Quelle est la différence entre encodeURI et encodeURIComponent ?"
    answer: "encodeURI est destiné à l'encodage d'une URL complète ; il ignore les caractères structurels tels que 'http://' et '/'. encodeURIComponent est strict : il encode presque tout. Il ne doit être utilisé que pour encoder les valeurs de paramètres de requête."
features:
  - "Encodage et décodage bidirectionnels instantanés des URL"
  - "Bascule entre encodeURI (URL complètes) et encodeURIComponent (paramètres)"
  - "Inspecteur interactif des paramètres de requête pour l'édition visuelle"
  - "Prise en charge complète de l'encodage en pourcentage des emojis UTF-8 et Unicode"
  - "Détection intelligente des caractères doublement encodés et des formats URI invalides"
  - "Gestion élégante des erreurs pour les séquences mal formées"
  - "Exécution 100% côté client pour une confidentialité totale"
useCases:
  - "Préparation de la saisie utilisateur pour les paramètres de requête dans les appels API"
  - "Décodage de liens de suivi pour voir la destination d'origine"
  - "Débogage des réponses de serveur à double encodage ('%2520')"
  - "Inspection visuelle et édition de chaînes de requête complexes"
  - "Conversion de caractères Unicode et d'emojis en liens ASCII valides"
howToSteps:
  - "Sélectionnez le mode de fonctionnement : 'Encoder' ou 'Décoder'."
  - "Collez votre URL ou votre chaîne de texte dans le panneau de saisie."
  - "Si vous encodez, choisissez entre 'Composant' (encodage strict) ou 'URL Complète' (ignore les barres obliques)."
  - "Le panneau de sortie génère instantanément la chaîne encodée."
  - "Si votre URL contient une chaîne de requête, faites défiler vers le bas jusqu'à 'l'Inspecteur de Requêtes' pour modifier les paramètres individuellement."
  - "Copiez la sortie ou téléchargez-la sous forme de fichier texte."
---

## Qu'est-ce que l'encodage d'URL ?

**L'encodage d'URL**, officiellement connu sous le nom de percent-encoding (encodage en pourcentage), est un mécanisme d'encodage d'informations dans un URI (Uniform Resource Identifier). Les URL ne peuvent être envoyées sur Internet qu'à l'aide du jeu de caractères ASCII. Parce qu'elles contiennent souvent des caractères en dehors de cet ensemble (comme des espaces ou des emojis), ces caractères doivent être convertis en un format ASCII valide.

L'encodage d'URL remplace les caractères ASCII non sûrs par un `%` suivi de deux chiffres hexadécimaux. Par exemple, un espace est remplacé par `%20`.

---

## Qu'est-ce que le Percent-Encoding ?

Le percent-encoding est le terme technique défini par la RFC 3986. Le concept est simple : si un caractère est réservé ou non autorisé, le navigateur ou le serveur le remplace par un signe de pourcentage `%` et sa valeur hexadécimale.

Par exemple, le point d'exclamation `!` devient `%21`, et le symbole dièse `#` devient `%23`. Cela empêche les serveurs Web de confondre les données d'une URL avec les composants structurels de l'URL elle-même.

---

## encodeURI vs encodeURIComponent

Si vous êtes développeur JavaScript, vous utiliserez fréquemment deux fonctions intégrées : `encodeURI()` et `encodeURIComponent()`.

**encodeURI()** : Utilisé pour encoder une URL complète. Il ignore les préfixes de protocole (comme `http://`) et les séparateurs. Il n'encodera PAS les caractères tels que `?`, `=`, `&`, `/` ou `:`.

**encodeURIComponent()** : Utilisé pour encoder un composant spécifique d'une URL, généralement la valeur d'un paramètre de requête. Il encode presque tout, y compris `?`, `=`, `&` et `/`.

*Règle générale : Si vous créez une chaîne de requête telle que `?name=${value}`, utilisez toujours `encodeURIComponent(value)`.*

---

## Erreurs courantes d'encodage d'URL

1. **Double encodage** : Encodage d'une chaîne déjà encodée. Par exemple, l'encodage d'un espace donne `%20`. L'encoder à nouveau transforme le `%` en `%25`, ce qui donne `%2520`. Notre outil met en évidence les segments potentiellement doublement encodés.
2. **Encodage incorrect de l'URL complète** : L'utilisation de `encodeURIComponent` sur une URL complète transforme `https://google.com` en `https%3A%2F%2Fgoogle.com`, ce qu'un navigateur ne peut pas ouvrir.
3. **Mauvaise gestion des espaces** : Dans les paramètres de requête, un espace est traditionnellement encodé par un signe plus (`+`), tandis que dans les chemins d'URL, il est encodé en `%20`.

---

## Considérations de sécurité

L'encodage d'URL est crucial pour éviter les attaques par injection (XSS). Ne pas encoder une chaîne avant de l'insérer dans l'attribut HTML d'un lien permet aux attaquants d'injecter du code malveillant.

Cependant, rappelez-vous que l'encodage d'URL **n'est pas** un chiffrement. Il n'offre aucune confidentialité et est totalement réversible par quiconque. Ne transmettez pas d'informations sensibles (comme des mots de passe) dans les URL, car elles seront enregistrées dans l'historique du navigateur et les journaux du serveur, même si elles sont encodées.
