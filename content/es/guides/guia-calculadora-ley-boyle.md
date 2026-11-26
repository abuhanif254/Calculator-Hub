---
title: "Calculadora de la Ley de Boyle: Presión vs. Volumen"
description: "Guía técnica sobre la ley de Boyle-Mariotte: ecuación isotérmica P₁V₁ = P₂V₂, cálculo paso a paso de descompresión en buceo, tabla de estados y desviaciones de gases reales."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "boyles-law-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Qué condiciones deben mantenerse constantes para aplicar la ley de Boyle?"
    answer: "Deben permanecer estrictamente constantes la temperatura absoluta (proceso isotérmico) y la cantidad de moles de gas (sistema cerrado sin fugas ni reacciones). Si el gas se calienta al comprimirse rápido, como en un compresor adiabático, la presión sube más de lo que predice Boyle."
  - question: "¿Qué ocurre con la presión cuando el volumen de un gas se reduce a la cuarta parte?"
    answer: "Al mantener la temperatura constante, presión y volumen guardan una relación inversamente proporcional. Si el volumen disminuye a 1/4 de su valor inicial, la frecuencia de colisiones moleculares contra las paredes se cuadruplica y la presión absoluta aumenta exactamente por un factor de 4."
  - question: "¿Puedo usar PSI, bar o mmHg en la calculadora de la ley de Boyle?"
    answer: "Sí. Como la ecuación P₁ × V₁ = P₂ × V₂ es una igualdad proporcional, admite cualquier unidad de presión (atm, Pa, kPa, bar, psi, mmHg) y de volumen (L, mL, m³, ft³), siempre que P₁ y P₂ compartan exactamente la misma unidad y V₁ y V₂ también coincidan entre sí."
  - question: "¿Por qué la ley de Boyle es fundamental para la seguridad en el buceo?"
    answer: "Cada 10 metros de profundidad en agua salada añaden aproximadamente 1 atm de presión hidrostática. Si un buzo asciende desde 10 m (2 atm) hasta la superficie (1 atm) reteniendo el aire en los pulmones, el volumen pulmonar intentará duplicarse, lo que puede provocar un barotrauma pulmonar grave."
  - question: "¿Cómo se corrige la ley de Boyle cuando la compresión ocurre muy rápido?"
    answer: "Una compresión rápida no da tiempo al intercambio de calor con el entorno y deja de ser isotérmica para volverse adiabática. En ese régimen debe sustituirse P × V = constante por la relación politrópica o adiabática P × V^γ = constante, donde γ (gamma) es el coeficiente adiabático del gas (aproximadamente 1.4 para aire seco)."
---

La **ley de Boyle** (o ley de Boyle-Mariotte) establece que, para una masa fija de gas ideal a temperatura constante, la presión absoluta y el volumen son inversamente proporcionales. Expresada como `P₁ × V₁ = P₂ × V₂`, esta relación demuestra que duplicar la presión reduce el volumen a la mitad, mientras que expandir el recipiente disminuye la presión en igual proporción.

Formulada experimentalmente por Robert Boyle en 1662 e independientemente por Edme Mariotte en 1676, esta ley fundamenta la neumática, la fisiología respiratoria y el buceo técnico. Con nuestra [Calculadora de la Ley de Boyle](/es/calculadoras/calculadora-de-ley-de-boyle) puede despejar cualquiera de las cuatro variables al instante; aquí detallamos sus bases físicas, un ejemplo resuelto verificado y sus límites experimentales.

## Fundamento cinético-molecular y formulación matemática

En la teoría cinética de los gases, la temperatura absoluta fija la velocidad cuadrática media de las moléculas. Cuando un émbolo comprime un gas isotérmicamente, las partículas conservan la misma energía cinética media, pero disponen de menor volumen libre y recorren distancias más cortas entre choques, multiplicando los impactos por segundo sobre cada unidad de superficie de la pared.

El producto de la presión absoluta por el volumen iguala a una constante `k` que depende únicamente de los moles (`n`) y la temperatura (`T`):

```text
P × V = k = n × R × T
P₁ × V₁ = P₂ × V₂
```

### Parámetros y consistencia dimensional

* **`P₁` y `P₂` (presiones absolutas):** presión total medida respecto al vacío perfecto (`0 atm` o `0 kPa`). Toda lectura manométrica debe sumarse a la presión atmosférica local antes del cálculo.
* **`V₁` y `V₂` (volúmenes):** espacio interno ocupado por el gas (`L`, `mL`, `cm³` o `m³`), usando la misma unidad en ambos estados.
* **Representación gráfica:** en un diagrama `P–V`, `P(V) = k / V` traza una hipérbola equilátera denominada **isoterma**. A mayor temperatura `T`, la curva se desplaza hacia arriba y a la derecha.

## Ejemplo resuelto paso a paso: autonomía en buceo

Un buceador emplea una botella de acero de `V₁ = 12.0 L` cargada a presión absoluta `P₁ = 200.0 atm` a `20 °C`. Se desea calcular qué volumen equivalente de aire `V₂` representa esa carga al respirar a `30 metros` de profundidad en el mar (`P₂ = 4.00 atm` absolutas), manteniendo temperatura constante.

### Paso 1: Identificación de datos e incógnita

* `P₁ = 200.0 atm`, `V₁ = 12.0 L`, `P₂ = 4.00 atm` (`1.00 atm` en superficie + `3.00 atm` hidrostáticas).
* Incógnita: `V₂` (volumen total expandido a `4.00 atm`).

### Paso 2: Despeje y cálculo verificado

```text
k  = P₁ × V₁ = 200.0 atm × 12.0 L = 2,400.0 L·atm
V₂ = (P₁ × V₁) / P₂ = 2,400.0 L·atm / 4.00 atm = 600.0 L
```

A `30 metros`, la botella equivale a `600.0 L` de aire respirable a presión ambiente (frente a `2,400.0 L` en superficie a `1.00 atm`). Si el consumo respiratorio en superficie es de `20 L/min`, a `4.00 atm` los pulmones demandan los mismos `20 L/min` a presión ambiental, por lo que ese volumen teórico cubriría `30 minutos` antes de descontar la reserva de seguridad de `50 atm` (`150 L` a `4.00 atm` o `7.5 minutos` de ascenso controlado).

### Paso 3: Comprobación inversa y margen de reserva

Para verificar el resultado, basta multiplicar el estado final obtenido: `4.00 atm × 600.0 L = 2,400.0 L·atm`, idéntico al producto inicial `200.0 atm × 12.0 L`. Al descontar la reserva obligatoria de `50.0 atm` (`12.0 L × 50.0 / 4.00 = 150.0 L`), el aire útil real para la fase de fondo es `450.0 L`, es decir, `22.5 minutos`.

## Curva isotérmica y tabla de estados presión-volumen

La tabla presenta seis puntos sobre la isoterma de `k = 24.00 L·atm` (`T = 292.4 K`, `n ≈ 1.00 mol`):

| Estado físico | Presión (`atm`) | Presión (`kPa`) | Volumen (`L`) | Producto `P × V` (`L·atm`) | Variación frente a `1.00 atm` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Expansión subatmosférica | `0.50` | `50.66` | `48.00` | `24.00` | Presión al `50 %`, volumen `2×` |
| Referencia atmosférica | `1.00` | `101.33` | `24.00` | `24.00` | Estado base (`1×`) |
| Compresión moderada | `2.00` | `202.65` | `12.00` | `24.00` | Presión `2×`, volumen al `50 %` |
| Régimen de buceo (30 m) | `4.00` | `405.30` | `6.00` | `24.00` | Presión `4×`, volumen al `25 %` |
| Compresión industrial | `8.00` | `810.60` | `3.00` | `24.00` | Presión `8×`, volumen al `12.5 %` |
| Alta presión de ensayo | `12.00` | `1,215.90` | `2.00` | `24.00` | Presión `12×`, volumen al `8.33 %` |

## Aplicaciones reales, errores comunes y limitaciones físicas

La ley de Boyle gobierna jeringas médicas, pistones neumáticos, ventiladores mecánicos hospitalarios, cámaras hiperbáricas y acumuladores hidroneumáticos. En la respiración humana, al descender el diafragma aumenta el volumen torácico entre `0.5 L` y `3.0 L`, reduciendo la presión alveolar levemente por debajo de `760 mmHg` (`~758 mmHg`) para impulsar la entrada de aire.

### Precauciones críticas de cálculo

* **Confundir presión relativa y absoluta:** si un compresor indica `2.0 bar` manométricos bajo `1.0 bar` atmosférico, `P₁` equivale a `3.0 bar` absolutos; omitir ese `1.0 bar` introduce errores de hasta `50 %`.
* **Ignorar el calentamiento por compresión rápida:** comprimir un gas bruscamente eleva su temperatura (proceso adiabático). La ecuación de Boyle solo aplica tras estabilizar térmicamente el sistema a la temperatura inicial.
* **Desviaciones en gases reales a alta presión:** por encima de `50–100 atm`, el volumen propio de las moléculas y las fuerzas intermoleculares reducen la compresibilidad. A `200 atm` y temperatura ambiente, el aire seco presenta un factor de compresibilidad `Z ≈ 1.03–1.05`, desviación relevante en llenado preciso de cilindros.
