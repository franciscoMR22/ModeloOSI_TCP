# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Sitio educativo interactivo de una sola página (**"NetStack"**) que compara el **Modelo OSI (ISO/IEC 7498-1)** con el **Modelo TCP/IP (RFC 1122)**: tarjetas de capa expandibles, conectores SVG que mapean capas entre modelos y un simulador paso a paso de encapsulamiento. El estilo visual es **glassmorphism** (vidrio esmerilado sobre gradientes mesh con orbes animados). Generado inicialmente con v0.app; autor: Francisco Mireles Rodriguez.

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (estilo `new-york`, Radix) · Motion 12 (`motion/react`, antes framer-motion; no importar desde `framer-motion`) · lucide-react · next-themes.

## Comandos

Gestor de paquetes: **pnpm** (existe `pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev      # servidor de desarrollo en http://localhost:3000
pnpm build    # build de producción
pnpm start    # servir el build
pnpm lint     # "eslint ." — ESLint NO está en devDependencies; hay que instalarlo antes
```

No hay tests. `next.config.mjs` tiene `typescript.ignoreBuildErrors: true`, así que `pnpm build` **no** detecta errores de tipos; para eso usa `pnpm exec tsc --noEmit`. También tiene `devIndicators: false` (quita el indicador flotante de `next dev`, la "N" con info de ruta/bundler, que solo existe en desarrollo).

Repositorio git en la rama `main`, con remoto en GitHub (`franciscoMR22/ModeloOSI_TCP`). El usuario hace los `push` él mismo.

## Arquitectura

**Página de una sola sección visible a la vez (sin scroll continuo).** [app/page.tsx](app/page.tsx) guarda `section: SectionId` (`hero | layers | trace | flows | misfits | practice`, tipo exportado desde `navbar.tsx`) y renderiza **solo** la sección activa dentro de `<AnimatePresence mode="wait">`; las demás ni se montan. Cambiar de sección se hace con `goTo(id)`: fija el estado y repone el scroll a 0 de golpe (`window.scrollTo({ behavior: "auto" })`), porque la suavidad la aporta el fundido, no el scroll. La transición (`SECTION_INITIAL/ENTER/EXIT` en `page.tsx`) es un cruce de opacidad con blur, sin solape (sale del todo antes de que entre lo nuevo) y sin resorte, para que se sienta como un fundido controlado y no un rebote. No hay anclas `href="#…"` ni `getElementById`/`scrollIntoView` de sección: cualquier navegación entre secciones pasa por `goTo` (la navbar) u `openProtocol` (que hace `goTo("layers")` y después fija `focus`). También guarda el idioma (`lang`, por defecto `"es"`), el nivel de explicación (`mode`) y la apertura de la búsqueda `Ctrl+K`.

**Datos de capas.** [lib/network-data.ts](lib/network-data.ts) contiene `OSI_LAYERS` (7), `TCPIP_LAYERS` (4) y el mapeo entre modelos. Los arrays van de la capa superior a la inferior (índice 0 = OSI L7 / TCP-IP L4). Cada capa tiene contenido de nivel básico (`summary`, `analogy`) y técnico (`overview`, `responsibilities[]` con `title` + `detail`, `header`, `addressing`, `services`, `devices`, `troubleshooting[]`). [components/layer-card.tsx](components/layer-card.tsx) muestra uno u otro según `mode`, en las pestañas Descripción / Protocolos / Diagnóstico (Diagnóstico solo en modo técnico).

**Catálogo de protocolos.** [lib/protocols/](lib/protocols/) contiene unas 100 fichas (`Protocol` en `types.ts`), un archivo por capa OSI (`l1.ts` … `l6.ts`, y `l7a.ts` + `l7b.ts`), agregadas en `index.ts` (`ALL_PROTOCOLS`, `PROTOCOLS_BY_ID`, `protocolsForOsi`, `protocolsForTcpip`).
- Cada protocolo se define **una sola vez**, en el archivo de su capa principal (`osi[0]`). `osi` lista todas las capas donde opera; los multicapa (ARP, TLS, BGP, MPLS…) llevan `multiLayerNote`. Las tarjetas TCP/IP se llenan con la unión de sus capas OSI vía `TCPIP_TO_OSI`: no dupliques entradas.
- `relations` solo puede referenciar ids existentes. Categorías y estados válidos: `labels.ts`.
- `lib/protocols/index.ts` es pesado y **se carga bajo demanda** con [hooks/use-protocol-catalog.ts](hooks/use-protocol-catalog.ts) (import dinámico con caché). No lo importes estáticamente desde un componente: meterías todo el texto en el bundle inicial. Importar solo tipos o `labels.ts` sí está bien.
- UI: [components/protocol-catalog.tsx](components/protocol-catalog.tsx) (chips agrupados por categoría, filtro, "ver todos") → [components/protocol-popover.tsx](components/protocol-popover.tsx) (popover Radix anclado al chip, pestañas Resumen / Técnico / Seguridad y práctica / Referencias; las relaciones navegan dentro del mismo popover con historial) y [components/protocol-search.tsx](components/protocol-search.tsx) (`Ctrl+K`, cmdk).
- Precisión: cita la especificación vigente (y qué reemplazó), y solo números de RFC o estándar verificados. `year` = primera especificación publicada.

**Simulador de encapsulamiento.** [lib/encapsulation.ts](lib/encapsulation.ts) modela una petición HTTP/2 (trama HEADERS) cifrada con TLS 1.3 sobre TCP/IPv4/Ethernet con tamaños reales: `computeEncapsulation()` calcula MSS, número de segmentos, relleno, trama y bytes en el cable (preámbulo + IFG); `buildSegments()` da los bloques visibles según la capa actual; `SIM_STEPS` tiene el texto de cada paso para envío y recepción (la recepción recorre los pasos al revés y cada capa quita solo lo suyo). La UI es [components/encapsulation-simulator.tsx](components/encapsulation-simulator.tsx) (sección `#trace`); el hero tiene una vista previa en bucle. Casos de referencia: segmento lleno = IP 1500 B, trama 1518 B, 1538 B en el cable.

**Cabeceras.** [lib/headers.ts](lib/headers.ts) define campo por campo (ancho en bits, ejemplo, explicación básica y técnica) Ethernet II, IPv4, IPv6, TCP, UDP, registro TLS 1.3 y trama HTTP/2. Los ejemplos pueden llevar `{marcadores}` que se llenan con `headerValues()`. [components/header-diagram.tsx](components/header-diagram.tsx) las dibuja en filas de 32 bits al estilo RFC; se usa en el inspector del simulador y en la pestaña «Cabecera» del popover (`HEADER_BY_PROTOCOL` asocia protocolo → cabecera).

**Flujos (handshakes y URL).** [lib/flows.ts](lib/flows.ts) define diagramas de secuencia: `HANDSHAKE_FLOWS` (TCP, HTTPS sobre TCP + TLS 1.3, HTTP/3 sobre QUIC, QUIC 0-RTT), `RTT_COMPARISON` y `URL_FLOW` (de presionar Enter a renderizar: HSTS, cachés, ARP, DNS iterativo, TCP, TLS, HTTP/2). Cada mensaje tiene `t` (envío en RTT; llega 0.5 RTT después), `osi`, `protocolId` del catálogo y texto `basic`/`technical`. UI: [components/sequence-diagram.tsx](components/sequence-diagram.tsx) + [components/flows-section.tsx](components/flows-section.tsx) (sección `#flows`). «Ver ficha del protocolo» llama a `openProtocol` de `page.tsx`, que toma la capa principal del catálogo (no la del mensaje) antes de fijar `focus`.

**Excepciones y práctica.** [lib/misfits.ts](lib/misfits.ts) lista protocolos que desbordan el modelo (ARP, TLS, BGP, MPLS, QUIC, ICMP, IS-IS, DHCP) con la capa «de libro» (`textbook`), las capas cuyas funciones realiza (`spans`, que puede diferir de `osi` en el catálogo) y sobre qué viaja; la UI es [components/misfits-section.tsx](components/misfits-section.tsx) (`#misfits`). [components/practice-section.tsx](components/practice-section.tsx) (`#practice`) es un ejercicio de arrastrar y soltar (Motion `drag` + `document.elementsFromPoint` sobre `[data-drop-zone]`, o tocar el chip y luego la capa): rondas de 8, modelo OSI o TCP/IP, nivel fácil (`EASY_IDS`, solo protocolos de una capa) o difícil (todo el catálogo; un multicapa es válido en cualquiera de sus capas `osi`). Carga el catálogo solo cuando la sección se acerca a la vista.

**i18n sin librería.** Solo hay 2 idiomas: `es | en` (`Language` y `L = Record<Language, string>` en [lib/i18n.ts](lib/i18n.ts)); no agregues otros. Existen dos patrones:
- Contenido de datos: campos `L` en `network-data.ts` y en `lib/protocols/*`.
- Textos fijos de la UI: un diccionario local por componente (`labels`, `texts`, `T`, `heroContent`, `navLabels`, `footerText`) indexado por `lang`.
Todo texto visible necesita ambas versiones. Los nombres de campo de las cabeceras se dejan en inglés, como en los RFC.

**Mapeo OSI ↔ TCP/IP (acoplado en varios archivos).**
- `TCPIP_TO_OSI` y `osiToTcpip()` en `network-data.ts` definen la correspondencia (TCP/IP 4→OSI 7,6,5; 3→4; 2→3; 1→2,1).
- [components/mapping-connectors.tsx](components/mapping-connectors.tsx) dibuja curvas Bézier en un SVG absoluto, midiendo con `getBoundingClientRect` los refs de las tarjetas (un ResizeObserver sobre el contenedor y cada tarjeta, agrupado con rAF). Convierte número OSI a índice con `7 - osiNum`. Se oculta en móvil (`hidden md:block`).
- Resaltado cruzado: `dual-column-section.tsx` guarda `hoveredGroup` (número de capa TCP/IP). Una capa OSI en hover resalta todo su grupo; las tarjetas reciben `isHighlighted`/`isDimmed` y los conectores `highlightedGroup` (línea resaltada y un paquete animado con `<animateMotion>`).
- [components/dual-column-section.tsx](components/dual-column-section.tsx) llena los arrays de refs y alinea la columna TCP/IP con un margen fijo (`md:mt-[150px]` en la capa de transporte). Si cambia la altura de las tarjetas, este valor se desalinea.
- [components/layer-card.tsx](components/layer-card.tsx) asigna colores con `colorStyles` indexado por el hex `layer.color`, y los íconos OSI con `OSI_ICONS[6 - index]`. Un color nuevo en los datos necesita su entrada en `colorStyles`. Distingue OSI de TCP/IP con `"standard" in layer` (OSI) frente a `rfc` (TCP/IP).

**Componentes shadcn** en [components/ui/](components/ui/): son generados; se usan `Button`, `DropdownMenu`, `Popover` y `Command`/`Dialog`. Para agregar más usa el CLI de shadcn con los alias de [components.json](components.json) (`@/components/ui`, `@/lib/utils`). El alias `@/*` apunta a la raíz del proyecto.

## Sistema de estilo glassmorphism

Todo está en [app/globals.css](app/globals.css) (el que importa `layout.tsx`):
- **Identidad "Talavera y azulejo"**: tokens en `:root` (claro: crema cálido + añil profundo + terracota) y `.dark` (oscuro: añil casi negro, con el mismo añil y terracota como brillo) en `oklch`, más las variables de vidrio `--glass-bg`, `--glass-border` y `--glass-shadow` con el mismo tinte cálido. `.mesh-gradient` añade [public/talavera-pattern.svg](public/talavera-pattern.svg) como textura repetible (celosía de diamantes con cuatrifolio, motivo de azulejo poblano) detrás de los dos resplandores radiales (añil arriba-izquierda, terracota abajo-derecha); la intensidad "moderada" ya está horneada en la opacidad del propio SVG, no se controla desde CSS. Antes de cambiar cualquier color, piensa en términos de esta identidad, no solo de "qué se ve bien".
- Bloque `@theme inline`: conecta los tokens con las utilidades de Tailwind (`bg-primary`, `rounded-lg`…), las fuentes (`--font-inter`, `--font-jetbrains`, definidas por `next/font` en `layout.tsx`) y las curvas de animación (`ease-out-expo`, `ease-in-out-soft`).
- Tokens de movimiento en `:root`: `--dur-fast/base/slow`, `--ease-out-expo`, `--glow-strength`. Hay una regla global de `prefers-reduced-motion` y `scroll-padding-top` para compensar la navbar fija.
- **Vidrio-talavera, no solo "glass":** `.glass-card` ya no es solo fondo translúcido + blur. Además lleva [public/talavera-crackle.svg](public/talavera-crackle.svg) como `background-image` (craquelado de vidriado cerámico, visible a través del blur) y un filo interior pintado de ocre vía `box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--accent) 38%, transparent)`, además de la sombra exterior de siempre. La navbar replica ambos (textura + filo) a mano en su `style` dinámico (`components/navbar.tsx`), porque su fondo ya depende del scroll vía `useMotionTemplate` y no puede usar la clase directamente.
  - `.talavera-cut`: silueta de octágono (`clip-path: polygon(...)`, por `objectBoundingBox` implícito al ser porcentajes) — la firma de forma del sistema en vez de esquinas redondeadas. En el medallón de ícono de cada `LayerCard` y en `GlassButton` (que por eso ya no usa `rounded-full`). No la pongas en superficies con scroll interno denso (catálogo de protocolos, popover, simulador): el recorte recto puede comerse contenido cerca del borde; resérvala para piezas pequeñas y contenidas, o para paneles decorativos grandes como el del hero.
  - `.talavera-heading`: el mismo degradado añil→terracota del `<h1>` del hero (`background-clip: text`), aplicado a los `<h2>` de cada sección para que se sienta un solo sistema. Un `<span>` hijo con su propio `text-*` explícito (como el "vs" de Capas) no hereda el degradado — pinta con su propio color, es el patrón esperado.
- `.glow-surface` (resplandor radial y borde iluminado que siguen al puntero mediante `--mx`/`--my`/`--glow-opacity`/`--glow-color`) y `.mesh-gradient` (fondo de la página, con [public/talavera-pattern.svg](public/talavera-pattern.svg) como textura de azulejo poblano repetida detrás de los dos resplandores radiales).
- **[components/glass-button.tsx](components/glass-button.tsx) (`<GlassButton glowColor size>`)** es un botón con el mismo vidrio esmerilado del resto del sitio: reutiliza la clase `.glass-card` (fondo translúcido + blur(16px) + borde y sombra suaves) y solo tiñe el fondo/borde con `glowColor` vía `color-mix`. Úsalo para acciones puntuales que quieras destacar más que un enlace de texto (como "Ver ficha" en Excepciones o "Abrir el simulador" en el hero). El sitio probó antes un botón de "vidrio líquido" (filtro SVG de turbulencia + `backdrop-filter: url(#filtro)`, al estilo Liquid Glass de Apple) y se descartó a favor de esta versión, más consistente con el resto del vidrio del sitio.
- **Usa [components/glass-card.tsx](components/glass-card.tsx) (`<GlassCard glowColor lift>`) para cualquier superficie de vidrio nueva.** Actualiza las variables del resplandor en un rAF, sin renders de React, y se desactiva en pantallas táctiles. `HOVER_SPRING` (exportado desde ahí) es el resorte estándar para los hover; úsalo en lugar de duraciones fijas.
- Navbar: todos los valores visuales (blur, opacidad del fondo, padding, ancho, sombra) se derivan de `useScroll` + `useSpring` con `useMotionTemplate`, sin estados booleanos. La sección activa se detecta con IntersectionObserver y se marca con una píldora `layoutId`.
- Convenciones de UI que se repiten: `glass-card rounded-2xl/3xl`, overlays translúcidos `bg-white/NN dark:bg-slate-900/NN`, acentos `bg-primary/10 border-primary/20`, micro-etiquetas `font-mono text-[10px] uppercase tracking-widest`, y animaciones de entrada con Motion (`initial/animate` o `whileInView` con `viewport={{ once: true }}`).
- **Paleta de las 7 capas OSI (añil → terracota), fuente única en [lib/encapsulation.ts](lib/encapsulation.ts) `LAYER_COLORS`**: L7 `#2B5F8A` (añil) · L6 `#1F7A82` (teal) · L5 `#2E8C6B` (teal-verde) · L4 `#6E9142` (oliva) · L3 `#B8862E` (ocre) · L2 `#C0572A` (terracota) · L1 `#8C3A1E` (óxido). `lib/network-data.ts` replica estos mismos hex en `OSI_LAYERS[].color`/`TCPIP_LAYERS[].color` (el TCP/IP toma el color de su capa OSI más alta); `components/layer-card.tsx` tiene su propio `colorStyles` keyed por esos hex con la familia de Tailwind más cercana (blue/cyan/teal/green/amber/orange/red); `components/mapping-connectors.tsx` tiene `mappingColors` para los 4 conectores TCP/IP. Si cambias un color de capa, estos cuatro lugares deben quedar en sincronía (`protocol-popover.tsx` ya no duplica la paleta: importa `LAYER_COLORS` de `lib/encapsulation.ts`).
- Fuentes: Inter (`--font-sans`) y JetBrains Mono (`--font-mono`) mediante `next/font`.

[styles/globals.css](styles/globals.css) es la plantilla shadcn por defecto (grises neutros) y **no está importada**; no la edites pensando que afecta la app.

## Pendiente / notas

- La columna TCP/IP se alinea con un margen fijo (`md:mt-[150px]`), no con cálculo.
- Las referencias técnicas de los datos se corrigieron contra RFC 1122/1123, RFC 9113, RFC 5531 y la cláusula 7 de ISO/IEC 7498-1 (§7.1 = Aplicación … §7.7 = Física). Mantén ese nivel de precisión al agregar contenido.
