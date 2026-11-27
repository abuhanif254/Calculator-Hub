---
metaTitle: "Convertidor de CSV a JSON Online | RFC 4180 y Autotipado"
metaDescription: "Transforme archivos CSV en JSON válido desde su navegador. Detección automática de delimitadores, campos entrecomillados RFC 4180 y coerción de tipos."
metaKeywords: "convertir csv a json, parsear csv navegador, rfc 4180 comillas, deteccion delimitador csv, ingestion datos nosql, api rest json, coercion de tipos csv"
title: "Convertidor de CSV a JSON con Inferencia de Tipos"
shortDescription: "Analice archivos CSV complejos y conviértalos en estructuras JSON limpias con detección automática de delimitadores, manejo estricto de comillas RFC 4180 y coerción inteligente de números y booleanos."
faqs:
  - question: "¿Cómo detecta el convertidor si el CSV usa comas, punto y coma o tabuladores?"
    answer: "El analizador inspecciona las primeras líneas no vacías fuera de segmentos entrecomillados y evalúa la consistencia estadística de coma (,), punto y coma (;), tabulador (\t) y barra vertical (|), eligiendo aquel que produce un recuento de columnas uniforme por fila."
  - question: "¿El analizador soporta saltos de línea y comas dentro de un campo CSV?"
    answer: "Sí. En lugar de dividir el texto ingenuamente por comas o saltos de línea, el motor emplea una máquina de estados conforme a RFC 4180 que rastrea si el cursor se encuentra dentro de comillas dobles, preservando comas, punto y coma y saltos multilínea."
  - question: "¿Qué ocurre con los códigos postales o IDs con ceros a la izquierda durante la coerción de tipos?"
    answer: "La coerción convierte literales numéricos puros en números JSON y true/false en booleanos. Para evitar perder ceros iniciales en valores como 08015 o identificadores numéricos largos, puede desactivar la coerción automática y tratar todas las celdas como cadenas."
  - question: "¿Cómo debo usar la salida JSON para ingerir datos en MongoDB o una API REST?"
    answer: "El convertidor genera un arreglo de objetos JSON utilizando la primera fila como claves de propiedad, formato compatible directamente con mongoimport (--jsonArray), cargas masivas por API REST y fetch en JavaScript o TypeScript."
  - question: "¿Los archivos CSV con datos personales o financieros se suben a algún servidor?"
    answer: "No. Todo el procesamiento léxico, la detección de delimitadores y la construcción del JSON ocurren íntegramente dentro de su navegador, sin envío de datos ni registro en servidores remotos."
features:
  - "Máquina de estados compatible con RFC 4180 para campos entrecomillados y multilínea"
  - "Detección heurística automática de delimitadores (coma, punto y coma, tabulador y pipe)"
  - "Coerción configurable de tipos hacia number, boolean y null desde texto plano CSV"
  - "Limpieza automática de cabecera UTF-8 BOM y normalización de finales de línea CRLF/LF"
  - "Generación de arreglos de objetos JSON listos para APIs REST y bases de datos NoSQL"
useCases:
  - "Ingerir catálogos de productos o listas de usuarios desde Excel hacia colecciones MongoDB o Firestore"
  - "Construir lotes de pruebas (fixtures) y cargas útiles JSON para endpoints REST y GraphQL"
  - "Migrar tablas heredadas de sistemas ERP hacia microservicios modernos basados en documentos"
  - "Transformar exportaciones de datos científicos o financieros en arreglos tipados para visualización web"
  - "Validar y depurar rápidamente archivos CSV defectuosos antes de procesarlos en pipelines ETL"
howToSteps:
  - "Pegue el contenido de su archivo CSV o cargue el documento local en el panel de entrada."
  - "Verifique el delimitador detectado automáticamente o ajústelo manualmente si es necesario."
  - "Active o desactive la coerción de números y booleanos según las necesidades de su esquema de destino."
  - "Copie el JSON resultante o descárguelo como archivo .json listo para su API o base de datos."
---

La ingestión de datos tabulares desde hojas de cálculo o sistemas heredados hacia APIs REST y bases de datos NoSQL exige una conversión precisa de CSV a JSON. Aunque el formato parece trivial a primera vista, dividir cadenas ingenuamente con `split(",")` corrompe los registros en cuanto aparecen direcciones postales con comas, descripciones multilínea entrecomilladas o separadores europeos.

Este convertidor utiliza un analizador léxico determinista que se ejecuta al 100 % en el cliente dentro de su navegador. Sus archivos CSV —nóminas, inventarios o volcados privados de clientes— jamás salen de su dispositivo ni pasan por servidores de terceros, garantizando confidencialidad absoluta y respuesta inmediata.

## Motor de análisis sintáctico: máquina de estados RFC 4180 y coerción de tipos

El formato CSV carece de tipos de datos nativos: en disco, toda celda es simplemente texto plano. Para reconstruir un arreglo JSON fiel y directamente usable en ingeniería, el motor ejecuta tres etapas secuenciales: limpieza de codificación, análisis mediante máquina de estados finitos y coerción opcional de escalares.

En primer lugar, el analizador detecta y elimina cualquier marca **UTF-8 BOM** (`\uFEFF`) al inicio del documento. De no retirarse, ese carácter invisible quedaría incrustado en el nombre de la primera clave JSON (`"\uFEFFid"`), provocando fallos difíciles de diagnosticar al leer la propiedad en código. Asimismo, normaliza finales de línea mixtos (`\r\n` de Windows y `\n` de Unix) para asegurar un recorrido uniforme.

A continuación, si no se fija un separador manual, el detector heurístico examina las primeras filas no vacías ignorando todo texto contenido dentro de comillas dobles. Evalúa la frecuencia y regularidad por columna de cuatro delimitadores habituales: coma (`,`), punto y coma (`;`), tabulador (`\t`) y barra vertical (`|`). El candidato con varianza nula entre líneas resulta seleccionado automáticamente.

El núcleo de lectura implementa una máquina de estados conforme a **RFC 4180** que rastrea límites de comillas y escapes `""`, traduciéndolos a comillas literales sin romper campos con comas ni saltos multilínea. Finalmente, la **coerción de tipos** evalúa cada celda: los literales `true` y `false` pasan a booleanos nativos, los valores numéricos estrictos en formato punto decimal se convierten en `number` y las celdas vacías se normalizan a `null` o cadena vacía según requiera el contrato de destino.

## Flujo práctico de ingestión: de exportación tabular a documento NoSQL

Considere un archivo CSV exportado en español con punto y coma, comillas escapadas, un salto de línea interno y valores numéricos y booleanos:

```csv
sku;nombre;precio;activo;notas
A-102;"Monitor ""Ultra"" 27";349.90;true;"Incluye cable HDMI;
garantía de 3 años"
A-103;Teclado Mecánico;89.50;false;Sin stock
```

1. **Cargue el CSV en el editor**: El motor retira cualquier cabecera BOM heredada de Excel, detecta el punto y coma (`;`) y mantiene intacto el campo multilínea del artículo `A-102`.
2. **Verifique encabezados**: La primera fila fija exactamente las claves de cada objeto (`sku`, `nombre`, `precio`, `activo`, `notas`). Si existieran encabezados duplicados, conviene renombrarlos para evitar sobrescrituras silenciosas.
3. **Habilite la coerción de tipos**: Así `precio` se emite como `number` y `activo` como `boolean`, cumpliendo esquemas estrictos en Mongoose, Prisma o Zod.
4. **Obtenga el JSON listo para su API REST o `mongoimport`**:

```json
[
  {
    "sku": "A-102",
    "nombre": "Monitor \"Ultra\" 27",
    "precio": 349.9,
    "activo": true,
    "notas": "Incluye cable HDMI;\ngarantía de 3 años"
  },
  {
    "sku": "A-103",
    "nombre": "Teclado Mecánico",
    "precio": 89.5,
    "activo": false,
    "notas": "Sin stock"
  }
]
```

## Matriz de referencia: inferencia de tipos y detección de delimitadores

La siguiente tabla resume cómo se transforman distintos patrones CSV durante la conversión hacia JSON:

| Entrada en CSV | Coerción activada | Coerción desactivada | Nota técnica clave |
| :--- | :--- | :--- | :--- |
| `42` / `349.90` | `42` / `349.9` (`number`) | `"42"` / `"349.90"` (`string`) | JSON no conserva ceros decimales finales en `number` |
| `1.234,56` (europeo) | `"1.234,56"` (`string`) | `"1.234,56"` (`string`) | Normalice formatos locales antes de convertir a flotante |
| `08015` (código postal) | `8015` o `"08015"` | `"08015"` (`string`) | Desactive coerción para preservar ceros iniciales |
| `9007199254740993` | Riesgo redondeo IEEE-754 | `"9007199254740993"` (`string`) | Supera `Number.MAX_SAFE_INTEGER`; manténgalo como texto |
| `true` / `false` | `true` / `false` (`boolean`) | `"true"` / `"false"` (`string`) | Ideal para banderas booleanas de API |
| Celda vacía (`;;`) | `null` o `""` | `""` (`string`) | Ajuste según la semántica de su esquema |
| `"Hola ""mundo"""` | `"Hola \"mundo\""` | `"Hola \"mundo\""` | Traduce escape RFC 4180 a JSON estándar |
| `col1\tcol2` | Delimitador `\t` (TSV) | Delimitador `\t` (TSV) | Común al copiar desde Excel o consultas SQL |

## Trampas comunes en producción, seguridad de entrada y rendimiento

Al llevar flujos de ingestión CSV a JSON a entornos de producción conviene vigilar cuatro riesgos críticos.

Primero, la **pérdida de precisión IEEE-754**. En JavaScript y JSON, todo número es un flotante de doble precisión de 64 bits; cualquier identificador numérico superior a 15 dígitos (`Number.MAX_SAFE_INTEGER`) sufrirá redondeo silencioso al convertirse en `number`. Conserve claves primarias largas, teléfonos o referencias bancarias como cadenas de texto.

Segundo, la **contaminación de prototipos (*Prototype Pollution*)**. Un archivo CSV malicioso con encabezados como `__proto__`, `constructor` o `prototype` puede alterar objetos en implementaciones ingenuas. Los analizadores seguros construyen registros sobre objetos sin prototipo (`Object.create(null)`) o validan los nombres de clave antes de serializar.

Tercero, las **filas con columnas desiguales y encabezados repetidos**. Descarte líneas en blanco al final del archivo para no inyectar objetos vacíos `{}` en su base de datos NoSQL, asegure que no existan columnas homónimas que se sobrescriban y valide el recuento de campos por fila antes de enviar la carga útil.

Por último, en cuanto al **rendimiento en navegador**, recorrer la cadena mediante un cursor por índices sin fragmentarla previamente con expresiones regulares reduce drásticamente la presión sobre memoria y evita bloqueos del hilo principal. Si procesa decenas de megabytes destinados a MongoDB o Elastic, considere transformar el arreglo resultante a formato **NDJSON** (un objeto JSON por línea) por lotes controlados.
