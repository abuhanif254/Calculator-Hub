---
title: "¿Qué es el Escaneo de PII? Guía Completa para Detectar Datos Sensibles"
description: "Aprenda cómo funciona el escaneo de información de identificación personal (PII), qué datos sensibles almacenan las bases de datos y cómo prevenir filtraciones e incumplimientos normativos."
---

## ¿Qué es la Información de Identificación Personal (PII)?

La **Información de Identificación Personal (PII)** comprende cualquier atributo o combinación de atributos en una base de datos capaz de identificar de forma directa o indirecta a una persona física. En entornos de ingeniería de software, bases de datos SQL, volcados JSON y archivos CSV, el **escaneo automatizado de PII** permite descubrir, clasificar y proteger registros confidenciales antes de que abandonen el perímetro de producción.

### Identificadores Directos vs. Cuasi-Identificadores
- **Identificadores Directos**: Nombre completo, número de pasaporte, DNI/SSN, dirección de correo electrónico, teléfono móvil, tarjeta bancaria (PAN) y dirección IP estática.
- **Cuasi-Identificadores**: Fecha de nacimiento, código postal, cargo profesional y coordenadas geográficas que, combinados entre sí, permiten reidentificar a un individuo.

## Arquitectura de un Escáner de PII en el Navegador

Los motores modernos de detección de PII combinan tres capas complementarias de inspección:
1. **Heurística de Esquemas y Metadatos**: Analiza nombres de columnas (`email`, `ssn`, `tax_id`, `phone_number`, `iban`) en sentencias `CREATE TABLE` y cabeceras CSV.
2. **Expresiones Regulares Deterministas y Sumas de Verificación**: Valida patrones estructurados mediante algoritmos matemáticos como el **algoritmo de Luhn (Módulo 10)** para números de tarjetas de crédito y validación estructural RFC 5322 para correos electrónicos.
3. **Políticas de Enmascaramiento Automático**: Sustituye los hallazgos confirmados por hashes SHA-256 con sal, tokens con preservación de formato o valores sintéticos deterministas.
