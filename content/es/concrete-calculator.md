---
title: "Calculadora de Concreto"
metaTitle: "Calculadora de Concreto | Volumen en m³, Yardas y Sacos"
description: "Calcula con exactitud el volumen de concreto u hormigón en metros cúbicos, yardas cúbicas y cantidad de sacos premezclados para losas, zapatas y columnas."
metaDescription: "Calculadora de cemento y concreto gratuita en línea. Calcule de forma exacta el volumen requerido en metros cúbicos, yardas y sacos premezclados."
metaKeywords: "calculadora de concreto, calculadora de hormigon, calcular metros cubicos de concreto, yardas cubicas a sacos, volumen de losa, columnas cilindricas, dosificacion cemento arena grava"
faqs:
  - question: "¿Cuántos sacos de concreto premezclado necesito para cubrir un metro cúbico?"
    answer: "Para obtener 1 metro cúbico (1.000 litros) de concreto fresco con una densidad estándar de 2.400 kg/m³, se requieren aproximadamente 100 sacos premezclados de 25 kg, 90 sacos de 27,2 kg (60 lb) o 67 sacos de 36,3 kg (80 lb)."
  - question: "¿Cómo convierto pies cúbicos a yardas cúbicas y a metros cúbicos?"
    answer: "Divide el volumen en pies cúbicos entre 27 para obtener yardas cúbicas (dado que 1 yarda lineal equivale a 3 pies y 3³ = 27). Para pasar de yardas cúbicas a metros cúbicos, multiplica por 0,764555, o divide los pies cúbicos directamente entre 35,3147."
  - question: "¿Qué porcentaje de desperdicio debo añadir al pedir concreto para una obra?"
    answer: "En ingeniería civil y edificación se recomienda sumar entre un 5 % y un 10 % de volumen adicional para compensar irregularidades del terreno o subbase, ligeras deformaciones del encofrado, compactación por vibrado y remanentes en la mezcladora."
  - question: "¿Cuál es la diferencia entre un saco de concreto premezclado y un saco de cemento Portland?"
    answer: "El saco de concreto o mortero seco premezclado ya contiene cemento, arena y grava dosificados industrialmente (solo requiere añadir agua), mientras que el saco de cemento Portland puro (de 25 kg o 50 kg) es únicamente el aglomerante y debe combinarse en obra con áridos y agua."
  - question: "¿Qué espesor mínimo se recomienda para una losa de concreto residencial?"
    answer: "Para aceras peatonales, banquetas y patios interiores se utiliza un espesor mínimo de 10 cm (4 pulgadas); para cocheras y paso de automóviles ligeros se recomiendan de 12 a 15 cm (5 a 6 pulgadas) reforzados con malla electrosoldada."
---

Planificar el colado o vaciado de una estructura exige conocer de antemano el volumen exacto de mezcla fresca antes de contratar un camión hormigonera o comprar material ensacado. Nuestra **Calculadora de Concreto** (denominado **hormigón** en España y el Cono Sur) calcula el volumen geométrico preciso para losas rectangulares, firmes, zapatas, muros, columnas cilíndricas y pilotes de cimentación, convirtiendo automáticamente las dimensiones a **metros cúbicos ($\text{m}^3$)**, **yardas cúbicas ($\text{yd}^3$)**, **pies cúbicos ($\text{ft}^3$)** y cantidad de **sacos premezclados**.

En proyectos residenciales y de obra civil, el error más frecuente surge al combinar unidades lineales distintas —como multiplicar metros de largo por centímetros de espesor, o pies de ancho por pulgadas de peralte— sin homogeneizarlas previamente. Quedarse corto a mitad de un colado genera **juntas frías** que comprometen la resistencia monolítica de la pieza, mientras que pedir un exceso innecesario encarece el presupuesto.

## Fórmulas Geométricas para Calcular el Volumen de Concreto

El cálculo volumétrico depende de la forma del encofrado o cimbra. Antes de operar, todas las cotas deben expresarse en la misma unidad lineal (todo en metros para obtener $\text{m}^3$, o todo en pies para obtener $\text{ft}^3$).

### 1. Losas Rectangulares, Firmes, Zapatas y Muros
Para cualquier prisma rectangular de sección uniforme (pisos, banquetas, zapatas corridas o muros), el volumen geométrico ($V_{\text{losa}}$) es:

$$V_{\text{losa}} = L \times A \times E$$

### 2. Columnas Cilíndricas, Pilotes y Dados Circulares
Para elementos circulares (columnas redondas o perforaciones de cimentación), se aplica el volumen del cilindro recto a partir de su diámetro ($D$) y altura o profundidad ($H$):

$$V_{\text{cilindro}} = \pi \times \left(\frac{D}{2}\right)^2 \times H = \frac{\pi \times D^2 \times H}{4}$$

### 3. Volumen Total con Desperdicio y Estimación de Sacos
Para absorber irregularidades del terreno y pérdidas por vibrado, al volumen geométrico neto ($V_{\text{neto}}$) se le suma un **factor de desperdicio** ($f_d$, habitualmente entre $0,05$ y $0,10$):

$$V_{\text{total}} = V_{\text{neto}} \times (1 + f_d), \quad N_{\text{sacos}} = \left\lceil \frac{V_{\text{total}}}{R_{\text{saco}}} \right\rceil$$

Donde las variables representan:
* **$L$ y $A$**: Longitud y ancho del encofrado (en $\text{m}$ o $\text{ft}$).
* **$E$**: Espesor o peralte de la losa (divide centímetros entre $100$ para pasar a metros, o pulgadas entre $12$ para pasar a pies).
* **$D$ y $H$**: Diámetro interior y altura o profundidad de la columna cilíndrica.
* **$R_{\text{saco}}$**: Rendimiento volumétrico por saco de concreto seco una vez hidratado.

Equivalencias oficiales entre el Sistema Internacional (SI) y el sistema imperial:
* $1\text{ m}^3 = 1.000\text{ L} = 35,3147\text{ ft}^3 = 1,30795\text{ yd}^3$
* $1\text{ yd}^3 = 27\text{ ft}^3 = 0,764555\text{ m}^3 = 764,55\text{ L}$

## Ejemplo Práctico Paso a Paso: Losa de Cochera con Pilotes

Supongamos que vamos a colar el piso de una cochera de **$L = 6,00\text{ m}$ de largo** por **$A = 4,50\text{ m}$ de ancho** con un **espesor $E = 12\text{ cm}$** ($0,12\text{ m}$), apoyada sobre **$4$ pilotes cilíndricos** de **$D = 40\text{ cm}$** ($0,40\text{ m}$) de diámetro y **$H = 1,20\text{ m}$** de profundidad, añadiendo un **$8\text{ \%}$ de desperdicio** ($f_d = 0,08$).

1. **Volumen de la losa rectangular**:
   $$V_{\text{losa}} = 6,00\text{ m} \times 4,50\text{ m} \times 0,12\text{ m} = 3,2400\text{ m}^3$$
2. **Volumen de los 4 pilotes cilíndricos**:
   Con radio $r = \frac{0,40}{2} = 0,20\text{ m}$, el volumen de un pilote es:
   $$V_{\text{1 pilote}} = 3,14159 \times (0,20\text{ m})^2 \times 1,20\text{ m} = 0,1508\text{ m}^3$$
   Para los $4$ pilotes: $V_{\text{pilotes}} = 4 \times 0,1508\text{ m}^3 = 0,6032\text{ m}^3$.
3. **Volumen neto y volumen total con $8\text{ \%}$ de margen**:
   $$V_{\text{neto}} = 3,2400 + 0,6032 = 3,8432\text{ m}^3 \implies V_{\text{total}} = 3,8432 \times 1,08 = \mathbf{4,1507\text{ m}^3}$$
4. **Conversión a yardas cúbicas y sacos**:
   * **Yardas y pies cúbicos**: $4,1507\text{ m}^3 \times 1,30795 = \mathbf{5,43\text{ yd}^3}$ ($146,58\text{ ft}^3$).
   * **Sacos premezclados**: Con sacos de $80\text{ lb}$ ($36,3\text{ kg}$, rendimiento de $0,60\text{ ft}^3$ o $0,017\text{ m}^3$), se requieren $\frac{146,58}{0,60} = \mathbf{245\text{ sacos}}$. Con sacos de $25\text{ kg}$ ($0,010\text{ m}^3$/saco), se necesitarían $\mathbf{416\text{ sacos}}$, por lo que para obras mayores a $2\text{ m}^3$ resulta más rentable pedir un camión premezclador.

## Tabla de Rendimiento de Sacos y Dosificación por $1\text{ m}^3$ en Obra

La siguiente tabla compara el rendimiento de los **sacos de concreto seco premezclado** y las proporciones estándar para fabricar **$1\text{ m}^3$ de concreto en obra** según su resistencia ($f'_c$):

| Tipo de Mezcla / Saco | Peso o Proporción | Rendimiento Unitario | Por $1\text{ yd}^3$ | Por $1\text{ m}^3$ |
| :--- | :--- | :--- | :--- | :--- |
| **Saco Premezclado 40 lb** | $18,1\text{ kg}$ | $0,0085\text{ m}^3$ ($0,30\text{ ft}^3$) | $90\text{ sacos}$ | $118\text{ sacos}$ |
| **Saco Premezclado 25 kg** | $25,0\text{ kg}$ | $0,0104\text{ m}^3$ ($0,37\text{ ft}^3$) | $74\text{ sacos}$ | $98\text{ sacos}$ |
| **Saco Premezclado 60 lb** | $27,2\text{ kg}$ | $0,0127\text{ m}^3$ ($0,45\text{ ft}^3$) | $60\text{ sacos}$ | $79\text{ sacos}$ |
| **Saco Premezclado 80 lb** | $36,3\text{ kg}$ | $0,0170\text{ m}^3$ ($0,60\text{ ft}^3$) | $45\text{ sacos}$ | $59\text{ sacos}$ |
| **Obra $150\text{ kg/cm}^2$ ($15\text{ MPa}$)** | $1 : 2,5 : 3,5$ (Firmes) | Mezcla in situ | $230\text{ kg cem}$ | $300\text{ kg cem}, 0,52\text{ m}^3\text{ arena}, 0,74\text{ m}^3\text{ grava}$ |
| **Obra $200\text{ kg/cm}^2$ ($20\text{ MPa}$)** | $1 : 2 : 3$ (Losas) | Mezcla in situ | $268\text{ kg cem}$ | $350\text{ kg cem}, 0,50\text{ m}^3\text{ arena}, 0,72\text{ m}^3\text{ grava}$ |
| **Obra $250\text{ kg/cm}^2$ ($25\text{ MPa}$)** | $1 : 1,5 : 2,5$ (Columnas) | Mezcla in situ | $321\text{ kg cem}$ | $420\text{ kg cem}, 0,46\text{ m}^3\text{ arena}, 0,70\text{ m}^3\text{ grava}$ |

## Consejos Técnicos y Errores Frecuentes en el Colado

1. **No sumes directamente los volúmenes sueltos de arena y grava**: Mezclar $0,50\text{ m}^3$ de arena con $0,72\text{ m}^3$ de grava, $350\text{ kg}$ de cemento y $200\text{ L}$ de agua produce exactamente $1,00\text{ m}^3$ de concreto compacto, porque la arena y la pasta de cemento rellenan los huecos vacíos entre la grava.
2. **Controla la relación agua/cemento ($a/c$)**: Agregar agua en exceso para facilitar el extendido reduce hasta un $40\text{ \%}$ la resistencia a compresión ($f'_c$) y genera fisuras superficiales por retracción al evaporarse el agua sobrante.
3. **Compacta la subbase y cura durante 7 días**: Apisona el suelo antes de vaciar para evitar asentamientos diferenciales y mantén húmeda la losa durante la primera semana para lograr una hidratación completa sin grietas.
