---
title: "Cómo Calcular el Ritmo de Carrera: Las Matemáticas de su Maratón"
description: "Guía técnica para calcular el ritmo de carrera, convertir entre minutos por kilómetro y por milla, proyectar tiempos con la fórmula de Riegel y planificar parciales de maratón."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "pace-calculator"
faqs:
  - question: "¿Por qué 4.75 minutos por kilómetro equivale a 4:45 y no a 4:75?"
    answer: "Porque el resultado de dividir minutos entre distancia se expresa en sistema decimal, mientras que los cronómetros operan en sistema sexagesimal de 60 segundos por minuto. La parte decimal debe multiplicarse por 60 para obtener los segundos reales: 0.75 × 60 = 45 segundos."
  - question: "¿Cómo se convierte un ritmo de minutos por kilómetro a minutos por milla?"
    answer: "Dado que una milla internacional equivale exactamente a 1.60934 kilómetros, debe multiplicar el ritmo en minutos decimales por kilómetro por 1.60934. Por ejemplo, un ritmo de 5:00 min/km corresponde a 5.0 × 1.60934 = 8.0467 minutos por milla, es decir, 8:03 min/milla."
  - question: "¿Sirve multiplicar linealmente mi tiempo de 10 km por 4.22 para predecir mi maratón?"
    answer: "No. El ritmo sostenible decae conforme aumenta la distancia debido a la fatiga neuromuscular, el agotamiento progresivo del glucógeno y la deriva cardiovascular. La fórmula empírica de Pete Riegel incorpora un exponente de fatiga de 1.06 para evitar proyecciones excesivamente optimistas."
  - question: "¿Qué diferencia existe entre parciales positivos, uniformes y negativos en un maratón?"
    answer: "Los parciales uniformes mantienen el mismo ritmo en la primera y la segunda mitad; los parciales negativos corren la segunda mitad ligeramente más rápido que la primera; y los parciales positivos implican una desaceleración en la segunda mitad, habitualmente causada por salir demasiado rápido."
  - question: "¿Por qué el reloj GPS suele marcar más distancia que la medición oficial de un maratón?"
    answer: "Los circuitos homologados se miden por la línea tangente más corta posible, mientras que el corredor realiza zigzags al adelantar o abrirse en las curvas. Además, los edificios altos y las arboledas generan rebotes de señal que suelen añadir entre un 0.5 % y un 1.5 % de distancia en el reloj."
---

El ritmo de carrera expresa el tiempo necesario para recorrer una unidad de distancia, normalmente en minutos por kilómetro (`min/km`) o minutos por milla (`min/milla`). Se calcula dividiendo el tiempo total invertido (en minutos decimales) entre la distancia completada, convirtiendo después la fracción decimal restante en segundos sexagesimales al multiplicarla por 60.

Planificar una prueba de fondo —desde un 5K hasta un maratón de 42.195 km— exige dominar las conversiones entre ritmo y velocidad, estimar el desgaste fisiológico con la distancia y diseñar parciales realistas. Para automatizar estos cálculos al instante sin errores decimales, utilice nuestra [Calculadora de Ritmo](/es/calculadoras/calculadora-de-ritmo).

## Fundamentos matemáticos y conversión sexagesimal

A diferencia de la velocidad (`km/h`), que mide la distancia recorrida por hora, el ritmo invierte la relación para indicar cuántos minutos requiere cada kilómetro. En el atletismo de ruta y pista, esta métrica resulta más práctica porque permite contrastar cada punto kilométrico con un tiempo de paso fijo.

```text
Ritmo (min/km) = Tiempo total en minutos decimales ÷ Distancia (km)
Tiempo total (min) = Ritmo en minutos decimales × Distancia (km)
Distancia (km) = Tiempo total en minutos decimales ÷ Ritmo en minutos decimales
Velocidad media (km/h) = 60 ÷ Ritmo en minutos decimales
```

### De minutos decimales a formato reloj y cambio de unidades

El error más frecuente al calcular manualmente consiste en confundir centésimas de minuto con segundos. Como cada minuto contiene 60 segundos, ninguna fracción decimal puede trasladarse directamente detrás de los dos puntos:

- **De reloj (`mm:ss`) a decimal:** ``Minutos decimales = Minutos + (Segundos ÷ 60)``.
- **De decimal a reloj (`mm:ss`):** ``Segundos = Parte decimal × 60``.
- **De `min/km` a `min/milla`:** ``Ritmo (min/milla) = Ritmo (min/km) × 1.60934``.

### Proyección entre distancias con la fórmula de Riegel

Para estimar una marca en maratón a partir de una carrera más corta, la extrapolación lineal falla porque ignora el costo metabólico acumulado. La ecuación empírica de Pete Riegel modela esa caída de rendimiento:

```text
T2 = T1 × (D2 ÷ D1)^1.06
```

Aquí, `T1` es el tiempo conocido en minutos para la distancia `D1`, y `T2` es el tiempo proyectado para `D2`. El exponente `1.06` refleja que, al duplicar la distancia, el ritmo sostenible empeora cerca de un 4.2 %, siempre que exista entrenamiento específico previo.

## Cálculo paso a paso: del 10K al maratón

Suponga que completa una prueba homologada de **10 km en 47 minutos y 30 segundos** (`47:30`) y desea conocer su ritmo en ambos sistemas, su velocidad media y su tiempo proyectado en maratón (`42.195 km`):

1. **Convertir a minutos decimales:** `47 + (30 ÷ 60) = 47.50 minutos`.
2. **Calcular el ritmo en `min/km`:** `47.50 ÷ 10 = 4.75 min/km`.
3. **Transformar la fracción decimal:** `0.75 × 60 = 45 segundos` → **4:45 min/km**.
4. **Obtener la velocidad media:** `60 ÷ 4.75 = 12.63 km/h`.
5. **Convertir a `min/milla`:** `4.75 × 1.60934 = 7.6444 min/milla`; al multiplicar `0.6444 × 60 = 38.66`, resulta **7:39 min/milla**.
6. **Proyectar el maratón con Riegel:** Divida `42.195 ÷ 10 = 4.2195` y elévelo a `1.06` (`4.6002`). Multiplique `47.50 × 4.6002 = 218.51 minutos`, es decir, **3 horas, 38 minutos y 31 segundos** (ritmo objetivo de **5:11 min/km**).

Multiplicar linealmente `47.50 × 4.2195` habría arrojado `3:20:26`, una meta inviable que conduciría a una caída drástica del ritmo antes del kilómetro 32.

## Tabla de tiempos de paso por distancia y ritmo

La siguiente matriz resume los tiempos finales exactos para las distancias más habituales según cuatro ritmos de referencia:

| Distancia | 4:30 min/km | 5:00 min/km | 5:30 min/km | 6:00 min/km |
| :--- | :---: | :---: | :---: | :---: |
| 5 kilómetros | 22:30 | 25:00 | 27:30 | 30:00 |
| 10 kilómetros | 45:00 | 50:00 | 55:00 | 1:00:00 |
| 15 kilómetros | 1:07:30 | 1:15:00 | 1:22:30 | 1:30:00 |
| Media Maratón (21.0975 km) | 1:34:56 | 1:45:29 | 1:56:02 | 2:06:35 |
| Maratón (42.195 km) | 3:09:53 | 3:30:59 | 3:52:04 | 4:13:10 |
| Ultramaratón (50 km) | 3:45:00 | 4:10:00 | 4:35:00 | 5:00:00 |

## Aplicaciones prácticas y errores habituales en competición

Dominar el ritmo permite prescribir zonas de entrenamiento —rodajes aeróbicos, umbral de lactato o series— y ejecutar una estrategia resistente a la fatiga. Evite estos cuatro errores habituales:

- **Fiarse solo de la distancia del reloj GPS:** Los circuitos oficiales se miden por la trayectoria tangente mínima. Entre adelantamientos, curvas abiertas y rebotes de señal urbana, un reloj suele marcar entre `42.5` y `42.8 km` en meta. Controle sus parciales con el cronómetro real frente a los carteles kilométricos oficiales.
- **Ignorar desnivel, viento y calor:** Las cuestas prolongadas o temperaturas superiores a 20 °C elevan la frecuencia cardíaca para un mismo ritmo plano; ajuste su objetivo entre 5 y 15 segundos por kilómetro para no agotar el glucógeno antes de tiempo.
- **Salir en «banco de tiempo»:** Ganar segundos de margen en los primeros 15 km por euforia suele pagarse con minutos perdidos tras el kilómetro 32. Las estrategias de **parciales uniformes o ligeramente negativos** producen mejores marcas y menor riesgo de calambres.
- **Aplicar Riegel sin volumen específico:** La fórmula exige preparación aeróbica acorde; un corredor veloz en 5 km con menos de 35 km semanales sufrirá un deterioro superior al exponente `1.06` en distancias largas.

Introduzca sus registros recientes en la [Calculadora de Ritmo](/es/calculadoras/calculadora-de-ritmo) y ajuste su plan de carrera según la altimetría y el clima previstos.
