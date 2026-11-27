---
metaTitle: "Convertidor de JSON a YAML Online | Especificación YAML 1.2"
metaDescription: "Convierta JSON a YAML 1.2 en su navegador evitando el problema de Noruega. Ideal para manifiestos de Kubernetes, Docker Compose, GitHub Actions y OpenAPI."
metaKeywords: "convertir json a yaml, yaml 1.2 vs 1.1, problema de noruega yaml, kubernetes yaml, docker compose, github actions, openapi yaml navegador"
title: "Convertidor de JSON a YAML 1.2 para Infraestructura"
shortDescription: "Genere manifiestos YAML limpios y seguros a partir de cargas JSON directamente en su navegador, aplicando las reglas de YAML 1.2 para prevenir errores de tipado en Kubernetes, Docker Compose y CI/CD."
faqs:
  - question: "¿Qué es el problema de Noruega en YAML y cómo lo previene esta herramienta?"
    answer: "En YAML 1.1, valores sin comillas como NO, yes, on u off se interpretaban automáticamente como booleanos, transformando el código de país de Noruega (NO) en false. Este convertidor aplica el esquema seguro de YAML 1.2 y entrecomilla de forma preventiva cualquier cadena ambigua para proteger la compatibilidad con analizadores antiguos."
  - question: "¿Por qué convertir JSON a YAML si YAML 1.2 es un superconjunto de JSON?"
    answer: "Aunque todo JSON válido puede ser leído por un parser YAML 1.2 estricto, el formato de bloques indentados de YAML resulta mucho más legible para humanos, elimina el ruido visual de llaves y comas, y permite añadir comentarios y bloques multilínea en archivos de Kubernetes, GitHub Actions y OpenAPI."
  - question: "¿Puedo elegir entre indentación de 2 o 4 espacios para Kubernetes y Docker Compose?"
    answer: "Sí. El estándar de facto en manifiestos de Kubernetes, Helm, Docker Compose y flujos de GitHub Actions emplea 2 espacios por nivel, aunque puede ajustar la indentación según la guía de estilo de su equipo."
  - question: "¿Cómo se representan las cadenas largas o con saltos de línea al pasar de JSON a YAML?"
    answer: "Las cadenas que contienen caracteres de nueva línea se convierten automáticamente al estilo de bloque literal (|), preservando la legibilidad exacta de scripts shell dentro de GitHub Actions o configuraciones embebidas en ConfigMaps de Kubernetes sin escapes \\n difíciles de leer."
  - question: "¿Es seguro pegar archivos de configuración con variables de entorno o secretos?"
    answer: "Sí. La conversión de JSON a YAML se realiza íntegramente en su navegador mediante ejecución local en cliente. No se transmiten datos por Internet ni se almacenan copias en ningún servidor remoto."
features:
  - "Serialización alineada con YAML 1.2 y protección automática contra ambigüedades de YAML 1.1"
  - "Entrecomillado inteligente para cadenas como NO, yes, on, off, números octales y marcas temporales"
  - "Formato automático de bloques multilínea (|) ideal para scripts CI/CD y ConfigMaps"
  - "Indentación configurable (2 espacios por defecto para Kubernetes, Helm y GitHub Actions)"
  - "Validación sintáctica instantánea del JSON de origen con reporte claro de errores"
useCases:
  - "Transformar respuestas JSON de kubectl o de la API de Kubernetes en manifiestos YAML editables"
  - "Convertir especificaciones OpenAPI / Swagger de JSON a formato YAML para mantenimiento en repositorio"
  - "Generar archivos docker-compose.yml y definiciones de servicios desde plantillas generadas por código"
  - "Preparar flujos de trabajo de GitHub Actions y GitLab CI con scripts multilínea legibles"
  - "Limpiar y estandarizar configuraciones de infraestructura como código antes de revisarlas en Pull Requests"
howToSteps:
  - "Pegue el objeto o arreglo JSON válido en el área de entrada o cargue un archivo de configuración local."
  - "Seleccione el nivel de indentación deseado (se recomienda 2 espacios para Kubernetes y Docker Compose)."
  - "Revise las opciones de entrecomillado estricto para proteger códigos de país o versiones como 1.0."
  - "Copie el documento YAML resultante o descárguelo como archivo .yml o .yaml listo para producción."
---

La gestión moderna de infraestructura en la nube depende de configuraciones declarativas legibles, reproducibles y auditables. Herramientas como Kubernetes, Docker Compose, GitHub Actions, Helm y OpenAPI adoptan YAML por su claridad estructural, aunque muchas APIs, utilidades CLI y generadores de plantillas producen su salida exclusivamente en JSON. Convertir de JSON a YAML mediante scripts simplistas suele introducir errores silenciosos de tipado que solo afloran al desplegar en el clúster.

Este convertidor transforma objetos JSON en YAML limpio y conforme a las especificaciones actuales directamente dentro de su navegador. Al ejecutarse al 100 % en el cliente sin transmitir datos por la red, resulta completamente seguro para convertir manifiestos internos, especificaciones OpenAPI privadas o definiciones de CI/CD manteniendo confidencialidad absoluta.

## Especificación YAML 1.2 frente a 1.1: el problema de Noruega y el entrecomillado seguro

Desde la publicación de **YAML 1.2**, la especificación se convirtió oficialmente en un superconjunto estricto de JSON mediante su *Core Schema*. Bajo YAML 1.2, únicamente los literales `true` y `false` se resuelven como booleanos, y los enteros octales requieren de forma explícita el prefijo `0o`, eliminando gran parte de la ambigüedad histórica del lenguaje.

Sin embargo, numerosas herramientas DevOps y librerías heredadas en Python, Ruby o Go continúan implementando reglas de **YAML 1.1**. En dicha versión existen más de veinte palabras clave (`yes`, `no`, `on`, `off`, `y`, `n`, en distintas combinaciones de mayúsculas) que se interpretan implícitamente como booleanos. De ahí surgió el célebre **problema de Noruega (*Norway problem*)**: en una lista de códigos de país ISO-3166 sin comillas (`SE`, `DK`, `NO`), un analizador 1.1 transforma `NO` en `false`, corrompiendo la configuración en producción.

Algo parecido ocurre con permisos Unix o versiones de software: en YAML 1.1, `0755` sin comillas puede interpretarse como entero octal (`493` en base decimal), `12:30` como número sexagesimal (`750`) y `"1.10"` sin comillas como flotante `1.1`. Para garantizar portabilidad total entre analizadores 1.2 modernos y parsers heredados, este serializador entrecomilla defensivamente cualquier cadena JSON cuyo texto coincida con literales legacy, prefijos octales, formatos horarios o números potenciales, preservando intacto el tipo de dato original.

## Caso práctico de DevOps: conversión de definición JSON a manifiesto Kubernetes y CI/CD

Suponga que recibe esta definición JSON generada por un servicio interno con códigos de país, variables de entorno y un comando multilínea de arranque:

```json
{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": { "name": "pagos", "labels": { "region": "NO" } },
  "spec": {
    "replicas": 3,
    "containers": [{
      "name": "api",
      "image": "ghcr.io/org/pagos:2.10",
      "command": ["/bin/sh", "-c", "echo \"Iniciando\"\nexec ./api"],
      "env": [{ "name": "MODO_ESTRICTO", "value": "on" }]
    }]
  }
}
```

1. **Valide el JSON de entrada**: El analizador verifica inmediatamente llaves, comillas y comas antes de iniciar la serialización para descartar errores sintácticos de origen.
2. **Seleccione indentación de 2 espacios**: Es la convención universal en Kubernetes, Helm, Docker Compose y GitHub Actions, facilitando diferencias limpias en Git.
3. **Verifique escalares protegidos y bloques literales**: Observe en la salida cómo tanto `"NO"` como `"on"` conservan comillas protectoras frente a analizadores YAML 1.1, mientras que el comando con `\n` se convierte en un bloque literal (`|-`) que suprime saltos finales innecesarios y evita escapes difíciles de leer:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pagos
  labels:
    region: "NO"
spec:
  replicas: 3
  containers:
    - name: api
      image: ghcr.io/org/pagos:2.10
      command:
        - /bin/sh
        - -c
        - |-
          echo "Iniciando"
          exec ./api
      env:
        - name: MODO_ESTRICTO
          value: "on"
```

## Tabla comparativa: comportamiento de escalares en YAML 1.1, YAML 1.2 y JSON

La siguiente matriz resume las divergencias críticas entre versiones de YAML y la solución segura emitida al convertir desde JSON:

| Valor sin comillas | En JSON | En YAML 1.1 | En YAML 1.2 | Salida segura emitida |
| :--- | :--- | :--- | :--- | :--- |
| `NO` / `yes` / `on` / `off` | Inválido | `boolean` (`false`/`true`) | `string` | `"NO"` / `"yes"` / `"on"` / `"off"` |
| `0755` (permiso Unix) | Inválido | `integer` octal (`493`) | `integer` (`755`) | `"0755"` si era texto JSON |
| `2026-11-27` | Inválido | Objeto Timestamp | `string` | `"2026-11-27"` |
| `1.10` | `number` (`1.1`) | `float` (`1.1`) | `float` (`1.1`) | `"1.10"` si era versión texto |
| `12:30` | Inválido | `integer` sexagesimal (`750`) | `string` | `"12:30"` |
| `~` | Inválido | `null` | `null` | `"~"` si era cadena literal |
| `"linea1\nlinea2"` | Escape `\n` | Bloque literal `\|` | Bloque literal `\|` | Bloque `\|` o `\|-` limpio |

## Riesgos en producción, anclas malinterpretadas y buenas prácticas de DevSecOps

Aunque JSON carece de anclas (`&`), alias (`*`) y etiquetas personalizadas (`!tag`), incorporar documentos YAML generados en pipelines reales de DevSecOps requiere vigilar cuatro detalles operativos esenciales.

En primer lugar, tenga cuidado con **expresiones de plantillas en GitHub Actions, Helm y Docker Compose**. Cadenas como `${{ secrets.TOKEN }}` o `${VAR:-default}` que comienzan con caracteres reservados en YAML (`{`, `[`, `*`, `&`, `!`, `@` o `%`) provocan errores de sintaxis inmediatos si se dejan sin comillas, ya que el analizador intenta interpretarlas como mapas en línea, alias o directivas. El serializador detecta estos caracteres iniciales y aplica comillas protectoras automáticamente.

En segundo lugar, recuerde que **las variables de entorno en Kubernetes (`env[].value`) deben ser siempre cadenas**. Si el JSON de origen incluye `"value": true` o `"value": 8080` como tipos no textuales, el servidor de API rechazará el manifiesto al validar el esquema OpenAPI del recurso. Convierta siempre esos valores a cadenas en el JSON antes de desplegar con `kubectl` o ArgoCD.

En tercer lugar, en especificaciones **OpenAPI 3.0 y 3.1**, los códigos de estado HTTP bajo `responses` (`"200"`, `"404"`, `"500"`) deben permanecer entrecomillados en YAML; emitir `200:` sin comillas rompe validadores estrictos y generadores de SDK que exigen claves de diccionario de tipo cadena. Por último, cuando incluya scripts embebidos en un `ConfigMap` de Kubernetes o pasos `run:` en flujos de trabajo, revise el indicador de recorte (`|` frente a `|-`) si la herramienta consumidora resulta sensible a la nueva línea final del bloque. También conviene verificar las reglas de estilo, los esquemas oficiales y los validadores automáticos del equipo antes de confirmar cambios en repositorios GitOps compartidos.
