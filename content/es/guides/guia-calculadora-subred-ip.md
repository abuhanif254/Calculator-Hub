---
title: "Subnetting IP: Rangos de Hosts y Broadcasts"
description: "Profundice en el subnetting IPv4. Aprenda a calcular IDs de red, direcciones de broadcast y rangos de hosts con nuestra Calculadora de Subredes IP."
---

# Subnetting IP: Rangos de Hosts y Broadcasts

Si es un administrador de sistemas, debe entender cómo encontrar la primera y última dirección IP utilizable en cualquier subred. Explicaremos las matemáticas y cómo evitar las tediosas conversiones binarias usando nuestra [Calculadora de Subredes IP](/es/calculadoras/calculadora-subred-ip).

---

## 🌐 Las 4 Partes de una Subred

Cada subred tiene cuatro partes matemáticas críticas:

**1. Dirección de Red:** La primera IP de la subred. Identifica la red. *No se puede asignar a una PC.*
**2. Primer Host Utilizable:** La Dirección de Red + 1.
**3. Último Host Utilizable:** La IP más alta para asignar a una PC.
**4. Dirección de Broadcast (El Megáfono):** La última IP. Si se envía un mensaje aquí, todos en la subred lo reciben. *No se puede asignar.*

---

## 📝 Ejemplo: Una Red /24

Tomemos la red `192.168.1.0 /24` (256 direcciones en total).

* **Red:** `192.168.1.0`
* **Primer Host:** `192.168.1.1` *(Normalmente su router WiFi)*
* **Último Host:** `192.168.1.254`
* **Broadcast:** `192.168.1.255`

Como perdemos la primera y la última, quedan exactamente **254 IPs usables**.

---

## ⚙️ Uso de la Calculadora

Para subredes raras como `/27` o `/22`, no lo calcule a mano.
1. **IP:** Ingrese la dirección IPv4.
2. **Máscara CIDR:** Elija el tamaño (ej. /26).
3. **Calcule:** ¡La herramienta le dará la Dirección de Red, Broadcast y el rango de Hosts Utilizables!
