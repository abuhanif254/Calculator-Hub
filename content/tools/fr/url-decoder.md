---
metaTitle: "Décodeur d'URL en Ligne | Outil decodeURIComponent"
metaDescription: "Utilitaire avancé de décodage d'URL. Analysez les chaînes encodées, inspectez les paramètres, gérez Unicode/UTF-8 et détectez les URL à double encodage."
metaKeywords: "décodeur url, décoder url en ligne, décoder chaîne url, percent decoding, decodeURIComponent, decodeURI, url utf8"
title: "Décodeur d'URL"
shortDescription: "Utilitaire avancé de décodage d'URL. Analysez les chaînes encodées, inspectez les paramètres, gérez Unicode/UTF-8 et détectez les URL à double encodage."
faqs:
  - question: "Qu'est-ce que le décodage d'URL ?"
    answer: "Le décodage d'URL est le processus de traduction d'une chaîne encodée en pourcentage (où les caractères dangereux sont remplacés par un '%' et un code hexadécimal) en un format lisible par l'homme."
  - question: "Comment décoder une URL ?"
    answer: "Collez simplement votre chaîne encodée dans notre outil. Il détectera automatiquement les séquences de pourcentages et les traduira instantanément en leurs caractères d'origine."
  - question: "Qu'est-ce qu'une erreur de décodage d'URL invalide ?"
    answer: "Une erreur de séquence URI mal formée se produit lorsque le texte contient un signe '%' qui n'est pas suivi de deux caractères hexadécimaux valides, ou lorsqu'une séquence UTF-8 est tronquée."
  - question: "Qu'est-ce que le double encodage ?"
    answer: "Le double encodage se produit lorsqu'une chaîne est accidentellement encodée deux fois. Par exemple, un espace devient '%20', et s'il est de nouveau encodé, le '%' devient '%25', ce qui donne '%2520'. Il faut la décoder deux fois."
  - question: "Quelle est la différence entre decodeURI et decodeURIComponent ?"
    answer: "decodeURI est utilisé pour les URL complètes et ignore certains caractères structurels. decodeURIComponent est strict et tente de décoder chaque séquence de pourcentage qu'il trouve."
features:
  - "Décodage d'URL instantané en temps réel"
  - "Inspecteur de paramètres de requête (Query Parameter) intelligent pour éditer les paires clé-valeur"
  - "Prise en charge du décodage de séquence d'emojis Unicode et UTF-8"
  - "Gestion élégante des erreurs de 'Séquence URI mal formée'"
  - "Basculement entre les algorithmes decodeURI et decodeURIComponent"
  - "Exécution 100% côté client pour une confidentialité totale"
useCases:
  - "Décodage de liens d'affiliation, de marketing ou de suivi offusqués"
  - "Inspection de charges utiles JSON fortement encodées envoyées via des requêtes API GET"
  - "Débogage des réponses de serveur à double encodage ('%2520')"
  - "Restauration des URL internationalisées à leur format lisible"
howToSteps:
  - "Collez votre URL encodée en pourcentage dans le panneau de saisie supérieur."
  - "L'outil analysera instantanément la chaîne et affichera le texte lisible."
  - "Si votre URL contient une chaîne de requête, faites défiler jusqu'à 'l'Inspecteur de Requêtes' pour afficher les paramètres décodés dans un tableau."
  - "Si vous rencontrez une erreur d'URI, vérifiez si votre chaîne contient des signes '%' erronés."
  - "Utilisez la barre d'outils pour copier la sortie ou la télécharger sous forme de fichier texte."
---

## Qu'est-ce que le Décodage d'URL ?

**Le décodage d'URL** est le processus de conversion d'un identificateur de ressource uniforme (URI) encodé en pourcentage vers son format d'origine lisible par l'homme. Lorsque des données sont envoyées sur Internet via des URL, certains caractères (comme les espaces, les emojis et les symboles structurels) ne peuvent pas être transmis en toute sécurité. Ils sont "encodés" en un signe de pourcentage (`%`) suivi d'un nombre hexadécimal à deux chiffres.

Le décodage d'URL recherche ces séquences de pourcentages et les traduit en leurs caractères littéraux. Par exemple, la séquence `%20` est reconvertie en espace standard, et `%3F` en point d'interrogation (`?`).

---

## Comment fonctionne le décodage d'URL

Lorsque notre décodeur reçoit une chaîne, il analyse le texte de manière séquentielle. Chaque fois qu'il rencontre un symbole `%`, il examine les deux caractères suivants. En supposant qu'ils forment une paire hexadécimale valide, il traduit cet octet.

Si le texte original contenait des caractères Unicode (comme un Emoji), le processus de décodage est plus complexe. Les URL modernes utilisent l'encodage UTF-8, ce qui signifie qu'un seul caractère Unicode peut être représenté par trois ou quatre octets encodés en pourcentage. Par exemple, l'emoji "Fusée" 🚀 est encodé sous la forme `%F0%9F%9A%80`.

---

## Décodage des paramètres de requête

Le cas d'utilisation le plus courant du décodage d'URL est l'analyse des paramètres de requête. Ce sont les portions d'une URL qui viennent après le point d'interrogation (`?`), généralement utilisées pour transmettre des données au serveur sous forme de paires clé-valeur.

Par exemple : `?name=John%20Doe&email=john%40example.com`

Notre décodeur d'URL dispose d'un **Inspecteur de Paramètres de Requête** avancé. Il analyse automatiquement les paramètres, décode les clés et les valeurs et les présente dans un format de tableau propre et lisible.

---

## Problèmes de double encodage

L'un des bugs les plus frustrants du développement Web est le **double encodage**. Cela se produit lorsqu'une application encode accidentellement une chaîne qui a déjà été encodée.

Par exemple, un espace devient `%20`. Si l'application l'encode à nouveau, le caractère `%` lui-même est encodé en `%25`, ce qui donne `%2520`. Lorsqu'un système backend tente de décoder cela une fois, il redevient `%20` (au lieu d'un espace) et brise la logique. Notre décodeur vous aide à identifier les chaînes doublement encodées.

---

## Erreurs courantes de décodage d'URL

1. **Séquence URI mal formée** : Il s'agit d'une erreur JavaScript critique (`URIError: malformed URI sequence`). Elle se produit lorsque la chaîne contient un signe `%` qui n'est pas suivi de deux caractères hexadécimaux valides.
2. **Signes Plus littéraux** : Dans la chaîne de requête d'une URL, les espaces sont historiquement encodés sous forme de signes plus (`+`). Cependant, dans le chemin d'une URL, les espaces sont encodés en `%20`, et un `+` est traité comme un signe plus littéral.

---

## Considérations de sécurité

Il est absolument crucial de comprendre que **l'encodage d'URL n'est pas un chiffrement**. Quiconque intercepte une URL peut instantanément la décoder. Ne transmettez jamais d'informations sensibles (mots de passe, clés d'API) dans les paramètres de requête de l'URL. De plus, ne jamais refléter les entrées utilisateur décodées directement en HTML sans les assainir pour éviter les failles XSS.
