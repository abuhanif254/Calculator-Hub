---
title: "Masa Molar: Leyendo la Tabla Periódica"
description: "Aprenda a interpretar los pesos atómicos estándar de la tabla periódica, calcular la masa molar de compuestos complejos e hidratos, y utilizar nuestra Calculadora de Masa Molar."
category: "Math & Science"
relatedCalculator: "molar-mass-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Cuál es la diferencia entre masa atómica, peso molecular y masa molar?"
    answer: "La masa atómica o molecular relativa es una magnitud adimensional (o expresada en unidades de masa atómica unificada, u/Da) que indica la masa de un solo átomo o molécula. La masa molar (M) es la masa de un mol completo de esa sustancia y se expresa en gramos por mol (g/mol). Numéricamente coinciden, pero describen escalas distintas."
  - question: "¿Por qué los pesos atómicos de la tabla periódica tienen decimales?"
    answer: "La mayoría de los elementos existen en la naturaleza como una mezcla de varios isótopos con distinto número de neutrones. El peso atómico estándar publicado por la IUPAC representa el promedio ponderado de las masas isotópicas según su abundancia natural terrestre. Por ejemplo, el cloro aparece como 35.45 g/mol porque combina aproximadamente 75.8 % de cloro-35 y 24.2 % de cloro-37."
  - question: "¿Cómo se calcula la masa molar cuando una fórmula contiene paréntesis?"
    answer: "El subíndice situado inmediatamente fuera de un paréntesis multiplica a cada uno de los elementos que se encuentran en su interior. Por ejemplo, en el nitrato de calcio, Ca(NO₃)₂, hay 1 átomo de calcio, 2 átomos de nitrógeno (1 × 2) y 6 átomos de oxígeno (3 × 2)."
  - question: "¿Qué significa el punto central en fórmulas como CuSO₄·5H₂O?"
    answer: "El punto central indica un compuesto hidratado: por cada unidad fórmula de sal anhidra (CuSO₄) hay cinco moléculas de agua (H₂O) integradas en la estructura cristalina, no una multiplicación aritmética. Para obtener la masa molar total debe sumar la masa de la sal anhidra más cinco veces la masa molar del agua (5 × 18.015 g/mol)."
  - question: "¿Cambian los valores de masa molar según el idioma o la edición de la tabla periódica?"
    answer: "Las ligeras variaciones entre tablas periódicas se deben únicamente al número de decimales mostrados o a las revisiones bienales de la Unión Internacional de Química Pura y Aplicada (IUPAC). Para compuestos enriquecidos isotópicamente en laboratorio, como el agua pesada (D₂O), sí se debe sustituir el peso estándar por la masa del isótopo específico."
---

Para pesar exactamente un mol de cualquier compuesto químico en una balanza de laboratorio, es indispensable conocer primero su **masa molar** (`M`), expresada en gramos por mol (`g/mol`). Esta magnitud representa la masa acumulada de `6.02214076 × 10²³` átomos, moléculas o unidades fórmula de una sustancia pura y constituye el dato de entrada fundamental para toda conversión estequiométrica.

El cálculo parte siempre de la tabla periódica: la masa molar de un compuesto equivale a la suma de los pesos atómicos estándar de cada elemento multiplicados por el número de átomos presentes en su fórmula química. Con nuestra [Calculadora de Masa Molar](/es/calculadoras/calculadora-de-masa-molar), puede evaluar al instante desde moléculas orgánicas sencillas hasta sales complejas con paréntesis o aguas de hidratación.

## Cómo interpretar los pesos atómicos en la tabla periódica

En cada casilla de la tabla periódica figuran dos números clave que no deben confundirse. El número entero superior (número atómico, `Z`) identifica la cantidad de protones en el núcleo y define la identidad del elemento. El número decimal inferior corresponde al **peso atómico estándar** (`Aᵣ`), revisado periódicamente por la Comisión de Abundancias Isotópicas y Pesos Atómicos de la IUPAC.

Al multiplicar ese valor adimensional por la constante de masa molar (`Mᵤ ≈ 1.000 g/mol`), se obtiene directamente la masa de un mol de átomos del elemento en gramos:

- **Carbono (`C`):** `Aᵣ = 12.011` → un mol de átomos de carbono pesa `12.011 g`.
- **Hidrógeno (`H`):** `Aᵣ = 1.008` → un mol de átomos de hidrógeno pesa `1.008 g`.
- **Oxígeno (`O`):** `Aᵣ = 15.999` → un mol de átomos de oxígeno pesa `15.999 g`.

### Ecuación general para compuestos químicos

Para cualquier especie química formada por `k` elementos distintos, la masa molar total (`M_total`) se calcula mediante la suma ponderada por subíndices:

```text
M_total = (n₁ × M₁) + (n₂ × M₂) + ... + (nₖ × Mₖ)
```

Donde `nᵢ` es el conteo total de átomos del elemento `i` dentro de la fórmula química y `Mᵢ` es su masa molar atómica en `g/mol`. En el caso de fórmulas con paréntesis o corchetes de coordinación, los subíndices internos se multiplican por el multiplicador exterior antes de sumar.

## Ejemplo paso a paso: compuestos con paréntesis e hidratos

Las moléculas poliatómicas con grupos funcionales repetidos requieren especial cuidado al contabilizar sus átomos. Analicemos dos casos representativos frecuentes en la industria y el laboratorio: el sulfato de aluminio anhidro, `Al₂(SO₄)₃` (coagulante esencial en el tratamiento de aguas), y el sulfato de cobre(II) pentahidratado, `CuSO₄·5H₂O`.

### Caso A: Sulfato de aluminio, `Al₂(SO₄)₃`

1. **Desglosar los subíndices:** El aluminio aparece con subíndice `2`. El grupo sulfato `(SO₄)` está afectado por el subíndice externo `3`, por lo que aporta `3 × 1 = 3` átomos de azufre y `3 × 4 = 12` átomos de oxígeno.
2. **Multiplicar por los pesos atómicos estándar:**
   - **Aluminio (`Al`):** `2 × 26.982 g/mol = 53.964 g/mol`
   - **Azufre (`S`):** `3 × 32.06 g/mol = 96.180 g/mol`
   - **Oxígeno (`O`):** `12 × 15.999 g/mol = 191.988 g/mol`
3. **Sumar las contribuciones parciales:**
   - `M(Al₂(SO₄)₃) = 53.964 + 96.180 + 191.988 = 342.132 g/mol`
   - Un mol de sulfato de aluminio pesa exactamente **`342.13 g`** (redondeado a dos decimales).

### Caso B: Sal hidratada, `CuSO₄·5H₂O`

1. **Calcular la parte anhidra (`CuSO₄`):** `63.546 (Cu) + 32.06 (S) + 4 × 15.999 (O) = 159.602 g/mol`.
2. **Añadir cinco moles de agua (`5 H₂O`):** Cada molécula de agua aporta `2 × 1.008 + 15.999 = 18.015 g/mol`, por lo que `5 × 18.015 = 90.075 g/mol`.
3. **Masa molar del hidrato:** `159.602 + 90.075 = 249.677 g/mol`.

## Tabla de referencia de masas molares habituales

El siguiente cuadro resume el desglose atómico y la masa molar de seis sustancias clave en docencia, síntesis química y bioquímica:

| Compuesto | Fórmula | Desglose de átomos | Masa molar (g/mol) | Uso o contexto principal |
| :--- | :--- | :--- | :--- | :--- |
| Agua | `H₂O` | `2 H, 1 O` | `18.015` | Disolvente universal |
| Hidróxido de sodio | `NaOH` | `1 Na, 1 O, 1 H` | `39.997` | Base fuerte en titulaciones |
| Ácido sulfúrico | `H₂SO₄` | `2 H, 1 S, 4 O` | `98.072` | Síntesis y baterías ácido-plomo |
| Glucosa | `C₆H₁₂O₆` | `6 C, 12 H, 6 O` | `180.156` | Bioquímica y metabolismo |
| Sulfato de cobre(II) 5-hidrato | `CuSO₄·5H₂O` | `1 Cu, 1 S, 9 O, 10 H` | `249.677` | Reactivo analítico y agricultura |
| Sulfato de aluminio | `Al₂(SO₄)₃` | `2 Al, 3 S, 12 O` | `342.132` | Potabilización de agua |

## Errores frecuentes, precisión isotópica y buenas prácticas

Incluso un error mínimo al leer una fórmula química invalida por completo los cálculos posteriores de concentración, rendimiento teórico o análisis elemental. Antes de pesar un reactivo, verifique estos puntos críticos:

- **Distinguir mayúsculas y minúsculas en los símbolos:** La secuencia `Co` representa un átomo de cobalto (`58.933 g/mol`), mientras que `CO` designa una molécula de monóxido de carbono (`28.010 g/mol`). Un fallo tipográfico duplica el error másico.
- **Respetar las aguas de cristalización y la higroscopicidad:** Muchos reactivos comerciales absorben humedad ambiental o se suministran como hidratos definidos (`Na₂CO₃·10H₂O`, `MgCl₂·6H₂O`). Pesar la masa correspondiente a la sal anhidra sin ajustar la fórmula introduce una desviación superior al `50 %` en la concentración real.
- **Considerar isótopos marcados en espectrometría y RMN:** Los pesos estándar de la IUPAC asumen abundancia natural terrestre. Si trabaja con disolventes deuterados como el agua pesada (`D₂O` o `²H₂O`), su masa molar asciende a `20.028 g/mol` frente a los `18.015 g/mol` del agua ligera, lo cual altera cálculos de densidad y molaridad.
- **Conservar la coherencia decimal:** Algunos elementos muestran intervalos de peso atómico en tablas modernas (como el carbono `[12.0096, 12.0116]` o el azufre `[32.059, 32.076]`) debido a variaciones geológicas naturales; utilice los valores convencionales de cuatro o cinco cifras significativas proporcionados por nuestra [Calculadora de Masa Molar](/es/calculadoras/calculadora-de-masa-molar) para mantener uniformidad en sus informes técnicos.
