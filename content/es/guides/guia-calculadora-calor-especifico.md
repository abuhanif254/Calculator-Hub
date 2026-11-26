---
title: "Calculadora de Calor Específico: Capacidad Térmica"
description: "Comprenda qué es la capacidad calorífica específica, cómo determina el intercambio de energía térmica y utilice nuestra calculadora de calor específico."
category: "Math & Science"
relatedCalculator: "specific-heat-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Cuál es la diferencia entre calor específico y capacidad calorífica?"
    answer: "El calor específico (c) es una propiedad intensiva del material, expresada por unidad de masa (por ejemplo, J/(g·°C)), y no depende del tamaño de la muestra. La capacidad calorífica (C = m × c) es una propiedad extensiva que indica cuánta energía requiere un objeto completo para elevar su temperatura en 1 °C."
  - question: "¿Por qué el agua tiene un calor específico tan elevado en comparación con los metales?"
    answer: "Las moléculas de agua forman una red tridimensional de puentes de hidrógeno muy cohesiva. Gran parte de la energía térmica suministrada se invierte en estirar y romper parcialmente estos enlaces intermoleculares antes de aumentar la energía cinética traslacional (temperatura), mientras que en los metales los electrones libres transmiten el calor con mínima energía almacenada."
  - question: "¿El calor específico de una sustancia es siempre constante?"
    answer: "No. Aunque suele tratarse como constante en intervalos moderados de temperatura (por ejemplo, entre 15 °C y 80 °C para el agua líquida), el calor específico varía con la temperatura y con la presión. En sólidos cercanos al cero absoluto desciende drásticamente siguiendo la ley de Debye (proporcional a T³)."
  - question: "¿Por qué los gases tienen dos valores de calor específico (c_p y c_v)?"
    answer: "Al calentar un gas a volumen constante (c_v), toda la energía aumenta su energía interna y temperatura. Al calentarlo a presión constante (c_p), el gas se expande realizando trabajo mecánico contra el entorno, por lo que requiere más energía para lograr el mismo incremento térmico (c_p > c_v; en gases ideales, c_p − c_v = R / M)."
  - question: "¿Puedo usar la fórmula q = m × c × ΔT durante la ebullición o la fusión?"
    answer: "No. Durante un cambio de fase puro a presión constante, la temperatura permanece fija (ΔT = 0) mientras la sustancia absorbe o libera calor latente. Para esa etapa debe emplearse la ecuación q = m × L, donde L es el calor latente de fusión o de vaporización."
---

La **capacidad calorífica específica** —conocida habitualmente como **calor específico (`c`)**— es una propiedad física intensiva que expresa la energía térmica requerida para elevar la temperatura de una unidad de masa (`1 g` o `1 kg`) de una sustancia en `1 °C` (o `1 K`) sin cambio de fase. Esta propiedad explica por qué un utensilio metálico se calienta en segundos mientras el agua contenida en él exige mucha más energía y tiempo bajo la misma fuente térmica.

El calor específico resulta esencial en diseño de intercambiadores, climatización y análisis calorimétrico. Puede despejar cualquier variable térmica al instante mediante nuestra [Calculadora de Calor Específico](/es/calculadoras/calculadora-de-calor-especifico).

## Formulación matemática, despejes y magnitudes relacionadas

Sin transiciones de fase, la relación entre energía térmica (`q`), masa (`m`), calor específico (`c`) y variación térmica (`ΔT`) responde a la ecuación del calor sensible y sus despejes:

```text
Ecuación principal:
q = m × c × ΔT

Despejes directos:
c = q / (m × ΔT)
m = q / (c × ΔT)
ΔT = q / (m × c)

Capacidad calorífica total (C) y molar (C_m):
C = m × c        C_m = c × M
```

Verifique siempre estas equivalencias dimensionales antes de operar:

- **`1 J/(g·°C)` equivale a `1 kJ/(kg·K)` y a `1 000 J/(kg·K)`.**
- **`1 cal/(g·°C)` equivale exactamente a `4,184 J/(g·°C)`.**
- **`ΔT = T_final − T_inicial`** tiene idéntico valor numérico en `°C` y en `K`.

En gases compresibles deben distinguirse el calor específico a volumen constante (`c_v`) y a presión constante (`c_p`). Al calentarse a presión constante, el gas se expande y efectúa trabajo mecánico (`P·ΔV`), por lo que `c_p` supera siempre a `c_v`; en gases ideales cumplen la relación de Mayer (`c_p − c_v = R / M`). En sólidos y líquidos, ambos valores son prácticamente idénticos.

## Ejemplo práctico paso a paso: identificación de un metal

En laboratorio se desea identificar un bloque metálico puro de `150,0 g`. Se calienta en baño térmico hasta `98,0 °C` y se sumerge en un recipiente aislado con `200,0 g` de agua inicialmente a `20,0 °C` (pérdidas del recipiente despreciables). El equilibrio térmico se estabiliza en `25,8 °C`.

1. **Calcular las variaciones de temperatura (`ΔT`):**
   - Agua: `ΔT_agua = 25,8 °C − 20,0 °C = +5,8 °C`.
   - Metal: `ΔT_metal = 25,8 °C − 98,0 °C = −72,2 °C`.
2. **Calcular el calor ganado por el agua (`q_agua`):**
   Con `c_agua = 4,184 J/(g·°C)`:
   `q_agua = 200,0 g × 4,184 J/(g·°C) × 5,8 °C = +4 853,44 J`.
3. **Aplicar conservación de la energía (`q_metal = −q_agua`):**
   `q_metal = −4 853,44 J`.
4. **Despejar el calor específico del metal (`c_metal`):**
   `c_metal = −4 853,44 J / [150,0 g × (−72,2 °C)]`
   `c_metal = −4 853,44 J / (−10 830 g·°C) = 0,448 J/(g·°C)`.

Al comparar `0,448 J/(g·°C)` (`448 J/(kg·K)`) con tablas estándar, el valor coincide con el hierro puro (`0,449 J/(g·°C)`) dentro de un margen de error experimental inferior al `0,3 %`.

## Capacidad calorífica específica de sustancias de referencia (a 25 °C)

La siguiente tabla muestra la amplitud térmica entre fluidos polares, compuestos orgánicos y metales sólidos.

| Sustancia | Estado físico | c en J/(g·°C) | c en J/(kg·K) | Aplicación térmica o industrial |
| :--- | :--- | :--- | :--- | :--- |
| Agua líquida (`H₂O`) | Líquido | `4,184` | `4 184` | Refrigeración industrial y regulación climática |
| Etanol (`C₂H₅OH`) | Líquido | `2,440` | `2 440` | Fluidos térmicos de baja temperatura |
| Hielo (`H₂O` a `0 °C`) | Sólido | `2,090` | `2 090` | Almacenamiento térmico frío y criogenia |
| Aluminio (`Al`) | Sólido | `0,897` | `897` | Disipadores electrónicos y aeronáutica |
| Vidrio común (sílice) | Sólido | `0,840` | `840` | Aislamiento arquitectónico y laboratorio |
| Hierro / Acero (`Fe`) | Sólido | `0,449` | `449` | Calderería y maquinaria térmica |
| Cobre (`Cu`) | Sólido | `0,385` | `385` | Intercambiadores y cableado eléctrico |
| Plomo (`Pb`) | Sólido | `0,128` | `128` | Blindaje radiológico y contrapesos |

## Aplicaciones en ingeniería, errores frecuentes y límites físicos

En arquitectura bioclimática, materiales con alta capacidad térmica volumétrica (hormigón, piedra o agua) aportan **inercia térmica** que amortigua oscilaciones diarias de temperatura. En vehículos eléctricos, la gestión térmica de baterías de iones de litio se dimensiona a partir del calor específico de las celdas (`~0,9` a `1,1 J/(g·°C)`) y del refrigerante encargado de disipar picos durante cargas rápidas. En climatología, el elevado calor específico oceánico modera las temperaturas costeras frente a zonas continentales áridas.

Evite cuatro errores habituales en cálculos térmicos:

- **Inconsistencia entre gramos y kilogramos:** Combinar masa en kilogramos con `c = 4,184 J/(g·°C)` introduce un error de factor `1 000`. Emplee `4 184 J/(kg·K)` cuando trabaje en kilogramos.
- **Confundir calor específico con conductividad térmica (`k`):** El cobre tiene bajo calor específico (`0,385 J/(g·°C)`) y altísima conductividad, calentándose y transmitiendo energía velozmente. Los aislantes como el poliuretano o la madera poseen calores específicos más altos, pero conducen el calor muy lentamente.
- **Cruzar cambios de fase con `q = m·c·ΔT`:** Calentar hielo de `−10 °C` a vapor a `110 °C` exige sumar cinco tramos separados: tres de calor sensible (`q = m·c·ΔT` para hielo, agua líquida y vapor) y dos de calor latente (`q = m·L` en fusión a `0 °C` y vaporización a `100 °C`).
- **Suponer `c` constante en rangos extremos:** A temperaturas criogénicas (`< 100 K`) o muy altas (`> 300 °C`), debe integrarse la curva experimental `c(T)`.
