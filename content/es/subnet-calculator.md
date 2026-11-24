---
title: "Calculadora de Subredes"
metaTitle: "Calculadora de Subredes IPv4 | Máscara CIDR y Rango IP"
description: "Calcula direcciones de red, máscaras de subred, direcciones de difusión y rangos de dispositivos utilizables en IPv4 a partir de cualquier dirección IP y prefijo CIDR."
metaDescription: "Calcula subredes IPv4 con precisión: obtén dirección de red, máscara CIDR, difusión y rango de hosts utilizables al instante para tus redes."
metaKeywords: "calculadora de subredes, calculadora ip, calculadora cidr, máscara de subred, dirección de red, dirección de difusión, rango de ip, subredes ipv4"
faqs:
  - question: "¿Qué indica el prefijo CIDR como /24 o /26 al final de una dirección IPv4?"
    answer: "El número situado tras la barra señala cuántos bits iniciales consecutivos, sobre un total de 32 bits, identifican la porción de red. Un prefijo /24 fija 24 bits de red (máscara 255.255.255.0) y deja 8 bits para dispositivos (256 direcciones totales y 254 útiles), mientras que un /26 fija 26 bits (255.255.255.192) y ofrece 64 direcciones totales con 62 utilizables."
  - question: "¿Por qué se restan dos direcciones IP al calcular los dispositivos utilizables de una subred?"
    answer: "En cualquier subred IPv4 estándar entre /0 y /30 existen dos direcciones reservadas por el protocolo: la primera, con todos los bits de host en cero, identifica a la red completa en las tablas de enrutamiento; la última, con todos los bits en uno, actúa como dirección de difusión local para entregar paquetes a todos los nodos simultáneamente."
  - question: "¿Cómo funcionan los prefijos especiales /31 y /32 en el enrutamiento IPv4?"
    answer: "El estándar RFC 3021 habilita los bloques /31 exclusivamente para enlaces punto a punto entre dos enrutadores, aprovechando las dos direcciones disponibles sin reservar red ni difusión. Por su parte, un prefijo /32 designa una única dirección de host específica y se emplea habitualmente en interfaces locales de retorno, listas de control de acceso y rutas estáticas."
  - question: "¿Cómo se obtiene manualmente la dirección de red a partir de una IP y su máscara?"
    answer: "Deben expresarse tanto la dirección IPv4 como la máscara de subred en binario de 32 bits (cuatro octetos de 8 bits) y ejecutar una operación lógica Y (AND) bit por bit. Cada posición resultante vale 1 únicamente cuando ambos bits originales son 1; al convertir los cuatro octetos resultantes a decimal se obtiene la dirección exacta de red."
  - question: "¿Qué ventaja aporta el direccionamiento sin clase (CIDR) frente a las antiguas clases A, B y C?"
    answer: "El esquema clásico obligaba a asignar bloques rígidos de 254, 65.534 o más de 16 millones de direcciones, provocando un enorme desperdicio del espacio IPv4. El enrutamiento sin clase CIDR y las máscaras de longitud variable permiten fraccionar redes a la medida real de cada departamento, sede o segmento de servidores."
---

La división en subredes constituye el cimiento técnico del diseño de redes corporativas, entornos en la nube y telecomunicaciones. En **IPv4**, cada dirección dispone de 32 bits (unos 4.294 millones de combinaciones globales). Mantener cientos de equipos en una sola red plana provoca tormentas de difusión, dificulta aislar fallos y expone servidores críticos al movimiento lateral de amenazas.

Esta **Calculadora de Subredes** toma cualquier dirección IPv4 válida y un prefijo **CIDR** (`/0` a `/32`) para calcular al instante la **dirección de red**, la **máscara decimal punteada**, la **dirección de difusión** (*broadcast*), el **rango utilizable** (primera y última IP asignable), la capacidad total y útil del bloque y la clase histórica del direccionamiento (A–E).

## Ecuaciones Binarias del Cálculo de Subredes IPv4

Toda dirección IPv4 de cuatro octetos ($o_1.o_2.o_3.o_4$, cada uno entre 0 y 255) representa un entero sin signo de 32 bits dividido en dos zonas contiguas: los primeros $p$ bits identifican la red y los $32 - p$ bits restantes direccionan a los equipos finales.

### 1. Entero de 32 Bits, Dirección de Red y Difusión

Dado un prefijo CIDR $p \in [0, 32]$, la dirección entera ($IP_{32}$), la máscara ($M$), la red ($R$) y la difusión ($B$) se obtienen mediante lógica binaria:

$$IP_{32} = o_1 \cdot 2^{24} + o_2 \cdot 2^{16} + o_3 \cdot 2^{8} + o_4$$

$$M = (2^{32} - 1) - (2^{32 - p} - 1), \qquad R = IP_{32} \land M, \qquad B = R \lor (\neg M)$$

Cada variable cumple un papel preciso:

* **$o_1, o_2, o_3, o_4$:** los cuatro octetos decimales de 8 bits que componen la dirección IPv4.
* **$p$ (Prefijo CIDR):** cantidad de bits consecutivos en `1` desde la izquierda de la máscara.
* **$M$ y $\neg M$:** la máscara de subred de 32 bits y su complemento o máscara comodín (usada en cortafuegos y OSPF).
* **$R$ (Dirección de red):** piso del bloque, calculado mediante conjunción bit a bit ($\land$) entre $IP_{32}$ y $M$.
* **$B$ (Dirección de difusión):** techo del bloque, obtenido mediante disyunción ($\lor$) entre $R$ y $\neg M$.

### 2. Capacidad, Rango Útil y Salto de Bloque

El total de direcciones ($N_{\text{total}}$), los equipos asignables ($N_{\text{útil}}$) y el salto ($\Delta$) en el octeto activo responden a:

$$N_{\text{total}} = 2^{32 - p}, \qquad N_{\text{útil}} = 2^{32 - p} - 2 \quad (p \le 30), \qquad \Delta = 256 - m_k$$

$$\text{Primera IP útil} = R + 1, \qquad \text{Última IP útil} = B - 1$$

Aquí $m_k$ es el valor decimal de la máscara en el octeto distinto de `255` y `0`. Además, existen dos excepciones estandarizadas: en `/31` (RFC 3021 para enlaces punto a punto entre enrutadores) son útiles las $2$ direcciones sin difusión, y en `/32` resulta $1$ dirección única para rutas de host o interfaces locales de retorno.

## Ejemplo Práctico Paso a Paso: Análisis de `192.168.45.138/26`

Determinemos a qué subred exacta pertenece el servidor `192.168.45.138` con prefijo `/26`:

1. **Máscara y bits de equipo:** con $p = 26$, quedan $32 - 26 = 6$ bits de host. Los 26 unos seguidos de 6 ceros (`11111111.11111111.11111111.11000000`) equivalen a la máscara **`255.255.255.192`**.
2. **Salto en el cuarto octeto:** como $m_4 = 192$, el salto es $\Delta = 256 - 192 = 64$. Los bloques válidos dentro de `192.168.45.0/24` arrancan en `.0`, `.64`, `.128` y `.192`.
3. **Dirección de red ($R$):** el cuarto octeto `138` (`10001010`) operado con Y lógica frente a `192` (`11000000`) da `10000000` (`128`). La red es **`192.168.45.128`**.
4. **Dirección de difusión ($B$):** con máscara comodín `0.0.0.63`, al aplicar O lógica entre `128` y `63` (o calcular $128 + 64 - 1$) resulta `191`. La difusión es **`192.168.45.191`**.
5. **Capacidad y rango útil:** el bloque suma $2^6 = 64$ direcciones y $64 - 2 = 62$ equipos útiles, de **`192.168.45.129`** a **`192.168.45.190`** (puerta de enlace habitual en `.129`), dentro de la histórica Clase C y el rango privado RFC 1918.

## Tabla de Referencia de Prefijos CIDR en IPv4

La tabla reúne los bloques CIDR más utilizados en oficinas, centros de datos y nubes públicas:

| Prefijo | Máscara de Subred | IPs Totales | Equipos Útiles | Aplicación Habitual |
| :--- | :--- | :--- | :--- | :--- |
| **`/16`** | `255.255.0.0` | 65.536 | 65.534 | Red corporativa global o VPC principal |
| **`/24`** | `255.255.255.0` | 256 | 254 | Oficina estándar o VLAN departamental |
| **`/25`** | `255.255.255.128` | 128 | 126 | Mitad de una red `/24` |
| **`/26`** | `255.255.255.192` | 64 | 62 | Planta mediana o grupo de servidores |
| **`/27`** | `255.255.255.224` | 32 | 30 | Sucursal pequeña o red de gestión |
| **`/28`** | `255.255.255.240` | 16 | 14 | Zona desmilitarizada (DMZ) o bloque ISP |
| **`/30`** | `255.255.255.252` | 4 | 2 | Enlace punto a punto clásico |
| **`/31`** | `255.255.255.254` | 2 | 2 | Enlace punto a punto RFC 3021 |
| **`/32`** | `255.255.255.255` | 1 | 1 | Ruta de host individual o retorno |

Cada bit adicional que se añade al prefijo divide exactamente a la mitad el tamaño del bloque disponible, permitiendo ajustar la densidad de direcciones a la arquitectura real de cada segmento.

## Errores Frecuentes y Buenas Prácticas de Segmentación

* **Solapar subredes por desalineación binaria:** todo bloque debe iniciar en un múltiplo exacto de su tamaño ($\Delta$). Ubicar un `/25` empezando en `.64` genera conflictos de enrutamiento; al usar máscaras de longitud variable, asigna siempre primero las subredes más grandes.
* **Olvidar las direcciones reservadas en la nube:** mientras una red física pierde solo 2 IPs, proveedores como AWS, Azure o Google Cloud reservan **5 direcciones** por subred (red, enrutador, DNS, reserva futura y difusión), reduciendo un `/28` de 14 a solo **11 instancias útiles**.
* **No dejar margen de crecimiento:** asignar un `/26` (62 útiles) a 58 dispositivos obliga a renumerar toda la VLAN al sumar teléfonos IP o cámaras; reserva al menos un 30 % de holgura.
* **Confundir los límites del espacio privado RFC 1918:** los rangos privados válidos son `10.0.0.0/8`, `172.16.0.0/12` (termina en `172.31.255.255`, nunca en `172.32.x.x`) y `192.168.0.0/16`. Usar IPs fuera de estos límites bloquea el acceso interno hacia servicios públicos reales.
