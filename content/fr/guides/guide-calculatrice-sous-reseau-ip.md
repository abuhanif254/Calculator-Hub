---
title: "Subnetting IP : Plages d'Hôtes et Broadcast"
description: "Allez plus loin dans le subnetting IPv4. Apprenez à calculer les ID réseau, adresses de broadcast et plages d'hôtes avec notre Calculatrice de Sous-réseau IP."
---

# Subnetting IP : Plages d'Hôtes et Broadcast

Si vous êtes administrateur réseau, vous devez savoir trouver la première et la dernière IP utilisable d'un sous-réseau. Simplifiez-vous la vie avec notre [Calculatrice de Sous-réseau IP](/fr/calculatrices/calculatrice-sous-reseau-ip).

---

## 🌐 Les 4 Parties d'un Sous-réseau

Chaque sous-réseau comporte quatre éléments critiques :

**1. L'Adresse Réseau :** La toute première IP. Identifie le réseau. *Inutilisable pour un PC.*
**2. Le Premier Hôte :** Adresse Réseau + 1.
**3. Le Dernier Hôte :** La plus haute IP assignable.
**4. L'Adresse de Broadcast (Diffusion) :** La toute dernière IP. Un message envoyé ici est reçu par tous les PC du sous-réseau. *Inutilisable.*

---

## 📝 Exemple : Un réseau /24

Prenons `192.168.1.0 /24` (256 adresses).

* **Réseau :** `192.168.1.0`
* **Premier Hôte :** `192.168.1.1` *(Souvent votre routeur)*
* **Dernier Hôte :** `192.168.1.254`
* **Broadcast :** `192.168.1.255`

En perdant la première et la dernière, il reste **254 IP utilisables**.

---

## ⚙️ Utilisation de la Calculatrice

Pour des masques compliqués comme `/27` ou `/22`, ne calculez pas en binaire à la main.
1. **IP :** Entrez l'adresse IPv4.
2. **Masque CIDR :** Choisissez la taille.
3. **Calculez :** L'outil vous donne instantanément le Réseau, le Broadcast et la Plage d'Hôtes !
