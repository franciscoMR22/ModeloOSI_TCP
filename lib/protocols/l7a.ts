import type { Protocol } from "@/lib/protocols/types";

const rfc = (n: number) => `https://www.rfc-editor.org/rfc/rfc${n}`;

export const L7A_PROTOCOLS: Protocol[] = [
  {
    id: "http1",
    acronym: "HTTP/1.1",
    fullName: { es: "Protocolo de Transferencia de Hipertexto, versión 1.1", en: "Hypertext Transfer Protocol version 1.1" },
    osi: [7],
    category: "web",
    status: "current",
    bodies: ["IETF"],
    year: 1997,
    identifiers: ["TCP 80", "TCP 443 (HTTPS, con TLS)"],
    summary: {
      es: "HTTP es el idioma con el que tu navegador pide páginas, imágenes o datos a un servidor y este responde. HTTP/1.1 es la versión en texto legible que sostuvo la web durante más de 20 años y sigue en uso en todas partes.",
      en: "HTTP is the language your browser uses to ask a server for pages, images or data, and the server uses to answer. HTTP/1.1 is the human-readable text version that carried the web for over 20 years and is still used everywhere.",
    },
    analogy: {
      es: "Como pedir en una ventanilla: dices qué quieres (GET /menu), el empleado responde con un código (200 = aquí tienes, 404 = no existe) y te entrega el producto. En la misma ventanilla solo se atiende un pedido a la vez.",
      en: "Like ordering at a counter: you say what you want (GET /menu), the clerk replies with a code (200 = here you go, 404 = not found) and hands over the item. The same counter serves one order at a time.",
    },
    everyday: {
      es: "Cada página web, llamada a una API REST o descarga desde un navegador; con TLS se convierte en HTTPS.",
      en: "Every web page, REST API call or browser download; wrapped in TLS it becomes HTTPS.",
    },
    technical: [
      {
        es: "HTTP es un protocolo petición-respuesta sin estado. Una petición lleva una línea inicial (método, destino y versión, por ejemplo GET /index.html HTTP/1.1), campos de cabecera y un cuerpo opcional; la respuesta lleva un código de estado de tres dígitos (1xx informativo, 2xx éxito, 3xx redirección, 4xx error del cliente, 5xx error del servidor). Los métodos estándar son GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS y TRACE, y PATCH se añadió en RFC 5789.",
        en: "HTTP is a stateless request-response protocol. A request carries a start line (method, target and version, e.g. GET /index.html HTTP/1.1), header fields and an optional body; the response carries a three-digit status code (1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error). The standard methods are GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS and TRACE, with PATCH added in RFC 5789.",
      },
      {
        es: "Frente a HTTP/1.0 (RFC 1945, 1996), la versión 1.1 hizo obligatoria la cabecera Host (lo que permite alojamiento virtual por nombre), hizo persistentes las conexiones por defecto y añadió la codificación chunked para cuerpos de tamaño desconocido. El pipelining permite enviar varias peticiones sin esperar respuesta, pero las respuestas deben volver en orden: una respuesta lenta bloquea a las siguientes (bloqueo de cabeza de línea), por lo que los navegadores nunca lo activaron y en su lugar abren unas 6 conexiones TCP por servidor.",
        en: "Compared with HTTP/1.0 (RFC 1945, 1996), 1.1 made the Host header mandatory (enabling name-based virtual hosting), made connections persistent by default and added chunked transfer coding for bodies of unknown length. Pipelining lets a client send several requests without waiting, but responses must come back in order: one slow response blocks those behind it (head-of-line blocking), so browsers never enabled it and instead open about 6 TCP connections per server.",
      },
      {
        es: "La especificación se reorganizó en 2022: RFC 9110 define la semántica común a todas las versiones (métodos, códigos, cabeceras), RFC 9111 el caché y RFC 9112 la sintaxis de mensajes propia de HTTP/1.1. Estas reemplazan a la serie RFC 7230–7235 (2014), que a su vez había reemplazado a RFC 2616 (1999) y al primer RFC 2068 (1997).",
        en: "The specification was reorganised in 2022: RFC 9110 defines the semantics shared by every version (methods, status codes, headers), RFC 9111 caching, and RFC 9112 the HTTP/1.1-specific message syntax. They replace the RFC 7230–7235 series (2014), which had in turn replaced RFC 2616 (1999) and the original RFC 2068 (1997).",
      },
    ],
    howItWorks: [
      { es: "El cliente abre una conexión TCP al puerto 80 (o 443 y negocia TLS).", en: "The client opens a TCP connection to port 80 (or 443 and negotiates TLS)." },
      { es: "Envía la petición en texto: línea inicial, cabeceras (Host, User-Agent, Accept…), una línea vacía y el cuerpo si lo hay.", en: "It sends the request as text: start line, headers (Host, User-Agent, Accept…), an empty line and the body if any." },
      { es: "El servidor responde con la línea de estado (HTTP/1.1 200 OK), cabeceras como Content-Type y Content-Length o Transfer-Encoding: chunked, y el cuerpo.", en: "The server replies with the status line (HTTP/1.1 200 OK), headers such as Content-Type and Content-Length or Transfer-Encoding: chunked, and the body." },
      { es: "La conexión queda abierta para la siguiente petición hasta que alguien envía Connection: close o expira el tiempo de inactividad.", en: "The connection stays open for the next request until one side sends Connection: close or the idle timeout expires." },
    ],
    facts: [
      { label: { es: "Formato", en: "Format" }, value: { es: "Texto (ASCII), líneas terminadas en CRLF", en: "Text (ASCII), CRLF-terminated lines" } },
      { label: { es: "Transporte", en: "Transport" }, value: { es: "TCP (TLS para HTTPS)", en: "TCP (TLS for HTTPS)" } },
      { label: { es: "Estado", en: "State" }, value: { es: "Sin estado; las sesiones se simulan con cookies", en: "Stateless; sessions are emulated with cookies" } },
      { label: { es: "Multiplexación", en: "Multiplexing" }, value: { es: "No: una respuesta a la vez por conexión", en: "No: one response at a time per connection" } },
      { label: { es: "Especificación vigente", en: "Current specification" }, value: "RFC 9110, 9111, 9112 (2022)" },
    ],
    security: {
      es: "Sin TLS todo viaja en claro, incluidas cookies y contraseñas; HSTS (RFC 6797) obliga al navegador a usar siempre HTTPS. Las discrepancias entre Content-Length y Transfer-Encoding entre un proxy y el servidor permiten el request smuggling (desincronización de peticiones). También son comunes la inyección de cabeceras y la exposición de métodos como TRACE.",
      en: "Without TLS everything travels in cleartext, including cookies and passwords; HSTS (RFC 6797) forces the browser to always use HTTPS. Disagreement between a proxy and the server over Content-Length versus Transfer-Encoding enables request smuggling (request desync). Header injection and exposed methods such as TRACE are also common issues.",
    },
    tools: [
      { command: "curl -v http://example.com", description: { es: "Muestra la petición y la respuesta HTTP completas", en: "Shows the full HTTP request and response" } },
      { command: "curl -I https://example.com", description: { es: "Pide solo las cabeceras (método HEAD)", en: "Requests only the headers (HEAD method)" } },
      { command: "curl --http1.1 -v https://example.com", description: { es: "Fuerza HTTP/1.1 aunque el servidor ofrezca HTTP/2", en: "Forces HTTP/1.1 even if the server offers HTTP/2" } },
    ],
    wireshark: "http",
    relations: { dependsOn: ["tcp", "tls"], usedBy: ["websocket"], replacedBy: ["http2", "http3"] },
    specs: [
      { id: "RFC 9110", title: { es: "Semántica de HTTP", en: "HTTP Semantics" }, url: rfc(9110) },
      { id: "RFC 9111", title: { es: "Caché de HTTP", en: "HTTP Caching" }, url: rfc(9111) },
      { id: "RFC 9112", title: { es: "HTTP/1.1", en: "HTTP/1.1" }, url: rfc(9112) },
      { id: "RFC 1945", title: { es: "HTTP/1.0 (histórico)", en: "Hypertext Transfer Protocol -- HTTP/1.0 (historic)" }, url: rfc(1945) },
    ],
  },
  {
    id: "http2",
    acronym: "HTTP/2",
    fullName: { es: "Protocolo de Transferencia de Hipertexto, versión 2", en: "Hypertext Transfer Protocol version 2" },
    osi: [7],
    category: "web",
    status: "current",
    bodies: ["IETF"],
    year: 2015,
    identifiers: ["TCP 443 (ALPN \"h2\")"],
    summary: {
      es: "HTTP/2 mantiene el mismo significado que HTTP/1.1 (métodos, códigos, cabeceras) pero cambia cómo viaja: en binario y con muchas peticiones simultáneas por una sola conexión. Las páginas con muchos recursos cargan más rápido.",
      en: "HTTP/2 keeps the same meaning as HTTP/1.1 (methods, status codes, headers) but changes how it travels: in binary, with many simultaneous requests over a single connection. Pages with many resources load faster.",
    },
    analogy: {
      es: "En vez de una ventanilla que atiende un pedido a la vez, es una sola banda transportadora donde las piezas de muchos pedidos viajan intercaladas y cada una lleva la etiqueta de su pedido.",
      en: "Instead of a counter serving one order at a time, it is a single conveyor belt where pieces of many orders travel interleaved, each tagged with its order number.",
    },
    everyday: {
      es: "La mayoría de los sitios HTTPS lo usan; tu navegador lo negocia automáticamente durante el handshake TLS.",
      en: "Most HTTPS sites use it; your browser negotiates it automatically during the TLS handshake.",
    },
    technical: [
      {
        es: "HTTP/2 divide la comunicación en frames binarios con una cabecera de 9 bytes (longitud de 24 bits, tipo, flags y un identificador de stream de 31 bits). Cada petición-respuesta es un stream; los streams se intercalan en una misma conexión TCP, lo que elimina el bloqueo de cabeza de línea a nivel HTTP y la necesidad de abrir varias conexiones. Los tipos de frame incluyen DATA, HEADERS, SETTINGS, WINDOW_UPDATE, RST_STREAM, PING, GOAWAY, PUSH_PROMISE y CONTINUATION.",
        en: "HTTP/2 splits communication into binary frames with a 9-byte header (24-bit length, type, flags and a 31-bit stream identifier). Each request-response is a stream; streams are interleaved on one TCP connection, removing HTTP-level head-of-line blocking and the need for multiple connections. Frame types include DATA, HEADERS, SETTINGS, WINDOW_UPDATE, RST_STREAM, PING, GOAWAY, PUSH_PROMISE and CONTINUATION.",
      },
      {
        es: "Las cabeceras se comprimen con HPACK (RFC 7541), que usa una tabla estática de 61 entradas, una tabla dinámica por conexión y codificación Huffman; se diseñó así para evitar los ataques de compresión tipo CRIME. Cada stream y la conexión tienen control de flujo propio con WINDOW_UPDATE (ventana inicial de 65 535 bytes). En la práctica se usa solo sobre TLS, negociado con ALPN como \"h2\"; RFC 9113 declaró obsoleta la actualización desde HTTP/1.1 en claro (h2c por Upgrade).",
        en: "Headers are compressed with HPACK (RFC 7541), which uses a 61-entry static table, a per-connection dynamic table and Huffman coding; it was designed that way to resist CRIME-style compression attacks. Each stream and the connection have their own flow control via WINDOW_UPDATE (initial window 65,535 bytes). In practice it runs only over TLS, negotiated through ALPN as \"h2\"; RFC 9113 deprecated the cleartext upgrade from HTTP/1.1 (h2c via Upgrade).",
      },
      {
        es: "Server push permitía al servidor enviar recursos antes de que se pidieran, pero resultó difícil de usar bien y los navegadores lo retiraron (Chrome en 2022). Como todo va sobre un único flujo TCP, un segmento perdido sigue deteniendo a todos los streams hasta que se retransmite: el bloqueo de cabeza de línea se trasladó a TCP, y eso motivó HTTP/3. RFC 9113 (2022) reemplaza a RFC 7540 (2015) y abandona su esquema de prioridades en favor de RFC 9218.",
        en: "Server push let the server send resources before they were requested, but it proved hard to use well and browsers removed it (Chrome in 2022). Because everything rides one TCP flow, a lost segment still stalls every stream until it is retransmitted: head-of-line blocking moved down to TCP, which motivated HTTP/3. RFC 9113 (2022) replaces RFC 7540 (2015) and drops its priority scheme in favour of RFC 9218.",
      },
    ],
    howItWorks: [
      { es: "TLS con ALPN: el cliente ofrece \"h2\" y el servidor lo acepta en el handshake.", en: "TLS with ALPN: the client offers \"h2\" and the server accepts it in the handshake." },
      { es: "Prefacio: el cliente envía la cadena PRI * HTTP/2.0 seguida de un frame SETTINGS; el servidor responde con su propio SETTINGS.", en: "Preface: the client sends the string PRI * HTTP/2.0 followed by a SETTINGS frame; the server answers with its own SETTINGS." },
      { es: "Cada petición abre un stream (identificadores impares si los inicia el cliente) con un frame HEADERS comprimido por HPACK.", en: "Each request opens a stream (odd identifiers when client-initiated) with a HPACK-compressed HEADERS frame." },
      { es: "Las respuestas vuelven como HEADERS + DATA intercalados; GOAWAY cierra la conexión de forma ordenada.", en: "Responses come back as interleaved HEADERS + DATA frames; GOAWAY closes the connection gracefully." },
    ],
    facts: [
      { label: { es: "Formato", en: "Format" }, value: { es: "Binario, frames con cabecera de 9 B", en: "Binary, frames with a 9 B header" } },
      { label: { es: "Multiplexación", en: "Multiplexing" }, value: { es: "Sí, streams sobre una conexión TCP", en: "Yes, streams over one TCP connection" } },
      { label: { es: "Compresión de cabeceras", en: "Header compression" }, value: "HPACK (RFC 7541)" },
      { label: { es: "Negociación", en: "Negotiation" }, value: { es: "ALPN \"h2\" en TLS", en: "ALPN \"h2\" in TLS" } },
      { label: { es: "Tamaño de frame por defecto", en: "Default max frame size" }, value: "16 384 B" },
    ],
    security: {
      es: "La multiplexación abrió nuevos vectores de denegación de servicio: el ataque Rapid Reset (CVE-2023-44487, 2023) abría y cancelaba streams con RST_STREAM a gran velocidad y produjo algunos de los mayores DDoS registrados. Los servidores limitan streams concurrentes, tamaño de tablas HPACK y frames CONTINUATION para mitigar estos abusos.",
      en: "Multiplexing opened new denial-of-service vectors: the Rapid Reset attack (CVE-2023-44487, 2023) opened and cancelled streams with RST_STREAM at high speed and produced some of the largest DDoS attacks recorded. Servers cap concurrent streams, HPACK table size and CONTINUATION frames to mitigate such abuse.",
    },
    tools: [
      { command: "curl --http2 -v https://example.com", description: { es: "Negocia HTTP/2 y muestra el resultado de ALPN", en: "Negotiates HTTP/2 and shows the ALPN result" } },
      { command: "nghttp -nv https://nghttp2.org", description: { es: "Muestra frame por frame una sesión HTTP/2", en: "Shows an HTTP/2 session frame by frame" } },
    ],
    wireshark: "http2",
    relations: { dependsOn: ["tcp", "tls"], usedBy: ["grpc", "doh", "websocket"], replaces: ["http1"], replacedBy: ["http3"] },
    specs: [
      { id: "RFC 9113", title: { es: "HTTP/2", en: "HTTP/2" }, url: rfc(9113) },
      { id: "RFC 7541", title: { es: "HPACK: compresión de cabeceras para HTTP/2", en: "HPACK: Header Compression for HTTP/2" }, url: rfc(7541) },
      { id: "RFC 9218", title: { es: "Esquema extensible de prioridades para HTTP", en: "Extensible Prioritization Scheme for HTTP" }, url: rfc(9218) },
    ],
  },
  {
    id: "http3",
    acronym: "HTTP/3",
    fullName: { es: "Protocolo de Transferencia de Hipertexto, versión 3", en: "Hypertext Transfer Protocol version 3" },
    osi: [7],
    category: "web",
    status: "current",
    bodies: ["IETF"],
    year: 2022,
    identifiers: ["UDP 443 (QUIC, ALPN \"h3\")"],
    summary: {
      es: "HTTP/3 es la versión más reciente de HTTP y viaja sobre QUIC en lugar de TCP. Conecta más rápido, no se frena cuando se pierde un paquete y aguanta cambios de red, como pasar del Wi-Fi a los datos móviles.",
      en: "HTTP/3 is the newest version of HTTP and runs over QUIC instead of TCP. It connects faster, does not stall when a packet is lost and survives network changes such as moving from Wi-Fi to cellular data.",
    },
    everyday: {
      es: "Google, YouTube, Facebook y los sitios detrás de Cloudflare lo usan con los navegadores modernos, sobre todo en redes móviles.",
      en: "Google, YouTube, Facebook and sites behind Cloudflare use it with modern browsers, especially on mobile networks.",
    },
    technical: [
      {
        es: "HTTP/3 asigna cada petición-respuesta a un stream bidireccional de QUIC, de modo que la multiplexación, el control de flujo y la retransmisión los hace el transporte. Una pérdida solo detiene al stream afectado, lo que elimina el bloqueo de cabeza de línea que HTTP/2 sufría en TCP. El cifrado TLS 1.3 viene integrado en QUIC, y las conexiones reanudadas pueden enviar la petición en 0-RTT.",
        en: "HTTP/3 maps each request-response onto a bidirectional QUIC stream, so multiplexing, flow control and retransmission are handled by the transport. A loss only stalls the affected stream, eliminating the head-of-line blocking HTTP/2 suffered on TCP. TLS 1.3 encryption is built into QUIC, and resumed connections can send the request in 0-RTT.",
      },
      {
        es: "Las cabeceras se comprimen con QPACK (RFC 9204), una variante de HPACK con tabla estática de 99 entradas que usa streams unidireccionales separados para el codificador y el decodificador; así las actualizaciones de la tabla dinámica no reintroducen bloqueo entre streams. Otro stream unidireccional de control lleva SETTINGS y GOAWAY.",
        en: "Headers are compressed with QPACK (RFC 9204), a HPACK variant with a 99-entry static table that uses separate unidirectional encoder and decoder streams, so dynamic-table updates do not reintroduce blocking across streams. Another unidirectional control stream carries SETTINGS and GOAWAY.",
      },
      {
        es: "Como el cliente no puede saber de antemano si el servidor habla QUIC, lo descubre con la cabecera Alt-Svc (RFC 7838) de una respuesta previa por TCP o con el registro DNS HTTPS (RFC 9460), que anuncia \"h3\" antes de conectar. Si UDP 443 está bloqueado, los navegadores vuelven a HTTP/2 sobre TCP.",
        en: "Since the client cannot know beforehand whether the server speaks QUIC, it discovers it via the Alt-Svc header (RFC 7838) in an earlier TCP response or via the DNS HTTPS record (RFC 9460), which advertises \"h3\" before connecting. If UDP 443 is blocked, browsers fall back to HTTP/2 over TCP.",
      },
    ],
    howItWorks: [
      { es: "Descubrimiento: Alt-Svc: h3=\":443\" o un registro DNS HTTPS indica que el servidor admite HTTP/3.", en: "Discovery: Alt-Svc: h3=\":443\" or a DNS HTTPS record tells the client the server supports HTTP/3." },
      { es: "El cliente abre una conexión QUIC a UDP 443 con ALPN \"h3\" (1 RTT, o 0-RTT si reanuda).", en: "The client opens a QUIC connection to UDP 443 with ALPN \"h3\" (1 RTT, or 0-RTT on resumption)." },
      { es: "Cada extremo abre su stream de control y los streams de QPACK, e intercambian SETTINGS.", en: "Each side opens its control stream and the QPACK streams, and they exchange SETTINGS." },
      { es: "Cada petición usa un stream bidireccional con frames HEADERS y DATA; al terminar, el stream se cierra.", en: "Each request uses a bidirectional stream with HEADERS and DATA frames; when done, the stream closes." },
    ],
    facts: [
      { label: { es: "Transporte", en: "Transport" }, value: "QUIC (UDP)" },
      { label: { es: "Compresión de cabeceras", en: "Header compression" }, value: "QPACK (RFC 9204)" },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "Obligatorio (TLS 1.3 dentro de QUIC)", en: "Mandatory (TLS 1.3 inside QUIC)" } },
      { label: { es: "Bloqueo de cabeza de línea", en: "Head-of-line blocking" }, value: { es: "No entre streams", en: "None across streams" } },
      { label: { es: "Descubrimiento", en: "Discovery" }, value: { es: "Alt-Svc o registro DNS HTTPS", en: "Alt-Svc or DNS HTTPS record" } },
    ],
    security: {
      es: "Hereda las protecciones de QUIC: todo cifrado y límite anti-amplificación antes de validar la dirección. Las peticiones en 0-RTT pueden reenviarse, así que los servidores solo deben aceptarlas para métodos idempotentes. Como el tráfico va cifrado sobre UDP, los firewalls y proxies de inspección no lo ven, y muchas redes corporativas lo bloquean para forzar TCP.",
      en: "It inherits QUIC's protections: everything encrypted and an anti-amplification limit before address validation. 0-RTT requests can be replayed, so servers should accept them only for idempotent methods. Because traffic is encrypted over UDP, inspecting firewalls and proxies cannot see it, and many corporate networks block it to force TCP.",
    },
    tools: [
      { command: "curl --http3 -I https://cloudflare.com", description: { es: "Hace una petición por HTTP/3 (requiere curl con soporte QUIC)", en: "Makes a request over HTTP/3 (needs curl built with QUIC)" } },
      { command: "dig example.com HTTPS", description: { es: "Consulta el registro HTTPS que anuncia \"h3\"", en: "Queries the HTTPS record that advertises \"h3\"" } },
    ],
    wireshark: "http3",
    relations: { dependsOn: ["quic", "udp", "tls"], replaces: ["http2"] },
    specs: [
      { id: "RFC 9114", title: { es: "HTTP/3", en: "HTTP/3" }, url: rfc(9114) },
      { id: "RFC 9204", title: { es: "QPACK: compresión de campos para HTTP/3", en: "QPACK: Field Compression for HTTP/3" }, url: rfc(9204) },
      { id: "RFC 9460", title: { es: "Registros DNS SVCB y HTTPS", en: "Service Binding and Parameter Specification via the DNS (SVCB and HTTPS RRs)" }, url: rfc(9460) },
      { id: "RFC 7838", title: { es: "Servicios alternativos de HTTP (Alt-Svc)", en: "HTTP Alternative Services" }, url: rfc(7838) },
    ],
  },
  {
    id: "websocket",
    acronym: "WebSocket",
    fullName: { es: "Protocolo WebSocket", en: "The WebSocket Protocol" },
    osi: [7],
    category: "web",
    status: "current",
    bodies: ["IETF"],
    year: 2011,
    identifiers: ["TCP 80 (ws://)", "TCP 443 (wss://)"],
    summary: {
      es: "WebSocket abre un canal permanente y bidireccional entre el navegador y el servidor, para que ambos puedan enviarse mensajes en cualquier momento sin tener que repetir peticiones HTTP. Es lo que permite chats, notificaciones y cotizaciones en tiempo real.",
      en: "WebSocket opens a persistent, two-way channel between browser and server so either side can send messages at any time without repeating HTTP requests. It is what powers chats, notifications and live price tickers.",
    },
    analogy: {
      es: "HTTP es como enviar cartas y esperar respuesta a cada una; WebSocket es colgar el teléfono una sola vez al inicio y dejar la llamada abierta para hablar cuando haga falta.",
      en: "HTTP is like sending letters and waiting for each reply; WebSocket is dialling once and keeping the call open to talk whenever needed.",
    },
    everyday: {
      es: "Chats web, juegos en el navegador, tableros colaborativos y actualizaciones en vivo de marcadores o cotizaciones.",
      en: "Web chats, browser games, collaborative whiteboards and live score or price updates.",
    },
    technical: [
      {
        es: "La conexión empieza como una petición HTTP/1.1 GET con Upgrade: websocket y una cabecera Sec-WebSocket-Key aleatoria. El servidor responde 101 Switching Protocols con Sec-WebSocket-Accept, que es el Base64 del SHA-1 de la clave concatenada con el GUID fijo 258EAFA5-E914-47DA-95CA-C5AB0DC85B11; eso demuestra que el servidor entiende WebSocket. A partir de ahí la misma conexión TCP transporta frames WebSocket, no HTTP.",
        en: "The connection starts as an HTTP/1.1 GET with Upgrade: websocket and a random Sec-WebSocket-Key header. The server answers 101 Switching Protocols with Sec-WebSocket-Accept, the Base64 of the SHA-1 of the key concatenated with the fixed GUID 258EAFA5-E914-47DA-95CA-C5AB0DC85B11, proving it understands WebSocket. From then on the same TCP connection carries WebSocket frames, not HTTP.",
      },
      {
        es: "Cada frame lleva el bit FIN, un opcode (0x1 texto UTF-8, 0x2 binario, 0x0 continuación, 0x8 cierre, 0x9 ping, 0xA pong) y una longitud de 7 bits ampliable a 16 o 64 bits; la cabecera mínima es de 2 bytes. Todo frame del cliente al servidor debe ir enmascarado con una clave de 32 bits, no por confidencialidad sino para impedir el envenenamiento de caché en proxies intermedios que malinterpreten el tráfico.",
        en: "Each frame carries the FIN bit, an opcode (0x1 UTF-8 text, 0x2 binary, 0x0 continuation, 0x8 close, 0x9 ping, 0xA pong) and a 7-bit length extendable to 16 or 64 bits; the minimum header is 2 bytes. Every client-to-server frame must be masked with a 32-bit key, not for confidentiality but to prevent cache poisoning of intermediary proxies that might misparse the traffic.",
      },
      {
        es: "RFC 6455 (2011) define el protocolo sobre HTTP/1.1. RFC 8441 permite llevar WebSocket dentro de un stream de HTTP/2 con el método CONNECT extendido, y RFC 9220 hace lo mismo para HTTP/3. Los subprotocolos de aplicación (por ejemplo STOMP o MQTT sobre WebSocket) se negocian con Sec-WebSocket-Protocol.",
        en: "RFC 6455 (2011) defines the protocol over HTTP/1.1. RFC 8441 carries WebSocket inside an HTTP/2 stream using extended CONNECT, and RFC 9220 does the same for HTTP/3. Application subprotocols (e.g. STOMP or MQTT over WebSocket) are negotiated with Sec-WebSocket-Protocol.",
      },
    ],
    howItWorks: [
      { es: "El cliente envía GET con Upgrade: websocket, Connection: Upgrade, Sec-WebSocket-Version: 13 y Sec-WebSocket-Key.", en: "The client sends a GET with Upgrade: websocket, Connection: Upgrade, Sec-WebSocket-Version: 13 and Sec-WebSocket-Key." },
      { es: "El servidor responde 101 Switching Protocols con el Sec-WebSocket-Accept calculado.", en: "The server replies 101 Switching Protocols with the computed Sec-WebSocket-Accept." },
      { es: "Ambos intercambian frames de texto o binarios en cualquier dirección; ping/pong mantienen viva la conexión.", en: "Both exchange text or binary frames in either direction; ping/pong keep the connection alive." },
      { es: "Cierre: un frame Close con código de estado (1000 = normal) que el otro extremo devuelve.", en: "Close: a Close frame with a status code (1000 = normal) that the peer echoes back." },
    ],
    facts: [
      { label: { es: "Esquemas", en: "Schemes" }, value: "ws:// , wss:// (TLS)" },
      { label: { es: "Handshake", en: "Handshake" }, value: { es: "HTTP Upgrade → 101 Switching Protocols", en: "HTTP Upgrade → 101 Switching Protocols" } },
      { label: { es: "Cabecera de frame", en: "Frame header" }, value: { es: "2–14 B (+4 B de máscara del cliente)", en: "2–14 B (+4 B client mask)" } },
      { label: { es: "Dirección", en: "Direction" }, value: { es: "Full-duplex", en: "Full-duplex" } },
      { label: { es: "Sobre HTTP/2 y HTTP/3", en: "Over HTTP/2 and HTTP/3" }, value: "RFC 8441, RFC 9220" },
    ],
    security: {
      es: "Los navegadores no aplican la política de mismo origen a WebSocket: el servidor debe validar la cabecera Origin, o un sitio malicioso puede abrir una conexión con las cookies de la víctima (Cross-Site WebSocket Hijacking). Conviene usar siempre wss://, autenticar en el handshake y limitar el tamaño de mensajes.",
      en: "Browsers do not apply the same-origin policy to WebSocket: the server must validate the Origin header, or a malicious site can open a connection with the victim's cookies (Cross-Site WebSocket Hijacking). Always use wss://, authenticate during the handshake and cap message size.",
    },
    tools: [
      { command: "websocat wss://echo.websocket.org", description: { es: "Cliente WebSocket de línea de comandos", en: "Command-line WebSocket client" } },
      { command: "curl -v -H \"Connection: Upgrade\" -H \"Upgrade: websocket\" -H \"Sec-WebSocket-Version: 13\" -H \"Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\" http://example.com/ws", description: { es: "Prueba a mano el handshake de actualización", en: "Tests the upgrade handshake by hand" } },
    ],
    wireshark: "websocket",
    relations: { dependsOn: ["http1", "tcp", "tls"], usedBy: ["mqtt", "xmpp"] },
    specs: [
      { id: "RFC 6455", title: { es: "El protocolo WebSocket", en: "The WebSocket Protocol" }, url: rfc(6455) },
      { id: "RFC 8441", title: { es: "WebSocket sobre HTTP/2", en: "Bootstrapping WebSockets with HTTP/2" }, url: rfc(8441) },
      { id: "RFC 9220", title: { es: "WebSocket sobre HTTP/3", en: "Bootstrapping WebSockets with HTTP/3" }, url: rfc(9220) },
    ],
  },
  {
    id: "grpc",
    acronym: "gRPC",
    fullName: { es: "gRPC (framework de llamadas a procedimiento remoto)", en: "gRPC (remote procedure call framework)" },
    osi: [7],
    category: "web",
    status: "current",
    bodies: ["Google", "CNCF"],
    year: 2015,
    identifiers: ["TCP 443 (HTTP/2)"],
    summary: {
      es: "gRPC permite que un programa llame funciones de otro programa en otra máquina como si fueran locales. Define la interfaz en un archivo .proto, genera el código cliente y servidor en muchos lenguajes y envía los datos en binario compacto sobre HTTP/2.",
      en: "gRPC lets a program call functions of another program on another machine as if they were local. You define the interface in a .proto file, generate client and server code in many languages, and data travels as compact binary over HTTP/2.",
    },
    everyday: {
      es: "Comunicación entre microservicios en Kubernetes, APIs de Google Cloud y los planos de control de Envoy e Istio.",
      en: "Microservice-to-microservice traffic in Kubernetes, Google Cloud APIs and the Envoy and Istio control planes.",
    },
    technical: [
      {
        es: "Google liberó gRPC en 2015 como sucesor abierto de su sistema interno Stubby, y desde 2017 es un proyecto de la CNCF. Los servicios y mensajes se describen en Protocol Buffers; protoc genera stubs tipados. Cada llamada es una petición HTTP/2 POST a la ruta /paquete.Servicio/Método con content-type application/grpc, y cada mensaje va precedido por 1 byte de indicador de compresión y 4 bytes de longitud.",
        en: "Google open-sourced gRPC in 2015 as the open successor of its internal Stubby system, and it has been a CNCF project since 2017. Services and messages are described in Protocol Buffers; protoc generates typed stubs. Each call is an HTTP/2 POST to the path /package.Service/Method with content-type application/grpc, and each message is prefixed by a 1-byte compression flag and a 4-byte length.",
      },
      {
        es: "Hay cuatro tipos de RPC: unario (una petición, una respuesta), streaming del servidor, streaming del cliente y streaming bidireccional, todos aprovechando los streams de HTTP/2. El resultado se envía en los trailers HTTP (grpc-status y grpc-message), después del cuerpo, con 17 códigos de estado propios (0 OK, 4 DEADLINE_EXCEEDED, 14 UNAVAILABLE…). El cliente fija un plazo (deadline) que viaja en la cabecera grpc-timeout y se propaga entre servicios.",
        en: "There are four RPC types: unary (one request, one response), server streaming, client streaming and bidirectional streaming, all built on HTTP/2 streams. The outcome is sent in HTTP trailers (grpc-status and grpc-message), after the body, with 17 gRPC-specific status codes (0 OK, 4 DEADLINE_EXCEEDED, 14 UNAVAILABLE…). The client sets a deadline carried in the grpc-timeout header and propagated across services.",
      },
      {
        es: "La dependencia de trailers y de control fino de HTTP/2 impide usarlo directamente desde navegadores; para ellos existe gRPC-Web a través de un proxy. No es un estándar de la IETF: su especificación de protocolo se publica en el repositorio del proyecto.",
        en: "Its reliance on trailers and fine-grained HTTP/2 control prevents direct use from browsers; gRPC-Web through a proxy exists for that. It is not an IETF standard: its wire protocol specification is published in the project repository.",
      },
    ],
    howItWorks: [
      { es: "El desarrollador define el servicio en un .proto y genera cliente y servidor con protoc.", en: "The developer defines the service in a .proto file and generates client and server with protoc." },
      { es: "El cliente abre una conexión HTTP/2 (normalmente con TLS) y envía HEADERS: POST /pkg.Servicio/Metodo, te: trailers, grpc-timeout.", en: "The client opens an HTTP/2 connection (usually with TLS) and sends HEADERS: POST /pkg.Service/Method, te: trailers, grpc-timeout." },
      { es: "Los mensajes Protobuf viajan en frames DATA con el prefijo de 5 bytes, en una o ambas direcciones.", en: "Protobuf messages travel in DATA frames with the 5-byte prefix, in one or both directions." },
      { es: "El servidor cierra el stream con trailers grpc-status (0 = OK) y opcionalmente grpc-message.", en: "The server closes the stream with grpc-status trailers (0 = OK) and optionally grpc-message." },
    ],
    facts: [
      { label: { es: "Transporte", en: "Transport" }, value: "HTTP/2" },
      { label: { es: "Serialización", en: "Serialization" }, value: { es: "Protocol Buffers (por defecto)", en: "Protocol Buffers (default)" } },
      { label: { es: "Tipos de RPC", en: "RPC types" }, value: { es: "Unario, streaming de servidor, de cliente y bidireccional", en: "Unary, server, client and bidirectional streaming" } },
      { label: { es: "Códigos de estado", en: "Status codes" }, value: { es: "17 (0–16), en trailers HTTP", en: "17 (0–16), in HTTP trailers" } },
      { label: { es: "Gobernanza", en: "Governance" }, value: { es: "Proyecto CNCF (originado en Google)", en: "CNCF project (originated at Google)" } },
    ],
    security: {
      es: "gRPC admite TLS y TLS mutuo (mTLS) para autenticar servicios, además de credenciales por llamada como tokens OAuth 2.0 en metadatos. La reflexión del servidor, útil para depurar, expone el esquema completo del servicio y conviene desactivarla en producción.",
      en: "gRPC supports TLS and mutual TLS (mTLS) to authenticate services, plus per-call credentials such as OAuth 2.0 tokens in metadata. Server reflection, handy for debugging, exposes the full service schema and should be disabled in production.",
    },
    tools: [
      { command: "grpcurl -plaintext localhost:50051 list", description: { es: "Lista los servicios de un servidor con reflexión activada", en: "Lists services of a server with reflection enabled" } },
      { command: "grpcurl -d '{\"name\":\"x\"}' host:443 pkg.Service/Method", description: { es: "Invoca un método con un mensaje en JSON", en: "Invokes a method with a JSON message" } },
    ],
    wireshark: "grpc",
    relations: { dependsOn: ["http2", "protobuf", "tls", "tcp"] },
    specs: [
      { id: "gRPC over HTTP/2", title: { es: "Protocolo gRPC sobre HTTP/2", en: "gRPC over HTTP2 protocol" }, url: "https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md" },
      { id: "gRPC status codes", title: { es: "Códigos de estado de gRPC", en: "gRPC status codes" }, url: "https://grpc.io/docs/guides/status-codes/" },
    ],
  },
  {
    id: "dns",
    acronym: "DNS",
    fullName: { es: "Sistema de Nombres de Dominio", en: "Domain Name System" },
    osi: [7],
    category: "naming",
    status: "current",
    bodies: ["IETF"],
    year: 1987,
    identifiers: ["UDP 53", "TCP 53"],
    summary: {
      es: "DNS traduce nombres fáciles de recordar, como example.com, a las direcciones IP que las computadoras usan para encontrarse. Es la \"agenda telefónica\" de Internet y se consulta antes de casi cualquier conexión.",
      en: "DNS translates easy-to-remember names such as example.com into the IP addresses computers use to find each other. It is the Internet's \"phone book\" and is consulted before almost every connection.",
    },
    analogy: {
      es: "Como preguntar una dirección por niveles: primero a quien sabe dónde están los \".com\", luego a quien conoce \"example.com\" y por último a quien tiene el número exacto. Tu resolvedor hace ese recorrido por ti y recuerda la respuesta un tiempo.",
      en: "Like asking for directions level by level: first someone who knows where \".com\" lives, then whoever knows \"example.com\", and finally whoever has the exact number. Your resolver makes that trip for you and remembers the answer for a while.",
    },
    everyday: {
      es: "Cada vez que escribes una dirección web, abres una app o envías un correo, tu equipo consulta DNS primero.",
      en: "Every time you type a web address, open an app or send an email, your device queries DNS first.",
    },
    technical: [
      {
        es: "DNS es una base de datos distribuida y jerárquica: la raíz delega en los dominios de nivel superior (.com, .mx…), y estos en las zonas de cada organización, cuyos servidores autoritativos publican los registros. Los tipos más comunes son A (IPv4), AAAA (IPv6), CNAME (alias), MX (correo), NS (delegación), TXT, SOA, PTR (inverso), SRV y HTTPS/SVCB. Cada registro tiene un TTL que indica cuántos segundos puede guardarse en caché.",
        en: "DNS is a distributed, hierarchical database: the root delegates to top-level domains (.com, .mx…), which delegate to each organisation's zones, whose authoritative servers publish the records. Common types are A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), NS (delegation), TXT, SOA, PTR (reverse), SRV and HTTPS/SVCB. Each record has a TTL saying how many seconds it may be cached.",
      },
      {
        es: "Los clientes (stub resolvers) envían consultas recursivas a un resolvedor, que hace el trabajo iterativo contra la raíz, el TLD y el servidor autoritativo, y guarda en caché cada respuesta. El mensaje tiene una cabecera de 12 bytes (ID de 16 bits, flags QR/AA/TC/RD/RA, RCODE y cuatro contadores) seguida de las secciones de pregunta, respuesta, autoridad y adicional. Las etiquetas miden hasta 63 bytes y un nombre completo hasta 255.",
        en: "Clients (stub resolvers) send recursive queries to a resolver, which does the iterative work against the root, the TLD and the authoritative server, caching each answer. The message has a 12-byte header (16-bit ID, QR/AA/TC/RD/RA flags, RCODE and four counters) followed by the question, answer, authority and additional sections. Labels are up to 63 bytes and a full name up to 255.",
      },
      {
        es: "Originalmente las respuestas UDP se limitaban a 512 bytes; EDNS(0) (RFC 6891) permite anunciar búferes mayores, y si la respuesta no cabe se marca TC y se repite por TCP, cuyo soporte es obligatorio (RFC 7766). DNSSEC (RFC 4033–4035) firma las zonas con registros RRSIG, DNSKEY y DS para que el resolvedor verifique la autenticidad, pero no cifra. RFC 1034/1035 (1987) son la base vigente y reemplazaron a RFC 882/883 (1983).",
        en: "UDP responses were originally limited to 512 bytes; EDNS(0) (RFC 6891) lets clients advertise larger buffers, and if a response does not fit it is flagged TC and retried over TCP, whose support is mandatory (RFC 7766). DNSSEC (RFC 4033–4035) signs zones with RRSIG, DNSKEY and DS records so resolvers can verify authenticity, but it does not encrypt. RFC 1034/1035 (1987) remain the core and replaced RFC 882/883 (1983).",
      },
    ],
    howItWorks: [
      { es: "La aplicación pide www.example.com al stub resolver del sistema, que consulta a su resolvedor recursivo (por UDP 53).", en: "The application asks the OS stub resolver for www.example.com, which queries its recursive resolver (over UDP 53)." },
      { es: "Si no está en caché, el resolvedor pregunta a un servidor raíz, que lo remite a los servidores de .com.", en: "If it is not cached, the resolver asks a root server, which refers it to the .com servers." },
      { es: "Los servidores de .com lo remiten a los NS autoritativos de example.com.", en: "The .com servers refer it to example.com's authoritative NS." },
      { es: "El autoritativo responde el registro A/AAAA; el resolvedor lo guarda durante el TTL y lo entrega al cliente.", en: "The authoritative server returns the A/AAAA record; the resolver caches it for the TTL and hands it to the client." },
    ],
    facts: [
      { label: { es: "Transporte", en: "Transport" }, value: { es: "UDP 53; TCP 53 para respuestas grandes y transferencias de zona", en: "UDP 53; TCP 53 for large responses and zone transfers" } },
      { label: { es: "Cabecera", en: "Header" }, value: "12 B" },
      { label: { es: "Servidores raíz", en: "Root servers" }, value: { es: "13 identidades (a–m.root-servers.net), con cientos de instancias anycast", en: "13 identities (a–m.root-servers.net), with hundreds of anycast instances" } },
      { label: { es: "Integridad", en: "Integrity" }, value: "DNSSEC (RFC 4033–4035)" },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "No en DNS clásico; lo aportan DoT y DoH", en: "Not in classic DNS; DoT and DoH add it" } },
    ],
    security: {
      es: "El envenenamiento de caché inserta respuestas falsas en un resolvedor; en 2008 Dan Kaminsky mostró cómo hacerlo de forma práctica adivinando el ID de 16 bits, lo que llevó a aleatorizar también el puerto de origen. DNSSEC es la defensa de fondo. Los resolvedores abiertos y las respuestas grandes (ANY, DNSSEC) se abusan para ataques de amplificación con IP falsificada, y las consultas en claro revelan qué sitios visitas.",
      en: "Cache poisoning inserts forged answers into a resolver; in 2008 Dan Kaminsky showed a practical way to do it by guessing the 16-bit ID, which led to randomising the source port as well. DNSSEC is the structural defence. Open resolvers and large responses (ANY, DNSSEC) are abused for spoofed-source amplification attacks, and cleartext queries reveal which sites you visit.",
    },
    tools: [
      { command: "dig example.com AAAA", description: { es: "Consulta un tipo de registro y muestra la respuesta completa", en: "Queries a record type and shows the full response" } },
      { command: "dig +trace example.com", description: { es: "Recorre la delegación desde la raíz", en: "Walks the delegation from the root" } },
      { command: "nslookup example.com 1.1.1.1", description: { es: "Consulta rápida contra un resolvedor concreto (también en Windows)", en: "Quick query against a specific resolver (also on Windows)" } },
    ],
    wireshark: "dns",
    relations: { dependsOn: ["udp", "tcp"], usedBy: ["http1", "http3", "smtp", "kerberos", "sip"], replacedBy: [] },
    specs: [
      { id: "RFC 1034", title: { es: "Nombres de dominio: conceptos y servicios", en: "Domain Names - Concepts and Facilities" }, url: rfc(1034) },
      { id: "RFC 1035", title: { es: "Nombres de dominio: implementación y especificación", en: "Domain Names - Implementation and Specification" }, url: rfc(1035) },
      { id: "RFC 6891", title: { es: "Mecanismos de extensión para DNS (EDNS(0))", en: "Extension Mechanisms for DNS (EDNS(0))" }, url: rfc(6891) },
      { id: "RFC 7766", title: { es: "Transporte DNS sobre TCP", en: "DNS Transport over TCP - Implementation Requirements" }, url: rfc(7766) },
      { id: "RFC 4033", title: { es: "Introducción y requisitos de DNSSEC", en: "DNS Security Introduction and Requirements" }, url: rfc(4033) },
    ],
  },
  {
    id: "doh",
    acronym: "DoH",
    fullName: { es: "DNS sobre HTTPS", en: "DNS over HTTPS" },
    osi: [7],
    category: "naming",
    status: "current",
    bodies: ["IETF"],
    year: 2018,
    identifiers: ["TCP 443 (HTTPS)", "UDP 443 (HTTP/3)"],
    summary: {
      es: "DoH envía las consultas DNS dentro de conexiones HTTPS cifradas, como si fueran tráfico web normal. Así nadie en la red local o en tu proveedor puede ver ni alterar qué nombres consultas.",
      en: "DoH sends DNS queries inside encrypted HTTPS connections, like ordinary web traffic. That way nobody on the local network or at your ISP can see or tamper with the names you look up.",
    },
    everyday: {
      es: "La opción \"DNS seguro\" de Chrome, Edge y Firefox, y resolvedores públicos como 1.1.1.1, 8.8.8.8 o 9.9.9.9.",
      en: "The \"Secure DNS\" option in Chrome, Edge and Firefox, and public resolvers such as 1.1.1.1, 8.8.8.8 or 9.9.9.9.",
    },
    technical: [
      {
        es: "RFC 8484 (2018) transporta el mensaje DNS binario sin cambios (el mismo formato de RFC 1035) como cuerpo HTTP con el tipo de medio application/dns-message. Con POST el mensaje va en el cuerpo; con GET va codificado en base64url en el parámetro ?dns=, lo que permite aprovechar cachés HTTP. El cliente se configura con una plantilla de URI, por ejemplo https://cloudflare-dns.com/dns-query.",
        en: "RFC 8484 (2018) carries the unchanged binary DNS message (the RFC 1035 format) as an HTTP body with media type application/dns-message. With POST the message goes in the body; with GET it is base64url-encoded in the ?dns= parameter, which allows HTTP caching. The client is configured with a URI template such as https://cloudflare-dns.com/dns-query.",
      },
      {
        es: "Se recomienda HTTP/2 o superior para multiplexar muchas consultas en una conexión; para reducir latencia, el ID del mensaje DNS debe ser 0 porque HTTP ya empareja peticiones y respuestas. Como comparte el puerto 443 con la web, es difícil de bloquear o distinguir sin inspeccionar TLS, a diferencia de DoT en su puerto dedicado.",
        en: "HTTP/2 or later is recommended to multiplex many queries over one connection; the DNS message ID should be 0 because HTTP already pairs requests and responses. Because it shares port 443 with the web, it is hard to block or tell apart without TLS inspection, unlike DoT on its dedicated port.",
      },
    ],
    facts: [
      { label: { es: "Tipo de medio", en: "Media type" }, value: "application/dns-message" },
      { label: { es: "Métodos", en: "Methods" }, value: { es: "GET (?dns= en base64url) y POST", en: "GET (?dns= base64url) and POST" } },
      { label: { es: "Transporte", en: "Transport" }, value: { es: "HTTPS (HTTP/2 recomendado; también HTTP/3)", en: "HTTPS (HTTP/2 recommended; HTTP/3 also used)" } },
      { label: { es: "Cifra", en: "Encrypts" }, value: { es: "Tramo cliente ↔ resolvedor", en: "Client ↔ resolver leg" } },
    ],
    security: {
      es: "Protege la privacidad y la integridad del tramo entre el cliente y el resolvedor, pero no del resolvedor hacia los servidores autoritativos, y el resolvedor elegido sigue viendo todas tus consultas. Como elude el DNS configurado por la red, rompe filtros corporativos y parentales, y el malware puede usarlo para ocultar su tráfico de control.",
      en: "It protects the privacy and integrity of the client-to-resolver leg, not the resolver-to-authoritative leg, and the chosen resolver still sees all your queries. Because it bypasses network-configured DNS, it breaks corporate and parental filters, and malware can use it to hide command-and-control traffic.",
    },
    tools: [
      { command: "curl --doh-url https://cloudflare-dns.com/dns-query https://example.com", description: { es: "Hace que curl resuelva el nombre por DoH", en: "Makes curl resolve the name via DoH" } },
      { command: "dig @1.1.1.1 +https example.com", description: { es: "Consulta DoH con dig (BIND 9.18 o superior)", en: "DoH query with dig (BIND 9.18 or later)" } },
    ],
    wireshark: "tls.handshake.extensions_server_name contains \"dns\"",
    relations: { dependsOn: ["dns", "http2", "tls", "tcp"] },
    specs: [
      { id: "RFC 8484", title: { es: "Consultas DNS sobre HTTPS (DoH)", en: "DNS Queries over HTTPS (DoH)" }, url: rfc(8484) },
    ],
  },
  {
    id: "dot",
    acronym: "DoT",
    fullName: { es: "DNS sobre TLS", en: "DNS over TLS" },
    osi: [7],
    category: "naming",
    status: "current",
    bodies: ["IETF"],
    year: 2016,
    identifiers: ["TCP 853"],
    summary: {
      es: "DoT cifra las consultas DNS envolviéndolas en TLS sobre un puerto propio, el 853. Da la misma privacidad que DoH, pero el tráfico es fácil de identificar, lo que agrada a los administradores de red.",
      en: "DoT encrypts DNS queries by wrapping them in TLS on its own port, 853. It gives the same privacy as DoH, but its traffic is easy to identify, which network administrators appreciate.",
    },
    everyday: {
      es: "La opción \"DNS privado\" de Android (desde Android 9) y muchos routers y resolvedores locales como Unbound o systemd-resolved.",
      en: "Android's \"Private DNS\" setting (since Android 9) and many routers and local resolvers such as Unbound or systemd-resolved.",
    },
    technical: [
      {
        es: "RFC 7858 (2016) define que el cliente abre una conexión TCP al puerto 853, negocia TLS y después envía mensajes DNS con el mismo prefijo de longitud de 2 bytes que DNS sobre TCP. Se recomienda mantener la conexión abierta, enviar varias consultas en paralelo y aceptar respuestas fuera de orden para amortizar el coste del handshake.",
        en: "RFC 7858 (2016) specifies that the client opens a TCP connection to port 853, negotiates TLS and then sends DNS messages with the same 2-byte length prefix used by DNS over TCP. Connections should be kept open, queries pipelined and out-of-order responses accepted to amortise the handshake cost.",
      },
      {
        es: "RFC 8310 define dos perfiles: oportunista (cifra si puede, pero acepta fallar a DNS en claro y no exige autenticar al servidor) y estricto (requiere autenticar el certificado del resolvedor por nombre o por huella SPKI, y si falla no resuelve). El mismo esquema se extendió a QUIC en DNS over QUIC (DoQ, RFC 9250), que usa UDP 853.",
        en: "RFC 8310 defines two profiles: opportunistic (encrypt if possible, fall back to cleartext and do not require server authentication) and strict (authenticate the resolver's certificate by name or SPKI pin, and fail if that is impossible). The same idea was extended to QUIC as DNS over QUIC (DoQ, RFC 9250), which uses UDP 853.",
      },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: "TCP 853" },
      { label: { es: "Encapsulado", en: "Framing" }, value: { es: "Prefijo de longitud de 2 B, igual que DNS sobre TCP", en: "2 B length prefix, same as DNS over TCP" } },
      { label: { es: "Perfiles", en: "Profiles" }, value: { es: "Oportunista y estricto (RFC 8310)", en: "Opportunistic and strict (RFC 8310)" } },
      { label: { es: "Variante sobre QUIC", en: "QUIC variant" }, value: "DoQ, RFC 9250 (UDP 853)" },
    ],
    security: {
      es: "En modo oportunista un atacante activo puede forzar la vuelta a DNS en claro; solo el perfil estricto protege contra un intermediario. Como usa un puerto dedicado, una red puede bloquear el 853 fácilmente, y al igual que DoH solo protege el tramo hasta el resolvedor.",
      en: "In opportunistic mode an active attacker can force a fallback to cleartext DNS; only the strict profile protects against a man-in-the-middle. Because it uses a dedicated port, a network can easily block 853, and like DoH it only protects the leg up to the resolver.",
    },
    tools: [
      { command: "kdig -d @1.1.1.1 +tls-ca +tls-host=one.one.one.one example.com", description: { es: "Consulta DoT validando el certificado (knot-dnsutils)", en: "DoT query validating the certificate (knot-dnsutils)" } },
      { command: "dig @1.1.1.1 +tls example.com", description: { es: "Consulta DoT con dig (BIND 9.18 o superior)", en: "DoT query with dig (BIND 9.18 or later)" } },
      { command: "openssl s_client -connect 1.1.1.1:853", description: { es: "Inspecciona el certificado TLS del resolvedor", en: "Inspects the resolver's TLS certificate" } },
    ],
    wireshark: "tcp.port == 853",
    relations: { dependsOn: ["dns", "tls", "tcp"] },
    specs: [
      { id: "RFC 7858", title: { es: "Especificación de DNS sobre TLS", en: "Specification for DNS over Transport Layer Security (TLS)" }, url: rfc(7858) },
      { id: "RFC 8310", title: { es: "Perfiles de uso de DNS sobre TLS y DTLS", en: "Usage Profiles for DNS over TLS and DNS over DTLS" }, url: rfc(8310) },
      { id: "RFC 9250", title: { es: "DNS sobre conexiones QUIC dedicadas", en: "DNS over Dedicated QUIC Connections" }, url: rfc(9250) },
    ],
  },
  {
    id: "mdns",
    acronym: "mDNS",
    fullName: { es: "DNS multidifusión", en: "Multicast DNS" },
    osi: [7],
    category: "naming",
    status: "current",
    bodies: ["IETF"],
    year: 2013,
    identifiers: ["UDP 5353", "224.0.0.251", "ff02::fb"],
    summary: {
      es: "mDNS permite que los dispositivos de una red local se encuentren por nombre sin ningún servidor DNS: cada uno responde por sí mismo cuando alguien pregunta por \"mi-impresora.local\". Junto con DNS-SD también anuncia qué servicios ofrece cada equipo.",
      en: "mDNS lets devices on a local network find each other by name with no DNS server: each device answers for itself when someone asks for \"my-printer.local\". Together with DNS-SD it also advertises which services each device offers.",
    },
    analogy: {
      es: "En vez de consultar una guía telefónica, gritas en la sala \"¿quién es la impresora?\" y la impresora levanta la mano con su dirección.",
      en: "Instead of looking in a phone book, you shout in the room \"who is the printer?\" and the printer raises its hand with its address.",
    },
    everyday: {
      es: "AirPlay, AirPrint, Chromecast, impresoras de red y equipos que aparecen solos en el explorador de archivos (Bonjour en Apple, Avahi en Linux).",
      en: "AirPlay, AirPrint, Chromecast, network printers and machines that show up automatically in the file browser (Bonjour on Apple, Avahi on Linux).",
    },
    technical: [
      {
        es: "mDNS (RFC 6762, 2013) reutiliza el formato de mensaje DNS, pero las consultas para nombres bajo .local se envían por multidifusión al grupo 224.0.0.251 o ff02::fb en el puerto UDP 5353, y cada equipo responde por sus propios registros. Los paquetes se envían con TTL de IP 255 y no se reenvían fuera del enlace local. Al conectarse, un equipo sondea su nombre para detectar conflictos y luego lo anuncia.",
        en: "mDNS (RFC 6762, 2013) reuses the DNS message format, but queries for names under .local are multicast to group 224.0.0.251 or ff02::fb on UDP port 5353, and each host answers for its own records. Packets are sent with IP TTL 255 and are not forwarded off the local link. On joining, a host probes its name to detect conflicts and then announces it.",
      },
      {
        es: "DNS-SD (RFC 6763) define cómo descubrir servicios con registros DNS estándar: un PTR bajo _servicio._protocolo.local (por ejemplo _ipp._tcp.local) lista instancias, cada instancia tiene un SRV con host y puerto y un TXT con parámetros. DNS-SD también funciona con DNS unicast normal, pero en redes domésticas se usa casi siempre sobre mDNS. Técnicas como la supresión de respuestas conocidas y el bit QU (pedir respuesta unicast) reducen el tráfico.",
        en: "DNS-SD (RFC 6763) defines service discovery with standard DNS records: a PTR under _service._proto.local (e.g. _ipp._tcp.local) lists instances, each instance has an SRV with host and port and a TXT with parameters. DNS-SD also works with ordinary unicast DNS, but in home networks it is almost always used over mDNS. Known-answer suppression and the QU bit (request a unicast reply) reduce traffic.",
      },
    ],
    howItWorks: [
      { es: "Sondeo: el equipo pregunta tres veces por su nombre deseado; si nadie responde, lo toma.", en: "Probing: the host asks three times for its desired name; if nobody answers, it claims it." },
      { es: "Anuncio: envía por multidifusión sus registros A/AAAA y de servicio.", en: "Announcing: it multicasts its A/AAAA and service records." },
      { es: "Consulta: otro equipo pregunta a 224.0.0.251:5353 por nombre.local o por _servicio._tcp.local.", en: "Query: another host asks 224.0.0.251:5353 for name.local or _service._tcp.local." },
      { es: "Respuesta: el dueño del registro responde (normalmente por multidifusión) y todos actualizan su caché.", en: "Response: the record owner answers (usually multicast) and every listener updates its cache." },
    ],
    facts: [
      { label: { es: "Dominio", en: "Domain" }, value: ".local" },
      { label: { es: "Grupo multicast", en: "Multicast group" }, value: "224.0.0.251 / ff02::fb, UDP 5353" },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Solo el enlace local", en: "Local link only" } },
      { label: { es: "Descubrimiento de servicios", en: "Service discovery" }, value: "DNS-SD (RFC 6763): PTR + SRV + TXT" },
      { label: { es: "Implementaciones", en: "Implementations" }, value: "Bonjour (Apple), Avahi (Linux), Windows 10+" },
    ],
    security: {
      es: "No tiene autenticación: cualquier equipo de la red puede responder por un nombre ajeno o anunciar servicios falsos. Revela nombres de equipos y servicios a toda la red local, y un respondedor mDNS expuesto a Internet puede abusarse para amplificación, por lo que el puerto 5353 nunca debe estar abierto hacia fuera.",
      en: "It has no authentication: any host on the network can answer for someone else's name or advertise fake services. It reveals host and service names to the entire local network, and an mDNS responder exposed to the Internet can be abused for amplification, so port 5353 should never be reachable from outside.",
    },
    tools: [
      { command: "avahi-browse -art", description: { es: "Lista y resuelve todos los servicios anunciados (Linux)", en: "Lists and resolves every advertised service (Linux)" } },
      { command: "dns-sd -B _services._dns-sd._udp", description: { es: "Enumera los tipos de servicio presentes (macOS/Bonjour)", en: "Enumerates the service types present (macOS/Bonjour)" } },
      { command: "dig @224.0.0.251 -p 5353 host.local", description: { es: "Envía una consulta mDNS a mano", en: "Sends an mDNS query by hand" } },
    ],
    wireshark: "mdns",
    relations: { dependsOn: ["dns", "udp", "igmp", "mld"] },
    specs: [
      { id: "RFC 6762", title: { es: "DNS multidifusión", en: "Multicast DNS" }, url: rfc(6762) },
      { id: "RFC 6763", title: { es: "Descubrimiento de servicios basado en DNS (DNS-SD)", en: "DNS-Based Service Discovery" }, url: rfc(6763) },
    ],
  },
  {
    id: "dhcp",
    acronym: "DHCP",
    fullName: { es: "Protocolo de Configuración Dinámica de Host", en: "Dynamic Host Configuration Protocol" },
    osi: [7],
    category: "config",
    status: "current",
    bodies: ["IETF"],
    year: 1993,
    identifiers: ["UDP 67 (servidor)", "UDP 68 (cliente)"],
    summary: {
      es: "DHCP le da automáticamente a cada dispositivo que se conecta a la red su dirección IP, la puerta de enlace y los servidores DNS. Sin él, habría que configurar cada equipo a mano.",
      en: "DHCP automatically gives every device that joins the network its IP address, gateway and DNS servers. Without it, every machine would have to be configured by hand.",
    },
    analogy: {
      es: "Como la recepción de un hotel: llegas, pides habitación, te asignan una por cierto tiempo junto con las indicaciones del edificio, y antes de que venza puedes renovarla.",
      en: "Like a hotel front desk: you arrive, ask for a room, get one for a set time along with directions around the building, and can extend it before it expires.",
    },
    everyday: {
      es: "Cuando tu teléfono o laptop se conecta al Wi-Fi de casa, de la oficina o de un café y \"obtiene IP\" en segundos.",
      en: "When your phone or laptop joins the Wi-Fi at home, at work or in a café and \"gets an IP\" within seconds.",
    },
    technical: [
      {
        es: "DHCP extiende BOOTP (RFC 951) y conserva su formato: una parte fija de 236 bytes (op, xid, ciaddr, yiaddr, siaddr, giaddr, chaddr…), la cookie mágica 99.130.83.99 y opciones TLV definidas en RFC 2132, como la 53 (tipo de mensaje), 1 (máscara), 3 (router), 6 (DNS) y 51 (tiempo de concesión). Las direcciones se entregan en concesión (lease) por un tiempo limitado.",
        en: "DHCP extends BOOTP (RFC 951) and keeps its format: a 236-byte fixed part (op, xid, ciaddr, yiaddr, siaddr, giaddr, chaddr…), the magic cookie 99.130.83.99 and TLV options defined in RFC 2132, such as 53 (message type), 1 (subnet mask), 3 (router), 6 (DNS) and 51 (lease time). Addresses are handed out as leases for a limited time.",
      },
      {
        es: "Como el cliente aún no tiene dirección, envía desde 0.0.0.0:68 por broadcast a 255.255.255.255:67. Al 50 % de la concesión (T1) intenta renovar por unicast con su servidor, y al 87,5 % (T2) intenta con cualquier servidor por broadcast. Para redes con varias subredes, un agente relé (ip helper-address) reenvía los mensajes al servidor y rellena giaddr para indicar de qué subred provienen; la opción 82 (RFC 3046) añade información del puerto.",
        en: "Since the client has no address yet, it sends from 0.0.0.0:68 as a broadcast to 255.255.255.255:67. At 50 % of the lease (T1) it tries to renew by unicast with its server, and at 87.5 % (T2) with any server by broadcast. In multi-subnet networks a relay agent (ip helper-address) forwards messages to the server and fills giaddr to indicate the originating subnet; option 82 (RFC 3046) adds port information.",
      },
      {
        es: "La especificación vigente es RFC 2131 (1997), que reemplazó a RFC 1541 y a la original RFC 1531 (1993). Otros mensajes son DHCPNAK (rechazo), DHCPDECLINE (dirección ya en uso), DHCPRELEASE (liberación) y DHCPINFORM (solo pedir parámetros).",
        en: "The current specification is RFC 2131 (1997), which replaced RFC 1541 and the original RFC 1531 (1993). Other messages are DHCPNAK (refusal), DHCPDECLINE (address already in use), DHCPRELEASE (release) and DHCPINFORM (parameters only).",
      },
    ],
    howItWorks: [
      { es: "DISCOVER: el cliente busca servidores por broadcast.", en: "DISCOVER: the client broadcasts to find servers." },
      { es: "OFFER: cada servidor disponible propone una dirección y parámetros.", en: "OFFER: each available server proposes an address and parameters." },
      { es: "REQUEST: el cliente elige una oferta y la solicita (por broadcast, para que los demás servidores sepan que se rechazó la suya).", en: "REQUEST: the client picks one offer and requests it (broadcast, so other servers know theirs was declined)." },
      { es: "ACK: el servidor confirma la concesión; el cliente suele verificar con ARP que la IP no esté en uso antes de configurarla.", en: "ACK: the server confirms the lease; the client usually checks with ARP that the IP is not in use before configuring it." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "UDP 67 servidor, UDP 68 cliente", en: "UDP 67 server, UDP 68 client" } },
      { label: { es: "Intercambio", en: "Exchange" }, value: "DORA: Discover, Offer, Request, Ack" },
      { label: { es: "Renovación", en: "Renewal" }, value: { es: "T1 = 50 %, T2 = 87,5 % de la concesión", en: "T1 = 50 %, T2 = 87.5 % of the lease" } },
      { label: { es: "Origen", en: "Origin" }, value: { es: "Extiende BOOTP (RFC 951, 1985)", en: "Extends BOOTP (RFC 951, 1985)" } },
      { label: { es: "Autenticación", en: "Authentication" }, value: { es: "Ninguna en la práctica", en: "None in practice" } },
    ],
    security: {
      es: "DHCP no autentica: un servidor DHCP falso (rogue) puede entregar una puerta de enlace o DNS maliciosos y colocarse en medio del tráfico, y un ataque de agotamiento (starvation) consume todas las direcciones con MAC falsas. Los switches mitigan ambos con DHCP snooping, que solo acepta respuestas de puertos de confianza y construye la tabla que usan Dynamic ARP Inspection e IP Source Guard.",
      en: "DHCP does not authenticate: a rogue DHCP server can hand out a malicious gateway or DNS and put itself in the middle of traffic, and a starvation attack exhausts every address with spoofed MACs. Switches mitigate both with DHCP snooping, which only accepts server replies on trusted ports and builds the binding table used by Dynamic ARP Inspection and IP Source Guard.",
    },
    tools: [
      { command: "ipconfig /release && ipconfig /renew", description: { es: "Libera y renueva la concesión en Windows", en: "Releases and renews the lease on Windows" } },
      { command: "sudo dhclient -v eth0", description: { es: "Solicita una concesión mostrando el intercambio DORA (Linux)", en: "Requests a lease showing the DORA exchange (Linux)" } },
      { command: "nmap --script broadcast-dhcp-discover", description: { es: "Detecta servidores DHCP en la red, incluidos los no autorizados", en: "Finds DHCP servers on the network, including rogue ones" } },
    ],
    wireshark: "dhcp",
    relations: { dependsOn: ["udp", "ipv4", "arp"] },
    specs: [
      { id: "RFC 2131", title: { es: "Protocolo de Configuración Dinámica de Host", en: "Dynamic Host Configuration Protocol" }, url: rfc(2131) },
      { id: "RFC 2132", title: { es: "Opciones de DHCP y extensiones de BOOTP", en: "DHCP Options and BOOTP Vendor Extensions" }, url: rfc(2132) },
      { id: "RFC 3046", title: { es: "Opción de información del agente relé (opción 82)", en: "DHCP Relay Agent Information Option" }, url: rfc(3046) },
    ],
  },
  {
    id: "dhcpv6",
    acronym: "DHCPv6",
    fullName: { es: "Protocolo de Configuración Dinámica de Host para IPv6", en: "Dynamic Host Configuration Protocol for IPv6" },
    osi: [7],
    category: "config",
    status: "current",
    bodies: ["IETF"],
    year: 2003,
    identifiers: ["UDP 546 (cliente)", "UDP 547 (servidor/relé)", "ff02::1:2"],
    summary: {
      es: "DHCPv6 entrega direcciones y parámetros de red en IPv6, pero no trabaja solo: el router anuncia si se debe usar y es quien indica la puerta de enlace. Los proveedores lo usan sobre todo para delegar a tu router un bloque completo de direcciones IPv6.",
      en: "DHCPv6 hands out addresses and network parameters in IPv6, but it does not work alone: the router advertises whether to use it and is the one that provides the default gateway. ISPs mainly use it to delegate a whole block of IPv6 addresses to your router.",
    },
    everyday: {
      es: "Cuando tu router doméstico recibe del proveedor un prefijo IPv6 (por ejemplo un /56) y lo reparte entre tus redes.",
      en: "When your home router receives an IPv6 prefix from the ISP (e.g. a /56) and splits it across your networks.",
    },
    technical: [
      {
        es: "El cliente envía desde su dirección link-local al grupo multicast ff02::1:2 (todos los servidores y relés DHCP) en el puerto UDP 547 y escucha en el 546. El intercambio normal es de cuatro mensajes (SOLICIT, ADVERTISE, REQUEST, REPLY), o de dos (SOLICIT, REPLY) con la opción Rapid Commit. Los clientes y servidores se identifican con un DUID estable en lugar de la dirección MAC, y cada mensaje lleva un ID de transacción de 24 bits.",
        en: "The client sends from its link-local address to multicast group ff02::1:2 (all DHCP servers and relays) on UDP port 547 and listens on 546. The normal exchange has four messages (SOLICIT, ADVERTISE, REQUEST, REPLY), or two (SOLICIT, REPLY) with the Rapid Commit option. Clients and servers are identified by a stable DUID rather than the MAC address, and each message carries a 24-bit transaction ID.",
      },
      {
        es: "Las direcciones se piden dentro de asociaciones de identidad: IA_NA para direcciones y IA_PD para delegación de prefijos, con la que un router pide al proveedor un bloque para sus redes internas. DHCPv6 no entrega la puerta de enlace predeterminada: esta siempre viene de los Router Advertisements de NDP, cuyos flags M (managed) y O (other) indican si usar DHCPv6 con estado o solo para información adicional como DNS (DHCPv6 sin estado, con INFORMATION-REQUEST), en combinación o no con SLAAC.",
        en: "Addresses are requested inside identity associations: IA_NA for addresses and IA_PD for prefix delegation, which lets a router ask the ISP for a block for its internal networks. DHCPv6 does not provide the default gateway: that always comes from NDP Router Advertisements, whose M (managed) and O (other) flags indicate whether to use stateful DHCPv6 or only use it for extra information such as DNS (stateless DHCPv6, via INFORMATION-REQUEST), with or without SLAAC.",
      },
      {
        es: "RFC 8415 (2018) consolida la especificación original RFC 3315 (2003), la delegación de prefijos de RFC 3633 y otras extensiones en un solo documento.",
        en: "RFC 8415 (2018) consolidates the original RFC 3315 (2003), the RFC 3633 prefix delegation and other extensions into a single document.",
      },
    ],
    howItWorks: [
      { es: "El router envía un Router Advertisement con el flag M u O activo.", en: "The router sends a Router Advertisement with the M or O flag set." },
      { es: "SOLICIT: el cliente busca servidores enviando a ff02::1:2, UDP 547.", en: "SOLICIT: the client looks for servers by sending to ff02::1:2, UDP 547." },
      { es: "ADVERTISE: los servidores ofrecen direcciones (IA_NA) o prefijos (IA_PD).", en: "ADVERTISE: servers offer addresses (IA_NA) or prefixes (IA_PD)." },
      { es: "REQUEST / REPLY: el cliente pide la oferta elegida y el servidor la confirma con tiempos de vida; después se renueva con RENEW y REBIND.", en: "REQUEST / REPLY: the client requests the chosen offer and the server confirms it with lifetimes; it is later refreshed with RENEW and REBIND." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "UDP 546 cliente, UDP 547 servidor/relé", en: "UDP 546 client, UDP 547 server/relay" } },
      { label: { es: "Multicast", en: "Multicast" }, value: "ff02::1:2" },
      { label: { es: "Identificador", en: "Identifier" }, value: "DUID" },
      { label: { es: "Puerta de enlace", en: "Default gateway" }, value: { es: "No; la entregan los RA de NDP", en: "No; provided by NDP RAs" } },
      { label: { es: "Delegación de prefijos", en: "Prefix delegation" }, value: "IA_PD" },
    ],
    security: {
      es: "Como DHCPv4, carece de autenticación práctica: un servidor DHCPv6 falso puede anunciar un DNS malicioso, algo que herramientas como mitm6 explotan en redes Windows donde IPv6 está activo pero no administrado. Los switches ofrecen DHCPv6 Guard (DHCPv6-Shield, RFC 7610) y RA Guard para bloquear servidores y routers no autorizados.",
      en: "Like DHCPv4, it lacks practical authentication: a rogue DHCPv6 server can advertise a malicious DNS, which tools such as mitm6 exploit on Windows networks where IPv6 is enabled but unmanaged. Switches offer DHCPv6 Guard (DHCPv6-Shield, RFC 7610) and RA Guard to block unauthorised servers and routers.",
    },
    tools: [
      { command: "sudo dhclient -6 -v eth0", description: { es: "Solicita una dirección por DHCPv6 (Linux)", en: "Requests an address via DHCPv6 (Linux)" } },
      { command: "sudo dhclient -6 -P -v eth0", description: { es: "Solicita la delegación de un prefijo", en: "Requests a delegated prefix" } },
      { command: "ipconfig /all", description: { es: "Muestra el DUID y el IAID de DHCPv6 en Windows", en: "Shows the DHCPv6 DUID and IAID on Windows" } },
    ],
    wireshark: "dhcpv6",
    relations: { dependsOn: ["udp", "ipv6", "ndp"] },
    specs: [
      { id: "RFC 8415", title: { es: "Protocolo de Configuración Dinámica de Host para IPv6 (DHCPv6)", en: "Dynamic Host Configuration Protocol for IPv6 (DHCPv6)" }, url: rfc(8415) },
      { id: "RFC 7610", title: { es: "DHCPv6-Shield: protección contra servidores DHCPv6 falsos", en: "DHCPv6-Shield: Protecting against Rogue DHCPv6 Servers" }, url: rfc(7610) },
    ],
  },
  {
    id: "smtp",
    acronym: "SMTP",
    fullName: { es: "Protocolo Simple de Transferencia de Correo", en: "Simple Mail Transfer Protocol" },
    osi: [7],
    category: "email",
    status: "current",
    bodies: ["IETF"],
    year: 1982,
    identifiers: ["TCP 25 (retransmisión)", "TCP 587 (envío)", "TCP 465 (envío con TLS implícito)"],
    summary: {
      es: "SMTP es el protocolo que envía el correo electrónico: lo usa tu programa para entregar un mensaje a tu servidor, y los servidores para pasárselo entre sí hasta el buzón del destinatario. Para leer el correo se usan otros protocolos (IMAP o POP3).",
      en: "SMTP is the protocol that sends email: your mail app uses it to hand a message to your server, and servers use it to pass it along to the recipient's mailbox. Reading mail uses other protocols (IMAP or POP3).",
    },
    analogy: {
      es: "Como el servicio postal entre oficinas: dejas la carta en tu oficina de correos (envío), y las oficinas se la pasan entre sí siguiendo la dirección del sobre hasta la del destinatario.",
      en: "Like the postal service between offices: you drop the letter at your post office (submission), and the offices hand it along according to the envelope address until it reaches the recipient's.",
    },
    everyday: {
      es: "Cada correo que envías desde Outlook, Gmail o una aplicación que manda notificaciones o facturas.",
      en: "Every email you send from Outlook, Gmail or an app that sends notifications or invoices.",
    },
    technical: [
      {
        es: "SMTP es un protocolo de comandos en texto con respuestas de tres dígitos (2xx éxito, 3xx continuar, 4xx error temporal, 5xx error permanente). El cliente se presenta con EHLO, declara el remitente del sobre con MAIL FROM, cada destinatario con RCPT TO y envía el mensaje tras DATA, terminado con una línea que solo contiene un punto. El sobre SMTP es independiente de las cabeceras From/To del mensaje (RFC 5322), lo que explica por qué el remitente visible puede falsificarse.",
        en: "SMTP is a text command protocol with three-digit replies (2xx success, 3xx continue, 4xx temporary failure, 5xx permanent failure). The client introduces itself with EHLO, gives the envelope sender with MAIL FROM, each recipient with RCPT TO, and sends the message after DATA, ending with a line containing only a dot. The SMTP envelope is independent of the message's From/To headers (RFC 5322), which is why the visible sender can be forged.",
      },
      {
        es: "Se distinguen dos usos: la retransmisión entre servidores (MTA a MTA) en el puerto 25, localizando el destino por los registros MX de DNS, y el envío desde el cliente de correo (MUA) al servidor en el puerto 587 (RFC 6409) con autenticación SMTP AUTH, o en el 465 con TLS implícito, que RFC 8314 (2018) recomienda. STARTTLS (RFC 3207) convierte una sesión en claro en cifrada.",
        en: "There are two uses: server-to-server relay (MTA to MTA) on port 25, locating the destination through DNS MX records, and submission from the mail client (MUA) to the server on port 587 (RFC 6409) with SMTP AUTH, or on 465 with implicit TLS, which RFC 8314 (2018) recommends. STARTTLS (RFC 3207) upgrades a cleartext session to an encrypted one.",
      },
      {
        es: "ESMTP añade extensiones anunciadas en la respuesta a EHLO, como SIZE, 8BITMIME, PIPELINING, SMTPUTF8 y AUTH. La especificación vigente es RFC 5321 (2008), que reemplaza a RFC 2821 y a la original RFC 821 (1982).",
        en: "ESMTP adds extensions advertised in the EHLO reply, such as SIZE, 8BITMIME, PIPELINING, SMTPUTF8 and AUTH. The current specification is RFC 5321 (2008), replacing RFC 2821 and the original RFC 821 (1982).",
      },
    ],
    howItWorks: [
      { es: "El servidor emisor busca el registro MX del dominio destino y abre TCP 25 hacia él; el receptor saluda con 220.", en: "The sending server looks up the destination domain's MX record and opens TCP 25 to it; the receiver greets with 220." },
      { es: "EHLO → 250 con la lista de extensiones; si se ofrece, STARTTLS y un nuevo EHLO ya cifrado.", en: "EHLO → 250 with the extension list; if offered, STARTTLS and a fresh EHLO over the encrypted channel." },
      { es: "MAIL FROM:<a@x> y RCPT TO:<b@y>, cada uno aceptado con 250.", en: "MAIL FROM:<a@x> and RCPT TO:<b@y>, each accepted with 250." },
      { es: "DATA → 354; se envían cabeceras y cuerpo, se termina con \".\" y el servidor confirma con 250; QUIT cierra.", en: "DATA → 354; headers and body are sent, ended with \".\", and the server confirms with 250; QUIT closes." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "25 retransmisión, 587 envío, 465 envío con TLS implícito", en: "25 relay, 587 submission, 465 implicit-TLS submission" } },
      { label: { es: "Formato", en: "Format" }, value: { es: "Comandos en texto, respuestas de 3 dígitos", en: "Text commands, 3-digit replies" } },
      { label: { es: "Enrutamiento", en: "Routing" }, value: { es: "Registros MX de DNS", en: "DNS MX records" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "STARTTLS o TLS implícito", en: "STARTTLS or implicit TLS" } },
      { label: { es: "Autenticación de dominio", en: "Domain authentication" }, value: "SPF, DKIM, DMARC" },
    ],
    security: {
      es: "SMTP no verifica al remitente, así que la suplantación y el spam se combaten con capas en DNS: SPF (RFC 7208) lista los servidores autorizados a enviar por un dominio, DKIM (RFC 6376) firma el mensaje y DMARC (RFC 7489) indica qué hacer si ambas fallan. STARTTLS oportunista puede degradarse eliminando el anuncio; MTA-STS (RFC 8461) y DANE obligan a usar TLS entre servidores.",
      en: "SMTP does not verify the sender, so spoofing and spam are fought with DNS-based layers: SPF (RFC 7208) lists servers allowed to send for a domain, DKIM (RFC 6376) signs the message and DMARC (RFC 7489) says what to do when both fail. Opportunistic STARTTLS can be downgraded by stripping the advertisement; MTA-STS (RFC 8461) and DANE enforce TLS between servers.",
    },
    tools: [
      { command: "openssl s_client -starttls smtp -connect mail.example.com:25", description: { es: "Abre una sesión SMTP con STARTTLS y muestra el certificado", en: "Opens an SMTP session with STARTTLS and shows the certificate" } },
      { command: "swaks --to user@example.com --server mail.example.com", description: { es: "Envía un correo de prueba mostrando todo el diálogo SMTP", en: "Sends a test message showing the whole SMTP dialogue" } },
      { command: "dig example.com MX", description: { es: "Consulta los servidores de correo de un dominio", en: "Looks up a domain's mail servers" } },
    ],
    wireshark: "smtp",
    relations: { dependsOn: ["tcp", "tls", "dns", "mime"] },
    specs: [
      { id: "RFC 5321", title: { es: "Simple Mail Transfer Protocol", en: "Simple Mail Transfer Protocol" }, url: rfc(5321) },
      { id: "RFC 6409", title: { es: "Envío de mensajes de correo", en: "Message Submission for Mail" }, url: rfc(6409) },
      { id: "RFC 3207", title: { es: "Extensión SMTP para SMTP seguro sobre TLS (STARTTLS)", en: "SMTP Service Extension for Secure SMTP over Transport Layer Security" }, url: rfc(3207) },
      { id: "RFC 8314", title: { es: "TLS preferido sobre texto claro para correo", en: "Cleartext Considered Obsolete: Use of TLS for Email Submission and Access" }, url: rfc(8314) },
      { id: "RFC 7489", title: { es: "DMARC", en: "Domain-based Message Authentication, Reporting, and Conformance (DMARC)" }, url: rfc(7489) },
    ],
  },
  {
    id: "imap",
    acronym: "IMAP",
    fullName: { es: "Protocolo de Acceso a Mensajes de Internet", en: "Internet Message Access Protocol" },
    osi: [7],
    category: "email",
    status: "current",
    bodies: ["IETF"],
    year: 1988,
    identifiers: ["TCP 143", "TCP 993 (TLS)"],
    summary: {
      es: "IMAP permite leer y organizar el correo que se queda guardado en el servidor. Como todo vive allí, ves las mismas carpetas y los mismos mensajes leídos o marcados desde el teléfono, la computadora y la web.",
      en: "IMAP lets you read and organise mail that stays stored on the server. Because everything lives there, you see the same folders and the same read or flagged messages from your phone, computer and webmail.",
    },
    analogy: {
      es: "Como una biblioteca: consultas y ordenas los libros en su sitio en lugar de llevártelos a casa, y cualquier persona con tu credencial ve la misma estantería.",
      en: "Like a library: you browse and organise the books where they are instead of taking them home, and anyone with your card sees the same shelves.",
    },
    everyday: {
      es: "Cuando configuras una cuenta de correo en la app de Correo del teléfono, Thunderbird u Outlook y todo se sincroniza.",
      en: "When you set up a mail account in your phone's Mail app, Thunderbird or Outlook and everything stays in sync.",
    },
    technical: [
      {
        es: "IMAP es un protocolo de texto con estado: el cliente se autentica, selecciona un buzón (SELECT) y trabaja sobre los mensajes con FETCH, SEARCH, STORE, COPY/MOVE y EXPUNGE. Cada comando lleva una etiqueta (por ejemplo a001) que el servidor repite en la respuesta final, lo que permite varios comandos en curso; las respuestas no solicitadas empiezan con \"*\". Los mensajes se identifican por número de secuencia y por UID persistente.",
        en: "IMAP is a stateful text protocol: the client authenticates, selects a mailbox (SELECT) and works on messages with FETCH, SEARCH, STORE, COPY/MOVE and EXPUNGE. Each command carries a tag (e.g. a001) that the server repeats in the final response, allowing several commands in flight; untagged responses start with \"*\". Messages are identified by sequence number and by a persistent UID.",
      },
      {
        es: "El estado se guarda en el servidor mediante flags como \\Seen, \\Answered, \\Flagged, \\Deleted y \\Draft, y el cliente puede descargar solo cabeceras o partes MIME concretas, útil en conexiones lentas. Con IDLE el servidor avisa de correo nuevo al instante sin que el cliente tenga que preguntar repetidamente.",
        en: "State is kept on the server through flags such as \\Seen, \\Answered, \\Flagged, \\Deleted and \\Draft, and the client can fetch only headers or specific MIME parts, useful on slow links. With IDLE the server pushes new-mail notifications instantly without the client polling.",
      },
      {
        es: "Mark Crispin diseñó IMAP en Stanford en 1986; la primera especificación publicada fue IMAP2 (RFC 1064, 1988). IMAP4rev1 (RFC 3501, 2003) fue la base durante casi dos décadas, e IMAP4rev2 (RFC 9051, 2021) la actualiza incorporando extensiones como IDLE, MOVE y UTF-8.",
        en: "Mark Crispin designed IMAP at Stanford in 1986; the first published specification was IMAP2 (RFC 1064, 1988). IMAP4rev1 (RFC 3501, 2003) was the baseline for almost two decades, and IMAP4rev2 (RFC 9051, 2021) updates it by folding in extensions such as IDLE, MOVE and UTF-8.",
      },
    ],
    howItWorks: [
      { es: "El cliente se conecta a TCP 993 (TLS implícito) y el servidor saluda con * OK.", en: "The client connects to TCP 993 (implicit TLS) and the server greets with * OK." },
      { es: "a001 LOGIN o AUTHENTICATE (por ejemplo con OAuth 2.0 vía SASL).", en: "a001 LOGIN or AUTHENTICATE (e.g. OAuth 2.0 via SASL)." },
      { es: "a002 SELECT INBOX: el servidor informa cuántos mensajes hay, flags y UIDVALIDITY.", en: "a002 SELECT INBOX: the server reports message count, flags and UIDVALIDITY." },
      { es: "a003 FETCH / STORE / SEARCH para leer y marcar; IDLE para esperar cambios; LOGOUT al terminar.", en: "a003 FETCH / STORE / SEARCH to read and mark; IDLE to wait for changes; LOGOUT when done." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "143 (STARTTLS), 993 (TLS implícito)", en: "143 (STARTTLS), 993 (implicit TLS)" } },
      { label: { es: "Almacenamiento", en: "Storage" }, value: { es: "En el servidor, sincronizado entre dispositivos", en: "On the server, synced across devices" } },
      { label: { es: "Versión vigente", en: "Current version" }, value: "IMAP4rev2 (RFC 9051)" },
      { label: { es: "Notificación inmediata", en: "Push notification" }, value: "IDLE" },
    ],
    security: {
      es: "Con LOGIN en el puerto 143 sin STARTTLS la contraseña viaja en claro; RFC 8314 recomienda el puerto 993 con TLS implícito. Los grandes proveedores exigen OAuth 2.0 en lugar de contraseñas, porque las credenciales IMAP son blanco habitual de ataques de relleno de credenciales que eluden la autenticación multifactor.",
      en: "With LOGIN on port 143 without STARTTLS the password travels in cleartext; RFC 8314 recommends port 993 with implicit TLS. Large providers require OAuth 2.0 instead of passwords, because IMAP credentials are a common target of credential-stuffing attacks that bypass multi-factor authentication.",
    },
    tools: [
      { command: "openssl s_client -connect imap.example.com:993 -crlf", description: { es: "Abre una sesión IMAP cifrada para escribir comandos a mano", en: "Opens an encrypted IMAP session to type commands by hand" } },
      { command: "curl -u user imaps://imap.example.com/INBOX", description: { es: "Lista el buzón por IMAP con curl", en: "Lists the mailbox over IMAP with curl" } },
    ],
    wireshark: "imap",
    relations: { dependsOn: ["tcp", "tls", "mime"], replaces: ["pop3"] },
    specs: [
      { id: "RFC 9051", title: { es: "IMAP versión 4rev2", en: "Internet Message Access Protocol (IMAP) - Version 4rev2" }, url: rfc(9051) },
      { id: "RFC 3501", title: { es: "IMAP versión 4rev1", en: "Internet Message Access Protocol - Version 4rev1" }, url: rfc(3501) },
      { id: "RFC 8314", title: { es: "TLS preferido sobre texto claro para correo", en: "Cleartext Considered Obsolete: Use of TLS for Email Submission and Access" }, url: rfc(8314) },
    ],
  },
  {
    id: "pop3",
    acronym: "POP3",
    fullName: { es: "Protocolo de Oficina de Correo, versión 3", en: "Post Office Protocol version 3" },
    osi: [7],
    category: "email",
    status: "legacy",
    bodies: ["IETF"],
    year: 1984,
    identifiers: ["TCP 110", "TCP 995 (TLS)"],
    summary: {
      es: "POP3 descarga el correo del servidor a tu equipo y, normalmente, lo borra del servidor. Fue pensado para cuando se leía el correo en una sola computadora; hoy casi se ha sustituido por IMAP.",
      en: "POP3 downloads mail from the server to your device and usually deletes it from the server. It was designed for reading mail on a single computer; today it has largely been replaced by IMAP.",
    },
    analogy: {
      es: "Como un apartado postal: vas, sacas todas las cartas y te las llevas; el apartado queda vacío.",
      en: "Like a PO box: you go, take all the letters home, and the box is left empty.",
    },
    everyday: {
      es: "Cuentas antiguas de proveedores de Internet y programas que descargan el correo para archivarlo localmente.",
      en: "Old ISP mail accounts and programs that download mail to archive it locally.",
    },
    technical: [
      {
        es: "POP3 es un protocolo de texto muy sencillo con tres estados: AUTHORIZATION (USER/PASS o APOP), TRANSACTION (STAT, LIST, RETR, DELE, TOP, UIDL) y UPDATE, en el que al enviar QUIT se borran los mensajes marcados. Las respuestas empiezan con +OK o -ERR. No tiene carpetas, flags ni búsqueda en el servidor: solo existe el buzón de entrada.",
        en: "POP3 is a very simple text protocol with three states: AUTHORIZATION (USER/PASS or APOP), TRANSACTION (STAT, LIST, RETR, DELE, TOP, UIDL) and UPDATE, in which sending QUIT deletes the marked messages. Replies start with +OK or -ERR. It has no folders, flags or server-side search: only the inbox exists.",
      },
      {
        es: "La especificación vigente es RFC 1939 (1996, STD 53), heredera de la primera versión RFC 918 (1984). STLS (RFC 2595) añade cifrado sobre el puerto 110, y el 995 usa TLS implícito. UIDL permite a los clientes \"dejar una copia en el servidor\" recordando qué mensajes ya descargaron.",
        en: "The current specification is RFC 1939 (1996, STD 53), successor of the first version RFC 918 (1984). STLS (RFC 2595) adds encryption on port 110, and 995 uses implicit TLS. UIDL lets clients \"leave a copy on the server\" by remembering which messages they already fetched.",
      },
    ],
    howItWorks: [
      { es: "El cliente se conecta a TCP 995 y el servidor responde +OK.", en: "The client connects to TCP 995 and the server replies +OK." },
      { es: "USER y PASS autentican la sesión.", en: "USER and PASS authenticate the session." },
      { es: "STAT y LIST muestran cuántos mensajes hay; RETR n descarga cada uno y DELE n lo marca para borrar.", en: "STAT and LIST show how many messages there are; RETR n downloads each one and DELE n marks it for deletion." },
      { es: "QUIT: el servidor pasa a UPDATE, borra lo marcado y cierra.", en: "QUIT: the server enters UPDATE, deletes the marked messages and closes." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "110 (STLS), 995 (TLS implícito)", en: "110 (STLS), 995 (implicit TLS)" } },
      { label: { es: "Modelo", en: "Model" }, value: { es: "Descargar y (normalmente) borrar", en: "Download and (usually) delete" } },
      { label: { es: "Carpetas", en: "Folders" }, value: { es: "No, solo la bandeja de entrada", en: "No, inbox only" } },
      { label: { es: "Respuestas", en: "Replies" }, value: "+OK / -ERR" },
    ],
    security: {
      es: "USER y PASS en el puerto 110 sin STLS envían la contraseña en claro. APOP evitaba eso con un hash MD5 de desafío-respuesta, pero hoy se considera débil. Debe usarse el puerto 995 con TLS implícito, como recomienda RFC 8314.",
      en: "USER and PASS on port 110 without STLS send the password in cleartext. APOP avoided that with an MD5 challenge-response hash, but it is now considered weak. Port 995 with implicit TLS should be used, as RFC 8314 recommends.",
    },
    tools: [
      { command: "openssl s_client -connect pop.example.com:995 -crlf", description: { es: "Abre una sesión POP3 cifrada para escribir comandos a mano", en: "Opens an encrypted POP3 session to type commands by hand" } },
      { command: "curl -u user pop3s://pop.example.com/1", description: { es: "Descarga el primer mensaje por POP3", en: "Downloads the first message over POP3" } },
    ],
    wireshark: "pop",
    relations: { dependsOn: ["tcp", "tls", "mime"], replacedBy: ["imap"] },
    specs: [
      { id: "RFC 1939", title: { es: "Post Office Protocol - Versión 3", en: "Post Office Protocol - Version 3" }, url: rfc(1939) },
      { id: "RFC 2595", title: { es: "Uso de TLS con IMAP, POP3 y ACAP", en: "Using TLS with IMAP, POP3 and ACAP" }, url: rfc(2595) },
    ],
  },
  {
    id: "ftp",
    acronym: "FTP",
    fullName: { es: "Protocolo de Transferencia de Archivos", en: "File Transfer Protocol" },
    osi: [7],
    category: "transfer",
    status: "deprecated",
    bodies: ["IETF"],
    year: 1971,
    identifiers: ["TCP 21 (control)", "TCP 20 (datos, modo activo)", "TCP 990 (FTPS implícito)"],
    summary: {
      es: "FTP es uno de los protocolos más antiguos de Internet y sirve para subir y bajar archivos de un servidor. Envía usuario, contraseña y archivos sin cifrar, por eso hoy se prefiere SFTP o HTTPS.",
      en: "FTP is one of the oldest Internet protocols and is used to upload and download files to and from a server. It sends username, password and files unencrypted, which is why SFTP or HTTPS are preferred today.",
    },
    everyday: {
      es: "Hospedajes web antiguos, cámaras e impresoras que suben archivos a un servidor y algunos intercambios de archivos entre empresas.",
      en: "Older web hosting, cameras and printers that upload files to a server, and some business-to-business file exchanges.",
    },
    technical: [
      {
        es: "FTP usa dos conexiones: una de control en TCP 21, donde viajan comandos de texto (USER, PASS, CWD, LIST, RETR, STOR, QUIT) y respuestas de tres dígitos, y una conexión de datos distinta para cada listado o archivo. Esa separación, pensada para las redes de los años 70, es su principal problema con NAT y firewalls.",
        en: "FTP uses two connections: a control connection on TCP 21 carrying text commands (USER, PASS, CWD, LIST, RETR, STOR, QUIT) and three-digit replies, and a separate data connection for each listing or file. That separation, designed for 1970s networks, is its main problem with NAT and firewalls.",
      },
      {
        es: "En modo activo el cliente anuncia con PORT una IP y puerto, y el servidor abre la conexión de datos desde su puerto 20 hacia el cliente, lo que suelen bloquear los firewalls del cliente. En modo pasivo el cliente envía PASV (o EPSV, RFC 2428, compatible con IPv6), el servidor responde 227 con un puerto efímero y es el cliente quien se conecta. Los firewalls y NAT necesitan un ALG que lea el canal de control para abrir esos puertos.",
        en: "In active mode the client announces an IP and port with PORT, and the server opens the data connection from its port 20 to the client, which client firewalls usually block. In passive mode the client sends PASV (or EPSV, RFC 2428, IPv6-friendly), the server replies 227 with an ephemeral port and the client connects to it. Firewalls and NAT need an ALG that reads the control channel to open those ports.",
      },
      {
        es: "RFC 959 (1985) es la especificación vigente; la primera versión fue RFC 114 (1971), anterior incluso a TCP/IP. FTPS (RFC 4217) añade TLS con AUTH TLS en el puerto 21 (explícito) o en el 990 (implícito), y es distinto de SFTP. Chrome y Firefox eliminaron el soporte de ftp:// en 2021.",
        en: "RFC 959 (1985) is the current specification; the first version was RFC 114 (1971), predating TCP/IP itself. FTPS (RFC 4217) adds TLS via AUTH TLS on port 21 (explicit) or on 990 (implicit), and is different from SFTP. Chrome and Firefox removed ftp:// support in 2021.",
      },
    ],
    howItWorks: [
      { es: "El cliente abre la conexión de control a TCP 21; el servidor saluda con 220.", en: "The client opens the control connection to TCP 21; the server greets with 220." },
      { es: "USER y PASS (331 y 230) autentican la sesión en texto claro.", en: "USER and PASS (331 and 230) authenticate the session in cleartext." },
      { es: "PASV → 227 con IP y puerto; el cliente abre la conexión de datos hacia ese puerto.", en: "PASV → 227 with IP and port; the client opens the data connection to that port." },
      { es: "RETR archivo: 150, el archivo viaja por la conexión de datos, que se cierra; 226 confirma el fin.", en: "RETR file: 150, the file flows over the data connection, which then closes; 226 confirms completion." },
    ],
    facts: [
      { label: { es: "Conexiones", en: "Connections" }, value: { es: "Control (21) + una de datos por transferencia", en: "Control (21) + one data connection per transfer" } },
      { label: { es: "Modos", en: "Modes" }, value: { es: "Activo (PORT) y pasivo (PASV/EPSV)", en: "Active (PORT) and passive (PASV/EPSV)" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "Ninguno; FTPS (RFC 4217) lo añade", en: "None; FTPS (RFC 4217) adds it" } },
      { label: { es: "Tipos de transferencia", en: "Transfer types" }, value: { es: "ASCII (A) e imagen/binario (I)", en: "ASCII (A) and image/binary (I)" } },
    ],
    security: {
      es: "Credenciales y datos viajan en claro y pueden capturarse con cualquier sniffer. El ataque FTP bounce aprovecha PORT para que el servidor se conecte a terceros (RFC 2577), y los servidores con acceso anónimo escribible se abusan para alojar contenido ilícito. Debe sustituirse por SFTP, FTPS o HTTPS.",
      en: "Credentials and data travel in cleartext and can be captured by any sniffer. The FTP bounce attack abuses PORT to make the server connect to third parties (RFC 2577), and servers with writable anonymous access are abused to host illicit content. It should be replaced by SFTP, FTPS or HTTPS.",
    },
    tools: [
      { command: "curl -u user ftp://ftp.example.com/", description: { es: "Lista un directorio FTP con curl", en: "Lists an FTP directory with curl" } },
      { command: "lftp -u user ftp.example.com", description: { es: "Cliente FTP/FTPS interactivo con reintentos y espejo", en: "Interactive FTP/FTPS client with retries and mirroring" } },
    ],
    wireshark: "ftp || ftp-data",
    relations: { dependsOn: ["tcp"], replacedBy: ["sftp"] },
    specs: [
      { id: "RFC 959", title: { es: "File Transfer Protocol", en: "File Transfer Protocol (FTP)" }, url: rfc(959) },
      { id: "RFC 2428", title: { es: "Extensiones de FTP para IPv6 y NAT (EPSV/EPRT)", en: "FTP Extensions for IPv6 and NATs" }, url: rfc(2428) },
      { id: "RFC 4217", title: { es: "Protección de FTP con TLS (FTPS)", en: "Securing FTP with TLS" }, url: rfc(4217) },
    ],
  },
  {
    id: "sftp",
    acronym: "SFTP",
    fullName: { es: "Protocolo de Transferencia de Archivos SSH", en: "SSH File Transfer Protocol" },
    osi: [7],
    category: "transfer",
    status: "current",
    bodies: ["IETF"],
    year: 2001,
    identifiers: ["TCP 22 (sobre SSH)"],
    summary: {
      es: "SFTP transfiere y administra archivos a través de una conexión SSH cifrada. Pese al nombre, no es FTP con cifrado: es un protocolo distinto que usa una sola conexión y la seguridad de SSH.",
      en: "SFTP transfers and manages files over an encrypted SSH connection. Despite the name, it is not FTP with encryption: it is a different protocol that uses a single connection and SSH's security.",
    },
    everyday: {
      es: "Subir archivos a un servidor con FileZilla o WinSCP, despliegues automatizados e intercambios de archivos entre bancos y empresas.",
      en: "Uploading files to a server with FileZilla or WinSCP, automated deployments and file exchanges between banks and businesses.",
    },
    technical: [
      {
        es: "SFTP corre como subsistema \"sftp\" dentro de un canal de sesión SSH, por lo que hereda el cifrado, la integridad y la autenticación de SSH y usa una sola conexión TCP al puerto 22. Es un protocolo binario de petición-respuesta: cada paquete tiene longitud, tipo e ID de petición, lo que permite varias operaciones en paralelo.",
        en: "SFTP runs as the \"sftp\" subsystem inside an SSH session channel, so it inherits SSH's encryption, integrity and authentication and uses a single TCP connection to port 22. It is a binary request-response protocol: each packet has a length, type and request ID, allowing several operations in flight.",
      },
      {
        es: "Más que transferir, ofrece un sistema de archivos remoto: SSH_FXP_OPEN devuelve un handle, y sobre él se hacen READ y WRITE en posiciones arbitrarias (lo que permite reanudar descargas), además de STAT, OPENDIR/READDIR, RENAME, REMOVE y MKDIR. Nunca llegó a ser RFC: el grupo de trabajo secsh publicó borradores draft-ietf-secsh-filexfer hasta la versión 6, pero la más desplegada es la versión 3 (draft -02), que implementa OpenSSH.",
        en: "Rather than just transferring, it offers a remote filesystem: SSH_FXP_OPEN returns a handle on which READ and WRITE happen at arbitrary offsets (enabling resumed downloads), plus STAT, OPENDIR/READDIR, RENAME, REMOVE and MKDIR. It never became an RFC: the secsh working group published draft-ietf-secsh-filexfer drafts up to version 6, but the most widely deployed is version 3 (draft -02), which OpenSSH implements.",
      },
    ],
    howItWorks: [
      { es: "Se establece una conexión SSH normal (intercambio de claves y autenticación).", en: "A normal SSH connection is established (key exchange and authentication)." },
      { es: "El cliente abre un canal de sesión y solicita el subsistema \"sftp\".", en: "The client opens a session channel and requests the \"sftp\" subsystem." },
      { es: "SSH_FXP_INIT / SSH_FXP_VERSION negocian la versión del protocolo (normalmente 3).", en: "SSH_FXP_INIT / SSH_FXP_VERSION negotiate the protocol version (usually 3)." },
      { es: "OPEN → handle; READ/WRITE por bloques con desplazamiento; CLOSE libera el handle.", en: "OPEN → handle; block READ/WRITE with offsets; CLOSE releases the handle." },
    ],
    facts: [
      { label: { es: "Transporte", en: "Transport" }, value: { es: "Subsistema de SSH (TCP 22)", en: "SSH subsystem (TCP 22)" } },
      { label: { es: "Conexiones", en: "Connections" }, value: { es: "Una sola", en: "Just one" } },
      { label: { es: "Versión más usada", en: "Most deployed version" }, value: { es: "3 (draft-ietf-secsh-filexfer-02)", en: "3 (draft-ietf-secsh-filexfer-02)" } },
      { label: { es: "Estado de estandarización", en: "Standardisation status" }, value: { es: "Borrador IETF, nunca RFC", en: "IETF draft, never an RFC" } },
      { label: { es: "Relación con FTP", en: "Relation to FTP" }, value: { es: "Ninguna (no es FTP sobre SSL)", en: "None (it is not FTP over SSL)" } },
    ],
    security: {
      es: "Su seguridad es la de SSH: hay que verificar la huella de la clave del servidor y preferir autenticación por clave pública. Para cuentas que solo deben transferir archivos, OpenSSH permite forzar el subsistema (ForceCommand internal-sftp) y enjaular al usuario con ChrootDirectory.",
      en: "Its security is SSH's: verify the server's host key fingerprint and prefer public-key authentication. For accounts that should only transfer files, OpenSSH can force the subsystem (ForceCommand internal-sftp) and jail the user with ChrootDirectory.",
    },
    tools: [
      { command: "sftp user@host", description: { es: "Sesión SFTP interactiva (get, put, ls, cd)", en: "Interactive SFTP session (get, put, ls, cd)" } },
      { command: "scp archivo user@host:/ruta/", description: { es: "Copia un archivo; desde OpenSSH 9.0 scp usa SFTP por debajo", en: "Copies a file; since OpenSSH 9.0 scp uses SFTP underneath" } },
      { command: "sftp -b lote.txt user@host", description: { es: "Ejecuta una lista de comandos SFTP en modo batch", en: "Runs a list of SFTP commands in batch mode" } },
    ],
    wireshark: "ssh",
    relations: { dependsOn: ["ssh", "tcp"], replaces: ["ftp"] },
    specs: [
      { id: "draft-ietf-secsh-filexfer-02", title: { es: "SSH File Transfer Protocol (versión 3)", en: "SSH File Transfer Protocol (version 3)" }, url: "https://datatracker.ietf.org/doc/html/draft-ietf-secsh-filexfer-02" },
    ],
  },
  {
    id: "tftp",
    acronym: "TFTP",
    fullName: { es: "Protocolo Trivial de Transferencia de Archivos", en: "Trivial File Transfer Protocol" },
    osi: [7],
    category: "transfer",
    status: "current",
    bodies: ["IETF"],
    year: 1981,
    identifiers: ["UDP 69"],
    summary: {
      es: "TFTP es un protocolo mínimo para transferir archivos sin usuario ni contraseña. Es tan simple que cabe en el firmware de una tarjeta de red, por eso se usa para arrancar equipos por red y cargar configuraciones o firmware en routers y switches.",
      en: "TFTP is a minimal protocol for transferring files without a username or password. It is so simple it fits in a network card's firmware, which is why it is used to boot machines over the network and load configurations or firmware onto routers and switches.",
    },
    everyday: {
      es: "Arranque por red PXE de computadoras, teléfonos IP que descargan su configuración y respaldos de configuración de equipos de red.",
      en: "PXE network boot of computers, IP phones downloading their configuration and configuration backups of network gear.",
    },
    technical: [
      {
        es: "TFTP funciona sobre UDP en modo lock-step: el archivo se envía en bloques de 512 bytes numerados, y cada bloque debe confirmarse con un ACK antes de enviar el siguiente; un bloque de menos de 512 bytes marca el final. Solo hay cinco tipos de paquete: RRQ (1), WRQ (2), DATA (3), ACK (4) y ERROR (5), más OACK (6) para opciones. El servidor escucha en el puerto 69 pero responde desde un puerto efímero nuevo (TID) para cada transferencia.",
        en: "TFTP runs over UDP in lock-step: the file is sent in numbered 512-byte blocks, and each block must be acknowledged before the next is sent; a block shorter than 512 bytes marks the end. There are only five packet types: RRQ (1), WRQ (2), DATA (3), ACK (4) and ERROR (5), plus OACK (6) for options. The server listens on port 69 but replies from a fresh ephemeral port (TID) for each transfer.",
      },
      {
        es: "Con un número de bloque de 16 bits y bloques de 512 bytes, el límite original era 32 MB; la opción blksize (RFC 2348) permite bloques mayores y tsize (RFC 2349) anuncia el tamaño. No tiene listado de directorios, autenticación ni cifrado. En PXE, el servidor DHCP indica con las opciones 66 y 67 el servidor TFTP y el archivo de arranque. La especificación vigente es RFC 1350 (1992), que reemplazó a RFC 783 (1981).",
        en: "With a 16-bit block number and 512-byte blocks, the original limit was 32 MB; the blksize option (RFC 2348) allows larger blocks and tsize (RFC 2349) announces the size. It has no directory listing, authentication or encryption. In PXE, the DHCP server uses options 66 and 67 to point to the TFTP server and boot file. The current specification is RFC 1350 (1992), which replaced RFC 783 (1981).",
      },
    ],
    howItWorks: [
      { es: "RRQ: el cliente pide el archivo al puerto UDP 69 indicando el modo (octet o netascii).", en: "RRQ: the client requests the file on UDP port 69, stating the mode (octet or netascii)." },
      { es: "El servidor responde desde un puerto nuevo con DATA bloque 1 (512 B).", en: "The server answers from a new port with DATA block 1 (512 B)." },
      { es: "El cliente confirma con ACK 1; el servidor envía el bloque 2, y así sucesivamente, retransmitiendo si expira el temporizador.", en: "The client replies ACK 1; the server sends block 2, and so on, retransmitting on timeout." },
      { es: "Un DATA de menos de 512 B indica el último bloque; su ACK termina la transferencia.", en: "A DATA shorter than 512 B is the last block; its ACK ends the transfer." },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: { es: "UDP 69 (luego puertos efímeros)", en: "UDP 69 (then ephemeral ports)" } },
      { label: { es: "Bloque", en: "Block" }, value: { es: "512 B por defecto (blksize para cambiarlo)", en: "512 B by default (blksize to change it)" } },
      { label: { es: "Control de flujo", en: "Flow control" }, value: { es: "Lock-step: un bloque en vuelo", en: "Lock-step: one block in flight" } },
      { label: { es: "Autenticación", en: "Authentication" }, value: { es: "Ninguna", en: "None" } },
      { label: { es: "Tipos de paquete", en: "Packet types" }, value: "RRQ, WRQ, DATA, ACK, ERROR, OACK" },
    ],
    security: {
      es: "Cualquiera que alcance el puerto 69 puede leer (y a veces escribir) archivos, incluidas configuraciones de routers con contraseñas. Debe restringirse a la red de gestión, servirse desde un directorio aislado en solo lectura y no exponerse nunca a Internet.",
      en: "Anyone who can reach port 69 can read (and sometimes write) files, including router configurations with passwords. It should be restricted to the management network, served from an isolated read-only directory and never exposed to the Internet.",
    },
    tools: [
      { command: "tftp 192.0.2.10 -c get archivo.cfg", description: { es: "Descarga un archivo con el cliente tftp-hpa", en: "Downloads a file with the tftp-hpa client" } },
      { command: "curl -O tftp://192.0.2.10/archivo.cfg", description: { es: "Descarga por TFTP con curl", en: "Downloads over TFTP with curl" } },
    ],
    wireshark: "tftp",
    relations: { dependsOn: ["udp", "dhcp"] },
    specs: [
      { id: "RFC 1350", title: { es: "El protocolo TFTP (revisión 2)", en: "The TFTP Protocol (Revision 2)" }, url: rfc(1350) },
      { id: "RFC 2347", title: { es: "Extensión de opciones de TFTP", en: "TFTP Option Extension" }, url: rfc(2347) },
      { id: "RFC 2348", title: { es: "Opción de tamaño de bloque", en: "TFTP Blocksize Option" }, url: rfc(2348) },
    ],
  },
  {
    id: "ssh",
    acronym: "SSH",
    fullName: { es: "Secure Shell (intérprete de comandos seguro)", en: "Secure Shell" },
    osi: [7],
    category: "remote",
    status: "current",
    bodies: ["IETF"],
    year: 1995,
    identifiers: ["TCP 22"],
    summary: {
      es: "SSH permite controlar otra computadora a distancia por una conexión cifrada: escribes comandos como si estuvieras frente a ella. También sirve para copiar archivos y para crear túneles seguros para otras aplicaciones.",
      en: "SSH lets you control another computer remotely over an encrypted connection: you type commands as if you were sitting in front of it. It is also used to copy files and to build secure tunnels for other applications.",
    },
    everyday: {
      es: "Administrar servidores Linux y equipos de red, hacer git push a GitHub y conectarse a máquinas en la nube.",
      en: "Administering Linux servers and network devices, running git push to GitHub and connecting to cloud machines.",
    },
    technical: [
      {
        es: "SSH-2 se organiza en tres protocolos sobre TCP: la capa de transporte (RFC 4253) negocia algoritmos, hace el intercambio de claves (por ejemplo curve25519-sha256), autentica al servidor con su clave de host y cifra e integra todos los paquetes; la de autenticación de usuario (RFC 4252) admite publickey, password, keyboard-interactive y GSSAPI; y la de conexión (RFC 4254) multiplexa canales sobre el mismo túnel.",
        en: "SSH-2 is organised as three protocols over TCP: the transport layer (RFC 4253) negotiates algorithms, performs key exchange (e.g. curve25519-sha256), authenticates the server with its host key, and encrypts and integrity-protects every packet; the user authentication protocol (RFC 4252) supports publickey, password, keyboard-interactive and GSSAPI; and the connection protocol (RFC 4254) multiplexes channels over the same tunnel.",
      },
      {
        es: "Cada canal puede ser una sesión interactiva (shell o comando), un subsistema como SFTP, o un reenvío de puertos: local (-L), remoto (-R) o dinámico como proxy SOCKS (-D). OpenSSH usa por defecto intercambios de claves híbridos resistentes a computación cuántica desde la versión 9.0.",
        en: "Each channel can be an interactive session (shell or command), a subsystem such as SFTP, or port forwarding: local (-L), remote (-R) or dynamic as a SOCKS proxy (-D). OpenSSH has defaulted to hybrid post-quantum key exchange since version 9.0.",
      },
      {
        es: "Tatu Ylönen creó SSH-1 en 1995 para reemplazar Telnet y rlogin, pero tenía fallos de diseño y hoy se considera inseguro. SSH-2 se estandarizó en la IETF en 2006 con RFC 4251–4254, y la versión se anuncia al conectar con una cadena como SSH-2.0-OpenSSH_9.6.",
        en: "Tatu Ylönen created SSH-1 in 1995 to replace Telnet and rlogin, but it had design flaws and is now considered insecure. SSH-2 was standardised at the IETF in 2006 as RFC 4251–4254, and the version is announced on connect with a string such as SSH-2.0-OpenSSH_9.6.",
      },
    ],
    howItWorks: [
      { es: "Ambos extremos intercambian su cadena de versión y la lista de algoritmos admitidos (KEXINIT).", en: "Both ends exchange their version string and supported algorithm lists (KEXINIT)." },
      { es: "Intercambio de claves: acuerdan un secreto compartido y el servidor firma con su clave de host, que el cliente compara con known_hosts.", en: "Key exchange: they agree on a shared secret and the server signs with its host key, which the client checks against known_hosts." },
      { es: "Autenticación del usuario, idealmente con clave pública (el cliente firma un desafío con su clave privada).", en: "User authentication, ideally with a public key (the client signs a challenge with its private key)." },
      { es: "Se abren canales: shell, comandos, SFTP o reenvíos de puertos, todos multiplexados en la misma conexión.", en: "Channels are opened: shell, commands, SFTP or port forwards, all multiplexed on the same connection." },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: "TCP 22" },
      { label: { es: "Capas", en: "Layers" }, value: { es: "Transporte, autenticación de usuario y conexión", en: "Transport, user authentication and connection" } },
      { label: { es: "Autenticación del servidor", en: "Server authentication" }, value: { es: "Clave de host (TOFU o SSHFP/certificados)", en: "Host key (TOFU or SSHFP/certificates)" } },
      { label: { es: "Reenvío de puertos", en: "Port forwarding" }, value: { es: "Local, remoto y dinámico (SOCKS)", en: "Local, remote and dynamic (SOCKS)" } },
      { label: { es: "SSH-1", en: "SSH-1" }, value: { es: "Obsoleto e inseguro", en: "Obsolete and insecure" } },
    ],
    security: {
      es: "La primera conexión confía en la clave del servidor tal como llega (TOFU, trust on first use): si nadie verifica la huella, un intermediario puede suplantarlo; los registros SSHFP en DNS (RFC 4255) o los certificados de OpenSSH lo evitan. Los servidores expuestos reciben ataques de fuerza bruta constantes, así que conviene desactivar el acceso por contraseña. El ataque Terrapin (CVE-2023-48795) mostró que podían truncarse mensajes del handshake y se corrigió con el modo \"strict kex\".",
      en: "The first connection trusts the server key as received (TOFU, trust on first use): if nobody verifies the fingerprint, a man-in-the-middle can impersonate the server; DNS SSHFP records (RFC 4255) or OpenSSH certificates prevent that. Exposed servers face constant brute-force attempts, so password login should be disabled. The Terrapin attack (CVE-2023-48795) showed handshake messages could be truncated and was fixed with \"strict kex\".",
    },
    tools: [
      { command: "ssh -v user@host", description: { es: "Conecta mostrando la negociación de algoritmos y autenticación", en: "Connects showing algorithm negotiation and authentication" } },
      { command: "ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub", description: { es: "Muestra la huella de la clave de host para verificarla", en: "Shows the host key fingerprint for verification" } },
      { command: "ssh -L 8080:localhost:80 user@host", description: { es: "Reenvía el puerto local 8080 al puerto 80 del servidor", en: "Forwards local port 8080 to the server's port 80" } },
    ],
    wireshark: "ssh",
    relations: { dependsOn: ["tcp"], usedBy: ["sftp"], replaces: ["telnet"] },
    specs: [
      { id: "RFC 4251", title: { es: "Arquitectura del protocolo SSH", en: "The Secure Shell (SSH) Protocol Architecture" }, url: rfc(4251) },
      { id: "RFC 4252", title: { es: "Protocolo de autenticación de SSH", en: "The Secure Shell (SSH) Authentication Protocol" }, url: rfc(4252) },
      { id: "RFC 4253", title: { es: "Protocolo de la capa de transporte de SSH", en: "The Secure Shell (SSH) Transport Layer Protocol" }, url: rfc(4253) },
      { id: "RFC 4254", title: { es: "Protocolo de conexión de SSH", en: "The Secure Shell (SSH) Connection Protocol" }, url: rfc(4254) },
    ],
  },
  {
    id: "telnet",
    acronym: "Telnet",
    fullName: { es: "Protocolo Telnet (terminal remota)", en: "Telnet Protocol (remote terminal)" },
    osi: [7],
    category: "remote",
    status: "deprecated",
    bodies: ["IETF"],
    year: 1969,
    identifiers: ["TCP 23"],
    summary: {
      es: "Telnet fue la forma original de conectarse a una computadora remota y escribir comandos en ella. Todo, incluida la contraseña, viaja sin cifrar, por eso se reemplazó por SSH.",
      en: "Telnet was the original way to connect to a remote computer and type commands on it. Everything, including the password, travels unencrypted, which is why it was replaced by SSH.",
    },
    everyday: {
      es: "Equipos de red antiguos, algunos dispositivos IoT mal configurados y como prueba rápida de si un puerto TCP responde.",
      en: "Old network equipment, some badly configured IoT devices, and as a quick test of whether a TCP port answers.",
    },
    technical: [
      {
        es: "Telnet ofrece un canal bidireccional de 8 bits sobre TCP entre una terminal y un host, modelado como una Network Virtual Terminal (NVT) con un conjunto de caracteres y convenciones de fin de línea comunes. Los comandos se señalan con el byte IAC (255) seguido de un código, y las opciones (eco, supresión de go-ahead, tipo de terminal, tamaño de ventana…) se negocian con WILL, WONT, DO y DONT.",
        en: "Telnet provides a bidirectional 8-bit channel over TCP between a terminal and a host, modelled as a Network Virtual Terminal (NVT) with a common character set and end-of-line conventions. Commands are signalled with the IAC byte (255) followed by a code, and options (echo, suppress go-ahead, terminal type, window size…) are negotiated with WILL, WONT, DO and DONT.",
      },
      {
        es: "Sus orígenes se remontan a RFC 15 (1969) en ARPANET; la especificación vigente es RFC 854 (1983, STD 8), con la negociación de opciones en RFC 855. No incluye cifrado ni autenticación propia: el login lo hace el sistema remoto sobre el mismo canal en claro.",
        en: "Its origins go back to RFC 15 (1969) on the ARPANET; the current specification is RFC 854 (1983, STD 8), with option negotiation in RFC 855. It has no encryption or authentication of its own: the remote system performs login over the same cleartext channel.",
      },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: "TCP 23" },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "Ninguno", en: "None" } },
      { label: { es: "Negociación de opciones", en: "Option negotiation" }, value: "IAC + WILL/WONT/DO/DONT" },
      { label: { es: "Sustituto", en: "Replacement" }, value: "SSH" },
    ],
    security: {
      es: "Usuario, contraseña y toda la sesión viajan en claro y pueden capturarse o secuestrarse. Los servicios Telnet expuestos con credenciales por defecto fueron la vía de propagación de la botnet Mirai en 2016. Debe desactivarse y usarse SSH en su lugar.",
      en: "Username, password and the whole session travel in cleartext and can be captured or hijacked. Exposed Telnet services with default credentials were the propagation path of the Mirai botnet in 2016. It should be disabled and SSH used instead.",
    },
    tools: [
      { command: "telnet example.com 80", description: { es: "Abre una conexión TCP en crudo para probar un puerto", en: "Opens a raw TCP connection to test a port" } },
      { command: "nmap -p 23 --open 192.0.2.0/24", description: { es: "Busca equipos con Telnet expuesto en una red", en: "Finds hosts with Telnet exposed on a network" } },
    ],
    wireshark: "telnet",
    relations: { dependsOn: ["tcp"], replacedBy: ["ssh"] },
    specs: [
      { id: "RFC 854", title: { es: "Especificación del protocolo Telnet", en: "Telnet Protocol Specification" }, url: rfc(854) },
      { id: "RFC 855", title: { es: "Especificación de opciones de Telnet", en: "Telnet Option Specifications" }, url: rfc(855) },
    ],
  },
  {
    id: "smb",
    acronym: "SMB",
    fullName: { es: "Bloque de Mensajes del Servidor", en: "Server Message Block" },
    osi: [7],
    category: "files",
    status: "current",
    bodies: ["Microsoft"],
    year: 1983,
    identifiers: ["TCP 445", "TCP 139 (sobre NetBIOS, legado)", "UDP 443 (SMB sobre QUIC)"],
    summary: {
      es: "SMB es el protocolo con el que Windows comparte carpetas, archivos e impresoras en la red. Cuando abres \\\\servidor\\carpeta, usas SMB; Linux y macOS también lo hablan gracias a Samba y a sus propios clientes.",
      en: "SMB is the protocol Windows uses to share folders, files and printers on the network. When you open \\\\server\\share you are using SMB; Linux and macOS speak it too thanks to Samba and their own clients.",
    },
    everyday: {
      es: "Unidades de red de la oficina, carpetas compartidas en casa, NAS y el acceso a controladores de dominio de Active Directory.",
      en: "Office network drives, shared folders at home, NAS devices and access to Active Directory domain controllers.",
    },
    technical: [
      {
        es: "SMB se originó en IBM a principios de los años 80 (suele citarse 1983) y Microsoft lo extendió en su dialecto CIFS. SMB 2.0 llegó con Windows Vista (2006) como un rediseño que redujo los comandos de más de cien a 19, añadió créditos para tener muchas peticiones en curso y handles duraderos. Hoy se habla directamente sobre TCP 445; el transporte sobre NetBIOS (TCP 139) es legado.",
        en: "SMB originated at IBM in the early 1980s (1983 is the usual date) and Microsoft extended it into its CIFS dialect. SMB 2.0 arrived with Windows Vista (2006) as a redesign that cut the command set from over a hundred to 19, added credits to keep many requests in flight and durable handles. Today it runs directly over TCP 445; transport over NetBIOS (TCP 139) is legacy.",
      },
      {
        es: "SMB 3.0 (Windows 8 / Server 2012) añadió cifrado de extremo a extremo con AES-CCM, SMB Multichannel (varias conexiones y NIC a la vez), SMB Direct sobre RDMA y conmutación por error transparente. SMB 3.1.1 (Windows 10 / Server 2016) incorporó la integridad previa a la autenticación con SHA-512 contra ataques de degradación y AES-GCM, y las versiones recientes de Windows admiten SMB sobre QUIC en UDP 443.",
        en: "SMB 3.0 (Windows 8 / Server 2012) added end-to-end AES-CCM encryption, SMB Multichannel (several connections and NICs at once), SMB Direct over RDMA and transparent failover. SMB 3.1.1 (Windows 10 / Server 2016) introduced SHA-512 pre-authentication integrity against downgrade attacks and AES-GCM, and recent Windows versions support SMB over QUIC on UDP 443.",
      },
      {
        es: "El protocolo está documentado por Microsoft como especificación abierta [MS-SMB2], que cubre SMB 2 y 3; la autenticación se delega en Kerberos o NTLM mediante SPNEGO. Samba es la implementación libre usada en Linux y en la mayoría de los NAS.",
        en: "Microsoft documents the protocol as the open specification [MS-SMB2], covering SMB 2 and 3; authentication is delegated to Kerberos or NTLM through SPNEGO. Samba is the free implementation used on Linux and most NAS devices.",
      },
    ],
    howItWorks: [
      { es: "NEGOTIATE: cliente y servidor acuerdan el dialecto más alto común (por ejemplo 3.1.1) y sus capacidades.", en: "NEGOTIATE: client and server agree on the highest common dialect (e.g. 3.1.1) and capabilities." },
      { es: "SESSION_SETUP: autenticación con Kerberos o NTLM vía SPNEGO; se derivan las claves de firma y cifrado.", en: "SESSION_SETUP: authentication with Kerberos or NTLM via SPNEGO; signing and encryption keys are derived." },
      { es: "TREE_CONNECT: se conecta al recurso compartido \\\\servidor\\carpeta.", en: "TREE_CONNECT: connects to the \\\\server\\share resource." },
      { es: "CREATE devuelve un FileId; READ, WRITE, QUERY_DIRECTORY y CLOSE operan sobre él.", en: "CREATE returns a FileId; READ, WRITE, QUERY_DIRECTORY and CLOSE operate on it." },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: { es: "TCP 445 (139 con NetBIOS, legado)", en: "TCP 445 (139 with NetBIOS, legacy)" } },
      { label: { es: "Dialectos vigentes", en: "Current dialects" }, value: "SMB 2.x, 3.0, 3.0.2, 3.1.1" },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "Desde SMB 3.0 (AES-CCM; AES-GCM en 3.1.1)", en: "Since SMB 3.0 (AES-CCM; AES-GCM in 3.1.1)" } },
      { label: { es: "Autenticación", en: "Authentication" }, value: { es: "Kerberos o NTLM (SPNEGO)", en: "Kerberos or NTLM (SPNEGO)" } },
      { label: { es: "Especificación", en: "Specification" }, value: "[MS-SMB2] (Microsoft Open Specifications)" },
    ],
    security: {
      es: "SMBv1 está obsoleto: la vulnerabilidad que explotaba EternalBlue (MS17-010) permitió que WannaCry y NotPetya se propagaran en 2017, y Windows ya no lo instala por defecto. El puerto 445 nunca debe exponerse a Internet. Sin firma SMB obligatoria, las credenciales NTLM pueden reenviarse (NTLM relay); conviene exigir firma o cifrado y preferir Kerberos.",
      en: "SMBv1 is deprecated: the flaw exploited by EternalBlue (MS17-010) let WannaCry and NotPetya spread in 2017, and Windows no longer installs it by default. Port 445 should never be exposed to the Internet. Without mandatory SMB signing, NTLM credentials can be relayed (NTLM relay); require signing or encryption and prefer Kerberos.",
    },
    tools: [
      { command: "smbclient -L //servidor -U usuario", description: { es: "Lista los recursos compartidos de un servidor (Samba)", en: "Lists a server's shares (Samba)" } },
      { command: "Get-SmbConnection", description: { es: "Muestra las conexiones SMB activas y su dialecto (PowerShell)", en: "Shows active SMB connections and their dialect (PowerShell)" } },
      { command: "net use Z: \\\\servidor\\carpeta", description: { es: "Asigna una unidad de red en Windows", en: "Maps a network drive on Windows" } },
    ],
    wireshark: "smb2",
    relations: { dependsOn: ["tcp", "quic", "kerberos", "netbios"] },
    specs: [
      { id: "[MS-SMB2]", title: { es: "Protocolo Server Message Block (SMB) versiones 2 y 3", en: "Server Message Block (SMB) Protocol Versions 2 and 3" } },
    ],
  },
  {
    id: "nfs",
    acronym: "NFS",
    fullName: { es: "Sistema de Archivos de Red", en: "Network File System" },
    osi: [7],
    category: "files",
    status: "current",
    bodies: ["IETF"],
    year: 1984,
    identifiers: ["TCP 2049", "TCP/UDP 111 (portmapper, NFSv3)"],
    summary: {
      es: "NFS permite montar una carpeta de otro servidor como si fuera un disco local, de modo que los programas leen y escriben archivos remotos sin notar la diferencia. Es el estándar para compartir archivos en Unix y Linux.",
      en: "NFS lets you mount a folder from another server as if it were a local disk, so programs read and write remote files without noticing the difference. It is the standard for file sharing on Unix and Linux.",
    },
    everyday: {
      es: "Directorios de usuario compartidos en universidades, almacenamiento de clústeres, volúmenes persistentes de Kubernetes y NAS empresariales.",
      en: "Shared home directories at universities, cluster storage, Kubernetes persistent volumes and enterprise NAS.",
    },
    technical: [
      {
        es: "NFS está construido sobre ONC RPC, y todos los argumentos y resultados se codifican en XDR. Sun Microsystems lo desarrolló en 1984; NFSv3 (RFC 1813, 1995) es sin estado en el servidor, admite archivos de 64 bits y escrituras asíncronas con COMMIT, pero depende de servicios auxiliares: portmapper (111), mountd y NLM para bloqueos, cada uno en puertos variables.",
        en: "NFS is built on ONC RPC, with every argument and result encoded in XDR. Sun Microsystems developed it in 1984; NFSv3 (RFC 1813, 1995) is stateless on the server, supports 64-bit files and asynchronous writes with COMMIT, but relies on side services: portmapper (111), mountd and NLM for locking, each on variable ports.",
      },
      {
        es: "NFSv4 (hoy RFC 7530) cambió de enfoque: es con estado, usa un único puerto (TCP 2049), integra montaje y bloqueos, agrupa operaciones en COMPOUND para ahorrar viajes de ida y vuelta, delega archivos al cliente para cachear y usa ACL de estilo Windows y nombres de usuario en lugar de UID numéricos. NFSv4.1 (RFC 8881, 2020, que reemplaza a RFC 5661) añadió sesiones con semántica exactly-once y pNFS para leer en paralelo de varios servidores de datos; NFSv4.2 (RFC 7862) añadió copia del lado del servidor y archivos dispersos.",
        en: "NFSv4 (now RFC 7530) changed approach: it is stateful, uses a single port (TCP 2049), integrates mounting and locking, batches operations into COMPOUND to save round trips, delegates files to the client for caching and uses Windows-style ACLs and user names instead of numeric UIDs. NFSv4.1 (RFC 8881, 2020, replacing RFC 5661) added sessions with exactly-once semantics and pNFS for parallel reads from multiple data servers; NFSv4.2 (RFC 7862) added server-side copy and sparse files.",
      },
    ],
    howItWorks: [
      { es: "El administrador exporta un directorio en el servidor (por ejemplo en /etc/exports).", en: "The administrator exports a directory on the server (e.g. in /etc/exports)." },
      { es: "El cliente monta: mount -t nfs4 servidor:/ruta /mnt, abriendo TCP 2049.", en: "The client mounts: mount -t nfs4 server:/path /mnt, opening TCP 2049." },
      { es: "En NFSv4.1 se crea una sesión (EXCHANGE_ID, CREATE_SESSION) y el cliente se autentica con AUTH_SYS o Kerberos.", en: "In NFSv4.1 a session is created (EXCHANGE_ID, CREATE_SESSION) and the client authenticates with AUTH_SYS or Kerberos." },
      { es: "Cada llamada al sistema (open, read, write) se traduce en COMPOUND RPC como PUTFH + OPEN + READ.", en: "Each system call (open, read, write) becomes a COMPOUND RPC such as PUTFH + OPEN + READ." },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: { es: "TCP 2049 (NFSv4, un solo puerto)", en: "TCP 2049 (NFSv4, single port)" } },
      { label: { es: "Base", en: "Foundation" }, value: "ONC RPC + XDR" },
      { label: { es: "Versiones vigentes", en: "Current versions" }, value: "NFSv3, v4.0 (RFC 7530), v4.1 (RFC 8881), v4.2 (RFC 7862)" },
      { label: { es: "Estado", en: "State" }, value: { es: "v3 sin estado; v4 con estado", en: "v3 stateless; v4 stateful" } },
      { label: { es: "Seguridad", en: "Security" }, value: { es: "AUTH_SYS o RPCSEC_GSS (Kerberos: krb5, krb5i, krb5p)", en: "AUTH_SYS or RPCSEC_GSS (Kerberos: krb5, krb5i, krb5p)" } },
    ],
    security: {
      es: "Con AUTH_SYS, el servidor confía en el UID y GID que declara el cliente, así que cualquiera con root en una máquina autorizada puede hacerse pasar por otro usuario; root_squash solo mitiga el caso de root. RPCSEC_GSS con Kerberos aporta autenticación real (krb5), integridad (krb5i) y cifrado (krb5p), y RPC sobre TLS (RFC 9289) permite cifrar el tráfico sin Kerberos.",
      en: "With AUTH_SYS the server trusts whatever UID and GID the client claims, so anyone with root on an authorised machine can impersonate another user; root_squash only mitigates the root case. RPCSEC_GSS with Kerberos provides real authentication (krb5), integrity (krb5i) and encryption (krb5p), and RPC-over-TLS (RFC 9289) allows encrypting traffic without Kerberos.",
    },
    tools: [
      { command: "showmount -e servidor", description: { es: "Lista las exportaciones de un servidor (NFSv3/mountd)", en: "Lists a server's exports (NFSv3/mountd)" } },
      { command: "nfsstat -m", description: { es: "Muestra los montajes NFS y sus opciones (versión, sec, tamaño de bloque)", en: "Shows NFS mounts and their options (version, sec, block size)" } },
      { command: "rpcinfo -p servidor", description: { es: "Lista los servicios RPC registrados en el portmapper", en: "Lists RPC services registered with the portmapper" } },
    ],
    wireshark: "nfs",
    relations: { dependsOn: ["onc-rpc", "xdr", "tcp", "kerberos"] },
    specs: [
      { id: "RFC 7530", title: { es: "Protocolo NFS versión 4", en: "Network File System (NFS) Version 4 Protocol" }, url: rfc(7530) },
      { id: "RFC 8881", title: { es: "Protocolo NFS versión 4 menor 1", en: "Network File System (NFS) Version 4 Minor Version 1 Protocol" }, url: rfc(8881) },
      { id: "RFC 7862", title: { es: "Protocolo NFS versión 4 menor 2", en: "Network File System (NFS) Version 4 Minor Version 2 Protocol" }, url: rfc(7862) },
      { id: "RFC 1813", title: { es: "Especificación del protocolo NFS versión 3", en: "NFS Version 3 Protocol Specification" }, url: rfc(1813) },
    ],
  },
];
