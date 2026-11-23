---
title: "Calculadora de Ritmo de Carrera"
metaTitle: "Calculadora de Ritmo | Tiempo, Distancia y Velocidad"
description: "Calcule su ritmo de carrera por kilómetro o milla, el tiempo final previsto o la distancia recorrida. Ideal para planificar entrenamientos de 5K, 10K, media maratón y maratón."
metaDescription: "Calcule su ritmo de carrera por kilómetro, velocidad en km/h y tiempos de paso para 5K, 10K, media maratón y maratón con precisión matemática al instante."
metaKeywords: "calculadora de ritmo, ritmo de carrera, tiempo final maratón, ritmo por kilómetro, calculadora de distancia, ritmo 5k, ritmo 10k, media maratón"
faqs:
  - question: "¿Cómo se convierte el ritmo en minutos por kilómetro a velocidad en km/h?"
    answer: "Para convertir un ritmo a velocidad en kilómetros por hora, divida 60 entre el ritmo expresado en minutos decimales, o divida 3600 entre el total de segundos por kilómetro. Por ejemplo, un ritmo de 5:00 min/km equivale a 300 segundos por kilómetro; al dividir 3600 entre 300 se obtiene una velocidad exacta de 12 km/h."
  - question: "¿Por qué mi reloj GPS marca más distancia que el circuito oficial de una carrera?"
    answer: "Los circuitos homologados por federaciones de atletismo se miden siguiendo la trazada más corta posible a 30 centímetros del bordillo. En competición, al adelantar a otros corredores, tomar curvas abiertas y sufrir pequeñas oscilaciones de la señal satelital entre edificios, es habitual recorrer entre un 1 % y un 2 % más de distancia real."
  - question: "¿Qué diferencia hay entre 4.5 minutos por kilómetro y 4:50 min/km?"
    answer: "Existe una diferencia de 20 segundos por kilómetro debido al sistema sexagesimal. Un valor decimal de 4.5 minutos representa 4 minutos más la mitad de un minuto (0.5 × 60 = 30 segundos), es decir, 4:30 min/km. En cambio, 4:50 min/km equivale en notación decimal a 4.833 minutos por kilómetro."
  - question: "¿Qué ritmo necesito mantener para bajar de 4 horas en un maratón?"
    answer: "Para completar los 42.195 kilómetros oficiales de un maratón en menos de 4 horas (240 minutos), debe sostener un ritmo medio oficial de 5:41 min/km o más rápido. Si desea compensar el margen extra que suele registrar el GPS, conviene entrenar para sostener un ritmo de 5:37 a 5:38 min/km."
  - question: "¿Es recomendable correr toda la prueba exactamente al mismo ritmo?"
    answer: "En carreras de fondo sobre asfalto sin grandes desniveles, mantener parciales constantes o aplicar una estrategia de segunda mitad ligeramente más rápida (empezando entre 3 y 5 segundos por kilómetro más suave en los primeros kilómetros) retrasa la acumulación de lactato y evita el agotamiento prematuro de las reservas de glucógeno muscular."
---

Planificar un entrenamiento en pista o diseñar la estrategia de tiempos de paso para una prueba de fondo exige dominar la relación matemática entre tres magnitudes fundamentales: **tiempo**, **distancia** y **ritmo de carrera**. En el atletismo de resistencia, la métrica estándar es el ritmo específico: el tiempo invertido en recorrer cada unidad de distancia, expresado habitualmente en minutos y segundos por kilómetro ($\text{min/km}$) o por milla ($\text{min/mi}$).

Esta herramienta resuelve instantáneamente cualquiera de las tres variables cuando se conocen las otras dos, eliminando los errores habituales al operar manualmente entre el sistema decimal de las distancias métricas y la base sexagesimal (base 60) del tiempo.

## Fórmulas matemáticas de ritmo, velocidad y proyección en carrera

Para evitar distorsiones al dividir minutos y segundos, todo cálculo riguroso convierte primero el tiempo cronometrado a segundos totales antes de relacionarlo con la distancia.

### 1. Normalización del tiempo y cálculo del ritmo medio

Dado un tiempo compuesto por horas ($H$), minutos ($M$) y segundos ($S$), el tiempo total en segundos ($T_{\text{seg}}$) y el ritmo en segundos por kilómetro ($R_{\text{seg/km}}$) se definen como:

$$T_{\text{seg}} = 3600H + 60M + S, \quad R_{\text{seg/km}} = \frac{T_{\text{seg}}}{D_{\text{km}}}$$

donde $D_{\text{km}}$ es la distancia total en kilómetros. Para expresar el ritmo en formato de cronómetro (`mm:ss / km`), se extrae la parte entera de la división entre 60 para los minutos ($M_{\text{ritmo}}$) y el residuo para los segundos ($S_{\text{ritmo}}$):

$$M_{\text{ritmo}} = \lfloor R_{\text{seg/km}} / 60 \rfloor, \quad S_{\text{ritmo}} = R_{\text{seg/km}} - 60M_{\text{ritmo}}$$

### 2. Conversión entre ritmo ($\text{min/km}$) y velocidad ($\text{km/h}$)

La velocidad media ($V_{\text{km/h}}$) y el ritmo son magnitudes inversamente proporcionales. Dado que una hora contiene $3600\text{ segundos}$, la conversión directa y la equivalencia al sistema anglosajón ($1\text{ milla} = 1.609344\text{ km}$) responden a:

$$V_{\text{km/h}} = \frac{3600}{R_{\text{seg/km}}}, \quad R_{\text{seg/milla}} = 1.609344 \times R_{\text{seg/km}}$$

### 3. Proyección fisiológica entre distancias (Fórmula de Riegel)

Para estimar el tiempo potencial ($T_2$) en una distancia superior ($D_2$) a partir de una marca reciente ($T_1$) en una distancia menor ($D_1$), el modelo empírico de Peter Riegel incorpora un exponente de decaimiento por fatiga neuromuscular de $1.06$:

$$T_2 = T_1 \times (D_2 / D_1)^{1.06}$$

## Ejemplo práctico paso a paso: análisis de media maratón y proyección

Supongamos que una corredora completa una **media maratón oficial** ($D_{\text{km}} = 21.0975\text{ km}$) con un tiempo neto en meta de **1 hora, 42 minutos y 18 segundos** ($01:42:18$).

1. **Conversión del tiempo total a segundos:**
   $$T_{\text{seg}} = (3600 \times 1) + (60 \times 42) + 18 = 6138\text{ s}$$
2. **Cálculo del ritmo en segundos por kilómetro:**
   $$R_{\text{seg/km}} = \frac{6138}{21.0975} \approx 290.935\text{ s/km}$$
3. **Traducción a minutos y segundos por kilómetro:**
   Al dividir $290.935$ entre $60$, el cociente entero es $4\text{ minutos}$ ($240\text{ s}$) y el resto es $50.935\text{ s}$. Su ritmo medio oficial fue de **$4:51\text{ min/km}$**.
4. **Velocidad media y ritmo por milla:**
   $$V_{\text{km/h}} = \frac{3600}{290.935} \approx 12.37\text{ km/h}, \quad R_{\text{seg/milla}} = 290.935 \times 1.609344 \approx 468.21\text{ s/mi } (7:48\text{ min/mi})$$
5. **Proyección a maratón ($42.195\text{ km}$) con ajuste por fatiga:**
   Como el maratón duplica la distancia ($D_2 / D_1 = 2$), aplicamos el factor $2^{1.06} \approx 2.08493$:
   $$T_2 = 6138 \times 2.08493 \approx 12797.3\text{ s} \rightarrow 3\text{ h } 33\text{ min } 17\text{ s}$$
   Esto equivale a un ritmo objetivo sostenible de **$5:03\text{ min/km}$** ($12\text{ s/km}$ más suave que en media maratón).

## Tabla de referencia de ritmos, velocidades y tiempos finales

La siguiente tabla muestra la equivalencia entre ritmo métrico, ritmo por milla, velocidad horaria y el tiempo final exacto en las cuatro distancias oficiales de ruta homologadas por World Athletics.

| Ritmo ($\text{min/km}$) | Ritmo ($\text{min/mi}$) | Velocidad ($\text{km/h}$) | 5K ($5\text{ km}$) | 10K ($10\text{ km}$) | Media Maratón | Maratón ($42.195\text{ km}$) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **3:30** | 5:38 | 17.14 | 0:17:30 | 0:35:00 | 1:13:50 | 2:27:41 |
| **4:00** | 6:26 | 15.00 | 0:20:00 | 0:40:00 | 1:24:23 | 2:48:47 |
| **4:30** | 7:15 | 13.33 | 0:22:30 | 0:45:00 | 1:34:56 | 3:09:53 |
| **5:00** | 8:03 | 12.00 | 0:25:00 | 0:50:00 | 1:45:29 | 3:30:59 |
| **5:30** | 8:51 | 10.91 | 0:27:30 | 0:55:00 | 1:56:02 | 3:52:04 |
| **6:00** | 9:39 | 10.00 | 0:30:00 | 1:00:00 | 2:06:35 | 4:13:10 |
| **6:30** | 10:28 | 9.23 | 0:32:30 | 1:05:00 | 2:17:08 | 4:34:16 |

## Zonas de entrenamiento según su ritmo de competición

Conocer su ritmo actual en una prueba de $10\text{ km}$ permite estructurar las sesiones semanales con precisión fisiológica:

* **Rodaje regenerativo ($60\text{ s}$ a $90\text{ s/km}$ más lento que su ritmo de 10K):** Favorece la capilarización muscular y la recuperación activa con bajo impacto articular.
* **Ritmo aeróbico extensivo o de maratón ($25\text{ s}$ a $40\text{ s/km}$ más lento que el ritmo de 10K):** Optimiza la oxidación de grasas y la economía de carrera.
* **Umbral anaeróbico o de lactato (ritmo sostenible durante $60\text{ minutos}$, cercano al de media maratón):** Bloques continuos de $15$ a $30\text{ minutos}$ para retrasar la acumulación exponencial de lactato en sangre.
* **Potencia aeróbica o $\text{VO}_2\text{ máx}$ (ritmo de $3\text{ km}$ a $5\text{ km}$):** Intervalos de $400\text{ m}$ a $1200\text{ m}$ que elevan la capacidad cardiovascular máxima.

## Errores frecuentes y consejos prácticos en competición

* **Confusión con minutos decimales:** Dividir $45\text{ minutos}$ entre $10\text{ km}$ arroja $4.5\text{ minutos}$. Muchos corredores lo leen erróneamente como $4\text{ min } 50\text{ s}$, cuando la fracción decimal $.5$ equivale a medio minuto ($30\text{ segundos}$), es decir, $4:30\text{ min/km}$.
* **Desfase entre la distancia homologada y el GPS:** En maratones urbanos, los giros abiertos y adelantamientos hacen que el reloj GPS registre entre $42.5\text{ km}$ y $42.7\text{ km}$. Si corre a $5:00\text{ min/km}$ según su reloj durante $42.6\text{ km}$, cruzará la meta en $3\text{ h } 33\text{ min}$ en lugar de $3\text{ h } 30\text{ min } 59\text{ s}$. Verifique siempre sus parciales con los carteles kilométricos físicos del circuito.
* **Ajuste por pendiente y calor:** Cada $1\text{ \%}$ de pendiente positiva añade entre $12$ y $15\text{ s/km}$ al coste energético en llano, y competir por encima de $18\text{ }^\circ\text{C}$ reduce el rendimiento entre un $1.5\text{ \%}$ y un $3\text{ \%}$ por cada $5\text{ }^\circ\text{C}$ adicionales.
