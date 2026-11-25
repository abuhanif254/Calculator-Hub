---
metaTitle: "Búsqueda DNS Online | Registros A, MX, TXT, SPF y DMARC"
metaDescription: "Consulta registros DNS A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, SRV y PTR al instante. Audita SPF y DMARC, detecta proveedores y consulta RDAP."
metaKeywords: "busqueda dns, dns lookup, consultar registros dns, comprobar registro mx, verificador spf, comprobar dmarc, registro caa, dns inverso ptr, propagacion dns, rdap dominio"
title: "Búsqueda de Registros DNS (DNS Lookup)"
shortDescription: "Inspecciona en tiempo real los registros DNS de cualquier dominio o IP (A, AAAA, CNAME, MX, TXT, NS, SOA, CAA, SRV y PTR), audita SPF/DMARC y detecta proveedores de alojamiento."
faqs:
  - question: "¿Por qué no puede coexistir un registro CNAME con registros MX o NS en la raíz del dominio?"
    answer: "La sección 3.6.2 de RFC 1034 prohíbe que un registro CNAME comparta el mismo nombre propietario con cualquier otro registro porque los resolutores siguen exclusivamente el alias e ignoran los registros hermanos. Como toda zona raíz exige registros SOA y NS, apuntar un dominio apex a una CDN requiere registros A/AAAA o aplanamiento ALIAS/ANAME en el proveedor DNS."
  - question: "¿Qué provoca un error SPF permerror aunque la sintaxis del registro TXT parezca correcta?"
    answer: "La sección 4.6.4 de RFC 7208 impone un límite máximo de 10 mecanismos que generan consultas DNS (include, a, mx, ptr, exists y redirect) por evaluación SPF, sumando también los include anidados de terceros. Superar las 10 consultas obliga al servidor receptor a devolver permerror, rompiendo el alineamiento DMARC y la entrega del correo."
  - question: "¿Por qué mis cambios de zona DNS siguen devolviendo la IP antigua después de guardarlos?"
    answer: "Los resolutores recursivos globales almacenan cada respuesta durante el tiempo indicado por el TTL previo en segundos, mientras que las respuestas negativas se guardan según el TTL mínimo del registro SOA (RFC 2308). Reducir el TTL a 60 o 300 segundos al menos 24 horas antes de una migración acorta drásticamente la ventana de caché obsoleta."
  - question: "¿Cómo identifica esta herramienta el proveedor DNS, el hosting y la antigüedad del dominio?"
    answer: "El analizador coteja los servidores NS autoritativos contra huellas conocidas (Cloudflare, Amazon Route 53, Google Cloud DNS o Azure DNS), ejecuta una búsqueda inversa PTR sobre la IPv4 principal para inferir el proveedor de alojamiento y consulta el estándar RDAP JSON (RFC 7480) para obtener registrador y fecha de creación."
  - question: "¿Por qué la búsqueda DNS bloquea localhost o direcciones privadas RFC 1918?"
    answer: "Dado que los navegadores no pueden abrir sockets UDP o TCP directos al puerto 53, las consultas se ejecutan en nuestro resolutor de servidor. Antes de lanzar peticiones externas o consultas RDAP, el backend filtra direcciones loopback (127.0.0.0/8, ::1), subredes privadas RFC 1918, espacio CGNAT y enlace local para prevenir ataques SSRF."
features:
  - "Resolución paralela de 10 tipos de registros DNS (A, AAAA, CNAME, MX, TXT, NS, SOA, CAA, SRV y PTR) con lectura del TTL activo"
  - "Validación automatizada de SPF que alerta sobre ausencia de registro, calificadores abiertos +all y políticas neutras ?all"
  - "Inspección dedicada del subdominio _dmarc y sondeo de selectores DKIM habituales (_domainkey) para correo autenticado"
  - "Detección automática de proveedores DNS autoritativos mediante registros NS e inferencia de hosting vía PTR inverso"
  - "Consulta ligera RDAP (RFC 7480) que extrae el registrador del dominio, su fecha de alta y antigüedad calculada"
  - "Protección anti-SSRF integrada que rechaza rangos loopback, privados RFC 1918 y prefijos no enrutables antes de resolver"
useCases:
  - "Verificación de cortes de registros A, AAAA y CNAME en resolutores globales durante migraciones cloud o cambios de CDN"
  - "Resolución de correos rebotados o enviados a spam auditando prioridades MX, registros SPF, claves DKIM y políticas DMARC"
  - "Comprobación de registros CAA antes de renovar certificados TLS automáticos mediante ACME con Let's Encrypt o DigiCert"
  - "Validación de DNS inverso (PTR) en direcciones IP de servidores SMTP salientes para superar filtros antispam entrantes"
  - "Confirmación de tokens TXT de propiedad exigidos por Google Search Console, Microsoft 365 y plataformas SaaS corporativas"
  - "Auditoría de redundancia de servidores de nombres (NS) y sincronización del número de serie SOA tras cambiar de proveedor DNS"
howToSteps:
  - "Escribe un nombre de dominio, una URL completa o una dirección IPv4/IPv6 pública; la herramienta limpia esquemas, rutas y puertos."
  - "Pulsa para ejecutar en paralelo la resolución de todos los registros directos o lanzar una búsqueda PTR inversa si ingresaste una IP."
  - "Navega por las pestañas estructuradas para revisar direcciones IPv4/IPv6, valores TTL, prioridades MX, temporizadores SOA y reglas CAA."
  - "Consulta el panel de Diagnósticos de Correo y Seguridad para identificar advertencias de SPF, DMARC, selectores DKIM o redundancia NS."
  - "Examina el resumen de infraestructura para conocer el proveedor DNS, la pista de alojamiento y los metadatos RDAP del dominio."
  - "Copia los registros individuales o exporta los hallazgos para documentar migraciones, tickets de soporte o auditorías técnicas."
---

Toda conexión HTTP, entrega SMTP y validación TLS parte de una consulta al Sistema de Nombres de Dominio (DNS). Cuando un sitio falla al resolver, el correo transaccional cae en spam o se bloquea una renovación ACME, la causa casi siempre reside en un registro de zona o en una caché vencida. Como los navegadores no pueden abrir sockets directos en el puerto 53 UDP/TCP, esta herramienta ejecuta consultas DNS paralelas en servidor junto con peticiones RDAP y presenta los registros analizados, valores TTL y alertas de seguridad sin almacenar tus búsquedas.

## Registros de recursos y jerarquía de resolución

Una zona DNS reúne registros de recursos (*Resource Records*) definidos desde RFC 1035. El resolutor recursivo recorre la delegación desde la raíz (`.`) hasta el TLD (`.com`, `.es`) y los servidores autoritativos del dominio, almacenando cada respuesta durante su *Time to Live* (TTL).

| Registro | RFC | Ejemplo de zona | Función operativa y restricción clave |
| :--- | :--- | :--- | :--- |
| `A` | 1035 | `ejemplo.com. 300 IN A 93.184.216.34` | Asigna host a IPv4 de 32 bits; varias filas balancean por *round-robin*. |
| `AAAA` | 3596 | `ejemplo.com. 300 IN AAAA 2606:2800:220:1::` | Asigna host a IPv6 de 128 bits para conectividad *dual-stack*. |
| `CNAME` | 1034 | `www.ejemplo.com. IN CNAME borde.cdn.net.` | Alias hacia un nombre canónico; prohibido en raíz junto a `NS`/`SOA`. |
| `MX` | 5321 | `ejemplo.com. IN MX 10 correo1.ejemplo.com.` | Enruta correo por menor prioridad; el destino nunca debe ser `CNAME`. |
| `TXT` | 1035 | `ejemplo.com. IN TXT "v=spf1 -all"` | Aloja SPF, DKIM, DMARC y verificación en bloques de 255 bytes. |
| `NS` | 1035 | `ejemplo.com. IN NS ns1.cloudflare.com.` | Declara servidores autoritativos; mantén al menos dos distintos. |
| `SOA` | 2308 | `ns1.host. admin.host. 2026112501 7200 3600 1209600 300` | Guarda primario, serie, temporizadores y TTL de caché negativa. |
| `CAA` | 8659 | `ejemplo.com. IN CAA 0 issue "letsencrypt.org"` | Autoriza qué CA puede emitir certificados TLS estándar o comodín. |
| `SRV` | 2782 | `_sip._tcp.ejemplo.com. IN SRV 10 60 5060 sip.ejemplo.com.` | Publica prioridad, peso, puerto y destino para servicios. |
| `PTR` | 1035 | `34.216.184.93.in-addr.arpa. IN PTR host.ejemplo.com.` | Mapea una IPv4 o IPv6 a su nombre de host inverso. |

Si tras revisar `A`, `AAAA` y `CAA` necesitas depurar cabeceras TLS o redirecciones del dominio raíz, complementa la inspección con el [Comprobador de Cabeceras HTTP](/es/herramientas/http-header-checker) o traza los saltos con el [Comprobador de Redirecciones URL](/es/herramientas/redirect-checker).

## Seguridad del correo electrónico: SPF, DKIM y DMARC

SMTP no autentica de serie al remitente, por lo que una configuración `TXT` deficiente facilita la suplantación (*spoofing*) y los rebotes. Los servidores receptores validan tres mecanismos complementarios:

```text
; SPF en la raíz (rechazo estricto, máximo 10 consultas DNS)
ejemplo.com.                   300 IN TXT "v=spf1 include:_spf.google.com ip4:198.51.100.24 -all"

; Clave pública DKIM bajo selector (RSA 2048 o Ed25519)
google._domainkey.ejemplo.com. 300 IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."

; Política DMARC en _dmarc con reportes agregados RUA
_dmarc.ejemplo.com.            300 IN TXT "v=DMARC1; p=reject; sp=reject; adkim=r; aspf=r; pct=100; rua=mailto:dmarc@ejemplo.com"
```

### Fallos frecuentes que degradan la entregabilidad

1. **Calificadores SPF permisivos:** terminar con `+all` autoriza a cualquier servidor de Internet a enviar correo por tu dominio, y `?all` deja la política neutra. Usa `~all` (*softfail*) durante pruebas y migra a `-all` (*hardfail*) en producción.
2. **Límite de 10 consultas SPF (RFC 7208 §4.6.4):** cada `include`, `a`, `mx`, `exists` y `redirect` suma una consulta recursiva, incluidos los `include` anidados de proveedores SaaS. Exceder 10 produce un `permerror` que invalida el registro completo.
3. **DMARC detenido en `p=none`:** `p=none` sirve para recolectar informes XML (`rua`) sin bloquear envíos falsos. Una vez verificado el alineamiento de emisores legítimos, escala a `p=quarantine` y `p=reject`.
4. **Selectores DKIM personalizados:** las claves viven en `<selector>._domainkey.<dominio>`. Como DNS no permite enumerar selectores mediante comodines, esta herramienta sondea valores habituales (`google`, `default`); para selectores propios (`s1`, `selector1`), revisa el campo `s=` en la cabecera `DKIM-Signature` de un correo recibido.

## Caché TTL, serie SOA y propagación DNS real

La llamada «propagación DNS» no es un envío activo: DNS funciona bajo demanda (*pull*). Al actualizar tu zona e incrementar el número de serie `SOA` (formato `AAAAMMDDnn`, RFC 1912), los secundarios sincronizan vía `AXFR`/`IXFR`, mientras los resolutores externos sirven su caché hasta que expira el TTL previo.

Las respuestas negativas (`NXDOMAIN`/`NODATA`) también se cachean según el menor valor entre el TTL del `SOA` y su campo `MINTTL` (RFC 2308). Para comparar servidores autoritativos frente a resolutores públicos desde terminal, utiliza `dig`:

```bash
# Consulta directa al servidor autoritativo sin caché
dig @ns1.ejemplo.net ejemplo.com A +norecurse +noall +answer

# Comparar TTL y registros entre Cloudflare y Google
dig @1.1.1.1 ejemplo.com MX +noall +answer
dig @8.8.8.8 _dmarc.ejemplo.com TXT +short
```

## DNS inverso (PTR), RDAP y protección anti-SSRF

Al introducir una IPv4 o IPv6, la herramienta pasa a modo inverso consultando `in-addr.arpa` o `ip6.arpa` para obtener registros `PTR`. En consultas de dominio, ejecuta además un `PTR` sobre la IPv4 principal, analiza las huellas de los servidores `NS` y consulta **RDAP** (`https://rdap.org/domain/<dominio>`, RFC 7480) para reportar registrador, antigüedad y proveedor cloud. Para inspeccionar el ASN, bloque CIDR y geolocalización de cualquier IP resuelta, envíala al [Buscador de IP y Localizador](/es/herramientas/ip-lookup).

Por seguridad, el backend valida cada objetivo antes de lanzar consultas externas y bloquea direcciones loopback (`127.0.0.0/8`, `::1`), bloques privados RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), CGNAT (`100.64.0.0/10`), enlace local y direcciones IPv6 únicas locales (`fc00::/7`), neutralizando intentos de SSRF contra redes internas.
