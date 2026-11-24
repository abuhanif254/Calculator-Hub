---
title: "Calculadora de Conversiones"
metaTitle: "Calculadora de Conversiones | Sistema Métrico e Imperial"
description: "Convierte con exactitud unidades de longitud, masa, volumen y temperatura entre el Sistema Internacional (SI) y el sistema anglosajón o estadounidense."
metaDescription: "Convierte al instante longitud, peso, volumen y temperatura entre el sistema métrico SI y el imperial usando factores de equivalencia exactos."
metaKeywords: "calculadora de conversiones, conversor de unidades, sistema métrico si, sistema imperial, pulgadas a centímetros, kilogramos a libras, galones a litros, celsius a fahrenheit"
faqs:
  - question: "¿Por qué una pulgada equivale exactamente a 2,54 centímetros sin decimales adicionales?"
    answer: "En 1959, Estados Unidos, Reino Unido, Canadá, Australia y otros países firmaron el Acuerdo Internacional de la Yarda y la Libra, que fijó por definición legal 1 yarda igual a 0,9144 metros exactos (1 pulgada igual a 2,54 cm) y 1 libra avoirdupois igual a 0,45359237 kilogramos exactos, eliminando discrepancias previas entre normativas nacionales."
  - question: "¿Cuál es la diferencia entre un galón estadounidense y un galón imperial británico?"
    answer: "Un galón líquido estadounidense equivale exactamente a 3,785411784 litros (128 onzas líquidas estadounidenses de 29,5735 mL), mientras que un galón imperial británico equivale a 4,54609 litros (160 onzas líquidas imperiales de 28,4131 mL). La diferencia supera el 20 %, por lo que confundir ambos estándares distorsiona cálculos de combustible o mezclas industriales."
  - question: "¿Por qué las temperaturas no se convierten mediante una simple regla de tres?"
    answer: "Magnitudes como longitud, masa y volumen son escalas de razón que comparten el cero absoluto (0 metros equivalen a 0 pies). En cambio, Celsius y Fahrenheit poseen orígenes desplazados (0 °C corresponde a 32 °F) y grados de distinto tamaño, por lo que exigen combinar un factor multiplicativo con un desplazamiento aditivo."
  - question: "¿Cómo se convierten áreas o volúmenes cúbicos usando factores de longitud?"
    answer: "Todo factor lineal debe elevarse al cuadrado para superficies y al cubo para volúmenes. Como 1 pie mide exactamente 0,3048 metros, 1 pie cuadrado equivale a 0,3048² = 0,092903 metros cuadrados y 1 pie cúbico equivale a 0,3048³ = 0,028317 metros cúbicos."
  - question: "¿Es igual una onza de masa (oz) que una onza líquida (fl oz) o una onza troy?"
    answer: "No. La onza estándar avoirdupois mide masa y equivale a 28,3495 gramos; la onza líquida estadounidense mide volumen (29,5735 mililitros) y su masa depende de la densidad del fluido; por último, la onza troy (31,1035 gramos) se reserva exclusivamente para el comercio de metales preciosos como el oro y la plata."
---

Interpretar planos mecánicos importados, fichas técnicas, envíos internacionales o recetas culinarias exige traducir medidas con exactitud entre dos estándares globales. Más del 95 % del mundo y la totalidad de la ciencia operan bajo el **Sistema Internacional de Unidades (SI)** —construido sobre potencias decimales de base 10—, mientras que Estados Unidos y ámbitos específicos de Reino Unido, Canadá y la aviación mantienen el **sistema estadounidense e imperial**, regido por proporciones históricas no decimales.

Esta **Calculadora de Conversiones** abarca las cuatro magnitudes esenciales —**longitud**, **peso y masa**, **volumen líquido** y **temperatura**— con respuesta bidireccional inmediata. Al operar internamente sobre unidades pivote normalizadas del SI, garantiza equivalencias coherentes tanto al convertir del sistema métrico al anglosajón como en sentido inverso.

## Ecuaciones de Conversión Dimensional y Escalas Térmicas

Desde la metrología matemática existen dos familias bien diferenciadas: las **transformaciones proporcionales** (longitud, masa y volumen) y las **transformaciones afines** (temperatura).

### 1. Conversión Proporcional mediante Unidad Pivote del SI

En magnitudes cuyo origen cero coincide en todos los sistemas, cada unidad se vincula mediante un factor exacto $f$ a una base del SI: **metro (`m`)**, **kilogramo (`kg`)** o **litro (`L`)**. La equivalencia se calcula mediante:

$$V_{\text{destino}} = V_{\text{origen}} \cdot \frac{f_{\text{origen}}}{f_{\text{destino}}}$$

Donde intervienen cuatro términos:

* **$V_{\text{origen}}$:** cantidad medida expresada en la unidad inicial.
* **$V_{\text{destino}}$:** valor equivalente expresado en la unidad objetivo.
* **$f_{\text{origen}}$:** valor de 1 unidad de partida expresado en la base SI correspondiente.
* **$f_{\text{destino}}$:** valor de 1 unidad de destino expresado en esa misma base SI.

Dentro del propio sistema métrico SI, los prefijos multiplican o dividen por potencias exactas de diez (`kilo` equivale a mil, `centi` a una centésima y `mili` a una milésima), por lo que pasar de milímetros a kilómetros exige únicamente desplazar la coma decimal. En cambio, el sistema estadounidense enlaza proporciones desiguales (doce pulgadas por pie, dieciséis onzas por libra y ciento veintiocho onzas líquidas por galón). Desde el Acuerdo Internacional de 1959, constantes como $1\text{ in} = 0{,}0254\text{ m}$, $1\text{ ft} = 0{,}3048\text{ m}$, $1\text{ mi} = 1.609{,}344\text{ m}$ y $1\text{ lb} = 0{,}45359237\text{ kg}$ son definiciones legales exactas.

### 2. Transformaciones Afines de Temperatura

Las escalas Celsius ($^\circ\text{C}$), Fahrenheit ($^\circ\text{F}$) y Kelvin ($\text{K}$) parten de ceros distintos (`0 °C = 32 °F = 273,15 K`) y tienen distinta amplitud de grado (`1 °C = 1 K = 1,8 °F`). Sus ecuaciones exactas son:

$$T_{^\circ\text{F}} = \frac{9}{5}\,T_{^\circ\text{C}} + 32, \qquad T_{^\circ\text{C}} = \frac{5}{9}\,(T_{^\circ\text{F}} - 32), \qquad T_{\text{K}} = T_{^\circ\text{C}} + 273{,}15$$

Aquí $T_{^\circ\text{C}}$ indica grados Celsius, $T_{^\circ\text{F}}$ grados Fahrenheit y $T_{\text{K}}$ temperatura absoluta en kelvin (cuyo cero absoluto equivale a `−273,15 °C`). Como propiedad singular de la recta afín, Celsius y Fahrenheit se cruzan en un único valor idéntico: **−40 °C = −40 °F**.

## Ejemplo Práctico Paso a Paso: Ficha Técnica de un Compresor Importado

Supongamos que un taller recibe un equipo estadounidense con cuatro especificaciones: longitud de **54 pulgadas (`in`)**, peso de **185 libras (`lb`)**, depósito refrigerante de **6,5 galones estadounidenses (`gal`)** y temperatura máxima de **176 °F**. Convirtamos cada magnitud al sistema métrico SI:

1. **Longitud (`in` a `m` y `cm`):** con $f_{\text{in}} = 0{,}0254\text{ m}$, calculamos $54 \times 0{,}0254 = \mathbf{1{,}3716\text{ m}}$, lo que al dividir por $0{,}01\text{ m}$ equivale exactamente a **`137,16 cm`**.
2. **Masa (`lb` a `kg`):** aplicando $f_{\text{lb}} = 0{,}45359237\text{ kg}$, obtenemos $185 \times 0{,}45359237 = 83{,}914588\text{ kg}$, redondeado a **`83,91 kg`**.
3. **Volumen (`gal` EE. UU. a `L`):** con $f_{\text{gal}} = 3{,}78541\text{ L}$, multiplicamos $6{,}5 \times 3{,}78541 = 24{,}605165\text{ L}$, es decir, **`24,61 litros`**.
4. **Temperatura (`°F` a `°C` y `K`):** restamos 32 ($176 - 32 = 144$) y multiplicamos por $5/9$: $144 \times 5 / 9 = \mathbf{80{,}0\text{ }^\circ\text{C}}$ exactos. En escala absoluta sumamos `273,15`, resultando **`353,15 K`**.

## Tabla de Referencia de Factores de Equivalencia (SI ↔ Imperial)

Los coeficientes normalizados más frecuentes en ingeniería, logística y uso diario son:

| Magnitud | Origen | Destino | Regla o Factor | Ejemplo Verificado |
| :--- | :--- | :--- | :--- | :--- |
| **Longitud** | Pulgadas (`in`) | Centímetros (`cm`) | `× 2,54` (exacto) | `12 in = 30,48 cm` |
| **Longitud** | Pies (`ft`) | Metros (`m`) | `× 0,3048` (exacto) | `10 ft = 3,048 m` |
| **Longitud** | Millas (`mi`) | Kilómetros (`km`) | `× 1,609344` (exacto) | `5 mi = 8,04672 km` |
| **Masa** | Kilogramos (`kg`) | Libras (`lb`) | `÷ 0,45359237` | `70 kg = 154,32 lb` |
| **Masa** | Onzas (`oz`) | Gramos (`g`) | `× 28,349523` | `10 oz = 283,50 g` |
| **Volumen** | Galones EE. UU. (`gal`) | Litros (`L`) | `× 3,78541` | `15 gal = 56,78 L` |
| **Volumen** | Onzas líquidas (`fl oz`) | Mililitros (`mL`) | `× 29,5735` | `16 fl oz = 473,18 mL` |
| **Temperatura** | Celsius (`°C`) | Fahrenheit (`°F`) | `(°C × 9/5) + 32` | `25 °C = 77,0 °F` |

Al encadenar varias operaciones técnicas, conserva al menos seis cifras significativas en los cálculos intermedios y redondea únicamente la cifra final según la tolerancia real del instrumento de medida.

## Errores Críticos y Trampas Habituales al Convertir Unidades

* **Confundir unidades estadounidenses e imperiales británicas:** un galón imperial británico (`4,546 L`) supera en un 20,1 % al estadounidense (`3,785 L`). Asimismo, la tonelada corta de EE. UU. (`907,18 kg`) difiere tanto de la tonelada métrica (`1.000 kg`) como de la tonelada larga británica (`1.016,05 kg`).
* **Aplicar factores lineales a áreas y volúmenes:** convertir `10 m²` a pies cuadrados exige multiplicar por $3{,}28084^2 = 10{,}7639$ (`107,64 ft²`), nunca por `3,28084`. En volúmenes cúbicos el factor se eleva al cubo ($1\text{ m}^3 = 35{,}3147\text{ ft}^3$).
* **Equiparar volumen y masa sin densidad:** `8 fl oz` (`236,59 mL`) pesan `236,6 g` en agua pura, pero solo `217,7 g` en aceite de oliva (`0,92 g/mL`) y `336,0 g` en miel (`1,42 g/mL`).
* **Confundir temperaturas puntuales con saltos térmicos ($\Delta T$):** un aumento de **10 °C** equivale a **18 °F** ($10 \times 9/5$), no a `50 °F`, porque el desplazamiento de `+32` se anula al restar dos lecturas. Descuidar etiquetas dimensionales provoca fallos graves, como la pérdida en 1999 de la sonda *Mars Climate Orbiter* al mezclar libras-fuerza con newtons.
