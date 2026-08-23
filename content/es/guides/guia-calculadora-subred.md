---
title: "Subnetting: Dividiendo la Red"
description: "Aprenda qué es el subnetting, cómo funciona la notación CIDR, por qué dividimos las redes y use nuestra Calculadora de Subredes."
---

# Subnetting: Dividiendo la Red

Para los principiantes en TI, el "Subnetting" suele ser el tema más confuso. En esta guía, explicaremos el concepto de forma sencilla, por qué lo usamos y cómo aprovechar nuestra [Calculadora de Subredes](/es/calculadoras/calculadora-subred).

---

## 🏢 La Analogía de la Oficina

Imagine una oficina con 1,000 empleados en una sola habitación. Si todos hablan a la vez, el ruido sería ensordecedor. 
En las redes pasa lo mismo. Las computadoras "gritan" mensajes constantemente. Si pone 1,000 PC en la misma red, el tráfico la colapsará.

**¿La solución?** Construir paredes. Dividimos la gran red en departamentos pequeños (RRHH, Ventas, TI). En redes, esto se llama crear **Subredes (Subnets)**. Así, el tráfico de RRHH se queda en RRHH.

---

## 📝 Máscaras de Subred y Notación CIDR

Para decirle a una PC el tamaño de su "habitación", usamos una **Máscara de Subred**.
A menudo verá una IP así: `192.168.1.50 /24`. 
Ese `/24` es la **Notación CIDR**. Significa que los primeros 24 bits son para la Red, dejando 8 bits para las computadoras. Una red `/24` permite exactamente **254 computadoras usables**.
Si solo necesita 14 computadoras, ¡puede usar una máscara `/28`!

---

## ⚙️ Uso de la Calculadora

Las matemáticas de subredes son tediosas. En el mundo real, los profesionales usan calculadoras.
1. **IP:** Ingrese la dirección IP.
2. **Máscara / CIDR:** Elija el tamaño de la red.
3. **Calcule:** ¡La herramienta le dará la Dirección de Red, Broadcast y el rango de IPs usables al instante!
