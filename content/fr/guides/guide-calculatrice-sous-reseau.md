---
title: "Subnetting : Diviser le Réseau"
description: "Découvrez ce qu'est le subnetting, comment fonctionne la notation CIDR, pourquoi on divise les réseaux, et utilisez notre Calculatrice de Sous-réseau."
---

# Subnetting : Diviser le Réseau

Pour les débutants en informatique, le "Subnetting" (découpage en sous-réseaux) est souvent le sujet le plus complexe. Ce guide explique le concept simplement, pourquoi on l'utilise, et comment vous servir de notre [Calculatrice de Sous-réseau](/fr/calculatrices/calculatrice-sous-reseau).

---

## 🏢 L'Analogie de l'Open Space

Imaginez 1 000 employés dans une seule pièce. S'ils parlent tous en même temps, le bruit sera assourdissant.
C'est pareil pour les réseaux. Les ordinateurs "crient" des messages réseau en permanence. 1 000 PC sur un même réseau satureraient le trafic.

**La solution ?** Monter des murs. On divise la grande pièce en petits départements isolés. En informatique, on divise une grande plage d'IP en **Sous-réseaux (Subnets)**. Ainsi, les PC des RH ne parlent qu'aux RH.

---

## 📝 Masques de Sous-réseau et Notation CIDR

Pour indiquer à un ordinateur la taille de son sous-réseau, on utilise un **Masque de sous-réseau**.
Une IP s'écrit souvent ainsi : `192.168.1.50 /24`.
Le `/24` est la **Notation CIDR**. Il signifie qu'un réseau `/24` peut contenir **254 ordinateurs utilisables**. Si vous n'avez besoin que de 14 PC, vous utiliserez un `/28` !

---

## ⚙️ Utilisation de la Calculatrice

Les calculs de sous-réseaux (en binaire) sont fastidieux. Les pros utilisent des calculatrices.
1. **IP :** Entrez l'adresse.
2. **Masque / CIDR :** Choisissez la taille du réseau.
3. **Calculez :** Obtenez instantanément l'adresse Réseau, de Broadcast et la plage d'IP utilisables !
