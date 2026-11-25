---
metaTitle: "Buscador de IP y Geolocalización | ASN, ISP, rDNS y VPN"
metaDescription: "Analiza cualquier IPv4 o IPv6: geolocalización, proveedor ISP, ASN, bloque CIDR, DNS inverso PTR y detección de VPN, proxy o nodos de salida Tor."
metaKeywords: "buscador de ip, geolocalizacion ip, cual es mi ip, rastrear ip, consultar asn, dns inverso ptr, detector de vpn, detectar proxy, ipv4 ipv6, bloque cidr"
title: "Buscador de IP y Localizador"
shortDescription: "Inspecciona cualquier dirección IPv4 o IPv6 para conocer su geolocalización, proveedor ISP, número de sistema autónomo (ASN), DNS inverso PTR y señales de VPN, proxy o Tor."
faqs:
  - question: "¿Por qué la geolocalización de IP muestra otra ciudad cercana en lugar de mi dirección exacta?"
    answer: "La geolocalización IP asocia prefijos de enrutamiento con asignaciones de registros regionales (RIR), puntos de intercambio del ISP y mediciones de latencia, nunca con coordenadas GPS del hogar. La precisión por país supera el 99%, pero a nivel de ciudad suele apuntar a la pasarela regional (BNG) del operador, situada a decenas de kilómetros del abonado."
  - question: "¿Qué ocurre si consulto una IP privada RFC 1918 como 192.168.1.1 o 10.0.0.5?"
    answer: "Las direcciones privadas, loopback, de enlace local y CGNAT no son enrutables en el Internet público, por lo que carecen de geolocalización o titularidad ASN pública. El backend detecta estas subredes reservadas de inmediato, evita llamadas externas para prevenir SSRF y devuelve la clasificación RFC correspondiente."
  - question: "¿Por qué direcciones Anycast como 8.8.8.8 o 1.1.1.1 muestran ubicaciones inesperadas?"
    answer: "En Anycast, el mismo prefijo IP se anuncia mediante BGP desde cientos de puntos de presencia repartidos por todo el mundo para dirigir a cada usuario al nodo más cercano. Al no existir una única ubicación física para ese prefijo, las bases de geolocalización suelen asignarlo a la sede corporativa del operador o a una coordenada central."
  - question: "¿Cómo verifica el DNS inverso confirmado hacia adelante (FCrDNS) la autenticidad de un servidor?"
    answer: "FCrDNS realiza primero una consulta inversa PTR sobre la IP para obtener un nombre de host y luego ejecuta una consulta directa A o AAAA sobre ese nombre para comprobar que resuelve exactamente a la misma IP original. Los servidores de correo y WAF usan este doble chequeo para validar emisores SMTP y rastreadores reales."
  - question: "¿Que una IP muestre indicador de Hosting o VPN significa automáticamente que es maliciosa?"
    answer: "No. El indicador de hosting simplemente señala que el prefijo pertenece a un ASN de nube o centro de datos (como AWS, GCP o DigitalOcean) en lugar de un ISP residencial, y el de VPN apunta a túneles compartidos de privacidad. Los equipos de seguridad emplean estas señales para exigir verificación adicional, no para bloqueos ciegos."
features:
  - "Validación dual-stack de direcciones IPv4 e IPv6 en forma canónica y detección automática de tu IP pública actual"
  - "Geolocalización con respaldo multiproveedor: país, región, ciudad, código postal, coordenadas, mapa y zona horaria IANA"
  - "Atribución completa de enrutamiento con Número de Sistema Autónomo (ASN), operador ISP, organización y bloque CIDR"
  - "Resolución simultánea de DNS inverso (rDNS) en zonas in-addr.arpa e ip6.arpa para extraer el hostname PTR"
  - "Perfilado de seguridad que detecta nodos de salida Tor, proxies abiertos, endpoints VPN y rangos de centros de datos"
  - "Clasificación local de rangos reservados (RFC 1918, RFC 6598, RFC 4193, loopback) con defensa anti-SSRF y exportación JSON/TXT"
useCases:
  - "Investigación de ataques de fuerza bruta, scraping de APIs y picos anómalos en logs de Nginx, Cloudflare o balanceadores"
  - "Comprobación de registros PTR y FCrDNS en IPs dedicadas de servidores SMTP salientes antes de ponerlos en producción"
  - "Auditoría de túneles VPN, reglas de split-tunneling y posibles fugas IPv6 durante diagnósticos de conectividad remota"
  - "Validación antifraude en pagos online contrastando el país de facturación con la geolocalización y señales de proxy o Tor"
  - "Identificación del proveedor cloud, ASN y prefijo CIDR detrás de webhooks entrantes para configurar listas de control de acceso"
  - "Triaje rápido de alertas de cortafuegos diferenciando usuarios residenciales, pools CGNAT móviles y servidores automatizados"
howToSteps:
  - "Abre la herramienta para inspeccionar automáticamente tu dirección IP pública o introduce cualquier IPv4 o IPv6 objetivo."
  - "Ejecuta la consulta para lanzar en paralelo la geolocalización, la atribución ASN, el cribado de anonimizadores y el PTR inverso."
  - "Revisa el panel de ubicación y el mapa interactivo para comprobar país, región, ciudad aproximada, coordenadas y zona horaria IANA."
  - "Examina la tarjeta de red y enrutamiento para verificar el ASN, el operador ISP, la organización titular y el bloque CIDR anunciado."
  - "Consulta el módulo de inteligencia de amenazas y DNS inverso para revisar alertas de VPN, proxy, Tor, hosting y el nombre PTR."
  - "Copia el resumen estructurado o descarga el informe completo en formato JSON o TXT para auditorías e informes de incidentes."
---

Cada paquete que viaja por Internet lleva una dirección IP de origen y destino, pero los octetos decimales o grupos hexadecimales por sí solos ofrecen poco contexto ante una incidencia. Convertir una dirección en inteligencia operativa requiere correlacionar tres capas independientes: tablas de enrutamiento BGP y registros de Sistemas Autónomos, bases comerciales de geolocalización y zonas inversas DNS. Este analizador consulta estas fuentes en paralelo detrás de endpoints protegidos contra SSRF, gestiona respaldo automático multiproveedor y genera mapas interactivos, metadatos de red e informes exportables directamente en tu navegador.

## Agotamiento IPv4, forma canónica IPv6 y bloques reservados

Internet opera simultáneamente sobre **IPv4** de 32 bits (`4.294.967.296` direcciones) e **IPv6** de 128 bits (`3,4 × 10^38` direcciones). Como una IPv6 admite múltiples escrituras equivalentes, RFC 5952 establece su **forma canónica estricta**: hexadecimales en minúscula, sin ceros a la izquierda en cada hexteto de 16 bits y un único `::` para comprimir la secuencia más larga de dos o más hextetos nulos (`2001:4860:4860::8888`). Además, los servidores *dual-stack* registran conexiones IPv4 bajo el prefijo mapeado `::ffff:0:0/96` (`::ffff:203.0.113.45`), que debe desempaquetarse antes de consultar tablas IPv4.

No toda IP válida es públicamente enrutable. IANA reserva bloques especiales excluidos del BGP global:

| Bloque CIDR | Familia | Estándar / RFC | Ámbito y comportamiento operativo |
| :--- | :--- | :--- | :--- |
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | IPv4 | RFC 1918 | Redes privadas corporativas y domésticas traducidas por NAT. |
| `100.64.0.0/10` | IPv4 | RFC 6598 | Espacio compartido CGNAT entre núcleo ISP y clientes. |
| `127.0.0.0/8` / `::1/128` | IPv4 / IPv6 | RFC 1122 / 4291 | Interfaz *loopback*; el tráfico no abandona la pila local. |
| `169.254.0.0/16` / `fe80::/10` | IPv4 / IPv6 | RFC 3927 / 4291 | Enlace local autoconfigurado en un segmento; no enrutable. |
| `fc00::/7` (`fd00::/8`) | IPv6 | RFC 4193 | Direcciones Locales Únicas (ULA) para redes internas privadas. |
| `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | IPv4 | RFC 5737 | Rangos reservados para documentación y pruebas (`TEST-NET`). |
| `2001:db8::/32` | IPv6 | RFC 3849 | Prefijo de documentación reservado para ejemplos técnicos. |

Si consultas una dirección de estas subredes reservadas, el backend la clasifica localmente y omite llamadas externas, previniendo ataques SSRF contra redes internas. Al depurar aplicaciones detrás de proxies inversos o CDN, asegúrate también de extraer la IP cliente fiable desde la cabecera controlada por tu infraestructura (como `CF-Connecting-IP` o el salto confiable de `X-Forwarded-For`), ya que el primer valor de `X-Forwarded-For` puede ser falsificado por el cliente.

## Sistemas Autónomos (ASN), prefijos BGP y registros RIR

Internet conecta cerca de 75.000 **Sistemas Autónomos (AS)**: redes bajo gestión propia que intercambian rutas mediante **BGP**. Cada red recibe un **ASN** —de 16 bits originalmente y ampliado a 32 bits en RFC 6793— asignado por uno de los cinco Registros Regionales de Internet (RIR):

- **ARIN** (Norteamérica y parte del Caribe)
- **RIPE NCC** (Europa, Oriente Medio y Asia Central)
- **APNIC** (Asia-Pacífico)
- **LACNIC** (América Latina y el Caribe)
- **AFRINIC** (África)

Los routers reenvían paquetes aplicando coincidencia por prefijo más largo (*longest-prefix match*) sobre bloques CIDR anunciados (habitualmente `/24` en IPv4 y `/48` en IPv6). En seguridad, el ASN suele ser más revelador que la ciudad: encontrar `AS16509` (Amazon AWS) o `AS14061` (DigitalOcean) en registros de inicio de sesión señala tráfico automatizado o proxificado, mientras que un ASN de operador regional apunta a abonados residenciales o móviles.

## Por qué deriva la geolocalización: CGNAT, Anycast y alquiler IPv4

Asumir precisión exacta de calle al diseñar reglas de geofencing o control antifraude produce falsos positivos frecuentes debido a tres factores físicos de red:

1. **Agregación ISP y CGNAT móvil:** las operadoras celulares agrupan decenas de miles de terminales tras pasarelas NAT regionales (`100.64.0.0/10`), situadas a menudo a más de 100 kilómetros del usuario real.
2. **Prefijos Anycast:** resolutores como `8.8.8.8` o `1.1.1.1` y redes CDN anuncian exactamente el mismo prefijo desde cientos de puntos de presencia simultáneos; sin sede física única, las bases comerciales asignan la ubicación corporativa del titular.
3. **Mercado de arrendamiento IPv4:** ante la escasez de direcciones libres, los operadores arriendan bloques `/24` entre continentes. Mientras los ficheros *geofeed* CSV (RFC 8805) no se propagan por todos los proveedores, el país listado puede quedar desactualizado durante semanas.

## DNS inverso (FCrDNS), validación CLI y señales de anonimización

El DNS inverso traduce una IP a nombre de host invirtiendo los octetos IPv4 bajo `.in-addr.arpa` o expandiendo los 32 nibbles hexadecimales invertidos de IPv6 bajo `.ip6.arpa`. Desde la terminal puedes comprobar el registro `PTR`, el **DNS inverso confirmado hacia adelante (FCrDNS)** y el registro de red RIR:

```bash
# Consulta inversa IPv4 (8.8.8.8.in-addr.arpa PTR)
dig -x 8.8.8.8 +short
# -> dns.google.

# Consulta inversa IPv6 (32 nibbles invertidos en ip6.arpa)
dig -x 2606:4700:4700::1111 +short
# -> one.one.one.one.

# Confirmación directa (FCrDNS) y consulta rápida de prefijo ASN
dig +short A dns.google
whois -h whois.cymru.com " -v 8.8.8.8"
```

Para auditar los registros directos, prioridades `MX` y políticas `SPF`/`DMARC` del dominio revelado en el `PTR`, continúa el diagnóstico en la [Búsqueda de Registros DNS](/es/herramientas/dns-lookup).

En análisis de amenazas, el perfilado distingue cuatro clases técnicas de red: **nodos de salida Tor** (salidas públicas enumeradas en el consenso oficial), **proxies abiertos** (relés HTTP/SOCKS explotados en relleno de credenciales), **endpoints VPN comerciales** (túneles cifrados compartidos) y **rangos de hosting o nube** (servidores que ejecutan bots, monitores y webhooks). En lugar de bloquear ciegamente rangos compartidos, conviene cruzar estas señales de transporte con la huella del cliente en el [Analizador de User-Agent](/es/herramientas/user-agent-parser) y las cabeceras de respuesta en el [Comprobador de Cabeceras HTTP](/es/herramientas/http-header-checker) para aplicar controles proporcionales al riesgo real.
