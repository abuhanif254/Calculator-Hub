---
metaTitle: "Generador de UUID Online | v1, v4, v6 y v7 (RFC 9562)"
metaDescription: "Genera UUIDs y GUIDs seguros (v1, v4, v6, v7 según RFC 9562) individuales o masivos en tu navegador. Optimiza índices SQL y claves de APIs."
metaKeywords: "generador uuid, generador guid, uuid v4, uuid v7, rfc 9562, uuid v6, uuid masivo, claves primarias postgresql, identificador único universal, crypto randomuuid"
title: "Generador de UUID"
shortDescription: "Genera identificadores únicos UUID y GUID conformes con RFC 9562 (v1, v4, v6 y v7) de forma individual o masiva en tu navegador, con validación de versión y exportación a JSON, CSV y TXT."
faqs:
  - question: "¿Qué diferencia técnica existe entre un UUID y un GUID?"
    answer: "En representación textual canónica de 36 caracteres (8-4-4-4-12) son idénticos: ambos identifican valores de 128 bits. La diferencia aparece en la serialización binaria heredada de Microsoft (.NET Guid.ToByteArray), que almacena los tres primeros campos en orden little-endian mientras RFC 9562 exige big-endian en orden de red."
  - question: "¿Por qué UUID v7 mejora drásticamente el rendimiento frente a UUID v4 en bases de datos SQL?"
    answer: "UUID v4 inserta claves completamente aleatorias en índices B-Tree (como PostgreSQL o el índice agrupado de MySQL InnoDB), causando divisiones constantes de páginas, amplificación de escritura y baja localidad en caché. UUID v7 antepone una marca temporal Unix de 48 bits que mantiene las inserciones secuenciales al final del árbol."
  - question: "¿Cuál es la probabilidad real de sufrir una colisión al generar UUID v4 o UUID v7?"
    answer: "UUID v4 posee 122 bits de entropía aleatoria; según la paradoja del cumpleaños, harían falta aproximadamente 2,71 trillones (2,71 x 10^18) de identificadores para alcanzar un 50 % de probabilidad de colisión. UUID v7 mantiene 74 bits aleatorios o monotónicos dentro de cada milisegundo, eliminando colisiones prácticas incluso en clústeres de altísima concurrencia."
  - question: "¿Cuándo conviene elegir UUID v6 en lugar de UUID v7?"
    answer: "RFC 9562 recomienda UUID v7 para todos los sistemas nuevos porque usa tiempo Unix estándar en milisegundos y no expone direcciones MAC. UUID v6 solo está pensado para migrar arquitecturas heredadas basadas en UUID v1 que necesitan mantener la época gregoriana y el campo de nodo logrando ordenación cronológica."
  - question: "¿Son seguros los UUID v7 para tokens de sesión o enlaces de restablecimiento de contraseña?"
    answer: "No. Aunque UUID v7 incorpora aleatoriedad criptográfica en sus bits inferiores, sus primeros 48 bits revelan la fecha exacta de creación con precisión de milisegundos. Para secretos bearer, sesiones o enlaces de recuperación utiliza siempre UUID v4 generado con CSPRNG o tokens opacos de alta entropía."
features:
  - "Generación conforme con RFC 9562 para versiones UUID v1, v4, v6 y la moderna v7 ordenable por tiempo"
  - "Entropía criptográficamente segura ejecutada en local mediante la Web Crypto API del navegador"
  - "Creación individual o en lotes masivos de hasta 10.000 identificadores con exportación a JSON, CSV y TXT"
  - "Opciones flexibles de formato: mayúsculas, minúsculas, 32 caracteres sin guiones, llaves {} y prefijo URN"
  - "Validador integrado que extrae el nibble de versión, los bits de variante RFC 9562 y marcas temporales"
  - "Privacidad absoluta en el lado del cliente: ningún identificador generado se envía ni registra en servidores"
useCases:
  - "Definición de claves primarias UUID v7 ordenables para tablas de alta escritura en PostgreSQL, MySQL y MariaDB"
  - "Asignación de identificadores públicos UUID v4 en APIs REST y GraphQL para impedir enumeración IDOR"
  - "Generación de IDs de correlación (X-Request-ID) para trazabilidad distribuida entre microservicios y colas"
  - "Creación local de claves en aplicaciones móviles offline-first y workers edge que sincronizan sin bloqueos centrales"
  - "Generación masiva de fixtures y semillas de prueba para bancos de carga y entornos de integración continua"
  - "Validación y auditoría de identificadores heredados (v1/v6) durante migraciones de esquemas y APIs"
howToSteps:
  - "Elige la versión de UUID adecuada para tu arquitectura: v7 para claves SQL ordenables, v4 para máxima opacidad o v6/v1 para legado."
  - "Indica la cantidad deseada, desde un único identificador hasta lotes masivos de 10.000 registros."
  - "Ajusta las reglas de formato: minúsculas canónicas, mayúsculas, cadena compacta sin guiones o formato URN."
  - "Genera los identificadores localmente aprovechando el generador criptográfico integrado en tu navegador."
  - "Pega cualquier UUID externo en el validador si necesitas verificar su versión, variante RFC 9562 o fecha incrustada."
  - "Copia el resultado al portapapeles o descárgalo en JSON, CSV o texto plano para importarlo en tus scripts."
---

Un **Identificador Único Universal (UUID)**, estandarizado en **RFC 9562** (que reemplazó a RFC 4122 en mayo de 2024), es un número binario de **128 bits** diseñado para identificar recursos de forma única en sistemas distribuidos sin coordinarse con una secuencia central. En el ecosistema Microsoft se denomina habitualmente **GUID**, compartiendo la representación textual canónica de 36 caracteres (`8-4-4-4-12`). Este generador crea lotes individuales o masivos de UUID `v1`, `v4`, `v6` y `v7` en tu navegador mediante la Web Crypto API, sin registrar ni transmitir ningún identificador.

## Anatomía binaria de 128 bits y campos de control (RFC 9562)

En su formato canónico (`xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx`), un UUID codifica 16 bytes en orden de red (*big-endian*). Seis bits fijos describen su estructura interna:

- **Nibble de versión (`M`, bits 48–51):** ocupa los cuatro bits altos del octeto 6 e indica el algoritmo (`1`, `4`, `6`, `7`, o `8` para formatos personalizados definidos por la aplicación).
- **Bits de variante (`N`, bits 64–65):** ocupan los dos bits superiores del octeto 8 y valen `10` en binario para la variante RFC 9562, limitando el carácter `N` a `8`, `9`, `a` o `b`.

RFC 9562 formaliza además dos valores centinela útiles en modelado de datos: el **Nil UUID** (`00000000-0000-0000-0000-000000000000`) como referencia vacía tipada y el **Max UUID** (`ffffffff-ffff-ffff-ffff-ffffffffffff`) como cota superior en rangos indexados.

Al persistir claves en disco, evita columnas `CHAR(36)` porque duplican el almacenamiento y penalizan las comparaciones por intercalación UTF-8; guarda siempre los **16 bytes nativos** (`UUID` en PostgreSQL o `BINARY(16)` en MySQL). Si intercambias bytes binarios entre servicios .NET y PostgreSQL o Go, recuerda que `Guid.ToByteArray()` clásico serializa los tres primeros grupos en *little-endian*, mientras `ToByteArray(bigEndian: true)` respeta el orden estándar RFC 9562.

## Comparativa técnica de versiones UUID (RFC 9562)

| Versión | Base temporal / entrada | Bits aleatorios o nodo | Ordenable B-Tree | Privacidad | Uso recomendado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **UUID v1** | Tiempo gregoriano (60 bits, 100 ns) | 14 bits secuencia + 48 bits MAC | No (bits bajos primero) | Baja (expone fecha y MAC) | Solo compatibilidad heredada |
| **UUID v4** | Ninguna | 122 bits CSPRNG | No (dispersión total) | Máxima (opaco) | IDs públicos en APIs y tokens |
| **UUID v5** | Namespace + nombre (SHA-1) | Determinista (0 aleatorios) | No | Media (según entrada) | Claves idempotentes reproducibles |
| **UUID v6** | Tiempo gregoriano reordenado | 14 bits secuencia + 48 bits nodo | Sí (monotónico) | Baja-media (expone fecha) | Migración desde pipelines v1 |
| **UUID v7** | Epoch Unix en milisegundos (48 bits) | 12 bits `rand_a` + 62 bits `rand_b` | Sí (anexado secuencial) | Media (expone milisegundo) | **Estándar moderno** en claves SQL |

## Rendimiento en índices B-Tree y seguridad criptográfica

### Por qué UUID v7 supera a UUID v4 en tablas SQL

Los enteros autoincrementales (`BIGSERIAL`, `AUTO_INCREMENT`) anexan registros de forma contigua en el árbol B-Tree, pero exponen el volumen de negocio, facilitan ataques de enumeración (**IDOR**) y bloquean arquitecturas *offline-first* o fragmentadas. Sin embargo, usar **UUID v4** como clave primaria inserta valores en páginas hoja aleatorias, desencadenando divisiones de página (*page splits*) al 50 %, amplificación de escritura en registros WAL/redo y baja tasa de aciertos en el *buffer pool* (efecto crítico en el índice agrupado de MySQL InnoDB).

**UUID v7** corrige este problema anteponiendo un sello temporal Unix de 48 bits en milisegundos (`unix_ts_ms`), seguido de 4 bits de versión (`0111`), 12 bits `rand_a`, 2 bits de variante (`10`) y 62 bits `rand_b` aleatorios. Para preservar la ordenación estricta cuando un nodo genera múltiples identificadores dentro del mismo milisegundo, RFC 9562 §6.2 permite emplear `rand_a` como contador monotónico incremental por milisegundo. De este modo, las escrituras convergen en el extremo derecho del índice con una localidad comparable a `BIGINT` sin sacrificar generación distribuida.

### Colisiones, entropía CSPRNG y validación de entradas

Un UUID v4 dispone de 122 bits de entropía (5,3 × 10³⁶ estados posibles): según la paradoja del cumpleaños se necesitarían alrededor de 2,71 × 10¹⁸ identificadores para alcanzar un 50 % de probabilidad de colisión. Esta garantía únicamente se mantiene con generadores criptográficamente seguros (**CSPRNG** como `crypto.randomUUID()` o `crypto.getRandomValues()`), jamás con `Math.random()`. Asimismo, como UUID v7 revela el milisegundo de creación, reserva UUID v4 o claves del [Generador de Cadenas Aleatorias](/es/herramientas/random-string-generator) para enlaces de recuperación y secretos bearer.

En tus endpoints REST y GraphQL, valida siempre la forma canónica antes de ejecutar consultas SQL —exigiendo el patrón `8-4-4-4-12` con nibble de versión `[1-8]` y variante `[89ab]`— para rechazar cadenas malformadas con HTTP 400 sin provocar excepciones en el motor de base de datos.

## Implementación práctica en SQL, JavaScript y terminal

En **PostgreSQL** declara siempre el tipo nativo `UUID` (PostgreSQL 18 ofrece `uuidv7()` nativo y versiones anteriores disponen de `gen_random_uuid()` para v4):

```sql
CREATE TABLE pedidos (
  id         UUID PRIMARY KEY DEFAULT uuidv7(),
  cliente_id UUID NOT NULL,
  creado_en  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

En **MySQL 8+**, almacena `BINARY(16)` con `UUID_TO_BIN(uuid)` sin activar el intercambio de bits reservado a v1. En **Node.js**, navegadores o **CLI**:

```javascript
const idPublico = crypto.randomUUID(); // UUID v4 criptográfico nativo

function generarUuidV7() {
  const b = crypto.getRandomValues(new Uint8Array(16));
  const ms = BigInt(Date.now());
  for (let i = 0; i < 6; i++) b[i] = Number((ms >> BigInt(40 - 8 * i)) & 0xffn);
  b[6] = (b[6] & 0x0f) | 0x70; b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
}
```

```bash
python3 -c "import uuid; print(uuid.uuid4())"
```

Para construir semillas completas de prueba junto a tus lotes masivos de hasta 10.000 identificadores, combina esta herramienta con el [Generador de Datos Mock para API](/es/herramientas/api-mock-data-generator), enmascara registros sensibles en el [Anonimizador de Bases de Datos](/es/herramientas/database-anonymizer) o calcula resúmenes deterministas en el [Generador de Hash](/es/herramientas/hash-generator).
