import type { L } from "@/lib/i18n";

/** Protocolos que no encajan limpiamente en una sola capa del modelo OSI. */
export interface Misfit {
  protocolId: string;
  acronym: string;
  /** Capa donde suelen ubicarlo los libros de texto. */
  textbook: number;
  /** Capas cuyas funciones realiza en la práctica. */
  spans: number[];
  /** Sobre qué viaja realmente. */
  carrier: L;
  basic: L;
  technical: L;
}

export const MISFITS: Misfit[] = [
  {
    protocolId: "arp",
    acronym: "ARP",
    textbook: 2,
    spans: [2, 3],
    carrier: { es: "Directo en Ethernet · EtherType 0x0806", en: "Directly on Ethernet · EtherType 0x0806" },
    basic: {
      es: "Traduce direcciones IP (capa 3) a direcciones MAC (capa 2). Los libros no se ponen de acuerdo en dónde ubicarlo, porque sirve a las dos.",
      en: "It maps IP addresses (layer 3) to MAC addresses (layer 2). Textbooks disagree on where it belongs because it serves both.",
    },
    technical: {
      es: "Su tarea es de capa 3 (resolver direcciones IPv4), pero sus mensajes no van dentro de IP: viajan directamente en tramas Ethernet con su propio EtherType y no salen del dominio de broadcast local. Por eso se le suele llamar protocolo de «capa 2.5». En IPv6, NDP hace lo mismo pero sobre ICMPv6, es decir, dentro de IP.",
      en: "Its job is layer 3 (resolving IPv4 addresses), yet its messages are not carried in IP: they ride directly in Ethernet frames with their own EtherType and never leave the local broadcast domain. That is why it is often called a “layer 2.5” protocol. In IPv6, NDP does the same job over ICMPv6 — inside IP.",
    },
  },
  {
    protocolId: "tls",
    acronym: "TLS",
    textbook: 6,
    spans: [5, 6, 7],
    carrier: { es: "Sobre TCP (DTLS sobre UDP)", en: "Over TCP (DTLS over UDP)" },
    basic: {
      es: "Cifra la conexión. Se suele ubicar en la capa 6, pero también gestiona sesiones y vive dentro de la propia aplicación.",
      en: "It encrypts the connection. It is usually placed at layer 6, but it also manages sessions and lives inside the application itself.",
    },
    technical: {
      es: "Cifrar es una función de presentación (L6), pero TLS también establece y reanuda sesiones con tickets (L5) y, para TCP, no es más que datos de aplicación (L7) que procesa una biblioteca del programa. SNI y ALPN, además, dependen de la aplicación. El modelo TCP/IP evita la discusión: todo eso es capa de aplicación.",
      en: "Encryption is a presentation function (L6), but TLS also establishes and resumes sessions via tickets (L5), and to TCP it is just application data (L7) handled by a library inside the program; SNI and ALPN are application-aware too. The TCP/IP model avoids the debate: all of it is the application layer.",
    },
  },
  {
    protocolId: "bgp",
    acronym: "BGP",
    textbook: 3,
    spans: [3, 7],
    carrier: { es: "Sesión TCP al puerto 179", en: "TCP session to port 179" },
    basic: {
      es: "Decide las rutas entre los grandes proveedores de Internet (capa 3), pero se comunica como una aplicación sobre TCP.",
      en: "It decides routes between the Internet's big networks (layer 3), yet it talks like an application over TCP.",
    },
    technical: {
      es: "Su propósito es de capa 3: construir las tablas de enrutamiento entre sistemas autónomos. Técnicamente, en cambio, es un protocolo de aplicación: abre una sesión TCP al puerto 179 y confía en TCP para la entrega confiable y ordenada. Es el ejemplo clásico de protocolo de plano de control que no se ubica donde actúa su resultado.",
      en: "Its purpose is layer 3: building routing tables between autonomous systems. Technically, though, it is an application protocol: it opens a TCP session to port 179 and relies on TCP for reliable, ordered delivery. It is the textbook example of a control-plane protocol that does not sit where its result acts.",
    },
  },
  {
    protocolId: "mpls",
    acronym: "MPLS",
    textbook: 3,
    spans: [2, 3],
    carrier: { es: "Etiqueta de 32 bits entre L2 y L3 · EtherType 0x8847", en: "32-bit label between L2 and L3 · EtherType 0x8847" },
    basic: {
      es: "Añade una etiqueta corta entre la cabecera de enlace y la de IP para que los routers conmuten más rápido. Por eso se le llama «capa 2.5».",
      en: "It inserts a short label between the link header and the IP header so routers can switch faster — hence “layer 2.5”.",
    },
    technical: {
      es: "La pila de etiquetas va entre la cabecera de enlace y la de red. No es un enlace (necesita uno debajo) ni un protocolo de red extremo a extremo (no direcciona hosts). Los LSR reenvían por etiqueta (swap, push, pop) sin mirar la cabecera IP. Además puede transportar IP, tramas Ethernet o circuitos completos (pseudowires), lo que acentúa su ambigüedad.",
      en: "The label stack sits between the link and network headers. It is not a link (it needs one below) nor an end-to-end network protocol (it addresses no hosts). LSRs forward by label (swap/push/pop) without looking at the IP header, and it can carry IP, Ethernet frames or whole circuits (pseudowires), deepening the ambiguity.",
    },
  },
  {
    protocolId: "quic",
    acronym: "QUIC",
    textbook: 4,
    spans: [4, 5, 6],
    carrier: { es: "Sobre UDP 443, en espacio de usuario", en: "Over UDP 443, in user space" },
    basic: {
      es: "Hace el trabajo de TCP y de TLS a la vez, pero viaja encima de UDP, que también es un protocolo de transporte.",
      en: "It does the work of TCP and TLS at once, yet rides on top of UDP — itself a transport protocol.",
    },
    technical: {
      es: "Implementa confiabilidad, control de flujo y control de congestión (L4) sobre otro transporte, UDP. Integra el handshake de TLS 1.3 (L6), mantiene la conexión ante cambios de IP gracias a los Connection IDs (función de sesión, L5) y se ejecuta en espacio de usuario, dentro de la aplicación. Rompe la separación de capas a propósito, para poder evolucionar sin esperar a los sistemas operativos ni a los equipos intermedios.",
      en: "It implements reliability, flow and congestion control (L4) on top of another transport, UDP; it embeds the TLS 1.3 handshake (L6); it keeps connections alive across IP changes with Connection IDs (a session function, L5); and it runs in user space inside the application. It breaks layering on purpose, so it can evolve without waiting for operating systems or middleboxes.",
    },
  },
  {
    protocolId: "icmp",
    acronym: "ICMP",
    textbook: 3,
    spans: [3],
    carrier: { es: "Dentro de IP · Protocol = 1", en: "Inside IP · Protocol = 1" },
    basic: {
      es: "Forma parte de la capa de red, pero sus mensajes viajan dentro de paquetes IP, como si fuera un protocolo de la capa superior.",
      en: "It is part of the network layer, yet its messages travel inside IP packets as if it were an upper-layer protocol.",
    },
    technical: {
      es: "RFC 792 lo define como parte integral de IP: toda implementación de IP debe incluirlo. Aun así se encapsula como carga de IP (Protocol = 1), igual que TCP o UDP. Es decir, es un protocolo de capa 3 que usa la propia capa 3 como transporte.",
      en: "RFC 792 defines it as an integral part of IP — every IP implementation must include it. Yet it is encapsulated as IP payload (Protocol = 1), just like TCP or UDP: a layer-3 protocol that uses layer 3 itself as its transport.",
    },
  },
  {
    protocolId: "isis",
    acronym: "IS-IS",
    textbook: 3,
    spans: [3, 2],
    carrier: { es: "Directo sobre la capa de enlace (LLC), sin IP", en: "Directly over the link layer (LLC), no IP" },
    basic: {
      es: "Calcula rutas IP (capa 3), pero sus mensajes no usan IP: van directamente en tramas de enlace.",
      en: "It computes IP routes (layer 3), but its messages do not use IP: they go straight into link-layer frames.",
    },
    technical: {
      es: "Nació en el mundo OSI (CLNS), así que sus PDU se encapsulan directamente en la capa de enlace (LLC, NLPID 0x83) y no en IP. Por eso un atacante remoto no puede alcanzarlo por IP. En comparación, OSPF viaja dentro de IP (protocolo 89) y BGP dentro de TCP: tres protocolos de enrutamiento con tres ubicaciones distintas.",
      en: "Born in the OSI world (CLNS), its PDUs are encapsulated directly in the link layer (LLC, NLPID 0x83), not in IP — so a remote attacker cannot reach it over IP. By contrast, OSPF rides inside IP (protocol 89) and BGP inside TCP: three routing protocols, three different placements.",
    },
  },
  {
    protocolId: "dhcp",
    acronym: "DHCP",
    textbook: 7,
    spans: [7, 3],
    carrier: { es: "UDP 67/68 con broadcast", en: "UDP 67/68 via broadcast" },
    basic: {
      es: "Es una aplicación que configura la capa de red: entrega una IP a equipos que todavía no tienen una.",
      en: "It is an application that configures the network layer: it hands an IP to devices that do not have one yet.",
    },
    technical: {
      es: "Corre sobre UDP (capa 7), pero su resultado es la configuración de capa 3: IP, máscara, gateway y DNS. Como el cliente todavía no tiene dirección, envía desde 0.0.0.0 a 255.255.255.255 y depende del broadcast de capa 2. Para cruzar routers se necesita un agente de relay (con la opción 82).",
      en: "It runs over UDP (layer 7), but its outcome is layer-3 configuration: IP, mask, gateway, DNS. Since the client has no address yet, it sends from 0.0.0.0 to 255.255.255.255 and relies on layer-2 broadcast; crossing routers requires a relay agent (option 82).",
    },
  },
];
