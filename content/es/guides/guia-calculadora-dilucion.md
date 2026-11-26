---
title: "Dilución Seriada: Creando Concentraciones Precisas"
description: "Guía técnica sobre diluciones simples y seriadas: ecuación de conservación C₁V₁ = C₂V₂, cálculo del factor de dilución, diseño de series decimales o binarias, ejemplo resuelto y control de errores volumétricos."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "dilution-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Cuál es la diferencia entre una dilución 1:10 y una dilución 1+9?"
    answer: "En microbiología y análisis clínico, la notación «1:10» suele indicar 1 parte de muestra concentrada más 9 partes de disolvente para completar 10 partes totales, lo que equivale a un factor de dilución de 10. Sin embargo, en ciertos protocolos químicos «1:10» significa 1 parte de soluto mezclada con 10 partes de disolvente (11 partes totales). Por ello, conviene expresar siempre el volumen de alícuota frente al volumen final total (por ejemplo, 1 mL en 10 mL finales)."
  - question: "¿Por qué se realiza una dilución seriada en lugar de una dilución directa en un solo paso?"
    answer: "Cuando se requiere reducir una concentración en varios órdenes de magnitud, como de 10⁸ UFC/mL a 10² UFC/mL, una dilución directa exigiría pipetear volúmenes microscópicos imposibles de medir con exactitud o utilizar varios litros de disolvente. La dilución seriada divide el proceso en transferencias escalonadas con volúmenes cómodos y reproducibles (por ejemplo, 1 mL en 9 mL de diluyente)."
  - question: "¿Cómo afecta la elección de micropipetas al error acumulado de una serie?"
    answer: "Cada transferencia introduce un error aleatorio y un posible sesgo sistemático. Según las tolerancias de la norma ISO 8655, las micropipetas pierden precisión y exactitud cuando operan por debajo del 10 % de su capacidad nominal. Seleccionar puntas y pipetas cuyo volumen de trabajo esté entre el 30 % y el 100 % de su rango reduce de forma drástica la propagación de errores."
  - question: "¿La ecuación C₁ × V₁ = C₂ × V₂ funciona con cualquier unidad de concentración?"
    answer: "Sí, siempre que la magnitud sea proporcional a la cantidad de soluto por unidad de volumen de disolución y se empleen exactamente las mismas unidades a ambos lados de la igualdad. Es válida para molaridad (mol/L), concentración másica (mg/mL, µg/L), porcentaje volumen/volumen (% v/v) y recuentos celulares (UFC/mL o células/mL), pero no debe aplicarse directamente a porcentajes masa/masa (% m/m) sin corregir por la densidad."
  - question: "¿Es obligatorio cambiar la punta de la micropipeta entre cada tubo de una dilución seriada?"
    answer: "Sí. Reutilizar la misma punta provoca un arrastre residual de solución concentrada adherida a las paredes internas y externas del plástico, lo que sesga al alza la concentración de los tubos posteriores. Cambiar de punta en cada paso y homogeneizar cada tubo mediante agitación en vórtex antes de extraer la siguiente alícuota garantiza la validez analítica de la serie."
---

Una **dilución** reduce la concentración de un soluto o suspensión biológica mediante la adición controlada de un disolvente inerte, manteniendo constante la cantidad de soluto transferida en la alícuota. Cuando la reducción abarca varios órdenes de magnitud, se emplea una **dilución seriada**: una secuencia escalonada en la que cada mezcla sirve como solución madre para el paso siguiente.

Esta metodología resulta esencial en microbiología, bioquímica clínica y química analítica porque alcanza concentraciones de `10⁻³` a `10⁻¹²` con volúmenes manejables y material volumétrico estándar. Para planificar alícuotas, volúmenes de diluyente y factores acumulados con exactitud, utilice nuestra [Calculadora de Dilución](/es/calculadoras/calculadora-de-dilucion).

## Principios Fundamentales y Ecuaciones de Dilución

Toda dilución simple parte de la conservación del soluto: la masa o los moles extraídos de la solución concentrada igualan a los presentes en el volumen diluido final:

```text
C₁ × V₁ = C₂ × V₂
```

Donde `C₁` es la concentración inicial, `V₁` el volumen de alícuota transferido, `C₂` la concentración objetivo y `V₂` el volumen total resultante. El volumen de diluyente necesario se calcula por diferencia (`V_diluyente = V₂ − V₁`).

En ensayos sin unidades molares —como serología o recuentos celulares— se utiliza el **Factor de Dilución (`FD`)**, definido como la razón entre el volumen final y el de la alícuota:

```text
FD = V₂ / V₁ = C₁ / C₂
```

Para una serie de `k` etapas consecutivas con un factor constante `FD_paso`, el factor acumulado crece exponencialmente:

```text
FD_total = FD₁ × FD₂ × ... × FD_k = (FD_paso)^k
C_k = C₀ / (FD_paso)^k
```

Conserve siempre homogeneidad dimensional en ambos miembros de la ecuación (`mL` con `mL`; `mol/L`, `mg/mL`, `% v/v` o `UFC/mL` en la misma escala).

## Ejemplo Resuelto: Diseño de una Dilución Seriada Decimal

Suponga que un laboratorio analiza una suspensión bacteriana con concentración estimada `C₀ = 1.0 × 10⁷ UFC/mL` y requiere alcanzar `1.0 × 10² UFC/mL` para efectuar un recuento viable en placa sin saturar el agar.

### Paso 1: Determinar el Factor de Dilución Total

```text
FD_total = (1.0 × 10⁷) / (1.0 × 10²) = 100,000 = 10⁵
```

### Paso 2: Definir el Factor por Paso y los Tubos

Una dilución directa `1:100,000` en `10 mL` exigiría medir `0.1 µL`, volumen impracticable con precisión estándar. Al elegir una serie decimal (`FD_paso = 10`), se requieren exactamente `k = 5` tubos (`10⁵ = 100,000`).

### Paso 3: Ejecutar la Transferencia Escalonada

Dispense `9.00 mL` de tampón PBS estéril en cinco tubos numerados del 1 al 5:

1. **Tubo 1 (`FD = 10¹`):** Agregue `1.00 mL` de muestra original (`C₀`) al Tubo 1 (`V_total = 10.00 mL`) y homogenice en vórtex → `C₁ = 1.0 × 10⁶ UFC/mL`.
2. **Tubo 2 (`FD = 10²`):** Con punta nueva, transfiera `1.00 mL` del Tubo 1 al Tubo 2 → `C₂ = 1.0 × 10⁵ UFC/mL`.
3. **Tubo 3 (`FD = 10³`):** Transfiera `1.00 mL` del Tubo 2 al Tubo 3 → `C₃ = 1.0 × 10⁴ UFC/mL`.
4. **Tubo 4 (`FD = 10⁴`):** Transfiera `1.00 mL` del Tubo 3 al Tubo 4 → `C₄ = 1.0 × 10³ UFC/mL`.
5. **Tubo 5 (`FD = 10⁵`):** Transfiera `1.00 mL` del Tubo 4 al Tubo 5 → `C₅ = 1.0 × 10² UFC/mL`.

Al sembrar `0.10 mL` del Tubo 4 en placa de agar se esperan `100` colonias visibles, dentro del rango óptimo de `30` a `300` UFC establecido por la norma ISO 7218.

## Comparativa de Esquemas de Dilución en Laboratorio

La selección del esquema depende del rango dinámico del ensayo, la viscosidad de la matriz y la incertidumbre tolerable.

| Esquema de Dilución | Factor por Paso | Factor Acumulado | Alícuota Habitual | Aplicación Principal | Riesgo Metrológico |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Dilución simple única | `1:2` a `1:100` | `2` a `100` | `100 µL` – `10 mL` | Ajuste puntual de tampones | Baja exactitud si `< 10 %` del rango |
| Dilución directa extrema | `1:10,000` | `10,000` | `< 1 µL` en `10 mL` | No apta para ensayos críticos | Error grave de pipeteo y mezcla |
| Serie decimal (log 10) | `1:10` | `10²` a `10⁸` | `1.00 mL` en `9.00 mL` | Recuento microbiano y potencia | Arrastre si no se cambia de punta |
| Serie binaria | `1:2` | `2⁴` a `2¹²` | `100 µL` en `100 µL` | ELISA, anticuerpos y CIM | Deriva tras muchas transferencias |
| Serie semilogarítmica | `1:3.162` (`10⁰·⁵`) | `10¹·⁵` a `10⁵` | `100 µL` en `216.2 µL` | Curvas dosis-respuesta (`CI₅₀`) | Redondeo de volumen en diluyente |
| Serie mixta calibrada | Variable (`1:2`, `1:5`) | `2` a `1,000` | `50 µL` – `5.00 mL` | Rectas patrón de HPLC / ICP-OES | Error en patrón madre sesga toda la recta |

## Aplicaciones Prácticas, Errores Frecuentes y Control Metrológico

Las diluciones seriadas permiten situar analitos dentro del intervalo lineal de espectrofotómetros y cromatógrafos (ley de Beer-Lambert), eliminar inhibidores de matriz en qPCR y construir curvas farmacológicas equidistantes en escala logarítmica para estimar parámetros como `CI₅₀` o `CMI`.

No obstante, trabajar en serie amplifica fallos operativos. Mientras los errores aleatorios de pipeteo se combinan en cuadratura (`σ_total = √(k × σ_paso²)`), un sesgo sistemático de calibración (por ejemplo, `+2 %` por transferencia) se multiplica en cada etapa y supera el `10 %` tras cinco tubos. Para evitarlo, verifique gravimétricamente las micropipetas según **ISO 8655**, trabaje entre el `30 %` y el `100 %` de su capacidad nominal y utilice matraces aforados clase A en patrones primarios.

Adicionalmente, en mezclas concentradas de agua con etanol o ácidos minerales ocurre contracción de volumen por interacciones intermoleculares (**no aditividad**); en esos casos debe enrasarse siempre al volumen final `V₂` en lugar de sumar volúmenes previos. En fluidos viscosos o suspensiones celulares, cambie de punta en cada transferencia, sumerja solo `2–3 mm` y homogenice cada tubo antes de extraer la siguiente alícuota.
