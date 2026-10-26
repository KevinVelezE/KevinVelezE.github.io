# Diseño aprobado: web personal de Kevin Vélez Escarria

Fecha de aprobación: 2026-10-26. Esta copia autocontenida conserva el diseño
acordado en `ideas/personal-website-design.md` del entorno de proyectos.

## Propósito

Presentar la trayectoria de Kevin ante posibles supervisores, colaboradores y
programas de posgrado. Priorizar investigación matemática, sin ocultar la
formación en electrónica y la experiencia de desarrollo. No presentar la web
como búsqueda de empleo ni atribuir grados o publicaciones inexistentes.

## Decisiones acordadas

- Primera versión exclusivamente en inglés.
- Astro estático, TypeScript y CSS; sin React, backend ni base de datos iniciales.
- GitHub Pages gratuito y futuro repositorio público; sin dominio de pago.
- Dirección visual A, elegida en boceto: fondo claro, azul y verde petróleo,
  tipografía editorial y geometría de proyecciones, en continuidad con GitHub.
- Una portada completa con navegación interna; proyectos extensos podrán tener
  páginas independientes. El explorador tomográfico será un proyecto separado.
- No mostrar secciones de software vacías ni proyectos futuros como disponibles.

## Alternativas consideradas

GitHub Pages frente a Cloudflare Pages: se eligió GitHub por sencillez y relación
con el perfil público. Cloudflare aporta vistas previas y repositorios privados,
pero no son necesarias para empezar. El resultado estático será portable.

Astro frente a React para toda la web: se eligió Astro porque predomina contenido
editorial; no se necesita una aplicación interactiva para presentar el perfil.

Portada completa frente a varias páginas temáticas: se eligió la primera para
evitar páginas con poco contenido y facilitar una lectura conjunta de la trayectoria.

Dirección A frente a B (señales e instrumentación con cabecera oscura): el usuario
prefirió A. La electrónica queda vinculada a medición y muestreo, sin circuitos
decorativos ni apariencia de terminal o dashboard.

## Contenido y navegación

Cabecera con nombre y enlaces internos a Mathematical work, Background y Contact.
Acceso visible a GitHub y, cuando esté verificado y autorizado, al CV descargable.

1. Presentación: nombre visible como título principal, formación e intereses en
   análisis de Fourier, problemas inversos y computación científica. La frase
   del perfil «Mathematics, through a computational lens» puede acompañarla.
   Ilustración original de objeto, proyecciones y medición; se identifica como
   conceptual, no como resultado numérico real.
2. Mathematical work: tesis de pregrado sobre retroproyección filtrada, con
   supervisor y lengua original; extended abstract de MAPI 4 con coautoría y
   datos contrastados con el perfil. No agruparlos bajo publicaciones arbitradas.
   Mencionar la charla sin duplicar artificialmente el mismo trabajo.
3. Background: matemáticas y tecnología en electrónica en Universidad del Valle;
   experiencia pública de desarrollo backend, sin detalles privados empresariales.
4. Contact: correo institucional principal y enlace al perfil de GitHub.

Fuente inicial de textos: perfil público de GitHub. Revisar coherencia con el CV
antes de incorporar fechas, cargos o datos adicionales. No modificar los
repositorios del CV ni del perfil de GitHub para construir este sitio.

## Materiales y aprobación

El boceto no autoriza copiar automáticamente PDFs, figuras o código. En desarrollo
se pueden usar enlaces a los documentos ya públicos del perfil, comprobando su
disponibilidad, sin importar material privado. Revisar y aprobar los destinos de
todos los enlaces antes del despliegue.

El CV local requiere verificar contenido y autorización antes de incluirlo. Si no
está listo, omitir temporalmente el enlace, sin botones vacíos o descargas ficticias.
No acceder ni copiar repositorios privados de investigación para esta primera web.

## Sistema visual propuesto por el implementador

Paleta: fondo #F8FAFC, texto #172B4D, azul #3156A4, verde #147D78 y divisores
#DCE4EF. Georgia para títulos y familia sans-serif del sistema para texto y
navegación; no descargar fuentes de terceros inicialmente.

Texto alineado a la izquierda, líneas de lectura moderadas y espacio suficiente.
En escritorio, presentación e ilustración en dos columnas; en móvil, una columna.
Los trabajos son entradas editoriales, no tarjetas repetitivas con estadísticas.
Sin animaciones automáticas ni cargas externas decorativas. No incluir modo oscuro
en esta primera versión; podrá evaluarse después.

## Implementación y límites

Proyecto independiente en `personal-website/`, sin inicializar Git ni crear remoto
de forma automática. Una sola página inicial, CSS responsive e ilustración SVG
local original; contenido y componentes simples.

Configurar URL de producción y base de rutas según el repositorio que se autorice:
el perfil actual ocupa `KevinVelezE/KevinVelezE`, distinto del repositorio de sitio
de usuario `KevinVelezE/KevinVelezE.github.io`. No asumir que este último existe
o está libre. El despliegue y su workflow se habilitan solo con autorización.

Sin formulario de contacto, cookies, analítica, servicios de pago, cargas de datos,
autenticación ni backend. El correo usa un enlace mailto. El explorador futuro no
condiciona las dependencias ni la arquitectura de esta entrega.

## Criterios de aceptación

- Presentación, trabajos, trayectoria y contacto en inglés, sin afirmaciones inventadas.
- Ningún proyecto inexistente, enlace privado, botón sin destino o sección de relleno.
- Navegación semántica, un título principal, jerarquía de encabezados y salto al contenido.
- Uso por teclado, foco visible, contraste WCAG AA y texto alternativo cuando proceda.
- Sin desbordamiento horizontal a 320 px y lectura cómoda en móvil y escritorio.
- La ilustración no comunica información esencial exclusivamente mediante color.
- Sin dependencias de fuentes, scripts o servicios externos en la página publicada.
- Comprobaciones de Astro/TypeScript y build correctos; pruebas adecuadas para
  navegación, estructura y enlaces; revisión real en navegador de móvil y escritorio.
- Entrega local revisable con instrucciones de ejecución y lista exacta de
  verificaciones realizadas y pendientes. No publicar automáticamente.

## Revisiones y autorizaciones posteriores

Revisión propia sin delegación: separar aprobación estética de publicación,
no asumir disponibilidad del CV ni del remoto, no presentar diagramas conceptuales
como resultados y no duplicar MAPI 4.

Pendiente: materiales descargables finales, inicialización de Git, repositorio
remoto, commits y despliegue. No bloquean la construcción local.

## Ajuste posterior aprobado: enlaces de documentos

Tras revisar la versión publicada, Kevin pidió abrir las páginas de los PDF en
GitHub (`/blob/main/papers/...`) en lugar de sus descargas `raw`. Los enlaces
visibles son «Read thesis (PDF)» y «Read abstract (PDF)». No se muestra el idioma
del documento ni «hosted on GitHub», ni en las fichas ni en los enlaces. La
clasificación académica, los autores y el contenido de los trabajos se conservan.
