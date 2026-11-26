---
title: "Subredes IPv4 y Notación CIDR: Cómo Dividir una Red"
description: "Guía técnica sobre subnetting IPv4 y notación CIDR: fórmulas binarias, cálculo paso a paso de subredes, tabla de máscaras de /22 a /30, VLSM y errores frecuentes."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "subnet-calculator"
faqs:
  - question: "¿Qué indica exactamente el número después de la barra en la notación CIDR?"
    answer: "El sufijo CIDR (por ejemplo, /24 o /26) indica cuántos bits consecutivos de los 32 totales de una dirección IPv4 pertenecen al prefijo de red. Los bits restantes (32 menos el prefijo) quedan disponibles para identificar dispositivos o hosts dentro de esa subred."
  - question: "¿Por qué se restan siempre 2 direcciones al calcular los hosts utilizables?"
    answer: "En toda subred IPv4 estándar (/30 o mayor), la primera dirección (todos los bits de host en 0) identifica a la propia red y la última (todos los bits de host en 1) actúa como dirección de difusión o broadcast. Ninguna de las dos puede asignarse a una interfaz de usuario o servidor."
  - question: "¿Cuándo conviene aplicar VLSM en lugar de subredes de tamaño fijo?"
    answer: "La máscara de subred de longitud variable (VLSM) es indispensable cuando los segmentos tienen necesidades muy dispares, como combinar una red de 100 oficinas con un enlace punto a punto entre dos enrutadores. Usar un prefijo único desperdiciaría decenas de direcciones en cada enlace."
  - question: "¿Cuántas direcciones útiles tiene un enlace punto a punto /31 según el estándar RFC 3021?"
    answer: "De forma excepcional, el estándar RFC 3021 permite asignar ambas direcciones de un bloque /31 en enlaces punto a punto dedicados, omitiendo las direcciones de red y broadcast. Esto ofrece 2 hosts utilizables con la mitad de consumo que un bloque /30."
  - question: "¿Cuántas direcciones IP reserva un proveedor en la nube como AWS o Azure dentro de cada subred?"
    answer: "Mientras que en redes locales se reservan 2 direcciones por subred, plataformas como AWS y Azure reservan 5 direcciones (las cuatro primeras y la última) para red, enrutador virtual, DNS interno, uso futuro y broadcast. En un bloque /28 de 16 direcciones solo quedan 11 asignables."
---

La división en subredes (*subnetting*) consiste en particionar una red IPv4 amplia en segmentos lógicos más pequeños para contener el tráfico de difusión, reforzar la seguridad perimetral y optimizar el uso de direcciones IP. Al reemplazar un único dominio masivo por compartimentos dimensionados por departamento, los conmutadores y enrutadores evitan la saturación por paquetes *broadcast* innecesarios.

Para calcular cuántas subredes y equipos caben en un bloque, la notación CIDR (*Classless Inter-Domain Routing*) expresa la máscara como un prefijo `/n` entre `0` y `32`. Por ejemplo, un bloque `/24` destina 24 bits a la red y 8 a los dispositivos, generando 256 direcciones totales y 254 utilizables, mientras que nuestra [Calculadora de Subredes](/es/calculadoras/calculadora-de-subredes) automatiza estas particiones al instante.

## Fundamentos matemáticos y notación CIDR

Una dirección IPv4 tiene 32 bits agrupados en cuatro octetos de 8 bits (valores decimales de `0` a `255`). La máscara de subred actúa como una plantilla binaria con unos consecutivos a la izquierda (red) y ceros a la derecha (*host*).

Las ecuaciones esenciales del diseño de subredes son:

```text
Bits de host (h)       = 32 − n
Direcciones totales    = 2^(32 − n)
Hosts utilizables      = 2^(32 − n) − 2    (para n ≤ 30)
Subredes creadas       = 2^k               (k = bits prestados al host)
Salto de bloque (Δ)    = 256 − valor_octeto_máscara
```

Cada parámetro cumple una función concreta:

- **`n` (prefijo CIDR):** Bits fijos que identifican la red. A mayor `n`, menor tamaño de subred.
- **`k` (bits prestados):** Bits tomados del campo de *host* para subdividir la red; cada bit adicional duplica el número de subredes.
- **`Salto de bloque (Δ)`:** Incremento en el octeto donde la máscara cambia de `1` a `0`, que marca los límites exactos de cada subred sin convertir toda la dirección a binario.

## Ejemplo práctico paso a paso: particionar una red `/24`

Suponga que una empresa recibe el bloque `192.168.10.0/24` y necesita **4 subredes iguales** para Administración, Ingeniería, Ventas y Servidores, con al menos **50 dispositivos** por área.

1. **Calcular bits prestados (`k`):** Debe cumplirse `2^k ≥ 4`. Como `2^2 = 4`, se toman prestados `k = 2` bits.
2. **Obtener el nuevo prefijo y la máscara:** Sumando al prefijo original resulta `/24 + 2 = /26`. El cuarto octeto binario es `11000000` (`128 + 64 = 192`), por lo que la máscara es `255.255.255.192`.
3. **Verificar capacidad de hosts:** Quedan `h = 32 − 26 = 6` bits de *host*. Cada subred ofrece `2^6 = 64` direcciones totales y `64 − 2 = 62` utilizables, cubriendo los 50 equipos con 12 direcciones de reserva.
4. **Enumerar las subredes con `Δ = 256 − 192 = 64`:**
   - **Administración:** Red `192.168.10.0/26` | Hosts `.1`–`.62` | Broadcast `.63`
   - **Ingeniería:** Red `192.168.10.64/26` | Hosts `.65`–`.126` | Broadcast `.127`
   - **Ventas:** Red `192.168.10.128/26` | Hosts `.129`–`.190` | Broadcast `.191`
   - **Servidores:** Red `192.168.10.192/26` | Hosts `.193`–`.254` | Broadcast `.255`

## Tabla de referencia rápida de prefijos CIDR (`/22` a `/30`)

La siguiente tabla resume las máscaras IPv4 más frecuentes en redes empresariales y enlaces WAN:

| Prefijo CIDR | Máscara Decimal | Bits de Host | Direcciones Totales | Hosts Utilizables | Escenario Habitual |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `/22` | `255.255.252.0` | 10 | 1,024 | 1,022 | Campus o redes inalámbricas de alta densidad |
| `/24` | `255.255.255.0` | 8 | 256 | 254 | Red estándar de oficina o VLAN principal |
| `/25` | `255.255.255.128` | 7 | 128 | 126 | División de un `/24` en dos bloques medianos |
| `/26` | `255.255.255.192` | 6 | 64 | 62 | Departamentos medianos o salas de trabajo |
| `/27` | `255.255.255.224` | 5 | 32 | 30 | Grupos pequeños, impresoras o telefonía IP |
| `/28` | `255.255.255.240` | 4 | 16 | 14 | Zonas desmilitarizadas (DMZ) o servidores |
| `/30` | `255.255.255.252` | 2 | 4 | 2 | Enlaces punto a punto entre dos enrutadores |

## Subredes de longitud variable (VLSM) y casos de uso

En la práctica, los departamentos rara vez requieren idéntica capacidad. Asignar un `/26` (64 direcciones) a un enlace punto a punto entre enrutadores desperdicia 62 direcciones. La técnica **VLSM** (*Variable Length Subnet Masking*) divide un bloque mayor en subredes de distinto tamaño ajustadas a cada necesidad.

La regla operativa de VLSM consiste en **asignar primero las subredes más grandes y avanzar en orden descendente** hacia los enlaces menores, asegurando alineación binaria exacta y evitando solapamientos en las tablas de enrutamiento.

### Aplicaciones principales en arquitectura de redes

- **Segmentación por VLAN y seguridad:** Aislar dispositivos IoT, invitados y servidores críticos en subredes separadas permite aplicar políticas restrictivas en el cortafuegos y contener movimientos laterales.
- **Arquitectura en la nube:** Al desplegar redes virtuales en AWS, Google Cloud o Azure, se suele partir de un bloque `/16` privado (RFC 1918, como `10.0.0.0/16`) subdividido en subredes `/24` repartidas entre zonas de disponibilidad.
- **Sumarización de rutas:** Agrupar cuatro bloques contiguos `/24` (`10.1.0.0` a `10.1.3.0`) en un único anuncio `/22` reduce el tamaño de las tablas BGP y OSPF.

## Errores frecuentes y advertencias operativas

- **Solapamiento de bloques:** Declarar `192.168.10.32/26` como dirección de red es inválido porque el salto de `/26` es 64 y `.32` pertenece al rango `.0`–`.63`. Toda dirección de red debe ser múltiplo exacto del salto de bloque.
- **Omitir reservas de infraestructura:** Además de computadoras, hay que contemplar puerta de enlace, conmutadores, puntos de acceso Wi-Fi, servidores DNS y un margen de crecimiento cercano al 20 %.
- **Ignorar reservas en la nube:** En proveedores públicos como AWS o Azure se reservan 5 direcciones por subred; un bloque `/29` (8 direcciones) solo deja **3 asignables**.
- **Planificación hacia IPv6:** Dado el agotamiento de IPv4 público bajo IANA, conviene diseñar redes en doble pila (*dual-stack*), donde cada subred IPv6 estándar adopta el prefijo `/64`.
