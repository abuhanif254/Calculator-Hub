---
title: "Calculadora de Horas"
metaTitle: "Calculadora de Horas Trabajadas | Decimales y Nómina"
description: "Calcula horas trabajadas exactas restando descansos, controla turnos nocturnos y convierte minutos a horas decimales para facturación y cálculo salarial."
metaDescription: "Calculadora de horas de trabajo gratis. Ingresa entrada, salida, descanso y tarifa por hora para obtener horas netas, formato decimal y salario bruto."
metaKeywords: "calculadora de horas, horas trabajadas, horas decimales, hoja de tiempo, calcular salario por hora, deducción de descansos, turno nocturno, nómina"
faqs:
  - question: "¿Por qué debo usar horas decimales y no el formato HH:MM para calcular una nómina?"
    answer: "Porque los salarios por hora, las facturas profesionales y los programas de nómina operan en base decimal, mientras que el reloj usa base 60. Multiplicar 20 €/h por 7,45 en vez de 7,75 para una jornada de 7 h 45 min genera una pérdida de 6 € en un solo día."
  - question: "¿Cómo descuenta la calculadora el tiempo de comida o descanso no remunerado?"
    answer: "Los minutos indicados en el campo de descanso se restan directamente del tiempo bruto entre la hora de entrada y la de salida. A partir de ese tiempo neto se muestran simultáneamente las horas y minutos reales, las horas decimales y el salario bruto estimado."
  - question: "¿Calcula correctamente los turnos nocturnos que terminan al día siguiente?"
    answer: "Sí. Cuando la hora de salida es anterior a la hora de entrada (por ejemplo, entrada a las 22:15 y salida a las 06:45), la herramienta añade 1.440 minutos de forma automática para cruzar la medianoche sin arrojar valores negativos ni requerir fechas."
  - question: "¿Qué precisión se usa cuando los minutos generan un decimal periódico como 20 o 40 minutos?"
    answer: "Fracciones como 20/60 (0,3333...) o 40/60 (0,6666...) son decimales periódicos. La calculadora conserva cuatro cifras decimales internamente al multiplicar por la tarifa horaria y redondea el salario bruto final a dos decimales, evitando desfases innecesarios."
  - question: "¿Incluye esta herramienta el recargo por horas extraordinarias o las retenciones fiscales?"
    answer: "La calculadora determina el salario bruto aplicando una tarifa horaria uniforme al turno neto. Si su convenio colectivo o legislación laboral establece recargos por horas extra, nocturnidad o festivos, calcule esos bloques por separado con su tarifa incrementada; el importe final es bruto antes de cotizaciones e impuestos."
---

En el control horario y la elaboración de nóminas aparece cada semana un mismo obstáculo matemático: los fichajes registran el tiempo en base 60 (horas y minutos), mientras que los salarios por hora, las facturas de trabajadores autónomos y los sistemas contables operan en base 10. Convertir mal los minutos provoca infracobros silenciosos o desviaciones en el coste laboral.

Nuestra **Calculadora de Horas** enlaza ambos formatos al instante. Introduzca hora de entrada, hora de salida, minutos de descanso no remunerado y, opcionalmente, su tarifa horaria en euros (€) o dólares (USD). El motor detecta automáticamente turnos nocturnos que cruzan la medianoche y devuelve el tiempo efectivo en formato reloj (`HH:MM`), en **horas decimales** y en **salario bruto estimado**.

## Ecuaciones del Control Horario y la Conversión Decimal

El cálculo de la jornada laboral parte de convertir entrada y salida a minutos desde las `00:00`, deducir la pausa no retribuida y transformar los minutos netos en fracción decimal de hora.

### 1. Duración Bruta y Tiempo Neto del Turno

Con $M_{\text{ent}} = 60h_{\text{ent}} + m_{\text{ent}}$ y $M_{\text{sal}} = 60h_{\text{sal}} + m_{\text{sal}}$ en formato de 24 horas:

$$M_{\text{bruto}} = \begin{cases} M_{\text{sal}} - M_{\text{ent}} & \text{si } M_{\text{sal}} \ge M_{\text{ent}} \\ (M_{\text{sal}} + 1\,440) - M_{\text{ent}} & \text{si } M_{\text{sal}} < M_{\text{ent}} \end{cases}, \qquad M_{\text{neto}} = M_{\text{bruto}} - M_{\text{desc}}$$

Siempre con la condición lógica $0 \le M_{\text{desc}} < M_{\text{bruto}}$.

### 2. Formato Reloj, Horas Decimales y Salario Bruto

$$H_{\text{neto}} = \left\lfloor \frac{M_{\text{neto}}}{60} \right\rfloor, \qquad m_{\text{neto}} = M_{\text{neto}} \bmod 60$$

$$H_{\text{dec}} = \frac{M_{\text{neto}}}{60} = H_{\text{neto}} + \frac{m_{\text{neto}}}{60}, \qquad S_{\text{bruto}} = H_{\text{dec}} \times T_h$$

Definición de variables:

* **$M_{\text{ent}}, M_{\text{sal}}$**: Minutos desde medianoche hasta el fichaje de entrada y salida.
* **$M_{\text{bruto}}, M_{\text{desc}}, M_{\text{neto}}$**: Duración total, descanso no remunerado deducido y minutos efectivos trabajados.
* **$H_{\text{neto}}, m_{\text{neto}}$**: Horas enteras y minutos sobrantes del turno neto.
* **$H_{\text{dec}}$**: Equivalente decimal de la jornada ($7,75\text{ h}$ en vez de `7:45`).
* **$T_h$ y $S_{\text{bruto}}$**: Tarifa bruta pactada (€/h o USD/h) y remuneración bruta del turno.

## Ejemplo Resuelto Paso a Paso: Turno Nocturno Con Descanso

Analicemos una guardia nocturna con entrada a las `22:15`, salida a las `06:45`, descanso no remunerado de `45` minutos y tarifa de **$18,50\text{ €/h}$**:

1. **Minutos desde `00:00`:** $M_{\text{ent}} = 22 \times 60 + 15 = 1\,335\text{ min}$ y $M_{\text{sal}} = 6 \times 60 + 45 = 405\text{ min}$.
2. **Duración bruta cruzando medianoche ($405 < 1\,335$):**
   $$M_{\text{bruto}} = (405 + 1\,440) - 1\,335 = 510\text{ min} \quad (8\text{ h } 30\text{ min})$$
3. **Tiempo neto tras deducir el descanso:**
   $$M_{\text{neto}} = 510 - 45 = 465\text{ min} \implies \mathbf{7\text{ h } 45\text{ min}}$$
4. **Horas decimales y salario bruto:**
   $$H_{\text{dec}} = \frac{465}{60} = \mathbf{7,75\text{ h}}, \qquad S_{\text{bruto}} = 7,75 \times 18,50\text{ €} = 143,375\text{ €} \approx \mathbf{143,38\text{ €}}$$

**Coste del error decimal:** Multiplicar por `7,45` en vez de `7,75` arroja $137,83\text{ €}$, una pérdida de **$5,55\text{ €}$ por turno** que en $20$ jornadas mensuales suma **$111,00\text{ €}$** no cobrados.

## Tabla de Conversión Rápida: Minutos a Horas Decimales

Consulte esta equivalencia para auditar hojas de tiempo, presupuestos por horas y liquidaciones salariales sin desviaciones:

| Minutos | Fracción | Decimal (4 cifras) | Decimal (2 cifras) | Uso Habitual |
| :--- | :--- | :--- | :--- | :--- |
| **5 min** | 1/12 | 0,0833 | 0,08 | Microtarea o soporte técnico |
| **6 min** | 1/10 | 0,1000 | 0,10 | Décima exacta (despachos y consultoría) |
| **10 min** | 1/6 | 0,1667 | 0,17 | Pausa breve o registro de llamadas |
| **12 min** | 1/5 | 0,2000 | 0,20 | Dos décimas de hora exactas |
| **15 min** | 1/4 | 0,2500 | 0,25 | Cuarto de hora (estándar en partes) |
| **20 min** | 1/3 | 0,3333 | 0,33 | Tercio de hora (periódico) |
| **30 min** | 1/2 | 0,5000 | 0,50 | Media hora exacta (comida típica) |
| **40 min** | 2/3 | 0,6667 | 0,67 | Dos tercios de hora (periódico) |
| **45 min** | 3/4 | 0,7500 | 0,75 | Tres cuartos de hora exactos |
| **50 min** | 5/6 | 0,8333 | 0,83 | Sesión profesional o clase |
| **55 min** | 11/12 | 0,9167 | 0,92 | Mayor desfase frente a `0,55` ($-0,37\text{ h}$) |
| **60 min** | 1/1 | 1,0000 | 1,00 | Hora completa |

## Errores Frecuentes en Hojas de Tiempo y Nómina

* **Multiplicar por el formato reloj:** El desfase alcanza su máximo en los $55$ minutos (`0,55` frente a `0,92 h`), donde se pierde más de un tercio de hora facturable. Use siempre horas decimales antes de aplicar la tarifa.
* **Descontar pausas retribuidas por error:** En España, el artículo 34.4 del Estatuto de los Trabajadores fija una pausa mínima de 15 minutos en jornadas continuadas superiores a 6 horas, cuya consideración como tiempo efectivo depende del convenio colectivo; en México, Colombia o Chile la pausa de comida suele descontarse. Revise su contrato antes de restarla.
* **Aceptar redondeos de fichaje sin auditoría:** Muchas empresas redondean en bloques de 15 minutos (regla de los 7 minutos: hacia abajo hasta el minuto 7 y hacia arriba desde el 8) o de 6 minutos ($0,10\text{ h}$). Compare sus horas exactas con el resumen mensual para verificar que el redondeo sea simétrico.
* **Subestimar microintervenciones como profesional independiente:** Consultas rápidas de 10 o 15 minutos sin registrar acumulan varias horas gratuitas al cierre del mes; convierta cada bloque a decimal o fije tramos mínimos facturables de cuarto de hora ($0,25\text{ h}$) por contrato.
* **Mezclar tarifa ordinaria con recargos:** Si un turno incluye horas extraordinarias, nocturnidad o trabajo festivo (con recargos habituales de $+25\,\%$ a $+50\,\%$ según legislación o convenio), calcule cada tramo por separado. Recuerde además que el resultado corresponde a **salario bruto**, antes de cotizaciones sociales y retenciones fiscales (IRPF o impuesto sobre la renta).
