---
metaTitle: "Generador y Verificador HMAC | SHA-256, SHA-512 y MD5"
metaDescription: "Genere y verifique firmas HMAC según RFC 2104 con SHA-256, SHA-512, SHA-1 y MD5 en su navegador mediante Web Crypto API para webhooks y APIs."
metaKeywords: "generador hmac, verificador hmac, hmac sha256 online, hmac sha512, firma de webhooks, autenticación api, rfc 2104, hmac sha1, hmac md5, código de autenticación de mensajes, jwt hs256"
title: "Generador HMAC"
shortDescription: "Genere y valide códigos de autenticación de mensajes basados en hash (HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 y HMAC-MD5) conforme a RFC 2104 localmente para texto y archivos mediante Web Crypto API."
faqs:
  - question: "¿Por qué HMAC es mucho más seguro que aplicar SHA-256 a una clave concatenada con el mensaje?"
    answer: "En funciones hash basadas en la construcción Merkle-Damgård (MD5, SHA-1, SHA-256 y SHA-512), el patrón simple SHA-256(clave + mensaje) es vulnerable a ataques de extensión de longitud: un atacante que conozca el resumen y el tamaño del mensaje puede anexar bytes arbitrarios y falsificar una firma válida sin conocer la clave. El diseño anidado de doble pasada de RFC 2104 con rellenos ipad y opad elimina por completo esta vulnerabilidad."
  - question: "¿Se envían mis claves secretas, cargas útiles de webhooks o archivos a algún servidor?"
    answer: "No. Todas las operaciones se ejecutan estrictamente en la memoria local de su navegador. HMAC-SHA256, HMAC-SHA512 y HMAC-SHA1 utilizan la interfaz nativa window.crypto.subtle.sign(), mientras que HMAC-MD5 y los archivos superiores a 20 MB se procesan por flujo local en bloques de 2 MB sin realizar ninguna petición de red."
  - question: "¿Qué longitud mínima debe tener una clave secreta HMAC para ofrecer seguridad criptográfica real?"
    answer: "La guía NIST SP 800-107 recomienda emplear claves generadas aleatoriamente con una longitud al menos igual a la salida del algoritmo hash subyacente: un mínimo de 32 bytes (256 bits) para HMAC-SHA256 y 64 bytes (512 bits) para HMAC-SHA512. Las claves que exceden el tamaño de bloque interno (64 o 128 bytes) se resumen previamente según RFC 2104 y no añaden entropía adicional."
  - question: "¿Por qué falla la verificación HMAC de un webhook en Express, Next.js o Fastify si la clave y el algoritmo coinciden?"
    answer: "La causa más frecuente es calcular la firma sobre un objeto reserializado con JSON.stringify(req.body) en lugar de utilizar los bytes exactos sin procesar de la petición HTTP recibida. Un solo espacio modificado, una barra invertida escapada o un cambio en el orden de las claves JSON invalida inmediatamente el código HMAC."
  - question: "¿Por qué es obligatorio utilizar comparación en tiempo constante al validar firmas HMAC en el servidor?"
    answer: "Los operadores estándar de igualdad de cadenas (=== o ==) se detienen en el primer byte diferente, lo que genera diferencias temporales medibles en microsegundos aprovechables mediante ataques de canal lateral para deducir una firma válida byte a byte. En producción siempre debe usar crypto.timingSafeEqual() en Node.js o hmac.compare_digest() en Python."
features:
  - "Cálculo y verificación conforme a RFC 2104 y FIPS 198-1 para HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 y HMAC-MD5."
  - "Ejecución nativa en el navegador con Web Crypto API (SubtleCrypto) y lectura local en bloques de 2 MB para archivos mayores de 20 MB."
  - "Generador criptográfico CSPRNG integrado mediante window.crypto.getRandomValues() para crear claves simétricas de 256 bits."
  - "Módulo instantáneo de verificación para contrastar firmas recibidas en cabeceras HTTP de webhooks y tokens API."
  - "Enmascaramiento opcional de la clave secreta, salida hexadecimal en mayúsculas o minúsculas, copia automática e historial local."
  - "Fragmentos de código integrados para validar webhooks, firmas AWS SigV4, tokens JWT HS256 y middleware en servidor."
useCases:
  - "Depurar y verificar firmas criptográficas de webhooks entrantes de Stripe, GitHub, Shopify, Slack o Twilio antes de desplegar."
  - "Generar y auditar cabeceras de autorización firmadas para APIs REST y protocolos como AWS Signature Version 4."
  - "Validar manualmente firmas simétricas de JSON Web Tokens (JWT) con algoritmos HS256 y HS512 durante incidencias de sesión."
  - "Crear etiquetas autenticadas resistentes a manipulación para archivos binarios locales y colas de mensajes entre microservicios."
  - "Producir claves secretas simétricas de alta entropía en el navegador sin exponer secretos internos a herramientas externas."
  - "Comprobar la interoperabilidad con integraciones heredadas que aún requieren HMAC-SHA1 (OAuth 1.0a o TOTP RFC 6238) o HMAC-MD5."
howToSteps:
  - "Seleccione el algoritmo objetivo (HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 o HMAC-MD5) en la barra de algoritmos."
  - "Introduzca su clave secreta compartida o pulse el botón CSPRNG para generar automáticamente una clave aleatoria de 32 bytes."
  - "Pegue el contenido exacto del mensaje en el modo de texto o cambie al modo de archivo para firmar un recurso binario local."
  - "Revise la etiqueta hexadecimal calculada en tiempo real y ajuste si desea formato en mayúsculas o copia automática."
  - "Pegue la firma esperada procedente de su cabecera HTTP o proveedor en el campo de verificación para confirmar su validez."
---

Un resumen sin clave, como el obtenido con el [Generador SHA-256](/es/herramientas/sha256-generator) o el [Generador de Hash](/es/herramientas/hash-generator), detecta alteraciones accidentales, pero no impide que un atacante modifique un mensaje y recalcule un nuevo hash válido. El estándar **HMAC (Hash-based Message Authentication Code)**, definido en **RFC 2104** y **FIPS 198-1**, garantiza simultáneamente **integridad** y **autenticidad** vinculando la función hash a una clave simétrica compartida. Sin ese secreto resulta inviable falsificar la firma de un webhook HTTP, una petición API o un token de sesión, motivo por el cual HMAC protege Stripe, GitHub, Shopify, AWS Signature Version 4 y los JWT simétricos (`HS256`/`HS512`).

## Construcción anidada de RFC 2104 y defensa contra extensión de longitud

Un error clásico consiste en firmar mediante concatenación simple como `SHA-256(clave || mensaje)`. Sobre funciones Merkle-Damgård (MD5, SHA-1, SHA-256 y SHA-512), este esquema sufre **ataques de extensión de longitud**: como el resumen expone el estado interno de compresión, un adversario que conozca la firma y el tamaño del mensaje puede anexar bytes arbitrarios (como `&rol=admin`) y obtener un hash legítimo sin poseer la clave.

RFC 2104 elimina esa vulnerabilidad mediante dos pasadas anidadas con constantes de relleno XOR fijas: `ipad` (el byte `0x36` repetido `B` veces) y `opad` (el byte `0x5c` repetido `B` veces), donde `B` es el tamaño de bloque interno del algoritmo en bytes:

```text
HMAC(K, m) = H( (K' XOR opad) || H( (K' XOR ipad) || m ) )
```

Antes de operar, la clave `K` se normaliza a longitud exacta `B` para derivar `K'`:

- Si `len(K) > B`, se comprime con `K' = H(K)` y se rellena a la derecha con ceros (`0x00`) hasta completar `B` bytes.
- Si `len(K) < B`, se rellena directamente a la derecha con bytes `0x00` hasta `B`.
- Si `len(K) == B`, se usa `K' = K` sin cambios.

Al envolver el resumen interno dentro de una segunda pasada con clave derivada distinta, el estado interno del mensaje nunca queda expuesto. Además, la seguridad formal de HMAC descansa en la **seudoaleatoriedad (PRF)** de la función de compresión más que en la resistencia estricta a colisiones; por eso `HMAC-SHA1` e incluso `HMAC-MD5` resisten mejor que sus equivalentes sin clave, aunque todo sistema nuevo debe adoptar únicamente `HMAC-SHA256` o `HMAC-SHA512`.

## Especificaciones técnicas y entropía por algoritmo

La selección depende de la interoperabilidad exigida por el servicio externo y la arquitectura de servidor. Al trabajar con palabras de 64 bits y bloques de 128 bytes, `HMAC-SHA512` ofrece un rendimiento excelente en servidores modernos de 64 bits.

| Algoritmo | Firma | Hex | Bloque (`B`) | Clave mínima (NIST SP 800-107) | Estado | Usos habituales en producción |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **HMAC-SHA256** | 256 bits | 64 | 64 bytes | 32 bytes (256 bits) | Recomendado | GitHub `X-Hub-Signature-256`, Stripe, Shopify, AWS SigV4, JWT `HS256` |
| **HMAC-SHA512** | 512 bits | 128 | 128 bytes | 64 bytes (512 bits) | Alta garantía | JWT `HS512`, APIs financieras y exchanges, RPC internos críticos |
| **HMAC-SHA1** | 160 bits | 40 | 64 bytes | 20 bytes (160 bits) | Compatibilidad | OAuth 1.0a, RFC 6238 TOTP / RFC 4226 HOTP, webhooks antiguos |
| **HMAC-MD5** | 128 bits | 32 | 64 bytes | 16 bytes (128 bits) | Obsoleto | Autenticación legada CRAM-MD5 y servicios SOAP retirados |

Para secretos nuevos de webhooks o APIs, cree al menos 32 bytes aleatorios con un CSPRNG desde el generador integrado o el [Generador de Cadenas Aleatorias](/es/herramientas/random-string-generator).

## Verificación segura en producción y consola

Esta herramienta firma texto y archivos de hasta 20 MB localmente con `window.crypto.subtle.sign` (y en bloques locales de 2 MB para archivos mayores o `HMAC-MD5`). En producción, todo servidor debe cumplir dos reglas estrictas: **firmar el buffer binario sin procesar** y **comparar las firmas en tiempo constante** frente a ataques de temporización.

```javascript
// Node.js (Express / Next.js): verificación en tiempo constante
import crypto from 'node:crypto';

export function verificarWebhook(rawBodyBuffer, claveSecreta, cabeceraHex) {
  const esperada = crypto.createHmac('sha256', claveSecreta).update(rawBodyBuffer).digest();
  const recibida = Buffer.from(cabeceraHex.replace(/^sha256=/i, '').trim(), 'hex');

  if (esperada.length !== recibida.length) return false;
  return crypto.timingSafeEqual(esperada, recibida);
}
```

```python
# Python: validación segura con hmac.compare_digest
import hashlib, hmac

def verificar_firma(raw_body: bytes, secreto: str, cabecera_hex: str) -> bool:
    esperada = hmac.new(secreto.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(esperada, cabecera_hex.removeprefix("sha256=").strip().lower())
```

Desde consola Linux o macOS, OpenSSL permite validar rápidamente un payload idéntico durante incidencias:

```bash
printf '%s' '{"evento":"pago.ok","id":"ord_9481"}' \
  | openssl dgst -sha256 -hmac "mi_clave_secreta_32_bytes"
```

## Diagnóstico de fallos frecuentes en integraciones

Si una firma no coincide pese a usar el mismo secreto y algoritmo, audite estos cuatro errores habituales:

1. **Reserialización del cuerpo JSON:** middlewares como `express.json()` descartan espacios y modifican escapes (`\/` frente a `/`). Firmar `JSON.stringify(req.body)` cambia los bytes originales y rompe la verificación; conserve siempre el `Buffer` crudo previo al análisis.
2. **Prefijos, codificación Base64 y protección anti-repetición:** GitHub antepone `sha256=` en hexadecimal; Stripe empaqueta marca temporal y firma en `t=...,v1=<hex>` firmando `${timestamp}.${rawBody}` contra ataques *replay*; y Shopify envía el resumen en **Base64** (contrastable con el [Codificador Base64](/es/herramientas/base64-encode)). Para auditar tokens `HS256`/`HS512`, inspeccione cabecera y claims con el [Decodificador JWT](/es/herramientas/jwt-decoder).
3. **Clave UTF-8 frente a bytes hexadecimales decodificados:** confirme si una clave de 64 caracteres hexadecimales se introduce literalmente como 64 bytes ASCII o decodificada en 32 bytes binarios.
4. **Canonización estricta de peticiones:** esquemas como AWS Signature Version 4 exigen ordenar alfabéticamente parámetros de consulta, pasar cabeceras a minúsculas y separar líneas con `\n` exacto antes de derivar las claves HMAC encadenadas.
