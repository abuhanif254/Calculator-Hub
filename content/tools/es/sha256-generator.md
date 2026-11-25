---
metaTitle: "Generador SHA-256 Online | Hash Seguro con Web Crypto API"
metaDescription: "Genera hashes SHA-256 de 256 bits para texto y archivos locales con Web Crypto API y lectura en bloques de 2 MB. Verifica checksums con privacidad."
metaKeywords: "generador sha256, hash sha-256 online, calcular checksum sha256, texto a sha256, archivo a sha256, web crypto api sha256, verificar integridad de archivo, sha256sums, sri sha256, fips 180-4"
title: "Generador SHA256"
shortDescription: "Calcula resúmenes SHA-256 (FIPS 180-4) para texto UTF-8 y archivos locales en tu navegador usando Web Crypto API nativa y lectura progresiva en bloques. Compara sumas de comprobación al instante sin subir datos."
faqs:
  - question: "¿Cómo procesa el motor híbrido de Web Crypto y bloques de 2 MB los archivos grandes?"
    answer: "Las cadenas de texto y los archivos de hasta 20 MB se procesan directamente con la función nativa window.crypto.subtle.digest('SHA-256') para ofrecer velocidad cercana al código compilado. Cuando un archivo supera los 20 MB, la herramienta cambia automáticamente a lectura progresiva en bloques de 2 MB para evitar fallos por falta de memoria en la pestaña."
  - question: "¿Sigue siendo SHA-256 criptográficamente seguro frente a ataques modernos y cuánticos?"
    answer: "Sí. Estandarizado en NIST FIPS 180-4, SHA-256 proporciona 128 bits de resistencia clásica frente a colisiones y 256 bits frente a preimagen. No existe ningún ataque práctico contra las 64 rondas completas, e incluso bajo el algoritmo cuántico de Grover conserva un margen de 128 bits frente a inversión."
  - question: "¿Por qué cambiar una sola letra o un espacio transforma por completo el resumen SHA-256?"
    answer: "SHA-256 exhibe un estricto efecto avalancha: sus 64 rondas iterativas de rotaciones bitwise, operaciones XOR y sumas modulares difunden cada bit de entrada sobre los ocho registros de 32 bits, haciendo que modificar un único bit cambie cerca del 50% de los 256 bits resultantes."
  - question: "¿Puedo cargar un archivo TXT, JSON o CSV directamente en el editor de texto o compartir un vector por URL?"
    answer: "Sí. Además de la pestaña binaria de archivos, el espacio de texto permite importar documentos de texto plano para inspeccionar el conteo de caracteres y bytes UTF-8, y generar un enlace con el parámetro ?text= para compartir vectores de prueba no confidenciales."
  - question: "¿Por qué el checksum SHA-256 de un mismo archivo de texto puede diferir entre Windows y Linux?"
    answer: "Windows suele terminar cada línea con CRLF (0x0D 0x0A), mientras que macOS y Linux usan LF (0x0A). Una marca de orden de bytes UTF-8 BOM (0xEF 0xBB 0xBF) oculta o un salto de línea agregado por echo alteran la secuencia exacta de bytes y generan un hash distinto."
features:
  - "Cálculo SHA-256 acelerado por hardware con Web Crypto API (SubtleCrypto) para texto y archivos de hasta 20 MB"
  - "Cambio automático a lectura progresiva en fragmentos de 2 MB para archivos superiores a 20 MB con barra de progreso en vivo"
  - "Zona de arrastrar y soltar para archivos binarios más importación directa de TXT, JSON y CSV al editor de texto"
  - "Panel de verificación insensible a mayúsculas y minúsculas para contrastar manifiestos SHA256SUMS al instante"
  - "Selector de formato hexadecimal, enlace compartible mediante parámetro ?text= y exportación del digest en archivo .txt"
  - "Historial local almacenado en localStorage con tus 10 cálculos más recientes sin comunicación alguna con servidores"
useCases:
  - "Verificar imágenes ISO de Linux, instaladores de macOS y binarios de código abierto frente a manifiestos SHA256SUMS"
  - "Generar identificadores inmutables direccionados por contenido para capas OCI/Docker y documentos SBOM"
  - "Calcular hashes Subresource Integrity (SRI) para fijar scripts de terceros en tuberías de integración continua"
  - "Auditar configuraciones, cargas JSON o documentos PDF legales ante alteraciones antes de firmarlos o archivarlos"
  - "Generar vectores de prueba deterministas al implementar árboles de Merkle, firmas criptográficas o herramientas blockchain"
  - "Validar copias de seguridad y paquetes corporativos confidenciales localmente sin subir archivos a servicios de terceros"
howToSteps:
  - "Mantente en 'Entrada de texto' para hashing UTF-8 en vivo o cambia a 'Hash de archivo' para binarios y paquetes."
  - "Escribe, pega o importa un archivo de texto plano en el editor, o arrastra cualquier archivo local a la zona de carga."
  - "Espera a que el motor nativo o el lector progresivo por bloques termine para inspeccionar el hash hexadecimal de 64 caracteres."
  - "Alterna entre minúsculas y mayúsculas según la convención exigida por tu manifiesto de lanzamiento o herramienta CI."
  - "Pega el hash oficial en el campo de comparación para comprobar una coincidencia exacta bit a bit."
  - "Copia el digest al portapapeles, comparte un enlace ?text= para vectores públicos o descarga el resultado en formato .txt."
---

**SHA-256 (Secure Hash Algorithm 256-bit)**, especificado en el estándar **NIST FIPS 180-4**, es la función resumen que sostiene gran parte de la seguridad digital actual. Desde cadenas de certificados TLS 1.3 e identificadores inmutables de contenedores OCI/Docker (`sha256:...`) hasta etiquetas Subresource Integrity (SRI) y manifiestos de distribución de software, SHA-256 convierte cualquier flujo binario en una huella compacta de **256 bits (32 bytes)** expresada como 64 caracteres hexadecimales. En lugar de subir archivos privados a APIs remotas, esta herramienta ejecuta cada operación en tu navegador combinando la **Web Crypto API** nativa (`crypto.subtle.digest`) con un motor de lectura progresiva para binarios de gran tamaño.

## Arquitectura bitwise de FIPS 180-4 y agenda de mensajes

Integrado en la familia **SHA-2**, SHA-256 aplica una compresión iterativa de Merkle-Damgård sobre **bloques de 512 bits (64 bytes) en orden big-endian**, operando sobre ocho registros de estado de 32 bits (`H0` a `H7`). Antes de comprimir, el mensaje recibe relleno con un byte `0x80`, ceros hasta quedar congruente con `448 (mod 512)` y un campo final de 64 bits *big-endian* que registra la longitud original en bits. Todas sus constantes son números transparentes (*nothing-up-my-sleeve*) derivados de raíces irracionales de números primos para descartar puertas traseras matemáticas:

- **Valores iniciales (`H0..H7`)**: Primeros 32 bits de la parte fraccionaria de las raíces cuadradas de los 8 primeros primos (`2` a `19`), empezando en `H0 = 0x6a09e667`.
- **Constantes de ronda (`K[0..63]`)**: Primeros 32 bits de la parte fraccionaria de las raíces cúbicas de los 64 primeros primos (`2` a `311`), empezando en `K[0] = 0x428a2f98`.
- **Expansión del mensaje (`W[0..63]`)**: Cada bloque aporta dieciséis palabras *big-endian* `W[0..15]`; las 48 palabras restantes se calculan mediante rotaciones y desplazamientos a la derecha (`σ0` y `σ1`) para difundir cada byte en rondas distantes.
- **64 rondas de compresión**: Cada iteración actualiza las variables de trabajo `(a..h)` combinando la función de elección condicional `Ch(e, f, g)`, la función mayoría `Maj(a, b, c)` y los operadores de difusión `Σ0(a)` y `Σ1(e)` con sumas módulo $2^{32}$.

Esta mezcla no lineal produce un **efecto avalancha** completo: alterar un solo bit entre ASCII `A` (`0x41` = `01000001`) y `C` (`0x43` = `01000011`) invierte exactamente **133 de los 256 bits de salida** (51,95%):

```text
SHA-256("A") = 559aead08264d5795d3909718cdd05abd49572e84fe55590eef31a88a08fdffd
SHA-256("C") = 6b23c0d5f35d1b11f9b683f0b0a617355deb11277d91ae091d399c655b87940d
```

En términos de márgenes criptográficos, SHA-256 proporciona **256 bits de resistencia frente a preimagen y segunda preimagen** y **128 bits de resistencia clásica a colisiones** bajo la cota del cumpleaños ($2^{128}$ evaluaciones). Incluso considerando la aceleración cuadrática del algoritmo cuántico de Grover, la inversión por preimagen mantiene 128 bits efectivos ($2^{128}$ consultas cuánticas), razón por la cual NIST conserva SHA-256 en sus estándares de transición post-cuántica.

## Modelo de ejecución híbrido en el navegador

La llamada `window.crypto.subtle.digest('SHA-256', buffer)` delega el cálculo a código nativo C++/Rust —frecuentemente acelerado mediante instrucciones de CPU SHA-NI o extensiones criptográficas ARMv8— fuera del hilo principal de JavaScript. No obstante, exige pasar la carga completa en un único `ArrayBuffer` contiguo, lo que puede provocar cierres por falta de memoria con imágenes ISO de 600 MB, y además los navegadores restringen `crypto.subtle` exclusivamente a contextos seguros (HTTPS o `localhost`). Para garantizar velocidad y fiabilidad, esta herramienta elige automáticamente la ruta óptima:

| Ruta de ejecución | Condición de activación | Motor subyacente | Huella de memoria | Escenario habitual |
| :--- | :--- | :--- | :--- | :--- |
| **SubtleCrypto nativo** | Texto UTF-8 y archivos <= 20 MB | `window.crypto.subtle.digest('SHA-256')` | Un único `ArrayBuffer` (<= 20 MB) | Hashing en vivo, JSON, PDFs, paquetes pequeños |
| **Lectura en bloques** | Archivos locales > 20 MB | `File.slice()` (bloques de 2 MB) + `SHA256.update()` | Búfer acotado de ~2 MB | Imágenes ISO, volcados SQL, vídeos, firmware |
| **Motor JS de respaldo** | Entornos HTTP sin `crypto.subtle` | `CryptoJS.SHA256` en el cliente | Proporcional al texto | Pruebas locales o redes aisladas sin HTTPS |

Al procesarse todo dentro de la memoria local del cliente, ni tus documentos ni tus artefactos de compilación tocan la red.

## Auditoría de lanzamientos, contenedores y etiquetas SRI

Comprobar sumas de comprobación protege frente a espejos corruptos y manipulación en la cadena de suministro siempre que obtengas el archivo `SHA256SUMS` sobre HTTPS autenticado o verifiques primero su firma GPG/Sigstore. Puedes contrastar el resultado en el panel de comparación o replicarlo desde la terminal:

```bash
# Linux: verificar artefactos frente a un manifiesto firmado
sha256sum -c SHA256SUMS --ignore-missing

# macOS: calcular el resumen SHA-256 de un instalador
shasum -a 256 aplicacion-arm64.dmg

# Atributo HTML Subresource Integrity (binario crudo -> Base64)
openssl dgst -sha256 -binary bundle.min.js | openssl base64 -A
```

```powershell
# Windows PowerShell: comparar un binario con el valor esperado
(Get-FileHash .\instalador-x64.exe -Algorithm SHA256).Hash -eq "HASH_HEX_ESPERADO"
```

Presta atención al ejemplo SRI: `<script integrity="sha256-...">` codifica en Base64 los **32 bytes binarios en bruto** del resumen, no los 64 caracteres hexadecimales ASCII. En Kubernetes y Docker, en cambio, el anclaje inmutable usa el digest hexadecimal en minúsculas (`image: nginx@sha256:...`), garantizando que cada nodo despliegue exactamente el mismo manifiesto OCI. Si inspeccionas transformaciones Base64 junto a tus hashes, complementa el flujo con el [Codificador Base64](/es/herramientas/base64-encode).

## Errores habituales al contrastar hashes

Cuando dos utilidades discrepan sobre un archivo aparentemente idéntico, casi siempre existe una diferencia invisible de bytes:

1. **Saltos de línea de consola**: `echo "secreto" | sha256sum` procesa `secreto\n`. Usa `printf '%s' "secreto" | sha256sum` para igualar exactamente la entrada del navegador.
2. **Finales CRLF frente a LF**: `core.autocrlf` en Git o editores de Windows sustituyen `\n` (`0x0A`) por `\r\n` (`0x0D 0x0A`) y alteran el flujo binario antes del cálculo.
3. **Prefijo UTF-8 BOM**: Algunos programas insertan `0xEF 0xBB 0xBF` al inicio de archivos UTF-8; conservarla o quitarla produce digests distintos.
4. **Autenticación sin clave**: Nunca firmes peticiones API como `SHA-256(secreto + mensaje)`, porque Merkle-Damgård es vulnerable a **ataques de extensión de longitud**. Emplea el [Generador HMAC](/es/herramientas/hmac-generator) para firmas autenticadas, o recurre al [Generador de Hash](/es/herramientas/hash-generator) y al [Generador MD5](/es/herramientas/md5-generator) cuando necesites contrastar varios algoritmos a la vez.
