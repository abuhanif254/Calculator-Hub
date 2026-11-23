---
metaTitle: "Visor y Analizador de CSV Online | Editor y CSV a JSON"
metaDescription: "Abre, edita, valida y analiza archivos CSV en tu navegador con análisis RFC 4180, detección de delimitadores, filtros y conversión a JSON."
metaKeywords: "visor csv, analizador csv, editor csv online, convertir csv a json, validar csv, rfc 4180, delimitador punto y coma, bom utf-8, inyeccion formulas csv"
title: "Visor y Analizador de CSV"
shortDescription: "Inspecciona, edita, valida y convierte archivos CSV localmente en una cuadrícula interactiva tipo hoja de cálculo con analizador RFC 4180, autodetección de delimitadores y exportación segura a JSON, TSV y TXT."
faqs:
  - question: "¿Por qué este visor conserva los ceros iniciales y fechas ISO que Excel altera al abrir un CSV?"
    answer: "Las hojas de cálculo de escritorio convierten agresivamente cadenas numéricas como códigos postales, SKUs o identificadores bancarios en números de coma flotante y reformatean fechas ISO al importar. Este analizador almacena cada celda como cadena exacta sin modificar y ejecuta la inferencia de tipos por separado para el diagnóstico."
  - question: "¿Qué delimitadores y saltos de línea detecta automáticamente el analizador?"
    answer: "La heurística inspecciona las primeras cinco líneas no vacías ignorando separadores dentro de campos entrecomillados, distinguiendo con precisión comas, puntos y coma (habituales en Excel en español), tabuladores y barras verticales tanto con saltos Windows CRLF como Unix LF."
  - question: "¿Cómo protege la herramienta los archivos exportados contra la inyección de fórmulas CSV?"
    answer: "Durante la serialización a CSV y TSV, cualquier celda que empiece por '=', '+', '-', '@', tabulador o retorno de carro recibe automáticamente un apóstrofo inicial (') para que Excel y LibreOffice Calc la interpreten como texto literal en lugar de ejecutar una fórmula."
  - question: "¿Puedo convertir un arreglo JSON con objetos heterogéneos o anidados a una tabla CSV plana?"
    answer: "Sí. El conversor de JSON a CSV recorre todos los objetos del arreglo para construir la unión completa de claves como encabezados, deja vacías las propiedades ausentes en cada registro y serializa los objetos o arreglos anidados como cadenas JSON debidamente escapadas."
  - question: "¿Se suben mis archivos CSV financieros o de recursos humanos a algún servidor remoto?"
    answer: "No. La lectura del archivo, la tokenización RFC 4180, el perfilado de columnas, la edición en línea y las exportaciones se ejecutan íntegramente en la memoria local de tu navegador; los cambios temporales solo se persisten en el localStorage de tu equipo."
features:
  - "Analizador de máquina de estados RFC 4180 compatible con comillas dobles escapadas, celdas multilínea y eliminación automática de BOM UTF-8"
  - "Detección heurística de delimitadores para conjuntos separados por coma, punto y coma, tabulador o barra vertical"
  - "Cuadrícula interactiva con edición en línea mediante doble clic, historial de deshacer/rehacer de 20 pasos, ordenación numérica natural y visibilidad de columnas"
  - "Búsqueda global con distinción de mayúsculas, salto entre coincidencias y filtrado de filas en tiempo real"
  - "Panel de analítica y validador estructural con inferencia de tipos, recuento de vacíos, filas duplicadas y detección de filas desalineadas con número de línea"
  - "Conversión bidireccional CSV ↔ JSON y exportación protegida contra inyección de fórmulas hacia CSV, TSV, JSON y TXT tabulado"
useCases:
  - "Auditar exportaciones contables, extractos bancarios o volcados de Stripe sin que Excel trunque números de cuenta ni altere códigos postales"
  - "Detectar filas mal formadas, cabeceras duplicadas y registros repetidos antes de ejecutar cargas masivas con COPY en PostgreSQL o Snowflake"
  - "Transformar respuestas JSON de APIs REST en tablas CSV limpias listas para equipos de finanzas, operaciones o análisis comercial"
  - "Convertir catálogos de productos o matrices de configuración tabulares en arreglos JSON estructurados para pruebas y semillas frontend"
  - "Corregir rápidamente archivos CSV delimitados por punto y coma procedentes de configuraciones regionales de España y Latinoamérica"
  - "Inspeccionar registros TSV generados por servidores y exportarlos como tablas ASCII alineadas con barras para incidencias de ingeniería"
howToSteps:
  - "Carga un archivo .csv o .tsv arrastrándolo al área de trabajo, pega el texto desde el portapapeles o abre uno de los conjuntos de ejemplo."
  - "Explora la cuadrícula en la pestaña Visor, haz clic en cualquier cabecera para ordenar numérica o alfabéticamente y filtra filas en tiempo real."
  - "Usa la búsqueda global —con opción de distinguir mayúsculas y minúsculas— para localizar y recorrer celdas coincidentes en tablas extensas."
  - "Haz doble clic sobre una celda para editar su valor en línea y emplea Ctrl+Z o Ctrl+Shift+Z para deshacer o rehacer hasta 20 estados."
  - "Abre las pestañas Analítica y Validación para revisar los tipos inferidos por columna, celdas vacías, duplicados exactos y errores de longitud por línea."
  - "Cambia a CSV → JSON o JSON → CSV para transformar esquemas, o descarga el conjunto depurado en CSV, TSV, JSON o TXT."
---

El formato **CSV (Valores Separados por Comas)** sigue siendo el estándar universal de intercambio entre bases de datos, sistemas ERP y plataformas SaaS, pero abrir un CSV sin procesar en una hoja de cálculo de escritorio conlleva riesgos frecuentes. Excel elimina silenciosamente los ceros iniciales de códigos postales (`08001` pasa a `8001`), convierte identificadores de 16 dígitos en notación científica y fusiona en una sola columna los archivos con punto y coma generados en español. Este **Visor y Analizador de CSV** procesa tus archivos en memoria local con una máquina de estados estricta **RFC 4180**, preservando el contenido exacto de cada celda mientras ofrece edición, validación estructural y conversión a JSON sin subir datos a la red.

## Análisis RFC 4180, eliminación de BOM UTF-8 y detección de delimitadores

Los archivos CSV reales rompen al instante cualquier análisis simple basado en `linea.split(',')` en cuanto una descripción contiene comas, comillas o saltos de línea. Nuestro analizador recorre el flujo carácter a carácter respetando cada regla del RFC 4180:

- **Eliminación del BOM UTF-8 (`0xEF 0xBB 0xBF`)**: Excel y muchos informes corporativos insertan la marca invisible `U+FEFF` al comienzo del archivo. Si no se retira antes de tokenizar, el primer encabezado queda corrompido (`\uFEFFID`) y fallan las búsquedas por clave en Python, Node.js o SQL. El motor limpia ese prefijo automáticamente.
- **Campos entrecomillados y comillas duplicadas**: Al abrir `"` se activa el modo entrecomillado para conservar comas, puntos y coma y saltos `CRLF`/`LF` dentro de la misma celda. Las comillas dobles adyacentes (`""`) se decodifican en una sola comilla literal `"`.
- **Puntuación heurística de delimitadores**: El motor analiza las cinco primeras líneas no vacías contando apariciones no entrecomilladas de `,`, `;`, `\t` y `|`. Los candidatos con recuento positivo idéntico en todas las filas reciben una bonificación `10x`, separando con precisión los CSV de España y Latinoamérica con `;` de los estándares con coma o tabulador.

Observa cómo un registro multilínea con comillas escapadas se interpreta sin corrupción bajo RFC 4180:

```csv
SKU,Producto,Notas,Precio
PRD-004,"Monitor 27"" 4K","Incluye cables HDMI, DP
y USB-C certificados",549.99
PRD-012,"Monitor 34"" Ultrawide","Envío en caja plana",899.99
```

Aquí `27""` se decodifica como `27"` y el salto de línea en `Notas` permanece en la tercera columna de la primera fila sin crear registros rotos.

## Comparativa de formatos de exportación tabulares y estructurados

Cada sistema aguas abajo impone requisitos distintos sobre separadores, escape y esquema. Usa esta matriz para elegir el formato de salida adecuado.

| Formato | Tipo MIME | Separación y entrecomillado | Fidelidad de esquema | Uso recomendado |
| :--- | :--- | :--- | :--- | :--- |
| **CSV (`.csv`)** | `text/csv` | Comas; comillas dobles RFC 4180 | Rejilla plana uniforme | `COPY` en PostgreSQL, CRM, Excel |
| **TSV (`.tsv`)** | `text/tab-separated-values` | Tabulador (`\t`); mínimo entrecomillado | Rejilla plana sin choques de coma | Bioinformática, Unix `awk`/`cut` |
| **JSON (`.json`)** | `application/json` | Arreglo de objetos con sangría de 2 espacios | Claves mapeadas por cabecera | APIs REST, NoSQL, apps JS/Python |
| **TXT (`.txt`)** | `text/plain` | Columnas ` \| ` con relleno de espacios | Alineación visual de ancho fijo | Jira, Slack, bitácoras técnicas |

## Perfilado de columnas, validación estructural y conversión bidireccional

### Inferencia de tipos y detección de anomalías

Al cargar un conjunto, el analizador contrasta las celdas no vacías de cada columna frente a valores booleanos (`true`, `false`, `yes`, `no`), formatos numéricos y cinco patrones de fecha (`YYYY-MM-DD`, `MM/DD/YYYY`, `MM-DD-YYYY`, `YYYY/MM/DD` y `D Mon YYYY`). Si al menos el **80%** coincide con una categoría, la columna adopta ese tipo; de lo contrario se etiqueta como `mixed` para detectar datos heterogéneos antes de la carga ETL.

En paralelo, el validador audita tres defectos críticos:
- **Filas desalineadas**: Las filas con menos campos que el encabezado generan advertencia (`warning`) y se rellenan con cadenas vacías; las que exceden el encabezado emiten un `error` con el número exacto de línea (base 1).
- **Integridad de cabeceras**: Alerta sobre nombres vacíos o duplicados (sin distinguir mayúsculas) que sobrescribirían claves al exportar a JSON.
- **Duplicados exactos**: Cada fila se indexa con una huella separada por byte nulo (`\x00`) para cuantificar registros repetidos, celdas vacías y peso estimado.

### Conversión CSV ↔ JSON y herramientas complementarias

Las pestañas **CSV → JSON** y **JSON → CSV** permiten transformar esquemas sin escribir scripts desechables. Ante arreglos JSON heterogéneos con claves opcionales, el conversor calcula la unión completa de propiedades y serializa objetos anidados como texto escapado. Si después necesitas validar o minificar la salida, ábrela en el [Formateador JSON](/es/herramientas/json-formatter); para publicar el conjunto en la web, pásalo al [Generador de Tablas HTML](/es/herramientas/html-table-generator); y para depurar las consultas de extracción originales, usa el [Formateador SQL](/es/herramientas/sql-formatter).

## Mitigación de inyección de fórmulas CSV (DDE) y criterio ETL

Un fallo de seguridad frecuente al exportar formularios web es la **inyección CSV** (inyección de fórmulas/DDE). Si un atacante guarda `=HYPERLINK("https://sitio.ejemplo","Abrir")` o `+cmd|' /C calc'!A0`, abrir el archivo en Excel o Calc puede ejecutar fórmulas externas o filtrar celdas.

Al exportar a `.csv` y `.tsv`, la herramienta antepone automáticamente un apóstrofo (`'`) a cualquier celda que empiece por `=`, `+`, `-`, `@`, `\t` o `\r` antes del entrecomillado RFC 4180. Ten en cuenta un matiz clave para ingeniería de datos: si tu archivo contiene importes negativos legítimos (`-42.50`) dirigidos a un cargador numérico de PostgreSQL, Snowflake o `pandas`, exporta en **JSON** o asegúrate de que tu proceso de ingesta retire el prefijo protector cuando proceda.
