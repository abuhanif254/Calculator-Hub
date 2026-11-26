---
title: "Calculadora de Entalpía: Calor en Reacciones Químicas"
description: "Comprenda la entalpía, la diferencia entre reacciones exotérmicas y endotérmicas, y use nuestra Calculadora de Entalpía gratuita."
category: "Math & Science"
relatedCalculator: "enthalpy-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Cuál es la diferencia física entre calor (q) y cambio de entalpía (ΔH)?"
    answer: "El calor (q) depende de la trayectoria seguida durante el proceso, mientras que la entalpía (H) es una función de estado que solo depende de las condiciones iniciales y finales. Sin embargo, cuando una reacción transcurre a presión constante y únicamente realiza trabajo de expansión P × ΔV, el calor transferido coincide exactamente con la variación de entalpía (ΔH = q_p)."
  - question: "¿Por qué las reacciones endotérmicas absorben calor aunque se rompan y formen enlaces?"
    answer: "Romper enlaces químicos en los reactivos siempre consume energía, mientras que formar enlaces nuevos en los productos siempre libera energía. Una reacción es endotérmica (ΔH > 0) cuando la energía invertida en romper los enlaces originales supera a la energía recuperada al constituir los enlaces de los productos."
  - question: "¿Cómo se relaciona la entalpía (ΔH) con la energía interna (ΔU)?"
    answer: "A temperatura constante, ambas magnitudes se vinculan mediante ΔH = ΔU + Δ(P × V). En reacciones con gases ideales, la relación se expresa como ΔH = ΔU + Δn_gas × R × T, donde Δn_gas es la diferencia entre moles de gas en productos y reactivos. En procesos solo con sólidos y líquidos, el término Δ(P × V) es despreciable y ΔH ≈ ΔU."
  - question: "¿Por qué los cálculos con energías de enlace difieren de los datos experimentales?"
    answer: "Las tablas de entalpías de enlace proporcionan valores promedio obtenidos de múltiples moléculas en fase gaseosa, sin considerar el entorno electrónico exacto de cada átomo ni interacciones de resonancia o fase condensada. Por ello, este método ofrece estimaciones útiles cuando faltan datos de formación, pero no sustituye a las mediciones calorimétricas."
  - question: "¿Qué significa que la entalpía sea una propiedad extensiva?"
    answer: "Significa que ΔH es directamente proporcional a la cantidad de sustancia que reacciona. Si se duplican los coeficientes estequiométricos de una ecuación termoquímica, el valor de ΔH también se duplica; si se invierte el sentido de la reacción, el valor numérico se conserva pero cambia de signo."
---

La entalpía (`H`) cuantifica el contenido energético total de un sistema termodinámico a presión constante, definido como `H = U + P × V`, donde `U` es la energía interna, `P` la presión y `V` el volumen. En toda transformación que transcurre en un recipiente abierto a la atmósfera sin trabajo eléctrico o mecánico adicional, la variación de entalpía (`ΔH`) coincide exactamente con el calor transferido (`ΔH = q_p`).

Una reacción con `ΔH < 0` es **exotérmica**, ya que libera calor hacia el entorno y eleva su temperatura. Una reacción con `ΔH > 0` es **endotérmica**, pues absorbe energía térmica del medio y lo enfría. Para calcular estos balances de forma inmediata, utilice nuestra [Calculadora de Entalpía](/es/calculadoras/calculadora-de-entalpia).

## Metodologías para determinar el cambio de entalpía

Como la entalpía absoluta (`H`) no puede medirse directamente, la termoquímica evalúa cambios entre estados iniciales y finales (`ΔH`). Existen tres procedimientos principales según los datos disponibles: tablas de entalpías de formación, calorimetría experimental a presión constante y energías promedio de disociación de enlaces.

```text
ΔH = H_productos − H_reactivos
q_disolución = m × c × ΔT
ΔH_reacción = −q_disolución / n_limitante
ΔH ≈ Σ(E_enlaces rotos) − Σ(E_enlaces formados)
```

En calorimetría experimental a presión constante, `m` es la masa total del medio receptor en gramos (`g`), `c` es su calor específico (`4,184 J/(g·°C)` en disoluciones acuosas diluidas), `ΔT = T_final − T_inicial` representa el salto térmico (`°C` o `K`), y `n_limitante` indica los moles consumidos del reactivo limitante. Si el recipiente calorimétrico absorbe una fracción medible de energía, el balance se completa sumando el término `C_cal × ΔT`, donde `C_cal` es la capacidad calorífica del calorímetro calibrado (`J/°C`). Observe también la convención inversa en el método de energías de enlace: se suman las energías necesarias para romper los enlaces de los reactivos (etapa endotérmica) y se restan las energías liberadas al formar los nuevos enlaces de los productos (etapa exotérmica).

## Ejemplo numérico paso a paso: calorimetría de neutralización

En un calorímetro adiabático a presión constante se mezclan `100,0 mL` de `HCl 1,00 mol/L` con `100,0 mL` de `NaOH 1,00 mol/L`, ambos inicialmente a `22,0 °C`. Tras completarse la reacción de neutralización `HCl(ac) + NaOH(ac) → NaCl(ac) + H₂O(l)`, la temperatura máxima registrada en el equilibrio térmico alcanza `28,8 °C`. Asuma un volumen total aditivo de `200,0 mL`, una densidad de `1,00 g/mL` y un calor específico igual al del agua pura (`4,184 J/(g·°C)`).

1. **Masa y salto térmico:** La masa total es `m = 200,0 mL × 1,00 g/mL = 200,0 g` y la variación térmica es `ΔT = 28,8 °C − 22,0 °C = +6,8 °C`.
2. **Calor absorbido por la disolución (`q_disolución`):** `q_disolución = 200,0 g × 4,184 J/(g·°C) × 6,8 °C = 5690,24 J ≈ +5,69 kJ`.
3. **Calor liberado por la reacción (`q_reacción`):** Por conservación de la energía en un sistema aislado, el calor cedido por la reacción es exactamente opuesto al ganado por la disolución: `q_reacción = −5,69 kJ`.
4. **Moles reaccionantes (`n`):** Con estequiometría `1:1`, reaccionan `n = 0,1000 L × 1,00 mol/L = 0,100 mol` de agua formada.
5. **Entalpía molar (`ΔH`):** Dividiendo el calor de reacción por los moles transformados, `ΔH = −5,69 kJ / 0,100 mol = −56,9 kJ/mol`. El signo negativo confirma una neutralización fuertemente exotérmica, muy próxima al valor bibliográfico estándar de `−57,3 kJ/mol`.

## Comparativa de entalpías en procesos químicos y físicos

El orden de magnitud de `ΔH` permite distinguir con claridad los cambios físicos intermoleculares de las transformaciones químicas con ruptura y formación de enlaces covalentes.

| Proceso o reacción | Ecuación | `ΔH` (`kJ/mol`) | Tipo | Aplicación o efecto |
| :--- | :--- | :--- | :--- | :--- |
| Fusión del hielo (`0 °C`) | `H₂O(s) → H₂O(l)` | `+6,01` | Endotérmico | Refrigeración pasiva |
| Vaporización (`100 °C`) | `H₂O(l) → H₂O(g)` | `+40,66` | Endotérmico | Generación de vapor |
| Disolución de `NH₄NO₃` | `NH₄NO₃(s) → NH₄⁺(ac) + NO₃⁻(ac)` | `+25,7` | Endotérmico | Compresas frías médicas |
| Neutralización fuerte | `H⁺(ac) + OH⁻(ac) → H₂O(l)` | `−57,3` | Exotérmico | Control térmico de efluentes |
| Síntesis de amoníaco | `N₂(g) + 3 H₂(g) → 2 NH₃(g)` | `−91,8` | Exotérmico | Proceso Haber-Bosch |
| Combustión de metano | `CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)` | `−890,3` | Exotérmico | Calderas de gas natural |

## Casos de uso reales, errores frecuentes y límites del modelo

En ingeniería de procesos químicos, conocer `ΔH` permite dimensionar la carga térmica (`Q̇ = ṅ × ΔH`) de reactores discontinuos, columnas de destilación y sistemas de intercambio de calor para evitar sobrepresiones o descomposiciones térmicas indeseadas. En refrigeración industrial y climatización, la entalpía de vaporización del fluido refrigerante determina el caudal másico necesario para extraer una potencia frigorífica específica en kilovatios (`kW`). En control de calidad energética y nutrición, la calorimetría certifica el poder calorífico de combustibles fósiles, biocombustibles y macronutrientes alimentarios.

Tres errores distorsionan con frecuencia estos cálculos en la práctica. El primero consiste en invertir el signo entre la disolución y el sistema reactivo: si la temperatura sube (`ΔT > 0`), la disolución absorbe calor (`q_disolución > 0`), pero la reacción es exotérmica (`ΔH < 0`). El segundo radica en omitir el estado físico de las sustancias, ya que obtener agua líquida en lugar de vapor altera `ΔH` en `44,01 kJ/mol` a `298,15 K`. El tercero es confundir el calor medido a volumen constante (`ΔU` en una bomba calorimétrica rígida) con `ΔH` sin sumar la corrección `Δn_gas × R × T` cuando cambian los moles gaseosos.

Como límite experimental, usar `c = 4,184 J/(g·°C)` y despreciar la capacidad calorífica del calorímetro (`C_cal`) solo es válido en prácticas aproximadas con disoluciones diluidas; en mediciones analíticas de alta precisión debe calibrarse previamente `C_cal`, corregir las pérdidas radiativas y considerar las entalpías de dilución iónica.
