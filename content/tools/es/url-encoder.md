---
metaTitle: "Codificador y Decodificador de URL Online | encodeURIComponent"
metaDescription: "Utilidad avanzada de codificación de URL (percent-encoding). Soporta encodeURI, encodeURIComponent, análisis de cadenas de consulta y conversión Unicode."
metaKeywords: "codificador url, decodificador url, codificar url, percent encoding, encodeURIComponent, encodeURI, decodificar cadena url, url utf8"
title: "Codificador y Decodificador de URL"
shortDescription: "Utilidad avanzada de codificación de URL. Soporta encodeURI, encodeURIComponent, análisis de parámetros de consulta y conversión Unicode en tiempo real."
faqs:
  - question: "¿Qué es la codificación de URL?"
    answer: "La codificación de URL (percent-encoding) es un mecanismo para convertir caracteres que no están permitidos en las URL (como espacios o emojis) en un formato seguro para la web mediante un signo '%' seguido de dígitos hexadecimales."
  - question: "¿Por qué las URL necesitan codificación?"
    answer: "Las URL solo se pueden enviar a través de Internet utilizando el conjunto de caracteres ASCII básico. Cualquier carácter fuera de este conjunto, o caracteres que tengan un significado estructural especial en una URL, deben codificarse para que el servidor web la analice correctamente."
  - question: "¿Qué es percent encoding?"
    answer: "Percent encoding (codificación por ciento) es el término técnico formal para la codificación de URL. Se refiere a la práctica de sustituir un carácter inseguro por un signo de porcentaje (%) y su valor en bytes hexadecimales de 2 dígitos."
  - question: "¿Cómo decodifico una URL?"
    answer: "Simplemente pega tu URL codificada en nuestra herramienta y asegúrate de seleccionar la pestaña 'Decodificar'. La herramienta analizará automáticamente la cadena y revertirá todas las secuencias % a sus caracteres legibles originales."
  - question: "¿Cuál es la diferencia entre encodeURI y encodeURIComponent?"
    answer: "encodeURI está diseñado para codificar una URL completa; no altera los caracteres estructurales como 'http://' y '/'. encodeURIComponent es estricto: codifica casi todo, incluidas las barras. Solo debe usarse para codificar valores de parámetros de consulta individuales."
features:
  - "Codificación y decodificación de URL bidireccional instantánea en tiempo real"
  - "Cambio entre encodeURI (URL completas) y encodeURIComponent (parámetros)"
  - "Inspector de parámetros de consulta interactivo para editar pares clave-valor visualmente"
  - "Soporte completo de codificación porcentual de emojis UTF-8 y Unicode"
  - "Detección inteligente de caracteres de doble codificación y formatos URI no válidos"
  - "Manejo elegante de errores para secuencias mal formadas"
  - "100% de ejecución local del lado del cliente para absoluta privacidad y seguridad"
useCases:
  - "Preparación de entrada del usuario para pasar como parámetros de consulta de URL en solicitudes de API"
  - "Decodificación de enlaces de seguimiento ofuscados para ver el destino original"
  - "Depuración de respuestas de servidor de doble codificación donde los espacios se convierten en '%2520'"
  - "Inspección visual y edición de cadenas de consulta masivas de campañas de marketing"
  - "Conversión de caracteres Unicode y emojis en enlaces ASCII válidos"
howToSteps:
  - "Selecciona el modo de operación: 'Codificar' o 'Decodificar'."
  - "Pega tu URL o cadena de texto en el panel de entrada."
  - "Si estás codificando, elige entre 'Componente' (codificación estricta) o 'URL Completa' (ignora barras)."
  - "Observa cómo el panel de salida genera instantáneamente la cadena codificada y segura."
  - "Si tu URL contiene una cadena de consulta, desplázate hacia abajo hasta el 'Inspector de Consultas' para editar parámetros individualmente."
  - "Usa la barra de herramientas para copiar la salida o descargarla como un archivo de texto."
---

## ¿Qué es la codificación de URL?

**La codificación de URL**, formalmente conocida como percent-encoding (codificación por ciento), es un mecanismo para codificar información en un Identificador Uniforme de Recursos (URI). Las URL solo se pueden enviar a través de Internet utilizando el conjunto de caracteres ASCII. Debido a que a menudo contienen caracteres fuera de este conjunto (como espacios, emojis o caracteres internacionales), deben convertirse a un formato ASCII válido.

La codificación de URL reemplaza los caracteres ASCII inseguros con un `%` seguido de dos dígitos hexadecimales que representan el valor numérico del carácter. Por ejemplo, un simple carácter de espacio se reemplaza por `%20`.

---

## ¿Qué es Percent Encoding?

El percent-encoding es el término técnico exacto definido por el RFC 3986. El concepto es simple: si un carácter está reservado o no permitido en un URI, el navegador o servidor lo reemplaza con un signo de porcentaje `%` y su valor hexadecimal.

Por ejemplo, el signo de exclamación `!` se convierte en `%21` y el símbolo de almohadilla `#` se convierte en `%23`. Esto evita que los servidores web confundan los datos dentro de una URL con los componentes estructurales de la propia URL.

---

## Cómo funciona la codificación de URL

Cuando un navegador encuentra una URL, necesita analizarla en distintas partes: protocolo, dominio, ruta, parámetros de consulta y fragmentos. Ciertos caracteres están "reservados" porque se usan como delimitadores para separar estas partes.

Si deseas pasar un carácter reservado como datos reales, debes codificarlo. Cuando se codifica una cadena, el sistema la procesa byte a byte. Para los caracteres Unicode modernos (como Emojis), el carácter primero se convierte en una secuencia de bytes UTF-8 y luego cada byte se codifica porcentualmente.

---

## encodeURI vs encodeURIComponent

Si eres desarrollador de JavaScript, utilizarás con frecuencia dos funciones integradas: `encodeURI()` y `encodeURIComponent()`.

**encodeURI()**: Se utiliza para codificar una URL completa y funcional. Ignora los prefijos de protocolo y los separadores de dominio. NO codificará caracteres como `?`, `=`, `&`, `/` o `:`.

**encodeURIComponent()**: Se utiliza para codificar un componente específico de una URL, normalmente el valor de un parámetro de consulta. Lo codifica casi todo.

*Regla general: si estás creando una cadena de consulta como `?name=${value}`, usa siempre `encodeURIComponent(value)`.*

---

## Errores comunes de codificación de URL

1. **Doble codificación**: Codificar una cadena ya codificada. Por ejemplo, codificar un espacio (` `) lo convierte en `%20`. Si se vuelve a codificar, el `%` se convierte en `%25`, lo que da como resultado `%2520`.
2. **Codificación incorrecta de la URL completa**: Usar `encodeURIComponent` en una URL completa convierte `https://google.com` en `https%3A%2F%2Fgoogle.com`, a lo que el navegador no puede navegar.
3. **Manejo incorrecto de espacios**: En los parámetros de consulta, un espacio se codifica tradicionalmente como un signo más (`+`), mientras que en las rutas de URL, se codifica como `%20`.

---

## Consideraciones de seguridad

La codificación de URL es crucial para evitar ataques de inyección (XSS). Cuando se refleja la entrada del usuario directamente en un hipervínculo o una etiqueta `src` de imagen, no codificar la cadena permite a los atacantes inyectar código.

Sin embargo, recuerda que la codificación de URL **no** es encriptación. No proporciona confidencialidad y es completamente reversible por cualquier persona. No pases información confidencial en las URL, ya que se guardarán en el historial del navegador y en los registros del servidor.
