---
title: "Calculadora de Volumen"
metaTitle: "Calculadora de Volumen | Calcular Volumen de Figuras 3D"
description: "Calcula con exactitud el volumen tridimensional y la capacidad en litros de cubos, prismas rectangulares, cilindros, esferas, conos, pirámides y troncos de cono."
metaDescription: "Calcula el volumen de cilindros, esferas, cubos, conos y prismas rectangulares. Calculadora de volumen gratuita en línea con fórmulas 3D exactas."
metaKeywords: "calculadora de volumen, calcular volumen, volumen de un cilindro, volumen de una esfera, volumen de un cubo, volumen de un cono, fórmulas de volumen, metros cúbicos a litros"
faqs:
  - question: "¿Cómo se calcula el volumen de un cilindro si solo conozco el diámetro y la altura?"
    answer: "Divide primero el diámetro entre dos para obtener el radio (r = d / 2), elévalo al cuadrado, multiplícalo por pi (3,14159265) y finalmente por la altura: V = pi × r² × h. También puedes aplicar directamente la fórmula equivalente en función del diámetro: V = (pi / 4) × d² × h."
  - question: "¿Por qué el volumen de un cono es exactamente la tercera parte del volumen de un cilindro con igual base y altura?"
    answer: "Al cortar un cono paralelo a su base a una distancia x desde el vértice, el radio crece de forma lineal como (r / h) × x y el área circular crece de manera cuadrática como pi × (r / h)² × x². Al integrar x² entre 0 y h se obtiene (1 / 3) × h³, lo que produce la relación exacta V = (1 / 3) × pi × r² × h."
  - question: "¿Cuál es la equivalencia entre metros cúbicos, centímetros cúbicos y litros en el sistema métrico SI?"
    answer: "En el sistema métrico SI, un metro cúbico (1 m³) equivale exactamente a 1.000 decímetros cúbicos (dm³), es decir, 1.000 litros, y a 1.000.000 de centímetros cúbicos (cm³ o mililitros). Esta correspondencia directa facilita convertir medidas geométricas en capacidad de líquidos."
  - question: "¿Cambia el volumen de un prisma o un cilindro cuando la figura está inclinada?"
    answer: "No. Según el principio de Cavalieri, dos sólidos tridimensionales que tienen la misma altura perpendicular y secciones transversales de igual área en todos los planos paralelos a la base poseen exactamente el mismo volumen, independientemente de su ángulo de inclinación."
  - question: "¿Por qué al duplicar las dimensiones lineales de un cuerpo 3D su volumen se multiplica por ocho?"
    answer: "El volumen depende del producto de tres dimensiones perpendiculares entre sí. Si todas las longitudes se escalan por un factor k, el volumen cambia por el cubo de ese factor (k³). Al duplicar el tamaño (k = 2), el espacio interior crece 2³ = 8 veces."
---

En geometría tridimensional, el **volumen** cuantifica el espacio físico encerrado dentro de las superficies de un sólido. Mientras la longitud mide una dimensión (`m`) y el área abarca dos ejes (`m²`), el volumen integra tres dimensiones ortogonales —largo, ancho y altura— y se expresa en **unidades cúbicas** del **sistema métrico SI** (`m³`, `dm³`, `cm³`) o en medidas de capacidad de líquidos (litros, mililitros o galones).

Desde cubicar hormigón para una losa hasta dimensionar depósitos industriales, silos agrícolas o embalajes logísticos, nuestra **Calculadora de Volumen** resuelve al instante las ecuaciones geométricas exactas de los sólidos 3D más comunes y convierte sus resultados directamente a litros y unidades cúbicas.

## Fórmulas Geométricas Exactas para Sólidos 3D

Antes de calcular, todas las longitudes deben estar expresadas en la **misma unidad base**.

### 1. Cubo, Prisma Rectangular y Pirámide

Un prisma rectangular multiplica su área base por la altura perpendicular; en un cubo las tres aristas son iguales, y toda pirámide encierra un tercio del prisma que la contiene:

$$V_{\text{prisma}} = l \cdot a \cdot h, \qquad V_{\text{cubo}} = s^3, \qquad V_{\text{pirámide}} = \frac{1}{3} A_{\text{base}} \cdot h$$

### 2. Cilindro Recto, Tubo Hueco y Esfera

El cilindro proyecta una base circular a lo largo de su altura; en una tubería hueca se resta el núcleo interior, y en la esfera el volumen depende del cubo del radio:

$$V_{\text{cilindro}} = \pi r^2 h = \frac{\pi d^2 h}{4}, \qquad V_{\text{tubo}} = \pi h (R_{\text{ext}}^2 - r_{\text{int}}^2), \qquad V_{\text{esfera}} = \frac{4}{3}\pi r^3$$

### 3. Cono Circular Recto y Tronco de Cono

El cono ocupa un tercio del cilindro con igual base y altura. Si solo se conoce la generatriz inclinada ($g$), la altura vertical resulta $h = \sqrt{g^2 - r^2}$. Para un tronco de cono:

$$V_{\text{cono}} = \frac{1}{3}\pi r^2 h, \qquad V_{\text{tronco}} = \frac{1}{3}\pi h (R^2 + Rr + r^2)$$

Definición de variables:

* **$l$, $a$ y $h$:** largo, ancho y altura perpendicular a la base.
* **$s$:** arista de un cubo regular ($l = a = h = s$).
* **$r$ y $d$:** radio y diámetro de la sección circular ($r = d / 2$).
* **$R_{\text{ext}}$ y $r_{\text{int}}$:** radios exterior e interior de una tubería hueca.
* **$R$ y $r$ (tronco):** radios mayor y menor de las bases paralelas.
* **$A_{\text{base}}$:** área del polígono base (para base cuadrada de lado $a$, $A_{\text{base}} = a^2$).

Por el **principio de Cavalieri**, inclinar un prisma o cilindro no altera su volumen si mantiene la altura perpendicular $h$. Además, por el **teorema de Arquímedes**, un cono, una esfera y un cilindro con igual radio $r$ y altura $2r$ mantienen una relación de volumen exacta de **1 : 2 : 3**.

## Ejemplo Práctico Paso a Paso: Silo Compuesto de Acero

Calculemos la capacidad interior de un silo vertical con radio interno **1,50 m** (diámetro **3,00 m**) formado por tres secciones: cuerpo cilíndrico de altura **4,00 m**, cúpula semiesférica superior ($\frac{2}{3}\pi r^3$) y tolva cónica inferior de altura **1,20 m**.

1. **Cuerpo cilíndrico:** $\pi \times 1{,}50^2 \times 4{,}00 = 9{,}00\pi \approx \mathbf{28{,}2743\text{ m}^3}$.
2. **Cúpula semiesférica:** $\frac{2}{3}\pi \times 1{,}50^3 = 2{,}25\pi \approx \mathbf{7{,}0686\text{ m}^3}$.
3. **Tolva cónica inferior:** $\frac{1}{3}\pi \times 1{,}50^2 \times 1{,}20 = 0{,}90\pi \approx \mathbf{2{,}8274\text{ m}^3}$.
4. **Volumen total:**
   $$V_{\text{total}} = (9{,}00 + 2{,}25 + 0{,}90)\pi = 12{,}15\pi \approx \mathbf{38{,}1704\text{ m}^3}$$

Conservando el valor exacto (`38,170351 m³`) al convertir unidades, el depósito alberga **38.170,35 litros** (`1 m³ = 1.000 L`), equivalentes a **10.083,54 galones estadounidenses** o **49,92 yardas cúbicas**.

## Tabla de Referencia: Sólidos 3D, Fórmulas y Capacidad

La tabla compara fórmulas y volúmenes calculados en el **sistema métrico SI**:

| Sólido 3D | Fórmula de Volumen | Área Superficial | Dimensiones | Volumen (m³) | Capacidad (L) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cubo** | $s^3$ | $6s^2$ | 2,00 m de lado | 8,0000 | 8.000,0 |
| **Prisma rectangular** | $l \cdot a \cdot h$ | $2(la+lh+ah)$ | 4,0 × 2,5 × 1,5 m | 15,0000 | 15.000,0 |
| **Cilindro recto** | $\pi r^2 h$ | $2\pi r(r+h)$ | r = 1,2 m; h = 3,0 m | 13,5717 | 13.571,7 |
| **Esfera** | $\frac{4}{3}\pi r^3$ | $4\pi r^2$ | r = 1,5 m | 14,1372 | 14.137,2 |
| **Cono recto** | $\frac{1}{3}\pi r^2 h$ | $\pi r(r+g)$ | r = 1,2 m; h = 3,0 m | 4,5239 | 4.523,9 |
| **Pirámide cuadrada** | $\frac{1}{3}a^2 h$ | $a^2+2a\sqrt{(a/2)^2+h^2}$ | a = 2,0 m; h = 3,0 m | 4,0000 | 4.000,0 |
| **Tronco de cono** | $\frac{1}{3}\pi h(R^2+Rr+r^2)$ | $\pi[R^2+r^2+g(R+r)]$ | R = 1,5; r = 0,8; h = 2,0 m | 8,5661 | 8.566,1 |

Al cambiar de escala cúbica, eleva siempre al cubo el factor lineal ($k^3$): `1 m³ = 1.000.000 cm³ = 1.000 L`, `1 pie cúbico = 28,3168 L` y `1 galón estadounidense = 3,78541 L`.

## Errores Frecuentes y Buenas Prácticas de Cálculo

* **Usar el diámetro en lugar del radio:** sustituir el diámetro donde corresponde $r$ multiplica por cuatro el volumen en cilindros y conos (por $r^2$) y por ocho en esferas (por $r^3$).
* **Confundir la generatriz con la altura perpendicular:** en conos y pirámides, la cara inclinada siempre supera a la altura vertical $h$; calcula primero $h$ por Pitágoras.
* **Aplicar conversiones lineales a unidades cúbicas:** mezclar metros y centímetros invalida el cálculo, y dividir centímetros cúbicos entre 100 en vez de 1.000.000 dispara el error en cuatro órdenes de magnitud.
* **Olvidar el espesor de pared en tanques:** las cotas externas miden el volumen desplazado, pero la capacidad útil depende estrictamente de las dimensiones interiores.
