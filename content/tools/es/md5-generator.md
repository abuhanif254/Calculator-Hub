---
metaTitle: "Generador MD5 Online | Calcular Checksum sin Subir Datos"
metaDescription: "Calcula hashes MD5 de 128 bits para texto UTF-8 o archivos grandes con lectura en bloques de 2 MB en el navegador. Verifica checksums sin subir datos."
metaKeywords: "generador md5, hash md5 online, calcular checksum md5, texto a md5, archivo a md5, verificar integridad md5, suma de comprobación md5, rfc 1321 md5, content-md5 s3, herramienta md5 local"
title: "Generador MD5"
shortDescription: "Calcula sumas de comprobación MD5 de 128 bits para cadenas UTF-8 y archivos locales mediante lectura progresiva en bloques de 2 MB. Compara digests en tiempo real sin enviar datos a servidores externos."
faqs:
  - question: "¿Es posible descifrar o revertir un hash MD5 para recuperar el texto original?"
    answer: "No. MD5 es una función de compresión unidireccional que descarta información en cada reducción de bloques de 512 bits, por lo que no existe una operación matemática inversa. Los supuestos 'descifradores MD5' solo consultan bases de datos precalculadas y tablas arcoíris de palabras frecuentes o contraseñas filtradas."
  - question: "¿Cómo calcula esta herramienta el hash MD5 de archivos de cientos de megabytes sin bloquear el navegador?"
    answer: "En lugar de cargar todo el archivo en la memoria RAM de golpe, la pestaña de archivos lo divide en fragmentos de 2 MB mediante File.slice(), alimenta el estado interno MD5 de forma incremental con update() y cede el control al hilo principal entre bloques para mantener la interfaz fluida."
  - question: "¿Por qué el hash MD5 de una cadena vacía siempre es d41d8cd98f00b204e9800998ecf8427e?"
    answer: "La especificación RFC 1321 fija cuatro registros iniciales de 32 bits y añade un byte de relleno 0x80 seguido de ceros y un campo de longitud de 64 bits con valor cero. Procesar ese único bloque relleno de 512 bits produce siempre el digest determinista d41d8cd98f00b204e9800998ecf8427e."
  - question: "¿En qué escenarios técnicos sigue siendo aceptable utilizar MD5 hoy en día?"
    answer: "MD5 continúa siendo práctico en comprobaciones sin adversario, donde nadie manipula los datos con intención maliciosa: detectar corrupción accidental en transferencias, calcular cabeceras Content-MD5 de Amazon S3, generar etiquetas HTTP ETag, particionar claves de caché o contrastar manifiestos heredados."
  - question: "¿Por qué el hash MD5 de mi texto no coincide con la salida del comando md5sum en Linux?"
    answer: "La causa más habitual es un salto de línea final oculto (LF) añadido por comandos como echo 'texto' | md5sum, o diferencias entre saltos de línea CRLF de Windows y LF de Unix. Utiliza printf '%s' 'texto' | md5sum para evitar el carácter de nueva línea adicional."
features:
  - "Cálculo instantáneo de hashes MD5 conforme a RFC 1321 para texto UTF-8 con contador en vivo de caracteres y bytes"
  - "Procesamiento progresivo de archivos locales en bloques de 2 MB con barra de progreso para binarios voluminosos"
  - "Verificador integrado insensible a mayúsculas y minúsculas para contrastar digests frente a sumas de comprobación esperadas"
  - "Selector inmediato entre formato hexadecimal en minúsculas y mayúsculas según el estándar de tu manifiesto o API"
  - "Historial local guardado exclusivamente en localStorage con los últimos 10 cálculos de texto y archivos"
  - "Copia rápida al portapapeles y exportación del resultado a archivo .txt con ejecución 100% privada en el navegador"
useCases:
  - "Verificar imágenes de firmware, instaladores heredados y descargas FTP frente a archivos manifiesto .md5 publicados"
  - "Generar resúmenes para cabeceras Content-MD5 en Amazon S3 y flujos de validación en almacenamiento de objetos"
  - "Construir claves de caché deterministas en Redis, identificadores de partición y huellas de versión para activos estáticos"
  - "Localizar archivos duplicados en copias de seguridad, librerías multimedia o exportaciones CSV sin subir nada a la nube"
  - "Validar direcciones de correo normalizadas en minúsculas y UTF-8 al integrar URLs de avatares en Gravatar"
  - "Auditar webhooks heredados y esquemas antiguos de PHP o MySQL durante planes de migración hacia SHA-256"
howToSteps:
  - "Elige la pestaña 'Entrada de texto' para cadenas UTF-8 o cambia a 'Hash de archivo' para binarios y documentos locales."
  - "Escribe o pega tu cadena en el editor, o arrastra y suelta el archivo directamente sobre el área de carga."
  - "Si procesas un archivo grande, espera a que la barra de progreso por bloques de 2 MB alcance el 100% para ver el digest de 32 caracteres."
  - "Alterna entre hexadecimal en minúsculas o mayúsculas para ajustarte al formato requerido por tu manifiesto o cliente API."
  - "Pega la suma de comprobación esperada en el campo de comparación para confirmar una coincidencia exacta al instante."
  - "Copia el hash al portapapeles o descárgalo en un archivo .txt para registrarlo en tu flujo de verificación."
---

Definido por Ronald Rivest en **RFC 1321** (1992), **MD5 (Message-Digest Algorithm 5)** comprime cualquier secuencia arbitraria de bytes en una huella fija de **128 bits (16 bytes)**, expresada normalmente como 32 caracteres hexadecimales. Aunque hace décadas se demostró que carece de seguridad criptográfica frente a atacantes activos, los ingenieros siguen encontrándolo a diario en cabeceras `Content-MD5` de almacenamiento de objetos, validadores HTTP `ETag`, URLs de Gravatar, deduplicación de registros y manifiestos heredados. Calcular estos resúmenes localmente —mediante lectura incremental en bloques de 2 MB para archivos pesados— evita subir documentos privados a servidores externos y preserva fielmente el estándar RFC 1321.

## Arquitectura interna del algoritmo MD5 (RFC 1321)

MD5 implementa una construcción iterativa de **Merkle-Damgård** que procesa la entrada exclusivamente en **bloques de 512 bits (64 bytes)** mediante aritmética de palabras de 32 bits en orden *little-endian*:

1. **Relleno y entramado de longitud**: El algoritmo anexa un bit `1` (byte `0x80`), seguido de tantos ceros como hagan falta hasta que la longitud en bits sea congruente con `448 (mod 512)`. Los 64 bits restantes codifican la longitud original del mensaje en bits módulo $2^{64}$ como entero *little-endian*. Incluso una cadena vacía de cero bytes genera un bloque completo cuyo digest canónico es `d41d8cd98f00b204e9800998ecf8427e`.
2. **Inicialización de estado**: Cuatro registros encadenados de 32 bits arrancan con constantes fijas:
   - `A = 0x67452301`, `B = 0xefcdab89`
   - `C = 0x98badcfe`, `D = 0x10325476`
3. **Bucle de compresión de 64 rondas**: Cada bloque de 512 bits se divide en dieciséis palabras `M[0..15]`. En cuatro etapas de 16 rondas, MD5 mezcla los registros con las funciones no lineales `F`, `G`, `H` e `I`, una tabla de 64 constantes obtenidas mediante $\lfloor 2^{32} \cdot |\sin(i + 1)| \rfloor$ y rotaciones circulares a la izquierda.
4. **Suma feed-forward y salida**: Tras la ronda 64, los registros actualizados se suman módulo $2^{32}$ sobre `(A, B, C, D)`. Al concluir el último bloque, los cuatro registros se serializan en orden *little-endian* para emitir los 16 bytes finales.

Esta propagación continua de acarreos y rotaciones asegura el **efecto avalancha**: invertir un único bit en cualquier punto de la entrada altera aproximadamente la mitad de los 128 bits resultantes.

## Debilidades criptográficas y ataques de colisión

Pese a detectar errores fortuitos de transmisión con fiabilidad, MD5 ofrece **resistencia nula frente a colisiones** deliberadas. En 2004, Xiaoyun Wang y Hongbo Yu publicaron un ataque de criptoanálisis diferencial modular capaz de producir colisiones en segundos. En 2008, investigadores falsificaron una autoridad certificadora intermedia X.509 aprovechando **colisiones de prefijo elegido**, y en 2012 el malware Flame empleó esa técnica para suplantar una firma de código de Windows Update. Hoy cualquier portátil convencional fabrica una colisión MD5 de prefijo idéntico en menos de un segundo.

| Escenario de ingeniería | Idoneidad de MD5 | Justificación técnica | Alternativa recomendada |
| :--- | :--- | :--- | :--- |
| **Corrupción accidental en red o disco** | Aceptable | Los fallos aleatorios no explotan rutas diferenciales | SHA-256 o BLAKE3 en sistemas nuevos |
| **AWS S3 `Content-MD5` y HTTP `ETag`** | Protocolo | Exigido por APIs para integridad en tránsito, no antimanipulación | Combinar con TLS y `x-amz-checksum-sha256` |
| **Claves de caché, sharding y Gravatar** | Aceptable | Distribución determinista uniforme sin amenaza adversaria | xxHash / MurmurHash3 o SHA-256 |
| **Verificación de seguridad en binarios** | Inseguro | Un atacante puede falsificar un ejecutable con igual MD5 | SHA-256 junto con firma GPG o Sigstore |
| **Firmas digitales y certificados TLS** | Prohibido | Las colisiones de prefijo elegido permiten forjar firmas | SHA-256 / SHA-384 con ECDSA o Ed25519 |
| **Almacenamiento de contraseñas** | Prohibido | GPUs modernas superan 100 000 millones de hashes MD5/s | Argon2id, scrypt o bcrypt |

## Por qué no existe el "descifrado" de MD5

Buscar un "descifrador MD5" parte de confundir **cifrado** (reversible con una clave secreta) con **hashing** (compresión irreversible de muchos a uno). Por el principio del palomar, infinitas entradas se proyectan sobre solo $2^{128}$ salidas posibles; al reducir un archivo de 20 KB a 16 bytes, el contenido original desaparece definitivamente del resumen.

Las páginas que aparentan "revertir" un MD5 solo consultan diccionarios masivos precalculados y **tablas arcoíris** creadas con palabras comunes, PIN y brechas históricas. Si buscas el MD5 de `password123` (`482c811da5d5b4bc6d497ffa98491e38`), aparece al instante porque el texto claro fue indexado previamente, no porque se haya invertido la función matemática.

## Lectura por bloques, codificación UTF-8 y verificación en consola

Invocar `FileReader.readAsArrayBuffer()` sobre una imagen de disco de 1,5 GB de una sola vez puede agotar la cuota de memoria de la pestaña y congelar el navegador. En la pestaña de archivos, esta herramienta divide el binario con `selectedFile.slice(offset, offset + 2097152)` en **bloques de 2 MB**, alimenta un estado `MD5` incremental y cede el turno al bucle de eventos tras cada lectura para actualizar la barra de progreso. También guarda tus últimos 10 resúmenes únicamente en el `localStorage` local.

Al trabajar con cadenas de texto —como direcciones de correo para Gravatar o parámetros de caché—, recuerda normalizar antes de calcular el hash: elimina espacios sobrantes, convierte a minúsculas si la especificación lo indica y confirma que ambos extremos emplean UTF-8 sin saltos de línea ocultos (`\r\n` frente a `\n`). Para contrastar resultados desde la terminal o generar la cabecera `Content-MD5` de Amazon S3 codificando los **16 bytes binarios crudos** (nunca los 32 caracteres hexadecimales ASCII) mediante nuestro [Codificador Base64](/es/herramientas/base64-encode), utiliza estos comandos:

```bash
# Linux: hash UTF-8 exacto sin salto de línea final
printf '%s' 'usuario@ejemplo.com' | md5sum

# macOS: suma de comprobación (-r imprime el hash primero)
md5 -r respaldo-servidor.tar.gz

# Cabecera AWS S3 Content-MD5 (binario crudo convertido a Base64)
openssl dgst -md5 -binary carga.json | openssl base64
```

```powershell
# Windows PowerShell: verificación nativa en minúsculas
(Get-FileHash .\respaldo-servidor.tar.gz -Algorithm MD5).Hash.ToLower()
```

Cuando necesites auditar descargas críticas o comparar varios algoritmos simultáneamente (SHA-1, SHA-256, SHA-512 y SHA-3), utiliza el [Generador de Hash](/es/herramientas/hash-generator) o cambia al [Generador SHA256](/es/herramientas/sha256-generator) impulsado por Web Crypto API.
