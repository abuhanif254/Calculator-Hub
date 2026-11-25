---
metaTitle: "Comprobador de Cabeceras HTTP | Seguridad, CORS y Caché"
metaDescription: "Inspeccione cabeceras HTTP en vivo, rastree hasta 5 redirecciones y audite CSP, HSTS, cookies, CORS, caché y compresión Brotli o Gzip al instante."
metaKeywords: "comprobador cabeceras http, analizador cabeceras http, auditoria seguridad http, comprobar hsts csp, verificador cors, cadenas de redireccion, comprobar cookies httponly, inspeccionar respuestas http"
title: "Comprobador de Cabeceras HTTP"
shortDescription: "Inspeccione cabeceras de respuesta HTTP en tiempo real, trace saltos de redirección manualmente y audite políticas de seguridad (CSP, HSTS, cookies), directivas CORS, compresión Brotli/Gzip y señales SEO técnicas."
faqs:
  - question: "¿Por qué JavaScript en el navegador no puede leer todas las cabeceras HTTP de un sitio remoto?"
    answer: "El estándar Fetch aplica la Política del Mismo Origen y solo expone cabeceras seguras para CORS (como Content-Type o Cache-Control), salvo que el servidor liste cabeceras extra en Access-Control-Expose-Headers. Realizar la consulta desde una ruta de servidor protegida contra SSRF permite capturar cada cabecera en crudo, cada Set-Cookie y todos los saltos 3xx."
  - question: "¿Cuál es la diferencia técnica entre las redirecciones HTTP 301/302 y 307/308?"
    answer: "Según la sección 15.4 de RFC 9110, los navegadores pueden convertir históricamente una petición POST en GET al seguir redirecciones 301 o 302. Los códigos 307 (redirección temporal) y 308 (redirección permanente) prohíben estrictamente alterar el método HTTP y el cuerpo, resultando imprescindibles en APIs y formularios."
  - question: "¿Por qué falla Access-Control-Allow-Origin: * cuando el frontend envía cookies o credenciales?"
    answer: "La especificación Fetch prohíbe combinar el comodín '*' con Access-Control-Allow-Credentials: true para impedir que cualquier dominio arbitrario ejecute peticiones autenticadas en nombre del usuario. Los servidores que aceptan credenciales deben devolver dinámicamente el origen autorizado y añadir Vary: Origin."
  - question: "¿Qué problema provoca omitir Vary: Accept-Encoding al activar compresión Brotli o Gzip?"
    answer: "Las redes CDN y los proxies inversos indexan la caché combinando la URL con las cabeceras listadas en Vary. Sin Vary: Accept-Encoding, una caché intermedia que guarde una respuesta comprimida con Brotli podría entregar bytes binarios ilegibles a un cliente antiguo o rastreador que solo solicitó texto sin comprimir."
  - question: "¿En qué se diferencian exactamente Cache-Control: no-cache y Cache-Control: no-store?"
    answer: "Pese a su nombre, no-cache autoriza al navegador y a los proxies a guardar una copia local siempre que la revaliden con el origen mediante ETag o Last-Modified antes de reutilizarla. En cambio, no-store prohíbe almacenar cualquier copia en memoria o disco y debe reservarse para respuestas bancarias, de autenticación o datos personales."
features:
  - "Trazado manual de cadenas de redirección (hasta 5 saltos) con medición de latencia por salto y detección automática de bucles circulares."
  - "Puntuación ponderada de seguridad que audita CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy y exposición del servidor."
  - "Análisis granular de múltiples cabeceras Set-Cookie verificando indicadores Secure, HttpOnly, SameSite, Expires y Max-Age sin errores por comas en fechas."
  - "Verificación de SEO técnico en capa HTTP: X-Robots-Tag, enlaces Link rel='canonical', actualización automática a HTTPS y presencia de Vary: Accept-Encoding."
  - "Diagnóstico de caché y compresión inspeccionando directivas Cache-Control, validadores ETag/Last-Modified y codificación Brotli o Gzip."
  - "Selección de método GET o HEAD y personalización de User-Agent protegidas mediante resolución DNS y filtrado anti-SSRF de redes privadas en cada salto."
useCases:
  - "Validar políticas Content-Security-Policy y Strict-Transport-Security en producción antes de solicitar el alta en la lista global HSTS Preload."
  - "Depurar llamadas fallidas entre orígenes en APIs REST y GraphQL inspeccionando Access-Control-Allow-Origin, Methods, Headers y Expose-Headers."
  - "Auditar el acierto de caché en CDN, activos estáticos con immutable y revalidaciones condicionales 304 Not Modified tras editar proxies inversos."
  - "Comprobar que antiguas direcciones HTTP y variantes con o sin www redirigen limpiamente hacia el destino canónico HTTPS sin bucles."
  - "Confirmar que las cookies de sesión emitidas en Set-Cookie imponen HttpOnly, Secure y SameSite adecuado en entornos productivos."
  - "Verificar directivas X-Robots-Tag y cabeceras canónicas Link en archivos no HTML como documentos PDF, imágenes o feeds JSON para SEO técnico."
howToSteps:
  - "Pegue cualquier URL pública HTTP o HTTPS en el campo de destino; si omite el protocolo, la herramienta aplicará HTTPS por defecto."
  - "Elija el método de sondeo (GET para obtener la respuesta completa o HEAD para recibir únicamente cabeceras) y ajuste el User-Agent si desea emular un bot o navegador concreto."
  - "Inicie la inspección para recorrer cada salto de redirección manualmente registrando códigos de estado, tiempos de respuesta y cabeceras sin alterar."
  - "Revise las tarjetas de puntuación de Seguridad, SEO y Rendimiento para identificar cabeceras ausentes, comodines peligrosos en CSP o cargas sin compresión."
  - "Despliegue las pestañas de Cookies, CORS y Cabeceras Raw para validar los atributos individuales de Set-Cookie y los permisos de origen cruzado."
  - "Repita la prueba inmediatamente después de actualizar Nginx, Apache, Cloudflare o el middleware de su aplicación para confirmar la aplicación real."
---

Cada intercambio HTTP inicia con una línea de estado y un bloque de cabeceras regido por **RFC 9110 (HTTP Semantics)**. Estas directivas controlan el aislamiento de seguridad del navegador, la protección frente a degradaciones TLS, el acceso entre orígenes, la caché perimetral y el rastreo de buscadores —imponiéndose con frecuencia sobre las etiquetas `<meta>` del HTML—. Como `fetch()` en cliente oculta `Set-Cookie` y filtra campos restringidos por CORS, auditar un endpoint real exige una sonda en servidor que capture cada salto de redirección y cada línea en bruto.

## Endurecimiento de cabeceras de seguridad y referencia base

Los navegadores modernos incluyen defensas críticas que solo se activan cuando el origen las declara explícitamente. Revisarlas detecta debilidades como `'unsafe-inline'` en CSP o banners `Server` y `X-Powered-By` que exponen versiones exactas a escáneres automáticos:

| Cabecera | Estándar | Base recomendada en producción | Amenaza mitigada |
| :--- | :--- | :--- | :--- |
| `Content-Security-Policy` | W3C CSP 3 | `default-src 'self'; script-src 'self' 'nonce-{rand}'; object-src 'none'; frame-ancestors 'none'` | XSS, inyección de scripts en línea y exfiltración. |
| `Strict-Transport-Security` | RFC 6797 | `max-age=31536000; includeSubDomains; preload` | *SSL-stripping* y degradación de HTTPS a HTTP. |
| `X-Frame-Options` | RFC 7034 | `DENY` o `SAMEORIGIN` (junto a `frame-ancestors`) | *Clickjacking* mediante iframes externos. |
| `X-Content-Type-Options` | Fetch | `nosniff` | Inferencia MIME que ejecuta imágenes o texto como JS. |
| `Referrer-Policy` | W3C | `strict-origin-when-cross-origin` | Fuga de rutas privadas o tokens en `Referer`. |
| `Permissions-Policy` | W3C | `camera=(), microphone=(), geolocation=()` | Acceso no autorizado a sensores desde iframes. |
| `Set-Cookie` | RFC 6265bis | `Secure; HttpOnly; SameSite=Lax; Path=/` | Robo de sesión vía XSS, tráfico sin cifrar y CSRF. |

Antes de activar una política CSP estricta en sitios heredados, conviene desplegar primero `Content-Security-Policy-Report-Only` para recoger infracciones reales sin bloquear scripts legítimos en producción. En aplicaciones que requieren aislamiento de proceso o `SharedArrayBuffer`, combine además `Cross-Origin-Opener-Policy: same-origin` con `Cross-Origin-Resource-Policy: same-origin`.

Al analizar múltiples `Set-Cookie`, dividir por comas falla con fechas como `Expires=Thu, 19 Nov 2026 ...`; un cliente conforme lee cada cookie por separado vía `headers.getSetCookie()`. Elija `SameSite=Lax` para sesiones generales, reserve `SameSite=Strict` para paneles administrativos y limite `SameSite=None; Secure` a flujos entre dominios como pasarelas de pago o proveedores OAuth. Para ocultar firmas del servidor, aplique `server_tokens off;` en Nginx, `ServerTokens Prod` en Apache o `app.disable('x-powered-by')` en Express.

## Redirecciones, semántica de métodos y defensa anti-SSRF

Seguir redirecciones de forma silenciosa borra las cabeceras intermedias, ocultando saltos `302` innecesarios, ausencias de paso a HTTPS o cookies descartadas en ruta. El trazado manual expone el código, `Location` y latencia de cada salto.

La sección 15.4 de RFC 9110 diferencia dos pares clave:

- **`301` frente a `308` (permanentes):** ambos consolidan señales canónicas SEO, pero `301` permite reescribir `POST` a `GET`, mientras que `308` preserva estrictamente el método y el cuerpo.
- **`302` frente a `307` (temporales):** `307` prohíbe alterar el método original en APIs y formularios.
- **Bucles y protección anti-SSRF por salto:** una sonda segura resuelve el DNS y bloquea redes privadas RFC 1918, *loopback* (`127.0.0.0/8`, `::1`) y metadatos *link-local* (`169.254.169.254`) en **cada salto**, neutralizando redirecciones hacia infraestructura interna.

Para auditorías masivas de rutas utilice también el [Comprobador de Redirecciones](/es/herramientas/redirect-checker) y valide la resolución previa del dominio en [Consulta DNS](/es/herramientas/dns-lookup).

## Caché RFC 9111, compresión, CORS y SEO en capa HTTP

### Frescura, revalidación y clave Vary

Las aplicaciones de alto tráfico combinan tres piezas de RFC 9111:

1. **Frescura:** activos versionados por *hash* (`app.9f3a2c.js`) deben emitir `Cache-Control: public, max-age=31536000, immutable`. Documentos HTML y APIs dinámicas requieren `no-cache` (guardar y revalidar) o `private, no-store` en datos sensibles.
2. **Validadores condicionales:** un `ETag` fuerte (`"a84f91c2"`) o débil (`W/"..."`) junto a `Last-Modified` permite responder `304 Not Modified` ante `If-None-Match`.
3. **Compresión, transporte y `Vary`:** Brotli (`Content-Encoding: br`) ahorra entre 15 % y 20 % frente a `gzip`, pero requiere `Vary: Accept-Encoding` para que la CDN separe variantes comprimidas y sin comprimir; compruebe también cabeceras como `Alt-Svc` si anuncia negociación HTTP/3 sobre QUIC.

### Depuración de CORS y control de indexación

Cuando una petición entre orígenes incluye `Authorization` o `Content-Type: application/json`, el navegador envía un *preflight* `OPTIONS`. La inspección detecta enseguida fallos críticos: `Access-Control-Allow-Origin: *` rompe llamadas con `credentials: 'include'`, omitir `Access-Control-Expose-Headers` oculta cabeceras de cuota al frontend y no fijar `Access-Control-Max-Age` repite consultas `OPTIONS` en cada mutación. Si evalúa políticas de incrustación `X-Frame-Options` o `frame-ancestors`, verifique también cómo responden sus vistas embebidas en el [Probador de Pantallas Responsivas](/es/herramientas/responsive-screen-tester).

En archivos no HTML (PDF, descargas o feeds JSON), las cabeceras `X-Robots-Tag: noindex, nofollow` y `Link: <https://ejemplo.com/guia>; rel="canonical"` controlan la indexación directamente en red. Auditarlas impide fugas de `noindex` desde preproducción y permite verificar la exactitud del tipo de contenido con el [Comprobador de Tipos MIME](/es/herramientas/mime-type-checker).

## Reproducción de auditorías en terminal y CI/CD

Para replicar la inspección salto a salto en pruebas automáticas, ejecute `curl` con `-D -` y `--compressed`:

```bash
# Inspeccionar cadena de redirecciones, códigos y compresión Brotli/Gzip
curl -sSL -D - -o /dev/null --compressed \
  -A "Mozilla/5.0 (compatible; AuditoriaHTTP/1.0)" \
  https://ejemplo.com

# Probar una solicitud preflight OPTIONS de CORS
curl -i -X OPTIONS https://api.ejemplo.com/v1/recursos \
  -H "Origin: https://app.ejemplo.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Authorization, Content-Type"
```

Si gestiona servidores Apache, genere directivas canónicas HTTPS y cabeceras `Header always set` en el [Generador de .htaccess](/es/herramientas/htaccess-generator) y compruebe aquí mismo que cada política responda en producción.
