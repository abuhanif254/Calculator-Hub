---
title: "Técnicas de Enmascaramiento de Datos: Hashing, Tokenización y Redacción"
description: "Compare las técnicas más efectivas de enmascaramiento de datos — hashing criptográfico, tokenización, redacción, seudonimización y cifrado con preservación de formato."
---

## Comparativa de Técnicas de Enmascaramiento de Datos

Seleccionar el algoritmo adecuado de enmascaramiento depende de si necesitas mantener la longitud del campo, la validez sintáctica o la capacidad de realizar `JOIN` entre múltiples tablas.

### 1. Redacción Total y Parcial (Redaction / Nulling)
Sustituye caracteres sensibles por comodines fijos (por ejemplo, `[REDACTED]` o `****-****-****-4242`). Es ideal para registros de soporte al cliente y visualización en interfaz.

### 2. Hashing Criptográfico con Sal (Salted SHA-256)
Transforma cualquier entrada en un resumen hexadecimal irreversible de longitud fija. Al añadir una sal secreta por entorno, un mismo correo electrónico produce siempre el mismo hash dentro del conjunto de pruebas, preservando las relaciones entre tablas sin exponer el valor original.

### 3. Sustitución Sintética con Preservación de Formato
Reemplaza nombres, correos y teléfonos reales por equivalentes ficticios realistas que respetan las restricciones `VARCHAR`, expresiones regulares de validación frontend y códigos de área locales.
