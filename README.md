# NetStack — OSI × TCP/IP

Comparación interactiva entre el **Modelo OSI** (ISO/IEC 7498-1) y el **Modelo TCP/IP** (RFC 1122/1123), pensada para entender de verdad cómo viaja un dato por la red — no solo memorizar las siete capas.

🔗 **[Ver el sitio en vivo](https://franciscomr22.github.io/ModeloOSI_TCP/)**

## Qué incluye

- **Capas lado a lado** — tarjetas expandibles de OSI y TCP/IP con conectores que muestran a qué grupo del otro modelo corresponde cada una, resaltado cruzado al pasar el mouse.
- **Catálogo de más de 100 protocolos** — buscador con `Ctrl+K`, fichas con resumen, detalle técnico, seguridad y buenas prácticas, y referencias a su RFC o estándar vigente.
- **Simulador de encapsulamiento** — una petición HTTP/2 cifrada con TLS 1.3 se encapsula capa por capa con tamaños reales de cabecera (byte a byte), con un inspector de bits al estilo de los diagramas RFC.
- **Flujos de comunicación** — diagramas de secuencia de handshakes reales (TCP de 3 vías, TLS 1.3, HTTP/3 sobre QUIC, QUIC 0-RTT) y un recorrido completo de "qué pasa al escribir una URL", con comparación de latencia en RTT.
- **Dónde el modelo no encaja** — una sección dedicada a protocolos que desbordan una sola capa de libro de texto (ARP, TLS, BGP, MPLS, QUIC, ICMP, IS-IS, DHCP) y por qué.
- **Modo práctica** — arrastra cada protocolo a su capa correcta (o toca y toca), con nivel fácil/difícil y modelo OSI o TCP/IP.
- **Guía rápida integrada** — un recorrido paso a paso de toda la interfaz, disponible en cualquier momento desde el botón de ayuda.
- Español/inglés, modo básico/técnico, y tema claro/oscuro con transición suave.

## Pila técnica

Next.js (App Router) · React · TypeScript · Tailwind CSS · shadcn/ui · Motion.

## Empezar

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

```bash
pnpm build    # build de producción
pnpm start    # servir el build
pnpm lint     # eslint .
```

La documentación técnica a fondo (arquitectura, decisiones de diseño, convenciones) está en [ARCHITECTURE.md](ARCHITECTURE.md).

## Despliegue

Publicado en GitHub Pages mediante GitHub Actions: cada push a `main` reconstruye y republica el sitio automáticamente.

## Autor

Francisco Mireles Rodríguez.
