---
title: "Desidentificación de Datos HIPAA: Safe Harbor vs. Determinación de Expertos"
description: "Comprenda los requisitos de desidentificación HIPAA bajo 45 CFR §164.514 comparando el método Safe Harbor (18 identificadores clínicos) y la Determinación Estadística."
---

## Estándares de Desidentificación HIPAA (45 CFR §164.514)

La normativa estadounidense **HIPAA (Health Insurance Portability and Accountability Act)** regula la protección de la **Información Médica Protegida (PHI)**. Para utilizar conjuntos de datos clínicos en investigación, pruebas de software o entrenamiento de modelos sin requerir autorización individual, los datos deben desidentificarse mediante uno de dos métodos oficiales:

### 1. Método Safe Harbor (Puerto Seguro)
Exige la eliminación o enmascaramiento estricto de **18 categorías de identificadores**, entre ellos:
- Nombres completos de pacientes y familiares.
- Subdivisiones geográficas menores que un estado (direcciones postales y códigos ZIP de 5 dígitos).
- Todas las fechas directamente relacionadas con un individuo (admisión, alta, nacimiento, fallecimiento) excepto el año, y edades superiores a 89 años.
- Teléfonos, correos electrónicos, números de Seguridad Social (SSN), números de historial médico (MRN), números de póliza sanitaria, matrículas e identificadores biométricos.

### 2. Método de Determinación de Expertos (Expert Determination)
Un especialista en bioestadística aplica técnicas matemáticas de control de divulgación (como **$k$-anonimato**, **$l$-diversidad** y generalización de intervalos) para certificar documentalmente que el riesgo de reidentificación es estadísticamente insignificante.
