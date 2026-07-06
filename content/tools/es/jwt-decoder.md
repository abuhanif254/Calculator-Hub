---
metaTitle: "Decodificador JWT Online | JSON Web Token Parser"
metaDescription: "Analizador y decodificador avanzado de JSON Web Token (JWT). Analiza el encabezado, los claims del payload, la fecha de expiración y algoritmos al instante."
metaKeywords: "decodificador jwt, decodificar jwt, analizador json web token, jwt parser, inspector jwt, analizar jwt online, firmas jwt"
title: "Decodificador JWT"
shortDescription: "Decodificador avanzado de JSON Web Token (JWT). Analiza el encabezado, los claims del payload y las fechas de expiración al instante."
faqs:
  - question: "¿Qué es un JWT?"
    answer: "Un JSON Web Token (JWT) es un estándar (RFC 7519) que define una forma compacta y autónoma para transmitir información de forma segura entre las partes como un objeto JSON. Se usa comúnmente para autorización."
  - question: "¿Es seguro decodificar un JWT en línea?"
    answer: "Sí, nuestra herramienta Decodificador JWT se ejecuta completamente localmente en su navegador. Nunca se envían datos a nuestros servidores, lo que hace que sea 100% seguro inspeccionar tokens confidenciales."
  - question: "¿Por qué cualquiera puede leer el payload del JWT?"
    answer: "Los JWT solo están codificados en Base64Url, no encriptados. Están diseñados para garantizar la integridad de los datos (a través de la firma), no la confidencialidad. No se deben almacenar datos confidenciales en un JWT estándar sin cifrar."
  - question: "¿Qué sucede si un token expira?"
    answer: "Cuando un servidor verifica un JWT, comprueba el claim 'exp' (expiración). Si la hora actual supera la hora de expiración, el servidor rechazará el token con un error 401."
  - question: "¿Qué es el algoritmo 'none'?"
    answer: "El algoritmo 'none' significa que el token no está firmado. Esto es extremadamente peligroso ya que permite a cualquiera modificar el payload. Los sistemas seguros siempre deben rechazar tokens que usen el algoritmo 'none'."
features:
  - "Análisis instantáneo en tiempo real del encabezado (Header) y payload de JWT"
  - "Decodificación automática de Base64Url y resaltado de sintaxis JSON"
  - "Análisis detallado de la línea de tiempo para los claims exp, iat y nbf"
  - "Indicadores visuales de estado para la validez y expiración del token"
  - "Detección de algoritmos (HS256, RS256, ES256, etc.)"
  - "Análisis de seguridad para el algoritmo 'none' y expiraciones faltantes"
  - "100% ejecución local del lado del cliente: tus tokens nunca salen del navegador"
useCases:
  - "Depuración de flujos de autenticación en aplicaciones de una sola página (React, Angular, Vue)"
  - "Inspección de claims (permisos) otorgados por OAuth 2.0 u OpenID Connect"
  - "Verificación de las fechas de expiración de los tokens emitidos por el servidor backend"
  - "Investigación de errores de 'Firma Inválida' (Invalid Signature) en API"
  - "Inspección de claims personalizados inyectados por el middleware del servidor"
howToSteps:
  - "Localiza tu cadena JWT. Debe constar de tres bloques de texto separados por puntos."
  - "Pega el token completo en el área de entrada."
  - "La herramienta analizará y decodificará instantáneamente el token."
  - "Revisa la sección 'Header' para ver el tipo de token y el algoritmo."
  - "Inspecciona la sección 'Payload' para ver los datos del usuario incrustados."
  - "Revisa el panel de 'Expiration' para ver las fechas en formato legible de cuándo se emitió y cuándo expira."
---

## ¿Qué es un JWT?

**JSON Web Token (JWT)** es un estándar abierto (RFC 7519) que define una forma compacta y autónoma para transmitir información de forma segura entre las partes como un objeto JSON. Esta información puede ser verificada y confiable porque está firmada digitalmente. Los JWT se pueden firmar usando un secreto (con el algoritmo HMAC) o un par de claves pública/privada usando RSA o ECDSA.

Los JWT se utilizan ampliamente en aplicaciones web modernas, particularmente en aplicaciones de una sola página (SPA) y arquitecturas sin estado, para **autenticación** e **intercambio de información**.

---

## Estructura de JWT

Un JSON Web Token consta de tres partes separadas por puntos (`.`):

1. **Header (Encabezado)**: Contiene metadatos sobre el tipo de token y los algoritmos criptográficos utilizados para asegurar su contenido.
2. **Payload (Claims)**: Contiene las declaraciones sobre una entidad (típicamente, el usuario) y datos adicionales.
3. **Signature (Firma)**: Se utiliza para verificar que el remitente del JWT es quien dice ser y para garantizar que el mensaje no haya sido modificado en el camino.

Cuando se combinan, estas tres partes suelen verse así: `xxxxx.yyyyy.zzzzz`

### 1. El Encabezado

El encabezado generalmente consta de dos partes: el tipo de token (JWT) y el algoritmo de firma (ej. HMAC SHA256 o RSA). Este JSON se codifica en **Base64Url** para formar la primera parte del JWT.

### 2. El Payload

La segunda parte es el payload, que contiene los claims (declaraciones). Los claims son declaraciones sobre una entidad (generalmente el usuario) y datos adicionales. Hay tres tipos de claims: registrados, públicos y privados.

**Claims registrados**: Son reclamaciones predefinidas (no obligatorias pero recomendadas):
- `iss` (Emisor): Quién emitió el token.
- `exp` (Tiempo de expiración): Cuándo expira el token.
- `sub` (Sujeto): A quién se refiere el token.
- `aud` (Audiencia): Para quién está destinado el token.
- `iat` (Emitido en): Cuándo se creó el token.
- `nbf` (No antes de): Cuándo el token comienza a ser válido.

El payload luego se codifica en **Base64Url** para formar la segunda parte del JWT.

*Ten en cuenta que para los tokens firmados, esta información es legible por cualquiera. No introduzcas información secreta en el payload o encabezado a menos que esté encriptado.*

### 3. La Firma

Para crear la firma, debes tomar el encabezado codificado, el payload codificado, un secreto, el algoritmo especificado en el encabezado y firmar todo eso.

---

## Mejores Prácticas de Seguridad JWT

- **Siempre verifica la firma**: Asegúrate de que tu aplicación valide la firma del token en el lado del servidor antes de confiar en el payload.
- **No almacenes datos confidenciales**: El payload solo está codificado en Base64Url, no encriptado.
- **Mantén los tokens de corta duración**: Utiliza la reclamación `exp` para limitar la vida útil de un token (ej. 15 minutos).
- **Usa Refresh Tokens (Tokens de actualización)**: Para sesiones largas, usa tokens de acceso de corta duración (JWT) emparejados con tokens de actualización de larga duración.
- **Usa algoritmos fuertes**: No permitas el algoritmo `none`. Usa `RS256` o `HS256` con una clave secreta larga.

---

## Expiración de JWT y Marcas de Tiempo

JWT utiliza el tiempo Epoch de Unix (el número de segundos transcurridos desde el 1 de enero de 1970) para sus claims basados en tiempo. Nuestro decodificador analiza automáticamente estos valores y los muestra en fechas legibles locales, indicando si el token está activo o expirado.
