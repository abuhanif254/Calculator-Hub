---
metaTitle: "Generador de .htaccess para Apache | Redirecciones y SEO"
metaDescription: "Genere archivos .htaccess seguros para Apache 2.4 con redirecciones 301, HTTPS forzado, compresión Gzip, caché de navegador y cabeceras de seguridad."
metaKeywords: "generador htaccess, crear archivo htaccess, redireccion 301 apache, forzar https htaccess, mod_rewrite flags, apache 2.4 require all denied, compresion gzip htaccess, cabeceras seguridad apache"
title: "Generador de .htaccess"
shortDescription: "Genere configuraciones validadas de Apache .htaccess con reglas mod_rewrite, redirecciones 301/302/308, forzado HTTPS compatible con proxies, compresión Gzip/Brotli, caché de navegador y cabeceras HTTP de seguridad."
faqs:
  - question: "¿Por qué aparece un error 500 Internal Server Error justo después de subir mi .htaccess?"
    answer: "Un error 500 suele originarse por una directiva de un módulo no habilitado sin bloque IfModule, un error de sintaxis en expresiones regulares PCRE o el uso de directivas obsoletas de Apache 2.2 (Order Allow,Deny) en un servidor Apache 2.4 sin mod_access_compat."
  - question: "¿Cómo evito bucles infinitos al forzar HTTPS detrás de Cloudflare o un balanceador de carga?"
    answer: "Cuando el TLS termina en un proxy inverso, Apache recibe la petición interna por HTTP y la variable HTTPS siempre vale off. Debe comprobar también la cabecera HTTP:X-Forwarded-Proto para redirigir únicamente cuando el cliente original no llegó por HTTPS."
  - question: "¿Qué diferencia existe entre las banderas [L] y [END] en mod_rewrite?"
    answer: "La bandera [L] detiene el procesamiento de la pasada actual, pero en archivos .htaccess Apache reinicia el ciclo de reescritura para la nueva URI interna. La bandera [END] (disponible desde Apache 2.4) finaliza completamente todas las pasadas de reescritura y evita bucles sutiles."
  - question: "¿Es mejor usar .htaccess o colocar las reglas en el archivo VirtualHost de Apache?"
    answer: "Si tiene acceso de administrador al servidor (VPS o dedicado), declarar las reglas en VirtualHost con AllowOverride None es más rápido porque Apache lee la configuración una vez al arrancar y evita buscar archivos .htaccess en cada subdirectorio en cada petición HTTP."
  - question: "¿Cuál es la diferencia SEO entre redirecciones 301, 302, 307 y 308?"
    answer: "Las redirecciones 301 y 308 son permanentes y consolidan las señales de posicionamiento en la URL de destino; la 308 además garantiza que no cambie el método HTTP (POST sigue siendo POST). Las redirecciones 302 y 307 son temporales y mantienen la URL original indexada."
features:
  - "Generación de reglas mod_rewrite compatibles con Apache 2.4 y detección preventiva de bucles de redirección."
  - "Forzado de HTTPS y unificación canónica (www frente a dominio raíz) con soporte para proxies inversos y CDN."
  - "Constructor visual de redirecciones 301, 302, 307 y 308 con expresiones regulares y preservación de cadenas de consulta (QSA)."
  - "Módulos de rendimiento integrados con compresión mod_deflate/mod_brotli y cabeceras mod_expires más Cache-Control."
  - "Endurecimiento de seguridad mediante Options -Indexes, bloqueo de archivos sensibles (.env, .git) y cabeceras HSTS/CSP."
  - "Plantillas preconfiguradas para WordPress, aplicaciones SPA (React, Vue, Next.js estático) y migraciones de dominio."
useCases:
  - "Migrar la arquitectura de URLs o cambiar de dominio mediante redirecciones 301 masivas preservando la autoridad SEO."
  - "Consolidar las cuatro variantes de un sitio (http, https, www y sin www) en una única URL canónica en un solo salto."
  - "Configurar el enrutamiento de respaldo (fallback a index.html) para aplicaciones de página única desplegadas en hosting Apache."
  - "Mejorar Core Web Vitals y puntuaciones de PageSpeed activando compresión Gzip y caché inmutable para activos estáticos."
  - "Bloquear el acceso público a ficheros críticos de configuración como .env, composer.json, wp-config.php y directorios .git."
  - "Deshabilitar el listado automático de directorios e inyectar cabeceras de seguridad HTTP sin modificar el código de la aplicación."
howToSteps:
  - "Elija una plantilla base (Estándar, WordPress o SPA estática) o inicie una configuración personalizada desde cero."
  - "Active las reglas canónicas de protocolo (HTTPS) y subdominio (con o sin www), indicando si utiliza Cloudflare o un proxy inverso."
  - "Añada sus redirecciones 301/302 individuales o por patrón regex seleccionando las banderas adecuadas ([L], [NC], [QSA])."
  - "Configure las políticas de caché por tipo MIME y la compresión mod_deflate para HTML, CSS, JavaScript, JSON y SVG."
  - "Habilite las defensas de servidor (Options -Indexes, FilesMatch para archivos ocultos y cabeceras de seguridad)."
  - "Revise las advertencias de conflicto, descargue el archivo .htaccess y súbalo a la carpeta raíz pública (public_html o htdocs) conservando siempre una copia de respaldo."
---

El archivo **`.htaccess`** (*hypertext access*) es el mecanismo de configuración distribuida por directorio del servidor web **Apache HTTP Server**. Siempre que el host virtual habilite la directiva `AllowOverride All` (o permisos específicos como `FileInfo`, `AuthConfig` e `Indexes`), Apache interpreta este fichero en tiempo de ejecución sin necesidad de reiniciar el demonio `httpd`. Su potencia técnica es extraordinaria —controla reescrituras con expresiones regulares, negociación de caché, compresión al vuelo y políticas de acceso—, pero un solo carácter mal ubicado o una condición conflictiva basta para tumbar un sitio entero con un error `500 Internal Server Error` o un bucle de redirección infinito.

## Cómo evalúa Apache las reglas y evolución de 2.2 a 2.4

Cuando entra una solicitud HTTP hacia `/blog/articulo/`, Apache recorre la jerarquía del sistema de archivos desde la raíz del documento hasta el subdirectorio final buscando archivos `.htaccess` en cada nivel. Las directivas de un subdirectorio anulan las del directorio padre, motivo por el cual colocar configuraciones en `httpd.conf` o `<VirtualHost>` ofrece mejor latencia en servidores dedicados al evitar múltiples llamadas `stat()` por petición. En alojamientos compartidos, sin embargo, `.htaccess` sigue siendo el punto de control imprescindible.

Un punto de ruptura frecuente al migrar servidores es el cambio del módulo de control de acceso entre **Apache 2.2** y **Apache 2.4** (`mod_authz_core`). Mientras que Apache 2.2 empleaba `Order deny,allow` y `Deny from all`, Apache 2.4 exige `Require all denied`. Para mantener compatibilidad defensiva en servidores heterogéneos conviene envolver las reglas en `<IfModule mod_authz_core.c>`, evitando fallos al actualizar la versión del servidor.

## Anatomía de `mod_rewrite` y tabla de banderas críticas

El motor **`mod_rewrite`** procesa pares de condiciones (`RewriteCond`) seguidas de una regla (`RewriteRule patrón sustitución [banderas]`) evaluadas mediante expresiones regulares compatibles con Perl (PCRE). Las condiciones solo afectan a la `RewriteRule` inmediatamente posterior y, si no llevan el modificador `[OR]`, se encadenan con lógica `AND`.

| Bandera `mod_rewrite` | Función interna en el ciclo de Apache | Uso práctico habitual | Riesgo si se omite o usa mal |
| :--- | :--- | :--- | :--- |
| **`[R=301]` / `[R=308]`** | Emite redirección HTTP permanente al navegador | Migraciones de URL, forzado HTTPS y consolidación `www` | Sin `R=`, Apache hace una reescritura interna invisible sin actualizar la URL |
| **`[L]` (Last)** | Detiene la pasada actual de reglas en el contexto vigente | Finalizar una redirección o enrutamiento SPA | En `.htaccess`, Apache reinicia el ciclo con la nueva ruta interna |
| **`[END]`** | Aborta todas las pasadas futuras de reescritura (Apache 2.4+) | Evitar reevaluaciones en enrutadores front-controller | Provoca error 500 si el servidor aún ejecuta Apache 2.2 |
| **`[NC]` (No Case)** | Comparación insensible a mayúsculas y minúsculas | Coincidir nombres de host (`%{HTTP_HOST}`) o extensiones | Innecesaria en rutas Unix estrictamente minúsculas |
| **`[QSA]` (Query String Append)** | Conserva parámetros `?utm_source=...` al añadir otros nuevos | Reescribir URLs limpias hacia `index.php?ruta=$1` | Sin `[QSA]`, los parámetros originales se descartan al agregar una nueva query |
| **`[NE]` (No Escape)** | Evita volver a codificar caracteres como `#` o `%` en el destino | Redirecciones hacia anclas (`#seccion`) o rutas ya escapadas | Sin `[NE]`, `#` se transforma en `%23` y rompe el ancla en el navegador |

## Configuraciones de producción listas para desplegar

### 1. Forzado HTTPS y dominio canónico en un solo salto (compatible con CDN/proxy)

Encadenar una redirección `http -> https` y luego otra `no-www -> www` desperdicia tiempo de negociación TLS y diluye la velocidad percibida. Esta regla unifica ambos saltos y contempla proxies inversos mediante `X-Forwarded-Proto`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on [OR]
  RewriteCond %{HTTP:X-Forwarded-Proto} =http [OR]
  RewriteCond %{HTTP_HOST} ^www\.ejemplo\.com$ [NC]
  RewriteRule ^ https://ejemplo.com%{REQUEST_URI} [R=301,L,NE]
</IfModule>
```

Tras publicar la regla, compruebe siempre que la cadena resuelva en un único salto `301 -> 200` con el [Verificador de Redirecciones](/es/herramientas/redirect-checker).

### 2. Enrutamiento seguro para aplicaciones SPA (React, Vue, Next.js estático)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ /index.html [L]
</IfModule>
```

Las condiciones `!-f` y `!-d` garantizan que archivos reales (CSS, JS, imágenes o su archivo de rastreo creado con el [Generador de Robots.txt](/es/herramientas/robots-txt-generator) y su [Sitemap XML](/es/herramientas/sitemap-xml-generator)) se sirvan directamente sin redirigirse a `index.html`.

### 3. Compresión, caché diferenciada y endurecimiento de seguridad

```apache
Options -Indexes

<FilesMatch "^\.(env|git|htaccess|htpasswd)$|^(wp-config\.php|composer\.(json|lock))$">
  <IfModule mod_authz_core.c>
    Require all denied
  </IfModule>
</FilesMatch>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  <FilesMatch "\.(css|js|woff2|webp|avif|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.(html|htm)$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>
```

Aplicar `immutable` durante un año resulta seguro únicamente para activos versionados por hash (como `app.a4f9c2.js`); los documentos HTML deben usar `no-cache` para que el navegador valide cambios con `ETag` o `Last-Modified`. Valide siempre las cabeceras resultantes en vivo con el [Verificador de Cabeceras HTTP](/es/herramientas/http-header-checker).

## Resolución rápida de incidentes en Apache

- **Error 500 inmediato:** revise el registro `error_log` de Apache; las causas más habituales son un carácter Unicode invisible (BOM UTF-8 al inicio del archivo), un espacio faltante antes de `[R=301,L]` o una directiva `Header` sin `mod_headers` cargado.
- **Bucle `ERR_TOO_MANY_REDIRECTS`:** ocurre cuando Cloudflare está en modo *SSL Flexible* (habla por HTTP con su origen) y `.htaccess` comprueba únicamente `%{HTTPS} off`. Cambie Cloudflare a *Full (Strict)* y añada la comprobación de `X-Forwarded-Proto`.
- **Las reglas se ignoran por completo:** verifique que el bloque `<Directory>` del servidor principal tenga `AllowOverride All` (y no `AllowOverride None`) y que el nombre del archivo comience exactamente con un punto y sin extensión `.txt`.
