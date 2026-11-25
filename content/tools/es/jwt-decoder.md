---
metaTitle: "Decodificador JWT Online | Analiza Header, Payload y Exp"
metaDescription: "Decodifica y analiza JSON Web Tokens (JWT) al instante en tu navegador. Inspecciona encabezados JOSE, claims, expiración Unix y algoritmos."
metaKeywords: "decodificador jwt, decodificar jwt online, analizador json web token, jwt parser, inspeccionar claims jwt, verificar expiración jwt, algoritmos jws, base64url jwt"
title: "Decodificador JWT"
shortDescription: "Decodificador e inspector avanzado de JSON Web Tokens (JWT). Analiza encabezados JOSE, claims del payload, marcas de tiempo Unix y riesgos de algoritmos al instante en tu navegador."
faqs:
  - question: "¿Decodificar un JWT verifica automáticamente que su firma criptográfica sea válida?"
    answer: "No. Decodificar solo traduce los segmentos Base64url del encabezado y el payload a JSON legible. Para confiar en los claims dentro de un sistema real, el servidor debe verificar la firma criptográfica con la clave secreta o pública autorizada y comprobar emisores, audiencias y caducidad."
  - question: "¿Por qué cualquiera puede leer los datos del payload de un JWT sin conocer la clave?"
    answer: "En un JWT firmado estándar (JWS según RFC 7515), el encabezado y el payload únicamente se codifican en Base64url para facilitar su transporte en cabeceras HTTP. La firma garantiza integridad y autenticidad, no confidencialidad; por eso nunca debes incluir secretos ni contraseñas en un JWS."
  - question: "¿Qué diferencia existe entre un JWT de tres partes (JWS) y uno de cinco partes (JWE)?"
    answer: "Un JWS (JSON Web Signature) consta de tres segmentos separados por puntos (Header.Payload.Signature) con contenido legible y firmado. Un JWE (JSON Web Encryption, RFC 7516) utiliza cinco segmentos para cifrar el payload de forma autenticada, impidiendo su lectura sin la clave de descifrado."
  - question: "¿Por qué a veces un JWT muestra fechas de expiración en el año 50000 o erróneas?"
    answer: "RFC 7519 define los claims temporales exp, iat y nbf como NumericDate en segundos desde el Epoch Unix (1 de enero de 1970 UTC). Un error frecuente consiste en inyectar Date.now() en milisegundos en lugar de dividir por 1000, lo que desplaza la fecha miles de años en el futuro."
  - question: "¿Por qué el algoritmo none y la confusión de algoritmos son vulnerabilidades críticas en JWT?"
    answer: "Si un verificador confía ciegamente en el campo alg del encabezado, un atacante puede fijar alg en none para omitir la firma o cambiar RS256 por HS256 y firmar un token manipulado usando la clave pública RSA del servidor como secreto HMAC. Siempre debes exigir una lista cerrada de algoritmos permitidos."
features:
  - "Separación y decodificación instantánea de los segmentos Base64url del Header JOSE y el Payload JSON"
  - "Evaluación automática de los claims temporales exp, iat y nbf en formato Epoch Unix y hora local legible"
  - "Identificación del algoritmo de firma declarado (HS256, RS256, PS256, ES256, EdDSA) y del identificador kid"
  - "Alertas de seguridad inmediatas ante tokens con alg none, ausencia de expiración o estructura malformada"
  - "Resaltado sintáctico del JSON decodificado para auditar roles, alcances (scopes) y metadatos OIDC"
  - "Ejecución 100% local en el navegador: tus tokens de sesión y credenciales bearer nunca viajan a servidores externos"
useCases:
  - "Depuración de flujos de inicio de sesión OAuth 2.0 y OpenID Connect en aplicaciones SPA y clientes móviles"
  - "Auditoría de claims personalizados, roles RBAC y permisos (scopes) emitidos por proveedores como Auth0, Cognito o Keycloak"
  - "Diagnóstico rápido de rechazos HTTP 401 por expiración (exp), activación diferida (nbf) o desfase de reloj entre nodos"
  - "Verificación de la rotación de claves públicas JWKS inspeccionando el parámetro kid en el encabezado JOSE"
  - "Inspección de tokens de servicio a servicio en arquitecturas de microservicios y API gateways"
  - "Revisión de seguridad durante pruebas de penetración para detectar exposición indebida de PII o algoritmos débiles"
howToSteps:
  - "Copia la cadena JWT completa (tres bloques separados por puntos, sin el prefijo 'Bearer ') desde las DevTools o logs."
  - "Pega el token en el panel de entrada para iniciar el análisis automático en memoria local."
  - "Inspecciona el bloque Header para comprobar el tipo de token (typ), el algoritmo (alg) y la clave referenciada (kid)."
  - "Analiza el bloque Payload para revisar los claims registrados (iss, sub, aud) y los permisos personalizados."
  - "Comprueba los indicadores de línea temporal para saber si el token está vigente, pendiente (nbf) o caducado (exp)."
  - "Verifica los avisos de seguridad antes de validar la firma criptográfica en tu backend o librería oficial."
---

Un JSON Web Token (JWT), definido en RFC 7519, proporciona un formato compacto, autocontenido y apto para URL destinado a transmitir declaraciones de identidad y autorización como objetos JSON. En arquitecturas sin estado —APIs REST, microservicios, OAuth 2.0 y OpenID Connect— el cliente envía el token en la cabecera `Authorization: Bearer <token>` para evitar consultas constantes a bases de sesiones. Este decodificador analiza el JWT en tu navegador, traduce sus segmentos Base64url a JSON estructurado, evalúa las marcas temporales Unix y señala riesgos en el algoritmo declarado sin transmitir tus credenciales a servidores externos.

## Anatomía de la serialización compacta: JWS frente a JWE

La gran mayoría de los JWT utilizados en producción emplean **JWS (JSON Web Signature, RFC 7515)** en serialización compacta de tres segmentos separados por puntos (`.`):

```text
BASE64URL(UTF8(JOSE Header)) . BASE64URL(Payload) . BASE64URL(Signature)
```

Cada bloque utiliza Base64url (RFC 4648 §5) sin caracteres `=` de relleno; si deseas explorar cómo se normalizan estos bytes, consulta nuestro [Decodificador Base64](/es/herramientas/base64-decode). El encabezado JOSE suele declarar `alg` (algoritmo), `typ` (tipo de medio, por ejemplo `JWT` o `at+jwt` según RFC 9068 para tokens de acceso) y `kid` (identificador de clave para rotación JWKS). Al decodificar los dos primeros segmentos se obtienen dos objetos JSON:

```json
// Header JOSE
{ "alg": "RS256", "typ": "at+jwt", "kid": "auth-2026-rsa-01" }

// Payload (Claims)
{
  "iss": "https://auth.ejemplo.com/",
  "sub": "usr_948271",
  "aud": "https://api.ejemplo.com/v2",
  "iat": 1795572000,
  "nbf": 1795572000,
  "exp": 1795572900,
  "jti": "9f8c2a1b-4d7e-4b3a-a12c-88e7d6c5b4a3",
  "scope": "orders:read invoices:write"
}
```

Conviene distinguir un JWS (3 segmentos) de un **JWE (JSON Web Encryption, RFC 7516)**, que consta de **cinco segmentos** (`Header.EncryptedKey.IV.Ciphertext.AuthTag`). Mientras JWE cifra la carga de forma autenticada, un JWS solo firma su contenido: cualquier parte que intercepte un JWS puede leer su payload, aunque no modificarlo sin invalidar la firma.

## Claims registrados, marcas temporales Unix y desfase de reloj

RFC 7519 clasifica las declaraciones en claims **registrados**, **públicos** y **privados**. Los claims registrados esenciales para el control de acceso son:

- **`iss` (Issuer):** identificador exacto del proveedor de identidad emisor.
- **`sub` (Subject):** identificador único del usuario o entidad principal.
- **`aud` (Audience):** servicio concreto destinatario del token (puede ser una cadena o una matriz de identificadores); omitir su comprobación permite reutilizar tokens entre APIs distintas (*confused deputy*). En flujos OpenID Connect con varias audiencias también suele evaluarse `azp` (*Authorized Party*).
- **`jti` (JWT ID):** identificador único para mitigar ataques de repetición (*replay*) o mantener listas breves de revocación tras un cierre de sesión forzado.
- **`iat`, `nbf` y `exp`:** instantes de emisión, inicio de validez (*Not Before*) y expiración.

Todas las marcas temporales usan `NumericDate`: segundos enteros desde el Epoch Unix (`1970-01-01T00:00:00Z`). Inyectar milisegundos (`Date.now()`) en lugar de segundos produce tokens válidos durante milenios. Asimismo, en clústeres distribuidos cuyos servidores NTP difieren ligeramente, las librerías aplican un margen de tolerancia (*clock skew* o *leeway*) de 30 a 60 segundos al evaluar `nbf` y `exp`. Para inspeccionar payloads extensos con objetos anidados, puedes utilizar también el [Formateador JSON](/es/herramientas/json-formatter).

## Comparativa de algoritmos criptográficos de firma (RFC 7518)

| Algoritmo | Tipo | Primitiva criptográfica | Gestión de claves | Estado y uso recomendado |
| :--- | :--- | :--- | :--- | :--- |
| **HS256** | Simétrico | HMAC + SHA-256 | Secreto compartido (≥ 256 bits) | Seguro en entornos internos con secreto robusto |
| **RS256** | Asimétrico | RSASSA-PKCS1-v1_5 + SHA-256 | Par RSA (≥ 2048 bits) vía JWKS | Estándar clásico compatible con OAuth 2.0 y OIDC |
| **PS256** | Asimétrico | RSASSA-PSS + SHA-256 | Par RSA (≥ 2048 bits) vía JWKS | Preferible sobre RS256 por su relleno probabilístico |
| **ES256** | Asimétrico | ECDSA curva P-256 + SHA-256 | Par elíptico compacto vía JWKS | Alto rendimiento y firmas compactas (~64 bytes) |
| **EdDSA** | Asimétrico | Ed25519 (RFC 8037) | Par Edwards compacto vía JWKS | Determinista, veloz y resistente a canales laterales |
| **none** | Sin firma | Ninguna | Sin clave | **Inseguro**: debe rechazarse siempre en producción |

En arquitecturas distribuidas, los esquemas asimétricos (`ES256`, `RS256`, `PS256`, `EdDSA`) simplifican la rotación periódica de claves sin interrumpir sesiones activas: el emisor publica la nueva clave pública en `/.well-known/jwks.json` junto a la anterior, firma con el nuevo `kid` y retira la clave antigua cuando expiran los tokens previos. Para depurar firmas simétricas `HS256` o `HS512`, apóyate en nuestro [Generador HMAC](/es/herramientas/hmac-generator).

## Verificación criptográfica en servidor e inspección CLI

Decodificar no valida la autenticidad. Tu servidor debe verificar siempre la firma imponiendo una lista cerrada de algoritmos permitidos:

```javascript
import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS = createRemoteJWKSet(
  new URL('https://auth.ejemplo.com/.well-known/jwks.json')
);

const { payload } = await jwtVerify(token, JWKS, {
  algorithms: ['RS256'],
  issuer: 'https://auth.ejemplo.com/',
  audience: 'https://api.ejemplo.com/v2',
  clockTolerance: '30s'
});
```

Para inspeccionar el payload rápidamente desde terminal (solo diagnóstico, sin verificar firma):

```bash
printf '%s' "$JWT" | cut -d'.' -f2 | tr '_-' '/+' | base64 -d 2>/dev/null | jq .
```

## Riesgos críticos de seguridad en producción

Al auditar implementaciones JWT, elimina cuatro vulnerabilidades frecuentes:

1. **Aceptación de `alg: none`:** rechaza incondicionalmente tokens sin firma en cualquier ruta autenticada.
2. **Confusión de algoritmos (`RS256` → `HS256`):** si el verificador infiere el método desde el encabezado no confiable, un atacante puede firmar un token falsificado usando la clave pública RSA del servidor como secreto HMAC.
3. **Inyección en `kid`, `jku` y `jwk`:** restringe `kid` a identificadores conocidos para evitar SQLi o *path traversal*, y bloquea la descarga de claves desde URLs arbitrarias declaradas dentro del propio token.
4. **Revocación, transporte y exposición XSS:** como un JWT sin estado sigue siendo válido hasta `exp`, evita pasarlo en parámetros de consulta URL que quedan registrados en proxies, mantén *access tokens* breves (5–15 minutos) combinados con *refresh tokens* rotativos, aplica listas de revocación por `jti` en cierres críticos y guárdalos en cookies `HttpOnly`, `Secure` y `SameSite` antes que en `localStorage`.
