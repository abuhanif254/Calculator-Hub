---
title: "Calculadora de subred IP"
description: "Calcule rangos de subred IPv4, bloques CIDR, máscaras comodín, rangos de IP utilizables y diseñe redes optimizadas con el planificador VLSM."
metaTitle: "Calculadora de subred IP | Calculadora CIDR, VLSM y rango de IP"
metaDescription: "Calculadora de subredes IP gratuita en línea. Calcule fácilmente subredes, máscaras comodín, rangos de IP de host utilizables, clases de red y planes VLSM con desgloses binarios."
metaKeywords: "calculadora de subred ip, calculadora de subredes, calculadora cidr, calculadora vlsm, calculadora rango ip, mascara de subred, mascara comodin, direccion de red, direccion de transmision, direccion broadcast, subnetting ipv4"
faqs:
  - question: "¿Qué es una subred IP?"
    answer: "Una subred (abreviatura de subred lógica) es una subdivisión de una red IP. Dividir una red grande en subredes más pequeñas y distintas mejora la eficiencia del enrutamiento, aumenta la seguridad y reduce el tráfico de difusión al aislar las comunicaciones locales."
  - question: "¿Qué significa CIDR?"
    answer: "CIDR significa Classless Inter-Domain Routing (Enrutamiento entre Dominios sin Clases). Es un método para asignar direcciones IP y enrutar paquetes IP que reemplazó a la antigua arquitectura de red basada en clases. CIDR utiliza la notación de prefijo (por ejemplo, /24) para indicar el tamaño de la máscara."
  - question: "¿Cómo se calcula el número de hosts utilizables en una subred?"
    answer: "El número de hosts utilizables se calcula mediante la fórmula 2^(32 - N) - 2, donde N es la longitud del prefijo CIDR (bits de la máscara de subred). Restamos 2 porque la primera dirección está reservada para la dirección de red y la última para la dirección de difusión."
  - question: "¿Cuál es la diferencia entre direcciones IP públicas y privadas?"
    answer: "Las direcciones IP públicas son globalmente únicas y enrutables en el internet público. Las direcciones IP privadas (definidas en RFC 1918) están reservadas para redes de área local (LAN) y no son enrutables en internet, lo que requiere traducción de direcciones de red (NAT) para acceder a recursos externos."
  - question: "¿Cuál es el propósito de una dirección de difusión (broadcast)?"
    answer: "Una dirección de difusión es una dirección de red especial que se utiliza para transmitir paquetes a todos los dispositivos activos en una subred específica simultáneamente. En IPv4, la dirección de difusión es la última dirección absoluta en el rango de la subred."
  - question: "¿Qué es una máscara comodín (wildcard mask)?"
    answer: "Una máscara comodín es el inverso bit a bit de una máscara de subred (se calcula como ~mascara_de_subred). Se utiliza comúnmente en enrutadores Cisco, listas de control de acceso (ACL) y protocolos de enrutamiento (como OSPF) para especificar qué bits de una dirección IP deben coincidir."
  - question: "¿Qué es VLSM (máscara de subred de longitud variable)?"
    answer: "VLSM permite a los diseñadores de red particionar un espacio de direcciones IP en múltiples subredes de diferentes tamaños según los requisitos de host de cada segmento. Esto evita el desperdicio de direcciones IP que ocurre con la máscara de subred de longitud fija (FLSM)."
  - question: "¿Cuál es el rango de direcciones APIPA?"
    answer: "APIPA (Direccionamiento Privado Automático de IP) utiliza el bloque de direcciones IP 169.254.0.0/16. Los sistemas operativos asignan automáticamente una dirección de este rango a una interfaz de red cuando no hay un servidor DHCP disponible y no se ha configurado una IP estática."
  - question: "¿Por qué se utiliza la dirección de bucle de retorno (loopback) 127.0.0.1?"
    answer: "El rango de IP 127.0.0.0/8 está reservado para operaciones de bucle de retorno. La dirección 127.0.0.1 (a menudo llamada 'localhost') permite que una computadora envíe tráfico de red a sí misma, lo cual es crítico para pruebas locales, diagnósticos y ejecución de servicios locales."
  - question: "¿En qué se diferencia la división en subredes IPv6 de la IPv4?"
    answer: "IPv6 utiliza direcciones de 128 bits (en comparación con las de 32 bits de IPv4), lo que significa que tiene un grupo de direcciones prácticamente inagotable. Las subredes IPv6 suelen estar estandarizadas en torno a una longitud de prefijo /64 para segmentos locales y no utilizan direcciones de difusión tradicionales, sino multidifusión (multicast)."
---

# Guía avanzada de subredes IP y máscara de subred de longitud variable (VLSM)

En la arquitectura de los sistemas digitales modernos, la comunicación por Internet se rige por el Protocolo de Internet (IP). Para que los dispositivos se comuniquen a escala global o dentro de redes de área local (LAN), los paquetes de datos deben enrutarse a sus destinos con precisión.

A medida que las redes crecen en complejidad y escala, asignar un único bloque masivo de direcciones IP a una organización se vuelve ineficiente. **Subredes IP** es la técnica de ingeniería principal que se utiliza para dividir una sola red física en múltiples subredes más pequeñas y lógicamente aisladas.

Esta guía proporciona un examen completo de la división en subredes IP, la notación CIDR, la aritmética binaria detrás de las máscaras de red, las clases de red y los cálculos de máscara de subred de longitud variable (VLSM).

---

## 1. La anatomía de una dirección IPv4

Una dirección del Protocolo de Internet versión 4 (IPv4) es un **número binario de 32 bits** que contiene una secuencia de 32 unos y ceros. Para la legibilidad humana, este bloque de 32 bits se representa en **notación decimal con puntos**, que consta de cuatro números decimales (cada uno de los cuales oscila entre 0 y 255) separados por puntos.

Cada una de estas cuatro secciones se denomina **octeto** porque representa 8 bits ($2^8 = 256$ valores posibles):

$$\text{Dirección IP (decimal con puntos): } 192.168.1.10$$
$$\text{Dirección IP (binaria): } 11000000.10101000.00000001.00001010$$

Cada dirección IP se divide en dos componentes distintos:
1.  **Porción de red:** Identifica la red específica a la que pertenece el dispositivo.
2.  **Porción de host:** Identifica el dispositivo específico (computadora, impresora, interfaz de enrutador) dentro de esa red.

El límite entre la porción de red y la porción de host se define mediante la **Máscara de subred**.

---

## 2. Máscaras de subred y notación CIDR

Una **Máscara de subred** es una máscara auxiliar de 32 bits donde todos los bits de red están configurados en `1` y todos los bits de host están configurados en `0`. Al realizar una operación lógica `AND` bit a bit entre la dirección IP y la máscara de subred, un enrutador aísla la dirección de red.

Por ejemplo, usando una máscara estándar de Clase C:
```
Dirección IP:       192.168.1.10   ->  11000000.10101000.00000001.00001010
Máscara de subred:  255.255.255.0  ->  11111111.11111111.11111111.00000000
------------------------------------------------------------------------
IP de red:          192.168.1.0    ->  11000000.10101000.00000001.00000000
```

### Enrutamiento entre dominios sin clases (CIDR)
Históricamente, las direcciones IP estaban vinculadas a máscaras de subred rígidas basadas en estructuras de clases. En 1993, se introdujo **CIDR (Enrutamiento entre dominios sin clases)** para reemplazar el direccionamiento con clases.

CIDR utiliza una barra diagonal `/` seguida de la cantidad de bits de red activos (unos) en la máscara de subred. Esto se conoce como **Longitud de prefijo**:

*   **255.255.255.0** contiene 24 unos, por lo que se escribe como **/24**.
*   **255.255.0.0** contiene 16 unos, por lo que se escribe como **/16**.
*   **255.255.255.240** contiene 28 unos, por lo que se escribe como **/28**.

---

## 3. Derivaciones matemáticas en subredes

El cálculo de los límites de las subredes requiere aritmética binaria. Para cualquier longitud de prefijo dada $N$:

### 1. Asignaciones totales de IP
El número total de direcciones IP contenidas en el bloque ($IP_{total}$) es:
$$IP_{total} = 2^{32 - N}$$

### 2. Capacidad de host utilizable
En cualquier subred, se reservan dos direcciones para la infraestructura de red:
*   **Dirección de red:** La primera dirección donde todos los bits de host son `0`. Se utiliza para identificar el bloque de subred en las tablas de enrutamiento.
*   **Dirección de difusión (broadcast):** La última dirección donde todos los bits de host son `1`. Se utiliza para enviar paquetes a todos los hosts de la subred.

Por lo tanto, la cantidad de direcciones de host asignables ($H_{usable}$) es:
$$H_{usable} = 2^{32 - N} - 2$$

*Nota: Para enlaces de enrutador de punto a punto (/31 y /32), los estándares modernos (RFC 3021) permiten la omisión de direcciones de red/difusión, lo que genera 2 y 1 hosts respectivamente.*

### 3. Máscara comodín (Wildcard)
Una máscara comodín es el inverso de la máscara de subred, calculada como:
$$\text{Máscara comodín} = 255.255.255.255 - \text{Máscara de subred}$$

---

## 4. Estructura de red con clases

Antes de CIDR, el espacio IPv4 se dividía en cinco clases según los valores del primer octeto:

| Clase | Rango (Primer Octeto) | Máscara por Defecto | Propósito | Hosts Máximos por Red |
| :--- | :--- | :--- | :--- | :--- |
| **Clase A** | $1 - 126$ | $255.0.0.0$ (/8) | Organizaciones gigantes | $16,777,214$ |
| **Clase B** | $128 - 191$ | $255.255.0.0$ (/16) | Empresas medianas | $65,534$ |
| **Clase C** | $192 - 223$ | $255.255.255.0$ (/24) | Redes pequeñas | $254$ |
| **Clase D** | $224 - 239$ | N/A | Grupos de multidifusión | N/A |
| **Clase E** | $240 - 255$ | N/A | Investigación científica | N/A |

*Nota: El valor del primer octeto 127 está excluido de la Clase A, ya que está reservado para pruebas de bucle de retorno local (por ejemplo, 127.0.0.1).*

---

## 5. Direcciones IP públicas frente a privadas

Para conservar el grupo limitado de direcciones IPv4, el Grupo de Trabajo de Ingeniería de Internet (IETF) reservó bloques específicos de direcciones para implementaciones de redes privadas internas (RFC 1918). Los enrutadores públicos de Internet ignoran estas direcciones.

### 1. Rangos privados de RFC 1918
*   **10.0.0.0 a 10.255.255.255** (prefijo /8)
*   **172.16.0.0 a 172.31.255.255** (prefijo /12)
*   **192.168.0.0 a 192.168.255.255** (prefijo /16)

### 2. APIPA (Direccionamiento privado automático de IP)
*   **169.254.0.0 a 169.254.255.255** (prefijo /16)
*   Los sistemas operativos lo utilizan para autoconfigurar una conexión de red cuando el DHCP no está disponible.

---

## 6. Máscara de subred de longitud variable (VLSM)

**Máscara de subred de longitud variable (VLSM)** es una técnica de enrutamiento avanzada en la que las subredes dentro del mismo bloque de direcciones general pueden tener diferentes tamaños. Esto permite a los administradores de red asignar subredes adaptadas a las necesidades de host específicas de cada departamento, minimizando el desperdicio de direcciones.

### La metodología de diseño de VLSM:
1.  **Listar requisitos de hosts:** Anote los requisitos de tamaño para todos los segmentos, incluidos los enlaces de enrutador punto a punto (que requieren 2 hosts).
2.  **Ordenar por tamaño:** Ordene los segmentos en orden descendente (del segmento más grande al más pequeño). **Esto es crítico** porque colocar primero las subredes más pequeñas puede fragmentar el espacio de direcciones.
3.  **Asignar bloques:** Para cada segmento:
    *   Encuentre el tamaño de bloque más pequeño ($2^k$) que pueda albergar los hosts requeridos más las 2 direcciones reservadas.
    *   Encuentre el prefijo CIDR correspondiente ($32 - k$).
    *   Asigne la dirección de inicio, calcule la red, la difusión y el rango.
    *   Comience el siguiente segmento inmediatamente en el siguiente límite de IP disponible.
