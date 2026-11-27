---
metaTitle: "Calculadora Chmod Linux: Permisos Octales y Simbólicos"
metaDescription: "Calcule máscaras octales y simbólicas de permisos Linux chmod al instante en su navegador. Analice rwx, bits especiales y valide configuraciones SSH y web."
metaKeywords: "calculadora chmod, permisos linux, máscara octal, rwx unix, chmod 755, chmod 644, chmod 600 ssh, seguridad posix"
title: "Calculadora de Permisos Linux Chmod"
shortDescription: "Convierta y valide permisos POSIX de archivos y directorios en Linux entre notación octal y simbólica de forma instantánea. Ejecución local para diseñar políticas seguras sin exponer configuraciones."
faqs:
  - question: "¿Por qué la calculadora distingue entre permisos de archivos y directorios?"
    answer: "En sistemas compatibles con POSIX, el bit de ejecución (x, valor 1) tiene significados distintos según el tipo de inodo. En un archivo regular permite invocar el binario o script, mientras que en un directorio autoriza atravesar la ruta y acceder a los metadatos de sus entradas."
  - question: "¿Cuál es la diferencia práctica entre chmod 644 y chmod 755?"
    answer: "El modo 644 otorga lectura y escritura al propietario (6) y solo lectura al grupo y a terceros (4), siendo ideal para archivos estáticos HTML, CSS o configuraciones no ejecutables. El modo 755 añade el permiso de ejecución (1) a todas las categorías, lo cual es indispensable para binarios y directorios públicos."
  - question: "¿Por qué SSH rechaza claves privadas con permisos distintos a 600 o 400?"
    answer: "El cliente OpenSSH aplica una política estricta de verificación de permisos antes de leer archivos como id_rsa o id_ed25519. Si el grupo u otros usuarios tienen permiso de lectura o escritura, la sesión se aborta automáticamente para impedir el robo silencioso de credenciales criptográficas."
  - question: "¿Qué riesgos introduce aplicar chmod 777 en servidores de producción?"
    answer: "Asignar 777 concede lectura, escritura y ejecución irrestricta a cualquier cuenta local, incluidos usuarios de servicio comprometidos o procesos web aislados. Esto habilita la sobrescritura de scripts, la inyección de código malicioso y la escalada de privilegios en el sistema."
  - question: "¿Cómo funciona el cuarto dígito octal en permisos especiales como SUID, SGID y Sticky Bit?"
    answer: "El primer dígito de una máscara de cuatro cifras controla bits especiales de control: 4 activa SUID (ejecución con identidad del propietario), 2 habilita SGID (herencia de grupo en directorios) y 1 activa el Sticky Bit (solo el propietario puede borrar archivos dentro de directorios compartidos como /tmp)."
features:
  - "Sincronización bidireccional instantánea entre casillas rwx, código octal y notación simbólica"
  - "Soporte completo para máscaras de cuatro dígitos incluyendo SUID, SGID y Sticky Bit"
  - "Generación automática de comandos listos para terminal con variantes recursivas seguras"
  - "Evaluación contextual de riesgos de seguridad para detectar configuraciones permisivas"
  - "Ejecución íntegra en el navegador del cliente sin enviar rutas ni políticas a servidores"
useCases:
  - "Configuración segura de claves privadas SSH y certificados TLS en servidores Linux"
  - "Definición de permisos para directorios web Nginx o Apache y scripts CGI o PHP"
  - "Auditoría rápida de máscaras octales heredadas durante revisiones de infraestructura"
  - "Preparación de instrucciones RUN chmod en Dockerfiles y pipelines de despliegue CI/CD"
  - "Aislamiento de carpetas compartidas mediante Sticky Bit y SGID en entornos multiusuario"
howToSteps:
  - "Seleccione las casillas de lectura (r), escritura (w) y ejecución (x) para Propietario, Grupo y Otros."
  - "Opcionalmente, active los bits especiales SUID, SGID o Sticky Bit si administra binarios o carpetas compartidas."
  - "Verifique el valor octal resultante, la cadena simbólica y el diagnóstico de seguridad en pantalla."
  - "Copie el comando chmod generado y aplíquelo en su terminal o script de aprovisionamiento."
---

La administración de sistemas Unix y Linux exige precisión absoluta al definir quién puede leer, modificar o ejecutar cada recurso del sistema de archivos. Esta calculadora de permisos `chmod` traduce de manera bidireccional entre matrices visuales de acceso, valores octales de tres o cuatro dígitos y cadenas simbólicas POSIX (`-rwxr-xr-x`), permitiendo validar políticas de acceso antes de aplicar cambios críticos en producción.

Toda la lógica de cálculo y análisis se ejecuta exclusivamente en el navegador mediante JavaScript del lado del cliente. Ninguna ruta, estructura de directorios ni política interna de su infraestructura se transmite por la red, lo que garantiza privacidad total al auditar entornos corporativos o servidores sensibles.

## Arquitectura técnica de la máscara de bits POSIX

El modelo de permisos tradicional en sistemas tipo Unix se fundamenta en el estándar IEEE Std 1003.1 (POSIX.1), donde los metadatos de control de acceso se almacenan dentro del campo `st_mode` de cada inodo. Este campo utiliza un esquema compacto de bits agrupados en tríadas de tres bits para representar tres entidades diferenciadas: el propietario del recurso (`u`, *user*), el grupo asignado (`g`, *group*) y el resto de usuarios del sistema (`o`, *others*).

Dentro de cada tríada, cada permiso corresponde a una potencia de dos específica:

- **Lectura (`r`, bit 2, valor octal `4`)**: autoriza abrir y leer el contenido de un archivo, o listar los nombres de archivos dentro de un directorio.
- **Escritura (`w`, bit 1, valor octal `2`)**: permite modificar o truncar un archivo, o crear, renombrar y eliminar entradas dentro de un directorio si también existe permiso de ejecución.
- **Ejecución (`x`, bit 0, valor octal `1`)**: habilita al núcleo para ejecutar un archivo binario o script, mientras que en directorios concede acceso de paso (*traversal*) para resolver rutas internas.

La representación octal se obtiene sumando los pesos binarios activos en cada tríada (`4 + 2 + 1 = 7`). Además, existe un bloque superior de tres bits especiales situado a la izquierda de la tríada del propietario: **SUID** (`4`), **SGID** (`2`) y **Sticky Bit** (`1`). En la práctica, estos doce bits conforman la máscara completa de cuatro dígitos octales que interpreta la llamada al sistema `chmod(2)` del kernel Linux.

## Guía práctica paso a paso para desarrolladores

Suponga que despliega una aplicación web Node.js o Python detrás de Nginx en un servidor Ubuntu, junto con una clave privada SSH para automatizar despliegues desde un agente de integración continua. Cada componente requiere una máscara distinta para cumplir el principio de mínimo privilegio.

1. **Protección de la clave privada SSH**: seleccione únicamente Lectura (`4`) y Escritura (`2`) para el Propietario, dejando Grupo y Otros completamente desmarcados. La calculadora devolverá el valor octal `0600` (o `600`) y la cadena simbólica `-rw-------`.
2. **Publicación de activos estáticos web**: para archivos HTML, hojas de estilo o imágenes que Nginx debe servir sin ejecutarlos, active Lectura y Escritura para el Propietario (`6`) y Lectura para Grupo y Otros (`4`). El resultado será `644` (`-rw-r--r--`).
3. **Configuración de directorios ejecutables**: los directorios que alojan activos web necesitan el bit `x` para que el proceso del servidor pueda atravesarlos. Active `rwx` en Propietario (`7`) y `rx` en Grupo y Otros (`5`), obteniendo `755` (`drwxr-xr-x`).
4. **Aplicación selectiva en terminal**: evite ejecutar `chmod -R` indiscriminadamente sobre carpetas mixtas, ya que otorgaría el bit de ejecución a archivos de texto o imágenes. Utilice `find` para separar archivos y directorios:

```bash
chmod 600 ~/.ssh/id_ed25519
find /var/www/app/public -type d -exec chmod 755 {} +
find /var/www/app/public -type f -exec chmod 644 {} +
chmod 3770 /srv/shared/uploads
```

## Tabla de referencia de permisos habituales en Unix y Linux

| Octal | Simbólico | Propietario (`u`) | Grupo (`g`) | Otros (`o`) | Uso recomendado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `400` | `-r--------` | Lectura | Ninguno | Ninguno | Claves privadas SSH de solo lectura |
| `600` | `-rw-------` | Lectura, Escritura | Ninguno | Ninguno | Claves `~/.ssh/id_ed25519` y archivos `.env` |
| `640` | `-rw-r-----` | Lectura, Escritura | Lectura | Ninguno | Configuraciones leídas por grupo de servicio |
| `644` | `-rw-r--r--` | Lectura, Escritura | Lectura | Lectura | Contenido web estático y código fuente |
| `700` | `-rwx------` | Completo | Ninguno | Ninguno | Directorio `~/.ssh` y scripts privados |
| `755` | `-rwxr-xr-x` | Completo | Lectura, Ejecución | Lectura, Ejecución | Directorios públicos y binarios |
| `1777` | `drwxrwxrwt` | Completo | Completo | Completo + Sticky | Directorio `/tmp` compartido |
| `2775` | `drwxrwsr-x` | Completo | Completo + SGID | Lectura, Ejecución | Carpetas colaborativas con herencia |

## Errores frecuentes en producción y riesgos de seguridad

El antipatrón más peligroso en entornos Unix consiste en recurrir a `chmod 777` para resolver errores de acceso denegado (`EACCES`). Al conceder escritura y ejecución global al bloque `others`, cualquier usuario sin privilegios o demonio comprometido (como un servidor HTTP expuesto a internet) puede sobrescribir scripts ejecutables, inyectar cargas maliciosas en directorios de carga o reemplazar configuraciones críticas. La solución correcta casi siempre implica ajustar la propiedad con `chown` hacia el usuario de servicio apropiado y mantener máscaras restrictivas como `750` o `640`.

Otro error habitual ocurre al olvidar el efecto del `umask` del proceso. Cuando un proceso crea un archivo nuevo, el kernel aplica la operación bit a bit `modo_solicitado & ~umask`. Un `umask` estándar de `0022` convierte el modo base `0666` de un archivo en `0644` y el modo `0777` de un directorio en `0755`. Si su aplicación genera archivos temporales sensibles, asegúrese de establecer explícitamente `0600` en la llamada de creación para evitar brechas de carrera antes de invocar `chmod`.

Finalmente, tenga especial precaución con los bits **SUID** (`4000`) y **SGID** (`2000`) sobre scripts interpretados. Aunque el kernel Linux ignora el bit SUID en scripts con *shebang* (`#!`) por razones de seguridad, aplicarlo a binarios compilados propios aumenta drásticamente la superficie de ataque ante desbordamientos de búfer o variables de entorno manipuladas. Audite periódicamente estos permisos en producción y reserve `chmod` simbólico (`chmod g+w`, `chmod o-rwx`) cuando necesite modificar un único bit sin alterar accidentalmente el resto de la máscara existente.
