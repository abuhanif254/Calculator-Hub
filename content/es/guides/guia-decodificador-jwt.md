---
title: "Entendiendo JWT (JSON Web Tokens): Una Guía Completa"
description: "Guía técnica sobre el estándar RFC 7519 de JSON Web Tokens: estructura Header.Payload.Signature, codificación Base64Url, verificación criptográfica JWS frente a JWE y buenas prácticas de seguridad."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "jwt-decoder"
relatedType: "tool"
faqs:
  - question: "¿Cuál es la diferencia entre un JWT firmado (JWS) y un JWT cifrado (JWE)?"
    answer: "Un JWS (JSON Web Signature), el formato estándar de tres segmentos separados por puntos, garantiza integridad y autenticidad mediante firma digital, pero su contenido solo está codificado en Base64Url y cualquiera puede leerlo. Un JWE (JSON Web Encryption) consta de cinco segmentos y cifra criptográficamente la carga útil para garantizar confidencialidad frente a terceros."
  - question: "¿Por qué los JWT usan Base64Url en lugar de Base64 tradicional?"
    answer: "El formato Base64 clásico incluye los caracteres +, / y =, los cuales tienen significado reservado dentro de direcciones URL, encabezados HTTP y formularios. Base64Url sustituye + por -, / por _ y omite el relleno = al final, permitiendo transportar el token de forma compacta y segura dentro de cabeceras Authorization: Bearer o parámetros de consulta."
  - question: "¿Por qué puedo decodificar un JWT sin tener la clave secreta?"
    answer: "Porque la decodificación Base64Url es una transformación de formato reversible y no un cifrado. Cualquier herramienta del lado del cliente puede leer el encabezado y la carga útil para fines de depuración. Sin embargo, la clave secreta o la clave pública (JWKS) sigue siendo indispensable en el servidor para verificar matemáticamente que la firma no ha sido alterada."
  - question: "¿En qué consiste la vulnerabilidad del algoritmo none o de confusión de claves?"
    answer: "Ocurre cuando un servidor confía ciegamente en el campo alg declarado dentro del encabezado del propio token recibido. Un atacante puede modificar el encabezado a alg: none y eliminar la firma, o enviar un token HS256 firmado con la clave pública RSA del servidor. La defensa consiste en fijar explícitamente en el backend la lista blanca de algoritmos aceptados."
  - question: "¿Es mejor guardar los JWT en cookies HttpOnly o en localStorage?"
    answer: "Para aplicaciones web ejecutadas en navegador, almacenar tokens de sesión en cookies marcadas con HttpOnly, Secure y SameSite=Strict o Lax protege frente a ataques de Cross-Site Scripting (XSS), ya que JavaScript no puede leer la cookie. Guardar tokens en localStorage los expone a robo inmediato ante cualquier script malicioso o dependencia comprometida."
---

Los JSON Web Tokens (JWT), estandarizados bajo la especificación **RFC 7519**, constituyen el mecanismo predominante para intercambiar afirmaciones de identidad y autorización entre microservicios, aplicaciones de una sola página (SPA) y APIs REST sin mantener estado de sesión en servidor. Sin embargo, confundir la codificación con el cifrado o delegar la confianza en cabeceras manipulables origina vulnerabilidades críticas en producción.

Inspeccionar la estructura interna de un token durante el desarrollo exige visualizar sus reclamaciones (`claims`) y marcas temporales sin exponer credenciales reales a servicios de terceros. Puede analizar encabezados, cargas útiles y fechas de expiración de manera segura e instantánea con nuestra [Herramienta Decodificadora de JWT](/es/herramientas/jwt-decoder), cuyo procesamiento se ejecuta íntegramente en el navegador.

## Anatomía RFC 7519: Encabezado, Carga Útil y Firma Criptográfica

Un JWT firmado compacto (JWS, especificado en RFC 7515) es una cadena ASCII compuesta por exactamente tres bloques codificados en **Base64Url** y separados por dos puntos (`.`):

```text
Encabezado_Base64Url.Carga_Útil_Base64Url.Firma_Base64Url
```

1. **Encabezado (Header):** Objeto JSON que describe los metadatos criptográficos del token, principalmente el tipo (`"typ": "JWT"`), el algoritmo de firma (`"alg": "HS256"`, `"RS256"`, `"ES256"`, etc.) y, opcionalmente, el identificador de clave (`"kid"`) para rotación en conjuntos JWKS.
2. **Carga útil (Payload):** Objeto JSON que contiene las declaraciones (*claims*) sobre la entidad autenticada. El estándar define reclamaciones registradas de tres letras —`iss` (emisor), `sub` (sujeto o identificador de usuario), `aud` (audiencia destinataria), `exp` (expiración en tiempo Unix), `nbf` (no válido antes de), `iat` (fecha de emisión) y `jti` (identificador único anti-repetición)— junto con reclamaciones privadas de negocio como roles o permisos.
3. **Firma (Signature):** Sello criptográfico calculado sobre los dos primeros segmentos ya codificados en Base64Url. Para un algoritmo simétrico HMAC-SHA256, la construcción matemática sigue esta forma:

```text
Entrada_firma = Base64Url(UTF8(Header)) + "." + Base64Url(UTF8(Payload))
Firma = Base64Url(HMAC_SHA256(Entrada_firma, Clave_secreta))
```

Si un interceptor modifica un solo bit del encabezado o cambia `"role": "user"` por `"role": "admin"` en la carga útil, el resumen criptográfico recalculado por el servidor no coincidirá con el tercer segmento y el token será rechazado de inmediato.

## Ejemplo Práctico Paso a Paso: Inspección y Validación de un Token

Suponga que su aplicación recibe la siguiente cadena compacta en la cabecera `Authorization: Bearer`:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfODQyMSIsInJvbGUiOiJlZGl0b3IiLCJpYXQiOjE3OTU2MzAwMDAsImV4cCI6MTc5NTYzMzYwMH0.9xK...firma_hmac
```

**Paso 1: Separar los tres segmentos por el delimitador `.`.**
El primer bloque (`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`) corresponde al encabezado; el segundo (`eyJzdWIiOiJ1c3JfODQyMSIsInJvbGUiOiJlZGl0b3IiLCJpYXQiOjE3OTU2MzAwMDAsImV4cCI6MTc5NTYzMzYwMH0`) a la carga útil; el tercero a la firma binaria codificada.

**Paso 2: Decodificar de Base64Url a JSON legible.**
Reemplazando `-` por `+`, `_` por `/` y añadiendo el relleno `=` necesario antes de decodificar UTF-8, obtenemos:

```json
// Encabezado decodificado
{
  "alg": "HS256",
  "typ": "JWT"
}

// Carga útil decodificada
{
  "sub": "usr_8421",
  "role": "editor",
  "iat": 1795630000,
  "exp": 1795633600
}
```

**Paso 3: Validar la vigencia temporal (`exp - iat`).**
La diferencia `1795633600 − 1795630000` equivale exactamente a **3,600 segundos (1 hora)** de tiempo de vida del token de acceso. El servidor compara el tiempo Unix actual frente a `exp` (aplicando opcionalmente un pequeño margen de tolerancia por desfase de relojes, habitualmente de 30 a 60 segundos).

**Paso 4: Verificar firma y reclamaciones antes de autorizar.**
Además de validar la firma con la clave configurada, el backend debe comprobar que `iss` y `aud` coinciden exactamente con los esperados por la API receptora.

## Tabla Comparativa de Algoritmos de Firma JWT

La elección del algoritmo determina cómo se distribuyen las claves entre servicios emisores y verificadores, así como la resistencia criptográfica y el rendimiento por petición:

| Algoritmo | Tipo de criptografía | Clave de firma / verificación | Tamaño típico de firma | Distribución en microservicios | Uso recomendado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `HS256` | Simétrica (HMAC-SHA256) | Misma clave secreta compartida | 32 bytes (43 chars) | Difícil de aislar; quien verifica puede firmar | Monolitos internos o servicio emisor y receptor único |
| `RS256` | Asimétrica (RSA PKCS#1 v1.5 + SHA-256) | Privada firma / Pública verifica | 256 bytes (2048 bits) | Sencilla mediante endpoint público JWKS | Estándar empresarial OAuth 2.0 / OpenID Connect |
| `PS256` | Asimétrica (RSA-PSS + SHA-256) | Privada firma / Pública verifica | 256 bytes (2048 bits) | Sencilla mediante endpoint público JWKS | Entornos de alta seguridad con requisitos modernos de relleno |
| `ES256` | Asimétrica (ECDSA P-256 + SHA-256) | Privada firma / Pública verifica | 64 bytes (86 chars) | Sencilla mediante JWKS; menor ancho de banda | APIs móviles, IoT y alto tráfico con baja latencia |
| `EdDSA` | Asimétrica (Curva Ed25519) | Privada firma / Pública verifica | 64 bytes (86 chars) | Sencilla mediante JWKS | Arquitecturas modernas de alto rendimiento |
| `none` | Sin firma criptográfica | Ninguna | 0 bytes (vacía) | Prohibido en producción | Inaceptable; vector histórico de evasión de autenticación |

## Errores Críticos de Seguridad, Almacenamiento y Privacidad

Incluso utilizando librerías criptográficas consolidadas, cuatro fallos de diseño siguen comprometiendo implementaciones reales basadas en JWT:

* **Almacenar datos sensibles en un JWS:** Un JWT firmado estándar es completamente transparente para cualquier cliente o proxy intermedio que capture la cadena. Jamás incluya contraseñas, números de tarjetas, secretos internos ni datos personales sensibles salvo que emplee cifrado completo **JWE (RFC 7516)** o mantenga esos atributos exclusivamente en el servidor.
* **Aceptar el algoritmo indicado por el atacante:** Si la biblioteca de validación lee `header.alg` sin restringir explícitamente el algoritmo esperado, un atacante puede forzar `alg: "none"` o degradar un flujo asimétrico `RS256` a simétrico `HS256` usando la clave pública distribuida en JWKS.
* **Tokens de larga duración sin estrategia de revocación:** Dado que los JWT son auto-contenidos (*stateless*), invalidar un token robado antes de su `exp` requiere mantener una lista de denegación en caché distribuida (usando el campo `jti`). La práctica recomendada combina tokens de acceso muy breves (5 a 15 minutos) con *refresh tokens* rotatorios revocables.
* **Pegar tokens reales en depuradores en la nube:** Un JWT de producción vigente equivale temporalmente a la contraseña del usuario; enviarlo a un sitio externo que registre peticiones HTTP entrega acceso directo a su API. Una arquitectura **Zero-Cloud** del lado del cliente garantiza que el token permanezca siempre en la memoria local de su navegador.
