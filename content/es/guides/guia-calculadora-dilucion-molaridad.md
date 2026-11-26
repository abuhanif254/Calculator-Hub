---
title: "Dilución de Molaridad: La Fórmula M1V1 = M2V2"
description: "Aprenda a preparar disoluciones de laboratorio a partir de una solución madre concentrada, domine la ecuación M1V1 = M2V2 y utilice nuestra calculadora gratuita."
category: "Math & Science"
relatedCalculator: "molarity-dilution-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Por qué funciona la fórmula M₁V₁ = M₂V₂ en las diluciones?"
    answer: "Al diluir una disolución agregando únicamente disolvente puro (como agua desionizada), la cantidad total de moles de soluto permanece invariable. Como los moles equivalen al producto de la molaridad por el volumen (n = M × V), el producto inicial M₁ × V₁ antes de diluir debe igualar necesariamente al producto final M₂ × V₂ después de alcanzar el volumen objetivo."
  - question: "¿Es obligatorio expresar V₁ y V₂ en litros?"
    answer: "No. Mientras V₁ y V₂ utilicen exactamente la misma unidad de volumen (ambos en mililitros, ambos en microlitros o ambos en litros), las unidades se cancelan algebraicamente en la ecuación. Solo debe convertir a litros si desea calcular explícitamente el número absoluto de moles de soluto (n = M × V)."
  - question: "¿Puedo sumar simplemente V₁ más el volumen de agua para obtener V₂ exacto?"
    answer: "Para disoluciones acuosas muy diluidas suele ser una buena aproximación, pero en rigor fisicoquímico los volúmenes no siempre son aditivos debido a interacciones intermoleculares (por ejemplo, al mezclar etanol y agua o ácidos concentrados, el volumen final se contrae ligeramente). En trabajo analítico debe medir V₁, verterlo en un matraz aforado con agua previa y enrasar hasta la marca exacta de V₂."
  - question: "¿Por qué nunca se debe agregar agua directamente sobre un ácido concentrado?"
    answer: "La hidratación de ácidos fuertes concentrados, especialmente el ácido sulfúrico (H₂SO₄), es un proceso intensamente exotérmico. Si vierte agua sobre el ácido, las primeras gotas hierven de forma instantánea en la superficie y pueden proyectar gotículas corrosivas. La regla de seguridad exige agregar siempre el ácido lentamente sobre un volumen previo de agua mientras se agita y se disipa el calor."
  - question: "¿Qué debo hacer si el volumen calculado V₁ es demasiado pequeño para pipetearlo con precisión?"
    answer: "Si V₁ resulta inferior a 1 µL o al límite fiable de sus micropipetas, debe realizar una dilución seriada en dos o más etapas. Primero prepare una disolución intermedia a una concentración 10 o 100 veces menor que la solución madre, y posteriormente vuelva a aplicar M₁V₁ = M₂V₂ a partir de esa dilución intermedia para preparar la disolución final de trabajo."
---

Los proveedores químicos suministran ácidos, bases y tampones biológicos en forma de **soluciones madre concentradas** (por ejemplo, ácido clorhídrico `12.1 M` o hidróxido de sodio `10.0 M`) para reducir el volumen de transporte y preservar la estabilidad del reactivo. En el trabajo diario de laboratorio, el analista debe rebajar esa concentración hasta una disolución de trabajo segura y reproducible mediante dilución.

El cálculo se rige por la ecuación de conservación del soluto `M₁ × V₁ = M₂ × V₂`. Conocer cómo despejar cada término y qué precauciones volumétricas respetar evita errores sistemáticos de concentración y accidentes térmicos. Nuestra [Calculadora de Dilución de Molaridad](/es/calculadoras/calculadora-de-dilucion-de-molaridad) resuelve al instante cualquiera de las cuatro variables y estima el volumen aproximado de disolvente necesario.

## Principio físico y ecuación M₁V₁ = M₂V₂

El fundamento de toda dilución es elemental: al añadir disolvente puro a una alícuota extraída de una solución madre, **no se crea ni se destruye soluto** (`n₁ = n₂`). Dado que la molaridad (`M`) se define como moles de soluto por litro de disolución (`n / V`), el número de moles contenidos en la alícuota inicial iguala exactamente al número de moles presentes en la disolución diluida final:

```text
M₁ × V₁ = M₂ × V₂
```

Cada variable representa un parámetro físico específico:

- **`M₁` (Molaridad inicial):** Concentración conocida de la solución madre concentrada (`mol/L` o `M`).
- **`V₁` (Volumen inicial o alícuota):** Volumen exacto que debe extraerse de la solución madre concentrada.
- **`M₂` (Molaridad final):** Concentración objetivo deseada para el experimento o análisis (`mol/L` o `M`).
- **`V₂` (Volumen final total):** Volumen total completo de la nueva disolución preparada (soluto más disolvente), nunca el volumen de agua añadida por separado.

De forma aproximada, el volumen de disolvente requerido se estima como `V_disolvente ≈ V₂ − V₁`, aunque en material volumétrico calibrado siempre se lleva la mezcla hasta la marca de aforo de `V₂`. Además, es obligatorio mantener **coherencia de unidades**: si `V₂` se introduce en mililitros (`mL`), el resultado `V₁` se obtendrá también en mililitros (`mL`); `M₁` y `M₂` deben expresarse ambos en `M` (o ambos en `mM` o `µM`).

## Ejemplo paso a paso: preparación de ácido clorhídrico 0.500 M

Suponga que un protocolo de valoración requiere `250.0 mL` de ácido clorhídrico (`HCl`) a una concentración exacta de `0.500 M`, y en el laboratorio solo dispone de un frasco comercial de `HCl` concentrado al `37 % m/m`, cuya molaridad nominal es `12.1 M`.

1. **Identificar las variables conocidas y la incógnita:**
   - `M₁ = 12.1 M`
   - `M₂ = 0.500 M`
   - `V₂ = 250.0 mL`
   - Incógnita: `V₁` (volumen de `HCl 12.1 M` necesario).
2. **Despejar `V₁` en la ecuación de dilución:**
   - `V₁ = (M₂ × V₂) / M₁`
   - `V₁ = (0.500 M × 250.0 mL) / 12.1 M`
   - `V₁ = 125.0 / 12.1 = 10.3306 mL ≈ 10.3 mL`
3. **Estimar el disolvente y ejecutar la mezcla segura:**
   - Volumen aproximado de agua desionizada: `250.0 mL − 10.3 mL = 239.7 mL`.
   - **Procedimiento correcto en matraz aforado de `250 mL`:** Vierta primero unos `150 mL` de agua desionizada en el matraz bajo campana de extracción. Añada lentamente los `10.3 mL` de `HCl 12.1 M` con pipeta graduada o bureta, agite con suavidad y deje equilibrar la temperatura hasta `20 °C`. Por último, complete con agua desionizada hasta la línea de enrase de `250.0 mL` y homogeneice por inversión.

## Escenarios habituales de dilución en laboratorio

La tabla siguiente reúne seis preparaciones frecuentes en química analítica, bioquímica y biología molecular calculadas mediante `M₁V₁ = M₂V₂`:

| Reactivo | M₁ solución madre | M₂ objetivo | V₂ final | V₁ alícuota (mL) | Agua aprox. (mL) | Uso habitual |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `HCl` | `12.1 M` | `0.500 M` | `250 mL` | `10.33` | `239.67` | Valoraciones ácido-base |
| `H₂SO₄` | `18.0 M` | `1.00 M` | `500 mL` | `27.78` | `472.22` | Digestión y medio ácido |
| `NaOH` | `10.0 M` | `0.250 M` | `1000 mL` | `25.00` | `975.00` | Neutralización alcalina |
| `NaCl` | `5.00 M` | `0.150 M` | `100 mL` | `3.00` | `97.00` | Solución salina isotónica |
| Tampón `Tris-HCl` | `1.00 M` | `0.050 M` | `200 mL` | `10.00` | `190.00` | Electroforesis y ensayos enzimáticos |
| `EDTA` | `0.500 M` | `0.0050 M` | `500 mL` | `5.00` | `495.00` | Quelación de iones divalentes |

## Diluciones seriadas, errores frecuentes y rigor experimental

En bioquímica, farmacología o microbiología (por ejemplo, curvas de calibración o ensayos enzimáticos), la relación `M₁ / M₂` supera a menudo `10 000:1` y exigiría pipetear fracciones de microlitro con alto error relativo. La solución es la **dilución seriada**: transferencias sucesivas con factor constante (`FD = V_total / V_alícuota`), logrando `M_k = M₀ / FDᵏ` tras `k` pasos.

Al utilizar nuestra [Calculadora de Dilución de Molaridad](/es/calculadoras/calculadora-de-dilucion-de-molaridad), evite estos errores habituales:

- **Confundir `V₂` con el agua añadida:** Preparar `100 mL` de `NaCl 0.150 M` desde `5.00 M` añadiendo `3.00 mL` de solución madre a `100 mL` de agua genera `103 mL` totales y una concentración errónea de `0.146 M`.
- **Mezclar unidades:** Combinar `mL` con `L` o `M` con `mM` introduce un desvío de `1000×`.
- **Ignorar la temperatura:** El material volumétrico Clase A está calibrado a `20 °C`. Enrasar una mezcla caliente tras diluir ácidos o bases fuertes (`NaOH`, `H₂SO₄`) provoca que, al enfriarse, el volumen se contraiga y la molaridad quede por encima del valor nominal.
- **Aplicar `M₁V₁ = M₂V₂` a reacciones:** Esta ecuación solo vale para diluciones con disolvente inerte; en neutralizaciones con estequiometría distinta de `1:1` (como `HCl` y `Ca(OH)₂`) deben igualarse los moles equivalentes.
