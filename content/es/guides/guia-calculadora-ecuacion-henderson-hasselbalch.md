---
title: "Ecuación de Henderson-Hasselbalch: Soluciones Amortiguadoras"
description: "Guía técnica sobre la ecuación de Henderson-Hasselbalch: derivación desde Ka, cálculo del pH en soluciones amortiguadoras, ejemplo resuelto paso a paso, límites de validez y aplicaciones."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "henderson-hasselbalch-equation-calculator"
faqs:
  - question: "¿En qué intervalo de pH es válida la ecuación de Henderson-Hasselbalch?"
    answer: "La ecuación ofrece alta precisión dentro del intervalo pKa ± 1 unidad de pH, donde tanto el ácido débil como su base conjugada superan el 9 % de la concentración total. Fuera de este rango, las concentraciones relativas caen por debajo de una relación 10:1 y comienzan a pesar la autoionización del agua y la disociación no despreciable."
  - question: "¿Se puede aplicar la ecuación de Henderson-Hasselbalch a bases débiles?"
    answer: "Sí. Existen dos vías equivalentes: utilizar la forma en pOH con el pKb de la base (pOH = pKb + log₁₀([BH⁺] / [B])) y restar de 14.00 a 25 °C, o convertir el pKb del sistema en el pKa de su ácido conjugado (pKa = pKw − pKb) y emplear directamente la forma estándar del pH."
  - question: "¿Por qué cambia tan poco el pH cuando se diluye una solución amortiguadora?"
    answer: "Porque el término logarítmico depende únicamente del cociente de concentraciones [A⁻] / [HA] y no de sus valores absolutos. Al diluir moderadamente la solución con agua pura, ambas concentraciones disminuyen en el mismo factor, el cociente permanece constante y el pH casi no varía, aunque sí se reduce la capacidad amortiguadora."
  - question: "¿Qué ocurre cuando la concentración del ácido débil iguala exactamente a la de su base conjugada?"
    answer: "Cuando [A⁻] = [HA], el cociente [A⁻] / [HA] es igual a 1. Dado que log₁₀(1) = 0, la ecuación se simplifica a pH = pKa. Este punto corresponde a la zona de máxima eficacia amortiguadora del sistema frente a adiciones equivalentes de ácido o base fuerte."
  - question: "¿Por qué la ecuación arroja ligeras desviaciones en soluciones concentradas o con alta fuerza iónica?"
    answer: "La forma clásica emplea concentraciones molares en lugar de actividades químicas. En medios salinos concentrados o tampones de alta molaridad, las interacciones electrostáticas entre iones reducen los coeficientes de actividad, desplazando el pKa aparente respecto al valor termodinámico estándar medido a dilución infinita."
---

La **ecuación de Henderson-Hasselbalch** relaciona el pH de una solución acuosa con la constante de acidez (`pKa`) de un ácido débil y la proporción molar entre su base conjugada (`[A⁻]`) y el ácido no disociado (`[HA]`). Constituye el modelo estándar para calcular el pH de soluciones amortiguadoras, predecir la ionización de fármacos y evaluar el equilibrio ácido-base fisiológico.

Mientras una gota de ácido fuerte desploma el pH del agua pura hacia `3.0`, el plasma sanguíneo conserva su pH entre `7.35` y `7.45` gracias al sistema bicarbonato-ácido carbónico. Nuestra [Calculadora de Henderson-Hasselbalch](/es/calculadoras/calculadora-de-ecuacion-de-henderson-hasselbalch) automatiza este cálculo al instante. Esta guía reúne su deducción desde `Ka`, un ejemplo resuelto con adición de ácido fuerte, una tabla de tampones habituales y sus límites de aplicación.

## Fundamento matemático, derivación y parámetros

La ecuación parte del equilibrio de disociación de un ácido débil monoprótico (`HA`) en agua:

```text
HA(ac) + H₂O(l) ⇌ H₃O⁺(ac) + A⁻(ac)
Ka = ([H₃O⁺] × [A⁻]) / [HA]
```

Al despejar `[H₃O⁺]` y aplicar el logaritmo decimal negativo (`−log₁₀`) en ambos lados se obtiene la ecuación principal:

```text
pH = pKa + log₁₀([A⁻] / [HA])
```

Para sistemas basados en una base débil (`B`) y su ácido conjugado (`BH⁺`), la forma equivalente en `pOH` es:

```text
pOH = pKb + log₁₀([BH⁺] / [B])
pH = pKw − pOH   (a 25 °C, pKw = 14.00)
```

Parámetros exactos:

- **`pH`:** potencial de hidrógeno de la disolución (`−log₁₀[H₃O⁺]`), adimensional.
- **`pKa`:** cologaritmo decimal de la constante ácida (`−log₁₀(Ka)`), dependiente de la temperatura.
- **`[A⁻]`:** molaridad en equilibrio de la base conjugada (`mol/L`), aportada normalmente como sal soluble.
- **`[HA]`:** molaridad en equilibrio del ácido débil protonado (`mol/L`).

Esta aproximación asume que las concentraciones en equilibrio coinciden con las iniciales, lo cual se cumple cuando ambas especies superan `0.01 M` y su cociente permanece entre `0.1` y `10`.

## Ejemplo resuelto: amortiguador acético antes y después de añadir ácido

Considere `1.00 L` de tampón a `25 °C` con `0.150 mol/L` de ácido acético (`CH₃COOH`, `pKa = 4.76`) y `0.250 mol/L` de acetato de sodio (`CH₃COONa`), al que luego se añaden `0.020 mol` de `HCl` sin cambio de volumen.

### Fase 1: pH inicial del sistema

1. **Identifique los datos:** `pKa = 4.76`, `[A⁻] = 0.250 M`, `[HA] = 0.150 M`.
2. **Calcule el cociente:** `0.250 / 0.150 = 1.6667`.
3. **Obtenga el logaritmo y el pH:**

```text
pH = 4.76 + log₁₀(1.6667) = 4.76 + 0.2218 = 4.98
```

### Fase 2: perturbación al añadir 0.020 mol de HCl

El `HCl` convierte estequiométricamente `0.020 mol/L` de acetato en ácido acético:

1. **Recalcule las concentraciones:**
   - `[A⁻]_nuevo = 0.250 − 0.020 = 0.230 M`
   - `[HA]_nuevo = 0.150 + 0.020 = 0.170 M`
2. **Determine el nuevo pH:**

```text
pH_nuevo = 4.76 + log₁₀(0.230 / 0.170) = 4.76 + log₁₀(1.3529) = 4.76 + 0.1313 = 4.89
```

El pH varía apenas `−0.09` unidades (`4.98` a `4.89`). En `1.00 L` de agua pura (`pH 7.00`), esos mismos `0.020 mol` de `HCl` darían `pH = −log₁₀(0.020) = 1.70`, un desplome de `5.30` unidades. Esta resistencia numérica ilustra cómo la reserva conjugada absorbe los protones entrantes y transforma un ácido fuerte en una cantidad equivalente de ácido débil poco disociado.

Si en lugar de añadir ácido se incorporasen `0.020 mol` de hidróxido de sodio (`NaOH`), los iones hidróxido reaccionarían con el ácido acético elevando `[A⁻]` hasta `0.270 M` y reduciendo `[HA]` hasta `0.130 M`, lo que situaría el nuevo pH en `5.08`, una subida simétrica de apenas `+0.10` unidades. Por el contrario, superar la reserva molar de `0.250 mol` de acetato o `0.150 mol` de ácido acético agotaría el par conjugado y provocaría la ruptura del amortiguador.

## Tabla comparativa de sistemas amortiguadores frecuentes (25 °C)

Cada tampón opera de forma óptima en torno a `pKa ± 1`:

| Sistema | Ácido (`HA`) | Base (`A⁻`) | `pKa` (25 °C) | Intervalo útil | Uso principal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Formiato | `HCOOH` | `HCOO⁻` | `3.75` | `2.75 – 4.75` | Cromatografía líquida (HPLC) |
| Acetato | `CH₃COOH` | `CH₃COO⁻` | `4.76` | `3.76 – 5.76` | Ensayos enzimáticos ácidos |
| MES | MES ácido | MES sódico | `6.15` | `5.15 – 7.15` | Cultivos celulares y electroforesis |
| Fosfato (`pKa₂`) | `H₂PO₄⁻` | `HPO₄²⁻` | `7.20` | `6.20 – 8.20` | Tampones fisiológicos (PBS) |
| Bicarbonato (37 °C) | `H₂CO₃` | `HCO₃⁻` | `6.10` | `6.80 – 7.60` | Regulación del pH sanguíneo |
| Tris | `Tris-H⁺` | `Tris` | `8.07` | `7.07 – 9.07` | Biología molecular y PCR |
| Amonio | `NH₄⁺` | `NH₃` | `9.25` | `8.25 – 10.25` | Valoraciones complexométricas |

## Aplicaciones prácticas, errores frecuentes y límites de precisión

### Usos clave en laboratorio y clínica

- **Farmacocinética:** predice la fracción no ionizada de fármacos a través del tracto digestivo (`pH 1.5–2.0` gástrico frente a `pH 6.0–7.4` intestinal), determinando su absorción pasiva por membranas lipídicas.
- **Gasometría arterial:** mediante `pH = 6.10 + log₁₀([HCO₃⁻] / (0.03 × pCO₂))` permite diagnosticar acidosis y alcalosis metabólicas o respiratorias.
- **Cromatografía analítica:** estabiliza la carga de analitos ionizables en fases móviles para evitar distorsión de picos.

### Errores comunes y advertencias experimentales

1. **Omitir el coeficiente térmico del pKa:** el tampón Tris presenta `ΔpKa / ΔT ≈ −0.028 °C⁻¹`; ajustado a `pH 8.00` a `25 °C`, desciende cerca de `7.66` a `37 °C`. Calibre siempre a la temperatura de ensayo.
2. **Emplear soluciones muy diluidas:** por debajo de `10⁻⁴ M`, la autoionización del agua altera el cociente real e invalida la fórmula simplificada.
3. **Confundir volúmenes mezclados:** al unir dos disoluciones en un mismo matraz ambas se diluyen por igual, por lo que el cociente `[A⁻] / [HA]` coincide exactamente con el cociente de moles `n_A⁻ / n_HA`.
4. **Ignorar la fuerza iónica:** añadir sales como `NaCl` reduce los coeficientes de actividad iónica y desplaza el pH medido entre `0.05` y `0.20` unidades respecto al cálculo ideal.
