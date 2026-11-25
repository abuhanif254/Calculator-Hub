---
metaTitle: "Compresser PDF en Ligne | Réduire la Taille Sans Perte"
metaDescription: "Réduisez la taille de vos PDF par nettoyage structurel sans perte ou sous-échantillonnage DPI. Routage hybride local jusqu'à 15 Mo et aperçu direct."
metaKeywords: "compresser pdf, réduire taille pdf, diminuer poids pdf, optimiser pdf, compresseur pdf gratuit, alléger pdf, réduire mo pdf, compression pdf sans perte, dpi pdf"
title: "Compresser PDF"
shortDescription: "Réduisez le poids de vos fichiers PDF tout en préservant une netteté optimale grâce à une double compression sans perte ou DPI et un routage hybride sécurisé."
faqs:
  - question: "Quelle est la différence entre le mode structurel sans perte et le sous-échantillonnage d'images avec perte ?"
    answer: "Le mode structurel sans perte reconstruit l'arbre d'objets PDF, élimine les métadonnées superflues ainsi que les objets orphelins et compresse les dictionnaires en flux d'objets tout en conservant 100 % du texte vectoriel sélectionnable. Le mode avec perte rastérise chaque page à la résolution DPI et à la qualité JPEG choisies, divisant drastiquement le poids des scans au prix de la conversion du texte en image."
  - question: "Comment le routage hybride client-serveur détermine-t-il où mon PDF est traité ?"
    answer: "Les documents jusqu'à 15 Mo sont compressés intégralement dans le bac à sable mémoire de votre navigateur sans aucun transfert réseau. Au-delà de 15 Mo et jusqu'à 150 Mo, le fichier bascule automatiquement vers une route serveur sans état afin d'éviter le plantage mémoire de l'onglet tout en renvoyant immédiatement le PDF optimisé sans stockage sur disque."
  - question: "Le préréglage Haute compression rend-il le texte de mon PDF non recherchable ?"
    answer: "Oui. Le préréglage Haute compression active la rastérisation à 96 DPI et 50 % de qualité JPEG, ce qui aplatit les pages en images matricielles compressées. Privilégiez les préréglages Basse ou Moyenne compression dès que vous devez préserver le texte sélectionnable, les tracés vectoriels CAO ou les hyperliens cliquables."
  - question: "Pourquoi un PDF déjà léger ne perd-il que quelques kilo-octets en mode structurel ?"
    answer: "Si le document exploite déjà des flux d'objets PDF 1.5+, des sous-ensembles de polices minimalistes et des images JPEG compressées sans historique d'enregistrements incrémentaux, le nettoyage structurel sans perte dispose de très peu de redondance à purger. Basculer vers un sous-échantillonnage DPI personnalisé offre alors un gain nettement supérieur sur les pages numérisées."
  - question: "Puis-je vérifier la netteté des images avant de compresser un lot complet de fichiers ?"
    answer: "Oui. Un clic sur n'importe quel fichier en file d'attente affiche un aperçu interactif avant/après de la première page qui se met à jour en direct selon la résolution DPI et la qualité JPEG sélectionnées, afin de valider la lisibilité avant l'export du lot."
features:
  - "Double moteur associant nettoyage structurel sans perte des objets PDF et sous-échantillonnage matriciel DPI/JPEG configurable"
  - "Routage hybride intelligent : exécution 100 % locale dans le navigateur jusqu'à 15 Mo et bascule serveur sans état jusqu'à 150 Mo"
  - "Curseur visuel interactif avant/après sur la page 1 recalculé dynamiquement selon vos réglages de résolution DPI et de qualité JPEG"
  - "Trois préréglages calibrés (Basse, Moyenne, Haute) plus un mode Personnalisé réglable en 72, 96, 150 ou 200 DPI et 10 % à 100 % de qualité"
  - "Traitement par lots multi-fichiers affichant le gain exact par document et regroupant automatiquement les exports dans une archive ZIP DEFLATE"
  - "Suppression des métadonnées /Info, consolidation en flux d'objets FlateDecode PDF 1.5+ et historique local de compression"
useCases:
  - "Ramener des contrats numérisés multi-pages ou liasses fiscales de 40 Mo sous le seuil de 10 Mo imposé par les messageries professionnelles"
  - "Alléger mémoires universitaires, dossiers de subvention et appels d'offres pour respecter les quotas stricts des portails administratifs"
  - "Purger l'historique d'éditions incrémentales et les métadonnées logicielles privées de plaquettes commerciales avant mise en ligne"
  - "Sous-échantillonner des justificatifs comptables scannés à 300–600 DPI vers des archives lisibles de 150 DPI beaucoup plus compactes"
  - "Optimiser par lots des fiches techniques produits et manuels utilisateurs avant déploiement sur un CDN afin d'accélérer le téléchargement"
  - "Réduire le poids de portfolios graphiques ou architecturaux pour une consultation fluide sur tablette et réseau mobile"
howToSteps:
  - "Déposez un ou plusieurs fichiers PDF (jusqu'à 150 Mo chacun) dans la zone de chargement pour afficher le nombre de pages et la taille initiale."
  - "Choisissez un préréglage : Basse ou Moyenne pour préserver le texte vectoriel sans perte, ou Haute / Personnalisé pour compresser des scans en DPI."
  - "Faites glisser le curseur comparatif de la page 1 pour contrôler la précision visuelle selon votre résolution DPI et votre taux de qualité JPEG."
  - "Cliquez sur Compresser PDF pour lancer le traitement local dans votre navigateur (≤ 15 Mo) ou le routage hybride serveur (> 15 Mo)."
  - "Vérifiez le pourcentage de réduction obtenu pour chaque fichier puis téléchargez le PDF optimisé ou l'archive ZIP complète."
---

Les PDF trop volumineux dépassent vite les plafonds des messageries, échouent sur les portails administratifs et freinent la consultation mobile. Réduire efficacement un PDF exige de cibler la cause réelle de son poids et de choisir un algorithme adapté à sa structure. **Compresser PDF** réunit un optimiseur de graphe d'objets conforme **ISO 32000** et un moteur de sous-échantillonnage matriciel DPI, soutenus par un routage hybride client-serveur et un comparateur visuel en direct.

## Pourquoi un PDF grossit : révisions incrémentales et densité matricielle

Deux PDF de dix pages identiques à l'écran peuvent varier d'un facteur vingt selon leur chaîne de production. Quatre mécanismes internes créent l'essentiel du surpoids :

- **Mises à jour incrémentales (`xref`)** : De nombreux éditeurs ajoutent des objets différentiels suivis d'une nouvelle table `xref` et d'un marqueur `%%EOF` à chaque signature ou suppression de page. Les anciennes images restent enfouies dans le binaire.
- **Bitmaps sur-échantillonnés** : Les scanners enregistrent souvent les pages à 300–600 DPI en `FlateDecode` sans perte ou en JPEG (`DCTDecode`) peu quantifié. Une feuille A4 couleur à 300 DPI représente `2 480 × 3 508` pixels, soit 8,7 millions de pixels par page.
- **Ressources orphelines et dupliquées** : Fusionner des documents laisse des sous-ensembles de polices redondants, des profils ICC inutilisés, des blocs privés (`PieceInfo`) et des paquets XML XMP verbeux.
- **Tables `xref` non compressées** : Les exports PDF 1.4 écrivent des objets indirects en texte ASCII au lieu des flux compressés en zlib (**Object Streams `ObjStm`**) de PDF 1.5+.

## Optimisation structurelle sans perte vs sous-échantillonnage avec perte

Rastériser une facture vectorielle détruit le texte sélectionnable, alors qu'un nettoyage structurel seul agit peu sur un scan 600 DPI. Le tableau ci-dessous résume chaque moteur :

| Préréglage | Architecture du moteur | Résolution et qualité | Texte vectoriel | Gain typique | Document cible |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Basse (Sans perte)** | Reconstruction catalogue + `ObjStm` | Native (sans rastérisation) | 100 % intact | 5 % – 25 % | Actes juridiques, plans CAO, factures |
| **Moyenne** | Reconstruction + purge `/Info` + `ObjStm` | Native (sans rastérisation) | 100 % intact | 10 % – 35 % | Rapports révisés, supports bureautiques |
| **Haute (Maximale)** | Rendu canvas PDF.js + JPEG | 96 DPI / 50 % JPEG | Rastérisé | 60 % – 85 % | Scans à plat, reçus, dossiers photo |
| **Personnalisé** | Échelle DPI et quantification DCT | 72–200 DPI / 10 %–100 % | Rastérisé | 40 % – 90 % | Scans lisibles réglés à 150 DPI |

En **mode structurel**, le moteur crée un `PDFDocument` vierge, recopie uniquement les pages atteignables (éliminant objets orphelins et anciennes révisions), efface les champs `/Info` (`Title`, `Author`, `Creator`, `Producer`) et active les flux `FlateDecode` (`useObjectStreams: true`). Glyphes, liens et vecteurs restent mathématiquement exacts.

### Calcul d'échelle DPI dans l'espace PDF (72 pt/po)

En **mode avec perte**, la résolution choisie détermine le facteur d'échelle rapporté à l'unité PostScript/PDF de **72 points par pouce** :

```text
facteurEchelle = targetDPI / 72

Page A4 = 595 pt × 842 pt (210 mm × 297 mm)
  @  72 DPI (x1,00) :   595 ×  842 px  (brouillon écran minimal)
  @  96 DPI (x1,33) :   794 × 1123 px  (lecture web, mode Haute)
  @ 150 DPI (x2,08) :  1240 × 1754 px  (scans nets petits caractères)
  @ 200 DPI (x2,78) :  1654 × 2339 px  (archivage haute netteté)
```

Chaque canvas est encodé en JPEG DCT (`image/jpeg`) puis replacé sur une page conservant exactement sa géométrie `[largeur, hauteur]` en points afin de préserver les dimensions d'impression.

### Polices incorporées, espaces colorimétriques et signatures PAdES

Lors d'une compression, trois subtilités conditionnent la conformité réglementaire. D'abord, les polices TrueType ou OpenType intégrées en totalité peuvent peser plusieurs mégaoctets par langue ; privilégiez l'incorporation partielle (*subsetting*) dès l'export depuis votre logiciel de PAO. Ensuite, les brochures conçues pour l'imprimerie contiennent souvent des images CMJN sur quatre canaux ainsi que de lourds profils ICC : le rendu matriciel web les convertit automatiquement en RVB sur trois canaux, ce qui réduit sensiblement le volume binaire. Enfin, ne recompressez jamais un contrat déjà muni d'une **signature électronique cryptographique PAdES** : toute réécriture de l'arbre d'objets ou des tables `xref` modifie l'empreinte binaire signée et invalide le certificat. Compressez toujours le document *avant* d'y apposer la signature finale.

## Routage hybride client-serveur à seuil de 15 Mo

Les moteurs purement locaux protègent la confidentialité mais butent sur les plafonds mémoire JavaScript : réécrire un classeur scanné de 90 Mo sur mobile fait souvent planter l'onglet. Notre **seuil déterministe de 15 Mo** résout cette limite :

- **Fichiers ≤ 15 Mo (100 % local)** : Exécution intégrale en RAM dans le navigateur via `pdf-lib` et `PDF.js`, zéro envoi réseau, aperçu avant/après interactif page 1 et réglages DPI/JPEG complets.
- **Fichiers > 15 Mo jusqu'à 150 Mo (serveur sans état)** : Envoi `multipart/form-data` vers une route haute mémoire qui reconstruit l'arbre d'objets, purge orphelins et métadonnées puis renvoie le flux `useObjectStreams` en mémoire vive, sans aucune écriture sur disque.

## Diagnostiquer un PDF résistant et vérifier le rendu

Avant de compresser un dossier récalcitrant, l'utilitaire Poppler `pdfimages` révèle la densité des images embarquées :

```bash
# Lister dimensions, encodage et résolution PPI de chaque image intégrée
pdfimages -list rapport-annuel.pdf
```

Si `x-ppi` et `y-ppi` dépassent `300` ou si des photos utilisent `flate`/`raw`, un réglage personnalisé à **150 DPI et 70 %** réduit souvent le poids de plus de 70 % tout en gardant le texte lisible. Pour restaurer la recherche plein texte après une compression avec perte, passez le fichier dans [OCR PDF](/fr/outils/pdf-ocr). Face à des annotations transparentes lourdes ou des champs sensibles, combinez [Aplatir un PDF](/fr/outils/flatten-pdf), l'[éditeur de métadonnées PDF](/fr/outils/pdf-metadata-editor) ou [Compresser une image](/fr/outils/compress-image) sur vos visuels sources.

## Export par lots et contrôle qualité

En traitement multi-fichiers, chaque carte indique le gain exact en octets et l'outil génère automatiquement une archive `.zip` DEFLATE (`level: 5`). Avant tout dépôt officiel, ouvrez le PDF à 100 % de zoom pour vérifier notes de bas de page, codes-barres et sélection du texte en mode structurel.
