---
title: "Técnicas de Enmascaramiento de Datos: Hashing, Tokenización y Redacción"
description: "Compare las técnicas más efectivas de enmascaramiento de datos — hashing criptográfico, tokenización, redacción, seudonimización y cifrado con preservación de formato."
category: "Privacy & Security"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "database-anonymizer"
relatedType: "tool"
faqs:
  - question: "¿Cuándo debe elegirse tokenización en lugar de hashing criptográfico?"
    answer: "La tokenización con bóveda es indispensable cuando el flujo operativo necesita recuperar el valor original autorizado, como procesar un reembolso o reenviar una notificación al cliente. El hashing con sal (HMAC-SHA256) es irreversible y resulta preferible para anonimizar entornos de pruebas o realizar cruces analíticos sin necesidad de revertir el dato."
  - question: "¿Cuál es la diferencia entre enmascaramiento estático (SDM) y dinámico (DDM)?"
    answer: "El enmascaramiento estático transforma físicamente los datos al copiarlos hacia un entorno secundario como desarrollo, QA o un lago de datos, eliminando el valor real del disco destino. El enmascaramiento dinámico oculta el dato en tiempo de consulta según el rol del usuario sin modificar la tabla original en producción."
  - question: "¿Por qué los algoritmos con preservación de formato (FPE) como AES-FF1 tienen restricciones de longitud?"
    answer: "Según la norma NIST SP 800-38G, un esquema de cifrado con preservación de formato requiere que el tamaño del dominio sea al menos 1,000,000 de valores posibles (radix^n ≥ 10^6) para mantener su seguridad criptográfica. Si la cadena es demasiado corta, por ejemplo un PIN de 4 dígitos (10^4 = 10,000), resulta vulnerable a ataques de fuerza bruta o análisis de diccionario."
  - question: "¿Cómo se evita la pérdida de integridad referencial al enmascarar varias tablas?"
    answer: "Las claves primarias y foráneas deben transformarse con una función determinista que emplee exactamente la misma clave secreta o tabla de mapeo en todas las tablas del lote. De ese modo, el mismo identificador de cliente genera idéntico valor sustituido en clientes, pedidos y pagos, permitiendo ejecutar JOIN sin errores."
  - question: "¿Puede un usuario inferir valores protegidos mediante enmascaramiento dinámico?"
    answer: "Sí, si conserva permisos para ejecutar filtros WHERE, ORDER BY o comparaciones por rango sobre la columna enmascarada. Un atacante con acceso SQL ad hoc puede ejecutar consultas del tipo WHERE salario BETWEEN 59000 AND 60000 para deducir el valor real aunque la proyección SELECT muestre únicamente asteriscos."
---

Seleccionar una técnica de enmascaramiento de datos exige equilibrar cuatro requisitos técnicos contrapuestos: **irreversibilidad**, **preservación de formato**, **integridad referencial (`JOIN`)** y **utilidad estadística**. Mientras que la redacción destruye el contenido dejando comodines fijos para visualización en pantalla, los resúmenes criptográficos con sal y la tokenización permiten mantener relaciones exactas entre tablas sin exponer los atributos originales.

En arquitectura de datos se distinguen dos modalidades complementarias. El **enmascaramiento estático (SDM)** reescribe los valores de forma permanente durante la extracción hacia entornos de desarrollo, QA o analítica externa. El **enmascaramiento dinámico (DDM)**, en cambio, intercepta los resultados de consulta en tiempo real según el rol del usuario sin alterar los bytes almacenados en producción.

## Fundamentos de los Principales Algoritmos de Enmascaramiento

Cada familia de transformación responde a restricciones distintas de esquema, validación de aplicación y seguridad criptográfica:

- **Redacción total o parcial:** Sustituye caracteres sensibles por comodines constantes (por ejemplo, `[REDACTADO]` o `****-****-****-7890`). Es unidireccional, anula cualquier capacidad de búsqueda por igualdad y suele aplicarse en registros de auditoría e interfaces de soporte.
- **Resumen criptográfico con sal (`HMAC-SHA256`):** Calcula `H = HMAC-SHA256(K_sal, normalizar(x))`, generando un digest hexadecimal determinista de 256 bits (64 caracteres). Al aislar la clave `K_sal` por entorno, un mismo correo produce exactamente el mismo resumen dentro del lote de pruebas, conservando la cardinalidad de `GROUP BY` y `JOIN` mientras resiste tablas arcoíris.
- **Tokenización con bóveda (*Vaulted*) y sin bóveda (*FPE*):** La tokenización con bóveda reemplaza el dato sensible por un token aleatorio sin valor intrínseco almacenado en una tabla segura de correspondencia (`O(1)` por índice), permitiendo reversión controlada. El cifrado con preservación de formato (`AES-FF1`, estándar NIST SP 800-38G) cifra dentro del mismo alfabeto y longitud sin bóveda, exigiendo un tamaño de dominio mínimo `radix^n ≥ 1,000,000`.
- **Sustitución sintética y desplazamiento temporal:** Reemplaza nombres, direcciones y teléfonos por datos ficticios sintácticos compatibles con restricciones `VARCHAR(N)` y expresiones regulares, y aplica desfases deterministas `Δd` a las fechas para conservar intervalos relativos entre eventos.

## Ejemplo Práctico Paso a Paso: Pipeline Mixto en Tablas Relacionales

Suponga un esquema con `clientes` (`50,000` filas) vinculada mediante `id_cliente` a `pedidos` (`200,000` filas), donde deben protegerse `correo` (`VARCHAR(120)`), `telefono` (9 dígitos), `fecha_alta` y `salario_anual` para un entorno analítico.

1. **Correo electrónico (`HMAC-SHA256` truncado a 128 bits):** Se aplica `HMAC-SHA256(K_qa, lower(trim(correo)))` y se toman los primeros 32 caracteres hexadecimales (`128` bits), que caben holgadamente en `VARCHAR(120)`. Por la cota del cumpleaños, para `N = 50,000` correos únicos, la probabilidad de colisión es `P ≈ N^2 / (2 × 2^128) = (2.5 × 10^9) / (6.8 × 10^38) ≈ 3.7 × 10^-30`, prácticamente nula.
2. **Teléfono de 9 dígitos (`AES-FF1`):** Con alfabeto numérico (`radix = 10`) y longitud `n = 9`, el dominio alcanza `10^9 = 1,000,000,000` combinaciones (`≥ 1,000,000`), cumpliendo el requisito de NIST SP 800-38G y superando las validaciones de formulario sin alterar el tipo de columna.
3. **Desplazamiento determinista de fechas:** Para cada cliente se deriva un desfase único `Δd = (HMAC(K_qa, id_cliente) mod 61) − 30` días en el intervalo `[-30, +30]`. Todas las filas de `pedidos` de ese cliente se desplazan exactamente `Δd` días, preservando al 100% la duración entre compras sucesivas.
4. **Perturbación multiplicativa de salario:** Se transforma cada salario con ruido uniforme `S' = S × (1 + ε)`, donde `ε ∈ [-0.05, +0.05]`. Un salario de `€60,000` pasa al intervalo `[€57,000, €63,000]`. Dado que la desviación típica de una uniforme en `[-0.05, 0.05]` es `σ = 0.05 / √3 ≈ 2.89%`, el error estándar de la media sobre las `50,000` filas es `2.89% / √50,000 ≈ 0.013%`, manteniendo intactos los informes agregados.

## Comparativa Técnica de Técnicas de Enmascaramiento

La siguiente tabla resume el comportamiento operativo de cada método al diseñar flujos de extracción o políticas de acceso en bases de datos.

| Técnica | Reversibilidad | Preserva Formato | Preserva `JOIN` y Cardinalidad | Sobrecarga Operativa | Uso Recomendado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Redacción total / parcial | Irreversible | Parcial | No | Muy baja (en línea) | Registros de soporte, recibos y vistas UI |
| `HMAC-SHA256` con sal | Irreversible | No (64 hex) | Sí (determinista por clave) | Baja (`CPU` lineal) | Claves de enlace en QA y analítica |
| Tokenización con bóveda | Reversible (autorizada) | Configurable | Sí (con acceso a bóveda) | Media (latencia de red/E/S) | Pagos PCI DSS y bóvedas de identidad |
| Cifrado `AES-FF1` (FPE) | Reversible con clave | Sí (exacto) | Sí (biyectivo por dominio) | Media-alta (rondas Feistel) | Campos heredados rígidos y teléfonos |
| Sustitución sintética | Irreversible | Sí (regex/Luhn) | Sí (si usa semilla fija) | Media (diccionarios/reglas) | Pruebas de interfaz y QA funcional |
| Perturbación / desfase `Δd` | Irreversible | Sí (numérico/fecha) | Conserva intervalos relativos | Muy baja | Modelos estadísticos y series temporales |

## Errores Comunes y Caveats de Implementación

El fallo de diseño más frecuente consiste en truncar en exceso los resúmenes criptográficos para ajustarlos a columnas cortas (`INT` de 32 bits). Con 32 bits, la cota del cumpleaños provoca colisiones con apenas unas decenas de miles de registros: para `50,000` clientes, la probabilidad de choque supera `50,000^2 / (2 × 2^32) ≈ 29.1%`, corrompiendo silenciosamente las uniones `JOIN` y falsificando métricas de clientes únicos.

Otro error habitual es reutilizar la misma clave `K_sal` entre el almacén analítico interno y exportaciones entregadas a terceros. Si dos conjuntos comparten clave determinista, un receptor externo puede cruzar registros por coincidencia de seudónimos (*linkage attack*). En entornos distintos deben generarse sales independientes, salvo cuando se diseñe explícitamente una cámara de compensación controlada.

Por último, el enmascaramiento dinámico nunca debe considerarse suficiente frente a usuarios con privilegios de consulta SQL libre. Sin restricciones adicionales sobre predicados `WHERE`, cláusulas `ORDER BY` o funciones de agregación, un analista puede inferir valores exactos mediante búsquedas binarias por intervalos. Asimismo, los campos de texto libre (`observaciones`, cargas JSON o adjuntos) deben someterse a detección y redacción de entidades nombradas antes de replicar la base de datos.
