---
metaTitle: "Generador de Hash Online | MD5, SHA-1, SHA-256 y SHA-3"
metaDescription: "Calcula hashes criptográficos MD5, SHA-1, SHA-256, SHA-512 y SHA-3 de texto o archivos locales al instante. Verifica checksums en tu navegador."
metaKeywords: "generador de hash, calcular sha256 online, hash md5, generador sha512, hash sha3, verificar checksum archivo, integridad de archivos, web crypto api hash"
title: "Generador de Hash"
shortDescription: "Generador criptográfico de hashes MD5, SHA-1, SHA-256, SHA-512 y SHA-3 para texto y archivos locales. Verifica sumas de comprobación al instante sin subir datos a ningún servidor."
faqs:
  - question: "¿Cuál es la diferencia técnica entre la familia SHA-2 (SHA-256/SHA-512) y SHA-3 (Keccak)?"
    answer: "SHA-2 utiliza la construcción iterativa Merkle-Damgård con funciones de compresión basadas en bloques fijos, mientras que SHA-3 (FIPS 202) emplea la construcción de esponja Keccak sobre un estado de 1600 bits. SHA-3 ofrece diversidad criptográfica frente a SHA-2 y es inmune por diseño a los ataques de extensión de longitud."
  - question: "¿Por qué MD5 y SHA-1 se consideran inseguros para firmas digitales e integridad adversaria?"
    answer: "Tanto MD5 como SHA-1 han sufrido ataques prácticos de colisión con prefijo elegido, lo que permite fabricar dos archivos distintos con exactamente el mismo resumen hash. Solo deben utilizarse para compatibilidad heredada o detección de corrupción accidental, nunca para seguridad ni certificados."
  - question: "¿Puedo calcular el checksum de archivos grandes de forma segura sin subirlos a Internet?"
    answer: "Sí. El cálculo se ejecuta íntegramente en tu dispositivo mediante Web Crypto API y procesamiento local en JavaScript. Ningún byte del archivo abandona tu equipo, lo que permite auditar imágenes ISO, respaldos o documentos confidenciales con privacidad total."
  - question: "¿Por qué no es suficiente aplicar SHA-256 directamente para almacenar contraseñas de usuarios?"
    answer: "Las funciones hash criptográficas como SHA-256 están optimizadas para ejecutarse a altísima velocidad, lo que permite a un atacante probar miles de millones de combinaciones por segundo en GPU. Para contraseñas debes usar funciones de derivación lentas y costosas en memoria como Argon2id, scrypt o bcrypt con una sal única por cuenta."
  - question: "¿Cuándo conviene utilizar HMAC en lugar de un hash criptográfico simple?"
    answer: "Un hash estándar solo verifica integridad frente a corrupción o frente a un checksum publicado en un canal de confianza. Cuando necesitas autenticar además el origen de un mensaje, webhook o petición API mediante una clave compartida, debes emplear HMAC (como HMAC-SHA256) para impedir suplantaciones y ataques de extensión de longitud."
features:
  - "Cálculo simultáneo en tiempo real de resúmenes MD5, SHA-1, SHA-256, SHA-512 y SHA-3 en una sola pasada"
  - "Verificación local de archivos mediante arrastrar y soltar sin límites de subida ni transferencia a la nube"
  - "Comparador integrado de sumas de verificación (checksums) para detectar coincidencias o alteraciones al instante"
  - "Codificación UTF-8 precisa para entradas textuales con tildes, caracteres internacionales y emojis"
  - "Indicadores visuales de estado criptográfico que distinguen algoritmos recomendados de algoritmos obsoletos"
  - "Ejecución 100% del lado del cliente con Web Crypto API para privacidad absoluta en auditorías y desarrollo"
useCases:
  - "Validación de sumas SHA-256 y SHA-512 en imágenes ISO, instaladores de software y binarios descargados"
  - "Generación de huellas digitales deterministas para cachés de recursos estáticos y deduplicación de contenido"
  - "Comprobación rápida de identidad byte a byte entre dos copias de un mismo archivo local o respaldo"
  - "Cálculo de hashes MD5 o SHA-1 para depurar sistemas heredados, cabeceras Content-MD5 o repositorios antiguos"
  - "Verificación de vectores de prueba criptográficos durante el desarrollo de APIs, integraciones y contratos de datos"
  - "Auditoría de integridad de documentos legales, artefactos CI/CD y registros de compilación reproducibles"
howToSteps:
  - "Elige el modo de entrada entre texto plano (UTF-8) o selección de archivo local."
  - "Escribe o pega la cadena en el editor, o arrastra tu archivo directamente al área de carga."
  - "Observa el cálculo inmediato de los resúmenes en MD5, SHA-1, SHA-256, SHA-512 y SHA-3 simultáneamente."
  - "Revisa la etiqueta de seguridad junto a cada algoritmo para confirmar si es apto para uso criptográfico moderno."
  - "Pega el checksum oficial del proveedor en el campo de comparación para validar la coincidencia exacta."
  - "Copia el digest hexadecimal en minúsculas o mayúsculas para documentarlo en tu pipeline o verificación."
---

Una función hash criptográfica condensa cualquier flujo arbitrario de bytes —desde una cadena vacía hasta una imagen ISO de varios gigabytes— en una huella determinista de longitud fija llamada *digest* o *checksum*. Esta primitiva sustenta la verificación de descargas, las firmas digitales, el almacenamiento direccionado por contenido y la detección de corrupción en archivos. Nuestro generador calcula MD5, SHA-1, SHA-256, SHA-512 y SHA-3 de forma simultánea directamente en tu navegador, sin transferir datos a servidores externos. Si buscas un flujo dedicado únicamente al algoritmo más extendido, puedes abrir también nuestro [Generador SHA-256](/es/herramientas/sha256-generator).

## Propiedades formales de una función hash criptográfica

A diferencia de sumas rápidas como CRC32 pensadas solo para errores aleatorios de transmisión, una función hash criptográfica debe cumplir garantías matemáticas estrictas:

- **Determinismo:** la misma secuencia exacta de bytes produce siempre idéntico digest; cualquier cambio en los saltos de línea (`LF` frente a `CRLF`), un espacio final o la codificación (`UTF-8` frente a `UTF-16`) altera totalmente la salida.
- **Resistencia a la preimagen:** dado un resumen $h$, resulta computacionalmente inviable hallar $m$ tal que $H(m) = h$.
- **Resistencia a la segunda preimagen:** dado $m_1$, es inviable encontrar $m_2 \neq m_1$ con idéntico hash.
- **Resistencia a colisiones:** inviable hallar cualquier par distinto $(m_1, m_2)$ con $H(m_1) = H(m_2)$; por la paradoja del cumpleaños, un digest de $n$ bits ofrece un límite teórico de $2^{n/2}$ operaciones (128 bits efectivos en SHA-256).
- **Efecto avalancha:** invertir un único bit en la entrada cambia cerca del 50 % de los bits de salida de forma impredecible.

## Construcciones internas: Merkle-Damgård frente a la esponja Keccak

### Construcción Merkle-Damgård (MD5, SHA-1 y familia SHA-2)
MD5 (RFC 1321), SHA-1 y SHA-2 (FIPS 180-4) dividen el mensaje en bloques fijos (512 bits en MD5, SHA-1 y SHA-256; 1024 bits en SHA-512), añaden un relleno que codifica la longitud total del mensaje y procesan cada bloque mediante una función de compresión Davies-Meyer. En SHA-256, las constantes iniciales proceden de las partes fraccionarias de las raíces cuadradas de los primeros 8 números primos y las 64 rondas emplean constantes derivadas de las raíces cúbicas de los primeros 64 primos; en procesadores modernos, extensiones como Intel SHA-NI y ARMv8 Crypto aceleran estas rondas en hardware.

Como el estado interno final coincide con la salida pública, estos algoritmos sufren **ataques de extensión de longitud**: conociendo $H(\text{clave} \parallel m)$ y el tamaño de la clave, un atacante calcula $H(\text{clave} \parallel m \parallel \text{relleno} \parallel m')$ sin conocer el secreto. Por ello, para autenticar mensajes o webhooks debes emplear la construcción anidada de nuestro [Generador HMAC](/es/herramientas/hmac-generator) o variantes truncadas como SHA-512/256.

### Construcción de esponja Keccak (SHA-3)
Definida en FIPS 202, la familia SHA-3 opera sobre un estado interno de 1600 bits dividido en tasa (*rate*, $r$) y capacidad (*capacity*, $c$). El mensaje se absorbe mediante XOR sobre los $r$ bits intercalando la permutación Keccak-$f[1600]$ y luego se extrae (*squeeze*) el digest. Al mantener ocultos los $c$ bits de capacidad (512 bits en SHA3-256), SHA-3 elimina por diseño los ataques de extensión de longitud, ofrece diversidad estructural frente a SHA-2 e incluye funciones de salida extensible (XOF) como SHAKE128 y SHAKE256.

## Comparativa técnica de algoritmos hash

| Algoritmo | Estándar | Salida (bits / hex) | Construcción | Bloque / tasa | Estado y uso actual |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MD5** | RFC 1321 | 128 bits (32 hex) | Merkle-Damgård | 512 bits | **Roto**: colisiones triviales; solo checksums no adversarios |
| **SHA-1** | FIPS 180-4 | 160 bits (40 hex) | Merkle-Damgård | 512 bits | **Obsoleto**: colisiones prácticas (*SHAttered*, 2017); prohibido en TLS |
| **SHA-256** | FIPS 180-4 | 256 bits (64 hex) | Merkle-Damgård | 512 bits | **Recomendado**: estándar en TLS, paquetes y verificación |
| **SHA-512** | FIPS 180-4 | 512 bits (128 hex) | Merkle-Damgård | 1024 bits | **Recomendado**: alto rendimiento en CPUs de 64 bits |
| **SHA3-256** | FIPS 202 | 256 bits (64 hex) | Esponja Keccak | 1088 bits ($c=512$) | **Muy seguro**: inmune a extensión de longitud |

Si necesitas exclusivamente compatibilidad con sistemas heredados no críticos que todavía comparan sumas MD5, dispones además del [Generador MD5](/es/herramientas/md5-generator).

## Verificación de archivos por CLI y Web Crypto API

En flujos DevOps y auditorías de software, contrasta siempre las descargas contra el manifiesto `SHA256SUMS` oficial teniendo en cuenta que un archivo de texto con saltos `CRLF` en Windows producirá un hash distinto al mismo texto con `LF` en Linux:

```bash
# Linux (GNU coreutils) y macOS
sha256sum instalador-v2.4.tar.gz
shasum -a 256 instalador-v2.4.tar.gz
```

```powershell
# Windows PowerShell
Get-FileHash -Path .\instalador-v2.4.zip -Algorithm SHA256
```

En el navegador, la API nativa Web Crypto calcula resúmenes acelerados por hardware sin librerías externas:

```javascript
async function computeSha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, '0')
  ).join('');
}
```

Para archivos de varios gigabytes, en lugar de cargar el búfer completo con `file.arrayBuffer()`, las implementaciones por bloques leen segmentos con `file.slice()` y actualizan un estado incremental, manteniendo estable el consumo de RAM.

## Límites críticos: hashing frente a cifrado y contraseñas

Conviene respetar dos reglas esenciales. Primera, **el hashing no es cifrado**: es estrictamente unidireccional y no permite recuperar los datos originales. Segunda, **un hash rápido nunca debe proteger contraseñas directamente**: SHA-256 y SHA-3 se ejecutan a miles de millones de intentos por segundo en GPU, facilitando ataques de diccionario ante una filtración. Almacena credenciales siempre con funciones lentas y costosas en memoria como **Argon2id**, **scrypt** o **bcrypt** más una sal única, acompañadas de claves de alta entropía creadas con un [Generador de Contraseñas Seguras](/es/herramientas/strong-password-generator).
