---
title: "Enmascaramiento de PAN en PCI DSS: Protección de Datos de Tarjetas en Bases de Datos"
description: "Guía técnica del Requisito 3 de PCI DSS v4.0: cómo enmascarar, truncar y tokenizar números de cuenta principal (PAN) para proteger los datos del titular de la tarjeta."
---

## PCI DSS v4.0 Requisito 3: Protección del Número de Cuenta Principal (PAN)

El estándar **PCI DSS (Payment Card Industry Data Security Standard)** regula cualquier sistema que almacene, procese o transmita datos de tarjetas de pago. El **Número de Cuenta Principal (PAN)** —los 15 o 16 dígitos de la tarjeta— es el activo más crítico que debe protegerse tanto en pantallas como en bases de datos y archivos de registro.

### Regla de Enmascaramiento en Visualización (BIN + Últimos 4 Dígitos)
PCI DSS establece que, al mostrar un PAN en pantallas de soporte, recibos o exportaciones operativas, como máximo pueden revelarse **los primeros 6 dígitos (BIN/IIN) y los últimos 4 dígitos** (por ejemplo, `453201******7890` o `************7890`).

### Truncamiento, Tokenización y Hashing en Almacenamiento
Para que un PAN almacenado se considere ilegible según el Requisito 3.5 de PCI DSS, debe aplicarse uno de los siguientes controles:
1. **Truncamiento Irreversible**: Eliminación permanente de los segmentos centrales del PAN antes de escribir el registro en disco.
2. **Tokenización mediante Bóveda Segura**: Sustitución del PAN por un token aleatorio sin valor intrínseco.
3. **Hashes Unidireccionales con Sal Criptográfica**: Aplicación de algoritmos robustos con clave secreta sobre la totalidad del PAN.
