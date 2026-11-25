---
metaTitle: "Generador de Contraseñas Seguras | CSPRNG, Entropía y QR"
metaDescription: "Crea contraseñas CSPRNG con Web Crypto API, frases Diceware y claves WiFi sin conexión. Mide la entropía en bits, aplica filtros y genera códigos QR."
metaKeywords: "generador de contraseñas, contraseña segura online, generador csprng, frase de contraseña diceware, entropía de contraseña, clave wifi segura, web crypto getRandomValues, código qr contraseña, generador de claves aleatorias"
title: "Generador de Contraseñas Avanzado"
shortDescription: "Genera contraseñas criptográficamente aleatorias, claves memorables y frases Diceware sin conexión mediante Web Crypto API. Evalúa la entropía en bits, filtra caracteres ambiguos y transfiere claves con QR local."
faqs:
  - question: "¿En qué se diferencia la generación con Web Crypto CSPRNG de JavaScript Math.random()?"
    answer: "Math.random() se apoya en generadores pseudoaleatorios no criptográficos como xorshift128+, cuyo estado interno puede recuperarse matemáticamente tras observar unas pocas salidas. Esta herramienta invoca window.crypto.getRandomValues(), tomando bytes impredecibles directamente del CSPRNG del sistema operativo alimentado por entropía de hardware."
  - question: "¿Cuándo conviene elegir una frase de contraseña Diceware en lugar de una cadena aleatoria?"
    answer: "Usa una frase Diceware para credenciales que debes memorizar y teclear a mano, como la clave maestra de tu gestor de contraseñas o el desbloqueo de cifrado de disco. Reserva las cadenas aleatorias de alta densidad para cuentas guardadas en un gestor o credenciales técnicas automatizadas."
  - question: "¿Cuánta entropía pierdo al excluir caracteres similares o ambiguos?"
    answer: "Retirar siete glifos visualmente parecidos (I, l, 1, O, 0, o, |) de un conjunto alfanumérico reduce la entropía por carácter de 5,95 a 5,78 bits. Añadir un solo carácter extra en una clave WiFi de 20 caracteres compensa con creces esa diferencia y elimina errores de transcripción."
  - question: "¿Por qué el estimador muestra tiempos separados para ataques en línea y fuera de línea?"
    answer: "Un ataque en línea contra un formulario web está limitado por latencia de red, bloqueos y límites de tasa, modelados aquí en 100 intentos por segundo. Un ataque fuera de línea ocurre cuando un atacante roba una base de datos de hashes y usa granjas de GPUs a un ritmo extremo de hasta un billón (10^12) de intentos por segundo."
  - question: "¿Es seguro pasar una contraseña generada al móvil mediante el botón de código QR?"
    answer: "Sí. La matriz QR se dibuja localmente en un elemento HTML5 Canvas dentro de tu navegador sin llamar a ninguna API externa. Asegúrate únicamente de proteger tu pantalla de miradas o cámaras cercanas mientras escaneas y borra el historial local al terminar."
features:
  - "Motor CSPRNG basado en Web Crypto API (window.crypto.getRandomValues) ejecutado íntegramente dentro del navegador"
  - "Tres modos de generación: cadenas aleatorias de hasta 128 caracteres, claves memorables y frases de contraseña Diceware"
  - "Perfiles rápidos para WiFi, banca, videojuegos, desarrolladores (32 caracteres con símbolos) y políticas corporativas"
  - "Filtros precisos para excluir glifos similares (I, l, 1, O, 0), signos ambiguos, repeticiones y secuencias ASCII contiguas"
  - "Cálculo en vivo de entropía en bits, alertas estructurales y tiempos estimados frente a ataques en línea y fuera de línea"
  - "Código QR renderizado en HTML5 Canvas local, generación por lotes de hasta 20 claves y exportación directa en .txt"
useCases:
  - "Crear claves WiFi WPA2/WPA3 de 20 caracteres sin letras confusas y escanearlas en móviles invitados mediante QR local"
  - "Construir frases Diceware memorables de 5 o 6 palabras para BitLocker, FileVault, LUKS o claves maestras de bóvedas"
  - "Aprovisionar secretos ASCII de 32 caracteres para superusuarios de bases de datos, frases de paso SSH y variables de servidor"
  - "Generar contraseñas alfanuméricas limpias para portales bancarios que rechazan corchetes o metacaracteres de consola"
  - "Producir lotes de hasta 20 credenciales únicas para servidores de pruebas, cuentas de QA o paneles de routers"
  - "Evaluar el impacto real de las restricciones de caracteres sobre los bits de entropía al redactar políticas de acceso"
howToSteps:
  - "Selecciona el modo deseado: 'Aleatorio' para máxima densidad, 'Memorable' para palabras con dígitos o 'Frase de contraseña' tipo Diceware."
  - "Elige un perfil preconfigurado (Juegos, Banca, WiFi, Desarrollador o Empresa) o ajusta manualmente los deslizadores de longitud o palabras."
  - "Activa los conjuntos de caracteres deseados —mayúsculas, minúsculas, números y símbolos editables— y habilita los filtros de exclusión si teclearás la clave."
  - "Despliega las opciones avanzadas para evitar caracteres repetidos o secuencias ASCII, o aumenta el lote hasta 20 credenciales simultáneas."
  - "Inspecciona los bits de entropía, las advertencias estructurales y los tiempos de descifrado en línea y fuera de línea."
  - "Copia la credencial, abre el código QR local para transferirla al móvil o exporta todo el lote como archivo .txt."
---

La mayoría de los robos de cuentas actuales no nacen de fallos en el cifrado TLS, sino de claves inventadas por humanos con muy poca entropía efectiva y reutilizadas entre servicios comprometidos. **Generador de Contraseñas Avanzado** sustituye esos patrones predecibles por aleatoriedad criptográfica alimentada por el sistema operativo vía Web Crypto API, integrando cadenas de alta densidad, combinaciones memorables y frases Diceware sin conexión. Al ejecutarse el muestreo de bytes, el cálculo de entropía y el trazado del código QR en Canvas dentro del navegador, ninguna credencial recién generada viaja por la red ni queda expuesta en registros externos.

## Arquitectura CSPRNG y selección sin sesgo de módulo

Funciones como `Math.random()` buscan velocidad de simulación, no secreto criptográfico. Los motores JavaScript modernos suelen respaldarlas con algoritmos como `xorshift128+`, cuyo estado interno de 128 bits puede invertirse con un solucionador SMT tras observar muy pocas salidas consecutivas. Las credenciales robustas exigen un generador criptográficamente seguro (**CSPRNG**) con imprevisibilidad hacia adelante y resistencia al retroceso.

Esta utilidad solicita enteros sin signo de 32 bits mediante `window.crypto.getRandomValues()`, obteniendo entropía del kernel (`BCryptGenRandom` en Windows, `getrandom()` / `/dev/urandom` en Linux y `SecRandomCopyBytes` en macOS). Si escribes scripts propios en Node.js o navegador, evita el **sesgo de módulo**: reducir un entero con `val % alfabeto.length` favorece ligeramente los primeros índices siempre que $2^{32}$ no sea múltiplo exacto del tamaño del alfabeto. El muestreo por rechazo (*rejection sampling*) elimina esa desviación por completo:

```javascript
function generarCadenaSegura(longitud, alfabeto) {
  const limite = Math.floor(0x100000000 / alfabeto.length) * alfabeto.length;
  const buf = new Uint32Array(1);
  let salida = "";
  while (salida.length < longitud) {
    crypto.getRandomValues(buf);
    if (buf[0] < limite) salida += alfabeto[buf[0] % alfabeto.length];
  }
  return salida;
}
```

## Matemáticas de la entropía y modo Diceware

Con extracciones independientes y uniformes sobre un conjunto de $R$ símbolos, el espacio de búsqueda total es $R^L$ y la entropía ideal en bits vale:

$$H = L \cdot \log_2(R)$$

En frases Diceware elegidas uniformemente de un diccionario de $D$ palabras distintas, cada término aporta $\log_2(D)$ bits: $12,92$ bits por palabra en la lista larga EFF ($6^5 = 7\,776$ palabras) o $\approx 9,97$ bits en un diccionario compacto de 1 000 entradas. Agregar un número aleatorio de dos dígitos (`10–99`, 90 resultados posibles) suma $\log_2(90) \approx 6,49$ bits adicionales.

| Perfil o modo | Espacio ($R$ o $D$) | Bits / unidad | Para $\ge 80$ bits | Para $\ge 128$ bits | Uso recomendado |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **PIN numérico (`0-9`)** | 10 | 3,32 | 25 dígitos | 39 dígitos | Bloqueo físico con límite estricto de intentos |
| **WiFi limpio (sin similares)** | 55 | 5,78 | 14 car. | 23 car. | Claves WPA2/WPA3 tecleadas en TV o móviles |
| **Alfanumérico (`A-Z, a-z, 0-9`)** | 62 | 5,95 | 14 car. | 22 car. | Banca y portales heredados sin símbolos |
| **ASCII imprimible completo** | 94 | 6,55 | 13 car. | 20 car. | Gestores de claves, secretos API y cuentas root |
| **Desarrollador (32 car. ASCII)** | 94 | 6,55 | 32 car. (209,7 bits) | 32 car. (209,7 bits) | Superusuarios de bases de datos y frases SSH |
| **Diceware EFF ($6^5$ palabras)** | 7 776 | 12,92 | 7 pal. (90,5 bits) | 10 pal. (129,2 bits) | Claves maestras memorables, LUKS y FileVault |

La conclusión coincide con las guías modernas del **NIST SP 800-63B**: **la longitud domina ampliamente sobre la complejidad arbitraria**. Pasar de 10 caracteres ASCII completos ($65,5$ bits) a 16 alfanuméricos sin signos ($95,3$ bits) amplía el espacio de búsqueda casi mil millones de veces, evita problemas de escape en scripts y elimina la necesidad de rotaciones periódicas artificiales que empujan a reutilizar patrones débiles.

## Filtros de usabilidad y restricciones de política

Dos filtros independientes resuelven los fallos más habituales al transcribir claves o inyectarlas en archivos de configuración:

- **Excluir similares** elimina pares visualmente confusos (`I`, `l`, `1`, `O`, `0`, `o`, `|`), ahorrando errores al leer claves WiFi en pantallas o fuentes monoespaciadas.
- **Excluir ambiguos** quita delimitadores y metacaracteres (`{}[]()/\'"~,;:.<>`) que suelen romper variables de entorno sin comillas, YAML, importaciones CSV o analizadores XML.

Las reglas **Evitar repeticiones** y **Evitar secuencias** (bloqueando tramos ASCII contiguos como `ab`, `78` o `yx`) satisfacen validadores estrictos, aunque prohibir repeticiones reduce el espacio combinatorio de $R^L$ a variaciones sin repetición $\frac{R!}{(R-L)!}$; conviene activarlas solo cuando el formulario destino las exija.

## Consideraciones prácticas: WiFi, almacenamiento y QR local

### Límites WPA2/WPA3 y transferencia por código QR
El estándar IEEE 802.11i admite frases ASCII de **8 a 63 caracteres** para WPA2-PSK y WPA3-SAE (64 dígitos hexadecimales equivalen a una clave cruda de 256 bits sin PBKDF2). El perfil **WiFi** de 20 caracteres ronda los 115 bits de entropía, fuera del alcance del descifrado GPU incluso frente a las 4 096 iteraciones PBKDF2-HMAC-SHA1 de WPA2. Pulsa el icono QR local en Canvas para escanear la clave desde un móvil; si necesitas un código de conexión automática `WIFI:T:WPA;S:Red;P:Clave;;`, combínalo con el [Generador de Códigos QR](/es/herramientas/qr-code-generator).

### Almacenamiento seguro en servidor: evita hashes rápidos
Una clave robusta sirve de poco si el backend la almacena mal. Los algoritmos rápidos como los del [Generador SHA256](/es/herramientas/sha256-generator) se calculan a miles de millones de intentos por segundo en GPU. En producción emplea siempre funciones resistentes a memoria: **Argon2id** (RFC 9106, mínimo 19 MiB de RAM y 2 iteraciones según OWASP), **scrypt** o **bcrypt** (coste $\ge 12$).

### Auditoría de credenciales e higiene del historial
El analizador evalúa cada clave frente a modelos en línea ($10^2$ intentos/s) y fuera de línea ($10^{12}$ intentos/s, un billón por segundo), detectando longitudes inferiores a 12 caracteres, tripletes repetidos o secuencias ASCII. Para auditar una contraseña ya existente o exportar lotes CSV/JSON de hasta 100 claves, pasa al [Generador de Contraseñas Fuertes](/es/herramientas/strong-password-generator). Finalmente, recuerda que el navegador guarda las últimas 30 entradas en `localStorage`: pulsa **Borrar historial** siempre que trabajes en un equipo compartido.
