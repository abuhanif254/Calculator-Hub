---
title: "Enmascaramiento de PAN en PCI DSS: Protección de Datos de Tarjetas en Bases de Datos"
description: "Guía técnica del Requisito 3 de PCI DSS v4.0: cómo enmascarar, truncar y tokenizar números de cuenta principal (PAN) para proteger los datos del titular de la tarjeta."
category: "Privacy & Security"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "database-anonymizer"
relatedType: "tool"
faqs:
  - question: "¿Cuántos dígitos de un PAN pueden mostrarse según PCI DSS v4.0?"
    answer: "El Requisito 3.4.1 de PCI DSS v4.0 establece que, al mostrar un Número de Cuenta Principal (PAN) en pantallas, recibos o exportaciones sin una necesidad comercial legítima documentada de ver el número completo, como máximo pueden revelarse los primeros 6 dígitos (BIN/IIN) y los últimos 4 dígitos. Por buena práctica de seguridad mínima, muchas organizaciones muestran únicamente los últimos 4 dígitos."
  - question: "¿Está permitido almacenar el código CVV/CVC cifrado en la base de datos?"
    answer: "No. El Requisito 3.3.1 prohíbe de forma absoluta almacenar Datos Sensibles de Autenticación (SAD) —incluidos el código de verificación de tarjeta (CVV2/CVC2), el contenido completo de la banda magnética o chip y el bloque PIN— después de completada la autorización, incluso si están cifrados."
  - question: "¿Sirve un hash SHA-256 sin clave secreta para cumplir el Requisito 3.5 de PCI DSS v4.0?"
    answer: "No. PCI DSS v4.0 (Requisito 3.5.1.1) exige explícitamente hashes unidireccionales basados en criptografía fuerte con entrada con clave secreta (como HMAC-SHA256 con sal o clave criptográfica protegida). Un hash simple sin clave es vulnerable a ataques de fuerza bruta en menos de un segundo debido a la estructura conocida del BIN y del dígito de control de Luhn."
  - question: "¿Por qué no deben almacenarse juntos el PAN truncado y el hash del mismo PAN?"
    answer: "El Requisito 3.5.1.2 advierte que combinar un PAN truncado (por ejemplo, primeros 6 y últimos 4 dígitos) con un hash del mismo PAN en el mismo entorno reduce drásticamente el espacio de búsqueda a tan solo 100,000 combinaciones válidas según el algoritmo de Luhn, permitiendo reconstruir el número completo mediante fuerza bruta si el hash carece de aislamiento de clave."
  - question: "¿El cifrado de disco completo (TDE o EBS) basta para proteger el PAN en una base de datos?"
    answer: "No por sí solo. PCI DSS v4.0 (Requisito 3.5.1.3) restringe el uso exclusivo de cifrado a nivel de disco o partición a medios extraíbles o casos con controles estrictos de separación entre acceso lógico del sistema operativo/base de datos y claves de descifrado, ya que TDE no protege frente a inyección SQL ni credenciales administrativas comprometidas."
---

El estándar **PCI DSS v4.0** regula cualquier sistema que almacene, procese o transmita datos de tarjetas de pago. Su activo crítico es el **Número de Cuenta Principal (PAN)** —de 15 o 16 dígitos habitualmente— regido en bases de datos por el **Requisito 3**: prohibir el almacenamiento posautorización de datos sensibles de autenticación (Req. 3.3), enmascarar el PAN al visualizarlo (Req. 3.4) y volverlo ilegible en almacenamiento persistente (Req. 3.5).

El enmascaramiento visual y la protección en disco cumplen objetivos distintos. Ocultar dígitos en pantalla evita fugas ante operadores o capturas, pero reducir el alcance de auditoría del **Entorno de Datos del Titular de la Tarjeta (CDE)** exige que el PAN jamás resida en claro en la base operativa, empleando tokenización, truncamiento irreversible o criptografía fuerte con custodia aislada de claves.

## Requisitos Técnicos 3.3, 3.4 y 3.5 en PCI DSS v4.0

### Enmascaramiento en Visualización (Requisito 3.4.1)

Salvo necesidad comercial documentada de mostrar el número completo, PCI DSS v4.0 permite exhibir como máximo los **primeros 6 dígitos (BIN/IIN) y los últimos 4 dígitos** (`453201******7890` en 16 dígitos, o `378282*****1005` en 15 dígitos). Como defensa mínima, conviene mostrar únicamente los últimos 4 dígitos (`************7890`).

### Controles de Ilegibilidad en Disco (Requisito 3.5.1)

Para considerar ilegible un PAN almacenado en tablas, índices o copias, debe aplicarse uno de cuatro controles:

1. **Hashes con clave secreta (Req. 3.5.1.1):** Primitivas como `HMAC-SHA256(K_hsm, PAN)` con clave gestionada según los Requisitos 3.6 y 3.7.
2. **Truncamiento irreversible (Req. 3.5.1.2):** Supresión permanente de los dígitos centrales antes de persistir, evitando la coexistencia de PAN truncado y hash del mismo PAN en el entorno.
3. **Tokenización con bóveda:** Sustitución por un token aleatorio opaco sin relación matemática con el PAN, confinando las tarjetas reales a un proveedor o segmento CDE aislado.
4. **Cifrado fuerte (`AES-256-GCM`):** Cifrado de columna con rotación periódica y separación estricta entre custodios de claves y administradores de base de datos.

En paralelo, el **Requisito 3.3.1** prohíbe conservar Datos Sensibles de Autenticación (SAD) —`CVV2`/`CVC2`, pista completa o bloque PIN— tras la autorización, incluso cifrados.

## Ejemplo Numérico Verificado: Riesgo al Combinar Truncamiento y Hash

Guardar el PAN truncado para soporte junto con un hash del PAN completo para detectar duplicados introduce una vulnerabilidad crítica si el hash carece de clave secreta. Considere el PAN de 16 dígitos `4532 0184 9273 7890`.

1. **Dígitos desconocidos:** Al conservar los primeros 6 dígitos (`453201`) y los últimos 4 (`7890`), restan `16 − 6 − 4 = 6` dígitos centrales ocultos (`000000` a `999999`), es decir, `10^6 = 1,000,000` combinaciones aparentes.
2. **Restricción del algoritmo de Luhn:** El último dígito (`0`) es una suma de control Módulo 10. Fijarlo invalida 9 de cada 10 secuencias centrales, reduciendo el espacio real a `1,000,000 / 10 = 100,000` (`10^5`) PAN válidos.
3. **Tiempo de ruptura sin clave:** Si la tabla almacena además un `SHA-256(PAN)` sin sal secreta y sufre una filtración, una GPU a `100,000,000` resúmenes/s (`10^8 H/s`) evalúa los `100,000` candidatos en `100,000 / 100,000,000 = 0.001` segundos (`1 milisegundo`).
4. **Solo con BIN conocido:** Incluso ignorando los últimos 4 dígitos, un BIN de 6 dígitos deja `10^9` combinaciones válidas por Luhn, agotadas en `1 segundo` a `10^9 H/s`. Emplear `HMAC-SHA256` con clave de 256 bits (`2^256 ≈ 1.158 × 10^77` claves) en HSM bloquea el ataque y cumple el Requisito 3.5.1.1.

## Matriz Comparativa de Protección de PAN según PCI DSS v4.0

| Mecanismo | Cumple Req. 3.4 | Cumple Req. 3.5 | Búsqueda / Conciliación | Impacto en Alcance CDE | Riesgo Principal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Máscara visual (`BIN + 4`) | Sí | No aplica | Limitada a sufijo/BIN | No reduce alcance | Fuga en logs o respuestas API |
| Truncamiento irreversible | Sí | Sí | Parcial (último tramo) | Reduce alcance sin cruce | Coexistir con hash sin clave |
| `HMAC-SHA256` con clave | No (no reversible) | Sí | Sí (índices exactos) | Exige custodia de `K_hsm` | Usar `SHA-256` sin clave secreta |
| Tokenización con bóveda | Sí (con máscara) | Sí | Sí (por token opaco) | Saca la app del CDE | Tokens derivables del PAN |
| Cifrado `AES-256-GCM` | No sin máscara | Sí | Limitada (índice ciego) | Mantiene la base en CDE | Clave accesible al rol DB |
| Cifrado de disco (`TDE`) | No | Insuficiente solo | Transparente | Toda la instancia en CDE | Inyección SQL lee en claro |

## Errores Comunes y Matices de Auditoría

La principal causa de no conformidad ante un auditor QSA suele ocultarse fuera de la tabla de pagos: colas de *webhooks*, registros HTTP, trazas de error y volcados enviados a entornos de prueba. Si un JSON de *webhook* registra `cvv` o `pan` en una columna `TEXT`, todo el clúster entra en el CDE e incumple el Requisito 3.3.1.

Igualmente insuficiente resulta depender solo de `TDE` o cifrado de volumen en la nube, ya que el motor descifra automáticamente los registros ante cualquier sesión SQL válida o inyección SQL. La arquitectura recomendada captura la tarjeta mediante campos alojados (*hosted fields*) del procesador para persistir únicamente un **token opaco**, la marca, la fecha de caducidad y los **últimos 4 dígitos**.
