---
metaTitle: "Anonimizador de Bases de Datos | PII en CSV, JSON y SQL"
metaDescription: "Detecta 31 tipos de PII y anonimiza exportaciones CSV, TSV, JSON o SQL en tu navegador con 10 estrategias de enmascarado local y sin subidas."
metaKeywords: "anonimizador de bases de datos, enmascarar SQL, anonimizar CSV, eliminar PII, cumplimiento RGPD, HIPAA Safe Harbor, datos sintéticos, ofuscar JSON, enmascarado local"
title: "Anonimizador de Volcados de Bases de Datos"
shortDescription: "Detecta automáticamente 31 tipos de datos personales (PII) y credenciales en exportaciones CSV, TSV, JSON y tablas SQL, y sanéalos localmente en tu navegador con 10 estrategias configurables sin subir archivos a ningún servidor."
faqs:
  - question: "¿Este anonimizador sube mis volcados de producción a algún servidor externo?"
    answer: "No. La lectura del archivo, el perfilado de PII, la aplicación de reglas por columna y la exportación a CSV, JSON o TSV se ejecutan íntegramente en la memoria local de tu navegador. Una vez cargada la página, puedes desconectar la red y sanear conjuntos de datos sin conexión, sin almacenamiento en disco ni telemetría."
  - question: "¿Cómo puedo anonimizar un volcado SQL procedente de PostgreSQL o MySQL?"
    answer: "Exporta las tablas objetivo desde tu base de datos o volcado a formato CSV, TSV o JSON mediante utilidades como COPY TO STDOUT en PostgreSQL o SELECT INTO OUTFILE en MySQL, enmascara las columnas sensibles en este espacio de trabajo y recarga el archivo saneado en staging. Los extractos línea por línea en .txt y .log también se admiten directamente."
  - question: "¿Qué tipos de PII y credenciales sensibles detecta el escáner automáticamente?"
    answer: "El detector híbrido analiza 31 clases de identificadores repartidas en niveles de riesgo Alto, Medio y Bajo: correos electrónicos, teléfonos, números de seguridad social (SSN), tarjetas de crédito (PAN), IBAN, fechas de nacimiento, direcciones postales, direcciones IPv4 e IPv6, historias clínicas, hashes de contraseñas, claves API y tokens JWT."
  - question: "¿Qué estrategia de enmascarado preserva las uniones relacionales y la distribución estadística?"
    answer: "Usa Tokenizar o Hash determinista para conservar la igualdad uno a uno en uniones por clave foránea y deduplicación dentro del conjunto. Elige Mezclar en columna (Fisher-Yates) cuando los paneles de BI o los planes de consulta necesiten la distribución exacta, la cardinalidad y la tasa de nulos originales sin vincular registros a personas reales."
  - question: "¿Qué límites de tamaño de archivo y número de filas aplican al procesamiento en el navegador?"
    answer: "El motor local admite archivos de hasta 50 MB y analiza hasta 50 000 filas por sesión en formatos CSV, TSV, JSON, TXT y LOG. Para volcados de producción de varios gigabytes, extrae primero una muestra representativa con LIMIT o TABLESAMPLE antes de enmascarar."
features:
  - "Ejecución 100 % del lado del cliente en el navegador sin subidas a la nube, persistencia en servidor ni llamadas a APIs externas"
  - "Motor híbrido de detección de PII que clasifica 31 tipos de datos personales y secretos combinando tasa de coincidencia regex, alias de cabeceras y ponderación por especificidad"
  - "10 estrategias configurables por columna: Redactar, Anular, Máscara parcial, Hash determinista, Datos sintéticos, Preservar formato, Tokenizar, Mezclar en columna, Desplazar fecha y Generalizar"
  - "Detección automática de formato y análisis RFC 4180 para archivos CSV entrecomillados, TSV, arreglos JSON heterogéneos y registros TXT o LOG de hasta 50 MB y 50 000 filas"
  - "Perfilado por niveles de riesgo (Alto, Medio y Bajo) con barras de confianza porcentual, vista previa enmascarada de muestra e interruptores individuales por columna"
  - "Tabla interactiva de vista previa Original frente a Anonimizado con exportación en un clic a CSV, JSON o TSV"
useCases:
  - "Sanear exportaciones de tablas de PostgreSQL, MySQL o SQLite antes de sembrar bases de datos locales de desarrollo y pipelines de staging en CI/CD"
  - "Enmascarar correos electrónicos, teléfonos, documentos de identidad y tarjetas de pago en extractos CSV de CRM o ERP compartidos con equipos externos de QA"
  - "Aplicar permutación Fisher-Yates y generalización numérica de 10 unidades para preparar conjuntos analíticos compatibles con el RGPD y HIPAA Safe Harbor"
  - "Limpiar tokens JWT, claves API, hashes de contraseñas e IPs de clientes capturados accidentalmente en archivos TXT y LOG antes de adjuntarlos a reportes de incidencias"
  - "Generar datos de prueba realistas a partir de colecciones JSON de MongoDB o respuestas de APIs REST sin romper validadores de esquema ni componentes de interfaz"
  - "Construir tablas de pruebas tokenizadas con consistencia interna donde los identificadores recurrentes sigan siendo enlazables entre filas sin exponer identidades reales"
howToSteps:
  - "Exporta las tablas objetivo en formato CSV, TSV, JSON o texto plano delimitado por líneas (hasta 50 MB y 50 000 filas), o pulsa Probar con datos de ejemplo para cargar una muestra integrada."
  - "Arrastra y suelta el archivo en la zona de carga para activar la detección automática de formato y el análisis local de columnas."
  - "Revisa el resumen del escaneo PII con el recuento total de filas, las columnas marcadas, las etiquetas de riesgo Alto, Medio o Bajo y el porcentaje de confianza."
  - "Activa o desactiva cada columna y asigna la estrategia adecuada, como Datos sintéticos para correos, Preservar formato para direcciones IP o Tokenizar para claves de enlace."
  - "Ejecuta la anonimización en memoria y alterna entre las vistas Original y Anonimizado en la tabla de vista previa para comprobar que cada regla cumple tus requisitos."
  - "Elige CSV, JSON o TSV en el selector de salida y descarga el conjunto saneado listo para importarlo en entornos de staging o compartirlo con seguridad."
---

Copiar volcados de producción sin sanear hacia entornos de *staging*, CI/CD o equipos locales expone datos personales, provoca correos accidentales a clientes reales e infringe la minimización exigida por el RGPD. Mantener scripts manuales ante cada cambio de esquema resulta lento y frágil. El **Anonimizador de Volcados de Bases de Datos** procesa archivos CSV, TSV, JSON y registros TXT/LOG en tu navegador —hasta 50 MB y 50 000 filas sin transferencias de red—, detecta 31 clases de PII y credenciales, y enmascara cada columna localmente.

## Arquitectura de análisis y detección híbrida de PII

Al cargar un archivo, el motor identifica su sintaxis mediante la extensión y pistas estructurales: `[` o `{` iniciales activan JSON, la proporción de tabuladores frente a comas en la primera línea separa TSV de CSV, y los textos sin delimitador pasan a modo de columna única para `.log` y `.txt`. El lector CSV (**RFC 4180**) conserva comas entrecomilladas, decodifica comillas duplicadas (`""`) y rellena filas incompletas al ancho del encabezado; el lector JSON calcula la unión total de claves en arreglos heterogéneos para no descartar campos opcionales.

Filtrar solo por cabeceras ignora columnas genéricas como `payload` o `attr_1`, mientras que usar solo regex confunde identificadores de pedido con teléfonos. El escáner resuelve ambos límites combinando dos señales ponderadas:

1. **Densidad muestral (hasta 60 puntos):** Muestrea hasta 200 celdas no vacías por columna frente a 31 patrones en dominios clave: Contacto (`email`, `phone`, `url`, `username`), Identidad (`full_name`, `first_name`, `last_name`), Documentos oficiales (`ssn`, `passport`, `national_id`, `drivers_license`), Financieros (`credit_card`, `bank_account`, `iban`, `tax_id`), Red (`ip_address`, `ipv6`, `mac_address`, `device_id`), Demografía (`date_of_birth`, `gender`, `age`), Ubicación (`address`, `zip_code`, `coordinates`), Clínicos (`medical_record`), Vehículos (`vin`) y Seguridad (`password_hash`, `api_key`, `jwt_token`, `uuid`).
2. **Alias y especificidad:** Los encabezados normalizados (`pan`, `card_no`, `remote_addr`, `mrn`, `ein`, `passwd`) añaden **+35 puntos** (o disparan un **65 %** por cabecera en columnas dispersas). Los formatos estrictos suman desempate (**+20** en `ssn` y PAN Visa/Mastercard/Amex/Discover; **+15** en `email`).

Las columnas con al menos **20 %** de confianza reciben insignia `High`, `Medium` o `Low` y una regla inicial: `Synthetic / Fake Data` para correos y nombres, `Partial Mask` para tarjetas y SSN, `Format-Preserving` para IPv4/IPv6, `Tokenize` para UUID/`device_id`, `Date Shift` para fechas de nacimiento y `Redact` para riesgo bajo.

## Comparativa de las 10 estrategias de enmascarado

Elegir la transformación adecuada equilibra el riesgo de reidentificación con restricciones de esquema, uniones y utilidad analítica.

| Estrategia | Ejemplo | `JOIN` | Fidelidad estadística | Uso ideal |
| :--- | :--- | :--- | :--- | :--- |
| **Redact** | `[REDACTED]` | No | Nula | Purgar secretos y notas |
| **Nullify** | *(vacío)* | No | Nula | Limpiar campos nulables |
| **Partial Mask** | `****-****-****-1111` | No | Solo extremos | UI de recibos y perfiles |
| **Deterministic Hash** | `64 hex` | Sí | Cardinalidad | Deduplicación de claves |
| **Synthetic Data** | `Bob Johnson` | No | Solo formato | Semillas de *staging* |
| **Format-Preserving** | `847.392.4.615` | No | Longitud y sintaxis | Reglas `CHECK` regex |
| **Tokenize** | `TOK_000001` | Sí | Cardinalidad | Claves intraarchivo |
| **Shuffle Column** | Permuta celdas | No | Exacta (100 %) | Histogramas y BI |
| **Date Shift (±30d)** | `1990-04-02` | No | Aproximada | Intervalos relativos |
| **Generalize** | `30-40` / `1990` | Por rangos | Bloques gruesos | Cuasi-identificadores |

Tres mecanismos merecen atención en revisión técnica. **Shuffle Within Column** ejecuta una permutación **Fisher-Yates** en tiempo `O(n)` que mantiene al 100 % cardinalidad, extremos y tasa de nulos rompiendo la asociación por fila. **Tokenize** mantiene un `Map` efímero en memoria (`TOK_000001`, `TOK_000002`) que se borra en cada ejecución sin escribir claves de reversión en disco. **Generalize** agrupa números en tramos de 10 (`34 → 30-40`) y reduce fechas al año.

## Extracción, saneado y recarga CLI de volcados SQL

Como los archivos `.sql` masivos mezclan DDL e inserciones crudas, extrae cortes acotados a CSV o JSON, anonimízalos localmente y recarga la salida en *staging*:

```bash
# 1. PostgreSQL: exportar 50 000 filas con cabecera CSV
psql "$PROD_REPLICA_URL" -c \
  "\copy (SELECT id, first_name, last_name, email, phone, dob, ip_address \
          FROM users ORDER BY id DESC LIMIT 50000) \
   TO 'users_slice.csv' WITH (FORMAT csv, HEADER true)"

# 2. MongoDB: exportar colección NoSQL como arreglo JSON
mongoexport --uri="$PROD_MONGO_RO" --collection=customers \
  --limit=50000 --jsonArray --out=customers_slice.json

# 3. Importar el CSV saneado en staging
psql "$STAGING_DB_URL" -c \
  "\copy users(id, first_name, last_name, email, phone, dob, ip_address) \
   FROM 'anonymized_users_slice.csv' WITH (FORMAT csv, HEADER true)"
```

Alterna la tabla **Data Preview** (5 filas) entre `Original` y `Anonymized` antes de exportar. CSV aplica comillas RFC 4180, TSV encaja con `awk`/`cut` y JSON genera arreglos sangrados para `mongoimport`. Puedes auditar delimitadores en el [Visor y Analizador de CSV](/es/herramientas/csv-viewer), ordenar consultas en el [Formateador y Embellecedor de SQL](/es/herramientas/sql-formatter), validar arreglos en el [Formateador y Validador de JSON](/es/herramientas/json-formatter) o crear registros ficticios con el [Generador de Datos de Usuarios Falsos](/es/herramientas/fake-user-data-generator).

## Límites normativos y seguridad criptográfica

### RGPD (anonimización frente a seudonimización) e HIPAA Safe Harbor

Bajo el Considerando 26 del RGPD, los registros abandonan el alcance regulatorio solo cuando la reidentificación deja de ser razonablemente probable mediante tablas auxiliares. Los hashes deterministas y tokens son **seudonimización** (Artículo 4.5): mitigan filtraciones en pruebas, pero siguen regulados mientras exista correlación posible. Bajo **HIPAA Safe Harbor** (45 CFR §164.514(b)(2)), neutraliza los 18 identificadores, incluidas fechas exactas de nacimiento (usa `Generalize` para dejar solo el año), códigos postales completos, `mrn` e IPs de cliente.

### Hashes sin sal y cuasi-identificadores compuestos

Evita el hash determinista sin clave en dominios de baja entropía (SSN de 9 dígitos o correos corporativos): el modo síncrono usa un resumen rápido FNV-1a de 32 bits repetido a 64 caracteres hexadecimales, inadecuado frente a diccionarios. Para uniones ETL entre múltiples tablas con resistencia criptográfica, utiliza una construcción con clave secreta verificable en el [Generador HMAC](/es/herramientas/hmac-generator). Revisa además **cuasi-identificadores compuestos** (`zip_code` + `date_of_birth` + `gender`) e inspecciona tokens `jwt_token` en el [Decodificador JWT](/es/herramientas/jwt-decoder) antes de aplicar `Redact` o `Nullify`.
