---
metaTitle: "Analyseur de User Agent | Navigateur, OS, Moteur & Bots"
metaDescription: "Décodez toute chaîne User-Agent HTTP : identifiez navigateur, moteur Blink/WebKit/Gecko, OS, mobile, Googlebot, bots IA et Client Hints Sec-CH-UA."
metaKeywords: "analyseur user agent, ua parser, détecteur navigateur, chaîne user agent, moteur de rendu blink webkit gecko, googlebot, gptbot, user-agent client hints, sec-ch-ua"
title: "Analyseur de User Agent (UA Parser)"
shortDescription: "Décodez instantanément n'importe quelle chaîne HTTP User-Agent pour identifier le navigateur, le moteur de rendu, le système d'exploitation, le type d'appareil et les robots d'exploration."
faqs:
  - question: "Pourquoi la quasi-totalité des navigateurs modernes commencent-ils leur User-Agent par Mozilla/5.0 ?"
    answer: "Cet héritage remonte aux années 1990 : Netscape Navigator (nom de code Mozilla) prenait en charge les cadres HTML et d'autres nouveautés que les serveurs servaient exclusivement aux clients s'annonçant comme Mozilla. Les concurrents (Internet Explorer, Safari, Chrome, Edge) ont repris ce préfixe par compatibilité ascendante, formant une chaîne cumulative historique."
  - question: "Pourquoi Windows 11 apparaît-il encore sous la forme Windows NT 10.0 dans la chaîne User-Agent ?"
    answer: "Microsoft et les éditeurs de navigateurs basés sur Chromium ont gelé le jeton système à Windows NT 10.0 afin d'éviter de casser les scripts de détection anciens et de réduire le fingerprinting. Pour distinguer de manière fiable Windows 10 et Windows 11, les serveurs doivent interroger l'en-tête Client Hint à haute entropie Sec-CH-UA-Platform-Version."
  - question: "Qu'est-ce que la réduction du User-Agent (User-Agent Reduction) dans Chrome et Edge ?"
    answer: "Pour limiter le pistage par empreinte numérique passive, Chromium a gelé plusieurs champs de l'en-tête User-Agent : les versions mineures de Chrome sont figées à .0.0.0, la version macOS reste figée à 10_15_7 et le modèle exact de smartphone Android est remplacé par la lettre générique K. Les détails précis sont désormais opt-in via User-Agent Client Hints."
  - question: "Comment vérifier qu'un visiteur annonçant Googlebot n'est pas un scraper usurpant cette identité ?"
    answer: "La chaîne User-Agent peut être falsifiée trivialement avec une simple option curl -A. Pour authentifier un véritable robot Googlebot ou Bingbot, il faut effectuer une résolution DNS inverse (PTR) sur son adresse IP source, vérifier que le nom d'hôte se termine par googlebot.com ou google.com, puis confirmer par une résolution DNS directe (A/AAAA) que ce nom pointe bien vers la même IP."
  - question: "Quelle différence existe-t-il entre un robot d'indexation SEO et un crawler d'entraînement IA ?"
    answer: "Les robots SEO comme Googlebot ou Bingbot explorent vos pages afin de les référencer dans les résultats de recherche, tandis que les crawlers IA (GPTBot, ClaudeBot, CCBot, Bytespider) collectent le contenu textuel pour l'entraînement de modèles ou la recherche générative. Les deux familles peuvent être pilotées distinctement dans le fichier robots.txt."
features:
  - "Détection automatique immédiate de la chaîne User-Agent de votre navigateur courant"
  - "Extraction structurée du navigateur, de sa version majeure, du moteur de rendu et de l'architecture CPU"
  - "Identification précise du système d'exploitation (Windows, macOS, Linux, iOS, Android) et du facteur de forme"
  - "Classification dédiée des robots SEO (Googlebot, Bingbot), agents IA (GPTBot, ClaudeBot) et clients CLI"
  - "Comparateur différentiel côte à côte pour repérer les variations subtiles entre deux chaînes UA"
  - "Bibliothèque de profils prédéfinis (Desktop, Mobile, Tablette, Crawlers) pour vos tests et journaux serveur"
useCases:
  - "Auditer les journaux d'accès Nginx ou Apache pour quantifier le budget de crawl consommé par Googlebot"
  - "Repérer les crawlers IA agressifs ou les scrapers masqués derrière des versions obsolètes de navigateurs"
  - "Diagnostiquer un bug CSS ou JavaScript signalé uniquement sur WebKit iOS ou sur une ancienne version Android"
  - "Segmenter analytiquement le trafic entre navigateurs mobiles, WebViews intégrées (Instagram, TikTok) et desktop"
  - "Vérifier l'impact du gel User-Agent Reduction sur vos règles de détection côté serveur ou WAF"
  - "Tester le comportement d'un site adaptatif en comparant les réponses renvoyées selon différents agents"
howToSteps:
  - "Consultez directement l'analyse de votre propre User-Agent affichée automatiquement au chargement de la page."
  - "Collez une chaîne extraite de vos logs serveur, d'un outil d'analytics ou d'une requête cURL dans le champ dédié."
  - "Sélectionnez éventuellement un exemple prédéfini (iPhone Safari, Chrome Android, Googlebot) pour comparer."
  - "Lancez l'analyse afin de décomposer les jetons en catégories : Navigateur, Moteur, OS, Appareil et Statut Bot."
  - "Examinez les indicateurs d'anomalie éventuels (chaîne tronquée, UA réduit Chromium ou incohérence moteur/OS)."
  - "Utilisez le mode comparaison pour mettre en surbrillance les écarts exacts entre deux chaînes User-Agent."
---

L'en-tête HTTP **`User-Agent`**, spécifié par la section 10.1.5 de la norme **RFC 9110**, permet à un client réseau — navigateur web, application mobile, WebView embarquée, bibliothèque HTTP ou robot d'exploration — de déclarer sa pile logicielle au serveur distant. Bien que conçu à l'origine pour la négociation de contenu et la télémétrie, ce champ est devenu au fil de trois décennies de compatibilité ascendante une grammaire dense et souvent trompeuse que seul un analyseur structuré permet d'interpréter de façon fiable.

## Anatomie syntaxique selon la RFC 9110

Formellement, la RFC définit la grammaire `User-Agent = product *( RWS ( product / comment ) )`, soit une succession de jetons `Produit/Version` et de blocs de commentaires entre parenthèses. Observons une chaîne moderne de **Google Chrome sur Android** après déploiement de la réduction du User-Agent :

```text
Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36
```

Chaque segment joue un rôle précis dans l'interprétation :

1. **`Mozilla/5.0`** : jeton de compatibilité universel hérité de Netscape ; il ne signifie plus que le client est Firefox.
2. **`(Linux; Android 10; K)`** : bloc système gelé par Chromium (*User-Agent Reduction*). Même sur Android 15 avec un Pixel 9, la version reste figée à `Android 10` et le modèle matériel est remplacé par la constante `K`.
3. **`AppleWebKit/537.36 (KHTML, like Gecko)`** : héritage historique du moteur WebKit (lui-même issu de KHTML). Chrome utilise en réalité le moteur **Blink** (fork de WebKit lancé en 2013), identifié par la présence combinée de `Chrome/` sans `Edg/` ni `OPR/`.
4. **`Chrome/131.0.0.0 Mobile Safari/537.36`** : seule la version majeure (`131`) demeure dynamique ; le jeton `Mobile` distingue un smartphone d'une tablette Android, tandis que `Safari/537.36` assure la compatibilité avec les anciens parseurs mobiles.

## Moteurs de rendu et particularités mobiles (Blink, WebKit, Gecko)

Comprendre le moteur de rendu sous-jacent compte souvent davantage que le nom commercial du navigateur lors du débogage CSS, WebGL ou WebRTC. L'écosystème web moderne repose sur trois moteurs principaux : **Blink** (Chrome, Microsoft Edge, Opera, Brave, Vivaldi, Samsung Internet et la majorité des navigateurs Android), **WebKit** (Safari sur macOS, iOS et iPadOS) et **Gecko** (Firefox). Sur iPhone et iPad, l'exigence historique de WebKit implique que Chrome (`CriOS/`), Firefox (`FxiOS/`) et Edge (`EdgiOS/`) partagent le même comportement de rendu et les mêmes limites d'API que Safari iOS, un piège classique lorsqu'un développeur ne vérifie que le nom du navigateur dans ses logs d'erreurs.

## Référentiel des familles de chaînes User-Agent

Le tableau ci-dessous présente les signatures caractéristiques des principaux navigateurs, moteurs de rendu et robots rencontrés dans les journaux d'accès web :

| Client / Agent | Moteur de rendu | Jeton discriminant | Plateforme typique | Particularité technique à connaître |
| :--- | :--- | :--- | :--- | :--- |
| **Google Chrome** | Blink | `Chrome/<maj>.0.0.0` (hors `Edg`/`OPR`) | Windows, macOS, Linux, Android | Version mineure et modèle Android gelés (UA Reduction) |
| **Microsoft Edge** | Blink | `Edg/<ver>` (ou `EdgiOS`, `EdgA`) | Desktop, iOS, Android | Reprend toute la chaîne Chrome puis ajoute `Edg/` en fin |
| **Apple Safari** | WebKit | `Version/<ver> Safari/` sans `Chrome/` | macOS, iOS, iPadOS | Sur iPadOS, s'annonce comme `Macintosh` par défaut |
| **Mozilla Firefox** | Gecko | `Gecko/20100101 Firefox/<ver>` | Windows, macOS, Linux, Android | Seul grand navigateur desktop indépendant de Chromium/WebKit |
| **Googlebot Mobile** | Blink (Evergreen) | `Googlebot/2.1` + `Mobile` | Smartphone simulé | Exécute le JavaScript moderne ; à authentifier via rDNS |
| **GPTBot / ClaudeBot** | Sans rendu (HTTP) | `GPTBot/1.2` ou `ClaudeBot/1.0` | Serveurs cloud | Collecte IA contrôlable via des règles ciblées dans `robots.txt` |

## De l'en-tête User-Agent aux *User-Agent Client Hints*

Parce qu'une chaîne détaillée combinée à la taille d'écran et aux polices installées favorise le **fingerprinting passif** (pistage sans cookies), les navigateurs Chromium remplacent progressivement les champs sensibles par les **User-Agent Client Hints** (en-têtes `Sec-CH-UA`). Par défaut, le navigateur n'envoie que trois indices à faible entropie ; le serveur doit explicitement réclamer les valeurs précises via `Accept-CH` :

```http
# Réponse serveur demandant les indices à haute entropie
Accept-CH: Sec-CH-UA-Platform-Version, Sec-CH-UA-Model, Sec-CH-UA-Full-Version-List

# Requête suivante du navigateur client
Sec-CH-UA: "Chromium";v="131", "Not_A Brand";v="24"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "Windows"
Sec-CH-UA-Platform-Version: "15.0.0"
```

Dans cet exemple, `Sec-CH-UA-Platform-Version: "15.0.0"` (valeur supérieure ou égale à `13.0.0`) confirme sans ambiguïté **Windows 11**, alors que l'en-tête classique `User-Agent` continue d'afficher `Windows NT 10.0`. Vous pouvez inspecter les en-têtes `Accept-CH` et `Vary` renvoyés par votre serveur à l'aide de notre [analyseur d'en-têtes HTTP](/fr/outils/http-header-checker).

## Scénarios de dépannage : journaux serveur, WebViews et faux robots

### Expressions régulières fragiles et versions à trois chiffres

Dans les journaux d'accès Apache ou Nginx (variable `$http_user_agent` du *Combined Log Format*), le passage aux versions majeures à trois chiffres (`Chrome/100+`, `Firefox/100+`) a mis en défaut d'anciennes expressions régulières qui n'extrayaient que deux chiffres (`\d{2}`). Évitez d'écrire vos propres regex ad hoc pour le routage critique et appuyez-vous sur des parseurs maintenus ou sur la détection de fonctionnalités côté client (*feature detection*).

### Faux négatifs sur iPad et WebViews sociales

Depuis iPadOS 13, Safari envoie la chaîne d'un Mac (`Macintosh; Intel Mac OS X 10_15_7`) afin de recevoir les versions bureau des applications web. Ne basez donc jamais votre mise en page responsive sur le seul parsing du User-Agent : privilégiez les requêtes média CSS et vérifiez vos points de rupture avec notre [testeur d'écran responsive](/fr/outils/responsive-screen-tester). Par ailleurs, les navigateurs intégrés (*in-app WebViews* comme `FBAN`/`FBAV` pour Facebook ou `Instagram`) ajoutent leurs propres jetons en fin de chaîne et peuvent bloquer certaines API comme `window.open` ou les téléchargements `Blob`.

### Usurpation de Googlebot et filtrage des crawlers

De nombreux scrapers falsifient l'en-tête `User-Agent` en copiant la signature de Googlebot pour contourner les pare-feu applicatifs (WAF) ou les paywalls. Ne bloquez ou n'autorisez jamais un accès privilégié sur la seule foi de la chaîne textuelle : croisez toujours l'adresse IP source dans notre outil [IP Lookup](/fr/outils/ip-lookup) (validation DNS inverse `PTR` + directe `A`) et définissez une politique claire par agent dans votre fichier généré avec le [générateur robots.txt](/fr/outils/robots-txt-generator).
