---
title: "Calculadora de Grasa Corporal"
metaTitle: "Calculadora de Grasa Corporal | Masa Magra y Porcentaje"
description: "Calcula tu porcentaje de grasa corporal, masa corporal magra y masa adiposa total mediante el método antropométrico de la Marina de los EE. UU. y la ecuación derivada del IMC."
metaDescription: "Calculadora de grasa corporal en línea. Calcula tu masa magra, masa grasa y categoría de salud al instante con medidas de cintura, cuello y cadera."
metaKeywords: "calculadora de grasa corporal, porcentaje de grasa corporal, masa corporal magra, metodo marina eeuu, medir grasa corporal con cinta, composicion corporal"
faqs:
  - question: "¿Por qué el porcentaje de grasa corporal es más fiable que el Índice de Masa Corporal (IMC)?"
    answer: "El IMC solo divide el peso total entre la estatura al cuadrado, sin distinguir entre tejido muscular y tejido adiposo. Un deportista con gran desarrollo muscular puede ser clasificado erróneamente con sobrepeso según el IMC, mientras que una persona sedentaria con peso normal puede presentar exceso de grasa visceral y déficit muscular."
  - question: "¿Qué precisión tiene el método de la Marina de EE. UU. comparado con un escáner DEXA?"
    answer: "Los estudios de validación antropométrica demuestran que la ecuación de Hodgdon y Beckett (Marina de EE. UU.) presenta un margen de variación de alrededor del 3% al 4% respecto a la absorciometría dual de rayos X (DEXA) o el pesaje hidrostático, siendo el método sin costo más consistente para hacer seguimiento de tu progreso."
  - question: "¿Por qué las mujeres tienen un porcentaje de grasa corporal esencial superior al de los hombres?"
    answer: "El organismo femenino requiere entre un 10% y un 13% de grasa esencial (frente al 2% a 5% en los hombres) para garantizar la síntesis de estrógenos, preservar la regularidad del ciclo ovulatorio, proteger los órganos reproductivos y sostener las reservas biológicas vinculadas a la maternidad y la lactancia."
  - question: "¿Cómo debo tomar las medidas con la cinta métrica para evitar errores de cálculo?"
    answer: "Mide siempre en ayunas por la mañana, manteniendo la cinta horizontal y ajustada a la piel sin comprimir el tejido subcutáneo. Toma el perímetro de la cintura al final de una espiración normal sin contraer el abdomen, el cuello justo por debajo de la laringe con los hombros relajados y la cadera en el punto de mayor proyección de los glúteos."
  - question: "¿Cómo calculo mi peso ideal objetivo a partir de mi masa corporal magra actual?"
    answer: "Divide tu masa corporal magra (en kilogramos) entre el resultado de restar a 1 tu porcentaje de grasa objetivo expresado en decimales. Por ejemplo, si tienes 65 kg de masa magra y deseas alcanzar un 15% de grasa corporal, tu peso objetivo será 65 dividido entre 0.85, lo que equivale a 76.47 kg."
---

Evaluar tu estado físico únicamente mediante el peso que marca la báscula resulta insuficiente y, con frecuencia, engañoso. El peso corporal total engloba tejidos con funciones metabólicas opuestas: el tejido adiposo (grasa subcutánea y visceral) y la masa libre de grasa (músculo esquelético, estructura ósea, órganos y agua corporal). Nuestra **Calculadora de Grasa Corporal** desglosa con precisión tu composición corporal utilizando el método antropométrico oficial de la Marina de los Estados Unidos y la estimación clínica derivada del Índice de Masa Corporal (IMC).

## Porcentaje de Grasa Corporal frente al IMC: Composición Corporal Real

El **porcentaje de grasa corporal** expresa la proporción exacta de tu masa total que corresponde a tejido lipídico. Dos personas de la misma edad, sexo, estatura ($175\text{ cm}$) y peso ($80\text{ kg}$) comparten un IMC idéntico de $26.1\text{ kg/m}^2$ (clasificado tradicionalmente como sobrepeso). Sin embargo, una de ellas puede ser un atleta de fuerza con un $12\%$ de grasa corporal y $70.4\text{ kg}$ de masa magra, mientras que la otra puede llevar una vida sedentaria con un $28\%$ de grasa corporal y alto riesgo cardiometabólico.

Para superar esta limitación sin requerir plicómetros clínicos ni equipos de bioimpedancia hospitalaria, los investigadores J. A. Hodgdon y M. B. Beckett desarrollaron en el Centro de Investigación de Salud Naval un modelo logarítmico basado en perímetros corporales que estima la densidad corporal con alta reproducibilidad.

## Fórmulas Antropométricas: Método de la Marina de EE. UU. y Ecuación de Siri

El cálculo oficial combina la estimación de la densidad corporal ($D_c$, en $\text{g/cm}^3$) a partir de circunferencias en centímetros con la ecuación de Siri ($\text{\%Grasa} = [495 / D_c] - 450$). Todas las medidas lineales se expresan en centímetros ($\text{cm}$) y los logaritmos en base diez ($\log_{10}$):

### 1. Ecuación para Hombres
Utiliza la relación entre el perímetro abdominal, el perímetro cervical y la estatura total:

$$\%\text{Grasa}_{\text{hombres}} = \frac{495}{1.0324 - 0.19077 \cdot \log_{10}(C_{\text{cintura}} - C_{\text{cuello}}) + 0.15456 \cdot \log_{10}(A)} - 450$$

### 2. Ecuación para Mujeres
Incorpora el perímetro de la cadera para reflejar la distribución fisiológica del tejido adiposo femenino:

$$\%\text{Grasa}_{\text{mujeres}} = \frac{495}{1.29579 - 0.35004 \cdot \log_{10}(C_{\text{cintura}} + C_{\text{cadera}} - C_{\text{cuello}}) + 0.22100 \cdot \log_{10}(A)} - 450$$

### 3. Cálculo de Masa Grasa, Masa Magra y Peso Objetivo
Conociendo el porcentaje de grasa corporal ($\%\text{Grasa}$) y el peso total ($P$, en $\text{kg}$), se determinan los compartimentos corporales y el peso objetivo ($P_{\text{objetivo}}$) para una meta específica de grasa ($\%\text{Meta}$):

$$M_{\text{grasa}} = P \times \left(\frac{\%\text{Grasa}}{100}\right), \qquad M_{\text{magra}} = P - M_{\text{grasa}}, \qquad P_{\text{objetivo}} = \frac{M_{\text{magra}}}{1 - (\%\text{Meta} / 100)}$$

Donde cada variable representa:
* **$C_{\text{cintura}}$**: Perímetro de la cintura en centímetros ($\text{cm}$), medido a la altura del ombligo en hombres y en la zona abdominal más estrecha en mujeres.
* **$C_{\text{cuello}}$**: Perímetro del cuello en centímetros ($\text{cm}$), medido justo por debajo de la prominencia laríngea (nuez de Adán).
* **$C_{\text{cadera}}$**: Perímetro máximo de las caderas y glúteos en centímetros ($\text{cm}$), requerido únicamente en la fórmula femenina.
* **$A$**: Estatura total descalzo en centímetros ($\text{cm}$).
* **$M_{\text{grasa}}$ y $M_{\text{magra}}$**: Masa adiposa total y masa corporal libre de grasa en kilogramos ($\text{kg}$).

## Tabla de Clasificación del Porcentaje de Grasa Corporal

El Consejo Americano del Ejercicio establece los intervalos de referencia clínicos y deportivos aceptados internacionalmente según el sexo biológico:

| Categoría de Composición Corporal | Rango en Mujeres | Rango en Hombres | Implicación Fisiológica y de Salud |
| :--- | :--- | :--- | :--- |
| **Grasa esencial mínima** | $10\%\text{ – }13\%$ | $2\%\text{ – }5\%$ | Umbral mínimo para proteger nervios, médula ósea, membranas celulares y equilibrio hormonal. |
| **Atletas de competición** | $14\%\text{ – }20\%$ | $6\%\text{ – }13\%$ | Alta definición muscular y máxima relación potencia-peso en disciplinas deportivas. |
| **Acondicionamiento físico** | $21\%\text{ – }24\%$ | $14\%\text{ – }17\%$ | Excelente salud metabólica, perfil lipídico óptimo y tonicidad muscular visible. |
| **Promedio saludable aceptable** | $25\%\text{ – }31\%$ | $18\%\text{ – }24\%$ | Rango normal para la población general sin riesgo elevado de síndrome metabólico. |
| **Exceso adiposo / Obesidad** | $\ge 32\%$ | $\ge 25\%$ | Incremento del riesgo cardiovascular, resistencia a la insulina e inflamación sistémica. |

## Ejemplo Práctico Paso a Paso: Evaluación de Composición Corporal

Evaluemos a un hombre de $30\text{ años}$ con peso $P = 80.0\text{ kg}$ y estatura $A = 178.0\text{ cm}$. En ayunas registra un perímetro de cintura $C_{\text{cintura}} = 86.0\text{ cm}$ y de cuello $C_{\text{cuello}} = 38.0\text{ cm}$.

1. **Diferencia de circunferencias y logaritmos:**
   * Diferencia abdominal-cervical: $86.0 - 38.0 = 48.0\text{ cm}$
   * Logaritmos: $\log_{10}(48.0) \approx 1.68124$ y $\log_{10}(178.0) \approx 2.25042$

2. **Estimación de la densidad corporal ($D_c$):**
   * Términos: $0.19077 \times 1.68124 = 0.32073$ y $0.15456 \times 2.25042 = 0.34782$
   $$D_c = 1.0324 - 0.32073 + 0.34782 = 1.05949\text{ g/cm}^3$$

3. **Obtención del porcentaje de grasa corporal:**
   $$\%\text{Grasa} = \frac{495}{1.05949} - 450 = 467.21 - 450 = 17.21\%$$

4. **Desglose de masa adiposa, masa magra y peso objetivo:**
   * **Masa grasa ($M_{\text{grasa}}$):** $80.0\text{ kg} \times 0.1721 = 13.77\text{ kg}$
   * **Masa corporal magra ($M_{\text{magra}}$):** $80.0\text{ kg} - 13.77\text{ kg} = 66.23\text{ kg}$
   Si desea definir su musculatura hasta alcanzar un $13.0\%$ de grasa conservando sus $66.23\text{ kg}$ de masa magra, su peso objetivo será:
   $$P_{\text{objetivo}} = \frac{66.23}{1 - 0.13} = \frac{66.23}{0.87} = 76.13\text{ kg} \quad (\text{reducción de } 3.87\text{ kg de grasa pura})$$

## Recomendaciones Técnicas y Errores Comunes al Medir

* **Controlar la distensión digestiva:** El perímetro abdominal puede variar entre $1.5\text{ y }3.0\text{ cm}$ durante el día por comidas o líquidos, alterando el resultado en más de $1.5$ puntos porcentuales. Mide siempre recién levantado y en ayunas.
* **No tensar el cuello ni contraer el abdomen:** Al medir el cuello, mantén los hombros relajados; ensanchar el trapecio sobredimensiona el perímetro cervical y subestima artificialmente tu porcentaje de grasa.
