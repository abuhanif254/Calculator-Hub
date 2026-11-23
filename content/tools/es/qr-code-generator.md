---
metaTitle: "Generador de Códigos QR con Logo | SVG Vectorial y WiFi"
metaDescription: "Crea códigos QR estáticos offline con logo, degradados, control Reed-Solomon (L/M/Q/H), payloads WiFi o vCard y descarga en SVG, PNG o ZIP."
metaKeywords: "generador de codigo qr, crear codigo qr gratis, codigo qr con logo, codigo qr wifi, vcard qr code, crear qr svg, correccion reed solomon, qr estatico"
title: "Generador de Códigos QR y Diseño"
shortDescription: "Diseña códigos QR estáticos permanentes conformes a ISO/IEC 18004 para URLs, redes WiFi, vCard 3.0, eventos y criptomonedas con control Reed-Solomon, logotipos centrales y descarga en SVG vectorial, PNG o ZIP por lotes."
faqs:
  - question: "¿Los códigos QR generados caducan o exigen una suscripción de pago?"
    answer: "No. Cada matriz creada aquí es un código QR estático estándar ISO/IEC 18004 que codifica directamente tu enlace, credenciales WiFi o ficha vCard en los propios módulos, sin pasar por servidores de redirección de terceros. Mientras tu URL o contenido siga activo, el código funcionará indefinidamente."
  - question: "¿Qué nivel de corrección de errores debo elegir al incrustar un logotipo en el centro?"
    answer: "Selecciona siempre el nivel H (Alto, 30% de recuperación de palabras código) cuando añadas un logotipo central, y mantén la superficie del icono en un máximo del 20% del ancho de la matriz. El lector trata la zona tapada como daño físico y reconstruye los bits ocultos mediante bloques de paridad Reed-Solomon."
  - question: "¿Cuándo conviene descargar formato SVG en lugar de PNG?"
    answer: "Descarga SVG siempre que el código vaya a imprenta (tarjetas de presentación, envases, cartelería, vinilos) o flujos de diseño en Illustrator y Figma, ya que los trazados vectoriales escalan a cualquier resolución sin desenfoque ni pixelación. Usa PNG en alta resolución (512 px a 1024 px) para web, presentaciones y mensajería."
  - question: "¿Por qué un código QR estilizado puede fallar al escanearse en algunos teléfonos?"
    answer: "Los fallos de lectura casi siempre provienen de cuatro causas: bajo contraste de luminancia entre módulos y fondo, polaridad invertida (módulos claros sobre fondo oscuro), recorte del margen obligatorio de 4 módulos (zona silenciosa) o impresión de un payload denso por debajo de 0,4 mm por módulo."
  - question: "¿Cómo se manejan caracteres especiales dentro del nombre o la contraseña de un QR WiFi?"
    answer: "La gramática estándar WIFI: utiliza punto y coma, dos puntos y coma como delimitadores de campo. Si tu SSID o clave WPA incluye ';', ':', ',' o barra invertida ('\\'), esos caracteres deben escaparse con una barra invertida previa (por ejemplo '\\;') para que iOS y Android no trunquen la contraseña al leerla."
features:
  - "12 constructores de payload estructurado: URL, texto plano, WiFi, vCard 3.0, correo, SMS, teléfono, WhatsApp, coordenadas GPS, eventos iCalendar, redes sociales y criptomonedas"
  - "Control granular de corrección de errores Reed-Solomon ISO/IEC 18004 (niveles L, M, Q y H), resolución hasta 1024 px y margen de zona silenciosa ajustable"
  - "Geometrías personalizables de módulos (cuadrados, puntos circulares, cápsulas redondeadas) y ojos buscadores con forma y color independientes"
  - "Rellenos de color sólido o degradados lineales/radiales, exportación con fondo transparente y logotipo central con escala y margen configurables"
  - "Descarga vectorial SVG sin pérdida y raster PNG, copia directa de imagen al portapapeles, verificación de lectura e historial local"
  - "Modo por lotes que renderiza decenas de códigos QR estilizados en el navegador y los empaqueta en un único archivo ZIP"
useCases:
  - "Crear tarjetas de acceso WiFi sin tecleo para oficinas, cafeterías, alquileres turísticos y salas de reuniones sin enviar contraseñas a servidores"
  - "Imprimir fichas de contacto vCard 3.0 en formato SVG vectorial nítido sobre tarjetas de visita, acreditaciones de congresos y diapositivas"
  - "Integrar códigos QR con logotipo corporativo en empaques de producto, manuales técnicos y cartas digitales de restaurantes"
  - "Generar archivos ZIP masivos con etiquetas de inventario, ubicaciones de almacén o entradas de eventos a partir de una lista por líneas"
  - "Codificar direcciones verificables de pago Bitcoin o Ethereum en facturas y carteles evitando errores de transcripción manual"
  - "Vincular folletos físicos, letreros inmobiliarios e invitaciones directamente a ubicaciones GPS o eventos de calendario de un solo toque"
howToSteps:
  - "Elige una de las 12 pestañas de payload (URL, WiFi, vCard, Evento, Cripto, entre otras) y completa los campos estructurados."
  - "Ajusta el nivel de corrección de errores (mantén el nivel H activo si vas a insertar un logotipo), el tamaño de salida y el margen de zona silenciosa."
  - "Personaliza la estética eligiendo color sólido o degradado lineal/radial, forma de los módulos y estilo de los patrones buscadores de las esquinas."
  - "Arrastra o selecciona un logotipo central opcional, regulando su proporción (15% a 20% máximo) y su borde claro de separación."
  - "Valida la lectura escaneando la vista previa con tu móvil y descarga el archivo final en SVG o PNG, o usa el Modo por Lotes para exportar un paquete ZIP."
---

Un **código QR (Quick Response)** encapsula datos digitales en una matriz bidimensional estandarizada bajo **ISO/IEC 18004**. A diferencia de plataformas de QR «dinámicos» que redirigen cada escaneo por acortadores propietarios —generando rastreo, cuotas recurrentes y enlaces rotos si el proveedor desaparece—, este **Generador de Códigos QR y Diseño** calcula las palabras código Reed-Solomon, renderiza gráficos vectoriales SVG o PNG y empaqueta lotes ZIP íntegramente en la memoria local de tu navegador. Contraseñas WiFi WPA2/WPA3, contactos privados y direcciones cripto nunca abandonan tu dispositivo.

## Geometría ISO/IEC 18004, modos de codificación y enmascarado

Cada símbolo QR se estructura en una cuadrícula de celdas binarias llamadas **módulos**, escalando a través de 40 versiones según `módulos = 4V + 17`, desde la **Versión 1 (21×21)** hasta la **Versión 40 (177×177)**. Antes de escribir los datos, varias estructuras fijas ocupan coordenadas deterministas:

- **Tres patrones buscadores (*Finder Patterns*)**: Bloques de 7×7 en tres esquinas cuya proporción `1:1:3:1:1` permite localizar el símbolo rotado en 360 grados.
- **Separadores y patrones de temporización**: Separadores claros de 1 módulo aíslan cada esquina, mientras la fila 6 y la columna 6 alternan módulos para calibrar el paso de la rejilla.
- **Patrones de alineación (Versión 2+)**: Marcadores interiores de 5×5 compensan distorsiones de lente y superficies curvas como botellas o envases.
- **Información de formato y máscaras XOR**: Dos tiras redundantes de 15 bits codificadas en BCH(15,5) almacenan el nivel ECC y cuál de las **8 máscaras XOR** logró menor penalización visual, evitando bloques monocromos o falsos buscadores.

La densidad depende además del **modo de codificación**: **Numérico** (`3,33 bits/carácter`), **Alfanumérico** (`5,5 bits/carácter` en `0–9`, `A–Z` y 9 símbolos), **Byte UTF-8** (`8 bits/carácter`) y **Kanji** Shift JIS (`13 bits/carácter`). Como las minúsculas obligan a cambiar del modo Alfanumérico al modo Byte, usar dominios breves en mayúsculas cuando la ruta no distingue capitalización —y escapar parámetros de consulta previamente con el [Codificador de URL](/es/herramientas/url-encoder)— reduce la versión de matriz y produce módulos más grandes y fáciles de enfocar al mismo tamaño físico.

## Corrección de errores Reed-Solomon y presupuesto para logotipos

La tolerancia frente a daños físicos u oclusión central descansa en la **corrección de errores Reed-Solomon sobre `GF(2^8)`**. El codificador divide los datos en bloques, calcula palabras código polinómicas de paridad y las entrelaza para reconstruir áreas ocultas.

| Nivel ECC | Recuperación | Máx. Versión 40 (Bytes) | Máx. Versión 40 (Alfanumérico) | Logo central seguro | Despliegue recomendado |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **L (Bajo)** | ~7% | 2.953 bytes | 4.296 caracteres | Ninguno | Pantallas limpias y enlaces largos |
| **M (Medio)** | ~15% | 2.331 bytes | 3.391 caracteres | Hasta 10% | Folletos, recibos, cartelería interior |
| **Q (Cuartil)** | ~25% | 1.663 bytes | 2.420 caracteres | Hasta 15% | Etiquetas minoristas y desgaste moderado |
| **H (Alto)** | ~30% | 1.273 bytes | 1.852 caracteres | Hasta 20% | Códigos con logotipo o uso industrial |

Incluso con nivel `H`, el logotipo nunca debe superar el 20% del área total ni invadir los patrones buscadores ni sus tiras de formato de 15 bits. Añade siempre un borde claro alrededor del emblema para impedir que los módulos vecinos se fundan con el icono.

## Gramáticas estandarizadas de payload: WiFi, vCard 3.0 y pagos

Las cámaras de iOS y Android activan acciones nativas al detectar esquemas estructurados. En redes WiFi, escapa siempre `\`, `;`, `,` o `:` dentro del SSID o contraseña con una barra invertida:

```text
WIFI:T:WPA;S:Estudio\;Invitados;P:ClaveSegura\:2026;H:false;;
```

Los contactos emplean RFC 2426 **vCard 3.0**, los eventos utilizan bloques **iCalendar `VEVENT`** con marcas horarias UTC (`YYYYMMDDTHHMMSSZ`), y las acciones directas de mensajería, ubicación o pagos recurren a `SMSTO:`, `geo:` y BIP-21 `bitcoin:`:

```text
BEGIN:VCARD
VERSION:3.0
N:Mendoza;Lucía;;;
FN:Lucía Mendoza
ORG:Taller Norte
TEL;TYPE=CELL:+34600123456
EMAIL;TYPE=INTERNET:lucia@tallernorte.example
END:VCARD
```

```text
SMSTO:+34600987654:Reserva confirmada
geo:40.4168,-3.7038
bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.015
```

Dado que `vCard` e `iCalendar` crecen rápido en bytes, incluye solo campos imprescindibles (nombre, teléfono, correo y web) para conservar la matriz por debajo de la Versión 8–10 en tarjetas compactas de 25 mm.

## Ingeniería de impresión, contraste óptico, SVG y modo por lotes

Para asegurar escaneos consistentes en producción física y campañas masivas, aplica cuatro reglas ópticas:

1. **Relación distancia-tamaño 10:1**: El ancho impreso debe ser al menos una décima parte de la distancia de lectura (15 cm para un cartel leído a 1,5 m). Mantén cada módulo en **≥ 0,4 mm** en offset y **≥ 0,5 mm** en impresoras térmicas de etiquetas, evitando escalar PNG rasterizados que introducen bordes grises por suavizado (*anti-aliasing*).
2. **Zona silenciosa de 4 módulos**: Nunca recortes al ras de las esquinas; los algoritmos de binarización necesitan un margen limpio y uniforme de cuatro módulos por cada lado para aislar la matriz del texto circundante.
3. **Polaridad positiva y contraste elevado**: Usa módulos oscuros sobre fondo claro en todas las paradas de degradado. La polaridad invertida suele fallar en escáneres láser industriales y terminales TPV antiguos.
4. **Exportación vectorial y lotes ZIP**: Descarga **SVG** para imprenta —y limpia metadatos sobrantes antes de incrustarlo en web con el [Optimizador SVG](/es/herramientas/svg-optimizer)— o activa el **Modo por Lotes** para empaquetar decenas de códigos en un ZIP local. Si necesitas marcos con llamadas a la acción adicionales, prueba también [QR Code Studio](/es/herramientas/qr-code-studio).
