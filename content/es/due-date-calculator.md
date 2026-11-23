---
title: "Calculadora de Fecha de Parto"
metaTitle: "Calculadora de Fecha de Parto | FPP y Signo Zodiacal"
description: "Calcule su fecha probable de parto (FPP) utilizando la fecha de su última regla (FUR), fecha de concepción o transferencia de fecundación in vitro (FIV)."
metaDescription: "Calculadora de fecha de parto gratuita. Determine con precisión su fecha probable de parto (FPP), semanas de gestación, hitos por trimestre y concepción."
metaKeywords: "calculadora de fecha de parto, fpp, cuando nacera mi bebe, calcular fecha de nacimiento, regla de naegele, calculadora de embarazo, semanas de gestacion"
faqs:
  - question: "¿Por qué se cuentan 40 semanas de embarazo si la concepción ocurre dos semanas después de la regla?"
    answer: "En obstetricia la edad gestacional se mide desde el primer día de la Fecha de Última Regla (FUR) porque es un dato clínico objetivo que la mayoría de las mujeres conoce con exactitud, mientras que la ovulación suele pasar inadvertida. Por ello, durante las dos primeras semanas técnicas de gestación el óvulo aún no ha sido fecundado y la edad real del embrión equivale a 38 semanas (266 días)."
  - question: "¿Qué porcentaje de bebés nace exactamente en su Fecha Probable de Parto?"
    answer: "Las estadísticas perinatales demuestran que solo entre el 4 % y el 5 % de los nacimientos espontáneos ocurren en el día exacto de la FPP. Sin embargo, cerca del 80 % de los partos a término se producen dentro de un margen de dos semanas antes o después de esa fecha estimada (entre las semanas 38 y 42)."
  - question: "¿Cómo afecta un ciclo menstrual irregular o largo al cálculo de la FPP?"
    answer: "Si su ciclo dura más de 28 días, la ovulación ocurre más tarde del día 14, porque la fase lútea (postovulatoria) permanece estable en unos 14 días mientras que la fase folicular se alarga. Por cada día que su ciclo habitual supere los 28 días, la calculadora añade un día adicional a la Fecha Probable de Parto."
  - question: "¿Cómo se calcula la fecha de parto en un embarazo por Fecundación In Vitro (FIV)?"
    answer: "En los tratamientos de reproducción asistida no se utiliza la fecha de la última menstruación, sino la fecha exacta de la transferencia embrionaria. A partir del día de transferencia se suman 263 días si se transfirió un embrión de día 3, o 261 días si se transfirió un blastocisto de día 5."
  - question: "¿Puede el ginecólogo cambiar mi fecha probable de parto tras la primera ecografía?"
    answer: "Sí. Si la medición de la Longitud Cráneo-Caudal (LCC) del feto en la ecografía del primer trimestre (entre las semanas 8 y 13+6) difiere en más de 5 a 7 días respecto a la fecha estimada por su última regla, el obstetra ajustará oficialmente la FPP a la biometría ecográfica por ser más precisa."
---

La **Calculadora de Fecha de Parto** es un instrumento de datación obstétrica que permite estimar con rigor clínico la **Fecha Probable de Parto (FPP)**, la edad gestacional actual en semanas y días, y el cronograma completo de los tres trimestres del embarazo. Además de proyectar el calendario médico perinatal, la herramienta identifica detalles complementarios asociados al día estimado del nacimiento, como la estación del año, el signo zodiacal y la piedra natal.

En la práctica ginecológica internacional es fundamental distinguir entre dos escalas temporales que suelen confundirse: la **edad gestacional** (o edad menstrual), que abarca **$280\text{ días}$ ($40\text{ semanas}$)** contados a partir del primer día del último sangrado menstrual, y la **edad embrionaria o concepcional**, que comprende **$266\text{ días}$ ($38\text{ semanas}$)** medidos desde el momento biológico de la fecundación del óvulo.

## Fórmulas obstétricas para calcular la Fecha Probable de Parto (FPP)

Nuestra calculadora adapta su ecuación matemática en función del dato clínico de origen disponible:

### 1. Método de la Fecha de Última Regla (FUR) y Regla de Naegele ajustada

Cuando la estimación parte del primer día de la última menstruación, la datación moderna añade exactamente $280\text{ días}$ sobre el calendario gregoriano y aplica una corrección según la duración media del ciclo menstrual de la paciente ($L_c$):

$$FPP = FUR + 280\text{ días} + (L_c - 28)\text{ días}$$

En la consulta tradicional sin soporte digital, la **Regla de Naegele** aproxima este cálculo para ciclos de $28\text{ días}$ sumando un año, restando tres meses y añadiendo siete días ($FPP = FUR + 1\text{ año} - 3\text{ meses} + 7\text{ días}$). El conteo digital directo de $280\text{ días}$ evita el desfase de $1\text{ a }3\text{ días}$ que introduce el atajo manual debido a la distinta longitud de los meses.

### 2. Método por Fecha de Concepción ($F_{\text{conc}}$) y Transferencia FIV ($F_{\text{trans}}$)

Si se conoce con certeza el día de la ovulación o coito fecundante, se suma directamente la duración biológica media de la gestación humana ($266\text{ días}$). En procedimientos de **Fecundación In Vitro (FIV)**, se descuenta la edad celular del embrión en laboratorio ($E_e$, habitualmente $3$ o $5\text{ días}$) al momento de la transferencia:

$$FPP_{\text{concepción}} = F_{\text{conc}} + 266\text{ días} \qquad \text{y} \qquad FPP_{\text{FIV}} = F_{\text{trans}} + (266 - E_e)\text{ días}$$

### Definición de variables

* **$FPP$**: Fecha Probable de Parto en la que se cumplen las $40\text{ semanas}$ ($40+0$) de gestación.
* **$FUR$**: Fecha del primer día de sangrado franco del último período menstrual.
* **$L_c$**: Duración promedio del ciclo menstrual en días (estándar: $28\text{ días}$, con fase lútea constante de $14\text{ días}$).
* **$F_{\text{conc}}$ y $F_{\text{trans}}$**: Fecha confirmada de fecundación o fecha de la transferencia embrionaria intrauterina.
* **$E_e$**: Edad embrionaria en días al realizarse la transferencia ($3\text{ días}$ en fase de escisión; $5\text{ días}$ en blastocisto).

## Ejemplos clínicos resueltos paso a paso

### Ejemplo 1: Cálculo por FUR en un ciclo largo de 32 días

Una paciente inicia su última menstruación el **10 de mayo de 2026** y presenta ciclos regulares de **$32\text{ días}$**.

1. **Gestación base ($280\text{ días}$)**: Al 10 de mayo de 2026 se suman los $21\text{ días}$ restantes de mayo, los $214\text{ días}$ de junio a diciembre de 2026 (acumulado: $235\text{ días}$), los $31\text{ días}$ de enero de 2027 (acumulado: $266\text{ días}$) y $14\text{ días}$ de febrero de 2027 ($280 - 266 = 14$), alcanzando el **14 de febrero de 2027**.
2. **Ajuste de ciclo ($L_c = 32$)**: Como la ovulación se retrasó $32 - 28 = +4\text{ días}$ respecto al día 14 estándar, se añaden $4\text{ días}$ al 14 de febrero, fijando la **FPP el 18 de febrero de 2027**.

### Ejemplo 2: Cálculo tras transferencia FIV de blastocisto de día 5

Se transfiere un blastocisto ($E_e = 5\text{ días}$) el **1 de junio de 2026**.

1. **Días a sumar**: $266 - 5 = 261\text{ días}$ desde la transferencia.
2. **Conteo**: Sumando los $29\text{ días}$ restantes de junio, los $184\text{ días}$ de julio a diciembre de 2026 (acumulado: $213$), los $31\text{ días}$ de enero de 2027 (acumulado: $244$) y $17\text{ días}$ de febrero ($261 - 244 = 17$), se obtiene una **FPP exacta del 17 de febrero de 2027**.

## Cronograma gestacional: tabla de trimestres y clasificación del parto

| Etapa / Clasificación | Semanas | Hitos del desarrollo fetal | Control prenatal habitual |
| :--- | :---: | :--- | :--- |
| **Primer trimestre** | $1+0$ a $13+6$ | Implantación, tubo neural, latido cardíaco (semana 6) y organogénesis. | Analítica basal, ecografía de semana 12 (LCC y translucencia nucal). |
| **Segundo trimestre** | $14+0$ a $27+6$ | Osificación, movimientos fetales (semanas 18-20) y desarrollo sensorial. | Ecografía morfológica (semana 20) y prueba de glucosa. |
| **Tercer trimestre** | $28+0$ a $40+0$ | Maduración pulmonar con surfactante, ganancia ponderal y encajamiento. | Ecografía de crecimiento, vacuna tosferina y exudado estreptococo B. |
| **A término precoz** | $37+0$ a $38+6$ | Órganos funcionales; ligera mayor tasa de adaptación respiratoria transitoria. | Seguimiento obstétrico activo; se evitan inducciones electivas. |
| **A término completo** | $39+0$ a $40+6$ | Madurez fisiológica y neurológica óptima para la vida extrauterina. | Ventana perinatal con menor índice de complicaciones neonatales. |
| **A término tardío / Postérmino** | $41+0$ a $\ge 42+0$ | Posible envejecimiento placentario y descenso gradual del líquido amniótico. | Monitorización fetal estrecha y valoración de inducción del parto. |

## Recomendaciones clínicas y errores frecuentes al datar el embarazo

* **Confundir el sangrado de implantación con la última regla**: Entre $6$ y $12\text{ días}$ tras la fecundación puede ocurrir un manchado leve al adherirse el blastocisto al endometrio. Tomar este manchado como FUR desplaza erróneamente la FPP cuatro semanas hacia adelante; siempre debe registrarse el primer día de flujo menstrual franco.
* **Ajuste ecográfico mediante la Longitud Cráneo-Caudal (LCC)**: En mujeres con ciclos irregulares, ovario poliquístico o abandono reciente de anticonceptivos, la biometría de la LCC en el primer trimestre estima la edad gestacional con un margen de $\pm 5\text{ días}$.
* **Inmutabilidad de la fecha FIV**: En gestaciones logradas por Fecundación In Vitro con fecha de transferencia conocida, las guías obstétricas establecen que la FPP embrionaria nunca debe reasignarse por ecografía.
