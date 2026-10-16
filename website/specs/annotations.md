# Designer annotations: NS website

Sticky notes transcribed from the Figma file `eIwmOO5omtR1Tlhdjea0C6` (documentation section `54:92226`). The notes are written in Spanish by Bayardo Martinez. Each note's position is given as `~<px>`, its distance from the top of the page frame it sits beside (note y minus frame y).

> **Status: complete.** All 57 notes are transcribed (the last 25 were fetched in a second pass after the first pass hit the Figma MCP quota).

---

## Home

### Desktop

#### 54:102972 · ~377px · Hero
> El hero section tiene una imagen de fondo y tiene un degradado de la mitad para abajo en 100% para tener un mejor ajuste con la sección siguiente

**EN:** The hero section has a background image with a gradient that runs from the middle down to 100%, so it blends better into the next section.
**Build implication:** Hero gets a full-bleed background image with a gradient overlay over its lower half that fades to the next section's background.

#### 54:102992 · ~1032px · Client logos
> los logos van a estar animados de derecha a izquierda como una especie de GDC o marquesina

**EN:** The logos animate from right to left like a kind of ticker or marquee.
**Build implication:** A logo strip that scrolls right to left in an infinite CSS marquee loop. It must pause, or stay static, under `prefers-reduced-motion`.

#### 54:103012 · ~1600px · Services bento grid
> bento grid
> este componente tiene 2 seciones:
> 1- content
> 2- grid
> la sección content tiene una estructura de 1 columna con elementos eyebrown y titular
> la sección grid tiene 3 columnas usando CSS Grid
> el hover state es cambiar el fondo para mostrar una imágen, estos componentes son un gran botón para llevarte a la respectiva sección interna de cada servicio

**EN:** Bento grid. This component has 2 sections: 1) content, 2) grid. The content section is one column with an eyebrow and a headline. The grid section has 3 columns built with CSS Grid. On hover, a tile's background changes to show an image. Each tile is one large button that takes you to that service's internal page.
**Build implication:** A 3-column CSS Grid where every tile is a whole link to its service page, with a background image revealed on hover and on focus-visible.

#### 54:103052 · ~2424px · Mini call-out
> mini call-out
> con texto en mayúscula y usar el texto como máscara con una foto de relleno

**EN:** Mini call-out: uppercase text, with the text used as a mask over a photo fill.
**Build implication:** Uppercase display text with a photo clipped to the letterforms (`background-clip: text`), plus a solid-color fallback and accessible plain text.

#### 54:103062 · ~2602px · Mini call-out / general module
> mini call-out
> esta sección se complementa con el modulo general de dos columnas de contenido + multimedia

**EN:** Mini call-out. This section is paired with the general two-column module (content + multimedia).
**Build implication:** The mini call-out sits directly above a two-column general module (content + media) and reuses it.

#### 54:103072 · ~3143px · General module (illustration background)
> modulo general:
>  este módulo teien 2 columnas, en esta versión la primera columna está vacia y se muestra de fondo una ilustración/animación que ocupa todo el ancho del modulo
> la segunda columna tiene 4 componentes:
> 1- eyebrown
> 2- Titulo
> 3- parrafo
> 4- botón CTA
> Todos los componentes son opcionales y se pueden ocultar en base a las necesidades del contenido

**EN:** General module. This module has 2 columns. In this version the first column is empty, and an illustration or animation fills the full width of the module as its background. The second column has 4 elements: 1) eyebrow, 2) title, 3) paragraph, 4) CTA button. All of them are optional and can be hidden depending on the content.
**Build implication:** A general two-column module with an optional full-width background illustration or animation. Eyebrow, title, paragraph and CTA are all optional props.

#### 54:103082 · ~3777px · General module (content on the left)
> modulo general:
> mismo módulo general que utiliza una imagen/animación de fondo que cubre todo el módulo.
> el módulo general puede variar el contendio de sus dos columnas en base a lo que se requiera, esta opción teien el contenido al lado izquierdo y el anterior al lado derecho

**EN:** General module: the same general module, using a background image or animation that covers the whole module. The general module can swap the content of its two columns as needed. This variant has the content on the left; the previous one had it on the right.
**Build implication:** The general module needs a `contentSide: left | right` (or reverse) option.

#### 54:103102 · ~4571px · Bento grid (2-column header)
> bento grid
> este componente tiene 2 seciones:
> 1- content
> 2- grid
> la sección content tiene una estructura de 2 columnas con elementos eyebrown, titular y párrafo
> la sección grid tiene 3 columnas usando CSS Grid

**EN:** Bento grid. This component has 2 sections: 1) content, 2) grid. The content section is two columns with an eyebrow, a headline and a paragraph. The grid section has 3 columns built with CSS Grid.
**Build implication:** The bento grid header supports a 1-column layout (eyebrow + title) and a 2-column layout (eyebrow + title, then paragraph).

#### 54:103112 · ~5344px · Call-out
> call-out
> con texto en mayúscula y usar el texto como máscara con una foto de relleno

**EN:** Call-out: uppercase text, with the text used as a mask over a photo fill.
**Build implication:** The full-size version of the text-mask call-out (same technique as the mini call-out).

#### 54:103132 · ~5929px · General module
> Módulo general

**EN:** General module.
**Build implication:** Another instance of the general two-column module.

#### 54:103142 · ~6367px · Columns module
> Módulo columnas
> Este módulo tiene variante de 3, 2 y 1 columna, se utiliza para:
> 1- contenido simple de texto que incluye:
> - número o ícono en la parte superior
> - titulo
> - descripción
> cada uno de estos elementos puede ser ocultado a disposición del contenido
> 2- Job description cards
> 3- blog posts

**EN:** Columns module. This module comes in 3-, 2- and 1-column variants. It is used for: 1) simple text content with a number or icon at the top, a title and a description, where each element can be hidden as the content requires; 2) job description cards; 3) blog posts.
**Build implication:** A `Columns` module with `columns: 1 | 2 | 3` whose slot accepts text items (each part optional), job cards or blog cards.

#### 57:103162 · ~6949px · General module with testimonials
> Módulo general
> esta aplicación del módulo general contempla que en una de las columnas se pueda integrar un componente de testimonios que funciona como un carrusel automatico que cambia de comentario después de X cantidad de tiempo

**EN:** General module. This use of the general module allows one of its columns to hold a testimonials component, which works as an automatic carousel that moves to the next comment after X amount of time.
**Build implication:** A testimonials carousel that auto-advances on a configurable interval. It needs pause on hover and focus, pause under reduced motion, and manual controls.

#### 57:103172 · ~7475px · NS Insights bento grid (blog)
> bento grid
> este componente tiene 2 seciones:
> 1- content
> 2- grid
> la sección content tiene una estructura de 1 columna con elementos eyebrown y titular
> la sección grid tiene 3 columnas usando CSS Grid
> cada caja del grid es un blog post que te lleva al blog respectivo
> en este componente la idea es que desde el CMS podas marcar el blog post para aparecer dentro de deste grid, el blog principal es el del centro, esto debería estar marcado en el CMS también plan Blog principal o blog secundario dentro del bento grid de NS insights del home

**EN:** Bento grid. This component has 2 sections: 1) content, 2) grid. The content section is one column with an eyebrow and a headline. The grid section has 3 columns built with CSS Grid. Each tile is a blog post that links to that post. The idea is that you can flag a blog post in the CMS so it appears in this grid. The main post is the one in the center, and that should also be set in the CMS, e.g. "main blog" or "secondary blog" within the Home NS Insights bento grid.
**Build implication:** CMS fields on posts for `featuredOnHome` and `homeSlot: main | secondary`. The main post goes in the center tile, and every tile links to its post.

#### 57:103182 · ~8198px · Banner
> Banner
> este componente tiene 2 seciones:
> 1- content
> - Titulo
> - subtitulo (opcional)
> 2- Button CTA (opcional)
> el componente es pantalla completa y de fondo se puede utilizar:
> - Fotografía
> - Animación/Video
> - Color sólido
> - Degradado

**EN:** Banner. This component has 2 sections: 1) content (title, optional subtitle), 2) an optional CTA button. The component is full-width, and its background can be a photo, an animation or video, a solid color, or a gradient.
**Build implication:** A full-bleed banner with `background: image | video | solid | gradient`, a required title, and an optional subtitle and CTA.

#### 57:103192 · ~8695px · SEO module (cities)
> SEO Module
> este componente tiene 2 seciones:
> 1- content
> - Eyebrown
> - Titulo
> - subtitulo (opcional)
> 2- Listado de ciudades
> el componente es pantalla completa con fondo de un color sólido, cada columna tiene un listado de ciudades que pueden ser escroleables, el scroll lo que hace es que hace la parte superior y la aprte inferior de la lista con transparencia para centrarse en el centro de la lista.
> cada columna/lista es independiente en el momento de hacer scroll

**EN:** SEO module. This component has 2 sections: 1) content (eyebrow, title, optional subtitle), 2) a list of cities. The component is full-width on a solid-color background. Each column holds a scrollable list of cities, and the top and bottom of each list fade to transparent so the eye focuses on the middle. Each column scrolls independently.
**Build implication:** Independently scrollable city-list columns with top and bottom fade masks (`mask-image` gradient). The lists must be keyboard-scrollable, and the cities are likely CMS or SEO data.

#### 57:103202 · ~9352px · Contact module
> Contact Module
> este componente tiene 2 seciones:
> 1- content
> - Titulo
> - subtitulo (opcional)
> 2- Contact Form
> el componente es pantalla completa con fondo de un color sólido, este componente de formulario varía con respecto a si es un New Project, Join our Team o General Inquiries
> para New Project se cambió el dropdown de servicios por una lista de chips clickeables que simplifiquen la selección del servicio requerido
> para Join our team se agrega la función de subir el portfolio

**EN:** Contact module. This component has 2 sections: 1) content (title, optional subtitle), 2) a contact form. The component is full-width on a solid-color background. The form changes depending on whether the inquiry is a New Project, Join our Team, or General Inquiries. For New Project, the services dropdown was replaced with clickable chips that make it easier to pick the service needed. For Join our Team, a portfolio upload is added.
**Build implication:** A contact form with an inquiry-type switch (New Project / Join our Team / General Inquiries). New Project uses multi-select service chips instead of a select, and Join our Team adds a file upload.

#### 57:103212 · ~10086px · Footer
> Footer Module
> este componente tiene 3 seciones:
> 1- content
> - general menu
> - subscribe to newsletter
> - explore carreers
> 2- Brand Name
> 3- Trail footer
> - logo
> - copyright
> - social media

**EN:** Footer module. This component has 3 sections: 1) content (general menu, newsletter subscription, explore careers), 2) the brand name, 3) a trailing footer (logo, copyright, social media).
**Build implication:** The footer has three bands: a menu / newsletter / careers row, a large brand-name wordmark, and a bottom bar with the logo, copyright and social links.

### Mobile

#### 54:103002 · ~355px · Hero CTA
> en mobile el botón se expande a cubrir el ancho del contenedor

**EN:** On mobile, the button expands to fill the width of its container.
**Build implication:** Hero CTA buttons go full-width below the mobile breakpoint.

#### 54:103042 · ~1666px · Services bento grid
> en mobile estos componentes tienen en vez de un hover, un press state. Funcionan igual a la versión desktop, son un botón completo para llevarte a la página de cada sesrvicio

**EN:** On mobile these components have a press state instead of a hover. They work the same as on desktop: each is one whole button that takes you to that service's page.
**Build implication:** Bento tiles show their image reveal on `:active` on touch devices (use `@media (hover: none)`), and the whole tile stays the link.

#### 57:103242 · ~6729px · Columns module
> Módulo columnas
> En mobile este módulo se vuelve vertical
> Este módulo tiene variante de 3, 2 y 1 columna, se utiliza para:
> 1- contenido simple de texto que incluye:
> - número o ícono en la parte superior
> - titulo
> - descripción
> cada uno de estos elementos puede ser ocultado a disposición del contenido
> 2- Job description cards
> 3- blog posts

**EN:** Columns module. On mobile this module stacks vertically. It comes in 3-, 2- and 1-column variants and is used for: 1) simple text content with a number or icon at the top, a title and a description, where each element can be hidden as needed; 2) job description cards; 3) blog posts.
**Build implication:** The columns collapse to a single stacked column on mobile.

#### 57:103232 · ~8166px · General module
> Módulo general
> en mobile el modulo general se vuelve vertical con las dos columnas una sobre la otra

**EN:** General module. On mobile the general module stacks vertically, with the two columns one above the other.
**Build implication:** The general module stacks its two columns on mobile.

#### 57:103222 · ~8964px · NS Insights bento grid (blog)
> bento grid
> este componente tiene 2 seciones:
> 1- content
> 2- grid
> la sección content tiene una estructura de 1 columna con elementos eyebrown y titular
> en mobile la sección pasa de ser un grid de 5 blog post a tener solo 3 blog post stacked
> en este componente la idea es que desde el CMS podas marcar el blog post para aparecer dentro de deste grid, el blog principal es el del centro, esto debería estar marcado en el CMS también plan Blog principal o blog secundario dentro del bento grid de NS insights del home

**EN:** Bento grid. This component has 2 sections: 1) content, 2) grid. The content section is one column with an eyebrow and a headline. On mobile, the section goes from a grid of 5 blog posts to only 3 posts, stacked. The idea is that you can flag a blog post in the CMS so it appears in this grid. The main post is the one in the center, and that should also be set in the CMS (e.g. "main blog" or "secondary blog" within the Home NS Insights bento grid).
**Build implication:** Desktop shows 5 CMS-flagged posts; mobile shows only 3, stacked (the main post plus 2 secondary).

#### 57:103312 · ~11902px · Footer
> Footer Module
> en mobile se vuelve una sola columna y el Newsletter subscription pasa a ser la primera parte del footer
> este componente tiene 3 seciones:
> 1- content
> - general menu
> - subscribe to newsletter
> - explore carreers
> 2- Brand Name
> 3- Trail footer
> - logo
> - copyright
> - social media

**EN:** Footer module. On mobile it becomes a single column, and the newsletter subscription moves to the top of the footer. The component has 3 sections: 1) content (general menu, newsletter subscription, explore careers), 2) the brand name, 3) a trailing footer (logo, copyright, social media).
**Build implication:** The mobile footer is a single column with the newsletter first, reordered with CSS `order` or grid areas.

---

## Services

### Desktop

#### 57:103252 · ~1445px · General module (illustration background)
> modulo general:
> este módulo tiene 2 columnas, en esta versión la primera columna está vacia y se muestra de fondo una ilustración/animación que ocupa todo el ancho del modulo
> la segunda columna tiene 4 componentes:
> 1- eyebrown
> 2- Titulo
> 3- parrafo
> 4- botón CTA
> Todos los componentes son opcionales y se pueden ocultar en base a las necesidades del contenido

**EN:** General module. This module has 2 columns. In this version the first column is empty, and an illustration or animation fills the full width of the module as its background. The second column has 4 elements: eyebrow, title, paragraph and CTA button. All are optional and can be hidden as the content requires.
**Build implication:** Same general module as on Home, with a full-width background illustration and optional content parts.

#### 57:103262 · ~2215px · Descriptive module (benefits)
> modulo descriptivo:
> este módulo tiene 3 columnas, dos para contenido y una para descripción
> la tercera columna tiene 3 componentes:
> 1- Titulo
> 2- parrafo
> 3-imagen
> la tercera columna va a cambiar de contenido en dependencia del beneficio seleccionado (en este caso 40 productive hours)

**EN:** Descriptive module. This module has 3 columns: two for content and one for the description. The third column has 3 elements: title, paragraph and image. The third column's content changes depending on which benefit is selected (in this case, "40 productive hours").
**Build implication:** A tabs or master-detail pattern: choosing a benefit in columns 1–2 swaps the detail panel in column 3. Use ARIA tabs semantics.

#### 57:103272 · ~3826px · Comparative module
> modulo comparativo:
> este módulo tiene 3 columnas para contenido
> las columnas tienen 3 componentes:
> 1- Titulo
> 2- icono
> 3-párrafo/bullet list
> este componente por default tiene las 3 colunmas expandidas, pero pueden ser colapsadas

**EN:** Comparative module. This module has 3 content columns. Each column has 3 elements: title, icon, and a paragraph or bullet list. By default all 3 columns are expanded on this component, but they can be collapsed.
**Build implication:** Three collapsible columns (disclosure pattern), expanded by default on desktop.

### Mobile

#### 57:103292 · ~2672px · Descriptive module
> modulo descriptivo:
> en mobile este módulo se vuelve una sola columna con 3 componentes:
> 1- Titulo
> 2- parrafo
> 3-imagen
> por defecto se muestra expandido el primer elemento

**EN:** Descriptive module. On mobile this module becomes a single column with 3 elements: title, paragraph and image. By default, the first item is shown expanded.
**Build implication:** On mobile, the benefit tabs become an accordion with the first item open.

#### 57:103282 · ~5263px · Comparative module
> modulo comparativo:
> este módulo tiene 3 columnas para contenido
> las columnas tienen 3 componentes:
> 1- Titulo
> 2- icono
> 3-párrafo/bullet list
> en mobile las columnas estan colapasdas por default y se expanden a decisión del usuario

**EN:** Comparative module. This module has 3 content columns. Each column has 3 elements: title, icon, and a paragraph or bullet list. On mobile the columns are collapsed by default and expand when the user chooses.
**Build implication:** The comparative module defaults to collapsed on mobile (expanded on desktop).

---

## Services Detail: Dev

### Desktop

#### 57:103322 · ~2401px · Services module
> modulo servicios:
> este módulo tiene dos secciones
> 1- Contenido (una columna de ancho)
> - eyebrown
> - titulo
> 2- servicio (2 columnas)
> columna 1:
> - icono
> - titulo
> - descripción
> - sub-servicios (chips)
> - CTA (opcional)
> Columna 2:
> -contenido multimedia

**EN:** Services module. This module has two sections: 1) content, one column wide (eyebrow, title); 2) service, two columns. Column 1 holds an icon, title, description, sub-services shown as chips, and an optional CTA. Column 2 holds multimedia content.
**Build implication:** A service row with an icon, title, description, sub-service chips and optional CTA beside a media slot. It repeats once per service.

#### 57:103408 · ~3969px · Chips module (tech stack marquee)
> chips module:
> este modulo contiene una cantidad X de lenguajes de programación que se mueven como marquesina, la fila superior y la inferior van en sentido derecha-izquierda y la central en sentido izquierda-derecha

**EN:** Chips module. This module contains any number of programming languages that move as a marquee. The top and bottom rows move right to left, and the middle row moves left to right.
**Build implication:** A three-row chip marquee where the rows alternate direction. The list is data-driven and the animation stops under reduced motion.

#### 57:103418 · ~5141px · FAQ
> FAQ module:
> este modulo tiene 2 columnas con componentes expandibles por cada pregunta

**EN:** FAQ module. This module has 2 columns, with an expandable item for each question.
**Build implication:** A two-column FAQ accordion with one disclosure per question.

### Mobile

#### 57:103438 · ~2770px · Services module
> modulo servicios:
> en mobile la imagen va primero
> este módulo tiene dos secciones
> 1- Contenido (una columna de ancho)
> - eyebrown
> - titulo
> 2- servicio (2 columnas)
> columna 1:
> - icono
> - titulo
> - descripción
> - sub-servicios (chips)
> - CTA (opcional)
> Columna 2:
> -contenido multimedia

**EN:** Services module. On mobile the image goes first. The module has two sections: (1) content, one column wide: eyebrow, title; (2) service, 2 columns: column 1 has icon, title, description, sub-services (chips), CTA (optional); column 2 has multimedia content.
**Build implication:** Header block + two-column service row; on mobile reorder so the media renders above the text (`order` / column-reverse).
#### 57:103428 · ~6173px · FAQ
> FAQ module:
> en mobile este modulo tiene 1 columna con componentes expandibles por cada pregunta

**EN:** FAQ module. On mobile this module is a single column with an expandable component per question.
**Build implication:** FAQ collapses from two columns to one; each question is an accordion item (`<details>`/button with `aria-expanded`).

---

## Case Studies

### Desktop

#### 57:103448 · ~939px · Featured case study (top)
> modulo case study:
> este módulo es al ancho del contenedor, tiene una imagen de fondo que viene del blog post. incluye titulo del post y los tags relacionados al post.
> en el CMS es importante dejar que pueda marcarse cualquier post como destacado para aparecer en esta parte superior

**EN:** Case study module. Container-width, with a background image that comes from the post. Includes the post title and its related tags. In the CMS it is important that any post can be marked as featured to appear in this top slot.
**Build implication:** Featured hero card driven by a CMS `featured` flag; image = featured image, title + tags from the post.
#### 57:103458 · ~1547px · Case study list
> modulo general
> para mostrar el resto de case studies vamos a utilizar el modulo general con 2 columnas

**EN:** General module. To show the rest of the case studies we will use the two-column general module.
**Build implication:** Remaining case studies render as a list of two-column general modules.

---

## Results / Industries / Case Studies

### Desktop

#### 57:103478 · ~288px · Hero
> hero case study
> imagen destacada de fondo
> brand name
> project name
> tags

**EN:** Case study hero: featured image as background, brand name, project name, tags.
**Build implication:** Hero fields map to CMS: featured image, brand name, project name, tags.
#### 57:103468 · ~1082px · Case study body
> modulo use case study:
> includes:
> - brand name
> - project title
> - brand logo image
> - brief description
> - image grid
> - strategy module description
> - image full width
> - design module description
> - images
> - client testimonial module
> - development section
> - images

**EN:** Use case study module. Includes: brand name, project title, brand logo image, brief description, image grid, strategy module description, full-width image, design module description, images, client testimonial module, development section, images.
**Build implication:** Case study CPT needs these ordered fields/blocks (logo, brief, image grid, strategy text, full-width image, design text, images, testimonial, development text, images).
#### 57:103498 · ~6833px · Columns module
> Módulo columnas
> Este módulo tiene variante de 3, 2 y 1 columna, se utiliza para:
> 1- contenido simple de texto que incluye:
> - número o ícono en la parte superior
> - titulo
> - descripción
> cada uno de estos elementos puede ser ocultado a disposición del contenido
> 2- Job description cards
> 3- blog posts

**EN:** Columns module. Comes in 3-, 2- and 1-column variants and is used for: (1) simple text content with a number or icon on top, a title and a description, each of which can be hidden as the content requires; (2) job description cards; (3) blog posts.
**Build implication:** One `Columns` component with `columns={1|2|3}` and three item types (text item with optional number/icon/title/description, job card, blog post card).

---

## About Us

### Desktop

#### 57:103528 · ~1105px · Mini call-out
> mini call-out
> con texto en mayúscula y usar el texto como máscara con una foto de relleno

**EN:** Mini call-out with uppercase text, using the text as a mask filled with a photo.
**Build implication:** Uppercase heading with `background-clip: text` over a photo.
#### 57:103538 · ~1283px · Mini call-out + general module
> mini call-out
> esta sección se complementa con el modulo general de dos columnas de contenido + multimedia

**EN:** Mini call-out. This section is complemented by the two-column general module (content + multimedia).
**Build implication:** Call-out followed by a two-column general module.
#### 57:103508 · ~3099px · Columns module
> Módulo columnas
> Este módulo tiene variante de 3, 2 y 1 columna, se utiliza para:
> 1- contenido simple de texto que incluye:
> - número o ícono en la parte superior
> - titulo
> - descripción
> cada uno de estos elementos puede ser ocultado a disposición del contenido
> 2- Job description cards
> 3- blog posts

**EN:** Columns module. Comes in 3-, 2- and 1-column variants and is used for: (1) simple text content with a number or icon on top, a title and a description, each of which can be hidden as the content requires; (2) job description cards; (3) blog posts.
**Build implication:** One `Columns` component with `columns={1|2|3}` and three item types (text item with optional number/icon/title/description, job card, blog post card).

---

## Careers

### Desktop

#### 57:103548 · ~1027px · Mini call-out
> mini call-out
> con texto en mayúscula y usar el texto como máscara con una foto de relleno NO USAR LA PARTE DE TEXTO DESCRIPTIVO DE 2 COLUMNAS

**EN:** Mini call-out with uppercase text, using the text as a mask filled with a photo. DO NOT USE THE 2-COLUMN DESCRIPTIVE TEXT PART.
**Build implication:** Text-mask call-out only; omit the two-column descriptive text variant here.
#### 57:103558 · ~2070px · Columns module
> Módulo columnas
> Este módulo tiene variante de 3, 2 y 1 columna, se utiliza para:
> 1- contenido simple de texto que incluye:
> - número o ícono en la parte superior
> - titulo
> - descripción
> cada uno de estos elementos puede ser ocultado a disposición del contenido
> 2- Job description cards
> 3- blog posts

**EN:** Columns module. Comes in 3-, 2- and 1-column variants and is used for: (1) simple text content with a number or icon on top, a title and a description, each of which can be hidden as the content requires; (2) job description cards; (3) blog posts.
**Build implication:** One `Columns` component with `columns={1|2|3}` and three item types (text item with optional number/icon/title/description, job card, blog post card).
#### 57:103518 · ~2753px · Chips module (passions marquee)
> chips module:
> este modulo contiene una cantidad X de cosas que le apasionen a alguien que se mueven como marquesina, la fila superior y la inferior van en sentido derecha-izquierda y la central en sentido izquierda-derecha

**EN:** Chips module. Contains X number of things someone is passionate about, moving as a marquee: the top and bottom rows go right-to-left and the middle row goes left-to-right.
**Build implication:** 3-row infinite chip marquee, rows 1 and 3 right-to-left, row 2 left-to-right; pause on reduced motion.
#### 57:103568 · ~4609px · Moodboard module
> moodboard module:
> este modulo contiene una serie de fotografías que asemejan un moodboard, por cuestiones de tiempo se espera que al inicio sea una imagen completa y luego se pueda ajustar o animar

**EN:** Moodboard module. Contains a series of photos resembling a moodboard. For time reasons, the first version is expected to be a single full image that can later be adjusted or animated.
**Build implication:** Ship as one static image first; animated collage is a later enhancement.
#### 57:103578 · ~5891px · Quote module
> quote module:
> este módulo es a una columna, es el mismo módulo usado en el home en la sección de testimonios

**EN:** Quote module. Single column; it is the same module used on Home in the testimonials section.
**Build implication:** Reuse the Home testimonial component in single-column mode.
#### 57:103588 · ~6489px · Columns module
> Módulo columnas
> Este módulo tiene variante de 3, 2 y 1 columna, se utiliza para:
> 1- contenido simple de texto que incluye:
> - número o ícono en la parte superior
> - titulo
> - descripción
> cada uno de estos elementos puede ser ocultado a disposición del contenido
> 2- Job description cards
> 3- blog posts

**EN:** Columns module. Comes in 3-, 2- and 1-column variants and is used for: (1) simple text content with a number or icon on top, a title and a description, each of which can be hidden as the content requires; (2) job description cards; (3) blog posts.
**Build implication:** One `Columns` component with `columns={1|2|3}` and three item types (text item with optional number/icon/title/description, job card, blog post card).

---

## Careers Job

### Desktop

#### 57:103598 · ~1025px · Job description
> modulo job description:
> this is a 2 column module with only text attributes that includes:
> - about NS
> - Jobe desription
> - Role expectations
> - Benefits

**EN:** Job description module: a 2-column, text-only module with About NS, Job description, Role expectations, Benefits.
**Build implication:** Job CPT fields: about, description, expectations, benefits (rich text), laid out in two columns.
#### 57:103608 · ~2621px · Columns module
> Módulo columnas
> Este módulo tiene variante de 3, 2 y 1 columna, se utiliza para:
> 1- contenido simple de texto que incluye:
> - número o ícono en la parte superior
> - titulo
> - descripción
> cada uno de estos elementos puede ser ocultado a disposición del contenido
> 2- Job description cards
> 3- blog posts

**EN:** Columns module. Comes in 3-, 2- and 1-column variants and is used for: (1) simple text content with a number or icon on top, a title and a description, each of which can be hidden as the content requires; (2) job description cards; (3) blog posts.
**Build implication:** One `Columns` component with `columns={1|2|3}` and three item types (text item with optional number/icon/title/description, job card, blog post card).

---

## NS Insights

### Desktop

#### 57:103618 · ~99px · General module (hero)
> modulo general:
> este módulo teien 2 columnas, en esta versión la primera columna está vacia y se muestra de fondo una ilustración/animación que ocupa todo el ancho del modulo
> la segunda columna tiene 4 componentes:
> 1- eyebrown
> 2- Titulo
> 3- parrafo
> 4- botón CTA
> Todos los componentes son opcionales y se pueden ocultar en base a las necesidades del contenido

**EN:** General module. This module has 2 columns; in this version the first column is empty and an illustration/animation spanning the full module width is shown as background. The second column has 4 components: eyebrow, title, paragraph, CTA button. All components are optional and can be hidden depending on the content.
**Build implication:** Hero = General module with optional eyebrow/title/paragraph/CTA (no CTA on Insights). Note the Insights frame actually shows text left, 3D art right.
#### 57:103725 · ~682px · Featured post (Main Blog Post)
> modulo case study:
> este módulo es al ancho del contenedor, tiene una imagen de fondo que viene del blog post. incluye titulo del post y los tags relacionados al post.
> en el CMS es importante dejar que pueda marcarse cualquier post como destacado para aparecer en esta parte superior

**EN:** Case study module (used for the featured post). Container-width, with a background image that comes from the blog post. Includes the post title and the post's related tags. In the CMS it is important that any post can be marked as featured to appear in this top slot.
**Build implication:** Featured post = the post flagged `featured` (WP sticky post or ACF boolean); background = featured image, title + tags.
#### 57:103659 · ~1244px · Tag grid (filters)
> tag grid:
> esta es la lista de tags que se incluyan en los blog posts, 3 filaes es el máximo a mostrar, 1 fila es el mínimo a mostrar

**EN:** Tag grid. This is the list of tags used in the blog posts; 3 rows is the maximum to show, 1 row the minimum.
**Build implication:** Tag filter chips come from WP tags; clamp to max 3 rows on desktop (overflow hidden / show more).
#### 57:103649 · ~1718px · Bento grid (posts)
> bento grid:
> a 3 column pinterest like grid to display blog posts
> Each blog post component has 3 elements on the CMS:
> 1- tag
> 2- title
> 3- image

**EN:** Bento grid: a 3-column Pinterest-like grid to display blog posts. Each blog post card has 3 CMS elements: tag, title, image.
**Build implication:** Masonry layout (CSS columns or grid-auto-rows masonry), card = tags + title + featured image.

### Mobile

#### 57:103715 · ~1319px · Tag grid (filters, mobile)
> tag grid:
> en mobile esta es la lista de tags que se incluyan en los blog posts, 4 fila es es el máximo a mostrar, 1 fila es el mínimo a mostrar

**EN:** Tag grid. On mobile this is the list of tags used in the blog posts; 4 rows is the maximum to show, 1 row the minimum.
**Build implication:** Clamp tag chips to max 4 rows on mobile.
#### 57:103745 · ~2392px · Bento grid (posts, mobile)
> bento grid:
> a 3 column pinterest like grid to display blog posts
> Each blog post component has 3 elements on the CMS:
> 1- tag
> 2- title
> 3- image

**EN:** Same note as desktop: 3-column Pinterest-like grid; each card has tag, title, image (the mobile frame shows it as a single column).
**Build implication:** Masonry collapses to 1 column on mobile.

---

## Blog Post

### Desktop

#### 57:103735 · ~807px · Blog post body (TOC + article)
> modulo blog post:
> este módulo teien 2 columnas,
> la primera contiene un desglose por topicos del blog post. Esto funciona si le das click a X tópico, lo esperado es que se haga un scroll hasta esa sección del blog post.
> también en esta columna se muestran los botones de share y un banner (opcional)
> en la columna principal se muestra el contenido del blog post, este conteindo puede incluir: - texto - multimedia
> al inicio de cada blog post tenemos un mini card del autor del artículo
> al final de cada artículo mostramos la tarjeta completa del autor del artículo

**EN:** Blog post module. This module has 2 columns. The first holds a breakdown of the post by topic: clicking a topic should scroll to that section of the post. This column also shows the share buttons and an optional banner. The main column shows the post content, which can include text and multimedia. Each post starts with a mini author card and ends with the author's full card.
**Build implication:** A sidebar table of contents generated from the post's headings, with anchor links and smooth scroll; share buttons; an optional CMS banner; rich-text and media body; a mini author card at the top and a full author card at the bottom.

---

## Contact Us

### Desktop

#### 57:103755 · ~336px · Contact hero
> Contact apge hero
> este hero es diferente alr esto por una simple razón:
> en dependencia de la opción selecionada se va a cambiar la fotografía mostrada, así como el titular cambiaría
> - New Project (Adriana o José Luis)
> - Join our Team (Clara)
> - General (foto grupal de los cheles)

**EN:** Contact page hero. This hero is different from the rest for one simple reason: depending on the selected option, the photo shown changes, and the headline changes too. New Project (Adriana or José Luis); Join our Team (Clara); General (group photo of the 'cheles').
**Build implication:** Tab state drives right-hand photo + headline. Note the later revised frames (1189:*) use Adriana+Jose / Maria Mercedes / Hansell instead of Clara / group photo; follow the revised frames.

---

## Cross-cutting rules

- **Marquees:** the client logos scroll right to left (Home). The tech-stack chips use 3 rows with alternating direction (Dev). Both are infinite loops and must respect `prefers-reduced-motion`.
- **Auto-advancing carousel:** testimonials inside the general module rotate after a configurable interval. Add pause, manual controls and a reduced-motion fallback.
- **General module** is the workhorse: two columns, an optional full-width background illustration, image or animation, a left/right content-side option, and optional eyebrow, title, paragraph and CTA. It stacks vertically on mobile.
- **Bento grids** use 3-column CSS Grid. Service tiles are whole-card links that reveal an image on hover (desktop) or press (mobile). The blog bento shows 5 posts on desktop and 3 stacked on mobile.
- **CMS-managed content:** the Home NS Insights bento posts are flagged in the CMS (`main` center tile vs `secondary`). The SEO city lists, programming-language chips, testimonials and blog content (TOC, author, optional banner) are all data-driven.
- **Text-mask call-outs:** uppercase text clipped over a photo (mini and full call-out).
- **Collapsible content:** the comparative module is expanded on desktop and collapsed on mobile. The descriptive module is tabs on desktop and an accordion on mobile with the first item open. The FAQ is a two-column accordion.
- **Optional parts everywhere:** eyebrow, subtitle, CTA, icon or number, and banner can each be hidden per instance.
- **Full-bleed sections** (banner, SEO, contact) take a background of photo, video or animation, solid color, or gradient.
- **Contact form** changes by inquiry type: New Project uses service chips, Join our Team adds a portfolio upload, plus General Inquiries.
- **Mobile:** columns stack, CTA buttons go full-width, hover becomes a press state, and the newsletter moves to the top of the footer.
- **Featured content flags:** any post can be flagged *featured* to fill the full-width top slot on NS Insights and Case Studies.
- **Tag filter chips** on NS Insights: max 3 rows desktop / 4 rows mobile, min 1 row.
- **Contact hero swaps photo + headline per selected tab** (New Business / Join Our Team / General Inquiries).
- **Chip marquees on Careers:** 3 rows, top and bottom right-to-left, middle left-to-right.
