---
title: "Subredes IP: Cálculo de Rangos de Hosts y Direcciones de Difusión"
description: "Guía técnica para calcular la dirección de red, el rango de hosts utilizables, el broadcast y la máscara wildcard en IPv4 mediante operaciones binarias AND y OR."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ip-subnet-calculator"
faqs:
  - question: "¿Por qué una dirección que termina en .0 o .255 puede ser un host válido en ciertas redes?"
    answer: "En máscaras más amplias que /24, como un prefijo /22 o /23, el tercer octeto forma parte del espacio de hosts. Por ejemplo, dentro de la red 10.24.128.0/22, las direcciones 10.24.128.255 y 10.24.129.0 no son ni broadcast ni red, sino direcciones intermedias plenamente asignables a equipos."
  - question: "¿Cuál es la diferencia entre una máscara de subred y una máscara wildcard?"
    answer: "La máscara de subred usa bits en 1 para identificar la porción fija de red y bits en 0 para los hosts. La máscara wildcard es exactamente su complemento binario (255.255.255.255 menos la máscara de subred) y se emplea en listas de acceso (ACL) y protocolos como OSPF para indicar qué bits deben coincidir o ignorarse."
  - question: "¿Cómo identifico rápidamente si dos direcciones IP pertenecen a la misma subred?"
    answer: "Aplique la operación lógica AND entre cada dirección IP y la máscara de subred compartida. Si el identificador de red resultante es idéntico en ambos casos, ambos dispositivos se encuentran en el mismo dominio de difusión y se comunicarán directamente sin enrutador intermedio."
  - question: "¿Qué ocurre si asigno por error la dirección de broadcast a un servidor o computadora?"
    answer: "Los sistemas operativos modernos y las pilas TCP/IP rechazan la configuración al detectar el conflicto con la máscara declarada. Si un equipo antiguo llegara a aceptarla, perdería conectividad unidireccional o provocaría tormentas de respuestas y fallos de resolución ARP en todo el segmento."
  - question: "¿Para qué sirve el prefijo /32 en las tablas de enrutamiento y cortafuegos?"
    answer: "Una máscara /32 (255.255.255.255) fija los 32 bits completos de la dirección IPv4 y representa un único dispositivo específico (ruta de host). Se utiliza habitualmente en interfaces loopback de enrutadores, reglas estrictas de cortafuegos y túneles VPN."
---

Dada cualquier dirección IPv4 y su prefijo CIDR (como `172.16.45.200/27`), todo administrador de redes debe determinar cuatro valores exactos: la **dirección de red**, el **primer host utilizable**, el **último host utilizable** y la **dirección de difusión o *broadcast***. Las dos direcciones extremas quedan reservadas por protocolo y no pueden asignarse a interfaces convencionales.

A diferencia de las redes `/24` habituales que terminan en `.0` y `.255`, los prefijos como `/27`, `/26` o `/22` sitúan estos límites en múltiplos binarios internos o cruzan entre el tercer y cuarto octeto. Nuestra [Calculadora de Subredes IP](/es/calculadoras/calculadora-de-subred-ip) realiza estas operaciones bit a bit al instante.

## Álgebra binaria y anatomía de los rangos IPv4

Los enrutadores procesan direcciones de 32 bits mediante puertas lógicas **AND** y **OR**. A partir de una IP y su máscara de subred, las cinco relaciones fundamentales son:

```text
Dirección de Red        = IP AND Máscara_de_Subred
Máscara Wildcard        = 255.255.255.255 − Máscara_de_Subred
Dirección de Broadcast  = Dirección_de_Red OR Máscara_Wildcard
Primer Host Utilizable  = Dirección_de_Red + 1
Último Host Utilizable  = Dirección_de_Broadcast − 1
```

Cada componente define un límite estricto del segmento:

- **Dirección de Red:** Todos los bits de *host* valen `0`; identifica la subred en las tablas de enrutamiento.
- **Máscara *Wildcard*:** Es la inversión exacta de la máscara de subred; cada `1` señala un bit variable dentro del rango de *hosts*.
- **Dirección de Broadcast:** Todos los bits de *host* valen `1`; alcanza a todos los nodos locales (su reenvío entre redes está desactivado por defecto desde RFC 2644).
- **Rango de Hosts:** Incluye todas las direcciones enteras entre la red y el *broadcast*, sumando `(Broadcast − Red) − 1` direcciones operativas.

## Ejemplo resuelto paso a paso: `172.16.45.200/27`

Suponga que debe delimitar el segmento completo al que pertenece el servidor `172.16.45.200` con máscara `/27` (`255.255.255.224`).

1. **Identificar el octeto crítico:** Los primeros 24 bits (`172.16.45`) tienen máscara `255.255.255` y permanecen fijos. El cálculo se realiza en el cuarto octeto: IP `200` y máscara `224`.
2. **Aplicar AND binario para hallar la Dirección de Red:**
   - `200` = `11001000` (`128 + 64 + 8`)
   - `224` = `11100000` (`128 + 64 + 32`)
   - `11001000 AND 11100000` = `11000000` = `192`
   - **Dirección de Red:** `172.16.45.192`
3. **Calcular la máscara *wildcard*:**
   - `255.255.255.255 − 255.255.255.224 = 0.0.0.31` (`00011111` en binario).
4. **Aplicar OR para obtener el Broadcast:**
   - `192 OR 31` (`11000000 OR 00011111`) = `11011111` = `223`.
   - **Dirección de Broadcast:** `172.16.45.223`
5. **Obtener rango utilizable y comprobar capacidad:**
   - **Primer Host:** `172.16.45.193` | **Último Host:** `172.16.45.222`
   - **Comprobación:** `222 − 193 + 1 = 30` hosts, igual a `2^(32 − 27) − 2 = 30`.

## Tabla comparativa de rangos IPv4 en distintos prefijos

La matriz siguiente muestra seis ejemplos completos de red, rango utilizable, *broadcast* y máscara *wildcard*:

| IP / Prefijo | Dirección de Red | Rango de Hosts Utilizables | Dirección Broadcast | Máscara Wildcard | Hosts |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `192.168.1.50/24` | `192.168.1.0` | `192.168.1.1` – `192.168.1.254` | `192.168.1.255` | `0.0.0.255` | 254 |
| `172.16.45.200/27` | `172.16.45.192` | `172.16.45.193` – `172.16.45.222` | `172.16.45.223` | `0.0.0.31` | 30 |
| `10.10.5.130/25` | `10.10.5.128` | `10.10.5.129` – `10.10.5.254` | `10.10.5.255` | `0.0.0.127` | 126 |
| `10.24.130.75/22` | `10.24.128.0` | `10.24.128.1` – `10.24.131.254` | `10.24.131.255` | `0.0.3.255` | 1,022 |
| `192.168.50.14/28` | `192.168.50.0` | `192.168.50.1` – `192.168.50.14` | `192.168.50.15` | `0.0.0.15` | 14 |
| `172.31.0.5/30` | `172.31.0.4` | `172.31.0.5` – `172.31.0.6` | `172.31.0.7` | `0.0.0.3` | 2 |

En el caso `10.24.130.75/22`, la máscara es `255.255.252.0` y el salto en el tercer octeto es `256 − 252 = 4`. Como `130` cae entre `128` y `131`, la red inicia en `10.24.128.0` y termina en `10.24.131.255`.

## Aplicaciones operativas en administración de sistemas

El cálculo exacto de los límites de subred resulta indispensable en las tareas diarias de operación, seguridad y diagnóstico de redes empresariales:

- **Servidores DHCP:** El rango de concesión debe definirse estrictamente dentro de los *hosts* utilizables, excluyendo la dirección estática de la puerta de enlace (usualmente `.1` o `.254` en `/24`) y las direcciones reservadas para impresoras o servidores para evitar colisiones de IP.
- **Cortafuegos y listas ACL:** Equipos como Cisco IOS exigen declarar la dirección de red seguida de la máscara *wildcard* (`permit 172.16.45.192 0.0.0.31`), mientras que `iptables` o los grupos de seguridad en la nube emplean notación CIDR directa (`172.16.45.192/27`).
- **Diagnóstico de máscara errónea:** Si un equipo usa `/24` dentro de una subred `/25`, enviará peticiones ARP directas hacia la otra mitad del bloque en vez de consultar al enrutador, causando cortes intermitentes de difícil detección.
- **Análisis de incidentes:** Asociar una IP registrada en bitácoras con su prefijo permite confirmar de inmediato si el origen pertenece a la red de invitados, a estaciones de trabajo o a producción.

## Errores habituales y precisiones técnicas

- **Creer que `.0` y `.255` son siempre inválidos:** En el bloque `/22` de la tabla anterior, `10.24.128.255` y `10.24.129.0` son direcciones de *host* perfectamente válidas porque no coinciden con los extremos del bloque completo.
- **Confundir direccionamiento privado y público:** Los rangos RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) aplican idénticas reglas binarias de red y *broadcast*, pero no son enrutables en Internet y exigen NAT perimetral.
- **Reservas adicionales en la nube y hardware legado:** Aunque los enrutadores modernos admiten la primera y última subred (`ip subnet-zero`, RFC 1878), plataformas como AWS o Azure reservan 5 direcciones por subred en lugar de 2, reduciendo aún más el rango asignable.
- **Seguridad ante amplificación:** Mantenga deshabilitado el reenvío de *broadcast* dirigido en interfaces perimetrales para bloquear ataques de amplificación ICMP (*Smurf*).
