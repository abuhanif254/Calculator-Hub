---
title: "Calculadora de Tiempo"
metaTitle: "Calculadora de Tiempo | Sumar, Restar y Diferencia Horaria"
description: "Calcula la duración exacta entre dos horas de reloj o suma y resta días, horas, minutos y segundos en sistema sexagesimal sin errores de acarreo."
metaDescription: "Calculadora de tiempo gratis en línea. Calcula la diferencia entre dos horas, cruces de medianoche y sumas o restas exactas de días, horas y minutos."
metaKeywords: "calculadora de tiempo, sumar horas y minutos, restar tiempo, diferencia entre dos horas, sistema sexagesimal, calcular tiempo transcurrido, tiempo en segundos"
faqs:
  - question: "¿Por qué no se pueden sumar horas y minutos como si fueran números decimales?"
    answer: "Porque el tiempo se rige por un sistema mixto sexagesimal (base 60 para segundos y minutos) y base 24 para horas, no por el sistema decimal base 10. Sumar 1 h 45 min más 1 h 35 min produce 3 h 20 min al acarrear 60 minutos como una hora adicional, nunca 2,80."
  - question: "¿Cómo resuelve la calculadora un intervalo que cruza la medianoche?"
    answer: "En el modo de diferencia entre dos horas, si la hora de finalización es anterior a la de inicio (por ejemplo, de 22:40 a 06:15), el algoritmo detecta automáticamente el cambio de día y suma 1.440 minutos equivalentes a 24 horas, devolviendo 7 horas y 35 minutos exactos."
  - question: "¿Qué sucede si al restar dos duraciones la segunda es mayor que la primera?"
    answer: "La calculadora convierte ambos lapsos a segundos totales, calcula la resta exacta e indica que el resultado es negativo. A continuación descompone la magnitud absoluta en días, horas, minutos y segundos para mostrar con claridad el déficit o adelanto temporal."
  - question: "¿Cómo calcular la duración real de un vuelo entre ciudades con distinto huso horario?"
    answer: "Antes de usar el modo de diferencia entre horas, convierta tanto la salida como la llegada a una referencia horaria común como el Tiempo Universal Coordinado (UTC). Restar directamente horas locales de dos husos distintos produce una duración aparente distorsionada por la diferencia horaria."
  - question: "¿Cuándo conviene usar la Calculadora de Tiempo y cuándo la Calculadora de Horas?"
    answer: "Utilice la Calculadora de Tiempo para medir lapsos entre dos relojes o sumar y restar duraciones puras en días, horas, minutos y segundos (logística, edición audiovisual, deporte o transporte). Si necesita descontar pausas laborales, convertir a horas decimales y estimar nómina, use la Calculadora de Horas."
---

La aritmética temporal choca constantemente con la intuición decimal: mientras las finanzas y el Sistema Internacional operan en base 10, los relojes utilizan un **sistema sexagesimal** (60 segundos por minuto y 60 minutos por hora) combinado con ciclos de 24 horas diarias. Sumar bloques de duración o restar horas que cruzan la medianoche a mano suele provocar errores de acarreo y préstamo.

Nuestra **Calculadora de Tiempo** resuelve ambas tareas mediante dos modos dedicados: **Diferencia de Tiempo**, que determina horas, minutos y minutos totales entre dos marcas de reloj (gestionando automáticamente el cruce de medianoche), y **Sumar o Restar Duración**, que opera con dos intervalos en días, horas, minutos y segundos.

## Ecuaciones del Cálculo Temporal Sexagesimal

Para evitar acarreos manuales propensos a fallos, el método exacto proyecta todas las magnitudes a una unidad atómica única —minutos en diferencias de reloj o segundos totales en aritmética de duraciones— y descompone el resultado por división entera y módulo.

### 1. Diferencia Entre Dos Horas de Reloj

Dadas una hora inicial $(h_1, m_1)$ y una final $(h_2, m_2)$ en formato de 24 horas, ambas se expresan en minutos desde las `00:00`:

$$M_1 = 60h_1 + m_1, \qquad M_2 = 60h_2 + m_2$$

$$\Delta M = \begin{cases} M_2 - M_1 & \text{si } M_2 \ge M_1 \\ (M_2 + 1\,440) - M_1 & \text{si } M_2 < M_1 \end{cases}, \qquad H = \left\lfloor \frac{\Delta M}{60} \right\rfloor, \qquad m = \Delta M \bmod 60$$

### 2. Suma y Resta de Duraciones en Segundos Totales

Cada duración $(d_i, h_i, m_i, s_i)$ se convierte a segundos totales $S_i$:

$$S_i = 86\,400\,d_i + 3\,600\,h_i + 60\,m_i + s_i, \qquad S_{\text{total}} = S_1 \pm S_2$$

Tomando $A = |S_{\text{total}}|$ (y conservando el signo negativo si $S_{\text{total}} < 0$), la descomposición exacta es:

$$d = \left\lfloor \frac{A}{86\,400} \right\rfloor, \quad h = \left\lfloor \frac{A \bmod 86\,400}{3\,600} \right\rfloor, \quad m = \left\lfloor \frac{A \bmod 3\,600}{60} \right\rfloor, \quad s = A \bmod 60$$

Definición de variables:

* **$h_1, m_1$ y $h_2, m_2$**: Horas (0–23) y minutos (0–59) de inicio y cierre en formato de 24 horas.
* **$1\,440$ y $86\,400$**: Minutos y segundos contenidos en un día estándar de 24 horas.
* **$d_i, h_i, m_i, s_i$**: Componentes enteras de días, horas, minutos y segundos de cada duración.
* **$\Delta M$ y $S_{\text{total}}$**: Duración unificada en minutos totales o segundos totales.
* **$\lfloor \cdot \rfloor$ y $\bmod$**: Cociente entero (función suelo) y resto de la división euclidiana.

## Ejemplos Resueltos Paso a Paso

### Ejemplo 1: Suma de Dos Tramos de Producción Audiovisual

Sumemos un primer bloque de **$1\text{ d}, 14\text{ h}, 48\text{ min}, 50\text{ s}$** y un segundo tramo de **$11\text{ h}, 36\text{ min}, 35\text{ s}$**:

1. **Conversión a segundos totales:**
   $$S_1 = 86\,400 + 50\,400 + 2\,880 + 50 = 139\,730\text{ s}, \qquad S_2 = 39\,600 + 2\,160 + 35 = 41\,795\text{ s}$$
2. **Suma unificada:** $S_{\text{total}} = 139\,730 + 41\,795 = 181\,525\text{ s}$.
3. **Descomposición modular:**
   * **Días:** $\lfloor 181\,525 / 86\,400 \rfloor = \mathbf{2\text{ días}}$ (resto: $8\,725\text{ s}$).
   * **Horas:** $\lfloor 8\,725 / 3\,600 \rfloor = \mathbf{2\text{ horas}}$ (resto: $1\,525\text{ s}$).
   * **Minutos y segundos:** $\lfloor 1\,525 / 60 \rfloor = \mathbf{25\text{ minutos}}$ y resto $\mathbf{25\text{ segundos}}$.

Total exacto: **$2\text{ días}, 2\text{ horas}, 25\text{ minutos y } 25\text{ segundos}$**.

### Ejemplo 2: Intervalo Nocturno Cruzando la Medianoche

Un mantenimiento técnico comienza a las `22:40` y concluye a las `06:15` del día siguiente:

1. **Minutos desde `00:00`:** $M_1 = 22 \times 60 + 40 = 1\,360\text{ min}$ y $M_2 = 6 \times 60 + 15 = 375\text{ min}$.
2. **Ajuste por cruce de medianoche ($M_2 < M_1$):** $\Delta M = (375 + 1\,440) - 1\,360 = \mathbf{455\text{ minutos totales}}$.
3. **Resultado horario:** $H = \lfloor 455 / 60 \rfloor = \mathbf{7\text{ horas}}$ y $m = 455 \bmod 60 = \mathbf{35\text{ minutos}}$ (`07:35`).

## Tabla de Equivalencias de Unidades Temporales

| Unidad | Segundos | Minutos | Horas | Días | Uso Frecuente |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1 minuto** | 60 | 1 | 0,0167 | 0,000694 | Ritmos deportivos y pausas breves |
| **15 minutos** | 900 | 15 | 0,25 | 0,0104 | Bloques de facturación y citas |
| **1 hora** | 3.600 | 60 | 1 | 0,0417 | Turnos, clases y tarifas horarias |
| **1 día solar** | 86.400 | 1.440 | 24 | 1 | Logística, guardias y transporte |
| **1 semana** | 604.800 | 10.080 | 168 | 7 | Jornadas semanales y planificación |
| **1 mes (30 d)** | 2.592.000 | 43.200 | 720 | 30 | Contratos y métricas comerciales |

*Referencia: un año civil común suma $365$ días ($8\,760\text{ h}$) y uno bisiesto $366$ días ($8\,784\text{ h}$).*

## Trampas Habituales y Cómo Evitarlas

* **Tratar `HH:MM` como decimal:** `2 h 45 min` equivale a $2,75\text{ h}$, jamás a $2,45\text{ h}$. Usar directamente el formato reloj en fórmulas de presupuestos o velocidad media distorsiona la fracción horaria hasta un $40\,\%$.
* **Ignorar husos horarios y horario de verano:** En vuelos internacionales (por ejemplo, Madrid–Bogotá o Ciudad de México–Buenos Aires), normalice salida y llegada a UTC antes de restar. En las madrugadas de cambio de hora oficial, el día civil tiene $23$ o $25$ horas reales en lugar de $24$.
* **Confundir `12:00 a. m.` con `12:00 p. m.`:** Invertir medianoche (`00:00`) y mediodía (`12:00`) es una causa frecuente de fallos en cronogramas; utilice siempre el reloj de 24 horas (`00:00`–`23:59`).
* **Lapsos mayores de 24 horas en modo reloj:** La diferencia entre dos horas asume un ciclo continuo inferior a un día. Si un proceso dura desde las `08:00` del lunes hasta las `10:00` del martes ($26\text{ h}$), añada los días completos en el modo de duraciones.
