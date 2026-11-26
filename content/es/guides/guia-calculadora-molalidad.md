---
title: "Molalidad: La Concentración a Prueba de Temperatura"
description: "Guía técnica sobre molalidad (m) en química y termodinámica: cálculo por masa de disolvente, independencia térmica, propiedades coligativas y conversión desde molaridad."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molality-calculator"
faqs:
  - question: "¿Por qué la molalidad no cambia cuando se calienta o se enfría una disolución?"
    answer: "Porque tanto el numerador (moles de soluto) como el denominador (masa del disolvente en kilogramos) representan magnitudes basadas exclusivamente en cantidad de materia y masa. A diferencia del volumen líquido empleado en la molaridad, la masa no sufre dilatación ni contracción térmica ni varía con la presión ambiental."
  - question: "¿En la fórmula de la molalidad se divide entre la masa total de la disolución o solo entre la masa del disolvente?"
    answer: "Se divide estrictamente entre la masa del disolvente puro en kilogramos. Dividir entre la masa total (soluto más disolvente) es un error conceptual frecuente que produce valores inferiores a la molalidad real y se confunde con el cálculo del porcentaje en masa o de la fracción másica."
  - question: "¿Cuándo coinciden aproximadamente la molaridad (M) y la molalidad (m) en disoluciones acuosas?"
    answer: "Únicamente en disoluciones acuosas muy diluidas (por debajo de 0.01 a 0.05 M) medidas cerca de 4 °C a 20 °C, donde la densidad del agua ronda 1.000 kg/L y la masa del soluto es despreciable frente a un kilogramo de agua. En disoluciones concentradas o en disolventes orgánicos como etanol o benceno, M y m divergen de forma significativa."
  - question: "¿Qué papel desempeña el factor de Van 't Hoff (i) al usar la molalidad en propiedades coligativas?"
    answer: "Las propiedades coligativas dependen del número total de partículas disueltas, no solo de los moles nominales de fórmula. Un no electrolito como la glucosa aporta i = 1 partícula por molécula, mientras que el NaCl ideal aporta i = 2 (Na⁺ y Cl⁻) y el CaCl₂ aporta i = 3. A concentraciones elevadas, la formación de pares iónicos reduce ligeramente el valor efectivo de i."
  - question: "¿Qué datos hacen falta para convertir molaridad (M) en molalidad (m) de manera exacta?"
    answer: "Es imprescindible conocer tres magnitudes: la molaridad (M), la masa molar del soluto (PM en g/mol) y la densidad experimental de la disolución (ρ en g/mL) a la temperatura de interés. Sin la densidad medida de la mezcla final, no es posible deducir qué fracción de masa en un litro corresponde al disolvente."
---

La **molalidad (`m`)** expresa la concentración de una disolución como el número de moles de soluto disueltos por cada kilogramo de disolvente puro (`mol/kg`). A diferencia de la molaridad (`M`), que depende del volumen total de la mezcla líquida, la molalidad se apoya únicamente en medidas de masa, lo que la convierte en una magnitud completamente invariable frente a cambios de temperatura y presión.

Esta independencia térmica resulta indispensable en termodinámica química, diagramas de equilibrio de fases y determinación de propiedades coligativas, donde las muestras atraviesan gradientes térmicos extremos como puntos de congelación o ebullición. Puede obtener este parámetro directamente a partir de masa, moles o concentraciones molares mediante nuestra [Calculadora de Molalidad](/es/calculadoras/calculadora-de-molalidad).

## Ecuación de molalidad, independencia térmica y conversión desde molaridad

La concentración molal se calcula dividiendo la cantidad química de soluto (`n`) entre la masa exclusiva del disolvente (`m_disolvente`) expresada en kilogramos (`kg`):

```text
m = n_soluto / m_disolvente(kg) = (m_soluto / PM) / m_disolvente(kg)
```

Donde `m_soluto` es la masa del soluto en gramos y `PM` su masa molar en `g/mol`. Observe cuidadosamente la convención tipográfica de la IUPAC: la **molalidad** se denota con la letra minúscula cursiva `m`, mientras que la **molaridad** emplea siempre la mayúscula `M`.

Cuando en laboratorio solo se dispone de una disolución preparada por volumen (`M`) y se conoce su densidad `ρ` en gramos por mililitro (`g/mL`), la conversión exacta a molalidad se deduce considerando `1.000 L` de disolución. Su masa total es `1000 × ρ` gramos, de los cuales `M × PM` gramos corresponden al soluto; la diferencia corresponde al disolvente puro:

```text
m = (1000 × M) / (1000 × ρ − M × PM)
```

De manera análoga, si se desea obtener la molaridad a partir de una molalidad conocida y la densidad `ρ`, se aplica la relación inversa `M = (1000 × ρ × m) / (1000 + m × PM)`.

## Ejemplo numérico paso a paso: solución anticongelante y conversión M a m

Analicemos dos escenarios prácticos frecuentes en laboratorio y control térmico industrial:

1. **Cálculo directo y descenso crioscópico:** Se disuelven `155.18 g` de etilenglicol (`C₂H₆O₂`, `PM = 62.07 g/mol`) en `500.0 g` (`0.5000 kg`) de agua pura (`K_f = 1.86 °C·kg/mol`). Primero se determinan los moles de soluto: `n = 155.18 g / 62.07 g/mol = 2.500 mol`. Después se divide entre la masa de agua en kilogramos: `m = 2.500 mol / 0.5000 kg = 5.000 mol/kg` (`5.000 m`). Como el etilenglicol es un no electrolito (`i = 1`), el descenso teórico del punto de congelación es `ΔT_f = i × K_f × m = 1 × 1.86 × 5.000 = 9.30 °C`, desplazando el punto de congelación a `−9.30 °C`.
2. **Conversión desde molaridad con densidad:** Considere una disolución acuosa de cloruro de sodio (`NaCl`, `PM = 58.44 g/mol`) de concentración `2.00 M` cuya densidad medida a `20 °C` es `ρ = 1.078 g/mL`. Un litro completo pesa `1000 × 1.078 = 1078 g`. La masa de `NaCl` disuelta en ese litro es `2.00 mol × 58.44 g/mol = 116.88 g`. Restando ambos términos se halla la masa exacta de agua: `1078 − 116.88 = 961.12 g = 0.96112 kg`. Por lo tanto, la molalidad real resulta `m = 2.00 mol / 0.96112 kg = 2.081 mol/kg`. Si esta disolución se calienta a `60 °C`, su molaridad disminuirá por dilatación volumétrica, pero seguirá siendo exactamente `2.081 m`.

## Comparativa entre unidades de concentración química

La tabla resume las diferencias operativas entre la molalidad y otras escalas habituales de concentración:

| Unidad | Símbolo | Definición matemática | Dependencia de T | Aplicaciones principales |
| :--- | :--- | :--- | :--- | :--- |
| Molalidad | `m` | `mol soluto / kg disolvente` | Independiente | Crioscopia, ebulloscopia y termodinámica |
| Molaridad | `M` | `mol soluto / L disolución` | Depende de T | Estequiometría volumétrica y titulaciones |
| Fracción molar | `χ` | `mol componente / mol totales` | Independiente | Ley de Raoult y equilibrio líquido-vapor |
| Porcentaje en masa | `% p/p` | `(g soluto / g disolución) × 100` | Independiente | Formulación industrial y reactivos puros |
| Porcentaje masa/volumen | `% p/v` | `(g soluto / 100 mL disolución)` | Depende de T | Preparaciones clínicas y bioquímicas |
| Partes por millón (masa) | `ppm` | `mg soluto / kg disolución` | Independiente | Análisis de trazas ambientales y toxicología |

## Propiedades coligativas, electrolitos y errores habituales

Las propiedades coligativas dependen de la relación numérica entre partículas de soluto y moléculas de disolvente, por lo que exigen trabajar siempre con molalidad (`m`) y el **factor de Van 't Hoff (`i`)**:

- **Ascenso ebulloscópico (`ΔT_b = i · K_b · m`):** El agua pura posee `K_b = 0.512 °C·kg/mol`. Cada molal de partículas disueltas eleva el punto de ebullición en `0.512 °C` a presión atmosférica estándar (`101.325 kPa`).
- **Descenso crioscópico (`ΔT_f = i · K_f · m`):** Permite formular refrigerantes automotrices, descongelantes viales y determinar masas molares experimentales de solutos desconocidos mediante crioscopia.

En la práctica analítica conviene vigilar tres fuentes recurrentes de imprecisión:

- **Incluir el soluto en el denominador:** Tomar la masa total de la disolución como si fuera la masa del disolvente introduce errores graves en disoluciones salinas o azucaradas concentradas. Si conoce el `% p/p` de una mezcla (por ejemplo, `20 %` en masa), calcule primero los `80 g` de disolvente por cada `100 g` totales.
- **Asumir equivalencia `M ≈ m` en disolventes no acuosos:** En etanol (`ρ = 0.789 g/mL` a `20 °C`), un litro de disolvente puro pesa solo `0.789 kg`, de modo que `M` y `m` difieren en más de un 20 % incluso a concentraciones moderadas.
- **Ignorar la asociación iónica:** En electrolitos concentrados (`> 0.5 m`), la atracción electrostática entre cationes y aniones reduce el factor `i` efectivo por debajo de su valor estequiométrico ideal (`NaCl` pasa de `2.0` hacia `1.8–1.9`), requiriendo coeficientes de actividad en cálculos de alta precisión.
