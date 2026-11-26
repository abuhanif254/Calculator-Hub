---
title: "Calculadora de Molaridad: Midiendo la Concentración Química"
description: "Guía técnica sobre molaridad (M) y preparación de disoluciones: ecuación de concentración molar, diluciones en serie, conversión desde porcentaje en peso y efectos térmicos."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molarity-calculator"
faqs:
  - question: "¿Por qué se debe enrasar el matraz aforado después de disolver el soluto y no añadir 1 litro de disolvente directamente?"
    answer: "Porque el volumen de las partículas del soluto ocupa espacio y las interacciones intermoleculares alteran el volumen parcial molar de la mezcla. Si agrega exactamente 1.0 L de agua a 58.44 g de NaCl, el volumen final superará 1.0 L y la concentración resultante será menor a 1.0 M. La molaridad se define siempre respecto al volumen total de la disolución final."
  - question: "¿Cambia la molaridad de una disolución si varía la temperatura del laboratorio?"
    answer: "Sí. Aunque la cantidad de moles de soluto permanece invariable, el volumen de los líquidos se dilata al aumentar la temperatura y se contrae al enfriarse. Por ejemplo, el agua pura expande su volumen aproximadamente un 0.28 % entre 20 °C y 30 °C, reduciendo ligeramente la molaridad real. El material volumétrico de vidrio suele estar calibrado exactamente a 20 °C."
  - question: "¿Cómo afecta el agua de hidratación de una sal al cálculo de la molaridad?"
    answer: "Las moléculas de agua cristalina forman parte de la masa pesada en la balanza analítica, por lo que debe utilizarse la masa molar de la forma hidratada exacta indicada en el frasco. Por ejemplo, el sulfato de cobre anhidro (CuSO₄) tiene una masa molar de 159.61 g/mol, mientras que el pentahidratado (CuSO₄·5H₂O) pesa 249.69 g/mol."
  - question: "¿Cuál es la diferencia entre molaridad (M) y normalidad (N) en titulaciones?"
    answer: "La molaridad expresa moles de sustancia por litro de disolución, mientras que la normalidad expresa equivalentes químicos por litro (N = M × n_eq). Para ácidos monopróticos como HCl, M y N coinciden (1 M = 1 N); en cambio, para una reacción completa de ácido sulfúrico (H₂SO₄), que aporta dos protones ácidos, una disolución 1.0 M equivale a 2.0 N."
  - question: "¿Cómo se convierte la concentración de un ácido comercial en porcentaje masa/masa a molaridad?"
    answer: "Se combinan la pureza porcentual (% p/p), la densidad del reactivo (ρ en g/mL) y su masa molar (PM en g/mol) mediante la expresión M = (% p/p × ρ × 10) / PM. El factor 10 resulta de multiplicar la densidad por 1,000 mL/L y dividir el porcentaje entre 100."
---

La **molaridad (`M`)** es la unidad de concentración estándar en química analítica, bioquímica y síntesis industrial para expresar cuántos moles de soluto están disueltos en cada litro de disolución total (`mol/L` o `mol·dm⁻³`). Su uso permite relacionar directamente volúmenes medidos con pipetas o matraces aforados con las proporciones estequiométricas de cualquier reacción química.

A diferencia de las unidades basadas únicamente en masa, la molaridad depende del volumen final de la mezcla líquida, por lo que su valor exacto queda vinculado a la temperatura de medición. Para calcular masas requeridas, concentraciones molares o volúmenes de dilución sin errores de conversión, utilice nuestra [Calculadora de Molaridad](/es/calculadoras/calculadora-de-molaridad).

## Ecuación fundamental, masa molar y ley de dilución

Toda disolución homogénea se compone de un **soluto** (la sustancia dispersa en menor proporción) y un **disolvente** (el medio continuo, habitualmente agua desionizada). La concentración molar se define mediante el cociente entre los moles de soluto (`n`) y el volumen total de la disolución (`V`) expresado en litros:

```text
M = n / V = m_soluto / (PM × V)
```

En esta expresión:
- **`M`** es la molaridad en moles por litro (`mol/L`).
- **`n`** representa los moles de soluto (`n = m_soluto / PM`).
- **`m_soluto`** es la masa pesada del compuesto en gramos (`g`).
- **`PM`** es la masa molar del soluto en gramos por mol (`g/mol`).
- **`V`** es el volumen total de la disolución en litros (`L = mL / 1000`).

Cuando se parte de una disolución madre concentrada para preparar otra más diluida, el número de moles transferidos no cambia al añadir disolvente puro. Esa conservación da lugar a la **ecuación de dilución**:

```text
M₁ × V₁ = M₂ × V₂
```

Donde `M₁` y `V₁` corresponden a la concentración y volumen tomado de la disolución madre, y `M₂` y `V₂` a la concentración deseada y el volumen final tras enrasar. Si el reactivo de partida es un líquido comercial concentrado especificado en porcentaje en peso (`% p/p`) y densidad (`ρ` en `g/mL`), su molaridad se obtiene con `M = (% p/p × ρ × 10) / PM`.

## Cálculo paso a paso: preparación y dilución de cloruro de sodio

Suponga que necesita preparar `250 mL` de una disolución patrón de cloruro de sodio (`NaCl`, `PM = 58.44 g/mol`) a una concentración exacta de `0.400 M`, y luego utilizarla para obtener `100 mL` de una disolución de trabajo `0.050 M`.

1. **Conversión del volumen a litros:** Se divide el volumen objetivo entre mil: `V = 250 mL / 1000 = 0.250 L`.
2. **Cálculo de los moles necesarios:** Se despeja `n = M × V = 0.400 mol/L × 0.250 L = 0.100 mol` de `NaCl`.
3. **Cálculo de la masa de soluto:** Se multiplican los moles por la masa molar: `m_soluto = 0.100 mol × 58.44 g/mol = 5.844 g`. En el laboratorio, se pesan `5.844 g` de `NaCl` seco, se disuelven por completo en aproximadamente `150 mL` de agua desionizada dentro de un matraz aforado Clase A de `250 mL` y finalmente se enrasa con agua hasta la marca de `250.0 mL` a `20 °C`.
4. **Dilución a la disolución de trabajo (`0.050 M`):** Aplicando `M₁ × V₁ = M₂ × V₂`, se despeja el volumen de alícuota necesario: `V₁ = (0.050 M × 100 mL) / 0.400 M = 12.5 mL`. Se miden `12.5 mL` de la disolución `0.400 M` con pipeta aforada y se diluyen en un matraz de `100 mL` hasta alcanzar el enrase final.

## Reactivos comerciales y disoluciones de referencia en laboratorio

La siguiente tabla reúne valores de referencia verificados para reactivos concentrados y disoluciones estándar de uso frecuente:

| Reactivo o disolución | Fórmula | Pureza o título típico | Densidad `ρ` (`g/mL`) | Masa molar (`g/mol`) | Molaridad aproximada (`M`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Ácido clorhídrico concentrado | `HCl` | `37 % p/p` | `1.19` | `36.46` | `12.1 M` (`12.08 mol/L`) |
| Ácido sulfúrico concentrado | `H₂SO₄` | `98 % p/p` | `1.84` | `98.08` | `18.4 M` (`18.39 mol/L`) |
| Ácido nítrico concentrado | `HNO₃` | `70 % p/p` | `1.42` | `63.01` | `15.8 M` (`15.78 mol/L`) |
| Amoníaco acuoso concentrado | `NH₃ (ac)` | `28 % p/p` | `0.90` | `17.03` | `14.8 M` (`14.80 mol/L`) |
| Suero salino fisiológico | `NaCl` | `0.9 % p/v` (`9.0 g/L`) | `1.005` | `58.44` | `0.154 M` (`154 mM`) |
| Glucosa isotónica estándar | `C₆H₁₂O₆` | `5.0 % p/v` (`50.0 g/L`) | `1.018` | `180.16` | `0.278 M` (`278 mM`) |

## Buenas prácticas de laboratorio, errores frecuentes y seguridad

La reproducibilidad analítica de una disolución molar depende tanto del cálculo como de la técnica gravimétrica y volumétrica:

- **Control térmico previo al enrase:** La disolución de bases fuertes como el hidróxido de sodio (`NaOH`) o de ácidos concentrados libera abundante calor de hidratación. Enrasar un matraz mientras la mezcla está caliente provoca que, al enfriarse a `20 °C`, el líquido se contraiga por debajo del aforo y la molaridad real aumente. Espere siempre a que alcance la temperatura de calibración antes de ajustar el menisco.
- **Regla de seguridad en diluciones ácidas:** Añada siempre el ácido concentrado lentamente sobre un volumen previo de agua mientras agita y refrigera si es necesario, nunca agua sobre ácido concentrado, para evitar proyecciones térmicas violentas por ebullición localizada.
- **Compensación de pureza del reactivo sólido:** Los reactivos grado técnico o higroscópicos rara vez alcanzan el 100 % de pureza. Si un frasco declara un `95 %` de ensayo, divida la masa teórica entre `0.95` para pesar la cantidad real equivalente.
- **Límite frente a la termodinámica:** Cuando un experimento abarca variaciones amplias de temperatura (ebullioscopia, crioscopia o cinética no isotérmica), la molaridad deja de ser constante; en tales escenarios debe emplearse la **molalidad (`m`)** expresada en moles por kilogramo de disolvente.
